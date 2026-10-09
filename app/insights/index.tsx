import { Link } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

import { InsightCard } from "@/components/dashboard/InsightCard";
import { Screen } from "@/components/ui/Screen";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import { INSIGHTS } from "@/assets/demo-data/insights";

/** "See All" from the Dashboard: every insight as a full-width card. */
export default function InsightsScreen() {
  const { colors } = useAppTheme();

  return (
    <Screen
      edges={["left", "right", "bottom"]}
      backgroundColor={colors.background}
    >
      <FlatList
        data={INSIGHTS}
        keyExtractor={(insight) => insight.key}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={`/insights/${item.key}`} asChild>
            <InsightCard insight={item} />
          </Link>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
});
