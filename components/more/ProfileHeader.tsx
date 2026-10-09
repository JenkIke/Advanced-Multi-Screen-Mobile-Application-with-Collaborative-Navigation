import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

interface ProfileHeaderProps {
  name: string;
  subtitle: string;
  onPress?: () => void;
}

/** First two letters of the name, e.g. "Isaac" -> "IS", as MacroFactor does. */
function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Avatar + name block on the More tab and Account screen.
 * IMAGE PLACEHOLDER: a user-uploaded profile photo would replace the initials.
 */
export function ProfileHeader({ name, subtitle, onPress }: ProfileHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={`${name}, view account`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.inverse }]}>
        <AppText
          variant="heading"
          color={colors.inverseText}
          style={styles.initials}
        >
          {initialsFor(name)}
        </AppText>
      </View>
      <View style={styles.text}>
        <AppText variant="title">{name}</AppText>
        <AppText variant="bodyLarge" muted>
          {subtitle}
        </AppText>
      </View>
    </Pressable>
  );
}

const AVATAR_SIZE = 72;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xl,
  },
  pressed: {
    opacity: 0.7,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontWeight: "900",
    fontSize: 28,
  },
  text: {
    flex: 1,
    gap: 2,
  },
});
