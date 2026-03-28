interface Props {
  message: string;
  level: 'high' | 'mid' | 'low';
}

const STYLES = {
  high: 'bg-green-50 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300',
  mid: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-300',
  low: 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
};

const ICONS = {
  high: '🟢',
  mid: '🟡',
  low: '⚪',
};

export default function JudgmentComment({ message, level }: Props) {
  return (
    <div className={`border-l-[5px] rounded-xl p-4 shadow-sm animate-scale-up ${STYLES[level]}`}>
      <p className="text-base font-bold flex items-center gap-2">
        <span>{ICONS[level]}</span>
        {message}
      </p>
    </div>
  );
}
