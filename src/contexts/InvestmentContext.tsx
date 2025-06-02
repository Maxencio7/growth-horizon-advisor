
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
  const { user, isGuest } = useAuth();

  useEffect(() => {
    if (user && !isGuest) {
      fetchInvestments();
    } else if (isGuest) {
      // Load guest investments from localStorage
      const guestInvestments = localStorage.getItem('guest_investments');
      if (guestInvestments) {
        const parsed = JSON.parse(guestInvestments);
        const formattedInvestments = parsed.map((inv: any) => ({
          ...inv,
          startDate: new Date(inv.startDate)
        }));
        setInvestments(formattedInvestments);
      }
      setLoading(false);
    } else {
      setInvestments([]);
      setLoading(false);
    }
  }, [user, isGuest]);

  const fetchInvestments = async () => {
    if (!user || isGuest) return;

    try {
      // Try to fetch from database, fallback to localStorage if table doesn't exist
      try {
        const { data, error } = await (supabase as any)
          .from('investments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        const formattedInvestments = data.map((inv: any) => ({
          ...inv,
          startDate: new Date(inv.start_date),
          interestRate: inv.annual_interest_rate,
          monthlyInterestrate: inv.monthly_interest_rate,
        }));
        setInvestments(formattedInvestments);
      } catch (dbError) {
        console.log('Database table not available, using localStorage fallback');
        // Fallback to localStorage for development
        const localInvestments = localStorage.getItem(`investments_${user.id}`);
        if (localInvestments) {
          const parsed = JSON.parse(localInvestments);
          const formattedInvestments = parsed.map((inv: any) => ({
            ...inv,
            startDate: new Date(inv.startDate)
          }));
          setInvestments(formattedInvestments);
        }
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id'>) => {
    const newInvestment: Investment = {
      ...investment,
      id: uuidv4(),
    };

    if (isGuest) {
      // Store in localStorage for guest users
      const updatedInvestments = [...investments, newInvestment];
      setInvestments(updatedInvestments);
      localStorage.setItem('guest_investments', JSON.stringify(updatedInvestments));
      return;
    }

    if (!user) return;

    try {
      // Try to store in database, fallback to localStorage
      try {
        const { error } = await (supabase as any)
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
          throw error;
        }

        setInvestments(prev => [newInvestment, ...prev]);
      } catch (dbError) {
        console.log('Database not available, using localStorage');
        // Fallback to localStorage
        const updatedInvestments = [...investments, newInvestment];
        setInvestments(updatedInvestments);
        localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
      }
    } catch (error) {
      console.error('Error adding investment:', error);
    }
  };

  const updateInvestment = async (investment: Investment) => {
    if (isGuest) {
      // Update in localStorage for guest users
      const updatedInvestments = investments.map(inv => 
        inv.id === investment.id ? investment : inv
      );
      setInvestments(updatedInvestments);
      localStorage.setItem('guest_investments', JSON.stringify(updatedInvestments));
      return;
    }

    if (!user) return;

    try {
      // Try to update in database, fallback to localStorage
      try {
        const { error } = await (supabase as any)
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
          throw error;
        }

        setInvestments(prev => 
          prev.map(inv => inv.id === investment.id ? investment : inv)
        );
      } catch (dbError) {
        console.log('Database not available, using localStorage');
        // Fallback to localStorage
        const updatedInvestments = investments.map(inv => 
          inv.id === investment.id ? investment : inv
        );
        setInvestments(updatedInvestments);
        localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
      }
    } catch (error) {
      console.error('Error updating investment:', error);
    }
  };

  const deleteInvestment = async (id: string) => {
    if (isGuest) {
      // Remove from localStorage for guest users
      const updatedInvestments = investments.filter(inv => inv.id !== id);
      setInvestments(updatedInvestments);
      localStorage.setItem('guest_investments', JSON.stringify(updatedInvestments));
      return;
    }

    if (!user) return;

    try {
      // Try to delete from database, fallback to localStorage
      try {
        const { error } = await (supabase as any)
          .from('investments')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }

        setInvestments(prev => prev.filter(inv => inv.id !== id));
      } catch (dbError) {
        console.log('Database not available, using localStorage');
        // Fallback to localStorage
        const updatedInvestments = investments.filter(inv => inv.id !== id);
        setInvestments(updatedInvestments);
        localStorage.setItem(`investments_${user.id}`, JSON.stringify(updatedInvestments));
      }
    } catch (error) {
      console.error('Error deleting investment:', error);
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
