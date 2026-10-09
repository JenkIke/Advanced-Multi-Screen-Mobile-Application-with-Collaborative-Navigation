import type { FeatureInfo } from "@/types";

/**
 * Content for the generic `/feature/[slug]` stack screen. Rows on the More
 * tab, Strategy buttons and Shortcuts sheet all link here with a slug, so a
 * single screen + navigation parameter covers every secondary page.
 */
export const FEATURES = {
  subscription: {
    title: "Subscription",
    icon: "tag-heart",
    description: "Manage your MacroFactor plan and billing.",
    highlights: [
      { id: "plan-annual", label: "Plan: Annual" },
      { id: "renews-january-9-2027", label: "Renews: January 9, 2027" },
      { id: "payment-apple-app-store", label: "Payment: Apple App Store" },
    ],
  },
  integrations: {
    title: "Integrations",
    icon: "sync",
    description: "Sync weight, steps and nutrition with other apps.",
    highlights: [
      { id: "apple-health-connected", label: "Apple Health: Connected" },
      { id: "google-fit-not-connected", label: "Google Fit: Not connected" },
      { id: "fitbit-not-connected", label: "Fitbit: Not connected" },
    ],
  },
  units: {
    title: "Units",
    icon: "ruler",
    description: "Choose how weights, energy and food amounts are shown.",
    highlights: [
      { id: "body-weight-lb", label: "Body weight: lb" },
      { id: "energy-kcal", label: "Energy: kcal" },
      { id: "food-amounts-g", label: "Food amounts: g" },
    ],
  },
  language: {
    title: "Language",
    icon: "web",
    description:
      "MacroFactor follows your device language. Change it in system settings.",
    highlights: [
      {
        id: "current-language-english-canada",
        label: "Current language: English (Canada)",
      },
    ],
  },
  "dashboard-settings": {
    title: "Dashboard",
    icon: "view-grid-plus",
    description:
      "Pick which insight cards appear on your dashboard and in what order.",
    highlights: [
      { id: "expenditure", label: "Expenditure" },
      { id: "weight-trend", label: "Weight Trend" },
      { id: "goal-progress", label: "Goal Progress" },
    ],
  },
  "food-log-settings": {
    title: "Food Log",
    icon: "food-apple",
    description: "Control how your food log groups and displays entries.",
    highlights: [
      { id: "group-by-time", label: "Group by: Time" },
      { id: "show-macros-per-food-on", label: "Show macros per food: On" },
      { id: "default-meal-time-06-00", label: "Default meal time: 06:00" },
    ],
  },
  "shortcuts-settings": {
    title: "Shortcuts",
    icon: "gesture",
    description: "Reorder the tiles and rows in the Shortcuts sheet.",
    highlights: [
      { id: "your-foods", label: "Your Foods" },
      { id: "weight", label: "Weight" },
      { id: "search", label: "Search" },
      { id: "barcode", label: "Barcode" },
    ],
  },
  "new-program": {
    title: "New Program",
    icon: "refresh",
    description:
      "Start a new coached, collaborative or manual nutrition program.",
    highlights: [
      { id: "coached", label: "Coached" },
      { id: "collaborative", label: "Collaborative" },
      { id: "manual", label: "Manual" },
    ],
  },
  "edit-program": {
    title: "Edit Program",
    icon: "pencil",
    description: "Adjust calorie distribution, protein intake and diet style.",
    highlights: [
      { id: "diet-balanced", label: "Diet: Balanced" },
      { id: "protein-high", label: "Protein: High" },
      { id: "calorie-distribution-even", label: "Calorie distribution: Even" },
    ],
  },
  "new-goal": {
    title: "New Goal",
    icon: "plus",
    description: "Set a new weight goal and how quickly you want to get there.",
    highlights: [
      { id: "lose-weight", label: "Lose weight" },
      { id: "maintain-weight", label: "Maintain weight" },
      { id: "gain-weight", label: "Gain weight" },
    ],
  },
  "edit-goal": {
    title: "Edit Goal",
    icon: "pencil",
    description: "Change your goal weight or weekly rate of change.",
    highlights: [
      { id: "goal-weight-170-lb", label: "Goal weight: 170 lb" },
      { id: "rate-0-62-lb-week", label: "Rate: -0.62 lb / week" },
    ],
  },
  "reopen-goal": {
    title: "Reopen Previous",
    icon: "undo-variant",
    description: "Resume a goal you ended earlier.",
    highlights: [
      { id: "gain-aug-9-aug-22-2026", label: "Gain (Aug 9 - Aug 22, 2026)" },
    ],
  },
  "quick-add": {
    title: "Quick Add",
    icon: "rocket-launch",
    description: "Log calories and macros directly without picking a food.",
    highlights: [
      { id: "calories", label: "Calories" },
      { id: "protein", label: "Protein" },
      { id: "fat", label: "Fat" },
      { id: "carbs", label: "Carbs" },
    ],
  },
  metrics: {
    title: "Metrics",
    icon: "chart-line",
    description: "Log body measurements, steps and other metrics.",
    highlights: [
      { id: "weight", label: "Weight" },
      { id: "body-fat", label: "Body fat" },
      { id: "waist", label: "Waist" },
      { id: "steps", label: "Steps" },
    ],
  },
  recipes: {
    title: "Recipes",
    icon: "chef-hat",
    description: "Log one of your saved recipes.",
    highlights: [
      { id: "overnight-oats", label: "Overnight Oats" },
      { id: "chicken-rice-bowl", label: "Chicken Rice Bowl" },
      { id: "protein-pancakes", label: "Protein Pancakes" },
    ],
  },
  "new-recipe": {
    title: "New Recipe",
    icon: "chef-hat",
    description: "Build a recipe from foods in the database.",
    highlights: [
      { id: "add-ingredients", label: "Add ingredients" },
      { id: "set-servings", label: "Set servings" },
      { id: "save-to-your-foods", label: "Save to Your Foods" },
    ],
  },
  ai: {
    title: "AI",
    icon: "creation",
    description:
      "Describe or photograph a meal and let AI estimate its nutrition.",
    highlights: [
      { id: "describe-a-meal", label: "Describe a meal" },
      { id: "snap-a-photo", label: "Snap a photo" },
    ],
  },
  "edit-day": {
    title: "Edit Day",
    icon: "table-edit",
    description: "Copy, move or clear foods for the whole day.",
    highlights: [
      { id: "copy-day", label: "Copy day" },
      { id: "move-entries", label: "Move entries" },
      { id: "clear-day", label: "Clear day" },
    ],
  },
  photos: {
    title: "Photos",
    icon: "camera-plus",
    // IMAGE PLACEHOLDER: the real flow opens the camera / photo library.
    description:
      "Log a meal from a photo. This recreation does not use the camera.",
    highlights: [
      {
        id: "camera-access-would-be-requested-here",
        label: "Camera access would be requested here",
      },
    ],
  },
  describe: {
    title: "Describe",
    icon: "format-quote-open",
    description: "Type what you ate in plain language to log it.",
    highlights: [
      {
        id: "two-eggs-and-a-slice-of-toast",
        label: '"Two eggs and a slice of toast"',
      },
    ],
  },
  weight: {
    title: "Log Weight",
    icon: "scale-bathroom",
    description: "Record today's scale weight to keep your trend accurate.",
    highlights: [
      { id: "latest-173-7-lb-trend", label: "Latest: 173.7 lb (trend)" },
    ],
  },
  barcode: {
    title: "Barcode",
    icon: "barcode-scan",
    // IMAGE PLACEHOLDER: a live camera preview would render here.
    description:
      "Scan a barcode to find a packaged food. Camera preview not included in this recreation.",
    highlights: [
      {
        id: "point-the-camera-at-a-barcode",
        label: "Point the camera at a barcode",
      },
    ],
  },
  help: {
    title: "Help Center",
    icon: "help-circle-outline",
    description: "Guides and answers to common questions.",
    highlights: [
      { id: "getting-started", label: "Getting started" },
      { id: "how-the-algorithm-works", label: "How the algorithm works" },
      { id: "contact-support", label: "Contact support" },
    ],
  },
} satisfies Record<string, FeatureInfo>;

export type FeatureSlug = keyof typeof FEATURES;
