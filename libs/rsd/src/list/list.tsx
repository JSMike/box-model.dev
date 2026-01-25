import { css, html } from 'react-strict-dom';
import { listTokens, typographyTokens } from '../tokens/tokens.stylex';

export interface ListProps {
  ordered?: boolean;
  items?: ReadonlyArray<React.ReactNode>;
  children?: React.ReactNode;
}

const styles = css.create({
  list: {
    backgroundColor: listTokens.background,
    borderWidth: listTokens.borderWidth,
    borderStyle: 'solid',
    borderColor: listTokens.border,
    borderRadius: 0,
    paddingTop: listTokens.padding,
    paddingBottom: listTokens.padding,
    paddingLeft: listTokens.padding,
    paddingRight: listTokens.padding,
    display: 'flex',
    flexDirection: 'column',
    gap: listTokens.gap,
    marginTop: 0,
    marginBottom: 0,
    color: listTokens.markerColor,
    fontFamily: typographyTokens.fontFamilySans,
    fontSize: typographyTokens.fontSizeMd,
    lineHeight: typographyTokens.lineHeightSnug,
  },
  item: {
    color: listTokens.markerColor,
  },
});

export function List({ ordered = false, items, children }: ListProps) {
  const content =
    items?.map((item, index) => (
      <html.li key={index} style={styles.item}>
        {item}
      </html.li>
    )) ?? children;

  if (ordered) {
    return (
      <html.ol style={styles.list}>
        {content}
      </html.ol>
    );
  }

  return (
    <html.ul style={styles.list}>
      {content}
    </html.ul>
  );
}

export default List;
