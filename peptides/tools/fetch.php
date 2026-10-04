<?php
declare(strict_types=1);
/**
 * Peptide Atlas data fetcher (CLI only).
 *
 *   php tools/fetch.php wiki     [slug...]   Wikipedia summary, language links, monthly pageviews (all languages, incl. redirects)
 *   php tools/fetch.php editions             Monthly totals per Wikipedia edition (for the interest index)
 *   php tools/fetch.php wikizh   [slug...]   Chinese Wikipedia summaries (Simplified) where an article exists
 *   php tools/fetch.php pubmed   [slug...]   PubMed papers per publication year
 *   php tools/fetch.php ctgov    [slug...]   ClinicalTrials.gov studies: phases, status, start years, countries
 *   php tools/fetch.php pubchem  [slug...]   PubChem properties, 2D depiction, 3D conformer if any
 *   php tools/fetch.php pdb      [slug...]   RCSB metadata + coordinates for listed PDB entries
 *   php tools/fetch.php country              Aggregate per-country readership from data/raw/dpcountry/*.tsv.gz
 *   php tools/fetch.php all      [slug...]   Everything above
 * Add --force to refetch even when the cache is fresh (default max age: 7 days).
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}
require __DIR__ . '/../inc/bootstrap.php';

const UA = 'PeptideAtlas/1.0 (https://f.g77k.com/learn/peptides/; public research visualisation)';
const MAX_AGE = 7 * 86400;

$args = array_slice($argv, 1);
$force = in_array('--force', $args, true);
$args = array_values(array_filter($args, fn($a) => $a !== '--force'));
$source = $args[0] ?? 'help';
$peptides = atlas_raw();
$slugs = array_slice($args, 1) ?: array_keys($peptides);

function logln(string $s): void
{
    fwrite(STDERR, '[' . date('H:i:s') . "] $s\n");
}

function fresh(string $path): bool
{
    global $force;
    return !$force && is_file($path) && time() - filemtime($path) < MAX_AGE;
}

function curl_new(string $url, array $opt = [])
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => $opt['timeout'] ?? 90,
        CURLOPT_CONNECTTIMEOUT => 20,
        CURLOPT_USERAGENT      => UA,
        CURLOPT_ENCODING       => '',
        CURLOPT_HTTPHEADER     => $opt['headers'] ?? [],
    ]);
    if (isset($opt['post'])) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $opt['post']);
    }
    return $ch;
}

/** GET/POST with retries on 429/5xx/network errors. Returns [code, body]. */
function http(string $url, array $opt = []): array
{
    $code = 0;
    $body = '';
    for ($t = 0; $t < 5; $t++) {
        $ch = curl_new($url, $opt);
        $body = (string)curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);
        if ($code === 429 || $code >= 500 || $code === 0) {
            usleep((int)(1e6 * (2 ** $t)));
            continue;
        }
        break;
    }
    return [$code, $body];
}

function http_json(string $url, array $opt = []): ?array
{
    [$code, $body] = http($url, $opt);
    if ($code !== 200) {
        return null;
    }
    $d = json_decode($body, true);
    return is_array($d) ? $d : null;
}

/** Parallel GETs (key => url). Returns key => [code, body]. Retries 429/5xx. */
function http_multi(array $urls, int $conc = 8): array
{
    $out = [];
    $pending = $urls;
    $attempt = [];
    $mh = curl_multi_init();
    $running = [];
    $launch = function () use (&$pending, &$running, $mh, $conc) {
        while (count($running) < $conc && $pending) {
            $key = array_key_first($pending);
            $url = $pending[$key];
            unset($pending[$key]);
            $ch = curl_new($url);
            curl_multi_add_handle($mh, $ch);
            $running[spl_object_id($ch)] = [$key, $url, $ch];
        }
    };
    $launch();
    do {
        curl_multi_exec($mh, $active);
        curl_multi_select($mh, 1.0);
        while ($info = curl_multi_info_read($mh)) {
            $ch = $info['handle'];
            [$key, $url] = $running[spl_object_id($ch)];
            $code = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
            $body = (string)curl_multi_getcontent($ch);
            curl_multi_remove_handle($mh, $ch);
            curl_close($ch);
            unset($running[spl_object_id($ch)]);
            $attempt[$key] = ($attempt[$key] ?? 0) + 1;
            if (($code === 429 || $code >= 500 || $code === 0) && $attempt[$key] < 5) {
                usleep(400000 * $attempt[$key]);
                $pending[$key] = $url;
            } else {
                $out[$key] = [$code, $body];
            }
            $launch();
        }
    } while ($running || $pending);
    curl_multi_close($mh);
    return $out;
}

function last_month_end(): string
{
    return date('Ymd', strtotime('last day of last month')) . '00';
}

function wiki_domain(string $lang): string
{
    $map = ['be-x-old' => 'be-tarask', 'zh-min-nan' => 'zh-min-nan', 'simple' => 'simple'];
    return ($map[$lang] ?? $lang) . '.wikipedia.org';
}

/** Wikipedia action API query with continuation, merging list props of the first page. */
function wiki_query(string $domain, array $params): ?array
{
    $params += ['action' => 'query', 'format' => 'json', 'formatversion' => 2];
    $page = null;
    $meta = null;
    $cont = [];
    for ($i = 0; $i < 10; $i++) {
        $d = http_json("https://$domain/w/api.php?" . http_build_query($params + $cont));
        if (!$d || empty($d['query']['pages'][0])) {
            return $page ? ['page' => $page, 'meta' => $meta] : null;
        }
        $p = $d['query']['pages'][0];
        $meta = $meta ?? $d['query'];
        if ($page === null) {
            $page = $p;
        } else {
            foreach (['langlinks', 'redirects'] as $k) {
                if (!empty($p[$k])) {
                    $page[$k] = array_merge($page[$k] ?? [], $p[$k]);
                }
            }
        }
        if (empty($d['continue'])) {
            break;
        }
        $cont = $d['continue'];
    }
    return ['page' => $page, 'meta' => $meta];
}

// ---------------------------------------------------------------------------------------
function fetch_wiki(string $slug, array $p): void
{
    $path = ATLAS_CACHE . "/wiki/$slug.json";
    if (fresh($path) || empty($p['wiki'])) {
        return;
    }
    $q = wiki_query('en.wikipedia.org', [
        'titles' => $p['wiki'], 'redirects' => 1,
        'prop' => 'langlinks|redirects|pageprops|pageimages',
        'lllimit' => 'max', 'rdlimit' => 'max', 'rdnamespace' => 0,
        'ppprop' => 'wikibase_item', 'piprop' => 'thumbnail|original', 'pithumbsize' => 640,
    ]);
    if (!$q || !empty($q['page']['missing'])) {
        logln("wiki  $slug: title '{$p['wiki']}' not found");
        return;
    }
    $page = $q['page'];
    $title = $page['title'];
    $sum = http_json('https://en.wikipedia.org/api/rest_v1/page/summary/' . rawurlencode(str_replace(' ', '_', $title)));

    // titles to count per language: the article plus its redirects
    $titles = ['en' => array_merge([$title], array_column($page['redirects'] ?? [], 'title'))];
    $langTitle = ['en' => $title];
    foreach ($page['langlinks'] ?? [] as $ll) {
        $langTitle[$ll['lang']] = $ll['title'];
    }
    $rdUrls = [];
    foreach ($langTitle as $lang => $t) {
        if ($lang === 'en') {
            continue;
        }
        $rdUrls[$lang] = 'https://' . wiki_domain($lang) . '/w/api.php?' . http_build_query([
            'action' => 'query', 'format' => 'json', 'formatversion' => 2, 'redirects' => 1,
            'titles' => $t, 'prop' => 'redirects', 'rdlimit' => 'max', 'rdnamespace' => 0]);
    }
    foreach (http_multi($rdUrls, 8) as $lang => [$code, $body]) {
        $d = json_decode($body, true);
        $pg = $d['query']['pages'][0] ?? null;
        if ($code !== 200 || !$pg || !empty($pg['missing'])) {
            continue;
        }
        $langTitle[$lang] = $pg['title'];
        $rds = array_slice(array_column($pg['redirects'] ?? [], 'title'), 0, 25);
        $titles[$lang] = array_merge([$pg['title']], $rds);
    }

    $end = last_month_end();
    $pvUrls = [];
    foreach ($titles as $lang => $list) {
        foreach (array_unique($list) as $k => $t) {
            $proj = explode('.', wiki_domain($lang))[0] . '.wikipedia';
            $pvUrls["$lang\t$k"] = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/$proj/all-access/user/"
                . rawurlencode(str_replace(' ', '_', $t)) . "/monthly/2015070100/$end";
        }
    }
    $langs = [];
    foreach (http_multi($pvUrls, 10) as $key => [$code, $body]) {
        [$lang] = explode("\t", $key);
        if ($code !== 200) {
            continue;
        }
        $d = json_decode($body, true);
        foreach ($d['items'] ?? [] as $it) {
            $m = substr($it['timestamp'], 0, 4) . '-' . substr($it['timestamp'], 4, 2);
            $langs[$lang]['views'][$m] = ($langs[$lang]['views'][$m] ?? 0) + (int)$it['views'];
        }
    }
    $all = [];
    foreach ($langs as $lang => &$L) {
        ksort($L['views']);
        $L['title'] = $langTitle[$lang];
        $L['total'] = array_sum($L['views']);
        $L['titles_counted'] = count(array_unique($titles[$lang] ?? []));
        foreach ($L['views'] as $m => $v) {
            $all[$m] = ($all[$m] ?? 0) + $v;
        }
    }
    unset($L);
    ksort($all);
    uasort($langs, fn($a, $b) => $b['total'] <=> $a['total']);

    // lead image, stored locally so the page does not depend on upload.wikimedia.org
    $thumb = null;
    $src = $page['thumbnail']['source'] ?? ($sum['thumbnail']['source'] ?? null);
    if ($src) {
        [$code, $img] = http($src);
        if ($code === 200 && strlen($img) > 500) {
            $ext = strtolower(pathinfo(parse_url($src, PHP_URL_PATH), PATHINFO_EXTENSION)) ?: 'jpg';
            $ext = in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'], true) ? $ext : 'png';
            @mkdir(ATLAS_CACHE . '/img', 0775, true);
            file_put_contents(ATLAS_CACHE . "/img/wiki-$slug.$ext", $img);
            $thumb = "data/cache/img/wiki-$slug.$ext";
        }
    }
    write_json($path, [
        'fetched'     => date('c'),
        'title'       => $title,
        'url'         => 'https://en.wikipedia.org/wiki/' . rawurlencode(str_replace(' ', '_', $title)),
        'qid'         => $page['pageprops']['wikibase_item'] ?? null,
        'description' => $sum['description'] ?? null,
        'extract'     => $sum['extract'] ?? null,
        'thumb'       => $thumb,
        'thumb_src'   => $page['original']['source'] ?? $src,
        'redirects_en' => count($page['redirects'] ?? []),
        'langs'       => $langs,
        'monthly_all' => $all,
    ]);
    logln(sprintf('wiki  %-18s %d languages, %s views since 2015', $slug, count($langs), number_format(array_sum($all))));
}

function fetch_editions(): void
{
    $langs = [];
    foreach (glob(ATLAS_CACHE . '/wiki/*.json') as $f) {
        if (basename($f)[0] === '_') {
            continue;
        }
        foreach (array_keys(read_json($f)['langs'] ?? []) as $l) {
            $langs[$l] = true;
        }
    }
    $end = last_month_end();
    $urls = [];
    foreach (array_keys($langs) as $l) {
        $proj = explode('.', wiki_domain($l))[0] . '.wikipedia';
        $urls[$l] = "https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/$proj/all-access/user/monthly/2015070100/$end";
    }
    $out = [];
    foreach (http_multi($urls, 8) as $l => [$code, $body]) {
        $d = json_decode($body, true);
        foreach ($d['items'] ?? [] as $it) {
            $out[$l][substr($it['timestamp'], 0, 4) . '-' . substr($it['timestamp'], 4, 2)] = (int)$it['views'];
        }
    }
    ksort($out);
    write_json(ATLAS_CACHE . '/wiki/_editions.json', ['fetched' => date('c'), 'editions' => $out]);
    logln('editions: ' . count($out) . ' Wikipedia editions');
}

// ---------------------------------------------------------------------------------------
function fetch_pubmed(string $slug, array $p): void
{
    $path = ATLAS_CACHE . "/pubmed/$slug.json";
    $q = $p['queries']['pubmed'] ?? '';
    if (fresh($path) || $q === '') {
        return;
    }
    $base = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&rettype=count&tool=PeptideAtlas&term=' . rawurlencode($q);
    $total = http_json($base)['esearchresult']['count'] ?? null;
    $now = (int)date('Y');
    $counts = [];
    // PubMed's results page carries a "results by year" table: one request instead of one per year.
    [$code, $html] = http('https://pubmed.ncbi.nlm.nih.gov/?term=' . rawurlencode($q), ['timeout' => 90]);
    if ($code === 200 && preg_match('/<table id="timeline-table".*?<tbody>(.*?)<\/tbody>/s', $html, $m)
        && preg_match_all('/<td>\s*(\d{4})\s*<\/td>\s*<td>\s*([\d,]+)\s*<\/td>/', $m[1], $rows, PREG_SET_ORDER)) {
        foreach ($rows as $r) {
            if ((int)$r[1] <= $now) { // skip future-dated ahead-of-print records
                $counts[$r[1]] = (int)str_replace(',', '', $r[2]);
            }
        }
        $method = 'results-by-year';
    } else {
        $years = [(int)($p['discovery']['year'] ?? $now)];
        foreach ($p['history'] ?? [] as $e) {
            $years[] = (int)$e['year'];
        }
        for ($y = max(1946, min($years) - 2); $y <= $now; $y++) {
            usleep(360000);
            $d = http_json("$base&datetype=pdat&mindate=$y&maxdate=$y");
            $counts[(string)$y] = isset($d['esearchresult']['count']) ? (int)$d['esearchresult']['count'] : null;
        }
        $method = 'esearch-per-year';
    }
    if ($counts) {
        // fill gaps with zeros between the first and last year so charts show quiet years
        $ys = array_map('intval', array_keys($counts));
        for ($y = min($ys); $y <= max(max($ys), $now); $y++) {
            $counts[(string)$y] = $counts[(string)$y] ?? 0;
        }
        ksort($counts);
    }
    write_json($path, ['fetched' => date('c'), 'query' => $q, 'total' => $total !== null ? (int)$total : null,
        'years' => $counts, 'partial_year' => $now, 'method' => $method]);
    logln(sprintf('pubmed %-18s %s papers (%s, %s)', $slug, $total ?? '?', $counts ? array_key_first($counts) . '-' . array_key_last($counts) : 'none', $method));
    usleep(400000);
}

// ---------------------------------------------------------------------------------------
function fetch_ctgov(string $slug, array $p): void
{
    $path = ATLAS_CACHE . "/ctgov/$slug.json";
    $q = $p['queries']['ctgov'] ?? '';
    if (fresh($path)) {
        return;
    }
    $agg = ['fetched' => date('c'), 'query' => $q, 'total' => 0, 'status' => [], 'phase' => [], 'type' => [],
        'start_year' => [], 'countries' => [], 'conditions' => [], 'sponsors' => [], 'first_year' => null,
        'recent' => [], 'largest' => []];
    if ($q === '') {
        write_json($path, $agg);
        return;
    }
    $fields = 'NCTId,BriefTitle,OverallStatus,Phase,StartDate,LocationCountry,LeadSponsorName,Condition,EnrollmentCount,StudyType';
    $token = null;
    $studies = [];
    do {
        $url = 'https://clinicaltrials.gov/api/v2/studies?' . http_build_query(array_filter([
            'query.intr' => $q, 'fields' => $fields, 'pageSize' => 1000, 'countTotal' => 'true', 'pageToken' => $token]));
        $d = http_json($url, ['timeout' => 180]);
        if (!$d) {
            logln("ctgov $slug: request failed");
            return;
        }
        $exclude = $p['queries']['ctgov_exclude'] ?? [];
        foreach ($d['studies'] ?? [] as $s) {
            if (in_array($s['protocolSection']['identificationModule']['nctId'] ?? '', $exclude, true)) {
                continue; // records flagged in the peptide file as not genuine or not relevant
            }
            $studies[] = $s['protocolSection'] ?? [];
        }
        $token = $d['nextPageToken'] ?? null;
        usleep(300000);
    } while ($token);

    $cond = [];
    $spons = [];
    $firstTrial = null;
    foreach ($studies as $s) {
        $id = $s['identificationModule'] ?? [];
        $st = $s['statusModule'] ?? [];
        $de = $s['designModule'] ?? [];
        $status = $st['overallStatus'] ?? 'UNKNOWN';
        $phases = $de['phases'] ?? [];
        $phase = $phases ? implode('/', $phases) : (($de['studyType'] ?? '') === 'OBSERVATIONAL' ? 'OBSERVATIONAL' : 'NA');
        $start = $st['startDateStruct']['date'] ?? null;
        $year = $start ? (int)substr($start, 0, 4) : null;
        $agg['status'][$status] = ($agg['status'][$status] ?? 0) + 1;
        $agg['phase'][$phase] = ($agg['phase'][$phase] ?? 0) + 1;
        $type = $de['studyType'] ?? 'UNKNOWN';
        $agg['type'][$type] = ($agg['type'][$type] ?? 0) + 1;
        if ($year) {
            $agg['start_year'][$year] = ($agg['start_year'][$year] ?? 0) + 1;
        }
        $countries = array_unique(array_filter(array_column($s['contactsLocationsModule']['locations'] ?? [], 'country')));
        foreach ($countries as $c) {
            $agg['countries'][$c] = ($agg['countries'][$c] ?? 0) + 1;
        }
        foreach ($s['conditionsModule']['conditions'] ?? [] as $c) {
            $k = mb_strtolower(trim($c));
            $cond[$k] = ($cond[$k] ?? 0) + 1;
        }
        $sp = $s['sponsorCollaboratorsModule']['leadSponsor']['name'] ?? null;
        if ($sp) {
            $spons[$sp] = ($spons[$sp] ?? 0) + 1;
        }
        $row = ['nct' => $id['nctId'] ?? '', 'title' => $id['briefTitle'] ?? '', 'status' => $status, 'phase' => $phase,
            'start' => $start, 'sponsor' => $sp, 'enrollment' => $de['enrollmentInfo']['count'] ?? null,
            'countries' => count($countries)];
        if (str_contains($phase, 'PHASE3') || str_contains($phase, 'PHASE4')) {
            $agg['recent'][] = $row;
        }
        if (($de['studyType'] ?? '') === 'INTERVENTIONAL') {
            $agg['largest'][] = $row; // real-world database studies would otherwise dominate with millions of records
        }
        if (($de['studyType'] ?? '') === 'INTERVENTIONAL' && $start && (!$firstTrial || strcmp($start, $firstTrial['start']) < 0)) {
            $firstTrial = $row;
        }
    }
    $agg['total'] = count($studies);
    ksort($agg['start_year']);
    arsort($agg['countries']);
    arsort($cond);
    arsort($spons);
    // first *interventional* study: observational target-trial emulations carry retrospective start dates
    $agg['first_year'] = $firstTrial ? (int)substr($firstTrial['start'], 0, 4) : null;
    $agg['first_trial'] = $firstTrial;
    $agg['conditions'] = array_slice(array_map(null, array_keys($cond), array_values($cond)), 0, 15);
    $agg['sponsors'] = array_slice(array_map(null, array_keys($spons), array_values($spons)), 0, 12);
    usort($agg['recent'], fn($a, $b) => strcmp((string)$b['start'], (string)$a['start']));
    $agg['recent'] = array_slice($agg['recent'], 0, 10);
    usort($agg['largest'], fn($a, $b) => ($b['enrollment'] ?? 0) <=> ($a['enrollment'] ?? 0));
    $agg['largest'] = array_slice($agg['largest'], 0, 8);
    write_json($path, $agg);
    logln(sprintf('ctgov  %-18s %d studies in %d countries', $slug, $agg['total'], count($agg['countries'])));
}

// ---------------------------------------------------------------------------------------
function fetch_pubchem(string $slug, array $p): void
{
    $path = ATLAS_CACHE . "/pubchem/$slug.json";
    $cid = $p['ids']['pubchem_cid'] ?? ($p['structure']['pubchem_cid'] ?? null);
    if (fresh($path) || !$cid) {
        return;
    }
    $props = 'MolecularFormula,MolecularWeight,ExactMass,XLogP,TPSA,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,HeavyAtomCount,Complexity,Charge,IsomericSMILES,SMILES,InChIKey,Title';
    $d = http_json("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/$cid/property/$props/JSON");
    $pr = $d['PropertyTable']['Properties'][0] ?? null;
    if (!$pr) {
        logln("pubchem $slug: CID $cid not found");
        return;
    }
    usleep(250000);
    @mkdir(ATLAS_CACHE . '/img', 0775, true);
    [$code, $png] = http("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/$cid/PNG?image_size=large");
    $img = null;
    if ($code === 200 && strlen($png) > 1000) {
        file_put_contents(ATLAS_CACHE . "/img/pubchem-$cid.png", $png);
        $img = "data/cache/img/pubchem-$cid.png";
    }
    usleep(250000);
    [$code, $sdf] = http("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/$cid/SDF?record_type=3d");
    $conf = null;
    if ($code === 200 && str_contains($sdf, 'M  END')) {
        @mkdir(ATLAS_STRUCT, 0775, true);
        file_put_contents(ATLAS_STRUCT . "/pubchem-$cid.sdf", $sdf);
        $conf = "pubchem-$cid.sdf";
    }
    $pr['SMILES'] = $pr['IsomericSMILES'] ?? ($pr['SMILES'] ?? null);
    unset($pr['IsomericSMILES']);
    write_json($path, ['fetched' => date('c'), 'cid' => $cid, 'props' => $pr, 'image' => $img, 'conformer' => $conf]);
    logln(sprintf('pubchem %-17s CID %d %s%s', $slug, $cid, $pr['MolecularFormula'] ?? '', $conf ? ' (3D)' : ''));
    usleep(250000);
}

// ---------------------------------------------------------------------------------------
function fetch_pdb(array $ids): void
{
    $ids = array_values(array_unique(array_map('strtoupper', $ids)));
    $todo = array_values(array_filter($ids, fn($id) => !fresh(ATLAS_CACHE . "/pdb/$id.json")));
    foreach (array_chunk($todo, 25) as $chunk) {
        $q = 'query($ids:[String!]!){entries(entry_ids:$ids){rcsb_id struct{title} exptl{method}
            rcsb_entry_info{resolution_combined deposited_atom_count polymer_entity_count}
            rcsb_accession_info{initial_release_date}
            rcsb_primary_citation{title pdbx_database_id_DOI pdbx_database_id_PubMed journal_abbrev year rcsb_authors}
            polymer_entities{rcsb_polymer_entity{pdbx_description} entity_poly{pdbx_seq_one_letter_code_can rcsb_sample_sequence_length}
              rcsb_polymer_entity_container_identifiers{auth_asym_ids}}
            nonpolymer_entities{nonpolymer_comp{chem_comp{id name}}}}}';
        $d = http_json('https://data.rcsb.org/graphql', ['post' => json_encode(['query' => $q, 'variables' => ['ids' => $chunk]]),
            'headers' => ['Content-Type: application/json']]);
        foreach ($d['data']['entries'] ?? [] as $e) {
            $id = $e['rcsb_id'];
            $ents = [];
            foreach ($e['polymer_entities'] ?? [] as $pe) {
                $ents[] = ['description' => $pe['rcsb_polymer_entity']['pdbx_description'] ?? '',
                    'chains' => $pe['rcsb_polymer_entity_container_identifiers']['auth_asym_ids'] ?? [],
                    'length' => $pe['entity_poly']['rcsb_sample_sequence_length'] ?? null,
                    'sequence' => $pe['entity_poly']['pdbx_seq_one_letter_code_can'] ?? ''];
            }
            $res = $e['rcsb_entry_info']['resolution_combined'][0] ?? null;
            $cit = $e['rcsb_primary_citation'] ?? [];
            write_json(ATLAS_CACHE . "/pdb/$id.json", [
                'fetched' => date('c'), 'id' => $id, 'title' => $e['struct']['title'] ?? '',
                'method' => $e['exptl'][0]['method'] ?? '', 'resolution' => $res,
                'released' => substr($e['rcsb_accession_info']['initial_release_date'] ?? '', 0, 10),
                'atoms' => $e['rcsb_entry_info']['deposited_atom_count'] ?? null,
                'entities' => $ents,
                'ligands' => array_map(fn($n) => $n['nonpolymer_comp']['chem_comp'], $e['nonpolymer_entities'] ?? []),
                'citation' => $cit ? ['title' => $cit['title'] ?? '', 'journal' => $cit['journal_abbrev'] ?? '', 'year' => $cit['year'] ?? null,
                    'doi' => $cit['pdbx_database_id_DOI'] ?? null, 'pmid' => $cit['pdbx_database_id_PubMed'] ?? null,
                    'authors' => array_slice($cit['rcsb_authors'] ?? [], 0, 3)] : null,
            ]);
        }
    }
    @mkdir(ATLAS_STRUCT, 0775, true);
    @mkdir(ATLAS_CACHE . '/img', 0775, true);
    foreach ($ids as $id) {
        if (!is_file(ATLAS_STRUCT . "/$id.pdb") && !is_file(ATLAS_STRUCT . "/$id.cif")) {
            [$code, $txt] = http("https://files.rcsb.org/download/$id.pdb", ['timeout' => 180]);
            if ($code === 200 && str_contains($txt, 'ATOM')) {
                file_put_contents(ATLAS_STRUCT . "/$id.pdb", clean_pdb($txt));
            } else {
                [$code, $txt] = http("https://files.rcsb.org/download/$id.cif", ['timeout' => 180]);
                if ($code === 200) {
                    file_put_contents(ATLAS_STRUCT . "/$id.cif", $txt);
                } else {
                    logln("pdb $id: no coordinates ($code)");
                }
            }
        }
        $lc = strtolower($id);
        $img = ATLAS_CACHE . "/img/pdb-$id.jpeg";
        if (!is_file($img)) {
            [$code, $jpg] = http('https://cdn.rcsb.org/images/structures/' . substr($lc, 1, 2) . "/$lc/{$lc}_assembly-1.jpeg");
            if ($code !== 200) {
                [$code, $jpg] = http("https://cdn.rcsb.org/images/structures/{$lc}_assembly-1.jpeg");
            }
            if ($code === 200 && strlen($jpg) > 1000) {
                file_put_contents($img, $jpg);
            }
        }
        logln("pdb    $id " . (is_file(ATLAS_STRUCT . "/$id.pdb") ? 'pdb' : (is_file(ATLAS_STRUCT . "/$id.cif") ? 'cif' : 'missing')));
    }
}

/** Keep the first model, drop waters and hydrogens on big entries: smaller files, cleaner pictures. */
function clean_pdb(string $txt): string
{
    $out = [];
    $inModel = false;
    $models = 0;
    $lines = preg_split('/\R/', $txt);
    $atoms = 0;
    foreach ($lines as $l) {
        if (str_starts_with($l, 'ATOM') || str_starts_with($l, 'HETATM')) {
            $atoms++;
        }
    }
    $dropH = $atoms > 3000;
    foreach ($lines as $l) {
        $rec = substr($l, 0, 6);
        if ($rec === 'MODEL ') {
            $models++;
            if ($models > 1) {
                break;
            }
            continue;
        }
        if ($rec === 'ENDMDL') {
            continue;
        }
        if ($rec === 'ATOM  ' || $rec === 'HETATM') {
            $resn = trim(substr($l, 17, 3));
            if ($resn === 'HOH' || $resn === 'DOD') {
                continue;
            }
            $el = trim(substr($l, 76, 2));
            if ($dropH && ($el === 'H' || $el === 'D')) {
                continue;
            }
            $out[] = $l;
        } elseif (in_array(rtrim($rec), ['HEADER', 'TITLE', 'COMPND', 'SEQRES', 'HELIX', 'SHEET', 'SSBOND', 'LINK', 'CRYST1', 'TER', 'CONECT'], true)) {
            if (rtrim($rec) === 'CONECT' && $dropH) {
                continue;
            }
            $out[] = $l;
        }
    }
    $out[] = 'END';
    return implode("\n", $out) . "\n";
}

// ---------------------------------------------------------------------------------------
/** Chinese Wikipedia summary (Simplified variant) for peptides whose English article links to zh.wikipedia. */
function fetch_wikizh(string $slug): void
{
    $path = ATLAS_CACHE . "/wikizh/$slug.json";
    $w = atlas_cache('wiki', $slug);
    $title = $w['langs']['zh']['title'] ?? null;
    if (fresh($path) || !$title) {
        return;
    }
    $d = http_json('https://zh.wikipedia.org/api/rest_v1/page/summary/' . rawurlencode(str_replace(' ', '_', $title)),
        ['headers' => ['Accept-Language: zh-cn']]);
    if (!$d || empty($d['extract'])) {
        logln("wikizh $slug: no summary for $title");
        return;
    }
    $display = strip_tags((string)($d['titles']['display'] ?? $d['title'] ?? $title));
    write_json($path, [
        'fetched' => date('c'), 'title' => $display, 'description' => $d['description'] ?? null,
        'extract' => $d['extract'], 'url' => 'https://zh.wikipedia.org/zh-cn/' . rawurlencode(str_replace(' ', '_', $title)),
    ]);
    logln("wikizh $slug: $display");
    usleep(200000);
}

// ---------------------------------------------------------------------------------------
/** Sum differentially-private per-country pageviews for every language version (Wikidata item) of each peptide. */
function fetch_country(array $peptides): void
{
    $qid2slug = [];
    foreach ($peptides as $slug => $p) {
        $w = atlas_cache('wiki', $slug);
        if (!empty($w['qid'])) {
            $qid2slug[$w['qid']] = $slug;
        }
    }
    $files = glob(ATLAS_DATA . '/raw/dpcountry/*.tsv.gz') ?: [];
    sort($files);
    if (!$files) {
        logln('country: no files in data/raw/dpcountry (run tools/dp_download.sh)');
        return;
    }
    // Rolling 28-day window ending on the newest file, and the same window one year earlier.
    $newest = substr(basename(end($files)), 0, 10);
    $ranges = [
        'current'  => [date('Y-m-d', strtotime("$newest -27 days")), $newest],
        'previous' => [date('Y-m-d', strtotime("$newest -1 year -27 days")), date('Y-m-d', strtotime("$newest -1 year"))],
    ];
    $agg = [];
    $days = [];
    $names = [];
    foreach ($files as $f) {
        $day = substr(basename($f), 0, 10);
        $win = null;
        foreach ($ranges as $k => [$from, $to]) {
            if ($day >= $from && $day <= $to) {
                $win = $k;
            }
        }
        if (!$win) {
            continue;
        }
        $fh = gzopen($f, 'r');
        if (!$fh) {
            continue;
        }
        while (($line = gzgets($fh)) !== false) {
            $c = explode("\t", rtrim($line, "\n"));
            if (count($c) < 7 || !isset($qid2slug[$c[5]]) || !str_ends_with($c[2], '.wikipedia')) {
                continue;
            }
            $slug = $qid2slug[$c[5]];
            $agg[$slug][$win][$c[1]] = ($agg[$slug][$win][$c[1]] ?? 0) + (int)$c[6];
            $names[$c[1]] = $c[0];
        }
        gzclose($fh);
        $days[$win][] = $day;
    }
    foreach ($peptides as $slug => $p) {
        $wins = [];
        foreach ($days as $win => $dlist) {
            $rows = $agg[$slug][$win] ?? [];
            arsort($rows);
            $wins[$win] = ['days' => count($dlist), 'from' => min($dlist), 'to' => max($dlist), 'countries' => $rows];
        }
        write_json(ATLAS_CACHE . "/country/$slug.json", ['fetched' => date('c'), 'windows' => $wins]);
    }
    write_json(ATLAS_CACHE . '/country/_names.json', $names);
    logln('country: ' . array_sum(array_map('count', $days)) . ' days (' . implode(', ', array_map(fn($k) => "$k " . count($days[$k]), array_keys($days))) . '), ' . count($agg) . ' peptides with country rows');
}

// ---------------------------------------------------------------------------------------
$run = function (string $what) use ($slugs, $peptides) {
    switch ($what) {
        case 'wiki':
            foreach ($slugs as $s) {
                if (isset($peptides[$s])) {
                    fetch_wiki($s, $peptides[$s]);
                }
            }
            break;
        case 'editions':
            fetch_editions();
            break;
        case 'wikizh':
            foreach ($slugs as $s) {
                if (isset($peptides[$s])) {
                    fetch_wikizh($s);
                }
            }
            break;
        case 'pubmed':
            foreach ($slugs as $s) {
                if (isset($peptides[$s])) {
                    fetch_pubmed($s, $peptides[$s]);
                }
            }
            break;
        case 'ctgov':
            foreach ($slugs as $s) {
                if (isset($peptides[$s])) {
                    fetch_ctgov($s, $peptides[$s]);
                }
            }
            break;
        case 'pubchem':
            foreach ($slugs as $s) {
                if (isset($peptides[$s])) {
                    fetch_pubchem($s, $peptides[$s]);
                }
            }
            break;
        case 'pdb':
            $ids = [];
            foreach ($slugs as $s) {
                foreach ($peptides[$s]['structure']['pdb'] ?? [] as $e) {
                    $ids[] = $e['id'];
                }
            }
            fetch_pdb($ids);
            break;
        case 'country':
            fetch_country($peptides);
            break;
        default:
            fwrite(STDERR, "unknown source '$what'\n");
    }
};

if ($source === 'all') {
    foreach (['wiki', 'wikizh', 'editions', 'ctgov', 'pubchem', 'pdb', 'pubmed', 'country'] as $s) {
        $run($s);
    }
} elseif ($source === 'help') {
    echo preg_replace('/^.*?\/\*\*|\*\/.*$/s', '', file_get_contents(__FILE__, false, null, 0, 1400)), "\n";
} else {
    $run($source);
}
