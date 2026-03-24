interface Props {
  isDark: boolean;
  toggle: () => void;
}

export default function DarkModeToggle({ isDark, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'ライトモードに切替' : 'ダークモードに切替'}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:scale-90 transition-all text-lg"
      title={isDark ? 'ライトモード' : 'ダークモード'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
