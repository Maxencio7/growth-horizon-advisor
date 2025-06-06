
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, PlusCircle, Bot, Settings, DollarSign, Sparkles, TrendingUp, Shield } from "lucide-react";
import AppLayout from '@/components/AppLayout';

const UserGuidePage: React.FC = () => {
  const guides = {
    dashboard: {
      title: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Your investment overview",
      gradient: "from-blue-500 to-purple-600",
      content: (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 border border-blue-500/20 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 dark:from-blue-500/10 dark:to-purple-600/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/30">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">Portfolio Summary</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">At the top of your dashboard, you'll find a comprehensive overview of your entire investment portfolio including:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-blue-200/30 dark:border-blue-700/30">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="font-medium text-blue-700 dark:text-blue-300">Total Invested:</span>
                    <span className="text-gray-600 dark:text-gray-400">Your total contributions</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-purple-200/30 dark:border-purple-700/30">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="font-medium text-purple-700 dark:text-purple-300">Projected Value:</span>
                    <span className="text-gray-600 dark:text-gray-400">Future portfolio worth</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-green-200/30 dark:border-green-700/30">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-medium text-green-700 dark:text-green-300">Expected Return:</span>
                    <span className="text-gray-600 dark:text-gray-400">Your projected profit</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-orange-200/30 dark:border-orange-700/30">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="font-medium text-orange-700 dark:text-orange-300">ROI Percentage:</span>
                    <span className="text-gray-600 dark:text-gray-400">Return on investment</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Pro Tip</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Focus on consistent monthly contributions rather than trying to time the market. Small, regular investments often outperform large, sporadic ones through the power of compound interest.</p>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-teal-600/10 dark:from-green-500/20 dark:to-teal-600/20 border border-green-500/20 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-600/5 dark:from-green-500/10 dark:to-teal-600/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20 dark:bg-green-500/30">
                  <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Beginner vs Advanced Mode</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">Switch between viewing modes to match your experience level:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200/50 dark:border-green-700/50 p-4">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 dark:bg-green-500/20 rounded-full -mr-10 -mt-10"></div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">🌱 Beginner Mode</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Educational content and tips
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Simple, clear explanations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Learning resources
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      Basic investment metrics
                    </li>
                  </ul>
                </div>
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-700/50 p-4">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 dark:bg-blue-500/20 rounded-full -mr-10 -mt-10"></div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">🚀 Advanced Mode</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Professional analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Sharpe ratio and CAGR
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Risk-adjusted returns
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      Portfolio diversification metrics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    addInvestment: {
      title: "Add Investment",
      icon: <PlusCircle className="h-5 w-5" />,
      description: "Create new investments",
      gradient: "from-green-500 to-emerald-600",
      content: (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 dark:from-green-500/20 dark:to-emerald-600/20 border border-green-500/20 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-600/5 dark:from-green-500/10 dark:to-emerald-600/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20 dark:bg-green-500/30">
                  <PlusCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Investment Details</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">When adding a new investment, you'll need to provide these essential details:</p>
              <div className="grid gap-4">
                {[
                  { label: "Investment Name", desc: "Give it a meaningful name (e.g., 'Emergency Fund', 'Retirement Savings')", color: "blue" },
                  { label: "Investment Type", desc: "Choose from Stocks, Bonds, Real Estate, etc.", color: "purple" },
                  { label: "Monthly Amount", desc: "How much you plan to invest each month", color: "green" },
                  { label: "Expected Interest Rate", desc: "Research historical averages for your investment type", color: "orange" },
                  { label: "Duration", desc: "How long you plan to invest (longer = more compound growth)", color: "red" },
                  { label: "Risk Level", desc: "Your comfort level with potential losses", color: "indigo" }
                ].map((item, index) => (
                  <div key={index} className={`flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-${item.color}-200/30 dark:border-${item.color}-700/30 hover:border-${item.color}-300/50 dark:hover:border-${item.color}-600/50 transition-colors`}>
                    <div className={`w-2 h-2 rounded-full bg-${item.color}-500 mt-2 flex-shrink-0`}></div>
                    <div>
                      <span className={`font-medium text-${item.color}-700 dark:text-${item.color}-300`}>{item.label}:</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Beginner Guidelines</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-2 rounded bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-700/30">
                    <p className="font-medium text-blue-700 dark:text-blue-300">Conservative: 3-6%</p>
                    <p className="text-blue-600 dark:text-blue-400">Bonds, CDs</p>
                  </div>
                  <div className="p-2 rounded bg-yellow-100/50 dark:bg-yellow-900/20 border border-yellow-200/30 dark:border-yellow-700/30">
                    <p className="font-medium text-yellow-700 dark:text-yellow-300">Moderate: 6-10%</p>
                    <p className="text-yellow-600 dark:text-yellow-400">Mutual Funds, ETFs</p>
                  </div>
                  <div className="p-2 rounded bg-red-100/50 dark:bg-red-900/20 border border-red-200/30 dark:border-red-700/30">
                    <p className="font-medium text-red-700 dark:text-red-300">Aggressive: 8-12%</p>
                    <p className="text-red-600 dark:text-red-400">Individual Stocks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    advisor: {
      title: "AI Advisor",
      icon: <Bot className="h-5 w-5" />,
      description: "Get personalized advice",
      gradient: "from-purple-500 to-pink-600",
      content: (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 dark:from-purple-500/20 dark:to-pink-600/20 border border-purple-500/20 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-600/5 dark:from-purple-500/10 dark:to-pink-600/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/20 dark:bg-purple-500/30">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Your Personal Investment Coach</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">The AI Investment Advisor is like having a personal financial coach available 24/7. Ask questions about:</p>
              <div className="grid gap-3">
                {[
                  { q: "What's the difference between stocks and bonds?", category: "Basic" },
                  { q: "Is my portfolio well-diversified?", category: "Analysis" },
                  { q: "How much should I save for retirement?", category: "Planning" },
                  { q: "Am I taking too much or too little risk?", category: "Risk" },
                  { q: "Should I invest more aggressively at my age?", category: "Strategy" }
                ].map((item, index) => (
                  <div key={index} className="group p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-purple-200/30 dark:border-purple-700/30 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all hover:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">{item.category}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 italic">"{item.q}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    settings: {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      description: "Customize your experience",
      gradient: "from-orange-500 to-red-600",
      content: (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/10 to-red-600/10 dark:from-orange-500/20 dark:to-red-600/20 border border-orange-500/20 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-600/5 dark:from-orange-500/10 dark:to-red-600/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/20 dark:bg-orange-500/30">
                  <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-300">Personalization Options</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">Customize your investment management experience:</p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-orange-200/30 dark:border-orange-700/30">
                  <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Currency Preferences</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose from major global and African currencies. All investment values will display in your selected currency.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-red-200/30 dark:border-red-700/30">
                  <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">Theme Settings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Switch between light and dark modes to match your preference and reduce eye strain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    currency: {
      title: "Currency",
      icon: <DollarSign className="h-5 w-5" />,
      description: "Currency settings",
      gradient: "from-indigo-500 to-blue-600",
      content: (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-600/10 dark:from-indigo-500/20 dark:to-blue-600/20 border border-indigo-500/20 p-6 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-600/5 dark:from-indigo-500/10 dark:to-blue-600/10"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-500/20 dark:bg-indigo-500/30">
                  <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">Available Currencies</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Global Currencies</h4>
                  <div className="space-y-2">
                    {['US Dollar (USD)', 'Euro (EUR)', 'British Pound (GBP)', 'Japanese Yen (JPY)', 'Swiss Franc (CHF)', 'Indian Rupee (INR)', 'Russian Ruble (RUB)'].map((currency, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-white/30 dark:bg-gray-800/30 border border-indigo-200/30 dark:border-indigo-700/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{currency}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">African Currencies</h4>
                  <div className="space-y-2">
                    {['South African Rand (ZAR)', 'Nigerian Naira (NGN)', 'Kenyan Shilling (KES)', 'Egyptian Pound (EGP)', 'Ghanaian Cedi (GHS)', 'Moroccan Dirham (MAD)', 'Zambian Kwacha (ZMW)'].map((currency, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-white/30 dark:bg-gray-800/30 border border-blue-200/30 dark:border-blue-700/30">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{currency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Investment Manager Guide
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master your investment journey with our comprehensive guide. Learn features, tips, and best practices to maximize your portfolio growth.
          </p>
        </div>
        
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border-b border-primary/10">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              Investment Manager Guide
            </CardTitle>
            <CardDescription className="text-base">
              Select a section below to learn more about each feature and become an investment pro
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto p-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-none">
                {Object.entries(guides).map(([key, guide]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="group flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${guide.gradient} group-data-[state=active]:scale-110 transition-transform`}>
                      <div className="text-white">
                        {guide.icon}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">{guide.title}</div>
                      <div className="text-xs text-muted-foreground">{guide.description}</div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="p-6">
                {Object.entries(guides).map(([key, guide]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="mb-6 text-center">
                      <div className={`inline-flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${guide.gradient} text-white shadow-lg`}>
                        {guide.icon}
                        <div>
                          <h2 className="text-xl font-semibold">{guide.title}</h2>
                          <p className="text-white/80 text-sm">{guide.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <ScrollArea className="h-[60vh] rounded-md pr-4">
                      {guide.content}
                    </ScrollArea>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UserGuidePage;
