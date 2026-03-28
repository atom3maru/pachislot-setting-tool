import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'hokuto',
  name: 'スマスロ 北斗の拳 転生の章2',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-sky-800 to-blue-700',

  sections: [
    {
      title: '確率系データ', icon: '⭐',
      groups: [{
        columns: 3,
        fields: [
          { key: 'totalG', label: '総ゲーム数' },
          { key: 'atCnt', label: 'AT初当たり回数', hint: '最重要の設定差' },
          { key: 'tenpa_cnt', label: '天破の刻 回数', hint: '設定差大' },
          { key: 'tenpa_total', label: '天破の刻 試行機会数', hint: '伝承モード非滞在時' },
        ],
      }],
    },
    {
      title: '天撃（上位CZ）', icon: '⚔️',
      groups: [{
        columns: 2,
        fields: [
          { key: 'tengeki_hit', label: '天撃成功回数', hint: '高設定ほど高い' },
          { key: 'tengeki_total', label: '天撃突入回数（分母）' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🎬',
      groups: [
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 'tr_copper', label: '銅', hint: '設定2以上' },
            { key: 'tr_silver', label: '銀', hint: '設定3以上' },
            { key: 'tr_gold', label: '金', hint: '設定4以上' },
            { key: 'tr_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 'tr_rainbow', label: '虹', hint: '設定6確定!!' },
          ],
        },
        {
          label: '100G毎の枠ランプ（ランプB中央）', columns: 3,
          fields: [
            { key: 'lamp_white', label: '白点灯', hint: '設定2・4示唆' },
            { key: 'lamp_white_blink', label: '白点滅', hint: '設定3・5示唆' },
            { key: 'lamp_aqua', label: '水色点灯', hint: '高設定示唆(弱)' },
            { key: 'lamp_aqua_blink', label: '水色点滅', hint: '高設定示唆(強)' },
            { key: 'lamp_green', label: '黄緑点灯', hint: '設定2以上濃厚' },
            { key: 'lamp_green_blink', label: '黄緑点滅', hint: '設定4以上濃厚!' },
            { key: 'lamp_gold', label: '金点灯', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: 'モード示唆', icon: '📊',
      groups: [
        {
          label: 'AT終了後の天国モード移行', columns: 2,
          fields: [
            { key: 'mode_heaven', label: '天国移行回数(256以内AT)', hint: '高設定ほど多い' },
            { key: 'mode_total', label: 'AT終了回数（分母）' },
          ],
        },
        {
          label: '朝一リセット時', columns: 2,
          fields: [
            { key: 'reset_early', label: '256あべし以内AT当選', hint: '設定6=50%以上' },
            { key: 'reset_count', label: 'リセット確認回数' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/366.0, 1/357.0, 1/336.3, 1/298.7, 1/283.2, 1/273.1] },
  ],

  binomialEntries: [
    // 天破の刻出現率
    { hitKey: 'tenpa_cnt', totalKey: 'tenpa_total', rates: [1/100.2, 1/96.0, 1/92.0, 1/88.0, 1/84.0, 1/81.3] },
    // 天撃成功率
    { hitKey: 'tengeki_hit', totalKey: 'tengeki_total', rates: [0.50, 0.50, 0.50, 0.515, 0.549, 0.608] },
    // 天国モード移行率
    { hitKey: 'mode_heaven', totalKey: 'mode_total', rates: [0.068, 0.075, 0.085, 0.100, 0.120, 0.150] },
    // 朝一256以内当選率
    { hitKey: 'reset_early', totalKey: 'reset_count', rates: [0.25, 0.28, 0.32, 0.38, 0.45, 0.52] },
  ],

  categoricalGroups: [
    {
      keys: ['tr_copper', 'tr_silver', 'tr_gold', 'tr_kirin', 'tr_rainbow'],
      rates: {
        tr_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        tr_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        tr_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        tr_kirin:   [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        tr_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['lamp_white', 'lamp_white_blink', 'lamp_aqua', 'lamp_aqua_blink', 'lamp_green', 'lamp_green_blink', 'lamp_gold'],
      rates: {
        lamp_white:        [0.050, 0.100, 0.050, 0.100, 0.050, 0.050],
        lamp_white_blink:  [0.050, 0.050, 0.100, 0.050, 0.100, 0.050],
        lamp_aqua:         [0.010, 0.010, 0.015, 0.020, 0.025, 0.030],
        lamp_aqua_blink:   [0.005, 0.005, 0.008, 0.010, 0.015, 0.020],
        lamp_green:        [0.000, 0.010, 0.010, 0.010, 0.010, 0.010],
        lamp_green_blink:  [0.000, 0.000, 0.000, 0.005, 0.005, 0.010],
        lamp_gold:         [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
  ],

  confirmedMin: {
    tr_copper: 2, tr_silver: 3, tr_gold: 4, tr_kirin: 5, tr_rainbow: 6,
    lamp_green: 2, lamp_green_blink: 4, lamp_gold: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.tr_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    if ((input.lamp_gold ?? 0) >= 1) return { message: '設定6濃厚！金ランプを確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定${cMin}以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[4] + p[5];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると精度が上がります');
    if (input.atCnt == null) hints.push('AT初当たり回数は最重要の設定差要素です');
    if (input.tenpa_cnt == null) hints.push('天破の刻の出現率は重要な設定差要素です');
    if (!['tr_copper','tr_silver','tr_gold','tr_kirin','tr_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーを確認してください（虹=設定6確定）');
    if (input.tengeki_hit == null) hints.push('天撃の成功率もチェックしましょう（設定6=60.8%）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.6, 98.4, 106.2, 111.1, 114.9],
  settingLabels: ['設定1', '設定2', '設定4', '設定5', '設定6'],
  baseCoins: 32,

  checklist: [
    { id: 'ck_abeshi', label: 'あべし数管理', category: '通常時' },
    { id: 'ck_lamp100', label: '100Gランプ色', category: '通常時' },
    { id: 'ck_trophy', label: 'トロフィー', category: 'AT終了時' },
    { id: 'ck_tengeki', label: '天撃CZ成功失敗', category: 'CZ中' },
    { id: 'ck_ui_red', label: 'UI赤表示', category: '通常時' },
    { id: 'ck_mode', label: 'モード推測', category: '通常時' },
    { id: 'ck_denshou', label: '伝承ショート', category: 'AT中' },
  ],

  guide: {
    settingHunt: [
      '100Gランプ色',
      'サミートロフィー',
      '天撃CZ成功率',
      'モード移行率',
    ],
    morningCheck: [
      'リセットで天井1280短縮',
      '高確50%スタート',
      '193-256ゾーン確認',
    ],
    quitTiming: [
      'AT後モード示唆30G確認',
      '差枚750以上で1G確認',
      '地獄モード示唆時',
    ],
  },

  hyena: {
    ceilingGame: 1536,
    ceilingBenefit: '1536あべし到達でAT闘神演舞（リセット時1280あべし）',
    zones: [
      { start: 193, end: 256, label: '全モード共通高期待度', strength: 'hot' },
      { start: 300, end: 300, label: '短縮抽選', strength: 'warm' },
      { start: 777, end: 777, label: '短縮抽選', strength: 'warm' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1500 },
      { fromGame: 200, expectedYen: -800 },
      { fromGame: 400, expectedYen: 200 },
      { fromGame: 600, expectedYen: 1500 },
      { fromGame: 700, expectedYen: 2500 },
      { fromGame: 800, expectedYen: 4000 },
    ],
    resetInfo: 'リセット時は天井1280あべしに短縮',
    notes: [
      '天井はあべし数で管理（通常時のゲーム数）',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
