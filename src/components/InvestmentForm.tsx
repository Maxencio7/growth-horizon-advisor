
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Investment, RiskLevel, InvestmentType } from '@/types/investment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useInvestments } from '@/contexts/InvestmentContext';

const investmentSchema = z.object({
  name: z.string().min(1, 'Investment name is required'),
  monthlyAmount: z.coerce.number()
    .min(1, 'Amount must be greater than 0')
    .max(1000000, 'Amount is too large'),
  interestRate: z.coerce.number()
    .min(0, 'Interest rate must be 0 or greater')
    .max(100, 'Interest rate must be 100 or less'),
  duration: z.coerce.number()
    .min(1, 'Duration must be at least 1 month')
    .max(600, 'Duration must be 600 months (50 years) or less'),
  startDate: z.date(),
  riskLevel: z.enum(['Low', 'Medium', 'High']),
  type: z.enum(['Stocks', 'Bonds', 'Crypto', 'Mutual Funds', 'Real Estate', 'Other']),
});

type InvestmentFormValues = z.infer<typeof investmentSchema>;

interface InvestmentFormProps {
  existingInvestment?: Investment;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ existingInvestment }) => {
  const { addInvestment, updateInvestment } = useInvestments();
  const navigate = useNavigate();

  const defaultValues: InvestmentFormValues = existingInvestment ? {
    ...existingInvestment,
    startDate: new Date(existingInvestment.startDate)
  } : {
    name: '',
    monthlyAmount: 0,
    interestRate: 0,
    duration: 0,
    startDate: new Date(),
    riskLevel: 'Medium',
    type: 'Other',
  };

  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentSchema),
    defaultValues,
  });

  const onSubmit = (values: InvestmentFormValues) => {
    if (existingInvestment) {
      updateInvestment({ ...values, id: existingInvestment.id });
    } else {
      addInvestment(values);
    }
    navigate('/');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{existingInvestment ? 'Edit Investment' : 'Add New Investment'}</CardTitle>
        <CardDescription>
          {existingInvestment 
            ? 'Update your investment details below'
            : 'Enter the details of your investment to see potential growth projections'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Retirement Fund" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a descriptive name for your investment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="monthlyAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Investment ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      How much you'll invest monthly
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Interest Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Expected annual return percentage
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (months)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="600" {...field} />
                    </FormControl>
                    <FormDescription>
                      How long you'll be investing (in months)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} 
                        onChange={(e) => field.onChange(new Date(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      When you'll start this investment
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="riskLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The risk level of this investment
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Stocks">Stocks</SelectItem>
                        <SelectItem value="Bonds">Bonds</SelectItem>
                        <SelectItem value="Crypto">Crypto</SelectItem>
                        <SelectItem value="Mutual Funds">Mutual Funds</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      What type of investment is this
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-between pt-6 px-0">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-finance-primary hover:bg-finance-primary/90">
                {existingInvestment ? 'Update Investment' : 'Add Investment'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
