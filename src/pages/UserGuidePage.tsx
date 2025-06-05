import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, PlusCircle, Bot, Settings, DollarSign } from "lucide-react";
import AppLayout from '@/components/AppLayout';

const UserGuidePage: React.FC = () => {
  const guides = {
    dashboard: {
      title: "Dashboard",
      icon: <BarChart3 className="h-5 w-5 text-orange-400" />,
      description: "Your investment overview",
      content: (
        <div className="space-y-6">
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Portfolio Summary</h3>
            <p className="mb-3">At the top of your dashboard, you'll find a summary of your entire investment portfolio including:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li><strong>Total Invested:</strong> The total amount of money you've put into investments</li>
              <li><strong>Projected Value:</strong> What your investments are expected to be worth at maturity</li>
              <li><strong>Expected Return:</strong> The profit you're projected to make</li>
              <li><strong>ROI (Return on Investment):</strong> The percentage return on your money</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Beginner Tip</h4>
              <p className="text-sm text-muted-foreground">Focus on consistent monthly contributions rather than trying to time the market. Small, regular investments often outperform large, sporadic ones.</p>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Beginner vs Advanced View</h3>
            <p className="mb-3">Switch between viewing modes to match your experience level:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-medium text-green-200 mb-2">Beginner Mode:</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground text-sm">
                  <li>Educational content and tips</li>
                  <li>Simple, clear explanations</li>
                  <li>Learning resources</li>
                  <li>Basic investment metrics</li>
                </ul>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-medium text-blue-200 mb-2">Advanced Mode:</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground text-sm">
                  <li>Professional analytics</li>
                  <li>Sharpe ratio and CAGR</li>
                  <li>Risk-adjusted returns</li>
                  <li>Portfolio diversification metrics</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Investment Cards</h3>
            <p className="mb-3">Each of your investments is displayed as a card showing:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Investment name and type</li>
              <li>Monthly contribution amount</li>
              <li>Interest rate and duration</li>
              <li>Projected growth chart</li>
              <li>Edit and delete options</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">Click on any investment card to see more detailed information and growth projections. Use the edit button to update investment details if your circumstances change.</p>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Currency Selection</h3>
            <p className="mb-3">You can change your preferred currency using the selector in the top-right corner of the page. All values will be displayed in your selected currency.</p>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">If you have investments in different countries, changing the currency can help you better understand your portfolio's value in your local currency.</p>
            </div>
          </div>
        </div>
      )
    },
    addInvestment: {
      title: "Add Investment",
      icon: <PlusCircle className="h-5 w-5 text-orange-400" />,
      description: "Create new investments",
      content: (
        <div className="space-y-6">
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Investment Details</h3>
            <p className="mb-3">When adding a new investment, you'll need to provide:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li><strong>Investment Name:</strong> Give it a meaningful name (e.g., "Emergency Fund", "Retirement Savings")</li>
              <li><strong>Investment Type:</strong> Choose from Stocks, Bonds, Real Estate, etc.</li>
              <li><strong>Monthly Amount:</strong> How much you plan to invest each month</li>
              <li><strong>Expected Interest Rate:</strong> Research historical averages for your investment type</li>
              <li><strong>Duration:</strong> How long you plan to invest (longer = more compound growth)</li>
              <li><strong>Start Date:</strong> When you'll begin investing</li>
              <li><strong>Risk Level:</strong> Your comfort level with potential losses</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Beginner Guidelines</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• <strong>Conservative:</strong> 3-6% return (Bonds, CDs)</p>
                <p>• <strong>Moderate:</strong> 6-10% return (Mutual Funds, ETFs)</p>
                <p>• <strong>Aggressive:</strong> 8-12% return (Individual Stocks)</p>
                <p>• Start with 10-15% of your income if possible</p>
              </div>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Investment Preview</h3>
            <p className="mb-3">As you enter your investment details, you'll see a real-time preview showing how your money could grow over time through compound interest.</p>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Understanding the Preview</h4>
              <p className="text-sm text-muted-foreground">The chart shows your money growing month by month. Notice how the growth accelerates over time - that's the power of compounding at work!</p>
            </div>
          </div>
        </div>
      )
    },
    advisor: {
      title: "AI Advisor",
      icon: <Bot className="h-5 w-5 text-orange-400" />,
      description: "Get personalized advice",
      content: (
        <div className="space-y-6">
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Your Personal Investment Coach</h3>
            <p className="mb-3">The AI Investment Advisor is like having a personal financial coach available 24/7. Ask questions about:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li><strong>Basic Questions:</strong> "What's the difference between stocks and bonds?"</li>
              <li><strong>Portfolio Analysis:</strong> "Is my portfolio well-diversified?"</li>
              <li><strong>Goal Planning:</strong> "How much should I save for retirement?"</li>
              <li><strong>Risk Assessment:</strong> "Am I taking too much or too little risk?"</li>
              <li><strong>Strategy Help:</strong> "Should I invest more aggressively at my age?"</li>
            </ul>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Sample Beginner Questions</h3>
            <div className="space-y-3">
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"I'm 25 and just started working. How should I begin investing?"</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"What's a safe amount to invest each month from my salary?"</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"Should I pay off debt first or start investing?"</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"How do I know if my investment returns are good?"</p>
              </div>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Sample Advanced Questions</h3>
            <div className="space-y-3">
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"What's the best way to diversify my portfolio?"</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"How can I calculate my investment return?"</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"What's the difference between a mutual fund and an ETF?"</p>
              </div>
              <div className="glass-panel p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-200">"How do I adjust my investment strategy as my financial goals change?"</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    settings: {
      title: "Settings",
      icon: <Settings className="h-5 w-5 text-orange-400" />,
      description: "Customize your experience",
      content: (
        <div className="space-y-6">
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Currency Settings</h3>
            <p className="mb-3">You can change your preferred currency using the selector in the top-right corner of any page. The application supports:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Major global currencies (USD, EUR, GBP, etc.)</li>
              <li>African currencies (ZAR, NGN, KES, etc.)</li>
              <li>Other regional currencies</li>
            </ul>
            <p className="mt-3">All investment values will be displayed in your selected currency.</p>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">If you're planning to move to another country, you can use the currency selector to see how your investments would be valued in your future location.</p>
            </div>
          </div>
        </div>
      )
    },
    currency: {
      title: "Currency",
      icon: <DollarSign className="h-5 w-5 text-orange-400" />,
      description: "Currency settings",
      content: (
        <div className="space-y-6">
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Available Currencies</h3>
            <p className="mb-3">The application supports a wide range of currencies, including:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-medium text-orange-200 mb-2">Global Currencies:</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
                  <li>US Dollar (USD)</li>
                  <li>Euro (EUR)</li>
                  <li>British Pound (GBP)</li>
                  <li>Japanese Yen (JPY)</li>
                  <li>Swiss Franc (CHF)</li>
                  <li>Indian Rupee (INR)</li>
                  <li>Russian Ruble (RUB)</li>
                </ul>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-medium text-orange-200 mb-2">African Currencies:</h4>
                <ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
                  <li>South African Rand (ZAR)</li>
                  <li>Nigerian Naira (NGN)</li>
                  <li>Kenyan Shilling (KES)</li>
                  <li>Egyptian Pound (EGP)</li>
                  <li>Ghanaian Cedi (GHS)</li>
                  <li>Moroccan Dirham (MAD)</li>
                  <li>Zambian Kwacha (ZMW)</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Changing Currency</h3>
            <p className="mb-3">To change your currency:</p>
            <ol className="list-decimal list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Look for the currency selector in the top right corner of the page</li>
              <li>Click to open the dropdown menu</li>
              <li>Select your preferred currency</li>
              <li>All values will automatically update to reflect the new currency</li>
            </ol>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">The currency selection is saved in your browser, so it will be remembered next time you visit the application.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold gradient-text tracking-tight">User Guide</h1>
          <p className="text-muted-foreground">
            Learn how to use the Investment Manager application and make the most of its features
          </p>
        </div>
        
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Investment Manager Guide</CardTitle>
            <CardDescription>
              Select a section below to learn more about each feature of the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full bg-black/30">
                {Object.entries(guides).map(([key, guide]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300"
                  >
                    <div className="flex flex-col items-center gap-1">
                      {guide.icon}
                      <span>{guide.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-6">
                {Object.entries(guides).map(([key, guide]) => (
                  <TabsContent key={key} value={key}>
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-orange-300 flex items-center gap-2">
                        {guide.icon}
                        {guide.title}
                      </h2>
                      <p className="text-muted-foreground">{guide.description}</p>
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
