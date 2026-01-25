import React from 'react';
import { css, html } from 'react-strict-dom';
import { Divider } from '@box-model/rsd/divider';
import {
  colorBackgroundTokens,
  colorBorderTokens,
  colorTextTokens,
  sizeTokens,
  spaceTokens,
  typographyRolesTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'code'; language?: string; content: string }
  | { type: 'divider' }
  | { type: 'image'; src: string; alt?: string };

const styles = css.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackLg,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.primary,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  heading: {
    marginTop: spaceTokens.stackLg,
    marginBottom: spaceTokens.stackBase,
    fontFamily: typographyRolesTokens.headingH4FontFamily,
    fontSize: typographyRolesTokens.headingH4FontSize,
    fontWeight: typographyRolesTokens.headingH4FontWeight,
    lineHeight: typographyRolesTokens.headingH4LineHeight,
    color: colorTextTokens.primary,
  },
  list: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: spaceTokens.scale300,
  },
  listItem: {
    marginBottom: spaceTokens.stackSm,
    color: colorTextTokens.primary,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  inlineCode: {
    fontFamily: typographyRolesTokens.codeFontFamily,
    fontSize: typographyRolesTokens.codeFontSize,
    backgroundColor: colorBackgroundTokens.surface,
    color: colorTextTokens.primary,
    paddingLeft: spaceTokens.scale050,
    paddingRight: spaceTokens.scale050,
  },
  bold: {
    fontWeight: typographyTokens.fontWeightBold,
  },
  italic: {
    fontStyle: 'italic',
  },
  codeBlock: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: typographyRolesTokens.codeFontFamily,
    fontSize: typographyRolesTokens.codeFontSize,
    backgroundColor: colorBackgroundTokens.surface,
    color: colorTextTokens.primary,
    paddingTop: spaceTokens.scale150,
    paddingBottom: spaceTokens.scale150,
    paddingLeft: spaceTokens.scale150,
    paddingRight: spaceTokens.scale150,
  },
  codeBlockContent: {
  },
  blockquote: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: spaceTokens.scale150,
    paddingBottom: spaceTokens.scale150,
    paddingLeft: spaceTokens.scale300,
    paddingRight: spaceTokens.scale150,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.subtle,
    backgroundColor: colorBackgroundTokens.surface,
    color: colorTextTokens.primary,
  },
  blockquoteText: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.primary,
  },
  cite: {
    display: 'block',
    textAlign: 'right',
    fontStyle: 'italic',
    fontSize: typographyTokens.fontSizeSm,
    color: colorTextTokens.secondary,
    marginTop: spaceTokens.scale100,
  },
  image: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const isDividerLine = (line: string) => line.trim() === ':::divider';
const isContainerClose = (line: string) => line.trim() === ':::';

const parseImage = (line: string) => {
  const srcMatch = line.match(/src=["']([^"']+)["']/);
  if (!srcMatch) return null;
  const altMatch = line.match(/alt=["']([^"']+)["']/);
  return {
    src: srcMatch[1],
    alt: altMatch?.[1],
  };
};

const parseMarkdown = (content: string): MarkdownBlock[] => {
  const blocks: MarkdownBlock[] = [];
  const lines = content.split('\n');

  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let blockquote: string[] = [];
  let codeBlock: { language?: string; lines: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list?.items.length) {
      blocks.push({ type: 'list', ordered: list.ordered, items: list.items });
    }
    list = null;
  };

  const flushBlockquote = () => {
    if (blockquote.length) {
      blocks.push({ type: 'blockquote', lines: [...blockquote] });
      blockquote = [];
    }
  };

  for (const line of lines) {
    if (codeBlock) {
      if (line.trim().startsWith('```')) {
        blocks.push({
          type: 'code',
          language: codeBlock.language,
          content: codeBlock.lines.join('\n'),
        });
        codeBlock = null;
        continue;
      }
      codeBlock.lines.push(line);
      continue;
    }

    if (isDividerLine(line)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({ type: 'divider' });
      continue;
    }

    if (isContainerClose(line)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      continue;
    }

    if (line.trim().startsWith('```')) {
      flushParagraph();
      flushList();
      flushBlockquote();
      codeBlock = {
        language: line.trim().slice(3).trim() || undefined,
        lines: [],
      };
      continue;
    }

    const trimmed = line.trim();

    if (trimmed.startsWith('>')) {
      flushParagraph();
      flushList();
      blockquote.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }

    if (!trimmed && blockquote.length) {
      flushBlockquote();
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      flushBlockquote();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(orderedMatch[2]);
      continue;
    }

    const unorderedMatch = trimmed.match(/^-\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      flushBlockquote();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(unorderedMatch[1]);
      continue;
    }

    const imageMatch = trimmed.startsWith('<img') ? parseImage(trimmed) : null;
    if (imageMatch) {
      flushParagraph();
      flushList();
      flushBlockquote();
      blocks.push({ type: 'image', ...imageMatch });
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushBlockquote();
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushBlockquote();

  if (codeBlock) {
    blocks.push({
      type: 'code',
      language: codeBlock.language,
      content: codeBlock.lines.join('\n'),
    });
  }

  return blocks;
};

const renderInline = (text: string, keyPrefix: string) => {
  const segments = text.split(/(`[^`]+`)/g).filter(Boolean);

  return segments.flatMap((segment, index) => {
    if (segment.startsWith('`') && segment.endsWith('`')) {
      const codeText = segment.slice(1, -1);
      return (
        <html.code
          key={`${keyPrefix}-code-${index}`}
          style={styles.inlineCode}
        >
          {codeText}
        </html.code>
      );
    }

    const boldSegments = segment.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return boldSegments.flatMap((boldSegment, boldIndex) => {
      if (boldSegment.startsWith('**') && boldSegment.endsWith('**')) {
        return (
          <html.span
            key={`${keyPrefix}-bold-${index}-${boldIndex}`}
            style={styles.bold}
          >
            {boldSegment.slice(2, -2)}
          </html.span>
        );
      }
      const italicSegments = boldSegment.split(/(\*[^*]+\*)/g).filter(Boolean);
      return italicSegments.map((italicSegment, italicIndex) => {
        if (italicSegment.startsWith('*') && italicSegment.endsWith('*')) {
          return (
            <html.span
              key={`${keyPrefix}-italic-${index}-${boldIndex}-${italicIndex}`}
              style={styles.italic}
            >
              {italicSegment.slice(1, -1)}
            </html.span>
          );
        }
        return (
          <html.span
            key={`${keyPrefix}-text-${index}-${boldIndex}-${italicIndex}`}
          >
            {italicSegment}
          </html.span>
        );
      });
    });
  });
};

const renderHeading = (level: number, text: string, key: string) => {
  const HeadingTag =
    level === 1
      ? html.h1
      : level === 2
      ? html.h2
      : level === 3
      ? html.h3
      : html.h4;

  return (
    <HeadingTag key={key} style={styles.heading}>
      {renderInline(text, key)}
    </HeadingTag>
  );
};

const renderList = (ordered: boolean, items: string[], key: string) => {
  const ListTag = ordered ? html.ol : html.ul;
  return (
    <ListTag key={key} style={styles.list}>
      {items.map((item, index) => (
        <html.li key={`${key}-item-${index}`} style={styles.listItem}>
          {renderInline(item, `${key}-item-${index}`)}
        </html.li>
      ))}
    </ListTag>
  );
};

const renderBlockquote = (lines: string[], key: string) => {
  return (
    <html.blockquote key={key} style={styles.blockquote}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        const citeMatch = trimmed.match(/^<cite>(.*)<\/cite>$/);
        if (citeMatch) {
          return (
            <html.span key={`${key}-cite-${index}`} style={styles.cite}>
              {citeMatch[1]}
            </html.span>
          );
        }
        return (
          <html.p key={`${key}-quote-${index}`} style={styles.blockquoteText}>
            {renderInline(trimmed, `${key}-quote-${index}`)}
          </html.p>
        );
      })}
    </html.blockquote>
  );
};

export type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content);

  return (
    <html.div style={styles.content}>
      {blocks.map((block, index) => {
        const key = `md-block-${index}`;
        switch (block.type) {
          case 'heading':
            return renderHeading(block.level, block.text, key);
          case 'paragraph':
            return (
              <html.p key={key} style={styles.paragraph}>
                {renderInline(block.text, key)}
              </html.p>
            );
          case 'list':
            return renderList(block.ordered, block.items, key);
          case 'code':
            return (
              <html.pre key={key} style={styles.codeBlock}>
                <html.code style={styles.codeBlockContent}>
                  {block.content}
                </html.code>
              </html.pre>
            );
          case 'blockquote':
            return renderBlockquote(block.lines, key);
          case 'divider':
            return <Divider key={key} />;
          case 'image':
            return (
              <html.img
                key={key}
                style={styles.image}
                src={block.src}
                alt={block.alt ?? 'Markdown image'}
              />
            );
          default:
            return null;
        }
      })}
    </html.div>
  );
}

export default MarkdownRenderer;
