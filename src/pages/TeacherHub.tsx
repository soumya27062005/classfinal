import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Share2, Award, TrendingUp, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeacherHub = () => {
  const resources = [
    { id: 1, title: 'Interactive Math Quiz Template', author: 'Ms. Johnson', downloads: 234, type: 'Quiz' },
    { id: 2, title: 'Science Lab Report Guide', author: 'Mr. Smith', downloads: 189, type: 'Document' },
    { id: 3, title: 'Creative Writing Prompts', author: 'Ms. Davis', downloads: 156, type: 'Activity' },
  ];

  const polls = [
    { id: 1, question: 'What time works best for parent-teacher meetings?', votes: 45, active: true },
    { id: 2, question: 'Which teaching method is most effective?', votes: 32, active: true },
  ];

  const topTeachers = [
    { id: 1, name: 'Ms. Johnson', badge: 'Mentor of the Week', points: 2850, avatar: '👩‍🏫' },
    { id: 2, name: 'Mr. Smith', badge: 'Engagement Champion', points: 2640, avatar: '👨‍🏫' },
    { id: 3, name: 'Ms. Davis', badge: 'Creative Planner', points: 2430, avatar: '👩‍🏫' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-gradient-primary">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Teacher Collaboration Hub</h1>
                  <p className="text-muted-foreground">Share, learn, and grow together</p>
                </div>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Resource Whispers */}
          <Card className="md:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Share2 className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Resource Whispers</h2>
              </div>
              <Button className="bg-gradient-primary">
                <FileText className="h-4 w-4 mr-2" />
                Share Resource
              </Button>
            </div>

            <div className="space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-5 rounded-xl border border-border hover:shadow-soft transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{resource.type}</Badge>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Shared by {resource.author}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {resource.downloads} downloads
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Reflection Section */}
            <Card className="mt-6 p-6 bg-gradient-subtle border-primary/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">✨ AI Reflection</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    This week's teaching insights powered by Whisper AI
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-background/60">
                      <p className="text-sm">
                        <span className="font-medium text-primary">Top Moment:</span> Your interactive quiz
                        format increased engagement by 34%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/60">
                      <p className="text-sm">
                        <span className="font-medium text-primary">Suggestion:</span> Students respond well
                        to visual aids - consider adding more diagrams
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Teachers */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Top Teachers</h3>
              </div>
              <div className="space-y-3">
                {topTeachers.map((teacher, idx) => (
                  <div
                    key={teacher.id}
                    className={`p-4 rounded-xl ${
                      idx === 0 ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{teacher.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{teacher.name}</p>
                        <p className={`text-xs ${idx === 0 ? 'opacity-90' : 'text-muted-foreground'}`}>
                          {teacher.badge}
                        </p>
                      </div>
                      <Badge variant={idx === 0 ? 'secondary' : 'outline'} className="text-xs">
                        {teacher.points}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Peer Polls */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">Peer Polls</h3>
              </div>
              <div className="space-y-3">
                {polls.map((poll) => (
                  <div key={poll.id} className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-start gap-2 mb-3">
                      {poll.active && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm font-medium mb-2">{poll.question}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{poll.votes} votes</span>
                      <Button variant="link" size="sm" className="h-auto p-0">Vote</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">Create Poll</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHub;
