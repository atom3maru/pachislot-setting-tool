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

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.5, 99.0, 101.6, 105.6, 110.3, 114.9],
  baseCoins: 31,

  checklist: [
    { id: 'ck_at_end', label: 'AT終了画面', category: 'AT終了時' },
    { id: 'ck_superhigh', label: '超高確保証G数', category: 'AT中' },
    { id: 'ck_cherry_cz', label: '弱チェリーCZ当選', category: '通常時' },
    { id: 'ck_pullback', label: '引き戻し回数', category: 'AT終了後' },
    { id: 'ck_invite', label: '招待状テキスト', category: '通常時' },
    { id: 'ck_cz_rate', label: 'CZ成功率', category: 'CZ中' },
    { id: 'ck_medal', label: '獲得枚数表示', category: 'AT中' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率が最重要（設定1: 1/394.4 → 設定6: 1/261.3、約1.51倍差）。設定差が非常に大きい',
      'CZ初当たり確率にも設定差（設定1: 1/262.6 → 設定6: 1/203.7、約1.29倍差）。合わせてカウント',
      '引き戻し率に設定差（設定1: 7.8% → 設定6: 15.2%、約1.95倍差）。AT終了後の引き戻しを記録',
      'AT終了画面：金木&霧嶋=設定4以上、あんていく全員集合=設定6濃厚。毎回スクショ推奨',
      'トロフィー：銅=設定2以上、銀=設定3以上、金=設定4以上、喰柄=設定5以上、虹=設定6確定',
      '招待状テキスト「存分に楽しもう」=設定4以上、「特別な夜を楽しもう」=設定6濃厚',
    ],
    morningCheck: [
      'CZ天井は通常600Gだが、リセット時は200Gに大幅短縮。朝一最大の狙い目',
      'リセット後は150G以内のCZ当選率が約66%。0Gから打っても期待値プラス',
      'AT間天井1200Gも存在。リセット確認後はCZ天井200Gを優先的に狙う',
      'リセット判別は朝一のCZ当選G数で推測。200G以内にCZ到達ならリセット濃厚',
      '前日1000G以上ハマりの据え置き台はAT間天井1200G狙いも有効',
    ],
    quitTiming: [
      'AT終了後3〜5Gの引き戻しゾーンを必ず確認してからやめる。即やめ厳禁',
      '2000G消化でAT初当たり1/400以上かつ確定演出なしなら設定1-2濃厚。やめ推奨',
      '100G以内CZ当選率20%以下＋引き戻し率8%以下が続くなら低設定の可能性大',
      '残りCZ天井100G以内（通常500G〜）なら天井まで消化推奨',
      'リセット後はCZ天井200Gのため、即打ち開始で期待値プラス',
    ],
  },

  hyena: {
    ceilingGame: 1200,
    ceilingBenefit: '1200G到達でAT確定（CZ天井600G、リセット時CZ200G）',
    zones: [
      { start: 0, end: 200, label: 'リセット後CZ天井', strength: 'hot' },
      { start: 550, end: 600, label: 'CZ天井間近', strength: 'warm' },
      { start: 1100, end: 1200, label: 'AT天井間近', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -500 },
      { fromGame: 150, expectedYen: 200, note: 'リセット後CZ天井狙い' },
      { fromGame: 250, expectedYen: 1000 },
      { fromGame: 400, expectedYen: 2000 },
      { fromGame: 600, expectedYen: 3500 },
      { fromGame: 800, expectedYen: 5000 },
      { fromGame: 1000, expectedYen: 8000, note: '天井間近・超期待値' },
    ],
    resetInfo: 'リセット時はCZ天井200Gに短縮',
    notes: [
      'AT間天井1200G・CZ天井600Gの二重天井',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'トロフィー', name: 'トロフィー 虹', timing: 'AT終了時', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'トロフィー 喰柄(特殊)', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'トロフィー 金', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'トロフィー 銀', timing: 'AT終了時', settingHint: '設定3以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'トロフィー 銅', timing: 'AT終了時', settingHint: '設定2以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 あんていく全員集合', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'strong' },
    { keyword: '終了画面', name: 'AT終了画面 金木&霧嶋', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 神代利世', timing: 'AT終了時', settingHint: '設定1否定', importance: 'weak' },
    { keyword: '終了画面', name: 'AT終了画面 鈴屋&篠原', timing: 'AT終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: '終了画面', name: 'AT終了画面 亜門&真戸', timing: 'AT終了時', settingHint: '奇数設定示唆', importance: 'weak' },
    { keyword: '招待状', name: '招待状「特別な夜を楽しもう」', timing: '通常時', settingHint: '設定6濃厚', importance: 'strong' },
    { keyword: '招待状', name: '招待状「存分に楽しもう」', timing: '通常時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '招待状', name: '招待状「偶にはディナーでも」', timing: '通常時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: 'カード', name: 'CZ終了画面カード 有馬貴将', timing: 'CZ終了時', settingHint: '設定6濃厚', importance: 'strong' },
    { keyword: 'カード', name: 'CZ終了画面カード 梟', timing: 'CZ終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'カード', name: 'CZ終了画面カード 鈴屋什造', timing: 'CZ終了時', settingHint: '偶数設定濃厚', importance: 'weak' },
    { keyword: 'エンディング', name: 'エンディングカード 虹(有馬)', timing: 'エンディング時', settingHint: '設定6濃厚', importance: 'strong' },
    { keyword: 'エンディング', name: 'エンディングカード 金(隻眼の梟)', timing: 'エンディング時', settingHint: '設定5以上濃厚', importance: 'strong' },
    { keyword: 'エンディング', name: 'エンディングカード 金(利世)', timing: 'エンディング時', settingHint: '設定4以上濃厚', importance: 'strong' },
    { keyword: 'エンディング', name: 'エンディングカード 銀(金木)', timing: 'エンディング時', settingHint: '設定3以上濃厚', importance: 'strong' },
    { keyword: '枚数', name: '獲得枚数表示 993枚(1000-7)', timing: 'AT中', settingHint: '設定6濃厚', importance: 'strong' },
    { keyword: '枚数', name: '獲得枚数表示 666枚OVER', timing: 'AT中', settingHint: '設定6濃厚', importance: 'strong' },
    { keyword: '枚数', name: '獲得枚数表示 456枚OVER', timing: 'AT中', settingHint: '設定4以上濃厚', importance: 'strong' },
    { keyword: '初当たり', name: 'AT初当たり確率', timing: '通常時', settingHint: '設定1: 1/394.4 → 設定6: 1/261.3（約1.51倍差）', importance: 'weak' },
    { keyword: '引き戻し', name: '引き戻し率', timing: 'AT終了後', settingHint: '設定1: 7.8% → 設定6: 15.2%（約1.95倍差）', importance: 'weak' },
  ],

  gameFlow: {
    nodes: [
      { id: 'normal', label: '通常時', description: 'レア役や規定G数消化でCZ・AT抽選', color: 'blue' },
      { id: 'cz', label: 'レミニセンス（CZ）', description: '通常CZ。AT突入をかけた抽選', color: 'amber' },
      { id: 'upper_cz', label: '大喰いの利世（上位CZ）', description: '上位CZ。高期待度のAT抽選', color: 'purple' },
      { id: 'ep', label: 'エピソードボーナス', description: 'AT直行確定。設定差大（設定6は約2.5倍）', color: 'green' },
      { id: 'at', label: 'AT（喰種覚醒）', description: 'メインAT。押し順ナビで出玉獲得', color: 'red' },
    ],
    edges: [
      { from: 'normal', to: 'cz', label: '規定G数・レア役' },
      { from: 'normal', to: 'upper_cz', label: '上位CZ当選' },
      { from: 'normal', to: 'ep', label: 'エピソードBN当選' },
      { from: 'cz', to: 'at', label: '当選' },
      { from: 'cz', to: 'normal', label: '非当選' },
      { from: 'upper_cz', to: 'at', label: '当選' },
      { from: 'upper_cz', to: 'normal', label: '非当選' },
      { from: 'ep', to: 'at', label: 'AT直行' },
      { from: 'at', to: 'normal', label: '終了（引き戻し3〜5G）' },
    ],
    notes: [
      'CZ天井は通常600G（リセット時200Gに大幅短縮）',
      'AT間天井は1200G',
      'AT終了後3〜5Gは引き戻しゾーン。即ヤメ厳禁',
    ],
  },

  stages: [
    { name: '昼ステージ', color: 'blue', meaning: '基本ステージ。低確滞在示唆', tips: '特に示唆なし。通常の立ち回りでOK' },
    { name: '夕方ステージ', color: 'amber', meaning: '通常〜高確示唆。CZ期待度やや高め', tips: 'レア役成立でCZ当選に期待' },
    { name: '夜ステージ', color: 'purple', meaning: '高確以上示唆。CZ当選率UP', settingHint: '高確移行頻度が高いほど高設定の可能性', tips: 'レア役成立でCZ当選の大チャンス' },
    { name: '東京上空ステージ', color: 'red', meaning: '前兆ステージ。CZまたはAT前兆中', tips: '前兆中のため即ヤメ厳禁' },
    { name: '精神世界ステージ', color: 'green', meaning: '超高確ステージ。レア役でCZ/エピソードBN大チャンス', settingHint: '滞在中のCZ当選率に設定差', tips: '10〜30G滞在。全力でレア役を引きに行く' },
  ],

  playGuide: {
    basicHow: '通常時は左リール枠上〜上段にBARを狙う。中・右リールはフリー打ちでOK',
    reelStops: [
      { name: '弱チェリー', how: '左BAR狙い', stopForm: 'チェリーが左リール角に停止',
        reelPattern: { left: ['空', '空', 'チェ'], center: ['空', '空', '空'], right: ['空', '空', '空'] } },
      { name: '強チェリー', how: '左BAR狙い', stopForm: 'チェリー+中段にボーナス図柄',
        reelPattern: { left: ['空', '空', 'チェ'], center: ['空', '7赤', '空'], right: ['空', '空', '空'] } },
      { name: '確定チェリー', how: '左BAR狙い', stopForm: '左リール中段にBN図柄またはチェリーが停止（1/16384）',
        reelPattern: { left: ['空', 'チェ', '空'], center: ['空', '空', '空'], right: ['空', '空', '空'], highlightLine: 'center' } },
      { name: 'スイカ', how: '左BAR狙い→中BAR目安でスイカ狙い', stopForm: 'スイカが斜めに揃う',
        reelPattern: { left: ['スイカ', '空', '空'], center: ['空', 'スイカ', '空'], right: ['空', '空', 'スイカ'], highlightLine: 'diagonal-down' } },
      { name: 'チャンス目', how: '左BAR狙い', stopForm: 'ベル/リプレイのテンパイハズレ',
        reelPattern: { left: ['空', 'ベル', '空'], center: ['空', 'ベル', '空'], right: ['空', 'リプ', '空'] } },
    ],
    notes: [
      '通常時は左1st推奨',
      'スイカ停止時のみ中リールスイカ狙い。それ以外は適当打ちでOK',
      'AT中はナビに従う',
    ],
  },
};

export default config;
