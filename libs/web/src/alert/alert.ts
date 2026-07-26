import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import '../status-icon';
import hostStyles from './alert.host.scss?inline';
import slotStyles from './alert.slot.scss?inline';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export const AlertBox = 'alert-box';

/**
 * Inline alert for status messaging.
 * @slot - Default slot content.
 * @slot close-control - Optional close control (typically `<close-control-box>`).
 * @csspart close - Close control wrapper.
 * @csspart content - Primary content region.
 * @csspart surface - Outer surface of the component.
 * @fires close - Fired when the component requests to close (bubbles, composed).
 */
@customElement(AlertBox)
export class Alert extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Visual variant of the component. */
  @property({ type: String, reflect: true }) public variant: AlertVariant = 'info';

  @query('slot[name="close-control"]') private closeControlSlot?: HTMLSlotElement;
  @query('.alert-box__close') private closeControlContainer?: HTMLDivElement;

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
      <div class="alert-box__surface" part="surface">
        <status-icon-box variant="${this.variant}"></status-icon-box>
        <div class="alert-box__content" part="content">
          <slot></slot>
        </div>
        <div class="alert-box__close" part="close" hidden>
          <slot
            name="close-control"
            @slotchange=${this.handleCloseControlChange}
            @close=${this.handleSlottedClose}
            @click=${this.handleCloseControlClick}
          ></slot>
        </div>
      </div>
    `;
  }

  private syncCloseControlPresence(slot?: HTMLSlotElement | null) {
    const targetSlot = slot ?? this.closeControlSlot;
    const assignedCount = targetSlot?.assignedElements({ flatten: true }).length ?? 0;
    const hasClose = assignedCount > 0;
    this.closeControlContainer?.toggleAttribute('hidden', !hasClose);
    this.toggleAttribute('has-close-control', hasClose);
  }

  private handleCloseControlChange(event: Event) {
    this.syncCloseControlPresence(event.target as HTMLSlotElement);
  }

  private handleCloseControlClick() {
    this.setAttribute('hidden', '');
    this.emitClose();
  }

  private handleSlottedClose(event: Event) {
    event.stopPropagation();
  }

  private emitClose() {
    this.dispatchEvent(
      new CustomEvent<void>('close', {
        bubbles: true,
        composed: true,
      })
    );
  }
}
