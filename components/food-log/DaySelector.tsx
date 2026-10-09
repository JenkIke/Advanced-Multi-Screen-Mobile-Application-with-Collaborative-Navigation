import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Rect } from "react-native-svg";

import { AppText } from "@/components/ui/AppText";
import { MacroColors } from "@/constants/Colors";
import { useAppTheme } from "@/context/ThemeContext";
import type { WeekDay } from "@/types";
import { progress } from "@/utils/nutrition";

interface DaySelectorProps {
  days: WeekDay[];
  /** Calories logged per ISO date. */
  caloriesByDate: Record<string, number>;
  calorieTarget: number;
  selectedDate: string;
  today: string;
  onSelect: (date: string) => void;
}

const PILL_WIDTH = 44;
const PILL_HEIGHT = 64;
const STROKE = 3;

/**
 * Row of day "pills" whose outline fills like a progress ring as calories
 * are logged. The selected day gets a filled background; today gets a dot.
 */
export function DaySelector({
  days,
  caloriesByDate,
  calorieTarget,
  selectedDate,
  today,
  onSelect,
}: DaySelectorProps) {
  return (
    <View style={styles.row}>
      {days.map((day) => (
        <DayPill
          key={day.date}
          day={day}
          ratio={progress(caloriesByDate[day.date] ?? 0, calorieTarget)}
          selected={day.date === selectedDate}
          isToday={day.date === today}
          onPress={() => onSelect(day.date)}
        />
      ))}
    </View>
  );
}

interface DayPillProps {
  day: WeekDay;
  ratio: number;
  selected: boolean;
  isToday: boolean;
  onPress: () => void;
}

function DayPill({ day, ratio, selected, isToday, onPress }: DayPillProps) {
  const { colors } = useAppTheme();
  const inner = {
    width: PILL_WIDTH - STROKE,
    height: PILL_HEIGHT - STROKE,
    radius: (PILL_WIDTH - STROKE) / 2,
  };
  // Perimeter of a stadium shape: two straight sides + one full circle.
  const perimeter = 2 * (inner.height - inner.width) + Math.PI * inner.width;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${day.shortName} ${day.dayOfMonth}, ${Math.round(ratio * 100)}% of calories`}
      style={styles.pill}
    >
      <Svg
        width={PILL_WIDTH}
        height={PILL_HEIGHT}
        style={StyleSheet.absoluteFill}
      >
        <Rect
          x={STROKE / 2}
          y={STROKE / 2}
          width={inner.width}
          height={inner.height}
          rx={inner.radius}
          fill={selected ? colors.elevated : "transparent"}
          stroke={colors.elevated}
          strokeWidth={STROKE}
        />
        {ratio > 0 && (
          <Rect
            x={STROKE / 2}
            y={STROKE / 2}
            width={inner.width}
            height={inner.height}
            rx={inner.radius}
            fill="none"
            stroke={MacroColors.calories}
            strokeWidth={STROKE}
            strokeDasharray={`${perimeter * ratio} ${perimeter}`}
            strokeLinecap="round"
          />
        )}
      </Svg>
      <AppText variant="bodyLarge" muted={!selected}>
        {day.dayOfMonth}
      </AppText>
      <AppText variant="body" muted>
        {day.shortName}
      </AppText>
      <View
        style={[
          styles.todayDot,
          { backgroundColor: isToday ? colors.text : "transparent" },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pill: {
    width: PILL_WIDTH,
    height: PILL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  todayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 2,
  },
});
