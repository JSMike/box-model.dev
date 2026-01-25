/**
 * Divider component for @box-model/rsd
 *
 * Visual separator for content sections.
 * Uses StyleX tokens for cross-platform compatibility.
 */
import { css, html } from 'react-strict-dom';
import { dividerTokens } from '../tokens/tokens.stylex';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    width: '100%',
    marginTop: dividerTokens.spacing,
    marginBottom: dividerTokens.spacing,
  },
  vertical: {
    height: '100%',
    marginLeft: dividerTokens.spacing,
    marginRight: dividerTokens.spacing,
  },
  lineHorizontal: {
    width: '100%',
    height: dividerTokens.thickness,
    backgroundColor: dividerTokens.color,
  },
  lineVertical: {
    width: dividerTokens.thickness,
    height: '100%',
    minHeight: '1rem',
    backgroundColor: dividerTokens.color,
  },
});

/**
 * Divider component for visual separation
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * ```
 */
export function Divider({
  orientation = 'horizontal',
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <html.div
      style={[
        styles.base,
        isHorizontal ? styles.horizontal : styles.vertical,
      ]}
      role="separator"
      aria-orientation={orientation}
    >
      <html.div
        style={isHorizontal ? styles.lineHorizontal : styles.lineVertical}
      />
    </html.div>
  );
}
