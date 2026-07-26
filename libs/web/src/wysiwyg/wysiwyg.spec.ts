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

  it('emits one normalized input event for a textarea edit', async () => {
    const element = await fixture<HTMLElement>(html`
      <wysiwyg-box>
        <textarea></textarea>
      </wysiwyg-box>
    `);
    const textarea = element.querySelector('textarea') as HTMLTextAreaElement;
    const events: Event[] = [];
    element.addEventListener('input', (event) => events.push(event));

    textarea.value = 'Updated';
    textarea.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));

    expect(events).to.have.length(1);
    expect(events[0].target).to.equal(element);
    expect(events[0].bubbles).to.be.true;
    expect(events[0].composed).to.be.true;
  });

  it('gives every toolbar action a meaningful accessible name', async () => {
    const element = await fixture<HTMLElement>(html`
      <wysiwyg-box>
        <textarea></textarea>
      </wysiwyg-box>
    `);
    const buttons = Array.from(element.shadowRoot?.querySelectorAll('button') ?? []);

    expect(buttons).to.have.length(11);
    for (const button of buttons) {
      expect(button.getAttribute('aria-label')).to.equal(button.getAttribute('title'));
    }
  });
});
