/**
 * Checkbox component for @box-model/rsd
 *
 * Minimal checkbox using React Strict DOM.
 */
import { css, html } from 'react-strict-dom';
import {
  colorTextTokens,
  colorBorderTokens,
  colorBackgroundTokens,
  sizeTokens,
  typographyTokens,
  spaceTokens,
} from '../tokens/tokens.stylex';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const styles = css.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceTokens.scale100,
  },
  box: {
    width: '1rem',
    height: '1rem',
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.default,
    borderRadius: 0,
    backgroundColor: colorBackgroundTokens.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  boxChecked: {
    backgroundColor: colorBorderTokens.default,
  },
  check: {
    color: colorTextTokens.primary,
    fontSize: '0.75rem',
    lineHeight: 1,
  },
  label: {
    color: colorTextTokens.primary,
    fontSize: typographyTokens.fontSizeSm,
  },
});

export function Checkbox({ label, checked = false, disabled, onChange }: CheckboxProps) {
  return (
    <html.label style={styles.root}>
      <html.button
        type="button"
        aria-pressed={checked}
        aria-label={label}
        disabled={disabled}
        style={[styles.box, checked && styles.boxChecked]}
        onClick={() => onChange?.(!checked)}
      >
        {checked ? <html.span style={styles.check}>✓</html.span> : null}
      </html.button>
      {label ? <html.span style={styles.label}>{label}</html.span> : null}
    </html.label>
  );
}

export default Checkbox;
