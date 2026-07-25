import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './input.host.scss?inline';
import slotStyles from './input.slot.scss?inline';

export const InputBox = 'input-box';

/**
 * Styled host for a native input control.
 * @slot - Default slot content.
 */
@customElement(InputBox)
export class Input extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Stretch the control to fill available width. */
  @property({ type: Boolean, reflect: true }) public fullwidth = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: InputBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
