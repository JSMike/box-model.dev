import React from 'react';
import { useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { css, html } from 'react-strict-dom';

import { Button } from '@box-model/rsd/button';
import { Card, CardBody, CardHeader } from '@box-model/rsd/card';
import { Tag } from '@box-model/rsd/tag';
import { Terminal, TerminalLine } from '@box-model/rsd/terminal';
import { Stat, StatTrend } from '@box-model/rsd/stat';
import { Badge } from '@box-model/rsd/badge';
import { Columns } from '@box-model/rsd/columns';
import { Link } from '@box-model/rsd/link';
import {
  colorBackgroundTokens,
  colorBorderTokens,
  colorTextTokens,
  sizeTokens,
  spaceTokens,
  typographyRolesTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

import { AppShell } from '../components/app-shell';
import { STORYBOOK_URL } from '../config';
import type { RootStackParamList } from '../navigation';

const tokenSets = [
  {
    title: 'Spacing scale',
    detail:
      'Stack, inline, gap: all pulled from the spacing tokens and mixins.',
    tags: ['space-2', 'space-4', 'space-6'],
  },
  {
    title: 'Typography',
    detail:
      'Mono by default, readable everywhere. Tokens for size, weight, and leading.',
    tags: ['font-body', 'font-mono', 'line-tight'],
  },
  {
    title: 'Color semantics',
    detail: 'Canvas, surface, feedback colors all backed by light/dark values.',
    tags: ['background-surface', 'brand-primary', 'feedback-success'],
  },
  {
    title: 'Motion',
    detail:
      'Snappy transitions defined once. No ad-hoc easing curves sneaking in.',
    tags: ['ease-snappy', 'duration-120', 'duration-200'],
  },
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
    detail:
      'Use on media-led sections that need dark surfaces and inverse text.',
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
    description:
      'Task runner and monorepo tooling for builds, linting, and tests.',
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
    description:
      'Authoring layer for tokens and mixins without cutting corners.',
    docs: 'https://sass-lang.com/',
    repo: 'https://github.com/sass/dart-sass',
  },
];

const boxTypes = [
  {
    title: 'Feedback boxes',
    detail:
      'Alerts, banners, badges, toasts, and status icons keep signals consistent.',
    components: [
      'alert-box',
      'banner-box',
      'badge-box',
      'toast-box',
      'status-icon',
    ],
    trend: 'neutral' as StatTrend,
  },
  {
    title: 'Data boxes',
    detail:
      'Stats, tables, lists, and columns surface numbers without rounded corners.',
    components: ['stat-box', 'table-box', 'list-box', 'columns-box'],
    trend: 'neutral' as StatTrend,
  },
  {
    title: 'Form boxes',
    detail:
      'Inputs, selects, radios, checkboxes, and toolbars keep flows on a square grid.',
    components: [
      'input-box',
      'select-box',
      'radio-box',
      'checkbox-box',
      'toolbar-box',
    ],
    trend: 'neutral' as StatTrend,
  },
  {
    title: 'Content boxes',
    detail:
      'Cards, dialogs, drawers, tooltips, and links keep layouts boxed in.',
    components: [
      'card-box',
      'dialog-box',
      'drawer-box',
      'tooltip-box',
      'link-box',
    ],
    trend: 'neutral' as StatTrend,
  },
];

const boxTypeRows = boxTypes.reduce<
  Array<Array<(typeof boxTypes)[number]>>
>((rows, box, index) => {
  if (index % 2 === 0) {
    rows.push([box]);
    return rows;
  }

  rows[rows.length - 1].push(box);
  return rows;
}, []);

const styles = css.create({
  page: {
    width: '100%',
    maxWidth: 1200,
    fontFamily: typographyTokens.fontFamilyMono,
    color: colorTextTokens.primary,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: {
      default: spaceTokens.layoutSectionLg,
      '@media (min-width: 960px)': spaceTokens.scale600,
    },
  },
  pagePadding: (padding: number) => ({
    paddingTop: padding,
    paddingBottom: padding,
    paddingLeft: padding,
    paddingRight: padding,
  }),
  canvas: {
    backgroundColor: colorBackgroundTokens.canvas,
  },
  hero: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 960px)': 'row',
    },
    gap: spaceTokens.layoutGutterLg,
    alignItems: 'flex-start',
    paddingTop: spaceTokens.layoutSectionLg,
    paddingBottom: spaceTokens.layoutSectionLg,
  },
  heroCopy: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackLg,
    flexGrow: 1,
    flexBasis: 0,
  },
  heroHeadline: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
  },
  heroTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: typographyRolesTokens.headingH1FontFamily,
    fontWeight: typographyRolesTokens.headingH1FontWeight,
    fontSize: {
      default: '2.1rem',
      '@media (min-width: 720px)': '2.5rem',
      '@media (min-width: 960px)': '2.9rem',
    },
    lineHeight: '1.1',
    color: colorTextTokens.primary,
  },
  heroSubtitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSizeMd,
    color: colorTextTokens.secondary,
  },
  lede: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSizeMd,
    color: colorTextTokens.secondary,
    lineHeight: typographyTokens.lineHeightNormal,
    maxWidth: '65ch',
  },
  heroActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spaceTokens.scale150,
    alignItems: 'center',
    marginTop: spaceTokens.stackSm,
  },
  heroPanel: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    width: '100%',
    alignSelf: 'stretch',
    minWidth: '280px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.layoutSectionLg,
  },
  sectionHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
    maxWidth: '65ch',
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: '1.4rem',
    fontFamily: typographyRolesTokens.headingH2FontFamily,
    fontWeight: typographyRolesTokens.headingH2FontWeight,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  sectionSubtitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSizeMd,
    color: colorTextTokens.secondary,
  },
  sectionBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackXl,
  },
  blockTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyRolesTokens.headingH3FontSize,
    fontFamily: typographyRolesTokens.headingH3FontFamily,
    fontWeight: typographyRolesTokens.headingH3FontWeight,
    lineHeight: typographyRolesTokens.headingH3LineHeight,
  },
  subtle: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.secondary,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  statStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.scale150,
    width: '100%',
  },
  statRow: {
    display: 'flex',
    flexDirection: {
      default: 'column',
      '@media (min-width: 720px)': 'row',
    },
    gap: spaceTokens.scale150,
    width: '100%',
  },
  statItem: {
    display: 'flex',
    flex: 1,
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spaceTokens.scale100,
  },
  cardHeading: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSize2xl,
  },
  themeCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
    paddingTop: spaceTokens.scale200,
    paddingBottom: spaceTokens.scale200,
    paddingLeft: spaceTokens.scale200,
    paddingRight: spaceTokens.scale200,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.subtle,
  },
  themeHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spaceTokens.scale150,
    flexWrap: 'wrap',
  },
  mixin: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: typographyRolesTokens.codeFontFamily,
    fontSize: typographyRolesTokens.codeFontSize,
    backgroundColor: colorBackgroundTokens.sunken,
    paddingTop: spaceTokens.scale100,
    paddingBottom: spaceTokens.scale100,
    paddingLeft: spaceTokens.scale150,
    paddingRight: spaceTokens.scale150,
  },
  themeLight: {
    backgroundColor: colorBackgroundTokens.surfaceLight,
    color: colorTextTokens.primaryLight,
    borderColor: colorBorderTokens.subtle,
  },
  themeDark: {
    backgroundColor: colorBackgroundTokens.surface,
    color: colorTextTokens.primary,
    borderColor: colorBorderTokens.subtle,
  },
  toolLinks: {
    display: 'flex',
    gap: spaceTokens.scale150,
    flexWrap: 'wrap',
  },
});

export function HomeScreen() {
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList, 'Home'>
  >();
  const { width } = useWindowDimensions();
  const pagePadding =
    width >= 960 ? 40 : width >= 720 ? 32 : 24;

  return (
    <AppShell activeRoute="Home">
      <html.main style={[styles.page, styles.pagePadding(pagePadding), styles.canvas]}>
        <html.section style={styles.hero}>
          <html.div style={styles.heroCopy}>
            <html.div style={styles.heroHeadline}>
              <html.h1 style={styles.heroTitle}>Box Model UI</html.h1>
              <html.p style={styles.heroSubtitle}>
                The design system that refuses to cut corners
              </html.p>
            </html.div>
            <html.p style={styles.lede}>
              Custom elements powered by Lit. Copy the markup straight from
              Storybook and start shipping with boxes.
            </html.p>
            <html.div style={styles.heroActions}>
              <Button href={STORYBOOK_URL} target="_blank" rel="noreferrer">
                Open Storybook
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigation.navigate('Blogs')}
              >
                Developer Blog
              </Button>
              <Button href="https://github.com/JSMike/box-model.dev" target="_blank" rel="noreferrer" variant="ghost">
                Open Storybook
              </Button>
            </html.div>
          </html.div>
          <html.div style={styles.heroPanel}>
            <Terminal>
              <TerminalLine variant="prompt">
                npm install @box-model/web
              </TerminalLine>
              <TerminalLine variant="info">Using box-model UI</TerminalLine>
              <TerminalLine variant="success">32+ boxes</TerminalLine>
              <TerminalLine variant="success">1024+ tokens</TerminalLine>
              <TerminalLine variant="success">0 rounded edges</TerminalLine>
              <TerminalLine variant="prompt" cursor>
                {' '}
              </TerminalLine>
            </Terminal>
          </html.div>
        </html.section>

        <html.section style={styles.section}>
          <html.div style={styles.sectionHeader}>
            <html.h2 style={styles.sectionTitle}>
              Thinking inside the box
            </html.h2>
            <html.p style={styles.sectionSubtitle}>
              A look at what&apos;s included in Box Model UI.
            </html.p>
          </html.div>

          <html.div style={styles.sectionBlock}>
            <html.h3 style={styles.blockTitle}>The Boxes</html.h3>
            <html.p style={styles.subtle}>
              Each box has a job, so every layer of the stack stays squared
              away.
            </html.p>
            <html.div style={styles.statStack}>
              {boxTypeRows.map((row, rowIndex) => (
                <html.div key={`row-${rowIndex}`} style={styles.statRow}>
                  {row.map((box) => (
                    <html.div key={box.title} style={styles.statItem}>
                      <Stat
                        value={box.title}
                        delta={box.detail}
                        trend={box.trend}
                        showTrendIndicator={box.trend !== 'neutral'}
                      >
                        <html.div style={styles.tagRow}>
                          {box.components.map((component) => (
                            <Tag key={component} variant="neutral">
                              {component}
                            </Tag>
                          ))}
                        </html.div>
                      </Stat>
                    </html.div>
                  ))}
                </html.div>
              ))}
            </html.div>
          </html.div>

          <html.div style={styles.sectionBlock}>
            <html.h3 style={styles.blockTitle}>Tokens</html.h3>
            <html.p style={styles.subtle}>
              Keep things straight and stop cutting corners with magic numbers.
            </html.p>
            <Columns gap="md" minWidth="md">
              {tokenSets.map((set) => (
                <Card key={set.title}>
                  <CardHeader>
                    <html.h4 style={styles.cardHeading}>{set.title}</html.h4>
                  </CardHeader>
                  <CardBody>
                    <html.p style={styles.subtle}>{set.detail}</html.p>
                    <html.div style={styles.tagRow}>
                      {set.tags.map((tag) => (
                        <Tag key={tag} variant="neutral">
                          {tag}
                        </Tag>
                      ))}
                    </html.div>
                  </CardBody>
                </Card>
              ))}
            </Columns>
          </html.div>

          <html.div style={styles.sectionBlock}>
            <html.h3 style={styles.blockTitle}>Theming mixins</html.h3>
            <html.p style={styles.subtle}>
              Swap from light to dark without unpacking. Just @mixin and match.
            </html.p>
            <Columns gap="md" minWidth="md">
              {themeSamples.map((sample) => (
                <html.div
                  key={sample.title}
                  style={[
                    styles.themeCard,
                    sample.tone === 'dark'
                      ? styles.themeDark
                      : styles.themeLight,
                  ]}
                >
                  <html.div style={styles.themeHeader}>
                    <Badge>{sample.title}</Badge>
                    <html.pre style={styles.mixin}>
                      <html.code>{sample.mixin}</html.code>
                    </html.pre>
                  </html.div>
                  <html.p style={styles.subtle}>{sample.detail}</html.p>
                  <html.div style={styles.tagRow}>
                    {sample.tokens.map((token) => (
                      <Tag key={token} variant="neutral">
                        {token}
                      </Tag>
                    ))}
                  </html.div>
                </html.div>
              ))}
            </Columns>
          </html.div>
        </html.section>

        <html.section style={styles.section}>
          <html.div style={styles.sectionHeader}>
            <html.h2 style={styles.sectionTitle}>The tool-box</html.h2>
            <html.p>
              Square fundamentals we rely on, with docs one click away.
            </html.p>
          </html.div>
          <Columns gap="md" minWidth="md">
            {toolBox.map((tool) => (
              <Card key={tool.label}>
                <CardHeader>
                  <html.h4 style={styles.cardHeading}>{tool.label}</html.h4>
                </CardHeader>
                <CardBody>
                  <html.p style={styles.subtle}>{tool.description}</html.p>
                  <html.div style={styles.toolLinks}>
                    <Link href={tool.docs} target="_blank" rel="noreferrer">
                      Docs
                    </Link>
                    <Link href={tool.repo} target="_blank" rel="noreferrer">
                      GitHub
                    </Link>
                  </html.div>
                </CardBody>
              </Card>
            ))}
          </Columns>
        </html.section>
      </html.main>
    </AppShell>
  );
}

export default HomeScreen;
