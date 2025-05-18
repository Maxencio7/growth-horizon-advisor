
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Investment', path: '/add-investment' },
    { name: 'AI Advisor', path: '/advisor' },
  ];

  return (
    <div className="min-h-screen bg-finance-light flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <Link to="/" className="text-xl font-bold text-finance-primary">
              Investment Manager
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-medium hover:text-finance-primary transition-colors",
                  location.pathname === item.path 
                    ? "text-finance-primary border-b-2 border-finance-primary" 
                    : "text-finance-neutral"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Mobile sidebar */}
        <div 
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity",
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <div 
            className={cn(
              "absolute top-0 left-0 h-full w-64 bg-white transform transition-transform",
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="font-semibold text-lg">Menu</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(false)}
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
                      ? "bg-finance-primary text-white" 
                      : "text-finance-neutral hover:bg-gray-100"
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
        <aside className="hidden md:block w-64 bg-white border-r shrink-0">
          <nav className="p-4 space-y-2 sticky top-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block py-2 px-4 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-finance-primary text-white" 
                    : "text-finance-neutral hover:bg-gray-100"
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
