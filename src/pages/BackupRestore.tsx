import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Database, 
  Cloud, 
  Shield, 
  Calendar, 
  Download, 
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Globe,
  HardDrive
} from "lucide-react";

const BackupRestore = () => {
  const { toast } = useToast();
  const [autoBackup, setAutoBackup] = useState(true);

  const backups = [
    { 
      id: 1, 
      timestamp: "2024-02-15 03:00 AM", 
      size: "2.4 GB", 
      status: "success", 
      type: "automatic",
      regions: ["US-East", "EU-West"],
      encrypted: true
    },
    { 
      id: 2, 
      timestamp: "2024-02-14 03:00 AM", 
      size: "2.3 GB", 
      status: "success", 
      type: "automatic",
      regions: ["US-East", "EU-West"],
      encrypted: true
    },
    { 
      id: 3, 
      timestamp: "2024-02-13 11:30 AM", 
      size: "2.3 GB", 
      status: "success", 
      type: "manual",
      regions: ["US-East"],
      encrypted: true
    },
    { 
      id: 4, 
      timestamp: "2024-02-13 03:00 AM", 
      size: "2.2 GB", 
      status: "failed", 
      type: "automatic",
      regions: [],
      encrypted: false
    }
  ];

  const handleBackupNow = () => {
    toast({
      title: "Backup started",
      description: "Creating manual backup of all data...",
    });
  };

  const handleRestore = (backupId: number) => {
    toast({
      title: "Restore initiated",
      description: `Preparing to restore backup #${backupId}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
              Backup & Restore
            </h1>
            <p className="text-muted-foreground mt-2">
              Secure cloud backups with multi-region replication
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button 
              className="bg-gradient-to-r from-secondary to-primary hover:opacity-90"
              onClick={handleBackupNow}
            >
              <Database className="w-4 h-4 mr-2" />
              Backup Now
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Last Backup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">5 hours ago</div>
              <p className="text-xs text-muted-foreground">Automatic • Success</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                Encryption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-500">AES-256</div>
              <p className="text-xs text-muted-foreground">Military grade</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Cloud className="w-4 h-4 text-accent" />
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-accent">14.2 GB</div>
              <p className="text-xs text-muted-foreground">Of 100 GB allocated</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4 text-secondary" />
                Replication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-secondary">2 Regions</div>
              <p className="text-xs text-muted-foreground">Multi-region sync</p>
            </CardContent>
          </Card>
        </div>

        {/* Backup Settings */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Backup Configuration</CardTitle>
            <CardDescription>Manage automatic backup settings and retention policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-primary/10 rounded-lg">
              <div>
                <div className="font-medium">Automatic Daily Backups</div>
                <div className="text-sm text-muted-foreground">
                  Run backup every day at 3:00 AM UTC
                </div>
              </div>
              <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-4 h-4 text-primary" />
                  <div className="font-medium">Retention Period</div>
                </div>
                <div className="text-sm text-muted-foreground">Keep backups for 30 days</div>
              </div>

              <div className="p-4 border border-primary/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <div className="font-medium">Replication Regions</div>
                </div>
                <div className="text-sm text-muted-foreground">US-East, EU-West</div>
              </div>
            </div>

            <div className="p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-500" />
                <div className="font-medium text-green-500">Encryption Status</div>
              </div>
              <div className="text-sm text-muted-foreground">
                All backups are encrypted with AES-256 encryption using AWS KMS
              </div>
              <Progress value={100} className="mt-3 h-2 bg-green-500/20" />
            </div>
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Backup History</CardTitle>
                <CardDescription>Recent backup snapshots and restore points</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backups.map((backup) => (
                <div 
                  key={backup.id}
                  className="p-4 border border-primary/10 rounded-lg hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <Database className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          Backup #{backup.id}
                          <Badge variant={backup.type === "automatic" ? "secondary" : "default"}>
                            {backup.type}
                          </Badge>
                          {backup.status === "success" ? (
                            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Success
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Failed
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {backup.timestamp} • {backup.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {backup.status === "success" && (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-primary to-secondary"
                          onClick={() => handleRestore(backup.id)}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>

                  {backup.status === "success" && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Encrypted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-accent" />
                        <span className="text-muted-foreground">
                          {backup.regions.join(", ")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disaster Recovery */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Disaster Recovery</CardTitle>
            <CardDescription>Emergency restore and failover procedures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-primary/20 rounded-lg">
              <div className="font-medium mb-2">Recovery Time Objective (RTO)</div>
              <div className="text-2xl font-bold text-primary mb-1">&lt; 4 hours</div>
              <div className="text-sm text-muted-foreground">
                Maximum time to restore full system functionality
              </div>
            </div>

            <div className="p-4 border border-primary/20 rounded-lg">
              <div className="font-medium mb-2">Recovery Point Objective (RPO)</div>
              <div className="text-2xl font-bold text-accent mb-1">&lt; 24 hours</div>
              <div className="text-sm text-muted-foreground">
                Maximum acceptable data loss in case of failure
              </div>
            </div>

            <div className="p-4 border border-primary/20 rounded-lg">
              <div className="font-medium mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-secondary" />
                Multi-Region Failover
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                Automatic failover to secondary region if primary becomes unavailable
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  US-East (Primary)
                </Badge>
                <Badge variant="secondary">EU-West (Backup)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackupRestore;
