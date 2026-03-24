// 汎用ベイズ推定エンジン
import type { MachineConfig, CalcResult } from '../types/machine';

const DEFAULT_NUM_SETTINGS = 6;

/** ポアソン対数尤度 */
function poissonLL(k: number, n: number, rate: number): number {
  const lambda = n * rate;
  if (lambda <= 0) return 0;
  return k * Math.log(lambda) - lambda;
}

/** カテゴリカル対数尤度 */
function categoricalLL(count: number, rate: number): number {
  if (count <= 0 || rate <= 0) return 0;
  return count * Math.log(rate);
}

/** ソフトマックス */
function softmax(scores: number[]): number[] {
  const maxScore = Math.max(...scores);
  const exps = scores.map(s => Math.exp(s - maxScore));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

/** 確定演出から最低設定を算出 */
function getConfirmedMinSetting(
  input: Record<string, number | null>,
  confirmedMap: Record<string, number>
): number {
  let minSetting = 1;
  for (const [key, requiredSetting] of Object.entries(confirmedMap)) {
    const count = input[key];
    if (count != null && count > 0) {
      minSetting = Math.max(minSetting, requiredSetting);
    }
  }
  return minSetting;
}

/** 汎用計算関数 */
export function calculate(
  input: Record<string, number | null>,
  config: MachineConfig
): CalcResult {
  const numSettings = config.settingLabels?.length ?? DEFAULT_NUM_SETTINGS;
  const scores = new Array(numSettings).fill(0);

  // Step 1: 確定演出フィルタ
  const confirmedMin = getConfirmedMinSetting(input, config.confirmedMin);

  // Step 2: 確率系（ポアソン尤度）
  for (const entry of config.probEntries) {
    const count = input[entry.key];
    const total = input[entry.totalKey];
    if (count != null && count >= 0 && total != null && total > 0) {
      for (let s = 0; s < numSettings; s++) {
        scores[s] += poissonLL(count, total, entry.rates[s]);
      }
    }
  }

  // Step 3: 二項分布
  for (const entry of config.binomialEntries) {
    const k = input[entry.hitKey];
    const n = input[entry.totalKey];
    if (k != null && n != null && n > 0) {
      for (let s = 0; s < numSettings; s++) {
        const p = entry.rates[s];
        scores[s] += k * Math.log(p) + (n - k) * Math.log(1 - p);
      }
    }
  }

  // Step 4: カテゴリカル尤度
  for (const group of config.categoricalGroups) {
    for (const key of group.keys) {
      if (key in config.confirmedMin) continue; // 確定演出はスキップ
      const count = input[key];
      if (count != null && count > 0) {
        for (let s = 0; s < numSettings; s++) {
          scores[s] += categoricalLL(count, group.rates[key][s]);
        }
      }
    }
  }

  // Step 5: ソフトマックス
  let probabilities = softmax(scores);

  // Step 6: 確定演出フィルタ適用
  if (confirmedMin > 1) {
    for (let s = 0; s < confirmedMin - 1; s++) {
      probabilities[s] = 0;
    }
    const sum = probabilities.reduce((a, b) => a + b, 0);
    if (sum > 0) {
      probabilities = probabilities.map(p => p / sum);
    }
  }

  const mostLikely = probabilities.indexOf(Math.max(...probabilities)) + 1;

  return { probabilities, mostLikely, confirmedMin };
}
