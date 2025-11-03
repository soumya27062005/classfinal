import { Card } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Activity, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIInsightsProps {
  role: 'teacher' | 'admin' | 'super_admin';
}

export const AIInsights = ({ role }: AIInsightsProps) => {
  const insights = role === 'teacher' 
    ? [
        {
          title: "Today's Engagement",
          value: '87%',
          change: '+12%',
          trend: 'up',
          icon: Activity,
          description: 'active participation'
        },
        {
          title: 'Common Topic',
          value: 'Homework Doubt',
          change: '23 whispers',
          trend: 'neutral',
          icon: MessageSquare,
          description: 'most discussed'
        },
        {
          title: 'Class Mood',
          value: 'Focused 😊',
          change: '+15%',
          trend: 'up',
          icon: Users,
          description: 'positive atmosphere'
        }
      ]
    : role === 'super_admin'
    ? [
        {
          title: 'Platform Growth',
          value: '+15%',
          change: 'this month',
          trend: 'up',
          icon: TrendingUp,
          description: 'new institutions'
        },
        {
          title: 'Total Users',
          value: '12.5K',
          change: '+1.2K today',
          trend: 'up',
          icon: Users,
          description: 'across all institutions'
        },
        {
          title: 'System Health',
          value: '99.9%',
          change: 'uptime',
          trend: 'up',
          icon: Activity,
          description: 'platform stability'
        }
      ]
    : [
        {
          title: 'Weekly Engagement',
          value: '92%',
          change: '+8%',
          trend: 'up',
          icon: TrendingUp,
          description: 'across all classes'
        },
        {
          title: 'Active Users',
          value: '847',
          change: '+54 today',
          trend: 'up',
          icon: Users,
          description: 'students online'
        },
        {
          title: 'Communication Rate',
          value: '2.3K',
          change: '+340 today',
          trend: 'up',
          icon: MessageSquare,
          description: 'whispers exchanged'
        }
      ];

  return (
    <Card className="p-6 bg-gradient-subtle">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
        <h3 className="font-semibold text-foreground">AI Insights</h3>
        <Badge variant="secondary" className="ml-auto">Live</Badge>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="p-4 bg-background/60 rounded-lg hover:bg-background/80 transition-all hover:shadow-md group animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <insight.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{insight.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-foreground">{insight.value}</p>
                  <Badge
                    variant={insight.trend === 'up' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {insight.change}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary font-medium">✨ AI Tip:</span>{' '}
          {role === 'teacher' 
            ? 'Students are most engaged during morning sessions. Consider scheduling important topics early.'
            : role === 'super_admin'
            ? 'Institution B shows 20% higher engagement. Consider sharing their best practices with other institutions.'
            : 'Peak communication happens between 10 AM - 12 PM. Optimize resources accordingly.'}
        </p>
      </div>
    </Card>
  );
};
