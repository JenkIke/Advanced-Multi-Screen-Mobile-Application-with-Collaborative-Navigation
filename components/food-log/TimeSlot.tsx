import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { MacroTotals } from "@/types";
import { MACRO_KEYS, MACRO_SUFFIX } from "@/utils/nutrition";

interface TimeSlotProps {
  time: string;
  totals?: MacroTotals;
  onAddPress: () => void;
  children?: ReactNode;
}

/**
 * One hour on the Food Log timeline: a time pill, an add button, the slot's
 * macro totals and the food cards logged at that time. The vertical
 * timeline rule runs down the left edge.
 */
export function TimeSlot({
  time,
  totals,
  onAddPress,
  children,
}: TimeSlotProps) {
  const { colors } = useAppTheme();

  return (
    <View>
      <View style={[styles.timeline, { backgroundColor: colors.border }]} />
      <View style={styles.header}>
        <View style={[styles.timePill, { backgroundColor: colors.elevated }]}>
          <AppText variant="bodyLarge">{time}</AppText>
        </View>
        <Pressable
          onPress={onAddPress}
          accessibilityRole="button"
          accessibilityLabel={`Add food at ${time}`}
          hitSlop={6}
          style={[styles.addButton, { backgroundColor: colors.elevated }]}
        >
          <MaterialCommunityIcons name="plus" size={22} color={colors.text} />
        </Pressable>
        {totals && (
          <View style={styles.totals}>
            {MACRO_KEYS.map((key) => (
              <View key={key} style={styles.total}>
                <AppText variant="bodyLarge">{Math.round(totals[key])}</AppText>
                <View
                  style={[styles.badge, { backgroundColor: colors.elevated }]}
                >
                  {key === "calories" ? (
                    <MaterialCommunityIcons
                      name="fire"
                      size={13}
                      color={colors.text}
                    />
                  ) : (
                    <AppText variant="micro" style={styles.badgeText}>
                      {MACRO_SUFFIX[key]}
                    </AppText>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      {children && (
        <View style={styles.entries}>
          <AppText variant="caption" style={styles.entryTime}>
            {time.replace(/^0/, "")}
          </AppText>
          <View style={styles.cards}>{children}</View>
        </View>
      )}
    </View>
  );
}

const TIME_COLUMN = 64;
/** Narrower than the pill so food cards get as much width as possible. */
const ENTRY_TIME_COLUMN = 48;

const styles = StyleSheet.create({
  timeline: {
    position: "absolute",
    left: ENTRY_TIME_COLUMN / 2,
    top: 0,
    bottom: 0,
    width: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  timePill: {
    width: TIME_COLUMN,
    marginLeft: ENTRY_TIME_COLUMN / 2 - TIME_COLUMN / 2,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: Radius.pill,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  totals: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.md,
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontWeight: "700",
  },
  entries: {
    flexDirection: "row",
    paddingBottom: Spacing.sm,
  },
  entryTime: {
    width: ENTRY_TIME_COLUMN,
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  cards: {
    flex: 1,
    gap: Spacing.sm + 2,
  },
});
