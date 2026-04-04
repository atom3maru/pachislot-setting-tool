import type { MachineConfig } from '../../types/machine';

// 真打 吉宗
// 新台のため解析データは限定的。AT初当たり確率に大きな設定差。
// 天井CZ1000G/AT1500G。獲得枚数456/555/666による設定示唆。

const config: MachineConfig = {
  id: 'yoshimune',
  name: '真打 吉宗',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-amber-700 to-yellow-500',

  sections: [
    {
      title: '確率系データ', icon: '🏯',
      groups: [{
        columns: 2,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時合算' },
          { key: 'atCnt', label: 'AT初当たり回数' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🎴',
      groups: [
        {
          label: '獲得枚数表示', columns: 3,
          fields: [
            { key: 'medal_456', label: '456枚表示', hint: '設定4以上!?' },
            { key: 'medal_555', label: '555枚表示', hint: '設定5以上!?' },
            { key: 'medal_666', label: '666枚表示', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_yoshimune', label: '吉宗', hint: '高設定示唆' },
            { key: 'end_princess', label: '姫', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '御白洲ビジョン', columns: 2,
          fields: [
            { key: 'vision_high', label: '高設定示唆パターン', hint: '高設定示唆' },
            { key: 'vision_confirmed', label: '確定パターン', hint: '設定4以上確定' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/488.9, 1/471.5, 1/438.5, 1/398.1, 1/377.0, 1/354.9] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['end_default', 'end_yoshimune', 'end_princess', 'end_special'],
      rates: {
        end_default:   [0.750, 0.720, 0.700, 0.650, 0.630, 0.550],
        end_yoshimune: [0.200, 0.200, 0.200, 0.200, 0.200, 0.250],
        end_princess:  [0.000, 0.000, 0.000, 0.100, 0.120, 0.150],
        end_special:   [0.000, 0.000, 0.000, 0.000, 0.000, 0.030],
      },
    },
  ],

  confirmedMin: {
    medal_456: 4,
    medal_555: 5,
    medal_666: 6,
    end_princess: 4,
    end_special: 6,
    vision_confirmed: 4,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.medal_666 ?? 0) >= 1 || (input.end_special ?? 0) >= 1) return { message: '設定6濃厚！確定演出を確認済み', level: 'high' };
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
    if (input.atCnt == null) hints.push('AT初当たり回数は最重要の設定差要素です');
    if (!['medal_456','medal_555','medal_666'].some(k => (input[k] ?? 0) > 0))
      hints.push('獲得枚数表示（456/555/666）を確認してください');
    if (!['end_default','end_yoshimune','end_princess','end_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください');
    hints.push('※ 新台のため解析データは限定的です。データが公開され次第更新します');
    return hints;
  },

  payoutRates: [97.8, 98.6, 101.0, 104.5, 108.0, 114.0],
  baseCoins: 33,

  checklist: [
    { id: 'ck_at_freq', label: 'AT初当たり頻度確認', category: '通常時' },
    { id: 'ck_medal', label: '獲得枚数表示（456/555/666）', category: 'AT中' },
    { id: 'ck_end_screen', label: 'AT終了画面種類', category: 'AT終了時' },
    { id: 'ck_vision', label: '御白洲ビジョン確認', category: 'AT中' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率に大きな設定差（設定1: 1/488.9 → 設定6: 1/354.9）',
      '獲得枚数表示：456枚=設定4以上!?、555枚=設定5以上!?、666枚=設定6濃厚',
      'AT終了画面：姫=設定4以上確定、特殊画面=設定6濃厚',
      '御白洲ビジョンの確定パターンは設定4以上確定',
    ],
    morningCheck: [
      '天井はCZ1000G / AT1500G',
      '朝一はCZ天井1000Gまでの到達を目安に判断',
      'AT初当たりが400G以内に集中するなら高設定の期待大',
      '獲得枚数表示は序盤から出現する可能性あり。必ず確認',
    ],
    quitTiming: [
      'AT終了後は即やめ推奨（有利区間リセート確認後）',
      'AT初当たり確率が1/500を超えていれば低設定見切り検討',
      'CZ天井1000Gに近い場合は打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 1500,
    ceilingBenefit: 'CZ天井1000G / AT天井1500GでAT確定',
    zones: [
      { start: 700, end: 800, label: 'CZ前兆ゾーン', strength: 'warm' },
      { start: 900, end: 1000, label: 'CZ天井ゾーン', strength: 'hot' },
      { start: 1200, end: 1500, label: 'AT天井接近ゾーン', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -2000, note: '等価' },
      { fromGame: 300, expectedYen: -1200 },
      { fromGame: 500, expectedYen: -400 },
      { fromGame: 700, expectedYen: 500, note: 'ボーダー付近' },
      { fromGame: 900, expectedYen: 2000, note: 'CZ天井狙い' },
      { fromGame: 1100, expectedYen: 3500, note: 'AT天井狙い' },
      { fromGame: 1300, expectedYen: 5500, note: '積極的に狙う' },
    ],
    resetInfo: '有利区間リセットで天井短縮なし（推定）',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      'CZ天井1000GとAT天井1500Gの2段構え',
      '期待値は設定1・等価換金で計算',
      '新台のため解析値は推定を含む',
    ],
  },

  dictionary: [
    { keyword: 'AT初当たり', name: 'AT初当たり確率', timing: '終日カウント', settingHint: '設定1: 1/488.9 → 設定6: 1/354.9', importance: 'strong' },
    { keyword: '456枚', name: '獲得枚数表示（456枚）', timing: 'AT中', settingHint: '設定4以上!?', importance: 'confirmed' },
    { keyword: '555枚', name: '獲得枚数表示（555枚）', timing: 'AT中', settingHint: '設定5以上!?', importance: 'confirmed' },
    { keyword: '666枚', name: '獲得枚数表示（666枚）', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '姫画面', name: 'AT終了画面（姫）', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '特殊画面', name: 'AT終了画面（特殊画面）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '吉宗画面', name: 'AT終了画面（吉宗）', timing: 'AT終了時', settingHint: '高設定示唆', importance: 'strong' },
    { keyword: '御白洲ビジョン', name: '御白洲ビジョン', timing: 'AT中', settingHint: '確定パターン=設定4以上確定', importance: 'confirmed' },
  ],
};

export default config;
