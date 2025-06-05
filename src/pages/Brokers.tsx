
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
    // International Brokers
    {
      id: 1,
      name: 'Interactive Brokers',
      description: 'Global leader serving 200+ countries including most African nations with low fees.',
      rating: 4.9,
      minInvestment: 0,
      fees: 'From $0.005/share',
      features: ['Global markets', 'Multi-currency', 'Low fees', 'Advanced tools'],
      category: 'international',
      logo: '🌍',
      website: 'https://interactivebrokers.com'
    },
    {
      id: 2,
      name: 'TD Ameritrade',
      description: 'Trusted US broker with international access and excellent educational resources.',
      rating: 4.7,
      minInvestment: 0,
      fees: 'Commission-free stocks/ETFs',
      features: ['Education center', 'Research tools', 'Mobile app', 'International access'],
      category: 'international',
      logo: '🏦',
      website: 'https://tdameritrade.com'
    },
    {
      id: 3,
      name: 'eToro',
      description: 'Social trading platform available in most African countries with copy trading.',
      rating: 4.5,
      minInvestment: 50,
      fees: 'Spread-based',
      features: ['Social trading', 'Copy trading', 'Crypto', 'Available in Africa'],
      category: 'international',
      logo: '📱',
      website: 'https://etoro.com'
    },
    // African-Focused Brokers
    {
      id: 4,
      name: 'EasyEquities (South Africa)',
      description: 'Leading South African platform offering fractional shares and international markets.',
      rating: 4.6,
      minInvestment: 0,
      fees: 'R30-50 per trade',
      features: ['Fractional shares', 'JSE access', 'US markets', 'Local support'],
      category: 'african',
      logo: '🇿🇦',
      website: 'https://easyequities.co.za'
    },
    {
      id: 5,
      name: 'Bamboo (Nigeria)',
      description: 'Nigerian fintech providing access to US stocks and real estate investments.',
      rating: 4.4,
      minInvestment: 100,
      fees: '1.5% FX + trading fees',
      features: ['US stocks', 'Real estate', 'Dollar cards', 'Local banking'],
      category: 'african',
      logo: '🇳🇬',
      website: 'https://bamboo.africa'
    },
    {
      id: 6,
      name: 'Chaka (Nigeria)',
      description: 'Investment platform offering Nigerian and international market access.',
      rating: 4.3,
      minInvestment: 1000,
      fees: '0.5% annual fee',
      features: ['NSE stocks', 'Global markets', 'Mutual funds', 'Fixed income'],
      category: 'african',
      logo: '🇳🇬',
      website: 'https://chaka.ng'
    },
    {
      id: 7,
      name: 'Absa Stockbrokers (Multi-African)',
      description: 'Pan-African investment services across multiple African markets.',
      rating: 4.5,
      minInvestment: 0,
      fees: 'Varies by market',
      features: ['Pan-African', 'Local expertise', 'Research', 'Institutional grade'],
      category: 'african',
      logo: '🌍',
      website: 'https://absa.africa'
    },
    {
      id: 8,
      name: 'Standard Bank Securities',
      description: 'Major African bank offering investment services across the continent.',
      rating: 4.4,
      minInvestment: 0,
      fees: 'Competitive rates',
      features: ['Multi-country', 'Banking integration', 'Research', 'Local presence'],
      category: 'african',
      logo: '🏛️',
      website: 'https://standardbank.com'
    },
    // Robo-Advisors
    {
      id: 9,
      name: 'Betterment',
      description: 'US robo-advisor with international access for automated portfolio management.',
      rating: 4.5,
      minInvestment: 0,
      fees: '0.25% annual fee',
      features: ['Robo-advisor', 'Auto-rebalancing', 'Tax optimization', 'Goal-based'],
      category: 'robo',
      logo: '🤖',
      website: 'https://betterment.com'
    },
    {
      id: 10,
      name: 'Wealthfront',
      description: 'Advanced robo-advisor with tax-loss harvesting and financial planning.',
      rating: 4.6,
      minInvestment: 500,
      fees: '0.25% annual fee',
      features: ['Tax optimization', 'Financial planning', 'Direct indexing', 'Automated'],
      category: 'robo',
      logo: '💰',
      website: 'https://wealthfront.com'
    }
  ];

  const brands = [
    // ETF Providers
    {
      id: 1,
      name: 'Vanguard ETFs',
      description: 'World\'s largest low-cost index fund provider with global market exposure.',
      type: 'ETF Provider',
      expenseRatio: '0.03% - 0.20%',
      category: 'etf',
      logo: '📈',
      popularFunds: ['VTI (Total Stock)', 'VXUS (Intl)', 'VEA (Developed)', 'VWO (Emerging)']
    },
    {
      id: 2,
      name: 'iShares by BlackRock',
      description: 'Global ETF leader with comprehensive emerging markets and frontier exposure.',
      type: 'ETF Provider',
      expenseRatio: '0.05% - 0.75%',
      category: 'etf',
      logo: '⚫',
      popularFunds: ['EEM (Emerging)', 'VWO (Emerging)', 'ACWI (World)', 'IEMG (Core EM)']
    },
    {
      id: 3,
      name: 'SPDR ETFs',
      description: 'Pioneer in ETFs with sector-specific and regional investment options.',
      type: 'ETF Provider',
      expenseRatio: '0.09% - 0.60%',
      category: 'etf',
      logo: '🕷️',
      popularFunds: ['SPY (S&P 500)', 'GLD (Gold)', 'XLF (Financials)', 'EWZ (Brazil)']
    },
    // African Stocks
    {
      id: 4,
      name: 'Naspers/Prosus (JSE)',
      description: 'African tech giant with global investments including Tencent stake.',
      type: 'African Stock',
      sector: 'Technology',
      category: 'african-stock',
      logo: '🇿🇦',
      marketCap: '$45B+',
      diversification: 'Global tech exposure'
    },
    {
      id: 5,
      name: 'Dangote Cement (NSE)',
      description: 'Africa\'s largest cement producer with pan-African operations.',
      type: 'African Stock',
      sector: 'Materials',
      category: 'african-stock',
      logo: '🇳🇬',
      marketCap: '$4B+',
      diversification: 'Pan-African infrastructure'
    },
    {
      id: 6,
      name: 'Safaricom (NSE)',
      description: 'Kenya\'s leading telecom with innovative mobile money services.',
      type: 'African Stock',
      sector: 'Telecommunications',
      category: 'african-stock',
      logo: '🇰🇪',
      marketCap: '$12B+',
      dividendYield: '7-9%'
    },
    // International Blue Chips
    {
      id: 7,
      name: 'Apple (AAPL)',
      description: 'Global technology leader with strong presence in emerging markets.',
      type: 'Global Stock',
      sector: 'Technology',
      category: 'international-stock',
      logo: '🍎',
      marketCap: '$3.0T+',
      diversification: 'Global consumer tech'
    },
    {
      id: 8,
      name: 'Microsoft (MSFT)',
      description: 'Cloud computing giant with growing African market investments.',
      type: 'Global Stock',
      sector: 'Technology',
      category: 'international-stock',
      logo: '💻',
      marketCap: '$2.8T+',
      diversification: 'Enterprise & cloud'
    },
    {
      id: 9,
      name: 'Coca-Cola (KO)',
      description: 'Global beverage company with significant African operations.',
      type: 'Global Stock',
      sector: 'Consumer Staples',
      category: 'international-stock',
      logo: '🥤',
      marketCap: '$250B+',
      dividendYield: '3.1%'
    },
    // Commodities & Resources
    {
      id: 10,
      name: 'Gold ETFs (GLD/IAU)',
      description: 'Physical gold exposure, important for African investors as hedge.',
      type: 'Commodity ETF',
      volatility: 'Medium',
      category: 'commodity',
      logo: '🥇',
      diversification: 'Inflation hedge'
    },
    {
      id: 11,
      name: 'Oil ETFs (USO/XLE)',
      description: 'Energy sector exposure for resource-rich African economies.',
      type: 'Commodity ETF',
      sector: 'Energy',
      category: 'commodity',
      logo: '🛢️',
      volatility: 'High'
    },
    // Emerging Market Funds
    {
      id: 12,
      name: 'Emerging Markets ETF (VWO)',
      description: 'Broad emerging markets exposure including African markets.',
      type: 'Regional ETF',
      expenseRatio: '0.10%',
      category: 'emerging',
      logo: '🌍',
      diversification: 'Emerging markets'
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
            <h1 className="text-2xl font-bold">Global Investment Brokers & Brands</h1>
          </div>
          <p className="text-muted-foreground">
            Discover trusted platforms and investment options across Africa and internationally
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
                  variant={selectedCategory === 'international' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('international')}
                >
                  International
                </Button>
                <Button
                  variant={selectedCategory === 'african' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('african')}
                >
                  African
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
              Investment Options
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

        {/* African Investment Guide */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              African Investment Guide
            </CardTitle>
            <CardDescription>
              Essential information for investing from African countries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Choosing International Brokers</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Verify broker accepts clients from your country</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Check currency conversion fees and payment methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Ensure compliance with local tax regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Look for platforms with African customer support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">Investment Strategy for Africa</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Diversify between local and international markets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Consider currency hedging for USD investments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Include commodity exposure (gold, oil) as hedge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Start with broad market ETFs before individual stocks</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Country-Specific Information */}
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle>African Market Access by Country</CardTitle>
            <CardDescription>
              Popular brokers and investment options by African region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-primary">🇿🇦 South Africa</h5>
                <p className="text-sm text-muted-foreground">EasyEquities, Standard Bank, Absa, International Brokers</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-primary">🇳🇬 Nigeria</h5>
                <p className="text-sm text-muted-foreground">Bamboo, Chaka, Trove Finance, International platforms</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-primary">🇰🇪 Kenya</h5>
                <p className="text-sm text-muted-foreground">Genghis Capital, Standard Investment Bank, International brokers</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-primary">🇪🇬 Egypt</h5>
                <p className="text-sm text-muted-foreground">EFG Hermes, HC Securities, International platforms</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-primary">🇲🇦 Morocco</h5>
                <p className="text-sm text-muted-foreground">Attijari Intermediation, CFG Bank, International access</p>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-primary">🌍 Pan-African</h5>
                <p className="text-sm text-muted-foreground">Interactive Brokers, eToro, Standard Bank Group</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Brokers;
