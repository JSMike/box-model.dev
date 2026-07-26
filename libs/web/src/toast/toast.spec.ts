import { fixture, html } from '@open-wc/testing';
import './toast';
import '../close-control';

describe('toast-box', () => {
  beforeEach(async () => {
    await Promise.all([
      customElements.whenDefined('toast-box'),
      customElements.whenDefined('close-control-box'),
    ]);
  });

  it('reflects variant attribute', async () => {
    const element = await fixture<HTMLElement>(html`
      <toast-box variant="danger">
        <p>Error saving changes</p>
      </toast-box>
    `);

    expect(element.getAttribute('variant')).to.equal('danger');
    expect(element.textContent?.trim()).to.contain('Error saving changes');
  });
  it('emits close when close control triggered', async () => {
    const element = await fixture<HTMLElement>(html`
      <toast-box variant="default">
        <p>Message</p>
        <close-control-box slot="close-control" label="Dismiss notification"></close-control-box>
      </toast-box>
    `);

    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));
    const control = element.querySelector('close-control-box');
    control?.shadowRoot?.querySelector('button')?.click();

    expect(closeEvents).to.have.length(1);
    expect(closeEvents[0].target).to.equal(element);
    expect(element.hasAttribute('hidden')).to.be.true;
  });
});
