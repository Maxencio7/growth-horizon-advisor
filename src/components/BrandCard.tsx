
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Info, Plus } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  description: string;
  type: string;
  category: string;
  logo: string;
  expenseRatio?: string;
  sector?: string;
  volatility?: string;
  marketCap?: string;
  dividendYield?: string;
  diversification?: string;
  popularFunds?: string[];
}

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const handleAddToWatchlist = () => {
    console.log(`Adding ${brand.name} to watchlist`);
    // In a real app, this would add to user's watchlist
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'etf': return 'bg-blue-100 text-blue-800';
      case 'stock': return 'bg-green-100 text-green-800';
      case 'crypto': return 'bg-orange-100 text-orange-800';
      case 'reit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="glass-panel hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{brand.logo}</div>
            <div>
              <CardTitle className="text-lg">{brand.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={getCategoryColor(brand.category)}>
                  {brand.type}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2">
          {brand.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          {brand.expenseRatio && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expense Ratio:</span>
              <span className="font-medium">{brand.expenseRatio}</span>
            </div>
          )}
          {brand.sector && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sector:</span>
              <span className="font-medium">{brand.sector}</span>
            </div>
          )}
          {brand.volatility && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volatility:</span>
              <span className="font-medium">{brand.volatility}</span>
            </div>
          )}
          {brand.marketCap && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Cap:</span>
              <span className="font-medium">{brand.marketCap}</span>
            </div>
          )}
          {brand.dividendYield && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dividend Yield:</span>
              <span className="font-medium">{brand.dividendYield}</span>
            </div>
          )}
          {brand.diversification && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diversification:</span>
              <span className="font-medium">{brand.diversification}</span>
            </div>
          )}
        </div>

        {brand.popularFunds && (
          <div>
            <p className="font-medium text-sm mb-2">Popular Funds:</p>
            <div className="flex flex-wrap gap-1">
              {brand.popularFunds.map((fund, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {fund}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleAddToWatchlist}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Watchlist
          </Button>
          <Button size="sm" className="flex-1">
            <Info className="h-4 w-4 mr-2" />
            Research
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
