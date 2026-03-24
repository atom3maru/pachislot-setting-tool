import { useEffect, useCallback, useRef } from 'react';

const PREFIX = 'pachislot-save-';
const HISTORY_PREFIX = 'pachislot-history-';
const MAX_HISTORY = 10;

export interface HistoryEntry {
  id: string;
  machineId: string;
  input: Record<string, number | null>;
  result: { probabilities: number[]; mostLikely: number; confirmedMin?: number } | null;
  timestamp: number;
}

/** 自動保存: 入力中のデータをlocalStorageに保存 */
export function useAutoSave(
  machineId: string,
  input: Record<string, number | null>,
  setInput: (v: Record<string, number | null>) => void,
) {
  const initialized = useRef(false);

  // 初回マウント時に保存データを復元
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const saved = localStorage.getItem(PREFIX + machineId);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setInput(parsed);
        }
      }
    } catch { /* ignore */ }
  }, [machineId, setInput]);

  // 入力変更時に自動保存（300msデバウンス）
  useEffect(() => {
    if (!initialized.current) return;
    const timer = setTimeout(() => {
      try {
        const hasData = Object.values(input).some(v => v !== null && v !== undefined);
        if (hasData) {
          localStorage.setItem(PREFIX + machineId, JSON.stringify(input));
        } else {
          localStorage.removeItem(PREFIX + machineId);
        }
      } catch { /* ignore */ }
    }, 300);
    return () => clearTimeout(timer);
  }, [input, machineId]);

  // 自動保存データをクリア
  const clearSave = useCallback(() => {
    localStorage.removeItem(PREFIX + machineId);
  }, [machineId]);

  return { clearSave };
}

/** 履歴管理: 判別結果を履歴として保存 */
export function saveHistory(
  machineId: string,
  input: Record<string, number | null>,
  result: { probabilities: number[]; mostLikely: number; confirmedMin?: number },
) {
  try {
    const key = HISTORY_PREFIX + machineId;
    const raw = localStorage.getItem(key);
    const history: HistoryEntry[] = raw ? JSON.parse(raw) : [];

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      machineId,
      input,
      result,
      timestamp: Date.now(),
    };

    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    localStorage.setItem(key, JSON.stringify(history));
  } catch { /* ignore */ }
}

export function loadHistory(machineId: string): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_PREFIX + machineId);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(machineId: string) {
  localStorage.removeItem(HISTORY_PREFIX + machineId);
}
