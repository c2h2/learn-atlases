<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = drugs_all();
$d = $all[$_GET['d'] ?? ''] ?? null;
if (!$d) { http_response_code(404); page_head('Not found'); echo '<p>No such drug. <a href="./">All drugs</a></p>'; page_foot(); exit; }
$crit = group_criteria();
$fact = function (string $label, $v) { if ($v === null || $v === '' || $v === []) return; echo '<div><dt>' . h($label) . '</dt><dd>' . $v . '</dd></div>'; };
page_head($d['name'] . ' · Drug Atlas');
?>
<article class="drug">
  <p class="eyebrow"><a href="./?by=area"><?= h(AREAS[$d['area']] ?? $d['area']) ?></a></p>
  <h1><?= h($d['name']) ?></h1>
  <?php if ($d['brands']): ?><p class="brands"><?= h(implode(' · ', $d['brands'])) ?></p><?php endif; ?>
  <?php if ($d['tagline']): ?><p class="lede"><?= h($d['tagline']) ?></p><?php endif; ?>
  <?php if (($d['stage'] ?? '') !== 'written'): ?><p class="note">This record is a skeleton: history, mechanism and the remaining facts are still to be written.</p><?php endif; ?>
  <dl class="facts">
    <?php
    $fact('Class', h($d['drug_class']));
    $fact('Modality', h(MODALITIES[$d['modality'] ?? ''] ?? null));
    $fact('Given', route_badges($d) . ($d['route_note'] ? ' ' . h($d['route_note']) : ''));
    $fact('Targets', h(implode(', ', $d['targets'] ?? [])));
    $fact('Origin', h(ORIGINS[$d['origin'] ?? ''] ?? null));
    $fact('Originator', h($d['originator']));
    $fact('Owner (2026)', h($d['owner']));
    $fa = $d['first_approval'];
    $fact('First approved', $fa ? h(trim(($fa['year'] ?? '') . ' · ' . ($fa['agency'] ?? '') . ($fa['brand'] ? ' (' . $fa['brand'] . ')' : ''), ' ·')) : null);
    $fact('Discovered', $d['discovery'] ? h(($d['discovery']['year'] ?? '') . ' — ' . ($d['discovery']['by'] ?? '')) : null);
    $fact('Generic', $d['generic'] === null ? null : ($d['generic'] ? 'Yes' : 'No'));
    $fact('WHO essential', $d['who_essential'] === null ? null : ($d['who_essential'] ? 'Yes' : 'No'));
    $fact('Status', h($d['rx_status']));
    ?>
  </dl>
  <?php if ($d['summary']): ?><p><?= h($d['summary']) ?></p><?php endif; ?>
  <?php if ($d['mechanism']): ?><h2>How it works</h2><?php foreach ($d['mechanism'] as $p): ?><p><?= h($p) ?></p><?php endforeach; endif; ?>
  <?php if ($d['uses']): ?><h2>Main uses</h2><ul><?php foreach ($d['uses'] as $u): ?><li><?= h($u) ?></li><?php endforeach; ?></ul><?php endif; ?>
  <?php if ($d['history']): ?><h2>History</h2><ol class="tl"><?php foreach ($d['history'] as $e): ?>
    <li><span class="yr"><?= h((string)$e['year']) ?></span><div><strong><?= h($e['title']) ?></strong> <?= h($e['detail'] ?? '') ?></div></li><?php endforeach; ?></ol><?php endif; ?>
  <?php if (array_filter($d['pk'] ?? [])): ?><h2>Pharmacokinetics</h2><dl class="facts"><?php foreach ($d['pk'] as $k => $v) $fact(ucfirst(str_replace('_', ' ', $k)), h($v)); ?></dl><?php endif; ?>
  <?php $s = $d['safety'] ?? []; if (!empty($s['common']) || !empty($s['serious']) || !empty($s['boxed_warning'])): ?><h2>Safety</h2>
    <?php if (!empty($s['boxed_warning'])): ?><p class="note"><strong>Boxed warning:</strong> <?= h($s['boxed_warning']) ?></p><?php endif; ?>
    <?php if (!empty($s['common'])): ?><p><strong>Common:</strong> <?= h(implode('; ', $s['common'])) ?></p><?php endif; ?>
    <?php if (!empty($s['serious'])): ?><p><strong>Serious:</strong> <?= h(implode('; ', $s['serious'])) ?></p><?php endif; ?>
  <?php endif; ?>
  <?php if ($d['facts']): ?><h2>Facts</h2><ul><?php foreach ($d['facts'] as $f): ?><li><?= h($f) ?></li><?php endforeach; ?></ul><?php endif; ?>
  <?php if ($d['related']): ?><h2>Related</h2><p><?php foreach ($d['related'] as $r) if (isset($all[$r])) echo '<a class="chip" href="drug.php?d=' . h($r) . '">' . h($all[$r]['name']) . '</a> '; ?></p><?php endif; ?>
  <?php if ($d['references']): ?><h2>Sources</h2><ol class="refs"><?php foreach ($d['references'] as $r): ?><li><a href="<?= h($r['url']) ?>" rel="noopener"><?= h($r['title']) ?></a></li><?php endforeach; ?></ol><?php endif; ?>
</article>
<?php page_foot();
