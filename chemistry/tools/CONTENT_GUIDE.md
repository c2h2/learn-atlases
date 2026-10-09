# Chemistry Atlas — content guide

Chemistry Atlas (`/learn/chemistry/`) teaches the undergraduate chemistry curriculum in depth. Every
chapter is a long, self-contained lesson in the style of a very good textbook: motivation and
intuition first, then precise definitions, laws and their derivations, many fully worked examples
(with numbers, units and significant figures), interactive figures, quick checks, and graded
exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

**Every lesson is written by hand to this standard.** Never generate lessons, course fields or
milestones from templates, scripts or word lists. A chapter is either written properly or it stays
"to be written" (its file does not exist) — a placeholder that looks like a lesson is worse than
no lesson.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
data/milestones.json               field-wide events for the timeline
```

The curriculum (24 courses, 211 chapters in seven areas: general chemistry, physical chemistry,
inorganic chemistry, organic chemistry, analytical chemistry and spectroscopy, chemistry of life,
and materials, environment and industry; years 1–4) is fixed in the `course.json` files. **Do not
rename, add, remove or reorder courses or chapters**, because other lessons link to them.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Calculate…", "Predict…", "Derive…", "Propose a mechanism for…", "Interpret…"). |
| `history` | 5–10 events `{"year": 1869, "title": "…", "detail": "1–2 sentences", "people": ["Dmitri Mendeleev"]}` in chronological order, each tied to a publication, discovery or process whose date you can verify. Years before 1 AD are negative. No invented quotes. |
| `references` | 4–8 books `{"title", "authors", "year", "note"}` that students actually use — e.g. Atkins & de Paula (*Physical Chemistry*), Atkins, Jones & Laverman (*Chemical Principles*), Clayden, Greeves & Warren (*Organic Chemistry*), Housecroft & Sharpe (*Inorganic Chemistry*), Harris (*Quantitative Chemical Analysis*), Skoog, Holler & Crouch, Berg, Tymoczko, Gatto & Stryer (*Biochemistry*), Pavia et al., McQuarrie & Simon, Jensen, Smart & Moore, Patrick (*An Introduction to Medicinal Chemistry*). Give the year of the edition you cite; `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`, only earlier chapters or chapters of
prerequisite courses). Keep titles plain text: no `$…$` (use Unicode such as σ, π, Δ, °, ², ⁺ if
needed).

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}`, `area` being one of the seven area keys (`general`, `physical`,
`inorganic`, `organic`, `analytical`, `biological`, `materials`). Typical anchors, each to be
checked against a standard history of chemistry before use: Lavoisier's *Traité élémentaire de
chimie* (1789), Dalton's atomic theory (1808), Wöhler's synthesis of urea (1828), Kekulé's
structure of benzene (1865), Mendeleev's periodic table (1869), Werner's coordination theory (1893),
Lewis's shared electron pair (1916), Heitler and London's quantum treatment of H₂ (1927), Pauling's
*The Nature of the Chemical Bond* (1939), Watson and Crick's DNA structure (1953), the
Woodward–Hoffmann rules (1965), Kohn–Sham density functional theory (1965) and the Montreal
Protocol (1987). Course-specific events belong in each course's `history`.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (formulas count as words; `tools/check.php` warns below
  2,500). A student should be able to learn the topic from this page alone.
- **Definitions and results** as numbered blocks (≥ 3 in total): definitions of quantities and
  concepts, laws and equations with their derivations, and procedures. State the conditions under
  which each result holds (ideal gas, dilute solution, constant pressure, steady state …) and mark
  empirical rules as empirical (Markovnikov's rule, the 18-electron rule, Lipinski's rules).
- **≥ 4 worked examples** (`:::example` with a `:::solution`), from routine to subtle, every step
  shown with units carried through and the answer given to a justified number of significant figures.
- **≥ 1 interactive figure** (2–3 is better), **≥ 1 quick check** (`:::quiz`), **≥ 1 `:::warning`**
  (common misconceptions), one `:::history` block, a `:::summary` ("Key takeaways", 5–8 bullets)
  just before the exercises.
- **`## Exercises` with ≥ 8 exercises**: about 3 routine (`level=1`), 3 standard (`level=2`) and 2+
  challenging (`level=3`, including a derivation, a multi-step calculation or a mechanism/synthesis
  problem). **Every exercise has a complete `:::solution`**; add a `:::hint` for harder ones.
  Add `check="…"` when the answer is a single number, and say in the statement which number and
  unit to enter ("(Enter the pH.)", "(Enter ΔH in kJ mol⁻¹.)").

Suggested shape: intro paragraphs (a concrete question, maybe a figure) → 3–6 main sections with
definitions, results, examples, figures and quick checks → "Where this leads" (links to later
chapters and courses) → `:::summary` → `## Exercises`.

### Kinds of block in a chemistry lesson

The engine's block kinds are those of Maths Atlas. Use `definition` for definitions; `proposition`
for laws, equations and derived relations (`::: proposition Hess's law {#prop-hess}`), followed by a
`proof` block holding the derivation; `theorem` only for genuine mathematical theorems (the
variation theorem, the Hohenberg–Kohn theorems); `algorithm` for step-by-step procedures (balancing
a redox equation, finding a point group, a retrosynthetic analysis). Relabelling these blocks for
chemistry ("Law", "Derivation", a "Key results" index — as Medicine Atlas relabels them
"Principle" and "Explanation") is an engine task, not something lessons should work around.

## 4. Writing style, accuracy and safety

- Audience: undergraduates who have done the prerequisite chapters. Explain from scratch, motivate
  before formalising, then be exact. Link to Maths Atlas (`/learn/maths/`) for mathematical tools
  and to Physics Atlas (`/learn/physics/`) for physics.
- Voice: "we" for shared reasoning, "you" for instructions. Friendly, precise, unhurried.
- **British spelling** (ionisation, polymerisation, vapour, behaviour, analyse) with IUPAC element
  names: **sulfur, aluminium, caesium**.
- Original text only — never copy textbooks. Use the notation of the main references.
- **Correctness is non-negotiable.** Verify every number with `python3` (numpy, scipy and sympy are
  installed): equilibrium compositions, pH values, rate constants, energies, spectra predictions.
  Use CODATA values of the constants ($R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$,
  $N_\mathrm{A} = 6.022\times10^{23}\ \mathrm{mol^{-1}}$, $F = 96\,485\ \mathrm{C\,mol^{-1}}$) and
  quote data (enthalpies of formation, $\mathrm{p}K_\mathrm{a}$ values, standard potentials) from a
  standard data source, saying which.
- **Safety.** Lessons explain hazards and safe practice — hazard classes and GHS pictograms, why a
  reaction is dangerous, how incompatible chemicals are segregated, why work needs a fume cupboard
  and protective equipment. They never give synthesis routes, quantities, reaction conditions or
  step-by-step procedures for explosives, chemical-warfare agents and their precursors, toxins,
  controlled drugs and their precursors, nor ways of obtaining them or of increasing harm. Laboratory
  procedures appear only for benign, standard teaching experiments (a titration, the
  recrystallisation of benzoic acid, the preparation of aspirin), with their hazards stated and the
  reminder that practical work needs supervision and a risk assessment. Textbook-level descriptions
  of major industrial processes (the Haber–Bosch and contact processes) are fine. Toxicity is
  described by hazard category and mechanism, never as doses to reach or avoid.
- **Medicinal chemistry and biochemistry** are for education only, not medical advice: no
  individual advice and no doses as instructions (illustrative values only), as in Medicine Atlas
  (`/learn/medicine/tools/CONTENT_GUIDE.md` §4).
- **Environmental and industrial chemistry**: date statistics and regulations ("as of 2026"), cite
  the source (IPCC, WMO ozone assessments, national agencies), and describe policy neutrally.

## 5. Markup and notation

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
blocks, references (`[[#id]]`, `[[course/chapter]]`, `[[course/chapter#id]]`), answer checks and
KaTeX conventions.

**Chemical equations.** KaTeX's mhchem extension (`\ce{…}`) is **not yet in the engine**. Adding it
— vendoring `contrib/mhchem.min.js` from the same KaTeX release, loading it in `tools/build.js`
before formulas are typeset and in the browser fallback in `inc/render.php` — is an engine task to
do before lessons are written. Until then write formulas and equations with `\mathrm{}`:

```
$\mathrm{H_2SO_4}$   $\mathrm{SO_4^{2-}}$   $\mathrm{Fe^{3+}(aq)}$   $^{13}\mathrm{C}$
$$
\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}
$$
```

Use `\rightarrow` for a reaction and `\rightleftharpoons` for an equilibrium, and keep state
symbols `(s)`, `(l)`, `(g)`, `(aq)` upright.

**Quantities and units.** SI units, with quantity symbols in italic and units, labels and
descriptive subscripts upright: `$\Delta_\mathrm{r}H^\circ$`, `$\Delta_\mathrm{f}G^\circ$`,
`$K_\mathrm{a}$`, `$\mathrm{p}K_\mathrm{a}$`, `$E^\circ_\mathrm{cell}$`, `$k_\mathrm{B}$`. Put a
thin space between number and unit: `$25.0\,\mathrm{cm^3}$`, `$-285.8\,\mathrm{kJ\,mol^{-1}}$`.
Concentrations in $\mathrm{mol\,dm^{-3}}$ (equal to $\mathrm{mol\,L^{-1}}$), standard pressure
$p^\circ = 1\ \mathrm{bar}$, temperatures in kelvin (°C is fine for laboratory conditions). Sign
convention: $\Delta U = q + w$ with $w$ the work done on the system. Carry extra digits through a
calculation and round only the final answer.

**Names and structures.** IUPAC names on first use (common names afterwards are fine); stereo
descriptors in italics (*R*, *S*, *E*, *Z*), Greek letters for positions (α, β). Until the planned
`molecule` and `mechanism` figures exist, describe structures with condensed formulas and describe
each mechanism in words, step by step, naming every electron movement as a curly arrow would ("the
lone pair on the hydroxide oxygen attacks the carbon; the C–Br bond breaks and bromide leaves").

## 6. Interactive figures

The available types are in `data/widgets.json`; try each at `/learn/chemistry/lab.php?w=<type>`:

- `plot`, `parametric` — functions and curves (Arrhenius plots, distribution functions, radial
  probability, titration curves from a formula); `newton` — solving equilibrium and pH equations.
- `slopefield`, `odesolver`, `phaseplane` — rate equations: consecutive and reversible reactions,
  steady states, autocatalysis and oscillating reactions.
- `surface`, `contour`, `gradientdescent` — potential energy surfaces and geometry optimisation.
- `transform2d` — symmetry operations as matrices; `cayley` — point-group multiplication tables;
  `graph` — molecular graphs and reaction networks.
- `fourier` — Fourier-transform spectroscopy (FID to spectrum).
- `distribution`, `regression`, `hypothesis`, `confidence`, `montecarlo` — measurement statistics,
  calibration lines, significance tests and propagation of uncertainty.

Chemistry-specific figures (3D molecules, VSEPR, orbitals, MO diagrams, titration curves, reaction
profiles, kinetics, phase diagrams, spectra, crystal lattices, cells …) are planned in
`tools/WIDGET_GUIDE.md`; use a type only once it is in the catalogue.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/chemistry
bash tools/check.sh <course> [<course> …]
```

This typesets every formula with KaTeX, validates figures, checks and references, and prints a
depth table per lesson. Fix every `ERROR`; depth `warn`ings must be gone for finished lessons.
Preview at `http://f.g77k.com/learn/chemistry/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).
Read your rendered lesson at least once.
