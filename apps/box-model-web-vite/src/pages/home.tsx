import { BadgeBox } from '@box-model/web/badge';
import { ButtonBox } from '@box-model/web/button';
import { CardBox } from '@box-model/web/card';
import { StatBox, StatTrend } from '@box-model/web/stat';
import { TagBox } from '@box-model/web/tag';
import { TerminalBox, TerminalLineBox } from '@box-model/web/terminal';
import { STORYBOOK_URL } from '../app/config';
import styles from './home.module.scss';

const tokenSets = [
  { title: 'Spacing scale', detail: 'Stack, inline, gap: all pulled from the spacing tokens and mixins.', tags: ['space-2', 'space-4', 'space-6'] },
  { title: 'Typography', detail: 'Mono by default, readable everywhere. Tokens for size, weight, and leading.', tags: ['font-body', 'font-mono', 'line-tight'] },
  { title: 'Color semantics', detail: 'Canvas, surface, feedback colors all backed by light/dark values.', tags: ['background-surface', 'brand-primary', 'feedback-success'] },
  { title: 'Motion', detail: 'Snappy transitions defined once. No ad-hoc easing curves sneaking in.', tags: ['ease-snappy', 'duration-120', 'duration-200'] },
];

const themeSamples = [
  {
    title: 'Light surfaces',
    mixin: '@include theme.apply-theme(light);',
    detail: 'Default canvas + surface tokens for docs and product UI.',
    tokens: ['background-surface', 'text-primary', 'border-subtle'],
    tone: 'light',
  },
  {
    title: 'Dark lockup',
    mixin: '@include theme.force-theme(dark);',
    detail: 'Use on media-led sections that need dark surfaces and inverse text.',
    tokens: ['background-inverse', 'text-inverse', 'border-inverse'],
    tone: 'dark',
  },
];

const toolBox = [
  {
    label: 'Lit',
    description: 'Lightweight web component base powering every box.',
    docs: 'https://lit.dev/',
    repo: 'https://github.com/lit/lit',
  },
  {
    label: 'Nx',
    description: 'Task runner and monorepo tooling for builds, linting, and tests.',
    docs: 'https://nx.dev/',
    repo: 'https://github.com/nrwl/nx',
  },
  {
    label: 'Storybook',
    description: 'Docs and playground that mirror production markup.',
    docs: 'https://storybook.js.org/',
    repo: 'https://github.com/storybookjs/storybook',
  },
  {
    label: 'Vite + Vitest',
    description: 'Fast builds and tests for a square developer loop.',
    docs: 'https://vitejs.dev/',
    repo: 'https://github.com/vitejs/vite',
  },
  {
    label: 'Style Dictionary',
    description: 'Token pipeline that keeps design variables boxed and synced.',
    docs: 'https://amzn.github.io/style-dictionary/',
    repo: 'https://github.com/amzn/style-dictionary',
  },
  {
    label: 'Sass',
    description: 'Authoring layer for tokens and mixins without cutting corners.',
    docs: 'https://sass-lang.com/',
    repo: 'https://github.com/sass/dart-sass',
  },
];

const boxTypes = [
  {
    title: 'Feedback boxes',
    detail: 'Alerts, banners, badges, toasts, and status icons keep signals consistent.',
    components: ['alert-box', 'banner-box', 'badge-box', 'toast-box', 'status-icon'],
    trend: 'neutral' as StatTrend,
  },
  {
    title: 'Data boxes',
    detail: 'Stats, tables, lists, and columns surface numbers without rounded corners.',
    components: ['stat-box', 'table-box', 'list-box', 'columns-box'],
    trend: 'neutral' as StatTrend,
  },
  {
    title: 'Form boxes',
    detail: 'Inputs, selects, radios, checkboxes, and toolbars keep flows on a square grid.',
    components: ['input-box', 'select-box', 'radio-box', 'checkbox-box', 'toolbar-box'],
    trend: 'neutral' as StatTrend,
  },
  {
    title: 'Content boxes',
    detail: 'Cards, dialogs, drawers, tooltips, and links keep layouts boxed in.',
    components: ['card-box', 'dialog-box', 'drawer-box', 'tooltip-box', 'link-box'],
    trend: 'neutral' as StatTrend,
  },
];

export default function HomePage() {
  return (
    <main className={`${styles.page} ${styles.canvas}`}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <hgroup>
            <h1>Box Model UI</h1>
            <p>The design system that refuses to cut corners</p>
          </hgroup>

          <p className={styles.lede}>
            Custom elements powered by Lit. Copy the markup straight from Storybook and start shipping with boxes.
          </p>
          <div className={styles.heroActions}>
            <ButtonBox>
              <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
                Open Storybook
              </a>
            </ButtonBox>
            <ButtonBox variant="secondary">
              <a href="/blogs">Developer Blog</a>
            </ButtonBox>
            <ButtonBox variant="tertiary">
              <a href="https://github.com/JSMike/box-model.dev">GitHub</a>
            </ButtonBox>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <TerminalBox>
            <TerminalLineBox variant="prompt">npm install @box-model/web</TerminalLineBox>
            <TerminalLineBox variant="info">Using box-model UI</TerminalLineBox>
            <TerminalLineBox variant="success">32+ boxes</TerminalLineBox>
            <TerminalLineBox variant="success">1024+ tokens</TerminalLineBox>
            <TerminalLineBox variant="success">0 rounded edges</TerminalLineBox>
            <TerminalLineBox variant="prompt" cursor></TerminalLineBox>
          </TerminalBox>
        </div>
      </section>
      <section className={`${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2>Thinking inside the box</h2>
          <p>A look at what's included in Box Model UI.</p>
        </div>

        <div className={styles.sectionBlock}>
          <h3>The Boxes</h3>
          <p className={styles.subtle}>Each box has a job, so every layer of the stack stays squared away.</p>
          <div className={styles.statStack}>
            {boxTypes.map((box) => (
              <StatBox
                key={box.title}
                trend={box.trend}
                value={box.title}
                delta={box.detail}
                show-trend-indicator={box.trend !== 'neutral'}
              >
                <span slot="title">{box.title}</span>
                <div className={styles.tagRow}>
                  {box.components.map((component) => (
                    <TagBox key={component} variant="neutral">
                      <span>{component}</span>
                    </TagBox>
                  ))}
                </div>
              </StatBox>
            ))}
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <h3>Tokens</h3>
          <p className={styles.subtle}>Keep things straight and stop cutting corners with magic numbers.</p>
          <div className={styles.tokenGrid}>
            {tokenSets.map((set) => (
              <CardBox key={set.title} className={styles.card}>
                <h4 slot="header">{set.title}</h4>
                <p className={styles.subtle}>{set.detail}</p>
                <div className={styles.tagRow}>
                  {set.tags.map((tag) => (
                    <TagBox key={tag} variant="neutral">
                      <span>{tag}</span>
                    </TagBox>
                  ))}
                </div>
              </CardBox>
            ))}
          </div>
        </div>

        <div className={styles.sectionBlock}>
          <h3>Theming mixins</h3>
          <p className={styles.subtle}>Swap from light to dark without unpacking. Just @mixin and match.</p>
          <div className={styles.themeSamples}>
            {themeSamples.map((sample) => (
              <div
                key={sample.title}
                className={`${styles.themeCard} ${sample.tone === 'dark' ? styles.themeDark : styles.themeLight}`}
              >
                <div className={styles.themeHeader}>
                  <BadgeBox>
                    <span>{sample.title}</span>
                  </BadgeBox>
                  <pre className={styles.mixin}>
                    <code>{sample.mixin}</code>
                  </pre>
                </div>
                <p className={styles.subtle}>{sample.detail}</p>
                <div className={styles.tagRow}>
                  {sample.tokens.map((token) => (
                    <TagBox key={token} variant="neutral">
                      <span>{token}</span>
                    </TagBox>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2>The tool-box</h2>
          <p>Square fundamentals we rely on, with docs one click away.</p>
        </div>
        <div className={styles.toolGrid}>
          {toolBox.map((tool) => (
            <CardBox key={tool.label} className={styles.card}>
              <h4 slot="header">{tool.label}</h4>
              <p className={styles.subtle}>{tool.description}</p>
              <div className={styles.toolLinks}>
                <a href={tool.docs} target="_blank" rel="noreferrer">
                  Docs
                </a>
                <a href={tool.repo} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </CardBox>
          ))}
        </div>
      </section>
    </main>
  );
}
