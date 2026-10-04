<?php
declare(strict_types=1);

const CATEGORIES = [
    'metabolic'    => ['label' => 'Metabolic & incretin',            'blurb' => 'Hormones and analogues acting on blood sugar, appetite and body weight.'],
    'hormone'      => ['label' => 'Classic hormones & peptide drugs', 'blurb' => 'Landmark peptide hormones and the medicines built on them.'],
    'gh'           => ['label' => 'Growth-hormone axis',              'blurb' => 'Secretagogues and GHRH analogues that raise growth hormone.'],
    'melanocortin' => ['label' => 'Melanocortin',                     'blurb' => 'α-MSH analogues acting on pigmentation, appetite and sexual function.'],
    'repair'       => ['label' => 'Tissue repair & immunity',         'blurb' => 'Healing, skin, antimicrobial and immune-modulating peptides.'],
    'longevity'    => ['label' => 'Mitochondrial & longevity',        'blurb' => 'Peptides studied for mitochondrial function and ageing.'],
    'neuro'        => ['label' => 'Neuro & sleep',                    'blurb' => 'Nootropic, anxiolytic and sleep-related peptides.'],
];

const STATUSES = [
    'approved' => ['label' => 'Approved',            'long' => 'Approved by the FDA and/or EMA'],
    'regional' => ['label' => 'Approved regionally', 'long' => 'Approved in some countries only'],
    'clinical' => ['label' => 'In clinical trials',  'long' => 'Investigational, not approved anywhere'],
    'research' => ['label' => 'Research only',       'long' => 'Not approved for human use'],
];

const EVIDENCE = [
    1 => 'Animal or cell studies only',
    2 => 'Small human studies, mostly animal data',
    3 => 'Phase 1–2 human trials',
    4 => 'Phase 3 trials or approval on limited data',
    5 => 'Approved, with large outcome trials',
];

const EVENT_KINDS = [
    'discovery'  => 'Discovery',
    'science'    => 'Science',
    'trial'      => 'Clinical trial',
    'approval'   => 'Approval',
    'regulatory' => 'Regulation',
    'market'     => 'Market',
    'culture'    => 'Culture',
    'safety'     => 'Safety',
];

const REG_STATUS = [
    'approved'        => 'Approved',
    'conditional'     => 'Conditional approval',
    'generic'         => 'Generics available',
    'not-approved'    => 'Not approved',
    'investigational' => 'Investigational',
    'restricted'      => 'Restricted',
    'withdrawn'       => 'Withdrawn',
    'prohibited'      => 'Prohibited in sport',
    'permitted'       => 'Not prohibited in sport',
];

/** Raw peptide records keyed by slug (no cache data), with the Chinese overlay applied when needed. */
function atlas_raw(): array
{
    static $all = [];
    $lang = lang();
    if (isset($all[$lang])) {
        return $all[$lang];
    }
    $out = [];
    foreach (glob(ATLAS_DATA . '/peptides/*.json') ?: [] as $f) {
        $d = read_json($f);
        if (!$d || empty($d['slug'])) {
            continue;
        }
        $d['name_en'] = $d['name'];
        if ($lang === 'zh') {
            $ov = read_json(ATLAS_DATA . '/i18n/zh/peptides/' . $d['slug'] . '.json');
            if ($ov) {
                $d = overlay($d, $ov);
            }
            if (!empty($d['developer'])) {
                $d['developer'] = zh_orgs($d['developer']);
            }
            foreach ($d['brands'] ?? [] as $i => $b) {
                if (!empty($b['company'])) {
                    $d['brands'][$i]['company'] = zh_orgs($b['company']);
                }
            }
        }
        $out[$d['slug']] = $d;
    }
    return $all[$lang] = $out;
}

function atlas_cache(string $source, string $key): ?array
{
    return read_json(ATLAS_CACHE . "/$source/$key.json");
}

/**
 * All peptides with computed metrics, cached in data/cache/compiled.json and
 * rebuilt whenever a record or a fetched cache file is newer.
 */
function atlas_all(): array
{
    static $memos = [];
    $memo = &$memos[lang()];
    if ($memo !== null) {
        return $memo;
    }
    $compiled = ATLAS_CACHE . '/compiled-' . lang() . '.json';
    $newest = 0;
    foreach (['/peptides/*.json', '/cache/wiki/*.json', '/cache/pubmed/*.json', '/cache/ctgov/*.json',
              '/cache/pubchem/*.json', '/cache/models/*.json', '/cache/pdb/*.json', '/residues.json',
              '/i18n/zh/peptides/*.json'] as $pat) {
        foreach (glob(ATLAS_DATA . $pat) ?: [] as $f) {
            $newest = max($newest, filemtime($f));
        }
    }
    $newest = max($newest, filemtime(__FILE__), filemtime(__DIR__ . '/seq.php'));
    if (is_file($compiled) && filemtime($compiled) >= $newest) {
        $memo = read_json($compiled);
        if ($memo) {
            return $memo;
        }
    }
    $out = [];
    foreach (atlas_raw() as $slug => $p) {
        $out[$slug] = atlas_enrich($p);
    }
    uasort($out, fn($a, $b) => [$a['year_sort'], $a['name']] <=> [$b['year_sort'], $b['name']]);
    $memo = $out;
    if (is_dir(ATLAS_CACHE) && is_writable(ATLAS_CACHE)) {
        write_json($compiled, $out);
    }
    return $out;
}

function atlas_get(string $slug): ?array
{
    $all = atlas_all();
    return $all[$slug] ?? null;
}

/** Add computed sequence properties and popularity metrics to a record. */
function atlas_enrich(array $p): array
{
    $slug = $p['slug'];
    $seq = $p['sequence'] ?? [];
    $p['len'] = 0;
    foreach ($seq['chains'] ?? [] as $c) {
        $p['len'] += count($c['residues'] ?? []);
    }
    $p['props'] = seq_properties($seq);

    // --- Wikipedia attention ------------------------------------------------
    $w = atlas_cache('wiki', $slug);
    $pop = null;
    if ($w && !empty($w['monthly_all'])) {
        $m = $w['monthly_all'];
        ksort($m);
        $keys = array_keys($m);
        $last = array_slice($m, -12, 12, true);
        // a previous year only exists with 24+ months of history; a shorter slice would overlap $last
        $prev = count($m) >= 24 ? array_slice($m, -24, 12, true) : [];
        $v12 = array_sum($last);
        $p12 = array_sum($prev);
        $peakKey = array_search(max($m), $m, true);
        $en12 = 0;
        if (!empty($w['langs']['en']['views'])) {
            $en = $w['langs']['en']['views'];
            ksort($en);
            $en12 = array_sum(array_slice($en, -12, 12, true));
        }
        $pop = [
            'views_12m'   => $v12,
            'views_prev'  => $p12,
            'yoy'         => $p12 > 0 ? ($v12 - $p12) / $p12 : null,
            'views_total' => array_sum($m),
            'en_share'    => $v12 > 0 ? $en12 / $v12 : null,
            'langs'       => count($w['langs'] ?? []),
            'peak_month'  => $peakKey,
            'first_month' => $keys[0] ?? null,
            'last_month'  => end($keys) ?: null,
            'spark'       => array_values(array_slice($m, -72, 72, true)),
            'spark_start' => array_keys(array_slice($m, -72, 72, true))[0] ?? null,
            'extract'     => $w['extract'] ?? null,
            'thumb'       => $w['thumb'] ?? null,
            'wiki_title'  => $w['title'] ?? ($p['wiki'] ?? null),
            'qid'         => $w['qid'] ?? null,
        ];
    }
    $p['pop'] = $pop;

    // --- PubMed ---------------------------------------------------------------
    $pm = atlas_cache('pubmed', $slug);
    $p['papers'] = $pm ? [
        'total' => $pm['total'] ?? null,
        'last5' => array_sum(array_intersect_key($pm['years'] ?? [], array_flip(range((int)date('Y') - 5, (int)date('Y') - 1)))),
        'first_year' => ($pm['years'] ?? []) ? (int)array_key_first(array_filter($pm['years'])) : null,
    ] : null;

    // --- ClinicalTrials.gov ------------------------------------------------------
    $ct = atlas_cache('ctgov', $slug);
    $p['trials'] = $ct ? [
        'total'      => $ct['total'] ?? 0,
        'phase3'     => ($ct['phase']['PHASE3'] ?? 0) + ($ct['phase']['PHASE2/PHASE3'] ?? 0),
        'recruiting' => ($ct['status']['RECRUITING'] ?? 0) + ($ct['status']['NOT_YET_RECRUITING'] ?? 0),
        'countries'  => count($ct['countries'] ?? []),
        'first_year' => $ct['first_year'] ?? null,
    ] : null;

    // --- Sort year: when the peptide entered human medicine -----------------------
    // A curated first_human_year wins. Otherwise use the first approval, and the earliest registered
    // interventional trial only for molecules discovered in the registry era (ClinicalTrials.gov opened
    // in 2000), because older drugs were tested in people long before their first registered trial.
    $fa = $p['first_approval']['date'] ?? null;
    $approvalYear = $fa ? (int)substr($fa, 0, 4) : null;
    if (!empty($p['first_human_year'])) {
        $p['year_human'] = $approvalYear ? min((int)$p['first_human_year'], $approvalYear) : (int)$p['first_human_year'];
    } else {
        $registry = ((int)($p['discovery']['year'] ?? 0) >= 1995) ? ($p['trials']['first_year'] ?? null) : null;
        // earliest trial or approval documented in the record's own history
        $documented = null;
        foreach ($p['history'] ?? [] as $e) {
            if (in_array($e['kind'] ?? '', ['trial', 'approval'], true)) {
                $documented = $documented === null ? (int)$e['year'] : min($documented, (int)$e['year']);
            }
        }
        $candidates = array_filter([$approvalYear, $registry, $documented]);
        $p['year_human'] = $candidates ? min($candidates) : null;
    }
    $p['year_sort'] = $p['year_human'] ?? ($p['discovery']['year'] ?? 9999);
    $p['approval_year'] = $fa ? (int)substr($fa, 0, 4) : null;

    // --- 3D: which structure the viewer opens first ---------------------------------
    $p['structure_default'] = structure_default($p);
    return $p;
}

/** First structure to show: an experimental entry if any, else a generated model. */
function structure_default(array $p): ?array
{
    foreach ($p['structure']['pdb'] ?? [] as $e) {
        $id = strtoupper($e['id']);
        if (is_file(ATLAS_STRUCT . "/$id.pdb") || is_file(ATLAS_STRUCT . "/$id.cif")) {
            return ['kind' => 'pdb', 'id' => $id];
        }
    }
    $m = atlas_cache('models', $p['slug']);
    if ($m && !empty($m['file'])) {
        return ['kind' => $m['kind'], 'id' => $m['file']];
    }
    return null;
}

/** Every history event across the atlas, plus general milestones, newest last. */
function atlas_events(): array
{
    $ev = [];
    foreach (atlas_all() as $p) {
        foreach ($p['history'] ?? [] as $e) {
            $e['slug'] = $p['slug'];
            $e['peptide'] = $p['name'];
            $e['peptide_en'] = $p['name_en'] ?? $p['name'];
            $e['category'] = $p['category'];
            $ev[] = $e;
        }
    }
    $milestones = read_json(ATLAS_DATA . '/milestones.json') ?? [];
    if ($zh = zh_data('milestones')) {
        $milestones = overlay($milestones, $zh);
    }
    foreach ($milestones as $e) {
        $e['slug'] = null;
        $e['peptide'] = null;
        $e['category'] = 'field';
        $ev[] = $e;
    }
    usort($ev, fn($a, $b) => [$a['year'], $a['date'] ?? ''] <=> [$b['year'], $b['date'] ?? '']);
    return $ev;
}

/** Month keys "YYYY-MM" from $from to $to inclusive. */
function month_range(string $from, string $to): array
{
    $out = [];
    [$y, $m] = array_map('intval', explode('-', $from));
    [$ty, $tm] = array_map('intval', explode('-', $to));
    while ($y < $ty || ($y === $ty && $m <= $tm)) {
        $out[] = sprintf('%04d-%02d', $y, $m);
        if (++$m > 12) { $m = 1; $y++; }
    }
    return $out;
}
