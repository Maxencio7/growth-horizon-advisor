
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/components/AppLayout';
import InvestmentCard from '@/components/InvestmentCard';
import PortfolioSummary from '@/components/PortfolioSummary';
import { useInvestments } from '@/contexts/InvestmentContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const { investments } = useInvestments();
  const isMobile = useIsMobile();

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6">
        <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between items-center'}`}>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Investment Dashboard</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track and manage your investment portfolio
            </p>
          </div>
          <Button
            className="bg-finance-primary hover:bg-finance-primary/90 w-full md:w-auto"
            asChild
          >
            <Link to="/add-investment">Add Investment</Link>
          </Button>
        </div>
        
        <Separator />
        
        <PortfolioSummary investments={investments} />
        
        {investments.length === 0 ? (
          <div className="bg-muted/40 rounded-lg p-4 md:p-8 text-center">
            <h2 className="text-lg md:text-xl font-semibold mb-2">No investments yet</h2>
            <p className="text-muted-foreground text-sm md:text-base mb-4">
              Start by adding your first investment to see projections and insights.
            </p>
            <Button
              className="bg-finance-primary hover:bg-finance-primary/90 w-full md:w-auto"
              asChild
            >
              <Link to="/add-investment">Add Your First Investment</Link>
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Your Investments</h2>
            <div className="investments-grid">
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
