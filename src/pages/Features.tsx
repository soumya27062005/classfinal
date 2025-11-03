import { Card } from "@/components/ui/card";
import studentFeature from "@/assets/student-feature.jpg";
import parentFeature from "@/assets/parent-feature.jpg";
import adminFeature from "@/assets/admin-feature.jpg";
import { Smile, BookOpen, Bell, BarChart3, Users2, Radio } from "lucide-react";

const Features = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl font-bold mb-6">Powerful Features for Everyone</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored experiences for students, parents, and administrators
          </p>
        </div>

        {/* Student Features */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-up">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4">
                For Students
              </div>
              <h2 className="text-4xl font-bold mb-6">Your Classroom Companion</h2>
              <p className="text-lg text-muted-foreground mb-8">
                A fun, intuitive space where you can ask questions, track homework, and express yourself—all without disrupting class.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Bell, title: "Whisper Board", desc: "Send silent messages to teachers and classmates" },
                  { icon: Smile, title: "Mood Tracker", desc: "Express how you're feeling with emojis and GIFs" },
                  { icon: BookOpen, title: "Homework Hub", desc: "Never miss an assignment with visual reminders" },
                  { icon: Radio, title: "Focus Mode", desc: "Toggle distractions off when you need to concentrate" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 animate-scale-in">
              <img 
                src={studentFeature} 
                alt="Student dashboard preview"
                className="rounded-3xl shadow-card"
              />
            </div>
          </div>
        </div>

        {/* Parent Features */}
        <div className="mb-20 bg-muted/30 rounded-3xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-scale-in">
              <img 
                src={parentFeature} 
                alt="Parent dashboard preview"
                className="rounded-3xl shadow-card"
              />
            </div>
            <div className="animate-fade-up">
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary font-semibold mb-4">
                For Parents
              </div>
              <h2 className="text-4xl font-bold mb-6">Stay Connected & Informed</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Monitor your child's progress, communicate with teachers, and get real-time updates—all in one professional interface.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: BarChart3, title: "Performance Summary", desc: "Visual graphs showing academic progress" },
                  { icon: Bell, title: "Teacher Alerts", desc: "Receive important notifications instantly" },
                  { icon: Users2, title: "Private Whisper", desc: "Direct, secure communication with educators" },
                  { icon: BookOpen, title: "Activity Log", desc: "Complete overview of your child's engagement" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Features */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-fade-up">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-4">
                For Administrators
              </div>
              <h2 className="text-4xl font-bold mb-6">Manage with Confidence</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Powerful tools to oversee communication, analyze trends, and broadcast announcements across your institution.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Users2, title: "User Management", desc: "Add, edit, and organize students, parents, and teachers" },
                  { icon: BarChart3, title: "Analytics Dashboard", desc: "Color-coded insights into communication patterns" },
                  { icon: Radio, title: "Broadcast System", desc: "Send announcements to entire classes or school" },
                  { icon: BookOpen, title: "Activity Reports", desc: "Track usage and engagement metrics" }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 animate-scale-in">
              <img 
                src={adminFeature} 
                alt="Admin dashboard preview"
                className="rounded-3xl shadow-card"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
