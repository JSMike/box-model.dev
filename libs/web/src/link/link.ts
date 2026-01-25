import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './link.host.scss?inline';
import slotStyles from './link.slot.scss?inline';

export type LinkVariant = 'primary' | 'secondary' | 'tertiary';
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const LinkBox = 'link-box';

@customElement(LinkBox)
export class Link extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @property({ type: String, reflect: true }) public variant: LinkVariant = 'primary';
  @property({ type: String, reflect: true }) public size: LinkSize = 'md';

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: LinkBox,
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
