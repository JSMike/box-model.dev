import { fixture, html } from '@open-wc/testing';
import './input';

describe('input-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('input-box')]);
  });

  it('passes attributes through to the slotted input', async () => {
    const element = await fixture<HTMLInputElement>(html`
      <input-box fullwidth>
        <input id="target" value="hello" />
      </input-box>
    `);
    const input = element.querySelector<HTMLInputElement>('#target');
    expect(input).to.exist;
    expect(input?.value).to.equal('hello');
  });
});
