# MUMPS Academy — Foundations 0.5

Fifty lessons, 196 guided instruction states, ten visual labs, thirty reference entries. Existing lesson IDs 01–40 and personal data keys remain unchanged.

## New curriculum

41 data modeling; 42 create; 43 read; 44 update/delete; 45 validation; 46 separation of responsibilities; 47 cooperative locks; 48 transactions; 49 testing; 50 persistent journal project.

New routes: /learn/lesson/41 through /learn/lesson/50, /learn/lab/application, /learn/lab/reliability.

## Project

Download public/space-security/academy/projects/SSTJOURNAL.m.txt, save as SSTJOURNAL.m in a configured routine directory and execute yottadb -run ^SSTJOURNAL. Use fictional records only in a fresh, disposable YottaDB learning environment with a separate global directory and database files. The routine writes ^SSTLearn("journal05",id,"title"/"body"). It does not use the actual website journal. IDs J000–J999 are supported; title length 1–40 and body length 1–120; pipe characters excluded to simplify the read result. The browser model additionally restricts text to printable ASCII. The terminal program is a small teaching example, not a production journal or a transaction API for nested callers. Its TSTART * form is taught using YottaDB's transaction behavior. No error recovery or authentication layer is provided. Deletion requires confirmation in the menu. The list operation is not a whole-database snapshot.

The reliability lab models one acquisition per process and one pending transaction. Actual incremental locks may be recursively acquired by their owner, and actual transactions have restart and isolation semantics beyond this model. No server execution endpoint or real database access is provided by browser labs.

## Verification

    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    node tests/construction-model.test.cjs
    node tests/string-model.test.cjs
    node tests/application-model.test.cjs
    npx playwright test

The four academy model suites passed 595 assertions in a JS harness (370 curriculum/tree, 116 construction, 65 strings, 44 application). This does not certify real M execution. New browser checks exercise duplicate records, invalid updates, cancellation and deletion, lock contention and commit/rollback. Existing quality checks extend to the new labs and lesson 50.

For actual YottaDB verification, follow ACADEMY_FOUNDATIONS_0_3.md and use a fresh disposable database. The extended harness writes fictional global records; never use production mappings. Actual runtime execution remains unverified in this development session.

    SST_LEARNING_DATABASE=YES node tests/academy-yottadb.test.cjs

## Deployment after successful merge

    git pull --ff-only origin main
    node tests/application-model.test.cjs
    bash scripts/sync-to-mumpsio.sh ../mumps.io

Reload SPACETEAM.m, rebuild routes and refresh MIOTPL cache. Preserve mount=/public and root=public. The milestone is developed on development/foundations-0.5; main remains unchanged until a successful CI-gated merge.
