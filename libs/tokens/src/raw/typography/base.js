export default {
  typography: {
    fontFamily: {
      $type: 'fontFamily',
      sans: { $value: "Consolas, 'Courier New', monospace" },
      serif: { $value: "Consolas, 'Courier New', monospace" },
      mono: { $value: "Consolas, 'Courier New', monospace" }
    },
    fontSize: {
      $type: 'dimension',
      xs: { $value: '0.75rem' },
      sm: { $value: '0.875rem' },
      md: { $value: '1rem' },
      lg: { $value: '1.125rem' },
      xl: { $value: '1.25rem' },
      '2xl': { $value: '1.5rem' },
      '3xl': { $value: '1.875rem' },
      '4xl': { $value: '2.25rem' },
      '5xl': { $value: '3rem' },
      '6xl': { $value: '3.75rem' }
    },
    lineHeight: {
      $type: 'lineHeight',
      tight: { $value: '1.2' },
      snug: { $value: '1.35' },
      normal: { $value: '1.5' },
      relaxed: { $value: '1.7' },
      loose: { $value: '1.9' }
    },
    fontWeight: {
      $type: 'fontWeight',
      regular: { $value: '400' },
      medium: { $value: '500' },
      semibold: { $value: '600' },
      bold: { $value: '700' },
      extrabold: { $value: '800' }
    },
    letterSpacing: {
      $type: 'dimension',
      tight: { $value: '-0.01em' },
      normal: { $value: '0em' },
      wide: { $value: '0.02em' }
    },
    paragraphSpacing: {
      $type: 'dimension',
      none: { $value: '0rem' },
      sm: { $value: '{space.scale.100}' },
      md: { $value: '{space.scale.150}' },
      lg: { $value: '{space.scale.200}' }
    }
  }
};
