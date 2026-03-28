import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'bakemonogatari',
  name: 'スマスロ化物語',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-purple-600 to-pink-500',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数' },
            { key: 'suikaCnt', label: 'スイカ回数', hint: '設定差あり！1/87→1/70' },
          ],
        },
      ],
    },
    {
      title: '弱チェリーAT直撃', icon: '⚡',
      groups: [
        {
          label: '弱チェリーからのAT直撃（設定差約9.5倍）', columns: 2,
          fields: [
            { key: 'cherry_direct_hit', label: '直撃当選回数', hint: '1回でも確認できれば高設定期待大' },
            { key: 'cherry_direct_total', label: '弱チェリー出現総数', hint: '直撃の分母' },
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
            { key: 'e_koyomi', label: '阿良々木暦（デフォルト）' },
            { key: 'e_hitagi', label: '戦場ヶ原ひたぎ', hint: '高設定示唆（強）' },
            { key: 'e_mayoi', label: '八九寺真宵', hint: '偶数設定示唆' },
            { key: 'e_suruga', label: '神原駿河', hint: '奇数＋高設定示唆' },
            { key: 'e_nadeko', label: '千石撫子', hint: '高設定示唆（弱）' },
            { key: 'e_hanekawa', label: '羽川翼', hint: '偶数設定示唆（強）' },
            { key: 'e_shinobu', label: '忍', hint: '偶数設定濃厚' },
            { key: 'e_meme', label: '忍野メメ', hint: '設定3/5/6濃厚' },
            { key: 'e_gold', label: '初代パネル金枠', hint: '設定4以上濃厚!' },
            { key: 'e_iloveu', label: 'I LOVE YOU', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'サミートロフィー・獲得枚数', icon: '🏆',
      groups: [
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 't_copper', label: '銅', hint: '設定2以上' },
            { key: 't_silver', label: '銀', hint: '設定3以上' },
            { key: 't_gold', label: '金', hint: '設定4以上!' },
            { key: 't_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹', hint: '設定6確定!!' },
          ],
        },
        {
          label: '特殊獲得枚数表示', columns: 3,
          fields: [
            { key: 'num_174', label: '174枚突破', hint: '設定2以上' },
            { key: 'num_543', label: '543枚突破', hint: '設定3以上' },
            { key: 'num_331', label: '331枚突破', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/265.1, 1/260.7, 1/252.1, 1/238.8, 1/230.8, 1/219.6] },
    { key: 'suikaCnt', totalKey: 'totalG', rates: [1/87.4, 1/85.8, 1/84.9, 1/79.7, 1/74.8, 1/69.9] },
  ],

  binomialEntries: [
    { hitKey: 'cherry_direct_hit', totalKey: 'cherry_direct_total', rates: [0.004, 0.008, 0.013, 0.021, 0.029, 0.038] },
  ],

  categoricalGroups: [
    {
      keys: ['e_koyomi', 'e_hitagi', 'e_mayoi', 'e_suruga', 'e_nadeko', 'e_hanekawa', 'e_shinobu', 'e_meme', 'e_gold', 'e_iloveu'],
      rates: {
        e_koyomi:   [0.50, 0.42, 0.38, 0.30, 0.25, 0.20],
        e_hitagi:   [0.05, 0.06, 0.08, 0.10, 0.12, 0.14],
        e_mayoi:    [0.10, 0.12, 0.10, 0.12, 0.10, 0.12],
        e_suruga:   [0.10, 0.08, 0.12, 0.08, 0.12, 0.08],
        e_nadeko:   [0.08, 0.08, 0.10, 0.10, 0.10, 0.10],
        e_hanekawa: [0.05, 0.10, 0.06, 0.10, 0.06, 0.10],
        e_shinobu:  [0.05, 0.07, 0.05, 0.07, 0.05, 0.07],
        e_meme:     [0.04, 0.03, 0.06, 0.04, 0.08, 0.06],
        e_gold:     [0.00, 0.00, 0.00, 0.05, 0.06, 0.07],
        e_iloveu:   [0.00, 0.00, 0.00, 0.00, 0.00, 0.02],
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
    {
      keys: ['num_174', 'num_543', 'num_331'],
      rates: {
        num_174: [0.000, 0.005, 0.005, 0.005, 0.005, 0.005],
        num_543: [0.000, 0.000, 0.005, 0.005, 0.005, 0.005],
        num_331: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_gold: 4, e_iloveu: 6,
    t_copper: 2, t_silver: 3, t_gold: 4, t_kirin: 5, t_rainbow: 6,
    num_174: 2, num_543: 3, num_331: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    if ((input.t_rainbow ?? 0) >= 1 || (input.e_iloveu ?? 0) >= 1 || (input.num_331 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.suikaCnt == null) hints.push('スイカ確率は設定差あり（1/87→1/70）。必ずカウントしましょう');
    if (input.cherry_direct_hit == null) hints.push('弱チェリーAT直撃は設定差約9.5倍！確認必須');
    if (!['t_copper','t_silver','t_gold','t_kirin','t_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーを確認してください（虹=設定6確定）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.9, 98.9, 100.9, 105.0, 107.8, 112.1],
  baseCoins: 31,

  checklist: [
    { id: 'ck_suika', label: 'スイカ確率をカウントしているか（1/87→1/70）', category: '通常時' },
    { id: 'ck_cherry', label: '弱チェリーAT直撃を確認（9.5倍差）', category: '通常時' },
    { id: 'ck_trophy', label: 'サミートロフィーを確認（虹=設定6確定）', category: 'AT終了時' },
    { id: 'ck_ceiling', label: '通常時G数をメモ（天井1000G）', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別（天井600Gに短縮）を確認', category: '朝一' },
    { id: 'ck_baibai', label: '天井恩恵（AT+倍倍チャンス）を把握', category: '天井到達時' },
  ],

  guide: {
    settingHunt: [
      'スイカ確率が重要指標（設定1: 1/87.4 → 設定6: 1/69.9、約1.25倍差）。2000G以上で判断',
      '弱チェリーAT直撃は設定差約9.5倍（設定1: 0.4% → 設定6: 3.8%）。1回でも確認で高設定期待大',
      'AT初当たり確率（設定1: 1/265.1 → 設定6: 1/219.6）も要チェック。1.21倍差',
      'サミートロフィー：銅=設定2以上、銀=設定3以上、金=設定4以上、キリン柄=設定5以上、虹=設定6確定',
      'AT終了画面「I LOVE YOU」で設定6濃厚。「初代パネル金枠」は設定4以上濃厚',
      '獲得枚数表示：174枚突破=設定2以上、543枚突破=設定3以上、331枚突破=設定6濃厚',
    ],
    morningCheck: [
      '天井は通常1000Gだが、設定変更後は600Gに大幅短縮。リセット台は期待値大',
      'リセット台は300G付近から期待値プラス。前日最終G数を確認し据え置き判別',
      '0〜50G引き戻しゾーンあり。AT終了後は即ヤメ厳禁、50Gまで様子見',
      '100G・200G・300GでCZ抽選あり。リセット確認後は550〜600Gの天井ゾーンを狙う',
    ],
    quitTiming: [
      'AT終了後0〜50Gの引き戻しゾーンを必ず消化してからやめる',
      '2000G消化でスイカ1/90以下かつ確定演出なしなら設定1-2濃厚。やめ推奨',
      'AT初当たり1/270以上が続きトロフィー銅以下のみなら低設定の可能性大',
      '残り天井200G以内（通常800G〜/リセット400G〜）なら天井まで打ち切り推奨',
      'リセット後は天井600Gのため、300G付近でも続行価値あり',
    ],
  },

  hyena: {
    ceilingGame: 1000,
    ceilingBenefit: '1000G到達で天井（恩恵: AT+倍倍チャンス）',
    zones: [
      { start: 0, end: 50, label: '引き戻し', strength: 'hot' as const },
      { start: 100, end: 100, label: 'CZ抽選', strength: 'warm' as const },
      { start: 200, end: 200, label: 'CZ抽選', strength: 'warm' as const },
      { start: 300, end: 300, label: 'CZ抽選', strength: 'warm' as const },
      { start: 550, end: 600, label: 'リセット天井', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -800, note: '0Gから打つとマイナス' },
      { fromGame: 300, expectedYen: 200 },
      { fromGame: 400, expectedYen: 800 },
      { fromGame: 600, expectedYen: 1500, note: 'リセット天井付近' },
      { fromGame: 650, expectedYen: 2000 },
      { fromGame: 700, expectedYen: 2500 },
      { fromGame: 800, expectedYen: 4000, note: '天井間近・高期待値' },
    ],
    resetInfo: 'リセット時は天井が600Gに短縮',
    notes: [
      '通常天井1000Gとリセット天井600Gに注意',
      '天井恩恵はAT+倍倍チャンスと強力',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
