import { Lock, Send, Shield, CheckCircle, Key, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';

const SecurityVisualization = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-security rounded-2xl mb-6 shadow-glow">
            <Lock className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-security bg-clip-text text-transparent">
            Security Layer Visualization
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how your messages travel through multiple layers of protection from sender to receiver.
          </p>
        </div>

        {/* Message Flow Visualization */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Message Encryption Journey</h2>
          
          <div className="max-w-5xl mx-auto">
            {/* Step 1: Compose */}
            <div className="flex items-center gap-8 mb-8 animate-fade-up">
              <div className="flex-1">
                <Card className="p-6 border-2 border-primary/40 bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-primary rounded-xl shadow-soft">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">1. Compose Message</h3>
                      <p className="text-sm text-muted-foreground">Student writes a whisper on their device</p>
                      <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                        <p className="text-sm">"I need help with question 5"</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="hidden md:block">
                <div className="w-12 h-1 bg-gradient-security"></div>
              </div>
            </div>

            {/* Step 2: Encrypt */}
            <div className="flex items-center gap-8 mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="hidden md:block">
                <div className="w-12 h-1 bg-gradient-security"></div>
              </div>
              <div className="flex-1">
                <Card className="p-6 border-2 border-security-violet/40 bg-security-violet/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-security-violet rounded-xl shadow-soft">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">2. Client-Side Encryption</h3>
                      <p className="text-sm text-muted-foreground">Message encrypted with AES-256 before transmission</p>
                      <div className="mt-3 p-3 bg-card rounded-lg border border-security-violet/40 font-mono text-xs overflow-hidden">
                        <p className="text-security-violet">U2FsdGVkX1+Zx3K9...</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 3: Key Exchange */}
            <div className="flex items-center gap-8 mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex-1">
                <Card className="p-6 border-2 border-security-teal/40 bg-security-teal/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-security-teal rounded-xl shadow-soft">
                      <Key className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">3. Secure Key Exchange</h3>
                      <p className="text-sm text-muted-foreground">Cryptographic keys shared via secure protocol</p>
                      <div className="mt-3 flex gap-2">
                        <div className="flex-1 p-3 bg-card rounded-lg border border-security-teal/40">
                          <p className="text-xs text-muted-foreground mb-1">Public Key</p>
                          <p className="text-xs font-mono text-security-teal">RSA-2048</p>
                        </div>
                        <div className="flex-1 p-3 bg-card rounded-lg border border-security-teal/40">
                          <p className="text-xs text-muted-foreground mb-1">Session Key</p>
                          <p className="text-xs font-mono text-security-teal">AES-256</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="hidden md:block">
                <div className="w-12 h-1 bg-gradient-security"></div>
              </div>
            </div>

            {/* Step 4: AI Moderation */}
            <div className="flex items-center gap-8 mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="hidden md:block">
                <div className="w-12 h-1 bg-gradient-security"></div>
              </div>
              <div className="flex-1">
                <Card className="p-6 border-2 border-security-warning/40 bg-security-warning/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-security-warning rounded-xl shadow-soft">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">4. AI Safety Check</h3>
                      <p className="text-sm text-muted-foreground">Content analyzed for safety while encrypted</p>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="p-2 bg-card rounded border border-border text-center">
                          <p className="text-xs font-semibold text-security-success">✓ Tone</p>
                        </div>
                        <div className="p-2 bg-card rounded border border-border text-center">
                          <p className="text-xs font-semibold text-security-success">✓ Content</p>
                        </div>
                        <div className="p-2 bg-card rounded border border-border text-center">
                          <p className="text-xs font-semibold text-security-success">✓ Safety</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Step 5: Secure Storage */}
            <div className="flex items-center gap-8 mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex-1">
                <Card className="p-6 border-2 border-primary/40 bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-primary rounded-xl shadow-soft">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">5. Encrypted Storage</h3>
                      <p className="text-sm text-muted-foreground">Message stored in encrypted database</p>
                      <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                        <div className="flex items-center gap-2 text-sm">
                          <Lock className="h-4 w-4 text-security-success" />
                          <span className="text-security-success font-semibold">Encrypted at rest</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="hidden md:block">
                <div className="w-12 h-1 bg-gradient-security"></div>
              </div>
            </div>

            {/* Step 6: Deliver */}
            <div className="flex items-center gap-8 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="hidden md:block">
                <div className="w-12 h-1 bg-gradient-security"></div>
              </div>
              <div className="flex-1">
                <Card className="p-6 border-2 border-security-success/40 bg-security-success/5">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-security-success rounded-xl shadow-soft">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">6. Secure Delivery</h3>
                      <p className="text-sm text-muted-foreground">Teacher receives and decrypts message</p>
                      <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-security-success" />
                          <span className="text-xs text-muted-foreground">Decrypted</span>
                        </div>
                        <p className="text-sm">"I need help with question 5"</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Security Layers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Multi-Layer Protection</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="p-6 border-l-4 border-l-security-violet hover:shadow-glow transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-security-violet/10 rounded-xl">
                  <Lock className="h-6 w-6 text-security-violet" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Layer 1: End-to-End Encryption</h3>
                  <p className="text-sm text-muted-foreground">AES-256 encryption ensures only intended recipients can read messages</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-security-teal hover:shadow-glow transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-security-teal/10 rounded-xl">
                  <Shield className="h-6 w-6 text-security-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Layer 2: AI Content Moderation</h3>
                  <p className="text-sm text-muted-foreground">Real-time analysis prevents harmful content while respecting privacy</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-security-success hover:shadow-glow transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-security-success/10 rounded-xl">
                  <Database className="h-6 w-6 text-security-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Layer 3: Secure Infrastructure</h3>
                  <p className="text-sm text-muted-foreground">Enterprise-grade security with encrypted storage and secure transmission</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary hover:shadow-glow transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Layer 4: Access Control</h3>
                  <p className="text-sm text-muted-foreground">Role-based permissions ensure data access is strictly controlled</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="p-12 bg-gradient-security-glow border-2 border-security-violet/20">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-security bg-clip-text text-transparent">
              Security You Can Trust
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Every whisper passes through multiple layers of protection, ensuring your communications 
              remain private, secure, and safe from unauthorized access.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityVisualization;
