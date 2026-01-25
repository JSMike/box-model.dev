import { fixture, html } from '@open-wc/testing';
import './status-icon';

describe('status-icon-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('status-icon-box')]);
  });

  it('renders preset glyph for success', async () => {
    const element = await fixture<HTMLElement>(html`<status-icon-box variant="success"></status-icon-box>`);
    const glyph = element.shadowRoot?.textContent?.trim();
    expect(glyph).to.equal('✓');
  });

  it('renders slot content when custom variant is used', async () => {
    const element = await fixture<HTMLElement>(html`
      <status-icon-box variant="custom">★</status-icon-box>
    `);
    const glyph = element.textContent?.trim();
    expect(glyph).to.equal('★');
  });
});
