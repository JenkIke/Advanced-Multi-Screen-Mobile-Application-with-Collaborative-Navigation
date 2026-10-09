import { StyleSheet, Text, type TextProps } from "react-native";

import { FontSize } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

export type TextVariant =
  | "wordmark"
  | "display"
  | "heading"
  | "title"
  | "bodyLarge"
  | "body"
  | "caption";

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  /** Use the secondary (grey) text colour. */
  muted?: boolean;
  color?: string;
}

/**
 * Themed text with the app's type scale. Every screen uses this instead of
 * raw <Text> so colours flip correctly between light and dark mode.
 */
export function AppText({
  variant = "body",
  muted = false,
  color,
  style,
  ...rest
}: AppTextProps) {
  const { colors } = useAppTheme();
  const textColor = color ?? (muted ? colors.secondaryText : colors.text);

  return (
    <Text style={[styles[variant], { color: textColor }, style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  // FONT PLACEHOLDER: MacroFactor's "TODAY" / "MORE" headers use a wide
  // custom display typeface. A heavy system font with tight tracking stands in.
  wordmark: {
    fontSize: FontSize.display,
    fontWeight: "900",
    letterSpacing: 1,
  },
  display: {
    fontSize: FontSize.display,
    fontWeight: "600",
  },
  heading: {
    fontSize: FontSize.heading,
    fontWeight: "700",
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: "500",
  },
  bodyLarge: {
    fontSize: FontSize.bodyLarge,
  },
  body: {
    fontSize: FontSize.body,
  },
  caption: {
    fontSize: FontSize.caption,
  },
});
