<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$tot = ma_totals();
page_head(t('About'), 'about');
?>
<div class="wrap">
  <header class="lesson-hero">
    <h1 class="page-title"><?= h(t('About the atlas')) ?></h1>
    <p class="lede"><?= h(t('Biology Atlas is a free, detailed tour of the biology taught in a university degree — written to be read alongside lectures and textbooks, or on its own.')) ?></p>
  </header>
  <div class="grid-2" style="align-items:start">
    <section class="prose">
      <h2 class="section" style="margin-bottom:12px"><?= h(t('How to use it')) ?></h2>
      <p><?= h(t('Each course is a chain of chapters, drawn as beads on the atlas page. Chapters are long, self-contained lessons: read them in order, try the quick checks as you go, and work through the exercises at the end before opening the solutions.')) ?></p>
      <p><?= h(t('Every chapter lists the chapters it builds on, and the map shows how the courses depend on each other. If something is unfamiliar, follow the link back; if you are curious, follow the links forward.')) ?></p>
      <p><?= h(t('Mark a chapter as read and its bead fills in on the atlas, the course page and the map. This progress is stored only in your browser.')) ?></p>
      <h2 class="section" style="margin:28px 0 12px"><?= h(t('What is in a lesson')) ?></h2>
      <div class="lesson-body" style="font-size:1rem">
        <div class="blk blk-definition blk-thm"><div class="blk-head"><span class="blk-kind"><?= h(t('Definition')) ?></span></div><div class="blk-body"><p><?= h(t('Precise definitions of the objects we study, numbered so they can be referred to.')) ?></p></div></div>
        <div class="blk blk-theorem blk-thm"><div class="blk-head"><span class="blk-kind"><?= h(t('Theorem')) ?></span></div><div class="blk-body"><p><?= h(t('Results with complete proofs (or clearly marked proof sketches where a full proof belongs to a later course).')) ?></p></div></div>
        <div class="blk blk-example"><div class="blk-head"><span class="blk-kind"><?= h(t('Example')) ?></span></div><div class="blk-body"><p><?= h(t('Worked examples with every step shown.')) ?></p></div></div>
        <div class="blk blk-intuition"><div class="blk-head"><span class="blk-kind"><?= h(t('Intuition')) ?></span></div><div class="blk-body"><p><?= h(t('The picture behind the formalism.')) ?></p></div></div>
        <div class="blk blk-warning"><div class="blk-head"><span class="blk-kind"><?= h(t('Common mistake')) ?></span></div><div class="blk-body"><p><?= h(t('Errors students often make, and why they are wrong.')) ?></p></div></div>
      </div>
      <p><?= h(t('Interactive figures let you change a parameter, run a simulation or move a point and watch the result change. All of them are collected in the Lab.')) ?></p>
    </section>
    <section class="prose">
      <h2 class="section" style="margin-bottom:12px"><?= h(t('In numbers')) ?></h2>
      <dl class="tally" style="margin-bottom:24px">
        <div><dt><?= h(t('Courses')) ?></dt><dd><?= fmt_num($tot['courses']) ?></dd></div>
        <div><dt><?= h(t('Chapters written')) ?></dt><dd><?= fmt_num($tot['chapters']) ?></dd></div>
        <div><dt><?= h(t('Theorems and definitions')) ?></dt><dd><?= fmt_num($tot['theorems'] + $tot['definitions']) ?></dd></div>
        <div><dt><?= h(t('Exercises with solutions')) ?></dt><dd><?= fmt_num($tot['exercises']) ?></dd></div>
      </dl>
      <h2 class="section" style="margin-bottom:12px"><?= h(t('Sources and accuracy')) ?></h2>
      <p><?= h(t('The lessons are original texts that follow the standard undergraduate syllabus and notation, and each course page recommends textbooks for further reading. This atlas is still a skeleton: the courses and chapters are mapped out, and the lessons are still to be written.')) ?></p>
      <p><?= sprintf(h(t('If you find an error, please report it on %s, noting the chapter and the number of the theorem, example or exercise.')), '<a href="' . h(MA_ISSUES_URL) . '">GitHub</a>') ?></p>
      <h2 class="section" style="margin:28px 0 12px"><?= h(t('How it is built')) ?></h2>
      <p><?= h(t('The site is plain PHP with no database. Lessons are written in a light markup language and every formula is typeset in advance with KaTeX; interactive figures are small self-contained scripts. Fonts, KaTeX and all scripts are served from this site, so it works where external services are blocked.')) ?></p>
      <p><?= h(t('The interface is available in English and Simplified Chinese.')) ?></p>
      <h2 class="section" style="margin:28px 0 12px"><?= h(t('Licence')) ?></h2>
      <p><?= sprintf(h(t('The lessons, figures and code are dedicated to the public domain under CC0 1.0: you may copy, adapt, translate and share them for any purpose without asking. The bundled libraries and fonts keep their own licences. The source is on %s.')), '<a href="https://github.com/c2h2/learn-atlases">GitHub</a>') ?></p>
    </section>
  </div>
</div>
<?php page_foot();
