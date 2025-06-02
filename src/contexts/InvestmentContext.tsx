
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Investment } from '@/types/investment';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

interface InvestmentContextType {
  investments: Investment[];
  addInvestment: (investment: Omit<Investment, 'id'>) => Promise<void>;
  updateInvestment: (investment: Investment) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
  getInvestment: (id: string) => Investment | undefined;
  loading: boolean;
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

export const InvestmentProvider: React.FC<InvestmentProviderProps> = ({ children }) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchInvestments();
    } else {
      setInvestments([]);
      setLoading(false);
    }
  }, [user]);

  const fetchInvestments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investments:', error);
        // Fallback to localStorage for development
        const localInvestments = localStorage.getItem(`investments_${user.id}`);
        if (localInvestments) {
          setInvestments(JSON.parse(localInvestments));
        }
      } else {
        const formattedInvestments = data.map(inv => ({
          ...inv,
          startDate: new Date(inv.start_date),
          interestRate: inv.annual_interest_rate,
          monthlyInterestrate: inv.monthly_interest_rate,
        }));
        setInvestments(formattedInvestments);
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
      // Fallback to localStorage
      const localInvestments = localStorage.getItem(`investments_${user.id}`);
      if (localInvestments) {
        setInvestments(JSON.parse(localInvestments));
      }
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id'>) => {
    if (!user) return;

    const newInvestment: Investment = {
      ...investment,
      id: uuidv4(),
    };

    try {
      const { error } = await supabase
        .from('investments')
        .insert({
          id: newInvestment.id,
          user_id: user.id,
          name: investment.name,
          monthly_amount: investment.monthlyAmount,
          annual_interest_rate: investment.interestRate,
          monthly_interest_rate: investment.monthlyInterestrate,
          duration: investment.duration,
          start_date: investment.startDate.toISOString().split('T')[0],
          risk_level: investment.riskLevel,
          type: investment.type,
        });

      if (error) {
        console.error('Error adding investment:', error);
        // Fallback to localStorage
        const updatedInvestments = [...investments, newInvestment];
        setInvestments(updatedInvestments);
        localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
      } else {
        setInvestments(prev => [newInvestment, ...prev]);
      }
    } catch (error) {
      console.error('Error adding investment:', error);
      // Fallback to localStorage
      const updatedInvestments = [...investments, newInvestment];
      setInvestments(updatedInvestments);
      localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
    }
  };

  const updateInvestment = async (investment: Investment) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('investments')
        .update({
          name: investment.name,
          monthly_amount: investment.monthlyAmount,
          annual_interest_rate: investment.interestRate,
          monthly_interest_rate: investment.monthlyInterestrate,
          duration: investment.duration,
          start_date: investment.startDate.toISOString().split('T')[0],
          risk_level: investment.riskLevel,
          type: investment.type,
        })
        .eq('id', investment.id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating investment:', error);
        // Fallback to localStorage
        const updatedInvestments = investments.map(inv => 
          inv.id === investment.id ? investment : inv
        );
        setInvestments(updatedInvestments);
        localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
      } else {
        setInvestments(prev => 
          prev.map(inv => inv.id === investment.id ? investment : inv)
        );
      }
    } catch (error) {
      console.error('Error updating investment:', error);
      // Fallback to localStorage
      const updatedInvestments = investments.map(inv => 
        inv.id === investment.id ? investment : inv
      );
      setInvestments(updatedInvestments);
      localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
    }
  };

  const deleteInvestment = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting investment:', error);
        // Fallback to localStorage
        const updatedInvestments = investments.filter(inv => inv.id !== id);
        setInvestments(updatedInvestments);
        localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
      } else {
        setInvestments(prev => prev.filter(inv => inv.id !== id));
      }
    } catch (error) {
      console.error('Error deleting investment:', error);
      // Fallback to localStorage
      const updatedInvestments = investments.filter(inv => inv.id !== id);
      setInvestments(updatedInvestments);
      localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
    }
  };

  const getInvestment = (id: string): Investment | undefined => {
    return investments.find(inv => inv.id === id);
  };

  return (
    <InvestmentContext.Provider value={{
      investments,
      addInvestment,
      updateInvestment,
      deleteInvestment,
      getInvestment,
      loading,
    }}>
      {children}
    </InvestmentContext.Provider>
  );
};
