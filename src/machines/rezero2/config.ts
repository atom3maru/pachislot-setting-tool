import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'rezero2',
  name: 'スマスロ Re:ゼロ Season2',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-blue-700 to-cyan-500',
  ceilingUnit: 'pt',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '殲滅ラッシュ' },
          ],
        },
      ],
    },
    {
      title: 'AT引き戻し（最重要）', icon: '⚡',
      groups: [
        {
          label: 'AT引き戻し率（設定差約2倍）', columns: 2,
          fields: [
            { key: 'pullback_hit', label: '引き戻し当選回数', hint: '高設定ほど大幅に優遇' },
            { key: 'pullback_total', label: 'AT終了総回数', hint: '引き戻しの分母' },
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
            { key: 'e_default', label: '墓所（デフォルト）' },
            { key: 'e_bath_m', label: 'お風呂（男性）', hint: '高設定示唆' },
            { key: 'e_bath_f', label: 'お風呂（女性）', hint: '設定2以上濃厚' },
            { key: 'e_ram_rem', label: 'ラム&レム', hint: '設定4以上濃厚!' },
            { key: 'e_tea', label: 'お茶の時間', hint: '設定5以上濃厚!' },
            { key: 'e_roten', label: '露天風呂', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: '菜月家時計（朝一確認）', icon: '🕐',
      groups: [
        {
          label: '菜月家ステージ時計表示（設定変更後）', columns: 2,
          fields: [
            { key: 'clock_3', label: '3時過ぎ', hint: '設定3以上濃厚' },
            { key: 'clock_456', label: '4時56分', hint: '設定4以上濃厚!' },
            { key: 'clock_506', label: '5時6分', hint: '設定5以上濃厚!' },
            { key: 'clock_606', label: '6時6分', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/417.2, 1/408.5, 1/387.1, 1/354.3, 1/332.9, 1/305.4] },
  ],

  binomialEntries: [
    { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.102, 0.104, 0.139, 0.160, 0.180, 0.200] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_bath_m', 'e_bath_f', 'e_ram_rem', 'e_tea', 'e_roten'],
      rates: {
        e_default:  [0.60, 0.50, 0.42, 0.32, 0.25, 0.18],
        e_bath_m:   [0.15, 0.15, 0.16, 0.16, 0.16, 0.16],
        e_bath_f:   [0.00, 0.12, 0.12, 0.12, 0.12, 0.12],
        e_ram_rem:  [0.00, 0.00, 0.00, 0.15, 0.15, 0.16],
        e_tea:      [0.00, 0.00, 0.00, 0.00, 0.12, 0.14],
        e_roten:    [0.00, 0.00, 0.00, 0.00, 0.00, 0.03],
      },
    },
    {
      keys: ['clock_3', 'clock_456', 'clock_506', 'clock_606'],
      rates: {
        clock_3:   [0.000, 0.000, 0.020, 0.020, 0.020, 0.020],
        clock_456: [0.000, 0.000, 0.000, 0.010, 0.010, 0.010],
        clock_506: [0.000, 0.000, 0.000, 0.000, 0.005, 0.005],
        clock_606: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_bath_f: 2, e_ram_rem: 4, e_tea: 5, e_roten: 6,
    clock_3: 3, clock_456: 4, clock_506: 5, clock_606: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    if ((input.e_roten ?? 0) >= 1 || (input.clock_606 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.totalG == null) hints.push('総ゲーム数を入力するとAT確率の判定精度が上がります');
    if (input.pullback_hit == null) hints.push('AT引き戻し率は設定差約2倍！必ずカウント');
    if (!['e_default','e_bath_m','e_bath_f','e_ram_rem','e_tea','e_roten'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認（ラム&レム=設定4以上、露天風呂=設定6）');
    if (!['clock_3','clock_456','clock_506','clock_606'].some(k => (input[k] ?? 0) > 0))
      hints.push('朝一の菜月家時計を確認してください（6:06=設定6濃厚）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.6, 98.8, 100.7, 105.2, 110.5, 114.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_at_count', label: 'AT初当たりカウント', category: '通常時' },
    { id: 'ck_200pt', label: '200ptゾーン当選率', category: '通常時' },
    { id: 'ck_clock', label: '菜月家時計', category: '朝一' },
    { id: 'ck_endscreen', label: 'AT終了画面', category: 'AT終了時' },
    { id: 'ck_lamp', label: '引き戻しランプ確認', category: 'AT終了時' },
    { id: 'ck_rush', label: '超強欲RUSH突入率', category: 'AT中' },
    { id: 'ck_100pt', label: '100ptゾーン当選', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率に大きな設定差（設定1: 1/417.2 → 設定6: 1/305.4、約1.37倍差）',
      'AT引き戻し率が最重要（設定1: 10.2% → 設定6: 20.0%、約2倍差）',
      '菜月家時計：3時過ぎ=設定3以上、4:56=設定4以上、5:06=設定5以上、6:06=設定6',
      'AT終了画面：ラム&レム=設定4以上、お茶の時間=設定5以上、露天風呂=設定6濃厚',
      '100ptゾーンのAT当選率は設定1と6で約2.6倍差。高設定ほどゾーン当選率UP',
    ],
    morningCheck: [
      'リセット時は天井1000pt以下に短縮（200/400/600/800/1000ptの振り分け）',
      'リセット台は100G付近から期待値+2000円。朝一最優先で狙う価値あり',
      '菜月家ステージの時計表示を必ず確認（設定変更後のみ出現する示唆あり）',
      '2回目以降の初当たりからカウント推奨（初回は天井短縮の影響あり）',
    ],
    quitTiming: [
      'AT終了後32G間は死に戻り抽選中。上部ランプ明滅中は絶対にやめない',
      'ランプ消灯を確認してからやめる。即やめは期待値大幅マイナス',
      'AT間1300G消化でロングフリーズED濃厚。残り300G以内なら打ち切り推奨',
      '引き戻し率が10%未満（3000G以上でAT10回以上）なら低設定見切り検討',
    ],
  },

  hyena: {
    ceilingGame: 930,
    ceilingBenefit: '天井1400pt（約930G）/リセット1000pt（200/400/600/800/1000pt振り分け）/G数天井1300GでロングフリーズED',
    zones: [
      { start: 100, end: 200, label: 'AT25%（200pt）', strength: 'warm' as const },
      { start: 200, end: 300, label: 'AT25%+リセット優遇（400pt）', strength: 'hot' as const },
      { start: 350, end: 450, label: 'AT25%（600pt）', strength: 'hot' as const },
      { start: 500, end: 600, label: 'AT25%（800pt）', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000 },
      { fromGame: 200, expectedYen: 200 },
      { fromGame: 280, expectedYen: 500 },
      { fromGame: 400, expectedYen: 1500 },
      { fromGame: 600, expectedYen: 3000 },
      { fromGame: 800, expectedYen: 6000, note: '天井間近' },
    ],
    resetInfo: 'リセット台は100Gから期待値+2000円（1000pt天井短縮）',
    notes: [
      '天井はpt管理（約1.5G=1pt）',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'AT初当たり', name: 'AT初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/417.2 → 設定6: 1/305.4（約1.37倍差）', importance: 'strong' },
    { keyword: '引き戻し', name: 'AT引き戻し率', timing: 'AT終了後32G間', settingHint: '設定1: 10.2% → 設定6: 20.0%（約2倍差）。最重要', importance: 'strong' },
    { keyword: '露天風呂', name: 'AT終了画面（露天風呂）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'お茶の時間', name: 'AT終了画面（お茶の時間）', timing: 'AT終了時', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: 'ラム&レム', name: 'AT終了画面（ラム&レム）', timing: 'AT終了時', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: 'お風呂女性', name: 'AT終了画面（お風呂・女性）', timing: 'AT終了時', settingHint: '設定2以上濃厚', importance: 'confirmed' },
    { keyword: 'お風呂男性', name: 'AT終了画面（お風呂・男性）', timing: 'AT終了時', settingHint: '高設定示唆', importance: 'weak' },
    { keyword: '6時6分', name: '菜月家時計（6:06）', timing: '朝一・設定変更後', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '5時6分', name: '菜月家時計（5:06）', timing: '朝一・設定変更後', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: '4時56分', name: '菜月家時計（4:56）', timing: '朝一・設定変更後', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: '3時過ぎ', name: '菜月家時計（3時過ぎ）', timing: '朝一・設定変更後', settingHint: '設定3以上濃厚', importance: 'confirmed' },
    { keyword: '死に戻り', name: '死に戻り抽選', timing: 'AT終了後32G間', settingHint: 'ランプ明滅中は絶対にやめない。引き戻し率に設定差大', importance: 'strong' },
    { keyword: '100ptゾーン', name: '100ptゾーンAT当選率', timing: '100pt到達時', settingHint: '設定1と6で約2.6倍差。高設定ほどゾーン当選率UP', importance: 'strong' },
  ],

  gameFlow: {
    nodes: [
      { id: 'normal', label: '通常時', description: 'ポイント管理（最大1400pt）。200pt毎にAT抽選ゾーン', color: 'blue' },
      { id: 'zone', label: 'ゾーン抽選', description: '200pt到達毎のAT抽選。約25%でAT当選', color: 'amber' },
      { id: 'at', label: 'AT（殲滅ラッシュ）', description: '初当たりは全て直撃AT。純増約9.0枚/G', color: 'red' },
      { id: 'pullback', label: '死に戻り（引き戻し）', description: 'AT終了後32G間。ランプ明滅中は継続抽選中', color: 'purple' },
      { id: 'super_rush', label: '超強欲RUSH', description: '上位AT。高い継続率で大量出玉のチャンス', color: 'green' },
    ],
    edges: [
      { from: 'normal', to: 'zone', label: '200pt到達' },
      { from: 'zone', to: 'normal', label: '非当選' },
      { from: 'zone', to: 'at', label: 'AT当選' },
      { from: 'normal', to: 'at', label: '直撃当選' },
      { from: 'at', to: 'pullback', label: 'AT終了' },
      { from: 'pullback', to: 'at', label: '引き戻し成功' },
      { from: 'pullback', to: 'normal', label: '引き戻し失敗' },
      { from: 'at', to: 'super_rush', label: '上位AT昇格' },
      { from: 'super_rush', to: 'pullback', label: '終了' },
    ],
    notes: [
      '天井は1400pt（約930G）。リセット時は1000pt天井（200/400/600/800/1000pt振り分け）',
      'AT間1300GでロングフリーズED濃厚',
      '引き戻し率に約2倍の設定差（設定1:10.2%→設定6:20.0%）',
    ],
  },

  stages: [
    { name: '菜月家ステージ', color: 'blue', meaning: '基本ステージ。通常状態滞在濃厚', settingHint: '設定変更後の時計表示で設定示唆（6:06=設定6濃厚）', tips: '朝一の時計表示を必ず確認' },
    { name: '聖域ステージ', color: 'amber', meaning: 'ポイント高確率状態。ポイント獲得率UP', tips: 'レア役でのポイント獲得に期待' },
    { name: '墓所ステージ', color: 'purple', meaning: 'AT前兆ステージ。AT突入のチャンス', tips: '前兆中のため即ヤメ厳禁' },
    { name: '魔女の茶会ステージ', color: 'red', meaning: '超高確率状態。AT直撃のチャンス大', tips: '即ヤメ厳禁。AT当選まで期待大' },
  ],

  playGuide: {
    basicHow: '通常時は左リール上段〜枠上に白7を狙う。スイカ停止時以外は中・右リールフリー打ちでOK',
    reelStops: [
      { name: 'スイカ', how: '左に白7狙い→スイカテンパイで中リール白7を目安にスイカ狙い', stopForm: 'スイカが斜めに揃う。ハズレでチャンス目' },
      { name: '弱チェリー', how: '左に白7狙い', stopForm: 'チェリー角停止＋右リール中段ベル' },
      { name: '強チェリー', how: '左に白7狙い', stopForm: 'チェリー角停止＋右リール中段ベル以外', settingDiff: '強チェリーからのAT直撃率に設定差' },
      { name: 'チャンス目', how: '左に白7狙い', stopForm: 'スイカテンパイハズレ等' },
    ],
    notes: [
      '通常時は毎G左リール白7狙いが必須',
      'AT中はナビに従う（押し順ナビ発生時）',
      'AT終了後32G間の死に戻り中はランプ明滅確認まで絶対にやめない',
    ],
  },
};

export default config;
