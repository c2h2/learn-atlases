<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$editions = read_json(ATLAS_CACHE . '/wiki/_editions.json')['editions'] ?? [];
$names = country_names();

$readers = ['_all' => []];
$trials = ['_all' => []];
$window = null;
$ranking = [];
$langIdx = [];
$langTotals = [];
foreach ($all as $slug => $p) {
    $c = atlas_cache('country', $slug);
    if ($c && !empty($c['windows']['current'])) {
        $window = $window ?? $c['windows']['current'];
        foreach ($c['windows']['current']['countries'] as $a2 => $v) {
            $n = numeric_from_a2($a2);
            if (!$n) continue;
            $readers[$slug][$n] = $v;
            $readers['_all'][$n] = ($readers['_all'][$n] ?? 0) + $v;
        }
    }
    $ct = atlas_cache('ctgov', $slug);
    foreach ($ct['countries'] ?? [] as $name => $cnt) {
        $n = country_numeric($name);
        if (!$n) continue;
        $trials[$slug][$n] = ($trials[$slug][$n] ?? 0) + $cnt;
        $trials['_all'][$n] = ($trials['_all'][$n] ?? 0) + $cnt;
    }
    $w = atlas_cache('wiki', $slug);
    if ($w) {
        foreach ($w['langs'] ?? [] as $code => $L) {
            $v = $L['views'] ?? [];
            ksort($v);
            $keys = array_slice(array_keys($v), -12);
            $v12 = array_sum(array_slice($v, -12, 12, true));
            $ed = 0;
            foreach ($keys as $k) $ed += $editions[$code][$k] ?? 0;
            if ($ed >= 5e7 && $v12 > 0) {
                $langIdx[$slug][$code] = $v12 / $ed * 1e6;
                $langTotals[$code] = ($langTotals[$code] ?? 0) + $v12;
            }
        }
    }
    $topCountry = null;
    if (!empty($readers[$slug])) {
        arsort($readers[$slug]);
        $topCountry = $names[array_key_first($readers[$slug])] ?? null;
    }
    if (!empty($p['pop'])) {
        $ranking[] = ['slug' => $slug, 'name' => $p['name'], 'short' => short_name($p), 'v12' => $p['pop']['views_12m'], 'yoy' => $p['pop']['yoy'],
            'langs' => $p['pop']['langs'], 'spark' => $p['pop']['spark'], 'top' => $topCountry,
            'papers' => $p['papers']['total'] ?? null, 'trials' => $p['trials']['total'] ?? null, 'status' => $p['status']];
    }
}
usort($ranking, fn($a, $b) => $b['v12'] <=> $a['v12']);
arsort($langTotals);
$topLangs = array_slice(array_keys($langTotals), 0, 18);
$heatRows = [];
foreach ($ranking as $r) {
    $vals = [];
    foreach ($topLangs as $code) {
        if (isset($langIdx[$r['slug']][$code])) $vals[lang_name($code)] = round($langIdx[$r['slug']][$code], 2);
    }
    $heatRows[] = ['label' => $r['short'], 'href' => url('peptide.php', ['p' => $r['slug']]), 'values' => $vals];
}
$momentum = array_values(array_filter($ranking, fn($r) => $r['yoy'] !== null && $r['v12'] >= 20000));
// baseline: how all of Wikipedia (the editions these articles appear in) moved over the same 12 months
$wikiCur = $wikiPrev = 0;
foreach ($editions as $m) {
    ksort($m);
    $v = array_values($m);
    if (count($v) >= 24) {
        $wikiCur += array_sum(array_slice($v, -12));
        $wikiPrev += array_sum(array_slice($v, -24, 12));
    }
}
$wikiYoy = $wikiPrev > 0 ? ($wikiCur - $wikiPrev) / $wikiPrev : null;
usort($momentum, fn($a, $b) => $b['yoy'] <=> $a['yoy']);
$options = ['_all' => t('All peptides combined')];
foreach ($ranking as $r) $options[$r['slug']] = $r['name'];
foreach ($all as $slug => $p) if (!isset($options[$slug])) $options[$slug] = $p['name'];

page_head(t('World'), 'world', [
    'description' => t('Where in the world people read about and research peptides: Wikipedia readership by country and language, and clinical-trial sites.'),
    'scripts' => ['assets/vendor/d3.min.js', 'assets/vendor/topojson.min.js', 'assets/js/charts.js'],
]);
?>
<div class="wrap">
  <header style="padding:40px 0 6px">
    <h1 class="page-title"><?= h(t('World')) ?></h1>
    <p class="lede" style="margin-top:14px"><?= h(t('Who is paying attention, and where the science happens. Readership comes from Wikipedia in every language; trial sites from ClinicalTrials.gov.')) ?></p>
  </header>

  <section class="block" style="padding-top:26px">
    <div class="controls" style="position:static;border-top:0">
      <label class="control-label"><?= h(t('Peptide')) ?>
        <select id="w-pep" class="select"><?php foreach ($options as $k => $label): ?><option value="<?= h($k) ?>"><?= h($label) ?></option><?php endforeach; ?></select>
      </label>
      <div class="chips" role="group" aria-label="<?= h(t('Map measure')) ?>">
        <button class="chip" type="button" data-m="readers" aria-pressed="true"><?= h(t('Wikipedia readers')) ?></button>
        <button class="chip" type="button" data-m="trials" aria-pressed="false"><?= h(t('Clinical-trial sites')) ?></button>
      </div>
    </div>
    <figure class="chart">
      <header><h3 id="w-title"><?= h(t('Wikipedia readers by country')) ?></h3><p class="sub" id="w-sub"></p></header>
      <div class="chart-body map-wrap" id="w-map"></div>
    </figure>
  </section>

  <section class="block">
    <div class="block-head"><h2 class="section"><?= h(t('Attention ranking')) ?></h2><p><?= h(t('All language editions, human traffic only, last 12 months.')) ?></p></div>
    <div class="table-scroll">
      <table class="data-table">
        <thead><tr><th><?= h(t('Peptide')) ?></th><th><?= h(t('Monthly views, last 6 years')) ?></th><th class="n"><?= h(t('Views, 12 months')) ?></th><th class="n"><?= h(t('vs year before')) ?></th><th class="n"><?= h(t('Languages')) ?></th><th><?= h(t('Most readers in')) ?></th><th class="n"><?= h(t('Papers')) ?></th><th class="n"><?= h(t('Trials')) ?></th></tr></thead>
        <tbody>
          <?php foreach ($ranking as $r): ?>
            <tr>
              <td><a href="<?= h(url('peptide.php', ['p' => $r['slug']])) ?>"><b><?= h($r['name']) ?></b></a><br><?= status_badge($r['status']) ?></td>
              <td style="width:170px"><?= sparkline_svg($r['spark'], 160, 30) ?></td>
              <td class="n"><?= number_format($r['v12']) ?></td>
              <td class="n"><?= $r['yoy'] !== null ? h(sprintf('%+d%%', round($r['yoy'] * 100))) : '–' ?></td>
              <td class="n"><?= (int)$r['langs'] ?></td>
              <td><?= h($r['top'] ?? '–') ?></td>
              <td class="n"><?= $r['papers'] !== null ? number_format($r['papers']) : '–' ?></td>
              <td class="n"><?= $r['trials'] !== null ? number_format($r['trials']) : '–' ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </section>

  <section class="block">
    <div class="grid-2" style="grid-template-columns:minmax(0,1fr) minmax(0,1.3fr)">
      <figure class="chart">
        <header><h3><?= h(t('Momentum')) ?></h3><p class="sub"><?= h(t('Change in Wikipedia views, last 12 months against the 12 months before, for peptides with at least 20,000 views a year.')) ?><?php if ($wikiYoy !== null): ?> <?= h(t('The black line marks all of Wikipedia over the same period (%s), as readers increasingly get answers elsewhere.', sprintf('%+d%%', round($wikiYoy * 100)))) ?><?php endif; ?></p></header>
        <div class="chart-body" id="w-mom"></div>
      </figure>
      <figure class="chart">
        <header><h3><?= h(t('Interest by language')) ?></h3><p class="sub"><?= h(t('Views per million pageviews of each Wikipedia edition, last 12 months. The index corrects for edition size, so it shows where a topic is relatively popular, not just where readers are most numerous.')) ?></p></header>
        <div class="chart-body" id="w-lang"></div>
      </figure>
    </div>
  </section>
</div>
<script type="application/json" id="d-world"><?= json_embed([
    'readers' => $readers, 'trials' => $trials, 'names' => $names,
    'window' => $window ? ['from' => fmt_date($window['from']), 'to' => fmt_date($window['to']), 'days' => $window['days']] : null,
    'momentum' => array_map(fn($r) => ['label' => $r['short'], 'value' => round($r['yoy'] * 100), 'href' => url('peptide.php', ['p' => $r['slug']])], $momentum),
    'heatRows' => $heatRows, 'heatCols' => array_map('lang_name', $topLangs),
    'wikiYoy' => $wikiYoy !== null ? (int)round($wikiYoy * 100) : null,
    'txt' => [
        'readersTitle' => t('Wikipedia readers by country: '), 'trialsTitle' => t('Clinical-trial sites by country: '),
        'readersSub' => $window ? t("Views of the article in any language, %s to %s. Wikimedia's privacy protection only publishes a country when it sends more than about 90 views to a page in a day, so small audiences are missing.", fmt_date($window['from']), fmt_date($window['to'])) : '',
        'noCountry' => t('No country data yet.'), 'trialsSub' => t('Number of registered studies with at least one site in each country (ClinicalTrials.gov).'),
        'noReaders' => t('No single country passes the daily privacy threshold for this article.'), 'noSites' => t('No registered trial sites.'),
        'views' => t('views'), 'studies' => t('studies'), 'mapLabel' => t('World map'), 'changeViews' => t('change in views'),
        'momLabel' => t('Year-on-year change in Wikipedia views'), 'allWiki' => t('All Wikipedia'), 'perMillion' => t('per million'), 'langLabel' => t('Interest by language'),
    ],
]) ?></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const d = Atlas.data('d-world');
  if (!d || !window.d3) return;
  const x = d.txt;
  const sel = document.getElementById('w-pep');
  const chips = Array.from(document.querySelectorAll('[data-m]'));
  const params = new URLSearchParams(location.search);
  let measure = params.get('m') === 'trials' ? 'trials' : 'readers';
  if (params.get('p') && [...sel.options].some((o) => o.value === params.get('p'))) sel.value = params.get('p');
  const draw = () => {
    const key = sel.value;
    const vals = (measure === 'readers' ? d.readers : d.trials)[key] || {};
    const name = sel.options[sel.selectedIndex].text;
    document.getElementById('w-title').textContent = (measure === 'readers' ? x.readersTitle : x.trialsTitle) + name;
    document.getElementById('w-sub').textContent = measure === 'readers' ? (d.window ? x.readersSub : x.noCountry) : x.trialsSub;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.m === measure)));
    const host = document.getElementById('w-map');
    host.replaceChildren();
    const fig = host.closest('figure');
    fig.querySelectorAll(':scope > .scale-legend, :scope > details.table-view').forEach((x) => x.remove());
    if (!Object.keys(vals).length) { host.append(Atlas.el('p', { class: 'empty-note', text: measure === 'readers' ? x.noReaders : x.noSites })); return; }
    Atlas.choropleth(host, { values: vals, names: d.names, unit: measure === 'readers' ? x.views : x.studies, worldUrl: 'assets/geo/countries-110m.json', label: x.mapLabel });
    const u = new URLSearchParams(); if (params.get('lang')) u.set('lang', params.get('lang')); if (key !== '_all') u.set('p', key); if (measure === 'trials') u.set('m', 'trials');
    history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
  };
  sel.addEventListener('input', draw);
  chips.forEach((c) => c.addEventListener('click', () => { measure = c.dataset.m; draw(); }));
  draw();
  Atlas.divergingBars(document.getElementById('w-mom'), { data: d.momentum, unit: x.changeViews, format: (v) => (v > 0 ? '+' : '') + v + '%', label: x.momLabel,
    ref: d.wikiYoy !== null ? { value: d.wikiYoy, label: x.allWiki + ' ' + (d.wikiYoy > 0 ? '+' : '') + d.wikiYoy + '%' } : null });
  Atlas.heatmap(document.getElementById('w-lang'), { rows: d.heatRows, cols: d.heatCols, log: true, unit: x.perMillion, label: x.langLabel });
});
</script>
<?php page_foot();
