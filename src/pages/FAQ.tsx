import { Search, MessageCircle, HelpCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is Class Whisper?",
          a: "Class Whisper is a silent communication platform designed for classrooms. It allows students, teachers, parents, and administrators to communicate without disrupting the learning environment."
        },
        {
          q: "How do I sign up?",
          a: "Click on the 'Get Started' button, choose your role (Student, Teacher, Parent, or Admin), and complete the registration form. Schools can sign up for institutional plans for bulk enrollment."
        },
        {
          q: "Is there a free trial?",
          a: "Yes! We offer a 14-day free trial for single classrooms with up to 30 students. No credit card required."
        }
      ]
    },
    {
      category: "Features & Usage",
      questions: [
        {
          q: "How does silent messaging work?",
          a: "Students and teachers can send text messages, emojis, and quick reactions through the platform. Messages appear as notifications without making any sound, maintaining classroom peace."
        },
        {
          q: "Can parents see all classroom messages?",
          a: "Parents can only see messages related to their child, including teacher feedback, announcements, and their child's activity summary. Private classroom discussions remain confidential."
        },
        {
          q: "What is the Mood Tracker feature?",
          a: "The Mood Tracker allows students to express their emotional state using emojis. Teachers and parents can monitor trends to identify students who may need additional support."
        },
        {
          q: "How do announcements work?",
          a: "Teachers and admins can broadcast announcements to entire classes or specific groups. These appear prominently on all relevant dashboards with optional push notifications."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          q: "What's included in the Free Trial?",
          a: "The free trial includes basic messaging, single classroom access, student & teacher dashboards, and 7-day message history for up to 30 students."
        },
        {
          q: "Can I upgrade or downgrade my plan?",
          a: "Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your current billing cycle."
        },
        {
          q: "Do you offer educational discounts?",
          a: "Yes, we offer special pricing for government schools, NGOs, and educational trusts. Contact our sales team for custom quotes."
        }
      ]
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is student data safe?",
          a: "Absolutely. We use bank-level encryption, comply with data protection regulations, and never share student information with third parties. All data is stored securely in Indian servers."
        },
        {
          q: "Can administrators monitor all messages?",
          a: "Yes, school administrators have oversight capabilities to ensure safe communication and can review messages if necessary for safety or policy compliance."
        },
        {
          q: "How long are messages stored?",
          a: "Message retention depends on your plan: 7 days (Free), 30 days (Pro), or unlimited (Institutional). Archived messages can be exported for compliance."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "What devices are supported?",
          a: "Class Whisper works on all modern web browsers (Chrome, Firefox, Safari, Edge) and has dedicated mobile apps for iOS and Android."
        },
        {
          q: "Do I need special equipment?",
          a: "No special equipment needed! Students and teachers just need a smartphone, tablet, or computer with internet access."
        },
        {
          q: "What if I encounter a technical issue?",
          a: "Contact our support team via email, live chat, or phone. Pro and Institutional plans get priority support with faster response times."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Find answers to common questions about Class Whisper
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for answers..."
                className="pl-12 h-14 text-lg rounded-2xl shadow-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category, catIndex) => (
                <div key={catIndex} className="animate-fade-up" style={{ animationDelay: `${catIndex * 50}ms` }}>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-primary rounded-full"></div>
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, qIndex) => (
                      <AccordionItem 
                        key={qIndex} 
                        value={`${catIndex}-${qIndex}`}
                        className="bg-card rounded-2xl px-6 shadow-card border-none"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-semibold text-lg">{faq.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:classwhisper@gmail.com">
                <Button size="lg" className="bg-gradient-primary shadow-glow">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Support
                </Button>
              </a>
              <Link to="/institutions">
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
