import React from 'react';
import { useWindowDimensions } from 'react-native';
import { css, html } from 'react-strict-dom';

import { Markdown } from '@box-model/rsd/markdown';
import { Link } from '@box-model/rsd/link';
import {
  colorTextTokens,
  spaceTokens,
  typographyRolesTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

import { AppShell } from '../components/app-shell';
import { MarkdownRenderer } from '../components/markdown-renderer';
import { BOX_MODEL_LOGO_SRC } from '../components/box-model-logo-src';

const logoMarkup = BOX_MODEL_LOGO_SRC
  ? `<img src="${BOX_MODEL_LOGO_SRC}" alt="Box Model logo" style="display: block; margin: 0 auto" />`
  : '';

const aboutMarkdown = `
## What is the box model?

${logoMarkup}

The browser’s box model shows every element as a stack of margin, border, padding, and content. Inspecting it in devtools tells you why spacing feels right or wrong, why a hover shifts the layout, and where text actually sits inside its container. This design system borrows that mental model so spacing, layers, and colors stay predictable in both docs and production UI.
This design system follows the box model very closely; theming is inspired by the tool itself, with primary, secondary, info, success, amd warning color palettes are derived directly from the box model’s layers.

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
> <cite>Codex / gpt-5.1-codex-max</cite>

The About page you are reading is written with Markdown that snaps into place with Box Model UI components.
`;

const styles = css.create({
  page: {
    width: '100%',
    maxWidth: 960,
    fontFamily: typographyTokens.fontFamilyMono,
    color: colorTextTokens.primary,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackXl,
  },
  pagePadding: (padding: number) => ({
    paddingTop: padding,
    paddingBottom: padding,
    paddingLeft: padding,
    paddingRight: padding,
  }),
  hero: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
  },
  eyebrow: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.secondary,
    fontSize: typographyTokens.fontSizeSm,
    textTransform: 'uppercase',
    letterSpacing: typographyTokens.letterSpacingWide,
  },
  title: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: typographyRolesTokens.headingH1FontFamily,
    fontWeight: typographyRolesTokens.headingH1FontWeight,
    fontSize: {
      default: typographyRolesTokens.headingH1FontSize,
      '@media (min-width: 960px)': typographyTokens.fontSize4xl,
    },
  },
  intro: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.secondary,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  article: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackLg,
  },
});

export function AboutScreen() {
  const { width } = useWindowDimensions();
  const pagePadding =
    width >= 960 ? 40 : width >= 720 ? 32 : 24;

  return (
    <AppShell activeRoute="About">
      <html.main style={[styles.page, styles.pagePadding(pagePadding)]}>
        <html.section style={styles.hero}>
          <html.p style={styles.eyebrow}>About Box Model UI</html.p>
          <html.h1 style={styles.title}>Building boxes</html.h1>
          <html.p style={styles.intro}>
            Box Model UI is a passion project by{' '}
            <Link
              href="https://www.linkedin.com/in/michael-cebrian-94248378/"
              target="_blank"
              rel="noreferrer"
            >
              Michael Cebrian
            </Link>
            . The code is currently kept in a locked box, but you can see some of my other projects and open-source contributions at{' '}
            <Link
              href="https://github.com/jsmike"
              target="_blank"
              rel="noreferrer"
            >
              github.com/jsmike
            </Link>
            .
          </html.p>
        </html.section>

        <html.section style={styles.article}>
          <Markdown>
            <MarkdownRenderer content={aboutMarkdown} />
          </Markdown>
        </html.section>
      </html.main>
    </AppShell>
  );
}

export default AboutScreen;
