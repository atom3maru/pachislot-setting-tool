import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'railgun',
  name: 'スマスロ とある科学の超電磁砲',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-sky-500 to-indigo-600',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数' },
            { key: 'czCnt', label: 'CZ（GIRLS JUDGE）回数' },
          ],
        },
      ],
    },
    {
      title: '上位CZ（重要）', icon: '⚡',
      groups: [
        {
          label: '上位CZ出現率（設定差約3倍!）', columns: 2,
          fields: [
            { key: 'upper_cz_hit', label: '上位CZ当選回数', hint: '設定1:1/7456→設定6:1/2587' },
            { key: 'upper_cz_total', label: 'CZ突入総数', hint: '上位CZの分母' },
          ],
        },
      ],
    },
    {
      title: 'AT終了画面', icon: '🖼️',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'e_default', label: 'デフォルト' },
            { key: 'e_red_d', label: '赤枠D（大切な友達）', hint: '設定2以上' },
            { key: 'e_red_kongou', label: '赤枠（婚后一派）', hint: '設定3以上' },
            { key: 'e_purple', label: '紫枠（寝起き美琴）', hint: '設定4以上!' },
            { key: 'e_gold', label: '金枠（美琴&操祈）', hint: '設定5以上!' },
            { key: 'e_rainbow', label: '虹枠（ウエディング）', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: '藤丸コイン・獲得枚数', icon: '🏆',
      groups: [
        {
          label: '藤丸コイン', columns: 3,
          fields: [
            { key: 'c_copper', label: '銅', hint: '設定2以上' },
            { key: 'c_silver', label: '銀', hint: '設定3以上' },
            { key: 'c_gold', label: '金', hint: '設定4以上!' },
            { key: 'c_danger', label: 'DANGER柄', hint: '設定5以上!' },
            { key: 'c_rainbow', label: '虹', hint: '設定6濃厚!!' },
          ],
        },
        {
          label: '特殊獲得枚数表示', columns: 3,
          fields: [
            { key: 'num_087', label: '087枚OVER', hint: '設定2以上' },
            { key: 'num_310', label: '310枚OVER', hint: '設定3以上' },
            { key: 'num_965', label: '965枚OVER', hint: '設定4以上!' },
            { key: 'num_555', label: '555枚OVER', hint: '設定5以上!' },
            { key: 'num_666', label: '666枚OVER', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/317.8, 1/311.8, 1/304.4, 1/272.4, 1/248.1, 1/235.3] },
    { key: 'czCnt', totalKey: 'totalG', rates: [1/175.7, 1/172.6, 1/168.5, 1/156.6, 1/145.7, 1/137.5] },
  ],

  binomialEntries: [
    { hitKey: 'upper_cz_hit', totalKey: 'upper_cz_total', rates: [0.023, 0.030, 0.045, 0.070, 0.100, 0.130] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_red_d', 'e_red_kongou', 'e_purple', 'e_gold', 'e_rainbow'],
      rates: {
        e_default:    [0.70, 0.55, 0.48, 0.38, 0.30, 0.22],
        e_red_d:      [0.00, 0.15, 0.12, 0.12, 0.12, 0.12],
        e_red_kongou: [0.00, 0.00, 0.12, 0.12, 0.12, 0.12],
        e_purple:     [0.00, 0.00, 0.00, 0.12, 0.13, 0.14],
        e_gold:       [0.00, 0.00, 0.00, 0.00, 0.10, 0.12],
        e_rainbow:    [0.00, 0.00, 0.00, 0.00, 0.00, 0.03],
      },
    },
    {
      keys: ['c_copper', 'c_silver', 'c_gold', 'c_danger', 'c_rainbow'],
      rates: {
        c_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        c_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        c_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        c_danger:  [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        c_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['num_087', 'num_310', 'num_965', 'num_555', 'num_666'],
      rates: {
        num_087: [0.000, 0.005, 0.005, 0.005, 0.005, 0.005],
        num_310: [0.000, 0.000, 0.005, 0.005, 0.005, 0.005],
        num_965: [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        num_555: [0.000, 0.000, 0.000, 0.000, 0.005, 0.005],
        num_666: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_red_d: 2, e_red_kongou: 3, e_purple: 4, e_gold: 5, e_rainbow: 6,
    c_copper: 2, c_silver: 3, c_gold: 4, c_danger: 5, c_rainbow: 6,
    num_087: 2, num_310: 3, num_965: 4, num_555: 5, num_666: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    if ((input.c_rainbow ?? 0) >= 1 || (input.e_rainbow ?? 0) >= 1 || (input.num_666 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.totalG == null) hints.push('総ゲーム数を入力するとAT・CZ確率の判定精度が上がります');
    if (input.czCnt == null) hints.push('CZ回数をカウントしましょう（高設定ほどCZ当選率UP）');
    if (!['c_copper','c_silver','c_gold','c_danger','c_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('藤丸コインを確認してください（虹=設定6確定）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.7, 98.9, 100.3, 105.4, 110.0, 112.9],
  baseCoins: 32,

  checklist: [
    { id: 'ck_at_count', label: 'AT初当たり', category: '通常時' },
    { id: 'ck_cz_count', label: 'CZ確率', category: '通常時' },
    { id: 'ck_upper_cz', label: '上位CZ婚后光子', category: '通常時' },
    { id: 'ck_card', label: '獲得枚数カード', category: 'AT中' },
    { id: 'ck_over_color', label: '枚数OVER文字色', category: 'AT中' },
    { id: 'ck_coin_direct', label: 'コイン直撃', category: '通常時' },
    { id: 'ck_500zone', label: '500Gゾーン', category: 'AT終了時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率に設定差（設定1: 1/317.8 → 設定6: 1/235.3、約1.35倍差）',
      '上位CZ（婚后光子）出現率に約5.6倍の設定差（設定1: 2.3% → 設定6: 13.0%）',
      'CZ確率も高設定ほど優遇（設定1: 1/175.7 → 設定6: 1/137.5）',
      '藤丸コイン：銅=設定2以上、金=設定4以上、DANGER=設定5以上、虹=設定6濃厚',
      'AT終了画面：紫枠=設定4以上、金枠=設定5以上、虹枠（ウエディング）=設定6濃厚',
      '特殊獲得枚数：087=設定2以上、965=設定4以上、555=設定5以上、666=設定6',
    ],
    morningCheck: [
      'リセット時は天井999G→699Gに大幅短縮。550〜650Gゾーンの期待度約50%',
      'ゲーム数表示の発光パターンでリセット判別可能。朝一に必ず確認',
      '据え置きなら前日のハマリG数を加算。リセットなら250G付近から期待値プラス',
    ],
    quitTiming: [
      'AT終了後450〜550Gゾーン（期待度約40%）を必ずフォロー',
      '500Gゾーン非当選なら即やめ推奨。有利区間リセートを確認',
      'CZ確率が1/200以上かつ上位CZ未出現なら低設定の可能性大',
      '残り天井200G以内なら天井まで打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: '天井999G（リセット699G）',
    zones: [
      { start: 50, end: 150, label: 'ゾーン', strength: 'warm' as const },
      { start: 150, end: 250, label: 'ゾーン', strength: 'warm' as const },
      { start: 450, end: 550, label: 'AT後ゾーン期待度40%', strength: 'hot' as const },
      { start: 550, end: 650, label: 'リセット後ゾーン期待度50%', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000 },
      { fromGame: 250, expectedYen: 200 },
      { fromGame: 350, expectedYen: 800 },
      { fromGame: 450, expectedYen: 1500 },
      { fromGame: 550, expectedYen: 2500 },
      { fromGame: 650, expectedYen: 4000 },
      { fromGame: 800, expectedYen: 6000, note: '天井間近' },
    ],
    resetInfo: 'リセット時は天井699Gに短縮',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'AT初当たり', name: 'AT初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/317.8 → 設定6: 1/235.3（約1.35倍差）', importance: 'strong' },
    { keyword: 'CZ確率', name: 'CZ（GIRLS JUDGE）確率', timing: '終日カウント', settingHint: '設定1: 1/175.7 → 設定6: 1/137.5', importance: 'strong' },
    { keyword: '上位CZ', name: '上位CZ（婚后光子）出現率', timing: 'CZ突入時', settingHint: '設定1: 2.3% → 設定6: 13.0%（約5.6倍差）。最重要', importance: 'strong' },
    { keyword: '紫枠', name: 'AT終了画面（紫枠・寝起き美琴）', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '金枠', name: 'AT終了画面（金枠・美琴&操祈）', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: '虹枠', name: 'AT終了画面（虹枠・ウエディング）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '赤枠D', name: 'AT終了画面（赤枠・大切な友達）', timing: 'AT終了時', settingHint: '設定2以上', importance: 'confirmed' },
    { keyword: '赤枠婚后', name: 'AT終了画面（赤枠・婚后一派）', timing: 'AT終了時', settingHint: '設定3以上', importance: 'confirmed' },
    { keyword: '藤丸コイン金', name: '藤丸コイン（金）', timing: 'AT中', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'DANGER柄', name: '藤丸コイン（DANGER柄）', timing: 'AT中', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: '藤丸コイン虹', name: '藤丸コイン（虹）', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '藤丸コイン銅', name: '藤丸コイン（銅）', timing: 'AT中', settingHint: '設定2以上', importance: 'weak' },
    { keyword: '087枚', name: '特殊獲得枚数（087枚OVER）', timing: 'AT中', settingHint: '設定2以上', importance: 'weak' },
    { keyword: '965枚', name: '特殊獲得枚数（965枚OVER）', timing: 'AT中', settingHint: '設定4以上', importance: 'confirmed' },
    { keyword: '555枚', name: '特殊獲得枚数（555枚OVER）', timing: 'AT中', settingHint: '設定5以上', importance: 'confirmed' },
    { keyword: '666枚', name: '特殊獲得枚数（666枚OVER）', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
  ],
};

export default config;
