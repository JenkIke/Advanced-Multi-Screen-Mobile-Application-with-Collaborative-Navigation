import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Appearance, Platform } from "react-native";

import { darkColors, lightColors, type ThemeColors } from "@/constants/Colors";
import { loadIsDark, saveIsDark } from "@/utils/themeStorage";

interface ThemeContextValue {
  isDark: boolean;
  colors: ThemeColors;
  setIsDark: (isDark: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * App-wide light/dark theme. MacroFactor is dark by default, so the app
 * starts dark unless the user saved a choice; the switch lives on the More
 * tab and the Account screen, and the choice is remembered across launches.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDarkState] = useState(() => loadIsDark() ?? true);

  // Match native UI (keyboard, alerts, pickers) to the in-app theme rather
  // than the device setting. `app.json` uses "automatic" so this can apply.
  useEffect(() => {
    if (Platform.OS !== "web") {
      Appearance.setColorScheme(isDark ? "dark" : "light");
    }
  }, [isDark]);

  function setIsDark(next: boolean) {
    setIsDarkState(next);
    saveIsDark(next);
  }

  const value: ThemeContextValue = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setIsDark,
    toggleTheme: () => setIsDark(!isDark),
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
