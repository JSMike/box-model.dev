import { fixture, html } from '@open-wc/testing';
import './divider';

describe('divider-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('divider-box')]);
  });

  it('reflects orientation attribute', async () => {
    const element = await fixture<HTMLElement>(html`<divider-box orientation="vertical"></divider-box>`);
    expect(element.getAttribute('orientation')).to.equal('vertical');
  });
});
