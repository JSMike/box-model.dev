import type { ChangeEvent } from 'react';
import { css, html } from 'react-strict-dom';
import { inputTokens, motionTokens, typographyTokens } from '../tokens/tokens.stylex';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: ReadonlyArray<SelectOption>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  fullwidth?: boolean;
  onChange?: (value: string) => void;
}

const styles = css.create({
  wrapper: {
    display: 'flex',
    width: 'auto',
  },
  fullwidth: {
    width: '100%',
  },
  control: {
    width: '100%',
    minHeight: inputTokens.minHeight,
    paddingTop: inputTokens.paddingBlock,
    paddingBottom: inputTokens.paddingBlock,
    paddingLeft: inputTokens.paddingInline,
    paddingRight: inputTokens.paddingInline,
    backgroundColor: inputTokens.backgroundRest,
    color: inputTokens.textValue,
    borderWidth: inputTokens.borderWidth,
    borderStyle: 'solid',
    borderColor: inputTokens.borderColorRest,
    borderRadius: 0,
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeMd,
    lineHeight: typographyTokens.lineHeightSnug,
    transitionProperty: 'border-color, box-shadow, background-color',
    transitionDuration: motionTokens.interactionFocusDuration,
    transitionTimingFunction: motionTokens.interactionFocusEasing,
    ':hover': {
      borderColor: inputTokens.borderColorHover,
    },
    ':focus': {
      borderColor: inputTokens.borderColorFocus,
      boxShadow: inputTokens.focusShadow,
      outlineStyle: 'none',
    },
  },
  disabled: {
    backgroundColor: inputTokens.disabledBackground,
    color: inputTokens.disabledText,
    borderColor: inputTokens.disabledBorderColor,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
});

export function Select({
  options,
  value,
  placeholder,
  disabled,
  fullwidth,
  onChange,
}: SelectProps) {
  return (
    <html.div style={[styles.wrapper, fullwidth && styles.fullwidth]}>
      <html.select
        value={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        style={[styles.control, disabled && styles.disabled]}
        onChange={
          disabled
            ? undefined
            : (event: ChangeEvent<HTMLSelectElement>) => onChange?.(event.target.value)
        }
      >
        {placeholder ? <html.option value="">{placeholder}</html.option> : null}
        {options.map((option) => (
          <html.option key={option.value} value={option.value}>
            {option.label}
          </html.option>
        ))}
      </html.select>
    </html.div>
  );
}

export default Select;
