import { fixture, html } from '@open-wc/testing';
import { Progress } from './progress';

describe('progress-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('progress-box')]);
  });

  it('clamps value between 0 and max', async () => {
    const element = await fixture<Progress>(html`<progress-box .value=${150} .max=${100}></progress-box>`);
    const indicator = element.shadowRoot?.querySelector('.progress-box__indicator') as HTMLElement;
    expect(indicator.getAttribute('style')).to.contain('width: 100%');
  });
});
