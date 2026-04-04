import type { MachineConfig } from '../../types/machine';

// A-SLOT+ 異世界かるてっとBT
// 新台のため解析データは限定的。設定3,4のデータ未公開のため推定値使用。
// ボーナス合算確率に設定差あり。天井なしのBT機。

const config: MachineConfig = {
  id: 'isekai_quartet',
  name: 'A-SLOT+ 異世界かるてっとBT',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-yellow-500 to-pink-500',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [{
        columns: 2,
        fields: [
          { key: 'totalG', label: '総ゲーム数', hint: '通常時合算' },
          { key: 'bonusCnt', label: 'ボーナス合算回数', hint: 'BIG+REG合算' },
        ],
      }],
    },
    {
      title: '設定示唆演出', icon: '🌟',
      groups: [
        {
          label: 'BT終了画面', columns: 3,
          fields: [
            { key: 'end_default', label: 'デフォルト' },
            { key: 'end_aqua', label: 'アクア', hint: '奇数設定示唆' },
            { key: 'end_emilia', label: 'エミリア', hint: '偶数設定示唆' },
            { key: 'end_ainz', label: 'アインズ', hint: '高設定示唆' },
            { key: 'end_all', label: '全員集合', hint: '設定4以上!' },
            { key: 'end_special', label: '特殊画面', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    // ボーナス合算（設定3,4は推定値）
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/99.9, 1/98.1, 1/95.0, 1/92.0, 1/89.1, 1/82.1] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['end_default', 'end_aqua', 'end_emilia', 'end_ainz', 'end_all', 'end_special'],
      rates: {
        end_default: [0.700, 0.660, 0.680, 0.610, 0.620, 0.510],
        end_aqua:    [0.150, 0.100, 0.140, 0.100, 0.120, 0.100],
        end_emilia:  [0.100, 0.160, 0.100, 0.170, 0.100, 0.190],
        end_ainz:    [0.050, 0.060, 0.060, 0.070, 0.090, 0.100],
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
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）※新台のため解析データ限定的（設定3,4は推定値）`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると精度が上がります');
    if (input.bonusCnt == null) hints.push('ボーナス合算回数は最重要の設定差要素です');
    if (!['end_default','end_aqua','end_emilia','end_ainz','end_all','end_special'].some(k => (input[k] ?? 0) > 0))
      hints.push('BT終了画面を確認してください');
    hints.push('※ 新台のため解析データは限定的です（設定3,4は推定値）。データが公開され次第更新します');
    return hints;
  },

  payoutRates: [97.9, 99.9, 101.5, 103.0, 104.4, 109.0],
  baseCoins: 33,

  checklist: [
    { id: 'ck_bonus_freq', label: 'ボーナス合算頻度確認', category: '通常時' },
    { id: 'ck_end_screen', label: 'BT終了画面種類', category: 'BT終了時' },
  ],

  guide: {
    settingHunt: [
      'ボーナス合算確率に設定差あり（設定1: 1/99.9 → 設定6: 1/82.1）',
      'BT終了画面：全員集合=設定4以上確定、特殊画面=設定6濃厚',
      '天井なしのBT機のため、設定判別は長期的なボーナス確率が重要',
      '※ 設定3,4のデータは未公開のため推定値を使用しています',
    ],
    morningCheck: [
      '天井なし。朝一リセット恩恵なし（推定）',
      'ボーナス合算が1/90を切るペースなら高設定の期待大',
      'BT終了画面の確定パターンは序盤から出現する可能性あり',
    ],
    quitTiming: [
      'BT後は即やめ推奨',
      'ボーナス合算が1/110を超えていれば低設定見切り検討',
      '天井なしのため、ハマりが続く場合は早めの見切りが重要',
    ],
  },

  dictionary: [
    { keyword: 'ボーナス合算', name: 'ボーナス合算確率', timing: '終日カウント', settingHint: '設定1: 1/99.9 → 設定6: 1/82.1（設定3,4推定）', importance: 'strong' },
    { keyword: '全員集合', name: 'BT終了画面（全員集合）', timing: 'BT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '特殊画面', name: 'BT終了画面（特殊画面）', timing: 'BT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'アクア画面', name: 'BT終了画面（アクア）', timing: 'BT終了時', settingHint: '奇数設定示唆', importance: 'weak' },
    { keyword: 'エミリア画面', name: 'BT終了画面（エミリア）', timing: 'BT終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: 'アインズ画面', name: 'BT終了画面（アインズ）', timing: 'BT終了時', settingHint: '高設定示唆', importance: 'strong' },
  ],
};

export default config;
