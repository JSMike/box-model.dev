import { fixture, html } from '@open-wc/testing';
import './stat';
import type { Stat } from './stat';

describe('stat-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('stat-box')]);
  });

  it('renders value and title slot', async () => {
    const element = await fixture<Stat>(html`
      <stat-box .value=${'24'} trend="down" .delta=${'-4%'}>
        <span slot="title">Incidents</span>
      </stat-box>
    `);

    await element.updateComplete;
    const labelSlot = element.shadowRoot?.querySelector(
      'slot[name="title"]'
    ) as HTMLSlotElement | null;
    const value = element.shadowRoot?.querySelector('.stat-box__value');
    const delta = element.shadowRoot?.querySelector('.stat-box__delta');

    const [assignedLabel] = labelSlot?.assignedNodes() ?? [];

    expect(assignedLabel?.textContent?.trim()).to.equal('Incidents');
    expect(value?.textContent).to.equal('24');
    expect(delta?.textContent?.trim()).to.equal('-4%');
  });
});
