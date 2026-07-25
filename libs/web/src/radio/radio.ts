import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './radio.host.scss?inline';
import slotStyles from './radio.slot.scss?inline';

export const RadioGroupBox = 'radio-group-box';

/**
 * Grouped radio options in a fieldset.
 * @slot - Default slot content.
 * @slot legend - Legend content for the fieldset.
 * @csspart content - Primary content region.
 */
@customElement(RadioGroupBox)
export class RadioGroup extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Legend text when the legend slot is empty. */
  @property({ type: String }) public legend = '';

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: RadioGroupBox,
    });
  }

  override render() {
    return html`
      <fieldset>
        <legend ?hidden=${!this.legend}>
          <slot name="legend">${this.legend}</slot>
        </legend>
        <div class="radio-group__content" part="content">
          <slot></slot>
        </div>
      </fieldset>
    `;
  }
}
