<?php
declare(strict_types=1);

/**
 * Content model.
 *   content/en/<course>/course.json   course record (see tools/CONTENT_GUIDE.md)
 *   content/en/<course>/<chapter>.md  lesson markup
 *   content/zh/<course>/course.json   translated fields only (overlaid onto the English record)
 *   content/zh/<course>/<chapter>.md  full Chinese lesson; when missing the English lesson is shown
 */

const AREAS = [
    'micro'    => ['label' => 'Microeconomics', 'blurb' => 'Choices of households and firms, markets, prices and welfare.'],
    'macro'    => ['label' => 'Macroeconomics', 'blurb' => 'Output, growth, unemployment, inflation and policy for whole economies.'],
    'methods'  => ['label' => 'Quantitative methods', 'blurb' => 'Mathematics, statistics and econometrics for economists.'],
    'strategy' => ['label' => 'Games & markets', 'blurb' => 'Strategic behaviour, competition and the design of markets and institutions.'],
    'finance'  => ['label' => 'Finance', 'blurb' => 'Money, banks, the financial decisions of firms, asset prices and risk.'],
    'global'   => ['label' => 'Global economy & history', 'blurb' => 'Trade, international finance, development and economic history.'],
    'policy'   => ['label' => 'Policy & behaviour', 'blurb' => 'Public finance, labour, the environment and how people actually decide.'],
];

const LEVELS = [1 => 'Year 1', 2 => 'Year 2', 3 => 'Year 3', 4 => 'Year 4'];

/** All courses in the page language, keyed by slug, in atlas order. */
function ma_courses(): array
{
    static $memo = [];
    $lang = lang();
    if (isset($memo[$lang])) {
        return $memo[$lang];
    }
    $out = [];
    foreach (glob(MA_CONTENT . '/en/*/course.json') ?: [] as $f) {
        $c = read_json($f);
        if (!$c || empty($c['slug'])) {
            continue;
        }
        $c['title_en'] = $c['title'];
        $c['zh_course'] = false;
        if ($lang === 'zh') {
            $ov = read_json(MA_CONTENT . '/zh/' . $c['slug'] . '/course.json');
            if ($ov) {
                $c = overlay($c, $ov);
                $c['zh_course'] = true;
            }
        }
        foreach ($c['chapters'] as $i => &$ch) {
            $ch['n'] = $i + 1;
            $ch['course'] = $c['slug'];
            $ch['zh'] = is_file(MA_CONTENT . '/zh/' . $c['slug'] . '/' . $ch['slug'] . '.md');
        }
        unset($ch);
        $out[$c['slug']] = $c;
    }
    uasort($out, fn($a, $b) => [$a['order'] ?? 999, $a['slug']] <=> [$b['order'] ?? 999, $b['slug']]);
    return $memo[$lang] = $out;
}

function ma_course(string $slug): ?array
{
    return ma_courses()[$slug] ?? null;
}

function ma_chapter_meta(string $course, string $chapter): ?array
{
    foreach (ma_course($course)['chapters'] ?? [] as $ch) {
        if ($ch['slug'] === $chapter) {
            return $ch;
        }
    }
    return null;
}

/** [path, language] of the lesson source for the page language (Chinese falls back to English). */
function ma_chapter_source(string $course, string $chapter): array
{
    if (!preg_match('/^[a-z0-9-]+$/', $course . $chapter)) {
        return [null, null];
    }
    $lang = lang();
    $p = MA_CONTENT . "/$lang/$course/$chapter.md";
    if (is_file($p)) {
        return [$p, $lang];
    }
    $p = MA_CONTENT . "/en/$course/$chapter.md";
    return is_file($p) ? [$p, 'en'] : [null, null];
}

/** Newest change to anything that affects rendered output in this language. */
function ma_content_mtime(): int
{
    static $m = [];
    $lang = lang();
    if (!isset($m[$lang])) {
        $m[$lang] = max(
            newest_mtime([MA_CONTENT . '/en/*/*', MA_CONTENT . "/$lang/*/*"]),
            (int)filemtime(__DIR__ . '/markdown.php'),
            (int)filemtime(__FILE__),
            (int)@filemtime(__DIR__ . '/lang/zh.php'),
            (int)@filemtime(__DIR__ . '/lang/zh-figures.php')
        );
    }
    return $m[$lang];
}

// ------------------------------------------------------------------------------------------
// site index: every chapter's anchors, theorem-like items and counts (references resolve here)

function ma_index(): array
{
    static $memo = [];
    $lang = lang();
    if (isset($memo[$lang])) {
        return $memo[$lang];
    }
    $path = MA_CACHE . "/index-$lang.json";
    $idx = read_json($path);
    if ($idx && ($idx['version'] ?? 0) === MA_RENDER_VERSION && (int)@filemtime($path) >= ma_content_mtime()) {
        return $memo[$lang] = $idx;
    }
    $idx = ['version' => MA_RENDER_VERSION, 'built' => time(), 'chapters' => [], 'anchors' => []];
    foreach (ma_courses() as $c) {
        foreach ($c['chapters'] as $ch) {
            [$src, $srcLang] = ma_chapter_source($c['slug'], $ch['slug']);
            $key = $c['slug'] . '/' . $ch['slug'];
            if (!$src) {
                $idx['chapters'][$key] = ['missing' => true];
                continue;
            }
            $doc = new MdDoc($key, (string)$ch['n'], false);
            $text = (string)file_get_contents($src);
            $lines = explode("\n", str_replace(["\r\n", "\r", "\t"], ["\n", "\n", '    '], $text));
            $nodes = md_parse_blocks($lines, 1, $doc);
            md_number($nodes, $doc);
            $stats = ['theorems' => 0, 'definitions' => 0, 'examples' => 0, 'exercises' => 0, 'widgets' => 0, 'quizzes' => 0, 'proofs' => 0];
            md_tally($nodes, $stats);
            $words = md_count_words(preg_replace('/^(:::|\$\$|```|\|).*$/m', '', $text) ?? '');
            $idx['chapters'][$key] = $stats + [
                'words' => $words,
                'lang' => $srcLang,
                'toc' => array_values(array_filter($doc->toc, fn($t) => $t['level'] === 2)),
            ];
            foreach ($doc->anchors as $id => $a) {
                $idx['anchors'][$key . '#' . $id] = [$a['label'], $a['title'] ?? '', $a['kind']];
            }
        }
    }
    write_json($path, $idx);
    return $memo[$lang] = $idx;
}

function md_tally(array $nodes, array &$s): void
{
    foreach ($nodes as $n) {
        if ($n['t'] === 'blk') {
            $k = $n['kind'];
            if (in_array($k, ['theorem', 'lemma', 'proposition', 'corollary'], true)) {
                $s['theorems']++;
            } elseif ($k === 'definition') {
                $s['definitions']++;
            } elseif ($k === 'example') {
                $s['examples']++;
            } elseif ($k === 'exercise') {
                $s['exercises']++;
            } elseif ($k === 'quiz') {
                $s['quizzes']++;
            } elseif ($k === 'proof') {
                $s['proofs']++;
            }
            md_tally($n['children'], $s);
        } elseif ($n['t'] === 'widget') {
            $s['widgets']++;
        } elseif ($n['t'] === 'list') {
            foreach ($n['items'] as $it) {
                md_tally($it, $s);
            }
        } elseif ($n['t'] === 'quote') {
            md_tally($n['children'], $s);
        }
    }
}

/** Resolve a [[course/chapter#id]], [[course/chapter]] or [[course]] reference: [label, href, title]. */
function ma_ref_target(string $target): ?array
{
    if (preg_match('/^([a-z0-9-]+)\/([a-z0-9-]+)#([\w:-]+)$/', $target, $m)) {
        $a = ma_index()['anchors'][$m[1] . '/' . $m[2] . '#' . $m[3]] ?? null;
        if (!$a) {
            return null;
        }
        $ch = ma_chapter_meta($m[1], $m[2]);
        $title = $a[1] !== '' && $a[1] !== $a[0] ? $a[1] : '';
        if ($ch) {
            $title = trim($title . ($title !== '' ? ' — ' : '') . md_plain($ch['title']));
        }
        return [$a[0], url('lesson.php', ['c' => $m[1], 'l' => $m[2], '#' => $m[3]]), $title];
    }
    if (preg_match('/^([a-z0-9-]+)\/([a-z0-9-]+)$/', $target, $m)) {
        $ch = ma_chapter_meta($m[1], $m[2]);
        return $ch ? [md_plain($ch['title']), url('lesson.php', ['c' => $m[1], 'l' => $m[2]]), md_plain(ma_course($m[1])['title'] ?? '')] : null;
    }
    if (preg_match('/^([a-z0-9-]+)$/', $target, $m)) {
        $c = ma_course($m[1]);
        return $c ? [md_plain($c['title']), url('course.php', ['c' => $m[1]]), ''] : null;
    }
    return null;
}

// ------------------------------------------------------------------------------------------
// lessons

/**
 * Rendered lesson (cached in data/cache/lesson/<lang>/<course>/<chapter>.json):
 * html, toc, items (statements), exercises, examples, widgets, words, errors, src_lang, misses.
 */
function ma_lesson(string $course, string $chapter): ?array
{
    $ch = ma_chapter_meta($course, $chapter);
    if (!$ch) {
        return null;
    }
    [$src, $srcLang] = ma_chapter_source($course, $chapter);
    if (!$src) {
        return null;
    }
    $lang = lang();
    $cache = MA_CACHE . "/lesson/$lang/$course/$chapter.json";
    $katex = MA_CACHE . "/katex/$srcLang/$course/$chapter.json";
    $deps = max(ma_content_mtime(), (int)@filemtime($katex), (int)@filemtime(MA_CACHE . "/index-$lang.json"));
    $hit = read_json($cache);
    if ($hit && ($hit['version'] ?? 0) === MA_RENDER_VERSION && (int)@filemtime($cache) >= $deps) {
        return $hit;
    }
    ma_index();
    math_load("$srcLang/$course/$chapter");
    $before = MathCtx::$misses;
    $doc = new MdDoc("$course/$chapter", (string)$ch['n'], true);
    [$html] = md_render((string)file_get_contents($src), $doc);
    $out = [
        'version' => MA_RENDER_VERSION,
        'html' => $html,
        'toc' => $doc->toc,
        'items' => $doc->items,
        'exercises' => $doc->exercises,
        'examples' => $doc->examples,
        'widgets' => array_map(fn($w) => ['type' => $w['type'], 'id' => $w['id']], $doc->widgets),
        'words' => $doc->words,
        'quizzes' => $doc->quizzes,
        'proofs' => $doc->proofs,
        'errors' => $doc->errors,
        'src_lang' => $srcLang,
        'misses' => MathCtx::$misses - $before,
    ];
    write_json($cache, $out);
    return $out;
}

/** Inline markup from a course record (titles, summaries…), with that course's formula cache. */
function ma_inline(string $s, string $course): string
{
    if ($s === '') {
        return '';
    }
    math_load(lang() . "/$course/_course");
    return md_inline($s);
}

/** Inline markup from site-wide data files (data/*.json). */
function ma_site_inline(string $s): string
{
    math_load(lang() . '/_site');
    return md_inline($s);
}

/** Estimated reading time in minutes for a word count (prose plus formulas, worked examples). */
function reading_minutes(int $words): int
{
    return max(1, (int)round($words / 160));
}

function area_label(string $a): string
{
    return t(AREAS[$a]['label'] ?? ucfirst($a));
}

/** Prerequisite chapters of a chapter (course/chapter keys) that exist in the atlas. */
function ma_requires(array $ch): array
{
    $out = [];
    foreach ($ch['requires'] ?? [] as $r) {
        if (preg_match('/^([a-z0-9-]+)\/([a-z0-9-]+)$/', $r, $m) && ma_chapter_meta($m[1], $m[2])) {
            $out[] = $r;
        }
    }
    return $out;
}

/** Site totals for the home page. */
function ma_totals(): array
{
    $t = ['courses' => 0, 'chapters' => 0, 'theorems' => 0, 'definitions' => 0, 'examples' => 0, 'exercises' => 0, 'widgets' => 0, 'words' => 0];
    $idx = ma_index();
    foreach (ma_courses() as $c) {
        $t['courses']++;
        foreach ($c['chapters'] as $ch) {
            $s = $idx['chapters'][$c['slug'] . '/' . $ch['slug']] ?? null;
            if (!$s || !empty($s['missing'])) {
                continue;
            }
            $t['chapters']++;
            foreach (['theorems', 'definitions', 'examples', 'exercises', 'widgets', 'words'] as $k) {
                $t[$k] += $s[$k] ?? 0;
            }
        }
    }
    return $t;
}

/**
 * Theorem-like items and exercises of every written lesson in the page language, taken from the rendered
 * lesson caches (so formulas are already typeset). Cached in data/cache/collect-<lang>.json.
 * Returns ['items' => [...], 'exercises' => [...]] with course, chapter, n (chapter number) on each entry.
 */
function ma_collect(): array
{
    static $memo = [];
    $lang = lang();
    if (isset($memo[$lang])) {
        return $memo[$lang];
    }
    $path = MA_CACHE . "/collect-$lang.json";
    $deps = max(ma_content_mtime(), newest_mtime([MA_CACHE . '/katex/*/*/*.json']));
    $hit = read_json($path);
    if ($hit && ($hit['version'] ?? 0) === MA_RENDER_VERSION && (int)@filemtime($path) >= $deps) {
        return $memo[$lang] = $hit;
    }
    $out = ['version' => MA_RENDER_VERSION, 'items' => [], 'exercises' => []];
    foreach (ma_courses() as $c) {
        foreach ($c['chapters'] as $ch) {
            $l = ma_lesson($c['slug'], $ch['slug']);
            if (!$l) {
                continue;
            }
            $base = ['course' => $c['slug'], 'chapter' => $ch['slug'], 'n' => $ch['n']];
            foreach ($l['items'] as $it) {
                $out['items'][] = $base + ['kind' => $it['kind'], 'id' => $it['id'], 'num' => $it['num'], 'title' => $it['title'], 'html' => $it['html']];
            }
            foreach ($l['exercises'] as $ex) {
                $out['exercises'][] = $base + ['id' => $ex['id'], 'num' => $ex['num'], 'level' => $ex['level'], 'title' => $ex['title'],
                    'check' => $ex['check'], 'html' => $ex['html'], 'extra' => $ex['extra']];
            }
        }
    }
    write_json($path, $out);
    return $memo[$lang] = $out;
}
