<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$cat = read_json(MA_DATA . '/widgets.json')['types'] ?? [];
$one = (string)($_GET['w'] ?? '');
if ($one !== '' && !isset($cat[$one])) {
    $one = '';
}
$GROUPS = [
    'calculus' => 'Graphs and functions',
    'numerical' => 'Number representation',
    'discrete' => 'Logic, sets, graphs and number theory',
    'prob' => 'Probability and randomness',
    'linalg' => 'Geometric transformations',
    'multivar' => 'Optimisation',
];

/** "key: value" lines -> config array. */
function lab_cfg(string $text): array
{
    $cfg = [];
    foreach (preg_split('/\R/', $text) as $l) {
        if (preg_match('/^\s*([A-Za-z_][\w-]*)\s*:\s?(.*)$/', $l, $m)) {
            $cfg[$m[1]] = trim($m[2]);
        }
    }
    return $cfg;
}

function lab_figure(string $type, array $cfg, string $id): string
{
    unset($cfg['caption']);
    return '<figure class="widget" id="' . h($id) . '" data-widget="' . h($type) . '" data-config="' . h(json_encode($cfg, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . '">'
        . '<div class="widget-stage"><div class="widget-msg">' . h(t('Loading interactive figure…')) . '</div></div></figure>';
}

$files = [];
foreach ($cat as $t => $w) {
    if (!$one || $one === $t) {
        $files[$w['file']] = true;
    }
}
$scripts = ['assets/vendor/katex/katex.min.js', 'assets/js/expr.js', 'assets/js/plot.js'];
foreach (array_keys($files) as $f) {
    if (is_file(MA_ROOT . "/assets/js/widgets/$f.js")) {
        $scripts[] = "assets/js/widgets/$f.js";
    }
}
$title = $one ? (is_zh() ? ($cat[$one]['zh'] ?? $cat[$one]['title']) : $cat[$one]['title']) : t('Lab');
page_head($title, 'lab', ['scripts' => $scripts, 'description' => t('Every interactive figure used in the lessons, ready to explore and remix.')]);
?>
<div class="wrap">
<?php if ($one):
    $w = $cat[$one];
    $cfgText = isset($_GET['cfg']) ? (string)$_GET['cfg'] : (string)($w['example'] ?? ''); ?>
  <?= crumbs([[h(t('Lab')), url('lab.php')], [h($title), null]]) ?>
  <header class="lesson-hero">
    <h1 class="page-title"><?= h($title) ?></h1>
    <p class="lede"><?= h(is_zh() ? ($w['zh_desc'] ?? $w['desc']) : $w['desc']) ?></p>
  </header>
  <div class="grid-2 lab-detail">
    <div id="lab-out"><?= lab_figure($one, lab_cfg($cfgText), 'lab-fig') ?></div>
    <div>
      <form method="get" action="lab.php">
        <input type="hidden" name="w" value="<?= h($one) ?>"><?php if (is_zh()): ?><input type="hidden" name="lang" value="zh"><?php endif; ?>
        <label class="eyebrow" for="cfg"><?= h(t('Settings')) ?></label>
        <textarea id="cfg" name="cfg" rows="9" style="width:100%;margin-top:8px;font-family:var(--mono);font-size:.85rem;padding:10px;border:1px solid var(--rule-2);border-radius:8px;background:var(--sheet)"><?= h($cfgText) ?></textarea>
        <button class="w-btn primary" type="submit" style="margin-top:8px"><?= h(t('Redraw')) ?></button>
      </form>
      <h2 class="eyebrow" style="margin:22px 0 8px"><?= h(t('Options')) ?></h2>
      <table class="data-table"><tbody>
        <?php foreach ($w['params'] as $k => $p): ?>
        <tr><td class="mono"><?= h($k) ?></td><td><?= h($p['type']) ?><?= isset($p['values']) ? ': ' . h(implode(' | ', $p['values'])) : '' ?><?= isset($p['default']) ? '<br><span class="muted">' . h(t('default')) . ' ' . h($p['default']) . '</span>' : '' ?><?= !empty($p['required']) ? '<br><b>' . h(t('required')) . '</b>' : '' ?></td><td class="muted"><?= h($p['desc'] ?? '') ?></td></tr>
        <?php endforeach; ?>
      </tbody></table>
    </div>
  </div>
<?php else: ?>
  <header class="lesson-hero">
    <h1 class="page-title"><?= h(t('Lab')) ?></h1>
    <p class="lede"><?= h(t('Every interactive figure used in the lessons. Open one to change its settings and explore.')) ?></p>
  </header>
  <?php foreach ($GROUPS as $g => $gl):
      $list = array_filter($cat, fn($w) => $w['file'] === $g);
      if (!$list) continue; ?>
  <section class="block">
    <div class="block-head"><h2 class="section"><?= h(t($gl)) ?></h2></div>
    <div class="lab-grid">
      <?php foreach ($list as $t => $w): ?>
      <a class="lab-card" href="<?= h(url('lab.php', ['w' => $t])) ?>"><b><?= h(is_zh() ? ($w['zh'] ?? $w['title']) : $w['title']) ?></b><span><?= h(is_zh() ? ($w['zh_desc'] ?? $w['desc']) : $w['desc']) ?></span><small class="mono"><?= h($t) ?></small></a>
      <?php endforeach; ?>
    </div>
  </section>
  <?php endforeach; ?>
<?php endif; ?>
</div>
<?php
echo '<script type="application/json" id="ma-macros">' . json_embed(read_json(MA_DATA . '/macros.json') ?? []) . '</script>';
page_foot();
