<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$events = atlas_events();
$now = (int)date('Y');

// ---------- lifeline chart: discovery -> first human use -> first approval ----------
$lives = array_values(array_filter($all, fn($p) => !empty($p['discovery']['year'])));
usort($lives, fn($a, $b) => [$a['discovery']['year'], $a['name']] <=> [$b['discovery']['year'], $b['name']]);
$y0 = (int)(floor(min(1900, ...array_map(fn($p) => (int)$p['discovery']['year'], $lives ?: [['discovery' => ['year' => 1900]]])) / 10) * 10);
$y1 = $now + 1;
$rowH = 19;
$labelW = 168;
$W = 1100;
$plotW = $W - $labelW - 20;
$H = count($lives) * $rowH + 40;
$xOf = fn(float $y) => $labelW + ($y - $y0) / ($y1 - $y0) * $plotW;

function lifeline_svg(array $lives, callable $xOf, int $y0, int $y1, int $rowH, float $labelW, float $W, float $H, int $now): string
{
    $o = '<svg class="lifelines" viewBox="0 0 ' . $W . ' ' . $H . '" role="img" aria-label="Lifelines from discovery to approval for each peptide" style="width:100%;height:auto;display:block">';
    for ($y = $y0; $y <= $y1; $y += 10) {
        $x = round($xOf($y), 1);
        $o .= '<line x1="' . $x . '" y1="0" x2="' . $x . '" y2="' . ($H - 24) . '" style="stroke:var(--grid)"/>';
        $o .= '<text x="' . $x . '" y="' . ($H - 8) . '" text-anchor="middle" style="fill:var(--ink-3);font-size:11px">' . $y . '</text>';
    }
    foreach ($lives as $i => $p) {
        $cy = 10 + $i * $rowH;
        $d = (int)$p['discovery']['year'];
        $hu = $p['year_human'] ?? null;
        $ap = $p['approval_year'] ?? null;
        $href = h(url('peptide.php', ['p' => $p['slug']]));
        $apText = $ap ? t(', first approved %d', $ap) : (in_array($p['status'], ['approved', 'regional'], true) ? t(', approved (year not verified)') : t(', not approved'));
        $o .= '<a href="' . $href . '"><g class="life"><title>' . h($p['name'] . t(': discovered %d', $d) . ($hu ? t(', first human use %d', $hu) : '') . $apText) . '</title>';
        $o .= '<rect x="0" y="' . ($cy - $rowH / 2) . '" width="' . $W . '" height="' . $rowH . '" style="fill:transparent"/>';
        $o .= '<text x="' . ($labelW - 10) . '" y="' . $cy . '" dy="0.32em" text-anchor="end" style="fill:var(--ink);font-size:12px;font-weight:600">' . h(short_name($p)) . '</text>';
        $xd = round($xOf($d), 1);
        $xn = round($xOf($now + 0.75), 1);
        // research period (discovery to first human use or to now), then clinical period, then marketed
        $xh = $hu ? round($xOf(max($d, $hu)), 1) : $xn;
        $xa = $ap ? round($xOf(max($d, $ap)), 1) : null;
        $o .= '<line x1="' . $xd . '" y1="' . $cy . '" x2="' . $xh . '" y2="' . $cy . '" style="stroke:var(--deemph);stroke-width:2;stroke-linecap:round"/>';
        $undated = $xa === null && in_array($p['status'], ['approved', 'regional'], true);
        if ($hu && $undated) {
            // in medical use, approval year not verified: dashed ink rather than implying "trials only"
            $o .= '<line x1="' . $xh . '" y1="' . $cy . '" x2="' . $xn . '" y2="' . $cy . '" style="stroke:var(--ink);stroke-width:2.5;stroke-dasharray:5 4"/>';
        } elseif ($hu) {
            $o .= '<line x1="' . $xh . '" y1="' . $cy . '" x2="' . ($xa ?? $xn) . '" y2="' . $cy . '" style="stroke:var(--series-1);stroke-width:2;stroke-linecap:round"/>';
        }
        if ($xa !== null) {
            $o .= '<line x1="' . $xa . '" y1="' . $cy . '" x2="' . $xn . '" y2="' . $cy . '" style="stroke:var(--ink);stroke-width:4;stroke-linecap:round"/>';
        }
        $o .= '<circle cx="' . $xd . '" cy="' . $cy . '" r="4" style="fill:var(--sheet);stroke:var(--ink-3);stroke-width:1.6"/>';
        if ($hu) {
            $o .= '<circle cx="' . $xh . '" cy="' . $cy . '" r="4" style="fill:var(--series-1);stroke:var(--sheet);stroke-width:2"/>';
        }
        if ($xa !== null) {
            $o .= '<circle cx="' . $xa . '" cy="' . $cy . '" r="5" style="fill:var(--ink);stroke:var(--sheet);stroke-width:2"/>';
        } elseif (in_array($p['status'], ['approved', 'regional'], true)) {
            // approved somewhere, but no verified date: mark it at today rather than invent a year
            $o .= '<rect x="' . ($xn - 5) . '" y="' . ($cy - 5) . '" width="10" height="10" rx="1.5" style="fill:var(--ink);stroke:var(--sheet);stroke-width:2"/>';
        }
        $o .= '</g></a>';
    }
    return $o . '</svg>';
}

$decades = [];
foreach ($events as $e) {
    $decades[intdiv((int)$e['year'], 10) * 10][] = $e;
}
krsort($decades);
foreach ($decades as &$list) {
    $list = array_reverse($list);
}
unset($list);

page_head(t('Timeline'), 'timeline', ['description' => t('A century of peptide medicine: every discovery, trial, approval and controversy in the atlas on one timeline.')]);
?>
<div class="wrap">
  <header style="padding:40px 0 6px">
    <h1 class="page-title"><?= h(t('Timeline')) ?></h1>
    <p class="lede" style="margin-top:14px"><?= h(t('From secretin in 1902 to the triple agonists: %d dated events across %d peptides, newest first.', count($events), count($all))) ?></p>
  </header>

  <section class="block" style="padding-top:26px">
    <figure class="chart">
      <header><h3><?= h(t('From discovery to approval')) ?></h3><p class="sub"><?= h(t('Each line runs from discovery (open circle) through first documented human use (blue) to first approval anywhere (black), then on to today. Grey stretches are years spent in the lab.')) ?></p></header>
      <div class="chart-body" style="overflow-x:auto"><div style="min-width:760px"><?= lifeline_svg($lives, $xOf, $y0, $y1, $rowH, $labelW, $W, $H, $now) ?></div></div>
      <div class="chart-legend">
        <span class="k"><span class="ln" style="background:var(--deemph)"></span><?= h(t('Research only')) ?></span>
        <span class="k"><span class="ln" style="background:var(--series-1)"></span><?= h(t('In human trials or use')) ?></span>
        <span class="k"><span class="ln" style="background:var(--ink);height:4px"></span><?= h(t('Approved')) ?></span>
        <span class="k"><span class="ln" style="background:repeating-linear-gradient(90deg,var(--ink) 0 5px,transparent 5px 9px);height:3px"></span><?= h(t('In medical use, approval year not verified')) ?></span>
      </div>
      <details class="table-view"><summary><?= h(t('Show data table')) ?></summary><div class="table-scroll"><table class="data-table"><thead><tr><th><?= h(t('Peptide')) ?></th><th class="n"><?= h(t('Discovered')) ?></th><th class="n"><?= h(t('First human use')) ?></th><th class="n"><?= h(t('First approved')) ?></th><th class="n"><?= h(t('Years to approval')) ?></th></tr></thead><tbody>
        <?php foreach ($lives as $p): ?><tr><td><?= h($p['name']) ?></td><td class="n"><?= (int)$p['discovery']['year'] ?></td><td class="n"><?= $p['year_human'] ?? '–' ?></td><td class="n"><?= $p['approval_year'] ?? '–' ?></td><td class="n"><?= $p['approval_year'] ? max(0, $p['approval_year'] - (int)$p['discovery']['year']) : '–' ?></td></tr><?php endforeach; ?>
      </tbody></table></div></details>
    </figure>
  </section>

  <section class="block">
    <div class="controls" style="position:static;border-top:0;padding-top:0">
      <div class="chips" role="group" aria-label="<?= h(t('Event type')) ?>" id="kind-chips">
        <button class="chip" type="button" data-kind="all" aria-pressed="true"><?= h(t('All events')) ?></button>
        <?php foreach (EVENT_KINDS as $k => $label): ?><button class="chip" type="button" data-kind="<?= h($k) ?>" aria-pressed="false"><?= h(t($label)) ?></button><?php endforeach; ?>
      </div>
      <label class="control-label"><?= h(t('Family')) ?>
        <select id="tl-cat" class="select"><option value="all"><?= h(t('All families')) ?></option><?php foreach (CATEGORIES as $k => $c): ?><option value="<?= h($k) ?>"><?= h(t($c['label'])) ?></option><?php endforeach; ?><option value="field"><?= h(t('Field-wide milestones')) ?></option></select>
      </label>
      <label class="search"><?= icon('search') ?><input id="tl-q" type="search" placeholder="<?= h(t('Filter events')) ?>" aria-label="<?= h(t('Filter events')) ?>"></label>
      <span id="tl-count" class="muted small" aria-live="polite"></span>
    </div>
    <?php foreach ($decades as $dec => $list): ?>
      <section class="tl-decade" style="margin-top:34px">
        <h2 class="section" style="margin-bottom:16px"><?= h(is_zh() ? $dec . '年代' : $dec . 's') ?></h2>
        <ol class="tl">
          <?php foreach ($list as $e): ?>
            <li class="k-<?= h($e['kind']) ?>" data-kind="<?= h($e['kind']) ?>" data-cat="<?= h($e['category']) ?>" data-text="<?= h(mb_strtolower(($e['peptide'] ?? '') . ' ' . ($e['peptide_en'] ?? '') . ' ' . $e['title'] . ' ' . ($e['detail'] ?? ''))) ?>">
              <span class="yr"><?= h((string)$e['year']) ?></span><span class="dot" aria-hidden="true"></span>
              <div>
                <div class="ev-title"><?php if ($e['slug']): ?><a class="ev-peptide" href="<?= h(url('peptide.php', ['p' => $e['slug']])) ?>#history"><?= h($e['peptide']) ?></a><?= is_zh() ? '：' : ': ' ?><?php endif; ?><?= h($e['title']) ?><span class="kind-tag"><?= h(t(EVENT_KINDS[$e['kind']] ?? $e['kind'])) ?></span><?php if (!empty($e['date']) && strlen($e['date']) > 4): ?><span class="ev-meta"><?= h(fmt_date($e['date'])) ?></span><?php endif; ?></div>
                <?php if (!empty($e['detail'])): ?><p class="ev-detail"><?= h($e['detail']) ?></p><?php endif; ?>
              </div>
            </li>
          <?php endforeach; ?>
        </ol>
      </section>
    <?php endforeach; ?>
    <p id="tl-empty" class="reg-empty" hidden><?= h(t('No events match these filters.')) ?></p>
  </section>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.tl-decade li'));
  const chips = Array.from(document.querySelectorAll('#kind-chips [data-kind]'));
  const cat = document.getElementById('tl-cat'), q = document.getElementById('tl-q');
  let kind = 'all';
  const apply = () => {
    const needle = q.value.trim().toLowerCase();
    let n = 0;
    items.forEach((li) => {
      const ok = (kind === 'all' || li.dataset.kind === kind) && (cat.value === 'all' || li.dataset.cat === cat.value) && (!needle || li.dataset.text.includes(needle));
      li.hidden = !ok; if (ok) n++;
    });
    document.querySelectorAll('.tl-decade').forEach((s) => (s.hidden = !s.querySelector('li:not([hidden])')));
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.kind === kind)));
    document.getElementById('tl-count').textContent = Atlas.t(n === 1 ? '%d event' : '%d events').replace('%d', n);
    document.getElementById('tl-empty').hidden = n > 0;
  };
  chips.forEach((c) => c.addEventListener('click', () => { kind = c.dataset.kind; apply(); }));
  cat.addEventListener('input', apply); q.addEventListener('input', apply);
  apply();
});
</script>
<?php page_foot();
