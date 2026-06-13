import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isTransitioning: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('theme-ready');
      });
    });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) window.clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return; // Prevent double clicks during transition

    setIsTransitioning(true);
    const root = document.documentElement;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    root.classList.remove('is-switching-to-light', 'is-switching-to-dark');
    root.classList.add(nextTheme === 'light' ? 'is-switching-to-light' : 'is-switching-to-dark');

    // Change theme immediately to trigger wallpaper crossfade
    setTheme(nextTheme);

    // Remove transition class and transition lock after the 620ms crossfade settles.
    transitionTimeoutRef.current = window.setTimeout(() => {
      root.classList.remove('is-switching-to-light', 'is-switching-to-dark');
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

