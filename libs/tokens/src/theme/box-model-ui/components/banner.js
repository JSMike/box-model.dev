export default {
  banner: {
    padding: { $value: '{space.scale.200} {space.scale.300}' },
    gap: { $value: '{space.stack.relaxed}' },
    borderWidth: { $value: '{size.borderWidth.hairline}' },
    default: {
      background: { $value: '{color.box.margin.background}' },
      border: { $value: '{color.box.margin.border}' },
      text: { $value: '{color.box.margin.text}' },
      icon: { $value: '{color.box.margin.text}' }
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
