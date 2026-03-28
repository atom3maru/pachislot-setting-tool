import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'monkeyturn',
  name: 'スマスロモンキーターンV',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-cyan-600 to-blue-500',
  settingLabels: ['1', '2', '4', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数' },
            { key: 'gomaiyaku', label: '5枚役回数', hint: '最重要カウント要素!設定差約1.7倍' },
          ],
        },
      ],
    },
    {
      title: 'AT直撃・ライバルモード', icon: '⚡',
      groups: [
        {
          label: '弱レア役AT直撃（設定4以上確定）', columns: 2,
          fields: [
            { key: 'direct_weak', label: '弱レア役AT直撃回数', hint: '発生=設定4以上確定!' },
            { key: 'direct_none', label: 'AT直撃なし' },
          ],
        },
      ],
    },
    {
      title: 'AT終了画面', icon: '🖼️',
      groups: [
        {
          label: 'SGメダル', columns: 3,
          fields: [
            { key: 'medal_normal', label: '通常メダル', hint: 'デフォルト' },
            { key: 'medal_blue', label: '青メダル', hint: '偶数設定示唆' },
            { key: 'medal_yellow', label: '黄メダル', hint: '高設定示唆（弱）' },
            { key: 'medal_black', label: '黒メダル', hint: '高設定示唆（強）' },
          ],
        },
        {
          label: 'ケロットトロフィー', columns: 4,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上確定' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上確定!' },
            { key: 't_kerot', label: 'ケロット柄', hint: '設定5以上確定!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6確定!!' },
          ],
        },
      ],
    },
    {
      title: '獲得枚数・その他', icon: '📋',
      groups: [
        {
          label: '獲得枚数表示', columns: 3,
          fields: [
            { key: 'm456', label: '456 OVER', hint: '設定4以上確定' },
            { key: 'm803', label: '803 OVER', hint: '設定5以上確定' },
            { key: 'm666', label: '666 OVER', hint: '設定6確定!' },
          ],
        },
        {
          label: '青島SG ラウンド開始画面', columns: 2,
          fields: [
            { key: 'aoshima_hatano', label: '青島&波多野', hint: '設定5以上確定+継続確定!' },
            { key: 'aoshima_none', label: '上記以外' },
          ],
        },
      ],
    },
  ],

  // 設定1,2,4,5,6の5段階
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/299.8, 1/295.5, 1/258.8, 1/235.7, 1/222.9] },
    { key: 'gomaiyaku', totalKey: 'totalG', rates: [1/38.15, 1/36.86, 1/30.27, 1/24.51, 1/22.53] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['direct_weak', 'direct_none'],
      rates: {
        direct_weak: [0.000, 0.000, 0.004, 0.020, 0.031],
        direct_none: [1.000, 1.000, 0.996, 0.980, 0.969],
      },
    },
    {
      keys: ['medal_normal', 'medal_blue', 'medal_yellow', 'medal_black'],
      rates: {
        medal_normal: [0.80, 0.72, 0.65, 0.60, 0.55],
        medal_blue:   [0.10, 0.15, 0.12, 0.13, 0.15],
        medal_yellow: [0.06, 0.08, 0.13, 0.15, 0.16],
        medal_black:  [0.01, 0.02, 0.04, 0.045, 0.045],
      },
    },
    {
      keys: ['t_copper', 't_gold', 't_kerot', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020],
        t_gold:    [0.000, 0.000, 0.005, 0.005, 0.005],
        t_kerot:   [0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['m456', 'm803', 'm666'],
      rates: {
        m456: [0.00, 0.00, 0.03, 0.03, 0.05],
        m803: [0.00, 0.00, 0.00, 0.02, 0.03],
        m666: [0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
  ],

  confirmedMin: {
    direct_weak: 4,
    t_copper: 2, t_gold: 4, t_kerot: 5, t_rainbow: 6,
    m456: 4, m803: 5, m666: 6,
    aoshima_hatano: 5,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.t_rainbow ?? 0) >= 1 || (input.m666 ?? 0) >= 1) {
      return { message: '設定6確定！確定演出を確認済み', level: 'high' };
    }
    if (cMin >= 5) return { message: `設定5以上確定！（設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[2]*100).toFixed(1)}% / 設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[3] + p[4];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[2] + p[3] + p[4];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.gomaiyaku == null) hints.push('5枚役は最重要カウント要素！セグに「5」表示で判別可能');
    if (input.direct_weak == null) hints.push('弱レア役からのAT直撃は設定4以上確定！見逃さないように');
    if (!['medal_normal', 'medal_blue', 'medal_yellow', 'medal_black'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了時のSGメダル色を確認してください');
    if (!['t_copper', 't_gold', 't_kerot', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('ケロットトロフィーを確認してください（虹=設定6確定）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.9, 98.9, 104.5, 110.2, 114.9],
  baseCoins: 32,

  checklist: [
    { id: 'ck_helmet', label: 'ヘルメット種類を確認', category: 'AT終了時' },
    { id: 'ck_side', label: 'サイド液晶表示を確認', category: 'AT終了時' },
    { id: 'ck_cycle', label: '周期数・スルー回数を記録', category: '通常時' },
    { id: 'ck_charge', label: 'チャージ間G数を記録', category: '通常時' },
    { id: 'ck_hit', label: '初当たりを記録', category: '通常時' },
    { id: 'ck_vstock', label: 'Vストックを確認', category: 'AT中' },
    { id: 'ck_gakkun', label: 'リセットガックン判別', category: '朝一' },
  ],

  guide: {
    settingHunt: [
      'AT終了画面ヘルメットで設定示唆',
      'サイド液晶表示で設定示唆',
      'AT初当たり確率に設定差あり',
      '周期当選率で設定推測',
    ],
    morningCheck: [
      'リセットで天井495Gに短縮',
      'ガックン判別でリセット確認',
    ],
    quitTiming: [
      'AT終了後ヘルメット確認',
      'サイド液晶確認',
      'Vストック保持なら続行',
    ],
  },

  hyena: {
    ceilingGame: 795,
    ceilingBenefit: '795G天井でAT確定（リセット495G）、5スルー6回目AT確定',
    zones: [
      { start: 60, end: 81, label: 'チャージ間81G天井', strength: 'warm' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000 },
      { fromGame: 250, expectedYen: 500 },
      { fromGame: 350, expectedYen: 1000 },
      { fromGame: 500, expectedYen: 2500 },
      { fromGame: 600, expectedYen: 4000 },
    ],
    resetInfo: 'リセット時は天井495Gに短縮',
    notes: [
      '天井は通常時795G（リセット495G）',
      '周期5スルー6回目はAT確定',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
