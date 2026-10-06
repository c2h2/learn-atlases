# Medicine Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university mathematics textbooks
(e.g. 同济《高等数学》, 北大《高等代数》, 华东师大《数学分析》, 茆诗松《概率论与数理统计》).
Neutral, precise textbook register. Faithful to the English: never add, drop or change mathematics,
numbers, conditions or caveats. Translate meaning, not word order.

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
  `函数$f$在点$a$处连续`. The site adds a thin space around inline formulas in Chinese text.
- Bold `**…**` for the defined term at its definition, as in the English.
- Numbers, units and Latin abbreviations keep half-width characters.
- People's names stay in Latin script on first mention with the standard Chinese transliteration
  in brackets where one exists: 柯西（Cauchy）, 魏尔斯特拉斯（Weierstrass）, 高斯（Gauss）,
  欧拉（Euler）, 黎曼（Riemann）, 伽罗瓦（Galois）, 康托尔（Cantor）, 莱布尼茨（Leibniz）,
  牛顿（Newton）, 傅里叶（Fourier）, 拉格朗日（Lagrange）, 拉普拉斯（Laplace）, 希尔伯特（Hilbert）,
  勒贝格（Lebesgue）, 柯尔莫哥洛夫（Kolmogorov）, 费马（Fermat）, 帕斯卡（Pascal）, 笛卡儿（Descartes）.
  In history blocks give the Chinese name followed by the Latin name in brackets.
- Book and paper titles: Chinese title in 《》 followed by the original in brackets when well known.

## Terminology (use consistently)

| English | 中文 |
|---|---|
| limit / one-sided limit / limit at infinity | 极限 / 单侧极限（左极限、右极限） / 无穷远处的极限 |
| continuous / uniformly continuous | 连续 / 一致连续 |
| derivative / differentiable / differential | 导数 / 可导（可微） / 微分 |
| integral / definite / improper / Riemann integral | 积分 / 定积分 / 反常积分 / 黎曼积分 |
| antiderivative | 原函数 |
| fundamental theorem of calculus | 微积分基本定理 |
| mean value theorem / intermediate value theorem / extreme value theorem | 中值定理 / 介值定理 / 最值定理 |
| squeeze theorem | 夹逼定理 |
| sequence / series / partial sum / converge / diverge | 数列 / 级数 / 部分和 / 收敛 / 发散 |
| absolutely / conditionally convergent | 绝对收敛 / 条件收敛 |
| power series / radius of convergence / Taylor series | 幂级数 / 收敛半径 / 泰勒级数 |
| supremum / infimum / completeness axiom | 上确界 / 下确界 / 完备性公理（确界原理） |
| Cauchy sequence / subsequence | 柯西列 / 子列 |
| uniform convergence | 一致收敛 |
| metric space / open set / closed set / compact / connected | 度量空间 / 开集 / 闭集 / 紧 / 连通 |
| neighbourhood | 邻域 |
| partial derivative / gradient / directional derivative | 偏导数 / 梯度 / 方向导数 |
| Jacobian / Hessian | 雅可比矩阵（行列式） / 黑塞矩阵 |
| Lagrange multiplier | 拉格朗日乘数 |
| line integral / surface integral / flux / divergence / curl | 曲线积分 / 曲面积分 / 通量 / 散度 / 旋度 |
| vector space / subspace / span / linearly independent / basis / dimension | 向量空间（线性空间） / 子空间 / 张成 / 线性无关 / 基 / 维数 |
| linear map / kernel / image / rank / nullity | 线性映射 / 核 / 像 / 秩 / 零化度 |
| determinant / eigenvalue / eigenvector / diagonalisable | 行列式 / 特征值 / 特征向量 / 可对角化 |
| inner product / orthogonal / orthonormal / projection | 内积 / 正交 / 标准正交 / 投影 |
| row echelon form / reduced row echelon form | 行阶梯形 / 简化行阶梯形 |
| symmetric matrix / positive definite / quadratic form | 对称矩阵 / 正定 / 二次型 |
| singular value decomposition | 奇异值分解 |
| Jordan canonical form / minimal polynomial | 若尔当标准形 / 极小多项式 |
| group / subgroup / cyclic / order / coset / normal subgroup / quotient group | 群 / 子群 / 循环 / 阶 / 陪集 / 正规子群 / 商群 |
| homomorphism / isomorphism / kernel | 同态 / 同构 / 核 |
| group action / orbit / stabiliser | 群作用 / 轨道 / 稳定子群 |
| ring / ideal / integral domain / field / field extension | 环 / 理想 / 整环 / 域 / 域扩张 |
| irreducible polynomial / splitting field / Galois group | 不可约多项式 / 分裂域 / 伽罗瓦群 |
| divisibility / greatest common divisor / prime / congruence | 整除 / 最大公因数 / 素数 / 同余 |
| Chinese remainder theorem / primitive root / quadratic residue | 中国剩余定理 / 原根 / 二次剩余 |
| Legendre symbol / quadratic reciprocity | 勒让德符号 / 二次互反律 |
| sample space / event / probability measure | 样本空间 / 事件 / 概率测度 |
| conditional probability / independence / Bayes' theorem | 条件概率 / 独立性 / 贝叶斯定理 |
| random variable / distribution / density / expectation / variance | 随机变量 / 分布 / 密度 / 数学期望 / 方差 |
| binomial / Poisson / normal / exponential distribution | 二项分布 / 泊松分布 / 正态分布 / 指数分布 |
| moment generating function / law of large numbers / central limit theorem | 矩母函数 / 大数定律 / 中心极限定理 |
| Markov chain / transition matrix / stationary distribution | 马尔可夫链 / 转移矩阵 / 平稳分布 |
| estimator / unbiased / maximum likelihood / confidence interval | 估计量 / 无偏 / 最大似然 / 置信区间 |
| hypothesis test / null hypothesis / p-value / significance level / power | 假设检验 / 原假设 / p 值 / 显著性水平 / 功效 |
| regression / least squares / residual | 回归 / 最小二乘 / 残差 |
| prior / posterior / credible interval | 先验 / 后验 / 可信区间 |
| ordinary / partial differential equation | 常微分方程 / 偏微分方程 |
| initial value problem / boundary value problem | 初值问题 / 边值问题 |
| separable / linear / exact equation / integrating factor | 可分离变量方程 / 线性方程 / 恰当方程 / 积分因子 |
| characteristic equation / Wronskian / resonance | 特征方程 / 朗斯基行列式 / 共振 |
| Laplace transform / Fourier series / Fourier transform | 拉普拉斯变换 / 傅里叶级数 / 傅里叶变换 |
| phase plane / equilibrium / stability | 相平面 / 平衡点 / 稳定性 |
| heat / wave / Laplace equation / separation of variables | 热方程 / 波动方程 / 拉普拉斯方程 / 分离变量法 |
| analytic / holomorphic / Cauchy–Riemann equations | 解析 / 全纯 / 柯西-黎曼方程 |
| contour integral / residue / pole / Laurent series | 围道积分 / 留数 / 极点 / 洛朗级数 |
| conformal map / Möbius transformation | 共形映射 / 默比乌斯变换 |
| topology / homeomorphism / Hausdorff / quotient space / fundamental group / homotopy | 拓扑 / 同胚 / 豪斯多夫 / 商空间 / 基本群 / 同伦 |
| curvature / torsion / Gaussian curvature / geodesic | 曲率 / 挠率 / 高斯曲率 / 测地线 |
| σ-algebra / measure / measurable / Lebesgue integral / almost everywhere | σ-代数 / 测度 / 可测 / 勒贝格积分 / 几乎处处 |
| monotone / dominated convergence theorem | 单调收敛定理 / 控制收敛定理 |
| floating point / rounding error / condition number | 浮点数 / 舍入误差 / 条件数 |
| interpolation / quadrature / Newton's method | 插值 / 数值积分（求积） / 牛顿法 |
| proof by induction / contradiction / contrapositive | 数学归纳法 / 反证法 / 逆否命题 |
| injective / surjective / bijective | 单射 / 满射 / 双射 |
| equivalence relation / partition / countable | 等价关系 / 划分 / 可数 |
| graph / vertex / edge / tree / spanning tree | 图 / 顶点 / 边 / 树 / 生成树 |
| generating function / recurrence relation | 生成函数 / 递推关系 |

### Settled during translation (use these too)

| English | 中文 |
|---|---|
| Calculus I / Calculus II | 微积分（一） / 微积分（二） |
| "Where this leads" (closing section) | 后续内容 |
| increasing / decreasing; bounded above / below | 递增 / 递减；有上界 / 有下界 |
| geometric sequence / geometric series | 等比数列 / 几何级数 |
| interval / domain of convergence | 收敛区间（含收敛的端点） / 收敛域 |
| term by term | 逐项 |
| comparison / limit comparison / ratio / root / integral test | 比较判别法 / 极限比较判别法 / 比值判别法 / 根值判别法 / 积分判别法 |
| remainder (Taylor) / Lagrange form | 余项 / 拉格朗日型余项 |
| concave up / concave down; convex / concave function | 下凸 / 上凸（avoid bare 凹/凸 for curves: Chinese textbooks use them in opposite senses）；凸函数 / 凹函数 |
| local maximum / minimum / extremum | 局部极大值 / 局部极小值 / 极值（never 局部最大值） |
| global (absolute) maximum / minimum | 全局最大值 / 全局最小值（最大值 / 最小值） |
| critical point / saddle point | 临界点 / 鞍点 |
| partition / mesh / sample point / Riemann sum | 分割 / 细度 / 样本点 / 黎曼和 |
| upper / lower sum | 上和 / 下和 |
| inflection point | 拐点 |
| slope field / direction field / isocline | 斜率场 / 方向场 / 等斜线 |
| equilibrium solution / equilibrium (point) | 平衡解 / 平衡点 |
| general / particular solution; initial condition | 通解 / 特解；初始条件 |
| Euler's method / step size / Runge–Kutta | 欧拉法 / 步长 / 龙格-库塔法 |
| substitution / integration by parts / partial fractions | 换元法 / 分部积分法 / 部分分式 |
| Simpson's / trapezoid / midpoint rule | 辛普森公式 / 梯形公式 / 中点公式 |
| elementary function / closed form | 初等函数 / 封闭形式 |
| mean / median | 均值（数学期望） / 中位数 |
| Claim (inside a proof) | 断言 |

Emphasis: write `**…**`, as `gradient.md` does — Chinese typography has no italics. Run-in labels
such as *Sketch.* become `**证明概要。**`. Part labels stay half-width: `(a)…；(b)…`.


### Medical terms

| English | 中文 |
|---|---|
| anatomy / physiology / biochemistry | 解剖学 / 生理学 / 生物化学 |
| pathology / pharmacology / immunology / microbiology | 病理学 / 药理学 / 免疫学 / 微生物学 |
| epidemiology / public health / evidence-based medicine | 流行病学 / 公共卫生 / 循证医学 |
| symptom / sign / syndrome | 症状 / 体征 / 综合征 |
| history taking / physical examination | 病史采集 / 体格检查 |
| diagnosis / differential diagnosis / prognosis | 诊断 / 鉴别诊断 / 预后 |
| aetiology / pathogenesis / complication | 病因 / 发病机制 / 并发症 |
| acute / chronic / benign / malignant | 急性 / 慢性 / 良性 / 恶性 |
| inflammation / necrosis / apoptosis / fibrosis | 炎症 / 坏死 / 凋亡 / 纤维化 |
| thrombosis / embolism / infarction / oedema / shock | 血栓形成 / 栓塞 / 梗死 / 水肿 / 休克 |
| neoplasm / metastasis / staging | 肿瘤 / 转移 / 分期 |
| hypertension / myocardial infarction / heart failure | 高血压 / 心肌梗死 / 心力衰竭 |
| arrhythmia / atrial fibrillation | 心律失常 / 心房颤动（房颤） |
| stroke / epilepsy / dementia | 卒中（脑卒中） / 癫痫 / 痴呆 |
| asthma / COPD / pneumonia / tuberculosis | 哮喘 / 慢性阻塞性肺疾病（慢阻肺） / 肺炎 / 结核病 |
| acute kidney injury / chronic kidney disease / dialysis | 急性肾损伤 / 慢性肾脏病 / 透析 |
| diabetes mellitus / hypothyroidism / hyperthyroidism | 糖尿病 / 甲状腺功能减退症（甲减） / 甲状腺功能亢进症（甲亢） |
| anaemia / leukaemia / lymphoma / myeloma | 贫血 / 白血病 / 淋巴瘤 / 骨髓瘤 |
| cirrhosis / hepatitis / pancreatitis | 肝硬化 / 肝炎 / 胰腺炎 |
| sepsis / antibiotic / antimicrobial resistance | 脓毒症 / 抗生素 / 抗微生物药物耐药性 |
| vaccine / immunisation / herd immunity | 疫苗 / 免疫接种 / 群体免疫 |
| allergy / anaphylaxis / autoimmunity / immunodeficiency | 过敏 / 严重过敏反应 / 自身免疫 / 免疫缺陷 |
| pharmacokinetics / pharmacodynamics | 药代动力学 / 药效学 |
| half-life / bioavailability / clearance / steady state | 半衰期 / 生物利用度 / 清除率 / 稳态 |
| adverse drug reaction / drug interaction | 药物不良反应 / 药物相互作用 |
| resuscitation / intensive care / triage | 复苏 / 重症监护 / 检伤分类 |
| anaesthesia / perioperative care / trauma | 麻醉 / 围手术期管理 / 创伤 |
| antenatal care / pre-eclampsia / caesarean section | 产前检查 / 子痫前期 / 剖宫产 |
| miscarriage / ectopic pregnancy / menopause | 流产 / 异位妊娠 / 绝经 |
| depression / bipolar disorder / schizophrenia / anxiety disorder | 抑郁症 / 双相障碍 / 精神分裂症 / 焦虑障碍 |
| mental state examination / self-harm | 精神状况检查 / 自伤 |
| frailty / delirium / palliative care | 衰弱 / 谵妄 / 姑息治疗（安宁疗护） |
| incidence / prevalence / relative risk / odds ratio | 发病率 / 患病率 / 相对危险度 / 比值比 |
| cohort study / case–control study / randomised controlled trial | 队列研究 / 病例对照研究 / 随机对照试验 |
| sensitivity / specificity / positive predictive value | 灵敏度 / 特异度 / 阳性预测值 |
| systematic review / meta-analysis / confounding | 系统评价 / 荟萃分析（meta分析） / 混杂 |
| screening / health promotion / health inequalities | 筛查 / 健康促进 / 健康不平等 |
| informed consent / mental capacity / confidentiality | 知情同意 / 决策能力 / 保密 |

Keep the educational disclaimer intact and keep the safety rules of `tools/CONTENT_GUIDE.md` §4 in the Chinese text (no doses as instructions, safe messaging on self-harm).

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/medicine/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   proof, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

A good model to imitate (Maths Atlas, same engine): `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
and `/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 医学图谱. Medical terms follow the standard
names of the 全国科学技术名词审定委员会 and the current 人民卫生出版社 (人卫版) textbooks; drug names use the Chinese
approved names (药品通用名), with the English name in brackets at first use.
