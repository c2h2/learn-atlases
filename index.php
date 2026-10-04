<?php
declare(strict_types=1);
/* Learn — landing page for the atlases under /learn (Maths, Physics, Peptide). Self-contained. */

mb_internal_encoding('UTF-8');
$q = $_GET['lang'] ?? null;
if (is_string($q) && in_array($q, ['en', 'zh'], true)) {
    $lang = $q;
    setcookie('learn_lang', $lang, ['expires' => time() + 31536000, 'path' => '/learn/', 'samesite' => 'Lax']);
} elseif (in_array($_COOKIE['learn_lang'] ?? '', ['en', 'zh'], true)) {
    $lang = $_COOKIE['learn_lang'];
} else {
    $lang = str_starts_with(strtolower((string)($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '')), 'zh') ? 'zh' : 'en';
}
$zh = $lang === 'zh';
$T = [
    'Learn' => '学习',
    'Interactive atlases' => '交互式图谱',
    'Long-form, interactive references for self-study: every topic explained in depth, with figures you can play with.' => '面向自学的长篇交互式参考资料：每个主题都有深入讲解，并配有可以动手操作的交互图形。',
    'Maths Atlas' => '数学图谱',
    'University mathematics in depth: logic and proof, calculus and analysis, linear and abstract algebra, probability and statistics, differential equations, complex analysis, topology and geometry. Definitions, theorems with proofs, worked examples, interactive figures and exercises with full solutions.' => '深入讲解大学数学：逻辑与证明、微积分与分析、线性代数与抽象代数、概率与统计、微分方程、复分析、拓扑与几何。包含定义、带证明的定理、详细例题、交互图形以及附完整解答的练习。',
    'Physics Atlas' => '物理图谱',
    'University physics in depth: mechanics, waves and optics, electromagnetism, thermodynamics and statistical physics, quantum mechanics, relativity and astrophysics. Definitions, laws with derivations, worked examples, interactive figures and exercises with full solutions.' => '深入讲解大学物理：力学、波动与光学、电磁学、热学与统计物理、量子力学、相对论与天体物理。包含定义、带推导的定律、详细例题、交互图形以及附完整解答的练习。',
    'Peptide Atlas' => '多肽图谱',
    'Therapeutic and research peptides — semaglutide, insulin, tirzepatide, BPC-157 and many more — drawn residue by residue, with 3D structures, history, regulation and worldwide attention.' => '治疗用和研究用多肽——司美格鲁肽、胰岛素、替尔泊肽、BPC-157 等——逐个残基绘制，并配有三维结构、发展历史、监管状态和全球关注度。',
    'courses' => '门课程', 'chapters' => '章', 'interactive figures' => '个交互图形', 'peptides' => '种多肽', 'languages' => '种语言',
    'Open' => '打开', 'The atlases are available in English and Simplified Chinese, run entirely from this server and keep no data about you.' => '这些图谱均提供英文和简体中文版本，完全由本服务器提供，不收集任何个人数据。',
];
$t = fn(string $s): string => $zh ? ($T[$s] ?? $s) : $s;
$h = fn(?string $s): string => htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$L = $zh ? '?lang=zh' : '';

// statistics, read directly from each site's data
$mCourses = count(glob(__DIR__ . '/maths/content/en/*/course.json') ?: []);
$mChapters = count(glob(__DIR__ . '/maths/content/en/*/*.md') ?: []);
$mFigures = 0;
foreach (glob(__DIR__ . '/maths/content/en/*/*.md') ?: [] as $f) {
    $mFigures += preg_match_all('/^:::\s*widget\b/m', (string)file_get_contents($f));
}
$pCount = count(glob(__DIR__ . '/peptides/data/peptides/*.json') ?: []);
$yCourses = count(glob(__DIR__ . '/physics/content/en/*/course.json') ?: []);
$yChapters = count(glob(__DIR__ . '/physics/content/en/*/*.md') ?: []);
$yFigures = 0;
foreach (glob(__DIR__ . '/physics/content/en/*/*.md') ?: [] as $f) {
    $yFigures += preg_match_all('/^:::\s*widget\b/m', (string)file_get_contents($f));
}
$css = 'assets/learn.css?v=' . base_convert((string)@filemtime(__DIR__ . '/assets/learn.css'), 10, 36);
?><!doctype html>
<html lang="<?= $zh ? 'zh-CN' : 'en' ?>">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= $h($t('Learn')) ?> — <?= $h($t('Interactive atlases')) ?></title>
<meta name="description" content="<?= $h($t('Long-form, interactive references for self-study: every topic explained in depth, with figures you can play with.')) ?>">
<link rel="stylesheet" href="assets/fonts/fonts.css">
<link rel="stylesheet" href="<?= $h($css) ?>">
<link rel="icon" href="data:image/svg+xml,<?= rawurlencode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 16"><line x1="6" y1="8" x2="32" y2="8" stroke="#c3c9cf" stroke-width="1.5"/><circle cx="6" cy="8" r="5.6" fill="#2a78d6"/><circle cx="19" cy="8" r="5.6" fill="#eda100"/><circle cx="32" cy="8" r="5.6" fill="#4a3aa7"/></svg>') ?>">
<script>try{var s=localStorage.getItem('maths-theme')||localStorage.getItem('atlas-theme');if(s==='dark'||s==='light')document.documentElement.setAttribute('data-theme',s)}catch(e){}</script>
</head>
<body>
<header class="head"><div class="wrap">
  <a class="brand" href="./<?= $L ?>"><svg viewBox="0 0 38 16" aria-hidden="true"><line x1="6" y1="8" x2="32" y2="8"/><circle cx="6" cy="8" r="5.6" style="fill:#2a78d6"/><circle cx="19" cy="8" r="5.6" style="fill:#eda100"/><circle cx="32" cy="8" r="5.6" style="fill:#4a3aa7"/></svg><span><?= $h($t('Learn')) ?></span></a>
  <a class="lang" href="?lang=<?= $zh ? 'en' : 'zh' ?>" lang="<?= $zh ? 'en' : 'zh-CN' ?>"><?= $zh ? 'EN' : '中文' ?></a>
</div></header>
<main class="wrap">
  <section class="intro">
    <h1><?= $h($t('Interactive atlases')) ?></h1>
    <p class="lede"><?= $h($t('Long-form, interactive references for self-study: every topic explained in depth, with figures you can play with.')) ?></p>
  </section>
  <div class="cards">
    <a class="card" href="maths/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M6 54 C 60 54, 70 12, 130 12 S 210 54, 294 40" class="curve"/>
        <?php $cols = ['#6b7180', '#2a78d6', '#2a78d6', '#4a3aa7', '#1a9e6f', '#d6457c', '#e0612d', '#d99400'];
        foreach ($cols as $i => $c): $x = 20 + $i * 37; ?>
        <circle cx="<?= $x ?>" cy="62" r="7" style="fill:<?= $c ?>"/>
        <?php endforeach; ?>
      </svg>
      <h2><?= $h($t('Maths Atlas')) ?></h2>
      <p><?= $h($t('University mathematics in depth: logic and proof, calculus and analysis, linear and abstract algebra, probability and statistics, differential equations, complex analysis, topology and geometry. Definitions, theorems with proofs, worked examples, interactive figures and exercises with full solutions.')) ?></p>
      <dl><div><dt><?= $mCourses ?></dt><dd><?= $h($t('courses')) ?></dd></div><div><dt><?= $mChapters ?></dt><dd><?= $h($t('chapters')) ?></dd></div><div><dt><?= $mFigures ?></dt><dd><?= $h($t('interactive figures')) ?></dd></div></dl>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="physics/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <ellipse cx="150" cy="38" rx="118" ry="22" class="curve"/>
        <circle cx="150" cy="38" r="9" style="fill:#e0612d"/>
        <circle cx="262" cy="38" r="6.5" style="fill:#2a78d6"/>
        <circle cx="48" cy="32" r="4" style="fill:#4a3aa7"/>
      </svg>
      <h2><?= $h($t('Physics Atlas')) ?></h2>
      <p><?= $h($t('University physics in depth: mechanics, waves and optics, electromagnetism, thermodynamics and statistical physics, quantum mechanics, relativity and astrophysics. Definitions, laws with derivations, worked examples, interactive figures and exercises with full solutions.')) ?></p>
      <dl><div><dt><?= $yCourses ?></dt><dd><?= $h($t('courses')) ?></dd></div><div><dt><?= $yChapters ?></dt><dd><?= $h($t('chapters')) ?></dd></div><div><dt><?= $yFigures ?></dt><dd><?= $h($t('interactive figures')) ?></dd></div></dl>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="peptides/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <line x1="14" y1="40" x2="286" y2="40" class="curve"/>
        <path d="M51 34 C 51 6, 125 6, 125 34" style="fill:none;stroke:#e87ba4;stroke-width:2"/>
        <?php $res = ['#2a78d6', '#e87ba4', '#1baf7a', '#eda100', '#1baf7a', '#e87ba4', '#a5abb6', '#eb6834', '#e34948', '#4a3aa7', '#eda100', '#2a78d6'];
        foreach ($res as $i => $c): $x = 14 + $i * 24.7; ?>
        <circle cx="<?= $x ?>" cy="40" r="9" style="fill:<?= $c ?>"/>
        <?php endforeach; ?>
      </svg>
      <h2><?= $h($t('Peptide Atlas')) ?></h2>
      <p><?= $h($t('Therapeutic and research peptides — semaglutide, insulin, tirzepatide, BPC-157 and many more — drawn residue by residue, with 3D structures, history, regulation and worldwide attention.')) ?></p>
      <dl><div><dt><?= $pCount ?></dt><dd><?= $h($t('peptides')) ?></dd></div><div><dt>2</dt><dd><?= $h($t('languages')) ?></dd></div></dl>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
  </div>
  <p class="foot"><?= $h($t('The atlases are available in English and Simplified Chinese, run entirely from this server and keep no data about you.')) ?></p>
</main>
</body>
</html>
