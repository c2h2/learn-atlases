<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$crit = group_criteria();
$by = isset($_GET['by'], $crit[$_GET['by']]) ? $_GET['by'] : 'area';
$q = trim((string)($_GET['q'] ?? ''));
$all = drugs_all();
if ($q !== '') {
    $all = array_filter($all, fn($d) => stripos($d['name'] . ' ' . implode(' ', $d['brands'] ?? []) . ' ' . implode(' ', $d['aliases'] ?? []) . ' ' . ($d['drug_class'] ?? ''), $q) !== false);
}
$groups = [];
foreach ($all as $d) {
    foreach (($crit[$by][1])($d) as $g) $groups[$g][] = $d;
}
uksort($groups, function ($a, $b) use ($groups) {
    $da = str_starts_with($a, '—'); $db = str_starts_with($b, '—');
    return $da <=> $db ?: (count($groups[$b]) <=> count($groups[$a]) ?: strcasecmp($a, $b));
});
if (in_array($by, ['area', 'decade'], true)) ksort($groups, SORT_NATURAL);
$written = count(array_filter(drugs_all(), fn($d) => ($d['stage'] ?? '') === 'written'));

page_head('Drug Atlas');
?>
<section class="intro">
  <h1>Drug Atlas</h1>
  <p><?= count(drugs_all()) ?> medicines, from aspirin to gene therapies: how each one works, its history, who makes it, and how it is given (by mouth, injection, inhaler or skin). Group them by any of the criteria below.</p>
  <p class="muted"><?= $written ?> of <?= count(drugs_all()) ?> records written so far; the rest are skeletons.</p>
</section>
<form class="controls" method="get">
  <label>Group by
    <select name="by" onchange="this.form.submit()">
      <?php foreach ($crit as $k => [$label]): ?><option value="<?= h($k) ?>"<?= $k === $by ? ' selected' : '' ?>><?= h($label) ?></option><?php endforeach; ?>
    </select></label>
  <input type="search" name="q" value="<?= h($q) ?>" placeholder="Search name, brand or class">
  <button>Apply</button>
</form>
<nav class="chips"><?php foreach ($crit as $k => [$label]): ?><a href="?by=<?= h($k) ?><?= $q !== '' ? '&q=' . urlencode($q) : '' ?>"<?= $k === $by ? ' class="on"' : '' ?>><?= h($label) ?></a><?php endforeach; ?></nav>
<?php foreach ($groups as $g => $list): ?>
<section class="group">
  <h2><?= h($g) ?> <span class="n"><?= count($list) ?></span></h2>
  <ul class="grid">
  <?php foreach ($list as $d): ?>
    <li class="<?= ($d['stage'] ?? '') === 'written' ? '' : 'sk' ?>"><a href="drug.php?d=<?= h($d['slug']) ?>">
      <strong><?= h($d['name']) ?></strong>
      <span class="cls"><?= h($d['drug_class'] ?? AREAS[$d['area']] ?? '') ?></span>
      <span class="meta"><?= route_badges($d) ?><?php if (!empty($d['owner'])): ?><span class="own"><?= h($d['owner']) ?></span><?php endif; ?></span>
    </a></li>
  <?php endforeach; ?>
  </ul>
</section>
<?php endforeach;
if (!$groups) echo '<p>No drug matches.</p>';
page_foot();
