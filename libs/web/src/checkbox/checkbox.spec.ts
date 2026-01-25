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
});
