#!/usr/bin/env python3
"""Fact-check helper for peptide data entry (dev tool, not served).

  lookup.py pdb 4ZGM 7KI0          -> title, method, resolution, polymer chains
  lookup.py pdbsearch "semaglutide" -> RCSB full-text search hits (with titles)
  lookup.py pubchem semaglutide     -> CID, formula, MW, SMILES length, 3D availability
  lookup.py cid 56843331            -> same, by CID
  lookup.py wiki Semaglutide        -> resolved English Wikipedia title + description
  lookup.py uniprot P01308          -> UniProt name + sequence
  lookup.py chembl semaglutide      -> ChEMBL ID by preferred name (+ max phase, first approval)
  lookup.py kegg semaglutide        -> KEGG DRUG entries
  lookup.py doi 10.1021/acs.jmedchem.5b00726  -> checks the DOI resolves (prints title via Crossref)
  lookup.py pmid 26308095           -> PubMed title/journal/year for a PMID
"""
import json, sys, urllib.request, urllib.parse

UA = {"User-Agent": "PeptideAtlas/1.0 (f.g77k.com/learn/peptides; data verification)"}

def get(url, data=None, headers=None):
    h = dict(UA)
    if headers: h.update(headers)
    req = urllib.request.Request(url, data=data, headers=h)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", "replace")

def pdb(ids):
    q = """query($ids:[String!]!){entries(entry_ids:$ids){rcsb_id struct{title}
      exptl{method} rcsb_entry_info{resolution_combined deposited_atom_count}
      rcsb_accession_info{initial_release_date}
      polymer_entities{rcsb_polymer_entity{pdbx_description}
        entity_poly{pdbx_seq_one_letter_code_can rcsb_sample_sequence_length}
        rcsb_polymer_entity_container_identifiers{auth_asym_ids}}
      nonpolymer_entities{nonpolymer_comp{chem_comp{id name}}}}}"""
    body = json.dumps({"query": q, "variables": {"ids": [i.upper() for i in ids]}}).encode()
    d = json.loads(get("https://data.rcsb.org/graphql", body, {"Content-Type": "application/json"}))
    for e in (d.get("data") or {}).get("entries") or []:
        info = e.get("rcsb_entry_info") or {}
        res = info.get("resolution_combined")
        print(f"\n{e['rcsb_id']}  {e['struct']['title']}")
        print(f"  method={e['exptl'][0]['method']}  resolution={res[0] if res else '-'}  released={(e.get('rcsb_accession_info') or {}).get('initial_release_date','')[:10]}  atoms={info.get('deposited_atom_count')}")
        for p in e.get("polymer_entities") or []:
            seq = (p.get("entity_poly") or {}).get("pdbx_seq_one_letter_code_can") or ""
            chains = (p.get("rcsb_polymer_entity_container_identifiers") or {}).get("auth_asym_ids")
            print(f"  chains={chains} len={len(seq)} desc={p['rcsb_polymer_entity']['pdbx_description']}")
            if len(seq) <= 60: print(f"     seq={seq}")
        for n in e.get("nonpolymer_entities") or []:
            c = n["nonpolymer_comp"]["chem_comp"]; print(f"  ligand {c['id']}: {c['name']}")

def pdbsearch(term):
    body = json.dumps({"query": {"type": "terminal", "service": "full_text", "parameters": {"value": term}},
        "return_type": "entry", "request_options": {"paginate": {"start": 0, "rows": 40}}}).encode()
    try:
        d = json.loads(get("https://search.rcsb.org/rcsbsearch/v2/query", body, {"Content-Type": "application/json"}))
    except Exception as ex:
        print("no hits / error:", ex); return
    ids = [r["identifier"] for r in d.get("result_set", [])]
    print("total", d.get("total_count"), ids)
    if ids: pdb(ids[:40])

def pubchem_props(cid):
    props = "MolecularFormula,MolecularWeight,ExactMass,HeavyAtomCount,IsomericSMILES,Title"
    d = json.loads(get(f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/property/{props}/JSON"))
    p = d["PropertyTable"]["Properties"][0]
    smi = p.get("IsomericSMILES") or p.get("SMILES") or ""
    print(f"CID {cid}  title={p.get('Title')}  formula={p.get('MolecularFormula')}  MW={p.get('MolecularWeight')}  heavy_atoms={p.get('HeavyAtomCount')}  smiles_len={len(smi)}")
    try:
        get(f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/SDF?record_type=3d"); print("  3D conformer: yes")
    except Exception:
        print("  3D conformer: no")
    try:
        syn = json.loads(get(f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/synonyms/JSON"))
        s = syn["InformationList"]["Information"][0]["Synonym"]
        print("  synonyms:", "; ".join(s[:25]))
    except Exception:
        pass

def pubchem(name):
    d = json.loads(get("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + urllib.parse.quote(name) + "/cids/JSON"))
    cids = d["IdentifierList"]["CID"]
    print("CIDs:", cids[:8])
    pubchem_props(cids[0])

def wiki(title):
    d = json.loads(get("https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(title.replace(' ', '_'))))
    print(f"title={d.get('title')}  type={d.get('type')}  desc={d.get('description')}")
    print("  " + (d.get("extract") or "")[:400])

def uniprot(acc):
    d = json.loads(get(f"https://rest.uniprot.org/uniprotkb/{acc}.json"))
    name = d.get("proteinDescription", {}).get("recommendedName", {}).get("fullName", {}).get("value")
    print(acc, name, d.get("organism", {}).get("scientificName"))
    print(d.get("sequence", {}).get("value"))
    for f in d.get("features", []):
        if f.get("type") in ("Peptide", "Chain", "Propeptide", "Signal"):
            loc = f["location"]; print(f"  {f['type']}: {loc['start']['value']}-{loc['end']['value']} {f.get('description','')}")

def chembl(name):
    d = json.loads(get("https://www.ebi.ac.uk/chembl/api/data/molecule?format=json&pref_name__iexact=" + urllib.parse.quote(name)))
    if not d["molecules"]: print("no exact pref_name match"); return
    for m in d["molecules"]:
        print(m["molecule_chembl_id"], m.get("pref_name"), "max_phase=", m.get("max_phase"), "first_approval=", m.get("first_approval"))

def kegg(name):
    print(get("https://rest.kegg.jp/find/drug/" + urllib.parse.quote(name)).strip() or "no KEGG hit")

def doi(d):
    x = json.loads(get("https://api.crossref.org/works/" + urllib.parse.quote(d)))["message"]
    print("OK", d, "|", (x.get("title") or [""])[0], "|", (x.get("container-title") or [""])[0], "|", (x.get("issued", {}).get("date-parts") or [[None]])[0][0])

def pmid(ids):
    x = json.loads(get("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=" + ",".join(ids)))
    for i in ids:
        r = x["result"].get(i)
        if not r or "error" in r: print(i, "NOT FOUND"); continue
        print(i, "|", r.get("title"), "|", r.get("source"), "|", r.get("pubdate"), "|", ", ".join(a["name"] for a in r.get("authors", [])[:3]))

if __name__ == "__main__":
    if len(sys.argv) < 3: print(__doc__); sys.exit(1)
    cmd, args = sys.argv[1], sys.argv[2:]
    try:
        {"pdb": lambda: pdb(args), "pdbsearch": lambda: pdbsearch(" ".join(args)),
         "pubchem": lambda: pubchem(" ".join(args)), "cid": lambda: pubchem_props(args[0]),
         "wiki": lambda: wiki(" ".join(args)), "uniprot": lambda: uniprot(args[0]),
         "chembl": lambda: chembl(" ".join(args)), "kegg": lambda: kegg(" ".join(args)),
         "doi": lambda: doi(args[0]), "pmid": lambda: pmid(args)}[cmd]()
    except Exception as ex:
        print("ERROR:", ex); sys.exit(2)
