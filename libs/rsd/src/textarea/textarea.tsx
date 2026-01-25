import type { ChangeEvent } from 'react';
import { css, html } from 'react-strict-dom';
import { inputTokens, motionTokens, typographyTokens } from '../tokens/tokens.stylex';

export interface TextareaProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
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
    minHeight: '6rem',
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
    lineHeight: typographyTokens.lineHeightRelaxed,
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
    ':disabled': {
      backgroundColor: inputTokens.disabledBackground,
      color: inputTokens.disabledText,
      borderColor: inputTokens.disabledBorderColor,
      cursor: 'not-allowed',
    },
    ':read-only': {
      backgroundColor: inputTokens.backgroundReadOnly,
    },
  },
});

export function Textarea({
  value,
  placeholder,
  disabled,
  readOnly,
  fullwidth,
  onChange,
}: TextareaProps) {
  return (
    <html.div style={[styles.wrapper, fullwidth && styles.fullwidth]}>
      <html.textarea
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        style={styles.control}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event.target.value)}
      />
    </html.div>
  );
}

export default Textarea;
