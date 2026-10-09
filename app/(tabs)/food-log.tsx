import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { DaySelector } from "@/components/food-log/DaySelector";
import { FoodEntryCard } from "@/components/food-log/FoodEntryCard";
import { FoodSearchBar } from "@/components/food-log/FoodSearchBar";
import { MacroProgressRow } from "@/components/food-log/MacroProgressRow";
import { TimeSlot } from "@/components/food-log/TimeSlot";
import { AppText } from "@/components/ui/AppText";
import { IconButton } from "@/components/ui/IconButton";
import { PageDots } from "@/components/ui/PageDots";
import { Screen } from "@/components/ui/Screen";
import { MacroColors } from "@/constants/Colors";
import { Spacing } from "@/constants/Layout";
import { useFoodLog } from "@/context/FoodLogContext";
import { useAppTheme } from "@/context/ThemeContext";
import { useContentWidth } from "@/hooks/useContentWidth";
import { getFoodById } from "@/utils/lookups";
import {
  CURRENT_WEEK,
  DAILY_TARGETS,
  DEFAULT_SLOT_TIME,
  TODAY,
} from "@/data/foodLog";
import type { FoodLogEntry, MacroTotals } from "@/types";
import {
  entryAmountLabel,
  entryMacros,
  groupByTime,
  MACRO_KEYS,
  MACRO_SUFFIX,
  sumMacros,
  totalsForDates,
} from "@/utils/nutrition";

interface Slot {
  time: string;
  entries: FoodLogEntry[];
}

/** The empty slot shown after the last meal, e.g. "07:00 +" under a 06:00 breakfast. */
function nextHour(time: string): string {
  const hour = Math.min(Number(time.slice(0, 2)) + 1, 23);
  return `${String(hour).padStart(2, "0")}:00`;
}

/** The two swipeable header pages: day selector, then remaining macros. */
const HEADER_PAGE_IDS = ["days", "remaining"] as const;

/**
 * Food Log tab. The header shows the selected day, a day selector and macro
 * progress (swipe for what is left); below is a timeline of entries grouped
 * by time. Tapping an entry opens `/food/[id]` to edit it; tapping a slot's
 * "+" or the search bar opens `/search` for that date and time.
 */
export default function FoodLogScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const width = useContentWidth();
  const { getEntries } = useFoodLog();

  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [page, setPage] = useState(0);

  const selectedDay = CURRENT_WEEK.find((day) => day.date === selectedDate);
  const entries = getEntries(selectedDate);
  const consumed = sumMacros(entries);
  const weekTotals = totalsForDates(
    CURRENT_WEEK.map((day) => day.date),
    getEntries,
  );
  const caloriesByDate = Object.fromEntries(
    Object.entries(weekTotals).map(([date, totals]) => [date, totals.calories]),
  );

  const groups = groupByTime(entries);
  const lastTime = groups.at(-1)?.time;
  const slots: Slot[] = [
    ...groups,
    { time: lastTime ? nextHour(lastTime) : DEFAULT_SLOT_TIME, entries: [] },
  ];

  const title =
    selectedDate === TODAY ? "TODAY" : (selectedDay?.name.toUpperCase() ?? "");

  function openSearch(time: string) {
    router.push({ pathname: "/search", params: { date: selectedDate, time } });
  }

  function openEntry(entry: FoodLogEntry) {
    router.push({
      pathname: "/food/[id]",
      params: { id: entry.foodId, entryId: entry.id },
    });
  }

  function handlePageScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setPage(Math.round(event.nativeEvent.contentOffset.x / width));
  }

  return (
    <Screen>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <View style={styles.titleRow}>
          <AppText
            variant="wordmark"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.title}
          >
            {title}
          </AppText>
          <IconButton
            icon="calendar-blank"
            accessibilityLabel="Jump to today"
            onPress={() => setSelectedDate(TODAY)}
          />
          <Link href="/feature/food-log-settings" asChild>
            <IconButton
              icon="tune-variant"
              accessibilityLabel="Food log settings"
            />
          </Link>
          <Link href="/feature/edit-day" asChild>
            <IconButton icon="dots-vertical" accessibilityLabel="Edit day" />
          </Link>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handlePageScroll}
        >
          <View style={[styles.page, { width }]}>
            <DaySelector
              days={CURRENT_WEEK}
              caloriesByDate={caloriesByDate}
              calorieTarget={DAILY_TARGETS.calories}
              selectedDate={selectedDate}
              today={TODAY}
              onSelect={setSelectedDate}
            />
            <MacroProgressRow consumed={consumed} targets={DAILY_TARGETS} />
          </View>
          <View style={[styles.page, { width }]}>
            <RemainingSummary consumed={consumed} targets={DAILY_TARGETS} />
          </View>
        </ScrollView>
        <PageDots pageIds={HEADER_PAGE_IDS} activeIndex={page} />
      </View>

      <FlatList
        data={slots}
        keyExtractor={(slot) => slot.time}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          entries.length === 0 ? (
            <AppText variant="body" muted style={styles.empty}>
              Nothing logged for {selectedDay?.name ?? "this day"} yet. Tap + or
              search to add a food.
            </AppText>
          ) : null
        }
        renderItem={({ item }) => (
          <TimeSlot
            time={item.time}
            totals={
              item.entries.length > 0 ? sumMacros(item.entries) : undefined
            }
            onAddPress={() => openSearch(item.time)}
          >
            {item.entries.map((entry) => {
              const food = getFoodById(entry.foodId);
              if (!food) {
                return null;
              }
              return (
                <FoodEntryCard
                  key={entry.id}
                  food={food}
                  macros={entryMacros(entry)}
                  amountLabel={entryAmountLabel(entry)}
                  onPress={() => openEntry(entry)}
                  onEditPress={() => openEntry(entry)}
                />
              );
            })}
          </TimeSlot>
        )}
      />

      <View style={[styles.searchArea, { backgroundColor: colors.background }]}>
        <FoodSearchBar
          onPress={() => openSearch(lastTime ?? DEFAULT_SLOT_TIME)}
          onBarcodePress={() => router.push("/feature/barcode")}
        />
      </View>
    </Screen>
  );
}

interface RemainingSummaryProps {
  consumed: MacroTotals;
  targets: MacroTotals;
}

/** Second header page: what is left to eat today. Small and screen-specific, so kept here. */
function RemainingSummary({ consumed, targets }: RemainingSummaryProps) {
  return (
    <View style={styles.remaining}>
      {MACRO_KEYS.map((key) => (
        <View key={key} style={styles.remainingItem}>
          <AppText variant="title" color={MacroColors[key]}>
            {Math.max(Math.round(targets[key] - consumed[key]), 0)}
            {MACRO_SUFFIX[key] ? ` ${MACRO_SUFFIX[key]}` : ""}
          </AppText>
          <AppText variant="caption" muted>
            {key === "calories" ? "kcal left" : "left"}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  title: {
    flex: 1,
  },
  page: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  remaining: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  remainingItem: {
    alignItems: "center",
    gap: 4,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  empty: {
    textAlign: "center",
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  searchArea: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
});
