把$0.010\ \mathrm{mol}$蔗糖溶入$1\ \mathrm{kg}$水中，[[thermodynamics/mixtures|混合物一章]]中的所有依数性质都会在百分之一以内成立：糖分子在溶液中的表现几乎完全符合理想稀薄溶液理论。把等量的氯化钾溶进去，凝固点下降的幅度接近一摩尔粒子应有结果的两倍——至少这部分是熟悉的——但它下降得*不足*完整的两倍，而且这个差额并非实验误差。在$0.010\ \mathrm{mol\,kg^{-1}}$下，$\mathrm{KCl}$实测的平均活度系数为$0.902$；在$0.10\ \mathrm{mol\,kg^{-1}}$下为$0.778$；即使在$1.0\ \mathrm{mol\,kg^{-1}}$下也只有$0.604$（罗宾逊和斯托克斯（Robinson & Stokes）的数据，见 CRC 手册表列）。一种强电解质——在任何浓度下都完全解离的电解质——在糖的理想性精确到千分之一的浓度下却表现出非理想行为。离子并没有重新结合；是理想性本身出了别的毛病。

那个别的毛病就是库仑力。中性的溶质分子只在碰撞时才与邻居"对话"；而一个离子却感受到溶液中所有其他离子，隔着几十个分子直径，力虽被水的介电常数削弱却从未被关闭。前面各章的热力学在此依然成立——化学势仍是$\mu_i = \mu_i^\circ + RT\ln a_i$，与 [[thermodynamics/mixtures]] 中完全一致——但离子的活度$a_i$永远无法通过测量归结为"让理想公式成立的那个摩尔分数"，因为没有任何实验能在不加入等量抗衡阴离子的情况下加入阳离子。本章建立绕开这一不可能性的机制：离子的平均活度、离子强度，以及仅由电荷、温度和溶剂介电常数就能算出活度系数的德拜-休克尔（Debye–Hückel）理论。有了它们，我们就能理解为什么盐能使难溶盐更易溶解，为什么 pH 测的是活度而不是浓度，以及为什么海水的渗透压略小于同盐量糖水溶液的两倍。

全书约定：溶剂的标准态与 [[thermodynamics/mixtures]] 相同，取纯液体；溶质采用质量摩尔浓度约定：$b^\circ = 1\ \mathrm{mol\,kg^{-1}}$、假想理想溶液，$p^\circ = 1\ \mathrm{bar}$，符号约定$\Delta U = q + w$承袭自 [[thermodynamics/first-law]]。

## 为什么离子与众不同

在相对介电常数为$\varepsilon_\mathrm{r}$的介质中，相距$r$的两个元电荷$e$的相互作用势能为

$$
w(r) = \frac{e^{2}}{4\pi\varepsilon_{0}\varepsilon_\mathrm{r} r}.
$$

水在$25\,^\circ\mathrm{C}$时$\varepsilon_\mathrm{r} = 78.54$（CRC），这把真空中的相互作用削弱了近八十倍——但也仅此而已。令$w = k_\mathrm{B}T$并解出$r$，得到**毕耶鲁姆长度**（Bjerrum length）$l_\mathrm{B} = e^{2}/(4\pi\varepsilon_{0}\varepsilon_\mathrm{r}k_\mathrm{B}T) = 0.714\ \mathrm{nm}$（$25\,^\circ\mathrm{C}$的水）：两个单位电荷恰好以热能相互作用时的距离。两个紧密接触的离子（$r \approx 0.3\ \mathrm{nm}$）相互作用能接近$2.5\,k_\mathrm{B}T$；在$3\ \mathrm{nm}$处它们仍感受到四分之一的$k_\mathrm{B}T$。对比稀溶液的几何图像：在$0.010\ \mathrm{mol\,kg^{-1}}$的$\mathrm{KCl}$中，离子的平均间距约为$4\ \mathrm{nm}$，因此*每一个*离子都处在*每一个*其他离子的作用范围之内。$0.010\ \mathrm{mol\,kg^{-1}}$的糖水溶液每升含有同样数目的溶质分子，却测不出任何相互作用，因为分子不带净电荷，其范德华场在一个分子直径内就衰减殆尽。

第二个不同是水合。离子不是空旷空间中的带电球，而是一个穿着定向水分子外壳的带电球——这些离子-偶极结合体随离子一起在溶液中迁移。[[thermodynamics/mixtures]] 中提到的电致收缩（$\mathrm{MgSO_4}$的负偏摩尔体积）就是这层外壳的一个宏观痕迹。水合改变了尺寸、迁移率和熵，却不改变热力学问题本身：使电解质在*理论上可处理*的，是主导的非理想性正是长程库仑项，而统计力学最擅长的恰恰是这一项，因为微弱的长程相互作用可以通过对光滑场作平均来处理，而不必逐一计数剧烈的近距离碰撞。这正是 [[statistical-thermodynamics/real-gases-liquids]] 的纲领，以其最早也最成功的形式实现。

由于解离是完全的，电解质的化学语言必须从一开始就用离子来表达。盐$\mathrm{M_{\nu_+}X_{\nu_-}}$的溶解写作$\mathrm{M_{\nu_+}X_{\nu_-} \rightarrow \nu_+\,M^{z_+} + \nu_-\,X^{z_-}}$，电中性要求每一瞬间都有$\nu_+ z_+ = \nu_- |z_-|$，每个化学式单元的离子总数为$\nu = \nu_+ + \nu_-$。

## 平均化学势与平均活度系数

::: definition 离子的平均化学势与平均活度系数 {#def-mean-activity}
对质量摩尔浓度为$b$的电解质$\mathrm{M_{\nu_+}X_{\nu_-}}$（$\nu = \nu_+ + \nu_-$），溶解盐的化学势为$\mu = \nu_+ \mu_+ + \nu_- \mu_-$，其中每个离子满足$\mu_i = \mu_i^\circ + RT\ln a_i$。由于各离子的活度$a_i$无法分别测量，定义**离子的平均活度** $a_\pm$与**离子的平均活度系数** $\gamma_\pm$为

$$
a_\pm^{\nu} \equiv a_+^{\nu_+} a_-^{\nu_-}, \qquad
\gamma_\pm^{\nu} \equiv \gamma_+^{\nu_+} \gamma_-^{\nu_-}, \qquad
a_\pm = \gamma_\pm\,\frac{b_\pm}{b^\circ},
$$

其中**离子的平均质量摩尔浓度** $b_\pm \equiv \left(b_+^{\nu_+} b_-^{\nu_-}\right)^{1/\nu}$，**平均离子计量数** $\nu_\pm \equiv \left(\nu_+^{\nu_+} \nu_-^{\nu_-}\right)^{1/\nu}$，于是$b_\pm = \nu_\pm b$。这样盐的化学势就取理想形式

$$
\mu = \mu^\circ + \nu RT \ln a_\pm, \qquad \mu^\circ \equiv \nu_+\mu_+^\circ + \nu_-\mu_-^\circ .
$$
:::

这个定义是与实验的休战，而非关于单个离子的陈述。溶液的每一个可测性质——蒸气压、凝固点、电池电动势——都只依赖于$\mu$，从而只依赖于单一组合$a_+^{\nu_+}a_-^{\nu_-}$，从不单独依赖$a_+$或$a_-$。$\gamma_\pm^\nu = \gamma_+^{\nu_+}\gamma_-^{\nu_-}$内部对$\gamma_+$与$\gamma_-$的拆分是一种约定（德拜-休克尔理论在低浓度下赋予二者相等的值，其他单离子标度则各有不同），但$\gamma_\pm$本身像蒸气压一样可测。对$\mathrm{CaCl_2}$（$\nu_+ = 1$，$\nu_- = 2$）：$\nu_\pm = (1^1 2^2)^{1/3} = 4^{1/3} = 1.587$，$b_\pm = 1.587\,b$，$\gamma_\pm = (\gamma_+ \gamma_-^2)^{1/3}$。对$\mathrm{Al_2(SO_4)_3}$：$\nu_\pm = (2^2 3^3)^{1/5} = 108^{1/5} = 2.551$。

::: example $0.020\ \mathrm{mol\,kg^{-1}}$氯化钙的平均活度 {#ex-mean-activity}
对$b = 0.020\ \mathrm{mol\,kg^{-1}}$、$25\,^\circ\mathrm{C}$的$\mathrm{CaCl_2(aq)}$，取$\gamma_\pm = 0.739$（扩展德拜-休克尔方程，下文算出）。求$b_\pm$、$a_\pm$，以及溶解盐化学势相对标准值的偏离$\mu - \mu^\circ$。
::: solution
由$\nu = 3$、$\nu_\pm = 4^{1/3} = 1.587$，
$$
b_\pm = 1.587 \times 0.020\ \mathrm{mol\,kg^{-1}} = 0.0317\ \mathrm{mol\,kg^{-1}}, \qquad
a_\pm = 0.739 \times 0.0317 = 0.0235 .
$$
于是
$$
\mu - \mu^\circ = 3RT\ln a_\pm = 3 \times 8.314 \times 298.15 \times \ln 0.0235\ \mathrm{J\,mol^{-1}} = -27.9\ \mathrm{kJ\,mol^{-1}} .
$$
若溶液是理想的（$\gamma_\pm = 1$），用$a_\pm = b_\pm/b^\circ = 0.0317$作同样计算将给出$-25.7\ \mathrm{kJ\,mol^{-1}}$：在此浓度下，离子相互作用使溶解的盐稳定了$2.2\ \mathrm{kJ\,mol^{-1}}$。注意因子$\nu = 3$如何放大了所有东西——每个化学式单元三个离子，三份对数那么大的稀释自由能。
:::
:::

::: warning 单离子活度系数永远无法测量 {#warn-single-ion}
一瓶$\mathrm{NaCl}$溶液不是两种独立溶质的混合物：电中性禁止只加$\mathrm{Na^+}$而不加$\mathrm{Cl^-}$。因此每一次热力学测量——凝固点降低、蒸气压下降、电池电动势——只能确定诸如$\gamma_+^{1}\gamma_-^{1}$（对 1:1 盐）的组合，永远得不到单独的$\gamma_+$。表列的"单离子"数值（$\gamma_{\mathrm{H^+}} \equiv \gamma_\pm(\mathrm{HCl})$，或某个选定约定的数值）正是如此：是有用的、内部自洽的约定，但不是可测的事实。学生在考试中最容易忽略的推论是：像"血液中$\mathrm{SO_4^{2-}}$的活度系数是$0.15$"这样的陈述只是一个依赖约定的数的简写；可测的陈述永远是关于某个电中性组合的。
:::

## 离子强度

溶液中一个离子的库仑能量由整个离子混合体系决定，而一个数就能把它组织起来。

::: definition 离子强度 {#def-ionic-strength}
溶液的**离子强度**为
$$
I \equiv \frac{1}{2}\sum_i b_i z_i^{2} ,
$$

即对所有离子的质量摩尔浓度乘以电荷数平方之和取一半。对单一电解质$\mathrm{M_{\nu_+}X_{\nu_-}}$：$I = \tfrac{1}{2}\left(\nu_+ z_+^2 + \nu_- z_-^2\right) b$，所以 1:1 盐的$I = b$，$\mathrm{CaCl_2}$等 2:1 盐的$I = 3b$，1:2 盐的$I = 3b$，$\mathrm{CuSO_4}$等 2:2 盐的$I = 6b$。对混合物，离子强度相加。电荷以平方进入：$0.010\ \mathrm{mol\,kg^{-1}}$的 2:2 电解质溶液（$I = 0.060$）对离子氛的负担是同浓度 1:1 电解质（$I = 0.010$）的六倍。
:::

::: example 离子强度的计算 {#ex-ionic-strength}
求$25\,^\circ\mathrm{C}$时下列溶液的$I$：(a) $0.010\ \mathrm{mol\,kg^{-1}}$的$\mathrm{KNO_3}$；(b) $0.010\ \mathrm{mol\,kg^{-1}}$的$\mathrm{K_2SO_4}$；(c) $0.020\ \mathrm{mol\,kg^{-1}}$的$\mathrm{CaCl_2}$；(d) $0.020\ \mathrm{mol\,kg^{-1}}$的$\mathrm{Na_2SO_4}$与$0.010\ \mathrm{mol\,kg^{-1}}$的$\mathrm{KCl}$的混合溶液。
::: solution
**(a)** $I = \tfrac{1}{2}\left[(0.010)(1) + (0.010)(1)\right] = 0.010\ \mathrm{mol\,kg^{-1}}$。
**(b)** $b(\mathrm{K^+}) = 0.020$，$b(\mathrm{SO_4^{2-}}) = 0.010$：$I = \tfrac{1}{2}\left[(0.020)(1) + (0.010)(4)\right] = 0.030\ \mathrm{mol\,kg^{-1}}$。
**(c)** $b(\mathrm{Ca^{2+}}) = 0.020$，$b(\mathrm{Cl^-}) = 0.040$：$I = \tfrac{1}{2}\left[(0.020)(4) + (0.040)(1)\right] = 0.060\ \mathrm{mol\,kg^{-1}}$。
**(d)** $b(\mathrm{Na^+}) = 0.040$，$b(\mathrm{SO_4^{2-}}) = 0.020$，$b(\mathrm{K^+}) = 0.010$，$b(\mathrm{Cl^-}) = 0.010$：$I = \tfrac{1}{2}\left[0.040 + 4(0.020) + 0.010 + 0.010\right] = 0.070\ \mathrm{mol\,kg^{-1}}$。
(d) 的要点是实用规则：对稀混合物不必重新推导什么——分别算出每种盐的$I$再相加即可。另请注意 (b) 与 (c) 的$I$分别是其质量摩尔浓度的 3 倍：电荷平方加权不是细节，而是整个设计的核心。
:::
:::

## 离子氛与德拜-休克尔极限公式

::: history 从阿伦尼乌斯的离子到德拜-休克尔的离子氛 {#hist-ions}
阿伦尼乌斯（Arrhenius）在 1887 年提出：电解质在溶液中无论是否通电都解离为离子——这一主张在奥斯特瓦尔德（Ostwald）的帮助下冲破了化学界的抵制，并为阿伦尼乌斯赢得 1903 年诺贝尔化学奖。能斯特（Nernst）在 1888–1889 年证明：稀电解质的渗透行为与电极电位服从同一条对数定律，他的电池电位方程在人们尚能定义活度之前就使活度成为可测之物。对这一偏差的第一个统计理论是**贡特尔贝格极限公式**（Guntelberg limiting law，1922），它已经预言$\log\gamma_\pm$应正比于浓度的平方根。德拜（Debye）与休克尔（Hückel）在 1923 年发表于《物理学年鉴》（*Annalen der Physik*）的论文 "Zur Theorie der Elektrolyte" 中给出了机理：每个离子都被一层过剩的反号电荷——离子氛——所包围，离子氛屏蔽了离子并降低其自由能。同年，路易斯（Lewis）与兰德尔（Randall）出版了本图集所采用的活度标度著作 *Thermodynamics and the Free Energy of Chemical Substances*；在哥本哈根工作的毕耶鲁姆（Bjerrum）于 1926 年证明，相距在一个毕耶鲁姆长度之内的异号离子会形成瞬态**离子对**，这是对点离子图像的第一个修正。昂萨格（Onsager）在 1926–1927 年将理论推广到导电场，而那几年他正在建立不可逆过程热力学。
:::

这幅图像简单到一句话就能说清，丰富到让物理化学忙了一个世纪：*每个离子在运动与碰撞中，停留在反号离子附近的时间略多于同号离子附近，于是其时间平均环境是一团带净异号电荷的弥散云。*这团云屏蔽中心离子的场：在超过云层厚度的距离上，溶液根本分辨不出该离子带电。这个厚度就是本章的中心长度尺度。

::: definition 德拜长度 {#def-debye-length}
**德拜长度** $\lambda_\mathrm{D} = 1/\kappa$是溶液中离子静电势的衰减长度，其中
$$
\kappa^{2} = \frac{2\,N_\mathrm{A} e^{2} \rho_\mathrm{w}}{\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T}\, I ,
$$

$\rho_\mathrm{w}$为溶剂的质量密度。球形离子的势按$\exp(-\kappa r)/r$而非$1/r$衰减：离子氛把库仑场乘以屏蔽因子$\exp(-r/\lambda_\mathrm{D})$。在$25\,^\circ\mathrm{C}$的水中，$\lambda_\mathrm{D}/\mathrm{nm} = 0.304/\sqrt{I/(\mathrm{mol\,kg^{-1}})}$。
:::

::: example 离子氛有多厚？ {#ex-debye-length}
计算$25\,^\circ\mathrm{C}$水中（$\varepsilon_\mathrm{r} = 78.54$，$\rho_\mathrm{w} = 997\ \mathrm{kg\,m^{-3}}$）下列离子强度对应的$\lambda_\mathrm{D}$：(a) $I = 0.010\ \mathrm{mol\,kg^{-1}}$；(b) 海水，$I \approx 0.70\ \mathrm{mol\,kg^{-1}}$。
::: solution
**(a)** $\kappa^{2} = \dfrac{2 \times 6.022\times10^{23} \times \left(1.602\times10^{-19}\right)^{2} \times 997}{8.854\times10^{-12} \times 78.54 \times 1.381\times10^{-23} \times 298.15} \times 0.010 = 1.077\times10^{17}\ \mathrm{m^{-2}}$，故$\kappa = 3.28\times10^{8}\ \mathrm{m^{-1}}$，
$$
\lambda_\mathrm{D} = \frac{1}{\kappa} = 3.05\ \mathrm{nm}.
$$
**(b)** $\lambda_\mathrm{D} \propto I^{-1/2}$，所以$\lambda_\mathrm{D} = 3.05/\sqrt{70}\ \mathrm{nm} = 0.36\ \mathrm{nm}$——一个分子直径。在稀的实验室溶液中，离子氛是纳米尺度的蜂群；在海水中它只是一层反号离子的外壳，屏蔽之完全使得开阔海洋的化学在很大程度上由接近极限值的活度系数支配。注意 (a) 的尺度：$\lambda_\mathrm{D} = 3.05\ \mathrm{nm}$与$4\ \mathrm{nm}$的平均离子间距相当，这正是$0.01\ \mathrm{mol\,kg^{-1}}$就已非理想的原因。
:::
:::

::: widget plot
f: exp(-x/l)/x; 1/x
x: 0.05, 5
y: 0, 22
sliders: l=1:0.2:5:0.1
labels: \text{屏蔽势 } e^{-r/\lambda_\mathrm{D}}/r; \text{库仑势 } 1/r
caption: 溶液中离子的静电势（上曲线）随距离$r$的变化，距离与滑块$l$均以离子氛厚度$\lambda_\mathrm{D}$为单位。裸库仑场$1/r$（下曲线）是假设介质具有相同介电常数却不含任何其他离子时该离子产生的场；离子氛把它乘以$\exp(-r/\lambda_\mathrm{D})$，所以超过一个离子氛厚度之后，该离子对邻近离子实际上呈电中性。把$l$调小以模拟海水：场在一个分子直径内消失。把$l$调大以模拟河水：离子的影响所及甚远，溶液几乎理想。
:::

下面是核心结果。

::: theorem 德拜-休克尔极限公式 {#thm-limiting-law}
当$I \rightarrow 0$时，任何电解质的平均活度系数都服从
$$
\log\gamma_\pm = -A\,\lvert z_+ z_- \rvert\,\sqrt{I}, \qquad
A = \frac{e^{3}\sqrt{2 N_\mathrm{A}\rho_\mathrm{w}}}{8\pi\,(\ln 10)\,\left(\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T\right)^{3/2}} ,
$$

其中$I$以$\mathrm{mol\,kg^{-1}}$计。在$25\,^\circ\mathrm{C}$的水中，$A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$。该公式除电荷外不含任何离子特性：在低浓度下，所有$1{:}1$电解质有相同的$\gamma_\pm$，所有$2{:}2$电解质随$\sqrt{I}$下降快四倍，而溶剂只通过$\varepsilon_\mathrm{r}$与$\rho_\mathrm{w}$进入公式。
:::

::: proof
**第一步，线性化的泊松-玻尔兹曼方程。**在中心离子的场$\psi(r)$中，玻尔兹曼分布给出物种$i$的局部数密度$n_i = n_i^{\circ}\exp(-z_i e\psi/k_\mathrm{B}T)$。当$|z_i e\psi| \ll k_\mathrm{B}T$时指数线性化，电荷密度为$\rho_\mathrm{e} = \sum_i z_i e\,n_i \approx -\left(\sum_i n_i^{\circ} z_i^{2} e^{2}/k_\mathrm{B}T\right)\psi$。泊松方程$\nabla^{2}\psi = -\rho_\mathrm{e}/\varepsilon_{0}\varepsilon_\mathrm{r}$化为$\nabla^{2}\psi = \kappa^{2}\psi$，其中$\kappa^{2} = 2N_\mathrm{A} e^{2}\rho_\mathrm{w} I/(\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T)$，因为由$I$的定义有$\sum_i n_i^{\circ} z_i^{2} = 2 N_\mathrm{A}\rho_\mathrm{w} I$。

**第二步，屏蔽解。**$\nabla^{2}\psi = \kappa^{2}\psi$的球对称解为$\psi = C\,\mathrm{e}^{-\kappa r}/r$（增长解$\mathrm{e}^{+\kappa r}$在无穷远处被舍去）。远离中心处离子氛可忽略，场必须与中心离子$z_+ e$的裸库仑场匹配，故$C = z_+ e/4\pi\varepsilon_{0}\varepsilon_\mathrm{r}$：
$$
\psi(r) = \frac{z_+ e}{4\pi\varepsilon_{0}\varepsilon_\mathrm{r}}\,\frac{\mathrm{e}^{-\kappa r}}{r}.
$$

**第三步，离子氛自身的势。**仅*云*产生的势为$\psi_\text{cloud} = \psi - z_+e/4\pi\varepsilon_{0}\varepsilon_\mathrm{r} r$；取极限$r \rightarrow 0$（展开$\mathrm{e}^{-\kappa r} \approx 1 - \kappa r$）得常数$\psi_\text{cloud}(0) = -z_+ e\kappa/4\pi\varepsilon_{0}\varepsilon_\mathrm{r}$，而半径$r$内包含的云电荷$-z_+ e\,(1+\kappa r)\,\mathrm{e}^{-\kappa r}$在$r \rightarrow \infty$时趋于$-z_+ e$：离子氛恰好中和中心离子，且在几个$\lambda_\mathrm{D}$之内完成。

**第四步，充电功。**把中心离子的电荷从$0$逐渐建立到$z_+ e$；每一阶段的离子氛都正比于已建立的电荷，因此反抗云势所做的功是最终乘积的一半（贡特尔贝格充电论证）：
$$
w_i = \tfrac{1}{2} z_i e\,\psi_{\text{cloud},i}(0) = -\frac{z_i^{2} e^{2}\kappa}{8\pi\varepsilon_{0}\varepsilon_\mathrm{r}} .
$$

认定$\ln\gamma_i = w_i/k_\mathrm{B}T$（每个离子的超额自由能，以热能为单位），再按计量数平均：$\ln\gamma_\pm = (\nu_+\ln\gamma_+ + \nu_-\ln\gamma_-)/\nu$。电中性给出$\nu_+ z_+^{2} + \nu_- z_-^{2} = \nu\,|z_+ z_-|$（验证$\mathrm{CaCl_2}$：$(1\cdot4 + 2\cdot1)/3 = 2 = |2\times1|$），于是
$$
\ln\gamma_\pm = -\frac{|z_+ z_-|\,e^{2}\kappa}{8\pi\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T}.
$$

**第五步，读出公式。**代入$\kappa \propto \sqrt{I}$，把$\ln$换成$\log$，把常数归并为$A$；取$25\,^\circ\mathrm{C}$的$\varepsilon_\mathrm{r} = 78.54$、$\rho_\mathrm{w} = 997\ \mathrm{kg\,m^{-3}}$，得$A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$。在$I \rightarrow 0$的极限下每一步都是等式：玻尔兹曼因子的线性化由$|z_i e\psi_\text{cloud}(0)|/k_\mathrm{B}T \propto \sqrt{I} \rightarrow 0$控制。$\blacksquare$
:::

::: example 极限公式与实验的对照 {#ex-gamma-kcl}
用$A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$预测$25\,^\circ\mathrm{C}$、$b = 0.0010$、$0.010$、$0.10\ \mathrm{mol\,kg^{-1}}$时$\mathrm{KCl}$的$\gamma_\pm$，并与实测值$0.965$、$0.902$、$0.778$比较。
::: solution
对$\mathrm{KCl}$，$|z_+ z_-| = 1$，故$\log\gamma_\pm = -0.509\sqrt{b}$：
$$
b = 0.0010: \gamma_\pm = 10^{-0.0161} = 0.964; \qquad
b = 0.010: \gamma_\pm = 10^{-0.0509} = 0.889; \qquad
b = 0.10: \gamma_\pm = 10^{-0.161} = 0.690 .
$$
在$0.0010\ \mathrm{mol\,kg^{-1}}$处，预测与实验只差$0.001$——极限公式在其适用范围内是精确的。在$0.010$处低了$0.013$；在$0.10$处低了$0.088$，误差$11\,\%$。这一模式正是该理论的标志：$\log\gamma_\pm$只在原点附近线性于$\sqrt{I}$，偏差随电荷与浓度增大。下一个命题修正第一个缺陷；第二个缺陷是其后的警告主题。
:::
:::

::: widget plot
f: -A*zz*x
x: 0, 0.4
y: -0.85, 0.05
sliders: A=0.509:0.1:0.8:0.001; zz=1:1:4:1
labels: \log\gamma_\pm = -A\,\lvert z_+z_-\rvert\,\sqrt{I}
caption: 德拜-休克尔极限公式：$\log\gamma_\pm$对$\sqrt{I}$是过原点、斜率为$-A\lvert z_+z_-\rvert$的直线，电荷乘积$\lvert z_+z_-\rvert$与溶剂常数$A$由滑块设定（$0.509$对应$25\,^\circ\mathrm{C}$的水；介电常数只有水三分之一的溶剂大约把$A$放大五倍）。$2{:}2$电解质（$zz = 4$）偏离理想性的速度是$1{:}1$盐的四倍：在$\sqrt{I} = 0.1$处，$1{:}1$线位于$-0.05$（$\gamma_\pm = 0.89$），而$2{:}2$线位于$-0.20$（$\gamma_\pm = 0.63$）。由于离子的有限尺寸削弱了屏蔽，真实曲线会向直线*上方*弯曲——这正是扩展定律的主题。
:::

::: proposition 扩展德拜-休克尔方程与戴维斯方程 {#prop-extended}
允许离子只能接近到距离$a$（**离子尺寸参数**，基埃尔（Kiell，1937）列表：$\mathrm{K^+}$与$\mathrm{Cl^-}$为$300\ \mathrm{pm}$，$\mathrm{Ba^{2+}}$与$\mathrm{SO_4^{2-}}$为$500\ \mathrm{pm}$，$\mathrm{Ca^{2+}}$为$600\ \mathrm{pm}$），得到**扩展德拜-休克尔方程**
$$
\log\gamma_\pm = -\frac{A\,\lvert z_+ z_- \rvert\,\sqrt{I}}{1 + B a \sqrt{I}}, \qquad B = 3.28\times10^{9}\ \mathrm{m^{-1}\,kg^{1/2}\,mol^{-1/2}} \ \ (25\,^\circ\mathrm{C}),
$$

视电荷不同适用于$I \approx 0.01$–$0.05\ \mathrm{mol\,kg^{-1}}$。**戴维斯方程**（Davies equation）
$$
\log\gamma_i = -0.51\,z_i^{2}\left(\frac{\sqrt{I}}{1+\sqrt{I}} - 0.3\,I\right),
$$

是一个经验修正，能在$I \approx 0.1$内跟踪实测的单离子系数，是分析化学的常用工作公式。
:::

::: proof
泊松-玻尔兹曼的推导完全不变，只是边界条件移动了。在最接近距离球$r > a$之外仍是同一个屏蔽解，把场与中心离子库仑场的匹配点从无穷远移到$r = a$，就把$C = z_+e/4\pi\varepsilon_0\varepsilon_r$换成$C = z_+ e\,\mathrm{e}^{\kappa a}/4\pi\varepsilon_{0}\varepsilon_\mathrm{r}$，于是离子表面处云的势变为$\psi_\text{cloud}(a) = -z_+ e\kappa/(4\pi\varepsilon_{0}\varepsilon_\mathrm{r}(1+\kappa a))$。充电功与计量平均照定理进行，$\kappa a = Ba\sqrt{I}$就是式中出现的$B$项。戴维斯形式不是推导出来的而是拟合出来的：代换$\sqrt{I} \rightarrow \sqrt{I}/(1+\sqrt{I}) - 0.3I$在$I \rightarrow 0$时还原极限公式，并在中等$I$处把曲线向上弯回，模仿$\gamma_\pm$趋于极小值后在高浓度回升的行为——而这一回升是任何点电荷平衡理论都给不出来的，因为它来自离子自身的体积。
:::

::: warning 极限公式是极限的规律，不是稀溶液的规律 {#warn-validity}
在轻信一个算出的$\gamma_\pm$之前，值得了解三种失效。(i) **范围**：极限公式只在 1:1 盐$I \approx 0.005\ \mathrm{mol\,kg^{-1}}$、2:2 盐$I \approx 0.001$以下才在定量上可靠；在$I = 0.1$处，即使对$\mathrm{KCl}$也偏差$11\,\%$，对$\mathrm{ZnSO_4}$更是远为严重。(ii) **误差方向**：在中等$I$下理论把$\gamma_\pm$压得过低；实测系数经过一个极小值后*回升*，$\mathrm{NaCl}$在接近饱和时回升穿过$1$——水合壳使离子有效地排斥体积，而任何库仑模型都不包含这一点。(iii) **病根找错**：若算得的活度系数与实验不符，第一嫌疑是离子对的形成（像$\mathrm{MgSO_4}$这样的$2{:}2$盐即使在$0.01\ \mathrm{mol\,kg^{-1}}$也有可测比例的离子结成对）以及弱电解质的不完全解离，此时 [[thermodynamics/reaction-equilibrium]] 的平衡必须*连同*活度系数一起求解，而不是在其之后。
:::

## 活度与平衡：为什么盐能溶解盐

[[thermodynamics/reaction-equilibrium]] 的热力学平衡常数以活度书写，$K = \prod_i a_i^{\nu_i}$；化学家用浓度测得的是$K_c = \prod_i b_i^{\nu_i}$（或以摩尔浓度计）。两者之差恰好是活度系数：

::: proposition 热力学平衡常数与浓度平衡常数 {#prop-K-gamma}
对任何平衡，
$$
K = K_\gamma\, K_b, \qquad K_\gamma \equiv \prod_i \gamma_i^{\nu_i}, \qquad K_b \equiv \prod_i \left(b_i/b^\circ\right)^{\nu_i},
$$

因此尽管$K$是常数，$K_b = K/K_\gamma$却随离子强度而变。对与其离子平衡的难溶盐$\mathrm{M_{\nu_+}X_{\nu_-}(s)}$，$K_\mathrm{sp} = \gamma_\pm^{\nu}\,\left(b_\pm/b^\circ\right)^{\nu}$，而纯水中溶解度为$s_0$的盐，其摩尔溶解度$s$服从
$$
s = \frac{s_0}{\gamma_\pm(I)} \qquad \text{（当盐自身对 } I \text{ 的贡献可忽略时）}.
$$
:::

::: proof
把$a_i = \gamma_i b_i/b^\circ$代入$K = \prod a_i^{\nu_i}$并把乘积拆开。对盐：$\mathrm{M_{\nu_+}X_{\nu_-}(s) \rightleftharpoons \nu_+ M^{z_+} + \nu_- X^{z_-}}$给出$K_\mathrm{sp} = a_+^{\nu_+} a_-^{\nu_-} = a_\pm^{\nu} = \gamma_\pm^\nu b_\pm^\nu$；纯水中$b_\pm = \nu_\pm s_0$且$\gamma_\pm = 1$，而存在外来电解质时$b_\pm = \nu_\pm s$（盐自身对$I$的贡献可忽略时），故$\gamma_\pm^\nu s^\nu = s_0^\nu$，即$s = s_0/\gamma_\pm$。溶度积$K_\mathrm{sp}$是热力学常数；由实测浓度算出的"溶度积"则不是。
:::

::: corollary 异离子盐效应 {#cor-salt-effect}
向难溶盐中加入惰性电解质（无共同离子）总是提高盐的溶解度，因为在理论成立的整个范围内$\gamma_\pm < 1$。该效应的尺度为$\gamma_\pm^{-1} \approx 10^{A|z_+z_-|\sqrt{I}}$：在$I = 0.01$时对 1:1 盐约为百分之十，对同$I$的 2:2 盐为百分之几十，对高电荷离子则大得惊人。这就是分析化学中的**异离子盐效应**（盐效应），它解释了为什么定量沉淀从不在高离子强度介质中进行，也解释了为什么同一个$K_\mathrm{sp}$可以对应好几个彼此矛盾的"实测溶解度"。
:::

::: example 盐助溶：硝酸钾中的硫酸钡 {#ex-baso4}
$\mathrm{BaSO_4}$在$25\,^\circ\mathrm{C}$的$K_\mathrm{sp} = 1.1\times10^{-10}$（CRC）。用$a = 500\ \mathrm{pm}$的扩展德拜-休克尔方程，求其在纯水及$0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$中的溶解度。
::: solution
纯水：$s_0 = \sqrt{1.1\times10^{-10}}\ \mathrm{mol\,kg^{-1}} = 1.05\times10^{-5}\ \mathrm{mol\,kg^{-1}}$。在$0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$中，盐自身离子对$I$的贡献仅$2\times10^{-5}$，故$I = 0.010$；由$|z_+z_-| = 4$，
$$
\log\gamma_\pm = -\frac{0.509 \times 4 \times 0.100}{1 + 3.28\times10^{9} \times 500\times10^{-12} \times 0.100} = -\frac{0.2036}{1.164} = -0.175, \qquad \gamma_\pm = 0.669 .
$$
于是$s = s_0/\gamma_\pm = 1.05\times10^{-5}/0.669 = 1.57\times10^{-5}\ \mathrm{mol\,kg^{-1}}$——一种与沉淀毫无共同离子的背景盐，竟使溶解度增加$50\,\%$。在$I = 0.10$处用戴维斯方程作同样计算得$\gamma_\pm = 0.37$、$s = 2.8\times10^{-5}\ \mathrm{mol\,kg^{-1}}$，几乎是纯水值的三倍。对称量分析者而言，这就是干净的重量分析与有偏差的分析之间的区别。
:::
:::

::: quiz
向$\mathrm{AgCl}$的饱和溶液中加入几滴$1\ \mathrm{mol\,kg^{-1}}$的$\mathrm{KNO_3}$（无共同离子）。会发生什么，为什么？
- [x] 更多的$\mathrm{AgCl}$溶解：$\gamma_\pm$下降，而$K_\mathrm{sp} = \gamma_\pm^{2} b_{\mathrm{Ag}^{+}} b_{\mathrm{Cl}^{-}}$只能靠提高浓度来恢复。
- [ ] 什么都不发生：$\mathrm{KNO_3}$与$\mathrm{AgCl}$没有共同离子。
- [ ] $\mathrm{AgCl}$进一步沉淀：多余的离子把平衡推回去。
- [ ] 溶度积$K_\mathrm{sp}$下降，溶液变为过饱和。
::: solution
$K_\mathrm{sp}$是活度的常数，不是浓度的常数。提高$I$使$\gamma_\pm$降低，于是*浓度*乘积$\gamma_\pm^2 b_{\mathrm{Ag}^+}b_{\mathrm{Cl}^-}$跌到$K_\mathrm{sp}$之下，固体溶解直到活度乘积恢复。同离子效应与异离子盐效应是同一方程被朝相反方向拉动——而且两者说的都是$K_\gamma$，从来不是$K$。
:::
:::

## pH 测的是活度，缓冲溶液最清楚

定义$\mathrm{pH} = -\log a_{\mathrm{H^+}}$是精确的，而实用定义——氢电极对标准电池的电动势，见 [[electrochemistry/cell-thermodynamics]]——测的正是那个活度，不是浓度。这个差别并非书生气：

::: example "pH 2" 盐酸的真实 pH {#ex-ph}
求$0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{HCl}$在$25\,^\circ\mathrm{C}$的 pH：(a) 按理想溶液处理；(b) 用实测的$\gamma_\pm(\mathrm{HCl}) = 0.904$。
::: solution
对 1:1 强酸，$a_{\mathrm{H^+}} a_{\mathrm{Cl^-}} = a_\pm^{2} = \gamma_\pm^{2} b^{2}$，而单离子约定取$a_{\mathrm{H^+}} = \gamma_\pm b$。(a) 理想：$\mathrm{pH} = -\log 0.010 = 2.00$。(b) 真实：$a_{\mathrm{H^+}} = 0.904 \times 0.010 = 9.04\times10^{-3}$，故$\mathrm{pH} = 2.044$。
pH 计读数是$2.04$而不是$2.00$，任何校准都说服不了它——这个偏差是化学问题，不是仪器问题。在$0.050\ \mathrm{mol\,kg^{-1}}$（$\gamma_\pm = 0.830$）处，偏移增大到$0.08$个 pH 单位；在加了盐的$0.1\ \mathrm{mol\,kg^{-1}}$缓冲溶液中，活度修正常常使 pH 移动$0.1$–$0.2$个单位，这就是为什么校准用的标准缓冲溶液一律以实测电动势认证，而从不按配方计算。
:::
:::

同一个修正贯穿溶液各章的所有平衡。用浓度书写的亨德森-哈塞尔巴尔赫（Henderson–Hasselbalch）缓冲公式$\mathrm{pH} \approx \mathrm{p}K_\mathrm{a} + \log\left(b_{\mathrm{A^-}}/b_{\mathrm{HA}}\right)$，实质是活度陈述$\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log\left(a_{\mathrm{A^-}}/a_{\mathrm{HA}}\right)$；加入中性盐会降低$\gamma_{\mathrm{A^-}}$并使缓冲溶液的 pH 升高，其升高量在$I = 0.01$时可由扩展德拜-休克尔方程预测到百分之一单位。[[general-chemistry-2/liquids-solutions]] 的酸碱平衡与沉淀溶解平衡都在等待这一精化；其底层恒等式$\Delta_\mathrm{r}G^\circ = -RT\ln K$则见 [[general-chemistry-2/entropy-free-energy|它们诞生之处]]。

## 电解质溶液的依数性：渗透系数

[[thermodynamics/mixtures]] 的依数性质数的是粒子，而电解质每个化学式单元提供$\nu$个——但离子氛把粒子协同地往回拉，于是数出来的数目总要少一点。记账工具就是渗透系数。

::: definition 渗透系数 {#def-osmotic}
电解质溶液的**渗透系数** $\phi$定义为
$$
\Pi V = \phi\,\nu\, n_\mathrm{B} R T ,
$$

其中$n_\mathrm{B}$为溶解的化学式单元的物质的量：对完全解离离子的理想溶液$\phi = 1$，而$\phi < 1$度量离子氛造成的亏缺。等价地，范特霍夫（van 't Hoff）因子为$i = \phi\nu$，凝固点降低为$\Delta T_\mathrm{f} = \phi\,\nu\,K_\mathrm{f} b$。当$b \rightarrow 0$时$\phi \rightarrow 1$严格成立，而德拜-休克尔理论在极限区给出$\phi - 1 = \tfrac{1}{3}\ln\gamma_\pm$——对$0.010\ \mathrm{mol\,kg^{-1}}$的$\mathrm{KCl}$，$\ln\gamma_\pm = -0.118$预测$\phi = 0.961$，与实测值相差不到千分之一：离子氛在渗透压上的代价，恰是其在平均活度上代价的三分之一。
:::

::: example 氯化钠溶液的渗透压 {#ex-osmotic}
已知$0.10\ \mathrm{mol\,kg^{-1}}$ $\mathrm{NaCl}$在$25\,^\circ\mathrm{C}$的$\phi = 0.932$（罗宾逊-斯托克斯表），求其渗透压，并与完全解离的理想值比较。
::: solution
由$\nu = 2$、$b = 0.10\ \mathrm{mol\,kg^{-1}}$，有效粒子质量摩尔浓度为$\phi\nu b = 0.186\ \mathrm{mol\,kg^{-1}}$。取溶液密度为$1.0\ \mathrm{g\,cm^{-3}}$，则$0.186\ \mathrm{mol\,kg^{-1}}$即$0.186\times10^{3}\ \mathrm{mol\,m^{-3}}$，
$$
\Pi = \phi\nu b\,\rho RT = 0.186\times10^{3}\ \mathrm{mol\,m^{-3}} \times 8.314 \times 298.15\ \mathrm{J\,mol^{-1}} = 4.6\times10^{5}\ \mathrm{Pa} = 461\ \mathrm{kPa},
$$
而理想值$\nu b\,\rho RT = 496\ \mathrm{kPa}$（$4.9\ \mathrm{bar}$）：离子氛扣住了渗透压的$7\,\%$。范特霍夫因子是$i = 1.86$而不是$2$——这就是为什么$0.10\ \mathrm{mol\,kg^{-1}}$的$\mathrm{NaCl}$比纯水低约$0.35\ \mathrm{K}$凝固而不是$0.37\ \mathrm{K}$，也是为什么"等渗"生理盐水要按实测渗透压而不是按配方浓度来配制。
:::
:::

::: quiz
浓度同为$1.00\ \mathrm{mol\,kg^{-1}}$时，哪种溶液的凝固点最低？
- [x] $\mathrm{CaCl_2}$：每个化学式单元三个离子，且在此质量摩尔浓度下，它每个化学式单元提供的凝固点降低远多于其他选项。
- [ ] $\mathrm{NaCl}$：离子最小，效应最强。
- [ ] $\mathrm{Al_2(SO_4)_3}$：每个化学式单元五个离子，所以必赢。
- [ ] 三者在同一点凝固，因为依数性质不管化学。
::: solution
决定一切的是粒子数*乘以*渗透系数：降低值为$\phi\nu K_\mathrm{f} b$，把吉布斯-杜亥姆关系沿实测活度系数积分可得，在$1\ \mathrm{mol\,kg^{-1}}$处$\mathrm{NaCl}$的$\phi\nu \approx 1.85$，而$\mathrm{CaCl_2}$的$\phi\nu \approx 3.2$——那里$\phi$本身已超过$1$，因为水合离子排斥体积，把水的逸出趋势*推高*了。陷阱在$\mathrm{Al_2(SO_4)_3}$：原则上每个化学式单元五个离子，但在$1\ \mathrm{mol\,kg^{-1}}$（$I = 15$！）处，活度理论早已远离一切极限公式，离子对的形成与水解都很严重，五个离子的承诺兑现不了。依数性质数的是*自由*粒子，而在高离子强度下，离子氛和离子对扣住了其中许多。
:::
:::

::: widget plot
f: exp(-2.303*A*sqrt(x)); exp(-2.303*2*A*sqrt(x)); exp(-2.303*4*A*sqrt(x))
x: 0, 0.1
y: 0, 1.05
sliders: A=0.509:0.1:0.8:0.001
labels: 1:1; 1:2; 2:2
caption: 把极限公式写成$\gamma_\pm = 10^{-A\lvert z_+z_-\rvert\sqrt{I}}$，画出$1{:}1$、$1{:}2$（或$2{:}1$）与$2{:}2$型电解质的曲线，横轴为离子强度$I$（滑块：溶剂常数$A$）。电荷通过$\lvert z_+z_-\rvert$放大下降：在$I = 0.05$处，$1{:}1$盐尚在$\gamma_\pm = 0.77$，而$2{:}2$盐已跌到$0.35$——若无视这一点，涉及这些离子的每个平衡常数都会差出偏差的平方。画的是*极限*公式：真实的$2{:}2$数据几乎立刻就在这些线上方弯回，这正是适用性警告的图像内容。
:::

## 后续内容

平均活度系数是 [[thermodynamics/mixtures]] 开启的活度故事的电解质篇章：同样的$\mu_i = \mu_i^\circ + RT\ln a_i$，同样的标准态记账，如今加上电中性所迫的平均值技巧。把$\gamma_\pm$带进 [[electrochemistry/cell-thermodynamics]]，它就变得能以伏特计的精度测量——无液体接界电池的电动势就是$\ln a_\pm$的直接读数，也正是本书所引数据历史上真正的获得途径。把活度代入$\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$，[[thermodynamics/reaction-equilibrium]] 的每个平衡都获得自己的$K_\gamma$因子；[[thermodynamics/mixtures]] 的凝固点与渗透压推导以$\phi$打头重新出现；而当液相是盐水时，[[thermodynamics/phase-equilibria]] 的相图也随之弯曲。分子层面的"为什么"——水的$\varepsilon_\mathrm{r}$为何如此之大，水合在熵上的代价为何——属于 [[statistical-thermodynamics/real-gases-liquids]]；而离子氛的气相祖先（带电粒子的第二维里系数）则是同一个玻尔兹曼平均在 [[general-chemistry-1/gases]] 更朴素舞台上的上演。

::: summary
- 离子通过除以$\varepsilon_\mathrm{r}$的库仑势相互作用；在水中毕耶鲁姆长度为$0.71\ \mathrm{nm}$，所以即使$0.01\ \mathrm{mol\,kg^{-1}}$的溶液也是强耦合的，强电解质在糖尚属理想的浓度下就已非理想。
- 单离子活度不可测：电中性使只有离子的平均活度$a_\pm^\nu = a_+^{\nu_+} a_-^{\nu_-}$与$\gamma_\pm^\nu = \gamma_+^{\nu_+}\gamma_-^{\nu_-}$才有物理意义，且$b_\pm = \nu_\pm b$。
- 离子强度$I = \tfrac{1}{2}\sum b_i z_i^2$以电荷平方加权；对混合物可相加，而且是极限公式唯一看得见的浓度变量。
- 离子氛在德拜长度$\lambda_\mathrm{D} = 0.304\ \mathrm{nm}/\sqrt{I/(\mathrm{mol\,kg^{-1}})}$（水，$25\,^\circ\mathrm{C}$）上屏蔽每个离子，屏蔽后的势按$\mathrm{e}^{-\kappa r}/r$衰减。
- 德拜-休克尔极限公式$\log\gamma_\pm = -A|z_+z_-|\sqrt{I}$（$25\,^\circ\mathrm{C}$时$A = 0.509$）不含任何离子专属参数，在极限下是精确的；扩展公式（离子尺寸$a$）与戴维斯方程把它推广到$I \approx 0.1$。
- $K = K_\gamma K_b$：热力学常数是常数，浓度商不是——于是有异离子盐效应$s = s_0/\gamma_\pm$，它在$I = 0.01$时使$\mathrm{BaSO_4}$的溶解度提高$50\,\%$。
- pH 测的是$a_{\mathrm{H^+}}$而非$b_{\mathrm{H^+}}$；依数性质测的是$\phi\nu$而非$\nu$——渗透系数数的正是离子氛扣住的那部分粒子。
:::

## 练习

::: exercise 单一盐的离子强度 {level=1 check="0.060"}
计算$0.020\ \mathrm{mol\,kg^{-1}}$ $\mathrm{CaCl_2(aq)}$的离子强度。（$I$以$\mathrm{mol\,kg^{-1}}$计。）
::: solution
$b(\mathrm{Ca^{2+}}) = 0.020$，$b(\mathrm{Cl^-}) = 0.040$，故$I = \tfrac{1}{2}\left[0.020\times 2^{2} + 0.040\times 1^{2}\right] = \tfrac{1}{2}(0.080 + 0.040) = 0.060\ \mathrm{mol\,kg^{-1}}$——质量摩尔浓度的三倍，正如$2{:}1$计量关系所要求。
:::
:::

::: exercise 极限公式的活度系数 {level=1 check="0.943"}
用$A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$，按极限公式计算$\mathrm{KNO_3}$在$I = 0.0025\ \mathrm{mol\,kg^{-1}}$的$\gamma_\pm$。（输入$\gamma_\pm$。）
::: solution
$\log\gamma_\pm = -0.509\times 1\times\sqrt{0.0025} = -0.509\times 0.050 = -0.0255$，故$\gamma_\pm = 10^{-0.0255} = 0.943$。在蔗糖与 1 相差不到$10^{-4}$的这个质量摩尔浓度上，理想性却偏离了$6\,\%$——电荷平方的杠杆尽在这一数之中。
:::
:::

::: exercise 德拜长度 {level=1 check="1.36"}
计算$25\,^\circ\mathrm{C}$水中$I = 0.050\ \mathrm{mol\,kg^{-1}}$的德拜长度。（$\lambda_\mathrm{D}$以 nm 计。）
::: solution
$\lambda_\mathrm{D} = 0.304/\sqrt{0.050}\ \mathrm{nm} = 1.36\ \mathrm{nm}$。离子强度变为四倍，离子氛厚度就减半——分母中的$\sqrt{I}$正是支配极限公式的同一个平方根，因为两者同出于同一个$\kappa$。
:::
:::

::: exercise 混合溶液的离子强度 {level=2 check="0.070"}
求$0.020\ \mathrm{mol\,kg^{-1}}$ $\mathrm{Na_2SO_4}$与$0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KCl}$混合溶液的离子强度。（$I$以$\mathrm{mol\,kg^{-1}}$计。）
::: solution
对全部四种离子求和：$b(\mathrm{Na^+}) = 0.040$，$b(\mathrm{SO_4^{2-}}) = 0.020$，$b(\mathrm{K^+}) = 0.010$，$b(\mathrm{Cl^-}) = 0.010$，故$I = \tfrac{1}{2}\left[0.040 + 4(0.020) + 0.010 + 0.010\right] = 0.070\ \mathrm{mol\,kg^{-1}}$。仅$0.020\ \mathrm{mol\,kg^{-1}}$的硫酸根就贡献了电荷加权总和$0.140$中的$0.080$：天然水、血液和土壤浸出液的离子强度正是由多价离子主导，原因就在于此。
:::
:::

::: exercise 盐效应对氯化银的作用 {level=2 check="1.49"}
$\mathrm{AgCl}$的$K_\mathrm{sp} = 1.8\times10^{-10}$（CRC）。用$a = 300\ \mathrm{pm}$的扩展德拜-休克尔方程，计算$\mathrm{AgCl}$在$0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$中的溶解度。（$s$以$10^{-5}\ \mathrm{mol\,kg^{-1}}$计。）
::: solution
$s_0 = \sqrt{1.8\times10^{-10}} = 1.34\times10^{-5}\ \mathrm{mol\,kg^{-1}}$。取$I = 0.010$、$|z_+z_-| = 1$：
$$
\log\gamma_\pm = -\frac{0.509\times 0.100}{1 + 3.28\times10^{9}\times 300\times10^{-12}\times 0.100} = -\frac{0.0509}{1.098} = -0.0463, \qquad \gamma_\pm = 0.899 .
$$
于是$s = s_0/\gamma_\pm = 1.34\times10^{-5}/0.899 = 1.49\times10^{-5}\ \mathrm{mol\,kg^{-1}}$，增加$11\,\%$。同样是这$11\,\%$，解释了为什么纯水实验与硝酸介质实验报告的$\mathrm{AgCl}$摩尔溶解度不同，也解释了为什么这个差异并不与"$K_\mathrm{sp}$是常数"矛盾。
:::
:::

::: exercise 真实酸的 pH {level=2 check="1.38"}
已知$0.050\ \mathrm{mol\,kg^{-1}}$处实测$\gamma_\pm(\mathrm{HCl}) = 0.830$，计算$25\,^\circ\mathrm{C}$、$0.050\ \mathrm{mol\,kg^{-1}}$ $\mathrm{HCl(aq)}$的 pH。（输入 pH。）
::: solution
$a_{\mathrm{H^+}} = \gamma_\pm b = 0.830 \times 0.050 = 0.0415$，故$\mathrm{pH} = -\log 0.0415 = 1.38$。只按浓度的答案是$1.30$：仪器与配方相差$0.08$个单位，而仪器是对的。在相同离子强度下的缓冲溶液，会经由亨德森-哈塞尔巴尔赫式中的$\gamma_{\mathrm{A^-}}$发生量级相当的移动。
:::
:::

::: exercise 推导计量恒等式 {level=3}
证明对任何电中性电解质都有$\nu_+ z_+^{2} + \nu_- z_-^{2} = \nu\,|z_+ z_-|$，并利用它把$\ln\gamma_\pm$写成由充电功$w_i = -z_i^{2}e^{2}\kappa/8\pi\varepsilon_{0}\varepsilon_\mathrm{r}$给出的$\ln\gamma_+$与$\ln\gamma_-$的计量平均。对$\mathrm{Al_2(SO_4)_3}$加以验证。
::: solution
电中性给出$\nu_+ z_+ = \nu_-|z_-| \equiv Q$。于是$\nu_+ z_+^{2} = Q z_+$，$\nu_- z_-^{2} = Q|z_-|$，二者之和为$Q(z_+ + |z_-|)$。另一方面$\nu = \nu_+ + \nu_- = Q/z_+ + Q/|z_-| = Q(z_+ + |z_-|)/|z_+ z_-|$，故$\nu_+ z_+^{2} + \nu_- z_-^{2} = \nu|z_+ z_-|$。对$\mathrm{Al_2(SO_4)_3}$：$\nu_+ = 2$，$z_+ = 3$，$\nu_- = 3$，$z_- = 2$；左边$2(9) + 3(4) = 30$，右边$5\times 6 = 30$。于是平均给出$\ln\gamma_\pm = (\nu_+ w_+ + \nu_- w_-)/\nu k_\mathrm{B}T = -|z_+z_-|e^{2}\kappa/8\pi\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B}T$：平均活度系数度量的是交叉电荷乘积而非各自的平方——这就是为什么在相同$I$下$2{:}2$盐的非理想性是$1{:}1$盐的四倍。
:::
:::

::: exercise 用戴维斯方程计算盐效应 {level=3 check="2.8"}
用戴维斯方程计算$\mathrm{BaSO_4}$（$K_\mathrm{sp} = 1.1\times10^{-10}$）在$25\,^\circ\mathrm{C}$、$0.10\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$中的溶解度。（$s$以$10^{-5}\ \mathrm{mol\,kg^{-1}}$计。）
::: solution
对 2:2 盐的平均系数，$\log\gamma_\pm$是$\log\gamma_{\mathrm{Ba^{2+}}}$与$\log\gamma_{\mathrm{SO_4^{2-}}}$的平均，即戴维斯式中取$z^{2} = 4$。由$\sqrt{0.10} = 0.316$：
$$
\log\gamma_\pm = -0.51\times 4\left(\frac{0.316}{1.316} - 0.030\right) = -2.04\times(0.240 - 0.030) = -0.428, \qquad \gamma_\pm = 0.373 .
$$
于是$s = s_0/\gamma_\pm = 1.05\times10^{-5}/0.373 = 2.8\times10^{-5}\ \mathrm{mol\,kg^{-1}}$——一种不提供共同离子的盐，竟使溶解度比纯水高出$170\,\%$。在此$I$下极限公式会给$\gamma_\pm = 0.23$，算出的溶解度还要再高三分之二；取$a = 500\ \mathrm{pm}$的扩展公式给出$\gamma_\pm = 0.38$。模型之间的分歧本身就是教训：在$I = 0.1$处，活度模型的*选择*比算术更重要。
:::
:::

::: exercise 盐背景下的萤石 {level=3 check="2.60"}
$\mathrm{CaF_2}$的$K_\mathrm{sp} = 3.9\times10^{-11}$（CRC）。用$a = 600\ \mathrm{pm}$的扩展德拜-休克尔方程，计算其在$0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$中的溶解度。（$s$以$10^{-4}\ \mathrm{mol\,kg^{-1}}$计。）
::: solution
纯水：$K_\mathrm{sp} = 4s_0^{3}$给出$s_0 = (3.9\times10^{-11}/4)^{1/3} = 2.14\times10^{-4}\ \mathrm{mol\,kg^{-1}}$。盐自身离子贡献$I \approx 3s \approx 6\times10^{-4} \ll 0.010$，故$I = 0.010$；由$|z_+z_-| = 2$：
$$
\log\gamma_\pm = -\frac{0.509\times 2\times 0.100}{1 + 3.28\times10^{9}\times 600\times10^{-12}\times 0.100} = -\frac{0.1018}{1.197} = -0.0850, \qquad \gamma_\pm = 0.822 .
$$
由于$K_\mathrm{sp} = \gamma_\pm^{3}(4s^{3})$，溶解度为$s = s_0/\gamma_\pm = 2.14\times10^{-4}/0.822 = 2.60\times10^{-4}\ \mathrm{mol\,kg^{-1}}$。注意指数的记账：$2{:}1$盐在$K_\mathrm{sp}$中带$\gamma_\pm^{3}$，但开立方后仍回到同一条普适规律$s = s_0/\gamma_\pm$——盐效应取决于活度系数，而非计量关系。
:::
:::
