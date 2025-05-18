
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'CHF' | 'RUB';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencySymbol: string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

const getCurrencySymbol = (code: CurrencyCode): string => {
  switch (code) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    case 'INR': return '₹';
    case 'CHF': return 'Fr';
    case 'RUB': return '₽';
    default: return '$';
  }
};

export const CurrencyProvider = ({ children }: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading delay
    setIsLoading(true);
    
    try {
      const savedCurrency = localStorage.getItem('preferredCurrency');
      if (savedCurrency) {
        setCurrency(savedCurrency as CurrencyCode);
        setCurrencySymbol(getCurrencySymbol(savedCurrency as CurrencyCode));
      }
    } catch (error) {
      console.error('Failed to load currency preference:', error);
    }
    
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('preferredCurrency', currency);
      setCurrencySymbol(getCurrencySymbol(currency));
    } catch (error) {
      console.error('Failed to save currency preference:', error);
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      currencySymbol,
      isLoading 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
