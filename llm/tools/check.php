<?php
declare(strict_types=1);
/**
 * Structural checks for courses and lessons, plus a depth report per chapter.
 *
 *   php tools/check.php [course ...] [--lang=en|zh] [--strict]
 *
 * ERRORs: invalid course.json, broken markup (unclosed blocks, unknown kinds), unresolved references,
 * exercises without solutions, Chinese lessons whose numbered blocks/anchors differ from the English.
 * WARNs: lessons below the depth targets in tools/CONTENT_GUIDE.md. --strict turns missing lessons into errors.
 */
if (PHP_SAPI !== 'cli') {
    exit;
}
require __DIR__ . '/../inc/bootstrap.php';

$args = array_slice($argv, 1);
$only = array_values(array_filter($args, fn($a) => $a !== '' && $a[0] !== '-'));
$strict = in_array('--strict', $args, true);
$langs = ['en', 'zh'];
foreach ($args as $a) {
    if (preg_match('/^--lang=(en|zh)$/', $a, $m)) {
        $langs = [$m[1]];
    }
}
$targets = ['words' => 2500, 'examples' => 4, 'exercises' => 8, 'widgets' => 1, 'quizzes' => 1, 'core' => 3];
// Generated filler left over from the curriculum skeleton. A lesson or course record holding any of
// these has not been written yet, whatever its word count; see tools/CONTENT_GUIDE.md.
$FILLER = [
    'en' => ['/\bthe one that the \w+(?: \w+){0,2} is for\b/i', '/\b(?:is|are) for, is for\b/i', '/^This lesson defines the /m', '/The method, and the check, are the one for/', '/^Course: \*\*[a-z0-9-]+\*\* — chapter:? `/m'],
    'zh' => ['/以及者/', '/者（[^）]*所对应的）/', '/就是者（/', '/^该课程定义/'],
];
$filler = function ($text, string $lang) use ($FILLER): bool {
    $src = is_string($text) ? $text : json_encode($text, JSON_UNESCAPED_UNICODE);
    foreach ($FILLER[$lang] ?? [] as $re) {
        if (preg_match($re, (string) $src)) {
            return true;
        }
    }
    return false;
};
$errors = 0;
$warns = 0;
$E = function (string $where, string $msg) use (&$errors) { $errors++; echo "ERROR $where: $msg\n"; };
$W = function (string $where, string $msg) use (&$warns) { $warns++; echo "warn  $where: $msg\n"; };

$GLOBALS['MA_LANG'] = 'en';
$courses = ma_courses();
$allSlugs = array_keys($courses);

// ---------------------------------------------------------------- course records
foreach ($courses as $slug => $c) {
    if ($only && !in_array($slug, $only, true)) {
        continue;
    }
    $where = "content/en/$slug/course.json";
    foreach (['slug', 'title', 'full_title', 'area', 'level', 'order', 'tagline', 'summary', 'overview', 'prerequisites', 'outcomes', 'chapters', 'history', 'references'] as $k) {
        if (!array_key_exists($k, $c)) {
            $E($where, "missing field '$k'");
        }
    }
    if (!isset(AREAS[$c['area'] ?? ''])) {
        $E($where, "area must be one of " . implode(', ', array_keys(AREAS)));
    }
    if (!in_array($c['level'] ?? 0, [1, 2, 3, 4], true)) {
        $E($where, 'level must be 1–4 (see LEVELS in inc/content.php)');
    }
    foreach ($c['prerequisites'] ?? [] as $p) {
        if (!in_array($p, $allSlugs, true)) {
            $E($where, "prerequisite '$p' is not a course");
        }
    }
    if ($filler($c, 'en')) {
        $E($where, 'course record still holds generated filler (overview, outcomes, history or references) — rewrite those fields by hand');
    }
    if (count($c['overview'] ?? []) < 2) {
        $W($where, 'overview should have 2–4 paragraphs');
    }
    if (count($c['outcomes'] ?? []) < 4) {
        $W($where, 'list at least 4 learning outcomes');
    }
    if (count($c['history'] ?? []) < 3) {
        $W($where, 'add at least 3 history events');
    }
    foreach ($c['history'] ?? [] as $h) {
        if (!is_int($h['year'] ?? null) || empty($h['title']) || empty($h['detail'])) {
            $E($where, 'history events need integer year, title and detail');
        }
    }
    if (count($c['references'] ?? []) < 3) {
        $W($where, 'add at least 3 references');
    }
    $seen = [];
    foreach ($c['chapters'] as $ch) {
        if (empty($ch['slug']) || !preg_match('/^[a-z0-9-]+$/', $ch['slug'])) {
            $E($where, 'chapter slug must be lowercase letters, digits and hyphens');
            continue;
        }
        if (isset($seen[$ch['slug']])) {
            $E($where, "duplicate chapter slug '{$ch['slug']}'");
        }
        $seen[$ch['slug']] = true;
        foreach (['title', 'summary'] as $k) {
            if (empty($ch[$k])) {
                $E($where, "chapter {$ch['slug']}: missing $k");
            }
        }
        foreach ($ch['requires'] ?? [] as $r) {
            if (!preg_match('/^([a-z0-9-]+)\/([a-z0-9-]+)$/', $r, $m) || !ma_chapter_meta($m[1], $m[2])) {
                $E($where, "chapter {$ch['slug']}: requires '$r' is not a chapter (course/chapter)");
            }
        }
    }
}

// ---------------------------------------------------------------- Chinese course overlays
if (in_array('zh', $langs, true)) {
    $allowed = ['title', 'full_title', 'tagline', 'summary', 'overview', 'outcomes', 'chapters', 'history', 'references'];
    foreach ($courses as $slug => $c) {
        if ($only && !in_array($slug, $only, true)) {
            continue;
        }
        $where = "content/zh/$slug/course.json";
        $p = MA_CONTENT . "/zh/$slug/course.json";
        if (!is_file($p)) {
            if (glob(MA_CONTENT . "/zh/$slug/*.md")) {
                $W($where, 'Chinese lessons exist but the course overlay is missing');
            }
            continue;
        }
        $ov = json_decode((string)file_get_contents($p), true);
        if (!is_array($ov)) {
            $E($where, 'invalid JSON');
            continue;
        }
        foreach (array_diff(array_keys($ov), $allowed) as $k) {
            $E($where, "unexpected key '$k' (an overlay holds only the translated fields: " . implode(', ', $allowed) . ')');
        }
        foreach (['title', 'full_title', 'tagline', 'summary', 'overview', 'outcomes', 'chapters', 'history', 'references'] as $k) {
            if (isset($ov[$k]) && $filler($ov[$k], 'zh')) {
                $E($where, "'$k' still holds generated filler — rewrite it by hand");
            }
        }
        foreach (['overview', 'outcomes', 'chapters', 'history', 'references'] as $k) {
            if (isset($ov[$k]) && count($ov[$k]) !== count($c[$k] ?? [])) {
                $E($where, "'$k' has " . count($ov[$k]) . ' entries, the English has ' . count($c[$k] ?? []) . ' (lists are overlaid index by index)');
            }
        }
        foreach ($ov['chapters'] ?? [] as $i => $ch) {
            if (!is_array($ch) || array_diff(array_keys($ch), ['title', 'summary'])) {
                $E($where, "chapters[$i] may only contain title and summary");
            }
        }
        foreach ($ov['history'] ?? [] as $i => $h) {
            if (!is_array($h) || isset($h['year'])) {
                $E($where, "history[$i] must not repeat 'year' (only title, detail, people)");
            }
        }
    }
}

// ---------------------------------------------------------------- lessons
$rows = [];
$enAnchors = [];
foreach ($langs as $lang) {
    $GLOBALS['MA_LANG'] = $lang;
    foreach (ma_courses() as $slug => $c) {
        if ($only && !in_array($slug, $only, true)) {
            continue;
        }
        foreach ($c['chapters'] as $ch) {
            $file = "content/$lang/$slug/{$ch['slug']}.md";
            $path = MA_ROOT . '/' . $file;
            if (!is_file($path)) {
                if ($lang === 'en') {
                    ($strict ? $E : $W)($file, 'lesson not written yet');
                } elseif (is_file(MA_CONTENT . "/en/$slug/{$ch['slug']}.md")) {
                    $W($file, 'English lesson exists — the Chinese translation has not been written yet');
                }
                continue;
            }
            $doc = new MdDoc("$slug/{$ch['slug']}", (string)$ch['n'], true);
            $src = (string)file_get_contents($path);
            if ($filler($src, $lang)) {
                $E($file, 'lesson is generated filler — it has to be written by hand (see tools/CONTENT_GUIDE.md)');
                if ($lang === 'en') {
                    $enAnchors["$slug/{$ch['slug']}"] = [];
                }
                continue;
            }
            md_render($src, $doc);
            foreach ($doc->errors as $e) {
                $E("$file:{$e['line']}", $e['msg']);
            }
            // a reference already renders its own label ("Theorem 3.2"); "Theorem [[#thm-x]]" would print it twice
            foreach (explode("\n", $src) as $no => $l) {
                if (preg_match('/\\b(Exercises?|Theorems?|Definitions?|Examples?|Lemmas?|Corollary|Corollaries|Propositions?|Algorithms?|Axioms?)\\s+\\[\\[#|(定理|定义|例题?|习题|引理|推论|命题|算法|公理)\\s*\\[\\[#/u', $l)) {
                    $E("$file:" . ($no + 1), 'duplicated label: write [[#id]] alone (it renders as "Theorem 3.2"), or [[#id|custom text]]');
                }
            }
            $kinds = array_count_values(array_map(fn($i) => $i['kind'], $doc->items));
            $core = count($doc->items);
            $hasSummary = str_contains($src, ':::summary') || preg_match('/^:::\s*summary/m', $src);
            $hasHistory = preg_match('/^:::\s*history/m', $src) === 1;
            $stats = ['words' => $doc->words, 'core' => $core, 'examples' => count($doc->examples), 'exercises' => count($doc->exercises),
                'widgets' => count($doc->widgets), 'quizzes' => $doc->quizzes, 'proofs' => $doc->proofs];
            if ($lang === 'en') {
                foreach ($targets as $k => $min) {
                    if ($stats[$k] < $min) {
                        $W($file, "$k = {$stats[$k]} (target ≥ $min)");
                    }
                }
                if (!$hasSummary) {
                    $W($file, 'no ::: summary block (Key takeaways)');
                }
                if (!$hasHistory) {
                    $W($file, 'no ::: history block');
                }
                $enAnchors["$slug/{$ch['slug']}"] = array_keys(array_filter($doc->anchors, fn($a) => $a['kind'] !== 'section'));
                $rows[] = [$slug . '/' . $ch['slug'], $stats];
            } else {
                $en = $enAnchors["$slug/{$ch['slug']}"] ?? null;
                if ($en === null && is_file(MA_CONTENT . "/en/$slug/{$ch['slug']}.md")) {
                    // checking Chinese only: number the English lesson to compare anchors
                    $edoc = new MdDoc("$slug/{$ch['slug']}", (string)$ch['n'], false);
                    $elines = explode("\n", str_replace(["\r\n", "\r", "\t"], ["\n", "\n", '    '], (string)file_get_contents(MA_CONTENT . "/en/$slug/{$ch['slug']}.md")));
                    $enodes = md_parse_blocks($elines, 1, $edoc);
                    md_number($enodes, $edoc);
                    $en = array_keys(array_filter($edoc->anchors, fn($a) => $a['kind'] !== 'section'));
                }
                // leftover English: a prose line with a long run of English words once formulas, references,
                // attributes, code and figure settings are removed
                $plain = preg_replace_callback('/\$\$.*?\$\$|```.*?```/s', fn($m) => str_repeat("\n", substr_count($m[0], "\n")), $src);
                $inWidget = false;
                foreach (explode("\n", (string)$plain) as $no => $l) {
                    if (preg_match('/^\s*:::\s*widget\b/', $l)) {
                        $inWidget = true;
                        continue;
                    }
                    if ($inWidget) {
                        if (preg_match('/^\s*:::\s*$/', $l)) {
                            $inWidget = false;
                        }
                        if (!preg_match('/^\s*(caption|title)\s*:/', $l)) {
                            continue;
                        }
                    }
                    // original titles are kept in italics: 《中文标题》（*Original Title*）
                    $l = preg_replace(['/\$[^$]*\$/', '/\[\[[^\]]*\]\]/', '/\{[^}]*\}/', '/`[^`]*`/', '#https?://\S+#', '/(?<!\*)\*[^*\n]+\*(?!\*)/u'], ' ', $l);
                    if (preg_match('/(?:\b[A-Za-z][A-Za-z\'’-]*[\s,;:.()]+){12,}/', (string)$l)) {
                        $W("$file:" . ($no + 1), 'looks untranslated: ' . mb_substr(trim((string)$l), 0, 70));
                    }
                }
                if ($en !== null) {
                    $zh = array_keys(array_filter($doc->anchors, fn($a) => $a['kind'] !== 'section'));
                    $missing = array_diff($en, $zh);
                    $extra = array_diff($zh, $en);
                    if ($missing || $extra) {
                        $E($file, 'numbered blocks/anchors differ from English' . ($missing ? ' — missing: ' . implode(', ', array_slice($missing, 0, 8)) : '') . ($extra ? ' — extra: ' . implode(', ', array_slice($extra, 0, 8)) : ''));
                    }
                }
            }
        }
    }
}

if ($rows) {
    echo "\n" . str_pad('lesson', 46) . str_pad('words', 7, ' ', STR_PAD_LEFT) . str_pad('core', 6, ' ', STR_PAD_LEFT) . str_pad('ex', 5, ' ', STR_PAD_LEFT)
        . str_pad('exr', 5, ' ', STR_PAD_LEFT) . str_pad('fig', 5, ' ', STR_PAD_LEFT) . str_pad('quiz', 6, ' ', STR_PAD_LEFT) . str_pad('proof', 7, ' ', STR_PAD_LEFT) . "\n";
    $tot = array_fill_keys(['words', 'core', 'examples', 'exercises', 'widgets', 'quizzes', 'proofs'], 0);
    foreach ($rows as [$k, $s]) {
        echo str_pad($k, 46) . str_pad((string)$s['words'], 7, ' ', STR_PAD_LEFT) . str_pad((string)$s['core'], 6, ' ', STR_PAD_LEFT) . str_pad((string)$s['examples'], 5, ' ', STR_PAD_LEFT)
            . str_pad((string)$s['exercises'], 5, ' ', STR_PAD_LEFT) . str_pad((string)$s['widgets'], 5, ' ', STR_PAD_LEFT) . str_pad((string)$s['quizzes'], 6, ' ', STR_PAD_LEFT) . str_pad((string)$s['proofs'], 7, ' ', STR_PAD_LEFT) . "\n";
        foreach ($tot as $kk => $_) {
            $tot[$kk] += $s[$kk];
        }
    }
    echo str_pad('TOTAL (' . count($rows) . ' lessons)', 46) . str_pad((string)$tot['words'], 7, ' ', STR_PAD_LEFT) . str_pad((string)$tot['core'], 6, ' ', STR_PAD_LEFT) . str_pad((string)$tot['examples'], 5, ' ', STR_PAD_LEFT)
        . str_pad((string)$tot['exercises'], 5, ' ', STR_PAD_LEFT) . str_pad((string)$tot['widgets'], 5, ' ', STR_PAD_LEFT) . str_pad((string)$tot['quizzes'], 6, ' ', STR_PAD_LEFT) . str_pad((string)$tot['proofs'], 7, ' ', STR_PAD_LEFT) . "\n";
}
echo "\ncheck: $errors errors, $warns warnings\n";
exit($errors ? 1 : 0);
