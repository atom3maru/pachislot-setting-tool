import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'goblinslayer2',
  name: 'スマスロ ゴブリンスレイヤーII',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-stone-700 to-red-800',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数' },
            { key: 'czCnt', label: 'CZ回数', hint: '高設定ほど頻繁に当選' },
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
            { key: 'e_default', label: 'ゴブスレ&女神官（デフォルト）' },
            { key: 'e_priestess', label: '女神官（1枚絵）', hint: '高設定示唆' },
            { key: 'e_cowgirl', label: '牛飼い娘', hint: '設定2以上濃厚' },
            { key: 'e_elf', label: '妖精弓手', hint: '偶数設定濃厚' },
            { key: 'e_priest_elf', label: '女神官&エルフ', hint: '設定4以上濃厚!' },
            { key: 'e_bath', label: 'お風呂', hint: '設定4以上濃厚!' },
            { key: 'e_all_sword', label: '全員集合+剣の乙女', hint: '設定6濃厚!!' },
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
            { key: 'num_246', label: '246枚OVER', hint: '偶数設定濃厚' },
            { key: 'num_52', label: '52枚OVER', hint: '設定5以上!' },
            { key: 'num_666', label: '666枚OVER', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/541.6, 1/526.4, 1/506.4, 1/453.2, 1/417.8, 1/402.4] },
    { key: 'czCnt', totalKey: 'totalG', rates: [1/239.3, 1/232.3, 1/222.9, 1/200.4, 1/187.3, 1/181.9] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_priestess', 'e_cowgirl', 'e_elf', 'e_priest_elf', 'e_bath', 'e_all_sword'],
      rates: {
        e_default:    [0.60, 0.48, 0.42, 0.32, 0.28, 0.22],
        e_priestess:  [0.15, 0.14, 0.14, 0.14, 0.14, 0.14],
        e_cowgirl:    [0.00, 0.10, 0.10, 0.10, 0.10, 0.10],
        e_elf:        [0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
        e_priest_elf: [0.00, 0.00, 0.00, 0.10, 0.10, 0.12],
        e_bath:       [0.00, 0.00, 0.00, 0.08, 0.10, 0.12],
        e_all_sword:  [0.00, 0.00, 0.00, 0.00, 0.00, 0.02],
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
      keys: ['num_246', 'num_52', 'num_666'],
      rates: {
        num_246: [0.000, 0.005, 0.000, 0.005, 0.000, 0.005],
        num_52:  [0.000, 0.000, 0.000, 0.000, 0.005, 0.005],
        num_666: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_cowgirl: 2, e_priest_elf: 4, e_bath: 4, e_all_sword: 6,
    c_copper: 2, c_silver: 3, c_gold: 4, c_danger: 5, c_rainbow: 6,
    num_52: 5, num_666: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    if ((input.c_rainbow ?? 0) >= 1 || (input.e_all_sword ?? 0) >= 1 || (input.num_666 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.czCnt == null) hints.push('CZ回数をカウントしましょう（設定差あり）');
    if (!['e_default','e_priestess','e_cowgirl','e_elf','e_priest_elf','e_bath','e_all_sword'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください（お風呂=設定4以上、全員集合+剣の乙女=設定6）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.6, 98.7, 100.4, 104.9, 109.7, 113.2],
  baseCoins: 31,

  checklist: [
    { id: 'ck_at_count', label: 'AT初当たりカウント', category: '通常時' },
    { id: 'ck_cz_count', label: 'CZ確率カウント', category: '通常時' },
    { id: 'ck_ceiling', label: '天井到達G数確認', category: '通常時' },
    { id: 'ck_coin', label: '藤丸コイン確認', category: 'AT終了時' },
    { id: 'ck_枚数', label: '獲得枚数表示', category: 'AT中' },
    { id: 'ck_bell', label: '共通ベルカウント', category: '通常時' },
    { id: 'ck_suika_cz', label: 'スイカ2周期CZ当選', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率（設定1: 1/541.6 → 設定6: 1/402.4、約1.35倍差）',
      'CZ確率（設定1: 1/239.3 → 設定6: 1/181.9、約1.32倍差）',
      '天井振り分け600G/1000G/1500Gで高設定ほど600G・1000G選択率UP',
      '藤丸コイン：銅=設定2以上、銀=設定3以上、金=設定4以上、DANGER柄=設定5以上、虹=設定6濃厚',
      'AT終了画面：女神官&エルフ/お風呂=設定4以上、全員集合+剣の乙女=設定6濃厚',
      '獲得枚数246OVER=偶数設定、52OVER=設定5以上、666OVER=設定6濃厚',
    ],
    morningCheck: [
      'リセット時は天井最大1500G→1000Gに短縮。400G付近から期待値プラス',
      '1G目のレア役に注目。朝一の挙動で内部状態を推測',
      'スイカ2周期目CZ当選ゾーン（250-350G、450-550G付近）を意識して打つ',
    ],
    quitTiming: [
      'AT終了後は引き戻し約32G+兜ポイントをフォローしてからやめ',
      '藤丸コイン・終了画面・獲得枚数表示を全確認。高設定示唆なしなら即やめ',
      '天井600G振り分けを意識し、500G以上なら打ち切り推奨',
      '3000G時点でAT初当たり1/500以上・CZ確率1/230以上なら低設定濃厚',
    ],
  },

  hyena: {
    ceilingGame: 1500,
    ceilingBenefit: '天井振り分け600/1000/1500G。リセット時は1000Gに短縮',
    zones: [
      { start: 250, end: 350, label: 'スイカ2周期CZ', strength: 'warm' as const },
      { start: 450, end: 550, label: 'スイカ2周期CZ', strength: 'warm' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1500 },
      { fromGame: 200, expectedYen: -800 },
      { fromGame: 400, expectedYen: -200 },
      { fromGame: 600, expectedYen: 1000, note: '天井振り分け600G' },
      { fromGame: 800, expectedYen: 3000 },
      { fromGame: 1000, expectedYen: 6000, note: '天井振り分け1000G' },
      { fromGame: 1200, expectedYen: 10000, note: '天井間近' },
    ],
    resetInfo: 'リセット時は天井1000Gに短縮',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'コイン', name: '藤丸コイン 虹', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'コイン', name: '藤丸コイン DANGER柄', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'コイン', name: '藤丸コイン 金', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'コイン', name: '藤丸コイン 銀', timing: 'AT終了時', settingHint: '設定3以上確定', importance: 'confirmed' },
    { keyword: 'コイン', name: '藤丸コイン 銅', timing: 'AT終了時', settingHint: '設定2以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 全員集合+剣の乙女', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 お風呂', timing: 'AT終了時', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 女神官&エルフ', timing: 'AT終了時', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 牛飼い娘', timing: 'AT終了時', settingHint: '設定2以上濃厚', importance: 'strong' },
    { keyword: '終了画面', name: 'AT終了画面 妖精弓手', timing: 'AT終了時', settingHint: '偶数設定濃厚', importance: 'weak' },
    { keyword: '枚数', name: '獲得枚数 666枚OVER', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 52枚OVER', timing: 'AT中', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 246枚OVER', timing: 'AT中', settingHint: '偶数設定濃厚', importance: 'strong' },
    { keyword: '初当たり', name: 'AT初当たり確率', timing: '通常時', settingHint: '設定1: 1/541.6 → 設定6: 1/402.4（約1.35倍差）', importance: 'strong' },
    { keyword: 'CZ', name: 'CZ確率', timing: '通常時', settingHint: '設定1: 1/239.3 → 設定6: 1/181.9（約1.32倍差）', importance: 'weak' },
  ],
};

export default config;
