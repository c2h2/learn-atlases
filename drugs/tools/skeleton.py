#!/usr/bin/env python3
"""Create a skeleton record for every roster slug that has no file yet (never overwrites)."""
import json, pathlib, re
ROOT = pathlib.Path(__file__).resolve().parent.parent
AREA = {"01": "cardiovascular", "02": "metabolic-endocrine", "03": "antibacterial", "04": "anti-infective-other",
        "05": "oncology", "06": "immunology-biologics", "07": "neurology-pain", "08": "psychiatry-anaesthesia",
        "09": "respiratory-gastro-urology", "10": "haematology-rare-other"}
UPPER = {"b": "B", "alfa": "alfa"}
def nice(slug):
    words = slug.split("-")
    s = " ".join(words)
    s = re.sub(r"\b(\d+)\b", r"\1", s)
    return s[:1].upper() + s[1:]
group = None
made = 0
for line in (ROOT / "tools/roster.txt").read_text().splitlines():
    if line.startswith("## "):
        group = line[3:5]; continue
    if not line.strip() or line.startswith("#"):
        continue
    for slug in line.split():
        f = ROOT / "data/drugs" / f"{slug}.json"
        if f.exists():
            continue
        rec = {"slug": slug, "name": nice(slug), "aliases": [], "brands": [], "area": AREA[group],
               "batch": group, "drug_class": None, "modality": None, "routes": [], "route_note": None,
               "targets": [], "origin": None, "originator": None, "owner": None,
               "first_approval": None, "discovery": None, "generic": None, "who_essential": None,
               "rx_status": None, "tagline": None, "summary": None, "mechanism": [], "uses": [],
               "history": [], "pk": {}, "safety": {"common": [], "serious": [], "boxed_warning": None},
               "facts": [], "related": [], "references": [], "stage": "skeleton"}
        f.write_text(json.dumps(rec, ensure_ascii=False, indent=2) + "\n")
        made += 1
print(f"created {made} skeleton records")
