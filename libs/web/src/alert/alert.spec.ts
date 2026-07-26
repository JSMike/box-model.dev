import { fixture, html } from '@open-wc/testing';
import './alert';
import '../close-control';

describe('alert-box', () => {
  beforeEach(async () => {
    await Promise.all([
      customElements.whenDefined('alert-box'),
      customElements.whenDefined('close-control-box'),
      customElements.whenDefined('status-icon-box'),
    ]);
  });

  it('renders the variant icon and default slot content', async () => {
    const element = await fixture<HTMLElement>(html`
      <alert-box variant="warning">
        <p role="alert">Something went wrong</p>
        <close-control-box slot="close-control"></close-control-box>
      </alert-box>
    `);

    expect(element.getAttribute('variant')).to.equal('warning');
    const icon = element.shadowRoot?.querySelector('status-icon-box');
    const body = element.querySelector('p');
    const control = element.querySelector('close-control-box');

    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));
    control?.shadowRoot?.querySelector('button')?.click();

    const iconGlyph = icon?.shadowRoot?.textContent?.trim();
    expect(iconGlyph).to.equal('!');
    expect(body?.textContent).to.equal('Something went wrong');
    expect(control).to.exist;
    expect(closeEvents).to.have.length(1);
    expect(closeEvents[0].target).to.equal(element);
  });

  it('contains fragmented projected content within its internal layout surface', async () => {
    const element = await fixture<HTMLElement>(html`
      <alert-box style="display: block">
        Local package <code>&lt;alert-box&gt;</code> content
        <close-control-box slot="close-control"></close-control-box>
      </alert-box>
    `);

    const surface = element.shadowRoot?.querySelector('.alert-box__surface');
    const icon = element.shadowRoot?.querySelector('status-icon-box');
    const content = element.shadowRoot?.querySelector('.alert-box__content');
    const close = element.shadowRoot?.querySelector('.alert-box__close');
    const contentSlot = content?.querySelector<HTMLSlotElement>('slot:not([name])');
    const closeSlot = close?.querySelector<HTMLSlotElement>('slot[name="close-control"]');
    const assignedContent = contentSlot
      ?.assignedNodes({ flatten: true })
      .filter((node) => node.textContent?.trim());

    expect(surface).to.exist;
    expect(Array.from(surface?.children ?? [])).to.deep.equal([icon, content, close]);
    expect(assignedContent).to.have.length(3);
    expect(closeSlot?.assignedElements({ flatten: true })).to.have.length(1);
    expect(getComputedStyle(element).display).to.equal('block');
  });
});
