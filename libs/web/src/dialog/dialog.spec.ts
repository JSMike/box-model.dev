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

    let closed = false;
    element.addEventListener('close', () => {
      closed = true;
    });

    const closeButton = element.querySelector('close-control-box');
    const buttonEl = closeButton?.shadowRoot?.querySelector('button');
    buttonEl?.click();

    expect(closed).to.be.true;
    expect(element.hasAttribute('hidden')).to.be.true;
  });

  it('allows backdrop cancel by default', async () => {
    const element = await fixture<Dialog>(html`<dialog-box open></dialog-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });
    dialog?.dispatchEvent(cancelEvent);
    expect(cancelEvent.defaultPrevented).to.be.false;
  });

  it('prevents backdrop cancel when no-backdrop-close is set', async () => {
    const element = await fixture<Dialog>(html`<dialog-box open no-backdrop-close></dialog-box>`);
    const dialog = element.shadowRoot?.querySelector('dialog');
    const cancelEvent = new Event('cancel', { cancelable: true });
    dialog?.dispatchEvent(cancelEvent);
    expect(cancelEvent.defaultPrevented).to.be.true;
  });
});
