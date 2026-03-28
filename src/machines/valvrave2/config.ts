import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'valvrave2',
  name: 'Lパチスロ 革命機ヴァルヴレイヴ2',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-violet-700 to-fuchsia-600',
  settingLabels: ['1', '2', '4', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: '初当たり合算回数', hint: '革命BN+決戦BN+AT直撃' },
          ],
        },
      ],
    },
    {
      title: 'ハラキリドライブ・AT直撃', icon: '⚡',
      groups: [
        {
          label: 'ハラキリドライブ（最重要判別要素）', columns: 2,
          fields: [
            { key: 'harakiri_hit', label: 'ハラキリ発生回数', hint: '高設定ほど大幅に優遇' },
            { key: 'harakiri_total', label: 'AT連チャン総数', hint: 'ハラキリの分母' },
          ],
        },
        {
          label: 'BAR揃いAT直撃', columns: 2,
          fields: [
            { key: 'bar_at', label: 'BAR揃いAT直撃回数', hint: '設定1:3%→設定6:7%' },
            { key: 'bar_total', label: 'BAR揃い総数', hint: '出現率約1/682' },
          ],
        },
      ],
    },
    {
      title: '終了画面・確定演出', icon: '🖼️',
      groups: [
        {
          label: '終了画面枠色', columns: 4,
          fields: [
            { key: 'e_white', label: '白枠（デフォルト）' },
            { key: 'e_blue', label: '青枠', hint: '奇偶示唆' },
            { key: 'e_red', label: '赤枠', hint: '高設定示唆' },
            { key: 'e_purple', label: '紫枠', hint: '設定2以上濃厚!' },
            { key: 'e_silver', label: '銀枠', hint: '設定4以上濃厚!' },
            { key: 'e_gold', label: '金枠', hint: '設定6濃厚!!' },
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
        {
          label: 'ゾロ目ゲーム数', columns: 3,
          fields: [
            { key: 'z22', label: '+22G', hint: '設定2以上濃厚' },
            { key: 'z44', label: '+44G', hint: '設定4以上濃厚' },
            { key: 'z66', label: '+66G', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  // 設定1,2,4,5,6の5段階
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/476, 1/473, 1/464, 1/459, 1/456] },
  ],

  binomialEntries: [
    { hitKey: 'harakiri_hit', totalKey: 'harakiri_total', rates: [0.06, 0.06, 0.14, 0.28, 0.28] },
    { hitKey: 'bar_at', totalKey: 'bar_total', rates: [0.03, 0.04, 0.05, 0.06, 0.07] },
  ],

  categoricalGroups: [
    {
      keys: ['e_white', 'e_blue', 'e_red', 'e_purple', 'e_silver', 'e_gold'],
      rates: {
        e_white:  [0.70, 0.65, 0.55, 0.50, 0.45],
        e_blue:   [0.15, 0.17, 0.18, 0.18, 0.18],
        e_red:    [0.10, 0.12, 0.15, 0.17, 0.18],
        e_purple: [0.00, 0.03, 0.05, 0.06, 0.07],
        e_silver: [0.00, 0.00, 0.04, 0.05, 0.06],
        e_gold:   [0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['m456', 'm555', 'm666'],
      rates: {
        m456: [0.00, 0.00, 0.03, 0.03, 0.05],
        m555: [0.00, 0.00, 0.00, 0.02, 0.03],
        m666: [0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
    {
      keys: ['z22', 'z44', 'z66'],
      rates: {
        z22: [0.00, 0.02, 0.02, 0.02, 0.02],
        z44: [0.00, 0.00, 0.02, 0.02, 0.02],
        z66: [0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
  ],

  confirmedMin: {
    e_purple: 2, e_silver: 4, e_gold: 6,
    m456: 4, m555: 5, m666: 6,
    z22: 2, z44: 4, z66: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    // index: 0=設定1, 1=設定2, 2=設定4, 3=設定5, 4=設定6

    if ((input.e_gold ?? 0) >= 1 || (input.m666 ?? 0) >= 1 || (input.z66 ?? 0) >= 1) {
      return { message: '設定6濃厚！確定級演出を確認済み', level: 'high' };
    }
    if (cMin >= 5) {
      return { message: `設定5以上濃厚！（設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    }
    if (cMin >= 4) {
      return { message: `設定4以上確定！（設定4: ${(p[2]*100).toFixed(1)}% / 設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    }
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
    if (input.harakiri_hit == null) hints.push('ハラキリドライブの発生回数は最重要の判別要素です（高設定ほど大幅に優遇）');
    if (!['e_white', 'e_blue', 'e_red', 'e_purple', 'e_silver', 'e_gold'].some(k => (input[k] ?? 0) > 0))
      hints.push('終了画面の枠色を確認してください（銀枠=設定4以上、金枠=設定6濃厚）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.7, 99.3, 104.7, 110.8, 114.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_harakiri', label: 'ハラキリドライブ発生回数を記録', category: 'AT中' },
    { id: 'ck_cz_end', label: 'CZ終了画面の枠色を確認', category: 'CZ終了時' },
    { id: 'ck_at_end', label: 'AT終了画面ディスプレイを確認', category: 'AT終了時' },
    { id: 'ck_medal', label: '獲得枚数表示を確認', category: 'AT終了時' },
    { id: 'ck_ceiling', label: '天井カウント（周期/CZ間/AT間）', category: '通常時' },
    { id: 'ck_hikimodo', label: '引き戻し66Gを確認', category: 'AT終了後' },
  ],

  guide: {
    settingHunt: [
      'ハラキリドライブ発生率に大きな設定差',
      'CZ終了画面の枠色で設定示唆',
      'AT終了画面で設定示唆',
      '獲得枚数表示で設定示唆',
    ],
    morningCheck: [
      'リセット時は周期天井3周期に短縮',
      'AT間天井が1000Gに短縮',
    ],
    quitTiming: [
      'AT終了後66G引き戻し確認',
    ],
  },

  hyena: {
    ceilingGame: 1500,
    ceilingBenefit: '周期6周期/CZ間999G/AT間1500G到達でAT確定（リセット: 周期3周期/AT間1000G）',
    zones: [],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000 },
      { fromGame: 300, expectedYen: 200 },
      { fromGame: 550, expectedYen: 1000 },
      { fromGame: 750, expectedYen: 2500 },
      { fromGame: 950, expectedYen: 5000 },
    ],
    resetInfo: 'リセット時は周期3周期/AT間1000Gに短縮',
    notes: [
      '天井は周期ベース（周期6周期/CZ間999G/AT間1500G）',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
