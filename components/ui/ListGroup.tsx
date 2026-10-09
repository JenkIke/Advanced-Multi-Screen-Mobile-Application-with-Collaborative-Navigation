import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import type { IconName } from "@/types";

interface ListGroupProps {
  children: ReactNode;
  /** Draw the card background (More tab) or sit flush on the screen (Shortcuts sheet). */
  inset?: boolean;
}

/**
 * Rounded group of `ListRow`s with hairline separators indented past the
 * icon, as on the More tab. Separators are inserted here so rows stay simple.
 */
export function ListGroup({ children, inset = true }: ListGroupProps) {
  const { colors } = useAppTheme();
  // Children.toArray gives every row a stable key (its own key, or one
  // React derives from its position in the JSX), so no array index is needed.
  const rows = Children.toArray(children).filter(isValidElement);

  return (
    <View
      style={[inset && styles.inset, inset && { backgroundColor: colors.card }]}
    >
      {rows.map((row, index) => (
        <Fragment key={row.key}>
          {row}
          {index < rows.length - 1 && (
            <View
              style={[styles.separator, { backgroundColor: colors.border }]}
            />
          )}
        </Fragment>
      ))}
    </View>
  );
}

interface ListRowProps {
  label: string;
  icon: IconName;
  onPress?: () => void;
  /** `chevron` for in-app pages, `external` for links that leave the app. */
  accessory?: "chevron" | "external" | "none";
  /** Custom element on the right (e.g. a Switch); replaces the accessory. */
  trailing?: ReactNode;
}

export function ListRow({
  label,
  icon,
  onPress,
  accessory = "chevron",
  trailing,
}: ListRowProps) {
  const { colors } = useAppTheme();
  const accessoryIcon: IconName | null =
    accessory === "chevron"
      ? "chevron-right"
      : accessory === "external"
        ? "open-in-new"
        : null;

  const content = (
    <>
      <MaterialCommunityIcons
        name={icon}
        size={26}
        color={colors.text}
        style={styles.icon}
      />
      <AppText variant="bodyLarge" style={styles.label}>
        {label}
      </AppText>
      {trailing ??
        (accessoryIcon && (
          <MaterialCommunityIcons
            name={accessoryIcon}
            size={22}
            color={colors.secondaryText}
          />
        ))}
    </>
  );

  // Rows without an action (e.g. one holding a switch) are plain views so
  // their trailing control receives touches and is not nested in a button.
  if (!onPress) {
    return <View style={styles.row}>{content}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        pressed && { backgroundColor: colors.elevated },
      ]}
    >
      {content}
    </Pressable>
  );
}

const ICON_COLUMN = 56;

const styles = StyleSheet.create({
  inset: {
    borderRadius: Radius.lg,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 64,
    paddingHorizontal: Spacing.lg + 2,
  },
  icon: {
    width: ICON_COLUMN - Spacing.lg,
  },
  label: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: ICON_COLUMN + Spacing.lg,
  },
});
