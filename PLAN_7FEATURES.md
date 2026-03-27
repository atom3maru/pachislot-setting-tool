# パチスロ設定判別アプリ 7機能追加 実装計画書

## 概要
パチスロ設定判別Webアプリ（React 19 + Vite + Tailwind CSS v4、29機種対応）に以下7つの機能を追加する。

| # | 機能 | 目的 |
|---|------|------|
| 1 | 📈 判別結果の円グラフ表示 | 数字だけより直感的にわかりやすく |
| 2 | 🎯 「やめるべき？」判定の強化 | 期待収支・信頼度・やめ時を明示 |
| 3 | 📱 PWA化 | ホーム画面追加・オフライン対応 |
| 4 | 📋 打ちながらチェックリスト | 確認漏れ防止 |
| 5 | 📊 期待収支シミュレーター | 残りG数別の期待収支を計算 |
| 6 | 🤝 機種別攻め方ガイド | 設定狙い・朝一・やめ時の解説 |
| 7 | 🎰 ハイエナ情報 | 天井・ゾーン・期待値表示 |

---

## 技術スタック
- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4.2**（ダークモード対応済み）
- **react-router-dom v7**
- 追加予定: **vite-plugin-pwa**（PWA化のみ）

---

## 実装順序（依存関係考慮）

### Step 1: 型定義の拡張
**ファイル:** `src/types/machine.ts`

MachineConfigに以下のOptionalフィールドを追加（既存28機種のconfigは無修正で動作）：

```typescript
// 機能2 & 5: 機械割情報
payoutRates?: number[];     // 設定別機械割(%) 例: [97.0, 98.5, 100.2, 104.0, 107.5, 112.0]
baseCoins?: number;         // 50枚あたり回転数（デフォルト: 30G）

// 機能4: チェックリスト
checklist?: ChecklistItem[];

// 機能6: 攻め方ガイド
guide?: MachineGuide;

// 機能7: ハイエナ情報
hyena?: HyenaInfo;
```

---

### Step 2: 機能6 — 機種別攻め方ガイド（最も単純）

**新規ファイル:**
- `src/components/MachineGuide.tsx` — アコーディオン形式の3セクション

**構成:**
| セクション | アイコン | 内容 |
|-----------|--------|------|
| 設定狙いのポイント | 🎯 | 注目すべき設定差要素 |
| 朝一に確認すべきこと | 🌅 | ガックンチェック・データ確認等 |
| やめ時の目安 | 🚪 | 何Gで何%ならやめるべきか |

- デフォルトは全て閉じた状態
- 箇条書きリスト形式
- ダークモード対応

---

### Step 3: 機能4 — 打ちながらチェックリスト

**新規ファイル:**
- `src/components/Checklist.tsx` — チェックリストUI
- `src/hooks/useChecklist.ts` — localStorage管理フック

**仕様:**
- カテゴリ別グループ表示（通常時/ボーナス中/AT終了時/随時）
- チェック済みアイテムは取り消し線＋薄い色
- 進捗バー表示（「3/8 確認済み」）
- 「全リセット」ボタン
- localStorageキー: `pachislot-checklist-{machineId}`

---

### Step 4: 機能1 — 判別結果の円グラフ表示

**新規ファイル:**
- `src/components/PieChart.tsx` — SVGドーナツチャート

**仕様:**
- SVGの`stroke-dasharray`と`stroke-dashoffset`で描画（外部ライブラリ不要）
- 中央に最有力設定を大文字で表示
- 凡例はチャート下に横並び
- ダークモード対応（JS内で色切り替え）
- レスポンシブ（viewBox固定、親幅に追従）

---

### Step 5: 機能2+5 — 判定強化＋期待収支シミュレーター

**新規ファイル:**
- `src/logic/judgmentHelper.ts` — 強化版判定ロジック
- `src/logic/incomeCalc.ts` — 期待収支計算
- `src/components/IncomeSimulator.tsx` — シミュレーターUI

**判定強化の仕様:**

| 要素 | 計算方法 |
|------|---------|
| 期待収支 | 加重平均機械割 = Σ(prob × payoutRate)、1Gあたり消費枚数から算出 |
| 信頼度 | ゲーム数＋入力項目数で3段階（高/中/低） |
| やめ時判定 | 低設定確率70%以上 or 加重平均機械割98%以下 → shouldStop |

**シミュレーターの仕様:**
- 残りゲーム数選択（500/1000/2000/3000/カスタム）
- テーブル形式: ゲーム数 | 期待枚数差 | 期待円
- プラスは緑、マイナスは赤

---

### Step 6: 機能7 — ハイエナ情報（天井・ゾーン・期待値）

**新規ファイル:**
- `src/components/HyenaInfo.tsx` — ハイエナ情報表示
- `src/logic/hyenaCalc.ts` — 期待値補間計算

**4つのサブセクション:**

| サブセクション | 内容 |
|--------------|------|
| 天井情報 | 天井G数＋恩恵＋リセット情報 |
| ゾーンビジュアル | SVG横バー、0〜天井を色分け（hot=赤、warm=黄、cold=青） |
| 期待値計算 | ゲーム数入力→「ここから打つと期待値+○○円」 |
| 期待値テーブル | 全G数帯の期待値リスト |

**型定義:**
```typescript
interface HyenaInfo {
  ceilingGame: number;                    // 天井G数
  ceilingBenefit: string;                 // 天井恩恵テキスト
  zones: ZoneInfo[];                      // ゾーン情報
  expectedValues: HyenaExpectedValue[];   // 期待値テーブル
  resetInfo?: string;                     // リセット時の挙動
  notes?: string[];                       // 注意事項
}
```

---

### Step 7: 機能3 — PWA化

**新規ファイル:**
- `public/manifest.webmanifest`
- `public/icons/icon-192x192.png`
- `public/icons/icon-512x512.png`

**修正ファイル:**
- `vite.config.ts` — vite-plugin-pwa追加
- `index.html` — manifestリンク・apple-touch-icon追加

**マニフェスト設定:**
```json
{
  "name": "パチスロ設定判別ツール",
  "short_name": "設定判別",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1f2937"
}
```

---

### Step 8: 全機種へのデータ展開

kabaneriで完成したテンプレートを28機種に順次展開：
- `payoutRates` — 各機種の機械割（Web検索で収集）
- `checklist` — 機種ごとの確認項目
- `guide` — 機種ごとの攻め方ガイド
- `hyena` — 機種ごとの天井・ゾーン・期待値

---

### Step 9: ビルドテスト・GitHubプッシュ

- TypeScriptコンパイル確認
- Viteプロダクションビルド確認
- 各機能の動作確認（ライト/ダーク両モード）
- スマホ幅でレスポンシブ確認
- Git commit & push → Vercel自動デプロイ

---

## 主要修正ファイル一覧

| ファイル | 修正内容 |
|---------|---------|
| `src/types/machine.ts` | 全7機能の型拡張の中心 |
| `src/pages/MachinePage.tsx` | 全UIコンポーネントの統合先 |
| `src/machines/kabaneri/config.ts` | リファレンス実装（最初にデータ追加） |
| `src/components/JudgmentComment.tsx` | 判定強化の表示拡張 |
| `vite.config.ts` | PWAプラグイン追加 |
| `index.html` | PWAメタタグ追加 |

## 新規作成ファイル一覧

| ファイル | 機能 |
|---------|------|
| `src/components/PieChart.tsx` | 円グラフ（機能1） |
| `src/components/IncomeSimulator.tsx` | 期待収支シミュレーター（機能5） |
| `src/components/Checklist.tsx` | チェックリスト（機能4） |
| `src/components/MachineGuide.tsx` | 攻め方ガイド（機能6） |
| `src/components/HyenaInfo.tsx` | ハイエナ情報（機能7） |
| `src/logic/judgmentHelper.ts` | 判定強化ロジック（機能2） |
| `src/logic/incomeCalc.ts` | 期待収支計算（機能5） |
| `src/logic/hyenaCalc.ts` | 期待値補間計算（機能7） |
| `src/hooks/useChecklist.ts` | チェックリスト管理（機能4） |
| `public/manifest.webmanifest` | PWAマニフェスト（機能3） |

---

## 検証方法
1. ローカルdev serverで全機能の動作確認
2. ダークモード/ライトモード両方で表示確認
3. スマホ幅(375px)でレスポンシブ確認
4. PWA: Chrome DevToolsのLighthouseでスコア確認
5. `npm run build`でビルド成功確認
6. Vercelデプロイ後の本番確認

---

*作成日: 2026-03-27*
