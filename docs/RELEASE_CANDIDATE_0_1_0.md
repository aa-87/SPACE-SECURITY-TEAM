# v0.1.0 release candidate

This is a candidate, not a browser-certified release. The previous checkpoint remains at checkpoint/stabilization-2026-11-25.

## Changes
- Dashboard-first home, section shortcuts and collapsible founding information.
- Shared design-system.css across all four pages. Existing page-specific styles remain; this is an incremental consolidation, not a complete CSS rewrite.
- /?demo=1 provides 72 synthetic records (18 per tracker/journal). Charts use in-memory data; journal editing and backup tools are disabled. Theme preferences are still shared. Tracker links open normal personal pages, exiting demo.
- Development-only Playwright browser fixture and GitHub Actions workflow. Desktop and mobile emulation use Chromium; not Safari or actual iOS testing.

## Verification
20 local-data assertions passed in a simulated storage harness. All four demo datasets passed the shared validators. Changed JavaScript syntax and dashboard DOM ID references checked. Browser execution and live MIOTPL/YottaDB integration are not verified in this development session.

## Run from Ubuntu
```sh
git pull --ff-only origin main
node tests/local-data.test.js
npm install --no-save --no-package-lock @playwright/test@1.51.1
npx playwright install --with-deps chromium
npx playwright test
```
The fixture server substitutes the page into the actual layout; it does not exercise MIOTPL. CI runs the same test suite. Check the Actions tab for results, then perform the live acceptance checks in STABILIZATION_CHECKPOINT.md. Do not tag v0.1.0 before these pass.

## Deployment
Export your personal backup first. Run:
```sh
./scripts/sync-to-mumpsio.sh ../mumps.io
```
Restart or refresh the template cache normally. Static mount=/public, root=public remains unchanged. No Node runtime is required in production.

## Deferred
Full offline reload (service worker), encrypted exports, full CSS consolidation and private beta are separate follow-up work.
