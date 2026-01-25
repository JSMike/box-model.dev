/**
 * Banner component for @box-model/rsd
 *
 * Inline notification with optional details, actions, and close control.
 */
import { css, html } from 'react-strict-dom';
import { StatusIcon } from '../status-icon';
import { CloseControl } from '../close-control';
import {
  bannerTokens,
  sizeTokens,
  spaceTokens,
  typographyRolesTokens,
} from '../tokens/tokens.stylex';

export type BannerVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

export interface BannerProps {
  /** Main content */
  children: React.ReactNode;
  /** Optional details block */
  details?: React.ReactNode;
  /** Optional actions block */
  actions?: React.ReactNode;
  /** Visual intent */
  variant?: BannerVariant;
  /** Show close control and handle dismissal */
  onClose?: () => void;
  /** Accessible label for close control */
  closeLabel?: string;
}

const styles = css.create({
  surface: {
    display: 'flex',
    flexDirection: 'column',
    gap: bannerTokens.gap,
    paddingTop: spaceTokens.insetLg,
    paddingBottom: spaceTokens.insetLg,
    paddingLeft: spaceTokens.insetXl,
    paddingRight: spaceTokens.insetXl,
    borderWidth: bannerTokens.borderWidth,
    borderStyle: 'solid',
    borderRadius: sizeTokens.radiusNone,
    fontFamily: typographyRolesTokens.bodyFontFamily,
    fontSize: typographyRolesTokens.bodyFontSize,
    lineHeight: typographyRolesTokens.bodyLineHeight,
    letterSpacing: typographyRolesTokens.bodyLetterSpacing,
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    gap: bannerTokens.gap,
    alignItems: 'flex-start',
  },
  icon: {
    marginTop: '0.1rem',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: bannerTokens.gap,
  },
  details: {
    marginTop: bannerTokens.gap,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: bannerTokens.gap,
    marginTop: bannerTokens.gap,
  },
  close: {
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: bannerTokens.defaultBackground,
    borderColor: bannerTokens.defaultBorder,
    color: bannerTokens.defaultText,
  },
  info: {
    backgroundColor: bannerTokens.infoBackground,
    borderColor: bannerTokens.infoBorder,
    color: bannerTokens.infoText,
  },
  success: {
    backgroundColor: bannerTokens.successBackground,
    borderColor: bannerTokens.successBorder,
    color: bannerTokens.successText,
  },
  warning: {
    backgroundColor: bannerTokens.warningBackground,
    borderColor: bannerTokens.warningBorder,
    color: bannerTokens.warningText,
  },
  danger: {
    backgroundColor: bannerTokens.dangerBackground,
    borderColor: bannerTokens.dangerBorder,
    color: bannerTokens.dangerText,
  },
});

const ICON_MAP: Record<BannerVariant, 'info' | 'success' | 'warning' | 'danger'> = {
  default: 'info',
  info: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export function Banner({
  children,
  details,
  actions,
  variant = 'default',
  onClose,
  closeLabel = 'Dismiss banner',
}: BannerProps) {
  return (
    <html.div style={[styles.surface, styles[variant]]} role="status">
      <html.div style={styles.header}>
        <html.span style={styles.icon}>
          <StatusIcon variant={ICON_MAP[variant]} />
        </html.span>
        <html.div style={styles.body}>{children}</html.div>
        {onClose ? (
          <html.span style={styles.close}>
            <CloseControl label={closeLabel} onClose={onClose} />
          </html.span>
        ) : null}
      </html.div>

      {details ? <html.div style={styles.details}>{details}</html.div> : null}
      {actions ? <html.div style={styles.actions}>{actions}</html.div> : null}
    </html.div>
  );
}

export default Banner;
