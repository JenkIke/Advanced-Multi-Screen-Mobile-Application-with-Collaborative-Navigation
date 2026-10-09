import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { FoodIcon } from "@/components/ui/FoodIcon";
import { IconButton } from "@/components/ui/IconButton";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { Food, MacroTotals } from "@/types";

interface FoodEntryCardProps {
  food: Food;
  macros: MacroTotals;
  amountLabel: string;
  onPress: () => void;
  onEditPress: () => void;
}

/**
 * A logged food: illustration, "Name By Brand", macro line and an edit button.
 * The tappable body and the edit button are siblings, not nested, because a
 * button inside a button is invalid HTML on web.
 */
export function FoodEntryCard({
  food,
  macros,
  amountLabel,
  onPress,
  onEditPress,
}: FoodEntryCardProps) {
  const { colors } = useAppTheme();
  const title = food.brand ? `${food.name} By ${food.brand}` : food.name;

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => [styles.body, pressed && styles.pressed]}
      >
        <FoodIcon food={food} size={44} />
        <View style={styles.details}>
          <AppText variant="body" numberOfLines={2} style={styles.title}>
            {title}
          </AppText>
          {/* One Text with a nested icon so the line wraps as a single run. */}
          <AppText variant="body" style={styles.macroText}>
            {Math.round(macros.calories)}
            <MaterialCommunityIcons name="fire" size={14} color={colors.text} />
            {`  ${Math.round(macros.protein)}P  ${Math.round(macros.fat)}F  ${Math.round(macros.carbs)}C  •  ${amountLabel}`}
          </AppText>
        </View>
      </Pressable>
      <IconButton
        icon="pencil"
        onPress={onEditPress}
        accessibilityLabel={`Edit ${food.name}`}
        size={38}
        iconSize={18}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm + 2,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  body: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm + 2,
  },
  pressed: {
    opacity: 0.75,
  },
  details: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 17,
  },
  macroText: {
    fontSize: 15,
  },
});
