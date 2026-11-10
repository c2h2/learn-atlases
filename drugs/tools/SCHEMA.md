# Drug record schema (`data/drugs/<slug>.json`)

One UTF-8 JSON file per drug, English only for now. `tools/skeleton.py` creates
every roster entry with `"stage": "skeleton"`; writers fill the record and set
`"stage": "written"`. Check with `python3 tools/validate.py`.

## Accuracy rules
- Every hard fact must be verifiable (regulator labels, FDA/EMA pages, PubMed, DrugBank, Wikipedia).
  If unsure, use `null` / leave it out. Never guess dates, PMIDs or sales figures.
- Neutral, encyclopedic, sentence case. Dosing only as labelled regimens; no advice.

## Fields (all are grouping criteria where marked ★)
| field | type | notes |
|---|---|---|
| `slug`, `name` | string | INN-style name |
| `aliases` | string[] | code names, other INNs (USAN/BAN) |
| `brands` | string[] | main brand names |
| `area` ★ | enum | therapeutic area, see `AREAS` in `inc/data.php` |
| `drug_class` ★ | string | pharmacological class, e.g. "HMG-CoA reductase inhibitor (statin)" |
| `modality` ★ | enum | `small-molecule`, `peptide`, `protein`, `antibody`, `adc`, `oligonucleotide`, `gene-therapy`, `cell-therapy`, `vaccine`, `radioligand`, `gas`, `other` |
| `routes` ★ | enum[] | `oral`, `iv`, `im`, `sc`, `inhaled`, `topical`, `transdermal`, `intranasal`, `sublingual`, `rectal`, `ophthalmic`, `intrathecal`, `intravitreal`, `vaginal`, `other` |
| `route_note` | string | e.g. "oral tablet once daily; IV for severe infection" |
| `targets` ★ | string[] | molecular targets (gene symbols where possible) |
| `origin` ★ | enum | `natural`, `semi-synthetic`, `synthetic`, `biotech`, `endogenous` |
| `originator` ★ | string | company/institute that discovered/developed it |
| `owner` ★ | string | current main marketing-authorisation holder (2026); "generic (many)" if off-patent |
| `first_approval` | object | `{year:int, agency:"FDA"|"EMA"|..., country, brand}` |
| `discovery` | object | `{year:int, by:string, note:string}` |
| `generic` ★ | bool | generic / biosimilar versions available |
| `who_essential` ★ | bool | on WHO Model List of Essential Medicines (2025) |
| `rx_status` | string | e.g. "prescription", "OTC in many countries", "controlled (US Schedule II)" |
| `tagline` | string | ≤ 90 chars |
| `summary` | string | 2–3 sentences |
| `mechanism` | string[] | 1–3 paragraphs: how it works |
| `uses` | string[] | main approved indications |
| `history` | object[] | 5–12 `{year, title, detail}` chronological |
| `pk` | object | `{half_life, bioavailability, metabolism, excretion}` strings |
| `safety` | object | `{common:[], serious:[], boxed_warning:string|null}` |
| `facts` | string[] | 1–4 verifiable facts |
| `related` | string[] | slugs in this atlas |
| `references` | object[] | `{title, url}` verified links |
| `stage` | enum | `skeleton` or `written` |
