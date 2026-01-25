import { fixture, html } from '@open-wc/testing';
import './close-control';

describe('close-control-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('close-control-box')]);
  });

  it('emits close event when clicked', async () => {
    const element = await fixture<CloseControl & HTMLElement>(html`
      <close-control-box label="Dismiss"></close-control-box>
    `);

    let dispatched = false;
    element.addEventListener('close', () => {
      dispatched = true;
    });

    const button = element.shadowRoot?.querySelector('button');
    button?.click();

    expect(dispatched).to.be.true;
  });
});

type CloseControl = HTMLElement & { label: string };
