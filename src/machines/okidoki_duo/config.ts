import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'okidoki_duo',
  name: 'スマスロ 沖ドキ！DUOアンコール',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-pink-500 to-orange-400',
  settingLabels: ['1', '2', '3', '5', '6'],

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: '初当たり合算回数' },
            { key: 'cherryCnt', label: 'チェリー回数', hint: '設定差あり・高設定ほど出やすい' },
          ],
        },
      ],
    },
    {
      title: 'モード・天国関連', icon: '📊',
      groups: [
        {
          label: '32G以内天国移行', columns: 2,
          fields: [
            { key: 'heaven32', label: '32G以内当選回数', hint: '天国移行示唆' },
            { key: 'bonusTotal', label: 'ボーナス総回数', hint: '上記の分母用' },
          ],
        },
      ],
    },
    {
      title: 'テンパイボイス（最重要）', icon: '🔊',
      groups: [
        {
          label: 'ボーナステンパイ時ボイス', columns: 3,
          fields: [
            { key: 'v_normal', label: '通常テンパイ音', hint: 'デフォルト' },
            { key: 'v_kirarin', label: 'きらりーん', hint: '設定2以上濃厚' },
            { key: 'v_pikon', label: 'ぴこーん', hint: '設定3以上濃厚' },
            { key: 'v_tiroriro', label: 'てぃろりろ', hint: '設定2・6示唆' },
            { key: 'v_kana', label: 'カナちゃんボイス', hint: '設定5以上濃厚!' },
            { key: 'v_3nin', label: '3人で楽しもー！', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: '終了画面・その他', icon: '🖼️',
      groups: [
        {
          label: 'ボーナス終了画面（モード示唆）', columns: 3,
          fields: [
            { key: 'e_default', label: '昼（デフォルト）' },
            { key: 'e_hibiscus', label: 'ハイビスカス', hint: '通常B以上期待' },
            { key: 'e_evening', label: '夕方', hint: '天国以上濃厚・32G超えても続行!' },
            { key: 'e_night', label: '夜', hint: 'ドキドキ以上濃厚' },
            { key: 'e_duo', label: 'ハナ&カナ', hint: 'DUOモード濃厚' },
          ],
        },
        {
          label: '楽曲変化', columns: 2,
          fields: [
            { key: 'song_verup', label: '私バージョンアップ！', hint: '設定2以上示唆' },
            { key: 'song_none', label: '楽曲変化なし' },
          ],
        },
      ],
    },
  ],

  // 設定1,2,3,5,6の5段階
  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/240.0, 1/230.2, 1/215.8, 1/192.1, 1/181.0] },
    { key: 'cherryCnt', totalKey: 'totalG', rates: [1/46.8, 1/45.0, 1/43.3, 1/41.7, 1/40.3] },
  ],

  binomialEntries: [
    { hitKey: 'heaven32', totalKey: 'bonusTotal', rates: [0.22, 0.24, 0.26, 0.29, 0.31] },
  ],

  categoricalGroups: [
    {
      keys: ['v_normal', 'v_kirarin', 'v_pikon', 'v_tiroriro', 'v_kana', 'v_3nin'],
      rates: {
        v_normal:   [0.90, 0.80, 0.72, 0.62, 0.55],
        v_kirarin:  [0.00, 0.06, 0.06, 0.08, 0.08],
        v_pikon:    [0.00, 0.00, 0.06, 0.08, 0.08],
        v_tiroriro: [0.05, 0.08, 0.05, 0.05, 0.10],
        v_kana:     [0.00, 0.00, 0.00, 0.08, 0.08],
        v_3nin:     [0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
    {
      keys: ['song_verup', 'song_none'],
      rates: {
        song_verup: [0.00, 0.02, 0.03, 0.05, 0.07],
        song_none:  [1.00, 0.98, 0.97, 0.95, 0.93],
      },
    },
  ],

  confirmedMin: {
    v_kirarin: 2, v_pikon: 3, v_kana: 5, v_3nin: 6,
    song_verup: 2,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    // index: 0=設定1, 1=設定2, 2=設定3, 3=設定5, 4=設定6

    if ((input.v_3nin ?? 0) >= 1) return { message: '設定6濃厚！「3人で楽しもー！」ボイスを確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定5以上濃厚！（設定5: ${(p[3]*100).toFixed(1)}% / 設定6: ${(p[4]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 3) {
      const p356 = p[2] + p[3] + p[4];
      return { message: `設定3以上濃厚！（設定3以上合算: ${(p356*100).toFixed(1)}%）`, level: 'mid' };
    }
    const p56 = p[3] + p[4];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    if (p56 > 0.40) return { message: `高設定の可能性あり（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）。データを追加して精度を上げましょう`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると確率系の判定精度が上がります');
    if (input.cherryCnt == null) hints.push('チェリー回数は重要な判別要素。カウントしましょう');
    if (!['v_normal', 'v_kirarin', 'v_pikon', 'v_tiroriro', 'v_kana', 'v_3nin'].some(k => (input[k] ?? 0) > 0))
      hints.push('テンパイボイスは最重要判別要素！必ず確認しましょう');
    if (input.heaven32 == null) hints.push('32G以内の当選回数をカウントすると天国移行率の判別に役立ちます');
    return hints;
  },
};

export default config;
