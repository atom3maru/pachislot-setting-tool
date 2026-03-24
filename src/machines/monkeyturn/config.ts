import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'monkeyturn',
  name: 'スマスロモンキーターンV',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-cyan-600 to-blue-500',
  settingLabels: ['1', '2', '4', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '最重要の設定差' },
            { key: 'bellCnt', label: 'ベル回数', hint: '設定差あり' },
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
            { key: 'e_helmet', label: 'ヘルメット画面', hint: '設定4以上濃厚' },
            { key: 'e_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定4以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定5以上' },
            { key: 't_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6確定!!' },
          ],
        },
      ],
    },
  ],

  // 設定1,2,4,5,6の5段階
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/296.3, 1/288.5, 1/256.1, 1/238.4, 1/218.7] },
    { key: 'bellCnt', totalKey: 'totalG', rates: [1/8.5, 1/8.3, 1/7.9, 1/7.6, 1/7.3] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_group', 'e_helmet', 'e_special'],
      rates: {
        e_default: [0.975, 0.960, 0.930, 0.905, 0.870],
        e_group:   [0.020, 0.030, 0.050, 0.065, 0.085],
        e_helmet:  [0.005, 0.010, 0.020, 0.028, 0.040],
        e_special: [0.000, 0.000, 0.000, 0.002, 0.005],
      },
    },
    {
      keys: ['t_copper', 't_silver', 't_gold', 't_kirin', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020],
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005],
        t_kirin:   [0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
  ],

  confirmedMin: {
    t_copper: 2, t_silver: 4, t_gold: 5, t_kirin: 5, t_rainbow: 6,
    e_helmet: 4, e_special: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    // index: 0=設定1, 1=設定2, 2=設定4, 3=設定5, 4=設定6

    if ((input.t_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    if ((input.e_special ?? 0) >= 1) return { message: '設定6濃厚！特殊終了画面を確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定${cMin}以上確定！（設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[2]*100).toFixed(1)}% / 設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[3] + p[4];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[2] + p[3] + p[4];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.atCnt == null) hints.push('AT初当たり回数は最重要の設定差要素です');
    if (input.bellCnt == null) hints.push('ベル確率に設定差があります。カウントしましょう');
    if (!['e_default', 'e_group', 'e_helmet', 'e_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認して入力してください');
    if (!['t_copper', 't_silver', 't_gold', 't_kirin', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーの色を確認してください（虹=設定6確定）');
    return hints;
  },
};

export default config;
