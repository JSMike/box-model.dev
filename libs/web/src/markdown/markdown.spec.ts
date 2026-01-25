import { expect, fixture, html } from '@open-wc/testing';
import './markdown';
import type { Markdown } from './markdown';

describe('markdown-box', () => {
  beforeEach(async () => {
    await customElements.whenDefined('markdown-box');
  });

  const renderMarkdown = async (content: string) => {
    const element = await fixture<Markdown>(html`<markdown-box>${content}</markdown-box>`);
    await element.updateComplete;
    return element;
  };

  it('renders markdown content inside the shadow DOM', async () => {
    const element = await renderMarkdown('# Title');
    const heading = element.shadowRoot?.querySelector('h1');
    expect(heading?.textContent).to.equal('Title');
  });

  it('wraps links with link-box and forwards variant attributes', async () => {
    const element = await renderMarkdown(
      `[Docs](https://example.com){variant="secondary" size="lg"}`
    );
    const linkBox = element.shadowRoot?.querySelector('link-box');
    expect(linkBox).to.exist;
    expect(linkBox?.getAttribute('variant')).to.equal('secondary');
    expect(linkBox?.getAttribute('size')).to.equal('lg');
    const anchor = linkBox?.querySelector('a');
    expect(anchor?.getAttribute('href')).to.equal('https://example.com');
  });

  it('renders button-styled links when type="button"', async () => {
    const element = await renderMarkdown(
      `[CTA](https://example.com){type="button" variant="tertiary" size="large"}`
    );
    const buttonBox = element.shadowRoot?.querySelector('button-box');
    expect(buttonBox).to.exist;
    expect(buttonBox?.getAttribute('variant')).to.equal('tertiary');
    expect(buttonBox?.getAttribute('size')).to.equal('large');
    const anchor = buttonBox?.querySelector('a');
    expect(anchor?.getAttribute('href')).to.equal('https://example.com');
  });

  it('attempts to render custom alert containers', async () => {
    const element = await renderMarkdown(
      [
        ':::alert variant="warning"',
        'Content inside alert',
        ':::',
      ].join('\n')
    );
    const alertBox = element.shadowRoot?.querySelector('alert-box');
    expect(alertBox).to.exist;
    expect(alertBox?.getAttribute('variant')).to.equal('warning');
  });

  it('renders divider containers', async () => {
    const element = await renderMarkdown([':::divider', ':::', ''].join('\n'));
    const divider = element.shadowRoot?.querySelector('divider-box');
    expect(divider).to.exist;
  });

  it('wraps multiple cards inside columns container', async () => {
    const element = await renderMarkdown(
      [
        '::::columns gap="lg"',
        ':::card',
        'Card inside columns',
        ':::',
        ':::card',
        'Another card',
        ':::',
        '::::',
      ].join('\n')
    );
    const columns = element.shadowRoot?.querySelector('columns-box');
    expect(columns).to.exist;
    expect(columns?.getAttribute('gap')).to.equal('lg');
    const cards = columns?.querySelectorAll('card-box');
    expect(cards?.length).to.equal(2);
  });

  it('updates rendered content when the slot text changes', async () => {
    const element = await fixture<Markdown>(html`<markdown-box>initial text</markdown-box>`);
    await element.updateComplete;
    const textNode = element.childNodes[0];
    textNode.textContent = 'updated text';
    await new Promise((resolve) => setTimeout(resolve, 0));
    await element.updateComplete;
    const content = element.shadowRoot?.querySelector('.markdown-box__content');
    expect(content?.textContent?.trim()).to.equal('updated text');
  });
});
