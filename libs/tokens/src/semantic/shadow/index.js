const offsetShadow = (offset, color) => `${offset} ${offset} 0 ${color}`;

const offsetToken = (offset) => ({
  $value: offsetShadow(offset, '{color.brand.primary.strong}'),
});

const lightOffsetToken = (offset) => ({
  $value: offsetShadow(offset, '{color.brand.primary.subtle-light}'),
});

const darkOffsetToken = (offset) => ({
  $value: offsetShadow(offset, '{color.brand.primary.strong-dark}'),
});

export default {
  shadow: {
    offset: {
      $type: 'shadow',
      xs: offsetToken('0.125rem'),
      'xs-light': lightOffsetToken('0.125rem'),
      'xs-dark': darkOffsetToken('0.125rem'),
      sm: offsetToken('0.25rem'),
      'sm-light': lightOffsetToken('0.25rem'),
      'sm-dark': darkOffsetToken('0.25rem'),
      md: offsetToken('0.375rem'),
      'md-light': lightOffsetToken('0.375rem'),
      'md-dark': darkOffsetToken('0.375rem'),
    },
  },
};
