import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { AppText } from "@/components/ui/AppText";
import { PillButton } from "@/components/ui/PillButton";
import { Screen } from "@/components/ui/Screen";
import { MacroColors } from "@/constants/Colors";
import { FontSize, InputHeight, Radius, Spacing } from "@/constants/Layout";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";
import { DEMO_ACCOUNT } from "@/data/account";
import type { IconName } from "@/types";

/**
 * Mock sign-in (bonus). Fields are pre-filled with a demo account so the
 * app can be reviewed in one tap. Signing in flips the `Stack.Protected`
 * guard in the root layout, which swaps this screen for the tabs.
 */
export default function SignInScreen() {
  const { colors } = useAppTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>(DEMO_ACCOUNT.email);
  const [password, setPassword] = useState<string>(DEMO_ACCOUNT.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSignIn() {
    setError(signIn(email, password));
  }

  return (
    <Screen
      backgroundColor={colors.background}
      edges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.root}
      >
        <View style={styles.brand}>
          {/* IMAGE PLACEHOLDER: the MacroFactor logo mark would sit here. */}
          <View style={styles.logo}>
            {(["calories", "protein", "fat", "carbs"] as const).map(
              (key, index) => (
                <View
                  key={key}
                  style={[
                    styles.logoBar,
                    {
                      height: 22 + index * 10,
                      backgroundColor: MacroColors[key],
                    },
                  ]}
                />
              ),
            )}
          </View>
          <AppText variant="wordmark">MACROFACTOR</AppText>
          <AppText variant="bodyLarge" muted>
            Sign in to continue
          </AppText>
        </View>

        <View style={styles.form}>
          <Field
            icon="email-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Field
            icon="lock-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={!showPassword}
            trailing={
              <Pressable
                onPress={() => setShowPassword((value) => !value)}
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
                hitSlop={8}
              >
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={colors.secondaryText}
                />
              </Pressable>
            }
          />
          {error && (
            <AppText variant="body" color={colors.danger}>
              {error}
            </AppText>
          )}
          <PillButton
            label="Sign In"
            variant="primary"
            onPress={handleSignIn}
            style={styles.button}
          />
          <AppText variant="caption" muted style={styles.hint}>
            Demo only: any valid email and a 6+ character password will work.
          </AppText>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

interface FieldProps {
  icon: IconName;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address";
  secureTextEntry?: boolean;
  trailing?: React.ReactNode;
}

/** Text input styled as a rounded field; only the sign-in form needs it. */
function Field({ icon, trailing, ...inputProps }: FieldProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.field, { backgroundColor: colors.elevated }]}>
      <MaterialCommunityIcons
        name={icon}
        size={22}
        color={colors.secondaryText}
      />
      <TextInput
        {...inputProps}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={colors.secondaryText}
        accessibilityLabel={inputProps.placeholder}
        style={[styles.input, { color: colors.text }]}
      />
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.xl,
    gap: Spacing.xxl,
  },
  brand: {
    alignItems: "center",
    gap: Spacing.sm,
  },
  logo: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    marginBottom: Spacing.md,
  },
  logoBar: {
    width: 12,
    borderRadius: 3,
  },
  form: {
    gap: Spacing.md,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    height: InputHeight.form,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
  },
  input: {
    flex: 1,
    fontSize: FontSize.bodyMedium,
  },
  button: {
    marginTop: Spacing.sm,
  },
  hint: {
    textAlign: "center",
  },
});
