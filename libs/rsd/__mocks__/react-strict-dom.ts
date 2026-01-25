/**
 * Mock for react-strict-dom
 * Used in tests to avoid the babel compilation requirement
 */
import React from 'react';

// Create mock html.* elements that render native elements
const createHtmlElement = (elementType: string) => {
  return React.forwardRef<HTMLElement, any>(
    function MockHtmlElement({ style, children, ...props }, ref) {
      // Convert style array to object if needed
      const styleObj = Array.isArray(style)
        ? style.filter(Boolean).reduce((acc, s) => ({ ...acc, ...s }), {})
        : style;
      return React.createElement(elementType, { ...props, style: styleObj, ref }, children);
    }
  );
};

// Proxy to create html elements on demand
export const html = new Proxy({} as Record<string, React.ComponentType<any>>, {
  get(_target, prop: string) {
    return createHtmlElement(prop);
  }
});

// Mock css functions
export const css = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
  defineVars: <T extends Record<string, string>>(vars: T): T => vars,
  createTheme: <T extends Record<string, string>>(_vars: any, theme: T): T => theme,
  props: (...styles: any[]) => {
    const merged = styles.filter(Boolean).reduce((acc, s) => ({ ...acc, ...s }), {});
    return { style: merged };
  },
};
