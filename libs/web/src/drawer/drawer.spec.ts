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

    let closed = false;
    element.addEventListener('close', () => (closed = true));
    const control = element.querySelector('close-control-box');
    control?.shadowRoot?.querySelector('button')?.click();

    expect(closed).to.be.true;
    expect(element.hasAttribute('hidden')).to.be.true;
  });

  it('reflects placement attribute', async () => {
    const element = await fixture<Drawer>(html`
      <drawer-box placement="left"></drawer-box>
    `);

    expect(element.placement).to.equal('left');
    expect(element.getAttribute('placement')).to.equal('left');
  });

  it('allows backdrop cancel by default', async () => {
    const element = await fixture<Drawer>(html`<drawer-box open></drawer-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });
    dialog?.dispatchEvent(cancelEvent);
    expect(cancelEvent.defaultPrevented).to.be.false;
  });

  it('prevents backdrop cancel when no-backdrop-close is set', async () => {
    const element = await fixture<Drawer>(html`<drawer-box open no-backdrop-close></drawer-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });
    dialog?.dispatchEvent(cancelEvent);
    expect(cancelEvent.defaultPrevented).to.be.true;
  });
});
