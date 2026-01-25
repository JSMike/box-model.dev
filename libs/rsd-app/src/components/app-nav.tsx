import React from 'react';
import { Linking, Platform } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { css, html } from 'react-strict-dom';
import type { RootStackParamList } from '../navigation';
import { LogoMark } from './logo';
import { STORYBOOK_URL } from '../config';
import {
  colorBackgroundTokens,
  colorBorderTokens,
  colorTokens,
  colorTextTokens,
  motionTokens,
  sizeTokens,
  spaceTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

export type NavRoute = {
  [Route in keyof RootStackParamList]: undefined extends RootStackParamList[Route]
    ? Route
    : never;
}[keyof RootStackParamList];

type NavItem = {
  label: string;
  route: NavRoute;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', route: 'Home', href: '/' },
  { label: 'About', route: 'About', href: '/about' },
  { label: 'Developer Blog', route: 'Blogs', href: '/blogs' },
];

export type AppNavProps = {
  activeRoute?: NavRoute;
};

const styles = css.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colorBackgroundTokens.canvas,
    borderBottomWidth: sizeTokens.borderWidthHairline,
    borderBottomStyle: 'solid',
    borderBottomColor: colorBorderTokens.subtle,
    position: 'relative',
    zIndex: 10,
  },
  navInner: {
    display: 'flex',
    // flexi
    // flexDirection: {
    //   default: 'column',
    //   '@media (min-width: 720px)': 'row',
    // },
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: {
      default: 'flex-start',
      '@media (min-width: 720px)': 'center',
    },
    justifyContent: 'space-between',
    gap: spaceTokens.scale150,
    paddingTop: spaceTokens.scale150,
    paddingBottom: spaceTokens.scale150,
    paddingLeft: spaceTokens.scale300,
    paddingRight: spaceTokens.scale300,
    width: '100%',
    maxWidth: 1200,
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    // gap: spaceTokens.scale100,
    gap: 10,
    fontFamily: typographyTokens.fontFamilyMono,
    fontWeight: typographyTokens.fontWeightBold,
    letterSpacing: typographyTokens.letterSpacingTight,
    color: {
      default: colorTokens.brandPrimaryEmphasis,
      ':hover': colorTokens.brandPrimaryStrong,
      ':active': colorTokens.brandPrimaryStrong,
    },
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    cursor: 'pointer',
    textDecorationLine: 'none',
  },
  links: {
    display: 'flex',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    gap: spaceTokens.scale050,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: typographyTokens.fontFamilyMono,
    fontWeight: typographyTokens.fontWeightMedium,
    paddingTop: spaceTokens.scale050,
    paddingBottom: spaceTokens.scale050,
    paddingLeft: spaceTokens.scale150,
    paddingRight: spaceTokens.scale150,
    borderWidth: sizeTokens.borderWidthHairline,
    borderStyle: 'solid',
    borderRadius: 0,
    textDecorationLine: 'none',
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: motionTokens.durationFast,
    transitionTimingFunction: motionTokens.easingStandard,
    color: {
      default: colorTextTokens.secondary,
      ':hover': colorTokens.brandPrimaryEmphasis,
      ':active': colorTokens.brandPrimaryEmphasis,
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': colorBackgroundTokens.sunken,
      ':active': colorBackgroundTokens.sunken,
    },
    borderColor: {
      default: 'transparent',
      ':hover': colorBorderTokens.subtle,
      ':active': colorBorderTokens.default,
    },
  },
  linkActive: {
    color: colorTokens.brandPrimaryEmphasis,
    borderColor: colorBorderTokens.default,
    backgroundColor: colorBackgroundTokens.sunken,
  },
  logomark: {
    display: 'block',
    position: 'relative'
  },
  brandSpan: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
  }
});

export function AppNav({ activeRoute }: AppNavProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isNative = Platform.OS !== 'web';

  const handleNavigate = (route: NavRoute) => {
    if (isNative) {
      navigation.navigate(route);
    }
  };

  const handleExternalLink = (url: string) => {
    if (isNative) {
      void Linking.openURL(url);
    }
  };

  return (
    <html.header style={styles.nav}>
      <html.div style={styles.navInner}>
        <html.a
          href={isNative ? undefined : '/'}
          role={isNative ? 'link' : undefined}
          onClick={isNative ? () => handleNavigate('Home') : undefined}
          style={styles.brand}
        >
          <html.div style={styles.brandSpan}>
            <LogoMark style={styles.logomark} />
            <html.span>Box Model UI</html.span>
          </html.div>
        </html.a>
        <html.nav style={styles.links}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <html.a
                key={item.route}
                href={isNative ? undefined : item.href}
                role={isNative ? 'link' : undefined}
                onClick={isNative ? () => handleNavigate(item.route) : undefined}
                aria-current={isActive ? 'page' : undefined}
                style={[styles.link, isActive && styles.linkActive]}
              >
                {item.label}
              </html.a>
            );
          })}
          <html.a
            href={isNative ? undefined : STORYBOOK_URL}
            target={isNative ? undefined : '_blank'}
            rel={isNative ? undefined : 'noreferrer'}
            role={isNative ? 'link' : undefined}
            onClick={isNative ? () => handleExternalLink(STORYBOOK_URL) : undefined}
            style={styles.link}
          >
            Storybook
          </html.a>
        </html.nav>
      </html.div>
    </html.header>
  );
}

export default AppNav;
