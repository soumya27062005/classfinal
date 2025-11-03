import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, X } from 'lucide-react';

interface OnboardingStep {
  target: string;
  title: string;
  description: string;
}

interface OnboardingFlowProps {
  steps?: OnboardingStep[];
  role?: 'student' | 'teacher' | 'parent' | 'admin' | 'super_admin';
  onComplete: () => void;
}

const onboardingSteps: Record<string, OnboardingStep[]> = {
  student: [
    {
      target: 'whisper-board',
      title: 'Whisper Board',
      description: 'This is where you send silent messages to teachers or classmates. 💬'
    },
    {
      target: 'announcements',
      title: 'Announcements',
      description: 'All updates appear here quietly. Stay informed without noise. 📢'
    },
    {
      target: 'focus-mode',
      title: 'Focus Mode',
      description: 'Silence notifications to stay productive. Your learning, uninterrupted. 🎯'
    }
  ],
  teacher: [
    {
      target: 'inbox',
      title: 'Whisper Inbox',
      description: 'All student whispers appear here. Respond silently and efficiently. 📬'
    },
    {
      target: 'assignments',
      title: 'Assignment Manager',
      description: 'Track and manage classwork easily. Keep students on track. 📝'
    },
    {
      target: 'polls',
      title: 'Silent Polls',
      description: 'Collect quick silent feedback. Understand your class instantly. 📊'
    }
  ],
  parent: [
    {
      target: 'child-overview',
      title: "Child's Overview",
      description: 'Monitor your child\'s activity and progress at a glance. 👨‍👩‍👧'
    },
    {
      target: 'private-whisper',
      title: 'Private Whisper',
      description: 'Communicate directly with teachers privately and silently. 🤝'
    },
    {
      target: 'performance',
      title: 'Performance Report',
      description: 'View detailed insights and analytics about your child\'s learning. 📈'
    }
  ],
  admin: [
    {
      target: 'analytics',
      title: 'Analytics Dashboard',
      description: 'Monitor engagement and communication trends across all classes. 📊'
    },
    {
      target: 'user-management',
      title: 'User Management',
      description: 'Manage students, teachers, and parents efficiently. 👥'
    },
    {
      target: 'broadcast',
      title: 'Broadcast Center',
      description: 'Send announcements to multiple classes or users instantly. 📡'
    }
  ]
};

export const OnboardingFlow = ({ steps: customSteps, role, onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const steps = customSteps || (role && onboardingSteps[role]) || [];
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    // Highlight the target element
    const targetElement = document.querySelector(`[data-onboarding="${steps[currentStep].target}"]`);
    if (targetElement) {
      targetElement.classList.add('onboarding-highlight');
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove('onboarding-highlight');
      }
    };
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
    if (role) {
      localStorage.setItem(`onboarding-${role}`, 'completed');
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] animate-fade-in" />

      {/* Onboarding Card */}
      <Card className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md p-6 z-[999] animate-scale-in shadow-elegant">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {steps[currentStep].title}
            </h3>
            <p className="text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </div>

          {/* Illustration placeholder */}
          <div className="h-40 bg-gradient-subtle rounded-xl flex items-center justify-center">
            <div className="text-6xl animate-float">
              {currentStep === 0 ? '💬' : currentStep === 1 ? '📢' : '✨'}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Get Started! 🎉'
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Global styles for highlighting */}
      <style>{`
        .onboarding-highlight {
          position: relative;
          z-index: 997;
          border-radius: 12px;
          box-shadow: 0 0 0 4px hsl(var(--primary)), 0 0 20px 8px hsl(var(--primary) / 0.3);
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </>
  );
};
