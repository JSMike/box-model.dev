import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from './columns.host.scss?inline';

export type ColumnsGap = 'sm' | 'md' | 'lg';

export const ColumnsBox = 'columns-box';

/**
 * Responsive multi-column layout.
 * @slot - Default slot content.
 * @csspart grid - Layout grid.
 */
@customElement(ColumnsBox)
export class Columns extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Gap between columns. */
  @property({ type: String, reflect: true }) public gap: ColumnsGap = 'md';
  /** Minimum column width before wrapping. */
  @property({ type: String, attribute: 'min-width', reflect: true }) public minWidth = '15rem';

  override render() {
    return html`
      <div class="columns-box__grid" part="grid" style="--columns-min-width: ${this.minWidth}">
        <slot></slot>
      </div>
    `;
  }
}
