'use client';

import { useSessionStore } from '../stores/session-store';

export function SessionHeader() {
  const { currentQuestion } = useSessionStore();

  if (!currentQuestion) {
    return (
      <div className="mb-8">
        <div className="animate-pulse space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {currentQuestion.tag}
        </span>
        <span className="text-sm text-gray-500">
          Difficulty: {currentQuestion.difficulty}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
        {currentQuestion.text}
      </h2>
    </div>
  );
}

export default SessionHeader;
