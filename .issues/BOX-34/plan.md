# Plan: BOX-34 - Mirror box-model-app to box-model-native using RSD

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Approved                            |

## Approach

Mirror the web app structure to React Native using @box-model/rsd components. Use React Navigation for routing (replaces react-router-dom). Simplify layouts for mobile using ScrollView and StyleX styling.

## Files to Create/Modify

### Native App Structure
```
apps/box-model-native/src/
├── app/
│   ├── App.tsx           # Navigation container + stack navigator
│   ├── blog-posts.ts     # Copy from web app (shared data)
│   └── config.ts         # App config
├── screens/
│   ├── HomeScreen.tsx    # Landing with terminal examples
│   ├── AboutScreen.tsx   # About page with markdown
│   ├── BlogsScreen.tsx   # Blog listing
│   └── BlogArticleScreen.tsx  # Individual blog post
└── components/
    └── (shared components if needed)
```

### Files to Modify
- `apps/box-model-native/src/app/App.tsx` - Replace boilerplate with navigation
- `apps/box-model-native/package.json` - Add React Navigation deps

### Files to Create
- `apps/box-model-native/src/app/blog-posts.ts` - Blog data
- `apps/box-model-native/src/app/config.ts` - Config
- `apps/box-model-native/src/screens/HomeScreen.tsx`
- `apps/box-model-native/src/screens/AboutScreen.tsx`
- `apps/box-model-native/src/screens/BlogsScreen.tsx`
- `apps/box-model-native/src/screens/BlogArticleScreen.tsx`

## Implementation Steps

1. [x] Remove Nx/Expo boilerplate from App.tsx
2. [x] Install React Navigation dependencies
3. [x] Set up navigation with stack navigator
4. [x] Create HomeScreen with RSD components
5. [x] Create AboutScreen with Markdown
6. [x] Create BlogsScreen with Cards
7. [x] Create BlogArticleScreen
8. [ ] Verify app builds and runs (requires device/simulator)

## Component Mapping

| Web Component | RSD Component | Usage |
|--------------|---------------|-------|
| ButtonBox | Button | CTAs, navigation |
| CardBox | Card | Blog cards, tool cards |
| BadgeBox | Badge | Theme labels |
| TagBox | Tag | Post tags, component tags |
| TerminalBox | Terminal | Install commands |
| TerminalLineBox | TerminalLine | Terminal lines |
| StatBox | Stat | Component categories |
| MarkdownBox | Markdown | About content, blog content |

## Simplifications for Native

1. **Styling**: Use StyleX via RSD instead of SCSS modules
2. **Navigation**: React Navigation stack instead of react-router-dom
3. **Layout**: ScrollView + SafeAreaView for mobile viewports
4. **Links**: Remove external links or use Linking API
5. **Images**: Handle SVG/images differently (react-native-svg already installed)

## Risks & Considerations

- RSD Markdown component is simplified (container only, no parsing)
- May need to simplify complex layouts for mobile
- External links need Linking API instead of anchor tags
- No SCSS modules available - must use inline StyleX styles

## Alternatives Considered

1. **Expo Router** - Would provide file-based routing but adds complexity
2. **Tab navigation** - Could use tabs instead of stack, but stack mirrors web better
