# apps/box-model-rsd-expo - AI Guide

Expo mobile application using React Strict DOM components from `@box-model/rsd` and shared screens from `@box-model/rsd-app`.

## Critical: Use Libraries, Not Bespoke Code

**This app is a thin shell. DO NOT create custom components, screens, or styles here.**

- **UI Components**: Use `@box-model/rsd` exclusively. If a component doesn't exist, add it to `libs/rsd/`, not here.
- **Screens**: Use `@box-model/rsd-app` exclusively. If a screen doesn't exist, add it to `libs/rsd-app/`, not here.
- **Styles**: Never create local StyleSheet styles for UI elements. All styling belongs in the libraries.

The only code that belongs in this app:
- Navigation configuration (`App.tsx`)
- Expo/platform-specific configuration files
- Wiring screens from `@box-model/rsd-app` to routes

**If you find yourself writing a new component or screen in this app, STOP. Add it to the appropriate library instead.**

## Reference Documentation

**Read `rsd-expo-llms.md` in this directory** for official React Strict DOM + Expo setup documentation, including:
- Babel configuration for the RSD preset
- PostCSS configuration for CSS extraction
- Metro bundler configuration
- Required app files (`strict.css`, entry point setup)

**Read `libs/rsd/rsd-llms.md`** for comprehensive React Strict DOM API documentation (styling, theming, cross-platform constraints, best practices).

## Technology Stack

- **Expo SDK**: React Native framework
- **React Navigation**: Native stack navigation
- **React Strict DOM**: Cross-platform components via `@box-model/rsd`
- **Metro**: JavaScript bundler

## Running the App

```bash
npx nx start box-model-rsd-expo     # Start Expo dev server
npx nx run-android box-model-rsd-expo  # Run on Android
npx nx run-ios box-model-rsd-expo      # Run on iOS
```

## Project Structure

```
apps/box-model-rsd-expo/
├── src/
│   └── app/
│       └── App.tsx        # Root component with navigation
├── index.js               # Entry point
├── app.json               # Expo configuration
├── metro.config.js        # Metro bundler configuration
└── eas.json               # EAS Build configuration
```

## Navigation Setup

The app uses React Navigation with a native stack navigator:

```tsx
// src/app/App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, AboutScreen, type RootStackParamList } from '@box-model/rsd-app';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
```

## Adding New Screens

1. Create the screen in `libs/rsd-app/src/<screen>/`
2. Export from `libs/rsd-app/src/index.ts`
3. Add to `RootStackParamList` in `libs/rsd-app/src/navigation.ts`
4. Add `Stack.Screen` entry in `src/app/App.tsx`

## Metro Configuration

Metro is configured to resolve workspace packages:

```javascript
// metro.config.js
const { withNxMetro } = require('@nx/expo');
```

## Important Notes

- **NEVER create screens in this app** - All screens come from `@box-model/rsd-app`
- **NEVER create UI components in this app** - All components come from `@box-model/rsd`
- **NEVER add StyleSheet styles for UI** - Styling belongs in the component libraries
- Navigation types are defined in `libs/rsd-app/src/navigation.ts`
- Theme styling (header colors, etc.) is the ONLY styling configured in `App.tsx`

## Testing

```bash
npx nx test box-model-rsd-expo      # Unit tests
npx nx e2e box-model-rsd-expo-e2e   # E2E tests
```
