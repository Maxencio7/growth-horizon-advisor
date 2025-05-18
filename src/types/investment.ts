
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type InvestmentType = 'Stocks' | 'Bonds' | 'Crypto' | 'Mutual Funds' | 'Real Estate' | 'Other';

export interface Investment {
  id: string;
  name: string;
  monthlyAmount: number;
  interestRate: number;
  duration: number; // in months
  startDate: Date;
  riskLevel: RiskLevel;
  type: InvestmentType;
}

export interface InvestmentGrowthPoint {
  month: number;
  value: number;
  interest: number;
  principal: number;
}

export interface InvestmentWithProjections extends Investment {
  projections: InvestmentGrowthPoint[];
  totalInvestment: number;
  totalReturn: number;
  roi: number;
}
