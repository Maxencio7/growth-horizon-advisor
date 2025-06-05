
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, DollarSign, Info } from 'lucide-react';

interface Broker {
  id: number;
  name: string;
  description: string;
  rating: number;
  minInvestment: number;
  fees: string;
  features: string[];
  category: string;
  logo: string;
  website: string;
}

interface BrokerCardProps {
  broker: Broker;
}

const BrokerCard: React.FC<BrokerCardProps> = ({ broker }) => {
  const handleVisitBroker = () => {
    console.log(`Visiting broker: ${broker.name}`);
    // In a real app, this would open the broker's website
  };

  return (
    <Card className="glass-panel hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{broker.logo}</div>
            <div>
              <CardTitle className="text-lg">{broker.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{broker.rating}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {broker.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2">
          {broker.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <div>
              <p className="font-medium">Min. Investment</p>
              <p className="text-muted-foreground">
                ${broker.minInvestment === 0 ? 'No minimum' : broker.minInvestment}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <div>
              <p className="font-medium">Fees</p>
              <p className="text-muted-foreground">{broker.fees}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-medium text-sm mb-2">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {broker.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleVisitBroker}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Broker
          </Button>
          <Button size="sm" className="flex-1">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerCard;
