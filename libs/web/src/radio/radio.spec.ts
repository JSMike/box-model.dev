import { fixture, html } from '@open-wc/testing';
import './radio';

describe('radio-group-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('radio-group-box')]);
  });

  it('renders legend text', async () => {
    const element = await fixture<HTMLElement>(html`
      <radio-group-box legend="Choices">
        <label><input type="radio" name="choice" value="one" />One</label>
      </radio-group-box>
    `);

    const legend = element.shadowRoot?.querySelector('legend');
    expect(legend?.textContent).to.contain('Choices');
  });
});
