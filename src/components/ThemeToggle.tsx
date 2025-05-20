
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

  if (isMobile) {
    return (
      <Toggle 
        pressed={theme === 'light'} 
        onPressedChange={() => toggleTheme()}
        className="p-2 mr-1"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-orange-400" />
        ) : (
          <Sun className="h-4 w-4 text-orange-400" />
        )}
      </Toggle>
    );
  }

  return (
    <ToggleGroup type="single" value={theme} onValueChange={(value) => {
      if (value) toggleTheme();
    }}>
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <Moon className="h-4 w-4 mr-1" />
        <span className="hidden md:inline">Dark</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="light" aria-label="Light mode">
        <Sun className="h-4 w-4 mr-1" />
        <span className="hidden md:inline">Light</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeToggle;
