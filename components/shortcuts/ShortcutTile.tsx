import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { IconName } from "@/types";

interface ShortcutTileProps {
  label: string;
  icon: IconName;
  onPress: () => void;
}

/** Round icon + caption at the top of the Shortcuts sheet. */
export function ShortcutTile({ label, icon, onPress }: ShortcutTileProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={[styles.circle, { backgroundColor: colors.elevated }]}>
        <MaterialCommunityIcons name={icon} size={30} color={colors.text} />
      </View>
      <AppText variant="body" numberOfLines={1}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.md,
  },
  pressed: {
    opacity: 0.6,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
