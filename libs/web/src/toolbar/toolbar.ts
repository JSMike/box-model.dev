import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './toolbar.host.scss?inline';
import slotStyles from './toolbar.slot.scss?inline';

export const ToolbarBox = 'toolbar-box';

@customElement(ToolbarBox)
export class Toolbar extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: ToolbarBox,
    });
  }

  override render() {
    return html`<div class="toolbar-box__surface" part="surface"><slot></slot></div>`;
  }
}
