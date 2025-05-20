
import React from 'react';
import AppLayout from '@/components/AppLayout';
import AIAdvisorChat from '@/components/AIAdvisorChat';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, HelpCircle, Search, ListCheck } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Advisor: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-orange bg-clip-text text-transparent">Ask Our Virtual Assistant</h1>
              <MessageSquare className="h-5 w-5 text-orange-400" />
            </div>
            <p className="text-muted-foreground mt-1">
              Get quick answers to all your questions about Visionary Enterprises
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className={`glass-panel hover:shadow-lg transition-shadow premium-card-hover ${theme === 'light' ? 'border-orange-200/30' : 'border-orange-900/20'}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-orange-500/10' : 'bg-orange-500/20'} p-3 rounded-full mb-3 shadow-inner`}>
                  <HelpCircle className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-500 mb-1">Instant Support</h3>
                <p className="text-sm text-muted-foreground">Get immediate answers to your frequently asked questions</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`glass-panel hover:shadow-lg transition-shadow premium-card-hover ${theme === 'light' ? 'border-orange-200/30' : 'border-orange-900/20'}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-orange-500/10' : 'bg-orange-500/20'} p-3 rounded-full mb-3 shadow-inner`}>
                  <Search className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-500 mb-1">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground">Explore our comprehensive information center</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={`glass-panel hover:shadow-lg transition-shadow premium-card-hover ${theme === 'light' ? 'border-orange-200/30' : 'border-orange-900/20'}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className={`${theme === 'light' ? 'bg-orange-500/10' : 'bg-orange-500/20'} p-3 rounded-full mb-3 shadow-inner`}>
                  <ListCheck className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-500 mb-1">Quick Answers</h3>
                <p className="text-sm text-muted-foreground">Find solutions to common questions in seconds</p>
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
