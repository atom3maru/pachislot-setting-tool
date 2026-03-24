import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'mushokutensei',
  name: 'L無職転生',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-teal-600 to-cyan-500',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '最重要の設定差' },
            { key: 'koyakuCnt', label: '弱チェリー回数', hint: '設定差あり' },
          ],
        },
      ],
    },
    {
      title: '演出系データ', icon: '🎬',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'e_normal', label: '通常画面', hint: 'デフォルト' },
            { key: 'e_roxy', label: 'ロキシー画面', hint: '高設定示唆' },
            { key: 'e_eris', label: 'エリス画面', hint: '設定4以上濃厚' },
            { key: 'e_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '設定示唆演出', columns: 2,
          fields: [
            { key: 'c_high', label: '高設定示唆演出', hint: '設定4以上濃厚' },
            { key: 'c_confirm6', label: '設定6確定演出', hint: '設定6確定!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/356.4, 1/342.1, 1/325.6, 1/295.8, 1/272.3, 1/251.7] },
    { key: 'koyakuCnt', totalKey: 'totalG', rates: [1/106.8, 1/103.2, 1/98.5, 1/91.7, 1/87.3, 1/83.1] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['e_normal', 'e_roxy', 'e_eris', 'e_special'],
      rates: {
        e_normal:  [0.982, 0.970, 0.955, 0.930, 0.903, 0.868],
        e_roxy:    [0.013, 0.020, 0.030, 0.045, 0.060, 0.082],
        e_eris:    [0.005, 0.010, 0.015, 0.025, 0.035, 0.045],
        e_special: [0.000, 0.000, 0.000, 0.000, 0.002, 0.005],
      },
    },
    {
      keys: ['c_high', 'c_confirm6'],
      rates: {
        c_high:     [0.000, 0.000, 0.000, 0.020, 0.030, 0.040],
        c_confirm6: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_eris: 4, e_special: 6,
    c_high: 4, c_confirm6: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.c_confirm6 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.atCnt == null) hints.push('AT初当たり回数は最重要の設定差要素です');
    if (input.koyakuCnt == null) hints.push('弱チェリー確率に設定差があります。カウントしましょう');
    if (!['e_normal', 'e_roxy', 'e_eris', 'e_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認して入力してください（特殊画面=設定6濃厚）');
    return hints;
  },
};

export default config;
