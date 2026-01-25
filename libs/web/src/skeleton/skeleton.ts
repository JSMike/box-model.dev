import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './skeleton.host.scss?inline';
import slotStyles from './skeleton.slot.scss?inline';

export const SkeletonBox = 'skeleton-box';

@customElement(SkeletonBox)
export class Skeleton extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String }) public width?: string;
  @property({ type: String }) public height?: string;
  @property({ type: Boolean, reflect: true }) public animated = true;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: SkeletonBox,
    });
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('width')) {
      if (this.width) {
        this.style.width = this.width;
        this.style.setProperty('--skeleton-width', this.width);
      } else {
        this.style.removeProperty('width');
        this.style.removeProperty('--skeleton-width');
      }
    }

    if (changed.has('height')) {
      if (this.height) {
        this.style.height = this.height;
        this.style.setProperty('--skeleton-height', this.height);
      } else {
        this.style.removeProperty('height');
        this.style.removeProperty('--skeleton-height');
      }
    }
  }

  override render() {
    return html`<slot></slot>`;
  }
}
