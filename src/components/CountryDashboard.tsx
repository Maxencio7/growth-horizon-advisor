
import React from 'react';
import { useCountry } from '@/contexts/CountryContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Building2, 
  Percent, 
  Shield, 
  Banknote, 
  Users,
  ExternalLink,
  Info
} from 'lucide-react';

const CountryDashboard: React.FC = () => {
  const { selectedCountry } = useCountry();

  if (!selectedCountry) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Select a country to view personalized investment information</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inflation Rate</p>
                <p className="text-2xl font-bold">{selectedCountry.averageInflation}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Economic Growth</p>
                <p className="text-2xl font-bold">{selectedCountry.economicGrowth}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tax Rate</p>
                <p className="text-2xl font-bold">{selectedCountry.taxRate}%</p>
              </div>
              <Percent className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Min. Wage</p>
                <p className="text-2xl font-bold">{selectedCountry.minWage.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{selectedCountry.currency}</p>
              </div>
              <Banknote className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Major Brokers
            </CardTitle>
            <CardDescription>
              Top investment brokers available in {selectedCountry.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedCountry.majorBrokers.map((broker, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{broker}</span>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Popular Investments
            </CardTitle>
            <CardDescription>
              Most popular investment options in {selectedCountry.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedCountry.popularInvestments.map((investment, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{investment}</span>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Investment Incentives
            </CardTitle>
            <CardDescription>
              Government programs and tax benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedCountry.investmentIncentives.map((incentive, index) => (
                <Badge key={index} variant="outline" className="w-full justify-start p-2 h-auto">
                  {incentive}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Banking Options
            </CardTitle>
            <CardDescription>
              Major banks for investment accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedCountry.bankingOptions.map((bank, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{bank}</span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Regulatory Information</CardTitle>
          <CardDescription>Financial regulation and oversight</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">{selectedCountry.regulatoryBody}</p>
              <p className="text-sm text-muted-foreground">
                Primary financial regulatory authority for {selectedCountry.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountryDashboard;
