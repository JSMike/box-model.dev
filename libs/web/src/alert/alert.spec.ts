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

    let closed = false;
    element.addEventListener('close', () => (closed = true));
    control?.shadowRoot?.querySelector('button')?.click();

    const iconGlyph = icon?.shadowRoot?.textContent?.trim();
    expect(iconGlyph).to.equal('!');
    expect(body?.textContent).to.equal('Something went wrong');
    expect(control).to.exist;
    expect(closed).to.be.true;
  });
});
