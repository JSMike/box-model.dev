export default {
  closeControl: {
    size: { $value: '1.75rem' },
    icon: { $value: '{color.text.secondary}' },
    background: {
      rest: { $value: '{color.background.surface}' },
      hover: { $value: '{color.background.sunken}' },
      active: { $value: '{color.background.sunken}' }
    },
    border: {
      width: { $value: '{size.borderWidth.hairline}' },
      color: { $value: '{color.border.strong}' }
    }
  }
};
