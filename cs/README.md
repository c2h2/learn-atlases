# Computer Science Atlas (skeleton)

A detailed, interactive course through the undergraduate computer science curriculum — from a first
program and data structures to algorithms, computability and complexity, computer systems,
networks, databases, security and cryptography, artificial intelligence, graphics and software
engineering — in English and Simplified Chinese, on the same engine as [Maths Atlas](../maths/).
Plain PHP, no framework and no database.

**Status: curriculum skeleton.** All 22 courses and 197 chapters are defined, with taglines,
course and chapter summaries and prerequisites. Lessons, course overviews, outcomes, history,
references, the timeline, the Chinese translation and computer-science figures are still to be
written; missing chapters show as "to be written", and the site says "skeleton" in its title until
`MA_SKELETON` in `inc/bootstrap.php` is set to `false`.

| Year | Courses |
|---|---|
| 1 | Programming Fundamentals, Program Design, Data Structures, Computer Systems |
| 2 | Algorithms, Theory of Computation, Operating Systems, Computer Networks, Databases, Software Engineering, Programming Languages |
| 3 | Compilers, Computational Complexity, Parallel Computing, Computer Security, Cryptography, Artificial Intelligence, Computer Graphics, Human–Computer Interaction |
| 4 | Distributed Systems, Information Retrieval, Quantum Computing |

Areas: programming and languages, algorithms and theory, computer systems, networks and
distributed systems, security and cryptography, data and intelligence, and software and
interaction. Discrete mathematics, probability and linear algebra are taught in
[Maths Atlas](../maths/), digital logic and computer architecture in the
[Electrical Engineering Atlas](../ee/), and machine learning and language models in the
[LLM Atlas](../llm/); lessons here link to them rather than repeat them.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, accuracy rules, security
  rules, notation for algorithms and code). Every lesson is written by hand to that standard —
  never generated from templates.
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for computer-science figures
  such as sorting, hash tables, search trees, automata and Turing machines, caches, scheduling,
  TCP congestion control, Raft, toy RSA, rasterisation and quantum circuits).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, mathematics and
  computer-science terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
