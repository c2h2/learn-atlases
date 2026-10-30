一根铁钉留在潮湿的空气中会生锈；同一根铁钉如果刷了漆就能用上几十年；一把不锈钢勺在同一片空气中保持锃亮；而一艘钢制船的船体只要装上几块锌块，就能在海水中停留多年——溶解的是锌，不是船。铁在空气和水中于任何pH下热力学上都不稳定——它的标准电势远低于氧电极的电势——所以上面种种差别都是*速率*的差别。腐蚀是没有导线的电化学：金属表面既是金属溶解的阳极，又是还原氧或水的阴极，电子在金属内部从前者流向后者。前面几章的一切——能斯特电势、巴特勒-福尔默（Butler–Volmer）动力学、传质极限、钝化膜——都在这里重新出现，其结果是一个问题的定量理论，而这个问题要花掉世界经济产出的百分之几。NACE IMPACT研究（2016年）估计2013年全球腐蚀成本约为US\$2.5 trillion（约2.5万亿美元），约占世界GDP的$3.4\,\%$，并指出现有方法可以避免其中的$15$–$35\,\%$。

本章依次讨论：通过普拜图（Pourbaix图）看腐蚀的热力学；通过混合电势理论与埃文斯图（Evans diagram）看动力学；腐蚀速率如何测量并换算成穿透速率；电偶偶合、钝化与局部腐蚀；以及防护手段——涂层、缓蚀剂与阴极保护。

## 腐蚀：一只短路的电池

::: definition 腐蚀、腐蚀电势与腐蚀电流 {#def-corrosion}
**水溶液腐蚀**是金属在其环境中经受的电化学氧化，通过同一表面上两个偶联的反应完成：**阳极**反应是金属的溶解或氧化，例如$\mathrm{Fe \rightarrow Fe^{2+} + 2e^-}$；**阴极**反应消耗电子，通常是氧还原（中性或碱性水中$\mathrm{O_2 + 2H_2O + 4e^- \rightarrow 4OH^-}$；酸中$\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$）或析氢（$\mathrm{2H^+ + 2e^- \rightarrow H_2}$，中性溶液中则来自水）。在无外电流时，金属稳定在**腐蚀电势**$E_\mathrm{corr}$（一种**混合电势**）上，此时总阳极电流与总阴极电流大小相等、方向相反；二者共同的大小就是**腐蚀电流**$I_\mathrm{corr}$（电流密度$i_\mathrm{corr}$）。
:::

腐蚀电势不是平衡电势：两个不同的反应沿相反方向同时进行，都不处于平衡，金属停在使二者速率相平衡的那个电势上。卡尔·瓦格纳（Carl Wagner）与威廉·特劳德（Wilhelm Traud）在1938年把这想法置于定量基础之上。一个熟悉的演示是**埃文斯液滴实验**：在洁净铁面上滴一滴含有$\mathrm{Fe^{2+}}$指示剂和$\mathrm{OH^-}$指示剂的盐水，很快就能看到液滴中心——氧气耗尽的地方——铁在溶解，而边缘——氧气容易扩散进来的地方——生成氢氧化物；阳极与阴极相距不过几毫米，铁锈（$\mathrm{FeOOH}$及相关水合氧化物）在二者之间$\mathrm{Fe^{2+}}$与$\mathrm{OH^-}$和氧气相遇处沉淀出来。

## 热力学：普拜图

腐蚀到底可不可能发生取决于电势与pH，马塞尔·普拜（Marcel Pourbaix）的图（他的《水溶液中的电化学平衡》（*Atlas of Electrochemical Equilibria in Aqueous Solutions*），1963年）给出了答案的地图。每条线都是两物种之间平衡的能斯特方程（[[electrochemistry/cell-thermodynamics#prop-nernst]]），其中溶解物种的活度取选定值，按惯例为$10^{-6}$——低于这一水平，金属就被认为实际上不再溶解。

::: definition 普拜图 {#def-pourbaix}
金属在水中的**普拜图**（电势-pH图）在固定温度下显示各物种——金属、溶解离子、氧化物或氢氧化物——热力学稳定的电势$E$（对SHE）与pH的区域，并对溶解物种指定了活度。区域之间由三类线分开：水平线对应不涉及质子的电子转移，竖直线对应不涉及电子转移的酸碱或沉淀平衡，斜线（$25\,^\circ\mathrm{C}$下斜率为每pH单位$-59.16\,m/n\ \mathrm{mV}$）对应含$m$个质子、$n$个电子的反应。区域分为**免疫区**（金属稳定）、**腐蚀区**（可溶物种稳定）与**钝化区**（固态氧化物或氢氧化物稳定，它未必能保护金属）。
:::

对铁而言，画个草图只要三条线就够。$a(\mathrm{Fe^{2+}}) = 10^{-6}$时的$\mathrm{Fe^{2+}/Fe}$边界是位于$E = -0.447 + (0.05916/2)\log10^{-6} = -0.62\ \mathrm{V}$的水平线。$\mathrm{Fe^{3+}/Fe^{2+}}$边界在两活度相等时是位于$0.77\ \mathrm{V}$的水平线。溶解的$\mathrm{Fe^{2+}}$与赤铁矿之间的边界，$\mathrm{Fe_2O_3 + 6H^+ + 2e^- \rightarrow 2Fe^{2+} + 3H_2O}$，$m/n = 3$，斜率为每pH单位$-0.177\ \mathrm{V}$；用普拜的数据（$E^\circ = 0.728\ \mathrm{V}$）和$a(\mathrm{Fe^{2+}}) = 10^{-6}$，它是$E = 1.083 - 0.177\,\mathrm{pH}$。

::: widget plot
f: 1.229 - 0.0591563*x; -0.0591563*x; -0.624 + 0*x; 1.083 - 0.1773*x; 0.771 + 0*x
x: 0, 14
y: -1.2, 1.6
labels: \mathrm{O_2/H_2O}; \mathrm{H^+/H_2}; \mathrm{Fe^{2+}/Fe}; \mathrm{Fe_2O_3/Fe^{2+}}; \mathrm{Fe^{3+}/Fe^{2+}}
caption: 铁的简化普拜图（$25\,^\circ\mathrm{C}$；溶解铁活度$10^{-6}$；电势对SHE对pH作图）。在$\mathrm{Fe^{2+}/Fe}$线以下（以及在pH较高时在未画出的铁/氧化物线以下）铁是免疫的。在它以上、倾斜的$\mathrm{Fe_2O_3/Fe^{2+}}$线之左、$\mathrm{Fe^{3+}/Fe^{2+}}$线以下，溶解的$\mathrm{Fe^{2+}}$稳定：活性腐蚀。倾斜线之右，赤铁矿稳定：钝化区。水本身在两条水线之间稳定。铁的免疫线在pH约10以下的每个pH上都位于氢线之下，所以在除氧的酸中铁以析氢方式腐蚀；而在pH 7的充气水中，氧线（位于$0.82\ \mathrm{V}$）远高于一切——腐蚀总是热力学可能的。注意混凝土中钢所处的位置：孔隙水pH 12.5–13使它处于钝化区，而氯离子或碳化（使pH下降）能把它破坏掉。
:::

::: example 酸中的铜，有空气与无空气 {#ex-copper}
已知$E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.340\ \mathrm{V}$，判断铜在$25\,^\circ\mathrm{C}$下(a)除氧的$1\ \mathrm{mol\,dm^{-3}}$盐酸（pH 0，$p(\mathrm{H_2}) \le 1\ \mathrm{bar}$）和(b)同一盐酸被空气饱和时是否腐蚀，取$a(\mathrm{Cu^{2+}}) = 10^{-6}$作为腐蚀判据。忽略氯离子对铜的配位。
::: solution
铜的免疫线在$E = 0.340 + (0.025693/2)\ln10^{-6} = 0.340 - 0.178 = 0.163\ \mathrm{V}$。(a) 唯一的氧化剂是$\mathrm{H^+}$，其在pH 0的平衡电势为$0\ \mathrm{V}$（若氢压远低于$1\ \mathrm{bar}$则略正：$10^{-6}\ \mathrm{bar}$时为$+0.18\ \mathrm{V}$，所以严格无氢的酸中可能有微量溶解）。要使$\mathrm{Cu + 2H^+ \rightarrow Cu^{2+} + H_2}$进行，铜电对必须低于氢电对；在$0.163\ \mathrm{V}$对$0\ \mathrm{V}$处它并不低于，所以铜实际上是免疫的——这就是铜器能在非氧化性酸中幸存的原因。(b) 有溶解氧时，阴极电对是位于$1.229 + (0.05916/4)\log0.21 = 1.219\ \mathrm{V}$的$\mathrm{O_2/H_2O}$，远高于$0.163\ \mathrm{V}$：铜会腐蚀，速率受氧的传质限制。实际中氯离子与铜(I)强烈配位（$\mathrm{CuCl_2^-}$），使免疫线进一步降低，所以充气的盐酸攻击铜相当地快。
:::
:::

这张图一眼就能解释三种经典的防护策略。把电势降到免疫区——**阴极保护**。把pH或电势升进钝化区——碱性环境、阳极保护、钝化型缓蚀剂。或者使水和氧远离表面——涂层。这张图不能说的是任何过程有多快，而且它无视其他物种的作用：氯离子会形成可溶配合物并破坏氧化膜，硫化物会形成自己的固相。

::: warning 普拜图不是腐蚀速率图 {#warn-pourbaix}
三种误读很常见。(1)"钝化区意味着不腐蚀"。图只说某种氧化物热力学稳定；这种氧化物是形成致密、附着的膜（如不锈钢上的$\mathrm{Cr_2O_3}$），还是疏松、剥落的锈（如近中性pH下水合氧化铁常如此），是动力学与显微组织的问题。(2)"腐蚀区意味着腐蚀很快"。铝在强酸强碱中处于腐蚀区，但在中等pH下一层薄膜可能大大减缓溶解，即使图上没给什么承诺。(3)"这张图适用于我的溶液"。它适用于纯水、选定的金属离子活度、$25\,^\circ\mathrm{C}$；氯离子、配位剂、温度与合金化都会改变这些线。普拜图只能用来把腐蚀*排除*在外（免疫区）或提示策略，绝不能用来预测速率。
:::

## 动力学：混合电势与埃文斯图

腐蚀的快慢由两个半反应的动力学决定，每个半反应都按各自平衡电势附近的巴特勒-福尔默动力学进行（[[electrochemistry/electrode-kinetics#prop-bv]]）。在$\log_{10}|i|$对$E$的图上——即**埃文斯图**，以尤利克·理查德森·埃文斯（Ulick Richardson Evans）命名——远离自身平衡的每个半反应都是一条直的塔菲尔线，腐蚀电势与腐蚀电流从它们的交点读出。

::: proposition 由塔菲尔动力学求腐蚀电势与电流 {#prop-mixed}
设金属的阳极溶解遵循$i_\mathrm{a} = i_{0,\mathrm{M}}\,10^{(E - E_\mathrm{M})/b_\mathrm{a}}$，阴极反应遵循$|i_\mathrm{c}| = i_{0,\mathrm{X}}\,10^{-(E - E_\mathrm{X})/b_\mathrm{c}}$，其中$E_\mathrm{M}$与$E_\mathrm{X}$是二者的平衡电势，$i_0$是二者在该金属上的交换电流密度，$b_\mathrm{a}, b_\mathrm{c} > 0$是二者的塔菲尔斜率（每十倍电压的伏数）。若二者在腐蚀电势处都处于各自的塔菲尔区（即按$b$的尺度$E_\mathrm{M} \ll E_\mathrm{corr} \ll E_\mathrm{X}$），则
$$
E_\mathrm{corr} = \frac{b_\mathrm{a}b_\mathrm{c}}{b_\mathrm{a} + b_\mathrm{c}}\left[\log_{10}\frac{i_{0,\mathrm{X}}}{i_{0,\mathrm{M}}} + \frac{E_\mathrm{M}}{b_\mathrm{a}} + \frac{E_\mathrm{X}}{b_\mathrm{c}}\right], \qquad
\log_{10}i_\mathrm{corr} = \log_{10}i_{0,\mathrm{M}} + \frac{E_\mathrm{corr} - E_\mathrm{M}}{b_\mathrm{a}} .
$$ {#eq-mixed}
:::

::: proof
开路时净电流为零，所以$i_\mathrm{a}(E_\mathrm{corr}) = |i_\mathrm{c}(E_\mathrm{corr})|$。取对数，
$$
\log_{10}i_{0,\mathrm{M}} + \frac{E_\mathrm{corr} - E_\mathrm{M}}{b_\mathrm{a}} = \log_{10}i_{0,\mathrm{X}} - \frac{E_\mathrm{corr} - E_\mathrm{X}}{b_\mathrm{c}} .
$$
把$E_\mathrm{corr}$项合并：$E_\mathrm{corr}(1/b_\mathrm{a} + 1/b_\mathrm{c}) = \log_{10}(i_{0,\mathrm{X}}/i_{0,\mathrm{M}}) + E_\mathrm{M}/b_\mathrm{a} + E_\mathrm{X}/b_\mathrm{c}$，且$1/(1/b_\mathrm{a} + 1/b_\mathrm{c}) = b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c})$。腐蚀电流就是$E_\mathrm{corr}$处的任一偏电流。塔菲尔形式之所以成立，是因为在$E_\mathrm{corr}$处每个反应都远离自身的平衡，其逆反应（金属沉积；氢氧化）可以忽略。
:::

::: example 除氧酸中的铁 {#ex-evans}
铁在除氧的$1\ \mathrm{mol\,dm^{-3}}$酸中腐蚀（pH 0，故$E_\mathrm{H} = 0$）。铁溶解取$E_\mathrm{Fe} = -0.44\ \mathrm{V}$、$i_{0,\mathrm{Fe}} = 1.0\times10^{-8}\ \mathrm{A\,cm^{-2}}$、$b_\mathrm{a} = 0.060\ \mathrm{V}$；铁上析氢取$i_{0,\mathrm{H}} = 1.0\times10^{-6}\ \mathrm{A\,cm^{-2}}$、$b_\mathrm{c} = 0.120\ \mathrm{V}$。求$E_\mathrm{corr}$、$i_\mathrm{corr}$与穿透速率。
::: solution
由[[#eq-mixed]]，$b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c}) = 0.0072/0.180 = 0.0400\ \mathrm{V}$，且
$$
E_\mathrm{corr} = 0.0400\left[\log_{10}100 + \frac{-0.44}{0.060} + \frac{0}{0.120}\right]\ \mathrm{V} = 0.0400\,(2 - 7.333)\ \mathrm{V} = -0.213\ \mathrm{V} .
$$
于是$\log_{10}i_\mathrm{corr} = -8 + (-0.213 + 0.44)/0.060 = -8 + 3.78 = -4.22$，故$i_\mathrm{corr} = 6.0\times10^{-5}\ \mathrm{A\,cm^{-2}}$。由法拉第定律（下一个命题）这相当于每年$0.70\ \mathrm{mm}$。腐蚀电势位于两个平衡电势之间，位置由交换电流与塔菲尔斜率决定——这里几乎在正中。把$i_{0,\mathrm{H}}$减半——例如加入微量阻断析氢部位的缓蚀剂——会使$i_\mathrm{corr}$降低$2^{b_\mathrm{a}/(b_\mathrm{a}+b_\mathrm{c})} = 2^{1/3} = 1.26$倍。
:::
:::

::: widget plot
f: lM + (x - EM)/ba; lH - (x + 0.0591563*pH)/bc
x: -1, 0.3
y: -10, 0
sliders: EM=-0.44:-0.9:0:0.01; lM=-8:-10:-4:0.1; ba=0.06:0.03:0.12:0.005; lH=-6:-12:-3:0.1; bc=0.12:0.06:0.2:0.005; pH=0:0:7:0.1
labels: \text{金属溶解 } \log_{10}i_\mathrm{a}; \text{析氢 } \log_{10}|i_\mathrm{c}|
caption: 金属以析氢方式腐蚀的埃文斯图：偏电流密度的$\log_{10}$（单位$\mathrm{A\,cm^{-2}}$）对以V对SHE计的电势$E$（$x$）作图。阳极线从金属的平衡电势$E_\mathrm{M}$与交换电流$10^{\mathrm{lM}}$出发；阴极线从氢电势$-0.0592\,\mathrm{pH}$与$10^{\mathrm{lH}}$出发。两线的交点即$(E_\mathrm{corr}, \log i_\mathrm{corr})$，默认设置就是[[#ex-evans]]。调高pH，阴极线左移，腐蚀速率降低；调低$\mathrm{lH}$（析氢催化剂性能差，如锌或铅上的情形），尽管热力学驱动力不变，腐蚀也会急剧减慢。改变$E_\mathrm{M}$可以看出：更活泼的金属（$E_\mathrm{M}$更负）未必腐蚀更快——决定速率的是动力学，不是电化学顺序表。
:::

::: proposition 腐蚀速率的法拉第定律 {#prop-faraday}
摩尔质量$M$、密度$\rho$的金属以$\mathrm{M^{n+}}$溶解，在均匀腐蚀电流密度$i_\mathrm{corr}$下单位面积的失质量为$i_\mathrm{corr}M/nF$，其表面以**穿透速率**后退
$$
\frac{\mathrm{d}x}{\mathrm{d}t} = \frac{i_\mathrm{corr}M}{nF\rho} .
$$ {#eq-penetration}
对铁（$n = 2$），$1\ \mu\mathrm{A\,cm^{-2}}$相当于每年$11.6\ \mu\mathrm{m}$。
:::

::: proof
单位面积的电荷$i_\mathrm{corr}\,\mathrm{d}t$溶解$i_\mathrm{corr}\,\mathrm{d}t/nF$摩尔金属（法拉第定律），质量$Mi_\mathrm{corr}\,\mathrm{d}t/nF$，单位面积的体积$Mi_\mathrm{corr}\,\mathrm{d}t/(nF\rho)$，即失去的厚度。对铁：$1.0\times10^{-6}\ \mathrm{A\,cm^{-2}}\times55.85\ \mathrm{g\,mol^{-1}}/(2\times96\,485\ \mathrm{C\,mol^{-1}}\times7.87\ \mathrm{g\,cm^{-3}}) = 3.68\times10^{-11}\ \mathrm{cm\,s^{-1}}$；乘以每年的$3.156\times10^{7}\ \mathrm{s}$，得$1.16\times10^{-3}\ \mathrm{cm} = $每年$11.6\ \mu\mathrm{m}$。该式假定均匀腐蚀；局部腐蚀把同样的电流集中到小面积上，穿透快得多。
:::

### 氧限制的腐蚀

在中性充气的淡水中，阴极反应是氧还原，其速率通常不受动力学限制，而受溶解氧的扩散限制，而氧在$25\,^\circ\mathrm{C}$空气饱和淡水中的溶解度只有约$0.26\ \mathrm{mmol\,dm^{-3}}$。在埃文斯图上，阴极线在极限电流密度$i_\mathrm{l} = 4FD_{\mathrm{O_2}}c_{\mathrm{O_2}}/\delta$处变成一段竖直的平台（[[electrochemistry/voltammetry]]），只要阳极线在平台上与其相交，就有$i_\mathrm{corr} = i_\mathrm{l}$，与金属自身的动力学无关。取$D = 2.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$、$c = 2.6\times10^{-7}\ \mathrm{mol\,cm^{-3}}$、静止的边界层$\delta = 1\ \mathrm{mm}$，得$i_\mathrm{l} = 2.0\times10^{-5}\ \mathrm{A\,cm^{-2}}$，即每年$0.23\ \mathrm{mm}$的钢。这就是钢在天然水中的腐蚀速率为何如此强烈地取决于流速（减薄$\delta$）、温度（同时改变$D$与溶解度）和含氧量——以及为什么电站把锅炉给水除氧当作第一道防线。

## 腐蚀速率的测量

悬挂数月后称重的失重试片仍是基准方法，但电化学方法能在几分钟内测出腐蚀速率，且无需把金属从服役中取出。

::: proposition 斯特恩-吉里（Stern–Geary）关系 {#prop-stern-geary}
在腐蚀电势附近，小极化$\Delta E = E - E_\mathrm{corr}$下的净电流密度$i$与$\Delta E$成线性，**极化电阻**$R_\mathrm{p} = (\mathrm{d}\Delta E/\mathrm{d}i)_{\Delta E\rightarrow0}$（单位$\Omega\,\mathrm{cm^2}$）给出腐蚀电流密度：
$$
i_\mathrm{corr} = \frac{B}{R_\mathrm{p}}, \qquad B = \frac{b_\mathrm{a}b_\mathrm{c}}{2.303\,(b_\mathrm{a} + b_\mathrm{c})} ,
$$ {#eq-stern-geary}
其中$b_\mathrm{a}$与$b_\mathrm{c}$是阳极、阴极反应的塔菲尔斜率。该关系在两个反应在$E_\mathrm{corr}$处都处于活化（塔菲尔）控制时成立。
:::

::: proof
把偏电流以腐蚀电势为基准写出：$i_\mathrm{a} = i_\mathrm{corr}\,10^{\Delta E/b_\mathrm{a}}$，$|i_\mathrm{c}| = i_\mathrm{corr}\,10^{-\Delta E/b_\mathrm{c}}$，按定义它们在$\Delta E = 0$时等于$i_\mathrm{corr}$。净电流为
$$
i = i_\mathrm{corr}\left[10^{\Delta E/b_\mathrm{a}} - 10^{-\Delta E/b_\mathrm{c}}\right] = i_\mathrm{corr}\left[\mathrm{e}^{2.303\Delta E/b_\mathrm{a}} - \mathrm{e}^{-2.303\Delta E/b_\mathrm{c}}\right] .
$$
对小的$\Delta E$，把两个指数都展开到一阶：$i \approx i_\mathrm{corr}\,2.303\,\Delta E\,(1/b_\mathrm{a} + 1/b_\mathrm{c})$。于是$R_\mathrm{p} = \Delta E/i = (b_\mathrm{a}b_\mathrm{c})/[2.303\,i_\mathrm{corr}(b_\mathrm{a} + b_\mathrm{c})]$，整理即得[[#eq-stern-geary]]。这是[[electrochemistry/electrode-kinetics#prop-limits]]中电荷转移电阻$RT/Fj_0$的腐蚀类比，腐蚀电流在其中扮演交换电流的角色。若阴极反应受扩散限制，则$b_\mathrm{c} \rightarrow \infty$，$B = b_\mathrm{a}/2.303$。
:::

::: example 一次线性极化测量 {#ex-rp}
冷却水中的钢探头在$E_\mathrm{corr}$附近以$\pm10\ \mathrm{mV}$扫描测得极化电阻$500\ \Omega\,\mathrm{cm^2}$。取每十倍$b_\mathrm{a} = 0.060$、$b_\mathrm{c} = 0.120\ \mathrm{V}$，求$i_\mathrm{corr}$与穿透速率。
::: solution
$B = 0.060\times0.120/(2.303\times0.180)\ \mathrm{V} = 0.0174\ \mathrm{V}$，故$i_\mathrm{corr} = 0.0174/500\ \mathrm{A\,cm^{-2}} = 3.5\times10^{-5}\ \mathrm{A\,cm^{-2}}$，即$35\ \mu\mathrm{A\,cm^{-2}}$。用[[#prop-faraday]]，$35\times11.6\ \mu\mathrm{m}$每年 $= 0.40\ \mathrm{mm}$每年——这个速率需要加缓蚀剂。对实际的塔菲尔斜率，$B$只在约$0.013$到$0.052\ \mathrm{V}$之间变化，所以即使$B$只是估计值，$i_\mathrm{corr}$也在二倍以内，足以比较处理方案的优劣、发现异常；低电导率的水需从测量电阻中扣除溶液电阻（[[electrochemistry/conductivity]]）。
:::
:::

## 电偶腐蚀、钝化与局部腐蚀

当两种不同的金属在同一电解质中电接触时，它们共用一个混合电势。较活泼的金属（该环境中腐蚀电势较低者）被阳极极化而腐蚀更快；较贵金属被阴极极化而腐蚀更慢或不腐蚀。要紧的排序是**电偶序**——在特定环境（如海水）中测得的腐蚀电势——而不是标准电势表：海水中的次序大致为镁、锌、铝合金、碳钢、铅、黄铜、铜、镍合金、钝态不锈钢、钛、石墨、铂。电偶序是经验的、依赖环境的；例如铝在标准序中比锌活泼，但实际中常因其氧化膜而更不活泼。

**面积比**决定严重程度。在氧限制条件下，总阴极电流是极限电流密度乘以*阴极*面积，而它全部要靠溶解*阳极*来提供。小阳极接大阴极——铜板上的钢铆钉、贵金属涂层上的划痕——腐蚀极快；大阳极配小阴极则相对无害。这就是钢用锌镀（牺牲性的、较不贵金属的涂层：划痕暴露的是大阳极之中的小阴极）而不用铜或锡（只在完整时起作用）的原因。

**钝化**是某些金属在电势升高时变得几乎惰性的奇特能力。铁在硫酸中的极化曲线上，阳极电流像任何活泼金属一样随电势上升，然后在**钝化（Flade）电势**处，随一层纳米厚氧化膜的形成下降三到六个数量级；它在很宽的**钝化区**上保持低位，只在**超钝化**电势处重新上升——此时膜本身被氧化或析出氧气。法拉第（Faraday）与舍恩拜因（Schönbein）在1830年代研究了铁在浓硝酸中的钝化，弗拉德（Flade）在1911年表征了钝化建立的电势。不锈钢至少含$10.5\,\%$的铬（按欧洲标准定义），足以形成连续的富$\mathrm{Cr_2O_3}$膜，在空气和水中自发钝化；钝化电流密度在$0.1$–$1\ \mu\mathrm{A\,cm^{-2}}$量级，即每年不到一微米。

钝化有一个致命弱点：**局部腐蚀**。氯离子吸附在钝化膜上，并在**点蚀电位**以上于薄弱点（硫化锰夹杂物、晶界）把膜击穿。蚀坑内部，溶解的金属离子水解，$\mathrm{M^{2+} + H_2O \rightarrow MOH^+ + H^+}$，pH下降，氯离子迁入以平衡电荷，蚀坑变成酸性、富氯、膜无法再形成的微环境——一个自催化的电池，阳极微小而整个钝化表面是阴极。**缝隙腐蚀**在氧气耗尽的垫片与沉积物下方按同样方式发生，**应力腐蚀开裂**把局部腐蚀与拉伸应力结合起来。这些形态造成大多数突发失效，因为它们在总失重很小的情况下深深穿透。钼与氮的添加（如316相对304）提高抗点蚀能力。

::: quiz
一只钢罐涂了一层有机漆，漆被划破一个小口，露出裸钢。在海水中，划痕处将
- [ ] 比未涂漆的罐腐蚀更慢，因为暴露面积很小
- [x] 若漆绝缘性差、其余表面能充当阴极，则以很高的局部速率腐蚀；若漆绝缘，则速率仅由暴露面积决定
- [ ] 不腐蚀，因为漆比钢更贵金属
- [ ] 任何情况下单位面积速率都与未涂漆的罐相同
::: solution
大多数有机涂层是良绝缘体，不充当阴极，所以划痕就像一小块裸露的钢那样腐蚀（氧还原就在裸露的钢本身发生），且没有牺牲作用，腐蚀还会在漆下掏空。反过来，若缺陷周围的涂层或表面能支持阴极反应（贵金属涂层，或能传导电子的氧化铁皮），大阴就会在小阳上驱动剧烈的腐蚀。两种情形下漆都"不"提供电化学保护；那需要锌这样的牺牲涂层，或阴极保护。
:::
:::

## 防护

**涂层**把金属与环境隔开：漆与聚合物（屏障涂层，常含缓蚀颜料）、较贵金属的金属涂层（铬、镍、锡——只在完整时起作用）或较不贵金属的金属涂层（锌，热浸镀锌，以及锌-铝合金——牺牲性），以及磷化与阳极氧化膜这类转化膜。**缓蚀剂**是少量添加到环境中的物质。阳极型缓蚀剂（过去是铬酸盐，如今是钼酸盐、亚硝酸盐、磷酸盐）促进钝化；阴极型缓蚀剂（锌盐、聚磷酸盐）在阴极部位沉淀或减缓氧还原；吸附型缓蚀剂（胺类、咪唑啉类、硫脲衍生物）吸附在表面（[[electrochemistry/double-layer]]）上，同时阻挡两个反应。铬酸盐曾是标准选择，现因铬(VI)化合物致癌（GHS 1类）而被限制使用。**设计**与化学同等重要：避免缝隙、异种金属接触与积水，并在壁厚中预留腐蚀裕量。

::: algorithm 阴极保护的选择与定尺寸 {#alg-cp}
1. **判据。**确定保护电势。土壤或水中的碳钢，经典判据是对饱和铜-硫酸铜参比$-0.85\ \mathrm{V}$（海水中约对银-氯化银$-0.80\ \mathrm{V}$），即比钢的腐蚀电势足够负，使残余阳极电流小到可以忽略；更负的电势浪费电流，并会引起高强钢的氢脆与涂层剥离。
2. **电流需求。**估计裸（或涂层破损）面积$A$与达到判据所需的电流密度$i_\mathrm{p}$——大致是氧还原的极限电流，从埋地土壤中的几十$\mathrm{mA\,m^{-2}}$到流动海水中的$100$–$200\ \mathrm{mA\,m^{-2}}$。电流为$I = Ai_\mathrm{p}$。
3. **方法。**小电流、导电性好的环境（海水），用**牺牲阳极**——锌、铝合金或镁——靠自身腐蚀提供电流。大型结构或高电阻率土壤，用整流器经惰性阳极（钛基混合金属氧化物、高硅铁、石墨）提供**外加电流**。
4. **阳极质量与寿命。**对牺牲阳极，设计寿命$t$所需质量$m = It/(\varepsilon q)$，$q$是理论容量（单位$\mathrm{Ah\,kg^{-1}}$，数值上等于$nF/3.6M$（以$\mathrm{mAh\,g^{-1}}$计），[[electrochemistry/batteries#eq-capacity]]），$\varepsilon$是阳极的电流效率。
5. **验证。**沿结构测量结构-电解质电势，扣除土壤或水中的欧姆降，并定期复测。
:::

::: example 船体的牺牲锌阳极 {#ex-cp}
钢制船体有$20\ \mathrm{m^2}$涂层破损而裸露的钢，海水中阴极保护需要$0.10\ \mathrm{A\,m^{-2}}$。若锌的电流效率为$95\,\%$，每年消耗多少锌阳极？
::: solution
$I = 20\times0.10 = 2.0\ \mathrm{A}$。一年为$3.156\times10^{7}\ \mathrm{s}$，电荷$6.31\times10^{7}\ \mathrm{C}$。锌以$\mathrm{Zn^{2+}}$溶解：
$$
m = \frac{Q}{\varepsilon\,nF}M = \frac{6.31\times10^{7}}{0.95\times2\times96\,485}\times65.38\ \mathrm{g} = 2.25\times10^{4}\ \mathrm{g} = 22.5\ \mathrm{kg}\ \text{每年}.
$$
锌的理论容量是$820\ \mathrm{Ah\,kg^{-1}}$；铝-锌-铟合金实际约$2700\ \mathrm{Ah\,kg^{-1}}$，同一任务下更轻，用于海洋工程结构。注意锌在干什么：它是一只能源电池的阳极，那电池的阴极是船，于是船自身的阳极部位被抑制了。这个想法可追溯到戴维（Humphry Davy）。
:::
:::

::: history 从戴维的保护块到普拜的图谱 {#hist-corrosion}
1824年，英国海军部问戴维（Humphry Davy）为什么军舰的铜包覆会腐蚀，他证明在铜上附上小锌块或铁块就能保护铜——这是最早的阴极保护，当时被弃用，因为保护下的铜长满了本应由铜离子驱避的海藻与藤壶。法拉第（Michael Faraday）与克里斯蒂安·舍恩拜因（Christian Schönbein）在1830年代研究了铁的钝化，弗里德里希·弗拉德（Friedrich Flade，1911年）表征了钝化建立与破坏的电势。剑桥的尤利克·理查德森·埃文斯（Ulick Richardson Evans）从1920年代起，通过他的盐滴实验等实验确立了腐蚀是电化学的、阳极区与阴极区是分离的，并引入了以他命名的电流-电势图。卡尔·瓦格纳（Carl Wagner）与威廉·特劳德（Wilhelm Traud）在1938年建立了混合电势理论。米尔顿·斯特恩（Milton Stern）与艾伯特·吉里（Albert Geary）在1957年导出极化电阻关系式——电化学腐蚀监测的基础——马塞尔·普拜（Marcel Pourbaix）在1963年出版了《电化学平衡图谱》（*Atlas d'équilibres électrochimiques*，英译本1966年）。
:::

## 后续内容

腐蚀把这门课的全部部分合成一处收尾：热力学（普拜图，来自[[electrochemistry/cell-thermodynamics]]）、界面（缓蚀剂的吸附与膜的破裂，[[electrochemistry/double-layer]]）、动力学（塔菲尔线与混合电势，[[electrochemistry/electrode-kinetics]]）、传质（氧限制的腐蚀，[[electrochemistry/voltammetry]]），以及[[electrochemistry/batteries]]与[[electrochemistry/fuel-cells-electrolysis]]中遇到的材料问题——集流体、催化剂载体与双极板必须在苛刻的电势下存活。耐蚀合金、涂层与氧化膜的设计在[[materials-chemistry]]中进一步展开；环境方面——由二氧化硫与氯离子驱动的大气腐蚀，以及酸沉降对建筑与纪念碑的影响——在环境化学课程中。

::: summary
- 腐蚀把金属氧化与氧还原或析氢偶联在同一表面上；金属停在两个电流相等的混合腐蚀电势上。
- 普拜图由选定溶解活度（$10^{-6}$）下的能斯特方程给出免疫、腐蚀与钝化对电势和pH的地图；它们显示什么是可能的，从不显示有多快。
- 埃文斯图由塔菲尔线的交点给出$E_\mathrm{corr}$与$i_\mathrm{corr}$；决定速率的是动力学（交换电流、塔菲尔斜率）与氧的传质，不是电化学顺序表；在中性充气水中常常由氧的扩散限制速率。
- 法拉第定律把$i_\mathrm{corr}$换算成穿透速率$iM/nF\rho$（铁为每$\mu\mathrm{A\,cm^{-2}}$每年$11.6\ \mu\mathrm{m}$）；斯特恩-吉里关系$i_\mathrm{corr} = B/R_\mathrm{p}$由一个小线性极化取得它。
- 电偶偶合腐蚀较活泼的金属，以小阳过大阴为最烈；给金属排序的是实际环境中的电偶序，不是标准电势。
- 钝化膜使溶解降低若干个数量级，但氯离子通过酸化、自维持的局部电池引起点蚀与缝隙腐蚀。
- 防护手段有涂层（屏障或牺牲）、缓蚀剂（阳极型、阴极型、吸附型）、设计，以及用牺牲阳极或外加电流把电势控到判据——如钢对$\mathrm{Cu/CuSO_4}$的$-0.85\ \mathrm{V}$——的阴极保护。
:::

## 习题

::: exercise 铁的穿透速率 {level=1 check="0.116"}
钢以$i_\mathrm{corr} = 10\ \mu\mathrm{A\,cm^{-2}}$均匀腐蚀。求穿透速率（$M = 55.85\ \mathrm{g\,mol^{-1}}$、$\rho = 7.87\ \mathrm{g\,cm^{-3}}$、$n = 2$）。（以每年mm填写。）
::: solution
$\mathrm{d}x/\mathrm{d}t = iM/nF\rho = 1.0\times10^{-5}\times55.85/(2\times96\,485\times7.87)\ \mathrm{cm\,s^{-1}} = 3.68\times10^{-10}\ \mathrm{cm\,s^{-1}}$；乘以$3.156\times10^{7}\ \mathrm{s}$，得$1.16\times10^{-2}\ \mathrm{cm} = $每年$0.116\ \mathrm{mm}$——钢在静止淡水中的典型值。
:::
:::

::: exercise 锌阳极的一年 {level=1 check="10.7"}
一块牺牲阳极以$1.00\ \mathrm{A}$供电一年（$3.156\times10^{7}\ \mathrm{s}$），在$100\,\%$效率下消耗多少锌？（质量以kg填写。）
::: solution
$m = ItM/nF = 1.00\times3.156\times10^{7}\times65.38/(2\times96\,485)\ \mathrm{g} = 1.07\times10^{4}\ \mathrm{g} = 10.7\ \mathrm{kg}$。
:::
:::

::: exercise 铁的免疫线 {level=1 check="-0.624"}
用$E^\circ = -0.447\ \mathrm{V}$，求$25\,^\circ\mathrm{C}$、$a(\mathrm{Fe^{2+}}) = 10^{-6}$时普拜图上$\mathrm{Fe^{2+}/Fe}$边界的电势。（$E$以V对SHE填写。）
::: solution
$E = -0.447 + (0.025693/2)\ln10^{-6} = -0.447 - 0.1775 = -0.624\ \mathrm{V}$。低于这一电势铁是免疫的：溶解的铁会被重新沉积。
:::
:::

::: exercise 极化电阻 {level=2 check="21.7"}
扣除溶液电阻后，某碳钢探头的$R_\mathrm{p} = 800\ \Omega\,\mathrm{cm^2}$，塔菲尔斜率每十倍$b_\mathrm{a} = 0.060$、$b_\mathrm{c} = 0.120\ \mathrm{V}$。求$i_\mathrm{corr}$。（以$\mu\mathrm{A\,cm^{-2}}$填写。）
::: solution
$B = 0.060\times0.120/(2.303\times0.180) = 0.01737\ \mathrm{V}$；$i_\mathrm{corr} = B/R_\mathrm{p} = 0.01737/800\ \mathrm{A\,cm^{-2}} = 2.17\times10^{-5}\ \mathrm{A\,cm^{-2}} = 21.7\ \mu\mathrm{A\,cm^{-2}}$，即每年约$0.25\ \mathrm{mm}$。
:::
:::

::: exercise 小阳过大阴 {level=2 check="23.2"}
总湿润面积$100\ \mathrm{cm^2}$的钢制紧固件把一块面积$1.00\ \mathrm{m^2}$的铜板固定在充气的海水中。铜上的阴极反应是氧还原，受扩散限制为$20\ \mu\mathrm{A\,cm^{-2}}$，全部阴极电流都由钢提供。求紧固件的穿透速率，忽略钢本身的阴极反应。（以每年mm填写。）
::: solution
阴极电流$= 20\times10^{-6}\ \mathrm{A\,cm^{-2}}\times10^{4}\ \mathrm{cm^2} = 0.20\ \mathrm{A}$，集中于$100\ \mathrm{cm^2}$的钢上：$i = 2.0\times10^{-3}\ \mathrm{A\,cm^{-2}}$。按每$\mu\mathrm{A\,cm^{-2}}$每年$11.6\ \mu\mathrm{m}$，穿透速率为$2000\times11.6\ \mu\mathrm{m}$每年 $= 23.2\ \mathrm{mm}$每年——几毫米厚的紧固件几个月内就会失效。把材料对调（钢板中的铜紧固件），同样的电流摊到大面积的钢上，约为每年$0.2\ \mathrm{mm}$。
:::
:::

::: exercise 酸中的锌 {level=2 check="-0.795"}
锌在pH 0的除氧酸中以析氢方式腐蚀。取$E_\mathrm{Zn} = -0.940\ \mathrm{V}$（对应$a(\mathrm{Zn^{2+}}) = 10^{-6}$）、$i_{0,\mathrm{Zn}} = 1.0\times10^{-7}\ \mathrm{A\,cm^{-2}}$、$b_\mathrm{a} = 0.040\ \mathrm{V}$；锌上析氢取$E_\mathrm{H} = 0$、$i_{0,\mathrm{H}} = 1.0\times10^{-10}\ \mathrm{A\,cm^{-2}}$、$b_\mathrm{c} = 0.120\ \mathrm{V}$。求$E_\mathrm{corr}$与$i_\mathrm{corr}$。（$E_\mathrm{corr}$以V填写。）
::: solution
$b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c}) = 0.0048/0.160 = 0.0300\ \mathrm{V}$。$E_\mathrm{corr} = 0.0300[\log_{10}(10^{-10}/10^{-7}) + (-0.940)/0.040 + 0] = 0.0300(-3 - 23.5) = -0.795\ \mathrm{V}$。于是$\log_{10}i_\mathrm{corr} = -7 + (-0.795 + 0.940)/0.040 = -7 + 3.62 = -3.38$，故$i_\mathrm{corr} = 4.2\times10^{-4}\ \mathrm{A\,cm^{-2}}$。尽管平衡电势负得多，锌的腐蚀只比[[#ex-evans]]中的铁快约七倍，因为锌上的析氢如此之慢；沉积到锌上的微量催化性能更好的金属（铜或铂）会使其溶解急剧加快，这是阴极控制的经典演示。
:::
:::

::: exercise 斯特恩-吉里关系式的推导 {level=3 check="0.0261"}
从以$E_\mathrm{corr}$为基准写出的两个偏反应的塔菲尔动力学出发，推导$i_\mathrm{corr} = B/R_\mathrm{p}$。然后求阳极斜率为每十倍$0.060\ \mathrm{V}$、阴极反应受扩散限制时的$B$，并物理解释结果。（$B$以V填写。）
::: hint
受扩散限制的阴极电流不随电势变化：它的塔菲尔斜率是多少？
:::
::: solution
推导就是[[#prop-stern-geary]]的推导：$i = i_\mathrm{corr}[\mathrm{e}^{2.303\Delta E/b_\mathrm{a}} - \mathrm{e}^{-2.303\Delta E/b_\mathrm{c}}] \approx 2.303\,i_\mathrm{corr}\Delta E(1/b_\mathrm{a} + 1/b_\mathrm{c})$，故$R_\mathrm{p} = B/i_\mathrm{corr}$，其中$B = b_\mathrm{a}b_\mathrm{c}/2.303(b_\mathrm{a} + b_\mathrm{c})$。受扩散限制的阴极电流与电势无关，对应$b_\mathrm{c} \rightarrow \infty$；由于在该极限下$b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c}) \rightarrow b_\mathrm{a}$，$B = b_\mathrm{a}/2.303 = 0.060/2.303 = 0.0261\ \mathrm{V}$。物理上，小极化只改变阳极电流（阴极电流钉在极限值上），所以净电流的全部响应都来自阳极塔菲尔线，电极比两个反应都响应时"更硬"（同样的$i_\mathrm{corr}$下$R_\mathrm{p}$更大）。对这样的系统使用活化控制的$B = 0.0174\ \mathrm{V}$，会把$i_\mathrm{corr}$低估三分之一。
:::
:::

::: exercise 流水中氧限制的腐蚀 {level=3 check="0.233"}
$25\,^\circ\mathrm{C}$空气饱和水中的钢以氧还原的极限速率腐蚀。取$D(\mathrm{O_2}) = 2.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$、$c(\mathrm{O_2}) = 0.26\ \mathrm{mmol\,dm^{-3}}$、扩散层$1.0\ \mathrm{mm}$，求穿透速率。若流动把扩散层减薄到$0.10\ \mathrm{mm}$，它变为几倍，而什么会阻止它无限上升？（$\delta = 1.0\ \mathrm{mm}$时的穿透速率以每年mm填写。）
::: solution
$i_\mathrm{l} = 4FDc/\delta = 4\times96\,485\times2.0\times10^{-5}\times2.6\times10^{-7}/0.10\ \mathrm{A\,cm^{-2}} = 2.0\times10^{-5}\ \mathrm{A\,cm^{-2}}$；按每$\mu\mathrm{A\,cm^{-2}}$每年$11.6\ \mu\mathrm{m}$，$20.1\times11.6\ \mu\mathrm{m} = $每年$0.233\ \mathrm{mm}$。只要阴极反应保持传质限制，$\delta$减薄十倍就使速率上升十倍，达每年$2.3\ \mathrm{mm}$。最终阳极线会在阴极曲线的动力学部分（氧还原的塔菲尔区）与其相交，速率不再按$1/\delta$变化；流动再大，由于到达表面的氧更多，可能形成保护性氧化膜（钢在高充氧水中的钝化）——或者把它冲蚀掉（冲蚀-腐蚀）。因此在腐蚀中流动从来不是一个简单的因素。
:::
:::

::: exercise 管道的镁阳极 {level=3 check="15.9"}
一条埋地涂层的钢制管道需要$0.10\ \mathrm{A}$阴极保护电流。镁阳极的理论容量为$2205\ \mathrm{Ah\,kg^{-1}}$，电流效率$50\,\%$。$20$年设计寿命（每年$8766\ \mathrm{h}$）需要多少镁？校核理论容量。（质量以kg填写。）
::: solution
理论容量：$2F/(3.6\times24.305)\ \mathrm{mAh\,g^{-1}} = 2205\ \mathrm{mAh\,g^{-1}} = 2205\ \mathrm{Ah\,kg^{-1}}$（[[electrochemistry/batteries#eq-capacity]]）。所需电荷：$0.10\ \mathrm{A}\times20\times8766\ \mathrm{h} = 17\,532\ \mathrm{Ah}$。质量：$17\,532/(2205\times0.50) = 15.9\ \mathrm{kg}$。效率之低反映了镁与析氢的自腐蚀；它非常负的电势（约对$\mathrm{Cu/CuSO_4}$为$-1.5$到$-1.7\ \mathrm{V}$）正是它适用于高电阻率土壤的原因——锌较小的驱动电压无法把足够的电流推过地层。
:::
:::
