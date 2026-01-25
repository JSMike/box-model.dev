export default {
  space: {
    layout: {
      gutter: {
        sm: { $value: '{space.scale.150}' },
        md: { $value: '{space.scale.200}' },
        lg: { $value: '{space.scale.300}' }
      },
      section: {
        sm: { $value: '{space.scale.300}' },
        md: { $value: '{space.scale.400}' },
        lg: { $value: '{space.scale.500}' }
      }
    },
    control: {
      sm: {
        block: { $value: '{space.scale.050}' },
        inline: { $value: '{space.scale.100}' },
        padding: { $value: '{space.control.sm.block} {space.control.sm.inline}' }
      },
      md: {
        block: { $value: '{space.scale.100}' },
        inline: { $value: '{space.scale.200}' },
        padding: { $value: '{space.control.md.block} {space.control.md.inline}' }
      },
      lg: {
        block: { $value: '{space.scale.150}' },
        inline: { $value: '{space.scale.300}' },
        padding: { $value: '{space.control.lg.block} {space.control.lg.inline}' }
      }
    },
    stack: {
      tight: { $value: '{space.scale.075}' },
      base: { $value: '{space.scale.100}' },
      relaxed: { $value: '{space.scale.150}' },
      loose: { $value: '{space.scale.200}' },
      spacious: { $value: '{space.scale.300}' }
    },
    inset: {
      sm: { $value: '{space.scale.100}' },
      md: { $value: '{space.scale.150}' },
      lg: { $value: '{space.scale.200}' }
    }
  }
};
