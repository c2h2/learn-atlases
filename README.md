# Learn — interactive atlases

Long-form, interactive references for self-study, with an English and Simplified Chinese interface.
Every topic is explained in depth, with figures you can play with. Live at <https://f.g77k.com/learn/>.

| | |
|---|---|
| **[Maths Atlas](maths/)** | University mathematics in 18 courses and 141 chapters, every lesson in English and Chinese, from logic and calculus to analysis, algebra, probability, differential equations, topology, geometry and measure theory. Definitions, theorems with proofs, worked examples, 411 interactive figures and 1 395 exercises with full solutions. |
| **[Physics Atlas](physics/)** | University physics in 18 courses and 115 chapters: mechanics, waves and optics, electromagnetism, thermodynamics and statistical physics, quantum mechanics, relativity and astrophysics, with 119 interactive figures and 940 exercises. |
| **[Electrical Engineering Atlas](ee/)** | Electrical and electronic engineering in 22 courses and 182 chapters: circuits, electronics and devices, digital and computer systems, signals and communications, electromagnetics, power and control. The curriculum is mapped out; Circuit Analysis I and the first two chapters of Circuit Analysis II are written, and the other lessons are in preparation. |
| **[LLM Atlas](llm/)** | Large language models from first principles, in 18 courses and 137 chapters. The curriculum is mapped out; the lessons are in preparation. |
| **[Medicine Atlas](medicine/)** | The medical curriculum in 27 courses and 224 chapters, every lesson in English and Chinese, for education only (not medical advice): cells and genes, anatomy and physiology, infection and immunity, pathology and pharmacology, every organ system in health and disease, clinical practice and population health, with 224 interactive figures and 1 808 exercises. |
| **[Peptide Atlas](peptides/)** | 44 therapeutic and research peptides (semaglutide, insulin, tirzepatide, BPC-157 …) drawn residue by residue, with 3D structures, history, regulation and worldwide attention. |

**Skeletons, to be completed.** These eight atlases are curricula so far: every course and chapter is
mapped out with a summary and its prerequisites, the guides for writing them are in place, and the
lessons are still to be written. Each says "(skeleton)" in its title until it is finished.

| | |
|---|---|
| **[Chemistry Atlas](chemistry/)** (skeleton) | 24 courses and 211 chapters: general, physical, inorganic, organic and analytical chemistry, spectroscopy, biochemistry and medicinal chemistry, materials, polymers and the environment. |
| **[Computer Science Atlas](cs/)** (skeleton) | 22 courses and 197 chapters: programming and languages, data structures and algorithms, computability and complexity, systems, networks, databases, AI, security and cryptography, graphics and software engineering. |
| **[Biology Atlas](biology/)** (skeleton) | 21 courses and 187 chapters: molecules and cells, genetics and genomics, microbes, plants and animals, neuroscience and behaviour, evolution, ecology and quantitative biology. |
| **[Mechanical and Aerospace Engineering Atlas](mechanical/)** (skeleton) | 24 courses and 215 chapters: solid mechanics, dynamics and vibration, thermofluids, materials and manufacturing, design, control and robotics, aerodynamics, propulsion and orbits. |
| **[Economics and Finance Atlas](economics/)** (skeleton) | 25 courses and 220 chapters, for education only (not investment advice): micro- and macroeconomics, econometrics, game theory, finance, trade, development, and public and behavioural economics. |
| **[Earth and Climate Science Atlas](earth/)** (skeleton) | 24 courses and 216 chapters: the Earth system, geology and geophysics, landscapes and water, the atmosphere, oceans and ice, Earth history and the climate system. |
| **[English Language Atlas](english/)** (skeleton) | 26 courses and 251 chapters from CEFR level A1 to C2, for learners and especially Chinese speakers: pronunciation, vocabulary, grammar, reading, writing, listening and speaking, linguistics, the history and varieties of English, and English–Chinese translation. |
| **[Chinese Language and Literature Atlas](chinese/)** (skeleton) | 28 courses and 270 chapters for native speakers, at the level of a university degree in Chinese: characters and calligraphy, modern Chinese, classical Chinese, literature from the *Book of Songs* to the present day, literary theory and world literature, and writing and reasoning. Written in Chinese first; the site opens in Chinese. |

All are plain PHP sites: no framework, no database, no build step needed to serve them, and every
script, font and library is self-hosted. The thirteen course atlases share one lesson engine (each keeps
its own copy); the eight skeletons are generated from the Maths Atlas engine by
[`tools/mkatlas.py`](tools/mkatlas.py) and the specs in `tools/atlas-specs/`, and re-running it
brings later engine fixes into them without touching their content.

## Quick start

```sh
git clone https://github.com/c2h2/learn-atlases.git
cd learn-atlases
php -S localhost:8000          # PHP 8.1+ with mbstring
```

Open <http://localhost:8000/>. Each site writes caches to its own `data/cache/` (created on first
use; the web server needs write access).

Optional, for speed and completeness:

- **Maths:** `cd maths && tools/build.sh` (Node 18+) pre-renders every formula with KaTeX and checks
  all lessons; without it, formulas are rendered in the browser. See [maths/README.md](maths/README.md).
  The EE, LLM and Medicine atlases and the eight skeletons have the same tools (see their READMEs); for Physics run
  `php tools/extract.php && node tools/build.js && php tools/prerender.php`.
- **Peptides:** `cd peptides && tools/refresh.sh` fetches Wikipedia, PubMed, ClinicalTrials.gov,
  PubChem and PDB data (attention maps and charts stay empty until then). See
  [peptides/README.md](peptides/README.md).

## Layout

```
index.php, assets/     the /learn landing page
maths/                 Maths Atlas
physics/               Physics Atlas
ee/                    Electrical Engineering Atlas (curriculum; lessons being written)
llm/                   LLM Atlas (curriculum; lessons in preparation)
medicine/              Medicine Atlas
peptides/              Peptide Atlas
chemistry/  cs/  biology/  mechanical/  economics/  earth/  english/  chinese/
                       the eight skeleton atlases (curricula; lessons to be written)
tools/                 mkatlas.py, which generates the skeleton atlases from the Maths engine, and their specs
```

## Deploying

Serve the repository root (or any subdirectory) with PHP-FPM behind Caddy, nginx or Apache. Static
assets carry `?v=<mtime>` and can be cached for a long time. If the checkout itself is the web root,
make sure the server does not serve dotfiles such as `.git`.

## Licence

Public domain: the code and content of this repository are dedicated to the public domain under
[CC0 1.0](LICENSE). You may copy, modify, publish and use them for any purpose, commercial or not,
without asking permission or giving credit.

The bundled libraries, fonts and structure files keep their own licences:
[KaTeX](https://katex.org) (MIT), [D3](https://d3js.org) (ISC), [TopoJSON](https://github.com/topojson/topojson)
(BSD-3-Clause), [world-atlas](https://github.com/topojson/world-atlas) (ISC, Natural Earth data),
[3Dmol.js](https://3dmol.org) (BSD-3-Clause), [Archivo](https://github.com/Omnibus-Type/Archivo) and
[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) (SIL Open Font License 1.1), and protein
structures from the [RCSB Protein Data Bank](https://www.rcsb.org) (CC0) or predicted with ESMFold.
Their notices are in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
