# Earth & Climate Atlas — content guide

Earth & Climate Atlas (`/learn/earth/`) teaches university Earth and climate science: the solid
Earth, landscapes and water, the atmosphere, the oceans and ice, Earth history and the climate
system. Every chapter is a long, self-contained lesson in the style of a very good textbook:
observations and motivation first, then precise definitions, the governing principles with their
derivations, many fully worked examples with real numbers and units, interactive figures, quick
checks, and graded exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
data/milestones.json               field-wide milestones for the timeline (§2)
```

The curriculum (24 courses, 216 chapters, four years of study) is fixed in the `course.json`
files. It has seven areas: Earth system and methods (`system`), solid Earth (`solid`), surface
processes and water (`surface`), atmosphere and weather (`atmosphere`), oceans and ice (`ocean`),
climate (`climate`), and Earth history and life (`history`). **Do not rename, add, remove or
reorder courses or chapters**, because other lessons and the map link to them.

**Every lesson is written by hand.** Lessons and course fields are written chapter by chapter, to
the standard of this guide, by someone who has read the sources. Never generate lessons,
overviews, outcomes, history or references from templates, word lists or scripts, and never fill a
chapter with placeholder text to make it look finished. A chapter is either written properly or it
stays "to be written" — the engine shows a missing lesson that way automatically. Scripts are for
checking numbers, not for producing prose.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Explain…", "Calculate…", "Interpret…", "Map…", "Estimate…"). |
| `history` | 5–10 events `{"year": 1912, "title": "…", "detail": "1–2 sentences", "people": ["Alfred Wegener"]}` in chronological order, each tied to a publication, expedition, instrument or dataset whose date you can verify. Years before 1 AD are negative. |
| `references` | 4–8 books or reports `{"title", "authors", "year", "note"}` that students actually use — for example Grotzinger & Jordan (*Understanding Earth*), Nesse, Winter, Fossen, Nichols, Bierman & Montgomery, Wallace & Hobbs, Holton & Hakim, Marshall & Plumb, Talley et al., Cuffey & Paterson, Lowrie & Fichtner, Stein & Wysession, White (*Geochemistry*), Dingman, Freeze & Cherry, Jacob, Seinfeld & Pandis, Hartmann, Neelin, Pierrehumbert, Ruddiman, Bradley, Schlesinger & Bernhardt, Lillesand, Kiefer & Chipman, Robb, de Pater & Lissauer — and, for climate, the IPCC assessment reports. `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`, earlier in the same course or in a
prerequisite course). Keep titles plain text: no `$…$` (Unicode such as CO₂, δ¹⁸O, ‰ is fine).

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}`, `area` being one of the seven area keys — for example Hutton’s theory
of the Earth (1788), William Smith’s geological map (1815), Agassiz’s glacial theory (1840),
Arrhenius’s estimate of warming by carbon dioxide (1896), Wegener’s continental drift (1912),
Patterson’s age of the Earth (1956), Keeling’s carbon-dioxide record at Mauna Loa (1958), Vine and
Matthews’s magnetic stripes (1963), Manabe and Wetherald’s radiative–convective model (1967), the
"pacemaker of the ice ages" paper of Hays, Imbrie and Shackleton (1976), the impact hypothesis of
the Alvarez team (1980), the discovery of the ozone hole (1985) and the founding of the IPCC (1988).
Check every date against the original publication; an event told in a course `history` and in the
milestones is listed once on the timeline if the year and a person match.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (`check.php` warns below 2,500). A student should be able to
  learn the topic from this page alone.
- **Definitions and results** as numbered blocks (≥ 3 in total): `:::definition` for concepts and
  quantities; `:::theorem` or `:::proposition` for laws and derived relations (the hydrostatic
  equation, geostrophic balance, Darcy’s law, the radioactive decay law, the zero-dimensional energy
  balance, isostatic equilibrium …) with a `:::proof` that derives them as an undergraduate course
  does. State the assumptions and the range of validity, and label empirical relations as empirical
  (the Gutenberg–Richter law, Glen’s flow law, Manning’s equation are fits to data, not theorems).
- **≥ 4 worked examples** (`:::example` with a `:::solution`) with real numbers and units: an energy
  balance, a lapse-rate or dew-point calculation, a radiometric age, a residence time, a Darcy flux,
  a Rossby number, a flexural wavelength, a return period, a carbon budget …
- **≥ 1 interactive figure** (2–3 is better), each with a caption saying what to try and what to
  notice; **≥ 1 quick check** (`:::quiz`); **≥ 1 `:::warning`** (common misconceptions — weather
  versus climate, magnitude versus intensity, the "ozone hole causes global warming" confusion …);
  one `:::history` block; a `:::summary` ("Key takeaways", 5–8 bullets) just before the exercises.
- **`## Exercises` with ≥ 8 exercises** and a complete `:::solution` for each: about 3 routine
  (`level=1`), 3 standard (`level=2`) and 2+ challenging (`level=3`, including a derivation, an
  order-of-magnitude estimate or the analysis of a small dataset). Add `check="…"` when the answer
  is a single number, and say in the question which number to enter and in which unit
  ("(Enter the age in Ma.)").
- When a lesson uses real observations (the CO₂ record, temperature anomalies, an earthquake
  catalogue, river discharge, sea level), name the dataset, its provider and the years it covers;
  keep tables small and round values sensibly.

Suggested shape: introduction without a heading (a striking observation or question), 3–6 main
sections, an optional "Common pitfalls" section, a short "Where this leads" section linking later
chapters, then `:::summary` and `## Exercises`.

## 4. Writing style and accuracy

- Audience: students who have done the prerequisite chapters. Explain from scratch, motivate before
  formalising, then be exact. Show the reasoning and the evidence, not just the conclusions — how do
  we *know* the age of the Earth, the structure of the core, the size of a feedback?
- Link instead of re-teaching: Maths Atlas (`/learn/maths/`) for calculus, differential equations
  and statistics, Physics Atlas (`/learn/physics/`) for thermodynamics, fluids, waves and
  electromagnetism, and the Chemistry and Biology atlases (`/learn/chemistry/`, `/learn/biology/`)
  for equilibria, kinetics, evolution and ecology.
- Voice: "we" for shared reasoning, "you" for instructions; friendly, precise and unhurried.
- **British spelling** (colour, modelling, behaviour, metre, sulfur as recommended by IUPAC), also in
  the names of geological time units: Palaeozoic, Palaeogene, Archaean — although the ICS chart
  itself uses the American spellings.
- Sentence case for headings; bold a term where it is defined.
- Original text only — never copy textbooks, reports or their figures.
- **Verify every number** with `python3` (numpy and scipy are installed): unit conversions,
  energy balances, decay ages, flow rates, statistics. Check units by dimensional analysis.

### 4.1 Climate science

- Follow the **assessed literature**: the IPCC Sixth Assessment Report (AR6, 2021–2023) and later
  IPCC reports, the WMO State of the Global Climate reports, and the primary datasets (NOAA, NASA,
  Copernicus/ECMWF, the Met Office Hadley Centre, Berkeley Earth, the Global Carbon Project). Cite
  the report, its chapter or section and the year.
- Give **uncertainty ranges** as the source gives them, for example "equilibrium climate
  sensitivity: best estimate 3 °C, *likely* range 2.5–4 °C, *very likely* range 2–5 °C (IPCC AR6
  WGI, 2021)". Use the IPCC calibrated language only in its defined sense and in italics:
  likelihood — *virtually certain* 99–100 %, *extremely likely* 95–100 %, *very likely* 90–100 %,
  *likely* 66–100 %, *more likely than not* >50–100 %, *about as likely as not* 33–66 %, *unlikely*
  0–33 %, *very unlikely* 0–10 %, *extremely unlikely* 0–5 %, *exceptionally unlikely* 0–1 %;
  confidence — *very low*, *low*, *medium*, *high*, *very high*.
- **Date every observation**: "as of 2025", "relative to 1850–1900", "the 2011–2020 mean". Say which
  baseline an anomaly uses and which dataset a record comes from.
- **Separate physical science from policy.** What is happening, why, and with what confidence is
  science; what to do about it involves values. Present mitigation, adaptation and carbon-removal
  options neutrally, with their assessed costs, benefits, risks and trade-offs; do not advocate
  parties, policies or products. Present open scientific questions (the size of particular
  feedbacks, tipping thresholds, the proposed Anthropocene epoch) by stating the positions and the
  evidence — but do not give equal weight to claims that the assessed literature has rejected.
- Distinguish weather from climate, and projections (conditional on a scenario) from forecasts.

### 4.2 Natural hazards

- Hazard content is **educational only and never a substitute for official warnings**. Do not
  forecast or assess the hazard of a real place or event, and do not give safety or evacuation
  instructions as advice; tell readers to follow their national meteorological, geological and
  civil-protection agencies (describe the kind of agency; do not rely on particular web addresses).
- Describe past disasters factually and respectfully: dated figures for deaths and losses, with
  their source, and no sensational language.

### 4.3 Resources and data that change

- Reserves, production, prices and lists of "critical minerals" change over time and differ between
  countries: date them, name the source (for example the USGS Mineral Commodity Summaries or the
  IEA) and say which definition is used.
- Rates that are still changing (warming per decade, sea-level rise, ice loss) are given with the
  period they cover.

## 5. Notation and units

- **SI units** throughout, with the usual exceptions: hPa for atmospheric pressure; °C for observed
  temperatures (K inside thermodynamic formulas); ‰ for isotope ratios; ppm and ppb (mole fraction
  in dry air) for gas concentrations; Sv (1 Sv = 10⁶ m³ s⁻¹) for ocean volume transport; Gt C or
  Gt CO₂ for carbon (1 Gt C = 3.664 Gt CO₂; 1 Gt = 1 Pg); W m⁻² for energy fluxes; mm yr⁻¹ for
  sea-level rates. Write units with negative exponents (W m⁻², kg m⁻³, m s⁻¹); in formulas
  `\mathrm{W\,m^{-2}}`.
- **Geological time**: Ma and Ga for ages (dates before present), Myr and Gyr for durations (ka and
  kyr likewise); BP means before 1950 (radiocarbon); b2k (before 2000) only where the source uses
  it. Use the current International Chronostratigraphic Chart of the ICS and cite the version you
  used (each chart carries a version date of the form vYYYY/MM).
- **Isotopes**: $\delta^{18}\mathrm{O} = (R_\text{sample}/R_\text{standard} - 1) \times 1000$ ‰ with
  the standard named (VSMOW for waters, VPDB for carbonates and organic carbon); write
  `\delta^{18}\mathrm{O}`, `\delta^{13}\mathrm{C}`.
- **Chemistry**: formulas upright (`\mathrm{CO_2}`, `\mathrm{CaCO_3}`). KaTeX’s mhchem extension
  (`\ce{…}`) is not loaded, so write reactions with `\mathrm{}` and `\longrightarrow` or
  `\rightleftharpoons`.
- **Common symbols**: $g$ gravity, $\rho$ density, $p$ pressure, $T$ temperature, $\theta$ potential
  temperature, $\phi$ latitude, $\Omega$ Earth’s rotation rate, $f = 2\Omega\sin\phi$ Coriolis
  parameter, $z$ height, $S_0$ total solar irradiance (≈ 1361 W m⁻²), $\alpha$ albedo, $\sigma$
  Stefan–Boltzmann constant, $\Delta F$ radiative forcing, $\lambda$ climate feedback parameter
  (say so — $\lambda$ is also longitude and decay constant), $K$ hydraulic conductivity, $h$
  hydraulic head, $q$ Darcy flux, $t_{1/2}$ half-life.

## 6. Markup

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
blocks (`:::definition`, `:::theorem`/`:::proposition`, `:::proof`, `:::example` + `:::solution`,
`:::exercise`, `:::quiz`, `:::warning`, `:::intuition`, `:::application`, `:::history`,
`:::summary`, `:::algorithm` for procedures such as locating an epicentre or classifying an image),
references (`[[#id]]`, `[[course/chapter]]`, `[[course/chapter#id]]`), answer checks and KaTeX.
`:::application` suits hazards, resources, engineering and environmental management.

## 7. Interactive figures

The available types are in `data/widgets.json` (15 types): function plots and parametric curves,
vector fields (winds, currents), contour maps and surfaces (topography, pressure, potential), slope
fields, an ODE solver and phase planes (energy-balance and box models, feedbacks), Fourier series
and the heat equation (seasonal cycles, heat diffusion into the ground), probability distributions,
Monte Carlo simulation, regression, hypothesis tests and confidence intervals (trends and their
uncertainty). Try each at `/learn/earth/lab.php?w=<type>`. Earth- and climate-specific figures
(energy-balance model, greenhouse layers, the Keeling curve, insolation and orbital cycles, plate
motion, seismic rays, radiometric decay, groundwater flow, a thermodynamic diagram, box models of
the ocean and carbon cycle, a world map …) are planned in `tools/WIDGET_GUIDE.md`; use a type only
once it is in the catalogue.

## 8. Check your work

```
cd /var/www/f.g77k.com/learn/earth
bash tools/check.sh <course> [<course> …]
```

Fix every `ERROR`; depth `warn`ings must be gone for finished lessons. Preview at
`http://f.g77k.com/learn/earth/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`)
and read the rendered lesson at least once. `php tools/check.php` lists every lesson not yet written
and every empty course field as a warning: its output is the to-do list.
