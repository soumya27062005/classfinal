import { Building2, Users, TrendingUp, Shield, Mail, Phone, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Institutions = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Building2 className="h-16 w-16 mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Transform Your Institution
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Enterprise solutions for schools, colleges, and educational organizations
          </p>
        </div>
      </section>

      {/* Benefits for Institutions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Class Whisper?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for educational institutions of all sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Users,
                title: "Unlimited Scalability",
                description: "Support unlimited classrooms, students, and teachers across multiple branches",
                color: "primary"
              },
              {
                icon: TrendingUp,
                title: "Enhanced Discipline",
                description: "85% reduction in classroom disruptions reported by partner schools",
                color: "secondary"
              },
              {
                icon: Shield,
                title: "Data Security",
                description: "Bank-level encryption with compliance to Indian data protection laws",
                color: "accent"
              },
              {
                icon: CheckCircle2,
                title: "Proven Results",
                description: "Join 500+ institutions already transforming their classrooms",
                color: "primary"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-${benefit.color} rounded-xl flex items-center justify-center mb-6 shadow-soft`}>
                  <benefit.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card rounded-3xl p-12 shadow-glow">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="text-primary font-bold mb-2">SUCCESS STORY</div>
                  <h2 className="text-4xl font-bold mb-6">Delhi Public School Network</h2>
                  <p className="text-xl text-muted-foreground mb-6">
                    "Class Whisper helped us maintain discipline across 15 branches while improving student engagement by 60%"
                  </p>
                  <div className="space-y-4">
                    {[
                      { metric: "85%", label: "Fewer interruptions" },
                      { metric: "60%", label: "Higher engagement" },
                      { metric: "95%", label: "Parent satisfaction" }
                    ].map((stat, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-3xl font-bold text-primary">{stat.metric}</div>
                        <div className="text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
                  <div className="text-6xl mb-4">🏫</div>
                  <h3 className="text-2xl font-bold mb-2">15 Branches</h3>
                  <p className="opacity-90 mb-4">8,000+ students using Class Whisper daily</p>
                  <div className="text-sm opacity-75">Implementation completed in 4 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Request a Partnership</h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and our team will contact you within 24 hours
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-glow">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Institution Name *</Label>
                    <Input id="name" placeholder="ABC School" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person *</Label>
                    <Input id="contact" placeholder="Soumya Gupta" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="contact@school.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="students">Number of Students</Label>
                    <Input id="students" type="number" placeholder="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branches">Number of Branches</Label>
                    <Input id="branches" type="number" placeholder="1" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your requirements</Label>
                  <Textarea 
                    id="message" 
                    placeholder="We are looking for a communication solution for our school..."
                    rows={5}
                  />
                </div>

                <Button size="lg" className="w-full bg-gradient-primary shadow-glow">
                  Submit Partnership Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Download Brochure */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-hero text-primary-foreground rounded-3xl p-12 text-center shadow-glow">
            <Download className="h-12 w-12 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Download Our Institutional Brochure</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Get detailed information about features, pricing, implementation, and case studies
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="shadow-soft">
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                <Mail className="mr-2 h-5 w-5" />
                Email Me the Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Our institutional sales team is ready to help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Phone,
                title: "Call Us",
                detail: "+91 987-915-2484",
                subtitle: "Mon-Fri, 9 AM - 6 PM IST"
              },
              {
                icon: Mail,
                title: "Email Us",
                detail: "classwhisper@gmail.com",
                subtitle: "Response within 24 hours"
              },
              {
                icon: Building2,
                title: "Visit Us",
                detail: "Ahmedabad, Gujarat",
                subtitle: "Schedule a meeting"
              }
            ].map((contact, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <contact.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-lg font-semibold text-primary mb-1">{contact.detail}</p>
                <p className="text-sm text-muted-foreground">{contact.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Institutions;
