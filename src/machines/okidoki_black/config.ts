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

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.2, 98.7, 101.9, 104.8, 108.6],
  baseCoins: 32,

  checklist: [
    { id: 'ck_cherry_ab', label: 'チェリーA/B区別カウント', category: '通常時' },
    { id: 'ck_kakutei_b', label: '確定役B出現', category: '通常時' },
    { id: 'ck_mode', label: 'モード推測（32G以内=天国）', category: '通常時' },
    { id: 'ck_through', label: 'スルー回数管理', category: '通常時' },
    { id: 'ck_yuri_g', label: '有利区間G数管理', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別', category: '朝一' },
    { id: 'ck_renchain', label: '連チャンパターン', category: 'ボーナス後' },
  ],

  guide: {
    settingHunt: [
      'チェリーB確率が最重要（設定1: 1/168.0 → 設定6: 1/128.5、約1.31倍差）',
      '確定役B確率に大きな設定差（設定1: 1/16384 → 設定6: 1/6554、約2.5倍差）。超レアだが出れば高設定期待大',
      'ボーナス合算確率（設定1: 1/288.7 → 設定6: 1/243.1）も参考に',
      '32G以内天国移行率（設定1: 15% → 設定6: 26%）で設定推測。回数をカウント',
      '黒ドキモード突入率（設定1: 0.5% → 設定6: 2.0%）。突入で次回天国以上確定',
      '無音演出発生率にも設定差あり（設定1: 1% → 設定6: 7%）',
    ],
    morningCheck: [
      'リセット時40%でチャンスモード移行（天井200G）。32G以内当選ならチャンス濃厚',
      '非有利区間から通常A/B移行時は天井399Gに短縮。リセット台は200G以内に注目',
      '前日最終G数を確認し据え置き判別。800G以上なら据え置き天井999G狙い',
    ],
    quitTiming: [
      'ボーナス後32Gまで回して天国否定でやめが基本。32G以内当選なら天国ループ続行',
      '仮天井ゾーン301〜400Gに注意。300G超えたら400Gまで打ち切り推奨',
      '6スルー以上なら天井999Gまで続行推奨',
      '2000G消化してチェリーB確率が1/180以上かつ天国移行率18%以下ならやめ検討',
      '有利区間リセット後のモードを確認してからやめる。即やめ厳禁',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: '999G到達でボーナス確定（引き戻し/チャンス時200G、リセット時40%チャンスモード）',
    zones: [
      { start: 0, end: 32, label: '天国', strength: 'hot' },
      { start: 301, end: 400, label: '仮天井', strength: 'hot' },
      { start: 900, end: 999, label: '天井間近', strength: 'hot' },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1500 },
      { fromGame: 200, expectedYen: -500 },
      { fromGame: 400, expectedYen: 500 },
      { fromGame: 600, expectedYen: 1500 },
      { fromGame: 800, expectedYen: 4000 },
      { fromGame: 900, expectedYen: 7000, note: '天井間近・超期待値' },
    ],
    resetInfo: 'リセット時は40%でチャンスモードスタート',
    notes: [
      '天井は通常時のゲーム数',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: 'チェリー', name: 'チェリーB確率', timing: '通常時', settingHint: '設定1: 1/168.0 → 設定6: 1/128.5（約1.31倍差）', importance: 'weak' },
    { keyword: '確定役', name: '確定役B（スイカ小V型）', timing: '通常時', settingHint: '設定1: 1/16384 → 設定6: 1/6554（約2.5倍差）', importance: 'weak' },
    { keyword: '初当たり', name: 'ボーナス合算確率', timing: '通常時', settingHint: '設定1: 1/288.7 → 設定6: 1/243.1', importance: 'weak' },
    { keyword: '天国', name: '32G以内天国移行率', timing: 'ボーナス後', settingHint: '設定1: 15% → 設定6: 26%', importance: 'weak' },
    { keyword: '黒ドキ', name: '黒ドキモード突入', timing: '通常時', settingHint: '設定1: 0.5% → 設定6: 2.0%・次回天国以上確定', importance: 'strong' },
    { keyword: '無音', name: '無音演出発生', timing: 'ボーナス確定時', settingHint: '設定1: 1% → 設定6: 7%・高設定示唆', importance: 'weak' },
    { keyword: '遅れ', name: '遅れ発生', timing: 'ボーナス確定時', settingHint: 'ボーナス確定演出', importance: 'weak' },
    { keyword: 'フラッシュ', name: 'LEDフラッシュ', timing: 'ボーナス確定時', settingHint: 'ボーナス確定演出', importance: 'weak' },
    { keyword: '先チカ', name: '先チカ発生', timing: 'ボーナス確定時', settingHint: 'ボーナス確定演出', importance: 'weak' },
    { keyword: 'モード', name: 'チャンスモード（天井200G）', timing: 'リセット後', settingHint: 'リセット時40%移行', importance: 'weak' },
    { keyword: '仮天井', name: '仮天井ゾーン301-400G', timing: '通常時', settingHint: '仮天井でボーナス当選率UP', importance: 'weak' },
    { keyword: 'スルー', name: 'スルー天井', timing: '通常時', settingHint: '6スルーで天井・前日回数引き継ぎ', importance: 'weak' },
  ],
};

export default config;
