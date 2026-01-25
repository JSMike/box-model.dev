import { css, html } from 'react-strict-dom';
import { skeletonTokens } from '../tokens/tokens.stylex';

export type SkeletonWidth = 'full' | 'sm' | 'md' | 'lg';
export type SkeletonHeight = 'sm' | 'md' | 'lg';

export interface SkeletonProps {
  width?: SkeletonWidth;
  height?: SkeletonHeight;
}

const styles = css.create({
  root: {
    display: 'block',
    backgroundColor: skeletonTokens.background,
    borderRadius: 0,
    overflow: 'hidden',
  },
  widthFull: {
    width: '100%',
  },
  widthSm: {
    width: '6rem',
  },
  widthMd: {
    width: '12rem',
  },
  widthLg: {
    width: '18rem',
  },
  heightSm: {
    height: '0.75rem',
  },
  heightMd: {
    height: skeletonTokens.height,
  },
  heightLg: {
    height: '2rem',
  },
});

type WidthStyleKey = 'widthFull' | 'widthSm' | 'widthMd' | 'widthLg';
type WidthStyle = (typeof styles)[WidthStyleKey];
type HeightStyleKey = 'heightSm' | 'heightMd' | 'heightLg';
type HeightStyle = (typeof styles)[HeightStyleKey];

const widthStyles: Record<SkeletonWidth, WidthStyle> = {
  full: styles.widthFull,
  sm: styles.widthSm,
  md: styles.widthMd,
  lg: styles.widthLg,
};

const heightStyles: Record<SkeletonHeight, HeightStyle> = {
  sm: styles.heightSm,
  md: styles.heightMd,
  lg: styles.heightLg,
};

export function Skeleton({ width = 'full', height = 'md' }: SkeletonProps) {
  return <html.div style={[styles.root, widthStyles[width], heightStyles[height]]} />;
}

export default Skeleton;
