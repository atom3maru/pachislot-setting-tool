import type { InputData, CalculationResult } from '../types';
import { PROB, PERF, CONFIRMED_MIN_SETTING } from '../data/machineData';

const NUM_SETTINGS = 6;

/** ポアソン対数尤度: k * log(n * rate) - n * rate */
function poissonLL(k: number, n: number, rate: number): number {
  const lambda = n * rate;
  if (lambda <= 0) return 0;
  return k * Math.log(lambda) - lambda;
}

/** カテゴリカル対数尤度: count * log(rate) */
function categoricalLL(count: number, rate: number): number {
  if (count <= 0) return 0;
  if (rate <= 0) return 0; // 確定演出はフィルタで処理するため、ここではペナルティ不要
  return count * Math.log(rate);
}

/** ソフトマックス関数 */
function softmax(scores: number[]): number[] {
  const maxScore = Math.max(...scores);
  const exps = scores.map(s => Math.exp(s - maxScore));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

/**
 * 確定演出から最低設定を算出する。
 * 複数の確定演出が入力されている場合、最も高い最低設定を採用する。
 * 例: +44枚(設定4以上) + キリントロフィー(設定5以上) → 最低設定5
 */
function getConfirmedMinSetting(input: InputData): number {
  let minSetting = 1;
  for (const [key, requiredSetting] of Object.entries(CONFIRMED_MIN_SETTING)) {
    const count = input[key as keyof InputData] as number | null;
    if (count != null && count > 0) {
      minSetting = Math.max(minSetting, requiredSetting);
    }
  }
  return minSetting;
}

/** カテゴリグループの尤度を加算するヘルパー（確定演出キーはスキップ） */
function addCategoricalGroup(
  scores: number[],
  input: InputData,
  rateTable: Record<string, number[]> | undefined,
) {
  if (!rateTable) return;
  for (const key of Object.keys(rateTable)) {
    // 確定演出のキーはフィルタで処理済みなので、尤度計算からスキップ
    if (key in CONFIRMED_MIN_SETTING) continue;

    const count = input[key as keyof InputData] as number | null;
    if (count != null && count > 0) {
      for (let s = 0; s < NUM_SETTINGS; s++) {
        scores[s] += categoricalLL(count, rateTable[key][s]);
      }
    }
  }
}

/** ベイズ推定メイン計算 */
export function calculate(input: InputData): CalculationResult {
  const scores = new Array(NUM_SETTINGS).fill(0);
  const totalG = input.totalG;

  // --- Step 1: 確定演出フィルタ ---
  // 確定演出が入力されていたら、該当設定未満を排除する
  const confirmedMin = getConfirmedMinSetting(input);

  // --- Step 2: 確率系スコア ---
  if (totalG && totalG > 0) {
    for (let s = 0; s < NUM_SETTINGS; s++) {
      if (input.bonusCnt != null && input.bonusCnt >= 0) {
        scores[s] += poissonLL(input.bonusCnt, totalG, PROB.bonus[s]);
      }
      if (input.stCnt != null && input.stCnt >= 0) {
        scores[s] += poissonLL(input.stCnt, totalG, PROB.st[s]);
      }
      if (input.bellCnt != null && input.bellCnt >= 0) {
        scores[s] += poissonLL(input.bellCnt, totalG, PROB.bell[s]);
      }
    }
  }

  // 3周期目当選率（二項分布）
  if (input.p3Total != null && input.p3Total > 0 && input.p3Bonus != null) {
    for (let s = 0; s < NUM_SETTINGS; s++) {
      const p = PROB.p3[s];
      const k = input.p3Bonus;
      const n = input.p3Total;
      scores[s] += k * Math.log(p) + (n - k) * Math.log(1 - p);
    }
  }

  // --- Step 3: 演出系スコア（確定演出キーは除外済み）---
  addCategoricalGroup(scores, input, PERF.voice);
  addCategoricalGroup(scores, input, PERF.chara);
  addCategoricalGroup(scores, input, PERF.endScreen);
  addCategoricalGroup(scores, input, PERF.medal456);
  addCategoricalGroup(scores, input, PERF.medal666);
  addCategoricalGroup(scores, input, PERF.zoro);
  addCategoricalGroup(scores, input, PERF.shunjou3000);
  addCategoricalGroup(scores, input, PERF.itemBow);
  addCategoricalGroup(scores, input, PERF.trophy);

  // --- Step 4: ソフトマックスで確率化 ---
  let probabilities = softmax(scores);

  // --- Step 5: 確定演出フィルタ適用 ---
  // confirmedMin 未満の設定を 0% にし、残りを再正規化
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

/** 総合判定コメント */
export function getJudgment(
  input: InputData,
  result: CalculationResult
): { message: string; level: 'high' | 'mid' | 'low' } {
  const p = result.probabilities;
  const cMin = result.confirmedMin ?? 1;

  // 虹トロフィー確認 = 設定6確定
  if (input.t_rainbow != null && input.t_rainbow >= 1) {
    return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
  }

  // 水着終了画面が1回以上
  if (input.e_mizugi != null && input.e_mizugi >= 1) {
    return { message: '設定6がほぼ確定！水着終了画面を確認済み', level: 'high' };
  }

  // 666 OVER 確認
  if (input.m666_hit != null && input.m666_hit >= 1) {
    return { message: '設定6濃厚！666 OVERを確認済み', level: 'high' };
  }

  // +66枚 or +77枚 ゾロ目
  if ((input.zoro66 != null && input.zoro66 >= 1) || (input.zoro77 != null && input.zoro77 >= 1)) {
    return { message: '設定6濃厚！ゾロ目上乗せ+66/+77枚を確認済み', level: 'high' };
  }

  // 確定演出で最低設定が判明している場合のメッセージ
  if (cMin >= 5) {
    return {
      message: `設定${cMin}以上確定！（設定5: ${(p[4] * 100).toFixed(1)}% / 設定6: ${(p[5] * 100).toFixed(1)}%）`,
      level: 'high',
    };
  }

  if (cMin >= 4) {
    return {
      message: `設定4以上確定！（設定4: ${(p[3] * 100).toFixed(1)}% / 設定5: ${(p[4] * 100).toFixed(1)}% / 設定6: ${(p[5] * 100).toFixed(1)}%）`,
      level: 'high',
    };
  }

  // 設定5・6の合計 > 60%
  const p56 = p[4] + p[5];
  if (p56 > 0.60) {
    return {
      message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56 * 100).toFixed(1)}%）`,
      level: 'high',
    };
  }

  // 設定4以上の合計 > 65%
  const p456 = p[3] + p[4] + p[5];
  if (p456 > 0.65) {
    return {
      message: `中〜高設定の可能性あり（設定4以上合算: ${(p456 * 100).toFixed(1)}%）`,
      level: 'mid',
    };
  }

  // 設定1の可能性 > 40%
  if (p[0] > 0.40) {
    return {
      message: `設定1の可能性が高い（${(p[0] * 100).toFixed(1)}%）。ヤメ時検討`,
      level: 'low',
    };
  }

  return {
    message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely - 1] * 100).toFixed(1)}%）。データを追加して精度を上げましょう`,
    level: 'low',
  };
}

/** 入力ヒントを生成 */
export function getHints(input: InputData): string[] {
  const hints: string[] = [];
  if (input.totalG == null || input.totalG === 0) {
    hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
  }
  const voiceTotal = [input.v_none, input.v_male, input.v_female, input.v_kage, input.v_nana]
    .filter(v => v != null && v > 0).length;
  if (voiceTotal === 0) {
    hints.push('逆押しカットインボイスのデータも記録すると精度が向上します');
  }
  const charaTotal = [input.c_female, input.c_male, input.c_bima]
    .filter(v => v != null && v > 0).length;
  if (charaTotal === 0) {
    hints.push('キャラ紹介データを入力するとさらに精度が上がります');
  }
  const endTotal = [input.e_normal, input.e_all, input.e_mizugi]
    .filter(v => v != null && v > 0).length;
  if (endTotal === 0) {
    hints.push('ST終了画面を確認して入力してください（水着画面=設定6濃厚）');
  }
  const trophyTotal = [input.t_copper, input.t_silver, input.t_gold, input.t_kirin, input.t_rainbow]
    .filter(v => v != null && v > 0).length;
  if (trophyTotal === 0) {
    hints.push('サミートロフィーの色を確認してください（虹=設定6確定）');
  }
  return hints;
}
