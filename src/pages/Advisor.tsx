
import React from 'react';
import AppLayout from '@/components/AppLayout';
import AIAdvisorChat from '@/components/AIAdvisorChat';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, HelpCircle, Search, ListCheck, GraduationCap, BookOpen } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Advisor: React.FC = () => {
  const { theme } = useTheme();
  
  const beginnerQuestions = [
    "I'm new to investing. Where should I start?",
    "What's the difference between stocks and bonds?",
    "How much should I invest each month?",
    "Should I pay off debt before investing?",
    "What's a good first investment for beginners?"
  ];

  const advancedQuestions = [
    "Analyze my portfolio diversification",
    "What's my portfolio's Sharpe ratio telling me?",
    "How should I rebalance my investments?",
    "What AI tools can optimize my strategy?",
    "Calculate my risk-adjusted returns"
  ];
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-orange bg-clip-text text-transparent">Investment Advisor</h1>
              <MessageSquare className="h-5 w-5 text-orange-400" />
            </div>
            <p className="text-muted-foreground mt-1">
              Get personalized advice whether you're a beginner or experienced investor
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className={`glass-panel hover:shadow-lg transition-shadow premium-card-hover ${theme === 'light' ? 'border-orange-200/30' : 'border-orange-900/20'}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-green-500/10' : 'bg-green-500/20'} p-3 rounded-full mb-3 shadow-inner`}>
                  <GraduationCap className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-medium text-green-500 mb-1">Beginner Friendly</h3>
                <p className="text-sm text-muted-foreground">Start your investment journey with confidence and clear guidance</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`glass-panel hover:shadow-lg transition-shadow premium-card-hover ${theme === 'light' ? 'border-orange-200/30' : 'border-orange-900/20'}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-blue-500/10' : 'bg-blue-500/20'} p-3 rounded-full mb-3 shadow-inner`}>
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-medium text-blue-500 mb-1">Deep Analysis</h3>
                <p className="text-sm text-muted-foreground">Advanced portfolio analysis and professional-grade insights</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`glass-panel hover:shadow-lg transition-shadow premium-card-hover ${theme === 'light' ? 'border-orange-200/30' : 'border-orange-900/20'}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-purple-500/10' : 'bg-purple-500/20'} p-3 rounded-full mb-3 shadow-inner`}>
                  <ListCheck className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-medium text-purple-500 mb-1">Personalized Advice</h3>
                <p className="text-sm text-muted-foreground">Tailored recommendations based on your specific situation</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Start Questions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="glass-panel">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-500">New to Investing?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Get started with these beginner-friendly questions:
              </p>
              <div className="space-y-2">
                {beginnerQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2 text-wrap"
                    onClick={() => {
                      const textarea = document.querySelector('input[type="text"]') as HTMLInputElement;
                      if (textarea) {
                        textarea.value = question;
                        textarea.focus();
                      }
                    }}
                  >
                    <span className="text-xs text-muted-foreground w-full">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-blue-500">Experienced Investor?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Dive deep with these advanced analysis questions:
              </p>
              <div className="space-y-2">
                {advancedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-2 text-wrap"
                    onClick={() => {
                      const textarea = document.querySelector('input[type="text"]') as HTMLInputElement;
                      if (textarea) {
                        textarea.value = question;
                        textarea.focus();
                      }
                    }}
                  >
                    <span className="text-xs text-muted-foreground w-full">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <AIAdvisorChat />
      </div>
    </AppLayout>
  );
};

export default Advisor;
