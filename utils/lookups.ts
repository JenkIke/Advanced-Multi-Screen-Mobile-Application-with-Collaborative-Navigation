import { FEATURES } from "@/data/features";
import { FOODS } from "@/data/foods";
import { INSIGHTS } from "@/data/insights";
import type { FeatureInfo, Food, Insight, InsightKey } from "@/types";

const FOODS_BY_ID = new Map(FOODS.map((food) => [food.id, food]));

export function getFoodById(id: string): Food | undefined {
  return FOODS_BY_ID.get(id);
}

/** Case-insensitive match on name and brand; an empty query returns every food. */
export function searchFoods(query: string): Food[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return FOODS;
  }
  return FOODS.filter((food) =>
    `${food.name} ${food.brand ?? ""}`.toLowerCase().includes(needle),
  );
}

export function getFeature(slug: string): FeatureInfo | undefined {
  return (FEATURES as Record<string, FeatureInfo>)[slug];
}

export function getInsight(key: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.key === (key as InsightKey));
}
