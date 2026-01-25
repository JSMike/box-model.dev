# Plan: BOX-38 - Rename RSD apps and extract shared app logic

<!-- Plan Metadata -->
| Field        | Value                              |
|--------------|-------------------------------------|
| Created      | 2026-01-24                          |
| Author       | Agent                               |
| Approach     | Proposed                            |

## Steps
1) Rename app directories and update `project.json` names + `sourceRoot` paths.
2) Update references to old app names across configs, scripts, docs, and e2e.
3) Create `libs/rsd-app` and move shared Expo app logic (screens/app) into it.
4) Update Expo app to import from the shared library; leave Next.js integration minimal but ready.
5) Record session summary and update issue index/status.
