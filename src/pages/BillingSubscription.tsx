import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, CreditCard, Download, TrendingUp, Users, Database, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const BillingSubscription = () => {
  const [currentPlan, setCurrentPlan] = useState("premium");

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Up to 5 classrooms",
        "100 whispers/month",
        "Basic analytics",
        "Email support",
        "Includes ads"
      ],
      limitations: [
        "Limited AI features",
        "No custom branding"
      ],
      color: "text-gray-500",
      bgGradient: "from-gray-500/10 to-gray-500/5"
    },
    {
      name: "Premium",
      price: "$29",
      period: "per month",
      features: [
        "Unlimited classrooms",
        "Unlimited whispers",
        "Advanced analytics",
        "AI assistant included",
        "Priority support",
        "No ads",
        "Custom branding"
      ],
      limitations: [],
      color: "text-purple-500",
      bgGradient: "from-purple-500/10 to-accent/5",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      features: [
        "Everything in Premium",
        "Multi-institution support",
        "Dedicated support team",
        "Custom integrations",
        "SLA guarantee",
        "Advanced security",
        "Custom training",
        "API access"
      ],
      limitations: [],
      color: "text-emerald-500",
      bgGradient: "from-emerald-500/10 to-teal-500/5"
    }
  ];

  const usageMetrics = [
    {
      label: "Users",
      used: 850,
      total: 1000,
      icon: Users,
      color: "text-blue-500"
    },
    {
      label: "Storage",
      used: 45,
      total: 100,
      icon: Database,
      unit: "GB",
      color: "text-purple-500"
    },
    {
      label: "AI Credits",
      used: 12500,
      total: 20000,
      icon: Zap,
      color: "text-amber-500"
    }
  ];

  const transactions = [
    { date: "2025-09-13", amount: "$29.00", status: "Paid", invoice: "INV-2025-001" },
    { date: "2025-08-13", amount: "$29.00", status: "Paid", invoice: "INV-2025-002" },
    { date: "2025-07-13", amount: "$29.00", status: "Paid", invoice: "INV-2025-003" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              Billing & Subscription
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription and billing details
            </p>
          </div>
          <Link to="/dashboard/super-admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Current Plan Summary */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Current Plan: Premium</h3>
              <p className="text-muted-foreground mt-1">Next billing date: October 13, 2025</p>
              <div className="flex gap-2 mt-4">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Manage Payment</Button>
                <Button variant="outline">Cancel Plan</Button>
              </div>
            </div>
            <Badge className="text-lg px-4 py-2">$29/month</Badge>
          </div>
        </Card>

        {/* Usage Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usageMetrics.map((metric, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {metric.used.toLocaleString()} {metric.unit && `${metric.unit}`}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    of {metric.total.toLocaleString()} {metric.unit && `${metric.unit}`}
                  </p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <Progress value={(metric.used / metric.total) * 100} className="h-2" />
            </Card>
          ))}
        </div>

        {/* Plans Comparison */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-6 relative overflow-hidden bg-gradient-to-br ${plan.bgGradient} ${
                  plan.popular ? "border-primary shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute top-4 right-4">Most Popular</Badge>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-2xl font-bold ${plan.color}`}>{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full mt-6"
                    variant={currentPlan === plan.name.toLowerCase() ? "outline" : "default"}
                  >
                    {currentPlan === plan.name.toLowerCase() ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <Card className="p-6 bg-card/50 backdrop-blur">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Transaction History</h3>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{transaction.invoice}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{transaction.amount}</span>
                  <Badge variant="secondary">{transaction.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BillingSubscription;