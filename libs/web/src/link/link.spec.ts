import { fixture, html } from '@open-wc/testing';
import './link';
import type { Link } from './link';

describe('link-box', () => {
  beforeEach(async () => {
    await customElements.whenDefined('link-box');
  });

  it('renders slotted content', async () => {
    const element = await fixture<HTMLElement>(
      html`<link-box><a href="#">Read more</a></link-box>`
    );
    expect(element.textContent?.trim()).to.equal('Read more');
  });

  it('reflects the variant attribute from markup', async () => {
    const element = await fixture<Link>(html`<link-box variant="secondary"></link-box>`);
    expect(element.getAttribute('variant')).to.equal('secondary');
    expect(element.variant).to.equal('secondary');
  });

  it('updates the size attribute when the property changes', async () => {
    const element = await fixture<Link>(html`<link-box></link-box>`);
    element.size = 'lg';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('lg');
  });
});
