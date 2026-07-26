import { fixture, html } from '@open-wc/testing';
import './dialog';
import type { Dialog } from './dialog';
import './dialog-header';
import './dialog-footer';
import '../close-control';

describe('dialog-box', () => {
  beforeEach(async () => {
    await Promise.all([
      customElements.whenDefined('dialog-box'),
      customElements.whenDefined('close-control-box'),
    ]);
  });

  it('uses native dialog element', async () => {
    const element = await fixture<Dialog>(html`
      <dialog-box open>
        <p>Content</p>
      </dialog-box>
    `);

    const dialog = element.shadowRoot?.querySelector('dialog');
    expect(dialog).to.exist;
    expect(dialog?.open).to.be.true;
  });

  it('emits close on close control interaction', async () => {
    const element = await fixture<Dialog>(html`
      <dialog-box open>
        <p>Content</p>
        <close-control-box slot="close-control" label="Close"></close-control-box>
      </dialog-box>
    `);

    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));

    const closeButton = element.querySelector('close-control-box');
    const buttonEl = closeButton?.shadowRoot?.querySelector('button');
    buttonEl?.click();

    expect(closeEvents).to.have.length(1);
    expect(closeEvents[0].target).to.equal(element);
    expect(element.hasAttribute('hidden')).to.be.true;
  });

  it('allows Escape cancellation even when backdrop closing is disabled', async () => {
    for (const noBackdropClose of [false, true]) {
      const element = await fixture<Dialog>(html`
        <dialog-box open ?no-backdrop-close=${noBackdropClose}></dialog-box>
      `);
      const dialog = element.shadowRoot?.querySelector('dialog');
      const cancelEvent = new Event('cancel', { cancelable: true });
      dialog?.dispatchEvent(cancelEvent);
      expect(cancelEvent.defaultPrevented).to.be.false;
    }
  });

  it('closes on a backdrop click by default', async () => {
    const element = await fixture<Dialog>(html`<dialog-box open></dialog-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');
    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));

    dialog?.click();

    expect(element.open).to.be.false;
    expect(closeEvents).to.have.length(1);
  });

  it('keeps the dialog open on backdrop clicks when no-backdrop-close is set', async () => {
    const element = await fixture<Dialog>(html`<dialog-box open no-backdrop-close></dialog-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');

    dialog?.click();

    expect(element.open).to.be.true;
  });

  it('does not treat content clicks as backdrop clicks', async () => {
    const element = await fixture<Dialog>(html`<dialog-box open><p>Content</p></dialog-box>`);

    element.querySelector('p')?.click();

    expect(element.open).to.be.true;
  });
});
