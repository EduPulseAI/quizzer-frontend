
import Link from 'next/link';
import { Button } from '@feature/ui/components/button';
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
    if (accuracy >= 90) return { letter: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (accuracy >= 80) return { letter: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (accuracy >= 70) return { letter: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (accuracy >= 60) return { letter: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { letter: 'F', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const grade = getGrade(accuracy);

  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Session Complete!
        </h2>
        <p className="text-gray-600">
          Great job completing this quiz session
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className={`w-32 h-32 rounded-full ${grade.bg} flex items-center justify-center`}
        >
          <span className={`text-6xl font-bold ${grade.color}`}>
            {grade.letter}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">
            {correctAnswers}/{totalQuestions}
          </div>
          <div className="text-sm text-gray-500">Correct</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
          <div className="text-sm text-gray-500">Accuracy</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600">{timeSpent}</div>
          <div className="text-sm text-gray-500">Time</div>
        </div>
      </div>

      <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
        <p className="text-purple-700">
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
            className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-purple-300 transition-colors"
          >
            Back to Dashboard
          </Button>
        </Link>
        <Link href={`/quiz/${session.currentQuestion?.tag ?? ''}`}>
          <Button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105">
            Try Another Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SessionResults;
