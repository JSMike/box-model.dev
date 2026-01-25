import { css, html } from 'react-strict-dom';
import { Linking, Platform } from 'react-native';
import {
  colorTokens,
  colorTextTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export type LinkVariant = 'primary' | 'secondary' | 'tertiary';
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LinkElement = 'a' | 'button';
export type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

export interface LinkProps {
  children: React.ReactNode;
  href?: string;
  variant?: LinkVariant;
  size?: LinkSize;
  element?: LinkElement;
  onClick?: () => void;
  target?: LinkTarget | null;
  rel?: string;
}

const styles = css.create({
  base: {
    textDecorationLine: {
      default: 'none',
      ':hover': 'underline',
      ':active': 'underline',
    },
    textDecorationStyle: 'solid',
    fontFamily: typographyTokens.fontFamilySans,
    fontWeight: typographyTokens.fontWeightMedium,
    letterSpacing: typographyTokens.letterSpacingNormal,
    lineHeight: typographyTokens.lineHeightSnug,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  variantPrimary: {
    color: {
      default: colorTokens.brandPrimaryEmphasis,
      ':hover': colorTokens.brandPrimaryStrong,
      ':active': colorTokens.brandPrimaryStrong,
    },
  },
  variantSecondary: {
    color: {
      default: colorTextTokens.primary,
      ':hover': colorTextTokens.secondary,
      ':active': colorTextTokens.secondary,
    },
  },
  variantTertiary: {
    color: {
      default: colorTextTokens.tertiary,
      ':hover': colorTextTokens.secondary,
      ':active': colorTextTokens.secondary,
    },
  },
  sizeXs: {
    fontSize: typographyTokens.fontSizeXs,
  },
  sizeSm: {
    fontSize: typographyTokens.fontSizeSm,
  },
  sizeMd: {
    fontSize: typographyTokens.fontSizeMd,
  },
  sizeLg: {
    fontSize: typographyTokens.fontSizeLg,
  },
  sizeXl: {
    fontSize: typographyTokens.fontSizeXl,
  },
});

const variantStyles: Record<LinkVariant, typeof styles.variantPrimary> = {
  primary: styles.variantPrimary,
  secondary: styles.variantSecondary,
  tertiary: styles.variantTertiary,
};

const sizeStyles: Record<LinkSize, typeof styles.sizeMd> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
  xl: styles.sizeXl,
};

export function Link({
  children,
  href,
  variant = 'primary',
  size = 'md',
  element = 'a',
  onClick,
  target,
  rel,
}: LinkProps) {
  const sharedStyle = [styles.base, variantStyles[variant], sizeStyles[size]];
  const isNative = Platform.OS !== 'web';
  const handlePress = () => {
    onClick?.();
    if (href) {
      void Linking.openURL(href);
    }
  };

  if (element === 'button') {
    return (
      <html.button type="button" style={sharedStyle} onClick={onClick}>
        {children}
      </html.button>
    );
  }

  return (
    <html.a
      href={isNative ? undefined : href}
      target={isNative ? undefined : target}
      rel={isNative ? undefined : rel}
      role={isNative ? 'link' : undefined}
      style={sharedStyle}
      onClick={isNative ? handlePress : onClick}
    >
      {children}
    </html.a>
  );
}

export default Link;
