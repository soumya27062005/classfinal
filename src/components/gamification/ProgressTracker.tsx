import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Sparkles } from 'lucide-react';

interface ProgressTrackerProps {
  points: number;
  level: number;
  nextLevelPoints: number;
  levelName: string;
}

export const ProgressTracker = ({ points, level, nextLevelPoints, levelName }: ProgressTrackerProps) => {
  const progress = (points / nextLevelPoints) * 100;

  return (
    <Card className="p-6 bg-gradient-primary text-primary-foreground">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 animate-pulse-glow" />
          <h2 className="text-2xl font-bold">Your Progress</h2>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          Level {level}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="opacity-20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className="transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-1" />
              <span className="text-2xl font-bold">{points}</span>
              <span className="text-xs opacity-75">WP</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm opacity-90 mb-1">{levelName}</p>
          <p className="text-xs opacity-75">{nextLevelPoints - points} WP to next level</p>
        </div>

        <div className="pt-4 border-t border-primary-foreground/20">
          <div className="flex justify-between text-xs opacity-75 mb-2">
            <span>Recent Activity</span>
            <span className="text-accent-foreground">+15 WP today</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between opacity-90">
              <span>Completed assignment</span>
              <span className="text-accent-foreground">+10 WP</span>
            </div>
            <div className="flex justify-between opacity-90">
              <span>Daily streak</span>
              <span className="text-accent-foreground">+5 WP</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
