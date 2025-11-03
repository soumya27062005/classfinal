import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, BookOpen, Bell, Smile, Focus, Send, Trophy, Users, Home, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WhisperAI } from "@/components/WhisperAI";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { TutorialMode } from "@/components/TutorialMode";
import { ProgressTracker } from "@/components/gamification/ProgressTracker";
import { BadgeDisplay } from "@/components/gamification/BadgeDisplay";
import { DailyChallenges } from "@/components/gamification/DailyChallenges";
import { useProfile } from "@/hooks/useProfile";

const StudentDashboard = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboarding-student');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const announcements = [
    { id: 1, title: "Math homework due tomorrow", time: "2h ago", emoji: "📚" },
    { id: 2, title: "Science fair next week", time: "5h ago", emoji: "🔬" },
    { id: 3, title: "Great work on today's quiz!", time: "1d ago", emoji: "⭐" }
  ];

  const homework = [
    { subject: "Mathematics", task: "Chapter 5 exercises", due: "Tomorrow", status: "pending" },
    { subject: "English", task: "Essay on Shakespeare", due: "Friday", status: "in-progress" },
    { subject: "Science", task: "Lab report", due: "Next week", status: "pending" }
  ];

  const moods = ["😊", "😐", "😟", "🤔", "😴", "🎉"];

  return (
    <div className="min-h-screen py-8 px-4">
      {showOnboarding && (
        <OnboardingFlow role="student" onComplete={() => setShowOnboarding(false)} />
      )}
      
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between items-center animate-fade-up">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Avatar className="h-16 w-16 cursor-pointer hover:ring-2 ring-primary transition-all">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xl">
                  {profile?.display_name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {profile?.display_name || "Student"}! 👋</h1>
              <p className="text-muted-foreground">Here's what's happening in your class</p>
            </div>
          </div>
          <div className="flex gap-2">
            <TutorialMode role="student" />
            <Link to="/profile"><Button variant="ghost" size="sm"><User className="h-4 w-4" /></Button></Link>
            <Link to="/"><Button variant="ghost" size="sm"><Home className="h-4 w-4" /></Button></Link>
            <Link to="/login"><Button variant="outline" size="sm"><LogOut className="h-4 w-4" /></Button></Link>
            <Button onClick={() => setFocusMode(!focusMode)} variant={focusMode ? "default" : "outline"}>
              <Focus className="h-4 w-4 mr-2" />{focusMode ? "On" : "Focus"}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2"><ProgressTracker points={1250} level={4} nextLevelPoints={1500} levelName="Silent Scholar" /></div>
          
          <Card className="p-6"><div className="flex items-center gap-2 mb-4"><Smile className="h-6 w-6" /><h2 className="font-bold">Mood</h2></div><div className="grid grid-cols-3 gap-2">{moods.map((e, i) => <button key={i} className="text-3xl p-3 rounded-xl hover:bg-muted">{e}</button>)}</div></Card>
          
          <Card className="md:col-span-2 p-6" data-onboarding="whisper-board"><div className="flex items-center gap-2 mb-4"><MessageCircle className="h-6 w-6" /><h2 className="text-xl font-bold">Whispers</h2></div><div className="space-y-3 mb-4"><div className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary"><p className="text-sm text-muted-foreground mb-1">You • 5min</p><p>Can you explain the last problem?</p></div></div><div className="flex gap-2"><input type="text" placeholder="Send a whisper..." className="flex-1 px-4 py-2 rounded-xl border" /><Button><Send className="h-4 w-4" /></Button></div></Card>
          
          <Card className="p-6" data-onboarding="announcements"><div className="flex items-center gap-2 mb-4"><Bell className="h-6 w-6" /><h2 className="font-bold">Announcements</h2></div><div className="space-y-2">{announcements.map(a => <div key={a.id} className="p-3 rounded-xl bg-muted/50"><div className="flex gap-2"><span>{a.emoji}</span><div><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-muted-foreground">{a.time}</p></div></div></div>)}</div></Card>
          
          <Card className="md:col-span-2 p-6"><div className="flex items-center gap-2 mb-4"><BookOpen className="h-6 w-6" /><h2 className="font-bold">Homework</h2></div><div className="space-y-2">{homework.map((h, i) => <div key={i} className="p-4 rounded-xl border"><div className="flex justify-between"><div><h3 className="font-semibold">{h.subject}</h3><p className="text-sm text-muted-foreground">{h.task}</p></div><Badge>{h.due}</Badge></div></div>)}</div></Card>
          
          <div><DailyChallenges /></div>
          <div className="md:col-span-3"><BadgeDisplay role="student" /></div>
          
          <Card className="md:col-span-3 p-6"><h2 className="font-bold mb-4">Quick Access</h2><div className="grid md:grid-cols-3 gap-4"><Link to="/leaderboard"><Button variant="outline" className="w-full h-20 flex flex-col gap-2"><Trophy className="h-6 w-6" /><span>Leaderboard</span></Button></Link><Link to="/collaboration-room"><Button variant="outline" className="w-full h-20 flex flex-col gap-2"><Users className="h-6 w-6" /><span>Study Groups</span></Button></Link><Button variant="outline" className="w-full h-20 flex flex-col gap-2"><BookOpen className="h-6 w-6" /><span>Resources</span></Button></div></Card>
        </div>
      </div>

      <WhisperAI role="student" />
    </div>
  );
};

export default StudentDashboard;
