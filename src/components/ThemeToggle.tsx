
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useIsMobile } from '@/hooks/use-mobile';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const isDark = theme === 'dark';

  if (isMobile) {
    return (
      <Toggle 
        pressed={!isDark} 
        onPressedChange={() => toggleTheme()}
        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Toggle>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
    >
      {isDark ? (
        <div className="flex items-center">
          <Sun className="h-4 w-4 mr-1" />
          <span>Light</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Moon className="h-4 w-4 mr-1" />
          <span>Dark</span>
        </div>
      )}
    </Button>
  );
};

export default ThemeToggle;
