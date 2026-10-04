# Peptide Atlas

A PHP site (no framework, no database) that visualises therapeutic and research
peptides: residue-level sequence drawings, 3D structures, history of use,
regulatory status, and worldwide attention (Wikipedia readership by language and
country, PubMed output, ClinicalTrials.gov activity).

Served at `https://f.g77k.com/learn/peptides/` (moved from `/peptides/` on 2026-10-01; the old URLs redirect) by the existing Caddy + PHP-FPM 8.1 setup. The index at `/learn/` links it with its sibling, Maths Atlas (`/learn/maths/`).
All JavaScript libraries and fonts are self-hosted in `assets/`.

## Pages

| Page | What it shows |
|---|---|
| `index.php` | The register: every peptide drawn as its residue chain, with filters, plus overview charts |
| `peptide.php?p=<slug>` | Full profile: chain, 3D viewer, facts, history, uses, popularity maps, research, chemistry, safety, regulation, sources |
| `timeline.php` | Discovery-to-approval lifelines and every dated event |
| `world.php` | World map (readers or trial sites), attention ranking, momentum, interest by language |
| `families.php` | Alignments of drugs against their parent hormones |
| `structures.php` | Gallery of experimental structures and predicted models |
| `compare.php?p=a,b,c` | Up to three peptides side by side |
| `about.php` | Sources and methods |
| `api.php` | JSON API (`?p=<slug>`, `&include=wiki,pubmed,ctgov,country,pubchem`, `?events`) |

## Data

- `data/peptides/<slug>.json`: one hand-curated record per peptide. Schema in
  `tools/SCHEMA.md`; check with `python3 tools/validate.py`.
- `data/residues.json`: residue tokens (L, D and non-canonical) and colour classes.
- `data/families.json`, `data/milestones.json`: alignments and field-wide events.
- `data/cache/`: everything fetched automatically (safe to delete and refetch).
- `data/structures/`: PDB coordinates, ESMFold models and computed conformers.

## Languages (English / 简体中文)

Every page is bilingual. The language comes from `?lang=en|zh` (remembered in a cookie),
otherwise from the browser's Accept-Language; the header has a 中文 / EN switch.

- Interface strings: `t('English text')` in PHP and `Atlas.t()` in JS, translated in
  `inc/lang/zh.php`. `php tools/i18n_keys.php --missing --js` lists untranslated keys and
  regenerates `inc/lang/js_keys.php` (the subset sent to the browser).
- Peptide content: `data/i18n/zh/peptides/<slug>.json` overlays the translatable fields of each
  English record (same paths, lists in the same order). After editing an English record, run
  `python3 tools/i18n_skeleton.py --check` — it reports any overlay that no longer matches
  (e.g. a new history event) — and translate the new text following `tools/GLOSSARY_ZH.md`.
  New records get a skeleton with `python3 tools/i18n_skeleton.py`.
- Family blurbs and field milestones: `data/i18n/zh/families.json`, `data/i18n/zh/milestones.json`.
- Chinese Wikipedia summaries: `php tools/fetch.php wikizh` (part of `tools/refresh.sh`).
- Compiled data is cached per language in `data/cache/compiled-en.json` / `compiled-zh.json`.

## Refreshing

```sh
tools/refresh.sh          # all fetched data, about 15-25 minutes
```

or piece by piece with `php tools/fetch.php <wiki|editions|pubmed|ctgov|pubchem|pdb|country> [slug…] [--force]`.
Per-country readership needs `tools/dp_download.sh <end-date>` first (Wikimedia's
differentially private daily files, ~7 MB each compressed).

Models for peptides without a PDB entry: `python3 tools/build_models.py` (needs
`pip install rdkit` for conformers), then `tools/previews.sh` for gallery images.

A weekly cron line is suggested at the top of `tools/refresh.sh`.

## Adding a peptide

1. Write `data/peptides/<slug>.json` following `tools/SCHEMA.md` (use `tools/lookup.py`
   to check PubChem, PDB, Wikipedia, PMIDs and DOIs).
2. Add the slug to `SLUGS` in `tools/validate.py` and run it.
3. `php tools/fetch.php all <slug>` and, if it has no PDB entry, `python3 tools/build_models.py <slug>`.
