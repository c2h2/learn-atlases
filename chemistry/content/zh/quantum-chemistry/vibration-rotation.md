把红外光射向氯化氢气体，它并不平滑地吸收，而是在一排尖锐的谱线上吸收，线距为几十 $\mathrm{cm^{-1}}$，并且恰好在谱带中心该在的地方留着一道暗间隙。把气体冷却，这排谱线就收缩；用氘取代氢，整个图样按一个你能从原子质量表算出的因子整体平移。这些细节——线位、间距、强度、同位素位移——无一例外出自两个可精确求解的量子体系：**谐振子**，化学键被稍微拉伸时的样子；以及**刚性转子**，分子翻滚时的样子。本课把两者都解出来，并由此提供 [[spectroscopy/rotational-spectroscopy]] 与 [[spectroscopy/vibrational-spectroscopy]] 花大量时间去使用的量子机器：能级、选律，以及决定哪些线强、哪些线缺失的玻尔兹曼统计。

## 键作为弹簧：谐振子

在平衡核间距 $R_\mathrm{e}$ 附近，任何势能曲线到一阶都是平的，所以泰勒展开 $V(R) = V(R_\mathrm{e}) + \tfrac{1}{2}k(R - R_\mathrm{e})^{2} + \cdots$ 以二次项开头：胡克定律，力常数 $k$ 是电子能量面在阱底的曲率。于是两个质量 $m_1$、$m_2$ 的原子沿键的振动，等价于一个质量为**约化质量** $\mu = m_1 m_2/(m_1 + m_2)$ 的单粒子——与 [[quantum-chemistry/model-systems]] 中把二体势箱约化为单体的同一手法，也是光谱学家不碰电子结构就能分辨 $\mathrm{HCl}$ 与 $\mathrm{DCl}$ 的原因。

::: definition 振动谐振子 {#def-ho}
**谐振子**是势能为 $V(x) = \tfrac{1}{2}kx^{2}$ 的体系，其中 $x = R - R_\mathrm{e}$ 是相对平衡位置的位移，$k = \left(\mathrm{d}^{2}V/\mathrm{d}R^{2}\right)_\mathrm{e} > 0$ 是力常数。其经典角频率为 $\omega = \sqrt{k/\mu}$，$\mu$ 是两核的约化质量；对多原子分子，每个简正坐标带着自己的 $\omega$，下面的谐振子就是一个简正模。
:::

::: proposition 谐振子能级 {#prop-ho-levels}
谐振子的定态具有如下能量与波函数
$$
E_v = \left(v + \tfrac{1}{2}\right)\hbar\omega, \qquad
\psi_v(x) = N_v\,H_v\!\left(\frac{x}{\alpha}\right) \mathrm{e}^{-x^{2}/2\alpha^{2}}, \qquad
\alpha = \sqrt{\frac{\hbar}{\mu\omega}} ,
$$ {#eq-ho-levels}
其中 $v = 0, 1, 2, \ldots$，$H_v$ 是厄米多项式，$N_v$ 是归一化常数。能级等间距，间距为 $\hbar\omega$；最低能级*不是*零而是 $\tfrac{1}{2}\hbar\omega$——**零点能**；$\psi_v$ 有 $v$ 个节点，宇称为 $(-1)^{v}$。
:::

::: proof 求解谐振子方程 {#proof-ho}
定态薛定谔方程 $-\frac{\hbar^{2}}{2\mu}\psi'' + \tfrac{1}{2}kx^{2}\psi = E\psi$ 在 $y = x/\alpha$、$\varepsilon = 2E/\hbar\omega$ 下化为无量纲形式：$\psi''(y) + (2\varepsilon - y^{2})\psi = 0$。当 $y \to \pm\infty$，方程趋于 $\psi'' = y^{2}\psi$，其可接受的解按 $\mathrm{e}^{-y^{2}/2}$ 衰减；写 $\psi = H(y)\,\mathrm{e}^{-y^{2}/2}$，得 $H'' - 2yH' + (2\varepsilon - 1)H = 0$。设 $H = \sum_j c_j y^{j}$，得到两项递推 $c_{j+2} = \dfrac{2j + 1 - 2\varepsilon}{(j+2)(j+1)}\,c_j$。若级数不截断，则 $c_{j+2}/c_j \to 2/j$，这正是 $\mathrm{e}^{y^{2}}$ 的系数比——波函数将按 $\mathrm{e}^{+y^{2}/2}$ 发散而无法归一化。因此可归一化性*强迫*级数终止：对某个非负整数 $v$ 有 $2\varepsilon - 1 = 2v$，即 $\varepsilon = v + \tfrac{1}{2}$，亦即 $E_v = (v+\tfrac{1}{2})\hbar\omega$，而 $H$ 成为 $v$ 次厄米多项式 $H_v$。这里的量子化不是假设出来的：它是平方可积的代价。（用升降算符两行即可得到同一谱：$\hat H = \hbar\omega(\hat a^{\dagger}\hat a + \tfrac{1}{2})$，$[\hat a, \hat a^{\dagger}] = 1$。）对二次势，维里定理给出 $\langle \hat T \rangle = \langle \hat V \rangle = \tfrac{1}{2}E_v$：在零点能级上，分子保留着 $\tfrac{1}{4}\hbar\omega$ 的纯动能——它不可能静止在阱底，因为按 [[quantum-chemistry/quantum-foundations]] 的不确定性原理，把它定域在那里所付出的动能，比弹簧省下的还多。
:::

零点能不是记账上的奇谈。从最低振动能级测得的解离能为 $D_0 = D_\mathrm{e} - \tfrac{1}{2}\hbar\omega + \cdots$，所以每一张键能表都已含着零点修正；氦——最轻的原子处在最浅的阱里——其零点能大于常压下的晶格能，因此无论浴多冷都不凝固（只有加压到 $25\ \mathrm{bar}$ 以上才迫使它固化）。在实验室里，$\mathrm{X{-}H}$ 与 $\mathrm{X{-}D}$ 键之间几个 $\mathrm{kJ\,mol^{-1}}$ 的零点能差，是氢-氘分馏、重水效应、以及骑在 [[kinetics/transition-state-theory]] 动力学同位素效应之上的平衡同位素效应的热力学引擎。

::: example 氯化氢的零点能与振动温度 {#ex-zpe-hcl}
氯化氢的振动为 $\tilde\nu = 2990\ \mathrm{cm^{-1}}$。求其零点能（以 $\mathrm{kJ\,mol^{-1}}$ 计），并判断 $\mathrm{300\ K}$ 下振动是否被热激发。
::: solution
零点能是半个量子：$\tfrac{1}{2}\times 2990\ \mathrm{cm^{-1}} = 1495\ \mathrm{cm^{-1}}$。以每 $\mathrm{cm^{-1}}$ 合 $0.011\,963\ \mathrm{kJ\,mol^{-1}}$（即 $N_\mathrm{A}hc$）换算，
$$
E_0 = 1495 \times 0.011\,963 = 17.9\ \mathrm{kJ\,mol^{-1}} .
$$
能级间距对应振动温度 $\Theta_\mathrm{vib} = hc\tilde\nu/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K} \times 2990\ \mathrm{cm^{-1}} = 4300\ \mathrm{K}$，所以 $\mathrm{300\ K}$ 下第一激发级的玻尔兹曼布居比为 $\mathrm{e}^{-4300/300} = 6\times10^{-7}$：室温下几乎每个 $\mathrm{HCl}$ 分子都在 $v = 0$，红外吸收从基态出发。振动被冻结；转动，我们马上会看到，则不然。
:::
:::

方程 [[#eq-ho-levels]] 中的波函数值得端详片刻。基态是高斯型，宽度 $\alpha = \sqrt{\hbar/\mu\omega}$——两核越重、弹簧越硬，波包越窄——其概率密度在平衡键长处取峰，而*经典*振子在那里花的时间*最少*。$v = 1$ 时密度在 $x = 0$ 有节点；$v$ 很大时量子密度发展出 $v + 1$ 个极大，并且在对几条纹做平均后重现经典的两端上凸分布——把概率堆在转折点上。转折点本身就很有教益：在 $x = \pm\sqrt{2E_v/k}$ 处动能将为负，然而 $\psi_v$ 仍渗入禁区约 $\alpha$ 之深——正是 [[quantum-chemistry/model-systems]] 中使隧穿成为可能的同一条倏逝尾巴。

::: example 氯化氢的力常数 {#ex-force-const}
已知 $\mathrm{H^{35}Cl}$ 的 $\tilde\nu = 2990\ \mathrm{cm^{-1}}$，计算键的力常数 $k$。
::: solution
先把两个质量约化为一个：由 $m(\mathrm{H}) = 1.0078\ \mathrm{u}$、$m(^{35}\mathrm{Cl}) = 34.969\ \mathrm{u}$，
$$
\mu = \frac{1.0078 \times 34.969}{1.0078 + 34.969}\ \mathrm{u} = 0.9796\ \mathrm{u} = 1.627\times10^{-27}\ \mathrm{kg}.
$$
角频率为 $\omega = 2\pi c\tilde\nu = 2\pi \times 2.998\times10^{10}\ \mathrm{cm\,s^{-1}} \times 2990\ \mathrm{cm^{-1}} = 5.63\times10^{14}\ \mathrm{s^{-1}}$，于是
$$
k = \mu\omega^{2} = 1.627\times10^{-27} \times \left(5.63\times10^{14}\right)^{2} = 516\ \mathrm{N\,m^{-1}} .
$$
一个宏观对照：吉他弦粗细的钢丝，按键的横截面折算，$k$ 约为 $10^{3}\ \mathrm{N\,m^{-1}}$ 量级，所以化学键在你拿得住的东西里算相当硬的——然而 $516\ \mathrm{N\,m^{-1}}$ 在零点振幅处对应的回复能量也只有 $0.185\ \mathrm{eV}$。
:::
:::

::: example 氘取代：预测 HCl→DCl 的位移 {#ex-dcl}
已知 $\tilde\nu(\mathrm{H^{35}Cl}) = 2990\ \mathrm{cm^{-1}}$、$m(\mathrm{D}) = 2.0141\ \mathrm{u}$，预测 $\mathrm{D^{35}Cl}$ 的基频。
::: solution
玻恩-奥本海默近似使势能——从而 $k$——只属电子的性质，所以把 H 换成 D 只改变 $\mu$，别的一律不变：
$$
\mu(\mathrm{DCl}) = \frac{2.0141 \times 34.969}{2.0141 + 34.969} = 1.9044\ \mathrm{u},
\qquad
\frac{\tilde\nu(\mathrm{DCl})}{\tilde\nu(\mathrm{HCl})} = \sqrt{\frac{\mu(\mathrm{HCl})}{\mu(\mathrm{DCl})}} = \sqrt{\frac{0.9796}{1.9044}} = 0.7172 .
$$
于是 $\tilde\nu(\mathrm{DCl}) = 2990 \times 0.7172 = 2144\ \mathrm{cm^{-1}}$。实测基频为 $2087\ \mathrm{cm^{-1}}$：$2.7\,\%$ 的亏空是非谐性——基频位于 $\omega_\mathrm{e}$ 之下 $2\omega_\mathrm{e}x_\mathrm{e}$ 处，而 DCl 的 $\omega_\mathrm{e}x_\mathrm{e} \approx 53 \times 0.7172^{2} = 27\ \mathrm{cm^{-1}}$。较重的伙伴只是在同一个面上动得更慢，而剩余的差值量出那个面有多大成分不是抛物线。
:::
:::

::: warning 同位素改变质量，不改变势能 {#warn-isotope}
频率比 $\sqrt{\mu'/\mu}$ 假设两种同位素分子的力常数相同——在玻恩-奥本海默下精确到万分之一，因为核只质量不同。忘掉这一点会犯两个错误。其一，把同位素位移当作关于 $k$ 的证据（它是关于 $\mu$ 的证据，从而关于*哪些原子*在动——这正是位移能指认振动键的原因）。其二，假设零点*能量*不变：它不变才怪——$\mathrm{DCl}$ 在阱中的位置比 $\mathrm{HCl}$ 低 $0.07\ \mathrm{eV}$，这就是 $\mathrm{C{-}D}$ 键略强、断裂略慢的原因，即动力学同位素效应的热力学一半。
:::

## 选律：哪些振动吸收光

吸收辐射是电偶极耦合：振荡场推挤分子的电荷分布，跃迁速率正比于 $|\boldsymbol{\mu}_\mathrm{fi}|^{2}$，即初末态之间的**跃迁偶极矩** $\boldsymbol{\mu}_\mathrm{fi} = \int \psi_\mathrm{f}^{*}\,\hat{\boldsymbol{\mu}}\,\psi_\mathrm{i}\,\mathrm{d}\tau$ 的平方。这句话的两半各带一条选律。

::: proposition 振动选律 {#prop-vib-sel}
把偶极矩沿简正坐标 $Q$ 展开：$\mu(Q) = \mu_0 + \left(\partial\mu/\partial Q\right)_0 Q + \cdots$。则在谐振近似下，
$$
\Delta v = \pm 1 \quad\text{且强度}\propto \left(\frac{\partial \mu}{\partial Q}\right)_0^{2},
$$
所以一个振动吸收红外光**当且仅当**它改变偶极矩：同核双原子分子（$\mathrm{N_2}$、$\mathrm{O_2}$）红外非活性，$\mathrm{HCl}$ 与 $\mathrm{CO}$ 有活性，$\mathrm{CO_2}$ 经其反对称伸缩与弯曲吸收，而对称伸缩不吸收。倍频 $\Delta v = \pm 2, \pm 3$ 对谐振子严格禁戒，只经非谐性微弱出现。
:::

::: proof 由升降算符导出选律 {#proof-vib-sel}
常数项 $\mu_0$ 贡献 $\mu_0\int\psi_{v'}^{*}\psi_v\,\mathrm{d}x = \mu_0\delta_{v'v}$：无跃迁。线性项贡献 $\left(\partial\mu/\partial Q\right)_0$ 乘以 $\int\psi_{v'}^{*} x\,\psi_v\,\mathrm{d}x$。用升降算符写位置算符，$x = \sqrt{\hbar/2\mu\omega}\,(\hat a^{\dagger} + \hat a)$，并用 $\hat a\,|v\rangle = \sqrt{v}\,|v-1\rangle$、$\hat a^{\dagger}|v\rangle = \sqrt{v+1}\,|v+1\rangle$：
$$
\langle v'|\,x\,|v\rangle = \sqrt{\frac{\hbar}{2\mu\omega}}\left(\sqrt{v}\,\delta_{v',\,v-1} + \sqrt{v+1}\,\delta_{v',\,v+1}\right),
$$
除 $v' = v \pm 1$ 外皆为零。同样的结果用宇称一行可得：$\psi_{v'}^{*} x\,\psi_v$ 的宇称为 $(-1)^{v'}(-1)(-1)^{v}$，除非 $v'$ 与 $v$ 相差奇数，否则为奇——因而积分为零；再结合上面的递推，存活的只有 $\pm 1$。吸收（$v \to v+1$）在室温下占绝对优势，因为如 [[#ex-zpe-hcl]] 所示，布居几乎全在 $v = 0$。
:::

::: quiz 红外活性
下列哪个振动是红外*非活性*的？
- [ ] $\mathrm{CO_2}$ 的反对称伸缩（$\sim 2349\ \mathrm{cm^{-1}}$）。
- [x] $\mathrm{CO_2}$ 的对称伸缩（$\sim 1333\ \mathrm{cm^{-1}}$）。
- [ ] $\mathrm{HCl}$ 的伸缩。
- [ ] $\mathrm{H_2O}$ 的弯曲。
::: solution
对称伸缩中两条 $\mathrm{C{=}O}$ 键一起伸长；它们方向相反的键偶极变化相互抵消，$\left(\partial\mu/\partial Q\right)_0 = 0$，该模红外静默（但拉曼有活性，那里相关的导数是对极化率的）。反对称伸缩保留变化的偶极；$\mathrm{HCl}$ 有一个随 $R$ 增减的永久偶极；水的弯曲改变其偶极。这就是二氧化碳是温室气体、而占大气四分之三的氮气不是的原因：$\mathrm{N_2}$ 的伸缩不产生任何光子能感受的变化。
:::
:::

## 非谐性：莫尔斯势

谐振子的键永远不会断：$V \to \infty$。真实曲线向解离极限 $D_\mathrm{e}$ 变平，标准的解析替身是莫尔斯势。

::: definition 莫尔斯势 {#def-morse}
**莫尔斯势**为 $V(x) = D_\mathrm{e}\!\left(1 - \mathrm{e}^{-ax}\right)^{2}$，其中 $x = R - R_\mathrm{e}$，$D_\mathrm{e}$ 为阱深，程参数 $a$ 由曲率固定，$a = \omega\sqrt{\mu/2D_\mathrm{e}}$。其振动项值在该模型支持的精度内为
$$
G(v) = \omega_\mathrm{e}\!\left(v + \tfrac{1}{2}\right) - \omega_\mathrm{e}x_\mathrm{e}\!\left(v + \tfrac{1}{2}\right)^{2},
\qquad
\omega_\mathrm{e}x_\mathrm{e} = \frac{\omega_\mathrm{e}^{2}}{4D_\mathrm{e}} \;\text{（以波数计）},
$$ {#eq-morse}
于是相邻能级间距随 $v$ *线性收缩*，直至在 $v_\mathrm{max} \approx \omega_\mathrm{e}/2\omega_\mathrm{e}x_\mathrm{e} - \tfrac{1}{2}$ 处并入连续区。
:::

::: widget plot
f: 16.1*x^2; de*(1-exp(-1.87*x))^2
x: -1.2, 2.5
y: 0, 6
sliders: de=4.6:2:8:0.1
labels: \text{谐振子}；\text{莫尔斯}
caption: $\mathrm{HCl}$ 的谐振（抛物线）势与莫尔斯势，能量以 $\mathrm{eV}$、位移 $x$ 以 $\mathrm{\AA}$ 计；莫尔斯阱深 `de` 由滑块设定。两条曲线在平衡位置约 $0.15\ \mathrm{\AA}$ 内重合——那正是 $v = 0$ 与 $v = 1$ 能级实际探索的区域——在此之外分道扬镳：抛物线永远攀升，莫尔斯曲线趋于解离极限。把 `de` 滑得更深，看两条曲线贴合得更久：阱越深越硬就越接近谐振，这就是为什么 $\mathrm{H_2}$（$\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$）用方程 [[#eq-ho-levels]] 描述得很好，而 $\mathrm{I_2}$ 不行。
:::

::: warning D₀、Dₑ 与 ωₑxₑ 的符号 {#warn-d0-de}
三种约定在这里相撞。$D_\mathrm{e}$ 是从势阱*底部*算的势阱深度；$D_0$ 是从 $v = 0$ 能级算的解离能，$D_0 = D_\mathrm{e} - G(0)$，而"键解离能"表指的是 $D_0$。非谐性常数 $\omega_\mathrm{e}x_\mathrm{e}$ 是一个*正*数，在方程 [[#eq-morse]] 里带负号出现——写成 $G(v) = \omega_\mathrm{e}(v+\tfrac12) + \omega_\mathrm{e}x_\mathrm{e}(v+\tfrac12)^2$ 是符号错误，会让能级发散而非收敛。再者，用 $\omega_\mathrm{e}, \omega_\mathrm{e}x_\mathrm{e}$ 拟合的莫尔斯曲线不是真实势：它对 $\mathrm{H_2}$ 高估 $D_0$ 几个百分点，对浅阱更糟，因为它的远程尾巴（$\mathrm{e}^{-2ax}$ 衰减）不是真实的范德华尾巴。
:::

::: example 由光谱求 H₂ 的解离能 {#ex-h2-morse}
$\mathrm{H_2}$ 的 $\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$、$\omega_\mathrm{e}x_\mathrm{e} = 121\ \mathrm{cm^{-1}}$。估计 $D_\mathrm{e}$ 与 $D_0$，并与实测值 $D_0 = 36\,118\ \mathrm{cm^{-1}} = 4.48\ \mathrm{eV}$ 比较。
::: solution
由方程 [[#eq-morse]]，$\omega_\mathrm{e}x_\mathrm{e} = \omega_\mathrm{e}^{2}/4D_\mathrm{e}$，故
$$
D_\mathrm{e} = \frac{\omega_\mathrm{e}^{2}}{4\,\omega_\mathrm{e}x_\mathrm{e}} = \frac{4401^{2}}{4 \times 121} = 40\,018\ \mathrm{cm^{-1}} = 4.96\ \mathrm{eV},
$$
减去零点项 $G(0) = \tfrac{1}{2}\omega_\mathrm{e} - \tfrac{1}{4}\omega_\mathrm{e}x_\mathrm{e} = 2200.5 - 30.3 = 2170\ \mathrm{cm^{-1}}$ 得
$$
D_0 = 40\,018 - 2170 = 37\,848\ \mathrm{cm^{-1}} = 4.69\ \mathrm{eV}.
$$
莫尔斯估计比实测值高 $4.7\,\%$——$\mathrm{H_2}$ 的整个振动能级梯只是轻度非谐，然而外推仍然过冲，正如 [[#warn-d0-de]] 所警告，因为莫尔斯尾巴太陡。把观测能级间距逐个加到解离极限的程序称为**伯奇-斯波纳外推**；对 $\mathrm{H_2}$，由于全部十五个束缚态的间距都已测得，它收敛到真值，而多数分子只能取两三项就外推，答案可信到几个百分点。
:::
:::

## 角动量与刚性转子

转动由角动量支配，其量子理论值得讲一次，因为它将在氢原子（[[quantum-chemistry/hydrogen-atom]]）、项符号、以及本课与下一课的每条选律中反复出现。$\hat{\mathbf{L}} = \hat{\mathbf{r}} \times \hat{\mathbf{p}}$ 的三个分量互不对易（$[\hat L_x, \hat L_y] = \mathrm{i}\hbar \hat L_z$），所以同时确定的分量至多一个——但 $\hat L^{2}$ 与所有分量都对易，于是 $\hat L^{2}, \hat L_z$ 这一对有共同本征函数。

::: proposition 量子化的角动量 {#prop-amom}
$\hat L^{2}$ 与 $\hat L_z$ 的共同本征函数是球谐函数 $Y_{J M}(\theta,\phi)$，本征值为
$$
\hat L^{2} Y_{JM} = J(J+1)\,\hbar^{2}\,Y_{JM}, \qquad
\hat L_z Y_{JM} = M\hbar\,Y_{JM}, \qquad
J = 0, 1, 2, \ldots, \quad M = -J, \ldots, +J .
$$
角动量的大小为 $\hbar\sqrt{J(J+1)}$——绝不等于 $J\hbar$ 整——其 $z$ 分量取 $2J+1$ 个等距值：空间本身量子化为 $2J+1$ 个取向。
:::

::: definition 刚性转子 {#def-rotor}
**刚性转子**是相距固定距离 $r$ 的两个质量，绕质心以转动惯量 $I = \mu r^{2}$ 转动。其哈密顿量为 $\hat H = \hat L^{2}/2I$，所以其态是球谐函数，能量为
$$
E_J = \frac{\hbar^{2}}{2I}J(J+1) = hc\,\tilde B\,J(J+1), \qquad
\tilde B = \frac{h}{8\pi^{2} c I},
$$ {#eq-rotor}
每个能级在 $M$ 上 $(2J+1)$ 重简并。以波数计，$\mu$ 以原子质量单位、$r$ 以埃计时，$\tilde B / \mathrm{cm^{-1}} = 16.8576 / \left(\mu/\mathrm{u}\right)\!\left(r/\mathrm{\AA}\right)^{2}$。
:::

与势箱的三点对照值得点名。转子*没有零点能*：$J = 0$ 允许，$E = 0$，取向完全离域，$\psi = Y_{00} = (4\pi)^{-1/2}$——转动的分子未必转，因为角动量为零的确定态与不确定性原理相容（三个分量同时确定为零）。能级按 $J(J+1)$ 增长而非按 $J^{2}$，所以间距 $2\tilde B(J+1)$ 随 $J$ 变宽。而且能量极小：$\tilde B$ 对 $\mathrm{CO}$ 是 $1.9\ \mathrm{cm^{-1}}$，对 $\mathrm{HCl}$ 是 $10.6\ \mathrm{cm^{-1}}$，比振动间距低一千倍，这就是转动住在微波与远红外的原因。

::: example 由一条微波线得键长 {#ex-co-bond}
$^{12}\mathrm{C}^{16}\mathrm{O}$ 的 $J = 1 \leftarrow 0$ 吸收线在 $3.862\ \mathrm{cm^{-1}}$（$115.8\ \mathrm{GHz}$）。求键长，并预测 $^{13}\mathrm{CO}$ 的同一条线。
::: solution
跃迁能为 $E_1 - E_0 = 2\tilde B$，故 $\tilde B = 1.931\ \mathrm{cm^{-1}}$。反解方程 [[#eq-rotor]]，取 $\mu(^{12}\mathrm{C}^{16}\mathrm{O}) = 12.000 \times 15.995 / 27.995 = 6.856\ \mathrm{u}$：
$$
r^{2} = \frac{16.8576}{\tilde B\,\mu} = \frac{16.8576}{1.931 \times 6.856}\ \mathrm{\AA^{2}} = 1.273\ \mathrm{\AA^{2}}
\qquad\Longrightarrow\qquad r = 1.128\ \mathrm{\AA},
$$
精确到三位数的平衡 $\mathrm{C{\equiv}O}$ 键长。对 $^{13}\mathrm{CO}$，$\mu = 7.172\ \mathrm{u}$，而由于电子从而势能未变，$r$ 不变：$\tilde B = 16.8576/(7.172 \times 1.273) = 1.846\ \mathrm{cm^{-1}}$，线在 $3.69\ \mathrm{cm^{-1}}$。一条微波线就这样把键长度量到 $0.001\ \mathrm{\AA}$——转动光谱是结构化学里最精密的尺。
:::
:::

::: proposition 转动选律 {#prop-rot-sel}
刚性转子吸收或发射光子时 $\Delta J = \pm 1$（$\Delta M = 0, \pm 1$），且仅当分子具有**永久偶极矩**时才发生。因此纯转动光谱见于 $\mathrm{HCl}$、$\mathrm{CO}$、$\mathrm{H_2O}$——绝不见于 $\mathrm{N_2}$、$\mathrm{CO_2}$（在其平衡几何下）或 $\mathrm{CH_4}$。
:::

::: proof 为什么 ΔJ = ±1，为什么需要偶极 {#proof-rot-sel}
相互作用算符是 $-\hat{\boldsymbol{\mu}}\cdot\mathbf{E}$；对固定长度偶极 $\mu$ 的转子，实验室系分量是 $\mu\cos\theta$、$\mu\sin\theta\,\mathrm{e}^{\pm\mathrm{i}\phi}$ 乘以常数。于是跃迁矩 $\int Y_{J'M'}^{*}\,f(\theta,\phi)\,Y_{JM}\,\mathrm{d}\Omega$ 中的 $f$ 为 $\cos\theta \propto Y_{10}$ 或 $\sin\theta\,\mathrm{e}^{\pm\mathrm{i}\phi} \propto Y_{1,\pm1}$：它是*三个*球谐函数的积分，除非三角条件 $|J - 1| \le J' \le J + 1$ 成立否则为零——而 $J' = J$ 的情形因 $Y_{1q}$ 的宇称而为零（等价地说，$\cos\theta$ 在反演下为奇，而 $|Y_{JM}|^{2}$ 为偶，所以处于确定态的转子沿任何轴都没有可被拉扯的平均偶极）。$\mu = 0$ 的分子每个跃迁矩从一开始就为零。幸存的规则是 $\Delta J = \pm 1$：吸收线落在 $\tilde\nu(J \to J+1) = 2\tilde B(J+1)$，一排从 $2\tilde B$ 起、间距完美的梳齿，原点处留着宽度 $2\tilde B$ 的暗间隙。
:::

::: warning 波数不是能量 {#warn-btilde}
$\tilde B = 1.931\ \mathrm{cm^{-1}}$ 是一个*波数*，不是能量：能量是 $hc\tilde B$。光谱学家把每个能级、间距、光子都写成 $\mathrm{cm^{-1}}$，让 $hc$ 隐形随行；热力学工作者要的是 $\mathrm{J\,mol^{-1}}$ 或 $\mathrm{eV}$。换算用 $1\ \mathrm{cm^{-1}} = 1.986\times10^{-23}\ \mathrm{J} = 0.011\,96\ \mathrm{kJ\,mol^{-1}} = 1.240\times10^{-4}\ \mathrm{eV} = 29.98\ \mathrm{GHz}$。混用约定——把 $hc$ 乘两遍，或一遍都不乘——是转动计算中丢三个数量级的最常见方式。
:::

## 强度：J 的玻尔兹曼梯

线位来自能级；线*强度*来自有多少分子蓄势待发准备做每个跃迁。对吸收 $J \to J+1$，强度正比于下能级布居，而 $J$ 能级的布居是两个相反因子的乘积：增长的简并度 $2J+1$，与衰减的玻尔兹曼因子 $\mathrm{e}^{-\tilde B J(J+1)hc/k_\mathrm{B}T}$。

::: widget plot
f: (2*x+1)*exp(-b*x*(x+1)*1.4388/t)
x: 0, 22
y: 0, 12
sliders: b=10.59:1:20:0.5; t=300:50:600:10
labels: \text{能级 } J \text{ 的布居}
caption: 转动能级的相对布居 $(2J+1)\,\mathrm{e}^{-\tilde B J(J+1)hc/k_\mathrm{B}T}$，$\tilde B$（`b`，单位 $\mathrm{cm^{-1}}$）与 $T$（`t`，单位 $\mathrm{K}$）在滑块上——默认值为 $\mathrm{HCl}$。布居先升、达峰、再落：极大值位于 $J^{*} = \sqrt{k_\mathrm{B}T/2\tilde B hc} - \tfrac{1}{2}$ 附近。把 $T$ 从 50 滑到 $600\ \mathrm{K}$，看峰向高 $J$ 行军——加热气体就是字面意义上把分子转得更快——再把 $\tilde B$ 滑到 $\mathrm{CO}$ 的 $1.9\ \mathrm{cm^{-1}}$，看为什么重分子携带数千个热占据的转动能级，而 $\tilde B = 60\ \mathrm{cm^{-1}}$ 的 $\mathrm{H_2}$ 在室温几乎没有。
:::

::: example HCl 纯转动光谱最亮的线 {#ex-jstar}
$\mathrm{HCl}$ 的 $\tilde B = 10.59\ \mathrm{cm^{-1}}$。$\mathrm{300\ K}$ 下哪条纯转动跃迁最强？
::: solution
连续估计为 $J^{*} = \sqrt{k_\mathrm{B}T/2\tilde B hc} - \tfrac{1}{2} = \sqrt{300/(2 \times 10.59 \times 1.4388)} - \tfrac{1}{2} = 2.6$。由于 $J$ 是整数，检验邻近的整数，用 $p_J \propto (2J+1)\mathrm{e}^{-15.23\,J(J+1)/300}$（取 $\tilde B hc/k_\mathrm{B} = 15.2\ \mathrm{K}$）：$p_2 \propto 5\times0.737 = 3.69$，$p_3 \propto 7\times0.544 = 3.80$，$p_4 \propto 9\times0.362 = 3.26$。极大在 $J = 3$，所以最亮的线是 $J = 3 \to 4$，位于 $2\tilde B \times 4 = 84.7\ \mathrm{cm^{-1}}$。同样的算术对 $\mathrm{CO}$ 给出 $J^{*} = 6.8 \to J = 7$：较重分子的峰坐在*更低*的 $J$，尽管它的线更密，因为其转动温度 $\tilde B hc/k_\mathrm{B}$ 更小。
:::
:::

把振动转子两架梯子并到一起，就得到本课开头那幅振动-转动谱带。在振动基频 $v = 0 \to 1$ 中转动量子数仍须变 $\pm 1$，于是谱带裂为 **R 支**（$\Delta J = +1$，线在 $\tilde\nu_0 + \tilde B_1(J+1)(J+2) - \tilde B_0 J(J+1)$）与 **P 支**（$\Delta J = -1$，$\tilde\nu_0 + \tilde B_1 J(J-1) - \tilde B_0 J(J+1)$），且 $\tilde B_1 < \tilde B_0$，因为非谐面上的振动把平均键长拉长。对 $\mathrm{HCl}$（$\tilde\nu_0 = 2885.9\ \mathrm{cm^{-1}}$、$\tilde B_0 = 10.44$、$\tilde B_1 = 10.14\ \mathrm{cm^{-1}}$），R(0) 线立在 $2906.2\ \mathrm{cm^{-1}}$，P(1) 线在 $2865.0\ \mathrm{cm^{-1}}$：$\tilde\nu_0$ 本身没有线，因为双原子分子 $\Sigma$–$\Sigma$ 跃迁的 $\Delta J = 0$——Q 支——是禁戒的，而两支头之间的暗间隙 $2(\tilde B_0 + \tilde B_1) = 41.2\ \mathrm{cm^{-1}}$，正是最初告诉转动光谱学其选律为真的"失踪线"。（Q 支*确实*出现在多原子分子和有电子角动量的双原子分子中——这条规则说的是对称性，[[quantum-chemistry/molecular-symmetry]] 会把它讲精确。）

两架梯子还解释了你曾在 [[statistical-thermodynamics/partition-function]] 遇到的热容：转动温度为 $15\ \mathrm{K}$（$\mathrm{HCl}$）或更低，所以在你能在溶液中达到的任何温度下转动都已充分激发（$C_{V,\mathrm{rot}} = R$），而 $10^{3}$–$10^{4}\ \mathrm{K}$ 的振动温度把振动冻结在室温附近——这就是为什么能量均分对振动"失效"、对转动从不失效的量子起源。

## 后续内容

刚性转子与谐振子立刻、到处回来。它们的精确解成为 [[quantum-chemistry/approximation-methods]] 中一切近似的*起点*（非谐性与振动-转动耦合是教科书级的微扰习题），它们的角动量是 [[quantum-chemistry/hydrogen-atom]] 氢原子骨架与 [[quantum-chemistry/many-electron-atoms]] 项符号的骨架，而它们的选律改写成对称性陈述后就是 [[quantum-chemistry/molecular-symmetry]] 的回报。光谱学课程从这里接手——线形、离心畸变、费米共振、振动-转动带——见 [[spectroscopy/rotational-spectroscopy]] 与 [[spectroscopy/vibrational-spectroscopy]]。而倒过来的振子——在垒顶倒放的莫尔斯曲线——就是 [[kinetics/transition-state-theory]] 的过渡态，其虚频率是一个曲率为负的振动频率。学好这两个模型体系，一半的分子光谱就变成算术。

::: history
罗伯特·胡克（Hooke）1678 年以字谜 *ceiiinosssttuv*——*ut tensio, sic vis*——宣布了弹簧定律，普朗克（Planck）1900 年通过只允许这些弹簧取能量 $nh\nu$ 而使其量子化。转动也是量子化的，这一推断出自阿诺德·欧肯（Arnold Eucken）1912 年对 $\mathrm{H_2}$ 热容的测量——其转动贡献在低温下显著缺席。莫尔斯势（菲利普·莫尔斯，1929）在带光谱被破译的同十年里给了非谐键标准的解析形状；格哈德·赫尔茨贝格（Herzberg）的《分子光谱与分子结构》（1945 年起）成为该领域的手册。伊西多·拉比（Rabi）的分子束共振法（1938 年，1944 年诺贝尔奖）与查尔斯·汤斯（Townes）的微波工作（1964 年诺贝尔奖，与尼古拉·巴索夫、亚历山大·普罗霍罗夫分享）把转动光谱变成了精密到足以检验玻恩-奥本海默近似本身的键长度量。
:::

::: summary
- 平衡位置附近每个键都是弹簧：$V = \tfrac{1}{2}kx^{2}$，$\omega = \sqrt{k/\mu}$，量子振子有 $E_v = (v+\tfrac12)\hbar\omega$——等间距、$v$ 个节点，以及零点能 $\tfrac12\hbar\omega$，它移动键能、使氦保持液态、驱动同位素分馏。
- 同位素改变 $\mu$ 而不改变 $k$：频率按 $1/\sqrt{\mu}$ 缩放，光谱由此指认振动的键（$\mathrm{HCl}$ $2990 \to \mathrm{DCl}$ $2144\ \mathrm{cm^{-1}}$）。
- 红外活性需要 $\left(\partial\mu/\partial Q\right)_0 \ne 0$，且在谐振下 $\Delta v = \pm 1$；倍频是非谐泄漏。同核双原子分子红外静默。
- 非谐性使能级间距按 $G(v) = \omega_\mathrm{e}(v+\tfrac12) - \omega_\mathrm{e}x_\mathrm{e}(v+\tfrac12)^{2}$ 收缩，并在 $v_\mathrm{max}$ 处终结能梯；$D_0 = D_\mathrm{e} - G(0)$，莫尔斯外推偏高几个百分点。
- 角动量量子化为 $J(J+1)\hbar^{2}$，有 $2J+1$ 个取向；刚性转子有 $E_J = hc\tilde B J(J+1)$，$\tilde B = h/8\pi^{2}cI = 16.8576/(\mu r^{2})\ \mathrm{cm^{-1}}$，无零点转动，简并度 $(2J+1)$。
- 纯转动光谱需要永久偶极，表现为 $\Delta J = \pm 1$：位于 $2\tilde B(J+1)$ 的等距线，由此键长可定到 $0.001\ \mathrm{\AA}$（$\mathrm{CO}$：$r = 1.128\ \mathrm{\AA}$）。
- 转动强度按 $(2J+1)\mathrm{e}^{-\tilde B J(J+1)hc/k_\mathrm{B}T}$，峰在 $J^{*} \approx \sqrt{k_\mathrm{B}T/2\tilde B hc} - \tfrac12$（$\mathrm{HCl}$：$\mathrm{300\ K}$ 下 $J = 3$）；振动-转动带显示 P、R 两支，以及 Q 支本该在处的暗间隙 $2(\tilde B_0 + \tilde B_1)$。
:::

## 练习

::: exercise H₂ 的零点能 {level=1 check="26.3"}
取谐振值，计算 $\mathrm{H_2}$（$\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$）的零点能，以 $\mathrm{kJ\,mol^{-1}}$ 计。（以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
$E_0 = \tfrac12 \times 4401\ \mathrm{cm^{-1}} = 2200.5\ \mathrm{cm^{-1}}$，以每 $\mathrm{cm^{-1}}$ 合 $0.011\,963\ \mathrm{kJ\,mol^{-1}}$：$E_0 = 2200.5 \times 0.011\,963 = 26.3\ \mathrm{kJ\,mol^{-1}}$——一切分子中最大的零点能，因为 $\mu$ 最小。它占 $\mathrm{H_2}$ 键能的 $6\,\%$，这就是氘化学与氢化学有可测差异的原因。
:::
:::

::: exercise 一条微波线 {level=1 check="115.8"}
取 CO 的 $\tilde B = 1.931\ \mathrm{cm^{-1}}$，$J = 1 \leftarrow 0$ 跃迁以什么频率（GHz）吸收？（以 GHz 输入。）
::: solution
$\tilde\nu = 2\tilde B = 3.862\ \mathrm{cm^{-1}}$，而 $1\ \mathrm{cm^{-1}} = 29.979\ \mathrm{GHz}$，故 $\nu = 3.862 \times 29.979 = 115.8\ \mathrm{GHz}$。实测线在 $115.27\ \mathrm{GHz}$：差值来自 $B_0 < B_\mathrm{e}$，即零点振动把键稍微拉长——与振动项值中的非谐性同源。
:::
:::

::: exercise 同位素位移 {level=1 check="2144"}
由 $\tilde\nu(\mathrm{H^{35}Cl}) = 2990\ \mathrm{cm^{-1}}$ 预测 $\mathrm{D^{35}Cl}$ 的谐振基频。（以 $\mathrm{cm^{-1}}$ 输入。）
::: solution
$\mu(\mathrm{HCl}) = 0.9796\ \mathrm{u}$，$\mu(\mathrm{DCl}) = 1.9044\ \mathrm{u}$，比 $\sqrt{0.9796/1.9044} = 0.7172$，故 $\tilde\nu(\mathrm{DCl}) = 2990 \times 0.7172 = 2144\ \mathrm{cm^{-1}}$。实测基频为 $2087\ \mathrm{cm^{-1}}$；$2.7\,\%$ 的亏空是非谐性——基频位于 $\omega_\mathrm{e}$ 之下 $2\omega_\mathrm{e}x_\mathrm{e}$ 处，DCl 的 $\omega_\mathrm{e}x_\mathrm{e} \approx 27\ \mathrm{cm^{-1}}$，HCl 的为 $53\ \mathrm{cm^{-1}}$。
:::
:::

::: exercise 力常数 {level=2 check="516"}
由 $\tilde\nu = 2990\ \mathrm{cm^{-1}}$ 计算 $\mathrm{H^{35}Cl}$ 的力常数。（以 $\mathrm{N\,m^{-1}}$ 输入。）
::: solution
$k = \mu\omega^{2} = \mu(2\pi c\tilde\nu)^{2} = 1.627\times10^{-27}\ \mathrm{kg} \times (5.63\times10^{14}\ \mathrm{s^{-1}})^{2} = 516\ \mathrm{N\,m^{-1}}$。对照：$\mathrm{I{-}I}$ 键 $k \approx 170\ \mathrm{N\,m^{-1}}$，$\mathrm{N{\equiv}N}$ 键 $k \approx 2240\ \mathrm{N\,m^{-1}}$——力常数给键级排序，尽管不完美，因为沿一个系列 $\mu$ 与 $k$ 都在动。
:::
:::

::: exercise 键长 {level=2 check="1.16"}
$^{14}\mathrm{N}^{16}\mathrm{O}$ 的转动常数 $\tilde B = 1.672\ \mathrm{cm^{-1}}$。求其键长。（以 $\mathrm{\AA}$ 输入。）
::: solution
$\mu(^{14}\mathrm{N}^{16}\mathrm{O}) = 14.003 \times 15.995/30.000 = 7.470\ \mathrm{u}$，故 $r = \sqrt{16.8576/(1.672 \times 7.470)} = \sqrt{1.350} = 1.16\ \mathrm{\AA}$。NO 比 CO（$1.128\ \mathrm{\AA}$）*更长*，尽管它只多了一个电子——那个单电子住在反键 $\pi^{*}$ 轨道里，把键级从 3 降到 $2.5$；决定键长的是键级，不是电子数。
:::
:::

::: exercise 最亮的线 {level=2 check="3"}
$\mathrm{HCl}$（$\tilde B = 10.59\ \mathrm{cm^{-1}}$）在 $\mathrm{300\ K}$ 下哪个 $J$ 能级布居最大？（输入 $J$。）
::: solution
$p_J \propto (2J+1)\mathrm{e}^{-15.23\,J(J+1)/300}$：$p_2 = 3.69$，$p_3 = 3.80$，$p_4 = 3.26$（相对单位），故 $J = 3$。连续估计 $J^{*} = \sqrt{300/(2\times10.59\times1.4388)} - \tfrac12 = 2.6$ 在此四舍五入到同一答案，但务必检验 $J^{*}$ 两侧的两个整数——离散极大可以落在任一侧。
:::
:::

::: exercise 弱键的莫尔斯解离 {level=3 check="4.69"}
$\mathrm{H_2}$ 的 $\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$、$\omega_\mathrm{e}x_\mathrm{e} = 121\ \mathrm{cm^{-1}}$。由莫尔斯关系估计 $D_0$，以 eV 给出。（以 eV 输入。）为什么偏高？
::: solution
$D_\mathrm{e} = \omega_\mathrm{e}^{2}/4\omega_\mathrm{e}x_\mathrm{e} = 4401^{2}/484 = 40\,018\ \mathrm{cm^{-1}}$；$G(0) = \tfrac12(4401) - \tfrac14(121) = 2170\ \mathrm{cm^{-1}}$；$D_0 = 37\,848\ \mathrm{cm^{-1}} = 37\,848/8065.5 = 4.69\ \mathrm{eV}$。实测值为 $4.48\ \mathrm{eV}$：莫尔斯势的 $\mathrm{e}^{-2ax}$ 尾巴比真实远程相互作用更陡，且其曲率关系 $\omega_\mathrm{e}x_\mathrm{e} = \omega_\mathrm{e}^{2}/4D_\mathrm{e}$ 只是更一般展开的首项，所以从阱底外推会过冲。误差方向是可靠的——莫尔斯 $D_0$ 是上限估计——这就是精密工作改为累加实测间距（伯奇-斯波纳）的原因。
:::
:::

::: exercise 振动-转动带的暗间隙 {level=3 check="41.2"}
$\mathrm{HCl}$ 基频的 $\tilde\nu_0 = 2885.9\ \mathrm{cm^{-1}}$、$\tilde B_0 = 10.44\ \mathrm{cm^{-1}}$、$\tilde B_1 = 10.14\ \mathrm{cm^{-1}}$。由项值导出 R(0) 与 P(1) 的位置，并求两支头之间的间隔。（以 $\mathrm{cm^{-1}}$ 输入间隔。）
::: solution
上态用 $\tilde B_1$，下态用 $\tilde B_0$。R 支（$J \to J+1$）：$\tilde\nu = \tilde\nu_0 + \tilde B_1(J+1)(J+2) - \tilde B_0 J(J+1)$，故 R(0) $= 2885.9 + 2(10.14) = 2906.2\ \mathrm{cm^{-1}}$。P 支（$J \to J-1$）：$\tilde\nu = \tilde\nu_0 + \tilde B_1 J(J-1) - \tilde B_0 J(J+1)$，故 P(1) $= 2885.9 - 2(10.44) = 2865.0\ \mathrm{cm^{-1}}$。间隔 $= 2(\tilde B_0 + \tilde B_1) = 41.2\ \mathrm{cm^{-1}}$，而 $\tilde\nu_0$ 本身是暗的：最近的线在其两侧 $20.3$ 与 $20.8\ \mathrm{cm^{-1}}$ 处，即经典的失踪 Q 支。两个半间隙的不对称（$\tilde B_1 < \tilde B_0$）本身就是一次测量：被激发的振动把原子平均拉远 $1\,\%$。
:::
:::

::: exercise 振子的维里定理 {level=3}
证明谐振子在任一定态都满足 $\langle \hat T \rangle = \langle \hat V \rangle = \tfrac12 E_v$，并比较基态的三个长度：$E_0$ 下的经典转折点 $x_\mathrm{tp}$、均方根宽度 $\langle x^{2}\rangle_0^{1/2}$、以及基态波函数的 $1/\mathrm{e}$ 半宽。
::: solution
定态中任何不含时算符组合的期望的时间导数为零，所以对 $\hat G = \hat x\hat p + \hat p\hat x$，
$$
0 = \left\langle \frac{\mathrm{i}}{\hbar}[\hat H, \hat G]\right\rangle .
$$
用 $[\hat x, \hat p] = \mathrm{i}\hbar$ 计算对易子得 $[\hat H, \hat G] = -2\mathrm{i}\hbar\left(\hat p^{2}/\mu - xV'(x)\right)$，于是 $0 = \langle \frac{\mathrm{i}}{\hbar}[\hat H,\hat G]\rangle = 4\langle \hat T\rangle - 2\langle xV'\rangle$，而对 $V = \tfrac12 kx^{2}$（此时 $xV' = 2V$）这就是 $0 = 4\langle \hat T\rangle - 4\langle \hat V\rangle$，即 $\langle \hat T \rangle = \langle \hat V \rangle = E_v/2$。现在看 $v = 0$ 的三个长度。$E_0 = \tfrac12\hbar\omega$ 下的经典转折点：$\tfrac12 k x_\mathrm{tp}^{2} = \tfrac12\hbar\omega$ 给出 $x_\mathrm{tp} = \sqrt{\hbar\omega/k} = \sqrt{\hbar/\mu\omega} = \alpha$。均方宽度：$\langle \hat V \rangle_0 = \tfrac12 k\langle x^{2}\rangle_0 = \tfrac14\hbar\omega$ 给出 $\langle x^{2}\rangle_0^{1/2} = \alpha/\sqrt{2}$。波函数 $\psi_0 \propto \mathrm{e}^{-x^{2}/2\alpha^{2}}$ 在 $x = \alpha\sqrt{2}$ 降到峰值的 $1/\mathrm{e}$，而 $|\psi_0|^{2}$ 在 $x = \alpha$。于是经典转折点 $\alpha$ 坐在*均方根宽度与波函数尾巴之间*：概率密度半宽尺度的一个分数 $\mathrm{e}^{-1} \approx 37\,\%$ 位于经典运动该停之处以外——即 [[#prop-ho-levels]] 之后讨论的隧穿尾巴的定量面貌。
:::
:::

::: exercise 有多少个振动能级？ {level=3 check="17"}
$\mathrm{H_2}$（$\omega_\mathrm{e} = 4401\ \mathrm{cm^{-1}}$、$\omega_\mathrm{e}x_\mathrm{e} = 121\ \mathrm{cm^{-1}}$）的莫尔斯模型支持多少个振动能级？（输入 $v_\mathrm{max}$。）为什么真实分子更少？
::: solution
能级终止于 $G(v+1) - G(v) = \omega_\mathrm{e} - 2\omega_\mathrm{e}x_\mathrm{e}(v+1) = 0$ 处，即 $v_\mathrm{max} = \omega_\mathrm{e}/2\omega_\mathrm{e}x_\mathrm{e} - \tfrac12 = 4401/242 - 0.5 = 17.7$，所以莫尔斯模型束缚到 $v = 17$。真实的 $\mathrm{H_2}$ 有十五个束缚能级（$v = 0$–$14$）：真实势趋近其极限比莫尔斯的 $\mathrm{e}^{-2ax}$ 尾巴更慢，所以真实间距保持张开更久，但阱比 [[#ex-h2-morse]] 的莫尔斯外推更浅——两个误差在 $v_\mathrm{max}$ 里部分抵消，但抵消得不够。数能级是远程势的灵敏探针，而对 $\mathrm{H_2}$，十五个能级中的每一个都已被激光光谱测得。
:::
:::
