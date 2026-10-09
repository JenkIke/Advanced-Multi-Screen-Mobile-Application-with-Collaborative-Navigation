import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/ui/Screen";
import { Card } from "@/components/ui/Card";
import { FoodIcon } from "@/components/ui/FoodIcon";
import { PillButton } from "@/components/ui/PillButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { MacroColors } from "@/constants/Colors";
import { Spacing } from "@/constants/Layout";
import { useFoodLog } from "@/context/FoodLogContext";
import { useAppTheme } from "@/context/ThemeContext";
import { DAILY_TARGETS, DEFAULT_SLOT_TIME, TODAY } from "@/data/foodLog";
import { getFoodById } from "@/utils/lookups";
import type { MacroKey } from "@/types";
import { entryAmountLabel, entryMacros, progress } from "@/utils/nutrition";

// Route params stay a `type` alias: Expo Router's typed params need an index-signature-compatible type.
type FoodParams = {
  id: string;
  /** Present when opened from an existing log entry (view / edit mode). */
  entryId?: string;
  /** Where a new entry will be logged (add mode, from Search). */
  date?: string;
  time?: string;
};

const SERVING_STEP = 0.5;

const MACRO_ROWS: { key: Exclude<MacroKey, "calories">; label: string }[] = [
  { key: "protein", label: "Protein" },
  { key: "fat", label: "Fat" },
  { key: "carbs", label: "Carbs" },
];

/**
 * Food detail, reached from the Food Log (edit an entry) or Search (log a
 * new one). The food id and context arrive as route parameters.
 */
export default function FoodDetailScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { findEntry, addEntry, updateServings, removeEntry } = useFoodLog();
  const {
    id,
    entryId,
    date = TODAY,
    time = DEFAULT_SLOT_TIME,
  } = useLocalSearchParams<FoodParams>();

  const food = getFoodById(id);
  const existing = entryId ? findEntry(entryId) : undefined;
  const [servings, setServings] = useState(existing?.entry.servings ?? 1);

  if (!food) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <AppText variant="bodyLarge" muted>
          This food could not be found.
        </AppText>
      </View>
    );
  }

  // Preview entry reflecting the current stepper value.
  const draft = {
    id: entryId ?? "draft",
    foodId: food.id,
    time: existing?.entry.time ?? time,
    servings,
    amountLabel:
      servings === existing?.entry.servings
        ? existing.entry.amountLabel
        : undefined,
  };
  const macros = entryMacros(draft);

  function handleSave() {
    if (existing) {
      updateServings(existing.entry.id, servings);
      router.back();
    } else {
      addEntry(date, { foodId: draft.foodId, time, servings });
      router.dismissTo("/food-log");
    }
  }

  function handleDelete() {
    if (existing) {
      removeEntry(existing.entry.id);
      router.back();
    }
  }

  return (
    <Screen
      edges={["left", "right", "bottom"]}
      backgroundColor={colors.background}
    >
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <Stack.Screen
          options={{ title: existing ? "Edit Food" : "Log Food" }}
        />

        <View style={styles.hero}>
          <FoodIcon food={food} size={96} />
          <AppText variant="title" style={styles.name}>
            {food.name}
          </AppText>
          {food.brand && (
            <AppText variant="bodyLarge" muted>
              By {food.brand}
            </AppText>
          )}
        </View>

        <Card style={styles.card}>
          <View style={styles.calories}>
            <AppText variant="display">{Math.round(macros.calories)}</AppText>
            <MaterialCommunityIcons name="fire" size={28} color={colors.text} />
            <AppText variant="bodyLarge" muted style={styles.caloriesLabel}>
              kcal ·{" "}
              {Math.round(
                progress(macros.calories, DAILY_TARGETS.calories) * 100,
              )}
              % of daily target
            </AppText>
          </View>
          {MACRO_ROWS.map(({ key, label }) => (
            <View key={key} style={styles.macroRow}>
              <View style={styles.macroLabels}>
                <AppText variant="bodyLarge">{label}</AppText>
                <AppText variant="bodyLarge">
                  {Math.round(macros[key] * 10) / 10} g
                </AppText>
              </View>
              <ProgressBar
                progress={progress(macros[key], DAILY_TARGETS[key])}
                color={MacroColors[key]}
                height={6}
              />
            </View>
          ))}
        </Card>

        <Card style={styles.card}>
          <AppText variant="bodyLarge" muted>
            Amount
          </AppText>
          <View style={styles.stepper}>
            <StepButton
              icon="minus"
              label="Decrease amount"
              disabled={servings <= SERVING_STEP}
              onPress={() =>
                setServings((value) =>
                  Math.max(value - SERVING_STEP, SERVING_STEP),
                )
              }
            />
            <View style={styles.amount}>
              <AppText variant="title">{entryAmountLabel(draft)}</AppText>
              <AppText variant="body" muted>
                {servings} serving{servings === 1 ? "" : "s"} · {draft.time}
              </AppText>
            </View>
            <StepButton
              icon="plus"
              label="Increase amount"
              onPress={() => setServings((value) => value + SERVING_STEP)}
            />
          </View>
        </Card>

        <PillButton
          label={existing ? "Save Changes" : "Log Food"}
          icon={existing ? "check" : "plus"}
          variant="primary"
          onPress={handleSave}
        />
        {existing && (
          <PillButton
            label="Delete Entry"
            icon="trash-can-outline"
            onPress={handleDelete}
          />
        )}
      </ScrollView>
    </Screen>
  );
}

interface StepButtonProps {
  icon: "minus" | "plus";
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

function StepButton({
  icon,
  label,
  onPress,
  disabled = false,
}: StepButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[
        styles.stepButton,
        { backgroundColor: colors.elevated },
        disabled && styles.disabled,
      ]}
    >
      <MaterialCommunityIcons name={icon} size={24} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  missing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    gap: Spacing.xs,
    marginVertical: Spacing.md,
  },
  name: {
    textAlign: "center",
    marginTop: Spacing.md,
  },
  card: {
    gap: Spacing.lg,
  },
  calories: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  caloriesLabel: {
    marginLeft: Spacing.sm,
    flexShrink: 1,
  },
  macroRow: {
    gap: Spacing.sm,
  },
  macroLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
  },
  amount: {
    flex: 1,
    alignItems: "center",
  },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.4,
  },
});
