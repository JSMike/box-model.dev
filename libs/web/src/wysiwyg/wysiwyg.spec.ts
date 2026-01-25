import { expect, fixture, html } from '@open-wc/testing';
import './wysiwyg';

describe('wysiwyg-box', () => {
  it('wraps selected text in bold markdown', async () => {
    const element = await fixture<HTMLElement>(html`
      <wysiwyg-box>
        <textarea>text</textarea>
      </wysiwyg-box>
    `);
    const textarea = element.querySelector('textarea') as HTMLTextAreaElement;
    textarea.setSelectionRange(0, textarea.value.length);
    const boldButton = element.shadowRoot?.querySelector('button[data-action="bold"]') as HTMLButtonElement;
    boldButton.click();
    expect(textarea.value).to.equal('**text**');
  });

  it('inserts table markdown snippet', async () => {
    const element = await fixture<HTMLElement>(html`
      <wysiwyg-box>
        <textarea></textarea>
      </wysiwyg-box>
    `);
    const tableButton = element.shadowRoot?.querySelector(
      'button[data-action="table"]'
    ) as HTMLButtonElement;
    tableButton.click();
    const textarea = element.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea.value).to.contain('| Column 1 | Column 2 |');
  });
});
