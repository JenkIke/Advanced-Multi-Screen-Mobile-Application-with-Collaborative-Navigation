import type { Href } from "expo-router";

import type { FeatureSlug } from "@/assets/demo-data/features";
import type { IconName } from "@/types";

export interface Shortcut {
  key: string;
  label: string;
  icon: IconName;
  href: Href;
}

function featureHref(slug: FeatureSlug): Href {
  return { pathname: "/feature/[slug]", params: { slug } };
}

/** Round tiles across the top of the Shortcuts sheet. */
export const SHORTCUT_TILES: Shortcut[] = [
  {
    key: "your-foods",
    label: "Your Foods",
    icon: "hamburger",
    href: { pathname: "/search", params: { scope: "history" } },
  },
  {
    key: "weight",
    label: "Weight",
    icon: "scale-bathroom",
    href: featureHref("weight"),
  },
  { key: "search", label: "Search", icon: "magnify", href: "/search" },
  {
    key: "barcode",
    label: "Barcode",
    icon: "barcode-scan",
    href: featureHref("barcode"),
  },
];

/** List rows below the tiles. */
export const SHORTCUT_ROWS: Shortcut[] = [
  {
    key: "quick-add",
    label: "Quick Add",
    icon: "rocket-launch",
    href: featureHref("quick-add"),
  },
  {
    key: "metrics",
    label: "Metrics",
    icon: "chart-line",
    href: featureHref("metrics"),
  },
  {
    key: "recipes",
    label: "Recipes",
    icon: "chef-hat",
    href: featureHref("recipes"),
  },
  {
    key: "new-recipe",
    label: "New Recipe",
    icon: "pot-steam",
    href: featureHref("new-recipe"),
  },
  { key: "ai", label: "AI", icon: "creation", href: featureHref("ai") },
  {
    key: "edit-day",
    label: "Edit Day",
    icon: "table-edit",
    href: featureHref("edit-day"),
  },
  {
    key: "photos",
    label: "Photos",
    icon: "camera-plus",
    href: featureHref("photos"),
  },
  {
    key: "describe",
    label: "Describe",
    icon: "format-quote-open",
    href: featureHref("describe"),
  },
];
