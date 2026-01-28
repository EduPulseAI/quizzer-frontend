import { Button } from '@feature/ui/components/button';
import Link from 'next/link';
import type { GetSessionResponse } from '../lib/actions/get-session-api';

interface Props {
  data: GetSessionResponse;
}

export function SessionResults({ data }: Props) {
  const { session } = data;

  // Calculate stats based on session data
  const totalQuestions = 10;
  const correctAnswers = 7; // This would come from the actual session data
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const timeSpent = '5:32'; // This would come from actual session tracking

  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { letter: 'A', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
    if (accuracy >= 80) return { letter: 'B', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
    if (accuracy >= 70) return { letter: 'C', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    if (accuracy >= 60) return { letter: 'D', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' };
    return { letter: 'F', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
  };

  const grade = getGrade(accuracy);

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-100 mb-2">
          Session Complete!
        </h2>
        <p className="text-slate-400">
          Great job completing this quiz session
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className={`w-32 h-32 rounded-full ${grade.bg} border-2 ${grade.border} flex items-center justify-center`}
        >
          <span className={`text-6xl font-bold ${grade.color}`}>
            {grade.letter}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-blue-400">
            {correctAnswers}/{totalQuestions}
          </div>
          <div className="text-sm text-slate-500">Correct</div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-cyan-400">{accuracy}%</div>
          <div className="text-sm text-slate-500">Accuracy</div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
          <div className="text-2xl font-bold text-green-400">{timeSpent}</div>
          <div className="text-sm text-slate-500">Time</div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
        <p className="text-blue-300">
          {accuracy >= 80
            ? 'Excellent work! You have a strong understanding of this topic.'
            : accuracy >= 60
              ? 'Good effort! Review the questions you missed to improve.'
              : 'Keep practicing! Consider reviewing the material before trying again.'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="px-6 py-3 rounded-xl border-2 border-slate-600 hover:border-blue-500/50 text-slate-300 hover:text-slate-100 transition-colors"
          >
            Back to Dashboard
          </Button>
        </Link>
        <Link href={`/quiz/${session.currentQuestion?.tag ?? ''}`}>
          <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all duration-300 transform hover:scale-105">
            Try Another Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SessionResults;
