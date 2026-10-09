import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import { FOOD_LOG } from "@/assets/demo-data/foodLog";
import type { FoodLogEntry } from "@/types";

type NewEntry = Omit<FoodLogEntry, "id">;

interface FoodLogContextValue {
  getEntries: (date: string) => FoodLogEntry[];
  findEntry: (
    entryId: string,
  ) => { date: string; entry: FoodLogEntry } | undefined;
  addEntry: (date: string, entry: NewEntry) => void;
  updateServings: (entryId: string, servings: number) => void;
  removeEntry: (entryId: string) => void;
}

const FoodLogContext = createContext<FoodLogContextValue | null>(null);

/**
 * In-memory food log seeded with the mock week. Logging, editing and
 * deleting foods updates the Food Log and Dashboard immediately; nothing is
 * persisted between app launches.
 */
export function FoodLogProvider({ children }: PropsWithChildren) {
  const [log, setLog] = useState<Record<string, FoodLogEntry[]>>(FOOD_LOG);

  function getEntries(date: string) {
    return log[date] ?? [];
  }

  function findEntry(entryId: string) {
    for (const [date, entries] of Object.entries(log)) {
      const entry = entries.find((candidate) => candidate.id === entryId);
      if (entry) {
        return { date, entry };
      }
    }
    return undefined;
  }

  function addEntry(date: string, entry: NewEntry) {
    const id = `${date}-${Date.now()}`;
    setLog((current) => ({
      ...current,
      [date]: [...(current[date] ?? []), { ...entry, id }],
    }));
  }

  function mapEntries(transform: (entries: FoodLogEntry[]) => FoodLogEntry[]) {
    setLog((current) =>
      Object.fromEntries(
        Object.entries(current).map(([date, entries]) => [
          date,
          transform(entries),
        ]),
      ),
    );
  }

  function updateServings(entryId: string, servings: number) {
    mapEntries((entries) =>
      entries.map((entry) =>
        // A household label like "1 small apple" no longer applies once the amount changes.
        entry.id === entryId
          ? { ...entry, servings, amountLabel: undefined }
          : entry,
      ),
    );
  }

  function removeEntry(entryId: string) {
    mapEntries((entries) => entries.filter((entry) => entry.id !== entryId));
  }

  return (
    <FoodLogContext.Provider
      value={{ getEntries, findEntry, addEntry, updateServings, removeEntry }}
    >
      {children}
    </FoodLogContext.Provider>
  );
}

export function useFoodLog(): FoodLogContextValue {
  const context = useContext(FoodLogContext);
  if (!context) {
    throw new Error("useFoodLog must be used inside a FoodLogProvider");
  }
  return context;
}
