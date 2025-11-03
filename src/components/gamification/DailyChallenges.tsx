import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Clock, Zap, CheckCircle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  completed: boolean;
  icon: any;
}

export const DailyChallenges = () => {
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Early Bird',
      description: 'Complete all assignments before 6 PM',
      reward: 50,
      progress: 3,
      total: 5,
      completed: false,
      icon: Clock,
    },
    {
      id: '2',
      title: 'Focus Master',
      description: 'Stay in Focus Mode for 2 hours',
      reward: 30,
      progress: 120,
      total: 120,
      completed: true,
      icon: Target,
    },
    {
      id: '3',
      title: 'Team Player',
      description: 'Help a classmate through group whisper',
      reward: 40,
      progress: 1,
      total: 3,
      completed: false,
      icon: Zap,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Daily Challenges</h2>
        </div>
        <Badge variant="secondary">Resets in 8h</Badge>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`p-5 rounded-xl border-2 transition-all ${
              challenge.completed
                ? 'bg-primary/5 border-primary/20'
                : 'bg-gradient-subtle border-border hover:border-primary/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${
                challenge.completed ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
                <challenge.icon className={`h-5 w-5 ${
                  challenge.completed ? 'text-primary' : 'text-primary/70'
                }`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{challenge.title}</h3>
                  {challenge.completed && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {challenge.description}
                </p>

                {!challenge.completed && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-primary h-2 rounded-full transition-all"
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between mt-3">
                  <Badge variant={challenge.completed ? 'default' : 'secondary'} className="text-xs">
                    +{challenge.reward} WP
                  </Badge>
                  {challenge.completed && (
                    <span className="text-xs text-primary font-medium">Completed! ✨</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/10">
        <p className="text-sm text-center">
          <span className="font-medium text-accent">💪 Keep Going!</span>
          <br />
          <span className="text-muted-foreground">
            Complete all challenges to earn a bonus 50 WP
          </span>
        </p>
      </div>
    </Card>
  );
};
