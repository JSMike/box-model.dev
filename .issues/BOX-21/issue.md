# BOX-21: Add MIT LICENSE file to repository

<!-- Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Status       | done                                |
| Owner        | Agent                               |
| Completed    | 2026-01-24                          |
| Created      | 2026-01-24                          |
| Source       | BOX-20 (deferred)                   |
| External     |                                     |
| Blocks       |                                     |
| Blocked-by   |                                     |
| Priority     | medium                              |

## Summary

Add a proper MIT LICENSE file to the repository root. The `package.json` already declares `"license": "MIT"` but no LICENSE file exists. This is important for:
- Clear open source licensing for consumers
- IP provenance documentation
- npm publishing requirements

## Context

This was identified during BOX-20 (project restructuring for IP timestamping) but deferred to keep that issue focused on the core restructuring work.

The project owner is establishing timestamped evidence of IP provenance before signing employment agreements. A proper LICENSE file is part of this effort but is straightforward enough to handle separately.

## Investigation Needed

1. **Copyright holder** - Determine the correct copyright line:
   - Individual name?
   - "Box Model Contributors"?
   - Year(s) to include?

2. **LICENSE vs LICENSE.md** - Standard is `LICENSE` (no extension) but some projects use `.md`

3. **Per-package licenses** - Decide if each `libs/*/` package needs its own LICENSE file or if root-level is sufficient for the monorepo

## Acceptance Criteria

- [x] LICENSE file exists at repository root
- [x] Copyright holder and year(s) are correct (Michael Cebrian, 2026)
- [x] File uses standard MIT license text
- [x] Decision documented on per-package licensing approach (root-level sufficient)

## References

- Related issues: BOX-20 (parent restructuring work)
- MIT License template: https://opensource.org/licenses/MIT
- Current package.json already has `"license": "MIT"`
