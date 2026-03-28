import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'hokuto_original',
  name: 'スマスロ北斗の拳',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-blue-900 to-indigo-800',
  settingLabels: ['1', '2', '4', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: 'バトルボーナス合算' },
            { key: 'weakSuika', label: '弱スイカ回数' },
            { key: 'strongSuikaA', label: '強スイカA回数', hint: '右リール中段スイカ' },
            { key: 'chuCherryA', label: '中段チェリーA回数' },
            { key: 'reachMoku', label: 'リーチ目回数', hint: '超レア・大設定差!' },
          ],
        },
      ],
    },
    {
      title: 'BB終了時ボイス', icon: '🔊',
      groups: [
        {
          label: 'サブ液晶タッチ時セリフ', columns: 3,
          fields: [
            { key: 'voice_default', label: 'リン・バット', hint: 'デフォルト' },
            { key: 'voice_shin', label: 'シン', hint: '高設定示唆（弱）' },
            { key: 'voice_souther', label: 'サウザー', hint: '高設定示唆（弱）' },
            { key: 'voice_jagi', label: 'ジャギ', hint: '高設定示唆（中）' },
            { key: 'voice_amiba', label: 'アミバ', hint: '高設定示唆（強）' },
            { key: 'voice_ken', label: 'ケンシロウ', hint: '設定4以上期待大!' },
            { key: 'voice_yuria', label: 'ユリア', hint: '設定5以上期待大!' },
          ],
        },
      ],
    },
    {
      title: 'サミートロフィー・確定演出', icon: '🏆',
      groups: [
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上!' },
            { key: 't_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6確定!!' },
          ],
        },
        {
          label: '設定5以上確定演出', columns: 3,
          fields: [
            { key: 'c_shinbattle', label: 'シンバトル', hint: '設定5以上確定' },
            { key: 'c_souther_battle', label: 'サウザーバトル', hint: '設定5以上確定' },
            { key: 'c_jagi_battle', label: 'ジャギバトル', hint: '設定5以上確定' },
          ],
        },
      ],
    },
  ],

  // 設定1,2,4,5,6の5段階
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/383.4, 1/370.5, 1/297.8, 1/258.7, 1/235.1] },
    { key: 'weakSuika', totalKey: 'totalG', rates: [1/109.0, 1/108.7, 1/105.9, 1/100.7, 1/98.3] },
    { key: 'strongSuikaA', totalKey: 'totalG', rates: [1/546.1, 1/537.2, 1/489.1, 1/448.9, 1/425.6] },
    { key: 'chuCherryA', totalKey: 'totalG', rates: [1/260.1, 1/252.1, 1/244.5, 1/237.4, 1/230.8] },
    { key: 'reachMoku', totalKey: 'totalG', rates: [1/16384.0, 1/13107.2, 1/10922.7, 1/9362.3, 1/8192.0] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['voice_default', 'voice_shin', 'voice_souther', 'voice_jagi', 'voice_amiba', 'voice_ken', 'voice_yuria'],
      rates: {
        voice_default:  [0.70, 0.65, 0.50, 0.45, 0.40],
        voice_shin:     [0.10, 0.12, 0.15, 0.15, 0.15],
        voice_souther:  [0.10, 0.12, 0.15, 0.15, 0.15],
        voice_jagi:     [0.05, 0.06, 0.08, 0.10, 0.10],
        voice_amiba:    [0.05, 0.05, 0.07, 0.08, 0.10],
        voice_ken:      [0.00, 0.00, 0.03, 0.04, 0.05],
        voice_yuria:    [0.00, 0.00, 0.02, 0.03, 0.05],
      },
    },
    {
      keys: ['t_gold', 't_kirin', 't_rainbow'],
      rates: {
        t_gold:    [0.000, 0.000, 0.005, 0.005, 0.005],
        t_kirin:   [0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
  ],

  confirmedMin: {
    t_gold: 4, t_kirin: 5, t_rainbow: 6,
    voice_ken: 4, voice_yuria: 5,
    c_shinbattle: 5, c_souther_battle: 5, c_jagi_battle: 5,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if (input.t_rainbow != null && input.t_rainbow >= 1) {
      return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    }
    if (cMin >= 5) {
      return { message: `設定5以上確定！（設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
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
    if (input.totalG == null) hints.push('総ゲーム数を入力すると判定精度が上がります');
    if (input.reachMoku == null) hints.push('リーチ目は設定差が2倍！見逃さないようにしましょう');
    if (!['voice_default', 'voice_shin', 'voice_jagi', 'voice_amiba', 'voice_ken', 'voice_yuria'].some(k => (input[k] ?? 0) > 0))
      hints.push('BB終了時にサブ液晶をタッチしてボイスを確認しましょう');
    if (!['t_gold', 't_kirin', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーの色を確認してください（虹=設定6確定）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [98.0, 98.9, 105.7, 110.0, 113.0],
  baseCoins: 35,

  checklist: [
    { id: 'ck_bb_hit', label: 'BB初当たり回数を記録', category: '通常時' },
    { id: 'ck_mode', label: 'モード移行パターンを把握', category: '通常時' },
    { id: 'ck_endscreen', label: '終了画面セリフ・トロフィーを確認', category: 'BB終了時' },
    { id: 'ck_ceiling', label: '天井ゲーム数を確認', category: '通常時' },
    { id: 'ck_samai', label: '有利区間差枚を確認', category: '随時' },
    { id: 'ck_nazo', label: '謎当たりを記録', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'BB終了後ボイス確認（サブ液晶タッチ）',
      'サミートロフィーの色で設定示唆',
      '初当たり確率に設定差あり',
      'モード移行率で設定推測',
    ],
    morningCheck: [
      'リセット時は天井800Gに短縮',
      '天国移行率が優遇される',
      '300Gまでの短縮抽選あり',
    ],
    quitTiming: [
      'AT後モード示唆30G確認',
      '差枚750以上で1G確認',
    ],
  },

  hyena: {
    ceilingGame: 1268,
    ceilingBenefit: 'AT当選+継続率優遇（リセット時は800G天井）',
    zones: [
      { start: 280, end: 320, label: '300G短縮抽選', strength: 'warm' as const },
      { start: 760, end: 800, label: '777G/800G短縮抽選', strength: 'warm' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -2000 },
      { fromGame: 200, expectedYen: -1000 },
      { fromGame: 400, expectedYen: 200 },
      { fromGame: 600, expectedYen: 1500 },
      { fromGame: 700, expectedYen: 2500 },
      { fromGame: 800, expectedYen: 4000, note: 'リセット天井到達' },
      { fromGame: 1000, expectedYen: 8000 },
    ],
    resetInfo: 'リセット時は天井800Gに短縮',
    notes: [
      '天井は通常時1268G（リセット800G）',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
