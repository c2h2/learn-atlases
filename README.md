# Learn — interactive atlases

Long-form, interactive references for self-study, in English and Simplified Chinese.
Every topic is explained in depth, with figures you can play with. Live at <https://f.g77k.com/learn/>.

| | |
|---|---|
| **[Maths Atlas](maths/)** | University mathematics in 18 courses and 141 chapters, from logic and calculus to analysis, algebra, probability, differential equations, topology, geometry and measure theory. Definitions, theorems with proofs, worked examples, 410 interactive figures and 1 400 exercises with full solutions. |
| **[Peptide Atlas](peptides/)** | 44 therapeutic and research peptides (semaglutide, insulin, tirzepatide, BPC-157 …) drawn residue by residue, with 3D structures, history, regulation and worldwide attention. |

Both are plain PHP sites: no framework, no database, no build step needed to serve them, and every
script, font and library is self-hosted.

## Quick start

```sh
git clone https://github.com/c2h2/learn-atlases.git
cd learn-atlases
php -S localhost:8000          # PHP 8.1+ with mbstring
```

Open <http://localhost:8000/>. The sites write caches to `maths/data/cache/` and
`peptides/data/cache/` (created on first use; the web server needs write access).

Optional, for speed and completeness:

- **Maths:** `cd maths && tools/build.sh` (Node 18+) pre-renders every formula with KaTeX and checks
  all lessons; without it, formulas are rendered in the browser. See [maths/README.md](maths/README.md).
- **Peptides:** `cd peptides && tools/refresh.sh` fetches Wikipedia, PubMed, ClinicalTrials.gov,
  PubChem and PDB data (attention maps and charts stay empty until then). See
  [peptides/README.md](peptides/README.md).

## Layout

```
index.php, assets/     the /learn landing page
maths/                 Maths Atlas
peptides/              Peptide Atlas
```

## Deploying

Serve the repository root (or any subdirectory) with PHP-FPM behind Caddy, nginx or Apache. Static
assets carry `?v=<mtime>` and can be cached for a long time. If the checkout itself is the web root,
make sure the server does not serve dotfiles such as `.git`.

## Third-party components

Self-hosted copies, each under its own licence:
[KaTeX](https://katex.org) (MIT), [D3](https://d3js.org) (ISC), [TopoJSON](https://github.com/topojson/topojson)
and [world-atlas](https://github.com/topojson/world-atlas) (ISC, Natural Earth data),
[3Dmol.js](https://3dmol.org) (BSD-3-Clause), and the fonts [Archivo](https://github.com/Omnibus-Type/Archivo)
and [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) (SIL Open Font License 1.1).
Peptide structures come from the [RCSB Protein Data Bank](https://www.rcsb.org) (CC0) or are
predicted with ESMFold.
