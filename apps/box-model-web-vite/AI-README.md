# apps/box-model-web-vite - AI Guide

Demo application showcasing `@box-model/web` Lit web components. Built with Vite and React.

## Critical: Use Libraries, Not Bespoke Code

**DO NOT create custom UI components here. Use `@box-model/web` exclusively.**

- **UI Components**: Use `@box-model/web` exclusively. If a component doesn't exist, add it to `libs/web/`, not here.
- **Styles**: Page styles (`*.module.scss`) should only handle layout. Component styling belongs in `libs/web/`.

The only code that belongs in this app:
- Page components (`src/pages/`) that compose `@box-model/web` components
- App shell and routing (`src/app/`)
- Page-specific layout styles (`*.module.scss`)

**If you find yourself writing a new UI component in this app, STOP. Add it to `libs/web/` instead.**

## Critical: Alignment with RSD-App Screens

**Pages in this app MUST have corresponding screens in `libs/rsd-app/`.**

| Vite Page | RSD-App Screen |
|-----------|----------------|
| `home.tsx` | `HomeScreen` |
| `about.tsx` | `AboutScreen` |
| `blogs.tsx` | `BlogsScreen` |
| `blog-article.tsx` | `BlogArticleScreen` |

When adding a new page here, a corresponding screen MUST be created in `libs/rsd-app/` to maintain feature parity across platforms.

## Technology Stack

- **Vite**: Build tool and dev server
- **React**: Application framework
- **React Router**: Client-side routing
- **@box-model/web**: Lit web components library

## Running the App

```bash
npx nx serve box-model-web-vite    # Dev server
npx nx build box-model-web-vite    # Production build
npx nx test box-model-web-vite     # Unit tests
```

## Project Structure

```
apps/box-model-web-vite/src/
├── app/                # App shell and navigation
│   ├── app.tsx
│   ├── app-nav.tsx
│   └── config.ts
├── pages/              # Route pages
│   ├── home.tsx
│   ├── about.tsx
│   ├── blogs.tsx
│   └── blog-article.tsx
├── components/         # App-specific components
├── assets/             # Static assets
├── main.tsx            # Entry point
└── styles.scss         # Global styles
```

## Using Web Components

Import and use `@box-model/web` components as custom elements:

```tsx
// Import the component (registers the custom element)
import '@box-model/web/button';
import '@box-model/web/card';

function Page() {
  return (
    <div>
      <button-box variant="primary" onClick={() => console.log('clicked')}>
        Click me
      </button-box>
      <card-box>
        Card content
      </card-box>
    </div>
  );
}
```

## Styling

- Global styles in `src/styles.scss`
- Page-specific styles in `src/pages/*.module.scss`
- Uses design tokens via CSS custom properties from `@box-model/tokens`

## Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/app/app.tsx`
3. Add navigation link in `src/app/app-nav.tsx` if needed

## Environment Configuration

Environment-specific configuration in `env/`:
- `env.ts` - Base configuration
- `env.dev.ts` - Development overrides

## Important Notes

- **NEVER create UI components in this app** - All components come from `@box-model/web`
- **NEVER add component styles here** - Component styling belongs in `libs/web/`
- **ALWAYS create matching RSD screen** - New pages require a corresponding screen in `libs/rsd-app/`
- Page `*.module.scss` files are for layout only, not component styling
