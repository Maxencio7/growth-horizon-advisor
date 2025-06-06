
import React from 'react';
import { useCountry } from '@/contexts/CountryContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Building2 } from 'lucide-react';

const CountrySelector: React.FC = () => {
  const { selectedCountry, countries, setSelectedCountry } = useCountry();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Select Your Country</h3>
      </div>
      
      <Select 
        value={selectedCountry?.code || ''} 
        onValueChange={(value) => {
          const country = countries.find(c => c.code === value);
          if (country) setSelectedCountry(country);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose your country to get personalized investment options" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{country.flag}</span>
                <span>{country.name}</span>
                <Badge variant="outline" className="text-xs">
                  {country.currency}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedCountry && (
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
            </CardTitle>
            <CardDescription>
              Investment landscape and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Stock Exchange:</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedCountry.stockExchange}</p>
                
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Economic Growth:</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedCountry.economicGrowth}% annually</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-sm">Major Brokers:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCountry.majorBrokers.slice(0, 3).map((broker, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {broker}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-sm">Popular Investments:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCountry.popularInvestments.slice(0, 2).map((investment, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {investment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CountrySelector;
