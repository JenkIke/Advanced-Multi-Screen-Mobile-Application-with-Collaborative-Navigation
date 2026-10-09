import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import type { Food } from "@/types";

interface FoodIconProps {
  food: Pick<Food, "icon" | "iconColor">;
  size?: number;
}

/**
 * IMAGE PLACEHOLDER: MacroFactor renders a full-colour illustration for each
 * food (yogurt cup, granola, apple...). This recreation does not ship or
 * download images, so a tinted Expo icon on a soft tile stands in. Replace
 * the inner icon with <Image source={...} /> if artwork is added.
 */
export function FoodIcon({ food, size = 64 }: FoodIconProps) {
  return (
    <View
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: size / 3,
          backgroundColor: `${food.iconColor}26`,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={food.icon}
        size={size * 0.62}
        color={food.iconColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    alignItems: "center",
    justifyContent: "center",
  },
});
