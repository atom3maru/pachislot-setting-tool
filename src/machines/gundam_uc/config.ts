import type { MachineConfig } from '../../types/machine';

// L機動戦士ガンダムユニコーン 覚醒DRIVE
// 新台のため解析データは限定的。AT初当たり確率に設定差あり。
// 天井CZ800G/AT1400G、リセット時CZ400G/AT1000G。

const config: MachineConfig = {
  id: 'gundam_uc',
  name: 'L機動戦士ガンダムユニコーン 覚醒DRIVE',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-red-700 to-white',

  sections: [
    {
      title: '確率系データ', icon: '🤖',
      groups: [{
        columns: 2,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時合算' },
          { key: 'atCnt', label: 'AT初当たり回数' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🦄',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_banagher', label: 'バナージ', hint: '奇数設定示唆' },
            { key: 'end_mineva', label: 'ミネバ', hint: '偶数設定示唆' },
            { key: 'end_fullarmor', label: 'フルアーマー', hint: '高設定示唆' },
            { key: 'end_unicorn', label: 'ユニコーン覚醒', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/471.9, 1/456.6, 1/427.8, 1/403.9, 1/398.3, 1/392.3] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['end_default', 'end_banagher', 'end_mineva', 'end_fullarmor', 'end_unicorn', 'end_special'],
      rates: {
        end_default:   [0.700, 0.660, 0.680, 0.610, 0.620, 0.510],
        end_banagher:  [0.150, 0.100, 0.140, 0.100, 0.120, 0.100],
        end_mineva:    [0.100, 0.160, 0.100, 0.170, 0.100, 0.190],
        end_fullarmor: [0.050, 0.060, 0.060, 0.070, 0.090, 0.100],
        end_unicorn:   [0.000, 0.000, 0.000, 0.030, 0.040, 0.060],
        end_special:   [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
  ],

  confirmedMin: {
    end_unicorn: 4,
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
    if (!['end_default','end_banagher','end_mineva','end_fullarmor','end_unicorn','end_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください');
    hints.push('※ 新台のため解析データは限定的です。データが公開され次第更新します');
    return hints;
  },

  payoutRates: [97.7, 98.9, 101.0, 105.4, 110.5, 114.9],
  baseCoins: 33,

  checklist: [
    { id: 'ck_at_freq', label: 'AT初当たり頻度確認', category: '通常時' },
    { id: 'ck_end_screen', label: 'AT終了画面種類', category: 'AT終了時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率に設定差あり（設定1: 1/471.9 → 設定6: 1/392.3）',
      'AT終了画面：ユニコーン覚醒=設定4以上確定、特殊画面=設定6濃厚',
      '設定5・6はAT初当たりがほぼ同等（1/398前後）。終了画面での判別が重要',
    ],
    morningCheck: [
      '天井はCZ800G / AT1400G。リセット時はCZ400G / AT1000Gに短縮',
      '朝一リセット狙いはCZ400G天井で期待値プラス',
      'AT初当たりが400G以内に集中するなら高設定の期待大',
    ],
    quitTiming: [
      'AT終了後は即やめ推奨（有利区間リセット確認後）',
      'AT初当たり確率が1/500を超えていれば低設定見切り検討',
      'CZ天井800Gに近い場合は打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 1400,
    ceilingBenefit: 'CZ天井800G / AT天井1400GでAT確定',
    zones: [
      { start: 500, end: 600, label: 'CZ前兆ゾーン', strength: 'warm' },
      { start: 700, end: 800, label: 'CZ天井ゾーン', strength: 'hot' },
      { start: 1100, end: 1400, label: 'AT天井接近ゾーン', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -2000, note: '等価' },
      { fromGame: 200, expectedYen: -1300 },
      { fromGame: 400, expectedYen: -400 },
      { fromGame: 550, expectedYen: 500, note: 'ボーダー付近' },
      { fromGame: 700, expectedYen: 1800, note: 'CZ天井狙い' },
      { fromGame: 900, expectedYen: 3000, note: 'AT天井狙い' },
      { fromGame: 1200, expectedYen: 5000, note: '積極的に狙う' },
    ],
    resetInfo: 'リセット時はCZ天井400G / AT天井1000Gに短縮。朝一リセット狙い有効',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      'CZ天井800GとAT天井1400Gの2段構え',
      'リセット時はCZ400G/AT1000Gに大幅短縮',
      '期待値は設定1・等価換金で計算',
      '新台のため解析値は推定を含む',
    ],
  },

  dictionary: [
    { keyword: 'AT初当たり', name: 'AT初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/471.9 → 設定6: 1/392.3', importance: 'strong' },
    { keyword: 'ユニコーン覚醒', name: 'AT終了画面（ユニコーン覚醒）', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '特殊画面', name: 'AT終了画面（特殊画面）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'バナージ画面', name: 'AT終了画面（バナージ）', timing: 'AT終了時', settingHint: '奇数設定示唆', importance: 'weak' },
    { keyword: 'ミネバ画面', name: 'AT終了画面（ミネバ）', timing: 'AT終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: 'フルアーマー画面', name: 'AT終了画面（フルアーマー）', timing: 'AT終了時', settingHint: '高設定示唆', importance: 'strong' },
  ],
};

export default config;
