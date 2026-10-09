<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$courses = ma_courses();
$all = ma_collect()['items'];
$sel = (string)($_GET['c'] ?? '');
if ($sel !== '' && !isset($courses[$sel])) {
    $sel = '';
}
$KINDS = ['definition' => 'Definitions', 'theorem' => 'Rules'];
$counts = array_count_values(array_map(fn($i) => $i['kind'], $all));
page_head(t('Definitions and rules'), 'theorems', ['scripts' => ['assets/js/lesson.js'], 'description' => t('Every definition and rule in the atlas, with its statement and a link to the lesson.')]);
?>
<div class="wrap">
  <header class="lesson-hero">
    <h1 class="page-title"><?= h(t('Definitions and rules')) ?></h1>
    <p class="lede"><?= h(t('Every numbered definition and rule in the atlas with its exact statement. Follow a link to read the explanation, the examples around it and the exercises that use it.')) ?></p>
  </header>
  <dl class="statline">
    <div><dt><?= h(t('Definitions')) ?></dt><dd><?= (int)($counts['definition'] ?? 0) ?></dd></div>
    <div><dt><?= h(t('Rules')) ?></dt><dd><?= (int)($counts['theorem'] ?? 0) ?></dd></div>
    <div><dt><?= h(t('Courses')) ?></dt><dd><?= count(array_unique(array_map(fn($i) => $i['course'], $all))) ?></dd></div>
  </dl>
  <div class="controls" role="search">
    <label class="search"><?= icon('search') ?><input type="search" data-filter="q" placeholder="<?= h(t('Search statements…')) ?>" aria-label="<?= h(t('Search statements')) ?>"></label>
    <select class="select" data-filter="kind" aria-label="<?= h(t('Kind')) ?>">
      <option value="all"><?= h(t('All kinds')) ?></option>
      <?php foreach ($KINDS as $k => $l): ?><option value="<?= h($k) ?>"><?= h(t($l)) ?></option><?php endforeach; ?>
    </select>
    <select class="select" onchange="location.href=this.value" aria-label="<?= h(t('Course')) ?>">
      <option value="<?= h(url('theorems.php')) ?>"><?= h(t('All courses (names only)')) ?></option>
      <?php foreach ($courses as $s => $c): ?><option value="<?= h(url('theorems.php', ['c' => $s])) ?>"<?= $s === $sel ? ' selected' : '' ?>><?= h(md_plain($c['title'])) ?></option><?php endforeach; ?>
    </select>
    <span class="muted small"><span data-count></span> <?= h(t('results')) ?></span>
  </div>

  <div id="thm-index">
  <?php foreach ($courses as $s => $c):
      if ($sel !== '' && $s !== $sel) continue;
      $items = array_values(array_filter($all, fn($i) => $i['course'] === $s));
      if (!$items) continue; ?>
    <section class="area-group" data-group="<?= h($s) ?>" style="--c:var(--a-<?= h($c['area']) ?>)">
      <header><h2><i></i><a href="<?= h(url('course.php', ['c' => $s])) ?>" style="color:inherit;text-decoration:none"><?= ma_inline($c['title'], $s) ?></a></h2><p><?= h(t('%d results', count($items))) ?></p></header>
      <ul class="thm-list">
        <?php foreach ($items as $it):
            $ch = ma_chapter_meta($s, $it['chapter']);
            $label = t(MD_KINDS[$it['kind']][0] ?? ucfirst($it['kind'])) . ' ' . $it['num'];
            $titleHtml = $it['title'] !== '' ? md_inline($it['title']) : '';
            $plain = mb_strtolower(md_plain($it['title']) . ' ' . strip_tags($it['html']) . ' ' . $label . ' ' . md_plain($ch['title'] ?? ''));
            if ($sel === '') { $plain = mb_substr($plain, 0, 400); } ?>
        <li class="thm-item" data-search="<?= h($plain) ?>" data-kind="<?= h($it['kind']) ?>">
          <div class="h">
            <span class="kind-tag k-<?= h($it['kind']) ?>"><?= h(t(ucfirst($it['kind']))) ?></span>
            <a href="<?= h(url('lesson.php', ['c' => $s, 'l' => $it['chapter'], '#' => $it['id']])) ?>"><?= h($label) ?><?= $titleHtml !== '' ? ' · ' . $titleHtml : '' ?></a>
            <span class="src"><?= h(t('Chapter %d', $it['n'])) ?>: <?= ma_inline($ch['title'] ?? '', $s) ?></span>
          </div>
          <?php if ($sel !== ''): ?><div class="stmt lesson-body"><?= $it['html'] ?></div><?php endif; ?>
        </li>
        <?php endforeach; ?>
      </ul>
    </section>
  <?php endforeach; ?>
    <p class="muted" data-empty hidden style="padding:30px 0"><?= h(t('Nothing matches.')) ?></p>
    <?php if (!$all): ?><p class="callout"><?= h(t('The lessons are still being written; results appear here as soon as a chapter is published.')) ?></p><?php endif; ?>
  </div>
</div>
<script>document.addEventListener('DOMContentLoaded',()=>MA.filterList(document.getElementById('thm-index'),{rows:'.thm-item',groups:'[data-group]'}));</script>
<?php page_foot();
