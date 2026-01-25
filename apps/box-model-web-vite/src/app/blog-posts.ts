export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 'styling-the-light-dom',
    slug: 'styling-the-light-dom',
    title: "Don't use ::slotted() to style slotted content",
    date: '2026-01-25',
    excerpt:
      '::slotted() looks convenient until specificity, depth limits, and shadow-root boundaries bite you. Here’s a safer way to style slotted content inside the box.',
    tags: ['styling'],
    content: `::slotted() looks handy, but it falls apart in real-world components:

- **Specificity is weak.** A global rule like ${'`'}body { font-size: 16px; }${'`'} can override ${'`'}::slotted(*) { font-size: 14px; }${'`'} because ::slotted adds almost no weight.
- **Shallow reach.** ${'`'}::slotted(.foo)${'`'} only touches the first slotted node—no nested descendants or complex selectors.
 - **Shadow boundaries matter.** ::slotted only reaches nodes directly assigned to your slots. If your element is re-projected through another shadow root or those nodes never become your assigned slot children, your ::slotted rules won’t apply.

## A general, safer pattern

Use the component’s tag as the scope and adopt a CSSStyleSheet into *the correct root* when the element connects:

${'```'}typescript

function ensureSlotStyles(target: Element, sheet: CSSStyleSheet) {
  const root = target.getRootNode() as Document | ShadowRoot;
  if ('adoptedStyleSheets' in root && !root.adoptedStyleSheets.includes(sheet)) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
  }
}

class MenuBox extends HTMLElement {
  static slotSheet = new CSSStyleSheet();
  static slotStyles = ${'`'}
    menu-box [slot='trigger'] button {
      font-weight: 600;
      text-transform: uppercase;
    }

    menu-box > * {
      margin: 0;
    }

    menu-box [slot='content'] nav ul li a span.label {
      display: inline-block;
      text-decoration: underline;
    }
  ${'`'};

  static {
    MenuBox.slotSheet.replaceSync(MenuBox.slotStyles);
  }

  connectedCallback() {
    ensureSlotStyles(this, MenuBox.slotSheet);
  }
}
customElements.define('menu-box', MenuBox);
${'```'}

**Why this works:**

- You attach styles to the *root* that actually hosts the slotted content. If the component lives inside another shadow root, the stylesheet must be adopted there—not assumed to be on ${'`'}document${'`'}.
- Selectors use the component tag (e.g., ${'`'}menu-box [slot='trigger'] button${'`'}), so you get normal CSS specificity and full selector power.

**Caveat:** This assumes the slotted content stays inside the same root. If a wrapper component projects your slots again, the next parent up won’t have these styles unless you also adopt the sheet there—and the selectors may no longer match because the parent tag changes. Keep slot re-projection shallow, or provide a documented way to reuse the same stylesheet at each projection layer with appropriate selectors.

## What to remember

- Prefer adoptedStyleSheets scoped to the host tag instead of ::slotted.
- Always find the right root with ${'`'}getRootNode()${'`'}—don’t assume ${'`'}document${'`'}.
- Reuse one sheet per tag to avoid leaks.
- Use normal CSS selectors so specificity behaves predictably and nested elements can be styled.

Skip ::slotted() entirely. Adopt a stylesheet at the right root, scope it to your tag, and gain control of the styles for content passed to your custom element—stacking your boxes neatly instead of letting CSS fall out of shape.
`,
  },
  {
    id: 'naming-these-boxes',
    slug: 'naming-these-boxes',
    title: 'Naming these boxes (so you do not have to)',
    date: '2026-01-24',
    excerpt:
      'Naming systems are harder than writing code. Here’s how we keep tags, attributes, and value vocabularies aligned so everything fits inside the box.',
    tags: ['process'],
    content: `Naming is the hardest problem in a design system. Components, attributes, and their values all need to say the right thing—consistently—so people don’t waste cycles guessing.

## Why we obsess over words

- **Lower cognitive load.** Consumers shouldn’t stop to wonder whether it’s ${'`'}placement${'`'}, ${'`'}position${'`'}, or ${'`'}direction${'`'} this time. Maintainers shouldn’t either.
- **Durable APIs.** Consistent vocabularies survive new variants and products because they’re predictable.
- **Faster handoff.** When designers, engineers, and docs all use the same terms, there’s less translation overhead.

## Patterns we follow

- **Tags stay uniform.** Every custom element ends in ${'`'}-box${'`'} so the render surface is obvious.
- **Attributes reuse shared vocabularies.** If two components move or anchor something, they share the same attribute name and value set (e.g., ${'`'}placement="top|right|bottom|left"${'`'}).
- **Paired value sets.** Words like ${'`'}leading/trailing${'`'}, ${'`'}start/end${'`'}, ${'`'}left/right${'`'}, ${'`'}above/below${'`'}, ${'`'}before/after${'`'} are all valid—but we pick one pair per concept and stick with it.
- **TypeScript enforces it.** Shared string literal unions and derived types keep value sets in sync across components so “placement” means the same everywhere.

## How we choose terms

1. **Meaning first.** If motion or layout depends on an axis, we prefer ${'`'}start/end${'`'} or ${'`'}top/bottom${'`'}. If it’s relative to content flow, ${'`'}before/after${'`'} or ${'`'}leading/trailing${'`'} might be clearer.
2. **Reuse across components.** Dropdowns, tooltips, and drawers all use the same ${'`'}placement${'`'} values so consumers don’t context-switch.
3. **Document the vocabulary.** Every attribute/value pair is listed in the component docs and mirrored in TS types to prevent drift.

## What this buys us

- **For consumers:** Less guessing, fewer props to memorize, and more confidence when combining boxes.
- **For maintainers:** Easier refactors and simpler reviews—differences stand out when the vocabulary is stable.
- **For design:** Clearer handoff because the names in Figma, docs, and code match.

When everything is a box, the words around those boxes matter even more. We’d rather square away the names once than ask every consumer to puzzle out which box they’re opening.
`,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function parseBlogDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}
