把一滴洁净的汞浸入氟化钠溶液，并通过恒电位仪接到一只参比电极上。在相对于饱和甘汞电极约$-1.6$到$+0.25\ \mathrm{V}$之间几乎不发生任何化学变化：汞太贵金属而不溶解，氟离子与钠离子太难氧化或还原，而水在汞上分解得极慢。然而每当改变电势，都有一个短暂的小电流流过，然后停止。界面表现得像一个电容器。电荷在金属侧以电子的过剩或亏缺积累，等量异号的离子电荷聚集在溶液侧。这两层符号相反的电荷——**电极双电层**——正是一切电化学发生之处：电子转移穿过它进行，其量级达$10^{9}\ \mathrm{V\,m^{-1}}$的电场正是驱动电极反应的力量，而它的电容在每一张伏安图上表现为背景电流，在超级电容器中表现为储存的能量。

本章按各种模型的历史顺序搭建双电层的结构，每个模型都修正前一个：亥姆霍兹（Helmholtz）的分子电容器，古伊（Gouy）与查普曼（Chapman）的扩散层，以及斯特恩（Stern）把两者结合起来的模型。我们首先需要一种测量电极电荷的方法，而汞凭其表面张力提供了这种方法。[[electrochemistry/cell-thermodynamics]]的热力学和[[thermodynamics/ions-in-solution]]的德拜长度是手边的工具。

## 极化与不极化界面

::: definition 理想极化电极与理想非极化电极 {#def-polarisable}
**理想极化电极**是在一定电势范围内没有任何电荷能穿过其界面的电极，因而电势的任何改变都只给界面充电；界面于是是一个纯电容器。**理想非极化电极**是通电时其电势不改变的电极，因为一个快速的可逆反应以可忽略的电势变化载运任意电流；界面于是实际上是一根短路线。金属的**表面电荷密度**$\sigma_\mathrm{M}$（单位$\mathrm{C\,m^{-2}}$或$\mu\mathrm{C\,cm^{-2}}$）由溶液中大小相等、符号相反的电荷$\sigma_\mathrm{S} = -\sigma_\mathrm{M}$平衡。$\sigma_\mathrm{M} = 0$时的电势是**零电荷电势**$E_\mathrm{pzc}$。界面的**微分电容**为
$$
C_\mathrm{d} = \left(\frac{\partial\sigma_\mathrm{M}}{\partial E}\right)_{T,p,\mu} ,
$$ {#eq-cd}
其中下标$\mu$表示溶液组成保持不变。
:::

实际电极介于两个理想之间。氟化钠中的汞与（在更窄的电势窗口内）除氧高氯酸中的铂接近理想极化。银-氯化银电极与饱和甘汞电极凭借大的交换电流（[[electrochemistry/electrode-kinetics]]）接近非极化——这正是参比电极所必需的。伏安法中的工作电极在其可极化的区间内使用，加入溶液中的电活性物种提供我们想研究的法拉第电流。

两个数量级方面的事实将贯穿始终。典型的双电层电容为$10$–$40\ \mu\mathrm{F\,cm^{-2}}$，所以$1\ \mathrm{V}$的变化存储约$20\ \mu\mathrm{C\,cm^{-2}}$——约每十到二十个表面金属原子对应一个电子。而电荷在金属侧只相隔不到一纳米的几分之一，所以电场大得惊人。电荷与间距都不为化学分析所及，但二者都能用电学方法测量。

## 电毛细管现象：用表面张力"称量"电荷

与电解质接触的汞的表面张力$\gamma$依赖于电势。加布里埃尔·李普曼（Gabriel Lippmann）在1875年用他的毛细管静电计测量了它：一根细玻璃毛细管中的汞柱，其弯月面高度使表面张力与静水压相平衡。把$\gamma$对$E$作图得到一条接近倒抛物线的曲线——**电毛细管曲线**——其极大在零电荷电势处。

::: proposition 李普曼方程 {#prop-lippmann}
对恒温、恒压、恒组成的理想极化电极，
$$
\left(\frac{\partial\gamma}{\partial E}\right)_{T,p,\mu} = -\sigma_\mathrm{M}, \qquad
\left(\frac{\partial^2\gamma}{\partial E^2}\right)_{T,p,\mu} = -C_\mathrm{d} .
$$ {#eq-lippmann}
若$C_\mathrm{d}$与电势无关，电毛细管曲线就是抛物线$\gamma = \gamma_\mathrm{max} - \tfrac{1}{2}C_\mathrm{d}(E - E_\mathrm{pzc})^2$。
:::

::: proof
把界面看作一个表面相。面积改变时其吉布斯能改变$\gamma\,\mathrm{d}A$，电荷改变时改变充电的电功。对恒$T$、恒$p$下界面的可逆改变，表面的吉布斯-杜亥姆方程（[[thermodynamics/mixtures]]的吉布斯吸附方程）推广到包含电荷为
$$
-\mathrm{d}\gamma = \sigma_\mathrm{M}\,\mathrm{d}E + \sum_i\Gamma_i\,\mathrm{d}\mu_i ,
$$
其中$\Gamma_i$是表面超额。电学一项的速记：组成固定时，在电势$E$下把表面扩大$\mathrm{d}A$。必须有额外电荷$\sigma_\mathrm{M}\,\mathrm{d}A$流入金属，对界面做的电功是$E\sigma_\mathrm{M}\,\mathrm{d}A$，所以单位面积的表面吉布斯能为$g = \gamma + E\sigma_\mathrm{M}$（至多差一常数）。组成固定时表面的基本关系$\mathrm{d}g = E\,\mathrm{d}\sigma_\mathrm{M}$（单位面积的充电功）于是给出$\mathrm{d}\gamma = \mathrm{d}g - E\,\mathrm{d}\sigma_\mathrm{M} - \sigma_\mathrm{M}\,\mathrm{d}E = -\sigma_\mathrm{M}\,\mathrm{d}E$。所有$\mathrm{d}\mu_i = 0$时这就是第一个结果。再求导并用[[#eq-cd]]得第二个。若$C_\mathrm{d}$为常数，以$\sigma_\mathrm{M}(E_\mathrm{pzc}) = 0$积分两次得$\sigma_\mathrm{M} = C_\mathrm{d}(E - E_\mathrm{pzc})$与那条抛物线。
:::

这个结果一眼就能解释曲线的形状。任一符号的电荷都*降低*表面张力，因为表面上的同号电荷相互排斥，从而有利于更大的面积；表面不带电时结合得最紧。曲线的斜率就是电荷，曲率就是电容。

::: example 读一条电毛细管曲线 {#ex-electrocapillary}
$0.1\ \mathrm{mol\,dm^{-3}}$ NaF中的汞电极在$E_\mathrm{pzc}$处$\gamma_\mathrm{max} = 0.426\ \mathrm{N\,m^{-1}}$。设$C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$为常数。求比零电荷电势负$0.50\ \mathrm{V}$处的$\gamma$与$\sigma_\mathrm{M}$。
::: solution
以SI单位，$C_\mathrm{d} = 20\times10^{-6}\ \mathrm{F}/10^{-4}\ \mathrm{m^2} = 0.20\ \mathrm{F\,m^{-2}}$。于是
$$
\sigma_\mathrm{M} = C_\mathrm{d}(E - E_\mathrm{pzc}) = 0.20\ \mathrm{F\,m^{-2}}\times(-0.50\ \mathrm{V}) = -0.10\ \mathrm{C\,m^{-2}} = -10\ \mu\mathrm{C\,cm^{-2}},
$$
$$
\gamma = 0.426 - \tfrac{1}{2}(0.20)(0.50)^{2}\ \mathrm{N\,m^{-1}} = 0.426 - 0.025 = 0.401\ \mathrm{N\,m^{-1}} .
$$
（$1\ \mathrm{F\,V^2\,m^{-2}} = 1\ \mathrm{J\,m^{-2}} = 1\ \mathrm{N\,m^{-1}}$。）$0.10\ \mathrm{C\,m^{-2}}$的过剩电荷是每平方米$6.2\times10^{17}$个电子；汞表面每平方米约$1.2\times10^{19}$个原子，所以电极约每二十个表面原子多带一个电子。表面张力下降$6\,\%$，在毛细管静电计上很容易读出——就这样称出了这份电荷。
:::
:::

::: widget plot
f: g0 - 0.5*C*x^2; -C*x
x: -1.2, 0.6
y: -30, 45
sliders: C=20:5:50:1; g0=42.6:35:50:0.1
labels: \gamma\ (10^{-2}\ \mathrm{N\,m^{-1}}); \sigma_\mathrm{M}\ (\mu\mathrm{C\,cm^{-2}})
hlines: 0
caption: 电容恒定时李普曼方程[[#eq-lippmann]]给出的电毛细管曲线，电势$x = E - E_\mathrm{pzc}$以伏计。上面一条是表面张力（以$10^{-2}\ \mathrm{N\,m^{-1}}$为单位，所以$42.6$表示$0.426\ \mathrm{N\,m^{-1}}$）；直线是电极电荷，即抛物线的负斜率。调高$C$（以$\mu\mathrm{F\,cm^{-2}}$计），抛物线变窄。汞上的实测曲线是不对称的：负电势下电容约$16\ \mu\mathrm{F\,cm^{-2}}$，正电势下$30$–$40\ \mu\mathrm{F\,cm^{-2}}$，因为阴离子比水化阳离子更接近表面——这暗示内层的结构很重要。
:::

李普曼的方法只适用于液态金属；对固体，电荷改由对电容测量作积分获得，$\sigma_\mathrm{M} = \int_{E_\mathrm{pzc}}^{E}C_\mathrm{d}\,\mathrm{d}E$，其中零电荷电势由稀溶液中电容的极小定位——古伊-查普曼理论正好预言了这个极小。不过，汞仍然是最早、也是研究得最好的双电层，这在很大程度上得益于戴维·格拉汉姆（David Grahame）1940年代的测量。

## 亥姆霍兹层

最简单的模型是亥姆霍兹1853年的模型：金属上的过剩电荷是其表面的一张电荷面，溶液中符号相反的电荷是离子在最靠近距离$d$处的另一张面。界面是一个平行板电容器。

::: definition 亥姆霍兹电容 {#def-helmholtz}
在**亥姆霍兹模型**中，双电层是板间距$d$、充满相对介电常数$\varepsilon_\mathrm{r}$介质的平行板电容器，单位面积电容为
$$
C_\mathrm{H} = \frac{\varepsilon_\mathrm{r}\varepsilon_0}{d},
$$ {#eq-helmholtz}
与电势和浓度无关。穿过反离子中心的平面是**外亥姆霍兹平面**（OHP）。
:::

难点在$\varepsilon_\mathrm{r}$的选取。体相水$\varepsilon_\mathrm{r} = 78.5$，但带电表面的第一层水已被电场取向，无法再响应电场转动——它*介电饱和*了——其有效介电常数接近$6$。

::: example 一个分子电容器 {#ex-helmholtz}
取$d = 0.30\ \mathrm{nm}$（一个水化阳离子的半径加一层水）与$\varepsilon_\mathrm{r} = 6$。求$C_\mathrm{H}$，以及其两端压降$0.50\ \mathrm{V}$时层内的电场。
::: solution
$$
C_\mathrm{H} = \frac{6\times8.854\times10^{-12}\ \mathrm{F\,m^{-1}}}{0.30\times10^{-9}\ \mathrm{m}} = 0.177\ \mathrm{F\,m^{-2}} = 17.7\ \mu\mathrm{F\,cm^{-2}},
$$
接近汞在负电势下实测的电容（$16\ \mu\mathrm{F\,cm^{-2}}$）。电场为$\mathcal{E} = 0.50\ \mathrm{V}/0.30\times10^{-9}\ \mathrm{m} = 1.7\times10^{9}\ \mathrm{V\,m^{-1}}$。相比之下，空气在$3\times10^{6}\ \mathrm{V\,m^{-1}}$击穿。正是这个横跨几埃的电场，在电极电势改变几百毫伏时加速或阻碍电子转移（[[electrochemistry/electrode-kinetics]]）。若用体相水的$\varepsilon_\mathrm{r} = 78.5$，我们会预测$230\ \mu\mathrm{F\,cm^{-2}}$，比观测值大十倍——内层水的饱和是真实的。
:::
:::

亥姆霍兹模型有两处失败。它预言电容与电势和浓度无关，而在稀溶液中实测电容在零电荷电势处出现明显的*极小*，且电解质越稀极小越深。它把离子固定在一张平面内，无视德拜-休克尔理论置于核心的热运动。

## 扩散层：古伊-查普曼理论

路易·乔治·古伊（Louis Georges Gouy，1910年）与戴维·伦纳德·查普曼（David Leonard Chapman，1913年）各自独立地让反离子在电极的静电吸引与热运动的竞争下铺展开来——恰如[[thermodynamics/ions-in-solution]]中的离子氛，只是中心是一个带电平面而不是一个离子。

::: proposition 古伊-查普曼扩散层 {#prop-gouy-chapman}
对体相浓度为$c$（以$\mathrm{mol\,m^{-3}}$计）的对称$z{:}z$电解质中的平面电极，把离子视为介电常数$\varepsilon = \varepsilon_\mathrm{r}\varepsilon_0$的连续介质中的点电荷，则距平面$x$处相对体相溶液的电势$\phi(x)$服从泊松-玻尔兹曼方程。以$\phi_0$为平面处的电势，其解给出
$$
\sigma_\mathrm{M} = \sqrt{8\varepsilon RTc}\;\sinh\!\left(\frac{zF\phi_0}{2RT}\right), \qquad
C_\mathrm{GC} = \frac{\mathrm{d}\sigma_\mathrm{M}}{\mathrm{d}\phi_0} = \frac{\varepsilon}{\lambda_\mathrm{D}}\cosh\!\left(\frac{zF\phi_0}{2RT}\right),
$$ {#eq-grahame}
德拜长度为$\lambda_\mathrm{D} = \sqrt{\varepsilon RT/(2z^2F^2c)}$。当$|zF\phi_0| \ll 2RT$时电势按$\phi = \phi_0\,\mathrm{e}^{-x/\lambda_\mathrm{D}}$衰减。第一式就是**格拉汉姆方程**。
:::

::: proof
一维的泊松方程是$\mathrm{d}^2\phi/\mathrm{d}x^2 = -\rho/\varepsilon$，而玻尔兹曼分布给出离子浓度$c_\pm = c\,\exp(\mp zF\phi/RT)$，所以电荷密度为
$$
\rho = zF(c_+ - c_-) = -2zFc\,\sinh\!\left(\frac{zF\phi}{RT}\right), \qquad
\frac{\mathrm{d}^2\phi}{\mathrm{d}x^2} = \frac{2zFc}{\varepsilon}\sinh\!\left(\frac{zF\phi}{RT}\right).
$$
两边乘以$2\,\mathrm{d}\phi/\mathrm{d}x$并用$\frac{\mathrm{d}}{\mathrm{d}x}\left(\phi'^2\right) = 2\phi'\phi''$：
$$
\frac{\mathrm{d}}{\mathrm{d}x}\left(\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)^{2} = \frac{4zFc}{\varepsilon}\sinh\!\left(\frac{zF\phi}{RT}\right)\frac{\mathrm{d}\phi}{\mathrm{d}x} .
$$
从体相（$x \rightarrow \infty$，那里$\phi = 0$且$\mathrm{d}\phi/\mathrm{d}x = 0$）积分到电势为$\phi$的一点：
$$
\left(\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)^{2} = \frac{4RTc}{\varepsilon}\left[\cosh\!\left(\frac{zF\phi}{RT}\right) - 1\right] = \frac{8RTc}{\varepsilon}\sinh^{2}\!\left(\frac{zF\phi}{2RT}\right).
$$
由高斯定律，扩散层内单位面积的电荷等于$\varepsilon(\mathrm{d}\phi/\mathrm{d}x)_{x=0}$，而电极电荷是它的相反数：$\sigma_\mathrm{M} = -\varepsilon(\mathrm{d}\phi/\mathrm{d}x)_0$。取使$\phi$离开平面时衰减的那一支根，得$\sigma_\mathrm{M} = \sqrt{8\varepsilon RTc}\,\sinh(zF\phi_0/2RT)$。对$\phi_0$求导得$C_\mathrm{GC} = \sqrt{8\varepsilon RTc}\,(zF/2RT)\cosh(zF\phi_0/2RT)$，且$\sqrt{8\varepsilon RTc}\,zF/2RT = \sqrt{2\varepsilon z^2F^2c/RT} = \varepsilon/\lambda_\mathrm{D}$。最后，$\phi$很小时$\sinh u \approx u$，泊松-玻尔兹曼方程变为$\phi'' = \phi/\lambda_\mathrm{D}^2$，其衰减解为$\phi_0\mathrm{e}^{-x/\lambda_\mathrm{D}}$。
:::

在零电荷电势处（$\phi_0 = 0$），扩散层表现得像一个"板间距"为德拜长度的电容器：$C_\mathrm{GC} = \varepsilon/\lambda_\mathrm{D}$。离开它时电容按$\cosh$增长，因为电极电荷越大，就把反离子压得越靠近表面。$25\,^\circ\mathrm{C}$的水中，$1{:}1$电解质、$c$以$\mathrm{mol\,dm^{-3}}$计，这些式子化为实用公式$\lambda_\mathrm{D} = 0.304\ \mathrm{nm}/\sqrt{c}$与$C_\mathrm{GC} = 228.5\sqrt{c}\,\cosh(19.46\,\phi_0/\mathrm{V})\ \mu\mathrm{F\,cm^{-2}}$。

::: warning 扩散层电势不是电极电势 {#warn-phi}
在[[#eq-grahame]]中，$\phi_0$是扩散层起始平面处相对体相溶液的电势。它不是$E$：$E$是对参比电极测量的，包含紧密层的压降与参比界面的（未知）电势。只有*变化*$\mathrm{d}E$与界面内部的压降才能相加：$\mathrm{d}E = \mathrm{d}(\phi_\mathrm{M} - \phi_2) + \mathrm{d}\phi_2$，其中$\phi_2$是外亥姆霍兹平面处的电势。相关的错误是在大电势下套用纯古伊-查普曼结果：$\cosh$指数增长，预言几千$\mu\mathrm{F\,cm^{-2}}$的电容和远超紧密堆积的表面离子浓度。点离子不能被无限压缩；离子的有限大小正是斯特恩模型补上的东西。
:::

## 斯特恩模型与紧密层

奥托·斯特恩（Otto Stern，1924年）把两幅图景结合了起来。离子不可能比外亥姆霍兹平面更靠近电极，该平面在距离$x_2$处；金属与该平面之间是没有自由电荷的紧密层，其外扩散层开始。电势在紧密层内线性降落，然后在扩散层内大致按指数降落。

::: proposition 斯特恩电容 {#prop-stern}
在斯特恩模型中，紧密（亥姆霍兹）层与扩散（古伊-查普曼）层载有同一电荷、相互串联，所以
$$
\frac{1}{C_\mathrm{d}} = \frac{1}{C_\mathrm{H}} + \frac{1}{C_\mathrm{GC}} ,
$$ {#eq-stern}
其中$C_\mathrm{H} = \varepsilon_\mathrm{r}\varepsilon_0/x_2$是紧密层电容，$C_\mathrm{GC}$在扩散层电势$\phi_2$处取值。两个电容中较小的一个占主导。
:::

::: proof
金属到体相的总电势降落是紧密层压降与扩散层压降之和：$\phi_\mathrm{M} - \phi_\mathrm{bulk} = (\phi_\mathrm{M} - \phi_2) + \phi_2$。由于紧密层内没有电荷，其中电场均匀并由金属电荷决定（高斯定律），所以$\phi_\mathrm{M} - \phi_2 = \sigma_\mathrm{M}/C_\mathrm{H}$。扩散层载有电荷$-\sigma_\mathrm{M}$，其电势$\phi_2$由格拉汉姆方程以$\phi_0 \rightarrow \phi_2$给出。对总压降按$\sigma_\mathrm{M}$求导：
$$
\frac{1}{C_\mathrm{d}} = \frac{\mathrm{d}(\phi_\mathrm{M} - \phi_\mathrm{bulk})}{\mathrm{d}\sigma_\mathrm{M}} = \frac{1}{C_\mathrm{H}} + \frac{\mathrm{d}\phi_2}{\mathrm{d}\sigma_\mathrm{M}} = \frac{1}{C_\mathrm{H}} + \frac{1}{C_\mathrm{GC}(\phi_2)} .
$$
这就是两个串联电容（共同一份电荷）的规则。
:::

模型现在能解释观测了。浓电解质（$c \gtrsim 0.1\ \mathrm{mol\,dm^{-3}}$）中$C_\mathrm{GC}$处处很大，$C_\mathrm{d} \approx C_\mathrm{H}$：双电层基本上是紧密的，几乎所有电势降落都在金属附近几埃之内，电容就是内层电容。稀电解质中$C_\mathrm{GC}$在零电荷电势附近很小并在那里占主导，产生电容极小；远离零电荷电势时$C_\mathrm{GC}$按$\cosh$增长，$C_\mathrm{H}$重新接管。

::: example 串联的紧密层与扩散层 {#ex-stern}
取[[#ex-helmholtz]]的$C_\mathrm{H} = 17.7\ \mu\mathrm{F\,cm^{-2}}$。求$25\,^\circ\mathrm{C}$下NaF水溶液(a) $0.10$与(b) $0.0010\ \mathrm{mol\,dm^{-3}}$在零电荷电势处的$\lambda_\mathrm{D}$与总电容。两种情况下扩散层各占多大份额的电势降落？
::: solution
(a) $\lambda_\mathrm{D} = 0.304/\sqrt{0.10}\ \mathrm{nm} = 0.96\ \mathrm{nm}$且$C_\mathrm{GC} = \varepsilon_\mathrm{r}\varepsilon_0/\lambda_\mathrm{D} = 78.5\times8.854\times10^{-12}/0.962\times10^{-9}\ \mathrm{F\,m^{-2}} = 0.723\ \mathrm{F\,m^{-2}} = 72.3\ \mu\mathrm{F\,cm^{-2}}$。于是
$$
C_\mathrm{d} = \left(\frac{1}{17.7} + \frac{1}{72.3}\right)^{-1}\ \mu\mathrm{F\,cm^{-2}} = 14.2\ \mu\mathrm{F\,cm^{-2}} .
$$
(b) $\lambda_\mathrm{D} = 9.6\ \mathrm{nm}$，$C_\mathrm{GC} = 7.23\ \mu\mathrm{F\,cm^{-2}}$，且$C_\mathrm{d} = (1/17.7 + 1/7.23)^{-1} = 5.13\ \mu\mathrm{F\,cm^{-2}}$。

对载同一电荷的串联电容，压降与电容成反比，所以扩散层中的份额是$C_\mathrm{H}/(C_\mathrm{H} + C_\mathrm{GC})$：(a)中$17.7/90.0 = 20\,\%$，(b)中$17.7/24.9 = 71\,\%$。稀电解质把大部分电势降落放进扩散层——离电极很远的地方——那里帮不到外亥姆霍兹平面上交换电子的反应物。这就是电极动力学的弗鲁姆金效应（Frumkin effect），也是伏安法至少要用$0.1\ \mathrm{mol\,dm^{-3}}$支持电解质的又一个理由。
:::
:::

::: widget plot
f: 1/(1/CH + 1/(228.5*sqrt(c)*cosh(19.46*x))); 228.5*sqrt(c)*cosh(19.46*x); CH + 0*x
x: -0.3, 0.3
y: 0, 40
sliders: c=0.001:0.0001:0.1:0.0001; CH=17.7:5:40:0.1
labels: C_\mathrm{d}\ \text{(Stern)}; C_\mathrm{GC}; C_\mathrm{H}
caption: 单位$\mu\mathrm{F\,cm^{-2}}$的微分电容对扩散层电势$\phi_2$（以V计，$x$）的曲线，$25\,^\circ\mathrm{C}$水中的$1{:}1$电解质，由[[#eq-grahame]]与[[#eq-stern]]作出。滑块$c$是以$\mathrm{mol\,dm^{-3}}$计的浓度，$C_\mathrm{H}$是紧密层电容。$c = 0.001$时斯特恩曲线在零电荷电势处有一个深极小，正如格拉汉姆在汞上观察到的；把$c$调到$0.1$，极小被填平，总电容趋于平直的亥姆霍兹值。只画古伊-查普曼曲线则无界上升——那正是紧密层治好的非物理行为。
:::

### 特性吸附与内层

斯特恩的图景仍把内层当作无结构。真实的界面更微妙。失去部分水化壳的离子——大而易极化的阴离子如$\mathrm{I^-}$、$\mathrm{Br^-}$与$\mathrm{SCN^-}$，以及程度较轻的$\mathrm{Cl^-}$——能进入紧密层并直接结合到金属上，这一过程称为**特性吸附**。它们的中心定义了**内亥姆霍兹平面**（IHP），比水化阳离子止步的外亥姆霍兹平面更靠近金属。特性吸附的阴离子甚至可以存在于带负电的电极上，还能过度补偿金属电荷，使扩散层带上与金属*同号*的电荷。它们把零电荷电势推向负侧（汞上碘离子可使它移动几百毫伏），并使电毛细管极大变平。氟离子是经典的"不吸附"阴离子，这就是双电层研究用NaF的原因。

中性有机分子也吸附，在零电荷电势附近电场最弱处排开水的吸附并降低电容；在任一侧的大电荷下它们被脱附——那时带着大偶极的水赢得了对表面的争夺。缓蚀剂与电镀中控制镀层的添加剂就靠这类吸附工作（[[electrochemistry/corrosion]]）。从博克里斯-德瓦纳森-缪勒（Bockris–Devanathan–Müller）1963年的图景到分子模拟与表面增强光谱，现代模型把内层看作取向的水分子与吸附离子，其排布取决于金属及其晶面。

::: quiz
在$0.001\ \mathrm{mol\,dm^{-3}}$ NaF中的汞电极在零电荷电势处显示约$6\ \mu\mathrm{F\,cm^{-2}}$的电容极小。当NaF浓度升到$0.1\ \mathrm{mol\,dm^{-3}}$时，同一电势下的电容
- [ ] 下降，因为更多离子屏蔽了电场
- [x] 向紧密层电容值上升，因为扩散层变薄
- [ ] 不变，因为亥姆霍兹电容不依赖浓度
- [ ] 变为负值，因为扩散层反号
::: solution
零电荷电势处的$C_\mathrm{GC}$是$\varepsilon/\lambda_\mathrm{D} \propto \sqrt{c}$，所以浓度增加一百倍使它增加十倍，从约$7$升到约$72\ \mu\mathrm{F\,cm^{-2}}$。与紧密层串联后，总电容从约$5$升到约$14\ \mu\mathrm{F\,cm^{-2}}$并接近$C_\mathrm{H}$。亥姆霍兹电容确实不变；正因如此*总*电容才趋近它。
:::
:::

## 双电层充电：电流与时间常数

电极上的每次电势阶跃或扫描都必须给双电层充电，所需电流是非法拉第的：不发生任何化学变化，但电流像任何其他电流一样流过外电路。

::: definition 充电电流 {#def-charging}
面积为$A$、双电层电容（近似恒定）为$C_\mathrm{d}$的电极，以速率$v = \mathrm{d}E/\mathrm{d}t$改变其电势所需的**充电电流**为
$$
i_\mathrm{c} = AC_\mathrm{d}v .
$$
经过未补偿溶液电阻$R_\mathrm{u}$施加电势阶跃$\Delta E$后，充电电流按$i_\mathrm{c} = (\Delta E/R_\mathrm{u})\exp(-t/\tau)$衰减，**电解池时间常数**$\tau = R_\mathrm{u}AC_\mathrm{d}$。
:::

阶跃响应来自把界面当作电容$AC_\mathrm{d}$与$R_\mathrm{u}$串联：基尔霍夫定律给出$\Delta E = iR_\mathrm{u} + q/(AC_\mathrm{d})$，求导得$R_\mathrm{u}\,\mathrm{d}i/\mathrm{d}t = -i/(AC_\mathrm{d})$，时间常数为$R_\mathrm{u}AC_\mathrm{d}$的指数衰减（与[[kinetics/rate-laws]]相同的一阶方程）。

::: example 伏安图的背景 {#ex-charging}
直径$3.0\ \mathrm{mm}$的玻碳圆盘（$A = 0.0707\ \mathrm{cm^2}$）的$C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$，处于$R_\mathrm{u} = 100\ \Omega$的溶液中。求$0.10\ \mathrm{V\,s^{-1}}$扫描下的充电电流与电解池时间常数。与$1.0\ \mathrm{mmol\,dm^{-3}}$可逆电对在同样条件下约$19\ \mu\mathrm{A}$的法拉第峰电流比较。
::: solution
$$
i_\mathrm{c} = AC_\mathrm{d}v = 0.0707\ \mathrm{cm^2}\times20\times10^{-6}\ \mathrm{F\,cm^{-2}}\times0.10\ \mathrm{V\,s^{-1}} = 1.4\times10^{-7}\ \mathrm{A} = 0.14\ \mu\mathrm{A} .
$$
$\tau = R_\mathrm{u}AC_\mathrm{d} = 100\ \Omega\times1.41\times10^{-6}\ \mathrm{F} = 1.4\times10^{-4}\ \mathrm{s} = 0.14\ \mathrm{ms}$。这里充电电流不足法拉第峰的$1\,\%$，但两者标度不同：$i_\mathrm{c} \propto vc^0$，而峰电流只按$\sqrt{v}$增长且正比于浓度（[[electrochemistry/voltammetry]]）。在$10\ \mu\mathrm{mol\,dm^{-3}}$分析物、或$100\ \mathrm{V\,s^{-1}}$下，背景与信号相当。时间常数决定了能做的最快实验：阶跃后短于几个$\tau$发生的一切都无法与界面充电分开，这就是快速伏安法使用微电极的原因——微电极的小面积使$\tau$很小。
:::
:::

## 超级电容器与电动力学

双电层存储能量，单位面积$\tfrac{1}{2}C_\mathrm{d}E^2$，**电化学双电层电容器**（EDLC，"超级电容器"）用内表面积达$1000$–$2000\ \mathrm{m^2\,g^{-1}}$的活性炭电极利用它。器件是两个这样的电极串联在有机电解质（常用乙腈中的四氟硼酸四乙基铵）中，后者耐受约$2.7\ \mathrm{V}$。因为不断裂任何化学键，充放电只需数秒，可重复几十万次；代价是能量密度低。这一想法的第一项专利——用水溶液酸中的多孔碳——1957年授予通用电气的霍华德·贝克尔（Howard Becker）。

::: example 碳超级电容器存储的能量 {#ex-supercap}
比表面积$1500\ \mathrm{m^2\,g^{-1}}$的活性炭的面双电层电容为$10\ \mu\mathrm{F\,cm^{-2}}$。一只对称器件的两个电极使用等量的这种碳，充电到$2.7\ \mathrm{V}$。求单个电极的比电容，以及每千克总碳存储的能量。
::: solution
单个电极：$1500\ \mathrm{m^2\,g^{-1}}\times10^{4}\ \mathrm{cm^2\,m^{-2}}\times10\times10^{-6}\ \mathrm{F\,cm^{-2}} = 150\ \mathrm{F\,g^{-1}}$。两个相等的电容串联得一半电容，而总质量是单个电极的两倍，所以每克总碳$C = 150/4 = 37.5\ \mathrm{F\,g^{-1}}$。能量为
$$
\tfrac{1}{2}CV^2 = \tfrac{1}{2}\times37.5\ \mathrm{F\,g^{-1}}\times(2.7\ \mathrm{V})^2 = 137\ \mathrm{J\,g^{-1}} = 38\ \mathrm{Wh\,kg^{-1}}
$$
（以碳计）。封装后的器件连同电解质、集流体与外壳约达$5$–$10\ \mathrm{Wh\,kg^{-1}}$（截至2026年），而锂离子电池约为$150$–$300\ \mathrm{Wh\,kg^{-1}}$（[[electrochemistry/batteries]]）；但它能在数秒内释放，所以用于再生制动、电源平滑与存储器备电。电极与器件电容之间四倍的差距是不实标称的常见来源。
:::
:::

扩散层还有力学上的后果。其中的离子可以被平行于表面的电场带动，拖着溶剂一起走（**电渗**）；带电粒子在电场中带着自己的扩散层一起运动（**电泳**）。两者都由**ζ电位**$\zeta$支配——液体开始运动的剪切面处的电势，大致为$\phi_2$。斯莫卢霍夫斯基（Smoluchowski）对远大于$\lambda_\mathrm{D}$的粒子给出的电泳迁移率结果$u = \varepsilon\zeta/\eta$，是毛细管电泳以及用于评估胶体稳定性的ζ电位测量的基础：扩散层重叠会排斥，而这种排斥与范德华吸引的平衡（德亚戈任（Derjaguin）、朗道（Landau）、维韦（Verwey）与奥贝克（Overbeek）的DLVO理论）决定了盐压缩双电层时胶体是保持分散还是聚沉。

::: history 从亥姆霍兹的电容器到格拉汉姆的汞 {#hist-double-layer}
赫尔曼·冯·亥姆霍兹（Hermann von Helmholtz）1853年在金属与导体的边界提出了电双电层的概念，并在1879年把它用于电解质。加布里埃尔·李普曼1875年关于电与毛细现象关系的博士论文带来了毛细管静电计和以他名字命名的方程。路易·乔治·古伊（1910年）与戴维·伦纳德·查普曼（1913年）独立地把泊松方程与玻尔兹曼分布结合起来引入扩散层，比德拜（Debye）与休克尔（Hückel）对离子做同样的事早了十年。奥托·斯特恩1924年的论文结合了紧密层与扩散层，并考虑了吸附。戴维·C. 格拉汉姆的综述《电双电层与电毛细管理论》（"The electrical double layer and the theory of electrocapillarity"，《化学评论》（*Chemical Reviews*），1947年）基于滴汞电极上精密的电容测量，确立了内、外亥姆霍兹平面与现代的古伊-查普曼-斯特恩-格拉汉姆图景。约翰·博克里斯（John Bockris）、M. A. V. 德瓦纳森（Devanathan）与克劳斯·缪勒（Müller）在1963年加上了取向水层。
:::

## 后续内容

双电层是[[electrochemistry/electrode-kinetics]]上演的舞台。紧密层上的电势降改变电子转移的活化吉布斯能；在扩散层中损失的电势降份额（弗鲁姆金校正）在稀电解质中改变表观速率常数；双电层电容在阻抗谱使用的每个等效电路中都并联在反应旁边。[[electrochemistry/voltammetry]]中，充电电流是法拉第信号在其上被测出的背景。[[electrochemistry/batteries]]中，电池与超级电容器的界限变成一条谱——"赝电容"材料如氧化钌以看起来像电容的快速表面氧化还原反应存储电荷。内层处的吸附是电催化（[[electrochemistry/fuel-cells-electrolysis]]）与缓蚀（[[electrochemistry/corrosion]]）的基础。电化学之外，同样的泊松-玻尔兹曼物理支配着胶体、黏土、膜与DNA的离子氛（[[biochemistry/nucleic-acids]]）。

::: summary
- 理想极化电极表现得像电容器：金属上的电荷$\sigma_\mathrm{M}$由溶液中的离子电荷平衡，微分电容$C_\mathrm{d} = \partial\sigma_\mathrm{M}/\partial E$典型为$10$–$40\ \mu\mathrm{F\,cm^{-2}}$。
- 李普曼方程$(\partial\gamma/\partial E)_\mu = -\sigma_\mathrm{M}$使电毛细管曲线成为一条似抛物线的曲线，其极大在零电荷电势处。
- 亥姆霍兹模型$C_\mathrm{H} = \varepsilon_\mathrm{r}\varepsilon_0/d$只有用饱和内层水的低介电常数（$\approx 6$）才拟合得上；层内电场超过$10^{9}\ \mathrm{V\,m^{-1}}$。
- 古伊-查普曼理论对平面求解泊松-玻尔兹曼方程：扩散层厚度为$\lambda_\mathrm{D}$，$C_\mathrm{GC} = (\varepsilon/\lambda_\mathrm{D})\cosh(zF\phi_0/2RT)$；电荷由格拉汉姆方程给出。
- 斯特恩模型中紧密层与扩散层电容串联相加，$1/C_\mathrm{d} = 1/C_\mathrm{H} + 1/C_\mathrm{GC}$，解释了稀溶液中零电荷电势处的电容极小及其在高浓度下的消失。
- 特性吸附的离子与分子位于内亥姆霍兹平面并使零电荷电势移动；充电电流$AC_\mathrm{d}v$与时间常数$R_\mathrm{u}AC_\mathrm{d}$限制了伏安法；超级电容器在高比表面碳上存储$\tfrac{1}{2}CV^2$。
:::

## 习题

::: exercise 更薄的紧密层 {level=1 check="35.4"}
求$d = 0.25\ \mathrm{nm}$、$\varepsilon_\mathrm{r} = 10$时的亥姆霍兹电容。（$C_\mathrm{H}$以$\mu\mathrm{F\,cm^{-2}}$填写。）
::: solution
$C_\mathrm{H} = 10\times8.854\times10^{-12}/0.25\times10^{-9}\ \mathrm{F\,m^{-2}} = 0.354\ \mathrm{F\,m^{-2}} = 35.4\ \mu\mathrm{F\,cm^{-2}}$（用到$1\ \mathrm{F\,m^{-2}} = 100\ \mu\mathrm{F\,cm^{-2}}$）。汞在正电势下——阴离子靠近、内层不那么饱和——可见这一量级的值。
:::
:::

::: exercise 扩散层的厚度 {level=1 check="3.04"}
用$\varepsilon_\mathrm{r} = 78.5$，求$25\,^\circ\mathrm{C}$下$0.010\ \mathrm{mol\,dm^{-3}}$氟化钠水溶液中的德拜长度。（$\lambda_\mathrm{D}$以nm填写。）
::: solution
$$
\lambda_\mathrm{D} = \sqrt{\frac{\varepsilon_\mathrm{r}\varepsilon_0RT}{2F^2c}} = \sqrt{\frac{78.5\times8.854\times10^{-12}\times8.314\times298.15}{2\times96\,485^2\times10.0}}\ \mathrm{m} = 3.04\times10^{-9}\ \mathrm{m},
$$
其中$c = 10.0\ \mathrm{mol\,m^{-3}}$。等价地$0.304/\sqrt{0.010}\ \mathrm{nm}$。
:::
:::

::: exercise 小电极上的充电电流 {level=1 check="0.393"}
直径$2.0\ \mathrm{mm}$的圆盘其$C_\mathrm{d} = 25\ \mu\mathrm{F\,cm^{-2}}$。求$0.50\ \mathrm{V\,s^{-1}}$扫描下的充电电流。（$i_\mathrm{c}$以$\mu\mathrm{A}$填写。）
::: solution
$A = \pi(0.10\ \mathrm{cm})^2 = 0.0314\ \mathrm{cm^2}$；$i_\mathrm{c} = AC_\mathrm{d}v = 0.0314\times25\times10^{-6}\times0.50\ \mathrm{A} = 3.93\times10^{-7}\ \mathrm{A} = 0.393\ \mu\mathrm{A}$。在循环伏安图中充电电流随扫描方向反号，给出坐在法拉第峰下面的矩形"盒子"。
:::
:::

::: exercise 稀电解质中的斯特恩电容 {level=2 check="10.7"}
取$C_\mathrm{H} = 20\ \mu\mathrm{F\,cm^{-2}}$，求$25\,^\circ\mathrm{C}$下$0.010\ \mathrm{mol\,dm^{-3}}$的$1{:}1$电解质在零电荷电势处的总电容。（$C_\mathrm{d}$以$\mu\mathrm{F\,cm^{-2}}$填写。）
::: solution
零电荷电势处$C_\mathrm{GC} = 228.5\sqrt{0.010} = 22.85\ \mu\mathrm{F\,cm^{-2}}$，故$C_\mathrm{d} = (1/20 + 1/22.85)^{-1} = 10.7\ \mu\mathrm{F\,cm^{-2}}$。在这一浓度上两层贡献几乎相等，电势降几乎均分于两者之间。
:::
:::

::: exercise 由电毛细管曲线求电荷 {level=2 check="-3.5"}
某汞电极的表面张力在$-0.60\ \mathrm{V}$为$0.4215\ \mathrm{N\,m^{-1}}$，在$-0.50\ \mathrm{V}$为$0.4250\ \mathrm{N\,m^{-1}}$（都对同一参比，组成固定）。估计$-0.55\ \mathrm{V}$处的电极电荷，并指出该电势位于零电荷电势的哪一侧。（$\sigma_\mathrm{M}$以$\mu\mathrm{C\,cm^{-2}}$填写。）
::: solution
由李普曼方程，$\sigma_\mathrm{M} = -\partial\gamma/\partial E \approx -(0.4250 - 0.4215)/(0.10)\ \mathrm{C\,m^{-2}} = -0.035\ \mathrm{C\,m^{-2}} = -3.5\ \mu\mathrm{C\,cm^{-2}}$。电势变正时表面张力上升，所以我们位于电毛细管极大的负侧，电极带有过剩电子。对光滑曲线，中心差位在区间内精确到二阶。
:::
:::

::: exercise 电解池的时间常数 {level=2 check="70.7"}
求$3.0\ \mathrm{mm}$圆盘（$A = 0.0707\ \mathrm{cm^2}$、$C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$）在$50\ \Omega$未补偿电阻下的时间常数，以及电势阶跃后充电电流降到初值$1\,\%$所需的时间。（$\tau$以$\mu\mathrm{s}$填写。）
::: solution
$\tau = R_\mathrm{u}AC_\mathrm{d} = 50\times0.0707\times20\times10^{-6}\ \mathrm{s} = 7.07\times10^{-5}\ \mathrm{s} = 70.7\ \mu\mathrm{s}$。电流降到$1\,\%$时$\mathrm{e}^{-t/\tau} = 0.01$，即$t = \tau\ln100 = 4.61\tau = 326\ \mu\mathrm{s}$。因此早于约$0.3\ \mathrm{ms}$的计时电流数据会受到充电的污染。
:::
:::

::: exercise 格拉汉姆方程 {level=3 check="4.03"}
从泊松-玻尔兹曼方程出发，证明$1{:}1$电解质扩散层中的电荷为$\sigma = \sqrt{8\varepsilon RTc}\,\sinh(F\phi_0/2RT)$，并对$\phi_0 = 0.100\ \mathrm{V}$、$25\,^\circ\mathrm{C}$的$0.010\ \mathrm{mol\,dm^{-3}}$电解质（$\varepsilon_\mathrm{r} = 78.5$）求值。与线性化理论的结果比较。（$\sigma$以$\mu\mathrm{C\,cm^{-2}}$填写。）
::: hint
把泊松-玻尔兹曼方程乘以$2\phi'$，从体相积分一次；然后在表面用高斯定律。
:::
::: solution
推导就是[[#prop-gouy-chapman]]的推导，取$z = 1$。数值上，以$c = 10.0\ \mathrm{mol\,m^{-3}}$，
$$
\sqrt{8\varepsilon RTc} = \sqrt{8\times78.5\times8.854\times10^{-12}\times8.314\times298.15\times10.0}\ \mathrm{C\,m^{-2}} = 1.174\times10^{-2}\ \mathrm{C\,m^{-2}},
$$
且$F\phi_0/2RT = 0.100\times19.46 = 1.946$，$\sinh 1.946 = 3.43$。于是$\sigma = 4.03\times10^{-2}\ \mathrm{C\,m^{-2}} = 4.03\ \mu\mathrm{C\,cm^{-2}}$。线性化理论给出$\sigma = \varepsilon\phi_0/\lambda_\mathrm{D} = 0.2285\ \mathrm{F\,m^{-2}}\times0.100\ \mathrm{V} = 2.28\ \mu\mathrm{C\,cm^{-2}}$，几乎小了一半：在$100\ \mathrm{mV}$处$F\phi_0/RT \approx 3.9$，线性化（要求它$\ll 1$）已经失效。在电极上，非线性屏蔽是常态而非例外。
:::
:::

::: exercise 超级电容器的能量与功率 {level=3 check="38"}
一只对称超级电容器使用的碳每电极$C = 150\ \mathrm{F\,g^{-1}}$（三电极池中测得），充电到$2.7\ \mathrm{V}$。(a) 求每千克总碳存储的能量。(b) 若碳占器件质量的$30\,\%$，器件的等效串联电阻使其最大功率为$P_\mathrm{max} = V^2/4R_\mathrm{s}$，总质量$0.50\ \mathrm{kg}$的器件要给出$P_\mathrm{max}/m = 10\ \mathrm{kW\,kg^{-1}}$，$R_\mathrm{s}$应为多少？(a)的能量以$\mathrm{Wh\,kg^{-1}}$填写。）
::: solution
(a) 每克总碳的器件电容为$150/4 = 37.5\ \mathrm{F\,g^{-1}}$（串联减半，质量加倍再减半）。$\tfrac{1}{2}CV^2 = \tfrac{1}{2}\times37.5\times2.7^2 = 137\ \mathrm{J\,g^{-1}} = 137\ \mathrm{kJ\,kg^{-1}} = 38\ \mathrm{Wh\,kg^{-1}}$。(b) 每千克器件的能量为$0.30\times38 = 11\ \mathrm{Wh\,kg^{-1}}$。要$P_\mathrm{max} = 10\ \mathrm{kW\,kg^{-1}}\times0.50\ \mathrm{kg} = 5.0\ \mathrm{kW}$，$R_\mathrm{s} = V^2/4P_\mathrm{max} = 7.29/20\,000\ \Omega = 0.36\ \mathrm{m\Omega}$。这些能量以满功率放出只需约$11\ \mathrm{Wh\,kg^{-1}}/10\ \mathrm{kW\,kg^{-1}} \approx 4\ \mathrm{s}$——这是电容器而非电池的标志。
:::
:::
