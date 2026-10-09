import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

interface FoodSearchBarProps {
  onPress: () => void;
  onBarcodePress: () => void;
}

/**
 * Pinned search field at the bottom of the Food Log. It is a button that
 * opens the full search screen rather than an inline text input. The search
 * and barcode buttons are siblings so no button is nested in another (web).
 */
export function FoodSearchBar({ onPress, onBarcodePress }: FoodSearchBarProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.bar, { backgroundColor: colors.elevated }]}>
      <Pressable
        onPress={onPress}
        accessibilityRole="search"
        accessibilityLabel="Search for a food"
        style={styles.searchArea}
      >
        <MaterialCommunityIcons name="magnify" size={26} color={colors.text} />
        <AppText variant="bodyLarge" muted>
          Search for a food
        </AppText>
      </Pressable>
      <Pressable
        onPress={onBarcodePress}
        accessibilityRole="button"
        accessibilityLabel="Scan barcode"
        hitSlop={8}
      >
        <MaterialCommunityIcons
          name="barcode-scan"
          size={26}
          color={colors.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    height: 54,
    borderRadius: Radius.pill,
  },
  searchArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    height: "100%",
  },
});
