import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { MacroColors } from "@/constants/Colors";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { MacroKey, MacroTotals, WeekDay } from "@/types";
import { MACRO_KEYS, MACRO_SUFFIX, progress } from "@/utils/nutrition";

export type NutritionMode = "Consumed" | "Remaining";

interface WeeklyNutritionChartProps {
  days: WeekDay[];
  /** Totals per ISO date; days with nothing logged are omitted. */
  totalsByDate: Record<string, MacroTotals>;
  targets: MacroTotals;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  mode: NutritionMode;
}

// Sized from the reference screenshot (390pt-wide iPhone).
const ROW_HEIGHT = 52;
const BAR_HEIGHT = 34;

/**
 * The Dashboard's 7-day x 4-macro bar grid. Tapping a day column selects it
 * and the right-hand column shows that day's numbers.
 */
export function WeeklyNutritionChart({
  days,
  totalsByDate,
  targets,
  selectedDate,
  onSelectDate,
  mode,
}: WeeklyNutritionChartProps) {
  const { colors } = useAppTheme();
  const selectedTotals = totalsByDate[selectedDate];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {/* Row separators sit behind the day columns. */}
        {MACRO_KEYS.slice(1).map((key, index) => (
          <View
            key={key}
            style={[
              styles.rowSeparator,
              { top: ROW_HEIGHT * (index + 1), backgroundColor: colors.border },
            ]}
          />
        ))}
        {days.map((day) => (
          <DayColumn
            key={day.date}
            day={day}
            totals={totalsByDate[day.date]}
            targets={targets}
            mode={mode}
            selected={day.date === selectedDate}
            onPress={() => onSelectDate(day.date)}
          />
        ))}
      </View>
      <View style={styles.summary}>
        {MACRO_KEYS.map((key) => (
          <MacroSummary
            key={key}
            macro={key}
            consumed={selectedTotals?.[key] ?? 0}
            target={targets[key]}
            mode={mode}
          />
        ))}
      </View>
    </View>
  );
}

interface DayColumnProps {
  day: WeekDay;
  totals: MacroTotals | undefined;
  targets: MacroTotals;
  mode: NutritionMode;
  selected: boolean;
  onPress: () => void;
}

function DayColumn({
  day,
  totals,
  targets,
  mode,
  selected,
  onPress,
}: DayColumnProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Select ${day.date}`}
      style={[styles.column, selected && { borderColor: colors.text }]}
    >
      {MACRO_KEYS.map((key) => {
        const ratio = totals ? progress(totals[key], targets[key]) : 0;
        return (
          <View key={key} style={styles.cell}>
            <MacroBar
              ratio={mode === "Consumed" ? ratio : totals ? 1 - ratio : 0}
              color={MacroColors[key]}
            />
          </View>
        );
      })}
      <AppText
        variant="body"
        muted={!selected}
        style={[styles.dayLabel, selected && styles.selectedLabel]}
      >
        {day.initial}
      </AppText>
    </Pressable>
  );
}

interface MacroBarProps {
  ratio: number;
  color: string;
}

/** Track with a target cap; the fill grows from the bottom and animates on change. */
function MacroBar({ ratio, color }: MacroBarProps) {
  const { colors } = useAppTheme();
  const [height] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: ratio * (BAR_HEIGHT - 6),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [height, ratio]);

  return (
    <View style={[styles.track, { backgroundColor: colors.elevated }]}>
      <View style={[styles.cap, { backgroundColor: colors.secondaryText }]} />
      <Animated.View
        style={[styles.fill, { height, backgroundColor: color }]}
      />
    </View>
  );
}

interface MacroSummaryProps {
  macro: MacroKey;
  consumed: number;
  target: number;
  mode: NutritionMode;
}

function MacroSummary({ macro, consumed, target, mode }: MacroSummaryProps) {
  const { colors } = useAppTheme();
  const value = Math.round(
    mode === "Consumed" ? consumed : Math.max(target - consumed, 0),
  );

  return (
    <View style={styles.summaryCell}>
      <View style={styles.summaryValueRow}>
        <AppText variant="title" style={styles.summaryValue}>
          {value}
          {MACRO_SUFFIX[macro] ? ` ${MACRO_SUFFIX[macro]}` : ""}
        </AppText>
        {macro === "calories" && (
          <MaterialCommunityIcons name="fire" size={16} color={colors.text} />
        )}
      </View>
      <AppText variant="body" muted style={styles.summaryTarget}>
        {mode === "Consumed" ? "of" : "left of"} {target}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowSeparator: {
    position: "absolute",
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
  },
  column: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: Radius.sm,
    paddingHorizontal: 7,
    paddingBottom: Spacing.xs,
  },
  cell: {
    height: ROW_HEIGHT,
    justifyContent: "center",
  },
  track: {
    width: 20,
    height: BAR_HEIGHT,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  cap: {
    position: "absolute",
    top: 3,
    width: 8,
    height: 2,
    borderRadius: 2,
  },
  fill: {
    width: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  selectedLabel: {
    fontWeight: "700",
  },
  summary: {
    width: 84,
    marginLeft: Spacing.lg,
  },
  summaryCell: {
    height: ROW_HEIGHT,
    justifyContent: "center",
  },
  summaryValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 19,
  },
  dayLabel: {
    fontSize: 16,
    marginTop: Spacing.xs,
  },
  summaryTarget: {
    fontSize: 14,
  },
});
