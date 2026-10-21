未受污染的雨是酸性的——pH $5.6$，酸到刺眼的程度——而这还是任何工厂都还没有往空气里添加任何东西的时候；这份酸性不过是溶解在空气中的二氧化碳罢了。相比之下，你的血液被牢牢控制在 $7.35$ 到 $7.45$ 之间，尽管肌肉不断向其中倾泻酸性物质，而偏离几百分之一就是一个医疗急症。pH $6.8$ 的游泳池杀不死细菌，pH $7.8$ 的游泳池会因碳酸钙而变浑，两种情况下游泳者的眼睛都会提出抗议。酸碱是最定量化的日常化学，而本章正是把平衡思维——上一章的整套机器——转向质子的地方。你将遇到"酸"的两个定义，一个悄悄支配着每一个水溶液的数值（$K_\mathrm{w}$），一批其有效性必须随时检验的近似，以及为什么一个分子交出质子而它的表亲拒绝交出的结构性原因。

## 酸与碱：两个定义

::: definition 布龙斯特–劳里酸与碱 {#def-broensted}
**布龙斯特–劳里酸**是给出质子（$\mathrm{H^+}$）的物种，**布龙斯特–劳里碱**是接受质子的物种。因此酸与碱是反应中的角色，而不是某瓶试剂的属性：每一次质子转移都在方程一侧有一个酸、另一侧有一个碱，并且两者一起被消耗。酸失去质子后留下的物种称为它的**共轭碱**，碱得到质子后形成的物种称为它的**共轭酸**；一个酸与其共轭碱恰好相差一个 $\mathrm{H^+}$：
$$
\mathrm{HA + B \rightleftharpoons A^- + HB^+}
\qquad
\begin{cases}
\mathrm{HA/A^-} & \text{共轭酸碱对}\\
\mathrm{HB^+/B} & \text{共轭酸碱对。}
\end{cases}
$$
一个既能给出又能接受质子的物种——首先是水，也包括碳酸氢根离子 $\mathrm{HCO_3^-}$——称为**质子两性**（更宽泛的意义下称两性）。
:::

这个定义的威力在于它把整个学科组织成一对一对的伴侣。在 $\mathrm{HCl + H_2O \rightarrow H_3O^+ + Cl^-}$ 中水充当碱；在 $\mathrm{NH_3 + H_2O \rightleftharpoons NH_4^+ + OH^-}$ 中同一个水又充当酸。"酸"被一个更干净的问题取代了：给定两个伙伴，哪一个赢得质子？——而这个问题有一个数值答案：一个平衡常数。

::: definition 路易斯酸与碱 {#def-lewis}
**路易斯酸**是电子对的接受体，**路易斯碱**是电子对的给予体；两者反应的产物是由配位（给予）键结合的**加合物**。三氟化硼（硼上八隅体不完整）与三氯化铝 $\mathrm{AlCl_3}$ 是经典的路易斯酸；氨、胺与氢氧根是路易斯碱：
$$
\mathrm{F_3B(g) + {:}NH_3(g) \rightarrow F_3B{\leftarrow}NH_3(s)}
$$
每一个布龙斯特酸碱反应都是一个碱的电子对交给质子的路易斯反应，所以布龙斯特图像作为特例包含在路易斯图像之内；路易斯的定义还涵盖了完全不含氢的反应——$\mathrm{AgCl}$ 溶于氨水、傅-克烷基化被 $\mathrm{AlCl_3}$ 催化、配体与金属离子的结合。
:::

::: history
阿伦尼乌斯（Arrhenius）把酸定义为在水中产生 $\mathrm{H^+}$ 的物质、碱定义为产生 $\mathrm{OH^-}$ 的物质（1887）——这个定义解释了中和反应，却在氨和非水溶剂面前绊了脚。1909 年，丹麦生物化学家索伦森（Sørensen）在哥本哈根研究啤酒与酶溶液时，引入了 pH 记号作为氢离子浓度的简写。1923 年，丹麦人布龙斯特（Brønsted）与英国人洛里（Lowry）各自独立、相隔不过数月，提出了质子转移的定义；同年，路易斯（Lewis）发表了他在电子对方向上的推广。1923 年的这些定义沿用至今：布龙斯特酸性组织着水溶液化学，而路易斯酸性——后来经皮尔逊（Pearson）的软硬原理打磨得更锋利——组织着催化与金属化学。
:::

## 水、pH 与 pOH

纯水微弱地导电，如果它完全是分子态就不可能如此：两个水分子互相进行质子转移，这就是水的**自偶解离**；这个平衡虽然微小，却是随后一切的基础。

::: proposition 水的离子积 {#prop-kw}
水发生质子的自转移
$$
\mathrm{2\,H_2O(l) \rightleftharpoons H_3O^+(aq) + OH^-(aq)}
\qquad
K_\mathrm{w} = [\mathrm{H_3O^+}][\mathrm{OH^-}].
$$
在 $\mathrm{25\,^\circ C}$，$K_\mathrm{w} = 1.0\times10^{-14}$，所以在任何稀水溶液中——无论酸性、碱性还是中性——乘积 $[\mathrm{H_3O^+}][\mathrm{OH^-}]$ 都是 $1.0\times10^{-14}$：一个浓度做什么，另一个就必须抵消什么。在纯水中两者都是 $\sqrt{K_\mathrm{w}} = 1.0\times10^{-7}\ \mathrm{mol\,dm^{-3}}$。$K_\mathrm{w}$ 强烈依赖温度（电离是吸热的）：在体温 $\mathrm{37\,^\circ C}$ 它升到约 $2.4\times10^{-14}$。
:::

::: definition pH 与 pOH {#def-ph}
溶液的 **pH** 是水合氢离子浓度的 $-\log_{10}$，**pOH** 对氢氧根浓度作完全相同的定义：
$$
\mathrm{pH} = -\log_{10}\left[\mathrm{H_3O^+}\right],
\qquad
\mathrm{pOH} = -\log_{10}\left[\mathrm{OH^-}\right],
\qquad
\mathrm{pH} + \mathrm{pOH} = \mathrm{p}K_\mathrm{w} = 14.00\ (\mathrm{25\,^\circ C}).
$$
这个标度是对数的：pH 下降一个单位意味着水合氢离子浓度变为十倍。按约定，pH 的小数位数等于它所编码浓度的有效数字位数：$[\mathrm{H_3O^+}] = 2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$（两位）给出 $\mathrm{pH} = 3.70$（两位小数）。当 $[\mathrm{H_3O^+}] = [\mathrm{OH^-}]$ 时溶液**中性**，水合氢离子浓度较大时**酸性**，氢氧根较大时**碱性**。
:::

::: example 强酸与强碱 {#ex-strong}
强酸（$\mathrm{HCl}$、$\mathrm{HBr}$、$\mathrm{HNO_3}$、$\mathrm{HClO_4}$）与强碱（$\mathrm{NaOH}$、$\mathrm{KOH}$）在稀溶液中完全电离，所以它们的化学计量就是答案。求 $\mathrm{25\,^\circ C}$ 下 (a) $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$；(b) $0.0050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ba(OH)_2}$；(c) $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$ 的 pH。
::: solution
(a) $[\mathrm{H_3O^+}] = 2.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$，故 $\mathrm{pH} = -\log_{10}(2.0\times10^{-3}) = 2.70$。
(b) 每个氢氧化钡给出两个氢氧根：$[\mathrm{OH^-}] = 0.010\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = 2.00$，$\mathrm{pH} = 14.00 - 2.00 = 12.00$。
(c) 硫酸的第一步电离是强的，但第二步只是中等强度（$K_{\mathrm{a}2} = 1.2\times10^{-2}$）：第一个质子给出 $[\mathrm{H_3O^+}] = 0.010$ 与 $[\mathrm{HSO_4^-}] = 0.010$，而第二步电离 $\mathrm{HSO_4^- + H_2O \rightleftharpoons H_3O^+ + SO_4^{2-}}$ 再增加 $x$，其中
$$
\frac{(0.010 + x)\,x}{0.010 - x} = 1.2\times10^{-2}
\quad\Longrightarrow\quad x = 0.0045\ \mathrm{mol\,dm^{-3}}.
$$
于是 $[\mathrm{H_3O^+}] = 0.0145\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pH} = 1.84$——既不是两个质子全给的 $1.70$，也不是只给一个的 $2.00$。在这个浓度下第二个质子只有 $45\ \%$ 电离；"强二元酸"是一个细看之下就会失效的简称。
:::
:::

::: warning pH 7 并非在所有温度下都是中性 {#warn-ph7}
中性意味着 $[\mathrm{H_3O^+}] = [\mathrm{OH^-}]，不多不少；发生这一点的 pH 是 $\tfrac{1}{2}\mathrm{p}K_\mathrm{w}$，并随温度移动，因为 $K_\mathrm{w}$ 在变。纯水在 $\mathrm{0\,^\circ C}$ 于 $\mathrm{pH}\ 7.47$ 处中性，$\mathrm{25\,^\circ C}$ 时 $7.00$，$\mathrm{37\,^\circ C}$ 时 $6.81$，$\mathrm{50\,^\circ C}$ 时 $6.63$——血液的 $\mathrm{pH}\ 7.40$ 相对于体温下纯水的中性点其实是微*碱性*的，而这恰恰是它应有的样子。"pH 7 = 中性"是一句 $\mathrm{25\,^\circ C}$ 的口号，不是定义。
:::

::: quiz
下列哪一个**是**路易斯酸却**不是**布龙斯特酸？
- [x] $\mathrm{BF_3}$，它接受电子对，却没有质子可给。
- [ ] $\mathrm{HCl}$，它在水中完全电离。
- [ ] $\mathrm{NH_4^+}$，它把质子转移给水。
- [ ] $\mathrm{OH^-}$，它强烈地结合质子。
::: solution
$\mathrm{BF_3}$ 的硼缺电子，会形成 $\mathrm{F_3B{\leftarrow}NH_3}$ 这类加合物而不涉及任何氢化学——只是路易斯酸。$\mathrm{HCl}$ 与 $\mathrm{NH_4^+}$ 是布龙斯特酸（因而经由它们的质子也是路易斯酸）；$\mathrm{OH^-}$ 在两套语言里都是碱。
:::
:::

## 弱酸与酸解离常数

::: definition 酸解离常数 Ka {#def-ka}
**弱酸**是在平衡时只部分电离的酸——不是因为它稀，而是因为质子转移平衡大大偏向左边。对 $\mathrm{HA + H_2O \rightleftharpoons H_3O^+ + A^-}$，**酸解离常数**为
$$
K_\mathrm{a} = \frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}
$$
（水不写入，其浓度已折进常数）。$K_\mathrm{a}$ 越大酸越强；也常引用 $\mathrm{p}K_\mathrm{a} = -\log_{10} K_\mathrm{a}$，所以*较小*的 $\mathrm{p}K_\mathrm{a}$ 意味着*较强*的酸。$\mathrm{25\,^\circ C}$ 的标准表值包括乙酸（醋酸）$K_\mathrm{a} = 1.8\times10^{-5}$（$\mathrm{p}K_\mathrm{a} = 4.76$）、氢氟酸 $\mathrm{HF}$ $K_\mathrm{a} = 6.8\times10^{-4}$（$3.17$）、甲酸 $1.8\times10^{-4}$（$3.75$）、氢氰酸 $\mathrm{HCN}$ $6.2\times10^{-10}$（$9.21$）。碱带有类似的**碱解离常数** $K_\mathrm{b}$：氨 $K_\mathrm{b} = 1.8\times10^{-5}$（$\mathrm{p}K_\mathrm{b} = 4.74$）。
:::

::: proposition 弱酸近似 {#prop-sqrt-approx}
对分析浓度为 $C$、满足 $K_\mathrm{a} \ll C$ 的弱酸溶液，平衡水合氢离子浓度为
$$
\left[\mathrm{H_3O^+}\right] \approx \sqrt{K_\mathrm{a}\,C},
\qquad\text{成立条件}\quad \frac{C}{K_\mathrm{a}} \ge 100,
$$
解离分数为 $\alpha = [\mathrm{H_3O^+}]/C \approx \sqrt{K_\mathrm{a}/C}$：**酸越稀，解离的分数越大**（百分解离度随稀释按平方根上升），尽管水合氢离子浓度本身在下降。
:::

::: proof 平方根定律及其适用域 {#proof-sqrt}
把 $\mathrm{HA}$ 的电离列表，记产生的 $h = [\mathrm{H_3O^+}]$（只要 $h \gg 10^{-6}$，水自身贡献的 $10^{-7}\ \mathrm{mol\,dm^{-3}}$ 可忽略）：
$$
\begin{array}{c|ccc}
& \mathrm{HA} & \mathrm{H_3O^+} & \mathrm{A^-}\\ \hline
\text{初始} & C & \approx 0 & 0\\
\text{变化} & -h & +h & +h\\
\text{平衡} & C - h & h & h
\end{array}
\qquad\Longrightarrow\qquad
K_\mathrm{a} = \frac{h^2}{C - h}.
$$
若 $h \ll C$，分母可用 $C$ 代替，得 $h^2 = K_\mathrm{a} C$。这个替换什么时候是诚实的？近似要求 $h/C = \sqrt{K_\mathrm{a}/C} \ll 1$，即 $C/K_\mathrm{a} \gg 1$；在边界 $C/K_\mathrm{a} = 100$ 处酸已解离 $10\ \%$，平方根公式把 $h$ 高估约 $5\ \%$，这就是通常的容差。低于该边界就必须精确求解二次方程 $h^2 + K_\mathrm{a} h - K_\mathrm{a} C = 0$：
$$
h = \frac{-K_\mathrm{a} + \sqrt{K_\mathrm{a}^2 + 4K_\mathrm{a} C}}{2}. \qquad\blacksquare
$$
:::

::: proof Ka 乘 Kb 等于 Kw {#proof-ka-kb}
设 $\mathrm{HA}$ 与 $\mathrm{A^-}$ 是一对共轭酸碱。把两个平衡常数完整写出后相乘：
$$
K_\mathrm{a}\,K_\mathrm{b}
= \frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}
\times
\frac{[\mathrm{HA}][\mathrm{OH^-}]}{[\mathrm{A^-}]}
= [\mathrm{H_3O^+}][\mathrm{OH^-}] = K_\mathrm{w}.
$$
一切都消掉了，只剩水的离子积，所以对任何共轭对，在 $\mathrm{25\,^\circ C}$ 有 $\mathrm{p}K_\mathrm{a} + \mathrm{p}K_\mathrm{b} = 14.00$。这一行式子里的化学：强酸必有弱共轭碱，反之亦然，而且是*定量地*——乙酸的共轭碱 $\mathrm{CH_3COO^-}$ 的 $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$，而氯离子作为强酸的共轭碱，$K_\mathrm{b} \approx 10^{-21}$，在水中根本不算碱。$\qquad\blacksquare$
:::

::: example 弱酸的 pH：乙酸 {#ex-ethanoic}
求 $0.10\ \mathrm{mol\,dm^{-3}}$ 乙酸的 pH 与解离分数，$K_\mathrm{a} = 1.8\times10^{-5}$。
::: solution
先检验近似：$C/K_\mathrm{a} = 0.10 / 1.8\times10^{-5} = 5600 \gg 100$，平方根可靠：
$$
\left[\mathrm{H_3O^+}\right] = \sqrt{1.8\times10^{-5} \times 0.10} = \sqrt{1.8\times10^{-6}} = 1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}},
\qquad \mathrm{pH} = 2.87.
$$
解离分数为 $1.3\times10^{-3}/0.10 = 1.3\ \%$：每一千个分子里有九百八十七个仍然带着质子。精确的二次方程给出 $1.34\times10^{-3}$，pH 到小数点后两位相同——近似挣得了它的饭碗。注意数字的结论：$0.10\ \mathrm{mol\,dm^{-3}}$ 弱酸溶液比纯水酸两个 pH 单位，却比同浓度强酸的酸性弱一百倍。
:::
:::

::: example 近似失效的时候：氢氟酸 {#ex-hf}
求 $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HF}$ 的 pH，$K_\mathrm{a} = 6.8\times10^{-4}$。
::: solution
这里 $C/K_\mathrm{a} = 147$——刚刚过界，所以两种都算。平方根给出 $h = \sqrt{6.8\times10^{-5}} = 8.2\times10^{-3}$（$\mathrm{pH}\ 2.08$）；精确的二次方程给出
$$
h = \frac{-6.8\times10^{-4} + \sqrt{(6.8\times10^{-4})^2 + 4 \times 6.8\times10^{-4} \times 0.10}}{2} = 7.9\times10^{-3}\ \mathrm{mol\,dm^{-3}},
\qquad \mathrm{pH} = 2.10.
$$
近似把 $h$ 高估了 $4\ \%$，而且更糟的是，它暗示的解离分数（$8.2\ \%$）相对 $C$ 远非可以忽略，而这正是 $C/K_\mathrm{a} \ge 100$ 检验的用途。$\mathrm{HF}$ 是卤化氢中的异类——尽管氟电负性最高却是弱酸，因为 $\mathrm{H-F}$ 键异常短而强，小小的氟离子把质子抓得很紧（它极强的水合作用只部分而非全部补偿了这一点）。$\mathrm{HCl}$、$\mathrm{HBr}$、$\mathrm{HI}$ 是强酸，并且沿族向下键越弱酸越强：在一个纵列里，控制酸性的是键能，不是电负性。
:::
:::

::: widget plot
f: 1/(1+10^(x-pKa)); 1/(1+10^(pKa-x))
x: 0, 14
y: 0, 1.05
sliders: pKa=4.76:0:14:0.1
labels: \text{HA}; \text{A}^-
caption: 一个弱酸以其 $\mathrm{HA}$ 形式与其共轭碱 $\mathrm{A^-}$ 形式存在的分数随 pH 的变化，$\mathrm{p}K_\mathrm{a}$ 由滑块设定。两条曲线在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处相交，此时两者各占一半，而各自在交点约两个 pH 单位内占主导——这既是一个缓冲只在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} \pm 1$ 内工作的原因，也是滴定曲线的形状记得它经过的 $\mathrm{p}K_\mathrm{a}$ 的原因。把滑块从乙酸（$4.76$）滑到氢氰酸（$9.21$），看整幅图像在标度上走位。
:::

::: widget newton
f: x^2 + 6.8e-4*x - 6.8e-4*0.1
method: newton
x0: 0.01
caption: 牛顿法求解 $0.10\ \mathrm{mol\,dm^{-3}}$ 氢氟酸（$K_\mathrm{a} = 6.8\times10^{-4}$）的精确弱酸方程 $x^2 + K_\mathrm{a} x - K_\mathrm{a} C = 0$，其中 $x = [\mathrm{H_3O^+}]$，初值 $x_0 = 0.01$。迭代表显示逐次逼近收敛于正根 $x = 7.9\times10^{-3}\ \mathrm{mol\,dm^{-3}}$。与平方根估计 $\sqrt{K_\mathrm{a} C} = 8.2\times10^{-3}$ 比较：这 $4\ \%$ 的差距就是你在 $C/K_\mathrm{a} = 147$ 处本应预料到的近似失效。
:::

## 有多强？结构说了算

酸强度并非任意；四条结构规则——全是同一个观念的推论：*碱把质子抓得越牢、脱质子形式越稳定，酸就越弱*——几乎覆盖了本课程的一切。

**横越一行，电负性说了算。** 对二元氢化物 $\mathrm{CH_4}$、$\mathrm{NH_3}$、$\mathrm{H_2O}$、$\mathrm{HF}$，酸性从左到右急剧上升（$\mathrm{p}K_\mathrm{a}$ 约 $50$、$38$、$15.7$、$3.2$）：电负性越大的原子越能使 $\mathrm{E-H}$ 键极化，并稳定留下的负电荷。甲烷在水中根本不是酸；氨之所以是碱，恰恰因为氮抓住它的孤对电子和质子不放。

**沿族向下，键能说了算。** $\mathrm{HF}$ 是弱酸，而 $\mathrm{HCl}$、$\mathrm{HBr}$、$\mathrm{HI}$ 是强酸且依次更强：沿族向下键变长变弱的速度快过电负性下降的速度，质子更容易失去。同样的排序使 $\mathrm{H_2S}$（$\mathrm{p}K_\mathrm{a1} = 7.0$）作为酸远高于水，也使硫化物与硫醇盐作为碱远弱于氧化物与氢氧化物。

**含氧酸：先数氧，再看电负性。** 在氯的系列次氯酸、亚氯酸、氯酸与高氯酸，即 $\mathrm{HClO}$、$\mathrm{HClO_2}$、$\mathrm{HClO_3}$、$\mathrm{HClO_4}$（$\mathrm{p}K_\mathrm{a} \approx 7.5$、$1.8$、$-1$、$-10$）中，每一个额外的端氧都是一个吸电子的 $\mathrm{=O}$，把阴离子的负电荷摊到更多原子上；酸性随中心原子氧化数的升高而上升。氧数相同时，中心原子电负性大的胜出：$\mathrm{HClO > HBrO > HIO}$。

**羧酸：共振，以及随距离迅速衰减的诱导效应。** 羧酸根阴离子 $\mathrm{RCOO^-}$ 通过共振把电荷均摊到两个等价的氧上，这就是羧酸（$\mathrm{p}K_\mathrm{a} \approx 4.8$）以一百亿比一压倒醇（$\approx 16$）的原因。沿碳链拉电子会使酸增强，先快后几乎停滞——$\mathrm{25\,^\circ C}$ 的标准表值：

| 酸 | $\mathrm{p}K_\mathrm{a}$ | 酸 | $\mathrm{p}K_\mathrm{a}$ |
|---|---|---|---|
| 乙酸 $\mathrm{CH_3COOH}$ | $4.76$ | 3-氯丙酸 | $4.0$ |
| 氯乙酸 $\mathrm{ClCH_2COOH}$ | $2.87$ | 丙酸 | $4.87$ |
| 二氯乙酸 | $1.30$ | 甲酸 | $3.75$ |
| 三氯乙酸 | $0.70$ | 3-羟基丙酸 | $4.5$ |

隔三个键的一个氯值约一个 $\mathrm{p}K_\mathrm{a}$ 单位；同一个氯挪近一个键，就再多值两个。诱导效应随距离很快消亡——这个事实在预测两个质子哪个先离开时还会用到。

::: example 为什么未受污染的雨 pH 为 5.6 {#ex-rain}
雨水与大气中的二氧化碳开放平衡，其分压为 $4.2\times10^{-4}\ \mathrm{atm}$；亨利定律给出 $[\mathrm{CO_2(aq)}] = 3.4\times10^{-2}\ \mathrm{mol\,dm^{-3}\,atm^{-1}} \times 4.2\times10^{-4}\ \mathrm{atm} = 1.4\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。把溶解的气体当作有效 $K_\mathrm{a} = 4.3\times10^{-7}$ 的一元弱酸，求 pH。
::: solution
$C/K_\mathrm{a} = 1.4\times10^{-5}/4.3\times10^{-7} = 33$，低于边界，所以平方根只是一个估计：$h \approx \sqrt{4.3\times10^{-7} \times 1.4\times10^{-5}} = 2.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pH} = 5.61$。这里要紧的检验与平常不同：$h = 2.5\times10^{-6}$ 是 $10^{-7}$ 的二十多倍，所以水自身的水合氢离子确实可以忽略。精确求解二次方程得 $h = 2.3\times10^{-6}$、$\mathrm{pH} = 5.64$——平方根把水合氢离子高估了约 $9\ \%$（该酸已解离 $16\ \%$），但结论——天然雨水在 $\mathrm{pH}\ 5.6$ 上下——不变。
:::
:::

::: warning 弱不等于稀，稀不等于弱 {#warn-weak-dilute}
"弱"描述的是平衡位置（$K_\mathrm{a}$ 小）；"稀"描述的是浓度（$C$ 小）。它们是相互独立的坐标：$10\ \mathrm{mol\,dm^{-3}}$ 的乙酸既浓又*弱*，其水合氢离子浓度 $\sqrt{1.8\times10^{-5} \times 10} \approx 0.013\ \mathrm{mol\,dm^{-3}}$，是 $10^{-5}\ \mathrm{mol\,dm^{-3}}$ 盐酸的一千倍，而后者既稀又*强*。醋是 $5\ \%$ 的弱酸，照样让牛奶变酸；电池酸液是稀硫酸，照样腐蚀皮肤。绝不要由一个词推断另一个词。
:::

## 多元酸

::: definition 多元酸 {#def-polyprotic}
**多元酸**能给出不止一个质子，而且是分级给出的，每一步有自己的常数：对磷酸，
$$
\mathrm{H_3PO_4 \rightleftharpoons H_2PO_4^- \rightleftharpoons HPO_4^{2-} \rightleftharpoons PO_4^{3-}}
\qquad
\mathrm{p}K_\mathrm{a} = 2.15,\ 7.20,\ 12.35 .
$$
相邻常数总是相差很远——通常 $10^{3}$–$10^{6}$ 倍——原因有二：从负离子上拽质子比从中性分子上难，而且留下的额外负电荷会稳定质子化的形式。碳酸（溶解 $\mathrm{CO_2}$ 的约定值）$\mathrm{p}K_\mathrm{a1} = 6.35$、$\mathrm{p}K_\mathrm{a2} = 10.33$；亚硫酸 $1.8$、$7.2$；草酸 $1.25$、$4.27$。
:::

因为 $\mathrm{p}K_\mathrm{a2} \gg \mathrm{p}K_\mathrm{a1}$，可以推出两条工作规则。第一，**多元酸溶液的 pH 只由第一级电离决定**——第二级贡献的水合氢离子量级为 $K_\mathrm{a2}$，被完全淹没。第二，**完全脱质子的物种在酸溶液本身中的浓度量级为 $K_\mathrm{a2}$（二元）或 $K_\mathrm{a3}$（三元）**：对 $\mathrm{H_2A}$，由于 $[\mathrm{H_3O^+}] \approx [\mathrm{HA^-}]$，第二级平衡 $K_\mathrm{a2} = [\mathrm{H_3O^+}][\mathrm{A^{2-}}]/[\mathrm{HA^-}]$ 就塌缩为 $[\mathrm{A^{2-}}] \approx K_\mathrm{a2}$。

::: example 磷酸：全部三级 {#ex-h3po4}
已知 $\mathrm{p}K_\mathrm{a} = 2.15,\ 7.20,\ 12.35$，求 $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_3PO_4}$ 的 pH 与各主要物种浓度。
::: solution
$C/K_{\mathrm{a}1} = 0.10/7.1\times10^{-3} = 14$：用平方根会错得厉害，所以对第一级解二次方程 $h^2 + 7.1\times10^{-3} h - 7.1\times10^{-4} = 0$：
$$
h = [\mathrm{H_3O^+}] = 0.023\ \mathrm{mol\,dm^{-3}}, \qquad \mathrm{pH} = 1.63,
$$
酸有 $23\ \%$ 失去了第一个质子：$[\mathrm{H_2PO_4^-}] \approx 0.023$，$[\mathrm{H_3PO_4}] \approx 0.077\ \mathrm{mol\,dm^{-3}}$。第二级给出 $[\mathrm{HPO_4^{2-}}] \approx K_{\mathrm{a}2} = 6.3\times10^{-8}\ \mathrm{mol\,dm^{-3}}$（检验：$[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = K_{\mathrm{a}2}/h = 2.7\times10^{-6}$），第三级可以忽略：$[\mathrm{PO_4^{3-}}] \approx K_{\mathrm{a}3} = 4.2\times10^{-13}\ \mathrm{mol\,dm^{-3}}$——在 $\mathrm{0.10\ mol\,dm^{-3}}$ 磷酸里，磷酸根离子根本不存在。电荷守恒结账：$[\mathrm{H_3O^+}] \approx [\mathrm{H_2PO_4^-}]$，正如单级处理所假设的。
:::
:::

::: quiz
磷酸有三个质子，但 $0.10\ \mathrm{mol\,dm^{-3}}$ 溶液的 pH 是 $1.63$ 而不是接近 $0.5$ 的数。哪一句话解释得最好？
- [x] 只有第一级电离显著贡献水合氢离子，而且连它也只完成了 $23\ \%$。
- [ ] 三级电离各进行约 $23\ \%$。
- [ ] 第二、第三个质子太重，跑不快。
- [ ] 三个 $K_\mathrm{a}$ 相加，使酸实际上变弱了。
::: solution
$\mathrm{p}K_\mathrm{a1} = 2.15$ 使第一级是一个中等强度的弱平衡（在此浓度下电离 $23\ \%$），而 $\mathrm{p}K_\mathrm{a2} = 7.20$ 意味着第二级只额外增加约 $6\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ 的水合氢离子。平衡常数不会相加；每一级是它自己的平衡，最弱的几级只是不参与。
:::
:::

## 水中的盐：谁水解？

盐不是中性的旁观者：它的离子是共轭伙伴，每个都可能与水争夺质子。规则是机械的——*离子只能在水是它的弱伙伴的共轭方时与水反应；那个弱伙伴越弱，反应越多*——四种情形如下：

| 盐的类型 | 例 | 反应的离子 | 溶液 |
|---|---|---|---|
| 强酸阳离子 + 强酸阴离子 | $\mathrm{NaCl}$ | 都不反应 | 中性，$\mathrm{pH}\ 7$ |
| 弱碱的共轭酸 | $\mathrm{NH_4Cl}$ | $\mathrm{NH_4^+}$ 给出质子 | 酸性 |
| 弱酸的共轭碱 | $\mathrm{CH_3COONa}$ | $\mathrm{CH_3COO^-}$ 接受质子 | 碱性 |
| 两种离子都弱 | $\mathrm{NH_4CH_3COO}$ | 都反应 | 比较 $K_\mathrm{a}(\text{阳离子})$ 与 $K_\mathrm{b}(\text{阴离子})$ |

::: example 盐溶液：氯化铵与乙酸钠 {#ex-salts}
求 $\mathrm{25\,^\circ C}$ 下 $0.10\ \mathrm{mol\,dm^{-3}}$ (a) $\mathrm{NH_4Cl}$ 与 (b) $\mathrm{CH_3COONa}$ 的 pH；$K_\mathrm{b}(\mathrm{NH_3}) = 1.8\times10^{-5}$，$K_\mathrm{a}(\mathrm{CH_3COOH}) = 1.8\times10^{-5}$。
::: solution
(a) 氯离子是强酸的共轭碱，什么都不做；铵是弱碱的共轭酸，是一个弱酸，$K_\mathrm{a} = K_\mathrm{w}/K_\mathrm{b} = 5.6\times10^{-10}$（$\mathrm{p}K_\mathrm{a} = 9.25$）。由于 $C/K_\mathrm{a} = 1.8\times10^{8}$，平方根极其可靠：
$$
\left[\mathrm{H_3O^+}\right] = \sqrt{5.6\times10^{-10} \times 0.10} = 7.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}, \qquad \mathrm{pH} = 5.13 .
$$
(b) 钠离子什么都不做；乙酸根是弱碱，$K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$，按完全相同的算术 $[\mathrm{OH^-}] = 7.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = 5.13$，$\mathrm{pH} = 8.87$。两种盐是镜像：同一个 $K$ 经由 $K_\mathrm{w}$ 计算，就落在 $7$ 的另一侧同样距离上。
:::
:::

::: warning 低于约 10⁻⁶ mol dm⁻³ 时，水接管了 {#warn-water}
"浓度为 $C$ 的强酸有 $\mathrm{pH} = -\log C$"这个配方默认了酸的水合氢离子远大于水的 $10^{-7}$。在 $C = 10^{-6}$ 时误差已有 $10\ \%$；在 $C = 10^{-7}$ 时配方对一个*酸*预测 $\mathrm{pH} = 7.00$，这就荒谬了——加酸不可能把水变碱。补救办法是把水的平衡留在账上：由 $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H_3O^+}]$ 与电荷守恒 $[\mathrm{H_3O^+}] = C + [\mathrm{OH^-}]$，
$$
\left[\mathrm{H_3O^+}\right]^2 - C\left[\mathrm{H_3O^+}\right] - K_\mathrm{w} = 0,
$$
对 $10^{-7.5}\ \mathrm{mol\,dm^{-3}}$ 盐酸它给出 $1.17\times10^{-7}\ \mathrm{mol\,dm^{-3}}$、$\mathrm{pH}\ 6.93$——是酸性的，本应如此，而且只是勉强如此。
:::

::: example 乙酸铵：两种离子都弱 {#ex-nh4oac}
预测 $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NH_4CH_3COO}$ 的 pH，已知 $K_\mathrm{a}(\mathrm{CH_3COOH}) = 1.8\times10^{-5}$、$K_\mathrm{b}(\mathrm{NH_3}) = 1.8\times10^{-5}$。
::: solution
两种离子都水解，而且水解能力相同：$K_\mathrm{a}(\mathrm{NH_4^+}) = 5.6\times10^{-10} = K_\mathrm{b}(\mathrm{CH_3COO^-})$。铵制造水合氢离子，乙酸根制造氢氧根，量相等，它们经由 $K_\mathrm{w}$ 互相湮灭；溶液基本呈中性，$\mathrm{pH} = 7.01$（偏离 $7.00$ 的微小移动只反映表值 $K_\mathrm{a}(\text{乙酸}) = 1.75\times10^{-5}$ 与 $K_\mathrm{b}(\text{氨}) = 1.8\times10^{-5}$ 的差别）。弱酸 $\mathrm{HA}$（$K_\mathrm{a}$）与弱碱 $\mathrm{B}$（$K_\mathrm{b}$）成盐的一般结果是 $\mathrm{pH} = 7 + \tfrac{1}{2}(\mathrm{p}K_\mathrm{a}(\mathrm{HA}) - \mathrm{p}K_\mathrm{b}(\mathrm{B}))$，在这一近似下与浓度无关——你将在习题中推导它。
:::
:::

## 后续内容

酸碱平衡是图谱中后续一切平衡的模板。下一章 [[general-chemistry-2/buffers-titrations]] 把共轭对*同时*放进溶液，并从你在这里用过的同一个 $K_\mathrm{a}$ 导出亨德森–哈塞尔巴尔赫方程；[[general-chemistry-2/solubility-equilibria]] 展示氢氧根、硫离子与碳酸根——全都是碱——如何使溶解度依赖 pH；[[general-chemistry-2/chemical-equilibrium]] 是底下的一般机器；[[general-chemistry-2/entropy-free-energy]] 解释 $K_\mathrm{a}$ 为什么是那个值。我们略去的活度修正（用浓度代替活度、离子强度）在 [[thermodynamics/ions-in-solution]] 中处理，而酸碱滴定、指示剂与分析实验室 pH 测量的全套装置在 [[analytical-chemistry/equilibria-in-analysis]]。

::: summary
- 布龙斯特–劳里酸给出质子、碱接受质子；反应总是把一个酸与另一侧的碱配成对，共轭对恰好相差 $\mathrm{H^+}$。路易斯的定义（电子对接受体/给予体）包含布龙斯特定义，并覆盖 $\mathrm{BF_3}$、$\mathrm{AlCl_3}$ 与金属–配体化学。
- 水自偶解离：$\mathrm{25\,^\circ C}$ 时 $K_\mathrm{w} = [\mathrm{H_3O^+}][\mathrm{OH^-}] = 1.0\times10^{-14}$，所以 $K_\mathrm{w}$ 耦合着每一对浓度；$\mathrm{pH} + \mathrm{pOH} = 14.00$ 只在 $\mathrm{25\,^\circ C}$ 成立。
- 中性意味着水合氢离子与氢氧根相等；中性 pH 随温度下降（$\mathrm{0\,^\circ C}$ 时 $7.47$，$\mathrm{37\,^\circ C}$ 时 $6.81$），因为 $K_\mathrm{w}$ 上升。
- 弱酸服从 $K_\mathrm{a} = [\mathrm{H_3O^+}][\mathrm{A^-}]/[\mathrm{HA}]$；平方根公式 $[\mathrm{H_3O^+}] = \sqrt{K_\mathrm{a} C}$ 在 $C/K_\mathrm{a} \ge 100$ 时有效，低于它必须改用二次方程。
- 对任何共轭对 $K_\mathrm{a} K_\mathrm{b} = K_\mathrm{w}$：强酸、弱共轭碱，定量成立。
- 结构决定强度：横越一行看电负性，沿族向下看键能，含氧酸看氧数与电负性，羧酸看共振加短程诱导。
- 多元酸分级电离，$\mathrm{p}K_\mathrm{a}$ 值相隔 $3$–$6$ 个单位：第一级决定 pH，而完全脱质子的物种在酸自身溶液中位于 $K_\mathrm{a2}$（或 $K_\mathrm{a3}$）附近。
- 盐溶液跟着共轭方走：弱酸阴离子造碱，弱碱阳离子造酸，而低于 $10^{-6}\ \mathrm{mol\,dm^{-3}}$ 时水的自偶电离必须留在方程里。
:::

## 练习

::: exercise 强碱的 pH {level=1 check="12.30"}
求 $\mathrm{25\,^\circ C}$ 下 $0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ 的 pH。（填入 pH。）
::: solution
$[\mathrm{OH^-}] = 0.020\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = -\log_{10}(0.020) = 1.70$，$\mathrm{pH} = 14.00 - 1.70 = 12.30$。
:::
:::

::: exercise 强酸的 pH {level=1 check="2.70"}
求 $\mathrm{25\,^\circ C}$ 下 $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ 的 pH。（填入 pH。）
::: solution
完全电离：$[\mathrm{H_3O^+}] = 2.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pH} = 2.70$。两位小数，因为浓度有两位有效数字。
:::
:::

::: exercise 强碱二元碱的 pH {level=1 check="12.00"}
求 $\mathrm{25\,^\circ C}$ 下 $0.0050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ba(OH)_2}$ 的 pH。（填入 pH。）
::: solution
氢氧化钡每个式量单位给出两个氢氧根：$[\mathrm{OH^-}] = 0.010\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = 2.00$，$\mathrm{pH} = 12.00$。忘记因子二是经典的失误；它要赔上 $0.30$ 个 pH 单位。
:::
:::

::: exercise 弱酸 I：pH 与解离度 {level=2 check="2.87"}
求 $0.10\ \mathrm{mol\,dm^{-3}}$ 乙酸的 pH，$K_\mathrm{a} = 1.8\times10^{-5}$。（填入 pH。）
::: solution
$C/K_\mathrm{a} = 5600 \ge 100$，所以 $[\mathrm{H_3O^+}] = \sqrt{1.8\times10^{-5} \times 0.10} = 1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pH} = 2.87$（解离分数 $1.3\ \%$）。
:::
:::

::: exercise 弱碱 {level=2 check="10.98"}
求 $0.050\ \mathrm{mol\,dm^{-3}}$ 氨水的 pH，$K_\mathrm{b} = 1.8\times10^{-5}$。（填入 pH。）
::: solution
$[\mathrm{OH^-}] = \sqrt{1.8\times10^{-5} \times 0.050} = 9.5\times10^{-4}\ \mathrm{mol\,dm^{-3}}$（$C/K_\mathrm{b} = 2800$，安全），$\mathrm{pOH} = 3.02$，$\mathrm{pH} = 14.00 - 3.02 = 10.98$。家用氨水呈碱性，正是这个平方根的道理。
:::
:::

::: exercise 弱酸盐 {level=2 check="8.87"}
求 $0.10\ \mathrm{mol\,dm^{-3}}$ 乙酸钠的 pH，$K_\mathrm{a}(\mathrm{CH_3COOH}) = 1.8\times10^{-5}$。（填入 pH。）
::: solution
乙酸根是弱碱，$K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$：$[\mathrm{OH^-}] = \sqrt{5.6\times10^{-10} \times 0.10} = 7.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$，$\mathrm{pOH} = 5.13$，$\mathrm{pH} = 8.87$。弱酸的钠盐呈碱性——标签上"皂液微碱"说的就是这个。
:::
:::

::: exercise 极稀强酸 {level=3 check="6.93"}
求 $\mathrm{25\,^\circ C}$ 下 $1.0\times10^{-7.5}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ 的 pH，把水的自偶电离记在账上。（填入 pH。）
::: solution
电荷守恒 $[\mathrm{H_3O^+}] = C + [\mathrm{OH^-}]$ 配上 $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H_3O^+}]$ 给出 $[\mathrm{H_3O^+}]^2 - C[\mathrm{H_3O^+}] - K_\mathrm{w} = 0$，于是
$$
\left[\mathrm{H_3O^+}\right] = \frac{C + \sqrt{C^2 + 4K_\mathrm{w}}}{2}
= \frac{3.16\times10^{-8} + \sqrt{1.0\times10^{-15} + 4.0\times10^{-14}}}{2}
= 1.17\times10^{-7}\ \mathrm{mol\,dm^{-3}},
$$
$\mathrm{pH} = 6.93$。照搬 $-\log C = 7.50$ 会把酸变成碱；在这个稀释度上，水项不是可选项。
:::
:::

::: exercise 质子两性的阴离子 {level=3 check="8.34"}
碳酸氢根是质子两性的：它既能给出质子（$\mathrm{p}K_\mathrm{a2} = 10.33$）也能接受质子（$\mathrm{p}K_\mathrm{a1} = 6.35$）。对二元酸 $\mathrm{H_2A}$ 的盐 $\mathrm{NaHA}$，证明 $[\mathrm{H_3O^+}] \approx \sqrt{K_\mathrm{a1} K_\mathrm{a2}}$，并由此求 $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaHCO_3}$ 的 pH。（填入 pH。）
::: solution
把为 $\mathrm{HA^-}$ 写出的两个平衡相加：作为酸，$K_{\mathrm{a}2} = [\mathrm{H_3O^+}][\mathrm{A^{2-}}]/[\mathrm{HA^-}]$；作为碱，$K_\mathrm{b} = K_\mathrm{w}/K_{\mathrm{a}1} = [\mathrm{H_2A}][\mathrm{OH^-}]/[\mathrm{HA^-}]$。溶液中占优势的反应是两个 $\mathrm{HA^-}$ 之间的质子转移（歧化），它使 $[\mathrm{H_2A}] \approx [\mathrm{A^{2-}}]$；把第一个平衡除以第二个并令两者相等，得
$$
\left[\mathrm{H_3O^+}\right]^2 \approx K_\mathrm{a1} K_\mathrm{a2}
\qquad\Longrightarrow\qquad
\mathrm{pH} = \tfrac{1}{2}\!\left(\mathrm{p}K_\mathrm{a1} + \mathrm{p}K_\mathrm{a2}\right),
$$
与浓度无关。对碳酸体系：$\mathrm{pH} = \tfrac{1}{2}(6.35 + 10.33) = 8.34$——小苏打溶液微碱；同一个公式给出 $\mathrm{NaH_2PO_4}$ 的 $\mathrm{pH} = 4.67$，微酸。质子两性物质哪边都不是；它取平均。
:::
:::

::: exercise 弱酸弱碱盐 {level=3 check="7.01"}
对弱酸 $\mathrm{HA}$（$K_\mathrm{a}$）与弱碱 $\mathrm{B}$（$K_\mathrm{b}$）成盐，两种离子都水解。设水解分数小且相等，从两个水解平衡与 $K_\mathrm{w}$ 导出 $\mathrm{pH} = 7.00 + \tfrac{1}{2}(\mathrm{p}K_\mathrm{a} - \mathrm{p}K_\mathrm{b})$，并对乙酸铵求值（$K_\mathrm{a} = 1.75\times10^{-5}$，$K_\mathrm{b} = 1.8\times10^{-5}$）。（填入 pH。）
::: solution
阳离子水解给出 $[\mathrm{H_3O^+}] = K_\mathrm{a}(\mathrm{BH^+})[\mathrm{BH^+}]/[\mathrm{B}]$，阴离子水解给出 $[\mathrm{OH^-}] = K_\mathrm{b}(\mathrm{A^-})[\mathrm{A^-}]/[\mathrm{HA}]$；水解相等时 $[\mathrm{BH^+}]/[\mathrm{B}] \approx [\mathrm{A^-}]/[\mathrm{HA}]$，所以两式相除时该比值消掉：
$$
K_\mathrm{w} = [\mathrm{H_3O^+}][\mathrm{OH^-}]
\approx K_\mathrm{a}K_\mathrm{b}\,\frac{[\mathrm{H_3O^+}]}{[\mathrm{OH^-}]}
\quad\Longrightarrow\quad
\left[\mathrm{H_3O^+}\right] = \sqrt{\frac{K_\mathrm{w}\,K_\mathrm{a}}{K_\mathrm{b}}}.
$$
取 $-\tfrac{1}{2}\log$：$\mathrm{pH} = 7.00 + \tfrac{1}{2}(\mathrm{p}K_\mathrm{a} - \mathrm{p}K_\mathrm{b})$。数值上，$[\mathrm{H_3O^+}] = \sqrt{10^{-14} \times 1.75\times10^{-5}/1.8\times10^{-5}} = 9.9\times10^{-8}$，$\mathrm{pH} = 7.01$。浓度完全消掉——乙酸铵溶液的 pH 是 $7$，无论它是 $0.001$ 还是 $1\ \mathrm{mol\,dm^{-3}}$（直到活度假设失效为止）；而氟化铵由于 $K_\mathrm{a}(\mathrm{HF}) \gg K_\mathrm{b}(\mathrm{NH_3})$，按同一公式明显呈酸性。
:::
:::
