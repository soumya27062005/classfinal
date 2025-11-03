import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

export type EncryptionStatus = 'encrypted' | 'pending' | 'blocked';
export type SentimentType = 'calm' | 'concerned' | 'anxious' | 'angry';

interface SecurityContextType {
  encryptionStatus: EncryptionStatus;
  isSessionActive: boolean;
  aiMonitoring: boolean;
  lastActivity: Date;
  updateActivity: () => void;
  checkSentiment: (text: string) => SentimentType;
  moderateMessage: (text: string) => { allowed: boolean; reason?: string };
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export const SecurityProvider = ({ children }: { children: ReactNode }) => {
  const [encryptionStatus] = useState<EncryptionStatus>('encrypted');
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [lastActivity, setLastActivity] = useState(new Date());
  const [aiMonitoring] = useState(true);
  const { toast } = useToast();

  const updateActivity = () => {
    setLastActivity(new Date());
    setIsSessionActive(true);
  };

  // Simple sentiment analysis based on keywords
  const checkSentiment = (text: string): SentimentType => {
    const lowerText = text.toLowerCase();
    
    const angryWords = ['hate', 'angry', 'furious', 'terrible', 'awful'];
    const anxiousWords = ['worried', 'scared', 'anxious', 'nervous', 'concerned'];
    const concernedWords = ['help', 'struggling', 'difficult', 'confused', 'unsure'];
    
    if (angryWords.some(word => lowerText.includes(word))) return 'angry';
    if (anxiousWords.some(word => lowerText.includes(word))) return 'anxious';
    if (concernedWords.some(word => lowerText.includes(word))) return 'concerned';
    return 'calm';
  };

  // Basic content moderation
  const moderateMessage = (text: string): { allowed: boolean; reason?: string } => {
    const lowerText = text.toLowerCase();
    
    const inappropriateWords = ['bullying', 'stupid', 'idiot', 'dumb'];
    const foundWord = inappropriateWords.find(word => lowerText.includes(word));
    
    if (foundWord) {
      return {
        allowed: false,
        reason: 'Whisper not sent — please maintain positive communication.'
      };
    }
    
    return { allowed: true };
  };

  // Session timeout check
  useEffect(() => {
    const checkSession = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity.getTime();
      
      if (timeSinceActivity > SESSION_TIMEOUT && isSessionActive) {
        setIsSessionActive(false);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkSession);
  }, [lastActivity, isSessionActive]);

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      updateActivity();
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  const value = {
    encryptionStatus,
    isSessionActive,
    aiMonitoring,
    lastActivity,
    updateActivity,
    checkSentiment,
    moderateMessage,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
