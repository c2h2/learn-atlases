#!/usr/bin/env python3
"""Report suspect lines in the generated Chinese lessons.

Strips the parts that are legitimately latin (display/inline formulas, figure
specifications inside :::widget blocks, block markers and their anchors/options) and
then reports, per file: the latin/CJK ratio plus the individual suspect lines.

    python3 tools/zh/audit.py [--top N] [--show N]
"""
import os, re, sys, collections

MED = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
ZH = os.path.join(MED, 'content', 'zh')
EN = os.path.join(MED, 'content', 'en')

# block keywords / figure keys / markup words that stay english in a chinese lesson
OK = set('''definition proposition theorem lemma corollary example exercise quiz solution hint note
warning summary history widget plot algorithm claim proof remark case observation question answer
table figure code sliders caption title domain range color label style type width height step
start stop tick ticks legend series data x y f g tx ty rx ry line scatter bar curve
the a an is are of and or to in for on with by that this it as at from not so all any both
true false none null ph pH dna rna atp adp nADP NADH FAD P50 BMI kg mL mm
ol mol sec min hr ms nm um ml L dL cm mm m g mg mcg kDa kJ kcal
sodium potassium calcium"
'''.split())

MATH = re.compile(r'\$\$.*?\$\$|\$[^$]*\$|`[^`]*`', re.S)
ANCHOR = re.compile(r'\{[^}]*\}')
KEYVAL = re.compile(r"^[A-Za-z][A-Za-z0-9_ -]*\s*:.*$")

def strip_math_spans(s):
    """drop formula spans (they are latin by design) so only prose remains"""
    return MATH.sub(' ', s)

def audit_file(path):
    text = open(path, encoding='utf-8').read()
    lines = text.split('\n')
    suspects, in_widget, in_math = [], False, False
    for n, line in enumerate(lines, 1):
        st = line.strip()
        if st.count('$$') % 2 == 1:
            in_math = not in_math
            continue
        if in_math:
            continue
        if in_widget:
            if st == ':::':
                in_widget = False
            m = re.match(r'^\s*(caption|title)\s*:\s*(.*)$', st, re.I)
            if m:
                suspects.extend(suspect_words(n, 'caption', m.group(2)))
            continue
        if re.match(r'^\s*:::+\s*widget\b', st):
            in_widget = True
            continue
        if not st:
            continue
        body = st
        is_markup = body.startswith(':::') or body.startswith('#')
        if is_markup:
            body = ANCHOR.sub(' ', body)
            body = re.sub(r'^:::+\s*', '', body)
            body = re.sub(r'^#+\s*', '', body)
            words = [w for w in re.findall(r"[A-Za-z][A-Za-z''-]*", body) if w.lower() not in OK]
            if words:
                suspects.append((n, 'markup:' + ' '.join(words), st))
            continue
        if KEYVAL.match(body):
            continue
        prose = strip_math_spans(body)
        suspects.extend(suspect_words(n, 'prose', prose))
    return suspects

def suspect_words(n, kind, text):
    out = []
    for w in re.findall(r"[A-Za-z][A-Za-z''-]*", text):
        if w.lower() not in OK and not re.fullmatch(r'[A-Za-z]', w):
            out.append((n, kind + ':' + w, text.strip()[:110]))
    return out

def main():
    top = int(sys.argv[sys.argv.index('--top') + 1]) if '--top' in sys.argv else 25
    show = int(sys.argv[sys.argv.index('--show') + 1]) if '--show' in sys.argv else 0
    per_word = collections.Counter()
    per_file = collections.Counter()
    samples = collections.defaultdict(list)
    files = 0
    for dp, dn, fns in os.walk(ZH):
        for fn in sorted(fns):
            if not fn.endswith('.md'):
                continue
            files += 1
            rel = os.path.relpath(os.path.join(dp, fn), ZH)
            for n, kind, text in audit_file(os.path.join(dp, fn)):
                w = kind.split(':')[1]
                per_word[w] += 1
                per_file[rel] += 1
                if len(samples[w]) < show:
                    samples[w].append('%s:%d %s' % (rel, n, text))
    print('files: %d   suspect words: %d distinct: %d' %
          (files, sum(per_word.values()), len(per_word)))
    print('\nmost frequent:')
    for w, c in per_word.most_common(top):
        print('  %5d %s' % (c, w))
    print('\nworst files:')
    for f, c in per_file.most_common(15):
        print('  %5d %s' % (c, f))
    for w in (sys.argv[sys.argv.index('--show') + 1:] if '--show' in sys.argv else []):
        pass
    if show and '--examples' in sys.argv:
        for w, c in per_word.most_common(top):
            print('\n# %s (%d)' % (w, c))
            for s in samples[w]:
                print('   ', s)

if __name__ == '__main__':
    main()
