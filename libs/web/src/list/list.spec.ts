import { fixture, html } from '@open-wc/testing';
import './list';

describe('list-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('list-box')]);
  });

  it('renders ordered list when ordered attribute present', async () => {
    const element = await fixture<HTMLElement>(html`
      <list-box ordered>
        <li>One</li>
      </list-box>
    `);
    const list = element.shadowRoot?.querySelector('ol');
    expect(list).to.exist;
  });
});
