import { fixture, html } from '@open-wc/testing';
import './table';
import type { Table } from './table';

describe('table-box', () => {
  beforeEach(async () => {
    await Promise.all([customElements.whenDefined('table-box')]);
  });

  it('applies styling attribute to slotted table', async () => {
    const element = await fixture<Table>(html`
      <table-box>
        <table>
          <tbody><tr><td>Cell</td></tr></tbody>
        </table>
      </table-box>
    `);
    await element.updateComplete;
    const table = element.querySelector('table');
    expect(table).to.exist;
    expect(table?.getAttribute('data-table-box')).to.equal('');
  });

  it('reflects zebra attribute values', async () => {
    const element = await fixture<Table>(html`
      <table-box zebra="padding">
        <table>
          <tbody><tr><td>Cell</td></tr></tbody>
        </table>
      </table-box>
    `);

    expect(element.getAttribute('zebra')).to.equal('padding');
    element.zebra = 'content';
    await element.updateComplete;
    expect(element.getAttribute('zebra')).to.equal('content');
    element.zebra = undefined;
    await element.updateComplete;
    expect(element.hasAttribute('zebra')).to.be.false;
  });
});
