import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, UserCircle, Sparkles } from "lucide-react";
import classroomComparison from "@/assets/classroom-comparison.jpg";

const HowItFeels = () => {
  const [activeView, setActiveView] = useState<"student" | "teacher" | "parent">("student");

  const perspectives = {
    student: {
      icon: GraduationCap,
      title: "Student Perspective",
      description: "No more fear of speaking up in class. Ask questions anytime without interrupting.",
      features: [
        "✨ Send doubts silently during lectures",
        "😊 Express feelings through mood tracker",
        "📚 Get instant homework reminders",
        "🎯 Stay focused without distractions"
      ]
    },
    teacher: {
      icon: Users,
      title: "Teacher Perspective",
      description: "Maintain classroom discipline while staying connected with every student.",
      features: [
        "📢 Send announcements instantly",
        "💬 Reply to students without interrupting flow",
        "📊 Monitor student engagement in real-time",
        "🎓 Track class performance effortlessly"
      ]
    },
    parent: {
      icon: UserCircle,
      title: "Parent Perspective",
      description: "Stay informed about your child's academic journey and emotional wellbeing.",
      features: [
        "📱 Get real-time updates on progress",
        "💌 Direct communication with teachers",
        "📈 View performance analytics",
        "❤️ Monitor emotional wellbeing"
      ]
    }
  };

  const activePerspective = perspectives[activeView];
  const Icon = activePerspective.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Feel the Silence. Experience the Connection.
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            See how Class Whisper transforms classroom communication from every perspective
          </p>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Traditional vs. Class Whisper</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the dramatic difference in classroom atmosphere
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-12">
            <img 
              src={classroomComparison}
              alt="Comparison between traditional noisy classroom and silent Class Whisper classroom"
              className="w-full rounded-3xl shadow-glow animate-scale-in"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-destructive/10 rounded-2xl p-8 shadow-card animate-fade-up">
              <h3 className="text-2xl font-bold mb-4 text-destructive">❌ Traditional Classroom</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Constant interruptions and noise</li>
                <li>• Shy students hesitate to ask questions</li>
                <li>• Teachers struggle to manage disruptions</li>
                <li>• Parents stay in the dark</li>
                <li>• Lost focus and productivity</li>
              </ul>
            </div>

            <div className="bg-primary/10 rounded-2xl p-8 shadow-card animate-fade-up" style={{ animationDelay: "100ms" }}>
              <h3 className="text-2xl font-bold mb-4 text-primary">✅ Class Whisper Classroom</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Complete silence maintained</li>
                <li>• Every student feels comfortable asking</li>
                <li>• Teachers respond without breaking flow</li>
                <li>• Parents receive real-time updates</li>
                <li>• Enhanced focus and engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Perspective Switcher */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Switch Perspectives</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Class Whisper benefits every role in the education ecosystem
            </p>
          </div>

          {/* Perspective Buttons and Card Side by Side */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
            {/* Perspective Buttons */}
            <div className="flex flex-col gap-4 w-full lg:w-auto">
              {(Object.keys(perspectives) as Array<keyof typeof perspectives>).map((key) => {
                const PerspectiveIcon = perspectives[key].icon;
                return (
                  <Button
                    key={key}
                    size="lg"
                    variant={activeView === key ? "default" : "outline"}
                    onClick={() => setActiveView(key)}
                    className={activeView === key ? "bg-gradient-primary shadow-glow justify-start" : "justify-start"}
                  >
                    <PerspectiveIcon className="mr-2 h-5 w-5" />
                    {key.charAt(0).toUpperCase() + key.slice(1)} View
                  </Button>
                );
              })}
            </div>

            {/* Active Perspective Card */}
            <div className="flex-1 w-full">
              <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-glow animate-scale-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold">{activePerspective.title}</h3>
                  </div>
                </div>
                
                <p className="text-lg lg:text-xl text-muted-foreground mb-8">
                  {activePerspective.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activePerspective.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-muted/50 rounded-xl p-4 hover:bg-muted transition-colors animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <p className="font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Hear From Our Community</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real experiences from students, teachers, and parents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "I used to be too shy to ask questions. Now I can ask anything without feeling embarrassed!",
                name: "Priya S.",
                role: "Student, Grade 10",
                avatar: "👧"
              },
              {
                quote: "Class Whisper helped me maintain discipline while ensuring no student's doubt goes unanswered.",
                name: "Rajesh Kumar",
                role: "Mathematics Teacher",
                avatar: "👨‍🏫"
              },
              {
                quote: "Finally, I can stay updated about my son's progress without waiting for PTMs. It's a game-changer!",
                name: "Meera Patel",
                role: "Parent",
                avatar: "👩"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Feel the Difference?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of classrooms experiencing peaceful, productive learning
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 shadow-glow">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HowItFeels;
