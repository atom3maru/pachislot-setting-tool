import type { MachineConfig } from '../../types/machine';

// スマスロ ヨルムンガンド
// 新台のため解析データは限定的。AT初当たり確率に設定差あり。
// 天井999G、リセット時450G短縮。

const config: MachineConfig = {
  id: 'jormungand',
  name: 'スマスロ ヨルムンガンド',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-gray-700 to-blue-800',

  sections: [
    {
      title: '確率系データ', icon: '🔫',
      groups: [{
        columns: 2,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時合算' },
          { key: 'atCnt', label: 'AT初当たり回数' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🎖️',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_koko', label: 'ココ', hint: '奇数設定示唆' },
            { key: 'end_valmet', label: 'バルメ', hint: '偶数設定示唆' },
            { key: 'end_jonah', label: 'ヨナ', hint: '高設定示唆' },
            { key: 'end_all', label: '全員集合', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/333.8, 1/323.3, 1/305.4, 1/291.6, 1/291.1, 1/290.1] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['end_default', 'end_koko', 'end_valmet', 'end_jonah', 'end_all', 'end_special'],
      rates: {
        end_default: [0.700, 0.660, 0.680, 0.610, 0.620, 0.510],
        end_koko:    [0.150, 0.100, 0.140, 0.100, 0.120, 0.100],
        end_valmet:  [0.100, 0.160, 0.100, 0.170, 0.100, 0.190],
        end_jonah:   [0.050, 0.060, 0.060, 0.070, 0.090, 0.100],
        end_all:     [0.000, 0.000, 0.000, 0.030, 0.040, 0.060],
        end_special: [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
  ],

  confirmedMin: {
    end_all: 4,
    end_special: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.end_special ?? 0) >= 1) return { message: '設定6濃厚！特殊画面を確認済み', level: 'high' };
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
    if (input.atCnt == null) hints.push('AT初当たり回数は最重要の設定差要素です');
    if (!['end_default','end_koko','end_valmet','end_jonah','end_all','end_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください');
    hints.push('※ 新台のため解析データは限定的です。データが公開され次第更新します');
    return hints;
  },

  payoutRates: [97.8, 98.8, 100.9, 104.7, 109.6, 113.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_at_freq', label: 'AT初当たり頻度確認', category: '通常時' },
    { id: 'ck_end_screen', label: 'AT終了画面種類', category: 'AT終了時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率に設定差あり（設定1: 1/333.8 → 設定6: 1/290.1）',
      'AT終了画面：全員集合=設定4以上確定、特殊画面=設定6濃厚',
      '設定5・6はAT初当たりがほぼ同等（1/291前後）。終了画面での判別が重要',
    ],
    morningCheck: [
      '天井は999G。リセット時は450Gに短縮',
      '朝一リセット狙いは450G天井で期待値プラス',
      'AT初当たりが300G以内に集中するなら高設定の期待大',
    ],
    quitTiming: [
      'AT終了後は即やめ推奨（有利区間リセット確認後）',
      'AT初当たり確率が1/350を超えていれば低設定見切り検討',
      '天井999Gに近い場合は打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: '999G到達でAT確定',
    zones: [
      { start: 600, end: 700, label: '前兆発生ゾーン', strength: 'warm' },
      { start: 800, end: 999, label: '天井接近ゾーン', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1500, note: '等価' },
      { fromGame: 200, expectedYen: -800 },
      { fromGame: 400, expectedYen: 100, note: 'ボーダー付近' },
      { fromGame: 600, expectedYen: 1200, note: '狙い目' },
      { fromGame: 800, expectedYen: 3000, note: '天井狙い' },
    ],
    resetInfo: 'リセット時は天井450Gに短縮。朝一リセット狙い有効',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
      '新台のため解析値は推定を含む',
    ],
  },

  dictionary: [
    { keyword: 'AT初当たり', name: 'AT初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/333.8 → 設定6: 1/290.1', importance: 'strong' },
    { keyword: '全員集合', name: 'AT終了画面（全員集合）', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '特殊画面', name: 'AT終了画面（特殊画面）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'ココ画面', name: 'AT終了画面（ココ）', timing: 'AT終了時', settingHint: '奇数設定示唆', importance: 'weak' },
    { keyword: 'バルメ画面', name: 'AT終了画面（バルメ）', timing: 'AT終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: 'ヨナ画面', name: 'AT終了画面（ヨナ）', timing: 'AT終了時', settingHint: '高設定示唆', importance: 'strong' },
  ],
};

export default config;
