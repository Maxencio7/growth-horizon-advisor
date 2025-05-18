
import { Investment, InvestmentGrowthPoint, InvestmentWithProjections } from "@/types/investment";

/**
 * Calculate compound interest for an investment over time
 */
export const calculateInvestmentGrowth = (investment: Investment): InvestmentWithProjections => {
  const { monthlyAmount, interestRate, duration } = investment;
  const monthlyRate = interestRate / 100 / 12;
  
  let totalValue = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;
  const projections: InvestmentGrowthPoint[] = [];

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

  const totalInvestment = monthlyAmount * duration;
  const totalReturn = totalValue - totalInvestment;
  const roi = (totalReturn / totalInvestment) * 100;

  return {
    ...investment,
    projections,
    totalInvestment,
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
