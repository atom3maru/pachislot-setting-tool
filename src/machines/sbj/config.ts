import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'sbj',
  name: 'スマスロスーパーブラックジャック',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-green-800 to-emerald-600',
  // 6段階設定（1,2,3,4,5,6）

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: '初当たり回数', hint: '設定4以上で大幅UP' },
            { key: 'suikaCnt', label: '斜めスイカ回数', hint: '最重要カウント対象!' },
          ],
        },
      ],
    },
    {
      title: 'ST直撃・チャンス目', icon: '⚡',
      groups: [
        {
          label: '斜めスイカ→ST直撃', columns: 2,
          fields: [
            { key: 'st_hit', label: 'スイカST直撃回数', hint: '設定5・6で大幅優遇' },
            { key: 'st_suika_total', label: 'スイカ成立総数', hint: 'ST直撃の分母' },
          ],
        },
        {
          label: 'チャンス目→高確移行', columns: 2,
          fields: [
            { key: 'chance_koukaku', label: 'チャンス目→高確移行回数', hint: '設定1:40%→設定6:60%' },
            { key: 'chance_total', label: 'チャンス目成立総数' },
          ],
        },
      ],
    },
    {
      title: 'ケロットトロフィー・終了画面', icon: '🏆',
      groups: [
        {
          label: 'ケロットトロフィー（ボーナス終了時）', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_kerot', label: 'ケロット柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'REG終了時キャラカード', columns: 3,
          fields: [
            { key: 'card_rina', label: 'リナ', hint: '高設定期待度UP（強）' },
            { key: 'card_joker', label: 'リオ&リナ（ジョーカー）', hint: '設定5以上濃厚!' },
            { key: 'card_3nin', label: 'リオ&リナ&ミント', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'ダイスチェック', icon: '🎲',
      groups: [
        {
          label: 'ダイスゾロ目（150G/450G/750G時）', columns: 3,
          fields: [
            { key: 'dice4', label: '4ゾロ目', hint: '設定4以上濃厚' },
            { key: 'dice5', label: '5ゾロ目', hint: '設定5以上濃厚' },
            { key: 'dice6', label: '6ゾロ目', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/241.7, 1/238.8, 1/235.9, 1/201.8, 1/194.9, 1/181.3] },
    { key: 'suikaCnt', totalKey: 'totalG', rates: [1/99.9, 1/91.1, 1/87.7, 1/86.7, 1/85.0, 1/83.9] },
  ],

  binomialEntries: [
    { hitKey: 'st_hit', totalKey: 'st_suika_total', rates: [0.004, 0.004, 0.005, 0.007, 0.014, 0.016] },
    { hitKey: 'chance_koukaku', totalKey: 'chance_total', rates: [0.401, 0.430, 0.465, 0.510, 0.555, 0.595] },
  ],

  categoricalGroups: [
    {
      keys: ['t_copper', 't_silver', 't_gold', 't_kerot', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        t_kerot:   [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['card_rina', 'card_joker', 'card_3nin'],
      rates: {
        card_rina:   [0.02, 0.03, 0.04, 0.05, 0.06, 0.08],
        card_joker:  [0.00, 0.00, 0.00, 0.00, 0.02, 0.03],
        card_3nin:   [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
  ],

  confirmedMin: {
    t_copper: 2, t_silver: 3, t_gold: 4, t_kerot: 5, t_rainbow: 6,
    card_joker: 5, card_3nin: 6,
    dice4: 4, dice5: 5, dice6: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.t_rainbow ?? 0) >= 1 || (input.card_3nin ?? 0) >= 1 || (input.dice6 ?? 0) >= 1) {
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
    if (input.suikaCnt == null) hints.push('斜めスイカ確率は最重要カウント対象！必ずカウントしましょう');
    if (input.st_hit == null) hints.push('スイカからのST直撃は設定5・6で大幅優遇');
    if (input.chance_koukaku == null) hints.push('チャンス目からの高確移行率にも大きな設定差あり');
    if (!['t_copper', 't_silver', 't_gold', 't_kerot', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('ケロットトロフィーを確認してください（虹=設定6濃厚）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.8, 98.8, 100.0, 103.5, 107.7, 112.7],
  baseCoins: 31,

  checklist: [
    { id: 'ck_suika', label: '斜めスイカ確率をカウントしているか', category: '通常時' },
    { id: 'ck_st', label: 'スイカからのST直撃を確認（設定5・6優遇）', category: '通常時' },
    { id: 'ck_chance', label: 'チャンス目からの高確移行率を確認', category: '通常時' },
    { id: 'ck_trophy', label: 'ケロットトロフィーを確認（虹=設定6濃厚）', category: 'AT終了時' },
    { id: 'ck_reg', label: 'REGスルー回数をカウント（4連続で天井）', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別（天井666Gに短縮）を確認', category: '朝一' },
  ],

  guide: {
    settingHunt: [
      '斜めスイカ確率は最重要カウント対象！必ずカウント',
      'スイカからのST直撃は設定5・6で大幅優遇',
      'チャンス目からの高確移行率にも大きな設定差あり',
      'ケロットトロフィー虹で設定6濃厚',
    ],
    morningCheck: [
      'リセット時は天井が666Gに短縮',
      'データカウンターでボーナス初当たり確率を確認',
      '前日の最終G数を確認（据え置き判別の参考）',
    ],
    quitTiming: [
      '2000G消化してスイカ確率が設定1以下ならやめ検討',
      '確定演出なし＋ST直撃なしが続くなら低設定を疑う',
      'REGスルーが続く場合は4スルー天井を狙うか判断',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: '999G/REGスルー4連続/スイカ100回で天井',
    zones: [
      { start: 0, end: 100, label: 'リオチャンス高確', strength: 'warm' as const },
      { start: 250, end: 300, label: 'ゾーン', strength: 'warm' as const },
      { start: 550, end: 666, label: 'リセット天井', strength: 'hot' as const },
      { start: 900, end: 999, label: '通常天井', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000, note: '0Gから打つとマイナス' },
      { fromGame: 250, expectedYen: 200 },
      { fromGame: 350, expectedYen: 800 },
      { fromGame: 450, expectedYen: 1500 },
      { fromGame: 560, expectedYen: 2500, note: 'リセット天井狙い目' },
      { fromGame: 700, expectedYen: 4000, note: '通常天井狙い' },
    ],
    resetInfo: 'リセット時は天井が666Gに短縮',
    notes: [
      'G数天井999G・REGスルー4連続・スイカ100回の3種天井',
      'リセット時は天井666Gに短縮',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
