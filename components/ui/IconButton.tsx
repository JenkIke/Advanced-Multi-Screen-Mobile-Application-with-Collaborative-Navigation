import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";
import type { IconName } from "@/types";

interface IconButtonProps {
  icon: IconName;
  /** Optional so the button can sit inside `<Link asChild>`, which supplies it. */
  onPress?: () => void;
  accessibilityLabel: string;
  size?: number;
  iconSize?: number;
}

/** Circular grey button (Food Log header actions, entry edit pencils). */
export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  size = 48,
  iconSize = 22,
}: IconButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={6}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.elevated,
        },
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons name={icon} size={iconSize} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.6,
  },
});
