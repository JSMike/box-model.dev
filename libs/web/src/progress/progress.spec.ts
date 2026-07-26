import { fixture, html } from '@open-wc/testing';
import './progress';
import type { Progress } from './progress';

describe('progress-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('progress-box')]);
  });

  it('clamps value between 0 and max', async () => {
    const element = await fixture<Progress>(
      html`<progress-box .value=${150} .max=${100}></progress-box>`
    );
    const indicator = element.shadowRoot?.querySelector(
      '.progress-box__indicator'
    ) as HTMLElement;
    expect(indicator.getAttribute('style')).to.contain('width: 100%');
  });

  it('names the internal progressbar', async () => {
    const element = await fixture<Progress>(
      html`<progress-box label="File upload progress"></progress-box>`
    );
    const progressbar = element.shadowRoot?.querySelector('[role="progressbar"]');

    expect(progressbar?.getAttribute('aria-label')).to.equal('File upload progress');
  });
});
