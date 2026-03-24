import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'magireco',
  name: 'スマスロ マギアレコード まどマギ外伝',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-pink-600 to-purple-600',
  // 6段階設定（1,2,3,4,5,6）

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: 'ボーナス初当たり回数', hint: 'BB+RB合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: 'マギアラッシュ・最大設定差!' },
            { key: 'weakCherry', label: '弱チェリー回数', hint: '設定差あり' },
          ],
        },
      ],
    },
    {
      title: 'CZ・高確', icon: '⚡',
      groups: [
        {
          label: 'スイカ成立時CZ当選', columns: 2,
          fields: [
            { key: 'cz_hit', label: 'スイカ→CZ当選回数', hint: '高設定ほど優遇' },
            { key: 'suika_total', label: 'スイカ成立総数', hint: 'CZ当選の分母' },
          ],
        },
      ],
    },
    {
      title: 'AT終了画面', icon: '🖼️',
      groups: [
        {
          label: 'AT終了画面', columns: 3,
          fields: [
            { key: 'e_castle', label: '城背景', hint: 'デフォルト' },
            { key: 'e_magius', label: 'マギウスメンバー', hint: '設定3・5・6示唆' },
            { key: 'e_mikazuki', label: 'みかづき荘', hint: '設定2・4・6示唆' },
            { key: 'e_madokairoha', label: 'まどか&いろは', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'BB終了画面・プレート', icon: '🎬',
      groups: [
        {
          label: 'BB終了画面', columns: 3,
          fields: [
            { key: 'bb_default', label: '楽曲対応', hint: 'デフォルト' },
            { key: 'bb_mizugi', label: '水着みかづき荘', hint: '設定2以上濃厚' },
            { key: 'bb_2nd', label: '2ndキービジュアル', hint: '設定4以上濃厚!' },
            { key: 'bb_1st', label: '1stキービジュアル', hint: '設定5以上濃厚!' },
            { key: 'bb_qb', label: '小さいキュゥべえ', hint: '設定6濃厚!!' },
          ],
        },
        {
          label: 'サブ液晶プレート色', columns: 4,
          fields: [
            { key: 'p_copper', label: '銅プレート', hint: '設定2以上' },
            { key: 'p_silver', label: '銀プレート', hint: '設定3以上' },
            { key: 'p_gold', label: '金プレート', hint: '設定4以上' },
            { key: 'p_rainbow', label: '虹プレート', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/240.6, 1/236.1, 1/222.8, 1/208.5, 1/195.1, 1/184.3] },
    { key: 'atCnt', totalKey: 'totalG', rates: [1/654.6, 1/633.4, 1/571.8, 1/516.6, 1/456.5, 1/416.7] },
    { key: 'weakCherry', totalKey: 'totalG', rates: [1/60.0, 1/57.7, 1/55.5, 1/53.5, 1/51.7, 1/50.0] },
  ],

  binomialEntries: [
    { hitKey: 'cz_hit', totalKey: 'suika_total', rates: [0.199, 0.223, 0.246, 0.273, 0.301, 0.328] },
  ],

  categoricalGroups: [
    {
      keys: ['e_castle', 'e_magius', 'e_mikazuki', 'e_madokairoha'],
      rates: {
        e_castle:      [0.90, 0.85, 0.80, 0.75, 0.70, 0.63],
        e_magius:      [0.05, 0.05, 0.08, 0.08, 0.10, 0.12],
        e_mikazuki:    [0.05, 0.10, 0.05, 0.10, 0.05, 0.10],
        e_madokairoha: [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['bb_default', 'bb_mizugi', 'bb_2nd', 'bb_1st', 'bb_qb'],
      rates: {
        bb_default: [0.90, 0.85, 0.82, 0.76, 0.70, 0.63],
        bb_mizugi:  [0.00, 0.05, 0.05, 0.06, 0.07, 0.08],
        bb_2nd:     [0.00, 0.00, 0.00, 0.05, 0.06, 0.07],
        bb_1st:     [0.00, 0.00, 0.00, 0.00, 0.05, 0.06],
        bb_qb:      [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['p_copper', 'p_silver', 'p_gold', 'p_rainbow'],
      rates: {
        p_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        p_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        p_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        p_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
  ],

  confirmedMin: {
    e_madokairoha: 6,
    bb_mizugi: 2, bb_2nd: 4, bb_1st: 5, bb_qb: 6,
    p_copper: 2, p_silver: 3, p_gold: 4, p_rainbow: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.e_madokairoha ?? 0) >= 1 || (input.bb_qb ?? 0) >= 1 || (input.p_rainbow ?? 0) >= 1) {
      return { message: '設定6濃厚！確定級演出を確認済み', level: 'high' };
    }
    if (cMin >= 5) return { message: `設定5以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[4] + p[5];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.atCnt == null) hints.push('AT初当たり確率は最大の設定差要素です（約1.57倍差）');
    if (input.weakCherry == null) hints.push('弱チェリー確率に設定差あり。カウントしましょう');
    if (input.cz_hit == null) hints.push('スイカ成立時のCZ当選率にも大きな設定差あり');
    if (!['e_castle', 'e_magius', 'e_mikazuki', 'e_madokairoha'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認してください（まどか&いろは=設定6濃厚）');
    return hints;
  },
};

export default config;
