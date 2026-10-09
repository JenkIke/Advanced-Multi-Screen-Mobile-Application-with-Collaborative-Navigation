import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { Sparkline } from "@/components/charts/Sparkline";
import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import { getInsight } from "@/utils/lookups";

/** Detail page for one Dashboard insight; the metric key is a route parameter. */
export default function InsightDetailScreen() {
  const { colors } = useAppTheme();
  const { metric } = useLocalSearchParams<{ metric: string }>();
  const insight = getInsight(metric);

  if (!insight) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: "Insight" }} />
        <AppText variant="bodyLarge" muted>
          Unknown insight &quot;{metric}&quot;.
        </AppText>
      </View>
    );
  }

  const first = insight.series[0]?.value ?? 0;
  const last = insight.series.at(-1)?.value ?? 0;
  // Guard the division so an empty series shows 0 rather than NaN.
  const average =
    insight.series.length > 0
      ? insight.series.reduce((sum, point) => sum + point.value, 0) /
        insight.series.length
      : 0;
  const change = last - first;

  return (
    <Screen
      edges={["left", "right", "bottom"]}
      backgroundColor={colors.background}
    >
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <Stack.Screen options={{ title: insight.title }} />

        <Card style={styles.card}>
          <AppText variant="bodyLarge" muted>
            {insight.subtitle}
          </AppText>
          <AppText variant="display">
            {insight.value} <AppText variant="title">{insight.unit}</AppText>
          </AppText>
          {insight.kind === "line" ? (
            <Sparkline
              data={insight.series}
              color={insight.color}
              height={160}
              dotRadius={6}
              showBand={insight.key === "expenditure"}
            />
          ) : (
            <ProgressBar
              progress={first}
              color={insight.color}
              height={36}
              style={styles.progress}
            />
          )}
        </Card>

        {insight.kind === "line" && (
          <View style={styles.stats}>
            <Stat
              label="7-day change"
              value={`${change > 0 ? "+" : ""}${change.toFixed(1)} ${insight.unit}`}
            />
            <Stat
              label="Average"
              value={`${average.toFixed(1)} ${insight.unit}`}
            />
          </View>
        )}

        <Card>
          <AppText variant="bodyLarge">{insight.description}</AppText>
        </Card>

        {insight.kind === "line" && (
          <Card style={styles.card}>
            <AppText variant="title">Daily Values</AppText>
            {insight.series.map((point) => (
              <View
                key={point.id}
                style={[styles.dailyRow, { borderTopColor: colors.border }]}
              >
                <AppText variant="bodyLarge" muted>
                  {point.label}
                </AppText>
                <AppText variant="bodyLarge">
                  {point.value} {insight.unit}
                </AppText>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>
    </Screen>
  );
}

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <Card style={styles.stat}>
      <AppText variant="body" muted>
        {label}
      </AppText>
      <AppText variant="title">{value}</AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  missing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    gap: Spacing.md,
  },
  progress: {
    borderRadius: 6,
  },
  stats: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  stat: {
    flex: 1,
    gap: Spacing.xs,
  },
  dailyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.md,
  },
});
