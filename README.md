# Box Model

A design system that thinks inside the box. No cutting corners—this design system provides framework-agnostic web components (for Angular, Vue, vanilla JS, or any framework) and cross-platform React components via React Strict DOM (for React web, Android, and iOS). Built with accessibility and developer experience as first-class priorities.

**Live site:** [box-model.dev](https://box-model.dev)

## What's in the Box?

This is an Nx monorepo containing design tokens, component libraries, and demo applications.

### Libraries

| Package | Description |
|---------|-------------|
| `@box-model/tokens` | Design tokens (colors, spacing, typography) via Style Dictionary |
| `@box-model/web` | Web Components built with Lit |
| `@box-model/rsd` | Cross-platform components with React Strict DOM |
| `@box-model/rsd-app` | Shared app screens for RSD applications |

### Applications

| App | Description |
|-----|-------------|
| `box-model-web-vite` | Vite demo app showcasing web components |
| `box-model-rsd-nextjs` | Next.js web app using RSD |
| `box-model-rsd-expo` | Expo mobile app (Android/iOS) using RSD |

## Prerequisites

- **Node.js** — Required for all packages
- **Java JDK 17** — Required for Android development (`box-model-rsd-expo`)

## Installation

```bash
# Install dependencies
npm install

# Build tokens (required before other builds)
npm run build:tokens
```

## Expo Prebuild

The Expo native project files are generated. Before running Android/iOS builds, create them from the Expo app directory:

```bash
cd apps/box-model-rsd-expo
npm run prebuild
```

## Development

```bash
# Start Storybook (web components)
npx nx storybook web -o

# Start Storybook (RSD components)
npx nx storybook rsd -o

# Start Next.js app
npx nx start box-model-rsd-nextjs

# Start Expo app
npx nx start box-model-rsd-expo

# Start Vite demo
npx nx serve box-model-web-vite
```

## Using the Libraries

### Web Components

```bash
npm install @box-model/web
```

```html
<script type="module">
  import '@box-model/web';
</script>

<button-box variant="primary">Click me</button-box>
<card-box>
  <span slot="header">Welcome</span>
  <p>Content goes here.</p>
</card-box>
```

### React Strict DOM

```bash
npm install @box-model/rsd
```

```tsx
import { Button, Card, CardHeader, CardBody } from '@box-model/rsd';

function App() {
  return (
    <Card>
      <CardHeader>Welcome</CardHeader>
      <CardBody>
        <Button variant="primary" onPress={() => {}}>
          Click me
        </Button>
      </CardBody>
    </Card>
  );
}
```

## Design Principles

- **Square edges only** — No `border-radius`. Ever. We're committed to the box.
- **Accessibility first** — WCAG AA contrast, keyboard navigation, screen reader support.
- **Cross-platform** — Write once with RSD, run on web, Android, and iOS.
- **Tokens-driven** — All styling flows from design tokens for consistency.

## Contributing

```bash
# Run tests
npx nx run-many -t test

# Run linting
npx nx run-many -t lint

# Format code
npx nx format:write

# Build everything
npx nx run-many -t build
```

See `AI-README.md` for detailed conventions and `AI-WORKFLOW.md` for issue tracking.

## Resources

### Core Technologies

- [Nx](https://nx.dev/getting-started/intro) — Monorepo build system
- [Style Dictionary](https://styledictionary.com/getting-started/) — Design tokens

### Web Components

- [Lit](https://lit.dev/docs/getting-started/) — Web Components library
- [Nx + Vite](https://nx.dev/docs/technologies/build-tools/vite/introduction) — Build tooling

### React Strict DOM

- [React Strict DOM](https://facebook.github.io/react-strict-dom/learn/) — Cross-platform React
- [Nx + Expo](https://nx.dev/docs/technologies/react/expo/introduction#using-expo) — Mobile development
- [Expo](https://docs.expo.dev/) — React Native toolchain
- [Next.js](https://nextjs.org/docs) — React web framework

## License

[MIT](./LICENSE) — Use it, box it, ship it.
