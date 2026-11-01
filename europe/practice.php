<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$courses = ma_courses();
$all = ma_collect()['exercises'];
$sel = (string)($_GET['c'] ?? '');
if ($sel !== '' && !isset($courses[$sel])) {
    $sel = '';
}
$level = (int)($_GET['level'] ?? 0);
$area = (string)($_GET['area'] ?? '');
$seed = isset($_GET['seed']) ? (int)$_GET['seed'] : random_int(1, 999999);

$pool = array_values(array_filter($all, function ($e) use ($sel, $level, $area, $courses) {
    if ($sel !== '' && $e['course'] !== $sel) return false;
    if ($level && $e['level'] !== $level) return false;
    if ($area !== '' && ($courses[$e['course']]['area'] ?? '') !== $area) return false;
    return true;
}));
if ($sel === '') {
    // a random practice set: shuffle deterministically with the seed so the page can be shared
    mt_srand($seed);
    for ($i = count($pool) - 1; $i > 0; $i--) {
        $j = mt_rand(0, $i);
        [$pool[$i], $pool[$j]] = [$pool[$j], $pool[$i]];
    }
    $pool = array_slice($pool, 0, 12);
}
$byLevel = array_count_values(array_map(fn($e) => $e['level'], $all));
$scripts = ['assets/js/expr.js', 'assets/js/lesson.js'];
page_head(t('Practice'), 'practice', ['scripts' => $scripts, 'description' => t('Exercises from every chapter, with hints and full solutions. Pick a course or get a random set.')]);
?>
<div class="wrap">
  <header class="lesson-hero">
    <h1 class="page-title"><?= h(t('Practice')) ?></h1>
    <p class="lede"><?= h(t('Exercises from every chapter of the atlas, with hints and full worked solutions. Try each one before opening the solution; where an answer is a single number you can type it in to check.')) ?></p>
  </header>
  <dl class="statline">
    <div><dt><?= h(t('Exercises')) ?></dt><dd><?= count($all) ?></dd></div>
    <div><dt><?= h(t('Routine')) ?></dt><dd><?= (int)($byLevel[1] ?? 0) ?></dd></div>
    <div><dt><?= h(t('Standard')) ?></dt><dd><?= (int)($byLevel[2] ?? 0) ?></dd></div>
    <div><dt><?= h(t('Challenging')) ?></dt><dd><?= (int)($byLevel[3] ?? 0) ?></dd></div>
    <div><dt><?= h(t('With answer check')) ?></dt><dd><?= count(array_filter($all, fn($e) => $e['check'] !== '')) ?></dd></div>
  </dl>
  <form class="controls" method="get" action="practice.php">
    <?php if (is_zh()): ?><input type="hidden" name="lang" value="zh"><?php endif; ?>
    <select class="select" name="c" aria-label="<?= h(t('Course')) ?>" onchange="this.form.submit()">
      <option value=""><?= h(t('Random set from all courses')) ?></option>
      <?php foreach ($courses as $s => $c): ?><option value="<?= h($s) ?>"<?= $s === $sel ? ' selected' : '' ?>><?= h(md_plain($c['title'])) ?></option><?php endforeach; ?>
    </select>
    <?php if ($sel === ''): ?>
    <select class="select" name="area" aria-label="<?= h(t('Area')) ?>" onchange="this.form.submit()">
      <option value=""><?= h(t('All areas')) ?></option>
      <?php foreach (AREAS as $k => $a): ?><option value="<?= h($k) ?>"<?= $k === $area ? ' selected' : '' ?>><?= h(t($a['label'])) ?></option><?php endforeach; ?>
    </select>
    <?php endif; ?>
    <select class="select" name="level" aria-label="<?= h(t('Difficulty')) ?>" onchange="this.form.submit()">
      <option value="0"><?= h(t('Any difficulty')) ?></option>
      <?php foreach (MD_LEVELS as $k => $l): ?><option value="<?= $k ?>"<?= $k === $level ? ' selected' : '' ?>><?= h(t($l)) ?></option><?php endforeach; ?>
    </select>
    <?php if ($sel === ''): ?><button class="chip" type="submit" name="seed" value="<?= random_int(1, 999999) ?>"><?= icon('shuffle') ?> <?= h(t('New set')) ?></button><?php endif; ?>
  </form>

  <div class="lesson-body" style="max-width:860px;margin-top:10px">
    <?php if (!$pool): ?><p class="callout"><?= h(t('No exercises match yet — the lessons are still being written.')) ?></p><?php endif; ?>
    <?php foreach ($pool as $e):
        $c = $courses[$e['course']];
        $ch = ma_chapter_meta($e['course'], $e['chapter']); ?>
    <div class="blk blk-exercise" data-level="<?= (int)$e['level'] ?>">
      <div class="blk-head">
        <span class="blk-kind"><?= h(t('Exercise') . ' ' . $e['num']) ?></span> <?= level_dots((int)$e['level']) ?>
        <?php if ($e['title'] !== ''): ?> <span class="blk-title"><?= md_inline($e['title']) ?></span><?php endif; ?>
        <div class="small muted" style="margin-top:2px"><span class="area-chip" style="--c:var(--a-<?= h($c['area']) ?>)"><i></i><?= ma_inline($c['title'], $e['course']) ?></span> · <a href="<?= h(url('lesson.php', ['c' => $e['course'], 'l' => $e['chapter'], '#' => $e['id']])) ?>"><?= ma_inline($ch['title'] ?? '', $e['course']) ?></a></div>
      </div>
      <div class="blk-body"><?= $e['html'] ?><?php if ($e['check'] !== ''): ?><div class="check" data-check="<?= h($e['check']) ?>"></div><?php endif; ?><?= $e['extra'] ?></div>
    </div>
    <?php endforeach; ?>
  </div>
</div>
<?php
echo '<script type="application/json" id="ma-macros">' . json_embed(read_json(MA_DATA . '/macros.json') ?? []) . '</script>';
page_foot();
