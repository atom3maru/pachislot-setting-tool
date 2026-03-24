import type { HistoryEntry } from '../hooks/useAutoSave';

interface Props {
  history: HistoryEntry[];
  onLoad: (entry: HistoryEntry) => void;
  onClear: () => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function HistoryPanel({ history, onLoad, onClear }: Props) {
  if (history.length === 0) return null;

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="bg-amber-50 dark:bg-amber-900/30 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <span>📜</span>
          判別履歴 <span className="text-xs font-normal opacity-70">（最新{history.length}件）</span>
        </h2>
        <button
          onClick={onClear}
          className="text-[10px] text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          全削除
        </button>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700 max-h-60 overflow-y-auto">
        {history.map(entry => {
          const best = entry.result?.mostLikely ?? '?';
          const bestProb = entry.result
            ? (entry.result.probabilities[(entry.result.mostLikely ?? 1) - 1] * 100).toFixed(1)
            : '?';
          const totalG = entry.input['totalG'];

          return (
            <button
              key={entry.id}
              onClick={() => onLoad(entry)}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                    設定{best}
                  </span>
                  <span className="text-[10px] text-gray-400">({bestProb}%)</span>
                  {totalG && (
                    <span className="text-[10px] text-gray-400">{totalG}G</span>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0">
                {formatDate(entry.timestamp)}
              </span>
              <span className="text-gray-300 dark:text-gray-600 text-xs">→</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
