import { fixture, html } from '@open-wc/testing';
import type { Tooltip } from './tooltip';
import './tooltip';

describe('tooltip-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('tooltip-box')]);
  });

  it('associates trigger with tooltip content', async () => {
    const element = await fixture<HTMLElement>(html`
      <tooltip-box>
        <span slot="trigger">Target</span>
        <span>Details</span>
      </tooltip-box>
    `);

    const trigger = element.querySelector('span[slot="trigger"]');
    const tooltip = element.shadowRoot?.querySelector('.tooltip-box__content');

    expect(trigger?.getAttribute('aria-describedby')).to.equal(tooltip?.id ?? undefined);
  });

  it('renders fallback trigger when none is provided', async () => {
    const element = await fixture<HTMLElement>(html`<tooltip-box>Copy shown on hover.</tooltip-box>`);
    const fallback = element.shadowRoot?.querySelector('#tooltipFallback');
    expect(fallback).to.exist;
  });

  it('reflects every placement on the tooltip surface', async () => {
    const element = await fixture<Tooltip>(html`
      <tooltip-box>Copy shown on hover.</tooltip-box>
    `);
    const tooltip = element.shadowRoot?.querySelector<HTMLElement>('.tooltip-box__content');

    for (const placement of ['top', 'bottom', 'left', 'right']) {
      element.defaultPlacement = placement as Tooltip['defaultPlacement'];
      await element.updateComplete;
      expect(tooltip?.dataset['placement']).to.equal(placement);
    }
  });
});
