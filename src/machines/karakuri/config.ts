import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'karakuri',
  name: 'スマスロ からくりサーカス',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-yellow-600 to-red-600',
  settingLabels: ['1', '2', '4', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数' },
            { key: 'czCnt', label: 'CZ合算回数' },
          ],
        },
      ],
    },
    {
      title: '幕間チャンス（最重要）', icon: '⚡',
      groups: [
        {
          label: '幕間チャンス当選率（設定差約3倍!）', columns: 2,
          fields: [
            { key: 'makuma_hit', label: '幕間チャンス当選回数', hint: '設定1:1/3000→設定6:1/1000' },
            { key: 'makuma_total', label: 'からくりレア役出現数', hint: '幕間チャンスの分母' },
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
            { key: 'e_default', label: '勝&鳴海（デフォルト）' },
            { key: 'e_enemy', label: '敵幹部5人', hint: '奇数＋高設定示唆' },
            { key: 'e_heroine', label: 'ヒロイン5人', hint: '偶数＋高設定示唆' },
            { key: 'e_ashihana', label: '阿紫花&ギイ', hint: '設定2以上確定!' },
            { key: 'e_shirogane', label: 'しろがね&勝&鳴海', hint: '設定4以上確定!' },
            { key: 'e_francine', label: 'フランシーヌ', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'エンディングランプ・踊れオリンピア', icon: '💡',
      groups: [
        {
          label: 'エンディング中ランプ色（レア役成立時）', columns: 3,
          fields: [
            { key: 'lamp_blue', label: '青', hint: '奇数設定示唆' },
            { key: 'lamp_yellow', label: '黄', hint: '偶数設定示唆' },
            { key: 'lamp_green', label: '緑', hint: '高設定示唆' },
            { key: 'lamp_purple', label: '紫', hint: '設定4以上確定!' },
            { key: 'lamp_rainbow', label: '虹', hint: '設定6確定!!' },
          ],
        },
        {
          label: '踊れ！オリンピア上乗せ', columns: 3,
          fields: [
            { key: 'ol_20', label: '+20', hint: '設定2以上示唆' },
            { key: 'ol_4', label: '+4', hint: '設定4以上濃厚!' },
            { key: 'ol_6', label: '+6', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
  ],

  // 5段階設定(1,2,4,5,6)
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/564, 1/543, 1/469, 1/451, 1/447] },
    { key: 'czCnt', totalKey: 'totalG', rates: [1/333, 1/320, 1/292, 1/277, 1/275] },
  ],

  binomialEntries: [
    { hitKey: 'makuma_hit', totalKey: 'makuma_total', rates: [0.033, 0.040, 0.060, 0.080, 0.100] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_enemy', 'e_heroine', 'e_ashihana', 'e_shirogane', 'e_francine'],
      rates: {
        e_default:   [0.60, 0.48, 0.35, 0.30, 0.25],
        e_enemy:     [0.18, 0.10, 0.15, 0.12, 0.12],
        e_heroine:   [0.10, 0.18, 0.12, 0.12, 0.12],
        e_ashihana:  [0.00, 0.10, 0.10, 0.10, 0.12],
        e_shirogane: [0.00, 0.00, 0.15, 0.18, 0.18],
        e_francine:  [0.00, 0.00, 0.00, 0.00, 0.03],
      },
    },
    {
      keys: ['lamp_blue', 'lamp_yellow', 'lamp_green', 'lamp_purple', 'lamp_rainbow'],
      rates: {
        lamp_blue:    [0.30, 0.15, 0.25, 0.18, 0.15],
        lamp_yellow:  [0.15, 0.30, 0.18, 0.15, 0.15],
        lamp_green:   [0.05, 0.05, 0.10, 0.15, 0.15],
        lamp_purple:  [0.00, 0.00, 0.03, 0.05, 0.07],
        lamp_rainbow: [0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
    {
      keys: ['ol_20', 'ol_4', 'ol_6'],
      rates: {
        ol_20: [0.000, 0.005, 0.005, 0.005, 0.005],
        ol_4:  [0.000, 0.000, 0.005, 0.005, 0.005],
        ol_6:  [0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_ashihana: 2, e_shirogane: 4, e_francine: 6,
    lamp_purple: 4, lamp_rainbow: 6,
    ol_20: 2, ol_4: 4, ol_6: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const labels = ['1','2','4','5','6'];
    const cMin = result.confirmedMin ?? 1;
    if ((input.e_francine ?? 0) >= 1 || (input.lamp_rainbow ?? 0) >= 1 || (input.ol_6 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定5以上確定！（設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[2]*100).toFixed(1)}% / 設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[3] + p[4];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[2] + p[3] + p[4];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    const mlLabel = labels[result.mostLikely - 1] ?? String(result.mostLikely);
    return { message: `最有力: 設定${mlLabel}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力するとAT・CZ確率の判定精度が上がります');
    if (!['e_default','e_enemy','e_heroine','e_ashihana','e_shirogane','e_francine'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認（しろがね&勝&鳴海=設定4以上、フランシーヌ=設定6）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.5, 98.7, 103.0, 108.1, 114.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_at_count', label: 'AT初当たりカウント', category: '通常時' },
    { id: 'ck_cz_count', label: 'CZカウント', category: '通常時' },
    { id: 'ck_endscreen', label: 'AT終了画面PUSH確認', category: 'AT終了時' },
    { id: 'ck_stage', label: 'AT中ステージ確認', category: 'AT中' },
    { id: 'ck_heaven', label: '天国移行頻度', category: 'AT終了時' },
    { id: 'ck_ed', label: 'ED到達', category: 'AT中' },
    { id: 'ck_cz_through', label: 'CZスルー回数', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率が最重要（設定1: 1/564 → 設定6: 1/447、約1.26倍差）',
      'CZ合算確率にも設定差あり（設定1: 1/333 → 設定6: 1/275）',
      '幕間チャンス当選率に約3倍差（設定1: 3.3% → 設定6: 10.0%）',
      'AT終了画面：阿紫花&ギイ=設定2以上、しろがね=設定4以上、フランシーヌ=設定6',
      'EDランプ：紫=設定4以上確定、虹=設定6確定。踊れオリンピア+6=設定6',
    ],
    morningCheck: [
      'リセット時は通常Cモードに移行しやすく、200〜300G付近のCZゾーンが狙い目',
      '設定変更後1G目にレア役を引くと通常B以上モード濃厚',
      '前回1100G以上ハマリの場合、次回CZ天井が300G+αに大幅短縮',
      '液晶の歯車表示がリセットされていれば設定変更濃厚',
    ],
    quitTiming: [
      '上位AT（超からくりサーカス）後は天国移行率約40%。100Gまでフォロー必須',
      'CZスルー4回で5回目AT確定。スルー回数を必ず把握してからやめる',
      'AT間2500G+αでAT+激情ジャッジ確定。残り500G以内なら打ち切り推奨',
      '通常AT後は幕間チャンス結果確認後やめ。有利区間リセート確認必須',
    ],
  },

  hyena: {
    ceilingGame: 1200,
    ceilingBenefit: 'CZ間1200G天井/CZスルー4回で5回目AT確定/AT間2500G/前回1100G以上ハマリで次回CZ天井300G',
    zones: [
      { start: 0, end: 100, label: '天国25%', strength: 'warm' as const },
      { start: 200, end: 300, label: '通常Cゾーン', strength: 'warm' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -800 },
      { fromGame: 300, expectedYen: 500 },
      { fromGame: 350, expectedYen: 1000 },
      { fromGame: 500, expectedYen: 2000 },
      { fromGame: 700, expectedYen: 4000 },
      { fromGame: 900, expectedYen: 7000, note: '天井間近' },
    ],
    resetInfo: 'リセット確定店なら浅めから狙い可能',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
