
import { Session } from '@edupulse/session';
import { Badge } from '@feature/ui/components/badge';
import { Button } from '@feature/ui/components/button';
import { Clock } from 'lucide-react';

interface Props {
  session: Session;
}

export function RecentSessionInfo({ session }: Props) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50">
      <div className="flex-1">
        <h4 className="font-medium mb-1">{session.currentQuestion.tag}</h4>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              session.currentDifficulty === 'HARD'
                ? 'destructive'
                : session.currentDifficulty === 'INTERMEDIATE'
                ? 'default'
                : 'secondary'
            }
          >
            {session.currentDifficulty}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {session.status}
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">{"session.score"}%</div>
        <Button size="sm" variant="ghost" className="mt-1">
          Review
        </Button>
      </div>
    </div>
  );
}

export default RecentSessionInfo;
