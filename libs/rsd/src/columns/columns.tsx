/**
 * Columns component for @box-model/rsd
 *
 * Responsive column wrapper using CSS grid for web; flex-wrap fallback works in RN via wrap simulation.
 */
import React from 'react';
import { css, html } from 'react-strict-dom';
import { spaceTokens } from '../tokens/tokens.stylex';

export type ColumnsGap = 'sm' | 'md' | 'lg';
export type ColumnsMinWidth = 'sm' | 'md' | 'lg';

export interface ColumnsProps {
  children: React.ReactNode;
  gap?: ColumnsGap;
  minWidth?: ColumnsMinWidth;
}

const GAP_MAP = {
  sm: spaceTokens.scale150,
  md: spaceTokens.scale200,
  lg: spaceTokens.scale300,
} as const;

const MIN_WIDTH_MAP: Record<ColumnsMinWidth, string> = {
  sm: '12rem',
  md: '15rem',
  lg: '18rem',
};

const styles = css.create({
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gapSm: {
    gap: GAP_MAP.sm,
  },
  gapMd: {
    gap: GAP_MAP.md,
  },
  gapLg: {
    gap: GAP_MAP.lg,
  },
  column: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
  },
  minWidthSm: {
    minWidth: MIN_WIDTH_MAP.sm,
  },
  minWidthMd: {
    minWidth: MIN_WIDTH_MAP.md,
  },
  minWidthLg: {
    minWidth: MIN_WIDTH_MAP.lg,
  },
});

const gapStyles: Record<ColumnsGap, typeof styles.gapSm> = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
};

const minWidthStyles: Record<ColumnsMinWidth, typeof styles.minWidthSm> = {
  sm: styles.minWidthSm,
  md: styles.minWidthMd,
  lg: styles.minWidthLg,
};

export function Columns({
  children,
  gap = 'md',
  minWidth = 'md',
}: ColumnsProps) {
  return (
    <html.div style={[styles.grid, gapStyles[gap]]}>
      {React.Children.map(children, (child, index) => (
        <html.div key={index} style={[styles.column, minWidthStyles[minWidth]]}>
          {child}
        </html.div>
      ))}
    </html.div>
  );
}

export default Columns;
