export default {
  tag: {
    radius: { $value: '{size.radius.none}' },
    gap: { $value: '{space.scale.075}' },
    padding: { $value: '{space.scale.050} {space.scale.125}' },
    paddingBlock: { $value: '{space.scale.050}' },
    paddingInline: { $value: '{space.scale.125}' },
    neutral: {
      background: { $value: '{color.background.sunken}' },
      text: { $value: '{color.text.secondary}' },
      border: { $value: '{color.border.subtle}' }
    },
    info: {
      background: { $value: '{color.feedback.info.surface}' },
      text: { $value: '{color.feedback.info.text}' },
      border: { $value: '{color.feedback.info.border}' }
    },
    success: {
      background: { $value: '{color.feedback.success.surface}' },
      text: { $value: '{color.feedback.success.text}' },
      border: { $value: '{color.feedback.success.border}' }
    },
    warning: {
      background: { $value: '{color.feedback.warning.surface}' },
      text: { $value: '{color.feedback.warning.text}' },
      border: { $value: '{color.feedback.warning.border}' }
    },
    danger: {
      background: { $value: '{color.feedback.danger.surface}' },
      text: { $value: '{color.feedback.danger.text}' },
      border: { $value: '{color.feedback.danger.border}' }
    }
  }
};
