
import React from 'react';
import AppLayout from '@/components/AppLayout';
import AIAdvisorChat from '@/components/AIAdvisorChat';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, BrainCircuit, Lightbulb } from 'lucide-react';

const Advisor: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Investment Advisor</h1>
          <p className="text-muted-foreground">
            Get personalized investment advice, AI integration recommendations, and portfolio analysis
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass-panel">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-500/20 p-3 rounded-full mb-3">
                  <Bot className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-300 mb-1">Investment Analysis</h3>
                <p className="text-sm text-muted-foreground">Ask for portfolio analysis and personalized advice based on your investments</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-500/20 p-3 rounded-full mb-3">
                  <BrainCircuit className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-300 mb-1">AI Integration Advice</h3>
                <p className="text-sm text-muted-foreground">Get recommendations on AI tools and technologies to enhance your investment strategy</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-panel">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-500/20 p-3 rounded-full mb-3">
                  <Lightbulb className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="font-medium text-orange-300 mb-1">Investment Calculations</h3>
                <p className="text-sm text-muted-foreground">Calculate potential returns with various investment scenarios and parameters</p>
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
