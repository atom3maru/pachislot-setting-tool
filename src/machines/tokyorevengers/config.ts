import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'tokyorevengers',
  name: 'スマスロ 東京リベンジャーズ',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-yellow-500 to-red-500',
  // 6段階設定（1,2,3,4,5,6）

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'bonusCnt', label: '初当たり合算回数' },
            { key: 'atCnt', label: 'AT回数', hint: '東卍RUSH' },
            { key: 'bellCnt', label: '共通ベル回数', hint: '通常時・左第1停止15枚ベル' },
            { key: 'chuCherry', label: '中段チェリー回数', hint: '設定差約1.5倍' },
          ],
        },
      ],
    },
    {
      title: 'リベンジフリーズ・CZ昇格', icon: '⚡',
      groups: [
        {
          label: 'リベンジフリーズ（特大設定差）', columns: 2,
          fields: [
            { key: 'revenge_hit', label: 'リベンジフリーズ発生回数', hint: '設定1:0.8%→設定6:6.2%' },
            { key: 'revenge_total', label: '3〜5周期スルー回数', hint: 'フリーズの分母' },
          ],
        },
        {
          label: '東卍CHANCE中AT昇格', columns: 2,
          fields: [
            { key: 'cz_at_hit', label: 'スイカ/弱チェリー→AT昇格数', hint: '高設定ほど優遇' },
            { key: 'cz_koyaku_total', label: 'CZ中スイカ/弱チェリー総数' },
          ],
        },
      ],
    },
    {
      title: '終了画面', icon: '🖼️',
      groups: [
        {
          label: '終了画面枠色', columns: 4,
          fields: [
            { key: 'e_red1', label: '赤枠（デフォルト）' },
            { key: 'e_blue_high', label: '青枠（高設定示唆）', hint: '高設定示唆' },
            { key: 'e_red_high', label: '赤枠（高設定強）', hint: '高設定示唆（強）' },
            { key: 'e_yellow', label: '黄枠', hint: '設定3以上濃厚' },
            { key: 'e_red4', label: '赤枠（特殊）', hint: '設定4以上濃厚!' },
            { key: 'e_purple', label: '紫枠', hint: '設定5以上濃厚!' },
            { key: 'e_gold', label: '金枠（東卍結成）', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'トロフィー・獲得枚数', icon: '🏆',
      groups: [
        {
          label: 'サミートロフィー', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_kirin', label: 'キリン柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6濃厚!' },
          ],
        },
        {
          label: '獲得枚数表示', columns: 3,
          fields: [
            { key: 'm456', label: '456枚OVER', hint: '設定4以上濃厚' },
            { key: 'm555', label: '555枚OVER', hint: '設定5以上濃厚' },
            { key: 'm666', label: '666枚OVER', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
  ],

  probEntries: [
    { key: 'bonusCnt', totalKey: 'totalG', rates: [1/282.4, 1/279.5, 1/272.2, 1/255.8, 1/249.1, 1/240.1] },
    { key: 'atCnt', totalKey: 'totalG', rates: [1/482.2, 1/474.7, 1/456.9, 1/414.0, 1/393.8, 1/373.1] },
    { key: 'bellCnt', totalKey: 'totalG', rates: [1/99.3, 1/96.4, 1/89.8, 1/84.0, 1/79.0, 1/77.1] },
    { key: 'chuCherry', totalKey: 'totalG', rates: [1/16384.0, 1/16384.0, 1/13107.2, 1/13107.2, 1/10922.7, 1/10922.7] },
  ],

  binomialEntries: [
    { hitKey: 'revenge_hit', totalKey: 'revenge_total', rates: [0.008, 0.012, 0.020, 0.032, 0.048, 0.062] },
    { hitKey: 'cz_at_hit', totalKey: 'cz_koyaku_total', rates: [0.102, 0.110, 0.125, 0.140, 0.155, 0.164] },
  ],

  categoricalGroups: [
    {
      keys: ['e_red1', 'e_blue_high', 'e_red_high', 'e_yellow', 'e_red4', 'e_purple', 'e_gold'],
      rates: {
        e_red1:      [0.70, 0.65, 0.58, 0.50, 0.44, 0.38],
        e_blue_high: [0.12, 0.13, 0.15, 0.16, 0.17, 0.17],
        e_red_high:  [0.08, 0.10, 0.12, 0.13, 0.14, 0.15],
        e_yellow:    [0.00, 0.00, 0.05, 0.06, 0.06, 0.07],
        e_red4:      [0.00, 0.00, 0.00, 0.05, 0.06, 0.07],
        e_purple:    [0.00, 0.00, 0.00, 0.00, 0.05, 0.06],
        e_gold:      [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['t_copper', 't_silver', 't_gold', 't_kirin', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        t_kirin:   [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
    {
      keys: ['m456', 'm555', 'm666'],
      rates: {
        m456: [0.00, 0.00, 0.00, 0.03, 0.03, 0.05],
        m555: [0.00, 0.00, 0.00, 0.00, 0.02, 0.03],
        m666: [0.00, 0.00, 0.00, 0.00, 0.00, 0.02],
      },
    },
  ],

  confirmedMin: {
    e_yellow: 3, e_red4: 4, e_purple: 5, e_gold: 6,
    t_copper: 2, t_silver: 3, t_gold: 4, t_kirin: 5, t_rainbow: 6,
    m456: 4, m555: 5, m666: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.e_gold ?? 0) >= 1 || (input.t_rainbow ?? 0) >= 1 || (input.m666 ?? 0) >= 1) {
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
    if (input.bellCnt == null) hints.push('共通ベル（通常時・左第1停止）は重要な判別要素。カウントしましょう');
    if (input.revenge_hit == null) hints.push('リベンジフリーズは特大設定差あり（設定1:0.8%→設定6:6.2%）');
    if (!['e_red1', 'e_blue_high', 'e_yellow', 'e_red4', 'e_purple', 'e_gold'].some(k => (input[k] ?? 0) > 0))
      hints.push('終了画面の枠色を確認してください（紫枠=設定5以上、金枠=設定6濃厚）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.8, 98.8, 101.4, 106.3, 111.2, 114.9],
  baseCoins: 32,

  checklist: [
    { id: 'ck_sublcd', label: 'サブ液晶セリフを確認', category: 'AT終了後' },
    { id: 'ck_noise', label: '液晶ノイズを確認', category: '通常時' },
    { id: 'ck_at_start', label: 'AT開始画面を確認', category: 'AT開始時' },
    { id: 'ck_lamp', label: 'トップランプ色を確認', category: 'エンディング中' },
    { id: 'ck_cycle', label: '周期数を記録', category: '通常時' },
    { id: 'ck_through', label: 'スルー回数を記録', category: '通常時' },
    { id: 'ck_mode', label: 'モード示唆を確認', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      '共通ベル確率が重要（設定1: 1/99.3 → 設定6: 1/77.1、約1.29倍差）',
      'リベンジフリーズが最大設定差（設定1: 0.8% → 設定6: 6.2%、約7.75倍差）',
      'AT初当たり確率（設定1: 1/482.2 → 設定6: 1/373.1、約1.29倍差）',
      'サミートロフィー：銅=設定2以上、銀=設定3以上、金=設定4以上、キリン柄=設定5以上、虹=設定6濃厚',
      '終了画面枠色：黄枠=設定3以上、赤枠特殊=設定4以上、紫枠=設定5以上、金枠=設定6濃厚',
      'CZ中スイカ/弱チェリーAT昇格率（設定1: 10.2% → 設定6: 16.4%）も要チェック',
    ],
    morningCheck: [
      'リセット時は1周期目200pt短縮+モード移行優遇。0〜130G付近が狙い目',
      'サブ液晶タッチでセリフを確認。設定示唆セリフが出れば高設定期待度UP',
      '前日最終G数を確認し、据え置きかリセットかを判別する',
      'リセット台は1周期目が大チャンス。モードB以上滞在率も高い',
    ],
    quitTiming: [
      'AT終了後はサブ液晶セリフ・トロフィー・枠色を確認してから即やめ',
      '液晶ノイズ発生時は消滅するまで絶対に続行（高モード示唆）',
      'モードB以上確定演出が出たらAT当選まで続行推奨',
      '3000G時点でAT初当たり1/450以上・共通ベル1/90以上なら低設定濃厚',
      '天井1190G到達間近（残り200G以内）なら打ち切り推奨',
    ],
  },

  hyena: {
    ceilingGame: 1190,
    ceilingBenefit: '1190G到達でAT確定（リセット1周期目200pt短縮/モード移行優遇）',
    zones: [
      { start: 0, end: 130, label: '1周期目（リセット時200pt短縮）', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1500 },
      { fromGame: 250, expectedYen: -300 },
      { fromGame: 450, expectedYen: 1000 },
      { fromGame: 600, expectedYen: 2000 },
      { fromGame: 800, expectedYen: 4000 },
      { fromGame: 1000, expectedYen: 7000 },
    ],
    resetInfo: 'リセット時は1周期目200pt短縮、モード移行優遇',
    notes: [
      '天井は通常時1190G',
      'リセット時は1周期目短縮が狙い目',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'トロフィー', name: 'サミートロフィー 虹', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'サミートロフィー キリン柄', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'サミートロフィー 金', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'サミートロフィー 銀', timing: 'AT終了時', settingHint: '設定3以上確定', importance: 'confirmed' },
    { keyword: 'トロフィー', name: 'サミートロフィー 銅', timing: 'AT終了時', settingHint: '設定2以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: '終了画面 金枠（東卍結成）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: '終了画面 紫枠', timing: 'AT終了時', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: '終了画面 赤枠（特殊）', timing: 'AT終了時', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: '終了画面 黄枠', timing: 'AT終了時', settingHint: '設定3以上濃厚', importance: 'strong' },
    { keyword: '終了画面', name: '終了画面 赤枠（高設定強）', timing: 'AT終了時', settingHint: '高設定示唆（強）', importance: 'strong' },
    { keyword: '終了画面', name: '終了画面 青枠', timing: 'AT終了時', settingHint: '高設定示唆', importance: 'weak' },
    { keyword: '枚数', name: '獲得枚数 666枚OVER', timing: 'AT中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 555枚OVER', timing: 'AT中', settingHint: '設定5以上濃厚', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数 456枚OVER', timing: 'AT中', settingHint: '設定4以上濃厚', importance: 'confirmed' },
    { keyword: 'フリーズ', name: 'リベンジフリーズ', timing: '3〜5周期スルー時', settingHint: '設定1: 0.8% → 設定6: 6.2%（約7.75倍差）', importance: 'strong' },
    { keyword: 'ベル', name: '共通ベル確率', timing: '通常時', settingHint: '設定1: 1/99.3 → 設定6: 1/77.1（約1.29倍差）', importance: 'strong' },
    { keyword: 'CZ', name: 'CZ中スイカ/弱チェリーAT昇格率', timing: 'CZ中', settingHint: '設定1: 10.2% → 設定6: 16.4%', importance: 'weak' },
    { keyword: '初当たり', name: 'AT初当たり確率', timing: '通常時', settingHint: '設定1: 1/482.2 → 設定6: 1/373.1（約1.29倍差）', importance: 'weak' },
  ],
};

export default config;
