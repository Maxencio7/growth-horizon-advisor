
import React from 'react';
import AppLayout from '@/components/AppLayout';
import AIAdvisorChat from '@/components/AIAdvisorChat';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, BrainCircuit, Lightbulb, Sparkles } from 'lucide-react';

const Advisor: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-orange bg-clip-text text-transparent">AI Investment Advisor</h1>
              <Sparkles className="h-5 w-5 text-orange-400" />
            </div>
            <p className="text-muted-foreground mt-1">
              Get personalized investment advice powered by advanced AI
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass-panel hover:shadow-lg transition-shadow premium-card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-500/20 p-3 rounded-full mb-3 shadow-inner">
                  <Bot className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-300 mb-1">Portfolio Analysis</h3>
                <p className="text-sm text-muted-foreground">Get personalized insights based on your current investments</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel hover:shadow-lg transition-shadow premium-card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-500/20 p-3 rounded-full mb-3 shadow-inner">
                  <BrainCircuit className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-300 mb-1">AI Integration</h3>
                <p className="text-sm text-muted-foreground">Discover AI tools to enhance your investment strategy</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel hover:shadow-lg transition-shadow premium-card-hover">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-500/20 p-3 rounded-full mb-3 shadow-inner">
                  <Lightbulb className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-300 mb-1">Smart Projections</h3>
                <p className="text-sm text-muted-foreground">Calculate potential returns with AI-powered scenario analysis</p>
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
