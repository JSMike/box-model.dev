import { MarkdownBox } from '@box-model/web/markdown';
import styles from './about.module.scss';

import boxModelLogo from '../assets/box-model-logo.svg';

const aboutHeadingMarkdown = `
## What is the box model?
`;

const aboutMarkdown = `
The browser’s box model shows every element as a stack of margin, border, padding, and content. Inspecting it in devtools tells you why spacing feels right or wrong, why a hover shifts the layout, and where text actually sits inside its container. This design system borrows that mental model so spacing, layers, and colors stay predictable in both docs and production UI.
This design system follows the box model very closely; theming is inspired by the tool itself, with primary, secondary, info, success, and warning color palettes derived directly from the box model’s layers.

## Square reasoning

The Box Model UI design system treats every element as a layerable, square-edged container. Other design systems will lead you in circles; we walk a straight line and double down on predictable seams:

- **Slot-first components.** Headers, footers, and actions are always named the same, so you can pack your boxes without re-learning a new API.
- **Token-driven visuals.** Typography, spacing, color, and motion all come out of the same box of tokens—CSS, SCSS, JS, and TS line up on the exact same variables.
- **Story-driven adoption.** If a team needs an example, they can copy the story markup directly—no wrappers or helper components required.

:::divider
:::

## What's in the box?

Surface-level UI is only part of the work. Box Model UI also includes content scaffolding:

1. **Markdown-aware layouts.** The \`markdown-box\` element lets writers describe sections, dividers, and even interactive components in natural markdown.
2. **Grid primitives.** Columns, stats, and hero layouts reuse the same gap + padding math, so anything authored in the app mirrors what ships in production.
3. **Accessibility by default.** Focus outlines, aria attributes, and keyboard flows let users of varying abilities fit comfortably inside the box.

## The 🎀 on the 📦

> A design system succeeds when “throwaway” pages are still beautiful.
>
> — Codex / gpt-5.1-codex-max

The About page you are reading is written with Markdown that snaps into place with Box Model UI components.
`;

export default function AboutComponent() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section
        className={`${styles.hero} box-model-surface box-model-surface--prominent`}
      >
        <p className={styles.eyebrow}>About Box Model UI</p>
        <h1>Building boxes</h1>
        <p>
          Box Model UI is a passion project by{' '}
          <a
            href="https://www.linkedin.com/in/michael-cebrian-94248378/"
            target="_blank"
            rel="noreferrer"
          >
            Michael Cebrian
          </a>
          . The source is available at{' '}
          <a
            href="https://github.com/JSMike/box-model.dev"
            target="_blank"
            rel="noreferrer"
          >
            github.com/JSMike/box-model.dev
          </a>
          .
        </p>
      </section>

      <section
        className={`${styles.article} box-model-surface box-model-surface--flat`}
      >
        <MarkdownBox>{aboutHeadingMarkdown}</MarkdownBox>
        <img
          className={styles.logo}
          src={boxModelLogo}
          width="320"
          height="240"
          alt="Diagram of the Box Model margin, border, padding, and content layers"
        />
        <MarkdownBox>{aboutMarkdown}</MarkdownBox>
      </section>
    </main>
  );
}
