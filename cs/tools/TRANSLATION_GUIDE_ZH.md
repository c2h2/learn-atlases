# Computer Science Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university computer science textbooks
(e.g. 严蔚敏《数据结构》, 汤小丹等《计算机操作系统》, 谢希仁《计算机网络》, 王珊、萨师煊《数据库系统概论》)
and, for the mathematical parts, Chinese university mathematics textbooks (同济《高等数学》,
北大《高等代数》, 茆诗松《概率论与数理统计》). Terms follow 全国科学技术名词审定委员会 (计算机科学技术名词)
where it has settled them. Neutral, precise textbook register. Faithful to the English: never add,
drop or change mathematics, algorithms, code, numbers, conditions or caveats. Translate meaning,
not word order.

**Status:** the atlas is a curriculum skeleton; no English lesson exists yet. Translate a lesson
only once its English is written and passes `tools/check.php`. Course overlays
(`content/zh/<course>/course.json`) may be written earlier for titles and summaries.

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
- tables keep their columns;
- **code stays code**: in fenced code blocks and inline `code`, keep identifiers, keywords,
  commands, file names, SQL, regular expressions and output exactly as in the English; translate
  only comments and the human-readable strings a program prints for the reader (keep a string
  unchanged if the text or an exercise refers to its exact output). Pseudocode in ```text blocks
  keeps its keywords (`if`, `while`, `return`) and names; translate its comments;
- `:::algorithm` blocks: translate the prose and numbered steps, keep every formula and name.

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
  Computer scientists: 图灵（Turing）, 丘奇（Church）, 冯·诺依曼（von Neumann）, 香农（Shannon）,
  布尔（Boole）, 巴贝奇（Babbage）, 洛芙莱斯（Lovelace）, 哥德尔（Gödel）, 迪杰斯特拉（Dijkstra）,
  高德纳（Knuth）, 霍尔（Hoare）, 库克（Cook）, 卡普（Karp）, 兰波特（Lamport）, 里奇（Ritchie）,
  汤普森（Thompson）, 科德（Codd）, 伯纳斯-李（Berners-Lee）, 肖尔（Shor）, 格罗弗（Grover）.
  Algorithms named after people keep the usual Chinese form: 迪杰斯特拉算法, 克鲁斯卡尔算法,
  普里姆算法, 弗洛伊德算法, 贝尔曼-福特算法, 哈夫曼编码, 欧几里得算法; when no Chinese form is
  established, keep the Latin name: Ford-Fulkerson方法, Raft算法, BM25.
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

### Computer science terms

| English | 中文 |
|---|---|
| program / programming / programming language | 程序 / 程序设计（编程） / 程序设计语言 |
| source code / compile / compiler / interpreter | 源代码 / 编译 / 编译器（编译程序） / 解释器（解释程序） |
| variable / assignment / expression / statement | 变量 / 赋值 / 表达式 / 语句 |
| function / parameter / argument / return value | 函数 / 形式参数（形参） / 实际参数（实参） / 返回值 |
| recursion / iteration / loop / base case | 递归 / 迭代 / 循环 / 基本情形 |
| class / object / instance / method / attribute | 类 / 对象 / 实例 / 方法 / 属性 |
| inheritance / polymorphism / encapsulation / interface | 继承 / 多态 / 封装 / 接口 |
| abstract data type / specification / invariant | 抽象数据类型 / 规格说明 / 不变式 |
| higher-order function / closure / lambda expression / pure function / side effect | 高阶函数 / 闭包 / λ表达式 / 纯函数 / 副作用 |
| iterator / generator / module / library | 迭代器 / 生成器 / 模块 / 库 |
| static / dynamic typing / type inference / generics | 静态类型 / 动态类型 / 类型推断 / 泛型 |
| test case / unit test / debugging / bug | 测试用例 / 单元测试 / 调试 / 缺陷（bug） |
| time / space complexity; worst / average case; amortised cost | 时间复杂度 / 空间复杂度；最坏情况 / 平均情况；摊还代价（均摊代价） |
| array / linked list / stack / queue / double-ended queue | 数组 / 链表 / 栈 / 队列 / 双端队列 |
| hash table / collision / load factor / open addressing / separate chaining | 哈希表（散列表） / 冲突 / 装填因子 / 开放定址法 / 链地址法 |
| binary tree / binary search tree / balanced tree | 二叉树 / 二叉搜索树（二叉查找树） / 平衡树 |
| AVL tree / red–black tree / B-tree / B+ tree / rotation | AVL树 / 红黑树 / B树 / B+树 / 旋转 |
| heap / priority queue / heapsort | 堆 / 优先队列 / 堆排序 |
| preorder / inorder / postorder / level-order traversal | 先序遍历 / 中序遍历 / 后序遍历 / 层序遍历 |
| adjacency list / matrix; breadth- / depth-first search | 邻接表 / 邻接矩阵；广度优先搜索 / 深度优先搜索 |
| shortest path / minimum spanning tree / topological sort / strongly connected component / union–find | 最短路径 / 最小生成树 / 拓扑排序 / 强连通分量 / 并查集 |
| merge sort / quicksort / insertion sort / radix sort | 归并排序 / 快速排序 / 插入排序 / 基数排序 |
| divide and conquer / greedy algorithm / dynamic programming / memoisation | 分治法 / 贪心算法 / 动态规划 / 备忘录法 |
| loop invariant / recurrence / master theorem | 循环不变式 / 递归式 / 主定理 |
| maximum flow / minimum cut / augmenting path / matching | 最大流 / 最小割 / 增广路径 / 匹配 |
| randomised algorithm / approximation algorithm / approximation ratio | 随机算法 / 近似算法 / 近似比 |
| finite automaton / deterministic / nondeterministic / state | 有限自动机 / 确定的 / 非确定的 / 状态 |
| regular language / regular expression / pumping lemma | 正则语言 / 正则表达式 / 泵引理 |
| context-free grammar / pushdown automaton / derivation / parse tree / ambiguous | 上下文无关文法 / 下推自动机 / 推导 / 语法分析树 / 二义的 |
| Turing machine / decidable / recognisable / halting problem | 图灵机 / 可判定 / 可识别 / 停机问题 |
| reduction / polynomial time / NP-complete / NP-hard | 归约 / 多项式时间 / NP完全 / NP难 |
| complexity class / oracle / relativisation | 复杂性类 / 预言机（谕示） / 相对化 |
| bit / byte / word / two’s complement / overflow | 位（比特） / 字节 / 字 / 补码 / 溢出 |
| pointer / address / stack frame / undefined behaviour | 指针 / 地址 / 栈帧 / 未定义行为 |
| register / instruction / assembly language / machine code | 寄存器 / 指令 / 汇编语言 / 机器码 |
| cache / hit / miss / locality / memory hierarchy | 高速缓存 / 命中 / 缺失（未命中） / 局部性 / 存储器层次结构 |
| linker / loader / object file / shared library | 链接器 / 加载器 / 目标文件 / 共享库 |
| operating system / kernel / user mode / system call | 操作系统 / 内核 / 用户态 / 系统调用 |
| process / thread / context switch / scheduling | 进程 / 线程 / 上下文切换 / 调度 |
| virtual memory / page / page table / page fault / TLB | 虚拟内存 / 页 / 页表 / 缺页 / 快表（TLB） |
| mutual exclusion / critical section / race condition | 互斥 / 临界区 / 竞争条件 |
| lock / semaphore / condition variable / monitor / deadlock | 锁 / 信号量 / 条件变量 / 管程 / 死锁 |
| interrupt / trap / signal / file descriptor | 中断 / 陷入 / 信号 / 文件描述符 |
| file system / inode / journalling / RAID | 文件系统 / 索引节点（inode） / 日志 / 磁盘阵列（RAID） |
| virtual machine / hypervisor / container | 虚拟机 / 虚拟机监控器（hypervisor） / 容器 |
| protocol / packet / packet switching / router / switch | 协议 / 分组 / 分组交换 / 路由器 / 交换机 |
| bandwidth / throughput / latency | 带宽 / 吞吐量 / 时延 |
| application / transport / network / link layer | 应用层 / 传输层 / 网络层 / 数据链路层 |
| routing / forwarding / routing table | 路由选择（路由） / 转发 / 路由表 |
| flow control / congestion control / sliding window | 流量控制 / 拥塞控制 / 滑动窗口 |
| socket / client / server | 套接字 / 客户端 / 服务器 |
| database / relation / tuple / attribute / schema | 数据库 / 关系 / 元组 / 属性 / 模式 |
| key / candidate key / primary key / foreign key | 码（键） / 候选码 / 主码（主键） / 外码（外键） |
| relational algebra / query / join / index | 关系代数 / 查询 / 连接 / 索引 |
| functional dependency / normal form / normalisation | 函数依赖 / 范式 / 规范化 |
| transaction / serialisable / isolation level / two-phase locking | 事务 / 可串行化 / 隔离级别 / 两阶段锁 |
| write-ahead logging / checkpoint / recovery | 预写式日志 / 检查点 / 恢复 |
| requirements / architecture / design pattern / refactoring | 需求 / 体系结构（架构） / 设计模式 / 重构 |
| version control / branch / merge / commit / code review | 版本控制 / 分支 / 合并 / 提交 / 代码评审 |
| syntax / semantics / scope / binding / type system / type safety | 语法 / 语义 / 作用域 / 绑定 / 类型系统 / 类型安全 |
| lambda calculus / continuation / coroutine | λ演算 / 续延（continuation） / 协程 |
| lexical analysis / token / parsing / parser | 词法分析 / 单词符号（token） / 语法分析 / 语法分析器 |
| intermediate representation / control-flow graph / SSA form | 中间表示 / 控制流图 / 静态单赋值形式（SSA） |
| data-flow analysis / register allocation / code generation / garbage collection | 数据流分析 / 寄存器分配 / 代码生成 / 垃圾回收 |
| speed-up / shared memory / message passing / memory model | 加速比 / 共享内存 / 消息传递 / 内存模型 |
| distributed system / consensus / replication / consistency / fault tolerance | 分布式系统 / 共识 / 复制 / 一致性 / 容错 |
| logical clock / vector clock / two-phase commit | 逻辑时钟 / 向量时钟 / 两阶段提交 |
| confidentiality / integrity / availability; authentication / authorisation / access control | 机密性 / 完整性 / 可用性；认证 / 授权 / 访问控制 |
| threat model / vulnerability / attack / mitigation | 威胁模型 / 漏洞 / 攻击 / 缓解措施 |
| buffer overflow / injection / cross-site scripting | 缓冲区溢出 / 注入 / 跨站脚本（XSS） |
| malware / firewall / intrusion detection | 恶意软件 / 防火墙 / 入侵检测 |
| plaintext / ciphertext / key / encryption / decryption | 明文 / 密文 / 密钥 / 加密 / 解密 |
| symmetric / public-key / post-quantum cryptography / block cipher | 对称密码 / 公钥密码 / 后量子密码 / 分组密码 |
| hash function (cryptographic) / MAC / digital signature / certificate / zero-knowledge proof | 哈希函数（杂凑函数） / 消息认证码 / 数字签名 / 证书 / 零知识证明 |
| agent / heuristic / adversarial search / constraint satisfaction | 智能体 / 启发式 / 对抗搜索 / 约束满足 |
| Bayesian network / Markov decision process / reinforcement learning | 贝叶斯网络 / 马尔可夫决策过程 / 强化学习 |
| inverted index / precision / recall / learning to rank | 倒排索引 / 查准率 / 查全率（召回率） / 排序学习 |
| rasterisation / shading / texture mapping / ray tracing | 光栅化 / 着色 / 纹理映射 / 光线追踪 |
| usability / prototype / accessibility | 可用性 / 原型 / 无障碍 |
| qubit / superposition / entanglement / quantum gate / quantum circuit | 量子比特 / 叠加 / 纠缠 / 量子门 / 量子线路 |

Terms that are easy to confuse — keep them apart:

- **进程** (process) and **线程** (thread) are different things; "multithreaded" is 多线程.
- **并行** (parallel, at the same instant) and **并发** (concurrent, interleaved) are different.
- **堆**: the data structure (二叉堆, 堆排序) and the memory region for dynamic allocation (堆区) share
  the word; in a chapter that uses both, write 堆（数据结构） and 堆区（动态内存） at first use.
  Likewise **栈** (the data structure) and **调用栈 / 栈区** (the call stack).
- **编译** (compile, translate before running) and **解释** (interpret, execute directly) are
  different; a 解释器 is not a 编译器.
- **键 / 码 / 密钥**: the key of a dictionary or hash table is 键; a database key is 码 (主码, 外码,
  following 王珊《数据库系统概论》; 主键/外键 in parentheses at first use); a cryptographic key is 密钥.
- **排序** is sorting; ranking in search is 排序 or 排名 — write 排序（ranking） at first use in
  information-retrieval chapters.
- **日志** (log records, journalling) versus **对数** (logarithm).
- **内存 / 主存** (memory) versus **存储 / 外存** (storage on disks and SSDs).
- **缓存**: a CPU cache is 高速缓存; a software cache (web, DNS, buffer) is 缓存.
- **传输层** for the transport layer (谢希仁《计算机网络》 writes 运输层; either is understood, use 传输层 throughout).
- **智能体** for *agent*, as in the LLM Atlas.
- Keep standard abbreviations in Latin letters after the Chinese at first use: 传输控制协议（TCP）,
  域名系统（DNS）, 结构化查询语言（SQL）; later just TCP, DNS, SQL.

Emphasis: write `**…**`, as Maths Atlas’s `gradient.md` does — Chinese typography has no italics. Run-in labels
such as *Sketch.* become `**证明概要。**`. Part labels stay half-width: `(a)…；(b)…`.

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/cs/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   proof, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

A good model to imitate (Maths Atlas, same engine): `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
and `/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 计算机科学图谱.
