type Spacing = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

/**
 * Expand CSS shorthand spacing (margin/padding) into longhand values.
 * React Strict DOM does not support multi-value shorthands, so we convert them.
 */
export function expandSpacing(value: string): Spacing {
  const parts = value.trim().split(/\s+/);

  if (parts.length === 1) {
    const [all] = parts;
    return { top: all, right: all, bottom: all, left: all };
  }

  if (parts.length === 2) {
    const [vertical, horizontal] = parts;
    return { top: vertical, right: horizontal, bottom: vertical, left: horizontal };
  }

  if (parts.length === 3) {
    const [top, horizontal, bottom] = parts;
    return { top, right: horizontal, bottom, left: horizontal };
  }

  const [top, right, bottom, left] = parts;
  return { top, right, bottom, left: left ?? right ?? top };
}
