# BOX-34: Mirror box-model-app to box-model-native using RSD

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | Agent                               |
| Created      | 2026-01-24                          |
| Source       | feature-request                     |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | high                                |

## Summary

Mirror the web app (`apps/box-model-app`) to the native app (`apps/box-model-native`) using `@box-model/rsd` components instead of `@box-model/web`. The native app was scaffolded using `@nx/expo` generator and contains default boilerplate that should be replaced.

## Context

- Expo app scaffolded with `@nx/expo` generator
- RSD library now has all required components: Badge, Button, Card, Tag, Terminal, TerminalLine, Stat, StatusIcon, Divider, Markdown
- Web app uses react-router-dom for routing; native app will need React Navigation
- Web app pages: HomePage, AboutPage, BlogsPage, BlogArticlePage
- Web app components: TerminalBox, PlaygroundBox

## Web App Structure to Mirror

```
apps/box-model-app/src/
├── app/
│   ├── app.tsx              # Routes setup
│   └── app-nav.tsx          # Navigation component
├── pages/
│   ├── home.tsx             # Landing page with terminal examples
│   ├── about.tsx            # About page with markdown content
│   ├── blogs.tsx            # Blog listing with cards
│   └── blog-article.tsx     # Individual blog post
└── components/
    ├── TerminalBox.tsx      # Terminal display wrapper
    └── PlaygroundBox.tsx    # Interactive component playground
```

## Acceptance Criteria

- [ ] Remove default Nx/Expo boilerplate from App.tsx
- [ ] Set up React Navigation with stack/tab navigation
- [ ] Create native equivalents of all pages:
  - [ ] HomeScreen
  - [ ] AboutScreen
  - [ ] BlogsScreen
  - [ ] BlogArticleScreen
- [ ] Import components from `@box-model/rsd` instead of `@box-model/web`
- [ ] Adapt layouts for mobile (ScrollView, SafeAreaView, etc.)
- [ ] Verify app runs on iOS simulator and Android emulator
- [ ] Blog data fetching works in native context

## Technical Notes

### Component Mapping
| Web (`@box-model/web`) | Native (`@box-model/rsd`) |
|------------------------|---------------------------|
| ButtonBox | Button |
| CardBox | Card |
| BadgeBox | Badge |
| TagBox | Tag |
| TerminalBox | Terminal |
| TerminalLineBox | TerminalLine |
| StatBox | Stat |
| StatusIconBox | StatusIcon |
| DividerBox | Divider |
| MarkdownBox | Markdown |

### Dependencies to Add
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `react-native-screens`
- `react-native-safe-area-context`

### Key Differences
- No SCSS imports (StyleX handles everything)
- Use `ScrollView` and `SafeAreaView` for layout
- Navigation uses React Navigation instead of react-router-dom
- May need to adjust blog data fetching for React Native

## References

- Web app: `apps/box-model-app/src/`
- Native app: `apps/box-model-native/src/`
- RSD library: `libs/rsd/src/`
- Related issues: BOX-28 through BOX-33 (RSD components)
