
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/investmentCalculator';
import { useCurrency } from '@/contexts/CurrencyContext';

const Calculators: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-orange bg-clip-text text-transparent">
                Financial Calculators
              </h1>
              <Calculator className="h-5 w-5 text-orange-400" />
            </div>
            <p className="text-muted-foreground mt-1">
              Essential tools to help you make informed investment decisions
            </p>
          </div>
        </div>

        <Tabs defaultValue="compound">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="compound">
              <TrendingUp className="mr-2 h-4 w-4" />
              Compound Interest
            </TabsTrigger>
            <TabsTrigger value="roi">
              <PieChart className="mr-2 h-4 w-4" />
              ROI Calculator
            </TabsTrigger>
            <TabsTrigger value="retirement">
              <Calculator className="mr-2 h-4 w-4" />
              Retirement Planner
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compound">
            <CompoundInterestCalculator />
          </TabsContent>
          
          <TabsContent value="roi">
            <ROICalculator />
          </TabsContent>
          
          <TabsContent value="retirement">
            <RetirementCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const CompoundInterestCalculator: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);
  const [additionalContribution, setAdditionalContribution] = useState<number>(200);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [result, setResult] = useState<any>(null);

  const calculateCompoundInterest = () => {
    const yearlyRate = rate / 100;
    const numYears = years;
    let totalPrincipal = principal;
    let totalInterest = 0;
    
    let periodsPerYear = 1;
    if (contributionFrequency === "monthly") periodsPerYear = 12;
    if (contributionFrequency === "quarterly") periodsPerYear = 4;
    
    // Number of compound periods
    const periods = numYears * periodsPerYear;
    // Rate per period
    const ratePerPeriod = yearlyRate / periodsPerYear;
    
    let futureValue = principal;
    const yearlyData = [];
    
    for (let period = 1; period <= periods; period++) {
      // Add contribution
      futureValue += additionalContribution;
      totalPrincipal += additionalContribution;
      
      // Calculate interest for this period
      const interestEarned = futureValue * ratePerPeriod;
      totalInterest += interestEarned;
      
      // Add interest
      futureValue += interestEarned;
      
      // Record year data
      if (period % periodsPerYear === 0) {
        const yearNum = period / periodsPerYear;
        yearlyData.push({
          year: yearNum,
          value: futureValue,
          principal: totalPrincipal,
          interest: totalInterest
        });
      }
    }
    
    setResult({
      futureValue,
      totalInterest,
      totalPrincipal,
      yearlyData
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Compound Interest Calculator</CardTitle>
          <CardDescription>
            Calculate how your investment can grow over time with compound interest
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Initial Investment</Label>
            <Input 
              id="principal" 
              type="number" 
              value={principal} 
              onChange={e => setPrincipal(Number(e.target.value))} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalContribution">Additional Contribution</Label>
            <Input 
              id="additionalContribution" 
              type="number" 
              value={additionalContribution} 
              onChange={e => setAdditionalContribution(Number(e.target.value))} 
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button 
                variant={contributionFrequency === "monthly" ? "default" : "outline"} 
                onClick={() => setContributionFrequency("monthly")}
                className="text-xs"
              >
                Monthly
              </Button>
              <Button 
                variant={contributionFrequency === "quarterly" ? "default" : "outline"} 
                onClick={() => setContributionFrequency("quarterly")}
                className="text-xs"
              >
                Quarterly
              </Button>
              <Button 
                variant={contributionFrequency === "yearly" ? "default" : "outline"} 
                onClick={() => setContributionFrequency("yearly")}
                className="text-xs"
              >
                Yearly
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <span>{rate}%</span>
            </div>
            <Slider 
              id="interestRate" 
              min={1} 
              max={20} 
              step={0.1} 
              value={[rate]} 
              onValueChange={([value]) => setRate(value)} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="years">Time Period (Years)</Label>
              <span>{years} years</span>
            </div>
            <Slider 
              id="years" 
              min={1} 
              max={40} 
              step={1} 
              value={[years]} 
              onValueChange={([value]) => setYears(value)} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateCompoundInterest} className="w-full">
            Calculate <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>
            See how your investment grows over time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Future Value</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {formatCurrency(result.futureValue, selectedCurrency)}
                  </p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-2xl font-bold text-green-500">
                    {formatCurrency(result.totalInterest, selectedCurrency)}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Year-by-Year Growth</h3>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                  {result.yearlyData.map((data: any, index: number) => (
                    <div key={index} className="flex justify-between p-2 border-b border-border">
                      <span>Year {data.year}</span>
                      <span className="font-medium">
                        {formatCurrency(data.value, selectedCurrency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Enter your values and click Calculate to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const ROICalculator: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(15000);
  const [timePeriod, setTimePeriod] = useState<number>(3);
  const [result, setResult] = useState<any>(null);

  const calculateROI = () => {
    // Total ROI
    const totalReturn = finalValue - initialInvestment;
    const roi = (totalReturn / initialInvestment) * 100;
    
    // Annualized ROI
    const annualizedROI = (Math.pow((finalValue / initialInvestment), 1/timePeriod) - 1) * 100;
    
    setResult({
      totalReturn,
      roi,
      annualizedROI
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>ROI Calculator</CardTitle>
          <CardDescription>
            Calculate the return on investment and annualized ROI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <Input 
              id="initialInvestment" 
              type="number" 
              value={initialInvestment} 
              onChange={e => setInitialInvestment(Number(e.target.value))} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="finalValue">Final Value</Label>
            <Input 
              id="finalValue" 
              type="number" 
              value={finalValue} 
              onChange={e => setFinalValue(Number(e.target.value))} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="timePeriod">Time Period (Years)</Label>
              <span>{timePeriod} years</span>
            </div>
            <Slider 
              id="timePeriod" 
              min={1} 
              max={20} 
              step={1} 
              value={[timePeriod]} 
              onValueChange={([value]) => setTimePeriod(value)} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateROI} className="w-full">
            Calculate <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>ROI Results</CardTitle>
          <CardDescription>
            Your investment performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total Return</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {formatCurrency(result.totalReturn, selectedCurrency)}
                  </p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Total ROI</p>
                  <p className={`text-2xl font-bold ${result.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {result.roi.toFixed(2)}%
                  </p>
                </div>
              </div>
              
              <div className="bg-black/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Annualized ROI</p>
                <p className={`text-2xl font-bold ${result.annualizedROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {result.annualizedROI.toFixed(2)}% per year
                </p>
              </div>
              
              <div className="bg-black/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">What This Means</h3>
                <p className="text-sm text-muted-foreground">
                  {result.roi >= 0 
                    ? `Your investment of ${formatCurrency(initialInvestment, selectedCurrency)} has generated a positive return of ${formatCurrency(result.totalReturn, selectedCurrency)} over ${timePeriod} years.` 
                    : `Your investment of ${formatCurrency(initialInvestment, selectedCurrency)} has lost ${formatCurrency(Math.abs(result.totalReturn), selectedCurrency)} over ${timePeriod} years.`
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <PieChart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Enter your values and click Calculate to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const RetirementCalculator: React.FC = () => {
  const { selectedCurrency } = useCurrency();
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlySavings, setMonthlySavings] = useState<number>(500);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [result, setResult] = useState<any>(null);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const annualSavings = monthlySavings * 12;
    const realReturnRate = (1 + expectedReturn/100) / (1 + inflationRate/100) - 1;
    
    let futureValue = currentSavings;
    let yearlyData = [];
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      // Add annual savings
      futureValue += annualSavings;
      // Apply return rate
      futureValue *= (1 + realReturnRate);
      
      yearlyData.push({
        age: currentAge + year,
        value: futureValue,
        inflationAdjusted: futureValue / Math.pow(1 + inflationRate/100, year)
      });
    }
    
    // Calculate how many years this will last based on 4% withdrawal rule
    const annualWithdrawal = futureValue * 0.04;
    const monthlyWithdrawal = annualWithdrawal / 12;
    
    setResult({
      futureValue,
      inflationAdjustedValue: yearlyData[yearlyData.length - 1].inflationAdjusted,
      annualWithdrawal,
      monthlyWithdrawal,
      yearlyData
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Retirement Calculator</CardTitle>
          <CardDescription>
            Plan for your retirement with this calculator
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input 
                id="currentAge" 
                type="number" 
                value={currentAge} 
                onChange={e => setCurrentAge(Number(e.target.value))} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input 
                id="retirementAge" 
                type="number" 
                value={retirementAge} 
                onChange={e => setRetirementAge(Number(e.target.value))} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currentSavings">Current Savings</Label>
            <Input 
              id="currentSavings" 
              type="number" 
              value={currentSavings} 
              onChange={e => setCurrentSavings(Number(e.target.value))} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monthlySavings">Monthly Contributions</Label>
            <Input 
              id="monthlySavings" 
              type="number" 
              value={monthlySavings} 
              onChange={e => setMonthlySavings(Number(e.target.value))} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
              <span>{expectedReturn}%</span>
            </div>
            <Slider 
              id="expectedReturn" 
              min={1} 
              max={15} 
              step={0.1} 
              value={[expectedReturn]} 
              onValueChange={([value]) => setExpectedReturn(value)} 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="inflationRate">Expected Inflation (%)</Label>
              <span>{inflationRate}%</span>
            </div>
            <Slider 
              id="inflationRate" 
              min={0} 
              max={10} 
              step={0.1} 
              value={[inflationRate]} 
              onValueChange={([value]) => setInflationRate(value)} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateRetirement} className="w-full">
            Calculate <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="glass-panel">
        <CardHeader>
          <CardTitle>Retirement Projection</CardTitle>
          <CardDescription>
            Your retirement financial outlook
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">At Retirement (Age {retirementAge})</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {formatCurrency(result.futureValue, selectedCurrency)}
                  </p>
                  <p className="text-xs text-muted-foreground">Nominal Value</p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Inflation Adjusted</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {formatCurrency(result.inflationAdjustedValue, selectedCurrency)}
                  </p>
                  <p className="text-xs text-muted-foreground">Today's Dollars</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Annual Withdrawal (4% Rule)</p>
                  <p className="text-xl font-bold text-green-500">
                    {formatCurrency(result.annualWithdrawal, selectedCurrency)}
                  </p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <p className="text-xl font-bold text-green-500">
                    {formatCurrency(result.monthlyWithdrawal, selectedCurrency)}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Growth Projection</h3>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                  {result.yearlyData.filter((_, index) => index % 5 === 0 || index === result.yearlyData.length - 1).map((data: any) => (
                    <div key={data.age} className="flex justify-between p-2 border-b border-border">
                      <span>Age {data.age}</span>
                      <span className="font-medium">
                        {formatCurrency(data.value, selectedCurrency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Enter your values and click Calculate to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Calculators;
