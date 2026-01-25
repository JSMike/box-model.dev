import { fixture, html } from '@open-wc/testing';
import './banner';
import type { Banner } from './banner';
import '../close-control';

describe('banner-box', () => {
  beforeEach(async () => {
    await Promise.all([
      customElements.whenDefined('banner-box'),
      customElements.whenDefined('close-control-box'),
    ]);
  });

  it('renders default slot and actions slot', async () => {
    const element = await fixture<Banner>(html`
      <banner-box variant="success">
        <p>Update complete</p>
        <span slot="actions">Undo</span>
      </banner-box>
    `);

    expect(element.getAttribute('variant')).to.equal('success');
    const action = element.querySelector('[slot="actions"]');
    expect(action?.textContent).to.equal('Undo');
  });

  it('emits close when close control triggered', async () => {
    const element = await fixture<Banner>(html`
      <banner-box variant="default">
        <p>Status</p>
        <close-control-box slot="close-control" label="Dismiss"></close-control-box>
      </banner-box>
    `);

    let closed = false;
    element.addEventListener('close', () => (closed = true));

    const control = element.querySelector('close-control-box');
    control?.shadowRoot?.querySelector('button')?.click();

    expect(closed).to.be.true;
  });

  it('places details content below the main message', async () => {
    const element = await fixture<Banner>(html`
      <banner-box>
        <p>Deployment scheduled</p>
        <details slot="details">
          <summary>Window</summary>
          <p>Saturday 01:00 - 03:00 UTC</p>
        </details>
      </banner-box>
    `);

    await element.updateComplete;
    const detailsContainer = element.shadowRoot?.querySelector('.banner-box__details');
    expect(detailsContainer).to.exist;
  });
});
