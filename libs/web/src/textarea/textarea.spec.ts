import { expect, fixture, html } from '@open-wc/testing';
import './textarea';

describe('textarea-box', () => {
  it('renders slotted textarea content', async () => {
    const element = await fixture<HTMLElement>(html`
      <textarea-box>
        <textarea>Initial content</textarea>
      </textarea-box>
    `);
    const textarea = element.querySelector('textarea');
    expect(textarea?.value).to.equal('Initial content');
  });
});
