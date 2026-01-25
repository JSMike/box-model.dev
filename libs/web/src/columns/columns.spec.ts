import { expect, fixture, html } from '@open-wc/testing';
import './columns';
import type { Columns } from './columns';

describe('columns-box', () => {
  beforeEach(async () => {
    await customElements.whenDefined('columns-box');
  });

  it('renders slotted content in a grid', async () => {
    const element = await fixture<Columns>(html`<columns-box><p>Item</p></columns-box>`);
    const grid = element.shadowRoot?.querySelector('.columns-box__grid');
    expect(grid).to.exist;
  });

  it('reflects gap attribute changes', async () => {
    const element = await fixture<Columns>(html`<columns-box gap="lg"></columns-box>`);
    expect(element.getAttribute('gap')).to.equal('lg');
  });

  it('applies custom min width', async () => {
    const element = await fixture<Columns>(
      html`<columns-box min-width="20rem"></columns-box>`
    );
    const wrapper = element.shadowRoot?.querySelector('.columns-box__grid') as HTMLElement;
    expect(wrapper?.getAttribute('style')).to.contain('20rem');
  });
});
