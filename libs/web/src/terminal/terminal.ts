import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './terminal.host.scss?inline';
import slotStyles from './terminal.slot.scss?inline';

export const TerminalBox = 'terminal-box';

/**
 * Terminal-style output surface.
 * @slot - Default slot content.
 * @csspart surface - Outer surface of the component.
 */
@customElement(TerminalBox)
export class Terminal extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: TerminalBox,
    });
  }

  override render() {
    return html`
      <div class="terminal-box__surface" part="surface">
        <slot></slot>
      </div>
    `;
  }
}
