import { fixture, html } from '@open-wc/testing';
import './drawer';
import type { Drawer } from './drawer';
import './drawer-header';
import '../close-control';

describe('drawer-box', () => {
  beforeEach(async () => {
    await Promise.all([
      customElements.whenDefined('drawer-box'),
      customElements.whenDefined('close-control-box'),
    ]);
  });

  it('uses native dialog element', async () => {
    const element = await fixture<Drawer>(html`
      <drawer-box open>
        <p>Drawer content</p>
      </drawer-box>
    `);

    const dialog = element.shadowRoot?.querySelector('dialog');
    expect(dialog).to.exist;
    expect(dialog?.open).to.be.true;
  });
  it('emits close when close control triggered', async () => {
    const element = await fixture<Drawer>(html`
      <drawer-box open>
        <p>Drawer content</p>
        <close-control-box slot="close-control" label="Close drawer"></close-control-box>
      </drawer-box>
    `);

    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));
    const control = element.querySelector('close-control-box');
    control?.shadowRoot?.querySelector('button')?.click();

    expect(closeEvents).to.have.length(1);
    expect(closeEvents[0].target).to.equal(element);
    expect(element.hasAttribute('hidden')).to.be.true;
  });

  it('reflects placement attribute', async () => {
    const element = await fixture<Drawer>(html`
      <drawer-box placement="left"></drawer-box>
    `);

    expect(element.placement).to.equal('left');
    expect(element.getAttribute('placement')).to.equal('left');
  });

  it('allows Escape cancellation even when backdrop closing is disabled', async () => {
    for (const noBackdropClose of [false, true]) {
      const element = await fixture<Drawer>(html`
        <drawer-box open ?no-backdrop-close=${noBackdropClose}></drawer-box>
      `);
      const dialog = element.shadowRoot?.querySelector('dialog');
      const cancelEvent = new Event('cancel', { cancelable: true });
      dialog?.dispatchEvent(cancelEvent);
      expect(cancelEvent.defaultPrevented).to.be.false;
    }
  });

  it('closes on a backdrop click by default', async () => {
    const element = await fixture<Drawer>(html`<drawer-box open></drawer-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');
    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));

    dialog?.click();

    expect(element.open).to.be.false;
    expect(closeEvents).to.have.length(1);
  });

  it('keeps the drawer open on backdrop clicks when no-backdrop-close is set', async () => {
    const element = await fixture<Drawer>(html`<drawer-box open no-backdrop-close></drawer-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');

    dialog?.click();

    expect(element.open).to.be.true;
  });

  it('does not treat panel clicks as backdrop clicks', async () => {
    const element = await fixture<Drawer>(html`<drawer-box open><p>Content</p></drawer-box>`);

    element.querySelector('p')?.click();

    expect(element.open).to.be.true;
  });
});
