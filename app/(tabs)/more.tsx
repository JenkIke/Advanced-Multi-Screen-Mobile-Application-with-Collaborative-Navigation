import { Link } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { ProfileHeader } from "@/components/more/ProfileHeader";
import { AppText } from "@/components/ui/AppText";
import { ListGroup, ListRow } from "@/components/ui/ListGroup";
import { PillButton } from "@/components/ui/PillButton";
import { Screen } from "@/components/ui/Screen";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Spacing } from "@/constants/Layout";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";

/**
 * More tab: profile header (links to `/account`), settings lists whose rows
 * open `/feature/[slug]`, the Dark Mode switch, and sign out.
 */
export default function MoreScreen() {
  const { colors, isDark, setIsDark } = useAppTheme();
  const { user, signOut } = useAuth();

  return (
    <Screen>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.header, { backgroundColor: colors.header }]}>
          <AppText variant="wordmark">MORE</AppText>
          <Link href="/account" asChild>
            <ProfileHeader
              name={user?.name ?? "Guest"}
              subtitle={`Member Since ${user?.memberSince ?? "-"}`}
            />
          </Link>
        </View>

        <View style={styles.body}>
          <AppText variant="heading">General</AppText>
          <ListGroup>
            <Link href="/account" asChild>
              <ListRow label="Account" icon="face-man-outline" />
            </Link>
            <Link href="/feature/subscription" asChild>
              <ListRow label="Subscription" icon="tag-heart" />
            </Link>
            <Link href="/feature/integrations" asChild>
              <ListRow label="Integrations" icon="sync" />
            </Link>
            <Link href="/feature/units" asChild>
              <ListRow label="Units" icon="ruler" />
            </Link>
            <Link href="/feature/language" asChild>
              <ListRow label="Language" icon="web" accessory="external" />
            </Link>
          </ListGroup>

          <AppText variant="heading" style={styles.sectionTitle}>
            Feature Settings
          </AppText>
          <ListGroup>
            <Link href="/feature/dashboard-settings" asChild>
              <ListRow label="Dashboard" icon="view-grid-plus" />
            </Link>
            <Link href="/feature/food-log-settings" asChild>
              <ListRow label="Food Log" icon="food-apple" />
            </Link>
            <Link href="/feature/shortcuts-settings" asChild>
              <ListRow label="Shortcuts" icon="gesture" />
            </Link>
            <ListRow
              label="Dark Mode"
              icon="theme-light-dark"
              trailing={
                <ToggleSwitch
                  value={isDark}
                  onValueChange={setIsDark}
                  accessibilityLabel="Dark mode"
                />
              }
            />
          </ListGroup>

          <AppText variant="heading" style={styles.sectionTitle}>
            Support
          </AppText>
          <ListGroup>
            <Link href="/feature/help" asChild>
              <ListRow
                label="Help Center"
                icon="help-circle-outline"
                accessory="external"
              />
            </Link>
          </ListGroup>

          <PillButton
            label="Sign Out"
            icon="logout"
            onPress={signOut}
            style={styles.signOut}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
    gap: Spacing.xl,
  },
  body: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  sectionTitle: {
    marginTop: Spacing.lg,
  },
  signOut: {
    marginTop: Spacing.xl,
    alignSelf: "center",
  },
});
