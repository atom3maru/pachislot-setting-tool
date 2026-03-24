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
};

export default config;
