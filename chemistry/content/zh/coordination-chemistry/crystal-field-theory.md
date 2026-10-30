把三氯化钛溶于稀酸，得到 $\mathrm{[Ti(H_2O)_6]^{3+}}$ 的淡紫色溶液。它的光谱在 $20\,300\ \mathrm{cm^{-1}}$（约 $493\ \mathrm{nm}$，蓝绿光区）处有一条宽而单一的吸收带，眼睛看到的是透过去留下的光：红光与紫光。钛(III)只有一个 $d$ 电子。在自由的 $\mathrm{Ti^{3+}}$ 气态离子中，五个 $3d$ 轨道的能量完全相同，所以 $d \rightarrow d$ 跃迁不花任何能量，根本不会有可见光吸收带。配合物里一定有什么东西把 $d$ 轨道分裂了约 $240\ \mathrm{kJ\,mol^{-1}}$，这个能量与一个化学键相当。

第二个谜团指向同一方向。铁(II)有六个 $d$ 电子。在 $\mathrm{[Fe(H_2O)_6]^{2+}}$ 中有四个电子未成对，该盐被强烈拉入磁场；而在六氰合铁(II)酸根离子 $\mathrm{[Fe(CN)_6]^{4-}}$（黄血盐）中六个电子全部成对，该盐是抗磁性的。同样的金属、同样的氧化态、同样的八面体形状，电子的排布却不同。**晶体场理论**用一个思想同时解释这两个事实：配体构成一种负静电环境，把某些 $d$ 轨道抬高得比另一些更多。这是一个刻意粗糙的模型，把配体当作点电荷或点偶极，完全忽略共价性；但它把分裂的*对称性*处理得完全正确，并且每个配合物只需一个经验参数，就能解释颜色、磁性、畸变、矿物中的占位偏好以及第一过渡系不规则的热力学。[[coordination-chemistry/ligand-field-mo]]随后在不改变其结论的前提下修补它的物理基础。

## 八面体场中的 d 轨道

回忆五个 $d$ 轨道的形状（[[quantum-chemistry/hydrogen-atom]]）。其中 $d_{xy}$、$d_{xz}$ 与 $d_{yz}$ 三个轨道的四个瓣指向直角坐标轴*之间*。另外两个的瓣沿坐标轴*伸展*：$d_{x^2-y^2}$ 沿 $\pm x$ 与 $\pm y$ 方向，$d_{z^2}$ 沿 $\pm z$ 有两个大瓣，并在 $xy$ 平面上有一个环形。现在把六个配体放到坐标轴上，即 $\pm x$、$\pm y$、$\pm z$ 处，如同八面体配合物那样。

::: definition 晶体场模型与八面体分裂 {#def-cft}
在**晶体场模型**中，金属离子被若干配体包围，配体被当作负点电荷（阴离子）或点偶极的负端（中性配体）。它们的静电排斥抬高所有金属 $d$ 轨道的能量，并使瓣指向配体的那些轨道抬得最高。在八面体场（$O_h$）中，五个 $d$ 轨道按对称性分成两组：

- $e_g$：$d_{z^2}$ 与 $d_{x^2-y^2}$，指向配体，被抬高；
- $t_{2g}$：$d_{xy}$、$d_{xz}$、$d_{yz}$，指向配体之间，相对平均能量被降低。

两组之间的能隙称为**八面体场分裂能** $\Delta_\mathrm{o}$（旧书写作 $10Dq$）。它由电子光谱测得，以 $\mathrm{cm^{-1}}$ 报告；$1\ \mathrm{cm^{-1}}$ 相当于 $11.96\ \mathrm{J\,mol^{-1}}$。
:::

从 $d_{z^2}$ 与 $d_{x^2-y^2}$ 的图像看，说二者简并并不显然，因为这两幅图像看起来很不相同。这是对称性的结果：在 $O_h$ 中，这两个轨道一起按二维不可约表示 $E_g$ 变换，而三个“轴间”轨道按 $T_{2g}$ 变换（[[quantum-chemistry/molecular-symmetry]]）。这些符号是马利肯（Mulliken）符号的小写形式，因为它们描述的是轨道而不是状态。这一模型真正的成就是 $2 + 3$ 这个*图样*；$\Delta_\mathrm{o}$ 的大小则是我们从实验取来的参数。

::: proposition 重心规则 {#prop-barycentre}
若某种微扰把一组简并轨道分裂开，而不与其他任何轨道混合，则这组轨道按占据数加权的平均能量保持不变。对八面体分裂，以平均能量（**重心**）为基准，
$$
E(e_g) = +\tfrac{3}{5}\Delta_\mathrm{o} = +6Dq, \qquad E(t_{2g}) = -\tfrac{2}{5}\Delta_\mathrm{o} = -4Dq.
$$ {#eq-barycentre}
这一结果在晶体场模型内成立：配体场在球平均之上叠加了一个无迹项；球平均部分对全部五个轨道的整体抬升对每种排布都相同，因而抵消掉。
:::

::: proof
把配体势拆成球平均部分与其余部分。球平均部分使全部五个 $d$ 轨道移动相同的量。非球部分 $V'$ 在五个轨道上的平均为零，因为 $V'$ 在一组完备 $d$ 函数上的迹等于 $V'$ 在球面上的积分（翁索尔德（Unsöld）定理，$\sum_m |Y_{2m}|^2 = 5/4\pi$），而按构造非球部分对球面的积分为零。因此五个轨道的移动之和为零：
$$
2E(e_g) + 3E(t_{2g}) = 0, \qquad E(e_g) - E(t_{2g}) = \Delta_\mathrm{o}.
$$
把 $E(e_g) = E(t_{2g}) + \Delta_\mathrm{o}$ 代入第一式得 $5E(t_{2g}) + 2\Delta_\mathrm{o} = 0$，于是 $E(t_{2g}) = -\tfrac{2}{5}\Delta_\mathrm{o}$，$E(e_g) = +\tfrac{3}{5}\Delta_\mathrm{o}$。为保持重心不动，两轨道的一组必须比三轨道的一组移动得更多，就像杠杆那样。
:::

::: example 钛(III)的颜色 {#ex-ti3}
$\mathrm{[Ti(H_2O)_6]^{3+}}$ 在 $\tilde\nu = 20\,300\ \mathrm{cm^{-1}}$ 处吸收最强。设该吸收带对应 $t_{2g}^1 \rightarrow e_g^1$ 跃迁，求以 $\mathrm{kJ\,mol^{-1}}$ 为单位的 $\Delta_\mathrm{o}$、最大吸收的波长，以及单电子相对于重心获得的稳定化能量。
::: solution
对 $d^1$ 离子，唯一的电子从 $t_{2g}$ 跳到 $e_g$，所以跃迁能量恰好就是 $\Delta_\mathrm{o}$（没有电子间排斥使它复杂化；$d^2$ 及更复杂的情形见[[coordination-chemistry/spectra-of-complexes]]）。摩尔能量为
$$
E = N_\mathrm{A}hc\tilde\nu = (6.022\times10^{23}\ \mathrm{mol^{-1}})(6.626\times10^{-34}\ \mathrm{J\,s})(2.998\times10^{10}\ \mathrm{cm\,s^{-1}})(20\,300\ \mathrm{cm^{-1}}) = 2.43\times10^{5}\ \mathrm{J\,mol^{-1}},
$$
故 $\Delta_\mathrm{o} = 243\ \mathrm{kJ\,mol^{-1}}$。波长为 $\lambda = 1/\tilde\nu = 1/(20\,300\ \mathrm{cm^{-1}}) = 4.93\times10^{-5}\ \mathrm{cm} = 493\ \mathrm{nm}$。$490\ \mathrm{nm}$ 附近的光是蓝绿色的；把白光中的这一部分减去，剩下红光与紫光，眼睛把它们合成紫色。基态电子处在 $t_{2g}$，位于重心以下 $\tfrac{2}{5}\Delta_\mathrm{o} = 97\ \mathrm{kJ\,mol^{-1}}$ 处。这条吸收带很宽，并在低能侧有一个肩峰：激发态 $t_{2g}^0e_g^1$ 在简并的 $e_g$ 组中有一个单电子，会发生畸变（本章末尾的姜-泰勒效应），使吸收分裂为两个重叠的分量。
:::
:::

## 晶体场稳定化能与自旋状态

当 $d$ 电子不止一个时，我们按构造原理与洪特规则填充分裂后的轨道，但多出一个新的选择。三个电子进入 $t_{2g}$（每个轨道一个，自旋平行）之后，第四个电子要么升入 $e_g$，付出 $\Delta_\mathrm{o}$；要么与 $t_{2g}$ 中已有的电子成对，付出额外的排斥与一对电子所损失的交换能。

::: definition 晶体场稳定化能与成对能 {#def-cfse}
八面体 $t_{2g}^a e_g^b$ 组态的**晶体场稳定化能**（CFSE）是其相对于重心的能量，
$$
\mathrm{CFSE} = \left(-\tfrac{2}{5}a + \tfrac{3}{5}b\right)\Delta_\mathrm{o}.
$$ {#eq-cfse}
**平均成对能** $P$ 是强行把额外一对电子塞进同一轨道、与把它们保持在不同轨道且自旋平行的排布相比的能量代价。它兼含同一轨道中两个电子的库仑排斥与配成对所损失的交换能。未成对电子数最多的组态是**高自旋**（弱场）；未成对电子较少的为**低自旋**（强场）。有些书把成对项也计入 CFSE；这里 CFSE 只指轨道项，$P$ 单独计算。
:::

对 $d^1$、$d^2$、$d^3$ 与 $d^8$、$d^9$、$d^{10}$，无论 $\Delta_\mathrm{o}$ 多大都只有一种填充方式。这一选择只出现在 $d^4$ 到 $d^7$。

::: proposition 自旋状态判据 {#prop-spin-state}
对 $d^4$、$d^5$、$d^6$ 或 $d^7$ 的八面体配合物，低自旋组态成为基态的条件是
$$
\Delta_\mathrm{o} > P,
$$
高自旋组态成为基态的条件则是 $\Delta_\mathrm{o} < P$。这一判据假定所有电子对共用一个平均成对能，并假定 $\Delta_\mathrm{o}$ 不随自旋状态改变（实际上低自旋型的金属-配体键更短，使那里的 $\Delta_\mathrm{o}$ 更大）。
:::

::: proof
对每种电子数比较两种组态，写出 $E = \mathrm{CFSE} + (\text{成对数})\,P$，只保留两种组态之间有差别的成对。

| $d^n$ | 高自旋 | CFSE | 成对数 | 低自旋 | CFSE | 成对数 | $E_\mathrm{HS} - E_\mathrm{LS}$ |
|---|---|---|---|---|---|---|---|
| $d^4$ | $t_{2g}^3e_g^1$ | $-0.6\Delta_\mathrm{o}$ | 0 | $t_{2g}^4$ | $-1.6\Delta_\mathrm{o}$ | 1 | $\Delta_\mathrm{o} - P$ |
| $d^5$ | $t_{2g}^3e_g^2$ | $0$ | 0 | $t_{2g}^5$ | $-2.0\Delta_\mathrm{o}$ | 2 | $2(\Delta_\mathrm{o} - P)$ |
| $d^6$ | $t_{2g}^4e_g^2$ | $-0.4\Delta_\mathrm{o}$ | 1 | $t_{2g}^6$ | $-2.4\Delta_\mathrm{o}$ | 3 | $2(\Delta_\mathrm{o} - P)$ |
| $d^7$ | $t_{2g}^5e_g^2$ | $-0.8\Delta_\mathrm{o}$ | 2 | $t_{2g}^6e_g^1$ | $-1.8\Delta_\mathrm{o}$ | 3 | $\Delta_\mathrm{o} - P$ |

每一行中，从高自旋变为低自旋把 $m$ 个电子（$m = 1$ 或 $2$）从 $e_g$ 移到 $t_{2g}$，获得 $m\Delta_\mathrm{o}$，并新形成 $m$ 对，付出 $mP$。所以 $E_\mathrm{HS} - E_\mathrm{LS} = m(\Delta_\mathrm{o} - P)$，它为正（低自旋更低）恰好当 $\Delta_\mathrm{o} > P$。
:::

自由离子的成对能可由原子光谱估算。典型数值（取自 Huheey、Keiter 与 Keiter 的汇编）以 $\mathrm{cm^{-1}}$ 计为：$\mathrm{Cr^{2+}}$ 23 500，$\mathrm{Mn^{3+}}$ 28 000，$\mathrm{Mn^{2+}}$ 25 500，$\mathrm{Fe^{3+}}$ 30 000，$\mathrm{Fe^{2+}}$ 17 600，$\mathrm{Co^{3+}}$ 21 000，$\mathrm{Co^{2+}}$ 22 500。在配合物中电子云向配体扩展，$P$ 下降 15–30 %（[[coordination-chemistry/spectra-of-complexes]]中的电子云扩展效应），所以这些数字是上限，判据只在 $\Delta_\mathrm{o}$ 与 $P$ 相差明显时才足以定夺。

::: example 两个铁(II)配合物与一个钴(III)氟配合物 {#ex-spin-states}
已知 $P(\mathrm{Fe^{2+}}) = 17\,600\ \mathrm{cm^{-1}}$、$P(\mathrm{Co^{3+}}) = 21\,000\ \mathrm{cm^{-1}}$，预测 (a) $\mathrm{[Fe(H_2O)_6]^{2+}}$（$\Delta_\mathrm{o} = 10\,400\ \mathrm{cm^{-1}}$）、(b) $\mathrm{[Fe(CN)_6]^{4-}}$（$32\,200\ \mathrm{cm^{-1}}$）、(c) $\mathrm{[Co(NH_3)_6]^{3+}}$（$22\,900\ \mathrm{cm^{-1}}$）与 (d) $\mathrm{[CoF_6]^{3-}}$（$13\,000\ \mathrm{cm^{-1}}$）的自旋状态、未成对电子数与 CFSE。
::: solution
四者都是 $d^6$，由[[#prop-spin-state]]，$E_\mathrm{HS} - E_\mathrm{LS} = 2(\Delta_\mathrm{o} - P)$。

(a) $2(10\,400 - 17\,600) = -14\,400\ \mathrm{cm^{-1}}$：高自旋更低。组态 $t_{2g}^4e_g^2$，四个未成对电子，CFSE $= -0.4 \times 10\,400 = -4160\ \mathrm{cm^{-1}}$（$-49.8\ \mathrm{kJ\,mol^{-1}}$）。

(b) $2(32\,200 - 17\,600) = +29\,200\ \mathrm{cm^{-1}}$：低自旋，$t_{2g}^6$，无未成对电子，CFSE $= -2.4 \times 32\,200 = -77\,280\ \mathrm{cm^{-1}}$（在付出 $2P$ 的成对代价之前为 $-924\ \mathrm{kJ\,mol^{-1}}$）。这就是引言中那个抗磁性的亚铁氰离子。

(c) $2(22\,900 - 21\,000) = +3800\ \mathrm{cm^{-1}}$：低自旋、抗磁性，与观测一致。按这一估计裕度不大，但配合物中真实的 $P$ 低于自由离子值，所以低自旋状态比数字显示得更稳妥。几乎所有钴(III)配合物都是低自旋的。

(d) $2(13\,000 - 21\,000) = -16\,000\ \mathrm{cm^{-1}}$：高自旋，四个未成对电子。$\mathrm{[CoF_6]^{3-}}$ 是钴(III)配合物中经典的例外，它的顺磁性（按[[coordination-chemistry/magnetism]]中的方法测量）证实了这一点。
:::
:::

各种八面体 $d^n$ 的 CFSE 都可由[[#eq-cfse]]得出，值得列成表，因为它会在热力学、动力学与固体化学中反复出现。

| $d^n$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 高自旋，$-\mathrm{CFSE}/\Delta_\mathrm{o}$ | 0 | 0.4 | 0.8 | 1.2 | 0.6 | 0 | 0.4 | 0.8 | 1.2 | 0.6 | 0 |
| 低自旋，$-\mathrm{CFSE}/\Delta_\mathrm{o}$ | 0 | 0.4 | 0.8 | 1.2 | 1.6 | 2.0 | 2.4 | 1.8 | 1.2 | 0.6 | 0 |
| 未成对电子（高 / 低自旋） | 0 | 1 | 2 | 3 | 4 / 2 | 5 / 1 | 4 / 0 | 3 / 1 | 2 | 1 | 0 |

::: widget plot
f: 0.4*x - ((x-3)+abs(x-3))/2 + ((x-5)+abs(x-5))/2 - ((x-8)+abs(x-8))/2; 0.4*x - ((x-6)+abs(x-6))/2
x: 0, 10
y: -0.2, 2.6
points: 0,0; 1,0.4; 2,0.8; 3,1.2; 4,0.6; 5,0; 6,0.4; 7,0.8; 8,1.2; 9,0.6; 10,0; 4,1.6; 5,2.0; 6,2.4; 7,1.8
labels: \text{高自旋}; \text{低自旋}
caption: 八面体 CFSE 的大小 $-\mathrm{CFSE}/\Delta_\mathrm{o}$ 随 $d$ 电子数 $x$ 的变化，由[[#eq-cfse]]算出（不含成对能）。高自旋配合物给出“双峰”形状：$d^0$、$d^5$ 与 $d^{10}$ 处为零，$d^3$ 与 $d^8$ 处达极大值 $1.2\Delta_\mathrm{o}$。低自旋配合物在 $d^6$ 处升到 $2.4\Delta_\mathrm{o}$，即钴(III)、铑(III)、铱(III)与铂(IV)的 $t_{2g}^6$ 组态，这正是这些离子形成如此稳固配合物的原因。两条曲线在 $d^4$–$d^7$ 之外重合，因为那里只有一种组态可能。有物理意义的只是那些点；连线是为了引导视线。
:::

::: quiz
某锰(II)的八面体配合物有五个未成对电子。哪些陈述必然正确？
- [x] 它的 CFSE 为零。
- [ ] 它的配体位于光谱化学序列的高端。
- [x] $\Delta_\mathrm{o}$ 小于平均成对能。
- [ ] 它的 $t_{2g}$ 组上有两个电子。
::: solution
锰(II)是 $d^5$。五个未成对电子意味着高自旋 $t_{2g}^3e_g^2$，由[[#eq-cfse]]得 $3(-0.4) + 2(0.6) = 0$。高自旋意味着 $\Delta_\mathrm{o} < P$（[[#prop-spin-state]]），所以场是*弱*的，配体位于序列的低端（$\mathrm{H_2O}$、$\mathrm{F^-}$、$\mathrm{Cl^-}$）。$t_{2g}$ 上有三个电子，不是两个。CFSE 为零，这就是锰(II)盐几乎无色、该离子对八面体位与四面体位没有偏好的原因。
:::
:::

## 光谱化学序列

测定同一金属的许多配合物的 $\Delta_\mathrm{o}$ 会发现，配体可以排成一个几乎不依赖金属的次序。Ryutaro Tsuchida 于 1938 年根据钴(III)配合物吸收带的位置提出了这一序列，现在称为**光谱化学序列**：
$$
\mathrm{I^-} < \mathrm{Br^-} < \mathrm{S^{2-}} < \mathrm{SCN^-}(S) < \mathrm{Cl^-} < \mathrm{NO_3^-} < \mathrm{F^-} < \mathrm{OH^-} < \mathrm{ox^{2-}} < \mathrm{H_2O} < \mathrm{NCS^-}(N) < \mathrm{CH_3CN} < \mathrm{py} < \mathrm{NH_3} < \mathrm{en} < \mathrm{bpy} < \mathrm{phen} < \mathrm{NO_2^-} < \mathrm{PPh_3} < \mathrm{CN^-} < \mathrm{CO}.
$$
序列左端的配体是**弱场**的，给出小的分裂与高自旋配合物；右端的是**强场**配体。固定配体时，金属也存在类似的次序：
$$
\mathrm{Mn^{2+}} < \mathrm{Ni^{2+}} < \mathrm{Co^{2+}} < \mathrm{Fe^{2+}} < \mathrm{V^{2+}} < \mathrm{Fe^{3+}} < \mathrm{Cr^{3+}} < \mathrm{V^{3+}} < \mathrm{Co^{3+}} < \mathrm{Mn^{4+}} < \mathrm{Mo^{3+}} < \mathrm{Rh^{3+}} < \mathrm{Ru^{3+}} < \mathrm{Pd^{4+}} < \mathrm{Ir^{3+}} < \mathrm{Pt^{4+}}.
$$
有两个趋势特别突出。$\Delta_\mathrm{o}$ 随氧化态升高：从 $\mathrm{M^{2+}}$ 到 $\mathrm{M^{3+}}$，配体被拉得更近，$\Delta_\mathrm{o}$ 通常增大 40–80 %。它还沿族向下增大：$\mathrm{[M(NH_3)_6]^{3+}}$ 的 $\Delta_\mathrm{o}$ 依次为 $22\,900$（Co）、$34\,100$（Rh）与 $41\,200\ \mathrm{cm^{-1}}$（Ir），增幅分别为 49 % 与 21 %，因为更大的 $4d$、$5d$ 轨道能更好地触及配体。又因为较弥散的 $4d$、$5d$ 轨道的成对能也*更小*，第二、三过渡系的配合物几乎全部是低自旋的。

::: proposition 约根森分解式（经验规律） {#prop-jorgensen}
在约 10 % 的精度内，配合物 $\mathrm{[ML_6]}$ 的八面体分裂可写成一个配体因子 $f$ 与一个金属因子 $g$ 之积，
$$
\Delta_\mathrm{o} \approx f(\mathrm{L}) \times g(\mathrm{M}),
$$ {#eq-jorgensen}
并按定义取 $f(\mathrm{H_2O}) = 1$。代表性数值（C. K. Jørgensen，按 Huheey 的表）：$f$ = 0.72（$\mathrm{Br^-}$）、0.78（$\mathrm{Cl^-}$）、0.9（$\mathrm{F^-}$）、1.00（$\mathrm{H_2O}$）、1.25（$\mathrm{NH_3}$）、1.28（en）、1.7（$\mathrm{CN^-}$）；以 $10^3\ \mathrm{cm^{-1}}$ 为单位的 $g$ = 8.0（$\mathrm{Mn^{2+}}$）、8.7（$\mathrm{Ni^{2+}}$）、9.0（$\mathrm{Co^{2+}}$）、14.0（$\mathrm{Fe^{3+}}$）、17.4（$\mathrm{Cr^{3+}}$）、18.2（$\mathrm{Co^{3+}}$）、27.0（$\mathrm{Rh^{3+}}$）、32.0（$\mathrm{Ir^{3+}}$）、36.0（$\mathrm{Pt^{4+}}$）。这条规律是针对六个相同配体的八面体配合物的经验规律性，在晶体场理论内部无法推导。
:::

::: example 在测量之前估算 Δo {#ex-jorgensen}
估算 (a) $\mathrm{[Co(NH_3)_6]^{3+}}$、(b) $\mathrm{[CrCl_6]^{3-}}$ 与 (c) $\mathrm{[Cr(en)_3]^{3+}}$ 的 $\Delta_\mathrm{o}$，并与实验值 $22\,900$、$13\,600$ 与 $21\,900\ \mathrm{cm^{-1}}$ 比较。$\mathrm{[Cr(en)_3]^{3+}}$ 可能是什么颜色？
::: solution
(a) $1.25 \times 18.2 \times 10^3 = 22\,750\ \mathrm{cm^{-1}}$，与实验值相差 1 % 以内。(b) $0.78 \times 17.4 \times 10^3 = 13\,570\ \mathrm{cm^{-1}}$，相差 0.3 %。(c) $1.28 \times 17.4 \times 10^3 = 22\,270\ \mathrm{cm^{-1}}$，约偏高 2 %。对铬(III)（$d^3$），最低的自旋允许吸收带位于 $\Delta_\mathrm{o}$ 处（原因见[[coordination-chemistry/spectra-of-complexes]]），所以 $\mathrm{[Cr(en)_3]^{3+}}$ 在 $1/21\,900\ \mathrm{cm^{-1}} = 457\ \mathrm{nm}$ 附近的蓝光处吸收，看上去应是黄色到橙色；它的盐确实是黄色的。相反，$\mathrm{[CrCl_6]^{3-}}$ 在 $735\ \mathrm{nm}$ 附近吸收，富氯的铬(III)物种呈绿色或紫色。铬(III)随配体交换而变色，是光谱化学序列最直观的演示之一。
:::
:::

::: warning 光谱化学序列不是静电序列 {#warn-spectrochemical}
若配体真是点电荷，阴离子对 $d$ 轨道的分裂应比中性分子更强，而半径小、电荷高的离子最强。序列却恰恰相反：$\mathrm{F^-}$、$\mathrm{OH^-}$ 与 $\mathrm{O^{2-}}$ 给体比中性的水和氨更弱，碘离子是所有配体中最弱的，而最强的配体 CO 与 $\mathrm{CN^-}$ 在给体原子上只有很小的偶极或电荷。晶体场理论无法解释这一点，也不该试图用电荷或半径去凑出这个次序。解释是共价性的：$\sigma$ 给体抬高 $e_g$，$\pi$ 给体（卤离子、氢氧根）抬高 $t_{2g}$ 因而*减小* $\Delta_\mathrm{o}$，$\pi$ 受体（CO、$\mathrm{CN^-}$、膦、bpy）降低 $t_{2g}$ 因而*增大* $\Delta_\mathrm{o}$。这是[[coordination-chemistry/ligand-field-mo]]的主题。晶体场理论给出图样；次序本身需要轨道。
:::

## 四面体场与平面正方形场

要比较不同几何构型，我们需要一种方法来计算每个配体把每个轨道抬高多少。最简单且自洽的方案（它能重现点电荷模型关于分裂的对称性与比值的结论）是给每个金属-配体接触指定一份能量，正比于 $d$ 轨道沿配体方向上角向振幅的平方。这就是**角重叠模型**的 $\sigma$ 部分，在[[coordination-chemistry/ligand-field-mo]]中作为成键理论处理；这里我们只把它当作记账工具。

::: proposition 四面体分裂是八面体分裂的九分之四 {#prop-tetrahedral}
设 $z$ 轴上的一个配体把 $d_{z^2}$ 抬高 $e_\sigma$，并设沿方向 $\hat{\mathbf{n}}$ 的每个配体把轨道 $d$ 抬高 $e_\sigma F_d(\hat{\mathbf{n}})^2$，其中 $F_d$ 是把最大值归一化为 1 的该轨道角向函数。那么对相同的金属、配体与金属-配体距离：

- 八面体：$E(e_g) = 3e_\sigma$，$E(t_{2g}) = 0$，故 $\Delta_\mathrm{o} = 3e_\sigma$；
- 四面体：$E(t_2) = \tfrac{4}{3}e_\sigma$，$E(e) = 0$，故 $\Delta_\mathrm{t} = \tfrac{4}{3}e_\sigma = \tfrac{4}{9}\Delta_\mathrm{o}$，且两组的顺序*倒转*。

点电荷晶体场模型给出同样的比值 $\Delta_\mathrm{t} = \tfrac{4}{9}\Delta_\mathrm{o}$。
:::

::: proof
归一化角向函数为 $F_{z^2} = \tfrac{1}{2}(3n_z^2 - 1)$、$F_{x^2-y^2} = \tfrac{\sqrt3}{2}(n_x^2 - n_y^2)$、$F_{xy} = \sqrt3\,n_xn_y$，$xz$、$yz$ 依此类推，其中 $(n_x, n_y, n_z)$ 是指向配体的单位矢量。

*八面体*，配体在 $\pm\hat x$、$\pm\hat y$、$\pm\hat z$。对 $d_{z^2}$：两个轴向配体各给出 $F = 1$，四个赤道配体给出 $F = -\tfrac12$，故 $E = (2 \times 1 + 4 \times \tfrac14)e_\sigma = 3e_\sigma$。对 $d_{x^2-y^2}$：四个赤道配体给出 $F = \pm\tfrac{\sqrt3}{2}$，轴向配体给出 $0$，故 $E = 4 \times \tfrac34 e_\sigma = 3e_\sigma$。对 $d_{xy}$、$d_{xz}$、$d_{yz}$：每个配体都在坐标轴上，那里 $\hat{\mathbf n}$ 的三个分量中有两个为零，故 $F = 0$，$E = 0$。

*四面体*，配体在 $(1,1,1)/\sqrt3$、$(1,-1,-1)/\sqrt3$、$(-1,1,-1)/\sqrt3$、$(-1,-1,1)/\sqrt3$。对 $d_{xy}$：$n_xn_y = \pm\tfrac13$，于是每个配体给出 $F^2 = 3 \times \tfrac19 = \tfrac13$，$E = 4 \times \tfrac13 e_\sigma = \tfrac43 e_\sigma$；由对称性 $d_{xz}$ 与 $d_{yz}$ 相同。对 $d_{z^2}$：由 $n_z^2 = \tfrac13$ 得 $F = 0$；对 $d_{x^2-y^2}$：由 $n_x^2 = n_y^2$ 得 $F = 0$。所以 $E(t_2) = \tfrac43 e_\sigma$，$E(e) = 0$。

比值为 $\Delta_\mathrm{t}/\Delta_\mathrm{o} = (\tfrac43 e_\sigma)/(3e_\sigma) = \tfrac49$。作为检验，六个配体的总抬升为 $6e_\sigma$，四个配体为 $3 \times \tfrac43 e_\sigma = 4e_\sigma$：每个配体总共贡献 $e_\sigma$，因为在任何方向都有 $\sum_d F_d^2 = 1$。相对于重心，四面体的能级为 $E(e) = -\tfrac35\Delta_\mathrm{t}$、$E(t_2) = +\tfrac25\Delta_\mathrm{t}$，即把重心规则用于 $2 + 3$ 的分裂、只是二轨道组在下方。
:::

四面体的符号没有下标 $g$，因为四面体没有反演中心。由于 $\Delta_\mathrm{t}$ 不到 $\Delta_\mathrm{o}$ 的一半，且对 $3d$ 金属总是小于成对能，**四面体配合物几乎总是高自旋的**。四面体的 CFSE 值由占据数 $e^at_2^b$ 得出：$\mathrm{CFSE} = (-\tfrac35 a + \tfrac25 b)\Delta_\mathrm{t}$。

::: example 正尖晶石与反尖晶石 {#ex-spinels}
在尖晶石 $\mathrm{AB_2O_4}$ 中，氧离子构成立方密堆积阵列；**正**尖晶石中 $\mathrm{A^{2+}}$ 占据四面体空隙、$\mathrm{B^{3+}}$ 占据八面体空隙，**反**尖晶石中四面体空隙容纳一半的 $\mathrm{B^{3+}}$，写作 $\mathrm{B[AB]O_4}$。磁铁矿 $\mathrm{Fe_3O_4} = \mathrm{Fe^{II}Fe^{III}_2O_4}$ 是反式的，而褐锰矿 $\mathrm{Mn_3O_4} = \mathrm{Mn^{II}Mn^{III}_2O_4}$ 是正式的。请用**八面体择位能** $\mathrm{OSPE} = \mathrm{CFSE(oct)} - \mathrm{CFSE(tet)}$ 解释这一点，取 $\Delta_\mathrm{t} = \tfrac49\Delta_\mathrm{o}$，所有离子一律按高自旋处理。
::: solution
氧离子是弱场配体，所以所有离子都是高自旋。以各离子自身的 $\Delta_\mathrm{o}$ 为单位逐一计算。

$\mathrm{Fe^{3+}}$ 与 $\mathrm{Mn^{2+}}$ 都是 $d^5$：两种位置上的 CFSE 都是零，故 OSPE $= 0$。这两种离子没有偏好。

$\mathrm{Fe^{2+}}$，$d^6$：八面体 $t_{2g}^4e_g^2$，$-0.4\Delta_\mathrm{o}$。四面体 $e^3t_2^3$，$3(-0.6) + 3(0.4) = -0.6\Delta_\mathrm{t} = -0.267\Delta_\mathrm{o}$。OSPE $= -0.4 + 0.267 = -0.133\Delta_\mathrm{o}$：对八面体位有适度的偏好。

$\mathrm{Mn^{3+}}$，$d^4$：八面体 $t_{2g}^3e_g^1$，$-0.6\Delta_\mathrm{o}$。四面体 $e^2t_2^2$，$-1.2 + 0.8 = -0.4\Delta_\mathrm{t} = -0.178\Delta_\mathrm{o}$。OSPE $= -0.422\Delta_\mathrm{o}$：强烈的八面体偏好。

磁铁矿中，$\mathrm{Fe^{3+}}$ 不在乎自己待在哪里，而 $\mathrm{Fe^{2+}}$ 待在八面体位有利，于是 $\mathrm{Fe^{2+}}$ 占据一个八面体空隙，把一个 $\mathrm{Fe^{3+}}$ 挤进四面体空隙：反式，$\mathrm{Fe^{III}[Fe^{II}Fe^{III}]O_4}$。褐锰矿中 $\mathrm{Mn^{3+}}$ 有很强的偏好而 $\mathrm{Mn^{2+}}$ 没有，所以 $\mathrm{Mn^{3+}}$ 占住全部八面体空隙：正式。相邻八面体位之间 $\mathrm{Fe^{2+}}$ 与 $\mathrm{Fe^{3+}}$ 的电子跳跃，也是磁铁矿作为氧化物导电性如此之好的原因。这一论证忽略了马德隆能——它倾向于把电荷更高的离子放进八面体位——而且只在 CFSE 差别大的地方成立；尖晶石是[[materials-chemistry/crystal-structures]]的标准题材。
:::
:::

### 由四方畸变看平面正方形配合物

平面正方形配合物最好看作把八面体沿 $z$ 轴的两个配体拉开后的结果。随着轴向配体远离，一切含 $z$ 分量的轨道都失去排斥：$d_{z^2}$ 大幅下降，$d_{xz}$ 与 $d_{yz}$ 降到 $d_{xy}$ 之下。在角重叠的记账方案里，把轴向相互作用乘以系数 $s$（$s = 1$ 为八面体，$s = 0$ 为平面正方形），并允许每个配体还与它所面对的 $t_{2g}$ 型轨道有一个较弱的 $\pi$ 相互作用 $e_\pi$。于是
$$
E(d_{x^2-y^2}) = 3e_\sigma,\quad E(d_{z^2}) = (1 + 2s)e_\sigma,\quad E(d_{xy}) = 4e_\pi,\quad E(d_{xz}) = E(d_{yz}) = (2 + 2s)e_\pi.
$$ {#eq-tetragonal}

::: widget plot
f: 3; 1 + 2*x; 4*p; 2*p + 2*p*x
x: 0, 1
y: -0.2, 3.4
sliders: p=0.25:0:0.6:0.05
labels: d_{x^2-y^2}; d_{z^2}; d_{xy}; d_{xz},\ d_{yz}
caption: 由[[#eq-tetragonal]]得到的 $d$ 轨道能量（以 $e_\sigma$ 为单位）的角重叠估计，随两个轴向配体被拉走而变化：$x = 0$ 为平面正方形，$x = 1$ 为八面体（$x$ 是轴向相互作用相对赤道向相互作用的比值）。滑块设定 $\pi$ 相互作用 $e_\pi/e_\sigma$，卤离子通常取 0.1–0.3，胺类几乎为零。$x = 1$ 时出现人们熟悉的 $e_g$ 与 $t_{2g}$ 两组，间隔为 $3e_\sigma - 4e_\pi$。$x = 0$ 时 $d_{x^2-y^2}$ 轨道独立高悬，远在其余轨道之上。这样 $d^8$ 离子就能把全部八个电子放进下面四个轨道，让 $d_{x^2-y^2}$ 空着。模型忽略了 $d_{z^2}$ 与金属 $4s$ 轨道的混合；在真实的平面正方形配合物中，这一混合会把 $d_{z^2}$ 压得更低。
:::

对 $d^8$ 离子，平面正方形排布使强反键的 $d_{x^2-y^2}$ 保持空置；当 $e_\sigma$ 很大时，所得能量足以补偿失去两个金属-配体键的代价。这就是为什么分裂大的重金属的 $d^8$ 离子（Pd(II)、Pt(II)、Au(III)、Rh(I)、Ir(I)）几乎都取平面正方形构型，而镍(II)只有与强场配体结合时才如此：$\mathrm{[Ni(CN)_4]^{2-}}$ 是平面正方形、抗磁性的，而 $\mathrm{[NiCl_4]^{2-}}$ 是四面体、顺磁性的，有两个未成对电子。

## 姜-泰勒效应

氯化铜(II)的结构单元不是正八面体。固态中每个铜周围有四个 $230\ \mathrm{pm}$ 的氯与两个 $295\ \mathrm{pm}$ 的氯，而且几乎所有六配位铜(II)化合物都呈现四短两长的键长模式。原因是一条普遍定理。

::: theorem 姜-泰勒定理 {#thm-jahn-teller}
处于轨道简并电子态的任何非线型分子，相对于某种降低其对称性、解除简并的核骨架畸变都是不稳定的（H. A. Jahn 与 E. Teller，1937 年）。
:::

定理只断言存在某种畸变，并不给出畸变有多大、取什么形式。对八面体配合物，重要的情形是 $e_g$ 组的不均匀占据，其能量问题几行就能算清。

::: proposition 姜-泰勒畸变的大小 {#prop-jt-size}
设某八面体配合物沿 $z$ 轴伸长一小量 $\delta$（轴向键变长 $\delta$，赤道键略缩短）。一级近似下 $e_g$ 二重简并的分裂是对称的：$d_{z^2}$ 下降 $\tfrac12 a\delta$，$d_{x^2-y^2}$ 上升 $\tfrac12 a\delta$，而骨架的弹性能按 $\tfrac12 k\delta^2$ 上升。对较低 $e_g$ 分量比较高分量多一个电子的组态（例如 $e_g^3$ 即 $d_{z^2}^2d_{x^2-y^2}^1$，或 $e_g^1$ 即 $d_{z^2}^1$），能量为
$$
E(\delta) = -\tfrac12 a\delta + \tfrac12 k\delta^2,
$$
在 $\delta^* = a/2k$ 处取极小，稳定化能为 $a^2/8k$。若 $e_g$ 组空置、半满或全满，线性项相消，正八面体就是稳定的。
:::

::: proof
设 $d_{z^2}$ 上有 $n_1$ 个电子、$d_{x^2-y^2}$ 上有 $n_2$ 个，电子能量改变 $-\tfrac12 a\delta n_1 + \tfrac12 a\delta n_2 = -\tfrac12 a\delta(n_1 - n_2)$；$e_g$ 对的重心在一级近似下不动（重心规则），而 $t_{2g}$ 组的分裂小得多，因为它的轨道不指向配体。加上谐振恢复能得 $E(\delta) = -\tfrac12 a(n_1 - n_2)\delta + \tfrac12 k\delta^2$。令 $\dd E/\dd\delta = 0$ 得 $\delta^* = a(n_1 - n_2)/2k$，$E(\delta^*) = -a^2(n_1 - n_2)^2/8k$。取 $n_1 - n_2 = 1$ 即得前面陈述的结果。由于对足够小的 $\delta$ 线性项总是压过二次项，*任何*非零的 $n_1 - n_2$ 都使未畸变结构不稳定，这正是[[#thm-jahn-teller]]在此情形下的内容。当 $n_1 = n_2$ 时线性项消失，$\delta^* = 0$。沿 $z$ 压缩（$\delta < 0$）且 $n_1 - n_2 = -1$ 给出同样的能量；伸长在实际中远更常见，这种偏好来自这里未包含的高阶（非谐与 $4s$ 混合）项。
:::

$e_g$ 不均匀占据的组态有 $d^9$（$t_{2g}^6e_g^3$）、高自旋 $d^4$（$t_{2g}^3e_g^1$，$\mathrm{Cr^{2+}}$、$\mathrm{Mn^{3+}}$）与低自旋 $d^7$（$t_{2g}^6e_g^1$，少见）。这些情形的畸变很大，能直接在晶体结构中看到。$t_{2g}$ 的不均匀占据（$d^1$、$d^2$、低自旋 $d^4$ 与 $d^5$、高自旋 $d^6$ 与 $d^7$）原则上也会产生姜-泰勒畸变，但 $t_{2g}$ 轨道与配体的相互作用弱，系数 $a$ 小，这一效应通常被热运动与晶体的不对称性所掩盖。

::: example 铜(II)与铬(II) {#ex-jahn-teller}
(a) 说明 $\mathrm{CuCl_2}$ 的伸长结构在意料之中。(b) $\mathrm{[Cr(H_2O)_6]^{2+}}$、$\mathrm{[Cr(H_2O)_6]^{3+}}$、$\mathrm{[Mn(H_2O)_6]^{3+}}$、$\mathrm{[Ni(H_2O)_6]^{2+}}$ 与 $\mathrm{[Fe(CN)_6]^{3-}}$ 中，哪些应显示强姜-泰勒畸变？(c) 为什么由 $\mathrm{[Cu(en)_2(H_2O)_2]^{2+}}$ 生成 $\mathrm{[Cu(en)_3]^{2+}}$ 的平衡常数非常小？
::: solution
(a) 铜(II)是 $d^9$，$t_{2g}^6e_g^3$：$e_g$ 组中缺一个电子（空穴），对伸长的排布 $d_{z^2}^2d_{x^2-y^2}^1$ 有 $n_1 - n_2 = 1$。由[[#prop-jt-size]]，八面体会发生畸变。四个短键（230 pm）位于单占据 $d_{x^2-y^2}$ 轨道所在的平面内，两个长键（295 pm）沿双占据 $d_{z^2}$ 轨道的轴向，后者更强烈地排斥轴向配体。

(b) $\mathrm{Cr^{2+}}$（$d^4$，水配体为弱场，故高自旋 $t_{2g}^3e_g^1$）：强。$\mathrm{Cr^{3+}}$（$d^3$，$t_{2g}^3$）：无简并，正八面体。$\mathrm{Mn^{3+}}$（$d^4$ 高自旋）：强。$\mathrm{Ni^{2+}}$（$d^8$，$t_{2g}^6e_g^2$，每个 $e_g$ 轨道各一个电子）：无。$\mathrm{[Fe(CN)_6]^{3-}}$（低自旋 $d^5$，$t_{2g}^5$）：存在 $t_{2g}$ 简并，故只有弱畸变。

(c) 在 $\mathrm{[Cu(en)_2(H_2O)_2]^{2+}}$ 中，两个 en 占据四个短的赤道位置，水占据长的轴向位置。第三个 en 必须横跨一个赤道位与一个轴向位，或者迫使几何结构处于张力之下，所以它结合得弱。铜(II)与 en 的逐级生成常数（在[[coordination-chemistry/complex-stability]]中分析过）在第三步急剧下降，原因正在于此。
:::
:::

## 热力学后果

CFSE 只占配合物总成键能的一小部分，通常 5–10 %，但它是整个系列中*不规则变化的那一部分*。因此，本应随离子半径平稳缩小而平滑变化的性质，会显出 CFSE 图的双峰形状。最清楚的情形是第一过渡系 $\mathrm{M^{2+}}$ 离子的水合焓 $\mathrm{M^{2+}(g)} \rightarrow \mathrm{[M(H_2O)_6]^{2+}(aq)}$：从钙到锌它变得更负，但在 $\mathrm{V^{2+}}$（$d^3$）与 $\mathrm{Ni^{2+}}$（$d^8$）处落到一条平滑线之下，而 CFSE 为零的 $\mathrm{Ca^{2+}}$、$\mathrm{Mn^{2+}}$ 与 $\mathrm{Zn^{2+}}$ 恰好落在线上。二卤化物的晶格焓与 $\mathrm{M^{2+}}$ 的离子半径（从 $d^1$ 到 $d^3$ 缩小得比平均更快，因为新加的电子进入不屏蔽配体所受核电荷的 $t_{2g}$ 轨道）也呈现同样的图样。

::: example 镍(II)的水合焓中有多少来自 CFSE？ {#ex-hydration}
水合焓（Marcus 的汇编）约为：$\mathrm{Mn^{2+}}$ $-1841\ \mathrm{kJ\,mol^{-1}}$，$\mathrm{Ni^{2+}}$ $-2105$，$\mathrm{Zn^{2+}}$ $-2046$。在 CFSE 为零的 $\mathrm{Mn^{2+}}$（$d^5$）与 $\mathrm{Zn^{2+}}$（$d^{10}$）之间线性内插，估算 $\mathrm{Ni^{2+}}$ 的“多余”稳定化能，并与由 $\mathrm{[Ni(H_2O)_6]^{2+}}$ 的 $\Delta_\mathrm{o} = 8500\ \mathrm{cm^{-1}}$ 算出的 CFSE 比较。
::: solution
镍位于从 Mn（$d^5$）到 Zn（$d^{10}$）的五分之三处，所以内插值为
$$
-1841 + \tfrac35(-2046 + 1841) = -1841 - 123 = -1964\ \mathrm{kJ\,mol^{-1}}.
$$
实测值为 $-2105$，故多余部分为 $-2105 - (-1964) = -141\ \mathrm{kJ\,mol^{-1}}$。$d^8$ 的 CFSE 为 $-1.2\Delta_\mathrm{o} = -1.2 \times 8500 = -10\,200\ \mathrm{cm^{-1}}$，即 $-10\,200 \times 0.01196 = -122\ \mathrm{kJ\,mol^{-1}}$。考虑到内插假定背景完全线性，且配合物中的 $\Delta_\mathrm{o}$ 并不恰好是水合步骤相关的量，约 15 % 的一致性已相当好。最令人注目的是，从溶液颜色读出的一个分裂值，竟能解释热化学循环中大部分的反常。
:::
:::

同样的 CFSE 图样是配合物稳定性的**欧文-威廉姆斯序列** $\mathrm{Mn^{2+}} < \mathrm{Fe^{2+}} < \mathrm{Co^{2+}} < \mathrm{Ni^{2+}} < \mathrm{Cu^{2+}} > \mathrm{Zn^{2+}}$ 的基础（见[[coordination-chemistry/complex-stability]]，其中铜的领先来自它的姜-泰勒畸变），它也解释了为什么 $d^3$ 与低自旋 $d^6$ 离子在取代上是惰性的（[[coordination-chemistry/inorganic-mechanisms]]）：解离型过渡态会失去它们很大一部分的大 CFSE。

## 后续内容

晶体场理论给了我们 $2 + 3$ 图样、参数 $\Delta_\mathrm{o}$、自旋状态判据与姜-泰勒畸变。它做不到的是解释光谱化学序列或金属羰基化合物的 18 电子规则；[[coordination-chemistry/ligand-field-mo]]用按对称性构造的 $\sigma$ 与 $\pi$ 成键轨道取代了点电荷。多 $d$ 电子离子的光谱还需要晶体场理论略去的电子间排斥；Tanabe–Sugano 图在[[coordination-chemistry/spectra-of-complexes]]中把两者结合起来。自旋状态可用磁学方法测定，见[[coordination-chemistry/magnetism]]，其中还涉及 $\Delta_\mathrm{o}$ 与 $P$ 几乎相等的自旋交叉化合物。同样的分裂图样以更小的分裂出现在固体氧化物与宝石中，见[[materials-chemistry/magnetic-optical]]。

::: history
这一理论发端于固体物理学。汉斯·贝特（Hans Bethe）1929 年的论文《晶体中项的分裂》（“Termaufspaltung in Kristallen”，载《物理学年鉴》）用群论给出自由离子的能级置于给定对称性的晶体中如何分裂；约翰·范弗莱克（John Hasbrouck Van Vleck）在 1930 年代初把这一思想用于过渡金属盐的磁化率，并于 1935 年发表比较配合物的晶体场、价键与分子轨道描述的论文。化学家在之后二十年里基本忽视了这项工作，更偏爱莱纳斯·鲍林（Linus Pauling）关于“内轨”与“外轨”配合物的价键描述。Ryutaro Tsuchida 1938 年的光谱化学序列是没有理论支撑的经验观测。转折点出现在 1951 年：F. E. Ilse 与 H. Hartmann 把 $\mathrm{[Ti(H_2O)_6]^{3+}}$ 的可见光谱解释为跨越晶体场分裂的 $d \rightarrow d$ 跃迁；此后数年间，莱斯特·奥尔格（Leslie Orgel）、约恩·比耶鲁姆（Jørgen Bjerrum）、克里斯蒂安·克利克斯比尔·约根森（Christian Klixbüll Jørgensen）等人把这套处理推广到其他离子。赫尔曼·姜恩（Hermann Jahn）与爱德华·特勒（Edward Teller）的定理发表于 1937 年，其对于铜(II)的化学后果在 1950 年代得到阐明。
:::

::: summary
- 配体抬高指向它们的 $d$ 轨道。八面体中，$e_g$ 对（$d_{z^2}$、$d_{x^2-y^2}$）在 $t_{2g}$ 三重之上 $\Delta_\mathrm{o}$ 处，离重心分别为 $+\tfrac35\Delta_\mathrm{o}$ 与 $-\tfrac25\Delta_\mathrm{o}$。
- $t_{2g}^ae_g^b$ 的 CFSE 为 $(-0.4a + 0.6b)\Delta_\mathrm{o}$。对 $d^4$–$d^7$，$\Delta_\mathrm{o} > P$ 时配合物为低自旋，$\Delta_\mathrm{o} < P$ 时为高自旋。
- $\Delta_\mathrm{o}$ 服从经验的光谱化学序列（$\mathrm{I^-}$ 最弱，CO 最强），随氧化态升高、沿族向下增大，近似为 $f(\mathrm{L})\,g(\mathrm{M})$；4d 与 5d 配合物为低自旋。
- 序列的次序不是静电的；它需要配体场理论的 $\sigma$、$\pi$ 成键图像。
- 四面体场使图样倒转（$e$ 在 $t_2$ 之下），且 $\Delta_\mathrm{t} = \tfrac49\Delta_\mathrm{o}$，所以四面体配合物为高自旋；由 CFSE 得出的占位偏好解释了正、反尖晶石。
- 移去轴向配体使 $d_{x^2-y^2}$ 独立高悬，于是分裂大的 $d^8$ 离子取平面正方形。
- $e_g$ 的不均匀占据（$d^9$、高自旋 $d^4$、低自旋 $d^7$）引起强姜-泰勒畸变，通常为伸长；CFSE 解释了水合焓与晶格焓中的双峰。
:::

## 习题

::: exercise 铬(III)的 CFSE {level=1 check="-1.2"}
写出 $\mathrm{[Cr(H_2O)_6]^{3+}}$ 的 $d$ 电子组态，并以 $\Delta_\mathrm{o}$ 为单位给出它的 CFSE。已知 $\Delta_\mathrm{o} = 17\,400\ \mathrm{cm^{-1}}$，把 CFSE 用 $\mathrm{kJ\,mol^{-1}}$ 表示。（把 CFSE 以 $\Delta_\mathrm{o}$ 的倍数输入。）
::: solution
铬(III)是 $d^3$：$t_{2g}^3$，无论场多强，每个 $t_{2g}$ 轨道各有一个电子。CFSE $= 3 \times (-0.4)\Delta_\mathrm{o} = -1.2\Delta_\mathrm{o} = -1.2 \times 17\,400 = -20\,880\ \mathrm{cm^{-1}}$，而 $-20\,880 \times 0.01196 = -250\ \mathrm{kJ\,mol^{-1}}$。
:::
:::

::: exercise 锰(II)的未成对电子 {level=1 check="1"}
预测 $\mathrm{[Mn(H_2O)_6]^{2+}}$ 与 $\mathrm{[Mn(CN)_6]^{4-}}$ 的未成对电子数。（输入氰配合物的数值。）
::: solution
两者都是锰(II)，$d^5$。水是弱场而 $P(\mathrm{Mn^{2+}})$ 很大（约 $25\,500\ \mathrm{cm^{-1}}$），所以水合离子为高自旋 $t_{2g}^3e_g^2$，有**五**个未成对电子。氰离子位于光谱化学序列的顶端；$\mathrm{[Mn(CN)_6]^{4-}}$ 为低自旋 $t_{2g}^5$，只有**一**个未成对电子。
:::
:::

::: exercise 由 Δo 求颜色 {level=1 check="465"}
$\mathrm{[Cr(NH_3)_6]^{3+}}$ 的 $\Delta_\mathrm{o} = 21\,500\ \mathrm{cm^{-1}}$，其最低自旋允许吸收带位于 $\Delta_\mathrm{o}$ 处。它在什么波长吸收？你预期它是什么颜色？（波长以 nm 输入，保留三位有效数字。）
::: solution
$\lambda = 1/\tilde\nu = 1/(21\,500\ \mathrm{cm^{-1}}) = 4.65\times10^{-5}\ \mathrm{cm} = 465\ \mathrm{nm}$，在蓝光区。互补色是黄橙色，六氨合铬(III)的盐正是黄色的。
:::
:::

::: exercise 第二过渡系的估算 {level=2 check="33750"}
用[[#prop-jorgensen]]估算 $\mathrm{[Rh(NH_3)_6]^{3+}}$ 的 $\Delta_\mathrm{o}$，并与实验值 $34\,100\ \mathrm{cm^{-1}}$ 比较。该配合物是高自旋还是低自旋？（估算值以 $\mathrm{cm^{-1}}$ 输入。）
::: solution
$\Delta_\mathrm{o} \approx 1.25 \times 27.0 \times 10^3 = 33\,750\ \mathrm{cm^{-1}}$，比实验值低 1 %。铑(III)是 $d^6$；超过 $30\,000\ \mathrm{cm^{-1}}$ 的分裂远远超过 $4d$ 离子任何可信的成对能，所以配合物为低自旋 $t_{2g}^6$、抗磁性，这与几乎所有铑(III)配合物一样。
:::
:::

::: exercise 四面体钴(II) {level=2 check="-1.2"}
蓝色的四氯合钴(II)酸根离子 $\mathrm{[CoCl_4]^{2-}}$ 是四面体的。写出它的组态、未成对电子数，并以 $\Delta_\mathrm{t}$ 为单位给出 CFSE。若 $\Delta_\mathrm{t} = 3300\ \mathrm{cm^{-1}}$，按[[#prop-tetrahedral]]，相同距离下的八面体钴(II)氯配合物的 $\Delta_\mathrm{o}$ 应是多少？（CFSE 以 $\Delta_\mathrm{t}$ 的倍数输入。）
::: solution
钴(II)是 $d^7$。四面体场中 $e$ 对最低，高自旋填满 $e^4t_2^3$，有三个未成对电子。CFSE $= 4(-0.6) + 3(0.4) = -1.2\Delta_\mathrm{t}$。相同距离下的八面体分裂应为 $\Delta_\mathrm{o} = \tfrac94\Delta_\mathrm{t} = 7425\ \mathrm{cm^{-1}}$，对钴(II)与氯离子来说是合理的值（对比 $f\,g = 0.78 \times 9.0 \times 10^3 = 7020\ \mathrm{cm^{-1}}$）。$\mathrm{[CoCl_4]^{2-}}$ 强烈的蓝色与 $\mathrm{[Co(H_2O)_6]^{2+}}$ 淡粉色的强烈反差，正是掺钴硅胶“湿度指示剂”的原理。
:::
:::

::: exercise 哪种尖晶石？ {level=2}
用八面体择位能预测 (a) $\mathrm{NiFe_2O_4}$、(b) $\mathrm{Co_3O_4}$（$\mathrm{Co^{II}Co^{III}_2O_4}$，其中低自旋 $\mathrm{Co^{III}}$ 占据八面体位）与 (c) $\mathrm{ZnFe_2O_4}$ 是正式还是反式尖晶石。
::: solution
(a) $\mathrm{Ni^{2+}}$，$d^8$：八面体 $-1.2\Delta_\mathrm{o}$，四面体 $e^4t_2^4 = -0.8\Delta_\mathrm{t} = -0.356\Delta_\mathrm{o}$；OSPE $= -0.84\Delta_\mathrm{o}$，强烈的八面体偏好。$\mathrm{Fe^{3+}}$（$d^5$）没有偏好，所以铁酸镍是**反式**尖晶石，$\mathrm{Fe[NiFe]O_4}$。(b) 低自旋 $\mathrm{Co^{3+}}$ 在八面体位的 CFSE 为 $-2.4\Delta_\mathrm{o}$，而在四面体位它将是高自旋，只有 $-0.6\Delta_\mathrm{t}$；它的八面体偏好是压倒性的。$\mathrm{Co^{2+}}$，$d^7$ 高自旋，OSPE $= -0.8\Delta_\mathrm{o} + 1.2 \times \tfrac49\Delta_\mathrm{o} = -0.27\Delta_\mathrm{o}$，小得多（而且它的 $\Delta_\mathrm{o}$ 也更小）。所以 $\mathrm{Co^{3+}}$ 占住八面体空隙：**正式**。(c) $\mathrm{Zn^{2+}}$（$d^{10}$）与 $\mathrm{Fe^{3+}}$（$d^5$）在任何位置的 CFSE 都是零；晶体场没有可说的，观察到的**正式**结构反映的是 $\mathrm{Zn^{2+}}$ 强烈的四面体偏好（其类 $sp^3$ 的共价成键，如 ZnO 与 ZnS 中那样）。
:::
:::

::: exercise 姜-泰勒还是不？ {level=2}
对下列每个八面体离子，说明你预期它无姜-泰勒畸变、弱畸变还是强畸变：$\mathrm{[Ti(H_2O)_6]^{3+}}$、$\mathrm{[V(H_2O)_6]^{2+}}$、$\mathrm{[Fe(H_2O)_6]^{2+}}$、$\mathrm{[Co(NH_3)_6]^{3+}}$、$\mathrm{[CuF_6]^{4-}}$（在 $\mathrm{KCuF_3}$ 中）、$\mathrm{[MnF_6]^{3-}}$。
::: solution
$\mathrm{Ti^{3+}}$，$t_{2g}^1$：弱（$t_{2g}$ 简并）。$\mathrm{V^{2+}}$，$t_{2g}^3$：无（每个 $t_{2g}$ 轨道单占据，基态轨道非简并）。$\mathrm{Fe^{2+}}$ 高自旋，$t_{2g}^4e_g^2$：弱（三个 $t_{2g}$ 轨道之一有一对电子）。$\mathrm{Co^{3+}}$ 低自旋，$t_{2g}^6$：无。$\mathrm{Cu^{2+}}$，$e_g^3$：强；$\mathrm{KCuF_3}$ 是钙钛矿中协同姜-泰勒畸变的教科书例子。氟离子配位的 $\mathrm{Mn^{3+}}$，高自旋 $t_{2g}^3e_g^1$：强。
:::
:::

::: exercise 最佳畸变 {level=3 check="30"}
对某铜(II)配合物，取[[#prop-jt-size]]中的系数 $a = 3.0\ \mathrm{kJ\,mol^{-1}\,pm^{-1}}$、$k = 0.050\ \mathrm{kJ\,mol^{-1}\,pm^{-2}}$。(a) 求伸长量 $\delta^*$ 与姜-泰勒稳定化能。(b) 证明把 $k$ 加倍使 $\delta^*$ 减半、稳定化能也减半。(c) 解释为什么对镍(II)、用同样的系数，畸变会消失。（$\delta^*$ 以 pm 输入。）
::: hint
写出 $E(\delta) = -\tfrac12 a\delta + \tfrac12 k\delta^2$ 并求导。
:::
::: solution
(a) $\dd E/\dd\delta = -\tfrac12 a + k\delta = 0$ 给出 $\delta^* = a/2k = 3.0/(2 \times 0.050) = 30\ \mathrm{pm}$。于是 $E(\delta^*) = -\tfrac12(3.0)(30) + \tfrac12(0.050)(30)^2 = -45 + 22.5 = -22.5\ \mathrm{kJ\,mol^{-1}}$，恰等于 $-a^2/8k = -9.0/0.40$。(b) 取 $k = 0.100$：$\delta^* = 15\ \mathrm{pm}$，$E = -9.0/0.80 = -11.25\ \mathrm{kJ\,mol^{-1}}$：两者都减半，因为它们都与 $1/k$ 成正比。更硬的骨架（螯合或大环配体）会抑制畸变。(c) 镍(II)为 $e_g^2$，每个 $e_g$ 轨道各有一个电子，故 $n_1 - n_2 = 0$，线性项消失，极小在 $\delta = 0$：八面体是正的。这里算出的畸变量级——几十皮米——与许多铜(II)化合物中长短键之差相符（$\mathrm{CuCl_2}$ 中 $295 - 230 = 65\ \mathrm{pm}$，其中轴向键的伸长占大部分）。
:::
:::

::: exercise 为什么六水合钴(III)是低自旋？ {level=3 check="13.3"}
对 $\mathrm{[Co(H_2O)_6]^{3+}}$，[[#prop-jorgensen]]给出 $\Delta_\mathrm{o} \approx 18\,200\ \mathrm{cm^{-1}}$，而 $\mathrm{Co^{3+}}$ 的自由离子成对能为 $21\,000\ \mathrm{cm^{-1}}$。(a) 用这两个数，[[#prop-spin-state]]预言什么自旋状态？(b) 该离子实际上是低自旋、抗磁性的。要使判据相符，配合物中的成对能至少须降低百分之多少？(c) 这样的降低合理吗？（最低降低百分比以三位有效数字输入。）
::: solution
(a) $\Delta_\mathrm{o} = 18\,200 < P = 21\,000$，所以判据预言高自旋 $t_{2g}^4e_g^2$，四个未成对电子。(b) 低自旋要求 $P < 18\,200\ \mathrm{cm^{-1}}$，即至少降低 $(21\,000 - 18\,200)/21\,000 = 0.133$，即 **13.3 %**。(c) 合理。在配合物中金属 $d$ 轨道与配体轨道混合并扩展，对典型配体使电子间排斥降低 15–30 %（电子云扩展效应，用[[coordination-chemistry/spectra-of-complexes]]中的拉卡（Racah）参数度量）。因此用自由离子成对能的自旋状态判据偏向高自旋，$\mathrm{[Co(H_2O)_6]^{3+}}$ 正是这一偏差起作用的边缘情形。第二个效应朝同一方向起作用：低自旋的 $\mathrm{Co^{III}{-}O}$ 键比高自旋的短，所以低自旋状态对应的 $\Delta_\mathrm{o}$ 比这里用的平均值更大。（该离子是强氧化剂，$E^\circ(\mathrm{Co^{3+}/Co^{2+}}) = +1.92\ \mathrm{V}$，会缓慢氧化水。）
:::
:::
