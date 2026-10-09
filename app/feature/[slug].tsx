import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { getFeature } from "@/assets/demo-data/features";
import { AppText } from "@/components/ui/AppText";
import { ListGroup, ListRow } from "@/components/ui/ListGroup";
import { Screen } from "@/components/ui/Screen";
import { Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

/**
 * Generic secondary page for settings rows, Strategy actions and Shortcuts.
 * The `slug` parameter selects the content from `FEATURES`.
 */
export default function FeatureScreen() {
  const { colors } = useAppTheme();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const feature = getFeature(slug);

  if (!feature) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <AppText variant="bodyLarge" muted>
          This page does not exist.
        </AppText>
      </View>
    );
  }

  return (
    <Screen
      edges={["left", "right", "bottom"]}
      backgroundColor={colors.background}
    >
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <View style={styles.hero}>
          <View
            style={[styles.iconCircle, { backgroundColor: colors.elevated }]}
          >
            <MaterialCommunityIcons
              name={feature.icon}
              size={44}
              color={colors.text}
            />
          </View>
          <AppText variant="heading">{feature.title}</AppText>
          <AppText variant="bodyLarge" muted style={styles.description}>
            {feature.description}
          </AppText>
        </View>

        <ListGroup>
          {feature.highlights.map((highlight) => (
            <ListRow
              key={highlight.id}
              label={highlight.label}
              icon="check-circle-outline"
              accessory="none"
            />
          ))}
        </ListGroup>

        <AppText variant="caption" muted style={styles.note}>
          This screen is a simplified placeholder in the MacroFactor recreation.
        </AppText>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  missing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  description: {
    textAlign: "center",
  },
  note: {
    textAlign: "center",
  },
});
