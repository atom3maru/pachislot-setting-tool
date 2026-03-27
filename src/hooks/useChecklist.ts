import { useState, useCallback } from 'react';

export function useChecklist(machineId: string) {
  const storageKey = `pachislot-checklist-${machineId}`;

  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, [storageKey]);

  const resetAll = useCallback(() => {
    setChecked({});
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  const isChecked = useCallback((id: string) => !!checked[id], [checked]);

  const checkedCount = Object.values(checked).filter(Boolean).length;

  return { isChecked, toggle, resetAll, checkedCount };
}
