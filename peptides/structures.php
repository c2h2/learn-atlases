<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$exp = [];
$pred = [];
foreach ($all as $slug => $p) {
    $entries = [];
    foreach ($p['structure']['pdb'] ?? [] as $e) {
        $id = strtoupper($e['id']);
        $meta = atlas_cache('pdb', $id) ?? [];
        $entries[] = ['id' => $id, 'title' => $meta['title'] ?? ($e['title'] ?? ''), 'method' => $meta['method'] ?? ($e['method'] ?? ''),
            'res' => $meta['resolution'] ?? ($e['resolution'] ?? null), 'img' => is_file(ATLAS_CACHE . "/img/pdb-$id.jpeg") ? "data/cache/img/pdb-$id.jpeg" : null];
    }
    if ($entries) {
        $exp[] = ['p' => $p, 'entries' => $entries];
        continue;
    }
    $m = atlas_cache('models', $slug);
    if ($m) {
        $img = is_file(ATLAS_CACHE . "/img/model-$slug.png") ? "data/cache/img/model-$slug.png" : null;
        $pred[] = ['p' => $p, 'model' => $m, 'img' => $img];
    }
}
$methodShort = ['X-RAY DIFFRACTION' => 'X-ray', 'ELECTRON MICROSCOPY' => 'Cryo-EM', 'SOLUTION NMR' => 'NMR', 'SOLID-STATE NMR' => 'Solid-state NMR'];
$sep = is_zh() ? '，' : ', ';

page_head(t('Structures'), 'structures', ['description' => t('3D structures of therapeutic peptides: experimental PDB entries and predicted models.')]);
?>
<div class="wrap">
  <header style="padding:40px 0 6px">
    <h1 class="page-title"><?= h(t('Structures')) ?></h1>
    <p class="lede" style="margin-top:14px"><?= h(t('%d peptides have experimentally solved 3D structures in the Protein Data Bank, often caught in the act of binding their receptor. For the other %d, the atlas shows a predicted or computed model. Open any peptide to explore it in 3D.', count($exp), count($pred))) ?></p>
  </header>

  <section class="block" style="padding-top:26px">
    <div class="block-head"><h2 class="section"><?= h(t('Experimental structures')) ?></h2><p><?= h(t('X-ray crystallography, cryo-electron microscopy and NMR, from RCSB PDB.')) ?></p></div>
    <div class="gallery">
      <?php foreach ($exp as $x): $p = $x['p']; $e = $x['entries'][0]; ?>
        <a href="<?= h(url('peptide.php', ['p' => $p['slug']])) ?>#viewer">
          <figure>
            <?php if ($e['img']): ?><img src="<?= h($e['img']) ?>" alt="<?= h('PDB ' . $e['id'] . ': ' . $e['title']) ?>" loading="lazy"><?php else: ?><div style="aspect-ratio:1;border:1px solid var(--rule);border-radius:10px;display:grid;place-items:center;background:var(--sheet)"><?= bead_svg($p, ['unit' => 10, 'letters' => false]) ?></div><?php endif; ?>
            <figcaption><b><?= h($p['name']) ?></b><?= h($e['id']) ?><?= $sep ?><?= h(t($methodShort[$e['method']] ?? $e['method'])) ?><?= $e['res'] ? $sep . h((string)round((float)$e['res'], 2)) . ' Å' : '' ?><?= count($x['entries']) > 1 ? ' <span class="muted">' . h(t('(+%d more)', count($x['entries']) - 1)) . '</span>' : '' ?><br><span class="muted small" lang="en"><?= h(mb_strimwidth($e['title'], 0, 90, '…')) ?></span></figcaption>
          </figure>
        </a>
      <?php endforeach; ?>
    </div>
  </section>

  <?php if ($pred): ?>
  <section class="block">
    <div class="block-head"><h2 class="section"><?= h(t('Predicted and computed models')) ?></h2><p><?= h(t('No experimental structure exists. Longer chains are predicted with ESMFold; short or heavily modified peptides get a computed conformer. Treat both as illustrations.')) ?></p></div>
    <div class="gallery">
      <?php foreach ($pred as $x): $p = $x['p']; $m = $x['model']; ?>
        <a href="<?= h(url('peptide.php', ['p' => $p['slug']])) ?>#viewer">
          <figure>
            <?php if ($x['img']): ?><img src="<?= h($x['img']) ?>" alt="<?= h(t('Model of %s', $p['name'])) ?>" loading="lazy"><?php else: ?><div style="aspect-ratio:1;border:1px solid var(--rule);border-radius:10px;display:grid;place-items:center;background:var(--sheet);padding:12px"><?= bead_svg($p, ['unit' => 12, 'letters' => false]) ?></div><?php endif; ?>
            <figcaption><b><?= h($p['name']) ?></b><?= h(($m['kind'] ?? '') === 'model' ? t('Predicted (%s)', $m['method'] ?? 'ESMFold') : t('Computed conformer')) ?><?= isset($m['plddt_mean']) ? h($sep . t('mean pLDDT %d', (int)round((float)$m['plddt_mean']))) : '' ?></figcaption>
          </figure>
        </a>
      <?php endforeach; ?>
    </div>
  </section>
  <?php endif; ?>
</div>
<?php page_foot();
