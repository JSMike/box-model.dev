import { css, html } from 'react-strict-dom';
import {
  colorBackgroundTokens,
  colorBorderTokens,
  colorTextTokens,
  sizeTokens,
  spaceTokens,
} from '../tokens/tokens.stylex';

export type ToolbarGap = 'sm' | 'md' | 'lg';

export interface ToolbarProps {
  children: React.ReactNode;
  gap?: ToolbarGap;
}

const styles = css.create({
  surface: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: spaceTokens.insetSm,
    paddingBottom: spaceTokens.insetSm,
    paddingLeft: spaceTokens.insetSm,
    paddingRight: spaceTokens.insetSm,
    backgroundColor: colorBackgroundTokens.surface,
    color: colorTextTokens.primary,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderColor: colorBorderTokens.strong,
    borderRadius: 0,
  },
  gapSm: {
    gap: spaceTokens.stackSm,
  },
  gapMd: {
    gap: spaceTokens.stackMd,
  },
  gapLg: {
    gap: spaceTokens.stackLg,
  },
});

const gapStyles: Record<ToolbarGap, typeof styles.gapSm> = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
};

export function Toolbar({ children, gap = 'sm' }: ToolbarProps) {
  return <html.div style={[styles.surface, gapStyles[gap]]}>{children}</html.div>;
}

export default Toolbar;
