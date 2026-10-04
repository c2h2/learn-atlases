<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$req = array_values(array_unique(array_filter(array_map(
    fn($s) => preg_replace('/[^a-z0-9-]/', '', strtolower(trim($s))),
    explode(',', (string)($_GET['p'] ?? ''))
))));
$picked = array_values(array_filter($req, fn($s) => isset($all[$s])));
if (!$picked) {
    $picked = array_values(array_filter(['semaglutide', 'tirzepatide', 'retatrutide'], fn($s) => isset($all[$s])));
    if (!$picked) $picked = array_slice(array_keys($all), 0, 3);
}
$picked = array_slice($picked, 0, 3);
$colors = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'];
$ps = array_map(fn($s) => $all[$s], $picked);

$widthUnits = 0;
foreach ($ps as $p) {
    $widthUnits = max($widthUnits, $p['len'] + 1.6 * max(0, count($p['sequence']['chains'] ?? []) - 1) + 2.8);
}
$views = [];
$papers = [];
$trialsY = [];
foreach ($ps as $i => $p) {
    $w = atlas_cache('wiki', $p['slug']);
    $vals = [];
    foreach ($w['monthly_all'] ?? [] as $k => $v) $vals[] = [$k, $v];
    $views[] = ['name' => short_name($p), 'color' => $colors[$i], 'values' => $vals];
    $pm = atlas_cache('pubmed', $p['slug']);
    $pv = [];
    foreach ($pm['years'] ?? [] as $y => $n) if ((int)$y >= 1990 && (int)$y < (int)date('Y')) $pv[] = [(int)$y, (int)$n];
    $papers[] = ['name' => short_name($p), 'color' => $colors[$i], 'values' => $pv];
    $ct = atlas_cache('ctgov', $p['slug']);
    $tv = [];
    for ($y = 2000; $y < (int)date('Y'); $y++) $tv[] = [$y, (int)($ct['start_year'][$y] ?? 0)];
    $trialsY[] = ['name' => short_name($p), 'color' => $colors[$i], 'values' => $ct ? $tv : []];
}

$sep = is_zh() ? '，' : ', ';
$rows = [
    'Class' => fn($p) => h($p['drug_class'] ?? ''),
    'Status' => fn($p) => status_badge($p['status']),
    'Human evidence' => fn($p) => evidence_meter((int)$p['evidence']),
    'Targets' => fn($p) => h(implode(', ', array_map(fn($t) => $t['gene'] ?? $t['name'], $p['targets'] ?? []))),
    'Residues' => fn($p) => (int)$p['len'] . ($p['props']['noncanonical'] ? ' <span class="muted">(' . h(t('%d non-canonical', $p['props']['noncanonical'])) . ')</span>' : ''),
    'Molecular weight' => fn($p) => !empty($p['mw']) ? number_format((float)$p['mw'], 1) . ' g/mol' : '–',
    'Half-life' => fn($p) => h($p['half_life'] ?? '–'),
    'Routes' => fn($p) => h(implode(is_zh() ? '；' : '; ', $p['routes'] ?? [])),
    'Developer' => fn($p) => h($p['developer'] ?? ''),
    'First approval' => fn($p) => !empty($p['first_approval']) ? h(fmt_date($p['first_approval']['date']) . $sep . ($p['first_approval']['agency'] ?? '')) : '<span class="muted">' . h(t('Not approved')) . '</span>',
    'Wikipedia views, 12 months' => fn($p) => $p['pop'] ? number_format($p['pop']['views_12m']) : '–',
    'PubMed papers' => fn($p) => $p['papers'] ? number_format((int)$p['papers']['total']) : '–',
    'Registered trials' => fn($p) => $p['trials'] ? number_format((int)$p['trials']['total']) : '–',
    'Net charge at pH 7.4' => fn($p) => sprintf('%+.1f', $p['props']['charge74']),
    'Isoelectric point' => fn($p) => $p['props']['pI'] !== null ? number_format($p['props']['pI'], 1) : '–',
];

page_head(t('Compare %s', implode(is_zh() ? '、' : ', ', array_column($ps, 'name'))), 'compare', ['scripts' => ['assets/vendor/d3.min.js', 'assets/js/charts.js']]);
?>
<div class="wrap">
  <header style="padding:40px 0 6px">
    <h1 class="page-title"><?= h(t('Compare')) ?></h1>
    <p class="lede" style="margin-top:14px"><?= h(t('Put up to three peptides side by side: chains, key facts, and how attention, research and trials have moved over time.')) ?></p>
  </header>
  <form class="compare-pick" method="get" action="compare.php" id="cmp-form">
    <?php for ($i = 0; $i < 3; $i++): ?>
      <label class="control-label"><span class="cmp-key" style="background:<?= $colors[$i] ?>"></span>
        <select class="select" data-slot="<?= $i ?>" aria-label="<?= h(t('Peptide %d', $i + 1)) ?>">
          <option value=""><?= h(t('None')) ?></option>
          <?php foreach (CATEGORIES as $ck => $c): ?>
            <optgroup label="<?= h(t($c['label'])) ?>">
              <?php foreach ($all as $s => $p): if ($p['category'] !== $ck) continue; ?><option value="<?= h($s) ?>"<?= ($picked[$i] ?? '') === $s ? ' selected' : '' ?>><?= h($p['name']) ?></option><?php endforeach; ?>
            </optgroup>
          <?php endforeach; ?>
        </select>
      </label>
    <?php endfor; ?>
    <input type="hidden" name="p" id="cmp-p" value="<?= h(implode(',', $picked)) ?>">
    <?php if (is_zh()): ?><input type="hidden" name="lang" value="zh"><?php endif; ?>
    <button class="chip" type="submit"><?= h(t('Compare')) ?></button>
  </form>

  <section class="block" style="padding-top:22px">
    <?php foreach ($ps as $i => $p): ?>
      <div style="display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px;align-items:center;padding:10px 0;border-bottom:1px solid var(--rule)">
        <div><span class="cmp-key" style="background:<?= $colors[$i] ?>"></span><a href="<?= h(url('peptide.php', ['p' => $p['slug']])) ?>" style="font-weight:700;color:var(--ink);text-decoration:none"><?= h($p['name']) ?></a></div>
        <div><?= bead_svg($p, ['unit' => 18, 'letters' => true, 'width_units' => $widthUnits]) ?></div>
      </div>
    <?php endforeach; ?>
    <?= residue_legend() ?>
  </section>

  <section class="block">
    <div class="table-scroll">
      <table class="data-table">
        <thead><tr><th></th><?php foreach ($ps as $i => $p): ?><th><span class="cmp-key" style="background:<?= $colors[$i] ?>"></span><?= h($p['name']) ?></th><?php endforeach; ?></tr></thead>
        <tbody><?php foreach ($rows as $label => $fn): ?><tr><th scope="row" style="border-bottom:1px solid var(--rule);color:var(--ink-3);font-weight:500"><?= h(t($label)) ?></th><?php foreach ($ps as $p): ?><td><?= $fn($p) ?></td><?php endforeach; ?></tr><?php endforeach; ?></tbody>
      </table>
    </div>
  </section>

  <section class="block">
    <figure class="chart">
      <header><h3><?= h(t('Monthly Wikipedia views')) ?></h3><p class="sub"><?= h(t('All language editions, including redirects such as brand names.')) ?></p></header>
      <div class="chart-body" id="k-views"></div>
    </figure>
    <div class="grid-2" style="margin-top:40px">
      <figure class="chart">
        <header><h3><?= h(t('PubMed papers per year')) ?></h3><p class="sub"><?= h(t('Complete years, 1990 onwards.')) ?></p></header>
        <div class="chart-body" id="k-papers"></div>
      </figure>
      <figure class="chart">
        <header><h3><?= h(t('Trials started per year')) ?></h3><p class="sub"><?= h(t('ClinicalTrials.gov, complete years since 2000.')) ?></p></header>
        <div class="chart-body" id="k-trials"></div>
      </figure>
    </div>
  </section>
</div>
<script type="application/json" id="d-cmp"><?= json_embed(['views' => $views, 'papers' => $papers, 'trials' => $trialsY,
    'txt' => ['views' => t('Monthly Wikipedia views'), 'papers' => t('PubMed papers per year'), 'trials' => t('Trials started per year'), 'year' => t('Year')]]) ?></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cmp-form');
  const sync = () => { document.getElementById('cmp-p').value = Array.from(form.querySelectorAll('select')).map((s) => s.value).filter(Boolean).join(','); };
  form.querySelectorAll('select').forEach((s) => s.addEventListener('change', () => { sync(); form.submit(); }));
  form.addEventListener('submit', sync);
  const d = Atlas.data('d-cmp');
  if (!d || !window.d3) return;
  const x = d.txt;
  Atlas.lineChart(document.getElementById('k-views'), { series: d.views, height: 280, label: x.views });
  Atlas.lineChart(document.getElementById('k-papers'), { series: d.papers, xKind: 'year', xLabel: x.year, height: 230, label: x.papers });
  Atlas.lineChart(document.getElementById('k-trials'), { series: d.trials, xKind: 'year', xLabel: x.year, height: 230, label: x.trials });
});
</script>
<?php page_foot();
