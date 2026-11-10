# Drug Atlas

500 medicines (roster: `tools/roster.txt`, 10 areas × 50), one JSON record each in
`data/drugs/<slug>.json` (schema: `tools/SCHEMA.md`). English only for now.

- `index.php?by=<criterion>&q=<text>` — every drug grouped by area, oral/injected, each route,
  modality, class, target, origin, owner, originator, approval decade, generic, WHO-essential, stage.
- `drug.php?d=<slug>` — profile: facts, how it works, uses, history, PK, safety, sources.
- `python3 tools/skeleton.py` creates missing roster records (never overwrites);
  `python3 tools/validate.py` checks enums, roster, related links and completeness of `written` records.
