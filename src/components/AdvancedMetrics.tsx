
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvestmentWithProjections } from '@/types/investment';
import { formatCurrency, formatPercentage } from '@/utils/investmentCalculator';
import { useCurrency } from '@/contexts/CurrencyContext';
import { TrendingUp, Calculator, Target, BarChart3 } from 'lucide-react';

interface AdvancedMetricsProps {
  investments: InvestmentWithProjections[];
}

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ investments }) => {
  const { currency } = useCurrency();

  if (investments.length === 0) {
    return null;
  }

  // Calculate advanced metrics
  const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvested, 0);
  const totalFinalValue = investments.reduce((sum, inv) => {
    const lastPoint = inv.projections[inv.projections.length - 1];
    return sum + lastPoint.value;
  }, 0);

  // Calculate portfolio metrics
  const portfolioCAGR = investments.reduce((sum, inv) => {
    const years = inv.duration / 12;
    const cagr = Math.pow(inv.projectedValue / inv.totalInvested, 1 / years) - 1;
    return sum + (cagr * (inv.totalInvested / totalInvested));
  }, 0);

  const sharpeRatio = calculateSharpeRatio(investments);
  const diversificationScore = calculateDiversificationScore(investments);
  const riskAdjustedReturn = portfolioCAGR / (getRiskScore(investments) / 100);

  function calculateSharpeRatio(investments: InvestmentWithProjections[]): number {
    const riskFreeRate = 0.03; // Assume 3% risk-free rate
    const portfolioReturn = portfolioCAGR;
    const portfolioVolatility = calculatePortfolioVolatility(investments);
    return (portfolioReturn - riskFreeRate) / portfolioVolatility;
  }

  function calculatePortfolioVolatility(investments: InvestmentWithProjections[]): number {
    // Simplified volatility calculation based on risk levels
    const weightedVolatility = investments.reduce((sum, inv) => {
      const weight = inv.totalInvested / totalInvested;
      const volatility = inv.riskLevel === 'Low' ? 0.05 : inv.riskLevel === 'Medium' ? 0.15 : 0.25;
      return sum + (weight * volatility);
    }, 0);
    return weightedVolatility;
  }

  function calculateDiversificationScore(investments: InvestmentWithProjections[]): number {
    const typeCount = new Set(investments.map(inv => inv.type)).size;
    const riskCount = new Set(investments.map(inv => inv.riskLevel)).size;
    const maxTypes = 6; // Maximum investment types available
    const maxRisks = 3; // Low, Medium, High
    return ((typeCount / maxTypes) + (riskCount / maxRisks)) * 50;
  }

  function getRiskScore(investments: InvestmentWithProjections[]): number {
    return investments.reduce((sum, inv) => {
      const weight = inv.totalInvested / totalInvested;
      const riskScore = inv.riskLevel === 'Low' ? 25 : inv.riskLevel === 'Medium' ? 50 : 75;
      return sum + (weight * riskScore);
    }, 0);
  }

  const formatCurrencyWithSelectedCurrency = (value: number) => {
    return formatCurrency(value, currency);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-500" />
          Advanced Portfolio Analytics
        </CardTitle>
        <CardDescription>
          Professional-grade metrics for serious investors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-800">Portfolio CAGR</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{formatPercentage(portfolioCAGR * 100)}</p>
            <p className="text-xs text-blue-600 mt-1">Compound Annual Growth Rate</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-green-600" />
              <p className="text-sm font-medium text-green-800">Sharpe Ratio</p>
            </div>
            <p className="text-2xl font-bold text-green-900">{sharpeRatio.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">Risk-adjusted return</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-purple-600" />
              <p className="text-sm font-medium text-purple-800">Diversification</p>
            </div>
            <p className="text-2xl font-bold text-purple-900">{diversificationScore.toFixed(0)}%</p>
            <p className="text-xs text-purple-600 mt-1">Portfolio spread score</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-orange-600" />
              <p className="text-sm font-medium text-orange-800">Risk Score</p>
            </div>
            <p className="text-2xl font-bold text-orange-900">{getRiskScore(investments).toFixed(0)}/100</p>
            <p className="text-xs text-orange-600 mt-1">Portfolio risk level</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Portfolio Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Risk-Adjusted Return:</p>
                <p className="font-semibold">{formatPercentage(riskAdjustedReturn * 100)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estimated Annual Volatility:</p>
                <p className="font-semibold">{formatPercentage(calculatePortfolioVolatility(investments) * 100)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Investment Horizon:</p>
                <p className="font-semibold">{Math.round(investments.reduce((sum, inv) => sum + inv.duration, 0) / investments.length / 12)} years (avg)</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Capital at Risk:</p>
                <p className="font-semibold">{formatCurrencyWithSelectedCurrency(totalInvested)}</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h5 className="font-medium mb-2">Professional Insights</h5>
            <ul className="text-sm space-y-1 text-muted-foreground">
              {sharpeRatio > 1 && <li>• Excellent risk-adjusted returns (Sharpe {'>'} 1.0)</li>}
              {diversificationScore > 70 && <li>• Well-diversified portfolio structure</li>}
              {getRiskScore(investments) < 40 && <li>• Conservative risk profile suitable for capital preservation</li>}
              {getRiskScore(investments) > 60 && <li>• Aggressive strategy targeting high growth potential</li>}
              {portfolioCAGR > 0.08 && <li>• Above-average expected returns for long-term wealth building</li>}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedMetrics;
