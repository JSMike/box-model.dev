import { css, html } from 'react-strict-dom';
import {
  colorBorderTokens,
  colorTextTokens,
  tableTokens,
  spaceTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export type ZebraMode = 'none' | 'surface' | 'border' | 'padding' | 'content' | 'margin';

export interface TableProps {
  columns: ReadonlyArray<string>;
  rows: ReadonlyArray<ReadonlyArray<React.ReactNode>>;
  footer?: string;
  zebra?: ZebraMode;
}

const styles = css.create({
  wrapper: {
    backgroundColor: tableTokens.headerBackground,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: tableTokens.borderWidth,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.subtle ?? tableTokens.rowBorder,
    borderRadius: 0,
  },
  table: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeSm,
    color: colorTextTokens.primary,
  },
  rowBase: {
    display: 'flex',
    width: '100%',
  },
  cellBase: {
    flex: 1,
    minWidth: 0,
  },
  headerCell: {
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    textAlign: 'left',
    backgroundColor: tableTokens.headerBackground,
    color: tableTokens.headerText,
    borderBottomWidth: tableTokens.borderWidth,
    borderBottomStyle: 'solid',
    borderBottomColor: tableTokens.rowBorder,
  },
  cell: {
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    borderBottomWidth: tableTokens.borderWidth,
    borderBottomStyle: 'solid',
    borderBottomColor: tableTokens.rowBorder,
  },
  zebraRow: {
    backgroundColor: tableTokens.rowZebra,
    ':hover': {
      backgroundColor: tableTokens.rowHover,
    },
  },
  footerCell: {
    paddingTop: spaceTokens.insetMd,
    paddingBottom: spaceTokens.insetMd,
    paddingLeft: spaceTokens.insetLg,
    paddingRight: spaceTokens.insetLg,
    color: colorTextTokens.secondary,
  },
});

export function Table({ columns, rows, footer, zebra = 'none' }: TableProps) {
  const zebraEnabled = zebra !== 'none';

  return (
    <html.div style={styles.wrapper}>
      <html.div style={styles.table} role="table">
        <html.div role="rowgroup">
          <html.div style={styles.rowBase} role="row">
            {columns.map((column) => (
              <html.div
                key={column}
                role="columnheader"
                style={[styles.cellBase, styles.headerCell]}
              >
                {column}
              </html.div>
            ))}
          </html.div>
        </html.div>
        <html.div role="rowgroup">
          {rows.map((cells, rowIndex) => {
            const applyZebra = zebraEnabled && rowIndex % 2 === 1;
            return (
              <html.div
                key={rowIndex}
                role="row"
                style={[styles.rowBase, applyZebra && styles.zebraRow]}
              >
                {cells.map((cell, cellIndex) => (
                  <html.div
                    key={`${rowIndex}-${cellIndex}`}
                    role="cell"
                    style={[styles.cellBase, styles.cell]}
                  >
                    {cell}
                  </html.div>
                ))}
              </html.div>
            );
          })}
        </html.div>
        {footer ? (
          <html.div role="rowgroup">
            <html.div role="row" style={styles.rowBase}>
              <html.div role="cell" style={[styles.cellBase, styles.footerCell]}>
                {footer}
              </html.div>
            </html.div>
          </html.div>
        ) : null}
      </html.div>
    </html.div>
  );
}

export default Table;
