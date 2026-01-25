/**
 * Mock for react-strict-dom/runtime
 * Provides the runtime utilities needed by babel-compiled code
 */

// Default styles - empty object in mock
export const defaultStyles = {};

// Merge function for combining styles
export function merge(...styles: any[]): any {
  return styles.filter(Boolean).reduce((acc, style) => {
    if (typeof style === 'string') {
      // Class name - just return as is
      return style;
    }
    return { ...acc, ...style };
  }, {});
}

// Style function
export function style(value: any): any {
  return value;
}
