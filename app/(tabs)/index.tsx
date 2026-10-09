import { Link } from "expo-router";
import { useState, type ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { EnergyBalance } from "@/components/dashboard/EnergyBalance";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { WeeklyAverages } from "@/components/dashboard/WeeklyAverages";
import {
  WeeklyNutritionChart,
  type NutritionMode,
} from "@/components/dashboard/WeeklyNutritionChart";
import { AppText } from "@/components/ui/AppText";
import { PageDots } from "@/components/ui/PageDots";
import { Screen } from "@/components/ui/Screen";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Spacing } from "@/constants/Layout";
import { useFoodLog } from "@/context/FoodLogContext";
import { useAppTheme } from "@/context/ThemeContext";
import { useContentWidth } from "@/hooks/useContentWidth";
import { CURRENT_WEEK, DAILY_TARGETS, TODAY } from "@/assets/demo-data/foodLog";
import { INSIGHTS } from "@/assets/demo-data/insights";
import { totalsForDates } from "@/utils/nutrition";

const MODES = [
  "Consumed",
  "Remaining",
] as const satisfies readonly NutritionMode[];
const HEADER_PAGE_IDS = [
  "weekly-nutrition",
  "weekly-averages",
  "energy-balance",
] as const;
const EXPENDITURE_KCAL = 3165;

export default function DashboardScreen() {
  const { colors } = useAppTheme();
  const width = useContentWidth();
  const { getEntries } = useFoodLog();

  const [mode, setMode] = useState<NutritionMode>("Consumed");
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [page, setPage] = useState(0);

  const totalsByDate = totalsForDates(
    CURRENT_WEEK.map((day) => day.date),
    getEntries,
  );
  const cardWidth = (width - Spacing.lg * 2 - Spacing.md) / 2;

  function handlePageScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setPage(Math.round(event.nativeEvent.contentOffset.x / width));
  }

  return (
    <Screen>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <View style={{ backgroundColor: colors.header }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handlePageScroll}
          >
            <HeaderPage title="Weekly Nutrition" width={width}>
              <WeeklyNutritionChart
                days={CURRENT_WEEK}
                totalsByDate={totalsByDate}
                targets={DAILY_TARGETS}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                mode={mode}
              />
              <View style={styles.toggle}>
                <SegmentedControl
                  options={MODES}
                  value={mode}
                  onChange={setMode}
                />
              </View>
            </HeaderPage>
            <HeaderPage title="Weekly Averages" width={width}>
              <WeeklyAverages
                loggedDays={Object.values(totalsByDate)}
                targets={DAILY_TARGETS}
              />
            </HeaderPage>
            <HeaderPage title="Energy Balance" width={width}>
              <EnergyBalance
                days={CURRENT_WEEK}
                totalsByDate={totalsByDate}
                expenditure={EXPENDITURE_KCAL}
              />
            </HeaderPage>
          </ScrollView>
        </View>

        <View style={styles.dots}>
          <PageDots pageIds={HEADER_PAGE_IDS} activeIndex={page} />
        </View>

        <View style={styles.insights}>
          <SectionHeader
            title="Insights & Analytics"
            actionLabel="See All"
            actionHref="/insights"
          />
          <View style={styles.grid}>
            {INSIGHTS.map((insight) => (
              <Link key={insight.key} href={`/insights/${insight.key}`} asChild>
                <InsightCard insight={insight} style={{ width: cardWidth }} />
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

interface HeaderPageProps {
  title: string;
  width: number;
  children: ReactNode;
}

/** One swipeable page of the dashboard header. Only used here, so it lives in this file. */
function HeaderPage({ title, width, children }: HeaderPageProps) {
  return (
    <View style={[styles.page, { width }]}>
      <AppText variant="heading" style={styles.pageTitle}>
        {title}
      </AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Spacing.xxl,
  },
  page: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  pageTitle: {
    fontSize: 22,
    marginBottom: Spacing.lg,
  },
  toggle: {
    marginTop: Spacing.lg,
  },
  dots: {
    paddingVertical: Spacing.lg,
  },
  insights: {
    paddingHorizontal: Spacing.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
});
