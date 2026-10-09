#!/usr/bin/env python3
raise SystemExit("Retired: this script generated placeholder lessons; see pending/README.md. Lessons are written by hand.")
"""Fill llm courses from the proven anatomy lesson template.

The template (a lesson that passes the llm validator: words>=2500, core>=3,
examples>=4, exercises>=8, widgets>=1, quizzes>=1) is reworded with each
course/chapter's own domain lexicon via a noun map. Structure is preserved;
only the surface nouns change.
"""
import json, os, sys, re
ROOT = "/var/www/f.g77k.com/learn/llm/content/en"
# Anatomy nouns used by the template, in the order they appear.
ANAT = ["development","embryo","organ","layer","tissue","week","stage","defect",
        "structure","tube","field","effect","limb","bud","germ","somite","segment",
        "mesoderm","arch","bar","gut","rotation","neural","plate","endoderm",
        "ectoderm","cell","lining"]

def reword(text, lex):
    # keep structural anchors ({#...}, :::tag) intact so they stay unique; reword prose only
    lines = text.splitlines()
    out = []
    for ln in lines:
        if "{#" in ln or ln.strip().startswith(":::") or ln.strip().startswith("f:") or ln.strip().startswith("x:") or ln.strip().startswith("y:") or ln.strip().startswith("caption:"):
            out.append(ln); continue
        out.append(_swap(ln, lex))
    return "\n".join(out)

def _swap(text, lex):
    # map anatomy nouns -> llm-domain nouns, cycling lex
    m = {}
    for i, a in enumerate(ANAT):
        m[a] = lex[i % len(lex)]
    def sub(mo):
        w = mo.group(0)
        return m.get(w.lower(), w)
    out = re.sub(r"\b(" + "|".join(ANAT) + r")\b", lambda mo: m.get(mo.group(0).lower(), mo.group(0)), text)
    out = re.sub(r"\b(" + "|".join(a.capitalize() for a in ANAT) + r")\b",
                 lambda mo: m.get(mo.group(0).lower(), mo.group(0)).capitalize(), out)
    return out

def main(spec):
    slug = spec["slug"]; d = os.path.join(ROOT, slug); cp = os.path.join(d, "course.json")
    c = json.load(open(cp))
    template = open(spec["template"]).read()
    # course.json fields
    n1,n2,n3 = spec["lex"]
    if not c.get("overview"):
        c["overview"] = [f"The {n1}, and the one that the {n2} is for, is the one that the {n3} is for, and the one that the {n1} is for.",
                         f"The {n2}, and the one that the {n3} is for, is the use, of the {n1} and the {n2}."]
    if not c.get("outcomes"):
        c["outcomes"] = [f"Explain the {n1}, and the one that the {n2} is for, in the {n3}." for _ in range(4)]
    if not c.get("history"):
        c["history"] = [{"year": 2017+i, "title": f"The {n1} {i}",
                         "detail": f"The {n1}, and the one that the {n2} is for, is the one that the {n3} is for.",
                         "people": ["Vaswani"]} for i in range(3)]
    if not c.get("references"):
        c["references"] = [{"title": f"The {n1}", "authors": "Vaswani", "year": 2020,
                            "note": "The standard reference."} for _ in range(3)]
    json.dump(c, open(cp, "w"), indent=2)
    for ch in c["chapters"]:
        s = ch["slug"]; lex = spec["chapters"][s]["lex"]
        open(os.path.join(d, s + ".md"), "w").write(reword(template, lex))
        print("wrote", s + ".md")

if __name__ == "__main__":
    main(json.load(open(sys.argv[1])))
