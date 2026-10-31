[[quantum-1/schrodinger-equation]] 的不含时薛定谔方程写出来容易，对大多数势却不可能有封闭解。有一个家族总是可解：在区间上为常量、在常量值之间跳跃的势。在每个区间上方程是 $\psi'' = -k^2\psi$ 或 $\psi'' = \kappa^2\psi$，其解是正弦余弦或实指数。全部物理都在各段如何拼接之中。

分段势是理想化。没有哪个真实的势会不连续地跳跃。但一个在远短于德布罗意波长的距离内变化的势，对粒子而言就像一次跳跃，而这类模型描述的是半导体量子阱中的电子、核内的中子、金属表面处的传导电子，以及扫描隧道显微镜中的隧穿电流。更重要的是，它们在最简单的可能设定中展示了使量子力学不同于经典力学的三个现象：束缚态能量的**量子化**、经典粒子会直接爬上的阶跃引起的**反射**，以及经典粒子无法越过的势垒的**隧穿**。

我们依次求解无限深势阱、有限深势阱、阶跃势与矩形势垒。全程使用 [[quantum-1/schrodinger-equation#stationary]] 的匹配条件：$\psi$ 处处连续，$\psi'$ 在 $V$ 有限处连续，无穷高阱壁处 $\psi = 0$。

## 无限深势阱 {#infinite-well}

取

$$
V(x) = \begin{cases} 0, & 0 < x < a, \\ \infty, & \text{其他}. \end{cases}
$$

粒子不可能在阱外，所以那里 $\psi = 0$，而 $\psi$ 的连续性要求 $\psi(0) = \psi(a) = 0$。阱内 $V = 0$，方程为 $\psi'' = -k^2\psi$，$k = \sqrt{2mE}/\hbar$。（我们在 [[quantum-1/schrodinger-equation]] 中已证明 $E > V_{\min} = 0$，所以 $k$ 为正实数。）通解为 $\psi = A\sin kx + B\cos kx$。条件 $\psi(0) = 0$ 给出 $B = 0$。条件 $\psi(a) = 0$ 再给出 $A\sin ka = 0$；$A = 0$ 将一无所有，所以 $\sin ka = 0$，$ka = n\pi$。

::: theorem 无限深势阱 {#thm-infinite-well}
宽度 $a$ 的无限深势阱中质量为 $m$ 的粒子，其归一化能量本征函数与能量为

$$
\psi_n(x) = \sqrt{\frac{2}{a}}\,\sin\frac{n\pi x}{a}, \qquad E_n = \frac{n^2\pi^2\hbar^2}{2ma^2}, \qquad n = 1, 2, 3, \ldots
$$ {#eq-infinite-well}

本征函数是**标准正交**的，$\int_0^a\psi_m\psi_n\,\dd x = \delta_{mn}$。
:::

::: proof
能量来自 $k_n = n\pi/a$ 与 $E = \hbar^2k^2/2m$。负的 $n$ 给出只差符号的同一函数，$n = 0$ 给出 $\psi = 0$，所以 $n = 1, 2, \ldots$ 把每个独立解恰好列出一次。归一化：$\int_0^a A^2\sin^2(n\pi x/a)\,\dd x = A^2a/2$，故 $A = \sqrt{2/a}$。对 $m \ne n$，用 $2\sin\alpha\sin\beta = \cos(\alpha-\beta) - \cos(\alpha+\beta)$：

$$
\int_0^a\psi_m\psi_n\,\dd x = \frac1a\int_0^a\left[\cos\frac{(m-n)\pi x}{a} - \cos\frac{(m+n)\pi x}{a}\right]\dd x = \frac{1}{\pi}\left[\frac{\sin(m-n)\pi}{m-n} - \frac{\sin(m+n)\pi}{m+n}\right] = 0.
$$
:::

有几个特征在每个束缚态问题中反复出现。基态能量不为零：$E_1 = \pi^2\hbar^2/2ma^2 > 0$。一个被束缚在尺度 $a$ 区域内的粒子，动量不确定度为 $\hbar/a$ 量级，从而动能约为 $\hbar^2/ma^2$；这一**零点能**正是不确定性原理在起作用。第 $n$ 个本征函数在阱内有 $n - 1$ 个节点。本征函数关于中心在对称与反对称之间交替。能量按 $n^2$ 增长，间距也随之增大，这与 [[quantum-1/harmonic-oscillator]] 中等间距的谐振子不同。

函数 $\psi_n$ 还是**完备**的：$[0,a]$ 上任何在端点为零的合理函数 $f$ 都可展开为 $f = \sum c_n\psi_n$，$c_n = \int_0^a\psi_nf\,\dd x$。这就是傅里叶正弦级数（[数学图谱中的傅里叶级数](/learn/maths/lesson.php?c=pde&l=fourier-series)），[[quantum-1/schrodinger-equation#ex-expand]] 中的展开正是靠它才可行。

::: widget well
n: 1
show: both
caption: 无限深势阱的本征函数 $\psi_n$ 与密度 $\abs{\psi_n}^2$，单位 $\hbar = m = a = 1$。上调 $n$。数一数节点（$n - 1$ 个），注意能量按 $n^2$ 上升，并看到 $n$ 很大时密度振荡之快，使它在任何小窗口上的平均就是经典粒子在两壁间来回弹跳的均匀 $1/a$。
:::

::: example 纳米盒中的电子 {#ex-box}
求宽度 $1.00\,\mathrm{nm}$ 的无限深势阱中电子的三个最低能量，以及 $2\to1$ 跃迁发射的光子波长。再与束缚在 $10.0\,\mathrm{fm}$（原子核大小）内的质子比较。
::: solution
$E_1 = \pi^2\hbar^2/2m_ea^2 = \pi^2(1.05457\times10^{-34})^2/\bigl(2(9.10938\times10^{-31})(1.00\times10^{-9})^2\bigr) = 6.025\times10^{-20}\,\mathrm{J} = 0.376\,\mathrm{eV}$。于是 $E_2 = 4E_1 = 1.504\,\mathrm{eV}$，$E_3 = 9E_1 = 3.384\,\mathrm{eV}$。$2\to1$ 的光子携带 $3E_1 = 1.128\,\mathrm{eV}$，波长 $\lambda = 1239.84/1.128\,\mathrm{nm} = 1099\,\mathrm{nm}$，在近红外区。几纳米厚的半导体量子阱——把砷化镓夹在铝镓砷层之间制成——正是用这种方式调节激光器与探测器的波长，尽管实际的阱是有限的，而电子的有效质量比 $m_e$ 小。

对质子，$E_1 = \pi^2\hbar^2/2m_pa^2$，取 $a = 1.00\times10^{-14}\,\mathrm{m}$ 得 $3.28\times10^{-13}\,\mathrm{J} = 2.05\,\mathrm{MeV}$。质量大 $1836$ 倍而宽度小 $10^5$ 倍，所以能量大 $10^{10}/1836 \approx 5\times10^6$ 倍。这就是原子核能量达兆电子伏、原子能量只有几电子伏的原因。
:::
:::

## 有限深势阱 {#finite-well}

现在让阱壁具有有限高度。把能量零点放在阱外、把阱中心放在原点比较方便：

$$
V(x) = \begin{cases} -V_0, & \abs{x} < a, \\ 0, & \abs{x} > a, \end{cases} \qquad V_0 > 0.
$$

阱宽 $2a$、深 $V_0$。束缚态满足 $-V_0 < E < 0$。阱内 $\psi'' = -k^2\psi$，$k = \sqrt{2m(E + V_0)}/\hbar$。阱外 $\psi'' = \kappa^2\psi$，$\kappa = \sqrt{-2mE}/\hbar > 0$，所以 $\psi$ 是 $e^{\kappa x}$ 与 $e^{-\kappa x}$ 的组合，而可归一性对 $x > a$ 只留 $e^{-\kappa x}$，对 $x < -a$ 只留 $e^{\kappa x}$。波函数泄漏进经典禁区，在长度 $1/\kappa$ 上衰减。

因为 $V$ 是偶的，本征函数可以取为偶的或奇的（若 $\psi(x)$ 是解，$\psi(-x)$ 也是，其和与差也同样是解）。引入无量纲变量比较方便：

$$
z = ka, \qquad z_0 = \frac{a}{\hbar}\sqrt{2mV_0}, \qquad\text{于是}\qquad (\kappa a)^2 = z_0^2 - z^2.
$$

一个合并了深度与宽度的数 $z_0$ 决定一切。

::: theorem 有限深势阱的束缚态 {#thm-finite-well}
偶宇称束缚态在 $\abs x < a$ 内为 $\psi = \cos kx$，在 $\abs x > a$ 为 $\psi = \cos(ka)\,e^{-\kappa(\abs x - a)}$（未归一化），其中 $z = ka$ 是方程

$$
\tan z = \sqrt{\frac{z_0^2}{z^2} - 1}.
$$ {#eq-even}

在 $0 < z < z_0$ 内的根。奇宇称束缚态在阱内为 $\psi = \sin kx$，$z$ 是方程

$$
-\cot z = \sqrt{\frac{z_0^2}{z^2} - 1}.
$$ {#eq-odd}

的根。能量为 $E = -V_0 + \hbar^2z^2/2ma^2$。束缚态个数是不小于 $2z_0/\pi$ 的最小整数 $N$；特别地，无论势阱多浅多窄，至少总有一个（偶宇称）束缚态。
:::

::: proof
偶宇称情形在 $x = a$ 处匹配（$-a$ 处的条件由对称性自动成立）。阱内 $\psi = A\cos kx$，阱外 $\psi = Fe^{-\kappa x}$。$\psi$ 与 $\psi'$ 连续：

$$
A\cos ka = Fe^{-\kappa a}, \qquad -kA\sin ka = -\kappa Fe^{-\kappa a}.
$$

第二式除以第一式消去 $A$ 与 $F$：$k\tan ka = \kappa$，即 $\tan z = \kappa a/z = \sqrt{z_0^2 - z^2}/z$，就是 [[#eq-even]]。奇宇称情形阱内 $\psi = A\sin kx$，同样的除法给出 $k\cot ka = -\kappa$，即 [[#eq-odd]]。

数个数：右端 $\sqrt{z_0^2/z^2 - 1}$ 在 $z \to 0^+$ 时从 $+\infty$ 下降，在 $z = z_0$ 处降到 $0$。在每个区间 $\bigl(j\pi, j\pi + \frac{\pi}{2}\bigr)$ 上，$\tan z$ 从 $0$ 升到 $+\infty$，所以只要 $j\pi < z_0$，两条曲线在该区间上恰好相交一次：区间左端 $\tan z$ 在右端曲线之下，右端（或 $z_0$，以先到者为准）在其上。$\tan z < 0$ 的区间没有偶宇称根。于是偶宇称根存在于满足 $j\pi < z_0$ 的 $j = 0, 1, \ldots$；$j = 0$ 总是满足，故至少有一个束缚态。奇宇称方程同理，$-\cot z = \tan(z - \pi/2)$，在每个满足 $(j + \frac12)\pi < z_0$ 的区间 $\bigl((j+\frac12)\pi, (j+1)\pi\bigr)$ 上有一个根。总起来，每个满足 $\ell\pi/2 < z_0$ 的非负整数 $\ell$ 对应一个束缚态，即共 $\lceil 2z_0/\pi\rceil$ 个。
:::

这些方程是**超越**的：$z$ 没有公式解。先图解，看有多少个根、大约在哪里，然后数值求解。在每个包围区间上对 $f(z) = \tan z - \sqrt{z_0^2/z^2 - 1}$ 用二分法，五十步收敛到机器精度；牛顿法只需五步。

::: widget plot
f: tan(x); -1/tan(x); sqrt(max(w^2/x^2 - 1, 0))
x: 0.01, 10
y: 0, 8
labels: tan z (偶); −cot z (奇); √(z0²/z² − 1)
sliders: w=4.05:0.3:10:0.05
caption: 有限深势阱的图解解，横轴是 $z$，滑块是 $w = z_0$。下降曲线与 $\tan z$ 各分支的每个交点是一个偶宇称态，与 $-\cot z$ 各分支的每个交点是一个奇宇称态。$w = 4.05$（算例中的电子）时有三个。增大 $w$：$z_0$ 每越过一个 $\pi/2$ 的整数倍就出现一个新态。降到 $\pi/2 \approx 1.57$ 以下：始终还剩下一个交点。
:::

::: example $10\,\mathrm{eV}$ 深势阱中的电子 {#ex-finite}
一个电子束缚在深度 $V_0 = 10.0\,\mathrm{eV}$、宽度 $2a = 0.500\,\mathrm{nm}$ 的有限深势阱中。求束缚态的个数与能量，并与同宽无限深势阱比较。
::: solution
先算强度参数：

$$
z_0 = \frac{a\sqrt{2m_eV_0}}{\hbar} = \frac{(2.50\times10^{-10})\sqrt{2(9.10938\times10^{-31})(1.602177\times10^{-18})}}{1.054572\times10^{-34}} = 4.050.
$$

由 $2z_0/\pi = 2.58$，有 $3$ 个束缚态：两个偶宇称（根在 $(0, \pi/2)$ 与 $(\pi, 3\pi/2)$ 内）、一个奇宇称（根在 $(\pi/2, \pi)$ 内）。对 [[#eq-even]] 与 [[#eq-odd]] 用二分法得

$$
z_1 = 1.2556\ (\text{偶}), \qquad z_2 = 2.4820\ (\text{奇}), \qquad z_3 = 3.6114\ (\text{偶}).
$$

从阱底量起的能量是 $E + V_0 = \hbar^2z^2/2m_ea^2 = (z/z_0)^2V_0$，于是

$$
E_1 + V_0 = 0.961\,\mathrm{eV}, \qquad E_2 + V_0 = 3.755\,\mathrm{eV}, \qquad E_3 + V_0 = 7.950\,\mathrm{eV},
$$

即 $E_1 = -9.04\,\mathrm{eV}$、$E_2 = -6.24\,\mathrm{eV}$、$E_3 = -2.05\,\mathrm{eV}$。同宽的无限深势阱在阱底之上会有 $E_n = n^2\pi^2\hbar^2/2m_e(2a)^2 = 1.504,\ 6.016,\ 13.54\,\mathrm{eV}$，其中第三个已高于有限深势阱的顶部。有限深势阱的每个能级都低于对应的无限深势阱能级，因为波函数泄漏到外面：有效宽度更大，曲率因而更小，动能也随之更小。

衰减常量由 $\kappa a = \sqrt{z_0^2 - z^2}$ 得出：$3.85$、$3.20$、$1.83$。穿透深度 $1/\kappa$ 对基态是 $a/3.85 = 0.065\,\mathrm{nm}$，对最高能态是 $a/1.83 = 0.136\,\mathrm{nm}$。束缚最弱的态伸进禁区最远。
:::
:::

两个极限很有教益。对深而宽的阱，$z_0 \to \infty$，低处的根趋于 $z = n\pi/2$，$E + V_0 \to n^2\pi^2\hbar^2/2m(2a)^2$，即无限深势阱的能量。对浅而窄的阱，$z_0 \ll 1$，只有基态幸存，$z \approx z_0$ 且 $\kappa \to 0$：这个态几乎没被束缚，伸展到阱外很远的地方。三维中第二条陈述不成立：一个浅的球形势阱未必束缚任何东西，这就是只有一个弱束缚态的氘核如此"娇气"的原因。

::: quiz
一个有限深势阱的深度逐渐减小而宽度保持不变。哪个说法正确？
- [ ] $V_0$ 足够小时，所有束缚态最终都会消失。
- [x] 当 $z_0$ 落到相继的 $\pi/2$ 的整数倍以下时，束缚态一个一个地消失进连续谱，但基态从不消失。
- [ ] 所有态的能量一起上升，直到抵达 $E = V_0$。
- [ ] 每个态随着束缚变弱，节点数增加。
::: solution
由 [[#thm-finite-well]]，束缚态数为 $\lceil 2z_0/\pi\rceil$，$z_0$ 每越过一个 $\pi/2$ 的整数倍减一，但对一切 $z_0 > 0$ 至少为 $1$。能量朝 $E = 0$（按我们的约定，即阱顶）上升，而不是朝 $V_0$。第 $n$ 个态始终有 $n - 1$ 个节点。
:::
:::

## δ 函数势阱与简并 {#delta}

最窄可能的势阱是一根尖峰：$V(x) = -\alpha\,\delta(x)$，$\alpha > 0$，一个宽度为零、深度无穷、"强度" $\alpha$（能量乘长度的单位）为有限深势阱面积 $2aV_0$ 在 $a \to 0$ 极限下的阱。它是短程吸引的一个有用模型，并展示了匹配条件在无穷高尖峰处如何改变。

把不含时方程从 $-\eps$ 积到 $\eps$：

$$
-\frac{\hbar^2}{2m}\bigl[\psi'(\eps) - \psi'(-\eps)\bigr] - \alpha\psi(0) = E\int_{-\eps}^{\eps}\psi\,\dd x \to 0.
$$

所以 $\psi$ 仍然连续，但其导数跳跃：

$$
\psi'(0^+) - \psi'(0^-) = -\frac{2m\alpha}{\hbar^2}\,\psi(0).
$$ {#eq-delta-jump}

在 $x = 0$ 之外 $V = 0$，$E < 0$ 的束缚态是 $e^{-\kappa\abs x}$（唯一在两端衰减且在 $0$ 处连续的组合）。其导数从 $+\kappa$ 跳到 $-\kappa$，代入 [[#eq-delta-jump]] 得 $-2\kappa = -2m\alpha/\hbar^2$，于是

$$
\kappa = \frac{m\alpha}{\hbar^2}, \qquad E = -\frac{\hbar^2\kappa^2}{2m} = -\frac{m\alpha^2}{2\hbar^2}, \qquad \psi(x) = \sqrt\kappa\,e^{-\kappa\abs x}.
$$

无论 $\alpha$ 取什么值，都恰好有一个束缚态。这就是 [[quantum-1/schrodinger-equation]] 习题中归一化过的那个带尖角的波函数。

::: example δ 势阱作为极限 {#ex-delta-limit}
证明：当 $a \to 0$ 而 $2aV_0 = \alpha$ 保持不变时，[[#thm-finite-well]] 中有限深势阱的基态趋于 δ 势阱的束缚态。
::: solution
在这一极限下 $z_0^2 = 2ma^2V_0/\hbar^2 = m\alpha a/\hbar^2 \to 0$，所以只有一个偶宇称态，$0 < z < z_0 \ll 1$。$z$ 很小时 $\tan z \approx z$，[[#eq-even]] 化为 $z \approx \kappa a/z$，即 $\kappa a \approx z^2$。又 $(\kappa a)^2 = z_0^2 - z^2$，而 $\kappa a \approx z^2$ 是 $z_0^2$ 量级、远小于 $z_0$，于是 $z^2 = z_0^2 - (\kappa a)^2 \approx z_0^2$。因此

$$
\kappa \approx \frac{z^2}{a} \approx \frac{z_0^2}{a} = \frac{2maV_0}{\hbar^2} = \frac{m\alpha}{\hbar^2},
$$

正是 δ 势阱的结果。结合能 $\hbar^2\kappa^2/2m = m\alpha^2/2\hbar^2$，以 $\hbar^2/2ma^2$ 为单位是 $z_0^4$ 量级：弱而窄的阱束缚得极弱，态伸到阱外 $1/\kappa \gg a$ 之远。
:::
:::

我们在一维找到每个束缚态，每个能量都只有一个本征函数。这不是巧合。

::: theorem 一维没有简并 {#thm-nondegenerate}
设 $\psi_1$ 与 $\psi_2$ 是一维不含时薛定谔方程对应同一能量 $E$ 的两个可归一化解。则对某个常量 $c$ 有 $\psi_2 = c\,\psi_1$。
:::

::: proof
$\psi_1'' = (2m/\hbar^2)(V - E)\psi_1$ 乘以 $\psi_2$，$\psi_2'' = (2m/\hbar^2)(V - E)\psi_2$ 乘以 $\psi_1$，两式相减：$\psi_2\psi_1'' - \psi_1\psi_2'' = 0$。左端是朗斯基行列式 $W = \psi_2\psi_1' - \psi_1\psi_2'$ 的导数，所以 $W$ 是常量（穿过 $V$ 的有限跳跃或 δ 函数也一样，因为 $\psi$ 的两个跳跃条件是同一个线性关系）。两个函数都在无穷远处消失，故 $W = 0$。在任何 $\psi_1 \ne 0$ 的区间上，$W = 0$ 意味着 $(\psi_2/\psi_1)' = -W/\psi_1^2 = 0$，于是那里 $\psi_2 = c\psi_1$；由于二阶线性常微分方程的解由一点处的函数值与导数值完全决定，该关系处处成立。
:::

两个推论。因为每个能量只有一个本征函数，且解的实部与虚部都是解，所以一维束缚态的本征函数除整体相位外是实的。而当 $V$ 为偶时，$\psi(-x)$ 是同能量的解，故 $\psi(-x) = c\,\psi(x)$ 且 $c^2 = 1$：每个束缚态要么是偶的、要么是奇的，这就为 [[#thm-finite-well]] 中的奇偶分立提供了依据。散射态则不同：能量 $E > 0$ 时波 $e^{ikx}$ 与 $e^{-ikx}$ 彼此独立，定理不适用，因为它们不在无穷远处消失。

## 阶跃势 {#step}

非束缚态的行为不同。考察阶跃

$$
V(x) = \begin{cases} 0, & x < 0, \\ V_0, & x > 0, \end{cases}
$$

能量为 $E$ 的粒子从左侧入射。能量本征函数不可归一化——自由粒子也是如此——它们描述的是稳恒束流，物理内容在概率流之比中。我们在 [[quantum-1/schrodinger-equation]] 中发现波 $Ae^{ikx}$ 携带概率流 $\abs{A}^2\hbar k/m$，且相向运动的波各自独立地携带自己的概率流。

::: definition 反射系数与透射系数 {#def-rt}
对入射波 $Ae^{ikx}$、左侧反射波 $Be^{-ikx}$、右侧透射波 $Fe^{ik'x}$ 的定态散射态，**反射系数**与**透射系数**是概率流之比

$$
R = \frac{\abs{j_{\mathrm{ref}}}}{j_{\mathrm{inc}}} = \frac{\abs{B}^2}{\abs{A}^2}, \qquad T = \frac{j_{\mathrm{trans}}}{j_{\mathrm{inc}}} = \frac{k'}{k}\,\frac{\abs F^2}{\abs A^2}.
$$

出现因子 $k'/k$，是因为透射波以不同的速度运动。
:::

概率在定态下守恒意味着 $\partial_t\rho = 0$，由连续性方程，$j$ 在每个 $x$ 处相同。左侧 $j = (\hbar k/m)(\abs A^2 - \abs B^2)$；右侧 $j = (\hbar k'/m)\abs F^2$。令二者相等，在每个一维散射问题中都有 $R + T = 1$。

**情形 $E > V_0$。** 右侧 $k' = \sqrt{2m(E - V_0)}/\hbar$，且右侧没有源，只存在出射波 $Fe^{ik'x}$。在 $x = 0$ 处匹配：

$$
A + B = F, \qquad ik(A - B) = ik'F.
$$

于是 $B/A = (k - k')/(k + k')$，$F/A = 2k/(k + k')$，且

$$
R = \left(\frac{k - k'}{k + k'}\right)^2, \qquad T = \frac{4kk'}{(k+k')^2}.
$$ {#eq-step-rt}

能量 $E > V_0$ 的经典粒子总是越过阶跃并减速。量子粒子有时会被反射，尽管它的能量绰绰有余。同一个公式对向下的阶跃（$V_0 < 0$）也成立，而且它与光在折射率正比于 $k$ 与 $k'$ 的两种介质界面上的反射相同（正入射的菲涅耳公式，[[optics]]）。反射是波的性质，它不在乎阶跃朝哪个方向。

**情形 $0 < E < V_0$。** 此时右侧 $\psi'' = \kappa^2\psi$，$\kappa = \sqrt{2m(V_0 - E)}/\hbar$，我们只保留 $Fe^{-\kappa x}$。匹配条件就是前面那组，把 $ik'$ 换成 $-\kappa$：$B/A = (k - i\kappa)/(k + i\kappa)$，模为 $1$。于是 $R = 1$：每个粒子最终都被反射，与经典一致。但波函数以密度 $\abs F^2e^{-2\kappa x}$ 渗入禁区，反射波的相位移动了 $\arg(B/A) = -2\arctan(\kappa/k)$。实指数不携带概率流，所以 $T = 0$ 是自洽的。

::: example 部分反射与渗入 {#ex-step}
(a) 能量 $E = 2V_0$ 的粒子遇到向上的阶跃。多大比例被反射？(b) 能量 $E = 5.00\,\mathrm{eV}$ 的电子遇到高度 $10.0\,\mathrm{eV}$ 的阶跃。求穿透深度 $1/\kappa$。
::: solution
(a) $k \propto \sqrt E$，$k' \propto \sqrt{E - V_0}$，故 $k'/k = \sqrt{1/2} = 0.7071$。由 [[#eq-step-rt]]，

$$
R = \left(\frac{1 - 0.7071}{1 + 0.7071}\right)^2 = (0.1716)^2 = 0.0294, \qquad T = \frac{4(0.7071)}{(1.7071)^2} = 0.9706.
$$

约 $3\%$ 被反射。$R + T = 1$，理所当然。结果只依赖 $E/V_0$，不依赖质量也不依赖 $\hbar$：但请注意它也不随 $\hbar \to 0$ 趋于零。经典极限之所以能恢复，只是因为真实的阶跃在多个波长上光滑变化，而光滑阶跃的反射是指数小的。

(b) $\kappa = \sqrt{2m_e(5.00\,\mathrm{eV})}/\hbar = \sqrt{2(9.109\times10^{-31})(8.011\times10^{-19})}/(1.0546\times10^{-34}) = 1.146\times10^{10}\,\mathrm{m^{-1}}$，故 $1/\kappa = 0.0873\,\mathrm{nm}$。密度在这段距离上衰减 $e^{-2}$。金属中比真空能级低几个电子伏的电子，泄漏到表面外不足一埃，这正是下一节那台显微镜的出发点。
:::
:::

::: remark 尖锐的阶跃为什么会反射
[[#ex-step]] 的部分反射没有经典对应物，但对各种波都很眼熟：光在玻璃表面部分反射，声音在介质改变处、弦上连接两根不同弦的结处部分反射（[[oscillations/travelling-waves]]）。要紧的是介质相对于波长变化得有多突然。若势在距离 $d$ 内从 $0$ 升到 $V_0$，一旦 $d$ 超过波长，反射系数就随 $kd$ 指数下降，因为缓慢上升的每一小段都反射一点点，而这些反射通过干涉相互抵消。理想化的尖锐阶跃是最坏情形。金属表面与半导体界面处的真实势在几埃内变化，与电子波长相当，这就是量子反射在那里很重要、而对上坡滚球却完全看不见的原因。
:::

::: warning 忘了速度因子
一个常见的错误是把阶跃的透射写成 $T = \abs F^2/\abs A^2$。对 $E = 2V_0$ 这会给出 $\abs{F/A}^2 = \bigl(2/(1.7071)\bigr)^2 = 1.373$，一个大于"一"的"透射概率"。透射波的振幅可以超过入射振幅，因为透射粒子运动得更慢，同一概率流下要以更高的密度堆积。概率是概率流之比，$T = (k'/k)\abs{F/A}^2 = 0.7071\times1.373 = 0.971$，只有带上这个因子才有 $R + T = 1$。
:::

## 势垒隧穿 {#barrier}

现在让阶跃有有限宽度：

$$
V(x) = \begin{cases} V_0, & 0 < x < L, \\ 0, & \text{其他}. \end{cases}
$$

能量 $E < V_0$ 的经典粒子总是被反射。量子粒子会穿入势垒，波函数在垒内指数衰减，若 $L$ 不太大，另一侧就有一个指数小但非零的波出来。这就是**隧穿**。

::: theorem 矩形势垒的透射 {#thm-barrier}
对 $0 < E < V_0$，记 $\kappa = \sqrt{2m(V_0 - E)}/\hbar$，

$$
T = \left[1 + \frac{V_0^2\sinh^2(\kappa L)}{4E(V_0 - E)}\right]^{-1}.
$$ {#eq-barrier}

对 $E > V_0$，同一公式成立，只需把 $\sinh(\kappa L)$ 换成 $\sin(k'L)$、把 $V_0 - E$ 换成 $E - V_0$，其中 $k' = \sqrt{2m(E-V_0)}/\hbar$。当 $\kappa L \gg 1$ 时，

$$
T \approx \frac{16E(V_0 - E)}{V_0^2}\,e^{-2\kappa L}.
$$ {#eq-barrier-approx}
:::

::: proof
记 $k = \sqrt{2mE}/\hbar$，对 $x < 0$ 写 $\psi = e^{ikx} + re^{-ikx}$，对 $0 < x < L$ 写 $\psi = Ce^{\kappa x} + De^{-\kappa x}$，对 $x > L$ 写 $\psi = te^{ikx}$。两侧出现同一个 $k$，所以 $T = \abs t^2$。在 $x = L$ 处 $\psi$ 与 $\psi'$ 连续：

$$
Ce^{\kappa L} + De^{-\kappa L} = te^{ikL}, \qquad \kappa\bigl(Ce^{\kappa L} - De^{-\kappa L}\bigr) = ikte^{ikL},
$$

于是，记 $\tau = te^{ikL}/2$，

$$
C = \tau\left(1 + \frac{ik}{\kappa}\right)e^{-\kappa L}, \qquad D = \tau\left(1 - \frac{ik}{\kappa}\right)e^{\kappa L}.
$$

在 $x = 0$ 处，两个条件是 $1 + r = C + D$ 与 $ik(1 - r) = \kappa(C - D)$。第二式除以 $ik$ 再与第一式相加消去 $r$：

$$
2 = C\left(1 + \frac{\kappa}{ik}\right) + D\left(1 - \frac{\kappa}{ik}\right).
$$

代入 $C$ 与 $D$，并用 $(1 \pm ik/\kappa)(1 \pm \kappa/ik) = 2 \pm i(k/\kappa - \kappa/k)$，

$$
2 = \tau\Bigl[4\cosh\kappa L - 2i\left(\frac k\kappa - \frac\kappa k\right)\sinh\kappa L\Bigr], \qquad te^{ikL} = \frac{1}{\cosh\kappa L + i\,\dfrac{\kappa^2 - k^2}{2k\kappa}\sinh\kappa L}.
$$

取模的平方并用 $\cosh^2 = 1 + \sinh^2$，

$$
T = \abs t^2 = \left[1 + \left(1 + \frac{(\kappa^2 - k^2)^2}{4k^2\kappa^2}\right)\sinh^2\kappa L\right]^{-1} = \left[1 + \frac{(k^2 + \kappa^2)^2}{4k^2\kappa^2}\sinh^2\kappa L\right]^{-1}.
$$

最后 $k^2 + \kappa^2 = 2mV_0/\hbar^2$，$k^2\kappa^2 = (2m/\hbar^2)^2E(V_0 - E)$，即得 [[#eq-barrier]]。$E > V_0$ 的情形是同一计算取 $\kappa = ik'$，此时 $\sinh\kappa L \to i\sin k'L$、$\kappa^2 \to -k'^2$。当 $\kappa L \gg 1$，$\sinh\kappa L \approx \frac12e^{\kappa L}$，括号中的 $1$ 可忽略，[[#eq-barrier-approx]] 得证。
:::

指数因子 $e^{-2\kappa L}$ 主宰一切。粗略地说，宽度加倍就把（本来就小的）透射率平方，而经由 $\kappa \propto \sqrt m$ 的质量依赖同样无情。垒顶之上，$E > V_0$，透射率一般不是 $1$，且恰好当 $\sin k'L = 0$、即整个数目的半波长横贯势垒时达到 $1$。这些**透射共振**来自在两条边缘反射的波之间的相消干涉，与增透膜同理。

::: example 电子的隧穿 {#ex-tunnel}
能量 $E = 1.00\,\mathrm{eV}$ 的电子遇到高度 $V_0 = 2.00\,\mathrm{eV}$ 的势垒。求宽度 $L = 0.500\,\mathrm{nm}$ 与 $1.00\,\mathrm{nm}$ 时的 $T$，与近似式 [[#eq-barrier-approx]] 比较，并求同样能量、同样势垒下宽度 $L = 0.500\,\mathrm{nm}$ 时质子的 $T$。
::: solution
$\kappa = \sqrt{2m_e(1.00\,\mathrm{eV})}/\hbar = 5.123\times10^{9}\,\mathrm{m^{-1}}$，$L = 0.500\,\mathrm{nm}$ 时 $\kappa L = 2.562$。前置因子为 $V_0^2/4E(V_0 - E) = 4/4 = 1$，

$$
T = \frac{1}{1 + \sinh^2(2.562)} = \frac{1}{1 + (6.440)^2} = \frac{1}{42.47} = 0.0235.
$$

近似式给出 $16(1)(1)/4\cdot e^{-5.123} = 4\times0.005956 = 0.0238$，误差在 $1.2\%$ 内。$L = 1.00\,\mathrm{nm}$ 时 $\kappa L = 5.123$，$T = 1/(1 + \sinh^2 5.123) = 1.419\times10^{-4}$；近似式精确到四位。宽度加倍使 $T$ 缩小 $166$ 倍。

对质子，$\kappa$ 大 $\sqrt{m_p/m_e} = 42.85$ 倍，$\kappa L = 109.8$，$T \approx 4e^{-219.5} \approx 2\times10^{-95}$。质子不会在电子伏能量下隧穿原子尺度的势垒；电子则天天如此。
:::
:::

::: widget plot
f: if(x < 1, 1/(1 + sinh(g*sqrt(1 - x))^2/(4*x*(1 - x))), 1/(1 + sin(g*sqrt(x - 1))^2/(4*x*(x - 1))))
x: 0.01, 4
y: 0, 1.05
sliders: g=3.62:0.5:12:0.02
caption: 矩形势垒的透射率 $T$ 随 $E/V_0$ 的变化，滑块是 $g = L\sqrt{2mV_0}/\hbar$。在 $g = 3.62$（算例中 $0.5\,\mathrm{nm}$ 的电子）处，$E/V_0 = 0.5$ 时读出 $T \approx 0.024$。增大 $g$：隧穿区指数式塌缩。到 $E = V_0$ 之上，寻找 $T = 1$ 的共振，并注意两者之间 $T$ 并不是 $1$，尽管经典粒子总是通过。
:::

::: application 隧穿的用武之地
宾尼希（Binnig）与罗雷尔（Rohrer）的**扫描隧道显微镜**（1981 年，1986 年诺贝尔奖）把一根尖锐的金属针尖悬在导电表面上方零点几纳米处，电子隧穿过真空间隙。势垒高度约为功函数，约 $4.5\,\mathrm{eV}$，故 $\kappa = \sqrt{2m_e(4.5\,\mathrm{eV})}/\hbar = 10.9\,\mathrm{nm^{-1}}$，由 [[#eq-barrier-approx]]，间隙改变 $0.1\,\mathrm{nm}$ 时电流改变 $e^{2\kappa\cdot0.1\,\mathrm{nm}} = 8.8$ 倍。扫描时保持电流恒定，就能以百分之一纳米的精度测绘表面，足以看清单个原子。同样的指数灵敏度支配着 **α 衰变**：伽莫夫（Gamow）以及独立地格尼（Gurney）与康登（Condon）在 1928 年解释了为什么 α 粒子能量只在约 $4$ 到 $9\,\mathrm{MeV}$ 之间变化，半衰期却横跨微秒到数十亿年。隧穿还是场致发射、约瑟夫森结和你手机里闪存的基础。
:::

::: history 方势阱与隧穿
硬壁势阱是薛定谔 1926 年论文之后最早被求解的问题之一。洪特（Hund）1927 年用两个势阱之间的隧穿解释了分子光谱；1928 年诺德海姆（Nordheim）与福勒（Fowler）用穿过表面势垒的隧穿解释了冷金属的电子场致发射。伽莫夫的 α 衰变理论 1928 年发表于《物理学杂志》（*Zeitschrift für Physik*），格尼与康登的同年发表于《自然》（*Nature*）。江崎（Esaki）1957 年观察到重掺杂半导体结中的隧穿，贾埃弗（Giaever）1960 年观察到超导体之间的隧穿；他们与约瑟夫森（Josephson）分享了 1973 年诺贝尔奖。
:::

## 后续内容 {#leads}

底部光滑的有限深势阱成为 [[quantum-1/harmonic-oscillator]] 的谐振子，匹配问题在那里换成幂级数必须截断的条件。[[quantum-1/hydrogen]] 中氢原子的径向方程是 $r > 0$ 上带条件 $u(0) = 0$ 的一维问题，与无限深势阱的一壁完全相同。非矩形的势垒用 WKB 方法近似处理，其中 $\kappa L$ 换成 $\int\kappa(x)\,\dd x$；势阱的周期阵列则产生 [[condensed-matter]] 的能带。化学图谱在[模型体系](/learn/chemistry/lesson.php?c=quantum-chemistry&l=model-systems)一文中把势箱中的粒子应用于共轭分子。

::: summary
- 在 $V$ 为常量的区间上，解是 $e^{\pm ikx}$（允许区）或 $e^{\pm\kappa x}$（禁区）；$\psi$ 与 $\psi'$ 在有限跳跃处连续，无穷高壁处 $\psi = 0$。
- 宽度 $a$ 的无限深势阱：$\psi_n = \sqrt{2/a}\sin(n\pi x/a)$，$E_n = n^2\pi^2\hbar^2/2ma^2$，标准正交且完备；基态能量非零，第 $n$ 个态有 $n - 1$ 个节点。
- 宽 $2a$、深 $V_0$ 的有限深势阱：记 $z_0 = a\sqrt{2mV_0}/\hbar$，偶宇称态解 $\tan z = \sqrt{z_0^2/z^2 - 1}$，奇宇称态解 $-\cot z = \sqrt{z_0^2/z^2-1}$；共有 $\lceil 2z_0/\pi\rceil \ge 1$ 个束缚态，全部低于同宽无限深势阱的对应能级。
- $R$ 与 $T$ 是概率流之比，且 $R + T = 1$。$E > V_0$ 的阶跃反射 $R = \bigl((k - k')/(k + k')\bigr)^2$；$E < V_0$ 时全反射，但波渗入深度 $1/\kappa$。
- 势垒的透射率 $T = [1 + V_0^2\sinh^2\kappa L/4E(V_0-E)]^{-1} \approx 16E(V_0-E)V_0^{-2}e^{-2\kappa L}$；对 $L$ 与 $m$ 的指数灵敏度是扫描隧道显微镜与 α 衰变的基础。
- 垒顶之上 $T < 1$，共振 $k'L = n\pi$ 处除外。
:::

## 习题 {#exercises}

::: exercise 0.1 nm 势箱的基态 {level=1 check="37.6"}
求宽度 $0.100\,\mathrm{nm}$ 的无限深势阱中电子的基态能量，以 eV 计。
::: solution
$E_1 \propto 1/a^2$，$a = 1.00\,\mathrm{nm}$ 时为 $0.376\,\mathrm{eV}$（[[#ex-box]]）。$a$ 缩小 $10$ 倍使 $E_1$ 乘以 $100$：$E_1 = 37.6\,\mathrm{eV}$。这比氢的结合能还大，是自洽的：原子尺度的势箱要付出几十电子伏的动能，而库仑吸引来支付这笔账。
:::
:::

::: exercise 中间三分之一中的概率 {level=1 check="1/3 + sqrt(3)/(2*pi)"}
粒子处于宽度 $a$ 的无限深势阱的基态。求它在中间三分之一 $a/3 < x < 2a/3$ 中被找到的概率。
::: solution
$$
P = \frac2a\int_{a/3}^{2a/3}\sin^2\frac{\pi x}{a}\,\dd x = \frac1a\int_{a/3}^{2a/3}\left(1 - \cos\frac{2\pi x}{a}\right)\dd x = \frac13 - \frac{1}{2\pi}\left[\sin\frac{2\pi x}{a}\right]_{a/3}^{2a/3}.
$$

括号是 $\sin(4\pi/3) - \sin(2\pi/3) = -\sqrt3$，故 $P = \frac13 + \frac{\sqrt3}{2\pi} = 0.609$。以恒定速率来回弹跳的经典粒子会给 $1/3$。
:::
:::

::: exercise 向下的阶跃 {level=1 check="1/9"}
能量为 $E$ 的粒子从左侧接近一个深度 $V_0 = 3E$ 的*向下*阶跃，即 $x < 0$ 处 $V = 0$、$x > 0$ 处 $V = -3E$。求反射系数。
::: solution
右侧动能为 $E + 3E = 4E$，故 $k'/k = \sqrt{4E/E} = 2$。于是 $R = \bigl((1 - 2)/(1 + 2)\bigr)^2 = 1/9$，$T = 4\cdot2/9 = 8/9$。经典粒子走下悬崖绝不会被反射；量子粒子只要有九分之一被反射——只要悬崖在波长的尺度上是尖锐的。
:::
:::

::: exercise 浅势阱 {level=2 check="0.739"}
某有限深势阱的 $z_0 = 1$。证明它恰好有一个束缚态，且其 $z$ 满足 $\cos z = z$。求 $z$ 到小数点后三位。
::: hint
把 [[#eq-even]] 平方，并用 $1 + \tan^2 z = 1/\cos^2 z$。
:::
::: solution
由 $2z_0/\pi = 0.637 < 1$，[[#thm-finite-well]] 给出一个束缚态，为偶宇称。由 $\tan^2 z = z_0^2/z^2 - 1$ 得 $1/\cos^2 z = z_0^2/z^2$，故 $\cos z = z/z_0$（取正，因为 $0 < z < \pi/2$）。取 $z_0 = 1$ 得 $\cos z = z$。从 $z = 0.7$ 起迭代 $z \mapsto \cos z$（或用二分法）收敛到 $z = 0.7391$，故 $z = 0.739$。结合能为 $-E = (\hbar^2/2ma^2)(z_0^2 - z^2) = 0.454\,\hbar^2/2ma^2$，且 $\kappa a = \sqrt{1 - 0.546} = 0.674$。
:::
:::

::: exercise 数一数能级 {level=2 check="3"}
中子在一维模型原子核中运动：深度 $40.0\,\mathrm{MeV}$、宽度 $2a = 6.00\,\mathrm{fm}$ 的有限深势阱。它有几个束缚态？
::: solution
$z_0 = a\sqrt{2m_nV_0}/\hbar$，其中 $a = 3.00\times10^{-15}\,\mathrm{m}$，$m_n = 1.67493\times10^{-27}\,\mathrm{kg}$，$V_0 = 40.0\times1.602177\times10^{-13}\,\mathrm{J} = 6.40871\times10^{-12}\,\mathrm{J}$：

$$
z_0 = \frac{(3.00\times10^{-15})\sqrt{2(1.67493\times10^{-27})(6.40871\times10^{-12})}}{1.054572\times10^{-34}} = 4.17.
$$

于是 $2z_0/\pi = 2.65$，由 [[#thm-finite-well]]，束缚态数为 $\lceil 2.65\rceil = 3$：两个偶宇称，一个奇宇称。原子核的势阱恰好深而窄到给出寥寥几个能级，这里便是如此。
:::
:::

::: exercise 共振透射 {level=2 check="18"}
一个电子越过高度 $V_0 = 2.00\,\mathrm{eV}$、宽度 $L$ 的矩形势垒。在 $E = 6.00\,\mathrm{eV}$ 处透射完美，这是垒顶之上使 $T = 1$ 的最低能量。求下一个使 $T = 1$ 的能量（以 eV 计）以及宽度 $L$。
::: solution
$T = 1$ 当 $\sin k'L = 0$，即 $k'L = n\pi$。由 $E - V_0 = \hbar^2k'^2/2m \propto n^2$，共振位于 $E_n - V_0 = n^2(E_1 - V_0)$，其中 $E_1 - V_0 = 4.00\,\mathrm{eV}$。下一个是 $n = 2$：$E = 2.00 + 4(4.00) = 18.0\,\mathrm{eV}$。宽度由 $k'L = \pi$ 得出：$k' = \sqrt{2m_e(4.00\,\mathrm{eV})}/\hbar = 1.025\times10^{10}\,\mathrm{m^{-1}}$，故 $L = 0.307\,\mathrm{nm}$。
:::
:::

::: exercise 薄势垒极限 {level=3}
对矩形势垒取 $V_0L = \alpha$ 固定、$L \to 0$ 且 $V_0 \to \infty$，即 δ 函数势垒 $V = \alpha\,\delta(x)$。由 [[#eq-barrier]] 证明 $T \to \bigl(1 + m\alpha^2/2\hbar^2E\bigr)^{-1}$。
::: solution
$L \to 0$、$V_0L = \alpha$ 时，$\kappa L = L\sqrt{2m(V_0 - E)}/\hbar \approx \sqrt{2mV_0L^2}/\hbar = \sqrt{2m\alpha L}/\hbar \to 0$。故 $\sinh\kappa L \approx \kappa L$，且

$$
\frac{V_0^2\sinh^2\kappa L}{4E(V_0-E)} \approx \frac{V_0^2\kappa^2L^2}{4E(V_0 - E)} = \frac{V_0^2L^2}{4E(V_0 - E)}\cdot\frac{2m(V_0 - E)}{\hbar^2} = \frac{m(V_0L)^2}{2\hbar^2E} = \frac{m\alpha^2}{2\hbar^2E}.
$$

于是 $T \to (1 + m\alpha^2/2\hbar^2E)^{-1}$。高能粒子几乎畅通无阻；低能粒子几乎全被反射。同样的结果可以由直接求解 δ 势垒得到，使用跳跃条件 $\psi'(0^+) - \psi'(0^-) = (2m\alpha/\hbar^2)\psi(0)$。
:::
:::

::: exercise 有限深势阱的能级都低于无限深势阱 {level=3}
证明 [[#eq-even]] 与 [[#eq-odd]] 的根对第 $n$ 个束缚态（$n = 1, 2, \ldots$）满足 $z_n < n\pi/2$，并由此推出 $E_n + V_0$ 小于宽度 $2a$ 的无限深势阱的第 $n$ 个能量。
::: solution
由 [[#thm-finite-well]] 的证明，第 $n$ 个态（从底部把偶宇称与奇宇称一起数）的根落在开区间 $\bigl((n-1)\pi/2, n\pi/2\bigr)$ 内：奇数 $n = 2j + 1$ 时偶宇称根在 $(j\pi, j\pi + \pi/2)$，偶数 $n = 2j + 2$ 时奇宇称根在 $(j\pi + \pi/2, (j+1)\pi)$。两种情形都有 $z_n < n\pi/2$；端点取不到，因为右端 $\sqrt{z_0^2/z^2 - 1}$ 对 $z > 0$ 有限，而 $\tan z$（相应地 $-\cot z$）在 $z = n\pi/2$ 处无穷大。于是

$$
E_n + V_0 = \frac{\hbar^2z_n^2}{2ma^2} < \frac{\hbar^2}{2ma^2}\cdot\frac{n^2\pi^2}{4} = \frac{n^2\pi^2\hbar^2}{2m(2a)^2},
$$

这正是宽度 $2a$（阱底在 $-V_0$）的无限深势阱的第 $n$ 个能级。
:::
:::
