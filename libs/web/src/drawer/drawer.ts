import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import './drawer-header';
import hostStyles from './drawer.host.scss?inline';
import slotStyles from './drawer.slot.scss?inline';

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

export const DrawerBox = 'drawer-box';

@customElement(DrawerBox)
export class Drawer extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true, attribute: 'no-backdrop-close' })
  public noBackdropClose = false;
  @property({ type: String, reflect: true }) public placement: DrawerPlacement = 'right';
  @state() private hasHeading = false;
  @state() private hasActions = false;
  @state() private hasCloseControl = false;

  @query('dialog') private dialogElement?: HTMLDialogElement;
  // @query('slot[name="heading"]') private headingSlot?: HTMLSlotElement;
  // @query('slot[name="actions"]') private actionsSlot?: HTMLSlotElement;
  @query('slot[name="close-control"]') private closeSlot?: HTMLSlotElement;
  private programmaticClose = false;

  override connectedCallback() {
    super.connectedCallback();
    this.hidden = !this.open;
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: DrawerBox,
    });
    this.syncInitialSlotPresence();
  }

  override render() {
    return html`
      <dialog
        @cancel=${this.handleCancel}
        @close=${this.handleNativeClose}
      >
        <aside class="drawer-box__panel" part="panel" role="complementary">
          <div
            class="drawer-box__section--header"
            part="header"
            ?hidden=${!this.hasHeading && !this.hasCloseControl}
          >
            <slot name="heading" @slotchange=${this.onHeadingSlotChange}></slot>
            <div class="drawer-box__close" part="close" ?hidden=${!this.hasCloseControl}>
              <slot
                name="close-control"
                @slotchange=${this.onCloseSlotChange}
                @click=${this.handleCloseClick}
              ></slot>
            </div>
          </div>
          <div class="drawer-box__section--body" part="body">
            <slot></slot>
          </div>
          ${this.hasActions
            ? html`<div class="drawer-box__section--footer" part="footer">
                <slot name="actions" @slotchange=${this.onActionsSlotChange}></slot>
              </div>`
            : html`<slot name="actions" hidden @slotchange=${this.onActionsSlotChange}></slot>`}
        </aside>
      </dialog>
    `;
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

  private onHeadingSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const hasHeading = slot.assignedElements({ flatten: true }).length > 0;
    this.applyHeadingPresence(hasHeading);
  }

  private onActionsSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const hasActions = slot.assignedElements({ flatten: true }).length > 0;
    this.applyActionsPresence(hasActions);
  }

  private onCloseSlotChange(event: Event) {
    this.syncClosePresence(event.target as HTMLSlotElement);
  }

  private syncClosePresence(slot?: HTMLSlotElement | null) {
    const target = slot ?? this.closeSlot;
    const hasClose = (target?.assignedElements({ flatten: true }).length ?? 0) > 0;
    this.applyClosePresence(hasClose);
  }

  private handleCloseClick() {
    this.handleCloseRequest();
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('open') && this.dialogElement) {
      if (this.open && !this.dialogElement.open) {
        this.hidden = false;
        this.dialogElement.showModal();
        this.updateComplete.then(() => this.syncClosePresence(this.closeSlot));
      } else if (!this.open && this.dialogElement.open) {
        this.dialogElement.close();
        this.hidden = true;
      }
    }
  }

  private syncInitialSlotPresence() {
    this.applyHeadingPresence(this.hasLightDomSlot('heading'));
    this.applyActionsPresence(this.hasLightDomSlot('actions'));
    this.applyClosePresence(this.hasLightDomSlot('close-control'));
  }

  private hasLightDomSlot(name: string): boolean {
    return Array.from(this.children).some((child) => (child as HTMLElement).slot === name);
  }

  private applyHeadingPresence(present: boolean) {
    if (this.hasHeading !== present) {
      this.hasHeading = present;
    }
  }

  private applyActionsPresence(present: boolean) {
    if (this.hasActions !== present) {
      this.hasActions = present;
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
