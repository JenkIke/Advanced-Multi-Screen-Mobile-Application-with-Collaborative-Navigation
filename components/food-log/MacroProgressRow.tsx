import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MacroColors } from "@/constants/Colors";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { MacroTotals } from "@/types";
import { MACRO_KEYS, MACRO_SUFFIX, progress } from "@/utils/nutrition";

interface MacroProgressRowProps {
  consumed: MacroTotals;
  targets: MacroTotals;
}

/** "🔥 2084 / 2864   P 134 / 169 ..." with a coloured bar under each value. */
export function MacroProgressRow({ consumed, targets }: MacroProgressRowProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {MACRO_KEYS.map((key) => (
        <View
          key={key}
          style={[styles.item, key === "calories" && styles.caloriesItem]}
        >
          <View style={styles.label}>
            {key === "calories" ? (
              <MaterialCommunityIcons
                name="fire"
                size={16}
                color={colors.text}
              />
            ) : (
              <AppText variant="body" style={styles.letter}>
                {MACRO_SUFFIX[key]}
              </AppText>
            )}
            <AppText variant="caption" numberOfLines={1} adjustsFontSizeToFit>
              {Math.round(consumed[key])} / {targets[key]}
            </AppText>
          </View>
          <ProgressBar
            progress={progress(consumed[key], targets[key])}
            color={MacroColors[key]}
            height={5}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: Spacing.sm + 2,
  },
  item: {
    flex: 1,
    gap: 6,
  },
  // The calorie figure has the most digits, so give it a little more room.
  caloriesItem: {
    flex: 1.3,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  letter: {
    fontWeight: "700",
  },
});
