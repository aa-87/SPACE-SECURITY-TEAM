# Learning MUMPS with MUMPS Academy

[Start learning](https://efuhair.com/learn) · [Visual laboratories](https://efuhair.com/learn/lab) · [Language reference](https://efuhair.com/learn/reference) · [Project README](../README.md)

## Who this is for

Anyone learning programming for the first time, as well as programmers who want to understand M on its own terms. No previous language, database knowledge, account or local installation is required for the guided browser lessons. Real execution requires a configured M implementation; YottaDB is the implementation used in this course.

MUMPS (also called M) combines executable instructions, expressions, hierarchical variables and database-backed global variables. The academy starts with the language itself rather than an industry or existing application.

## How to study

Read the objective. Predict the output before stepping through the prepared trace. Inspect the memory and output after each instruction. Change one input in a related laboratory. Answer the knowledge check, write a variant yourself, and compare the result in a real learning environment. Keep notes on discrepancies.

| Stage | Lessons | Suggested practice |
| --- | --- | --- |
| Fundamentals | 01–10 | Write a greeting, calculate a value, make a decision and repeat an instruction |
| Hierarchical information | 11–20 | Create sparse records, inspect nodes, traverse keys and build a contact directory |
| Program construction | 21–30 | Call a routine, protect variables, pass parameters and return a calculation |
| Data manipulation | 31–40 | Extract, split, transform and validate a delimited record |
| Application development | 41–50 | Design a record, reject invalid input, test operations and build a journal |

Use the study desk to resume the last visited lesson, bookmark concepts and review modules. The ten-question module reviews reuse lesson questions; they are practice, not independent assessments. Completion requires a lesson's guided trace and correct knowledge-check answer. The displayed lesson durations are estimates, not deadlines.

## Set up a real practice environment

1. Follow the official [YottaDB installation and operations guide](https://docs.yottadb.com/AdminOpsGuide/basicops.html) for your Linux environment.
2. Configure a separate, disposable learning global directory **and its underlying database files**. Never reuse production database mappings.
3. Confirm the configured executable and routine search path. The academy cannot configure your local database from the browser.
4. Enter Direct Mode from your configured shell:

```bash
yottadb -direct
```

At the M prompt, type:

```mumps
WRITE "Hello, world!",!
SET name="Alex"
WRITE "Hello, ",name,!
```

The expected output includes Hello, world! and Hello, Alex. The exclamation mark in WRITE emits a newline. Use HALT to leave Direct Mode. Shell commands and M commands are different environments.

## Core language ideas

| Concept | Example | Meaning |
| --- | --- | --- |
| Assignment | `SET count=4` | Store a value |
| Output | `WRITE count,!` | Display the value and a newline |
| Concatenation | `WRITE "A"_"B",!` | Join strings |
| Expression order | `WRITE 2+3*4,!` | Produces 20; parentheses can change grouping |
| Subscripts | `SET city("Alex")="Boston"` | Address a node by a key |
| Node inspection | `WRITE $DATA(city("Alex")),!` | Report value/descendant presence |
| Safe retrieval | `WRITE $GET(city("Sam"),"Unknown"),!` | Return fallback if undefined |
| Traversal | `SET name=$ORDER(city(""))` | Retrieve the first key in this example |
| Scope | `NEW count` | Protect the previous state of a local name |
| Pattern | `WRITE "A12"?1U2N,!` | Test the whole value against a pattern |

M evaluates binary operators in expression order from left to right unless parentheses change grouping. Character positions in the illustrated string functions are one-based. A defined empty value is distinct from an undefined node. A node can have a value and descendants simultaneously. $DATA returns 0, 1, 10 or 11 accordingly. An ordinary DO call does not automatically isolate local variables. These are essential concepts to practice rather than memorize in isolation.

A caret-prefixed reference such as ^SSTLearn identifies a global, backed by the configured database. It may persist between processes and may be shared. A lock coordinates cooperating processes; it is not access control. Transaction restart, isolation and recovery deserve separate study. Never experiment with KILL on an unfamiliar global.

## Save a routine

Create HELLO.m in the configured routine directory. A label begins in the first column; preserve the leading space before command lines.

```mumps
HELLO
 NEW name
 SET name="Alex"
 WRITE "Hello, ",name,!
 QUIT
```

From the configured shell:

```bash
yottadb -run ^HELLO
```

The expected output is Hello, Alex. The lesson download controls produce routine source files for local practice. Read any prerequisites in the lesson before running them; for example, the persistence lesson depends on the value written by the preceding lesson.

## Practical milestones

- [Lesson 20](https://efuhair.com/learn/lesson/20): persistent contact directory.
- [Lesson 30](https://efuhair.com/learn/lesson/30): reusable calculator.
- [Lesson 40](https://efuhair.com/learn/lesson/40): delimited record formatter, not a general CSV parser.
- [Lesson 50](https://efuhair.com/learn/lesson/50): terminal journal, with [downloadable source](../public/space-security/academy/projects/SSTJOURNAL.m.txt).

For each project, predict the output, run the example in an isolated environment, change one input, test valid and invalid cases, and explain the resulting state. Use fictional data only.

## What the academy does and does not execute

The ten browser laboratories use prepared or bounded JavaScript teaching models. They are not a general M interpreter, compiler, debugger or database. The string/pattern tools constrain inputs to printable ASCII and specific operations; the tree tool uses a limited key domain, not full M collation. The reliability model omits real concurrency and restart behavior. No learner code is sent to a public execution endpoint.

The course follows standard MUMPS concepts with full command names first. ANSI/MDC X11.1-1995 and ISO/IEC 11756:1999 guide the curriculum; this is not an exhaustive standards specification or a certification. YottaDB-specific environment and implementation behavior are separate subjects.

## Further reading

- [YottaDB M Programmer's Guide](https://docs.yottadb.com/ProgrammersGuide/)
- [Language features](https://docs.yottadb.com/ProgrammersGuide/langfeat.html)
- [Commands](https://docs.yottadb.com/ProgrammersGuide/commands.html)
- [Functions](https://docs.yottadb.com/ProgrammersGuide/functions.html)
- [Implementation extensions](https://docs.yottadb.com/ProgrammersGuide/langext.html)
- [Development cycle](https://docs.yottadb.com/ProgrammersGuide/devcycle.html)
- [MUMPS.IO web server](https://github.com/aa-87/mumps.io)
- [Foundations 1.0 verification and review](ACADEMY_FOUNDATIONS_1_0.md)

Report discrepancies with the lesson number, exact source, expected and observed result, YottaDB version and relevant environment details. Do not include personal records or credentials.
