import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './card.host.scss?inline';
import slotStyles from './card.slot.scss?inline';

export const CardBox = 'card-box';

/**
 * Content card with optional header, footer, and actions.
 * @slot - Default slot content.
 * @slot actions - Optional action controls.
 * @slot close-control - Optional close control (typically `<close-control-box>`).
 * @slot footer - Footer content.
 * @slot header - Header content.
 * @csspart actions - Actions region.
 * @csspart body - Body region.
 * @csspart close - Close control wrapper.
 * @csspart footer - Footer region.
 * @csspart header - Header region.
 * @csspart surface - Outer surface of the component.
 * @fires close - Fired when the component requests to close (bubbles, composed).
 */
@customElement(CardBox)
export class Card extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Whether the card gains a stronger offset shadow on hover. */
  @property({ type: Boolean, reflect: true }) public hoverable = false;

  @state() private hasHeader = false;
  @state() private hasFooter = false;
  @state() private hasCloseControl = false;
  @state() private hasActions = false;

  // @query('slot[name="header"]') private headerSlot?: HTMLSlotElement;
  // @query('slot[name="footer"]') private footerSlot?: HTMLSlotElement;
  @query('slot[name="close-control"]') private closeSlot?: HTMLSlotElement;
  // @query('slot[name="actions"]') private actionsSlot?: HTMLSlotElement;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: CardBox,
    });
    this.syncInitialSlotPresence();
  }

  override render() {
    const showHeader = this.hasHeader || this.hasCloseControl;
    return html`
      <div class="card-box__surface" part="surface">
        <div
          class="card-box__close"
          part="close"
          ?hidden=${!this.hasCloseControl}
        >
          <slot
            name="close-control"
            @slotchange=${this.handleCloseSlotChange}
            @close=${this.handleSlottedClose}
            @click=${this.handleCloseClick}
          ></slot>
        </div>
        ${showHeader
          ? html`<div class="card-box__header" part="header">
              <slot name="header" @slotchange=${this.onHeaderSlotChange}></slot>
            </div>`
          : html`<slot
              name="header"
              hidden
              @slotchange=${this.onHeaderSlotChange}
            ></slot>`}
        <div class="card-box__body" part="body">
          <slot></slot>
        </div>
        ${this.hasFooter
          ? html`<div class="card-box__footer" part="footer">
              <slot name="footer" @slotchange=${this.onFooterSlotChange}></slot>
            </div>`
          : html`<slot
              name="footer"
              hidden
              @slotchange=${this.onFooterSlotChange}
            ></slot>`}
        ${this.hasActions
          ? html`<div class="card-box__actions" part="actions">
              <slot
                name="actions"
                @slotchange=${this.onActionsSlotChange}
              ></slot>
            </div>`
          : html`<slot
              name="actions"
              hidden
              @slotchange=${this.onActionsSlotChange}
            ></slot>`}
      </div>
    `;
  }

  private handleCloseSlotChange(event: Event) {
    this.syncCloseControlPresence(event.target as HTMLSlotElement);
  }

  private handleCloseClick() {
    this.setAttribute('hidden', '');
    this.dispatchCloseEvent();
  }

  private handleSlottedClose(event: Event) {
    event.stopPropagation();
  }

  private dispatchCloseEvent() {
    this.dispatchEvent(
      new CustomEvent<void>('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private syncCloseControlPresence(slot?: HTMLSlotElement | null) {
    const target = slot ?? this.closeSlot;
    const hasClose =
      (target?.assignedElements({ flatten: true }).length ?? 0) > 0;
    this.applyCloseControlPresence(hasClose);
  }

  private onHeaderSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const headerPresent = slot.assignedElements({ flatten: true }).length > 0;
    this.applyHeaderPresence(headerPresent);
  }

  private onFooterSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const footerPresent = slot.assignedElements({ flatten: true }).length > 0;
    this.applyFooterPresence(footerPresent);
  }

  private onActionsSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const actionsPresent = slot.assignedElements({ flatten: true }).length > 0;
    this.applyActionsPresence(actionsPresent);
  }

  private syncInitialSlotPresence() {
    this.applyHeaderPresence(this.hasLightDomSlot('header'));
    this.applyFooterPresence(this.hasLightDomSlot('footer'));
    this.applyActionsPresence(this.hasLightDomSlot('actions'));
    this.applyCloseControlPresence(this.hasLightDomSlot('close-control'));
  }

  private hasLightDomSlot(name: string): boolean {
    return Array.from(this.children).some(
      (child) => (child as HTMLElement).slot === name
    );
  }

  private applyHeaderPresence(present: boolean) {
    if (this.hasHeader !== present) {
      this.hasHeader = present;
    }
  }

  private applyFooterPresence(present: boolean) {
    if (this.hasFooter !== present) {
      this.hasFooter = present;
    }
  }

  private applyActionsPresence(present: boolean) {
    if (this.hasActions !== present) {
      this.hasActions = present;
    }
  }

  private applyCloseControlPresence(present: boolean) {
    if (this.hasCloseControl !== present) {
      this.hasCloseControl = present;
    }
    const hasAttributeApplied = this.hasAttribute('has-close-control');
    if (hasAttributeApplied !== present) {
      this.toggleAttribute('has-close-control', present);
    }
  }
}
