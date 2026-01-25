export default {
  shadow: {
    elevation: {
      $type: 'shadow',
      xs: {
        $value:
          '0 1px 2px rgba(15, 23, 42, {color.alpha.08}), 0 1px 1px rgba(15, 23, 42, {color.alpha.12})'
      },
      sm: {
        $value:
          '0 1px 3px rgba(15, 23, 42, {color.alpha.12}), 0 1px 2px rgba(15, 23, 42, {color.alpha.16})'
      },
      md: {
        $value:
          '0 10px 15px rgba(15, 23, 42, {color.alpha.10}), 0 4px 6px rgba(15, 23, 42, {color.alpha.08})'
      },
      lg: {
        $value:
          '0 20px 25px rgba(15, 23, 42, {color.alpha.12}), 0 10px 10px rgba(15, 23, 42, {color.alpha.08})'
      },
      xl: {
        $value:
          '0 25px 50px rgba(15, 23, 42, {color.alpha.25}), 0 10px 15px rgba(15, 23, 42, {color.alpha.12})'
      }
    },
    glow: {
      $type: 'shadow',
      focus: { $value: '0 0 0 4px rgba(18, 51, 159, {color.alpha.35})' },
      subtle: { $value: '0 0 0 1px rgba(15, 23, 42, {color.alpha.08})' }
    }
  }
};
