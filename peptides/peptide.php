<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$slug = preg_replace('/[^a-z0-9-]/', '', strtolower((string)($_GET['p'] ?? '')));
$p = $slug !== '' ? atlas_get($slug) : null;
if (!$p) {
    http_response_code(404);
    page_head(t('Not found'), '');
    echo '<div class="wrap" style="padding:64px 0"><h1 class="page-title">' . h(t('No such peptide')) . '</h1><p class="lede" style="margin-top:14px">'
        . h(t('That address does not match any peptide in the atlas.')) . ' <a href="' . h(url('index.php')) . '">' . h(t('Browse all peptides')) . '</a>.</p></div>';
    page_foot();
    exit;
}
$all = atlas_all();
$seq = $p['sequence'] ?? [];
$wiki = atlas_cache('wiki', $slug);
$wikiZh = is_zh() ? atlas_cache('wikizh', $slug) : null;
$pubmed = atlas_cache('pubmed', $slug);
$ct = atlas_cache('ctgov', $slug);
$pc = atlas_cache('pubchem', $slug);
$country = atlas_cache('country', $slug);
$editions = read_json(ATLAS_CACHE . '/wiki/_editions.json')['editions'] ?? [];
$sep = is_zh() ? '、' : ', ';

// ---------- 3D structures offered to the viewer ----------
$methodNames = ['X-RAY DIFFRACTION' => 'X-ray', 'ELECTRON MICROSCOPY' => 'Cryo-EM', 'SOLUTION NMR' => 'NMR', 'SOLID-STATE NMR' => 'Solid-state NMR',
    'X-ray' => 'X-ray', 'Cryo-EM' => 'Cryo-EM', 'NMR' => 'NMR'];
$structs = [];
foreach ($p['structure']['pdb'] ?? [] as $e) {
    $id = strtoupper($e['id']);
    $file = is_file(ATLAS_STRUCT . "/$id.pdb") ? "$id.pdb" : (is_file(ATLAS_STRUCT . "/$id.cif") ? "$id.cif" : null);
    if (!$file) {
        continue;
    }
    $meta = atlas_cache('pdb', $id) ?? [];
    $method = $meta['method'] ?? ($e['method'] ?? '');
    $method = t($methodNames[$method] ?? $method);
    $res = $meta['resolution'] ?? ($e['resolution'] ?? null);
    $year = isset($meta['released']) && $meta['released'] ? substr($meta['released'], 0, 4) : ($e['year'] ?? '');
    $bits = array_filter([$method, $res ? round((float)$res, 2) . ' Å' : null, $year]);
    $structs[] = [
        'label' => $id . paren(implode(is_zh() ? '，' : ', ', $bits)),
        'title' => $meta['title'] ?? ($e['title'] ?? $id),
        'meta' => 'PDB ' . $id . ($bits ? (is_zh() ? '，' : ', ') . implode(is_zh() ? '，' : ', ', $bits) : ''),
        'note' => $e['note'] ?? '',
        'url' => 'structure.php?f=' . rawurlencode($file),
        'format' => str_ends_with($file, '.cif') ? 'cif' : 'pdb',
        'chain' => $e['peptide_chain'] ?? '',
        'link' => 'https://www.rcsb.org/structure/' . $id,
        'linkText' => t('View %s at RCSB PDB', $id),
    ];
}
$model = atlas_cache('models', $slug);
if ($model && !empty($model['file']) && is_file(ATLAS_STRUCT . '/' . $model['file'])) {
    $isSdf = str_ends_with($model['file'], '.sdf');
    $method = $model['method'] ?? 'ESMFold';
    $structs[] = [
        'label' => $isSdf ? t('3D conformer (computed)') : t('Predicted model (%s)', $method),
        'title' => $isSdf ? t('Computed 3D conformer') : t('Predicted structure (%s)', $method),
        'meta' => $isSdf ? t('Computed from the PubChem structure (CID %s)', (string)($p['ids']['pubchem_cid'] ?? '')) : (isset($model['plddt_mean']) ? t('Predicted by ESMFold (Meta AI), mean pLDDT %d', (int)round((float)$model['plddt_mean'])) : t('Predicted by ESMFold (Meta AI)')),
        'note' => $isSdf ? t('One low-energy conformer of the exact molecule, including D-residues, caps and rings. Short peptides are flexible, so treat it as one of many possible shapes.')
            : t('ESMFold prediction of the natural-amino-acid version of the chain. Non-natural residues are modelled as their natural parent and fatty-acid groups are omitted. Low confidence usually means the peptide is disordered on its own.'),
        'url' => 'structure.php?f=' . rawurlencode($model['file']),
        'format' => $isSdf ? 'sdf' : 'pdb',
        'chain' => $isSdf ? '' : ($model['chain'] ?? 'A'),
        'plddt' => !$isSdf && ($model['kind'] ?? '') === 'model',
    ];
    if (!is_zh()) {
        // English keeps the more specific note written by the model builder (it names the substitutions)
        $structs[count($structs) - 1]['note'] = $model['note'] ?? $structs[count($structs) - 1]['note'];
        $structs[count($structs) - 1]['meta'] = $model['meta'] ?? $structs[count($structs) - 1]['meta'];
    }
}
if (!empty($pc['conformer']) && is_file(ATLAS_STRUCT . '/' . $pc['conformer'])) {
    $structs[] = [
        'label' => t('PubChem 3D conformer'), 'title' => t('PubChem 3D conformer (CID %s)', (string)$pc['cid']),
        'meta' => t('Computed by PubChem'), 'note' => t('A single low-energy conformer computed from the 2D structure; peptides are flexible in solution.'),
        'url' => 'structure.php?f=' . rawurlencode($pc['conformer']), 'format' => 'sdf', 'chain' => '',
        'link' => 'https://pubchem.ncbi.nlm.nih.gov/compound/' . $pc['cid'], 'linkText' => t('Open in PubChem'),
    ];
}
$viewerChains = [];
foreach ($seq['chains'] ?? [] as $c) {
    $viewerChains[] = [
        'letters' => chain_letters($c),
        'classes' => array_map(fn($x) => residue_info($x)['class'], $c['residues'] ?? []),
    ];
}

// ---------- popularity ----------
$monthly = [];
foreach ($wiki['monthly_all'] ?? [] as $k => $v) {
    $monthly[] = [$k, $v];
}
$langRows = [];
if ($wiki) {
    foreach ($wiki['langs'] ?? [] as $code => $L) {
        $v = $L['views'] ?? [];
        ksort($v);
        $v12 = array_sum(array_slice($v, -12, 12, true));
        $ed = 0;
        foreach (array_slice(array_keys($v), -12) as $k) {
            $ed += $editions[$code][$k] ?? 0;
        }
        $langRows[] = ['code' => $code, 'name' => lang_name($code), 'title' => $L['title'] ?? '', 'v12' => $v12,
            'index' => $ed > 0 ? $v12 / $ed * 1e6 : null, 'edition' => $ed];
    }
    usort($langRows, fn($a, $b) => $b['v12'] <=> $a['v12']);
}
$pop = $p['pop'];
$countryNames = country_names();
$readers = [];
$readersPrev = [];
$win = $country['windows']['current'] ?? null;
if ($win) {
    foreach ($win['countries'] as $a2 => $v) {
        $n = numeric_from_a2($a2);
        if ($n) $readers[$n] = $v;
    }
    foreach ($country['windows']['previous']['countries'] ?? [] as $a2 => $v) {
        $n = numeric_from_a2($a2);
        if ($n) $readersPrev[$n] = $v;
    }
}
$trialMap = [];
foreach ($ct['countries'] ?? [] as $name => $n) {
    $num = country_numeric($name);
    if ($num) $trialMap[$num] = ($trialMap[$num] ?? 0) + $n;
}
$pmYears = [];
foreach ($pubmed['years'] ?? [] as $y => $n) {
    $pmYears[] = ['x' => (int)$y, 'y' => (int)$n, 'partial' => (int)$y === (int)($pubmed['partial_year'] ?? 0)];
}
while ($pmYears && $pmYears[0]['y'] === 0) array_shift($pmYears);
$trialYears = [];
if (!empty($ct['start_year'])) {
    $ys = array_keys($ct['start_year']);
    for ($y = (int)min($ys); $y <= (int)max($ys); $y++) {
        $trialYears[] = ['x' => $y, 'y' => (int)($ct['start_year'][$y] ?? 0), 'partial' => $y >= (int)date('Y'), 'future' => $y > (int)date('Y')];
    }
}
$phaseOrder = ['EARLY_PHASE1' => 'Early phase 1', 'PHASE1' => 'Phase 1', 'PHASE1/PHASE2' => 'Phase 1/2', 'PHASE2' => 'Phase 2',
    'PHASE2/PHASE3' => 'Phase 2/3', 'PHASE3' => 'Phase 3', 'PHASE4' => 'Phase 4', 'NA' => 'Not applicable', 'OBSERVATIONAL' => 'Observational'];
$statusNames = ['RECRUITING' => 'Recruiting', 'NOT_YET_RECRUITING' => 'Not yet recruiting', 'ACTIVE_NOT_RECRUITING' => 'Active, not recruiting',
    'COMPLETED' => 'Completed', 'TERMINATED' => 'Terminated', 'WITHDRAWN' => 'Withdrawn', 'SUSPENDED' => 'Suspended',
    'ENROLLING_BY_INVITATION' => 'Enrolling by invitation', 'UNKNOWN' => 'Unknown status', 'AVAILABLE' => 'Expanded access',
    'NO_LONGER_AVAILABLE' => 'No longer available', 'APPROVED_FOR_MARKETING' => 'Approved for marketing', 'TEMPORARILY_NOT_AVAILABLE' => 'Temporarily unavailable', 'WITHHELD' => 'Withheld'];
$phaseLabel = fn(string $k) => t($phaseOrder[$k] ?? str_replace(['PHASE', '/'], ['Phase ', ', '], $k));
$statusLabel = fn(string $k) => t($statusNames[$k] ?? ucfirst(strtolower(str_replace('_', ' ', $k))));

// ---------- chemistry ----------
$props = $p['props'];
$hydroSeries = [];
foreach (hydropathy_profile($seq) as $i => $v) {
    $hydroSeries[] = [$i + 1 + (int)($seq['numbering_offset'] ?? 0), $v];
}
$helical = $p['len'] >= 11;

// ---------- page ----------
$brandNames = array_column($p['brands'] ?? [], 'name');
$alt = alt_name($p);
page_head($p['name'] . ($alt ? ' ' . $alt : ''), '', [
    'description' => $p['tagline'] ?? ($p['summary'] ?? ''),
    'scripts' => ['assets/vendor/d3.min.js', 'assets/vendor/topojson.min.js', 'assets/js/charts.js', 'assets/vendor/3Dmol-min.js', 'assets/js/viewer.js'],
]);
$fa = $p['first_approval'] ?? null;
$chainBits = [t('%d residues', (int)$p['len'])];
if (count($seq['chains'] ?? []) > 1) $chainBits[] = t('in %d chains', count($seq['chains']));
if ($props['noncanonical']) $chainBits[] = t('%d non-canonical', $props['noncanonical']);
if ($props['d_residues']) $chainBits[] = $props['d_residues'] > 1 ? t('%d D-amino acids', $props['d_residues']) : t('1 D-amino acid');
if (!empty($seq['cyclic'])) $chainBits[] = t('cyclic');
?>
<div class="wrap">
  <nav class="crumbs" aria-label="<?= h(t('Breadcrumb')) ?>"><a href="<?= h(url('index.php')) ?>"><?= h(t('Atlas')) ?></a> / <a href="<?= h(url('index.php', ['cat' => $p['category']])) ?>"><?= h(cat_label($p['category'])) ?></a></nav>

  <header class="hero">
    <div>
      <h1 class="page-title"><?= h($p['name']) ?></h1>
      <?php if ($alt): ?><span class="alt-name" lang="en"><?= h($alt) ?></span><?php endif; ?>
      <p class="tagline"><?= h($p['tagline'] ?? '') ?></p>
      <?php if ($brandNames || !empty($p['aliases'])): ?>
        <p class="aka">
          <?php if ($brandNames): ?><?= h(t('Sold as %s.', implode(list_sep(), $brandNames))) ?><?php endif; ?>
          <?php if (!empty($p['aliases'])): ?> <?= h(t('Also known as %s.', implode(list_sep(), $p['aliases']))) ?><?php endif; ?>
        </p>
      <?php endif; ?>
    </div>
    <div class="hero-side">
      <?= status_badge($p['status']) ?>
      <?= evidence_meter((int)$p['evidence']) ?>
    </div>
  </header>

  <section class="chain-stage" aria-label="<?= h(t('Residue chain')) ?>">
    <div class="chain-scroll"><?= bead_svg($p, ['unit' => 26, 'letters' => true, 'annotate' => true, 'interactive' => true, 'id' => 'chain-main', 'class' => 'interactive']) ?></div>
    <div class="notation"><?= h(seq_notation($seq)) ?></div>
    <?php if (!empty($seq['note'])): ?><p class="chain-note"><?= h($seq['note']) ?></p><?php endif; ?>
    <?= residue_legend() ?>
    <p class="chain-note"><?= h($structs ? t('Hover a residue for its name and modifications; it lights up in the 3D view below. Click to zoom to it.') : t('Hover a residue for its name and modifications.')) ?></p>
  </section>

  <section class="block" style="padding-top:36px" aria-label="<?= h(t('Structure and key facts')) ?>">
    <div class="struct-layout">
      <div class="viewer" id="viewer">
        <div class="viewer-canvas"><div class="viewer-msg"><?= h($structs ? t('Loading 3D structure…') : t('No 3D structure is available yet.')) ?></div></div>
        <div class="viewer-bar"></div>
        <div class="viewer-cap"></div>
      </div>
      <div>
        <h2 class="section" style="margin-bottom:10px"><?= h(t('Key facts')) ?></h2>
        <dl class="facts">
          <div><dt><?= h(t('Class')) ?></dt><dd><?= h($p['drug_class'] ?? '') ?><?= !empty($p['subclass']) ? '<br><span class="muted">' . h($p['subclass']) . '</span>' : '' ?></dd></div>
          <?php if (!empty($p['targets'])): ?>
            <div><dt><?= h(t('Targets')) ?></dt><dd><?php foreach ($p['targets'] as $tg): ?><div><?= h($tg['name']) ?><?= !empty($tg['gene']) ? ' <span class="muted">' . h(paren($tg['gene'])) . '</span>' : '' ?><?= !empty($tg['action']) ? ' — ' . h($tg['action']) : '' ?></div><?php endforeach; ?></dd></div>
          <?php endif; ?>
          <div><dt><?= h(t('Chain')) ?></dt><dd><?= h(implode(is_zh() ? '，' : ', ', $chainBits)) ?></dd></div>
          <?php if (!empty($p['mw'])): ?><div><dt><?= h(t('Molecular weight')) ?></dt><dd class="num"><?= h(number_format((float)$p['mw'], 2)) ?> g/mol</dd></div><?php endif; ?>
          <?php if (!empty($p['formula'])): ?><div><dt><?= h(t('Formula')) ?></dt><dd><?= preg_replace('/(\d+)/', '<sub>$1</sub>', h($p['formula'])) ?></dd></div><?php endif; ?>
          <?php if (!empty($p['half_life'])): ?><div><dt><?= h(t('Half-life')) ?></dt><dd><?= h($p['half_life']) ?></dd></div><?php endif; ?>
          <?php if (!empty($p['routes'])): ?><div><dt><?= h(t('Routes')) ?></dt><dd><?= h(implode(is_zh() ? '；' : '; ', $p['routes'])) ?></dd></div><?php endif; ?>
          <div><dt><?= h(t('Origin')) ?></dt><dd><?= h($p['origin'] ?? '') ?></dd></div>
          <?php if (!empty($p['discovery'])): ?><div><dt><?= h(t('Discovered')) ?></dt><dd><?= h((string)($p['discovery']['year'] ?? '')) ?><?= !empty($p['discovery']['by']) ? (is_zh() ? '，' : ', ') . h($p['discovery']['by']) : '' ?><?= !empty($p['discovery']['where']) ? ' <span class="muted">' . h(paren($p['discovery']['where'])) . '</span>' : '' ?></dd></div><?php endif; ?>
          <?php if (!empty($p['developer'])): ?><div><dt><?= h(t('Developer')) ?></dt><dd><?= h($p['developer']) ?></dd></div><?php endif; ?>
          <div><dt><?= h(t('First approval')) ?></dt><dd><?= $fa ? h(fmt_date($fa['date'])) . (is_zh() ? '，' : ', ') . h($fa['agency'] ?? '') . (!empty($fa['brand']) ? h(paren($fa['brand'])) : '') . (!empty($fa['indication']) ? '<br><span class="muted">' . h($fa['indication']) . '</span>' : '') : '<span class="muted">' . h(t('Not approved')) . '</span>' ?></dd></div>
          <div><dt><?= h(t('Status')) ?></dt><dd><?= h($p['status_note'] ?? '') ?></dd></div>
        </dl>
      </div>
    </div>
  </section>

  <nav class="localnav" aria-label="<?= h(t('On this page')) ?>">
    <ul>
      <?php foreach (['overview' => 'Overview', 'history' => 'History', 'uses' => 'Uses', 'popularity' => 'Popularity', 'research' => 'Research & trials',
          'chemistry' => 'Chemistry', 'safety' => 'Safety', 'regulation' => 'Regulation', 'sources' => 'Sources'] as $id => $label): ?>
        <li><a href="#<?= $id ?>"><?= h(t($label)) ?></a></li>
      <?php endforeach; ?>
    </ul>
  </nav>

  <section class="block" id="overview">
    <div class="grid-2" style="grid-template-columns:minmax(0,1.4fr) minmax(0,1fr)">
      <div class="prose">
        <h2 class="section" style="margin-bottom:14px"><?= h(t('Overview')) ?></h2>
        <p style="font-size:1.08rem"><?= h($p['summary'] ?? '') ?></p>
        <?php foreach ($p['overview'] ?? [] as $para): ?><p><?= h($para) ?></p><?php endforeach; ?>
        <h3 class="sub" style="margin:22px 0 8px"><?= h(t('How it works')) ?></h3>
        <?php foreach ($p['mechanism'] ?? [] as $para): ?><p><?= h($para) ?></p><?php endforeach; ?>
      </div>
      <aside>
        <?php $wk = ($wikiZh && !empty($wikiZh['extract'])) ? $wikiZh : $wiki; $wkIsZh = $wk === $wikiZh && $wikiZh; ?>
        <?php if ($wk && !empty($wk['extract'])): ?>
          <h3 class="sub" style="margin-bottom:10px"><?= h(is_zh() && !$wkIsZh ? t('From Wikipedia (English)') : t('From Wikipedia')) ?></h3>
          <div class="wiki-card">
            <?php if (!empty($wiki['thumb']) && is_file(ATLAS_ROOT . '/' . $wiki['thumb'])): ?><img src="<?= h($wiki['thumb']) ?>" alt="<?= h(t('Illustration from the Wikipedia article %s', $wk['title'])) ?>" loading="lazy"><?php endif; ?>
            <div>
              <blockquote<?= $wkIsZh ? ' lang="zh-CN"' : ' lang="en"' ?>><?= h(mb_strimwidth($wk['extract'], 0, $wkIsZh ? 400 : 620, '…')) ?></blockquote>
              <p class="small" style="margin-top:8px"><a href="<?= h($wk['url']) ?>" target="_blank" rel="noopener"><?= h(t('Read “%s” on Wikipedia', $wk['title'])) ?></a> <span class="muted">(CC BY-SA 4.0)</span></p>
            </div>
          </div>
        <?php elseif (!empty($p['wiki'])): ?>
          <p><a href="https://en.wikipedia.org/wiki/<?= h(rawurlencode(str_replace(' ', '_', $p['wiki']))) ?>" target="_blank" rel="noopener">Wikipedia: <?= h($p['wiki']) ?></a></p>
        <?php endif; ?>
        <?php if (!empty($p['facts'])): ?>
          <h3 class="sub" style="margin:26px 0 6px"><?= h(t('Worth knowing')) ?></h3>
          <ul style="padding-left:1.1em;margin:0;color:var(--ink-2)"><?php foreach ($p['facts'] as $f): ?><li style="margin:6px 0"><?= h($f) ?></li><?php endforeach; ?></ul>
        <?php endif; ?>
      </aside>
    </div>
  </section>

  <section class="block" id="history">
    <div class="block-head"><h2 class="section"><?= h(t('History of use')) ?></h2><p><?= h(t('%d milestones, from discovery to the latest regulatory news.', count($p['history'] ?? []))) ?></p></div>
    <ol class="tl">
      <?php foreach ($p['history'] ?? [] as $e): ?>
        <li class="k-<?= h($e['kind']) ?>">
          <span class="yr"><?= h((string)$e['year']) ?></span><span class="dot" aria-hidden="true"></span>
          <div>
            <div class="ev-title"><?= h($e['title']) ?><span class="kind-tag"><?= h(t(EVENT_KINDS[$e['kind']] ?? $e['kind'])) ?></span><?php if (!empty($e['date']) && strlen($e['date']) > 4): ?><span class="ev-meta"><?= h(fmt_date($e['date'])) ?></span><?php endif; ?></div>
            <?php if (!empty($e['detail'])): ?><p class="ev-detail"><?= h($e['detail']) ?></p><?php endif; ?>
          </div>
        </li>
      <?php endforeach; ?>
    </ol>
  </section>

  <section class="block" id="uses">
    <div class="block-head"><h2 class="section"><?= h(t('Uses')) ?></h2><p><?= h(t('Approved indications, ongoing research, and off-label or unregulated use.')) ?></p></div>
    <div class="uses-cols">
      <div>
        <h3><?= h(t('Approved')) ?></h3>
        <?php if (empty($p['uses']['approved'])): ?><p class="empty-note"><?= h(t('No approved medical use.')) ?></p><?php endif; ?>
        <?php foreach ($p['uses']['approved'] ?? [] as $u):
            $stage = [];
            if (!empty($u['since'])) $stage[] = t('Since %s', (string)$u['since']);
            if (!empty($u['where'])) $stage[] = $u['where']; ?>
          <div class="use"><h4><?= h($u['use']) ?></h4><?php if ($stage): ?><div class="stage"><?= h(implode(is_zh() ? '，' : ', ', $stage)) ?></div><?php endif; ?><?php if (!empty($u['detail'])): ?><p><?= h($u['detail']) ?></p><?php endif; ?></div>
        <?php endforeach; ?>
      </div>
      <div>
        <h3><?= h(t('Investigational')) ?></h3>
        <?php if (empty($p['uses']['investigational'])): ?><p class="empty-note"><?= h(t('No active clinical programmes recorded.')) ?></p><?php endif; ?>
        <?php foreach ($p['uses']['investigational'] ?? [] as $u): ?>
          <div class="use"><h4><?= h($u['use']) ?></h4><?php if (!empty($u['stage'])): ?><div class="stage"><?= h($u['stage']) ?></div><?php endif; ?><?php if (!empty($u['detail'])): ?><p><?= h($u['detail']) ?></p><?php endif; ?></div>
        <?php endforeach; ?>
      </div>
      <div>
        <h3><?= h(t('Off-label and unregulated use')) ?></h3>
        <?php if (empty($p['uses']['off_label'])): ?><p class="empty-note"><?= h(t('None of note.')) ?></p><?php endif; ?>
        <?php foreach ($p['uses']['off_label'] ?? [] as $u): ?>
          <div class="use"><h4><?= h($u['use']) ?></h4><?php if (!empty($u['detail'])): ?><p><?= h($u['detail']) ?></p><?php endif; ?><?php if (!empty($u['evidence'])): ?><div class="ev"><?= h($u['evidence']) ?></div><?php endif; ?></div>
        <?php endforeach; ?>
      </div>
    </div>
    <?php if (!empty($p['brands'])): ?>
      <h3 class="sub" style="margin:34px 0 10px"><?= h(t('Products')) ?></h3>
      <div class="table-scroll"><table class="data-table">
        <thead><tr><th><?= h(t('Brand')) ?></th><th><?= h(t('Company')) ?></th><th><?= h(t('Route')) ?></th><th><?= h(t('Use')) ?></th><th><?= h(t('First approved')) ?></th></tr></thead>
        <tbody><?php foreach ($p['brands'] as $b): ?><tr><td><b><?= h($b['name']) ?></b></td><td><?= h($b['company'] ?? '') ?></td><td><?= h($b['route'] ?? '') ?></td><td><?= h($b['use'] ?? '') ?></td><td class="num" style="text-align:left"><?= h(fmt_date($b['approved'] ?? '')) ?><?= !empty($b['agency']) ? ' <span class="muted">' . h($b['agency']) . '</span>' : '' ?></td></tr><?php endforeach; ?></tbody>
      </table></div>
    <?php endif; ?>
    <?php if (!empty($p['analogs'])): ?>
      <h3 class="sub" style="margin:34px 0 10px"><?= h(t('Analogues and relatives')) ?></h3>
      <div class="table-scroll"><table class="data-table"><thead><tr><th><?= h(t('Molecule')) ?></th><th><?= h(t('What differs')) ?></th></tr></thead>
        <tbody><?php foreach ($p['analogs'] as $a): ?><tr><td><b><?= h($a['name']) ?></b></td><td><?= h($a['note'] ?? '') ?></td></tr><?php endforeach; ?></tbody></table></div>
    <?php endif; ?>
  </section>

  <section class="block" id="popularity">
    <div class="block-head"><h2 class="section"><?= h(t('Popularity worldwide')) ?></h2><p><?= h(t('How many people read about %s on Wikipedia, in which languages and from which countries.', $p['name'])) ?></p></div>
    <?php if ($pop): ?>
      <dl class="statline">
        <div><dt><?= h(t('Views, last 12 months')) ?></dt><dd><?= h(compact_num($pop['views_12m'])) ?></dd></div>
        <div><dt><?= h(t('Change vs previous year')) ?></dt><dd><?= $pop['yoy'] !== null ? h(sprintf('%+d%%', round($pop['yoy'] * 100))) : '–' ?></dd></div>
        <div><dt><?= h(t('Language editions')) ?></dt><dd><?= (int)$pop['langs'] ?></dd></div>
        <div><dt><?= h(t('Busiest month')) ?></dt><dd><?= h(fmt_date($pop['peak_month'])) ?></dd></div>
      </dl>
      <figure class="chart">
        <header><h3><?= h(t('Monthly Wikipedia views, all languages')) ?></h3><p class="sub"><?= h(t('Human traffic to the article and its redirects (e.g. brand names) across %d language editions, %s to %s.', (int)$pop['langs'], fmt_date($pop['first_month']), fmt_date($pop['last_month']))) ?></p></header>
        <div class="chart-body" id="c-views"></div>
      </figure>
      <div class="grid-2" style="margin-top:40px">
        <figure class="chart">
          <header><h3><?= h(t('Readers by country')) ?></h3><p class="sub"><?= h($win ? t("Wikipedia views from each country, all languages, %s–%s. Wikimedia's privacy-protected data only lists countries with more than about 90 views of a page per day, so smaller audiences are not shown.", fmt_date($win['from']), fmt_date($win['to'])) : t('Country-level readership is not available for this article.')) ?></p></header>
          <?php if ($readers): ?><div class="chart-body map-wrap" id="c-readers"></div><?php else: ?><p class="empty-note"><?= h(t("Too few daily readers in any single country to pass Wikimedia's privacy threshold.")) ?></p><?php endif; ?>
          <?php if ($readers): arsort($readers); ?>
            <div class="table-scroll" style="margin-top:14px"><table class="data-table">
              <thead><tr><th><?= h(t('Country')) ?></th><th class="n"><?= h(t('Views, 28 days')) ?></th><th class="n"><?= h(t('Same period %s', substr($country['windows']['previous']['to'] ?? '', 0, 4) ?: t('last year'))) ?></th><th class="n"><?= h(t('Change')) ?></th></tr></thead>
              <tbody><?php foreach (array_slice($readers, 0, 8, true) as $n => $v): $pv = $readersPrev[$n] ?? null; ?>
                <tr><td><?= h($countryNames[$n] ?? $n) ?></td><td class="n"><?= number_format($v) ?></td><td class="n"><?= $pv ? number_format($pv) : '<span class="muted">' . h(t('below threshold')) . '</span>' ?></td><td class="n"><?= $pv ? h(sprintf('%+d%%', round(($v - $pv) / $pv * 100))) : '–' ?></td></tr>
              <?php endforeach; ?></tbody>
            </table></div>
          <?php endif; ?>
        </figure>
        <figure class="chart">
          <header><h3><?= h(t('Interest by language edition')) ?></h3><p class="sub"><?= h(t('Views in the last 12 months; the index shows views per million pageviews of that edition, so small languages can outrank big ones.')) ?></p></header>
          <ul class="lang-bars">
            <?php $maxL = $langRows ? max(1, $langRows[0]['v12']) : 1; foreach (array_slice($langRows, 0, 14) as $L): ?>
              <li title="<?= h($L['title']) ?>"><span><?= h($L['name']) ?></span><span class="bar-track"><span class="bar-fill" style="width:<?= round($L['v12'] / $maxL * 100, 1) ?>%"></span></span><span class="v"><?= h(compact_num($L['v12'])) ?></span></li>
            <?php endforeach; ?>
          </ul>
          <?php // editions under ~50M yearly pageviews make the index noisy, so they are left out of this summary
            $idxRows = array_filter($langRows, fn($r) => $r['index'] !== null && $r['v12'] >= 1000 && $r['edition'] >= 5e7); usort($idxRows, fn($a, $b) => $b['index'] <=> $a['index']); ?>
          <?php if ($idxRows): ?>
            <p class="small muted" style="margin-top:14px"><?= h(t('Highest relative interest: %s views per million.', implode($sep, array_map(fn($r) => $r['name'] . ' ' . number_format($r['index'], 1), array_slice($idxRows, 0, 5))))) ?></p>
          <?php endif; ?>
          <details class="table-view"><summary><?= h(t('Show all %d languages', count($langRows))) ?></summary><div class="table-scroll"><table class="data-table"><thead><tr><th><?= h(t('Language')) ?></th><th><?= h(t('Article title')) ?></th><th class="n"><?= h(t('Views, 12 months')) ?></th><th class="n"><?= h(t('Per million')) ?></th></tr></thead><tbody>
            <?php foreach ($langRows as $L): ?><tr><td><?= h($L['name']) ?></td><td><?= h($L['title']) ?></td><td class="n"><?= number_format($L['v12']) ?></td><td class="n"><?= $L['index'] !== null ? number_format($L['index'], 1) : '–' ?></td></tr><?php endforeach; ?>
          </tbody></table></div></details>
        </figure>
      </div>
    <?php else: ?>
      <p class="empty-note"><?= h(t('Pageview data has not been collected for this peptide yet.')) ?></p>
    <?php endif; ?>
    <?php if (!empty($p['market']['note']) || !empty($p['market']['figures'])): ?>
      <h3 class="sub" style="margin:38px 0 8px"><?= h(t('Market')) ?></h3>
      <?php if (!empty($p['market']['note'])): ?><p class="prose" style="color:var(--ink-2)"><?= h($p['market']['note']) ?></p><?php endif; ?>
      <?php if (!empty($p['market']['figures'])): ?>
        <div class="table-scroll"><table class="data-table" style="max-width:760px"><thead><tr><th><?= h(t('Year')) ?></th><th><?= h(t('Measure')) ?></th><th class="n"><?= h(t('Value')) ?></th><th><?= h(t('Source')) ?></th></tr></thead><tbody>
          <?php foreach ($p['market']['figures'] as $f): ?><tr><td class="num"><?= h((string)$f['year']) ?></td><td><?= h($f['label']) ?></td><td class="n"><?= h($f['value']) ?></td><td class="muted"><?= h($f['source'] ?? '') ?></td></tr><?php endforeach; ?>
        </tbody></table></div>
      <?php endif; ?>
    <?php endif; ?>
  </section>

  <section class="block" id="research">
    <div class="block-head"><h2 class="section"><?= h(t('Research and clinical trials')) ?></h2><p><?= h(t('Scientific output from PubMed and registered studies from ClinicalTrials.gov.')) ?></p></div>
    <?php if ($pubmed || $ct): ?>
      <dl class="statline">
        <div><dt><?= h(t('PubMed papers')) ?></dt><dd><?= $pubmed ? h(compact_num($pubmed['total'])) : '–' ?></dd></div>
        <div><dt><?= h(t('Registered studies')) ?></dt><dd><?= $ct ? h(compact_num($ct['total'])) : '–' ?></dd></div>
        <div><dt><?= h(t('Phase 3 studies')) ?></dt><dd><?= $p['trials'] ? (int)$p['trials']['phase3'] : '–' ?></dd></div>
        <div><dt><?= h(t('Countries with trial sites')) ?></dt><dd><?= $ct ? count($ct['countries'] ?? []) : '–' ?></dd></div>
      </dl>
    <?php endif; ?>
    <?php if (!empty($ct['first_trial'])): $ft = $ct['first_trial']; ?>
      <p class="small" style="margin:-6px 0 26px;color:var(--ink-2);max-width:90ch"><?= h(t('Earliest registered interventional study:')) ?> <a href="https://clinicaltrials.gov/study/<?= h($ft['nct']) ?>" target="_blank" rel="noopener"><?= h($ft['nct']) ?></a><?= h(t(', started %s', fmt_date(substr((string)$ft['start'], 0, 7)))) ?><?= !empty($ft['sponsor']) ? h(t(' by %s', $ft['sponsor'])) : '' ?>: <span lang="en"><?= h($ft['title']) ?></span>.</p>
    <?php endif; ?>
    <div class="grid-2">
      <figure class="chart">
        <header><h3><?= h(t('Papers per year')) ?></h3><p class="sub"><?= h(t('PubMed query:')) ?> <span class="mono small"><?= h($p['queries']['pubmed'] ?? '') ?></span><?= h(t('. The current year is shown in grey (year to date).')) ?></p></header>
        <div class="chart-body" id="c-papers"></div>
      </figure>
      <figure class="chart">
        <header><h3><?= h(t('Trials started per year')) ?></h3><p class="sub"><?= h(t('ClinicalTrials.gov intervention search:')) ?> <span class="mono small"><?= h(($p['queries']['ctgov'] ?? '') ?: t('none')) ?></span><?= h(t('. Grey: this year so far and planned future starts.')) ?></p></header>
        <div class="chart-body" id="c-trials"></div>
      </figure>
    </div>
    <?php if ($ct && $ct['total']): ?>
      <div class="grid-2" style="margin-top:40px">
        <figure class="chart">
          <header><h3><?= h(t('Where trials are run')) ?></h3><p class="sub"><?= h(t('Number of registered studies with at least one site in each country.')) ?></p></header>
          <div class="chart-body map-wrap" id="c-trialmap"></div>
        </figure>
        <div>
          <h3 class="sub" style="margin-bottom:8px"><?= h(t('By phase and status')) ?></h3>
          <div class="table-scroll"><table class="data-table"><thead><tr><th><?= h(t('Phase')) ?></th><th class="n"><?= h(t('Studies')) ?></th></tr></thead><tbody>
            <?php foreach ($phaseOrder as $k => $lab): if (empty($ct['phase'][$k])) continue; ?><tr><td><?= h(t($lab)) ?></td><td class="n"><?= number_format($ct['phase'][$k]) ?></td></tr><?php endforeach; ?>
          </tbody></table></div>
          <div class="table-scroll" style="margin-top:18px"><table class="data-table"><thead><tr><th><?= h(t('Status')) ?></th><th class="n"><?= h(t('Studies')) ?></th></tr></thead><tbody>
            <?php $st = $ct['status'] ?? []; arsort($st); foreach ($st as $k => $n): ?><tr><td><?= h($statusLabel($k)) ?></td><td class="n"><?= number_format($n) ?></td></tr><?php endforeach; ?>
          </tbody></table></div>
          <?php if (!empty($ct['conditions'])): ?>
            <h3 class="sub" style="margin:22px 0 6px"><?= h(t('Most studied conditions')) ?></h3>
            <ul class="pill-list" lang="en"><?php foreach (array_slice($ct['conditions'], 0, 12) as [$cname, $cn]): ?><li><?= h(ucfirst($cname)) ?> <span class="muted"><?= (int)$cn ?></span></li><?php endforeach; ?></ul>
            <?php if (is_zh()): ?><p class="small muted" style="margin-top:6px"><?= h(t('Condition names are shown as registered on ClinicalTrials.gov.')) ?></p><?php endif; ?>
          <?php endif; ?>
        </div>
      </div>
      <?php if (!empty($ct['largest'])): ?>
        <h3 class="sub" style="margin:36px 0 10px"><?= h(t('Largest interventional trials')) ?></h3>
        <div class="table-scroll"><table class="data-table"><thead><tr><th><?= h(t('Study')) ?></th><th><?= h(t('Phase')) ?></th><th><?= h(t('Status')) ?></th><th><?= h(t('Sponsor')) ?></th><th class="n"><?= h(t('Enrolment')) ?></th><th class="n"><?= h(t('Start')) ?></th></tr></thead><tbody>
          <?php foreach ($ct['largest'] as $s): ?><tr><td><a href="https://clinicaltrials.gov/study/<?= h($s['nct']) ?>" target="_blank" rel="noopener"><?= h($s['nct']) ?></a><br><span class="small" lang="en"><?= h($s['title']) ?></span></td><td class="small"><?= h($phaseLabel($s['phase'])) ?></td><td class="small"><?= h($statusLabel($s['status'])) ?></td><td class="small"><?= h($s['sponsor'] ?? '') ?></td><td class="n"><?= $s['enrollment'] ? number_format($s['enrollment']) : '–' ?></td><td class="n"><?= h(substr((string)$s['start'], 0, 7)) ?></td></tr><?php endforeach; ?>
        </tbody></table></div>
      <?php endif; ?>
    <?php endif; ?>
  </section>

  <section class="block" id="chemistry">
    <div class="block-head"><h2 class="section"><?= h(t('Chemistry')) ?></h2><p><?= h(t('Computed from the backbone sequence; side-chain conjugates such as fatty acids are not included.')) ?></p></div>
    <div class="grid-2">
      <div>
        <dl class="props-grid">
          <div><dt><?= h(t('Residues')) ?></dt><dd><?= (int)$p['len'] ?></dd></div>
          <div><dt><?= h(t('Molecular weight')) ?></dt><dd><?= !empty($p['mw']) ? h(number_format((float)$p['mw'], 1)) . ' Da' : '–' ?></dd></div>
          <div><dt><?= h(t('Isoelectric point')) ?></dt><dd><?= $props['pI'] !== null ? h(number_format($props['pI'], 1)) : '–' ?></dd></div>
          <div><dt><?= h(t('Net charge, pH 7.4')) ?></dt><dd><?= h(sprintf('%+.1f', $props['charge74'])) ?></dd></div>
          <div><dt><?= h(t('Hydropathy (GRAVY)')) ?></dt><dd><?= $props['gravy'] !== null ? h(sprintf('%+.2f', $props['gravy'])) : '–' ?></dd></div>
          <div><dt><?= h(t('Helical moment μH')) ?></dt><dd><?= $props['muH'] !== null ? h(number_format($props['muH'], 2)) : '–' ?></dd></div>
          <?php if (!empty($pc['props']['XLogP']) || isset($pc['props']['TPSA'])): ?>
            <div><dt><?= h(t('XLogP3 (PubChem)')) ?></dt><dd><?= isset($pc['props']['XLogP']) ? h((string)$pc['props']['XLogP']) : '–' ?></dd></div>
            <div><dt><?= h(t('H-bond donors / acceptors')) ?></dt><dd><?= h(($pc['props']['HBondDonorCount'] ?? '–') . ' / ' . ($pc['props']['HBondAcceptorCount'] ?? '–')) ?></dd></div>
            <div><dt><?= h(t('Heavy atoms')) ?></dt><dd><?= h((string)($pc['props']['HeavyAtomCount'] ?? '–')) ?></dd></div>
          <?php endif; ?>
        </dl>
        <h3 class="sub" style="margin:26px 0 8px"><?= h(t('Composition')) ?></h3>
        <?php $cls = read_json(ATLAS_DATA . '/residues.json')['classes'] ?? []; $maxC = max(1, max($props['counts'])); ?>
        <ul class="lang-bars">
          <?php foreach ($props['counts'] as $k => $n): if (!$n) continue; ?>
            <li><span><?= h(is_zh() ? ($cls[$k]['zh'] ?? $k) : ($cls[$k]['label'] ?? $k)) ?></span><span class="bar-track"><span class="bar-fill" style="width:<?= round($n / $maxC * 100, 1) ?>%;background:var(--r-<?= h($k) ?>)"></span></span><span class="v"><?= (int)$n ?> <span class="muted">(<?= round($n / max(1, $p['len']) * 100) ?>%)</span></span></li>
          <?php endforeach; ?>
        </ul>
        <?php if (!empty($pc['image']) && is_file(ATLAS_ROOT . '/' . $pc['image'])): ?>
          <h3 class="sub" style="margin:26px 0 8px"><?= h(t('2D structure')) ?></h3>
          <img src="<?= h($pc['image']) ?>" alt="<?= h(t('2D chemical structure of %s from PubChem', $p['name'])) ?>" loading="lazy" style="background:#fff;border:1px solid var(--rule);border-radius:10px;width:100%;max-width:420px">
          <p class="small muted"><?= h(t('Depiction: PubChem CID %d.', (int)$pc['cid'])) ?></p>
        <?php endif; ?>
      </div>
      <div>
        <?php if (count($hydroSeries) >= 5): ?>
          <figure class="chart">
            <header><h3><?= h(t('Hydropathy profile')) ?></h3><p class="sub"><?= h(!empty($seq['numbering_offset']) ? t('Kyte–Doolittle, 5-residue window; literature numbering. Above zero is water-avoiding.') : t('Kyte–Doolittle, 5-residue window. Above zero is water-avoiding.')) ?></p></header>
            <div class="chart-body" id="c-hydro"></div>
          </figure>
        <?php endif; ?>
        <?php if ($helical): ?>
          <figure class="chart" style="margin-top:32px">
            <header><h3><?= h(t('Helical wheel')) ?></h3><p class="sub"><?= h(t('The chain viewed down an ideal α-helix axis (100° per residue); the arrow points to the hydrophobic face. Most meaningful for helical peptides such as the incretins.')) ?></p></header>
            <?= helical_wheel_svg($p) ?>
          </figure>
        <?php endif; ?>
      </div>
    </div>
  </section>

  <section class="block" id="safety">
    <div class="block-head"><h2 class="section"><?= h(t('Safety and pharmacology')) ?></h2></div>
    <div class="grid-3">
      <div>
        <?php if (!empty($p['safety']['common'])): ?>
          <h3 class="sub" style="margin-bottom:6px"><?= h(t('Common effects')) ?></h3>
          <ul class="pill-list" style="margin-bottom:20px"><?php foreach ($p['safety']['common'] as $s): ?><li><?= h($s) ?></li><?php endforeach; ?></ul>
        <?php endif; ?>
        <h3 class="sub" style="margin:0 0 6px"><?= h(t('Serious risks')) ?></h3>
        <?php if (!empty($p['safety']['serious'])): ?><ul style="padding-left:1.1em;margin:0"><?php foreach ($p['safety']['serious'] as $s): ?><li style="margin:4px 0"><?= h($s) ?></li><?php endforeach; ?></ul><?php else: ?><p class="empty-note"><?= h(t('None established.')) ?></p><?php endif; ?>
      </div>
      <div>
        <?php foreach ($p['safety']['warnings'] ?? [] as $w): ?><div class="callout" style="margin-top:0"><?= h($w) ?></div><?php endforeach; ?>
        <?php if (!empty($p['safety']['notes'])): ?><p style="color:var(--ink-2)"><?= h($p['safety']['notes']) ?></p><?php endif; ?>
      </div>
      <div>
        <?php if (!empty($p['pk'])): ?>
          <h3 class="sub" style="margin-bottom:6px"><?= h(t('Pharmacokinetics')) ?></h3>
          <dl class="facts">
            <?php foreach (['half_life' => 'Half-life', 'tmax' => 'Peak level', 'bioavailability' => 'Bioavailability', 'metabolism' => 'Metabolism', 'excretion' => 'Excretion'] as $k => $lab): if (empty($p['pk'][$k])) continue; ?>
              <div style="grid-template-columns:110px minmax(0,1fr)"><dt><?= h(t($lab)) ?></dt><dd><?= h($p['pk'][$k]) ?></dd></div>
            <?php endforeach; ?>
          </dl>
        <?php endif; ?>
      </div>
    </div>
    <?php if (!empty($p['dosing'])): ?>
      <h3 class="sub" style="margin:30px 0 8px"><?= h(t('Labelled regimens')) ?></h3>
      <div class="table-scroll"><table class="data-table" style="max-width:900px"><tbody><?php foreach ($p['dosing'] as $d): ?><tr><td style="width:190px"><b><?= h($d['product']) ?></b></td><td><?= h($d['regimen']) ?></td></tr><?php endforeach; ?></tbody></table></div>
    <?php endif; ?>
    <?php if (!empty($p['dosing_note'])): ?><p class="small muted" style="margin-top:10px;max-width:80ch"><?= h($p['dosing_note']) ?></p><?php endif; ?>
  </section>

  <section class="block" id="regulation">
    <div class="block-head"><h2 class="section"><?= h(t('Regulatory status')) ?></h2><p><?= h($p['status_note'] ?? '') ?></p></div>
    <?php if (!empty($p['regulatory'])): ?>
      <div class="table-scroll"><table class="data-table">
        <thead><tr><th style="width:120px"><?= h(t('Region')) ?></th><th style="width:210px"><?= h(t('Status')) ?></th><th><?= h(t('Detail')) ?></th></tr></thead>
        <tbody><?php foreach ($p['regulatory'] as $r): ?><tr><td><b><?= h(region_label($r['region'])) ?></b></td><td><span class="reg-status-cell s-<?= h($r['status']) ?>"><?= h(t(REG_STATUS[$r['status']] ?? $r['status'])) ?></span></td><td><?= h($r['detail'] ?? '') ?></td></tr><?php endforeach; ?></tbody>
      </table></div>
    <?php endif; ?>
  </section>

  <section class="block" id="sources">
    <div class="block-head"><h2 class="section"><?= h(t('Identifiers, links and references')) ?></h2></div>
    <div class="grid-2">
      <div>
        <ul class="linklist">
          <?php
          $ids = $p['ids'] ?? [];
          $links = [];
          if (!empty($p['wiki'])) $links[] = [t('Wikipedia'), 'https://en.wikipedia.org/wiki/' . rawurlencode(str_replace(' ', '_', $wiki['title'] ?? $p['wiki'])), $wiki['title'] ?? $p['wiki']];
          if ($wikiZh && !empty($wikiZh['url'])) $links[] = [t('Chinese Wikipedia'), $wikiZh['url'], $wikiZh['title']];
          if (!empty($ids['pubchem_cid'])) $links[] = ['PubChem', 'https://pubchem.ncbi.nlm.nih.gov/compound/' . $ids['pubchem_cid'], 'CID ' . $ids['pubchem_cid']];
          if (!empty($ids['drugbank'])) $links[] = ['DrugBank', 'https://go.drugbank.com/drugs/' . $ids['drugbank'], $ids['drugbank']];
          if (!empty($ids['chembl'])) $links[] = ['ChEMBL', 'https://www.ebi.ac.uk/chembl/explore/compound/' . $ids['chembl'], $ids['chembl']];
          if (!empty($ids['uniprot'])) $links[] = ['UniProt', 'https://www.uniprot.org/uniprotkb/' . $ids['uniprot'], $ids['uniprot']];
          if (!empty($ids['kegg'])) $links[] = ['KEGG DRUG', 'https://www.kegg.jp/entry/' . $ids['kegg'], $ids['kegg']];
          if (!empty($ids['chebi'])) $links[] = ['ChEBI', 'https://www.ebi.ac.uk/chebi/searchId.do?chebiId=' . $ids['chebi'], $ids['chebi']];
          if (!empty($ids['unii'])) $links[] = ['FDA UNII', 'https://precision.fda.gov/uniisearch/srs/unii/' . $ids['unii'], $ids['unii']];
          if (!empty($ids['cas'])) $links[] = [t('CAS number'), 'https://commonchemistry.cas.org/detail?cas_rn=' . $ids['cas'], $ids['cas']];
          if (!empty($ids['atc'])) $links[] = [t('ATC code'), 'https://atcddd.fhi.no/atc_ddd_index/?code=' . $ids['atc'], $ids['atc']];
          foreach ($p['structure']['pdb'] ?? [] as $e) $links[] = ['RCSB PDB', 'https://www.rcsb.org/structure/' . strtoupper($e['id']), strtoupper($e['id'])];
          if (!empty($p['queries']['ctgov'])) $links[] = ['ClinicalTrials.gov', 'https://clinicaltrials.gov/search?intr=' . rawurlencode($p['queries']['ctgov']), t('search')];
          if (!empty($p['queries']['pubmed'])) $links[] = ['PubMed', 'https://pubmed.ncbi.nlm.nih.gov/?term=' . rawurlencode($p['queries']['pubmed']), t('search')];
          foreach ($links as [$label, $href, $id]): ?>
            <li><a href="<?= h($href) ?>" target="_blank" rel="noopener"><?= h($label) ?></a><span class="id"><?= h((string)$id) ?></span></li>
          <?php endforeach; ?>
        </ul>
        <?php if (!empty($p['related'])): ?>
          <h3 class="sub" style="margin:28px 0 10px"><?= h(t('Related peptides')) ?></h3>
          <div class="related"><?php foreach ($p['related'] as $r): if (!isset($all[$r])) continue; ?><a href="<?= h(url('peptide.php', ['p' => $r])) ?>"><?= h($all[$r]['name']) ?></a><?php endforeach; ?></div>
          <p class="small" style="margin-top:12px"><a href="<?= h(url('compare.php', ['p' => implode(',', array_slice(array_merge([$slug], array_values(array_filter($p['related'], fn($r) => isset($all[$r])))), 0, 3))])) ?>"><?= h(t('Compare %s with related peptides', $p['name'])) ?></a></p>
        <?php endif; ?>
      </div>
      <div>
        <h3 class="sub" style="margin-bottom:8px"><?= h(t('Key references')) ?></h3>
        <ol class="refs" lang="en">
          <?php foreach ($p['references'] ?? [] as $r): ?>
            <li><a href="<?= h($r['url']) ?>" target="_blank" rel="noopener"><?= h($r['title']) ?></a><br><?= h(trim(($r['authors'] ?? '') . ' ' . ($r['journal'] ?? '') . ' ' . ($r['year'] ?? ''))) ?></li>
          <?php endforeach; ?>
        </ol>
      </div>
    </div>
  </section>
</div>

<script type="application/json" id="d-pep"><?= json_embed([
    'slug' => $slug, 'name' => $p['name'],
    'structures' => $structs, 'chains' => $viewerChains,
    'monthly' => $monthly, 'papers' => $pmYears, 'trials' => $trialYears,
    'readers' => $readers, 'trialMap' => $trialMap, 'names' => $countryNames,
    'hydro' => $hydroSeries, 'cyclic' => !empty($seq['cyclic']),
    'txt' => [
        'views' => t('views'), 'papers' => t('papers'), 'studiesStarted' => t('studies started'), 'studies' => t('studies'),
        'monthly' => t('Monthly Wikipedia views'), 'papersLabel' => t('PubMed papers per year'), 'trialsLabel' => t('Trials started per year'),
        'noPubmed' => t('No PubMed data yet.'), 'noTrials' => t('No registered studies.'),
        'readersLabel' => t('Wikipedia readers by country'), 'trialMapLabel' => t('Trial sites by country'),
        'hydropathy' => t('Hydropathy'), 'residue' => t('Residue'),
    ],
]) ?></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const d = Atlas.data('d-pep');
  if (!d) return;
  const x = d.txt;
  if (window.$3Dmol) Atlas.viewer(document.getElementById('viewer'), { structures: d.structures, chains: d.chains, cyclic: d.cyclic, beadSelector: '#chain-main' });
  if (!window.d3) return;
  const $ = (id) => document.getElementById(id);
  if ($('c-views')) Atlas.lineChart($('c-views'), { series: [{ name: d.name, color: 'var(--series-1)', values: d.monthly }], area: true, height: 250, unit: x.views, label: x.monthly });
  if ($('c-papers')) Atlas.columnChart($('c-papers'), { data: d.papers, unit: x.papers, label: x.papersLabel, empty: x.noPubmed });
  if ($('c-trials')) Atlas.columnChart($('c-trials'), { data: d.trials, unit: x.studiesStarted, label: x.trialsLabel, empty: x.noTrials });
  const world = 'assets/geo/countries-110m.json';
  if ($('c-readers')) Atlas.choropleth($('c-readers'), { values: d.readers, names: d.names, unit: x.views, worldUrl: world, label: x.readersLabel });
  if ($('c-trialmap')) Atlas.choropleth($('c-trialmap'), { values: d.trialMap, names: d.names, unit: x.studies, worldUrl: world, label: x.trialMapLabel });
  if ($('c-hydro')) Atlas.lineChart($('c-hydro'), { series: [{ name: x.hydropathy, color: 'var(--series-2)', values: d.hydro }], xKind: 'index', xLabel: x.residue, height: 200, yMin: -4.5, yFormat: (v) => v.toFixed(1), tipFormat: (v) => v.toFixed(2), labelPeak: false, unit: 'Kyte–Doolittle' });
});
</script>
<?php page_foot();
