import { ChartColors } from "@/constants/Colors";
import type { Insight, InsightKey } from "@/types";

export const INSIGHTS: Insight[] = [
  {
    key: "expenditure",
    title: "Expenditure",
    subtitle: "Last 7 Days",
    value: "3165",
    unit: "kcal",
    color: ChartColors.expenditure,
    kind: "line",
    series: [
      { id: "2026-10-02", label: "Oct 2", value: 3192 },
      { id: "2026-10-03", label: "Oct 3", value: 3188 },
      { id: "2026-10-04", label: "Oct 4", value: 3183 },
      { id: "2026-10-05", label: "Oct 5", value: 3179 },
      { id: "2026-10-06", label: "Oct 6", value: 3175 },
      { id: "2026-10-07", label: "Oct 7", value: 3170 },
      { id: "2026-10-08", label: "Oct 8", value: 3165 },
    ],
    description:
      "Your estimated total daily energy expenditure, calculated from your food log and weight trend. It updates every day you log.",
  },
  {
    key: "weight-trend",
    title: "Weight Trend",
    subtitle: "Last 7 Days",
    value: "173.7",
    unit: "lb",
    color: ChartColors.weight,
    kind: "line",
    series: [
      { id: "2026-10-02", label: "Oct 2", value: 175.2 },
      { id: "2026-10-03", label: "Oct 3", value: 174.8 },
      { id: "2026-10-04", label: "Oct 4", value: 174.3 },
      { id: "2026-10-05", label: "Oct 5", value: 174.3 },
      { id: "2026-10-06", label: "Oct 6", value: 174.3 },
      { id: "2026-10-07", label: "Oct 7", value: 173.8 },
      { id: "2026-10-08", label: "Oct 8", value: 173.7 },
    ],
    description:
      "A smoothed trend of your scale weight that filters out day-to-day water swings so you can see real progress.",
  },
  {
    key: "goal-progress",
    title: "Goal Progress",
    subtitle: "Last 47 Days",
    value: "52",
    unit: "%",
    color: ChartColors.goal,
    kind: "progress",
    series: [{ id: "2026-10-08", label: "Oct 8", value: 0.52 }],
    description:
      "How far your weight trend has moved from where your current goal started toward your goal weight of 170 lb.",
  },
];

export function getInsight(key: string): Insight | undefined {
  return INSIGHTS.find((insight) => insight.key === (key as InsightKey));
}
