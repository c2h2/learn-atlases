在氢与氯的光化学化合 $\mathrm{H_2 + Cl_2 \rightarrow 2\,HCl}$ 中，一个可见光光子平均会接着带来一万个到一百万个氯化氢分子的生成。一个光量子打断一个 $\mathrm{Cl_2}$ 键——一个原子尺度的事件——而烧瓶却以宏观尺度的化学反应作答，快得使强光下的混合气发生爆炸。化学计量对此毫无解释：方程式说的是两个分子反应，不是两个的一百万倍。把单次活化事件放大成反应雪崩的，是**链反应**：一种机理，其中在反应中被消耗的活性物种会被反应*再生*，于是一次链引发事件启动一个循环，循环反复转动，直到——而且只直到——两个载体偶然相遇并互相毁灭为止。链反应是燃烧、爆炸、食物的成熟与酸败、聚合物生产、高层大气臭氧循环、以及活细胞内脂肪缓慢酸败的机理；它也是 [[kinetics/reaction-mechanisms]] 中的稳态机制获得最大回报的地方，因为链化学恰恰是中间体少到检测不出、却又完全掌权的那类化学。

本章从一个观念——一个被消耗又被重造的载体——加上稳态出发，建立整个主题：链的构造与链长；为什么链的速率按引发速率的*平方根*变化；氢与溴的反应，其古怪的速率方程被博登斯坦（Bodenstein）在 1913 年逐步再现，至今仍是化学动力学中最有教益的一个机理；氢与氯的长链以及量子产率告诉我们的东西；还有链*分支*——一个载体变成两个——以及分支与终止的竞争如何决定氢氧混合气是安静地燃烧、静止不动、还是爆轰。

## 链的构造

::: definition 链反应及其阶段 {#def-chain}
**链反应**是至少含有一个**链载体**的基元步骤序列——链载体是一种活性中间体（通常是自由基，即带有未成对电子的原子，写作 $\mathrm{Cl\cdot}$、$\mathrm{H\cdot}$、$\mathrm{OH\cdot}$），它在一个步骤中被消耗、在后续步骤中被再生，因而化学计量并不要求它被毁灭。各阶段为：

- **链引发**：稳定反应物在热、光或加入的引发剂作用下转化为载体；这是唯一必须从外界获得能量的阶段，而且很慢。
- **链传递**：载体与一个稳定分子反应，给出产物和一个（新的或同一个）载体；链*周转*一次。一个传递循环把反应物转化为产物而不净消耗载体。
- **链抑制**：某个传递步骤被逆转，或载体被某种物种（常常就是产物本身）改道，使反应被混合物中存在的物质减慢。
- **链终止**：两个载体被毁灭，或互相复合（气相中或器壁上），或与加入的捕获剂反应。

**链载体**就是机理中的中间体；**总反应**是各步骤之和并把载体消去，且必须再现实测的化学计量。
:::

把这些阶段读成一个关于种群的故事。引发以速率 $r_\mathrm{i}$ *生育*载体；终止*杀死*它们，而由于两个载体必须相遇才能死去，死亡率是 $2k_\mathrm{t}[\text{carrier}]^2$——对种群是二次的。在生与死之间，每个载体把传递循环运转约 $\nu$ 次。[[kinetics/reaction-mechanisms]] 的稳态无非是生与死的收支平衡，而链动力学一切令人惊讶之处——半级数、巨大的量子产率、越过某个压力就凭空出现的爆炸——都来自把这笔账算仔细。

::: definition 链长 {#def-chain-length}
**链长** $\nu$ 是一次引发事件在终止之前平均产生的传递循环数，操作上即比值
$$
\nu = \frac{\text{反应物的消耗速率}}{\text{引发速率}} = \frac{v_\text{prop}}{r_\mathrm{i}} .
$$
当引发是光化学的、其速率等于光子吸收速率时，$\nu$ 在量级为一的化学计量因子内等于反应的**量子产率**（每个被吸收光子所反应的分子数）。链长从几十个（HBr 的生成，受强烈抑制）经过 $10^{3}$–$10^{5}$（光氯化）到有利情形下的 $10^{6}$ 以上；由一个量子引发、周转一百万次的链不是夸张，而是测量结果。
:::

链为什么能以*极小*的载体浓度给出大速率？因为传递速率是 $k_\mathrm{p}[\text{carrier}][\mathrm{M}]$，而尽管 $[\text{carrier}]_\text{ss}$ 可能只有 $[\mathrm{M}]$ 的百万分之一，传递速率常数却很大（$\mathrm{H\cdot}$ 与 $\mathrm{Cl\cdot}$ 的夺氢反应达 $10^{4}$–$10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$），且每个载体死前要工作 $\nu$ 次。链是一台机器，其*吞吐量*是微小存量种群与大周转数之积；把载体移走速率就崩塌，而载体本身对常规分析完全隐形。下面的[[#ex-simple-chain]]将给出真实数字。

::: warning 链长不是反应分子数 {#warn-chain-length}
链长 $10^{5}$ 并不意味着反应是"十万分子反应"。**反应分子数**属于单个基元步骤，取值 1、2 或（罕见地）3——它数的是单次事件中有多少实体相碰。**链长**属于给定条件下整个机理，数的是*每生育一次载体循环转动的次数*；它不是反应的性质而是条件的性质：光强加倍则 $\nu$ 下降（载体更多、二次终止更快）；降温、缩小容器、加入抑制剂，$\nu$ 又会改变。绝不要把由链长得到的"分子数"写进速率方程，也不要从级数读出机理的"大小"：$[\mathrm{Br_2}]$ 的半级数意味着*载体的平方根记账*，而不是半个分子。
:::

::: example 由量子产率数据求链长 {#ex-quantum-yield}
气相光氯化反应受光照，反应混合物每秒吸收 $3.6\times10^{-8}\ \mathrm{mol}$ 光子（一个光子引发一条链）。测得 $\mathrm{H_2}$ 的消耗速率为 $7.0\times10^{-4}\ \mathrm{mol\,s^{-1}}$。问 $\mathrm{H_2}$ 消耗的量子产率与链长各是多少？
::: solution
量子产率是每个被吸收光子所反应掉的分子（或摩尔）数：
$$
\Phi = \frac{7.0\times10^{-4}\ \mathrm{mol\,s^{-1}}}{3.6\times10^{-8}\ \mathrm{mol\,photons\,s^{-1}}} = 1.9\times10^{4}.
$$
一个光子启动一条链，每个传递循环消耗一个 $\mathrm{H_2}$，故链长为每次引发 $\nu = \Phi = 1.9\times10^{4}$ 次周转。数据给到两位有效数字，答案也按两位报告。物理的解读：光是引火苗——在它消耗的反应物分子中只贡献可忽略的份额（$2\times10^{4}$ 分之一），被吸收光子的能量是扳机，不是燃料。
:::
:::

## 链的稳态动力学：为什么是半级

取链不可再简化的骨架：引发产载体 $\mathrm{X\cdot}$，一个传递步骤消耗反应物 $\mathrm{M}$，终止成对地毁灭载体。

$$
\mathrm{I} \xrightarrow{\;k_\mathrm{d}\;} 2\,\mathrm{X\cdot} \qquad
\mathrm{X\cdot} + \mathrm{M} \xrightarrow{\;k_\mathrm{p}\;} \text{产物} + \mathrm{X\cdot} \qquad
2\,\mathrm{X\cdot} \xrightarrow{\;k_\mathrm{t}\;} \text{死产物}
$$

引发速率为 $r_\mathrm{i} = 2 f k_\mathrm{d}[\mathrm{I}]$（因子 2 因为每次事件产生两个载体，$f \le 1$ 是逸出产率）；这个因子 2 会从物理中消掉，最好一开始就用 $r_\mathrm{i}$ 携带。

::: proposition 对引发剂的半级数 {#prop-half-order}
对引发速率 $r_\mathrm{i}$、传递 $\mathrm{X\cdot} + \mathrm{M} \rightarrow \text{产物} + \mathrm{X\cdot}$（速率常数 $k_\mathrm{p}$）、**双分子终止** $2\,\mathrm{X\cdot} \rightarrow$ 死产物（速率常数 $k_\mathrm{t}$）的链，稳态给出
$$
[\mathrm{X\cdot}]_\text{ss} = \left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2},
\qquad
v = k_\mathrm{p}[\mathrm{M}]\left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2} \propto r_\mathrm{i}^{1/2}.
$$
若终止改为**对载体一级**——在器壁上毁灭 $\mathrm{X\cdot} \xrightarrow{k_\mathrm{w}}$ 死产物，或被浓度恒定的抑制剂捕获——则 $[\mathrm{X\cdot}]_\text{ss} = r_\mathrm{i}/k_\mathrm{w}$ 且 $v \propto r_\mathrm{i}$。对引发剂（或对光强）的级数是*链如何死去的诊断*：$\tfrac12$ 表示两个载体在气相中同归于尽，$1$ 表示每个载体单独死去。
:::

::: proof 一般链的稳态 {#proof-half-order}
写出载体的变化率。引发以 $r_\mathrm{i}$ 创造载体；传递每个循环创造一个又毁灭一个、净贡献为零；终止每次事件毁灭两个载体，故*载体*的损失率为 $2k_\mathrm{t}[\mathrm{X\cdot}]^2$：
$$
\frac{\mathrm{d}[\mathrm{X\cdot}]}{\mathrm{d}t} = r_\mathrm{i} - 2k_\mathrm{t}[\mathrm{X\cdot}]^2 \approx 0
\qquad\Longrightarrow\qquad
[\mathrm{X\cdot}]_\text{ss} = \left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2}.
$$
产物只在传递中出现，速率为 $k_\mathrm{p}[\mathrm{X\cdot}][\mathrm{M}]$，于是
$$
v = k_\mathrm{p}[\mathrm{M}]\left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2}. \qquad \blacksquare
$$
两笔记账检验。(i) 此结果蕴含的链长为 $\nu = v/r_\mathrm{i} = k_\mathrm{p}[\mathrm{M}]\,(2k_\mathrm{t}r_\mathrm{i})^{-1/2}$：提高 $r_\mathrm{i}$ 会使链按 $r_\mathrm{i}^{-1/2}$ 缩短，因为载体更多意味着载体–载体相遇更多——二次的死亡比线性的生育加速得更快。(ii) 对壁终止，把 $2k_\mathrm{t}[\mathrm{X\cdot}]^2$ 换成 $k_\mathrm{w}[\mathrm{X\cdot}]$；稳态于是是线性的，$[\mathrm{X\cdot}]_\text{ss} = r_\mathrm{i}/k_\mathrm{w}$，且 $\nu = k_\mathrm{p}[\mathrm{M}]/k_\mathrm{w}$ 与 $r_\mathrm{i}$ 无关：载体单独死去时，生育率不会缩短链。
:::

::: widget odesolver
f: 0.5 - 2*y*y
y0: 0
t: 0, 5
exact: 0.5*tanh(t)
h: 0.05
caption: 引发在 $t = 0$ 接通后链的载体浓度：$y' = 0.5 - 2y^2$ 即无量纲单位的 $\mathrm{d}[\mathrm{X\cdot}]/\mathrm{d}t = r_\mathrm{i} - 2k_\mathrm{t}[\mathrm{X\cdot}]^2$，图中并画出精确解 $y = 0.5\,\tanh t$ 以供对照（欧拉法、休恩法与 RK4 与其比较）。载体升到平台 $y_\text{ss} = 0.5 = \sqrt{r_\mathrm{i}/2k_\mathrm{t}}$——生育率与死亡系数之比的平方根——时间尺度为一个时间单位，其几倍即稳态建立前的**动力学链诱导期**。生育率加倍，平台只升 $\sqrt{2}$ 倍：二次的死亡吸收了大部分多出来的载体。这一条曲线就是半级数律的全部内容——平台*就是*平方根。
:::

::: example 一条简单链的数值 {#ex-simple-chain}
某热链的引发速率 $r_\mathrm{i} = 8.0\times10^{-7}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，传递 $\mathrm{X\cdot} + \mathrm{M} \rightarrow$ 产物 $+\ \mathrm{X\cdot}$ 的 $k_\mathrm{p} = 1.0\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$、$[\mathrm{M}] = 0.100\ \mathrm{mol\,dm^{-3}}$，自由基复合 $k_\mathrm{t} = 4.0\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。求 $[\mathrm{X\cdot}]_\text{ss}$、速率、链长，以及引发剂浓度（从而 $r_\mathrm{i}$）加倍时速率增大的倍数。
::: solution
$$
[\mathrm{X\cdot}]_\text{ss} = \left(\frac{8.0\times10^{-7}}{2 \times 4.0\times10^{9}}\right)^{\!1/2} = \left(1.0\times10^{-16}\right)^{1/2} = 1.0\times10^{-8}\ \mathrm{mol\,dm^{-3}},
$$
$$
v = k_\mathrm{p}[\mathrm{X\cdot}][\mathrm{M}] = (1.0\times10^{4})(1.0\times10^{-8})(0.100) = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}},
\qquad
\nu = \frac{v}{r_\mathrm{i}} = \frac{1.0\times10^{-5}}{8.0\times10^{-7}} = 1.3\times10^{1}.
$$
$r_\mathrm{i}$ 加倍使 $v$ 乘 $\sqrt{2} = 1.41$。注意链所隐藏的数目：载体只占反应物的 $10^{7}$ 分之一——完全隐形——却承担着 $10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ 的全部速率。载体的平均寿命为 $\tau = [\mathrm{X\cdot}]_\text{ss}/r_\mathrm{i} = 1.0\times10^{-8}/8.0\times10^{-7} = 1.3\times10^{-2}\ \mathrm{s}$，而链长恒等式 $\nu = \tau\,k_\mathrm{p}[\mathrm{M}]$ 精确成立：$(1.25\times10^{-2})(1.0\times10^{4})(0.100) = 12.5 = \nu$。每个载体出生、夺氢约十三次、然后死去；种群从不超过 $10^{-8}\ \mathrm{mol\,dm^{-3}}$，因为成对终止对拥挤施以二次的惩罚。
:::
:::

这段算术教给我们一个告诫：链机理充满了因子 2（每次引发两个载体，每次终止事件两个），唯一安全的程序是 [[kinetics/reaction-mechanisms]] 的算法——一切生成写 $+$、一切毁灭写 $-$，令总和为零，让代数记账。上面用的恒等式 $\nu = \tau k_\mathrm{p}[\mathrm{M}]$ 之所以精确，只是因为 $\tau$ 定义为 $[\mathrm{X\cdot}]_\text{ss}/r_\mathrm{i}$ 且 $r_\mathrm{i}$ 数的是*载体*；换一个约定那个 2 就会挪动，这正是必须靠定义而非记忆担待的原因。

## 氢与溴的反应：博登斯坦机理

$\mathrm{H_2(g) + Br_2(g) \rightarrow 2\,HBr(g)}$ 是化学中最著名的机理，著名在于它的速率方程令任何单步猜测都落空：在约 $\mathrm{200}$ 至 $\mathrm{300\,^\circ C}$ 之间，实测方程为

$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = \frac{k\,[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k'\,[\mathrm{HBr}]/[\mathrm{Br_2}]},
\qquad k = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2}, \quad k' = \frac{k_4}{k_3},
$$

起始是二分之三级，一个*出现在分母里的产物*（反应自我抑制），以及一个随组成改变的 $\mathrm{Br_2}$ 级数。博登斯坦及其学派测量了它；博登斯坦 1913 年的机理——配合稳态——推导了它。

::: theorem 氢–溴速率方程 {#thm-hbr}
若 $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$ 按[[#proof-hbr]]的五步机理进行，且对 $\mathrm{H\cdot}$ 与 $\mathrm{Br\cdot}$ 均取稳态近似，则
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = \frac{k\,[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k'\,[\mathrm{HBr}]/[\mathrm{Br_2}]},
\qquad
k = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2}, \quad k' = \frac{k_4}{k_3},
$$
在低转化率下成立；当 $[\mathrm{HBr}]/[\mathrm{Br_2}]$ 保持不超过约 1 时全程成立。两个极限具有诊断意义：$t = 0$ 时速率为 $k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}$（$\tfrac32$ 级）；一旦 $k'[\mathrm{HBr}]/[\mathrm{Br_2}] \gg 1$，速率变为 $(k/k')\,[\mathrm{H_2}][\mathrm{Br_2}]^{3/2}/[\mathrm{HBr}]$——对 $\mathrm{Br_2}$ 为 $\tfrac32$ 级，对产物为*负一*级。
:::

::: proof 博登斯坦的推导 {#proof-hbr}
机理如下，速率常数即博登斯坦方程所指：
$$
\begin{aligned}
\mathrm{Br_2} &\xrightarrow{\;k_1\;} 2\,\mathrm{Br\cdot} && \text{链引发}\\
\mathrm{Br\cdot} + \mathrm{H_2} &\xrightarrow{\;k_2\;} \mathrm{HBr} + \mathrm{H\cdot} && \text{链传递（慢，吸热）}\\
\mathrm{H\cdot} + \mathrm{Br_2} &\xrightarrow{\;k_3\;} \mathrm{HBr} + \mathrm{Br\cdot} && \text{链传递（快，放热）}\\
\mathrm{H\cdot} + \mathrm{HBr} &\xrightarrow{\;k_4\;} \mathrm{H_2} + \mathrm{Br\cdot} && \text{链抑制（放热 } 70\ \mathrm{kJ\,mol^{-1}}\text{）}\\
2\,\mathrm{Br\cdot} &\xrightarrow{\;k_5\;} \mathrm{Br_2} && \text{链终止}
\end{aligned}
$$
载体消去后各步之和即 $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$。HBr 在第 2、3 步生成、在第 4 步被毁灭：
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] - k_4[\mathrm{H\cdot}][\mathrm{HBr}].
$$
**对 $\mathrm{H\cdot}$ 取稳态**（在第 2 步生成，在第 3、4 步毁灭）：
$$
k_2[\mathrm{Br\cdot}][\mathrm{H_2}] - k_3[\mathrm{H\cdot}][\mathrm{Br_2}] + k_4[\mathrm{H\cdot}][\mathrm{HBr}] = 0
\qquad\Longrightarrow\qquad
[\mathrm{H\cdot}] = \frac{k_2[\mathrm{Br\cdot}][\mathrm{H_2}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]}.
$$
**对 $\mathrm{Br\cdot}$ 取稳态**（在第 1 步生成两倍、在第 3、4 步生成；在第 2 步毁灭、在第 5 步毁灭两倍）：
$$
2k_1[\mathrm{Br_2}] - 2k_5[\mathrm{Br\cdot}]^2 - k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] + k_4[\mathrm{H\cdot}][\mathrm{HBr}] = 0.
$$
最后三项之和*由 $\mathrm{H\cdot}$ 的方程*为零——传递在各步之间搬运溴而无净变化——剩下生与死的平衡，恰如一般链：
$$
[\mathrm{Br\cdot}] = \left(\frac{k_1}{k_5}\right)^{\!1/2}[\mathrm{Br_2}]^{1/2}.
$$
现在把 $[\mathrm{H\cdot}]$ 代入 HBr 的收支。两个含 H 原子的项通过公因子 $[\mathrm{H\cdot}]$ 合并：
$$
k_3[\mathrm{H\cdot}][\mathrm{Br_2}] - k_4[\mathrm{H\cdot}][\mathrm{HBr}]
= [\mathrm{H\cdot}]\bigl(k_3[\mathrm{Br_2}] - k_4[\mathrm{HBr}]\bigr)
= k_2[\mathrm{Br\cdot}][\mathrm{H_2}]\cdot\frac{k_3[\mathrm{Br_2}] - k_4[\mathrm{HBr}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]},
$$
于是
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t}
= k_2[\mathrm{Br\cdot}][\mathrm{H_2}]\left(1 + \frac{k_3[\mathrm{Br_2}] - k_4[\mathrm{HBr}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]}\right)
= k_2[\mathrm{Br\cdot}][\mathrm{H_2}]\cdot\frac{2k_3[\mathrm{Br_2}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]}
= \frac{2k_2[\mathrm{Br\cdot}][\mathrm{H_2}]}{1 + (k_4/k_3)[\mathrm{HBr}]/[\mathrm{Br_2}]}.
$$
最后代入 $[\mathrm{Br\cdot}]$：
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = \frac{2k_2\left(k_1/k_5\right)^{1/2}[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k_4[\mathrm{HBr}]/k_3[\mathrm{Br_2}]},
$$
即所述方程，其中 $k = 2k_2(k_1/k_5)^{1/2}$、$k' = k_4/k_3$。$\blacksquare$
:::

值得记住的是答案的构造，而不是代数。**分子**是引发–终止的记账：$\mathrm{Br\cdot}$ 的稳态就是一般链的平方根，$\mathrm{Br_2}$ 的半级数就是引发速率的半级数。**分母**是抑制：第 4 步在第 3 步兑现 H 原子之前把它偷走，其权重恰随产物积累而增大——一个拖慢自身生成的产物会把自己放进分母。

::: warning 速率方程支持机理，却永远不能证明机理 {#warn-hbr-mech}
博登斯坦方程在全部转化率范围内与实验一致，且与五步机理*相容*——但相容不是证明，而且这个例子比多数情形更尖锐：其他机理能再现同一个方程，例如让 $\mathrm{Br\cdot}$ 经前置平衡 $\mathrm{Br\cdot + Br_2 \rightleftharpoons Br_3\cdot}$ 被缓冲为 $\mathrm{Br_3\cdot}$、而 $\mathrm{H_2}$ 与 $\mathrm{Br_3\cdot}$ 反应的机理；稳态代数给出完全相同的 $[\mathrm{Br_2}]^{1/2}$ 与完全相同的抑制项。使链机理被*相信*的，是动力学之外的佐证：$\mathrm{Br\cdot}$ 与 $\mathrm{H\cdot}$ 的光谱检测、第 2 步的同位素效应、以及方程以机理所预言的方式失效的方式。要写"方程与……相容"，把"证明"留给算术，并记住速率方程对一个机理所能说的最重的话只是*未被反驳*。
:::

::: example 计算 HBr 速率方程 {#ex-hbr-eval}
对 $[\mathrm{H_2}]_0 = [\mathrm{Br_2}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$ 的等摩尔混合气，在某温度下示例常数为 $k = 1.0\times10^{-2}\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1}}$、$k' = 10$。计算 $t = 0$ 与转化率 $50\,\%$ 时的速率，并把后者与产物不抑制时该方程*本应*给出的速率相比较。
::: solution
$t = 0$ 时无 HBr，分母为 1，
$$
v_0 = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2} = (1.0\times10^{-2})(0.100)(0.100)^{1/2} = 3.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
转化率 $50\,\%$ 时 $[\mathrm{H_2}] = [\mathrm{Br_2}] = 0.050$、$[\mathrm{HBr}] = 0.100\ \mathrm{mol\,dm^{-3}}$，故 $k'[\mathrm{HBr}]/[\mathrm{Br_2}] = 10 \times 0.100/0.050 = 20$，
$$
v = \frac{(1.0\times10^{-2})(0.050)(0.050)^{1/2}}{1 + 20} = \frac{1.1\times10^{-4}}{21} = 5.3\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
若无抑制，同一组成将给出 $1.1\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$：产物把速率砍了 $21$ 倍——分母 $1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}]$ *就是*抑制，且随反应进行而增大。这就是 HBr 链很短（$\nu$ 以十计）而 HCl 链达数十万的原因：溴化反应的产物是自身链载体的陷阱。
:::
:::

::: widget plot
f: (1-x)*sqrt(1-x); (1-x)*sqrt(1-x)/(1 + kp*2*x/(1-x))
x: 0, 0.95
y: 0, 1.05
sliders: kp=10:0:20:1
labels: \text{无抑制}; \text{产物抑制}
caption: HBr 速率除以其初始值 $v/v_0 = (1-x)^{3/2}/\bigl(1 + 2k'x/(1-x)\bigr)$，对等摩尔进料（以初始浓度为单位时 $[\mathrm{H_2}] = [\mathrm{Br_2}] = 1 - x$、$[\mathrm{HBr}] = 2x$）的转化率 $x$ 作图，$k'$ 由滑块设定。上面的曲线是仅有反应物耗尽时的样子；下面才是真实。产物抑制不是小修正——$k' = 10$ 时 $x = 0.5$ 处的速率比仅耗尽所预言的小二十一倍，而分母地板里的 $(1-x)$ 使反应在反应物耗尽之前很久就爬行。把 $k'$ 滑到零，两条曲线重合：抑制就是产物吃掉自己的链。
:::

两个时间尺度组织着反应的早期。第一个是一般链的**动力学诱导期**：载体需要几个寿命 $\tau = (2k_\mathrm{t}[\mathrm{X\cdot}]_\text{ss})^{-1}$ 来建立其稳态种群，速率在那个时间尺度上爬升到 $v_0$（odesolver 图中的 tanh 曲线）。第二个是**抑制时间尺度**：产物多久才开始说话。

::: example 抑制多久才咬人？ {#ex-induction}
对[[#ex-hbr-eval]]的混合气（$v_0 = 3.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，$k' = 10$，$[\mathrm{Br_2}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$），估计抑制项不再可忽略的时刻，"忽略"取作 $k'[\mathrm{HBr}]/[\mathrm{Br_2}] < 1$。
::: solution
抑制在 $k'[\mathrm{HBr}]/[\mathrm{Br_2}] \approx 1$ 时变得重要，即 $[\mathrm{HBr}] \approx [\mathrm{Br_2}]/k' \approx 0.100/10 = 0.010\ \mathrm{mol\,dm^{-3}}$。按初始速率（那时速率几乎未降），
$$
t_\text{ind} \approx \frac{0.010\ \mathrm{mol\,dm^{-3}}}{3.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}} = 31\ \mathrm{s}.
$$
这个估计故意粗糙——物理只有一位有效数字，算术有两位——其价值在于*标度*：$t_\text{ind} \propto [\mathrm{Br_2}]/(k'v_0)$，所以富溴进料与更小的 $k'$（更高温，因为 $k' = k_4/k_3$ 随温度下降）都延长无抑制窗口。由载体寿命算出的动力学诱导期是毫秒；抑制期是几十秒。"太晚"开始计时的实验只看到一个单调衰减的反应；及时开始的实验看到完整的方程。
:::
:::

## 氢与氯的反应：不肯死去的链

::: definition 量子产率 {#def-quantum-yield}
光化学反应的**量子产率**为
$$
\Phi = \frac{\text{消耗的反应物分子数（或生成的产物分子数）}}{\text{被吸收的光子数}} .
$$
对非链的初级过程 $\Phi \le 1$；对由光子引发的链反应，$\Phi \approx \nu$（差一个每个传递循环消耗的反应物分子数），所以**测得 $\Phi \gg 1$ 是反应为链的经典证明**，而追踪 $\Phi$ 如何依赖光强、压力与容器大小，就是探测链如何死去。
:::

$\mathrm{H_2 + Cl_2 \rightarrow 2\,HCl}$ 按同*形状*的机理进行——引发 $\mathrm{Cl_2 \rightarrow 2\,Cl\cdot}$，传递 $\mathrm{Cl\cdot + H_2 \rightarrow HCl + H\cdot}$ 继而 $\mathrm{H\cdot + Cl_2 \rightarrow HCl + Cl\cdot}$，终止 $2\,\mathrm{Cl\cdot} + \mathrm{M} \rightarrow \mathrm{Cl_2} + \mathrm{M}$——给出简单方程 $v = k[\mathrm{H_2}][\mathrm{Cl_2}]^{1/2}$：半级数留了下来，分母没有。

::: proposition 为什么 HCl 不受抑制且其链很长 {#prop-hcl}
两个能量事实把氯与溴分开。(i) **没有抑制步骤与之竞争。**HBr 链的抑制是 $\mathrm{H\cdot + HBr \rightarrow H_2 + Br\cdot}$，放热 $70\ \mathrm{kJ\,mol^{-1}}$ 且很快；其氯的类比 $\mathrm{H\cdot + HCl \rightarrow H_2 + Cl\cdot}$ 几乎热中性（$-4\ \mathrm{kJ\,mol^{-1}}$）且有可观的势垒，所以在与 $\mathrm{H\cdot + Cl_2}$（$-189\ \mathrm{kJ\,mol^{-1}}$，快）的每场赛跑中都落败。没有产物陷阱，就没有分母。(ii) **终止是三分子的。**两个 $\mathrm{Cl\cdot}$ 原子没有第三体 $\mathrm{M}$ 带走键能就无法结合，故终止速率 $\propto [\mathrm{Cl\cdot}]^2[\mathrm{M}]$ 在中等压力下很慢；链活得长，$\nu$ 达 $10^{4}$–$10^{6}$，且 $\Phi$ 随压力降低、随容器增大而增大（壁毁灭载体），这正是长链被发现的方式。
:::

[[#ex-quantum-yield]]的数字——$\nu \approx 2\times10^{4}$——对光氯化而言平平常常；在强光下释放的热来不及离开气体，温度失控，混合气发生光化学爆炸。同样的计量、同样的机理形状，却与 HBr 合成完全不同的安全面貌：链长就是制备反应与炸弹之间的差别。

## 链分支与爆炸：氢 + 氧

当一个载体产生*多于一个*载体时，一切都变了。

::: definition 链分支 {#def-branching}
**链分支**步骤是一个载体产生两个或更多载体的传递步骤，于是载体种群成倍增长而非仅仅周转。范式是
$$
\mathrm{H\cdot} + \mathrm{O_2} \rightarrow \mathrm{OH\cdot} + \mathrm{O\cdot} \qquad \Delta_\mathrm{r}H^\circ = +70\ \mathrm{kJ\,mol^{-1}},
$$
随后接快速步骤 $\mathrm{O\cdot + H_2 \rightarrow OH\cdot + H\cdot}$ 与 $\mathrm{OH\cdot + H_2 \rightarrow H_2O + H\cdot}$：净效果是一个 $\mathrm{H\cdot}$ 进、三个载体出。分支是燃烧与爆轰的机理；其配重是三分子复合
$$
\mathrm{H\cdot} + \mathrm{O_2} + \mathrm{M} \rightarrow \mathrm{HO_2\cdot} + \mathrm{M} \qquad \Delta_\mathrm{r}H^\circ = -215\ \mathrm{kJ\,mol^{-1}},
$$
其产物 $\mathrm{HO_2\cdot}$ 活性低得多，扩散到器壁或陷阱而亡。两步争夺*同一个* $\mathrm{H\cdot}$：分支是双分子的、带 $70\ \mathrm{kJ\,mol^{-1}}$ 势垒；终止是三分子的、没有势垒。
:::

::: proposition 爆炸的临界条件 {#prop-critical}
设 $[\mathrm{R\cdot}]$ 为载体总浓度，并设分支以 $k_\mathrm{b}[\mathrm{O_2}][\mathrm{R\cdot}]$ 创造载体，而终止（气相三分子加壁损失）以 $\bigl(k_\mathrm{t}[\mathrm{O_2}][\mathrm{M}] + k_\mathrm{w}\bigr)[\mathrm{R\cdot}]$ 毁灭它们。则
$$
\frac{\mathrm{d}[\mathrm{R\cdot}]}{\mathrm{d}t} = \bigl[\underbrace{k_\mathrm{b}[\mathrm{O_2}] - k_\mathrm{t}[\mathrm{O_2}][\mathrm{M}] - k_\mathrm{w}}_{\displaystyle \phi}\bigr][\mathrm{R\cdot}]
\qquad\Longrightarrow\qquad
[\mathrm{R\cdot}] = [\mathrm{R\cdot}]_0\,e^{\phi t}.
$$
$\phi > 0$ 时混合气**爆炸**：载体种群指数增长，放热随之而来，反应在 $1/\phi$ 的时间尺度上失控——是毫秒而非秒。条件 $\phi > 0$ 是一场赛跑：有势垒的步骤（分支，高温有利）对无势垒的步骤（终止，高压有利——三分子损失多得一个因子 $[\mathrm{M}]$——小容器也有利，因为 $k_\mathrm{w}$ 随容器缩小而增大）。
:::

::: definition 爆炸极限与爆炸半岛 {#def-explosion-limits}
在 $\mathrm{H_2 + O_2}$（固定 2 : 1 混合）的压力–温度图上，**爆炸半岛**是 $\phi > 0$ 的区域。其**下限** $p_\mathrm{L}$ 位于低压处，那里 $\mathrm{H\cdot}$ 的壁毁灭（对 $[\mathrm{R\cdot}]$ 一级，速率常数 $k_\mathrm{w}$ 大致与压力无关）跑赢分支（对压力二级，$\propto p^2$）；向上越过 $p_\mathrm{L}$，分支获胜。$p_\mathrm{L}$ 随温度陡降，随容器变窄而升高（扩散使 $k_\mathrm{w} \propto 1/r^2$）。**第二极限** $p_\mathrm{U}$ 位于高压处，那里无能垒的三分子终止 $\mathrm{H + O_2 + M}$（速率 $\propto p^3$）反超分支（速率 $\propto p^2$），混合气重新变慢。$p_\mathrm{L}$ 与 $p_\mathrm{U}$ 之间：爆炸；之外：安静反应或无反应。压力再高还会出现第三个热爆炸极限，混合气自燃。
:::

::: widget plot
f: 1; a/x; b*x
x: 0.1, 14
y: 0, 3
sliders: a=0.5:0.1:1.0:0.1; b=0.1:0.02:0.3:0.01
labels: \text{分支}; \text{壁损失}; \text{三分子损失}
caption: 两条自由基损失通道除以分支速率，对总压 $x$（任意单位）作图。壁损失相对分支按 $a/x$ 下降（分支是双分子的，壁损失不是），三分子损失按 $b\,x$ 上升（多一个因子 $[\mathrm{M}]$）。混合气在*两条*曲线都落在分支线之下时爆炸——$x = a$ 与 $x = 1/b$ 之间：这就是半岛。把 $b$ 滑大（降温：三分子捕获得利），爆炸区从右边收缩；把 $a$ 滑大（容器变小），爆炸区从左边收缩。氢氧爆炸图的每一个特征都在这两条曲线里。
:::

::: example 爆炸极限的标度 {#ex-explosion-scale}
某氢氧混合气恰位于其第二爆炸极限，三分子终止速率恰等于分支速率。恒组成恒温下把总压加倍，比值（三分子终止）/（分支）变为多少倍？比值（壁损失）/（分支）又如何？
::: solution
分支是双分子的：速率 $\propto [\mathrm{H\cdot}][\mathrm{O_2}] \propto p^2$。三分子终止是三分子的：速率 $\propto [\mathrm{H\cdot}][\mathrm{O_2}][\mathrm{M}] \propto p^3$。两者之比因此按 $p$ 变化，压力加倍使其乘 $2$：本已处于极限的混合气被推到*非爆炸*一侧——第二极限之上，三分子捕获扼死了链。单位体积的壁损失 $\propto [\mathrm{H\cdot}] \propto p$，对分支 $\propto p^2$，故壁损失之比*减半*：压力加倍对壁有利、对第三体有害。半岛恰是两种损失都赢不了的区间。
:::
:::

**把安全说明白。**链分支正是氢氧与氢空混合气在宽组成范围内具有爆炸性的原因，也是危险性不仅取决于化学品本身、还取决于压力、温度、容器大小与表面的原因：同一混合气在燃烧管里是安静的火焰，在密闭容器里却是爆轰。工业上用氢的方式正据此而来——通风使组成低于可燃范围、惰化、阻火器、泄爆——本课对该现象仅作教育与工业层面的讨论。热力学不是安全裕度：室温下 $\mathrm{H_2 + \tfrac12 O_2 \rightarrow H_2O}$ 带着 $\Delta_\mathrm{r}G^\circ \approx -229\ \mathrm{kJ\,mol^{-1}}$ 蓄势待发，却在烧瓶里安坐了几个世纪；决定它是一年走完还是毫秒走完的，是*载体的动力学*。

## 链的引发、终止与抑制

链可以热引发（热致键均裂——燃烧的引发）、光引发（一个光子、一对载体、以及一个度量链长的量子产率），或由加入的自由基引发剂引发——引发剂在选定温度下碎裂，提供稳定的 $r_\mathrm{i}$；聚合物化学全靠这三种方式运转。能拦下链的，是任何比传递更快地截获载体的东西：氧气本身就抑制许多自由基链；**抑制剂**与**抗氧化剂**在远低于反应物的浓度下起作用，方式是向链载体自由基提供一个氢原子——对脂质过氧化即 $\mathrm{ROO\cdot} + \mathrm{ArOH} \rightarrow \mathrm{ROOH} + \mathrm{ArO\cdot}$——其中芳氧基自由基 $\mathrm{ArO\cdot}$ 因离域而稳定，根本不肯重回链中。酚类抗氧化剂（丁基羟基甲苯家族，以及生物体内的生育酚）就是这样工作的；商品级的它们，危险性分类不过是普通有机增敏剂/刺激剂，其功能是捕获自由基，而不是毒物。抑制的动力学签名是**诱导期**：抑制剂耗尽之前反应全速进行，之后恢复——这是测捕获速率常数的秒表方法。

::: history
博登斯坦（Bodenstein）1913 年从链机理导出了氢–溴方程，同年他还把"活性中间体处于恒定小浓度"——稳态——这一想法形式化，其学派花了二十年把方程的每一项逐一用实验证实。把稳态方法表述为联立方程 $\mathrm{d}[\text{中间体}]/\mathrm{d}t = 0$ 的一般形式，独立地归功于克里斯琴森（Christiansen，1919）与欣谢尔伍德（Hinshelwood），后者把链动力学建成了气相与液相反应的普遍理论。谢苗诺夫（Semyonov）从爆炸一侧进攻同一问题，1956 年诺贝尔化学奖由谢苗诺夫与欣谢尔伍德分享，"以表彰他们对气相反应化学动力学的研究"。泽尔多维奇（Zeldovich）在 1940 年代认定了链分支——$\mathrm{H + O_2}$ 步骤及其与三分子终止的竞争——给燃烧与爆轰理论提供了核心机理；[[#def-explosion-limits]]的爆炸半岛正是他的动力学绘出的地图。
:::

::: quiz
测得某气相链对热引发剂 $\mathrm{I}$ 的速率正比于 $[\mathrm{I}]^{1/2}$。这个指数诊断出什么？
- [x] 气相中自由基–自由基复合终止：两个载体同归于尽，故稳态载体水平按生育率的平方根变化。
- [ ] 器壁终止：每个载体单独死去，这总是给出半次幂。
- [ ] 传递循环中有一个三分子基元步骤。
- [ ] 反应总级数为二，且引发剂被消耗一半。
::: solution
第一个选项——见[[#prop-half-order]]：双分子终止使 $[\mathrm{X\cdot}]_\text{ss} = (r_\mathrm{i}/2k_\mathrm{t})^{1/2}$，而 $r_\mathrm{i} \propto [\mathrm{I}]$ 给出半级数。壁终止给出*一次*幂（第二个选项恰好说反）。第三个选项把级数误读成分子数，即[[#warn-chain-length]]所指之误；第四个选项把单一物种的级数与总级数、化学计量混为一谈。
:::
:::

## 后续内容

终止链的壁、第三体与表面是真正意义上的表面，[[kinetics/surface-kinetics]] 认真对待它们——吸附、多相引发与自由基的催化毁灭，不过是把壁当作反应物的同一套载体记账。载体源于催化剂的链（聚合与自氧化中的自由基链）与 [[kinetics/homogeneous-catalysis]] 的催化循环相遇，那里稳态被用于催化剂本身。量子产率在本课作为链长探针登场，而在 [[kinetics/photochemistry]] 中它本身是一门学问——初级过程、敏化、闪光光解。至于"哪次碰撞使链分支"的态–态问题，见 [[kinetics/reaction-dynamics]]。

::: summary
- 链反应自己养活自己：引发生育载体，传递周转而不净消耗载体，抑制把载体改道回去，终止杀死它们；链长 $\nu$ = 传递速率 / 引发速率，数的是每次生育的周转数。
- 链以微小载体种群给出大速率，因为速率 $= k_\mathrm{p}[\text{carrier}][\mathrm{M}]$，$k_\mathrm{p}$ 很大且 $\nu$ 可达 $10^{6}$；载体隐形却掌权。
- 双分子终止的稳态给出 $[\mathrm{X\cdot}]_\text{ss} = (r_\mathrm{i}/2k_\mathrm{t})^{1/2}$、速率 $\propto r_\mathrm{i}^{1/2}$：对引发剂或光强的级数诊断链如何死去（½：成对同死；1：单独死去，在壁上或陷阱上）。
- 博登斯坦的五步机理配合对 $\mathrm{H\cdot}$ 与 $\mathrm{Br\cdot}$ 的稳态，导出 $\mathrm{d}[\mathrm{HBr}]/\mathrm{d}t = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}/(1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}])$：分子是平方根链，分母是产物抑制。
- 与机理相容的速率方程支持机理却永不证明机理——其他机理也能再现 HBr 方程；机理之所以被相信，靠的是动力学之外的佐证。
- $\mathrm{H_2 + Cl_2}$ 没有抑制步骤（从 HCl 夺氢很慢）且终止是三分子的，故链长达 $10^{4}$–$10^{6}$，量子产率度量之。
- 链分支（$\mathrm{H + O_2 \rightarrow OH + O}$）使载体成倍增长；分支速率超过一切终止（$\phi > 0$）即爆炸，载体指数增长。爆炸半岛位于壁损失下限与三分子第二极限之间，依赖压力、温度与容器大小。
- 抑制剂以低浓度捕获自由基而终止链，动力学上表现为诱导期；量子产率、半级数与诱导时间是链机理的三大经典指纹。
:::

## 练习

::: exercise 由速率求链长 {level=1 check="180000"}
某光化学链的引发速率为 $2.0\times10^{-8}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，反应物消耗速率为 $3.6\times10^{-3}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$。链长 $\nu$ 是多少？（输入无量纲的 $\nu$。）
::: solution
$\nu = v/r_\mathrm{i} = 3.6\times10^{-3} / 2.0\times10^{-8} = 1.8\times10^{5}$。每次引发事件在终止前交付约 $180\,000$ 次传递循环。
:::
:::

::: exercise 量子产率 {level=1 check="30000"}
某光化学反应在反应器中每秒吸收 $2.5\times10^{-9}\ \mathrm{mol}$ 光子，并以 $7.5\times10^{-5}\ \mathrm{mol\,s^{-1}}$ 转化反应物。设每个光子引发一条链、每个循环消耗一个分子，量子产率是多少？（输入 $\Phi$。）
::: solution
$\Phi = 7.5\times10^{-5} / 2.5\times10^{-9} = 3.0\times10^{4}$。远大于 1 的产率证明存在链：光子是扳机，不是试剂。
:::
:::

::: exercise 引发剂四倍 {level=1 check="2"}
某双分子终止的链在引发剂浓度 $[\mathrm{I}]$ 下以速率 $v$ 进行。若 $[\mathrm{I}]$ 四倍（终止机理不变），速率变为多少倍？（输入倍数。）
::: solution
速率 $\propto r_\mathrm{i}^{1/2} \propto [\mathrm{I}]^{1/2}$，故倍数为 $\sqrt{4} = 2$。四倍的引发剂只换来两倍的速率，因为多出来的载体互相杀得更快：这种亚线性正是成对终止的实验签名。
:::
:::

::: exercise 计算 HBr 方程 {level=2 check="0.0000527"}
设 $k = 1.0\times10^{-2}\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1}}$、$k' = 10$，求 $[\mathrm{H_2}] = 0.100$、$[\mathrm{Br_2}] = 0.100$、$[\mathrm{HBr}] = 0.050\ \mathrm{mol\,dm^{-3}}$ 时的 $\mathrm{d}[\mathrm{HBr}]/\mathrm{d}t$。（以 $\mathrm{mol\,dm^{-3}\,s^{-1}}$ 输入速率。）
::: solution
$v = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}/(1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}]) = (1.0\times10^{-2})(0.100)(0.3162)/(1 + 10\times0.50) = 3.162\times10^{-4}/6 = 5.27\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$。分母为 6：在此组成下抑制已把速率砍到无抑制值的六分之一。
:::
:::

::: exercise 压力与第二极限 {level=2 check="2"}
某氢氧混合气的第二爆炸极限处，三分子终止恰与分支平衡。恒组成恒温下总压加倍，比值（三分子终止）/（分支）变为多少倍？（输入倍数。）
::: solution
分支 $\propto p^2$，三分子终止 $\propto p^3$，故比值 $\propto p$，倍数为 $2$。混合气移到第二极限之上，变为非爆炸：多出来的第三体扼死链的速度快于分支增长的速度。
:::
:::

::: exercise 稳态载体浓度 {level=2 check="0.00000001"}
某链的 $r_\mathrm{i} = 2.0\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$，双分子终止 $k_\mathrm{t} = 1.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。求 $[\mathrm{X\cdot}]_\text{ss}$。（以 $\mathrm{mol\,dm^{-3}}$ 输入。）
::: solution
$[\mathrm{X\cdot}]_\text{ss} = (r_\mathrm{i}/2k_\mathrm{t})^{1/2} = (2.0\times10^{-6}/2.0\times10^{10})^{1/2} = (1.0\times10^{-16})^{1/2} = 1.0\times10^{-8}\ \mathrm{mol\,dm^{-3}}$。十纳摩尔的载体——而 $k_\mathrm{p}[\mathrm{M}] \sim 10^{3}\ \mathrm{s^{-1}}$ 之下，它们仍驱动着 $10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ 的速率。
:::
:::

::: exercise 链的两种死法 {level=3}
某链的引发速率为 $r_\mathrm{i}$，传递 $\mathrm{X\cdot} + \mathrm{M} \rightarrow$ 产物 $+\ \mathrm{X\cdot}$ 速率常数为 $k_\mathrm{p}$，双分子终止 $2\,\mathrm{X\cdot} \rightarrow$ 死产物常数为 $k_\mathrm{t}$，*另有*壁终止 $\mathrm{X\cdot} \rightarrow$ 死产物、一级常数 $k_\mathrm{w}$。用稳态导出速率方程，并求两个极限形式：(a) 双分子终止为主；(b) 壁终止为主。哪个极限下速率依赖容器大小？为何这一观测在历史上具有决定性？
::: solution
载体收支为 $\mathrm{d}[\mathrm{X\cdot}]/\mathrm{d}t = r_\mathrm{i} - 2k_\mathrm{t}[\mathrm{X\cdot}]^2 - k_\mathrm{w}[\mathrm{X\cdot}] \approx 0$，是一元二次方程，
$$
[\mathrm{X\cdot}]_\text{ss} = \frac{-k_\mathrm{w} + \left(k_\mathrm{w}^2 + 8k_\mathrm{t}r_\mathrm{i}\right)^{1/2}}{4k_\mathrm{t}},
\qquad
v = k_\mathrm{p}[\mathrm{M}][\mathrm{X\cdot}]_\text{ss}.
$$
(a) 若 $8k_\mathrm{t}r_\mathrm{i} \gg k_\mathrm{w}^2$：$[\mathrm{X\cdot}]_\text{ss} \to (r_\mathrm{i}/2k_\mathrm{t})^{1/2}$，$v = k_\mathrm{p}[\mathrm{M}](r_\mathrm{i}/2k_\mathrm{t})^{1/2}$——半级数律，与容器无关。(b) 若 $k_\mathrm{w}^2 \gg 8k_\mathrm{t}r_\mathrm{i}$：根式展开为 $k_\mathrm{w}\bigl[1 + 4k_\mathrm{t}r_\mathrm{i}/k_\mathrm{w}^2 + \cdots\bigr]$，得 $[\mathrm{X\cdot}]_\text{ss} \to r_\mathrm{i}/k_\mathrm{w}$、$v = k_\mathrm{p}[\mathrm{M}]\,r_\mathrm{i}/k_\mathrm{w}$——对引发一级，且正比于 $k_\mathrm{w}$，而 $k_\mathrm{w}$ 按扩散随容器半径以 $1/r^2$ 标度。历史上的决定性：早期光氯化的产率被发现依赖容器——对表面敏感的链死亡——这是任何单步机理都无法容纳的，并在任何人看到载体之前就把链的解释定了下来。
:::
:::

::: exercise 爆炸混合气的时钟 {level=3 check="0.00069"}
在某温度与压力下，某氢氧混合气的 $k_\mathrm{b}[\mathrm{O_2}] = 3.0\times10^{4}\ \mathrm{s^{-1}}$，$k_\mathrm{t}[\mathrm{O_2}][\mathrm{M}] + k_\mathrm{w} = 1.0\times10^{4}\ \mathrm{s^{-1}}$。载体浓度自一个小的稳定源出发增长 $10^{6}$ 倍需要多久？（以秒输入时间。）
::: solution
$\phi = 3.0\times10^{4} - 1.0\times10^{4} = 2.0\times10^{4}\ \mathrm{s^{-1}}$，$[\mathrm{R\cdot}]$ 按 $e^{\phi t}$ 增长，故
$$
t = \frac{\ln 10^{6}}{\phi} = \frac{13.8}{2.0\times10^{4}} = 6.9\times10^{-4}\ \mathrm{s}.
$$
从载体到百万倍的雪崩只需一毫秒——这就是为什么在化学里"爆炸"与"快反应"是同一个词，也是为什么一旦 $\phi$ 随温度增大，爆轰的诱导期就要以微秒计。
:::
:::
