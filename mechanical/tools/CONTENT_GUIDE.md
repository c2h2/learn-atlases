# Mechanical & Aerospace Atlas — content guide

Mechanical & Aerospace Atlas (`/learn/mechanical/`) teaches the undergraduate mechanical and
aerospace engineering curriculum in depth. Every chapter is a long, self-contained lesson in the
style of a very good textbook: a physical picture and motivation first, then precise definitions,
the governing laws with their derivations, many fully worked examples with real numbers and
units, interactive figures, quick checks, and graded exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

**Status: curriculum skeleton.** Every chapter shows "to be written" until its lesson exists, and
the site title says "skeleton" until `MA_SKELETON` in `inc/bootstrap.php` is set to `false` (do
that only when the atlas is complete).

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
data/milestones.json               field-wide timeline milestones
```

The curriculum — 24 courses and 215 chapters in seven areas (solid mechanics, dynamics and
vibration, thermofluids, materials and manufacturing, design, control and robotics, aerospace)
over four years — is fixed in the `course.json` files. **Do not rename, add, remove or reorder
courses or chapters**: other lessons and the map link to them. Electric circuits and electronics
are taught in the Electrical Engineering Atlas (`/learn/ee/`) and the mathematics in Maths Atlas
(`/learn/maths/`); link to them instead of re-teaching them.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, where it is used, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Draw…", "Calculate…", "Design…", "Select…", "Analyse…"). |
| `history` | 5–10 events `{"year": 1904, "title": "…", "detail": "1–2 sentences", "people": ["Ludwig Prandtl"]}` in chronological order, each tied to a publication, machine, test or flight whose date you can verify. Years before 1 AD are negative. |
| `references` | 4–8 standard textbooks `{"title", "authors", "year", "note"}` — for example Hibbeler or Beer & Johnston (statics, dynamics), Gere & Goodno (mechanics of materials), Callister & Rethwisch (materials), Çengel & Boles (thermodynamics), White (fluids), Incropera et al. (heat transfer), Rao (vibrations), Norton (mechanisms), Budynas & Nisbett (Shigley's machine design), Kalpakjian & Schmid (manufacturing), Ulrich & Eppinger (design), Ogata or Franklin, Powell & Emami-Naeini (control), Anderson (aerodynamics, flight), Hill & Peterson (propulsion), Curtis (orbital mechanics), Hughes or Cook et al. (finite elements), Versteeg & Malalasekera or Ferziger & Perić (CFD), Lynch & Park (robotics). `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`, earlier in the same course or in a
prerequisite course). Keep titles plain text: no `$…$` (use Unicode such as θ, ω, Δ if needed).

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}`, `area` being one of the seven area keys (`mechanics`, `dynamics`,
`thermofluids`, `materials`, `design`, `control`, `aerospace`) — for example Archimedes on the
lever, Hooke's law, Euler's buckling load, Watt's separate condenser, Carnot's *Réflexions*,
Navier and Stokes, Reynolds's pipe-flow experiments, the Wright brothers' first flight,
Prandtl's boundary layer, Tsiolkovsky's rocket equation, the first jet engines, the first
satellite, the finite element method and the first industrial robot. Check every date against a
reliable source; do not repeat events that are already in a course's `history`.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (the checker warns below 2,500). A student should be able
  to learn the topic from this page alone.
- **Definitions and results** as numbered blocks (≥ 3): `:::definition` for quantities and
  concepts; `:::theorem` or `:::proposition` for laws and principles, each followed by a `:::proof`
  that gives the derivation and states every assumption (the parallel-axis theorem, Castigliano's
  theorem and the Buckingham Π theorem are genuine theorems; balance laws and design equations are
  propositions); `:::algorithm` for procedures such as the method of joints or the
  effectiveness–NTU method. **Empirical correlations, design rules and code formulas are not
  theorems**: give them as numbered equations with their source, range of validity and accuracy
  (Colebrook, Dittus–Boelter, the Goodman line, gear rating factors …).
- **≥ 4 worked examples** with numbers and units, from routine to realistic design cases, every
  step shown, ending with a sanity check (order of magnitude, limiting case, units).
- **≥ 1 interactive figure** (2–3 is better), **≥ 1 quick check**, **≥ 1 `:::warning`** (common
  mistakes such as wrong sign conventions, forgotten reactions, gauge versus absolute pressure,
  °C in a formula that needs kelvin), one `:::history` block, a `:::summary`, and **≥ 8 exercises**
  with complete solutions (about 3 routine, 3 standard, 2+ challenging, including an open-ended
  design question or a derivation). Add `check="…"` when the answer is a single number, and say in
  the statement which quantity and unit to enter ("(Enter the force in kN.)").

## 4. Writing style, accuracy and safety

- Audience: students who have done the prerequisite chapters. Explain from scratch, give the
  physical picture before the equations, then be exact. Link to Maths Atlas for mathematical tools
  (vectors, ODEs, linear algebra, Laplace and Fourier transforms) and to Physics Atlas
  (`/learn/physics/`) for the underlying physics.
- **British spelling** (modelling, behaviour, centre, fibre, vapour, aluminium, manoeuvre) except
  in names, quotations and the titles of standards.
- **Units: SI throughout** — N, Pa (kPa, MPa, GPa), J, W, kg, m (mm), s, K or °C — and carry the
  units through every line of a calculation. Use kelvin in thermodynamic formulas. Where an
  industry still works in other units (feet, knots, nautical miles and flight levels in aviation;
  US customary units in some codes and data sheets), give the SI value first and the conversion in
  brackets; never mix unit systems inside one calculation.
- **Free-body diagrams first.** Every equilibrium or equation-of-motion problem starts from a
  free-body diagram. The markup has no images: until the planned `fbd`, `truss` and `beamdiagram`
  figures exist, describe the diagram in words — a short list of every force and couple, its point
  of application, direction and sign — and use catalogued figures where they help.
- **Sign conventions** are stated in each chapter where they matter and then kept: tension
  positive; the shear-force and bending-moment convention of the chapter (sagging moment positive,
  as in Gere and Hibbeler); anticlockwise angles and moments positive; for heat and work either
  the in/out subscripts of Çengel & Boles or the first law as $\Delta E = Q - W$ with $W$ done
  by the system — say which.
- **Data and standards.** Take material properties, steam and refrigerant tables, air and fluid
  properties and the standard atmosphere from named sources (and say which). Cite design codes and
  standards with their edition or year (ASME Boiler and Pressure Vessel Code, Eurocodes, ISO 286
  limits and fits, ISO 1101 or ASME Y14.5 geometric tolerancing, ISO 6336 or AGMA gear rating,
  airworthiness regulations …) and say plainly that the lesson teaches the principles behind a
  code and is no substitute for it.
- **Accuracy over currency.** Teach methods that are established and attribute them. Date any
  figure that changes with technology ("as of 2026": battery energy densities, turbine inlet
  temperatures, record efficiencies, costs) and describe commercial products only from public
  documentation, without marketing language.
- **Verify every number** with `python3` (numpy and scipy are installed): reactions, stresses,
  deflections, cycle efficiencies, friction factors, natural frequencies, Δv budgets. Check
  limiting cases and dimensions of every formula you derive.
- **Written by hand.** Every lesson is written by hand, one chapter at a time, to the standard in
  this guide. Never generate lessons or course fields from templates, word lists or scripts: a
  chapter is either written properly or stays "to be written".

### Safety rules

- Real designs of pressure vessels, lifting equipment, structures, vehicles, aircraft and other
  safety-critical products are made to the current codes and checked by qualified engineers. The
  atlas teaches the principles; it never presents its examples as approved designs.
- **No weapons.** Nothing on the design of weapons, munitions, warheads, or missile guidance and
  targeting. Examples are civil: machines, vehicles, aircraft, satellites, power plants.
- **Rocket propulsion stays at textbook level**: the rocket equation, staging, nozzle theory and
  the performance and system design of the main engine types. No propellant formulations or
  recipes, no manufacture of propellants or motors, and no instructions for building or testing
  rocket motors or engines.
- When a lesson describes an experiment or workshop process (pressure tests, welding, machining,
  high-speed rotating parts, compressed gases), it names the hazards and says that such work is
  done only with proper training, equipment and supervision.

## 5. Markup

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
blocks, references (`[[#id]]`, `[[course/chapter]]`, `[[course/chapter#id]]`), answer checks and
KaTeX. Notation used across the atlas:

- Vectors bold upright: $\mathbf{F}$, $\mathbf{r}$, $\mathbf{v}$, $\mathbf{a}$, $\mathbf{M}_O$;
  bold Greek with `\boldsymbol`: $\boldsymbol{\omega}$, $\boldsymbol{\alpha}$. Magnitudes in italic
  ($F$, $v$); unit vectors $\mathbf{i}, \mathbf{j}, \mathbf{k}$ or $\mathbf{e}_t, \mathbf{e}_n$;
  moment of a force $\mathbf{M}_O = \mathbf{r} \times \mathbf{F}$.
- Solids: normal stress $\sigma$, shear stress $\tau$, normal strain $\varepsilon$, shear strain
  $\gamma$; $E$, $G$, Poisson's ratio $\nu$; axial force $N$ (or $P$), shear force $V$, bending
  moment $M$, torque $T$; second moment of area $I$, polar $J$, section modulus $S$; deflection
  $v(x)$; factor of safety $n$.
- Dynamics and vibration: mass moment of inertia $I_G$ or $I_O$ (say about which point), natural
  frequency $\omega_n$ in rad/s and $f_n$ in Hz, damping ratio $\zeta$, frequency ratio $r$.
- Thermofluids: pressure $p$, specific volume $v$, temperature $T$, specific $u$, $h$, $s$; $c_p$,
  $c_v$, $k$ (or $\gamma$) for the ratio of specific heats; rates $\dot m$, $\dot Q$, $\dot W$;
  states numbered as subscripts ($h_1$, $h_{2s}$); density $\rho$, dynamic viscosity $\mu$,
  kinematic viscosity $\nu$ (say which $\nu$ when Poisson's ratio also appears); $\mathrm{Re}$,
  $\mathrm{Ma}$, $\mathrm{Nu}$, $\mathrm{Pr}$; heat-transfer coefficient $h$ (not to be confused
  with enthalpy — say so where both occur).
- Aerospace: angle of attack $\alpha$, chord $c$, span $b$, wing area $S$, aspect ratio
  $AR = b^2/S$, $C_L$, $C_D$, $C_m$, pressure coefficient $C_p$; specific impulse $I_{sp}$,
  velocity increment $\Delta v$; standard gravitational parameter $\mu$.
- Control: plant $G(s)$, controller $C(s)$, gains $K_p$, $K_i$, $K_d$.
- Units in formulas with a thin space and upright text: `$E = 200\,\mathrm{GPa}$`,
  `$\dot m = 2.5\,\mathrm{kg/s}$`.

## 6. Interactive figures

The available types are in `data/widgets.json`: `plot`, `parametric`, `newton`, `transform2d`,
`svd`, `rowreduce`, `surface`, `contour`, `vectorfield`, `region`, `gradientdescent`,
`slopefield`, `phaseplane`, `odesolver`, `oscillator`, `fourier`, `heat`, `interpolation`,
`quadrature`, `iterative`, `distribution` and `montecarlo`; try each at
`/learn/mechanical/lab.php?w=<type>`. `tools/WIDGET_GUIDE.md` lists what they already cover in
this subject and the planned mechanical and aerospace types (free-body diagrams, trusses, beam
diagrams, Mohr's circle, linkages, cams, gear trains, thermodynamic cycles, the Moody chart, fins,
heat exchangers, airfoils, control loops, robot arms, shocks and orbital transfers …). Use a type
only once it is in the catalogue. Every figure gets a caption that tells the reader what to try
and what to notice.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/mechanical
bash tools/check.sh <course> [<course> …]
```

Fix every `ERROR`; depth `warn`ings must be gone for finished lessons. Preview at
`http://f.g77k.com/learn/mechanical/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or
`node tools/shot.js "lesson.php?c=…&l=…" out.png`). Read your rendered lesson at least once.
