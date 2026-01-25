import { fixture, html } from '@open-wc/testing';
import './button';
import type { Button } from './button';

describe('button-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('button-box')]);
  });

  it('renders slotted content', async () => {
    const element = await fixture<HTMLElement>(html`<button-box>Submit</button-box>`);
    expect(element.textContent?.trim()).to.equal('Submit');
  });

  it('reflects the variant attribute from markup', async () => {
    const element = await fixture<HTMLElement>(html`<button-box variant="secondary"></button-box>`);
    expect(element.getAttribute('variant')).to.equal('secondary');
  });

  it('updates size attribute when property changes', async () => {
    const element = await fixture<Button>(html`<button-box></button-box>`);
    element.size = 'large';
    await element.updateComplete;
    expect(element.getAttribute('size')).to.equal('large');
  });
});
