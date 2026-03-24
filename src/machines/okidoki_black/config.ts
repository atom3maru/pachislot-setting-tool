import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'okidoki_black',
  name: '沖ドキ！BLACK',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-gray-900 to-red-800',
  settingLabels: ['1', '2', '3', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: '初当たり回数', hint: 'ボーナス合算' },
            { key: 'cherryBCnt', label: 'チェリーB回数', hint: '左リール中段停止チェリー' },
            { key: 'kakuteiB', label: '確定役B回数', hint: 'スイカ小V型（超レア）' },
          ],
        },
      ],
    },
    {
      title: 'モード・天井関連', icon: '📊',
      groups: [
        {
          label: 'ボーナス当選ゲーム数', columns: 3,
          fields: [
            { key: 'hit32', label: '32G以内当選回数', hint: '天国モード示唆' },
            { key: 'hit200', label: '200G以内当選回数', hint: 'チャンスモード示唆' },
            { key: 'bonusTotal', label: 'ボーナス総回数', hint: '上記の分母用' },
          ],
        },
      ],
    },
    {
      title: '演出系データ', icon: '🎬',
      groups: [
        {
          label: 'ボーナス確定演出', columns: 3,
          fields: [
            { key: 'e_okure', label: '遅れ発生回数' },
            { key: 'e_flash', label: 'LEDフラッシュ回数' },
            { key: 'e_sakichika', label: '先チカ回数' },
            { key: 'e_muon', label: '無音回数', hint: '高設定示唆' },
          ],
        },
        {
          label: '黒ドキモード', columns: 2,
          fields: [
            { key: 'kurodoki_hit', label: '黒ドキモード突入', hint: '次回天国以上確定' },
            { key: 'kurodoki_none', label: '黒ドキなし' },
          ],
        },
      ],
    },
  ],

  // 設定1,2,3,5,6の5段階
  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/288.7, 1/277.9, 1/265.8, 1/254.1, 1/243.1] },
    { key: 'cherryBCnt', totalKey: 'totalG', rates: [1/168.0, 1/152.4, 1/145.6, 1/136.5, 1/128.5] },
    { key: 'kakuteiB', totalKey: 'totalG', rates: [1/16384.0, 1/13107.2, 1/10922.7, 1/8192.0, 1/6553.6] },
  ],

  binomialEntries: [
    { hitKey: 'hit32', totalKey: 'bonusTotal', rates: [0.15, 0.18, 0.20, 0.23, 0.26] },
  ],

  categoricalGroups: [
    {
      keys: ['kurodoki_hit', 'kurodoki_none'],
      rates: {
        kurodoki_hit:  [0.005, 0.008, 0.010, 0.015, 0.020],
        kurodoki_none: [0.995, 0.992, 0.990, 0.985, 0.980],
      },
    },
    {
      keys: ['e_muon'],
      rates: {
        e_muon: [0.01, 0.02, 0.03, 0.05, 0.07],
      },
    },
  ],

  confirmedMin: {},

  getJudgment: (_input, result) => {
    const p = result.probabilities;
    // index: 0=設定1, 1=設定2, 2=設定3, 3=設定5, 4=設定6
    const p56 = p[3] + p[4];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    if (p56 > 0.40) return { message: `高設定の可能性あり（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると判定精度が上がります');
    if (input.cherryBCnt == null) hints.push('チェリーBの回数はマイスロで確認できます（重要な判別要素）');
    if (input.hit32 == null) hints.push('32G以内の当選回数をカウントすると天国移行率の判別に役立ちます');
    return hints;
  },
};

export default config;
