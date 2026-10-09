import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { IconName } from "@/types";

/**
 * Extra Pressable props (`onPress`, `href`, `role`...) are passed through so
 * the button can sit inside `<Link asChild>`, which supplies them.
 */
interface PillButtonProps extends Omit<PressableProps, "style" | "children"> {
  label: string;
  icon?: IconName;
  /** `primary` is the high-contrast white pill (sign in); `secondary` is the grey chip. */
  variant?: "primary" | "secondary";
  style?: StyleProp<ViewStyle>;
}

export function PillButton({
  label,
  icon,
  variant = "secondary",
  style,
  ...rest
}: PillButtonProps) {
  const { colors } = useAppTheme();
  const isPrimary = variant === "primary";
  const foreground = isPrimary ? colors.inverseText : colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      {...rest}
      style={({ pressed }) => [
        styles.pill,
        { backgroundColor: isPrimary ? colors.inverse : colors.elevated },
        pressed && styles.pressed,
        style,
      ]}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={20} color={foreground} />
      )}
      <AppText
        variant="bodyLarge"
        color={foreground}
        style={isPrimary && styles.primaryLabel}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg + 2,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
  },
  primaryLabel: {
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
});
