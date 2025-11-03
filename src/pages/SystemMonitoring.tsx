import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Database,
  Cloud,
  Webhook,
  RefreshCw
} from "lucide-react";

const SystemMonitoring = () => {
  const integrationHealth = [
    { name: "Google Classroom", status: "healthy", uptime: "99.9%", latency: "42ms", requests: "15.2K" },
    { name: "Canvas LMS", status: "healthy", uptime: "99.7%", latency: "58ms", requests: "8.4K" },
    { name: "Moodle", status: "degraded", uptime: "97.3%", latency: "156ms", requests: "2.1K" },
    { name: "Microsoft Teams", status: "offline", uptime: "0%", latency: "—", requests: "0" }
  ];

  const backupStatus = [
    { type: "Last Backup", status: "success", time: "5 hours ago", size: "2.4 GB" },
    { type: "Next Scheduled", status: "pending", time: "In 19 hours", size: "—" },
    { type: "Region Sync", status: "success", time: "2 min ago", size: "US-East ↔ EU-West" },
    { type: "Encryption", status: "verified", time: "Active", size: "AES-256" }
  ];

  const syncMetrics = [
    { item: "Student Rosters", pending: 0, synced: 690, failed: 2 },
    { item: "Assignments", pending: 3, synced: 245, failed: 0 },
    { item: "Grades", pending: 12, synced: 1834, failed: 1 },
    { item: "Announcements", pending: 0, synced: 89, failed: 0 }
  ];

  const webhookLogs = [
    { url: "api.school.edu/webhooks", event: "whisper.sent", status: "delivered", time: "2 min ago" },
    { url: "analytics.district.org", event: "moderation.flagged", status: "delivered", time: "8 min ago" },
    { url: "backup.service.com", event: "backup.completed", status: "failed", time: "1 hour ago" },
    { url: "api.school.edu/webhooks", event: "user.joined", status: "delivered", time: "2 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            System Monitoring
          </h1>
          <p className="text-muted-foreground mt-2">
            Real-time health metrics and integration status
          </p>
        </div>

        {/* Overall Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Operational</div>
              <p className="text-xs text-muted-foreground">All systems running</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">99.8%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4 text-accent" />
                Sync Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">15</div>
              <p className="text-xs text-muted-foreground">Pending items</p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20 bg-gradient-to-br from-card to-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Active Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">2</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Health */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Integration Health</CardTitle>
                <CardDescription>Connection status and performance metrics</CardDescription>
              </div>
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {integrationHealth.map((integration) => (
                <div 
                  key={integration.name}
                  className="p-4 border border-primary/10 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="font-medium">{integration.name}</div>
                      {integration.status === "healthy" && (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Healthy
                        </Badge>
                      )}
                      {integration.status === "degraded" && (
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Degraded
                        </Badge>
                      )}
                      {integration.status === "offline" && (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Offline
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Uptime</div>
                      <div className="font-medium">{integration.uptime}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Latency</div>
                      <div className="font-medium">{integration.latency}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Requests/day</div>
                      <div className="font-medium">{integration.requests}</div>
                    </div>
                  </div>
                  {integration.status !== "offline" && (
                    <Progress value={parseFloat(integration.uptime)} className="h-2 mt-3" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backup Health */}
        <Card className="border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-secondary" />
              Backup Health
            </CardTitle>
            <CardDescription>Backup status and disaster recovery metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {backupStatus.map((backup) => (
                <div 
                  key={backup.type}
                  className="p-4 border border-secondary/10 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{backup.type}</div>
                    {backup.status === "success" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {backup.status === "verified" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {backup.status === "pending" && (
                      <RefreshCw className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{backup.time}</div>
                  <div className="text-sm font-medium mt-1">{backup.size}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync Metrics */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Offline Sync Metrics
            </CardTitle>
            <CardDescription>Data synchronization status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {syncMetrics.map((metric) => (
                <div key={metric.item} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{metric.item}</div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-yellow-500">{metric.pending} pending</span>
                      <span className="text-green-500">{metric.synced} synced</span>
                      {metric.failed > 0 && (
                        <span className="text-destructive">{metric.failed} failed</span>
                      )}
                    </div>
                  </div>
                  <Progress 
                    value={(metric.synced / (metric.synced + metric.pending + metric.failed)) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Webhook Logs */}
        <Card className="border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="w-5 h-5 text-accent" />
              Event Reliability
            </CardTitle>
            <CardDescription>Recent webhook delivery logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {webhookLogs.map((log, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 border border-accent/10 rounded-lg"
                >
                  <div>
                    <div className="font-medium font-mono text-sm">{log.url}</div>
                    <div className="text-xs text-muted-foreground">
                      {log.event} • {log.time}
                    </div>
                  </div>
                  {log.status === "delivered" ? (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Delivered
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="w-3 h-3 mr-1" />
                      Failed
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitoring;
