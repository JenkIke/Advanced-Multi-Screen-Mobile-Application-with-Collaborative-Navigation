import Storage from "expo-sqlite/kv-store";

const THEME_KEY = "theme";

/**
 * Saved light/dark choice, or null if the user never changed it. Read
 * synchronously so the first frame already uses the saved theme.
 */
export function loadIsDark(): boolean | null {
  try {
    const saved = Storage.getItemSync(THEME_KEY);
    return saved === null ? null : saved === "dark";
  } catch {
    return null;
  }
}

export function saveIsDark(isDark: boolean): void {
  try {
    Storage.setItemSync(THEME_KEY, isDark ? "dark" : "light");
  } catch {
    // Losing the saved theme is harmless; the app falls back to its default.
  }
}
