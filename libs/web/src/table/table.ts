import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { slotStyleService } from '../common/slot-style';
import hostStyles from './table.host.scss?inline';
import slotStyles from './table.slot.scss?inline';

export const TableBox = 'table-box';

/**
 * Styled host for tabular content.
 * @slot - Default slot content.
 */
@customElement(TableBox)
export class Table extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Alternate row background colors. */
  @property({ reflect: true })
  public zebra?: 'surface' | 'border' | 'padding' | 'content' | 'margin';

  @query('slot') private contentSlot!: HTMLSlotElement;
  private styledTables = new Set<HTMLTableElement>();

  override connectedCallback() {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: TableBox,
    });
  }

  override firstUpdated(): void {
    this.applyTableStyling();
  }

  private applyTableStyling() {
    const assigned = this.contentSlot?.assignedElements({ flatten: true }) ?? [];
    const tables = assigned.filter((el): el is HTMLTableElement => el instanceof HTMLTableElement);

    // remove attribute from previously styled tables no longer present
    for (const table of Array.from(this.styledTables)) {
      if (!tables.includes(table)) {
        table.removeAttribute('data-table-box');
        this.styledTables.delete(table);
      }
    }

    tables.forEach((table) => {
      table.setAttribute('data-table-box', '');
      this.styledTables.add(table);
    });
  }

  private handleSlotChange() {
    this.applyTableStyling();
  }

  override render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}
