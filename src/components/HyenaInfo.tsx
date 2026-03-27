import { useState } from 'react';
import type { HyenaInfo as HyenaType } from '../types/machine';
import { interpolateExpectedValue } from '../logic/hyenaCalc';

interface Props {
  hyena: HyenaType;
}

const STRENGTH_COLORS = {
  hot: { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400', light: 'bg-red-100 dark:bg-red-900/30' },
  warm: { bg: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', light: 'bg-amber-100 dark:bg-amber-900/30' },
  cold: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', light: 'bg-blue-100 dark:bg-blue-900/30' },
};

export default function HyenaInfo({ hyena }: Props) {
  const [inputGame, setInputGame] = useState<number | null>(null);

  const expectedYen = inputGame != null
    ? interpolateExpectedValue(inputGame, hyena.expectedValues)
    : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-rose-600 to-orange-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          🎰 ハイエナ情報
        </h3>
      </div>
      <div className="p-4 space-y-5">

        {/* 天井情報 */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
          <span className="text-2xl">🏔️</span>
          <div>
            <div className="font-semibold text-gray-800 dark:text-gray-200">
              天井: <span className="text-rose-600 dark:text-rose-400">{hyena.ceilingGame}G</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{hyena.ceilingBenefit}</div>
            {hyena.resetInfo && (
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                📌 {hyena.resetInfo}
              </div>
            )}
          </div>
        </div>

        {/* ゾーンバー */}
        {hyena.zones.length > 0 && (
          <div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ゾーン</div>
            <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              {hyena.zones.map((zone, i) => {
                const leftPct = (zone.start / hyena.ceilingGame) * 100;
                const widthPct = ((zone.end - zone.start) / hyena.ceilingGame) * 100;
                return (
                  <div
                    key={i}
                    className={`absolute top-0 h-full ${STRENGTH_COLORS[zone.strength].bg} opacity-80`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                    title={`${zone.label} (${zone.start}〜${zone.end}G)`}
                  />
                );
              })}
              {/* 目盛り */}
              <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-mono text-gray-600 dark:text-gray-400">
                <span>0G</span>
                <span>{hyena.ceilingGame}G</span>
              </div>
            </div>
            {/* ゾーン凡例 */}
            <div className="flex flex-wrap gap-2 mt-2">
              {hyena.zones.map((zone, i) => (
                <div key={i} className={`text-xs px-2 py-1 rounded-full ${STRENGTH_COLORS[zone.strength].light} ${STRENGTH_COLORS[zone.strength].text}`}>
                  {zone.start}〜{zone.end}G: {zone.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 期待値計算 */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">期待値計算</div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={hyena.ceilingGame + 200}
              step={10}
              value={inputGame ?? ''}
              onChange={e => {
                const v = parseInt(e.target.value, 10);
                setInputGame(isNaN(v) ? null : v);
              }}
              placeholder="現在のゲーム数を入力"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">G</span>
          </div>
          {expectedYen != null && (
            <div className={`text-center p-3 rounded-lg ${expectedYen >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <div className="text-sm text-gray-500 dark:text-gray-400">ここから打つと</div>
              <div className={`text-2xl font-bold ${expectedYen >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                期待値 {expectedYen >= 0 ? '+' : ''}¥{expectedYen.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                ※ 等価換金・設定1で計算
              </div>
            </div>
          )}
        </div>

        {/* 期待値テーブル */}
        {hyena.expectedValues.length > 0 && (
          <div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">期待値テーブル</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hyena.expectedValues.map((ev, i) => (
                <div key={i} className={`text-center p-2 rounded-lg text-sm ${ev.expectedYen >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{ev.fromGame}G〜</div>
                  <div className={`font-bold ${ev.expectedYen >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {ev.expectedYen >= 0 ? '+' : ''}¥{ev.expectedYen.toLocaleString()}
                  </div>
                  {ev.note && <div className="text-[10px] text-gray-400">{ev.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 注意事項 */}
        {hyena.notes && hyena.notes.length > 0 && (
          <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
            {hyena.notes.map((note, i) => (
              <div key={i}>⚠ {note}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
