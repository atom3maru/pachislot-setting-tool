import type { HyenaExpectedValue } from '../types/machine';

/** 線形補間で期待値を算出 */
export function interpolateExpectedValue(
  currentGame: number,
  table: HyenaExpectedValue[]
): number {
  if (table.length === 0) return 0;

  // テーブルをG数でソート
  const sorted = [...table].sort((a, b) => a.fromGame - b.fromGame);

  // テーブル範囲外の場合
  if (currentGame <= sorted[0].fromGame) return sorted[0].expectedYen;
  if (currentGame >= sorted[sorted.length - 1].fromGame) return sorted[sorted.length - 1].expectedYen;

  // 補間
  for (let i = 0; i < sorted.length - 1; i++) {
    if (currentGame >= sorted[i].fromGame && currentGame <= sorted[i + 1].fromGame) {
      const ratio = (currentGame - sorted[i].fromGame) / (sorted[i + 1].fromGame - sorted[i].fromGame);
      return Math.round(sorted[i].expectedYen + ratio * (sorted[i + 1].expectedYen - sorted[i].expectedYen));
    }
  }

  return sorted[sorted.length - 1].expectedYen;
}
