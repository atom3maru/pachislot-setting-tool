import { readFileSync } from 'fs';
import { join } from 'path';

const basePath = './src/machines';
const machines = [
  'kabaneri', 'enen', 'umineko', 'koukaku', 'hokuto', 'ghoul', 'hanahana',
  'okidoki_black', 'hokuto_original', 'valvrave2', 'okidoki_duo', 'monkeyturn',
  'magireco', 'onimusha3', 'tokyorevengers', 'bancho4', 'tekken6',
  'monhunrise', 'godeater', 'sbj', 'mushokutensei'
];

let passed = 0;
let failed = 0;
const issues = [];

for (const id of machines) {
  const configPath = join(basePath, id, 'config.ts');
  const content = readFileSync(configPath, 'utf-8');

  // settingLabels取得
  const labelsMatch = content.match(/settingLabels:\s*\[([^\]]+)\]/);
  const labels = labelsMatch
    ? labelsMatch[1].replace(/'/g, '').replace(/"/g, '').split(',').map(s => s.trim())
    : ['1','2','3','4','5','6'];

  const numSettings = labels.length;

  // name取得
  const nameMatch = content.match(/name:\s*'([^']+)'/);
  const name = nameMatch ? nameMatch[1] : id;

  // probEntriesのrates配列長チェック
  // rates: [...] のパターンを全て抽出
  const allRates = [...content.matchAll(/rates:\s*\[([^\]]+)\]/g)];
  let ratesOk = true;

  for (let i = 0; i < allRates.length; i++) {
    const vals = allRates[i][1].split(',').map(s => s.trim()).filter(s => s.length > 0);
    if (vals.length !== numSettings) {
      ratesOk = false;
      issues.push(`${name}: rates配列[${i}] 長さ${vals.length} != 期待値${numSettings}`);
    }
  }

  // sections内のfield数を数える
  const fieldMatches = [...content.matchAll(/key:\s*'(\w+)'/g)];
  const fieldCount = fieldMatches.length;

  // probEntries数
  const probCount = (content.match(/key:\s*'\w+',\s*totalKey:/g) || []).length;

  // binomialEntries数
  const binomialCount = (content.match(/hitKey:\s*'\w+'/g) || []).length;

  // categoricalGroupsのキー数
  const catKeysMatches = [...content.matchAll(/keys:\s*\[([^\]]+)\]/g)];
  let catKeyCount = 0;
  for (const m of catKeysMatches) {
    catKeyCount += m[1].split(',').length;
  }

  // confirmedMin数
  const confirmedMatch = content.match(/confirmedMin:\s*\{([^}]+)\}/s);
  const confirmedCount = confirmedMatch
    ? (confirmedMatch[1].match(/\w+:/g) || []).length
    : 0;

  const status = ratesOk ? 'OK' : 'NG';
  if (ratesOk) passed++;
  else failed++;

  console.log(`${status} | ${name.padEnd(35)} | 設定:${labels.join(',').padEnd(12)} | fields:${String(fieldCount).padStart(2)} | prob:${probCount} | binom:${binomialCount} | cat:${catKeyCount} | confirmed:${confirmedCount}`);
}

console.log(`\n=== 結果: ${passed} OK / ${failed} NG (全${machines.length}機種) ===`);
if (issues.length > 0) {
  console.log('\n問題点:');
  issues.forEach(i => console.log(`  - ${i}`));
} else {
  console.log('構造的な問題は検出されませんでした');
}
