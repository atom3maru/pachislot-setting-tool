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
    { key: 'tp2Cnt', totalKey: 'totalG', rates: [1/2281, 1/2137, 1/1968, 1/1655, 1/1459, 1/1324] },
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

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.7, 99.1, 100.9, 105.4, 109.5, 113.7],
  baseCoins: 33,

  checklist: [
    { id: 'ck_at', label: 'AT初当たり確率をカウントしているか', category: '通常時' },
    { id: 'ck_endscreen', label: '終了画面の枠色を確認（金枠=設定6濃厚）', category: 'AT終了時' },
    { id: 'ck_stechen', label: 'ステチェン回数をカウント（ボーナス間19回/AT間40回で天井）', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別（ボーナス間13回/AT間17回に短縮）を確認', category: '朝一' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率が最重要（設定1: 1/416 → 設定6: 1/292、約1.42倍差）。2000G以上で判断',
      'TP2突入率に大きな設定差（設定1: 1/2281 → 設定6: 1/1324、約1.72倍差）',
      '本機は小役確率に設定差なし（全設定共通1/7.2）。小役カウントは不要',
      'CZ中パーセント表示：44%=設定4↑確定、55%=設定5↑確定、66%=設定6確定',
      '終了画面枠色：銅枠=設定2↑、銀枠=設定4↑、金枠(オルステッド)=設定6濃厚',
      'AT開始画面：ヒトガミ=設定4↑、前世の男=設定5↑、オルステッド=設定6濃厚',
    ],
    morningCheck: [
      'リセット時はボーナス間ステチェン天井13回/AT間天井17回に大幅短縮（通常19回/40回）',
      'リセット判別：ステチェン回数がデータ機で確認不可のため、早い当選=リセット濃厚',
      'リセット台は0Gから期待値プラス級。AT間天井17回短縮が強力',
      'AT駆け抜け後・魔術ボーナスAT非当選後もボーナス間天井13回に短縮',
    ],
    quitTiming: [
      '天井はステチェン回数管理（G数ではない）。ステチェン回数を必ず把握してやめ判断',
      'ボーナス間ステチェン15回以上なら天井19回まで続行推奨',
      '2000G消化してAT初当たりが1/450以下＋確定演出なしならやめ検討',
      '金枠・オルステッド系の確定演出が一切なければ低設定濃厚。早めの見切りを',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: 'ボーナス間ステチェン19回/AT間ステチェン40回で天井',
    zones: [
      { start: 0, end: 100, label: 'リセット後（AT間天井17回短縮）', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -500, note: '0Gから打つと微マイナス' },
      { fromGame: 300, expectedYen: 200 },
      { fromGame: 600, expectedYen: 1500 },
      { fromGame: 750, expectedYen: 2500, note: '天井狙い目（概算）' },
    ],
    resetInfo: 'リセット時はボーナス間天井13回/AT間天井17回に短縮',
    notes: [
      '天井はG数ではなくステチェン回数で管理',
      'リセット後はAT間天井が17回に短縮され狙い目',
      '期待値は設定1・等価換金で概算',
    ],
  },

  dictionary: [
    { keyword: 'パーセント', name: 'CZ中66%表示', timing: 'CZ中', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: 'パーセント', name: 'CZ中55%表示', timing: 'CZ中', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: 'パーセント', name: 'CZ中44%表示', timing: 'CZ中', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数666枚表示', timing: 'AT中', settingHint: '設定6確定', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数555枚表示', timing: 'AT中', settingHint: '設定5以上確定', importance: 'confirmed' },
    { keyword: '枚数', name: '獲得枚数444枚/456枚表示', timing: 'AT中', settingHint: '設定4以上確定', importance: 'confirmed' },
    { keyword: '終了画面', name: '終了画面 金枠（オルステッド）', timing: 'AT終了時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '終了画面', name: '終了画面 銀枠（絆）', timing: 'AT終了時', settingHint: '設定4以上濃厚', importance: 'strong' },
    { keyword: '終了画面', name: '終了画面 銅枠（デッドエンド）', timing: 'AT終了時', settingHint: '設定2以上濃厚', importance: 'strong' },
    { keyword: '開始画面', name: 'ATセット開始画面 オルステッド', timing: 'ATセット開始時', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: '開始画面', name: 'ATセット開始画面 前世の男', timing: 'ATセット開始時', settingHint: '設定5以上濃厚', importance: 'strong' },
    { keyword: '開始画面', name: 'ATセット開始画面 ヒトガミ', timing: 'ATセット開始時', settingHint: '設定4以上濃厚', importance: 'strong' },
    { keyword: 'ストーリー', name: '魔術ボーナス中第21話（金枠）', timing: 'ボーナス中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'ストーリー', name: '魔術ボーナス中第8話（銀枠）', timing: 'ボーナス中', settingHint: '設定4以上濃厚', importance: 'strong' },
    { keyword: 'ミニキャラ', name: 'ED中ミニキャラ オルステッド', timing: 'ED中', settingHint: '設定6濃厚', importance: 'confirmed' },
    { keyword: 'ミニキャラ', name: 'ED中ミニキャラ 前世の男', timing: 'ED中', settingHint: '設定5以上濃厚', importance: 'strong' },
    { keyword: 'AT', name: 'AT初当たり確率', timing: '通常時', settingHint: '設定1: 1/416 → 設定6: 1/292（約1.42倍差）', importance: 'weak' },
    { keyword: 'TP2', name: 'TP2突入率', timing: '通常時', settingHint: '設定1: 1/2281 → 設定6: 1/1324（約1.72倍差）', importance: 'weak' },
  ],
};

export default config;
