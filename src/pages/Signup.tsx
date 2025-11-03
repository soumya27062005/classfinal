import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get("role") || "student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roleConfig = {
    student: {
      icon: GraduationCap,
      title: "Student Sign Up",
      gradient: "gradient-primary",
      description: "Start your silent learning journey"
    },
    parent: {
      icon: Users,
      title: "Parent Sign Up",
      gradient: "gradient-secondary",
      description: "Connect with your child's education"
    },
    teacher: {
      icon: GraduationCap,
      title: "Teacher Sign Up",
      gradient: "gradient-secondary",
      description: "Empower your classroom silently"
    },
    admin: {
      icon: Shield,
      title: "Admin Sign Up",
      gradient: "gradient-accent",
      description: "Set up your institution"
    }
  };

  const config = roleConfig[role as keyof typeof roleConfig];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: name,
            role: role,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      // Redirect to login after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong. Please try again.",
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
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Soumya Gupta"
              className="h-12"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input 
              id="confirm" 
              type="password" 
              placeholder="••••••••"
              className="h-12"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className={`w-full h-12 bg-gradient-primary shadow-soft`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
