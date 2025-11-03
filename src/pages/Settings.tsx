import { Moon, Sun, Globe, Bell, Lock, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { theme, language, toggleTheme, setLanguage } = useTheme();
  const { toast } = useToast();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" }
  ];

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <User className="h-16 w-16 mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Settings
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Customize your Class Whisper experience
          </p>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Appearance Settings */}
            <div className="bg-card rounded-3xl p-8 shadow-card animate-fade-up">
              <div className="flex items-center gap-3 mb-6">
                {theme === "light" ? (
                  <Sun className="h-6 w-6 text-primary" />
                ) : (
                  <Moon className="h-6 w-6 text-primary" />
                )}
                <h2 className="text-2xl font-bold">Appearance</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="theme-toggle" className="text-lg">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch 
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className="bg-card rounded-3xl p-8 shadow-card animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Language & Region</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="language-select" className="text-lg">
                    Interface Language
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Choose your preferred language for the interface
                  </p>
                  <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                    <SelectTrigger id="language-select" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-3">
                            <span>{lang.nativeName}</span>
                            <span className="text-muted-foreground text-sm">({lang.name})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-card rounded-3xl p-8 shadow-card animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Notifications</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="push-notif" className="text-lg">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new messages and announcements
                    </p>
                  </div>
                  <Switch id="push-notif" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notif" className="text-lg">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get daily email summaries of activity
                    </p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sound-notif" className="text-lg">Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sound for important alerts
                    </p>
                  </div>
                  <Switch id="sound-notif" />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-card rounded-3xl p-8 shadow-card animate-fade-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Privacy & Security</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="read-receipts" className="text-lg">Read Receipts</Label>
                    <p className="text-sm text-muted-foreground">
                      Let others know when you've read their messages
                    </p>
                  </div>
                  <Switch id="read-receipts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="online-status" className="text-lg">Online Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're active on Class Whisper
                    </p>
                  </div>
                  <Switch id="online-status" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="data-sharing" className="text-lg">Analytics & Improvement</Label>
                    <p className="text-sm text-muted-foreground">
                      Help us improve by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch id="data-sharing" defaultChecked />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                size="lg" 
                className="bg-gradient-primary shadow-glow"
                onClick={handleSave}
              >
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
