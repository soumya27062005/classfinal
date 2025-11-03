import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Link, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Settings, 
  Users,
  Calendar,
  FileText,
  Shield
} from "lucide-react";

const Integrations = () => {
  const { toast } = useToast();
  const [syncProgress, setSyncProgress] = useState(75);

  const platforms = [
    {
      name: "Google Classroom",
      icon: "📚",
      status: "connected",
      lastSync: "5 minutes ago",
      classes: 12,
      students: 456,
      enabled: true
    },
    {
      name: "Canvas LMS",
      icon: "🎨",
      status: "syncing",
      lastSync: "Syncing now...",
      classes: 8,
      students: 234,
      enabled: true
    },
    {
      name: "Moodle",
      icon: "📖",
      status: "error",
      lastSync: "2 hours ago",
      classes: 0,
      students: 0,
      enabled: false
    },
    {
      name: "Microsoft Teams",
      icon: "💼",
      status: "disconnected",
      lastSync: "Never",
      classes: 0,
      students: 0,
      enabled: false
    }
  ];

  const syncLogs = [
    { time: "10:45 AM", action: "Student roster sync", platform: "Google Classroom", status: "success" },
    { time: "10:42 AM", action: "Assignment import", platform: "Canvas", status: "success" },
    { time: "10:30 AM", action: "Grade export", platform: "Google Classroom", status: "success" },
    { time: "09:15 AM", action: "Connection test", platform: "Moodle", status: "failed" }
  ];

  const handleConnect = (platform: string) => {
    toast({
      title: "Connecting...",
      description: `Initiating OAuth2 flow for ${platform}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              System Integrations
            </h1>
            <p className="text-muted-foreground mt-2">
              Connect Class Whisper with your educational platforms
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Link className="w-4 h-4 mr-2" />
            Connect New System
          </Button>
        </div>

        {/* Integration Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Connected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">2</div>
              <p className="text-xs text-muted-foreground">Active integrations</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Students Synced
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">690</div>
              <p className="text-xs text-muted-foreground">Across all platforms</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">20</div>
              <p className="text-xs text-muted-foreground">Total linked classes</p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-gradient-to-br from-card to-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">1</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="platforms" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="logs">Sync Logs</TabsTrigger>
          </TabsList>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-4">
            {platforms.map((platform) => (
              <Card key={platform.name} className="border-primary/20 hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{platform.icon}</div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {platform.name}
                          {platform.status === "connected" && (
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          )}
                          {platform.status === "syncing" && (
                            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              Syncing
                            </Badge>
                          )}
                          {platform.status === "error" && (
                            <Badge variant="destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Error
                            </Badge>
                          )}
                          {platform.status === "disconnected" && (
                            <Badge variant="secondary">Disconnected</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>Last sync: {platform.lastSync}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch checked={platform.enabled} />
                      {platform.status === "connected" || platform.status === "error" ? (
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-primary to-accent"
                          onClick={() => handleConnect(platform.name)}
                        >
                          <Link className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {platform.enabled && (
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <div>
                          <div className="text-sm font-medium">{platform.classes}</div>
                          <div className="text-xs text-muted-foreground">Classes</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        <div>
                          <div className="text-sm font-medium">{platform.students}</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <div>
                          <div className="text-sm font-medium">OAuth2</div>
                          <div className="text-xs text-muted-foreground">Secure</div>
                        </div>
                      </div>
                      {platform.status === "syncing" && (
                        <div className="col-span-2 md:col-span-4">
                          <Progress value={syncProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">Syncing rosters and assignments...</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Field Mapping Tab */}
          <TabsContent value="mapping" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Data Field Mapping</CardTitle>
                <CardDescription>
                  Configure which data fields sync automatically between platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {["Student Rosters", "Assignments", "Grades", "Attendance", "Announcements"].map((field) => (
                  <div key={field} className="flex items-center justify-between p-4 border border-primary/10 rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">{field}</div>
                        <div className="text-sm text-muted-foreground">
                          Auto-sync enabled • LMS overrides conflicts
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch defaultChecked />
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Synchronization Logs</CardTitle>
                    <CardDescription>Recent sync activity across all platforms</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {syncLogs.map((log, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-3 border border-primary/10 rounded-lg hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground w-20">{log.time}</div>
                        <div>
                          <div className="font-medium">{log.action}</div>
                          <div className="text-sm text-muted-foreground">{log.platform}</div>
                        </div>
                      </div>
                      <Badge 
                        className={
                          log.status === "success" 
                            ? "bg-green-500/10 text-green-500 border-green-500/20" 
                            : "bg-red-500/10 text-red-500 border-red-500/20"
                        }
                      >
                        {log.status === "success" ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Integrations;
