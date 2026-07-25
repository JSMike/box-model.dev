import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './checkbox.host.scss?inline';
import slotStyles from './checkbox.slot.scss?inline';

export const CheckboxGroupBox = 'checkbox-group-box';

/**
 * Grouped checkbox options in a fieldset.
 * @slot - Default slot content.
 * @slot legend - Legend content for the fieldset.
 * @csspart content - Primary content region.
 */
@customElement(CheckboxGroupBox)
export class CheckboxGroup extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Legend text when the legend slot is empty. */
  @property({ type: String }) public legend = '';

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: CheckboxGroupBox,
    });
  }

  override render() {
    return html`
      <fieldset>
        <legend ?hidden=${!this.legend}>
          <slot name="legend">${this.legend}</slot>
        </legend>
        <div class="checkbox-group__content" part="content">
          <slot></slot>
        </div>
      </fieldset>
    `;
  }
}
