import { css, html } from 'react-strict-dom';
import { spaceTokens, typographyTokens, colorTextTokens } from '../tokens/tokens.stylex';
import { Toolbar } from '../toolbar';
import { Textarea } from '../textarea';

export interface WysiwygProps {
  value?: string;
  placeholder?: string;
  helperText?: string;
  onChange?: (value: string) => void;
}

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
  },
  helper: {
    color: colorTextTokens.secondary,
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightSnug,
  },
});

export function Wysiwyg({ value, placeholder, helperText, onChange }: WysiwygProps) {
  return (
    <html.div style={styles.root}>
      <Toolbar>
        <html.span>Toolbar</html.span>
      </Toolbar>
      <Textarea value={value} placeholder={placeholder} onChange={onChange} fullwidth />
      {helperText ? <html.span style={styles.helper}>{helperText}</html.span> : null}
    </html.div>
  );
}

export default Wysiwyg;
