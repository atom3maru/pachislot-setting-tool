import type { PlayGuideInfo } from '../types/machine';

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

      <div className="p-4 space-y-4">
        {/* 基本の打ち方 */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {basicHow}
          </p>
        </div>

        {/* レア役テーブル */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold">
                <th className="px-2 sm:px-3 py-2 text-left whitespace-nowrap">役名</th>
                <th className="px-2 sm:px-3 py-2 text-left whitespace-nowrap">打ち方</th>
                <th className="px-2 sm:px-3 py-2 text-left whitespace-nowrap">停止形</th>
                <th className="px-2 sm:px-3 py-2 text-left whitespace-nowrap">設定差</th>
              </tr>
            </thead>
            <tbody>
              {reelStops.map((stop, i) => (
                <tr
                  key={stop.name}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    stop.settingDiff
                      ? 'bg-yellow-50 dark:bg-yellow-900/10'
                      : i % 2 === 1
                        ? 'bg-gray-50 dark:bg-gray-800/50'
                        : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <td className="px-2 sm:px-3 py-2 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    {stop.name}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-gray-700 dark:text-gray-300">
                    {stop.how}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-gray-700 dark:text-gray-300">
                    {stop.stopForm}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-gray-600 dark:text-gray-400">
                    {stop.settingDiff ? (
                      <span className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {stop.settingDiff}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
