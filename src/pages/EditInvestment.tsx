
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import InvestmentForm from '@/components/InvestmentForm';
import { useInvestments } from '@/contexts/InvestmentContext';

const EditInvestment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getInvestment } = useInvestments();

  const investment = id ? getInvestment(id) : undefined;

  if (!investment) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Investment</h1>
          <p className="text-muted-foreground">
            Update your investment details
          </p>
        </div>
        
        <InvestmentForm existingInvestment={investment} />
      </div>
    </AppLayout>
  );
};

export default EditInvestment;
