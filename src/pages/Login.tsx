import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roleConfig = {
    student: {
      icon: GraduationCap,
      title: "Student Login",
      gradient: "gradient-primary",
      description: "Access your whisper board and homework"
    },
    parent: {
      icon: Users,
      title: "Parent Login",
      gradient: "gradient-secondary",
      description: "Monitor your child's progress"
    },
    teacher: {
      icon: GraduationCap,
      title: "Teacher Login",
      gradient: "gradient-secondary",
      description: "Manage your classroom silently"
    },
    admin: {
      icon: Shield,
      title: "Admin Login",
      gradient: "gradient-accent",
      description: "Manage your institution"
    }
  };

  const config = roleConfig[role as keyof typeof roleConfig];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });

      // Redirect based on role
      const dashboardRoutes: Record<string, string> = {
        student: "/dashboard/student",
        parent: "/dashboard/parent",
        teacher: "/dashboard/teacher",
        admin: "/dashboard/admin",
      };

      navigate(dashboardRoutes[role] || "/dashboard/student");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8 shadow-glow animate-scale-in">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-${config.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft`}>
            <Icon className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
          <p className="text-muted-foreground">{config.description}</p>
        </div>

        <Tabs value={role} onValueChange={setRole} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="parent">Parent</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder={`${role}@example.com`}
              className="h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••"
              className="h-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className={`w-full h-12 bg-gradient-primary shadow-soft`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link to="/forgot-password" className="text-sm text-primary hover:underline block">
            Forgot your password?
          </Link>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
