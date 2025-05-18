
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InvestmentWithProjections } from '@/types/investment';
import { formatCurrency, formatPercentage } from '@/utils/investmentCalculator';
import { useInvestments } from '@/contexts/InvestmentContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InvestmentCardProps {
  investment: InvestmentWithProjections;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  const navigate = useNavigate();
  const { deleteInvestment } = useInvestments();
  const { currency, currencySymbol } = useCurrency();
  const [openDialog, setOpenDialog] = React.useState(false);

  const lastDataPoint = investment.projections[investment.projections.length - 1];
  const formattedStartDate = new Date(investment.startDate).toLocaleDateString();
  
  const chartData = investment.projections.filter((_, index) => {
    // For longer durations, show fewer data points
    const interval = investment.duration > 120 ? 12 : 
                     investment.duration > 60 ? 6 : 
                     investment.duration > 24 ? 3 : 1;
    return index % interval === 0 || index === investment.projections.length - 1;
  });

  // Pick a color based on risk level
  const getColorByRisk = (risk: string) => {
    switch (risk) {
      case 'High': return 'rgba(239, 68, 68, 0.7)'; // Red
      case 'Medium': return 'rgba(14, 165, 233, 0.7)'; // Blue
      case 'Low': return 'rgba(16, 185, 129, 0.7)'; // Green
      default: return 'rgba(99, 102, 241, 0.7)'; // Indigo
    }
  };

  const areaColor = getColorByRisk(investment.riskLevel);

  const formatCurrencyWithSymbol = (value: number) => {
    return formatCurrency(value, currency);
  };

  const formatAxisCurrency = (value: number) => {
    return `${currencySymbol}${value / 1000}k`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{investment.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                tickFormatter={(value) => `${value}m`}
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                tickFormatter={formatAxisCurrency}
              />
              <Tooltip 
                formatter={(value) => [formatCurrencyWithSymbol(Number(value)), 'Value']}
                labelFormatter={(label) => `Month ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={areaColor} 
                fill={areaColor} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Monthly:</p>
            <p className="font-medium">{formatCurrencyWithSymbol(investment.monthlyAmount)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rate:</p>
            <p className="font-medium">{formatPercentage(investment.interestRate)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duration:</p>
            <p className="font-medium">{investment.duration} months</p>
          </div>
          <div>
            <p className="text-muted-foreground">Start Date:</p>
            <p className="font-medium">{formattedStartDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Risk:</p>
            <p className="font-medium">{investment.riskLevel}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Type:</p>
            <p className="font-medium">{investment.type}</p>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-muted-foreground text-sm">Total Investment:</p>
              <p className="font-semibold">{formatCurrencyWithSymbol(investment.totalInvestment)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Final Value:</p>
              <p className="font-semibold">{formatCurrencyWithSymbol(lastDataPoint.value)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Return:</p>
              <p className="font-semibold">{formatCurrencyWithSymbol(investment.totalReturn)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">ROI:</p>
              <p className="font-semibold">{formatPercentage(investment.roi)}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(`/edit-investment/${investment.id}`)}
        >
          Edit
        </Button>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Investment</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{investment.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  deleteInvestment(investment.id);
                  setOpenDialog(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default InvestmentCard;
