import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
  @state() private hasSlottedLegend = false;

  override connectedCallback() {
    super.connectedCallback();
    this.hasSlottedLegend = Array.from(this.children).some(
      (child) => (child as HTMLElement).slot === 'legend'
    );
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: RadioGroupBox,
    });
  }

  override render() {
    return html`
      <fieldset>
        <legend ?hidden=${!this.legend && !this.hasSlottedLegend}>
          <slot name="legend" @slotchange=${this.handleLegendSlotChange}>${this.legend}</slot>
        </legend>
        <div class="radio-group__content" part="content">
          <slot></slot>
        </div>
      </fieldset>
    `;
  }

  private handleLegendSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    this.hasSlottedLegend = slot.assignedElements({ flatten: true }).length > 0;
  }
}
