export default {
  typography: {
    roles: {
      body: {
        fontFamily: { $value: '{typography.fontFamily.sans}' },
        fontSize: { $value: '{typography.fontSize.md}' },
        lineHeight: { $value: '{typography.lineHeight.normal}' },
        fontWeight: { $value: '{typography.fontWeight.regular}' },
        letterSpacing: { $value: '{typography.letterSpacing.normal}' }
      },
      bodyStrong: {
        fontFamily: { $value: '{typography.fontFamily.sans}' },
        fontSize: { $value: '{typography.fontSize.md}' },
        lineHeight: { $value: '{typography.lineHeight.normal}' },
        fontWeight: { $value: '{typography.fontWeight.semibold}' },
        letterSpacing: { $value: '{typography.letterSpacing.normal}' }
      },
      caption: {
        fontFamily: { $value: '{typography.fontFamily.sans}' },
        fontSize: { $value: '{typography.fontSize.sm}' },
        lineHeight: { $value: '{typography.lineHeight.snug}' },
        fontWeight: { $value: '{typography.fontWeight.medium}' },
        letterSpacing: { $value: '{typography.letterSpacing.normal}' }
      },
      button: {
        fontFamily: { $value: '{typography.fontFamily.mono}' },
        fontSize: { $value: '{typography.fontSize.md}' },
        lineHeight: { $value: '{typography.lineHeight.snug}' },
        fontWeight: { $value: '{typography.fontWeight.medium}' },
        letterSpacing: { $value: '{typography.letterSpacing.normal}' }
      },
      code: {
        fontFamily: { $value: '{typography.fontFamily.mono}' },
        fontSize: { $value: '{typography.fontSize.sm}' },
        lineHeight: { $value: '{typography.lineHeight.relaxed}' },
        fontWeight: { $value: '{typography.fontWeight.regular}' }
      },
      heading: {
        h1: {
          fontFamily: { $value: '{typography.fontFamily.sans}' },
          fontSize: { $value: '{typography.fontSize.4xl}' },
          lineHeight: { $value: '{typography.lineHeight.tight}' },
          fontWeight: { $value: '{typography.fontWeight.bold}' }
        },
        h2: {
          fontFamily: { $value: '{typography.fontFamily.sans}' },
          fontSize: { $value: '{typography.fontSize.3xl}' },
          lineHeight: { $value: '{typography.lineHeight.snug}' },
          fontWeight: { $value: '{typography.fontWeight.bold}' }
        },
        h3: {
          fontFamily: { $value: '{typography.fontFamily.sans}' },
          fontSize: { $value: '{typography.fontSize.2xl}' },
          lineHeight: { $value: '{typography.lineHeight.snug}' },
          fontWeight: { $value: '{typography.fontWeight.semibold}' }
        },
        h4: {
          fontFamily: { $value: '{typography.fontFamily.sans}' },
          fontSize: { $value: '{typography.fontSize.xl}' },
          lineHeight: { $value: '{typography.lineHeight.normal}' },
          fontWeight: { $value: '{typography.fontWeight.semibold}' }
        },
        h5: {
          fontFamily: { $value: '{typography.fontFamily.sans}' },
          fontSize: { $value: '{typography.fontSize.lg}' },
          lineHeight: { $value: '{typography.lineHeight.normal}' },
          fontWeight: { $value: '{typography.fontWeight.medium}' }
        },
        h6: {
          fontFamily: { $value: '{typography.fontFamily.sans}' },
          fontSize: { $value: '{typography.fontSize.md}' },
          lineHeight: { $value: '{typography.lineHeight.normal}' },
          fontWeight: { $value: '{typography.fontWeight.medium}' }
        }
      }
    }
  }
};
