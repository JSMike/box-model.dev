const INTERNAL_LIBRARY_DIRECTORIES = new Set(['common']);

export function isPublicLibraryEntryDirectory(directoryName: string): boolean {
  return !INTERNAL_LIBRARY_DIRECTORIES.has(directoryName);
}
