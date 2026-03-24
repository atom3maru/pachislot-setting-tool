import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'umineko',
  name: 'Lパチスロ うみねこのなく頃に2',
  version: '1.0.0',
  color: 'bg-gradient-to-r from-blue-800 to-cyan-700',

  sections: [
    {
      title: '確率系データ', icon: '🦋',
      groups: [{
        columns: 3,
        fields: [
          { key: 'totalG', label: '総ゲーム数' },
          { key: 'bigCnt', label: 'BIG回数' },
          { key: 'regCnt', label: 'REG回数' },
          { key: 'bonusCnt', label: 'ボーナス合算回数', hint: 'BIG+REG合算' },
        ],
      }],
    },
    {
      title: 'REG中設定差', icon: '🎰',
      groups: [
        {
          label: 'REG中・青7揃い', columns: 2,
          fields: [
            { key: 'blue7_hit', label: '青7揃い回数', hint: '高設定ほど高い' },
            { key: 'blue7_total', label: 'REG中総ゲーム数', hint: '分母' },
          ],
        },
      ],
    },
    {
      title: '設定示唆演出', icon: '🎬',
      groups: [
        {
          label: 'ステージチェンジ・ロゴ発光', columns: 2,
          fields: [
            { key: 'logo_small', label: 'ロゴ発光・小', hint: '奇数設定で多い' },
            { key: 'logo_big', label: 'ロゴ発光・大', hint: '偶数設定で多い' },
          ],
        },
        {
          label: '超パー演出（表示%）', columns: 3,
          fields: [
            { key: 'sp_22', label: '22%表示', hint: '設定2以上UP' },
            { key: 'sp_33', label: '33%表示', hint: '設定3以上濃厚' },
            { key: 'sp_44', label: '44%表示', hint: '設定4以上濃厚' },
            { key: 'sp_55', label: '55%表示', hint: '設定5以上濃厚' },
            { key: 'sp_66', label: '66%表示', hint: '設定6濃厚!' },
            { key: 'sp_88', label: '88%表示', hint: '設定2以上+BB濃厚' },
          ],
        },
        {
          label: 'ボーナス終了画面', columns: 3,
          fields: [
            { key: 'end_normal', label: '都会(デフォルト)' },
            { key: 'end_sennin', label: '戦人一家', hint: '設定2以上濃厚' },
            { key: 'end_even', label: 'ベアト&戦人(1)', hint: '偶数設定示唆' },
            { key: 'end_4plus', label: 'ベアト&戦人(2)', hint: '設定4以上濃厚!' },
            { key: 'end_5plus', label: 'ベアト&GM戦人(1)', hint: '設定5以上濃厚!' },
            { key: 'end_6', label: 'ベアト&GM戦人(2)', hint: '設定6濃厚!' },
            { key: 'end_halloween', label: 'ハロウィン', hint: '設定4以上確定!' },
          ],
        },
        {
          label: 'RB中キャラ紹介背景', columns: 2,
          fields: [
            { key: 'bg_silver', label: '全銀背景', hint: '設定2以上濃厚' },
            { key: 'bg_gold', label: '全金背景', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/189.4, 1/184.6, 1/179.1, 1/174.8, 1/170.7, 1/167.6] },
    { key: 'bigCnt', totalKey: 'totalG', rates: [1/362.1, 1/350.5, 1/337.8, 1/327.7, 1/319.7, 1/313.6] },
    { key: 'regCnt', totalKey: 'totalG', rates: [1/397.2, 1/390.1, 1/381.0, 1/374.5, 1/366.1, 1/360.1] },
  ],

  binomialEntries: [
    // REG中の青7揃い
    { hitKey: 'blue7_hit', totalKey: 'blue7_total', rates: [1/117.0, 1/113.0, 1/111.1, 1/99.3, 1/95.5, 1/94.2] },
  ],

  categoricalGroups: [
    {
      keys: ['logo_small', 'logo_big'],
      rates: {
        logo_small: [0.292, 0.250, 0.312, 0.250, 0.333, 0.250],
        logo_big:   [0.708, 0.750, 0.688, 0.750, 0.667, 0.750],
      },
    },
    {
      keys: ['end_normal', 'end_sennin', 'end_even', 'end_4plus', 'end_5plus', 'end_6', 'end_halloween'],
      rates: {
        end_normal:    [0.950, 0.880, 0.870, 0.820, 0.790, 0.730],
        end_sennin:    [0.000, 0.030, 0.030, 0.030, 0.030, 0.030],
        end_even:      [0.020, 0.040, 0.020, 0.040, 0.020, 0.040],
        end_4plus:     [0.000, 0.000, 0.000, 0.040, 0.050, 0.060],
        end_5plus:     [0.000, 0.000, 0.000, 0.000, 0.030, 0.040],
        end_6:         [0.000, 0.000, 0.000, 0.000, 0.000, 0.020],
        end_halloween: [0.000, 0.000, 0.000, 0.020, 0.030, 0.030],
      },
    },
    {
      keys: ['bg_silver', 'bg_gold'],
      rates: {
        bg_silver: [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        bg_gold:   [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
      },
    },
    {
      keys: ['sp_22', 'sp_33', 'sp_44', 'sp_55', 'sp_66', 'sp_88'],
      rates: {
        sp_22: [0.000, 0.050, 0.050, 0.050, 0.050, 0.050],
        sp_33: [0.000, 0.000, 0.030, 0.030, 0.030, 0.030],
        sp_44: [0.000, 0.000, 0.000, 0.020, 0.020, 0.020],
        sp_55: [0.000, 0.000, 0.000, 0.000, 0.015, 0.015],
        sp_66: [0.000, 0.000, 0.000, 0.000, 0.000, 0.010],
        sp_88: [0.000, 0.010, 0.010, 0.010, 0.010, 0.010],
      },
    },
  ],

  confirmedMin: {
    sp_33: 3, sp_44: 4, sp_55: 5, sp_66: 6,
    sp_88: 2, sp_22: 2,
    bg_silver: 2, bg_gold: 6,
    end_sennin: 2, end_4plus: 4, end_5plus: 5, end_6: 6, end_halloween: 4,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.end_6 ?? 0) >= 1) return { message: '設定6濃厚！ベアト&GM戦人(2)を確認済み', level: 'high' };
    if ((input.bg_gold ?? 0) >= 1 || (input.sp_66 ?? 0) >= 1) return { message: '設定6濃厚！確定演出を確認済み', level: 'high' };
    if (cMin >= 5) return { message: `設定${cMin}以上確定！（設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    if (cMin >= 4) return { message: `設定4以上確定！（設定4: ${(p[3]*100).toFixed(1)}% / 設定5: ${(p[4]*100).toFixed(1)}% / 設定6: ${(p[5]*100).toFixed(1)}%）`, level: 'high' };
    const p56 = p[4] + p[5];
    if (p56 > 0.60) return { message: `高設定濃厚！続行推奨（設定5・6合算: ${(p56*100).toFixed(1)}%）`, level: 'high' };
    const p456 = p[3] + p[4] + p[5];
    if (p456 > 0.65) return { message: `中〜高設定の可能性あり（設定4以上合算: ${(p456*100).toFixed(1)}%）`, level: 'mid' };
    if (p[0] > 0.40) return { message: `設定1の可能性が高い（${(p[0]*100).toFixed(1)}%）。ヤメ時検討`, level: 'low' };
    return { message: `最有力: 設定${result.mostLikely}（${(p[result.mostLikely-1]*100).toFixed(1)}%）`, level: 'low' };
  },

  getHints: (input) => {
    const hints: string[] = [];
    if (input.totalG == null) hints.push('総ゲーム数を入力すると精度が上がります');
    if (input.bonusCnt == null) hints.push('ボーナス合算回数は重要な設定差要素です');
    if (!['logo_small','logo_big'].some(k => (input[k] ?? 0) > 0))
      hints.push('ステージチェンジのロゴ発光を確認してください（偶奇判別）');
    if (!['sp_22','sp_33','sp_44','sp_55','sp_66','sp_88'].some(k => (input[k] ?? 0) > 0))
      hints.push('超パー演出の表示%を確認してください');
    if (!['end_normal','end_sennin','end_even','end_4plus','end_5plus','end_6','end_halloween'].some(k => (input[k] ?? 0) > 0))
      hints.push('ボーナス終了画面を確認してください（ハロウィン=設定4以上確定）');
    return hints;
  },
};

export default config;
