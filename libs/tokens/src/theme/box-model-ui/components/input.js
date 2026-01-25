export default {
  input: {
    background: {
      rest: { $value: '{color.background.surface}' },
      readOnly: { $value: '{color.background.sunken}' }
    },
    borderColor: {
      rest: { $value: '{color.border.default}' },
      hover: { $value: '{color.border.strong}' },
      focus: { $value: '{color.focus.ring}' }
    },
    text: {
      value: { $value: '{color.text.primary}' },
      placeholder: { $value: '{color.text.tertiary}' }
    },
    icon: { $value: '{color.text.secondary}' },
    borderRadius: { $value: '{size.radius.none}' },
    borderWidth: { $value: '{size.borderWidth.hairline}' },
    paddingBlock: { $value: '{space.scale.075}' },
    paddingInline: { $value: '{space.scale.150}' },
    minHeight: { $value: '{size.controlHeight.md}' },
    focusShadow: { $value: '{shadow.glow.focus}' },
    disabled: {
      background: { $value: '{color.interactive.disabled.background}' },
      text: { $value: '{color.interactive.disabled.text}' },
      borderColor: { $value: '{color.border.subtle}' }
    }
  }
};
