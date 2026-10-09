import type { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

/**
 * Extra Pressable props (`href`, `role`...) are passed through so a
 * pressable card can sit inside `<Link asChild>`, which supplies them.
 */
interface CardProps extends Omit<PressableProps, "style" | "children"> {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Rounded container used by insight tiles, strategy panels and list groups. */
export function Card({ children, onPress, style, ...rest }: CardProps) {
  const { colors } = useAppTheme();
  const cardStyle = [styles.card, { backgroundColor: colors.card }, style];

  if (!onPress) {
    return <View style={cardStyle}>{children}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      {...rest}
      onPress={onPress}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
  },
  pressed: {
    opacity: 0.75,
  },
});
