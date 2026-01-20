'use client';

import { useState, useCallback } from 'react';
import type { EngagementScore } from '../lib/types';

export function useEngagementScore() {
  const [current, setCurrent] = useState<EngagementScore | null>(null);
  const [history, setHistory] = useState<EngagementScore[]>([]);
  const [maxHistorySize] = useState(50);

  const addScore = useCallback((score: EngagementScore) => {
    setCurrent(score);
    setHistory((prev) => {
      const updated = [...prev, score];
      // Keep only last N items
      return updated.slice(-maxHistorySize);
    });
  }, [maxHistorySize]);

  const clear = useCallback(() => {
    setCurrent(null);
    setHistory([]);
  }, []);

  return {
    current,
    history,
    addScore,
    clear,
    hasData: current !== null,
  };
}