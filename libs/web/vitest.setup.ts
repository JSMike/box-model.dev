import { vi } from 'vitest';

// Mock CSSStyleSheet.replaceSync method for Vitest environment
CSSStyleSheet.prototype.replaceSync = vi.fn();

// Mock Element.getAnimations method for Vitest environment
Element.prototype.getAnimations = vi.fn().mockReturnValue([{
  finished: Promise.resolve(),
  cancel: vi.fn(),
  play: vi.fn(),
  pause: vi.fn(),
  reverse: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  startTime: 0,
  currentTime: 0,
  playState: 'finished',
  effect: null,
  timeline: null
}]);

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

// Mock HTMLDialogElement methods for Vitest environment
if (!globalThis.HTMLDialogElement) {
  class MockDialogElement extends HTMLElement {
    open = false;
  }
  vi.stubGlobal('HTMLDialogElement', MockDialogElement as unknown as typeof HTMLDialogElement);
}

const dialogProto = globalThis.HTMLDialogElement?.prototype;

if (dialogProto) {
  const ensureDialogMethod = (
    method: 'showModal' | 'close',
    implementation: (this: HTMLDialogElement) => void
  ) => {
    if (typeof dialogProto[method] === 'function') {
      vi.spyOn(dialogProto, method).mockImplementation(implementation);
    } else {
      Object.defineProperty(dialogProto, method, {
        value: vi.fn(implementation),
        writable: true,
      });
    }
  };

  ensureDialogMethod('showModal', function showModal(this: HTMLDialogElement) {
    this.open = true;
    this.setAttribute('open', '');
  });

  ensureDialogMethod('close', function close(this: HTMLDialogElement) {
    if (!this.open) {
      return;
    }
    this.open = false;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  });
}

export {};
