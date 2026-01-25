export const alpha = {
  '02': { $value: 0.02 },
  '04': { $value: 0.04 },
  '06': { $value: 0.06 },
  '08': { $value: 0.08 },
  '10': { $value: 0.1 },
  '12': { $value: 0.12 },
  '14': { $value: 0.14 },
  '16': { $value: 0.16 },
  '20': { $value: 0.2 },
  '22': { $value: 0.22 },
  '25': { $value: 0.25 },
  '30': { $value: 0.3 },
  '32': { $value: 0.32 },
  '35': { $value: 0.35 },
  '40': { $value: 0.4 },
  '50': { $value: 0.5 },
  '60': { $value: 0.6 },
  '64': { $value: 0.64 },
  '70': { $value: 0.7 },
  '80': { $value: 0.8 },
};

export default {
  color: {
    alpha: {
      $type: 'number',
      ...alpha,
    },
  },
};
