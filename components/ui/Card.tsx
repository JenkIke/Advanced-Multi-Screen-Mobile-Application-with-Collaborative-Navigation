import type { PropsWithChildren } from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

interface CardProps extends PropsWithChildren {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/** Rounded container used by insight tiles, strategy panels and list groups. */
export function Card({
  children,
  onPress,
  style,
  accessibilityLabel,
}: CardProps) {
  const { colors } = useAppTheme();
  const cardStyle = [styles.card, { backgroundColor: colors.card }, style];

  if (!onPress) {
    return <View style={cardStyle}>{children}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
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
