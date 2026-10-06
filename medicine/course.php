<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$slug = (string)($_GET['c'] ?? '');
$c = ma_course($slug);
if (!$c) {
    http_response_code(404);
    page_head(t('Not found'));
    echo '<div class="wrap"><p class="lede" style="padding:60px 0">' . h(t('That course does not exist.')) . ' <a href="' . h(url('index.php')) . '">' . h(t('Back to the atlas')) . '</a></p></div>';
    page_foot();
    exit;
}
$idx = ma_index();
$sum = ['theorems' => 0, 'definitions' => 0, 'examples' => 0, 'exercises' => 0, 'widgets' => 0, 'words' => 0, 'written' => 0];
foreach ($c['chapters'] as $ch) {
    $s = $idx['chapters'][$slug . '/' . $ch['slug']] ?? [];
    if (!empty($s['missing'])) {
        continue;
    }
    $sum['written']++;
    foreach (['theorems', 'definitions', 'examples', 'exercises', 'widgets', 'words'] as $k) {
        $sum[$k] += $s[$k] ?? 0;
    }
}
$area = $c['area'];
page_head(md_plain($c['full_title'] ?? $c['title']), '', ['description' => md_plain($c['summary'] ?? '')]);
?>
<div class="wrap" style="--c:var(--a-<?= h($area) ?>);--on:var(--on-<?= h($area) ?>)">
  <?= crumbs([[h(t('Atlas')), url('index.php')], [h(area_label($area)), url('index.php', ['area' => $area])], [ma_inline($c['title'], $slug), null]]) ?>
  <header class="hero">
    <div>
      <div class="eyebrow"><?= area_chip($area) ?> · <?= h(t(LEVELS[$c['level']] ?? '')) ?></div>
      <h1 class="page-title" style="margin-top:10px"><?= ma_inline($c['full_title'] ?? $c['title'], $slug) ?></h1>
      <p class="tagline"><?= ma_inline($c['tagline'] ?? '', $slug) ?></p>
    </div>
    <div class="hero-side"><?= chapter_chain($c, ['unit' => 30]) ?>
      <?php $first = $c['chapters'][0]; $keys = []; foreach ($c['chapters'] as $ch) { if (empty($idx['chapters'][$slug . '/' . $ch['slug']]['missing'])) { $keys[] = ['k' => $slug . '/' . $ch['slug'], 'u' => url('lesson.php', ['c' => $slug, 'l' => $ch['slug']]), 't' => md_plain($ch['title']), 'n' => $ch['n']]; } } ?>
      <a class="w-btn primary course-go" href="<?= h(url('lesson.php', ['c' => $slug, 'l' => $first['slug']])) ?>" data-chapters="<?= h(json_encode($keys, JSON_UNESCAPED_UNICODE)) ?>" data-continue="<?= h(t('Continue: chapter %d')) ?>"><?= h(t('Start the course')) ?> →</a>
    </div>
  </header>

  <dl class="statline">
    <div><dt><?= h(t('Chapters')) ?></dt><dd><?= count($c['chapters']) ?></dd></div>
    <div><dt><?= h(t('Definitions and principles')) ?></dt><dd><?= $sum['theorems'] + $sum['definitions'] ?></dd></div>
    <div><dt><?= h(t('Worked examples')) ?></dt><dd><?= $sum['examples'] ?></dd></div>
    <div><dt><?= h(t('Exercises')) ?></dt><dd><?= $sum['exercises'] ?></dd></div>
    <div><dt><?= h(t('Reading time')) ?></dt><dd><?= $sum['words'] ? h(t('%d h', max(1, (int)round(reading_minutes($sum['words']) / 60)))) : '–' ?></dd></div>
  </dl>

  <div class="grid-2" style="grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);align-items:start">
    <section>
      <div class="prose" style="font-size:1.0625rem;line-height:1.65">
        <p><strong><?= ma_inline($c['summary'] ?? '', $slug) ?></strong></p>
        <?php foreach ($c['overview'] ?? [] as $p): ?><p><?= ma_inline($p, $slug) ?></p><?php endforeach; ?>
      </div>
    </section>
    <aside>
      <?php if (!empty($c['prerequisites'])): ?>
      <h2 class="eyebrow" style="margin-bottom:8px"><?= h(t('Before this course')) ?></h2>
      <div class="related" style="margin-bottom:22px"><?php foreach ($c['prerequisites'] as $p): $pc = ma_course($p); if (!$pc) continue; ?><a href="<?= h(url('course.php', ['c' => $p])) ?>" style="--c:var(--a-<?= h($pc['area']) ?>)"><i></i><?= ma_inline($pc['title'], $p) ?></a><?php endforeach; ?></div>
      <?php endif; ?>
      <?php if (!empty($c['outcomes'])): ?>
      <h2 class="eyebrow" style="margin-bottom:8px"><?= h(t('You will be able to')) ?></h2>
      <ul class="outcomes"><?php foreach ($c['outcomes'] as $o): ?><li><?= ma_inline($o, $slug) ?></li><?php endforeach; ?></ul>
      <?php endif; ?>
    </aside>
  </div>

  <section class="block">
    <div class="block-head"><h2 class="section"><?= h(t('Chapters')) ?></h2><p><?= h(t('%d of %d written', $sum['written'], count($c['chapters']))) ?></p></div>
    <ol class="chapter-list">
      <?php foreach ($c['chapters'] as $ch):
          $key = $slug . '/' . $ch['slug'];
          $s = $idx['chapters'][$key] ?? [];
          $missing = !empty($s['missing']); ?>
      <li class="<?= $missing ? 'is-missing' : '' ?>" data-key="<?= h($key) ?>">
        <span class="n"><?= (int)$ch['n'] ?></span>
        <div>
          <a class="t" href="<?= h(url('lesson.php', ['c' => $slug, 'l' => $ch['slug']])) ?>"><?= ma_inline($ch['title'], $slug) ?></a>
          <div class="s"><?= ma_inline($ch['summary'] ?? '', $slug) ?></div>
        </div>
        <div class="m"><?php if ($missing): ?><?= h(t('in preparation')) ?><?php else: ?>
          <?= h(t('%d min', reading_minutes((int)($s['words'] ?? 0)))) ?><br><?= h(t('%d examples · %d exercises', (int)($s['examples'] ?? 0), (int)($s['exercises'] ?? 0))) ?><?php endif; ?></div>
      </li>
      <?php endforeach; ?>
    </ol>
  </section>

  <?php if (!empty($c['history'])): ?>
  <section class="block">
    <div class="block-head"><h2 class="section"><?= h(t('History')) ?></h2><p><?= h(t('How the ideas in this course developed.')) ?></p></div>
    <ol class="tl">
      <?php $hist = $c['history']; usort($hist, fn($a, $b) => $a['year'] <=> $b['year']); foreach ($hist as $e): ?>
      <li><span class="yr"><?= h(year_label((int)$e['year'])) ?></span><span class="dot"></span><div>
        <span class="ev-title"><?= ma_inline($e['title'], $slug) ?></span><?php if (!empty($e['people'])): ?><span class="ev-meta"><?= h(implode(list_sep(), (array)$e['people'])) ?></span><?php endif; ?>
        <p class="ev-detail"><?= ma_inline($e['detail'], $slug) ?></p></div></li>
      <?php endforeach; ?>
    </ol>
  </section>
  <?php endif; ?>

  <?php if (!empty($c['references']) || !empty($c['next'])): ?>
  <section class="block grid-2">
    <?php if (!empty($c['references'])): ?>
    <div><h2 class="section" style="margin-bottom:14px"><?= h(t('Further reading')) ?></h2>
      <ol class="refs"><?php foreach ($c['references'] as $r): ?><li><b><?= ma_inline($r['title'], $slug) ?></b><?= !empty($r['authors']) ? ' — ' . h($r['authors']) : '' ?><?= !empty($r['year']) ? ' (' . (int)$r['year'] . ')' : '' ?><?= !empty($r['note']) ? '. ' . ma_inline($r['note'], $slug) : '' ?></li><?php endforeach; ?></ol>
    </div>
    <?php endif; ?>
    <?php if (!empty($c['next'])): ?>
    <div><h2 class="section" style="margin-bottom:14px"><?= h(t('Where to go next')) ?></h2>
      <div class="related"><?php foreach ($c['next'] as $p): $pc = ma_course($p); if (!$pc) continue; ?><a href="<?= h(url('course.php', ['c' => $p])) ?>" style="--c:var(--a-<?= h($pc['area']) ?>)"><i></i><?= ma_inline($pc['title'], $p) ?></a><?php endforeach; ?></div>
    </div>
    <?php endif; ?>
  </section>
  <?php endif; ?>
</div>
<?php page_foot();
