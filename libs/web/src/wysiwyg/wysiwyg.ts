import { html, LitElement, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import hostStyles from './wysiwyg.host.scss?inline';
import slotStyles from './wysiwyg.slot.scss?inline';
import '../button';
import '../toolbar';
import '../textarea';
import { slotStyleService } from '../common/slot-style';

type WysiwygAction =
  | 'bold'
  | 'italic'
  | 'heading'
  | 'unordered-list'
  | 'ordered-list'
  | 'link'
  | 'banner'
  | 'divider'
  | 'card'
  | 'columns'
  | 'table';

const ACTIONS: {
  id: WysiwygAction;
  label: string;
  glyph?: string;
  render?: () => ReturnType<typeof html>;
}[] = [
  { id: 'bold', label: 'Bold', render: () => html`<strong>B</strong>` },
  { id: 'italic', label: 'Italic', render: () => html`<em>I</em>` },
  { id: 'heading', label: 'Heading', glyph: 'H2' },
  { id: 'unordered-list', label: 'Bulleted list', glyph: '•' },
  { id: 'ordered-list', label: 'Numbered list', glyph: '1.' },
  { id: 'link', label: 'Insert link', glyph: '🔗' },
  { id: 'banner', label: 'Insert banner', glyph: '📢' },
  { id: 'divider', label: 'Insert divider', glyph: '—' },
  { id: 'card', label: 'Insert card', glyph: '▢' },
  { id: 'columns', label: 'Insert columns', glyph: '▥' },
  { id: 'table', label: 'Insert table', glyph: '▦' },
];

export const WysiwygBox = 'wysiwyg-box';

/**
 * Markdown authoring toolbar with textarea.
 * @slot - Default slot content.
 * @csspart helper - Helper text region.
 * @csspart toolbar - Toolbar region.
 */
@customElement(WysiwygBox)
export class Wysiwyg extends LitElement {
  static override styles = unsafeCSS(hostStyles);

  /** Current value. */
  @property({ type: String }) value = '';
  @state() private textarea?: HTMLTextAreaElement;
  @query('slot') private editorSlot?: HTMLSlotElement;

  private readonly handleInput = () => {
    if (!this.textarea) return;
    this.value = this.textarea.value;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  };

  override connectedCallback(): void {
    super.connectedCallback();
    slotStyleService.setSlotStyles({
      target: this,
      styles: slotStyles,
      name: WysiwygBox,
    });
    this.updateComplete.then(() => this.connectTextarea());
  }

  override disconnectedCallback(): void {
    this.detachTextarea();
    super.disconnectedCallback();
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (changed.has('value') && this.textarea && this.textarea.value !== this.value) {
      this.textarea.value = this.value ?? '';
    }
  }

  private detachTextarea() {
    if (this.textarea) {
      this.textarea.removeEventListener('input', this.handleInput);
      this.textarea.classList.remove('wysiwyg-box__textarea');
      this.textarea = undefined;
    }
  }

  private connectTextarea() {
    const assigned = this.editorSlot?.assignedElements({ flatten: true }) ?? [];
    const next = assigned.find((node) => node.tagName?.toLowerCase() === 'textarea') as
      | HTMLTextAreaElement
      | undefined;
    if (next === this.textarea) return;
    this.detachTextarea();
    if (next) {
      this.textarea = next;
      this.textarea.classList.add('wysiwyg-box__textarea');
      if (this.value && this.textarea.value !== this.value) {
        this.textarea.value = this.value;
      } else {
        this.value = this.textarea.value;
      }
      this.textarea.addEventListener('input', this.handleInput);
    }
  }

  private focusTextarea() {
    this.textarea?.focus();
  }

  private handleSlotChange() {
    this.connectTextarea();
  }

  private handleAction(action: WysiwygAction) {
    if (!this.textarea) return;
    this.focusTextarea();
    switch (action) {
      case 'bold':
        this.wrapSelection('**');
        break;
      case 'italic':
        this.wrapSelection('*');
        break;
      case 'heading':
        this.insertHeading('## ');
        break;
      case 'unordered-list':
        this.prefixLines('- ');
        break;
      case 'ordered-list':
        this.prefixLines('1. ', true);
        break;
      case 'link':
        this.insertLink();
        break;
      case 'banner':
        this.insertBlock(`:::banner variant="info"\nBanner content\n:::\n`);
        break;
      case 'divider':
        this.insertBlock(`:::divider\n:::\n`);
        break;
      case 'card':
        this.insertBlock(`:::card\nCard content\n:::\n`);
        break;
      case 'columns':
        this.insertBlock(
          `::::columns gap="md" min-width="15rem"\n:::card\nFirst column content\n:::\n:::card\nSecond column content\n:::\n::::\n`
        );
        break;
      case 'table':
        this.insertBlock(
          `| Column 1 | Column 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n| Cell 3 | Cell 4 |\n`
        );
        break;
      default:
        break;
    }
    this.syncValue();
  }

  private wrapSelection(wrapper: string) {
    const textarea = this.textarea;
    if (!textarea) return;
    const { selectionStart = 0, selectionEnd = 0, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || 'text';
    const newValue =
      value.slice(0, selectionStart) +
      wrapper +
      selected +
      wrapper +
      value.slice(selectionEnd);
    textarea.value = newValue;
    const start = selectionStart + wrapper.length;
    const end = start + selected.length;
    textarea.setSelectionRange(start, end);
  }

  private insertHeading(prefix: string) {
    const textarea = this.textarea;
    if (!textarea) return;
    const { selectionStart = 0, selectionEnd = 0, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || 'Heading text';
    const heading = `${prefix}${selected}`;
    const newValue = value.slice(0, selectionStart) + heading + value.slice(selectionEnd);
    textarea.value = newValue;
    const start = selectionStart + prefix.length;
    const end = start + selected.length;
    textarea.setSelectionRange(start, end);
  }

  private prefixLines(prefix: string, enumerate = false) {
    const textarea = this.textarea;
    if (!textarea) return;
    const { selectionStart = 0, selectionEnd = 0, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || 'List item';
    const lines = selected.split('\n');
    const formatted = lines
      .map((line, index) => {
        const content = line || (enumerate ? `Item ${index + 1}` : 'List item');
        const marker = enumerate ? `${index + 1}. ` : prefix;
        return `${marker}${content.replace(/^\d+\.\s+/, '').replace(/^[-*]\s+/, '')}`;
      })
      .join('\n');
    const newValue = value.slice(0, selectionStart) + formatted + value.slice(selectionEnd);
    textarea.value = newValue;
    textarea.setSelectionRange(selectionStart, selectionStart + formatted.length);
  }

  private insertLink() {
    const textarea = this.textarea;
    if (!textarea) return;
    const { selectionStart = 0, selectionEnd = 0, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || 'Link text';
    const snippet = `[${selected}](https://example.com){variant="primary" size="md"}`;
    textarea.value = value.slice(0, selectionStart) + snippet + value.slice(selectionEnd);
    const start = selectionStart + 1;
    const end = start + selected.length;
    textarea.setSelectionRange(start, end);
  }

  private insertBlock(snippet: string) {
    const textarea = this.textarea;
    if (!textarea) return;
    const { selectionStart = 0, selectionEnd = 0, value } = textarea;
    const newValue = value.slice(0, selectionStart) + snippet + value.slice(selectionEnd);
    textarea.value = newValue;
    const cursor = selectionStart + snippet.length;
    textarea.setSelectionRange(cursor, cursor);
  }

  private syncValue() {
    if (!this.textarea) return;
    this.value = this.textarea.value;
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="wysiwyg-box__toolbar" part="toolbar">
        <toolbar-box>
          ${ACTIONS.map(
            (action) => html`
              <button
                type="button"
                data-action=${action.id}
                title=${action.label}
                @click=${() => this.handleAction(action.id)}
              >
                ${action.render ? action.render() : action.glyph ?? action.label}
              </button>
            `
          )}
        </toolbar-box>
      </div>
      <textarea-box fullwidth>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </textarea-box>
      ${this.value
        ? nothing
        : html`<p class="wysiwyg-box__helper" part="helper">Start typing above…</p>`}
    `;
  }
}
