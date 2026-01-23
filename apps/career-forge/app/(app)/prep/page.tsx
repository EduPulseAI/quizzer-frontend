import { Button } from '@feature/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@feature/ui/components/card';
import { BookOpen } from 'lucide-react';
import TopicsCardContent from '../../../components/prep/topics-card-content';

async function PrepPage() {
  // const recentPractice: any[] = [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2 gradient-text">
          Interview Preparation
        </h1>
        <p className="text-muted-foreground">
          Practice and master your interview skills
        </p>
      </div>

      <Card className="glass-effect border-blue-500/50 card-hover animate-pulse-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            AI Mock Interview
          </CardTitle>
          <CardDescription>
            Practice with our AI interviewer for realistic interview experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-500/30 card-hover">
            Start AI Mock Interview
          </Button>
        </CardContent>
      </Card>

      {/*<div className="grid md:grid-cols-3 gap-4">*/}
      {/*  <Card className="glass-effect card-hover">*/}
      {/*    <CardHeader className="pb-3">*/}
      {/*      <CardTitle className="text-sm font-medium text-muted-foreground">*/}
      {/*        Questions Completed*/}
      {/*      </CardTitle>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      <div className="text-3xl font-bold">89</div>*/}
      {/*      <p className="text-xs text-muted-foreground mt-1">+12 this week</p>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*  <Card className="glass-effect card-hover">*/}
      {/*    <CardHeader className="pb-3">*/}
      {/*      <CardTitle className="text-sm font-medium text-muted-foreground">*/}
      {/*        Average Score*/}
      {/*      </CardTitle>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      <div className="text-3xl font-bold">85%</div>*/}
      {/*      <p className="text-xs text-muted-foreground mt-1">*/}
      {/*        +5% improvement*/}
      {/*      </p>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*  <Card className="glass-effect card-hover">*/}
      {/*    <CardHeader className="pb-3">*/}
      {/*      <CardTitle className="text-sm font-medium text-muted-foreground">*/}
      {/*        Practice Time*/}
      {/*      </CardTitle>*/}
      {/*    </CardHeader>*/}
      {/*    <CardContent>*/}
      {/*      <div className="text-3xl font-bold">24h</div>*/}
      {/*      <p className="text-xs text-muted-foreground mt-1">This month</p>*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</div>*/}

      <Card className="glass-effect card-hover">
        <CardHeader>
          <CardTitle>Recent Practice Sessions</CardTitle>
          <CardDescription>
            Your latest interview practice attempts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/*      {recentPractice.map((session, index) => (*/}
            {/*        <div*/}
            {/*          key={index}*/}
            {/*          className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50"*/}
            {/*        >*/}
            {/*          <div className="flex-1">*/}
            {/*            <h4 className="font-medium mb-1">{session.question}</h4>*/}
            {/*            <div className="flex items-center gap-2">*/}
            {/*              <Badge*/}
            {/*                variant={*/}
            {/*                  session.difficulty === 'Hard'*/}
            {/*                    ? 'destructive'*/}
            {/*                    : session.difficulty === 'Medium'*/}
            {/*                    ? 'default'*/}
            {/*                    : 'secondary'*/}
            {/*                }*/}
            {/*              >*/}
            {/*                {session.difficulty}*/}
            {/*              </Badge>*/}
            {/*              <span className="text-sm text-muted-foreground flex items-center gap-1">*/}
            {/*                <Clock className="h-3 w-3" />*/}
            {/*                {session.time}*/}
            {/*              </span>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*          <div className="text-right">*/}
            {/*            <div className="text-2xl font-bold text-primary">*/}
            {/*              {session.score}%*/}
            {/*            </div>*/}
            {/*            <Button size="sm" variant="ghost" className="mt-1">*/}
            {/*              Review*/}
            {/*            </Button>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      ))}*/}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect card-hover">
        <CardHeader>
          <CardTitle>Technical Questions</CardTitle>
          <CardDescription>
            Practice technical interview questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TopicsCardContent />
        </CardContent>
      </Card>
    </div>
  );
}

export default PrepPage;
