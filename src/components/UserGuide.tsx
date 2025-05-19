
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, BarChart3, PlusCircle, Bot, Settings, DollarSign } from "lucide-react";

const UserGuide: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const guides = {
    dashboard: {
      title: "Dashboard",
      icon: <BarChart3 className="h-5 w-5 text-orange-400" />,
      description: "Your investment overview",
      content: (
        <div className="space-y-4">
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Portfolio Summary</h3>
            <p>At the top of your dashboard, you'll find a summary of your entire investment portfolio including:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Total invested amount</li>
              <li>Projected final value</li>
              <li>Expected return</li>
              <li>Return on investment (ROI)</li>
            </ul>
          </div>
          
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Investment Cards</h3>
            <p>Each of your investments is displayed as a card showing:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Investment name and type</li>
              <li>Monthly contribution amount</li>
              <li>Interest rate and duration</li>
              <li>Projected growth chart</li>
              <li>Edit and delete options</li>
            </ul>
          </div>
          
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Currency Selection</h3>
            <p>You can change your preferred currency using the selector in the top-right corner of the page. All values will be displayed in your selected currency.</p>
          </div>
        </div>
      )
    },
    addInvestment: {
      title: "Add Investment",
      icon: <PlusCircle className="h-5 w-5 text-orange-400" />,
      description: "Create new investments",
      content: (
        <div className="space-y-4">
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Investment Details</h3>
            <p>When adding a new investment, you'll need to provide:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Investment name (e.g., "Retirement Fund")</li>
              <li>Investment type (Stocks, Bonds, Real Estate, etc.)</li>
              <li>Monthly contribution amount</li>
              <li>Expected interest rate (%)</li>
              <li>Investment duration (months)</li>
              <li>Start date</li>
              <li>Risk level (Low, Medium, High)</li>
            </ul>
          </div>
          
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Investment Preview</h3>
            <p>As you enter your investment details, you'll see a real-time preview of your projected investment growth and final value.</p>
          </div>
        </div>
      )
    },
    advisor: {
      title: "AI Advisor",
      icon: <Bot className="h-5 w-5 text-orange-400" />,
      description: "Get personalized advice",
      content: (
        <div className="space-y-4">
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Interactive Chat</h3>
            <p>The AI Investment Advisor provides personalized guidance through a chat interface. You can ask questions about:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Portfolio analysis and insights</li>
              <li>Investment diversification strategies</li>
              <li>Goal-based planning and tracking</li>
              <li>Specific investment calculations</li>
              <li>AI integration recommendations for your investment strategy</li>
            </ul>
          </div>
          
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Sample Questions</h3>
            <p>Try asking questions like:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>"How much will I earn if I invest $500 monthly at 8% for 5 years?"</li>
              <li>"Can you analyze my current portfolio?"</li>
              <li>"What AI tools would you recommend for my investment strategy?"</li>
              <li>"Should I diversify my investments more?"</li>
              <li>"How do my investments align with my retirement goals?"</li>
            </ul>
          </div>
        </div>
      )
    },
    settings: {
      title: "Settings",
      icon: <Settings className="h-5 w-5 text-orange-400" />,
      description: "Customize your experience",
      content: (
        <div className="space-y-4">
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Currency Settings</h3>
            <p>You can change your preferred currency using the selector in the top-right corner of any page. The application supports:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Major global currencies (USD, EUR, GBP, etc.)</li>
              <li>African currencies (ZAR, NGN, KES, etc.)</li>
              <li>Other regional currencies</li>
            </ul>
            <p className="mt-2">All investment values will be displayed in your selected currency.</p>
          </div>
        </div>
      )
    },
    currency: {
      title: "Currency",
      icon: <DollarSign className="h-5 w-5 text-orange-400" />,
      description: "Currency settings",
      content: (
        <div className="space-y-4">
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Available Currencies</h3>
            <p>The application supports a wide range of currencies, including:</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <h4 className="font-medium text-orange-200">Global Currencies:</h4>
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
              <div>
                <h4 className="font-medium text-orange-200">African Currencies:</h4>
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
          
          <div className="glass-panel rounded-lg p-4">
            <h3 className="text-lg font-medium text-orange-300 mb-2">Changing Currency</h3>
            <p>To change your currency:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Look for the currency selector in the top right corner of the page</li>
              <li>Click to open the dropdown menu</li>
              <li>Select your preferred currency</li>
              <li>All values will automatically update to reflect the new currency</li>
            </ol>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-gradient-orange shadow-lg shadow-orange-900/20 border-orange-900/30"
        aria-label="Open User Guide"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass-panel max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gradient-text">Investment Manager User Guide</DialogTitle>
            <DialogDescription>
              Learn how to use the different features of your Investment Manager application
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue={activeTab} className="flex-1 flex flex-col" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 bg-transparent">
              {Object.entries(guides).map(([key, guide]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300 data-[state=active]:shadow-none"
                >
                  <div className="flex flex-col items-center gap-1">
                    {guide.icon}
                    <span>{guide.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(guides).map(([key, guide]) => (
              <TabsContent key={key} value={key} className="flex-1 mt-4">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-orange-300">{guide.title}</h2>
                  <p className="text-muted-foreground">{guide.description}</p>
                </div>
                
                <ScrollArea className="h-[350px] rounded-md pr-4">
                  {guide.content}
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
          
          <DialogFooter className="mt-4">
            <Button onClick={() => setOpen(false)} className="premium-button">
              Close Guide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserGuide;
