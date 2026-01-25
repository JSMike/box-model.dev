import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import styles from './button.host.scss?inline';
import slotStyles from './button.slot.scss?inline';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

export const ButtonBox = 'button-box';

@customElement(ButtonBox)
export class Button extends LitElement {
  static override styles = unsafeCSS(styles);

  @property({ attribute: 'variant', type: String, reflect: true })
  public variant?: ButtonVariant;

  @property({ attribute: 'size', type: String, reflect: true })
  public size?: ButtonSize;

  override connectedCallback() {
    super.connectedCallback();
    this.setSlotStyles();
  }

  setSlotStyles() {
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: 'button-box',
    });
  }

  override render() {
    return html`<slot></slot>`;
  }
}
