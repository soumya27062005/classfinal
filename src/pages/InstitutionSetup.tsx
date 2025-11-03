import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Building2, MapPin, Mail, Phone, Upload, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const InstitutionSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    region: "",
    logo_url: ""
  });
  const { toast } = useToast();

  const steps = [
    { number: 1, title: "Basic Information", icon: Building2 },
    { number: 2, title: "Contact Details", icon: Mail },
    { number: 3, title: "Plan Selection", icon: Check }
  ];

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("institutions")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Institution created successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create institution.",
        variant: "destructive"
      });
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
            Institution Setup Wizard
          </h1>
          <p className="text-muted-foreground mt-2">
            Let's get your institution set up on Class Whisper
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-center gap-2 ${
                  currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="font-medium hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Steps */}
        <Card className="p-8 bg-card/50 backdrop-blur">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Institution Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Delhi Public School"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full institution address"
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g., North Delhi, Mumbai"
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Institution Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Contact Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="contact_email"
                      type="email"
                      className="pl-10"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      placeholder="admin@institution.edu"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact_phone">Contact Phone *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="contact_phone"
                      type="tel"
                      className="pl-10"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Choose Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Free", "Premium", "Enterprise"].map((plan) => (
                  <div
                    key={plan}
                    className="p-6 border-2 rounded-lg hover:border-primary transition-colors cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                    <p className="text-2xl font-bold mb-4">
                      {plan === "Free" ? "$0" : plan === "Premium" ? "$29" : "Custom"}
                      {plan !== "Enterprise" && <span className="text-sm text-muted-foreground">/month</span>}
                    </p>
                    <Button className="w-full">Select {plan}</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Link to="/dashboard/super-admin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionSetup;