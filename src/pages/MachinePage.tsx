import { useState, useCallback, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { MachineConfig, CalcResult, EnhancedJudgment } from '../types/machine';
import { calculate } from '../logic/engine';
import { enhanceJudgment } from '../logic/judgmentHelper';
import { DarkModeContext } from '../App';
import { useAutoSave, saveHistory, loadHistory, clearHistory } from '../hooks/useAutoSave';
import type { HistoryEntry } from '../hooks/useAutoSave';
import SectionCard from '../components/SectionCard';
import NumberField from '../components/NumberField';
import ResultBar from '../components/ResultBar';
import PieChart from '../components/PieChart';
import JudgmentComment from '../components/JudgmentComment';
import InputHints from '../components/InputHints';
import ShareButton from '../components/ShareButton';
import DarkModeToggle from '../components/DarkModeToggle';
import HistoryPanel from '../components/HistoryPanel';
import MachineGuide from '../components/MachineGuide';
import Checklist from '../components/Checklist';
import IncomeSimulator from '../components/IncomeSimulator';
import HyenaInfo from '../components/HyenaInfo';

interface Props {
  config: MachineConfig;
}

export default function MachinePage({ config }: Props) {
  const { isDark, toggle } = useContext(DarkModeContext);
  const [input, setInput] = useState<Record<string, number | null>>({});
  const [result, setResult] = useState<CalcResult | null>(null);
  const [judgment, setJudgment] = useState<EnhancedJudgment | null>(null);
  const [hints, setHints] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory(config.id));
  const [showAutoSaveNote, setShowAutoSaveNote] = useState(false);

  // 自動保存フック
  const { clearSave } = useAutoSave(config.id, input, (restored) => {
    setInput(restored);
    setShowAutoSaveNote(true);
    setTimeout(() => setShowAutoSaveNote(false), 3000);
  });

  const handleChange = useCallback((key: string, value: number | null) => {
    setInput(prev => ({ ...prev, [key]: value }));
  }, []);

  // 入力項目数（null/0でないフィールド数）
  const inputFieldCount = useMemo(() =>
    Object.values(input).filter(v => v != null && v !== 0).length
  , [input]);

  const handleCalculate = useCallback(() => {
    const res = calculate(input, config);
    setResult(res);
    const baseJudgment = config.getJudgment(input, res);
    const labels = config.settingLabels || ['1','2','3','4','5','6'];
    const enhanced = enhanceJudgment({
      probabilities: res.probabilities,
      settingLabels: labels,
      payoutRates: config.payoutRates,
      baseCoins: config.baseCoins,
      totalGames: (input.totalG as number) ?? undefined,
      inputFieldCount,
      baseJudgment,
    });
    setJudgment(enhanced);
    setHints(config.getHints(input));
    // 履歴に保存
    saveHistory(config.id, input, res);
    setHistory(loadHistory(config.id));
  }, [input, config, inputFieldCount]);

  const handleReset = useCallback(() => {
    setInput({});
    setResult(null);
    setJudgment(null);
    setHints([]);
    clearSave();
  }, [clearSave]);

  const handleLoadHistory = useCallback((entry: HistoryEntry) => {
    setInput(entry.input);
    if (entry.result) {
      setResult(entry.result);
      const base = config.getJudgment(entry.input, entry.result);
      const labels = config.settingLabels || ['1','2','3','4','5','6'];
      const histFieldCount = Object.values(entry.input).filter(v => v != null && v !== 0).length;
      const enhanced = enhanceJudgment({
        probabilities: entry.result.probabilities,
        settingLabels: labels,
        payoutRates: config.payoutRates,
        baseCoins: config.baseCoins,
        totalGames: (entry.input.totalG as number) ?? undefined,
        inputFieldCount: histFieldCount,
        baseJudgment: base,
      });
      setJudgment(enhanced);
      setHints(config.getHints(entry.input));
    }
  }, [config]);

  const handleClearHistory = useCallback(() => {
    clearHistory(config.id);
    setHistory([]);
  }, [config.id]);

  const resultCompat = result ? {
    probabilities: result.probabilities,
    mostLikely: result.mostLikely,
    confirmedMin: result.confirmedMin,
  } : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* ヘッダー */}
      <header className={`${config.color} text-white py-5 px-4 shadow-lg sticky top-0 z-30`}>
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/" className="text-white/80 hover:text-white transition-colors text-lg p-1 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
            ←
          </Link>
          <div className="flex-1 text-center min-w-0">
            <h1 className="text-base md:text-xl font-bold truncate">{config.name}</h1>
            <p className="text-white/60 text-[10px] mt-0.5">設定判別ツール v{config.version}</p>
          </div>
          <DarkModeToggle isDark={isDark} toggle={toggle} />
        </div>
      </header>

      {/* 自動復元通知 */}
      {showAutoSaveNote && (
        <div className="max-w-4xl mx-auto px-3 pt-2">
          <div className="bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 rounded-lg px-3 py-2 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2 animate-pulse">
            💾 前回の入力データを復元しました
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-3 py-4 space-y-5">
        {/* 攻め方ガイド */}
        {config.guide && <MachineGuide guide={config.guide} />}

        {/* チェックリスト */}
        {config.checklist && config.checklist.length > 0 && (
          <Checklist items={config.checklist} machineId={config.id} />
        )}

        {/* ハイエナ情報 */}
        {config.hyena && <HyenaInfo hyena={config.hyena} />}

        {/* 入力セクション */}
        {config.sections.map((section, si) => (
          <SectionCard key={si} title={section.title} icon={section.icon}>
            <div className="space-y-4">
              {section.groups.map((group, gi) => (
                <div key={gi}>
                  {group.label && (
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{group.label}</h3>
                  )}
                  <div
                    className="grid gap-3"
                    style={{
                      gridTemplateColumns: `repeat(${group.columns ?? 2}, minmax(0, 1fr))`,
                    }}
                  >
                    {group.fields.map(field => (
                      <NumberField
                        key={field.key}
                        label={field.label}
                        value={input[field.key] ?? null}
                        onChange={v => handleChange(field.key, v)}
                        hint={field.hint}
                        min={field.min ?? 0}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        ))}

        {/* ボタン - スマホ最適化: 大きなタッチ領域 */}
        <div className="flex gap-3 sticky bottom-3 z-20">
          <button
            onClick={handleCalculate}
            className={`flex-1 ${config.color} text-white font-bold py-4 rounded-2xl shadow-xl active:scale-[0.97] transition-all text-base min-h-[52px]`}
          >
            🔍 判別する
          </button>
          <button
            onClick={handleReset}
            className="px-6 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold py-4 rounded-2xl hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-[0.97] transition-all text-sm min-h-[52px] shadow-xl"
          >
            リセット
          </button>
        </div>

        {/* 結果表示 */}
        {resultCompat && (
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2">
                <span>📊</span>
                判別結果
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {/* 円グラフ */}
              <PieChart
                probabilities={resultCompat.probabilities}
                settingLabels={config.settingLabels}
                mostLikely={resultCompat.mostLikely}
              />

              {/* 棒グラフ */}
              <ResultBar result={resultCompat} settingLabels={config.settingLabels} />

              {/* 判定コメント（強化版） */}
              {judgment && (
                <div className="space-y-3">
                  <JudgmentComment message={judgment.message} level={judgment.level} />

                  {/* 信頼度バッジ */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">判定精度:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      judgment.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                      judgment.confidence === 'mid' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {judgment.confidence === 'high' ? '高' : judgment.confidence === 'mid' ? '中' : '低'}
                    </span>
                    {judgment.confidence === 'low' && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">データを追加すると精度が上がります</span>
                    )}
                  </div>

                  {/* 期待収支（payoutRatesがある場合） */}
                  {judgment.expectedIncome != null && (
                    <div className={`p-3 rounded-lg text-center ${
                      judgment.expectedIncome >= 0
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}>
                      <div className="text-xs text-gray-500 dark:text-gray-400">あと1000G打った場合の期待枚数</div>
                      <div className={`text-xl font-bold ${
                        judgment.expectedIncome >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {judgment.expectedIncome >= 0 ? '+' : ''}{judgment.expectedIncome}枚
                      </div>
                    </div>
                  )}

                  {/* やめ時警告 */}
                  {judgment.shouldStop && (
                    <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/40 border border-red-300 dark:border-red-700 flex items-center gap-2">
                      <span className="text-xl">🚨</span>
                      <div>
                        <div className="font-bold text-red-700 dark:text-red-400 text-sm">やめ時の可能性あり</div>
                        <div className="text-xs text-red-600 dark:text-red-400/80">{judgment.stopReason}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <InputHints hints={hints} />

              {/* 共有ボタン */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <ShareButton
                  machineName={config.name}
                  result={resultCompat}
                  input={input}
                  settingLabels={config.settingLabels}
                />
              </div>
            </div>
          </section>
        )}

        {/* 期待収支シミュレーター */}
        {resultCompat && <IncomeSimulator result={resultCompat} config={config} />}

        {/* 判別履歴 */}
        <HistoryPanel
          history={history}
          onLoad={handleLoadHistory}
          onClear={handleClearHistory}
        />
      </main>

      <footer className="text-center text-xs text-gray-400 dark:text-gray-500 py-4">
        設定判別ツール - 解析値は暫定値を含みます
      </footer>
    </div>
  );
}
