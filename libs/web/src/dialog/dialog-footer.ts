import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import styles from './dialog-footer.host.scss?inline';
import slotStyles from './dialog-footer.slot.scss?inline';

export const DialogFooterBox = 'dialog-footer-box';

/**
 * Footer layout helper for dialogs.
 * @slot - Default slot content.
 */
@customElement(DialogFooterBox)
export class DialogFooter extends LitElement {
  static override styles = unsafeCSS(styles);

  override connectedCallback(): void {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: DialogFooterBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
