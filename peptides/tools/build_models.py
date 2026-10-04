#!/usr/bin/env python3
"""Build 3D models for peptides that have no experimental PDB structure (dev tool).

  python3 tools/build_models.py [slug ...] [--force]

- Chains of 12+ residues that are mostly natural: predicted with the public ESMFold API.
  Non-natural residues are replaced by their natural parent (data/residues.json) and lipids
  are omitted; pLDDT confidence is kept in the B-factor column.
- Short or heavily modified peptides: an all-atom conformer embedded from the exact PubChem
  SMILES with RDKit (ETKDGv3 + MMFF94), so D-residues, caps and cyclisation are real.
Needs RDKit for conformers (pip install rdkit). Writes data/structures/ and data/cache/models/.
"""
import glob, json, os, sys, time, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STRUCT = os.path.join(ROOT, "data", "structures")
MODELS = os.path.join(ROOT, "data", "cache", "models")
RES = json.load(open(os.path.join(ROOT, "data", "residues.json")))
UA = {"User-Agent": "PeptideAtlas/1.0 (f.g77k.com/learn/peptides; model build)"}


def parent(tok):
    if len(tok) == 1:
        return tok.upper()
    return RES["tokens"].get(tok, {}).get("parent", "G")


def esmfold(seq):
    req = urllib.request.Request("https://api.esmatlas.com/foldSequence/v1/pdb/", data=seq.encode(), headers=UA, method="POST")
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.read().decode()


def plddt_mean(pdb):
    vals = [float(l[60:66]) for l in pdb.splitlines() if l.startswith("ATOM") and l[12:16].strip() == "CA"]
    if not vals:
        return None
    m = sum(vals) / len(vals)
    return m * 100 if m <= 1.0 else m


def rdkit_conformer(smiles, seed=0xA7):
    from rdkit import Chem
    from rdkit.Chem import AllChem
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None, "SMILES could not be parsed"
    metals = [a.GetIdx() for a in mol.GetAtoms() if a.GetSymbol() in ("Cu", "Zn", "Fe", "Co", "Ni", "Mn")]
    note = ""
    if metals:
        # Metal coordination is not handled by the force field: embed the organic ligand only.
        em = Chem.RWMol(mol)
        for idx in sorted(metals, reverse=True):
            em.RemoveAtom(idx)
        mol = em.GetMol()
        frags = Chem.GetMolFrags(mol, asMols=True)
        mol = max(frags, key=lambda m: m.GetNumHeavyAtoms())
        Chem.SanitizeMol(mol)
        note = "Metal ion omitted; only the peptide ligand is embedded. "
    mol = Chem.AddHs(mol)
    p = AllChem.ETKDGv3()
    p.randomSeed = seed
    p.useMacrocycleTorsions = True
    if AllChem.EmbedMolecule(mol, p) != 0:
        p.useRandomCoords = True
        if AllChem.EmbedMolecule(mol, p) != 0:
            return None, "embedding failed"
    try:
        AllChem.MMFFOptimizeMolecule(mol, maxIters=2000)
    except Exception:
        pass
    return Chem.MolToMolBlock(mol), note


def pubchem_smiles(slug):
    f = os.path.join(ROOT, "data", "cache", "pubchem", slug + ".json")
    if not os.path.exists(f):
        return None
    return (json.load(open(f)).get("props") or {}).get("SMILES")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    force = "--force" in sys.argv
    os.makedirs(STRUCT, exist_ok=True)
    os.makedirs(MODELS, exist_ok=True)
    for f in sorted(glob.glob(os.path.join(ROOT, "data", "peptides", "*.json"))):
        p = json.load(open(f))
        slug = p["slug"]
        if args and slug not in args:
            continue
        if p.get("structure", {}).get("pdb"):
            continue
        out = os.path.join(MODELS, slug + ".json")
        if os.path.exists(out) and not force:
            continue
        chains = p["sequence"]["chains"]
        toks = [t for c in chains for t in c["residues"]]
        n = len(toks)
        noncanon = sum(1 for t in toks if len(t) > 1 or t.islower())
        mods = p["sequence"].get("modifications", [])
        # side-chain rings dominate only short peptides; a longer chain (eloralintide's Cys2–Cys7 thioacetal) still folds well with ESMFold
        cyclic = p["sequence"].get("cyclic") or (n < 20 and any(b.get("type") in ("lactam", "thioether") for b in p["sequence"].get("bridges", [])))
        heavy = noncanon / max(1, n) > 0.25 or cyclic
        rec = None
        if n < 12 or heavy:
            smi = pubchem_smiles(slug)
            if smi:
                try:
                    block, note = rdkit_conformer(smi)
                except ImportError:
                    block, note = None, "RDKit not installed"
                if block:
                    fn = "conf-" + slug + ".sdf"
                    open(os.path.join(STRUCT, fn), "w").write(block + "$$$$\n")
                    rec = {"kind": "conformer", "method": "RDKit ETKDGv3 + MMFF94", "file": fn,
                           "meta": "Computed from the PubChem structure (CID %s)" % (p.get("ids", {}).get("pubchem_cid") or ""),
                           "note": note + "One low-energy conformer of the exact molecule, including D-residues, caps and rings. Short peptides are flexible, so treat it as one of many possible shapes."}
                else:
                    print(f"{slug}: conformer failed ({note})")
        if rec is None and n >= 8 and len(chains) == 1:
            seq = "".join(parent(t) for t in chains[0]["residues"])
            try:
                pdb = esmfold(seq)
            except Exception as ex:
                print(f"{slug}: ESMFold failed: {ex}")
                pdb = None
            if pdb and "ATOM" in pdb:
                fn = "model-" + slug + ".pdb"
                open(os.path.join(STRUCT, fn), "w").write(pdb)
                subs = [f"{t}{i+1}→{parent(t)}" for i, t in enumerate(chains[0]["residues"]) if len(t) > 1 or t.islower()]
                lip = [m for m in mods if m.get("type") in ("lipidation", "albumin-binder", "pegylation")]
                note = "ESMFold prediction of the natural-amino-acid version of the chain."
                if subs:
                    note += " Modelled with substitutions: " + ", ".join(subs) + "."
                if lip:
                    note += " Fatty-acid or albumin-binding groups are not modelled."
                pm = plddt_mean(pdb)
                rec = {"kind": "model", "method": "ESMFold", "file": fn, "chain": "A", "plddt_mean": round(pm, 1) if pm else None,
                       "meta": "Predicted by ESMFold (Meta AI)" + (f", mean pLDDT {pm:.0f}" if pm else ""),
                       "note": note + " Low confidence usually means the peptide is disordered on its own."}
            time.sleep(2)
        if rec:
            rec["built"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            json.dump(rec, open(out, "w"), indent=1, ensure_ascii=False)
            print(f"{slug}: {rec['kind']} -> {rec['file']}")
        else:
            print(f"{slug}: no model built (n={n})")


if __name__ == "__main__":
    main()
