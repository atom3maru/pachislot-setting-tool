import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'okidoki_duo',
  name: 'スマスロ 沖ドキ！DUOアンコール',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-pink-500 to-orange-400',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: '初当たり回数', hint: 'ボーナス合算' },
            { key: 'cherryCnt', label: 'チェリー回数', hint: '設定差あり' },
          ],
        },
      ],
    },
    {
      title: 'モード・天国関連', icon: '📊',
      groups: [
        {
          label: '32G以内天国移行', columns: 2,
          fields: [
            { key: 'heaven32', label: '32G以内当選回数', hint: '天国移行示唆' },
            { key: 'bonusTotal', label: 'ボーナス総回数', hint: '上記の分母用' },
          ],
        },
      ],
    },
    {
      title: '演出系データ', icon: '🎬',
      groups: [
        {
          label: 'ボーナス終了画面', columns: 3,
          fields: [
            { key: 'e_normal', label: '通常画面', hint: 'デフォルト' },
            { key: 'e_pair', label: 'ペア画面', hint: '高設定示唆' },
            { key: 'e_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '点灯パターン', columns: 2,
          fields: [
            { key: 'l_duo', label: 'DUO点灯', hint: '設定4以上示唆' },
            { key: 'l_rainbow', label: 'レインボー点灯', hint: '設定6確定!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/233.6, 1/228.3, 1/221.2, 1/210.5, 1/198.1, 1/188.6] },
    { key: 'cherryCnt', totalKey: 'totalG', rates: [1/42.8, 1/41.5, 1/40.2, 1/38.6, 1/37.1, 1/35.8] },
  ],

  binomialEntries: [
    { hitKey: 'heaven32', totalKey: 'bonusTotal', rates: [0.15, 0.18, 0.21, 0.25, 0.29, 0.33] },
  ],

  categoricalGroups: [
    {
      keys: ['e_normal', 'e_pair', 'e_special'],
      rates: {
        e_normal:  [0.975, 0.960, 0.945, 0.925, 0.900, 0.870],
        e_pair:    [0.025, 0.040, 0.055, 0.075, 0.100, 0.125],
        e_special: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
    {
      keys: ['l_duo', 'l_rainbow'],
      rates: {
        l_duo:     [0.000, 0.000, 0.000, 0.010, 0.015, 0.020],
        l_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_special: 6,
    l_duo: 4,
    l_rainbow: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.l_rainbow ?? 0) >= 1) return { message: '設定6確定！レインボー点灯を確認済み', level: 'high' };
    if ((input.e_special ?? 0) >= 1) return { message: '設定6濃厚！特殊終了画面を確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定${cMin}以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[4] + p[5];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.bonusCnt == null) hints.push('初当たり回数は最重要の設定差要素です');
    if (input.cherryCnt == null) hints.push('チェリー確率に設定差があります。カウントしましょう');
    if (input.heaven32 == null) hints.push('32G以内の天国移行回数をカウントすると精度が上がります');
    if (!['e_normal', 'e_pair', 'e_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('ボーナス終了画面を確認してください');
    return hints;
  },
};

export default config;
