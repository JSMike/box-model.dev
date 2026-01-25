import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import '../status-icon';
import hostStyles from './alert.host.scss?inline';
import slotStyles from './alert.slot.scss?inline';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export const AlertBox = 'alert-box';

@customElement(AlertBox)
export class Alert extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String, reflect: true }) public variant: AlertVariant = 'info';
  @state() private hasCloseControl = false;

  @query('slot[name="close-control"]') private closeControlSlot?: HTMLSlotElement;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: AlertBox,
    });
  }

  protected override firstUpdated(): void {
    this.syncCloseControlPresence(this.closeControlSlot);
  }

  override render() {
    return html`
      <status-icon-box variant="${this.variant}"></status-icon-box>
      <slot></slot>
      <slot
        name="close-control"
        ?hidden=${!this.hasCloseControl}
        @slotchange=${this.handleCloseControlChange}
        @click=${this.handleCloseControlClick}
      ></slot>
    `;
  }

  private syncCloseControlPresence(slot?: HTMLSlotElement | null) {
    const targetSlot = slot ?? this.closeControlSlot;
    const assignedCount = targetSlot?.assignedElements({ flatten: true }).length ?? 0;
    const hasClose = assignedCount > 0;
    if (this.hasCloseControl !== hasClose) {
      this.hasCloseControl = hasClose;
    }
    this.toggleAttribute('has-close-control', hasClose);
  }

  private handleCloseControlChange(event: Event) {
    this.syncCloseControlPresence(event.target as HTMLSlotElement);
  }

  private handleCloseControlClick() {
    this.setAttribute('hidden', '');
    this.emitClose();
  }

  private emitClose() {
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }
}
