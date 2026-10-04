<?php
declare(strict_types=1);

function icon(string $name): string
{
    $i = [
        'search'   => '<path d="M11 19a8 8 0 1 1 5.3-14A8 8 0 0 1 11 19Zm10 2-4.4-4.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
        'moon'     => '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
        'approved' => '<path d="m5 12.5 4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
        'regional' => '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/>',
        'clinical' => '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
        'research' => '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-dasharray="3.5 3"/>',
    ];
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' . ($i[$name] ?? '') . '</svg>';
}

/**
 * Name for tight labels: "Delta sleep-inducing peptide (DSIP)" -> "DSIP", "Ciclosporin (cyclosporine)" -> "Ciclosporin",
 * "血管加压素（抗利尿激素）" -> "血管加压素". Chinese characters are about twice as wide, so the limit halves.
 */
function short_name(array $p, ?int $max = null): string
{
    $n = $p['name'];
    $cjk = preg_match('/[\x{3400}-\x{9fff}]/u', $n) === 1;
    $max ??= $cjk ? 9 : 20;
    if (mb_strlen($n) <= $max || !preg_match('/^(.*?)\s*[（(](.+)[）)]\s*$/u', $n, $m)) {
        return $n;
    }
    return mb_strlen($m[1]) <= $max ? $m[1] : $m[2];
}

/** Secondary (English) name shown next to a translated name, or null when they are the same. */
function alt_name(array $p): ?string
{
    $en = $p['name_en'] ?? $p['name'];
    return $en !== $p['name'] ? $en : null;
}

function cat_label(string $k): string
{
    return t(CATEGORIES[$k]['label'] ?? $k);
}

function status_label(string $k): string
{
    return t(STATUSES[$k]['label'] ?? ucfirst($k));
}

/** " (x)" in English, "（x）" in Chinese. */
function paren(string $s): string
{
    return is_zh() ? '（' . $s . '）' : ' (' . $s . ')';
}

/** List separator for the page language. */
function list_sep(): string
{
    return is_zh() ? '、' : ', ';
}

/** Regulatory region name ("US", "EU", "WADA" …) in the page language. */
function region_label(string $r): string
{
    $k = 'region:' . $r;
    $v = t($k);
    return $v === $k ? $r : $v;
}

function status_badge(string $status): string
{
    $s = STATUSES[$status] ?? ['label' => ucfirst($status), 'long' => ''];
    return '<span class="badge ' . h($status) . '" title="' . h(t($s['long'])) . '">' . icon($status) . h(t($s['label'])) . '</span>';
}

function evidence_meter(int $n, bool $label = true): string
{
    $o = '<span class="meter-wrap" title="' . h(t('Human evidence %d/5: %s', $n, t(EVIDENCE[$n] ?? ''))) . '"><span class="meter" aria-hidden="true">';
    for ($i = 1; $i <= 5; $i++) {
        $o .= '<i' . ($i <= $n ? ' class="on"' : '') . '></i>';
    }
    $o .= '</span>';
    if ($label) {
        $o .= '<span>' . h(t('Evidence %d/5', $n)) . '</span>';
    } else {
        $o .= '<span class="visually-hidden">' . h(t('Evidence %d/5', $n)) . '</span>';
    }
    return $o . '</span>';
}

/** Tiny area sparkline for monthly values (server-rendered, no JS needed). */
function sparkline_svg(array $vals, float $w = 112, float $h = 26): string
{
    $vals = array_values(array_map('floatval', $vals));
    $n = count($vals);
    if ($n < 2) {
        return '<svg class="spark" viewBox="0 0 ' . $w . ' ' . $h . '" aria-hidden="true"></svg>';
    }
    $max = max($vals) ?: 1.0;
    $pts = [];
    foreach ($vals as $i => $v) {
        $pts[] = round($i / ($n - 1) * ($w - 3) + 1, 1) . ',' . round($h - 2 - $v / $max * ($h - 5), 1);
    }
    $line = implode(' ', $pts);
    $area = '1,' . ($h - 1) . ' ' . $line . ' ' . round($w - 2, 1) . ',' . ($h - 1);
    [$lx, $ly] = explode(',', end($pts));
    return '<svg class="spark" viewBox="0 0 ' . $w . ' ' . $h . '" preserveAspectRatio="none" aria-hidden="true">'
        . '<polygon points="' . $area . '" style="fill:var(--series-1);opacity:.1"/>'
        . '<polyline points="' . $line . '" style="fill:none;stroke:var(--series-1);stroke-width:1.5;vector-effect:non-scaling-stroke;stroke-linejoin:round"/>'
        . '<circle cx="' . $lx . '" cy="' . $ly . '" r="2.4" style="fill:var(--series-1)"/></svg>';
}

function brand_mark(): string
{
    return '<svg class="brand-mark" viewBox="0 0 38 16" aria-hidden="true"><line x1="6" y1="8" x2="32" y2="8" style="stroke:var(--rule-2);stroke-width:1.5"/>'
        . '<g class="bd c-positive"><circle cx="6" cy="8" r="5.6"/></g><g class="bd c-hydrophobic"><circle cx="19" cy="8" r="5.6"/></g>'
        . '<g class="bd c-noncanonical"><circle cx="32" cy="8" r="5.6"/></g></svg>';
}

function residue_legend(bool $withD = true): string
{
    $d = read_json(ATLAS_DATA . '/residues.json');
    $o = '<div class="legend" aria-label="' . h(t('Residue colour key')) . '">';
    foreach ($d['classes'] ?? [] as $k => $c) {
        $o .= '<span class="key"><span class="sw" style="background:var(--r-' . h($k) . ')"></span>' . h(is_zh() ? ($c['zh'] ?? $c['label']) : $c['label']) . '</span>';
    }
    if ($withD) {
        $o .= '<span class="key"><span class="sw d"></span>' . h(t('D-amino acid (dashed ring)')) . '</span>';
        $o .= '<span class="key"><svg width="22" height="12" aria-hidden="true"><polyline points="2,2 7,10 12,2 17,10" style="fill:none;stroke:var(--r-noncanonical);stroke-width:1.6"/></svg>' . h(t('Lipid or albumin-binding tail')) . '</span>';
        $o .= '<span class="key"><svg width="24" height="12" aria-hidden="true"><path d="M3 11C3 1 21 1 21 11" style="fill:none;stroke:var(--r-cysteine);stroke-width:1.6"/></svg>' . h(t('Disulfide bridge')) . '</span>';
    }
    return $o . '</div>';
}

/** Common page header. $active is the nav key. */
function page_head(string $title, string $active = '', array $opt = []): void
{
    $desc = $opt['description'] ?? t('An illustrated atlas of therapeutic and research peptides: sequences, 3D structures, history of use and worldwide popularity.');
    $nav = ['index' => ['index.php', 'Atlas'], 'timeline' => ['timeline.php', 'Timeline'], 'world' => ['world.php', 'World'],
        'families' => ['families.php', 'Families'], 'structures' => ['structures.php', 'Structures'], 'compare' => ['compare.php', 'Compare'],
        'about' => ['about.php', 'About']];
    $site = t('Peptide Atlas');
    $fullTitle = $title === $site ? $site : $title . ' — ' . $site;
    $other = is_zh() ? 'en' : 'zh';
    echo '<!doctype html><html lang="' . h(LANGS[lang()]['html']) . '"><head><meta charset="utf-8">';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>' . h($fullTitle) . '</title><meta name="description" content="' . h($desc) . '">';
    foreach (LANGS as $code => $L) {
        echo '<link rel="alternate" hreflang="' . h($L['html']) . '" href="' . h(lang_url($code)) . '">';
    }
    echo '<link rel="icon" href="data:image/svg+xml,' . rawurlencode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 16"><line x1="6" y1="8" x2="32" y2="8" stroke="#c3c9cf" stroke-width="1.5"/><circle cx="6" cy="8" r="5.6" fill="#2a78d6"/><circle cx="19" cy="8" r="5.6" fill="#eda100"/><circle cx="32" cy="8" r="5.6" fill="#4a3aa7"/></svg>') . '">';
    echo '<link rel="stylesheet" href="' . h(asset('assets/fonts/fonts.css')) . '">';
    echo '<link rel="stylesheet" href="' . h(asset('assets/css/atlas.css')) . '">';
    echo '<meta property="og:title" content="' . h($fullTitle) . '"><meta property="og:description" content="' . h($desc) . '">';
    echo '<script>window.ATLAS_LANG=' . json_embed(lang()) . ';window.ATLAS_T=' . json_embed((object)js_dict()) . ';</script>';
    echo '<script src="' . h(asset('assets/js/atlas.js')) . '"></script>';
    foreach ($opt['scripts'] ?? [] as $s) {
        echo '<script src="' . h(asset($s)) . '" defer></script>';
    }
    echo '</head><body>';
    echo '<a class="visually-hidden" href="#main">' . h(t('Skip to content')) . '</a>';
    echo '<header class="site-head"><div class="wrap">';
    echo '<a class="brand" href="' . h(url('index.php')) . '">' . brand_mark() . '<span class="brand-name">' . h($site) . '</span></a>';
    echo '<nav class="site-nav" aria-label="' . h(t('Main')) . '">';
    foreach ($nav as $k => [$href, $label]) {
        echo '<a href="' . h(url($href)) . '"' . ($k === $active ? ' aria-current="page"' : '') . '>' . h(t($label)) . '</a>';
    }
    echo '</nav><div class="head-tools">';
    echo '<a class="home-link" href="../" title="' . h(t('All atlases')) . '">' . h(t('Learn')) . '</a>';
    echo '<a class="lang-switch" href="' . h(lang_url($other)) . '" hreflang="' . h(LANGS[$other]['html']) . '" lang="' . h(LANGS[$other]['html']) . '" title="' . h($other === 'zh' ? '切换到中文' : 'Switch to English') . '">' . h(LANGS[$other]['switch']) . '</a>';
    echo '<button class="theme-toggle" type="button" aria-label="' . h(t('Toggle dark theme')) . '">' . icon('moon') . '</button>';
    echo '</div></div></header><main id="main">';
}

function page_foot(): void
{
    $files = glob(ATLAS_CACHE . '/wiki/*.json') ?: [];
    $stamp = fmt_date(date('Y-m-d', $files ? max(array_map('filemtime', $files)) : time()));
    echo '</main><footer class="site-foot"><div class="wrap"><div>';
    echo '<p><b>' . h(t('Not medical advice.')) . '</b> ' . h(t('Peptide Atlas is an educational reference. Many peptides listed here are not approved for human use; grey-market products are often mislabelled or contaminated.')) . '</p>';
    echo '<p>' . h(t('Data from Wikipedia and Wikimedia pageview statistics, PubMed, ClinicalTrials.gov, RCSB PDB, PubChem and ESMFold. Text summaries from Wikipedia are under CC BY-SA 4.0. Data refreshed %s.', $stamp)) . '</p>';
    echo '</div><div><p><a href="' . h(url('about.php')) . '">' . h(t('Sources and method')) . '</a></p><p><a href="' . h(url('api.php')) . '">' . h(t('JSON API')) . '</a></p></div></div></footer>';
    echo '</body></html>';
}
