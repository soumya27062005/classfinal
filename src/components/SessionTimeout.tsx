import { useEffect, useState } from 'react';
import { useSecurity } from '@/contexts/SecurityContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Clock } from 'lucide-react';

const SessionTimeout = () => {
  const { isSessionActive, updateActivity } = useSecurity();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!isSessionActive) {
      setShowDialog(true);
    }
  }, [isSessionActive]);

  const handleContinue = () => {
    updateActivity();
    setShowDialog(false);
  };

  const handleLogout = () => {
    setShowDialog(false);
    window.location.href = '/login';
  };

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogContent className="border-2 border-security-violet/20">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-security rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <AlertDialogTitle>Session Timeout</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            You've been silent for a while. Do you want to stay logged in?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLogout}>Logout</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleContinue}
            className="bg-gradient-security"
          >
            Stay Logged In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionTimeout;
