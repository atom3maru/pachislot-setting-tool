import type { PlayGuideInfo, ReelPattern } from '../types/machine';

// リール図柄の色マッピング
function getSymbolStyle(symbol: string): string {
  if (symbol.includes('7赤') || symbol === '7赤') return 'bg-red-500 text-white font-bold';
  if (symbol.includes('7青') || symbol === '7青') return 'bg-blue-500 text-white font-bold';
  if (symbol.includes('7白') || symbol === '7白') return 'bg-gray-100 dark:bg-gray-300 text-gray-800 font-bold';
  if (symbol === 'BAR') return 'bg-gray-900 text-white font-bold';
  if (symbol === 'チェ') return 'bg-pink-500 text-white font-bold';
  if (symbol === 'スイカ') return 'bg-green-500 text-white font-bold';
  if (symbol === 'ベル') return 'bg-yellow-400 text-gray-900 font-bold';
  if (symbol === 'リプ') return 'bg-blue-300 text-blue-900 font-bold';
  if (symbol === 'GOD') return 'bg-yellow-600 text-white font-bold';
  if (symbol === '☆') return 'bg-purple-500 text-white font-bold';
  if (symbol === '空') return 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500';
  return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold';
}

// 有効ラインのハイライト判定
function isHighlighted(row: number, col: number, line?: string): boolean {
  if (!line) return false;
  if (line === 'top') return row === 0;
  if (line === 'center') return row === 1;
  if (line === 'bottom') return row === 2;
  if (line === 'diagonal-down') return row === col; // 左上→右下
  if (line === 'diagonal-up') return row + col === 2; // 左下→右上
  return false;
}

// リールイラストコンポーネント
function ReelDisplay({ pattern }: { pattern: ReelPattern }) {
  const reels = [pattern.left, pattern.center, pattern.right];
  const reelLabels = ['左', '中', '右'];

  return (
    <div className="inline-block">
      {/* リールラベル */}
      <div className="grid grid-cols-3 gap-0.5 mb-0.5">
        {reelLabels.map(label => (
          <div key={label} className="text-center text-[9px] text-gray-400 dark:text-gray-500 font-medium">
            {label}
          </div>
        ))}
      </div>
      {/* リール本体 */}
      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden inline-grid grid-cols-3 gap-0">
        {[0, 1, 2].map(row => (
          reels.map((reel, col) => {
            const symbol = reel[row];
            const highlighted = isHighlighted(row, col, pattern.highlightLine);
            return (
              <div
                key={`${row}-${col}`}
                className={`
                  w-10 h-8 sm:w-12 sm:h-9 flex items-center justify-center text-[10px] sm:text-xs
                  ${getSymbolStyle(symbol)}
                  ${highlighted ? 'ring-2 ring-red-500 ring-inset z-10' : ''}
                  ${row < 2 ? 'border-b border-gray-300/50 dark:border-gray-500/50' : ''}
                  ${col < 2 ? 'border-r border-gray-300/50 dark:border-gray-500/50' : ''}
                `}
              >
                {symbol}
              </div>
            );
          })
        ))}
      </div>
      {/* 有効ライン表示 */}
      {pattern.highlightLine && (
        <div className="text-center text-[9px] text-red-500 font-bold mt-0.5">
          {pattern.highlightLine === 'top' && '━ 上段ライン'}
          {pattern.highlightLine === 'center' && '━ 中段ライン'}
          {pattern.highlightLine === 'bottom' && '━ 下段ライン'}
          {pattern.highlightLine === 'diagonal-down' && '╲ 右下がり'}
          {pattern.highlightLine === 'diagonal-up' && '╱ 右上がり'}
        </div>
      )}
    </div>
  );
}

interface Props {
  playGuide: PlayGuideInfo;
}

export default function PlayGuide({ playGuide }: Props) {
  const { basicHow, reelStops, notes } = playGuide;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span>🎰</span> 打ち方ガイド
        </h3>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {/* 基本の打ち方 */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {basicHow}
          </p>
        </div>

        {/* レア役カード形式（リールイラスト付き） */}
        <div className="space-y-3">
          {reelStops.map((stop, i) => (
            <div
              key={stop.name}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`
                rounded-xl border shadow-sm animate-slide-up overflow-hidden
                ${stop.settingDiff
                  ? 'border-yellow-200 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10'
                  : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                }
              `}
            >
              <div className="p-3 sm:p-4">
                {/* 役名ヘッダー */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200">
                    {stop.name}
                  </h4>
                  {stop.settingDiff && (
                    <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                      設定差あり
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* リールイラスト */}
                  {stop.reelPattern && (
                    <div className="flex-shrink-0 flex justify-center sm:justify-start">
                      <ReelDisplay pattern={stop.reelPattern} />
                    </div>
                  )}

                  {/* テキスト情報 */}
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-1.5 py-0.5 rounded font-semibold flex-shrink-0 mt-0.5">打ち方</span>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{stop.how}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded font-semibold flex-shrink-0 mt-0.5">停止形</span>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{stop.stopForm}</p>
                    </div>
                    {stop.settingDiff && (
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded font-semibold flex-shrink-0 mt-0.5">設定差</span>
                        <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-400 font-medium">{stop.settingDiff}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 注意書き */}
        {notes && notes.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-1">
            {notes.map((note, i) => (
              <p key={i} className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-1.5">
                <span className="flex-shrink-0">⚠️</span>
                <span>{note}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
