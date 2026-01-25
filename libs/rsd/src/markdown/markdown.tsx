/**
 * Markdown component for @box-model/rsd
 *
 * Container for markdown-rendered content.
 * Note: This is a simplified version for cross-platform compatibility.
 * Full markdown parsing should be handled at the application level.
 * Uses StyleX tokens for cross-platform compatibility.
 */
import { css, html } from 'react-strict-dom';
import {
  typographyRolesTokens,
  colorTextTokens,
} from '../tokens/tokens.stylex';

export interface MarkdownProps {
  /** Content to render (pre-rendered HTML or text on web, React nodes on native) */
  children: React.ReactNode;
}

const styles = css.create({
  container: {
    fontFamily: typographyRolesTokens.bodyFontFamily,
    fontSize: typographyRolesTokens.bodyFontSize,
    fontWeight: typographyRolesTokens.bodyFontWeight,
    lineHeight: typographyRolesTokens.bodyLineHeight,
    letterSpacing: typographyRolesTokens.bodyLetterSpacing,
    color: colorTextTokens.primary,
  },
});

/**
 * Markdown container component
 *
 * This component provides a styled container for markdown content.
 * For web applications, use a markdown parser (like markdown-it) to
 * convert markdown to HTML before passing to this component.
 * For native applications, use a React Native markdown library.
 *
 * @example
 * ```tsx
 * // Web usage with dangerouslySetInnerHTML
 * <Markdown>
 *   <div dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
 * </Markdown>
 *
 * // Native usage with react-native-markdown
 * <Markdown>
 *   <MarkdownDisplay>{markdownString}</MarkdownDisplay>
 * </Markdown>
 * ```
 */
export function Markdown({ children }: MarkdownProps) {
  return (
    <html.div style={styles.container}>
      {children}
    </html.div>
  );
}
