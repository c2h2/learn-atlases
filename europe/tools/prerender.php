<?php
declare(strict_types=1);
/**
 * Warm every cache the pages read: site index, each lesson's HTML (English and Chinese) and the
 * theorem/exercise collection.   php tools/prerender.php
 */
if (PHP_SAPI !== 'cli') {
    exit;
}
require __DIR__ . '/../inc/bootstrap.php';
$t0 = microtime(true);
foreach (['en', 'zh'] as $lang) {
    $GLOBALS['MA_LANG'] = $lang;
    $n = 0;
    $miss = 0;
    ma_index();
    foreach (ma_courses() as $c) {
        foreach ($c['chapters'] as $ch) {
            $l = ma_lesson($c['slug'], $ch['slug']);
            if ($l) {
                $n++;
                $miss += $l['misses'];
            }
        }
    }
    ma_collect();
    fwrite(STDERR, sprintf("prerender %s: %d lessons, %d formulas not pre-typeset\n", $lang, $n, $miss));
}
fwrite(STDERR, sprintf("prerender: %.1f s\n", microtime(true) - $t0));
