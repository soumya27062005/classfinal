import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  email: string;
  role: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      setProfile({
        id: user.id,
        display_name: profileData?.display_name || user.user_metadata?.display_name || null,
        avatar_url: profileData?.avatar_url || null,
        email: user.email || "",
        role: user.user_metadata?.role || "student",
      });
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshProfile = () => {
    fetchProfile();
  };

  return { profile, loading, refreshProfile };
};
