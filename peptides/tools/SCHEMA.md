# Peptide record schema (`data/peptides/<slug>.json`)

One UTF-8 JSON file per peptide. The PHP site renders every field; the fetch
pipeline (`tools/fetch.php`) adds popularity data automatically from `wiki`
and `queries`, so do **not** hand-write pageviews, paper counts or trial counts.

Reference implementation: `data/peptides/semaglutide.json`. Match its depth.

## Accuracy rules (most important)

- Every hard fact must be verifiable. Use `python3 tools/lookup.py` to check
  PubChem (`pubchem`, `cid`), RCSB (`pdb`, `pdbsearch`), Wikipedia (`wiki`),
  UniProt, ChEMBL, KEGG, and every reference (`pmid`, `doi`).
- Use WebSearch/WebFetch for regulatory dates and anything from 2024-2026.
  Today is 2026-09-29, so check for 2025-2026 news (approvals, trial readouts,
  FDA/WADA actions) before writing a history.
- If you cannot verify something, leave it out (or use `null`). Never guess a
  PMID, DOI, PDB ID, CAS number, date or sales figure.
- References: only PubMed (`https://pubmed.ncbi.nlm.nih.gov/<PMID>/`) or DOI
  links you have checked with `lookup.py pmid` / `lookup.py doi`, plus
  official regulator/company pages you actually opened.
- No dosing protocols for unapproved peptides. For approved products, the
  labelled regimen is fine (`dosing`). For grey-market/research peptides,
  describe how and why people use them neutrally, and state the evidence gap.
- Plain, neutral, encyclopedic English. Sentence case. No marketing language.

## Fields

| field | type | notes |
|---|---|---|
| `slug` | string | file name without `.json`; lowercase, hyphens |
| `name` | string | display name, e.g. `"Elamipretide (SS-31)"` |
| `aliases` | string[] | code names, synonyms, abbreviations (not brands) |
| `category` | enum | `metabolic`, `longevity`, `repair`, `gh`, `melanocortin`, `neuro`, `hormone` |
| `drug_class` | string | pharmacological class, e.g. `"GLP-1 receptor agonist"` |
| `subclass` | string | finer description |
| `status` | enum | `approved` (FDA and/or EMA), `regional` (approved only in some countries, e.g. Russia/China/Japan), `clinical` (in trials, not approved anywhere), `research` (not approved; preclinical or grey-market) |
| `status_note` | string | one sentence explaining the status |
| `evidence` | int 1-5 | human evidence: 5 = approved + large RCT programme; 4 = phase 3 / approval on smaller trials; 3 = phase 1-2 trials; 2 = small human studies/case series, mostly animal; 1 = animal/in vitro only |
| `evidence_note` | string | why that score |
| `tagline` | string | <= 90 chars, what it is in one line |
| `summary` | string | 2-3 sentences, plain English |
| `overview` | string[] | 2-4 paragraphs |
| `mechanism` | string[] | 1-3 paragraphs |
| `origin` | string | natural source / what it is derived from |
| `discovery` | object | `{year:int, by:string, where:string, note:string}` (year = first isolation/synthesis/description) |
| `first_human_year` | int\|null | first documented human administration/trial |
| `first_approval` | object\|null | `{date:"YYYY-MM-DD" or "YYYY-MM" or "YYYY", agency, region, brand, indication}` - earliest approval anywhere |
| `developer` | string | originator company / institute |
| `brands` | object[] | `{name, company, route, use, approved:"YYYY-MM-DD", agency}` - approved products only |
| `analogs` | object[] | optional: `{name, note}` related molecules shown in a table (insulin analogues, desmopressin, etc.) |
| `targets` | object[] | `{name, gene, uniprot, action}` |
| `sequence` | object | see below |
| `formula` | string\|null | molecular formula, from PubChem where possible |
| `mw` | number\|null | average molecular weight g/mol |
| `half_life` | string | human text, e.g. `"≈ 7 days"` |
| `half_life_hours` | number\|null | numeric (hours) for charts; null if unknown |
| `routes` | string[] | routes of administration |
| `structure` | object | `{pdb:[...], pubchem_cid:int\|null, notes:string}` - see below |
| `ids` | object | any of `pubchem_cid, cas, drugbank, chembl, unii, kegg, chebi, atc, uniprot, inn` (verified only) |
| `wiki` | string | exact English Wikipedia title (verify with `lookup.py wiki`) |
| `queries` | object | `{pubmed:string, ctgov:string}` - see below |
| `uses` | object | `{approved:[...], investigational:[...], off_label:[...]}` - see below |
| `history` | object[] | 8-20 dated events (see below), chronological |
| `regulatory` | object[] | `{region, status, detail}` |
| `pk` | object | `{half_life, tmax, bioavailability, metabolism, excretion}` - strings, omit unknown keys |
| `dosing` | object[]\|null | approved products only: `{product, regimen}` |
| `dosing_note` | string | e.g. "No approved human dose; ..." for research peptides |
| `safety` | object | `{common:[string], serious:[string], warnings:[string], notes:string}` |
| `market` | object\|null | `{note:string, figures:[{year, label, value, source}]}` - only verified numbers |
| `facts` | string[] | 2-5 short interesting, verifiable facts |
| `related` | string[] | slugs of related peptides in this atlas |
| `references` | object[] | 4-10 `{title, authors, journal, year, url}` - verified |

### `sequence`

```json
"sequence": {
  "chains": [
    {"name": "Peptide", "residues": ["H","Aib","E","G", "..."], "n_term": "H", "c_term": "OH"}
  ],
  "numbering_offset": 6,
  "cyclic": false,
  "bridges": [{"from": "A1", "to": "A6", "type": "disulfide"}],
  "modifications": [
    {"at": "A20", "type": "lipidation", "label": "Lys26 carries a C18 fatty diacid via a γGlu-2×OEG linker", "short": "C18 diacid"}
  ],
  "notation": "H-His-Aib-Glu-Gly-...-Gly-OH",
  "note": "optional free text (e.g. mixture, which fragment is shown)"
}
```

- `residues`: one token per residue. Upper-case one-letter code = L-amino acid.
  **Lower-case one-letter code = D-amino acid** (`a` D-Ala, `f` D-Phe, `w` D-Trp,
  `r` D-Arg, `l` D-Leu ...). Multi-letter tokens must come from
  `data/residues.json` → `tokens` (Aib, Nle, Dmt, Nal, dNal, pGlu, Mpa, aMeLeu,
  aMeF, aMeK, dMeW, Sar, Hyp, Orn, Abu, Cit, NMeLeu, NMeVal, NMeAsn, NMeBmt, Tle, Cha,
  bAla, Gla, gGlu, Ac4c). If you truly need a new token, use the closest one and explain in
  `modifications`, and mention it in your final report.
- `n_term`: `"H"` (free amine), `"Ac"` (acetyl) or a short text for other caps
  (`"trans-3-hexenoyl"`). pGlu is a residue, not an n_term.
- `c_term`: `"OH"` (acid), `"NH2"` (amide), `"NHEt"` (ethylamide), `"ol"` (alcohol, e.g. Thr-ol).
- Positions in `bridges`/`modifications` are `"<chain letter><1-based index>"`,
  chain letter A = first chain, B = second. Bridge `type`: `disulfide`, `lactam`,
  `thioether`, `other`. Head-to-tail cyclic peptides: `"cyclic": true`.
- Modification `type`: `lipidation`, `nonnatural`, `d-amino`, `pegylation`,
  `albumin-binder`, `acetylation`, `amidation`, `metal`, `glycosylation`, `other`.
  Always annotate non-canonical and D-residues with a modification entry.
- `numbering_offset`: optional, when the literature numbers residues from a
  parent hormone (GLP-1 analogues start at His7 → offset 6).
- Multi-chain (insulin): two chains named `"A chain"`, `"B chain"`.
- Large proteins/mixtures: give the defining sequence and explain in `note`.

### `structure.pdb`

```json
{"id": "7KI0", "title": "Semaglutide-bound GLP-1 receptor in complex with Gs", "method": "Cryo-EM",
 "resolution": 2.5, "year": 2021, "peptide_chain": "P", "note": "peptide in its receptor-bound pose"}
```

Find entries with `lookup.py pdbsearch "<name>"` and confirm with `lookup.py pdb ID`
(gives chains). `peptide_chain` = auth chain ID of the peptide itself (the viewer
highlights it). List the most informative 1-4 entries, best first (the
peptide alone or bound to its receptor). Only real entries. If there is no
experimental structure, use `"pdb": []` and say so in `notes`; the site will
generate a predicted model automatically.

### `queries`

- `pubmed`: PubMed query for papers per year, e.g. `"semaglutide[tiab]"`,
  `"(elamipretide[tiab] OR \"SS-31\"[tiab] OR bendavia[tiab] OR MTP-131[tiab])"`.
  Aim for precision (few false hits) with good recall of synonyms.
- `ctgov`: ClinicalTrials.gov intervention search, e.g. `"semaglutide"`,
  `"elamipretide OR SS-31 OR MTP-131"`. Use `""` if clearly none.
- `ctgov_exclude` (optional): NCT numbers to drop from the counts (e.g. records that are not genuine trials).

### `uses`

```json
"uses": {
  "approved": [{"use": "Type 2 diabetes", "detail": "...", "since": 2017, "where": "US, EU, Japan, China ..."}],
  "investigational": [{"use": "Alzheimer's disease", "stage": "Phase 3 - failed (2025)", "detail": "..."}],
  "off_label": [{"use": "Cosmetic weight loss", "detail": "...", "evidence": "..."}]
}
```

`off_label` covers off-label prescribing and non-medical / biohacking /
grey-market use, described neutrally with the evidence behind it.

### `history` events

```json
{"year": 2017, "date": "2017-12-05", "title": "FDA approves Ozempic", "detail": "...", "kind": "approval"}
```

`kind`: `discovery`, `science`, `trial`, `approval`, `regulatory`, `market`,
`culture`, `safety`. `date` optional (`"YYYY-MM-DD"` or `"YYYY-MM"`). Titles
are short sentence-case headlines; `detail` 1-2 sentences.

### `regulatory`

Regions: `US`, `EU`, `UK`, `China`, `Japan`, `Russia`, `India`, `Canada`,
`Australia`, `Brazil`, `WADA` (include WADA for anything sport-relevant).
`status`: `approved`, `conditional`, `generic`, `not-approved`,
`investigational`, `restricted`, `withdrawn`, `prohibited` (WADA),
`permitted` (WADA). Include only regions you can support.
