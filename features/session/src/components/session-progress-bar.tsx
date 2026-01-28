'use client';

import { useSessionStore } from '../stores/session-store';

export function SessionProgressBar() {
  const { progress } = useSessionStore();

  const progressPercentage =
    (progress.currentIndex / progress.totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-slate-400">
        <span>
          Question {progress.currentIndex} of {progress.totalQuestions}
        </span>
        <span className="text-green-400">
          {progress.correctAnswers} correct
        </span>
      </div>
      <div className="w-full bg-slate-700/50 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default SessionProgressBar;
