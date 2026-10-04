<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$tally = array_fill_keys(array_keys(STATUSES), 0);
foreach ($all as $p) {
    $tally[$p['status']] = ($tally[$p['status']] ?? 0) + 1;
}
// one bead scale for every row, so chain length is comparable at a glance
$widthUnits = 0;
foreach ($all as $p) {
    $chains = count($p['sequence']['chains'] ?? []);
    $widthUnits = max($widthUnits, $p['len'] + 1.6 * max(0, $chains - 1) + 2.8);
}
$first = null;
foreach ($all as $p) {
    if (!empty($p['year_human']) && (!$first || $p['year_human'] < $first['year_human'])) {
        $first = $p;
    }
}

function reg_row(array $p, float $widthUnits, int $rowIndex): string
{
    $search = mb_strtolower(implode(' ', array_merge(
        [$p['name'], $p['name_en'] ?? '', $p['drug_class'] ?? '', $p['subclass'] ?? '', $p['developer'] ?? ''],
        $p['aliases'] ?? [],
        array_column($p['brands'] ?? [], 'name'),
        array_column($p['targets'] ?? [], 'name'),
        array_column($p['targets'] ?? [], 'gene')
    )));
    $views = $p['pop']['views_12m'] ?? 0;
    $year = $p['year_human'];
    $yearTitle = $year ? t('First documented human use, trial or approval') : t('Discovered; first human use not documented');
    $yearShown = $year ?? ($p['discovery']['year'] ?? '');
    $svg = bead_svg($p, ['unit' => 14, 'letters' => false, 'labels' => false, 'width_units' => $widthUnits]);
    // stagger index for the one-time "polymerise" entrance
    $i = 0;
    $svg = preg_replace_callback('/<g class="bd /', function () use (&$i) {
        return '<g style="--i:' . ($i++) . '" class="bd ';
    }, $svg);
    $alt = alt_name($p);
    $o = '<a class="reg-row" href="' . h(url('peptide.php', ['p' => $p['slug']])) . '"'
        . ' data-cat="' . h($p['category']) . '" data-status="' . h($p['status']) . '" data-year="' . h((string)$yearShown) . '"'
        . ' data-name="' . h(mb_strtolower($p['name_en'] ?? $p['name'])) . '" data-views="' . (int)$views . '" data-len="' . (int)$p['len'] . '"'
        . ' data-trials="' . (int)($p['trials']['total'] ?? 0) . '" data-search="' . h($search) . '" style="--row:' . $rowIndex . '">';
    $o .= '<span class="reg-year" title="' . h($yearTitle) . '">' . ($year ? h((string)$year) : '<span class="muted">(' . h((string)$yearShown) . ')</span>') . '</span>';
    $o .= '<span class="reg-id"><span class="reg-name">' . h($p['name']) . '</span>' . ($alt ? '<span class="reg-alt">' . h($alt) . '</span>' : '')
        . '<span class="reg-class" style="display:block">' . h($p['drug_class'] ?? '') . '</span></span>';
    $o .= '<span class="reg-chain">' . $svg . '</span>';
    $o .= '<span class="reg-status">' . status_badge($p['status']) . evidence_meter((int)$p['evidence'], false) . '</span>';
    $o .= '<span class="reg-attn">';
    if (!empty($p['pop']['spark'])) {
        $o .= sparkline_svg($p['pop']['spark']) . '<span class="v">' . h(compact_num($views)) . '</span>';
    } else {
        $o .= '<span class="v muted">' . h(t('no article data')) . '</span>';
    }
    $o .= '</span></a>';
    return $o;
}

page_head(t('Peptide Atlas'), 'index', ['scripts' => ['assets/vendor/d3.min.js', 'assets/js/charts.js']]);
?>
<div class="wrap">
  <section class="intro">
    <div>
      <h1 class="display"><?= is_zh() ? '多肽<br>图谱' : 'Peptide<br>Atlas' ?></h1>
      <p class="lede"><?= h(t('%d therapeutic and research peptides drawn residue by residue, from %s to the triple agonists of 2026: what each one is, how it was discovered and used, its 3D structure, and how much attention the world pays it.',
          count($all), $first ? short_name($first, is_zh() ? 4 : 20) . (is_zh() ? '（' . (int)$first['year_human'] . '年）' : ' (' . (int)$first['year_human'] . ')') : t('the first peptide hormones'))) ?></p>
    </div>
    <dl class="tally">
      <?php foreach (STATUSES as $k => $s): ?>
        <div><dt><?= h(t($s['label'])) ?></dt><dd><?= (int)$tally[$k] ?></dd></div>
      <?php endforeach; ?>
    </dl>
  </section>

  <div class="controls" role="search">
    <label class="search"><?= icon('search') ?><input id="reg-search" type="search" placeholder="<?= h(t('Search name, brand or target')) ?>" aria-label="<?= h(t('Search peptides')) ?>" autocomplete="off"></label>
    <div class="chips" role="group" aria-label="<?= h(t('Family')) ?>">
      <button class="chip" type="button" data-cat="all" aria-pressed="true"><?= h(t('All')) ?></button>
      <?php foreach (CATEGORIES as $k => $c): ?>
        <button class="chip" type="button" data-cat="<?= h($k) ?>" aria-pressed="false"><?= h(t($c['label'])) ?></button>
      <?php endforeach; ?>
    </div>
    <label class="control-label"><?= h(t('Status')) ?>
      <select id="reg-status" class="select">
        <option value="all"><?= h(t('Any')) ?></option>
        <?php foreach (STATUSES as $k => $s): ?><option value="<?= h($k) ?>"><?= h(t($s['label'])) ?></option><?php endforeach; ?>
      </select>
    </label>
    <label class="control-label"><?= h(t('Order')) ?>
      <select id="reg-sort" class="select">
        <option value="group"><?= h(t('By family')) ?></option>
        <option value="year"><?= h(t('First human use')) ?></option>
        <option value="attention"><?= h(t('Attention, last 12 months')) ?></option>
        <option value="trials"><?= h(t('Registered trials')) ?></option>
        <option value="length"><?= h(t('Chain length')) ?></option>
        <option value="name"><?= h(t('Name')) ?></option>
      </select>
    </label>
    <span id="reg-count" class="muted small" aria-live="polite"></span>
  </div>
  <?= residue_legend() ?>

  <section class="register polymerize" aria-label="<?= h(t('All peptides')) ?>">
    <?php $row = 0; foreach (CATEGORIES as $ck => $c):
        $items = array_filter($all, fn($p) => $p['category'] === $ck);
        if (!$items) continue; ?>
      <section class="reg-group" data-cat="<?= h($ck) ?>">
        <header><h2><?= h(t($c['label'])) ?></h2><p><?= h(t($c['blurb'])) ?></p></header>
        <div class="reg-list">
          <?php foreach ($items as $p) echo reg_row($p, $widthUnits, $row++); ?>
        </div>
      </section>
    <?php endforeach; ?>
    <section class="reg-flat reg-group" hidden><header><h2><?= h(t('All peptides')) ?></h2></header><div class="reg-list"></div></section>
    <p id="reg-empty" class="reg-empty" hidden><?= h(t('No peptide matches. Clear the search or choose another family.')) ?></p>
    <p class="muted small" style="margin-top:14px"><?= h(t('Year: first documented human use, trial or approval (in brackets: discovery, where no date of first human use is documented). Badge: regulatory status. Bars: strength of human evidence. Sparkline: monthly Wikipedia views across all language editions, last six years; figure is the 12-month total.')) ?></p>
  </section>

  <?php
  $ranked = array_filter($all, fn($p) => !empty($p['pop']['views_12m']));
  uasort($ranked, fn($a, $b) => $b['pop']['views_12m'] <=> $a['pop']['views_12m']);
  // the incretin story: the three GLP-1-era drugs, falling back to the three most-read peptides
  $top3 = array_intersect_key($all, array_flip(['semaglutide', 'tirzepatide', 'retatrutide']));
  if (count($top3) < 3) $top3 = array_slice($ranked, 0, 3, true);
  $attn = [];
  foreach ($ranked as $p) {
      $attn[] = ['label' => short_name($p), 'value' => $p['pop']['views_12m'], 'href' => url('peptide.php', ['p' => $p['slug']]),
          'note' => ($p['pop']['yoy'] !== null ? t('%s vs previous 12 months', sprintf('%+d%%', round($p['pop']['yoy'] * 100))) : null)];
  }
  $lines = [];
  $colors = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)'];
  $ci = 0;
  foreach ($top3 as $p) {
      $w = atlas_cache('wiki', $p['slug']);
      $vals = [];
      foreach ($w['monthly_all'] ?? [] as $k => $v) {
          if ($k >= '2019-01') $vals[] = [$k, $v];
      }
      $lines[] = ['name' => short_name($p), 'color' => $colors[$ci++], 'values' => $vals];
  }
  $heatCols = array_map('strval', range(1990, (int)date('Y')));
  $heatRows = [];
  foreach ($all as $p) {
      $pm = atlas_cache('pubmed', $p['slug']);
      if (!$pm) continue;
      $heatRows[] = ['label' => short_name($p), 'href' => url('peptide.php', ['p' => $p['slug']]), 'values' => $pm['years'] ?? []];
  }
  $phaseKeys = [
      ['key' => 'EARLY_PHASE1', 'label' => t('Early phase 1'), 'color' => 'var(--seq-200)'],
      ['key' => 'PHASE1', 'label' => t('Phase 1'), 'color' => 'var(--seq-300)'],
      ['key' => 'PHASE1/PHASE2', 'label' => t('Phase 1/2'), 'color' => 'var(--seq-400)'],
      ['key' => 'PHASE2', 'label' => t('Phase 2'), 'color' => 'var(--seq-500)'],
      ['key' => 'PHASE2/PHASE3', 'label' => t('Phase 2/3'), 'color' => 'var(--seq-600)'],
      ['key' => 'PHASE3', 'label' => t('Phase 3'), 'color' => 'var(--seq-700)'],
      ['key' => 'PHASE4', 'label' => t('Phase 4'), 'color' => 'var(--ink-2)'],
  ];
  $trialRows = [];
  foreach ($all as $p) {
      $ct = atlas_cache('ctgov', $p['slug']);
      if (!$ct || empty($ct['total'])) continue;
      $vals = [];
      foreach ($phaseKeys as $k) $vals[$k['key']] = $ct['phase'][$k['key']] ?? 0;
      if (array_sum($vals) === 0) continue;
      $trialRows[] = ['label' => short_name($p), 'href' => url('peptide.php', ['p' => $p['slug']]), 'values' => $vals, 't' => array_sum($vals)];
  }
  usort($trialRows, fn($a, $b) => $b['t'] <=> $a['t']);
  $hype = [];
  foreach ($all as $p) {
      if (empty($p['pop']['views_12m'])) continue;
      $hype[] = ['label' => short_name($p), 'x' => (int)$p['evidence'], 'y' => $p['pop']['views_12m'], 'href' => url('peptide.php', ['p' => $p['slug']]),
          'emph' => in_array($p['status'], ['research', 'clinical'], true), 'note' => status_label($p['status'])];
  }
  $bands = [];
  foreach (EVIDENCE as $n => $desc) {
      $bands[] = ['key' => $n, 'label' => (string)$n, 'sub' => t(['Cells/animals', 'Small human', 'Phase 1–2', 'Phase 3', 'Outcome trials'][$n - 1])];
  }
  ?>

  <section class="block" id="overview">
    <div class="block-head"><h2 class="section"><?= h(t('The field at a glance')) ?></h2><p><?= h(t('Live data, refreshed weekly from Wikimedia, PubMed and ClinicalTrials.gov.')) ?></p></div>
    <div class="grid-2">
      <figure class="chart">
        <header><h3><?= h(t("Where the world's attention goes")) ?></h3><p class="sub"><?= h(t('Wikipedia views in the last 12 months, all language editions combined, including redirects such as “Ozempic”.')) ?></p></header>
        <div class="chart-body" id="c-attn"></div>
      </figure>
      <div>
        <figure class="chart">
          <header><h3><?= h(t('The GLP-1 era, month by month')) ?></h3><p class="sub"><?= h(t('Monthly Wikipedia views since 2019, all languages: %s.', implode(is_zh() ? '、' : ', ', array_map(fn($p) => $p['name'], $top3)))) ?></p></header>
          <div class="chart-body" id="c-top3"></div>
        </figure>
        <figure class="chart" style="margin-top:36px">
          <header><h3><?= h(t('Registered clinical trials by phase')) ?></h3><p class="sub"><?= h(t('Interventional studies on ClinicalTrials.gov naming the peptide as an intervention.')) ?></p></header>
          <div class="chart-body" id="c-phases"></div>
        </figure>
      </div>
    </div>
    <figure class="chart" style="margin-top:44px">
      <header><h3><?= h(t('Attention versus evidence')) ?></h3><p class="sub"><?= h(t('Each dot is a peptide: how strong the human evidence is (1–5), against Wikipedia views in the last 12 months (log scale). Orange dots are not approved anywhere, yet several draw as much attention as established medicines.')) ?></p></header>
      <div class="chart-body" id="c-hype"></div>
    </figure>
    <figure class="chart" style="margin-top:44px">
      <header><h3><?= h(t('Research output, 1990–%s', date('Y'))) ?></h3><p class="sub"><?= h(t('PubMed papers per year mentioning each peptide in the title or abstract. %s is year to date.', date('Y'))) ?></p></header>
      <div class="chart-body" id="c-heat"></div>
    </figure>
  </section>
</div>
<script type="application/json" id="d-home"><?= json_embed([
    'attn' => $attn, 'lines' => $lines, 'heatRows' => $heatRows, 'heatCols' => $heatCols, 'phaseKeys' => $phaseKeys,
    'trialRows' => $trialRows, 'hype' => $hype, 'bands' => $bands,
    'txt' => [
        'views12' => t('views, 12 months'), 'views' => t('views'), 'papers' => t('papers'),
        'attnLabel' => t('Wikipedia views by peptide'), 'topLabel' => t('Monthly Wikipedia views, top three peptides'),
        'phaseLabel' => t('Trials by phase'), 'notApproved' => t('Not approved anywhere'), 'approved' => t('Approved somewhere'),
        'hypeLabel' => t('Attention versus evidence'), 'heatLabel' => t('PubMed papers per year'),
    ],
]) ?></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const d = Atlas.data('d-home');
  if (!d || !window.d3) return;
  const x = d.txt;
  Atlas.barList(document.getElementById('c-attn'), { data: d.attn, unit: x.views12, label: x.attnLabel });
  Atlas.lineChart(document.getElementById('c-top3'), { series: d.lines, height: 240, label: x.topLabel, unit: x.views });
  Atlas.stackedBars(document.getElementById('c-phases'), { keys: d.phaseKeys, data: d.trialRows.slice(0, 14), label: x.phaseLabel });
  Atlas.dotStrip(document.getElementById('c-hype'), { data: d.hype, bands: d.bands, unit: x.views12, emphLabel: x.notApproved, baseLabel: x.approved, label: x.hypeLabel });
  Atlas.heatmap(document.getElementById('c-heat'), { rows: d.heatRows, cols: d.heatCols, log: true, unit: x.papers, label: x.heatLabel });
});
</script>
<?php page_foot();
