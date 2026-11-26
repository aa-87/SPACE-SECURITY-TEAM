# MUMPS Academy — Foundations 1.0 release candidate

The current source includes 50 lessons in five modules, 196 prepared instruction states, ten visual laboratories, 30 reference entries, and the study desk. This is a release candidate, not a formal certification or a completed real-runtime audit.

## Study tools

The study desk includes module progress, last-visited lesson resumption, bookmarks, lesson/lab search with a link to filtered language-reference results, ten-question module reviews, and downloadable practice routines. Existing lesson IDs 01–50 are unchanged. Reviews reuse the lesson questions and do not confer lesson completion or certification.

Learning completion remains in sst.academy.progress.v1; bookmarks and last visited lesson use sst.academy.study.v1. The separate sst-academy-backup-v1 JSON backup merges completion and bookmarks, retains an existing last-visited lesson if present, validates IDs and requires confirmation. Import is limited to 64 KiB. Optimistic stale-write checks and best-effort rollback are not an atomic cross-tab transaction. Export separately from the personal workspace backup. Learning backup and tracker data are not encrypted by the application.

## Verification baseline

The repository's recorded browser/model CI run for the 1.0 implementation baseline completed successfully: [GitHub Actions run 45892533406](https://github.com/aa-87/efuhair.com/actions/runs/45892533406), commit 72bd766e415f3b77b8a8b9bceb3f9f461c519ea0. This covers the fixture and model suites, not execution of MUMPS programs or physical-device testing.

From the repository root:

```bash
node tests/local-data.test.js
node tests/academy-model.test.cjs
node tests/construction-model.test.cjs
node tests/string-model.test.cjs
node tests/application-model.test.cjs
node tests/study-model.test.cjs
npm install --no-save --no-package-lock @playwright/test@1.51.1
npx playwright install --with-deps chromium
npx playwright test
```

Node and Playwright are development-only dependencies. The fixture server is not MIOTPL.

## Real-runtime verification

Use a fresh, disposable learning database with its own global directory and database files, a configured YottaDB installation, and no production mappings. Verify ydb_dist and ydb_gbldir in the dedicated environment before running:

```bash
SST_LEARNING_DATABASE=YES node tests/academy-yottadb.test.cjs
```

The opt-in flag is an acknowledgment, not proof of isolation. The harness writes fictional ^SSTLearn data, creates temporary routine files and compares expected output in separate M processes. It includes curriculum examples and selected laboratory/project cases. A fresh database is needed for examples that expect no existing records. It does not verify every possible model input, all intermediate trace states, concurrent transaction behavior or formal language conformance. Actual execution remains pending as of this documentation update; do not assume the harness or all examples will pass unchanged.

## Manual review checklist

For each lesson 01–50:

- Read the explanation, objective and knowledge-check rationale.
- Check command syntax, leading whitespace, quoting, operator semantics and the lesson's language/environment classification against the official documentation.
- Predict each trace state; check the highlighted instruction, memory values and output.
- Run the downloadable or copied example in the isolated learning environment. Preserve line boundaries and leading spaces.
- Compare output and inspect state where possible. For READ, account for device-specific echo. For lesson 19, first execute lesson 18 against the same isolated database in another process.
- Check quiz correctness, practical task and links to the appropriate lab/reference.
- Record any discrepancy before marking the lesson reviewed.

Suggested review record (copy locally; use fictional inputs):

| Lesson | YottaDB version | Expected output/state | Observed output/state | Pass / discrepancy | Notes |
| --- | --- | --- | --- | --- | --- |
| 01 | | | | | |

For the laboratories, test normal cases and boundaries: empty versus undefined values, subtree removal, inclusive character positions, missing fields, invalid input, scope restoration, duplicate creation, missing records, canceled deletion, lock contention and transaction rollback. Compare the model only within its documented input domain.

## Live acceptance

Use an isolated browser profile. Review the dashboard, trackers and academy at 320, 375, 430 and 768 px widths and on desktop, in both themes. Verify physical iOS/Android devices where available, navigation, long code and text wrapping, keyboard/touch controls, lesson resumption, downloads, and the two repository links. Export a learning backup, import it in a separate test profile and confirm the expected merge. Reject malformed input without changing records. Check that learning actions do not alter personal observation data.

## Remaining release gates

- [ ] Manual accuracy review of all fifty lessons
- [ ] Actual YottaDB output and project verification
- [ ] Independent final practical assessment (not the existing module reviews)
- [ ] Learning backup failure/rollback and live device acceptance
- [ ] Final regression results and explicit release checkpoint

The next feature milestone should follow manual review and documented fixes, not merely the passing browser tests.

See [learning guide](MUMPS_LEARNING_GUIDE.md), [Foundations 0.5 project notes](ACADEMY_FOUNDATIONS_0_5.md), and [README](../README.md).
