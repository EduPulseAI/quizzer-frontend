'use client';

import { useState, useCallback } from 'react';
import type { AdaptAction } from '../lib/types';

export function useAdaptiveActions() {
  const [actions, setActions] = useState<AdaptAction[]>([]);
  const [latest, setLatest] = useState<AdaptAction | null>(null);
  const [maxActionsSize] = useState(20);

  const addAction = useCallback((action: AdaptAction) => {
    setLatest(action);
    setActions((prev) => {
      const updated = [...prev, action];
      return updated.slice(-maxActionsSize);
    });
  }, [maxActionsSize]);

  const clear = useCallback(() => {
    setActions([]);
    setLatest(null);
  }, []);

  const dismissLatest = useCallback(() => {
    setLatest(null);
  }, []);

  return {
    actions,
    latest,
    addAction,
    clear,
    dismissLatest,
    hasActions: actions.length > 0,
  };
}