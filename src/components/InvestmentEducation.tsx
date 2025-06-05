
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Calculator, PieChart, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

const InvestmentEducation: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('basics');

  const educationalContent = {
    basics: {
      title: "Investment Fundamentals",
      icon: <BookOpen className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">What is Investing?</h3>
            <p className="text-muted-foreground mb-4">
              Investing is the process of putting your money to work in order to generate more money over time. 
              Unlike saving where your money sits idle, investing allows your money to grow through compound returns.
            </p>
            
            <Alert className="bg-blue-50 border-blue-200">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>Key Principle:</strong> Time is your greatest asset. The earlier you start, the more compound growth works in your favor.
              </AlertDescription>
            </Alert>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Core Investment Types:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-blue-600">Stocks</h5>
                <p className="text-sm text-muted-foreground">Ownership in companies. Higher risk, higher potential returns.</p>
                <Badge variant="secondary" className="mt-2">8-12% historical return</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-green-600">Bonds</h5>
                <p className="text-sm text-muted-foreground">Loans to companies/governments. Lower risk, steady returns.</p>
                <Badge variant="secondary" className="mt-2">3-6% historical return</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-purple-600">Mutual Funds</h5>
                <p className="text-sm text-muted-foreground">Professionally managed diversified portfolios.</p>
                <Badge variant="secondary" className="mt-2">6-10% historical return</Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium text-orange-600">Real Estate</h5>
                <p className="text-sm text-muted-foreground">Physical property investments. Steady income + appreciation.</p>
                <Badge variant="secondary" className="mt-2">7-9% historical return</Badge>
              </div>
            </div>
          </div>
        </div>
      )
    },
    riskManagement: {
      title: "Risk Management",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Understanding Investment Risk</h3>
            <p className="text-muted-foreground mb-4">
              Risk is the possibility that your investment will lose value. However, taking calculated risks 
              is essential for building wealth over time.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">High Risk Investments</h4>
              <p className="text-red-700 text-sm mb-2">Individual stocks, crypto, emerging markets</p>
              <div className="text-xs text-red-600">
                <p>• Potential for 15%+ annual returns</p>
                <p>• Can lose 20-50% in a year</p>
                <p>• Best for long-term investors (10+ years)</p>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Medium Risk Investments</h4>
              <p className="text-yellow-700 text-sm mb-2">Mutual funds, ETFs, balanced portfolios</p>
              <div className="text-xs text-yellow-600">
                <p>• Potential for 6-12% annual returns</p>
                <p>• Can lose 10-20% in a year</p>
                <p>• Good for medium-term goals (3-10 years)</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Low Risk Investments</h4>
              <p className="text-green-700 text-sm mb-2">Bonds, CDs, money market funds</p>
              <div className="text-xs text-green-600">
                <p>• Potential for 2-5% annual returns</p>
                <p>• Minimal chance of loss</p>
                <p>• Good for short-term goals (1-3 years)</p>
              </div>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Rule of Thumb:</strong> Never invest money you'll need within 5 years in high-risk investments.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    diversification: {
      title: "Diversification Strategy",
      icon: <PieChart className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Don't Put All Eggs in One Basket</h3>
            <p className="text-muted-foreground mb-4">
              Diversification means spreading your investments across different types of assets, 
              industries, and geographic regions to reduce risk.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Sample Portfolio Allocations by Age:</h4>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Age 20-30 (Aggressive Growth)</h5>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">70% Stocks</Badge>
                  <Badge className="bg-green-100 text-green-800">20% International</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">10% Bonds</Badge>
                </div>
                <p className="text-sm text-muted-foreground">High growth potential, long time to recover from market downturns</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Age 30-50 (Balanced Growth)</h5>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">60% Stocks</Badge>
                  <Badge className="bg-green-100 text-green-800">15% International</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">20% Bonds</Badge>
                  <Badge className="bg-purple-100 text-purple-800">5% Real Estate</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Balanced approach with moderate risk and steady growth</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">Age 50+ (Conservative)</h5>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">40% Stocks</Badge>
                  <Badge className="bg-green-100 text-green-800">10% International</Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">40% Bonds</Badge>
                  <Badge className="bg-purple-100 text-purple-800">10% Real Estate</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Capital preservation with steady income focus</p>
              </div>
            </div>
          </div>

          <Alert className="bg-green-50 border-green-200">
            <PieChart className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Rebalance your portfolio annually to maintain your target allocation as markets change.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    compounding: {
      title: "Power of Compounding",
      icon: <TrendingUp className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Einstein's "8th Wonder of the World"</h3>
            <p className="text-muted-foreground mb-4">
              Compound interest is when you earn returns not just on your original investment, 
              but also on all the returns you've earned previously.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">The Magic of Starting Early:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h5 className="font-medium text-blue-800">Early Bird (Age 25)</h5>
                <div className="text-sm space-y-1 mt-2">
                  <p>• Invests $200/month</p>
                  <p>• For 10 years only ($24,000 total)</p>
                  <p>• Then stops contributing</p>
                  <p className="font-semibold text-blue-900">At 65: $602,070</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h5 className="font-medium text-orange-800">Late Starter (Age 35)</h5>
                <div className="text-sm space-y-1 mt-2">
                  <p>• Invests $200/month</p>
                  <p>• For 30 years ($72,000 total)</p>
                  <p>• Contributes 3x more money</p>
                  <p className="font-semibold text-orange-900">At 65: $540,741</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              *Assuming 8% annual return. The early bird invested less money but earned more!
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Compound Growth Visualization:</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-20 text-sm">Year 1:</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '10%'}}></div>
                </div>
                <div className="w-16 text-sm ml-2">$1,080</div>
              </div>
              <div className="flex items-center">
                <div className="w-20 text-sm">Year 10:</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
                <div className="w-16 text-sm ml-2">$2,159</div>
              </div>
              <div className="flex items-center">
                <div className="w-20 text-sm">Year 20:</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>
                <div className="w-16 text-sm ml-2">$4,661</div>
              </div>
              <div className="flex items-center">
                <div className="w-20 text-sm">Year 30:</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="w-16 text-sm ml-2">$10,063</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Starting with $1,000 at 8% annual return</p>
          </div>

          <Alert className="bg-purple-50 border-purple-200">
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>Key Takeaway:</strong> Time in the market beats timing the market. Start investing as early as possible, even with small amounts.
            </AlertDescription>
          </Alert>
        </div>
      )
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-500" />
          Investment Education Center
        </CardTitle>
        <CardDescription>
          Build your knowledge from beginner to advanced investor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTopic} onValueChange={setSelectedTopic}>
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(educationalContent).map(([key, content]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-1">
                {content.icon}
                <span className="hidden sm:inline">{content.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(educationalContent).map(([key, content]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {content.icon}
                  {content.title}
                </h2>
                {content.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InvestmentEducation;
