import { Clock, Download, Trash2, Shield, Calendar, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const DataRetention = () => {
  const [whisperRetention, setWhisperRetention] = useState('30');
  const [autoDelete, setAutoDelete] = useState(false);
  const { toast } = useToast();

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready in a few minutes. We'll send you a download link via email.",
    });
  };

  const handleForgetMe = () => {
    toast({
      title: "Request Received",
      description: "Your account deletion request has been submitted. This process will be completed within 30 days.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-security rounded-2xl mb-6 shadow-glow">
            <Database className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-security bg-clip-text text-transparent">
            Data Retention & Privacy Controls
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take control of your data with flexible retention policies and privacy management tools.
          </p>
        </div>

        {/* Auto-Deletion Settings */}
        <div className="mb-12">
          <Card className="p-8 border-2 border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Auto-Deletion Timer</h2>
                <p className="text-muted-foreground">Configure how long your whispers are stored before automatic deletion</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="retention" className="text-base font-semibold mb-2 block">
                    Whisper Retention Period
                  </Label>
                  <Select value={whisperRetention} onValueChange={setWhisperRetention}>
                    <SelectTrigger id="retention">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">24 Hours</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="never">Never Delete</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Messages older than this period will be automatically deleted
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label htmlFor="auto-delete" className="text-base font-semibold">
                      Enable Auto-Deletion
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically delete old messages
                    </p>
                  </div>
                  <Switch 
                    id="auto-delete" 
                    checked={autoDelete} 
                    onCheckedChange={setAutoDelete}
                  />
                </div>
              </div>

              <Card className="bg-security-violet/5 border-security-violet/20 p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-security-violet" />
                  Current Retention Status
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Whisper Messages:</span>
                    <span className="font-semibold">{whisperRetention === 'never' ? 'Permanent' : `${whisperRetention} days`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Files & Attachments:</span>
                    <span className="font-semibold">30 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Analysis Logs:</span>
                    <span className="font-semibold">90 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activity History:</span>
                    <span className="font-semibold">1 year</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* Data Export */}
        <div className="mb-12">
          <Card className="p-8 border-2 border-security-teal/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-security-teal/10 rounded-xl">
                <Download className="h-8 w-8 text-security-teal" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Data Export Request</h2>
                <p className="text-muted-foreground">Download a complete copy of your data in a portable format</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your export will include:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-security-success" />
                    <span>All whisper messages (encrypted)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-security-success" />
                    <span>Attachments and files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-security-success" />
                    <span>Account information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-security-success" />
                    <span>Activity logs (anonymized)</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleExportData}
                  className="w-full bg-gradient-secondary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Request Data Export
                </Button>
              </div>

              <Card className="bg-muted/50 p-6">
                <h3 className="font-semibold mb-3">Export Information</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Exports are generated within 24-48 hours</p>
                  <p>• You'll receive an encrypted download link via email</p>
                  <p>• The link expires after 7 days for security</p>
                  <p>• All data is exported in JSON format</p>
                  <p>• Parental consent required for students under 13</p>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* Forget Me Option */}
        <div className="mb-12">
          <Card className="p-8 border-2 border-security-danger/20 bg-security-danger/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-security-danger/10 rounded-xl">
                <Trash2 className="h-8 w-8 text-security-danger" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Delete My Account</h2>
                <p className="text-muted-foreground">Permanently delete your account and all associated data</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-security-danger/20">
                  <p className="font-semibold text-security-danger mb-2">⚠️ Warning: This action is irreversible</p>
                  <p className="text-sm text-muted-foreground">
                    Deleting your account will permanently remove:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• All whisper messages and conversations</li>
                    <li>• Profile information and preferences</li>
                    <li>• Files and attachments</li>
                    <li>• Activity history and analytics</li>
                  </ul>
                </div>
                <Button 
                  onClick={handleForgetMe}
                  variant="destructive"
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete My Account
                </Button>
              </div>

              <Card className="bg-muted/50 p-6">
                <h3 className="font-semibold mb-3">Deletion Process</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong>Step 1:</strong> Request submitted and verified</p>
                  <p><strong>Step 2:</strong> 30-day grace period for cancellation</p>
                  <p><strong>Step 3:</strong> Data permanently deleted from all systems</p>
                  <p><strong>Step 4:</strong> Confirmation email sent</p>
                  <div className="mt-4 p-3 bg-card rounded border border-border">
                    <p className="text-xs">
                      Note: Some anonymized analytics data may be retained for legal compliance 
                      and platform improvement purposes, as outlined in our privacy policy.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>

        {/* Privacy Policy Reference */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-security-glow border-2 border-security-violet/20">
            <h3 className="text-xl font-semibold mb-4">Questions about Data Retention?</h3>
            <p className="text-muted-foreground mb-6">
              Learn more about how we handle your data in our comprehensive privacy policy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline">View Privacy Policy</Button>
              <Button variant="outline">Contact Support</Button>
              <Button variant="outline">GDPR Information</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataRetention;
