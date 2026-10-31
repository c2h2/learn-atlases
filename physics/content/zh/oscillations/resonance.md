小孩每推一个周期一下，就把秋千维持在运动中。扬声器的纸盆跟随放大器的电压。动不平衡的轮子以转轴的频率摇晃它螺栓其上的机器。每个情形中，振荡器之外的某个东西在自由运动本该消失之后仍持续供给周期性的力。自由运动是 [[oscillations/damping]] 的主题：线性阻力下位移衰减，能量随之而去。一个不关断的驱动补回损失的能量。衰减过去之后仍然留存的运动，就是这里研究的稳态。

问题是定量的。稳态位移有多大，它如何依赖驱动频率？物块是跟着力动，还是落在力后面？位移在哪个频率最大，那个频率是不是驱动最吃力的频率？全篇质量恒定、弹簧线性、阻力与速度成线性关系。这些建模选择让方程可以被封闭地求解。

采用 [[oscillations/simple-harmonic]] 与 [[oscillations/damping]] 的约定。无阻尼振子的固有角频率为 $\omega_0 = \sqrt{k/m}$，阻尼常数为 $\gamma = b/(2m)$，品质因数为 $Q = \omega_0 m/b = \omega_0/(2\gamma)$。重述这些名称是为了让下面的公式能独立阅读；支撑它们的自由衰减在阻尼一讲中已经证明。

## 受驱方程

牛顿第二定律（如 [[mechanics/newton-laws]] 中那样）把质量乘以加速度等同于合力。弹簧贡献 $-kx$，线性阻尼器贡献 $-b\,\deriv{x}{t}$，驱动装置贡献一个我们取为纯余弦的力。

::: definition 受驱阻尼振子 {#def-driven}
**受驱阻尼振子**是质量 $m > 0$ 恒定的质点，其偏离平衡位置的位移 $x(t)$ 满足

$$
m\deriv{^2 x}{t^2} + b\deriv{x}{t} + kx = F_0\cos(\omega t),
$$ {#eq-driven}

其中 $k > 0$、$b \ge 0$、$F_0$ 为常数，$\omega \ge 0$ 是驱动角频率。等价地，取 $\omega_0 = \sqrt{k/m}$、$\gamma = b/(2m)$，

$$
\deriv{^2 x}{t^2} + 2\gamma\deriv{x}{t} + \omega_0^2 x = \frac{F_0}{m}\cos(\omega t).
$$ {#eq-driven-reduced}

方程线性且系数为常数。项 $F_0\cos(\omega t)$ 是驱动力。我们不给余弦加相位：驱动的任何恒定相位都可以靠平移 $t$ 的原点吸收掉。
:::

导数记号 $\deriv{^2 x}{t^2}$ 就是普通的二阶导数 $\mathrm{d}^2 x/\mathrm{d}t^2$。用前面几讲的撇号记法，同一句话写作 $m x'' + b x' + k x = F_0\cos(\omega t)$。

线性是本讲得以运作的东西。若 $x_h$ 解右端为零的方程，$x_p$ 解 [[#eq-driven]]，则 $x_h + x_p$ 解 [[#eq-driven]]。齐次部件 $x_h$ 恰好是自由的阻尼运动。只要 $b > 0$，这类解无论处于欠阻尼、临界阻尼还是过阻尼，都随 $t\to\infty$ 趋于零。只要我们能找到一个本身不增长的特解，晚期的运动就剩下 $x_p$。那个特解就是稳态。

暂态与稳态的划分说的是未来，不是头几个周期。驱动刚接上之后，两个部件同时存在，而 $x_h$ 中的常数由初始位移与初始速度确定。我们先构造 $x_p$，因为它不依赖那些初始值，之后再回来做匹配。

::: intuition 哪个力在平衡驱动
稳态中有三个力与驱动一同作用：弹簧、阻尼器和惯性，最后这一个是把牛顿定律中的 $ma$ 项移到左端得到的。它们并非在每个频率下平均分担负荷。驱动频率极低时位移几乎与力同步，弹簧平衡驱动，正像它面对静态载荷 $F_0$ 时那样。频率极高时物块几乎不动；它的加速度与位移反相，惯性平衡驱动。在这两个极限之间，由阻尼器承担负荷。它完全承担负荷的那个频率是固有频率，而且它并不是位移最大的那个频率。本讲余下的部分把这幅图像变成公式。
:::

## 稳态

我们要找一个以驱动频率振荡、振幅恒定、落后于力一个恒定角度的解。

::: definition 稳态 {#def-steady}
[[#eq-driven]] 的一个**稳态**是形如

$$
x(t) = D\cos(\omega t - \delta)
$$ {#eq-steady}

的解，其中振幅 $D \ge 0$ 与相位滞后 $\delta$ 都是常数。滞后 $\delta$ 从驱动力 $F_0\cos(\omega t)$ 量到位移。$\delta$ 为正表示位移比力更晚到达自己的极大值。
:::

这个形式只是表面上像猜测。[[#eq-driven]] 的右端是频率为 $\omega$ 的正弦量。对系数为常数的线性方程，只要 $b > 0$，或者 $b = 0$ 且 $\omega \ne \omega_0$，同频率的正弦量就是一个特解。两个常数 $D$ 与 $\delta$ 由把 [[#eq-steady]] 代入 [[#eq-driven]] 确定，没有更多的自由。

::: theorem 稳态振幅与相位 {#thm-steady}
设 $m > 0$、$k > 0$、$\omega > 0$。若 $b > 0$，或 $b = 0$ 且 $\omega \ne \omega_0$，则 [[#eq-driven]] 具有形如 [[#eq-steady]] 的稳态，其中

$$
D = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}}
$$ {#eq-amplitude}

且

$$
\tan\delta = \frac{2\gamma\omega}{\omega_0^2 - \omega^2}, \qquad \delta\in (0,\pi).
$$ {#eq-phase}

平方根取正的。落在 $(0,\pi)$ 内的 $\delta$ 是正弦与余弦满足

$$
\sin\delta = \frac{b\omega D}{F_0}, \qquad \cos\delta = \frac{(k - m\omega^2)D}{F_0}
$$

的唯一角度（当 $F_0 > 0$ 时）。特别地，$\omega = \omega_0$ 时 $\delta = \pi/2$；$\omega < \omega_0$ 时 $\delta\in (0,\pi/2)$；$\omega > \omega_0$ 时 $\delta\in (\pi/2,\pi)$。若 $F_0 < 0$，把 $F_0$ 换成 $\abs{F_0}$ 并给力的相位加 $\pi$；以下总设 $F_0 > 0$。
:::

::: proof
记 $\phi = \omega t - \delta$，试探解即 $x = D\cos\phi$。对 $t$ 求导得

$$
\deriv{x}{t} = -D\omega\sin\phi, \qquad \deriv{^2 x}{t^2} = -D\omega^2\cos\phi.
$$

代入 [[#eq-driven]]：

$$
D(k - m\omega^2)\cos\phi - Db\omega\sin\phi = F_0\cos(\omega t).
$$

驱动的余弦必须用同一组基写。加法角公式给出 $\cos(\omega t) = \cos(\phi + \delta) = \cos\phi\cos\delta - \sin\phi\sin\delta$，因此

$$
F_0\cos(\omega t) = F_0\cos\delta\cos\phi - F_0\sin\delta\sin\phi.
$$

函数 $\cos\phi$ 与 $\sin\phi$ 线性无关，所以系数分别匹配：

$$
D(k - m\omega^2) = F_0\cos\delta, \qquad Db\omega = F_0\sin\delta.
$$

平方相加，恒等式 $\cos^2\delta + \sin^2\delta = 1$ 给出

$$
D^2\left[(k - m\omega^2)^2 + (b\omega)^2\right] = F_0^2.
$$

振幅 $D$ 被要求非负，所以

$$
D = \frac{F_0}{\sqrt{(k - m\omega^2)^2 + (b\omega)^2}},
$$

只要分母不为零。分子分母同除以 $m$，并用 $k/m = \omega_0^2$ 与 $b/m = 2\gamma$，此式即化为 [[#eq-amplitude]]。把两个系数等式相除，只要 $\cos\delta \ne 0$，就得到 [[#eq-phase]]。

根号下的分母消失当且仅当 $b = 0$ 且 $k - m\omega^2 = 0$ 同时成立，即当且仅当 $b = 0$ 且 $\omega = \omega_0$。那种情形被排除在陈述之外，在 [[#prop-secular]] 中处理。除此之外 $D$ 都是有限的。

剩下的是把 $\delta$ 放对半圆。由 $Db\omega = F_0\sin\delta$ 以及符号假设 $D \ge 0$、$b \ge 0$、$\omega > 0$、$F_0 > 0$，有 $\sin\delta \ge 0$，所以 $\delta$ 落在 $[0,\pi]$，不在下半平面。若 $b > 0$ 则 $\sin\delta > 0$，$\delta$ 不是 $0$ 也不是 $\pi$，开区间 $(0,\pi)$ 正确。于是余弦等式表明 $\cos\delta$ 与 $k - m\omega^2 = m(\omega_0^2 - \omega^2)$ 同号。因此驱动比 $\omega_0$ 慢时 $\delta$ 是锐角，比 $\omega_0$ 快时是钝角，$\omega = \omega_0$ 时恰为 $\pi/2$。最后那一行上 $\cos\delta = 0$、$\sin\delta = 1$，与 $\tan\delta$ 因发散到正无穷而无定义相一致。
:::

在挑出任何特殊频率之前，有两个极限值得直接从 [[#eq-amplitude]] 读出。$\omega\to 0$ 时，振幅趋于 $(F_0/m)/\omega_0^2 = F_0/k$，正是恒力 $F_0$ 下弹簧的压缩量，且 $\delta\to 0$：物块跟随力。$\omega\to\infty$ 时，$D\sim (F_0/m)/\omega^2$ 且 $\delta\to\pi$：位移很小且与力反向。惯性已经接管，正如开头那幅图像所预告的。

计算器上的反正切返回 $(-\pi/2,\pi/2)$ 内的值。该值只在 $\omega < \omega_0$ 时才等于 $\delta$。当 $\omega > \omega_0$ 时 [[#eq-phase]] 的分母为负，$\tan\delta$ 为负，我们要的角度是计算器输出加上 $\pi$。

同样的代数可以用复指数来做，这正是本课程承诺的记账法。把驱动 $F_0\cos(\omega t)$ 换成 $F_0 e^{i\omega t}$ 的实部，再寻找一个为 $Z e^{i\omega t}$ 之实部的位移，$Z$ 为复常数。代入 [[#eq-driven]] 得

$$
Z = \frac{F_0}{k - m\omega^2 + ib\omega}.
$$

$Z$ 的模就是 [[#eq-amplitude]] 中的 $D$。写成 $Z = D e^{-i\delta}$ 时负号加在 $\delta$ 上，因为 [[#eq-steady]] 落后于驱动，而分母的辐角是 $\delta$。

::: corollary 固有频率处的响应 {#cor-natural}
若 $b > 0$ 且驱动恰在 $\omega = \omega_0$，则 $\delta = \pi/2$ 且

$$
D(\omega_0) = \frac{F_0}{b\omega_0} = Q\frac{F_0}{k}.
$$ {#eq-d-natural}

静位移是 $F_0/k$，所以 $Q$ 正是 $\omega_0$ 处的共振把静位移放大的倍数。
:::

::: proof
在 [[#eq-amplitude]] 中令 $\omega = \omega_0$。项 $\omega_0^2 - \omega^2$ 消失，平方根为 $2\gamma\omega_0$，于是

$$
D(\omega_0) = \frac{F_0/m}{2\gamma\omega_0} = \frac{F_0}{b\omega_0},
$$

其中第二步用到 $2\gamma m = b$。再由 $Q = \omega_0 m/b$ 与 $k = m\omega_0^2$，

$$
\frac{F_0}{b\omega_0} = \frac{F_0}{k}\cdot\frac{m\omega_0^2}{b\omega_0} = Q\frac{F_0}{k}.
$$

关于相位的断言是 [[#thm-steady]] 在 $\omega = \omega_0$ 的情形。
:::

::: example 标准受驱振子 {#ex-standard}
取 $m = 1.00\,\mathrm{kg}$、$b = 0.400\,\mathrm{kg/s}$、$k = 4.00\,\mathrm{N/m}$、$F_0 = 1.00\,\mathrm{N}$。求 $\omega_0$、$\gamma$、$Q$、静位移、$\omega = \omega_0$ 处的稳态振幅与相位，以及使 $D$ 达到最大的驱动频率。把那个最大振幅与 $D(\omega_0)$ 作比较。
::: solution
固有频率与阻尼常数为

$$
\omega_0 = \sqrt{\frac{k}{m}} = \sqrt{4.00} = 2.00\,\mathrm{rad/s}, \qquad \gamma = \frac{b}{2m} = \frac{0.400}{2.00} = 0.200\,\mathrm{s^{-1}}.
$$

品质因数为 $Q = \omega_0 m/b = 2.00/0.400 = 5.00$。静位移为 $F_0/k = 1.00/4.00 = 0.250\,\mathrm{m}$。于是 [[#cor-natural]] 给出

$$
D(\omega_0) = \frac{F_0}{b\omega_0} = \frac{1.00}{0.400\times 2.00} = 1.25\,\mathrm{m},
$$

即 $0.250\,\mathrm{m}$ 的 $Q$ 倍，且 $\delta = \pi/2$。下面 [[#thm-amp]] 中导出的振幅共振频率在这里是实数，因为 $\gamma = 0.200$ 远低于 $\omega_0/\sqrt{2} = 1.414\,\mathrm{s^{-1}}$：

$$
\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2} = \sqrt{4.00 - 2\times 0.0400} = \sqrt{3.92} = 1.980\,\mathrm{rad/s}.
$$

由 [[#eq-dmax]] 得到的峰值振幅为

$$
D_{\max} = \frac{F_0/m}{2\gamma\sqrt{\omega_0^2 - \gamma^2}} = \frac{1}{0.400\times\sqrt{3.96}} = 1.256\,\mathrm{m}.
$$

位移最大的频率比 $\omega_0$ 低 $1.01$ 个百分点，$D_{\max}$ 比 $D(\omega_0)$ 高 $0.504$ 个百分点。$\omega_0$ 处的稳态是 $x = 1.25\sin(2.00\, t)$，$t$ 以秒计时以米计。舍入之前两个平方根分别是 $\sqrt{3.92} = 1.97990$ 与 $\sqrt{3.96} = 1.98997$。
:::
:::

## 振幅共振

[[#eq-amplitude]] 对 $\omega$ 的依赖只通过分母。让 $D$ 大与让

$$
S(\omega) = (\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2
$$

小是同一个问题。$\gamma$ 小时，静态极限与高频尾部都使 $S$ 变大：$S(0) = \omega_0^4$，而 $\omega\to\infty$ 时 $S(\omega)\sim\omega^4$。若中间有一个凹陷，那个凹陷就是振幅的共振峰。

::: theorem 振幅共振 {#thm-amp}
设 $F_0 > 0$、$\omega \ge 0$，$D(\omega)$ 为 [[#eq-amplitude]]。

若 $0 \le \gamma < \omega_0/\sqrt{2}$，则 $D(\omega)$ 在唯一的正频率

$$
\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2}
$$ {#eq-amp-res}

处取最大值，最大值为

$$
D_{\max} = \frac{F_0/m}{2\gamma\sqrt{\omega_0^2 - \gamma^2}}.
$$ {#eq-dmax}

若 $\gamma \ge \omega_0/\sqrt{2}$，则 $D(\omega)$ 在 $\omega \ge 0$ 上严格递减，其在该半射线上的最大值是静态值 $D(0) = F_0/k$。

用品质因数表述，非零频率处存在峰的条件是 $Q > 1/\sqrt{2}$。轻阻尼——通常的实验情形——$Q$ 有几个单位或更多，此时 $\omega_{\mathrm{amp}}$ 紧邻 $\omega_0$。
:::

::: proof
令 $u = \omega^2 \ge 0$，把 $S$ 看作 $u$ 的函数：

$$
S(u) = (\omega_0^2 - u)^2 + 4\gamma^2 u.
$$

对 $u$ 求导得

$$
S'(u) = -2(\omega_0^2 - u) + 4\gamma^2 = 2\left(u - \omega_0^2 + 2\gamma^2\right),
$$

且 $S''(u) = 2 > 0$。于是 $S'$ 在唯一点 $u_* = \omega_0^2 - 2\gamma^2$ 处消失，而该临界点只要落在定义域内就是 $S$ 的极小值。

若 $\gamma < \omega_0/\sqrt{2}$，则 $u_* > 0$。$S$ 在 $u \ge 0$ 上的最小值在 $u_*$ 处取得，所以 $D$ 的最大值在 $\omega_{\mathrm{amp}} = \sqrt{u_*}$ 处取得，即 [[#eq-amp-res]]。最小值为

$$
\begin{aligned}
S(u_*)
&= (2\gamma^2)^2 + 4\gamma^2(\omega_0^2 - 2\gamma^2)
= 4\gamma^4 + 4\gamma^2\omega_0^2 - 8\gamma^4
= 4\gamma^2(\omega_0^2 - \gamma^2).
\end{aligned}
$$

故 $\sqrt{S(u_*)} = 2\gamma\sqrt{\omega_0^2 - \gamma^2}$，由 $D = (F_0/m)/\sqrt{S}$ 即得 [[#eq-dmax]]。平方根为实，因为 $\gamma < \omega_0/\sqrt{2} < \omega_{0}$。

若 $\gamma > \omega_0/\sqrt{2}$，则 $u_* < 0$。在物理半射线 $u \ge 0$ 上 $S'(u) > 0$，所以 $S$ 严格递增、$D$ 严格递减。最大的振幅是 $D(0) = (F_0/m)/\omega_0^2 = F_0/k$。若 $\gamma = \omega_0/\sqrt{2}$，则 $u_* = 0$ 且 $S'(u) \ge 0$，等号只在原点成立，结论相同。

阈值的品质因数形式就是改写 $\gamma = \omega_0/(2Q)$。不等式 $\gamma < \omega_0/\sqrt{2}$ 化为 $1/(2Q) < 1/\sqrt{2}$，即 $Q > 1/\sqrt{2}$。
:::

$D$ 的峰被拉到 $\omega_0$ 之下，是因为 $S$ 中的因子 $(2\gamma\omega)^2$ 随 $\omega$ 增长。往 $\omega_0$ 下方挪一点，$S$ 的第一项付出一点、第二项省回一点。驻止的平衡就是 [[#eq-amp-res]]。$\omega_0$ 固定而 $\gamma\to 0$ 时，该频率升到 $\omega_0$，而另一方面 $D_{\max}$ 无界增长。阻尼消失时，面对频率为 $\omega_0$ 的驱动，没有任何东西能维持有限的稳态振幅。那是本章末尾警告中的长期项情形，不是 [[#eq-dmax]] 还可以照引的极限情形。

在 $\omega_{\mathrm{amp}}$ 处相位并不是 $\pi/2$。由 [[#eq-phase]] 及 $\omega_0^2 - \omega_{\mathrm{amp}}^2 = 2\gamma^2$，

$$
\tan\delta = \frac{2\gamma\omega_{\mathrm{amp}}}{2\gamma^2} = \frac{\omega_{\mathrm{amp}}}{\gamma},
$$

由于驱动在 $\omega_0$ 之下，$\delta$ 仍在 $(0,\pi/2)$ 内。对 [[#ex-standard]] 的数，$\tan\delta = 1.980/0.200 = 9.90$，故 $\delta = 84.2^\circ$。位移峰已经接近正交相位，这就是它离下面即将导出的功率峰如此之近的原因。

::: example 峰值附近的相位与功率 {#ex-phase}
对 [[#ex-standard]] 的振子，计算 $\omega = 1.90\,\mathrm{rad/s}$ 与 $\omega = 3.00\,\mathrm{rad/s}$ 处的 $D$、$\delta$ 与平均功率。平均功率即下面的 [[#eq-power]]；在这里把它当公式用，或由 $\tfrac12 b\omega^2 D^2$ 重新计算。
::: solution
在 $\omega = 1.90\,\mathrm{rad/s}$ 处，

$$
\begin{aligned}
\omega_0^2 - \omega^2 &= 4.00 - 3.61 = 0.390,\\
2\gamma\omega &= 0.400\times 1.90 = 0.760,\\
D &= \frac{1}{\sqrt{0.390^2 + 0.760^2}} = \frac{1}{\sqrt{0.7297}} = 1.171\,\mathrm{m}.
\end{aligned}
$$

相位的正切为正，$0.760/0.390 = 1.949$，且分母 $\omega_0^2 - \omega^2$ 为正，所以 $\delta$ 是锐角：$\delta = \arctan(1.949) = 1.097\,\mathrm{rad} = 62.8^\circ$。平均功率为

$$
\langle P\rangle = \tfrac12 b\omega^2 D^2 = \tfrac12\times 0.400\times 1.90^2\times 1.171^2 = 0.989\,\mathrm{W}.
$$

在 $\omega = 3.00\,\mathrm{rad/s}$ 处，

$$
D = \frac{1}{\sqrt{(4.00 - 9.00)^2 + (0.400\times 3.00)^2}} = \frac{1}{\sqrt{25.00 + 1.44}} = \frac{1}{\sqrt{26.44}} = 0.1945\,\mathrm{m}.
$$

此时 $\tan\delta = 1.20/(4.00 - 9.00) = -0.240$。分母为负，$\delta$ 落在 $(\pi/2,\pi)$：$\delta = \pi + \arctan(-0.240) = 2.906\,\mathrm{rad} = 166.5^\circ$。平均功率为 $\tfrac12\times 0.400\times 9.00\times 0.1945^2 = 0.0681\,\mathrm{W}$。

两个频率都远离 $D$ 的最大值——在 $1.980\,\mathrm{rad/s}$ 处为 $1.256\,\mathrm{m}$。$1.90\,\mathrm{rad/s}$ 处振幅已达 $1.171\,\mathrm{m}$、功率为 $0.989\,\mathrm{W}$，而 $\omega_0$ 处功率是 $1.25\,\mathrm{W}$。每三弧度一秒处驱动已过共振：滞后为钝角，振幅与功率都塌了下去。
:::
:::

下图使用这些参数，并让物块从原点静止出发，所以早期运动中仍含有暂态。

::: widget oscillator
m: 1
c: 0.4
k: 4
F: 1
omega: 1.9
x0: 0
v0: 0
caption: 小部件里的 c 是本讲的阻尼系数 b。这些数值下固有频率为 2。让运动从静止开始继续播放，观察暂态衰减成 omega = 1.9 附近的稳态振荡。把 omega 调过 2，把稳态振幅与共振曲线比较：振幅峰恰在 2 之下，而功率更喜欢 2 本身。然后把 c 设为 0、omega 设为 2：稳态公式不再适用，振幅持续增长而不收敛。
:::

::: example 阻尼太重，没有峰 {#ex-heavy}
保留 $m = 1.00\,\mathrm{kg}$、$k = 4.00\,\mathrm{N/m}$、$F_0 = 1.00\,\mathrm{N}$，但取 $b = 4.00\,\mathrm{kg/s}$。证明 $D(\omega)$ 在任何正频率处没有最大值，并计算 $\omega = 0$、$\omega = 1.00\,\mathrm{rad/s}$ 与 $\omega = \omega_0$ 处的 $D$。
::: solution
这里 $\gamma = b/(2m) = 2.00\,\mathrm{s^{-1}}$，而 $\omega_0/\sqrt{2} = \sqrt{2} = 1.414\,\mathrm{s^{-1}}$。因为 $\gamma > \omega_0/\sqrt{2}$，[[#thm-amp]] 断言 $D$ 在 $\omega \ge 0$ 上严格递减。等价地 $Q = \omega_0 m/b = 2.00/4.00 = 0.500$，而 $1/\sqrt{2} \approx 0.707$，$Q$ 在阈值之下。公式 $\sqrt{\omega_0^2 - 2\gamma^2}$ 用不了：$2\gamma^2 = 8.00 > 4.00$。

静态振幅为 $D(0) = F_0/k = 0.250\,\mathrm{m}$。在 $\omega = 1.00\,\mathrm{rad/s}$ 处，

$$
D = \frac{1}{\sqrt{(4.00 - 1.00)^2 + (4.00\times 1.00)^2}} = \frac{1}{\sqrt{9.00 + 16.00}} = \frac{1}{5.00} = 0.200\,\mathrm{m}.
$$

在 $\omega = \omega_0 = 2.00\,\mathrm{rad/s}$ 处，根号下第一项消失而 $2\gamma\omega = 8.00$，所以 $D = 1/8.00 = 0.125\,\mathrm{m}$。振幅一路下降。把这个振荡器的 $\omega_0$ 叫作"共振"，就是凭空造出公式里并不存在的峰。稳态仍然存在，[[#cor-natural]] 仍给出 $D(\omega_0) = F_0/(b\omega_0) = 1/(4.00\times 2.00) = 0.125\,\mathrm{m}$。消失的是 $\omega$ 从下方趋近 $\omega_0$ 时 $D$ 的上升。
:::
:::

## 功率与速度的相位

振幅是尺子量到的东西，功率是驱动付出的东西。驱动力输出的瞬时功率是 [[mechanics/work-energy]] 中的乘积：力乘以速度，$P = F_0\cos(\omega t)\,\deriv{x}{t}$。在一个周期上，这个乘积在力与速度反向时变号。决定驱动平均而言是否在输入能量的量，是它在一个周期 $T = 2\pi/\omega$ 上的平均。

::: proposition 平均功率 {#prop-power}
设 $b > 0$、$\omega > 0$，$x = D\cos(\omega t - \delta)$ 是 [[#thm-steady]] 的稳态。驱动力在一个周期上的平均功率为

$$
\langle P\rangle = \tfrac12 b\omega^2 D^2 = \frac{F_0^2\gamma}{m}\cdot\frac{\omega^2}{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}.
$$ {#eq-power}

对任何 $\gamma > 0$，该平均值在 $\omega = \omega_0$ 处最大，最大值为

$$
\langle P\rangle_{\max} = \frac{F_0^2}{2b}.
$$ {#eq-power-max}

$\langle P\rangle$ 降到 $\langle P\rangle_{\max}$ 一半处的两个频率为

$$
\omega_{\pm} = \pm\gamma + \sqrt{\gamma^2 + \omega_0^2},
$$

其中上号给 $\omega_+$、下号给 $\omega_-$。它们的间距恰为

$$
\omega_+ - \omega_- = 2\gamma = \frac{\omega_0}{Q},
$$

对 $\gamma$ 的大小没有任何近似。
:::

::: proof
稳态速度为 $\deriv{x}{t} = -D\omega\sin(\omega t - \delta)$。展开正弦：

$$
\sin(\omega t - \delta) = \sin(\omega t)\cos\delta - \cos(\omega t)\sin\delta.
$$

瞬时功率化为

$$
P = -F_0 D\omega\left[\cos(\omega t)\sin(\omega t)\cos\delta - \cos^2(\omega t)\sin\delta\right].
$$

$\cos(\omega t)\sin(\omega t) = \tfrac12\sin(2\omega t)$ 在一个周期上的平均为零，$\cos^2(\omega t)$ 的平均为 $\tfrac12$。因此

$$
\langle P\rangle = \tfrac12 F_0 D\omega\sin\delta.
$$

由 [[#thm-steady]] 证明中的系数匹配，$\sin\delta = b\omega D/F_0$。代入即得 [[#eq-power]] 的第一个形式：

$$
\langle P\rangle = \tfrac12 F_0 D\omega\cdot\frac{b\omega D}{F_0} = \tfrac12 b\omega^2 D^2.
$$

同一结果也就是阻尼器抽取能量的平均速率。阻尼器作用在物块上的力是 $-b\,\deriv{x}{t}$，它交给物块的功率是 $-b(\deriv{x}{t})^2$，抽取的功率是 $b(\deriv{x}{t})^2$。对 $(\deriv{x}{t})^2 = D^2\omega^2\sin^2(\omega t - \delta)$ 取平均得 $\tfrac12 D^2\omega^2$，所以平均抽取功率是 $\tfrac12 b\omega^2 D^2$。稳态下动能与弹簧能过一个周期就回到起始值，平均而言什么都不储存。驱动必须恰好补回阻尼器抽走的东西。这就是两个计算相符的原因。暂态还活着的时候，储存项不是周期的，这笔平衡不是能量账目的全部。

为定位最大值，代入 [[#eq-amplitude]] 与 $b = 2m\gamma$：

$$
\langle P\rangle = \frac{\gamma F_0^2}{m}\cdot\frac{u}{(\omega_0^2 - u)^2 + 4\gamma^2 u}, \qquad u = \omega^2.
$$

对 $u > 0$ 最大化 $\langle P\rangle$ 等价于最小化

$$
\frac{(\omega_0^2 - u)^2}{u} + 4\gamma^2 = \frac{\omega_0^4}{u} - 2\omega_0^2 + u + 4\gamma^2.
$$

对 $u$ 的导数是 $-\omega_0^4/u^2 + 1$，在 $u = \omega_0^2$ 处消失，且在 $u > 0$ 上别无零点。二阶导数 $2\omega_0^4/u^3$ 为正，所以该临界点是上述表达式的最小值、$\langle P\rangle$ 的最大值。于是平均功率在 $\omega = \omega_0$ 处最大，与 $\gamma$ 无关。该频率处 $D = F_0/(b\omega_0)$，且

$$
\langle P\rangle_{\max} = \tfrac12 b\omega_0^2\left(\frac{F_0}{b\omega_0}\right)^2 = \frac{F_0^2}{2b}.
$$

至于半功率频率，令 $\langle P\rangle = \tfrac12\langle P\rangle_{\max}$。用 $\langle P\rangle_{\max} = F_0^2/(4m\gamma)$ 与上面的表达式，比值为

$$
\frac{\langle P\rangle}{\langle P\rangle_{\max}} = \frac{4\gamma^2\omega^2}{(\omega_0^2 - \omega^2)^2 + 4\gamma^2\omega^2}.
$$

令比值等于 $\tfrac12$ 并清分母，得 $(\omega_0^2 - \omega^2)^2 = 4\gamma^2\omega^2$，即 $\omega_0^2 - \omega^2 = \pm 2\gamma\omega$。两个二次方程是 $\omega^2 + 2\gamma\omega - \omega_0^2 = 0$ 与 $\omega^2 - 2\gamma\omega - \omega_0^2 = 0$。正根为 $\omega_- = -\gamma + \sqrt{\gamma^2 + \omega_0^2}$ 与 $\omega_+ = \gamma + \sqrt{\gamma^2 + \omega_0^2}$。相减留下 $2\gamma$。由 $Q = \omega_0/(2\gamma)$，宽度 $2\gamma$ 就是 $\omega_0/Q$。
:::

对 [[#ex-standard]] 的振子，最大的平均功率是 $F_0^2/(2b) = 1/(0.800) = 1.25\,\mathrm{W}$，半功率宽度是 $2\gamma = 0.400\,\mathrm{rad/s}$。两个端点为

$$
\omega_- = -0.200 + \sqrt{4.04} = 1.810\,\mathrm{rad/s}, \qquad \omega_+ = 0.200 + \sqrt{4.04} = 2.210\,\mathrm{rad/s}.
$$

轻阻尼的草图会把它们放在 $\omega_0\pm\gamma$，即 $1.80$ 与 $2.20$。精确端点与草图相差每弧度一秒的百分之一。宽度在两种说法下都是精确的：它就是 $2\gamma$，不是 $2\gamma$ 的近似。

半功率不是半振幅。因为 $\langle P\rangle = \tfrac12 b\omega^2 D^2$，$\omega$ 改变时功率与振幅的关系也随之改变。在 $\omega_{\pm}$ 处引用 $D_{\max}/\sqrt{2}$，回答的是一个与 [[#prop-power]] 所解不同的问题。

::: proposition 速度与力同相 {#prop-velocity}
在 [[#thm-steady]] 的稳态中（$\omega > 0$、$b > 0$），速度与驱动力同相当且仅当 $\omega = \omega_0$。该频率处速度振幅为 $F_0/b$，且 $\langle P\rangle = \tfrac12 F_0$ 乘以该速度振幅。
:::

::: proof
对 [[#eq-steady]] 求导得

$$
\deriv{x}{t} = D\omega\cos(\omega t - \delta + \pi/2).
$$

速度是一个余弦，落后 $F_0\cos(\omega t)$ 的角度是 $\delta - \pi/2$。该滞后消失当且仅当 $\delta = \pi/2$。由 [[#thm-steady]]，$\omega > 0$、$b > 0$ 时滞后 $\delta$ 等于 $\pi/2$ 当且仅当 $\omega = \omega_0$。此时速度振幅为 $D(\omega_0)\,\omega_0 = F_0/b$。$\cos^2(\omega t)$ 的平均是 $\tfrac12$，所以力乘以振幅为 $F_0/b$ 的同相速度，其平均为 $\tfrac12 F_0\cdot(F_0/b) = F_0^2/(2b)$，与 [[#eq-power-max]] 一致。
:::

这就是功率在 $\omega_0$ 处取峰、尽管 $D$ 的峰略低的原因。$\omega_0$ 之下，只有从 $\pi/2$ 中减去 $\delta$ 之后，速度才领先力不到直角；与力同步的速度分量是 $D\omega\sin\delta$，而不是整个 $D\omega$。$\omega_0$ 之上，速度获得与力反向的分量。同相分量——唯一做净功的分量——在位移正交处、即 $\omega_0$ 处最大。

::: quiz
对 $b > 0$ 的受驱阻尼振子，驱动提供的平均功率在哪里最大？
- [ ] 在振幅共振频率 $\sqrt{\omega_0^2 - 2\gamma^2}$，因为那里物块走得最远
- [x] 在固有频率 $\omega_0$，那里速度与力同相
- [ ] 在 $\omega = 0$，那里位移与力同相，静位移是 $F_0/k$
- [ ] 在一个随阻尼移除而趋于无穷的频率
::: solution
[[#prop-power]] 把 $\langle P\rangle$ 的最大值对每个 $\gamma > 0$ 都放在 $\omega = \omega_{0}$。[[#thm-amp]] 的振幅峰是另一个频率，比 $\omega_0$ 低一个 $\gamma^2/\omega_0^2$ 量级的比例。$\omega = 0$ 处速度为零，所以平均功率为零，尽管位移跟着力走。移除阻尼抬高峰值功率而不把它移离 $\omega_0$：峰变得更高，不是更靠右。
:::
:::

## 暂态与无阻尼下的精确共振

稳态是特解，通解是那个特解加上一般自由运动。只要 $b > 0$，自由运动就是衰减指数的线性组合——临界情形可乘以 $t$，欠阻尼情形可乘以 $\omega_1 t$ 的余弦，其中

$$
\omega_1 = \sqrt{\omega_0^2 - \gamma^2}
$$

（当 $\gamma < \omega_{0}$）。两个自由常数由 $x(0)$ 与 $\deriv{x}{t}(0)$ 确定，不由驱动确定。经过大约几个 $1/\gamma$ 之后，指数因子 $e^{-\gamma t}$ 已把自由部件压垮，运动与 [[#eq-steady]] 无法区分。在早期引用 $D$ 作为振幅，是另一种——而且通常是错的——描述。

::: example 共振处从静止开始 {#ex-transient}
[[#ex-standard]] 的振子在 $\omega = \omega_0 = 2.00\,\mathrm{rad/s}$ 下被驱动，并在 $x = 0$ 处从静止释放。求运动，并估计暂态何时衰减到初始大小的一百分之一。
::: solution
$\omega_0$ 处的稳态部件由 [[#ex-standard]] 是 $x_p = 1.25\sin(2.00\, t)$，其速度为 $2.50\cos(2.00\, t)$。自由运动是欠阻尼的：$\gamma = 0.200 < \omega_{0}$，且

$$
\omega_1 = \sqrt{4.00 - 0.0400} = \sqrt{3.96} = 1.990\,\mathrm{rad/s}.
$$

写 $x_h = e^{-0.200 t}(A\cos\omega_1 t + B\sin\omega_1 t)$。初始位移 $x_p(0) + x_h(0) = 0$ 给出 $A = 0$，因为 $x_p(0) = 0$。于是 $x_h = B e^{-0.200 t}\sin(\omega_1 t)$，且

$$
\deriv{x_h}{t}(0) = B\omega_1.
$$

初始速度为零，所以 $2.50 + B\omega_1 = 0$、$B = -2.50/\omega_1 = -1.256\,\mathrm{m}$。运动为

$$
x(t) = 1.25\sin(2.00\, t) - 1.256\, e^{-0.200 t}\sin(1.990\, t),
$$

以米计。系数 $1.256$ 恰好等于该振子的 $D_{\max}$，因为 $D(\omega_0)\,\omega_0/\omega_1 = F_0/(b\omega_1)$ 与 [[#eq-dmax]] 是同一个量。这个巧合只对原点处的静止释放成立；不同的初始状态给出不同的 $B$。

自由振幅按 $e^{-0.200 t}$ 衰减。它在 $0.200\, t = \ln 100$ 时降到 $t = 0$ 值的一百分之一，即 $t = \ln(100)/0.200 = 23.0\,\mathrm{s}$。相应的自由周期是 $2\pi/\omega_1 = 3.16\,\mathrm{s}$，而 $23.0/3.16 \approx 7.3$ 个自由周期。对这次释放来说，稳态描述的是几十秒之后的运动，不是第一个周期。仅稳态部件的初速度是 $2.50\,\mathrm{m/s}$；是暂态把它抵消了。
:::
:::

如果把阻尼器移走，齐次解就不再消亡。分两种子情形。失谐时，形如 [[#eq-steady]] 的有界特解仍然存在，通解是两个持续正弦之和。恰在共振上，那个特解不存在，振幅按 $t$ 成正比增长。

::: proposition 无阻尼振子的长期共振 {#prop-secular}
设 $b = 0$、$\omega = \omega_0$、$F_0 \ne 0$。则 [[#eq-driven]] 没有 $D$ 为常数的 [[#eq-steady]] 形式的解。一个特解是

$$
x_p(t) = \frac{F_0}{2m\omega_0}\, t\sin(\omega_0 t).
$$ {#eq-secular}

通解是 $x_p$ 加上任意自由振荡 $A\cos(\omega_0 t) + B\sin(\omega_0 t)$。$t\sin(\omega_0 t)$ 项无界。
:::

::: proof
[[#eq-amplitude]] 在 $b = 0$、$\omega = \omega_0$ 时分母为零，[[#thm-steady]] 的推导到此止步。对所要断言的特解，记 $A_s = F_0/(2m\omega_0)$、$x_p = A_s t\sin(\omega_0 t)$。求导两次得

$$
\begin{aligned}
\deriv{x_p}{t} &= A_s\sin(\omega_0 t) + A_s\omega_0 t\cos(\omega_0 t),\\
\deriv{^2 x_p}{t^2} &= 2A_s\omega_0\cos(\omega_0 t) - A_s\omega_0^2 t\sin(\omega_0 t).
\end{aligned}
$$

于是利用 $b = 0$ 与 $k = m\omega_0^2$，

$$
m\deriv{^2 x_p}{t^2} + kx_p = m\left[2A_s\omega_0\cos(\omega_0 t)\right] = F_0\cos(\omega_0 t),
$$

因为按 $A_s$ 的选取有 $2m A_s\omega_0 = F_0$。所以 $x_p$ 是特解。相伴齐次方程是无阻尼振子方程，其通解为 $A\cos(\omega_0 t) + B\sin(\omega_0 t)$。$x_p$ 中的因子 $t$ 无法被任何 $A$、$B$ 的选取抵消。运动无界。
:::

因子 $t\sin(\omega_0 t)$ 就是长期项（secular term）。它的包络 $(F_0/(2m\omega_0))\, t$ 无上限地增长，所以没有稳态的 $D$ 可引。$\omega_0$ 处的驱动若没有耗散，每个周期都沿速度补一推。任何正的 $b$，无论多小，最终都会在有限振幅 $F_0/(b\omega_0)$ 处平衡那一推。理想化 $b = 0$ 说的就是这个平衡永远不会到来。

失谐且仍无阻尼时，稳态公式存活，两个频率彼此打拍。

::: example 失谐的无阻尼驱动 {#ex-beats}
取 $m = 1.00\,\mathrm{kg}$、$k = 4.00\,\mathrm{N/m}$、$b = 0$、$F_0 = 1.00\,\mathrm{N}$，在 $\omega = 1.80\,\mathrm{rad/s}$ 下驱动，并在 $x = 0$ 处从静止释放。求运动及其达到的最大位移。
::: solution
这里 $\omega \ne \omega_0$，[[#thm-steady]] 仍然适用。$\gamma = 0$ 且 $\omega < \omega_0$ 时 $\delta = 0$，且

$$
D = \frac{F_0/m}{\omega_0^2 - \omega^2} = \frac{1}{4.00 - 3.24} = \frac{1}{0.760} = \frac{25}{19} = 1.316\,\mathrm{m}.
$$

通解为 $x = D\cos(\omega t) + A\cos(\omega_0 t) + B\sin(\omega_0 t)$。条件 $x(0) = 0$ 给出 $D + A = 0$。速度是 $-D\omega\sin(\omega t) - A\omega_0\sin(\omega_0 t) + B\omega_0\cos(\omega_0 t)$，所以 $\deriv{x}{t}(0) = B\omega_0 = 0$、$B = 0$。因此

$$
x(t) = D\left[\cos(1.80\, t) - \cos(2.00\, t)\right].
$$

余弦之差等于 $2\sin(1.90\, t)\sin(0.100\, t)$，于是

$$
x(t) = \frac{50}{19}\sin(1.90\, t)\sin(0.100\, t).
$$

因子 $\sin(0.100\, t)$ 是一个缓慢的包络。它的绝对值不超过 $1$，所以位移不超过 $50/19 = 2.632\,\mathrm{m}$，即特解振幅的两倍。包络在 $0.100\, t = n\pi$ 时回到零，相邻两个零点间隔 $10\pi = 31.42\,\mathrm{s}$。运动幅度大而有脉动，但是有界的。无界的情形是同样 $b = 0$ 下 $\omega = 2.00\,\mathrm{rad/s}$，那里 [[#eq-secular]] 取代这个公式。这种脉动本身——两个相近频率被听成一忽强一忽弱的单音——即拍，将在 [[oscillations/superposition]] 中针对声音重新讨论。
:::
:::

软的隔振架故意利用高频尾部。在 $\omega = 8.00\,\mathrm{rad/s}$——$\omega_0$ 的四倍——下驱动标准振子，$F_0 = 1.00\,\mathrm{N}$：

$$
D = \frac{1}{\sqrt{(4.00 - 64.00)^2 + (0.400\times 8.00)^2}} = \frac{1}{\sqrt{3610.24}} = 0.01664\,\mathrm{m}.
$$

相对静位移 $0.250\,\mathrm{m}$ 的因子是 $0.0666$，接近 $(\omega_0/\omega)^2 = 0.0625$。传到支架上的力的振幅为 $D\sqrt{k^2 + (b\omega)^2} = 0.0853\,\mathrm{N}$。弹簧份额 $kD = 0.0666\,\mathrm{N}$，阻尼器份额 $b\omega D = 0.0533\,\mathrm{N}$。高频下阻尼器传来的力与弹簧差不多，所以隔振要求 $\omega_0$ 远低于工作频率，而且不想要大的 $b$。重量 $mg$ 是平衡位置的静态平移，不属于 $F_0$。

## 后续内容

一根弦是一排耦合的振子：在一处驱动激发的是波——[[oscillations/travelling-waves]]——而不是单个 $D$。两个相近的驱动频率产生 [[#ex-beats]] 的脉动，它对波的展开在 [[oscillations/superposition]]。同一方程把 $x$ 换成电荷就是串联 LCR 电路，把系数对上号之后，振幅、相位与功率峰整套照搬。不能照搬的是结构的每一次大摆。风作用在柔性桥面上，可以通过一个依赖桥面自身速度的力输入能量，那是负阻尼，不是 [[#thm-amp]] 的那条曲线。这里的曲线回答的是 $b > 0$、暂态消失之后、给定的 $F_0\cos(\omega t)$。

::: warning 没有阻尼就没有稳态振幅，还有一个要看住的象限
暂态只在 $b > 0$ 时才消亡。$\omega = \omega_0$ 的驱动配上 $b = 0$ 产生长期项 [[#eq-secular]]，其包络按 $t$ 成正比增长。那种情形下不要引用稳态 $D$：[[#eq-amplitude]] 的分母为零，表达式不是一个数。非常小但为正的 $b$ 是另一回事：稳态振幅 $F_0/(b\omega_0)$ 很大但有限，而且要经过 $1/\gamma$ 量级的时间——可能很长——才能达到。

还有两个代换错得值得点名。$D$ 最大的频率是 $\omega_{\mathrm{amp}}$，不是 $\omega_0$，除非你已经核对过 $\gamma$ 小到让差别不可见。平均功率最大的频率是 $\omega_0$，不是 $\omega_{\mathrm{amp}}$。而计算器给出的 $\arctan(2\gamma\omega/(\omega_0^2 - \omega^2))$ 落在 $(-\pi/2,\pi/2)$。当 $\omega > \omega_0$ 时，[[#eq-steady]] 所用的相位滞后是该输出加上 $\pi$，一个 $(\pi/2,\pi)$ 内的角，不是负角。
:::

::: history 《声学理论》中的共振
瑞利勋爵（Lord Rayleigh，John William Strutt）于 1877 年发表《声学理论》（*The Theory of Sound*）。第一卷处理一个自由度的系统、周期驱动力、以及使共振峰保持有限的摩擦，然后转向弦、杆、膜与空气柱。[[#thm-steady]] 的振幅与相位就是那套声学论述的力学骨架。亥姆霍兹（Hermann von Helmholtz）早已在《论音的感觉》（*On the Sensations of Tone*，1863）中让共鸣腔为人熟知，瑞利把受驱阻尼稳态的数学组织在它们周围。
:::

::: summary
- 受驱方程是 $m x'' + b x' + k x = F_0\cos(\omega t)$。它的通解是自由阻尼运动加上一个稳态。自由部件消失当且仅当 $b > 0$。
- $b > 0$ 时稳态为 $x = D\cos(\omega t - \delta)$，$D$ 与 $\tan\delta$ 由 [[#eq-amplitude]] 与 [[#eq-phase]] 给出。滞后 $\delta$ 落在 $(0,\pi)$：$\omega_0$ 之下为锐角，$\omega_0$ 处为直角，$\omega_0$ 之上为钝角。
- 位移振幅在 $\gamma < \omega_0/\sqrt{2}$ 时于 $\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2}$ 处最大，否则在 $\omega = 0$ 处最大。$\omega_0$ 处 $D = F_0/(b\omega_0) = Q F_0/k$。
- 平均功率是 $\tfrac12 b\omega^2 D^2$。它在 $\omega = \omega_0$——速度与力同相之处——最大，最大值是 $F_0^2/(2b)$。半功率宽度恰为 $2\gamma = \omega_0/Q$。
- 轻阻尼把 $\omega_{\mathrm{amp}}$ 放在 $\omega_0$ 下方仅 $\gamma^2/\omega_0^2$ 量级的相对距离处。重阻尼（$Q \le 1/\sqrt{2}$）在非零频率处不产生峰。
- 若 $b = 0$ 且 $\omega = \omega_0$，振幅按 $(F_0/(2m\omega_0))\, t$ 增长，没有稳态 $D$。失谐且 $b = 0$ 时运动保持有界，是两个持续正弦之和。
- 计算器上的反正切在 $\omega > \omega_0$ 时不能把 $\delta$ 放进正确的象限。要加 $\pi$。
:::

## 习题

::: exercise 更硬弹簧的固有频率 {#exr-omega level=1 check="8"}
质量 $m = 0.500\,\mathrm{kg}$ 接在常量 $k = 32.0\,\mathrm{N/m}$ 的弹簧上。本题不需要阻尼或驱动。求固有角频率 $\omega_0$，以 $\mathrm{rad/s}$ 计。
::: solution
由 [[#def-driven]] 中使用的定义，

$$
\omega_0 = \sqrt{\frac{k}{m}} = \sqrt{\frac{32.0}{0.500}} = \sqrt{64.0} = 8.00\,\mathrm{rad/s}.
$$

角频率为 $8.00\,\mathrm{rad/s}$。相应的自由无阻尼运动周期是 $2\pi/8.00$，但题目没有问。
:::
:::

::: exercise 阻尼常数 {#exr-gamma level=1 check="0.2"}
质量 $m = 2.00\,\mathrm{kg}$ 受到线性阻力系数 $b = 0.800\,\mathrm{kg/s}$ 的阻尼。求 $\gamma = b/(2m)$，以 $\mathrm{s^{-1}}$ 计。
::: solution
[[#eq-driven-reduced]] 中的阻尼常数为

$$
\gamma = \frac{b}{2m} = \frac{0.800}{2\times 2.00} = \frac{0.800}{4.00} = 0.200\,\mathrm{s^{-1}}.
$$

值为 $0.200\,\mathrm{s^{-1}}$。它不是 $b/m$：那会大一倍，是一阶导数前的系数 $2\gamma$。
:::
:::

::: exercise 标准振子的品质因数 {#exr-q level=1 check="5"}
对 $m = 1.00\,\mathrm{kg}$、$b = 0.400\,\mathrm{kg/s}$、$k = 4.00\,\mathrm{N/m}$，求品质因数 $Q = \omega_0 m/b$。答案是一个纯数。
::: solution
先算 $\omega_0 = \sqrt{k/m} = \sqrt{4.00} = 2.00\,\mathrm{rad/s}$。于是

$$
Q = \frac{\omega_0 m}{b} = \frac{2.00\times 1.00}{0.400} = 5.00.
$$

由 [[#cor-natural]]，这也等于任意驱动振幅下的比值 $D(\omega_0)/(F_0/k)$。品质因数为 $5.00$。
:::
:::

::: exercise 振幅在何处取峰 {#exr-wamp level=2 check="sqrt(3.92)"}
对振子 $m = 1.00\,\mathrm{kg}$、$b = 0.400\,\mathrm{kg/s}$、$k = 4.00\,\mathrm{N/m}$，求振幅共振的角频率，以 $\mathrm{rad/s}$ 计。
::: hint
先核对 $\gamma < \omega_0/\sqrt{2}$，然后用 [[#eq-amp-res]]。
:::
::: solution
与 [[#ex-standard]] 相同，$\omega_0 = 2.00\,\mathrm{rad/s}$、$\gamma = 0.200\,\mathrm{s^{-1}}$。阈值为 $\omega_0/\sqrt{2} = 1.414\,\mathrm{s^{-1}}$，$0.200$ 在其下，所以存在非零峰。由 [[#thm-amp]] 得

$$
\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2} = \sqrt{4.00 - 2\times 0.0400} = \sqrt{3.92}\,\mathrm{rad/s}.
$$

数值上 $\sqrt{3.92} = 1.980\,\mathrm{rad/s}$，恰在 $\omega_0$ 下方。答案 $\sqrt{3.92}$ 对这些输入是精确的。
:::
:::

::: exercise 最大的平均功率 {#exr-pmax level=2 check="5/4"}
振幅为 $F_0 = 1.00\,\mathrm{N}$ 的驱动力作用在 $b = 0.400\,\mathrm{kg/s}$ 的阻尼振子上。通过选择驱动频率，求稳态中驱动所能交付的最大平均功率，以瓦特计。
::: solution
[[#prop-power]] 断言最大值在 $\omega = \omega_0$ 处且等于 $F_0^2/(2b)$，只要 $b > 0$ 且固有频率存在，对任何 $m$、$k$ 都成立。因此

$$
\langle P\rangle_{\max} = \frac{1.00^2}{2\times 0.400} = \frac{1}{0.800} = 1.25 = \frac{5}{4}\,\mathrm{W}.
$$

质量与弹簧常量没有出现在结果里。它们决定 $\omega_0$ 的位置，但功率峰的高度由速度振幅为 $F_0/b$ 时阻尼器能多卖力地耗散决定。最大的平均功率为 $5/4\,\mathrm{W}$。
:::
:::

::: exercise 共振之下的相位正切 {#exr-tan level=2 check="2/15"}
对 $m = 1.00\,\mathrm{kg}$、$b = 0.400\,\mathrm{kg/s}$、$k = 4.00\,\mathrm{N/m}$、驱动频率 $\omega = 1.00\,\mathrm{rad/s}$，求稳态滞后的 $\tan\delta$。答案是一个纯数。
::: solution
这里 $\omega_0^2 = 4.00$、$2\gamma = b/m = 0.400\,\mathrm{s^{-1}}$。由 [[#eq-phase]] 得

$$
\tan\delta = \frac{2\gamma\omega}{\omega_0^2 - \omega^2} = \frac{0.400\times 1.00}{4.00 - 1.00} = \frac{0.400}{3.00} = \frac{2}{15}.
$$

分母为正，所以 $\delta$ 本身是 $\arctan(2/15)$，约 $7.59^\circ$，不加 $\pi$。题目要的是正切 $2/15$。
:::
:::

::: exercise 上半功率频率 {#exr-half level=3 check="0.2+sqrt(4.04)"}
对 $m = 1.00\,\mathrm{kg}$、$b = 0.400\,\mathrm{kg/s}$、$k = 4.00\,\mathrm{N/m}$，稳态的平均功率在 $\omega_0$ 处最大。求两个驱动角频率中较高的那个——在该频率处平均功率已降到最大值的一半。答案以 $\mathrm{rad/s}$ 计。
::: hint
令 $(\omega_0^2 - \omega^2)^2 = (2\gamma\omega)^2$，保留位于 $\omega_0$ 之上的根。$\gamma = 0.200\,\mathrm{s^{-1}}$ 时较高的根是 $\gamma + \sqrt{\gamma^2 + \omega_0^2}$。
:::
::: solution
由 [[#ex-standard]]，$\omega_0 = 2.00\,\mathrm{rad/s}$、$\gamma = 0.200\,\mathrm{s^{-1}}$。[[#prop-power]] 把半功率点放在 $\omega_0^2 - \omega^2 = \pm 2\gamma\omega$ 处。右端取负号整理为

$$
\omega^2 - 2\gamma\omega - \omega_0^2 = 0.
$$

该二次方程的正根为

$$
\omega_+ = \gamma + \sqrt{\gamma^2 + \omega_0^2} = 0.200 + \sqrt{0.0400 + 4.00} = 0.200 + \sqrt{4.04}.
$$

数值上 $\sqrt{4.04} = 2.00998$，故 $\omega_+ = 2.210\,\mathrm{rad/s}$。低处的伙伴是 $-0.200 + \sqrt{4.04} = 1.810\,\mathrm{rad/s}$，间距为 $0.400\,\mathrm{rad/s} = 2\gamma$。题目所求的频率是 $0.200 + \sqrt{4.04}\,\mathrm{rad/s}$。
:::
:::

::: exercise 速度的正交相位 {#exr-velocity level=3}
证明：在 [[#eq-driven]] 的稳态中，$b > 0$、$\omega > 0$、$F_0 > 0$ 时，速度与 $F_0\cos(\omega t)$ 同相当且仅当 $\omega = \omega_0$。由此推出该频率处速度振幅为 $F_0/b$，以及在振幅共振频率 $\omega_{\mathrm{amp}}$ 处驱动时，除非 $\gamma = 0$，速度并不与力同相。
::: hint
把速度写成一个余弦，从 $\delta$ 上读出它的滞后，再用 [[#thm-steady]] 中关于象限的断言。
:::
::: solution
稳态位移为 $x = D\cos(\omega t - \delta)$，其中 $D > 0$、$\delta\in (0,\pi)$。求导得

$$
\deriv{x}{t} = -D\omega\sin(\omega t - \delta) = D\omega\cos(\omega t - \delta + \pi/2).
$$

这是振幅为 $D\omega$ 的余弦，落后 $F_0\cos(\omega t)$ 的角度为 $\delta - \pi/2$。滞后为零当且仅当 $\delta = \pi/2$。由 [[#thm-steady]]，$\delta = \pi/2$ 当且仅当 $\omega = \omega_0$，因为那是 $\cos\delta = 0$ 且 $\sin\delta > 0$ 的唯一正频率。该频率处 [[#cor-natural]] 给出 $D = F_0/(b\omega_0)$，所以速度振幅为

$$
D\omega_0 = \frac{F_0}{b}.
$$

现在设 $0 < \gamma < \omega_0/\sqrt{2}$，于是 $\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2}$ 为正实数。则 $\omega_{\mathrm{amp}} < \omega_0$，[[#thm-steady]] 把 $\delta$ 放在 $(0,\pi/2)$ 而不是 $\pi/2$。于是速度滞后 $\delta - \pi/2$ 为负：速度领先于力。等式 $\omega_{\mathrm{amp}} = \omega_0$ 要求 $\gamma = 0$，而那在受阻尼稳态的假设 $b > 0$ 之外。对任何正阻尼，振幅共振与速度共振是两个不同的频率。
:::
:::
