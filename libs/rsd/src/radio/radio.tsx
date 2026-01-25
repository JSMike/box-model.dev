import { css, html } from 'react-strict-dom';
import {
  colorBorderTokens,
  colorTextTokens,
  sizeTokens,
  spaceTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  legend?: string;
  name?: string;
  options?: ReadonlyArray<RadioOption>;
  value?: string;
  onChange?: (value: string) => void;
}

const styles = css.create({
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
    color: colorTextTokens.primary,
    fontFamily: typographyTokens.fontFamilySans,
  },
  legend: {
    fontSize: typographyTokens.fontSizeMd,
    fontWeight: typographyTokens.fontWeightSemibold,
    marginTop: 0,
    marginBottom: 0,
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceTokens.scale100,
  },
  control: {
    width: '1rem',
    height: '1rem',
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.default,
    borderRadius: '50%',
    backgroundColor: 'transparent',
  },
  label: {
    color: colorTextTokens.primary,
    fontSize: typographyTokens.fontSizeSm,
  },
});

export function RadioGroup({ legend, name = 'radio-group', options, value, onChange }: RadioGroupProps) {
  return (
    <html.fieldset style={styles.group}>
      {legend ? <html.div style={styles.legend}>{legend}</html.div> : null}
      {(options ?? []).map((option) => (
        <html.label key={option.value} style={styles.option}>
          <html.input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            style={styles.control}
          />
          <html.span style={styles.label}>{option.label}</html.span>
        </html.label>
      ))}
    </html.fieldset>
  );
}

export default RadioGroup;
