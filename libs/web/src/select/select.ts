import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './select.host.scss?inline';
import slotStyles from './select.slot.scss?inline';

export const SelectBox = 'select-box';

/**
 * Styled host for a native select control.
 * @slot - Default slot content.
 */
@customElement(SelectBox)
export class Select extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Stretch the control to fill available width. */
  @property({ type: Boolean, reflect: true }) public fullwidth = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: SelectBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
