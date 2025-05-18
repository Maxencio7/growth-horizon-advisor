
import React from 'react';
import AppLayout from '@/components/AppLayout';
import AIAdvisorChat from '@/components/AIAdvisorChat';

const Advisor: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Investment Advisor</h1>
          <p className="text-muted-foreground">
            Get personalized investment advice and analysis based on your actual portfolio data
          </p>
        </div>
        
        <AIAdvisorChat />
      </div>
    </AppLayout>
  );
};

export default Advisor;
