<?php
declare(strict_types=1);
// Read-only JSON API.
//   api.php                       index of all peptides
//   api.php?p=semaglutide         one peptide (curated record + computed metrics)
//   api.php?p=semaglutide&include=wiki,pubmed,ctgov,country,pubchem   add fetched datasets
//   api.php?events                every dated event in the atlas
require __DIR__ . '/inc/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=3600');

$out = null;
$all = atlas_all();
$base = (isset($_SERVER['HTTP_HOST']) ? 'https://' . $_SERVER['HTTP_HOST'] : '') . rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), '/') . '/';

if (isset($_GET['events'])) {
    $out = ['events' => atlas_events()];
} elseif (isset($_GET['p'])) {
    $slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string)$_GET['p']));
    $p = $all[$slug] ?? null;
    if (!$p) {
        http_response_code(404);
        $out = ['error' => 'Unknown peptide. Call api.php for the list of slugs.'];
    } else {
        unset($p['pop']['spark']);
        $p['page'] = $base . 'peptide.php?p=' . $slug;
        $inc = array_intersect(explode(',', (string)($_GET['include'] ?? '')), ['wiki', 'pubmed', 'ctgov', 'country', 'pubchem', 'models']);
        foreach ($inc as $src) {
            $p['datasets'][$src] = atlas_cache($src, $slug);
        }
        $out = $p;
    }
} else {
    $list = [];
    foreach ($all as $slug => $p) {
        $list[] = [
            'slug' => $slug, 'name' => $p['name'], 'category' => $p['category'], 'status' => $p['status'],
            'drug_class' => $p['drug_class'] ?? null, 'length' => $p['len'], 'mw' => $p['mw'] ?? null,
            'first_human_year' => $p['year_human'], 'first_approval' => $p['first_approval']['date'] ?? null,
            'evidence' => $p['evidence'], 'wikipedia_views_12m' => $p['pop']['views_12m'] ?? null,
            'pubmed_papers' => $p['papers']['total'] ?? null, 'registered_trials' => $p['trials']['total'] ?? null,
            'url' => $base . 'api.php?p=' . $slug, 'page' => $base . 'peptide.php?p=' . $slug,
        ];
    }
    $out = ['count' => count($list), 'categories' => CATEGORIES, 'statuses' => STATUSES, 'peptides' => $list];
}
echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
