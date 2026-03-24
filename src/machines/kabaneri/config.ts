import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'kabaneri',
  name: 'スマスロ 甲鉄城のカバネリ 海門決戦',
  version: '1.2.0',
  color: 'bg-gradient-to-r from-purple-900 to-indigo-900',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: 'ボーナス初当たり回数', hint: 'EP+駿城合算' },
            { key: 'stCnt', label: 'ST回数', hint: '全ST種合算' },
            { key: 'bellCnt', label: '下段ベル回数' },
            { key: 'p3Bonus', label: '3周期目ボーナス当選数' },
            { key: 'p3Total', label: '3周期目到達数' },
          ],
        },
      ],
    },
    {
      title: '演出系データ', icon: '🎬',
      groups: [
        {
          label: '逆押しカットインボイス', columns: 3,
          fields: [
            { key: 'v_none', label: '未発生', hint: '設定5以上濃厚!' },
            { key: 'v_male', label: '男性ボイス', hint: '奇数設定示唆' },
            { key: 'v_female', label: '女性ボイス', hint: '偶数設定示唆' },
            { key: 'v_kage', label: '景之ボイス', hint: '高設定示唆' },
            { key: 'v_nana', label: '無名特殊ボイス', hint: '設定2以上濃厚' },
          ],
        },
        {
          label: 'キャラ紹介（カバネリボーナス中）', columns: 3,
          fields: [
            { key: 'c_female', label: '女性多め', hint: '偶数設定示唆' },
            { key: 'c_male', label: '男性多め', hint: '奇数設定示唆' },
            { key: 'c_bima', label: '美馬出現', hint: '設定4以上濃厚!' },
          ],
        },
        {
          label: 'ゾロ目上乗せ', columns: 4,
          fields: [
            { key: 'zoro44', label: '+44枚', hint: '設定4以上濃厚' },
            { key: 'zoro55', label: '+55枚', hint: '設定5以上濃厚' },
            { key: 'zoro66', label: '+66枚', hint: '設定6濃厚!' },
            { key: 'zoro77', label: '+77枚', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: 'ST終了画面・特定枚数・トロフィー', icon: '🖼️',
      groups: [
        {
          label: 'ST終了画面', columns: 3,
          fields: [
            { key: 'e_normal', label: '鉄下駄（通常）', hint: 'デフォルト' },
            { key: 'e_all', label: '全員集合', hint: '高設定示唆' },
            { key: 'e_mizugi', label: '水着画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '特定枚数到達示唆', columns: 4,
          fields: [
            { key: 'm456_hit', label: '456 OVER あり', hint: '設定4以上濃厚' },
            { key: 'm456_none', label: '456 OVER なし' },
            { key: 'm666_hit', label: '666 OVER あり', hint: '設定6濃厚!' },
            { key: 'm666_none', label: '666 OVER なし' },
          ],
        },
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6確定!!' },
          ],
        },
      ],
    },
    {
      title: 'その他', icon: '📋',
      groups: [
        {
          label: '駿城ボーナス中・単チャンス目', columns: 2,
          fields: [
            { key: 's3k_hit', label: '3000pt獲得', hint: '高設定ほど高い' },
            { key: 's3k_none', label: '3000pt以外' },
          ],
        },
        {
          label: 'アイテムくじ', columns: 2,
          fields: [
            { key: 'bow_hit', label: '菖蒲の弓', hint: '高設定示唆(設定6≒15%)' },
            { key: 'bow_none', label: '菖蒲の弓以外' },
          ],
        },
        {
          label: 'サブ液晶おみくじ', columns: 3,
          fields: [
            { key: 'omikuji_sho', label: '小吉', hint: '設定2以上濃厚' },
            { key: 'omikuji_chu', label: '中吉', hint: '設定4以上濃厚!' },
            { key: 'omikuji_dai', label: '大吉', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/254.2, 1/242.3, 1/239.6, 1/214.0, 1/203.2, 1/195.1] },
    { key: 'stCnt', totalKey: 'totalG', rates: [1/422.5, 1/405.9, 1/398.7, 1/357.2, 1/332.6, 1/318.5] },
    { key: 'bellCnt', totalKey: 'totalG', rates: [1/121.1, 1/114.4, 1/112.8, 1/106.2, 1/104.2, 1/99.1] },
  ],

  binomialEntries: [
    { hitKey: 'p3Bonus', totalKey: 'p3Total', rates: [0.15, 0.18, 0.22, 0.28, 0.33, 0.40] },
  ],

  categoricalGroups: [
    {
      keys: ['v_none', 'v_male', 'v_female', 'v_kage', 'v_nana'],
      rates: {
        v_none:   [0.00, 0.00, 0.00, 0.00, 0.10, 0.10],
        v_male:   [0.45, 0.32, 0.45, 0.32, 0.28, 0.25],
        v_female: [0.47, 0.56, 0.42, 0.52, 0.42, 0.44],
        v_kage:   [0.08, 0.09, 0.10, 0.11, 0.14, 0.16],
        v_nana:   [0.00, 0.03, 0.03, 0.05, 0.06, 0.05],
      },
    },
    {
      keys: ['c_female', 'c_male', 'c_bima'],
      rates: {
        c_female: [0.50, 0.60, 0.40, 0.58, 0.40, 0.60],
        c_male:   [0.50, 0.40, 0.60, 0.40, 0.58, 0.38],
        c_bima:   [0.00, 0.00, 0.00, 0.02, 0.02, 0.02],
      },
    },
    {
      keys: ['e_normal', 'e_all', 'e_mizugi'],
      rates: {
        e_normal: [0.990, 0.980, 0.970, 0.950, 0.930, 0.895],
        e_all:    [0.010, 0.020, 0.030, 0.050, 0.070, 0.100],
        e_mizugi: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
    {
      keys: ['m456_hit', 'm456_none'],
      rates: {
        m456_hit:  [0.00, 0.00, 0.00, 0.03, 0.03, 0.05],
        m456_none: [1.00, 1.00, 1.00, 0.97, 0.97, 0.95],
      },
    },
    {
      keys: ['m666_hit', 'm666_none'],
      rates: {
        m666_hit:  [0.00, 0.00, 0.00, 0.00, 0.00, 0.03],
        m666_none: [1.00, 1.00, 1.00, 1.00, 1.00, 0.97],
      },
    },
    {
      keys: ['zoro44', 'zoro55', 'zoro66', 'zoro77'],
      rates: {
        zoro44: [0.00, 0.00, 0.00, 0.03, 0.03, 0.04],
        zoro55: [0.00, 0.00, 0.00, 0.00, 0.02, 0.03],
        zoro66: [0.00, 0.00, 0.00, 0.00, 0.00, 0.02],
        zoro77: [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['s3k_hit', 's3k_none'],
      rates: {
        s3k_hit:  [0.012, 0.020, 0.020, 0.021, 0.022, 0.023],
        s3k_none: [0.988, 0.980, 0.980, 0.979, 0.978, 0.977],
      },
    },
    {
      keys: ['bow_hit', 'bow_none'],
      rates: {
        bow_hit:  [0.044, 0.055, 0.065, 0.085, 0.110, 0.155],
        bow_none: [0.956, 0.945, 0.935, 0.915, 0.890, 0.845],
      },
    },
    {
      keys: ['omikuji_sho', 'omikuji_chu', 'omikuji_dai'],
      rates: {
        omikuji_sho: [0.000, 0.030, 0.030, 0.030, 0.030, 0.030],
        omikuji_chu: [0.000, 0.000, 0.000, 0.015, 0.015, 0.020],
        omikuji_dai: [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
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
  ],

  confirmedMin: {
    zoro44: 4, zoro55: 5, zoro66: 6, zoro77: 6,
    m456_hit: 4, m666_hit: 6,
    t_copper: 2, t_silver: 3, t_gold: 4, t_kirin: 5, t_rainbow: 6,
    e_mizugi: 6,
    v_none: 5, v_nana: 2,
    c_bima: 4,
    omikuji_sho: 2, omikuji_chu: 4, omikuji_dai: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if (input.t_rainbow != null && input.t_rainbow >= 1) {
      return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    }
    if (input.e_mizugi != null && input.e_mizugi >= 1) {
      return { message: '設定6がほぼ確定！水着終了画面を確認済み', level: 'high' };
    }
    if (input.m666_hit != null && input.m666_hit >= 1) {
      return { message: '設定6濃厚！666 OVERを確認済み', level: 'high' };
    }
    if ((input.omikuji_dai ?? 0) >= 1) {
      return { message: '設定6濃厚！おみくじ大吉を確認済み', level: 'high' };
    }
    if (cMin >= 5) {
      return { message: `設定${cMin}以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    }
    if (cMin >= 4) {
      return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    }
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
    if (!['v_none','v_male','v_female','v_kage','v_nana'].some(k => (input[k] ?? 0) > 0))
      hints.push('逆押しカットインボイスのデータも記録すると精度が向上します');
    if (!['c_female','c_male','c_bima'].some(k => (input[k] ?? 0) > 0))
      hints.push('キャラ紹介データを入力するとさらに精度が上がります');
    if (!['e_normal','e_all','e_mizugi'].some(k => (input[k] ?? 0) > 0))
      hints.push('ST終了画面を確認して入力してください（水着画面=設定6濃厚）');
    if (!['t_copper','t_silver','t_gold','t_kirin','t_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('サミートロフィーの色を確認してください（虹=設定6確定）');
    return hints;
  },
};

export default config;
