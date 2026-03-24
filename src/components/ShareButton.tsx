import { useState, useCallback } from 'react';

interface Props {
  machineName: string;
  result: {
    probabilities: number[];
    mostLikely: number;
    confirmedMin?: number;
  };
  input: Record<string, number | null>;
  settingLabels?: string[];
}

export default function ShareButton({ machineName, result, input, settingLabels }: Props) {
  const [copied, setCopied] = useState(false);

  const generateText = useCallback(() => {
    const lines: string[] = [];
    lines.push(`🎰 ${machineName} 設定判別結果`);
    lines.push('');

    // 主要入力値
    const totalG = input['totalG'];
    if (totalG) lines.push(`総回転数: ${totalG}G`);

    lines.push('');
    lines.push('📊 設定確率:');
    const labels = settingLabels ?? result.probabilities.map((_, i) => String(i + 1));
    result.probabilities.forEach((p, i) => {
      const pct = (p * 100).toFixed(1);
      const bar = '█'.repeat(Math.round(p * 20));
      lines.push(`  設定${labels[i]}: ${pct.padStart(5)}% ${bar}`);
    });

    lines.push('');
    const mlLabel = labels[result.mostLikely - 1] ?? String(result.mostLikely);
    lines.push(`⭐ 最も可能性が高い設定: 設定${mlLabel}`);

    if (result.confirmedMin && result.confirmedMin > 1) {
      lines.push(`🔒 確定演出により設定${result.confirmedMin}以上確定`);
    }

    lines.push('');
    lines.push('#パチスロ設定判別ツール');

    return lines.join('\n');
  }, [machineName, result, input, settingLabels]);

  const handleCopyText = useCallback(async () => {
    const text = generateText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generateText]);

  const handleShareX = useCallback(() => {
    const text = generateText();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [generateText]);

  const handleShareLine = useCallback(() => {
    const text = generateText();
    const url = `https://social-plugins.line.me/lineit/share?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [generateText]);

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) return;
    const text = generateText();
    try {
      await navigator.share({ title: `${machineName} 設定判別結果`, text });
    } catch { /* cancelled */ }
  }, [generateText, machineName]);

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">📤 結果を共有</p>
      <div className="flex flex-wrap gap-2">
        {/* テキストコピー */}
        <button
          onClick={handleCopyText}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
            copied
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {copied ? '✅ コピー済み' : '📋 テキストコピー'}
        </button>

        {/* X (Twitter) */}
        <button
          onClick={handleShareX}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-black text-white hover:bg-gray-800 transition-all active:scale-95"
        >
          𝕏 ポスト
        </button>

        {/* LINE */}
        <button
          onClick={handleShareLine}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-green-500 text-white hover:bg-green-600 transition-all active:scale-95"
        >
          💬 LINE
        </button>

        {/* ネイティブ共有（スマホ） */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-blue-500 text-white hover:bg-blue-600 transition-all active:scale-95"
          >
            📤 その他
          </button>
        )}
      </div>
    </div>
  );
}
