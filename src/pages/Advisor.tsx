
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
            Get personalized investment advice and answers to your financial questions
          </p>
        </div>
        
        <AIAdvisorChat />
      </div>
    </AppLayout>
  );
};

export default Advisor;
