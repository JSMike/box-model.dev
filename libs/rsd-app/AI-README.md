# libs/rsd-app - AI Guide

Shared application screens and logic consumed by both Next.js and Expo apps.

## Reference Documentation

**Read `libs/rsd/rsd-llms.md`** for comprehensive React Strict DOM API documentation, including:
- Core differences from React DOM (`html.*` elements, `css.create()`)
- Styling system (pseudo-states, media queries, dynamic styles)
- Cross-platform constraints and limitations
- Common mistakes and best practices

## Purpose

This library contains platform-agnostic screens that use:
- React Native primitives (`View`, `Text`, `ScrollView`, etc.)
- `@box-model/rsd` components (`Button`, `Card`, `Tag`, etc.)
- `@react-navigation/native` for navigation

The screens are consumed by:
- `apps/box-model-rsd-expo/` - Direct usage with React Navigation
- `apps/box-model-rsd-nextjs/` - Wrapped with Next.js routing

## Critical: Alignment with Vite App Pages

**Screens in this library MUST align with pages in `apps/box-model-web-vite/src/pages/`.**

| Vite Page | RSD-App Screen |
|-----------|----------------|
| `home.tsx` | `HomeScreen` |
| `about.tsx` | `AboutScreen` |
| `blogs.tsx` | `BlogsScreen` |
| `blog-article.tsx` | `BlogArticleScreen` |

When adding a new page to the Vite app, a corresponding screen MUST be created here to maintain feature parity across platforms. The screens should provide equivalent functionality and visual appearance.

## Navigation Types

Define route types in `navigation.ts`:

```typescript
// libs/rsd-app/src/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Blogs: undefined;
  BlogArticle: { slug: string };
};
```

## Screen Pattern

```tsx
// libs/rsd-app/src/<screen>/<screen>.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation';

import { Button } from '@box-model/rsd/button';
import { Card } from '@box-model/rsd/card';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ScreenName'>;

export function ScreenName() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Screen content using RN primitives + RSD components */}
        <Button onClick={() => navigation.navigate('OtherScreen')}>
          Go to Other
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ScreenName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  // ... other styles
});
```

## File Structure

Each screen in `libs/rsd-app/src/<screen>/`:

| File | Purpose |
|------|---------|
| `<screen>.tsx` | Screen component with navigation |
| `<screen>.stories.tsx` | Storybook stories with mocked navigation |
| `<screen>.stories.mdx` | Storybook documentation |
| `<screen>.spec.tsx` | Vitest unit tests |
| `index.ts` | Barrel export |

## Storybook Navigation Mock

Stories must mock `@react-navigation/native` using the mock provider:

```tsx
// libs/rsd-app/src/<screen>/<screen>.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationContainer } from '../storybook/navigation-mock';
import { ScreenName } from './screen-name';

const meta: Meta<typeof ScreenName> = {
  component: ScreenName,
  title: 'Screens/ScreenName',
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
};

export default meta;
```

The mock is defined in `libs/rsd-app/src/storybook/navigation-mock.ts`.

## Adding New Screens

1. Create directory: `libs/rsd-app/src/<screen>/`
2. Create files matching the file structure above
3. Add to `RootStackParamList` in `navigation.ts`
4. Export from `libs/rsd-app/src/index.ts`
5. Add route in consuming apps:
   - Expo: `apps/box-model-rsd-expo/src/app/App.tsx`
   - Next.js: Create `apps/box-model-rsd-nextjs/src/app/<route>/page.tsx`

## Critical Conventions

### Styling

- Use React Native `StyleSheet.create()` for layout and basic styles
- Use `@box-model/rsd` components for interactive/semantic elements
- Keep colors consistent with the design system

### Navigation

- Always type navigation props with `NativeStackNavigationProp`
- Use `useNavigation()` hook for programmatic navigation
- Route params must be defined in `RootStackParamList`

### Cross-Platform

- Avoid platform-specific APIs
- Use `react-native` primitives for layout
- Use `@box-model/rsd` for styled interactive elements
