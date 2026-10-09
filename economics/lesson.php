<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$cslug = (string)($_GET['c'] ?? '');
$lslug = (string)($_GET['l'] ?? '');
$course = ma_course($cslug);
$ch = $course ? ma_chapter_meta($cslug, $lslug) : null;
if (!$course || !$ch) {
    http_response_code(404);
    page_head(t('Not found'));
    echo '<div class="wrap"><p class="lede" style="padding:60px 0">' . h(t('That lesson does not exist.')) . ' <a href="' . h(url('index.php')) . '">' . h(t('Back to the atlas')) . '</a></p></div>';
    page_foot();
    exit;
}
$lesson = ma_lesson($cslug, $lslug);
$area = $course['area'];
$chapters = $course['chapters'];
$i = $ch['n'] - 1;
$prev = $chapters[$i - 1] ?? null;
$next = $chapters[$i + 1] ?? null;
$idx = ma_index();
$stats = $idx['chapters']["$cslug/$lslug"] ?? [];

// figure scripts for the types used on this page
$scripts = ['assets/js/lesson.js'];
if ($lesson && $lesson['widgets']) {
    $cat = read_json(MA_DATA . '/widgets.json')['types'] ?? [];
    $files = [];
    foreach ($lesson['widgets'] as $w) {
        $f = $cat[$w['type']]['file'] ?? null;
        if ($f && is_file(MA_ROOT . "/assets/js/widgets/$f.js")) {
            $files[$f] = true;
        }
    }
    array_unshift($scripts, 'assets/vendor/katex/katex.min.js', 'assets/js/expr.js', 'assets/js/plot.js');
    foreach (array_keys($files) as $f) {
        $scripts[] = "assets/js/widgets/$f.js";
    }
}
$titlePlain = md_plain($ch['title']);
page_head($titlePlain . ' · ' . md_plain($course['title']), '', ['scripts' => $scripts, 'description' => md_plain($ch['summary'] ?? '')]);
?>
<div class="wrap">
  <?= crumbs([[h(t('Atlas')), url('index.php')], [ma_inline($course['title'], $cslug), url('course.php', ['c' => $cslug])], [h(t('Chapter %d', $ch['n'])), null]]) ?>
  <header class="lesson-hero">
    <div class="eyebrow"><span class="area-chip" style="--c:var(--a-<?= h($area) ?>)"><i></i><a href="<?= h(url('course.php', ['c' => $cslug])) ?>"><?= ma_inline($course['title'], $cslug) ?></a></span> · <?= h(t('Chapter %d of %d', $ch['n'], count($chapters))) ?></div>
    <h1 class="page-title"><?= ma_inline($ch['title'], $cslug) ?></h1>
    <?php if (!empty($ch['summary'])): ?><p class="lede"><?= ma_inline($ch['summary'], $cslug) ?></p><?php endif; ?>
    <?php if ($lesson): ?>
    <div class="lesson-meta">
      <span><?= icon('clock') ?><?= h(t('About %d min read', reading_minutes((int)$lesson['words']))) ?></span>
      <?php if (($stats['definitions'] ?? 0) + ($stats['theorems'] ?? 0)): ?><span><?= h(t('%d definitions and theorems', ($stats['definitions'] ?? 0) + ($stats['theorems'] ?? 0))) ?></span><?php endif; ?>
      <?php if (!empty($stats['examples'])): ?><span><?= h(t('%d worked examples', $stats['examples'])) ?></span><?php endif; ?>
      <?php if (!empty($stats['exercises'])): ?><span><?= h(t('%d exercises', $stats['exercises'])) ?></span><?php endif; ?>
      <?php if (!empty($stats['widgets'])): ?><span><?= h(t('%d interactive figures', $stats['widgets'])) ?></span><?php endif; ?>
    </div>
    <?php endif; ?>
    <?php $req = ma_requires($ch); if ($req): ?>
    <div class="prereq"><span><?= h(t('Builds on')) ?></span>
      <?php foreach ($req as $r): [$rc, $rl] = explode('/', $r); $rm = ma_chapter_meta($rc, $rl); ?>
      <a href="<?= h(url('lesson.php', ['c' => $rc, 'l' => $rl])) ?>"><?= h(md_plain($rm['title'])) ?><?= $rc !== $cslug ? ' · ' . h(md_plain(ma_course($rc)['title'])) : '' ?></a>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
    <?php if ($lesson): ?><button class="done-toggle" type="button" aria-pressed="false" data-done="<?= h("$cslug/$lslug") ?>"><?= icon('check') ?><span><?= h(t('Mark as read')) ?></span></button><?php endif; ?>
  </header>
  <?php if (!$lesson): ?>
    <p class="callout"><?= h(t('This chapter is still to be written: the atlas is a skeleton so far. The summary above and the chapters it builds on show where it fits in the course.')) ?></p>
  <?php else: ?>
    <?php if (is_zh() && $lesson['src_lang'] === 'en'): ?><p class="callout" lang="zh-CN">本章的中文版尚未完成，下面显示英文原文。界面、目录和课程信息均已翻译。</p><?php endif; ?>
  <div class="lesson-layout">
    <aside class="lesson-toc" aria-label="<?= h(t('On this page')) ?>">
      <div class="toc-toggle"><button type="button" aria-expanded="false"><?= h(t('Contents')) ?></button></div>
      <div class="toc-body">
        <h2><?= h(t('On this page')) ?></h2>
        <ol>
          <?php foreach ($lesson['toc'] as $t): if ($t['level'] > 3) continue; ?>
          <li class="l<?= (int)$t['level'] ?>"><a href="#<?= h($t['id']) ?>"><?= md_inline($t['title']) ?></a></li>
          <?php endforeach; ?>
        </ol>
        <h2><?= ma_inline($course['title'], $cslug) ?></h2>
        <div class="course-mini"><?= chapter_chain($course, ['unit' => 22]) ?></div>
      </div>
    </aside>
    <article class="lesson-body" lang="<?= h(LANGS[$lesson['src_lang']]['html']) ?>" data-current="<?= h("$cslug/$lslug") ?>">
      <?= $lesson['html'] ?>
      <nav class="lesson-foot" aria-label="<?= h(t('Chapters')) ?>">
        <?php if ($prev): ?><a class="prev" href="<?= h(url('lesson.php', ['c' => $cslug, 'l' => $prev['slug']])) ?>"><div class="dir">← <?= h(t('Previous')) ?></div><div class="t"><?= ma_inline($prev['title'], $cslug) ?></div></a><?php endif; ?>
        <?php if ($next): ?><a class="next" href="<?= h(url('lesson.php', ['c' => $cslug, 'l' => $next['slug']])) ?>"><div class="dir"><?= h(t('Next')) ?> →</div><div class="t"><?= ma_inline($next['title'], $cslug) ?></div></a>
        <?php else: ?><a class="next" href="<?= h(url('course.php', ['c' => $cslug])) ?>"><div class="dir"><?= h(t('End of course')) ?> →</div><div class="t"><?= ma_inline($course['title'], $cslug) ?></div></a><?php endif; ?>
      </nav>
      <?php
      $page_url = (($_SERVER['HTTPS'] ?? 'off') !== 'off' ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'f.g77k.com') . ($_SERVER['REQUEST_URI'] ?? '');
      $issue = MA_ISSUES_URL . '/new?' . http_build_query([
          'title' => "[economics] $cslug/$lslug: ",
          'body' => "Page: $page_url\nWhere (theorem, example or exercise number):\nWhat is wrong:\n",
      ]);
      ?>
      <p class="lesson-report"><?= sprintf(h(t('Found a mistake on this page? %s')), '<a href="' . h($issue) . '">' . h(t('Report it on GitHub')) . '</a>') ?></p>
    </article>
  </div>
  <?php endif; ?>
</div>
<?php
echo '<script type="application/json" id="ma-macros">' . json_embed(read_json(MA_DATA . '/macros.json') ?? []) . '</script>';
page_foot();
