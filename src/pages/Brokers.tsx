
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import BrokerCard from '@/components/BrokerCard';
import BrandCard from '@/components/BrandCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building2, Search, Star, TrendingUp, Filter } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Brokers: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const brokers = [
    {
      id: 1,
      name: 'Fidelity',
      description: 'One of the largest investment firms with zero-fee stock trades and excellent research tools.',
      rating: 4.8,
      minInvestment: 0,
      fees: 'No commission on stocks/ETFs',
      features: ['Commission-free trading', 'Excellent research', 'Retirement planning', 'Robo-advisor'],
      category: 'traditional',
      logo: '🏦',
      website: 'https://fidelity.com'
    },
    {
      id: 2,
      name: 'Robinhood',
      description: 'Popular mobile-first platform perfect for beginners with simple interface and zero commissions.',
      rating: 4.2,
      minInvestment: 0,
      fees: 'Commission-free',
      features: ['Mobile-first', 'Fractional shares', 'Crypto trading', 'Simple interface'],
      category: 'mobile',
      logo: '📱',
      website: 'https://robinhood.com'
    },
    {
      id: 3,
      name: 'Charles Schwab',
      description: 'Full-service brokerage with comprehensive tools and excellent customer service.',
      rating: 4.7,
      minInvestment: 0,
      fees: 'No commission on stocks/ETFs',
      features: ['Full service', 'Research tools', 'Banking services', 'Global trading'],
      category: 'traditional',
      logo: '🏛️',
      website: 'https://schwab.com'
    },
    {
      id: 4,
      name: 'Betterment',
      description: 'Robo-advisor that automatically manages your portfolio with low fees.',
      rating: 4.5,
      minInvestment: 0,
      fees: '0.25% annual fee',
      features: ['Robo-advisor', 'Auto-rebalancing', 'Tax optimization', 'Goal-based investing'],
      category: 'robo',
      logo: '🤖',
      website: 'https://betterment.com'
    }
  ];

  const brands = [
    {
      id: 1,
      name: 'Vanguard ETFs',
      description: 'Low-cost index funds and ETFs perfect for long-term investing.',
      type: 'ETF Provider',
      expenseRatio: '0.03% - 0.20%',
      category: 'etf',
      logo: '📈',
      popularFunds: ['VTI', 'VOO', 'VXUS', 'BND']
    },
    {
      id: 2,
      name: 'Apple (AAPL)',
      description: 'Technology giant known for innovation in consumer electronics.',
      type: 'Individual Stock',
      sector: 'Technology',
      category: 'stock',
      logo: '🍎',
      marketCap: '$3.0T'
    },
    {
      id: 3,
      name: 'Bitcoin',
      description: 'The original cryptocurrency and digital store of value.',
      type: 'Cryptocurrency',
      volatility: 'High',
      category: 'crypto',
      logo: '₿',
      marketCap: '$800B+'
    },
    {
      id: 4,
      name: 'REIT Index',
      description: 'Real Estate Investment Trusts for property market exposure.',
      type: 'Real Estate',
      dividendYield: '3-5%',
      category: 'reit',
      logo: '🏢',
      diversification: 'High'
    }
  ];

  const filteredBrokers = brokers.filter(broker =>
    broker.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || broker.category === selectedCategory)
  );

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || brand.category === selectedCategory)
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Investment Brokers & Brands</h1>
          </div>
          <p className="text-muted-foreground">
            Discover trusted platforms and popular investment options to start your journey
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="glass-panel">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search brokers or investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'traditional' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('traditional')}
                >
                  Traditional
                </Button>
                <Button
                  variant={selectedCategory === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('mobile')}
                >
                  Mobile
                </Button>
                <Button
                  variant={selectedCategory === 'robo' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('robo')}
                >
                  Robo-Advisor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="brokers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="brokers" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Investment Brokers
            </TabsTrigger>
            <TabsTrigger value="brands" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Popular Investments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="brokers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBrokers.map((broker) => (
                <BrokerCard key={broker.id} broker={broker} />
              ))}
            </div>
            {filteredBrokers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No brokers found matching your search criteria.
              </div>
            )}
          </TabsContent>

          <TabsContent value="brands" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
            {filteredBrands.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No investments found matching your search criteria.
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Getting Started Section */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Getting Started Tips
            </CardTitle>
            <CardDescription>
              New to investing? Here's how to choose the right broker and investments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Choosing a Broker</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Look for zero commission on stocks and ETFs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Consider mobile apps if you prefer trading on-the-go</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Check for educational resources and research tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ensure they offer fractional shares for expensive stocks</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">First Investments</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Start with broad market ETFs (like VTI or VOO)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Consider target-date funds for retirement accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Diversify across different asset classes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Avoid individual stocks until you gain experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Brokers;
