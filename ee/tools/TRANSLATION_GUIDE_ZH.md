# EE Atlas — Chinese translation guide (简体中文)

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


### Electrical engineering terms

| English | 中文 |
|---|---|
| circuit / node / branch / loop / mesh | 电路 / 节点 / 支路 / 回路 / 网孔 |
| voltage / current / power / energy | 电压 / 电流 / 功率 / 能量 |
| resistor / capacitor / inductor | 电阻器（电阻） / 电容器（电容） / 电感器（电感） |
| Ohm's law / Kirchhoff's current law / voltage law | 欧姆定律 / 基尔霍夫电流定律（KCL） / 基尔霍夫电压定律（KVL） |
| independent / dependent source | 独立源 / 受控源 |
| nodal analysis / mesh analysis | 节点分析法 / 网孔分析法 |
| superposition / Thévenin / Norton equivalent | 叠加定理 / 戴维南等效电路 / 诺顿等效电路 |
| maximum power transfer | 最大功率传输 |
| operational amplifier | 运算放大器（运放） |
| time constant / transient / steady state | 时间常数 / 暂态（瞬态） / 稳态 |
| natural response / step response | 零输入响应（自然响应） / 阶跃响应 |
| overdamped / critically damped / underdamped | 过阻尼 / 临界阻尼 / 欠阻尼 |
| phasor / impedance / admittance / reactance / susceptance | 相量 / 阻抗 / 导纳 / 电抗 / 电纳 |
| RMS value / power factor | 有效值（均方根值） / 功率因数 |
| apparent / active / reactive / complex power | 视在功率 / 有功功率 / 无功功率 / 复功率 |
| three-phase / wye / delta connection | 三相 / 星形（Y）连接 / 三角形（Δ）连接 |
| mutual inductance / transformer | 互感 / 变压器 |
| transfer function / frequency response / Bode plot | 传递函数 / 频率响应 / 伯德图 |
| resonance / quality factor / bandwidth | 谐振 / 品质因数 / 带宽 |
| low-pass / high-pass / band-pass / band-stop filter | 低通 / 高通 / 带通 / 带阻滤波器 |
| two-port network | 二端口网络 |
| electron / hole / doping / Fermi level | 电子 / 空穴 / 掺杂 / 费米能级 |
| drift / diffusion / mobility / recombination | 漂移 / 扩散 / 迁移率 / 复合 |
| pn junction / depletion region / diode | PN结 / 耗尽区 / 二极管 |
| bipolar junction transistor / MOSFET | 双极结型晶体管（BJT） / 金属-氧化物-半导体场效应晶体管（MOSFET） |
| threshold voltage / transconductance / channel-length modulation | 阈值电压 / 跨导 / 沟道长度调制 |
| small-signal model / bias / Q-point / load line | 小信号模型 / 偏置 / 静态工作点（Q点） / 负载线 |
| common-source / common-emitter / source follower | 共源 / 共射 / 源极跟随器 |
| current mirror / differential pair / CMRR | 电流镜 / 差分对 / 共模抑制比（CMRR） |
| feedback / loop gain / phase margin / frequency compensation | 反馈 / 环路增益 / 相位裕度 / 频率补偿 |
| oscillator / ADC / DAC / noise figure | 振荡器 / 模数转换器（ADC） / 数模转换器（DAC） / 噪声系数 |
| logic gate / Boolean algebra / Karnaugh map | 逻辑门 / 布尔代数 / 卡诺图 |
| combinational / sequential logic | 组合逻辑 / 时序逻辑 |
| latch / flip-flop / register / counter / finite-state machine | 锁存器 / 触发器 / 寄存器 / 计数器 / 有限状态机 |
| setup / hold time / propagation delay | 建立时间 / 保持时间 / 传播延迟 |
| instruction set / pipeline / cache / interrupt | 指令集 / 流水线 / 高速缓存 / 中断 |
| microcontroller / embedded system / real-time operating system | 微控制器（单片机） / 嵌入式系统 / 实时操作系统 |
| linear time-invariant (LTI) system / impulse response / convolution | 线性时不变（LTI）系统 / 冲激响应 / 卷积 |
| sampling / aliasing / Nyquist rate | 采样（抽样） / 混叠 / 奈奎斯特速率 |
| z-transform / DTFT / DFT / FFT | z变换 / 离散时间傅里叶变换（DTFT） / 离散傅里叶变换（DFT） / 快速傅里叶变换（FFT） |
| FIR / IIR filter | 有限冲激响应（FIR）滤波器 / 无限冲激响应（IIR）滤波器 |
| random process / stationary / autocorrelation / power spectral density / white noise | 随机过程 / 平稳 / 自相关 / 功率谱密度 / 白噪声 |
| matched / Wiener / Kalman filter | 匹配滤波器 / 维纳滤波器 / 卡尔曼滤波器 |
| modulation / demodulation / carrier / sideband | 调制 / 解调 / 载波 / 边带 |
| AM / FM / PM | 调幅 / 调频 / 调相 |
| pulse-code modulation / quantisation / intersymbol interference | 脉冲编码调制（PCM） / 量化 / 码间干扰 |
| eye diagram / constellation / bit error rate / signal-to-noise ratio | 眼图 / 星座图 / 误码率 / 信噪比 |
| entropy / channel capacity / error-correcting code | 熵 / 信道容量 / 纠错码 |
| electric / magnetic field / flux density | 电场 / 磁场 / 磁通密度 |
| permittivity / permeability / conductivity | 介电常数（电容率） / 磁导率 / 电导率 |
| Gauss's / Ampère's / Faraday's law / Maxwell's equations | 高斯定律 / 安培环路定律 / 法拉第电磁感应定律 / 麦克斯韦方程组 |
| plane wave / polarisation / skin depth / Poynting vector | 平面波 / 极化 / 趋肤深度 / 坡印廷矢量 |
| transmission line / characteristic impedance / reflection coefficient / VSWR | 传输线 / 特性阻抗 / 反射系数 / 电压驻波比 |
| Smith chart / impedance matching / waveguide / S-parameters | 史密斯圆图 / 阻抗匹配 / 波导 / S参数 |
| antenna / gain / directivity / radiation pattern | 天线 / 增益 / 方向性系数 / 方向图 |
| optical fibre / laser / photodetector / solar cell | 光纤 / 激光器 / 光电探测器 / 太阳能电池 |
| magnetic circuit / reluctance / hysteresis / eddy current | 磁路 / 磁阻 / 磁滞 / 涡流 |
| induction motor / synchronous machine / slip / DC machine | 感应电动机（异步电动机） / 同步电机 / 转差率 / 直流电机 |
| rectifier / inverter / DC–DC converter / buck / boost | 整流器 / 逆变器 / DC-DC变换器 / 降压 / 升压 |
| pulse-width modulation / duty cycle | 脉宽调制（PWM） / 占空比 |
| per-unit system / power flow / bus admittance matrix | 标幺制 / 潮流 / 节点导纳矩阵 |
| fault / symmetrical components | 故障（短路） / 对称分量 |
| swing equation / equal-area criterion / economic dispatch / protective relay | 摇摆方程（转子运动方程） / 等面积定则 / 经济调度 / 继电保护 |
| open-loop / closed-loop / steady-state error | 开环 / 闭环 / 稳态误差 |
| root locus / Nyquist criterion / gain margin | 根轨迹 / 奈奎斯特判据 / 增益裕度 |
| PID control / lead / lag compensator | PID控制 / 超前校正 / 滞后校正 |
| state space / controllability / observability / observer | 状态空间 / 能控性 / 能观性 / 观测器 |
| sensor / transducer / bridge / instrumentation amplifier | 传感器 / 变换器（换能器） / 电桥 / 仪表放大器 |
| electromagnetic compatibility / interference / grounding / shielding | 电磁兼容（EMC） / 干扰 / 接地 / 屏蔽 |

The imaginary unit is $j$ in both languages; unit symbols (V, A, Ω, Hz, dB) stay as they are.

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/ee/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   proof, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

A good model to imitate (Maths Atlas, same engine): `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
and `/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 电气电子工程图谱.
