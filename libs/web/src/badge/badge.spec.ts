import { fixture, html } from '@open-wc/testing';
import './badge';

describe('badge-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('badge-box')]);
  });

  it('renders badge content', async () => {
    const element = await fixture<HTMLElement>(html`
      <badge-box>
        <span>Badge</span>
      </badge-box>
    `);
    expect(element.textContent?.trim()).to.equal('Badge');
  });
});
