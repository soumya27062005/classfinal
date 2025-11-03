import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, 
  Webhook, 
  Activity, 
  Shield, 
  Copy, 
  Trash2, 
  Plus,
  Send,
  BarChart3,
  Lock
} from "lucide-react";

const APIGateway = () => {
  const { toast } = useToast();
  const [testPayload, setTestPayload] = useState('{\n  "event": "whisper.sent",\n  "data": {}\n}');

  const apiTokens = [
    { id: 1, name: "Production API", key: "cwp_••••••••••••3x7k", created: "2024-01-15", lastUsed: "5 min ago", requests: 45821 },
    { id: 2, name: "Development API", key: "cwd_••••••••••••9m2p", created: "2024-02-01", lastUsed: "2 hours ago", requests: 1234 },
    { id: 3, name: "Testing Environment", key: "cwt_••••••••••••5h8n", created: "2024-02-10", lastUsed: "Never", requests: 0 }
  ];

  const webhooks = [
    { id: 1, url: "https://api.school.edu/webhooks/whisper", events: ["whisper.sent", "user.joined"], status: "active", lastTrigger: "2 min ago" },
    { id: 2, url: "https://analytics.district.org/events", events: ["moderation.flagged", "sentiment.detected"], status: "active", lastTrigger: "15 min ago" },
    { id: 3, url: "https://backup.service.com/receive", events: ["backup.completed"], status: "paused", lastTrigger: "1 day ago" }
  ];

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({
      title: "Token copied",
      description: "API token copied to clipboard",
    });
  };

  const handleTestWebhook = () => {
    toast({
      title: "Webhook test sent",
      description: "Check your endpoint for the test payload",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
              API Gateway
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage API tokens, webhooks, and integration endpoints
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              View Metrics
            </Button>
            <Button className="bg-gradient-to-r from-accent to-primary hover:opacity-90">
              <Key className="w-4 h-4 mr-2" />
              Generate Token
            </Button>
          </div>
        </div>

        {/* Gateway Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                API Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Operational</div>
              <p className="text-xs text-muted-foreground">99.9% uptime</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" />
                Requests Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">47.2K</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Webhook className="w-4 h-4 text-secondary" />
                Active Webhooks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">2</div>
              <p className="text-xs text-muted-foreground">3 total configured</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Rate Limit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1000/hr</div>
              <p className="text-xs text-muted-foreground">Per API token</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tokens" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="tokens">API Tokens</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          {/* API Tokens Tab */}
          <TabsContent value="tokens" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Tokens</CardTitle>
                    <CardDescription>Manage authentication tokens for API access</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                    <Plus className="w-4 h-4 mr-2" />
                    New Token
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apiTokens.map((token) => (
                    <div 
                      key={token.id}
                      className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Key className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {token.name}
                            <code className="text-xs bg-muted px-2 py-1 rounded">{token.key}</code>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Created {token.created} • Last used {token.lastUsed} • {token.requests.toLocaleString()} requests
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCopyToken(token.key)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
                  <div className="font-medium flex items-center gap-2 text-green-500">
                    <Shield className="w-4 h-4" />
                    OAuth2 & JWT Enabled
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    All API requests require valid authentication tokens
                  </p>
                </div>
                <div className="p-4 border border-primary/20 rounded-lg">
                  <div className="font-medium">Rate Limiting</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    1000 requests per hour per token • Automatic throttling
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-4">
            <Card className="border-accent/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Webhook Endpoints</CardTitle>
                    <CardDescription>Configure event-driven integrations</CardDescription>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-accent to-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {webhooks.map((webhook) => (
                    <div 
                      key={webhook.id}
                      className="p-4 border border-accent/10 rounded-lg hover:border-accent/30 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Webhook className="w-5 h-5 text-accent" />
                          <div>
                            <div className="font-medium font-mono text-sm">{webhook.url}</div>
                            <div className="text-sm text-muted-foreground">
                              Last trigger: {webhook.lastTrigger}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          className={
                            webhook.status === "active"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          }
                        >
                          {webhook.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {webhook.events.map((event) => (
                          <Badge key={event} variant="secondary" className="font-mono text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Test Webhook</CardTitle>
                <CardDescription>Send a test payload to your endpoint</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Endpoint URL</label>
                  <Input placeholder="https://your-domain.com/webhook" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Test Payload</label>
                  <textarea 
                    className="w-full h-32 p-3 bg-muted border border-primary/20 rounded-lg font-mono text-sm"
                    value={testPayload}
                    onChange={(e) => setTestPayload(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-gradient-to-r from-accent to-primary"
                  onClick={handleTestWebhook}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Integration guides and endpoint references</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: "Authentication", desc: "OAuth2 and JWT token authentication", endpoint: "/auth" },
                  { title: "Whisper API", desc: "Send and receive whisper messages", endpoint: "/v1/whispers" },
                  { title: "User Management", desc: "Manage students, teachers, and roles", endpoint: "/v1/users" },
                  { title: "Analytics", desc: "Retrieve insights and metrics", endpoint: "/v1/analytics" },
                  { title: "Webhooks", desc: "Event-driven integration endpoints", endpoint: "/webhooks" }
                ].map((doc) => (
                  <div key={doc.endpoint} className="p-4 border border-primary/10 rounded-lg hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">{doc.title}</div>
                        <div className="text-sm text-muted-foreground">{doc.desc}</div>
                        <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                          {doc.endpoint}
                        </code>
                      </div>
                      <Button variant="outline" size="sm">
                        View Docs
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIGateway;
