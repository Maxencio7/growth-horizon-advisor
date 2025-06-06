
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  currency: string;
  stockExchange: string;
  majorBrokers: string[];
  averageInflation: number;
  economicGrowth: number;
  investmentIncentives: string[];
  taxRate: number;
  regulatoryBody: string;
  popularInvestments: string[];
  minWage: number;
  bankingOptions: string[];
}

const southernAfricanCountries: CountryData[] = [
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    stockExchange: 'Johannesburg Stock Exchange (JSE)',
    majorBrokers: ['EasyEquities', 'Standard Bank Securities', 'Absa Stockbrokers', 'Nedbank Private Wealth'],
    averageInflation: 5.2,
    economicGrowth: 1.9,
    investmentIncentives: ['Tax-Free Savings Account (TFSA)', 'Retirement Annuity (RA)', 'Section 12J Tax Incentives'],
    taxRate: 18,
    regulatoryBody: 'Financial Sector Conduct Authority (FSCA)',
    popularInvestments: ['JSE Top 40', 'Property', 'Unit Trusts', 'Exchange Traded Funds'],
    minWage: 3500,
    bankingOptions: ['Standard Bank', 'ABSA', 'FNB', 'Nedbank', 'Capitec']
  },
  {
    code: 'BW',
    name: 'Botswana',
    flag: '🇧🇼',
    currency: 'BWP',
    stockExchange: 'Botswana Stock Exchange (BSE)',
    majorBrokers: ['Motswedi Securities', 'Stockbrokers Botswana', 'African Alliance Securities'],
    averageInflation: 3.1,
    economicGrowth: 4.5,
    investmentIncentives: ['Citizen Entrepreneurial Development Agency (CEDA)', 'Local Procurement Programme'],
    taxRate: 22,
    regulatoryBody: 'Non-Bank Financial Institutions Regulatory Authority (NBFIRA)',
    popularInvestments: ['BSE Domestic Index', 'Government Bonds', 'Mining Stocks'],
    minWage: 1500,
    bankingOptions: ['First National Bank Botswana', 'Standard Chartered', 'Barclays Bank Botswana']
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
    flag: '🇿🇼',
    currency: 'USD',
    stockExchange: 'Zimbabwe Stock Exchange (ZSE)',
    majorBrokers: ['IH Securities', 'Morgan & Co', 'Datvest Securities'],
    averageInflation: 60.7,
    economicGrowth: 3.8,
    investmentIncentives: ['Special Economic Zones', 'Investment and Development Bank of Zimbabwe'],
    taxRate: 25,
    regulatoryBody: 'Securities and Exchange Commission of Zimbabwe (SECZ)',
    popularInvestments: ['Industrial Index', 'Mining Index', 'USD denominated assets'],
    minWage: 175,
    bankingOptions: ['CBZ Bank', 'Steward Bank', 'Ecobank Zimbabwe']
  },
  {
    code: 'ZM',
    name: 'Zambia',
    flag: '🇿🇲',
    currency: 'ZMW',
    stockExchange: 'Lusaka Securities Exchange (LuSE)',
    majorBrokers: ['Kwacha Capital', 'Pangaea Securities', 'SBZ Securities'],
    averageInflation: 9.8,
    economicGrowth: 2.9,
    investmentIncentives: ['Zambia Development Agency (ZDA)', 'Multi-Facility Economic Zones'],
    taxRate: 30,
    regulatoryBody: 'Securities and Exchange Commission (SEC)',
    popularInvestments: ['LuSE All Share Index', 'Mining Stocks', 'Agricultural Bonds'],
    minWage: 1200,
    bankingOptions: ['Zanaco', 'Standard Chartered Zambia', 'First National Bank Zambia']
  },
  {
    code: 'MW',
    name: 'Malawi',
    flag: '🇲🇼',
    currency: 'MWK',
    stockExchange: 'Malawi Stock Exchange (MSE)',
    majorBrokers: ['NICO Securities', 'Stockbrokers Malawi', 'CDH Investment Bank'],
    averageInflation: 8.6,
    economicGrowth: 2.2,
    investmentIncentives: ['Malawi Investment and Trade Centre (MITC)', 'Export Processing Zones'],
    taxRate: 30,
    regulatoryBody: 'Reserve Bank of Malawi',
    popularInvestments: ['MSE All Share Index', 'Treasury Bills', 'Agricultural Investments'],
    minWage: 350,
    bankingOptions: ['National Bank of Malawi', 'Standard Bank Malawi', 'FDH Bank']
  },
  {
    code: 'NA',
    name: 'Namibia',
    flag: '🇳🇦',
    currency: 'NAD',
    stockExchange: 'Namibian Stock Exchange (NSX)',
    majorBrokers: ['IJG Securities', 'Simonis Storm Securities', 'PSG Wealth Management'],
    averageInflation: 4.2,
    economicGrowth: 1.7,
    investmentIncentives: ['Export Processing Zone Programme', 'Manufacturing Association of Namibia'],
    taxRate: 32,
    regulatoryBody: 'Namibia Financial Institutions Supervisory Authority (NAMFISA)',
    popularInvestments: ['NSX Overall Index', 'Mining Stocks', 'Unit Trusts'],
    minWage: 1800,
    bankingOptions: ['First National Bank Namibia', 'Standard Bank Namibia', 'Bank Windhoek']
  }
];

interface CountryContextType {
  selectedCountry: CountryData | null;
  countries: CountryData[];
  setSelectedCountry: (country: CountryData) => void;
  getCountryByCode: (code: string) => CountryData | undefined;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

interface CountryProviderProps {
  children: ReactNode;
}

export const CountryProvider = ({ children }: CountryProviderProps) => {
  const [selectedCountry, setSelectedCountryState] = useState<CountryData | null>(null);

  const setSelectedCountry = (country: CountryData) => {
    setSelectedCountryState(country);
    localStorage.setItem('selectedCountry', JSON.stringify(country));
  };

  const getCountryByCode = (code: string) => {
    return southernAfricanCountries.find(country => country.code === code);
  };

  // Load selected country from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedCountry');
    if (saved) {
      try {
        const parsedCountry = JSON.parse(saved);
        setSelectedCountryState(parsedCountry);
      } catch (error) {
        console.error('Error parsing saved country:', error);
      }
    }
  }, []);

  return (
    <CountryContext.Provider value={{
      selectedCountry,
      countries: southernAfricanCountries,
      setSelectedCountry,
      getCountryByCode,
    }}>
      {children}
    </CountryContext.Provider>
  );
};
