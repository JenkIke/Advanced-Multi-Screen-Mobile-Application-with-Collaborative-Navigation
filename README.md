# MacroFactor Recreation (Expo + TypeScript)

A multi-screen recreation of the **MacroFactor** nutrition-tracking app, for the CRPG 303A Assignment 2: Advanced Multi-Screen Mobile Application with Collaborative Navigation (Expo).

The app recreates MacroFactor's four main tabs (Dashboard, Food Log, Strategy, More), the centre **'+'** button that opens the Shortcuts sheet, and a set of stack screens reached from them. Everything runs on mock data; no images are bundled or downloaded, and every icon comes from `expo/vector-icons`.

Reference screenshots of the real app are in the `reference-screenshots` folder 

## Running the app

```bash
npm install
npx expo start
```


Built on **Expo SDK 57**, React Native 0.86, and TypeScript.

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

## Assignment structure

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
