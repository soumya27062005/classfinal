import { Shield, Lock, Eye, CheckCircle, FileText, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const PrivacyEthics = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-security rounded-2xl mb-6 shadow-glow">
            <Shield className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-security bg-clip-text text-transparent">
            Privacy & Ethics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trust is our foundation. Learn how we protect your data and ensure ethical AI practices.
          </p>
        </div>

        {/* Encryption Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">End-to-End Encryption</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-2 border-security-violet/20 hover:border-security-violet/40 transition-all animate-fade-up">
              <div className="p-3 bg-security-violet/10 rounded-xl w-fit mb-4">
                <Lock className="h-8 w-8 text-security-violet" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Message Encryption</h3>
              <p className="text-muted-foreground">
                Every whisper is encrypted with AES-256 before leaving your device. Your messages are secured with military-grade encryption.
              </p>
            </Card>

            <Card className="p-6 border-2 border-security-teal/20 hover:border-security-teal/40 transition-all animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="p-3 bg-security-teal/10 rounded-xl w-fit mb-4">
                <FileText className="h-8 w-8 text-security-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Key Exchange</h3>
              <p className="text-muted-foreground">
                Cryptographic keys are exchanged using secure protocols. Only intended recipients can decrypt your whispers.
              </p>
            </Card>

            <Card className="p-6 border-2 border-security-success/20 hover:border-security-success/40 transition-all animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="p-3 bg-security-success/10 rounded-xl w-fit mb-4">
                <CheckCircle className="h-8 w-8 text-security-success" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Delivery</h3>
              <p className="text-muted-foreground">
                Recipients receive verified encrypted messages with confirmation of authenticity and integrity.
              </p>
            </Card>
          </div>
        </div>

        {/* Ethics Compliance */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Ethics Compliance Standards</h2>
          <Card className="p-8 border-2 border-primary/20">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-security-success" />
                    <span className="font-semibold">GDPR Compliance</span>
                  </div>
                  <span className="text-sm text-muted-foreground">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-security-success" />
                    <span className="font-semibold">COPPA Compliance</span>
                  </div>
                  <span className="text-sm text-muted-foreground">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-security-success" />
                    <span className="font-semibold">FERPA Compliance</span>
                  </div>
                  <span className="text-sm text-muted-foreground">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-security-warning" />
                    <span className="font-semibold">AI Ethics Standards</span>
                  </div>
                  <span className="text-sm text-muted-foreground">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Data Privacy Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-l-security-violet">
              <div className="flex items-start gap-4">
                <Eye className="h-6 w-6 text-security-violet flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Transparency First</h3>
                  <p className="text-muted-foreground">
                    We clearly explain what data we collect, why we collect it, and how it's used. No hidden practices.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-security-teal">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-security-teal flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Minimal Data Collection</h3>
                  <p className="text-muted-foreground">
                    We only collect data that's essential for providing our service. Your privacy is paramount.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-security-success">
              <div className="flex items-start gap-4">
                <Lock className="h-6 w-6 text-security-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">User Control</h3>
                  <p className="text-muted-foreground">
                    You control your data. Export, delete, or modify your information anytime with simple tools.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Child Safety Priority</h3>
                  <p className="text-muted-foreground">
                    Special protections for students under 13, with parental consent and enhanced privacy controls.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Safe Learning Promise */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-security-glow border-2 border-security-violet/20">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-security bg-clip-text text-transparent">
              Our Safe Learning Promise
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-8">
              Class Whisper is built on the foundation of trust, safety, and ethical AI practices. 
              We ensure every student can communicate freely while maintaining the highest standards 
              of digital protection and mental well-being.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">🔒 Military-Grade Encryption</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">🤖 AI-Powered Safety</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">🌿 Mental Well-Being Focus</span>
              </div>
              <div className="px-6 py-3 bg-card rounded-full border border-border">
                <span className="font-semibold">✅ 100% Compliant</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyEthics;
