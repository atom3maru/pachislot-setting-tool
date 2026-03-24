interface Props {
  hints: string[];
}

export default function InputHints({ hints }: Props) {
  if (hints.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-3">
      <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-1">💡 精度向上のヒント</p>
      <ul className="space-y-1">
        {hints.map((hint, i) => (
          <li key={i} className="text-xs text-blue-600 dark:text-blue-400 flex items-start gap-1">
            <span className="mt-0.5">•</span>
            {hint}
          </li>
        ))}
      </ul>
    </div>
  );
}
