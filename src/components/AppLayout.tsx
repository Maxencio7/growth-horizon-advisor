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
import NotificationBell from '@/components/NotificationBell';
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
  const { user, profile, loading: authLoading, signOut, isGuest } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!authLoading && !user && !isGuest && location.pathname !== '/auth') {
      navigate('/auth');
    }
  }, [authLoading, user, isGuest, location.pathname, navigate]);

  if (isLoading || authLoading) {
    return <LoadingPage />;
  }

  if (!user && !isGuest && location.pathname !== '/auth') {
    return <LoadingPage />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Add Investment', path: '/add-investment' },
    { name: 'AI Advisor', path: '/advisor' },
    { name: 'Brokers & Brands', path: '/brokers' },
    { name: 'Calculators', path: '/calculators' },
    { name: 'Notifications', path: '/notifications' },
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
    if (isGuest) return 'Guest User';
    if (profile?.first_name) {
      return `${profile.first_name}${profile.last_name ? ` ${profile.last_name}` : ''}`;
    }
    return user?.email || 'User';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Enhanced Header with two sections */}
      <header className="bg-background border-b border-primary/20 shadow-lg sticky top-0 z-10">
        {/* Top section - Brand and utilities */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between border-b border-primary/10">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Visionary Enterprises" className="h-10 md:h-12" />
            </Link>
            {(user || isGuest) && (
              <div className="hidden lg:block">
                <span className="text-sm text-muted-foreground">Welcome back, </span>
                <span className="text-sm font-medium text-primary">{getUserDisplayName()}</span>
                {isGuest && (
                  <span className="text-xs text-muted-foreground ml-2">(Guest Mode)</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <CurrencySelector />
            
            {(user || isGuest) && (
              <>
                <NotificationBell />
                
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
                    <Button variant="ghost" size="sm" className="hidden md:flex hover:bg-primary/10">
                      <User className="h-4 w-4 mr-2" />
                      <span>{isGuest ? 'Guest' : (profile?.first_name || 'User')}</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {!isGuest && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {isGuest && (
                      <>
                        <DropdownMenuItem onClick={() => navigate('/auth')}>
                          Sign Up / Sign In
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>

        {/* Bottom section - Main navigation */}
        {(user || isGuest) && (
          <div className="container mx-auto px-4 py-4">
            <div className="hidden md:flex items-center justify-center">
              <nav className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative font-medium transition-all duration-300 px-4 py-2 rounded-lg group",
                      isActivePath(item.path) 
                        ? "text-primary bg-primary/10 shadow-md border border-primary/20" 
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5 hover:shadow-sm"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActivePath(item.path) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg" />
                    )}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile dropdown menu */}
        {(user || isGuest) && isMobile && mobileMenuOpen && (
          <div className="md:hidden bg-popover border-b border-primary/20 shadow-lg">
            <nav className="container mx-auto py-4 px-4 space-y-2">
              <div className="py-3 px-4 border-b border-primary/20 mb-3 bg-primary/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Welcome, </span>
                <span className="text-sm font-medium text-primary">{getUserDisplayName()}</span>
                {isGuest && (
                  <span className="text-xs text-muted-foreground block mt-1">(Guest Mode)</span>
                )}
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block py-3 px-4 rounded-lg transition-all duration-300",
                    isActivePath(item.path)
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                      : "text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-primary/20 pt-3 mt-4 space-y-2">
                {!isGuest && (
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  >
                    Profile Settings
                  </button>
                )}
                {isGuest && (
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  >
                    Sign Up / Sign In
                  </button>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 text-foreground/80 hover:bg-primary/5 hover:text-primary"
                >
                  {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
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
      {(user || isGuest) && location.pathname !== '/guide' && <UserGuide />}
    </div>
  );
};

export default AppLayout;
