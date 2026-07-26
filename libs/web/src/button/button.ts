import { html, unsafeCSS, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import styles from './button.host.scss?inline';
import slotStyles from './button.slot.scss?inline';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';

export const ButtonBox = 'button-box';

/**
 * Themed button surface for slotted controls.
 * @slot - Default slot content.
 */
@customElement(ButtonBox)
export class Button extends LitElement {
  static override styles = unsafeCSS(styles);

  /** Visual variant of the component. */
  @property({ attribute: 'variant', type: String, reflect: true })
  public variant?: ButtonVariant;

  /** Size of the component. */
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
