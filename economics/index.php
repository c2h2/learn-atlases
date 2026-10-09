<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$courses = ma_courses();
$idx = ma_index();
$tot = ma_totals();
page_head(site_name(), 'index');
?>
<div class="wrap">
  <section class="intro">
    <div>
      <h1 class="display"><?= h(site_name()) ?></h1>
      <p class="lede"><?= h(t('A detailed, interactive course through university economics and finance — from supply and demand to microeconomics and macroeconomics, econometrics and causal inference, game theory and market design, corporate finance and asset pricing, trade, development, and public and behavioural economics. For education only, not investment advice. This is a skeleton: the courses and chapters are mapped out, and the lessons are still to be written.')) ?></p>
    </div>
    <dl class="tally">
      <div><dt><?= h(t('Courses')) ?></dt><dd><?= fmt_num($tot['courses']) ?></dd></div>
      <div><dt><?= h(t('Chapters written')) ?></dt><dd><?= fmt_num($tot['chapters']) ?></dd></div>
      <div><dt><?= h(t('Theorems and definitions')) ?></dt><dd><?= fmt_num($tot['theorems'] + $tot['definitions']) ?></dd></div>
      <div><dt><?= h(t('Worked examples')) ?></dt><dd><?= fmt_num($tot['examples']) ?></dd></div>
      <div><dt><?= h(t('Exercises with solutions')) ?></dt><dd><?= fmt_num($tot['exercises']) ?></dd></div>
      <div><dt><?= h(t('Interactive figures')) ?></dt><dd><?= fmt_num($tot['widgets']) ?></dd></div>
    </dl>
  </section>

  <div class="controls" role="search">
    <label class="search"><?= icon('search') ?><input type="search" data-filter="q" placeholder="<?= h(t('Search courses and chapters…')) ?>" aria-label="<?= h(t('Search courses and chapters')) ?>"></label>
    <div class="chips" role="group" aria-label="<?= h(t('Area')) ?>">
      <button class="chip" type="button" data-filter="area" data-value="all" aria-pressed="true"><?= h(t('All areas')) ?></button>
      <?php foreach (AREAS as $k => $a): ?>
      <button class="chip" type="button" data-filter="area" data-value="<?= h($k) ?>" aria-pressed="false" style="--c:var(--a-<?= h($k) ?>)"><span class="dot"></span><?= h(t($a['label'])) ?></button>
      <?php endforeach; ?>
    </div>
    <select class="select" data-filter="year" aria-label="<?= h(t('Year of study')) ?>">
      <option value="all"><?= h(t('Any year')) ?></option>
      <?php foreach (LEVELS as $k => $l): ?><option value="<?= $k ?>"><?= h(t($l)) ?></option><?php endforeach; ?>
    </select>
    <span class="muted small"><span data-count></span> <?= h(t('courses')) ?></span>
  </div>

  <div class="atlas" id="atlas">
    <?php foreach (AREAS as $ak => $area):
        $list = array_filter($courses, fn($c) => $c['area'] === $ak);
        if (!$list) continue; ?>
    <section class="area-group" data-group="<?= h($ak) ?>" style="--c:var(--a-<?= h($ak) ?>)">
      <header><h2><i></i><?= h(t($area['label'])) ?></h2><p><?= h(t($area['blurb'])) ?></p></header>
      <?php foreach ($list as $c):
          $keys = [];
          $written = 0;
          $search = mb_strtolower(md_plain($c['title']) . ' ' . md_plain($c['full_title'] ?? '') . ' ' . md_plain($c['tagline'] ?? '') . ' ' . ($c['title_en'] ?? ''));
          foreach ($c['chapters'] as $ch) {
              $keys[] = $c['slug'] . '/' . $ch['slug'];
              $search .= ' ' . mb_strtolower(md_plain($ch['title']));
              $written += empty($idx['chapters'][$c['slug'] . '/' . $ch['slug']]['missing']) ? 1 : 0;
          } ?>
      <div class="course-row" data-search="<?= h($search) ?>" data-area="<?= h($c['area']) ?>" data-year="<?= (int)$c['level'] ?>" style="--c:var(--a-<?= h($c['area']) ?>)">
        <div class="yr"><?= h(t(LEVELS[$c['level']] ?? '')) ?></div>
        <div class="id">
          <a class="nm" href="<?= h(url('course.php', ['c' => $c['slug']])) ?>"><?= ma_inline($c['title'], $c['slug']) ?></a>
          <div class="tg"><?= ma_inline($c['tagline'] ?? '', $c['slug']) ?></div>
        </div>
        <div class="chain-cell"><?= chapter_chain($c, ['unit' => 28]) ?></div>
        <div class="stats">
          <?= h(t('%d chapters', count($c['chapters']))) ?><?= $written < count($c['chapters']) ? ' · ' . h(t('%d written', $written)) : '' ?>
          <span class="prog" data-progress="<?= h(implode(' ', $keys)) ?>"><i></i></span>
          <span class="muted" data-progress-label></span>
        </div>
      </div>
      <?php endforeach; ?>
    </section>
    <?php endforeach; ?>
    <p class="muted" data-empty hidden style="padding:30px 0"><?= h(t('No course matches. Try another word or area.')) ?></p>
  </div>
</div>
<script>document.addEventListener('DOMContentLoaded',()=>MA.filterList(document.getElementById('atlas'),{rows:'.course-row'}));</script>
<?php page_foot();
