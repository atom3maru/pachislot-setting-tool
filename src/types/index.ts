export interface InputData {
  // 確率系
  totalG: number | null;
  bonusCnt: number | null;
  stCnt: number | null;
  bellCnt: number | null;
  p3Bonus: number | null;
  p3Total: number | null;

  // 演出系 - ボイス
  v_none: number | null;
  v_male: number | null;
  v_female: number | null;
  v_kage: number | null;
  v_nana: number | null;

  // 演出系 - キャラ紹介
  c_female: number | null;
  c_male: number | null;
  c_bima: number | null;

  // 演出系 - ゾロ目上乗せ（種類別）
  zoro44: number | null;
  zoro55: number | null;
  zoro66: number | null;
  zoro77: number | null;

  // ST終了画面
  e_normal: number | null;
  e_all: number | null;
  e_mizugi: number | null;

  // 特定枚数到達示唆
  m456_hit: number | null;
  m456_none: number | null;
  m666_hit: number | null;
  m666_none: number | null;

  // 駿城ボーナス 3000pt
  s3k_hit: number | null;
  s3k_none: number | null;

  // アイテムくじ 菖蒲の弓
  bow_hit: number | null;
  bow_none: number | null;

  // サミートロフィー
  t_copper: number | null;
  t_silver: number | null;
  t_gold: number | null;
  t_kirin: number | null;
  t_rainbow: number | null;

  // その他
  nuki: number | null;
  cycle: number | null;
}

export interface CalculationResult {
  probabilities: number[];
  mostLikely: number;
  confirmedMin?: number; // 確定演出から判明した最低設定 (1-6)
}

export const INITIAL_INPUT: InputData = {
  totalG: null, bonusCnt: null, stCnt: null, bellCnt: null,
  p3Bonus: null, p3Total: null,
  v_none: null, v_male: null, v_female: null, v_kage: null, v_nana: null,
  c_female: null, c_male: null, c_bima: null,
  zoro44: null, zoro55: null, zoro66: null, zoro77: null,
  e_normal: null, e_all: null, e_mizugi: null,
  m456_hit: null, m456_none: null, m666_hit: null, m666_none: null,
  s3k_hit: null, s3k_none: null,
  bow_hit: null, bow_none: null,
  t_copper: null, t_silver: null, t_gold: null, t_kirin: null, t_rainbow: null,
  nuki: null, cycle: null,
};
