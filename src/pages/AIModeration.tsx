import { Shield, Brain, AlertTriangle, CheckCircle, Activity, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const AIModeration = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-security rounded-2xl mb-6 shadow-glow">
            <Brain className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-security bg-clip-text text-transparent">
            AI Moderation Explained
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How our intelligent AI keeps communication respectful, constructive, and safe for everyone.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How AI Moderation Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center border-2 border-primary/20 hover:border-primary/40 transition-all animate-fade-up">
              <div className="text-4xl font-bold text-primary mb-2">1</div>
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Message Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI scans every whisper in real-time for tone and content
              </p>
            </Card>

            <Card className="p-6 text-center border-2 border-security-teal/20 hover:border-security-teal/40 transition-all animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-security-teal mb-2">2</div>
              <div className="p-3 bg-security-teal/10 rounded-xl w-fit mx-auto mb-4">
                <Brain className="h-6 w-6 text-security-teal" />
              </div>
              <h3 className="font-semibold mb-2">Sentiment Detection</h3>
              <p className="text-sm text-muted-foreground">
                Identifies emotional tone: calm, concerned, anxious, or angry
              </p>
            </Card>

            <Card className="p-6 text-center border-2 border-security-warning/20 hover:border-security-warning/40 transition-all animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-security-warning mb-2">3</div>
              <div className="p-3 bg-security-warning/10 rounded-xl w-fit mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-security-warning" />
              </div>
              <h3 className="font-semibold mb-2">Flag Detection</h3>
              <p className="text-sm text-muted-foreground">
                Flags inappropriate language or bullying automatically
              </p>
            </Card>

            <Card className="p-6 text-center border-2 border-security-success/20 hover:border-security-success/40 transition-all animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-security-success mb-2">4</div>
              <div className="p-3 bg-security-success/10 rounded-xl w-fit mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-security-success" />
              </div>
              <h3 className="font-semibold mb-2">Smart Response</h3>
              <p className="text-sm text-muted-foreground">
                Approves positive messages or provides gentle feedback
              </p>
            </Card>
          </div>
        </div>

        {/* Example Scenarios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-Time Moderation Examples</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Positive Message */}
            <Card className="p-6 border-l-4 border-l-security-success">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-security-success/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-security-success" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-security-success/10 text-security-success border-security-success/20">
                      🌿 Calm
                    </Badge>
                    <span className="text-sm text-muted-foreground">Approved instantly</span>
                  </div>
                  <p className="text-foreground mb-2">"I really enjoyed today's lesson. Can we learn more about this topic?"</p>
                  <p className="text-sm text-muted-foreground">✅ This whisper promotes positive learning and is delivered immediately.</p>
                </div>
              </div>
            </Card>

            {/* Concerned Message */}
            <Card className="p-6 border-l-4 border-l-security-warning">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-security-warning/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-security-warning" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-security-warning/10 text-security-warning border-security-warning/20">
                      😟 Concerned
                    </Badge>
                    <span className="text-sm text-muted-foreground">Flagged for review</span>
                  </div>
                  <p className="text-foreground mb-2">"I'm really struggling with this assignment and don't understand what to do."</p>
                  <p className="text-sm text-muted-foreground">⚠️ Delivered to teacher with priority flag for immediate support.</p>
                </div>
              </div>
            </Card>

            {/* Blocked Message */}
            <Card className="p-6 border-l-4 border-l-security-danger bg-security-danger/5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-security-danger/10 rounded-lg">
                  <Shield className="h-5 w-5 text-security-danger" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="bg-security-danger/10 text-security-danger border-security-danger/20">
                      ❌ Blocked
                    </Badge>
                    <span className="text-sm text-muted-foreground">Not sent</span>
                  </div>
                  <p className="text-foreground/50 mb-2 line-through">"This is stupid and you're an idiot for teaching this."</p>
                  <div className="p-3 bg-card rounded-lg border border-security-danger/20">
                    <p className="text-sm text-security-danger">
                      🚫 Whisper not sent — please maintain positive communication. Let's express concerns respectfully.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Moderation Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Live Moderation Statistics</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Daily Analysis</h3>
                <TrendingUp className="h-5 w-5 text-security-success" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Messages Analyzed</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-security-success">Approved</span>
                    <span className="font-semibold text-security-success">1,198 (96%)</span>
                  </div>
                  <Progress value={96} className="h-2 bg-security-success/20" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-security-warning">Flagged</span>
                    <span className="font-semibold text-security-warning">38 (3%)</span>
                  </div>
                  <Progress value={3} className="h-2 bg-security-warning/20" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-security-danger">Blocked</span>
                    <span className="font-semibold text-security-danger">11 (1%)</span>
                  </div>
                  <Progress value={1} className="h-2 bg-security-danger/20" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Sentiment Distribution</h3>
                <Brain className="h-5 w-5 text-primary" />
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
        </div>

        {/* Trust & Transparency */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-security-glow border-2 border-security-violet/20">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-security bg-clip-text text-transparent">
              Built on Trust & Transparency
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
              Our AI is constantly learning and improving, with human oversight to ensure fairness. 
              We believe in transparent AI that protects students while respecting their voice.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">🤖 Smart & Fair</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">👥 Human Oversight</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">📊 Full Transparency</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">🔄 Always Improving</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIModeration;
