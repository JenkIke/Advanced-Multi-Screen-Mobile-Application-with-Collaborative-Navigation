import type { PropsWithChildren } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { useAppTheme } from "@/context/ThemeContext";

interface ScreenProps extends PropsWithChildren {
  /**
   * Safe-area edges to pad. Tab screens pad the top and sides (notch, status
   * bar, landscape cut-outs); the tab bar pads the bottom home indicator.
   * Stack screens pad the sides and bottom; their native header already
   * sits below the status bar.
   */
  edges?: Edge[];
  /** Background behind the status bar; defaults to the raised header colour. */
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

/** Root wrapper for every route: applies safe-area insets and theme background. */
export function Screen({
  children,
  edges = ["top", "left", "right"],
  backgroundColor,
  style,
}: ScreenProps) {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.root,
        { backgroundColor: backgroundColor ?? colors.header },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
