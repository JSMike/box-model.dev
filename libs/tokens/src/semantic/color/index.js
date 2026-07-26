const withSchemes = (definition) =>
  Object.entries(definition).reduce((acc, [name, values]) => {
    const isString = typeof values === 'string';
    const darkValue = isString ? values : values.dark;
    const lightValue = isString ? values : values.light ?? values.dark;

    acc[name] = { $value: darkValue };
    acc[`${name}-light`] = { $value: lightValue };
    acc[`${name}-dark`] = { $value: darkValue };

    return acc;
  }, {});

export default {
  color: {
    brand: {
      primary: withSchemes({
        emphasis: '{color.palette.content.500}',
        strong: {
          dark: '{color.palette.content.600}',
          light: '{color.palette.content.750}',
        },
        intense: {
          dark: '{color.palette.content.550}',
          light: '{color.palette.content.800}',
        },
        inverse: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.950}',
        },
        subtle: {
          dark: '{color.palette.content.100}',
          light: '{color.palette.content.200}',
        },
      }),
      accent: withSchemes({
        emphasis: '{color.palette.content.500}',
        strong: {
          dark: '{color.palette.content.600}',
          light: '{color.palette.content.750}',
        },
        intense: {
          dark: '{color.palette.content.550}',
          light: '{color.palette.content.800}',
        },
        inverse: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.950}',
        },
        subtle: {
          dark: '{color.palette.content.100}',
          light: '{color.palette.content.200}',
        },
      }),
    },
    background: withSchemes({
      canvas: {
        dark: '{color.palette.surface.950}',
        light: '{color.palette.surface.0}',
      },
      surface: {
        dark: '{color.palette.surface.800}',
        light: '{color.palette.surface.50}',
      },
      elevated: {
        dark: '{color.palette.surface.700}',
        light: '{color.palette.surface.0}',
      },
      sunken: {
        dark: '{color.palette.surface.650}',
        light: '{color.palette.surface.100}',
      },
      content: {
        dark: '{color.palette.surface.500}',
        light: '{color.palette.surface.200}',
      },
      inverse: {
        dark: '{color.palette.surface.0}',
        light: '{color.palette.surface.950}',
      },
      scrim: {
        dark: 'rgba(0, 0, 0, {color.alpha.64})',
        light: 'rgba(40, 40, 40, {color.alpha.64})',
      },
    }),
    text: withSchemes({
      primary: {
        dark: '{color.palette.surface.0}',
        light: '{color.palette.surface.950}',
      },
      secondary: {
        dark: '{color.palette.surface.50}',
        light: '{color.palette.surface.700}',
      },
      tertiary: {
        dark: '{color.palette.surface.100}',
        light: '{color.palette.surface.700}',
      },
      inverse: {
        dark: '{color.palette.surface.950}',
        light: '{color.palette.surface.0}',
      },
      accent: {
        dark: '{color.palette.content.50}',
        light: '{color.palette.content.750}',
      },
      success: {
        dark: '{color.palette.padding.500}',
        light: '{color.palette.padding.800}',
      },
      warning: {
        dark: '{color.palette.surface.0}',
        light: '{color.palette.surface.950}',
      },
      danger: {
        dark: '{color.palette.error.400}',
        light: '{color.palette.error.600}',
      },
    }),
    border: withSchemes({
      subtle: {
        dark: '{color.palette.border.500}',
        light: '{color.palette.border.300}',
      },
      default: {
        dark: '{color.palette.border.600}',
        light: '{color.palette.border.500}',
      },
      strong: {
        dark: '{color.palette.border.700}',
        light: '{color.palette.border.600}',
      },
      focus: {
        dark: '{color.palette.surface.100}',
        light: '{color.palette.surface.500}',
      },
      inverse: {
        dark: '{color.palette.surface.0}',
        light: '{color.palette.surface.950}',
      },
    }),
    interactive: {
      primary: withSchemes({
        rest: {
          dark: '{color.palette.content.750}',
          light: '{color.palette.content.400}',
        },
        hover: {
          dark: '{color.palette.content.800}',
          light: '{color.palette.content.300}',
        },
        active: {
          dark: '{color.palette.content.850}',
          light: '{color.palette.content.200}',
        },
        text: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.950}',
        },
        focusRing: '{color.palette.content.700}',
        focusShadow: 'rgba(68, 89, 94, {color.alpha.35})',
      }),
      secondary: withSchemes({
        rest: {
          dark: '{color.palette.margin.800}',
          light: '{color.palette.margin.450}',
        },
        hover: {
          dark: '{color.palette.margin.700}',
          light: '{color.palette.margin.400}',
        },
        active: {
          dark: '{color.palette.margin.600}',
          light: '{color.palette.margin.300}',
        },
        text: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.950}',
        },
      }),
      tertiary: withSchemes({
        rest: 'transparent',
        text: {
          dark: '{color.palette.content.50}',
          light: '{color.palette.content.750}',
        },
        hover: 'rgba(136, 178, 189, {color.alpha.14})',
        active: 'rgba(136, 178, 189, {color.alpha.22})',
      }),
      destructive: withSchemes({
        rest: {
          dark: '{color.palette.error.500}',
          light: '{color.palette.error.300}',
        },
        hover: {
          dark: '{color.palette.error.600}',
          light: '{color.palette.error.400}',
        },
        active: {
          dark: '{color.palette.error.700}',
          light: '{color.palette.error.500}',
        },
        text: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.950}',
        },
      }),
      disabled: withSchemes({
        background: {
          dark: '{color.palette.surface.700}',
          light: '{color.palette.surface.200}',
        },
        text: {
          dark: '{color.palette.surface.500}',
          light: '{color.palette.surface.400}',
        },
      }),
    },
    focus: withSchemes({
      ring: '{color.palette.content.700}',
      shadow: 'rgba(68, 89, 94, {color.alpha.35})',
    }),
    feedback: {
      success: withSchemes({
        surface: {
          dark: '{color.palette.padding.500}',
          light: '{color.palette.padding.500}',
        },
        border: {
          dark: '{color.palette.padding.700}',
          light: '{color.palette.padding.700}',
        },
        text: '{color.palette.surface.950}',
        icon: '{color.palette.surface.950}',
      }),
      warning: withSchemes({
        surface: {
          dark: '{color.palette.margin.500}',
          light: '{color.palette.margin.500}',
        },
        border: {
          dark: '{color.palette.margin.700}',
          light: '{color.palette.margin.700}',
        },
        text: '{color.palette.surface.950}',
        icon: '{color.palette.surface.950}',
      }),
      danger: withSchemes({
        surface: {
          dark: '{color.palette.error.500}',
          light: '{color.palette.error.500}',
        },
        border: {
          dark: '{color.palette.error.700}',
          light: '{color.palette.error.700}',
        },
        text: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.0}',
        },
        icon: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.0}',
        },
      }),
      info: withSchemes({
        surface: {
          dark: '{color.palette.content.500}',
          light: '{color.palette.content.500}',
        },
        border: {
          dark: '{color.palette.content.700}',
          light: '{color.palette.content.700}',
        },
        text: '{color.palette.surface.950}',
        icon: '{color.palette.surface.950}',
      }),
    },
    box: {
      margin: withSchemes({
        background: {
          dark: '{color.palette.margin.500}',
          light: '{color.palette.margin.500}',
        },
        border: {
          dark: '{color.palette.margin.700}',
          light: '{color.palette.margin.700}',
        },
        text: {
          dark: '{color.palette.surface.0}',
          light: '{color.palette.surface.950}',
        },
      }),
      border: withSchemes({
        background: {
          dark: '{color.palette.border.500}',
          light: '{color.palette.border.500}',
        },
        border: {
          dark: '{color.palette.border.700}',
          light: '{color.palette.border.700}',
        },
        text: '{color.palette.surface.950}',
      }),
      padding: withSchemes({
        background: {
          dark: '{color.palette.padding.500}',
          light: '{color.palette.padding.500}',
        },
        border: {
          dark: '{color.palette.padding.700}',
          light: '{color.palette.padding.700}',
        },
        text: '{color.palette.surface.950}',
      }),
      content: withSchemes({
        background: {
          dark: '{color.palette.content.500}',
          light: '{color.palette.content.500}',
        },
        border: {
          dark: '{color.palette.content.700}',
          light: '{color.palette.content.700}',
        },
        text: '{color.palette.surface.950}',
      }),
    },
  },
};
