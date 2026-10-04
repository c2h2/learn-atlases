<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';

$all = atlas_all();
$stamp = function (string $dir): string {
    $files = glob(ATLAS_CACHE . "/$dir/*.json") ?: [];
    if (!$files) return t('not yet fetched');
    return fmt_date(date('Y-m-d', max(array_map('filemtime', $files))));
};
$nRefs = array_sum(array_map(fn($p) => count($p['references'] ?? []), $all));
$nEvents = array_sum(array_map(fn($p) => count($p['history'] ?? []), $all));
$api = h(url('api.php'));

page_head(t('About'), 'about', ['description' => t('Sources, methods and caveats behind Peptide Atlas.')]);
?>
<div class="wrap">
<?php if (is_zh()): ?>
  <header style="padding:40px 0 6px">
    <h1 class="page-title">资料来源与方法</h1>
    <p class="lede" style="margin-top:14px">多肽图谱把为每种肽逐条核对的档案，与从公共数据库自动获取的数据结合在一起。本页说明每个数字从何而来，以及它能说明什么、不能说明什么。</p>
  </header>

  <div class="callout"><b>不构成医疗建议。</b>本图谱出于教育目的介绍药物和研究用化学品。其中许多肽并未获准用于人体，灰色市场产品常常存在标签不符、剂量不足或受污染等问题。使用任何药物之前，请咨询合格的医生。</div>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">人工整理的档案</h2>
    <p>全部<?= count($all) ?>种肽都有一份结构化档案：标注了每个非天然残基和修饰的序列、作用靶点、发现经过、共<?= number_format($nEvents) ?>条带日期的历史事件、已获批和在研用途、安全性、各地区监管状态，以及共<?= number_format($nRefs) ?>篇关键参考文献。各类标识符已与PubChem、RCSB PDB、UniProt、ChEMBL和KEGG核对，每篇参考文献都已通过PubMed或Crossref核实。监管事件更新至2026年9月。中文内容由英文档案翻译而来，专有名词以英文原文为准。</p>
    <p><b>状态</b>：获美国FDA或欧洲药品管理局批准的记为“已获批”；仅获其他监管机构（如俄罗斯或日本）批准的记为“区域获批”；处于正式研发阶段、但尚未在任何地方获批的记为“临床试验中”；其余记为“仅限研究”。</p>
    <p><b>人体证据</b>按1至5分评级：<?php foreach (EVIDENCE as $n => $desc): ?><?= $n ?>分 = <?= h(t($desc)) ?><?= $n < 5 ? '；' : '。' ?><?php endforeach; ?></p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">关注度</h2>
    <p><b>维基百科浏览量</b>（获取于<?= h($stamp('wiki')) ?>）来自维基媒体REST API，只统计人类读者。对于每种肽，图谱从英文条目出发，找到链接到它的所有语言版本，并把条目及其重定向页的浏览量相加，因此输入“Ozempic”或“Mounjaro”的读者会分别计入司美格鲁肽和替尔泊肽。</p>
    <p><b>语言关注指数</b>等于某种肽在某一语言版本中的浏览量，除以该版本同期12个月的总浏览量（每百万次）。它是一种按版本规模校正后的相对关注度指标，思路与谷歌趋势类似。</p>
    <p><b>按国家统计的读者</b>来自维基媒体经差分隐私处理的每日数据集。该数据集加入经过校准的噪声，只有当某个国家对某个页面的日浏览量超过约90次（高风险国家的门槛更高）时才会公布。因此地图显示的是大规模读者群所在地，会遗漏较小的读者群。图谱使用28天的时间窗口，并与一年前的同期窗口比较。</p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">研究与临床试验</h2>
    <p><b>PubMed</b>（获取于<?= h($stamp('pubmed')) ?>）：每种肽页面上所示检索式每年匹配的论文数，取自PubMed自带的“按年份统计结果”，总数来自NCBI E-utilities。检索范围为标题和摘要，并包含研发代号，因此非常通用的名称（如胰岛素或催产素）会得到数量庞大、范围较宽的结果。</p>
    <p><b>ClinicalTrials.gov</b>（获取于<?= h($stamp('ctgov')) ?>）：通过第2版API获取干预措施与该肽检索词匹配的全部注册研究。一项研究在其设有研究中心的每个国家各计一次。许多试验直到2000年代中期才被强制要求注册，因此较早的研究数量被低估。</p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">结构与化学性质</h2>
    <p><b>实验结构</b>来自RCSB蛋白质数据库（PDB）。为便于浏览器加载，文件经过精简（只保留第一个模型，去除水分子，大型复合物去除氢原子）。查看器会突出显示肽链，并只显示与之接触的链，通常是它的受体。</p>
    <p>对于没有实验结构的肽，<b>预测模型</b>由ESMFold（Meta AI）生成。ESMFold只认识20种天然氨基酸，因此非天然残基按与其最接近的天然氨基酸建模，脂质链则被省略；查看器中会显示置信度（pLDDT）。短肽或经过大量修饰的肽使用<b>计算构象</b>：由RDKit根据精确的化学结构生成，或取自PubChem。这么小的肽十分柔软，单一构象只是示意，并不代表它的真实形状。</p>
    <p>序列性质的计算方法：电荷和等电点采用EMBOSS的pKa参数，亲疏水性采用Kyte–Doolittle标度，螺旋疏水矩采用Eisenberg共识标度。这些数值只描述肽主链，偶联的脂肪酸和连接子不计入。</p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">致谢</h2>
    <p>3D渲染使用<a href="https://3dmol.csb.pitt.edu/">3Dmol.js</a>（BSD许可证）；图表和地图使用<a href="https://d3js.org/">D3</a>和TopoJSON（ISC许可证）；国家边界来自Natural Earth（经world-atlas）。字体：Archivo与JetBrains Mono（SIL开放字体许可证），中文使用系统字体。维基百科文字摘录遵循CC BY-SA 4.0许可，并链接回原条目。每个页面背后的数据都可通过<a href="<?= $api ?>">JSON API</a>获取。</p>
  </section>
<?php else: ?>
  <header style="padding:40px 0 6px">
    <h1 class="page-title">Sources and method</h1>
    <p class="lede" style="margin-top:14px">Peptide Atlas combines a hand-checked record for each peptide with data pulled automatically from public databases. This page explains where every number comes from and what it can and cannot tell you.</p>
  </header>

  <div class="callout"><b>Not medical advice.</b> The atlas describes medicines and research chemicals for education. Many of the peptides here are not approved for human use, and grey-market products are frequently mislabelled, under-dosed or contaminated. Talk to a qualified clinician before using any medicine.</div>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">The curated records</h2>
    <p>Each of the <?= count($all) ?> peptides has a structured record: sequence with every non-natural residue and modification, targets, discovery, <?= number_format($nEvents) ?> dated history events, approved and investigational uses, safety, regulatory status by region and <?= number_format($nRefs) ?> key references. Identifiers were checked against PubChem, RCSB PDB, UniProt, ChEMBL and KEGG, and every reference was checked against PubMed or Crossref. Regulatory events are current to September 2026. A Chinese version of every record is available; where the two differ, the English original prevails.</p>
    <p><b>Status</b> is <i>approved</i> when the FDA or the European Medicines Agency has authorised the peptide, <i>approved regionally</i> when only other regulators have (for example Russia or Japan), <i>in clinical trials</i> when it is under formal development but not approved anywhere, and <i>research only</i> otherwise.</p>
    <p><b>Human evidence</b> is scored from 1 to 5: <?php foreach (EVIDENCE as $n => $desc): ?><?= $n ?> = <?= h(lcfirst($desc)) ?><?= $n < 5 ? '; ' : '.' ?><?php endforeach; ?></p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">Popularity</h2>
    <p><b>Wikipedia pageviews</b> (fetched <?= h($stamp('wiki')) ?>) come from the Wikimedia REST API, counting human readers only. For each peptide the atlas follows the English article to every language edition that links to it and adds up the article and its redirects, so readers who type “Ozempic” or “Mounjaro” are counted for semaglutide and tirzepatide.</p>
    <p>The <b>language interest index</b> divides a peptide's views in one edition by that edition's total pageviews over the same 12 months (per million). It is a size-corrected measure of relative interest, similar in spirit to Google Trends.</p>
    <p><b>Readers by country</b> use Wikimedia's differentially private daily dataset, which adds calibrated noise and publishes a country-page pair only when it receives more than about 90 views in a day (more for higher-risk countries). The maps therefore show where large audiences are, and miss small ones. The atlas uses 28-day windows and compares each with the same window a year earlier.</p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">Research and trials</h2>
    <p><b>PubMed</b> (fetched <?= h($stamp('pubmed')) ?>): the number of papers per year matching the query shown on each peptide page, taken from PubMed's own results-by-year timeline, with the total from NCBI E-utilities. Queries search titles and abstracts and include code names, so very generic names (for example insulin or oxytocin) return large, broad counts.</p>
    <p><b>ClinicalTrials.gov</b> (fetched <?= h($stamp('ctgov')) ?>): all registered studies whose interventions match the peptide's search terms, through the version 2 API. Each study counts once per country in which it has a site. Registration became mandatory for many trials only in the mid-2000s, so older research is under-represented.</p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">Structures and chemistry</h2>
    <p><b>Experimental structures</b> come from the RCSB Protein Data Bank. Files are trimmed for the browser (first model only, no water, no hydrogens on large complexes). The viewer highlights the peptide chain and shows only the chains that touch it, typically its receptor.</p>
    <p><b>Predicted models</b> are made with ESMFold (Meta AI) for peptides without an experimental structure. ESMFold only understands the 20 natural amino acids, so non-natural residues are modelled as their closest natural parent and lipid chains are omitted; confidence (pLDDT) is shown in the viewer. <b>Computed conformers</b> for short or heavily modified peptides are generated from the exact chemical structure with RDKit, or taken from PubChem. Peptides this small are flexible, so a single conformer is an illustration, not the shape.</p>
    <p>Sequence properties use the EMBOSS pKa set for charge and isoelectric point, the Kyte–Doolittle scale for hydropathy and Eisenberg's consensus scale for the helical hydrophobic moment. They describe the peptide backbone only; conjugated fatty acids and linkers are ignored.</p>
  </section>

  <section class="block prose">
    <h2 class="section" style="margin-bottom:12px">Credits</h2>
    <p>3D rendering by <a href="https://3dmol.csb.pitt.edu/">3Dmol.js</a> (BSD licence); charts and maps by <a href="https://d3js.org/">D3</a> and TopoJSON (ISC); country shapes from Natural Earth via world-atlas. Typefaces: Archivo and JetBrains Mono (SIL Open Font Licence). Wikipedia text excerpts are under CC BY-SA 4.0 and link back to their articles. The data behind every page is available from the <a href="<?= $api ?>">JSON API</a>.</p>
  </section>
<?php endif; ?>
</div>
<?php page_foot();
