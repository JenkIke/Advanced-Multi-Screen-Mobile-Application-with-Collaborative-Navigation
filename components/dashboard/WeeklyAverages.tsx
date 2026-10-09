import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MacroColors } from "@/constants/Colors";
import { Spacing } from "@/constants/Layout";
import type { MacroKey, MacroTotals } from "@/types";
import { MACRO_KEYS, progress } from "@/utils/nutrition";

interface WeeklyAveragesProps {
  /** Totals for each day that has food logged. */
  loggedDays: MacroTotals[];
  targets: MacroTotals;
}

const MACRO_LABELS: Record<MacroKey, string> = {
  calories: "Calories",
  protein: "Protein",
  fat: "Fat",
  carbs: "Carbs",
};

const MACRO_UNITS: Record<MacroKey, string> = {
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbs: "g",
};

/** Dashboard pager page 2: average intake per logged day vs. target. */
export function WeeklyAverages({ loggedDays, targets }: WeeklyAveragesProps) {
  const dayCount = Math.max(loggedDays.length, 1);

  return (
    <View style={styles.list}>
      <AppText variant="body" muted>
        Averaged over {loggedDays.length} logged days
      </AppText>
      {MACRO_KEYS.map((key) => {
        const average =
          loggedDays.reduce((sum, day) => sum + day[key], 0) / dayCount;
        return (
          <View key={key} style={styles.row}>
            <View style={styles.labels}>
              <AppText variant="bodyLarge">{MACRO_LABELS[key]}</AppText>
              <AppText variant="bodyLarge">
                {Math.round(average)}
                <AppText variant="body" muted>
                  {` / ${targets[key]} ${MACRO_UNITS[key]}`}
                </AppText>
              </AppText>
            </View>
            <ProgressBar
              progress={progress(average, targets[key])}
              color={MacroColors[key]}
              height={8}
              style={styles.bar}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  row: {
    gap: Spacing.sm,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bar: {
    borderRadius: 4,
  },
});
