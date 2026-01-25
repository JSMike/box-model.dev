export default {
  size: {
    radius: {
      $type: 'dimension',
      none: { $value: '0rem' }
    },
    borderWidth: {
      $type: 'dimension',
      hairline: { $value: '1px' },
      thin: { $value: '1.5px' },
      default: { $value: '2px' },
      thick: { $value: '3px' }
    },
    controlHeight: {
      $type: 'dimension',
      sm: { $value: '2rem' },
      md: { $value: '2.5rem' },
      lg: { $value: '3rem' }
    },
    icon: {
      $type: 'dimension',
      sm: { $value: '1rem' },
      md: { $value: '1.5rem' },
      lg: { $value: '2rem' }
    },
    container: {
      $type: 'dimension',
      xs: { $value: '20rem' },
      sm: { $value: '24rem' },
      md: { $value: '32rem' },
      lg: { $value: '48rem' },
      xl: { $value: '64rem' }
    }
  }
};
