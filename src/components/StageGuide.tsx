import type { StageInfo } from '../types/machine';

interface Props {
  stages: StageInfo[];
}

const headerColorMap: Record<string, string> = {
  blue:   'bg-blue-600',
  amber:  'bg-amber-600',
  red:    'bg-red-600',
  green:  'bg-green-600',
  purple: 'bg-purple-600',
  gray:   'bg-gray-500',
};

function getHeaderBg(color: string): string {
  return headerColorMap[color] ?? headerColorMap.gray;
}

export default function StageGuide({ stages }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <span>🗺️</span> ステージ説明
        </h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stages.map((stage, i) => (
            <div
              key={stage.name}
              className="rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
            >
              {/* ステージ名ヘッダー */}
              <div className={`${getHeaderBg(stage.color)} px-4 py-2 rounded-t-xl`}>
                <span className="text-white font-bold text-sm">{stage.name}</span>
              </div>

              {/* 意味 */}
              <div className="px-4 py-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {stage.meaning}
                </p>
              </div>

              {/* 設定示唆バッジ + tips */}
              {(stage.settingHint || stage.tips) && (
                <div className="px-4 pb-3 space-y-2">
                  {stage.settingHint && (
                    <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {stage.settingHint}
                    </span>
                  )}
                  {stage.tips && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stage.tips}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
