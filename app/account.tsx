import { ScrollView, StyleSheet, View } from "react-native";

import { ProfileHeader } from "@/components/more/ProfileHeader";
import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/ui/Screen";
import { ListGroup, ListRow } from "@/components/ui/ListGroup";
import { PillButton } from "@/components/ui/PillButton";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Spacing } from "@/constants/Layout";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";

/** Mock profile screen (bonus): account details, theme switch and sign out. */
export default function AccountScreen() {
  const { colors, isDark, setIsDark } = useAppTheme();
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const details = [
    { id: "name", label: "Name", value: user.name, icon: "account-outline" },
    { id: "email", label: "Email", value: user.email, icon: "email-outline" },
    {
      id: "member-since",
      label: "Member Since",
      value: user.memberSince,
      icon: "calendar-check-outline",
    },
  ] as const;

  return (
    <Screen
      edges={["left", "right", "bottom"]}
      backgroundColor={colors.background}
    >
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <ProfileHeader name={user.name} subtitle={user.email} />

        <ListGroup>
          {details.map((detail) => (
            <ListRow
              key={detail.id}
              label={detail.label}
              icon={detail.icon}
              trailing={
                <AppText
                  variant="body"
                  muted
                  numberOfLines={1}
                  style={styles.value}
                >
                  {detail.value}
                </AppText>
              }
            />
          ))}
        </ListGroup>

        <ListGroup>
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

        <View style={styles.actions}>
          <PillButton label="Sign Out" icon="logout" onPress={signOut} />
        </View>
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
  value: {
    maxWidth: "55%",
  },
  actions: {
    alignItems: "center",
  },
});
