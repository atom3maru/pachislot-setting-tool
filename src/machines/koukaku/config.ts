import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'koukaku',
  name: 'スマスロ 攻殻機動隊',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-teal-700 to-emerald-700',

  sections: [
    {
      title: '確率系データ', icon: '🤖',
      groups: [{
        columns: 3,
        fields: [
          { key: 'totalG', label: '総ゲーム数' },
          { key: 'czCnt', label: 'CZ初当たり回数' },
          { key: 'atCnt', label: 'AT初当たり回数', hint: '最重要の設定差' },
        ],
      }],
    },
    {
      title: '殲滅ゾーン', icon: '🎯',
      groups: [{
        columns: 2,
        fields: [
          { key: 'senmetsu_cnt', label: '殲滅ゾーン回数（合算）' },
          { key: 'senmetsu_pt', label: 'うち殲滅ポイント契機', hint: '高設定ほど高い' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🎬',
      groups: [
        {
          label: 'AT/CZ終了画面', columns: 3,
          fields: [
            { key: 'end_motoko', label: '素子（デフォルト）' },
            { key: 'end_motoko_battle', label: '戦闘中素子', hint: '高設定示唆' },
            { key: 'end_togusa', label: 'トグサ', hint: '奇数設定示唆' },
            { key: 'end_batou', label: 'バトー', hint: '偶数設定示唆' },
            { key: 'end_all', label: '全員集合', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
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
          label: 'CZ終了画面', columns: 3,
          fields: [
            { key: 'cz_normal', label: '青空(デフォルト)' },
            { key: 'cz_waraimon', label: '笑い男', hint: '復活期待度50%' },
            { key: 'cz_kouan', label: '公安9課', hint: '設定2以上濃厚' },
            { key: 'cz_bakan', label: 'バカンス', hint: '設定4以上濃厚!' },
            { key: 'cz_zenin', label: '全員集合', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'エンディング中パネル色', columns: 3,
          fields: [
            { key: 'panel_blue', label: '青パネル', hint: '奇数設定示唆' },
            { key: 'panel_yellow', label: '黄パネル', hint: '偶数設定示唆' },
            { key: 'panel_green', label: '緑パネル', hint: '奇数+高設定示唆' },
            { key: 'panel_red', label: '赤パネル', hint: '偶数+高設定示唆' },
            { key: 'panel_purple', label: '紫パネル', hint: '設定2以上濃厚' },
            { key: 'panel_rainbow', label: '虹パネル', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'エンディング中ランプ', columns: 2,
          fields: [
            { key: 'lamp_purple', label: '紫ランプ', hint: '設定2以上濃厚' },
            { key: 'lamp_rainbow', label: '虹ランプ', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: 'その他設定差', icon: '📋',
      groups: [
        {
          label: 'タチコマの家出（AT後200G・400G）', columns: 2,
          fields: [
            { key: 'tachikoma_hit', label: '当選回数', hint: '高設定ほど高い' },
            { key: 'tachikoma_total', label: '到達回数（分母）' },
          ],
        },
        {
          label: '引き戻しストック', columns: 2,
          fields: [
            { key: 'pullback_hit', label: '当選回数', hint: '高設定ほど高い' },
            { key: 'pullback_total', label: 'AT終了回数（分母）' },
          ],
        },
        {
          label: 'S.A.M.エピソード', columns: 2,
          fields: [
            { key: 'sam_same', label: '同一エピソード連続回数', hint: '設定2以上濃厚' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'czCnt', totalKey: 'totalG', rates: [1/238.0, 1/236.3, 1/231.7, 1/220.9, 1/214.0, 1/210.1] },
    { key: 'atCnt', totalKey: 'totalG', rates: [1/336.3, 1/332.0, 1/319.6, 1/298.7, 1/285.8, 1/278.0] },
  ],

  binomialEntries: [
    // タチコマの家出当選率
    { hitKey: 'tachikoma_hit', totalKey: 'tachikoma_total', rates: [0.300, 0.330, 0.360, 0.400, 0.440, 0.483] },
    // 引き戻しストック当選率
    { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.033, 0.045, 0.055, 0.065, 0.080, 0.096] },
    // 殲滅ゾーン中ポイント契機比率
    { hitKey: 'senmetsu_pt', totalKey: 'senmetsu_cnt', rates: [0.20, 0.23, 0.27, 0.32, 0.38, 0.45] },
  ],

  categoricalGroups: [
    {
      keys: ['end_motoko', 'end_motoko_battle', 'end_togusa', 'end_batou', 'end_all', 'end_special'],
      rates: {
        end_motoko:        [0.444, 0.350, 0.400, 0.300, 0.320, 0.231],
        end_motoko_battle: [0.111, 0.150, 0.130, 0.180, 0.170, 0.231],
        end_togusa:        [0.222, 0.100, 0.200, 0.100, 0.180, 0.077],
        end_batou:         [0.111, 0.250, 0.130, 0.250, 0.130, 0.231],
        end_all:           [0.000, 0.000, 0.000, 0.050, 0.060, 0.080],
        end_special:       [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
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
      keys: ['cz_normal', 'cz_waraimon', 'cz_kouan', 'cz_bakan', 'cz_zenin'],
      rates: {
        cz_normal:  [0.850, 0.800, 0.790, 0.730, 0.700, 0.650],
        cz_waraimon:[0.100, 0.110, 0.110, 0.120, 0.120, 0.130],
        cz_kouan:   [0.000, 0.040, 0.040, 0.040, 0.040, 0.040],
        cz_bakan:   [0.000, 0.000, 0.000, 0.040, 0.050, 0.060],
        cz_zenin:   [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
    {
      keys: ['panel_blue', 'panel_yellow', 'panel_green', 'panel_red', 'panel_purple', 'panel_rainbow'],
      rates: {
        panel_blue:    [0.350, 0.200, 0.350, 0.200, 0.300, 0.150],
        panel_yellow:  [0.200, 0.350, 0.200, 0.350, 0.200, 0.300],
        panel_green:   [0.150, 0.050, 0.150, 0.050, 0.150, 0.080],
        panel_red:     [0.050, 0.150, 0.050, 0.150, 0.050, 0.150],
        panel_purple:  [0.000, 0.050, 0.050, 0.050, 0.050, 0.050],
        panel_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
    {
      keys: ['lamp_purple', 'lamp_rainbow'],
      rates: {
        lamp_purple:  [0.000, 0.030, 0.030, 0.030, 0.030, 0.030],
        lamp_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
    {
      keys: ['sam_same'],
      rates: {
        sam_same: [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
      },
    },
  ],

  confirmedMin: {
    tr_copper: 2, tr_silver: 3, tr_gold: 4, tr_kirin: 5, tr_rainbow: 6,
    lamp_purple: 2, lamp_rainbow: 6,
    end_all: 4, end_special: 6,
    sam_same: 2,
    cz_kouan: 2, cz_bakan: 4, cz_zenin: 6,
    panel_purple: 2, panel_rainbow: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.tr_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    if ((input.cz_zenin ?? 0) >= 1 || (input.panel_rainbow ?? 0) >= 1) return { message: '設定6濃厚！確定演出を確認済み', level: 'high' };
    if ((input.lamp_rainbow ?? 0) >= 1 || (input.end_special ?? 0) >= 1) return { message: '設定6濃厚！確定演出を確認済み', level: 'high' };
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
    if (!['end_motoko','end_motoko_battle','end_togusa','end_batou','end_all','end_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT/CZ終了画面を確認してください');
    if (!['tr_copper','tr_silver','tr_gold','tr_kirin','tr_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーの色を確認してください');
    if (!['cz_normal','cz_waraimon','cz_kouan','cz_bakan','cz_zenin'].some(k => (input[k] ?? 0) > 0))
      hints.push('CZ終了画面を確認してください（全員集合=設定6濃厚）');
    if (!['panel_blue','panel_yellow','panel_green','panel_red','panel_purple','panel_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('エンディング中のパネル色を確認してください（虹=設定6濃厚）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.9, 98.7, 100.8, 104.9, 109.3, 112.2],
  baseCoins: 32,

  checklist: [
    { id: 'ck_trophy', label: 'トロフィー色', category: 'AT終了時' },
    { id: 'ck_push', label: '隠しPUSH画面', category: 'AT終了時' },
    { id: 'ck_ed_lamp', label: 'エンディングランプ色', category: 'エンディング中' },
    { id: 'ck_cz_flag', label: 'CZ視覚フラグ', category: '通常時' },
    { id: 'ck_tachikoma', label: '200G400Gタチコマ家出', category: '通常時' },
    { id: 'ck_episode', label: 'エピソード重複確認', category: 'AT中' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率が最重要（設定1: 1/336.3 → 設定6: 1/278.0、約1.21倍差）',
      'CZ初当たり確率（設定1: 1/238.0 → 設定6: 1/210.1、約1.13倍差）',
      'サミートロフィー：銅=設定2以上、銀=設定3以上、金=設定4以上、キリン柄=設定5以上、虹=設定6確定',
      'AT/CZ終了画面：全員集合=設定4以上、特殊画面=設定6濃厚',
      'CZ終了画面：公安9課=設定2以上、バカンス=設定4以上、全員集合=設定6濃厚',
      'エンディングランプ：紫=設定2以上、虹=設定6濃厚。パネル虹=設定6濃厚',
    ],
    morningCheck: [
      'リセット時はCZ天井550G→350G、AT天井999G→699Gに短縮',
      'リセット後200GでタチコマCZ当選率約50%。0Gから期待値プラス',
      '殲滅テーブル2以上が確定するため、リセット台は積極的に狙える',
      'AT終了後のモード示唆を確認。通常D滞在率約50%のため要チェック',
    ],
    quitTiming: [
      'AT終了後はモード示唆・トロフィー・終了画面を確認してからやめ',
      '200G・400GのタチコマCZ当選ポイント付近なら到達まで続行',
      'CZ天井残り100G以内（通常450G〜/リセット250G〜）なら打ち切り推奨',
      '3000G時点でAT初当たり1/320以上なら低設定濃厚。見切り推奨',
      '白の境界失敗後は天井400G+αに短縮。必ず打ち切る',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: '999G到達でAT確定（CZ天井550G、リセット時CZ350G/AT699G）',
    zones: [
      { start: 200, end: 200, label: 'タチコマ家出CZ', strength: 'warm' },
      { start: 400, end: 400, label: 'タチコマ家出CZ', strength: 'warm' },
      { start: 900, end: 999, label: '天井間近', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000 },
      { fromGame: 200, expectedYen: -200 },
      { fromGame: 350, expectedYen: 500, note: 'CZ天井狙い目' },
      { fromGame: 550, expectedYen: 1000 },
      { fromGame: 700, expectedYen: 2500 },
      { fromGame: 900, expectedYen: 5000, note: '天井間近・高期待値' },
    ],
    resetInfo: 'リセット時はCZ天井350G・AT天井699Gに短縮',
    notes: [
      'AT天井999G・CZ天井550Gの二重天井',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
