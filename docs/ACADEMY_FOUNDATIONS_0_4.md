# MUMPS Academy — Foundations 0.4

Forty lessons, 160 guided instruction states, eight visual laboratories and a 26-entry searchable reference. Existing lesson IDs 01–30 and local progress key remain unchanged. No tracker data or server execution changes.

## New lessons
31 LENGTH characters; 32 EXTRACT; 33 FIND; 34 PIECE; 35 LENGTH pieces and traversal; 36 SET PIECE and SET EXTRACT; 37 TRANSLATE; 38 SELECT; 39 pattern matching; 40 record formatter.

## New routes
/learn/lesson/31 through /learn/lesson/40
/learn/lab/strings
/learn/lab/patterns
/learn/reference (expanded; original setup guide retained)

The string lab visualizes character/field positions, empty fields and selected ranges. It supports eight constrained operations. Inputs are printable ASCII, up to 120 characters, positions 1–121; delimiters must be nonempty (up to 12 characters), search strings nonempty (up to 40 characters), and replacements target existing fields/characters only. The mapping exercise demonstrates character replacement and removal. These restrictions are teaching-model limits, not general MUMPS language limits.

The pattern lab supports four fixed patterns and an ordered SELECT example with a fallback. It also includes a record formatter exercise, using simple delimited strings rather than CSV quoting. No arbitrary source execution. The reference catalog is introductory, not a complete ANSI/ISO specification; YottaDB shell commands are separately categorized.

## Verification

    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    node tests/construction-model.test.cjs
    node tests/string-model.test.cjs
    npx playwright test

Three academy suites passed 485 assertions in a JavaScript harness (304 curriculum/tree, 116 construction, 65 string). This is not a real YottaDB or browser run. Existing browser tests are retained, route coverage extends to forty lessons, and the quality viewport matrix includes the new labs and lesson 40. Check CI for final commit results. Physical-device and live MIOTPL verification are separate acceptance steps.

The opt-in runtime harness now includes string and pattern cases and correctly distinguishes direct instructions in lessons 31–39 from saved routines. Follow the disposable database requirements in ACADEMY_FOUNDATIONS_0_3.md before running it. Never use a production global directory. Actual YottaDB execution remains pending.

## Deploy

    git pull --ff-only origin main
    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    node tests/construction-model.test.cjs
    node tests/string-model.test.cjs
    bash scripts/sync-to-mumpsio.sh ../mumps.io

Reload SPACETEAM.m, rebuild routes, refresh MIOTPL cache and hard-refresh the browser. Static mount=/public and root=public are unchanged. Recovery: checkpoint/pre-foundations-0.4.
