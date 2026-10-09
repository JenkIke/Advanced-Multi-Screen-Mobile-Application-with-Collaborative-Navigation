import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";
import type { IconName } from "@/types";

/**
 * Extra Pressable props (`onPress`, `href`, `role`...) are passed through so
 * the button can sit inside `<Link asChild>`, which supplies them.
 */
interface IconButtonProps extends Omit<PressableProps, "style" | "children"> {
  icon: IconName;
  accessibilityLabel: string;
  size?: number;
  iconSize?: number;
}

/** Circular grey button (Food Log header actions, entry edit pencils). */
export function IconButton({
  icon,
  accessibilityLabel,
  size = 48,
  iconSize = 22,
  ...rest
}: IconButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={6}
      {...rest}
      accessibilityLabel={accessibilityLabel}
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
