import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'valvrave2',
  name: 'Lパチスロ 革命機ヴァルヴレイヴ2',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-violet-700 to-fuchsia-600',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '最重要の設定差' },
            { key: 'czCnt', label: 'CZ当選回数', hint: '設定差あり' },
            { key: 'czTotal', label: 'CZ抽選回数', hint: 'CZ当選の分母' },
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
            { key: 'e_default', label: 'デフォルト', hint: '通常画面' },
            { key: 'e_group', label: '集合画面', hint: '高設定示唆' },
            { key: 'e_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6確定!!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/374.5, 1/365.2, 1/348.3, 1/312.0, 1/286.5, 1/264.3] },
    { key: 'czCnt', totalKey: 'totalG', rates: [1/185.2, 1/178.6, 1/168.4, 1/152.3, 1/140.8, 1/131.5] },
  ],

  binomialEntries: [
    { hitKey: 'czCnt', totalKey: 'czTotal', rates: [0.28, 0.30, 0.33, 0.37, 0.41, 0.45] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_group', 'e_special'],
      rates: {
        e_default: [0.980, 0.970, 0.955, 0.935, 0.910, 0.880],
        e_group:   [0.020, 0.030, 0.045, 0.065, 0.090, 0.115],
        e_special: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
    {
      keys: ['t_copper', 't_silver', 't_gold', 't_kirin', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        t_kirin:   [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
  ],

  confirmedMin: {
    t_copper: 2, t_silver: 3, t_gold: 4, t_kirin: 5, t_rainbow: 6,
    e_special: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.t_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
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
    if (!['e_default', 'e_group', 'e_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認して入力してください（特殊画面=設定6濃厚）');
    if (!['t_copper', 't_silver', 't_gold', 't_kirin', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーの色を確認してください（虹=設定6確定）');
    return hints;
  },
};

export default config;
