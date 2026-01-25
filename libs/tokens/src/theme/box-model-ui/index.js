import components from './components/index.js';

export default {
  theme: {
    boxModelUi: {
      name: { $value: 'Box Model UI' },
      background: {
        canvas: { $value: '{color.background.canvas}' },
        surface: { $value: '{color.background.surface}' },
        inverse: { $value: '{color.background.inverse}' }
      },
      text: {
        primary: { $value: '{color.text.primary}' },
        inverse: { $value: '{color.text.inverse}' }
      },
      focus: {
        ring: { $value: '{color.focus.ring}' },
        shadow: { $value: '{color.focus.shadow}' }
      },
      ...components
    }
  }
};
