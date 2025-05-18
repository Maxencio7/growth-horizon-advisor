
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/components/AppLayout';
import InvestmentCard from '@/components/InvestmentCard';
import PortfolioSummary from '@/components/PortfolioSummary';
import { useInvestments } from '@/contexts/InvestmentContext';

const Index: React.FC = () => {
  const { investments } = useInvestments();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Investment Dashboard</h1>
            <p className="text-muted-foreground">
              Track and manage your investment portfolio
            </p>
          </div>
          <Button
            className="bg-finance-primary hover:bg-finance-primary/90"
            asChild
          >
            <Link to="/add-investment">Add Investment</Link>
          </Button>
        </div>
        
        <Separator />
        
        <PortfolioSummary investments={investments} />
        
        {investments.length === 0 ? (
          <div className="bg-muted/40 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No investments yet</h2>
            <p className="text-muted-foreground mb-4">
              Start by adding your first investment to see projections and insights.
            </p>
            <Button
              className="bg-finance-primary hover:bg-finance-primary/90"
              asChild
            >
              <Link to="/add-investment">Add Your First Investment</Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Investments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map((investment) => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
