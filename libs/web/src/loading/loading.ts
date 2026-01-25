import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './loading.host.scss?inline';

export const LoadingBox = 'loading-box';

const CELL_COUNT = 9;

@customElement(LoadingBox)
export class Loading extends LitElement {
  static override styles = unsafeCSS(styles);

  @property({ type: Boolean, attribute: 'label-visible', reflect: true })
  public labelVisible = false;

  override connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'status');
    }

    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'polite');
    }
  }

  override render() {
    return html`
      <div class="loading-box__grid" aria-hidden="true" part="grid">
        ${Array.from({ length: CELL_COUNT }).map(() => html`<span class="loading-box__cell"></span>`)}
      </div>
      <span class="loading-box__label" part="label">
        <slot>Loading</slot>
      </span>
    `;
  }
}
