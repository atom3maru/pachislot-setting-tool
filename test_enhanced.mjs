// 全機種拡張機能テスト
// payoutRates, checklist, guide, hyena, 判定強化の挙動を検証

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const machinesDir = './src/machines';
const dirs = readdirSync(machinesDir).filter(d => {
  try { return readdirSync(join(machinesDir, d)).includes('config.ts'); }
  catch { return false; }
});

console.log('=== 全機種拡張機能テスト ===\n');
console.log(`検出した機種: ${dirs.length}機種\n`);

let passed = 0;
let failed = 0;
const issues = [];

for (const dir of dirs) {
  const configPath = join(machinesDir, dir, 'config.ts');
  const content = readFileSync(configPath, 'utf-8');
  const checks = [];
  let ok = true;

  // 1. payoutRatesの存在確認
  const hasPayoutRates = content.includes('payoutRates:');
  if (!hasPayoutRates) {
    checks.push('payoutRates未定義');
    ok = false;
  } else {
    // payoutRates配列のバリデーション
    const match = content.match(/payoutRates:\s*\[([^\]]+)\]/);
    if (match) {
      const rates = match[1].split(',').map(s => parseFloat(s.trim()));
      // 機械割は95〜120%の範囲内か
      for (const r of rates) {
        if (r < 90 || r > 125) {
          checks.push(`payoutRates異常値: ${r}%`);
          ok = false;
        }
      }
      // 昇順か
      for (let i = 1; i < rates.length; i++) {
        if (rates[i] < rates[i-1]) {
          checks.push(`payoutRates非昇順: ${rates.join(', ')}`);
          ok = false;
          break;
        }
      }
    }
  }

  // 2. baseCoinsの存在確認
  const hasBaseCoins = content.includes('baseCoins:');
  if (!hasBaseCoins) {
    checks.push('baseCoins未定義');
    ok = false;
  } else {
    const match = content.match(/baseCoins:\s*(\d+)/);
    if (match) {
      const bc = parseInt(match[1]);
      if (bc < 20 || bc > 50) {
        checks.push(`baseCoins異常値: ${bc}`);
        ok = false;
      }
    }
  }

  // 3. checklistの存在確認
  const hasChecklist = content.includes('checklist:');
  if (!hasChecklist) {
    checks.push('checklist未定義');
    ok = false;
  }

  // 4. guideの存在確認
  const hasGuide = content.includes('guide:') && content.includes('settingHunt:');
  if (!hasGuide) {
    checks.push('guide未定義');
    ok = false;
  }

  // 5. hyenaの存在確認（ハナハナはノーマルタイプなので除外）
  const isNormalType = dir === 'hanahana';
  const hasHyena = content.includes('hyena:') && content.includes('ceilingGame:');
  if (!hasHyena && !isNormalType) {
    checks.push('hyena未定義');
    ok = false;
  }

  // 6. settingLabels確認（5段階機種）
  const hasSettingLabels = content.includes('settingLabels:');
  if (hasPayoutRates) {
    const match = content.match(/payoutRates:\s*\[([^\]]+)\]/);
    if (match) {
      const rateCount = match[1].split(',').length;
      if (hasSettingLabels) {
        const slMatch = content.match(/settingLabels:\s*\[([^\]]+)\]/);
        if (slMatch) {
          const labelCount = slMatch[1].split(',').length;
          if (rateCount !== labelCount) {
            checks.push(`payoutRates(${rateCount}個)とsettingLabels(${labelCount}個)の数が不一致`);
            ok = false;
          }
        }
      } else if (rateCount !== 6) {
        checks.push(`payoutRates(${rateCount}個)だがsettingLabelsなし（6段階以外は必須）`);
        ok = false;
      }
    }
  }

  // 7. hyena期待値テーブルの妥当性チェック
  if (hasHyena) {
    const evMatches = [...content.matchAll(/expectedYen:\s*(-?\d+)/g)];
    if (evMatches.length > 0) {
      const values = evMatches.map(m => parseInt(m[1]));
      // 期待値が最終的にプラスになるか（天井間近はプラスであるべき）
      const lastValue = values[values.length - 1];
      if (lastValue <= 0) {
        checks.push(`hyena期待値: 最終値が${lastValue}円（天井間近はプラスであるべき）`);
        ok = false;
      }
    }
  }

  const status = ok ? '✅' : '❌';
  if (ok) passed++;
  else { failed++; issues.push({ dir, checks }); }

  const features = [
    hasPayoutRates ? 'payout✓' : 'payout✗',
    hasBaseCoins ? 'base✓' : 'base✗',
    hasChecklist ? 'check✓' : 'check✗',
    hasGuide ? 'guide✓' : 'guide✗',
    (hasHyena || isNormalType) ? 'hyena✓' : 'hyena✗',
  ].join(' | ');

  console.log(`${status} ${dir.padEnd(20)} | ${features}${checks.length > 0 ? ' | ⚠️ ' + checks.join(', ') : ''}`);
}

console.log(`\n=== 結果: ${passed} PASS / ${failed} FAIL (全${dirs.length}機種) ===`);

if (issues.length > 0) {
  console.log('\n失敗詳細:');
  issues.forEach(i => console.log(`  ${i.dir}: ${i.checks.join(', ')}`));
}
