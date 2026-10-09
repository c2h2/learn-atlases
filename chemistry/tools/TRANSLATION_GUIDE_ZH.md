# Chemistry Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university chemistry textbooks
(e.g. 华彤文等《普通化学原理》, 天津大学《物理化学》, 傅献彩等《物理化学》, 大连理工大学《无机化学》,
邢其毅等《基础有机化学》, 武汉大学《分析化学》, 王镜岩等《生物化学》), with terms as fixed by
全国科学技术名词审定委员会《化学名词》 and the naming rules of the Chinese Chemical Society (中国化学会).
Neutral, precise textbook register. Faithful to the English: never add, drop or change chemistry,
numbers, units, conditions, hazards or caveats. Translate meaning, not word order.

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
  in brackets where one exists: 拉瓦锡（Lavoisier）, 道尔顿（Dalton）, 阿伏加德罗（Avogadro）,
  门捷列夫（Mendeleev）, 凯库勒（Kekulé）, 维勒（Wöhler）, 法拉第（Faraday）, 吉布斯（Gibbs）,
  玻尔兹曼（Boltzmann）, 阿伦尼乌斯（Arrhenius）, 能斯特（Nernst）, 勒夏特列（Le Chatelier）,
  范特霍夫（van ’t Hoff）, 维尔纳（Werner）, 路易斯（Lewis）, 玻尔（Bohr）, 薛定谔（Schrödinger）,
  鲍林（Pauling）, 休克尔（Hückel）, 哈伯（Haber）. Mathematicians as in Maths Atlas: 欧拉（Euler）,
  傅里叶（Fourier）, 拉格朗日（Lagrange）.
  In history blocks give the Chinese name followed by the Latin name in brackets.
- Book and paper titles: Chinese title in 《》 followed by the original in brackets when well known.

## Terminology (use consistently)

Mathematics in chemistry lessons uses the Maths Atlas terms below; chemistry terms follow in
"Chemistry terms".

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

### Chemistry terms

| English | 中文 |
|---|---|
| amount of substance / mole / molar mass | 物质的量 / 摩尔 / 摩尔质量 |
| Avogadro constant / relative atomic mass / isotope | 阿伏加德罗常数 / 相对原子质量 / 同位素 |
| stoichiometry / limiting reagent / yield | 化学计量 / 限量反应物 / 产率 |
| concentration (amount) / molality / mole fraction | 物质的量浓度 / 质量摩尔浓度 / 摩尔分数 |
| oxidation state / redox reaction / oxidising / reducing agent | 氧化态（氧化数） / 氧化还原反应 / 氧化剂 / 还原剂 |
| ionisation energy / electron affinity / electronegativity | 电离能 / 电子亲和能 / 电负性 |
| electron configuration / aufbau principle / Pauli exclusion principle / Hund’s rule | 电子排布（电子构型） / 构造原理 / 泡利不相容原理 / 洪特规则 |
| periodic table / group / period / main-group element / transition metal | 元素周期表 / 族 / 周期 / 主族元素 / 过渡金属 |
| ionic / covalent / metallic bond / lattice energy / Born–Haber cycle | 离子键 / 共价键 / 金属键 / 晶格能 / 玻恩-哈伯循环 |
| Lewis structure / formal charge / resonance | 路易斯结构 / 形式电荷 / 共振 |
| VSEPR theory / lone pair / bond angle | 价层电子对互斥理论 / 孤对电子 / 键角 |
| hybridisation / σ bond / π bond | 杂化 / σ键 / π键 |
| bonding / antibonding orbital / bond order / HOMO / LUMO | 成键轨道 / 反键轨道 / 键级 / 最高占据分子轨道（HOMO） / 最低未占分子轨道（LUMO） |
| hydrogen bond / van der Waals forces / dispersion force / dipole moment | 氢键 / 范德华力 / 色散力 / 偶极矩 |
| system / surroundings / state function | 体系 / 环境 / 状态函数 |
| internal energy / enthalpy / entropy | 热力学能 / 焓 / 熵 |
| Gibbs energy / Helmholtz energy | 吉布斯自由能 / 亥姆霍兹自由能 |
| standard molar enthalpy of formation / of reaction | 标准摩尔生成焓 / 标准摩尔反应焓 |
| heat capacity / calorimetry / Hess’s law | 热容 / 量热法 / 盖斯定律 |
| chemical potential / partial molar quantity / activity / fugacity | 化学势 / 偏摩尔量 / 活度 / 逸度 |
| colligative property / osmotic pressure | 依数性 / 渗透压 |
| phase diagram / phase rule / triple point / critical point | 相图 / 相律 / 三相点 / 临界点 |
| equilibrium constant / reaction quotient / Le Chatelier’s principle | 平衡常数 / 反应商 / 勒夏特列原理 |
| van ’t Hoff equation / ionic strength / Debye–Hückel limiting law | 范特霍夫方程 / 离子强度 / 德拜-休克尔极限公式 |
| rate law / rate constant / reaction order / half-life | 速率方程 / 速率常数 / 反应级数 / 半衰期 |
| elementary reaction / molecularity / rate-determining step | 基元反应 / 反应分子数 / 决速步（速率控制步骤） |
| steady-state approximation / pre-equilibrium | 稳态近似 / 前置平衡 |
| activation energy / pre-exponential factor / Arrhenius equation | 活化能 / 指前因子 / 阿伦尼乌斯方程 |
| transition state / activated complex / kinetic isotope effect | 过渡态 / 活化络合物 / 动力学同位素效应 |
| chain reaction / catalyst / adsorption isotherm | 链反应 / 催化剂 / 吸附等温式 |
| quantum yield / fluorescence / phosphorescence / quenching | 量子产率 / 荧光 / 磷光 / 猝灭 |
| Brønsted acid / Lewis acid / conjugate base | 布朗斯特酸 / 路易斯酸 / 共轭碱 |
| acid dissociation constant / buffer solution | 酸解离常数 / 缓冲溶液 |
| titration / equivalence point / end point / indicator | 滴定 / 化学计量点 / 滴定终点 / 指示剂 |
| solubility product / common-ion effect | 溶度积 / 同离子效应 |
| galvanic cell / electrolytic cell / electrode potential | 原电池 / 电解池 / 电极电势 |
| standard hydrogen electrode / Nernst equation / overpotential | 标准氢电极 / 能斯特方程 / 超电势 |
| corrosion / passivation / cathodic protection | 腐蚀 / 钝化 / 阴极保护 |
| wavefunction / Schrödinger equation / particle in a box / harmonic oscillator / rigid rotor | 波函数 / 薛定谔方程 / 势箱中的粒子 / 谐振子 / 刚性转子 |
| variation method / perturbation theory / Born–Oppenheimer approximation | 变分法 / 微扰理论 / 玻恩-奥本海默近似 |
| point group / symmetry element / character table | 点群 / 对称元素 / 特征标表 |
| selection rule / transition dipole moment | 选律 / 跃迁偶极矩 |
| rotational / vibrational / electronic spectrum / infrared / Raman spectroscopy | 转动光谱 / 振动光谱 / 电子光谱 / 红外光谱 / 拉曼光谱 |
| nuclear magnetic resonance / chemical shift / coupling constant | 核磁共振 / 化学位移 / 耦合常数 |
| mass spectrometry / molecular ion / fragment ion | 质谱法 / 分子离子 / 碎片离子 |
| electron paramagnetic resonance / hyperfine coupling | 电子顺磁共振 / 超精细耦合 |
| Beer–Lambert law / absorbance / molar absorption coefficient | 朗伯-比尔定律 / 吸光度 / 摩尔吸收系数 |
| partition function / Boltzmann distribution / ensemble | 配分函数 / 玻尔兹曼分布 / 系综 |
| functional group / skeletal formula | 官能团 / 键线式 |
| conformation / configuration / meso compound / optical activity | 构象 / 构型 / 内消旋化合物 / 旋光性 |
| chirality / stereocentre / enantiomer / diastereomer / racemate | 手性 / 立体中心 / 对映体 / 非对映体 / 外消旋体 |
| nucleophile / electrophile / leaving group | 亲核试剂 / 亲电试剂 / 离去基团 |
| nucleophilic substitution / elimination / addition | 亲核取代 / 消除 / 加成 |
| carbocation / carbanion / radical | 碳正离子 / 碳负离子 / 自由基 |
| Markovnikov’s rule / Zaitsev’s rule | 马尔科夫尼科夫规则（马氏规则） / 札依采夫规则 |
| aromaticity / Hückel’s rule / electrophilic aromatic substitution / Friedel–Crafts reaction | 芳香性 / 休克尔规则 / 芳香亲电取代 / 傅-克反应 |
| aldehyde / ketone / carboxylic acid / ester / amide / amine | 醛 / 酮 / 羧酸 / 酯 / 酰胺 / 胺 |
| enol / enolate / aldol reaction / tautomerism | 烯醇 / 烯醇负离子 / 羟醛缩合 / 互变异构 |
| retrosynthetic analysis / protecting group / pericyclic reaction / Diels–Alder reaction | 逆合成分析 / 保护基 / 周环反应 / 狄尔斯-阿尔德反应 |
| curly arrow | 弯箭头 |
| coordination compound / ligand / chelate / coordination number | 配位化合物（配合物） / 配体 / 螯合物 / 配位数 |
| crystal field theory / ligand field theory / spectrochemical series | 晶体场理论 / 配体场理论 / 光谱化学序列 |
| high spin / low spin / crystal field stabilisation energy | 高自旋 / 低自旋 / 晶体场稳定化能 |
| Jahn–Teller effect / trans effect / lanthanide contraction | 姜-泰勒效应 / 反位效应 / 镧系收缩 |
| hard and soft acids and bases | 软硬酸碱（HSAB） |
| 18-electron rule / oxidative addition / reductive elimination / migratory insertion | 18电子规则 / 氧化加成 / 还原消除 / 迁移插入 |
| catalytic cycle / homogeneous / heterogeneous catalysis | 催化循环 / 均相催化 / 多相催化 |
| accuracy / precision / systematic / random error | 准确度 / 精密度 / 系统误差 / 随机误差 |
| calibration curve / internal standard / standard addition / limit of detection | 校准曲线（标准曲线） / 内标 / 标准加入法 / 检出限 |
| chromatography / retention time / resolution / theoretical plate | 色谱法 / 保留时间 / 分离度 / 理论塔板 |
| gravimetric analysis / complexometric titration / potentiometry / voltammetry | 重量分析法 / 配位滴定 / 电位分析法 / 伏安法 |
| enzyme / substrate / active site / Michaelis–Menten equation | 酶 / 底物 / 活性部位 / 米氏方程 |
| glycolysis / citric acid cycle / oxidative phosphorylation | 糖酵解 / 柠檬酸循环（三羧酸循环） / 氧化磷酸化 |
| pharmacokinetics / structure–activity relationship / lead compound | 药代动力学 / 构效关系 / 先导化合物 |
| polymer / monomer / degree of polymerisation / glass transition temperature | 聚合物 / 单体 / 聚合度 / 玻璃化转变温度 |
| step-growth / chain-growth polymerisation | 逐步聚合 / 链式聚合 |
| unit cell / close packing / Miller indices / X-ray diffraction / point defect / band theory | 晶胞 / 密堆积 / 密勒指数 / X射线衍射 / 点缺陷 / 能带理论 |
| zeolite / metal–organic framework | 沸石 / 金属有机框架（MOF） |
| Hartree–Fock method / basis set / density functional theory / molecular dynamics | 哈特里-福克方法 / 基组 / 密度泛函理论 / 分子动力学 |
| green chemistry / atom economy / greenhouse gas / radiative forcing | 绿色化学 / 原子经济性 / 温室气体 / 辐射强迫 |

Words that change meaning with context — choose by sense:

- *radical*: an unpaired-electron species is 自由基; the old sense "group of atoms in an ion"
  survives only in names such as 硫酸根离子.
- *base*: 碱 in acid–base chemistry, but 碱基 / 碱基对 for nucleobases, and 基 in 基组 (basis set).
- *group*: 族 in the periodic table, 基团 / 官能团 / 离去基团 for parts of molecules, 群 in group
  theory (点群).
- *potential*: 电势 for electrode and cell potentials (电极电势, 标准电极电势), 电位 in the
  established analytical terms (电位滴定, 电位分析法), 势 in 化学势 and 势能面.
- *order*: 反应级数 (reaction order), but 键级 (bond order).
- *configuration*: 构型 for stereochemistry, 电子排布（电子构型） for electrons, 组态 in
  configuration interaction (组态相互作用).
- *solution*: 溶液 for a mixture; the answer to an exercise is 解 / 解答 (the site writes the
  heading itself).

Element names follow the standard Chinese names, including the names of elements 113–118 fixed by
全国科学技术名词审定委员会; give the symbol in brackets when a rare character may be unfamiliar.
Organic compounds take their Chinese systematic names under the Chinese Chemical Society rules
(《有机化合物命名原则》, 2017); on first use add the English or IUPAC name in brackets when it helps
the reader. Formulas, units and
the standard-state symbol stay exactly as in the English formulas (do not rewrite
$\mathrm{mol\,dm^{-3}}$ as mol·L⁻¹ inside maths). Hazard statements and safety notes are
translated in full, never shortened.

Emphasis: write `**…**`, as Maths Atlas `gradient.md` does — Chinese typography has no italics. Run-in labels
such as *Sketch.* become `**证明概要。**`. Part labels stay half-width: `(a)…；(b)…`.

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/chemistry/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   proof, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

A good model to imitate (Maths Atlas, same engine): `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
and `/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 化学图谱.
