import { vi } from 'vitest';

// Mock ResizeObserver for Vitest environment
const resizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn()
}));
vi.stubGlobal('ResizeObserver', resizeObserver);

// Mock IntersectionObserver for Vitest environment
const intersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  takeRecords: vi.fn()
}));
vi.stubGlobal('IntersectionObserver', intersectionObserver);

export {};
