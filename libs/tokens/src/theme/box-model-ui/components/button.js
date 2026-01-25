export default {
  button: {
    fontFamily: { $value: '{typography.roles.button.fontFamily}' },
    fontWeight: { $value: '{typography.roles.button.fontWeight}' },
    letterSpacing: { $value: '{typography.roles.button.letterSpacing}' },
    fontSize: {
      sm: { $value: '{typography.fontSize.sm}' },
      md: { $value: '{typography.roles.button.fontSize}' },
      lg: { $value: '{typography.fontSize.lg}' }
    },
    lineHeight: { $value: '{typography.roles.button.lineHeight}' },
    borderRadius: { $value: '{size.radius.none}' },
    gap: { $value: '{space.scale.100}' },
    padding: {
      sm: { $value: '{space.control.sm.padding}' },
      md: { $value: '{space.control.md.padding}' },
      lg: { $value: '{space.control.lg.padding}' }
    },
    paddingBlock: {
      sm: { $value: '{space.control.sm.block}' },
      md: { $value: '{space.control.md.block}' },
      lg: { $value: '{space.control.lg.block}' }
    },
    paddingInline: {
      sm: { $value: '{space.control.sm.inline}' },
      md: { $value: '{space.control.md.inline}' },
      lg: { $value: '{space.control.lg.inline}' }
    },
    minHeight: {
      sm: { $value: '{size.controlHeight.sm}' },
      md: { $value: '{size.controlHeight.md}' },
      lg: { $value: '{size.controlHeight.lg}' }
    },
    transitionDuration: { $value: '{motion.interaction.press.duration}' },
    transitionEasing: { $value: '{motion.interaction.press.easing}' },
    focus: {
      ringWidth: { $value: '{size.borderWidth.thick}' },
      ringColor: { $value: '{color.focus.ring}' },
      ringShadow: { $value: '{shadow.glow.focus}' },
      offset: { $value: '3px' }
    },
    primary: {
      background: {
        rest: { $value: '{color.interactive.primary.rest}' },
        hover: { $value: '{color.interactive.primary.hover}' },
        active: { $value: '{color.interactive.primary.active}' }
      },
      text: { $value: '{color.interactive.primary.text}' },
      focusRing: { $value: '{color.interactive.primary.focusRing}' },
      focusShadow: { $value: '{color.interactive.primary.focusShadow}' },
      disabled: {
        background: { $value: '{color.interactive.disabled.background}' },
        text: { $value: '{color.interactive.disabled.text}' }
      }
    },
    secondary: {
      background: {
        rest: { $value: '{color.interactive.secondary.rest}' },
        hover: { $value: '{color.interactive.secondary.hover}' },
        active: { $value: '{color.interactive.secondary.active}' }
      },
      text: { $value: '{color.interactive.secondary.text}' },
      disabled: {
        background: { $value: '{color.interactive.disabled.background}' },
        text: { $value: '{color.interactive.disabled.text}' }
      }
    },
    tertiary: {
      background: {
        rest: { $value: '{color.interactive.tertiary.rest}' },
        hover: { $value: '{color.interactive.tertiary.hover}' },
        active: { $value: '{color.interactive.tertiary.active}' }
      },
      text: { $value: '{color.interactive.tertiary.text}' },
      disabled: {
        background: { $value: '{color.interactive.tertiary.rest}' },
        text: { $value: '{color.interactive.disabled.text}' }
      }
    }
  }
};
