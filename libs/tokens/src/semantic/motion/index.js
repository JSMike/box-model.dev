export default {
  motion: {
    interaction: {
      focus: {
        duration: { $value: '{motion.duration.fast}' },
        easing: { $value: '{motion.easing.emphasized}' }
      },
      press: {
        duration: { $value: '{motion.duration.fast}' },
        easing: { $value: '{motion.easing.standard}' }
      },
      release: {
        duration: { $value: '{motion.duration.base}' },
        easing: { $value: '{motion.easing.standard}' }
      }
    },
    overlay: {
      duration: { $value: '{motion.duration.deliberate}' },
      easing: { $value: '{motion.easing.entrance}' }
    },
    toast: {
      in: {
        duration: { $value: '{motion.duration.base}' },
        easing: { $value: '{motion.easing.entrance}' }
      },
      out: {
        duration: { $value: '{motion.duration.slow}' },
        easing: { $value: '{motion.easing.exit}' }
      }
    }
  }
};
