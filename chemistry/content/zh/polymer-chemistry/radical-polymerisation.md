把几毫克自由基引发剂溶于苯乙烯，加热到 $60\ ^\circ\mathrm{C}$，二十分钟后取一个样。只有约百分之一的单体反应了。然而已生成的聚合物却已完全长成：它的链聚合度超过一千，一小时后取样的链并不更长。每条这样的链在几秒之内出生、生长、死亡，它的一生刚好落在两次取样之间。这就是*链式增长*与[[polymer-chemistry/step-growth]]的逐步增长的区别。一小群活性中心——这里是浓度约 $10^{-8}\ \mathrm{mol\,dm^{-3}}$ 的自由基——以很高的速率加成单体，因此高聚物从第一刻就出现，并在整个反应期间与未反应单体共存。自由基聚合制造低密度聚乙烯、聚苯乙烯、聚氯乙烯、聚甲基丙烯酸甲酯、聚乙酸乙烯酯、大多数丙烯酸漆与胶黏剂、以及合成橡胶。它耐受水与杂质，并对范围极广的乙烯基单体都适用。这种组合使它成为化学工业中使用最广的反应之一。

自由基聚合的理论就是[[kinetics/chain-reactions]]的链反应动力学，外加一个转折。每一步增长使载体*变长*，于是动力学链的链长变成了分子的长度。本章建立基元步骤（引发及其效率、增长与终止）、稳态速率方程、动力学链长与聚合度，以及它们如何由引发剂、单体与温度控制。随后讨论链转移与 Mayo 方程，它们共同给出工业上对摩尔质量的控制；聚合的热力学与上限温度；动力学变得危险的凝胶效应；以及本体、溶液、悬浮、乳液四种聚合工艺——其中乳液聚合逃脱了速率与链长之间的常规权衡。

## 基元步骤

::: definition 自由基聚合的基元步骤 {#def-radical-steps}
对引发剂 $\mathrm{I}$ 与乙烯基单体 $\mathrm{M}$，设 $\mathrm{R\cdot}$ 为初级自由基、$\mathrm{M}_n\!\cdot$ 为含 $n$ 个单元的增长链：

- **引发。**分解 $\mathrm{I} \xrightarrow{k_\mathrm{d}} 2\,\mathrm{R\cdot}$，随后初级自由基加成到单体上，$\mathrm{R\cdot} + \mathrm{M} \rightarrow \mathrm{M}_1\!\cdot$。初级自由基中只有分数 $f$——**引发剂效率**（$0.3 \lesssim f \lesssim 0.8$）——能引发链。其余的在生成它们的那个溶剂笼内复合或反应。**引发速率**为
$$
R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}].
$$
- **增长。**$\mathrm{M}_n\!\cdot + \mathrm{M} \xrightarrow{k_\mathrm{p}} \mathrm{M}_{n+1}\!\cdot$，只有一个与 $n$ 无关的速率常数（又一次用到反应性相等原理），于是 $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]$，其中 $[\mathrm{M}\cdot] = \sum_n[\mathrm{M}_n\!\cdot]$ 是总自由基浓度。
- **终止。**两个增长自由基反应，经**偶合**（结合），$\mathrm{M}_n\!\cdot + \mathrm{M}_m\!\cdot \rightarrow \mathrm{M}_{n+m}$，或经**歧化**，转移一个氢原子，给出一个饱和链端和一个不饱和链端，$\mathrm{M}_n\!\cdot + \mathrm{M}_m\!\cdot \rightarrow \mathrm{M}_n\mathrm{H} + \mathrm{M}_m^{=}$。我们采用 IUPAC 约定：自由基的销毁速率为
$$
-\left(\frac{\mathrm{d}[\mathrm{M}\cdot]}{\mathrm{d}t}\right)_\mathrm{t} = 2k_\mathrm{t}[\mathrm{M}\cdot]^2,\qquad k_\mathrm{t} = k_\mathrm{tc} + k_\mathrm{td}.
$$
（有些教材把 2 吸收进 $k_\mathrm{t}$。查表用的 $k_\mathrm{t}$ 属于哪个约定，务必先确认。）
- **链转移。**增长自由基从一个分子 $\mathrm{XY}$（单体、溶剂、引发剂、聚合物或加入的试剂）上攫取一个原子（通常是 H），结束自身的增长并引发一个新自由基：$\mathrm{M}_n\!\cdot + \mathrm{XY} \xrightarrow{k_\mathrm{tr}} \mathrm{M}_n\mathrm{X} + \mathrm{Y\cdot}$，然后 $\mathrm{Y\cdot} + \mathrm{M} \rightarrow \mathrm{YM\cdot}$。
:::

**引发剂**是带有弱键、能在适当温度均裂的分子。最常见的是偶氮化合物，如 2,2′-偶氮二(2-甲基丙腈)（AIBN），它放出 $\mathrm{N_2}$ 生成两个 2-氰基-2-丙基自由基；以及过氧化物，如过氧化二苯甲酰，其 O–O 键（约 $140\ \mathrm{kJ\,mol^{-1}}$）断裂给出苯甲酰氧自由基。过硫酸盐与 $\mathrm{Fe^{2+}}$ 之类的氧化还原对可在水中于室温引发，光引发剂则能在光下几秒之内固化牙科充填材料与印刷油墨。引发剂用其**十小时半衰期温度**表征：AIBN 约 $65\ ^\circ\mathrm{C}$，过氧化二苯甲酰约 $73\ ^\circ\mathrm{C}$。有机过氧化物与偶氮引发剂在 GHS 中列为自反应物质或有机过氧化物（"爆炸弹"或"火焰"象形图）。它们须冷存，远离还原剂、金属与胺，并且只存实验室所需之量而不多，因为它们的分解放热且会自加速。

**引发剂效率** $f$ 是一个笼效应。均裂生成的两个自由基被关在溶剂或单体分子的笼中约 $10^{-10}$ s。在这段时间里它们可能复合，或彼此反应生成惰性产物（AIBN 会这样产生一些四甲基丁二腈），然后其中一个才逃脱、遇到一个单体。介质变黏时效率下降，这在高转化率下很重要。

::: example 聚合温度下 AIBN 的半衰期 {#ex-aibn}
AIBN 在 $65\ ^\circ\mathrm{C}$ 下的半衰期为十小时，其分解的活化能约 $130\ \mathrm{kJ\,mol^{-1}}$。求 $65\ ^\circ\mathrm{C}$ 与 $60\ ^\circ\mathrm{C}$ 下的 $k_\mathrm{d}$，以及 $60\ ^\circ\mathrm{C}$ 下的半衰期。在 $60\ ^\circ\mathrm{C}$ 进行 2 小时的聚合，消耗的引发剂占多大分数？
::: solution
分解是一级反应，所以 $t_{1/2} = \ln 2/k_\mathrm{d}$，于是
$$
k_\mathrm{d}(65\ ^\circ\mathrm{C}) = \frac{0.6931}{3.60\times10^{4}\ \mathrm{s}} = 1.93\times10^{-5}\ \mathrm{s^{-1}} .
$$
阿伦尼乌斯方程在 $T_1 = 338.15\ \mathrm{K}$ 与 $T_2 = 333.15\ \mathrm{K}$ 之间给出
$$
\frac{k_\mathrm{d}(T_2)}{k_\mathrm{d}(T_1)} = \exp\!\left[-\frac{E_\mathrm{a}}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)\right]
= \exp\!\left[-\frac{130\,000}{8.314}\,(4.438\times10^{-5})\right] = e^{-0.694} = 0.500,
$$
于是 $k_\mathrm{d}(60\ ^\circ\mathrm{C}) = 9.6\times10^{-6}\ \mathrm{s^{-1}}$，$t_{1/2} = 7.2\times10^{4}\ \mathrm{s} = 20\ \mathrm{h}$。五度之差使速率减半，对一个活化能如此之高的断键步骤正合预期。两小时（$7200\ \mathrm{s}$）内消耗的分数为 $1 - e^{-k_\mathrm{d}t} = 1 - e^{-0.0693} = 0.067$，约 7%。在典型的聚合期间引发剂浓度几乎不变，这就是后文可把它当作常数的原因（[[#eq-dead-end]]的死端情形除外，那里不能这样处理）。
:::
:::

## 稳态动力学

增长自由基是典型的活性中间体。它们生成得慢、消灭得快，被维持在低而恒定的浓度。其浓度在几秒之内即达稳定（一个自由基大约只存活一秒），而单体则在几小时里被消耗。对*总*自由基浓度应用[[kinetics/reaction-mechanisms]]的稳态近似，便得到这一理论的核心结果。

::: proposition 自由基聚合的速率 {#prop-rate}
引发速率 $R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}]$，增长速率常数 $k_\mathrm{p}$，双分子终止为 $2k_\mathrm{t}[\mathrm{M}\cdot]^2$，在稳态下并忽略引发所消耗的单体（长链近似），
$$
[\mathrm{M}\cdot] = \left(\frac{fk_\mathrm{d}[\mathrm{I}]}{k_\mathrm{t}}\right)^{1/2},
\qquad
R_\mathrm{p} = -\frac{\mathrm{d}[\mathrm{M}]}{\mathrm{d}t} = k_\mathrm{p}\left(\frac{fk_\mathrm{d}[\mathrm{I}]}{k_\mathrm{t}}\right)^{1/2}[\mathrm{M}] .
$$ {#eq-rp}
速率对单体是一级，对引发剂是**半级**。
:::

::: proof
自由基由引发产生、由终止消灭。增长把一个自由基变成另一个自由基，不改变 $[\mathrm{M}\cdot]$；若新自由基立即再引发，链转移也不改变它。于是
$$
\frac{\mathrm{d}[\mathrm{M}\cdot]}{\mathrm{d}t} = 2fk_\mathrm{d}[\mathrm{I}] - 2k_\mathrm{t}[\mathrm{M}\cdot]^2 .
$$
令其为零得 $[\mathrm{M}\cdot]^2 = fk_\mathrm{d}[\mathrm{I}]/k_\mathrm{t}$。单体被增长消耗，还每条链一次地被引发消耗，所以 $-\mathrm{d}[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot] + R_\mathrm{i}$。对长链，第二项可忽略：它比第一项小一个动力学链长的因子，而后者是几百到几千。代入稳态自由基浓度即得[[#eq-rp]]。$\blacksquare$
:::

对引发剂的半级数是终止发生在*两个*自由基之间的指纹。引发剂加倍使自由基诞生的速率加倍。因为它们成对地死亡，稳态数目只升 $\sqrt{2}$ 倍。苯乙烯、甲基丙烯酸甲酯与乙酸乙烯酯在低转化率下的实验紧密证实了半级数，这一符合是该机理最初的奠基性检验之一。偏离也携带信息。级数高于 $\tfrac12$ 表明存在初级自由基或杂质参与的终止（一级自由基损失）。对单体的级数高于 1 表明引发剂效率依赖于 $[\mathrm{M}]$。

### 链长与聚合度

::: definition 动力学链长 {#def-kinetic-chain}
**动力学链长** $\nu$ 是每个引发链的自由基所消耗的单体分子平均数：
$$
\nu = \frac{R_\mathrm{p}}{R_\mathrm{i}} = \frac{k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]}{2k_\mathrm{t}[\mathrm{M}\cdot]^2}
= \frac{k_\mathrm{p}[\mathrm{M}]}{2(fk_\mathrm{d}k_\mathrm{t}[\mathrm{I}])^{1/2}}
= \frac{k_\mathrm{p}^2[\mathrm{M}]^2}{2k_\mathrm{t}R_\mathrm{p}} .
$$ {#eq-nu}
:::

动力学链长与死聚合物的聚合度不完全是两回事。若两条增长链**偶合**，一个死分子含两条动力学链，于是 $\bar{X}_\mathrm{n} = 2\nu$。若**歧化**，每条动力学链成为一个分子，于是 $\bar{X}_\mathrm{n} = \nu$。若终止事件中歧化占分数 $\delta$，则每条动力学链产生的死分子数为 $(1 + \delta)/2$，且
$$
\bar{X}_\mathrm{n} = \frac{2\nu}{1 + \delta} .
$$ {#eq-xn-delta}
苯乙烯几乎完全经偶合终止。聚甲基丙烯酸甲酯的叔自由基在甲基与主链 $\mathrm{CH_2}$ 上有五个 $\beta$-氢，主要在较高温度下经歧化终止。终止方式还决定*分布*。歧化给出[[polymer-chemistry/polymer-structure#def-flory]]的最可几分布、$Đ \to 2$，因为每一步以概率 $p = R_\mathrm{p}/(R_\mathrm{p} + R_\mathrm{t})$ "继续"，与逐步增长中完全一样。偶合则随机地把这样两条链接在一起，把分布收窄到 $Đ \to 1.5$。

[[#eq-nu]]包含着自由基聚合的基本困境。凡是提高速率的东西，如多加引发剂或升温，都会*缩短*链，因为更多的自由基意味着更多的自由基–自由基相遇。固定 $[\mathrm{M}]$ 时，$\nu \propto 1/R_\mathrm{p}$。对给定的单体和常规工艺，速率快与链长二者不可兼得。本章末尾的乳液聚合通过把自由基隔开绕开了这一点。

::: widget plot
f: sqrt(x); 1/sqrt(x)
x: 0.05, 4
y: 0, 4.5
labels: R_\mathrm{p}/R_{\mathrm{p},0}; \nu/\nu_0
points: 1, 1
caption: 聚合速率与动力学链长，各以其在参考引发剂浓度 $[\mathrm{I}]_0$ 处的值为基准，随 $[\mathrm{I}]/[\mathrm{I}]_0$ 的变化（单体浓度与温度恒定；[[#prop-rate]]与[[#def-kinetic-chain]]）。速率按 $[\mathrm{I}]^{1/2}$ 上升，链长按 $[\mathrm{I}]^{-1/2}$ 下降，所以二者之积固定：四倍引发剂给两倍速率、一半链长。标记的点是参考值。这就是常规自由基聚合的速率–链长困境。
:::

### 速率常数的测定

稳态速率只给出组合 $k_\mathrm{p}/k_\mathrm{t}^{1/2}$。分别测量 $R_\mathrm{p}$ 与 $R_\mathrm{i}$ 得到 $\nu$，连同 $k_\mathrm{p}^2/k_\mathrm{t}$（习题 7 就是这么做的）。把 $k_\mathrm{p}$ 与 $k_\mathrm{t}$ 分开需要非稳态实验。历史上这是转扇法。如今是**脉冲激光聚合–尺寸排阻色谱（PLP–SEC）**：以已知间隔 $t_0$ 的激光脉冲产生一阵阵自由基，熬过一个间隔的链长到 $L_1 = k_\mathrm{p}[\mathrm{M}]t_0$，摩尔质量分布在 $L_1$ 处的拐点直接给出 $k_\mathrm{p}$。IUPAC 工作组已发表由 PLP–SEC 得到的基准值。苯乙烯：$k_\mathrm{p} = 10^{7.63}\exp(-32.5\ \mathrm{kJ\,mol^{-1}}/RT)\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，在 $50\ ^\circ\mathrm{C}$ 为 $238$、$60\ ^\circ\mathrm{C}$ 为 $341$。甲基丙烯酸甲酯：$k_\mathrm{p} = 10^{6.43}\exp(-22.4\ \mathrm{kJ\,mol^{-1}}/RT)$，$50\ ^\circ\mathrm{C}$ 约 $650$。终止速率常数接近扩散极限，低转化率下为 $10^{7}$–$10^{8}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。它们依赖链长与黏度，因为限制终止的是两个自由基链端彼此找到的快慢，而不是成键的化学。

::: example 苯乙烯的本体聚合 {#ex-styrene}
苯乙烯在本体中于 $60\ ^\circ\mathrm{C}$ 聚合（由密度 $0.869\ \mathrm{g\,cm^{-3}}$ 得 $[\mathrm{M}] = 8.34\ \mathrm{mol\,dm^{-3}}$），$[\mathrm{AIBN}] = 0.010\ \mathrm{mol\,dm^{-3}}$，$k_\mathrm{d} = 9.6\times10^{-6}\ \mathrm{s^{-1}}$，$f = 0.60$。取 $k_\mathrm{p} = 341$、$k_\mathrm{t} = 1.0\times10^{8}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（低转化率的代表性值），并假设完全偶合终止。计算 $R_\mathrm{i}$、$[\mathrm{M}\cdot]$、$R_\mathrm{p}$、$\nu$、$\bar{X}_\mathrm{n}$ 与 $\bar{M}_\mathrm{n}$，以及达到 1% 转化率所需的时间。
::: solution
引发：
$$
R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}] = 2(0.60)(9.6\times10^{-6})(0.010) = 1.15\times10^{-7}\ \mathrm{mol\,dm^{-3}\,s^{-1}} .
$$
自由基浓度：
$$
[\mathrm{M}\cdot] = \left(\frac{(0.60)(9.6\times10^{-6})(0.010)}{1.0\times10^{8}}\right)^{1/2} = (5.76\times10^{-16})^{1/2} = 2.4\times10^{-8}\ \mathrm{mol\,dm^{-3}} .
$$
速率：
$$
R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot] = (341)(8.34)(2.4\times10^{-8}) = 6.8\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}} .
$$
动力学链长 $\nu = R_\mathrm{p}/R_\mathrm{i} = 6.83\times10^{-5}/1.15\times10^{-7} = 592$。偶合终止下 $\bar{X}_\mathrm{n} = 2\nu = 1.18\times10^{3}$，$\bar{M}_\mathrm{n} = 1184 \times 104.15 = 1.2\times10^{5}\ \mathrm{g\,mol^{-1}}$。

1% 的转化率消耗 $0.0834\ \mathrm{mol\,dm^{-3}}$，需要 $0.0834/6.83\times10^{-5} = 1.2\times10^{3}\ \mathrm{s} \approx 20\ \mathrm{min}$，正是本章开头的那个观察。自由基的浓度只有 24 纳摩尔，约为单体的十亿分之三，每个自由基存活 $\tau = 1/(2k_\mathrm{t}[\mathrm{M}\cdot]) = 0.21\ \mathrm{s}$，在此期间加上约 $600$ 个单体。数据只给到两三位有效数字，结果也取两位。
:::
:::

### 温度

每个速率常数都服从阿伦尼乌斯定律，于是[[#eq-rp]]与[[#eq-nu]]给出复合活化能：
$$
E_{R_\mathrm{p}} = E_\mathrm{p} + \tfrac12E_\mathrm{d} - \tfrac12E_\mathrm{t},
\qquad
E_{\bar{X}_\mathrm{n}} = E_\mathrm{p} - \tfrac12E_\mathrm{d} - \tfrac12E_\mathrm{t} .
$$
代入 $E_\mathrm{d} \approx 130$、$E_\mathrm{p} \approx 20$–$35$、$E_\mathrm{t} \approx 5$–$10\ \mathrm{kJ\,mol^{-1}}$，速率的活化能约 $80$–$95\ \mathrm{kJ\,mol^{-1}}$（大约每 $10\ \mathrm{K}$ 变为两倍或三倍），而 $\bar{X}_\mathrm{n}$ 有约 $-35\ \mathrm{kJ\,mol^{-1}}$ 的*负*活化能。热引发聚合温度越高越快、链越短。光引发则 $E_\mathrm{d} \approx 0$，改变了这一平衡：那时速率与链长都随温度缓慢上升。

## 链转移与 Mayo 方程

增长链的结束并不总是因为遇到另一个自由基。它可以从一个分子上攫取一个原子，结束自身的生长并引发一条新链。动力学链继续，因为自由基数目未变，但*分子*已经完成。因此只要新自由基迅速再引发，转移就降低 $\bar{X}_\mathrm{n}$ 而不改变 $R_\mathrm{p}$。

::: proposition Mayo 方程 {#prop-mayo}
若链的结束来自终止（歧化分数 $\delta$）以及向单体、向引发剂、向溶剂或转移剂 $\mathrm{S}$ 的转移，转移常数为 $C_\mathrm{X} = k_{\mathrm{tr,X}}/k_\mathrm{p}$，且新自由基迅速再引发，则
$$
\frac{1}{\bar{X}_\mathrm{n}} = \frac{1}{(\bar{X}_\mathrm{n})_0} + C_\mathrm{M} + C_\mathrm{I}\frac{[\mathrm{I}]}{[\mathrm{M}]} + C_\mathrm{S}\frac{[\mathrm{S}]}{[\mathrm{M}]},
\qquad
\frac{1}{(\bar{X}_\mathrm{n})_0} = \frac{(1+\delta)k_\mathrm{t}R_\mathrm{p}}{k_\mathrm{p}^2[\mathrm{M}]^2},
$$ {#eq-mayo}
其中 $(\bar{X}_\mathrm{n})_0$ 是仅有终止时应有的聚合度。
:::

::: proof
$\bar{X}_\mathrm{n}$ 是单体进入聚合物的速率与死聚合物分子的生成速率之比。单体以 $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]$ 消耗。死分子由终止生成，速率 $(1+\delta)k_\mathrm{t}[\mathrm{M}\cdot]^2$：自由基以 $2k_\mathrm{t}[\mathrm{M}\cdot]^2$ 消灭，偶合时每两个自由基给一个死分子、歧化时每两个自由基给两个，所以该速率为 $\tfrac12(1+\delta)\cdot2k_\mathrm{t}[\mathrm{M}\cdot]^2$。死分子也由每个转移反应生成，速率 $k_{\mathrm{tr,X}}[\mathrm{M}\cdot][\mathrm{X}]$。于是
$$
\frac{1}{\bar{X}_\mathrm{n}} = \frac{(1+\delta)k_\mathrm{t}[\mathrm{M}\cdot]^2 + \sum_\mathrm{X} k_{\mathrm{tr,X}}[\mathrm{M}\cdot][\mathrm{X}]}{k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]}
= \frac{(1+\delta)k_\mathrm{t}[\mathrm{M}\cdot]}{k_\mathrm{p}[\mathrm{M}]} + \sum_\mathrm{X}\frac{k_{\mathrm{tr,X}}}{k_\mathrm{p}}\frac{[\mathrm{X}]}{[\mathrm{M}]} .
$$
第一项里把 $[\mathrm{M}\cdot]$ 换成 $R_\mathrm{p}/(k_\mathrm{p}[\mathrm{M}])$；对 $\mathrm{X} = \mathrm{M}$，比值 $[\mathrm{X}]/[\mathrm{M}]$ 为 1。这就是[[#eq-mayo]]。$\delta = 0$ 时第一项为 $1/(2\nu)$，$\delta = 1$ 时为 $1/\nu$，与[[#eq-xn-delta]]一致。由于转移不改变 $[\mathrm{M}\cdot]$，$R_\mathrm{p}$ 不受影响。$\blacksquare$
:::

在恒定 $R_\mathrm{p}$ 下以 $1/\bar{X}_\mathrm{n}$ 对 $[\mathrm{S}]/[\mathrm{M}]$ 作图是斜率为 $C_\mathrm{S}$ 的直线。这一 **Mayo 作图**是测量转移常数的标准方法。转移常数的范围极大（苯乙烯在 $60\ ^\circ\mathrm{C}$ 的近似值，取自 *Polymer Handbook*）：

| 转移剂 | $C_\mathrm{S}$（苯乙烯，$60\ ^\circ\mathrm{C}$） |
|---|---|
| 苯 | $\sim 2\times10^{-6}$ |
| 甲苯 | $\sim 1\times10^{-5}$ |
| 四氯化碳 | $\sim 9\times10^{-3}$ |
| 四溴化碳 | $\sim 2$ |
| 十二烷-1-硫醇 | $\sim 15$–$20$ |

这一顺序追随所断键的强度与所成自由基的稳定性：芳香 C–H（强）> 苄位 C–H > C–Cl > C–Br > S–H（弱）。硫醇的 S–H 键弱，是工业上的**链转移剂**（"调节剂"或"改性剂"）。少量即可设定丁苯橡胶与丙烯酸胶乳的摩尔质量。$\mathrm{CCl_4}$ 产生的三氯甲基自由基与硫基自由基 $\mathrm{RS\cdot}$ 迅速加成到单体上，所以速率不受影响。若转移剂的自由基稳定到无法再引发（烯丙基自由基，或受阻酚产生的苯氧自由基），它反而会*阻缓*或*抑制*聚合。抑制剂干的正是这一工作，如商品丙烯酸酯储存时加入的 4-甲氧基苯酚（MEHQ）。氧气也抑制自由基聚合，因为它形成的过氧自由基增长能力很差。

**向单体转移**为链长设了一个任何改变引发剂的做法都掀不动的天花板：$\bar{X}_\mathrm{n} \le 1/C_\mathrm{M}$。苯乙烯的 $C_\mathrm{M} \approx 6\times10^{-5}$，上限约 $17\,000$。氯乙烯的 $C_\mathrm{M} \approx 1\times10^{-3}$，所以聚氯乙烯的聚合度——约 $1000$——几乎完全由向单体转移决定，并依赖温度（温度控制 $C_\mathrm{M}$）而不是引发剂。**向聚合物转移**在链主链上产生自由基，于是产生支化。乙烯聚合中的分子内"回咬"给出低密度聚乙烯的短丁基与乙基支链，破坏其结晶性。

::: widget plot
f: 1/(1/xn0 + c*x)
x: 0, 0.5
sliders: xn0=1200:200:5000:100; c=0.009:0.001:0.05:0.001
labels: \bar{X}_\mathrm{n}
caption: Mayo 方程[[#eq-mayo]]的 $\bar{X}_\mathrm{n}$ 随转移剂与单体之比 $[\mathrm{S}]/[\mathrm{M}]$ 的变化，参数为仅终止时的 $(\bar{X}_\mathrm{n})_0$（滑块 $xn0$）与转移常数 $C_\mathrm{S}$（滑块 $c$）。默认值 $C_\mathrm{S} = 0.009$ 是苯乙烯体系的 $\mathrm{CCl_4}$，在 $[\mathrm{S}]/[\mathrm{M}] \approx 0.09$ 处把 $\bar{X}_\mathrm{n} = 1200$ 减半（[[#ex-transfer]]）。增大 $(\bar{X}_\mathrm{n})_0$，曲线起点更高但落到同样的转移限制值：一旦 $C_\mathrm{S}[\mathrm{S}]/[\mathrm{M}] \gg 1/(\bar{X}_\mathrm{n})_0$，链长就由转移剂单独决定。换成 $C_\mathrm{S} \approx 15$ 的硫醇，只需千分之一以下的浓度比就能办同样的事。
:::

::: example 用转移剂调节摩尔质量 {#ex-transfer}
对[[#ex-styrene]]的聚合（无转移剂时 $\bar{X}_\mathrm{n} = 1184$），(a) 四氯化碳（$C_\mathrm{S} = 0.0090$）浓度为多少能把 $\bar{X}_\mathrm{n}$ 减半？(b) 换成十二烷-1-硫醇（$C_\mathrm{S} = 15$）又需多少？忽略加入试剂引起的 $[\mathrm{M}]$ 变化，忽略向单体与引发剂的转移。
::: solution
$\bar{X}_\mathrm{n}$ 减半意味着 $1/\bar{X}_\mathrm{n}$ 加倍，所以转移项必须等于终止项：
$$
C_\mathrm{S}\frac{[\mathrm{S}]}{[\mathrm{M}]} = \frac{1}{1184} = 8.45\times10^{-4} .
$$
(a) $[\mathrm{S}]/[\mathrm{M}] = 8.45\times10^{-4}/0.0090 = 0.094$，于是 $[\mathrm{CCl_4}] = 0.094\times8.34 = 0.78\ \mathrm{mol\,dm^{-3}}$。这是溶剂级的浓度，也会明显稀释单体。

(b) $[\mathrm{S}]/[\mathrm{M}] = 8.45\times10^{-4}/15 = 5.6\times10^{-5}$，于是 $[\mathrm{RSH}] = 4.7\times10^{-4}\ \mathrm{mol\,dm^{-3}}$，即几百 ppm。这正是工业调节剂选硫醇而不选卤代烃的原因。由于 $C_\mathrm{S} \gg 1$，硫醇比单体消耗得更快，所以实际上一边连续加料、一边在批次过程中保持 $[\mathrm{S}]/[\mathrm{M}]$ 不变。
:::
:::

## 热力学：上限温度

增长是可逆的：$\mathrm{M}_n\!\cdot + \mathrm{M} \rightleftharpoons \mathrm{M}_{n+1}\!\cdot$。把 $\pi$ 键变成 $\sigma$ 键使乙烯基单体的聚合放热，无位阻单体的 $\Delta_\mathrm{p}H$ 约 $-70$ 到 $-100\ \mathrm{kJ\,mol^{-1}}$。但把自由分子拴进链条要损失平动熵，所以 $\Delta_\mathrm{p}S$ 约 $-100$ 到 $-125\ \mathrm{J\,K^{-1}\,mol^{-1}}$。温度足够高时熵项获胜，聚合物就解拉链。

::: proposition 上限温度与平衡单体浓度 {#prop-ceiling}
对与解聚平衡的增长，给定 $\Delta_\mathrm{p}H$ 与 $\Delta_\mathrm{p}S^\circ$（标准态为 $1\ \mathrm{mol\,dm^{-3}}$ 的单体、长链），
$$
\ln\frac{[\mathrm{M}]_\mathrm{eq}}{c^\circ} = \frac{\Delta_\mathrm{p}H}{RT} - \frac{\Delta_\mathrm{p}S^\circ}{R},
\qquad
T_\mathrm{c} = \frac{\Delta_\mathrm{p}H}{\Delta_\mathrm{p}S^\circ + R\ln([\mathrm{M}]_0/c^\circ)} .
$$ {#eq-ceiling}
超过**上限温度** $T_\mathrm{c}$，浓度为 $[\mathrm{M}]_0$ 的单体便不能转化为高聚物。
:::

::: proof
对长链，向 $\mathrm{M}_n\!\cdot$ 加一个单元得 $\mathrm{M}_{n+1}\!\cdot$，化学上是同一种物种，所以平衡常数只含单体：$K = k_\mathrm{p}/k_\mathrm{dp} = c^\circ/[\mathrm{M}]_\mathrm{eq}$。由 $\Delta_\mathrm{p}G^\circ = -RT\ln K = \Delta_\mathrm{p}H - T\Delta_\mathrm{p}S^\circ$，
$$
-\ln\frac{[\mathrm{M}]_\mathrm{eq}}{c^\circ} = -\frac{\Delta_\mathrm{p}H}{RT} + \frac{\Delta_\mathrm{p}S^\circ}{R},
$$
整理即得第一个结果。从初始浓度 $[\mathrm{M}]_0$ 出发，聚合只可能在 $[\mathrm{M}]_\mathrm{eq} < [\mathrm{M}]_0$ 时进行。令 $[\mathrm{M}]_\mathrm{eq} = [\mathrm{M}]_0$ 并对 $T$ 求解即得 $T_\mathrm{c}$。$\Delta_\mathrm{p}H$ 与分母皆为负，所以 $T_\mathrm{c}$ 为正。稀释单体使 $R\ln([\mathrm{M}]_0/c^\circ)$ 更负，$T_\mathrm{c}$ 随之降低。$\blacksquare$
:::

多数单体的上限远高于任何聚合温度，增长可当作不可逆。空间拥挤的单体是例外。聚(α-甲基苯乙烯)每个主链碳同时带一个甲基和一个苯基，链内的张力把 $\Delta_\mathrm{p}H$ 降到约 $-35\ \mathrm{kJ\,mol^{-1}}$。它的本体上限温度只有约 $61\ ^\circ\mathrm{C}$。聚甲基丙烯酸甲酯（$\Delta_\mathrm{p}H \approx -56\ \mathrm{kJ\,mol^{-1}}$）在远高于 $300\ ^\circ\mathrm{C}$ 加热时干净地解聚为单体，这使 PMMA 废料可以回收为单体。聚乙烯没有叔自由基使解拉链容易进行，转而经随机断链降解。上限温度也是醛类难以聚合（打开 C=O 键的 $\Delta_\mathrm{p}H$ 很小）、以及聚氧亚甲基必须封端以阻止解拉链的原因。

::: example α-甲基苯乙烯的上限温度 {#ex-ceiling}
取 α-甲基苯乙烯 $\mathrm{C_9H_{10}}$（$M = 118.18\ \mathrm{g\,mol^{-1}}$，密度 $0.91\ \mathrm{g\,cm^{-3}}$）的 $\Delta_\mathrm{p}H = -35\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{p}S^\circ = -120\ \mathrm{J\,K^{-1}\,mol^{-1}}$（近似值，标准态 $1\ \mathrm{mol\,dm^{-3}}$）。求本体单体与 $1.0\ \mathrm{mol\,dm^{-3}}$ 溶液的上限温度，以及 $25\ ^\circ\mathrm{C}$ 下的平衡单体浓度。
::: solution
本体单体浓度：$[\mathrm{M}]_0 = 910/118.18 = 7.70\ \mathrm{mol\,dm^{-3}}$，于是 $R\ln 7.70 = 8.314\times2.041 = 16.97\ \mathrm{J\,K^{-1}\,mol^{-1}}$。于是
$$
T_\mathrm{c}(\text{本体}) = \frac{-35\,000}{-120 + 16.97}\ \mathrm{K} = 340\ \mathrm{K}\ (67\ ^\circ\mathrm{C}),
\qquad
T_\mathrm{c}(1.0\ \mathrm{mol\,dm^{-3}}) = \frac{-35\,000}{-120}\ \mathrm{K} = 292\ \mathrm{K}\ (19\ ^\circ\mathrm{C}).
$$
本体值与实测上限约 $61\ ^\circ\mathrm{C}$ 在 $\Delta_\mathrm{p}S^\circ$ 的不确定度内相符。$25\ ^\circ\mathrm{C}$ 时：
$$
\ln[\mathrm{M}]_\mathrm{eq} = \frac{-35\,000}{(8.314)(298.15)} + \frac{120}{8.314} = -14.12 + 14.43 = 0.31,
\qquad [\mathrm{M}]_\mathrm{eq} = 1.4\ \mathrm{mol\,dm^{-3}} .
$$
即使在室温，本体 α-甲基苯乙烯的聚合也会在约 $1.4/7.7 = 18\%$ 的单体未转化时停止，而 $1\ \mathrm{mol\,dm^{-3}}$ 的溶液根本无法聚合。因此 α-甲基苯乙烯在低温（常为 $-78\ ^\circ\mathrm{C}$）下进行阴离子聚合，此时 $[\mathrm{M}]_\mathrm{eq}$ 极小。结果对 $\Delta_\mathrm{p}S^\circ$ 很敏感：$\pm5\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 的不确定度就把 $[\mathrm{M}]_\mathrm{eq}$ 向任一个方向改变约 $1.8$ 倍。答案只可靠到一个数量级，而非两位数字。
:::
:::

## 高转化率：引发剂耗尽与凝胶效应

稳态方程假定 $[\mathrm{I}]$ 恒定、速率常数恒定。在整个批次中这两条都不成立。

**引发剂消耗。**若引发剂半衰期与聚合时间相当，$[\mathrm{I}] = [\mathrm{I}]_0e^{-k_\mathrm{d}t}$，自由基的供应会逐渐枯竭。对 $-\mathrm{d}\ln[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}(fk_\mathrm{d}[\mathrm{I}]_0e^{-k_\mathrm{d}t}/k_\mathrm{t})^{1/2}$ 积分得
$$
-\ln(1 - x) = 2k_\mathrm{p}\left(\frac{f[\mathrm{I}]_0}{k_\mathrm{d}k_\mathrm{t}}\right)^{1/2}\left(1 - e^{-k_\mathrm{d}t/2}\right),
$$ {#eq-dead-end}
其中 $x$ 为分数转化率。当 $t \to \infty$，转化率趋于低于 100% 的一个极限：**死端聚合**。单体未耗尽，引发剂先用完。

::: widget plot
f: 1-exp(-A*(1-exp(-x/2)))
x: 0, 12
y: 0, 1
sliders: A=1.7:0.2:5:0.1
labels: \text{转化率}\ x
hlines: 1
caption: 引发剂随反应衰减的聚合中，转化率对无量纲时间 $k_\mathrm{d}t$ 的曲线，[[#eq-dead-end]]，$A = 2k_\mathrm{p}(f[\mathrm{I}]_0/k_\mathrm{d}k_\mathrm{t})^{1/2}$ 由滑块设定。转化率在 $x_\infty = 1 - e^{-A}$ 处达到平台。取 $A = 1.7$，即把[[#ex-styrene]]的苯乙烯体系做到引发剂耗尽，聚合在 82% 转化率处死去。要达到高转化率，要么增大 $A$（更多或更慢的引发剂），要么为后期补加第二种更慢的引发剂——这是工业上常见的"追赶"策略。此图假定 $k_\mathrm{t}$ 恒定。下面描述的凝胶效应会彻底改变它。
:::

**凝胶效应。**本体甲基丙烯酸甲酯的速率在约 20% 转化率之前大致保持恒定。然后它急剧上升，达十倍或更多，摩尔质量也随之上升。这就是 **Trommsdorff–Norrish** 或**凝胶效应**（它与网络意义上的凝胶化毫无关系）。终止需要两个*聚合物*自由基相遇。随着聚合物积累，介质黏度增大若干数量级，长链的扩散变慢，于是 $k_\mathrm{t}$ 急剧下降。增长只需要小的单体分子到达自由基，所以 $k_\mathrm{p}$ 直到很晚才受影响。由[[#eq-rp]]，速率按 $k_\mathrm{t}^{-1/2}$ 上升；由[[#eq-nu]]，链长也上升。接近单体–聚合物混合物的玻璃化转变时，连单体扩散也冻结，$k_\mathrm{p}$ 崩溃，反应在完全转化之前停止（**玻璃效应**）。本体 PMMA 留在 $60\ ^\circ\mathrm{C}$ 通常约 90% 就停滞，除非升温到聚合物的玻璃化转变之上以完成反应。

::: warning 本体聚合中的热失控 {#warn-runaway}
每摩尔单体放热 $70$–$100\ \mathrm{kJ}$、且随进行而*加速*的聚合是失控的配方。凝胶效应一旦出现，速率上升，放热更快，黏稠的物料排热很差，温度上升，引发剂分解更快，速率再次上升。绝热条件下，苯乙烯完全聚合会使其温度升高几百开尔文。苯乙烯、氯乙烯与丙烯酸单体的失控聚合曾在工业中引起火灾与爆炸。这就是工业实践采用以水为热阱的溶液、悬浮或乳液工艺、限制本体检修釜的转化率、使单体在储存中加抑制剂并保持低温、并给反应釜加装紧急"终止"抑制剂注入装置的原因。在教学实验室里，小规模聚合应在通风橱中的敞口容器内进行，控制温度，在指导之下、经过风险评估后进行。切勿加热装有单体与引发剂的密闭容器。
:::

## 聚合工艺

每一种自由基工艺中化学都是相同的。不同的是反应介质的物理，特别是如何排热、自由基在哪里。

- **本体**：单体加引发剂，别无其他。产物纯净，所以这一路线用于浇铸 PMMA 板材和某些聚苯乙烯，但排热与凝胶效应限制了它。
- **溶液**：溶剂稀释单体并带走热。代价是溶剂的脱除与向溶剂的链转移。
- **悬浮**：单体小滴（0.01–1 mm，内含油溶性引发剂）在水中被搅拌，并加稳定剂。每个小滴是一个微小的本体反应器，水带走热，产物是珠粒。PVC 与发泡聚苯乙烯珠粒用这一路线。
- **乳液**：单体在水中乳化，加表面活性剂，并使用*水溶性*引发剂（过硫酸盐）。在水中生成的自由基进入溶胀了单体的表面活性剂胶束，胶束变成 50–500 nm 的聚合物粒子。单体从更大的液滴扩散过来。产物是**胶乳**：乳液漆、胶黏剂与丁苯橡胶。

乳液聚合打破了速率–链长困境。胶乳粒子极小，其中两个自由基几乎瞬时终止。若一个粒子含有一个自由基，该自由基便不受干扰地增长，直到*第二个*自由基从水中进入并将其终止。此后粒子保持休眠，直到第三个自由基进入。随时间推移，每个粒子平均含 $\bar{n} = \tfrac12$ 个自由基（**Smith–Ewart 情形 2**），单位体积水中的速率为
$$
R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}]_\mathrm{p}\,\bar{n}\,\frac{N}{N_\mathrm{A}},
$$ {#eq-emulsion}
其中 $[\mathrm{M}]_\mathrm{p}$ 是粒子内部的单体浓度，$N$ 是单位体积的粒子数。链在空间上被分开，终止不再依赖于总自由基浓度。更多粒子（更多表面活性剂）同时给出*更高*的速率，并且因为自由基进入每个粒子的频率更低，链也更长。

::: example 乳液聚合的速率与链长 {#ex-emulsion}
一苯乙烯乳液聚合在 $60\ ^\circ\mathrm{C}$，每 $\mathrm{dm^3}$ 水有 $N = 1.0\times10^{17}$ 个粒子，粒子内 $[\mathrm{M}]_\mathrm{p} = 5.2\ \mathrm{mol\,dm^{-3}}$，$k_\mathrm{p} = 341\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，$\bar{n} = 0.5$。自由基以 $\rho = 1.0\times10^{16}\ \mathrm{dm^{-3}\,s^{-1}}$ 进入粒子。求 $R_\mathrm{p}$ 并估算 $\bar{X}_\mathrm{n}$。（量级符合实际的示例值。）
::: solution
由[[#eq-emulsion]]：
$$
R_\mathrm{p} = (341)(5.2)(0.5)\frac{1.0\times10^{17}}{6.022\times10^{23}}\ \mathrm{mol\,dm^{-3}\,s^{-1}} = 1.5\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}},
$$
约为[[#ex-styrene]]本体速率的两倍。每个粒子平均每 $N/\rho = 10\ \mathrm{s}$ 收到一个自由基。链在一个自由基进入时开始、在下一次进入时停止，所以它以 $k_\mathrm{p}[\mathrm{M}]_\mathrm{p} = 1.77\times10^{3}$ 次每秒的加成速率生长约 $10\ \mathrm{s}$：
$$
\bar{X}_\mathrm{n} \approx k_\mathrm{p}[\mathrm{M}]_\mathrm{p}\frac{N}{\rho} = 1.8\times10^{4} .
$$
比本体链长十五倍，速率却是两倍。在本体中，同样的自由基通量只会给出短得多的链。粒子起着把自由基彼此隔开的小室的作用。
:::
:::

::: quiz
恒温的溶液聚合中，引发剂浓度增大为 9 倍，单体浓度保持不变。不发生链转移。会发生什么？
- [ ] 速率增大为 9 倍，$\bar{X}_\mathrm{n}$ 不变。
- [x] 速率增大为 3 倍，$\bar{X}_\mathrm{n}$ 降为三分之一。
- [ ] 速率增大为 3 倍，$\bar{X}_\mathrm{n}$ 增大为 3 倍。
- [ ] 速率不变，因为引发剂不在增长中被消耗。
::: solution
由[[#prop-rate]]，$R_\mathrm{p} \propto [\mathrm{I}]^{1/2}$，所以速率增大为 $\sqrt{9} = 3$ 倍。由[[#def-kinetic-chain]]，$\nu \propto [\mathrm{I}]^{-1/2}$，所以链长降为三分之一。多出的自由基寿命很短，因为它们彼此终止。只有隔室化（乳液）或可逆失活（[[polymer-chemistry/controlled-polymerisation]]）能避开这一权衡。
:::
:::

::: history
第一批商品聚乙烯 1933 年产自 ICI 的 Winnington 实验室，当时**埃里克·福西特**（Eric Fawcett）与**雷金纳德·吉布森**（Reginald Gibson）在极高压下加热乙烯与苯甲醛，发现一种白色蜡状固体。一种氧杂质引发了自由基聚合，1935 年该工艺实现了可重现。LDPE 自 1939 年投产，为战时雷达电缆提供绝缘层。乙烯基聚合的自由基链机理——含区分的引发、增长与终止步骤——在 1930 年代确立。**保罗·弗洛里**（Paul Flory）1937 年的论文"The mechanism of vinyl polymerizations"（*Journal of the American Chemical Society* 59, 241）引入了链转移这一步骤：它终止一条链却不终止动力学链。**弗兰克·梅奥**（Frank Mayo）1943 年给出转移方程，**罗纳德·诺里什**（Ronald Norrish）与**R. R. 史密斯**（R. R. Smith）1942 年描述了甲基丙烯酸甲酯的自动加速（*Nature* 150, 336），**恩斯特·特龙姆斯多夫**（Ernst Trommsdorff）1948 年对它作出分析。**W. V. 史密斯**（W. V. Smith）与**R. H. 尤尔特**（R. H. Ewart）1948 年发表了乳液聚合的动力学理论（*Journal of Chemical Physics* 16, 592）。用脉冲激光聚合测定 $k_\mathrm{p}$ 的现代方法由**奥斯卡·奥拉伊**（Oskar Olaj）及合作者于 1987 年引入，IUPAC 基准值随后于 1990 年代发表。
:::

## 后续内容

常规自由基聚合的弱点是其宽的分布、无法制备嵌段共聚物、以及速率–链长权衡。三者都来自不可逆终止。[[polymer-chemistry/controlled-polymerisation]]展示离子方法与可逆失活方法（ATRP、RAFT、NMP）如何抑制终止、把链增长变成 $Đ$ 接近 1 的活性过程。当两种单体共存时，同一个增长步骤变成四个速率常数之间的竞争。这一竞争连同 Mayo–Lewis 方程是[[polymer-chemistry/copolymerisation]]的主题。这里用的稳态链动力学在[[kinetics/chain-reactions]]中一般性地展开，复合活化能的阿伦尼乌斯处理在[[kinetics/rate-laws]]。摩尔质量与支化如何在熔体黏度和强度中表现出来，则是[[polymer-chemistry/polymer-properties]]的内容。

::: summary
- 自由基聚合是链反应：引发（$R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}]$，效率 $f$ 源于笼效应）、增长（$k_\mathrm{p}$）、偶合或歧化终止（$2k_\mathrm{t}[\mathrm{M}\cdot]^2$）。高聚物从一开始就形成。
- 稳态给出 $[\mathrm{M}\cdot] = (fk_\mathrm{d}[\mathrm{I}]/k_\mathrm{t})^{1/2} \sim 10^{-8}\ \mathrm{mol\,dm^{-3}}$ 与 $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}](fk_\mathrm{d}[\mathrm{I}]/k_\mathrm{t})^{1/2}$：对单体一级，对引发剂半级。
- 动力学链长 $\nu = R_\mathrm{p}/R_\mathrm{i} = k_\mathrm{p}^2[\mathrm{M}]^2/(2k_\mathrm{t}R_\mathrm{p})$ 给出 $\bar{X}_\mathrm{n} = 2\nu/(1+\delta)$。聚合越快链越短；温度提高速率但降低 $\bar{X}_\mathrm{n}$。
- 链转移终止分子而不终止动力学链。Mayo 方程 $1/\bar{X}_\mathrm{n} = 1/(\bar{X}_\mathrm{n})_0 + C_\mathrm{M} + C_\mathrm{S}[\mathrm{S}]/[\mathrm{M}] + \dots$ 用硫醇调节剂设定摩尔质量，而 $1/C_\mathrm{M}$ 给 $\bar{X}_\mathrm{n}$ 封顶（PVC）。
- 聚合放热但熵上不利。高于 $T_\mathrm{c} = \Delta_\mathrm{p}H/(\Delta_\mathrm{p}S^\circ + R\ln[\mathrm{M}]_0)$ 就不能生成高聚物（α-甲基苯乙烯约 $61\ ^\circ\mathrm{C}$），PMMA 受热解拉链为单体。
- 高转化率下，引发剂耗尽导致死端聚合；扩散控制的 $k_\mathrm{t}$ 下降导致凝胶效应，这是热失控的一个根源。
- 乳液聚合把自由基隔室化（$\bar{n} = \tfrac12$），同时实现高速率与长链。
:::

## 习题

::: exercise 过氧化物引发剂的半衰期 {level=1 check="96"}
过氧化二苯甲酰在 $60\ ^\circ\mathrm{C}$ 的 $k_\mathrm{d} = 2.0\times10^{-6}\ \mathrm{s^{-1}}$。它的半衰期是多少？（以小时输入 $t_{1/2}$，保留两位有效数字。）
::: solution
$t_{1/2} = \ln 2/k_\mathrm{d} = 0.6931/2.0\times10^{-6} = 3.47\times10^{5}\ \mathrm{s} = 96\ \mathrm{h}$。它在 $60\ ^\circ\mathrm{C}$ 是"慢"引发剂，通常在约 $80$–$90\ ^\circ\mathrm{C}$ 使用。
:::
:::

::: exercise 引发剂加倍 {level=1 check="0.707"}
自由基聚合中引发剂浓度加倍，其余不变，无链转移。$\bar{X}_\mathrm{n}$ 改变多少倍？（输入倍数，保留三位有效数字。）
::: solution
$\nu \propto [\mathrm{I}]^{-1/2}$，终止方式固定时 $\bar{X}_\mathrm{n} \propto \nu$，所以倍数为 $2^{-1/2} = 0.707$。同时速率增大为 $\sqrt2 = 1.41$ 倍。
:::
:::

::: exercise 混合终止 {level=1 check="1410"}
一聚合的动力学链长为 $1200$，70% 的终止事件是歧化。$\bar{X}_\mathrm{n}$ 是多少（无转移）？（输入 $\bar{X}_\mathrm{n}$，保留三位有效数字。）
::: solution
$\bar{X}_\mathrm{n} = 2\nu/(1+\delta) = 2400/1.70 = 1.41\times10^{3}$。纯偶合会给出 2400，纯歧化给出 1200。
:::
:::

::: exercise 需要多少硫醇？ {level=2 check="0.0003"}
一无转移剂的聚合本应给出 $\bar{X}_\mathrm{n} = 2000$。$C_\mathrm{S} = 15$ 的硫醇取何比值 $[\mathrm{S}]/[\mathrm{M}]$ 能把 $\bar{X}_\mathrm{n}$ 降到 $200$？（输入 $[\mathrm{S}]/[\mathrm{M}]$。）
::: solution
由[[#eq-mayo]]，$C_\mathrm{S}[\mathrm{S}]/[\mathrm{M}] = 1/200 - 1/2000 = 4.5\times10^{-3}$，所以 $[\mathrm{S}]/[\mathrm{M}] = 4.5\times10^{-3}/15 = 3.0\times10^{-4}$。每一万个单体分子三个硫醇分子就把链长砍十倍。
:::
:::

::: exercise 温度与速率 {level=2 check="2.67"}
一热引发聚合的 $E_\mathrm{p} = 32.5$、$E_\mathrm{d} = 130$、$E_\mathrm{t} = 8\ \mathrm{kJ\,mol^{-1}}$。$R_\mathrm{p}$ 在 $60\ ^\circ\mathrm{C}$ 与 $70\ ^\circ\mathrm{C}$ 之间增大多少倍？（输入倍数，保留三位有效数字。）
::: solution
$E_{R_\mathrm{p}} = E_\mathrm{p} + \tfrac12E_\mathrm{d} - \tfrac12E_\mathrm{t} = 32.5 + 65 - 4 = 93.5\ \mathrm{kJ\,mol^{-1}}$。于是
$$
\frac{R_\mathrm{p}(343.15\ \mathrm{K})}{R_\mathrm{p}(333.15\ \mathrm{K})} = \exp\!\left[\frac{93\,500}{8.314}\left(\frac{1}{333.15} - \frac{1}{343.15}\right)\right] = e^{0.984} = 2.67 .
$$
同一区间内 $\bar{X}_\mathrm{n}$ 的 $E = 32.5 - 65 - 4 = -36.5\ \mathrm{kJ\,mol^{-1}}$，下降为 $e^{-0.384} = 0.68$ 倍。
:::
:::

::: exercise 甲基丙烯酸甲酯的上限温度 {level=2 check="479"}
取甲基丙烯酸甲酯的 $\Delta_\mathrm{p}H = -56\ \mathrm{kJ\,mol^{-1}}$、$\Delta_\mathrm{p}S^\circ = -117\ \mathrm{J\,K^{-1}\,mol^{-1}}$（标准态 $1\ \mathrm{mol\,dm^{-3}}$）。求 $1.0\ \mathrm{mol\,dm^{-3}}$ 溶液的上限温度。（以 K 输入 $T_\mathrm{c}$，保留三位有效数字。）
::: solution
$[\mathrm{M}]_0 = c^\circ$ 时对数项为零，$T_\mathrm{c} = \Delta_\mathrm{p}H/\Delta_\mathrm{p}S^\circ = 56\,000/117 = 479\ \mathrm{K}$（$206\ ^\circ\mathrm{C}$）。本体 MMA（约 $9.4\ \mathrm{mol\,dm^{-3}}$）的上限更高。无论如何，PMMA 加热到远高于其上限便解聚，这正是从 PMMA 废料回收单体的基础。
:::
:::

::: exercise 分离速率常数 {level=3 check="0.24"}
一聚合的 $[\mathrm{M}] = 5.0\ \mathrm{mol\,dm^{-3}}$，引发速率经独立测量（用自由基清除剂）为 $R_\mathrm{i} = 2.0\times10^{-8}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，聚合速率为 $R_\mathrm{p} = 1.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$。(a) 用可测量把 $k_\mathrm{p}/k_\mathrm{t}^{1/2}$ 表出。(b) 求值。(c) 再加什么测量能把 $k_\mathrm{p}$ 与 $k_\mathrm{t}$ 分开？（以 $\mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1/2}}$ 输入 $k_\mathrm{p}/k_\mathrm{t}^{1/2}$。）
::: hint
把 $R_\mathrm{p}$ 用 $R_\mathrm{i}$ 而不是 $[\mathrm{I}]$ 写出。
:::
::: solution
(a) 稳态下 $R_\mathrm{i} = 2k_\mathrm{t}[\mathrm{M}\cdot]^2$，所以 $[\mathrm{M}\cdot] = (R_\mathrm{i}/2k_\mathrm{t})^{1/2}$，$R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}](R_\mathrm{i}/2k_\mathrm{t})^{1/2}$。整理得
$$
\frac{k_\mathrm{p}}{k_\mathrm{t}^{1/2}} = \frac{\sqrt2\,R_\mathrm{p}}{[\mathrm{M}]R_\mathrm{i}^{1/2}} .
$$
(b) $= (1.414)(1.2\times10^{-4})/[(5.0)(1.414\times10^{-4})] = 0.24\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1/2}}$。

(c) 稳态速率只给出这个比值。非稳态测量给出第二个组合。转扇实验给出的自由基寿命 $\tau = 1/(2k_\mathrm{t}[\mathrm{M}\cdot])$ 给出 $k_\mathrm{p}/k_\mathrm{t}$，PLP–SEC 由 $L_1 = k_\mathrm{p}[\mathrm{M}]t_0$ 直接给出 $k_\mathrm{p}$。二者任一与 $k_\mathrm{p}/k_\mathrm{t}^{1/2}$ 联立即可分离两个常数。例如，若 PLP 给出 $k_\mathrm{p} = 340$，则 $k_\mathrm{t} = (340/0.24)^2 = 2.0\times10^{6}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。
:::
:::

::: exercise 死端聚合 {level=3 check="0.818"}
(a) 由[[#eq-rp]]在 $[\mathrm{I}] = [\mathrm{I}]_0e^{-k_\mathrm{d}t}$ 下导出[[#eq-dead-end]]。(b) 对[[#ex-styrene]]的苯乙烯体系（$k_\mathrm{p} = 341$、$f = 0.60$、$[\mathrm{I}]_0 = 0.010\ \mathrm{mol\,dm^{-3}}$、$k_\mathrm{d} = 9.6\times10^{-6}\ \mathrm{s^{-1}}$、$k_\mathrm{t} = 1.0\times10^{8}$，单位均为 $\mathrm{dm^3}$、mol 与 s），若让聚合在 $60\ ^\circ\mathrm{C}$、速率常数恒定的条件下无限进行下去，求极限转化率。（输入 $x_\infty$，保留三位有效数字。）
::: solution
(a) 代入 $[\mathrm{I}] = [\mathrm{I}]_0e^{-k_\mathrm{d}t}$：
$$
-\frac{\mathrm{d}\ln[\mathrm{M}]}{\mathrm{d}t} = k_\mathrm{p}\left(\frac{fk_\mathrm{d}[\mathrm{I}]_0}{k_\mathrm{t}}\right)^{1/2}e^{-k_\mathrm{d}t/2} .
$$
从 0 到 $t$ 积分：$\int_0^t e^{-k_\mathrm{d}t'/2}\,\mathrm{d}t' = (2/k_\mathrm{d})(1 - e^{-k_\mathrm{d}t/2})$。于是
$$
-\ln\frac{[\mathrm{M}]}{[\mathrm{M}]_0} = 2k_\mathrm{p}\left(\frac{f[\mathrm{I}]_0}{k_\mathrm{d}k_\mathrm{t}}\right)^{1/2}\left(1 - e^{-k_\mathrm{d}t/2}\right),
$$
且 $[\mathrm{M}]/[\mathrm{M}]_0 = 1 - x$。

(b) $A = 2(341)\left[(0.60)(0.010)/((9.6\times10^{-6})(1.0\times10^{8}))\right]^{1/2} = 682\times(6.25\times10^{-6})^{1/2} = 682\times0.0025 = 1.705$。当 $t \to \infty$，$x_\infty = 1 - e^{-1.705} = 0.818$。实际上凝胶效应降低 $k_\mathrm{t}$，会把苯乙烯推过这个极限。若要避开凝胶效应，办法是使用慢引发剂（$k_\mathrm{d}$ 小，从而 $A$ 大）。
:::
:::
