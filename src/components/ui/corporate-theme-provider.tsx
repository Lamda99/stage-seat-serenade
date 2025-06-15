
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'casual' | 'corporate';

interface CorporateThemeContextType {
  themeMode: ThemeMode;
  toggleThemeMode: () => void;
  isCorporate: boolean;
}

const CorporateThemeContext = createContext<CorporateThemeContextType | undefined>(undefined);

interface CorporateThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

export const CorporateThemeProvider: React.FC<CorporateThemeProviderProps> = ({ 
  children, 
  defaultMode = 'casual' 
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);

  useEffect(() => {
    // Load saved theme preference
    const savedThemeMode = localStorage.getItem('theater-booking-theme-mode') as ThemeMode;
    if (savedThemeMode && (savedThemeMode === 'casual' || savedThemeMode === 'corporate')) {
      setThemeMode(savedThemeMode);
    }
  }, []);

  useEffect(() => {
    // Apply theme mode to document root
    document.documentElement.setAttribute('data-theme-mode', themeMode);
    
    // Store user preference
    localStorage.setItem('theater-booking-theme-mode', themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(prev => prev === 'casual' ? 'corporate' : 'casual');
  };

  const isCorporate = themeMode === 'corporate';

  return (
    <CorporateThemeContext.Provider value={{ themeMode, toggleThemeMode, isCorporate }}>
      {children}
    </CorporateThemeContext.Provider>
  );
};

export const useCorporateTheme = () => {
  const context = useContext(CorporateThemeContext);
  if (context === undefined) {
    throw new Error('useCorporateTheme must be used within a CorporateThemeProvider');
  }
  return context;
};

export default CorporateThemeProvider;
