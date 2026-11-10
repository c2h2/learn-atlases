#!/usr/bin/env python3
"""Check every record against the roster and schema enums. Exit 1 on errors."""
import json, pathlib, sys
ROOT = pathlib.Path(__file__).resolve().parent.parent
AREAS = {"cardiovascular","metabolic-endocrine","antibacterial","anti-infective-other","oncology","immunology-biologics",
         "neurology-pain","psychiatry-anaesthesia","respiratory-gastro-urology","haematology-rare-other"}
MOD = {"small-molecule","peptide","protein","antibody","adc","oligonucleotide","gene-therapy","cell-therapy","vaccine","radioligand","gas","other",None}
ROUTES = {"oral","iv","im","sc","inhaled","topical","transdermal","intranasal","sublingual","rectal","ophthalmic","intrathecal","intravitreal","vaginal","other"}
ORIG = {"natural","semi-synthetic","synthetic","biotech","endogenous",None}
roster = [s for l in (ROOT/"tools/roster.txt").read_text().splitlines() if not l.startswith("#") for s in l.split()]
err = []; written = 0
files = {p.stem: p for p in (ROOT/"data/drugs").glob("*.json")}
for s in set(roster) - set(files): err.append(f"{s}: in roster, no file")
for s in set(files) - set(roster): err.append(f"{s}: file not in roster")
for slug, p in sorted(files.items()):
    try: d = json.loads(p.read_text())
    except Exception as e: err.append(f"{slug}: bad JSON {e}"); continue
    e = lambda m: err.append(f"{slug}: {m}")
    if d.get("slug") != slug: e("slug mismatch")
    if d.get("area") not in AREAS: e(f"area {d.get('area')!r}")
    if d.get("modality") not in MOD: e(f"modality {d.get('modality')!r}")
    if d.get("origin") not in ORIG: e(f"origin {d.get('origin')!r}")
    for r in d.get("routes", []):
        if r not in ROUTES: e(f"route {r!r}")
    for r in d.get("related", []):
        if r not in files: e(f"related {r!r} not in atlas")
    if d.get("stage") == "written":
        written += 1
        for k in ("drug_class","modality","routes","origin","originator","owner","tagline","summary","mechanism","uses","history","references"):
            if not d.get(k): e(f"written but {k} empty")
        ys = [h.get("year") for h in d.get("history", [])]
        if ys != sorted(ys): e("history not chronological")
print("\n".join(err[:200]))
print(f"{len(files)} records, {written} written, {len(err)} errors")
sys.exit(1 if err else 0)
