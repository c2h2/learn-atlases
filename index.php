<?php
declare(strict_types=1);
/* Learn — landing page for the atlases under /learn (Maths, Physics, Electrical Engineering, LLM, Medicine, Peptide,
   and the curriculum skeletons Chemistry, Computer Science, Biology, Mechanical & Aerospace, Economics & Finance, Earth & Climate, English, Chinese). Self-contained. */

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
    'Electrical Engineering Atlas' => '电气电子工程图谱',
    'University electrical and electronic engineering: circuits, electronics and devices, digital and computer systems, signals and communications, electromagnetics, power and control. The curriculum of 22 courses is mapped out; the lessons are being written.' => '大学电气与电子工程：电路、电子技术与器件、数字与计算机系统、信号与通信、电磁场、电力与控制。22门课程的体系已经规划好，课文正在编写中。',
    'written' => '已完成',
    'LLM Atlas' => '大语言模型图谱',
    'Large language models from first principles: the mathematics of machine learning, neural networks and the Transformer, pretraining and scaling, post-training and reasoning, inference, agents, evaluation, interpretability and safety. The curriculum of 18 courses is mapped out; the lessons are being written.' => '从基本原理讲解大语言模型：机器学习的数学、神经网络与Transformer、预训练与规模化、后训练与推理能力、推理部署、智能体、评测、可解释性与安全。18门课程的体系已经规划好，课文正在编写中。',
    'Medicine Atlas' => '医学图谱',
    'The medical curriculum in depth: cells, genes, anatomy and physiology, infection and immunity, pathology and pharmacology, every organ system in health and disease, clinical practice and population health. Worked examples, interactive figures and exercises with full solutions. For education, not medical advice.' => '深入讲解医学课程：细胞、基因、解剖与生理，感染与免疫，病理与药理，各器官系统的生理与疾病，临床实践与人群健康。包含详细例题、交互图形以及附完整解答的练习。仅供教育学习，不构成医疗建议。',
    'Peptide Atlas' => '多肽图谱',
    'Therapeutic and research peptides — semaglutide, insulin, tirzepatide, BPC-157 and many more — drawn residue by residue, with 3D structures, history, regulation and worldwide attention.' => '治疗用和研究用多肽——司美格鲁肽、胰岛素、替尔泊肽、BPC-157 等——逐个残基绘制，并配有三维结构、发展历史、监管状态和全球关注度。',
    'courses' => '门课程', 'chapters' => '章', 'interactive figures' => '个交互图形', 'peptides' => '种多肽', 'languages' => '种语言',
    'Open' => '打开', 'The atlases are available in English and Simplified Chinese, run entirely from this server and keep no data about you.' => '这些图谱均提供英文和简体中文版本，完全由本服务器提供，不收集任何个人数据。',
    'skeleton' => '框架',
    'Skeletons, to be completed' => '框架，待完成',
    'These atlases are curricula so far: every course and chapter is mapped out with its summary and prerequisites, and the lessons are still to be written.' => '这些图谱目前还只是课程体系：每门课程和每一章都已规划好，附有概要和先修关系，课文尚待编写。',
    'Chemistry Atlas' => '化学图谱',
    'University chemistry: general and physical chemistry, inorganic and organic chemistry, analytical chemistry and spectroscopy, biochemistry and medicinal chemistry, materials, polymers and the environment. The curriculum is mapped out; the lessons are still to be written.' => '大学化学：普通化学与物理化学、无机化学与有机化学、分析化学与波谱、生物化学与药物化学、材料、高分子与环境。课程体系已经规划好，课文尚待编写。',
    'Computer Science Atlas' => '计算机科学图谱',
    'University computer science: programming and languages, data structures and algorithms, computability and complexity, computer systems, networks and distributed systems, databases and artificial intelligence, security and cryptography, graphics and software engineering. The curriculum is mapped out; the lessons are still to be written.' => '大学计算机科学：程序设计与语言、数据结构与算法、可计算性与复杂性、计算机系统、网络与分布式系统、数据库与人工智能、安全与密码学、图形学与软件工程。课程体系已经规划好，课文尚待编写。',
    'Biology Atlas' => '生物学图谱',
    'University biology: molecules and cells, genetics and genomics, microbes, plants and animals, neuroscience and behaviour, evolution, ecology and conservation, and quantitative biology. The curriculum is mapped out; the lessons are still to be written.' => '大学生物学：分子与细胞、遗传与基因组、微生物、植物与动物、神经科学与行为、进化、生态与保护以及定量生物学。课程体系已经规划好，课文尚待编写。',
    'Mechanical and Aerospace Engineering Atlas' => '机械与航空航天工程图谱',
    'University mechanical and aerospace engineering: solid mechanics, dynamics and vibration, thermodynamics, fluids and heat transfer, materials and manufacturing, design, control and robotics, aerodynamics, propulsion and orbits. The curriculum is mapped out; the lessons are still to be written.' => '大学机械与航空航天工程：固体力学、动力学与振动、热力学、流体与传热、材料与制造、设计、控制与机器人、空气动力学、推进与轨道。课程体系已经规划好，课文尚待编写。',
    'Economics and Finance Atlas' => '经济与金融图谱',
    'University economics and finance: microeconomics and macroeconomics, econometrics, game theory and market design, money, banking and corporate finance, asset pricing and derivatives, trade and development, and public and behavioural economics. For education, not investment advice. The curriculum is mapped out; the lessons are still to be written.' => '大学经济学与金融学：微观经济学与宏观经济学、计量经济学、博弈论与市场设计、货币银行与公司金融、资产定价与衍生品、国际贸易与经济发展，以及公共经济学与行为经济学。仅供教育学习，不构成投资建议。课程体系已经规划好，课文尚待编写。',
    'Earth and Climate Science Atlas' => '地球与气候科学图谱',
    'University Earth and climate science: the Earth system, minerals, rocks and tectonics, geophysics, landscapes and water, the atmosphere and weather, oceans and ice, Earth history, biogeochemistry and climate change. The curriculum is mapped out; the lessons are still to be written.' => '大学地球与气候科学：地球系统、矿物岩石与构造、地球物理、地貌与水、大气与天气、海洋与冰冻圈、地球历史、生物地球化学与气候变化。课程体系已经规划好，课文尚待编写。',
    'English Language Atlas' => '英语图谱',
    'English for learners, especially Chinese speakers, from level A1 to C2: pronunciation, vocabulary and grammar, reading and writing up to academic papers, listening and speaking, the history and varieties of English, and English–Chinese translation. The curriculum is mapped out; the lessons are still to be written.' => '面向英语学习者、尤其是以中文为母语者的英语课程，从 A1 到 C2 级：语音、词汇与语法，直至学术论文的阅读与写作，听说，英语的历史与变体，以及英汉互译。课程体系已经规划好，课文尚待编写。',
    'Chinese Language and Literature Atlas' => '中国语言文学图谱',
    'Chinese language and literature for native speakers, at the level of a university degree: characters and calligraphy, modern and classical Chinese, literature from the Book of Songs to the present day, literary theory and world literature, and writing and reasoning. The curriculum is mapped out; the lessons are still to be written.' => '写给以中文为母语者的中国语言文学课程，相当于大学汉语言文学专业的水平：汉字与书法、现代汉语与古代汉语、从《诗经》到当代的中国文学、文学理论与外国文学，以及写作与思维。课程体系已经规划好，课文尚待编写。',
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
$eCourses = 0;
$eChapters = 0;
foreach (glob(__DIR__ . '/ee/content/en/*/course.json') ?: [] as $f) {
    $eCourses++;
    $eChapters += count(json_decode((string)file_get_contents($f), true)['chapters'] ?? []);
}
$eWritten = count(glob(__DIR__ . '/ee/content/en/*/*.md') ?: []);
$lCourses = 0;
$lChapters = 0;
foreach (glob(__DIR__ . '/llm/content/en/*/course.json') ?: [] as $f) {
    $lCourses++;
    $lChapters += count(json_decode((string)file_get_contents($f), true)['chapters'] ?? []);
}
$lWritten = count(glob(__DIR__ . '/llm/content/en/*/*.md') ?: []);
$dCourses = 0;
$dChapters = 0;
foreach (glob(__DIR__ . '/medicine/content/en/*/course.json') ?: [] as $f) {
    $dCourses++;
    $dChapters += count(json_decode((string)file_get_contents($f), true)['chapters'] ?? []);
}
$dFigures = 0;
foreach (glob(__DIR__ . '/medicine/content/en/*/*.md') ?: [] as $f) {
    $dFigures += preg_match_all('/^:::\s*widget\b/m', (string)file_get_contents($f));
}
// curriculum skeletons: courses and chapters are mapped out, the lessons are still to be written
$sk = [];
foreach (['chemistry', 'cs', 'biology', 'mechanical', 'economics', 'earth', 'english', 'chinese'] as $dir) {
    $src = $dir === 'chinese' ? 'zh' : 'en'; // the Chinese Atlas is written in Chinese first
    $sk[$dir] = ['courses' => 0, 'chapters' => 0, 'written' => count(glob(__DIR__ . "/$dir/content/$src/*/*.md") ?: [])];
    foreach (glob(__DIR__ . "/$dir/content/en/*/course.json") ?: [] as $f) {
        $sk[$dir]['courses']++;
        $sk[$dir]['chapters'] += count(json_decode((string)file_get_contents($f), true)['chapters'] ?? []);
    }
}
$skName = fn(string $name): string => $zh ? $t($name) . '（' . $t('skeleton') . '）' : $name . ' (skeleton)';
$skStats = fn(string $dir): string => '<dl><div><dt>' . $sk[$dir]['courses'] . '</dt><dd>' . $h($t('courses')) . '</dd></div><div><dt>'
    . $sk[$dir]['chapters'] . '</dt><dd>' . $h($t('chapters')) . '</dd></div><div><dt>' . $sk[$dir]['written'] . '</dt><dd>' . $h($t('written')) . '</dd></div></dl>';
$skDots = function (array $points, float $r = 7): string {
    $cols = ['#6b7180', '#2a78d6', '#4a3aa7', '#1a9e6f', '#d6457c', '#e0612d', '#d99400'];
    $o = '';
    foreach ($points as $i => [$x, $y]) {
        $o .= '<circle cx="' . $x . '" cy="' . $y . '" r="' . $r . '" style="fill:' . $cols[$i % 7] . '"/>';
    }
    return $o;
};
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
    <a class="card" href="ee/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M6 34h96l6-16 12 32 12-32 12 32 12-32 12 32 6-16h96" class="curve"/>
        <?php $cols = ['#6b7180', '#2a78d6', '#4a3aa7', '#e0612d', '#1a9e6f', '#d99400', '#d6457c'];
        foreach ($cols as $i => $c): $x = 20 + $i * 43; ?>
        <circle cx="<?= $x ?>" cy="62" r="7" style="fill:<?= $c ?>"/>
        <?php endforeach; ?>
      </svg>
      <h2><?= $h($t('Electrical Engineering Atlas')) ?></h2>
      <p><?= $h($t('University electrical and electronic engineering: circuits, electronics and devices, digital and computer systems, signals and communications, electromagnetics, power and control. The curriculum of 22 courses is mapped out; the lessons are being written.')) ?></p>
      <dl><div><dt><?= $eCourses ?></dt><dd><?= $h($t('courses')) ?></dd></div><div><dt><?= $eChapters ?></dt><dd><?= $h($t('chapters')) ?></dd></div><div><dt><?= $eWritten ?></dt><dd><?= $h($t('written')) ?></dd></div></dl>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="llm/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <?php $cols = ['#6b7180', '#2a78d6', '#4a3aa7', '#e0612d', '#d99400', '#1a9e6f', '#d6457c'];
        foreach ([[0, 3], [1, 3], [2, 6], [3, 5], [1, 6]] as [$a, $b]): $xa = 20 + $a * 43; $xb = 20 + $b * 43; $hgt = 10 + ($b - $a) * 9; ?>
        <path d="M<?= $xa ?> 54 C <?= $xa ?> <?= 54 - $hgt ?>, <?= $xb ?> <?= 54 - $hgt ?>, <?= $xb ?> 54" class="curve"/>
        <?php endforeach;
        foreach ($cols as $i => $c): $x = 20 + $i * 43; ?>
        <circle cx="<?= $x ?>" cy="58" r="7" style="fill:<?= $c ?>"/>
        <?php endforeach; ?>
      </svg>
      <h2><?= $h($t('LLM Atlas')) ?></h2>
      <p><?= $h($t('Large language models from first principles: the mathematics of machine learning, neural networks and the Transformer, pretraining and scaling, post-training and reasoning, inference, agents, evaluation, interpretability and safety. The curriculum of 18 courses is mapped out; the lessons are being written.')) ?></p>
      <dl><div><dt><?= $lCourses ?></dt><dd><?= $h($t('courses')) ?></dd></div><div><dt><?= $lChapters ?></dt><dd><?= $h($t('chapters')) ?></dd></div><div><dt><?= $lWritten ?></dt><dd><?= $h($t('written')) ?></dd></div></dl>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="medicine/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M6 30h104l10-22 12 44 12-52 10 30h140" class="curve" style="stroke-linejoin:round"/>
        <?php $cols = ['#6b7180', '#1a9e6f', '#4a3aa7', '#2a78d6', '#e0612d', '#d6457c', '#d99400'];
        foreach ($cols as $i => $c): $x = 20 + $i * 43; ?>
        <circle cx="<?= $x ?>" cy="62" r="7" style="fill:<?= $c ?>"/>
        <?php endforeach; ?>
      </svg>
      <h2><?= $h($t('Medicine Atlas')) ?></h2>
      <p><?= $h($t('The medical curriculum in depth: cells, genes, anatomy and physiology, infection and immunity, pathology and pharmacology, every organ system in health and disease, clinical practice and population health. Worked examples, interactive figures and exercises with full solutions. For education, not medical advice.')) ?></p>
      <dl><div><dt><?= $dCourses ?></dt><dd><?= $h($t('courses')) ?></dd></div><div><dt><?= $dChapters ?></dt><dd><?= $h($t('chapters')) ?></dd></div><div><dt><?= $dFigures ?></dt><dd><?= $h($t('interactive figures')) ?></dd></div></dl>
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
  <section class="group">
    <h2><?= $h($t('Skeletons, to be completed')) ?></h2>
    <p><?= $h($t('These atlases are curricula so far: every course and chapter is mapped out with its summary and prerequisites, and the lessons are still to be written.')) ?></p>
  </section>
  <div class="cards">
    <a class="card" href="chemistry/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M40 14l20 11.5v23L40 60 20 48.5v-23zM60 25.5l26 15 26-15 26 15 26-15 26 15 26-15 26 15" class="curve"/>
        <circle cx="40" cy="37" r="12" class="curve"/>
        <?= $skDots([[86, 40.5], [112, 25.5], [138, 40.5], [164, 25.5], [190, 40.5], [216, 25.5], [242, 40.5]]) ?>
      </svg>
      <h2><?= $h($skName('Chemistry Atlas')) ?></h2>
      <p><?= $h($t('University chemistry: general and physical chemistry, inorganic and organic chemistry, analytical chemistry and spectroscopy, biochemistry and medicinal chemistry, materials, polymers and the environment. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('chemistry') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="cs/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M150 12L90 36M150 12l60 24M90 36L60 60M90 36l30 24M210 36l-30 24M210 36l30 24" class="curve"/>
        <?= $skDots([[150, 12], [90, 36], [210, 36], [60, 60], [120, 60], [180, 60], [240, 60]]) ?>
      </svg>
      <h2><?= $h($skName('Computer Science Atlas')) ?></h2>
      <p><?= $h($t('University computer science: programming and languages, data structures and algorithms, computability and complexity, computer systems, networks and distributed systems, databases and artificial intelligence, security and cryptography, graphics and software engineering. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('cs') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="biology/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <?php $a = $b = $rungs = '';
        for ($x = 10; $x <= 290; $x += 4) {
            $s = 20 * sin(M_PI * ($x - 10) / 40);
            $a .= ($a === '' ? 'M' : 'L') . $x . ' ' . round(36 - $s, 1);
            $b .= ($b === '' ? 'M' : 'L') . $x . ' ' . round(36 + $s, 1);
        }
        foreach (range(0, 6) as $k) { $rungs .= 'M' . (30 + 40 * $k) . ' 16V56'; } ?>
        <path d="<?= $a ?>" class="curve"/><path d="<?= $b ?>" class="curve"/><path d="<?= $rungs ?>" class="curve" style="stroke-dasharray:2 3"/>
        <?= $skDots(array_map(fn($k) => [30 + 40 * $k, 36], range(0, 6)), 6.5) ?>
      </svg>
      <h2><?= $h($skName('Biology Atlas')) ?></h2>
      <p><?= $h($t('University biology: molecules and cells, genetics and genomics, microbes, plants and animals, neuroscience and behaviour, evolution, ecology and conservation, and quantitative biology. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('biology') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="mechanical/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M30 52H270M60 16H240M30 52L60 16 90 52 120 16 150 52 180 16 210 52 240 16 270 52M30 52l-7 11h14zM270 52l-7 11h14z" class="curve" style="stroke-linejoin:round"/>
        <?= $skDots([[30, 52], [60, 16], [90, 52], [120, 16], [150, 52], [180, 16], [210, 52], [240, 16], [270, 52]], 5.5) ?>
      </svg>
      <h2><?= $h($skName('Mechanical and Aerospace Engineering Atlas')) ?></h2>
      <p><?= $h($t('University mechanical and aerospace engineering: solid mechanics, dynamics and vibration, thermodynamics, fluids and heat transfer, materials and manufacturing, design, control and robotics, aerodynamics, propulsion and orbits. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('mechanical') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="economics/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M14 4V62H292M30 52L70 44 110 48 150 32 190 36 230 20 270 12" class="curve"/>
        <?= $skDots([[30, 52], [70, 44], [110, 48], [150, 32], [190, 36], [230, 20], [270, 12]], 6) ?>
      </svg>
      <h2><?= $h($skName('Economics and Finance Atlas')) ?></h2>
      <p><?= $h($t('University economics and finance: microeconomics and macroeconomics, econometrics, game theory and market design, money, banking and corporate finance, asset pricing and derivatives, trade and development, and public and behavioural economics. For education, not investment advice. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('economics') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="earth/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <path d="M6 50L58 22l34 18 46-30 48 34 40-18 68 26" class="curve" style="stroke-linejoin:round"/>
        <path d="M6 60c12-5 24-5 36 0s24 5 36 0 24-5 36 0 24 5 36 0 24-5 36 0 24 5 36 0 24-5 36 0 24 5 36 0" class="curve"/>
        <?= $skDots([[58, 22], [92, 40], [138, 10], [186, 44], [226, 26]], 6) ?>
        <circle cx="266" cy="16" r="9" style="fill:#e0612d"/>
      </svg>
      <h2><?= $h($skName('Earth and Climate Science Atlas')) ?></h2>
      <p><?= $h($t('University Earth and climate science: the Earth system, minerals, rocks and tectonics, geophysics, landscapes and water, the atmosphere and weather, oceans and ice, Earth history, biogeochemistry and climate change. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('earth') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="english/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <?php /* the IPA vowel chart: front on the left, close at the top, with English monophthongs */ ?>
        <path d="M60 8H240V62H120zM80 26H240M100 44H240M150 8l30 54" class="curve" style="stroke-linejoin:round"/>
        <?= $skDots([[66, 10], [92, 18], [98, 34], [124, 56], [165, 35], [192, 48], [236, 58], [234, 36], [212, 18], [234, 10]], 5.5) ?>
      </svg>
      <h2><?= $h($skName('English Language Atlas')) ?></h2>
      <p><?= $h($t('English for learners, especially Chinese speakers, from level A1 to C2: pronunciation, vocabulary and grammar, reading and writing up to academic papers, listening and speaking, the history and varieties of English, and English–Chinese translation. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('english') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
    <a class="card" href="chinese/<?= $L ?>">
      <svg class="motif" viewBox="0 0 300 70" aria-hidden="true">
        <?php /* the tones of a five-character quatrain, read in columns from the right: filled = level (平), open = oblique (仄); and a seal */ ?>
        <?php foreach ([[186, 9], [186, 22], [186, 61], [162, 35], [162, 48], [138, 48], [138, 61], [114, 9], [114, 22], [114, 35]] as [$x, $y]): ?><circle cx="<?= $x ?>" cy="<?= $y ?>" r="4.6" class="curve"/><?php endforeach; ?>
        <?= $skDots([[186, 35], [186, 48], [162, 9], [162, 22], [162, 61], [138, 9], [138, 22], [138, 35], [114, 48], [114, 61]], 5.2) ?>
        <rect x="62" y="40" width="22" height="22" rx="2.5" style="fill:#d6457c"/><rect x="65.5" y="43.5" width="15" height="15" style="fill:none;stroke:#fff;stroke-width:1.2"/>
      </svg>
      <h2><?= $h($skName('Chinese Language and Literature Atlas')) ?></h2>
      <p><?= $h($t('Chinese language and literature for native speakers, at the level of a university degree: characters and calligraphy, modern and classical Chinese, literature from the Book of Songs to the present day, literary theory and world literature, and writing and reasoning. The curriculum is mapped out; the lessons are still to be written.')) ?></p>
      <?= $skStats('chinese') ?>
      <span class="open"><?= $h($t('Open')) ?> →</span>
    </a>
  </div>
  <p class="foot"><?= $h($t('The atlases are available in English and Simplified Chinese, run entirely from this server and keep no data about you.')) ?></p>
</main>
</body>
</html>
