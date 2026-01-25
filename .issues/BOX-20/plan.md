# BOX-20 Implementation Plan

## Summary

Rename @box-model/ui to @box-model/web for IP timestamping and clarity.

**Naming decision:** `@box-model/web` + `@box-model/rsd`
- `web` references the W3C Custom Elements standard
- `rsd` is a recognized acronym in the React ecosystem
- Avoids confusion since RSD also targets web

**Deferred to separate issues:**
- BOX-21: Add MIT LICENSE file
- BOX-22: Scaffold @box-model/rsd library

## Scope

**157 references** to `@box-model/ui` across 80+ files

---

## Implementation Phases

### Phase 1: Update Configuration Files

Update in this order before renaming directory:

| File | Changes |
|------|---------|
| `libs/web/project.json` | `"name": "ui"` → `"web"`, update all path refs |
| `libs/web/package.json` | `"name": "@box-model/ui"` → `"@box-model/web"` |
| `libs/web/vite.config.ts` | Cache/output paths from `ui` → `web` |
| `libs/web/.storybook/vite.storybook.ts` | Cache paths and aliases |
| `tsconfig.base.json` | Path alias `@box-model/web/*` → `@box-model/web/*` |
| `package.json` (root) | Scripts: `nx run ui:*` → `nx run web:*` |
| `libs/tokens/project.json` | Token copy destination path |
| `apps/box-model-app/tsconfig.app.json` | Type path references |

### Phase 2: Rename Directory

```bash
mv libs/ui libs/web
```

### Phase 3: Bulk Update Import References

Replace across all files:
- `@box-model/web/` → `@box-model/web/`
- `@box-model/ui'` → `@box-model/web'`

**Files affected:**
- `libs/web/src/**/*.stories.ts` (27 files)
- `libs/web/src/**/*.mdx` (35 files)
- `libs/storybook-utils/src/**/*` (2 files)
- `apps/box-model-app/src/**/*` (7 files)
- `AI-README.md`

### Phase 4: Update Documentation

Update `AI-README.md` to reflect new package name and paths.

### Phase 5: Clean and Verify

```bash
npx nx reset                           # Clear NX cache
npx nx build web          # Verify build
npx nx test web           # Verify tests
npx nx storybook web      # Verify storybook launches
```

---

## Verification Checklist

- [ ] `npx nx build web` succeeds
- [ ] `npx nx test web` passes
- [ ] `npx nx storybook web` launches
- [ ] No grep results for `@box-model/ui` (except .issues/ history)

---

## Commit Strategy

Single commit for the rename:
```
refactor(libs): rename @box-model/ui to @box-model/web

- Rename libs/web/ directory to libs/web/
- Update package name to @box-model/web
- Update all imports and path aliases
- Update NX project configuration

"web" references W3C standard, parallel with future @box-model/rsd
```

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Rename breaks imports | Search all files for `@box-model/ui` before committing |
| NX cache issues after rename | Run `npx nx reset` |
| Storybook config breaks | Verify storybook target is updated in project.json |
