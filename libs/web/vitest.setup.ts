import { CSSStyleSheet as CSSStyleSheetShim } from '@lit-labs/ssr-dom-shim';
import { vi } from 'vitest';

// jsdom exposes an incomplete CSSStyleSheet. Use Lit's implementation and retain a spy for tests
// that need to assert stylesheet updates.
vi.stubGlobal('CSSStyleSheet', CSSStyleSheetShim);
vi.spyOn(CSSStyleSheet.prototype, 'replaceSync');

const adoptedStyleSheets = new WeakMap<
  Document | ShadowRoot,
  CSSStyleSheet[]
>();

function installAdoptedStyleSheets(
  prototype: typeof Document.prototype | typeof ShadowRoot.prototype
): void {
  if ('adoptedStyleSheets' in prototype) {
    return;
  }

  Object.defineProperty(prototype, 'adoptedStyleSheets', {
    configurable: true,
    get(this: Document | ShadowRoot): CSSStyleSheet[] {
      let styles = adoptedStyleSheets.get(this);
      if (styles === undefined) {
        styles = [];
        adoptedStyleSheets.set(this, styles);
      }
      return styles;
    },
    set(this: Document | ShadowRoot, styles: CSSStyleSheet[]) {
      adoptedStyleSheets.set(this, [...styles]);
    },
  });
}

installAdoptedStyleSheets(Document.prototype);
installAdoptedStyleSheets(ShadowRoot.prototype);

// Mock Element.getAnimations method for Vitest environment
Element.prototype.getAnimations = vi.fn().mockReturnValue([
  {
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
    timeline: null,
  },
]);

// Mock ResizeObserver for Vitest environment
const resizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', resizeObserver);

// Mock IntersectionObserver for Vitest environment
const intersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
  takeRecords: vi.fn(),
}));
vi.stubGlobal('IntersectionObserver', intersectionObserver);

// Prefer the native dialog prototype when jsdom exposes it, while retaining a
// fallback for environments that create dialog elements without the constructor.
const dialogPrototype =
  globalThis.HTMLDialogElement?.prototype ??
  (Object.getPrototypeOf(
    document.createElement('dialog')
  ) as HTMLDialogElement);

if (dialogPrototype) {
  const ensureDialogMethod = (
    method: 'showModal' | 'close',
    implementation: (this: HTMLDialogElement) => void
  ) => {
    if (typeof dialogPrototype[method] === 'function') {
      return;
    }

    Object.defineProperty(dialogPrototype, method, {
      configurable: true,
      value: vi.fn(implementation),
      writable: true,
    });
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
