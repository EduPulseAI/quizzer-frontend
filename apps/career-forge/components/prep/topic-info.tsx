import { auth } from '@edupulse/profile';
import type { Topic } from '@feature/topic';
import { CheckCircle2 } from 'lucide-react';
import StartSessionButton from './start-session-button';

interface Props {
  topic: Topic;
}

export async function TopicInfo({ topic }: Props) {
  const studentId = (await auth())?.user?.id ?? '';

  const completedQuestions = 0;
  const totalQuestions = Object.entries(topic.questions).reduce(
    (acc, [_, curr]) => acc + curr,
    0
  );

  return (
    <div className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium mb-1">{topic.skill}</h4>
          <p className="text-sm text-muted-foreground">
            {totalQuestions} questions
          </p>
        </div>
        <StartSessionButton studentId={studentId} topicId={topic.id} />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <span className="text-muted-foreground">
          {completedQuestions} / {totalQuestions} completed
        </span>
      </div>
      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-primary"
          style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default TopicInfo;
