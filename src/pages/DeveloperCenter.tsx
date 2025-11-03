import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Book, Download, Terminal, Zap, BarChart3 } from "lucide-react";

const DeveloperCenter = () => {
  const endpoints = [
    { method: "POST", path: "/v1/auth/login", desc: "Authenticate user and receive JWT token" },
    { method: "GET", path: "/v1/whispers", desc: "Retrieve whisper messages for authenticated user" },
    { method: "POST", path: "/v1/whispers", desc: "Send a new whisper message" },
    { method: "GET", path: "/v1/users/:id", desc: "Get user profile information" },
    { method: "PUT", path: "/v1/users/:id", desc: "Update user profile" },
    { method: "GET", path: "/v1/analytics/sentiment", desc: "Retrieve sentiment analysis data" },
    { method: "POST", path: "/v1/moderation/flag", desc: "Flag content for review" }
  ];

  const sdks = [
    { name: "JavaScript / TypeScript", lang: "js", status: "stable" },
    { name: "Python", lang: "python", status: "beta" },
    { name: "Ruby", lang: "ruby", status: "beta" },
    { name: "Java", lang: "java", status: "coming-soon" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Developer Center
            </h1>
            <p className="text-muted-foreground mt-2">
              API documentation, SDKs, and integration resources
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Book className="w-4 h-4 mr-2" />
              Full Docs
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Download SDK
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                API Version
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">v1.2.0</div>
              <p className="text-xs text-muted-foreground">Latest stable</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Avg Latency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">47ms</div>
              <p className="text-xs text-muted-foreground">Global average</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-secondary" />
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">99.8%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">REST API endpoints</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* API Endpoints */}
          <TabsContent value="endpoints" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>REST API Endpoints</CardTitle>
                <CardDescription>Core API endpoints for Class Whisper integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {endpoints.map((endpoint, idx) => (
                    <div 
                      key={idx}
                      className="p-3 border border-primary/10 rounded-lg hover:border-primary/30 transition-all font-mono text-sm"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <Badge 
                          variant={endpoint.method === "GET" ? "secondary" : "default"}
                          className="w-16 justify-center"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-primary">{endpoint.path}</code>
                      </div>
                      <div className="text-muted-foreground text-xs ml-20">
                        {endpoint.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>OAuth2 and JWT token authentication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-2">
                  <div className="text-muted-foreground">// Example authentication request</div>
                  <div>curl -X POST https://api.classwhisper.com/v1/auth/login \</div>
                  <div className="ml-4">-H "Content-Type: application/json" \</div>
                  <div className="ml-4">-d '{"{"}"email": "teacher@school.edu", "password": "***"{"}"}'\</div>
                  <div className="mt-4 text-muted-foreground">// Response</div>
                  <div>{"{"}</div>
                  <div className="ml-4">"token": "eyJhbGciOiJIUzI1NiIs...",</div>
                  <div className="ml-4">"user": {"{"} "id": "123", "role": "teacher" {"}"}</div>
                  <div>{"}"}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SDKs */}
          <TabsContent value="sdks" className="space-y-4">
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Official SDKs</CardTitle>
                <CardDescription>Client libraries for popular programming languages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sdks.map((sdk) => (
                    <div 
                      key={sdk.lang}
                      className="flex items-center justify-between p-4 border border-accent/10 rounded-lg hover:border-accent/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Code className="w-5 h-5 text-accent" />
                        <div>
                          <div className="font-medium">{sdk.name}</div>
                          <Badge 
                            variant={sdk.status === "stable" ? "default" : sdk.status === "beta" ? "secondary" : "outline"}
                            className="mt-1"
                          >
                            {sdk.status}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant={sdk.status === "coming-soon" ? "outline" : "default"}
                        size="sm"
                        disabled={sdk.status === "coming-soon"}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {sdk.status === "coming-soon" ? "Coming Soon" : "Download"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>Quick start with the JavaScript SDK</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">NPM</div>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      npm install @classwhisper/sdk
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Basic Usage</div>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1">
                      <div className="text-muted-foreground">// Initialize the SDK</div>
                      <div>import ClassWhisper from '@classwhisper/sdk';</div>
                      <div className="mt-2">const client = new ClassWhisper({"{"}</div>
                      <div className="ml-4">apiKey: 'your_api_key',</div>
                      <div className="ml-4">environment: 'production'</div>
                      <div>{"}"});</div>
                      <div className="mt-2 text-muted-foreground">// Send a whisper</div>
                      <div>await client.whispers.send({"{"}</div>
                      <div className="ml-4">to: 'student_id',</div>
                      <div className="ml-4">message: 'Great job on the quiz!'</div>
                      <div>{"}"});</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples */}
          <TabsContent value="examples" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Common integration patterns and use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    title: "Send a Whisper Message",
                    code: `const whisper = await client.whispers.send({
  to: 'student_123',
  message: 'Excellent work!',
  sentiment: 'positive',
  encrypted: true
});`
                  },
                  {
                    title: "Subscribe to Real-time Events",
                    code: `client.subscribe('whisper.received', (event) => {
  console.log('New whisper:', event.data);
  // Handle incoming whisper
});`
                  },
                  {
                    title: "Moderate Content",
                    code: `const result = await client.moderation.analyze({
  text: 'Message content',
  returnSentiment: true
});

if (result.flagged) {
  console.log('Content flagged:', result.reason);
}`
                  }
                ].map((example, idx) => (
                  <div key={idx}>
                    <div className="font-medium mb-2">{example.title}</div>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                      {example.code}
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

export default DeveloperCenter;
