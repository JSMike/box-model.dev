import { isPublicLibraryEntryDirectory } from './library-entrypoints.js';

describe('library entrypoints', () => {
  it('keeps shared implementation directories internal', () => {
    expect(isPublicLibraryEntryDirectory('common')).toBe(false);
    expect(isPublicLibraryEntryDirectory('alert')).toBe(true);
  });
});
