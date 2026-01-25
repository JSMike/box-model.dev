export default {
  space: {
    scale: {
      $type: 'dimension',
      '0': { $value: '0rem' },
      '025': { $value: '0.125rem' },
      '050': { $value: '0.25rem' },
      '075': { $value: '0.375rem' },
      '100': { $value: '0.5rem' },
      '125': { $value: '0.625rem' },
      '150': { $value: '0.75rem' },
      '175': { $value: '0.875rem' },
      '200': { $value: '1rem' },
      '250': { $value: '1.25rem' },
      '300': { $value: '1.5rem' },
      '350': { $value: '1.75rem' },
      '400': { $value: '2rem' },
      '450': { $value: '2.25rem' },
      '500': { $value: '2.5rem' },
      '600': { $value: '3rem' }
    },
    inset: {
      $type: 'dimension',
      xs: { $value: '{space.scale.050}' },
      sm: { $value: '{space.scale.100}' },
      md: { $value: '{space.scale.150}' },
      lg: { $value: '{space.scale.200}' },
      xl: { $value: '{space.scale.300}' }
    },
    stack: {
      $type: 'dimension',
      xs: { $value: '{space.scale.075}' },
      sm: { $value: '{space.scale.100}' },
      md: { $value: '{space.scale.150}' },
      lg: { $value: '{space.scale.200}' },
      xl: { $value: '{space.scale.300}' }
    }
  }
};
