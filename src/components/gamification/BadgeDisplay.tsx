import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Target, Zap, Users, BookOpen, Brain } from 'lucide-react';

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  icon: any;
  earned: boolean;
  color: string;
}

export const BadgeDisplay = ({ role }: { role: 'student' | 'teacher' | 'parent' | 'admin' }) => {
  const studentBadges: BadgeItem[] = [
    { id: '1', name: 'Silent Scholar', description: 'Consistent participation', icon: BookOpen, earned: true, color: 'text-primary' },
    { id: '2', name: 'Calm Communicator', description: 'Respectful whispering', icon: Users, earned: true, color: 'text-secondary' },
    { id: '3', name: 'Focus Master', description: '7-day login streak', icon: Target, earned: false, color: 'text-accent' },
    { id: '4', name: 'Team Whisper', description: 'Group collaboration', icon: Zap, earned: true, color: 'text-primary' },
  ];

  const teacherBadges: BadgeItem[] = [
    { id: '1', name: 'Mentor of the Week', description: 'Top engagement', icon: Award, earned: true, color: 'text-primary' },
    { id: '2', name: 'Creative Planner', description: 'Innovative lessons', icon: Brain, earned: true, color: 'text-secondary' },
    { id: '3', name: 'Engagement Champion', description: 'High student activity', icon: Users, earned: false, color: 'text-accent' },
  ];

  const badges = role === 'student' ? studentBadges : role === 'teacher' ? teacherBadges : studentBadges;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Achievements</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
              badge.earned 
                ? 'bg-gradient-subtle border-primary/20 hover:scale-105' 
                : 'bg-muted/20 border-muted opacity-50'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className={`p-3 rounded-full ${badge.earned ? 'bg-primary/10 animate-pulse-glow' : 'bg-muted'}`}>
                <badge.icon className={`h-6 w-6 ${badge.earned ? badge.color : 'text-muted-foreground'}`} />
              </div>
              <h3 className="font-semibold text-sm">{badge.name}</h3>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
              {badge.earned && (
                <Badge variant="default" className="text-xs">Earned</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
