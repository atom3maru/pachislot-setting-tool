import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'tekken6',
  name: 'スマスロ鉄拳6',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-orange-700 to-red-700',
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
            { key: 'bonusCnt', label: 'ボーナス初当たり回数' },
            { key: 'directCnt', label: 'AT直撃回数', hint: '設定差約3.5倍!' },
          ],
        },
      ],
    },
    {
      title: 'AT引き戻し・エピソード', icon: '⚡',
      groups: [
        {
          label: 'AT引き戻し', columns: 2,
          fields: [
            { key: 'hiki_hit', label: '引き戻し当選回数', hint: '高設定ほど優遇' },
            { key: 'hiki_total', label: 'AT終了総回数', hint: '引き戻しの分母' },
          ],
        },
        {
          label: 'エピソードBIG昇格', columns: 2,
          fields: [
            { key: 'epi_hit', label: 'エピソードBIG発生回数', hint: '設定1:2%→設定6:13%' },
            { key: 'epi_total', label: '赤7BIG開始総回数', hint: 'エピソードの分母' },
          ],
        },
      ],
    },
    {
      title: 'ケロットトロフィー', icon: '🏆',
      groups: [
        {
          label: 'ケロットトロフィー（BIG/CZ/ED終了時）', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上確定' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上確定' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上確定!' },
            { key: 't_kerot', label: 'ケロット柄', hint: '設定5以上確定!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6確定!!' },
          ],
        },
      ],
    },
    {
      title: 'BIG終了画面・その他', icon: '🖼️',
      groups: [
        {
          label: '鉄拳チャンス経由BIG終了画面', columns: 2,
          fields: [
            { key: 'red_bg', label: '赤背景（一八/平八/一美）', hint: '設定4以上濃厚!' },
            { key: 'red_bg_none', label: '赤背景なし' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/497.0, 1/484.1, 1/456.8, 1/397.6, 1/366.4, 1/358.5] },
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/264.7, 1/261.5, 1/255.3, 1/227.6, 1/220.3, 1/218.5] },
    { key: 'directCnt', totalKey: 'totalG', rates: [1/12580.4, 1/10774.5, 1/7471.1, 1/5347.4, 1/3840.1, 1/3565.2] },
  ],

  binomialEntries: [
    { hitKey: 'hiki_hit', totalKey: 'hiki_total', rates: [0.102, 0.109, 0.125, 0.141, 0.164, 0.172] },
    { hitKey: 'epi_hit', totalKey: 'epi_total', rates: [0.02, 0.03, 0.05, 0.07, 0.10, 0.13] },
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
      keys: ['red_bg', 'red_bg_none'],
      rates: {
        red_bg:      [0.00, 0.00, 0.00, 0.03, 0.04, 0.05],
        red_bg_none: [1.00, 1.00, 1.00, 0.97, 0.96, 0.95],
      },
    },
  ],

  confirmedMin: {
    t_copper: 2, t_silver: 3, t_gold: 4, t_kerot: 5, t_rainbow: 6,
    red_bg: 4,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.t_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
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
    if (input.directCnt == null) hints.push('AT直撃は設定差約3.5倍！必ずカウントしましょう');
    if (input.epi_hit == null) hints.push('エピソードBIG昇格率に大きな設定差あり（設定1:2%→設定6:13%）');
    if (!['t_copper', 't_silver', 't_gold', 't_kerot', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('ケロットトロフィーを確認してください（虹=設定6確定）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.9, 98.9, 100.5, 105.2, 110.3, 114.9],
  baseCoins: 31,

  checklist: [
    { id: 'ck_direct', label: 'AT直撃回数をカウントしているか', category: '通常時' },
    { id: 'ck_epi', label: 'エピソードBIG昇格率を確認', category: 'ボーナス中' },
    { id: 'ck_trophy', label: 'ケロットトロフィーを確認（虹=設定6確定）', category: 'AT終了時' },
    { id: 'ck_pt', label: 'pt数（ゲーム数管理）をメモ', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別（500pt天井）を確認', category: '朝一' },
    { id: 'ck_through', label: 'スルー回数をカウント（2スルーで天井）', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'AT直撃確率が最重要（設定1: 1/12580 → 設定6: 1/3565、約3.5倍差）。1回でも高設定期待大',
      'エピソードBIG昇格率に大きな設定差（設定1: 2% → 設定6: 13%、6.5倍差）',
      'AT引き戻し率（設定1: 10.2% → 設定6: 17.2%）もカウント推奨',
      'ケロットトロフィー：銅=設定2↑、銀=設定3↑、金=設定4↑、ケロット柄=設定5↑、虹=設定6確定',
      'BIG終了画面赤背景（一八/平八/一美）=設定4以上濃厚',
      'AT初当たり確率（設定1: 1/497.0 → 設定6: 1/358.5、約1.39倍差）も参考に',
    ],
    morningCheck: [
      'リセット時は天井が500pt（約415G相当）に短縮（通常900pt/約747G）',
      'リセット時はスルー天井が2スルーに短縮。1スルー台は超狙い目',
      'リセット判別：370〜415G付近でボーナス当選ならリセット天井500pt濃厚',
      'リセット台は250G付近から期待値プラス。朝一はリセット天井狙い',
    ],
    quitTiming: [
      'AT終了後0〜100Gは引き戻しゾーン。100G消化後にやめ判断',
      'リセット天井圏内370〜415G付近なら天井500ptまで打ち切り推奨',
      '通常天井残り100G以内（660G〜）なら天井747Gまで打ち切り（期待値+4000円）',
      '1スルー状態なら2スルー天井まで続行必須（次回ボーナスでAT確定）',
      '2000G消化してAT直撃0回＋エピソードBIG昇格0回ならやめ検討',
    ],
  },

  hyena: {
    ceilingGame: 747,
    ceilingBenefit: '900pt（約747G）到達で天井、スルー天井2スルー',
    zones: [
      { start: 0, end: 100, label: '引き戻し', strength: 'warm' as const },
      { start: 370, end: 415, label: 'リセット天井（500pt）', strength: 'warm' as const },
      { start: 660, end: 747, label: '天井直前', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000, note: '0Gから打つとマイナス' },
      { fromGame: 250, expectedYen: 200 },
      { fromGame: 400, expectedYen: 1000 },
      { fromGame: 500, expectedYen: 2000, note: 'リセット天井付近' },
      { fromGame: 650, expectedYen: 4000, note: '天井直前・高期待値' },
    ],
    resetInfo: 'リセット時は天井500ptに短縮、スルー天井2スルー',
    notes: [
      '天井は900pt（約747G相当）',
      'ptとG数は完全に一致しないため注意',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'トロフィー', name: 'ケロットトロフィー 虹', timing: 'BIG/CZ/ED終了時', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'ケロットトロフィー ケロット柄', timing: 'BIG/CZ/ED終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'ケロットトロフィー 金', timing: 'BIG/CZ/ED終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'ケロットトロフィー 銀', timing: 'BIG/CZ/ED終了時', settingHint: '設定3以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'ケロットトロフィー 銅', timing: 'BIG/CZ/ED終了時', settingHint: '設定2以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'BIG終了画面 赤背景（一八/平八/一美）', timing: '鉄拳チャンス経由BIG終了時', settingHint: '設定4以上濃厚', importance: 'strong' },
    { keyword: '直撃', name: 'AT直撃確率', timing: '通常時', settingHint: '設定1: 1/12580 → 設定6: 1/3565（約3.5倍差）', importance: 'weak' },
    { keyword: 'エピソード', name: 'エピソードBIG昇格率', timing: '赤7BIG開始時', settingHint: '設定1: 2% → 設定6: 13%（6.5倍差）', importance: 'weak' },
    { keyword: '引き戻し', name: 'AT引き戻し率', timing: 'AT終了時', settingHint: '設定1: 10.2% → 設定6: 17.2%', importance: 'weak' },
    { keyword: 'AT', name: 'AT初当たり確率', timing: '通常時', settingHint: '設定1: 1/497.0 → 設定6: 1/358.5（約1.39倍差）', importance: 'weak' },
    { keyword: 'ボーナス', name: 'ボーナス初当たり確率', timing: '通常時', settingHint: '設定1: 1/264.7 → 設定6: 1/218.5', importance: 'weak' },
    { keyword: 'スルー', name: 'スルー天井', timing: '通常時', settingHint: '2スルーで天井（リセット時も2スルー）', importance: 'weak' },
  ],
};

export default config;
