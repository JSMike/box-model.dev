/**
 * Loading indicator for @box-model/rsd
 *
 * Simple animated dots placeholder (no animation on RN).
 */
import { css, html } from 'react-strict-dom';
import { colorTextTokens, spaceTokens } from '../tokens/tokens.stylex';

export interface LoadingProps {
  label?: string;
}

const styles = css.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceTokens.scale100,
    color: colorTextTokens.primary,
  },
  dot: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: 0,
    backgroundColor: colorTextTokens.primary,
  },
});

export function Loading({ label = 'Loading' }: LoadingProps) {
  return (
    <html.div style={styles.root} role="status" aria-live="polite">
      <html.span style={styles.dot} />
      <html.span style={styles.dot} />
      <html.span style={styles.dot} />
      <html.span>{label}</html.span>
    </html.div>
  );
}

export default Loading;
