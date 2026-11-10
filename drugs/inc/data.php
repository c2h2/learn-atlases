<?php
declare(strict_types=1);

const AREAS = [
    'cardiovascular'             => 'Cardiovascular & lipids',
    'metabolic-endocrine'        => 'Metabolic & endocrine',
    'antibacterial'              => 'Antibacterials',
    'anti-infective-other'       => 'Antivirals, antifungals & antiparasitics',
    'oncology'                   => 'Oncology (small molecules & hormonal)',
    'immunology-biologics'       => 'Antibodies, cell therapies & immunology',
    'neurology-pain'             => 'Neurology & pain',
    'psychiatry-anaesthesia'     => 'Psychiatry, sleep & anaesthesia',
    'respiratory-gastro-urology' => 'Respiratory, allergy, gut & urology',
    'haematology-rare-other'     => 'Blood, transplant, rare disease, eye, skin & reproduction',
];

const MODALITIES = [
    'small-molecule' => 'Small molecule', 'peptide' => 'Peptide', 'protein' => 'Protein / enzyme',
    'antibody' => 'Monoclonal antibody', 'adc' => 'Antibody–drug conjugate', 'oligonucleotide' => 'Oligonucleotide',
    'gene-therapy' => 'Gene therapy', 'cell-therapy' => 'Cell therapy', 'vaccine' => 'Vaccine',
    'radioligand' => 'Radioligand', 'gas' => 'Gas', 'other' => 'Other',
];

const ORIGINS = ['natural' => 'Natural product', 'semi-synthetic' => 'Semi-synthetic', 'synthetic' => 'Synthetic',
                 'biotech' => 'Biotechnology', 'endogenous' => 'Endogenous substance'];

const ROUTE_FAMILY = [
    'oral' => 'oral', 'sublingual' => 'oral',
    'iv' => 'injected', 'im' => 'injected', 'sc' => 'injected', 'intrathecal' => 'injected', 'intravitreal' => 'injected',
    'inhaled' => 'inhaled', 'intranasal' => 'inhaled',
    'topical' => 'topical', 'transdermal' => 'topical', 'ophthalmic' => 'topical', 'vaginal' => 'topical', 'rectal' => 'topical',
];

/** Grouping criteria: key => [label, function(record): string[] group keys]. */
function group_criteria(): array
{
    $one = fn(?string $v) => [$v ?? '—'];
    return [
        'area'       => ['Therapeutic area', fn($d) => [AREAS[$d['area']] ?? $d['area']]],
        'route'      => ['Oral or injected', function ($d) {
            $f = array_values(array_unique(array_map(fn($r) => ROUTE_FAMILY[$r] ?? 'other', $d['routes'] ?? [])));
            if (!$f) return ['— not yet filled'];
            sort($f);
            return [ucfirst(implode(' + ', $f))];
        }],
        'routes'     => ['Each route', fn($d) => $d['routes'] ? array_map('strtoupper', $d['routes']) : ['— not yet filled']],
        'modality'   => ['Modality', fn($d) => [MODALITIES[$d['modality'] ?? ''] ?? '— not yet filled']],
        'class'      => ['Drug class', fn($d) => $one($d['drug_class'] ?? null)],
        'target'     => ['Molecular target', fn($d) => ($d['targets'] ?? []) ?: ['—']],
        'origin'     => ['Origin', fn($d) => [ORIGINS[$d['origin'] ?? ''] ?? '— not yet filled']],
        'owner'      => ['Owner (2026)', fn($d) => $one($d['owner'] ?? null)],
        'originator' => ['Originator', fn($d) => $one($d['originator'] ?? null)],
        'decade'     => ['Decade first approved', function ($d) {
            $y = $d['first_approval']['year'] ?? null;
            return [$y ? ($y < 1940 ? 'Before 1940' : (intdiv((int)$y, 10) * 10) . 's') : '— unknown'];
        }],
        'generic'    => ['Generic / biosimilar', fn($d) => [$d['generic'] === null ? '— unknown' : ($d['generic'] ? 'Generics available' : 'Brand only')]],
        'who'        => ['WHO essential medicine', fn($d) => [$d['who_essential'] === null ? '— unknown' : ($d['who_essential'] ? 'On WHO list' : 'Not on list')]],
        'stage'      => ['Writing stage', fn($d) => [ucfirst($d['stage'] ?? 'skeleton')]],
    ];
}

function drugs_all(): array
{
    static $all = null;
    if ($all !== null) return $all;
    $all = [];
    foreach (glob(DRUG_DATA . '/drugs/*.json') ?: [] as $f) {
        $d = json_decode((string)file_get_contents($f), true);
        if (is_array($d) && !empty($d['slug'])) $all[$d['slug']] = $d;
    }
    uasort($all, fn($a, $b) => strcasecmp($a['name'], $b['name']));
    return $all;
}

function h(?string $s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function route_badges(array $d): string
{
    $o = '';
    foreach (array_unique(array_map(fn($r) => ROUTE_FAMILY[$r] ?? 'other', $d['routes'] ?? [])) as $f) {
        $o .= '<span class="rt rt-' . h($f) . '">' . h($f) . '</span>';
    }
    return $o;
}

function page_head(string $title): void
{
    ?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= h($title) ?></title><link rel="stylesheet" href="assets/atlas.css?v=<?= @filemtime(DRUG_ROOT . '/assets/atlas.css') ?>"></head>
<body><header class="top"><div class="wrap"><a class="crumb" href="../">Learn /</a> <a class="brand" href="./">Drug Atlas</a>
<nav><a href="./">Groups</a> <a href="about.php">About</a></nav></div></header><main class="wrap"><?php
}

function page_foot(): void
{
    echo '</main><footer class="wrap foot">Encyclopedic reference, not medical advice. Data: regulator labels, PubMed, WHO EML.</footer></body></html>';
}
