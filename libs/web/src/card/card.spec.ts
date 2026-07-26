import { fixture, html } from '@open-wc/testing';
import './card';
import '../close-control';

describe('card-box', () => {
  beforeEach(async () => {
    await Promise.all([
      customElements.whenDefined('card-box'),
      customElements.whenDefined('close-control-box'),
    ]);
  });

  it('renders named header, footer, and actions slots around body content', async () => {
    const element = await fixture<HTMLElement>(html`
      <card-box>
        <div slot="header">Title</div>
        <p>Body</p>
        <div slot="footer">Footer</div>
        <div slot="actions"><button>CTA</button></div>
        <close-control-box
          slot="close-control"
          label="Dismiss card"
        ></close-control-box>
      </card-box>
    `);

    const header = element.querySelector('[slot="header"]');
    const footer = element.querySelector('[slot="footer"]');
    const body = element.querySelector('p');
    const actions = element.querySelector('[slot="actions"]');
    const close = element.querySelector('close-control-box');

    expect(header?.textContent).to.equal('Title');
    expect(body?.textContent).to.equal('Body');
    expect(footer?.textContent).to.equal('Footer');
    expect(actions?.textContent).to.equal('CTA');
    expect(close).to.exist;

    const closeEvents: Event[] = [];
    element.addEventListener('close', (event) => closeEvents.push(event));
    close?.shadowRoot?.querySelector('button')?.click();
    expect(closeEvents).to.have.length(1);
    expect(closeEvents[0].target).to.equal(element);
  });
});
