import { Link, type Href } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { PillButton } from "@/components/ui/PillButton";
import { Spacing } from "@/constants/Layout";
import type { IconName } from "@/types";

export interface StrategyAction {
  id: string;
  label: string;
  icon: IconName;
  href: Href;
}

interface ActionRowProps {
  actions: StrategyAction[];
}

/**
 * Horizontally scrolling row of grey pill buttons at the bottom of a
 * Strategy card. It scrolls because, as in the reference, the last button
 * ("Reopen Previous") runs off the edge of the screen.
 */
export function ActionRow({ actions }: ActionRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {actions.map((action) => (
        <Link key={action.id} href={action.href} asChild>
          <PillButton label={action.label} icon={action.icon} />
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
});
