
export type RiskLevel = 'Low' | 'Medium' | 'High';

export type InvestmentType = 'Stocks' | 'Bonds' | 'Crypto' | 'Mutual Funds' | 'Real Estate' | 'SME' | 'Other';

export interface Investment {
  id: string;
  name: string;
  monthlyAmount: number;
  interestRate: number;
  monthlyInterestrate?: number;
  duration: number;
  startDate: Date;
  riskLevel: RiskLevel;
  type: InvestmentType;
}
