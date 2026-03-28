import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'gojieva',
  name: 'L ゴジラ対エヴァンゲリオン',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-green-800 to-purple-800',
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
            { key: 'bonusCnt', label: 'ボーナス合算回数' },
          ],
        },
      ],
    },
    {
      title: 'スイカCZ・殲滅作戦', icon: '⚡',
      groups: [
        {
          label: 'スイカからCZ当選（設定差約10%）', columns: 2,
          fields: [
            { key: 'suika_cz_hit', label: 'スイカCZ当選回数' },
            { key: 'suika_total', label: 'スイカ出現総数', hint: 'CZ当選の分母' },
          ],
        },
        {
          label: '殲滅作戦（設定6は勝利率65%!）', columns: 2,
          fields: [
            { key: 'senmetsu_win', label: '殲滅作戦勝利回数', hint: '設定6のみ約65%!' },
            { key: 'senmetsu_total', label: '殲滅作戦突入総数' },
          ],
        },
      ],
    },
    {
      title: 'ボーナス・AT終了画面', icon: '🖼️',
      groups: [
        {
          label: 'ボーナス終了画面', columns: 3,
          fields: [
            { key: 'be_default', label: 'シンジ（デフォルト）' },
            { key: 'be_rei', label: 'レイ', hint: '偶数設定示唆' },
            { key: 'be_mari', label: 'マリ', hint: '高設定示唆（弱）' },
            { key: 'be_asuka', label: 'アスカ', hint: '高設定示唆（強）' },
            { key: 'be_rei_moon', label: 'レイ（月背景）', hint: '設定2以上濃厚' },
            { key: 'be_evaG', label: 'エヴァ&ゴジラ', hint: '設定4以上濃厚!' },
          ],
        },
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'ae_default', label: '初号機（デフォルト）' },
            { key: 'ae_mothra', label: 'モスラ', hint: '設定4以上濃厚!' },
            { key: 'ae_evaG', label: 'エヴァ&ゴジラ', hint: '設定5以上濃厚!' },
            { key: 'ae_kaworu', label: 'カヲル', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: '獲得枚数・ボイス', icon: '🏆',
      groups: [
        {
          label: '特殊獲得枚数表示', columns: 3,
          fields: [
            { key: 'num_222', label: '222枚超', hint: '設定2以上' },
            { key: 'num_456', label: '456枚超', hint: '設定4以上!' },
            { key: 'num_666', label: '666枚超', hint: '設定6濃厚!!' },
          ],
        },
        {
          label: 'エンディング中ボイス', columns: 3,
          fields: [
            { key: 'v_kaji', label: '加持', hint: '設定4以上濃厚!' },
            { key: 'v_kaworu', label: 'カヲル', hint: '設定6濃厚!!' },
            { key: 'v_none', label: 'ボイスなし', hint: '設定2以上濃厚' },
          ],
        },
      ],
    },
  ],

  // 5段階設定(1,2,4,5,6)
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/581.8, 1/552.7, 1/487.8, 1/446.2, 1/407.3] },
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/299.9, 1/292.2, 1/272.3, 1/256.7, 1/244.8] },
  ],

  binomialEntries: [
    { hitKey: 'suika_cz_hit', totalKey: 'suika_total', rates: [0.203, 0.211, 0.250, 0.277, 0.305] },
    { hitKey: 'senmetsu_win', totalKey: 'senmetsu_total', rates: [0.493, 0.504, 0.517, 0.529, 0.653] },
  ],

  categoricalGroups: [
    {
      keys: ['be_default', 'be_rei', 'be_mari', 'be_asuka', 'be_rei_moon', 'be_evaG'],
      rates: {
        be_default:  [0.55, 0.40, 0.30, 0.25, 0.20],
        be_rei:      [0.15, 0.20, 0.15, 0.15, 0.15],
        be_mari:     [0.10, 0.10, 0.15, 0.15, 0.15],
        be_asuka:    [0.08, 0.08, 0.12, 0.13, 0.13],
        be_rei_moon: [0.00, 0.10, 0.10, 0.10, 0.12],
        be_evaG:     [0.00, 0.00, 0.06, 0.08, 0.10],
      },
    },
    {
      keys: ['ae_default', 'ae_mothra', 'ae_evaG', 'ae_kaworu'],
      rates: {
        ae_default: [0.85, 0.80, 0.68, 0.60, 0.52],
        ae_mothra:  [0.00, 0.00, 0.12, 0.13, 0.14],
        ae_evaG:    [0.00, 0.00, 0.00, 0.10, 0.12],
        ae_kaworu:  [0.00, 0.00, 0.00, 0.00, 0.03],
      },
    },
    {
      keys: ['num_222', 'num_456', 'num_666'],
      rates: {
        num_222: [0.000, 0.005, 0.005, 0.005, 0.005],
        num_456: [0.000, 0.000, 0.005, 0.005, 0.005],
        num_666: [0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
    {
      keys: ['v_kaji', 'v_kaworu', 'v_none'],
      rates: {
        v_kaji:   [0.000, 0.000, 0.010, 0.015, 0.020],
        v_kaworu: [0.000, 0.000, 0.000, 0.000, 0.010],
        v_none:   [0.000, 0.010, 0.010, 0.010, 0.010],
      },
    },
  ],

  confirmedMin: {
    be_rei_moon: 2, be_evaG: 4,
    ae_mothra: 4, ae_evaG: 5, ae_kaworu: 6,
    num_222: 2, num_456: 4, num_666: 6,
    v_kaji: 4, v_kaworu: 6, v_none: 2,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const labels = ['1','2','4','5','6'];
    const cMin = result.confirmedMin ?? 1;
    if ((input.ae_kaworu ?? 0) >= 1 || (input.v_kaworu ?? 0) >= 1 || (input.num_666 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.senmetsu_win == null) hints.push('殲滅作戦の勝利率に注目！設定6のみ約65%');
    if (input.suika_cz_hit == null) hints.push('スイカからCZ当選率（設定1:20%→設定6:30%）をカウント');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.7, 99.2, 104.6, 110.7, 114.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_bonus_count', label: 'ボーナス初当たり', category: '通常時' },
    { id: 'ck_through', label: 'スルー回数把握', category: '通常時' },
    { id: 'ck_at_endscreen', label: 'AT終了画面', category: 'AT終了時' },
    { id: 'ck_ed_voice', label: 'エンディングボイス', category: 'AT中' },
    { id: 'ck_pullback', label: '引き戻し70G赤発光', category: 'AT終了時' },
    { id: 'ck_senmetsu', label: '殲滅作戦AT突入率', category: 'ボーナス中' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率に大きな設定差（設定1: 1/581.8 → 設定6: 1/407.3、約1.43倍差）',
      '殲滅作戦勝利率が最重要（設定1: 49.3% → 設定6: 65.3%）。設定6のみ突出',
      'スイカからCZ当選率に注目（設定1: 20.3% → 設定6: 30.5%、約1.5倍差）',
      'AT終了画面：モスラ=設定4以上、エヴァ&ゴジラ=設定5以上、カヲル=設定6濃厚',
      'ED中ボイス：加持=設定4以上、カヲル=設定6濃厚。獲得枚数666超=設定6',
    ],
    morningCheck: [
      'リセット時は天井1000G→700Gに短縮。スルー天井も9回→5回に短縮',
      'リセット確認後0スルー350Gから期待値プラス。朝一は積極的に狙える',
      'データカウンターでスルー回数を把握し、3スルー以上なら即打ち開始',
    ],
    quitTiming: [
      'AT終了後70G間は引き戻し状態。赤発光中は絶対にやめない',
      'スルー回数天井を意識。7スルー以上なら天井まで打ち切り推奨',
      'ボーナス合算が1/320以下かつスルー0回なら低設定の可能性大。見切り検討',
      '有利区間リセート後の状態を確認してからやめること',
    ],
  },

  hyena: {
    ceilingGame: 1000,
    ceilingBenefit: '天井1000G（リセット700G）/スルー天井9回（リセット5回）',
    zones: [
      { start: 450, end: 550, label: '天井狙い開始', strength: 'warm' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1500 },
      { fromGame: 300, expectedYen: -500 },
      { fromGame: 500, expectedYen: 500, note: '天井狙い開始' },
      { fromGame: 600, expectedYen: 1500 },
      { fromGame: 700, expectedYen: 3000 },
      { fromGame: 800, expectedYen: 5000 },
      { fromGame: 900, expectedYen: 7000, note: '天井間近' },
    ],
    resetInfo: 'リセット時は天井700G+スルー天井5回に短縮',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'AT初当たり', name: 'AT初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/581.8 → 設定6: 1/407.3（約1.43倍差）', importance: 'strong' },
    { keyword: 'ボーナス合算', name: 'ボーナス合算確率', timing: '終日カウント', settingHint: '設定1: 1/299.9 → 設定6: 1/244.8', importance: 'strong' },
    { keyword: '殲滅作戦', name: '殲滅作戦勝利率', timing: '殲滅作戦突入時', settingHint: '設定1: 49.3% → 設定6: 65.3%。設定6のみ突出。最重要', importance: 'strong' },
    { keyword: 'スイカCZ', name: 'スイカからCZ当選率', timing: 'スイカ出現時', settingHint: '設定1: 20.3% → 設定6: 30.5%（約1.5倍差）', importance: 'strong' },
    { keyword: 'モスラ', name: 'AT終了画面（モスラ）', timing: 'AT終了時PUSH', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: 'エヴァ&ゴジラAT', name: 'AT終了画面（エヴァ&ゴジラ）', timing: 'AT終了時PUSH', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: 'カヲルAT', name: 'AT終了画面（カヲル）', timing: 'AT終了時PUSH', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'レイ月背景', name: 'ボーナス終了画面（レイ月背景）', timing: 'ボーナス終了時', settingHint: '設定2以上濃厚', importance: 'confirmed' },
    { keyword: 'エヴァ&ゴジラBN', name: 'ボーナス終了画面（エヴァ&ゴジラ）', timing: 'ボーナス終了時', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: 'レイ', name: 'ボーナス終了画面（レイ）', timing: 'ボーナス終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: 'アスカ', name: 'ボーナス終了画面（アスカ）', timing: 'ボーナス終了時', settingHint: '高設定示唆（強）', importance: 'strong' },
    { keyword: '222枚', name: '特殊獲得枚数（222枚超）', timing: 'AT中', settingHint: '設定2以上', importance: 'confirmed' },
    { keyword: '456枚', name: '特殊獲得枚数（456枚超）', timing: 'AT中', settingHint: '設定4以上', importance: 'confirmed' },
    { keyword: '666枚', name: '特殊獲得枚数（666枚超）', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '加持ボイス', name: 'ED中ボイス（加持）', timing: 'エンディング中', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: 'カヲルボイス', name: 'ED中ボイス（カヲル）', timing: 'エンディング中', settingHint: '設定6濃厚', importance: 'confirmed' },
  ],
};

export default config;
