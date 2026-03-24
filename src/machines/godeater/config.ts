import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'godeater',
  name: 'スマスロ ゴッドイーター リザレクション',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-red-700 to-yellow-600',
  // 6段階設定（1〜6）・小役確率に設定差なし

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数' },
            { key: 'czCnt', label: 'CZ合算回数', hint: '最優先カウント対象' },
          ],
        },
      ],
    },
    {
      title: 'CZ・AT直撃', icon: '⚡',
      groups: [
        {
          label: '通常時 弱レア役→CZ当選（6倍差!）', columns: 2,
          fields: [
            { key: 'cz_weak_hit', label: '弱チェリー/スイカ→CZ当選数', hint: '設定1:0.2%→設定6:1.2%' },
            { key: 'cz_weak_total', label: '通常時弱チェリー/スイカ総数' },
          ],
        },
        {
          label: '強チェリーAT直撃（15倍差!!）', columns: 2,
          fields: [
            { key: 'direct_hit', label: '強チェリーAT直撃回数', hint: '設定1:0.4%→設定6:5.9%' },
            { key: 'strong_cherry_total', label: '強チェリー成立総数' },
          ],
        },
      ],
    },
    {
      title: 'AT終了画面', icon: '🖼️',
      groups: [
        {
          label: 'AT終了画面キャラ', columns: 4,
          fields: [
            { key: 'e_default', label: 'キャラなし', hint: 'デフォルト' },
            { key: 'e_kouta', label: 'コウタ', hint: '高設定示唆（弱）' },
            { key: 'e_soma', label: 'ソーマ', hint: '高設定示唆（強）' },
            { key: 'e_lindow', label: 'リンドウ', hint: '設定3以上濃厚' },
            { key: 'e_shio', label: 'シオ', hint: '設定4以上濃厚!' },
            { key: 'e_shugo', label: 'キャラ集合', hint: '設定5以上濃厚!' },
            { key: 'e_mini', label: 'ミニキャラ', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'トロフィー・ボイス・上乗せ', icon: '🏆',
      groups: [
        {
          label: 'ケロットトロフィー', columns: 3,
          fields: [
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_kerot', label: 'ケロット柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6濃厚!' },
          ],
        },
        {
          label: 'ストーリー終了時ボイス', columns: 3,
          fields: [
            { key: 'voice_lindow', label: 'リンドウ', hint: '設定2以上' },
            { key: 'voice_ren', label: 'レン', hint: '高設定示唆（強）' },
            { key: 'voice_shio', label: 'シオ「いただきま〜す」', hint: '設定5以上濃厚!' },
          ],
        },
        {
          label: '上乗せゾロ目', columns: 3,
          fields: [
            { key: 'add44', label: '+44', hint: '設定4以上' },
            { key: 'add55', label: '+55', hint: '設定5以上' },
            { key: 'add66', label: '+66', hint: '設定6確定!' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/351.9, 1/344.5, 1/330.1, 1/317.0, 1/302.2, 1/290.3] },
    { key: 'czCnt', totalKey: 'totalG', rates: [1/392.0, 1/378.3, 1/359.1, 1/343.4, 1/324.3, 1/310.6] },
  ],

  binomialEntries: [
    { hitKey: 'cz_weak_hit', totalKey: 'cz_weak_total', rates: [0.002, 0.004, 0.006, 0.008, 0.010, 0.012] },
    { hitKey: 'direct_hit', totalKey: 'strong_cherry_total', rates: [0.004, 0.012, 0.024, 0.043, 0.051, 0.059] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_kouta', 'e_soma', 'e_lindow', 'e_shio', 'e_shugo', 'e_mini'],
      rates: {
        e_default: [0.70, 0.65, 0.58, 0.50, 0.44, 0.38],
        e_kouta:   [0.12, 0.13, 0.14, 0.15, 0.16, 0.17],
        e_soma:    [0.08, 0.10, 0.12, 0.13, 0.14, 0.15],
        e_lindow:  [0.00, 0.00, 0.05, 0.06, 0.06, 0.07],
        e_shio:    [0.00, 0.00, 0.00, 0.05, 0.06, 0.07],
        e_shugo:   [0.00, 0.00, 0.00, 0.00, 0.05, 0.06],
        e_mini:    [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['t_silver', 't_gold', 't_kerot', 't_rainbow'],
      rates: {
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        t_kerot:   [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
  ],

  confirmedMin: {
    e_lindow: 3, e_shio: 4, e_shugo: 5, e_mini: 6,
    t_silver: 3, t_gold: 4, t_kerot: 5, t_rainbow: 6,
    voice_lindow: 2, voice_shio: 5,
    add44: 4, add55: 5, add66: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.e_mini ?? 0) >= 1 || (input.t_rainbow ?? 0) >= 1 || (input.add66 ?? 0) >= 1) {
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
    if (input.czCnt == null) hints.push('CZ合算回数は最優先カウント対象！');
    if (input.cz_weak_hit == null) hints.push('通常時の弱レア役→CZ当選は6倍差！要カウント');
    if (input.direct_hit == null) hints.push('強チェリーAT直撃は15倍差！見逃さないように');
    if (!['e_default', 'e_kouta', 'e_soma', 'e_lindow', 'e_shio', 'e_shugo', 'e_mini'].some(k => (input[k] ?? 0) > 0))
      hints.push('AT終了画面を確認（キャラ集合=設定5以上、ミニキャラ=設定6濃厚）');
    return hints;
  },
};

export default config;
