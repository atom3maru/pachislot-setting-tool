import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'rezero2',
  name: 'スマスロ Re:ゼロ Season2',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-blue-700 to-cyan-500',

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '殲滅ラッシュ' },
          ],
        },
      ],
    },
    {
      title: 'AT引き戻し（最重要）', icon: '⚡',
      groups: [
        {
          label: 'AT引き戻し率（設定差約2倍）', columns: 2,
          fields: [
            { key: 'pullback_hit', label: '引き戻し当選回数', hint: '高設定ほど大幅に優遇' },
            { key: 'pullback_total', label: 'AT終了総回数', hint: '引き戻しの分母' },
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
            { key: 'e_default', label: '墓所（デフォルト）' },
            { key: 'e_bath_m', label: 'お風呂（男性）', hint: '高設定示唆' },
            { key: 'e_bath_f', label: 'お風呂（女性）', hint: '設定2以上濃厚' },
            { key: 'e_ram_rem', label: 'ラム&レム', hint: '設定4以上濃厚!' },
            { key: 'e_tea', label: 'お茶の時間', hint: '設定5以上濃厚!' },
            { key: 'e_roten', label: '露天風呂', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: '菜月家時計（朝一確認）', icon: '🕐',
      groups: [
        {
          label: '菜月家ステージ時計表示（設定変更後）', columns: 2,
          fields: [
            { key: 'clock_3', label: '3時過ぎ', hint: '設定3以上濃厚' },
            { key: 'clock_456', label: '4時56分', hint: '設定4以上濃厚!' },
            { key: 'clock_506', label: '5時6分', hint: '設定5以上濃厚!' },
            { key: 'clock_606', label: '6時6分', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/417.2, 1/408.5, 1/387.1, 1/354.3, 1/332.9, 1/305.4] },
  ],

  binomialEntries: [
    { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.102, 0.104, 0.139, 0.160, 0.180, 0.200] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_bath_m', 'e_bath_f', 'e_ram_rem', 'e_tea', 'e_roten'],
      rates: {
        e_default:  [0.60, 0.50, 0.42, 0.32, 0.25, 0.18],
        e_bath_m:   [0.15, 0.15, 0.16, 0.16, 0.16, 0.16],
        e_bath_f:   [0.00, 0.12, 0.12, 0.12, 0.12, 0.12],
        e_ram_rem:  [0.00, 0.00, 0.00, 0.15, 0.15, 0.16],
        e_tea:      [0.00, 0.00, 0.00, 0.00, 0.12, 0.14],
        e_roten:    [0.00, 0.00, 0.00, 0.00, 0.00, 0.03],
      },
    },
    {
      keys: ['clock_3', 'clock_456', 'clock_506', 'clock_606'],
      rates: {
        clock_3:   [0.000, 0.000, 0.020, 0.020, 0.020, 0.020],
        clock_456: [0.000, 0.000, 0.000, 0.010, 0.010, 0.010],
        clock_506: [0.000, 0.000, 0.000, 0.000, 0.005, 0.005],
        clock_606: [0.000, 0.000, 0.000, 0.000, 0.000, 0.005],
      },
    },
  ],

  confirmedMin: {
    e_bath_f: 2, e_ram_rem: 4, e_tea: 5, e_roten: 6,
    clock_3: 3, clock_456: 4, clock_506: 5, clock_606: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;
    if ((input.e_roten ?? 0) >= 1 || (input.clock_606 ?? 0) >= 1) return { message: '設定6確定！確定演出を確認済み', level: 'high' };
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
    if (input.totalG == null) hints.push('総ゲーム数を入力するとAT確率の判定精度が上がります');
    if (input.pullback_hit == null) hints.push('AT引き戻し率は設定差約2倍！必ずカウント');
    if (!['e_default','e_bath_m','e_bath_f','e_ram_rem','e_tea','e_roten'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認（ラム&レム=設定4以上、露天風呂=設定6）');
    if (!['clock_3','clock_456','clock_506','clock_606'].some(k => (input[k] ?? 0) > 0))
      hints.push('朝一の菜月家時計を確認してください（6:06=設定6濃厚）');
    return hints;
  },
};

export default config;
