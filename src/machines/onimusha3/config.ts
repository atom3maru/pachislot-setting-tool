import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'onimusha3',
  name: 'スマスロ 新鬼武者3',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-red-800 to-amber-700',
  // 6段階設定（1,2,3,4,5,6）

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '設定4以上で大幅UP' },
            { key: 'bellCnt', label: '共通3枚ベル回数', hint: '上段揃い・設定差大!' },
          ],
        },
      ],
    },
    {
      title: '鬼斬チャージ・周期', icon: '⚔️',
      groups: [
        {
          label: '鬼斬チャージ当選', columns: 2,
          fields: [
            { key: 'onigiri_hit', label: '弱レア役→鬼斬チャージ当選数', hint: '高設定ほど優遇' },
            { key: 'onigiri_total', label: '弱レア役総数', hint: '弱チェリー+弱スイカ+弱チャンス目' },
          ],
        },
        {
          label: '周期（AT当選までの速さ）', columns: 2,
          fields: [
            { key: 'cycle1_hit', label: '1周期目AT当選回数', hint: '設定1:25%→設定6:75%' },
            { key: 'cycle_total', label: 'AT当選総回数', hint: '周期到達の分母' },
          ],
        },
      ],
    },
    {
      title: 'AT終了画面・トロフィー', icon: '🖼️',
      groups: [
        {
          label: 'AT終了画面', columns: 4,
          fields: [
            { key: 'e_default', label: 'デフォルト', hint: '基本パターン' },
            { key: 'e_akaneohatsu', label: '蒼鬼&茜', hint: '設定2以上濃厚' },
            { key: 'e_wos', label: '鬼武者WoS', hint: '設定3以上濃厚' },
            { key: 'e_genma', label: '幻魔集合', hint: '設定4以上濃厚!' },
            { key: 'e_kakusei', label: '覚醒鬼武者', hint: '設定5以上濃厚!' },
            { key: 'e_defo', label: 'デフォルメ集合', hint: '設定6濃厚!!' },
          ],
        },
        {
          label: 'エンタトロフィー', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_momiji', label: '紅葉柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: '特殊上乗せ・獲得枚数', icon: '📋',
      groups: [
        {
          label: '特殊上乗せG数', columns: 3,
          fields: [
            { key: 'add4', label: '+4G', hint: '設定4以上濃厚' },
            { key: 'add5', label: '+5G', hint: '設定5以上濃厚' },
            { key: 'add6', label: '+6G', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '獲得枚数表示', columns: 3,
          fields: [
            { key: 'm456', label: '456枚OVER', hint: '設定4以上濃厚' },
            { key: 'm555', label: '555枚OVER', hint: '設定5以上濃厚' },
            { key: 'm666', label: '666枚OVER', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/379.7, 1/372.7, 1/352.8, 1/306.5, 1/297.9, 1/293.1] },
    { key: 'bellCnt', totalKey: 'totalG', rates: [1/35.1, 1/33.5, 1/31.2, 1/29.5, 1/28.0, 1/26.7] },
  ],

  binomialEntries: [
    { hitKey: 'onigiri_hit', totalKey: 'onigiri_total', rates: [0.25, 0.28, 0.32, 0.36, 0.40, 0.44] },
    { hitKey: 'cycle1_hit', totalKey: 'cycle_total', rates: [0.25, 0.30, 0.40, 0.55, 0.65, 0.75] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_akaneohatsu', 'e_wos', 'e_genma', 'e_kakusei', 'e_defo'],
      rates: {
        e_default:     [0.95, 0.90, 0.85, 0.78, 0.72, 0.65],
        e_akaneohatsu: [0.00, 0.04, 0.04, 0.05, 0.05, 0.06],
        e_wos:         [0.00, 0.00, 0.04, 0.05, 0.06, 0.07],
        e_genma:       [0.00, 0.00, 0.00, 0.05, 0.06, 0.07],
        e_kakusei:     [0.00, 0.00, 0.00, 0.00, 0.05, 0.06],
        e_defo:        [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['t_copper', 't_silver', 't_gold', 't_momiji', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        t_momiji:  [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['add4', 'add5', 'add6'],
      rates: {
        add4: [0.00, 0.00, 0.00, 0.02, 0.02, 0.03],
        add5: [0.00, 0.00, 0.00, 0.00, 0.02, 0.02],
        add6: [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['m456', 'm555', 'm666'],
      rates: {
        m456: [0.00, 0.00, 0.00, 0.03, 0.03, 0.05],
        m555: [0.00, 0.00, 0.00, 0.00, 0.02, 0.03],
        m666: [0.00, 0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
  ],

  confirmedMin: {
    e_akaneohatsu: 2, e_wos: 3, e_genma: 4, e_kakusei: 5, e_defo: 6,
    t_copper: 2, t_silver: 3, t_gold: 4, t_momiji: 5, t_rainbow: 6,
    add4: 4, add5: 5, add6: 6,
    m456: 4, m555: 5, m666: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.e_defo ?? 0) >= 1 || (input.t_rainbow ?? 0) >= 1 || (input.add6 ?? 0) >= 1 || (input.m666 ?? 0) >= 1) {
      return { message: '設定6濃厚！確定級演出を確認済み', level: 'high' };
    }
    if (cMin >= 5) return { message: `設定5以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
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
    if (input.bellCnt == null) hints.push('共通3枚ベル（上段揃い）は重要な判別要素。カウントしましょう');
    if (input.onigiri_hit == null) hints.push('弱レア役からの鬼斬チャージ当選率に設定差あり');
    if (!['e_default', 'e_akaneohatsu', 'e_wos', 'e_genma', 'e_kakusei', 'e_defo'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください（幻魔集合=設定4以上、覚醒鬼武者=設定5以上）');
    return hints;
  },
};

export default config;
