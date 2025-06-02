
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CurrencySelector from '@/components/CurrencySelector';
import UserGuide from '@/components/UserGuide';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import LoadingPage from '@/components/LoadingPage';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading } = useCurrency();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!authLoading && !user && location.pathname !== '/auth') {
      navigate('/auth');
    }
  }, [authLoading, user, location.pathname, navigate]);

  if (isLoading || authLoading) {
    return <LoadingPage />;
  }

  if (!user && location.pathname !== '/auth') {
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getUserDisplayName = () => {
    if (profile?.first_name) {
      return `${profile.first_name}${profile.last_name ? ` ${profile.last_name}` : ''}`;
    }
    return user?.email || 'User';
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
            {user && (
              <div className="hidden md:block ml-4">
                <span className="text-sm text-muted-foreground">Welcome back, </span>
                <span className="text-sm font-medium text-primary">{getUserDisplayName()}</span>
              </div>
            )}
          </div>
          
          {/* Desktop Navigation */}
          {user && (
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
          )}

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <CurrencySelector />
            
            {user && (
              <>
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

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      <User className="h-4 w-4 mr-1" />
                      <span>{profile?.first_name || 'User'}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {user && isMobile && mobileMenuOpen && (
          <div className="md:hidden bg-popover border-b border-primary/20 shadow-md">
            <nav className="container mx-auto py-2 px-4 space-y-1">
              <div className="py-2 px-4 border-b border-primary/20 mb-2">
                <span className="text-sm text-muted-foreground">Welcome, </span>
                <span className="text-sm font-medium text-primary">{getUserDisplayName()}</span>
              </div>
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
              <div className="border-t border-primary/20 pt-2 mt-2">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 rounded-md transition-colors text-foreground/80 hover:bg-primary/5 hover:text-primary"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 rounded-md transition-colors text-foreground/80 hover:bg-primary/5 hover:text-primary"
                >
                  Sign Out
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 p-4 md:p-6 container mx-auto">
        {children}
      </main>
      
      {/* User Guide Floating Button - only show when not on guide page and user is logged in */}
      {user && location.pathname !== '/guide' && <UserGuide />}
    </div>
  );
};

export default AppLayout;
