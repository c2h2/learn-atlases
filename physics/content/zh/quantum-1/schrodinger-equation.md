在经典力学中，沿直线运动的粒子的状态是一对数：它的位置 $x(t)$ 与动量 $p(t)$，而牛顿第二定律告诉你它们如何变化。[[quantum-1/origins]] 的证据表明，这幅图像对电子失效：一个穿过晶体的电子会像波一样衍射，而每个电子到达探测器时又是一个单独的点。量子力学同时保留了这一观察的两半。粒子的状态是一个复值的**波函数** $\Psi(x,t)$，它会像波一样展开、干涉与衍射；而波函数告诉你的是在各处找到粒子的*概率*，不是它在哪里。

本章在一维范围内建立这套理论。我们陈述薛定谔方程——它扮演牛顿第二定律的角色——以及说明如何读取 $\Psi$ 的玻恩规则。随后我们证明概率守恒并以确定的电流流动，引入算符与期望值，并证明埃伦费斯特定理：牛顿定律如何在平均意义上重新出现。本章最有用的单一概念是定态：分离变量把含时方程变成一个本征值问题，即不含时薛定谔方程，接下来三章将对一个又一个势求解它。我们以自由粒子和波包扩散收尾。

需要的数学是偏导数、复数与分离变量法，都在 [[math-methods/odes]]。[[oscillations/travelling-waves]] 的波动方程是一个有用的对照：它对时间是二阶的，薛定谔方程则不是。

## 波函数与玻恩规则 {#born}

::: definition 波函数与玻恩规则 {#def-wavefunction}
时刻 $t$ 沿 $x$ 轴运动的粒子的状态由一个复函数 $\Psi(x,t)$ 描述，称为**波函数**。**玻恩规则**说

$$
\Prob\bigl(a \le x \le b \text{ 于时刻 } t\bigr) = \int_a^b \abs{\Psi(x,t)}^2\,\dd x,
$$ {#eq-born}

因此 $\rho(x,t) = \abs{\Psi(x,t)}^2 = \Psi^*\Psi$ 是一个**概率密度**。要使这有意义，$\Psi$ 必须是**归一化的**：

$$
\int_{-\infty}^{\infty} \abs{\Psi(x,t)}^2\,\dd x = 1.
$$ {#eq-norm}
:::

在一维中 $\Psi$ 的单位是 $\mathrm{m^{-1/2}}$，从而 $\abs{\Psi}^2\,\dd x$ 无量纲。一个波函数与同一个波函数乘以常量相位 $e^{i\alpha}$ 给出相同的密度，而且我们将看到，对每个测量给出相同的预言。整体相位不是物理的。波函数两个部分之间的*相对*相位是物理的，因为它改变各部分在何处相长干涉。

若交给你函数 $\psi$，其积分 $\int\abs{\psi}^2\,\dd x$ 有限且非零，你总能把它除以该积分的平方根来归一化。积分有限的函数称为**平方可积**函数。像 $e^{ikx}$ 这样模处处为 $1$ 的函数不是平方可积的，单凭它自己不能代表一个物理状态。我们在 [[#free]] 中回到这一点。

概率指的是什么？设想大量以相同方式制备、波函数都是 $\Psi$ 的粒子，逐个测量位置。在 $a$ 与 $b$ 之间找到的比例趋于 [[#eq-born]]。一次测量给出一个确定的位置。紧接着第二次位置测量会给出同样的答案，所以测量必定已把波函数变成为一个在测量结果处尖锐峰起的波函数。这一**坍缩**是测量公设的一部分，其一般形式在 [[quantum-1/formalism]] 中陈述。两次测量之间，波函数按薛定谔方程光滑演化。

::: example 归一化一个试探波函数 {#ex-normalise}
$t = 0$ 时，一个束缚在 $0 \le x \le a$ 内的粒子的波函数在该区间内为 $\psi(x) = A\,x(a - x)$，区间外 $\psi = 0$。求正实常量 $A$，以及粒子出现在 $0 \le x \le a/4$ 中的概率。
::: solution
归一化积分为

$$
\int_0^a A^2 x^2(a-x)^2\,\dd x = A^2\int_0^a\bigl(a^2x^2 - 2ax^3 + x^4\bigr)\,\dd x = A^2\left(\frac{a^5}{3} - \frac{a^5}{2} + \frac{a^5}{5}\right) = \frac{A^2a^5}{30}.
$$

令其等于 $1$ 得 $A = \sqrt{30/a^5}$。左端四分之一区间中的概率为

$$
\frac{30}{a^5}\int_0^{a/4} \bigl(a^2x^2 - 2ax^3 + x^4\bigr)\,\dd x = 30\left(\frac{1}{3\cdot 64} - \frac{2}{4\cdot256} + \frac{1}{5\cdot1024}\right) = 30\cdot\frac{80 - 30 + 3}{15360} = \frac{53}{512}.
$$

于是 $P = 53/512 = 0.104$。由对称性，右半四分之一区间有相同的概率，中间一半为 $1 - 2(53/512) = 0.793$。若是均匀密度，每个四分之一区间会给 $0.25$；这个波函数集中在中心附近，那里 $\abs{\psi}^2$ 最大。
:::
:::

## 薛定谔方程 {#tdse}

我们无法从经典物理导出薛定谔方程，正如牛顿第二定律无法从更早的东西导出一样。我们能让它显得合理。按德布罗意的说法，一个动量为 $p$、能量为 $E$ 的自由粒子应当是一个波，$k = p/\hbar$，$\omega = E/\hbar$。取复平面波

$$
\Psi(x,t) = A\,e^{i(kx - \omega t)}.
$$

求导得 $-i\hbar\,\partial\Psi/\partial x = \hbar k\Psi = p\Psi$，$i\hbar\,\partial\Psi/\partial t = \hbar\omega\Psi = E\Psi$。自由粒子的非相对论性能量是 $E = p^2/2m$，所以这个波应当满足

$$
i\hbar\pdv{\Psi}{t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2}.
$$

这里 $\partial/\partial t$ 扮演能量的角色，$-i\hbar\,\partial/\partial x$ 扮演动量的角色。在势中能量是 $p^2/2m + V(x)$，于是自然的推广在右边加上 $V\Psi$。

::: definition 薛定谔方程 {#def-tdse}
质量为 $m$、处于势 $V(x,t)$ 中的粒子，其波函数服从**含时薛定谔方程**

$$
i\hbar\pdv{\Psi}{t} = -\frac{\hbar^2}{2m}\frac{\partial^2\Psi}{\partial x^2} + V(x,t)\,\Psi.
$$ {#eq-tdse}

右端的算符 $\hat H = -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} + V$ 是**哈密顿量**，方程常写成 $i\hbar\,\partial_t\Psi = \hat H\Psi$。
:::

三个特征使它区别于经典波动方程。它对时间**是一阶的**，所以一个时刻的波函数决定了它其后的所有时刻；你不需要再给 $\partial_t\Psi$。它显含 $i$，所以它的解必然是复的：$t = 0$ 时为实的 $\Psi$ 立即变复。它是**线性的**：若 $\Psi_1$ 与 $\Psi_2$ 是解，则对任意复常量 $c_1\Psi_1 + c_2\Psi_2$ 也是解。线性是叠加原理的数学形式，干涉正由它而来。

### 概率守恒

玻恩规则要求 $\int\abs{\Psi}^2\,\dd x = 1$ 在每一时刻成立，而薛定谔方程自行决定 $\Psi$ 在之后时刻的取值。若归一化会发生漂移，理论就自相矛盾。它不会漂移，原因是定域的。

::: theorem 连续性方程 {#thm-continuity}
设 $V$ 为实。若 $\Psi$ 满足 [[#eq-tdse]]，则 $\rho = \abs{\Psi}^2$ 与**概率流**

$$
j(x,t) = \frac{\hbar}{2mi}\left(\Psi^*\pdv{\Psi}{x} - \Psi\pdv{\Psi^*}{x}\right) = \frac{\hbar}{m}\operatorname{Im}\left(\Psi^*\pdv{\Psi}{x}\right)
$$ {#eq-current}

满足

$$
\pdv{\rho}{t} + \pdv{j}{x} = 0.
$$ {#eq-continuity}

于是，若 $\Psi$ 与 $\partial\Psi/\partial x$ 在 $\abs{x}\to\infty$ 时趋于零，则 $\int_{-\infty}^\infty\abs{\Psi}^2\,\dd x$ 与时间无关。
:::

::: proof
由乘积法则，$\partial_t\rho = \Psi^*\,\partial_t\Psi + \Psi\,\partial_t\Psi^*$。由 [[#eq-tdse]] 及其复共轭（用到 $V^* = V$），

$$
\pdv{\Psi}{t} = \frac{i\hbar}{2m}\frac{\partial^2\Psi}{\partial x^2} - \frac{i}{\hbar}V\Psi, \qquad \pdv{\Psi^*}{t} = -\frac{i\hbar}{2m}\frac{\partial^2\Psi^*}{\partial x^2} + \frac{i}{\hbar}V\Psi^*.
$$

代入后，势的项相消：

$$
\pdv{\rho}{t} = \frac{i\hbar}{2m}\left(\Psi^*\frac{\partial^2\Psi}{\partial x^2} - \Psi\frac{\partial^2\Psi^*}{\partial x^2}\right) = \frac{i\hbar}{2m}\pdv{}{x}\left(\Psi^*\pdv{\Psi}{x} - \Psi\pdv{\Psi^*}{x}\right),
$$

最后一步成立，是因为对括号求导产生的两个交叉项 $\partial_x\Psi^*\,\partial_x\Psi$ 相消。由于 $i\hbar/2m = -\hbar/2mi$，右端就是 $-\partial_x j$，即 [[#eq-continuity]]。对一切 $x$ 积分，

$$
\deriv{}{t}\int_{-\infty}^\infty\rho\,\dd x = -\bigl[j\bigr]_{-\infty}^{\infty} = 0,
$$

因为在所述的衰减条件下 $j$ 在两端都消失。[[#eq-current]] 的第二个形式成立，是因为 $\Psi\,\partial_x\Psi^*$ 是 $\Psi^*\partial_x\Psi$ 的复共轭，而 $z - z^* = 2i\operatorname{Im}z$。
:::

这个方程与电磁学中的电荷守恒形式相同（[[electrostatics/current]]）：区间 $[a,b]$ 中的概率只随流经其端点的电流改变，$\dd P_{ab}/\dd t = j(a,t) - j(b,t)$。概率不可能在一处消失、又在别处重新出现而不先流过去。复势会破坏这一点；核物理中正是有意识地用它来模拟吸收，但本课程中 $V$ 是实的。

::: example 平面波的概率流 {#ex-current}
求 $\Psi = A e^{i(kx - \omega t)}$ 的概率流，以及驻波 $\Psi = A\sin(kx)\,e^{-i\omega t}$ 的概率流。
::: solution
对平面波，$\partial_x\Psi = ik\Psi$，故 $\Psi^*\partial_x\Psi = ik\abs{A}^2$，

$$
j = \frac{\hbar}{m}\operatorname{Im}\bigl(ik\abs{A}^2\bigr) = \frac{\hbar k}{m}\abs{A}^2 = \frac{p}{m}\,\rho.
$$

这是密度乘以经典速度 $p/m$，与密度 $\rho$、速度 $v$ 的流体完全一样。在散射问题中，我们将把 $\abs{A}^2\hbar k/m$ 用作束流中"每秒的粒子数"。

对驻波，$\Psi^*\partial_x\Psi = \abs{A}^2 k\sin(kx)\cos(kx)$ 是实的，故 $j = 0$。更一般地，只要 $\Psi$ 的空间部分除整体相位外是实的，概率流就为零：驻波是等量的右行波与左行波的叠加，$\sin kx = (e^{ikx} - e^{-ikx})/2i$，二者的概率流相互抵消。
:::
:::

## 算符与期望值 {#operators}

对大量以相同方式制备的粒子进行位置测量会得到一个平均值。这个平均值就是**期望值** $\langle x\rangle = \int x\abs{\Psi}^2\,\dd x$。它不是最可能的值，甚至未必是一个可能取到的值：对一个有两个分离隆起的密度，它可能落在两者之间密度为零的地方。

动量的平均值是什么？密度 $\abs{\Psi}^2$ 只涉及位置。找到一个干净答案的办法，是问 $\langle x\rangle$ 如何随时间变化。在积分号下求导并使用连续性方程，

$$
\deriv{\langle x\rangle}{t} = \int x\,\pdv{\rho}{t}\,\dd x = -\int x\,\pdv{j}{x}\,\dd x = \int j\,\dd x,
$$

其中分部积分，边界项消失。代入 [[#eq-current]]，再把含 $\Psi\,\partial_x\Psi^*$ 的项分部积分一次，合并整理，

$$
m\deriv{\langle x\rangle}{t} = \int \Psi^*\left(-i\hbar\pdv{}{x}\right)\Psi\,\dd x.
$$

按经典说法，$m\,\dd x/\dd t$ 就是动量。这就认出了动量的期望值，并提示动量由夹在 $\Psi^*$ 与 $\Psi$ 之间的算符 $-i\hbar\,\partial/\partial x$ 表示——正是平面波论证得出的同一个算符。

::: definition 算符与期望值 {#def-expectation}
位置与动量由算符表示

$$
\hat x = x, \qquad \hat p = -i\hbar\pdv{}{x}.
$$ {#eq-p-op}

经典量 $Q(x,p)$ 由 $\hat Q = Q(\hat x, \hat p)$ 表示（出现 $x$ 与 $p$ 的乘积时，次序要多加小心）。它在归一化态 $\Psi$ 中的**期望值**是

$$
\langle Q\rangle = \int_{-\infty}^\infty \Psi^*\,\hat Q\,\Psi\,\dd x,
$$ {#eq-expectation}

其**不确定度**是标准差 $\Delta Q = \sqrt{\langle Q^2\rangle - \langle Q\rangle^2}$。特别地，动能是 $\hat T = \hat p^2/2m = -(\hbar^2/2m)\,\partial^2/\partial x^2$，哈密顿量是 $\hat H = \hat T + V$。
:::

积分内的次序很重要：算符先作用在 $\Psi$ 上，结果再乘以 $\Psi^*$ 然后积分。对 $\hat x$，这就是 $\int x\abs{\Psi}^2\,\dd x$，本该如此。

::: theorem 埃伦费斯特定理 {#thm-ehrenfest}
对处于实势 $V(x)$ 中、$\Psi$ 及其各阶导数在无穷远处衰减的粒子，

$$
\deriv{\langle x\rangle}{t} = \frac{\langle p\rangle}{m}, \qquad \deriv{\langle p\rangle}{t} = -\left\langle\deriv{V}{x}\right\rangle.
$$ {#eq-ehrenfest}
:::

::: proof
第一个方程上面已经导出。对第二个，把 $\langle p\rangle = -i\hbar\int\Psi^*\partial_x\Psi\,\dd x$ 在积分号下求导：

$$
\deriv{\langle p\rangle}{t} = -i\hbar\int\left(\pdv{\Psi^*}{t}\pdv{\Psi}{x} + \Psi^*\pdv{}{x}\pdv{\Psi}{t}\right)\dd x.
$$

对第二项分部积分（边界项消失），得到 $-\int \partial_x\Psi^*\,\partial_t\Psi\,\dd x$。再从 [[#thm-continuity]] 的证明代入 $\partial_t\Psi$ 与 $\partial_t\Psi^*$。动能部分给出

$$
-i\hbar\cdot\frac{i\hbar}{2m}\int\left(-\Psi^*_{xx}\Psi_x - \Psi^*_x\Psi_{xx}\right)\dd x = -\frac{\hbar^2}{2m}\int\pdv{}{x}\bigl(\Psi^*_x\Psi_x\bigr)\,\dd x = 0,
$$

其中下标表示导数。势的部分给出

$$
-i\hbar\cdot\frac{i}{\hbar}\int\Bigl(V\Psi^*\Psi_x + \Psi^*_x V\Psi\Bigr)\dd x = \int V\pdv{}{x}\bigl(\Psi^*\Psi\bigr)\,\dd x = -\int \deriv{V}{x}\abs{\Psi}^2\,\dd x,
$$

其中又分部积分了一次。这就是 $-\langle \dd V/\dd x\rangle$。
:::

埃伦费斯特定理看起来像牛顿第二定律 $\dd p/\dd t = -V'(x)$，但右边站着的是力的平均，不是平均位置处的力。当 $\abs{\Psi}^2$ 显著的区域上 $V'$ 对 $x$ 近似线性时，二者一致：所以对自由粒子、均匀场与谐振子，波包的中心严格沿经典轨迹运动。对任何势，一个比力变化的尺度窄得多的波包近似按经典方式运动。这就是对应原理的定量内容。

::: example 期望值与不确定度 {#ex-uncertainty}
对 [[#ex-normalise]] 中 $0 \le x \le a$ 上的归一化态 $\psi(x) = \sqrt{30/a^5}\,x(a-x)$，求 $\langle x\rangle$、$\Delta x$、$\langle p\rangle$、$\Delta p$ 以及乘积 $\Delta x\,\Delta p$。
::: solution
密度关于 $a/2$ 对称，故 $\langle x\rangle = a/2$。对于 $\langle x^2\rangle$，

$$
\langle x^2\rangle = \frac{30}{a^5}\int_0^a x^2\cdot x^2(a-x)^2\,\dd x = \frac{30}{a^5}\left(\frac{a^7}{5} - \frac{2a^7}{6} + \frac{a^7}{7}\right) = 30a^2\cdot\frac{1}{105} = \frac{2a^2}{7}.
$$

于是 $(\Delta x)^2 = \frac{2a^2}{7} - \frac{a^2}{4} = \frac{a^2}{28}$，$\Delta x = a/\sqrt{28} = 0.189a$。

动量方面，$\psi$ 是实的，故 $\langle p\rangle = -i\hbar\int\psi\psi'\,\dd x = -\frac{i\hbar}{2}\bigl[\psi^2\bigr]_0^a = 0$。实的波函数（边界值为零）总有 $\langle p\rangle = 0$；否则 $\langle p\rangle$ 将是虚的。下一步，$\psi'' = -2\sqrt{30/a^5}$，故

$$
\langle p^2\rangle = -\hbar^2\int_0^a\psi\psi''\,\dd x = 2\hbar^2\frac{30}{a^5}\int_0^a x(a-x)\,\dd x = \frac{60\hbar^2}{a^5}\cdot\frac{a^3}{6} = \frac{10\hbar^2}{a^2}.
$$

因此 $\Delta p = \sqrt{10}\,\hbar/a$，且

$$
\Delta x\,\Delta p = \sqrt{\frac{10}{28}}\,\hbar = 0.598\,\hbar.
$$

这超过 $\hbar/2$，正如 [[quantum-1/formalism]] 中将证明的不确定性原理所要求的。附带地，对宽度 $a$ 的无限深势阱中的粒子，$\langle H\rangle = \langle p^2\rangle/2m = 5\hbar^2/ma^2$。该势阱真正的基态能量为 $\pi^2\hbar^2/2ma^2 = 4.935\,\hbar^2/ma^2$，恰在其下；任何试探态都不可能低于基态，这就是变分原理。
:::
:::

::: quiz
一个粒子在 $t = 0$ 有实的波函数 $\psi(x)$，在 $\pm\infty$ 处为零。在 $t = 0$，哪些说法是对的？
- [x] $\langle p\rangle = 0$。
- [x] 概率流 $j$ 处处为零。
- [ ] 粒子静止，故 $\langle p^2\rangle = 0$。
- [ ] $\psi$ 在之后的所有时刻保持为实。
::: solution
对实的 $\psi$，$\psi^*\psi' = \psi\psi'$ 是实的，故 $j = (\hbar/m)\operatorname{Im}(\psi\psi') = 0$，且 $\langle p\rangle = -i\hbar\int\psi\psi'\,\dd x = -\frac{i\hbar}{2}[\psi^2] = 0$。但对任何非常数的 $\psi$，$\langle p^2\rangle = \hbar^2\int(\psi')^2\,\dd x > 0$：一个定域化的粒子总有动量展宽。而薛定谔方程含有 $i$，所以 $\Psi$ 立刻变复；初始态为实只意味着运动以对称的方式开始，一半"向左"，一半"向右"。
:::
:::

## 定态 {#stationary}

设势不依赖时间。寻找 [[#eq-tdse]] 的乘积形式解 $\Psi(x,t) = \psi(x)\,\varphi(t)$。代入并除以 $\psi\varphi$，

$$
i\hbar\,\frac{1}{\varphi}\deriv{\varphi}{t} = \frac{1}{\psi}\left(-\frac{\hbar^2}{2m}\deriv{^2\psi}{x^2} + V\psi\right).
$$

左端只依赖 $t$，右端只依赖 $x$，所以二者等于同一个常量，记作 $E$。时间方程立即积分为 $\varphi(t) = e^{-iEt/\hbar}$，而空间方程就是下面这个本征值问题。

::: definition 不含时薛定谔方程 {#def-tise}
势 $V(x)$ 的**不含时薛定谔方程**是

$$
-\frac{\hbar^2}{2m}\deriv{^2\psi}{x^2} + V(x)\,\psi = E\,\psi, \qquad\text{即}\qquad \hat H\psi = E\psi.
$$ {#eq-tise}

可归一化的解 $\psi$ 是一个**能量本征函数**，$E$ 是**能量本征值**，而 $\Psi(x,t) = \psi(x)\,e^{-iEt/\hbar}$ 是一个**定态**。
:::

对可归一化的解，常量 $E$ 必须是实的：若 $E = E_0 - i\Gamma/2$，则 $\abs{\Psi}^2 = \abs{\psi}^2e^{-\Gamma t/\hbar}$ 将衰减，与 [[#thm-continuity]] 矛盾。而且，由于 [[#eq-tise]] 的系数是实的，任何解的实部与虚部自身都是解，所以能量本征函数总可以取为实的。

::: theorem 定态的性质 {#thm-stationary}
设 $V$ 不依赖时间。
1. 在定态 $\Psi = \psi e^{-iEt/\hbar}$ 中，概率密度以及任何不含 $t$ 的算符的期望值都与时间无关。
2. 定态具有确定的能量：$\langle H\rangle = E$ 且 $\Delta H = 0$。
3. 若 $\psi_1, \psi_2, \ldots$ 是能量分别为 $E_1, E_2, \ldots$ 的能量本征函数，则

$$
\Psi(x,t) = \sum_n c_n\,\psi_n(x)\,e^{-iE_nt/\hbar}
$$ {#eq-general}

对任意常量 $c_n$（级数收敛）都是 [[#eq-tdse]] 的解。
:::

::: proof
(1) $\abs{\Psi}^2 = \abs{\psi}^2\abs{e^{-iEt/\hbar}}^2 = \abs{\psi}^2$，因为 $E$ 是实的。在 $\langle Q\rangle = \int\Psi^*\hat Q\Psi\,\dd x$ 中算符只对 $x$ 作用，所以来自 $\Psi^*$ 的相位因子 $e^{+iEt/\hbar}$ 与来自 $\Psi$ 的 $e^{-iEt/\hbar}$ 相乘为 $1$。

(2) $\hat H\Psi = E\Psi$，故 $\langle H\rangle = E\int\abs{\Psi}^2\,\dd x = E$；又 $\hat H^2\Psi = \hat H(E\Psi) = E^2\Psi$，故 $\langle H^2\rangle = E^2$，$(\Delta H)^2 = E^2 - E^2 = 0$。

(3) 每一项都是解：$i\hbar\,\partial_t\bigl(\psi_ne^{-iE_nt/\hbar}\bigr) = E_n\psi_ne^{-iE_nt/\hbar} = \hat H\bigl(\psi_ne^{-iE_nt/\hbar}\bigr)$。方程是线性的，所以解的和仍是解。
:::

第 3 条正是含时问题实际的求解方式。我们将遇到的每个情形中，能量本征函数都构成完备集，所以任何初始态都可展开为 $\Psi(x,0) = \sum_n c_n\psi_n(x)$。于是 [[#eq-general]] 就是其后每一时刻的状态：每个分量只是按各自的角频率 $E_n/\hbar$ 在复平面上旋转。在 [[quantum-1/formalism]] 中我们将看到，$\abs{c_n}^2$ 是能量测量给出 $E_n$ 的概率。

### 波函数必须满足什么条件

不含时方程是一个二阶常微分方程，单凭它对每个 $E$ 值都有解。量子化来自物理上可接受的 $\psi$ 必须满足的附加条件：

- $\psi$ 必须可归一化（对束缚态），所以必须在 $\pm\infty$ 处衰减；
- $\psi$ 必须处处连续，因为一个跳跃会使 $\psi'$ 含有 δ 函数、$\hat p^2\psi$ 含有其导数，动能为无穷大；
- 在 $V$ 有限处 $\psi'$ 必须连续。把 [[#eq-tise]] 从 $x_0 - \eps$ 积到 $x_0 + \eps$：$\psi'(x_0+\eps) - \psi'(x_0-\eps) = (2m/\hbar^2)\int(V - E)\psi\,\dd x$，当 $V$ 在 $x_0$ 附近有界时它趋于零，即使 $V$ 在那里跳跃。

在 $V$ 无穷大的点，如无限深势阱的阱壁处，只有前两条仍然成立，且 $\psi$ 必须为零。这些**匹配条件**就是下一章在分段势的每个拐角处要用的东西。对大多数 $E$ 值，左侧衰减的解在右侧发散；只有在特殊的能量处，才有一个解在两端都衰减，那些就是本征值。

::: example 试探态的能量概率 {#ex-expand}
把 [[#ex-normalise]] 的态 $\psi(x) = \sqrt{30/a^5}\,x(a-x)$ 放入宽度 $a$ 的无限深势阱，其本征函数为 $\psi_n = \sqrt{2/a}\sin(n\pi x/a)$。求展开系数 $c_n = \int_0^a\psi_n\psi\,\dd x$、能量测量给出基态能量的概率，并验证 $\sum\abs{c_n}^2E_n$ 等于 [[#ex-uncertainty]] 中的 $\langle H\rangle = 5\hbar^2/ma^2$。
::: solution
令 $u = \pi x/a$，

$$
c_n = \sqrt{\frac{60}{a^6}}\int_0^a x(a-x)\sin\frac{n\pi x}{a}\,\dd x = \sqrt{60}\,\frac{1}{\pi^3}\int_0^\pi u(\pi - u)\sin(nu)\,\dd u.
$$

两次分部积分给出 $\int_0^\pi u(\pi-u)\sin(nu)\,\dd u = 2\bigl(1 - (-1)^n\bigr)/n^3$：$n$ 为奇数时是 $4/n^3$，偶数 $n$ 时为 $0$。偶数的系数为零，因为 $\psi$ 关于中心对称，而偶数 $n$ 的正弦是反对称的。于是

$$
c_n = \frac{8\sqrt{15}}{n^3\pi^3}\ (n \text{ 奇}), \qquad c_n = 0\ (n \text{ 偶}).
$$

测得基态能量的概率是 $\abs{c_1}^2 = 960/\pi^6 = 0.99856$。这条试探抛物线有 $99.86\%$ 是基态，这就是它的能量如此接近 $E_1$ 的原因。下一项是 $\abs{c_3}^2 = 960/(729\pi^6) = 0.00137$。概率之和为 $1$，因为 $\sum_{n\ \mathrm{odd}}1/n^6 = \pi^6/960$。最后，由 $E_n = n^2\pi^2\hbar^2/2ma^2$，

$$
\sum_n\abs{c_n}^2E_n = \frac{960}{\pi^6}\cdot\frac{\pi^2\hbar^2}{2ma^2}\sum_{n\ \mathrm{odd}}\frac{1}{n^4} = \frac{480\hbar^2}{\pi^4ma^2}\cdot\frac{\pi^4}{96} = \frac{5\hbar^2}{ma^2},
$$

其中用到 $\sum_{n\ \mathrm{odd}}1/n^4 = \pi^4/96$。两种计算平均能量的方法结果一致——若 $\abs{c_n}^2$ 确实是能量 $E_n$ 的概率，就必须如此。
:::
:::

::: warning 定态不等于"静止的粒子"
"定"指的是概率密度，不是粒子：定态可以有相当大的 $\langle p^2\rangle$。反过来，两个不同能量的叠加*不是*定态，即使每一部分各自是。其密度含有交叉项 $c_1^*c_2\psi_1\psi_2\,e^{-i(E_2-E_1)t/\hbar}$ 及其共轭，它们以**玻尔频率** $(E_2 - E_1)/h$ 振荡。量子力学中一切会运动的东西，都因为能量成分之间的这种干涉而运动。另请注意，定态的时间依赖 $e^{-iEt/\hbar}$ 本身是探测不到的；给 $V$ 加一个常量会给所有 $E_n$ 加上同样的量，而任何可测量的东西都不变。
:::

::: example 来回晃动的叠加态 {#ex-slosh}
在宽度 $a$ 的无限深势阱（[[quantum-1/piecewise-potentials]] 中详细求解）里，两个最低的能量本征函数是 $\psi_n = \sqrt{2/a}\,\sin(n\pi x/a)$，$E_n = n^2\pi^2\hbar^2/2ma^2$。$t = 0$ 时粒子处于态 $\Psi = (\psi_1 + \psi_2)/\sqrt2$。求 $\langle x\rangle(t)$，并求电子在宽度 $1.00\,\mathrm{nm}$ 的势阱中运动的周期。
::: solution
由 [[#eq-general]]，$\Psi(x,t) = \frac{1}{\sqrt2}\bigl(\psi_1e^{-iE_1t/\hbar} + \psi_2e^{-iE_2t/\hbar}\bigr)$。$\psi_n$ 为实，故

$$
\abs{\Psi}^2 = \frac12\left(\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2\cos\omega t\right), \qquad \omega = \frac{E_2 - E_1}{\hbar} = \frac{3\pi^2\hbar}{2ma^2}.
$$

该态已归一化，因为 $\int\psi_1^2 = \int\psi_2^2 = 1$ 且 $\int\psi_1\psi_2\,\dd x = 0$（正弦的正交性）。求 $\langle x\rangle$ 需要三个积分。由对称性，对每个 $n$ 有 $\int x\psi_n^2\,\dd x = a/2$。交叉项，令 $u = \pi x/a$，为

$$
\int_0^a x\psi_1\psi_2\,\dd x = \frac{2a}{\pi^2}\int_0^\pi u\sin u\sin 2u\,\dd u = \frac{2a}{\pi^2}\cdot\left(-\frac{8}{9}\right) = -\frac{16a}{9\pi^2},
$$

其中用到 $\sin u\sin2u = \frac12(\cos u - \cos3u)$、$\int_0^\pi u\cos u\,\dd u = -2$ 与 $\int_0^\pi u\cos 3u\,\dd u = -2/9$。于是

$$
\langle x\rangle(t) = \frac{a}{2} - \frac{16a}{9\pi^2}\cos\omega t = \frac a2\left(1 - \frac{32}{9\pi^2}\cos\omega t\right).
$$

粒子左右晃动，振幅为 $16a/9\pi^2 = 0.180\,a$。对 $a = 1.00\,\mathrm{nm}$ 的电子，$E_1 = \pi^2\hbar^2/2m_ea^2 = 0.376\,\mathrm{eV}$，故 $E_2 - E_1 = 3E_1 = 1.128\,\mathrm{eV}$，周期为

$$
T = \frac{h}{E_2 - E_1} = \frac{4.1357\times10^{-15}\,\mathrm{eV\,s}}{1.128\,\mathrm{eV}} = 3.67\times10^{-15}\,\mathrm{s}.
$$

一个 $\langle x\rangle$ 振荡的带电粒子以该频率辐射，这正是跃迁中发射的能量为 $E_2 - E_1$ 的光子。定态本身不辐射——这正是玻尔不得不假设的东西。
:::
:::

::: widget plot
f: sin(pi*x)^2 + sin(2*pi*x)^2 + 2*sin(pi*x)*sin(2*pi*x)*cos(1.5*pi^2*s)
x: 0, 1
y: 0, 4
sliders: s=0:0:0.43:0.005
caption: 无限深势阱中叠加态 $(\psi_1+\psi_2)/\sqrt2$ 在时刻 $s$ 的密度 $\abs{\Psi}^2$（单位 $\hbar = m = a = 1$）。把 $s$ 从 $0$ 拖到 $0.43$，即一个完整周期 $4/3\pi$。隆起从左半移到右半再移回，而每个定态成分单独看来密度都是冻结的。在 $s \approx 0.21$，交叉项变号，图像呈镜像。
:::

## 自由粒子与波包 {#free}

$V = 0$ 时不含时方程为 $\psi'' = -k^2\psi$，$k = \sqrt{2mE}/\hbar$，所以解是 $e^{\pm ikx}$，加上时间因子为

$$
\Psi_k(x,t) = e^{i(kx - \hbar k^2t/2m)}, \qquad k \in \R.
$$

这些就是我们开头用到的平面波，$k > 0$ 时向右传播，$k < 0$ 时向左传播。它们不可归一化，所以没有粒子会恰好处于某一个平面波中。物理态是 $k$ 的一个连续范围内的叠加，即 [[#eq-general]] 的连续类比：

$$
\Psi(x,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^\infty \phi(k)\,e^{i(kx - \hbar k^2t/2m)}\,\dd k, \qquad \phi(k) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^\infty\Psi(x,0)\,e^{-ikx}\,\dd x.
$$ {#eq-packet}

函数 $\phi(k)$ 是初始态的傅里叶变换（[数学图谱中的傅里叶变换](/learn/maths/lesson.php?c=pde&l=fourier-transform)），而普拉塞瓦尔（Plancherel）定理保证 $\int\abs{\phi}^2\,\dd k = \int\abs{\Psi}^2\,\dd x = 1$。这样的叠加称为**波包**。在 [[quantum-1/formalism]] 中我们将看到，$\abs{\phi(k)}^2\,\dd k$ 是动量落在 $\hbar k$ 与 $\hbar(k + \dd k)$ 之间的概率。

每个平面波以**相速度** $\omega/k = \hbar k/2m$ 传播，它是经典速度 $p/m$ 的一半。整个波包——峰在某个 $k_0$ 附近——以**群速度**

$$
v_g = \deriv{\omega}{k}\bigg|_{k_0} = \frac{\hbar k_0}{m} = \frac{p_0}{m}
$$

运动，即经典速度，正如埃伦费斯特定理所要求的。色散关系 $\omega = \hbar k^2/2m$ 不是线性的，所以不同的成分以不同速度传播，波包随之扩散。

对高斯初始波包，[[#eq-packet]] 中的积分可以配方精确算出（Griffiths 与 Schroeter，§2.4）。若 $t = 0$ 时的密度是标准差为 $\sigma_0$ 的高斯，则它保持高斯形，其中心以 $v_g$ 运动，标准差按

$$
\sigma(t) = \sigma_0\sqrt{1 + \left(\frac{t}{\tau}\right)^2}, \qquad \tau = \frac{2m\sigma_0^2}{\hbar}
$$ {#eq-spread}

增长。有一个简单的解读。初始动量展宽为 $\Delta p = \hbar/2\sigma_0$，是允许的最小值。当 $t \gg \tau$ 时宽度为 $\sigma \approx (\Delta p/m)\,t$：波包像一团速度相差 $\Delta p/m$ 的经典粒子云一样扩散。初始时把波包做窄一分，它就扩散得更快一分。

::: example 波包扩散有多快？{#ex-spread}
(a) 一个电子在 $t = 0$ 被定域在 $\sigma_0 = 0.100\,\mathrm{nm}$（约一个原子的大小）的高斯波包中。求 $\tau$ 以及 $1.00\,\mathrm{fs}$ 后与 $1.00\,\mathrm{ps}$ 后的宽度。(b) 对质量 $1.00\,\mu\mathrm{g}$、定域到 $\sigma_0 = 1.00\,\mu\mathrm{m}$ 的尘埃颗粒重复计算。
::: solution
(a) $\tau = 2m_e\sigma_0^2/\hbar = 2(9.109\times10^{-31})(1.00\times10^{-20})/(1.0546\times10^{-34}) = 1.73\times10^{-16}\,\mathrm{s}$。$1.00\,\mathrm{fs}$ 后 $t/\tau = 5.79$，故 $\sigma = 0.100\sqrt{1 + 5.79^2}\,\mathrm{nm} = 0.587\,\mathrm{nm}$。$1.00\,\mathrm{ps}$ 后 $t/\tau = 5.79\times10^3$，$\sigma = 579\,\mathrm{nm}$，超过半微米。自由电子连一飞秒都无法保持原子尺度的定域。

(b) $\tau = 2(1.00\times10^{-9})(1.00\times10^{-12})/(1.0546\times10^{-34}) = 1.90\times10^{13}\,\mathrm{s}$，约 $6\times10^5$ 年。质量以一次方、宽度平方进入公式，所以尘埃颗粒的波包实际上完全冻结，颗粒具有轨迹。
:::
:::

::: widget plot
f: exp(-x^2/(2*(1 + T^2)))/sqrt(2*pi*(1 + T^2))
x: -8, 8
y: 0, 0.45
sliders: T=0:0:4:0.05
caption: 静止的自由高斯波包的密度，$\sigma_0 = 1$，时间 $T = t/\tau$。$T = 0$ 时宽度为 $\sigma_0$。增大 $T$，看峰值下降而面积精确保持 $1$，正如概率守恒所要求的。$T \gg 1$ 时宽度随 $T$ 线性增长，正是速度展宽为 $\Delta p/m$ 的粒子云的经典扩散。
:::

::: history 薛定谔、玻恩与埃伦费斯特
薛定谔当时在苏黎世，1926 年在《物理学年鉴》（*Annalen der Physik*）上以四篇题为《量子化作为本征值问题》（"Quantisierung als Eigenwertproblem"）的论文发表了波动方程。第一篇用不含时方程得到氢光谱，含时方程出现在第四篇。同年稍后他证明自己的理论与海森堡（Heisenberg）、玻恩、约尔当（Jordan）的矩阵力学等价。薛定谔起初把 $\abs{\Psi}^2$ 读作电荷密度。玻恩在 1926 年 6 月分析碰撞的论文中提出它给出的是概率；模的平方出现在一篇校样阶段补加的脚注里。玻恩直到 1954 年才因这一诠释获诺贝尔奖。埃伦费斯特于 1927 年证明了以他名字命名的定理。高斯波包及其扩散由肯纳德（Kennard）在 1927 年算出。
:::

## 后续内容 {#leads}

本课程剩下的部分大多是求解 [[#eq-tise]]。[[quantum-1/piecewise-potentials]] 对势阱、阶跃与势垒求解它，边界条件在那里产生量子化的能量与隧穿。[[quantum-1/harmonic-oscillator]] 用算符方法求解。[[quantum-1/formalism]] 解释为什么能量本征函数构成标准正交基、为什么 $\abs{c_n}^2$ 是概率、为什么 $\Delta x\,\Delta p \ge \hbar/2$——[[#ex-uncertainty]] 只是一个实例。三维中 $\partial^2/\partial x^2$ 成为拉普拉斯算符，氢原子随之而来（[[quantum-1/hydrogen]]）。

::: summary
- 状态是复波函数 $\Psi(x,t)$；$\abs{\Psi}^2$ 是位置的概率密度（玻恩规则），$\Psi$ 必须归一化。
- $\Psi$ 服从线性、对时间一阶的薛定谔方程 $i\hbar\,\partial_t\Psi = -(\hbar^2/2m)\,\partial_x^2\Psi + V\Psi$。
- 概率服从 $\partial_t\rho + \partial_x j = 0$，其中 $j = (\hbar/m)\operatorname{Im}(\Psi^*\partial_x\Psi)$，故归一化保持不变；平面波有 $j = \rho\,p/m$。
- 可观测量是算符，$\hat p = -i\hbar\,\partial_x$，且 $\langle Q\rangle = \int\Psi^*\hat Q\Psi\,\dd x$。埃伦费斯特定理：$\dd\langle x\rangle/\dd t = \langle p\rangle/m$，$\dd\langle p\rangle/\dd t = -\langle V'\rangle$。
- 分离变量给出不含时方程 $\hat H\psi = E\psi$；定态 $\psi e^{-iEt/\hbar}$ 密度恒定、能量确定。
- 一般解是 $\sum c_n\psi_ne^{-iE_nt/\hbar}$；运动来自能量之间按玻尔频率 $(E_m - E_n)/h$ 的干涉。
- 自由波包以群速度 $p_0/m$ 运动并扩散；高斯包有 $\sigma(t) = \sigma_0\sqrt{1 + (t/\tau)^2}$，$\tau = 2m\sigma_0^2/\hbar$。
:::

## 习题 {#exercises}

::: exercise 带尖角的波函数 {level=1 check="1 - exp(-2)"}
一个粒子的波函数为 $\psi(x) = A\,e^{-\lambda\abs{x}}$，$\lambda > 0$。把它归一化，并求位置测量给出 $\abs{x} \le 1/\lambda$ 的概率。
::: solution
$\int_{-\infty}^\infty A^2e^{-2\lambda\abs{x}}\,\dd x = 2A^2\int_0^\infty e^{-2\lambda x}\,\dd x = A^2/\lambda$，故 $A = \sqrt\lambda$。于是

$$
P = 2\lambda\int_0^{1/\lambda}e^{-2\lambda x}\,\dd x = \bigl[-e^{-2\lambda x}\bigr]_0^{1/\lambda} = 1 - e^{-2} = 0.865.
$$

答案不依赖 $\lambda$，因为 $1/\lambda$ 是该态的自然长度。这个波函数是吸引 δ 函数势的束缚态。
:::
:::

::: exercise 晃动周期 {level=1 check="3.67"}
宽度 $1.00\,\mathrm{nm}$ 的无限深势阱中的电子处于态 $(\psi_1 + \psi_2)/\sqrt2$。求 $\langle x\rangle$ 的振荡周期，以飞秒计。若势阱宽度加倍，周期是多少？
::: solution
与 [[#ex-slosh]] 相同，$E_1 = \pi^2\hbar^2/2m_ea^2 = 0.376\,\mathrm{eV}$，$T = h/(3E_1) = 4.1357\times10^{-15}/1.128\,\mathrm{s} = 3.67\,\mathrm{fs}$。所有能量都按 $1/a^2$ 缩放，所以宽度加倍使周期变为四倍，即 $14.7\,\mathrm{fs}$。
:::
:::

::: exercise 对行波 {level=1}
求 $\Psi = \bigl(Ae^{ikx} + Be^{-ikx}\bigr)e^{-i\omega t}$ 的概率流，其中 $A$、$B$ 为复常量，$k$ 为实数。
::: solution
$\partial_x\Psi = ik\bigl(Ae^{ikx} - Be^{-ikx}\bigr)e^{-i\omega t}$，故

$$
\Psi^*\partial_x\Psi = ik\left(\abs{A}^2 - \abs{B}^2 + A B^* e^{2ikx} - A^*Be^{-2ikx}\right).
$$

最后两项是 $z - z^*$，其中 $z = AB^*e^{2ikx}$ 是纯虚数，所以乘以 $ik$ 后变成实的，从虚部中掉出。于是

$$
j = \frac{\hbar k}{m}\bigl(\abs{A}^2 - \abs{B}^2\bigr).
$$

入射波与反射波各自独立地携带自己的概率流，没有干涉项。这正是 [[quantum-1/piecewise-potentials]] 中用来定义反射系数的公式。
:::
:::

::: exercise 晃动的振幅 {level=2 check="16/(9*pi^2)"}
对宽度 $a$ 的无限深势阱中的态 $\Psi(x,0) = (\psi_1 + \psi_2)/\sqrt2$，求 $\langle x\rangle$ 振荡的振幅（以 $a$ 为单位），并求 $\langle p\rangle(t)$。
::: hint
用埃伦费斯特定理，而不是直接计算 $\langle p\rangle$。
:::
::: solution
由 [[#ex-slosh]]，$\langle x\rangle = a/2 - (16a/9\pi^2)\cos\omega t$，故振幅以 $a$ 为单位是 $16/9\pi^2 = 0.180$。阱内 $V = 0$，第一条埃伦费斯特方程成立（边界项消失，因为阱壁处 $\Psi = 0$），所以

$$
\langle p\rangle = m\deriv{\langle x\rangle}{t} = \frac{16am\omega}{9\pi^2}\sin\omega t = \frac{16am}{9\pi^2}\cdot\frac{3\pi^2\hbar}{2ma^2}\sin\omega t = \frac{8\hbar}{3a}\sin\omega t.
$$
:::
:::

::: exercise 下落的波包 {level=2}
质量为 $m$ 的粒子在均匀重力势 $V = mgx$（$x$ 向上）中运动。证明 $\langle x\rangle(t) = \langle x\rangle_0 + (\langle p\rangle_0/m)\,t - \frac12gt^2$ 严格成立，无论波包是什么形状。
::: solution
由 [[#thm-ehrenfest]]，$\dd\langle p\rangle/\dd t = -\langle\dd V/\dd x\rangle = -\langle mg\rangle = -mg$，因为 $\dd V/\dd x = mg$ 是常量，而归一化态有 $\langle c\rangle = c$。于是 $\langle p\rangle = \langle p\rangle_0 - mgt$。再由 $\dd\langle x\rangle/\dd t = \langle p\rangle/m = \langle p\rangle_0/m - gt$，积分即得结果。任何波包的中心都严格像 [[mechanics/motion-1d]] 中的石块那样下落，尽管波包在下落中可能扩散。
:::
:::

::: exercise 势能最低点以下没有能量 {level=2}
设对所有 $x$ 有 $V(x) \ge V_{\min}$。证明不含时薛定谔方程没有 $E < V_{\min}$ 的可归一化解。
::: hint
[[#eq-tise]] 乘以 $\psi^*$，积分，并对动能项分部积分。
:::
::: solution
$\hat H\psi = E\psi$ 乘以 $\psi^*$ 并对一切 $x$ 积分，由 $\int\abs\psi^2 = 1$，

$$
E = -\frac{\hbar^2}{2m}\int\psi^*\psi''\,\dd x + \int V\abs{\psi}^2\,\dd x.
$$

对可归一化的解，$\psi$ 与 $\psi'$ 在无穷远处消失，所以分部积分得 $-\int\psi^*\psi''\,\dd x = \int\abs{\psi'}^2\,\dd x \ge 0$。第二项至少是 $V_{\min}\int\abs\psi^2 = V_{\min}$。于是 $E \ge V_{\min}$，等号仅当 $\psi' = 0$ 处处成立，这对可归一化的 $\psi \ne 0$ 不可能。所以严格有 $E > V_{\min}$。等价地说，若 $E < V_{\min}$，则 $\psi''$ 处处与 $\psi$ 同号，于是 $\psi$ 离开轴线弯曲，无法归一化。
:::
:::

::: exercise 重叠积分守恒 {level=3}
设 $\Psi_1$ 与 $\Psi_2$ 是同一实势的薛定谔方程的两个解，二者连同各自的导数在无穷远处衰减。证明 $\int\Psi_1^*\Psi_2\,\dd x$ 与时间无关。由此推出两个能量不同的能量本征函数正交。
::: solution
在积分号下求导，并使用 $\partial_t\Psi = (i\hbar/2m)\Psi_{xx} - (i/\hbar)V\Psi$ 及其共轭：

$$
\deriv{}{t}\int\Psi_1^*\Psi_2\,\dd x = \int\left[\left(-\frac{i\hbar}{2m}\Psi^*_{1,xx} + \frac{i}{\hbar}V\Psi_1^*\right)\Psi_2 + \Psi_1^*\left(\frac{i\hbar}{2m}\Psi_{2,xx} - \frac{i}{\hbar}V\Psi_2\right)\right]\dd x.
$$

势的项因 $V$ 为实而相消。剩下

$$
\frac{i\hbar}{2m}\int\bigl(\Psi_1^*\Psi_{2,xx} - \Psi^*_{1,xx}\Psi_2\bigr)\,\dd x = \frac{i\hbar}{2m}\Bigl[\Psi_1^*\Psi_{2,x} - \Psi^*_{1,x}\Psi_2\Bigr]_{-\infty}^\infty = 0,
$$

因为被积函数正是括号的导数。对定态 $\Psi_j = \psi_je^{-iE_jt/\hbar}$，重叠积分为 $e^{i(E_1 - E_2)t/\hbar}\int\psi_1^*\psi_2\,\dd x$。当 $E_1 \ne E_2$ 时它要为常量，只能 $\int\psi_1^*\psi_2\,\dd x = 0$。
:::
:::

::: exercise 高斯是最小不确定度态 {level=3 check="1/2"}
设 $\psi(x) = A\,e^{-x^2/4\sigma^2}$。把它归一化，计算 $\Delta x$ 与 $\Delta p$，并给出乘积 $\Delta x\,\Delta p$（以 $\hbar$ 为单位）。
::: hint
$\int_{-\infty}^\infty e^{-x^2/2\sigma^2}\,\dd x = \sigma\sqrt{2\pi}$，$\int_{-\infty}^\infty x^2e^{-x^2/2\sigma^2}\,\dd x = \sigma^3\sqrt{2\pi}$。
:::
::: solution
$\abs\psi^2 = A^2e^{-x^2/2\sigma^2}$，故归一化给出 $A^2 = 1/(\sigma\sqrt{2\pi})$。密度是均值 $0$、标准差 $\sigma$ 的正态分布，所以 $\langle x\rangle = 0$，$\Delta x = \sigma$。

$\psi$ 为实且为偶，故 $\langle p\rangle = 0$。对 $\langle p^2\rangle = \hbar^2\int(\psi')^2\,\dd x$，用 $\psi' = -(x/2\sigma^2)\psi$：

$$
\langle p^2\rangle = \frac{\hbar^2}{4\sigma^4}\int x^2\abs\psi^2\,\dd x = \frac{\hbar^2}{4\sigma^4}\,\sigma^2 = \frac{\hbar^2}{4\sigma^2}.
$$

于是 $\Delta p = \hbar/2\sigma$，$\Delta x\,\Delta p = \hbar/2$：乘积以 $\hbar$ 为单位是 $1/2$，是不确定性原理允许的最小值。高斯是唯一能达到它的波函数（可差一个相位 $e^{ip_0x/\hbar}$ 与平移），[[quantum-1/formalism]] 中的证明将会说明。
:::
:::

::: exercise 尘埃颗粒 {level=2 check="1.90e13"}
求质量 $1.00\,\mu\mathrm{g}$、定域到 $\sigma_0 = 1.00\,\mu\mathrm{m}$ 的尘埃颗粒的扩散时间 $\tau = 2m\sigma_0^2/\hbar$，以秒计，并说明多少年后它的宽度加倍。
::: solution
$\tau = 2(1.00\times10^{-9}\,\mathrm{kg})(1.00\times10^{-6}\,\mathrm{m})^2/(1.0546\times10^{-34}\,\mathrm{J\,s}) = 1.90\times10^{13}\,\mathrm{s}$。宽度加倍时 $\sqrt{1 + (t/\tau)^2} = 2$，即 $t = \sqrt3\,\tau = 3.28\times10^{13}\,\mathrm{s}$，约 $1.0\times10^6$ 年。实际上，与空气分子和热辐射光子的碰撞使颗粒定域化的速度远快于此，这正是退相干研究的主题。
:::
:::
