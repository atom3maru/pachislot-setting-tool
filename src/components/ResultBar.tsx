interface Props {
  result: {
    probabilities: number[];
    mostLikely: number;
    confirmedMin?: number;
  } | null;
  settingLabels?: string[];
}

const BAR_COLORS = [
  'bg-blue-400',    // 設定1
  'bg-blue-500',    // 設定2
  'bg-blue-600',    // 設定3
  'bg-amber-500',   // 設定4
  'bg-orange-500',  // 設定5
  'bg-red-500',     // 設定6
];

const TEXT_COLORS = [
  'text-blue-600 dark:text-blue-400',
  'text-blue-700 dark:text-blue-300',
  'text-blue-800 dark:text-blue-200',
  'text-amber-600 dark:text-amber-400',
  'text-orange-600 dark:text-orange-400',
  'text-red-600 dark:text-red-400',
];

export default function ResultBar({ result, settingLabels }: Props) {
  if (!result) return null;

  const { probabilities, mostLikely } = result;
  const labels = settingLabels ?? probabilities.map((_, i) => String(i + 1));
  const maxProb = Math.max(...probabilities);

  return (
    <div className="space-y-2">
      {probabilities.map((prob, i) => {
        const pct = (prob * 100).toFixed(1);
        const barWidth = maxProb > 0 ? (prob / maxProb) * 100 : 0;
        const isMostLikely = i + 1 === mostLikely;
        return (
          <div key={i} className={`flex items-center gap-2 ${isMostLikely ? 'scale-[1.02]' : 'opacity-80'} transition-all`}>
            <span className={`w-12 text-right text-sm font-bold ${TEXT_COLORS[i % TEXT_COLORS.length]}`}>
              設定{labels[i]}
            </span>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
              <div
                className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-500 flex items-center justify-end pr-2`}
                style={{ width: `${Math.max(barWidth, 2)}%` }}
              >
                {barWidth > 15 && (
                  <span className="text-white text-xs font-bold">{pct}%</span>
                )}
              </div>
            </div>
            {barWidth <= 15 && (
              <span className={`text-xs font-bold ${TEXT_COLORS[i % TEXT_COLORS.length]} w-12`}>{pct}%</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
