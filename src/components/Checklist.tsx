import type { ChecklistItem } from '../types/machine';
import { useChecklist } from '../hooks/useChecklist';

interface Props {
  items: ChecklistItem[];
  machineId: string;
}

export default function Checklist({ items, machineId }: Props) {
  const { isChecked, toggle, resetAll, checkedCount } = useChecklist(machineId);
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  // カテゴリ別にグルーピング
  const categories = new Map<string, ChecklistItem[]>();
  for (const item of items) {
    const cat = item.category || 'その他';
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(item);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          📋 確認チェックリスト
        </h3>
        <button
          onClick={resetAll}
          className="text-xs text-white/80 hover:text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded min-h-[36px] transition-colors"
        >
          全リセット
        </button>
      </div>

      {/* 進捗バー */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>{checkedCount}/{totalCount} 確認済み</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* チェックリスト */}
      <div className="px-4 pb-4 pt-2 space-y-3">
        {[...categories.entries()].map(([category, categoryItems]) => (
          <div key={category}>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
              {category}
            </div>
            <div className="space-y-1">
              {categoryItems.map(item => {
                const checked = isChecked(item.id);
                return (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors min-h-[44px]
                      ${checked ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(item.id)}
                      className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 accent-indigo-600 text-indigo-600 focus:ring-indigo-500 flex-shrink-0"
                    />
                    <span className={`text-sm transition-all break-words ${checked ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
