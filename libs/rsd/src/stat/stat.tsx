/**
 * Stat component for @box-model/rsd
 *
 * Display statistics with value, title, and optional trend indicator.
 * Uses StyleX tokens for cross-platform compatibility.
 */
import { css, html } from 'react-strict-dom';
import {
  statTokens,
  sizeTokens,
  typographyRolesTokens,
  typographyTokens,
  colorBackgroundTokens,
} from '../tokens/tokens.stylex';

export type StatTrend = 'neutral' | 'up' | 'down';

export interface StatProps {
  /** Main statistic value */
  value: string;
  /** Title/label for the stat */
  title?: string;
  /** Delta/change value */
  delta?: string;
  /** Trend direction */
  trend?: StatTrend;
  /** Show trend indicator icon */
  showTrendIndicator?: boolean;
  /** Additional content */
  children?: React.ReactNode;
}

const styles = css.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: statTokens.gap,
    // Use individual padding for React Native compatibility
    paddingTop: statTokens.padding,
    paddingBottom: statTokens.padding,
    paddingLeft: statTokens.padding,
    paddingRight: statTokens.padding,
    backgroundColor: colorBackgroundTokens.surface,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: statTokens.border,
    borderRadius: 0,
  },
  label: {
    fontFamily: typographyRolesTokens.captionFontFamily,
    fontSize: typographyRolesTokens.captionFontSize,
    fontWeight: typographyRolesTokens.captionFontWeight,
    lineHeight: typographyRolesTokens.captionLineHeight,
    color: statTokens.title,
  },
  value: {
    fontFamily: typographyRolesTokens.headingH2FontFamily,
    fontSize: typographyTokens.fontSize2xl,
    fontWeight: typographyTokens.fontWeightBold,
    lineHeight: typographyTokens.lineHeightTight,
    color: statTokens.value,
  },
  delta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontFamily: typographyRolesTokens.captionFontFamily,
    fontSize: typographyRolesTokens.captionFontSize,
    fontWeight: typographyRolesTokens.captionFontWeight,
    lineHeight: typographyRolesTokens.captionLineHeight,
  },
  deltaUp: {
    color: statTokens.deltaPositive,
  },
  deltaDown: {
    color: statTokens.deltaNegative,
  },
  deltaNeutral: {
    color: statTokens.title,
  },
  trendIcon: {
    fontWeight: typographyTokens.fontWeightBold,
  },
});

const TREND_ICONS: Record<StatTrend, string> = {
  up: '↑',
  down: '↓',
  neutral: '⇌',
};

const TREND_LABELS: Record<StatTrend, string> = {
  up: 'Trending up',
  down: 'Trending down',
  neutral: 'No change',
};

/**
 * Stat component for displaying statistics
 *
 * @example
 * ```tsx
 * <Stat value="42" title="Components" delta="+5" trend="up" showTrendIndicator />
 * ```
 */
export function Stat({
  value,
  title,
  delta,
  trend = 'neutral',
  showTrendIndicator = false,
  children,
}: StatProps) {
  const deltaStyle = {
    up: styles.deltaUp,
    down: styles.deltaDown,
    neutral: styles.deltaNeutral,
  }[trend];

  return (
    <html.div style={styles.container}>
      {title && <html.div style={styles.label}>{title}</html.div>}
      <html.div style={styles.value}>{value}</html.div>
      {delta && (
        <html.div style={[styles.delta, deltaStyle]}>
          {showTrendIndicator && (
            <html.span
              style={styles.trendIcon}
              role="img"
              aria-label={TREND_LABELS[trend]}
            >
              {TREND_ICONS[trend]}
            </html.span>
          )}
          <html.span>{delta}</html.span>
        </html.div>
      )}
      {children}
    </html.div>
  );
}
