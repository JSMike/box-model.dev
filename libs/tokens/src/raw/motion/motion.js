export default {
  motion: {
    duration: {
      $type: 'duration',
      instant: { $value: '0ms' },
      fast: { $value: '250ms' },
      base: { $value: '500ms' },
      slow: { $value: '1000ms' },
      slower: { $value: '1500ms' },
      deliberate: { $value: '2000ms' }
    },
    easing: {
      $type: 'cubicBezier',
      standard: { $value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      emphasized: { $value: 'cubic-bezier(0.2, 0, 0, 1)' },
      entrance: { $value: 'cubic-bezier(0, 0, 0.2, 1)' },
      exit: { $value: 'cubic-bezier(0.6, 0, 0.2, 1)' }
    }
  }
};
