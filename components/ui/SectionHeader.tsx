import { Link, type Href } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Spacing } from "@/constants/Layout";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  /** Where the action links to. */
  actionHref?: Href;
}

/** Bold section title with an optional underlined action ("See All"). */
export function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <AppText variant="heading">{title}</AppText>
      {actionLabel && actionHref && (
        <Link href={actionHref} asChild>
          <Pressable accessibilityRole="link" hitSlop={8}>
            <AppText variant="bodyLarge" style={styles.action}>
              {actionLabel}
            </AppText>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  action: {
    textDecorationLine: "underline",
  },
});
