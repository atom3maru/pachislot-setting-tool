interface Props {
  probabilities: number[];
  settingLabels?: string[];
  mostLikely: number;
}

const COLORS = [
  '#3B82F6', // 設定1 - blue
  '#06B6D4', // 設定2 - cyan
  '#10B981', // 設定3 - emerald
  '#F59E0B', // 設定4 - amber
  '#F97316', // 設定5 - orange
  '#EF4444', // 設定6 - red
];

export default function PieChart({ probabilities, settingLabels, mostLikely }: Props) {
  const labels = settingLabels || ['1', '2', '3', '4', '5', '6'];
  const radius = 70;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * radius;

  // 0%のセグメントを除外して描画
  let accumulatedOffset = 0;
  const segments = probabilities.map((prob, i) => {
    const dashLength = prob * circumference;
    const offset = circumference - accumulatedOffset;
    accumulatedOffset += dashLength;
    return {
      color: COLORS[i % COLORS.length],
      dashArray: `${dashLength} ${circumference - dashLength}`,
      dashOffset: offset,
      prob,
      label: labels[i],
    };
  }).filter(s => s.prob > 0.001); // 0.1%未満は非表示

  const mlLabel = labels[mostLikely - 1] ?? String(mostLikely);
  const mlProb = probabilities[mostLikely - 1] ?? 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          {/* 背景円 */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="28"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* データセグメント */}
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="28"
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              className="transition-all duration-500"
            />
          ))}
        </svg>
        {/* 中央テキスト */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">最有力</span>
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            設定{mlLabel}
          </span>
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {(mlProb * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      {/* 凡例 */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3">
        {probabilities.map((prob, i) => {
          if (prob < 0.001) return null;
          return (
            <div key={i} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <span
                className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>設定{labels[i]}: {(prob * 100).toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
