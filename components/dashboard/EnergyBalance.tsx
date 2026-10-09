import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { ChartColors, MacroColors } from "@/constants/Colors";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { MacroTotals, WeekDay } from "@/types";

interface EnergyBalanceProps {
  days: WeekDay[];
  totalsByDate: Record<string, MacroTotals>;
  expenditure: number;
}

const HALF_HEIGHT = 110;
/** kcal represented by a full half-height bar. */
const SCALE = 1000;

/**
 * Dashboard pager page 3: daily surplus/deficit against estimated
 * expenditure. Bars grow up (surplus) or down (deficit) from a zero line.
 */
export function EnergyBalance({
  days,
  totalsByDate,
  expenditure,
}: EnergyBalanceProps) {
  const { colors } = useAppTheme();

  return (
    <View>
      <AppText variant="body" muted>
        Intake vs. {expenditure} kcal expenditure
      </AppText>
      <View style={styles.chart}>
        <View style={[styles.zeroLine, { backgroundColor: colors.border }]} />
        {days.map((day) => {
          const totals = totalsByDate[day.date];
          const balance = totals ? totals.calories - expenditure : 0;
          const barHeight =
            Math.min(Math.abs(balance) / SCALE, 1) * HALF_HEIGHT;
          const isDeficit = balance < 0;

          return (
            <View key={day.date} style={styles.column}>
              <View style={styles.half}>
                {!isDeficit && totals && (
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: ChartColors.expenditure,
                      },
                    ]}
                  />
                )}
              </View>
              <View style={[styles.half, styles.lowerHalf]}>
                {isDeficit && (
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: MacroColors.calories,
                      },
                    ]}
                  />
                )}
              </View>
              <AppText variant="caption" muted style={styles.value}>
                {totals ? Math.round(balance) : "-"}
              </AppText>
              <AppText variant="bodyLarge" muted>
                {day.initial}
              </AppText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.lg,
  },
  zeroLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: HALF_HEIGHT,
    height: 1,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  half: {
    height: HALF_HEIGHT,
    justifyContent: "flex-end",
  },
  lowerHalf: {
    justifyContent: "flex-start",
  },
  bar: {
    width: 22,
    borderRadius: 4,
  },
  value: {
    marginTop: Spacing.sm,
  },
});
