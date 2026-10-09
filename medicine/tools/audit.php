<?php
declare(strict_types=1);
/**
 * Crawl every page of the site over HTTP and report what a reader would actually see.
 *
 *   php tools/audit.php [--lang=en|zh] [--course=slug] [--verbose]
 *
 * Checks each page for: HTTP status, PHP warnings/errors leaking into the HTML, the
 * "in preparation" state, empty course sections, links that lead to an unwritten chapter,
 * missing description/robots, and pages that render nothing at all.  Exit code is non-zero
 * when a page is broken (not merely unwritten).
 */
if (PHP_SAPI !== 'cli') {
    exit;
}
require __DIR__ . '/../inc/bootstrap.php';

$args = array_slice($argv, 1);
$langs = in_array('--lang=zh', $args, true) ? ['zh'] : (in_array('--lang=en', $args, true) ? ['en'] : ['en', 'zh']);
$only = null;
$verbose = in_array('--verbose', $args, true);
foreach ($args as $a) {
    if (preg_match('/^--course=(.+)$/', $a, $m)) {
        $only = $m[1];
    }
}
$base = 'http://127.0.0.1/learn/medicine/';
$ctx = stream_context_create(['http' => [
    'header' => "Host: f.g77k.com\r\n",
    'timeout' => 25,
    'ignore_errors' => true,
]]);

$fetch = function (string $url) use ($base, $ctx): array {
    $body = @file_get_contents($base . $url, false, $ctx);
    $status = 0;
    foreach ($http_response_header ?? [] as $h) {
        if (preg_match('#^HTTP/\S+\s+(\d{3})#', $h, $m)) {
            $status = (int)$m[1];
        }
    }
    return [$status, (string)$body];
};

$pages = [];
foreach (['index.php', 'map.php', 'timeline.php', 'theorems.php', 'practice.php', 'about.php'] as $p) {
    $pages[] = [$p, 'site'];
}
foreach (ma_courses() as $slug => $c) {
    if ($only && $slug !== $only) {
        continue;
    }
    $pages[] = ["course.php?c=$slug", $slug];
    foreach ($c['chapters'] as $ch) {
        $pages[] = ["lesson.php?c=$slug&l={$ch['slug']}", "$slug/{$ch['slug']}"];
    }
}

$problems = 0;
$stubs = 0;
$forward = [];
$written = 0;
$counts = [];
foreach ($langs as $lang) {
    $counts[$lang] = ['stub' => 0, 'written' => 0, 'bad' => 0, 'fallback' => 0];
}
foreach ($pages as [$url, $key]) {
    foreach ($langs as $lang) {
        $u = $url . (str_contains($url, '?') ? '&' : '?') . "lang=$lang";
        [$status, $html] = $fetch($u);
        $where = "$lang/$url";
        $issue = [];
        if ($status !== 200) {
            $issue[] = "HTTP $status";
        }
        if (preg_match('/\b(Warning|Notice|Fatal error|Deprecated|Parse error)\b:/u', $html, $m)) {
            $issue[] = 'PHP ' . $m[1];
        }
        if (str_contains($html, '⚠️') || str_contains($html, 'HTML Purifier')) {
            $issue[] = 'markup error';
        }
        $isStub = str_contains($html, 'is still being written') || str_contains($html, '本章正在编写中');
        $hasArticle = preg_match('/<article[^>]*>(.*?)<\/article>/s', $html, $m2) ? strlen(trim(strip_tags($m2[1]))) > 500 : false;
        if ($key === 'site' || str_starts_with($url, 'course.php')) {
            if ($status === 200 && $key !== 'site' && !str_contains($html, 'chapter-list')) {
                $issue[] = 'course page lists no chapters';
            }
        } elseif ($isStub) {
            $counts[$lang]['stub']++;
            $stubs++;
        } elseif (str_contains($html, '本章的中文版尚未完成')) {
            $counts[$lang]['fallback']++;   // Chinese reader is served the English lesson, with notice
        } elseif ($hasArticle) {
            $counts[$lang]['written']++;
            $written++;
        } elseif ($status === 200) {
            $issue[] = 'no content, no in-preparation notice';
        }
        // links that lead a reader to an unwritten chapter
        // language switching and hreflang alternates are not content links
        $body = preg_replace('#<link\b[^>]*>|<a\b[^>]*class="lang-switch"[^>]*>.*?</a>#s', '', $html);
        $here = preg_match('#c=([a-z0-9-]+)&amp;l=([a-z0-9-]+)#', $url, $mh) ? [$mh[1], $mh[2]] : [null, null];
        if (preg_match_all('#href="[^"]*lesson\.php\?c=([a-z0-9-]+)&amp;l=([a-z0-9-]+)[^"]*"#', $body, $mm, PREG_SET_ORDER)) {
            foreach ($mm as $link) {
                if ($link[1] === $here[0] && $link[2] === $here[1]) {
                    continue; // the page's own canonical/self link
                }
                if (!is_file(MA_CONTENT . "/$lang/{$link[1]}/{$link[2]}.md") && !is_file(MA_CONTENT . "/en/{$link[1]}/{$link[2]}.md")) {
                    // a link into a chapter that is in the curriculum but not yet written is a forward
                    // reference, not a broken page; the target says so and shows the outline
                    $forward["{$link[1]}/{$link[2]}"] = true;
                }
            }
        }
        if (str_contains($html, 'name="description" content=""')) {
            $issue[] = 'empty meta description';
        }
        if ($issue) {
            $problems++;
            $counts[$lang]['bad']++;
            printf("PROBLEM %-58s %s\n", mb_substr($where, 0, 58), implode('; ', array_unique($issue)));
        } elseif ($verbose) {
            printf("ok      %-58s %s\n", mb_substr($where, 0, 58), $isStub ? '(in preparation)' : '');
        }
    }
}

if ($forward) {
    printf("forward references to chapters not yet written (%d):\n  %s\n\n", count($forward), implode(', ', array_keys($forward)));
}
printf("\npages checked: %d x %d language(s)\n", count($pages), count($langs));
foreach ($counts as $lang => $c) {
    printf("  %-3s lessons in own language: %3d   shown in English: %3d   in preparation: %3d   broken pages: %d\n", $lang, $c['written'], $c['fallback'], $c['stub'], $c['bad']);
}
echo $problems ? "\n$problems problem(s) found\n" : "\nno broken pages\n";
exit($problems ? 1 : 0);
