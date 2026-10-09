const THEME_KEY = "theme";

/**
 * Web version of `themeStorage.ts`: `localStorage` instead of expo-sqlite,
 * which would need extra WASM setup on web. `localStorage` is missing during
 * static rendering and can throw in private windows, hence the guards.
 */
export function loadIsDark(): boolean | null {
  try {
    const saved = globalThis.localStorage?.getItem(THEME_KEY) ?? null;
    return saved === null ? null : saved === "dark";
  } catch {
    return null;
  }
}

export function saveIsDark(isDark: boolean): void {
  try {
    globalThis.localStorage?.setItem(THEME_KEY, isDark ? "dark" : "light");
  } catch {
    // Losing the saved theme is harmless; the app falls back to its default.
  }
}
