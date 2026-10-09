# MacroFactor Recreation (Expo + TypeScript)

A multi-screen recreation of the **MacroFactor** nutrition-tracking app, built for the SAIT assignment *Advanced Multi-Screen Mobile Application with Collaborative Navigation (Expo)*.

The app recreates MacroFactor's four main tabs (Dashboard, Food Log, Strategy, More), the centre **+** button that opens the Shortcuts sheet, and a set of stack screens reached from them. Everything runs on mock data; no images are bundled or downloaded, and every icon comes from `@expo/vector-icons`.

Reference screenshots of the real app are in [`reference-screenshots/`](reference-screenshots).

## Running the app

```bash
npm install
npx expo start        # then press i (iOS simulator), a (Android emulator) or scan the QR code in Expo Go
```

Other scripts:

```bash
npm run typecheck     # tsc --noEmit
npm run lint          # expo lint
npm run format        # prettier --write .
```

Built on **Expo SDK 57**, React Native 0.86, Expo Router (file-based routing) and TypeScript in strict mode.

On tablets and desktop browsers the app renders as a centred, phone-width column (max 480 pt) with a border, so layouts never stretch. Every tab screen pads the top and side safe areas; the tab bar pads the bottom home-indicator area.

The app opens on a mock **sign-in** screen with a demo account already filled in. Tap **Sign In** to enter the app.

## Screens

| Screen | Route | What it shows |
| --- | --- | --- |
| Dashboard (tab) | `app/(tabs)/index.tsx` | Weekly Nutrition bar grid with Consumed/Remaining toggle, tap a day to see its numbers, swipe for Weekly Averages and Energy Balance, Insights & Analytics cards |
| Food Log (tab) | `app/(tabs)/food-log.tsx` | "TODAY" header, day selector with calorie progress rings, macro progress bars, timeline of foods grouped by time, search bar |
| Strategy (tab) | `app/(tabs)/strategy.tsx` | Coached Program week chart, Weight Loss Goal stats, action buttons, Goal History |
| More (tab) | `app/(tabs)/more.tsx` | Profile header, General and Feature Settings lists, dark mode switch, sign out |
| Shortcuts (modal) | `app/shortcuts.tsx` | Bottom sheet opened by the centre **+** button: tiles and shortcut rows; drag down or tap outside to close |
| Search | `app/search.tsx` | Live search over the food database; "Your Foods" mode via a route param |
| Food detail | `app/food/[id].tsx` | Macros, serving stepper, Log Food / Save / Delete (updates the Food Log and Dashboard) |
| Insights list | `app/insights/index.tsx` | "See All" from the Dashboard |
| Insight detail | `app/insights/[metric].tsx` | Large chart, stats and daily values for one metric |
| Feature page | `app/feature/[slug].tsx` | Shared page for settings rows, Strategy buttons and shortcuts |
| Account | `app/account.tsx` | Mock profile with theme switch and sign out |
| Sign in | `app/sign-in.tsx` | Mock authentication |

## Navigation structure

```
Root Stack (app/_layout.tsx)
├── Stack.Protected guard = signed in
│   ├── (tabs)  ── Bottom Tabs (app/(tabs)/_layout.tsx, custom MacroTabBar)
│   │   ├── index       Dashboard
│   │   ├── food-log    Food Log
│   │   ├── [ + ]       centre button, not a route: pushes /shortcuts
│   │   ├── strategy    Strategy
│   │   └── more        More
│   ├── shortcuts            transparent modal (bottom sheet)
│   ├── search               ?date&time&scope
│   ├── food/[id]            ?entryId | ?date&time
│   ├── insights/index
│   ├── insights/[metric]
│   ├── feature/[slug]
│   └── account
└── Stack.Protected guard = signed out
    └── sign-in
```

* **Tab navigation:** four tabs plus a custom tab bar (`components/navigation/MacroTabBar.tsx`) that inserts the floating **+** button between Food Log and Strategy.
* **Stack navigation:** detail screens are pushed on the root stack so they cover the tab bar, as MacroFactor does. Several flows go more than one level deep, for example Food Log → Search → Food detail → back to Food Log, or Dashboard → See All → Insight detail.
* **Navigation parameters:** `food/[id]`, `insights/[metric]` and `feature/[slug]` are dynamic routes, and Search/Food detail take extra query params (`date`, `time`, `entryId`, `scope`).
* **Protected routes:** `Stack.Protected` swaps the whole app for the sign-in screen when the user signs out.

## Project structure and component decisions

The folder layout and coding style follow the CPRG 303 class demo (`cprg-303-rn-demos-main`) and the course slides: routes in a root `app/` folder, reusable pieces in `components/`, shared values in `constants/`, and demo data in `assets/demo-data/`.

```
app/                      routes only (Expo Router file-based routing)
components/
├── ui/                   generic building blocks used across many screens
├── charts/               Sparkline (react-native-svg)
├── navigation/           MacroTabBar (custom tab bar with the centre + button)
├── dashboard/            WeeklyNutritionChart, WeeklyAverages, EnergyBalance, InsightCard
├── food-log/             DaySelector, MacroProgressRow, TimeSlot, FoodEntryCard, FoodSearchBar
├── strategy/             ProgramWeekChart, ActionRow, GoalStats, GoalHistoryCard
├── more/                 ProfileHeader
└── shortcuts/            ShortcutTile
constants/
├── Colors.ts             light and dark palettes, macro and chart colours
└── Layout.ts             spacing, corner radius, type scale
context/                  ThemeContext, AuthContext, FoodLogContext (React context providers)
hooks/                    useContentWidth (phone-width column on wide screens)
assets/demo-data/         mock foods, food log, insights, strategy, shortcuts, feature pages
types/                    shared TypeScript interfaces
utils/nutrition.ts        pure helpers (sum macros, group by time, progress ratios)
```

Coding conventions, taken from the class demo:

* Component files use PascalCase and match the component they export (`components/ui/ListGroup.tsx` exports `ListGroup` and `ListRow`). Reusable components are **named exports**; route files use `export default`, as Expo Router requires.
* Props are typed with an `interface …Props` declared just above the component. Shared data shapes (`Food`, `FoodLogEntry`, `Insight`…) are interfaces in `types/`.
* Event handlers are function declarations inside the component (`function handleSave() { … }`), and styles go in a `StyleSheet.create` block at the bottom of each file.
* `<Link href="…" asChild>` is used for fixed destinations (More tab rows, Strategy buttons, insight cards, the centre **+** button). `useRouter()` with `router.push` / `router.back` is used only when the destination is built in code or must wait for something (Search results, logging a food, the Shortcuts sheet closing animation).
* `SafeAreaProvider` wraps the app once in `app/_layout.tsx`, and every screen is wrapped in `SafeAreaView` from `react-native-safe-area-context` through the `Screen` component. Tab screens pad the top and sides (the tab bar pads the bottom); stack screens pad the sides and bottom (their header already sits below the status bar). The Shortcuts sheet uses `useSafeAreaInsets()` to pad above the home indicator.
* List keys never use the array index. Every item that is rendered from an array has its own `id` (foods, log entries, goal history, chart points, feature highlights, Strategy buttons, account details, pager pages), and that `id` is the `key`.
* Code is formatted with Prettier defaults (double quotes, semicolons), the same style as the demo. Run `npm run format`.

Where a component lives:

1. **Own file in `components/ui/`** when it is generic and used by two or more features: `AppText`, `Card`, `ListGroup`/`ListRow`, `PillButton`, `IconButton`, `SegmentedControl`, `ToggleSwitch`, `ProgressBar`, `PageDots`, `FoodIcon`, `Screen`, `SectionHeader`.
2. **Own file in a feature folder** when it belongs to one feature but is large or used by more than one screen. `InsightCard` is used by the Dashboard and the Insights list; `TimeSlot` and `FoodEntryCard` keep the Food Log screen readable.
3. **Same file as the parent** when it is small, private and only makes sense inside that parent, like the demo's `Todo` inside `TodoList.tsx`. Examples: `DayColumn`, `MacroBar` and `MacroSummary` in `WeeklyNutritionChart.tsx`, `AddButton` in the tab bar, `HeaderPage` in the Dashboard route, `RemainingSummary` in the Food Log route, `SearchResult` in the Search route, `StepButton` in Food detail, `Field` in Sign In.
4. **Routes stay thin**: they read data or context, hold screen state, and compose components.

Deliberate differences from the slides:

* `Tabs` is imported from `expo-router/js-tabs`. In Expo SDK 57 the `Tabs` export from `expo-router` is marked deprecated in favour of this path; the component and its `screenOptions` are the same.
* The tab bar is a custom `tabBar` component because the centre **+** button is not a route. Its colours still come from the `screenOptions` tint colours in `app/(tabs)/_layout.tsx`, as in the tab navigation slides.
* Sign in and sign out use `Stack.Protected` guards instead of `router.replace`. The effect is the same (no back arrow into the app after signing out), and the guard also blocks deep links into the app while signed out.
* Search params for `search` and `food/[id]` are typed with a `type` alias rather than an interface, because Expo Router's typed `useLocalSearchParams` needs an index-signature-compatible type.

## Dynamic content

* Food Log totals, the Dashboard bar grid, weekly averages, energy balance and day-selector rings are all computed from the in-memory food log (`FoodLogProvider`). Logging, editing or deleting a food updates them immediately.
* Lists are rendered from data with `FlatList`/`map`: food timeline, search results, insights, goal history, shortcuts, settings rows.
* Search filters the food database as you type.

## Bonus features

* **Light / dark theme:** a Dark Mode switch on the More tab and Account screen; every component reads colours from `ThemeProvider`. The app starts in dark mode, like MacroFactor.
* **Animations:** the Shortcuts sheet slides up with a backdrop fade and supports drag-to-dismiss; the Dashboard bars and all progress bars animate when values change; the Consumed/Remaining toggle thumb springs between options; the centre **+** button scales when pressed.
* **Mock authentication + profile:** sign-in screen with validation, a profile/account screen, and sign out through `Stack.Protected`.

## Image placeholders

To follow the "no generated or downloaded images" rule, these spots use Expo icons or text where the real app uses images. Each is marked with an `IMAGE PLACEHOLDER` comment in the code:

| Location | Real app | This recreation |
| --- | --- | --- |
| Food entries, search results, food detail (`components/ui/FoodIcon.tsx`, `assets/demo-data/foods.ts`) | Full-colour food illustrations | Tinted MaterialCommunityIcons on a soft tile |
| Profile avatar (`components/more/ProfileHeader.tsx`) | Optional profile photo | Initials ("IS") |
| Sign-in logo (`app/sign-in.tsx`) | MacroFactor logo | Four macro-coloured bars |
| Barcode / Photos shortcuts (`assets/demo-data/features.ts`) | Live camera preview | Placeholder feature page |
| "TODAY" / "MORE" headers (`components/ui/AppText.tsx`, `FONT PLACEHOLDER`) | Custom wide display font | Heavy system font |
| App icon and splash (`assets/images`) | MacroFactor icon | Default Expo template icon |
