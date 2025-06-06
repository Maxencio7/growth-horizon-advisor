
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InvestmentProvider } from "@/contexts/InvestmentContext";
import { AIAdvisorProvider } from "@/contexts/AIAdvisorContext";
import { CurrencyProvider } from './contexts/CurrencyContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { CountryProvider } from '@/contexts/CountryContext';

import Index from "./pages/Index";
import AddInvestment from "./pages/AddInvestment";
import EditInvestment from "./pages/EditInvestment";
import Advisor from "./pages/Advisor";
import UserGuidePage from "./pages/UserGuidePage";
import NotFound from "./pages/NotFound";
import Calculators from "./pages/Calculators";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Brokers from "./pages/Brokers";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider>
      <CountryProvider>
        <CurrencyProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <AuthProvider>
                <InvestmentProvider>
                  <NotificationProvider>
                    <AIAdvisorProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/add-investment" element={<AddInvestment />} />
                          <Route path="/edit-investment/:id" element={<EditInvestment />} />
                          <Route path="/advisor" element={<Advisor />} />
                          <Route path="/guide" element={<UserGuidePage />} />
                          <Route path="/calculators" element={<Calculators />} />
                          <Route path="/brokers" element={<Brokers />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </BrowserRouter>
                    </AIAdvisorProvider>
                  </NotificationProvider>
                </InvestmentProvider>
              </AuthProvider>
            </TooltipProvider>
          </QueryClientProvider>
        </CurrencyProvider>
      </CountryProvider>
    </ThemeProvider>
  );
};

export default App;
