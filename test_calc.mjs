// 全機種ベイズ推定計算テスト
// engine.tsのロジックをJS化して全機種を一括テスト

function poissonLL(k, n, rate) {
  const lambda = n * rate;
  if (lambda <= 0) return 0;
  return k * Math.log(lambda) - lambda;
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

  for (const entry of config.binomialEntries) {
    const k = input[entry.hitKey];
    const n = input[entry.totalKey];
    if (k != null && n != null && n > 0) {
      for (let s = 0; s < numSettings; s++) {
        const p = entry.rates[s];
        if (p > 0 && p < 1) {
          scores[s] += k * Math.log(p) + (n - k) * Math.log(1 - p);
        }
      }
    }
  }

  for (const group of config.categoricalGroups) {
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
    if (sum > 0) {
      probabilities = probabilities.map(p => p / sum);
    }
  }

  const maxP = Math.max(...probabilities);
  const mostLikelyIdx = probabilities.indexOf(maxP);

  return { probabilities, labels, confirmedMin, mostLikelyIdx, mostLikelySetting: labels[mostLikelyIdx] };
}

// テストケース: 各機種に設定6相当or確定演出ありのデータを入力
const tests = [
  {
    name: 'カバネリ', id: 'kabaneri',
    input: { totalG: 5000, bonusCnt: 26, stCnt: 16, bellCnt: 51, t_kirin: 1 },
    expect: { confirmedMin: 5, highSettings: true },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/254.2, 1/242.3, 1/239.6, 1/214.0, 1/203.2, 1/195.1] },
        { key: 'stCnt', totalKey: 'totalG', rates: [1/422.5, 1/405.9, 1/398.7, 1/357.2, 1/332.6, 1/318.5] },
        { key: 'bellCnt', totalKey: 'totalG', rates: [1/121.1, 1/114.4, 1/112.8, 1/106.2, 1/104.2, 1/99.1] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { t_kirin: 5, t_rainbow: 6 },
    }
  },
  {
    name: '沖ドキBLACK', id: 'okidoki_black',
    input: { totalG: 5000, bonusCnt: 21, cherryBCnt: 39 },
    expect: { confirmedMin: 1, highSettings: true },
    config: {
      settingLabels: ['1','2','3','5','6'],
      probEntries: [
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/288.7, 1/277.9, 1/265.8, 1/254.1, 1/243.1] },
        { key: 'cherryBCnt', totalKey: 'totalG', rates: [1/168.0, 1/152.4, 1/145.6, 1/136.5, 1/128.5] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: {},
    }
  },
  {
    name: '北斗の拳(金トロ)', id: 'hokuto_original',
    input: { totalG: 5000, atCnt: 17, weakSuika: 47, t_gold: 1 },
    expect: { confirmedMin: 4, setting4plus: true },
    config: {
      settingLabels: ['1','2','4','5','6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/383.4, 1/370.5, 1/297.8, 1/258.7, 1/235.1] },
        { key: 'weakSuika', totalKey: 'totalG', rates: [1/109.0, 1/108.7, 1/105.9, 1/100.7, 1/98.3] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { t_gold: 4, t_kirin: 5, t_rainbow: 6 },
    }
  },
  {
    name: '番長4(温泉)', id: 'bancho4',
    input: { totalG: 5000, atCnt: 23, directCnt: 2, bellCnt: 243, e_onsen: 1 },
    expect: { confirmedMin: 6, setting6: true },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/259.5, 1/256.3, 1/247.6, 1/236.0, 1/225.3, 1/221.1] },
        { key: 'directCnt', totalKey: 'totalG', rates: [1/6411, 1/5624, 1/4344, 1/3053, 1/2420, 1/2150] },
        { key: 'bellCnt', totalKey: 'totalG', rates: [1/21.8, 1/21.6, 1/21.4, 1/21.2, 1/21.0, 1/20.6] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_chatsumi: 4, e_racequeen: 5, e_onsen: 6 },
    }
  },
  {
    name: '無職転生(66%)', id: 'mushokutensei',
    input: { totalG: 5000, atCnt: 17, bonusCnt: 34, pct66: 1 },
    expect: { confirmedMin: 6, setting6: true },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/416, 1/406, 1/394, 1/361, 1/327, 1/292] },
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/170, 1/168, 1/166, 1/161, 1/156, 1/147] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { pct44: 4, pct55: 5, pct66: 6 },
    }
  },
  {
    name: 'モンハンライズ(全員集合)', id: 'monhunrise',
    input: { totalG: 5000, atCnt: 22, e_zenin: 1 },
    expect: { confirmedMin: 5, setting5plus: true },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/309.5, 1/301.4, 1/290.8, 1/256.4, 1/237.1, 1/230.8] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_zenin: 5, e_lion: 6 },
    }
  },
  {
    name: 'ヴァルヴレイヴ2(銀枠)', id: 'valvrave2',
    input: { totalG: 5000, atCnt: 11, e_silver: 1 },
    expect: { confirmedMin: 4, setting4plus: true },
    config: {
      settingLabels: ['1','2','4','5','6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/476, 1/473, 1/464, 1/459, 1/456] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { e_purple: 2, e_silver: 4, e_gold: 6 },
    }
  },
  {
    name: '沖ドキDUO(カナちゃん)', id: 'okidoki_duo',
    input: { totalG: 5000, bonusCnt: 25, cherryCnt: 120, v_kana: 1 },
    expect: { confirmedMin: 5, setting5plus: true },
    config: {
      settingLabels: ['1','2','3','5','6'],
      probEntries: [
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/240.0, 1/230.2, 1/215.8, 1/192.1, 1/181.0] },
        { key: 'cherryCnt', totalKey: 'totalG', rates: [1/46.8, 1/45.0, 1/43.3, 1/41.7, 1/40.3] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { v_kirarin: 2, v_pikon: 3, v_kana: 5, v_3nin: 6 },
    }
  },
  {
    name: 'モンキーターンV(虹トロ)', id: 'monkeyturn',
    input: { totalG: 5000, atCnt: 22, gomaiyaku: 222, t_rainbow: 1 },
    expect: { confirmedMin: 6, setting6: true },
    config: {
      settingLabels: ['1','2','4','5','6'],
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/299.8, 1/295.5, 1/258.8, 1/235.7, 1/222.9] },
        { key: 'gomaiyaku', totalKey: 'totalG', rates: [1/38.15, 1/36.86, 1/30.27, 1/24.51, 1/22.53] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { t_copper: 2, t_gold: 4, t_kerot: 5, t_rainbow: 6 },
    }
  },
  {
    name: 'マギアレコード(通常)', id: 'magireco',
    input: { totalG: 5000, bonusCnt: 27, atCnt: 12, weakCherry: 100 },
    expect: { confirmedMin: 1, highSettings: true },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/240.6, 1/236.1, 1/222.8, 1/208.5, 1/195.1, 1/184.3] },
        { key: 'atCnt', totalKey: 'totalG', rates: [1/654.6, 1/633.4, 1/571.8, 1/516.6, 1/456.5, 1/416.7] },
        { key: 'weakCherry', totalKey: 'totalG', rates: [1/60.0, 1/57.7, 1/55.5, 1/53.5, 1/51.7, 1/50.0] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: {},
    }
  },
  {
    name: '新鬼武者3(通常)', id: 'onimusha3',
    input: { totalG: 5000, atCnt: 17, bellCnt: 187 },
    expect: { confirmedMin: 1 },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/379.7, 1/372.7, 1/352.8, 1/306.5, 1/297.9, 1/293.1] },
        { key: 'bellCnt', totalKey: 'totalG', rates: [1/35.1, 1/33.5, 1/31.2, 1/29.5, 1/28.0, 1/26.7] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: {},
    }
  },
  {
    name: '鉄拳6(ケロット柄)', id: 'tekken6',
    input: { totalG: 5000, atCnt: 14, bonusCnt: 23, t_kerot: 1 },
    expect: { confirmedMin: 5, setting5plus: true },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/497.0, 1/484.1, 1/456.8, 1/397.6, 1/366.4, 1/358.5] },
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/264.7, 1/261.5, 1/255.3, 1/227.6, 1/220.3, 1/218.5] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: { t_copper: 2, t_silver: 3, t_gold: 4, t_kerot: 5, t_rainbow: 6 },
    }
  },
  {
    name: 'ゴッドイーター(通常)', id: 'godeater',
    input: { totalG: 5000, atCnt: 17, czCnt: 16 },
    expect: { confirmedMin: 1 },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'atCnt', totalKey: 'totalG', rates: [1/351.9, 1/344.5, 1/330.1, 1/317.0, 1/302.2, 1/290.3] },
        { key: 'czCnt', totalKey: 'totalG', rates: [1/392.0, 1/378.3, 1/359.1, 1/343.4, 1/324.3, 1/310.6] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: {},
    }
  },
  {
    name: 'SBJ(通常)', id: 'sbj',
    input: { totalG: 5000, bonusCnt: 28, suikaCnt: 60 },
    expect: { confirmedMin: 1 },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/241.7, 1/238.8, 1/235.9, 1/201.8, 1/194.9, 1/181.3] },
        { key: 'suikaCnt', totalKey: 'totalG', rates: [1/99.9, 1/91.1, 1/87.7, 1/86.7, 1/85.0, 1/83.9] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: {},
    }
  },
  {
    name: '東京リベンジャーズ(通常)', id: 'tokyorevengers',
    input: { totalG: 5000, bonusCnt: 21, atCnt: 13, bellCnt: 65 },
    expect: { confirmedMin: 1 },
    config: {
      settingLabels: undefined,
      probEntries: [
        { key: 'bonusCnt', totalKey: 'totalG', rates: [1/282.4, 1/279.5, 1/272.2, 1/255.8, 1/249.1, 1/240.1] },
        { key: 'atCnt', totalKey: 'totalG', rates: [1/482.2, 1/474.7, 1/456.9, 1/414.0, 1/393.8, 1/373.1] },
        { key: 'bellCnt', totalKey: 'totalG', rates: [1/99.3, 1/96.4, 1/89.8, 1/84.0, 1/79.0, 1/77.1] },
      ],
      binomialEntries: [],
      categoricalGroups: [],
      confirmedMin: {},
    }
  },
];

console.log('=== 全機種ベイズ推定計算テスト ===\n');

let passed = 0;
let failed = 0;
const errors = [];

for (const t of tests) {
  const result = calculate(t.input, t.config);
  const labels = result.labels;
  const probs = result.probabilities;

  // 基本チェック
  let ok = true;
  const checks = [];

  // 1. 確率の合計が1.0に近いか
  const sum = probs.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1.0) > 0.01) {
    ok = false;
    checks.push(`確率合計=${sum.toFixed(4)} (1.0であるべき)`);
  }

  // 2. confirmedMinが期待値と一致するか
  if (t.expect.confirmedMin && result.confirmedMin !== t.expect.confirmedMin) {
    ok = false;
    checks.push(`confirmedMin=${result.confirmedMin} (期待値=${t.expect.confirmedMin})`);
  }

  // 3. confirmedMin未満の設定が0%になっているか
  if (result.confirmedMin > 1) {
    for (let s = 0; s < labels.length; s++) {
      const settingNum = parseInt(labels[s], 10) || 99;
      if (settingNum < result.confirmedMin && probs[s] > 0.001) {
        ok = false;
        checks.push(`設定${labels[s]}が${(probs[s]*100).toFixed(1)}% (0%であるべき)`);
      }
    }
  }

  // 4. 設定6確定の場合、設定6が100%か
  if (t.expect.setting6) {
    const idx6 = labels.indexOf('6');
    if (idx6 >= 0 && probs[idx6] < 0.99) {
      // 他のprobEntriesの影響で完全に100%にならないこともあるが、最有力であるべき
      if (result.mostLikelySetting !== '6') {
        ok = false;
        checks.push(`設定6確定だが最有力が設定${result.mostLikelySetting}`);
      }
    }
  }

  // 5. NaN/Infinityチェック
  if (probs.some(p => isNaN(p) || !isFinite(p))) {
    ok = false;
    checks.push('NaN or Infinity detected');
  }

  const probStr = labels.map((l, i) => `設定${l}:${(probs[i]*100).toFixed(1)}%`).join(' ');
  const status = ok ? '✅' : '❌';

  if (ok) passed++;
  else { failed++; errors.push({ name: t.name, checks }); }

  console.log(`${status} ${t.name.padEnd(25)} | cMin=${result.confirmedMin} | ${probStr}${checks.length > 0 ? ' | ' + checks.join(', ') : ''}`);
}

console.log(`\n=== 結果: ${passed} PASS / ${failed} FAIL (全${tests.length}テスト) ===`);
if (errors.length > 0) {
  console.log('\n失敗詳細:');
  errors.forEach(e => console.log(`  ${e.name}: ${e.checks.join(', ')}`));
}
