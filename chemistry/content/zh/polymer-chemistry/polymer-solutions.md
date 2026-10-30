把一粒聚苯乙烯颗粒扔进甲苯里。一块糖在水中几分钟内就从表面向里溶解殆尽。这粒颗粒做的事却不同：它先溶胀——溶剂渗进去，颗粒变成体积为原来数倍的软橡胶状凝胶。好几个小时之后，凝胶表面才松解成黏稠的溶液。这溶液也很不寻常：仅仅 2%（质量）的聚苯乙烯就能把甲苯变得像糖浆一样稠；而在稀溶液中，每一条链（假如你能看见它）都是一个松散、不断涨落的线团，占据的体积比它自身全部原子的体积大数千倍。把这份溶液与同一溶剂中聚甲基丙烯酸甲酯的溶液混合，混合物会变浑浊，因为两种聚合物彼此分离。两种聚合物几乎从不互溶，即使它们各自都乐于溶在同一溶剂里。

这些现象来自聚合物分子的巨大尺寸与柔性。本章分两部分。第一部分处理*单条链*：它的构象如何计数，它的尺寸为什么随链长按平方根增长（无规行走），以及良溶剂中的真实线团为什么膨胀得超过该尺寸。第一部分以一个对[[polymer-chemistry/polymer-properties]]很重要的结论收尾：链的弹性是*熵性*的。第二部分处理*溶液与混合物*。我们推导 Flory–Huggins 理论，它解释长链的混合熵为什么微乎其微、相互作用参数 $\chi$、链表现为理想行为的 θ 条件、相分离及其临界点，以及聚合物共混物为什么分相。这些思想就是把[[thermodynamics/mixtures]]的混合物热力学搬用到一千个单元长的分子上。它们是[[polymer-chemistry/polymer-characterisation]]各种表征方法的基础。

## 链的尺寸

一条含 $10^{4}$ 个碳原子的聚乙烯链，若完全伸展成平面锯齿形，长度超过 1 微米。但在溶液或熔体中它完全不是这副样子。每个 C–C 键都可以取*反*式或两个*邻*位交叉式之一，三者能量差只有每摩尔几焦耳，所以热运动不停地在它们之间切换。因此一条有 $10^{4}$ 个键的链拥有天文数字般的构象。其中几乎全都是紧缩、卷曲的线团，完全伸展的锯齿形只是其中一个。我们所能描述的是线团的*平均*尺寸。自然的度量是均方末端距与回转半径。

::: definition 末端距与回转半径 {#def-chain-size}
对一条有 $n$ 个键、键矢量为 $\mathbf{l}_1, \dots, \mathbf{l}_n$ 的链，**末端矢量**为 $\mathbf{R} = \sum_{i=1}^n\mathbf{l}_i$，其**均方末端距** $\langle R^2\rangle$ 是 $\mathbf{R}\cdot\mathbf{R}$ 对所有构象的平均。**回转半径** $R_\mathrm{g}$ 是链的各链段到其质心距离的均方根，$R_\mathrm{g}^2 = \frac{1}{n+1}\sum_i\langle(\mathbf{r}_i - \mathbf{r}_\mathrm{cm})^2\rangle$。它对任何拓扑结构（环状、星形、支化链）都有定义，散射实验测的正是它。

**轮廓长度** $R_\text{max}$ 是完全伸展链的末端距。对键长为 $l$、键角为 $\theta_\mathrm{b}$ 的碳主链，$R_\text{max} = nl\sin(\theta_\mathrm{b}/2)$。
:::

::: proposition 无规行走链 {#prop-random-walk}
1. 对**自由连接链**——$n$ 个长度为 $l$ 的键，每个键的取向都与其他所有键无关——
$$
\langle R^2\rangle = nl^2 .
$$ {#eq-fjc}
2. 对**自由旋转链**——键角 $\theta_\mathrm{b}$ 固定，但每个键可自由旋转——当 $n$ 很大时，
$$
\langle R^2\rangle = nl^2\,\frac{1 - \cos\theta_\mathrm{b}}{1 + \cos\theta_\mathrm{b}} ,
$$ {#eq-frc}
对四面体键角（$\cos\theta_\mathrm{b} = -\tfrac13$）此值为 $2nl^2$。
3. 对任何理想链（键之间只存在短程关联的链），$\langle R^2\rangle \propto n$；当 $n$ 很大时，线型链的回转半径为 $R_\mathrm{g}^2 = \langle R^2\rangle/6$。
:::

::: proof
(1) 展开平方：
$$
\langle R^2\rangle = \left\langle\sum_i\mathbf{l}_i\cdot\sum_j\mathbf{l}_j\right\rangle = \sum_i\langle\mathbf{l}_i^2\rangle + \sum_{i\ne j}\langle\mathbf{l}_i\cdot\mathbf{l}_j\rangle = nl^2 + 0 .
$$
交叉项为零，因为不同键的取向彼此独立且各自均匀分布，故 $\langle\mathbf{l}_i\cdot\mathbf{l}_j\rangle = \langle\mathbf{l}_i\rangle\cdot\langle\mathbf{l}_j\rangle = 0$。

(2) 键角固定时，每个键与前一个键成 $\pi - \theta_\mathrm{b}$ 角。记 $\alpha = -\cos\theta_\mathrm{b} = \cos(\pi - \theta_\mathrm{b})$。对自由旋转取平均，$\mathbf{l}_{i+1}$ 沿 $\mathbf{l}_i$ 方向的分量为 $l\alpha$，垂直分量的平均为零，故 $\langle\mathbf{l}_i\cdot\mathbf{l}_{i+1}\rangle = l^2\alpha$。重复这一论证，方向记忆按几何级数衰减：$\langle\mathbf{l}_i\cdot\mathbf{l}_{i+k}\rangle = l^2\alpha^k$。于是
$$
\langle R^2\rangle = nl^2 + 2\sum_{i<j}l^2\alpha^{j-i} \approx nl^2\left(1 + 2\sum_{k=1}^\infty\alpha^k\right) = nl^2\left(1 + \frac{2\alpha}{1-\alpha}\right) = nl^2\,\frac{1+\alpha}{1-\alpha},
$$
忽略相对量级为 $1/n$ 的端基效应。代入 $\alpha = -\cos\theta_\mathrm{b}$ 即得[[#eq-frc]]。对 $\theta_\mathrm{b} = 109.5^\circ$，$\alpha = \tfrac13$，因子为 $(4/3)/(2/3) = 2$。

(3) 只要 $\langle\mathbf{l}_i\cdot\mathbf{l}_{i+k}\rangle$ 衰减得足够快使 $\sum_k$ 收敛，同样的计算就给出 $\langle R^2\rangle = C\,nl^2$，$C$ 为常数。至于回转半径，标准计算对无规行走所有链段对之间距离的平方取平均，自由连接链的 $\langle r_{ij}^2\rangle = |i-j|\,l^2$。由 $R_\mathrm{g}^2 = \frac{1}{(n+1)^2}\sum_{i<j}\langle r_{ij}^2\rangle$，并在 $n$ 很大时把双重和换成积分，即得 $R_\mathrm{g}^2 = \frac{l^2}{n^2}\int_0^n\!\int_0^j(j-i)\,\mathrm{d}i\,\mathrm{d}j = \frac{l^2}{n^2}\cdot\frac{n^3}{6} = \frac{nl^2}{6}$。$\blacksquare$
:::

真实链存在受阻内旋转以及*反*式对*邻*式交叉的偏好，使它们进一步变刚。这些都局域于键的尺度，其效果打包进一个数中。

::: definition 特征比与库恩长度 {#def-kuhn}
理想链的**特征比**为
$$
C_\infty = \lim_{n\to\infty}\frac{\langle R^2\rangle_0}{nl^2},
$$
其中下标 $0$ 表示无扰（理想）尺寸。**库恩长度** $b$ 是具有相同轮廓长度和相同 $\langle R^2\rangle_0$ 的*等价自由连接链*的键长：$N_\mathrm{K}b = R_\text{max}$ 且 $N_\mathrm{K}b^2 = \langle R^2\rangle_0$，故 $b = \langle R^2\rangle_0/R_\text{max}$。代表性数值：聚乙烯 $C_\infty \approx 6.7$，无规聚苯乙烯约 $9$–$10$，PMMA 约 $8$–$9$。
:::

库恩长度把聚合物的*刚性*浓缩成一个数。它是链"忘记"自己方向的长度。聚乙烯的 $b \approx 1.3\ \mathrm{nm}$，约十个 C–C 键。像 DNA 这样的刚性链库恩长度约 $100\ \mathrm{nm}$，因为碱基堆积把主链撑直。上面的概念原样适用：在远大于 $b$ 的尺度上，任何柔性聚合物都是无规行走。

::: example 一条聚乙烯分子有多大？ {#ex-pe-size}
一条聚乙烯链 $M = 1.40\times10^{5}\ \mathrm{g\,mol^{-1}}$（即[[polymer-chemistry/polymer-structure#ex-dp]]的那条链）。取 $l = 0.154\ \mathrm{nm}$、$\theta_\mathrm{b} = 109.5^\circ$、$C_\infty = 6.7$。求主链键数、轮廓长度、理想条件下的均方根末端距、$R_\mathrm{g}$、库恩长度与库恩链段数，并与自由连接和自由旋转的估计值比较。
::: solution
链的主链键数为 $2\times(1.40\times10^{5}/28.05) = 9.98\times10^{3}$。轮廓长度：
$$
R_\text{max} = nl\sin(54.75^\circ) = (9.98\times10^{3})(0.154\ \mathrm{nm})(0.8166) = 1.26\times10^{3}\ \mathrm{nm} = 1.26\ \mu\mathrm{m} .
$$
理想线团尺寸：
$$
\langle R^2\rangle_0^{1/2} = (C_\infty n)^{1/2}l = (6.7\times9.98\times10^{3})^{1/2}(0.154) = 40\ \mathrm{nm},
\qquad R_\mathrm{g} = 40/\sqrt6 = 16\ \mathrm{nm} .
$$
自由连接的估计为 $\sqrt{n}\,l = 15\ \mathrm{nm}$，自由旋转的为 $\sqrt{2n}\,l = 22\ \mathrm{nm}$。受阻内旋转与*反*式偏好又把真实线团进一步撑大到 $40\ \mathrm{nm}$。库恩长度为 $b = \langle R^2\rangle_0/R_\text{max} = 1586/1255 = 1.26\ \mathrm{nm}$，$N_\mathrm{K} = R_\text{max}/b \approx 990$ 个库恩链段。线团的末端距只有其轮廓长度的约 3%。粗略核对一下体积：半径为 $R_\mathrm{g}$ 的球体积约 $1.8\times10^{4}\ \mathrm{nm^3}$，而链自身的体积按每个 $\mathrm{CH_2CH_2}$ 单元 $0.055\ \mathrm{nm^3}$（$M_0/\rho N_\mathrm{A}$，熔体密度取 $0.85\ \mathrm{g\,cm^{-3}}$）乘以 $5.0\times10^{3}$ 个单元，约 $270\ \mathrm{nm^3}$。线团约 1.5% 是聚合物、98.5% 是溶剂——在熔体里则是其他链。
:::
:::

### 高斯链与熵弹性

长无规行走的末端矢量是许多独立小步之和，所以由中心极限定理，其分布是**高斯**的：
$$
P(\mathbf{R})\,\mathrm{d}^3R = \left(\frac{3}{2\pi\langle R^2\rangle_0}\right)^{3/2}\exp\!\left(-\frac{3R^2}{2\langle R^2\rangle_0}\right)\mathrm{d}^3R .
$$ {#eq-gaussian}
给定 $\mathbf{R}$ 的构象数正比于 $P(\mathbf{R})$，所以由玻尔兹曼的 $S = k_\mathrm{B}\ln\Omega$，被固定在伸展状态 $\mathbf{R}$ 的链的**构象熵**为
$$
S(\mathbf{R}) = S_0 - \frac{3k_\mathrm{B}R^2}{2\langle R^2\rangle_0},
\qquad
\mathbf{f} = -T\frac{\partial S}{\partial\mathbf{R}} = \frac{3k_\mathrm{B}T}{\langle R^2\rangle_0}\mathbf{R} .
$$ {#eq-entropic-spring}
两端被拉开的链可用的构象变少，于是它以弹性回复力抵抗，力正比于伸长量和*温度*。它是一根刚度完全来自熵的胡克弹簧。这正是橡胶弹性（[[polymer-chemistry/polymer-properties]]）的根源，也是"拉长的橡皮筋一受热就收缩"这一奇怪事实的根源。

::: widget plot
f: 4*pi*x^2*(3/(2*pi))^1.5*exp(-1.5*x^2); 4*pi*x^2*(3/(2*pi*a))^1.5*exp(-1.5*x^2/a)
x: 0, 3
sliders: a=1.44:1:3:0.01
labels: \text{理想线团}; \text{溶胀线团}\ \langle R^2\rangle = a\langle R^2\rangle_0
caption: 末端距 $R$ 的概率密度 $4\pi R^2P(R)$，由[[#eq-gaussian]]给出，$R$ 以无扰均方根尺寸 $\langle R^2\rangle_0^{1/2}$ 为单位。最可及末端距为均方根值的 $\sqrt{2/3} = 0.82$ 倍：线团几乎从不完全伸展，也几乎从不蜷到两端相碰。第二条曲线是被良溶剂溶胀至 $\langle R^2\rangle = a\langle R^2\rangle_0$ 的线团（滑块；$a = 1.44$ 表示膨胀因子 1.2），为简单起见仍按高斯处理。排除体积把整个分布向外推移。第一条曲线的对数就是[[#eq-entropic-spring]]背后的构象熵。
:::

## 真实链：排除体积与 θ 条件

无规行走有一个非物理的特征：它可以自交。真实的链段占有空间，两个链段不能处在同一位置。这一**排除体积**沿链是长程相互作用，因为序列上相隔很远的链段能在空间里相撞，它使线团溶胀。其强弱取决于溶剂。在**良溶剂**中，链段之间不如链段与溶剂分子之间相得，排除体积为正，线团膨胀。在**不良溶剂**中，链段彼此吸引，线团收缩，最终塌缩或沉淀。两者之间是 **θ 条件**：吸引恰好抵消硬核排斥，链表现为理想的无规行走。

::: proposition Flory 对溶胀线团的估计 {#prop-flory-exponent}
在良溶剂中，$N$ 个长度为 $b$ 的链段构成的长链，其尺寸按
$$
R \propto N^{\nu}b,\qquad \nu = \tfrac35 \quad(\text{Flory}),
$$ {#eq-flory-nu}
标度，而理想链 $\nu = \tfrac12$。（重正化群计算与模拟给出 $\nu = 0.588$，与 Flory 的估计极为接近。）
:::

::: proof
Flory 的论证平衡尺寸为 $R$ 的线团自由能中的两项贡献。**弹性**项是把高斯链拉伸到尺寸 $R$ 的熵代价，来自[[#eq-entropic-spring]]：$F_\text{el}/k_\mathrm{B}T \approx R^2/(Nb^2)$。**排除体积**项是链段之间的排斥。$N$ 个链段处于体积 $R^3$ 中，链段浓度为 $N/R^3$，链段–链段接触数约为 $N\cdot(N/R^3)\cdot v$，$v$ 是每对链段的排除体积，故 $F_\text{ev}/k_\mathrm{B}T \approx vN^2/R^3$。对 $R$ 极小化 $F = F_\text{el} + F_\text{ev}$：
$$
\frac{2R}{Nb^2} - \frac{3vN^2}{R^4} = 0
\qquad\Longrightarrow\qquad
R^5 \approx \tfrac32vb^2N^3,\qquad R \propto v^{1/5}b^{2/5}N^{3/5} .
$$
在 θ 条件下 $v = 0$，排除体积项消失，线团回到理想行为 $R \propto N^{1/2}$。这一论证出名地比它理应得到的更好：两项都被高估了，误差几乎相互抵消。$\blacksquare$
:::

溶胀通常用**溶胀因子**（扩张因子）$\alpha_R = (\langle R^2\rangle/\langle R^2\rangle_0)^{1/2}$ 表示。由[[#eq-flory-nu]]，它随链长增长缓慢但没有上限：$\alpha_R \propto N^{\nu - 1/2} = N^{0.088}$。室温下聚苯乙烯在甲苯中，典型摩尔质量的 $\alpha_R$ 约为 $1.2$–$1.5$。

## Flory–Huggins 理论

要理解聚合物为什么溶解得慢、它们的溶液为什么如此强烈地偏离拉乌尔定律、两种聚合物为什么很少互溶，我们需要混合自由能。这一模型由 Flory 与 Huggins 在 1941–42 年各自独立提出，把溶剂分子与聚合物链段放在晶格上。

::: definition Flory–Huggins 晶格模型与 χ 参数 {#def-flory-huggins}
$n_0$ 个格位构成的晶格，装入 $n_1$ 个溶剂分子（每个占一格）与 $n_2$ 条各含 $N$ 个链段的聚合物链（每个链段占一格），于是 $n_0 = n_1 + Nn_2$。**体积分数**为 $\phi_1 = n_1/n_0$ 与 $\phi_2 = Nn_2/n_0$。每个格位有 $z$ 个近邻。相互作用由无量纲的 **Flory–Huggins 参数**描述
$$
\chi = \frac{z}{k_\mathrm{B}T}\left[w_{12} - \tfrac12(w_{11} + w_{22})\right],
$$
其中 $w_{ij}$ 是 $i$–$j$ 接触的能量。$\chi > 0$ 表示异类接触不利。实际上 $\chi$ 被当作经验参数处理，通常写成 $\chi = A + B/T$，$A$ 为熵性部分。
:::

::: proposition Flory–Huggins 混合自由能 {#prop-flory-huggins}
在晶格模型中取随机（平均场）混合，每个格位的混合吉布斯能为
$$
\frac{\Delta_\text{mix}G}{n_0k_\mathrm{B}T} = \phi_1\ln\phi_1 + \frac{\phi_2}{N}\ln\phi_2 + \chi\phi_1\phi_2 .
$$ {#eq-fh}
对小分子混合物（$N = 1$）这就是正规溶液的结果。溶剂的化学势为
$$
\frac{\mu_1 - \mu_1^\ast}{RT} = \ln(1 - \phi_2) + \left(1 - \frac{1}{N}\right)\phi_2 + \chi\phi_2^2 .
$$ {#eq-fh-mu}
:::

::: proof
**熵。**把链一个一个放到空晶格上。若已放置 $j$ 条链，第 $j+1$ 条链的第一个链段有 $n_0 - Nj$ 个空格可放。随后的每个链段必须放在相邻格位上；在平均场近似下（把晶格看作均匀填到分数 $Nj/n_0$），对第二个链段约有 $z(1 - Nj/n_0)$ 个空格可放，对以后每个链段则有 $(z-1)(1 - Nj/n_0)$ 个。把这些数目相乘，对 $j$ 的乘积用 Stirling 近似，剩余格位填入溶剂（只有一种方式），再减去纯聚合物（完美有序）与纯溶剂的熵，即得 Flory 的结果
$$
\Delta_\text{mix}S = -k_\mathrm{B}\left(n_1\ln\phi_1 + n_2\ln\phi_2\right) .
$$
这就是把*体积*分数取代摩尔分数的理想混合熵。关键的物理在于：一条链只算**一个**分子（$\ln\phi_2$ 前面的 $n_2$），无论它占据多少格位。

**焓。**随机混合下，每个聚合物链段平均有 $z\phi_1$ 个溶剂近邻。1–2 接触数为 $zNn_2\phi_1 = zn_0\phi_1\phi_2$。每个这样的接触由断开半个 1–1 接触和半个 2–2 接触形成，能量改变 $w_{12} - \frac12(w_{11} + w_{22})$，故 $\Delta_\text{mix}H = n_0\phi_1\phi_2\,k_\mathrm{B}T\chi$（忽略体积变化）。

**合并。**$\Delta_\text{mix}G = \Delta_\text{mix}H - T\Delta_\text{mix}S$。除以 $n_0k_\mathrm{B}T$，并用 $n_1/n_0 = \phi_1$ 与 $n_2/n_0 = \phi_2/N$，即得[[#eq-fh]]。化学势为 $\mu_1 - \mu_1^\ast = \partial\Delta_\text{mix}G/\partial n_1$（固定 $n_2$）。执行求导，利用 $\partial\phi_1/\partial n_1 = \phi_2/n_0$ 与 $\partial\phi_2/\partial n_1 = -\phi_2/n_0$，再乘以 $N_\mathrm{A}$，即得[[#eq-fh-mu]]。$\blacksquare$
:::

聚合物项上的因子 $1/N$ 是理论的核心结果。对小分子（$N = 1$）熵项是熟悉的 $\phi\ln\phi$。对 $N = 1000$ 的聚合物，每个链段的该项小一千倍，因为放置一千个连在一起的链段所用的独立选择远少于放置一千个自由分子。聚合物混合几乎不获得熵，所以焓项 $\chi\phi_1\phi_2$ 即使 $\chi$ 只是略正也轻松取胜。这就是聚合物溶解性如此挑剔、共混物总要分相的原因。

::: example 聚合物溶液的混合自由能 {#ex-fh}
某一溶液在 $\chi = 0.40$ 的溶剂中溶有 $N = 1000$ 个链段的聚合物，$\phi_2 = 0.10$。计算[[#eq-fh]]每个格位的三项，以及约化溶剂化学势[[#eq-fh-mu]]。把聚合物的组合熵项与 $N = 1$ 时的值比较。
::: solution
每格位：
$$
\phi_1\ln\phi_1 = 0.90\ln0.90 = -0.0948,\qquad
\frac{\phi_2}{N}\ln\phi_2 = \frac{0.10}{1000}\ln0.10 = -0.00023,\qquad
\chi\phi_1\phi_2 = 0.40\times0.09 = +0.0360 .
$$
总和 $\Delta_\text{mix}G/(n_0k_\mathrm{B}T) = -0.0591$：混合是有利的。混合熵几乎全部来自*溶剂*项。聚合物自身的组合熵项比溶剂的小 400 倍。若 $N = 1$，它将是 $0.10\ln0.10 = -0.23$，大一千倍。

溶剂化学势：
$$
\frac{\Delta\mu_1}{RT} = \ln0.90 + (0.999)(0.10) + 0.40(0.01) = -0.10536 + 0.09990 + 0.00400 = -0.00146 .
$$
对相同*摩尔*分数的理想溶液，聚合物的摩尔分数约为 $10^{-4}$，$\Delta\mu_1/RT \approx -10^{-4}$。以该尺度衡量，聚合物溶液的"非理想性"达十倍以上：体积分数熵与链的巨大尺寸占了上风。这就是聚合物溶液的渗透压与蒸气压降低不能用拉乌尔定律解释、必须借助下面的维里展开的原因。
:::
:::

### 渗透压与第二维里系数

对稀溶液展开[[#eq-fh-mu]]（$\ln(1-\phi_2) = -\phi_2 - \phi_2^2/2 - \dots$）得 $\Delta\mu_1/RT = -\phi_2/N - (\tfrac12 - \chi)\phi_2^2 - \dots$。由 $\Pi\bar{V}_1 = -\Delta\mu_1$，并把 $\phi_2$ 换算成质量浓度 $c$，即得**渗透压维里展开**：
$$
\frac{\Pi}{c} = RT\left(\frac{1}{\bar{M}_\mathrm{n}} + A_2c + A_3c^2 + \dots\right),
\qquad
A_2 = \frac{\tfrac12 - \chi}{\bar{V}_1\rho_2^2},
$$ {#eq-virial}
其中 $\bar{V}_1$ 为溶剂的摩尔体积，$\rho_2$ 为聚合物的密度。截距给出数均摩尔质量，这就是渗透压法是 $\bar{M}_\mathrm{n}$ 方法的原因（[[polymer-chemistry/polymer-characterisation]]）。斜率度量溶剂优劣：良溶剂中 $A_2 > 0$（$\chi < \tfrac12$），不良溶剂中 $A_2 < 0$，$\chi = \tfrac12$ 时 $A_2 = 0$。

::: definition θ 溶剂与 θ 温度 {#def-theta}
**θ 溶剂**是这样一种溶剂：在 **θ 温度** $\Theta$ 下第二维里系数为零（$A_2 = 0$；在 Flory–Huggins 理论中 $\chi = \tfrac12$）。在 $\Theta$ 下，链段间的排除体积排斥恰好被其净吸引抵消，于是链采取无扰的理想尺寸 $\langle R^2\rangle = \langle R^2\rangle_0$。例子有环己烷中的聚苯乙烯（$\Theta \approx 34.5\ ^\circ\mathrm{C}$）和*反*式十氢化萘中的聚苯乙烯（$\Theta \approx 20\ ^\circ\mathrm{C}$）。θ 溶剂是聚合物对真实气体玻义耳温度的类比。
:::

## 相分离

当 $\chi$ 足够大时，[[#eq-fh]]的自由能曲线出现两个极小值，组成处于两阱之间的溶液可通过分成贫聚合物相与富聚合物相来降低自由能。对随温度升高 $\chi$ 下降（$\chi = A + B/T$ 中 $B > 0$）的聚合物溶液，存在**上限临界溶解温度**（UCST），低于它就分相。一些水溶性聚合物，如聚（*N*-异丙基丙烯酰胺），具有**下限临界溶解温度**（LCST），在*升温*时分相，[[polymer-chemistry/functional-polymers]]正利用这一点。

::: proposition 聚合物溶液的临界点 {#prop-critical}
对 Flory–Huggins 自由能[[#eq-fh]]，**旋节线**（稳定性极限）为
$$
\chi_\mathrm{s}(\phi_2) = \frac12\left(\frac{1}{1 - \phi_2} + \frac{1}{N\phi_2}\right),
$$ {#eq-spinodal}
**临界点**位于
$$
\phi_{2,\mathrm{c}} = \frac{1}{1 + \sqrt{N}},
\qquad
\chi_\mathrm{c} = \frac{(1 + \sqrt{N})^2}{2N} = \frac12 + \frac{1}{\sqrt{N}} + \frac{1}{2N} .
$$ {#eq-critical}
当 $N \to \infty$ 时，$\phi_{2,\mathrm{c}} \to 0$ 且 $\chi_\mathrm{c} \to \tfrac12$：无限长链的临界温度就是 θ 温度。
:::

::: proof
记 $g(\phi) = \Delta_\text{mix}G/(n_0k_\mathrm{B}T)$，$\phi = \phi_2$。均匀混合物在曲线上凹处局部不稳定，$g''(\phi) < 0$，旋节线即 $g'' = 0$。求二阶导数：
$$
g'(\phi) = -\ln(1-\phi) - 1 + \frac{1}{N}(\ln\phi + 1) + \chi(1 - 2\phi),
\qquad
g''(\phi) = \frac{1}{1-\phi} + \frac{1}{N\phi} - 2\chi .
$$
令 $g'' = 0$ 即得[[#eq-spinodal]]。临界点是旋节线曲线的极小点，即不稳定性首次出现时的最低 $\chi$（对 UCST 体系即最高温度），此处还有 $g''' = 0$：
$$
\frac{\mathrm{d}\chi_\mathrm{s}}{\mathrm{d}\phi} = \frac12\left(\frac{1}{(1-\phi)^2} - \frac{1}{N\phi^2}\right) = 0
\qquad\Longrightarrow\qquad \sqrt{N}\,\phi = 1 - \phi,\quad \phi_\mathrm{c} = \frac{1}{1 + \sqrt N} .
$$
回代：$1/(1 - \phi_\mathrm{c}) = (1+\sqrt N)/\sqrt N$，$1/(N\phi_\mathrm{c}) = (1+\sqrt N)/N$，两者之和为 $(1+\sqrt N)(\sqrt N + 1)/N$。乘以 $\tfrac12$ 得 $\chi_\mathrm{c} = (1+\sqrt N)^2/(2N)$，展开即得第二种形式。$\blacksquare$
:::

::: widget plot
f: (1-x)*ln(1-x) + x/n*ln(x) + chi*x*(1-x)
x: 0.001, 0.6
sliders: n=100:10:1000:10; chi=0.55:0.4:0.8:0.005
labels: \Delta_\text{mix}G/(n_0k_\mathrm{B}T)
caption: 每个格位的 Flory–Huggins 混合自由能[[#eq-fh]]对聚合物体积分数 $\phi_2$ 的曲线，滑块设定链长 $N$（滑块 $n$）与相互作用参数 $\chi$。$N = 100$ 时临界值为 $\chi_\mathrm{c} = 0.605$，对应 $\phi_{2,\mathrm{c}} = 0.091$（[[#prop-critical]]）。低于它曲线处处外凸，任何组成都稳定。高于它曲线出现鼓包，作公切线即挑出两个共存相：一个几乎是纯溶剂，一个溶胀了聚合物。增大 $N$，临界点移向更低的 $\phi_2$ 并趋近 $\chi = 0.5$。曲线极不对称，极小值位于极低的聚合物分数处，这来自聚合物熵中的 $1/N$。
:::

临界点紧靠溶剂轴：$N = 10^{4}$ 时 $\phi_{2,\mathrm{c}} \approx 1\%$。因此聚合物溶液的相图极不对称。贫聚合物相几乎是纯溶剂，富聚合物相则是浓凝胶。这被用于**分级**。向聚合物溶液加入非溶剂会抬高 $\chi$，而 $\chi_\mathrm{c}$ 依赖于 $N$，于是最长的链先沉淀。Shultz 与 Flory 在 1952 年证明，环己烷中聚苯乙烯的临界温度随 $N \to \infty$ 趋近 $\Theta$，与[[#eq-critical]]的预言完全一致，这给出一种测量 $\Theta$ 的办法。

### 聚合物共混物

对长度为 $N_\mathrm{A}$ 与 $N_\mathrm{B}$ 的两种聚合物 A 与 B 的混合物，同样的晶格论证给出
$$
\frac{\Delta_\text{mix}G}{n_0k_\mathrm{B}T} = \frac{\phi_\mathrm{A}}{N_\mathrm{A}}\ln\phi_\mathrm{A} + \frac{\phi_\mathrm{B}}{N_\mathrm{B}}\ln\phi_\mathrm{B} + \chi\phi_\mathrm{A}\phi_\mathrm{B},
\qquad
\chi_\mathrm{c} = \frac12\left(\frac{1}{\sqrt{N_\mathrm{A}}} + \frac{1}{\sqrt{N_\mathrm{B}}}\right)^2 .
$$ {#eq-blend}
两种链各有 1000 个链段时，$\chi_\mathrm{c} = 0.002$。高摩尔质量下，小到 C–H 与 C–D 键之间的范德华差异，就足以把氘代聚乙烯与普通聚乙烯分开。可互溶的共混物是例外，需要某种专性的吸引（$\chi < 0$）。例子有聚苯乙烯与聚(2,6-二甲基-1,4-苯醚)——商品共混物 Noryl 的基础——以及聚氯乙烯与某些聚酯。对其余的体系，则像再生塑料那样加入嵌段共聚物之类的**相容剂**（[[polymer-chemistry/copolymerisation]]）来稳定细乳液滴。使共混物分相的链段–链段 $\chi$，正是驱动嵌段共聚物在 $\chi N \approx 10.5$ 处发生微相分离的那个 $\chi$。

## 选择溶剂

**Hildebrand 溶度参数** $\delta = (\Delta_\text{vap}U/V_\mathrm{m})^{1/2}$，内聚能密度的平方根，度量一种液体把自己"抓住"的强度。对非极性体系，正规溶液理论用溶度参数之差估算 $\chi$ 的焓性部分，再加约 $0.34$ 的经验熵性贡献：
$$
\chi \approx 0.34 + \frac{\bar{V}_1(\delta_1 - \delta_2)^2}{RT} .
$$ {#eq-hildebrand}
这是**经验**公式，只在没有氢键和强极性时才适用。Hansen 三组分参数（色散、极性、氢键）把它推广到更多样的化学体系。"相似相溶"的这一定量表述是说：当溶剂的 $\delta$ 与聚合物的 $\delta$ 相差约 $2\ \mathrm{MPa^{1/2}}$ 以内时，聚合物才能溶解。

::: example 聚苯乙烯的甲苯与环己烷之争 {#ex-solubility}
聚苯乙烯的 $\delta_2 \approx 18.6\ \mathrm{MPa^{1/2}}$。甲苯的 $\delta_1 = 18.2\ \mathrm{MPa^{1/2}}$、$\bar{V}_1 = 106.3\ \mathrm{cm^3\,mol^{-1}}$。环己烷的 $\delta_1 = 16.8\ \mathrm{MPa^{1/2}}$、$\bar{V}_1 = 108.7\ \mathrm{cm^3\,mol^{-1}}$（手册值）。估算 $25\ ^\circ\mathrm{C}$ 下各自的 $\chi$，并判断溶剂优劣。
::: solution
注意 $1\ \mathrm{MPa} = 1\ \mathrm{J\,cm^{-3}}$，故 $\bar{V}_1(\delta_1 - \delta_2)^2$ 的单位是 $\mathrm{J\,mol^{-1}}$。取 $RT = 2479\ \mathrm{J\,mol^{-1}}$：

- 甲苯：$(18.6 - 18.2)^2 = 0.16\ \mathrm{J\,cm^{-3}}$，乘以 $106.3\ \mathrm{cm^3\,mol^{-1}}$ 得 $17\ \mathrm{J\,mol^{-1}}$，$\chi \approx 0.34 + 17/2479 = 0.35$。
- 环己烷：$(18.6 - 16.8)^2 = 3.24\ \mathrm{J\,cm^{-3}}$，乘以 $108.7\ \mathrm{cm^3\,mol^{-1}}$ 得 $352\ \mathrm{J\,mol^{-1}}$，$\chi \approx 0.34 + 352/2479 = 0.48$。

甲苯（$\chi < \tfrac12$）是良溶剂。$25\ ^\circ\mathrm{C}$ 的环己烷接近 $\chi = \tfrac12$，实际还略偏向不良一边。环己烷确实是聚苯乙烯的经典 θ 溶剂，$\Theta \approx 34.5\ ^\circ\mathrm{C}$，所以在 $25\ ^\circ\mathrm{C}$ 下高摩尔质量的聚苯乙烯在其中不能完全溶解。这一估计能好到的程度就是经验规则所能允许的：它把溶剂放到了分界线的正确一侧，却无法把 $\Theta$ 定位到十度以内。
:::
:::

### 稀溶液与半稀溶液

稀溶液中的线团彼此孤立。浓度升高，线团在**重叠浓度** $c^\ast$ 处开始相互接触——此时整体浓度等于单个线团内部的聚合物浓度：
$$
c^\ast \approx \frac{3M}{4\pi N_\mathrm{A}R_\mathrm{g}^3} .
$$ {#eq-overlap}
因为 $R_\mathrm{g}^3$ 比 $M$ 长得更快（$M^{3/2}$ 或 $M^{1.76}$），$c^\ast$ 随摩尔质量*下降*，对高聚物它低于百分之一。高于 $c^\ast$ 的溶液是**半稀**的：链相互贯穿、彼此缠结，黏度与渗透压遵循 de Gennes 发展的标度律，它们通过比值 $c/c^\ast$ 依赖浓度。

::: example 线团什么时候开始重叠？ {#ex-overlap}
θ 条件中环己烷里的聚苯乙烯有 $R_\mathrm{g} = 0.0275\,M^{1/2}\ \mathrm{nm}$（$M$ 以 $\mathrm{g\,mol^{-1}}$ 计）。估算 $M = 1.0\times10^{6}\ \mathrm{g\,mol^{-1}}$ 的 $R_\mathrm{g}$ 与 $c^\ast$。
::: solution
$R_\mathrm{g} = 0.0275\times(1.0\times10^{6})^{1/2} = 27.5\ \mathrm{nm} = 2.75\times10^{-6}\ \mathrm{cm}$。于是
$$
c^\ast = \frac{3(1.0\times10^{6}\ \mathrm{g\,mol^{-1}})}{4\pi(6.022\times10^{23}\ \mathrm{mol^{-1}})(2.75\times10^{-6}\ \mathrm{cm})^3} = 0.019\ \mathrm{g\,cm^{-3}} .
$$
略低于 2%（质量）。超过它，溶液就成为相互贯穿的线团之缠结，这就是百分之几的高聚物能把溶剂变得如此黏稠的原因。在良溶剂中线团更大，$c^\ast$ 还要低。因此旨在探测孤立链的测量（光散射、特性黏数）必须在远低于 $c^\ast$ 处进行，并外推到零浓度。
:::
:::

::: warning "不溶"的聚合物与 N 的作用 {#warn-solubility}
小分子化学的两个习惯在这里害人不浅。其一是只凭重复单元的*化学*判断溶解性。一种与溶剂完全互溶的单体，其聚合物却可能不溶，因为聚合物的混合熵小了 $N$ 倍（[[#prop-flory-huggins]]）。苯乙烯与环己烷可以任何比例互溶，但长链聚苯乙烯需要 $T > \Theta$ 才能完全溶解。而且溶解度随摩尔质量*下降*，分级正是利用这一点。其二是指望结晶聚合物像非晶聚合物一样溶解。聚乙烯这样的半晶聚合物必须先熔融自己的微晶，所以即使在 $\delta$ 完美匹配的溶剂中（聚乙烯用热二甲苯或热十氢化萘）也要接近熔点的温度才能溶解。最后，交联网络在任何溶剂中都不溶解。它溶胀到一个由 $\chi$ 与交联密度决定的平衡，这本身就是测量两者的办法。
:::

::: quiz
对 $N = 10^{4}$ 个链段的聚合物，处于 $\chi$ 随温度下降而上升的溶剂中。关于降温引发相分离的起点，哪种说法正确？
- [ ] 它首先发生在 $\chi = 2$、聚合物体积分数 0.5 处，如同小分子正规溶液。
- [x] 它首先发生在 $\chi_\mathrm{c} \approx 0.51$、聚合物体积分数仅约 1% 处，因此临界温度略低于 $\Theta$。
- [ ] 它永远不会发生，因为聚合物的混合熵占主导。
- [ ] 它首先发生在 $\chi = 0$ 处，因为任何正的 $\chi$ 都使混合物不稳定。
::: solution
由[[#eq-critical]]，$\sqrt N = 100$：$\phi_{2,\mathrm{c}} = 1/101 = 0.0099$，$\chi_\mathrm{c} = 101^2/(2\times10^{4}) = 0.510$。$\chi = 2$ 的临界值属于 $N = 1$（正规溶液）。聚合物的混合熵很*小*而非占主导，这正是一个接近 $\tfrac12$ 的 $\chi$ 就足以使它分相的原因。小的正 $\chi$（$0 < \chi < \chi_\mathrm{c}$）仍给出稳定溶液，因为溶剂的混合熵压过了它。
:::
:::

::: history
Kuhn（Werner Kuhn）1934 年把无规线团链引入统计处理，同年 Guth（Eugene Guth）与 Mark（Herman Mark）用同一思想把橡胶弹性解释为熵弹性。Huggins（Maurice Huggins，*Journal of Chemical Physics* 9, 440, 1941）与 Flory（Paul Flory，*Journal of Chemical Physics* 10, 51, 1942）各自独立推导了以两人命名的聚合物溶液晶格理论。Flory 在 1949 年给出 $N^{3/5}$ 溶胀的排除体积论证。他与 Fox（Thomas Fox）和 Krigbaum（William Krigbaum）一起从实验上确立了 θ 状态，又与 Shultz（Arthur Shultz，1952）把 θ 温度与相分离联系起来。他的《Principles of Polymer Chemistry》（1953）至今仍是标准著作。de Gennes（Pierre-Gilles de Gennes）1972 年证明自避行走链是一个在数学上与磁性相关的临界现象，解释了 $\nu$ 的普适性，并在其《Scaling Concepts in Polymer Physics》（1979）中导出半稀溶液的标度理论。Le Guillou（Le Guillou）与 Zinn-Justin（Zinn-Justin）1977 年的重正化群工作给出 $\nu = 0.588$。Flory 获 1974 年诺贝尔化学奖，de Gennes 获 1991 年诺贝尔物理学奖。
:::

## 后续内容

这里发展的稀溶液性质正是主要表征方法所测的东西。[[polymer-chemistry/polymer-characterisation]]在光散射中使用 $R_\mathrm{g}$ 与 $A_2$，在渗透压法中使用维里展开，在尺寸排阻色谱与黏度法中使用流体力学尺寸。[[#eq-entropic-spring]]的熵弹簧在[[polymer-chemistry/polymer-properties]]中变成橡胶弹性，那里缠结高斯链的熔体还解释了黏弹性。水溶性聚合物的 LCST 行为、水凝胶溶胀与载药胶束出现在[[polymer-chemistry/functional-polymers]]。这里推广的正规溶液与化学势观念来自[[thermodynamics/mixtures]]。高斯链背后的中心极限定理在 Maths Atlas（[/learn/maths/](/learn/maths/)）中讲述。

::: summary
- 柔性链是无规行走。$\langle R^2\rangle = nl^2$（自由连接）或 $2nl^2$（自由旋转，四面体角），一般地 $\langle R^2\rangle_0 = C_\infty nl^2$ 且 $R_\mathrm{g}^2 = \langle R^2\rangle/6$。库恩长度 $b = \langle R^2\rangle_0/R_\text{max}$ 度量刚柔性。
- 末端矢量是高斯的，所以构象熵随 $3k_\mathrm{B}R^2/(2\langle R^2\rangle_0)$ 下降：链是一根熵弹簧，力 $\propto TR$。
- 排除体积使良溶剂中的链溶胀为 $R \propto N^{0.588}$（Flory 的估计 $3/5$）。在 θ 条件下链是理想的（$R \propto N^{1/2}$）。
- Flory–Huggins：$\Delta_\text{mix}G/(n_0k_\mathrm{B}T) = \phi_1\ln\phi_1 + (\phi_2/N)\ln\phi_2 + \chi\phi_1\phi_2$。一条链只算一个分子，其混合熵微乎其微。
- 维里展开 $\Pi/c = RT(1/\bar{M}_\mathrm{n} + A_2c + \dots)$ 中 $A_2 \propto \tfrac12 - \chi$，故 $\chi = \tfrac12$ 定义 θ 溶剂。
- 相分离始于 $\chi_\mathrm{c} = (1+\sqrt N)^2/(2N) \to \tfrac12$ 与 $\phi_\mathrm{c} = 1/(1+\sqrt N)$。共混物的 $\chi_\mathrm{c} \sim 2/N$，故绝大多数聚合物对不相容。
- 溶度参数（经验地）估算 $\chi$。线团在 $c^\ast \approx 3M/(4\pi N_\mathrm{A}R_\mathrm{g}^3)$ 以上重叠，典型值低于百分之几。
:::

## 习题

::: exercise 自由连接链 {level=1 check="15.8"}
一条自由连接链有 1000 个长度为 $0.50\ \mathrm{nm}$ 的链段。它的均方根末端距是多少？（以 nm 输入 $\langle R^2\rangle^{1/2}$，保留三位有效数字。）
::: solution
$\langle R^2\rangle^{1/2} = \sqrt{n}\,l = \sqrt{1000}\times0.50 = 15.8\ \mathrm{nm}$，而其轮廓长度为 $500\ \mathrm{nm}$。
:::
:::

::: exercise 回转半径 {level=1 check="12.2"}
一条理想线型链的 $\langle R^2\rangle^{1/2} = 30.0\ \mathrm{nm}$。它的回转半径是多少？（以 nm 输入 $R_\mathrm{g}$，保留三位有效数字。）
::: solution
$R_\mathrm{g} = \langle R^2\rangle^{1/2}/\sqrt6 = 30.0/2.449 = 12.2\ \mathrm{nm}$。
:::
:::

::: exercise 短聚合物的临界 χ {level=1 check="0.605"}
用 Flory–Huggins 理论，求 $N = 100$ 个链段的聚合物在小分子溶剂中的临界相互作用参数。（输入 $\chi_\mathrm{c}$，保留三位有效数字。）
::: solution
$\chi_\mathrm{c} = (1 + \sqrt{100})^2/(2\times100) = 121/200 = 0.605$，此时 $\phi_{2,\mathrm{c}} = 1/11 = 0.091$。
:::
:::

::: exercise 由溶度参数求 χ {level=2 check="0.482"}
用[[#eq-hildebrand]]估算聚苯乙烯（$\delta = 18.6\ \mathrm{MPa^{1/2}}$）在环己烷（$\delta = 16.8\ \mathrm{MPa^{1/2}}$，$\bar{V}_1 = 108.7\ \mathrm{cm^3\,mol^{-1}}$）中的 Flory–Huggins 参数，温度 $298.15\ \mathrm{K}$。（输入 $\chi$，保留三位有效数字。）
::: solution
$\bar{V}_1(\delta_1 - \delta_2)^2 = 108.7\times3.24 = 352.2\ \mathrm{J\,mol^{-1}}$。除以 $RT = 2478.8\ \mathrm{J\,mol^{-1}}$ 得 $0.142$，所以 $\chi = 0.34 + 0.142 = 0.482$，略低于 $\tfrac12$，与 θ 温度略高于室温一致。
:::
:::

::: exercise 两种聚合物能互溶吗？ {level=2 check="0.004"}
两种聚合物各有 $N = 500$ 个链段。用[[#eq-blend]]，它们能以任意比例互溶时 $\chi$ 的最大值是多少？（输入 $\chi_\mathrm{c}$。）
::: solution
$\chi_\mathrm{c} = \tfrac12(2/\sqrt{500})^2 = \tfrac12\times4/500 = 0.004$。化学性质不同的非极性聚合物之间典型的 $\chi$ 值为 $0.01$–$0.1$，这就是此类共混物几乎总是不相容的原因。
:::
:::

::: exercise 重叠浓度 {level=2 check="0.030"}
用 θ 条件下聚苯乙烯的 $R_\mathrm{g} = 0.0275\,M^{1/2}\ \mathrm{nm}$，估算 $M = 4.0\times10^{5}\ \mathrm{g\,mol^{-1}}$ 的重叠浓度。（以 $\mathrm{g\,cm^{-3}}$ 输入 $c^\ast$，保留两位有效数字。）
::: solution
$R_\mathrm{g} = 0.0275\times632.5 = 17.4\ \mathrm{nm} = 1.74\times10^{-6}\ \mathrm{cm}$。$c^\ast = 3(4.0\times10^{5})/[4\pi(6.022\times10^{23})(1.74\times10^{-6})^3] = 0.030\ \mathrm{g\,cm^{-3}}$。由于 θ 条件下 $c^\ast \propto M/M^{3/2} = M^{-1/2}$，比[[#ex-overlap]]中短 2.5 倍的链在 $\sqrt{2.5} = 1.58$ 倍的重叠浓度处重叠：$0.019\times1.58 = 0.030$，与计算结果一致。
:::
:::

::: exercise 推导临界点 {level=3 check="0.0099"}
由[[#eq-fh]]导出旋节线[[#eq-spinodal]]与临界点[[#eq-critical]]，并计算 $N = 10^{4}$ 时的 $\phi_{2,\mathrm{c}}$。用一两句话解释为什么临界组成随 $N$ 增大而移向溶剂一侧。（输入 $\phi_{2,\mathrm{c}}$，保留两位有效数字。）
::: hint
临界点是旋节线曲线 $\chi_\mathrm{s}(\phi)$ 的极小点。
:::
::: solution
如[[#prop-critical]]的证明：$g'' = 1/(1-\phi) + 1/(N\phi) - 2\chi = 0$ 定义旋节线，极小化 $\chi_\mathrm{s}$ 得 $\sqrt N\phi = 1 - \phi$，故 $\phi_\mathrm{c} = 1/(1+\sqrt N)$。$N = 10^{4}$ 时 $\phi_\mathrm{c} = 1/101 = 0.0099$。自由能由量级为一的溶剂熵项与被 $1/N$ 压低的聚合物熵项相加而成。两项曲率贡献 $1/(1-\phi)$ 与 $1/(N\phi)$ 只有当 $\phi$ 为 $N^{-1/2}$ 量级时才能平衡。聚合物线团在极低的体积分数下就开始"感觉"到彼此并开始相分离，该体积分数与重叠浓度相当。
:::
:::

::: exercise 溶胀随链长增长 {level=3 check="1.80"}
某聚合物在良溶剂中 $M = 1.0\times10^{5}\ \mathrm{g\,mol^{-1}}$ 时的溶胀因子为 $\alpha_R = 1.20$。用良溶剂中 $R \propto N^{0.588}$、θ 条件下 $R_0 \propto N^{0.5}$，预言 $M = 1.0\times10^{7}\ \mathrm{g\,mol^{-1}}$ 时的 $\alpha_R$，并用 Flory 的自由能论证解释溶胀为什么永不饱和。（输入 $\alpha_R$，保留三位有效数字。）
::: solution
$\alpha_R = R/R_0 \propto N^{0.588 - 0.5} = N^{0.088}$。$N$ 增大一百倍使 $\alpha_R$ 乘以 $100^{0.088} = e^{0.088\times4.605} = e^{0.405} = 1.50$，所以 $\alpha_R = 1.20\times1.50 = 1.80$。在 Flory 的论证中，排除体积能 $\sim vN^2/R^3$ 随 $N$ 的增长快于固定 $R/\sqrt N$ 时弹性回复自由能 $\sim R^2/(Nb^2)$ 的增长。平衡两者要求 $R/\sqrt N$ 持续增大，在 Flory 的版本中按 $N^{1/10}$。链越长，相距更远的链段就越能相互碰撞，排斥不存在一个使其停止起作用的特征长度。
:::
:::
