import { fixture, html } from '@open-wc/testing';
import './checkbox';

describe('checkbox-group-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('checkbox-group-box')]);
  });

  it('renders legend text', async () => {
    const element = await fixture<HTMLElement>(html`
      <checkbox-group-box legend="Options">
        <label><input type="checkbox" value="one" />One</label>
      </checkbox-group-box>
    `);

    const legend = element.shadowRoot?.querySelector('legend');
    expect(legend?.textContent).to.contain('Options');
  });

  it('shows a slot-only legend', async () => {
    const element = await fixture<HTMLElement>(html`
      <checkbox-group-box>
        <span slot="legend">Notification preferences</span>
        <label><input type="checkbox" value="email" />Email</label>
      </checkbox-group-box>
    `);
    await (element as HTMLElement & { updateComplete: Promise<unknown> }).updateComplete;

    const legend = element.shadowRoot?.querySelector('legend');
    expect(legend?.hidden).to.be.false;
    expect(legend?.querySelector('slot')?.assignedElements()).to.have.length(1);
  });
});
