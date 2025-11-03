import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Vote, Send, Plus, X, Lock, Eye, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePoll = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isSilent, setIsSilent] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [duration, setDuration] = useState("24");

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreate = () => {
    if (!question) {
      toast({
        title: "Missing Question",
        description: "Please enter a poll question",
        variant: "destructive",
      });
      return;
    }

    const validOptions = options.filter(opt => opt.trim() !== "");
    if (validOptions.length < 2) {
      toast({
        title: "Not Enough Options",
        description: "Please provide at least 2 options",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isSilent ? "Silent Poll Created! 🤫" : "Poll Created! 📊",
      description: `Your ${isSilent ? "silent " : ""}poll has been sent to students`,
    });

    // Reset form
    setQuestion("");
    setDescription("");
    setOptions(["", ""]);
    setIsSilent(false);
    setIsAnonymous(false);
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
          <h1 className="text-xl font-bold">Create Poll</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">New Poll</h2>
          <p className="text-muted-foreground">Get instant feedback from your students</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Poll Details
                </CardTitle>
                <CardDescription>Create your poll question and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question */}
                <div className="space-y-2">
                  <Label htmlFor="question">Poll Question *</Label>
                  <Input
                    id="question"
                    placeholder="e.g., Which topic should we cover next?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add context or details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <Label>Options *</Label>
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                      {options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {options.length < 6 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      className="w-full gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Option
                    </Button>
                  )}
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Poll Duration (hours)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="168"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Poll Settings</CardTitle>
                <CardDescription>Configure poll behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="silent" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Silent Poll
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Results hidden until poll closes
                    </p>
                  </div>
                  <Switch
                    id="silent"
                    checked={isSilent}
                    onCheckedChange={setIsSilent}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-0.5">
                    <Label htmlFor="anonymous" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Anonymous Voting
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Hide who voted for what
                    </p>
                  </div>
                  <Switch
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-20 h-fit">
            <Card className="shadow-glow">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
                <CardDescription>How students will see your poll</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg border bg-card space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl">
                      {question || "Your poll question will appear here"}
                    </h3>
                    {description && (
                      <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {options.filter(opt => opt.trim() !== "").map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto py-3"
                      >
                        <span className="flex-1 text-left">{option || `Option ${index + 1}`}</span>
                        {!isSilent && <span className="text-xs text-muted-foreground">0%</span>}
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {isSilent && <Lock className="h-3 w-3" />}
                      {isAnonymous && <Eye className="h-3 w-3" />}
                      <span>
                        {isSilent ? "Silent Poll" : "Live Results"} • 
                        {isAnonymous ? " Anonymous" : " Public"} • 
                        Expires in {duration}h
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1">Save as Draft</Button>
              <Button onClick={handleCreate} className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                Create Poll
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
