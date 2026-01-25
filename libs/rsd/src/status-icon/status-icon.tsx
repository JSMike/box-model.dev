/**
 * StatusIcon component for @box-model/rsd
 *
 * Status indicator icons for feedback states.
 * Uses StyleX tokens for cross-platform compatibility.
 */
import { css, html } from 'react-strict-dom';
import {
  colorFeedbackTokens,
  sizeTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export type StatusIconVariant = 'info' | 'success' | 'warning' | 'danger' | 'custom';

export interface StatusIconProps {
  /** Visual variant */
  variant?: StatusIconVariant;
  /** Accessible label */
  label?: string;
  /** Custom icon content (only used with variant="custom") */
  children?: React.ReactNode;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.25rem',
    height: '1.25rem',
    boxSizing: 'border-box',
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderRadius: 0,
    fontWeight: typographyTokens.fontWeightBold,
    fontSize: '0.875rem',
    lineHeight: 1,
  },
  info: {
    color: colorFeedbackTokens.infoIcon,
    backgroundColor: colorFeedbackTokens.infoSurface,
    borderColor: colorFeedbackTokens.infoBorder,
  },
  success: {
    color: colorFeedbackTokens.successIcon,
    backgroundColor: colorFeedbackTokens.successSurface,
    borderColor: colorFeedbackTokens.successBorder,
  },
  warning: {
    color: colorFeedbackTokens.warningIcon,
    backgroundColor: colorFeedbackTokens.warningSurface,
    borderColor: colorFeedbackTokens.warningBorder,
  },
  danger: {
    color: colorFeedbackTokens.dangerIcon,
    backgroundColor: colorFeedbackTokens.dangerSurface,
    borderColor: colorFeedbackTokens.dangerBorder,
  },
  custom: {
    color: colorFeedbackTokens.infoIcon,
    backgroundColor: colorFeedbackTokens.infoSurface,
    borderColor: colorFeedbackTokens.infoBorder,
  },
});

const DEFAULT_ICONS: Record<Exclude<StatusIconVariant, 'custom'>, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '✕',
};

/**
 * StatusIcon component for status indicators
 *
 * @example
 * ```tsx
 * <StatusIcon variant="success" label="Success" />
 * <StatusIcon variant="danger" />
 * ```
 */
export function StatusIcon({
  variant = 'info',
  label,
  children,
}: StatusIconProps) {
  if (variant === 'custom') {
    return (
      <html.span style={[styles.base, styles.custom]}>
        {children}
      </html.span>
    );
  }

  return (
    <html.span
      style={[styles.base, styles[variant]]}
      role="img"
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {DEFAULT_ICONS[variant]}
    </html.span>
  );
}
