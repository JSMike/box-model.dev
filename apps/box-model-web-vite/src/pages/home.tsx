import { AlertBox } from '@box-model/web/alert';
import { BadgeBox } from '@box-model/web/badge';
import { ButtonBox } from '@box-model/web/button';
import { CardBox } from '@box-model/web/card';
import { ColumnsBox } from '@box-model/web/columns';
import { TagBox } from '@box-model/web/tag';
import { TerminalBox, TerminalLineBox } from '@box-model/web/terminal';
import { STORYBOOK_URL } from '../app/config';
import styles from './home.module.scss';

const alertExample = `<alert-box variant="success">
  Ready to ship.
</alert-box>`;

const componentAreas = ['feedback', 'forms', 'content', 'data'];

const layoutComponents = [
  'columns-box',
  'card-box',
  'toolbar-box',
  'divider-box',
];

const colorTokens = [
  {
    customProperty: '--box-model-brand-primary-emphasis',
    value: '#88b2bd',
    className: styles.swatchContent,
  },
  {
    customProperty: '--box-model-feedback-warning-surface',
    value: '#b08354',
    className: styles.swatchMargin,
  },
  {
    customProperty: '--box-model-feedback-success-surface',
    value: '#b8c480',
    className: styles.swatchPadding,
  },
  {
    customProperty: '--box-model-border-background',
    value: '#e4c482',
    className: styles.swatchBorder,
  },
  {
    customProperty: '--box-model-background-surface',
    value: '#4a4a4a',
    className: styles.swatchSurface,
  },
];

const principles = [
  'The box model lays the foundation.',
  'Slots keep composition inside the box.',
  'Tokens square away repeated decisions.',
  'Constraints keep teams from getting boxed in.',
  'Accessibility is never boxed out.',
];

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`${styles.page} ${styles.canvas}`}
    >
      <section className={styles.hero}>
        <div
          className={`${styles.heroCopy} box-model-surface box-model-surface--prominent`}
        >
          <hgroup>
            <h1>Box Model UI</h1>
            <p>A CSS-first web-component design system</p>
          </hgroup>

          <p className={styles.lede}>
            Built on the box model. Predictable layers. Composed for clarity.
            Made for developers who want the markup they see to be the markup
            they ship.
          </p>
          <div className={styles.heroActions}>
            <ButtonBox>
              <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
                Open Storybook
              </a>
            </ButtonBox>
            <ButtonBox variant="secondary">
              <a href="/about">Why boxes?</a>
            </ButtonBox>
            <ButtonBox variant="tertiary">
              <a href="https://github.com/JSMike/box-model.dev">GitHub</a>
            </ButtonBox>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <TerminalBox>
            <TerminalLineBox variant="prompt">
              npm install @box-model/web
            </TerminalLineBox>
            <TerminalLineBox variant="info">
              Unpacking Box Model UI...
            </TerminalLineBox>
            <TerminalLineBox variant="success">
              34 custom elements ready
            </TerminalLineBox>
            <TerminalLineBox variant="success">
              Tokens and themes loaded
            </TerminalLineBox>
            <TerminalLineBox variant="success">0 corners cut</TerminalLineBox>
            <TerminalLineBox variant="prompt" cursor aria-hidden="true" />
          </TerminalBox>
        </div>
      </section>

      <section
        className={styles.featureSection}
        aria-labelledby="whats-in-the-box-title"
      >
        <div className={styles.sectionHeader}>
          <div>
            <h2 id="whats-in-the-box-title">What's in the box?</h2>
          </div>
          <p>
            Components, layout, tokens, and principles that keep interfaces
            square, clear, and ready to compose.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <CardBox className={styles.featureCard}>
            <div slot="header" className={styles.cardHeader}>
              <TagBox variant="info">
                <span>components</span>
              </TagBox>
              <h3>Boxes with a job to do.</h3>
            </div>
            <p className={styles.cardCopy}>
              Compose feedback, controls, content, and data without hiding the
              HTML that ships.
            </p>
            <div className={styles.componentSpecimen}>
              <AlertBox variant="success">
                <strong>Ready to ship.</strong>
              </AlertBox>
              <pre
                className={styles.componentCode}
                aria-label="Alert component markup"
              >
                <code>{alertExample}</code>
              </pre>
              <div className={styles.componentRow}>
                <ButtonBox size="small">
                  <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
                    Explore
                  </a>
                </ButtonBox>
                <TagBox variant="info">
                  <span>typed</span>
                </TagBox>
                <BadgeBox>
                  <span>34 elements</span>
                </BadgeBox>
              </div>
            </div>
            <div slot="footer" className={styles.tagRow}>
              {componentAreas.map((area) => (
                <TagBox key={area} variant="neutral">
                  <span>{area}</span>
                </TagBox>
              ))}
            </div>
          </CardBox>

          <CardBox className={styles.featureCard}>
            <div slot="header" className={styles.cardHeader}>
              <TagBox variant="neutral">
                <span>layout</span>
              </TagBox>
              <h3>Structure that stacks up.</h3>
            </div>
            <p className={styles.cardCopy}>
              Arrange real content with responsive columns, shared gaps, and
              surfaces that make hierarchy visible.
            </p>
            <div
              className={styles.layoutSpecimen}
              role="img"
              aria-label="Page layout with header, navigation, content, and footer regions"
            >
              <div className={styles.layoutBand} aria-hidden="true">
                header
              </div>
              <ColumnsBox
                className={styles.layoutColumns}
                gap="sm"
                min-width="5rem"
              >
                <div className={styles.layoutPanel} aria-hidden="true">
                  nav
                </div>
                <div
                  className={`${styles.layoutPanel} ${styles.layoutContent}`}
                  aria-hidden="true"
                >
                  content
                </div>
              </ColumnsBox>
              <div className={styles.layoutBand} aria-hidden="true">
                footer
              </div>
            </div>
            <div slot="footer" className={styles.tagRow}>
              {layoutComponents.map((component) => (
                <TagBox key={component} variant="neutral">
                  <span>{component}</span>
                </TagBox>
              ))}
            </div>
          </CardBox>

          <CardBox className={styles.featureCard}>
            <div slot="header" className={styles.cardHeader}>
              <TagBox variant="success">
                <span>tokens</span>
              </TagBox>
              <h3>System values you can see.</h3>
            </div>
            <p className={styles.cardCopy}>
              Carry the box model's own color language through semantic,
              platform-ready design decisions.
            </p>
            <ul className={styles.colorList} aria-label="Semantic color tokens">
              {colorTokens.map((token) => (
                <li key={token.customProperty}>
                  <span
                    className={`${styles.colorSwatch} ${token.className}`}
                    aria-hidden="true"
                  ></span>
                  <code>{token.customProperty}</code>
                  <span>{token.value}</span>
                </li>
              ))}
            </ul>
            <div slot="footer" className={styles.tagRow}>
              <TagBox variant="neutral">
                <span>color</span>
              </TagBox>
              <TagBox variant="neutral">
                <span>spacing</span>
              </TagBox>
              <TagBox variant="neutral">
                <span>type</span>
              </TagBox>
              <TagBox variant="neutral">
                <span>shadow</span>
              </TagBox>
            </div>
          </CardBox>

          <CardBox className={styles.featureCard}>
            <div slot="header" className={styles.cardHeader}>
              <TagBox variant="info">
                <span>principles</span>
              </TagBox>
              <h3>A square frame of mind.</h3>
            </div>
            <p className={styles.cardCopy}>
              Think inside the box: slot content where it belongs, square away
              repeated decisions, and keep the system open to everyone.
            </p>
            <ol className={styles.principleList}>
              {principles.map((principle, index) => (
                <li key={principle}>
                  <BadgeBox>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </BadgeBox>
                  <span>{principle}</span>
                </li>
              ))}
            </ol>
          </CardBox>
        </div>
      </section>

      <section
        className={`${styles.closing} box-model-surface box-model-surface--prominent`}
        aria-labelledby="ready-title"
      >
        <div className={styles.closingCopy}>
          <BadgeBox>
            <span>no corners cut</span>
          </BadgeBox>
          <h2 id="ready-title">Ready to think inside the box?</h2>
          <p>
            Install one package, copy real markup from Storybook, and unpack
            only the components you need.
          </p>
        </div>
        <div className={styles.closingActions}>
          <ButtonBox>
            <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
              Explore the components
            </a>
          </ButtonBox>
          <ButtonBox variant="secondary">
            <a href="/blogs">Read the developer blog</a>
          </ButtonBox>
        </div>
      </section>
    </main>
  );
}
