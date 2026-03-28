import { useState, useMemo } from 'react';
import type { MachineConfig, HyenaExpectedValue } from '../types/machine';
import { interpolateExpectedValue } from '../logic/hyenaCalc';

interface Props {
  config: MachineConfig;
}

/** 数値入力コンポーネント */
function NumInput({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={value ?? ''}
        onChange={e => {
          const v = parseInt(e.target.value, 10);
          onChange(isNaN(v) ? null : v);
        }}
        placeholder="0"
        className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
      {hint && (
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{hint}</p>
      )}
    </div>
  );
}

/** 設定帯を判定してバッジ色を返す */
function getSettingBand(
  combinedRate: number,
  probRates: number[]
): { label: string; color: string } {
  // probRates は設定1〜6の1G確率(小さいほど出にくい)
  // combinedRate も1G確率
  // 設定6側(高確率)から比較
  if (combinedRate >= probRates[5]) return { label: '設定6相当', color: 'bg-red-500' };
  if (combinedRate >= probRates[4]) return { label: '設定5相当', color: 'bg-orange-500' };
  if (combinedRate >= probRates[3]) return { label: '設定4相当', color: 'bg-amber-500' };
  if (combinedRate >= probRates[2]) return { label: '設定3相当', color: 'bg-yellow-500' };
  if (combinedRate >= probRates[1]) return { label: '設定2相当', color: 'bg-blue-500' };
  return { label: '設定1相当', color: 'bg-gray-500' };
}

export default function MachineSelector({ config }: Props) {
  const [todayG, setTodayG] = useState<number | null>(null);
  const [bigCount, setBigCount] = useState<number | null>(null);
  const [regCount, setRegCount] = useState<number | null>(null);
  const [prevLastG, setPrevLastG] = useState<number | null>(null);
  const [currentG, setCurrentG] = useState<number | null>(null);

  const hyena = config.hyena;
  const ceilingGame = hyena?.ceilingGame ?? 0;
  const expectedValues: HyenaExpectedValue[] = hyena?.expectedValues ?? [];

  // ボーナス合算確率
  const combined = useMemo(() => {
    if (todayG == null || todayG === 0) return null;
    const total = (bigCount ?? 0) + (regCount ?? 0);
    if (total === 0) return null;
    return todayG / total; // 1/Xの X
  }, [todayG, bigCount, regCount]);

  // 合算1G確率
  const combinedRatePerG = useMemo(() => {
    if (combined == null) return null;
    return 1 / combined;
  }, [combined]);

  // 設定帯判定
  const settingBand = useMemo(() => {
    if (combinedRatePerG == null) return null;
    const firstProb = config.probEntries[0];
    if (!firstProb) return null;
    return getSettingBand(combinedRatePerG, firstProb.rates);
  }, [combinedRatePerG, config.probEntries]);

  // 据え置き判定
  const carryOver = useMemo(() => {
    if (prevLastG == null || currentG == null) return null;
    const totalG = prevLastG + currentG;
    const remaining = ceilingGame - totalG;
    return { totalG, remaining };
  }, [prevLastG, currentG, ceilingGame]);

  // 据え置き期待値
  const carryOverExpectedYen = useMemo(() => {
    if (carryOver == null || expectedValues.length === 0) return null;
    return interpolateExpectedValue(carryOver.totalG, expectedValues);
  }, [carryOver, expectedValues]);

  // ハイエナ期待値
  const hyenaExpectedYen = useMemo(() => {
    if (currentG == null || expectedValues.length === 0) return null;
    return interpolateExpectedValue(currentG, expectedValues);
  }, [currentG, expectedValues]);

  // 推奨アクション判定
  const recommendation = useMemo(() => {
    // ハイエナ期待値を優先
    const ev = carryOverExpectedYen ?? hyenaExpectedYen;
    if (ev == null) return null;
    if (ev > 1000) return { level: 'go' as const, message: 'この台は打つ価値あり！', emoji: '🟢' };
    if (ev >= 0) return { level: 'wait' as const, message: '微妙…条件次第', emoji: '🟡' };
    return { level: 'skip' as const, message: 'スルー推奨', emoji: '🔴' };
  }, [carryOverExpectedYen, hyenaExpectedYen]);

  const hasAnyInput = todayG != null || currentG != null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-slide-up">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          🔍 台選びアシスタント
        </h3>
      </div>

      <div className="p-4 space-y-5">
        {/* 入力エリア */}
        <div className="grid grid-cols-3 gap-3">
          <NumInput label="当日G数" value={todayG} onChange={setTodayG} />
          <NumInput label="BIG回数" value={bigCount} onChange={setBigCount} />
          <NumInput label="REG回数" value={regCount} onChange={setRegCount} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <NumInput
            label="前日最終G数"
            hint="据え置き判定に使用（任意）"
            value={prevLastG}
            onChange={setPrevLastG}
          />
          <NumInput
            label="現在ハマりG数"
            hint="ハイエナ判定に使用"
            value={currentG}
            onChange={setCurrentG}
          />
        </div>

        {/* 結果表示 */}
        {hasAnyInput && (
          <div className="space-y-4">

            {/* ボーナス合算カード */}
            {combined != null && settingBand != null && (
              <div
                className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-[4px] border-l-indigo-500 p-4 animate-slide-up"
              >
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  📊 ボーナス合算
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    1/{Math.round(combined)}
                  </div>
                  <span className={`${settingBand.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {settingBand.label}
                  </span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  BIG {bigCount ?? 0}回 + REG {regCount ?? 0}回 / {todayG}G
                </div>
              </div>
            )}

            {/* 据え置き/リセット判定カード */}
            {carryOver != null && (
              <div
                className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-[4px] border-l-amber-500 p-4 animate-slide-up"
              >
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  📌 据え置き判定
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <div>
                    前日 <span className="font-bold">{prevLastG}G</span> + 当日{' '}
                    <span className="font-bold">{currentG}G</span> ={' '}
                    <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
                      {carryOver.totalG}G
                    </span>
                  </div>
                  <div>
                    天井まで残り{' '}
                    <span className={`font-bold ${carryOver.remaining <= 200 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                      {carryOver.remaining > 0 ? `${carryOver.remaining}G` : '天井到達圏内！'}
                    </span>
                  </div>
                </div>
                {carryOverExpectedYen != null && (
                  <div className={`mt-3 text-center p-2 rounded-lg ${carryOverExpectedYen >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                    <span className="text-xs text-gray-500 dark:text-gray-400">据え置き狙い期待値: </span>
                    <span className={`text-lg font-extrabold ${carryOverExpectedYen >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {carryOverExpectedYen >= 0 ? '+' : ''}¥{carryOverExpectedYen.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ハイエナ判定カード */}
            {hyenaExpectedYen != null && currentG != null && (
              <div
                className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-[4px] border-l-emerald-500 p-4 animate-slide-up"
              >
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  🎰 ハイエナ判定（現在 {currentG}G）
                </div>
                <div className="flex items-center justify-between">
                  <div className={`text-3xl font-extrabold ${hyenaExpectedYen >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {hyenaExpectedYen >= 0 ? '+' : ''}¥{hyenaExpectedYen.toLocaleString()}
                  </div>
                  <span className={`text-2xl`}>
                    {hyenaExpectedYen > 1000 ? '🟢' : hyenaExpectedYen >= 0 ? '🟡' : '🔴'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {hyenaExpectedYen > 1000
                    ? '打つ価値あり'
                    : hyenaExpectedYen >= 0
                      ? '様子見'
                      : 'スルー推奨'}
                </div>
              </div>
            )}

            {/* 推奨アクション */}
            {recommendation != null && (
              <div
                className={`rounded-xl p-4 text-center animate-slide-up ${
                  recommendation.level === 'go'
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800'
                    : recommendation.level === 'wait'
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800'
                      : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800'
                }`}
              >
                <div className="text-2xl font-extrabold">
                  <span className="mr-2">{recommendation.emoji}</span>
                  <span className={
                    recommendation.level === 'go'
                      ? 'text-green-700 dark:text-green-400'
                      : recommendation.level === 'wait'
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-red-700 dark:text-red-400'
                  }>
                    {recommendation.message}
                  </span>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 未入力時のガイド */}
        {!hasAnyInput && (
          <div className="text-center py-6 text-gray-400 dark:text-gray-500 text-sm">
            データカウンターの値を入力すると<br />据え置き判定・ハイエナ期待値を計算します
          </div>
        )}
      </div>
    </div>
  );
}
