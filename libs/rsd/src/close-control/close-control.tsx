/**
 * CloseControl component for @box-model/rsd
 *
 * Lightweight dismiss button for overlays and banners.
 */
import { css, html } from 'react-strict-dom';
import { closeControlTokens, motionTokens } from '../tokens/tokens.stylex';

export interface CloseControlProps {
  /** Accessible label for the control */
  label?: string;
  /** Click handler invoked when the control is activated */
  onClose?: () => void;
}

const styles = css.create({
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: closeControlTokens.size,
    height: closeControlTokens.size,
    borderWidth: closeControlTokens.borderWidth,
    borderStyle: 'solid',
    borderColor: closeControlTokens.borderColor,
    borderRadius: 0,
    backgroundColor: closeControlTokens.backgroundRest,
    color: closeControlTokens.icon,
    padding: 0,
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color',
    transitionDuration: motionTokens.interactionPressDuration,
    transitionTimingFunction: motionTokens.interactionPressEasing,
    ':hover': {
      backgroundColor: closeControlTokens.backgroundHover,
    },
    ':active': {
      backgroundColor: closeControlTokens.backgroundActive,
    },
  },
  icon: {
    fontSize: '1rem',
    lineHeight: 1,
    fontWeight: '700',
  },
});

export function CloseControl({ label = 'Close', onClose }: CloseControlProps) {
  return (
    <html.button
      type="button"
      aria-label={label}
      onClick={onClose}
      style={styles.button}
    >
      <html.span style={styles.icon} aria-hidden={true}>
        x
      </html.span>
    </html.button>
  );
}

export default CloseControl;
