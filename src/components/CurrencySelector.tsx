
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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.value} value={curr.value}>
              <div className="flex items-center">
                {curr.icon}
                <span className="ml-2">{curr.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
