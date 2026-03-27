import { useState } from 'react';
import { calculateExpectedIncome } from '../logic/incomeCalc';
import type { CalcResult, MachineConfig } from '../types/machine';

interface Props {
  result: CalcResult;
  config: MachineConfig;
}

const PRESET_GAMES = [500, 1000, 2000, 3000];

export default function IncomeSimulator({ result, config }: Props) {
  const [customGames, setCustomGames] = useState<number | null>(null);

  if (!config.payoutRates) return null;

  const gamesList = customGames ? [...PRESET_GAMES, customGames].sort((a, b) => a - b) : PRESET_GAMES;

  const income = calculateExpectedIncome(
    result.probabilities,
    config.payoutRates,
    config.baseCoins || 30,
    gamesList,
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          📊 期待収支シミュレーター
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {/* 加重平均機械割 */}
        <div className="text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">加重平均機械割</span>
          <div className={`text-3xl font-bold ${income.weightedPayoutRate >= 100 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {income.weightedPayoutRate.toFixed(1)}%
          </div>
        </div>

        {/* カスタムゲーム数入力 */}
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-600 dark:text-gray-400 whitespace-nowrap">カスタムG数:</label>
          <input
            type="number"
            min={100}
            max={10000}
            step={100}
            value={customGames ?? ''}
            onChange={e => {
              const v = parseInt(e.target.value, 10);
              setCustomGames(isNaN(v) ? null : v);
            }}
            placeholder="例: 1500"
            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
          />
        </div>

        {/* 期待収支テーブル */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 text-left text-gray-500 dark:text-gray-400 font-medium">残りG数</th>
                <th className="py-2 text-right text-gray-500 dark:text-gray-400 font-medium">期待枚数</th>
                <th className="py-2 text-right text-gray-500 dark:text-gray-400 font-medium">期待収支</th>
              </tr>
            </thead>
            <tbody>
              {income.rows.map(row => (
                <tr key={row.games} className="border-b border-gray-100 dark:border-gray-700/50">
                  <td className="py-2 text-gray-700 dark:text-gray-300">{row.games.toLocaleString()}G</td>
                  <td className={`py-2 text-right font-mono font-semibold ${row.expectedCoins >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {row.expectedCoins >= 0 ? '+' : ''}{row.expectedCoins.toLocaleString()}枚
                  </td>
                  <td className={`py-2 text-right font-mono font-semibold ${row.expectedYen >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {row.expectedYen >= 0 ? '+' : ''}¥{row.expectedYen.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
          ※ 等価換金（1枚=20円）、50枚あたり{config.baseCoins || 30}Gで計算
        </p>
      </div>
    </div>
  );
}
