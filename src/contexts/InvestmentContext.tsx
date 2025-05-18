
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Investment, InvestmentWithProjections } from '@/types/investment';
import { calculateInvestmentGrowth } from '@/utils/investmentCalculator';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface InvestmentContextType {
  investments: InvestmentWithProjections[];
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (investment: Investment) => void;
  deleteInvestment: (id: string) => void;
  getInvestment: (id: string) => InvestmentWithProjections | undefined;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestments = () => {
  const context = useContext(InvestmentContext);
  if (context === undefined) {
    throw new Error('useInvestments must be used within an InvestmentProvider');
  }
  return context;
};

interface InvestmentProviderProps {
  children: ReactNode;
}

export const InvestmentProvider = ({ children }: InvestmentProviderProps) => {
  const [investments, setInvestments] = useState<InvestmentWithProjections[]>([]);

  // Load investments from localStorage on component mount
  useEffect(() => {
    try {
      const savedInvestments = localStorage.getItem('investments');
      if (savedInvestments) {
        const parsed = JSON.parse(savedInvestments);
        const withDates = parsed.map((inv: any) => ({
          ...inv,
          startDate: new Date(inv.startDate)
        }));
        setInvestments(withDates.map((inv: Investment) => calculateInvestmentGrowth(inv)));
      }
    } catch (error) {
      console.error('Failed to load investments from localStorage:', error);
      toast({
        title: "Error",
        description: "Failed to load saved investments",
        variant: "destructive"
      });
    }
  }, []);

  // Save investments to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('investments', JSON.stringify(investments));
    } catch (error) {
      console.error('Failed to save investments to localStorage:', error);
    }
  }, [investments]);

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = {
      ...investment,
      id: uuidv4()
    };

    const withProjections = calculateInvestmentGrowth(newInvestment);
    setInvestments(prev => [...prev, withProjections]);

    toast({
      title: "Investment Added",
      description: `Added ${investment.name} to your portfolio`,
    });
  };

  const updateInvestment = (investment: Investment) => {
    const withProjections = calculateInvestmentGrowth(investment);

    setInvestments(prev => 
      prev.map(inv => inv.id === investment.id ? withProjections : inv)
    );

    toast({
      title: "Investment Updated",
      description: `Updated ${investment.name} successfully`,
    });
  };

  const deleteInvestment = (id: string) => {
    const investmentName = investments.find(inv => inv.id === id)?.name;
    
    setInvestments(prev => prev.filter(inv => inv.id !== id));
    
    toast({
      title: "Investment Deleted",
      description: `Removed ${investmentName || 'investment'} from your portfolio`,
    });
  };

  const getInvestment = (id: string) => {
    return investments.find(inv => inv.id === id);
  };

  return (
    <InvestmentContext.Provider value={{ 
      investments, 
      addInvestment, 
      updateInvestment, 
      deleteInvestment,
      getInvestment
    }}>
      {children}
    </InvestmentContext.Provider>
  );
};
