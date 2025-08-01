import { Button } from '@feature/ui/components/button';
import { RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import { GetQuiz } from '../lib/types/index';
import { ReactNode } from 'react';

interface Props {
  data: GetQuiz;
  children?: ReactNode;
}

export function QuizResults({ data }: Props) {


  const getScoreMessage = () => {
    const percentage = (data.score) * 100
    if (percentage >= 80) return "Excellent! 🎉"
    if (percentage >= 60) return "Good job! 👍"
    if (percentage >= 40) return "Not bad! 🤔"
    return "Keep practicing! 💪"
  }

  const getScoreColor = () => {
    const percentage = (data.score) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }


  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
        <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {data.correct}/{data.total}
        </div>
        <p className="text-lg text-gray-600 mb-4">
          You scored{" "}
          <span className={`font-bold ${getScoreColor()}`}>
              {Math.round((data.score) * 100)}%
            </span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(data.correct / data.total) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">
          Topic: <span className="font-semibold">{data.topic}</span>
        </p>
      </div>

      <Link href={"/"}>
        <Button
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Another Quiz
        </Button>
      </Link>
    </div>
  );
}
