import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Camera, Save, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/hooks/useProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, loading, refreshProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
    }
  }, [profile]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploadingAvatar(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      toast({
        title: "Avatar updated!",
        description: "Your profile picture has been updated successfully.",
      });

      refreshProfile();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: displayName })
        .eq("id", profile.id);

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile has been updated successfully.",
      });

      refreshProfile();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setUpdating(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your password has been updated successfully.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground mb-4">Please log in to view your profile.</p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  const initials = profile.display_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || profile.email[0].toUpperCase();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-8 animate-fade-up">
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-3xl bg-gradient-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0"
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {uploadingAvatar ? "Uploading..." : "Click camera icon to change photo"}
            </p>
          </div>

          {/* Profile Information */}
          <form onSubmit={handleUpdateProfile} className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                value={profile.role}
                disabled
                className="bg-muted cursor-not-allowed capitalize"
              />
              <p className="text-xs text-muted-foreground">
                Role is assigned by your institution
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary"
              disabled={updating}
            >
              <Save className="h-4 w-4 mr-2" />
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </form>

          {/* Password Update Section */}
          <form onSubmit={handleUpdatePassword} className="space-y-6 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Update Password
            </h2>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-secondary"
              disabled={updating || !newPassword || !confirmPassword}
            >
              <Lock className="h-4 w-4 mr-2" />
              {updating ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
