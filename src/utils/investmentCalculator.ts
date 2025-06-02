
import { Investment, InvestmentProjection, InvestmentWithProjections } from "@/types/investment";

/**
 * Calculate compound interest for an investment over time
 */
export const calculateInvestmentGrowth = (investment: Investment): InvestmentWithProjections => {
  const { monthlyAmount, interestRate, duration } = investment;
  const monthlyRate = interestRate / 100 / 12;
  
  let totalValue = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;
  const projections: InvestmentProjection[] = [];

  for (let month = 1; month <= duration; month++) {
    // Add this month's investment
    totalPrincipal += monthlyAmount;
    
    // Calculate interest on the total value so far
    const interestEarned = totalValue * monthlyRate;
    totalInterest += interestEarned;
    
    // Add new investment and interest to total
    totalValue = totalValue + monthlyAmount + interestEarned;
    
    // Record this month's values
    projections.push({
      month,
      value: Number(totalValue.toFixed(2)),
      interest: Number(totalInterest.toFixed(2)),
      principal: Number(totalPrincipal.toFixed(2))
    });
  }

  const totalInvested = monthlyAmount * duration;
  const totalReturn = totalValue - totalInvested;
  const roi = (totalReturn / totalInvested) * 100;

  return {
    ...investment,
    projections,
    projectedValue: Number(totalValue.toFixed(2)),
    totalInvested,
    totalReturn,
    roi
  };
};

/**
 * Format currency for display based on currency code
 */
export const formatCurrency = (value: number, currencyCode: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};
