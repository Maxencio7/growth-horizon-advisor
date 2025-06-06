import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/components/AppLayout';
import InvestmentCard from '@/components/InvestmentCard';
import PortfolioSummary from '@/components/PortfolioSummary';
import BeginnerGuide from '@/components/BeginnerGuide';
import AdvancedMetrics from '@/components/AdvancedMetrics';
import InvestmentEducation from '@/components/InvestmentEducation';
import { useInvestments } from '@/contexts/InvestmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { calculateInvestmentGrowth } from '@/utils/investmentCalculator';
import { BookOpen, BarChart3, GraduationCap, TrendingUp, Users, Target } from 'lucide-react';
import CountrySelector from '@/components/CountrySelector';
import CountryDashboard from '@/components/CountryDashboard';
import { useCountry } from '@/contexts/CountryContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  const { investments } = useInvestments();
  const { user, isGuest } = useAuth();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'beginner' | 'advanced'>('beginner');
  const { selectedCountry } = useCountry();

  // Calculate projections for all investments
  const investmentsWithProjections = React.useMemo(() => {
    return investments.map(investment => calculateInvestmentGrowth(investment));
  }, [investments]);

  const isNewUser = investments.length === 0;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'justify-between items-start'}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Investment Dashboard</h1>
              {isGuest && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Guest Mode
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm md:text-base">
              {isNewUser 
                ? "Welcome! Start your investment journey with confidence" 
                : "Track and grow your investment portfolio"
              }
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'beginner' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('beginner')}
                className="flex items-center gap-1"
              >
                <GraduationCap className="h-4 w-4" />
                Beginner
              </Button>
              <Button
                variant={viewMode === 'advanced' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('advanced')}
                className="flex items-center gap-1"
              >
                <BarChart3 className="h-4 w-4" />
                Advanced
              </Button>
            </div>
            <Button
              className="bg-finance-primary hover:bg-finance-primary/90"
              asChild
            >
              <Link to="/add-investment">
                <TrendingUp className="h-4 w-4 mr-2" />
                Add Investment
              </Link>
            </Button>
          </div>
        </div>
        
        <Separator />

        {/* Country Selection Section */}
        {!selectedCountry && (
          <Card className="glass-panel border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Get Started</CardTitle>
              <CardDescription>
                Select your country to get personalized investment recommendations and local broker information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CountrySelector />
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="country" disabled={!selectedCountry}>
              {selectedCountry ? `${selectedCountry.flag} ${selectedCountry.name}` : 'Country Info'}
            </TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            {/* Portfolio Summary */}
            <PortfolioSummary investments={investmentsWithProjections} />
            
            {/* Advanced Metrics for Serious Investors */}
            {viewMode === 'advanced' && (
              <AdvancedMetrics investments={investmentsWithProjections} />
            )}

            {/* Beginner Education for New Investors */}
            {viewMode === 'beginner' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">Keep Learning & Growing</h3>
                    <p className="text-blue-700 text-sm mb-3">
                      Great job on starting your investment journey! Continue learning to make better investment decisions.
                    </p>
                    <Button variant="outline" size="sm" asChild className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      <Link to="/user-guide">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Investment List */}
            <div>
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-semibold">Your Investment Portfolio</h2>
                <Badge variant="secondary" className="text-xs">
                  {investments.length} {investments.length === 1 ? 'Investment' : 'Investments'}
                </Badge>
              </div>
              <div className="investments-grid">
                {investmentsWithProjections.map((investment) => (
                  <InvestmentCard key={investment.id} investment={investment} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="country" className="mt-6">
            <CountryDashboard />
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            {/* Investment Education */}
            <InvestmentEducation />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Index;
