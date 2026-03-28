import type { MachineConfig } from '../../types/machine';

const config: MachineConfig = {
  id: 'monhunrise',
  name: 'スマスロ モンスターハンターライズ',
  version: '1.1.0',
  color: 'bg-gradient-to-r from-emerald-700 to-lime-600',
  // 6段階設定（1〜6）・小役確率に設定差なし

  sections: [
    {
      title: '確率系データ', icon: '🎰',
      groups: [
        {
          columns: 3,
          fields: [
            { key: 'totalG', label: '総ゲーム数', hint: '通常時+AT中合算' },
            { key: 'atCnt', label: 'AT初当たり回数', hint: '設定4以上で大幅UP' },
            { key: 'directCnt', label: 'AT直撃回数', hint: '1回でも高設定期待大!' },
          ],
        },
      ],
    },
    {
      title: 'ボーナス終了画面', icon: '🖼️',
      groups: [
        {
          label: 'PUSH後終了画面', columns: 4,
          fields: [
            { key: 'e_default', label: 'デフォルト' },
            { key: 'e_you', label: 'YOU', hint: '高設定示唆' },
            { key: 'e_lara', label: 'Lara&ミランダ&隊長', hint: '高設定示唆（強）' },
            { key: 'e_zenin', label: '全員集合', hint: '設定5以上濃厚!' },
            { key: 'e_lion', label: 'エンタライオン', hint: '設定6濃厚!!' },
          ],
        },
      ],
    },
    {
      title: 'エンタトロフィー', icon: '🏆',
      groups: [
        {
          label: 'エンタトロフィー（AT終了時）', columns: 3,
          fields: [
            { key: 't_copper', label: '銅トロフィー', hint: '設定2以上' },
            { key: 't_silver', label: '銀トロフィー', hint: '設定3以上' },
            { key: 't_gold', label: '金トロフィー', hint: '設定4以上' },
            { key: 't_momiji', label: '紅葉柄', hint: '設定5以上!' },
            { key: 't_rainbow', label: '虹トロフィー', hint: '設定6濃厚!' },
          ],
        },
      ],
    },
    {
      title: 'ボイス・その他', icon: '🔊',
      groups: [
        {
          label: '特殊ボイス', columns: 3,
          fields: [
            { key: 'v_utsushi', label: 'ウツシボイス', hint: '設定5以上濃厚!' },
            { key: 'v_hinoe', label: 'ヒノエボイス', hint: '設定6濃厚!' },
            { key: 'v_lion', label: 'エンタライオン咆哮', hint: '設定6濃厚!!' },
          ],
        },
        {
          label: 'ボーナス確定画面キャラ', columns: 2,
          fields: [
            { key: 'kakutei_4up', label: 'Lara&ミランダ&隊長', hint: '設定4以上濃厚' },
            { key: 'kakutei_none', label: '上記以外' },
          ],
        },
      ],
    },
  ],

  // 6段階設定
  probEntries: [
    { key: 'atCnt', totalKey: 'totalG', rates: [1/309.5, 1/301.4, 1/290.8, 1/256.4, 1/237.1, 1/230.8] },
    { key: 'directCnt', totalKey: 'totalG', rates: [1/20000, 1/15000, 1/10000, 1/7000, 1/5000, 1/4000] },
  ],

  binomialEntries: [],

  categoricalGroups: [
    {
      keys: ['e_default', 'e_you', 'e_lara', 'e_zenin', 'e_lion'],
      rates: {
        e_default: [0.80, 0.75, 0.70, 0.62, 0.55, 0.48],
        e_you:     [0.10, 0.12, 0.14, 0.16, 0.18, 0.20],
        e_lara:    [0.05, 0.07, 0.09, 0.12, 0.14, 0.16],
        e_zenin:   [0.00, 0.00, 0.00, 0.00, 0.05, 0.06],
        e_lion:    [0.00, 0.00, 0.00, 0.00, 0.00, 0.01],
      },
    },
    {
      keys: ['t_copper', 't_silver', 't_gold', 't_momiji', 't_rainbow'],
      rates: {
        t_copper:  [0.000, 0.020, 0.020, 0.020, 0.020, 0.020],
        t_silver:  [0.000, 0.000, 0.010, 0.010, 0.010, 0.010],
        t_gold:    [0.000, 0.000, 0.000, 0.005, 0.005, 0.005],
        t_momiji:  [0.000, 0.000, 0.000, 0.000, 0.003, 0.005],
        t_rainbow: [0.000, 0.000, 0.000, 0.000, 0.000, 0.002],
      },
    },
  ],

  confirmedMin: {
    e_zenin: 5, e_lion: 6,
    t_copper: 2, t_silver: 3, t_gold: 4, t_momiji: 5, t_rainbow: 6,
    v_utsushi: 5, v_hinoe: 6, v_lion: 6,
    kakutei_4up: 4,
  },

  getJudgment: (input, result) => {
    const p = result.probabilities;
    const cMin = result.confirmedMin ?? 1;

    if ((input.e_lion ?? 0) >= 1 || (input.t_rainbow ?? 0) >= 1 || (input.v_hinoe ?? 0) >= 1 || (input.v_lion ?? 0) >= 1) {
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
    if (input.directCnt == null) hints.push('AT直撃は1回でも高設定期待大！見逃さないように');
    hints.push('本機は小役確率に設定差なし。小役カウントは不要です');
    if (!['e_default', 'e_you', 'e_lara', 'e_zenin', 'e_lion'].some(k => (input[k] ?? 0) > 0))
      hints.push('ボーナス終了画面を必ず確認（全員集合=設定5以上、エンタライオン=設定6）');
    if (!['t_copper', 't_silver', 't_gold', 't_momiji', 't_rainbow'].some(k => (input[k] ?? 0) > 0))
      hints.push('エンタトロフィーを確認してください（紅葉=設定5以上、虹=設定6）');
    return hints;
  },

  // ========================================
  // 拡張機能データ
  // ========================================

  payoutRates: [97.9, 98.8, 100.3, 105.4, 110.1, 114.3],
  baseCoins: 33,

  checklist: [
    { id: 'ck_direct', label: 'AT直撃回数をカウントしているか', category: '通常時' },
    { id: 'ck_endscreen', label: 'ボーナス終了画面を確認（全員集合=設定5↑、エンタライオン=設定6）', category: 'ボーナス終了時' },
    { id: 'ck_trophy', label: 'エンタトロフィーを確認（紅葉=設定5↑、虹=設定6）', category: 'AT終了時' },
    { id: 'ck_quest', label: 'クエストスルー回数をカウント（7回で天井）', category: '通常時' },
    { id: 'ck_reset', label: 'リセット判別（天国準備75%）を確認', category: '朝一' },
    { id: 'ck_zone', label: 'カムラポイントゾーン到達を確認', category: '通常時' },
  ],

  guide: {
    settingHunt: [
      'AT初当たり確率が最重要（設定1: 1/309.5 → 設定6: 1/230.8、約1.34倍差）',
      'AT直撃確率に大きな設定差（設定1: 1/20000 → 設定6: 1/4000、5倍差）。1回でも高設定期待大',
      '本機は小役確率に設定差なし（全設定共通1/6.9）。小役カウントは不要',
      'エンタトロフィー：銅=設定2↑、銀=設定3↑、金=設定4↑、紅葉=設定5↑、虹=設定6濃厚',
      '終了画面：全員集合=設定5以上濃厚、エンタライオン=設定6濃厚',
      'ボイス：ウツシ=設定5↑濃厚、ヒノエ/エンタライオン咆哮=設定6濃厚',
    ],
    morningCheck: [
      'リセット時は天国準備移行率75%と大幅優遇。0Gから期待値プラス級',
      'G数天井999Gとクエストスルー天井7回の二段構え。スルー回数要確認',
      '前日最終G数を確認し据え置き判別。700G以上なら据え置き天井狙い',
      'リセット台は100〜200G付近から期待値プラス。朝一は天国準備狙い',
    ],
    quitTiming: [
      'AT・ボーナス終了後0〜100Gは引き戻しゾーン。100G消化後にやめ判断',
      '残り天井300G以内（700G〜）なら天井まで打ち切り推奨（期待値+4000円）',
      '2000G消化してAT初当たりが1/350以下かつ確定演出なしならやめ検討',
      'クエストスルー5回以上ならスルー天井7回まで続行推奨',
      'トロフィーが銅以下のみ＋AT直撃0回なら低設定濃厚。早めの見切りを',
    ],
  },

  hyena: {
    ceilingGame: 999,
    ceilingBenefit: '999G到達で天井、クエストスルー7回で天井',
    zones: [
      { start: 0, end: 100, label: '引き戻し', strength: 'warm' as const },
      { start: 280, end: 300, label: 'カムラポイント', strength: 'warm' as const },
      { start: 380, end: 450, label: 'ゾーン', strength: 'warm' as const },
      { start: 700, end: 999, label: '天井狙い', strength: 'hot' as const },
    ],
    expectedValues: [
      { fromGame: 0, expectedYen: -1000, note: '0Gから打つとマイナス' },
      { fromGame: 300, expectedYen: 200 },
      { fromGame: 400, expectedYen: 700 },
      { fromGame: 500, expectedYen: 1500 },
      { fromGame: 600, expectedYen: 2500 },
      { fromGame: 700, expectedYen: 4000, note: '天井狙い目' },
      { fromGame: 800, expectedYen: 6000, note: '天井間近・高期待値' },
    ],
    resetInfo: 'リセット時は天国準備移行率75%と優遇',
    notes: [
      'G数天井999Gとクエストスルー天井7回の二段構え',
      'リセット時は天国準備に高確率で移行',
      '期待値は設定1・等価換金で計算',
    ],
  },
};

export default config;
