import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import { darkColors, lightColors, type ThemeColors } from "@/constants/Colors";

interface ThemeContextValue {
  isDark: boolean;
  colors: ThemeColors;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * App-wide light/dark theme. MacroFactor is dark by default, so the app
 * starts dark; the switch lives on the More tab and the Account screen.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(true);

  const value: ThemeContextValue = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setIsDark,
    toggleTheme: () => setIsDark((current) => !current),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used inside a ThemeProvider");
  }
  return context;
}
