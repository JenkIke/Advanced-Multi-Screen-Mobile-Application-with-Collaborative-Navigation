import { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

interface ProgressBarProps {
  /** 0-1 */
  progress: number;
  color: string;
  height?: number;
  trackColor?: string;
  style?: StyleProp<ViewStyle>;
}

/** Horizontal bar that animates its fill whenever `progress` changes. */
export function ProgressBar({
  progress,
  color,
  height = 4,
  trackColor,
  style,
}: ProgressBarProps) {
  const { colors } = useAppTheme();
  const [fill] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fill, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [fill, progress]);

  const width = fill.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        styles.track,
        { height, backgroundColor: trackColor ?? colors.elevated },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
    >
      <Animated.View style={[styles.fill, { width, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
