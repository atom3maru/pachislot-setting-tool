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

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.5, 98.3, 100.2, 105.2, 109.2, 113.0],
  baseCoins: 33,

  checklist: [
    { id: 'ck_cycle', label: '周期数を管理', category: '通常時' },
    { id: 'ck_at_end', label: 'AT終了画面を確認', category: 'AT終了時' },
    { id: 'ck_oni_chara', label: '鬼ボーナスキャラを確認', category: 'ボーナス中' },
    { id: 'ck_kakusei', label: '覚醒チャレンジ回数を記録', category: 'AT中' },
    { id: 'ck_card', label: 'カードを確認', category: '通常時' },
    { id: 'ck_hit', label: '初当たりを記録', category: '通常時' },
    { id: 'ck_mode', label: 'モード示唆を確認', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      '共通3枚ベル確率が重要（設定1: 1/35.1 → 設定6: 1/26.7、約1.31倍差）',
      'AT初当たり確率（設定1: 1/379.7 → 設定6: 1/293.1、約1.30倍差）',
      '1周期目AT当選率に特大設定差（設定1: 25% → 設定6: 75%、3倍差）',
      'エンタトロフィー：銅=設定2以上、銀=設定3以上、金=設定4以上、紅葉柄=設定5以上、虹=設定6濃厚',
      'AT終了画面：幻魔集合=設定4以上、覚醒鬼武者=設定5以上、デフォルメ集合=設定6濃厚',
      '特殊上乗せ+4G=設定4以上、+5G=設定5以上、+6G=設定6濃厚',
    ],
    morningCheck: [
      'リセット時は周期天井6周期→4周期に短縮。1周期目222ptで鬼モード突入',
      'リセット台は1周期目の鬼モードが最大の狙い目。0〜170G付近まで打つ価値あり',
      '前日最終G数とデータ機の周期数を確認し、据え置き判別を行う',
      'カード確認で内部モードを推測。高期待度カードなら周期完走まで続行',
    ],
    quitTiming: [
      'AT終了後は終了画面・トロフィー・獲得枚数表示を全確認してからやめ',
      '1周期目のフォローは必須。鬼モード示唆があれば周期完走まで打つ',
      '3000G時点でAT初当たり1/350以上・共通ベル1/33以上なら低設定濃厚',
      '残り天井200G以内なら天井まで打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 1000,
    ceilingBenefit: '1000G/周期6周期到達でAT確定（リセット周期4周期、1周期目222ptで鬼モード）',
    zones: [
      { start: 0, end: 170, label: '1周期目（リセット時222pt鬼モード）', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000 },
      { fromGame: 300, expectedYen: 200 },
      { fromGame: 400, expectedYen: 800 },
      { fromGame: 500, expectedYen: 1500 },
      { fromGame: 700, expectedYen: 3500 },
      { fromGame: 900, expectedYen: 6000 },
    ],
    resetInfo: 'リセット時は周期4周期に短縮、1周期目222ptで鬼モード',
    notes: [
      '天井は1000G/周期6周期',
      'リセット時は1周期目の鬼モードが狙い目',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'トロフィー', name: 'エンタトロフィー 虹', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'エンタトロフィー 紅葉柄', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'エンタトロフィー 金', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'エンタトロフィー 銀', timing: 'AT終了時', settingHint: '設定3以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'エンタトロフィー 銅', timing: 'AT終了時', settingHint: '設定2以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 デフォルメ集合', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 覚醒鬼武者', timing: 'AT終了時', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 幻魔集合', timing: 'AT終了時', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 鬼武者WoS', timing: 'AT終了時', settingHint: '設定3以上濃厚', importance: 'strong' },
    { keyword: '終了画面', name: 'AT終了画面 蒼鬼&茜', timing: 'AT終了時', settingHint: '設定2以上濃厚', importance: 'strong' },
    { keyword: '上乗せ', name: '特殊上乗せ +6G', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '上乗せ', name: '特殊上乗せ +5G', timing: 'AT中', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: '上乗せ', name: '特殊上乗せ +4G', timing: 'AT中', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 666枚OVER', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 555枚OVER', timing: 'AT中', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 456枚OVER', timing: 'AT中', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: 'ベル', name: '共通3枚ベル確率', timing: '通常時', settingHint: '設定1: 1/35.1 → 設定6: 1/26.7（約1.31倍差）', importance: 'strong' },
    { keyword: '周期', name: '1周期目AT当選率', timing: '通常時', settingHint: '設定1: 25% → 設定6: 75%（3倍差）', importance: 'strong' },
    { keyword: '鬼斬', name: '弱レア役→鬼斬チャージ当選率', timing: '通常時', settingHint: '設定1: 25% → 設定6: 44%', importance: 'weak' },
    { keyword: '初当たり', name: 'AT初当たり確率', timing: '通常時', settingHint: '設定1: 1/379.7 → 設定6: 1/293.1（約1.30倍差）', importance: 'weak' },
  ],

  gameFlow: {
    nodes: [
      { id: 'normal', label: '通常時', description: 'バッサリポイント蓄積。規定BP到達で周期抽選', color: 'blue' },
      { id: 'onigiri', label: '鬼斬チャージ', description: 'BP獲得特化ゾーン。毎G5BP以上獲得', color: 'amber' },
      { id: 'onimode', label: '鬼モード', description: '前兆ステージ。連続演出でAT当否告知', color: 'purple' },
      { id: 'at', label: '蒼剣RUSH', description: '継続率&セット数管理AT。50/66/80/89%の4段階', color: 'red' },
      { id: 'bonus', label: '鬼ボーナス', description: 'AT中のボーナス。上乗せ+鬼ガチチャンス抽選', color: 'green' },
    ],
    edges: [
      { from: 'normal', to: 'onigiri', label: 'レア役契機' },
      { from: 'normal', to: 'onimode', label: '規定BP到達' },
      { from: 'normal', to: 'at', label: 'リーチ目直撃' },
      { from: 'onigiri', to: 'normal', label: 'チャージ終了' },
      { from: 'onigiri', to: 'at', label: '7セット以上継続でAT' },
      { from: 'onimode', to: 'normal', label: '非当選' },
      { from: 'onimode', to: 'at', label: '当選' },
      { from: 'at', to: 'normal', label: 'AT終了' },
      { from: 'at', to: 'bonus', label: 'ボーナス当選' },
      { from: 'bonus', to: 'at', label: 'ボーナス終了→AT継続' },
    ],
    notes: [
      '通常時はバッサリポイント（BP）が毎G1以上加算。規定BP到達で鬼モードへ',
      '鬼斬チャージ7セット以上継続でAT、10セット目継続でAT+ボーナス濃厚',
      '天井は1000G/周期6周期（リセット時は周期4周期、1周期目222ptで鬼モード）',
    ],
  },

  stages: [
    { name: '城下町', color: 'blue', meaning: '基本ステージ。通常状態滞在濃厚', tips: '特に示唆なし。通常の立ち回りでOK' },
    { name: '山道', color: 'amber', meaning: '高確示唆。鬼斬チャージ当選率UP', settingHint: '高確移行頻度に設定差あり', tips: 'レア役で鬼斬チャージ当選に期待' },
    { name: '幻魔の森', color: 'purple', meaning: '前兆ステージ。鬼モード突入間近', tips: '前兆中のため即ヤメ厳禁' },
    { name: '鬼の洞窟', color: 'red', meaning: '超高確示唆。AT直撃の可能性あり', tips: '全力でレア役を引きに行く' },
  ],

  playGuide: {
    basicHow: '通常時は左リール枠上〜中段にBARを狙う。中・右リールはフリー打ちでOK（全小役1枚払い出しのため損失なし）',
    reelStops: [
      { name: '共通3枚ベル', how: '左BAR狙い', stopForm: 'ベルが上段に揃う', settingDiff: '設定1: 1/35.1 → 設定6: 1/26.7' },
      { name: '弱チェリー', how: '左BAR狙い', stopForm: 'チェリー停止+右リール中段リプレイ' },
      { name: '強チェリー', how: '左BAR狙い', stopForm: 'チェリー停止+右リール中段にリプレイ以外' },
      { name: '弱スイカ', how: '左BAR狙い→中右スイカ狙い', stopForm: 'スイカが右下がりに揃う' },
      { name: '強スイカ', how: '左BAR狙い→中右スイカ狙い', stopForm: 'スイカが平行に揃う' },
      { name: 'チャンス目', how: '左BAR狙い', stopForm: 'リプレイテンパイハズレ等' },
    ],
    notes: [
      '通常時は毎G左リールBAR狙いで成立役を判別',
      'AT中はナビに従う（押し順ナビ発生時）',
      'オールフリー打ちでも枚数的損失なしだが、成立役判別のため目押し推奨',
    ],
  },
};

export default config;
