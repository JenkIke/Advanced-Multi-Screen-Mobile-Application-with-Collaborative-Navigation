/**
 * Design tokens for the MacroFactor recreation.
 *
 * Colours were sampled by eye from the reference screenshots. Macro colours
 * stay the same in both themes because they carry meaning (blue = calories,
 * orange = protein, yellow = fat, green = carbs).
 */

export interface ThemeColors {
  /** Main screen background (the darker band below headers). */
  background: string;
  /** Raised header area at the top of tab screens. */
  header: string;
  /** Cards and grouped list containers. */
  card: string;
  /** Pills, icon buttons and empty chart tracks drawn on top of cards. */
  elevated: string;
  text: string;
  secondaryText: string;
  border: string;
  tabBar: string;
  tabInactive: string;
  /** High-contrast fill used for the centre "+" button and primary buttons. */
  inverse: string;
  inverseText: string;
  overlay: string;
  danger: string;
  /** Backdrop around the centred app column on wide screens (desktop web, tablets). */
  frame: string;
}

export const darkColors: ThemeColors = {
  background: "#121212",
  header: "#1E1E1E",
  card: "#222222",
  elevated: "#333333",
  text: "#F5F5F5",
  secondaryText: "#9B9B9B",
  border: "#3A3A3A",
  tabBar: "#1C1C1C",
  tabInactive: "#9B9B9B",
  inverse: "#FFFFFF",
  inverseText: "#111111",
  overlay: "rgba(0, 0, 0, 0.6)",
  danger: "#FF6B6B",
  frame: "#000000",
};

export const lightColors: ThemeColors = {
  background: "#F2F2F4",
  header: "#FFFFFF",
  card: "#FFFFFF",
  elevated: "#E8E8EB",
  text: "#121212",
  secondaryText: "#6B6B70",
  border: "#DADADF",
  tabBar: "#FFFFFF",
  tabInactive: "#7A7A80",
  inverse: "#121212",
  inverseText: "#FFFFFF",
  overlay: "rgba(0, 0, 0, 0.35)",
  danger: "#D93636",
  frame: "#D5D5DA",
};

export const MacroColors = {
  calories: "#5B8DEF",
  protein: "#F47D5B",
  fat: "#F5C84C",
  carbs: "#5CB88A",
} as const;

export const ChartColors = {
  expenditure: "#F47D5B",
  weight: "#A98BF5",
  goal: "#5CB88A",
} as const;
