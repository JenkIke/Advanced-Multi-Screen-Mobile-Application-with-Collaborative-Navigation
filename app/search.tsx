import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/ui/Screen";
import { FoodIcon } from "@/components/ui/FoodIcon";
import { FontSize, InputHeight, Radius, Spacing } from "@/constants/Layout";
import { useFoodLog } from "@/context/FoodLogContext";
import { useAppTheme } from "@/context/ThemeContext";
import { CURRENT_WEEK, DEFAULT_SLOT_TIME, TODAY } from "@/data/foodLog";
import { searchFoods } from "@/utils/lookups";
import type { Food } from "@/types";

// Route params stay a `type` alias: Expo Router's typed params need an index-signature-compatible type.
type SearchParams = {
  /** ISO date and time slot to log into; default to today at 06:00. */
  date?: string;
  time?: string;
  /** `history` limits results to foods already in the log ("Your Foods"). */
  scope?: "history";
};

export default function SearchScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { getEntries } = useFoodLog();
  const {
    date = TODAY,
    time = DEFAULT_SLOT_TIME,
    scope,
  } = useLocalSearchParams<SearchParams>();
  const [query, setQuery] = useState("");

  const isHistory = scope === "history";
  const historyIds = new Set(
    CURRENT_WEEK.flatMap((day) =>
      getEntries(day.date).map((entry) => entry.foodId),
    ),
  );
  const results = searchFoods(query).filter(
    (food) => !isHistory || historyIds.has(food.id),
  );

  function openFood(food: Food) {
    router.push({
      pathname: "/food/[id]",
      params: { id: food.id, date, time },
    });
  }

  return (
    <Screen
      edges={["left", "right", "bottom"]}
      backgroundColor={colors.background}
    >
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <Stack.Screen
          options={{ title: isHistory ? "Your Foods" : "Search" }}
        />

        <View style={[styles.inputRow, { backgroundColor: colors.elevated }]}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={colors.secondaryText}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for a food"
            placeholderTextColor={colors.secondaryText}
            autoFocus={!isHistory}
            autoCorrect={false}
            returnKeyType="search"
            style={[styles.input, { color: colors.text }]}
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery("")}
              accessibilityLabel="Clear search"
              hitSlop={8}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={colors.secondaryText}
              />
            </Pressable>
          )}
        </View>

        <AppText variant="caption" muted style={styles.context}>
          Logging to {date === TODAY ? "today" : date} at {time}
        </AppText>

        <FlatList
          data={results}
          keyExtractor={(food) => food.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => (
            <View
              style={[styles.separator, { backgroundColor: colors.border }]}
            />
          )}
          ListEmptyComponent={
            <AppText variant="body" muted style={styles.empty}>
              No foods match &quot;{query}&quot;.
            </AppText>
          }
          renderItem={({ item }) => (
            <SearchResult food={item} onPress={() => openFood(item)} />
          )}
        />
      </View>
    </Screen>
  );
}

interface SearchResultProps {
  food: Food;
  onPress: () => void;
}

/** A single result row. Only the search screen lists foods this way, so it stays in this file. */
function SearchResult({ food, onPress }: SearchResultProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.result,
        pressed && { backgroundColor: colors.card },
      ]}
    >
      <FoodIcon food={food} size={RESULT_ICON_SIZE} />
      <View style={styles.resultText}>
        <AppText variant="bodyLarge" numberOfLines={1}>
          {food.name}
        </AppText>
        <AppText variant="body" muted numberOfLines={1}>
          {[
            food.brand,
            `${Math.round(food.perServing.calories)} kcal`,
            `${food.servingSize} ${food.servingUnit}`,
          ]
            .filter(Boolean)
            .join("  •  ")}
        </AppText>
      </View>
      <MaterialCommunityIcons
        name="plus-circle-outline"
        size={26}
        color={colors.text}
      />
    </Pressable>
  );
}

const RESULT_ICON_SIZE = 44;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    margin: Spacing.lg,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
    height: InputHeight.search,
  },
  input: {
    flex: 1,
    fontSize: FontSize.bodyMedium,
  },
  context: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  list: {
    paddingBottom: Spacing.xxl,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    // Starts under the result text, past the row padding, icon and gap.
    marginLeft: Spacing.lg + RESULT_ICON_SIZE + Spacing.md,
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  resultText: {
    flex: 1,
  },
  empty: {
    textAlign: "center",
    marginTop: Spacing.xl,
  },
});
