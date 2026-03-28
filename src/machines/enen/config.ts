import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'enen',
  name: 'Lパチスロ 炎炎ノ消防隊2',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-red-700 to-orange-600',

  sections: [
    {
      title: '確率系データ', icon: '🔥',
      groups: [{
        columns: 3,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
          { key: 'bonusCnt', label: 'ボーナス初当たり回数' },
          { key: 'loopCnt', label: '炎炎ループ初当たり回数', hint: '炎炎激闘/大戦合算' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🎬',
      groups: [
        {
          label: 'ボーナス終了画面', columns: 3,
          fields: [
            { key: 'es_normal', label: '通常画面', hint: 'デフォルト' },
            { key: 'es_special', label: '特殊キャラ', hint: '高設定示唆' },
            { key: 'es_kurono', label: '黒野', hint: '設定4以上!' },
            { key: 'es_joker', label: 'ジョーカー', hint: '設定5以上!' },
            { key: 'es_shinra_death', label: 'シンラ(死ノ圧)', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'REG中キャラ紹介（特殊キャラ出現回数）', columns: 3,
          fields: [
            { key: 'reg_normal', label: '通常キャラ' },
            { key: 'reg_kurono', label: '黒野', hint: '設定4以上!' },
            { key: 'reg_joker', label: 'ジョーカー', hint: '設定5以上!' },
            { key: 'reg_shinra', label: 'シンラ(死ノ圧)', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'エンディング中ミニキャラ', columns: 3,
          fields: [
            { key: 'ed_119', label: '119', hint: '設定2以上濃厚' },
            { key: 'ed_iris', label: 'アイリス', hint: '設定4以上!' },
            { key: 'ed_benimaru', label: '紅丸&ジョーカー', hint: '設定5以上!' },
            { key: 'ed_sho', label: 'ショウ', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '獲得枚数表示', columns: 2,
          fields: [
            { key: 'medal_119', label: '119枚OVER回数', hint: '設定2以上濃厚' },
            { key: 'medal_246', label: '246枚OVER回数', hint: '偶数設定濃厚' },
            { key: 'medal_456', label: '456枚OVER回数', hint: '設定4以上濃厚!' },
            { key: 'medal_666', label: '666枚OVER回数', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: '伝導者の罠', icon: '⚙️',
      groups: [{
        label: '十字目変換', columns: 2,
        fields: [
          { key: 'cross_hit', label: '変換発生回数', hint: '高設定ほど高い' },
          { key: 'cross_total', label: 'リプレイ小V回数', hint: '分母' },
        ],
      }],
    },
  ],

  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/272, 1/269, 1/257, 1/242, 1/236, 1/227] },
    { key: 'loopCnt', totalKey: 'totalG', rates: [1/684, 1/662, 1/617, 1/546, 1/518, 1/486] },
  ],

  binomialEntries: [
    // 十字目変換発生率
    { hitKey: 'cross_hit', totalKey: 'cross_total', rates: [0.42, 0.43, 0.44, 0.46, 0.48, 0.50] },
  ],

  categoricalGroups: [
    {
      keys: ['es_normal', 'es_special', 'es_kurono', 'es_joker', 'es_shinra_death'],
      rates: {
        es_normal:       [0.860, 0.830, 0.810, 0.770, 0.740, 0.700],
        es_special:      [0.140, 0.160, 0.170, 0.180, 0.190, 0.200],
        es_kurono:       [0.000, 0.000, 0.000, 0.030, 0.030, 0.040],
        es_joker:        [0.000, 0.000, 0.000, 0.000, 0.020, 0.030],
        es_shinra_death: [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
    {
      keys: ['reg_normal', 'reg_kurono', 'reg_joker', 'reg_shinra'],
      rates: {
        reg_normal: [1.000, 1.000, 1.000, 0.970, 0.950, 0.930],
        reg_kurono: [0.000, 0.000, 0.000, 0.020, 0.020, 0.025],
        reg_joker:  [0.000, 0.000, 0.000, 0.000, 0.020, 0.025],
        reg_shinra: [0.000, 0.000, 0.000, 0.000, 0.000, 0.015],
      },
    },
    {
      keys: ['ed_119', 'ed_iris', 'ed_benimaru', 'ed_sho'],
      rates: {
        ed_119:      [0.000, 0.050, 0.050, 0.050, 0.050, 0.050],
        ed_iris:     [0.000, 0.000, 0.000, 0.030, 0.030, 0.030],
        ed_benimaru: [0.000, 0.000, 0.000, 0.000, 0.020, 0.020],
        ed_sho:      [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
    {
      keys: ['medal_119', 'medal_246', 'medal_456', 'medal_666'],
      rates: {
        medal_119: [0.000, 0.030, 0.030, 0.030, 0.030, 0.030],
        medal_246: [0.000, 0.020, 0.000, 0.020, 0.000, 0.020],
        medal_456: [0.000, 0.000, 0.000, 0.015, 0.015, 0.020],
        medal_666: [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
  ],

  confirmedMin: {
    es_kurono: 4, es_joker: 5, es_shinra_death: 6,
    reg_kurono: 4, reg_joker: 5, reg_shinra: 6,
    ed_119: 2, ed_iris: 4, ed_benimaru: 5, ed_sho: 6,
    medal_119: 2, medal_246: 2, medal_456: 4, medal_666: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.es_shinra_death ?? 0) >= 1 || (input.reg_shinra ?? 0) >= 1 || (input.ed_sho ?? 0) >= 1 || (input.medal_666 ?? 0) >= 1) {
      return { message: '設定6濃厚！確定演出を確認済み', level: 'high' };
    }
    if (cMin >= 5) return { message: `設定${cMin}以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[4] + p[5];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.loopCnt == null) hints.push('炎炎ループ初当たり回数は最重要の設定差要素です');
    if (!['es_normal','es_special','es_kurono','es_joker','es_shinra_death'].some(k => (input[k] ?? 0) > 0))
      hints.push('ボーナス終了画面を確認して入力してください');
    if (!['ed_119','ed_iris','ed_benimaru','ed_sho'].some(k => (input[k] ?? 0) > 0))
      hints.push('エンディング中のミニキャラを確認してください');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.7, 98.8, 101.2, 105.6, 110.2, 114.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_loop', label: '炎炎ループ初当たりカウント', category: '通常時' },
    { id: 'ck_trap', label: '伝導者の罠成功失敗', category: 'ボーナス中' },
    { id: 'ck_endscreen', label: '終了画面パターン', category: 'ボーナス終了時' },
    { id: 'ck_reg_chara', label: 'RB中キャラ紹介', category: 'ボーナス中' },
    { id: 'ck_medal', label: '獲得枚数表示', category: 'AT中' },
    { id: 'ck_ed_mini', label: 'エンディングミニキャラ', category: 'エンディング中' },
    { id: 'ck_eyecatch', label: 'アイキャッチパターン', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      '炎炎ループ初当たり確率が最重要',
      '伝導者の罠成功期待度',
      'ボーナス終了画面',
    ],
    morningCheck: [
      'アイキャッチでモード示唆',
      '45-88Gゾーン確認',
    ],
    quitTiming: [
      'RB後伝導者の罠終了後',
      '炎炎激闘後潜伏28G確認',
    ],
  },

  hyena: {
    ceilingGame: 850,
    ceilingBenefit: '850G到達でボーナス当選（リセット時650G）',
    zones: [
      { start: 45, end: 88, label: 'リセット後ゾーン', strength: 'hot' },
      { start: 155, end: 250, label: 'リセット後ゾーン', strength: 'warm' },
      { start: 750, end: 850, label: '天井間近', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -868 },
      { fromGame: 100, expectedYen: -682 },
      { fromGame: 200, expectedYen: -418 },
      { fromGame: 300, expectedYen: -44 },
      { fromGame: 400, expectedYen: 487 },
      { fromGame: 500, expectedYen: 1239 },
      { fromGame: 600, expectedYen: 2306 },
      { fromGame: 700, expectedYen: 3818 },
      { fromGame: 800, expectedYen: 5963 },
    ],
    resetInfo: 'リセット時は天井650Gに短縮',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
