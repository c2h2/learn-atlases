你的血液中约含 $0.024\ \mathrm{mol\,dm^{-3}}$ 的碳酸氢根，并浸润在你肺部控制的某一二氧化碳分压之下；这两者共同把 pH 维持在 $7.35$ 到 $7.45$ 之间，而你的肌肉每小时运动都在向血液中倾入以克计的乳酸。pH 低于 $7.35$ 是酸中毒，高于 $7.45$ 是碱中毒，两者都可能在几分钟内致命——然而一杯 pH 接近 $3.5$ 的橙汁进入同一股血流，却不会使其 pH 变动百分之一单位。原因就是**缓冲溶液**，而解释它的定量工具——同时也是解释每一条滴定曲线、每一种指示剂、以及等当点与滴定终点之区别的——是把上一章的平衡化学变成十几个你可以在睡梦中做出的判断。缓冲与滴定是同一门学问从两端的看法：缓冲是溶液在你加入少量滴定剂时的表现，滴定曲线则是你不断加入时发生的事。

## 缓冲溶液如何工作

::: definition 缓冲溶液 {#def-buffer}
**缓冲溶液**是这样一种溶液：加入少量强酸或强碱、或将其稀释时，它抵抗 pH 的改变。缓冲溶液由**以相当量共存的共轭酸碱对**配制：或是一个弱酸与其盐（$\mathrm{CH_3COOH}$ 加 $\mathrm{CH_3COONa}$），或是一个弱碱与其盐（$\mathrm{NH_3}$ 加 $\mathrm{NH_4Cl}$）。这种抵抗不是魔法，而是同离子效应在起作用：混合物中含有大量碱型组分，随时准备消耗加入的 $\mathrm{H_3O^+}$；又含有大量酸型组分，随时准备消耗加入的 $\mathrm{OH^-}$；而这两个储备都远大于你加入的任何东西。
:::

把酸加入乙酸–乙酸盐缓冲液时发生了什么，写出来看看。加入的水合氢离子无法积累，因为乙酸根离子到处都是，而反应 $\mathrm{CH_3COO^- + H_3O^+ \rightarrow CH_3COOH + H_2O}$ 的平衡常数是 $1/K_\mathrm{a} = 5.6\times10^{4}$——实际上是完全的。加入的氢氧根则被乙酸对称地消灭，$\mathrm{CH_3COOH + OH^- \rightarrow CH_3COO^- + H_2O}$，其 $K = K_\mathrm{a}/K_\mathrm{w} = 1.8\times10^{9}$。改变的不是水合氢离子浓度，而是缓冲两个组分的**比值**——而如下一个结果所示，pH 只依赖于那个比值。

::: proposition 亨德森–哈塞尔巴尔赫方程 {#prop-henderson-hasselbalch}
对于由浓度为 $[\mathrm{HA}]$ 的弱酸 $\mathrm{HA}$ 与浓度为 $[\mathrm{A^-}]$ 的共轭碱 $\mathrm{A^-}$ 配成的缓冲溶液，
$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}.
$$
该方程在两个组分的浓度都远大于 $[\mathrm{H_3O^+}]$ 与 $[\mathrm{OH^-}]$（大致上，两者都高于 $10^{-3}\ \mathrm{mol\,dm^{-3}}$）、且酸足够弱以致其解离只是小修正（$C/K_\mathrm{a} \ge 100$）时成立。在这些条件下，平衡浓度就是分析浓度：你配进去多少，就代多少。
:::

::: proof 亨德森–哈塞尔巴尔赫方程 {#proof-hh}
从酸解离常数的定义出发，
$$
K_\mathrm{a} = \frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}.
$$
解出水合氢离子浓度，$[\mathrm{H_3O^+}] = K_\mathrm{a}\,[\mathrm{HA}]/[\mathrm{A^-}]$，两边取 $-\log_{10}$：
$$
\mathrm{pH} = -\log_{10}K_\mathrm{a} - \log_{10}\frac{[\mathrm{HA}]}{[\mathrm{A^-}]} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}.
$$
近似藏在哪里？在于用分析浓度代替平衡的 $[\mathrm{A^-}]$ 与 $[\mathrm{HA}]$。酸自身的解离把 $x$ 的 $\mathrm{HA}$ 变成 $\mathrm{A^-}$，其中 $x = [\mathrm{H_3O^+}] \approx K_\mathrm{a}[\mathrm{HA}]/[\mathrm{A^-}]$；当 $x$ 远小于两个浓度时这个修正可以忽略，这正是前面陈述的条件。水自身的离子以同样的方式进入：若缓冲液稀到 $[\mathrm{H_3O^+}]$ 或 $[\mathrm{OH^-}]$ 与组分浓度可比，电荷平衡就强加一个修正，方程随之失效。
:::

::: example 配制指定 pH 的缓冲溶液 {#ex-buffer-prep}
你需要 $250\ \mathrm{cm^3}$ 的 $\mathrm{pH}\ 5.00$ 乙酸–乙酸盐缓冲液，实验室里有 $0.100\ \mathrm{mol\,dm^{-3}}$ 乙酸与 $0.100\ \mathrm{mol\,dm^{-3}}$ 乙酸钠。各取多少体积混合？（$\mathrm{p}K_\mathrm{a} = 4.76$。）
::: solution
把亨德森–哈塞尔巴尔赫方程改写成你需要的比值：
$$
\frac{[\mathrm{A^-}]}{[\mathrm{HA}]} = 10^{\,\mathrm{pH} - \mathrm{p}K_\mathrm{a}} = 10^{\,5.00 - 4.76} = 10^{0.24} = 1.74.
$$
因为两种储备液浓度相同，浓度比等于体积比，所以以 $V_\mathrm{b}$ 为乙酸钠的体积，
$$
\frac{V_\mathrm{b}}{250 - V_\mathrm{b}} = 1.74
\qquad\Longrightarrow\qquad
V_\mathrm{b} = 250\times\frac{1.74}{2.74} = 159\ \mathrm{cm^3},
$$
酸则取 $91\ \mathrm{cm^3}$。混合并检验比值：$159/91 = 1.75$，$\log_{10}1.75 = 0.24$，$\mathrm{pH} = 5.00$。注意这道题迫使做出的两个决策：$\mathrm{p}K_\mathrm{a}$ 必须在目标 pH 约一个单位以内（这里是 $4.76$ 对 $5.00$——很从容），而且要紧的只是**比值**、不是绝对浓度——绝对浓度是你在决定需要多少缓冲容量的时候另行选择的。
:::
:::

这个方程说出了一件你能感觉到却很少说出的事：**稀释缓冲溶液完全不改变它的 pH**，因为摩尔比不因加水而变。稀释真正摧毁的是缓冲液抵抗改变的能力，而度量这种抵抗的恰当量是缓冲容量。

::: proposition 缓冲容量 {#prop-buffer-capacity}
**缓冲容量** $\beta$ 是把溶液的 pH 提高一个单位所需加入的强碱量（以 $\mathrm{mol\,dm^{-3}}$ 计），$\beta = \mathrm{d}C_\mathrm{b}/\mathrm{d}(\mathrm{pH})$。对总浓度为 $C = [\mathrm{HA}] + [\mathrm{A^-}]$ 的缓冲溶液，
$$
\beta = 2.303\left([\mathrm{H_3O^+}] + [\mathrm{OH^-}] + C\,\frac{K_\mathrm{a}[\mathrm{H_3O^+}]}{(K_\mathrm{a} + [\mathrm{H_3O^+}])^{2}}\right).
$$
缓冲项在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处最大，此时 $\beta_\mathrm{max} = 2.303\,C/4 \approx 0.576\,C$；在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} \pm 1$ 处已降到该值的三分之一，在 $\pm 2$ 处降到二十三分之一。这就是"缓冲溶液只在 $\mathrm{p}K_\mathrm{a}$ 一个 pH 单位内有效"这条规则的定量内容。
:::

::: proof 缓冲容量在哪里最大 {#proof-capacity}
向缓冲溶液每升加入 $\mathrm{d}n$ 摩尔强碱：它把 $\mathrm{d}n$ 的 $\mathrm{HA}$ 变成 $\mathrm{A^-}$，所以 $[\mathrm{A^-}]$ 增加 $\mathrm{d}n$。记 $r = [\mathrm{A^-}]/[\mathrm{HA}]$，则 $[\mathrm{A^-}] = Cr/(1+r)$；求微分得 $\mathrm{d}[\mathrm{A^-}] = C\,\mathrm{d}r/(1+r)^2 = \mathrm{d}n$，而亨德森–哈塞尔巴尔赫方程给出 $\mathrm{d}(\mathrm{pH}) = \mathrm{d}(\log_{10} r) = \mathrm{d}r/(r\ln 10)$。因此
$$
\beta = \frac{\mathrm{d}n}{\mathrm{d}(\mathrm{pH})} = \frac{C\,r}{(1+r)^2}\ln 10 = 2.303\,C\,\frac{r}{(1+r)^2}.
$$
把 $r = K_\mathrm{a}/[\mathrm{H_3O^+}]$ 代入，最后一个因子就化为 $K_\mathrm{a}[\mathrm{H_3O^+}]/(K_\mathrm{a} + [\mathrm{H}_3\mathrm{O}^+)^2$，而因子 $r/(1+r)^2$ 在 $r = 1$、即 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处最大，值为 $1/4$。在 $r = 10$ 或 $r = 1/10$（相差一个 pH 单位）处它是 $10/121 = 0.083$，是 $1/4$ 的三分之一；相差两个单位时是 $100/10201 = 0.0098$。水项 $[\mathrm{H_3O^+}] + [\mathrm{OH^-}]$ 是溶剂自身的缓冲容量，在标度中段可以忽略，但在缓冲范围之外占主导——这就是为什么连纯水也有*一点*缓冲容量，也是为什么一个偏离其 $\mathrm{p}K_\mathrm{a}$ 两个单位的"缓冲液"其实只是一份稀盐溶液。
:::

::: widget plot
f: 2.303*C*10^(-4.76-x)/((10^(-4.76)+10^(-x))^2)
x: 0, 14
y: 0, 0.3
sliders: C=0.1:0.01:0.5:0.01
labels: \text{缓冲容量}
caption: 总浓度 $C$ 由滑块设定的乙酸–乙酸盐缓冲液（$\mathrm{p}K_\mathrm{a} = 4.76$）的缓冲容量 $\beta$ 随 pH 的变化。曲线在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处以 $\beta_\mathrm{max} = 0.576\,C$ 达峰，向两侧一个 pH 单位就降到峰值的三分之一——正是这条钟形曲线使 "$\mathrm{p}K_\mathrm{a} \pm 1$" 成为你将来选择的每一种缓冲溶液的工作范围。图中略去了水项，所以曲线在两端趋于零，而不是在 $\mathrm{pH} < 2$ 与 $\mathrm{pH} > 12$ 处重新升起。
:::

::: example 缓冲液能吞下多少酸？ {#ex-capacity}
一只 $1.00\ \mathrm{dm^3}$ 的烧瓶盛有乙酸与乙酸钠各 $0.100\ \mathrm{mol\,dm^{-3}}$ 的缓冲液（$\mathrm{pH} = 4.76$）。加入多少 $1.00\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{HCl}$ 会使其 pH 改变 $0.10$ 个单位？
::: solution
加入 $x$ mol 的 $\mathrm{HCl}$ 会把 $x$ 的 $\mathrm{A^-}$ 变成 $\mathrm{HA}$，于是比值成为 $(0.100 - x)/(0.100 + x)$。pH 下降 $0.10$ 个单位意味着
$$
\frac{0.100 - x}{0.100 + x} = 10^{-0.10} = 0.794
\qquad\Longrightarrow\qquad
0.100 - 0.0794 = x(1 + 0.794),
$$
所以 $x = 0.0206/1.794 = 0.0115\ \mathrm{mol}$——即 $11.5\ \mathrm{cm^3}$ 的酸。同样的缓冲液要被完全耗尽（最后一个乙酸根离子也被质子化）需要 $0.100\ \mathrm{mol}$，是它的十倍；在它的范围内它用酸极省，这 $0.10$ 单位的改变只用掉其储备的九分之一。把这同样的 $11.5\ \mathrm{cm^3}$ 酸加入 $1.00\ \mathrm{dm^3}$ 的纯水，pH 会从 $7.00$ 跌到 $1.94$——这个对比就是缓冲溶液的全部意义。
:::
:::

::: warning 缓冲不是无限的，亨德森–哈塞尔巴尔赫也不是普适的 {#warn-buffer-limits}
三种失效在等着粗心的人。**容量是有限的**：上面例题中的缓冲液，一旦加入的酸超过 $0.100\ \mathrm{mol}$ 就不复是缓冲液，此后 pH 的崩塌就好像缓冲液从未存在过。**方程有稀释极限**：取一份等摩尔的乙酸–乙酸盐缓冲液不断稀释，亨德森–哈塞尔巴尔赫预言 $\mathrm{pH} = 4.76$ 直到永远，但精确处理（电荷与物料平衡，包含水）给出：每个组分 $10^{-3}\ \mathrm{mol\,dm^{-3}}$ 时是 $4.76$，$10^{-4}$ 时是 $4.86$，$10^{-5}$ 时是 $5.27$——每个组分低于约 $10^{-3}\ \mathrm{mol\,dm^{-3}}$ 后，水的自偶解离已经接管，这个"缓冲液"什么也缓冲不了。**而且缓冲溶液不是固定 pH，只是拖慢 pH**：一个比值从 $1.00$ 漂到 $0.79$ 的缓冲液已经移动了 $0.10$ 个 pH 单位，完全符合算术；抵抗的意思是*每摩尔加入物的改变小*，不是*没有改变*。
:::

::: quiz
配制两份乙酸–乙酸盐缓冲液：A 的酸与乙酸钠各为 $0.10\ \mathrm{mol\,dm^{-3}}$；B 是把同一混合液稀释十倍，各为 $0.010\ \mathrm{mol\,dm^{-3}}$。下列哪个说法正确？
- [x] A 与 B 的 pH 相同，但 A 在耗尽前能中和十倍于 B 的加入酸。
- [ ] B 的 pH 更高，因为它更稀，因而更接近中性。
- [ ] A 与 B 在一切方面表现相同，包括对加入酸的反应。
- [ ] B 的 pH 更低，因为稀释使酸解离平衡右移。
::: solution
亨德森–哈塞尔巴尔赫方程只含比值 $[\mathrm{A^-}]/[\mathrm{HA}]$，而稀释把两者的比值都保持在 $1.00$，所以两者都停在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 4.76$（在这些浓度下精确处理与之相差 $0.01$ 单位以内）。但储备——可供消耗加入的碱或酸的 $\mathrm{HA}$ 与 $\mathrm{A^-}$ 的量——A 是 B 的十倍：缓冲容量正比于总浓度 $C$，稀释不移动 pH 却把它花掉。
:::
:::

## 选择缓冲液，以及血液的缓冲体系

设计规则直接从容量曲线推出。选一个 $\mathrm{p}K_\mathrm{a}$ 在目标 pH 一个单位以内的酸——能在一单位以内最好，因为那时容量在其最大值的 $98\ \%$ 以上——并使用 $0.05$–$0.25\ \mathrm{mol\,dm^{-3}}$ 的总浓度：再低则容量差且逼近稀释极限，再高则把溶液腌成盐水，改变其离子强度，也随之改变基于浓度的 $\mathrm{p}K_\mathrm{a}$ 悄悄假定的活度系数。常见选择：$\mathrm{pH}\ 3.8$–$5.6$ 用乙酸–乙酸盐，磷酸盐（$\mathrm{p}K_\mathrm{a2} = 7.20$）用于 $6.2$–$8.2$，铵（$\mathrm{p}K_\mathrm{a} = 9.25$）用于 $8.3$–$10.2$，碳酸盐/碳酸氢盐（$\mathrm{p}K_\mathrm{a1} = 6.35$）用于下面那个少见的场合。

血液的碳酸体系是一个有转折的缓冲的教科书范例。溶解的二氧化碳是一种弱酸（$\mathrm{CO_2 + H_2O \rightleftharpoons H^+ + HCO_3^-}$，体温下表观 $\mathrm{p}K_\mathrm{a1} = 6.35$），碳酸氢根是其共轭碱——但酸组分与一个*气体*处于平衡，而肺部把那个气体固定在恒定的分压上。因此这个缓冲是**开放**的：代谢酸加入时 $\mathrm{CO_2}$ 浓度并不改变，因为多余的部分被呼吸排掉了。

::: example 你血液的 pH {#ex-blood}
动脉血浆含 $[\mathrm{HCO_3^-}] = 24\ \mathrm{mmol\,dm^{-3}}$，并在 $\mathrm{p_{CO_2}} = 5.3\ \mathrm{kPa}$ 下含 $[\mathrm{CO_2}] = 1.2\ \mathrm{mmol\,dm^{-3}}$。求其 pH。
::: solution
把溶解的 $\mathrm{CO_2}$ 当作酸组分，用表观常数代入亨德森–哈塞尔巴尔赫：
$$
\mathrm{pH} = 6.35 + \log_{10}\frac{24}{1.2} = 6.35 + \log_{10}20 = 6.35 + 1.30 = 7.40.
$$
这个数字正是生理值，而这个计算的结构就是生理学本身：比值是二十比一、严重偏向碱的一侧，因为酸组分是一种肺可以排出的气体。过度换气，$\mathrm{p_{CO_2}}$ 下降，比值上升，你几分钟内就会变碱——这就是为什么对着纸袋呼吸（重吸 $\mathrm{CO_2}$）曾是恐慌发作时手麻的民间疗法。肾脏则以小时到天的尺度更慢地控制另一个组分，这就是为什么呼吸性紊乱来得快、代谢性紊乱来得慢。
:::
:::

::: history
缓冲的定量理论直接从 pH 概念中生长出来。瑟伦森（Sørensen）1909 年在嘉士伯实验室引入了氢离子浓度标度，而波士顿化学家劳伦斯·约瑟夫·亨德森（Henderson）早在 1908 年就在其著作《血液》（*The Blood*）中为血液碳酸体系写下了这个平衡比方程；1916 年，丹麦生理学家卡尔·阿尔伯特·哈塞尔巴尔赫（Hasselbalch）在研究同一个血液问题时，用瑟伦森的 pH 把亨德森方程重述为对数形式——亨德森–哈塞尔巴尔赫方程，科学界极少数两位作者隔着十年与一种语言共同署名的方程之一。缓冲容量作为一个被定义的量来得更晚，在二十世纪中叶被标准化，因为分析与生物工作要求能够被规定而不只是被混合的缓冲液。
:::

## 强酸加强碱：滴定的形状

::: definition 滴定词汇 {#def-titration-terms}
**滴定**是把一份已知浓度的溶液——**滴定剂**——从滴定管中受控地加入到被分析溶液的一个量出体积中，直到反应**按化学计量恰好完成**：在**等当点**（化学计量点），滴定剂的摩尔数按配平方程恰好等于被测物的摩尔数。**滴定终点**是指示剂变色的那个体积；滴定正确，当且仅当两者重合。**滴定曲线**把 pH 对滴定剂体积作图。
:::

::: proposition 强酸–强碱曲线 {#prop-strong-curve}
用 $0.100\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{NaOH}$ 滴定 $25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$，依次经过三个区域：等当点之前 pH 由未被中和的酸决定；等当点（$25.0\ \mathrm{cm^3}$）处只剩 $\mathrm{NaCl}$，故 pH 为 $7.00$；等当点之后由过量的 $\mathrm{OH^-}$ 决定。从等当体积的 $99.9\ \%$ 到 $100.1\ \%$——两滴之间——pH 从 $4.30$ 跃到 $9.70$。这条**突跃范围**是指示剂能工作的全部理由：变色范围落在突跃之内的任何指示剂，都在距等当点一滴之内变色。
:::

::: example 强酸–强碱曲线上的点 {#ex-strong-curve}
计算用 $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ 滴定 $25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$，在加入 $0$、$10.0$、$24.0$、$25.0$ 与 $26.0\ \mathrm{cm^3}$ 后的 pH。
::: solution
等当点之前，$[\mathrm{H_3O^+}] = (n_\mathrm{HCl} - n_\mathrm{NaOH})/V_\mathrm{total}$：
$$
\begin{aligned}
V = 0: && [\mathrm{H_3O^+}] = 0.100, && \mathrm{pH} = 1.00;\\
V = 10.0: && \frac{(2.50 - 1.00)\ \mathrm{mmol}}{35.0\ \mathrm{cm^3}} = 0.0429, && \mathrm{pH} = 1.37;\\
V = 24.0: && \frac{0.10\ \mathrm{mmol}}{49.0\ \mathrm{cm^3}} = 2.0\times10^{-3}, && \mathrm{pH} = 2.69;
\end{aligned}
$$
$V = 25.0$ 时溶液是纯粹的盐水，$\mathrm{pH} = 7.00$；$V = 26.0$ 时过量的氢氧根为 $(2.60 - 2.50)\ \mathrm{mmol}/51.0\ \mathrm{cm^3} = 1.96\times10^{-3}\ \mathrm{mol\,dm^{-3}}$，故 $\mathrm{pOH} = 2.71$、$\mathrm{pH} = 11.29$。看着曲线加速：等当点前最后一立方厘米付出 $4.3$ 个 pH 单位，等当点后第一立方厘米再付出 $4.3$。两个浓度都减半，突跃变平为 $5.30$–$8.70$；在 $10^{-4}\ \mathrm{mol\,dm^{-3}}$ 时根本不再有突跃、也就根本谈不上滴定——突跃范围是一种浓度效应。
:::
:::

## 弱酸加强碱：pKa 藏身之处

弱酸曲线就是强酸曲线外加一段坡道。等当点之前你在滴定的过程中*正在制造*共轭碱，所以在头 $25\ \mathrm{cm^3}$ 的每一点上溶液都是一份乙酸–乙酸盐缓冲液——而亨德森–哈塞尔巴尔赫方程像读表一样读出这条曲线。

::: proposition 半等当点 {#prop-half-equivalence}
在弱酸滴定的半等当点——恰好一半的酸被中和之时——$[\mathrm{A^-}] = [\mathrm{HA}]$，亨德森–哈塞尔巴尔赫方程坍缩为
$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a}.
$$
对用强酸滴定的弱碱，在其半等当点处同样有 $\mathrm{pOH} = \mathrm{p}K_\mathrm{b}$。这是从滴定曲线求 $\mathrm{p}K_\mathrm{a}$ 的标准实验途径，其精确程度与亨德森–哈塞尔巴尔赫本身相同。
:::

::: proof 半等当点恒等式 {#proof-halfway}
在半中和处，化学计量恰好把一半的分析浓度酸变成了共轭碱，所以 $[\mathrm{A^-}] = [\mathrm{HA}] = C/2$（两者都远大于 $[\mathrm{H_3O^+}]$，因为溶液仍是缓冲的、呈弱酸性）。亨德森–哈塞尔巴尔赫方程中的比值为 $1$，其对数为 $0$，于是 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$。等价地，由 $K_\mathrm{a} = [\mathrm{H_3O^+}][\mathrm{A^-}]/[\mathrm{HA}]$，比值直接约去，$[\mathrm{H_3O^+}] = K_\mathrm{a}$。这个恒等式只在亨德森–哈塞尔巴尔赫失效之处失效：极稀或极弱的酸，其中水自身的离子扭曲了比值。
:::

::: example 整条弱酸曲线 {#ex-weak-curve}
用 $0.100\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{NaOH}$ 滴定 $25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ 乙酸（$\mathrm{p}K_\mathrm{a} = 4.76$）。计算 $0$、$12.5$、$25.0$ 与 $30.0\ \mathrm{cm^3}$ 处的 pH。
::: solution
**起点**（$0\ \mathrm{cm^3}$）：一份普通的弱酸，$[\mathrm{H_3O^+}] = \sqrt{K_\mathrm{a}C} = \sqrt{1.8\times10^{-5}\times0.100} = 1.34\times10^{-3}$，$\mathrm{pH} = 2.87$。
**中点**（$12.5\ \mathrm{cm^3}$）：半等当点恒等式给出 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 4.76$。
**等当点**（$25.0\ \mathrm{cm^3}$）：酸已不复存在——只有 $50.0\ \mathrm{cm^3}$ 中的 $2.50\ \mathrm{mmol}$ 乙酸根，即 $0.0500\ \mathrm{mol\,dm^{-3}}$ 的一种弱*碱*，$K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$：
$$
[\mathrm{OH^-}] = \sqrt{K_\mathrm{b}C} = \sqrt{5.6\times10^{-10}\times0.0500} = 5.3\times10^{-6},
$$
$\mathrm{pOH} = 5.28$，$\mathrm{pH} = 8.72$——**等当点呈碱性**，因为剩下的是被测物的共轭碱。
**等当点之后**（$30.0\ \mathrm{cm^3}$）：过量的氢氧根压过弱碱，$(3.00 - 2.50)\ \mathrm{mmol}/55.0\ \mathrm{cm^3} = 9.1\times10^{-3}$，$\mathrm{pOH} = 2.04$，$\mathrm{pH} = 11.96$。曲线起点高于强酸曲线，平穿缓冲区，终点在碱性一侧，其突跃范围大致跨 $7$–$10$——这已经告诉你该用哪种指示剂了。
:::
:::

::: widget newton
f: 10^(-x) + 0.05 - 10^(x-14) - 0.05*10^(-4.76)/(10^(-4.76)+10^(-x))
method: newton
x0: 8
caption: 牛顿法求解滴定方程的*精确*形式：变量 $x$ 即 pH，对应 $25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ 乙酸被 $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ 滴定至等当点，初值 $x_0 = 8$。方程是电荷平衡 $[\mathrm{H_3O^+}] + [\mathrm{Na^+}] = [\mathrm{OH^-}] + [\mathrm{A^-}]$，其中 $[\mathrm{Na^+}] = [\mathrm{A^-}] + [\mathrm{HA}] = 0.05\ \mathrm{mol\,dm^{-3}}$，酸的解离分数取精确值 $K_\mathrm{a}/(K_\mathrm{a} + [\mathrm{H_3O^+}])$——没有任何水解近似。迭代收敛于 $\mathrm{pH} = 8.73$，与平方根水解答案 $8.72$ 相差不到百分之一单位——这正是此处近似合法的保证。
:::

把图像镜像过来就是**弱碱被强酸滴定**：氨加 $\mathrm{HCl}$ 起点在碱性一侧（$0.100\ \mathrm{mol\,dm^{-3}}$ 时 $\mathrm{pH}\ 11.13$），在半等当点经过 $\mathrm{pOH} = \mathrm{p}K_\mathrm{b} = 4.74$，抵达 $\mathrm{pH} = 5.28$ 的等当点——呈酸性，因为此时溶液是 $0.050\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{NH_4^+}$，一种弱酸。突跃范围位于酸性一侧，所以酚酞会整整提前半滴定管变色；甲基橙才是对的选择。规则可以推广：**等当点落在较强一方的共轭那一侧**——弱酸被强碱滴定时偏碱，弱碱被强酸滴定时偏酸，只有两强相遇时才居中为 $7$。

**多元酸**给出每个质子一个台阶的曲线，只要相邻常数相差约 $10^{4}$ 以上。磷酸（$\mathrm{p}K_\mathrm{a}$ 为 $2.15$、$7.20$、$12.35$）显示两个干净的等当点，分别在 $\mathrm{pH} = \tfrac{1}{2}(\mathrm{p}K_\mathrm{a1} + \mathrm{p}K_\mathrm{a2}) = 4.67$（两性的 $\mathrm{H_2PO_4^-}$）与 $\mathrm{pH} = \tfrac{1}{2}(\mathrm{p}K_\mathrm{a2} + \mathrm{p}K_\mathrm{a3}) = 9.78$（$\mathrm{HPO_4^{2-}}$）；第三个质子酸性太弱，在水中根本无法滴定。用 $\mathrm{HCl}$ 滴定碳酸盐则把同样的算术反过来：第一个等当点是碳酸氢根，$\mathrm{pH} = \tfrac{1}{2}(6.35 + 10.33) = 8.34$（酚酞的范围——水质分析中经典的"酚酞碱度"），第二个是碳酸，在 $\mathrm{pH}\ 3.9$ 附近（甲基橙）。

::: warning 等当点不是 pH 7，滴定终点也不是等当点 {#warn-equivalence}
"等当点处 pH 为 $7$"只对强酸对强碱成立，把它当作定律背下来是本章程最顽固的迷思：等当点在*化学计量落到的任何地方*——乙酸是 $8.72$，氨是 $5.28$，碳酸盐是 $8.34$。而**滴定终点**完全是另一个对象——你所选指示剂肉眼变色的体积；只有当指示剂的变色范围落在突跃范围之内时，它才与等当点一致。给氨对 $\mathrm{HCl}$ 选酚酞，你会报告一个接近真实值一半的体积，面不改色，且颜色变化完全可重现。
:::

## 指示剂：两种颜色的平衡

::: definition 酸碱指示剂 {#def-indicator}
**酸碱指示剂**是一种其两种型体颜色不同的弱有机酸或弱碱：$\mathrm{HIn}$（酸色）与 $\mathrm{In^-}$（碱色），其 $\mathrm{p}K_\mathrm{In}$ 落在感兴趣的范围内。人眼只有当一种型体约为另一种十倍时才能可靠分辨两色，所以**变色范围**是 $\mathrm{pH} = \mathrm{p}K_\mathrm{In} \pm 1$：酚酞（$9.4$）约 $8.3$–$10.0$，溴百里酚蓝（$7.1$）$6.0$–$7.6$，甲基橙（$3.7$）$3.1$–$4.4$。
:::

| 指示剂 | $\mathrm{p}K_\mathrm{In}$ | 变色范围 | 酸色 → 碱色 |
|---|---|---|---|
| 甲基橙 | $3.7$ | $3.1$–$4.4$ | 红 → 黄 |
| 溴百里酚蓝 | $7.1$ | $6.0$–$7.6$ | 黄 → 蓝 |
| 酚酞 | $9.4$ | $8.3$–$10.0$ | 无色 → 粉红 |

::: widget plot
f: 1/(1+10^(pKaIn-x)); 1/(1+10^(x-pKaIn))
x: 0, 14
y: 0, 1.05
sliders: pKaIn=9.4:2:12:0.1
labels: \text{HIn}; \text{In}^-
caption: 指示剂以酸型 $\mathrm{HIn}$ 与碱型 $\mathrm{In^-}$ 存在的分数随 pH 的变化，$\mathrm{p}K_\mathrm{In}$ 由滑块设定（起点为酚酞，$9.4$）。颜色在两条曲线交叉处改变——但肉眼可见只在比值经过 $1:10$ 与 $10:1$ 的两点之间，即 $\mathrm{p}K_\mathrm{In} \pm 1$ 的变色范围。指示剂有用的条件是其交叉点落在滴定的突跃范围之内；而弱酸滴定的突跃随酸变弱而变窄：$\mathrm{p}K_\mathrm{a}$ 超过约 $11$ 后，不再有任何突跃陡到足以让*任何*指示剂工作，该滴定在水中就无法用肉眼完成。
:::

::: example 选择指示剂 {#ex-indicator-choice}
上面三种指示剂中，哪一种适合 (a) 乙酸对 $\mathrm{NaOH}$，(b) 氨对 $\mathrm{HCl}$，(c) $0.1\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{HCl}$ 对 $\mathrm{NaOH}$？
::: solution
把变色范围对到突跃范围上。(a) 等当点是 $8.72$，突跃约跨 $7$–$10$：**酚酞**（$8.3$–$10.0$）落在其内；甲基橙会在缓冲区一开始就变了色。(b) 等当点是 $5.28$，突跃在酸性范围：**甲基橙**（$3.1$–$4.4$）——或者更好的是甲基红；溴百里酚蓝与酚酞都会变得太早。(c) 突跃是 $4.30$–$9.70$，所以**三种都行**；其中 $\mathrm{p}K_\mathrm{In}$ 最接近 $7$ 的溴百里酚蓝给眼睛最锐利的终点。通用方法：勾画或计算曲线，找到突跃范围，选 $\mathrm{p}K_\mathrm{In}$ 落在其内的指示剂。
:::
:::

关于实验台说几句，因为本章的实验是这一年第一批滴定：稀盐酸与稀氢氧化钠是刺激品，氢氧化钠对眼睛有腐蚀性——全程戴护目镜，洒出的液体用水拖洗。浓氨水与有机指示剂溶液在通风橱中使用，一切实践工作一如往常在监督下、经风险评估后进行。

::: quiz
用 $\mathrm{NaOH}$ 滴定弱酸 $\mathrm{HA}$，加入 $18.0\ \mathrm{cm^3}$ 碱液时测得 pH 为 $5.60$；等当点在 $36.0\ \mathrm{cm^3}$。$\mathrm{p}K_\mathrm{a}$ 是多少？
- [x] $5.60$——半等当点在 $18.0\ \mathrm{cm^3}$，那里 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$。
- [ ] $7.00$——等当点之前任何一点，pH 都趋近中性。
- [ ] $8.40$——半中和处 pH 的两倍。
- [ ] 不知道浓度就无法确定。
::: solution
$18.0\ \mathrm{cm^3}$ 恰为 $36.0\ \mathrm{cm^3}$ 的一半，所以一半的酸被中和，$[\mathrm{A^-}] = [\mathrm{HA}]$，亨德森–哈塞尔巴尔赫方程给出 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 5.60$——不需要任何浓度，这正是半等当点技巧成为从曲线读取 $\mathrm{p}K_\mathrm{a}$ 的标准方法的原因。
:::
:::

## 后续内容

缓冲与滴定曲线是之后每一门水溶液课程的分析骨架。把同样的 ICE 表逻辑推广到难溶盐，见 [[general-chemistry-2/solubility-equilibria]]；你一直在查的那些常数的热力学含义，见 [[general-chemistry-2/entropy-free-energy]] 与 [[thermodynamics/ions-in-solution]]；酸碱基础见 [[general-chemistry-2/acids-bases]]，平衡机制见 [[general-chemistry-2/chemical-equilibrium]]；滴定本身的化学计量建立在 [[general-chemistry-1/solutions-reactions]] 之上。曲线计算、Gran 作图法与非水滴定的完整处理，见 [[analytical-chemistry/equilibria-in-analysis]] 与 [[analytical-chemistry/classical-analysis]]。

::: summary
- 缓冲溶液是以相当量共存的共轭对；它靠把加入的强酸或强碱变成*比值*的改变（而非水合氢离子的改变）来工作。
- 亨德森–哈塞尔巴尔赫方程 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}([\mathrm{A^-}]/[\mathrm{HA}])$ 由 $K_\mathrm{a}$ 导出，在两组分都远大于 $[\mathrm{H_3O^+}]$ 与 $[\mathrm{OH^-}]$ 时成立；稀释完全不动 pH，直到该条件失效。
- 缓冲容量在 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ 处以 $0.576\,C$ 达峰，在 $\mathrm{p}K_\mathrm{a} \pm 1$ 降到三分之一：按 $\mathrm{p}K_\mathrm{a}$ 选缓冲液，按 $C$ 定其规模。
- 血液是开放的碳酸缓冲：$\mathrm{pH} = 6.35 + \log_{10}(24/1.2) = 7.40$，酸组分由肺部固定。
- 滴定曲线有三个区域——缓冲区、等当点、过量滴定剂——而等当点落在较强一方的共轭那一侧：强–强、弱酸、弱碱滴定的等当点分别是 $7.00$、$8.72$、$5.28$。
- 半等当点处 $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$：这是化学里最便宜的测量。
- 指示剂在 $\mathrm{p}K_\mathrm{In} \pm 1$ 内变色，必须让其范围落在曲线突跃之内；滴定终点不是等当点。
:::

## 练习

::: exercise 由比值求 pH {level=1 check="4.46"}
一份缓冲液含乙酸 $0.20\ \mathrm{mol\,dm^{-3}}$、乙酸钠 $0.10\ \mathrm{mol\,dm^{-3}}$（$\mathrm{p}K_\mathrm{a} = 4.76$）。求其 pH。（填入 pH。）
::: solution
$\mathrm{pH} = 4.76 + \log_{10}(0.10/0.20) = 4.76 - 0.30 = 4.46$。酸多于碱，所以 pH 位于 $\mathrm{p}K_\mathrm{a}$ 之下——对数项的符号是最常见的失误。
:::
:::

::: exercise 目标 pH 所需的比值 {level=1 check="2.75"}
乙酸–乙酸盐缓冲液要达 $\mathrm{pH}\ 5.20$，需要比值 $[\mathrm{A^-}]/[\mathrm{HA}]$ 为多少？（$\mathrm{p}K_\mathrm{a} = 4.76$；填入比值。）
::: solution
$[\mathrm{A^-}]/[\mathrm{HA}] = 10^{\,5.20 - 4.76} = 10^{0.44} = 2.75$。两份碱对一份酸。
:::
:::

::: exercise 半等当点读数 {level=1 check="3.75"}
甲酸（$\mathrm{p}K_\mathrm{a} = 3.75$）用 $\mathrm{NaOH}$ 滴定。一半的酸被中和时 pH 是多少？（填入 pH。）
::: solution
半等当点处 $[\mathrm{A^-}] = [\mathrm{HA}]$，所以 $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 3.75$，与浓度无关。
:::
:::

::: exercise 缓冲液对抗加入的酸 {level=2 check="4.67"}
向 $1.00\ \mathrm{dm^3}$ 等摩尔乙酸–乙酸盐缓冲液（每个组分 $0.100\ \mathrm{mol\,dm^{-3}}$）中加入 $0.010\ \mathrm{mol}$ 的 $\mathrm{HCl}$，体积变化可忽略。求新的 pH。（$\mathrm{p}K_\mathrm{a} = 4.76$；填入 pH。）
::: solution
酸把 $0.010\ \mathrm{mol}$ 的 $\mathrm{A^-}$ 变成 $\mathrm{HA}$：两组分变为 $0.090$ 与 $0.110\ \mathrm{mol}$。$\mathrm{pH} = 4.76 + \log_{10}(0.090/0.110) = 4.76 - 0.087 = 4.67$。十毫摩尔的强酸——足以把纯水降到 $\mathrm{pH}\ 2$——在这里只付出 $0.09$ 个单位。
:::
:::

::: exercise 弱酸的等当点 {level=2 check="8.22"}
$25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ 甲酸（$\mathrm{p}K_\mathrm{a} = 3.75$）用 $0.100\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{NaOH}$ 滴定。求等当点处的 pH。（填入 pH。）
::: solution
等当点时瓶中是 $50.0\ \mathrm{cm^3}$ 中的 $2.50\ \mathrm{mmol}$ 甲酸根：$C = 0.0500\ \mathrm{mol\,dm^{-3}}$，$K_\mathrm{b} = 10^{-14}/10^{-3.75} = 5.6\times10^{-11}$。$[\mathrm{OH^-}] = \sqrt{5.6\times10^{-11}\times0.0500} = 1.7\times10^{-6}$，$\mathrm{pOH} = 5.78$，$\mathrm{pH} = 8.22$。甲酸根比乙酸根碱性更弱，所以其等当点的碱性弱于乙酸的 $8.72$。
:::
:::

::: exercise 弱碱的等当点 {level=2 check="5.28"}
$25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ 氨水（$K_\mathrm{b} = 1.8\times10^{-5}$）用 $0.100\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{HCl}$ 滴定。求等当点处的 pH。（填入 pH。）
::: solution
产物是 $0.0500\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{NH_4^+}$，其 $K_\mathrm{a} = K_\mathrm{w}/K_\mathrm{b} = 5.6\times10^{-10}$：$[\mathrm{H_3O^+}] = \sqrt{5.6\times10^{-10}\times0.0500} = 5.3\times10^{-6}$，$\mathrm{pH} = 5.28$。呈酸性，如所预告——甲基橙的地盘。
:::
:::

::: exercise 设计一份缓冲液 {level=3}
你要用 $0.200\ \mathrm{mol\,dm^{-3}}$ 乙酸与 $0.200\ \mathrm{mol\,dm^{-3}}$ 乙酸钠（$\mathrm{p}K_\mathrm{a} = 4.76$）配制 $250\ \mathrm{cm^3}$、$\mathrm{pH}\ 5.00$ 的缓冲液。各取多少体积混合？两组分的最终浓度是多少？若再把混合液稀释到 $1.00\ \mathrm{dm^3}$，pH 会发生什么？
::: solution
所需比值为 $10^{\,5.00-4.76} = 1.74$。储备液浓度相等，体积比即等于比值，所以乙酸钠 $V_\mathrm{b} = 250\times1.74/2.74 = 159\ \mathrm{cm^3}$，酸 $91\ \mathrm{cm^3}$。浓度为乙酸钠 $0.200\times159/250 = 0.127\ \mathrm{mol\,dm^{-3}}$、乙酸 $0.073\ \mathrm{mol\,dm^{-3}}$——稳稳高于 $10^{-3}$ 的稀释极限，缓冲液是可靠的。稀释到 $1.00\ \mathrm{dm^3}$ 后比值仍是 $1.74$、pH 仍是 $5.00$（亨德森–哈塞尔巴尔赫对稀释不变），但容量降为四分之一：加入 $0.010\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{HCl}$，原缓冲液移动 $0.09$ 个单位，稀释后的移动 $0.35$。容量是浓度；pH 是比值——设计时两者都要放在心里。
:::
:::

::: exercise 亨德森–哈塞尔巴尔赫失效之时 {level=3 check="5.27"}
一份等摩尔乙酸–乙酸盐缓冲液被配成*每个*组分 $1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$。亨德森–哈塞尔巴尔赫预言 $\mathrm{pH} = 4.76$。求解精确体系——电荷平衡 $[\mathrm{Na^+}] + [\mathrm{H_3O^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$、物料平衡 $[\mathrm{HA}] + [\mathrm{A^-}] = 2.0\times10^{-5}$、$K_\mathrm{a} = 1.8\times10^{-5}$、$K_\mathrm{w} = 10^{-14}$——求真实的 pH。（填入 pH。）
::: hint
把 $[\mathrm{A^-}] = 2.0\times10^{-5}K_\mathrm{a}/(K_\mathrm{a} + [\mathrm{H_3O^+}])$ 与 $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H_3O^+}]$ 消入电荷平衡，再数值求解所得方程（本课的交互图正是这样求解的）。
:::
::: solution
以 $h = [\mathrm{H_3O^+}]$ 计，电荷平衡写作 $1.0\times10^{-5} + h = \dfrac{2.0\times10^{-5}\times1.8\times10^{-5}}{1.8\times10^{-5} + h} + \dfrac{10^{-14}}{h}$，其解为 $h = 5.4\times10^{-6}$，$\mathrm{pH} = 5.27$。$4.76$ 的预言偏了半个单位：在这个稀释度下，缓冲组分（$10^{-5}\ \mathrm{mol\,dm^{-3}}$）只有它本应远远压过的水合氢离子的两倍，水的氢氧根不再可以忽略，而这个"缓冲液"几乎没有容量——它是一份自作多情的盐溶液。这就是前面那条警告中稀释极限的定量版本。
:::
:::

::: exercise 碳酸盐曲线 {level=3}
$25.0\ \mathrm{cm^3}$ 的 $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2CO_3}$ 用 $0.100\ \mathrm{mol\,dm^{-3}}$ 的 $\mathrm{HCl}$ 滴定。求第一与第二等当点的 pH（碳酸：$\mathrm{p}K_\mathrm{a1} = 6.35$，$\mathrm{p}K_\mathrm{a2} = 10.33$），并说明每个等当点各适合哪种指示剂。
::: hint
第一等当点处每个碳酸根都已变成碳酸氢根——一种两性物质；证明其 pH 为 $\tfrac{1}{2}(\mathrm{p}K_\mathrm{a1} + \mathrm{p}K_\mathrm{a2})$，与浓度无关。第二等当点处你有的只是分析浓度下的碳酸 $\mathrm{H_2CO_3}$。
:::
::: solution
**第一等当点**（加入 $25.0\ \mathrm{cm^3}$ $\mathrm{HCl}$）：溶液是 $\mathrm{HCO_3^-}$。对两性物质，质子条件 $[\mathrm{H_2CO_3}] \approx [\mathrm{CO_3^{2-}}]$（两者都小）给出 $[\mathrm{H_3O^+}]^2 = K_\mathrm{a1}K_\mathrm{a2}$，所以 $\mathrm{pH} = \tfrac{1}{2}(6.35 + 10.33) = 8.34$——恰在酚酞的范围内，这正是"酚酞碱度"能把碳酸盐滴到碳酸氢盐的原因。**第二等当点**（共加入 $50.0\ \mathrm{cm^3}$，总体积 $75.0\ \mathrm{cm^3}$）：$75.0\ \mathrm{cm^3}$ 中的 $2.50\ \mathrm{mmol}$ $\mathrm{H_2CO_3}$，$C = 0.0333\ \mathrm{mol\,dm^{-3}}$，一种弱酸：$[\mathrm{H_3O^+}] = \sqrt{10^{-6.35}\times0.0333} = 1.2\times10^{-4}$，$\mathrm{pH} = 3.91$——甲基橙。两个等当点，两种指示剂，一支滴定管：这就是洗涤苏打（碳酸钠）经典的双指示剂碳酸盐分析，而其中每一个数字都出自本章的两条规则。
:::
:::
