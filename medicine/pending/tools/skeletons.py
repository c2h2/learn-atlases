import os, re, sys, json, collections
ROOT = sys.argv[1]
TOKRE = re.compile(r"[A-Za-z][A-Za-z'-]*|[0-9]+|[^\sA-Za-z0-9A-Za-z]")
def toks(line): return TOKRE.findall(line)
frames = collections.Counter()
examples = {}
for dp, dn, fns in os.walk(ROOT):
    for fn in fns:
        if not fn.endswith('.md'): continue
        for line in open(os.path.join(dp, fn), encoding='utf-8').read().split('\n'):
            if not line.strip(): continue
            tk = toks(line)
            fr = ' '.join(tk)
            frames[fr] += 1
            examples.setdefault(fr, line)
with open('/tmp/skel.txt','w',encoding='utf-8') as f:
    for fr,c in frames.most_common():
        f.write('%d\t%s\n' % (c, fr))
print('lines with markup:', len(frames))
