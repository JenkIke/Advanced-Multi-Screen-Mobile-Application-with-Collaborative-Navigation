import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";

/** Any valid MaterialCommunityIcons glyph name. */
export type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type MacroKey = "calories" | "protein" | "fat" | "carbs";

export type MacroTotals = Record<MacroKey, number>;

export interface Food {
  id: string;
  name: string;
  brand?: string;
  /**
   * IMAGE PLACEHOLDER: the real app shows a full-colour food illustration.
   * We use an Expo icon tinted with `iconColor` instead.
   */
  icon: IconName;
  iconColor: string;
  servingSize: number;
  servingUnit: string;
  /** Macros for one serving of `servingSize` `servingUnit`. */
  perServing: MacroTotals;
}

export interface FoodLogEntry {
  id: string;
  foodId: string;
  /** 24h time slot, e.g. "06:00". */
  time: string;
  servings: number;
  /** Overrides the computed "125 g" style label when the real app shows a household measure. */
  amountLabel?: string;
}

export interface WeekDay {
  /** ISO date, e.g. "2026-10-08". */
  date: string;
  dayOfMonth: number;
  /** "Thursday" */
  name: string;
  /** "Th" */
  shortName: string;
  /** "T" */
  initial: string;
}

export type InsightKey = "expenditure" | "weight-trend" | "goal-progress";

/** One value in a chart series. `id` (the ISO date) is the stable React key. */
export interface SeriesPoint {
  id: string;
  /** Short display label, e.g. "Oct 2". */
  label: string;
  value: number;
}

export interface Insight {
  key: InsightKey;
  title: string;
  subtitle: string;
  value: string;
  unit: string;
  color: string;
  description: string;
  /** Daily values for line charts; a single 0-1 point for progress bars. */
  series: SeriesPoint[];
  kind: "line" | "progress";
}

export interface GoalHistoryItem {
  id: string;
  range: string;
  type: "Loss" | "Gain" | "Maintain";
  startWeight: number;
  /** Missing while the goal is still in progress. */
  endWeight?: number;
}

export interface FeatureInfo {
  title: string;
  icon: IconName;
  description: string;
  highlights: FeatureHighlight[];
}

/** One bullet on a feature page; `id` is the stable React key. */
export interface FeatureHighlight {
  id: string;
  label: string;
}
