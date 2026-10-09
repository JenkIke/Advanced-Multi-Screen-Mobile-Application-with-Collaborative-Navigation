import type { GoalHistoryItem } from "@/types";

export const CURRENT_PROGRAM = {
  title: "Coached Program",
  range: "Oct 5 - Now",
};

export const CURRENT_GOAL = {
  title: "Weight Loss Goal",
  range: "Aug 22 - Now",
  goalWeight: 170,
  weeklyRateLb: -0.62,
  weeklyRatePercent: -0.4,
};

/** Mirrors the Goal History list in the reference app, newest first. */
export const GOAL_HISTORY: GoalHistoryItem[] = [
  {
    id: "goal-8",
    range: "Aug 22, 2026 - Now",
    type: "Loss",
    startWeight: 176.0,
  },
  {
    id: "goal-7",
    range: "Aug 9, 2026 - Aug 22, 2026",
    type: "Gain",
    startWeight: 178.0,
    endWeight: 176.0,
  },
  {
    id: "goal-6",
    range: "May 13, 2026 - Aug 8, 2026",
    type: "Gain",
    startWeight: 164.2,
    endWeight: 178.0,
  },
  {
    id: "goal-5",
    range: "May 4, 2026 - May 13, 2026",
    type: "Maintain",
    startWeight: 164.0,
    endWeight: 164.2,
  },
  {
    id: "goal-4",
    range: "Apr 1, 2026 - May 4, 2026",
    type: "Loss",
    startWeight: 172.0,
    endWeight: 164.0,
  },
  {
    id: "goal-3",
    range: "Mar 19, 2026 - Apr 1, 2026",
    type: "Maintain",
    startWeight: 169.8,
    endWeight: 172.0,
  },
  {
    id: "goal-2",
    range: "Mar 10, 2026 - Mar 19, 2026",
    type: "Loss",
    startWeight: 173.0,
    endWeight: 169.8,
  },
  {
    id: "goal-1",
    range: "Feb 10, 2026 - Mar 10, 2026",
    type: "Maintain",
    startWeight: 176.8,
    endWeight: 173.0,
  },
];
