import { css, html } from 'react-strict-dom';
import { CloseControl } from '../close-control';
import { spaceTokens, toastTokens, typographyTokens } from '../tokens/tokens.stylex';

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastProps {
  message: React.ReactNode;
  variant?: ToastVariant;
  showClose?: boolean;
  onClose?: () => void;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: toastTokens.gap,
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    borderWidth: toastTokens.borderWidth,
    borderStyle: 'solid',
    borderRadius: 0,
    boxShadow: toastTokens.shadow,
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeSm,
    lineHeight: typographyTokens.lineHeightSnug,
  },
  variantDefault: {
    backgroundColor: toastTokens.defaultBackground,
    borderColor: toastTokens.defaultBorder,
    color: toastTokens.defaultText,
  },
  variantSuccess: {
    backgroundColor: toastTokens.successBackground,
    borderColor: toastTokens.successBorder,
    color: toastTokens.successText,
  },
  variantWarning: {
    backgroundColor: toastTokens.warningBackground,
    borderColor: toastTokens.warningBorder,
    color: toastTokens.warningText,
  },
  variantDanger: {
    backgroundColor: toastTokens.dangerBackground,
    borderColor: toastTokens.dangerBorder,
    color: toastTokens.dangerText,
  },
  variantInfo: {
    backgroundColor: toastTokens.infoBackground,
    borderColor: toastTokens.infoBorder,
    color: toastTokens.infoText,
  },
});

const variantStyles: Record<ToastVariant, typeof styles.variantDefault> = {
  default: styles.variantDefault,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
  info: styles.variantInfo,
};

export function Toast({ message, variant = 'default', showClose = false, onClose }: ToastProps) {
  return (
    <html.div style={[styles.base, variantStyles[variant]]} role="status">
      <html.span>{message}</html.span>
      {showClose ? <CloseControl label="Dismiss toast" onClose={onClose} /> : null}
    </html.div>
  );
}

export default Toast;
