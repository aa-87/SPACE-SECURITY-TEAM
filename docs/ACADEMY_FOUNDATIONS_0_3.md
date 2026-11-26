# MUMPS Academy — Foundations 0.3

## Scope

Thirty lessons, 121 prepared instruction states, six visual laboratories, and a reusable calculator project. IDs 01–20 and the existing local learning progress key are retained. No tracker schema changes, accounts, browser framework, or server-side code execution.

New lessons: 21 DO and QUIT; 22 nested calls; 23 shared locals; 24 NEW; 25 value parameters; 26 reference parameters; 27 extrinsic returns; 28 composed functions; 29 debugging; 30 calculator project.

New routes: /learn/lesson/21 through /learn/lesson/30, /learn/lab/routines, /learn/lab/construction.

The routine lab shows prepared but parameterized call frames with forward/back/reset, five modes and inputs 0–99. The construction lab assembles one of a fixed set of instructions per challenge and previews known output. These are not a full debugger, general interpreter, or arbitrary code runner. The nested call-stack concept is taught in lesson 22; the interactive lab uses a main invocation and one called entry at a time.

Standard MUMPS constructs are the teaching foundation. YottaDB is the implementation used for real runtime checks. Formal ANSI/ISO compliance has not been certified.

## Development verification

    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    node tests/construction-model.test.cjs
    npx playwright test

The academy and construction suites were exercised with 351 assertions in a JS harness. New browser cases cover scope restoration, reference parameters, extrinsic return, forward/backward tracing, wrong and correct repairs and mobile width. The existing desktop/mobile cases remain enabled. The curriculum route sweep now covers 30 lessons and has a 60-second test budget. Check the final commit's Actions results; full Chromium execution was not performed in the development session.

## Actual YottaDB verification (opt-in)

The new tests/academy-yottadb.test.cjs harness creates temporary M source/object files, launches YottaDB processes, and compares output to expected values. It checks the curriculum (lesson 06 uses a separate piped READ example because device echo differs), persistence between processes, 15 parameterized routine traces and every offered construction choice.

Use a fresh, disposable YottaDB learning environment, with its own global directory AND underlying database files. Confirm the mappings before running. Do not use any production global directory. The script writes ^SSTLearn("message") and two fictional ^SSTLearn("contact",...) records, and does not erase them afterward. The opt-in flag acknowledges this requirement; it does not independently verify database isolation.

After configuring and initializing the disposable database and confirming ydb_dist and ydb_gbldir:

    SST_LEARNING_DATABASE=YES node tests/academy-yottadb.test.cjs

Temporary routine files are removed automatically. Use the environment's own disposal procedure for the disposable database. Actual YottaDB execution remains unverified until this suite passes on a configured installation. The script is not run by the browser CI workflow, and Node is still a development-only tool.

## Deploy

    git pull --ff-only origin main
    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    node tests/construction-model.test.cjs
    bash scripts/sync-to-mumpsio.sh ../mumps.io

Reload SPACETEAM.m, rebuild the route table, refresh MIOTPL cache, and hard-refresh the browser. Preserve MIOSTATIC mount=/public, root=public.

Recovery: checkpoint/pre-foundations-0.3.
