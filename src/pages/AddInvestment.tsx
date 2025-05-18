
import React from 'react';
import AppLayout from '@/components/AppLayout';
import InvestmentForm from '@/components/InvestmentForm';

const AddInvestment: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Investment</h1>
          <p className="text-muted-foreground">
            Enter your investment details to see long-term projections
          </p>
        </div>
        
        <InvestmentForm />
      </div>
    </AppLayout>
  );
};

export default AddInvestment;
