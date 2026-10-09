import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import type { BottomTabBarProps } from "expo-router/js-tabs";
import { useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { useAppTheme } from "@/context/ThemeContext";

/** Index in the tab row where the floating "+" button sits (between Food Log and Strategy). */
const CENTER_SLOT = 2;

/**
 * Custom bottom bar: four route tabs plus a centre "+" button that is not a
 * tab. Pressing it pushes the Shortcuts sheet on the root stack instead of
 * switching tabs, matching MacroFactor's behaviour.
 */
export function MacroTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const { colors } = useAppTheme();

  const tabs = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const focused = state.index === index;
    // Tint colours come from the Tabs `screenOptions` in app/(tabs)/_layout.tsx.
    const tint = focused
      ? options.tabBarActiveTintColor
      : options.tabBarInactiveTintColor;
    const color = typeof tint === "string" ? tint : colors.text;
    const label = options.title ?? route.name;

    function handlePress() {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });
      if (!focused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    }

    return (
      <Pressable
        key={route.key}
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={label}
        style={styles.tab}
      >
        {options.tabBarIcon?.({ focused, color, size: 30 })}
        <AppText variant="caption" color={color}>
          {label}
        </AppText>
      </Pressable>
    );
  });

  tabs.splice(CENTER_SLOT, 0, <AddButton key="add" />);

  // Background and border also come from the Tabs `screenOptions`.
  const barStyle =
    descriptors[state.routes[state.index].key].options.tabBarStyle;

  return (
    <Animated.View
      style={[
        styles.bar,
        barStyle,
        { paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      {tabs}
    </Animated.View>
  );
}

/** Kept in this file: it is only ever used by the tab bar. */
function AddButton() {
  const { colors } = useAppTheme();
  const [scale] = useState(() => new Animated.Value(1));

  function animateTo(toValue: number) {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 10,
    }).start();
  }

  return (
    <View style={styles.tab}>
      <Link href="/shortcuts" asChild>
        <Pressable
          onPressIn={() => animateTo(0.88)}
          onPressOut={() => animateTo(1)}
          accessibilityRole="button"
          accessibilityLabel="Open shortcuts"
        >
          <Animated.View
            style={[
              styles.addButton,
              { backgroundColor: colors.inverse, transform: [{ scale }] },
            ]}
          >
            <MaterialCommunityIcons
              name="plus"
              size={34}
              color={colors.inverseText}
            />
          </Animated.View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
