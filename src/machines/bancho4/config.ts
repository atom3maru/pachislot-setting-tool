import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'bancho4',
  name: '押忍！番長4',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-amber-600 to-orange-600',
  // 6段階設定（1,2,3,4,5,6）

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: '初当たり合算回数' },
            { key: 'directCnt', label: 'AT直撃回数', hint: '頂RISE/UP・設定差約3倍!' },
            { key: 'bellCnt', label: '共通ベル回数', hint: '左第1停止ベル揃い' },
          ],
        },
      ],
    },
    {
      title: '青7BB・確定対決', icon: '⚡',
      groups: [
        {
          label: '青7ボーナス（天国以外）', columns: 2,
          fields: [
            { key: 'blue7_hit', label: '青7BB当選回数', hint: '設定1と6で約6.7倍差!' },
            { key: 'blue7_total', label: 'BB当選総数（天国以外）', hint: '青7の分母' },
          ],
        },
        {
          label: 'RB後確定対決', columns: 2,
          fields: [
            { key: 'kakutei_hit', label: '確定対決当選回数', hint: '設定1と6で約13倍差!' },
            { key: 'rb_total', label: 'RB後特訓総数', hint: '確定対決の分母' },
          ],
        },
      ],
    },
    {
      title: 'AT終了画面', icon: '🖼️',
      groups: [
        {
          label: 'AT・ボーナス終了画面', columns: 4,
          fields: [
            { key: 'e_default', label: '轟（デフォルト）' },
            { key: 'e_hamburg', label: 'ハンバーグ', hint: '偶数設定示唆' },
            { key: 'e_safari', label: 'サファリ', hint: '高設定示唆（弱）' },
            { key: 'e_shopping', label: 'ショッピング', hint: '高設定示唆（強）' },
            { key: 'e_chatsumi', label: '茶摘み', hint: '設定4以上確定!' },
            { key: 'e_racequeen', label: 'レースクイーン', hint: '設定5以上確定!' },
            { key: 'e_onsen', label: '温泉', hint: '設定6確定!!' },
          ],
        },
      ],
    },
    {
      title: 'エンディング中キャラ', icon: '👤',
      groups: [
        {
          label: 'ベルカウンター7到達時キャラ', columns: 3,
          fields: [
            { key: 'ch_machiko', label: 'マチ子', hint: '設定4以上確定!' },
            { key: 'ch_misao', label: '操', hint: '設定5以上確定!' },
            { key: 'ch_koutetsu', label: '鋼鉄', hint: '設定6確定!!' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/259.5, 1/256.3, 1/247.6, 1/236.0, 1/225.3, 1/221.1] },
    { key: 'directCnt', totalKey: 'totalG', rates: [1/6411, 1/5624, 1/4344, 1/3053, 1/2420, 1/2150] },
    { key: 'bellCnt', totalKey: 'totalG', rates: [1/21.8, 1/21.6, 1/21.4, 1/21.2, 1/21.0, 1/20.6] },
  ],

  binomialEntries: [
    { hitKey: 'blue7_hit', totalKey: 'blue7_total', rates: [0.0117, 0.0156, 0.0273, 0.0469, 0.0625, 0.0781] },
    { hitKey: 'kakutei_hit', totalKey: 'rb_total', rates: [0.012, 0.020, 0.040, 0.070, 0.110, 0.156] },
  ],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_hamburg', 'e_safari', 'e_shopping', 'e_chatsumi', 'e_racequeen', 'e_onsen'],
      rates: {
        e_default:   [0.70, 0.60, 0.55, 0.48, 0.42, 0.36],
        e_hamburg:   [0.15, 0.20, 0.15, 0.18, 0.15, 0.18],
        e_safari:    [0.08, 0.10, 0.13, 0.13, 0.15, 0.15],
        e_shopping:  [0.04, 0.06, 0.10, 0.10, 0.12, 0.12],
        e_chatsumi:  [0.00, 0.00, 0.00, 0.04, 0.05, 0.06],
        e_racequeen: [0.00, 0.00, 0.00, 0.00, 0.04, 0.05],
        e_onsen:     [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
  ],

  confirmedMin: {
    e_chatsumi: 4, e_racequeen: 5, e_onsen: 6,
    ch_machiko: 4, ch_misao: 5, ch_koutetsu: 6,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.e_onsen ?? 0) >= 1 || (input.ch_koutetsu ?? 0) >= 1) {
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
    if (input.directCnt == null) hints.push('AT直撃回数は設定差約3倍！必ずカウントしましょう');
    if (input.blue7_hit == null) hints.push('天国以外での青7BB当選は設定差約6.7倍の重要要素');
    if (!['e_default', 'e_hamburg', 'e_safari', 'e_shopping', 'e_chatsumi', 'e_racequeen', 'e_onsen'].some(k => (input[k] ?? 0) > 0))
      hints.push('終了画面を確認してください（茶摘み=設定4以上、温泉=設定6確定）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.8, 98.9, 101.5, 106.0, 110.0, 113.1],
  baseCoins: 33,

  checklist: [
    { id: 'ck_direct', label: 'AT直撃回数をカウントしているか', category: '通常時' },
    { id: 'ck_blue7', label: '天国以外での青7BB当選を確認', category: 'ボーナス中' },
    { id: 'ck_endscreen', label: '終了画面を確認（茶摘み=設定4↑、温泉=設定6）', category: 'AT終了時' },
    { id: 'ck_ceiling', label: '特訓間・ボーナス間G数をメモ', category: '通常時' },
    { id: 'ck_through', label: 'スルー回数をカウント', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別（押忍モード149G以内）を確認', category: '朝一' },
  ],

  guide: {
    settingHunt: [
      'AT直撃確率が最重要（設定1: 1/6411 → 設定6: 1/2150、約2.98倍差）。1回でも高設定期待大',
      '青7BB当選率（天国以外）に大きな設定差（設定1: 1.17% → 設定6: 7.81%、約6.7倍差）',
      'RB後確定対決当選率（設定1: 1.2% → 設定6: 15.6%、約13倍差）が最大の設定差要素',
      '終了画面：茶摘み=設定4↑確定、レースクイーン=設定5↑確定、温泉=設定6確定',
      'EDベルカウンター7到達時：マチ子=設定4↑確定、操=設定5↑確定、鋼鉄=設定6確定',
      '共通ベル確率（設定1: 1/21.8 → 設定6: 1/20.6）は差が小さいが長時間で有効',
    ],
    morningCheck: [
      'リセット時は押忍モード確定（149G以内に特訓突入）。0Gから打つ価値あり',
      'リセット時スルー天井が6スルーに短縮（通常10スルー）。7回目ボーナスでAT確定',
      'リセット判別：149G以内に特訓突入すればリセット濃厚',
      '前日スルー回数を確認。5スルー以上の据え置きなら天井まで続行推奨',
    ],
    quitTiming: [
      '特訓間249G天井があるため、特訓後190G以上なら249G天井まで続行推奨',
      'ボーナス間天井699G残り100G以内（600G〜）なら打ち切り推奨',
      'スルー8回以上なら10スルー天井まで必ず続行（AT確定）',
      '0〜149Gの押忍モード/天国ゾーン消化後にやめ判断。即やめ厳禁',
      '2000G消化してAT直撃0回＋青7BB0回＋確定対決0回ならやめ検討',
    ],
  },

  hyena: {
    ceilingGame: 699,
    ceilingBenefit: '特訓間249G/ボーナス間699G到達で天井、スルー天井10スルー',
    zones: [
      { start: 0, end: 149, label: '押忍モード/リセット', strength: 'hot' as const },
      { start: 50, end: 100, label: '天国', strength: 'warm' as const },
      { start: 190, end: 249, label: '特訓間天井', strength: 'warm' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -800, note: '0Gから打つとマイナス' },
      { fromGame: 200, expectedYen: 200, note: '特訓間天井付近' },
      { fromGame: 250, expectedYen: 500 },
      { fromGame: 400, expectedYen: 1500 },
      { fromGame: 550, expectedYen: 2500, note: 'ボーナス間天井狙い目' },
    ],
    resetInfo: 'リセット時は押忍モード確定（149G以内）、スルー天井6スルーに短縮',
    notes: [
      '特訓間天井249Gとボーナス間天井699Gの二段構え',
      'スルー天井は10スルー（リセット時6スルー）',
      '期待値は設定1・等価換金で計算',
    ],
  },

  dictionary: [
    { keyword: '終了画面', name: 'AT終了画面 温泉', timing: 'AT終了時', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 レースクイーン', timing: 'AT終了時', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 茶摘み', timing: 'AT終了時', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: 'AT終了画面 ショッピング', timing: 'AT終了時', settingHint: '高設定示唆（強）', importance: 'strong' },
    { keyword: '終了画面', name: 'AT終了画面 サファリ', timing: 'AT終了時', settingHint: '高設定示唆（弱）', importance: 'weak' },
    { keyword: '終了画面', name: 'AT終了画面 ハンバーグ', timing: 'AT終了時', settingHint: '偶数設定示唆', importance: 'weak' },
    { keyword: 'キャラ', name: 'EDベルカウンター7 鋼鉄', timing: 'エンディング中', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: 'キャラ', name: 'EDベルカウンター7 操', timing: 'エンディング中', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'キャラ', name: 'EDベルカウンター7 マチ子', timing: 'エンディング中', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '直撃', name: 'AT直撃確率', timing: '通常時', settingHint: '設定1: 1/6411 → 設定6: 1/2150（約2.98倍差）', importance: 'weak' },
    { keyword: '青7', name: '青7BB当選率（天国以外）', timing: 'ボーナス当選時', settingHint: '設定1: 1.17% → 設定6: 7.81%（約6.7倍差）', importance: 'weak' },
    { keyword: '確定対決', name: 'RB後確定対決当選率', timing: 'RB後特訓', settingHint: '設定1: 1.2% → 設定6: 15.6%（約13倍差）', importance: 'weak' },
    { keyword: 'ベル', name: '共通ベル確率', timing: '通常時', settingHint: '設定1: 1/21.8 → 設定6: 1/20.6', importance: 'weak' },
    { keyword: '初当たり', name: '初当たり合算確率', timing: '通常時', settingHint: '設定1: 1/259.5 → 設定6: 1/221.1', importance: 'weak' },
  ],

  gameFlow: {
    nodes: [
      { id: 'normal', label: '通常時', description: 'レア役やベルで対決・特訓を抽選。特訓間天井249G', color: 'blue' },
      { id: 'tokkun', label: '特訓', description: '対決の前段階。レア役で対決昇格のチャンス', color: 'amber' },
      { id: 'taiketsu', label: '対決', description: '勝利でボーナス確定。ベル・レア役で勝利抽選', color: 'green' },
      { id: 'bonus_bb', label: 'BB（番長ボーナス）', description: '赤7/青7揃い。AT突入のメイン契機', color: 'purple' },
      { id: 'bonus_rb', label: 'RB（レギュラー）', description: 'RB後は特訓経由で確定対決のチャンス', color: 'cyan' },
      { id: 'at', label: '頂RISE（AT）', description: 'G数上乗せ型AT。初期50G・純増約2.7枚', color: 'red' },
      { id: 'at_up', label: '頂UP（上位AT）', description: '上位AT。大量上乗せのチャンス', color: 'red' },
    ],
    edges: [
      { from: 'normal', to: 'tokkun', label: 'レア役・規定G数' },
      { from: 'tokkun', to: 'taiketsu', label: '対決発展' },
      { from: 'tokkun', to: 'normal', label: '対決非発展' },
      { from: 'taiketsu', to: 'bonus_bb', label: '勝利（BB）' },
      { from: 'taiketsu', to: 'bonus_rb', label: '勝利（RB）' },
      { from: 'taiketsu', to: 'normal', label: '敗北' },
      { from: 'bonus_bb', to: 'at', label: '7揃いでAT突入' },
      { from: 'bonus_bb', to: 'normal', label: 'AT非突入' },
      { from: 'bonus_rb', to: 'tokkun', label: 'RB後特訓（確定対決チャンス）' },
      { from: 'at', to: 'normal', label: '終了' },
      { from: 'at', to: 'at_up', label: '頂UP昇格' },
      { from: 'at_up', to: 'at', label: '上乗せ後ATへ' },
      { from: 'normal', to: 'at', label: 'AT直撃（頂RISE/UP）' },
    ],
    notes: [
      '特訓間天井249Gとボーナス間天井699Gの二段構え',
      'スルー天井は10スルー（リセット時6スルー）',
      'リセット時は押忍モード確定（149G以内に特訓突入）',
      '青7BB当選率に設定差約6.7倍、RB後確定対決に約13倍の設定差',
    ],
  },

  stages: [
    { name: '河川敷', color: 'blue', meaning: '基本ステージ。通常状態を示唆', tips: 'デフォルトステージ。特に示唆なし' },
    { name: '屋上', color: 'green', meaning: '基本ステージ。通常状態を示唆', tips: 'デフォルトステージ。河川敷と同様' },
    { name: '港（夕方）', color: 'amber', meaning: '高確ステージ。レア役からの特訓当選率UP・宗次郎ポイント優遇', settingHint: '弱チェリー・弁当からの移行で高確示唆', tips: 'レア役を引けば特訓に期待。即ヤメ厳禁' },
    { name: '特訓ステージ', color: 'red', meaning: '対決の前段階。レア役で対決昇格チャンス', tips: 'レア役を引いて対決に発展させたい。色付き演出に注目' },
  ],

  playGuide: {
    basicHow: '通常時は左リール枠上〜上段にBAR狙い（チェリー狙い）。弁当出現時は中リールBAR目安に弁当狙い。右リールはフリー打ち',
    reelStops: [
      { name: '共通ベル', how: '左1stで適当打ち', stopForm: 'ベルが揃う（左第1停止）', settingDiff: '設定1: 1/21.8 → 設定6: 1/20.6',
        reelPattern: { left: ['空', 'ベル', '空'], center: ['空', 'ベル', '空'], right: ['空', 'ベル', '空'], highlightLine: 'center' },
      },
      { name: 'チェリー', how: '左BAR狙い', stopForm: 'チェリーが角に停止',
        reelPattern: { left: ['空', '空', 'チェ'], center: ['空', '空', '空'], right: ['空', '空', '空'] },
      },
      { name: '弁当', how: '左上段BAR→中リールBAR目安に弁当狙い', stopForm: '弁当が揃う',
        reelPattern: { left: ['空', '弁当', '空'], center: ['空', '弁当', '空'], right: ['空', '弁当', '空'], highlightLine: 'center' },
      },
      { name: 'チャンス目', how: '左BAR狙い', stopForm: 'ベル/リプレイテンパイハズレ',
        reelPattern: { left: ['空', 'ベル', '空'], center: ['空', 'ベル', '空'], right: ['空', 'リプ', '空'] },
      },
      { name: '最強チェリー', how: '左BAR狙い', stopForm: '中段チェリー（プレミア・AT確定級）',
        reelPattern: { left: ['空', 'チェ', '空'], center: ['空', '空', '空'], right: ['空', '空', '空'], highlightLine: 'center' },
      },
    ],
    notes: [
      '通常時は毎G左リールBAR狙いが必須',
      'AT中はナビに従う（押し順ナビ発生時）',
      '共通ベルは左第1停止で揃うベル。設定差は小さいが長時間で有効',
    ],
  },
};

export default config;
