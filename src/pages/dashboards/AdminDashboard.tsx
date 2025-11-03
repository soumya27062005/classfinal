import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageCircle, TrendingUp, Radio, BarChart3, UserPlus, Home, LogOut, User } from "lucide-react";
import { WhisperAI } from "@/components/WhisperAI";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { TutorialMode } from "@/components/TutorialMode";
import { AIInsights } from "@/components/AIInsights";
import { useProfile } from "@/hooks/useProfile";

const AdminDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-admin');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);
  const stats = [
    { label: "Total Students", value: "1,284", change: "+12%", icon: Users, color: "primary" },
    { label: "Active Parents", value: "956", change: "+8%", icon: Users, color: "secondary" },
    { label: "Teachers", value: "68", change: "+3", icon: Users, color: "accent" },
    { label: "Messages Today", value: "3,429", change: "+15%", icon: MessageCircle, color: "primary" }
  ];

  const recentActivity = [
    { action: "New student enrolled", user: "Sarah Johnson", time: "5 min ago" },
    { action: "Broadcast sent", user: "Admin", time: "1h ago" },
    { action: "Parent account created", user: "Mike Anderson", time: "2h ago" },
    { action: "Teacher joined", user: "Dr. Emily Chen", time: "3h ago" }
  ];

  const classrooms = [
    { name: "Grade 10-A", students: 32, messages: 156, engagement: 92 },
    { name: "Grade 10-B", students: 30, messages: 142, engagement: 88 },
    { name: "Grade 11-A", students: 28, messages: 134, engagement: 85 },
    { name: "Grade 11-B", students: 31, messages: 148, engagement: 90 }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-up">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Avatar className="h-16 w-16 cursor-pointer hover:ring-2 ring-primary transition-all">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-accent text-accent-foreground text-xl">
                  {profile?.display_name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome, {profile?.display_name || "Admin"}</h1>
              <p className="text-muted-foreground">Manage your institution with confidence</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <TutorialMode role="admin" />
            <Button className="bg-gradient-primary shadow-soft gap-2">
              <Radio className="h-4 w-4" />
              Broadcast
            </Button>
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

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="p-6 shadow-card hover:shadow-glow transition-all animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-${stat.color} rounded-xl shadow-soft`}>
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <h2 className="text-3xl font-bold">{stat.value}</h2>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Analytics */}
          <Card className="md:col-span-2 p-6 shadow-card animate-fade-up" style={{ animationDelay: "200ms" }} data-onboarding="analytics">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Communication Analytics</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Student Messages</span>
                  <span className="text-sm text-muted-foreground">2,145 today</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-gradient-primary h-3 rounded-full" style={{ width: "78%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Parent Engagement</span>
                  <span className="text-sm text-muted-foreground">856 interactions</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-gradient-secondary h-3 rounded-full" style={{ width: "62%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Teacher Response Rate</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div className="bg-gradient-accent h-3 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">89%</p>
                <p className="text-xs text-muted-foreground mt-1">Student Satisfaction</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">4.8/5</p>
                <p className="text-xs text-muted-foreground mt-1">Parent Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">92%</p>
                <p className="text-xs text-muted-foreground mt-1">Engagement Rate</p>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <AIInsights role="admin" />
          
          <Card className="p-6 shadow-card animate-fade-up" style={{ animationDelay: "300ms" }} data-onboarding="broadcast">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-secondary" />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>

            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="pb-4 border-b border-border last:border-0">
                  <p className="font-medium text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.user}</p>
                  <p className="text-xs text-primary mt-1">{item.time}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </Card>

          {/* Classroom Overview */}
          <Card className="md:col-span-3 p-6 shadow-card animate-fade-up" style={{ animationDelay: "400ms" }} data-onboarding="user-management">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Classroom Overview</h2>
              </div>
              <Button variant="outline" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Add Classroom
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {classrooms.map((classroom, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border hover:shadow-soft transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{classroom.name}</h3>
                    <Badge>{classroom.students} students</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Messages today</span>
                      <span className="font-medium">{classroom.messages}</span>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-muted-foreground">Engagement</span>
                        <span className="font-medium">{classroom.engagement}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: `${classroom.engagement}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Whisper AI Assistant */}
      <WhisperAI role="admin" />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow 
          role="admin" 
          onComplete={() => setShowOnboarding(false)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
