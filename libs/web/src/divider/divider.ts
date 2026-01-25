import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './divider.host.scss?inline';
import slotStyles from './divider.slot.scss?inline';

export type DividerOrientation = 'horizontal' | 'vertical';

export const DividerBox = 'divider-box';

@customElement(DividerBox)
export class Divider extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String, reflect: true }) public orientation: DividerOrientation = 'horizontal';

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: DividerBox,
    });
  }

  override render() {
    const ariaOrientation = this.orientation === 'vertical' ? 'vertical' : 'horizontal';
    return html`
      <div
        class="divider-box__line"
        part="line"
        role="separator"
        aria-orientation="${ariaOrientation}"
      ></div>
      <slot></slot>
    `;
  }
}
