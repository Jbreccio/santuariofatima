import { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: string;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' });

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light' 
}: { 
  children: ReactNode; 
  defaultTheme?: string 
}) {
  return (
    <ThemeContext.Provider value={{ theme: defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);