/** Spacing, corner radius and type scale shared by every screen. */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  /** Bottom-sheet top corners. */
  xl: 28,
  pill: 999,
} as const;

/** Heights of text-entry rows: the pill search bar and the sign-in form fields. */
export const InputHeight = {
  search: 50,
  form: 54,
} as const;

export const FontSize = {
  micro: 11,
  caption: 13,
  small: 15,
  body: 16,
  bodyMedium: 17,
  bodyLarge: 18,
  titleSmall: 20,
  title: 22,
  titleLarge: 24,
  heading: 26,
  display: 34,
} as const;
