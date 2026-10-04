#!/usr/bin/env python3
"""Validate peptide JSON records against tools/SCHEMA.md.

  python3 tools/validate.py                 # all files in data/peptides
  python3 tools/validate.py data/peptides/semaglutide.json
Exit code 1 if any ERROR. WARN lines are advisory.
"""
import json, os, re, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = json.load(open(os.path.join(ROOT, "data", "residues.json")))
STD = set(RES["standard"].keys())
TOK = set(RES["tokens"].keys())
SLUGS = {
 "semaglutide","tirzepatide","retatrutide","liraglutide","exenatide","survodutide","mazdutide",
 "insulin","c-peptide","glucagon","pramlintide","cagrilintide","eloralintide","teriparatide","octreotide","leuprolide",
 "mots-c","ss-31","humanin","epitalon","ghk-cu","bpc-157","tb-500",
 "kpv","ll-37","thymosin-alpha-1","semax","selank","dsip","cyclosporine",
 "ipamorelin","cjc-1295","sermorelin","tesamorelin","ghrp-6","ghrp-2","aod-9604",
 "melanotan-ii","bremelanotide","afamelanotide","setmelanotide","oxytocin","vasopressin","kisspeptin"}
CATS = {"metabolic","longevity","repair","gh","melanocortin","neuro","hormone"}
STATUS = {"approved","regional","clinical","research"}
KINDS = {"discovery","science","trial","approval","regulatory","market","culture","safety"}
REG = {"approved","conditional","generic","not-approved","investigational","restricted","withdrawn","prohibited","permitted"}
MODT = {"lipidation","nonnatural","d-amino","pegylation","albumin-binder","acetylation","amidation","metal","glycosylation","other"}
BRT = {"disulfide","lactam","thioether","other"}
DATE = re.compile(r"^\d{4}(-\d{2}(-\d{2})?)?$")

def check(path):
    errs, warns = [], []
    E = errs.append; W = warns.append
    try:
        d = json.load(open(path, encoding="utf-8"))
    except Exception as ex:
        return [f"JSON parse error: {ex}"], []
    slug = os.path.basename(path)[:-5]
    if d.get("slug") != slug: E(f"slug '{d.get('slug')}' != filename '{slug}'")
    for k in ["name","category","drug_class","status","evidence","tagline","summary","overview","mechanism",
              "origin","discovery","sequence","structure","ids","wiki","queries","uses","history","regulatory",
              "safety","related","references"]:
        if k not in d: E(f"missing field '{k}'")
    if d.get("category") not in CATS: E(f"category '{d.get('category')}' not in {sorted(CATS)}")
    if d.get("status") not in STATUS: E(f"status '{d.get('status')}' not in {sorted(STATUS)}")
    if not isinstance(d.get("evidence"), int) or not 1 <= d.get("evidence", 0) <= 5: E("evidence must be int 1-5")
    if len(d.get("tagline") or "") > 110: W("tagline longer than 110 chars")
    for k, n in (("overview", 2), ("mechanism", 1)):
        v = d.get(k)
        if not isinstance(v, list) or len(v) < n or not all(isinstance(x, str) and x.strip() for x in v): E(f"{k} must be a list of >= {n} non-empty strings")
    disc = d.get("discovery") or {}
    if not isinstance(disc, dict) or not isinstance(disc.get("year"), int): E("discovery.year must be an int")
    fa = d.get("first_approval")
    if fa is not None:
        if not isinstance(fa, dict) or not DATE.match(str(fa.get("date", ""))): E("first_approval.date must be YYYY[-MM[-DD]]")
    if d.get("status") == "approved" and not fa: W("status approved but first_approval is null")
    for b in d.get("brands") or []:
        if b.get("approved") and not DATE.match(str(b["approved"])): E(f"brand {b.get('name')} approved date format")
    for x in ("mw", "half_life_hours"):
        if d.get(x) is not None and not isinstance(d.get(x), (int, float)): E(f"{x} must be number or null")
    # sequence
    seq = d.get("sequence") or {}
    chains = seq.get("chains") or []
    if not chains: E("sequence.chains empty")
    lens = []
    for ci, c in enumerate(chains):
        r = c.get("residues") or []
        if not r: E(f"chain {ci} has no residues")
        for i, t in enumerate(r):
            if t in STD or (len(t) == 1 and t.upper() in STD and t.islower()) or t in TOK: continue
            E(f"chain {ci} residue {i+1}: unknown token '{t}'")
        if c.get("c_term") not in (None, "OH", "NH2", "NHEt", "ol"): W(f"chain {ci} c_term '{c.get('c_term')}' unusual")
        lens.append(len(r))
    def pos_ok(p, what):
        m = re.match(r"^([A-Z])(\d+)$", str(p))
        if not m: E(f"{what}: bad position '{p}'"); return
        ci, i = ord(m.group(1)) - 65, int(m.group(2))
        if ci >= len(lens) or not 1 <= i <= lens[ci]: E(f"{what}: position '{p}' out of range")
    for b in seq.get("bridges") or []:
        pos_ok(b.get("from"), "bridge"); pos_ok(b.get("to"), "bridge")
        if b.get("type") not in BRT: E(f"bridge type '{b.get('type')}'")
    modpos = set()
    for m in seq.get("modifications") or []:
        pos_ok(m.get("at"), "modification"); modpos.add(m.get("at"))
        if m.get("type") not in MODT: E(f"modification type '{m.get('type')}'")
        if not m.get("label"): E(f"modification at {m.get('at')} lacks label")
    for ci, c in enumerate(chains):
        for i, t in enumerate(c.get("residues") or []):
            if (t in TOK or (len(t) == 1 and t.islower())) and f"{chr(65+ci)}{i+1}" not in modpos:
                W(f"non-canonical/D residue '{t}' at {chr(65+ci)}{i+1} has no modification note")
    # structure
    st = d.get("structure") or {}
    for p in st.get("pdb") or []:
        if not re.match(r"^[0-9][A-Za-z0-9]{3}$", str(p.get("id", ""))): E(f"bad PDB id {p.get('id')}")
        if not p.get("peptide_chain"): W(f"PDB {p.get('id')} lacks peptide_chain")
    # queries
    q = d.get("queries") or {}
    if "pubmed" not in q or "ctgov" not in q: E("queries needs pubmed and ctgov")
    # uses
    u = d.get("uses") or {}
    for k in ("approved", "investigational", "off_label"):
        if k not in u: E(f"uses.{k} missing (use [] if none)")
    # history
    h = d.get("history") or []
    if len(h) < 6: W(f"only {len(h)} history events (aim for 8-20)")
    prev = None
    for ev in h:
        if not isinstance(ev.get("year"), int): E(f"history event '{ev.get('title')}' year not int")
        if ev.get("kind") not in KINDS: E(f"history kind '{ev.get('kind')}' ({ev.get('title')})")
        if ev.get("date") and not DATE.match(ev["date"]): E(f"history date '{ev.get('date')}'")
        if ev.get("date") and not str(ev["date"]).startswith(str(ev.get("year"))): E(f"history date/year mismatch: {ev.get('title')}")
        key = (ev.get("year", 0), ev.get("date") or "")
        if prev and key[0] < prev[0]: E(f"history not chronological at '{ev.get('title')}'")
        prev = key
    for r in d.get("regulatory") or []:
        if r.get("status") not in REG: E(f"regulatory status '{r.get('status')}' ({r.get('region')})")
    for s in d.get("related") or []:
        if s not in SLUGS: E(f"related slug '{s}' unknown")
        if s == slug: E("related contains itself")
    refs = d.get("references") or []
    if len(refs) < 3: W(f"only {len(refs)} references")
    for r in refs:
        if not str(r.get("url", "")).startswith("http"): E(f"reference without url: {r.get('title')}")
    saf = d.get("safety") or {}
    for k in ("common", "serious", "warnings"):
        if k in saf and not isinstance(saf[k], list): E(f"safety.{k} must be a list")
    if d.get("status") in ("research", "clinical") and d.get("dosing"): W("dosing given for a non-approved peptide")
    return errs, warns

if __name__ == "__main__":
    files = sys.argv[1:] or sorted(glob.glob(os.path.join(ROOT, "data", "peptides", "*.json")))
    bad = 0
    for f in files:
        e, w = check(f)
        tag = "OK " if not e else "ERR"
        print(f"{tag} {os.path.basename(f)}  ({len(e)} errors, {len(w)} warnings)")
        for x in e: print("   ERROR", x)
        for x in w: print("   warn ", x)
        bad += bool(e)
    sys.exit(1 if bad else 0)
