
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

export interface InvestmentProjection {
  month: number;
  value: number;
  interest: number;
  principal: number;
}

export interface InvestmentWithProjections extends Investment {
  projectedValue: number;
  totalInvested: number;
  totalReturn: number;
  roi: number;
  projections: InvestmentProjection[];
}
