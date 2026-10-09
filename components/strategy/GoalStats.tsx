import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";

export interface GoalStat {
  id: string;
  value: string;
  unit: string;
  label: string;
}

interface GoalStatsProps {
  stats: GoalStat[];
}

/** Three large centred figures (Goal Weight, Goal Rate lb, Goal Rate %). */
export function GoalStats({ stats }: GoalStatsProps) {
  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View key={stat.id} style={styles.stat}>
          <AppText variant="display" style={styles.value}>
            {stat.value}
            <AppText variant="title" muted>
              {` ${stat.unit}`}
            </AppText>
          </AppText>
          <AppText variant="bodyLarge" muted>
            {stat.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  value: {
    fontSize: 32,
    fontWeight: "500",
  },
});
