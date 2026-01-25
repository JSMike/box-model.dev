export default {
  card: {
    background: { $value: '{color.background.surface}' },
    borderColor: { $value: '{color.border.subtle}' },
    borderWidth: { $value: '{size.borderWidth.hairline}' },
    borderRadius: { $value: '{size.radius.none}' },
    padding: { $value: '{space.layout.section.sm}' },
    gap: { $value: '{space.stack.relaxed}' },
    shadow: {
      rest: { $value: '{shadow.elevation.sm}' },
      hover: { $value: '{shadow.elevation.md}' }
    }
  }
};
