import { fixture, html } from '@open-wc/testing';
import './select';

describe('select-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('select-box')]);
  });

  it('renders slotted select content', async () => {
    const element = await fixture<HTMLElement>(html`
      <select-box>
        <select>
          <option value="one">One</option>
        </select>
      </select-box>
    `);

    const select = element.querySelector('select');
    expect(select).to.exist;
    expect(select?.value).to.equal('one');
  });
});
