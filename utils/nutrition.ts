import { getFoodById } from "@/utils/lookups";
import type { FoodLogEntry, MacroKey, MacroTotals } from "@/types";

export const MACRO_KEYS: MacroKey[] = ["calories", "protein", "fat", "carbs"];

/** Single-letter suffix used throughout MacroFactor ("134 P", "80 F"). */
export const MACRO_SUFFIX: Record<MacroKey, string> = {
  calories: "",
  protein: "P",
  fat: "F",
  carbs: "C",
};

export const EMPTY_TOTALS: MacroTotals = {
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
};

export function entryMacros(entry: FoodLogEntry): MacroTotals {
  const food = getFoodById(entry.foodId);
  if (!food) {
    return EMPTY_TOTALS;
  }
  return {
    calories: food.perServing.calories * entry.servings,
    protein: food.perServing.protein * entry.servings,
    fat: food.perServing.fat * entry.servings,
    carbs: food.perServing.carbs * entry.servings,
  };
}

export function sumMacros(entries: FoodLogEntry[]): MacroTotals {
  return entries.reduce<MacroTotals>(
    (totals, entry) => {
      const macros = entryMacros(entry);
      return {
        calories: totals.calories + macros.calories,
        protein: totals.protein + macros.protein,
        fat: totals.fat + macros.fat,
        carbs: totals.carbs + macros.carbs,
      };
    },
    { ...EMPTY_TOTALS },
  );
}

export function entryAmountLabel(entry: FoodLogEntry): string {
  if (entry.amountLabel) {
    return entry.amountLabel;
  }
  const food = getFoodById(entry.foodId);
  if (!food) {
    return "";
  }
  const amount = Math.round(food.servingSize * entry.servings * 10) / 10;
  return `${amount} ${food.servingUnit}`;
}

/** Groups entries by time slot, preserving the order slots first appear in. */
export function groupByTime(
  entries: FoodLogEntry[],
): { time: string; entries: FoodLogEntry[] }[] {
  const groups = new Map<string, FoodLogEntry[]>();
  for (const entry of entries) {
    groups.set(entry.time, [...(groups.get(entry.time) ?? []), entry]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([time, slotEntries]) => ({ time, entries: slotEntries }));
}

/** Clamps a consumed/target ratio to the 0-1 range used by progress bars. */
export function progress(value: number, target: number): number {
  if (target <= 0) {
    return 0;
  }
  return Math.min(Math.max(value / target, 0), 1);
}

/** Calories contributed by each macro, used to size the Strategy blocks. */
export function macroCalories(
  totals: MacroTotals,
): Omit<MacroTotals, "calories"> {
  return {
    protein: totals.protein * 4,
    fat: totals.fat * 9,
    carbs: totals.carbs * 4,
  };
}

/** Totals for each day in `dates` that has at least one entry logged. */
export function totalsForDates(
  dates: string[],
  getEntries: (date: string) => FoodLogEntry[],
): Record<string, MacroTotals> {
  const totals: Record<string, MacroTotals> = {};
  for (const date of dates) {
    const entries = getEntries(date);
    if (entries.length > 0) {
      totals[date] = sumMacros(entries);
    }
  }
  return totals;
}
