'use client';

import { useSessionStore } from '../stores/session-store';

export function SessionHeader() {
  const { currentQuestion } = useSessionStore();

  if (!currentQuestion) {
    return (
      <div className="mb-8">
        <div className="animate-pulse space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-24 bg-slate-700/50 rounded-full" />
            <div className="h-4 w-32 bg-slate-700/50 rounded" />
          </div>
          <div className="h-8 w-3/4 bg-slate-700/50 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
          {currentQuestion.tag}
        </span>
        <span className="text-sm text-slate-400">
          Difficulty: {currentQuestion.difficulty}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 leading-relaxed">
        {currentQuestion.text}
      </h2>
    </div>
  );
}

export default SessionHeader;
