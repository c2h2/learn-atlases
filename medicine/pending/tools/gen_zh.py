#!/usr/bin/env python3
"""Build the Chinese lessons (content/zh/**) of the Medicine Atlas.

The English corpus is produced by a small closed grammar: every prose line is one of
about 150 sentence frames whose slots hold domain terms.  This tool transfers those
frames into Chinese (RULES below, longest-literal-first over a spaced token stream) and
renders each slot through the glossary in terms.py.  Markup, block markers, anchor ids,
block options, KaTeX and figure specifications are carried over unchanged, so a Chinese
lesson has exactly the same numbered blocks and anchors as its English twin (which is
what tools/check.php compares).

    python3 tools/zh/gen_zh.py            # write content/zh/**, print a coverage report
    python3 tools/zh/gen_zh.py --report   # report only
"""
import os, re, sys, json, collections

HERE = os.path.dirname(os.path.abspath(__file__))
MED = os.path.abspath(os.path.join(HERE, '..', '..'))       # .../medicine
EN, ZH = os.path.join(MED, 'content', 'en'), os.path.join(MED, 'content', 'zh')

sys.path.insert(0, HERE)
try:
    from terms import TERM, PHRASE, HEAD
except ImportError:
    TERM = PHRASE = HEAD = {}

MISS = collections.Counter()
FRAME_MISS = collections.Counter()

# --------------------------------------------------------------------------- tokens
WORD = r"[A-Za-z][A-Za-z'-]*"
NUMB = r"[0-9]+(?:\.[0-9]+)?"
TOKRE = re.compile(WORD + r'|' + NUMB + r'|[^\sA-Za-z0-9]')

def tokens(line):
    return TOKRE.findall(line)

def spaced(line):
    return ' '.join(tokens(line))

# one slot = 1..4 word tokens (lazy: prefer the shortest fill)
def slot(n=3):
    return r'(?:(?:%s) ){0,%d}?%s' % (WORD, n, WORD)

# --------------------------------------------------------------------------- rules
# (english, chinese) - english is matched at the current token boundary; the first
# rule that matches wins, so keep the long, literal-heavy ones first.
RULES = [
    # --- the recurring frame: "the A, and the B that the C is for"
    (r'the (%s), and the (%s) that the (%s) is for,' % (slot(), slot(), slot()), r'\1，以及\2（\3所对应的），'),
    (r'the (%s), and the (%s) that the (%s) is for' % (slot(), slot(), slot()), r'\1，以及\2（\3所对应的）'),
    (r', and the (%s) that the (%s) is for,' % (slot(), slot()), r'，以及\1（\2所对应的），'),
    (r', and the (%s) that the (%s) is for' % (slot(), slot()), r'，以及\1（\2所对应的）'),
    (r'and the (%s) that the (%s) is for' % (slot(), slot()), r'以及\1（\2所对应的）'),
    (r'that the (%s) is for' % slot(), r'（\1所对应的）'),
    (r'is for, in the (%s)\.' % slot(), r'成立，在\1中亦然。'),
    (r'is for, in the (%s),' % slot(), r'成立，在\1中亦然，'),
    (r'is for, of the (%s) and the (%s)\.' % (slot(), slot()), r'成立，属于\1与\2。'),
    (r'is for, of the (%s)\.' % slot(), r'成立，属于\1。'),
    (r'is for, of the (%s) and the (%s)' % (slot(), slot()), r'成立，属于\1与\2'),
    (r'is for, in the (%s)' % slot(), r'成立，在\1中亦然'),
    (r'is for, of the (%s)' % slot(), r'成立，属于\1'),
    (r'is for,' % (), r'成立，'),
    (r'is for' % (), r'成立'),
    (r'is the (%s)' % slot(), r'就是\1'),
    (r'is a (%s)' % slot(), r'是一个\1'),
    (r'is (%s)' % slot(), r'是\1'),
    # --- "The description, and the A that the B is for, is the use, of the C and the D."
    (r'[Tt]he description, and the (%s) that the (%s) is for, is the use, of the (%s) and the (%s)\.'
     % (slot(), slot(), slot(), slot()), r'该描述，即\1（\2所对应的），是\3与\4的用途。'),
    (r'[Tt]he description, and the (%s) that the (%s) is for, is the use, of the (%s) and the (%s)'
     % (slot(), slot(), slot(), slot()), r'该描述，即\1（\2所对应的），是\3与\4的用途'),
    (r'[Tt]he description' % (), r'该描述'),
    # --- lesson/course frame sentences
    (r'[Tt]his lesson defines the (%s), and the (%s) that the (%s) is for, of the (%s) and the (%s) is for, and gives the (%s), and the (%s) that the (%s) is for\.'
     % (slot(), slot(), slot(), slot(), slot(), slot(), slot(), slot()),
     r'本课定义\1（\3所对应的\2），属于\4以及\5所对应的内容，并给出\6（\8所对应的\7）。'),
    (r'[Tt]his lesson defines the (%s), and the (%s) that the (%s) is for' % (slot(), slot(), slot()),
     r'本课定义\1（\3所对应的\2）'),
    (r'and gives the (%s), and the (%s) that the (%s) is for' % (slot(), slot(), slot()),
     r'并给出\1（\3所对应的\2）'),
    (r'and gives the (%s)' % slot(), r'并给出\1'),
    (r'what is the (%s), and the (%s) that the (%s) is for\?' % (slot(), slot(), slot()),
     r'\1（\3所对应的\2）是什么？'),
    (r'what (%s), and the (%s) that the (%s) is for\?' % (slot(), slot(), slot()),
     r'\1（\3所对应的\2）如何？'),
    (r'for the (%s), and the (%s) that the (%s) is for, the (%s), and the (%s) that the (%s) is for, is the (%s) that the (%s) is for, is for\.'
     % (slot(), slot(), slot(), slot(), slot(), slot(), slot(), slot()),
     r'对于\1（\3所对应的\2）而言，\4（\6所对应的\5）就是\8所对应的\7。'),
    (r'for the (%s), and the (%s) that the (%s) is for, the (%s), and the (%s) that the (%s) is for, is the (%s) that the (%s) is for, is for'
     % (slot(), slot(), slot(), slot(), slot(), slot(), slot(), slot()),
     r'对于\1（\3所对应的\2）而言，\4（\6所对应的\5）就是\8所对应的\7'),
    (r'for the (%s), and the (%s) that the (%s) is for' % (slot(), slot(), slot()),
     r'对于\1（\3所对应的\2）而言'),
    (r'so the (%s), and the (%s) that the (%s) is for' % (slot(), slot(), slot()),
     r'因此\1，以及\2（\3所对应的）'),
    (r'which (%s), and the (%s) that the (%s) is for' % (slot(), slot(), slot()),
     r'哪一个\1，以及\2（\3所对应的）'),
    # --- connectives and determiners
    (r'the (%s), and the (%s) is for' % (slot(), slot()), r'\1，以及\2所对应的'),
    (r'the (%s), and the (%s)' % (slot(), slot()), r'\1，以及\2'),
    (r'the (%s) of the (%s)' % (slot(), slot()), r'\1的\2'),
    (r'the (%s) of (%s)' % (slot(), slot()), r'\1的\2'),
    (r'the (%s), and (%s)' % (slot(), slot()), r'\1，以及\2'),
    (r'the (%s), the (%s)' % (slot(), slot()), r'\1，\2'),
    (r'the (%s) or the (%s)' % (slot(), slot()), r'\1或\2'),
    (r'the (%s) and the (%s)' % (slot(), slot()), r'\1与\2'),
    (r'the (%s) in the (%s)' % (slot(), slot()), r'\1中的\2'),
    (r'the (%s) to the (%s)' % (slot(), slot()), r'\1到\2'),
    (r'the (%s) for the (%s)' % (slot(), slot()), r'\1用于\2'),
    (r'the (%s) with the (%s)' % (slot(), slot()), r'\1带有\2'),
    (r'the (%s) that the (%s)' % (slot(), slot()), r'\1，\2'),
    (r'the (%s) is the (%s)' % (slot(), slot()), r'\1就是\2'),
    (r'the (%s)' % slot(), r'\1'),
    (r'a (%s)' % slot(), r'一个\1'),
    (r'an (%s)' % slot(), r'一个\1'),
    (r'of the (%s)' % slot(), r'\1的'),
    (r'of (%s)' % slot(), r'\1的'),
    (r'in the (%s)' % slot(), r'在\1中'),
    (r'in (%s)' % slot(), r'在\1'),
    (r'on the (%s)' % slot(), r'在\1上'),
    (r'to the (%s)' % slot(), r'到\1'),
    (r'to (%s)' % slot(), r'到\1'),
    (r'for the (%s)' % slot(), r'对于\1'),
    (r'for (%s)' % slot(), r'对于\1'),
    (r'with the (%s)' % slot(), r'带有\1'),
    (r'with (%s)' % slot(), r'带有\1'),
    (r'and the (%s)' % slot(), r'以及\1'),
    (r'and a (%s)' % slot(), r'以及一个\1'),
    (r'and (%s)' % slot(), r'与\1'),
    (r'or the (%s)' % slot(), r'或\1'),
    (r'or (%s)' % slot(), r'或\1'),
    (r'that the (%s)' % slot(), r'\1'),
    (r'that (%s)' % slot(), r'\1'),
    (r'from the (%s)' % slot(), r'由\1'),
    (r'by the (%s)' % slot(), r'由\1'),
    (r'as the (%s)' % slot(), r'作为\1'),
    (r'at the (%s)' % slot(), r'在\1'),
    (r'which' % (), r'哪个'),
    (r'this' % (), r'该'),
    (r'that' % (), r'那个'),
    (r'these' % (), r'这些'),
    (r'those' % (), r'那些'),
    (r'it' % (), r'它'),
    (r'its' % (), r'它的'),
    (r'is' % (), r'是'),
    (r'are' % (), r'是'),
    (r'be' % (), r'是'),
    (r'as' % (), r'作为'),
    (r'at' % (), r'在'),
    (r'on' % (), r'在'),
    (r'in' % (), r'在'),
    (r'of' % (), r'的'),
    (r'to' % (), r'到'),
    (r'for' % (), r'对于'),
    (r'with' % (), r'带有'),
    (r'by' % (), r'由'),
    (r'from' % (), r'由'),
    (r'not' % (), r'不'),
    (r'no' % (), r'无'),
    (r'so' % (), r'因此'),
    (r'than' % (), r'比'),
    (r'then' % (), r'那么'),
    (r'all' % (), r'所有'),
    (r'any' % (), r'任何'),
    (r'only' % (), r'仅'),
    (r'what' % (), r'什么'),
    (r'when' % (), r'何时'),
    (r'where' % (), r'何处'),
    (r'how' % (), r'如何'),
    (r'why' % (), r'为何'),
    (r'do' % (), r'做'),
    (r'does' % (), r'做'),
    (r'can' % (), r'可以'),
    (r'will' % (), r'会'),
    (r'should' % (), r'应当'),
    (r'have' % (), r'有'),
    (r'has' % (), r'有'),
    (r'and' % (), r'与'),
    (r'or' % (), r'或'),
    (r',' % (), r'，'),
    (r'\.' % (), r'。'),
    (r'\?' % (), r'？'),
    (r'!' % (), r'！'),
    (r';' % (), r'；'),
    (r':' % (), r'：'),
]
RULES = [(re.compile(en), zh) for en, zh in RULES]

# --------------------------------------------------------------------------- transfer
MATH_SPAN = re.compile(r'\$\$.*?\$\$|\$[^$]*\$|`[^`]*`|\\\([^)]*\)|\\\[[^\]]*\\\]')
MASK = '\x00%d\x01'

def transfer(text):
    """English prose -> Chinese, frame by frame."""
    s = spaced(text)
    maths = []
    def hide(m):
        maths.append(m.group())
        return MASK % len(maths)
    s = MATH_SPAN.sub(hide, s)
    pos, out = 0, []
    n = len(s)
    while pos < n:
        while pos < n and s[pos] == ' ':
            pos += 1
        if pos >= n:
            break
        rest = s[pos:]
        hit = None
        for rx, zh in RULES:
            m = rx.match(rest)
            if not m:
                continue
            end = m.end()
            if end < len(rest) and rest[end] != ' ':
                continue                      # matched into the middle of a token
            hit = (m, zh, end)
            break
        if hit:
            m, zh, end = hit
            # slot contents are english terms: render them through the glossary too
            out.append(transfer_slots(m.expand(zh)))
            pos += end
            continue
        # no rule: glossary lookup for the bare token
        tok = rest.split(' ', 1)[0]
        out.append(lookup(tok))
        pos += len(tok)
    res = tidy(cleanup(''.join(out)))
    return re.sub(r'\x00(\d+)\x01', lambda g: maths[int(g.group(1)) - 1], res)

def tidy(text):
    """repair the artefacts the frame transfer can leave behind"""
    text = re.sub(r'。，|。，', '，', text)
    text = re.sub(r'[。，]{2,}', lambda m: m.group()[0], text)
    text = re.sub(r'，。', '。', text)
    text = re.sub(r'(的){2,}', '的', text)
    text = re.sub(r'(成立){2,}', '成立', text)
    text = re.sub(r'(?<=[\u4e00-\u9fff，。；：？！）（]) +(?=[\u4e00-\u9fff，。；：？！）（])', '', text)
    text = re.sub(r' +([，。；：？！])', r'\1', text)
    text = re.sub(r'([（]) +| +([）])', r'\1\2', text)
    return text


def cleanup(s):
    """drop the inter-token spaces, but keep them between two ascii words."""
    out = []
    for i, ch in enumerate(s):
        if ch != ' ':
            out.append(ch)
            continue
        a = s[i - 1] if i else ''
        b = s[i + 1] if i + 1 < len(s) else ''
        keep = (a.isascii() and b.isascii() and '\x00' not in (a, b)
                and (a.isalnum() or a in ')]}') and (b.isalnum() or b in '([{'))
        if keep:
            out.append(' ')
    return ''.join(out)

def transfer_slots(text):
    """the english words inside a rule's chinese output go through the glossary"""
    return re.sub(WORD, lambda mm: lookup(mm.group()), text)


def lookup(tok):
    if not re.fullmatch(WORD, tok):        # punctuation, bold markers, mask bytes
        return tok
    hit = gloss(tok)
    if hit is not None:
        return hit
    if '-' in tok:                          # amino-acid: translate the pieces once
        parts, seen = [], set()
        for piece in tok.split('-'):
            if not piece:
                continue
            tr = gloss(piece) or piece
            if tr not in seen:
                parts.append(tr); seen.add(tr)
        return ''.join(parts)
    MISS[tok] += 1
    return tok


def gloss(tok):
    for cand in forms(tok):
        if cand in PHRASE:
            return PHRASE[cand]
        if cand in TERM:
            return TERM[cand]
    return None


def forms(tok):
    """lookup order: exact, lower case, singular, and the bare stem"""
    lw = tok.lower()
    out = [lw]
    if lw.endswith('ies'):
        out.append(lw[:-3] + 'y')
    if lw.endswith('es'):
        out.append(lw[:-2])
    if lw.endswith('s'):
        out.append(lw[:-1])
    if lw.endswith('ing'):
        out.append(lw[:-3])
    if lw.endswith('ed'):
        out.append(lw[:-2])
    return out

# --------------------------------------------------------------------------- line kinds
def render_markup(line):
    """::: block markers: keyword kept, title translated, anchors/options kept."""
    m = re.match(r'^(\s*:::+\s*)([a-zA-Z-]+)?(.*?)(\{[^}]*\})?(\s*)$', line)
    if not m:
        return line
    pre, kw, mid, opts, tail = m.groups()
    if kw and kw not in BLOCK_KW:
        MISS['KW:' + kw] += 1
    title = mid.strip()
    if title and not title.startswith('{'):
        title = tidy(transfer(title))
        mid = ' ' + title + (' ' if opts else '')
    return pre + (kw or '') + mid + (opts or '') + tail

def render_heading(line):
    m = re.match(r'^(\s*#{1,6}\s+)(.*)$', line)
    if not m:
        return line
    txt = m.group(2).strip()
    key = txt.lower()
    if key in HEAD:
        zh = HEAD[key]
    else:
        zh = ' '.join(lookup(t) for t in tokens(txt))
    return m.group(1) + tidy(zh)

def render_item(line):
    m = re.match(r'^(\s*(?:[-*]|\d+\.)\s+)(\[x\]|\[ \])?\s*(.*)$', line)
    if not m:
        return transfer(line)
    pre, box, rest = m.groups()
    return pre + (box + ' ' if box else '') + transfer(rest)

BLOCK_KW = set(r'''definition proposition theorem lemma corollary example exercise quiz solution
hint note warning summary history widget plot algorithm claim proof remark case observation
question answer table figure exercise'''.split())

CAPTION_LINE = re.compile(r'^(\s*(?:caption|title)\s*:\s*)(.*)$', re.I)

MATH_LINE = re.compile(r'^\s*(\$\$|\\|[|+*/^_=<>{}\[\]()0-9.,:%-]*\s*$)')

def render_line(line, in_math):
    st = line.strip()
    if st.count('$$') % 2 == 1:                 # opens or closes a display formula
        return line, not in_math
    if in_math or not st:
        return line, in_math
    if st.startswith('|') or MATH_LINE.match(st):
        return line, False
    if st.startswith(':::'):
        return render_markup(line), False
    if st.startswith('#'):
        return render_heading(line), False
    if CAPTION_LINE.match(line):
        pre, val = CAPTION_LINE.match(line).groups()
        return pre + transfer(val), False
    if re.match(r'^\s*(?:[-*]|\d+\.)\s+', line):
        return render_item(line), False
    return transfer(line), False

    if st.startswith(':::'):
        return render_markup(line), False
    if st.startswith('#'):
        return render_heading(line), False
    if re.match(r'^\s*(?:[-*]|\d+\.)\s+', line):
        return render_item(line), False
    return transfer(line), False

# --------------------------------------------------------------------------- driver
def walk(root):
    for dp, dn, fns in os.walk(root):
        for fn in sorted(fns):
            if fn.endswith('.md'):
                yield os.path.join(dp, fn)

FILLER_MATH = re.compile(
    r'\n*\$\$\s*\n\s*Q\s*=\s*\\frac\{\s*\\Delta\s*P\s*\}\s*\{\s*R\s*\}\.?\s*\n\s*\$\$\s*\n*')
FLOW_CONTEXT = re.compile(
    r'\b(blood flow|flow rate|vascular resist\w*|perfusion|cardiac output|pressure gradient|'
    r'resistance|airway|glomerular|cerebral|hydrostatic|oncotic|blood pressure|ventilation)\b', re.I)


def strip_filler_math(text, source=''):
    """The English corpus pastes the display formula Q = dP/R into 215 lessons that have
    nothing to do with flow, pressure or resistance.  Keep it only in the handful of
    lessons that are actually about such a relation, and gloss the symbols there."""
    if not FILLER_MATH.search(text):
        return text
    if FLOW_CONTEXT.search(source or text):
        return FILLER_MATH.sub(
            lambda m: '\n' + m.group(0).strip() +
                      '\n\u5f0f\u4e2d **Q** \u4e3a\u6d41\u91cf\uff0c**\u0394P** \u4e3a\u538b\u529b\u5dee\uff0c**R** \u4e3a\u963b\u529b\u3002\n',
            text)
    return '\n\n'.join(FILLER_MATH.split(text))


def convert_text(text):
    out, in_math, in_widget = [], False, False
    for line in text.split('\n'):
        st = line.strip()
        if in_widget:
            # figure specifications are code: keys, numbers and expressions stay verbatim
            m = CAPTION_LINE.match(line)
            out.append(m.group(1) + transfer(m.group(2)) if m else line)
            if st == ':::':
                in_widget = False
            continue
        if re.match(r'^\s*:::+\s*widget\b', line):
            in_widget = True
            out.append(line)
            continue
        new, in_math = render_line(line, in_math)
        out.append(new)
    return '\n'.join(out)

def convert_file(src, dst):
    src_text = open(src, encoding='utf-8').read()
    data = strip_filler_math(convert_text(src_text), src_text)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, 'w', encoding='utf-8').write(data)

def main():
    report = '--report' in sys.argv
    n = 0
    for src in walk(EN):
        rel = os.path.relpath(src, EN)
        dst = os.path.join(ZH, rel)
        src_text = open(src, encoding='utf-8').read()
        data = strip_filler_math(convert_text(src_text), src_text)
        if not report:
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            open(dst, 'w', encoding='utf-8').write(data)
        n += 1
    print('lessons: %d' % n)
    if MISS:
        print('untranslated tokens: %d distinct' % len(MISS))
        for w, c in MISS.most_common(60):
            print('  %5d %s' % (c, w))

if __name__ == '__main__':
    main()
