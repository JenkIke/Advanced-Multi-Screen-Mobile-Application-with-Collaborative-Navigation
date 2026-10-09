import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

interface PageDotsProps {
  /** One stable id per page, used as each dot's key. */
  pageIds: readonly string[];
  activeIndex: number;
}

/** Pager indicator under swipeable headers (Dashboard, Food Log). */
export function PageDots({ pageIds, activeIndex }: PageDotsProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={styles.row}
      accessibilityLabel={`Page ${activeIndex + 1} of ${pageIds.length}`}
    >
      {pageIds.map((id, index) => (
        <View
          key={id}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === activeIndex ? colors.text : colors.elevated,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
});
