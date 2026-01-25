import { css, html } from 'react-strict-dom';
import { Button } from '../button';
import { CloseControl } from '../close-control';
import {
  drawerTokens,
  shadowTokens,
  spaceTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

export interface DrawerProps {
  open: boolean;
  placement?: DrawerPlacement;
  title?: string;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  noBackdropClose?: boolean;
  showCloseControl?: boolean;
  onClose?: () => void;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  children?: React.ReactNode;
}

const styles = css.create({
  overlay: {
    position: 'fixed',
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    insetInlineEnd: 0,
    backgroundColor: drawerTokens.overlayColor,
    display: 'flex',
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetMd,
    paddingRight: spaceTokens.insetMd,
    zIndex: 1000,
  },
  panel: {
    backgroundColor: drawerTokens.background,
    boxShadow: drawerTokens.shadow ?? shadowTokens.elevationMd,
    borderWidth: drawerTokens.borderWidth,
    borderStyle: 'solid',
    borderColor: drawerTokens.border,
    borderRadius: 0,
    width: drawerTokens.width,
    maxWidth: drawerTokens.maxWidth,
    display: 'flex',
    flexDirection: 'column',
    gap: drawerTokens.bodyGap,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: drawerTokens.bodyGap,
    paddingTop: spaceTokens.insetLg,
    paddingBottom: spaceTokens.insetLg,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    color: drawerTokens.headerText,
  },
  title: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSizeLg,
    fontWeight: typographyTokens.fontWeightSemibold,
  },
  body: {
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    color: drawerTokens.headerText,
    display: 'flex',
    flexDirection: 'column',
    gap: drawerTokens.bodyGap,
  },
  footer: {
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetLg,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: drawerTokens.footerGap,
  },
});

const placementStyles: Record<DrawerPlacement, ReturnType<typeof css.create>['overlay']> = {
  right: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  left: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
};

export function Drawer({
  open,
  placement = 'right',
  title,
  body,
  actions,
  noBackdropClose,
  showCloseControl = true,
  onClose,
  primaryActionLabel,
  onPrimaryAction,
  children,
}: DrawerProps) {
  if (!open) {
    return null;
  }

  const handleBackdropClick = () => {
    if (!noBackdropClose) {
      onClose?.();
    }
  };

  return (
    <html.div
      style={[styles.overlay, placementStyles[placement]]}
      role="none"
      onClick={handleBackdropClick}
    >
      <html.div
        role="dialog"
        aria-modal={true}
        aria-label={title}
        style={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || showCloseControl) && (
          <html.div style={styles.header}>
            {title ? <html.h2 style={styles.title}>{title}</html.h2> : null}
            {showCloseControl ? <CloseControl label="Close drawer" onClose={onClose} /> : null}
          </html.div>
        )}

        <html.div style={styles.body}>{body ?? children}</html.div>

        {(actions || primaryActionLabel) && (
          <html.div style={styles.footer}>
            {actions}
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

export default Drawer;
