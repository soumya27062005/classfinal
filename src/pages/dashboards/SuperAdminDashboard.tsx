import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Building2, Users, Activity, TrendingUp, BarChart3, Settings, Plus, Search, User, Home, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { WhisperAI } from "@/components/WhisperAI";
import { AIInsights } from "@/components/AIInsights";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { useProfile } from "@/hooks/useProfile";

const SuperAdminDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { profile } = useProfile();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("super_admin_onboarding_complete");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    const { data } = await supabase
      .from("institutions")
      .select(`
        *,
        subscriptions(*),
        institution_usage_metrics(*)
      `)
      .order("created_at", { ascending: false });
    
    if (data) setInstitutions(data);
  };

  const stats = [
    {
      label: "Total Institutions",
      value: institutions.length,
      change: "+12%",
      icon: Building2,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      label: "Total Users",
      value: "12,540",
      change: "+8%",
      icon: Users,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    },
    {
      label: "Active Sessions",
      value: "8,234",
      change: "+23%",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      label: "Revenue (Monthly)",
      value: "$45,890",
      change: "+15%",
      icon: TrendingUp,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    }
  ];

  const onboardingSteps = [
    {
      target: '[data-onboarding="institutions-grid"]',
      title: "Institutions Overview",
      description: "Here you can view and manage all registered institutions."
    },
    {
      target: '[data-onboarding="add-institution"]',
      title: "Add New Institution",
      description: "Click here to onboard a new school or institution."
    },
    {
      target: '[data-onboarding="analytics"]',
      title: "Platform Analytics",
      description: "Monitor engagement and performance across all institutions."
    }
  ];

  const filteredInstitutions = institutions.filter(inst =>
    inst.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.region?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Avatar className="h-16 w-16 cursor-pointer hover:ring-2 ring-primary transition-all">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-r from-primary via-purple-500 to-accent text-primary-foreground text-xl">
                  {profile?.display_name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "SA"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                Welcome, {profile?.display_name || "Super Admin"}
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your multi-institution platform
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/settings">
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card/50 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {stat.change}
                  </Badge>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-4 rounded-full`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <div data-onboarding="analytics">
          <AIInsights role="super_admin" />
        </div>

        {/* Institutions Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Institutions</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search institutions..."
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link to="/institutions/new" data-onboarding="add-institution">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Institution
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-onboarding="institutions-grid">
            {filteredInstitutions.map((institution) => (
              <Card key={institution.id} className="p-6 hover:shadow-lg transition-all group cursor-pointer bg-card/50 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                        {institution.name?.[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {institution.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{institution.region}</p>
                      </div>
                    </div>
                    <Badge variant={institution.subscriptions?.[0]?.status === "active" ? "default" : "secondary"}>
                      {institution.subscriptions?.[0]?.plan || "Free"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Users</span>
                      <span className="font-medium">
                        {institution.institution_usage_metrics?.[0]?.total_users || 0}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">
                        {institution.institution_usage_metrics?.[0]?.storage_used_mb || 0} MB
                      </span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Manage
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group bg-card/50 backdrop-blur">
            <BarChart3 className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              View detailed analytics and insights
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group bg-card/50 backdrop-blur">
            <Users className="w-8 h-8 text-teal-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage users across all institutions
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group bg-card/50 backdrop-blur">
            <Settings className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">Platform Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure platform-wide settings
            </p>
          </Card>
        </div>
      </div>

      <WhisperAI role="super_admin" />
      
      {showOnboarding && (
        <OnboardingFlow
          steps={onboardingSteps}
          onComplete={() => {
            setShowOnboarding(false);
            localStorage.setItem("super_admin_onboarding_complete", "true");
          }}
          role="super_admin"
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;