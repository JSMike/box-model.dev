import { css, html } from 'react-strict-dom';
import { Button } from '../button';
import { CloseControl } from '../close-control';
import {
  dialogTokens,
  shadowTokens,
  spaceTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export interface DialogProps {
  open: boolean;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  noBackdropClose?: boolean;
  showCloseControl?: boolean;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const styles = css.create({
  overlay: {
    position: 'fixed',
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    backgroundColor: dialogTokens.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetMd,
    paddingRight: spaceTokens.insetMd,
    zIndex: 1000,
  },
  panel: {
    backgroundColor: dialogTokens.background,
    boxShadow: dialogTokens.shadow ?? shadowTokens.elevationLg,
    borderWidth: dialogTokens.borderWidth,
    borderStyle: 'solid',
    borderColor: dialogTokens.border,
    borderRadius: 0,
    width: dialogTokens.width,
    maxWidth: dialogTokens.maxWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: dialogTokens.gap,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: dialogTokens.gap,
    paddingTop: spaceTokens.insetLg,
    paddingBottom: spaceTokens.scale150,
    paddingLeft: spaceTokens.scale250,
    paddingRight: spaceTokens.scale250,
    color: dialogTokens.headerText,
  },
  title: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSizeLg,
    fontWeight: typographyTokens.fontWeightSemibold,
  },
  body: {
    paddingTop: spaceTokens.scale150,
    paddingBottom: spaceTokens.scale150,
    paddingLeft: spaceTokens.scale250,
    paddingRight: spaceTokens.scale250,
    color: dialogTokens.bodyText,
  },
  footer: {
    paddingTop: spaceTokens.scale150,
    paddingBottom: spaceTokens.scale200,
    paddingLeft: spaceTokens.scale250,
    paddingRight: spaceTokens.scale250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: dialogTokens.footerGap,
  },
  spacer: {
    flexGrow: 1,
  },
});

export function Dialog({
  open,
  title,
  body,
  footer,
  noBackdropClose,
  showCloseControl = true,
  primaryActionLabel,
  onPrimaryAction,
  onClose,
  children,
}: DialogProps) {
  if (!open) {
    return null;
  }

  const handleBackdropClick = () => {
    if (!noBackdropClose) {
      onClose?.();
    }
  };

  return (
    <html.div style={styles.overlay} role="none" onClick={handleBackdropClick}>
      <html.div
        role="dialog"
        aria-modal={true}
        aria-label={title}
        style={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || showCloseControl) && (
          <html.div style={styles.header}>
            {title ? <html.h2 style={styles.title}>{title}</html.h2> : <html.span style={styles.spacer} />}
            {showCloseControl ? <CloseControl label="Close dialog" onClose={onClose} /> : null}
          </html.div>
        )}

        <html.div style={styles.body}>{body ?? children}</html.div>

        {(footer || primaryActionLabel) && (
          <html.div style={styles.footer}>
            {footer}
            {primaryActionLabel ? (
              <Button variant="primary" onClick={onPrimaryAction}>
                {primaryActionLabel}
              </Button>
            ) : null}
          </html.div>
        )}
      </html.div>
    </html.div>
  );
}

export default Dialog;
