interface Props {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  hint?: string;
  min?: number;
}

export default function NumberField({ label, value, onChange, hint, min = 0 }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">{label}</label>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        value={value ?? ''}
        onChange={e => {
          const v = e.target.value;
          onChange(v === '' ? null : Math.max(min, parseInt(v, 10) || 0));
        }}
        placeholder="0"
        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors min-h-[44px]"
      />
      {hint && <span className="text-[11px] text-gray-400 dark:text-gray-500">{hint}</span>}
    </div>
  );
}
