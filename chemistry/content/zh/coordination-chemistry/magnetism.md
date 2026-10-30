把一管粉末状七水合硫酸铁(II)挂在分析天平上，使其下端置于磁极之间，管子就好像变重了：它被吸进磁场。换成三水六氰合铁(II)酸钾来做，管子却略微变*轻*，被推出磁场。这个实验——**古埃法**——是最早用来数出配合物中未成对电子数的方法，它在 1930 与 1940 年代给出的计数，是[[coordination-chemistry/crystal-field-theory#prop-spin-state]]高、低自旋组态的最有力证据。磁学测量至今仍是回答新配合物结构问题最快的办法之一：这个镍(II)配合物是平面正方形还是四面体？这个铁(II)是高自旋还是低自旋，随温度改变吗？这个铜(II)化合物是二聚体吗？

本章把这一测量变成一个未成对电子数。先从磁化强度与磁化率的定义出发，由玻尔兹曼分布导出居里定律，得到有效磁矩的仅自旋公式。然后解释许多配合物为何偏离该公式——配体场未能完全淬灭的轨道角动量使然——并描述**自旋交叉**：配合物随温度在高、低自旋之间切换；以及相邻金属上自旋的耦合如何导致反铁磁性。

## 磁化强度与磁化率

::: definition 磁化率 {#def-susceptibility}
强度为 $H$ 的磁场中的样品获得**磁化强度** $M$（单位体积的磁偶极矩）。对大多数物质，在通常磁场下 $M$ 与 $H$ 成正比：
$$
M = \chi H,
$$
其中 $\chi$ 是无量纲的**体积磁化率**（SI）。**摩尔磁化率**为 $\chi_\mathrm{m} = \chi V_\mathrm{m} = \chi M_\mathrm{r}/\rho$，单位 $\mathrm{m^3\,mol^{-1}}$。$\chi < 0$ 的物质是**抗磁性**的，被推出磁场；$\chi > 0$ 的是**顺磁性**的，被吸进磁场。配位化学文献大量使用 cgs 单位，其中 $\chi_\mathrm{m}$ 以 $\mathrm{cm^3\,mol^{-1}}$ 计，且 $\chi_\mathrm{m}(\mathrm{SI}) = 4\pi\times10^{-6}\,\chi_\mathrm{m}(\mathrm{cgs})$。
:::

一切物质都有抗磁性：外场在每个闭壳层中感应出环流，按楞次定律，其磁矩反抗外场。抗磁性很小（典型配合物 $\chi_\mathrm{m} \approx -10^{-10}$ 到 $-10^{-9}\ \mathrm{m^3\,mol^{-1}}$），且与温度无关。未成对电子给出的顺磁贡献大一到三个数量级，并随温度下降，因为热运动使磁矩取向杂乱化。实测磁化率是两者之和；在解释顺磁部分之前，要用按原子和键列表的增量（**帕斯卡常数**）减去抗磁部分。对含大有机配体的精确工作，这一校正不可忽略。

### 磁化率的测量

古埃磁天平测量悬挂在不均匀场中的长圆柱样品所受的力。**法拉第磁天平**对处于恒定场梯度的小样品作同样的测量。现代工作使用**超导量子干涉仪（SQUID）磁强计**，它从约 $2\ \mathrm{K}$ 到 $400\ \mathrm{K}$ 测量毫克级样品的磁矩。溶液中的测量用**埃文斯法**，它基于 NMR：溶在顺磁溶液里的参比化合物，与装在纯溶剂内插毛细管中的同种化合物相比，共振频率略有不同，因为两处的体积磁化率不同。对置于超导磁体（磁场平行于管轴）中的圆柱形样品，在谱仪频率 $f$ 下的频移 $\Delta f$ 给出
$$
\chi_\mathrm{m} = \frac{3\,\Delta f}{f\,c},
$$ {#eq-evans}
其中 $c$ 为顺磁物种的浓度，以 $\mathrm{mol\,m^{-3}}$ 计，$\chi_\mathrm{m}$ 以 $\mathrm{m^3\,mol^{-1}}$（SI）计，且已对溶质的抗磁性作校正。

## 居里定律与仅自旋公式

单个电子自旋的磁矩为 $\boldsymbol\mu = -g_e\mu_\mathrm{B}\mathbf{s}/\hbar$，其中 $\mu_\mathrm{B} = e\hbar/2m_e = 9.274\times10^{-24}\ \mathrm{J\,T^{-1}}$ 是**玻尔磁子**，$g_e = 2.0023$。总自旋为 $S$、无轨道角动量的配合物有 $2S + 1$ 个态 $M_S = S, S - 1, \dots, -S$，磁场 $B$ 按**塞曼效应**在能量上把它们分开，
$$
E(M_S) = g\mu_\mathrm{B}BM_S.
$$

::: proposition 居里定律 {#prop-curie}
对 $g$ 值为 $g$ 的一组无相互作用的自旋 $S$ 系综，在 $g\mu_\mathrm{B}B \ll k_\mathrm{B}T$ 的极限下，摩尔磁化率为
$$
\chi_\mathrm{m} = \frac{\mu_0 N_\mathrm{A} g^2\mu_\mathrm{B}^2 S(S+1)}{3k_\mathrm{B}T} = \frac{C}{T}.
$$ {#eq-curie}
常数 $C$ 是**居里常数**。这一结果假定只有基态的 $2S + 1$ 个塞曼能级有布居，且它们对场的依赖只有线性的塞曼项。
:::

::: proof
处于态 $M_S$ 的分子沿场的磁矩为 $\mu_z = -\partial E/\partial B = -g\mu_\mathrm{B}M_S$。由玻尔兹曼分布（[[statistical-thermodynamics/boltzmann-distribution]]），平均磁矩为
$$
\langle\mu_z\rangle = \frac{\sum_{M_S} (-g\mu_\mathrm{B}M_S)\,e^{-g\mu_\mathrm{B}BM_S/k_\mathrm{B}T}}{\sum_{M_S} e^{-g\mu_\mathrm{B}BM_S/k_\mathrm{B}T}}.
$$
记 $x = g\mu_\mathrm{B}B/k_\mathrm{B}T \ll 1$，把指数展开到一阶，$e^{-xM_S} \approx 1 - xM_S$。由于 $\sum M_S = 0$，分母为 $2S + 1$，分子为 $-g\mu_\mathrm{B}\sum M_S(1 - xM_S) = g\mu_\mathrm{B}x\sum M_S^2$。利用 $\sum_{M_S=-S}^{S} M_S^2 = \tfrac13 S(S+1)(2S+1)$，
$$
\langle\mu_z\rangle = \frac{g\mu_\mathrm{B}x\,S(S+1)(2S+1)/3}{2S+1} = \frac{g^2\mu_\mathrm{B}^2 S(S+1)}{3k_\mathrm{B}T}\,B.
$$
每摩尔的磁化强度为 $N_\mathrm{A}\langle\mu_z\rangle$，又 $B = \mu_0 H$（顺磁体自身对场的贡献可忽略），摩尔磁化率即 $\chi_\mathrm{m} = N_\mathrm{A}\langle\mu_z\rangle/H = \mu_0 N_\mathrm{A}g^2\mu_\mathrm{B}^2S(S+1)/3k_\mathrm{B}T$。在高场或低温下 $x$ 不再小，完整的求和给出布里渊函数，磁化强度饱和于 $N_\mathrm{A}g\mu_\mathrm{B}S$。
:::

由于 $\chi_\mathrm{m}$ 依赖于温度，化学家改而报告**有效磁矩**，其定义使居里定律具有一个可在场中自由取向的经典磁矩 $\mu_\mathrm{eff}$（以 $\mu_\mathrm{B}$ 为单位）的形式：
$$
\chi_\mathrm{m} = \frac{\mu_0 N_\mathrm{A}\mu_\mathrm{B}^2\mu_\mathrm{eff}^2}{3k_\mathrm{B}T}
\quad\Longrightarrow\quad
\mu_\mathrm{eff} = \sqrt{\frac{3k_\mathrm{B}}{\mu_0N_\mathrm{A}\mu_\mathrm{B}^2}}\sqrt{\chi_\mathrm{m}T} = 797.7\sqrt{\chi_\mathrm{m}T},
$$ {#eq-mueff}
其中 $\chi_\mathrm{m}$ 以 $\mathrm{m^3\,mol^{-1}}$ 计，$T$ 以 K 计。cgs 单位下同一关系为 $\mu_\mathrm{eff} = 2.828\sqrt{\chi_\mathrm{m}T}$，$\chi_\mathrm{m}$ 以 $\mathrm{cm^3\,mol^{-1}}$ 计。与[[#eq-curie]]对比，取 $g = 2$、$S = n/2$（$n$ 为未成对电子数）：

::: definition 仅自旋磁矩 {#def-spin-only}
$n$ 个未成对电子、无轨道贡献的配合物的**仅自旋**有效磁矩为
$$
\mu_\mathrm{so} = g\sqrt{S(S+1)} = \sqrt{n(n+2)}\ \mu_\mathrm{B},
$$ {#eq-spin-only}
取 $g = 2$。各值为 $1.73$（$n = 1$）、$2.83$（$n = 2$）、$3.87$（$n = 3$）、$4.90$（$n = 4$）与 $5.92\ \mu_\mathrm{B}$（$n = 5$）。
:::

相邻值之间的间隔约 $1\ \mu_\mathrm{B}$，大于偏离仅自旋行为的通常偏差，所以实测的 $\mu_\mathrm{eff}$ 几乎总能明确指认 $n$。

::: example 由磁化率求未成对电子数 {#ex-unpaired}
(a) 经抗磁校正后，$\mathrm{K_3[Fe(C_2O_4)_3]\cdot3H_2O}$ 样品在 $298\ \mathrm{K}$ 的 $\chi_\mathrm{m} = 1.84\times10^{-7}\ \mathrm{m^3\,mol^{-1}}$。求 $\mu_\mathrm{eff}$ 与未成对电子数。(b) $\mathrm{K_3[Fe(CN)_6]}$ 的 $\mu_\mathrm{eff} = 2.3\ \mu_\mathrm{B}$。请解释。
::: solution
(a) 由[[#eq-mueff]]，$\mu_\mathrm{eff} = 797.7\sqrt{1.84\times10^{-7} \times 298} = 797.7\sqrt{5.483\times10^{-5}} = 797.7 \times 7.405\times10^{-3} = 5.91\ \mu_\mathrm{B}$。最接近的仅自旋值是 $n = 5$ 的 $5.92$；下一个，$n = 4$ 的 $4.90$，差着整整一个玻尔磁子。铁(III)为 $d^5$，草酸根是弱场，所以配合物是高自旋，$t_{2g}^3e_g^2$，有五个未成对电子，基态 $A_{1g}$ 无轨道贡献。(b) 氰是强场，铁(III)为低自旋，$t_{2g}^5$，一个未成对电子，$\mu_\mathrm{so} = 1.73\ \mu_\mathrm{B}$。实测 $2.3\ \mu_\mathrm{B}$ 偏高，因为 $^2T_{2g}$ 基态带有轨道贡献，这正是下一节的主题。
:::
:::

仅自旋公式也是对*数据*的检验。由于 $d^5$ 只能有一个、三个或五个未成对电子，某铁(III)配合物若测得 $5.0\ \mu_\mathrm{B}$ 这样的磁矩，指向的是样品不纯或抗磁校正不完全，而不是一种新的自旋状态：一个与任何可能组态都不符的结果，是测量有误的信号。

::: widget plot
f: 1/x; 1/(x - t); 1/(x + t)
x: 0, 300
y: 0, 0.1
sliders: t=30:0:100:5
labels: \text{居里}; \text{居里-外斯},\ \theta > 0; \text{居里-外斯},\ \theta < 0
caption: 磁化率（任意单位，居里常数 $C = 1$）对温度 $x$（以 K 计）。第一条曲线是[[#prop-curie]]的居里定律 $\chi = C/T$。其余遵循**居里-外斯定律** $\chi = C/(T - \theta)$，外斯常数 $\theta = \pm t$（滑块）。正的 $\theta$ 描述相邻磁矩倾向于平行排列（铁磁相互作用）；负的 $\theta$ 描述倾向于反平行（反铁磁相互作用），此时低温磁化率降到居里值以下。作 $1/\chi$ 对 $T$ 图，每条定律都变成直线，其在温度轴上的截距就是 $\theta$。对磁稀释的配合物，$|\theta|$ 只有几开尔文，居里定律在约 $20\ \mathrm{K}$ 以上很好地成立。
:::

## 轨道贡献

处在具有角动量的轨道上的电子，因其轨道运动还有一个附加磁矩，自由离子的磁矩取决于 $L$、$S$ 与 $J$。在配合物中，配体场很大程度上破坏（**淬灭**）了轨道贡献，因为场解除了轨道运动所必需的简并。绕一轴的轨道角动量要求电子能够环流：它的轨道能绕该轴旋转变成另一个等价的简并轨道，且目标轨道没有被自旋相同的电子占据。

::: proposition 轨道角动量何时存活 {#prop-orbital}
八面体配合物中，只有当基态是轨道三重简并（$T_{1g}$ 或 $T_{2g}$）时，基态才对磁矩有轨道贡献。$A$ 或 $E$ 基态的配合物无一阶轨道贡献，其磁矩接近仅自旋值，仅由一个小的二阶项修正
$$
\mu_\mathrm{eff} = \mu_\mathrm{so}\left(1 - \frac{\alpha\lambda}{\Delta_\mathrm{o}}\right), \qquad \alpha = 4\ (A_2\ \text{基态}),\quad \alpha = 2\ (E\ \text{基态}),
$$ {#eq-so-correction}
其中 $\lambda$ 是基谱项的自旋-轨道耦合常数（壳层不到半满时 $\lambda > 0$，超过半满时 $\lambda < 0$）。
:::

::: proof
$t_{2g}$ 轨道中的 $d_{xz}$ 与 $d_{yz}$ 在绕 $z$ 转 $90^\circ$ 时互相变换，而且二者简并，所以只要另一个没有被自旋相同的电子占据，处于其中一个的电子就能绕 $z$ 环流；$d_{xy}$、$d_{yz}$ 绕 $x$ 以及 $d_{xy}$、$d_{xz}$ 绕 $y$ 同理。相反，$d_{x^2-y^2}$ 必须转到 $d_{xy}$（绕 $z$ 转 $45^\circ$）里去，而后者在八面体场中相差 $\Delta_\mathrm{o}$；$d_{z^2}$ 则转不到任何别的 $d$ 轨道。所以 $e_g$ 组不携带轨道角动量；$t_{2g}$ 组只有占据不均时才有，即 $t_{2g}^1$、$t_{2g}^2$、$t_{2g}^4$、$t_{2g}^5$，恰好是具有 $T$ 基态的那些组态。组态 $t_{2g}^3$ 与 $t_{2g}^6$（无论有无 $e_g$ 电子）为 $A$ 或 $E$ 基态，已被淬灭。

至于二阶项，自旋-轨道耦合 $\lambda\mathbf{L}\cdot\mathbf{S}$ 把位于 $\Delta_\mathrm{o}$ 之上、确实携带轨道角动量的激发 $T_{2g}$ 态混入一点到 $A_{2g}$ 基态里。二阶微扰论给出正比于 $\lambda/\Delta_\mathrm{o}$ 的感生轨道磁矩，使有效 $g$ 值移动为 $g = 2(1 - \alpha\lambda/\Delta_\mathrm{o})$，再由 $\mu_\mathrm{eff} = g\sqrt{S(S+1)}$ 得[[#eq-so-correction]]。系数 $\alpha$ 来自 $\mathbf{L}$ 在基态与激发态之间的矩阵元（$A_2$ 为 4，$E$ 为 2）。$\lambda$ 的符号由洪特第三规则决定：$d^1$–$d^4$ 为正，$d^6$–$d^9$ 为负。
:::

表格比较了常见高自旋八面体离子在室温下的仅自旋磁矩与实测磁矩（典型范围，引自菲吉斯（Figgis）与刘易斯（Lewis）的汇编）。

| 离子 | $d^n$ | 基态 | $n$ | $\mu_\mathrm{so}$ | 实测 $\mu_\mathrm{eff}$ |
|---|---|---|---|---|---|
| $\mathrm{Ti^{3+}}$ | $d^1$ | $^2T_{2g}$ | 1 | 1.73 | 1.6–1.8 |
| $\mathrm{V^{3+}}$ | $d^2$ | $^3T_{1g}$ | 2 | 2.83 | 2.7–2.9 |
| $\mathrm{Cr^{3+}}$ | $d^3$ | $^4A_{2g}$ | 3 | 3.87 | 3.7–3.9 |
| $\mathrm{Mn^{2+}}$ | $d^5$ | $^6A_{1g}$ | 5 | 5.92 | 5.6–6.1 |
| $\mathrm{Fe^{2+}}$ | $d^6$ | $^5T_{2g}$ | 4 | 4.90 | 5.1–5.7 |
| $\mathrm{Co^{2+}}$ | $d^7$ | $^4T_{1g}$ | 3 | 3.87 | 4.3–5.2 |
| $\mathrm{Ni^{2+}}$ | $d^8$ | $^3A_{2g}$ | 2 | 2.83 | 2.9–3.3 |
| $\mathrm{Cu^{2+}}$ | $d^9$ | $^2E_g$ | 1 | 1.73 | 1.7–2.2 |

$A$ 与 $E$ 离子（$\mathrm{Cr^{3+}}$、$\mathrm{Mn^{2+}}$、$\mathrm{Ni^{2+}}$、$\mathrm{Cu^{2+}}$）接近仅自旋值：$d^3$（$\lambda > 0$）略低，$d^8$、$d^9$（$\lambda < 0$）偏高，与[[#eq-so-correction]]的预言完全一致。$T$ 离子偏离更大，钴(II)最甚。对较早的 $T$ 离子（$d^1$、$d^2$），室温下磁矩*低于*仅自旋值，降温后进一步下降，因为 $T$ 态内部的自旋-轨道耦合把它分裂成若干能级，而这些能级的布居随温度变化：居里定律对它们不成立。

::: example 镍(II)、铬(III)与铜(II)的自旋-轨道修正 {#ex-so}
用[[#eq-so-correction]]估算 (a) $\mathrm{[Ni(H_2O)_6]^{2+}}$（$\Delta_\mathrm{o} = 8500\ \mathrm{cm^{-1}}$，$\lambda = -315\ \mathrm{cm^{-1}}$）、(b) $\mathrm{[Cr(H_2O)_6]^{3+}}$（$\Delta_\mathrm{o} = 17\,400\ \mathrm{cm^{-1}}$，$\lambda = +92\ \mathrm{cm^{-1}}$）、(c) $\mathrm{[Cu(H_2O)_6]^{2+}}$（$\Delta_\mathrm{o} \approx 12\,500\ \mathrm{cm^{-1}}$，$\lambda = -830\ \mathrm{cm^{-1}}$）的 $\mu_\mathrm{eff}$。
::: solution
(a) $A_{2g}$，$\alpha = 4$：$\mu = 2.83(1 + 4 \times 315/8500) = 2.83 \times 1.148 = 3.25\ \mu_\mathrm{B}$，在实测范围内（水合离子为 3.2–3.3）。(b) $A_{2g}$，$\alpha = 4$：$\mu = 3.87(1 - 4 \times 92/17\,400) = 3.87 \times 0.979 = 3.79\ \mu_\mathrm{B}$，与实测一致。(c) $E_g$，$\alpha = 2$：$\mu = 1.73(1 + 2 \times 830/12\,500) = 1.73 \times 1.133 = 1.96\ \mu_\mathrm{B}$，在铜(II)的实测范围内。铜——一个较晚、较收缩的 $3d$ 离子——的 $|\lambda|$ 很大，这就是它的偏差在三者中最大的原因。（这里用的是 $\lambda$ 的自由离子值；在配合物中共价性会把它降低，最多可达 30 %，所以这一符合只是半定量的。）
:::
:::

::: example 八面体还是四面体钴(II)？ {#ex-cobalt}
一种蓝色钴(II)配合物 $\mathrm{[CoX_2L_2]}$ 的 $\mu_\mathrm{eff} = 4.5\ \mu_\mathrm{B}$，一种粉红色异构材料的 $\mu_\mathrm{eff} = 5.1\ \mu_\mathrm{B}$。哪个可能是四面体，哪个是八面体（例如带桥联 X 的聚合物）？
::: solution
高自旋 $d^7$ 在两种几何构型下都有三个未成对电子（$\mu_\mathrm{so} = 3.87$）。八面体场中组态为 $t_{2g}^5e_g^2$，基态是 $^4T_{1g}$，带很大的一阶轨道贡献：磁矩 4.7–5.2 $\mu_\mathrm{B}$。四面体场中组态为 $e^4t_2^3$，基态是 $^4A_2$（$e$ 组全满、$t_2$ 组半满，无法环流），只剩[[#eq-so-correction]]的二阶贡献，其中 $\Delta_\mathrm{t}$ 小而 $\lambda$ 为负：4.4–4.8 $\mu_\mathrm{B}$。所以蓝色化合物（$4.5$）是四面体，粉红色那个（$5.1$）是八面体，与它们的颜色一致（[[coordination-chemistry/spectra-of-complexes]]：四面体钴(II)在红-橙区强吸收，看上去蓝；八面体钴(II)在蓝-绿区弱吸收，看上去粉）。磁学与光谱并用，比任一单独都更有说服力。
:::
:::

### 较重金属与温度无关顺磁性

对 $4d$ 与 $5d$ 金属，图像有两点变化。第一，它们的配合物几乎全是低自旋，所以未成对电子数很少。第二，自旋-轨道耦合常数随原子序数急剧增大（对给定价层大致按 $Z^2$ 到 $Z^4$），到 $5d$ 金属达到数千 $\mathrm{cm^{-1}}$，与室温下的 $k_\mathrm{B}T$（$207\ \mathrm{cm^{-1}}$）相当甚至更大。对 $T$ 基态，自旋-轨道耦合把该态分裂成间隔大于 $k_\mathrm{B}T$ 的能级，自旋磁矩与轨道磁矩在最低能级中部分抵消。$\mathrm{K_2[OsCl_6]}$ 中的低自旋锇(IV)（$t_{2g}^4$，$^3T_{1g}$，两个未成对电子，$\mu_\mathrm{so} = 2.83\ \mu_\mathrm{B}$）室温磁矩只有约 $1.5\ \mu_\mathrm{B}$，并随降温趋近于零，因为它的最低自旋-轨道能级不显磁性。小谷（Takeo Kotani）1949 年对这类 $T$ 态的处理给出 $\mu_\mathrm{eff}$ 作为 $k_\mathrm{B}T/|\lambda|$ 的函数；对重金属，仅自旋公式根本不再适用。

最后，即使没有未成对电子的配合物也能显示微小的、*与温度无关的*正磁化率。磁场把带轨道角动量的低激发态混入非简并基态（二阶塞曼效应），感生出一个不依赖玻尔兹曼布居的顺磁磁矩。这种**温度无关顺磁性**（TIP）约为 $10^{-9}\ \mathrm{m^3\,mol^{-1}}$ 量级，这就是同为 $d^0$ 的 $\mathrm{K[MnO_4]}$ 与 $\mathrm{K_2[CrO_4]}$ 呈弱顺磁性的原因；在解释小磁矩之前，必须连同抗磁性一起把它减掉。

::: example 抗磁校正有多重要？ {#ex-diamagnetic}
一个带大有机配体的镍(II)配合物在 $298\ \mathrm{K}$ 的摩尔磁化率实测值为 $4.95\times10^{-8}\ \mathrm{m^3\,mol^{-1}}$。由帕斯卡常数估计的抗磁贡献为 $-2.9\times10^{-9}\ \mathrm{m^3\,mol^{-1}}$。求校正前后各自的 $\mu_\mathrm{eff}$。
::: solution
实测值是顺磁与抗磁部分之和，$\chi_\mathrm{m} = \chi_\mathrm{para} + \chi_\mathrm{dia}$，所以 $\chi_\mathrm{para} = 4.95\times10^{-8} - (-2.9\times10^{-9}) = 5.24\times10^{-8}\ \mathrm{m^3\,mol^{-1}}$。未校正：$\mu_\mathrm{eff} = 797.7\sqrt{4.95\times10^{-8} \times 298} = 3.06\ \mu_\mathrm{B}$。校正后：$797.7\sqrt{5.24\times10^{-8} \times 298} = 3.15\ \mu_\mathrm{B}$。两者都指示两个未成对电子，所以结论仍然成立，但这一校正（$\mu_\mathrm{eff}$ 差 3 %，$\chi$ 差 6 %）与[[#ex-so]]的自旋-轨道效应一样大。任何依赖与仅自旋值之*偏差*的论证——比如区分八面体与四面体钴(II)——都需要这一校正。符号很容易弄错：抗磁性为负，所以作抗磁校正会使顺磁磁化率*增大*。
:::
:::

::: quiz
下列八面体配合物中，哪些的磁矩应接近仅自旋值？
- [x] $\mathrm{[Cr(NH_3)_6]^{3+}}$
- [ ] $\mathrm{[Ti(H_2O)_6]^{3+}}$
- [x] $\mathrm{[Ni(NH_3)_6]^{2+}}$
- [ ] $\mathrm{[Fe(CN)_6]^{3-}}$
- [x] $\mathrm{[Mn(H_2O)_6]^{2+}}$
::: solution
仅自旋行为（误差在小二阶修正之内）要求 $A$ 或 $E$ 基态。$\mathrm{Cr^{3+}}$，$t_{2g}^3$：$^4A_{2g}$。$\mathrm{Ni^{2+}}$，$t_{2g}^6e_g^2$：$^3A_{2g}$。高自旋 $\mathrm{Mn^{2+}}$，$t_{2g}^3e_g^2$：$^6A_{1g}$。$\mathrm{Ti^{3+}}$（$t_{2g}^1$，$^2T_{2g}$）与低自旋 $\mathrm{Fe^{3+}}$（$t_{2g}^5$，$^2T_{2g}$）的轨道简并 $T$ 基态带一阶轨道贡献。
:::
:::

## 自旋交叉

当 $\Delta_\mathrm{o}$ 与成对能几乎相等时，$d^4$–$d^7$ 配合物的高自旋态与低自旋态能量相近，温度可以在两者之间切换。最有名的例子是六个氮配体的铁(II)配合物，如 $\mathrm{[Fe(phen)_2(NCS)_2]}$、$\mathrm{[Fe(ptz)_6](BF_4)_2}$ 以及三唑类铁(II)聚合物。

::: proposition 自旋交叉平衡 {#prop-crossover}
把 $\mathrm{LS} \rightleftharpoons \mathrm{HS}$ 当作无相互作用分子之间的化学平衡处理，标准焓变 $\Delta H$ 与熵变 $\Delta S$（均为正）。处于高自旋态的分子分数为
$$
\gamma_\mathrm{HS}(T) = \frac{1}{1 + \exp\!\left[\dfrac{\Delta H}{R}\left(\dfrac{1}{T} - \dfrac{1}{T_{1/2}}\right)\right]}, \qquad T_{1/2} = \frac{\Delta H}{\Delta S},
$$ {#eq-crossover}
实测的 $\chi_\mathrm{m}T = \gamma_\mathrm{HS}(\chi_\mathrm{m}T)_\mathrm{HS} + (1 - \gamma_\mathrm{HS})(\chi_\mathrm{m}T)_\mathrm{LS}$。模型忽略了分子间的相互作用，而在固体中正是这些相互作用使许多转变陡峭得多，有时还带滞后。
:::

::: proof
平衡常数 $K = \gamma_\mathrm{HS}/(1 - \gamma_\mathrm{HS}) = \exp(-\Delta G/RT)$，其中 $\Delta G = \Delta H - T\Delta S$（[[thermodynamics/reaction-equilibrium]]）。解出 $\gamma_\mathrm{HS}$ 得 $\gamma_\mathrm{HS} = K/(1 + K) = 1/(1 + e^{\Delta G/RT})$。而 $\Delta G/RT = \Delta H/RT - \Delta S/R = (\Delta H/R)(1/T - \Delta S/\Delta H) = (\Delta H/R)(1/T - 1/T_{1/2})$，即得[[#eq-crossover]]。在 $T = T_{1/2}$ 处 $\Delta G = 0$，一半分子处于高自旋。低自旋态受焓驱动（它的晶体场稳定化能更大，键更短更强），高自旋态受熵驱动：它的自旋简并度更高，对铁(II)是 $2S + 1 = 5$ 比 $1$，贡献 $R\ln5 = 13.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$；它更长、更弱的键振动频率更低，因而具有更多振动熵。由于 $\Delta S > 0$，温度足够高时高自旋态总是占上风。
:::

::: widget plot
f: 1/(1 + exp(h*1000/8.314*(1/x - s/(h*1000)))); 3/(1 + exp(h*1000/8.314*(1/x - s/(h*1000))))
x: 20, 400
y: 0, 3.3
sliders: h=8.6:2:20:0.2; s=48.8:20:100:0.2
labels: \gamma_\mathrm{HS}; \chi_\mathrm{m}T\ /\ \mathrm{cm^3\,K\,mol^{-1}}
caption: 按[[#eq-crossover]]计算的自旋交叉对温度 $x$（以 K 计）。滑块设定 $\Delta H$（以 $\mathrm{kJ\,mol^{-1}}$ 计）与 $\Delta S$（以 $\mathrm{J\,K^{-1}\,mol^{-1}}$ 计）；起始值 $8.6\ \mathrm{kJ\,mol^{-1}}$ 与 $48.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 是佐来（Sorai）与关（Seki）对 $\mathrm{[Fe(phen)_2(NCS)_2]}$ 报道的量热值，给出 $T_{1/2} = 176\ \mathrm{K}$。第二条曲线是以 cgs 单位计的 $\chi_\mathrm{m}T$，取 $S = 2$、$g = 2$ 时的仅自旋值 $(\chi_\mathrm{m}T)_\mathrm{HS} = 0.125g^2S(S+1) = 3.0\ \mathrm{cm^3\,K\,mol^{-1}}$，低自旋取零。$\Delta S$ 固定时提高 $\Delta H$ 使转变温度升高；按比例同时提高两者则使转变变陡。真实化合物在几开尔文内完成自旋转变，远比这个无相互作用模型所允许的要陡峭：晶体中分子间的弹性相互作用使转变成为协同过程。
:::

::: example 一个自旋交叉化合物 {#ex-crossover}
对 $\mathrm{[Fe(phen)_2(NCS)_2]}$ 取 $\Delta H = 8.6\ \mathrm{kJ\,mol^{-1}}$、$\Delta S = 48.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$。(a) 求 $T_{1/2}$。(b) 在无相互作用模型下求 $298\ \mathrm{K}$ 与 $150\ \mathrm{K}$ 的 $\gamma_\mathrm{HS}$ 及预期的 $\mu_\mathrm{eff}$。(c) $\Delta S$ 中有多大比例来自自旋简并度？
::: solution
(a) $T_{1/2} = 8600/48.8 = 176\ \mathrm{K}$。(b) $298\ \mathrm{K}$：$\Delta G = 8600 - 298 \times 48.8 = -5942\ \mathrm{J\,mol^{-1}}$，$K = e^{5942/(8.314 \times 298)} = e^{2.398} = 11.0$，$\gamma_\mathrm{HS} = 11.0/12.0 = 0.917$。$150\ \mathrm{K}$：$\Delta G = 8600 - 7320 = 1280\ \mathrm{J\,mol^{-1}}$，$K = e^{-1.026} = 0.358$，$\gamma_\mathrm{HS} = 0.264$。由于 $\chi_\mathrm{m}T$ 从而 $\mu_\mathrm{eff}^2$ 正比于 $\gamma_\mathrm{HS}$（低自旋态抗磁），$\mu_\mathrm{eff} = 4.90\sqrt{\gamma_\mathrm{HS}}$：$298\ \mathrm{K}$ 为 $4.69\ \mu_\mathrm{B}$，$150\ \mathrm{K}$ 为 $2.52\ \mu_\mathrm{B}$。（注意 $\mu_\mathrm{eff}$ 按平方根平均，不是线性平均。）真实固体在室温几乎完全是高自旋，约 $170\ \mathrm{K}$ 以下几乎完全是低自旋。(c) $R\ln5 = 13.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$，$13.4/48.8 = 27\ \%$。其余四分之三是振动熵，主要来自高自旋态较软的 Fe–N 伸缩与弯曲振动模式，其 Fe–N 键约长 $20\ \mathrm{pm}$。
:::
:::

::: warning 室温下的单一磁矩不等于自旋状态 {#warn-mueff}
在 $298\ \mathrm{K}$ 测一个 $\mu_\mathrm{eff}$、与[[#eq-spin-only]]对照、然后宣布自旋状态，是很容易犯的错。三种情况会出错。(1) $T$ 基态带轨道贡献，可使 $\mu_\mathrm{eff}$ 移动 $1\ \mu_\mathrm{B}$（八面体钴(II)的 $5.1$ 看起来像"四个未成对电子"，而 $d^7$ 不可能有四个）。(2) 处于转变中途的自旋交叉化合物给出一个与任何整数 $n$ 都不对应的中间磁矩；只有温度依赖性能揭示这是混合物。(3) 多核配合物中的金属-金属耦合会降低每个金属的磁矩，低温下有时接近零，于是两个 $S = \tfrac12$ 铜(II) 离子构成的二聚体可能看上去"抗磁"。遇到任何可疑情形，都应测量 $\chi_\mathrm{m}$ 随温度的变化。
:::

## 金属中心之间的磁耦合

当两个顺磁离子靠得足够近——通常由桥联配体连接——它们的自旋就会相互作用。这一相互作用用各向同性的**交换哈密顿量** $\hat H = -2J\,\hat{\mathbf S}_1\cdot\hat{\mathbf S}_2$ 描述（符号约定不一；在这一约定下 $J < 0$ 为反铁磁）。对两个 $S = \tfrac12$ 离子，它给出相隔 $2|J|$ 的单重态（$S = 0$）与三重态（$S = 1$），$J < 0$ 时单重态较低。经典的例子是一水乙酸铜(II) $\mathrm{[Cu_2(\mu\text{-}O_2CCH_3)_4(H_2O)_2]}$，一个"桨轮"二聚体，其单重态-三重态能隙约 $300\ \mathrm{cm^{-1}}$。室温下每个铜的磁矩约 $1.4\ \mu_\mathrm{B}$，远低于孤立铜(II) 的 $1.9\ \mu_\mathrm{B}$，降温时分子落入单重态，磁矩趋于零。布雷比斯·布利尼（Brebis Bleaney）与 K. D. 鲍尔斯（K. D. Bowers）1952 年从 EPR 谱解释了这一现象，他们给出的耦合对磁化率方程至今仍是标准模型。耦合经由桥联乙酸根传递（**超交换**），而不是直接的 Cu–Cu 键。在扩展固体中，同样的相互作用在临界温度以下产生反铁磁与铁磁有序，这是[[materials-chemistry/magnetic-optical]]的主题。

## 后续内容

磁矩测量[[coordination-chemistry/crystal-field-theory]]预言的自旋状态，并检验[[coordination-chemistry/spectra-of-complexes]]的配体场指认。轨道贡献在 $d$ 区虽小，对镧系元素却占主导：它们的 $4f$ 电子被屏蔽在配体之外，$J$ 仍是好量子数，磁矩遵循自由离子公式 $g_J\sqrt{J(J+1)}$（[[coordination-chemistry/f-block]]）。未成对电子本身可由 EPR 直接观测（[[spectroscopy/epr]]），其 $g$ 值载有与[[#eq-so-correction]]相同的自旋-轨道信息。金属之间的磁耦合是[[coordination-chemistry/bioinorganic]]中铁硫簇以及结合与活化氧的铜、铁位点的核心。

::: history
皮埃尔·居里（Pierre Curie）在 1895 年关于物质在不同温度下磁性的博士论文中确立了顺磁磁化率与温度成反比的规律，皮埃尔·外斯（Pierre Weiss）在 1907 年加上了分子场修正。保罗·朗之万（Paul Langevin）在 1905 年从统计力学导出了经典的 $1/T$ 定律；带 $S(S+1)$ 与轨道角动量淬灭的量子力学版本，则由约翰·范弗莱克（John Hasbrouck Van Vleck）在《电磁化率理论》（*The Theory of Electric and Magnetic Susceptibilities*，1932）一书中给出——他凭借这本书及其后的工作与他人分享了 1977 年诺贝尔物理学奖。莱纳斯·鲍林在 1930 年代用磁矩把配合物分为"离子型"与"共价型"，这一区分后来被晶体场与配体场理论重新解释为高自旋与低自旋。自旋交叉最早由路易吉·坎比（Luigi Cambi）及其合作者在 1930 年代初观察到，他们发现三(二硫代氨基甲酸根)合铁(III)的磁矩随温度改变；铁(II)化合物 $\mathrm{[Fe(phen)_2(NCS)_2]}$ 则由埃德加·克尼希（Edgar König）与康拉德·马代亚（Konrad Madeja）在 1967 年表征。布利尼与鲍尔斯 1952 年对乙酸铜的分析确立了交换耦合二聚体。D. F. 埃文斯（D. F. Evans）于 1959 年发表了 NMR 方法。
:::

::: summary
- 顺磁磁化率服从居里定律 $\chi_\mathrm{m} = \mu_0N_\mathrm{A}g^2\mu_\mathrm{B}^2S(S+1)/3k_\mathrm{B}T$，该式由塞曼能级的玻尔兹曼布居在低场下导出。
- 有效磁矩 $\mu_\mathrm{eff} = 797.7\sqrt{\chi_\mathrm{m}T}$（SI）$= 2.828\sqrt{\chi_\mathrm{m}T}$（cgs）对居里顺磁体与温度无关；仅自旋值为 $\mu_\mathrm{so} = \sqrt{n(n+2)}\ \mu_\mathrm{B}$。
- 解释实测磁化率之前，先用帕斯卡常数作抗磁校正；磁化率用古埃或法拉第磁天平、超导量子干涉仪测量，溶液中则用埃文斯 NMR 法。
- 轨道角动量只在轨道简并的 $T$ 基态下存活；$A$ 与 $E$ 基态给出接近仅自旋的磁矩，修正为 $\mu_\mathrm{so}(1 - \alpha\lambda/\Delta_\mathrm{o})$。
- 八面体与四面体钴(II)可由磁矩区分（约 4.7–5.2 对 4.4–4.8 $\mu_\mathrm{B}$）。
- 自旋交叉是一个 $T_{1/2} = \Delta H/\Delta S$ 的平衡；焓有利于低自旋，自旋熵与振动熵有利于高自旋。协同相互作用使真实转变变得陡峭。
- 桥联配体耦合相邻金属上的自旋；反铁磁耦合使磁矩降低并随降温进一步下降（乙酸铜）。
:::

## 习题

::: exercise 仅自旋磁矩 {level=1 check="3.87"}
计算 $\mathrm{[Cr(NH_3)_6]^{3+}}$ 与 $\mathrm{[Fe(H_2O)_6]^{2+}}$ 的仅自旋磁矩。（输入铬配合物的磁矩，以 $\mu_\mathrm{B}$ 计，保留三位有效数字。）
::: solution
铬(III)，$d^3$，$n = 3$：$\sqrt{3 \times 5} = \sqrt{15} = 3.87\ \mu_\mathrm{B}$。高自旋铁(II)，$d^6$，$n = 4$：$\sqrt{24} = 4.90\ \mu_\mathrm{B}$（实测值更高，5.1–5.5，因为有 $^5T_{2g}$ 的轨道贡献）。
:::
:::

::: exercise 由磁矩求未成对电子数 {level=1 check="5"}
某铁(III)配合物的 $\mu_\mathrm{eff} = 5.95\ \mu_\mathrm{B}$。它有几个未成对电子？关于它的配体你能说些什么？（输入未成对电子数。）
::: solution
$\sqrt{n(n+2)} = 5.95$ 给出 $n(n+2) = 35.4$，所以 $n = 5$（$\mu_\mathrm{so} = 5.92$）。铁(III)为 $d^5$，所以配合物是高自旋，$t_{2g}^3e_g^2$（$^6A_{1g}$，无轨道贡献），其配体是弱场：水、氟离子、草酸根、氯离子。
:::
:::

::: exercise 由 cgs 磁化率求磁矩 {level=1 check="1.87"}
五水硫酸铜(II)在 $298\ \mathrm{K}$ 的 $\chi_\mathrm{m} = 1.46\times10^{-3}\ \mathrm{cm^3\,mol^{-1}}$（cgs，已作抗磁校正）。求 $\mu_\mathrm{eff}$。（以 $\mu_\mathrm{B}$ 输入 $\mu_\mathrm{eff}$，保留三位有效数字。）
::: solution
$\mu_\mathrm{eff} = 2.828\sqrt{1.46\times10^{-3} \times 298} = 2.828\sqrt{0.4351} = 2.828 \times 0.6596 = 1.87\ \mu_\mathrm{B}$：一个未成对电子，并带有 $E$ 派生基态的 $d^9$ 离子所预期的微小正轨道修正。
:::
:::

::: exercise 平面正方形还是四面体镍(II)？ {level=2}
分离出两种组成同为 $\mathrm{[NiX_2(PR_3)_2]}$ 的镍(II)配合物：一种红色、抗磁性，一种蓝绿色、$\mu_\mathrm{eff} = 3.2\ \mu_\mathrm{B}$。指认它们的几何构型并解释。
::: solution
镍(II)为 $d^8$。平面正方形场中，八个电子两两配对于四个较低的轨道，$d_{x^2-y^2}$ 空置（[[coordination-chemistry/crystal-field-theory]]）：抗磁。四面体场中组态为 $e^4t_2^4$，有两个未成对电子（$\mu_\mathrm{so} = 2.83$）；$^3T_1$ 基态带轨道贡献，使 $\mu_\mathrm{eff}$ 升到 3.2–4.0 $\mu_\mathrm{B}$。所以红色抗磁的异构体是平面正方形，顺磁的那个是四面体。这样的平面-四面体对（例如 $\mathrm{X} = \mathrm{Br}$、混合烷基/芳基膦）在溶液中可以互变，平衡可用磁学与 NMR 测量跟踪。
:::
:::

::: exercise 埃文斯法 {level=2 check="3.20"}
在 $400\ \mathrm{MHz}$ 谱仪上做一次埃文斯测量：$0.0200\ \mathrm{mol\,dm^{-3}}$ 的某镍(II)配合物溶液在 $298\ \mathrm{K}$ 使参比信号相对毛细管移动 $144\ \mathrm{Hz}$。忽略抗磁校正，求 $\chi_\mathrm{m}$ 与 $\mu_\mathrm{eff}$。（以 $\mu_\mathrm{B}$ 输入 $\mu_\mathrm{eff}$，保留三位有效数字。）
::: solution
$\Delta f/f = 144/(400\times10^6) = 3.60\times10^{-7}$，$c = 0.0200\ \mathrm{mol\,dm^{-3}} = 20.0\ \mathrm{mol\,m^{-3}}$。由[[#eq-evans]]，$\chi_\mathrm{m} = 3 \times 3.60\times10^{-7}/20.0 = 5.40\times10^{-8}\ \mathrm{m^3\,mol^{-1}}$。于是 $\mu_\mathrm{eff} = 797.7\sqrt{5.40\times10^{-8} \times 298} = 797.7\sqrt{1.609\times10^{-5}} = 797.7 \times 4.012\times10^{-3} = 3.20\ \mu_\mathrm{B}$：两个未成对电子，一个八面体（或四面体）镍(II)配合物。
:::
:::

::: exercise 移动自旋转变 {level=2 check="0.5"}
某自旋交叉铁(II)配合物的 $\Delta H = 15.0\ \mathrm{kJ\,mol^{-1}}$、$\Delta S = 60.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$。(a) 求 $T_{1/2}$。(b) 求 $T_{1/2}$ 与 $300\ \mathrm{K}$ 处的 $\gamma_\mathrm{HS}$。(c) 一个配体取代基使 $\Delta H$ 提高 $2.0\ \mathrm{kJ\,mol^{-1}}$ 而 $\Delta S$ 不变；新的 $T_{1/2}$ 是多少？（输入 $T_{1/2}$ 处的 $\gamma_\mathrm{HS}$。）
::: solution
(a) $T_{1/2} = 15\,000/60.0 = 250\ \mathrm{K}$。(b) 在 $T_{1/2}$ 处，按定义 $\gamma_\mathrm{HS} = 0.5$。$300\ \mathrm{K}$：$\Delta G = 15\,000 - 18\,000 = -3000\ \mathrm{J\,mol^{-1}}$，$K = e^{3000/(8.314 \times 300)} = e^{1.203} = 3.33$，$\gamma_\mathrm{HS} = 3.33/4.33 = 0.769$。(c) $17\,000/60.0 = 283\ \mathrm{K}$。场更强的配体稳定低自旋态，抬高 $\Delta H$，使转变移向室温——化学家正是这样为传感器与显示器调变自旋交叉材料的。
:::
:::

::: exercise 居里定律与饱和 {level=3 check="0.336"}
对 $S = \tfrac12$、$g = 2$，精确的平均磁矩为 $\langle\mu_z\rangle = \mu_\mathrm{B}\tanh(\mu_\mathrm{B}B/k_\mathrm{B}T)$。(a) 由两个塞曼能级导出此式。(b) 证明小场下它化为居里定律。(c) 求 $B = 1.00\ \mathrm{T}$、$T = 2.00\ \mathrm{K}$ 时的 $x = \mu_\mathrm{B}B/k_\mathrm{B}T$，以及居里定律在该处高估磁化强度的百分比。（以三位有效数字输入 $x$。）
::: hint
小 $x$ 时 $\tanh x \approx x - x^3/3$。
:::
::: solution
(a) $M_S = \pm\tfrac12$ 两个能级的能量为 $\pm\mu_\mathrm{B}B$（取 $g = 2$），磁矩为 $\mp\mu_\mathrm{B}$。于是 $\langle\mu_z\rangle = \mu_\mathrm{B}(e^{x} - e^{-x})/(e^{x} + e^{-x}) = \mu_\mathrm{B}\tanh x$，其中 $x = \mu_\mathrm{B}B/k_\mathrm{B}T$。(b) 小 $x$ 时 $\tanh x \approx x$，$\langle\mu_z\rangle \approx \mu_\mathrm{B}^2B/k_\mathrm{B}T$，即[[#prop-curie]]在 $g^2S(S+1)/3 = 4 \times \tfrac34/3 = 1$ 时的情形。(c) $x = (9.274\times10^{-24} \times 1.00)/(1.381\times10^{-23} \times 2.00) = 0.336$。居里定律用 $x$ 代替 $\tanh x$，所以它把磁化强度高估 $x/\tanh x - 1 = 0.3359/0.3238 - 1 = 3.7\ \%$（级数估计 $x^2/3 = 0.038$ 与此相符）。在 $2\ \mathrm{K}$、$1\ \mathrm{T}$ 下居里定律几乎正确；在 $7\ \mathrm{T}$、$2\ \mathrm{K}$（$x = 2.35$）下磁化强度已 98 % 饱和，居里定律完全失效，这就是低温 SQUID 研究使用小磁场的原因。
:::
:::

::: exercise 由磁矩提取 λ {level=3 check="-307"}
某镍(II)配合物 $\Delta_\mathrm{o} = 10\,800\ \mathrm{cm^{-1}}$，$\mu_\mathrm{eff} = 3.15\ \mu_\mathrm{B}$，且与温度无关。(a) 磁矩为何与温度无关？(b) 用[[#eq-so-correction]]求配合物中的有效自旋-轨道耦合常数 $\lambda$。(c) 与自由离子值 $-315\ \mathrm{cm^{-1}}$ 比较并评论。（以 $\mathrm{cm^{-1}}$ 输入 $\lambda$，保留三位有效数字。）
::: solution
(a) 八面体镍(II)的基态是 $^3A_{2g}$，无轨道简并；二阶轨道贡献来自与相距 $\Delta_\mathrm{o}$ 的激发态的混合，该能量远大于 $k_\mathrm{B}T$，所以不随温度改变，居里定律以恒定的 $\mu_\mathrm{eff}$ 成立。(b) $3.15 = 2.828(1 - 4\lambda/10\,800)$ 给出 $1 - 4\lambda/10\,800 = 1.1139$，所以 $\lambda = -0.1139 \times 10\,800/4 = -307\ \mathrm{cm^{-1}}$。若 $\mu_\mathrm{eff} = 3.15$ 只有 $\pm0.01\ \mu_\mathrm{B}$ 的把握，$\lambda$ 的不确定度约为 $\pm 10\ \mathrm{cm^{-1}}$。(c) 有效 $\lambda$ 的绝对值比自由离子值小约 3 %。共价性通常把 $\lambda$ 降低 10–30 %，正如它也降低 $B$ 一样；如此接近自由离子值表明成键颇有离子性，尽管这里的误差与效应本身相当。
:::
:::
