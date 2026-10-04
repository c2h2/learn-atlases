<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$courses = ma_courses();
$idx = ma_index();

// ---- layered layout: column = longest prerequisite chain, rows ordered by barycentre ----
$depth = [];
$calc = function (string $s) use (&$calc, &$depth, $courses): int {
    if (isset($depth[$s])) {
        return $depth[$s];
    }
    $depth[$s] = 0;
    $d = 0;
    foreach ($courses[$s]['prerequisites'] ?? [] as $p) {
        if (isset($courses[$p])) {
            $d = max($d, $calc($p) + 1);
        }
    }
    return $depth[$s] = $d;
};
foreach (array_keys($courses) as $s) {
    $calc($s);
}
$cols = [];
foreach ($courses as $s => $c) {
    $cols[$depth[$s]][] = $s;
}
ksort($cols);
$rowOf = [];
foreach ($cols as $d => &$list) {
    if ($d > 0) {
        $bary = [];
        foreach ($list as $s) {
            $ps = array_filter($courses[$s]['prerequisites'] ?? [], fn($p) => isset($rowOf[$p]));
            $bary[$s] = $ps ? array_sum(array_map(fn($p) => $rowOf[$p], $ps)) / count($ps) : 99;
        }
        usort($list, fn($a, $b) => [$bary[$a], $courses[$a]['order']] <=> [$bary[$b], $courses[$b]['order']]);
    }
    foreach ($list as $i => $s) {
        $rowOf[$s] = $i - (count($list) - 1) / 2;
    }
}
unset($list);
$nodeW = 196;
$nodeH = 54;
$colGap = 76;
$rowGap = 22;
$maxRows = max(array_map('count', $cols));
$W = count($cols) * $nodeW + (count($cols) - 1) * $colGap + 40;
$H = $maxRows * $nodeH + ($maxRows - 1) * $rowGap + 40;
$pos = [];
foreach ($cols as $d => $list) {
    $n = count($list);
    $top = ($H - ($n * $nodeH + ($n - 1) * $rowGap)) / 2;
    foreach ($list as $i => $s) {
        $pos[$s] = [20 + $d * ($nodeW + $colGap), $top + $i * ($nodeH + $rowGap)];
    }
}

$PATHS = [
    'pure' => ['Pure mathematics', ['proofs', 'calculus-1', 'calculus-2', 'linear-algebra', 'real-analysis', 'abstract-algebra', 'complex-analysis', 'topology', 'measure-theory', 'number-theory', 'differential-geometry']],
    'applied' => ['Applied mathematics and physics', ['calculus-1', 'calculus-2', 'linear-algebra', 'multivariable', 'ode', 'complex-analysis', 'pde', 'numerical-analysis', 'differential-geometry']],
    'stats' => ['Statistics and data science', ['proofs', 'calculus-1', 'calculus-2', 'linear-algebra', 'discrete', 'multivariable', 'probability', 'statistics', 'numerical-analysis', 'measure-theory']],
    'cs' => ['Computer science', ['proofs', 'discrete', 'linear-algebra', 'calculus-1', 'number-theory', 'probability', 'abstract-algebra', 'numerical-analysis']],
];
page_head(t('Map'), 'map', ['description' => t('How the courses depend on each other, and suggested pathways through the atlas.')]);
?>
<div class="wrap">
  <header class="lesson-hero">
    <h1 class="page-title"><?= h(t('Map of the courses')) ?></h1>
    <p class="lede"><?= h(t('Each arrow points from a course to one that builds on it. Hover over a course to see everything it needs and everything it leads to, or pick a pathway.')) ?></p>
  </header>
  <div class="controls" style="border-top:0">
    <div class="chips" role="group" aria-label="<?= h(t('Pathways')) ?>">
      <button class="chip" type="button" data-path="" aria-pressed="true"><?= h(t('All courses')) ?></button>
      <?php foreach ($PATHS as $k => [$label, $list]): ?>
      <button class="chip" type="button" data-path="<?= h(implode(' ', $list)) ?>" aria-pressed="false"><?= h(t($label)) ?></button>
      <?php endforeach; ?>
    </div>
  </div>
  <div class="map-stage" style="margin-top:16px;overflow-x:auto">
    <svg id="course-map" viewBox="0 0 <?= (int)$W ?> <?= (int)$H ?>" style="min-width:<?= (int)min($W, 1100) ?>px" role="img" aria-label="<?= h(t('Prerequisite map of the courses')) ?>">
      <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,1 L10,5 L0,9 z" style="fill:var(--rule-2)"/></marker></defs>
      <?php foreach ($courses as $s => $c): foreach ($c['prerequisites'] ?? [] as $p): if (!isset($pos[$p])) continue;
          [$x1, $y1] = $pos[$p]; [$x2, $y2] = $pos[$s];
          $ax = $x1 + $nodeW; $ay = $y1 + $nodeH / 2; $bx = $x2; $by = $y2 + $nodeH / 2; $mx = ($ax + $bx) / 2; ?>
      <path class="edge" data-from="<?= h($p) ?>" data-to="<?= h($s) ?>" d="M<?= $ax ?>,<?= $ay ?> C<?= $mx ?>,<?= $ay ?> <?= $mx ?>,<?= $by ?> <?= $bx - 3 ?>,<?= $by ?>" marker-end="url(#arr)"/>
      <?php endforeach; endforeach; ?>
      <?php foreach ($courses as $s => $c): [$x, $y] = $pos[$s];
          $written = 0; foreach ($c['chapters'] as $ch) { $written += empty($idx['chapters'][$s . '/' . $ch['slug']]['missing']) ? 1 : 0; } ?>
      <a class="node" href="<?= h(url('course.php', ['c' => $s])) ?>" data-slug="<?= h($s) ?>" data-pre="<?= h(implode(' ', $c['prerequisites'] ?? [])) ?>" style="--c:var(--a-<?= h($c['area']) ?>)">
        <rect x="<?= $x ?>" y="<?= $y ?>" width="<?= $nodeW ?>" height="<?= $nodeH ?>" rx="10"/>
        <rect x="<?= $x ?>" y="<?= $y ?>" width="6" height="<?= $nodeH ?>" rx="3" style="fill:var(--c);stroke:none"/>
        <text x="<?= $x + 16 ?>" y="<?= $y + 23 ?>"><?= h(md_plain($c['title'])) ?></text>
        <text class="sub" x="<?= $x + 16 ?>" y="<?= $y + 41 ?>"><?= h(t(LEVELS[$c['level']] ?? '')) ?> · <?= h(t('%d chapters', count($c['chapters']))) ?></text>
      </a>
      <?php endforeach; ?>
    </svg>
  </div>
  <div class="legend chips" style="margin-top:14px;gap:6px 18px">
    <?php foreach (AREAS as $k => $a): ?><span class="area-chip" style="--c:var(--a-<?= h($k) ?>)"><i></i><?= h(t($a['label'])) ?></span><?php endforeach; ?>
  </div>

  <section class="block">
    <div class="block-head"><h2 class="section"><?= h(t('Chapter by chapter')) ?></h2><p><?= h(t('Every chapter lists the chapters it builds on; follow the links to fill any gaps.')) ?></p></div>
    <div class="grid-3">
      <?php foreach ($courses as $s => $c): ?>
      <div>
        <h3 class="sub" style="display:flex;align-items:center;gap:8px"><span class="area-chip" style="--c:var(--a-<?= h($c['area']) ?>)"><i></i></span><a href="<?= h(url('course.php', ['c' => $s])) ?>" style="color:var(--ink);text-decoration:none"><?= h(md_plain($c['title'])) ?></a></h3>
        <ol class="small" style="padding-left:1.4em;margin:6px 0 0;color:var(--ink-2)">
          <?php foreach ($c['chapters'] as $ch): $req = ma_requires($ch); ?>
          <li style="padding:2px 0"><a href="<?= h(url('lesson.php', ['c' => $s, 'l' => $ch['slug']])) ?>"><?= h(md_plain($ch['title'])) ?></a><?php
            $ext = array_filter($req, fn($r) => !str_starts_with($r, $s . '/'));
            if ($ext): ?> <span class="muted">← <?= h(implode(list_sep(), array_map(function ($r) { [$rc, $rl] = explode('/', $r); return md_plain(ma_course($rc)['title']) . ': ' . md_plain(ma_chapter_meta($rc, $rl)['title']); }, $ext))) ?></span><?php endif; ?></li>
          <?php endforeach; ?>
        </ol>
      </div>
      <?php endforeach; ?>
    </div>
  </section>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('course-map');
  const nodes = Array.from(svg.querySelectorAll('.node'));
  const edges = Array.from(svg.querySelectorAll('.edge'));
  const pre = new Map(nodes.map((n) => [n.dataset.slug, n.dataset.pre.split(' ').filter(Boolean)]));
  const post = new Map(nodes.map((n) => [n.dataset.slug, []]));
  pre.forEach((ps, s) => ps.forEach((p) => post.has(p) && post.get(p).push(s)));
  const closure = (s, g, acc = new Set()) => { (g.get(s) || []).forEach((q) => { if (!acc.has(q)) { acc.add(q); closure(q, g, acc); } }); return acc; };
  const show = (set) => {
    nodes.forEach((n) => { n.classList.toggle('dim', !!set && !set.has(n.dataset.slug)); n.classList.toggle('hot', !!set && set.has(n.dataset.slug)); });
    edges.forEach((e) => e.classList.toggle('hot', !!set && set.has(e.dataset.from) && set.has(e.dataset.to)));
  };
  let pinned = null;
  nodes.forEach((n) => {
    n.addEventListener('pointerenter', () => { const s = n.dataset.slug; show(new Set([s, ...closure(s, pre), ...closure(s, post)])); });
    n.addEventListener('pointerleave', () => show(pinned));
  });
  document.querySelectorAll('[data-path]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-path]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    pinned = b.dataset.path ? new Set(b.dataset.path.split(' ')) : null;
    show(pinned);
  }));
});
</script>
<?php page_foot();
