export interface IncomeRow {
  games: number;
  expectedCoins: number;
  expectedYen: number;
}

export interface IncomeResult {
  weightedPayoutRate: number;
  rows: IncomeRow[];
}

export function calculateExpectedIncome(
  probabilities: number[],
  payoutRates: number[],
  baseCoins: number = 30,
  gamesList: number[] = [500, 1000, 2000, 3000],
  yenPerCoin: number = 20,  // 等価換金
): IncomeResult {
  // 加重平均機械割
  const weightedPayoutRate = probabilities.reduce(
    (sum, p, i) => sum + p * (payoutRates[i] || 100), 0
  );

  const coinPerG = 50 / baseCoins; // 1Gあたりのコイン消費

  const rows = gamesList.map(games => {
    const expectedCoins = Math.round(games * coinPerG * (weightedPayoutRate - 100) / 100);
    const expectedYen = expectedCoins * yenPerCoin;
    return { games, expectedCoins, expectedYen };
  });

  return { weightedPayoutRate, rows };
}
