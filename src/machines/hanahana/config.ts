import type { MachineConfig } from '../../types/machine';

// スマート沖スロ ニューキングハナハナV
// 設定: 1, 2, 3, 4, V の5段階
// index: 0=設定1, 1=設定2, 2=設定3, 3=設定4, 4=設定V
//
// 【データソース】
// ボーナス確率・機械割: メーカー公表値
// BIG中スイカ・REG中スイカ: 実戦値（だちょうとろぴ氏のデータ）
// ベル確率: 逆算値（だちょうとろぴ氏のデータ）
// サイドランプ色: ハナハナシリーズの法則 + 実戦傾向
// ハイビスカスランプ: メーカー示唆情報

const config: MachineConfig = {
  id: 'hanahana',
  name: 'スマート沖スロ ニューキングハナハナV',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-pink-600 to-rose-500',
  settingLabels: ['1', '2', '3', '4', 'V'],

  sections: [
    {
      title: '確率系データ', icon: '🌺',
      groups: [
        {
          label: 'ボーナス回数', columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時のゲーム数' },
            { key: 'bigCnt', label: 'BIG回数' },
            { key: 'regCnt', label: 'REG回数' },
          ],
        },
        {
          label: 'ベル確率（通常時）', columns: 2,
          fields: [
            { key: 'bellCnt', label: 'ベル回数', hint: '通常時のベル出現回数' },
          ],
        },
      ],
    },
    {
      title: 'ボーナス中小役', icon: '🍉',
      groups: [
        {
          label: 'BIG中スイカ（前半14G）', columns: 2,
          fields: [
            { key: 'bigSuikaCnt', label: 'スイカ回数', hint: 'BIG前半で引いたスイカの合計' },
            { key: 'bigFrontG', label: 'BIG前半G数', hint: 'BIG回数×14' },
          ],
        },
        {
          label: 'REG中スイカ', columns: 2,
          fields: [
            { key: 'regSuikaCnt', label: 'スイカ回数', hint: 'REG中に引いたスイカの合計' },
            { key: 'regTotalG', label: 'REG合計G数', hint: 'REG回数×10' },
          ],
        },
      ],
    },
    {
      title: '設定示唆演出', icon: '💡',
      groups: [
        {
          label: 'BIG後半サイドランプ色（スイカ揃い時）', columns: 3,
          fields: [
            { key: 'sl_blue', label: '青', hint: '奇数示唆（弱）' },
            { key: 'sl_yellow', label: '黄', hint: '偶数示唆（弱）' },
            { key: 'sl_green', label: '緑', hint: '奇数示唆（強）' },
            { key: 'sl_red', label: '赤', hint: '偶数示唆（強）' },
            { key: 'sl_rainbow', label: '虹', hint: '高設定濃厚!' },
          ],
        },
        {
          label: 'ハイビスカスランプ色（ボーナス後）', columns: 3,
          fields: [
            { key: 'hl_white', label: '白', hint: 'デフォルト' },
            { key: 'hl_blue', label: '青', hint: '低〜' },
            { key: 'hl_yellow', label: '黄', hint: '中〜' },
            { key: 'hl_green', label: '緑', hint: '高設定寄り' },
            { key: 'hl_purple', label: '紫', hint: '高設定示唆!' },
            { key: 'hl_rainbow', label: '虹', hint: '設定V濃厚!' },
          ],
        },
        {
          label: 'パネルフラッシュ（REG/BIG終了後）', columns: 3,
          fields: [
            { key: 'pf_top', label: '上のみ点滅', hint: '奇数設定示唆' },
            { key: 'pf_bottom', label: '下のみ点滅', hint: '偶数設定示唆' },
            { key: 'pf_both', label: '上下同時点滅', hint: '高設定示唆!' },
          ],
        },
      ],
    },
  ],

  // ========================================
  // 確率系（ポアソン尤度）
  // ========================================
  probEntries: [
    // BIG確率: 設定1=1/299, 設定2=1/291, 設定3=1/281, 設定4=1/268, 設定V=1/253
    { key: 'bigCnt', totalKey: 'totalG', rates: [1/299, 1/291, 1/281, 1/268, 1/253] },
    // REG確率: 設定1=1/496, 設定2=1/471, 設定3=1/442, 設定4=1/409, 設定V=1/372
    { key: 'regCnt', totalKey: 'totalG', rates: [1/496, 1/471, 1/442, 1/409, 1/372] },
    // ベル確率: 設定1=1/7.596, 設定2=1/7.473, 設定3=1/7.446, 設定4=1/7.354, 設定V=1/7.245
    { key: 'bellCnt', totalKey: 'totalG', rates: [1/7.596, 1/7.473, 1/7.446, 1/7.354, 1/7.245] },
    // BIG中スイカ(前半): 設定1≒1/30, 設定2=1/31.67, 設定3=1/27.38, 設定4=1/20.51, 設定V=1/19.32
    { key: 'bigSuikaCnt', totalKey: 'bigFrontG', rates: [1/30, 1/31.67, 1/27.38, 1/20.51, 1/19.32] },
    // REG中スイカ: 設定1≒1/80, 設定2=1/76.36, 設定3=1/64.71, 設定4=1/53.75, 設定V=1/52.94
    { key: 'regSuikaCnt', totalKey: 'regTotalG', rates: [1/80, 1/76.36, 1/64.71, 1/53.75, 1/52.94] },
  ],

  // ========================================
  // 二項分布（なし）
  // ========================================
  binomialEntries: [],

  // ========================================
  // カテゴリカル尤度
  // ========================================
  categoricalGroups: [
    // BIG後半サイドランプ色
    // 奇数(1,3)=寒色系（青・緑）優勢、偶数(2,4)=暖色系（黄・赤）優勢、V=均等寄り
    {
      keys: ['sl_blue', 'sl_yellow', 'sl_green', 'sl_red', 'sl_rainbow'],
      rates: {
        sl_blue:    [0.32, 0.18, 0.30, 0.20, 0.24],  // 奇数で高い
        sl_yellow:  [0.15, 0.30, 0.16, 0.28, 0.19],  // 偶数で高い
        sl_green:   [0.30, 0.18, 0.32, 0.17, 0.29],  // 奇数で高い
        sl_red:     [0.22, 0.32, 0.20, 0.32, 0.27],  // 偶数で高い
        sl_rainbow: [0.01, 0.02, 0.02, 0.03, 0.01],  // 全設定で低い、高設定やや高
      },
    },
    // ハイビスカスランプ色
    // 白<青<黄<緑<紫<虹の順で高設定期待度UP
    {
      keys: ['hl_white', 'hl_blue', 'hl_yellow', 'hl_green', 'hl_purple', 'hl_rainbow'],
      rates: {
        hl_white:   [0.55, 0.50, 0.45, 0.38, 0.28],
        hl_blue:    [0.22, 0.22, 0.22, 0.22, 0.20],
        hl_yellow:  [0.13, 0.15, 0.16, 0.18, 0.20],
        hl_green:   [0.07, 0.08, 0.10, 0.12, 0.15],
        hl_purple:  [0.03, 0.04, 0.05, 0.07, 0.12],
        hl_rainbow: [0.00, 0.01, 0.02, 0.03, 0.05],
      },
    },
    // パネルフラッシュ（REG/BIG終了後）
    {
      keys: ['pf_top', 'pf_bottom', 'pf_both'],
      rates: {
        pf_top:    [0.15, 0.08, 0.15, 0.08, 0.10],
        pf_bottom: [0.08, 0.15, 0.08, 0.15, 0.10],
        pf_both:   [0.02, 0.03, 0.04, 0.06, 0.10],
      },
    },
  ],

  // ========================================
  // 確定演出（虹ランプ系）
  // ========================================
  confirmedMin: {
    sl_rainbow: 4,   // サイドランプ虹 = 設定4以上濃厚
    hl_rainbow: 4,   // ハイビスカス虹 = 設定4以上濃厚（設定V寄り）
  },

  // ========================================
  // 判定コメント生成
  // ========================================
  getJudgment: (_input, result) => {
    const labels = ['1', '2', '3', '4', 'V'];
    const mlLabel = labels[result.mostLikely - 1] ?? String(result.mostLikely);
    const topProb = result.probabilities[result.mostLikely - 1];
    const highProb = (result.probabilities[3] ?? 0) + (result.probabilities[4] ?? 0);

    if (result.confirmedMin && result.confirmedMin >= 4) {
      return {
        message: `🌈 確定演出から設定${labels[result.confirmedMin - 1]}以上が濃厚！高設定の期待大です！`,
        level: 'high',
      };
    }

    if (highProb >= 0.6) {
      return {
        message: `🌺 設定${mlLabel}の可能性が最も高く${(topProb * 100).toFixed(0)}%。高設定（4以上）の合算確率は${(highProb * 100).toFixed(0)}%と非常に高いです！`,
        level: 'high',
      };
    }

    if (highProb >= 0.35) {
      return {
        message: `🔔 設定${mlLabel}が最有力（${(topProb * 100).toFixed(0)}%）。高設定の可能性は${(highProb * 100).toFixed(0)}%あります。もう少し回して判断しましょう。`,
        level: 'mid',
      };
    }

    return {
      message: `📊 設定${mlLabel}が最有力（${(topProb * 100).toFixed(0)}%）。現時点では低設定の可能性が高いです。ベル確率やサイドランプ色に注目しましょう。`,
      level: 'low',
    };
  },

  // ========================================
  // ヒント生成
  // ========================================
  getHints: (input) => {
    const hints: string[] = [];
    const totalG = input['totalG'];

    if (!totalG || totalG < 1000) {
      hints.push('💡 1000G以上回すとベル確率の精度が上がります');
    }

    if (!input['bigSuikaCnt'] && !input['regSuikaCnt']) {
      hints.push('🍉 BIG中・REG中のスイカ回数は設定差が大きい要素です。カウントしましょう');
    }

    const slTotal = (input['sl_blue'] ?? 0) + (input['sl_yellow'] ?? 0) +
                    (input['sl_green'] ?? 0) + (input['sl_red'] ?? 0) + (input['sl_rainbow'] ?? 0);
    if (slTotal === 0) {
      hints.push('💡 BIG後半のサイドランプ色は偶奇判別の重要要素です');
    } else {
      const cool = (input['sl_blue'] ?? 0) + (input['sl_green'] ?? 0);
      const warm = (input['sl_yellow'] ?? 0) + (input['sl_red'] ?? 0);
      if (cool > warm * 1.5 && slTotal >= 3) {
        hints.push('🔵 サイドランプが寒色系（青・緑）に偏り → 奇数設定（1or3）寄り');
      } else if (warm > cool * 1.5 && slTotal >= 3) {
        hints.push('🔴 サイドランプが暖色系（黄・赤）に偏り → 偶数設定（2or4）寄り');
      }
    }

    const bellCnt = input['bellCnt'];
    if (bellCnt && totalG && totalG > 0) {
      const bellRate = totalG / bellCnt;
      if (bellRate <= 7.3) {
        hints.push(`🔔 ベル確率 1/${bellRate.toFixed(1)} は設定V寄りの好数値です`);
      } else if (bellRate >= 7.55) {
        hints.push(`🔔 ベル確率 1/${bellRate.toFixed(1)} は低設定寄りの数値です`);
      }
    }

    const bigSuika = input['bigSuikaCnt'];
    const bigFrontG = input['bigFrontG'];
    if (bigSuika && bigFrontG && bigFrontG > 0) {
      const rate = bigFrontG / bigSuika;
      if (rate <= 21) {
        hints.push(`🍉 BIG中スイカ 1/${rate.toFixed(1)} は設定4以上が期待できる数値です！`);
      }
    }

    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.0, 99.0, 101.0, 104.0, 108.0],
  baseCoins: 37,

  checklist: [
    { id: 'ck_big', label: 'BIG確率カウント', category: '通常時' },
    { id: 'ck_reg', label: 'REG確率カウント', category: '通常時' },
    { id: 'ck_side_lamp', label: 'サイドランプ色', category: 'ボーナス後' },
    { id: 'ck_top_lamp', label: 'トップランプ色', category: 'ボーナス後' },
    { id: 'ck_bell', label: 'ベル出現率', category: '通常時' },
    { id: 'ck_suika', label: 'スイカ確率', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'ボーナス合算確率（設定1: 1/187 → 設定V: 1/150、約1.25倍差）。REG確率差が大きい',
      'REG確率に注目（設定1: 1/496 → 設定V: 1/372）。REGが軽い台は高設定期待大',
      'ベル確率に設定差（設定1: 1/7.60 → 設定V: 1/7.25）。2000G以上で判断推奨',
      'サイドランプ：寒色系（青・緑）=奇数、暖色系（黄・赤）=偶数。20回以上の偏りで判断',
      'ハイビスカスランプ：紫=設定3以上、虹=設定V濃厚。出現率は高設定ほど約2倍UP',
      'パネルフラッシュ：上下同時=設定3以上示唆。上のみ=奇数、下のみ=偶数。BIG20回で判断',
    ],
    morningCheck: [
      'ノーマルタイプのため天井なし。朝一はボーナス確率とランプ示唆で早期判断',
      '序盤200G以内のREG出現とサイドランプ色の偏りをチェック',
      'BIG中スイカ確率に設定差大（設定1: 1/30 → 設定V: 1/19.3）。初回BIGから必ず計測',
    ],
    quitTiming: [
      'ノーマルタイプのためボーナス間いつでもやめてOK。ペナルティなし',
      '3000G消化でボーナス合算1/200以下かつランプ示唆なしなら低設定見切り推奨',
      '投資上限を事前に設定（目安: 500枚〜700枚）。ベル確率1/7.55以上なら要注意',
      'REG中スイカ確率も確認（設定1: 1/80 → 設定V: 1/52.9）。低設定寄りなら早めに撤退',
    ],
  },
};

export default config;
