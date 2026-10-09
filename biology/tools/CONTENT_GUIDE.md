# Biology Atlas — content guide

Biology Atlas (`/learn/biology/`) teaches the undergraduate biology curriculum in depth, from
molecules and cells to evolution and ecosystems. Every chapter is a long, self-contained lesson in
the style of a very good textbook: motivation and intuition first, then precise definitions,
mechanisms explained step by step, quantitative worked examples, interactive figures, quick checks,
and graded exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
```

The curriculum (21 courses, 187 chapters in seven areas: molecules and cells, genetics and genomics,
organisms, brain and behaviour, evolution and diversity, ecology and environment, and quantitative
biology; four years of study) is fixed in the `course.json` files. **Do not rename, add, remove or
reorder courses or chapters**, because other lessons link to them.

**Every lesson is written by hand to this standard.** Never generate lessons from a template, a
script or a frame-filling program: a chapter is either written properly or it stays "to be written"
(which is what the site shows while the file does not exist). `tools/check.php` reports placeholder
prose as an error.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Explain…", "Predict…", "Calculate…", "Interpret…"). |
| `history` | 5–10 events `{"year": 1953, "title": "…", "detail": "1–2 sentences", "people": ["Rosalind Franklin"]}` in chronological order, each tied to a paper, specimen or experiment whose date you can verify. Years before 1 AD are negative. |
| `references` | 4–8 textbooks, monographs or reviews `{"title", "authors", "year", "note"}` — the books students actually use (Alberts *Molecular Biology of the Cell*, Lodish, Campbell, Nelson & Cox *Lehninger*, Griffiths *Introduction to Genetic Analysis*, Futuyma & Kirkpatrick, Begon *Ecology*, Kandel *Principles of Neural Science*, Purves, Taiz & Zeiger, Gilbert *Developmental Biology*, Madigan *Brock Biology of Microorganisms*, Hartl & Clark, Durbin et al., Alon *An Introduction to Systems Biology*, Whitlock & Schluter). `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`, pointing only backwards: earlier
chapters of the same course, or chapters of a prerequisite course). Keep titles plain text: no
`$…$` (use Unicode such as α, β, μm, ×, → if needed).

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}` — from Hooke's cells and Linnaean naming through Darwin and Mendel,
the discovery of the double helix and the genetic code, to recombinant DNA, PCR, the first genome
sequences and modern structure prediction — `area` being one of the seven area keys.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation. A student should be able to learn the topic from this page
  alone. (The checker warns below 2,500.)
- **Definitions and results** as numbered blocks (≥ 3): definitions of structures, processes and
  measures, and `:::proposition` blocks for the quantitative statements of biology (the
  Hardy–Weinberg proportions, the Michaelis–Menten equation, the Nernst equation, the logistic and
  Lotka–Volterra models, the breeder's equation, allometric scaling). Derive them where a standard
  course derives them, and state the assumptions each one needs. Mark empirical regularities as
  such — Kleiber's law is an observation, not a theorem.
- **≥ 4 worked examples** with numbers: a cross and its expected ratios, a χ² test of those ratios,
  a Michaelis–Menten fit, a membrane potential from ion concentrations, a growth rate from a life
  table, an ATP yield per glucose, a map distance from recombinant counts, a doubling time, an
  E-value, an F-statistic.
- **≥ 1 interactive figure** (2–3 is better), **≥ 1 quick check**, **≥ 1 `:::warning`** (common
  misconceptions — "evolution has a goal", "dominant means common", "correlation shows causation",
  "mutations are always harmful"), one `:::history` block, a `:::summary`, and **≥ 8 exercises**
  with complete solutions (about 3 routine, 3 standard, 2+ challenging, including at least one
  calculation and one interpretation of data). Add `check="…"` when the answer is a single number.
- Use `:::application` for medicine, agriculture, biotechnology and conservation, and
  `:::intuition` for the picture behind a mechanism.
- Short code listings (Python with NumPy, SciPy or Biopython) where they clarify an algorithm or a
  model; keep them runnable and show units or array shapes in comments.

## 4. Writing style and accuracy

- Audience: undergraduates who have read the prerequisite chapters. Explain from scratch, motivate
  before formalising, then be exact. Link to Maths Atlas (`/learn/maths/`) for mathematical tools
  and to Chemistry Atlas (`/learn/chemistry/`) for chemical background.
- **British spelling** (colour, behaviour, analyse, oxidise, haemoglobin, foetal, ageing, sulfur as
  the IUPAC form) except in quotations and in the published titles of works.
- Voice: "we" for shared reasoning, "you" for instructions. Precise and unhurried; avoid "obviously".
- **Correctness is non-negotiable.** Verify every calculation with `python3` (numpy, scipy and
  biopython are available). Check gene, protein and species names against a current authority, and
  do not state a mechanism as settled when the literature is divided — say what is known and how.
- **Date fast-moving facts.** Sequencing costs, the number of sequenced genomes or described
  species, the resolution of structure prediction, taxonomy and gene nomenclature all change: write
  "as of 2026" (or the year of the source) and cite the source for any such number.
- **Attribute discoveries** to the people and papers that made them, with the year, and name the
  organism the work was done in.
- **No medical advice.** Clinical medicine, human anatomy, medical physiology, immunology and
  clinical microbiology belong to Medicine Atlas (`/learn/medicine/`), which carries its own
  education-only disclaimer. Here, keep human material comparative and mechanistic; never give
  diagnostic criteria, doses or anything a reader could take as guidance for their own health, and
  link the Medicine Atlas instead.
- **Biosafety and biosecurity.** Explain mechanisms conceptually, at the level of a textbook
  diagram. Lessons must not contain operational detail: no protocols for obtaining, culturing,
  modifying or transmitting pathogens or toxins, nothing about increasing the transmissibility,
  host range or virulence of an agent, and no step-by-step wet-lab procedures beyond the benign
  standard practicals of a teaching laboratory (a Mendelian cross, a gel, a PCR of a harmless
  template, a growth curve of a laboratory strain). Where a mechanism of pathogenesis or a dual-use
  technique is part of the syllabus, describe what is known and why it matters, and point to
  containment, regulation and defence rather than to method. The same restraint applies to
  exercises and figure captions.
- **Animals, people and ethics.** Describe experiments in the standard scientific register and
  mention ethical frameworks and regulation where they are part of the subject (animal research,
  human genetics, gene editing, field collection). Use person-first language, avoid outdated or
  value-laden terms for human groups, and never present human population genetics in racial terms.
- Original text only — never copy a textbook or a paper. Do not use copyrighted figures; interactive
  figures are generated by the site's own code.

## 5. Markup

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
blocks (`:::definition`, `:::theorem`/`:::proposition`, `:::proof`, `:::example` + `:::solution`,
`:::exercise`, `:::quiz`, `:::warning`, `:::intuition`, `:::application`, `:::history`,
`:::summary`, `:::algorithm` for procedures such as Needleman–Wunsch or the Gillespie algorithm),
references (`[[#id]]`, `[[course/chapter]]`, `[[course/chapter#id]]`), answer checks and KaTeX.

Notation used across the atlas:

- **Genes italic, proteins upright**, with the convention of the organism: human *BRCA1* / BRCA1,
  mouse *Brca1* / Brca1, *Drosophila* *white* / White, bacterial *lacZ* / LacZ (β-galactosidase).
  Mutant and wild-type alleles as in the field: *w^1118^*, *lacZ*^−^, *CDKN2A*^+/−^. Say which
  convention you are using the first time it could be ambiguous.
- **Species names in italics**, genus capitalised, species epithet lower case: *Escherichia coli*,
  *Arabidopsis thaliana*, *Homo sapiens*. Abbreviate the genus after first use (*E. coli*). Strain
  designations are upright (*E. coli* K-12 MG1655). Higher taxa are upright and capitalised
  (Mammalia, Fabaceae).
- Sequences in `monospace`, 5′→3′ unless stated: `5'-ATGGCC...-3'`. Amino acids by three-letter or
  one-letter code, stated once; residue numbers as Lys27, K27.
- **SI units with a space before the unit** (37 °C, 5 mL, 0.9 % w/v, 120 mmHg only where the field
  still uses it), scientific notation for large numbers ($3.2\times10^9$ base pairs), and molar
  concentrations in mol L⁻¹ (M is acceptable in figure labels). Rates per unit time with explicit
  units (divisions h⁻¹, mL min⁻¹).
- Mathematics follows Maths Atlas: $N$ population size, $N_e$ effective population size, $p$ and
  $q$ allele frequencies, $F$ inbreeding coefficient, $s$ selection coefficient, $r$ intrinsic rate
  of increase, $K$ carrying capacity, $K_\mathrm{m}$ and $V_\max$ for enzymes, $h^2$ heritability,
  $\mu$ mutation rate. Define every symbol where it first appears.

## 6. Interactive figures

The available types are in `data/widgets.json` (function plots, slope fields and solvers for
population and kinetic models, phase planes, probability distributions, the central limit theorem,
Monte Carlo and Galton board, Markov chains, Bayes, regression, hypothesis tests and confidence
intervals, graphs, Pascal's triangle, Venn diagrams); try each at
`/learn/biology/lab.php?w=<type>`. Biology-specific figures (Punnett squares, pedigrees,
Wright–Fisher drift, Hardy–Weinberg, Michaelis–Menten, Lotka–Volterra, membrane potentials,
sequence alignment, phylogenetic trees …) are planned in `tools/WIDGET_GUIDE.md`; use a type only
once it is in the catalogue.

Every figure needs a caption that says what to try and what to notice, and the caption must
describe what the figure actually draws — check it on the rendered page.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/biology
bash tools/check.sh <course> [<course> …]
```

This typesets every formula with KaTeX, validates figures, checks and references, and prints a
depth table per lesson. Fix every `ERROR`; depth `warn`ings must be gone for finished lessons.
Preview at `http://f.g77k.com/learn/biology/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).
Read your rendered lesson at least once.
