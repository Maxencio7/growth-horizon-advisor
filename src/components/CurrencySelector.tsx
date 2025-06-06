
import React from 'react';
import { CurrencyCode, useCurrency } from '@/contexts/CurrencyContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, Euro, PoundSterling, JapaneseYen, IndianRupee, 
  SwissFranc, RussianRuble, PhilippinePeso 
} from 'lucide-react';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  const currencies: { value: CurrencyCode; label: string; icon: React.ReactNode }[] = [
    { value: 'USD', label: 'US Dollar', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'EUR', label: 'Euro', icon: <Euro className="h-4 w-4" /> },
    { value: 'GBP', label: 'British Pound', icon: <PoundSterling className="h-4 w-4" /> },
    { value: 'JPY', label: 'Japanese Yen', icon: <JapaneseYen className="h-4 w-4" /> },
    { value: 'INR', label: 'Indian Rupee', icon: <IndianRupee className="h-4 w-4" /> },
    { value: 'CHF', label: 'Swiss Franc', icon: <SwissFranc className="h-4 w-4" /> },
    { value: 'RUB', label: 'Russian Ruble', icon: <RussianRuble className="h-4 w-4" /> },
    // African Currencies
    { value: 'ZMW', label: 'Zambian Kwacha', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'ZAR', label: 'South African Rand', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'NGN', label: 'Nigerian Naira', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'KES', label: 'Kenyan Shilling', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'EGP', label: 'Egyptian Pound', icon: <PoundSterling className="h-4 w-4" /> },
    { value: 'GHS', label: 'Ghanaian Cedi', icon: <DollarSign className="h-4 w-4" /> },
    { value: 'MAD', label: 'Moroccan Dirham', icon: <DollarSign className="h-4 w-4" /> },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Select value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
        <SelectTrigger className="w-[180px] border-primary/30 bg-black/20 backdrop-blur-sm text-foreground">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent className="bg-gradient-premium border border-primary/30 text-foreground">
          {currencies.map((curr) => (
            <SelectItem 
              key={curr.value} 
              value={curr.value}
              className="hover:bg-primary/10 focus:bg-primary/20 focus:text-primary"
            >
              <div className="flex items-center">
                <span className="mr-2 text-primary">{curr.icon}</span>
                <span>{curr.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
