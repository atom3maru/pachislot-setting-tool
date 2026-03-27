import type { EnhancedJudgment } from '../types/machine';

interface JudgmentParams {
  probabilities: number[];
  settingLabels: string[];
  payoutRates?: number[];
  baseCoins?: number;
  totalGames?: number;
  inputFieldCount: number;   // null/0でないフィールド数
  baseJudgment: { message: string; level: 'high' | 'mid' | 'low' };
}

export function enhanceJudgment(params: JudgmentParams): EnhancedJudgment {
  const {
    probabilities, settingLabels, payoutRates, baseCoins = 30,
    totalGames, inputFieldCount, baseJudgment,
  } = params;

  // 信頼度判定
  let confidence: 'high' | 'mid' | 'low' = 'low';
  if (totalGames != null) {
    if (totalGames >= 3000 && inputFieldCount >= 5) confidence = 'high';
    else if (totalGames >= 1000 && inputFieldCount >= 3) confidence = 'mid';
  }

  // 期待収支計算
  let expectedIncome: number | undefined;
  if (payoutRates && payoutRates.length === probabilities.length) {
    const weightedPayout = probabilities.reduce(
      (sum, p, i) => sum + p * payoutRates[i], 0
    );
    // 1000Gあたりの期待枚数差
    const coinPerG = 50 / baseCoins; // 1Gあたりのコイン消費
    expectedIncome = Math.round(1000 * coinPerG * (weightedPayout - 100) / 100);
  }

  // やめ時判定
  let shouldStop = false;
  let stopReason: string | undefined;

  // 低設定判定（設定1+2の確率が70%以上）
  const lowSettingProb = getLowSettingProb(probabilities, settingLabels);
  if (lowSettingProb >= 0.70 && confidence !== 'low') {
    shouldStop = true;
    stopReason = `低設定の可能性が高い（設定1+2合算: ${(lowSettingProb * 100).toFixed(0)}%）`;
  }

  // 期待収支がマイナスかつ信頼度が中以上
  if (expectedIncome != null && expectedIncome < -30 && confidence !== 'low') {
    shouldStop = true;
    stopReason = stopReason || `期待収支がマイナス（1000Gあたり${expectedIncome}枚）`;
  }

  return {
    ...baseJudgment,
    expectedIncome,
    confidence,
    shouldStop,
    stopReason,
  };
}

function getLowSettingProb(probs: number[], labels: string[]): number {
  let sum = 0;
  for (let i = 0; i < labels.length; i++) {
    const s = parseInt(labels[i], 10);
    if (s <= 2) sum += probs[i];
  }
  return sum;
}
