import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './list.host.scss?inline';
import slotStyles from './list.slot.scss?inline';

export const ListBox = 'list-box';

/**
 * Styled ordered or unordered list.
 * @slot - Default slot content.
 * @csspart list - The list element.
 */
@customElement(ListBox)
export class List extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Render an ordered list instead of unordered. */
  @property({ type: Boolean, reflect: true }) public ordered = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: ListBox,
    });
  }

  override render() {
    return this.ordered
      ? html`<ol class="list-box__list" part="list"><slot></slot></ol>`
      : html`<ul class="list-box__list" part="list"><slot></slot></ul>`;
  }
}
