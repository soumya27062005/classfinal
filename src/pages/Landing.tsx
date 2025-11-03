import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Shield, TrendingUp, Bell, Heart, ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import workflowDiagram from "@/assets/workflow-diagram.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Speak <span className="bg-gradient-primary bg-clip-text text-transparent">Silently</span>.
                <br />
                Connect <span className="bg-gradient-secondary bg-clip-text text-transparent">Meaningfully</span>.
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A modern communication platform for students, parents, and educators. Maintain classroom discipline while enhancing engagement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Play className="mr-2 h-5 w-5" />
                    Watch How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-scale-in">
              <img 
                src={heroImage} 
                alt="Students communicating silently in classroom"
                className="rounded-3xl shadow-card animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4">Why Choose Class Whisper?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for modern classrooms with powerful features for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Silent Communication",
                description: "Send messages without disrupting the class. Perfect for questions, clarifications, and quick updates.",
                gradient: "gradient-primary"
              },
              {
                icon: Users,
                title: "Multi-Role Support",
                description: "Separate dashboards for students, parents, and administrators with tailored features.",
                gradient: "gradient-secondary"
              },
              {
                icon: Shield,
                title: "Safe & Secure",
                description: "Monitored communication with privacy controls and secure data handling.",
                gradient: "gradient-accent"
              },
              {
                icon: Bell,
                title: "Real-time Updates",
                description: "Instant notifications for announcements, homework, and important alerts.",
                gradient: "gradient-primary"
              },
              {
                icon: TrendingUp,
                title: "Performance Tracking",
                description: "Visual analytics for parents and teachers to monitor student progress.",
                gradient: "gradient-secondary"
              },
              {
                icon: Heart,
                title: "Mood Tracker",
                description: "Help students express their feelings and maintain emotional wellness.",
                gradient: "gradient-accent"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-soft`}>
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Workflow Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">See How Communication Flows</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From student questions to teacher responses, parent updates to admin insights
            </p>
          </div>
          <div className="max-w-5xl mx-auto mb-8">
            <img 
              src={workflowDiagram}
              alt="Communication workflow from student to teacher to parent to admin"
              className="w-full rounded-3xl shadow-glow animate-scale-in"
            />
          </div>
          <div className="text-center">
            <Link to="/how-it-works">
              <Button size="lg" variant="outline">
                Explore Full Workflow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Experience Different Perspectives</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Class Whisper works for students, teachers, parents, and admins
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { role: "Student", emoji: "🎓", link: "/dashboard/student", desc: "Ask & Learn" },
              { role: "Teacher", emoji: "👩‍🏫", link: "/dashboard/teacher", desc: "Guide & Respond" },
              { role: "Parent", emoji: "👨‍👩‍👧", link: "/dashboard/parent", desc: "Monitor & Support" },
              { role: "Admin", emoji: "📊", link: "/dashboard/admin", desc: "Oversee & Analyze" }
            ].map((item, index) => (
              <Link 
                key={index}
                to={item.link}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 text-center group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/how-it-feels">
              <Button size="lg" className="bg-gradient-primary shadow-glow">
                Experience the Full Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-hero rounded-3xl p-12 md:p-16 text-center shadow-glow">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of educators creating peaceful, productive learning environments
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup?role=student">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join as Student
                </Button>
              </Link>
              <Link to="/signup?role=parent">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join as Parent
                </Button>
              </Link>
              <Link to="/signup?role=teacher">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join as Teacher
                </Button>
              </Link>
              <Link to="/signup?role=admin">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Join as Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
