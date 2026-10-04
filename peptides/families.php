<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$families = read_json(ATLAS_DATA . '/families.json') ?? ['families' => []];
if ($zh = zh_data('families')) {
    $families = overlay($families, $zh);
}
$families = $families['families'];

/** Resolve a family row spec into tokens, offset and modification marks. */
function fam_row(array $spec, array $all): ?array
{
    $mods = [];
    if (!empty($spec['slug'])) {
        $p = $all[$spec['slug']] ?? null;
        if (!$p) {
            return null;
        }
        $chain = $p['sequence']['chains'][0] ?? ['residues' => []];
        $tokens = $spec['tokens'] ?? $chain['residues'];
        foreach ($p['sequence']['modifications'] ?? [] as $m) {
            if (!in_array($m['type'], ['lipidation', 'albumin-binder', 'pegylation', 'glycosylation', 'metal'], true)) {
                continue; // residue identity already shows non-natural and D-residues; termini are not marked
            }
            if (preg_match('/^A(\d+)$/', $m['at'], $mm)) {
                $mods[(int)$mm[1] - 1][] = $m['label'];
            }
        }
        if (isset($spec['tokens'])) {
            // explicit alignment with gaps: shift modification indices past the gaps
            $map = [];
            $k = 0;
            foreach ($spec['tokens'] as $i => $t) {
                if ($t !== '-') {
                    $map[$k++] = $i;
                }
            }
            $shifted = [];
            foreach ($mods as $i => $labels) {
                $shifted[$map[$i] ?? $i] = $labels;
            }
            $mods = $shifted;
        }
        return ['name' => $p['name'], 'href' => url('peptide.php', ['p' => $p['slug']]), 'note' => $p['drug_class'] ?? '',
            'tokens' => $tokens, 'offset' => (int)($spec['offset'] ?? 0), 'mods' => $mods,
            'n' => $chain['n_term'] ?? 'H', 'c' => $chain['c_term'] ?? 'OH'];
    }
    $n = $spec['native'] ?? $spec;
    if (empty($n['residues']) && empty($n['slug'])) {
        return null;
    }
    if (!empty($n['slug'])) {
        $r = fam_row(['slug' => $n['slug']] + $spec, $all);
        if ($r) {
            $r['name'] = $n['name'] ?? $r['name'];
            $r['note'] = $n['note'] ?? $r['note'];
        }
        return $r;
    }
    return ['name' => $n['name'], 'href' => null, 'note' => $n['note'] ?? '', 'tokens' => $n['residues'],
        'offset' => (int)($spec['offset'] ?? 0), 'mods' => [], 'n' => 'H', 'c' => 'OH'];
}

page_head(t('Families'), 'families', ['description' => t('Sequence alignments showing how peptide drugs were engineered from their parent hormones.')]);
?>
<div class="wrap">
  <header style="padding:40px 0 10px">
    <h1 class="page-title"><?= h(t('Families')) ?></h1>
    <p class="lede" style="margin-top:14px"><?= h(t("Most peptide drugs are edits of a natural hormone. Each alignment starts from the parent sequence; in the rows below it, residues that match the parent fade out and only the changes keep their colour, so you can read a drug's design history at a glance.")) ?></p>
  </header>
  <?= residue_legend(false) ?>
  <p class="small muted"><?= h(t('Lower-case letters are D-amino acids. A violet underline marks a residue carrying a fatty acid or other side-chain conjugate; hover any cell for details.')) ?></p>

  <?php foreach ($families as $f):
      $ref = fam_row($f['reference'], $all);
      if (!$ref) continue;
      $rows = [];
      foreach ($f['members'] as $m) {
          $r = fam_row($m, $all);
          if ($r) $rows[] = $r;
      }
      $minOff = min(0, ...array_map(fn($r) => $r['offset'], $rows ?: [['offset' => 0]]));
      $width = count($ref['tokens']) - $minOff;
      foreach ($rows as $r) $width = max($width, count($r['tokens']) + $r['offset'] - $minOff);
      $start = (int)($f['numbering_start'] ?? 1);
      $refAt = function (int $col) use ($ref, $minOff) {
          $i = $col + $minOff;
          return $ref['tokens'][$i] ?? null;
      };
  ?>
    <section class="block" id="<?= h($f['key']) ?>">
      <div class="block-head"><h2 class="section"><?= h($f['title']) ?></h2></div>
      <p class="prose" style="color:var(--ink-2);margin-bottom:18px"><?= h($f['blurb']) ?></p>
      <div class="align" role="region" aria-label="<?= h(t('%s alignment', $f['title'])) ?>" tabindex="0">
        <table>
          <tr class="pos"><th></th><?php for ($c = 0; $c < $width; $c++): $n = $c + $minOff; ?><td><?= ($n >= 0 && $n < count($ref['tokens']) && (($n + $start) % 5 === 0 || $n === 0)) ? $n + $start : '' ?></td><?php endfor; ?></tr>
          <?php foreach (array_merge([$ref + ['is_ref' => true]], $rows) as $r): ?>
            <tr>
              <th scope="row"><?= $r['href'] ? '<a href="' . h($r['href']) . '">' . h($r['name']) . '</a>' : h($r['name']) ?><span class="ref-tag"><?= !empty($r['is_ref']) ? h(t('reference')) : '' ?></span></th>
              <?php for ($c = 0; $c < $width; $c++):
                  $i = $c + $minOff - (!empty($r['is_ref']) ? 0 : $r['offset']);
                  $t = ($i >= 0 && $i < count($r['tokens'])) ? $r['tokens'][$i] : null;
                  if ($t === null || $t === '-') { echo '<td class="gap">' . ($t === '-' ? '–' : '') . '</td>'; continue; }
                  $info = residue_info($t);
                  $same = empty($r['is_ref']) && $refAt($c) === $t;
                  $modLabel = isset($r['mods'][$i]) ? implode('; ', $r['mods'][$i]) : '';
                  $cls = $same ? 'same' : 'c-' . $info['class'] . ($info['d'] ? ' is-d' : '');
                  $style = $modLabel ? ' style="box-shadow: inset 0 -3px 0 var(--r-noncanonical)"' : '';
                  $lab = strlen($t) === 1 ? $t : $info['label'];
                  $title = $info['name'] . ' ' . ($i + 1) . ($modLabel ? ' — ' . $modLabel : '') . ($same ? ' ' . t('(same as reference)') : '');
              ?><td class="<?= h($cls) ?>"<?= $style ?> title="<?= h($title) ?>"><?= h(mb_strlen($lab) > 3 ? mb_substr($lab, 0, 3) : $lab) ?></td><?php endfor; ?>
            </tr>
          <?php endforeach; ?>
        </table>
      </div>
    </section>
  <?php endforeach; ?>
</div>
<?php page_foot();
