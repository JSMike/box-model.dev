import { html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from './tooltip.host.scss?inline';
import slotStyles from './tooltip.slot.scss?inline';
import { slotStyleService } from '../common/slot-style';

let tooltipIds = 0;

export const TooltipBox = 'tooltip-box';

/**
 * Accessible tooltip anchored to a trigger.
 * @slot - Default slot content.
 * @slot trigger - Element that triggers the tooltip.
 * @csspart container - Tooltip container.
 * @csspart content - Primary content region.
 * @csspart trigger - Tooltip trigger control.
 * @csspart trigger-wrapper - Wrapper around the trigger slot.
 */
@customElement(TooltipBox)
export class Tooltip extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Accessible label. */
  @property({ type: String }) public label = 'More information';
  /** Preferred tooltip placement. */
  @property({ attribute: 'default-placement', type: String })
  public defaultPlacement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @state() private hasCustomTrigger = false;

  @query('slot[name="trigger"]') private triggerSlot?: HTMLSlotElement;
  @query('#tooltipFallback') private fallbackTrigger?: HTMLElement;
  @query('.tooltip-box__content') private contentElement?: HTMLElement;

  private anchorElement?: HTMLElement;
  private readonly contentId = `tooltip-content-${++tooltipIds}`;
  private readonly anchorId = `tooltip-anchor-${tooltipIds}`;

  private readonly showTooltip = () => this.openPopover();
  private readonly hideTooltip = (event?: Event) => {
    const next = (event as PointerEvent | undefined)
      ?.relatedTarget as Node | null;
    if (next && this.contains(next)) {
      return;
    }
    this.closePopover();
  };
  private readonly handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closePopover();
    }
  };
  private contentListenersAttached = false;

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: TooltipBox,
    });
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback(): void {
    this.removeAnchorListeners(this.anchorElement);
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  private handleTriggerSlotChange() {
    const assigned =
      this.triggerSlot?.assignedElements({ flatten: true }) ?? [];
    this.hasCustomTrigger = assigned.length > 0;
    this.applyAnchor(assigned[0] as HTMLElement | undefined);
  }

  protected override updated(): void {
    if (!this.hasCustomTrigger) {
      this.applyAnchor(this.fallbackTrigger ?? undefined);
    }
    this.attachContentListeners();
  }

  private applyAnchor(element?: HTMLElement) {
    this.removeAnchorListeners(this.anchorElement);

    if (!element) {
      this.anchorElement = undefined;
      return;
    }

    element.setAttribute('aria-describedby', this.contentId);
    element.classList.add('tooltip-box__trigger');
    if (!element.id) {
      element.id = this.anchorId;
    }
    element.addEventListener('pointerenter', this.showTooltip);
    element.addEventListener('pointerleave', this.hideTooltip);
    element.addEventListener('focus', this.showTooltip);
    element.addEventListener('blur', this.hideTooltip);

    this.anchorElement = element;
  }

  private removeAnchorListeners(element?: HTMLElement) {
    if (!element) return;
    element.removeAttribute('aria-describedby');
    element.classList.remove('tooltip-box__trigger');
    element.removeEventListener('pointerenter', this.showTooltip);
    element.removeEventListener('pointerleave', this.hideTooltip);
    element.removeEventListener('focus', this.showTooltip);
    element.removeEventListener('blur', this.hideTooltip);
  }

  private attachContentListeners() {
    if (!this.contentElement || this.contentListenersAttached) {
      return;
    }
    this.contentElement.addEventListener('pointerenter', this.showTooltip);
    this.contentElement.addEventListener('pointerleave', this.hideTooltip);
    this.contentListenersAttached = true;
  }

  private openPopover() {
    const popover = this.contentElement as HTMLElement & {
      showPopover?: () => void;
    };
    if (!popover) return;
    popover.setAttribute('aria-hidden', 'false');
    popover.showPopover?.();
  }

  private closePopover() {
    const popover = this.contentElement as HTMLElement & {
      hidePopover?: () => void;
    };
    if (!popover) return;
    popover.setAttribute('aria-hidden', 'true');
    popover.hidePopover?.();
  }

  override render() {
    return html`
      <div class="tooltip-box__container" part="container">
        <div class="tooltip-box__trigger-wrapper" part="trigger-wrapper">
          <slot
            name="trigger"
            @slotchange=${this.handleTriggerSlotChange}
          ></slot>
          ${this.hasCustomTrigger
            ? nothing
            : html`
                <span
                  id="tooltipFallback"
                  class="tooltip-box__default-trigger"
                  part="trigger"
                  role="button"
                  tabindex="0"
                  aria-label="${this.label}"
                  aria-describedby=${this.contentId}
                >
                  ?
                </span>
              `}
        </div>
        <div
          id=${this.contentId}
          aria-live="polite"
          aria-hidden="true"
          popover="manual"
          class="tooltip-box__content"
          part="content"
          role="tooltip"
          data-placement=${this.defaultPlacement}
          anchor=${this.anchorId}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
