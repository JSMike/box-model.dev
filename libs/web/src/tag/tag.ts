import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './tag.host.scss?inline';
import slotStyles from './tag.slot.scss?inline';

export type TagVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export const TagBox = 'tag-box';

@customElement(TagBox)
export class Tag extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String, reflect: true }) public variant: TagVariant = 'neutral';

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: TagBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
