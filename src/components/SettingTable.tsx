import type { MachineConfig } from '../types/machine';

interface SettingTableProps {
  config: MachineConfig;
}

/** probEntryのkeyから日本語ラベルへの自動マッピング */
const KEY_LABEL_MAP: Record<string, string> = {
  atCnt: 'AT初当たり',
  bonusCnt: 'ボーナス確率',
  czCnt: 'CZ確率',
  bellCnt: 'ベル確率',
  suikaCnt: 'スイカ確率',
  stCnt: 'ST確率',
};

function getLabel(key: string): string {
  return KEY_LABEL_MAP[key] ?? key;
}

/** 確率(1Gあたり)を 1/X 形式の文字列に変換 */
function formatRate(rate: number): string {
  if (rate <= 0) return '-';
  const denom = 1 / rate;
  return `1/${denom.toFixed(1)}`;
}

export default function SettingTable({ config }: SettingTableProps) {
  const labels = config.settingLabels ?? ['1', '2', '3', '4', '5', '6'];
  const hasPayoutRates = config.payoutRates && config.payoutRates.length === labels.length;

  // probEntriesが無い場合は何も表示しない
  if (config.probEntries.length === 0 && !hasPayoutRates) return null;

  return (
    <div className="rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 animate-slide-up">
      {/* ヘッダー */}
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
          <span>📊</span> 設定別スペック
        </h3>
      </div>

      {/* テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold">
              <th className="px-2 sm:px-3 py-2 text-left whitespace-nowrap">設定</th>
              {config.probEntries.map((entry) => (
                <th key={entry.key} className="px-2 sm:px-3 py-2 text-center whitespace-nowrap">
                  {getLabel(entry.key)}
                </th>
              ))}
              {hasPayoutRates && (
                <th className="px-2 sm:px-3 py-2 text-center whitespace-nowrap">出玉率</th>
              )}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, idx) => {
              const isSetting6 = idx === labels.length - 1;
              return (
                <tr
                  key={idx}
                  className={
                    isSetting6
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : idx % 2 === 1
                        ? 'bg-gray-50 dark:bg-gray-800/50'
                        : 'bg-white dark:bg-gray-800'
                  }
                >
                  <td className="px-2 sm:px-3 py-2 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                    設定{label}
                  </td>
                  {config.probEntries.map((entry) => (
                    <td key={entry.key} className="px-2 sm:px-3 py-2 text-center text-gray-700 dark:text-gray-300 whitespace-nowrap font-mono">
                      {formatRate(entry.rates[idx])}
                    </td>
                  ))}
                  {hasPayoutRates && (
                    <td className="px-2 sm:px-3 py-2 text-center text-gray-700 dark:text-gray-300 whitespace-nowrap font-mono">
                      {config.payoutRates![idx].toFixed(1)}%
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
