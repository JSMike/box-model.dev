# Changelog

All notable changes to `@box-model/web` are documented here.

This project follows [Semantic Versioning](https://semver.org/). While the package is below 1.0,
minor releases may include breaking public API changes. Patch releases preserve compatibility
within the current minor release.

## 0.0.1 - 2026-07-26

Initial public release of Box Model UI's Lit-based, framework-agnostic web component library.

### Components

- Feedback and status: `alert-box`, `badge-box`, `banner-box`, `loading-box`, `progress-box`,
  `skeleton-box`, `stat-box`, `status-icon-box`, `tag-box`, and `toast-box`
- Forms and actions: `button-box`, `checkbox-group-box`, `close-control-box`, `input-box`,
  `link-box`, `radio-group-box`, `select-box`, `textarea-box`, `toolbar-box`, and `wysiwyg-box`
- Layout and content: `card-box`, `columns-box`, `divider-box`, `list-box`, `markdown-box`,
  `table-box`, `terminal-box`, and `terminal-line-box`
- Overlays: `dialog-box`, `dialog-footer-box`, `dialog-header-box`, `drawer-box`,
  `drawer-header-box`, and `tooltip-box`

### Included

- Root and per-component ESM registration entrypoints
- TypeScript declarations and global `HTMLElementTagNameMap` entries
- Opt-in React, Preact, and Solid JSX declarations
- A standards-based Custom Elements Manifest with typed properties, attributes, events, slots,
  CSS parts, and CSS custom properties
- Sass themes, design tokens, utility classes, and public mixins
- A packaged Agent Skill with component composition and styling guidance
