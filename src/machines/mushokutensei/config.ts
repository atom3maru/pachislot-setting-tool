import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'mushokutensei',
  name: 'L無職転生～異世界行ったら本気だす～',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-teal-600 to-cyan-500',
  // 6段階設定（1,2,3,4,5,6）・小役確率に設定差なし

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '最大の設定差要素!' },
            { key: 'bonusCnt', label: 'ボーナス初当たり回数' },
            { key: 'tp2Cnt', label: 'TP2突入回数', hint: 'ターニングポイント2・約1.7倍差' },
          ],
        },
      ],
    },
    {
      title: 'CZ中確定演出', icon: '⚡',
      groups: [
        {
          label: 'CZ中パーセント表示（押し順ナビ煽り）', columns: 3,
          fields: [
            { key: 'pct44', label: '44%表示', hint: '設定4以上確定!' },
            { key: 'pct55', label: '55%表示', hint: '設定5以上確定!' },
            { key: 'pct66', label: '66%表示', hint: '設定6確定!!' },
          ],
        },
      ],
    },
    {
      title: 'ATセット開始画面（赤背景）', icon: '🖼️',
      groups: [
        {
          label: '赤背景時キャラクター', columns: 4,
          fields: [
            { key: 'at_heroine', label: 'ヒロイン3人', hint: '偶数設定示唆' },
            { key: 'at_hitogami', label: 'ヒトガミ', hint: '設定4以上濃厚!' },
            { key: 'at_zense', label: '前世の男', hint: '設定5以上濃厚!' },
            { key: 'at_orsted', label: 'オルステッド', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: '終了画面・獲得枚数', icon: '🏆',
      groups: [
        {
          label: '終了画面枠色', columns: 3,
          fields: [
            { key: 'e_default', label: 'デフォルト' },
            { key: 'e_copper', label: '銅枠（デッドエンド）', hint: '設定2以上濃厚' },
            { key: 'e_silver', label: '銀枠（絆）', hint: '設定4以上濃厚!' },
            { key: 'e_gold', label: '金枠（オルステッド）', hint: '設定6濃厚!!' },
          ],
        },
        {
          label: '獲得枚数表示', columns: 3,
          fields: [
            { key: 'm444', label: '444枚/456枚', hint: '設定4以上確定!' },
            { key: 'm555', label: '555枚', hint: '設定5以上確定!' },
            { key: 'm666', label: '666枚', hint: '設定6確定!!' },
          ],
        },
      ],
    },
    {
      title: 'ボーナス中・ED中示唆', icon: '📋',
      groups: [
        {
          label: '魔術ボーナス中ストーリー', columns: 2,
          fields: [
            { key: 'story8', label: '第8話（銀枠）', hint: '設定4以上濃厚' },
            { key: 'story21', label: '第21話（金枠）', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'ED中ミニキャラ（ヒロイン役成立時）', columns: 3,
          fields: [
            { key: 'ed_hitogami', label: 'ヒトガミ', hint: '設定4以上濃厚' },
            { key: 'ed_zense', label: '前世の男', hint: '設定5以上濃厚' },
            { key: 'ed_orsted', label: 'オルステッド', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/416, 1/406, 1/394, 1/361, 1/327, 1/292] },
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/170, 1/168, 1/166, 1/161, 1/156, 1/147] },
    { key: 'tp2Cnt', totalKey: 'totalG', rates: [1/2281, 1/2100, 1/1900, 1/1700, 1/1500, 1/1324] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['at_heroine', 'at_hitogami', 'at_zense', 'at_orsted'],
      rates: {
        at_heroine:  [0.10, 0.15, 0.10, 0.12, 0.10, 0.12],
        at_hitogami: [0.00, 0.00, 0.00, 0.03, 0.04, 0.05],
        at_zense:    [0.00, 0.00, 0.00, 0.00, 0.03, 0.04],
        at_orsted:   [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['e_default', 'e_copper', 'e_silver', 'e_gold'],
      rates: {
        e_default: [0.90, 0.85, 0.82, 0.76, 0.70, 0.63],
        e_copper:  [0.00, 0.05, 0.05, 0.06, 0.07, 0.08],
        e_silver:  [0.00, 0.00, 0.00, 0.05, 0.06, 0.07],
        e_gold:    [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['m444', 'm555', 'm666'],
      rates: {
        m444: [0.00, 0.00, 0.00, 0.03, 0.03, 0.05],
        m555: [0.00, 0.00, 0.00, 0.00, 0.02, 0.03],
        m666: [0.00, 0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
  ],

  confirmedMin: {
    pct44: 4, pct55: 5, pct66: 6,
    at_hitogami: 4, at_zense: 5, at_orsted: 6,
    e_copper: 2, e_silver: 4, e_gold: 6,
    m444: 4, m555: 5, m666: 6,
    story8: 4, story21: 6,
    ed_hitogami: 4, ed_zense: 5, ed_orsted: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.pct66 ?? 0) >= 1 || (input.m666 ?? 0) >= 1 || (input.e_gold ?? 0) >= 1 || (input.at_orsted ?? 0) >= 1) {
      return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.atCnt == null) hints.push('AT初当たり確率は最大の設定差要素（約1.4倍差）');
    hints.push('本機は小役確率に設定差なし。小役カウントは不要です');
    if (!['e_default', 'e_copper', 'e_silver', 'e_gold'].some(k => (input[k] ?? 0) > 0))
      hints.push('終了画面の枠色を確認してください（金枠=設定6濃厚）');
    return hints;
  },
};

export default config;
