import { FileCode } from "lucide-react";
import { ReactNode } from 'react';
import type { Topic } from "../lib/types/topic";
import SelectTopicButton from "./button/select-topic-button";

interface Props {
  topics: Topic[];
  children?: ReactNode;
}

export function TopicsList({ topics }: Props) {
  console.log("TopicsList#topics", topics)
  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileCode className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No topics found</h3>
        <p className="text-muted-foreground max-w-md">
          Create your first topic or adjust your filters to see more results.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {topics.map((topic) => (
          <SelectTopicButton
            key={topic.id}
            topicId={topic.id}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {topic.skill}
                </h3>
                <p className="text-sm text-gray-500">
                  {Object.entries(topic.questions).reduce((acc, [_,curr]) => acc + curr, 0)} questions
                </p>
              </div>
            </div>
          </SelectTopicButton>
        ))}
      </div>
    </div>
  );
}

export default TopicsList;
