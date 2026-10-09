import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter, type Href } from "expo-router";
import { useEffect, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ShortcutTile } from "@/components/shortcuts/ShortcutTile";
import { AppText } from "@/components/ui/AppText";
import { ListGroup, ListRow } from "@/components/ui/ListGroup";
import { Radius, Spacing } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";
import { SHORTCUT_ROWS, SHORTCUT_TILES } from "@/data/shortcuts";

/** Drag distance past which releasing the grabber dismisses the sheet. */
const DISMISS_DISTANCE = 120;

/**
 * Shortcuts bottom sheet opened by the centre "+" tab button. Presented as a
 * transparent modal on the root stack; the slide-up, backdrop fade and
 * drag-to-dismiss are animated here (bonus: animations).
 */
export default function ShortcutsSheet() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { height } = useWindowDimensions();

  const [translateY] = useState(() => new Animated.Value(height));
  const [backdropOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
        speed: 14,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity]);

  function close(afterClose?: () => void) {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.back();
      afterClose?.();
    });
  }

  function openShortcut(href: Href) {
    close(() => router.push(href));
  }

  const [panResponder] = useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 4,
      onPanResponderMove: (_, gesture) =>
        translateY.setValue(Math.max(gesture.dy, 0)),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > DISMISS_DISTANCE) {
          close();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  );

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: colors.overlay, opacity: backdropOpacity },
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => close()}
          accessibilityLabel="Close shortcuts"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: colors.header,
            paddingBottom: insets.bottom + Spacing.md,
            maxHeight: height - insets.top - 120,
            transform: [{ translateY }],
          },
        ]}
      >
        <View {...panResponder.panHandlers}>
          <View
            style={[styles.grabber, { backgroundColor: colors.secondaryText }]}
          />
          <View style={styles.titleRow}>
            <Pressable
              onPress={() => close()}
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={10}
            >
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={colors.text}
              />
            </Pressable>
            <AppText variant="title" style={styles.title}>
              Shortcuts
            </AppText>
            <Pressable
              onPress={() =>
                openShortcut({
                  pathname: "/feature/[slug]",
                  params: { slug: "shortcuts-settings" },
                })
              }
              accessibilityRole="button"
              accessibilityLabel="Customize shortcuts"
              hitSlop={10}
            >
              <MaterialCommunityIcons
                name="tune-variant"
                size={28}
                color={colors.text}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.tiles}>
            {SHORTCUT_TILES.map((tile) => (
              <ShortcutTile
                key={tile.key}
                label={tile.label}
                icon={tile.icon}
                onPress={() => openShortcut(tile.href)}
              />
            ))}
          </View>
          <ListGroup inset={false}>
            {SHORTCUT_ROWS.map((row) => (
              <ListRow
                key={row.key}
                label={row.label}
                icon={row.icon}
                onPress={() => openShortcut(row.href)}
              />
            ))}
          </ListGroup>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    overflow: "hidden",
  },
  grabber: {
    alignSelf: "center",
    width: 44,
    height: 5,
    borderRadius: 3,
    marginTop: Spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontWeight: "700",
  },
  divider: {
    height: 2,
  },
  body: {
    paddingTop: Spacing.xl,
    gap: Spacing.lg,
  },
  tiles: {
    flexDirection: "row",
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.sm,
  },
});
