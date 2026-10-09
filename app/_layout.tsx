import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  Stack,
  type Theme,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { getFeature } from "@/assets/demo-data/features";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { FoodLogProvider } from "@/context/FoodLogContext";
import { ThemeProvider, useAppTheme } from "@/context/ThemeContext";
import { MAX_CONTENT_WIDTH } from "@/hooks/useContentWidth";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <FoodLogProvider>
            <RootNavigator />
          </FoodLogProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

/**
 * Root stack. The tab navigator is one screen in this stack, and every
 * detail page (food, insight, feature, account...) is pushed on top of it so
 * it covers the tab bar, as in MacroFactor. `Stack.Protected` swaps between
 * the signed-in app and the mock sign-in screen.
 */
function RootNavigator() {
  const { user } = useAuth();
  const { isDark, colors } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWide = width > MAX_CONTENT_WIDTH;

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme: Theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.text,
      background: colors.background,
      card: colors.header,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* On wide screens the app renders as a centred, bordered phone-width column. */}
      <View style={[styles.frame, { backgroundColor: colors.frame }]}>
        <View
          style={[
            styles.column,
            { backgroundColor: colors.background },
            isWide && [styles.bordered, { borderColor: colors.border }],
          ]}
        >
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.header },
              headerTintColor: colors.text,
              headerShadowVisible: false,
              headerBackButtonDisplayMode: "minimal",
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Protected guard={user !== null}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="shortcuts"
                options={{
                  presentation: "transparentModal",
                  // The sheet animates itself (slide + backdrop fade).
                  animation: "none",
                  headerShown: false,
                  contentStyle: { backgroundColor: "transparent" },
                }}
              />
              <Stack.Screen name="search" options={{ title: "Search" }} />
              <Stack.Screen name="food/[id]" options={{ title: "Food" }} />
              <Stack.Screen
                name="insights/index"
                options={{ title: "Insights & Analytics" }}
              />
              <Stack.Screen
                name="insights/[metric]"
                options={{ title: "Insight" }}
              />
              <Stack.Screen
                name="feature/[slug]"
                // Resolve the title from the route param here, not inside the
                // screen, so the header shows it on the first frame.
                options={({ route }) => ({
                  title: featureTitle(route.params),
                })}
              />
              <Stack.Screen name="account" options={{ title: "Account" }} />
            </Stack.Protected>

            <Stack.Protected guard={user === null}>
              <Stack.Screen
                name="sign-in"
                options={{ headerShown: false, animation: "fade" }}
              />
            </Stack.Protected>
          </Stack>
        </View>
      </View>
    </NavigationThemeProvider>
  );
}

/** Header title for `feature/[slug]`, or "Not Found" for an unknown slug. */
function featureTitle(params: object | undefined): string {
  const slug =
    params && "slug" in params && typeof params.slug === "string"
      ? params.slug
      : undefined;
  return (slug && getFeature(slug)?.title) || "Not Found";
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: "center",
  },
  column: {
    flex: 1,
    width: "100%",
    maxWidth: MAX_CONTENT_WIDTH,
    overflow: "hidden",
  },
  bordered: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
});
