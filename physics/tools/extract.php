<?php
declare(strict_types=1);
/**
 * Collect every formula, figure and exercise check from the content for tools/build.js.
 *
 *   php tools/extract.php [course ...] [--lang=en|zh]
 *
 * Writes data/cache/extract/<lang>/<course>/<chapter>.json (and _course.json for course.json strings):
 *   { file, math: {hash: {tex, display, line}}, widgets: [{type, config, line}], checks: [{expr, line}], errors: [{line, msg}] }
 */
if (PHP_SAPI !== 'cli') {
    exit;
}
require __DIR__ . '/../inc/bootstrap.php';

$args = array_slice($argv, 1);
$langs = ['en', 'zh'];
$only = [];
foreach ($args as $a) {
    if (preg_match('/^--lang=(en|zh)$/', $a, $m)) {
        $langs = [$m[1]];
    } elseif ($a !== '' && $a[0] !== '-') {
        $only[] = $a;
    }
}

/** Every human-readable string in a course record that is rendered as inline markup. */
function course_strings(array $c): array
{
    $out = [];
    $skip = ['slug', 'area', 'requires', 'prerequisites', 'next', 'url', 'isbn', 'level', 'order', 'hours', 'year', 'people'];
    $walk = function ($v, $k) use (&$walk, &$out, $skip) {
        if (in_array((string)$k, $skip, true)) {
            return;
        }
        if (is_array($v)) {
            foreach ($v as $kk => $vv) {
                $walk($vv, is_int($kk) ? $k : $kk);
            }
        } elseif (is_string($v)) {
            $out[] = $v;
        }
    };
    $walk($c, '');
    return $out;
}

$total = ['docs' => 0, 'math' => 0, 'widgets' => 0];
foreach ($langs as $lang) {
    $GLOBALS['MA_LANG'] = $lang;
    foreach (ma_courses() as $slug => $c) {
        if ($only && !in_array($slug, $only, true)) {
            continue;
        }
        // course record strings
        MathCtx::$collect = [];
        foreach (course_strings($c) as $s) {
            md_inline($s);
        }
        write_json(MA_CACHE . "/extract/$lang/$slug/_course.json", ['file' => "content/$lang/$slug/course.json", 'math' => MathCtx::$collect, 'widgets' => [], 'checks' => [], 'errors' => []]);
        $total['math'] += count(MathCtx::$collect);
        foreach ($c['chapters'] as $ch) {
            $src = MA_CONTENT . "/$lang/$slug/{$ch['slug']}.md";
            if (!is_file($src)) {
                continue; // Chinese pages fall back to the English lesson (and its formula cache)
            }
            MathCtx::$collect = [];
            $doc = new MdDoc("$slug/{$ch['slug']}", (string)$ch['n'], true);
            md_render((string)file_get_contents($src), $doc);
            write_json(MA_CACHE . "/extract/$lang/$slug/{$ch['slug']}.json", [
                'file' => "content/$lang/$slug/{$ch['slug']}.md",
                'math' => MathCtx::$collect,
                'widgets' => array_map(fn($w) => ['type' => $w['type'], 'config' => $w['config'], 'line' => $w['line']], $doc->widgets),
                'checks' => $doc->checks,
                'errors' => $doc->errors,
            ]);
            $total['docs']++;
            $total['math'] += count(MathCtx::$collect);
            $total['widgets'] += count($doc->widgets);
        }
    }
    // site-wide data files with inline markup
    MathCtx::$collect = [];
    foreach (['milestones'] as $name) {
        $d = read_json(MA_DATA . "/$name.json");
        if ($d) {
            $o = $lang === 'zh' ? read_json(MA_CONTENT . "/zh/_data/$name.json") : null;
            if ($o) {
                $d = overlay($d, $o);
            }
            foreach (course_strings($d) as $s) {
                md_inline($s);
            }
        }
    }
    write_json(MA_CACHE . "/extract/$lang/_site.json", ['file' => 'data/*.json', 'math' => MathCtx::$collect, 'widgets' => [], 'checks' => [], 'errors' => []]);
}
MathCtx::$collect = null;
fwrite(STDERR, sprintf("extract: %d lessons, %d formulas, %d figures\n", $total['docs'], $total['math'], $total['widgets']));
