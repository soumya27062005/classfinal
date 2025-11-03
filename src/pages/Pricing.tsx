import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "₹0",
      period: "14 days",
      description: "Perfect for trying out Class Whisper",
      features: [
        "Single classroom (up to 30 students)",
        "Basic messaging features",
        "Student & teacher dashboards",
        "Email support",
        "7-day message history"
      ],
      cta: "Start Free Trial",
      popular: false,
      gradient: "from-primary/20 to-secondary/20"
    },
    {
      name: "Pro",
      price: "₹2,999",
      period: "per month",
      description: "Ideal for small to medium schools",
      features: [
        "Up to 10 classrooms",
        "Advanced messaging & announcements",
        "All user dashboards",
        "Mood tracker & analytics",
        "Priority support",
        "30-day message history",
        "Parent communication portal",
        "Export reports"
      ],
      cta: "Get Started",
      popular: true,
      gradient: "from-primary to-secondary"
    },
    {
      name: "Institutional",
      price: "Custom",
      period: "contact us",
      description: "For large schools and educational chains",
      features: [
        "Unlimited classrooms",
        "AI-powered insights",
        "Complete admin control",
        "Unlimited message history",
        "24/7 dedicated support",
        "Custom integrations",
        "Training sessions",
        "White-label options",
        "Advanced security features"
      ],
      cta: "Request Demo",
      popular: false,
      gradient: "from-accent/20 to-primary/20"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Choose the perfect plan for your institution's needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-up ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold shadow-soft flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Most Popular
                  </div>
                )}
                
                <div className={`bg-gradient-to-br ${plan.gradient} rounded-2xl p-6 mb-6`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/ {plan.period}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/signup">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-primary shadow-glow' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include secure data encryption, regular updates, and mobile app access
            </p>
            <Link to="/institutions" className="text-primary hover:underline font-semibold">
              Need a custom solution for your institution? Contact us →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Have Questions?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check out our FAQ section for detailed answers about pricing, features, and setup
          </p>
          <Link to="/faq">
            <Button size="lg" variant="outline">
              View FAQs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
