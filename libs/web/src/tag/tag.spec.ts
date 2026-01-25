import { fixture, html } from '@open-wc/testing';
import './tag';

describe('tag-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('tag-box')]);
  });

  it('applies variant attribute', async () => {
    const element = await fixture<HTMLElement>(html`
      <tag-box variant="success">
        <span>Done</span>
      </tag-box>
    `);
    expect(element.getAttribute('variant')).to.equal('success');
  });
});
