import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import hostStyles from './progress.host.scss?inline';

export const ProgressBox = 'progress-box';

@customElement(ProgressBox)
export class Progress extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: Number }) public value = 0;
  @property({ type: Number }) public max = 100;

  private get clampedValue() {
    const max = this.max > 0 ? this.max : 100;
    const value = Math.min(Math.max(this.value, 0), max);
    return { value, max };
  }

  override render() {
    const { value, max } = this.clampedValue;
    const percent = (value / max) * 100;

    return html`
      <div class="progress-box__header" part="header">
        <slot></slot>
        <span class="progress-box__percent" part="percent">${Math.round(percent)}%</span>
      </div>
      <div
        class="progress-box__track"
        part="track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="${max}"
        aria-valuenow="${Math.round(value)}"
      >
        <div class="progress-box__indicator" part="indicator" style="width: ${percent}%"></div>
      </div>
    `;
  }
}
