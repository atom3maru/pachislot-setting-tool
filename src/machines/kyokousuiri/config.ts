import type { MachineConfig } from '../../types/machine';

// L虚構推理
// 新台のため解析データは限定的。ボーナス初当たり・CZ確率に設定差あり。
// 天井1000G、リセット時700G。ダイナマイトトロフィーによる設定示唆。

const config: MachineConfig = {
  id: 'kyokousuiri',
  name: 'L虚構推理',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-indigo-600 to-purple-600',

  sections: [
    {
      title: '確率系データ', icon: '🔍',
      groups: [{
        columns: 2,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時合算' },
          { key: 'bonusCnt', label: 'ボーナス初当たり回数' },
          { key: 'czCnt', label: 'CZ当選回数' },
          { key: 'czTotal', label: 'CZ判定回数', hint: 'CZ抽選の総回数' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🏆',
      groups: [
        {
          label: 'ダイナマイトトロフィー', columns: 3,
          fields: [
            { key: 'trophy_bronze', label: '銅', hint: '設定2以上' },
            { key: 'trophy_silver', label: '銀', hint: '設定3以上' },
            { key: 'trophy_gold', label: '金', hint: '設定4以上' },
            { key: 'trophy_kirin', label: 'キリン柄', hint: '設定5以上' },
            { key: 'trophy_rainbow', label: '虹', hint: '設定6確定' },
          ],
        },
        {
          label: '終了画面キャラ', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_kotoko', label: '琴子', hint: '奇数設定示唆' },
            { key: 'end_kuro', label: '九郎', hint: '偶数設定示唆' },
            { key: 'end_saki', label: '紗季', hint: '高設定示唆' },
            { key: 'end_pair', label: '琴子&九郎', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/349.0, 1/341.3, 1/329.3, 1/300.2, 1/279.7, 1/264.8] },
    { key: 'czCnt', totalKey: 'totalG', rates: [1/124.5, 1/121.9, 1/118.6, 1/112.5, 1/107.1, 1/103.5] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['trophy_bronze', 'trophy_silver', 'trophy_gold', 'trophy_kirin', 'trophy_rainbow'],
      rates: {
        trophy_bronze:  [0.000, 0.300, 0.250, 0.200, 0.180, 0.150],
        trophy_silver:  [0.000, 0.000, 0.300, 0.250, 0.200, 0.180],
        trophy_gold:    [0.000, 0.000, 0.000, 0.250, 0.230, 0.200],
        trophy_kirin:   [0.000, 0.000, 0.000, 0.000, 0.200, 0.200],
        trophy_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.150],
      },
    },
    {
      keys: ['end_default', 'end_kotoko', 'end_kuro', 'end_saki', 'end_pair', 'end_special'],
      rates: {
        end_default: [0.700, 0.650, 0.680, 0.600, 0.610, 0.500],
        end_kotoko:  [0.150, 0.100, 0.140, 0.100, 0.120, 0.100],
        end_kuro:    [0.100, 0.170, 0.100, 0.180, 0.100, 0.190],
        end_saki:    [0.050, 0.060, 0.060, 0.070, 0.090, 0.100],
        end_pair:    [0.000, 0.000, 0.000, 0.030, 0.050, 0.070],
        end_special: [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
  ],

  confirmedMin: {
    trophy_bronze: 2,
    trophy_silver: 3,
    trophy_gold: 4,
    trophy_kirin: 5,
    trophy_rainbow: 6,
    end_pair: 4,
    end_special: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.trophy_rainbow ?? 0) >= 1) return { message: '設定6確定！虹トロフィーを確認済み', level: 'high' };
    if ((input.end_special ?? 0) >= 1) return { message: '設定6濃厚！特殊画面を確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定5以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };

    const p56 = p[4] + p[5];
    if (p56 > 0.50) return { message: `高設定濃厚！（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.60) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）※新台のため解析データ限定的`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると精度が上がります');
    if (input.bonusCnt == null) hints.push('ボーナス初当たり回数は重要な設定差要素です');
    if (input.czCnt == null) hints.push('CZ当選回数にも設定差があります');
    if (!['trophy_bronze','trophy_silver','trophy_gold','trophy_kirin','trophy_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('ダイナマイトトロフィーを確認してください（銅=設定2以上〜虹=設定6確定）');
    hints.push('※ 新台のため解析データは限定的です。データが公開され次第更新します');
    return hints;
  },

  payoutRates: [97.7, 98.7, 100.8, 105.5, 109.1, 112.0],
  baseCoins: 33,

  checklist: [
    { id: 'ck_bonus_freq', label: 'ボーナス初当たり頻度確認', category: '通常時' },
    { id: 'ck_cz_freq', label: 'CZ当選頻度確認', category: '通常時' },
    { id: 'ck_trophy', label: 'ダイナマイトトロフィー確認', category: 'AT終了時' },
    { id: 'ck_end_screen', label: '終了画面キャラ確認', category: 'AT終了時' },
  ],

  guide: {
    settingHunt: [
      'ボーナス初当たり確率に大きな設定差（設定1: 1/349 → 設定6: 1/264.8）',
      'CZ確率にも設定差あり（設定1: 1/124.5 → 設定6: 1/103.5）',
      'ダイナマイトトロフィー：銅=設定2以上、銀=設定3以上、金=設定4以上、キリン柄=設定5以上、虹=設定6確定',
      '終了画面キャラ：琴子&九郎=設定4以上確定、特殊画面=設定6濃厚',
    ],
    morningCheck: [
      '天井は1000G。リセット時は700Gに短縮',
      'リセット後700G天井で期待値プラス',
      'ボーナス初当たりが250G以内に集中するなら高設定の期待大',
    ],
    quitTiming: [
      'AT終了後は即やめ推奨（有利区間リセット確認後）',
      'ボーナス確率が1/370を超えていれば低設定見切り検討',
      '天井1000Gに近い場合（700G以上）は打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 1000,
    ceilingBenefit: '1000G到達でボーナス確定',
    zones: [
      { start: 500, end: 600, label: '前兆発生ゾーン', strength: 'warm' },
      { start: 800, end: 1000, label: '天井接近ゾーン', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1600, note: '等価' },
      { fromGame: 200, expectedYen: -1000 },
      { fromGame: 400, expectedYen: -200 },
      { fromGame: 500, expectedYen: 300, note: 'ボーダー付近' },
      { fromGame: 700, expectedYen: 1500, note: '狙い目' },
      { fromGame: 850, expectedYen: 3000, note: '天井狙い' },
    ],
    resetInfo: 'リセット時は天井700Gに短縮。朝一リセット狙い有効',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
      '新台のため解析値は推定を含む',
    ],
  },

  dictionary: [
    { keyword: 'ボーナス初当たり', name: 'ボーナス初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/349.0 → 設定6: 1/264.8', importance: 'strong' },
    { keyword: 'CZ確率', name: 'CZ当選確率', timing: '終日カウント', settingHint: '設定1: 1/124.5 → 設定6: 1/103.5', importance: 'strong' },
    { keyword: '銅トロフィー', name: 'ダイナマイトトロフィー（銅）', timing: 'AT終了時', settingHint: '設定2以上確定', importance: 'confirmed' },
    { keyword: '銀トロフィー', name: 'ダイナマイトトロフィー（銀）', timing: 'AT終了時', settingHint: '設定3以上確定', importance: 'confirmed' },
    { keyword: '金トロフィー', name: 'ダイナマイトトロフィー（金）', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'キリン柄トロフィー', name: 'ダイナマイトトロフィー（キリン柄）', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: '虹トロフィー', name: 'ダイナマイトトロフィー（虹）', timing: 'AT終了時', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: '琴子&九郎', name: '終了画面（琴子&九郎）', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '特殊画面', name: '終了画面（特殊画面）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '琴子画面', name: '終了画面（琴子）', timing: 'AT終了時', settingHint: '奇数設定示唆', importance: 'weak' },
    { keyword: '九郎画面', name: '終了画面（九郎）', timing: 'AT終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: '紗季画面', name: '終了画面（紗季）', timing: 'AT終了時', settingHint: '高設定示唆', importance: 'strong' },
  ],
};

export default config;
