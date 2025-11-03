import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, MessageSquare, Activity, Download, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const InstitutionAnalytics = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedInstitution, setSelectedInstitution] = useState("all");

  const engagementData = [
    { name: "Mon", engagement: 85, whispers: 120, active: 65 },
    { name: "Tue", engagement: 78, whispers: 98, active: 72 },
    { name: "Wed", engagement: 92, whispers: 145, active: 88 },
    { name: "Thu", engagement: 88, whispers: 132, active: 76 },
    { name: "Fri", engagement: 95, whispers: 156, active: 92 },
    { name: "Sat", engagement: 45, whispers: 42, active: 38 },
    { name: "Sun", engagement: 38, whispers: 35, active: 32 }
  ];

  const institutionComparison = [
    { name: "Institution A", students: 1200, engagement: 88, whispers: 4500 },
    { name: "Institution B", students: 950, engagement: 92, whispers: 3800 },
    { name: "Institution C", students: 1450, engagement: 76, whispers: 5200 },
    { name: "Institution D", students: 780, engagement: 85, whispers: 2900 },
    { name: "Institution E", students: 1100, engagement: 90, whispers: 4100 }
  ];

  const sentimentData = [
    { name: "Positive", value: 65, color: "#10b981" },
    { name: "Neutral", value: 28, color: "#8b5cf6" },
    { name: "Stressed", value: 7, color: "#f59e0b" }
  ];

  const stats = [
    {
      label: "Total Engagement",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-emerald-500"
    },
    {
      label: "Active Users",
      value: "8,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      label: "Whispers Sent",
      value: "45,690",
      change: "+18%",
      icon: MessageSquare,
      color: "text-purple-500"
    },
    {
      label: "Avg. Response Time",
      value: "2.3 min",
      change: "-8%",
      icon: Activity,
      color: "text-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Institution Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights across all institutions
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Institutions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                <SelectItem value="inst-1">Institution A</SelectItem>
                <SelectItem value="inst-2">Institution B</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Link to="/dashboard/super-admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                  <Badge variant="secondary" className="mt-2">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Engagement Trend */}
          <Card className="p-6 bg-card/50 backdrop-blur">
            <h3 className="text-xl font-semibold mb-4">Engagement Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="active" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="p-6 bg-card/50 backdrop-blur">
            <h3 className="text-xl font-semibold mb-4">Communication Sentiment</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Institution Comparison */}
        <Card className="p-6 bg-card/50 backdrop-blur">
          <h3 className="text-xl font-semibold mb-4">Institution Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={institutionComparison}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="students" fill="hsl(var(--primary))" />
              <Bar yAxisId="left" dataKey="whispers" fill="hsl(var(--accent))" />
              <Bar yAxisId="right" dataKey="engagement" fill="hsl(var(--chart-2))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* AI-Generated Insights */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            AI-Generated Insights
          </h3>
          <div className="space-y-3">
            <div className="p-4 bg-background/50 rounded-lg">
              <p className="font-medium text-emerald-600">📈 Positive Trend</p>
              <p className="text-sm text-muted-foreground mt-1">
                Institution B shows 15% increase in student engagement over the past month
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <p className="font-medium text-blue-600">💡 Recommendation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Consider implementing focus challenges in Institution C to boost participation
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <p className="font-medium text-purple-600">⚠️ Attention Needed</p>
              <p className="text-sm text-muted-foreground mt-1">
                Response time in Institution D is 20% higher than platform average
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionAnalytics;