<?php
declare(strict_types=1);

function icon(string $name): string
{
    $i = [
        'search' => '<path d="M11 19a8 8 0 1 1 5.3-14A8 8 0 0 1 11 19Zm10 2-4.4-4.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        'moon'   => '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
        'check'  => '<path d="m5 12.5 4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
        'arrow'  => '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        'back'   => '<path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        'book'   => '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
        'clock'  => '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
        'shuffle' => '<path d="M4 7h3.5c2 0 3 1 4.5 3.5S14.5 17 16.5 17H20m0 0-2.5-2.5M20 17l-2.5 2.5M4 17h3.5c1.2 0 2-.4 2.8-1.2M20 7h-3.5c-1.2 0-2 .4-2.8 1.2M20 7l-2.5-2.5M20 7l-2.5 2.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    ];
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' . ($i[$name] ?? '') . '</svg>';
}

function brand_mark(): string
{
    // three tokens with attention arcs
    return '<svg class="brand-mark" viewBox="0 0 38 16" aria-hidden="true"><path d="M5 9.5C9 1 29 1 33 9.5M19 9.5C22 4.5 30 4.5 33 9.5" style="fill:none;stroke:var(--rule-2);stroke-width:1.4"/>'
        . '<circle cx="5" cy="11.6" r="3.7" style="fill:var(--a-language)"/><circle cx="19" cy="11.6" r="3.7" style="fill:var(--a-training)"/>'
        . '<circle cx="33" cy="11.6" r="3.7" style="fill:var(--a-alignment)"/></svg>';
}

/** The landing page with every atlas, in the language of this page. */
function home_url(): string
{
    return '../?lang=' . lang();
}

/** The landing page's own mark, so the way back looks like the page it leads to. */
function learn_mark(): string
{
    return '<svg class="learn-mark" viewBox="0 0 38 16" aria-hidden="true"><line x1="6" y1="8" x2="32" y2="8"/>'
        . '<circle cx="6" cy="8" r="5.6" style="fill:#2a78d6"/><circle cx="19" cy="8" r="5.6" style="fill:#eda100"/>'
        . '<circle cx="32" cy="8" r="5.6" style="fill:#4a3aa7"/></svg>';
}

function site_name(): string
{
    return t('LLM Atlas');
}

/** Common page header. $active is the nav key. Options: description, scripts (deferred JS files), katex_js (bool). */
function page_head(string $title, string $active = '', array $opt = []): void
{
    $desc = $opt['description'] ?? t('A detailed, interactive course on large language models: from the mathematics of machine learning and the Transformer to pretraining, alignment, inference, applications and safety.');
    $nav = [
        'index' => ['index.php', 'Atlas'], 'map' => ['map.php', 'Map'], 'theorems' => ['theorems.php', 'Theorems'],
        'practice' => ['practice.php', 'Practice'], 'timeline' => ['timeline.php', 'Timeline'], 'lab' => ['lab.php', 'Lab'],
        'about' => ['about.php', 'About'],
    ];
    $site = site_name();
    $plain = trim(strip_tags($title));
    $fullTitle = $plain === $site ? $site : $plain . ' — ' . $site;
    $other = is_zh() ? 'en' : 'zh';
    echo '<!doctype html><html lang="' . h(LANGS[lang()]['html']) . '"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>' . h($fullTitle) . '</title><meta name="description" content="' . h($desc) . '">';
    foreach (LANGS as $code => $L) {
        echo '<link rel="alternate" hreflang="' . h($L['html']) . '" href="' . h(lang_url($code)) . '">';
    }
    echo '<link rel="icon" href="data:image/svg+xml,' . rawurlencode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 16"><path d="M5 9.5C9 1 29 1 33 9.5M19 9.5C22 4.5 30 4.5 33 9.5" fill="none" stroke="#c3c9cf" stroke-width="1.4"/><circle cx="5" cy="11.6" r="3.7" fill="#2a78d6"/><circle cx="19" cy="11.6" r="3.7" fill="#4a3aa7"/><circle cx="33" cy="11.6" r="3.7" fill="#e0612d"/></svg>') . '">';
    echo '<link rel="stylesheet" href="' . h(asset('assets/fonts/fonts.css')) . '">';
    echo '<link rel="stylesheet" href="' . h(asset('assets/vendor/katex/katex-swap.min.css')) . '">';
    echo '<link rel="stylesheet" href="' . h(asset('assets/css/llm.css')) . '">';
    echo '<meta property="og:title" content="' . h($fullTitle) . '"><meta property="og:description" content="' . h($desc) . '">';
    echo '<script>window.MA_LANG=' . json_embed(lang()) . ';window.MA_T=' . json_embed((object)js_dict()) . ';</script>';
    echo '<script src="' . h(asset('assets/js/core.js')) . '"></script>';
    foreach ($opt['scripts'] ?? [] as $s) {
        echo '<script src="' . h(asset($s)) . '" defer></script>';
    }
    echo '</head><body>';
    echo '<a class="visually-hidden" href="#main">' . h(t('Skip to content')) . '</a>';
    echo '<header class="site-head"><div class="wrap">';
    echo '<div class="head-crumbs"><a class="home-crumb" href="' . h(home_url()) . '" title="' . h(t('All atlases')) . '">' . learn_mark()
        . '<span>' . h(t('Learn')) . '</span></a><span class="crumb-sep" aria-hidden="true">/</span>';
    echo '<a class="brand" href="' . h(url('index.php')) . '">' . brand_mark() . '<span class="brand-name">' . h($site) . '</span></a></div>';
    echo '<nav class="site-nav" aria-label="' . h(t('Main')) . '">';
    foreach ($nav as $k => [$href, $label]) {
        echo '<a href="' . h(url($href)) . '"' . ($k === $active ? ' aria-current="page"' : '') . '>' . h(t($label)) . '</a>';
    }
    echo '</nav><div class="head-tools">';
    echo '<a class="lang-switch" href="' . h(lang_url($other)) . '" hreflang="' . h(LANGS[$other]['html']) . '" lang="' . h(LANGS[$other]['html']) . '" title="' . h($other === 'zh' ? '切换到中文' : 'Switch to English') . '">' . h(LANGS[$other]['switch']) . '</a>';
    echo '<button class="theme-toggle" type="button" aria-label="' . h(t('Toggle dark theme')) . '">' . icon('moon') . '</button>';
    echo '</div></div></header><main id="main">';
}

function page_foot(): void
{
    echo '</main><footer class="site-foot"><div class="wrap"><div>';
    echo '<p><b>' . h(site_name()) . '</b> — ' . h(t('a free, detailed and interactive course on large language models, from first principles to current research, written to be read alongside lectures, papers and textbooks.')) . '</p>';
    echo '<p>' . h(t('Formulas are typeset with KaTeX. Interactive figures run in your browser; no data leave your device. Your reading progress is stored only in this browser.')) . '</p>';
    echo '</div><div><p><a href="' . h(url('about.php')) . '">' . h(t('About and how to use')) . '</a></p><p><a href="' . h(home_url()) . '">' . h(t('All atlases')) . '</a></p></div></div></footer>';
    if (MathCtx::$misses > 0) {
        // formulas not yet in the build cache: typeset them in the browser
        echo '<script src="' . h(asset('assets/vendor/katex/katex.min.js')) . '"></script><script>MA.typesetFallback && MA.typesetFallback();</script>';
    }
    echo '</body></html>';
}

/** Coloured area chip. */
function area_chip(string $a): string
{
    return '<span class="area-chip" style="--c:var(--a-' . h($a) . ')"><i></i>' . h(area_label($a)) . '</span>';
}

/** Difficulty dots for exercises. */
function level_dots(int $level): string
{
    $level = max(1, min(3, $level));
    return '<span class="lvl lvl-' . $level . '" title="' . h(t(MD_LEVELS[$level])) . '"><span aria-hidden="true">' . str_repeat('●', $level) . str_repeat('○', 3 - $level) . '</span><span class="visually-hidden">' . h(t(MD_LEVELS[$level])) . '</span></span>';
}

/**
 * A course drawn as a chain of chapter beads (the atlas motif). Each bead links to its lesson;
 * data-key lets the browser mark chapters the reader has finished.
 */
function chapter_chain(array $course, array $opt = []): string
{
    $unit = (float)($opt['unit'] ?? 30);
    $r = $unit * 0.36;
    $chs = $course['chapters'];
    $n = count($chs);
    $w = max(1, $n) * $unit + $unit * 0.4;
    $hgt = $unit * 1.0;
    $cy = $hgt / 2;
    $area = $course['area'] ?? 'foundations';
    $o = '<svg class="chain" viewBox="0 0 ' . round($w, 1) . ' ' . round($hgt, 1) . '" width="' . round($w, 1) . '" height="' . round($hgt, 1) . '" style="--c:var(--a-' . h($area) . ')" role="list" aria-label="' . h(t('%s chapters', md_plain($course['title']))) . '">';
    $x0 = $unit * 0.7;
    if ($n > 1) {
        $o .= '<line class="chain-line" x1="' . $x0 . '" y1="' . $cy . '" x2="' . round($x0 + ($n - 1) * $unit, 1) . '" y2="' . $cy . '"/>';
    }
    $idx = ma_index();
    foreach ($chs as $i => $ch) {
        $x = round($x0 + $i * $unit, 1);
        $key = $course['slug'] . '/' . $ch['slug'];
        $missing = !empty($idx['chapters'][$key]['missing']);
        $href = url('lesson.php', ['c' => $course['slug'], 'l' => $ch['slug']]);
        $label = ($i + 1) . '. ' . md_plain($ch['title']);
        $o .= '<a role="listitem" href="' . h($href) . '" class="bead' . ($missing ? ' is-missing' : '') . '" data-key="' . h($key) . '"><title>' . h($label) . '</title>'
            . '<circle cx="' . $x . '" cy="' . $cy . '" r="' . round($r, 2) . '"/><text x="' . $x . '" y="' . $cy . '" font-size="' . round($unit * 0.34, 1) . '">' . ($i + 1) . '</text></a>';
    }
    return $o . '</svg>';
}

/** Breadcrumbs: list of [label, href|null]. */
function crumbs(array $items): string
{
    $o = '<nav class="crumbs" aria-label="' . h(t('Breadcrumb')) . '">';
    foreach ($items as $k => [$label, $href]) {
        if ($k > 0) {
            $o .= ' <span aria-hidden="true">/</span> ';
        }
        $o .= $href ? '<a href="' . h($href) . '">' . $label . '</a>' : '<span>' . $label . '</span>';
    }
    return $o . '</nav>';
}

function fmt_num(int $n): string
{
    return number_format($n);
}
