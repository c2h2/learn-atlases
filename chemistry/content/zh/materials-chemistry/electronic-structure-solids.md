铜的导电能力比金刚石好$10^{20}$倍，硅介于二者之间，而每一百万个硅原子中只要替换一个磷原子，它的电导率就能改变一百万倍。砷化镓高效地发光，硅却几乎不发光，尽管二者的带隙相近。按最简单的电子计数应为金属的氧化镍，却是一种绿色的绝缘体。解释这样的事实，并按选定的电子性质设计材料，都需要一幅定量的图像，说明电子在无限的周期性固体中如何运动。

[[bonding-structure/metallic-bonding]]章曾定性引入能带：大分子的分子轨道挤成连续的能量带，而这些能带的填充情况决定固体是金属、半导体还是绝缘体。这里我们让这幅图像定量化。我们从原子轨道出发为一维链搭建能带，看出它的宽度如何依赖于重叠；引入波矢$k$、布洛赫（Bloch）定理与态密度；处理自由电子这一相反极限以求出金属的费米能；然后建立半导体中电子与空穴的统计：本征载流子浓度、掺杂、费米能级的位置，以及直接带隙与间接带隙。最后一节说明能带理论在何处失效。

## 从轨道到能带：紧束缚链

化学家搭建能带，就像搭建分子轨道（[[bonding-structure/molecular-orbitals]]）一样：作为原子轨道的线性组合。最简单的情形是由$N$个全同原子组成的链，间距为$a$，每个原子贡献一个以原子$n$为中心的$s$轨道$\phi_n$。与休克尔理论（[[quantum-chemistry/huckel-theory]]）一样，令库仑积分$\alpha = \langle\phi_n\vert\hat H\vert\phi_n\rangle$，近邻之间的共振积分$\beta = \langle\phi_n\vert\hat H\vert\phi_{n\pm1}\rangle$（对$s$轨道为负），并忽略重叠以及近邻以外的相互作用。

::: definition 布洛赫定理与波矢 {#def-bloch}
在具有晶格周期$a$的势场中，单电子波函数可以选成满足
$$
\psi_k(x + a) = e^{ika}\,\psi_k(x),
$$ {#eq-bloch}
也就是说，平移一个晶格间距给$\psi$乘上一个相位。指标$k$是**波矢**；$k$与$k + 2\pi/a$描述同一个态，所以所有互不相同的态的$k$都在**第一布里渊区**$-\pi/a < k \le \pi/a$内。对$N$个原子组成的链取周期性边界条件（$\psi(x + Na) = \psi(x)$），则$e^{ikNa} = 1$，于是$k = 2\pi j/(Na)$，区内有$N$个允许的取值：每个原子轨道对应一个态，与任何LCAO处理相同。在三维中$k$成为矢量，布里渊区成为倒空间中的一个多面体（[[materials-chemistry/diffraction#prop-laue]]）。
:::

::: proposition 链的紧束缚能带 {#prop-tight-binding}
对近邻共振积分为$\beta$的$s$轨道链，晶体轨道及其能量为
$$
\psi_k = \frac{1}{\sqrt N}\sum_{n=0}^{N-1} e^{ikna}\,\phi_n, \qquad E(k) = \alpha + 2\beta\cos ka.
$$ {#eq-tb}
能带从$\alpha + 2\beta$（$k = 0$处，所有轨道同相，完全成键）延伸到$\alpha - 2\beta$（$k = \pm\pi/a$处，符号交替，完全反键）：其**带宽**为$W = 4\lvert\beta\rvert$，与$N$无关。在每个原子有$z$个近邻的晶格中，同一近似下带宽为$W = 2z\lvert\beta\rvert$。
:::

::: proof
组合$\psi_k$满足布洛赫定理：把$n$换成$n + 1$使每个系数都乘上$e^{ika}$。作用$\hat H$并向$\phi_m$投影。只有$\phi_m$及其两个近邻有贡献：
$$
\langle\phi_m\vert\hat H\vert\psi_k\rangle = \frac{1}{\sqrt N}\left(\alpha e^{ikma} + \beta e^{ik(m-1)a} + \beta e^{ik(m+1)a}\right) = \frac{e^{ikma}}{\sqrt N}\left(\alpha + 2\beta\cos ka\right).
$$
右端对每个$m$都是$(\alpha + 2\beta\cos ka)$乘以$\langle\phi_m\vert\psi_k\rangle = e^{ikma}/\sqrt N$，所以$\psi_k$是本征函数，$E(k) = \alpha + 2\beta\cos ka$。余弦的极值给出带边。在三维中，对简单立方晶格做同样的计算得$E(\mathbf{k}) = \alpha + 2\beta(\cos k_xa + \cos k_ya + \cos k_za)$，$z = 6$时宽度为$12\lvert\beta\rvert = 2z\lvert\beta\rvert$。
:::

由此得出三条化学经验。**带宽度量重叠**：金属原子间漫散的$s$、$p$轨道给出宽$5$–$15\ \mathrm{eV}$的能带；收缩的$3d$轨道给出$3$–$6\ \mathrm{eV}$的$d$带；镧系被屏蔽的$4f$轨道给出的能带窄到$f$电子基本定域。**压缩使能带变宽**：加压时$\lvert\beta\rvert$增大，这就是大多数绝缘体在足够高的压力下变为金属的原因（碘在约$16\ \mathrm{GPa}$附近，氢大概在$400\ \mathrm{GPa}$附近）。**能带底部成键、顶部反键**，所以把能带填过半满以上会削弱结合：过渡金属的内聚能在每个系的中部附近达到极大，那里$d$带的成键一半恰好填满。

::: widget plot
f: -sqrt(2 + 2*d^2 + 2*(1 - d^2)*cos(x)); sqrt(2 + 2*d^2 + 2*(1 - d^2)*cos(x))
x: -pi, pi
y: -2.3, 2.3
piticks: true
sliders: d=0:0:0.6:0.01
labels: \text{下能带}; \text{上能带}
caption: 链的能带，以$\lvert\beta\rvert$为单位、取$\alpha = 0$，晶胞含两个原子（长度$2a$），横轴为$x = 2ka$并取其布里渊区。共振积分在$\beta(1 + d)$与$\beta(1 - d)$之间交替，解$2 \times 2$久期问题得$E = \pm\lvert\beta\rvert\sqrt{(1 + d)^2 + (1 - d)^2 + 2(1 - d^2)\cos x}$。$d = 0$（均匀链）时两条曲线为$\pm2\lvert\beta\rvert\cos(x/2)$，即[[#eq-tb]]的能带$\alpha + 2\beta\cos ka$折入较小布里渊区后的形状，二者在区边界处相切。任何二聚化$d > 0$都会在此处打开一个$4d\lvert\beta\rvert$的带隙。对半满能带（每原子一个电子），只有下能带被占据，且带隙打开时其能量降低：这就是**佩尔斯（Peierls）畸变**，它使聚乙炔成为单双键交替的半导体，而不是一维金属。
:::

## 态密度

许多性质不取决于$E(k)$本身，而取决于每个能量区间内有多少个态。

::: definition 态密度 {#def-dos}
**态密度**$g(E)$的定义使$g(E)\,dE$为能量介于$E$与$E + dE$之间的单电子态数目（计入两种自旋取向）。它对一个能带的积分等于构成该能带的原子轨道数目的两倍。电子数为$\int g(E)f(E)\,dE$，其中$f(E) = 1/\{1 + \exp[(E - \mu)/k_\mathrm{B}T]\}$是费米-狄拉克分布，$\mu$是电子的化学势；$T = 0$时$\mu$等于**费米能**$E_\mathrm{F}$，即最高占据态的能量。
:::

对紧束缚链，允许的$k$等间距分布，间隔$2\pi/Na$，所以每种自旋在$dk$内的态数为$(Na/2\pi)\,dk$。$+k$与$-k$处的态能量相同，于是计入自旋
$$
g(E) = 2 \times 2 \times \frac{Na}{2\pi}\left\lvert\frac{dk}{dE}\right\rvert = \frac{2Na}{\pi}\,\frac{1}{\lvert 2\beta a\sin ka\rvert} = \frac{2N}{\pi\sqrt{4\beta^2 - (E - \alpha)^2}}.
$$
态密度在带中心最小，那里$E(k)$最陡；在带边发散，那里能带最平。这类**范霍夫（van Hove）奇点**（在三维中被软化为有限的高峰或拐点）在光电子谱以及纳米管的光吸收中清晰可见（[[materials-chemistry/nanomaterials]]）。

### 自由电子：相反的极限

在钠、铝这类简单金属中，价电子如此离域，以至于更好的出发点是**自由电子模型**：体积$V$的箱中势能为零的电子，能量$E = \hbar^2k^2/2m_e$，波矢在每个方向上按间距$2\pi/L$排成网格（$V = L^3$）。

::: proposition 自由电子金属的费米能与态密度 {#prop-fermi}
对体积$V$中的$N$个自由电子，数密度$n = N/V$，态密度与费米能为
$$
g(E) = \frac{V}{2\pi^2}\left(\frac{2m_e}{\hbar^2}\right)^{3/2}E^{1/2}, \qquad E_\mathrm{F} = \frac{\hbar^2}{2m_e}\left(3\pi^2n\right)^{2/3}.
$$ {#eq-fermi}
$T = 0$时每电子的平均能量为$\tfrac35E_\mathrm{F}$。这些结果假定电子彼此独立、处于恒定势场中；实际金属中$m_e$要换成有效质量，费米面的形状也会偏离球面。
:::

::: proof
每个允许的$\mathbf{k}$占据$k$空间中$(2\pi/L)^3 = 8\pi^3/V$的体积。$T = 0$时，$N$个电子每个$\mathbf{k}$两个，填满半径为$k_\mathrm{F}$的球（**费米球**）内的所有态：
$$
N = 2 \times \frac{\tfrac43\pi k_\mathrm{F}^3}{8\pi^3/V} = \frac{Vk_\mathrm{F}^3}{3\pi^2} \quad\Longrightarrow\quad k_\mathrm{F} = (3\pi^2n)^{1/3}, \qquad E_\mathrm{F} = \frac{\hbar^2k_\mathrm{F}^2}{2m_e} = \frac{\hbar^2}{2m_e}(3\pi^2n)^{2/3}.
$$
对半径$k$的球用同一论证得$E$以下的态数：$N(E) = (V/3\pi^2)(2m_eE/\hbar^2)^{3/2}$，求导得$g(E) = dN/dE = (V/2\pi^2)(2m_e/\hbar^2)^{3/2}E^{1/2}$。由于$g \propto E^{1/2}$，平均能量为$\int_0^{E_\mathrm{F}}Eg\,dE/\int_0^{E_\mathrm{F}}g\,dE = \tfrac35E_\mathrm{F}$。
:::

::: example 钠与铜的费米能 {#ex-fermi}
钠每立方米有$n = 2.65\times10^{28}$个导电电子（每原子一个），铜$n = 8.47\times10^{28}\ \mathrm{m^{-3}}$。计算钠的$E_\mathrm{F}$、$k_\mathrm{F}$与费米速度，以及铜的$E_\mathrm{F}$。把$E_\mathrm{F}$与室温下的$k_\mathrm{B}T$比较。
::: solution
对钠，$3\pi^2n = 7.846\times10^{29}\ \mathrm{m^{-3}}$，$k_\mathrm{F} = (7.846\times10^{29})^{1/3} = 9.22\times10^9\ \mathrm{m^{-1}}$，
$$
E_\mathrm{F} = \frac{(1.0546\times10^{-34})^2 \times (9.22\times10^9)^2}{2 \times 9.109\times10^{-31}} = 5.19\times10^{-19}\ \mathrm{J} = 3.24\ \mathrm{eV}.
$$
费米速度为$v_\mathrm{F} = \hbar k_\mathrm{F}/m_e = 1.07\times10^6\ \mathrm{m\,s^{-1}}$，约为光速的$0.4\ \%$。对铜，按$(8.47/2.65)^{2/3} = 2.17$缩放得$E_\mathrm{F} = 7.03\ \mathrm{eV}$。$298\ \mathrm{K}$时$k_\mathrm{B}T = 0.026\ \mathrm{eV}$，比$E_\mathrm{F}$小一百多倍：只有费米能级附近几个$k_\mathrm{B}T$以内的电子才能被热激发。这就是金属的电子热容只有每摩尔电子经典值$\tfrac32R$的约1 %的原因，而这个困惑在1927–28年由服从费米-狄拉克统计的自由电子模型解决了。
:::
:::

只有$E_\mathrm{F}$附近约$k_\mathrm{B}T$范围内的电子才能吸收热能，其数目正比于费米能级处的态密度$g(E_\mathrm{F})$。把费米-狄拉克分布按$k_\mathrm{B}T/E_\mathrm{F}$展开到一阶（索末菲展开，[[statistical-thermodynamics/quantum-statistics]]）得每摩尔自由电子的电子热容
$$
C_{V,\mathrm{el}} = \frac{\pi^2}{2}R\,\frac{k_\mathrm{B}T}{E_\mathrm{F}},
$$ {#eq-cel}
与$T$成正比。泡利顺磁性也由同一个因子$g(E_\mathrm{F})$决定，而[[materials-chemistry/energy-materials]]中的超导转变温度则由它通过电子-声子耦合决定。

::: example 钠的电子热容 {#ex-cel}
用[[#eq-cel]]计算钠（$E_\mathrm{F} = 3.24\ \mathrm{eV}$，每原子一个导电电子）在$300\ \mathrm{K}$的电子热容，并与晶格热容（约$3R$）比较。若晶格部分服从德拜$T^3$定律$C_\mathrm{lat} = 1944\,(T/\Theta_\mathrm{D})^3\ \mathrm{J\,K^{-1}\,mol^{-1}}$（$\Theta_\mathrm{D} = 158\ \mathrm{K}$），在什么温度下二者相等？
::: solution
$300\ \mathrm{K}$时$k_\mathrm{B}T/E_\mathrm{F} = 0.02585/3.24 = 7.98\times10^{-3}$，所以$C_{V,\mathrm{el}} = 4.935 \times 8.314 \times 7.98\times10^{-3} = 0.33\ \mathrm{J\,K^{-1}\,mol^{-1}}$，约为$3R = 24.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$的$1.3\ \%$。经典电子气会贡献$\tfrac32R = 12.5$，而实验上看不到这样的贡献。写成$C_{V,\mathrm{el}} = \gamma T$，$\gamma = (\pi^2/2)Rk_\mathrm{B}/E_\mathrm{F} = 4.935 \times 8.314 \times 8.617\times10^{-5}/3.24 = 1.09\times10^{-3}\ \mathrm{J\,K^{-2}\,mol^{-1}}$，与德拜项相等要求$\gamma T = 1944T^3/\Theta_\mathrm{D}^3$，于是$T^2 = \gamma\Theta_\mathrm{D}^3/1944 = 1.09\times10^{-3} \times 3.944\times10^6/1944 = 2.21$，$T = 1.5\ \mathrm{K}$。几开尔文以下，电子主导金属的热容；把$C/T$对$T^2$作图，截距即$\gamma$：这是对$g(E_\mathrm{F})$的直接测量。（钠实测的$\gamma$比自由电子值大约25 %，是电子有效质量增大的迹象。）
:::
:::

自由电子图像与紧束缚图像是同一故事的两端。给自由电子加上一个弱的周期势，会在布里渊区边界处打开带隙——那里电子波满足布拉格条件，形成集中在离子上或离子之间的驻波；把势增强到带隙很大，就回到窄的紧束缚能带。实际的能带结构用密度泛函理论（[[computational-chemistry/density-functional-theory]]）计算，介于两者之间。

::: quiz
紧束缚链中，若原子间距减小使$\lvert\beta\rvert$加倍，带宽与$k = 0$轨道的能量各会发生什么？
- [x] 带宽加倍，$k = 0$轨道能量下移。
- [ ] 带宽加倍，$k = 0$轨道能量上移。
- [ ] 带宽不变，因为它只依赖于$N$。
- [ ] 带宽减半，因为链里能容纳更多原子。
::: solution
$W = 4\lvert\beta\rvert$加倍。$k = 0$轨道的能量为$E = \alpha + 2\beta$，而$s$轨道的$\beta < 0$，$\lvert\beta\rvert$变大使它降低。带宽不依赖于$N$；增加原子只是在同一能量范围内增加更多的态。
:::
:::

## 半导体：电子与空穴

在硅这类半导体中，$0\ \mathrm{K}$下价带（主要由$sp^3$杂化轨道的成键组合构成）填满而导带（反键）全空，二者被带隙$E_\mathrm{g}$隔开：$300\ \mathrm{K}$时Si为$1.12\ \mathrm{eV}$，Ge为$0.66\ \mathrm{eV}$，GaAs为$1.42\ \mathrm{eV}$，GaN为$3.4\ \mathrm{eV}$。有限温度下有少量电子被激发越过带隙，留下**空穴**——价带顶附近空的态，行为如同正电荷载流子。带边附近$E(k)$近似抛物：电子$E = E_\mathrm{c} + \hbar^2k^2/2m_\mathrm{e}^*$，空穴$E = E_\mathrm{v} - \hbar^2k^2/2m_\mathrm{h}^*$，由此定义的**有效质量**编码了能带的曲率（曲率大、较宽的能带给出小的$m^*$与高迁移率的载流子）。

::: proposition 载流子浓度与质量作用定律 {#prop-mass-action}
在非简并半导体中（费米能级与两带边的距离都超过几个$k_\mathrm{B}T$），导带电子与空穴的浓度为
$$
n = N_\mathrm{c}\exp\!\left(-\frac{E_\mathrm{c} - \mu}{k_\mathrm{B}T}\right), \qquad p = N_\mathrm{v}\exp\!\left(-\frac{\mu - E_\mathrm{v}}{k_\mathrm{B}T}\right),
$$
其中$N_\mathrm{c} = 2(m_\mathrm{e}^*k_\mathrm{B}T/2\pi\hbar^2)^{3/2}$与$N_\mathrm{v} = 2(m_\mathrm{h}^*k_\mathrm{B}T/2\pi\hbar^2)^{3/2}$是能带的**有效态密度**。二者之积与费米能级和掺杂无关：
$$
np = n_\mathrm{i}^2 = N_\mathrm{c}N_\mathrm{v}\exp\!\left(-\frac{E_\mathrm{g}}{k_\mathrm{B}T}\right).
$$ {#eq-np}
未掺杂（本征）晶体中$n = p = n_\mathrm{i}$，费米能级位于$\mu = \tfrac12(E_\mathrm{c} + E_\mathrm{v}) + \tfrac12k_\mathrm{B}T\ln(N_\mathrm{v}/N_\mathrm{c})$，接近带隙中央。
:::

::: proof
带边附近单位体积的导带态密度就是[[#prop-fermi]]的自由电子结果，把$m_e \to m_\mathrm{e}^*$并以$E_\mathrm{c}$为能量零点：$g_\mathrm{c}(E) = (1/2\pi^2)(2m_\mathrm{e}^*/\hbar^2)^{3/2}(E - E_\mathrm{c})^{1/2}$。当$E - \mu \gg k_\mathrm{B}T$时，费米-狄拉克函数约化为玻尔兹曼因子$e^{-(E - \mu)/k_\mathrm{B}T}$。于是
$$
n = \int_{E_\mathrm{c}}^{\infty} g_\mathrm{c}(E)\,e^{-(E - \mu)/k_\mathrm{B}T}\,dE = \frac{1}{2\pi^2}\left(\frac{2m_\mathrm{e}^*}{\hbar^2}\right)^{3/2}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}\int_0^\infty \varepsilon^{1/2}e^{-\varepsilon/k_\mathrm{B}T}\,d\varepsilon.
$$
积分等于$\tfrac{\sqrt\pi}{2}(k_\mathrm{B}T)^{3/2}$，整理常数得$n = N_\mathrm{c}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}$，$N_\mathrm{c}$如前所述。在价带中用$1 - f(E) \approx e^{-(\mu - E)/k_\mathrm{B}T}$同样得到空穴的结果。两式相乘时$\mu$消去，$np = N_\mathrm{c}N_\mathrm{v}e^{-(E_\mathrm{c} - E_\mathrm{v})/k_\mathrm{B}T}$。令$n = p$并取对数即得本征费米能级。这一关系就是“反应”$\mathrm{nil} \rightleftharpoons e' + h^\bullet$的质量作用定律，与[[materials-chemistry/defects]]中的缺陷平衡完全类似，$E_\mathrm{g}$扮演着反应能的角色。
:::

::: example 本征硅 {#ex-intrinsic}
硅在$300\ \mathrm{K}$取$E_\mathrm{g} = 1.12\ \mathrm{eV}$、$N_\mathrm{c} = 3.2\times10^{19}\ \mathrm{cm^{-3}}$与$N_\mathrm{v} = 1.8\times10^{19}\ \mathrm{cm^{-3}}$（典型的表列数值）。(a) 计算$n_\mathrm{i}$，并求每$\mathrm{cm^3}$的$5.0\times10^{22}$个硅原子中有多大比例失去一个电子到导带。(b) 估算$400\ \mathrm{K}$时的$n_\mathrm{i}$，忽略$E_\mathrm{g}$的微小变化，但记住$N_\mathrm{c}N_\mathrm{v} \propto T^3$。
::: solution
(a) $k_\mathrm{B}T = 0.02585\ \mathrm{eV}$，$\sqrt{N_\mathrm{c}N_\mathrm{v}} = 2.40\times10^{19}\ \mathrm{cm^{-3}}$，
$$
n_\mathrm{i} = 2.40\times10^{19}\exp\!\left(-\frac{1.12}{2 \times 0.02585}\right) = 2.40\times10^{19} \times 3.91\times10^{-10} = 9.4\times10^{9}\ \mathrm{cm^{-3}},
$$
与公认的$1.0\times10^{10}\ \mathrm{cm^{-3}}$接近。比例为$9.4\times10^9/5.0\times10^{22} = 1.9\times10^{-13}$：大约每五万亿个原子中有一个。(b) $\sqrt{N_\mathrm{c}N_\mathrm{v}}$按$T^{3/2}$缩放，因子$1.54$，而$k_\mathrm{B}T = 0.03447\ \mathrm{eV}$，所以$n_\mathrm{i}(400\ \mathrm{K}) = 3.70\times10^{19}\exp(-16.25) = 3.3\times10^{12}\ \mathrm{cm^{-3}}$，$100\ \mathrm{K}$之内增长350倍。这一陡峭上升决定了硅器件的最高工作温度：一旦$n_\mathrm{i}$接近掺杂浓度，器件就失去了设计好的掺杂分布。
:::
:::

::: widget plot
f: log(2.4e19*(1000/(300*x))^1.5*exp(-g*x/(2*0.08617)))/log(10); log(2.4e19*(1000/(300*x))^1.5*exp(-1.12*x/(2*0.08617)))/log(10)
x: 1.5, 5
y: 0, 18
sliders: g=0.66:0.2:3.5:0.01
hlines: 15
labels: n_\mathrm{i},\ E_\mathrm{g} = g; n_\mathrm{i}\ \text{硅}
caption: [[#eq-np]]给出的本征载流子浓度（单位$\mathrm{cm^{-3}}$）的$\log_{10}$对$x = 1000\ \mathrm{K}/T$的曲线，所有曲线都用硅在$300\ \mathrm{K}$的$\sqrt{N_\mathrm{c}N_\mathrm{v}}$按$T^{3/2}$缩放，带隙$g$以eV计（滑条；Ge $0.66$，GaAs $1.42$，SiC $3.2$）。斜率为$-E_\mathrm{g}/2k_\mathrm{B}\ln10$，所以带隙可由斜率读出：指数里是因子2而不是1，因为每次激发产生两个载流子。$10^{15}\ \mathrm{cm^{-3}}$处的水平线是典型的轻掺杂水平；$n_\mathrm{i}$越过该线处材料变为本征。宽带隙的SiC与GaN到几百度仍保持非本征，这就是它们用于高温功率电子器件的原因。
:::

### 掺杂

把硅原子换成磷（第15族）就多出一个价带容纳不下的电子。它只是被松散地束缚在$\mathrm{P^+}$实上，因为吸引力被硅的介电常数屏蔽，而电子以导带的小有效质量运动。结果是$E_\mathrm{c}$下方紧邻处出现一个**施主**能级；类似地，硼（第13族）在$E_\mathrm{v}$上方紧邻处给出一个**受主**能级。用克罗格-维克记法：$\mathrm{P_{Si}^\times} \rightleftharpoons \mathrm{P_{Si}^\bullet} + e'$。

::: proposition 类氢施主 {#prop-hydrogenic}
相对介电常数为$\varepsilon_\mathrm{r}$、有效质量为$m^*$的半导体中，束缚在带一个单位电荷的实上的施主电子，其电离能与轨道半径为
$$
E_\mathrm{d} = \frac{m^*/m_e}{\varepsilon_\mathrm{r}^2}\times13.6\ \mathrm{eV}, \qquad a_\mathrm{d} = \frac{\varepsilon_\mathrm{r}}{m^*/m_e}\times0.529\ \text{Å}.
$$ {#eq-hydrogenic}
当$a_\mathrm{d}$为许多个晶格间距时模型成立，此时晶体可以当作连续介质处理；它忽略了施主的化学本性（“中心元胞修正”），这正是实测施主能级随元素而异的原因。
:::

::: proof
氢原子有$E = -m_ee^4/[2(4\pi\varepsilon_0)^2\hbar^2] = -13.6\ \mathrm{eV}$，$a_0 = 4\pi\varepsilon_0\hbar^2/(m_ee^2) = 0.529\ \text{Å}$（[[quantum-chemistry/hydrogen-atom]]）。在半导体中库仑势被屏蔽，$\varepsilon_0 \to \varepsilon_\mathrm{r}\varepsilon_0$，而带边附近电子的动能为$\hbar^2k^2/2m^*$，故$m_e \to m^*$。代入两式，结合能按$(m^*/m_e)/\varepsilon_\mathrm{r}^2$缩放，半径按$\varepsilon_\mathrm{r}/(m^*/m_e)$缩放。
:::

::: example 硅与砷化镓中的施主 {#ex-donor}
(a) 对硅（$\varepsilon_\mathrm{r} = 11.7$，电导有效质量$m^* = 0.26\,m_e$）估算$E_\mathrm{d}$；磷的实测值为$0.045\ \mathrm{eV}$。(b) 对GaAs（$\varepsilon_\mathrm{r} = 12.9$，$m^* = 0.067\,m_e$）求$E_\mathrm{d}$与$a_\mathrm{d}$。(c) 硅在$300\ \mathrm{K}$掺磷$1.0\times10^{16}\ \mathrm{cm^{-3}}$。设电子迁移率为$1350\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$，求$n$、$p$与电阻率。
::: solution
(a) $E_\mathrm{d} = 13.6 \times 0.26/11.7^2 = 0.026\ \mathrm{eV}$：量级正确，且约为室温下的$k_\mathrm{B}T$，所以施主几乎完全电离。实测的$0.045\ \mathrm{eV}$更大，因为电子波函数在中心元胞内有一定幅值，而屏蔽模型在那里失效。(b) $E_\mathrm{d} = 13.6 \times 0.067/12.9^2 = 0.0055\ \mathrm{eV}$（实测约$0.006\ \mathrm{eV}$），且$a_\mathrm{d} = 0.529 \times 12.9/0.067 = 102\ \text{Å}$，约18个晶格间距：连续介质模型很有根据，这就是它对GaAs有效得多的原因。(c) 所有施主都电离，所以$n = 1.0\times10^{16}\ \mathrm{cm^{-3}}$；由[[#eq-np]]，$p = n_\mathrm{i}^2/n = (1.0\times10^{10})^2/1.0\times10^{16} = 1.0\times10^4\ \mathrm{cm^{-3}}$。电导率$\sigma = ne\mu_\mathrm{e} = 1.0\times10^{16} \times 1.602\times10^{-19} \times 1350 = 2.16\ \mathrm{S\,cm^{-1}}$，电阻率$0.46\ \Omega\,\mathrm{cm}$，而本征硅约为$3\times10^5\ \Omega\,\mathrm{cm}$。每五百万个硅原子中一个磷原子，就使电导率提高了约$10^5$倍。
:::
:::

::: warning 空穴不是缺失的原子，施主也不是“额外的电流” {#warn-holes}
空穴是几乎满的带中一个*未被占据的电子态*，不是晶体中的空位。它表现为一个具有自己有效质量的正粒子，因为当某个态为空时，其余所有电子的集体运动等价于一个正电荷的运动。第二种误解是掺杂在本征载流子之上再增加载流子：由质量作用定律$np = n_\mathrm{i}^2$，加入施主会*减少*空穴。在上面的例子中空穴浓度从$10^{10}$降到了$10^4\ \mathrm{cm^{-3}}$。多子与少子相互关联，这正是p-n结的基础。
:::

### 直接带隙与间接带隙

带隙极值不一定出现在相同的$k$处。在**直接带隙**半导体（GaAs、InP、GaN、CdTe）中，价带顶与导带底都位于$k = 0$；在**间接带隙**半导体（Si、Ge、AlAs、GaP）中，导带底位于布里渊区的别处。能量$1$–$3\ \mathrm{eV}$的光子，其波矢$2\pi/\lambda \approx 10^7\ \mathrm{m^{-1}}$，比布里渊区尺度$\pi/a \approx 10^{10}\ \mathrm{m^{-1}}$小一千倍，所以光跃迁在$k$上几乎是竖直的。间接带隙半导体在带隙能量处的吸收或发射需要声子来提供动量，这是二阶过程，约慢一千倍。这就是为什么发光二极管与激光二极管用直接带隙的III-V族与II-VI族化合物制造而不用硅，以及为什么硅太阳能电池必须有几十微米厚才能吸收其带隙附近的太阳光，而直接带隙吸收层只需约一微米（[[materials-chemistry/energy-materials]]）。

半导体的带隙是一种化学性质。沿同一结构的等电子序列，带隙随离子性升高，因为成键（价带）态变得更像阴离子、反键（导带）态变得更像阳离子：Ge $0.66$，GaAs $1.42$，ZnSe $2.7\ \mathrm{eV}$。沿族向下，随重叠与带宽增大而降低：C（金刚石）$5.5$，Si $1.12$，Ge $0.66$，灰Sn $0\ \mathrm{eV}$。$\mathrm{Al}_x\mathrm{Ga}_{1-x}\mathrm{As}$与$\mathrm{In}_x\mathrm{Ga}_{1-x}\mathrm{N}$这类合金的带隙随组成平滑变化（近似线性，附一个小的“弯曲”项），LED的颜色就是这样调节的。光子能量与波长的关系为$\lambda = hc/E = 1240\ \mathrm{nm\,eV}/E$。

::: example 为蓝色LED挑选合金 {#ex-ingan}
$\mathrm{In}_x\mathrm{Ga}_{1-x}\mathrm{N}$的带隙常用$E_\mathrm{g}(x) = 3.42(1 - x) + 0.65x - bx(1 - x)\ \mathrm{eV}$描述，在GaN与InN之间插值并带弯曲参数$b$（报道值约在$1.4$到$2.5\ \mathrm{eV}$之间；取$1.4\ \mathrm{eV}$）。什么样的铟分数给出$450\ \mathrm{nm}$的发射？忽略弯曲项误差有多大？
::: solution
$E = 1239.8/450 = 2.755\ \mathrm{eV}$。展开得$3.42 - 2.77x - 1.4x + 1.4x^2 = 2.755$，即$1.4x^2 - 4.17x + 0.665 = 0$，其物理根为
$$
x = \frac{4.17 - \sqrt{4.17^2 - 4 \times 1.4 \times 0.665}}{2 \times 1.4} = \frac{4.17 - 3.697}{2.8} = 0.169.
$$
不计弯曲，线性插值给出$x = (3.42 - 2.755)/2.77 = 0.240$，那样发射会偏向绿色：弯曲项不可忽略。实际上发射还取决于应变以及器件中薄的InGaN量子阱里的量子限制，所以蓝光对应的组成按经验调在$x \approx 0.15$–$0.20$附近。鉴于$b$的不确定度，模型只支持两位有效数字（$x \approx 0.17$）。
:::
:::

## 能带理论何时失效

能带理论让每个电子在平均势场中独立运动。当同一个原子上两个电子之间的排斥——**哈伯德（Hubbard）$U$**——超过带宽$W$时，它就失效。氧化镍具有岩盐结构，$\mathrm{Ni^{2+}}$（$d^8$）：八面体场中$e_g$轨道的四个态上放两个电子，于是能带理论预言$e_g$带部分填充，应为金属。实际上NiO是一种带隙约$4\ \mathrm{eV}$的透明绿色绝缘体。$e_g$带很窄（$W \approx 1$–$2\ \mathrm{eV}$），而把一个电子从一个镍移到另一个镍，$\mathrm{Ni^{2+}} + \mathrm{Ni^{2+}} \rightarrow \mathrm{Ni^{3+}} + \mathrm{Ni^{+}}$，要花几个eV的$U$。这类**莫特（Mott）绝缘体**（以及相关的电荷迁移绝缘体——其最低激发把电子从氧移到金属）包括晚期$3d$金属的大多数氧化物、铜氧化物超导体的母体化合物，以及[[materials-chemistry/magnetic-optical]]中的许多磁性材料。这时[[coordination-chemistry/crystal-field-theory]]中定域的、配体场的描述反而是比能带理论更好的起点。莫特在1949年论证，氢原子晶格只有在临界间距以下、$n^{1/3}a_\mathrm{H} \gtrsim 0.25$时才会成为金属；把[[#eq-hydrogenic]]的施主半径$a_\mathrm{d}$代入同一判据，就预言了半导体变为金属时的掺杂水平。

## 后续内容

能带结构与载流子统计是本课程其余部分的基础。[[materials-chemistry/magnetic-optical]]把带隙与颜色、发光和荧光粉联系起来，把窄能带与磁性联系起来；[[materials-chemistry/nanomaterials]]展示能带如何在量子点中离散成分立能级，以及石墨烯的能带结构如何使其电子如同无质量；[[materials-chemistry/energy-materials]]在太阳能电池与热电材料中用到带隙、掺杂与p-n结，并追问某些金属为什么超导。物理学的处理（包括近自由电子模型与真实晶体的能带结构）见物理图谱（[凝聚态：能带结构](/learn/physics/lesson.php?c=condensed-matter&l=band-structure)与[半导体](/learn/physics/lesson.php?c=condensed-matter&l=semiconductors)），能带的DFT计算见[[computational-chemistry/density-functional-theory]]。

::: history
德鲁德（Paul Drude）经典的金属电子气模型（1900年）解释了欧姆定律，却解释不了很小的电子热容；索末菲（Arnold Sommerfeld）在1927–28年把费米-狄拉克统计用于电子气而解决了这一问题。布洛赫（Felix Bloch）1928年在莱比锡的博士论文证明了以他名字命名的定理；佩尔斯（Rudolf Peierls，1929–30年）与布里渊（Léon Brillouin，1930年）引入了布里渊区本身以及区边界处的能量间隙。威尔逊（Alan Wilson）1931年用能带的填充解释了金属、绝缘体与半导体的区别，并指出杂质如何控制半导体。巴丁（John Bardeen）、布拉顿（Walter Brattain）与肖克利（William Shockley）1947–48年在贝尔实验室制成了点接触晶体管与结型晶体管（1956年诺贝尔物理学奖）。莫特1949年关于金属-非金属转变的论文与哈伯德（John Hubbard）的模型（1963年）开创了关联电子理论。白川英树、艾伦·麦克迪尔米德（Alan MacDiarmid）与艾伦·黑格（Alan Heeger）1977年报道掺杂聚乙炔像金属一样导电，获2000年诺贝尔化学奖；赤崎勇、天野浩与中村修二的蓝色GaN发光二极管（1990年代初）获2014年诺贝尔物理学奖。
:::

::: summary
- 布洛赫定理用第一布里渊区中的波矢$k$标记晶体中的单电子态；由$N$个轨道构成的能带容纳$N$个$k$值。
- 紧束缚链$E(k) = \alpha + 2\beta\cos ka$，带宽$4\lvert\beta\rvert$（一般为$2z\lvert\beta\rvert$）：漫散的轨道与短的间距给出宽的能带；带底成键，带顶反键。
- 半满的一维能带对二聚化不稳定（佩尔斯畸变），它打开带隙，聚乙炔即是如此。
- 态密度$g(E)$统计单位能量内的态数；自由电子$g \propto E^{1/2}$，$E_\mathrm{F} = (\hbar^2/2m_e)(3\pi^2n)^{2/3}$，为几个eV，远高于$k_\mathrm{B}T$。
- 半导体中$n = N_\mathrm{c}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}$，$p = N_\mathrm{v}e^{-(\mu - E_\mathrm{v})/k_\mathrm{B}T}$，且无论掺杂如何都有$np = n_\mathrm{i}^2 = N_\mathrm{c}N_\mathrm{v}e^{-E_\mathrm{g}/k_\mathrm{B}T}$。
- 施主与受主是类氢能态，结合能按$(m^*/m_e)/\varepsilon_\mathrm{r}^2$缩放，只有几到几十meV，所以室温下已经电离。
- 直接带隙半导体高效地吸收与发射光；间接带隙的需要声子参与。带隙随离子性升高，沿族向下降低。
- 当在位排斥$U$超过带宽$W$时，能带理论失效，固体成为莫特绝缘体或电荷迁移绝缘体（NiO）。
:::

## 练习

::: exercise 带宽 {level=1 check="8.0"}
一列原子近邻间的$\beta = -2.0\ \mathrm{eV}$。带宽是多少？带底与带顶各出现在什么$k$处？（以eV输入带宽。）
::: solution
$W = 4\lvert\beta\rvert = 8.0\ \mathrm{eV}$。带底$\alpha + 2\beta = \alpha - 4.0\ \mathrm{eV}$在$k = 0$处；带顶$\alpha + 4.0\ \mathrm{eV}$在区边界$k = \pm\pi/a$处。
:::
:::

::: exercise GaAs的吸收边 {level=1 check="873"}
GaAs在$300\ \mathrm{K}$的直接带隙为$1.42\ \mathrm{eV}$。它从什么波长开始吸收？位于光谱的什么区域？（以nm输入波长，三位有效数字。）
::: solution
$\lambda = 1240\ \mathrm{nm\,eV}/1.42\ \mathrm{eV} = 873\ \mathrm{nm}$（用$hc = 1239.8\ \mathrm{nm\,eV}$），在近红外。GaAs吸收全部可见光，呈黑灰色；GaAs的LED与激光器在$870\ \mathrm{nm}$附近发射，用于遥控器与光通信。
:::
:::

::: exercise 铝的费米能 {level=1 check="11.7"}
铝每立方米有$6.02\times10^{28}$个原子，每个原子贡献三个价电子。用自由电子模型计算$E_\mathrm{F}$。（以eV输入$E_\mathrm{F}$，三位有效数字。）
::: solution
$n = 3 \times 6.02\times10^{28} = 1.81\times10^{29}\ \mathrm{m^{-3}}$。$E_\mathrm{F} = (\hbar^2/2m_e)(3\pi^2n)^{2/3} = 6.104\times10^{-39} \times (5.359\times10^{30})^{2/3}\ \mathrm{J} = 6.104\times10^{-39} \times 3.064\times10^{20} = 1.870\times10^{-18}\ \mathrm{J} = 11.7\ \mathrm{eV}$。（此处$\hbar^2/2m_e = 6.104\times10^{-39}\ \mathrm{J\,m^2}$。）
:::
:::

::: exercise 少数载流子 {level=2 check="1e5"}
硅在$300\ \mathrm{K}$（$n_\mathrm{i} = 1.0\times10^{10}\ \mathrm{cm^{-3}}$）掺砷$1.0\times10^{15}\ \mathrm{cm^{-3}}$。求电子与空穴浓度，并说明费米能级位于带隙中央的哪一侧。（以$\mathrm{cm^{-3}}$输入$p$。）
::: solution
砷是施主；完全电离，$n = 1.0\times10^{15}\ \mathrm{cm^{-3}}$。于是$p = n_\mathrm{i}^2/n = 10^{20}/10^{15} = 1.0\times10^5\ \mathrm{cm^{-3}}$。材料为n型，所以$\mu$位于带隙中央以上$k_\mathrm{B}T\ln(n/n_\mathrm{i}) = 0.02585\ln(10^5) = 0.30\ \mathrm{eV}$处。
:::
:::

::: exercise 带隙与载流子浓度 {level=2 check="0.0030"}
假设二者的$N_\mathrm{c}N_\mathrm{v}$相同，$300\ \mathrm{K}$下GaAs（$E_\mathrm{g} = 1.42\ \mathrm{eV}$）的$n_\mathrm{i}$比Si（$1.12\ \mathrm{eV}$）小多少倍？（输入比值$n_\mathrm{i}(\mathrm{GaAs})/n_\mathrm{i}(\mathrm{Si})$，两位有效数字。）
::: solution
$\exp[-(1.42 - 1.12)/(2 \times 0.02585)] = \exp(-5.80) = 0.0030$。（实际上GaAs的$N_\mathrm{c}$小得多，因为$m_\mathrm{e}^*$小，其$n_\mathrm{i}$约$2\times10^6\ \mathrm{cm^{-3}}$，还要更小：与Si之比约为$2\times10^{-4}$。）
:::
:::

::: exercise 锗中的施主 {level=2 check="6.4"}
锗的$\varepsilon_\mathrm{r} = 16.0$，电导有效质量$m^* = 0.12\,m_e$。用类氢模型估算施主的电离能与轨道半径。施主在$77\ \mathrm{K}$下电离吗？（以meV输入$E_\mathrm{d}$，两位有效数字。）
::: solution
$E_\mathrm{d} = 13.6\ \mathrm{eV} \times 0.12/256 = 6.4\ \mathrm{meV}$（P、As、Sb的实测值约$10$–$13\ \mathrm{meV}$）。$a_\mathrm{d} = 0.529 \times 16.0/0.12 = 71\ \text{Å}$。$77\ \mathrm{K}$时$k_\mathrm{B}T = 6.6\ \mathrm{meV}$，与$E_\mathrm{d}$相当；由于$N_\mathrm{c}$远大于典型的施主浓度，大多数施主仍然电离，这就是锗探测器能在液氮温度下工作的原因。
:::
:::

::: exercise 作为能带的休克尔理论 {level=3 check="8"}
把[[#eq-tb]]用于$N = 6$个原子组成的*环*（$N = 6$的周期性边界条件），求六个轨道的能量。用六个电子填充，并把总能量写成$6\alpha + x\beta$。与三个孤立双键（$6\alpha + 6\beta$）比较。（输入$x$。）
::: solution
$k = 2\pi j/6a$，$j = 0, \pm1, \pm2, 3$，于是$E_j = \alpha + 2\beta\cos(\pi j/3)$：$\alpha + 2\beta$（$j = 0$）、$\alpha + \beta$（$j = \pm1$，两次）、$\alpha - \beta$（$j = \pm2$，两次）、$\alpha - 2\beta$（$j = 3$）。这就是苯的休克尔能级。六个电子填满最低的三个：$2(\alpha + 2\beta) + 4(\alpha + \beta) = 6\alpha + 8\beta$，所以$x = 8$。与$6\alpha + 6\beta$相比，离域能为$2\beta$（负值，稳定化）。含$4n + 2$个电子的环填满一个闭合壳层；这就是从六个$k$点构成的能带看出的芳香性（[[organic-2/aromaticity]]）。
:::
:::

::: exercise 本征费米能级 {level=3 check="-7.4"}
(a) 从[[#prop-mass-action]]中$n$与$p$的表达式出发，导出本征费米能级。(b) 硅在$300\ \mathrm{K}$（$N_\mathrm{c} = 3.2\times10^{19}$，$N_\mathrm{v} = 1.8\times10^{19}\ \mathrm{cm^{-3}}$），它离带隙中央多远？(c) 为什么在带隙中央以下？（以meV输入$\mu - \tfrac12(E_\mathrm{c} + E_\mathrm{v})$，两位有效数字。）
::: solution
(a) $n = p$给出$N_\mathrm{c}e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T} = N_\mathrm{v}e^{-(\mu - E_\mathrm{v})/k_\mathrm{B}T}$。取对数：$\ln N_\mathrm{c} - (E_\mathrm{c} - \mu)/k_\mathrm{B}T = \ln N_\mathrm{v} - (\mu - E_\mathrm{v})/k_\mathrm{B}T$，所以$2\mu = E_\mathrm{c} + E_\mathrm{v} + k_\mathrm{B}T\ln(N_\mathrm{v}/N_\mathrm{c})$。(b) $\tfrac12 \times 25.85\ \mathrm{meV} \times \ln(1.8/3.2) = 12.93 \times (-0.575) = -7.4\ \mathrm{meV}$。(c) 导带的有效态密度较大，为保持$n = p$，费米能级必须离价带稍近一些。与$1.12\ \mathrm{eV}$的带隙相比这一偏移极小，所以对硅而言“带隙中央”是极好的近似；在$m_\mathrm{e}^* \ll m_\mathrm{h}^*$的InSb中它要大得多。
:::
:::

::: exercise 掺杂硅的电阻率 {level=2 check="0.46"}
计算含磷$1.0\times10^{16}\ \mathrm{cm^{-3}}$的硅在$300\ \mathrm{K}$的电阻率，取电子迁移率$1350\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$，忽略空穴。（以$\Omega\,\mathrm{cm}$输入电阻率，两位有效数字。）
::: solution
$\sigma = ne\mu = 1.0\times10^{16} \times 1.602\times10^{-19} \times 1350 = 2.16\ \mathrm{S\,cm^{-1}}$，所以$\rho = 1/\sigma = 0.46\ \Omega\,\mathrm{cm}$。（在这一掺杂下，由于电离施主的散射，实测迁移率约$1200\ \mathrm{cm^2\,V^{-1}\,s^{-1}}$，给出$0.5\ \Omega\,\mathrm{cm}$。）
:::
:::
