催化剂在 [[general-chemistry-2/rates-intro]] 中曾被介绍为一种加快反应而自身不被消耗的物质；[[kinetics/reaction-mechanisms]] 则给出了把这一承诺讲精确的语言。本章前半部分学习用机理语言*读懂*催化——溶液中的酸碱催化、作为催化循环的酶、以及一般循环的速率方程；后半部分则把这个概念追随到它出人意料的结论。因为如果催化剂不是从外部加入，而是*由反应自身产生*，速率方程的分子里就会出现产物浓度：反应以自身为食。自催化给出 S 形曲线——种群增长的曲线、标准高锰酸钾滴定的曲线、电池与火焰的曲线。而自催化再配上最后一味原料——一个被维持在远离平衡的中间体——就给出化学*振荡*：反应进行、停止、倒退、再来，化学上的心跳。这一发现被嘲笑了半个世纪，最终获得诺贝尔奖，迫使化学家承认：秩序与节律是耗散的自然结果，而不是热力学第二定律的例外。

## 用机理语言表述的催化

::: definition 均相催化与催化剂级数 {#def-cat-mech}
催化剂与反应物处于同一相（通常是水溶液或有机溶液）时的催化称为**均相催化**。用机理语言说，**催化剂**是*在一个基元步骤中被消耗、又在后续步骤中再生*的物种，因此在净方程中被消去；注意顺序——中间体先生成后销毁，催化剂先销毁后生成，这正是催化剂必须外加、而中间体自行出现的原因。催化剂的起作用方式是打开一条替代的**决速序列**，其最高能垒低于非催化路径（与过渡态理论的联系是严格的：催化的过渡态相对反应物被稳定，见 [[kinetics/transition-state-theory]]）。**催化剂级数**是速率方程中催化剂浓度的指数；它是一个实验测定的数，而且像一切级数一样，是机理的指纹。
:::

四种催化剂级数反复出现，每一种都讲述一个不同的机理故事。级数为 **1** 是默认情形：一个催化剂分子进入决速序列，如碘离子催化的过氧化氢分解 $v = k[\mathrm{H_2O_2}][\mathrm{I^-}]$。级数为 **½** 说明催化剂的静息态是与活性单体快速平衡的二聚体，$2\,\mathrm{Cat} \rightleftharpoons \mathrm{Cat_2}$：单体浓度正比于 $[\mathrm{Cat}]_0^{1/2}$。级数为 **0** 是酶饱和的镜像：当催化剂过量、每个底物分子都已结合时，速率为 $k_2[\mathrm{S}]_0$，再加催化剂也无济于事。**负**级数较罕见但确实存在：当外加催化剂被体系俘获时就会出现——例如活性单体结合到无产率的死端聚集体上，总催化剂浓度升高反而*降低*自由形态的浓度。

::: example 由速率数据确定催化剂级数 {#ex-cat-order}
在底物大量过量、$\mathrm{25\,^\circ C}$ 下跟踪一个钯催化偶联反应，改变催化剂总量并测定初始速率：

| $[\mathrm{Cat}]_0\,/\mathrm{mmol\,dm^{-3}}$ | 1.0 | 2.0 | 4.0 | 8.0 |
|---|---|---|---|---|
| $v_0\,/\,10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ | 1.5 | 2.1 | 3.0 | 4.2 |

求催化剂级数，并说明它对催化剂静息态的启示。
::: solution
取第一次与最后一次实验，催化剂浓度相差 $8$ 倍：
$$
m_\text{cat} = \frac{\ln\!\left(4.2/1.5\right)}{\ln 8} = \frac{1.030}{2.079} = 0.50.
$$
相邻各对也一致：催化剂每加倍，速率乘以 $\approx 1.41 = 2^{1/2}$。反应**对催化剂为半级**，这是二聚静息态的签名：活性物种是单体，被快速前置平衡 $2\,\mathrm{Cat} \rightleftharpoons \mathrm{Cat_2}$ 压制着，故 $[\mathrm{Cat}]_\text{单体} = \left([\mathrm{Cat}]_0/K\right)^{1/2}$（$K$ 为二聚常数，且 $[\mathrm{Cat}]_0$ 大部分沉在二聚体中）。半级不是一个分子反应半次；而是一个完整的分子与二聚体处于平衡。
:::
:::

::: warning 半级数、零级数以及它们不是什么 {#warn-cat-order}
催化剂级数为 $\tfrac{1}{2}$ **并不**意味着"半个反应"或半次三分子碰撞：它意味着催化剂的*静息态*是一个聚集体——通常是二聚体——只有单体（或其碎片）进入决速序列。同样，对催化剂零级也不是"没有催化"：它意味着催化剂已满载工作、底物全部结合，恰如饱和酶对*底物*呈零级。负级数也不是数据错误：先检查催化剂是否被产物、溶剂或配体俘获。级数是关于*整个*机理的事实，而不是关于你期望的那一步的事实。
:::

## 酸碱催化

质子转移是溶液化学中最常见的基元步骤，酸碱是最常见的催化剂。核心区别在于质子进入速率方程的两种方式。

::: definition 专性酸碱催化与广义酸碱催化 {#def-acid-cat}
若反应速率只依赖溶剂化质子浓度 $[\mathrm{H_3O^+(aq)}]$（等价地依赖 pH）而不依赖任何其他酸性物质，则称其受**专性酸催化**；质子化是一个快速的**前置平衡**，慢步骤在共轭酸上进行。若溶液中*任何*布朗斯特酸 $\mathrm{HA}$ 都能*在决速步之中或同时*给出质子，则称其受**广义酸催化**；此时表观速率常数收集溶液中每种酸各一项，
$$
k_\text{obs} = k_0 + k_\mathrm{H}[\mathrm{H_3O^+}] + k_\mathrm{HA}[\mathrm{HA}] + \cdots,
$$
碱的情况类似（对 $\mathrm{OH^-}$ 的专性碱催化与对一切存在的碱的**广义碱催化**）。两者的实验区分靠**缓冲试验**：在恒定 pH 下用总浓度递增的缓冲液实验。专性催化下 $k_\text{obs}$ 不变——只有 $\mathrm{pH}$ 要紧；广义催化下 $k_\text{obs}$ 随缓冲液总浓度成正比上升，因为 $\mathrm{HA}$ 与 $\mathrm{A^-}$ 出现在速率方程中，尽管 pH 固定（见 [[general-chemistry-2/buffers-titrations]]）。
:::

::: proposition 布朗斯特催化定律 {#prop-bronsted}
对由一族相关酸（或碱）催化的一类反应，催化速率常数是酸的解离常数的幂——经验地（布龙斯特（Brønsted），1924）
$$
\log_{10} k_\mathrm{HA} = \log_{10} G + \alpha\, \log_{10} K_\mathrm{a},
$$
$G$ 为该反应系列的常数，$0 < \alpha < 1$。对速控步涉及质子转移的反应，$\alpha$ 通常落在 $0.3$ 到 $0.8$ 之间：$\alpha \rightarrow 1$ 表示过渡态中质子几乎已完全转移到到底物上（强酸型的过渡态），$\alpha \rightarrow 0$ 表示质子几乎未动。这一定律是一条**经验自由能关系**，不是机理：良好的直线支持质子转移进入过渡态，而 $\alpha$ 度量过渡态在该转移坐标上走到的位置。
:::

::: example 由两种酸求布龙斯特 α {#ex-bronsted}
某烯烃的广义酸催化溴化在相同温度下给出：$\mathrm{p}K_\mathrm{a} = 3.00$ 的酸 $k_\mathrm{HA} = 4.0\times10^{-4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，$\mathrm{p}K_\mathrm{a} = 5.00$ 的酸 $1.0\times10^{-5}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。估算 $\alpha$。
::: solution
由于 $\log K_\mathrm{a} = -\mathrm{p}K_\mathrm{a}$，
$$
\alpha = \frac{\Delta \log_{10} k_\mathrm{HA}}{\Delta \log_{10} K_\mathrm{a}} = \frac{\log_{10}\!\left(4.0\times10^{-4}\,/\,1.0\times10^{-5}\right)}{5.00 - 3.00} = \frac{\log_{10} 40}{2.00} = \frac{1.602}{2.00} = 0.80.
$$
$0.80$ 的 $\alpha$ 位于质子转移范围的顶端：过渡态已把几乎一个完整的质子转移到烯烃上。共轭酸弱两个 $\mathrm{p}K_\mathrm{a}$ 单位，速率就要付出 $40$ 倍的代价——当质子接近完全转移时，催化对催化剂的强度极其敏感。
:::
:::

::: example 酸催化酯水解的动力学论证：A-2 机理 {#ex-ester}
酸催化酯水解 $\mathrm{RCOOR' + H_2O \rightarrow RCOOH + R'OH}$ 在稀酸中服从 $v = k_\text{obs}[\text{酯}][\mathrm{H_3O^+}]$，同位素标记证明断裂的是**酰基–氧**键，而在浓酸中其 $k_\text{obs}$ 追随哈米特酸度函数 $h_0$ 而非 $[\mathrm{H_3O^+}]$。把这些证据组装成 A-2 机理。
::: solution
**第一步（快速前置平衡）：**羰基氧被质子化，$\mathrm{RCOOR' + H_3O^+ \rightleftharpoons RCO(H)OR'^{+} + H_2O}$，平衡常数 $K$。质子化把弱亲电试剂变成强亲电试剂。**第二步（慢，决速）：**一个水分子进攻质子化羰基碳——给出"A-2"中"2"的双分子步骤——此时酸催化剂仍在分子上。**第三至五步（快）：**质子转移把一个质子交给烷氧基，醇离去，去质子化**再生** $\mathrm{H_3O^+}$。以第二步为速控、水作溶剂折进常数，
$$
v = k_2 K\,[\text{酯}][\mathrm{H_3O^+}],
$$
正是实验速率方程：催化剂级数为 $1$，而催化剂不出现在净方程中。该机理解释了全部三个事实：对 $\mathrm{H_3O^+}$ 一级（前置平衡质子化）、酰基–氧断裂（水进攻的是羰基碳而非烷基碳）、以及高酸浓度下的 $h_0$ 行为（那里起作用的是质子化程度，而非化学计量的水合氢离子）。"A-2"读作：**A**cid（酸催化），决速步双分子（bimolecular）。
:::
:::

::: quiz
在 pH *相同*但缓冲液浓度递增的一系列溶液中跟踪蔗糖水解（$\mathrm{25\,^\circ C}$）。表观一级速率常数随缓冲液浓度稳定上升。这说明什么？
- [x] 反应受广义酸（或广义酸碱）催化：除 $\mathrm{H_3O^+}$ 外的缓冲组分进入了速率方程。
- [ ] 反应受专性 $\mathrm{H_3O^+}$ 催化，因为 pH 保持恒定。
- [ ] 缓冲液只是把离子强度改变为一个单位而充当催化剂。
- [ ] 数据有错；速率常数从不依赖缓冲液。
::: solution
专性催化预言 $k_\text{obs}$ 只依赖 pH，所以在恒定 pH 下不可能出现缓冲液浓度效应——上升恰恰证明 $\mathrm{HA}$ 和/或 $\mathrm{A^-}$ 在决速步中或决速步之前参与，即广义催化。（离子强度效应确实存在但很小，且遵循布龙斯特–比耶鲁姆关系；大的线性缓冲液依赖是机理性的。）$k_\text{obs}$ 对 $[\text{缓冲液}]$ 的斜率本身就是广义酸或广义碱系数。
:::
:::

## 酶动力学：典型的催化循环

酶是穿着蛋白质外衣的催化循环，而酶动力学的第一个定量定律就是任何两步循环的普遍定律。1913 年，莱奥诺尔·迈克尔斯（Michaelis）与莫德·门滕（Menten）在维克托·亨利（Henri）1902 年提议的基础上，解释了酶 $\mathrm{E}$ 如何可逆地结合底物 $\mathrm{S}$ 再将其转化。

::: proposition 米氏速率方程 {#prop-michaelis}
对机理
$$
\mathrm{E + S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ES} \xrightarrow{\;k_2\;} \mathrm{E + P}
$$
酶总量 $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}]$，产物生成的稳态速率为
$$
v = \frac{v_\text{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}, \qquad v_\text{max} = k_2[\mathrm{E}]_0, \qquad K_\mathrm{M} = \frac{k_{-1} + k_2}{k_1}.
$$
低底物时 $[\mathrm{S}] \ll K_\mathrm{M}$，方程退化为 $v = (v_\text{max}/K_\mathrm{M})[\mathrm{S}]$：对底物一级，比值 $v_\text{max}/K_\mathrm{M}$ 是 $\mathrm{E + S}$ 的有效二级速率常数。高底物时 $[\mathrm{S}] \gg K_\mathrm{M}$，速率饱和于 $v = v_\text{max}$：**对底物零级**，因为酶全部处于 $\mathrm{ES}$ 形态，瓶颈是转换而非捕获。$K_\mathrm{M}$ 是速率达半最大值时的底物浓度；当 $k_2 \ll k_{-1}$ 时它等于配合物的解离常数，度量结合亲和力。
:::

::: proof 稳态推导 {#proof-mm}
对中间体 $\mathrm{ES}$ 用稳态近似：其变化率为
$$
\frac{\mathrm{d}[\mathrm{ES}]}{\mathrm{d}t} = k_1[\mathrm{E}][\mathrm{S}] - k_{-1}[\mathrm{ES}] - k_2[\mathrm{ES}] \approx 0.
$$
用守恒律 $[\mathrm{E}] = [\mathrm{E}]_0 - [\mathrm{ES}]$ 消去自由酶：
$$
k_1\left([\mathrm{E}]_0 - [\mathrm{ES}]\right)[\mathrm{S}] = (k_{-1} + k_2)[\mathrm{ES}]
\qquad\Longrightarrow\qquad
[\mathrm{ES}] = \frac{[\mathrm{E}]_0[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]},
$$
其中 $K_\mathrm{M} = (k_{-1}+k_2)/k_1$ 按定义出现。产物只在最后一步以速率 $k_2[\mathrm{ES}]$ 出现，故
$$
v = k_2[\mathrm{ES}] = \frac{k_2[\mathrm{E}]_0\,[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]} = \frac{v_\text{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}. \qquad\blacksquare
$$
注意其结构：稳态将 $\mathrm{ES}$ 变成酶总量的一个固定*分数*，而整个速率方程就是该分数乘以转换频率 $k_2$。这是一切催化循环的模板。
:::

从数据提取 $v_\text{max}$ 与 $K_\mathrm{M}$ 的经典办法是**林威弗–伯克（Lineweaver–Burk）双倒数图**：对米氏方程取倒数，
$$
\frac{1}{v} = \frac{K_\mathrm{M}}{v_\text{max}}\cdot\frac{1}{[\mathrm{S}]} + \frac{1}{v_\text{max}},
$$
得到斜率为 $K_\mathrm{M}/v_\text{max}$、截距为 $1/v_\text{max}$ 的直线。它的弱点在统计上：实验误差存在于 $v$ 中，取倒数会放大*低 $[\mathrm{S}]$* 点的误差——而恰恰是这些点决定斜率——并赋予它们过大的权重。现代做法用非线性最小二乘直接拟合双曲线，或使用伊迪–霍夫斯蒂（Eadie–Hofstee）图 $v$ 对 $v/[\mathrm{S}]$，更诚实地分配误差。

::: warning 林威弗–伯克图是图像，不是估计量 {#warn-lb}
双倒数图是用来*看出*饱和的，不是用来*测量*它的。由于倒数变换重新加权了噪声，同一批数据由两家实验室分别用 $1/v$ 的线性回归和 $v$ 的非线性回归拟合，报告的 $K_\mathrm{M}$ 可能相差几十个百分点，而直线法的答案是有偏的那个。更糟的是，几个糟糕的低 $[\mathrm{S}]$ 点就能把直线扭成暗示底物抑制或双位点结合的样子，而它们并不存在。用这张图辨认饱和的形状；求数值请用非线性拟合（至少用伊迪–霍夫斯蒂图）。
:::

抑制类型由 $v_\text{max}$ 与 $K_\mathrm{M}$ 的移动方式来诊断。**竞争性**抑制剂在活性部位结合自由酶，可被底物竞争掉：$K_\mathrm{M}$ 被 $K_\mathrm{M}(1 + [\mathrm{I}]/K_\mathrm{I})$ 取代而 $v_\text{max}$ 不变——足够的底物可恢复全速。**反竞争性**抑制剂只结合 $\mathrm{ES}$：$v_\text{max}$ 与表观 $K_\mathrm{M}$ 同倍数下降，再多底物也救不回速率。**非竞争性**抑制剂两种形态都结合，在 $K_\mathrm{M}$ 大致不变时压低 $v_\text{max}$。这些图样是酶机理的诊断光谱，也正是下文 [[#algo-cycle]] 的饱和逻辑。

::: widget plot
f: vmax*x/(km + x); vmax*x/(km*(1 + i) + x)
x: 0, 10
y: 0, 2.2
sliders: vmax=1:0.2:2:0.1; km=1:0.2:3:0.1; i=0:0:3:0.5
labels: \text{无抑制剂}; \text{竞争性抑制剂 } [\mathrm{I}]/K_\mathrm{I} = i
caption: 米氏双曲线，$v/v_\text{max}$ 对以 $K_\mathrm{M}$ 为单位的 $[\mathrm{S}]$，$v_\text{max}$ 与 $K_\mathrm{M}$ 由滑块设定。第二条曲线加入强度 $i = [\mathrm{I}]/K_\mathrm{I}$ 的竞争性抑制剂：它到达*同一个*平台——$v_\text{max}$ 分毫不动——但需要 $1 + i$ 倍的底物才走到一半。把 $i$ 调大，看曲线沿 $x$ 轴拉长而不损失高度：竞争性抑制争夺的是 $K_\mathrm{M}$，永远不是 $v_\text{max}$。
:::

::: example 由两次测定求米氏参数 {#ex-mm-params}
某水解酶在固定酶量下给出：$[\mathrm{S}] = 0.050\ \mathrm{mol\,dm^{-3}}$ 时 $v = 6.67\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，$[\mathrm{S}] = 0.20\ \mathrm{mol\,dm^{-3}}$ 时 $1.33\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$。求 $v_\text{max}$ 与 $K_\mathrm{M}$。
::: solution
把两次测定取倒数作双倒数构造：$1/[\mathrm{S}] = 20.0$ 与 $5.00\ \mathrm{dm^{3}\,mol^{-1}}$，$1/v = 1.50\times10^{5}$ 与 $7.52\times10^{4}\ \mathrm{s\,dm^{-3}\,mol}$。$1/v$ 对 $1/[\mathrm{S}]$ 的斜率为
$$
\frac{K_\mathrm{M}}{v_\text{max}} = \frac{(1.50 - 0.752)\times10^{5}}{20.0 - 5.00} = 4.99\times10^{3}\ \mathrm{s},
$$
截距由第二点得出：$1/v_\text{max} = 7.52\times10^{4} - (4.99\times10^{3})(5.00) = 5.03\times10^{4}\ \mathrm{s\,dm^{-3}\,mol}$，故
$$
v_\text{max} = 2.0\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}, \qquad K_\mathrm{M} = (4.99\times10^{3})(2.0\times10^{-5}) = 0.10\ \mathrm{mol\,dm^{-3}}.
$$
与原始方程核对：$v_\text{max}[\mathrm{S}]/(K_\mathrm{M}+[\mathrm{S}])$ 在 $[\mathrm{S}] = 0.050$ 给出 $2.0\times10^{-5}\times 0.050/0.15 = 6.7\times10^{-6}$——正是测定值。两点定两参数，但只有两点时没有剩余数据来检验双曲线本身；实际工作要用许多 $[\mathrm{S}]$ 与非线性拟合，理由见 [[#warn-lb]]。
:::
:::

## 催化循环：两步循环的速率方程

上面一切都是同一个计算的化身。这里给出一般程序与一般结果。

::: algorithm 催化循环速率方程的写法 {#algo-cycle}
对催化剂 $\mathrm{Cat}$ 经两步循环把底物 $\mathrm{S}$ 变成产物 $\mathrm{P}$
$$
\mathrm{Cat + S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{Cat\!\cdot\!S} \xrightarrow{\;k_2\;} \mathrm{Cat + P}
$$
其速率方程可机械地导出：

1. **写出各步并找出静息态。**确定含催化剂的物种；这里是 $\mathrm{Cat}$ 与 $\mathrm{Cat\!\cdot\!S}$。
2. **写出催化剂守恒律。**催化剂从不被销毁，只被循环使用：
$$
[\mathrm{Cat}]_0 = [\mathrm{Cat}] + [\mathrm{Cat\!\cdot\!S}].
$$
正是这一个方程使催化速率方程具有饱和性。
3. **对结合中间体用稳态近似**：$\mathrm{d}[\mathrm{Cat\!\cdot\!S}]/\mathrm{d}t = k_1[\mathrm{Cat}][\mathrm{S}] - (k_{-1}+k_2)[\mathrm{Cat\!\cdot\!S}] \approx 0$。
4. **解线性方程组**（守恒律加稳态），求处于产生产物状态的催化剂分数：$[\mathrm{Cat\!\cdot\!S}] = [\mathrm{Cat}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$，其中 $K_\mathrm{M} = (k_{-1}+k_2)/k_1$。
5. **乘以该状态的转换频率**：$v = k_2[\mathrm{Cat\!\cdot\!S}] = \dfrac{k_2[\mathrm{Cat}]_0[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}$。
6. **检验极限。**$[\mathrm{S}] \to \infty$：$v \to k_2[\mathrm{Cat}]_0$，对催化剂一级、对底物零级（饱和）；$[\mathrm{S}] \to 0$：$v \to (k_1k_2/(k_{-1}+k_2))[\mathrm{Cat}]_0[\mathrm{S}]$，对两者皆一级。**转换频率**为 $v/[\mathrm{Cat}]_0$；**转换数**（TON）统计催化剂死亡前的转换次数。
:::

结果就是把 $[\mathrm{E}]_0 \rightarrow [\mathrm{Cat}]_0$ 的米氏方程：酶不是一门独立的学问，它们只是恰好把底物结合得很紧（$K_\mathrm{M}$ 在 $\mathrm{mmol\,dm^{-3}}$ 以下量级）、转换又很快的催化剂。同一套程序在第 2 步插入二聚静息态就再现了 [[#ex-cat-order]] 的半级；加入死端配合物就得到负级。催化剂一级是循环工作在饱和*以下*的*推论*，不是自然定律。

## 自催化：逻辑斯谛方程

::: definition 自催化 {#def-autocatalysis}
若反应的某个产物是它自己的催化剂，即 $\mathrm{A + C \rightarrow 2\,C}$（总反应 $\mathrm{A \rightarrow C}$），其中 $\mathrm{C}$ 既是催化剂*又是*产物，则反应是**自催化**的。速率方程 $v = k[\mathrm{A}][\mathrm{C}]$ 的分子里含有产物浓度，于是反应随进行而加速：除非加入痕量 $\mathrm{C}$，$t=0$ 时速率为零；速率升至极大，又只在反应物耗尽时才回落。自催化是自然界最便宜的开关——不需要蛋白质，不需要金属，只让产物自己干活——它既是你在实验课上遇到的滴定曲线的数学种子，也是本章最后一节振荡的数学种子。
:::

::: proposition 逻辑斯谛方程 {#prop-logistic}
对 $\mathrm{A + C \rightarrow 2\,C}$，$v = k[\mathrm{C}][\mathrm{A}]$，$[\mathrm{A}]_0 = a$、$[\mathrm{C}]_0 = c_0 > 0$，化学计量守恒 $[\mathrm{A}] + [\mathrm{C}] = a$ 把动力学化为单变量，
$$
\frac{\mathrm{d}[\mathrm{C}]}{\mathrm{d}t} = k\,[\mathrm{C}]\,(a - [\mathrm{C}]),
$$
其解为**逻辑斯谛函数**
$$
[\mathrm{C}](t) = \frac{a}{1 + \left(\dfrac{a - c_0}{c_0}\right) e^{-kat}}.
$$
曲线呈 S 形：$\mathrm{C}$ 稀缺时的**诱导期**，随后近指数增长，最后在 $a$ 处饱和。速率在 $[\mathrm{C}] = a/2$——一半反应物已转化——处最大，对应时刻 $t_\text{inf} = \ln\!\big((a-c_0)/c_0\big)/(ka)$；到达任意转化率 $f$（$\mathrm{A}$ 的转化分数，$[\mathrm{C}] = fa$）的时间由积分形式
$$
\frac{a - [\mathrm{C}]}{[\mathrm{C}]} = \frac{a - c_0}{c_0}\,e^{-kat}
$$
读出。
:::

::: proof 逻辑斯谛方程的积分 {#proof-logistic}
分离变量并部分分式分解，$\dfrac{1}{[\mathrm{C}](a-[\mathrm{C}])} = \dfrac{1}{a}\left(\dfrac{1}{[\mathrm{C}]} + \dfrac{1}{a-[\mathrm{C}]}\right)$：
$$
\int_{c_0}^{[\mathrm{C}]} \frac{\mathrm{d}[\mathrm{C}]}{[\mathrm{C}](a-[\mathrm{C}])} = kt
\qquad\Longrightarrow\qquad
\frac{1}{a}\ln\frac{[\mathrm{C}](a-c_0)}{c_0(a-[\mathrm{C}])} = kt.
$$
取指数并对 $[\mathrm{C}]$ 求解即得逻辑斯谛函数。速率 $k[\mathrm{C}](a-[\mathrm{C}])$ 是关于 $[\mathrm{C}]$ 的开口向下抛物线，最大值在 $[\mathrm{C}] = a/2$，这正是 $[\mathrm{C}](t)$ 的拐点（二阶导数 $\mathrm{d}^2[\mathrm{C}]/\mathrm{d}t^2 = k(a - 2[\mathrm{C}])\,\mathrm{d}[\mathrm{C}]/\mathrm{d}t$ 在此变号）。在积分方程中令 $[\mathrm{C}] = a/2$ 即得 $t_\text{inf} = \ln\!\big((a-c_0)/c_0\big)/(ka)$。$\blacksquare$
:::

::: widget odesolver
f: 0.5*y*(1 - y)
y0: 0.02
t: 0, 20
exact: 1/(1 + 49*exp(-0.5*t))
h: 0.1
caption: 逻辑斯谛自催化曲线 $y' = k\,y\,(a-y)$，$k = 0.50$、$a = 1.0$、种子 $y_0 = 0.02$：欧拉法、休恩法与 RK4 对精确逻辑斯谛函数。曲线先平（种子催化剂稀缺），在 $y = a/2 = 0.5$ 附近、$t = \ln 49/0.5 = 7.8$ 处穿过拐点上弯，再随反应物耗尽而变平。诱导期不是种子的假象：把种子减半，整条曲线只是右移 $\ln 2/(ka)$——*形状*不变，这正是自催化的指纹。
:::

::: example 自催化反应的计时 {#ex-logistic-timing}
某自催化反应 $a = 0.100\ \mathrm{mol\,dm^{-3}}$、$c_0 = 0.0020\ \mathrm{mol\,dm^{-3}}$、$k = 0.50\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，求最大速率时刻与转化 $90\,\%$ 所需时间。
::: solution
此处 $ka = 0.050\ \mathrm{s^{-1}}$，$(a-c_0)/c_0 = 0.098/0.0020 = 49$。最大速率出现在 $[\mathrm{C}] = a/2$：
$$
t_\text{inf} = \frac{\ln 49}{0.050} = \frac{3.892}{0.050} = 78\ \mathrm{s}.
$$
转化 $90\,\%$ 时 $[\mathrm{C}] = 0.0900\ \mathrm{mol\,dm^{-3}}$，故 $(a-[\mathrm{C}])/[\mathrm{C}] = 0.010/0.090 = 1/9$，由积分方程 $e^{-kat} = (1/9)/49 = 1/441$：
$$
t_{90} = \frac{\ln 441}{0.050} = \frac{6.089}{0.050} = 122\ \mathrm{s}.
$$
最后 $10\,\%$ 的反应物在 $122 - 78 = 44\ \mathrm{s}$ 内耗尽，而前 $90\,\%$ 用了 $122\ \mathrm{s}$：催化剂一旦充足，反应转瞬即终。数值积分 $\mathrm{d}[\mathrm{C}]/\mathrm{d}t = 0.50[\mathrm{C}](0.100-[\mathrm{C}])$ 复现 $[\mathrm{C}](122\ \mathrm{s}) = 0.0900\ \mathrm{mol\,dm^{-3}}$。
:::
:::

标准教学实例是**高锰酸钾–草酸盐滴定**：高锰酸钾在酸化溶液中氧化草酸盐，
$$
2\,\mathrm{MnO_4^-} + 5\,\mathrm{C_2O_4^{2-}} + 16\,\mathrm{H^+} \rightarrow 2\,\mathrm{Mn^{2+}} + 10\,\mathrm{CO_2} + 8\,\mathrm{H_2O},
$$
产物 $\mathrm{Mn^{2+}}$ 就是自催化剂。第一滴高锰酸钾褪色迟缓（数分钟），随后每一滴都更快（数秒），因为 $\mathrm{Mn^{2+}}$ 在积累——这是烧瓶里看得见的逻辑斯谛曲线，也是该滴定要加热、且第一滴要慢加的原因。这个化学是标准的本科实验，但并不轻忽：高锰酸钾是强氧化剂且有腐蚀性，草酸有毒，温热的酸化氧化剂溅出是真实的灼伤危险——这项工作与一切实践工作一样，必须在风险评估与指导之下、戴好护目镜进行。第二个例子离电网更近：**铅酸电池**放电时产物 $\mathrm{PbSO_4}$ 的沉积是自催化的——已有晶体的生长远快于新核的形成——这构成了放电曲线的特征形状以及称为硫酸盐化的失效模式（见 [[general-chemistry-2/electrochemistry-intro]]）。

## 化学振荡

::: warning 振荡不违反热力学第二定律 {#warn-oscillation}
一杯 BZ 溶液在颜色间循环，看上去像永动机，所以先把这件事说死。化学平衡**不可能**振荡：平衡时每个反应的亲和势为零，第二定律只允许向定态衰减。振荡反应是一个*被驱动*的体系：它消耗自由能（溴酸盐被还原，有机物被氧化）并以热的形式耗散，振荡正是它耗散的方式。当试剂耗尽、平衡到达，振荡就永远停止——在密闭烧杯里不过是几分钟到几小时的事。这种节律没有任何一点违反热力学；节律*本身就是*远离平衡的热力学。（普里高津（Prigogine）的洞见恰恰是：以耗散生序。）
:::

::: definition 化学振荡器与耗散结构 {#def-oscillator}
**化学振荡器**是在充分搅拌、等温、均相的容器中组成随时间周期性变化的反应体系。三个要素缺一不可：**(i) 远离平衡的条件**——自由能持续流过体系（在间歇反应器中直到试剂耗尽；在连续流搅拌罐式反应器中则可无限期）；**(ii) 非线性**——动力学必须含反馈，而自催化是经典来源，因为它使速率依赖浓度的高于一次的幂；**(iii) 一个被储备着的中间体**——某个物种（催化剂或抑制剂）浓度缓慢积累，然后把快反应接通或切断，提供把反馈变成节律而非失控所需的延迟。**耗散结构**指任何只在自由能耗散其中时存在的、随时间或空间变化的有序状态（振荡、行波、对流图样）。
:::

最简数学模型是**洛特卡–沃尔泰拉（Lotka–Volterra）**方案：两个竞争中间体 $\mathrm{X}$ 与 $\mathrm{Y}$ 由反应物供给、向产物泄出：$\mathrm{A \xrightarrow{\;k_1\;} X}$（速率 $ax$）、$\mathrm{X + Y \xrightarrow{\;k_2\;} 2X}$（速率 $bxy$，对 $\mathrm{X}$ 自催化）、$\mathrm{Y \xrightarrow{\;k_3\;} P}$（速率 $dy$）。

::: theorem 洛特卡–沃尔泰拉：中心与闭轨 {#thm-lv}
动力学
$$
\frac{\mathrm{d}x}{\mathrm{d}t} = ax - bxy, \qquad \frac{\mathrm{d}y}{\mathrm{d}t} = cxy - dy \qquad (a,b,c,d > 0)
$$
在内部只有一个定态——**中心** $(x^*, y^*) = (d/c,\; a/b)$——且第一象限内每条轨线都是绕它的**闭轨**。绕中心的小幅振荡周期为
$$
T = \frac{2\pi}{\sqrt{ad}}.
$$
:::

::: proof 守恒量与周期 {#proof-lv}
令两个速率均为零：$x(a - by) = 0$ 与 $y(cx - d) = 0$ 给出 $y^* = a/b$、$x^* = d/c$。至于轨道，考虑
$$
V(x,y) = cx - d\ln x + by - a\ln y .
$$
沿任意轨线，用链式法则并因式分解，
$$
\frac{\mathrm{d}V}{\mathrm{d}t} = \left(c - \frac{d}{x}\right)(ax - bxy) + \left(b - \frac{a}{y}\right)(cxy - dy) = (cx - d)(a - by) + (by - a)(cx - d) = 0.
$$
故 $V$ 守恒：轨线沿 $V$ 的等值线运行。又 $V \rightarrow \infty$（当 $x$ 或 $y$ 趋于 $0$ 或 $\infty$），且 $V$ 在 $(x^*, y^*)$ 有严格极小（其黑塞矩阵对角，元素为 $d/x^{*2} > 0$、$a/y^{*2} > 0$），所以穿过第一象限的每条等值线都是闭圈：该中心是*中性稳定*的，既不吸引也不排斥。至于周期，令 $x = x^* + u$、$y = y^* + v$ 并保留一阶项：$\dot{u} = -bx^* v$、$\dot{v} = cy^* u$，于是 $\ddot{u} = -bc\,x^* y^*\, u = -ad\,u$——一个角频率为 $\sqrt{ad}$ 的谐振子，周期 $2\pi/\sqrt{ad}$。$\blacksquare$
:::

::: widget phaseplane
f: 1.2*x - 0.6*x*y
g: 0.3*x*y - 0.8*y
x: 0, 6
y: 0, 5
points: 1, 1; 4, 2; 2.6, 2.1
caption: 洛特卡–沃尔泰拉相平面，$a = 1.2$、$b = 0.6$、$c = 0.3$、$d = 0.8$（单位分别为每单位时间与每单位浓度乘每单位时间）：中心位于 $(x^*, y^*) = (d/c,\, a/b) = (2.67,\, 2.00)$，三个起点描出三条大小不同的闭轨。点击即可添加更多——没有一条旋进或旋出，因为 $V = 0.3x - 0.8\ln x + 0.6y - 1.2\ln y$ 严格守恒。真实振荡器用单一的稳定**极限环**取代这些中性轨道；此处中性的轨道族是玩具模型完美守恒律的代价。
:::

::: example 洛特卡–沃尔泰拉轨道检验 {#ex-lv}
对 $a = 1.2\ \mathrm{s^{-1}}$、$b = 0.6\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$c = 0.3\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$d = 0.8\ \mathrm{s^{-1}}$ 的方案，定出中心并预言小幅振荡的周期；过 $(x,y) = (2.6, 2.1)$ 的轨道误差有多大？
::: solution
中心为 $(d/c, a/b) = (0.8/0.3,\ 1.2/0.6) = (2.67,\ 2.00)$，
$$
T = \frac{2\pi}{\sqrt{ad}} = \frac{2\pi}{\sqrt{1.2 \times 0.8}} = \frac{2\pi}{0.980} = 6.41\ \mathrm{s}.
$$
起点 $(2.6, 2.1)$ 距中心只有百分之几，小振荡公式应当几乎精确：对完整非线性方程组数值积分，得到相邻 $x$ 极大值间隔 $6.415\ \mathrm{s}$——误差 $0.05\,\%$。这种近乎吻合是洛特卡–沃尔泰拉的特性（它的轨道几乎等时）；真实的弛豫振荡器的周期则明显依赖振幅与速率常数。
:::
:::

玩具模型只在一件事上是诚实的：振荡需要自催化，还需要第二个物种把第一个看住。真实振荡器的骨架是**别洛乌索夫–扎鲍京斯基（BZ）反应**：溴酸钾在酸性溶液中氧化一种有机物（经典的是丙二酸 $\mathrm{CH_2(COOH)_2}$），由 $\mathrm{Ce^{3+}/Ce^{4+}}$ 催化，加几滴试亚铁灵指示剂——还原态为红色，氧化态为淡蓝。溶液在红蓝之间以几十秒的周期脉动；在薄层未搅拌的凝胶中，脉动变成行进的圆环与螺旋。其机理被菲尔德（Field）、克罗斯（Körös）与诺伊斯（Noyes）（1972–1974）提炼为三步的**俄勒冈器模型**，其中 $\mathrm{HBrO_2}$（亚溴酸）是自催化剂，铈是催化剂穿梭：

1. **溴离子控制的点火。**$\mathrm{BrO_3^- + Br^- + 2\,H^+ \rightarrow HBrO_2 + HOBr}$。只要溴离子还在，这就是 $\mathrm{HBrO_2}$ 的唯一来源——而溴离子同时是*抑制剂*，因为 $\mathrm{Br^-}$ 破坏 $\mathrm{HBrO_2}$ 比它积累更快。只要 $[\mathrm{Br^-}]$ 高于临界值，自催化剂就被压制，烧杯按兵不动。
2. **自催化爆发。**当溴离子降到阈值以下，$\mathrm{HBrO_2}$ 被溴酸盐氧化为 $\mathrm{BrO_2^{\bullet}}$，后者被 $\mathrm{Ce^{3+}}$ 还原回 $\mathrm{HBrO_2}$，同时把 $\mathrm{Ce^{3+}}$ 氧化为 $\mathrm{Ce^{4+}}$：每个 $\mathrm{HBrO_2}$ 生出两个，溴酸盐的氧化爆炸式进行——这就是**开关**。试亚铁灵被 $\mathrm{Ce^{4+}}$ 氧化，闪出蓝色。
3. **催化剂再生与制动复位。**$\mathrm{Ce^{4+}}$ 氧化有机底物（成 $\mathrm{CO_2}$ 与溴化产物），自身回到 $\mathrm{Ce^{3+}}$；溴化中间体水解把 $\mathrm{Br^-}$ 送回。溴离子爬过阈值，第一步恢复双重角色，$\mathrm{HBrO_2}$ 被摧毁，烧杯再次等待。

这个循环是一个**弛豫振荡器**：缓慢积累（溴离子恢复）被快速释放（自催化爆发）打断。在相平面上，这幅图像是轨线沿折叠的慢流形爬行，在折点处跳变，疾驰而过，再跳回——与神经细胞放电的几何完全相同。与洛特卡–沃尔泰拉的中性圈不同，弛豫振荡器有单一的稳定**极限环**：从任何地方出发的轨线都收敛到同一节律，这就是 BZ 烧杯如此可靠地保持节拍的原因。

::: history
第一个化学振荡器在被相信之前先被拒稿。1951 年，供职于苏联卫生部的鲍里斯·别洛乌索夫（Belousov）发现柠檬酸、溴酸盐与 $\mathrm{Ce^{3+}}$ 的酸性溶液会振荡变色——却被告知（审稿人，以及谢苗诺夫（Semyonov）本人）该结果违反热力学、形同造假；他的手稿被退回，未能发表。它只以 1959 年一篇会议摘要的形式露面，而根纳季·扎鲍京斯基（Zhabotinsky）自 1961 年起用丙二酸做的实验使它复活，但这一现象始终是一桩俄国奇闻，直到扎鲍京斯基的工作传到西方、伊利亚·普里高津（Prigogine）的**耗散结构**理论（1969）为振荡安上了热力学的家。菲尔德（Field）、克罗斯（Körös）与诺伊斯（Noyes）于 1972–1974 年发表俄勒冈器骨架，阿瑟·温弗里（Winfree）的螺旋波研究始于 1967 年，普里高津因不可逆过程热力学获 1977 年诺贝尔化学奖。催化动力学本身更老：迈克尔斯（Michaelis）与门滕（Menten）的酶定律（1913，承亨利（Henri）1902）和布龙斯特（Brønsted）的催化定律（1924）早已教会化学家从速率读出机理。
:::

::: quiz
一杯密闭的 BZ 溶液振荡约一小时后停止，稳定为单一颜色。对终态的正确描述是什么？
- [x] 试剂已耗尽，体系到达（或漂过）化学平衡；没有自由能可供耗散，振荡便不可能。
- [ ] 反应到达动态平衡，正反向振荡相互抵消。
- [ ] 催化剂被摧毁了，因为振荡不可能因别的原因停止。
- [ ] 体系冻结在洛特卡–沃尔泰拉中心，那里速率皆为零。
::: solution
振荡需要耗散：溴酸盐与丙二酸是燃料，当 $\Delta_\mathrm{r} G$ 不能再驱动循环，节律便死亡，混合液弛豫到平衡。平衡本身不可能振荡——第二定律禁止——所以"振荡的动态平衡"是自相矛盾。催化剂没有被消耗（那正是它之为催化剂的定义）；被消耗的是*自由能*。洛特卡–沃尔泰拉中心是玩具模型的属性，不是真实混合液的属性。
:::
:::

## 后续内容

[[#algo-cycle]] 的饱和定律与表面吸附控制反应的代数完全相同：多相催化是把位点换成分子的米氏故事，[[kinetics/surface-kinetics]] 将展开它。本章意义的自催化——产物造出更多自己——是 [[kinetics/chain-reactions]] 支化链的母题，那里增殖的物种是自由基，逻辑斯谛的制动被终止步骤取代，带来爆炸性的后果。通篇使用的稳态与前置平衡机器在 [[kinetics/reaction-mechanisms]] 中系统发展，布龙斯特定律背后的自由能关系在 [[kinetics/transition-state-theory]] 中安家。最后，振荡是通往图样的门户：行波、图灵结构与心跳的生物学，都住在动力学与输运的交汇处。

::: summary
- 催化剂先消耗后再生，出现在速率方程中，并压低决速序列的能垒；其级数（1、½、0、负）读出催化循环的静息态。
- 专性酸碱催化只依赖 pH；广义催化涉及一切存在的酸碱，靠恒定 pH 下的缓冲液浓度依赖来检出。布朗斯特定律 $\log k_\mathrm{HA} \propto \alpha \log K_\mathrm{a}$（$\alpha \approx 0.3$–$0.8$）度量过渡态中的质子转移。
- 米氏方程 $v = v_\text{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$ 是带催化剂守恒律的两步催化循环的稳态速率方程；饱和使反应对底物零级。
- 林威弗–伯克图用来看，不用来量：倒数变换破坏误差结构。抑制类型由 $v_\text{max}$ 与 $K_\mathrm{M}$ 的移动诊断。
- 自催化 $v = k[\mathrm{C}][\mathrm{A}]$ 积分得逻辑斯谛 S 曲线：有诱导期，最大速率在 $[\mathrm{C}] = [\mathrm{A}]_0/2$，最后是冲刺——$\mathrm{Mn^{2+}}$ 催化的高锰酸钾–草酸盐滴定是它的实验室肖像。
- 振荡需要非线性（自催化）、被储备的中间体、以及远离平衡的自由能持续耗散；它们在平衡处停止，从不违反第二定律。
- 洛特卡–沃尔泰拉在 $(d/c, a/b)$ 有中心与闭轨（$V$ 守恒），小振荡周期 $2\pi/\sqrt{ad}$；真实的振荡器如 BZ 反应是具有稳定极限环的弛豫振荡器，其骨架为三步俄勒冈器模型：$\mathrm{HBrO_2}$ 作自催化剂，溴离子作制动。
:::

## 练习

::: exercise 加倍定级数 {level=1 check="2"}
某催化反应服从 $v = k[\mathrm{Cat}]^{1/2}[\mathrm{S}]$。底物固定时催化剂浓度增至四倍，初始速率增大多少倍？（输入该倍数。）
::: solution
倍数为 $4^{1/2} = 2$。半级意味着速率响应催化剂的平方根：催化剂四倍，速率加倍——催化剂大部分停在无活性的二聚体里，只有单体干活。
:::
:::

::: exercise 米氏速率 {level=1 check="0.0003"}
某酶 $v_\text{max} = 4.0\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，$K_\mathrm{M} = 0.10\ \mathrm{mol\,dm^{-3}}$。问 $[\mathrm{S}] = 0.30\ \mathrm{mol\,dm^{-3}}$ 时的速率。（以 $\mathrm{mol\,dm^{-3}\,s^{-1}}$ 输入速率。）
::: solution
$v = v_\text{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}]) = 4.0\times10^{-4} \times 0.30/0.40 = 3.0\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$——$v_\text{max}$ 的四分之三，因为 $[\mathrm{S}]$ 是三个 $K_\mathrm{M}$。
:::
:::

::: exercise 自催化的极大值 {level=1 check="0.1"}
对自催化反应 $\mathrm{A + C \rightarrow 2\,C}$，$[\mathrm{A}]_0 = 0.20\ \mathrm{mol\,dm^{-3}}$、$[\mathrm{C}]_0 = 0.004\ \mathrm{mol\,dm^{-3}}$，催化剂浓度为多大时速率最大？（以 $\mathrm{mol\,dm^{-3}}$ 输入。）
::: solution
速率 $k[\mathrm{C}](a-[\mathrm{C}])$ 在 $[\mathrm{C}] = a/2 = 0.10\ \mathrm{mol\,dm^{-3}}$ 处最大，与 $k$ 和种子量无关——逻辑斯谛曲线的拐点。
:::
:::

::: exercise 布龙斯特 α {level=2 check="0.8"}
两种广义酸催化同一反应，在 $\mathrm{p}K_\mathrm{a} = 4.0$ 与 $6.0$ 时 $k$ 分别为 $8.0\times10^{-3}$ 与 $2.0\times10^{-4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。计算布龙斯特 $\alpha$。（输入 $\alpha$。）
::: solution
$\alpha = \dfrac{\log_{10}(8.0\times10^{-3}/2.0\times10^{-4})}{6.0 - 4.0} = \dfrac{\log_{10} 40}{2.0} = \dfrac{1.60}{2.0} = 0.80$。决速步中质子近乎完全转移，位于质子转移范围的顶端。
:::
:::

::: exercise 自催化转化 90 % 的时间 {level=2 check="122"}
对 $v = k[\mathrm{C}][\mathrm{A}]$，$a = 0.100\ \mathrm{mol\,dm^{-3}}$、$c_0 = 0.0020\ \mathrm{mol\,dm^{-3}}$、$k = 0.50\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，$\mathrm{A}$ 转化 $90\,\%$ 需要多久？（以秒输入时间。）
::: solution
由 $\dfrac{a - [\mathrm{C}]}{[\mathrm{C}]} = \dfrac{a-c_0}{c_0}e^{-kat}$，取 $[\mathrm{C}] = 0.090$：$e^{-kat} = (1/9)/49 = 1/441$，故 $t = \ln(441)/(0.050) = 6.089/0.050 = 122\ \mathrm{s}$。注意不对称性：拐点在 $78\ \mathrm{s}$，所以大部分反应发生在过半之后。
:::
:::

::: exercise 洛特卡–沃尔泰拉的中心与周期 {level=2 check="19.9"}
某洛特卡–沃尔泰拉方案 $a = 0.50\ \mathrm{s^{-1}}$、$b = 0.25\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$c = 0.40\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$d = 0.20\ \mathrm{s^{-1}}$。求中心 $(x^*, y^*)$ 与小幅振荡的周期。（以秒输入周期。）
::: solution
$(x^*, y^*) = (d/c,\ a/b) = (0.20/0.40,\ 0.50/0.25) = (0.50,\ 2.0)$（对应浓度单位），$T = 2\pi/\sqrt{ad} = 2\pi/\sqrt{0.50 \times 0.20} = 2\pi/0.3162 = 19.9\ \mathrm{s}$。周期只依赖供给速率 $a$ 与泄出速率 $d$——不依赖耦合常数 $b$ 与 $c$，后者只决定轨道大小。
:::
:::

::: exercise 由稳态导出竞争性抑制 {level=3}
在米氏机理上加入抑制剂平衡 $\mathrm{E + I \rightleftharpoons EI}$，常数 $K_\mathrm{I} = k_\text{off}/k_\text{on}$，设 $\mathrm{EI}$ 无催化活性，且 $\mathrm{E}$、$\mathrm{ES}$、$\mathrm{EI}$ 三者对总量 $[\mathrm{E}]_0$ 均处于稳态。导出
$$
v = \frac{v_\text{max}[\mathrm{S}]}{K_\mathrm{M}\left(1 + [\mathrm{I}]/K_\mathrm{I}\right) + [\mathrm{S}]}
$$
并证明 $v_\text{max}$ 不变而表观 $K_\mathrm{M}$ 增大为 $1 + [\mathrm{I}]/K_\mathrm{I}$ 倍。为什么饱和底物能恢复全速？
::: solution
守恒律现在是 $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}] + [\mathrm{EI}]$，抑制剂平衡（快速，或稳态——代数相同）给出 $[\mathrm{EI}] = [\mathrm{E}][\mathrm{I}]/K_\mathrm{I}$。$\mathrm{ES}$ 的稳态不变：$[\mathrm{ES}] = [\mathrm{E}][\mathrm{S}]/K_\mathrm{M}$。把两者代入守恒律，
$$
[\mathrm{E}]_0 = [\mathrm{E}]\left(1 + \frac{[\mathrm{I}]}{K_\mathrm{I}} + \frac{[\mathrm{S}]}{K_\mathrm{M}}\right)
\qquad\Longrightarrow\qquad
[\mathrm{ES}] = \frac{[\mathrm{E}]_0[\mathrm{S}]}{K_\mathrm{M}\left(1 + [\mathrm{I}]/K_\mathrm{I}\right) + [\mathrm{S}]},
$$
故 $v = k_2[\mathrm{ES}]$，且 $v_\text{max} = k_2[\mathrm{E}]_0$ 如前。当 $[\mathrm{S}] \rightarrow \infty$，因子 $1 + [\mathrm{I}]/K_\mathrm{I}$ 被 $[\mathrm{S}]/K_\mathrm{M}$ 淹没：底物与抑制剂争夺*同一个*状态（$\mathrm{E}$），所以底物洪流把抑制剂赶出去，每个酶分子都被驱回生产性循环。最大速率是循环本身的属性，竞争碰不到它——碰得到的只是 $K_\mathrm{M}$，入场的票价。
:::
:::

::: exercise 二聚静息态与半级 {level=3 check="3"}
某催化剂的静息态是二聚体：$2\,\mathrm{Cat} \rightleftharpoons \mathrm{Cat_2}$，$K = [\mathrm{Cat_2}]/[\mathrm{Cat}]^2 = 4.0\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}}$，只有单体进入对单体一级、底物饱和的循环 $v = k_2[\mathrm{Cat}]$。(a) 设二聚体占优，证明 $v = k_2\left([\mathrm{Cat}]_0/2K\right)^{1/2}$，从而反应对催化剂总量为半级。(b) $[\mathrm{Cat}]_0$ 增至九倍时速率增大多少倍？（输入该倍数。）
::: solution
(a) 催化剂主要在二聚体中，$[\mathrm{Cat}]_0 \approx 2[\mathrm{Cat_2}] = 2K[\mathrm{Cat}]^2$，故自由单体 $[\mathrm{Cat}] = \left([\mathrm{Cat}]_0/2K\right)^{1/2}$，$v = k_2\left([\mathrm{Cat}]_0/2K\right)^{1/2}$——半级，如 [[#ex-cat-order]] 所观察。(b) 又是平方根：九倍给出 $9^{1/2} = 3$ 倍。数值 $K$ 从*比值*中消去；只有级数留下来，这就是为什么级数是关于机理的陈述而非关于速率的陈述。（对假定的自洽检验：$[\mathrm{Cat}]_0 = 1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ 时单体约 $3.5\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，约占总量 $70\,\%$——那里二聚占优的公式只是勉强可用；严格的处理要精确解 $[\mathrm{Cat}]_0 = [\mathrm{Cat}] + 2K[\mathrm{Cat}]^2$；催化剂稀释时级数向 $1$ 漂移。）
:::
:::
