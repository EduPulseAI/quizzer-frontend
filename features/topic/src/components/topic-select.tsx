'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@feature/ui/components/select';
import { useRouter } from 'next/navigation';
import { GetTopics } from '../lib/types';

interface Props {
  topics: GetTopics;
}

export function TopicSelect({ topics }: Props) {
  const router = useRouter()
  const startQuiz = (topic: string) => {

    router.push("/" + topic)
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={startQuiz}>
        <SelectTrigger className="w-full h-14 text-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
          <SelectValue placeholder="Select a quiz topic..." />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem key={topic.title} value={topic.title} className="text-lg py-3">
              <div className="flex items-center gap-3">
                {/*<span className="text-2xl">*/}
                {/*  {topic === 'General Knowledge' && '🌍'}*/}
                {/*  {topic === 'Science' && '🔬'}*/}
                {/*  {topic === 'History' && '📚'}*/}
                {/*  {topic === 'Technology' && '💻'}*/}
                {/*</span>*/}
                {topic.title}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {topics.map((topic) => (
          <button
            key={topic.title}
            onClick={() => startQuiz(topic.title)}
            className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4">
              {/*<span className="text-3xl group-hover:scale-110 transition-transform">*/}
              {/*  {topic === 'General Knowledge' && '🌍'}*/}
              {/*  {topic === 'Science' && '🔬'}*/}
              {/*  {topic === 'History' && '📚'}*/}
              {/*  {topic === 'Technology' && '💻'}*/}
              {/*</span>*/}
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {topic.questions} questions
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
