import { html, LitElement, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './stat.host.scss?inline';
import slotStyles from './stat.slot.scss?inline';

export type StatTrend = 'neutral' | 'up' | 'down';

export const StatBox = 'stat-box';

/**
 * Statistic display with optional delta and trend.
 * @slot - Default slot content.
 * @slot title - Title content.
 * @csspart delta - Delta value container.
 * @csspart delta-text - Delta text.
 * @csspart label - Label region.
 * @csspart trend-icon - Trend indicator icon.
 * @csspart value - Primary value display.
 */
@customElement(StatBox)
export class Stat extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Current value. */
  @property({ type: String }) public value = '';
  /** Delta text shown beside the value. */
  @property({ type: String }) public delta?: string;
  /** Trend direction for the delta. */
  @property({ type: String, reflect: true }) public trend: StatTrend = 'neutral';
  /** Whether to show the trend indicator icon. */
  @property({ type: Boolean, attribute: 'show-trend-indicator' })
  public showTrendIndicator = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: StatBox,
    });
  }

  override render() {
    return html`
      <div class="stat-box__label" part="label"><slot name="title"></slot></div>
      <div class="stat-box__value" part="value">${this.value}</div>
      ${this.delta
        ? html`<div class="stat-box__delta" part="delta">
            ${this.showTrendIndicator ? this.renderTrendIcon() : nothing}
            <span part="delta-text">${this.delta}</span>
          </div>`
        : html``}
      <slot></slot>
    `;
  }

  private renderTrendIcon() {
    return html`<span
      class="stat-box__trend-icon"
      part="trend-icon"
      role="img"
      aria-label="${this.trendIconLabel}"
    >
      ${this.trendIconSymbol}
    </span>`;
  }

  private get trendIconSymbol(): string {
    switch (this.trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'neutral':
      default:
        return '⇌';
    }
  }

  private get trendIconLabel(): string {
    switch (this.trend) {
      case 'up':
        return 'Trending up';
      case 'down':
        return 'Trending down';
      case 'neutral':
      default:
        return 'No change';
    }
  }
}
