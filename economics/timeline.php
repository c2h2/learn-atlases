<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$events = [];
foreach (ma_courses() as $s => $c) {
    foreach ($c['history'] ?? [] as $e) {
        $events[] = ['year' => (int)$e['year'], 'title' => $e['title'], 'detail' => $e['detail'], 'people' => (array)($e['people'] ?? []),
            'area' => $c['area'], 'course' => $s, 'ctitle' => $c['title']];
    }
}
$ms = read_json(MA_DATA . '/milestones.json')['milestones'] ?? [];
if (is_zh()) {
    $ov = read_json(MA_CONTENT . '/zh/_data/milestones.json');
    if ($ov) {
        $ms = overlay(['milestones' => $ms], $ov)['milestones'];
    }
}
foreach ($ms as $e) {
    $events[] = ['year' => (int)$e['year'], 'title' => $e['title'], 'detail' => $e['detail'], 'people' => (array)($e['people'] ?? []),
        'area' => $e['area'] ?? 'foundations', 'course' => null, 'ctitle' => null];
}
usort($events, fn($a, $b) => [$a['year'], $a['course'] === null ? 0 : 1] <=> [$b['year'], $b['course'] === null ? 0 : 1]);
// The same discovery is often told in several courses (Euclid's Elements, Cauchy's Cours d'analyse …) and again in
// the site milestones: list it once — the milestone's wording if there is one — with a link to every course.
$merged = [];
foreach ($events as $e) {
    $hit = null;
    foreach ($merged as $k => $g) {
        if ($e['people'] && $g['year'] === $e['year'] && array_intersect($g['people'], $e['people'])) {
            $hit = $k;
            break;
        }
    }
    if ($hit === null) {
        $merged[] = $e + ['areas' => [$e['area']], 'courses' => $e['course'] ? [$e['course'] => $e] : [], 'more' => ''];
        continue;
    }
    $g = &$merged[$hit];
    $g['people'] = array_values(array_unique(array_merge($g['people'], $e['people'])));
    if (!in_array($e['area'], $g['areas'], true)) {
        $g['areas'][] = $e['area'];
    }
    if ($e['course'] && !isset($g['courses'][$e['course']])) {
        $g['courses'][$e['course']] = $e;
    }
    $g['more'] .= ' ' . $e['title'] . ' ' . $e['detail'];
    unset($g);
}
$events = $merged;
$centuries = [];
foreach ($events as $e) {
    $centuries[$e['year'] < 1500 ? 'early' : (string)(intdiv($e['year'], 100) * 100)] = true;
}
page_head(t('Timeline'), 'timeline', ['description' => t('From Adam Smith to game theory and modern finance: the ideas behind every course in the atlas.')]);
?>
<div class="wrap">
  <header class="lesson-hero">
    <h1 class="page-title"><?= h(t('Timeline of economics')) ?></h1>
    <p class="lede"><?= h(t('The ideas behind the courses, from Smith’s division of labour and Ricardo’s comparative advantage to Keynes, game theory, rational expectations and modern finance. Coloured dots show the area; links lead to the course where the idea is taught.')) ?></p>
  </header>
  <div class="controls" style="border-top:0">
    <label class="search"><?= icon('search') ?><input type="search" data-filter="q" placeholder="<?= h(t('Search people and events…')) ?>" aria-label="<?= h(t('Search the timeline')) ?>"></label>
    <div class="chips" role="group" aria-label="<?= h(t('Area')) ?>">
      <button class="chip" type="button" data-filter="area" data-value="all" aria-pressed="true"><?= h(t('All areas')) ?></button>
      <?php foreach (AREAS as $k => $a): ?><button class="chip" type="button" data-filter="area" data-value="<?= h($k) ?>" aria-pressed="false" style="--c:var(--a-<?= h($k) ?>)"><span class="dot"></span><?= h(t($a['label'])) ?></button><?php endforeach; ?>
    </div>
    <span class="muted small"><span data-count></span> <?= h(t('events')) ?></span>
  </div>
  <ol class="tl" id="timeline" style="margin-top:28px">
    <?php foreach ($events as $e):
        $key = $e['course'] ?? '_site';
        $title = $e['course'] ? ma_inline($e['title'], $e['course']) : ma_site_inline($e['title']);
        $detail = $e['course'] ? ma_inline($e['detail'], $e['course']) : ma_site_inline($e['detail']);
        $search = mb_strtolower(strip_tags($title . ' ' . $detail . ' ' . implode(' ', $e['people']) . $e['more'])); ?>
    <li data-search="<?= h($search) ?>" data-area="<?= h(implode(' ', $e['areas'])) ?>" style="--c:var(--a-<?= h($e['area']) ?>)">
      <span class="yr"><?= h(year_label($e['year'])) ?></span><span class="dot"></span>
      <div>
        <span class="ev-title"><?= $title ?></span><?php if ($e['people']): ?><span class="ev-meta"><?= h(implode(list_sep(), $e['people'])) ?></span><?php endif; ?>
        <p class="ev-detail"><?= $detail ?></p>
        <?php foreach ($e['courses'] as $cs => $m): ?><a class="ev-course" href="<?= h(url('course.php', ['c' => $cs])) ?>" title="<?= h(html_entity_decode(strip_tags(ma_inline($m['title'], $cs)), ENT_QUOTES, 'UTF-8')) ?>"><?= ma_inline($m['ctitle'], $cs) ?> →</a><?php endforeach; ?>
      </div>
    </li>
    <?php endforeach; ?>
  </ol>
  <p class="muted" data-empty hidden><?= h(t('No events match.')) ?></p>
</div>
<script>document.addEventListener('DOMContentLoaded',()=>MA.filterList(document.getElementById('timeline'),{rows:'li'}));</script>
<?php page_foot();
