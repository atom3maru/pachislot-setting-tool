import { useState, useMemo } from 'react';
import type { DictionaryEntry } from '../types/machine';

interface Props {
  dictionary: DictionaryEntry[];
}

const importanceOrder: Record<DictionaryEntry['importance'], number> = {
  confirmed: 0,
  strong: 1,
  weak: 2,
};

const importanceBorderMap: Record<DictionaryEntry['importance'], string> = {
  confirmed: 'border-red-500',
  strong: 'border-amber-500',
  weak: 'border-blue-400',
};

const importanceTextMap: Record<DictionaryEntry['importance'], string> = {
  confirmed: 'text-red-600 dark:text-red-400',
  strong: 'text-amber-600 dark:text-amber-400',
  weak: 'text-blue-600 dark:text-blue-400',
};

const importanceBadgeMap: Record<DictionaryEntry['importance'], { label: string; style: string }> = {
  confirmed: {
    label: '確定',
    style: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  strong: {
    label: '濃厚',
    style: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  weak: {
    label: '示唆',
    style: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
};

export default function DictionarySearch({ dictionary }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全て');

  // カテゴリ抽出: timingの重複除去 + 先頭に「全て」
  const categories = useMemo(() => {
    const timings = Array.from(new Set(dictionary.map(e => e.timing)));
    return ['全て', ...timings];
  }, [dictionary]);

  // フィルタ & ソート
  const filtered = useMemo(() => {
    let results = dictionary;

    // カテゴリフィルタ
    if (activeCategory !== '全て') {
      results = results.filter(e => e.timing === activeCategory);
    }

    // テキストフィルタ
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        e =>
          e.keyword.toLowerCase().includes(q) ||
          e.name.toLowerCase().includes(q) ||
          e.settingHint.toLowerCase().includes(q)
      );
    }

    // importance順ソート
    return [...results].sort(
      (a, b) => importanceOrder[a.importance] - importanceOrder[b.importance]
    );
  }, [dictionary, activeCategory, searchQuery]);

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 -mx-3 -mt-3 rounded-t-xl sm:-mx-5 sm:-mt-5 mb-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          📖 演出辞典
        </h3>
      </div>

      {/* 検索バー */}
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="演出名や示唆内容で検索..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-1 flex items-center justify-center w-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* カテゴリタブ */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-2 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap min-h-[44px] flex items-center ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 件数表示 */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
        {filtered.length}件の演出
      </p>

      {/* 検索結果カード */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">
            該当する演出が見つかりません
          </p>
        )}
        {filtered.map((entry, i) => {
          const badge = importanceBadgeMap[entry.importance];
          return (
            <div
              key={`${entry.name}-${i}`}
              className={`rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 border-l-[4px] ${importanceBorderMap[entry.importance]} animate-slide-up`}
              style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
            >
              {/* 上段: 演出名 + タイミングバッジ + 重要度バッジ */}
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="font-bold text-base text-gray-800 dark:text-gray-100">
                  {entry.name}
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full px-2 py-0.5 text-xs">
                  {entry.timing}
                </span>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${badge.style}`}
                >
                  {badge.label}
                </span>
              </div>

              {/* 下段: 示唆内容 */}
              <p className={`text-sm font-medium break-words ${importanceTextMap[entry.importance]}`}>
                {entry.settingHint}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
