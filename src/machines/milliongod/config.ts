import type { MachineConfig } from '../../types/machine';

// スマスロ ミリオンゴッド-神々の軌跡-
// 新台のため解析データは限定的。初当たり確率に大きな設定差あり。
// 偶数設定のほうが機械割が高い特徴的なスペック。

const config: MachineConfig = {
  id: 'milliongod',
  name: 'スマスロ ミリオンゴッド-神々の軌跡-',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-yellow-700 to-amber-600',

  sections: [
    {
      title: '確率系データ', icon: '⚡',
      groups: [{
        columns: 2,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時合算' },
          { key: 'ggCnt', label: 'GG(ゴッドゲーム)初当たり回数' },
          { key: 'godHit', label: 'GOD揃い回数', hint: '1/16384(推定)' },
          { key: 'ggSets', label: 'GG総セット数', hint: '連チャン含む' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🏛️',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_poseidon', label: 'ポセイドン', hint: '奇数設定示唆' },
            { key: 'end_zeus', label: 'ゼウス', hint: '偶数設定示唆' },
            { key: 'end_hades', label: 'ハデス', hint: '高設定示唆' },
            { key: 'end_all', label: '全員集合', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'ステージ示唆', columns: 2,
          fields: [
            { key: 'stage_poseidon', label: 'ポセイドンステージ回数', hint: '高設定示唆' },
            { key: 'stage_zeus', label: 'ゼウスステージ回数', hint: '高設定示唆(強)' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    // GG初当たり確率: 偶数設定が優遇される特殊な設定差
    { key: 'ggCnt', totalKey: 'totalG', rates: [1/533, 1/420, 1/496, 1/338, 1/455, 1/295] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['end_default', 'end_poseidon', 'end_zeus', 'end_hades', 'end_all', 'end_special'],
      rates: {
        end_default:   [0.700, 0.650, 0.680, 0.600, 0.620, 0.500],
        end_poseidon:  [0.150, 0.100, 0.150, 0.100, 0.130, 0.100],
        end_zeus:      [0.100, 0.170, 0.100, 0.180, 0.100, 0.200],
        end_hades:     [0.050, 0.060, 0.050, 0.070, 0.080, 0.100],
        end_all:       [0.000, 0.000, 0.000, 0.030, 0.040, 0.060],
        end_special:   [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
      },
    },
    {
      keys: ['stage_poseidon', 'stage_zeus'],
      rates: {
        stage_poseidon: [0.05, 0.06, 0.06, 0.08, 0.08, 0.10],
        stage_zeus:     [0.02, 0.03, 0.02, 0.04, 0.03, 0.06],
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

    // 偶数設定に設定差が大きいため、偶数設定合算で判定
    const pEven = p[1] + p[3] + p[5]; // 設定2,4,6
    const p56 = p[4] + p[5];
    if (p56 > 0.50) return { message: `高設定濃厚！（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.60) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (pEven > 0.70) return { message: `偶数設定濃厚（偶数合算: ${(pEven*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）※新台のため解析データ限定的`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると精度が上がります');
    if (input.ggCnt == null) hints.push('GG初当たり回数は最重要の設定差要素です（偶数設定が優遇）');
    if (!['end_default','end_poseidon','end_zeus','end_hades','end_all','end_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください');
    hints.push('※ 新台のため解析データは限定的です。データが公開され次第更新します');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.5, 99.3, 102.8, 107.1, 110.5, 115.2],
  baseCoins: 33,

  checklist: [
    { id: 'ck_gg_freq', label: 'GG初当たり頻度確認', category: '通常時' },
    { id: 'ck_mode', label: '前兆モード移行率', category: '通常時' },
    { id: 'ck_god_hit', label: 'GOD揃い発生有無', category: 'AT中' },
    { id: 'ck_end_screen', label: 'AT終了画面種類', category: 'AT終了時' },
    { id: 'ck_voice', label: 'AT終了時ボイス', category: 'AT終了時' },
    { id: 'ck_sets', label: 'GGセット数ストック', category: 'AT中' },
  ],

  guide: {
    settingHunt: [
      '偶数設定のほうが機械割が高い特徴的スペック',
      'GG初当たり確率に大きな設定差あり',
      'AT終了画面・ボイスで設定示唆パターンを確認',
      '特殊画面出現で高設定確定パターンあり',
      'GOD揃い確率は設定不問（1/16384推定）',
    ],
    morningCheck: [
      'GG初当たり確率を重視（最重要指標）',
      'AT終了画面の高設定確定パターン出現を注視',
      '300G以内の初当たりが多いほど高設定期待度UP',
    ],
    quitTiming: [
      '500G以上ハマりが連続する場合は低設定を疑う',
      'GG初当たり確率が1/500を超えたら要注意',
      '設定示唆演出で低設定確定パターンが出たら即ヤメ推奨',
    ],
  },

  hyena: {
    ceilingGame: 1500,
    ceilingBenefit: '1500G+α到達でGG（ゴッドゲーム）確定',
    zones: [
      { start: 450, end: 550, label: '前兆発生ゾーン（モードB以上）', strength: 'warm' },
      { start: 750, end: 850, label: '天国準備ゾーン', strength: 'warm' },
      { start: 1150, end: 1250, label: '天井CZ前兆ゾーン', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1800, note: '等価' },
      { fromGame: 200, expectedYen: -1200 },
      { fromGame: 500, expectedYen: -300 },
      { fromGame: 700, expectedYen: 400, note: 'ボーダー付近' },
      { fromGame: 900, expectedYen: 1500, note: '狙い目' },
      { fromGame: 1100, expectedYen: 3200, note: '積極的に狙う' },
      { fromGame: 1300, expectedYen: 5500, note: '天井狙い' },
    ],
    resetInfo: '有利区間リセットで天井短縮なし（推定）',
    notes: [
      '天井は通常時のゲーム数（AT中は含まない）',
      '期待値は設定1・等価換金で計算',
      '新台のため解析値は推定を含む',
    ],
  },
};

export default config;
