import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Wifi, RefreshCw, AlertCircle } from "lucide-react";

const OfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [pendingItems, setPendingItems] = useState(3);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setPendingItems(0);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (isOnline && pendingItems === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="p-4 border-primary/20 bg-card/95 backdrop-blur-sm">
        <div className="space-y-3">
          {/* Status Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-destructive" />
              )}
              <span className="font-medium">
                {isOnline ? "Online" : "Offline Mode"}
              </span>
            </div>
            {pendingItems > 0 && (
              <Badge variant="secondary">
                {pendingItems} pending
              </Badge>
            )}
          </div>

          {/* Offline Message */}
          {!isOnline && (
            <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                You're offline. Changes will sync when connection is restored.
              </div>
            </div>
          )}

          {/* Sync Progress */}
          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Syncing changes...</span>
                <span className="font-medium">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          )}

          {/* Sync Button */}
          {isOnline && pendingItems > 0 && !isSyncing && (
            <Button 
              onClick={handleSync}
              className="w-full bg-gradient-to-r from-primary to-accent"
              size="sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
          )}

          {/* Success Message */}
          {!isSyncing && syncProgress === 100 && (
            <div className="text-sm text-green-500 flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              All changes synced successfully
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OfflineSync;
