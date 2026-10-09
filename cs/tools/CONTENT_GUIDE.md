# Computer Science Atlas — content guide

Computer Science Atlas (`/learn/cs/`) teaches the undergraduate computer science curriculum in
depth, from a first program to compilers, distributed systems, cryptography and quantum computing.
Every chapter is a long, self-contained lesson in the style of a very good textbook: motivation and
intuition first, then precise definitions, algorithms with proofs of correctness and analyses of
their cost, many fully worked examples (traces, tables, small programs), interactive figures, quick
checks, and graded exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

**Status: curriculum skeleton.** Every course and chapter is defined; no lesson is written yet.
Write each lesson **by hand**, to the standard below. Never generate lessons, course fields or
exercises from templates, word lists or scripts: a chapter is either written properly or it stays
"to be written". Placeholder text that only looks like a lesson is worse than no lesson.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
data/milestones.json               field-wide events for the timeline
```

The curriculum (22 courses, 197 chapters in seven areas: programming and languages, algorithms and
theory, computer systems, networks and distributed systems, security and cryptography, data and
intelligence, software and interaction; years 1–4) is fixed in the `course.json` files. **Do not
rename, add, remove or reorder courses or chapters**, because other lessons link to them.

Topics taught in the sibling atlases are not repeated here; link to them instead:
discrete mathematics, logic and proof, linear algebra, probability and number theory are in Maths
Atlas (`/learn/maths/`); digital logic, computer architecture and embedded systems are in the
Electrical Engineering Atlas (`/learn/ee/`); machine learning and language models are in the LLM
Atlas (`/learn/llm/`). Write such links as ordinary Markdown links (`[Maths Atlas: graphs](/learn/maths/lesson.php?c=discrete&l=graphs)`);
`[[…]]` references only reach chapters of this atlas.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Implement…", "Prove…", "Analyse…", "Design…", "Explain…"). |
| `history` | 5–10 events `{"year": 1936, "title": "…", "detail": "1–2 sentences", "people": ["Alan Turing"]}` in chronological order, each tied to a paper, system or result whose date you have checked (publication year unless the detail says otherwise). |
| `references` | 4–8 books `{"title", "authors", "year", "note"}` that students actually use — for example Cormen–Leiserson–Rivest–Stein, Kleinberg–Tardos, Sedgewick–Wayne, Sipser, Arora–Barak, Bryant–O’Hallaron, Arpaci-Dusseau, Kurose–Ross, Silberschatz–Korth–Sudarshan, Aho–Lam–Sethi–Ullman, Pierce, Russell–Norvig, Katz–Lindell, Anderson (*Security Engineering*), Kleppmann, Manning–Raghavan–Schütze, Nielsen–Chuang. `note` says what each is good for. Give the year of the edition you describe. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`, only earlier chapters of the same
course or chapters of prerequisite courses). Keep titles plain text: no `$…$`.

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}` — `area` being one of the seven area keys (`programming`, `theory`,
`systems`, `networks`, `security`, `data`, `software`). Candidates include Babbage’s Analytical
Engine and Lovelace’s notes, Boole’s algebra of logic, Turing’s and Church’s 1936 papers, Shannon’s
switching-circuit thesis, the stored-program design, FORTRAN and LISP, Dijkstra’s shortest-path
algorithm, ARPANET and Unix, Codd’s relational model, Cook’s and Karp’s NP-completeness papers,
Diffie–Hellman and RSA, TCP/IP, Lamport’s logical clocks, the World Wide Web, Shor’s algorithm,
PageRank, MapReduce and Raft. Check every date against a primary source or a standard history.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (`check.php` warns below 2,500). A student should be able to
  learn the topic from this page alone.
- **Numbered blocks** (≥ 3 in total): definitions of structures, models and problems; algorithms
  (`:::algorithm`); theorems and lemmas with proofs — correctness proofs (loop invariants,
  induction, exchange arguments), complexity bounds, reductions, impossibility results. State
  assumptions and the cost model. Mark empirical claims (benchmark results, observed performance)
  as observations, not theorems.
- **≥ 4 worked examples** (`:::example` with a `:::solution`): a trace of an algorithm on a small
  input with the state after every step, a recurrence solved, a protocol exchange written out, a
  query evaluated, an automaton built, a cost computed in cache misses, packets or bytes.
- **≥ 1 interactive figure** (§6), 2–3 is better, each with a caption saying what to try and
  what to notice.
- **≥ 1 quick check** (`:::quiz`), ideally 2–3 spread through the lesson; **≥ 1 `:::warning`**
  (common misconceptions: "hash tables are always O(1)", "HTTPS hides which site you visit", "a
  regular expression engine is always linear"…); **one `:::history` block**; a **`:::summary`**
  ("Key takeaways", 5–8 bullets) just before the exercises.
- **`## Exercises` with ≥ 8 exercises**, every one with a complete `:::solution`: about 3 routine
  (`level=1`), 3 standard (`level=2`) and 2+ challenging (`level=3`), including at least one proof
  or derivation and, where the subject allows, one small implementation. Add `check="…"` when the
  answer is a single number (a count, a cost, a probability) and say which number to enter
  ("(Enter the number of comparisons.)").

Suggested shape (adapt to the topic):

```
(intro paragraphs, no heading: a concrete problem that motivates the chapter)
## <first idea>            definitions, intuition, first examples
## <second idea>           algorithm or mechanism, correctness and cost, worked examples, figure, quick check
## …                       3–6 main sections in total
## In practice             optional: how real systems do it, with dates for anything that changes
## Where this leads        short: later chapters/courses that build on this one (with links)
:::summary
## Exercises
```

## 4. Writing style and accuracy

- Audience: undergraduates who have done the prerequisite chapters. Explain from scratch,
  motivate before formalising, then be exact. Show the reasoning, not just results.
- Voice: "we" for shared reasoning, "you" for instructions. Friendly, precise, unhurried. Avoid
  filler, hype and "obviously", "clearly", "trivially".
- **British spelling** (optimise, behaviour, analyse, colour, modelling, catalogue, licence as a
  noun) except in names, quotations, code and standard identifiers (`color` in CSS, `Serializable`).
- Sentence case for headings. Define a term the first time it is used (bold it: `**hash table**`).
- Original text only — never copy textbooks, documentation or code from other sources.
- **Correctness is non-negotiable.** Every program in a lesson must run as shown: test Python with
  `python3` (3.10 or later; numpy and sympy are installed), C with `gcc -std=c17 -Wall -Wextra`
  (and `-fsanitize=address,undefined` while testing), SQL with `sqlite3`, JavaScript with `node`.
  Check every trace, count, bound and table by running it. Proofs must prove exactly the stated
  result under the stated assumptions.
- **Accuracy over currency.** Teach principles that last. Date anything that changes — hardware
  figures, cache and memory sizes, protocol and standard versions (TLS 1.3, HTTP/3, IPv6
  deployment, the 2024 NIST post-quantum standards), language versions, popular tools — as "as of
  2026", and never present unverified details of commercial products as fact.
- **Neutral and fair.** No vendor marketing, no rankings of products or languages that will date;
  present design trade-offs, not tribal preferences.

### Security rules (security, cryptography, networks, systems)

- Teach attacks **conceptually and together with their defences**: what class of bug or design
  flaw makes an attack possible, why it works, and how systems detect, prevent or mitigate it.
- **No working exploits, malware, credential theft or attack tooling** against real systems: no
  shellcode, no weaponised proof-of-concept code, no step-by-step intrusion recipes, no phishing
  material, no instructions for evading detection, no real vulnerable targets.
- Examples run only **on the reader's own machine on toy programs** written for the lesson (a
  deliberately vulnerable 20-line C function compiled locally with protections explained, a toy
  web form on localhost, textbook-sized RSA numbers). Say so in the text.
- Cryptography: implement schemes only as **toy, insecure illustrations** and say so; tell readers
  to use vetted libraries in real code. Never invent or recommend home-made cryptography.
- Privacy: no real personal data; fictional people and data sets only.

## 5. Markup and notation

Markup is exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md`
§5 for blocks (`:::definition`, `:::theorem`/`:::lemma`/`:::proposition`, `:::proof`,
`:::example` + `:::solution`, `:::exercise`, `:::quiz`, `:::warning`, `:::intuition`,
`:::application`, `:::history`, `:::summary`), references (`[[#id]]`, `[[course/chapter]]`,
`[[course/chapter#id]]`), answer checks and KaTeX.

Computer-science conventions:

- **Algorithms** go in `:::algorithm Name {#alg-…}` blocks (numbered together with definitions and
  theorems and listed in the index). Inside, write the steps as a numbered list (nested lists for
  loop bodies) with inline maths (`$lo \gets 0$`), or as a fenced ```text block of pseudocode in
  the CLRS style (indentation shows structure, `←` or `=` for assignment — be consistent within a
  course). Follow it with a runnable implementation where useful.
- **Code listings**: fenced blocks with a language tag (```python, ```c, ```sql, ```text for
  pseudocode, ```console for shell sessions with `$ ` prompts). Keep listings short (≤ 40 lines),
  comment the non-obvious lines, and show the output when it matters. Identifiers in running text
  in backticks: `malloc`, `fork()`, `SELECT`.
- **Asymptotics**: $O(n \log n)$, $\Theta(n^2)$, $\Omega(n)$, $o(\cdot)$; say whether a bound is
  worst-case, average-case, expected or amortised. $\log$ is base 2 unless stated; write $\ln$ for
  natural logarithms.
- **Graphs** $G = (V, E)$ with $n = \lvert V\rvert$, $m = \lvert E\rvert$; weights $w(u, v)$.
  **Automata** $M = (Q, \Sigma, \delta, q_0, F)$; strings over $\Sigma$, $\Sigma^*$, empty string
  $\varepsilon$; languages $L$. **Complexity classes** in sans serif: $\mathsf{P}$, $\mathsf{NP}$,
  $\mathsf{PSPACE}$, $\mathsf{BPP}$, $\mathsf{BQP}$. **Quantum states** $\ket{\psi}$, $\bra{\phi}$.
- **Data and units**: bit (b) and byte (B); binary prefixes for memory (KiB, MiB, GiB) and decimal
  prefixes for rates (Mb/s, GB/s); hexadecimal with `0x`; times in ns, µs, ms.
- Site macros (`data/macros.json`) as in Maths Atlas: `\Prob \E \Var`, `\abs{x}`, `\set{…}`, `\N \Z`.

## 6. Interactive figures

The available types are in `data/widgets.json`; try each at `/learn/cs/lab.php?w=<type>`:
`plot` (functions, e.g. growth rates), `floatline` (floating-point numbers), `truthtable`,
`venn`, `relation`, `mapping`, `graph` (BFS, DFS, Dijkstra, Prim, Kruskal, topological sort, Euler
circuits — step by step), `cantor` (countability and diagonalisation), `permutation`, `pascal`,
`modular`, `euclid` (extended Euclid and the CRT), `sieve`, `markov`, `montecarlo`,
`distribution`, `bayes`, `regression`, `transform2d` (2D transformations for graphics) and
`gradientdescent`. Computer-science figures — sorting, hash tables, search trees and heaps,
automata and Turing machines, caches and page replacement, scheduling, TCP congestion control,
Raft, B+-trees, RSA and Diffie–Hellman, rasterisation and ray tracing, quantum circuits — are
planned in `tools/WIDGET_GUIDE.md`; use a type only once it is in the catalogue.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/cs
bash tools/check.sh <course> [<course> …]
```

This typesets every formula with KaTeX, validates figures, checks and references, and prints a
depth table per lesson. Fix every `ERROR`; depth `warn`ings must be gone for finished lessons.
Until then, `php tools/check.php` lists every missing lesson and empty course field as a warning:
its output is the to-do list. Preview at
`http://f.g77k.com/learn/cs/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).
Read your rendered lesson at least once.
