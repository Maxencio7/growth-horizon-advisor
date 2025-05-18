import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InvestmentProvider } from "@/contexts/InvestmentContext";
import { AIAdvisorProvider } from "@/contexts/AIAdvisorContext";
import { CurrencyProvider } from './contexts/CurrencyContext';

import Index from "./pages/Index";
import AddInvestment from "./pages/AddInvestment";
import EditInvestment from "./pages/EditInvestment";
import Advisor from "./pages/Advisor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrap the application with the CurrencyProvider
const App = () => {
  return (
    <CurrencyProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <InvestmentProvider>
            <AIAdvisorProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/add-investment" element={<AddInvestment />} />
                  <Route path="/edit-investment/:id" element={<EditInvestment />} />
                  <Route path="/advisor" element={<Advisor />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AIAdvisorProvider>
          </InvestmentProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </CurrencyProvider>
  );
};

export default App;
