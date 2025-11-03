import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowRight, ArrowLeft, X, Play } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface TutorialStep {
  title: string;
  description: string;
  action: string;
  visual: string;
}

interface TutorialModeProps {
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

const tutorialContent: Record<string, TutorialStep[]> = {
  student: [
    {
      title: 'Sending Your First Whisper',
      description: 'Learn how to send silent messages to your teachers and classmates without interrupting the class.',
      action: 'Type your message in the whisper box and click send',
      visual: '💬'
    },
    {
      title: 'Using Focus Mode',
      description: 'Enable focus mode to silence all notifications and concentrate on your studies.',
      action: 'Toggle the Focus Mode switch in your dashboard',
      visual: '🎯'
    },
    {
      title: 'Checking Announcements',
      description: 'Stay updated with class announcements without any noise or distractions.',
      action: 'View the announcements section for updates',
      visual: '📢'
    }
  ],
  teacher: [
    {
      title: 'Managing Whisper Inbox',
      description: 'Efficiently handle all student messages in one organized, silent space.',
      action: 'Click on messages to read and respond',
      visual: '📬'
    },
    {
      title: 'Creating Silent Polls',
      description: 'Gather instant feedback from students without verbal disruption.',
      action: 'Use the poll creator to ask questions',
      visual: '📊'
    },
    {
      title: 'Viewing Student Insights',
      description: 'Understand student engagement through visual analytics and mood tracking.',
      action: 'Check the insights panel for detailed data',
      visual: '📈'
    }
  ],
  parent: [
    {
      title: 'Monitoring Child Progress',
      description: 'Keep track of your child\'s academic journey and participation in class.',
      action: 'View the overview dashboard for summaries',
      visual: '👨‍👩‍👧'
    },
    {
      title: 'Private Communication',
      description: 'Connect with teachers privately to discuss your child\'s education.',
      action: 'Use the private whisper feature',
      visual: '🤝'
    },
    {
      title: 'Understanding Reports',
      description: 'Read detailed performance analytics and identify areas for improvement.',
      action: 'Navigate to the reports section',
      visual: '📊'
    }
  ],
  admin: [
    {
      title: 'Managing Users',
      description: 'Add, edit, and organize students, teachers, and parents across your institution.',
      action: 'Use the user management panel',
      visual: '👥'
    },
    {
      title: 'Broadcasting Announcements',
      description: 'Send important messages to multiple classes or the entire institution instantly.',
      action: 'Create and schedule broadcasts',
      visual: '📡'
    },
    {
      title: 'Analyzing Trends',
      description: 'Monitor communication patterns and engagement across all classrooms.',
      action: 'View the analytics dashboard',
      visual: '📊'
    }
  ]
};

export const TutorialMode = ({ role }: TutorialModeProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const tutorials = tutorialContent[role];
  const progress = ((currentStep + 1) / tutorials.length) * 100;

  const handleNext = () => {
    if (currentStep < tutorials.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
          <BookOpen className="h-4 w-4" />
          Learn Class Whisper
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Interactive Tutorial
          </SheetTitle>
          <SheetDescription>
            Learn how to use Class Whisper effectively with step-by-step guidance
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Step {currentStep + 1} of {tutorials.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="text-primary"
              >
                <Play className="h-4 w-4 mr-1" />
                Restart
              </Button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Tutorial Content */}
          <Card className="p-6 bg-gradient-subtle animate-fade-in">
            <div className="space-y-4">
              {/* Visual */}
              <div className="h-32 flex items-center justify-center bg-background/50 rounded-lg">
                <div className="text-7xl animate-float">
                  {tutorials[currentStep].visual}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground">
                {tutorials[currentStep].title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground">
                {tutorials[currentStep].description}
              </p>

              {/* Action */}
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary">
                  <span className="mr-2">✨</span>
                  {tutorials[currentStep].action}
                </p>
              </div>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === tutorials.length - 1}
              className="flex-1 bg-gradient-primary"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* All Steps Overview */}
          <div className="pt-6 border-t">
            <h4 className="font-semibold mb-3 text-foreground">All Tutorial Steps</h4>
            <div className="space-y-2">
              {tutorials.map((tutorial, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    idx === currentStep
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tutorial.visual}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{tutorial.title}</p>
                      <p className={`text-xs truncate ${
                        idx === currentStep ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {tutorial.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
