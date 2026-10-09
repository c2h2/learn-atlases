# Biology Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university biology textbooks
(e.g. 翟中和《细胞生物学》, 王镜岩《生物化学》, 刘祖洞《遗传学》, 沈萍《微生物学》,
周云龙《植物生物学》, 陈阅增《普通生物学》). Neutral, precise textbook register. Faithful to the
English: never add, drop or change facts, numbers, conditions or caveats. Translate meaning, not
word order. Terminology follows 全国科学技术名词审定委员会 (the national committee for the
standardisation of scientific terms); where a term has both a committee form and a form that is
universal in teaching, use the committee form and give the common one in brackets at first use.

## Files

```
content/zh/<course>/course.json   overlay: ONLY the translatable fields, same structure and list order
content/zh/<course>/<chapter>.md  full translation of content/en/<course>/<chapter>.md
```

`course.json` overlay keys: `title`, `full_title`, `tagline`, `summary`, `overview` (list),
`outcomes` (list), `chapters` (list of `{"title", "summary"}` in the same order), `history`
(list of `{"title", "detail"}` in the same order — keep `people` names in Latin script; do not
include `year`), `references` (list of `{"note"}` — book titles and authors stay as published).
Do not copy slugs, ids or other untranslated fields.

## Markup must stay identical

The Chinese lesson must have **exactly the same block structure** as the English one:

- the same headings in the same order, with the same `{#id}` if the English has one;
- every `:::kind` block in the same order with the same `{#id …}` attributes, `level=` and
  `check="…"` values unchanged; the same nesting (solutions, hints, quiz options with `[x]`/`[ ]`);
- every `$…$` and `$$…$$` formula unchanged, except words inside `\text{…}`, which are translated
  (`\text{if } x>0` → `\text{当 } x>0`); keep `{#eq-…}` labels;
- every `:::widget` block: keep the type and every key/value exactly; translate only `caption:`
  and `title:` values, and words inside `\text{…}` in `labels:` (legend labels are TeX:
  `labels: u(x,t); \text{right-moving half}` → `labels: u(x,t); \text{右行波}`);
- references `[[…]]` unchanged (their link text is generated in Chinese automatically); a custom
  label `[[target|text]]` gets its `text` translated;
- tables keep their columns; code blocks are not translated (comments in code may be).

`tools/check.php` compares the numbered blocks and anchors of each Chinese lesson with the English
one and reports any difference as an ERROR.

## Typography

- Full-width Chinese punctuation in Chinese sentences: ，。；：？！（）“”、
- Write inline formulas and numbers directly next to Chinese characters, without spaces:
  `酶在底物浓度$[S]$较低时`. The site adds a thin space around inline formulas in Chinese text.
- Bold `**…**` for the defined term at its definition, as in the English.
- Numbers, units and Latin abbreviations keep half-width characters.
- People's names: give the standard Chinese transliteration with the Latin name in brackets at
  first mention — 达尔文（Darwin）, 孟德尔（Mendel）, 林奈（Linnaeus）, 巴斯德（Pasteur）,
  科赫（Koch）, 沃森（Watson）, 克里克（Crick）, 富兰克林（Franklin）, 摩尔根（Morgan）,
  麦克林托克（McClintock）, 哈迪（Hardy）, 魏因贝格（Weinberg）, 费希尔（Fisher）,
  赖特（Wright）, 霍尔丹（Haldane）, 霍奇金（Hodgkin）, 赫克斯利（Huxley）, 米勒（Miller）,
  克雷布斯（Krebs）, 米切尔（Mitchell）, 卡尔文（Calvin）, 卡哈尔（Cajal）, 廷伯根（Tinbergen）,
  洛伦茨（Lorenz）, 汉密尔顿（Hamilton）, 威尔逊（Wilson）, 迈尔（Mayr）, 杜布赞斯基（Dobzhansky）,
  木村资生（Kimura）, 屠呦呦, 袁隆平. In history blocks give the Chinese name followed by the
  Latin name in brackets.
- **Species names stay in Latin**, italic as in the English source, and are not transliterated:
  *Escherichia coli*、*Arabidopsis thaliana*、*Drosophila melanogaster*. Add the Chinese common
  name in brackets at first use where one is standard: *Escherichia coli*（大肠杆菌）、
  *Arabidopsis thaliana*（拟南芥）、*Drosophila melanogaster*（黑腹果蝇）、
  *Caenorhabditis elegans*（秀丽隐杆线虫）、*Saccharomyces cerevisiae*（酿酒酵母）。
  Higher taxa use the Chinese name (哺乳纲、被子植物、豆科) with the Latin in brackets if the
  English gives it. Strain names and gene symbols are never translated.
- **Gene and protein symbols stay in Latin script** with the English conventions of italics and
  capitalisation (*BRCA1*、*lacZ*、LacZ). Sequences, codons, amino-acid codes, enzyme names in
  symbol form (ATP 合酶 for ATP synthase) and units keep half-width Latin characters.
- Book and paper titles: Chinese title in 《》 followed by the original in brackets when well known.


## Terminology (use consistently)

Mathematical and statistical terms follow the Maths Atlas guide
(`/var/www/f.g77k.com/learn/maths/tools/TRANSLATION_GUIDE_ZH.md` §Terminology): 均值（数学期望）、
方差、置信区间、假设检验、显著性水平、回归、最小二乘、马尔可夫链、微分方程、平衡点、稳定性 …

### Biology terms

| English | 中文 |
|---|---|
| cell / prokaryote / eukaryote | 细胞 / 原核生物 / 真核生物 |
| cell membrane / lipid bilayer / fluid-mosaic model | 细胞膜 / 脂双层 / 流动镶嵌模型 |
| organelle / nucleus / cytoplasm / cytosol | 细胞器 / 细胞核 / 细胞质 / 细胞质基质 |
| endoplasmic reticulum / Golgi apparatus / lysosome / peroxisome | 内质网 / 高尔基体 / 溶酶体 / 过氧化物酶体 |
| mitochondrion / chloroplast / endosymbiosis | 线粒体 / 叶绿体 / 内共生 |
| cytoskeleton / microfilament / microtubule / motor protein | 细胞骨架 / 微丝 / 微管 / 马达蛋白（分子马达） |
| diffusion / osmosis / active transport / ion channel / pump | 扩散 / 渗透 / 主动运输 / 离子通道 / 泵 |
| endocytosis / exocytosis / vesicle / signal sequence | 内吞（内化） / 外排（胞吐） / 囊泡 / 信号序列 |
| cell signalling / receptor / second messenger / signal transduction | 细胞信号转导 / 受体 / 第二信使 / 信号转导 |
| cell cycle / mitosis / meiosis / cytokinesis / checkpoint | 细胞周期 / 有丝分裂 / 减数分裂 / 胞质分裂 / 检查点 |
| apoptosis / stem cell / extracellular matrix / cell junction | 细胞凋亡 / 干细胞 / 细胞外基质 / 细胞连接 |
| amino acid / peptide bond / protein / polypeptide | 氨基酸 / 肽键 / 蛋白质 / 多肽 |
| primary / secondary / tertiary / quaternary structure | 一级结构 / 二级结构 / 三级结构 / 四级结构 |
| α-helix / β-sheet / domain / protein folding / chaperone | α螺旋 / β折叠 / 结构域 / 蛋白质折叠 / 分子伴侣 |
| enzyme / substrate / active site / cofactor / coenzyme | 酶 / 底物 / 活性部位（活性中心） / 辅因子 / 辅酶 |
| Michaelis–Menten equation / Michaelis constant / turnover number | 米氏方程 / 米氏常数 / 转换数 |
| competitive / non-competitive inhibition / allosteric / cooperativity | 竞争性抑制 / 非竞争性抑制 / 别构（变构） / 协同性 |
| carbohydrate / monosaccharide / polysaccharide / glycogen | 糖类（碳水化合物） / 单糖 / 多糖 / 糖原 |
| lipid / fatty acid / phospholipid / steroid | 脂质 / 脂肪酸 / 磷脂 / 类固醇（甾类） |
| metabolism / anabolism / catabolism / metabolic pathway / flux | 代谢 / 合成代谢（同化作用） / 分解代谢（异化作用） / 代谢途径 / 通量 |
| free energy / coupled reaction / ATP / redox / NADH | 自由能 / 偶联反应 / ATP / 氧化还原 / NADH |
| glycolysis / fermentation / citric acid cycle | 糖酵解 / 发酵 / 三羧酸循环（柠檬酸循环） |
| electron transport chain / chemiosmosis / proton-motive force / ATP synthase | 电子传递链 / 化学渗透 / 质子动力势 / ATP 合酶 |
| oxidative phosphorylation / gluconeogenesis / β-oxidation | 氧化磷酸化 / 糖异生 / β氧化 |
| gene / allele / locus / genotype / phenotype | 基因 / 等位基因 / 基因座（位点） / 基因型 / 表型 |
| dominant / recessive / homozygous / heterozygous / carrier | 显性 / 隐性 / 纯合（同质结合） / 杂合 / 携带者 |
| segregation / independent assortment / test cross / Punnett square | 分离（定律） / 自由组合 / 测交 / 棋盘格（Punnett 方格） |
| incomplete dominance / codominance / epistasis / penetrance | 不完全显性 / 共显性 / 上位效应 / 外显率 |
| chromosome / chromatin / centromere / telomere / karyotype | 染色体 / 染色质 / 着丝粒 / 端粒 / 核型 |
| homologous chromosomes / crossing over / recombination frequency | 同源染色体 / 交换（交叉互换） / 重组率（重组频率） |
| linkage / genetic map / map unit (centimorgan) / interference | 连锁 / 遗传图（连锁图） / 图距单位（厘摩） / 干扰 |
| sex linkage / dosage compensation / genomic imprinting | 性连锁 / 剂量补偿 / 基因组印记 |
| mutation / point mutation / frameshift / mutagen / aneuploidy / polyploidy | 突变 / 点突变 / 移码（突变） / 诱变剂 / 非整倍体 / 多倍体 |
| transformation / conjugation / transduction / plasmid | 转化 / 接合 / 转导 / 质粒 |
| DNA / RNA / nucleotide / base pair / double helix / antiparallel | DNA / RNA / 核苷酸 / 碱基对 / 双螺旋 / 反向平行 |
| replication / replication fork / origin of replication / DNA polymerase | 复制 / 复制叉 / 复制起点 / DNA 聚合酶 |
| DNA repair / mismatch repair / double-strand break / transposon | DNA 修复 / 错配修复 / 双链断裂 / 转座子 |
| transcription / promoter / RNA polymerase / terminator | 转录 / 启动子 / RNA 聚合酶 / 终止子 |
| messenger / transfer / ribosomal RNA / splicing / intron / exon | 信使 RNA / 转运 RNA / 核糖体 RNA / 剪接 / 内含子 / 外显子 |
| genetic code / codon / reading frame / translation / ribosome | 遗传密码 / 密码子 / 阅读框 / 翻译 / 核糖体 |
| operon / repressor / activator / enhancer / transcription factor | 操纵子 / 阻遏蛋白 / 激活蛋白（激活因子） / 增强子 / 转录因子 |
| epigenetics / DNA methylation / histone modification / non-coding RNA | 表观遗传学 / DNA 甲基化 / 组蛋白修饰 / 非编码 RNA |
| recombinant DNA / vector / cloning / polymerase chain reaction | 重组 DNA / 载体 / 克隆 / 聚合酶链反应（PCR） |
| sequencing / genome / assembly / annotation / read | 测序 / 基因组 / 组装 / 注释 / 读长（序列读段） |
| genome editing / CRISPR / guide RNA / knockout / transgenic | 基因组编辑 / CRISPR / 向导 RNA / 敲除 / 转基因 |
| transcriptome / proteome / microarray / RNA sequencing / single-cell | 转录组 / 蛋白质组 / 基因芯片（微阵列） / RNA 测序 / 单细胞 |
| sequence alignment / substitution matrix / gap penalty / E-value | 序列比对 / 替换矩阵（打分矩阵） / 空位罚分 / E 值 |
| homology / orthologue / paralogue / gene family | 同源 / 直系同源（基因） / 旁系同源（基因） / 基因家族 |
| hidden Markov model / position-weight matrix / sequence logo | 隐马尔可夫模型 / 位置权重矩阵 / 序列标识图（logo 图） |
| evolution / natural selection / fitness / adaptation / variation | 进化（演化） / 自然选择 / 适合度 / 适应 / 变异 |
| sexual selection / mate choice / sexual dimorphism | 性选择 / 配偶选择 / 两性异形 |
| genetic drift / effective population size / bottleneck / founder effect | 遗传漂变 / 有效群体大小 / 瓶颈效应 / 奠基者效应 |
| gene flow / migration / population structure / inbreeding | 基因流 / 迁移 / 群体结构 / 近交（内繁育） |
| Hardy–Weinberg equilibrium / allele frequency / selection coefficient | 哈迪-魏因贝格平衡（遗传平衡） / 基因频率（等位基因频率） / 选择系数 |
| linkage disequilibrium / haplotype / molecular clock / neutral theory | 连锁不平衡 / 单倍型 / 分子钟 / 中性学说 |
| heritability / quantitative trait / breeder's equation / QTL | 遗传率（遗传力） / 数量性状 / 育种方程 / 数量性状基因座（QTL） |
| species / speciation / reproductive isolation / hybrid zone | 物种 / 物种形成 / 生殖隔离 / 杂交带 |
| phylogeny / clade / monophyletic / homoplasy / parsimony / outgroup | 系统发生（系统发育） / 单系群（进化枝） / 单系的 / 同塑性（趋同性状） / 简约法 / 外群 |
| taxonomy / binomial nomenclature / taxon / domain / phylum | 分类学 / 双名法 / 分类单元 / 域 / 门 |
| adaptive radiation / mass extinction / convergent evolution | 适应辐射 / 大灭绝（集群灭绝） / 趋同进化 |
| bacteria / archaea / virus / bacteriophage / protist / fungus | 细菌 / 古菌 / 病毒 / 噬菌体 / 原生生物 / 真菌 |
| spore / biofilm / microbiome / symbiosis / mutualism / commensalism | 孢子 / 生物膜 / 微生物组（微生物群落） / 共生 / 互利共生 / 偏利共生 |
| pathogen / virulence / antibiotic / antimicrobial resistance | 病原体 / 毒力 / 抗生素 / 抗微生物药物耐药性（耐药性） |
| nitrogen fixation / chemolithotroph / phototroph / anaerobic | 固氮 / 化能无机营养（化能自养） / 光能营养 / 厌氧的 |
| meristem / xylem / phloem / stoma / cuticle / root hair | 分生组织 / 木质部 / 韧皮部 / 气孔 / 角质层 / 根毛 |
| water potential / transpiration / cohesion–tension theory / translocation | 水势 / 蒸腾 / 蒸腾拉力学说（内聚力学说） / 运输（韧皮部运输） |
| photosynthesis / photosystem / Calvin cycle / photorespiration | 光合作用 / 光系统 / 卡尔文循环 / 光呼吸 |
| C3 / C4 / CAM plant / mycorrhiza / nodule | C3 植物 / C4 植物 / CAM 植物（景天酸代谢植物） / 菌根 / 根瘤 |
| auxin / cytokinin / gibberellin / abscisic acid / ethylene | 生长素 / 细胞分裂素 / 赤霉素 / 脱落酸 / 乙烯 |
| phototropism / photoperiodism / circadian rhythm / vernalisation | 向光性 / 光周期现象 / 昼夜节律（生物钟） / 春化 |
| pollination / double fertilisation / seed / germination / dispersal | 传粉 / 双受精 / 种子 / 萌发 / 散布（扩散） |
| homeostasis / negative feedback / set point / ectotherm / endotherm | 稳态 / 负反馈 / 调定点 / 变温动物（外温动物） / 恒温动物（内温动物） |
| metabolic rate / allometry / scaling exponent / torpor / hibernation | 代谢率 / 异速生长 / 标度指数 / 蛰伏 / 冬眠 |
| gas exchange / gill / trachea / haemoglobin / oxygen dissociation curve | 气体交换 / 鳃 / 气管 / 血红蛋白 / 氧解离曲线 |
| osmoregulation / excretion / nephron / urea / countercurrent exchange | 渗透调节 / 排泄 / 肾单位 / 尿素 / 逆流交换 |
| muscle contraction / sarcomere / actin / myosin / motor unit | 肌肉收缩 / 肌小节 / 肌动蛋白 / 肌球蛋白 / 运动单位 |
| hormone / endocrine gland / target cell / feedback loop | 激素 / 内分泌腺 / 靶细胞 / 反馈回路 |
| neuron / glia / axon / dendrite / synapse / neurotransmitter | 神经元 / 胶质细胞 / 轴突 / 树突 / 突触 / 神经递质 |
| resting potential / action potential / depolarisation / refractory period | 静息电位 / 动作电位 / 去极化 / 不应期 |
| Nernst equation / voltage-gated channel / myelin / saltatory conduction | 能斯特方程 / 电压门控通道 / 髓鞘 / 跳跃式传导 |
| receptive field / sensory transduction / central pattern generator | 感受野 / 感觉转导 / 中枢模式发生器 |
| long-term potentiation / Hebbian learning / plasticity / memory | 长时程增强 / 赫布学习 / 可塑性 / 记忆 |
| fertilisation / cleavage / blastula / gastrulation / germ layer | 受精 / 卵裂 / 囊胚 / 胚胎原肠形成（胃肠胚形成） / 胚层 |
| morphogen / gradient / induction / cell fate / determination | 形态发生素 / 梯度 / 诱导 / 细胞命运 / 决定 |
| segmentation / Hox gene / body plan / organogenesis / regeneration | 体节形成（分节） / Hox 基因 / 体型模式（体制） / 器官发生 / 再生 |
| population / community / ecosystem / biome / niche | 种群 / 群落 / 生态系统 / 生物群区（生物群落型） / 生态位 |
| life table / exponential growth / logistic growth / carrying capacity | 生命表 / 指数增长 / 逻辑斯谛增长 / 环境容纳量 |
| density dependence / intrinsic rate of increase / metapopulation | 密度依赖（密度制约） / 内禀增长率 / 集合种群（异质种群） |
| competition / competitive exclusion / predation / herbivory / parasitism | 竞争 / 竞争排斥 / 捕食 / 植食（草食） / 寄生 |
| functional response / trophic level / food web / keystone species | 功能反应 / 营养级 / 食物网 / 关键种 |
| primary production / decomposition / nutrient cycling / succession | 初级生产 / 分解作用 / 养分循环（物质循环） / 演替 |
| species richness / diversity index / species–area relationship | 物种丰富度 / 多样性指数 / 种-面积关系 |
| island biogeography / biodiversity / endemic / extinction | 岛屿生物地理学 / 生物多样性 / 特有的 / 灭绝 |
| habitat fragmentation / corridor / protected area / restoration | 生境破碎化 / 廊道 / 保护区 / 恢复（生态恢复） |
| invasive species / population viability analysis / conservation genetics | 入侵种 / 种群存活力分析 / 保护遗传学 |
| altruism / kin selection / inclusive fitness / eusociality | 利他行为 / 亲缘选择 / 广义适合度（内含适合度） / 真社会性 |
| optimal foraging / evolutionarily stable strategy / signalling | 最优取食 / 进化稳定策略 / 信号传递（通讯） |
| imprinting (behavioural) / conditioning / migration / navigation | 印随 / 条件作用（条件反射） / 迁徙 / 导航（定向） |
| network motif / feedback / bistability / oscillator / noise | 网络模块（基序） / 反馈 / 双稳态 / 振荡器 / 噪声 |
| flux balance analysis / reaction–diffusion / Turing pattern | 通量平衡分析 / 反应扩散 / 图灵斑图 |
| bioreactor / fermentation (industrial) / downstream processing | 生物反应器 / 发酵 / 下游加工（分离纯化） |
| biosafety / biosecurity / containment / dual-use research | 生物安全（实验室安全） / 生物安保 / 防护（隔离） / 两用研究 |

Ambiguous terms, decided once and used consistently:

- **evolution** → 进化 (the site uses 进化 throughout; 演化 is acceptable in a quotation only).
- **变异** translates both *variation* (standing differences in a population) and *mutation* in
  older textbooks: write 变异 for variation and always 突变 for mutation.
- **分化** is *differentiation* (cells); *divergence* between lineages is 分歧 or 趋异.
- **适应** is *adaptation* as both process and trait; when the English distinguishes them, write
  适应（过程） and 适应性特征.
- **population** → 种群 in ecology and 群体 in genetics (群体遗传学, 有效群体大小); keep each
  field's usage.
- **fitness** → 适合度 (never 适应度 in this atlas).
- **heritability** → 遗传率 (遗传力 in brackets at first use); *heredity* → 遗传.
- **expression** → 表达 (gene expression 基因表达); *expressivity* → 表现度.
- **translation** of RNA → 翻译; the translation of this text is 翻译 as well, so in a lesson
  about protein synthesis write 翻译（蛋白质合成） at first mention if confusion is possible.
- **culture** (of cells) → 培养; *culture* in behaviour → 文化.
- **medium** → 培养基; *media* in a figure label stays singular 培养基.
- **host** → 宿主; *vector* is 载体 in molecular biology and 媒介（传播媒介） for a disease vector.
- **sequence** → 序列; *sequencing* → 测序; *to sequence* → 测定序列.
- **primer** → 引物; *probe* → 探针; *template* → 模板.
- **sex / gender**: biological sex is 性别; do not use 性别 for social gender in this atlas.

Emphasis: write `**…**`, as the Maths Atlas Chinese lessons do — Chinese typography has no italics.
Run-in labels such as *Sketch.* become `**要点。**`. Part labels stay half-width: `(a)…；(b)…`.
Italics in the English that mark a **species name, gene symbol or published title** are kept as
italics in the Chinese, because they are part of the notation, not emphasis.

Block captions are generated by the site (定义、原理、例、习题、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/biology/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   derivation, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

Translate by hand, one lesson at a time. Never generate Chinese lessons or course overlays from a
script or a template.

A good model to imitate (Maths Atlas, same engine):
`/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md` and
`/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 生物学图谱.
