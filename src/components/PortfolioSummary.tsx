import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Investment, InvestmentWithProjections } from '@/types/investment';
import { formatCurrency, formatPercentage } from '@/utils/investmentCalculator';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCurrency } from '@/contexts/CurrencyContext';

interface PortfolioSummaryProps {
  investments: InvestmentWithProjections[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ investments }) => {
  const { currency } = useCurrency();
  
  if (investments.length === 0) {
    return null;
  }

  // Calculate portfolio metrics
  const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvestment, 0);
  const totalFinalValue = investments.reduce((sum, inv) => {
    const lastPoint = inv.projections[inv.projections.length - 1];
    return sum + lastPoint.value;
  }, 0);
  const totalReturns = totalFinalValue - totalInvested;
  const portfolioROI = (totalReturns / totalInvested) * 100;

  // Prepare data for the type distribution chart
  const typeDistribution = investments.reduce<Record<string, number>>((acc, inv) => {
    const lastPoint = inv.projections[inv.projections.length - 1];
    acc[inv.type] = (acc[inv.type] || 0) + lastPoint.value;
    return acc;
  }, {});

  const typeChartData = Object.entries(typeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Prepare data for the risk distribution chart
  const riskDistribution = investments.reduce<Record<string, number>>((acc, inv) => {
    const lastPoint = inv.projections[inv.projections.length - 1];
    acc[inv.riskLevel] = (acc[inv.riskLevel] || 0) + lastPoint.value;
    return acc;
  }, {});

  const riskChartData = Object.entries(riskDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for the charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

  // Calculate the highest and lowest ROI investments
  const sortedByROI = [...investments].sort((a, b) => b.roi - a.roi);
  const highestROI = sortedByROI[0];
  const lowestROI = sortedByROI[sortedByROI.length - 1];

  const formatCurrencyWithSelectedCurrency = (value: number) => {
    return formatCurrency(value, currency);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>Overview of your investment portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Total Invested</p>
              <p className="text-2xl font-bold">{formatCurrencyWithSelectedCurrency(totalInvested)}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Projected Value</p>
              <p className="text-2xl font-bold">{formatCurrencyWithSelectedCurrency(totalFinalValue)}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Total Returns</p>
              <p className="text-2xl font-bold">{formatCurrencyWithSelectedCurrency(totalReturns)}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Portfolio ROI</p>
              <p className="text-2xl font-bold">{formatPercentage(portfolioROI)}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-2">Investment Type Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {typeChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [formatCurrencyWithSelectedCurrency(Number(value)), 'Value']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Risk Level Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {riskChartData.map((entry, index) => {
                        // Use specific colors for risk levels
                        let color = '#00C49F'; // Default green for Low
                        if (entry.name === 'Medium') color = '#FFBB28'; // Yellow
                        if (entry.name === 'High') color = '#FF8042'; // Orange/Red
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [formatCurrencyWithSelectedCurrency(Number(value)), 'Value']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {investments.length > 1 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium text-finance-accent mb-2">Highest Performing Investment</h3>
                <p className="text-lg font-semibold">{highestROI.name}</p>
                <p className="text-sm text-muted-foreground">ROI: {formatPercentage(highestROI.roi)}</p>
                <p className="text-sm text-muted-foreground">Type: {highestROI.type}</p>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium text-finance-danger mb-2">Lowest Performing Investment</h3>
                <p className="text-lg font-semibold">{lowestROI.name}</p>
                <p className="text-sm text-muted-foreground">ROI: {formatPercentage(lowestROI.roi)}</p>
                <p className="text-sm text-muted-foreground">Type: {lowestROI.type}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioSummary;
