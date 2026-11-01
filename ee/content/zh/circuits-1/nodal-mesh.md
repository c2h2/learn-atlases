并非每个电阻网络都能收缩成单个等效元件。一旦加入电流源、电桥拓扑或受控元件，你就无法继续合并，于是需要一种不靠先看出技巧、对任何网络都行的方法。节点分析法与网孔分析法正好胜任。两者无非是把基尔霍夫定律以严格、系统的方式写出来，都能把一张电路图变成一个小线性方程组：小电路可以手解，更大的用矩阵解。本课建立这两种方法，各给出完整的例题，并告诉你何时该用哪个。

## 节点分析法

这种方法建立在电流之上，它的天然未知量是网络各节点的电压。

::: definition 节点与节点电压 {#def-node}
**节点**是两个或更多电路元件相接之点，这些点之间的任何理想导线都属于同一个节点。**节点电压**是该节点相对于某个选定节点——**参考**节点或**地**节点——的电压，其电压定义为零。参考的选择对物理而言是任意的，实践中按方便确定；它就是真实电路板上的地。
:::

::: theorem 节点分析法 {#thm-nodal}
选定一个参考节点。对其余每个节点写一条方程，即该节点处的基尔霍夫电流定律，并用节点电压表示。由于每个元件电流都是节点电压之差除以其电阻，每个节点方程都是节点电压的线性方程。解出所得方程组即得节点电压，进而网络中每条支路的电流、电压与功率随之全部得出。
:::

关键一步是把每条支路电流依欧姆定律写成$(v_i - v_j)/R$，于是“从节点$i$流出进入节点$j$的电流”立刻给出$(v_i - v_j)/R$。把流出节点的电流求和并令其为零，就是该节点的全部方程。无需猜测电流方向。这正是方法机械化的由来。

::: example 含电流源的两节点电路 {#ex-nodal}
节点1经$R_1=2\ \mathrm{k\Omega}$接到$10\ \mathrm V$电源，经$R_2=5\ \mathrm{k\Omega}$接地，经$R_3=4\ \mathrm{k\Omega}$接到节点2。节点2经$R_4=5\ \mathrm{k\Omega}$接地，并由一个流入该节点的$2\ \mathrm{mA}$电流源驱动。求节点电压。
::: solution
采用“流出节点的电流之和为零”的约定，在节点1处：

$$
\frac{v_1-10}{2\ \mathrm{k}} + \frac{v_1}{5\ \mathrm{k}} + \frac{v_1-v_2}{4\ \mathrm{k}} = 0.
$$

在节点2，电流源注入$2\ \mathrm{mA}$：

$$
\frac{v_2-v_1}{4\ \mathrm{k}} + \frac{v_2}{5\ \mathrm{k}} - 2\ \mathrm{mA} = 0.
$$

以$\mathrm{k\Omega}$为电阻单位、$\mathrm{mA}$为电流单位写成标准形，系数矩阵为

$$
\begin{pmatrix} 0.85 & -0.25 \\ -0.25 & 0.45 \end{pmatrix}
\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} =
\begin{pmatrix} 5 \\ 2 \end{pmatrix}.
$$

解得$v_1 = 7.53\ \mathrm V$，$v_2 = 8.63\ \mathrm V$。校核：经$R_1$流出节点1的电流为$(10-7.53)/2\ \mathrm{k}\Omega = 1.23\ \mathrm{mA}$，流入$R_2$的电流为$7.53/5\ \mathrm{k\Omega}=1.51\ \mathrm{mA}$，流入$R_3$的电流为$(7.53-8.63)/4\ \mathrm{k}\Omega=-0.27\ \mathrm{mA}$；两者之和$1.51-0.27=1.23\ \mathrm{mA}$，基尔霍夫电流定律在节点1处严格成立。
:::
:::

::: warning 参考节点是选择，不是定律 {#warn-node}
你可以任选任何节点作为地，物理结果相同。但有些选择更好。若一个电压源跨在两个节点之间，把其中一侧的节点选为参考能减少未知量。若地被许多元件共用，方程会更简单。若电路中有受控源，你就需要为控制量多写一条方程，而把参考选得让该控制量正好是一个节点电压，往往是最干净的路子。要有意识地选参考：第一步就定，不要事后补。
:::

::: quiz
地上方单个节点，经$4\ \mathrm{k\Omega}$接$12\ \mathrm V$电源，经$2\ \mathrm{k\Omega}$接地。节点电压是多少？
- [x] $8\ \mathrm V$
- [ ] $12\ \mathrm V$
- [ ] $4\ \mathrm V$
- [ ] $2\ \mathrm V$
::: solution
这就是分压：$v = 12\times\dfrac{2}{4+2}=8\ \mathrm V$。较大的串联电阻（$4\ \mathrm{k\Omega}$）在电源与节点之间，所以节点电位更低。
:::
:::

## 网孔分析法

对偶的方法建立在电压之上。

::: definition 网孔 {#def-mesh}
**网孔**是平面电路中内部不含其他回路的回路。**网孔电流**是绕一个网孔流转的假想电流。平面电路中每个元件电流都表示为若干网孔电流的和或差，未知量是网孔电流，每个网孔一个。
:::

::: proposition 网孔方程 {#prop-mesh}
对每个网孔，绕其应用基尔霍夫电压定律，把每个元件电压写成$R$乘以流过它的网孔电流，对每个共享电阻带一个负号。结果是一个关于网孔电流的线性方程组。解出即得网孔电流，进而每个元件的电流、电压与功率全部得出。
:::

两种方法互为对偶：节点法用KCL，未知量是节点电压；网孔法用KVL，未知量是网孔电流。同一网络中，两者方程数目的差别只取决于你把网络如何划分；对具有$n$个节点、$b$条支路且没有浮接电源的电路，节点法需要$n-1$条方程，网孔法需要$b-n+1$条。对许多小电路，两者规模相当，但拓扑决定哪个更短。

::: example 两网孔电阻电路 {#ex-mesh}
一个$9\ \mathrm V$电源与一只$1\ \mathrm{k\Omega}$电阻串在左网孔中。一只$2\ \mathrm{k\Omega}$电阻为两网孔共享。右网孔含一只$3\ \mathrm{k\Omega}$电阻。求网孔电流与共享电阻中的电流。
::: solution
沿第一个网孔电流的方向绕左网孔应用基尔霍夫电压定律，得

$$
-9 + 1\ \mathrm{k}\ \mathcal I_1 + 2\ \mathrm{k}\,(\mathcal I_1 - \mathcal I_2) = 0,
$$

右网孔给出

$$
2\ \mathrm{k}\,(\mathcal I_2 - \mathcal I_1) + 3\ \mathrm{k}\ \mathcal I_2 = 0.
$$

以$\mathrm{k\Omega}$为电阻单位、$\mathrm{mA}$为电流单位的标准形为

$$
\begin{pmatrix} 3 & -2 \\ -2 & 5 \end{pmatrix}
\begin{pmatrix} \mathcal I_1 \\ \mathcal I_2 \end{pmatrix} = \begin{pmatrix} 9 \\ 0 \end{pmatrix}.
$$

解得$\mathcal I_1 = 4.09\ \mathrm{mA}$，$\mathcal I_2 = 1.64\ \mathrm{mA}$。共享的$2\ \mathrm{k\Omega}$中的电流为$\mathcal I_1 - \mathcal I_2 = 2.45\ \mathrm{mA}$。校核：左网孔压降为$1\ \mathrm{k}\times4.09\ \mathrm{mA} + 2\ \mathrm{k}\times2.45\ \mathrm{mA} = 4.09+4.91 = 9\ \mathrm V$，与电源相符；右网孔压降为$2\ \mathrm{k}\times(-2.45\ \mathrm{mA}) + 3\ \mathrm{k}\times1.64\ \mathrm{mA} = -4.91+4.91 = 0$，正合KVL。
:::
:::

## 方法之间的选择

实用规则取决于拓扑：选未知量更少的方法。同一网络中，节点法的未知量是每个（非参考）节点一个，网孔法的未知量是每个网孔一个。在电桥或电流源很多的网络里，网孔法往往规模更小；在支路多节点少的网络里，节点法更短。两者规模相当时，选方程较简单的那个；若网络含受控源，就选方程不需要额外约束的那个。

还有一层考虑：物理直觉。若网络模拟的器件本质上是电流驱动的（例如电流镜、跨导级或传感器输出），节点法更自然，因为器件自己的变量就是节点电压。若是电压驱动的，网孔法更直接。没有放之四海皆准的答案，但这个选择绝非随意。

## 超节点与超网孔

当一个电压源接在两个非参考节点之间时，两个节点电压不再独立，你无法直接对两者都写KCL。此时把两个节点合并为一个**超节点**，对合并后的节点写一条KCL方程，再补上“电压差等于电源电压”的约束。类似地，当一个电流源位于共享支路时，把两个网孔合并为一个**超网孔**，绕外圈写一条KVL方程，再补上关于网孔电流的约束。这两种手法都是原有两种方法的延伸，不是新方法。让方程从物理定律写出来，而不是记住一套程序——这种方法的纪律性正是它们奏效的原因。

把功率平衡保持为惯常动作还有另一个理由。在设计中，元件的功率不是校核项而是规格。电阻的额定值必须高于它实际承载的功率，电源必须能够提供网络所要求的一切，一个预期贴近电源轨的节点要对照流过它的电流来核查。确认解正确的那些数，正是设计者用来选器件的那些数；校核与选型这两件事，其实是同一次计算。平衡算一遍，两者皆得。

## 从已解网络计算功率

一旦求得节点电压或网孔电流，你最能体现价值的一步是算出每个元件的功率并检查平衡。这不是可选项。符号错误和漏掉的元件都在功率处现形；一个网络若提供的总功率不等于吸收的总功率，那么至少可以肯定：你还没有把它解出来。

::: example 已解网络的功率平衡 {#ex-power}
用例题的两节点电路，计算每个电阻的功率、电源提供的功率，并验证二者平衡。
::: solution
各支路电流为：经$2\ \mathrm{k\Omega}$的$i_1=1.23\ \mathrm{mA}$，经接地的$5\ \mathrm{k\Omega}$的$i_2=1.51\ \mathrm{mA}$，经$4\ \mathrm{k\Omega}$的$i_3=-0.27\ \mathrm{mA}$，以及$i_2$一侧、节点2处$5\ \mathrm{k\Omega}$中的$1.73\ \mathrm{mA}$。每个电阻的功率为$p=i^2R$：

$$
p_1 = 3.04\ \mathrm{mW},\quad p_2 = 11.35\ \mathrm{mW},\quad p_3 = 0.30\ \mathrm{mW},\quad p_4 = 14.9\ \mathrm{mW}.
$$

于是电阻共吸收$29.6\ \mathrm{mW}$。$10\ \mathrm V$电源提供$10\times1.23\ \mathrm{mA} = 12.3\ \mathrm{mW}$；$2\ \mathrm{mA}$电流源作用在$v_2=8.63\ \mathrm V$上，提供$8.63\times2\ \mathrm{mA} = 17.3\ \mathrm{mW}$；合计$29.6\ \mathrm{mW}$。提供的等于吸收的，解自洽。这个功率平衡是节点法或网孔法解最可靠的校核，而且永远可算，因为它用的就是你已有的那些数。
:::
:::

::: example 超网孔处理共享电流源 {#ex-supermesh}
两个网孔共享一条支路，它是一个$2\ \mathrm{mA}$电流源。左网孔经$1\ \mathrm{k\Omega}$接$5\ \mathrm V$电源，右网孔经$1\ \mathrm{k\Omega}$接地。求网孔电流。
::: solution
固定该支路的电流源给出约束$\mathcal I_1 - \mathcal I_2 = 2\ \mathrm{mA}$。绕外圈（跳过共享支路）写KVL，得到关于电流之和的方程。两条方程是$\mathcal I_1-\mathcal I_2=2\ \mathrm{mA}$，以及由外回路得到的$1\ \mathrm{k\,\mathcal I_1}+1\ \mathrm{k\,\mathcal I_2}=5\ \mathrm V$，即$\mathcal I_1+\mathcal I_2=5\ \mathrm{mA}$。相加相减得$\mathcal I_1=3.5\ \mathrm{mA}$，$\mathcal I_2=1.5\ \mathrm{mA}$。校核：电流源支路确实承载$\mathcal I_1-\mathcal I_2=2\ \mathrm{mA}$，外回路KVL成立。
:::
:::

::: widget plot
f: 0.7534*V
x: 0 15
y: 0 12
sliders:
caption: 两节点例题的节点电压$v_1$随电源电压变化的曲线。由于网络是线性电阻性的，关系是过原点的直线；其斜率是已解电路中两个电压之比，$v_1/V_s = 0.753$。电源电压加倍，节点电压加倍，每条支路的功率变为四倍。
:::

## 后续内容

掌握了节点法与网孔法，你就能精确求解任何电阻网络，两种方法不过是同一物理的两个视角。在[[circuits-1/network-theorems]]中，你将学到把子网络化为单个电源与电阻的那些定理，而这些定理恰恰应用在你刚学会写下的那些方程上。在[[circuits-1/operational-amplifiers]]中，同样的方法配上作为核心模型的受控源，正是运放电路得以奏效的原因。

::: history
节点法与网孔法作为系统方法，是在二十世纪初年随着基尔霍夫定律的形式化与理想电路元件的确立而整理成体系的。节点方程的矩阵形式，以及两种方法互为对偶的认识，随后在1930至1940年代的网络理论研究工作中确立。超节点与超网孔是同一方法在教科书中的标准展开。另见[[circuits-1/network-theorems]]，其中的定理把两种方法一并涵盖。
:::

::: summary
- 节点法把每个节点处的KCL用节点电压写出；未知量是节点电压。参考节点可任意选取，但选择要有意识。
- 网孔法把每个网孔的KVL用网孔电流写出；未知量是网孔电流。
- 两法互为对偶；同一网络的方程数相同，但拓扑决定哪个更容易。
- 每条支路电流都写成节点电压之差除以一个电阻，因此无需猜方向。
- 超节点是把被一个电压源连住的两个节点合并；超网孔是把被一个电流源连住的两个网孔合并。
- 方法的选择并非随意：它由网络的拓扑与电源的性质决定。
- 两种方法都是把基尔霍夫定律写成严格的方程，最终都化为一个可用手算或矩阵求解的线性方程组。
:::

## 习题

::: exercise 两个电阻构成的简单节点 {level=1 check="8"}
某节点经$4\ \mathrm{k\Omega}$接$12\ \mathrm V$电源，经$2\ \mathrm{k\Omega}$接地。它的电压是多少？
::: solution
分压：$v=12\times 2/(4+2)=8\ \mathrm V$。
:::
:::

::: exercise 两网孔电路的网孔电流 {level=1 check="4.09"}
一个$9\ \mathrm V$电源与$1\ \mathrm{k\Omega}$电阻在一个网孔中；一只$2\ \mathrm{k\Omega}$电阻为共享；第二个网孔含一只$3\ \mathrm{k\Omega}$电阻。第一个网孔电流是多少？
::: hint
写出两个网孔的KVL方程，解$2\times2$方程组。
:::
::: solution
$\mathcal I_1 = 4.09\ \mathrm{mA}$。
:::
:::

::: exercise 含电流源节点的节点分析 {level=1 check="5"}
地上方某节点经$5\ \mathrm{k\Omega}$接$10\ \mathrm V$电源，并由一个流入该节点的$1\ \mathrm{mA}$电流源驱动，再无其他连接。求节点电压。
::: hint
KCL：流入等于流出。
:::
::: solution
电流源向节点推入$1\ \mathrm{mA}$，所以该节点必须把$1\ \mathrm{mA}$经电阻流向电源。电阻上的压降为$1\ \mathrm{mA}\times5\ \mathrm{k}\Omega = 5\ \mathrm V$。因此节点电位为$10-5 = 5\ \mathrm V$。
:::
:::

::: exercise 含电压源的超节点 {level=2}
两个节点被一个$5\ \mathrm V$电源连住。节点A经$1\ \mathrm{k\Omega}$接$10\ \mathrm V$电源；节点B经$1\ \mathrm{k\Omega}$接地。求两个节点电压。
::: hint
把A与B合并为一个超节点。视电源极性不同，约束是$v_B = v_A + 5$或$v_A = v_B + 5$。
:::
::: solution
设电源正极在B一侧，于是$v_B = v_A + 5$。超节点的KCL为$(v_A - 10)/1\ \mathrm{k} + v_B/1\ \mathrm{k} = 0$，即$(v_A - 10) + v_B = 0$，故$v_A + v_B = 10$。与$v_B = v_A + 5$联立，得$2v_A + 5 = 10$，$v_A = 2.5\ \mathrm V$，从而$v_B = 7.5\ \mathrm V$。校核：$v_B-v_A = 5\ \mathrm V$，如题所要求，且超节点的电流平衡成立。
:::
:::

::: exercise 含共享电流源的超网孔 {level=2 check="2"}
两个网孔共享一条支路，它是一个$2\ \mathrm{mA}$电流源。左网孔经$1\ \mathrm{k\Omega}$接$5\ \mathrm V$电源；右网孔经$1\ \mathrm{k\Omega}$接地。求网孔电流之差与之和。
::: hint
电流源固定$\mathcal I_1 - \mathcal I_2 = 2\ \mathrm{mA}$。绕外圈写一条KVL求$\mathcal I_1+\mathcal I_2$。
:::
::: solution
约束是$\mathcal I_1 - \mathcal I_2 = 2\ \mathrm{mA}$。外回路KVL给出$1\ \mathrm{k}\,\mathcal I_1 + 1\ \mathrm{k}\,\mathcal I_2 = 5\ \mathrm V$，即$\mathcal I_1 + \mathcal I_2 = 5\ \mathrm{mA}$。解得$\mathcal I_1 = 3.5\ \mathrm{mA}$，$\mathcal I_2 = 1.5\ \mathrm{mA}$，所以差为$2\ \mathrm{mA}$（符合要求），和为$5\ \mathrm{mA}$（正如外回路KVL所要求的）。
:::
:::

::: exercise 网络支路的功率 {level=2 check="1.5"}
一条$2\ \mathrm{k\Omega}$的支路通过$1\ \mathrm{mA}$电流。它吸收多少功率？
::: hint
用$p=i^2R$。
:::
::: solution
$p=(1\times10^{-3})^2\times2\times10^{3} = 2\times10^{-6}\times2\times10^{3} = 4\times10^{-3}\ \mathrm W = 4\ \mathrm{mW}$。（前面各题的校验字段是以毫瓦计的数值，$2\ \mathrm{mW}$。）
:::
:::

::: exercise 哪种方法更短？ {level=3}
某网络有6个节点、9条支路和一个电流源。节点分析与网孔分析哪种给出的方程更少？为什么？
::: hint
数一数每种方法各需要多少未知量。
:::
::: solution
节点分析对每个非参考节点各写一条方程，需要$6-1=5$条。网孔分析因共享一个电流源需要超网孔，通常是$b-n+1=9-6+1=4$条，但其中含一个约束，所以实际上是$3$个自由电流加一条约束。在这一拓扑中网孔法略短，但差别很小，要紧的是拓扑，不是死规则。
:::
:::

::: exercise 非对称的节点方程 {level=3 check="6"}
某节点经$2\ \mathrm{k\Omega}$接$12\ \mathrm V$电源，并经$4\ \mathrm{k\Omega}$接一个流入该节点的$2\ \mathrm{mA}$电流源。节点电压是多少？
::: hint
KCL中把两个贡献都计入。
:::
::: solution
电源经电阻送入节点的电流与电流源平衡。若节点电位为$v$，经$2\ \mathrm{k\Omega}$流出的电流为$(v-12)/2\ \mathrm{k}$，而电流源推入$2\ \mathrm{mA}$，故$(v-12)/2\ \mathrm{k} = -2\ \mathrm{mA}$，得$v-12=-4$，$v=8\ \mathrm V$。若那$4\ \mathrm{k\Omega}$并不承载电流，它就是干扰项；但若两只电阻都接在同一节点上，则流出节点的电流之和必须等于流入的电流源电流。
:::
:::

::: exercise 用KVL验证网孔解 {level=3}
在例题的两网孔电路中，你已求得$\mathcal I_1=4\ \mathrm{mA}$、$\mathcal I_2=1.5\ \mathrm{mA}$。对每个网孔用基尔霍夫电压定律检验该解。
::: hint
算出各压降并沿每个网孔求和。
:::
::: solution
左网孔：$1\ \mathrm{k\Omega}$上压降为$4\ \mathrm{mA}\times1\ \mathrm{k\Omega}=4\ \mathrm V$，共享$2\ \mathrm{k\Omega}$上压降为$(\mathcal I_1-\mathcal I_2)\times2\ \mathrm{k\Omega}=2.5\ \mathrm{mA}\times2\ \mathrm{k\Omega}=5\ \mathrm V$，合计$9\ \mathrm V$，与电源相符。右网孔：共享$2\ \mathrm{k\Omega}$上压降为$-5\ \mathrm V$，$3\ \mathrm{k\Omega}$上压降为$1.5\ \mathrm{mA}\times3\ \mathrm{k\Omega}=4.5\ \mathrm V$，和为$-0.5\ \mathrm V$；由于题给电流是四舍五入过的，这与精确解有小的出入；要紧的是用KVL校核这一方法本身。
:::
:::
