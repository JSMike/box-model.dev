export default {
  dialog: {
    width: { $value: '32rem' },
    maxWidth: { $value: '90vw' },
    background: { $value: '{color.background.surface}' },
    border: { $value: '{color.border.subtle}' },
    borderWidth: { $value: '{size.borderWidth.hairline}' },
    borderRadius: { $value: '{size.radius.none}' },
    shadow: { $value: '{shadow.elevation.lg}' },
    overlay: { $value: '{color.background.scrim}' },
    gap: { $value: '{space.stack.relaxed}' },
    header: {
      padding: { $value: '{space.scale.200} {space.scale.250} {space.scale.150} {space.scale.250}' },
      text: { $value: '{color.text.primary}' }
    },
    body: {
      padding: { $value: '{space.scale.150} {space.scale.250}' },
      text: { $value: '{color.text.secondary}' }
    },
    footer: {
      padding: { $value: '{space.scale.150} {space.scale.250} {space.scale.200} {space.scale.250}' },
      gap: { $value: '{space.stack.base}' }
    }
  }
};
