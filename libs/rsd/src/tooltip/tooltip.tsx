import { css, html } from 'react-strict-dom';
import { tooltipTokens, typographyTokens } from '../tokens/tokens.stylex';

export interface TooltipProps {
  label: string;
  children: React.ReactNode;
}

const styles = css.create({
  trigger: {
    color: tooltipTokens.text,
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightSnug,
  },
});

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <html.span style={styles.trigger} aria-label={label}>
      {children}
    </html.span>
  );
}

export default Tooltip;
