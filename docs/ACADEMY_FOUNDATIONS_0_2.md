# MUMPS Academy — Foundations 0.2

## Scope

Twenty lessons, seventy guided instruction states, four interactive laboratories, and a guided contact-directory project. Original lessons 01–10 and their completion identifiers are retained. The academy remains a traditional MPA: MIOTPL serves the academy document, and ordinary JavaScript controls the educational models.

Routes: /learn, /learn/foundations, /learn/reference, /learn/lesson/01 through /learn/lesson/20, /learn/lab, /learn/lab/trees, /learn/lab/expressions, /learn/lab/flow, /learn/lab/memory.

## Standards policy

Teach full command names and standard MUMPS constructs first. Label YottaDB environment and implementation-specific material separately. Consult the YottaDB Programmer's Guide for language behavior. Formal ANSI/ISO conformance has not been certified.

The tree laboratory supports only fixed nonempty ASCII name/field subscripts with ordinary string ordering, not general M collation. The arithmetic model supports bounded integer addition and multiplication, not general M evaluation. The flow model is a constrained IF/ELSE and bounded FOR demonstration. The local/global model simulates process restart in memory; it does not touch a database and resets on page reload. No arbitrary code execution endpoint exists.

Learning progress retains sst.academy.progress.v1. Laboratory interactions do not alter tracker or journal records, nor do they count as lesson completion.

## Verification

Run from the repository root:

    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    npx playwright test

The model suite covers curriculum structure, $DATA cases, empty versus missing values, subtree deletion, $GET fallback, traversal termination, quote escaping, arithmetic grouping, decision boundary and simulated persistence. It was exercised with 154 assertions using a JS harness. The Playwright suite is configured in CI; passing results must be checked for the final commit.

For actual M verification use a separate, disposable YottaDB learning environment with its own global directory and database. Never point lessons involving ^SSTLearn at a production database. Run each lesson in a fresh process, preserving line boundaries and leading spaces in routines. For lesson 06 supply Alex as input; terminal echo can differ from the prepared trace. For lesson 19 first execute lesson 18 in another process against the same learning database. For lesson 20 save the code as SSTCONTACT.m and run yottadb -run ^SSTCONTACT in a fresh learning database; expect Alex: Boston and Sam: Chicago on separate lines. Verify all shown output and inspect memory where appropriate. Prepared traces sometimes omit unchanged nodes as noted in the lesson. The real-runtime verification is pending.

## Deployment

    git pull --ff-only origin main
    node tests/local-data.test.js
    node tests/academy-model.test.cjs
    bash scripts/sync-to-mumpsio.sh ../mumps.io

Reload SPACETEAM.m, refresh MIOTPL cache, and rebuild routes using the host's existing procedure. MIOSTATIC mount=/public and root=public remain unchanged.

Recovery branch: checkpoint/pre-foundations-0.2. The source checkpoint is not a backup of browser records.
