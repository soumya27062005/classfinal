import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, TrendingUp, Bell, MessageCircle, BookOpen, Activity, Home, LogOut } from "lucide-react";
import { WhisperAI } from "@/components/WhisperAI";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { TutorialMode } from "@/components/TutorialMode";
import { useProfile } from "@/hooks/useProfile";

const ParentDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-parent');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);
  const alerts = [
    { type: "success", message: "Alex scored 95% on Math quiz", time: "2h ago" },
    { type: "info", message: "New homework assigned: Science lab report", time: "5h ago" },
    { type: "warning", message: "Parent-teacher meeting next Monday", time: "1d ago" }
  ];

  const performance = [
    { subject: "Mathematics", grade: "A", trend: "up", percentage: 92 },
    { subject: "English", grade: "B+", trend: "up", percentage: 87 },
    { subject: "Science", grade: "A-", trend: "neutral", percentage: 90 },
    { subject: "History", grade: "B", trend: "down", percentage: 83 }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <Avatar className="h-16 w-16 cursor-pointer hover:ring-2 ring-primary transition-all">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-gradient-secondary text-secondary-foreground text-xl">
                    {profile?.display_name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "P"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="text-4xl font-bold mb-2">{profile?.display_name || "Parent"}'s Dashboard</h1>
                <p className="text-muted-foreground">Monitor your child's academic journey</p>
              </div>
            </div>
            <div className="flex gap-2">
              <TutorialMode role="parent" />
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card className="p-6 shadow-card animate-fade-up bg-gradient-primary text-primary-foreground" data-onboarding="child-overview">
            <Activity className="h-8 w-8 mb-4 opacity-90" />
            <p className="text-sm opacity-90 mb-1">Overall Grade</p>
            <h2 className="text-4xl font-bold">A-</h2>
            <p className="text-sm opacity-75 mt-2">↑ 3% from last month</p>
          </Card>

          <Card className="p-6 shadow-card animate-fade-up bg-gradient-secondary text-secondary-foreground" style={{ animationDelay: "100ms" }}>
            <BookOpen className="h-8 w-8 mb-4 opacity-90" />
            <p className="text-sm opacity-90 mb-1">Assignments</p>
            <h2 className="text-4xl font-bold">12/15</h2>
            <p className="text-sm opacity-75 mt-2">Completed this week</p>
          </Card>

          <Card className="p-6 shadow-card animate-fade-up bg-gradient-accent text-accent-foreground" style={{ animationDelay: "200ms" }}>
            <MessageCircle className="h-8 w-8 mb-4 opacity-90" />
            <p className="text-sm opacity-90 mb-1">Messages</p>
            <h2 className="text-4xl font-bold">8</h2>
            <p className="text-sm opacity-75 mt-2">This week</p>
          </Card>

          {/* Alerts */}
          <Card className="md:col-span-2 p-6 shadow-card animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-bold">Alerts from Teachers</h2>
              </div>
              <Badge>3 New</Badge>
            </div>

            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border-l-4 ${
                    alert.type === "success"
                      ? "bg-primary/5 border-primary"
                      : alert.type === "warning"
                      ? "bg-accent/5 border-accent"
                      : "bg-secondary/5 border-secondary"
                  }`}
                >
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-gradient-secondary">
              View All Messages
            </Button>
          </Card>

          {/* Private Whisper */}
          <Card className="p-6 shadow-card animate-fade-up" style={{ animationDelay: "400ms" }} data-onboarding="private-whisper">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">Private Whisper</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Send a private message to your child's teacher
            </p>

            <textarea
              placeholder="Type your message here..."
              className="w-full p-3 rounded-xl border border-input bg-background resize-none"
              rows={4}
            />

            <Button className="w-full mt-3 bg-gradient-primary">
              Send Message
            </Button>
          </Card>

          {/* Performance Summary */}
          <Card className="md:col-span-3 p-6 shadow-card animate-fade-up" style={{ animationDelay: "500ms" }} data-onboarding="performance">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Performance Summary</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {performance.map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border hover:shadow-soft transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{item.subject}</h3>
                    <Badge className="text-lg px-3 py-1">{item.grade}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Average</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-primary h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      {item.trend === "up" && (
                        <span className="text-primary">↑ Improving</span>
                      )}
                      {item.trend === "neutral" && (
                        <span className="text-muted-foreground">→ Stable</span>
                      )}
                      {item.trend === "down" && (
                        <span className="text-accent">↓ Needs attention</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Whisper AI Assistant */}
      <WhisperAI role="parent" />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow 
          role="parent" 
          onComplete={() => setShowOnboarding(false)} 
        />
      )}
    </div>
  );
};

export default ParentDashboard;
