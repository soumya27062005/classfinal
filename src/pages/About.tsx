import { Book, Target, Sparkles } from "lucide-react";
import aboutImage from "@/assets/about-illustration.jpg";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-5xl font-bold mb-6">About Class Whisper</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing classroom communication with silent, meaningful connections
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-up">
            <img 
              src={aboutImage} 
              alt="Communication concept illustration"
              className="rounded-3xl shadow-card"
            />
          </div>
          <div className="animate-fade-up space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Class Whisper was born from a simple observation by our developer Soumya Gupta: A traditional classroom communication often disrupts learning. Students hesitate to ask questions, parents struggle to stay connected, and teachers juggle multiple communication channels.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We envisioned a platform where communication flows silently yet powerfully—where questions get answered without interruption, where parents feel involved without intrusion, and where administrators maintain oversight without overwhelm.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Book,
                title: "Education First",
                description: "Every feature is designed to enhance learning, not distract from it.",
                color: "primary"
              },
              {
                icon: Target,
                title: "Focus & Discipline",
                description: "Maintain classroom order while fostering open communication.",
                color: "secondary"
              },
              {
                icon: Sparkles,
                title: "Meaningful Connection",
                description: "Build genuine relationships between students, parents, and educators.",
                color: "accent"
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft`}>
                  <value.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey */}
        <div className="bg-muted/30 rounded-3xl p-12 animate-fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">The Class Whisper Journey</h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                step: "1",
                title: "Student Whispers a Question",
                description: "Instead of raising a hand or staying confused, the student sends a silent message through the app."
              },
              {
                step: "2",
                title: "Teacher Responds Quietly",
                description: "The teacher sees the notification and can respond immediately without stopping the lesson."
              },
              {
                step: "3",
                title: "Parents Stay Informed",
                description: "Important updates and student progress are automatically shared with parents."
              },
              {
                step: "4",
                title: "Administrators Monitor & Support",
                description: "School leaders get insights into communication patterns and can broadcast important announcements."
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-soft">
                  <span className="text-xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
