# Stabilization checkpoint — 2026-11-25

Pre-change recovery branch: checkpoint/pre-stabilization-2026-11-25 (988f33d8d3fc50865dff6638eef38b586da32d3f).

Scope: root dashboard, timeline, journal, three standalone trackers, shared navigation, and complete backup/restore. No new tracking module, server endpoints, dependencies, or storage migration. Preserve the existing local-storage keys and MIOSTATIC mount=/public, root=public.

## Changes
- Shared local-data.js contract validates records, duplicate IDs, imports and backups; guards against stale writes using the loaded raw value. This is an optimistic check, not a cross-tab transaction or lock. Restore rolls back completed writes on failure when possible; rollback can fail. An explicit replace can replace unreadable data; merge/export rejects it.
- Journal supports milk and all-tracker reflections while preserving legacy both=cessation+breath; larger inputs and text.
- Cessation and breath logs gain edit/cancel; all three trackers use validated writes. Cessation composition is recorded retrospectively, not a recommended cessation method. Breath remains retrospective with no live hold timer or targets. Milk remains observational, not a calcium treatment.
- Short-term activity chart includes milk; recent activity previews are shortened; dashboard warns when a dataset cannot be read.

## Repeatable checks
From repository root with Node.js installed (development testing only):
    node tests/local-data.test.js

20 assertions exercised using the repository's test code with simulated storage. JS syntax and tracker DOM ID references checked. No browser engine or YottaDB runtime test performed in this review. Live site retrieval was unavailable. Do not mark the release browser-verified until the manual checks below pass.

## Browser acceptance checks
Use an isolated browser profile and synthetic records, not your personal data:
1. Open / and each of the three tracker URLs from the shared dropdown on desktop and a narrow mobile viewport. Verify header, keyboard navigation, active tracker, theme persistence and absence of console errors.
2. Create, edit, cancel and delete one test record in each tracker. Refresh to confirm persistence. Check invalid inputs and cancel a delete.
3. Write, edit, search, filter and delete journal notes for each tracker and all trackers. Verify legacy both scope remains distinct.
4. Check dashboard totals, 14-day bars, 12-month chart, filters, search and pagination. Empty data must not imply health outcomes.
5. Export individual tracker JSON and a complete backup, then test merge, replace and cancellation in an isolated profile. Verify older complete backups preserve milk records. Reject malformed and duplicate-ID data.
6. Open two tabs, edit in both, save the newer record first; confirm the stale tab refuses to overwrite it. Reload after preserving any unsaved draft.
7. Confirm dark/light readability, touch controls, and form reset behavior. Validate serving from / and GET of all local JS/CSS assets.

## Deployment
Export a private complete backup first. From the Space Security Team checkout:
    git pull --ff-only origin main
    node tests/local-data.test.js
    ./scripts/sync-to-mumpsio.sh ../mumps.io

Use your existing MIOTPL cache refresh/restart process and hard-refresh browser pages. The source checkpoint branch is not a backup of browser data. Keep the export separately. Backups/local storage are not encrypted by this app. Avoid restoring data while other tracker tabs are open.

## Rollback
Use a separate worktree to avoid losing current repository changes:
    git worktree add --detach ../sst-pre-stabilization checkpoint/pre-stabilization-2026-11-25
    bash ../sst-pre-stabilization/scripts/sync-to-mumpsio.sh "$(realpath ../mumps.io)"
Then restart/refresh caches. Extra new static files can remain unused. Older journal code does not recognize new milk/all scopes, so export current data before rollback; do not edit the journal under the older version if those scopes exist.
