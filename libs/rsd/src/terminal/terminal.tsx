/**
 * Terminal and TerminalLine components for @box-model/rsd
 *
 * Terminal display for code/command examples.
 * Uses StyleX tokens for cross-platform compatibility.
 */
import { css, html } from 'react-strict-dom';
import {
  colorBackgroundTokens,
  colorTextTokens,
  colorBorderTokens,
  spaceTokens,
  sizeTokens,
  typographyRolesTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

// ============ Terminal ============

export interface TerminalProps {
  /** Terminal content (typically TerminalLine components) */
  children: React.ReactNode;
}

const terminalStyles = css.create({
  surface: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.scale100,
    // Use individual padding for React Native compatibility
    paddingTop: spaceTokens.scale200,
    paddingBottom: spaceTokens.scale200,
    paddingLeft: spaceTokens.scale200,
    paddingRight: spaceTokens.scale200,
    backgroundColor: colorBackgroundTokens.canvas,
    color: colorTextTokens.primary,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.default,
    borderRadius: 0,
    width: '100%',
    fontFamily: typographyRolesTokens.codeFontFamily,
    fontSize: typographyRolesTokens.codeFontSize,
    lineHeight: typographyTokens.lineHeightNormal,
    minHeight: '12.5rem',
    boxSizing: 'border-box',
  },
});

/**
 * Terminal container component
 *
 * @example
 * ```tsx
 * <Terminal>
 *   <TerminalLine>npm install @box-model/rsd</TerminalLine>
 * </Terminal>
 * ```
 */
export function Terminal({ children }: TerminalProps) {
  return (
    <html.div style={terminalStyles.surface}>
      {children}
    </html.div>
  );
}

// ============ TerminalLine ============

export type TerminalLineVariant = 'prompt' | 'success' | 'info';

export interface TerminalLineProps {
  /** Line content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: TerminalLineVariant;
  /** Show blinking cursor */
  cursor?: boolean;
}

const lineStyles = css.create({
  base: {
    display: 'flex',
    gap: spaceTokens.scale100,
    alignItems: 'flex-start',
    lineHeight: typographyTokens.lineHeightNormal,
    fontFamily: typographyRolesTokens.codeFontFamily,
    fontSize: typographyRolesTokens.codeFontSize,
    color: colorTextTokens.primary,
  },
  prompt: {
    userSelect: 'none',
    color: colorTextTokens.success,
  },
  content: {
    flex: 1,
  },
  contentPrompt: {
    color: colorTextTokens.primary,
  },
  contentSuccess: {
    color: colorTextTokens.success,
  },
  contentInfo: {
    color: colorTextTokens.accent,
  },
  cursor: {
    display: 'flex',
    // Note: Animation removed for React Native compatibility
    // On web, consider adding animation via platform-specific code
  },
});

const PROMPT_ICONS: Record<TerminalLineVariant, string> = {
  prompt: '$',
  success: '✔',
  info: 'i',
};

/**
 * TerminalLine component for individual lines
 *
 * @example
 * ```tsx
 * <TerminalLine variant="prompt">npm install</TerminalLine>
 * <TerminalLine variant="success">Done!</TerminalLine>
 * ```
 */
export function TerminalLine({
  children,
  variant = 'prompt',
  cursor = false,
}: TerminalLineProps) {
  const contentStyle = {
    prompt: lineStyles.contentPrompt,
    success: lineStyles.contentSuccess,
    info: lineStyles.contentInfo,
  }[variant];

  return (
    <html.div style={lineStyles.base}>
      <html.span style={lineStyles.prompt}>
        {PROMPT_ICONS[variant]}
      </html.span>
      <html.span style={[lineStyles.content, contentStyle]}>
        {children}
        {cursor && <html.span style={lineStyles.cursor}>_</html.span>}
      </html.span>
    </html.div>
  );
}
