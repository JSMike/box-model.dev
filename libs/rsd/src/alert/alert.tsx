/**
 * Alert component for @box-model/rsd
 *
 * Inline feedback with status icon and optional close control.
 */
import { css, html } from 'react-strict-dom';
import { StatusIcon } from '../status-icon';
import { CloseControl } from '../close-control';
import {
  alertTokens,
  sizeTokens,
  spaceTokens,
  typographyRolesTokens,
} from '../tokens/tokens.stylex';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  /** Alert body content */
  children: React.ReactNode;
  /** Visual intent */
  variant?: AlertVariant;
  /** Optional accessible label for close control */
  closeLabel?: string;
  /** Render a close control and invoke callback when clicked */
  onClose?: () => void;
}

const styles = css.create({
  surface: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: alertTokens.gap,
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderRadius: sizeTokens.radiusNone,
    fontFamily: typographyRolesTokens.bodyFontFamily,
    fontSize: typographyRolesTokens.bodyFontSize,
    lineHeight: typographyRolesTokens.bodyLineHeight,
    letterSpacing: typographyRolesTokens.bodyLetterSpacing,
    boxSizing: 'border-box',
  },
  icon: {
    marginTop: '0.1rem',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: alertTokens.gap,
  },
  close: {
    alignSelf: 'flex-start',
  },
  info: {
    backgroundColor: alertTokens.infoBackground,
    borderColor: alertTokens.infoBorder,
    color: alertTokens.infoText,
  },
  success: {
    backgroundColor: alertTokens.successBackground,
    borderColor: alertTokens.successBorder,
    color: alertTokens.successText,
  },
  warning: {
    backgroundColor: alertTokens.warningBackground,
    borderColor: alertTokens.warningBorder,
    color: alertTokens.warningText,
  },
  danger: {
    backgroundColor: alertTokens.dangerBackground,
    borderColor: alertTokens.dangerBorder,
    color: alertTokens.dangerText,
  },
});

const ICON_MAP: Record<AlertVariant, AlertVariant> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export function Alert({
  children,
  variant = 'info',
  closeLabel = 'Dismiss alert',
  onClose,
}: AlertProps) {
  return (
    <html.div style={[styles.surface, styles[variant]]} role="alert">
      <html.span style={styles.icon}>
        <StatusIcon variant={ICON_MAP[variant]} />
      </html.span>
      <html.div style={styles.content}>{children}</html.div>
      {onClose ? (
        <html.span style={styles.close}>
          <CloseControl label={closeLabel} onClose={onClose} />
        </html.span>
      ) : null}
    </html.div>
  );
}

export default Alert;
