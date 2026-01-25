import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import './dialog-header';
import './dialog-footer';
import hostStyles from './dialog.host.scss?inline';
import slotStyles from './dialog.slot.scss?inline';

export const DialogBox = 'dialog-box';

@customElement(DialogBox)
export class Dialog extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: Boolean, reflect: true }) open = false;

  @property({ type: Boolean, reflect: true, attribute: 'no-backdrop-close' })
  public noBackdropClose = false;

  @query('dialog') private dialogElement!: HTMLDialogElement;
  // @query('slot[name="header"]') private headerSlot?: HTMLSlotElement;
  // @query('slot[name="footer"]') private footerSlot?: HTMLSlotElement;
  @query('slot[name="close-control"]') private closeSlot?: HTMLSlotElement;
  @state() private hasHeader = false;
  @state() private hasFooter = false;
  @state() private hasCloseControl = false;
  private programmaticClose = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: DialogBox,
    });
    this.syncInitialSlotPresence();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.dialogElement) {
      if (this.open && !this.dialogElement.open) {
        this.hidden = false;
        this.dialogElement.showModal();
      } else if (!this.open && this.dialogElement.open) {
        this.dialogElement.close();
        this.hidden = true;
      }
    }
  }

  private emitClose() {
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCloseRequest() {
    this.programmaticClose = true;
    if (this.dialogElement?.open) {
      this.dialogElement.close();
    }
    if (this.open) {
      this.open = false;
    }
    this.hidden = true;
    this.emitClose();
  }

  private handleCancel(event: Event) {
    if (this.noBackdropClose) {
      event.preventDefault();
    }
  }

  private handleNativeClose() {
    if (this.programmaticClose) {
      this.programmaticClose = false;
      return;
    }
    if (this.open) {
      this.open = false;
    }
    this.hidden = true;
    this.emitClose();
  }

  override render() {
    return html`
      <dialog
        @cancel=${this.handleCancel}
        @close=${this.handleNativeClose}
      >
        <div
          class="dialog-box__section--header"
          part="header"
          ?hidden=${!this.hasHeader && !this.hasCloseControl}
        >
          <slot
            name="header"
            @slotchange=${this.onHeaderSlotChange}
          ></slot>
          <div class="dialog-box__close" part="close" ?hidden=${!this.hasCloseControl}>
            <slot
              name="close-control"
              @slotchange=${this.onCloseSlotChange}
              @click=${this.handleCloseControlClick}
            ></slot>
          </div>
        </div>
        <div class="dialog-box__section--body" part="body">
          <slot></slot>
        </div>
        ${this.hasFooter
          ? html`<div class="dialog-box__section--footer" part="footer">
              <slot
                name="footer"
                @slotchange=${this.onFooterSlotChange}
              ></slot>
            </div>`
          : html`<slot name="footer" hidden @slotchange=${this.onFooterSlotChange}></slot>`}
      </dialog>
    `;
  }

  private onHeaderSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const hasHeader = slot.assignedElements({ flatten: true }).length > 0;
    this.applyHeaderPresence(hasHeader);
  }

  private onFooterSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const hasFooter = slot.assignedElements({ flatten: true }).length > 0;
    this.applyFooterPresence(hasFooter);
  }

  private onCloseSlotChange(event: Event) {
    this.syncClosePresence(event.target as HTMLSlotElement);
  }

  private syncClosePresence(slot?: HTMLSlotElement | null) {
    const target = slot ?? this.closeSlot;
    const hasClose = (target?.assignedElements({ flatten: true }).length ?? 0) > 0;
    this.applyClosePresence(hasClose);
  }

  private handleCloseControlClick() {
    this.handleCloseRequest();
  }

  private syncInitialSlotPresence() {
    this.applyHeaderPresence(this.hasLightDomSlot('header'));
    this.applyFooterPresence(this.hasLightDomSlot('footer'));
    this.applyClosePresence(this.hasLightDomSlot('close-control'));
  }

  private hasLightDomSlot(name: string): boolean {
    return Array.from(this.children).some((child) => (child as HTMLElement).slot === name);
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

  private applyClosePresence(present: boolean) {
    if (this.hasCloseControl !== present) {
      this.hasCloseControl = present;
    }
    if (this.hasAttribute('has-close-control') !== present) {
      this.toggleAttribute('has-close-control', present);
    }
  }
}
