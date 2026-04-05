// 攻め方ガイド品質テスト
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const machinesDir = './src/machines';
const dirs = readdirSync(machinesDir).filter(d => {
  try { return readdirSync(join(machinesDir, d)).includes('config.ts'); }
  catch { return false; }
});

console.log('=== 攻め方ガイド品質テスト ===\n');

let passed = 0;
let failed = 0;
const issues = [];

for (const dir of dirs) {
  const configPath = join(machinesDir, dir, 'config.ts');
  const content = readFileSync(configPath, 'utf-8');
  const checks = [];
  let ok = true;

  // 1. guideセクションの存在確認
  const hasGuide = content.includes('guide:') && content.includes('settingHunt:');
  if (!hasGuide) {
    checks.push('guideセクション未定義');
    ok = false;
    failed++;
    issues.push({ dir, checks });
    console.log(`❌ ${dir.padEnd(20)} | guide未定義`);
    continue;
  }

  // 2. 各フィールドの項目数チェック
  const extractArray = (field) => {
    const regex = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
    const match = content.match(regex);
    if (!match) return [];
    return match[1].split(/'\s*,/).filter(s => s.includes("'")).map(s => {
      const m = s.match(/'([^']+)/);
      return m ? m[1] : '';
    }).filter(Boolean);
  };

  const settingHunt = extractArray('settingHunt');
  const morningCheck = extractArray('morningCheck');
  const quitTiming = extractArray('quitTiming');

  if (settingHunt.length < 3) {
    checks.push(`settingHunt ${settingHunt.length}項目（3以上必要）`);
    ok = false;
  }
  if (morningCheck.length < 2) {
    checks.push(`morningCheck ${morningCheck.length}項目（2以上必要）`);
    ok = false;
  }
  if (quitTiming.length < 2) {
    checks.push(`quitTiming ${quitTiming.length}項目（2以上必要）`);
    ok = false;
  }

  // 3. 数値含有チェック（各settingHunt項目に数値があるか）
  const noNumItems = settingHunt.filter(s => !/\d/.test(s));
  if (noNumItems.length > 0) {
    checks.push(`settingHuntに数値なし項目: ${noNumItems.length}個`);
    ok = false;
  }

  // 4. morningCheckに数値があるか
  const noNumMorning = morningCheck.filter(s => !/\d/.test(s));
  if (noNumMorning.length > morningCheck.length * 0.5) {
    checks.push(`morningCheckの半数以上に数値なし`);
    ok = false;
  }

  // 5. 文字数チェック（各項目10-120文字）
  const allItems = [...settingHunt, ...morningCheck, ...quitTiming];
  const tooShort = allItems.filter(s => s.length < 10);
  const tooLong = allItems.filter(s => s.length > 120);
  if (tooShort.length > 0) {
    checks.push(`10文字未満の項目: ${tooShort.length}個`);
    ok = false;
  }
  if (tooLong.length > 0) {
    checks.push(`120文字超の項目: ${tooLong.length}個 (最大${Math.max(...tooLong.map(s=>s.length))}文字)`);
    // 警告のみ、失敗にしない
  }

  // 6. hyena整合性チェック（guideテキスト中のG数がceilingGameと大きく矛盾しないか）
  const ceilingMatch = content.match(/ceilingGame:\s*(\d+)/);
  if (ceilingMatch) {
    const ceiling = parseInt(ceilingMatch[1]);
    // guide内に「天井はXXXG」のようなパターンがあるか確認
    const guideText = [...settingHunt, ...morningCheck, ...quitTiming].join(' ');
    const ceilingRefs = guideText.match(/天井[はが]?\s*(?:通常\s*)?(\d+)/g);
    if (ceilingRefs) {
      for (const ref of ceilingRefs) {
        const num = parseInt(ref.match(/(\d+)/)[1]);
        // 天井の参照値がceilingGameの2倍以上離れていたら警告
        if (num > ceiling * 2.5 || (num > 100 && num < ceiling * 0.3)) {
          checks.push(`天井G数矛盾? guide="${ref}" vs hyena=${ceiling}G`);
        }
      }
    }
  }

  const status = ok ? '✅' : '❌';
  if (ok) passed++;
  else { failed++; issues.push({ dir, checks }); }

  const counts = `hunt:${settingHunt.length} | morning:${morningCheck.length} | quit:${quitTiming.length}`;
  console.log(`${status} ${dir.padEnd(20)} | ${counts}${checks.length > 0 ? ' | ⚠️ ' + checks.join(', ') : ''}`);
}

console.log(`\n=== 結果: ${passed} PASS / ${failed} FAIL (全${dirs.length}機種) ===`);

if (issues.length > 0) {
  console.log('\n問題詳細:');
  issues.forEach(i => console.log(`  ${i.dir}: ${i.checks.join(', ')}`));
}
