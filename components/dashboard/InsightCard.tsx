import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { Sparkline } from "@/components/charts/Sparkline";
import { AppText } from "@/components/ui/AppText";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { Insight } from "@/types";

/**
 * Remaining Card props (`onPress`, `href`, `role`...) are passed through so
 * the card can sit inside `<Link asChild>`, which supplies them.
 */
interface InsightCardProps extends Omit<
  ComponentProps<typeof Card>,
  "children"
> {
  insight: Insight;
}

/** Tile in the "Insights & Analytics" grid: title, mini chart, headline value. */
export function InsightCard({ insight, style, ...rest }: InsightCardProps) {
  const { colors } = useAppTheme();

  return (
    <Card
      accessibilityLabel={`${insight.title} insight`}
      {...rest}
      style={[styles.card, style]}
    >
      <AppText variant="titleSmall" numberOfLines={1} adjustsFontSizeToFit>
        {insight.title}
      </AppText>
      <AppText variant="bodyLarge" muted>
        {insight.subtitle}
      </AppText>

      <View style={styles.chart}>
        {insight.kind === "line" ? (
          <Sparkline
            data={insight.series}
            color={insight.color}
            showBand={insight.key === "expenditure"}
          />
        ) : (
          <ProgressBar
            progress={insight.series[0]?.value ?? 0}
            color={insight.color}
            height={26}
          />
        )}
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <AppText variant="titleLarge">
          {insight.value} <AppText variant="bodyLarge">{insight.unit}</AppText>
        </AppText>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.secondaryText}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg + 4,
  },
  chart: {
    height: 64,
    justifyContent: "center",
    marginVertical: Spacing.md,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.md,
  },
});
