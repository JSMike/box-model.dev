import { expect, fixture, html } from '@open-wc/testing';
import './toolbar';

describe('toolbar-box', () => {
  it('renders slotted controls', async () => {
    const element = await fixture<HTMLElement>(html`
      <toolbar-box>
        <button type="button">Bold</button>
      </toolbar-box>
    `);
    const button = element.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements({ flatten: true })[0] as HTMLButtonElement;
    expect(button?.textContent?.trim()).to.equal('Bold');
  });
});
