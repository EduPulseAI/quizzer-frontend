import { Topic } from "@feature/topic/lib/types/topic";
import { Badge } from "@feature/ui/components/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@feature/ui/components/card";
import { Calendar } from "lucide-react";
import moment from "moment";
import { ReactNode } from 'react';


interface Props {
  topic: Topic;
  children?: ReactNode;
}

export function TopicCard({ topic }: Props) {
  return (
    <Card className="cursor-pointer hover:border-primary transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg line-clamp-1">{topic.skill}</CardTitle>
            <CardDescription className="line-clamp-2">{""}</CardDescription>
          </div>

        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          {topic.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
          {topic.tags.length > 3 && <Badge variant="outline">+{topic.tags.length - 3}</Badge>}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3"/>
            Last updated: {moment(topic.updatedAt).fromNow()}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

export default TopicCard;
