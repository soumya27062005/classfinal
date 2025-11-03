import { Shield, AlertTriangle, CheckCircle, Ban, Eye, TrendingUp, BarChart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ModerationPanel = () => {
  const { toast } = useToast();
  const [flaggedMessages] = useState([
    {
      id: 1,
      sender: 'Student A',
      message: 'This assignment is impossible and makes no sense',
      sentiment: 'anxious',
      reason: 'Negative tone detected',
      timestamp: '10 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      sender: 'Student B',
      message: 'Can someone help me? I feel really lost',
      sentiment: 'concerned',
      reason: 'Requires attention',
      timestamp: '25 minutes ago',
      status: 'pending'
    },
    {
      id: 3,
      sender: 'Student C',
      message: 'This is stupid',
      sentiment: 'angry',
      reason: 'Inappropriate language',
      timestamp: '1 hour ago',
      status: 'blocked'
    },
  ]);

  const handleApprove = (id: number) => {
    toast({
      title: "Message Approved",
      description: "The whisper has been approved and delivered.",
    });
  };

  const handleBlock = (id: number) => {
    toast({
      title: "Message Blocked",
      description: "The whisper has been blocked and sender notified.",
      variant: "destructive",
    });
  };

  const getSentimentEmoji = (sentiment: string) => {
    const emojis: Record<string, string> = {
      calm: '🌿',
      concerned: '😊',
      anxious: '😟',
      angry: '😡'
    };
    return emojis[sentiment] || '🌿';
  };

  const getSentimentColor = (sentiment: string) => {
    const colors: Record<string, string> = {
      calm: 'bg-security-success/10 text-security-success border-security-success/20',
      concerned: 'bg-security-warning/10 text-security-warning border-security-warning/20',
      anxious: 'bg-security-warning/10 text-security-warning border-security-warning/20',
      angry: 'bg-security-danger/10 text-security-danger border-security-danger/20'
    };
    return colors[sentiment] || colors.calm;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-security rounded-xl shadow-glow">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-security bg-clip-text text-transparent">
                AI Moderation Panel
              </h1>
              <p className="text-muted-foreground">Monitor and manage AI-flagged whispers</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Today's Analysis</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-xs text-muted-foreground">Messages analyzed</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Approved</span>
                <CheckCircle className="h-4 w-4 text-security-success" />
              </div>
              <p className="text-2xl font-bold text-security-success">1,198</p>
              <p className="text-xs text-muted-foreground">96% approval rate</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Flagged</span>
                <AlertTriangle className="h-4 w-4 text-security-warning" />
              </div>
              <p className="text-2xl font-bold text-security-warning">38</p>
              <p className="text-xs text-muted-foreground">Needs review</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Blocked</span>
                <Ban className="h-4 w-4 text-security-danger" />
              </div>
              <p className="text-2xl font-bold text-security-danger">11</p>
              <p className="text-xs text-muted-foreground">Auto-blocked</p>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="flagged" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Flagged Messages */}
          <TabsContent value="flagged" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Flagged Whispers</h2>
              <Badge variant="outline" className="bg-security-warning/10 text-security-warning border-security-warning/20">
                {flaggedMessages.filter(m => m.status === 'pending').length} Pending Review
              </Badge>
            </div>

            <div className="space-y-4">
              {flaggedMessages.map((msg) => (
                <Card key={msg.id} className="p-6 border-l-4 border-l-security-warning">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={getSentimentColor(msg.sentiment)}>
                        {getSentimentEmoji(msg.sentiment)} {msg.sentiment}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{msg.sender}</span>
                      <span className="text-xs text-muted-foreground">• {msg.timestamp}</span>
                    </div>
                    <Badge variant={msg.status === 'blocked' ? 'destructive' : 'secondary'}>
                      {msg.status}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-foreground mb-2">{msg.message}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{msg.reason}</span>
                    </div>
                  </div>

                  {msg.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApprove(msg.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Send
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBlock(msg.id)}
                        className="flex-1 text-security-danger hover:text-security-danger"
                      >
                        <Ban className="h-4 w-4 mr-2" />
                        Block Message
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Moderation Logs */}
          <TabsContent value="logs" className="space-y-4">
            <h2 className="text-2xl font-semibold">AI Moderation Logs</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Today's Activity</span>
                    <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Messages Analyzed</span>
                      <span className="font-semibold">1,247</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>

                <div className="pb-4 border-b border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Auto-Approved (Positive)</span>
                    <span className="font-semibold text-security-success">1,198 (96%)</span>
                  </div>
                  <Progress value={96} className="h-2 [&>div]:bg-security-success" />
                </div>

                <div className="pb-4 border-b border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Flagged for Review</span>
                    <span className="font-semibold text-security-warning">38 (3%)</span>
                  </div>
                  <Progress value={3} className="h-2 [&>div]:bg-security-warning" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Auto-Blocked (Harmful)</span>
                    <span className="font-semibold text-security-danger">11 (1%)</span>
                  </div>
                  <Progress value={1} className="h-2 [&>div]:bg-security-danger" />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-2xl font-semibold">AI Performance Analytics</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Bias Detection Report</h3>
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>False Positive Rate</span>
                      <span className="font-semibold text-security-success">2.1%</span>
                    </div>
                    <Progress value={2.1} className="h-2 [&>div]:bg-security-success" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>False Negative Rate</span>
                      <span className="font-semibold text-security-success">1.8%</span>
                    </div>
                    <Progress value={1.8} className="h-2 [&>div]:bg-security-success" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Accuracy</span>
                      <span className="font-semibold text-security-success">96.1%</span>
                    </div>
                    <Progress value={96.1} className="h-2 [&>div]:bg-security-success" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Sentiment Distribution</h3>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>🌿 Calm</span>
                      <span className="font-semibold">892 (71%)</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>😊 Concerned</span>
                      <span className="font-semibold">243 (19%)</span>
                    </div>
                    <Progress value={19} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>😟 Anxious</span>
                      <span className="font-semibold">87 (7%)</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>😡 Angry</span>
                      <span className="font-semibold">25 (2%)</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModerationPanel;
