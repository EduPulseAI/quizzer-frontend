'use client';

import { useSession } from "../stores/use-session-context";

interface Props {
}

export function SessionHeader({ }: Props) {
  const { question } = useSession();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {question.tag}
        </span>
        <span className="text-sm text-gray-500">
          Question difficulty {question.difficulty}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
          // style={{ width: `${"progress"}%` }}
        ></div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
        {question.text}
      </h2>
    </div>
  );
}

export default SessionHeader;
