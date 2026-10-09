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
$idx = ma_index();
$stats = $idx['chapters']["$cslug/$lslug"] ?? [];
$is_missing = fn(string $c, string $l): bool => !empty($idx['chapters']["$c/$l"]['missing']);
// previous and next written chapters, so navigation never lands on an empty page
$prev = $next = null;
foreach ($chapters as $i2 => $c2) {
    if ($c2['slug'] === $lslug) {
        for ($j = $i2 - 1; $j >= 0; $j--) { if (!$is_missing($cslug, $chapters[$j]['slug'])) { $prev = $chapters[$j]; break; } }
        for ($j = $i2 + 1; $j < count($chapters); $j++) { if (!$is_missing($cslug, $chapters[$j]['slug'])) { $next = $chapters[$j]; break; } }
        break;
    }
}

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
page_head($titlePlain . ' · ' . md_plain($course['title']), '', ['scripts' => $scripts, 'description' => md_plain($ch['summary'] ?? ''), 'robots' => $lesson ? '' : 'noindex']);
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
      <?php foreach ($req as $r): [$rc, $rl] = explode('/', $r); $rm = ma_chapter_meta($rc, $rl); $rReady = !$is_missing($rc, $rl); ?>
      <?php if ($rReady): ?><a href="<?= h(url('lesson.php', ['c' => $rc, 'l' => $rl])) ?>"><?= h(md_plain($rm['title'])) ?><?= $rc !== $cslug ? ' · ' . h(md_plain(ma_course($rc)['title'])) : '' ?></a>
      <?php else: ?><span class="muted"><?= h(md_plain($rm['title'])) ?><?= $rc !== $cslug ? ' · ' . h(md_plain(ma_course($rc)['title'])) : '' ?> · <?= h(t('in preparation')) ?></span><?php endif; ?>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
    <?php if ($lesson): ?><button class="done-toggle" type="button" aria-pressed="false" data-done="<?= h("$cslug/$lslug") ?>"><?= icon('check') ?><span><?= h(t('Mark as read')) ?></span></button><?php endif; ?>
  </header>
  <?php if (!$lesson): ?>
    <?php
    // An unwritten chapter: say so plainly, then make the page useful — what the chapter will cover,
    // what to read instead, and the outline the notice refers to.
    $others = is_zh() ? 'en' : 'zh';
    $otherReady = is_file(MA_CONTENT . "/$others/$cslug/$lslug.md");
    $ready = [];
    foreach ($chapters as $k => $c2) {
        if ($c2['slug'] !== $lslug && empty($idx['chapters']["$cslug/{$c2['slug']}"]['missing'])) {
            $ready[] = $c2;
        }
    }
    ?>
    <p class="callout"><?= h(t('This chapter is still being written. It will follow the pattern of every other chapter here: definitions and principles, explanations of mechanism, worked clinical cases, interactive figures and exercises with full answers.')) ?></p>
    <div class="related" style="margin:0 0 34px">
      <?php if ($otherReady): ?>
      <a href="<?= h(url('lesson.php', ['c' => $cslug, 'l' => $lslug, 'lang' => $others])) ?>" style="--c:var(--a-<?= h($area) ?>)"><i></i><?= h(is_zh() ? '用英文阅读本章' : 'Read this chapter in Chinese') ?></a>
      <?php endif; ?>
      <?php foreach ($ready as $r): ?>
      <a href="<?= h(url('lesson.php', ['c' => $cslug, 'l' => $r['slug']])) ?>" style="--c:var(--a-<?= h($area) ?>)"><i></i><?= h(t('Chapter %d', $r['n'])) ?> · <?= ma_inline($r['title'], $cslug) ?></a>
      <?php endforeach; ?>
      <a href="<?= h(url('course.php', ['c' => $cslug])) ?>" style="--c:var(--a-<?= h($area) ?>)"><i></i><?= h(t('About this course')) ?> · <?= ma_inline($course['title'], $cslug) ?></a>
    </div>
    <?php if (!empty($course['summary'])): ?>
    <section class="block" style="--c:var(--a-<?= h($area) ?>)">
      <div class="block-head"><h2 class="section"><?= h(t('About this course')) ?></h2><p><?= h(t('%d of %d written', count($ready) + 0, count($chapters))) ?></p></div>
      <div class="prose"><p><strong><?= ma_inline($course['summary'], $cslug) ?></strong></p></div>
    </section>
    <?php endif; ?>
    <section class="block" style="--c:var(--a-<?= h($area) ?>)">
      <div class="block-head"><h2 class="section"><?= h(t('Chapters')) ?></h2><p><?= h(t('Where this chapter fits.')) ?></p></div>
      <ol class="chapter-list">
        <?php foreach ($chapters as $c2):
            $key = "$cslug/{$c2['slug']}";
            $miss = !empty($idx['chapters'][$key]['missing']); ?>
        <li class="<?= $miss ? 'is-missing' : '' ?><?= $c2['slug'] === $lslug ? ' is-current' : '' ?>"<?= $c2['slug'] === $lslug ? ' aria-current="step"' : '' ?>>
          <span class="n"><?= (int)$c2['n'] ?></span>
          <div>
            <?php if ($miss): ?><span class="t"><?= ma_inline($c2['title'], $cslug) ?></span>
            <?php else: ?><a class="t" href="<?= h(url('lesson.php', ['c' => $cslug, 'l' => $c2['slug']])) ?>"><?= ma_inline($c2['title'], $cslug) ?></a><?php endif; ?>
            <div class="s"><?= ma_inline($c2['summary'] ?? '', $cslug) ?></div>
          </div>
          <div class="m"><?= $miss ? h(t('in preparation')) : h(t('%d min', reading_minutes((int)($idx['chapters'][$key]['words'] ?? 0)))) ?></div>
        </li>
        <?php endforeach; ?>
      </ol>
    </section>
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
    </article>
  </div>
  <?php endif; ?>
</div>
<?php
echo '<script type="application/json" id="ma-macros">' . json_embed(read_json(MA_DATA . '/macros.json') ?? []) . '</script>';
page_foot();
