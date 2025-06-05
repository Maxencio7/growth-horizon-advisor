
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, TrendingUp, Shield, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

const BeginnerGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const beginnerSteps = [
    {
      title: "Understanding Investment Basics",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p>Investment is putting your money to work to generate more money over time through compound growth.</p>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800">Key Concept: Compound Interest</h4>
            <p className="text-blue-700">Your money grows not just on your initial investment, but also on the growth you've already earned.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800">Example:</h5>
              <p className="text-sm text-green-700">$100 at 8% annual return becomes $108 after 1 year, then $116.64 after 2 years (earning interest on the $8 gain too)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Risk vs Return",
      icon: <Shield className="h-5 w-5 text-orange-500" />,
      content: (
        <div className="space-y-4">
          <p>Higher potential returns usually come with higher risk. Understanding this relationship is crucial.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>
                <p className="text-sm mt-1">Bonds, Savings (2-4% return)</p>
              </div>
              <div className="text-right text-green-700">
                <p className="font-semibold">Stable</p>
                <p className="text-xs">Low volatility</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                <p className="text-sm mt-1">Mutual Funds, ETFs (6-10% return)</p>
              </div>
              <div className="text-right text-yellow-700">
                <p className="font-semibold">Balanced</p>
                <p className="text-xs">Moderate volatility</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <Badge variant="secondary" className="bg-red-100 text-red-800">High Risk</Badge>
                <p className="text-sm mt-1">Stocks, Crypto (Variable return)</p>
              </div>
              <div className="text-right text-red-700">
                <p className="font-semibold">Growth Potential</p>
                <p className="text-xs">High volatility</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Dollar-Cost Averaging",
      icon: <DollarSign className="h-5 w-5 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <p>Investing the same amount regularly, regardless of market conditions, helps reduce the impact of market volatility.</p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800">Why Monthly Investing Works:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1 text-purple-700">
              <li>You buy more shares when prices are low</li>
              <li>You buy fewer shares when prices are high</li>
              <li>This averages out your cost over time</li>
              <li>Removes emotion from investment decisions</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-500" />
          Investment Basics for Beginners
        </CardTitle>
        <CardDescription>
          Learn the fundamentals before you start investing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
          <TabsList className="grid w-full grid-cols-3">
            {beginnerSteps.map((step, index) => (
              <TabsTrigger key={index} value={index.toString()} className="flex items-center gap-2">
                {step.icon}
                <span className="hidden sm:inline">{step.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {beginnerSteps.map((step, index) => (
            <TabsContent key={index} value={index.toString()} className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {step.icon}
                  {step.title}
                </h3>
                {step.content}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setCurrentStep(Math.min(beginnerSteps.length - 1, currentStep + 1))}
            disabled={currentStep === beginnerSteps.length - 1}
          >
            {currentStep === beginnerSteps.length - 1 ? 'Start Investing' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeginnerGuide;
