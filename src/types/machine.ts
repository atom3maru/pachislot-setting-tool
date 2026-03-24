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
