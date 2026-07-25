import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './terminal-line.host.scss?inline';
import slotStyles from './terminal-line.slot.scss?inline';

export const TerminalLineBox = 'terminal-line-box';

export type TerminalLineVariant = 'prompt' | 'success' | 'info';

/**
 * Single line within a terminal surface.
 * @slot - Default slot content.
 * @csspart content - Primary content region.
 * @csspart cursor - Terminal cursor.
 * @csspart prompt - Terminal prompt.
 */
@customElement(TerminalLineBox)
export class TerminalLine extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: TerminalLineBox,
    });
  }

  /** Visual variant of the component. */
  @property({ reflect: true }) variant: TerminalLineVariant = 'prompt';
  /** Whether to show a terminal cursor. */
  @property({ type: Boolean, reflect: true }) cursor = false;

  override render() {
    return html`
      ${this.variant === 'prompt' ? html`<span class="terminal-line__prompt" part="prompt">$</span>` : ''}
      ${this.variant === 'success'
        ? html`<span class="terminal-line__prompt" part="prompt">✔</span>`
        : ''}
      ${this.variant === 'info' ? html`<span class="terminal-line__prompt" part="prompt">i</span>` : ''}
      <div class="terminal-line__content" part="content">
        <slot></slot>
        ${this.cursor ? html`<span class="terminal-line__cursor" part="cursor">_</span>` : ''}
      </div>
    `;
  }
}
