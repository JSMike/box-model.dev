# BOX-22 Session Summary - Docs Type Generic Fix

## Session Focus
Fixed TypeScript error in `libs/storybook-utils/src/docs/docs.tsx` where `Docs` interface couldn't extend union type `WebMeta | ReactMeta`.

## Problem
```typescript
// This doesn't work - can't extend a union type
type MetaLike = WebMeta | ReactMeta;
export interface Docs extends MetaLike { ... }
```

Error: "An interface can only extend an object type or intersection of object types with statically known members."

## Solution
Changed from interface extension to intersection type with generic parameter:

```typescript
type DocsExtension = {
  docs?: ApiDoc | ApiDoc[];
  attributes?: Record<string, AttributeDoc>;
  // ... other doc properties
};

export type Docs<TMeta = WebMeta | ReactMeta> = TMeta & DocsExtension;
```

Also fixed `component` property access at line 188:
```typescript
// Before (error: property doesn't exist on union)
selector: docs.component as string | undefined,

// After
selector: (docs as Record<string, unknown>).component as string | undefined,
```

## Files Modified
- `libs/storybook-utils/src/docs/docs.tsx`

## Verification
- IDE diagnostics show no errors in `docs.tsx`
- RSD story files have no type errors
- Default generic parameter allows existing `const meta: Docs = {...}` usage to continue working

## Status
**Complete** - Type errors resolved.
