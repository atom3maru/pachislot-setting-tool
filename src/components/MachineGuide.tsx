import { useState, useMemo } from 'react';
import type { MachineGuide as GuideType } from '../types/machine';

interface Props {
  guide: GuideType;
}

const tabs = [
  { key: 'settingHunt' as const, icon: '🎯', label: '設定狙い' },
  { key: 'morningCheck' as const, icon: '🌅', label: '朝一確認' },
  { key: 'quitTiming' as const, icon: '🚪', label: 'やめ時' },
];

type TabKey = typeof tabs[number]['key'];

/** テキスト内容からカラーバーの重要度を判定 */
function getImportance(text: string): 'critical' | 'important' | 'info' {
  if (/確定|最重要|必ず/.test(text)) return 'critical';
  if (/設定差|注目|推奨|倍差/.test(text)) return 'important';
  return 'info';
}

const borderColorMap = {
  critical: 'border-red-500',
  important: 'border-amber-500',
  info: 'border-indigo-400',
} as const;

/** テキスト内容からアイコンを自動割当 */
function getIcon(text: string): string {
  if (/確定|トロフィー|画面/.test(text)) return '🏆';
  if (/確率|%|1\//.test(text)) return '📊';
  if (/朝一|リセット|前日|短縮/.test(text)) return '⏰';
  if (/やめ|終了|即/.test(text)) return '🚫';
  if (/確認|チェック|液晶/.test(text)) return '👁️';
  return '💡';
}

/** バッジパターンの定義 */
const badgePattern = /設定[1-6V](確定|以上|濃厚)/g;

const badgeStyleMap: Record<string, string> = {
  確定: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  以上: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  濃厚: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

/** テキスト内のバッジパターンをReact要素に変換 */
function renderTextWithBadges(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(badgePattern.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    // マッチ前のテキスト
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // バッジ
    const suffix = match[1]; // 確定 | 以上 | 濃厚
    const style = badgeStyleMap[suffix] || '';
    parts.push(
      <span
        key={match.index}
        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${style}`}
      >
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  // 残りのテキスト
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function MachineGuide({ guide }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>('settingHunt');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // タブ切替時に展開状態をリセット
  const handleTabChange = (key: TabKey) => {
    setActiveTab(key);
    setExpandedCards(new Set());
  };

  const toggleCard = (index: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const items = useMemo(() => guide[activeTab] || [], [guide, activeTab]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          📖 攻め方ガイド
        </h3>
      </div>

      {/* タブバー */}
      <div className="flex gap-2 p-3 overflow-x-auto">
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 min-h-[44px] whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* カードリスト */}
      <div key={activeTab} className="px-3 pb-4 space-y-2 animate-fade-in">
        {items.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-4">
            データがありません
          </p>
        )}
        {items.map((item, i) => {
          const importance = getImportance(item);
          const icon = getIcon(item);
          const isExpanded = expandedCards.has(i);

          return (
            <div
              key={`${activeTab}-${i}`}
              onClick={() => toggleCard(i)}
              className={`rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 border-l-[4px] ${borderColorMap[importance]} cursor-pointer transition-all duration-200 hover:shadow-md animate-slide-up`}
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 break-words ${
                      isExpanded ? '' : 'line-clamp-2'
                    }`}
                  >
                    {renderTextWithBadges(item)}
                  </div>
                  {/* 展開インジケーター（テキストが長い場合のみ表示想定） */}
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 inline-block">
                    {isExpanded ? '▲ 折りたたむ' : '▼ 全文表示'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
