#!/usr/bin/env python3
"""Chinese overlay files for peptide records (dev tool).

  python3 tools/i18n_skeleton.py            write missing skeletons data/i18n/zh/peptides/<slug>.json
  python3 tools/i18n_skeleton.py --check    verify every overlay against its English record

A skeleton holds only the translatable text of a record, at the same paths, pre-filled with
the English text. Translators replace the values; the site overlays them onto the English record
when the page language is Chinese. Lists must keep the same length and order as the English record.
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "peptides")
DST = os.path.join(ROOT, "data", "i18n", "zh", "peptides")

# translatable paths: str = single string, [str] = list of strings, {…} = object, [{…}] = list of objects
SPEC = {
    "name": str, "drug_class": str, "subclass": str, "status_note": str, "evidence_note": str,
    "tagline": str, "summary": str, "origin": str, "half_life": str, "dosing_note": str,
    "overview": [str], "mechanism": [str], "routes": [str], "facts": [str],
    "discovery": {"by": str, "where": str, "note": str},
    "first_approval": {"indication": str},
    "brands": [{"route": str, "use": str}],
    "analogs": [{"note": str}],
    "targets": [{"name": str, "action": str}],
    "sequence": {"note": str, "modifications": [{"label": str, "short": str}]},
    "structure": {"notes": str, "pdb": [{"note": str}]},
    "uses": {
        "approved": [{"use": str, "detail": str, "where": str}],
        "investigational": [{"use": str, "stage": str, "detail": str}],
        "off_label": [{"use": str, "detail": str, "evidence": str}],
    },
    "history": [{"title": str, "detail": str}],
    "regulatory": [{"detail": str}],
    "pk": {"half_life": str, "tmax": str, "bioavailability": str, "metabolism": str, "excretion": str},
    "dosing": [{"regimen": str}],
    "safety": {"common": [str], "serious": [str], "warnings": [str], "notes": str},
    "market": {"note": str, "figures": [{"label": str, "value": str, "source": str}]},
}
# fields that may legitimately stay in Latin script (names, codes, short technical labels)
MAY_STAY = {"name", "short", "value", "source"}
CJK = re.compile(r"[㐀-鿿]")


def extract(spec, node):
    """Project `node` onto `spec`, keeping only translatable strings."""
    if spec is str:
        return node if isinstance(node, str) and node.strip() else None
    if isinstance(spec, list):
        if not isinstance(node, list):
            return None
        inner = spec[0]
        return [extract(inner, x) if inner is not str else (x if isinstance(x, str) else None) for x in node]
    if isinstance(spec, dict):
        if not isinstance(node, dict):
            return None
        out = {}
        for k, sub in spec.items():
            if k in node:
                v = extract(sub, node[k])
                if v not in (None, [], {}):
                    out[k] = v
        return out
    return None


def compare(skel, ov, path, errs, key=""):
    if isinstance(skel, str):
        if not isinstance(ov, str) or not ov.strip():
            errs.append(f"{path}: missing or empty")
        elif key not in MAY_STAY and len(skel.split()) >= 3 and not CJK.search(ov):
            errs.append(f"{path}: looks untranslated")
        return
    if isinstance(skel, list):
        if not isinstance(ov, list):
            errs.append(f"{path}: expected a list"); return
        if len(ov) != len(skel):
            errs.append(f"{path}: {len(ov)} items, English has {len(skel)}"); return
        for i, (a, b) in enumerate(zip(skel, ov)):
            if a is None:
                continue
            compare(a, b, f"{path}[{i}]", errs, key)
        return
    if isinstance(skel, dict):
        if not isinstance(ov, dict):
            errs.append(f"{path}: expected an object"); return
        for k, v in skel.items():
            if k not in ov:
                errs.append(f"{path}.{k}: missing")
            else:
                compare(v, ov[k], f"{path}.{k}", errs, k)


def main():
    os.makedirs(DST, exist_ok=True)
    check = "--check" in sys.argv
    bad = 0
    for f in sorted(glob.glob(os.path.join(SRC, "*.json"))):
        slug = os.path.basename(f)[:-5]
        skel = extract(SPEC, json.load(open(f, encoding="utf-8")))
        out = os.path.join(DST, slug + ".json")
        if check:
            if not os.path.exists(out):
                print(f"MISSING {slug}"); bad += 1; continue
            try:
                ov = json.load(open(out, encoding="utf-8"))
            except Exception as ex:
                print(f"ERR {slug}: JSON parse error: {ex}"); bad += 1; continue
            errs = []
            compare(skel, ov, slug, errs)
            print(f"{'OK ' if not errs else 'ERR'} {slug} ({len(errs)} problems)")
            for e in errs[:40]:
                print("   ", e)
            bad += bool(errs)
        elif not os.path.exists(out):
            json.dump(skel, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            print("wrote", out)
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
