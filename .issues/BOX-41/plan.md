# Plan: BOX-41 - Align RSD screens/components with web reference

<!-- Plan Metadata -->

| Field    | Value       |
| -------- | ----------- |
| Created  | 2026-01-24  |
| Author   | Agent       |
| Approach | In Progress |

## Goal

Align `libs/rsd-app` screens and `libs/rsd` components with the `apps/box-model-web-vite` reference to resolve visual discrepancies and missing features.

## Work Breakdown

### 1. AppNav & AppShell Alignment

- **AppShell**: Update layout container styles (width constraint `1200px`, padding) to match web `apps/box-model-web-vite/src/app/app.tsx`.
- **AppNav**:
  - Add `LogoMark` (port SVG from Vite app).
  - Align link styling (typography, colors, active state).
  - Fix header border/spacing.

### 2. HomeScreen Refactor (`libs/rsd-app/src/home/home.tsx`)

- **Hero Section**:
  - Match grid/flex layout for desktop/mobile.
  - Fix CTA button styles (ensure they look like buttons, not just links).
  - Align `Terminal` component usage.
- **Sections ("The Boxes", "Tokens", etc.)**:
  - Update `StatBox` usage to match web (check `Stat` component).
  - Update `Card` usage (headers, tags).
  - Fix `Code` block styling in "Theming mixins".
- **Responsive**:
  - Implement missing StyleX media queries for layout shifts (stack -> row).

### 3. Component Updates (`libs/rsd`)

- **Card**: Ensure `Card`, `CardHeader`, `CardBody`, `CardFooter` match web component slot behavior and styling.
- **Button**: Verify `href` prop behavior renders correct anchor styles that match button appearance.
- **Stat**: Check trend indicator and value styling.

### 4. Verification

- Use Playwright to capture before/after snapshots.
