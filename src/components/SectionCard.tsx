import type { ReactNode } from 'react';

interface Props {
  title: string;
  icon: string;
  children: ReactNode;
}

export default function SectionCard({ title, icon, children }: Props) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-700/60 px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
