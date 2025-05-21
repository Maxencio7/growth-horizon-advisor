
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CurrencySelector from '@/components/CurrencySelector';
import UserGuide from '@/components/UserGuide';
import { useCurrency } from '@/contexts/CurrencyContext';
import LoadingPage from '@/components/LoadingPage';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isLoading } = useCurrency();
  const isMobile = useIsMobile();

  if (isLoading) {
    return <LoadingPage />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Investment', path: '/add-investment' },
    { name: 'AI Advisor', path: '/advisor' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'User Guide', path: '/guide' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with premium dark styling */}
      <header className="bg-background border-b border-primary/20 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Visionary Enterprises" className="h-10 md:h-12" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-medium transition-colors p-2 rounded-md",
                  isActivePath(item.path) 
                    ? "text-primary bg-primary/10 border-b-2 border-primary" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu}
              className="md:hidden text-primary hover:bg-primary/10"
            >
              <Menu className="h-5 w-5 mr-1" />
              <span>Menu</span>
              <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
          )}

          {/* Theme toggle and currency selector */}
          <div className="flex justify-between items-center space-x-2">
            <ThemeToggle />
            <CurrencySelector />
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && mobileMenuOpen && (
          <div className="md:hidden bg-popover border-b border-primary/20 shadow-md">
            <nav className="container mx-auto py-2 px-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block py-2 px-4 rounded-md transition-colors",
                    isActivePath(item.path)
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile sidebar (replaced with dropdown) */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 opacity-0 pointer-events-none hidden"
        onClick={() => setSidebarOpen(false)}
      >
        <div 
          className="absolute top-0 left-0 h-full w-64 bg-popover border-r border-primary/20 transform -translate-x-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center border-b border-primary/20">
            <span className="font-semibold text-lg text-primary">Menu</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(false)}
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block py-2 px-4 rounded-md transition-colors",
                  isActivePath(item.path)
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 p-4 md:p-6 container mx-auto">
        {children}
      </main>
      
      {/* User Guide Floating Button - only show when not on guide page */}
      {location.pathname !== '/guide' && <UserGuide />}
    </div>
  );
};

export default AppLayout;
