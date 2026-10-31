绝大多数化学发生在溶液中，绝大多数生物化学发生在蛋白内部。然而本课到此为止介绍的电子结构方法，描述的都是真空中的孤立分子。这个差别不是一个小修正。水把钠离子稳定约$365\ \mathrm{kJ\,mol^{-1}}$；它把醋酸在气相中高达$1400\ \mathrm{kJ\,mol^{-1}}$以上的去质子化代价，变成一个$\mathrm{p}K_\mathrm{a} = 4.76$的平衡；它使$\mathrm{S_N2}$速率的先后次序反转；它把吸收带移动数千波数。把环境加回来有两条路。一条是显式地处理它，正如[[computational-chemistry/molecular-dynamics]]与[[computational-chemistry/free-energy-sampling]]中的分子动力学和自由能方法所做的那样——精确，但昂贵，而且量子力学只负担得起很小一个区域。另一条是把溶剂换成一个对溶质电荷分布作出响应的**介电连续介质**——便宜，而且对许多用途有效得惊人。本课从玻恩（Born）与昂萨格（Onsager）公式出发搭建连续介质模型直到现代的PCM、COSMO与SMD，说明它们如何用于$\mathrm{p}K_\mathrm{a}$与氧化还原电位的热力学循环，然后介绍把一个量子力学区域嵌入经典环境的**QM/MM**方法——酶中反应的首选工具。

## 溶剂化自由能

::: definition 溶剂化自由能 {#def-solvation}
溶质的**溶剂化自由能**$\Delta G^{*}_\mathrm{solv}$是把它在*相同浓度*下从理想气体转移到理想稀溶液的自由能变化（本-奈姆（Ben-Naim）标准态，记作$*$，通常两相都取$1\ \mathrm{mol\,dm^{-3}}$）。它惯常被分解为
$$
\Delta G^{*}_\mathrm{solv} = \Delta G_\mathrm{elec} + \Delta G_\mathrm{cav} + \Delta G_\mathrm{disp\text{-}rep} + \Delta G_\mathrm{struct},
$$
即极化溶剂的静电功、为空腔腾出位置的功、与溶剂的色散-排斥相互作用，以及其他项未覆盖的溶剂结构变化（氢键、疏水有序化）。只有总和可观测；怎么拆分依赖模型。
:::

标准态很重要。气相自由能通常按$p^\circ = 1\ \mathrm{bar}$列表（早期工作用$1\ \mathrm{atm}$），而溶液自由能对应$1\ \mathrm{mol\,dm^{-3}}$。$1\ \mathrm{atm}$、$298.15\ \mathrm{K}$的理想气体浓度为$1/24.46\ \mathrm{mol\,dm^{-3}}$，因此把它压缩到$1\ \mathrm{mol\,dm^{-3}}$需要
$$
\Delta G^{\circ\to *} = RT\ln\frac{V_\mathrm{m}^\circ}{1\ \mathrm{dm^{3}\,mol^{-1}}} = RT\ln 24.46 = 7.93\ \mathrm{kJ\,mol^{-1}}
$$ {#eq-standard-state}
每摩尔每种粒子（按$1\ \mathrm{bar}$则体积为$24.79\ \mathrm{dm^{3}}$、修正为$7.95\ \mathrm{kJ\,mol^{-1}}$）。在改变溶质粒子数目的反应中忘记这个修正，是计算$\mathrm{p}K_\mathrm{a}$与结合时最常见的错误之一。

## 连续介质静电学：玻恩与昂萨格

对离子与极性分子而言最大的项是静电项。把溶剂建模为：一个相对介电常数为$\varepsilon_\mathrm{r}$的均匀介电质，包裹在容纳溶质的空腔之外；溶质的电荷极化介电质，极化产生的**反应场**反过来作用于溶质、降低其能量。

::: proposition 玻恩方程 {#prop-born}
位于相对介电常数$\varepsilon_\mathrm{r}$的介电质中、半径$a$的球形空腔中心处的点电荷$ze$，其静电溶剂化自由能（相对真空）为
$$
\Delta G_\mathrm{Born} = -\frac{z^{2}e^{2}N_\mathrm{A}}{8\pi\varepsilon_0 a}\left(1 - \frac{1}{\varepsilon_\mathrm{r}}\right) = -694.7\ \mathrm{kJ\,mol^{-1}}\times\frac{z^{2}}{a/\mathrm{\AA}}\left(1 - \frac{1}{\varepsilon_\mathrm{r}}\right).
$$
:::

::: proof
计算把一个球从$0$充电到$ze$的可逆功，先真空、后介电质。当球带电$q$时，其表面电势为$\phi(q) = q/4\pi\varepsilon_0\varepsilon_\mathrm{r}a$，于是从无穷远再搬来$\mathrm{d}q$需费$\phi\,\mathrm{d}q$，总功为
$$
w = \int_0^{ze}\frac{q\,\mathrm{d}q}{4\pi\varepsilon_0\varepsilon_\mathrm{r}a} = \frac{(ze)^{2}}{8\pi\varepsilon_0\varepsilon_\mathrm{r}a}.
$$
转移自由能是它与真空功（$\varepsilon_\mathrm{r} = 1$）之差：$\Delta G = \frac{(ze)^{2}}{8\pi\varepsilon_0 a}\left(\frac{1}{\varepsilon_\mathrm{r}} - 1\right)$，每摩尔再乘$N_\mathrm{A}$。数值上$e^{2}N_\mathrm{A}/8\pi\varepsilon_0 = \tfrac{1}{2} \times 1389.35\ \mathrm{kJ\,mol^{-1}\,\AA}$。
:::

::: example 钠离子的水合 {#ex-born-na}
$\mathrm{Na^{+}}$的实验水合自由能约为$-365\ \mathrm{kJ\,mol^{-1}}$（马库斯（Marcus）的汇编）。用水（$\varepsilon_\mathrm{r} = 78.4$）与晶体离子半径$1.02\ \mathrm{\AA}$计算玻恩能量，并求复现实验值的半径。
::: solution
取$a = 1.02\ \mathrm{\AA}$：$\Delta G = -694.7 \times (1/1.02) \times (1 - 1/78.4) = -694.7 \times 0.9804 \times 0.9872 = -672\ \mathrm{kJ\,mol^{-1}}$，负得几乎多了两倍。解$-694.7 \times 0.9872/a = -365$得$a = 1.88\ \mathrm{\AA}$。有效空腔半径比离子半径大约$0.85\ \mathrm{\AA}$——这正是拉蒂默（Wendell Latimer）、皮策（Pitzer）与斯兰斯基（Cyril Slansky）1939年经验提出的修正——因为溶剂的介电响应并非从离子表面开始：第一水化层部分饱和，其氧原子也无法靠近到自身尺寸允许的距离以内。每个连续介质模型都有这么个半径参数，而结果按$1/a$依赖它。
:::
:::

::: widget plot
f: -694.7*z^2/x*(1 - 1/e)
x: 0.8, 5
y: -1500, 0
sliders: z=1:1:3:1; e=78.4:1:80:0.1
points: 1.88, -365
labels: \Delta G_\mathrm{Born}/\mathrm{kJ\,mol^{-1}}
caption: 玻恩溶剂化自由能对空腔半径$a$（埃）的图像，电荷数为$z$、相对介电常数为$\varepsilon_\mathrm{r}$。标出的点是水中$\mathrm{Na^{+}}$，取其有效半径$1.88\ \mathrm{\AA}$。$z^{2}$依赖使二价离子在同一半径下被溶剂化四倍、三价离子九倍；$1/a$依赖使小离子的结果对半径极为敏感。把$\varepsilon_\mathrm{r}$降到$2$附近，看看非极性溶剂里还能剩下多少稳定化。
:::

因子$(1 - 1/\varepsilon_\mathrm{r})$很快就饱和：$\varepsilon_\mathrm{r} = 2$（己烷类）时为$0.50$，氯仿（$4.8$）时为$0.79$，乙腈（$36$）时为$0.97$，水为$0.99$。离子的静电稳定化大部分被任何足够极性的溶剂实现；除此之外溶剂之间的差别在于连续介质略去的具体相互作用——与阴离子的氢键、与阳离子的配位。

对中性极性分子，主导项是偶极矩。

::: proposition 昂萨格反应场 {#prop-onsager}
位于相对介电常数$\varepsilon_\mathrm{r}$的介电质中、半径$a$的球形空腔中心处的点偶极子$\mu$，感受到一个与自身平行的反应场$R = \frac{2(\varepsilon_\mathrm{r} - 1)}{2\varepsilon_\mathrm{r} + 1}\frac{\mu}{4\pi\varepsilon_0 a^{3}}$，其静电溶剂化自由能为
$$
\Delta G_\mathrm{Onsager} = -\frac{1}{2}\mu R = -\frac{\mu^{2}}{4\pi\varepsilon_0 a^{3}}\cdot\frac{\varepsilon_\mathrm{r} - 1}{2\varepsilon_\mathrm{r} + 1}.
$$
:::

::: proof
空腔内部的电势是偶极子加上一个均匀反应场，$\phi_\mathrm{in} = \frac{\mu\cos\theta}{4\pi\varepsilon_0 r^{2}} - Rr\cos\theta$；外部是一个被屏蔽的偶极子，$\phi_\mathrm{out} = \frac{\mu'\cos\theta}{4\pi\varepsilon_0 r^{2}}$。这些正是拉普拉斯方程的$l = 1$解。$\phi$在$r = a$处连续给出$\mu/4\pi\varepsilon_0 a^{2} - Ra = \mu'/4\pi\varepsilon_0 a^{2}$；电位移的法向分量连续，$\partial\phi_\mathrm{in}/\partial r = \varepsilon_\mathrm{r}\partial\phi_\mathrm{out}/\partial r$，给出$-2\mu/4\pi\varepsilon_0 a^{3} - R = -2\varepsilon_\mathrm{r}\mu'/4\pi\varepsilon_0 a^{3}$。消去$\mu'$即得所述的$R$。偶极子在它自己感生的场中的自由能（线性响应）为$-\tfrac{1}{2}\mu R$，因子$\tfrac{1}{2}$计入极化介质所做的功。
:::

昂萨格模型是经典的**溶剂变色效应**理论的基础：激发后偶极矩从$\mu_\mathrm{g}$变到$\mu_\mathrm{e}$的分子，其吸收的移动正比于$(\mu_\mathrm{e} - \mu_\mathrm{g})$与溶剂的某个极性函数，如利珀特-马塔加（Lippert–Mataga）方程所示。拟合溶剂变色位移可给出激发态偶极矩。

::: widget plot
f: 1 - 1/x; 2*(x - 1)/(2*x + 1); (x - 1)/(x + k)
x: 1, 80
y: 0, 1.05
sliders: k=0.5:0:2:0.05
labels: \text{玻恩 } 1 - 1/\varepsilon_\mathrm{r}; \text{昂萨格 } 2(\varepsilon_\mathrm{r}-1)/(2\varepsilon_\mathrm{r}+1); \text{COSMO } (\varepsilon_\mathrm{r}-1)/(\varepsilon_\mathrm{r}+x)
vlines: 4.81; 78.4
caption: 介电因子对溶剂相对介电常数的图像。离子的玻恩因子与偶极子的昂萨格因子都陡升后饱和：到$\varepsilon_\mathrm{r} \approx 10$时大部分静电溶剂化已经实现，标出的氯仿（$4.81$）与水（$78.4$）相差不足$1.4$倍。$x = 0.5$（滑块）的COSMO标度因子与昂萨格因子完全重合，而$x = 0$时它复现玻恩因子。
:::

## 可极化连续介质模型

真实溶质不是带中心点电荷的球。现代连续介质模型用互相咬合的原子球（半径通常取范德华半径的$1.1$–$1.2$倍）搭建空腔，并对真实的量子力学电荷密度数值求解静电问题。

::: definition 表观面电荷模型 {#def-pcm}
在**可极化连续介质模型**（PCM）中，介电质的极化由铺在空腔表面、离散为带电荷$q_k$的小面元的**表观面电荷**密度$\sigma(\mathbf{s})$表示。给定溶质在各小面元上的电势$\mathbf{V}$，电荷由静电边界条件通过一个线性方程$\mathbf{K}\mathbf{q} = -\mathbf{R}\mathbf{V}$确定，其矩阵依赖空腔几何与$\varepsilon_\mathrm{r}$。这些电荷的反应电势被加进溶质哈密顿量，$\hat H = \hat H_0 + \hat V_\mathrm{R}[\mathbf{q}]$；由于$\mathbf{q}$依赖溶质密度，两者要一道自洽求解（**自洽反应场**，SCRF）。静电溶剂化自由能为$\Delta G_\mathrm{elec} = \tfrac{1}{2}\mathbf{q}\cdot\mathbf{V}$加上溶质自身能量在极化时的变化。
:::

各变体的区别在于边界条件方程如何构造。**导体型**模型（COSMO，克拉姆特（Andreas Klamt）与许尔曼（Gerrit Schüürmann）1993；C-PCM）先求解完美导体（$\varepsilon_\mathrm{r} = \infty$）——其条件无非是总电势在表面上为零——再把电荷按$f(\varepsilon_\mathrm{r}) = (\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + x)$缩放，$x$取$0$到$\tfrac{1}{2}$之间。积分方程形式PCM（IEF-PCM）对给定的空腔精确求解介电质问题。对高介电常数的溶剂，各变体十分一致。

只有静电项得不到准确的溶剂化自由能；对中性分子，非静电项与静电项大小相当。**SMD**模型（马雷尼奇（Aleksandr Marenich）、克拉默（Christopher Cramer）与特鲁勒（Donald Truhlar），2009）把经过优化的原子半径的IEF-PCM静电项，与一个正比于原子表面积、系数依赖溶剂描述符（折射率、氢键酸性与碱性、表面张力）的空腔-色散-溶剂结构项结合在一起。它用约九十种溶剂中数千个实验溶剂化自由能参数化，对中性溶质达到约$3\ \mathrm{kJ\,mol^{-1}}$、对离子$15$–$20\ \mathrm{kJ\,mol^{-1}}$的平均误差。**COSMO-RS**（克拉姆特，1995）走得更远：把溶质与溶剂分子的COSMO面电荷用于相互作用面段的统计热力学模型，预测任意溶剂与混合物中的活度系数、分配系数与溶解度。

::: warning 连续介质模型不能做什么 {#warn-continuum}
连续介质没有分子。它不能与溶质形成某个具体的氢键、配位金属离子、转移质子，也不能显示某个反应被某一个特定的水分子催化。它描述的是体相溶剂处于平衡时的*平均*响应——而对快过程，平衡响应并不正确：在垂直电子激发期间只有溶剂的电子极化（水的光学介电常数$n^{2} \approx 1.8$）跟得上，吸收光谱必须用非平衡溶剂化。对电荷定域的阴离子以及氢氧根或氟离子，几十$\mathrm{kJ\,mol^{-1}}$的误差很常见。标准补救是**团簇-连续介质**做法：把一两个与关键位点氢键结合的显式溶剂分子包括进来，再把这个团簇嵌入连续介质。
:::

## 溶液中的热力学循环

溶液相反应自由能通常由高水平的气相计算与溶剂化自由能拼合而得：
$$
\Delta G^{*}_\mathrm{aq} = \Delta G^{\circ}_\mathrm{gas} + \Delta n\,RT\ln 24.46 + \sum_\mathrm{products}\Delta G^{*}_\mathrm{solv} - \sum_\mathrm{reactants}\Delta G^{*}_\mathrm{solv},
$$ {#eq-solution-cycle}
其中$\Delta n$是溶质粒子摩尔数的变化，第二项换算气相标准态（[[#eq-standard-state]]）。

::: algorithm 由热力学循环计算$\mathrm{p}K_\mathrm{a}$ {#alg-pka}
1. 在气相（或在连续介质中）优化HA与$\mathrm{A^{-}}$并计算频率，得到带热修正的气相自由能（[[statistical-thermodynamics/equilibrium-from-molecules]]）；用高水平方法（例如CCSD(T)/CBS或好的双杂化泛函）计算电子能量。
2. 求$\mathrm{HA(g)} \rightarrow \mathrm{A^{-}(g)} + \mathrm{H^{+}(g)}$的$\Delta G^{\circ}_\mathrm{gas}$，取$G^{\circ}(\mathrm{H^{+}, g}) = -26.3\ \mathrm{kJ\,mol^{-1}}$（由萨库尔-特特罗德（Sackur–Tetrode）方程在$1\ \mathrm{atm}$、$298\ \mathrm{K}$得出）。
3. 用连续介质模型计算HA与$\mathrm{A^{-}}$的$\Delta G^{*}_\mathrm{solv}$（阴离子最好带上显式水分子），质子的实验值取$\Delta G^{*}_\mathrm{solv}(\mathrm{H^{+}}) = -1112.5\ \mathrm{kJ\,mol^{-1}}$（蒂桑迪耶（Tissandier）与合作者，1998，$1\ \mathrm{mol\,dm^{-3}}$约定）。
4. 用[[#eq-solution-cycle]]拼合（$\Delta n = +1$）并换算：$\mathrm{p}K_\mathrm{a} = \Delta G^{*}_\mathrm{aq}/(RT\ln 10)$，其中$298.15\ \mathrm{K}$下$RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$。
5. 尽可能采用**等键（isodesmic）**或相对方案——对一个$\mathrm{p}K_\mathrm{a}$已知、结构相似的参考酸计算$\Delta\mathrm{p}K_\mathrm{a}$——使质子的溶剂化能与许多系统误差相消。
:::

::: example 醋酸的$\mathrm{p}K_\mathrm{a}$ {#ex-pka}
对$298.15\ \mathrm{K}$的醋酸，取气相去质子的$\Delta G^{\circ}_\mathrm{gas} = 1427\ \mathrm{kJ\,mol^{-1}}$（$1\ \mathrm{atm}$）、$\Delta G^{*}_\mathrm{solv}(\mathrm{CH_3COOH}) = -28\ \mathrm{kJ\,mol^{-1}}$、$\Delta G^{*}_\mathrm{solv}(\mathrm{CH_3COO^{-}}) = -322\ \mathrm{kJ\,mol^{-1}}$与$\Delta G^{*}_\mathrm{solv}(\mathrm{H^{+}}) = -1112.5\ \mathrm{kJ\,mol^{-1}}$（近似实验值）。计算$\mathrm{p}K_\mathrm{a}$，并求阴离子溶剂化有$10\ \mathrm{kJ\,mol^{-1}}$误差时引起的变化。
::: solution
由[[#eq-solution-cycle]]，
$$
\Delta G^{*}_\mathrm{aq} = 1427 + 7.93 + (-322) + (-1112.5) - (-28) = 28.4\ \mathrm{kJ\,mol^{-1}},
$$
故$\mathrm{p}K_\mathrm{a} = 28.4/5.708 = 4.98$，实测值为$4.76$。水相自由能是几个巨大数值之差：气相去质子能与两个离子的溶剂化几乎抵消，只剩$2\ \%$。$\Delta G^{*}_\mathrm{solv}(\mathrm{A^{-}})$上$10\ \mathrm{kJ\,mol^{-1}}$的误差——连续介质模型对阴离子的典型水平——使$\mathrm{p}K_\mathrm{a}$移动$10/5.708 = 1.75$个单位。这就是为什么绝对计算的$\mathrm{p}K_\mathrm{a}$常有二三个单位以上的误差，而相对方案好得多。
:::
:::

::: example 溶液中的二聚 {#ex-dimer-ss}
两分子羧酸形成氢键二聚体，$2\,\mathrm{RCOOH} \rightleftharpoons (\mathrm{RCOOH})_2$。某计算给出$\Delta G^{\circ}_\mathrm{gas} = -15.0\ \mathrm{kJ\,mol^{-1}}$（标准态$1\ \mathrm{atm}$），连续介质模型在$298.15\ \mathrm{K}$的氯仿中给出每个单体$-20.0\ \mathrm{kJ\,mol^{-1}}$、二聚体$-24.0\ \mathrm{kJ\,mol^{-1}}$的溶剂化自由能（示例数值）。求溶液中的$\Delta G^{*}$与摩尔标度上的二聚常数。
::: solution
这里$\Delta n = 1 - 2 = -1$，标准态项为$-7.93\ \mathrm{kJ\,mol^{-1}}$。由[[#eq-solution-cycle]]，
$$
\Delta G^{*}_\mathrm{soln} = -15.0 - 7.93 + (-24.0) - 2(-20.0) = -6.9\ \mathrm{kJ\,mol^{-1}},
$$
且$K = e^{6.93/2.479} = 16\ \mathrm{dm^{3}\,mol^{-1}}$。两个效应削弱了气相的推动力：溶剂稳定两个分开单体多于一个二聚体（每个单体都暴露极性的COOH基团，二聚体则把两者都埋起来），而标准态的变化使缔合在$1\ \mathrm{mol\,dm^{-3}}$下不如在$1\ \mathrm{atm}$气体那个较低浓度（$1/24.46\ \mathrm{mol\,dm^{-3}}$）下有利。省略$7.93\ \mathrm{kJ\,mol^{-1}}$会把$K$高估$24.5$倍。
:::
:::

同样的做法给出**氧化还原电势**：计算$\mathrm{Ox} + n\mathrm{e^{-}} \rightarrow \mathrm{Red}$的$\Delta G^{*}_\mathrm{aq}$，用$E^\circ = -\Delta G/nF$换算，再减去参比电极的绝对电势（在与上述质子溶剂化能一致的约定下，标准氢电极约为$4.28\ \mathrm{V}$），或者更好地，相对于一个参考电对计算（[[electrochemistry]]）。

::: quiz
一个醇的$\mathrm{p}K_\mathrm{a}$由气相CCSD(T)计算与SMD连续介质模型算得为$21$，实验值为$16$。哪个修正最可能有帮助？
- [ ] 气相计算换用更大的基组。
- [x] 加上与醇盐氧氢键结合的显式水分子（团簇-连续介质模型），或对一个参考醇用相对方案。
- [ ] 把介电常数从$78.4$改成$80$。
- [ ] 去掉标准态修正。
::: solution
醇盐阴离子带一个定域的小负电荷，靠强而具体的氢键稳定，连续介质低估了它；算出的阴离子溶剂化负得不够，于是$\mathrm{p}K_\mathrm{a}$偏高。五个单位对应$29\ \mathrm{kJ\,mol^{-1}}$，正是这类阴离子的典型连续介质误差。基组与介电常数的改变都太小而无济于事，而标准态项不可省略。
:::
:::

## QM/MM：经典环境中的量子化学

酶的活性位点对量子化学太大、对力场又太活泼。瓦尔谢尔（Arieh Warshel）与莱维特（Michael Levitt）（1976）提出的**量子力学/分子力学**（QM/MM）思想是：把一个小区域——底物与催化残基，典型$50$–$300$个原子——用量子力学处理，蛋白与溶剂的其余部分用力场处理（[[computational-chemistry/molecular-mechanics]]）。

::: definition QM/MM能量方案 {#def-qmmm}
在**加和**（additive）方案中，总能量为
$$
E_\mathrm{QM/MM} = E_\mathrm{QM}(\mathrm{inner}) + E_\mathrm{MM}(\mathrm{outer}) + E_\mathrm{QM\text{-}MM}(\mathrm{inner}, \mathrm{outer}),
$$
其中耦合项包含越过边界的MM键合项、QM与MM原子之间的Lennard-Jones相互作用，以及QM电荷密度与MM点电荷之间的静电相互作用。在**减和**（subtractive）方案（ONIOM，莫罗库马（Morokuma）与合作者）中，
$$
E_\mathrm{ONIOM} = E_\mathrm{high}(\mathrm{model}) + E_\mathrm{low}(\mathrm{real}) - E_\mathrm{low}(\mathrm{model}),
$$
其中"real"是整个体系，"model"是内区（用链接原子封顶）；内区的低水平计算被减去，以免重复计数。任何两种方法都可组合（QM:QM与QM:MM皆可）。
:::

静电耦合如何处理，界定了三个层次的嵌入：

- **力学嵌入**：QM–MM静电按经典方式计算，用MM电荷与QM原子上的固定电荷。QM波函数感受不到环境；对带电的活性位点这很少够用。
- **静电嵌入**：MM点电荷作为单电子项$-\sum_J q_J/\lvert\mathbf{r} - \mathbf{R}_J\rvert$进入QM哈密顿量，于是QM密度被蛋白与溶剂极化。这是标准选择。
- **可极化嵌入**：此外MM区域还被QM区域（自洽地）极化（可极化力场）。

当边界切断一根共价键——例如某个催化残基的$\mathrm{C_\alpha}$–$\mathrm{C_\beta}$键——QM区域的悬空价键必须封顶。最常见的办法是**链接原子**（link atom），通常取氢，放在被切断的键的延长线上；最靠近链接原子的MM电荷被删除、移位或抹平，以防它们把QM密度过度极化。冻结局域轨道（局域自洽场方法）是主要的替代方案。要切就切非极性的C–C键，绝不要切极性或共轭的键。

::: example 一个ONIOM能量 {#ex-oniom}
对一个大分子，一次ONIOM(DFT:MM)计算需要三个能量。相对于一个参考结构，某个候选过渡态有$\Delta E_\mathrm{DFT}(\mathrm{model}) = +78.4\ \mathrm{kJ\,mol^{-1}}$、$\Delta E_\mathrm{MM}(\mathrm{real}) = +12.6\ \mathrm{kJ\,mol^{-1}}$与$\Delta E_\mathrm{MM}(\mathrm{model}) = +4.1\ \mathrm{kJ\,mol^{-1}}$（示例数值）。ONIOM势垒是多少？每一项代表什么？
::: solution
$\Delta E_\mathrm{ONIOM} = 78.4 + 12.6 - 4.1 = 86.9\ \mathrm{kJ\,mol^{-1}}$。第一项是反应核心在量子层次上的本征势垒；$E_\mathrm{MM}(\mathrm{real}) - E_\mathrm{MM}(\mathrm{model}) = +8.5\ \mathrm{kJ\,mol^{-1}}$是力场对环境（此例中是更大骨架的位阻张力）如何改变势垒的估计。减去的那一项移除了力场对核心中断键过程自身的（糟糕的）描述，这就是为什么这个方案行得通，尽管MM并不能描述该反应。
:::
:::

单条反应路径上的QM/MM能量对酶来说还不够，因为上千种蛋白与水的构型都有贡献。因此实际的QM/MM研究把该方法与[[computational-chemistry/free-energy-sampling]]的采样结合：沿反应坐标做带伞形采样的QM/MM分子动力学，得到平均力势与自由能势垒，可以借过渡态理论（[[kinetics/transition-state-theory]]）与$k_\mathrm{cat}$比较。QM能量昂贵，所以量子层次通常用半经验方法或中等基组的DFT，有时在若干点上用更高层次校正。瓦尔谢尔的经验价键（EVB）方法用几个带力场能量的非绝热价键态描述反应体系，是广泛用于酶催化的更便宜的替代。

QM/MM对**凝聚相光谱**同样有用：蛋白中发色团的激发能（视紫红质中的视网膜醛、绿色荧光蛋白发色团）、NMR化学位移与振动光谱，都通过从MD轨迹取快照、用QM/MM静电嵌入求性质、再对快照平均来得到。快照平均捕捉了单一结构会漏掉的不均匀展宽。

## 选择溶剂化模型

| 问题 | 合理的做法 |
|---|---|
| 中性有机物的溶剂化自由能 | SMD或COSMO-RS |
| $\mathrm{p}K_\mathrm{a}$、氧化还原电势 | 连续介质，在带电位点加显式溶剂；相对方案 |
| 溶液中的构象平衡 | 连续介质；柔性分子应与显式溶剂MD对照 |
| 有溶剂参与的反应（质子接力、水解） | 团簇-连续介质，或显式QM/MM MD |
| 酶机理 | QM/MM，静电嵌入加自由能采样 |
| 溶液中的紫外-可见光谱 | 含时密度泛函理论配非平衡连续介质，或QM/MM快照 |
| 分配系数、溶解度 | COSMO-RS，或显式的自由能计算 |

## 后续内容

本课把课程的两半接起来作为收束：[[computational-chemistry/hartree-fock]]至[[computational-chemistry/density-functional-theory]]的电子结构方法提供量子区域与气相能量，而[[computational-chemistry/molecular-mechanics]]至[[computational-chemistry/free-energy-sampling]]的力场与采样方法提供环境与热力学平均。这些多尺度模型的应用遍布整个图谱：[[biochemistry]]中的酶催化、[[medicinal-chemistry/drug-binding]]中的药物结合、[[electrochemistry]]中的电极过程，以及[[organometallics-catalysis]]中的多相催化。

::: history
玻恩（Max Born）1920年导出了他的离子溶剂化公式，昂萨格（Lars Onsager）1936年导出了极性液体的反应场理论。拉蒂默（Wendell Latimer）、皮策（Kenneth Pitzer）与斯兰斯基（Cyril Slansky）1939年引入有效玻恩半径。可极化连续介质模型由米耶尔图什（Stefano Miertuš）、斯克罗科（Eolo Scrocco）与托马西（Jacopo Tomasi）于1981年发展；克拉姆特（Andreas Klamt）与许尔曼（Gerrit Schüürmann）的COSMO继之于1993年，克拉姆特的COSMO-RS在1995年；马雷尼奇（Aleksandr Marenich）、克拉默（Christopher Cramer）与特鲁勒（Donald Truhlar）2009年发表了SMD。瓦尔谢尔（Arieh Warshel）与莱维特（Michael Levitt）1976年对溶菌酶反应的研究引入了QM/MM方法；菲尔德（Martin Field）、巴什（Paul Bash）与卡普拉斯（Martin Karplus）1990年构建了广泛使用的QM/MM组合势；莫罗库马（Keiji Morokuma）与合作者在1995–96年提出了ONIOM方案。2013年诺贝尔化学奖授予卡普拉斯、莱维特与瓦尔谢尔，表彰"复杂化学体系多尺度模型的发展"。
:::

::: summary
- 溶剂化自由能是等浓度之间的转移自由能；气相标准态换算到$1\ \mathrm{mol\,dm^{-3}}$时每种粒子加上$RT\ln 24.46 = 7.93\ \mathrm{kJ\,mol^{-1}}$。
- 玻恩方程$\Delta G = -694.7\,z^{2}(1 - 1/\varepsilon_\mathrm{r})/(a/\mathrm{\AA})\ \mathrm{kJ\,mol^{-1}}$与昂萨格反应场刻画了离子与偶极溶剂化；两者都随$\varepsilon_\mathrm{r}$迅速饱和，空腔半径是一个经验参数。
- PCM、COSMO与SMD在分子空腔上把连续介质静电学与量子力学密度自洽求解；SMD加上参数化的非静电项；COSMO-RS预测活度系数。
- 连续介质模型漏掉具体相互作用；团簇-连续介质模型与相对方案能大幅改善$\mathrm{p}K_\mathrm{a}$与氧化还原计算——在那里$5.7\ \mathrm{kJ\,mol^{-1}}$就是一个$\mathrm{p}K_\mathrm{a}$单位。
- QM/MM在力场环境中量子力学地处理反应区域（加和或减和的ONIOM方案），边界处用静电嵌入与链接原子。
- 酶机理与凝聚相光谱需要QM/MM与对大量环境构型的采样相结合。
:::

## 习题

::: exercise 标准态修正 {level=1 check="7.93"}
计算$298.15\ \mathrm{K}$下的$RT\ln 24.46$。（以$\mathrm{kJ\,mol^{-1}}$输入。）
::: solution
$8.31446\times10^{-3} \times 298.15 \times \ln 24.46 = 2.4790 \times 3.1971 = 7.93\ \mathrm{kJ\,mol^{-1}}$（[[#eq-standard-state]]）。
:::
:::

::: exercise 一个玻恩能量 {level=1 check="-365"}
用水（$\varepsilon_\mathrm{r} = 78.4$）计算一价离子取空腔半径$1.88\ \mathrm{\AA}$时的玻恩水合自由能。（以$\mathrm{kJ\,mol^{-1}}$输入、保留三位有效数字。）
::: solution
$-694.7 \times (1/1.88) \times (1 - 1/78.4) = -369.5 \times 0.98724 = -365\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 从自由能到$\mathrm{p}K_\mathrm{a}$ {level=1 check="4.98"}
某热力学循环给出$298.15\ \mathrm{K}$下一酸解离的$\Delta G^{*}_\mathrm{aq} = 28.4\ \mathrm{kJ\,mol^{-1}}$。它的$\mathrm{p}K_\mathrm{a}$是多少？（保留三位有效数字。）
::: solution
$\mathrm{p}K_\mathrm{a} = \Delta G/(RT\ln 10) = 28.4/5.708 = 4.98$。
:::
:::

::: exercise 离子转移到非极性溶剂 {level=2 check="188"}
用玻恩方程、氯离子取$a = 1.91\ \mathrm{\AA}$，估计$\mathrm{Cl^{-}}$从水（$\varepsilon_\mathrm{r} = 78.4$）转移到己烷（$\varepsilon_\mathrm{r} = 1.89$）的静电自由能。（$\Delta G_\mathrm{transfer}$以$\mathrm{kJ\,mol^{-1}}$输入、保留三位有效数字。）
::: solution
在水中$\Delta G = -694.7/1.91 \times 0.98724 = -359.1\ \mathrm{kJ\,mol^{-1}}$；在己烷中$-694.7/1.91 \times (1 - 1/1.89) = -363.7 \times 0.4709 = -171.3\ \mathrm{kJ\,mol^{-1}}$。转移需要$-171.3 - (-359.1) = +188\ \mathrm{kJ\,mol^{-1}}$：离子不溶于烷烃，这正是相转移催化剂要用大体积亲脂抗衡离子把它们包裹起来的原因。
:::
:::

::: exercise ONIOM拼合 {level=2 check="86.9"}
把$E_\mathrm{high}(\mathrm{model}) = 78.4$、$E_\mathrm{low}(\mathrm{real}) = 12.6$与$E_\mathrm{low}(\mathrm{model}) = 4.1\ \mathrm{kJ\,mol^{-1}}$（相对能量）拼成ONIOM势垒。（以$\mathrm{kJ\,mol^{-1}}$输入。）
::: solution
$78.4 + 12.6 - 4.1 = 86.9\ \mathrm{kJ\,mol^{-1}}$（[[#def-qmmm]]）。
:::
:::

::: exercise 水的昂萨格溶剂化 {level=2 check="-24.7"}
估计一个水分子（$\mu = 1.85\ \mathrm{D}$，$1\ \mathrm{D} = 3.33564\times10^{-30}\ \mathrm{C\,m}$）在水（$\varepsilon_\mathrm{r} = 78.4$）中半径$1.60\ \mathrm{\AA}$的球形空腔里的昂萨格静电溶剂化自由能。（以$\mathrm{kJ\,mol^{-1}}$输入、保留三位有效数字。）
::: solution
$\mu = 6.171\times10^{-30}\ \mathrm{C\,m}$；$\mu^{2}/(4\pi\varepsilon_0 a^{3}) = (3.808\times10^{-59})/(1.11265\times10^{-10} \times 4.096\times10^{-30})\ \mathrm{J} = 8.356\times10^{-20}\ \mathrm{J}$。介电因子为$(\varepsilon_\mathrm{r} - 1)/(2\varepsilon_\mathrm{r} + 1) = 77.4/157.8 = 0.4905$。故$\Delta G = -8.356\times10^{-20} \times 0.4905\ \mathrm{J} = -4.099\times10^{-20}\ \mathrm{J}$，乘$N_\mathrm{A}$：$-24.7\ \mathrm{kJ\,mol^{-1}}$。这接近水的实验水合自由能（$-26.4\ \mathrm{kJ\,mol^{-1}}$），但符合之好完全取决于所选半径：若取$a = 1.40\ \mathrm{\AA}$，估计值将是$-36.8\ \mathrm{kJ\,mol^{-1}}$，因为$\Delta G \propto a^{-3}$。
:::
:::

::: exercise 推导偶极子的COSMO标度 {level=3 check="0.718"}
对导体（$\varepsilon_\mathrm{r} \to \infty$），昂萨格因子$2(\varepsilon_\mathrm{r} - 1)/(2\varepsilon_\mathrm{r} + 1)$趋于$1$。证明介电质中昂萨格能量与导体中昂萨格能量之比为$(\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + \tfrac{1}{2})$，并证明玻恩离子相应的比值为$(\varepsilon_\mathrm{r} - 1)/\varepsilon_\mathrm{r}$。对氯仿（$\varepsilon_\mathrm{r} = 4.81$）计算偶极子的比值。（保留三位有效数字。）
::: solution
偶极子：$\frac{2(\varepsilon_\mathrm{r} - 1)/(2\varepsilon_\mathrm{r} + 1)}{1} = \frac{\varepsilon_\mathrm{r} - 1}{\varepsilon_\mathrm{r} + \frac{1}{2}}$。离子：玻恩因子$(1 - 1/\varepsilon_\mathrm{r})$本来就以导体极限$1$为参考，给出$(\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + 0)$。所以COSMO因子$f = (\varepsilon_\mathrm{r} - 1)/(\varepsilon_\mathrm{r} + x)$对$x = 0$的离子与$x = \tfrac{1}{2}$的偶极子都是精确的，这就是COSMO在该区间取值的原因。对氯仿，偶极子为$3.81/5.31 = 0.718$，离子为$3.81/4.81 = 0.792$；在水中两者相差不足$1\ \%$。
:::
:::

::: exercise 相对$\mathrm{p}K_\mathrm{a}$ {level=3 check="3.77"}
一个等键质子交换反应$\mathrm{HA + B^{-} \rightleftharpoons A^{-} + HB}$中，HB是醋酸（$\mathrm{p}K_\mathrm{a} = 4.76$），算得$298.15\ \mathrm{K}$下$\Delta G^{*}_\mathrm{aq} = -5.65\ \mathrm{kJ\,mol^{-1}}$。导出$\mathrm{p}K_\mathrm{a}(\mathrm{HA}) = \mathrm{p}K_\mathrm{a}(\mathrm{HB}) + \Delta G^{*}_\mathrm{aq}/(RT\ln 10)$并求值，解释为什么这条路线比绝对循环更可靠。（$\mathrm{p}K_\mathrm{a}$保留三位有效数字。）
::: solution
交换反应是HA的解离减去HB的解离，故$\Delta G^{*}_\mathrm{aq} = \Delta G^{*}(\mathrm{HA}) - \Delta G^{*}(\mathrm{HB}) = RT\ln 10\,[\mathrm{p}K_\mathrm{a}(\mathrm{HA}) - \mathrm{p}K_\mathrm{a}(\mathrm{HB})]$。于是$\mathrm{p}K_\mathrm{a}(\mathrm{HA}) = 4.76 - 5.65/5.708 = 4.76 - 0.990 = 3.77$。质子根本不出现，所以它不确定的溶剂化自由能与标准态修正相消（$\Delta n = 0$），连续介质模型对两个相似阴离子的误差也大部分相消。只要参考酸结构相似，相对方案通常把$\mathrm{p}K_\mathrm{a}$误差从几个单位降到约半个单位。
:::
:::
