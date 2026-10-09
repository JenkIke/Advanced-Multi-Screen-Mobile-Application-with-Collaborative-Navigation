import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { GoalHistoryItem } from "@/types";

interface GoalHistoryCardProps {
  goal: GoalHistoryItem;
}

/**
 * One goal in the Strategy tab's Goal History, laid out like MacroFactor:
 * date range, "start to end" weights, and the goal type with a status icon
 * (hourglass while in progress, check mark once finished).
 */
export function GoalHistoryCard({ goal }: GoalHistoryCardProps) {
  const { colors } = useAppTheme();
  const inProgress = goal.endWeight === undefined;

  return (
    <Card style={styles.card}>
      <View style={styles.text}>
        <AppText variant="body" muted numberOfLines={1} adjustsFontSizeToFit>
          {goal.range}
        </AppText>
        <AppText variant="title" style={styles.weights}>
          {goal.startWeight.toFixed(1)} lb
          {!inProgress && (
            <>
              <AppText variant="bodyLarge" muted>
                {"  to  "}
              </AppText>
              {goal.endWeight?.toFixed(1)} lb
            </>
          )}
        </AppText>
      </View>
      <View style={styles.status}>
        <AppText variant="body" muted>
          {goal.type}
        </AppText>
        <MaterialCommunityIcons
          name={inProgress ? "timer-sand" : "check-circle"}
          size={24}
          color={colors.text}
          accessibilityLabel={inProgress ? "In progress" : "Completed"}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg + 2,
  },
  text: {
    flex: 1,
    gap: 4,
    marginRight: Spacing.sm,
  },
  weights: {
    fontSize: 21,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm + 2,
  },
});
