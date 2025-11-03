import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bell, Send, Upload, Smile, Paperclip, Users, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateAnnouncement = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");
  const [sendToParents, setSendToParents] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");

  const handleSend = () => {
    if (!title || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Announcement Sent! 🎉",
      description: `Your announcement has been sent to ${sendToParents ? "students and parents" : "students"}`,
    });

    // Reset form
    setTitle("");
    setMessage("");
    setPriority("normal");
    setSendToParents(false);
    setScheduleDate("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-soft backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/teacher">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-xl font-bold">Create Announcement</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">New Announcement</h2>
          <p className="text-muted-foreground">Share important updates with your class</p>
        </div>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Announcement Details
            </CardTitle>
            <CardDescription>Fill in the information below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Class Postponed - Tomorrow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Type your announcement message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">{message.length} characters</p>
            </div>

            {/* Priority Level */}
            <div className="space-y-2">
              <Label>Priority Level</Label>
              <div className="flex gap-2">
                <Button
                  variant={priority === "low" ? "default" : "outline"}
                  onClick={() => setPriority("low")}
                  size="sm"
                >
                  Low
                </Button>
                <Button
                  variant={priority === "normal" ? "default" : "outline"}
                  onClick={() => setPriority("normal")}
                  size="sm"
                >
                  Normal
                </Button>
                <Button
                  variant={priority === "high" ? "default" : "outline"}
                  onClick={() => setPriority("high")}
                  size="sm"
                  className={priority === "high" ? "bg-destructive hover:bg-destructive/90" : ""}
                >
                  High
                </Button>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="send-parents" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Send to Parents
                  </Label>
                  <p className="text-xs text-muted-foreground">Also notify parents via email</p>
                </div>
                <Switch
                  id="send-parents"
                  checked={sendToParents}
                  onCheckedChange={setSendToParents}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule for Later (Optional)
                </Label>
                <Input
                  id="schedule"
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Paperclip className="h-4 w-4" />
                  Attach File
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Smile className="h-4 w-4" />
                  Add Emoji
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline">Save as Draft</Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => {
                  setTitle("");
                  setMessage("");
                }}>
                  Clear
                </Button>
                <Button onClick={handleSend} className="gap-2">
                  <Send className="h-4 w-4" />
                  {scheduleDate ? "Schedule Announcement" : "Send Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {(title || message) && (
          <Card className="mt-6 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
              <CardDescription>How your announcement will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg border bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{title || "Announcement Title"}</h3>
                  <Badge variant={priority === "high" ? "destructive" : "default"}>
                    {priority}
                  </Badge>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {message || "Your announcement message will appear here..."}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Just now
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Sent to: {sendToParents ? "Students & Parents" : "Students"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateAnnouncement;
