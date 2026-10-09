#!/usr/bin/env python3
"""Create or refresh an atlas from the Maths Atlas engine.

    python3 tools/mkatlas.py tools/atlas-specs/<slug>.json [...]

Engine files are copied from maths/ and rebranded from the spec (names, areas, pathways, Lab groups,
figure catalogue, Chinese interface strings). Authored files are never overwritten: course.json files,
README.md and tools/*.md are only created when missing (course.json as a stub without chapters).

Re-running it pulls later Maths Atlas engine fixes into the atlas without touching its content, so
engine changes for these atlases belong here (or in maths/), not in the generated copies, which a
re-run replaces. MA_SKELETON keeps its current value; a new atlas starts as a skeleton.
Used for: llm, chemistry, cs, biology, mechanical, economics, earth, english, chinese.

Optional spec keys: "sources" (the about page's sources paragraph), "levels" (names for levels 1–4
instead of Year 1–4), "labels" (what theorem and proof blocks are called, with the pages that
name them) and "default_lang" ("zh": Chinese unless the browser asks for English first); each
English string comes with a "_zh" twin or an [English, Chinese] pair.
"""
import json
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'maths')
PALETTE = ['foundations', 'analysis', 'algebra', 'geometry', 'discrete', 'probability', 'applied']
HEX = {'foundations': '#6b7180', 'analysis': '#2a78d6', 'algebra': '#4a3aa7', 'geometry': '#1a9e6f',
       'discrete': '#d6457c', 'probability': '#e0612d', 'applied': '#d99400'}
SKIP_DIRS = {'content', os.path.join('data', 'cache')}
SKIP_FILES = {'README.md', 'data/milestones.json', 'tools/CONTENT_GUIDE.md', 'tools/WIDGET_GUIDE.md',
              'tools/TRANSLATION_GUIDE_ZH.md', 'assets/css/maths.css'}

# Strings shared by every skeleton atlas (English => Chinese).
COMMON_ZH = {
    'skeleton': '框架',
    'Interactive figures let you change a parameter, run a simulation or move a point and watch the result change. All of them are collected in the Lab.':
        '在交互图形中，你可以调整参数、运行模拟或拖动点，观察结果如何随之变化。所有交互图形都收录在实验室中。',
    'The lessons are original texts that follow the standard undergraduate syllabus and notation, and each course page recommends textbooks for further reading. This atlas is still a skeleton: the courses and chapters are mapped out, and the lessons are still to be written.':
        '课文均为原创，遵循标准的本科教学大纲和记号，每门课程页面都推荐了延伸阅读的教材。本图谱目前还只是框架：课程与章节已经规划好，课文尚待编写。',
    'The interface is available in English and Simplified Chinese.': '界面提供英文和简体中文两种版本。',
    'to be written': '待编写',
    'This chapter is still to be written: the atlas is a skeleton so far. The summary above and the chapters it builds on show where it fits in the course.':
        '本章尚待编写：本图谱目前还只是框架。上方的概要以及本章所依赖的章节显示了它在课程中的位置。',
}
MISSING_EN = 'This chapter is still to be written: the atlas is a skeleton so far. The summary above and the chapters it builds on show where it fits in the course.'
FIGURES_EN = 'Interactive figures let you change a parameter, run a simulation or move a point and watch the result change. All of them are collected in the Lab.'
SOURCES_EN = 'The lessons are original texts that follow the standard undergraduate syllabus and notation, and each course page recommends textbooks for further reading. This atlas is still a skeleton: the courses and chapters are mapped out, and the lessons are still to be written.'


def die(msg):
    sys.exit('mkatlas: ' + msg)


def php_str(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def sub(text, old, new, where, count=1):
    n = text.count(old)
    if n != count:
        die(f'{where}: expected {count} x {old[:70]!r}, found {n}')
    return text.replace(old, new)


def resub(text, pattern, new, where):
    out, n = re.subn(pattern, lambda m: new, text, flags=re.S)
    if n != 1:
        die(f'{where}: {pattern[:50]!r} matched {n} times')
    return out


def edit(dst, rel, fn):
    p = os.path.join(dst, rel)
    with open(p, encoding='utf-8') as f:
        text = f.read()
    new = fn(text)
    if new != text:
        with open(p, 'w', encoding='utf-8') as f:
            f.write(new)


def write_new(path, text):
    """Create a file only if it does not exist yet."""
    if os.path.exists(path):
        return False
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)
    return True


def copy_engine(dst):
    for dirpath, dirnames, filenames in os.walk(SRC):
        rel = os.path.relpath(dirpath, SRC)
        rel = '' if rel == '.' else rel
        dirnames[:] = sorted(d for d in dirnames if os.path.join(rel, d) not in SKIP_DIRS)
        os.makedirs(os.path.join(dst, rel), exist_ok=True)
        for f in sorted(filenames):
            r = os.path.join(rel, f)
            if r not in SKIP_FILES:
                shutil.copy2(os.path.join(SRC, r), os.path.join(dst, r))


def validate(spec):
    keys = [a['key'] for a in spec['areas']]
    if len(keys) != 7 or len(set(keys)) != 7:
        die(f"{spec['slug']}: need 7 distinct areas")
    for a in spec['areas']:
        if a['palette'] not in PALETTE:
            die(f"{spec['slug']}: area {a['key']} has unknown palette {a['palette']}")
        if a['key'] in PALETTE and a['key'] != a['palette']:
            die(f"{spec['slug']}: area key {a['key']} would shadow a palette colour")
    if len({a['palette'] for a in spec['areas']}) != 7:
        die(f"{spec['slug']}: every area needs its own palette colour")
    slugs = [c['slug'] for c in spec['courses']]
    if len(set(slugs)) != len(slugs):
        die(f"{spec['slug']}: duplicate course slugs")
    for c in spec['courses']:
        if c['area'] not in keys:
            die(f"{spec['slug']}/{c['slug']}: unknown area {c['area']}")
        if c['level'] not in (1, 2, 3, 4):
            die(f"{spec['slug']}/{c['slug']}: bad level")
        for p in c['prerequisites'] + c['next']:
            if p not in slugs:
                die(f"{spec['slug']}/{c['slug']}: unknown course {p}")
    for k, (label, lst) in spec['paths'].items():
        for p in lst:
            if p not in slugs:
                die(f"{spec['slug']}: pathway {k} names unknown course {p}")
    if 'levels' in spec:
        lv = spec['levels']
        if len(lv['labels']) != 4 or len(lv['labels_zh']) != 4 or not all(lv.get(k) for k in ('filter', 'filter_zh', 'any', 'any_zh')):
            die(f"{spec['slug']}: levels needs 4 labels, 4 labels_zh, filter(_zh) and any(_zh)")
    if spec.get('default_lang', 'en') not in ('en', 'zh'):
        die(f"{spec['slug']}: default_lang must be en or zh")
    if 'labels' in spec:
        need = {'theorem', 'theorems', 'proof', 'end_proof', 'page', 'page_desc', 'page_lede', 'about_definition',
                'about_theorem', 'about_example', 'about_intuition', 'report'}
        if set(spec['labels']) != need or any(len(v) != 2 for v in spec['labels'].values()):
            die(f"{spec['slug']}: labels needs [English, Chinese] pairs for exactly {sorted(need)}")
    # prerequisite graph must be acyclic (the map lays courses out by prerequisite depth)
    pre = {c['slug']: c['prerequisites'] for c in spec['courses']}
    state = {}

    def visit(s, stack):
        if state.get(s) == 1:
            die(f"{spec['slug']}: prerequisite cycle {' -> '.join(stack + [s])}")
        if state.get(s) == 2:
            return
        state[s] = 1
        for p in pre[s]:
            visit(p, stack + [s])
        state[s] = 2
    for s in pre:
        visit(s, [])


def build(spec_path):
    with open(spec_path, encoding='utf-8') as f:
        spec = json.load(f)
    validate(spec)
    slug, name = spec['slug'], spec['name']
    dst = os.path.join(ROOT, slug)
    skeleton = 'true'
    boot = os.path.join(dst, 'inc/bootstrap.php')
    if os.path.exists(boot):
        with open(boot, encoding='utf-8') as f:
            m = re.search(r"define\('MA_SKELETON', (true|false)\);", f.read())
        skeleton = m.group(1) if m else skeleton
    copy_engine(dst)
    where = lambda r: f'{slug}/{r}'

    # ---- PHP engine
    edit(dst, 'inc/bootstrap.php', lambda t: sub(t,
        "define('MA_ISSUES_URL', 'https://github.com/c2h2/learn-atlases/issues');\n",
        "define('MA_ISSUES_URL', 'https://github.com/c2h2/learn-atlases/issues');\n"
        "/** Curriculum skeleton: the courses and chapters are mapped out and the lessons are still to be written.\n"
        " *  While true, the atlas says \"skeleton\" in its title. */\n"
        f"define('MA_SKELETON', {skeleton});\n", where('inc/bootstrap.php')))

    w = max(len(php_str(a['key'])) for a in spec['areas'])
    areas_php = 'const AREAS = [\n' + ''.join(
        f"    {php_str(a['key']).ljust(w)} => ['label' => {php_str(a['label'])}, 'blurb' => {php_str(a['blurb'])}],\n"
        for a in spec['areas']) + '];'
    edit(dst, 'inc/content.php', lambda t: resub(t, r'const AREAS = \[\n.*?\n\];', areas_php, where('inc/content.php')))
    edit(dst, 'inc/i18n.php', lambda t: sub(t, "'maths_lang'", f"'{slug}_lang'", where('inc/i18n.php'), 2))
    if spec.get('default_lang') == 'zh':
        edit(dst, 'inc/i18n.php', lambda t: sub(sub(t,
             " * then the browser's Accept-Language. English is the default.",
             " * then the browser's Accept-Language. Chinese is the default: this atlas is written for Chinese readers.", where('inc/i18n.php')),
             "return $l = str_starts_with($al, 'zh') ? 'zh' : 'en';",
             "return $l = str_starts_with($al, 'en') ? 'en' : 'zh';", where('inc/i18n.php')))

    def render(t):
        t = resub(t, r"function brand_mark\(\): string\n\{\n.*?\n\}",
                  "function brand_mark(): string\n{\n    return '<svg class=\"brand-mark\" viewBox=\"0 0 38 16\" aria-hidden=\"true\">'\n        . "
                  + php_str(spec['brand']) + "\n        . '</svg>';\n}", where('inc/render.php'))
        t = sub(t, "return t('Maths Atlas');",
                f"return t({php_str(name)}) . (MA_SKELETON ? paren(t('skeleton')) : '');", where('inc/render.php'))
        t = sub(t, "t('A detailed, interactive course through university mathematics: from logic and calculus to analysis, algebra, probability, differential equations and topology.')",
                f"t({php_str(spec['desc'])})", where('inc/render.php'))
        fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 16">'
               + re.sub(r'var\(--a-([a-z-]+)\)', lambda m: HEX[area_palette[m.group(1)]], spec['brand'])
               .replace('var(--rule-2)', '#c3c9cf') + '</svg>')
        t = resub(t, r"rawurlencode\('<svg xmlns=\"http://www\.w3\.org/2000/svg\" viewBox=\"0 0 38 16\">.*?</svg>'\)",
                  'rawurlencode(' + php_str(fav) + ')', where('inc/render.php'))
        t = sub(t, "'assets/css/maths.css'", f"'assets/css/{slug}.css'", where('inc/render.php'))
        t = sub(t, "t('a free, detailed and interactive tour of the undergraduate mathematics curriculum, written to be read alongside lectures and textbooks.')",
                f"t({php_str(spec['foot'])})", where('inc/render.php'))
        return t
    area_palette = {a['key']: a['palette'] for a in spec['areas']}
    edit(dst, 'inc/render.php', render)

    edit(dst, 'index.php', lambda t: sub(t,
        "t('A detailed, interactive course through university mathematics — from logic and calculus to analysis, algebra, probability, differential equations, topology and geometry. Every chapter has definitions, theorems with proofs, worked examples, interactive figures and exercises with full solutions.')",
        f"t({php_str(spec['lede'])})", where('index.php')))

    def about(t):
        t = sub(t, "t('Maths Atlas is a free, detailed tour of the mathematics taught in a university degree — written to be read alongside lectures and textbooks, or on its own.')",
                f"t({php_str(spec['about_lede'])})", where('about.php'))
        t = sub(t, "t('Interactive figures let you change a function, drag a point or run a simulation and watch the mathematics respond. All of them are collected in the Lab.')",
                f"t({php_str(FIGURES_EN)})", where('about.php'))
        t = sub(t, "t('The lessons are original texts that follow the standard undergraduate syllabus and notation. Each course page recommends textbooks for further reading. Worked examples and solutions were checked with computer algebra, and historical notes were checked against standard histories of mathematics.')",
                f"t({php_str(spec.get('sources', SOURCES_EN))})", where('about.php'))
        t = sub(t, "t('Every lesson, figure and exercise is available in English and Simplified Chinese.')",
                "t('The interface is available in English and Simplified Chinese.')", where('about.php'))
        return t
    edit(dst, 'about.php', about)

    def timeline(t):
        t = sub(t, "t('Four thousand years of mathematics: the discoveries behind every course in the atlas.')",
                f"t({php_str(spec['timeline_desc'])})", where('timeline.php'))
        t = sub(t, "t('Timeline of mathematics')", f"t({php_str(spec['timeline_title'])})", where('timeline.php'))
        t = sub(t, "t('The discoveries behind the courses, from Babylonian clay tablets to proofs completed in our century. Coloured dots show the area of mathematics; links lead to the course where the idea is taught.')",
                f"t({php_str(spec['timeline_lede'])})", where('timeline.php'))
        return t
    edit(dst, 'timeline.php', timeline)

    paths_php = '$PATHS = [\n' + ''.join(
        f"    {php_str(k)} => [{php_str(label)}, [{', '.join(php_str(s) for s in lst)}]],\n"
        for k, (label, lst) in spec['paths'].items()) + '];'
    edit(dst, 'map.php', lambda t: resub(t, r'\$PATHS = \[\n.*?\n\];', paths_php, where('map.php')))
    # course titles here run longer than in Maths ("Human–Computer Interaction"): wider boxes, narrower gaps
    edit(dst, 'map.php', lambda t: sub(sub(t, '$nodeW = 196;', '$nodeW = 212;', where('map.php')),
                                       '$colGap = 76;', '$colGap = 62;', where('map.php')))

    cat_path = os.path.join(SRC, 'data/widgets.json')
    with open(cat_path, encoding='utf-8') as f:
        cat = json.load(f)
    missing = [w for w in spec['widgets'] if w not in cat['types']]
    if missing:
        die(f'{slug}: unknown figure types {missing}')
    files = {cat['types'][w]['file'] for w in spec['widgets']}
    if files != set(spec['lab_groups']):
        die(f"{slug}: lab groups {sorted(spec['lab_groups'])} must match figure files {sorted(files)}")
    groups_php = '$GROUPS = [\n' + ''.join(
        f"    {php_str(k)} => {php_str(v)},\n" for k, v in spec['lab_groups'].items()) + '];'
    edit(dst, 'lab.php', lambda t: resub(t, r'\$GROUPS = \[\n.*?\n\];', groups_php, where('lab.php')))
    cat['types'] = {k: v for k, v in cat['types'].items() if k in spec['widgets']}
    with open(os.path.join(dst, 'data/widgets.json'), 'w', encoding='utf-8') as f:
        json.dump(cat, f, ensure_ascii=False, indent=2)
        f.write('\n')

    edit(dst, 'lesson.php', lambda t: sub(t, '"[maths] $cslug/$lslug: "', f'"[{slug}] $cslug/$lslug: "', where('lesson.php')))
    # unwritten chapters: say "to be written" (the skeleton has no outline to show below the header)
    edit(dst, 'lesson.php', lambda t: sub(t, "t('This chapter is being written. The outline below shows where it fits in the course.')",
                                           f"t({php_str(MISSING_EN)})", where('lesson.php')))
    edit(dst, 'course.php', lambda t: sub(t, "t('in preparation')", "t('to be written')", where('course.php')))

    # ---- optional: level names and block labels
    zh_extra = {}
    lv = spec.get('levels')
    if lv:
        levels_php = 'const LEVELS = [' + ', '.join(f'{i} => {php_str(l)}' for i, l in enumerate(lv['labels'], 1)) + '];'
        edit(dst, 'inc/content.php', lambda t: sub(t, "const LEVELS = [1 => 'Year 1', 2 => 'Year 2', 3 => 'Year 3', 4 => 'Year 4'];",
                                                    levels_php, where('inc/content.php')))
        edit(dst, 'index.php', lambda t: sub(sub(t, "t('Year of study')", f"t({php_str(lv['filter'])})", where('index.php')),
                                             "t('Any year')", f"t({php_str(lv['any'])})", where('index.php')))
        edit(dst, 'tools/i18n_keys.php', lambda t: sub(t, "foreach (['Year 1', 'Year 2', 'Year 3', 'Year 4'] as $l)",
                                                        'foreach ([' + ', '.join(php_str(l) for l in lv['labels']) + '] as $l)',
                                                        where('tools/i18n_keys.php')))
        edit(dst, 'tools/check.php', lambda t: sub(t, "'level must be 1–4 (year of study)'",
                                                    "'level must be 1–4 (see LEVELS in inc/content.php)'", where('tools/check.php')))
        zh_extra.update(zip(lv['labels'], lv['labels_zh']))
        zh_extra[lv['filter']] = lv['filter_zh']
        zh_extra[lv['any']] = lv['any_zh']

    lb = spec.get('labels')
    if lb:
        en = {k: v[0] for k, v in lb.items()}
        zh_extra.update(dict(lb.values()))

        def md(t):
            t = sub(t, "'theorem'     => ['Theorem', 'thm'],", f"'theorem'     => [{php_str(en['theorem'])}, 'thm'],", where('inc/markdown.php'))
            t = sub(t, "'proof'       => ['Proof', null],", f"'proof'       => [{php_str(en['proof'])}, null],", where('inc/markdown.php'))
            return sub(t, "t('End of proof')", f"t({php_str(en['end_proof'])})", where('inc/markdown.php'))
        edit(dst, 'inc/markdown.php', md)

        def thm(t):
            t = sub(t, "$KINDS = ['definition' => 'Definitions', 'theorem' => 'Theorems', 'lemma' => 'Lemmas', 'proposition' => 'Propositions', 'corollary' => 'Corollaries', 'axiom' => 'Axioms', 'algorithm' => 'Algorithms'];",
                    f"$KINDS = ['definition' => 'Definitions', 'theorem' => {php_str(en['theorems'])}];", where('theorems.php'))
            t = sub(t, "t('Theorems and definitions')", f"t({php_str(en['page'])})", where('theorems.php'), 2)
            t = sub(t, "t('Every definition, theorem, lemma and corollary in the atlas, with its statement and a link to the proof.')",
                    f"t({php_str(en['page_desc'])})", where('theorems.php'))
            t = sub(t, "t('Every numbered result in the atlas with its exact statement. Follow a link to read the proof, the examples around it and the exercises that use it.')",
                    f"t({php_str(en['page_lede'])})", where('theorems.php'))
            t = sub(t, "<dt><?= h(t('Theorems')) ?></dt>", f"<dt><?= h(t({php_str(en['theorems'])})) ?></dt>", where('theorems.php'))
            # lessons here use only definitions and rules: no lemma or corollary counts
            t = sub(t, "    <div><dt><?= h(t('Lemmas and propositions')) ?></dt><dd><?= (int)(($counts['lemma'] ?? 0) + ($counts['proposition'] ?? 0)) ?></dd></div>\n", '', where('theorems.php'))
            return sub(t, "    <div><dt><?= h(t('Corollaries')) ?></dt><dd><?= (int)($counts['corollary'] ?? 0) ?></dd></div>\n", '', where('theorems.php'))
        edit(dst, 'theorems.php', thm)
        # the checker flags "Theorem [[#id]]", where the reference already prints its label: teach it the new name
        if not (re.fullmatch(r'[A-Za-z]+', en['theorem']) and re.fullmatch(r'[一-鿿]+', lb['theorem'][1])):
            die(f"{slug}: labels.theorem must be one English word and one Chinese word")
        edit(dst, 'tools/check.php', lambda t: sub(sub(t, '\\\\b(Exercises?|Theorems?|', f"\\\\b(Exercises?|Theorems?|{en['theorem']}s?|", where('tools/check.php')),
                                                   '|(定理|定义|', f"|(定理|{lb['theorem'][1]}|定义|", where('tools/check.php')))
        edit(dst, 'inc/render.php', lambda t: sub(t, "['theorems.php', 'Theorems']", f"['theorems.php', {php_str(en['theorems'])}]", where('inc/render.php')))
        for page in ['index.php', 'course.php']:
            edit(dst, page, lambda t, page=page: sub(t, "t('Theorems and definitions')", f"t({php_str(en['page'])})", where(page)))

        def about_blocks(t):
            t = sub(t, "t('Theorems and definitions')", f"t({php_str(en['page'])})", where('about.php'))
            t = sub(t, "<span class=\"blk-kind\"><?= h(t('Theorem')) ?></span>", f"<span class=\"blk-kind\"><?= h(t({php_str(en['theorem'])})) ?></span>", where('about.php'))
            for old, key in [('Precise definitions of the objects we study, numbered so they can be referred to.', 'about_definition'),
                             ('Results with complete proofs (or clearly marked proof sketches where a full proof belongs to a later course).', 'about_theorem'),
                             ('Worked examples with every step shown.', 'about_example'),
                             ('The picture behind the formalism.', 'about_intuition'),
                             ('If you find an error, please report it on %s, noting the chapter and the number of the theorem, example or exercise.', 'report')]:
                t = sub(t, f"t({php_str(old)})", f"t({php_str(en[key])})", where('about.php'))
            return t
        edit(dst, 'about.php', about_blocks)

    # ---- scripts, styles, tools
    shared = f'{name} (engine shared with Maths Atlas) — '
    for js in ['assets/js/core.js', 'assets/js/plot.js', 'assets/js/lesson.js', 'assets/js/expr.js']:
        edit(dst, js, lambda t, js=js: sub(t, '/* Maths Atlas — ', '/* ' + shared, where(js)))
    edit(dst, 'assets/js/core.js', lambda t: sub(t, "'maths-progress'", f"'{slug}-progress'", where('assets/js/core.js')))
    for tool in ['tools/shot.js', 'tools/labcheck.js']:
        edit(dst, tool, lambda t, tool=tool: sub(t, "'http://f.g77k.com/learn/maths/'", f"'http://f.g77k.com/learn/{slug}/'", where(tool)))
    article = 'an' if name[0].lower() in 'aeiou' else 'a'
    edit(dst, 'tools/shot.js', lambda t: sub(sub(t, 'Screenshot a Maths Atlas page', f'Screenshot {article} {name} page', where('tools/shot.js')),
                                               'http://f.g77k.com/learn/maths/ (resolved', f'http://f.g77k.com/learn/{slug}/ (resolved', where('tools/shot.js')))

    with open(os.path.join(SRC, 'assets/css/maths.css'), encoding='utf-8') as f:
        css = f.read()
    css = resub(css, r'\A/\* Maths Atlas — .*?\*/',
                f'/* {name} — design tokens, layout and components (engine and palette shared with Maths Atlas).\n'
                '   The seven area colours keep their Maths Atlas names, which figures use directly; the areas of\n'
                '   this atlas are mapped onto them at the end of the file. */', where('css'))
    lines = []
    for a in spec['areas']:
        if a['key'] != a['palette']:
            lines.append(f"  --a-{a['key']}: var(--a-{a['palette']}); --on-{a['key']}: var(--on-{a['palette']});")
    css += f'\n/* ---------- areas of {name} → shared palette ---------- */\n:root {{\n' + '\n'.join(lines) + '\n}\n'
    with open(os.path.join(dst, f'assets/css/{slug}.css'), 'w', encoding='utf-8') as f:
        f.write(css)

    # ---- Chinese interface strings
    zh = dict(COMMON_ZH)
    for k in ['name', 'desc', 'lede', 'foot', 'about_lede', 'timeline_desc', 'timeline_title', 'timeline_lede']:
        zh[spec[k]] = spec[k + '_zh']
    for a in spec['areas']:
        zh[a['label']] = a['label_zh']
        zh[a['blurb']] = a['blurb_zh']
    for k, (label, lst) in spec['paths'].items():
        zh[label] = spec['paths_zh'][k]
    for k, v in spec['lab_groups'].items():
        zh[v] = spec['lab_groups_zh'][k]
    if 'sources' in spec:
        zh[spec['sources']] = spec['sources_zh']
    zh.update(zh_extra)
    block = f'\n    // {name}\n' + ''.join(f'    {php_str(k)} => {php_str(v)},\n' for k, v in zh.items())

    def zh_php(t):
        if f'    // {name}\n' in t:
            t = resub(t, r'\n    // ' + re.escape(name) + r'\n.*?(?=\] \+ \(is_file)', block, where('zh.php'))
        else:
            t = sub(t, '] + (is_file(', block + '] + (is_file(', where('zh.php'))
        return t
    edit(dst, 'inc/lang/zh.php', zh_php)

    # ---- data and content
    os.makedirs(os.path.join(dst, 'data/cache'), exist_ok=True)
    os.chmod(os.path.join(dst, 'data/cache'), 0o777)
    write_new(os.path.join(dst, 'data/milestones.json'), json.dumps(
        {'_doc': 'Field-wide milestones for the timeline (course-specific events live in each course.json). year < 0 means BC.',
         'milestones': []}, indent=2) + '\n')
    os.makedirs(os.path.join(dst, 'content/zh'), exist_ok=True)
    made = 0
    for c in spec['courses']:
        rec = {'slug': c['slug'], 'title': c['title'], 'full_title': c['full_title'], 'area': c['area'],
               'level': c['level'], 'order': c['order'], 'tagline': '', 'summary': '', 'overview': [],
               'prerequisites': c['prerequisites'], 'outcomes': [], 'chapters': [], 'history': [],
               'references': [], 'next': c['next']}
        made += write_new(os.path.join(dst, 'content/en', c['slug'], 'course.json'),
                          json.dumps(rec, ensure_ascii=False, indent=2) + '\n')
    # leftovers that still name Maths Atlas where they should not
    left = []
    for dirpath, dirnames, filenames in os.walk(dst):
        dirnames[:] = [d for d in dirnames if d not in ('content', 'cache', 'vendor', 'fonts')]
        for fn in filenames:
            if fn.endswith(('.php', '.js', '.css')):
                p = os.path.join(dirpath, fn)
                with open(p, encoding='utf-8') as f:
                    for i, line in enumerate(f, 1):
                        if re.search(r"maths_lang|maths-progress|maths\.css|learn/maths/|'Maths Atlas'\)|\[maths\]", line):
                            left.append(f'{os.path.relpath(p, ROOT)}:{i}: {line.strip()[:100]}')
    print(f'{slug}: engine refreshed, {made} new course stubs, {len(spec["courses"])} courses, '
          f'{len(spec["widgets"])} figure types')
    for l in left:
        print('  leftover:', l)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        die(__doc__)
    for s in sys.argv[1:]:
        build(s)
