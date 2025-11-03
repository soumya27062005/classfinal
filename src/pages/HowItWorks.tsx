import { ArrowRight, MessageSquare, Reply, Eye, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import workflowDiagram from "@/assets/workflow-diagram.jpg";

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Student Sends a Whisper",
      description: "Students silently type questions, doubts, or feedback without raising hands or interrupting the class.",
      color: "from-primary to-primary/80"
    },
    {
      icon: Reply,
      title: "Teacher Replies Silently",
      description: "Teachers receive notifications and respond instantly without disturbing others, maintaining classroom peace.",
      color: "from-secondary to-secondary/80"
    },
    {
      icon: Eye,
      title: "Parent Views Progress",
      description: "Parents stay informed with real-time updates on their child's communication, engagement, and academic progress.",
      color: "from-accent to-accent/80"
    },
    {
      icon: BarChart3,
      title: "Admin Monitors Activity",
      description: "School administrators get comprehensive analytics and insights on classroom communication patterns.",
      color: "from-primary to-secondary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            How Class Whisper Works
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            A seamless silent communication system that transforms classroom dynamics
          </p>
        </div>
      </section>

      {/* Visual Workflow */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Silent Communication Flow</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch how messages flow effortlessly through our platform
            </p>
          </div>
          
          <div className="mb-16 animate-scale-in">
            <img 
              src={workflowDiagram} 
              alt="Communication workflow visualization"
              className="w-full rounded-3xl shadow-glow"
            />
          </div>

          {/* Step by Step Flow */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-soft`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-2 text-sm font-semibold text-primary">Step {index + 1}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Simulation */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Classroom Simulation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hover over each role to see how they interact silently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { role: "Student", action: "Asks question", emoji: "🙋‍♂️", color: "primary" },
              { role: "Teacher", action: "Replies instantly", emoji: "👩‍🏫", color: "secondary" },
              { role: "Parent", action: "Monitors progress", emoji: "👨‍👩‍👧", color: "accent" }
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{item.role}</h3>
                <p className="text-muted-foreground mb-4">{item.action}</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full bg-${item.color} transition-all duration-1000 group-hover:w-full w-0`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Silent Communication?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of schools transforming their classrooms with Class Whisper
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
