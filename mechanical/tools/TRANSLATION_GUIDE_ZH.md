# Mechanical & Aerospace Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university engineering textbooks
(e.g. 哈尔滨工业大学理论力学教研室《理论力学》, 刘鸿文《材料力学》, 孙桓《机械原理》, 濮良贵《机械设计》,
沈维道、童钧耕《工程热力学》, 杨世铭、陶文铨《传热学》, 胡寿松《自动控制原理》) and, for the mathematics,
in the textbooks Maths Atlas follows (同济《高等数学》, 北大《高等代数》). Terms follow the national
standard terminology of 全国科学技术名词审定委员会 (力学、机械工程、航空科学技术名词).
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
  Engineering names: 胡克（Hooke）, 伯努利（Bernoulli）, 纳维（Navier）, 斯托克斯（Stokes）,
  雷诺（Reynolds）, 普朗特（Prandtl）, 卡诺（Carnot）, 朗肯（Rankine）, 莫尔（Mohr）,
  卡斯蒂利亚诺（Castigliano）, 库塔（Kutta）, 茹科夫斯基（Joukowski）, 马赫（Mach）,
  齐奥尔科夫斯基（Tsiolkovsky）, 开普勒（Kepler）, 霍曼（Hohmann）.
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

### Mechanical and aerospace terms

| English | 中文 |
|---|---|
| statics / kinematics / dynamics (kinetics) / free-body diagram | 静力学 / 运动学 / 动力学 / 受力图（分离体图） |
| force / resultant / moment of a force / couple / equilibrium / reaction | 力 / 合力 / 力矩 / 力偶 / 平衡 / 约束力（支座反力） |
| truss / method of joints / method of sections / statically determinate / indeterminate | 桁架 / 节点法 / 截面法 / 静定 / 超静定 |
| friction / coefficient of static friction / angle of friction / self-locking | 摩擦 / 静摩擦因数 / 摩擦角 / 自锁 |
| centroid / centre of gravity / centre of mass / mass moment of inertia / radius of gyration | 形心 / 重心 / 质心 / 转动惯量 / 回转半径 |
| second moment of area / polar moment / product of inertia / parallel-axis theorem | 惯性矩 / 极惯性矩 / 惯性积 / 平行移轴公式 |
| instantaneous centre / Coriolis acceleration / work–energy principle / impulse / angular momentum / coefficient of restitution | 速度瞬心 / 科里奥利加速度（科氏加速度） / 动能定理 / 冲量 / 动量矩（角动量） / 恢复因数 |
| stress / normal stress / shear stress / strain / normal strain / shear strain | 应力 / 正应力 / 切应力 / 应变 / 线应变 / 切应变 |
| Young's modulus / shear modulus / Poisson's ratio / yield strength / factor of safety / allowable stress | 弹性模量（杨氏模量） / 切变模量 / 泊松比 / 屈服强度 / 安全因数 / 许用应力 |
| axial force / shear force / bending moment / torque / angle of twist | 轴力 / 剪力 / 弯矩 / 扭矩 / 扭转角 |
| shear-force and bending-moment diagrams / deflection / slope of a beam / elastic curve | 剪力图和弯矩图 / 挠度 / 转角 / 挠曲线 |
| neutral axis / flexure formula / section modulus / shear flow / shear centre | 中性轴 / 弯曲正应力公式 / 抗弯截面系数 / 剪流 / 弯曲中心（剪切中心） |
| principal stress / maximum shear stress / Mohr's circle / plane stress / plane strain / stress concentration | 主应力 / 最大切应力 / 莫尔圆（应力圆） / 平面应力 / 平面应变 / 应力集中 |
| buckling / critical load / effective length / slenderness ratio | 屈曲（失稳） / 临界载荷 / 相当长度（计算长度） / 柔度（长细比） |
| strain energy / Castigliano's theorem / virtual work / yield criterion / Tresca criterion / von Mises criterion | 应变能 / 卡氏定理 / 虚功 / 屈服准则 / 特雷斯卡准则（最大切应力准则） / 米泽斯准则（畸变能准则） |
| plasticity / limit load / composite laminate / orthotropic | 塑性 / 极限载荷 / 复合材料层合板 / 正交各向异性 |
| stress intensity factor / fracture toughness / fatigue / endurance limit / S–N curve / creep | 应力强度因子 / 断裂韧度 / 疲劳 / 疲劳极限 / S–N 曲线 / 蠕变 |
| crystal structure / unit cell / dislocation / grain boundary | 晶体结构 / 晶胞 / 位错 / 晶界 |
| phase diagram / lever rule / eutectic / eutectoid | 相图 / 杠杆定律 / 共晶 / 共析 |
| martensite / quenching / tempering / annealing / hardenability | 马氏体 / 淬火 / 回火 / 退火 / 淬透性 |
| ultimate tensile strength / hardness / toughness / ductility / corrosion | 抗拉强度 / 硬度 / 韧性 / 延性（塑性） / 腐蚀 |
| casting / forging / rolling / extrusion / drawing / sheet-metal forming | 铸造 / 锻造 / 轧制 / 挤压 / 拉拔 / 板料成形（冲压） |
| machining / turning / milling / drilling / grinding / tool life | 切削加工 / 车削 / 铣削 / 钻削 / 磨削 / 刀具寿命 |
| welding / brazing / adhesive bonding / additive manufacturing / numerical control | 焊接 / 钎焊 / 胶接 / 增材制造 / 数控 |
| orthographic projection / first-angle / third-angle projection / sectional view / assembly drawing | 正投影 / 第一角画法 / 第三角画法 / 剖视图 / 装配图 |
| dimension / tolerance / fit / geometric tolerance / datum / surface roughness | 尺寸 / 公差 / 配合 / 几何公差（形位公差） / 基准 / 表面粗糙度 |
| linkage / four-bar linkage / crank / rocker / coupler / slider–crank mechanism | 连杆机构 / 铰链四杆机构 / 曲柄 / 摇杆 / 连杆 / 曲柄滑块机构 |
| degree of freedom / kinematic pair / Grashof condition / transmission angle / dead point | 自由度 / 运动副 / 曲柄存在条件（格拉晓夫条件） / 传动角 / 死点 |
| cam / follower / pressure angle | 凸轮 / 从动件（推杆） / 压力角 |
| gear / involute / module / contact ratio / undercutting | 齿轮 / 渐开线 / 模数 / 重合度 / 根切 |
| gear train / planetary gear train / transmission ratio / flywheel / balancing | 轮系 / 行星轮系 / 传动比 / 飞轮 / 平衡 |
| shaft / key / coupling / rolling bearing / journal bearing | 轴 / 键 / 联轴器 / 滚动轴承 / 滑动轴承 |
| bolt / preload / welded joint / spring | 螺栓 / 预紧力 / 焊接接头 / 弹簧 |
| clutch / brake / belt drive / chain drive | 离合器 / 制动器 / 带传动 / 链传动 |
| natural frequency / damping ratio / resonance / mode shape / transmissibility / dynamic vibration absorber | 固有频率 / 阻尼比 / 共振 / 振型 / 传递率 / 动力吸振器 |
| closed system / open system / control volume / steady flow | 闭口系统 / 开口系统 / 控制体 / 稳定流动 |
| internal energy / enthalpy / entropy / exergy | 热力学能 / 焓 / 熵 / 㶲 |
| specific heat capacity / isentropic / polytropic / saturated / superheated / quality (dryness fraction) | 比热容 / 定熵（等熵） / 多变 / 饱和 / 过热 / 干度 |
| heat engine / thermal efficiency / refrigerator / heat pump / coefficient of performance | 热机 / 热效率 / 制冷机 / 热泵 / 性能系数（制冷系数、供暖系数） |
| Carnot / Rankine / Brayton / Otto / Diesel cycle | 卡诺循环 / 朗肯循环 / 布雷顿循环 / 奥托循环 / 狄塞尔循环 |
| air–fuel ratio / enthalpy of formation / adiabatic flame temperature / psychrometric chart / relative humidity / humidity ratio | 空燃比 / 生成焓 / 绝热火焰温度 / 焓湿图 / 相对湿度 / 含湿量 |
| viscosity / kinematic viscosity / Newtonian fluid / gauge pressure / buoyancy / metacentre | 黏度（动力黏度） / 运动黏度 / 牛顿流体 / 表压 / 浮力 / 稳心 |
| streamline / pathline / material derivative / vorticity / Reynolds transport theorem | 流线 / 迹线 / 物质导数（随体导数） / 涡量 / 雷诺输运定理 |
| Bernoulli's equation / stagnation pressure / Pitot tube / Venturi meter | 伯努利方程 / 滞止压强（总压） / 皮托管 / 文丘里流量计 |
| Navier–Stokes equations / Reynolds number / laminar / turbulent | 纳维-斯托克斯方程 / 雷诺数 / 层流 / 湍流 |
| dimensional analysis / similitude / Buckingham Π theorem | 量纲分析 / 相似原理 / 白金汉 π 定理 |
| head loss / friction factor / Moody chart / minor loss | 水头损失 / 沿程阻力系数（摩擦因子） / 穆迪图 / 局部损失 |
| boundary layer / separation / skin-friction drag / form drag | 边界层 / 分离 / 摩擦阻力 / 压差阻力（形状阻力） |
| Mach number / normal shock / oblique shock / expansion wave / choked flow / convergent–divergent nozzle | 马赫数 / 正激波 / 斜激波 / 膨胀波 / 壅塞 / 缩放喷管（拉瓦尔喷管） |
| conduction / convection / thermal radiation / blackbody / emissivity / view factor | 导热（热传导） / 对流传热 / 热辐射 / 黑体 / 发射率 / 角系数 |
| thermal conductivity / heat-transfer coefficient / overall heat-transfer coefficient / thermal resistance | 导热系数（热导率） / 表面传热系数 / 传热系数 / 热阻 |
| fin / fin efficiency / fin effectiveness / lumped-capacitance method | 肋片 / 肋效率 / 肋效能 / 集总参数法 |
| Biot / Fourier / Nusselt / Prandtl / Grashof / Rayleigh number | 毕渥数 / 傅里叶数 / 努塞尔数 / 普朗特数 / 格拉晓夫数 / 瑞利数 |
| boiling / condensation / critical heat flux / heat exchanger / LMTD / effectiveness–NTU method | 沸腾 / 凝结 / 临界热流密度 / 换热器 / 对数平均温差 / 效能-传热单元数法（ε-NTU 法） |
| transfer function / block diagram / closed loop / overshoot / settling time / steady-state error | 传递函数 / 方框图（结构图） / 闭环 / 超调量 / 调节时间 / 稳态误差 |
| root locus / Bode plot / Nyquist criterion / gain margin / phase margin | 根轨迹 / 伯德图 / 奈奎斯特判据 / 幅值裕度 / 相角裕度 |
| controllability / observability / sensor / actuator / signal conditioning / microcontroller | 能控性 / 能观性 / 传感器 / 执行器（作动器） / 信号调理 / 微控制器（单片机） |
| stepper motor / brushless motor / encoder / hydraulic / pneumatic / servo valve | 步进电机 / 无刷电机 / 编码器 / 液压 / 气动 / 伺服阀 |
| airfoil / chord / camber / angle of attack | 翼型 / 弦长 / 弯度 / 迎角（攻角） |
| lift coefficient / drag coefficient / pitching moment / aerodynamic centre / centre of pressure | 升力系数 / 阻力系数 / 俯仰力矩 / 气动中心（焦点） / 压力中心 |
| circulation / Kutta condition / lifting-line theory / induced drag / aspect ratio | 环量 / 库塔条件 / 升力线理论 / 诱导阻力 / 展弦比 |
| stall / high-lift device / sweep / critical Mach number / supercritical airfoil | 失速 / 增升装置 / 后掠 / 临界马赫数 / 超临界翼型 |
| thrust / specific fuel consumption / specific impulse / bypass ratio | 推力 / 耗油率 / 比冲 / 涵道比 |
| turbojet / turbofan / turboprop / ramjet | 涡轮喷气发动机 / 涡轮风扇发动机 / 涡轮螺旋桨发动机 / 冲压发动机 |
| compressor / turbine / combustor / inlet / nozzle / surge | 压气机 / 涡轮 / 燃烧室 / 进气道 / 喷管 / 喘振 |
| rocket equation / multistage rocket / characteristic velocity | 火箭方程（齐奥尔科夫斯基公式） / 多级火箭 / 特征速度 |
| drag polar / range / endurance / load factor | 极曲线 / 航程 / 航时 / 过载（载荷因数） |
| static stability / neutral point / static margin / trim | 静稳定性 / 中性点 / 静稳定裕度 / 配平 |
| roll / pitch / yaw / phugoid / short-period mode / Dutch roll / spiral mode | 滚转 / 俯仰 / 偏航 / 长周期模态（沉浮模态） / 短周期模态 / 荷兰滚 / 螺旋模态 |
| orbital elements / eccentricity / semi-major axis / inclination | 轨道根数 / 偏心率 / 半长轴 / 轨道倾角 |
| true anomaly / eccentric anomaly / mean anomaly / Kepler's equation | 真近点角 / 偏近点角 / 平近点角 / 开普勒方程 |
| Hohmann transfer / gravity assist / sphere of influence / attitude / reaction wheel | 霍曼转移 / 引力辅助（引力弹弓） / 影响球 / 姿态 / 反作用飞轮 |
| finite element / node / shape function / stiffness matrix / mesh | 有限元 / 节点 / 形函数 / 刚度矩阵 / 网格 |
| weak form / Galerkin method / isoparametric element / Gauss quadrature | 弱形式 / 伽辽金法 / 等参单元 / 高斯积分 |
| finite volume method / upwind scheme / CFL condition / turbulence model | 有限体积法 / 迎风格式 / CFL 条件 / 湍流模型 |
| forward / inverse kinematics / Jacobian / singularity / end effector / workspace | 正运动学 / 逆运动学 / 雅可比矩阵 / 奇异位形 / 末端执行器 / 工作空间 |
| design for manufacture and assembly / reliability / FMEA / life-cycle assessment | 面向制造与装配的设计（DFMA） / 可靠性 / 失效模式与影响分析（FMEA） / 生命周期评价 |

Terms that are easy to confuse:

- **应力 / 压强 / 压力**: stress in a solid is 应力. Pressure $p$ is 压强 in fluid mechanics and heat
  transfer, and 压力 in thermodynamics (as in 沈维道《工程热力学》); write 压力 for a compressive
  force only where it cannot be read as pressure, otherwise 压缩力 or 法向力.
- **力矩 / 弯矩 / 扭矩 / 转矩**: the moment of a force is 力矩, the internal bending moment of a
  beam 弯矩, the internal torque of a shaft 扭矩, and the torque of a motor or engine 转矩.
- **刚度 / 强度 / 稳定性**: stiffness (resistance to deformation), strength (resistance to failure)
  and stability (resistance to buckling) are the three separate requirements of 材料力学; never
  interchange them.
- **惯性矩 / 转动惯量**: the second moment of area of a cross-section is 惯性矩; the mass moment of
  inertia of a body is 转动惯量.
- **动力学** translates both *dynamics* and *kinetics*; where the English contrasts kinematics and
  kinetics, write 运动学 and 动力学.
- **因数 / 系数**: use the standard 摩擦因数、安全因数、恢复因数, but keep the established
  升力系数、阻力系数、性能系数、传热系数.
- **压气机 / 压缩机**: the compressor of an aero-engine or gas turbine is 压气机; in refrigeration and
  industry, 压缩机.
- **效率 / 效能**: efficiency is 效率 (肋效率); heat-exchanger effectiveness and fin effectiveness are
  效能 (肋效能).
- **黏** not 粘 (黏度、黏性、运动黏度); **湍流** not 紊流; **量纲** not 因次; **边界层** not 附面层.
- **㶲** for exergy, with （exergy） after it at its first use in each lesson.

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/mechanical/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   proof, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

A good model to imitate (Maths Atlas, same engine): `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
and `/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 机械与航空航天图谱.
