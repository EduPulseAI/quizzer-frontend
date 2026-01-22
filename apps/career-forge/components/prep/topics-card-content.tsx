import { getTopics } from '@edupulse/quiz';
import { ReactNode } from 'react';
import TopicInfo from './topic-info';

interface Props {
  children?: ReactNode;
}

export async function TopicsCardContent(props: Props) {
  const { success, data, error } = await getTopics();

  if (!success || error) {
    console.log("TopicsCardContent#error", error);
  }

  return (
    <div  className="grid md:grid-cols-2 gap-4">
      {data.map((topic) => (
        <TopicInfo
          key={topic.id}
          topic={topic}
        />
      ))}
    </div>
  );
}

export default TopicsCardContent;
