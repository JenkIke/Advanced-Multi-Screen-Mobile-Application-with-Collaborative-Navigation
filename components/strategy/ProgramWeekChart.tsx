import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { MacroColors } from "@/constants/Colors";
import { Radius, Spacing } from "@/constants/Layout";
import type { MacroTotals, WeekDay } from "@/types";
import { macroCalories } from "@/utils/nutrition";

interface ProgramWeekChartProps {
  days: WeekDay[];
  /** Daily targets; one entry per day so programs can vary by weekday. */
  targetsByDate: Record<string, MacroTotals>;
}

/** Height of a day's macro stack when it hits the largest calorie target in the week. */
const STACK_HEIGHT = 210;
/** Text on the coloured blocks stays dark in both themes for contrast. */
const BLOCK_TEXT = "#1A1A1A";

/**
 * Coached Program preview: calorie pill over a stack of protein, fat and
 * carb blocks sized by the calories each macro contributes.
 */
export function ProgramWeekChart({
  days,
  targetsByDate,
}: ProgramWeekChartProps) {
  const maxCalories = Math.max(
    ...days.map((day) => targetsByDate[day.date]?.calories ?? 0),
    1,
  );

  return (
    <View style={styles.row}>
      {days.map((day) => {
        const targets = targetsByDate[day.date];
        if (!targets) {
          return <View key={day.date} style={styles.column} />;
        }
        const split = macroCalories(targets);
        const scale = STACK_HEIGHT / maxCalories;

        return (
          <View key={day.date} style={styles.column}>
            <View
              style={[
                styles.caloriePill,
                { backgroundColor: MacroColors.calories },
              ]}
            >
              <AppText variant="micro" color={BLOCK_TEXT}>
                {targets.calories}
              </AppText>
            </View>
            <Block
              height={split.protein * scale}
              color={MacroColors.protein}
              label={`${targets.protein} P`}
            />
            <Block
              height={split.fat * scale}
              color={MacroColors.fat}
              label={`${targets.fat} F`}
            />
            <Block
              height={split.carbs * scale}
              color={MacroColors.carbs}
              label={`${targets.carbs} C`}
            />
            <AppText variant="bodyLarge" muted style={styles.dayLabel}>
              {day.initial}
            </AppText>
          </View>
        );
      })}
    </View>
  );
}

interface BlockProps {
  height: number;
  color: string;
  label: string;
}

function Block({ height, color, label }: BlockProps) {
  return (
    <View style={[styles.block, { height, backgroundColor: color }]}>
      <AppText
        variant="caption"
        color={BLOCK_TEXT}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 6,
  },
  column: {
    flex: 1,
    gap: 3,
    alignItems: "stretch",
  },
  caloriePill: {
    alignSelf: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    marginBottom: Spacing.xs,
  },
  block: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    paddingHorizontal: 2,
  },
  dayLabel: {
    textAlign: "center",
    marginTop: Spacing.md,
  },
});
