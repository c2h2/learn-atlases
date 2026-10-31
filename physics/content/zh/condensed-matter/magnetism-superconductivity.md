前面各章始终把电子一个一个地处理。每个电子在平均势中运动、填满自己的能带、服从自己的薛定谔方程，固体是其各部分之和。自然界最引人注目的两个现象无法如此描述。$1043\,\mathrm K$ 以下，铁原子的磁矩自发排列，在许多微米大的区域内指向同一方向。$1.18\,\mathrm K$ 以下，铝中的电子凝聚到一个单一量子态；它的电阻不是小，而是零，磁场被从其内部推出。

两者都是**有序相**。临界温度之上，态具有支配它的规律的完整对称性；之下，它作出选择：磁化强度的一个方向，电子量子态的一个相位。这类转变的一般理论——连同伊辛模型与平均场理论——见 [[statistical-mechanics/phase-transitions]]。本章把它用到真实固体。我们先看不发生有序的原子的磁响应，即每种材料都显示的抗磁性与顺磁性；然后寻找使铁磁体有序的那种相互作用的起源，并从居里温度估计其强度。后半章转向超导：迈斯纳效应、用两行论证导出的伦敦穿透深度、BCS 理论的能隙、磁通量子 $h/2e$、约瑟夫森效应与高温超导体。

我们需要 [[magnetism/magnetic-force]] 与 [[magnetism/faraday]] 的磁场、[[quantum-1/spin]] 的自旋与磁矩，以及 [[condensed-matter/free-electrons]] 的自由电子结果。

## 磁响应 {#response}

处在场 $\mathbf H$ 中的材料获得**磁化强度** $\mathbf M$，即单位体积的磁矩。弱场下响应是线性的，我们定义无量纲的**磁化率**为

$$
\mathbf M = \chi\,\mathbf H, \qquad \mathbf B = \mu_0(\mathbf H + \mathbf M) = \mu_0(1 + \chi)\,\mathbf H.
$$ {#eq-chi}

几乎所有材料都有 $\abs\chi\ll1$，于是 $\mathbf B\approx\mu_0\mathbf H$，可以以可忽略的误差写 $\mathbf M = \chi\mathbf B/\mu_0$。**抗磁体**的 $\chi < 0$：它逆着磁场磁化，被推出强场区。**顺磁体**的 $\chi > 0$，被吸入强场区。**铁磁体**在完全无场时也有磁化强度。

在任何计算之前，先有一条来自经典物理的警告。**玻尔–范勒文定理**（尼尔斯·玻尔（Niels Bohr），1911；亨德里卡·范勒文（Hendrika van Leeuwen），1919）说：热平衡中的经典电荷系统在任何静场中的磁化都为零。证明很短：磁场只通过 $\mathbf p - q\mathbf A$ 进入哈密顿量，而经典配分函数中对动量积分变量的平移就把 $\mathbf A$ 完全移去，于是自由能与 $\mathbf B$ 无关。因此物质中的磁性必是量子效应——或者通过轨道量子化，或者通过自旋。

### 抗磁性

考虑电子填满壳层的原子，它没有净轨道或自旋磁矩。在磁场 $\mathbf B = B\hat{\mathbf z}$ 中取对称规范 $\mathbf A = \frac12\mathbf B\times\mathbf r$，每个电子的动能 $(\mathbf p + e\mathbf A)^2/2m$ 包含一项

$$
\frac{e^2A^2}{2m} = \frac{e^2B^2}{8m}\bigl(x^2 + y^2\bigr).
$$

$B$ 的线性项含有轨道角动量，在满壳层中为零。因此由一级微扰论，原子的能量升高 $\Delta E = (e^2B^2/8m)\sum\langle x^2 + y^2\rangle$，对它的 $Z$ 个电子求和。

::: proposition 朗之万抗磁性 {#prop-langevin}
单位体积含 $n$ 个满壳层原子、每个原子有 $Z$ 个方均半径为 $\langle r^2\rangle$ 的电子的材料，其磁化率为

$$
\chi_\mathrm{dia} = -\frac{\mu_0 nZe^2\langle r^2\rangle}{6m}.
$$ {#eq-langevin}
:::

::: proof
原子的磁矩为 $\mu = -\partial\Delta E/\partial B = -(e^2B/4m)\,Z\langle x^2 + y^2\rangle$。球对称原子有 $\langle x^2\rangle = \langle y^2\rangle = \langle z^2\rangle = \frac13\langle r^2\rangle$，故 $\langle x^2 + y^2\rangle = \frac23\langle r^2\rangle$，$\mu = -Ze^2B\langle r^2\rangle/(6m)$。磁化强度为 $M = n\mu$，由 $\chi = \mu_0M/B$ 即得 [[#eq-langevin]]。
:::

取 $n = 5\times10^{28}\,\mathrm{m^{-3}}$、$Z = 10$、$\langle r^2\rangle = (1\,\text{Å})^2$，得 $\chi\approx-3\times10^{-5}$。抗磁固体与液体的实测值在此量级；水的 $\chi = -9.0\times10^{-6}$。抗磁性存在于一切材料中，但它太弱，任何一个未配对自旋都能压倒它。它是楞次定律在原子尺度的表现：场感生反抗它的轨道电流，而量子力学禁止电流衰减，响应便持续存在。

### 顺磁性

有一个未配对电子的原子具有永久磁矩。取最简单的情形：自旋 $\frac12$ 的磁矩，大小 $\mu_B = e\hbar/2m = 9.274\times10^{-24}\,\mathrm{J/T}$，无轨道贡献。在磁场 $B$ 中它有两个能量 $\mp\mu_BB$，对应磁矩顺场或逆场。磁矩沿场的热平均为

$$
\langle\mu\rangle = \frac{\mu_Be^{\mu_BB/k_BT} - \mu_Be^{-\mu_BB/k_BT}}{e^{\mu_BB/k_BT} + e^{-\mu_BB/k_BT}} = \mu_B\tanh\frac{\mu_BB}{k_BT}.
$$ {#eq-tanh}

::: theorem 居里定律 {#thm-curie}
对单位体积 $n$ 个独立的自旋 $\frac12$ 磁矩，在 $\mu_BB\ll k_BT$ 的极限下，

$$
\chi = \frac{\mu_0n\mu_B^2}{k_BT} = \frac CT.
$$ {#eq-curie}

更一般地，对总角动量为 $J$、朗德因子为 $g$ 的离子，$C = \mu_0ng^2\mu_B^2J(J+1)/(3k_B)$，并称 $p = g\sqrt{J(J+1)}$ 为**有效玻尔磁子数**。
:::

::: proof
$x$ 小时 $\tanh x\approx x$，故 [[#eq-tanh]] 给出 $\langle\mu\rangle\approx\mu_B^2B/(k_BT)$，$M = n\mu_B^2B/(k_BT)$。于是 $\chi = \mu_0M/B = \mu_0n\mu_B^2/(k_BT)$。对 $g = 2$ 的自旋 $\frac12$，$g^2J(J+1)/3 = 4\cdot\frac34/3 = 1$，与一般公式相符。一般情形由 $2J+1$ 个能级 $-g\mu_Bm_JB$ 同样导出；其推导（给出布里渊函数）见 Kittel 第 11 章。
:::

$1/T$ 是一场竞争：场试图排列磁矩，热扰动试图把它们打乱，得胜的比例是 $\mu_BB/k_BT$，在常温 $1\,\mathrm T$ 下约为 $2\times10^{-3}$。皮埃尔·居里（Pierre Curie）1895 年由实验得出这一定律；朗之万（Langevin）1905 年为经典磁矩导出了它，而玻尔–范勒文定理表明，他之所以还算正当，只因为他假定了磁矩是永久的。

::: example 一种顺磁盐 {#ex-curie-salt}
五水硫酸铜 $\mathrm{CuSO_4\cdot5H_2O}$ 的密度为 $2.286\,\mathrm{g/cm^3}$，摩尔质量 $249.69\,\mathrm{g/mol}$；每个 $\mathrm{Cu^{2+}}$ 离子带自旋 $\frac12$，其轨道磁矩被晶体场淬灭。把离子视为独立，求它的居里常数以及在 $300\,\mathrm K$ 与 $1\,\mathrm K$ 下的磁化率。
::: solution
离子密度为 $n = 2286\times6.02214\times10^{23}/0.24969 = 5.51\times10^{27}\,\mathrm{m^{-3}}$。于是

$$
C = \frac{\mu_0n\mu_B^2}{k_B} = \frac{(1.25664\times10^{-6})(5.51\times10^{27})(9.2740\times10^{-24})^2}{1.380649\times10^{-23}}\,\mathrm K = 0.0432\,\mathrm K.
$$

$300\,\mathrm K$ 时 $\chi = C/T = 1.44\times10^{-4}$，是水的抗磁性的十五倍，但仍很小。$1\,\mathrm K$ 时 $\chi = 0.043$。由此类盐实测居里常数得出的 $\mathrm{Cu^{2+}}$ 有效磁矩为 $p\approx1.9$，而非纯自旋值 $\sqrt3 = 1.73$：轨道磁矩被淬灭了，但没有完全淬灭。顺磁盐先在磁场中冷却、再绝热退磁，是 1933 年以后达到 $1$ 开尔文以下低温的途径，即德拜（Debye）与吉奥克（Giauque）提出的绝热退磁方法。
:::
:::

传导电子也是自旋 $\frac12$ 粒子，却不遵守居里定律。只有费米能附近约 $\mu_BB$ 范围内的电子能够翻转自旋，因为翻转深处一个电子会把它放进已占据的态。其结果就是泡利（Pauli）1927 年提出的、与温度无关的小量**泡利顺磁性**，$\chi_P = \mu_0\mu_B^2g(E_F) = \frac32\mu_0n\mu_B^2/E_F$，比居里值小一个 $T/T_F$ 量级的因子。钠的是 $8\times10^{-6}$。这是费米–狄拉克统计最早的胜利之一。

## 铁磁性 {#ferromagnetism}

1907 年，皮埃尔·外斯（Pierre Weiss）提出，铁中的磁矩感受到一个正比于磁化强度的内**分子场**，$B_\mathrm{eff} = B + \lambda\mu_0M$，并表明这将导致临界温度以下的自发磁化。这个想法管用，但它所要求的场大得惊人，而且绝不可能是磁性的。

::: example 铁的外斯场 {#ex-weiss-field}
平均场理论（我们马上要推导）给出：自旋 $\frac12$ 磁矩在饱和分子场 $B_W$ 下满足 $k_BT_c\approx\mu_BB_W$。对铁估算 $B_W$，取 $T_c = 1043\,\mathrm K$，把它与近邻磁矩的偶极场比较；再把两个相距 $2.48\,\text{Å}$ 的 $\mu_B$ 磁矩间的偶极相互作用能与 $k_BT_c$ 比较。
::: solution
分子场为

$$
B_W\approx\frac{k_BT_c}{\mu_B} = \frac{(1.380649\times10^{-23})(1043)}{9.2740\times10^{-24}}\,\mathrm T = 1.55\times10^{3}\,\mathrm T.
$$

两个相距 $r = 2.48\,\text{Å}$ 的 $\mu_B$ 磁矩的偶极相互作用能量级为

$$
\frac{\mu_0\mu_B^2}{4\pi r^3} = \frac{10^{-7}\times(9.2740\times10^{-24})^2}{(2.48\times10^{-10})^3}\,\mathrm J = 5.6\times10^{-25}\,\mathrm J,
$$

即 $3.5\,\mu\mathrm{eV}$，或 $k_B\times0.04\,\mathrm K$。它只能让铁在约二十分之一开尔文以下有序，而不是 $1043\,\mathrm K$；对应的场不足一特斯拉。使磁矩排列的相互作用比磁力所能提供的强两万倍以上。它必定是静电的。
:::
:::

### 交换相互作用

海森堡（Heisenberg）在 1928 年找到了它的静电起源。考虑近邻原子上的两个电子。总波函数必须在交换下反对称，即 [[quantum-2/identical-particles]] 的泡利原理。若两自旋处于对称的三重态（总自旋 $1$），空间波函数就必须反对称；于是它在两电子同点处为零，把他们彼此推开，从而降低库仑排斥。若自旋组成反对称的单态（总自旋 $0$），空间函数对称，电子可以靠得更近。因此库仑能依赖自旋态，尽管哈密顿量里根本没有自旋。

两种可能的能量可以用一个有效自旋哈密顿量概括。自旋以 $\hbar$ 为单位时，$\mathbf S_1\cdot\mathbf S_2 = \frac12\bigl[S(S+1) - \frac32\bigr]$ 在三重态为 $+\frac14$，在单态为 $-\frac34$。于是

$$
H_\mathrm{ex} = -J\,\mathbf S_1\cdot\mathbf S_2
$$ {#eq-exchange}

给出三重态能量 $-J/4$ 与单态能量 $+3J/4$，劈裂 $E_S - E_T = J$。若 $J > 0$，平行自旋有利：**铁磁**交换。若 $J < 0$，反平行：**反铁磁**。**交换常数** $J$ 是库仑能之差，典型为几十毫电子伏、几百开尔文，正合所需的量级。对一个格子，**海森堡模型**把 [[#eq-exchange]] 对近邻对求和。

### 平均场理论

海森堡模型在三维无法精确求解。外斯的想法，用现代的说法，是把一个自旋周围的各自旋换成它们的平均值。我们对自旋 $\frac12$ 这样做，沿磁矩方向度量自旋，使自旋在磁场 $B$ 中的塞曼能为 $-2\mu_BBS^z$。

::: theorem 平均场铁磁体 {#thm-mean-field}
对近邻数为 $z$ 的自旋 $\frac12$ 海森堡模型 $H = -J\sum_{\langle ij\rangle}\mathbf S_i\cdot\mathbf S_j - 2\mu_BB\sum_iS_i^z$，平均场近似给出约化磁化强度 $m = 2\langle S^z\rangle$ 满足

$$
m = \tanh\Bigl(\frac{T_cm}{T} + \frac{\mu_BB}{k_BT}\Bigr), \qquad k_BT_c = \frac{zJ}{4}.
$$ {#eq-mean-field}

$B = 0$ 时，当且仅当 $T < T_c$ 它有非零解 $m\ne0$。$T > T_c$ 时，磁化率服从**居里–外斯定律**

$$
\chi = \frac{C}{T - T_c}, \qquad C = \frac{\mu_0n\mu_B^2}{k_B}.
$$ {#eq-curie-weiss}
:::

::: proof
$H$ 中含自旋 $i$ 的项是 $-J\mathbf S_i\cdot\sum_{j}\mathbf S_j - 2\mu_BBS_i^z$，和遍历它的 $z$ 个近邻。把每个近邻自旋换成其热平均 $\langle\mathbf S_j\rangle = \langle S^z\rangle\hat{\mathbf z}$。于是自旋 $i$ 看到的单自旋哈密顿量为 $-\bigl(zJ\langle S^z\rangle + 2\mu_BB\bigr)S_i^z$，其两个能级 $S_i^z = \pm\frac12$ 的能量为 $\mp\frac12\bigl(zJ\langle S^z\rangle + 2\mu_BB\bigr)$。如 [[#eq-tanh]]，

$$
\langle S^z\rangle = \frac12\tanh\frac{zJ\langle S^z\rangle + 2\mu_BB}{2k_BT}.
$$

以 $m = 2\langle S^z\rangle$ 改写即 $m = \tanh\bigl((zJm/4 + \mu_BB)/k_BT\bigr)$，就是取 $k_BT_c = zJ/4$ 的 [[#eq-mean-field]]。自洽要求用于近邻的平均等于所产生的平均。

$B = 0$ 时，$m = 0$ 恒为解。函数 $\tanh(T_cm/T)$ 在 $m > 0$ 上是凹的，从原点出发、斜率为 $T_c/T$，并趋于 $1$。若 $T_c/T > 1$，它在原点附近升到直线 $m$ 之上，必在 $1$ 以下再次与之相交，给出解 $0 < m < 1$；若 $T_c/T\le1$，它对所有 $m > 0$ 都留在直线之下（因为 $y > 0$ 时 $\tanh y < y$），别无他解。$T > T_c$ 加小场时 $m$ 很小且 $\tanh y\approx y$：$m = T_cm/T + \mu_BB/k_BT$，故 $m = \mu_BB/\bigl(k_B(T - T_c)\bigr)$。磁化强度为 $M = n\mu_Bm$，由 $\chi = \mu_0M/B$ 即得 [[#eq-curie-weiss]]。
:::

::: widget plot
f: x; tanh(x/t)
x: -1.5, 1.5
y: -1.2, 1.2
labels: m; tanh(m T_c/T)
sliders: t=1.3:0.2:2:0.01
caption: 零场下平均场方程 [[#eq-mean-field]] 的图解解，其中 $t = T/T_c$。解就是直线 $m$ 与 $\tanh(m/t)$ 的交点。$t > 1$ 时唯一的交点是 $m = 0$：顺磁体。把 $t$ 降过 $1$，两个新交点出现在 $\pm m_0$，在转变点稍下方按 $\sqrt{3(1 - t)}$ 增长，并在 $t\to0$ 时趋于 $\pm1$。两个符号就是磁体可以选择的两个方向：一个被破缺的对称性。
:::

对一般自旋 $S$，同样的论证给出 $k_BT_c = zJS(S+1)/3$，$S = \frac12$ 时化归 $zJ/4$。平均场理论定性图像正确，细节错误。实测磁化强度在 $T_c$ 附近按 $(T_c - T)^\beta$ 消失，$\beta\approx0.34$–$0.37$，而不是 $\frac12$；实测磁化率只在远高于 $T_c$ 处遵循居里–外斯定律，拟合的 $\theta$ 略高于 $T_c$；而 $T_c$ 本身被高估，因为涨落——平均值把它们丢弃的东西——有助于破坏有序。指数为何不同、又为何在极不相同的磁体之间相同，是重整化群的课题，[[statistical-mechanics/phase-transitions]] 中有概略。

::: example 铁的交换常数 {#ex-exchange-fe}
铁是 bcc，近邻数 $z = 8$，$T_c = 1043\,\mathrm K$。把每个原子当作自旋 $S = 1$（实测磁矩为 $2.2\,\mu_B$），由平均场理论估算 $J$。
::: solution
由 $k_BT_c = zJS(S+1)/3$，

$$
J = \frac{3k_BT_c}{zS(S+1)} = \frac{3\times89.88\,\mathrm{meV}}{8\times2} = 16.9\,\mathrm{meV},
$$

其中 $k_BT_c = (8.617\times10^{-5}\,\mathrm{eV/K})(1043\,\mathrm K) = 89.88\,\mathrm{meV}$。由于平均场理论高估 $T_c$，真实的 $J$ 略大。几十毫电子伏的交换能只是原子中电子库仑能的很小一部分，却是 [[#ex-weiss-field]] 偶极能的一千倍。铁中的磁矩由 $3d$ 电子承担，它们部分离域、处在能带之中，定域的海森堡图像本身就是近似；斯通纳（Stoner）的铁磁能带论把同样的交换能处理成自旋向上与向下能带之间的移动。
:::
:::

并非每个有序磁体都是铁磁体。$J < 0$ 时近邻磁矩反向排列：**反铁磁体**，无净磁化，如 $\mathrm{MnO}$ 与铬，由路易·奈耳（Louis Néel）于 1930 年代发现，1949 年被中子衍射直接看到。反铁磁体在其有序温度（奈耳温度）之上服从 $\chi = C/(T + \theta)$，$\theta > 0$。当两副反向的子晶格磁矩不等时，结果是有净磁矩的**亚铁磁体**，如磁铁矿 $\mathrm{Fe_3O_4}$，即最早的指南针所用的天然磁石。磁性氧化物的化学见化学图谱（[磁学与光学材料](/learn/chemistry/lesson.php?c=materials-chemistry&l=magnetic-optical)）。最后，一个大铁磁体很少均匀磁化：它分裂成朝不同方向磁化的**磁畴**，以降低外场的能量。小的外场移动畴壁，这就是一枚铁钉本身不是磁体、放进磁场才成为磁体的原因。

::: quiz
某材料在某一温度之上服从 $\chi = C/(T - \theta)$，$\theta = -40\,\mathrm K$。这说明它的磁矩之间的相互作用是什么样的？
- [ ] 是铁磁的，它将在 $40\,\mathrm K$ 有序。
- [x] 是反铁磁的；它可能在低温反铁磁有序。
- [ ] 没有相互作用；$\theta$ 是拟合误差。
- [ ] 它是超导体。
::: solution
平均场理论中 $\theta$ 与交换同号：铁磁耦合为正，使磁化率在 $C/T$ 之上被增强；反铁磁耦合为负，使其被压低。$\theta$ 为负意味着近邻磁矩偏好反向排列。它是否有序、在哪里有序取决于格子；平均场理论中，简单两子晶格反铁磁体的奈耳温度为 $\abs\theta$。
:::
:::

## 超导 {#superconductivity}

1911 年，海克·卡末林·昂内斯（Heike Kamerlingh Onnes）在把氦液化三年之后，测量冷却中水银的电阻，看到它在 $4.2\,\mathrm K$ 陡然降为零。超导环中的电流一旦开始，多年内看不出可测的衰减；电阻率低于 $10^{-24}\,\Omega\,\mathrm m$，比常温铜至少小十六个数量级。许多元素都超导，转变温度 $T_c$ 为：铝 $1.18\,\mathrm K$，锡 $3.72\,\mathrm K$，铅 $7.19\,\mathrm K$，铌 $9.25\,\mathrm K$。铜、银、金这些良导体却不超导——至少在测到的最低温度下如此。

### 迈斯纳效应

零电阻只是故事的一半。瓦尔特·迈斯纳（Walther Meissner）与罗伯特·奥克森费尔特（Robert Ochsenfeld）1933 年发现，在磁场中降温穿过 $T_c$ 的超导体把磁场从其内部排出。仅仅理想导体做不到这一点：由法拉第定律，$\mathbf E = 0$ 的材料内部 $\dd\mathbf B/\dd t = -\nabla\times\mathbf E = 0$，它会把失去电阻那一刻存在的磁场原样冻结住。超导体不论历史如何，最终内部 $\mathbf B = 0$。排出是平衡态的性质，它使超导体成为完美抗磁体，$\chi = -1$。

排出是有代价的。排出磁场 $B$ 需付出单位体积 $B^2/2\mu_0$ 的磁能，所以当它超过超导态的冷凝能时，超导就被摧毁。这定义了**临界场** $B_c(T)$，经验上接近 $B_c(0)\bigl[1 - (T/T_c)^2\bigr]$；铅的 $B_c(0) = 0.080\,\mathrm T$。**第 I 类**超导体（多为纯元素）把磁场完全排出直到 $B_c$。**第 II 类**超导体——包括铌以及一切技术上重要的合金与化合物——在场超过下临界场后让磁场以量子化涡旋阵列的形式进入，超导存续到可超过 $20\,\mathrm T$ 的上临界场。MRI 扫描仪与粒子加速器的磁体就是用第 II 类铌钛与铌锡导线绕制的。

### 伦敦方程

弗里茨·伦敦（Fritz London）与海因茨·伦敦（Heinz London）在 1935 年给出了超导体的第一套电动力学。设密度 $n_s$ 的电子无摩擦地运动。在电场 $\mathbf E$ 中每个都自由加速，$m\,\dd\mathbf v/\dd t = -e\mathbf E$，所以超导电流密度 $\mathbf j_s = -n_se\mathbf v$ 满足

$$
\deriv{\mathbf j_s}{t} = \frac{n_se^2}{m}\,\mathbf E.
$$ {#eq-london1}

取旋度并用法拉第定律 $\nabla\times\mathbf E = -\partial\mathbf B/\partial t$：

$$
\pdv{}{t}\Bigl(\nabla\times\mathbf j_s + \frac{n_se^2}{m}\mathbf B\Bigr) = 0.
$$

理想导体只要求方括号不随时间变化。伦敦兄弟的洞见是要求方括号本身为零——这是一条新定律，而不是旧定律的推论：

$$
\nabla\times\mathbf j_s = -\frac{n_se^2}{m}\,\mathbf B.
$$ {#eq-london2}

::: theorem 伦敦穿透深度 {#thm-london}
在满足 [[#eq-london2]] 与静安培定律 $\nabla\times\mathbf B = \mu_0\mathbf j_s$ 的超导体内部，磁场满足

$$
\nabla^2\mathbf B = \frac{\mathbf B}{\lambda_L^2}, \qquad \lambda_L = \sqrt{\frac{m}{\mu_0n_se^2}}.
$$ {#eq-lambda}

对充满半空间 $x > 0$、外部有平行于表面的均匀场 $B_0$ 的超导体，$B(x) = B_0e^{-x/\lambda_L}$。
:::

::: proof
对安培定律取旋度：由 [[#eq-london2]]，$\nabla\times(\nabla\times\mathbf B) = \mu_0\nabla\times\mathbf j_s = -(\mu_0n_se^2/m)\mathbf B$。向量恒等式 $\nabla\times(\nabla\times\mathbf B) = \nabla(\nabla\cdot\mathbf B) - \nabla^2\mathbf B$ 配上 $\nabla\cdot\mathbf B = 0$ 给出 $-\nabla^2\mathbf B = -\mathbf B/\lambda_L^2$，即 [[#eq-lambda]]。对半空间，对称性使 $\mathbf B = B(x)\hat{\mathbf z}$，方程化为 $B'' = B/\lambda_L^2$，通解 $B = c_1e^{-x/\lambda_L} + c_2e^{x/\lambda_L}$。$x\to\infty$ 的有限性要求 $c_2 = 0$，表面切向场的连续定出 $c_1 = B_0$。
:::

磁场连同屏蔽电流一起被限制在厚度 $\lambda_L$ 的表面层内。更深处 $\mathbf B = 0$：这就是迈斯纳效应，如今由 [[#eq-london2]] 导出。内部均匀场不是解，因为 [[#eq-lambda]] 的右端不会为零。

::: example 铝的穿透深度 {#ex-london-al}
设每原子三个传导电子全部超导，$n_s = 1.81\times10^{29}\,\mathrm{m^{-3}}$，估算低温下铝的 $\lambda_L$。
::: solution
由 [[#eq-lambda]]，

$$
\lambda_L = \sqrt{\frac{9.1094\times10^{-31}}{(1.25664\times10^{-6})(1.81\times10^{29})(1.60218\times10^{-19})^2}}\,\mathrm m = 1.25\times10^{-8}\,\mathrm m = 12.5\,\mathrm{nm}.
$$

实测值约 $16\,\mathrm{nm}$。此模型没有自由参数，量级相符因此意味深长。$T\to T_c$ 时穿透深度增大，因为 $n_s$ 在那里趋于零；在 $T_c$ 它发散，磁场自由进入。比 $\lambda_L$ 薄得多的膜完全无法排出磁场。
:::
:::

::: widget plot
f: cosh(x/l)/cosh(1/(2*l))
x: -0.5, 0.5
y: 0, 1.05
sliders: l=0.1:0.01:1:0.01
caption: 单位厚度超导平板在平行外场中的内部磁场，$B/B_0 = \cosh(x/\lambda)/\cosh(1/2\lambda)$，是 [[#eq-lambda]] 在两表面匹配 $B_0$ 的解。滑杆以厚度为单位设定 $\lambda$。$\lambda = 0.05$ 时，除两个薄层外磁场都被排出：这就是块材的迈斯纳态。把 $\lambda$ 增大到 $0.5$ 以上——接近 $T_c$ 或极薄膜时会如此——磁场几乎均匀穿透：薄膜不显示迈斯纳效应。
:::

### BCS 理论与能隙

微观理论由约翰·巴丁（John Bardeen）、利昂·库珀（Leon Cooper）与罗伯特·施里弗（Robert Schrieffer）在 1957 年给出。其核心要素是库珀 1956 年的结果：满费米海对电子之间的任何吸引都不稳定，无论多弱：费米面上方两个动量、自旋都相反的电子结成一个束缚对，因为不相容原理剥夺了下方的态，把问题变成一个任何吸引都能束缚的有效二维问题。常规超导体中吸引来自声子。路过的电子吸引正离子；格子反应慢，第二个电子到达时畸变尚未消失，于是它被拉进正电荷区域。声子机制的证据先于理论而来：1950 年，埃马纽埃尔·麦克斯韦（Emanuel Maxwell）以及独立地，雷诺兹（Reynolds）、塞林（Serin）、赖特（Wright）与内斯比特（Nesbitt）发现汞的 $T_c$ 随同位素质量 $M$ 按 $M^{-1/2}$ 变化，恰如声子频率。

BCS 基态是一个相干叠加态，所有电子都结成电荷为 $-2e$ 的**库珀对**，彼此强烈交叠：对的大小——相干长度——在铝中超过一微米，如此体积中包含着数百万对其他对。拆散一对至少要付出 $2\Delta$，其中 $\Delta$ 是**能隙**。BCS 理论预言，弱耦合下

$$
\Delta(0) = 1.764\,k_BT_c,
$$ {#eq-bcs-gap}

且 $\Delta(T)$ 连续下降到 $T_c$ 处归零。能隙解释了超导体的热容在低温按 $e^{-\Delta/k_BT}$ 下降，以及微波与远红外吸收在 $\hbar\omega = 2\Delta$ 处开启。伊瓦尔·贾埃弗（Ivar Giaever）1960 年用电子隧穿直接测出了能隙。

::: example 铝与铌的能隙 {#ex-bcs-gap}
用 [[#eq-bcs-gap]] 估算铝（$T_c = 1.175\,\mathrm K$）与铌（$T_c = 9.25\,\mathrm K$）的 $\Delta(0)$，并求恰好能拆散铝中一对的辐射频率。
::: solution
对铝，$k_BT_c = (8.6173\times10^{-5}\,\mathrm{eV/K})(1.175\,\mathrm K) = 0.1013\,\mathrm{meV}$，故 $\Delta = 1.764\times0.1013\,\mathrm{meV} = 0.179\,\mathrm{meV}$。拆对需要 $2\Delta = 0.357\,\mathrm{meV}$，光子频率 $2\Delta/h = 86\,\mathrm{GHz}$，在微波波段。对铌，$k_BT_c = 0.797\,\mathrm{meV}$，$\Delta = 1.41\,\mathrm{meV}$；隧穿测量给出约 $1.5\,\mathrm{meV}$，比值 $2\Delta/k_BT_c\approx3.8$ 略高于 BCS 值 $3.53$。铅的 $2\Delta/k_BT_c\approx4.3$，偏离更大：它是"强耦合"超导体，由埃利亚什贝格（Eliashberg）对 BCS 理论的推广来描述。能隙只有费米能的千分之几。超导是费米面附近毫电子伏内各态的一次精巧重组。
:::
:::

### 磁通量子化

库珀对共享一个单一量子态，所以超导体有一个宏观波函数 $\Psi(\mathbf r) = \abs\Psi e^{i\theta(\mathbf r)}$，其相位 $\theta$ 在整个样品中保持相干。这对一个环有一个惊人的后果。

::: theorem 磁通量子 {#thm-flux}
超导环中的磁通——沿材料深处电流为零的回路测量——是下式的整数倍：

$$
\Phi_0 = \frac{h}{2e} = 2.067834\times10^{-15}\,\mathrm{Wb}.
$$ {#eq-flux}
:::

::: proof
对由 $\Psi = \abs\Psi e^{i\theta}$ 描述、电荷 $q$、质量 $m^*$ 的粒子，矢量势 $\mathbf A$ 中的量子力学电流密度为 $\mathbf j = (q\abs\Psi^2/m^*)\bigl(\hbar\nabla\theta - q\mathbf A\bigr)$。环的深处、穿透深度之外，$\mathbf j = 0$，所以沿回路有 $\hbar\nabla\theta = q\mathbf A$。沿材料内的闭合回路 $\mathcal C$ 积分：

$$
\hbar\oint_{\mathcal C}\nabla\theta\cdot\dd\mathbf l = q\oint_{\mathcal C}\mathbf A\cdot\dd\mathbf l = q\,\Phi,
$$

其中斯托克斯定理把 $\mathbf A$ 的线积分化成了穿过回路的磁通 $\Phi$。波函数单值，所以 $\theta$ 绕环一周只能改变 $2\pi N$，$N$ 为整数。于是 $\Phi = 2\pi\hbar N/\abs q = Nh/\abs q$。对库珀对 $\abs q = 2e$，得 $\Phi = N\,h/2e$。
:::

因子 $2$ 是配对的标志。在人们想到配对之前，弗里茨·伦敦曾预言以 $h/e$ 为单位的磁通量子化。1961 年，巴斯康·迪弗（Bascom Deaver）与威廉·费尔班克（William Fairbank），以及独立地，罗伯特·多尔（Robert Doll）与马丁·尼鲍尔（Martin Näbauer），测量了小超导圆柱中俘获的磁通，发现了 $h/2e$ 的台阶。第 II 类超导体的每个涡旋恰好携带一个磁通量子。

### 约瑟夫森效应

1962 年，剑桥的研究生布赖恩·约瑟夫森（Brian Josephson）预言，库珀对可以隧穿过两个超导体之间的薄绝缘势垒，而电流取决于二者相位之差 $\varphi$：

$$
I = I_c\sin\varphi, \qquad \hbar\deriv{\varphi}{t} = 2eV.
$$ {#eq-josephson}

无电压时可以流过至多 $I_c$ 的超导电流：**直流约瑟夫森效应**。加恒定电压 $V$，相位以 $2eV/\hbar$ 的速率卷绕，电流以频率 $f = 2eV/h$ 振荡：**交流约瑟夫森效应**，一台电压–频率转换器，其常数 $K_J = 2e/h = 483\,597.848\,\mathrm{GHz/V}$ 只含基本常数。数千个结组成的阵列在微波辐照下定义伏特：1990 年以来电压基准就是这样实现的，而 2019 年国际单位制重新定义之后 $K_J$ 是精确值。超导环中的两个结构成一台**超导量子干涉仪（SQUID）**，其临界电流随环中磁通以周期 $\Phi_0$ 振荡；SQUID 能探测 $10^{-15}\,\mathrm T$ 的磁场，小到足以测绘人脑的磁场。约瑟夫森结还是超导量子比特的非线性元件，是截至 2026 年量子计算机的前沿平台之一。

::: example 约瑟夫森频率 {#ex-josephson}
求 $V = 10.0\,\mu\mathrm V$ 时的交流约瑟夫森频率，以及面积 $1.00\,\mathrm{mm^2}$ 的环在 $50\,\mu\mathrm T$ 地场中穿过的磁通量子数。
::: solution
频率为

$$
f = \frac{2eV}{h} = (4.835978\times10^{14}\,\mathrm{Hz/V})(1.00\times10^{-5}\,\mathrm V) = 4.84\times10^{9}\,\mathrm{Hz} = 4.84\,\mathrm{GHz}.
$$

几微伏就是吉赫兹，这就是该效应成为电压计量学基础的原因：频率可以测到 $10^{12}$ 分之一的精度。穿过环的磁通为 $\Phi = BA = (5.0\times10^{-5})(1.00\times10^{-6})\,\mathrm{Wb} = 5.0\times10^{-11}\,\mathrm{Wb}$，即

$$
\frac{\Phi}{\Phi_0} = \frac{5.0\times10^{-11}}{2.0678\times10^{-15}} = 2.42\times10^4
$$

个磁通量子。SQUID 能分辨单个量子的一小部分，所以它能察觉亿分之一量级的地场变化。
:::
:::

::: warning 零电阻解释不了迈斯纳效应
人们很容易说超导体排出磁场是"因为"它零电阻。这是推不出来的。由法拉第定律，理想导体守恒它变为理想时已有的磁通；它会排出降温之后加上的场，却保留降温之前加上的场。超导体两者都排出。排出来自一条额外的定律，即 [[#eq-london2]]，BCS 理论把它归结为对波函数的刚性。一个相关的错误是把穿透深度当作普通导体的趋肤深度：它与频率无关（低到零频依然如此），而且适用于静场。
:::

::: quiz
为什么磁通量子化实验发现的是 $h/2e$ 的台阶而不是 $h/e$？
- [ ] 因为每个电子携带半个磁通量子。
- [x] 因为相干波函数描述的是电荷为 $2e$ 的库珀对。
- [ ] 因为环有两个表面。
- [ ] 因为电子自旋为 $\frac12$。
::: solution
在 [[#thm-flux]] 的证明中，磁通量子是 $h/\abs q$，其中 $q$ 是携带宏观波函数者的电荷。实验中的因子 $2$ 是载流子为对的直接证据，正如 BCS 理论所提议的。自旋只间接进入：对是由自旋相反的两个电子结成的。
:::
:::

### 高温超导体

昂内斯之后七十五年间，$T_c$ 纪录缓慢上爬，1973 年在 $\mathrm{Nb_3Ge}$ 中达到 $23\,\mathrm K$。1986 年，IBM 苏黎世研究实验室的格奥尔格·贝德诺尔茨（Georg Bednorz）与阿列克斯·缪勒（Alex Müller）在一种镧–钡–铜氧化物中发现约 $35\,\mathrm K$ 的超导——那是一种常温下导电很差的陶瓷。不到一年，朱经武（Paul Chu）、吴茂昆（Maw-Kuen Wu）与合作者发现 $\mathrm{YBa_2Cu_3O_7}$ 在 $93\,\mathrm K$ 超导，高于液氮沸点；1993 年一种汞基铜氧化物在常压下达到 $133\,\mathrm K$。**铜氧化物**超导体（cuprates）共有铜与氧构成的层，对在其中形成；其母体化合物是反铁磁的莫特（Mott）绝缘体，掺入空穴后出现超导，而且能隙具有 $d$ 波对称性——沿某些方向为零——而不是 BCS 那种均匀的 $s$ 波能隙。仅靠声子无法解释如此高的转变温度；四十年来尽管工作浩繁，机理仍是物理学的核心悬案。其后又出现了其他家族：二硼化镁，常规声子超导体，$39\,\mathrm K$（2001）；铁基超导体（2008）；以及富氢化合物如 $\mathrm H_3\mathrm S$（$203\,\mathrm K$，2015）与 $\mathrm{LaH_{10}}$（约 $250\,\mathrm K$，2019），它们只在超过一百万个大气压下超导。

::: history 磁体与超导体
皮埃尔·居里的顺磁定律出自 1895 年，保罗·朗之万（Paul Langevin）的抗磁与顺磁理论出自 1905 年，皮埃尔·外斯的分子场出自 1907 年。维尔纳·海森堡（Werner Heisenberg）在 1928 年用交换解释了分子场，路易·奈耳在 1936 年预言了反铁磁性——这一预言在 1949 年由克利福德·肖尔（Clifford Shull）对 $\mathrm{MnO}$ 的中子衍射证实。海克·卡末林·昂内斯于 1911 年 4 月 8 日在莱顿发现超导，并获 1913 年诺贝尔奖。瓦尔特·迈斯纳与罗伯特·奥克森费尔特在 1933 年发现磁通排出，弗里茨与海因茨·伦敦在 1935 年写下了他们的方程。维塔利·金兹堡（Vitaly Ginzburg）与列夫·朗道（Lev Landau）在 1950 年给出唯象理论，阿列克谢·阿布里科索夫（Alexei Abrikosov）在 1957 年预言第 II 类超导体中的涡旋格子；同年巴丁、库珀与施里弗发表了微观理论（1972 年诺贝尔奖）。布赖恩·约瑟夫森 1962 年的预言在一年之内得到菲利普·安德森（Philip Anderson）与约翰·罗威尔（John Rowell）的证实。格奥尔格·贝德诺尔茨与阿列克斯·缪勒 1986 年的发现为他们赢得了次年的诺贝尔奖，是物理学奖史上最快的授奖之一。
:::

## 后续内容 {#leads}

磁性与超导是通往关联与集体态物理的大门，是这门学科的前沿。自旋波——铁磁体的低能激发——量子化为**磁振子**，即 [[condensed-matter/lattice-vibrations]] 的声子的磁学类比。序参量与对称性破缺的普遍框架——磁化强度与超导波函数是本文的两个实例——即 [[statistical-mechanics/phase-transitions]]；超导体中破缺的对称是复场的相位，同一套数学搬到粒子物理，就给出 [[particles/standard-model]] 中讨论的希格斯（Higgs）机制。超导磁体、SQUID 与量子比特是它的工程一面。要看全貌，接下来的书是 Kittel 的磁性与超导各章、布隆德尔（Blundell）的 *Magnetism in Condensed Matter* 与廷卡姆（Tinkham）的 *Introduction to Superconductivity*。

::: summary
- 经典电荷不能被磁化（玻尔–范勒文）；一切磁性都是量子效应。满壳层给出弱抗磁性 $\chi\sim-10^{-5}$。
- 独立磁矩给出居里定律 $\chi = C/T$，自旋 $\frac12$ 时 $C = \mu_0n\mu_B^2/k_B$；传导电子只给出微小而恒定的泡利磁化率。
- 铁磁性源于交换，一种自旋依赖的库仑能 $-J\mathbf S_i\cdot\mathbf S_j$，而不是偶极力——后者弱了一千倍。
- 平均场理论给出 $m = \tanh(T_cm/T)$，$k_BT_c = zJ/4$（自旋 $\frac12$）以下有自发有序，之上有居里–外斯定律 $\chi = C/(T - T_c)$。
- 超导体电阻为零并排出磁场（迈斯纳）；伦敦方程把场约束在深度 $\lambda_L = \sqrt{m/\mu_0n_se^2}$ 内，为几十纳米。
- BCS：电子经声子结成库珀对，能隙 $\Delta(0) = 1.764\,k_BT_c$；环中磁通以 $h/2e$ 为单位量子化，约瑟夫森结以 $2e/h$ 把电压转换成频率。
- 铜氧化物超导体在常压下达到 $133\,\mathrm K$；其机理仍未解决。
:::

## 习题 {#exercises}

::: exercise 钆 {level=1 check="7.94"}
$\mathrm{Gd^{3+}}$ 离子有 $S = \frac72$、$L = 0$，故 $J = \frac72$、$g = 2$。求其有效玻尔磁子数 $p = g\sqrt{J(J+1)}$。
::: solution
$J(J+1) = \frac72\cdot\frac92 = \frac{63}{4}$，故 $p = 2\sqrt{63/4} = \sqrt{63} = 7.94$。钆盐的实测居里常数给出 $p\approx8.0$，符合甚好，因为 $L = 0$ 时没有轨道磁矩可供晶体场淬灭。半满壳层是顺磁离子理论最干净的检验。
:::
:::

::: exercise 液氦温度下的盐 {level=1 check="0.0108"}
用 [[#ex-curie-salt]] 的居里常数 $C = 0.0432\,\mathrm K$，求硫酸铜在 $4.0\,\mathrm K$ 的磁化率。
::: solution
$\chi = C/T = 0.0432/4.0 = 0.0108$。它仍然足够小，线性规律在不太大的场下成立：$4\,\mathrm K$ 下条件 $\mu_BB\ll k_BT$ 即 $B\ll k_BT/\mu_B = 6\,\mathrm T$。
:::
:::

::: exercise 约瑟夫森常数 {level=1 check="483.6"}
求偏压 $1.000\,\mathrm{mV}$ 的结上的交流约瑟夫森频率，以 GHz 为单位。
::: solution
$f = 2eV/h = (2\times1.602177\times10^{-19}/6.626070\times10^{-34})\times10^{-3}\,\mathrm{Hz} = 4.836\times10^{11}\,\mathrm{Hz} = 483.6\,\mathrm{GHz}$。一毫伏对应亚毫米波段的频率，这就是约瑟夫森结被用作射电天文探测器与混频器的原因。
:::
:::

::: exercise 外斯场 {level=2 check="1553"}
对 $T_c = 1043\,\mathrm K$ 的铁，计算 $k_BT_c/\mu_B$，以特斯拉为单位，保留四位有效数字。
::: solution
$k_BT_c/\mu_B = (1.380649\times10^{-23}\times1043)/(9.2740101\times10^{-24})\,\mathrm T = 1.4400\times10^{-20}/9.2740\times10^{-24}\,\mathrm T = 1553\,\mathrm T$。如 [[#ex-weiss-field]] 所示，它远超近邻偶极所能产生的任何场；铁的饱和磁化强度给出 $\mu_0M_s\approx2.2\,\mathrm T$。分子场只是交换能的记账工具。
:::
:::

::: exercise BCS 能隙 {level=2 check="1.41"}
用 BCS 关系求铌（$T_c = 9.25\,\mathrm K$）的 $\Delta(0)$，以 meV 为单位。
::: solution
$\Delta(0) = 1.764\,k_BT_c = 1.764\times(8.6173\times10^{-5}\times9.25)\,\mathrm{eV} = 1.764\times0.7971\,\mathrm{meV} = 1.41\,\mathrm{meV}$，如 [[#ex-bcs-gap]]。铌的能隙是各元素中最大的，加速器的超导射频腔因此用铌制造并在约 $2\,\mathrm K$ 下运行——那里热拆散的对密度 $\propto e^{-\Delta/k_BT}$ 微乎其微。
:::
:::

::: exercise 铅的临界场 {level=2 check="0.0529"}
铅 $T_c = 7.19\,\mathrm K$、$B_c(0) = 0.0803\,\mathrm T$。用 $B_c(T) = B_c(0)[1 - (T/T_c)^2]$ 求 $4.2\,\mathrm K$ 下的 $B_c$，以特斯拉为单位。
::: solution
$(T/T_c)^2 = (4.2/7.19)^2 = 0.3412$，故 $B_c = 0.0803\times0.6588\,\mathrm T = 0.0529\,\mathrm T$。液氦温度下的铅线在约 $53\,\mathrm{mT}$ 的场中失去超导——其中还应算上自身电流产生的场——这限制了第 I 类导线能承载的电流。这就是超导磁体使用第 II 类材料的原因。
:::
:::

::: exercise 锡的穿透深度 {level=2 check="13.8"}
锡每原子四个传导电子，密度 $7.29\,\mathrm{g/cm^3}$，摩尔质量 $118.71\,\mathrm{g/mol}$。设它们全部超导，求 $\lambda_L$，以纳米为单位。
::: solution
$n_s = 4\times7290\times6.02214\times10^{23}/0.11871 = 1.479\times10^{29}\,\mathrm{m^{-3}}$。由 [[#eq-lambda]]，$\lambda_L = \sqrt{m/(\mu_0n_se^2)} = 1.38\times10^{-8}\,\mathrm m = 13.8\,\mathrm{nm}$。实测值约 $34\,\mathrm{nm}$。自由电子的 $n_s$ 与质量只是估计；而且锡的相干长度超过 $\lambda_L$，电流与场之间的定域伦敦关系并不准确；皮帕德（Pippard）的非定域推广说明了这一差异。
:::
:::

::: exercise 居里点稍下方的磁化强度 {level=3 check="sqrt(3)"}
由零场平均场方程 $m = \tanh(m/t)$，$t = T/T_c$ 证明：$t$ 略低于 $1$ 时 $m\approx A\sqrt{1 - t}$，并求 $A$。
::: hint
用 $\tanh y\approx y - y^3/3$，只保留 $1 - t$ 的最低阶。
:::
::: solution
$m$ 小时，$m = m/t - m^3/(3t^3) + \dots$。除以 $m\neq0$：$1 = 1/t - m^2/(3t^3)$，故

$$
m^2 = 3t^3\Bigl(\frac1t - 1\Bigr) = 3t^2(1 - t).
$$

$t = 1$ 附近 $t^2\approx1$，故 $m\approx\sqrt3\sqrt{1 - t}$，$A = \sqrt3\approx1.732$。指数 $\frac12$ 是 $\beta$ 的平均场值；真实的三维磁体 $\beta\approx0.33$–$0.37$，如 [[#thm-mean-field]] 一节末尾所述。
:::
:::

::: exercise 超导平板中的磁场 {level=3}
超导平板占据 $-d/2 < x < d/2$，外部有均匀外场 $B_0\hat{\mathbf z}$。解 [[#eq-lambda]] 求 $B(x)$，并求 $d\gg\lambda_L$ 与 $d\ll\lambda_L$ 两种情形内部的平均场。
::: solution
$\mathbf B = B(x)\hat{\mathbf z}$ 时 $B'' = B/\lambda_L^2$，由对称性 $B$ 是 $x$ 的偶函数，故 $B = c\cosh(x/\lambda_L)$。由 $B(\pm d/2) = B_0$ 定出 $B(x) = B_0\cosh(x/\lambda_L)/\cosh(d/2\lambda_L)$，即第三幅图中的曲线。平均值为

$$
\bar B = \frac{1}{d}\int_{-d/2}^{d/2}B\,\dd x = B_0\frac{2\lambda_L}{d}\tanh\frac{d}{2\lambda_L}.
$$

$d\gg\lambda_L$ 时 $\tanh\to1$，$\bar B\approx2\lambda_LB_0/d\ll B_0$：除两个深度 $\lambda_L$ 的薄层外，场都被排出。$d\ll\lambda_L$ 时 $\tanh y\approx y - y^3/3$ 给出 $\bar B\approx B_0\bigl(1 - d^2/12\lambda_L^2\bigr)\approx B_0$：场几乎完全穿透。因此薄膜的临界场远高于块材样品，因为它们排出很少的场，也很少付出磁能。
:::
:::

::: exercise 一般自旋的居里–外斯定律 {level=3}
自旋 $S$、$g = 2$ 的磁矩，单离子的居里定律为 $M = n\,(4\mu_B^2S(S+1)/3k_BT)\,B$。设磁矩感受到分子场 $B + \lambda\mu_0M$。证明 $\chi = C/(T - \theta)$，其中 $\theta = \lambda C$，$C$ 为单离子居里常数。
::: solution
把单离子定律写成 $\mu_0M = (C/T)B_\mathrm{eff}$，其中 $C = \mu_0n\cdot4\mu_B^2S(S+1)/(3k_B)$。代入 $B_\mathrm{eff} = B + \lambda\mu_0M$，

$$
\mu_0M = \frac CT\bigl(B + \lambda\mu_0M\bigr) \quad\Longrightarrow\quad \mu_0M\Bigl(1 - \frac{\lambda C}{T}\Bigr) = \frac CTB \quad\Longrightarrow\quad \mu_0M = \frac{C}{T - \lambda C}B.
$$

于是 $\chi = \mu_0M/B = C/(T - \theta)$，$\theta = \lambda C$。磁化率在 $T = \theta$ 发散：无穷小的场产生有限的磁化，自发有序开始——平均场理论中 $T_c = \theta$。交换只通过 $\lambda$ 进入；与自旋 $\frac12$ 的 [[#thm-mean-field]] 比较得 $\lambda C = zJ/4k_B$。
:::
:::
