import { useState } from 'react';
import type { MachineGuide as GuideType } from '../types/machine';

interface Props {
  guide: GuideType;
}

const sections = [
  { key: 'settingHunt' as const, icon: '🎯', title: '設定狙いのポイント' },
  { key: 'morningCheck' as const, icon: '🌅', title: '朝一に確認すべきこと' },
  { key: 'quitTiming' as const, icon: '🚪', title: 'やめ時の目安' },
];

export default function MachineGuide({ guide }: Props) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          📖 攻め方ガイド
        </h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sections.map(sec => {
          const items = guide[sec.key];
          if (!items || items.length === 0) return null;
          const isOpen = openSections.has(sec.key);
          return (
            <div key={sec.key}>
              <button
                onClick={() => toggle(sec.key)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                  <span className="text-xl">{sec.icon}</span>
                  {sec.title}
                </span>
                <span className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {isOpen && (
                <ul className="px-4 pb-4 space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
