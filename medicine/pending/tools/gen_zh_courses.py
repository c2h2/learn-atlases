#!/usr/bin/env python3
"""Build the Chinese course overlays (content/zh/<course>/course.json).

An overlay holds only the translated fields (title, full_title, tagline, summary,
overview, outcomes, chapters, history, references); everything else - slugs, areas,
levels, ordering, prerequisites - is inherited from the English record, and the entry
counts are kept identical (tools/check.php compares them).

    python3 tools/zh/gen_zh_courses.py
"""
import os, re, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import gen_zh
from courses import COURSE, COURSE_HEAD

MED = os.path.abspath(os.path.join(HERE, '..', '..'))
EN, ZH = os.path.join(MED, 'content', 'en'), os.path.join(MED, 'content', 'zh')

FIELDS = ('title', 'full_title', 'tagline', 'summary', 'overview', 'outcomes',
          'chapters', 'history', 'references')


def tr(text):
    """translate one json string: author dictionary first, frame transfer second"""
    if not isinstance(text, str) or not text.strip():
        return text
    key = re.sub(r'\s+', ' ', text).strip().lower()
    if key in COURSE:
        return COURSE[key]
    out = gen_zh.transfer(text)
    return out


def tr_list(items):
    return [tr(i) for i in items]


def convert(record):
    ov = {}
    for f in FIELDS:
        if f not in record:
            continue
        if f == 'chapters':
            ov[f] = [{'title': tr(c.get('title', '')), 'summary': tr(c.get('summary', ''))}
                     for c in record[f]]
        elif f == 'history':
            # an overlay history entry never repeats the year
            ov[f] = [{'title': tr(h.get('title', '')), 'detail': tr(h.get('detail', '')),
                      'people': [gen_zh.lookup(p) for p in h.get('people', [])]} for h in record[f]]
        elif f == 'references':
            ov[f] = [{'title': tr(r.get('title', '')), 'note': tr(r.get('note', ''))}
                     for r in record[f]]
        else:
            ov[f] = tr_list(record[f]) if isinstance(record[f], list) else tr(record[f])
    return ov


def main():
    n = 0
    for course in sorted(os.listdir(EN)):
        src = os.path.join(EN, course, 'course.json')
        if not os.path.isfile(src):
            continue
        record = json.load(open(src, encoding='utf-8'))
        head = COURSE_HEAD.get(course, {})
        record = dict(record, **head) if head else record
        ov = convert(record)
        dst = os.path.join(ZH, course)
        os.makedirs(dst, exist_ok=True)
        with open(os.path.join(dst, 'course.json'), 'w', encoding='utf-8') as fh:
            json.dump(ov, fh, ensure_ascii=False, indent=1)
            fh.write('\n')
        n += 1
    print('overlays: %d' % n)
    miss = [w for w in gen_zh.MISS if re.search('[a-z]{4}', w)]
    if miss:
        print('untranslated words in course fields: %d' % len(miss))
        print(', '.join(sorted(miss)[:60]))


if __name__ == '__main__':
    main()
