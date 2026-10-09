import { ScrollView, StyleSheet, View } from "react-native";

import { ActionRow } from "@/components/strategy/ActionRow";
import { GoalHistoryCard } from "@/components/strategy/GoalHistoryCard";
import { GoalStats } from "@/components/strategy/GoalStats";
import { ProgramWeekChart } from "@/components/strategy/ProgramWeekChart";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import { CURRENT_WEEK, DAILY_TARGETS } from "@/data/foodLog";
import { CURRENT_GOAL, CURRENT_PROGRAM, GOAL_HISTORY } from "@/data/strategy";

/** The coached program uses the same targets every day of the week. */
const PROGRAM_TARGETS = Object.fromEntries(
  CURRENT_WEEK.map((day) => [day.date, DAILY_TARGETS]),
);

/**
 * Strategy tab: the in-progress coached program and weight goal, each with
 * action buttons that open `/feature/[slug]`, followed by Goal History.
 */
export default function StrategyScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen backgroundColor={colors.background}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="heading" style={styles.sectionTitle}>
          In Progress
        </AppText>

        <Card style={styles.card}>
          <View style={styles.cardBody}>
            <AppText variant="title">{CURRENT_PROGRAM.title}</AppText>
            <AppText variant="bodyLarge" muted style={styles.range}>
              {CURRENT_PROGRAM.range}
            </AppText>
            <ProgramWeekChart
              days={CURRENT_WEEK}
              targetsByDate={PROGRAM_TARGETS}
            />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <ActionRow
            actions={[
              {
                id: "new-program",
                label: "New Program",
                icon: "refresh",
                href: "/feature/new-program",
              },
              {
                id: "edit-program",
                label: "Edit Program",
                icon: "pencil",
                href: "/feature/edit-program",
              },
            ]}
          />
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardBody}>
            <AppText variant="title">{CURRENT_GOAL.title}</AppText>
            <AppText variant="bodyLarge" muted style={styles.range}>
              {CURRENT_GOAL.range}
            </AppText>
            <GoalStats
              stats={[
                {
                  value: String(CURRENT_GOAL.goalWeight),
                  unit: "lb",
                  id: "goal-weight",
                  label: "Goal Weight",
                },
                {
                  value: CURRENT_GOAL.weeklyRateLb.toFixed(2),
                  unit: "lb",
                  id: "goal-rate-lb",
                  label: "Goal Rate",
                },
                {
                  value: CURRENT_GOAL.weeklyRatePercent.toFixed(1),
                  unit: "%",
                  id: "goal-rate-percent",
                  label: "Goal Rate",
                },
              ]}
            />
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <ActionRow
            actions={[
              {
                id: "new-goal",
                label: "New Goal",
                icon: "plus",
                href: "/feature/new-goal",
              },
              {
                id: "edit-goal",
                label: "Edit Goal",
                icon: "pencil",
                href: "/feature/edit-goal",
              },
              {
                id: "reopen-goal",
                label: "Reopen Previous",
                icon: "undo-variant",
                href: "/feature/reopen-goal",
              },
            ]}
          />
        </Card>

        <AppText
          variant="heading"
          style={[styles.sectionTitle, styles.historyTitle]}
        >
          Goal History
        </AppText>
        <View style={styles.history}>
          {GOAL_HISTORY.map((goal) => (
            <GoalHistoryCard key={goal.id} goal={goal} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  sectionTitle: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  historyTitle: {
    marginTop: Spacing.xl,
  },
  card: {
    paddingHorizontal: 0,
    paddingBottom: Spacing.lg,
  },
  cardBody: {
    paddingHorizontal: Spacing.lg,
  },
  range: {
    marginBottom: Spacing.lg,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: Spacing.lg,
    marginVertical: Spacing.lg,
  },
  history: {
    gap: Spacing.md,
  },
});
