export default {
  toast: {
    padding: { $value: '{space.scale.150} {space.scale.200}' },
    gap: { $value: '{space.stack.base}' },
    borderWidth: { $value: '{size.borderWidth.hairline}' },
    shadow: { $value: '{shadow.elevation.sm}' },
    default: {
      background: { $value: '{color.background.surface}' },
      border: { $value: '{color.border.default}' },
      text: { $value: '{color.text.primary}' },
      icon: { $value: '{color.text.secondary}' }
    },
    info: {
      background: { $value: '{color.feedback.info.surface}' },
      border: { $value: '{color.feedback.info.border}' },
      text: { $value: '{color.feedback.info.text}' },
      icon: { $value: '{color.feedback.info.icon}' }
    },
    success: {
      background: { $value: '{color.feedback.success.surface}' },
      border: { $value: '{color.feedback.success.border}' },
      text: { $value: '{color.feedback.success.text}' },
      icon: { $value: '{color.feedback.success.icon}' }
    },
    warning: {
      background: { $value: '{color.feedback.warning.surface}' },
      border: { $value: '{color.feedback.warning.border}' },
      text: { $value: '{color.feedback.warning.text}' },
      icon: { $value: '{color.feedback.warning.icon}' }
    },
    danger: {
      background: { $value: '{color.feedback.danger.surface}' },
      border: { $value: '{color.feedback.danger.border}' },
      text: { $value: '{color.feedback.danger.text}' },
      icon: { $value: '{color.feedback.danger.icon}' }
    }
  }
};
