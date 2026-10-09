import { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Radius } from "@/constants/Layout";
import { useAppTheme } from "@/context/ThemeContext";

interface SegmentedControlProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

/**
 * Pill toggle ("Consumed | Remaining") with a thumb that springs between
 * options (bonus: simple animation).
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const { colors } = useAppTheme();
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [translateX] = useState(() => new Animated.Value(0));
  const selectedIndex = Math.max(options.indexOf(value), 0);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * segmentWidth,
      useNativeDriver: true,
      bounciness: 6,
      speed: 16,
    }).start();
  }, [selectedIndex, segmentWidth, translateX]);

  function handleLayout(event: LayoutChangeEvent) {
    setSegmentWidth(event.nativeEvent.layout.width / options.length);
  }

  return (
    <View
      style={[styles.track, { backgroundColor: colors.elevated }]}
      onLayout={handleLayout}
      accessibilityRole="tablist"
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            styles.thumb,
            {
              width: segmentWidth,
              backgroundColor: colors.inverse,
              transform: [{ translateX }],
            },
          ]}
        />
      )}
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={styles.segment}
          >
            <AppText
              variant="body"
              color={selected ? colors.inverseText : colors.text}
            >
              {option}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: Radius.pill,
    overflow: "hidden",
  },
  thumb: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: Radius.pill,
  },
  segment: {
    // Equal fixed widths keep the sliding thumb aligned with every option.
    width: 108,
    paddingVertical: 8,
    alignItems: "center",
  },
});
