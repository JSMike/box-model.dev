// Stub for react-native - this project uses react-strict-dom instead
// Provides web-compatible implementations for the subset of APIs used

export const Platform = {
  OS: 'web',
  select: (options) => options.web ?? options.default,
};

export const Linking = {
  openURL: (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    return Promise.resolve();
  },
  canOpenURL: () => Promise.resolve(true),
};

export default {};
