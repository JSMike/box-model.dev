import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import '../status-icon';
import hostStyles from './banner.host.scss?inline';
import slotStyles from './banner.slot.scss?inline';

export type BannerVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

export const BannerBox = 'banner-box';

/**
 * Prominent banner for page-level messaging.
 * @slot - Default slot content.
 * @slot actions - Optional action controls.
 * @slot close-control - Optional close control (typically `<close-control-box>`).
 * @slot details - Optional details content.
 * @csspart actions - Actions region.
 * @csspart close - Close control wrapper.
 * @csspart content - Primary content region.
 * @csspart details - Details region.
 * @csspart surface - Outer surface of the component.
 * @fires close - Fired when the component requests to close (bubbles, composed).
 */
@customElement(BannerBox)
export class Banner extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Visual variant of the component. */
  @property({ type: String, reflect: true }) public variant: BannerVariant = 'default';

  @query('slot[name="details"]') detailsSlot?: HTMLSlotElement;
  @query('slot[name="actions"]') actionsSlot?: HTMLSlotElement;
  @query('slot[name="close-control"]') closeSlot?: HTMLSlotElement;
  @query('.banner-box__details') detailsContainer?: HTMLDivElement;
  @query('.banner-box__actions') actionsContainer?: HTMLDivElement;
  @query('.banner-box__close') closeContainer?: HTMLDivElement;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: BannerBox,
    });
  }

  override firstUpdated(): void {
    this.updateDetailsPresence();
    this.updateActionsPresence();
    this.updateClosePresence(this.closeSlot);
  }

  updateDetailsPresence() {
    const hasDetails = (this.detailsSlot?.assignedElements({ flatten: true }).length ?? 0) > 0;
    this.detailsContainer?.toggleAttribute('hidden', !hasDetails);
  }

  updateActionsPresence() {
    const hasActions = (this.actionsSlot?.assignedElements({ flatten: true }).length ?? 0) > 0;
    this.actionsContainer?.toggleAttribute('hidden', !hasActions);
  }

  onDetailsSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.detailsContainer?.toggleAttribute(
      'hidden',
      slot.assignedElements({ flatten: true }).length === 0
    );
  }

  onActionsSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.actionsContainer?.toggleAttribute(
      'hidden',
      slot.assignedElements({ flatten: true }).length === 0
    );
  }

  updateClosePresence(slot?: HTMLSlotElement | null) {
    const target = slot ?? this.closeSlot;
    const assigned = target?.assignedElements({ flatten: true }).length ?? 0;
    this.closeContainer?.toggleAttribute('hidden', assigned === 0);
  }

  onCloseSlotChange(event: Event) {
    this.updateClosePresence(event.target as HTMLSlotElement);
  }

  handleCloseClick() {
    this.setAttribute('hidden', '');
    this.dispatchCloseEvent();
  }

  dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent<void>('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="banner-box__surface" part="surface">
        <status-icon-box
          variant="${this.variant === 'default' ? 'info' : this.variant}"
        ></status-icon-box>
        <div class="banner-box__content" part="content">
          <slot></slot>
        </div>
        <div class="banner-box__details" part="details" hidden>
          <slot name="details" @slotchange=${this.onDetailsSlotChange}></slot>
        </div>
        <div class="banner-box__actions" part="actions" hidden>
          <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
        </div>
        <div class="banner-box__close" part="close" hidden>
          <slot
            name="close-control"
            @slotchange=${this.onCloseSlotChange}
            @click=${this.handleCloseClick}
          ></slot>
        </div>
      </div>
    `;
  }
}
