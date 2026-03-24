import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'ghoul',
  name: 'L 東京喰種',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-gray-900 to-red-900',

  sections: [
    {
      title: '確率系データ', icon: '👁️',
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
      title: 'CZ関連', icon: '🎯',
      groups: [
        {
          label: '100G以内CZ当選', columns: 2,
          fields: [
            { key: 'cz100_hit', label: '100G以内CZ当選回数', hint: '高設定ほど高い' },
            { key: 'cz100_total', label: 'AT終了回数（分母）' },
          ],
        },
        {
          label: '上位CZ「大喰いの利世」', columns: 2,
          fields: [
            { key: 'rize_cnt', label: '利世CZ出現回数', hint: '高設定ほど出やすい' },
          ],
        },
        {
          label: '引き戻し', columns: 2,
          fields: [
            { key: 'pullback_hit', label: '引き戻し回数', hint: '設定1=7.8%, 設定6=15.2%' },
            { key: 'pullback_total', label: 'AT終了回数（分母）' },
          ],
        },
      ],
    },
    {
      title: '設定示唆演出', icon: '🎬',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_fueguchi', label: '笛口親子', hint: '高設定期待度UP(弱)' },
            { key: 'end_shikata', label: '四方&イトリ&ウタ', hint: '高設定期待度UP(強)' },
            { key: 'end_amon', label: '亜門&真戸', hint: '奇数設定示唆' },
            { key: 'end_suzuya', label: '鈴屋&篠原', hint: '偶数設定示唆' },
            { key: 'end_rize', label: '神代利世', hint: '設定1否定' },
            { key: 'end_kaneki_touka', label: '金木&霧嶋', hint: '設定4以上!' },
            { key: 'end_anteiku', label: 'あんていく全員集合', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'トロフィー', columns: 3,
          fields: [
            { key: 'tr_copper', label: '銅', hint: '設定2以上' },
            { key: 'tr_silver', label: '銀', hint: '設定3以上' },
            { key: 'tr_gold', label: '金', hint: '設定4以上' },
            { key: 'tr_ghoul', label: '喰柄(特殊)', hint: '設定5以上!' },
            { key: 'tr_rainbow', label: '虹', hint: '設定6確定!!' },
          ],
        },
        {
          label: '招待状テキスト', columns: 2,
          fields: [
            { key: 'inv_even', label: '偶にはディナーでも', hint: '偶数設定示唆' },
            { key: 'inv_4plus', label: '存分に楽しもう', hint: '設定4以上!' },
            { key: 'inv_6', label: '特別な夜を楽しもう', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'CZ終了画面カード', columns: 3,
          fields: [
            { key: 'card_suzuya', label: '鈴屋什造', hint: '偶数設定濃厚' },
            { key: 'card_owl', label: '梟', hint: '設定4以上!' },
            { key: 'card_arima', label: '有馬貴将', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'エンディングカード（設定確定系）', columns: 3,
          fields: [
            { key: 'ecard_silver', label: '銀カード(金木)', hint: '設定3以上濃厚' },
            { key: 'ecard_gold_rize', label: '金カード(利世)', hint: '設定4以上濃厚!' },
            { key: 'ecard_gold_owl', label: '金カード(隻眼の梟)', hint: '設定5以上濃厚!' },
            { key: 'ecard_rainbow', label: '虹カード(有馬)', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'エンディングカード（否定系・銅）', columns: 3,
          fields: [
            { key: 'ecard_deny1', label: '鈴屋(銅)', hint: '設定1否定' },
            { key: 'ecard_deny2', label: '高槻泉A(銅)', hint: '設定2否定' },
            { key: 'ecard_deny3', label: '高槻泉B(銅)', hint: '設定3否定' },
            { key: 'ecard_deny4', label: 'エト(銅)', hint: '設定4否定' },
          ],
        },
        {
          label: '獲得枚数表示', columns: 3,
          fields: [
            { key: 'medal_456', label: '456枚OVER', hint: '設定4以上濃厚!' },
            { key: 'medal_666', label: '666枚OVER', hint: '設定6濃厚!' },
            { key: 'medal_993', label: '993枚(1000-7)', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: 'エピソードボーナス', icon: '📋',
      groups: [{
        columns: 2,
        fields: [
          { key: 'ep_cnt', label: 'エピソードボーナス回数', hint: '設定6は約2.5倍出やすい' },
        ],
      }],
    },
  ],

  probEntries: [
    { key: 'czCnt', totalKey: 'totalG', rates: [1/262.6, 1/255.6, 1/246.5, 1/233.1, 1/216.4, 1/203.7] },
    { key: 'atCnt', totalKey: 'totalG', rates: [1/394.4, 1/380.5, 1/357.0, 1/325.9, 1/291.2, 1/261.3] },
    { key: 'ep_cnt', totalKey: 'totalG', rates: [1/6620.2, 1/5500, 1/4500, 1/3800, 1/3200, 1/2639.5] },
    { key: 'rize_cnt', totalKey: 'totalG', rates: [1/2079.1, 1/1800, 1/1500, 1/1300, 1/1150, 1/1074.9] },
  ],

  binomialEntries: [
    // 100G以内CZ当選率
    { hitKey: 'cz100_hit', totalKey: 'cz100_total', rates: [0.1958, 0.2200, 0.2500, 0.2800, 0.3200, 0.3601] },
    // 引き戻し当選率
    { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.078, 0.090, 0.100, 0.115, 0.130, 0.152] },
  ],

  categoricalGroups: [
    {
      keys: ['end_default', 'end_fueguchi', 'end_shikata', 'end_amon', 'end_suzuya', 'end_rize', 'end_kaneki_touka', 'end_anteiku'],
      rates: {
        end_default:       [0.500, 0.430, 0.400, 0.350, 0.300, 0.230],
        end_fueguchi:      [0.100, 0.100, 0.110, 0.110, 0.120, 0.130],
        end_shikata:       [0.050, 0.060, 0.070, 0.080, 0.100, 0.120],
        end_amon:          [0.150, 0.080, 0.150, 0.080, 0.130, 0.080],
        end_suzuya:        [0.080, 0.150, 0.080, 0.150, 0.080, 0.150],
        end_rize:          [0.000, 0.050, 0.050, 0.050, 0.050, 0.050],
        end_kaneki_touka:  [0.000, 0.000, 0.000, 0.040, 0.060, 0.080],
        end_anteiku:       [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
    {
      keys: ['tr_copper', 'tr_silver', 'tr_gold', 'tr_ghoul', 'tr_rainbow'],
      rates: {
        tr_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        tr_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        tr_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        tr_ghoul:   [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        tr_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['inv_even', 'inv_4plus', 'inv_6'],
      rates: {
        inv_even:  [0.020, 0.060, 0.020, 0.060, 0.020, 0.060],
        inv_4plus: [0.000, 0.000, 0.000, 0.030, 0.030, 0.040],
        inv_6:     [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
    {
      keys: ['card_suzuya', 'card_owl', 'card_arima'],
      rates: {
        card_suzuya: [0.020, 0.060, 0.020, 0.060, 0.020, 0.060],
        card_owl:    [0.000, 0.000, 0.000, 0.020, 0.020, 0.030],
        card_arima:  [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
    {
      keys: ['ecard_silver', 'ecard_gold_rize', 'ecard_gold_owl', 'ecard_rainbow'],
      rates: {
        ecard_silver:   [0.000, 0.000, 0.020, 0.020, 0.020, 0.020],
        ecard_gold_rize:[0.000, 0.000, 0.000, 0.015, 0.015, 0.015],
        ecard_gold_owl: [0.000, 0.000, 0.000, 0.000, 0.010, 0.010],
        ecard_rainbow:  [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
    {
      keys: ['ecard_deny1', 'ecard_deny2', 'ecard_deny3', 'ecard_deny4'],
      rates: {
        ecard_deny1: [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        ecard_deny2: [0.020, 0.000, 0.020, 0.020, 0.020, 0.020],
        ecard_deny3: [0.020, 0.020, 0.000, 0.020, 0.020, 0.020],
        ecard_deny4: [0.020, 0.020, 0.020, 0.000, 0.020, 0.020],
      },
    },
    {
      keys: ['medal_456', 'medal_666', 'medal_993'],
      rates: {
        medal_456: [0.000, 0.000, 0.000, 0.015, 0.015, 0.020],
        medal_666: [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
        medal_993: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    tr_copper: 2, tr_silver: 3, tr_gold: 4, tr_ghoul: 5, tr_rainbow: 6,
    end_rize: 2, end_kaneki_touka: 4, end_anteiku: 6,
    inv_4plus: 4, inv_6: 6,
    card_owl: 4, card_arima: 6,
    ecard_silver: 3, ecard_gold_rize: 4, ecard_gold_owl: 5, ecard_rainbow: 6,
    ecard_deny1: 2, ecard_deny2: 1, ecard_deny3: 1, ecard_deny4: 1,
    medal_456: 4, medal_666: 6, medal_993: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.tr_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    if ((input.end_anteiku ?? 0) >= 1) return { message: '設定6濃厚！あんていく全員集合を確認済み', level: 'high' };
    if ((input.inv_6 ?? 0) >= 1) return { message: '設定6濃厚！「特別な夜を楽しもう」を確認済み', level: 'high' };
    if ((input.card_arima ?? 0) >= 1) return { message: '設定6濃厚！有馬貴将カードを確認済み', level: 'high' };
    if ((input.ecard_rainbow ?? 0) >= 1) return { message: '設定6濃厚！虹エンディングカードを確認済み', level: 'high' };
    if ((input.medal_666 ?? 0) >= 1 || (input.medal_993 ?? 0) >= 1) return { message: '設定6濃厚！確定枚数表示を確認済み', level: 'high' };
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
    if (input.czCnt == null) hints.push('CZ初当たり回数も設定差が大きいです');
    if (!['end_default','end_fueguchi','end_shikata','end_amon','end_suzuya','end_rize','end_kaneki_touka','end_anteiku'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください（あんていく全員集合=設定6濃厚）');
    if (!['tr_copper','tr_silver','tr_gold','tr_ghoul','tr_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('トロフィーを確認してください（虹=設定6確定）');
    if (!['inv_even','inv_4plus','inv_6'].some(k => (input[k] ?? 0) > 0))
      hints.push('招待状のテキストを確認してください');
    if (!['ecard_silver','ecard_gold_rize','ecard_gold_owl','ecard_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('エンディングカードを確認してください（虹=設定6濃厚）');
    return hints;
  },
};

export default config;
