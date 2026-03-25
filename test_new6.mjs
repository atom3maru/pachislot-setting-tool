// 新規6機種ベイズ推定計算テスト
// 各機種configのデータを使って計算結果の妥当性を検証

function poissonLL(k, n, rate) {
  const lambda = n * rate;
  if (lambda <= 0) return 0;
  return k * Math.log(lambda) - lambda;
}

function binomialLL(k, n, p) {
  if (p <= 0 || p >= 1 || n <= 0) return 0;
  return k * Math.log(p) + (n - k) * Math.log(1 - p);
}

function categoricalLL(count, rate) {
  if (count <= 0 || rate <= 0) return 0;
  return count * Math.log(rate);
}

function softmax(scores) {
  const maxScore = Math.max(...scores);
  const exps = scores.map(s => Math.exp(s - maxScore));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

function calculate(input, config) {
  const labels = config.settingLabels || ['1','2','3','4','5','6'];
  const numSettings = labels.length;
  const scores = new Array(numSettings).fill(0);

  let confirmedMin = 1;
  for (const [key, req] of Object.entries(config.confirmedMin)) {
    if (input[key] != null && input[key] > 0) {
      confirmedMin = Math.max(confirmedMin, req);
    }
  }

  for (const entry of config.probEntries) {
    const count = input[entry.key];
    const total = input[entry.totalKey];
    if (count != null && count >= 0 && total != null && total > 0) {
      for (let s = 0; s < numSettings; s++) {
        scores[s] += poissonLL(count, total, entry.rates[s]);
      }
    }
  }

  for (const entry of (config.binomialEntries || [])) {
    const k = input[entry.hitKey];
    const n = input[entry.totalKey];
    if (k != null && n != null && n > 0) {
      for (let s = 0; s < numSettings; s++) {
        const p = entry.rates[s];
        if (p > 0 && p < 1) {
          scores[s] += binomialLL(k, n, p);
        }
      }
    }
  }

  for (const group of (config.categoricalGroups || [])) {
    for (const key of group.keys) {
      if (key in config.confirmedMin) continue;
      const count = input[key];
      if (count != null && count > 0) {
        for (let s = 0; s < numSettings; s++) {
          scores[s] += categoricalLL(count, group.rates[key][s]);
        }
      }
    }
  }

  let probabilities = softmax(scores);

  if (confirmedMin > 1) {
    for (let s = 0; s < numSettings; s++) {
      const settingNum = parseInt(labels[s], 10) || 99;
      if (settingNum < confirmedMin) {
        probabilities[s] = 0;
      }
    }
    const sum = probabilities.reduce((a, b) => a + b, 0);
    if (sum > 0) probabilities = probabilities.map(p => p / sum);
  }

  const maxP = Math.max(...probabilities);
  const mostLikelyIdx = probabilities.indexOf(maxP);
  return { probabilities, labels, confirmedMin, mostLikelyIdx, mostLikelySetting: labels[mostLikelyIdx] };
}

// =====================================================
// テストケース
// =====================================================
const tests = [
  // ---- 化物語 ----
  {
    name: '化物語(設定6相当データ)',
    input: { totalG: 5000, atCnt: 23, suikaCnt: 71 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/265.1, 1/260.7, 1/252.1, 1/238.8, 1/230.8, 1/219.6] },
        { key: 'suikaCnt', totalKey: 'totalG', rates: [1/87.4, 1/85.8, 1/84.9, 1/79.7, 1/74.8, 1/69.9] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_gold: 4, e_iloveu: 6, t_copper: 2, t_silver: 3, t_gold: 4, t_kirin: 5, t_rainbow: 6, num_174: 2, num_543: 3, num_331: 6 },
    },
    check: (r) => r.mostLikelySetting === '6' || r.mostLikelySetting === '5',
    desc: '高設定が最有力'
  },
  {
    name: '化物語(I LOVE YOU→設定6確定)',
    input: { totalG: 3000, atCnt: 10, suikaCnt: 35, e_iloveu: 1 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/265.1, 1/260.7, 1/252.1, 1/238.8, 1/230.8, 1/219.6] },
        { key: 'suikaCnt', totalKey: 'totalG', rates: [1/87.4, 1/85.8, 1/84.9, 1/79.7, 1/74.8, 1/69.9] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_gold: 4, e_iloveu: 6, t_rainbow: 6 },
    },
    check: (r) => r.confirmedMin === 6 && r.mostLikelySetting === '6' && r.probabilities[5] > 0.99,
    desc: '設定6が100%'
  },
  {
    name: '化物語(弱チェリー直撃あり)',
    input: { totalG: 5000, atCnt: 20, suikaCnt: 60, cherry_direct_hit: 2, cherry_direct_total: 50 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/265.1, 1/260.7, 1/252.1, 1/238.8, 1/230.8, 1/219.6] },
        { key: 'suikaCnt', totalKey: 'totalG', rates: [1/87.4, 1/85.8, 1/84.9, 1/79.7, 1/74.8, 1/69.9] },
      ],
      binomialEntries: [
        { hitKey: 'cherry_direct_hit', totalKey: 'cherry_direct_total', rates: [0.004, 0.008, 0.013, 0.021, 0.029, 0.038] },
      ],
      categoricalGroups: [],
      confirmedMin: {},
    },
    check: (r) => {
      const p56 = r.probabilities[4] + r.probabilities[5];
      return p56 > 0.50;
    },
    desc: '設定5・6合算50%超'
  },

  // ---- ゴブリンスレイヤーII ----
  {
    name: 'ゴブスレII(設定6相当データ)',
    input: { totalG: 5000, atCnt: 12, czCnt: 27 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/541.6, 1/526.4, 1/506.4, 1/453.2, 1/417.8, 1/402.4] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/239.3, 1/232.3, 1/222.9, 1/200.4, 1/187.3, 1/181.9] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_cowgirl: 2, e_priest_elf: 4, e_bath: 4, e_all_sword: 6, c_copper: 2, c_silver: 3, c_gold: 4, c_danger: 5, c_rainbow: 6 },
    },
    check: (r) => r.mostLikelySetting === '6' || r.mostLikelySetting === '5',
    desc: '高設定が最有力'
  },
  {
    name: 'ゴブスレII(虹コイン→設定6確定)',
    input: { totalG: 3000, atCnt: 7, czCnt: 15, c_rainbow: 1 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/541.6, 1/526.4, 1/506.4, 1/453.2, 1/417.8, 1/402.4] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/239.3, 1/232.3, 1/222.9, 1/200.4, 1/187.3, 1/181.9] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { c_rainbow: 6 },
    },
    check: (r) => r.confirmedMin === 6 && r.probabilities[5] > 0.99,
    desc: '設定6が100%'
  },

  // ---- からくりサーカス (5段階: 1,2,4,5,6) ----
  {
    name: 'からくり(設定6相当データ)',
    input: { totalG: 5000, atCnt: 11, czCnt: 18 },
    config: {
      settingLabels: ['1', '2', '4', '5', '6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/564, 1/543, 1/469, 1/451, 1/447] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/333, 1/320, 1/292, 1/277, 1/275] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_ashihana: 2, e_shirogane: 4, e_francine: 6 },
    },
    check: (r) => {
      const p456 = r.probabilities[2] + r.probabilities[3] + r.probabilities[4];
      return p456 > 0.50;
    },
    desc: '設定4以上合算50%超'
  },
  {
    name: 'からくり(フランシーヌ→設定6確定)',
    input: { totalG: 3000, atCnt: 6, czCnt: 10, e_francine: 1 },
    config: {
      settingLabels: ['1', '2', '4', '5', '6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/564, 1/543, 1/469, 1/451, 1/447] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/333, 1/320, 1/292, 1/277, 1/275] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_francine: 6 },
    },
    check: (r) => r.confirmedMin === 6 && r.probabilities[4] > 0.99,
    desc: '設定6が100%'
  },

  // ---- ゴジラvsエヴァ (5段階: 1,2,4,5,6) ----
  {
    name: 'ゴジラvsエヴァ(設定6相当+殲滅作戦)',
    input: { totalG: 5000, atCnt: 12, bonusCnt: 20, suika_cz_hit: 15, suika_total: 50, senmetsu_win: 7, senmetsu_total: 10 },
    config: {
      settingLabels: ['1', '2', '4', '5', '6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/581.8, 1/552.7, 1/487.8, 1/446.2, 1/407.3] },
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/299.9, 1/292.2, 1/272.3, 1/256.7, 1/244.8] },
      ],
      binomialEntries: [
        { hitKey: 'suika_cz_hit', totalKey: 'suika_total', rates: [0.203, 0.211, 0.250, 0.277, 0.305] },
        { hitKey: 'senmetsu_win', totalKey: 'senmetsu_total', rates: [0.493, 0.504, 0.517, 0.529, 0.653] },
      ],
      categoricalGroups: [],
      confirmedMin: { ae_kaworu: 6 },
    },
    check: (r) => r.mostLikelySetting === '6',
    desc: '殲滅作戦勝率70%→設定6最有力'
  },
  {
    name: 'ゴジラvsエヴァ(カヲル→設定6確定)',
    input: { totalG: 3000, atCnt: 6, bonusCnt: 10, ae_kaworu: 1 },
    config: {
      settingLabels: ['1', '2', '4', '5', '6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/581.8, 1/552.7, 1/487.8, 1/446.2, 1/407.3] },
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/299.9, 1/292.2, 1/272.3, 1/256.7, 1/244.8] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { ae_kaworu: 6 },
    },
    check: (r) => r.confirmedMin === 6 && r.probabilities[4] > 0.99,
    desc: '設定6が100%'
  },

  // ---- 超電磁砲 ----
  {
    name: '超電磁砲(設定6相当データ)',
    input: { totalG: 5000, atCnt: 21, czCnt: 36 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/317.8, 1/311.8, 1/304.4, 1/272.4, 1/248.1, 1/235.3] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/175.75, 1/170, 1/165, 1/155, 1/145, 1/137.52] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_rainbow: 6, c_rainbow: 6 },
    },
    check: (r) => r.mostLikelySetting === '6' || r.mostLikelySetting === '5',
    desc: '高設定が最有力'
  },
  {
    name: '超電磁砲(虹枠ウエディング→設定6確定)',
    input: { totalG: 3000, atCnt: 12, czCnt: 20, e_rainbow: 1 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/317.8, 1/311.8, 1/304.4, 1/272.4, 1/248.1, 1/235.3] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/175.75, 1/170, 1/165, 1/155, 1/145, 1/137.52] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_rainbow: 6 },
    },
    check: (r) => r.confirmedMin === 6 && r.probabilities[5] > 0.99,
    desc: '設定6が100%'
  },

  // ---- リゼロ2 ----
  {
    name: 'リゼロ2(設定6相当+引き戻し多)',
    input: { totalG: 5000, atCnt: 16, pullback_hit: 3, pullback_total: 13 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/417.2, 1/408.5, 1/387.1, 1/354.3, 1/332.9, 1/305.4] },
      ],
      binomialEntries: [
        { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.102, 0.104, 0.139, 0.160, 0.180, 0.200] },
      ],
      categoricalGroups: [],
      confirmedMin: { e_roten: 6, clock_606: 6 },
    },
    check: (r) => {
      const p456 = r.probabilities[3] + r.probabilities[4] + r.probabilities[5];
      return p456 > 0.50;
    },
    desc: '設定4以上合算50%超'
  },
  {
    name: 'リゼロ2(露天風呂→設定6確定)',
    input: { totalG: 3000, atCnt: 10, pullback_hit: 2, pullback_total: 8, e_roten: 1 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/417.2, 1/408.5, 1/387.1, 1/354.3, 1/332.9, 1/305.4] },
      ],
      binomialEntries: [
        { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.102, 0.104, 0.139, 0.160, 0.180, 0.200] },
      ],
      categoricalGroups: [],
      confirmedMin: { e_roten: 6, clock_606: 6 },
    },
    check: (r) => r.confirmedMin === 6 && r.probabilities[5] > 0.99,
    desc: '設定6が100%'
  },
  {
    name: 'リゼロ2(設定1相当データ)',
    input: { totalG: 5000, atCnt: 12, pullback_hit: 1, pullback_total: 10 },
    config: {
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/417.2, 1/408.5, 1/387.1, 1/354.3, 1/332.9, 1/305.4] },
      ],
      binomialEntries: [
        { hitKey: 'pullback_hit', totalKey: 'pullback_total', rates: [0.102, 0.104, 0.139, 0.160, 0.180, 0.200] },
      ],
      categoricalGroups: [],
      confirmedMin: {},
    },
    check: (r) => r.mostLikelySetting === '1' || r.mostLikelySetting === '2',
    desc: '低設定が最有力'
  },
];

console.log('=== 新規6機種 ベイズ推定計算テスト ===\n');

let passed = 0;
let failed = 0;

for (const t of tests) {
  const result = calculate(t.input, t.config);
  const labels = result.labels;
  const probs = result.probabilities;

  // 基本チェック
  const sum = probs.reduce((a, b) => a + b, 0);
  const sumOk = Math.abs(sum - 1.0) < 0.01;
  const noNaN = !probs.some(p => isNaN(p) || !isFinite(p));
  const customOk = t.check(result);

  const ok = sumOk && noNaN && customOk;

  const probStr = labels.map((l, i) => `設定${l}:${(probs[i]*100).toFixed(1)}%`).join(' ');
  const status = ok ? '✅' : '❌';

  if (ok) passed++;
  else failed++;

  const issues = [];
  if (!sumOk) issues.push(`合計=${sum.toFixed(4)}`);
  if (!noNaN) issues.push('NaN detected');
  if (!customOk) issues.push(`期待: ${t.desc}`);

  console.log(`${status} ${t.name.padEnd(40)} | cMin=${result.confirmedMin} | ML=設定${result.mostLikelySetting} | ${probStr}${issues.length > 0 ? ' | ⚠️ ' + issues.join(', ') : ''}`);
}

console.log(`\n=== 結果: ${passed} PASS / ${failed} FAIL (全${tests.length}テスト) ===`);
