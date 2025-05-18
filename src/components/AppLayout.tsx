
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CurrencySelector from '@/components/CurrencySelector';
import { useCurrency } from '@/contexts/CurrencyContext';
import LoadingPage from '@/components/LoadingPage';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { isLoading } = useCurrency();

  if (isLoading) {
    return <LoadingPage />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Investment', path: '/add-investment' },
    { name: 'AI Advisor', path: '/advisor' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-premium border-b border-orange-900/20 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-orange-500 hover:text-orange-400 hover:bg-black/20"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <Link to="/" className="text-xl font-bold gradient-text">
              Investment Manager
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-medium transition-colors",
                  location.pathname === item.path 
                    ? "text-orange-400 border-b-2 border-orange-500" 
                    : "text-gray-300 hover:text-orange-300"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Add currency selector to the header */}
          <div className="flex justify-between items-center">
            <CurrencySelector />
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Mobile sidebar */}
        <div 
          className={cn(
            "fixed inset-0 bg-black/70 backdrop-blur-sm z-20 md:hidden transition-opacity",
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <div 
            className={cn(
              "absolute top-0 left-0 h-full w-64 bg-gradient-premium border-r border-orange-900/20 transform transition-transform",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b border-orange-900/20">
              <span className="font-semibold text-lg text-orange-400">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(false)}
                className="text-orange-500 hover:text-orange-400 hover:bg-black/20"
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
                    location.pathname === item.path 
                      ? "bg-orange-500/20 text-orange-400" 
                      : "text-gray-300 hover:bg-black/20 hover:text-orange-300"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 bg-gradient-premium border-r border-orange-900/20 shrink-0">
          <nav className="p-4 space-y-2 sticky top-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block py-2 px-4 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-orange-500/20 text-orange-400 border-l-2 border-orange-500" 
                    : "text-gray-300 hover:bg-black/20 hover:text-orange-300"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
