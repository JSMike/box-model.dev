import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './toast.host.scss?inline';
import slotStyles from './toast.slot.scss?inline';

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

export const ToastBox = 'toast-box';

@customElement(ToastBox)
export class Toast extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String, reflect: true }) public variant: ToastVariant = 'default';
  @state() private hasCloseControl = false;

  @query('slot[name="close-control"]') private closeSlot?: HTMLSlotElement;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: ToastBox,
    });
    this.syncInitialSlotPresence();
  }

  private get variantIcon() {
    switch (this.variant) {
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'danger':
        return '𐌢';
      case 'info':
        return 'i';
      case 'default':
      default:
        return 'ℹ';
    }
  }

  override render() {
    return html`
      <span class="toast-box__icon" aria-hidden="true" part="icon">${this.variantIcon}</span>
      <slot></slot>
      <slot
        name="close-control"
        ?hidden=${!this.hasCloseControl}
        @slotchange=${this.handleCloseSlotChange}
        @click=${this.handleCloseClick}
      ></slot>
    `;
  }

  private handleCloseSlotChange(event: Event) {
    this.syncClosePresence(event.target as HTMLSlotElement);
  }

  private handleCloseClick() {
    this.setAttribute('hidden', '');
    this.dispatchCloseEvent();
  }

  private dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private syncClosePresence(slot?: HTMLSlotElement | null) {
    const target = slot ?? this.closeSlot;
    const hasClose = (target?.assignedElements({ flatten: true }).length ?? 0) > 0;
    this.applyClosePresence(hasClose);
  }

  private syncInitialSlotPresence() {
    this.applyClosePresence(this.hasLightDomSlot('close-control'));
  }

  private hasLightDomSlot(name: string): boolean {
    return Array.from(this.children).some((child) => (child as HTMLElement).slot === name);
  }

  private applyClosePresence(present: boolean) {
    if (this.hasCloseControl !== present) {
      this.hasCloseControl = present;
    }
    if (this.hasAttribute('has-close-control') !== present) {
      this.toggleAttribute('has-close-control', present);
    }
  }
}
