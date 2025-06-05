
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

const Index: React.FC = () => {
  const { investments } = useInvestments();
  const { user, isGuest } = useAuth();
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'beginner' | 'advanced'>('beginner');

  // Calculate projections for all investments
  const investmentsWithProjections = React.useMemo(() => {
    return investments.map(investment => calculateInvestmentGrowth(investment));
  }, [investments]);

  const isNewUser = investments.length === 0;

  return (
    <AppLayout>
      <div className="space-y-4 md:space-y-6">
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

        {/* Main Content */}
        {isNewUser ? (
          <Tabs defaultValue="learn" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learn" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learn First
              </TabsTrigger>
              <TabsTrigger value="guide" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Get Started
              </TabsTrigger>
              <TabsTrigger value="start" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Start Investing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="learn" className="mt-6">
              <InvestmentEducation />
            </TabsContent>

            <TabsContent value="guide" className="mt-6">
              <BeginnerGuide />
            </TabsContent>

            <TabsContent value="start" className="mt-6">
              <div className="bg-muted/40 rounded-lg p-4 md:p-8 text-center">
                <div className="max-w-2xl mx-auto space-y-4">
                  <h2 className="text-lg md:text-xl font-semibold">Ready to Start Your Investment Journey?</h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    You've learned the basics. Now it's time to create your first investment and watch your money grow through the power of compound interest.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      className="bg-finance-primary hover:bg-finance-primary/90"
                      asChild
                      size="lg"
                    >
                      <Link to="/add-investment">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Create My First Investment
                      </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                      <Link to="/advisor">
                        <Users className="h-5 w-5 mr-2" />
                        Get Personalized Advice
                      </Link>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Start small, stay consistent, and let time work in your favor
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-6">
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
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
