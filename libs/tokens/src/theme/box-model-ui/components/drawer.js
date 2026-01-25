export default {
  drawer: {
    width: { $value: '20rem' },
    maxWidth: { $value: '90vw' },
    background: { $value: '{color.background.surface}' },
    border: { $value: '{color.border.subtle}' },
    borderWidth: { $value: '{size.borderWidth.hairline}' },
    borderRadius: { $value: '{size.radius.none}' },
    shadow: { $value: '{shadow.elevation.md}' },
    overlay: {
      color: { $value: '{color.background.scrim}' }
    },
    header: {
      padding: { $value: '{space.scale.200}' },
      text: { $value: '{color.text.primary}' }
    },
    body: {
      padding: { $value: '{space.scale.150} {space.scale.200}' },
      gap: { $value: '{space.stack.base}' }
    },
    footer: {
      padding: { $value: '{space.scale.150} {space.scale.200} {space.scale.200} {space.scale.200}' },
      gap: { $value: '{space.stack.base}' }
    }
  }
};
