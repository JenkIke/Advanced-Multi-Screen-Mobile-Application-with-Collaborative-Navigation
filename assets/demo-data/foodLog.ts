import type { FoodLogEntry, MacroTotals, WeekDay } from "@/types";

/** Daily targets set by the coached program (matches the Strategy tab). */
export const DAILY_TARGETS: MacroTotals = {
  calories: 2864,
  protein: 169,
  fat: 95,
  carbs: 331,
};

/** "Today" in the mock data, matching the reference screenshots (Thursday). */
export const TODAY = "2026-10-08";

export const CURRENT_WEEK: WeekDay[] = [
  {
    date: "2026-10-05",
    dayOfMonth: 5,
    name: "Monday",
    shortName: "Mo",
    initial: "M",
  },
  {
    date: "2026-10-06",
    dayOfMonth: 6,
    name: "Tuesday",
    shortName: "Tu",
    initial: "T",
  },
  {
    date: "2026-10-07",
    dayOfMonth: 7,
    name: "Wednesday",
    shortName: "We",
    initial: "W",
  },
  {
    date: "2026-10-08",
    dayOfMonth: 8,
    name: "Thursday",
    shortName: "Th",
    initial: "T",
  },
  {
    date: "2026-10-09",
    dayOfMonth: 9,
    name: "Friday",
    shortName: "Fr",
    initial: "F",
  },
  {
    date: "2026-10-10",
    dayOfMonth: 10,
    name: "Saturday",
    shortName: "Sa",
    initial: "S",
  },
  {
    date: "2026-10-11",
    dayOfMonth: 11,
    name: "Sunday",
    shortName: "Su",
    initial: "S",
  },
];

/** Food log keyed by ISO date. Days with no key have nothing logged yet. */
export const FOOD_LOG: Record<string, FoodLogEntry[]> = {
  "2026-10-05": [
    { id: "mon-1", foodId: "rolled-oats", time: "07:00", servings: 2 },
    { id: "mon-2", foodId: "banana", time: "07:00", servings: 1 },
    { id: "mon-3", foodId: "milk-2", time: "07:00", servings: 1 },
    { id: "mon-4", foodId: "whey-isolate-choco", time: "07:00", servings: 3 },
    { id: "mon-5", foodId: "whole-wheat-bread", time: "12:00", servings: 2 },
    { id: "mon-6", foodId: "peanut-butter", time: "12:00", servings: 2 },
    { id: "mon-7", foodId: "egg", time: "12:00", servings: 3 },
    { id: "mon-8", foodId: "lean-ground-beef", time: "18:00", servings: 2 },
    { id: "mon-9", foodId: "spaghetti", time: "18:00", servings: 3 },
    { id: "mon-10", foodId: "olive-oil", time: "18:00", servings: 1 },
    { id: "mon-11", foodId: "broccoli", time: "18:00", servings: 1 },
    { id: "mon-12", foodId: "cottage-cheese", time: "21:00", servings: 1 },
    { id: "mon-13", foodId: "dark-chocolate", time: "21:00", servings: 2 },
  ],
  "2026-10-06": [
    { id: "tue-1", foodId: "yogurt-activia", time: "06:00", servings: 1 },
    {
      id: "tue-2",
      foodId: "granola-almond-cashew",
      time: "06:00",
      servings: 2,
    },
    { id: "tue-3", foodId: "whey-isolate-choco", time: "06:00", servings: 3 },
    { id: "tue-4", foodId: "banana", time: "06:00", servings: 1 },
    { id: "tue-5", foodId: "chicken-breast", time: "12:00", servings: 2 },
    { id: "tue-6", foodId: "white-rice", time: "12:00", servings: 3 },
    { id: "tue-7", foodId: "olive-oil", time: "12:00", servings: 1 },
    { id: "tue-8", foodId: "mixed-nuts", time: "15:00", servings: 1 },
    {
      id: "tue-9",
      foodId: "apple",
      time: "15:00",
      servings: 1,
      amountLabel: '1 small - 2 3/4" dia',
    },
    { id: "tue-10", foodId: "salmon", time: "19:00", servings: 1.5 },
    { id: "tue-11", foodId: "sweet-potato", time: "19:00", servings: 3 },
    { id: "tue-12", foodId: "broccoli", time: "19:00", servings: 1.5 },
    { id: "tue-13", foodId: "cottage-cheese", time: "21:00", servings: 1 },
  ],
  "2026-10-07": [
    { id: "wed-1", foodId: "egg", time: "07:00", servings: 3 },
    { id: "wed-2", foodId: "whole-wheat-bread", time: "07:00", servings: 2 },
    { id: "wed-3", foodId: "milk-2", time: "07:00", servings: 1 },
    { id: "wed-4", foodId: "chicken-breast", time: "12:00", servings: 2 },
    { id: "wed-5", foodId: "spaghetti", time: "12:00", servings: 2.5 },
    { id: "wed-6", foodId: "olive-oil", time: "12:00", servings: 1 },
    { id: "wed-7", foodId: "yogurt-activia", time: "15:00", servings: 1 },
    {
      id: "wed-8",
      foodId: "granola-almond-cashew",
      time: "15:00",
      servings: 1,
    },
    { id: "wed-9", foodId: "lean-ground-beef", time: "19:00", servings: 1.5 },
    { id: "wed-10", foodId: "white-rice", time: "19:00", servings: 2.5 },
    { id: "wed-11", foodId: "broccoli", time: "19:00", servings: 1 },
    { id: "wed-12", foodId: "dark-chocolate", time: "21:00", servings: 2 },
    { id: "wed-13", foodId: "whey-isolate-choco", time: "21:00", servings: 3 },
  ],
  // Thursday mirrors the Food Log reference screenshot for the 06:00 slot.
  "2026-10-08": [
    { id: "thu-1", foodId: "yogurt-activia", time: "06:00", servings: 1 },
    {
      id: "thu-2",
      foodId: "granola-almond-cashew",
      time: "06:00",
      servings: 1,
    },
    {
      id: "thu-3",
      foodId: "apple",
      time: "06:00",
      servings: 1,
      amountLabel: '1 small - 2 3/4" dia',
    },
    { id: "thu-4", foodId: "cottage-cheese", time: "06:00", servings: 1 },
    { id: "thu-5", foodId: "whey-isolate-choco", time: "06:00", servings: 1 },
    { id: "thu-6", foodId: "cinnamon", time: "06:00", servings: 1 },
    { id: "thu-7", foodId: "chicken-breast", time: "12:00", servings: 2 },
    { id: "thu-8", foodId: "white-rice", time: "12:00", servings: 2.5 },
    { id: "thu-9", foodId: "olive-oil", time: "12:00", servings: 1 },
    { id: "thu-10", foodId: "broccoli", time: "12:00", servings: 1.5 },
    { id: "thu-11", foodId: "salmon", time: "19:00", servings: 1 },
    { id: "thu-12", foodId: "sweet-potato", time: "19:00", servings: 2 },
    { id: "thu-13", foodId: "mixed-nuts", time: "19:00", servings: 1.5 },
    { id: "thu-14", foodId: "dark-chocolate", time: "19:00", servings: 2 },
  ],
};
