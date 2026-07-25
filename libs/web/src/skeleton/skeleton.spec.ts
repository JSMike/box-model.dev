import { fixture, html } from '@open-wc/testing';
import './skeleton';
import type { Skeleton } from './skeleton';

describe('skeleton-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('skeleton-box')]);
  });

  it('applies custom width and height', async () => {
    const element = await fixture<Skeleton>(
      html`<skeleton-box .width=${'200px'} .height=${'20px'}></skeleton-box>`
    );
    await element.updateComplete;
    expect(getComputedStyle(element).width).to.equal('200px');
    expect(getComputedStyle(element).height).to.equal('20px');
  });
});
