import type { ReactNode } from 'react';

interface Props {
  title: string;
  icon: string;
  children: ReactNode;
}

export default function SectionCard({ title, icon, children }: Props) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-shadow duration-300">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/80 dark:to-gray-800/80 px-5 py-3 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-base">{icon}</span>
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
