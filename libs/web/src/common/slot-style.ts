import { isServer } from 'lit';

class SlotStyleService {
  slotStyles: { [key: string]: CSSStyleSheet } = {};

  isInShadow(node: Node): boolean {
    return node.getRootNode() instanceof ShadowRoot;
  }

  getAdoptedStylesheets(self: Node): CSSStyleSheet[] {
    if (isServer) return [];
    if (this.isInShadow(self)) {
      return (self.getRootNode() as ShadowRoot).adoptedStyleSheets;
    }
    return document.adoptedStyleSheets || [];
  }

  setSlotStyles({ target, styles, name }: { target: HTMLElement; styles: string; name: string }) {
    if (isServer) return;
    if (!this.slotStyles[name]) {
      this.slotStyles[name] = new CSSStyleSheet();
      this.getAdoptedStylesheets(target).push(this.slotStyles[name]);
      this.slotStyles[name].replaceSync(styles);
    } else {
      const adoptedStyles = this.getAdoptedStylesheets(target);
      if (!adoptedStyles.includes(this.slotStyles[name])) {
        adoptedStyles.push(this.slotStyles[name]);
      }
      if (this.slotStyles[name].cssRules[0]?.cssText !== styles.replaceAll(/(\s|\n)+/g, ' ')) {
        this.slotStyles[name].replaceSync(styles);
      }
    }
  }

  removeStyle({ target, name }: { target: HTMLElement; name: string }) {
    if (isServer) return;
    if (this.slotStyles[name]) {
      const adoptedStyles = this.getAdoptedStylesheets(target);
      const index = adoptedStyles.indexOf(this.slotStyles[name]);
      if (index > -1) {
        adoptedStyles.splice(index, 1);
      }
    }
  }
}

export const slotStyleService = new SlotStyleService();
