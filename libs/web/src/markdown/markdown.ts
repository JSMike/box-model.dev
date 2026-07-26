import { html, LitElement, unsafeCSS } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token.mjs';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItContainer from 'markdown-it-container';
import hostStyles from './markdown.host.scss?inline';
import '../alert';
import '../banner';
import '../button';
import '../card';
import '../columns';
import '../divider';
import '../stat';
import '../tooltip';
import { ButtonBox } from '../button';
import { LinkBox } from '../link';
import type { AlertVariant } from '../alert';
import type { BannerVariant } from '../banner';
import type { ButtonSize, ButtonVariant } from '../button';
import type { LinkSize, LinkVariant } from '../link';
import type { StatTrend } from '../stat';
import type { ColumnsGap } from '../columns';

type ContainerAttributeSanitizer = (value: string) => string | undefined;

type ContainerSpec = {
  name: string;
  tag: string;
  attributes?: Record<string, ContainerAttributeSanitizer>;
  defaults?: Record<string, string>;
  validate?: (params: string, markup: string) => boolean;
};

type LinkContext = {
  wrapper: typeof LinkBox | typeof ButtonBox;
};

export const MarkdownBox = 'markdown-box';

/**
 * Renders markdown content into HTML.
 * @slot - Default slot content.
 * @csspart content - Primary content region.
 */
@customElement(MarkdownBox)
export class Markdown extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  @state() private renderedHtml = '';
  private mutationObserver?: MutationObserver;
  @query('slot') private markdownSlot?: HTMLSlotElement;
  private hasSyncedInitialContent = false;
  private initialRawContent?: string;
  private hasHandledFirstSlotChange = false;

  /** Automatically convert URLs into links. */
  @property({ type: Boolean, reflect: true }) linkify = true;

  private readonly markdown = this.createMarkdownRenderer();

  override connectedCallback() {
    this.syncInitialRenderedContent();
    super.connectedCallback();
  }

  override firstUpdated() {
    this.updateMarkdownObservers();
  }

  protected override updated(changed: PropertyValues) {
    if (changed.has('linkify')) {
      this.markdown.set({ linkify: this.linkify });
      if (changed.get('linkify') !== undefined) {
        this.updateRenderedContent();
      }
    }
  }

  override disconnectedCallback() {
    this.mutationObserver?.disconnect();
    super.disconnectedCallback();
  }

  private createMarkdownRenderer() {
    const renderer = new MarkdownIt({
      // Raw HTML is deliberately disabled. Markdown input is user-controlled in many consumers,
      // and this component renders the generated output with unsafeHTML.
      html: false,
      linkify: this.linkify,
      typographer: true,
    });

    renderer.use(markdownItAttrs, {
      // Only attributes consumed by the link wrapper are supported. In particular, never allow
      // event-handler attributes from Markdown input.
      allowedAttributes: ['type', 'variant', 'size'],
    });

    const linkStack: LinkContext[] = [];
    const defaultLinkOpen =
      renderer.renderer.rules.link_open ??
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
    const defaultLinkClose =
      renderer.renderer.rules.link_close ??
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    renderer.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const rawType = token.attrGet('type');
      const useButtonWrapper = rawType === 'button';
      if (rawType) {
        removeAttribute(token, 'type');
      }

      const wrapper = useButtonWrapper ? ButtonBox : LinkBox;
      const variant = useButtonWrapper
        ? sanitizeButtonVariant(token.attrGet('variant'))
        : sanitizeLinkVariant(token.attrGet('variant'));
      const size = useButtonWrapper
        ? sanitizeButtonSize(token.attrGet('size'))
        : sanitizeLinkSize(token.attrGet('size'));

      if (variant) {
        removeAttribute(token, 'variant');
      }

      if (size) {
        removeAttribute(token, 'size');
      }

      linkStack.push({ wrapper });

      const wrapperAttrs = [
        variant ? ` variant="${variant}"` : '',
        size ? ` size="${size}"` : '',
      ].join('');

      return `<${wrapper}${wrapperAttrs}>${defaultLinkOpen(tokens, idx, options, env, self)}`;
    };

    renderer.renderer.rules.link_close = (tokens, idx, options, env, self) => {
      const closing = defaultLinkClose(tokens, idx, options, env, self);
      const context = linkStack.pop();
      if (!context) {
        return closing;
      }
      return `${closing}</${context.wrapper}>`;
    };

    this.registerContainer(renderer, {
      name: 'alert',
      tag: 'alert-box',
      attributes: {
        variant: (value) => sanitizeEnum(value, ALERT_VARIANTS),
      },
      defaults: { variant: 'info' },
    });

    this.registerContainer(renderer, {
      name: 'banner',
      tag: 'banner-box',
      attributes: {
        variant: (value) => sanitizeEnum(value, BANNER_VARIANTS),
      },
      defaults: { variant: 'default' },
    });

    this.registerContainer(renderer, {
      name: 'card',
      tag: 'card-box',
      attributes: {
        hoverable: (value) => (value === 'true' ? 'true' : undefined),
      },
    });

    this.registerContainer(renderer, {
      name: 'tooltip',
      tag: 'tooltip-box',
    });

    this.registerContainer(renderer, {
      name: 'divider',
      tag: 'divider-box',
    });

    this.registerContainer(renderer, {
      name: 'stat',
      tag: 'stat-box',
      attributes: {
        value: (value) => escapeAttribute(value),
        delta: (value) => escapeAttribute(value),
        trend: (value) => sanitizeEnum(value, STAT_TRENDS),
      },
    });

    this.registerContainer(renderer, {
      name: 'columns',
      tag: 'columns-box',
      attributes: {
        gap: (value) => sanitizeEnum(value, COLUMN_GAPS),
        'min-width': sanitizeLength,
      },
      defaults: {
        gap: 'md',
      },
      validate: (_params, markup) => markup.length >= 4,
    });

    return renderer;
  }

  private registerContainer(renderer: MarkdownIt, spec: ContainerSpec) {
    renderer.use(markdownItContainer, spec.name, {
      validate: (params: string, markup: string) => {
        if (!params.trim().startsWith(spec.name)) {
          return false;
        }
        if (spec.validate && !spec.validate(params, markup)) {
          return false;
        }
        return true;
      },
      render: (tokens: Token[], idx: number) => {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const attrSource = token.info.trim().slice(spec.name.length).trim();
          const attrs = {
            ...(spec.defaults ?? {}),
            ...this.parseAttributes(attrSource, spec.attributes),
          };
          const attrString = Object.entries(attrs)
            .map(([key, value]) => (value ? ` ${key}="${value}"` : ''))
            .join('');
          return `<${spec.tag}${attrString}>`;
        }
        return `</${spec.tag}>`;
      },
    });
  }

  private parseAttributes(
    source: string,
    sanitizers: ContainerSpec['attributes'] = {}
  ): Record<string, string> {
    if (!source) return {};
    const attributes: Record<string, string> = {};
    const regex = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(source)) !== null) {
      const key = match[1];
      const value = match[2] ?? match[3] ?? '';
      const sanitizer = sanitizers[key];
      if (!sanitizer) {
        continue;
      }
      const sanitizedValue = sanitizer(value);
      if (sanitizedValue) {
        attributes[key] = sanitizedValue;
      }
    }
    return attributes;
  }

  private handleSlotChange() {
    this.updateMarkdownObservers();
    const slotContent = this.readSlotMarkdownSource();
    if (!this.hasHandledFirstSlotChange) {
      this.hasHandledFirstSlotChange = true;
      if (this.initialRawContent !== undefined && slotContent === this.initialRawContent) {
        return;
      }
    }
    this.updateRenderedContent(slotContent);
  }

  private syncInitialRenderedContent() {
    if (this.hasSyncedInitialContent) {
      return;
    }
    const raw = this.readLightDomMarkdownSource();
    this.initialRawContent = raw;
    this.updateRenderedContent(raw);
    this.hasSyncedInitialContent = true;
  }

  private updateRenderedContent(preferredSource?: string) {
    const raw = preferredSource ?? this.readMarkdownSource();
    const hasContent = raw.trim().length > 0;
    const nextHtml = hasContent ? this.markdown.render(raw) : '';
    if (this.renderedHtml !== nextHtml) {
      this.renderedHtml = nextHtml;
    }
  }

  private readMarkdownSource(): string {
    const slotContent = this.readSlotMarkdownSource();
    if (slotContent.length > 0) {
      return slotContent;
    }
    return this.readLightDomMarkdownSource();
  }

  private readSlotMarkdownSource(): string {
    const assigned = this.markdownSlot?.assignedNodes({ flatten: true }) ?? [];
    return assigned.map((node) => node.textContent ?? '').join('');
  }

  private readLightDomMarkdownSource(): string {
    return Array.from(this.childNodes)
      .map((node) => node.textContent ?? '')
      .join('');
  }

  private updateMarkdownObservers() {
    const nodes = this.markdownSlot?.assignedNodes({ flatten: true }) ?? [];
    if (!this.mutationObserver) {
      this.mutationObserver = new MutationObserver(() => this.updateRenderedContent());
    }
    this.mutationObserver.disconnect();
    if (nodes.length === 0) return;
    for (const node of nodes) {
      this.mutationObserver.observe(node, {
        characterData: true,
        subtree: true,
        childList: true,
      });
    }
  }

  override render() {
    return html`
      <slot class="markdown-box__source" hidden @slotchange=${this.handleSlotChange}></slot>
      <div class="markdown-box__content" part="content">${unsafeHTML(this.renderedHtml)}</div>
    `;
  }
}

const LINK_VARIANTS: LinkVariant[] = ['primary', 'secondary', 'tertiary'];
const LINK_SIZES: LinkSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const BUTTON_VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary'];
const BUTTON_SIZES: ButtonSize[] = ['small', 'medium', 'large'];
const ALERT_VARIANTS: AlertVariant[] = ['info', 'success', 'warning', 'danger'];
const BANNER_VARIANTS: BannerVariant[] = ['default', 'info', 'success', 'warning', 'danger'];
const STAT_TRENDS: StatTrend[] = ['neutral', 'up', 'down'];
const COLUMN_GAPS: ColumnsGap[] = ['sm', 'md', 'lg'];

function sanitizeLinkVariant(value: string | null): LinkVariant | undefined {
  if (!value) return undefined;
  return LINK_VARIANTS.includes(value as LinkVariant) ? (value as LinkVariant) : undefined;
}

function sanitizeLinkSize(value: string | null): LinkSize | undefined {
  if (!value) return undefined;
  return LINK_SIZES.includes(value as LinkSize) ? (value as LinkSize) : undefined;
}

function sanitizeButtonVariant(value: string | null): ButtonVariant | undefined {
  if (!value) return undefined;
  return BUTTON_VARIANTS.includes(value as ButtonVariant) ? (value as ButtonVariant) : undefined;
}

function sanitizeButtonSize(value: string | null): ButtonSize | undefined {
  if (!value) return undefined;
  return BUTTON_SIZES.includes(value as ButtonSize) ? (value as ButtonSize) : undefined;
}

function sanitizeEnum<T extends string>(value: string | null, list: readonly T[]): T | undefined {
  if (!value) return undefined;
  return list.includes(value as T) ? (value as T) : undefined;
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeLength(value: string) {
  if (!value) return undefined;
  const lengthPattern = /^-?\d+(\.\d+)?(px|rem|em|%)$/;
  return lengthPattern.test(value) ? value : undefined;
}

function removeAttribute(token: Token, name: string) {
  const index = token.attrIndex(name);
  if (index >= 0 && token.attrs) {
    token.attrs.splice(index, 1);
  }
}
