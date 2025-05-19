
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
              <li>Total invested amount</li>
              <li>Projected final value</li>
              <li>Expected return</li>
              <li>Return on investment (ROI)</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">Use the portfolio summary to quickly assess your overall investment performance and track your progress toward financial goals.</p>
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
              <li>Investment name (e.g., "Retirement Fund")</li>
              <li>Investment type (Stocks, Bonds, Real Estate, etc.)</li>
              <li>Monthly contribution amount</li>
              <li>Expected interest rate (%)</li>
              <li>Investment duration (months)</li>
              <li>Start date</li>
              <li>Risk level (Low, Medium, High)</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">Be realistic about interest rates. Use historical averages for your chosen investment type rather than overly optimistic projections.</p>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Investment Preview</h3>
            <p className="mb-3">As you enter your investment details, you'll see a real-time preview of your projected investment growth and final value.</p>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">Try adjusting different parameters to see how they affect your final investment value. Small changes in interest rate or monthly contribution can have significant long-term impacts.</p>
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
            <h3 className="text-xl font-medium text-orange-300 mb-3">Interactive Chat</h3>
            <p className="mb-3">The AI Investment Advisor provides personalized guidance through a chat interface. You can ask questions about:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Portfolio analysis and insights</li>
              <li>Investment diversification strategies</li>
              <li>Goal-based planning and tracking</li>
              <li>Specific investment calculations</li>
              <li>AI integration recommendations for your investment strategy</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">The AI advisor takes into account your existing investments when providing advice, making recommendations relevant to your specific portfolio.</p>
            </div>
          </div>
          
          <div className="premium-card rounded-lg p-6">
            <h3 className="text-xl font-medium text-orange-300 mb-3">Sample Questions</h3>
            <p className="mb-3">Try asking questions like:</p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>"How much will I earn if I invest $500 monthly at 8% for 5 years?"</li>
              <li>"Can you analyze my current portfolio?"</li>
              <li>"What AI tools would you recommend for my investment strategy?"</li>
              <li>"Should I diversify my investments more?"</li>
              <li>"How do my investments align with my retirement goals?"</li>
            </ul>
            <div className="mt-4 glass-panel p-4 rounded-lg">
              <h4 className="font-medium text-orange-200 mb-2">Pro Tip</h4>
              <p className="text-sm text-muted-foreground">Be specific with your questions to get the most relevant advice. The more details you provide, the more tailored the response will be.</p>
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
