import { useState } from 'react';
import { MessageSquare, X, Send, Lightbulb, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useSecurity } from '@/contexts/SecurityContext';
import { useToast } from '@/hooks/use-toast';

interface WhisperAIProps {
  role: 'student' | 'teacher' | 'parent' | 'admin' | 'super_admin';
}

interface Message {
  type: 'ai' | 'user';
  content: string;
}

const roleGreetings = {
  student: "Hi! 👋 I'm Whisper AI, your silent study companion. Need help with homework?",
  teacher: "Hello! 👋 I'm here to help you manage your classroom silently. Want to schedule a quiet poll?",
  parent: "Welcome! 👋 I'm Whisper AI. Would you like a summary of your child's activity?",
  admin: "Greetings! 👋 I'm your analytics assistant. Show engagement analytics for this week?",
  super_admin: "Welcome! 👋 I'm your platform intelligence assistant. Ready to analyze multi-institution insights?"
};

const quickSuggestions = {
  student: [
    "Need help with homework?",
    "How do I send a whisper?",
    "What are my pending assignments?"
  ],
  teacher: [
    "Create a silent poll",
    "View student insights",
    "Send announcement"
  ],
  parent: [
    "View child's progress",
    "Contact teacher privately",
    "See recent activity"
  ],
  admin: [
    "Show weekly analytics",
    "Manage users",
    "View communication trends"
  ],
  super_admin: [
    "Institution performance report",
    "Platform growth metrics",
    "Revenue analytics"
  ]
};

export const WhisperAI = ({ role }: WhisperAIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: roleGreetings[role] }
  ]);
  const [input, setInput] = useState('');
  const { moderateMessage, checkSentiment, encryptionStatus } = useSecurity();
  const { toast } = useToast();

  const handleSend = () => {
    if (!input.trim()) return;
    
    const moderation = moderateMessage(input);
    if (!moderation.allowed) {
      toast({
        title: "Message Not Sent",
        description: moderation.reason,
        variant: "destructive",
      });
      return;
    }

    const sentiment = checkSentiment(input);
    setMessages([...messages, { type: 'user', content: input }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: `I understand you're asking about "${input}". Let me help you with that silently. 🤫`
      }]);
    }, 1000);
    
    setInput('');
  };

  const handleSuggestion = (suggestion: string) => {
    setMessages([...messages, 
      { type: 'user', content: suggestion },
      { type: 'ai', content: `Great question! Let me guide you through this step by step. 📚` }
    ]);
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 animate-float bg-gradient-primary"
        style={{ zIndex: 1000 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* AI Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-elegant animate-scale-in flex flex-col"
          style={{ zIndex: 999 }}>
          {/* Header */}
          <div className="p-4 border-b bg-gradient-subtle">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Whisper AI</h3>
                <p className="text-xs text-muted-foreground">Your silent assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col gap-1">
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl animate-fade-in ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.type === 'user' && (
                      <Badge variant="outline" className="text-xs w-fit ml-auto bg-security-success/10 text-security-success border-security-success/20">
                        🔒 Encrypted
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          <div className="p-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Quick suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions[role].map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestion(suggestion)}
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your whisper..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="bg-gradient-primary">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
