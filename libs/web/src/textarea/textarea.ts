import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './textarea.host.scss?inline';
import slotStyles from './textarea.slot.scss?inline';

export const TextareaBox = 'textarea-box';

/**
 * Styled host for a native textarea control.
 * @slot - Default slot content.
 */
@customElement(TextareaBox)
export class Textarea extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Stretch the control to fill available width. */
  @property({ type: Boolean, reflect: true }) public fullwidth = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: TextareaBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
