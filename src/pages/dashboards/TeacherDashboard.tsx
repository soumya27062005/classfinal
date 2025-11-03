import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  MessageSquare,
  Users,
  FileText,
  Bell,
  BarChart3,
  Vote,
  Lock,
  Sparkles,
  LogOut,
  Send,
  Upload,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Smile,
  Meh,
  Frown,
  Home,
  User,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import teacherImage from "@/assets/teacher-feature.jpg";
import { WhisperAI } from "@/components/WhisperAI";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { TutorialMode } from "@/components/TutorialMode";
import { AIInsights } from "@/components/AIInsights";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState("inbox");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [whisperStates, setWhisperStates] = useState<Record<number, {
    liked: boolean;
    hearted: boolean;
    read: boolean;
  }>>({});

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-teacher');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // Mock data
  const classStats = {
    totalStudents: 28,
    activeWhispers: 12,
    pendingHomework: 5,
    moodSummary: { happy: 18, neutral: 7, sad: 3 },
  };

  const whispers = [
    { id: 1, student: "Emma Wilson", message: "Can you explain question 3?", tag: "homework doubt", emoji: "🤔", time: "5m ago" },
    { id: 2, student: "Liam Chen", message: "I finished early!", tag: "feedback", emoji: "🎉", time: "12m ago" },
    { id: 3, student: "Sophia Rodriguez", message: "I need help understanding the concept", tag: "urgent", emoji: "🆘", time: "20m ago" },
    { id: 4, student: "Noah Johnson", message: "Thank you for yesterday's lesson", tag: "feedback", emoji: "🙏", time: "1h ago" },
  ];

  const assignments = [
    { id: 1, title: "Chapter 5: Silent Reading", due: "Tomorrow", completed: 22, total: 28, status: "active" },
    { id: 2, title: "Math Worksheet - Algebra", due: "Friday", completed: 15, total: 28, status: "active" },
    { id: 3, title: "Science Project Proposal", due: "Next Week", completed: 8, total: 28, status: "upcoming" },
  ];

  const insights = [
    { name: "Most Active", count: 24, color: "bg-primary" },
    { name: "Needs Support", count: 8, color: "bg-accent" },
    { name: "On Track", count: 16, color: "bg-secondary" },
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "urgent": return "bg-destructive";
      case "homework doubt": return "bg-accent";
      case "feedback": return "bg-secondary";
      default: return "bg-muted";
    }
  };

  const handleReply = (studentName: string) => {
    toast({
      title: "Reply Mode",
      description: `Replying to ${studentName}...`,
    });
  };

  const handleLike = (whisperId: number) => {
    const currentState = whisperStates[whisperId]?.liked;
    setWhisperStates(prev => ({
      ...prev,
      [whisperId]: { ...prev[whisperId], liked: !currentState }
    }));
    toast({
      title: currentState ? "Like removed" : "Liked! 👍",
      description: "Student will be notified",
    });
  };

  const handleHeart = (whisperId: number) => {
    const currentState = whisperStates[whisperId]?.hearted;
    setWhisperStates(prev => ({
      ...prev,
      [whisperId]: { ...prev[whisperId], hearted: !currentState }
    }));
    toast({
      title: currentState ? "Heart removed" : "Hearted! ❤️",
      description: "Student will be notified",
    });
  };

  const handleMarkAsRead = (whisperId: number) => {
    const currentState = whisperStates[whisperId]?.read;
    setWhisperStates(prev => ({
      ...prev,
      [whisperId]: { ...prev[whisperId], read: !currentState }
    }));
    toast({
      title: currentState ? "Marked as unread" : "Marked as read ✅",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-soft backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 ring-primary transition-all">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-secondary text-secondary-foreground">
                  {profile?.display_name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "T"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{profile?.display_name || "Teacher"}'s Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <TutorialMode role="teacher" />
            <Badge variant="outline" className="gap-1">
              <Users className="h-3 w-3" />
              {classStats.totalStudents} Students
            </Badge>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-primary p-8 text-primary-foreground shadow-glow">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <img 
              src={teacherImage} 
              alt="Teacher managing whispers" 
              className="w-full md:w-1/3 rounded-lg shadow-card animate-float"
            />
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold">Welcome back, {profile?.display_name || "Professor"}!</h2>
              <p className="text-lg opacity-90">
                Your classroom is thriving. {classStats.activeWhispers} new whispers waiting for you.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="gap-2" onClick={() => navigate('/dashboard/teacher/announcement')}>
                  <Send className="h-4 w-4" />
                  New Announcement
                </Button>
                <Button variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 border-white/20" onClick={() => navigate('/dashboard/teacher/poll')}>
                  <Vote className="h-4 w-4" />
                  Quick Poll
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Class Overview Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-soft hover:shadow-glow transition-shadow animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{classStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Active in class</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-shadow animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Whispers</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{classStats.activeWhispers}</div>
              <p className="text-xs text-muted-foreground">Received today</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-shadow animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Homework</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{classStats.pendingHomework}</div>
              <p className="text-xs text-muted-foreground">Awaiting submission</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-shadow animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Student Mood</CardTitle>
              <Smile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                  <Smile className="h-4 w-4 text-secondary" />
                  <span className="text-sm">{classStats.moodSummary.happy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Meh className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{classStats.moodSummary.neutral}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Frown className="h-4 w-4 text-destructive" />
                  <span className="text-sm">{classStats.moodSummary.sad}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Overall positive</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="inbox" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Inbox</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="polls" className="gap-2">
              <Vote className="h-4 w-4" />
              <span className="hidden sm:inline">Polls</span>
            </TabsTrigger>
            <TabsTrigger value="private" className="gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Private</span>
            </TabsTrigger>
          </TabsList>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4 animate-fade-in">
            <Card className="shadow-card" data-onboarding="inbox">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Class Whisper Inbox
                </CardTitle>
                <CardDescription>Messages from your students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {whispers.map((whisper) => (
                  <div
                    key={whisper.id}
                    className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{whisper.student}</span>
                        <Badge className={getTagColor(whisper.tag)} variant="secondary">
                          {whisper.tag}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{whisper.time}</span>
                      </div>
                      <p className="text-sm flex items-center gap-2">
                        <span className="text-xl">{whisper.emoji}</span>
                        {whisper.message}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => handleReply(whisper.student)}>
                        <Send className="h-3 w-3" />
                        Reply
                      </Button>
                      <Button 
                        size="sm" 
                        variant={whisperStates[whisper.id]?.liked ? "default" : "ghost"}
                        onClick={() => handleLike(whisper.id)}
                      >
                        👍
                      </Button>
                      <Button 
                        size="sm" 
                        variant={whisperStates[whisper.id]?.hearted ? "default" : "ghost"}
                        onClick={() => handleHeart(whisper.id)}
                      >
                        ❤️
                      </Button>
                      <Button 
                        size="sm" 
                        variant={whisperStates[whisper.id]?.read ? "default" : "ghost"}
                        onClick={() => handleMarkAsRead(whisper.id)}
                      >
                        ✅
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center" data-onboarding="assignments">
              <h3 className="text-lg font-semibold">Assignment Manager</h3>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                New Assignment
              </Button>
            </div>
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="shadow-soft hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{assignment.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          Due: {assignment.due}
                        </CardDescription>
                      </div>
                      <Badge variant={assignment.status === "active" ? "default" : "outline"}>
                        {assignment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion: {assignment.completed}/{assignment.total}</span>
                        <span className="text-muted-foreground">
                          {Math.round((assignment.completed / assignment.total) * 100)}%
                        </span>
                      </div>
                      <Progress value={(assignment.completed / assignment.total) * 100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="animate-fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Create Announcement
                </CardTitle>
                <CardDescription>Share updates with your class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Announcement title..." className="h-12" />
                <Textarea placeholder="Type your message here..." rows={6} />
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">📎 Attach</Button>
                  <Button variant="outline" size="sm">😊 Emoji</Button>
                  <Button variant="outline" size="sm">🎨 Icon</Button>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="gap-2">
                    <Send className="h-4 w-4" />
                    Send to Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4 animate-fade-in">
            <AIInsights role="teacher" />
            
            {/* Real-Time Charts Section */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="h-4 w-4" />
                    Whisper Activity (Live)
                  </CardTitle>
                  <CardDescription>Messages received per hour today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { time: "9 AM", count: 8, max: 12 },
                      { time: "10 AM", count: 12, max: 12 },
                      { time: "11 AM", count: 10, max: 12 },
                      { time: "12 PM", count: 5, max: 12 },
                      { time: "1 PM", count: 7, max: 12 },
                      { time: "2 PM", count: 11, max: 12 },
                    ].map((item) => (
                      <div key={item.time} className="flex items-center gap-3">
                        <span className="text-xs w-12 text-muted-foreground">{item.time}</span>
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div 
                            className="bg-gradient-primary h-full rounded-full flex items-center justify-end px-2 transition-all duration-500"
                            style={{ width: `${(item.count / item.max) * 100}%` }}
                          >
                            <span className="text-xs font-bold text-primary-foreground">{item.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Smile className="h-4 w-4" />
                    Student Mood Trends
                  </CardTitle>
                  <CardDescription>Real-time emotional tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Smile className="h-4 w-4 text-secondary" />
                          Happy
                        </span>
                        <span className="font-bold">64%</span>
                      </div>
                      <Progress value={64} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Meh className="h-4 w-4 text-muted-foreground" />
                          Neutral
                        </span>
                        <span className="font-bold">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Frown className="h-4 w-4 text-destructive" />
                          Needs Support
                        </span>
                        <span className="font-bold">11%</span>
                      </div>
                      <Progress value={11} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Student Insights
                </CardTitle>
                <CardDescription>Engagement and participation analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-card space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{insight.name}</span>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="text-3xl font-bold">{insight.count}</div>
                      <div className={`h-2 rounded-full ${insight.color} opacity-20`}></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Top Participants This Week</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emma Wilson</span>
                      <Badge>32 whispers</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Liam Chen</span>
                      <Badge>28 whispers</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sophia Rodriguez</span>
                      <Badge>24 whispers</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Polls Tab */}
          <TabsContent value="polls" className="space-y-4 animate-fade-in">
            <Card className="shadow-card" data-onboarding="polls">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Silent Poll / Quick Feedback
                </CardTitle>
                <CardDescription>Check class understanding instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Poll question..." className="h-12" />
                <div className="space-y-2">
                  <label className="text-sm font-medium">Response Type</label>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm">👍 👎 Yes/No</Button>
                    <Button variant="outline" size="sm">😊 😐 😞 Emoji</Button>
                    <Button variant="outline" size="sm">1-5 Rating</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Silent Mode
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Hide results until poll closes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button className="w-full gap-2" onClick={() => {
                  toast({
                    title: "Silent Poll Sent! 🤫",
                    description: "Students can now respond. Results will be revealed when you close the poll.",
                  });
                }}>
                  <Send className="h-4 w-4" />
                  Send Silent Poll
                </Button>
                <div className="mt-6 p-4 rounded-lg border bg-muted/30">
                  <h4 className="font-semibold mb-3 flex items-center justify-between">
                    <span>Active Silent Polls</span>
                    <Badge variant="secondary" className="gap-1">
                      <Lock className="h-3 w-3" />
                      Results Hidden
                    </Badge>
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-card border">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium">Do you understand the topic?</span>
                        <Badge variant="outline">24 responses</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">Started 15 minutes ago</p>
                      <Button size="sm" variant="outline" className="w-full" onClick={() => {
                        toast({
                          title: "Poll Closed & Results Revealed! 📊",
                          description: "👍 22 | 👎 6",
                        });
                      }}>
                        Close & Reveal Results
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Private Whisper Tab */}
          <TabsContent value="private" className="animate-fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Private Whisper Mode
                </CardTitle>
                <CardDescription>Secure one-on-one communication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">End-to-End Encrypted</p>
                    <p className="text-xs text-muted-foreground">
                      Your private conversations are secure and only visible to you and the recipient.
                    </p>
                  </div>
                </div>
                <Input placeholder="Select student or parent..." className="h-12" />
                <Textarea placeholder="Type your private message..." rows={6} />
                <Button className="w-full gap-2">
                  <Lock className="h-4 w-4" />
                  Send Private Whisper
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Assistant Panel */}
        <Card className="shadow-glow border-primary/20 animate-pulse-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Assistant
            </CardTitle>
            <CardDescription>Smart suggestions and insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Suggested Reply for Emma Wilson:
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                "Great question! Check page 42, section 3 for a detailed explanation. Let me know if you need more help!"
              </p>
              <Button size="sm" variant="outline" className="mt-2">Use This Reply</Button>
            </div>
            <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
              <p className="text-sm font-medium">📊 Classroom Trend:</p>
              <p className="text-sm text-muted-foreground mt-1">
                Whisper activity increased 23% this week. Students are more engaged!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Whisper AI Assistant */}
      <WhisperAI role="teacher" />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow 
          role="teacher" 
          onComplete={() => setShowOnboarding(false)} 
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
