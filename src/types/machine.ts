// 汎用機種定義インターフェース

/** 入力フィールド定義 */
export interface FieldDef {
  key: string;
  label: string;
  hint?: string;
  min?: number;
}

/** 入力セクション定義 */
export interface SectionDef {
  title: string;
  icon: string;
  groups: GroupDef[];
}

/** グループ定義（セクション内のサブグループ） */
export interface GroupDef {
  label?: string;
  columns?: number; // grid-cols (default: 2)
  fields: FieldDef[];
}

/** 確率テーブル定義（ポアソン尤度用） */
export interface ProbEntry {
  key: string;        // 回数のフィールドキー
  totalKey: string;   // 分母となるフィールドキー（例: 'totalG'）
  rates: number[];    // 設定1〜6の1Gあたり確率
}

/** 二項分布テーブル定義 */
export interface BinomialEntry {
  hitKey: string;     // 当選回数のフィールドキー
  totalKey: string;   // 試行回数のフィールドキー
  rates: number[];    // 設定1〜6の当選確率
}

/** カテゴリカル尤度グループ定義 */
export interface CategoricalGroup {
  keys: string[];     // フィールドキーの配列
  rates: Record<string, number[]>; // key -> 設定1〜6の確率
}

/** 確定演出マッピング */
export type ConfirmedMinMap = Record<string, number>; // field key -> 最低設定

/** 判定コメント生成関数の型 */
export type JudgmentFn = (
  input: Record<string, number | null>,
  result: CalcResult
) => { message: string; level: 'high' | 'mid' | 'low' };

/** ヒント生成関数の型 */
export type HintsFn = (input: Record<string, number | null>) => string[];

/** 計算結果 */
export interface CalcResult {
  probabilities: number[];
  mostLikely: number;
  confirmedMin?: number;
}

// ========================================
// 機能追加用の型定義
// ========================================

/** チェックリスト項目（機能4） */
export interface ChecklistItem {
  id: string;
  label: string;
  category?: string;  // '通常時' | 'ボーナス中' | 'AT中' | 'AT終了時' | '随時' 等
}

/** 攻め方ガイド（機能6） */
export interface MachineGuide {
  settingHunt: string[];    // 設定狙いのポイント
  morningCheck: string[];   // 朝一に確認すべきこと
  quitTiming: string[];     // やめ時の目安
}

/** ゾーン情報（機能7） */
export interface ZoneInfo {
  start: number;    // 開始G数
  end: number;      // 終了G数
  label: string;    // 表示ラベル
  strength: 'hot' | 'warm' | 'cold';
}

/** 期待値テーブルエントリ（機能7） */
export interface HyenaExpectedValue {
  fromGame: number;     // 開始ゲーム数
  expectedYen: number;  // 期待値（円）
  note?: string;
}

/** ハイエナ情報（機能7） */
export interface HyenaInfo {
  ceilingGame: number;                    // 天井ゲーム数
  ceilingBenefit: string;                 // 天井恩恵テキスト
  zones: ZoneInfo[];                      // ゾーン情報
  expectedValues: HyenaExpectedValue[];   // 期待値テーブル
  resetInfo?: string;                     // リセット時の挙動
  notes?: string[];                       // 注意事項
}

/** 強化版判定結果（機能2） */
export interface EnhancedJudgment {
  message: string;
  level: 'high' | 'mid' | 'low';
  expectedIncome?: number;      // あと1000G打った場合の期待枚数差
  confidence: 'high' | 'mid' | 'low';
  shouldStop?: boolean;
  stopReason?: string;
}

/** 機種定義（1機種分のすべての情報） */
export interface MachineConfig {
  id: string;
  name: string;
  version: string;
  color: string;       // テーマカラー（gradient class）
  settingLabels?: string[]; // 設定ラベル（省略時は ['1','2','3','4','5','6']）
  sections: SectionDef[];
  probEntries: ProbEntry[];
  binomialEntries: BinomialEntry[];
  categoricalGroups: CategoricalGroup[];
  confirmedMin: ConfirmedMinMap;
  getJudgment: JudgmentFn;
  getHints: HintsFn;

  // 拡張機能（全てOptional - 既存configは無修正で動作）
  payoutRates?: number[];         // 設定別機械割(%) 例: [97.0, 98.5, 100.2, 104.0, 107.5, 112.0]
  baseCoins?: number;             // 50枚あたり回転数（デフォルト: 30）
  checklist?: ChecklistItem[];    // 打ちながらチェックリスト
  guide?: MachineGuide;           // 攻め方ガイド
  hyena?: HyenaInfo;              // ハイエナ情報（天井・ゾーン・期待値）
}

/** 機種一覧表示用 */
export interface MachineListItem {
  id: string;
  name: string;
  shortName: string;
  color: string;
  description: string;
  icon: string;
  disabled?: boolean;
  disabledReason?: string;
}
