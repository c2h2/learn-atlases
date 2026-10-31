弹簧上的物块被拉开一段再释放，并不会慢慢爬回平衡位置然后停下。它以一定的速度经过未拉伸位置，几乎冲到另一侧同样远的地方，然后再回来。单摆的摆锤如此，一根细线上来回扭转的轮子也是如此。每一种情形中，系统离开稳定平衡越远，回复作用就越强，并且对小扰动而言，它与位移成正比。于是牛顿第二定律——如同 [[mechanics/newton-laws]] 中那样——迫使坐标满足

$$
\deriv{^2 x}{t^2} = -\omega^{2} x.
$$ {#eq-shm}

这个方程就是**简谐运动**。它的解是正弦型函数。常数 $\omega$ 由装置本身——刚度和惯性——决定，而与拉开了多远无关。因此周期与振幅无关，这就是摆钟能够计时、弹簧振子能够充当基准振荡器的原因。

恒定加速度的运动学公式在这里不适用。这里的加速度每次经过平衡位置就改变符号，其大小随 $\abs{x}$ 增大。取代那些公式的，是 [[#eq-shm]] 的通解，再加上 [[mechanics/work-energy]] 中的能量记账：动能与二次势能相互转换，而它们的和保持不变。本章凡涉及重力，一律取 $g = 9.80\,\mathrm{m/s^{2}}$。真实的振荡器每个周期都会损失一点能量；这一损失推迟到 [[oscillations/damping]] 讨论。这里回复力是保守的，阻力略去不谈。

## 简谐方程

::: definition 简谐运动 {#def-shm}
设 $\omega$ 为正常数。若二阶可导的坐标 $x(t)$ 在所考虑的每一时刻都满足

$$
\deriv{^2 x}{t^2} + \omega^{2} x = 0
$$

则称它做**简谐运动**，$\omega$ 为其**角频率**。**周期**为 $T = 2\pi/\omega$，**频率**为 $f = 1/T = \omega/(2\pi)$。频率数的是单位时间的周期数，角频率数的是单位时间相位的弧度数。两者相差因子 $2\pi$，把其中一个换成另一个得到的是另一种运动。
:::

这个方程是线性齐次的。若 $x_1$ 与 $x_2$ 是解，则 $c_1 x_1 + c_2 x_2$ 也是解。它还是自治的：右端不含 $t$ 的显式依赖，所以同样的实验晚一分钟开始，形状完全相同，只是整体平移了时间。常数 $\omega$ 的量纲是时间的倒数。在 SI 单位制中它以 $\mathrm{rad/s}$ 报告，其中弧度正是导出正弦与余数的微积分时所采用的无量纲角度度量。以赫兹计的频率是另一个数。

::: intuition 匀速圆周运动的影子
想象一个点沿半径为 $C$ 的圆周以恒定速率运动，角速度为 $\omega$。若圆心在原点，且该点从与 $x$ 轴成角 $-\varphi$ 处出发，其水平坐标就是 $x = C\cos(\omega t - \varphi)$。求导两次各带下一个 $-\omega^{2}$，所以这个影子满足 [[#eq-shm]]。相位 $\varphi$ 字面上就是那个圆上的一个角度。当点位于圆的最右端或最左端时，影子的速度为零，而那正是振荡坐标离原点最远的时刻。这幅图像并没有从某个力出发推导出方程；它解释了为什么解长成三角函数的样子，以及为什么振幅选定之后，相位平移是天然的第二个常数。
:::

期望出现两个常数。[[#eq-shm]] 是二阶方程，而导出它的牛顿第二定律是在位置已知时决定加速度，不是决定位置本身。某一时刻的位置和速度就是数据。下面这个引理说，这些数据至多挑出一个解；再往后的定理把这个解写出来。

::: lemma 零初始数据 {#lem-unique}
设 $x$ 满足 [[#eq-shm]] 且 $x(0) = 0$，$\deriv{x}{t}(0) = 0$。则对一切 $t$ 有 $x(t) = 0$。
:::

::: proof
定义非负量

$$
E_{*}(t) = \tfrac12 \left(\deriv{x}{t}\right)^{2} + \tfrac12 \omega^{2} x^{2}.
$$

用链式法则求导：

$$
\deriv{E_{*}}{t} = \deriv{x}{t}\,\deriv{^2 x}{t^2} + \omega^{2} x\,\deriv{x}{t} = \deriv{x}{t}\left(\deriv{^2 x}{t^2} + \omega^{2} x\right) = 0,
$$

最后一步用到的正是 [[#eq-shm]]。于是 $E_{*}$ 是常数。初始数据使 $E_{*}(0) = 0$，故对一切 $t$ 有 $E_{*}(t) = 0$。两项都非负，所以各自为零：$\deriv{x}{t} = 0$ 且 $x = 0$。
:::

同样的论证说明：两个在 $t = 0$ 有相同位置和相同速度的解是同一个解，因为它们的差具有零初始数据。

::: theorem 通解 {#thm-solution}
[[#eq-shm]] 的每个解都可以写成

$$
x(t) = A\cos(\omega t) + B\sin(\omega t),
$$ {#eq-general}

其中常数 $A = x(0)$、$B = \omega^{-1}\deriv{x}{t}(0)$。等价地，若 $C = \sqrt{A^{2} + B^{2}}$，则存在相位 $\varphi$ 使得

$$
x(t) = C\cos(\omega t - \varphi).
$$ {#eq-phase}

当 $C > 0$ 时，相位由 $\cos\varphi = A/C$ 与 $\sin\varphi = B/C$ 确定。当 $C = 0$ 时，运动就是静止解，$\varphi$ 任意。速度与加速度为

$$
\deriv{x}{t} = -C\omega\sin(\omega t - \varphi), \qquad \deriv{^2 x}{t^2} = -\omega^{2} x.
$$ {#eq-va}

特别地，对一切 $t$ 有 $\abs{x} \le C$，所以 $C$ 就是**振幅**：坐标到原点的最大距离。最大速率为 $C\omega$，在每次经过 $x = 0$ 时取得。
:::

::: proof
对 $A\cos(\omega t)$ 求导两次：一阶导数是 $-A\omega\sin(\omega t)$，二阶导数是 $-A\omega^{2}\cos(\omega t)$。对 $B\sin(\omega t)$ 做同样计算得 $-B\omega^{2}\sin(\omega t)$。每个函数都满足 [[#eq-shm]]，因此 [[#eq-general]] 的每个线性组合也满足。

余弦差角公式给出

$$
C\cos(\omega t - \varphi) = C\cos\varphi\,\cos(\omega t) + C\sin\varphi\,\sin(\omega t).
$$

取 $A = C\cos\varphi$、$B = C\sin\varphi$，就把 [[#eq-phase]] 放进了族 [[#eq-general]]。反过来，给定 $A$ 与 $B$，取 $C = \sqrt{A^{2} + B^{2}}$，只要 $C > 0$，关于 $\varphi$ 的那两个三角条件就可解，因为那两个数恰是单位圆上的一个点。所以两种形式描述同一个族。

现在设 $y$ 为任意解，取 $A = y(0)$、$B = \omega^{-1} y'(0)$。[[#eq-general]] 中的组合 $x$ 是一个解，而 $y - x$ 是一个在 $t = 0$ 处函数值为零、导数也为零的解。[[#lem-unique]] 迫使 $y - x = 0$。

对 [[#eq-phase]] 求导一次得 [[#eq-va]] 中的速度。再求导一次得 $-C\omega^{2}\cos(\omega t - \varphi)$，即 $-\omega^{2} x$。速率为 $C\omega\abs{\sin(\omega t - \varphi)}$，其最大值为 $C\omega$，且该最大值在余弦为零时取得，也就是 $x = 0$ 时。界 $\abs{x} \le C$ 就是余弦的界。
:::

常数在 $t = 0$ 读取，只是因为那一刻方便。数据给在另一时刻 $t_{1}$ 时，可以把钟拨一下来处理，或者求解由 [[#eq-general]] 及其导数在 $t_{1}$ 处加给 $(A, B)$ 的二元一次方程组——[[#lem-unique]] 说这个方程组有唯一解。

从静止释放意味着 $B = 0$，于是若 $A > 0$ 则 $\varphi = 0$ 且 $x(t) = A\cos(\omega t)$。从原点推一把是另一个极端：$A = 0$ 且 $x(t) = B\sin(\omega t)$，振幅为 $\abs{v(0)}/\omega$。经过一个周期，$\omega(t + T) = \omega t + 2\pi$，所以 $x$ 与 $v$ 都重复。正向转折点之后四分之一周期，速率最大且 $x = 0$。

::: example 读出振幅与相位 {#ex-read}
某坐标（以米计）为 $x(t) = 0.050\cos(8t) + 0.020\sin(8t)$，$t$ 以秒计。求 $\omega$、振幅、[[#eq-phase]] 中的一个相位 $\varphi$，以及最大速率。
::: solution
这个表达式已经是 [[#eq-general]] 的形式，其中 $\omega = 8\,\mathrm{rad/s}$、$A = 0.050\,\mathrm{m}$、$B = 0.020\,\mathrm{m}$。由 [[#thm-solution]] 得

$$
C = \sqrt{A^{2} + B^{2}} = \sqrt{0.050^{2} + 0.020^{2}} = \sqrt{0.00290} = 0.05385\,\mathrm{m}.
$$

$A$ 与 $B$ 都为正，所以 $\varphi$ 落在 $(0, \pi/2)$ 内，且

$$
\cos\varphi = \frac{A}{C} = 0.9283, \qquad \sin\varphi = \frac{B}{C} = 0.3714, \qquad \varphi = 0.3805\,\mathrm{rad} = 21.8^{\circ}.
$$

于是 $x(t) = 0.05385\cos(8t - 0.3805)$（以米计）。最大速率为

$$
C\omega = 0.05385 \times 8 = 0.4308\,\mathrm{m/s},
$$

按三位有效数字记作 $0.431\,\mathrm{m/s}$。它在每次 $x = 0$ 时取得，而不是在 $x$ 最大时取得。由同一个定理，在转折点处速率为零。
:::
:::

::: quiz
一质点按 [[#eq-phase]] 的形式振荡，振幅 $C > 0$。下列说法哪项正确？
- [ ] 在导出 [[#eq-shm]] 的线性律范围内把 $C$ 加倍，周期也加倍。
- [x] 在每一个位置加速度都等于 $-\omega^{2} x$，包括平衡位置，那里两边都为零。
- [ ] 符号 $\omega$ 与 $f$ 是同一个数的两个名字。
- [ ] 最大速率是 $C/\omega$，在转折点处取得。
::: solution
[[#thm-solution]] 给出加速度处处为 $-\omega^{2} x$，最大速率为 $x = 0$ 处的 $C\omega$。周期 $2\pi/\omega$ 不含 $C$。频率与角频率相差 $2\pi$：$f = \omega/(2\pi)$。
:::
:::

## 能量

运动学的解其实已经决定了每个位置处的速率，因为 $C$ 已固定，而 [[#eq-va]] 把 $v$ 与 $x$ 联系在一起。把两式平方再相加是看出这一点的最短路径，而这正是该系统的守恒律。

::: theorem 振子的能量 {#thm-energy}
设 $x$ 满足 [[#eq-shm]]，并设与该坐标相联系的常量质量为 $m > 0$，其含义是动能为 $\tfrac12 m v^{2}$，其中 $v = \deriv{x}{t}$。定义

$$
E = \tfrac12 m v^{2} + \tfrac12 m\omega^{2} x^{2}.
$$ {#eq-energy}

则 $E$ 是常数。用相位形式 [[#eq-phase]] 表示，其值为

$$
E = \tfrac12 m\omega^{2} C^{2}.
$$ {#eq-energy-c}

等价地，$E = \tfrac12 m\bigl(v(0)^{2} + \omega^{2} x(0)^{2}\bigr)$。
:::

::: proof
沿运动对 [[#eq-energy]] 求导：

$$
\deriv{E}{t} = m v\,\deriv{v}{t} + m\omega^{2} x\, v = m v\left(\deriv{^2 x}{t^2} + \omega^{2} x\right).
$$

方括号因 [[#eq-shm]] 而消失，所以 $\deriv{E}{t} = 0$，$E$ 是常数。这正是教学大纲要求的论证：所设能量对每个解的时间导数恒等于零，而不仅仅是很小。

为求出这个常数的值，代入 [[#eq-va]]：

$$
v^{2} + \omega^{2} x^{2} = C^{2}\omega^{2}\sin^{2}(\omega t - \varphi) + \omega^{2} C^{2}\cos^{2}(\omega t - \varphi) = C^{2}\omega^{2}.
$$

于是 $E = \tfrac12 m\omega^{2} C^{2}$。在 $t = 0$ 处对同一恒等式使用 $A = C\cos\varphi$ 与 $v(0) = C\omega\sin\varphi$，得 $A^{2} + B^{2} = C^{2}$，从而 $E = \tfrac12 m\bigl(v(0)^{2} + \omega^{2} x(0)^{2}\bigr)$。
:::

[[#eq-energy]] 中的第一项是动能，第二项只依赖位置。对弹簧而言，它就是 [[mechanics/work-energy]] 中的弹性势能。在转折点处 $v = 0$ 且 $\abs{x} = C$，所以 $E$ 全部在第二项里。在平衡位置 $x = 0$ 且 $\abs{v} = C\omega$，所以 $E$ 全部在动能里。走到一半，即 $\abs{x} = C/\sqrt{2}$ 处，两项相等。

求导那一步并没有假定存在弹簧。只要一个坐标满足 [[#eq-shm]]，且动能确实是 $\tfrac12 m \dot x^{2}$，[[#thm-energy]] 就适用。若坐标是角度，$\tfrac12 m\dot\theta^{2}$ 就不是动能，除非 $m$ 已经换成转动惯量。单摆一节对此很小心。两项各自在一个周期上的时间平均值都是 $E$ 的一半；那个计算是本讲末尾的一道习题。

## 弹簧振子

胡克定律提供了把 [[#eq-shm]] 变成对 $\omega$ 的预言的力。

::: proposition 固定弹簧上的物块 {#prop-spring}
质量为常量 $m$ 的质点沿无摩擦直线运动。刚度为 $k > 0$ 的弹簧施加力 $F = -kx$，其中 $x$ 从未拉伸位置量起。则运动是简谐的，且

$$
\omega = \sqrt{\frac{k}{m}}, \qquad T = 2\pi\sqrt{\frac{m}{k}}, \qquad f = \frac{1}{2\pi}\sqrt{\frac{k}{m}}.
$$ {#eq-spring}

能量 [[#eq-energy]] 就是机械能 $\tfrac12 mv^{2} + \tfrac12 kx^{2}$，且 $E = \tfrac12 k C^{2}$。
:::

::: proof
沿直线的牛顿第二定律是 $m\,\deriv{^2 x}{t^2} = -kx$。因 $m > 0$，

$$
\deriv{^2 x}{t^2} + \frac{k}{m}\, x = 0.
$$

这就是取 $\omega^{2} = k/m$ 的 [[#eq-shm]]。正平方根是 [[#def-shm]] 中的角频率，$T = 2\pi/\omega$ 给出周期。因为 $\omega^{2} = k/m$，[[#eq-energy]] 中的位置项是 $\tfrac12 m\omega^{2} x^{2} = \tfrac12 kx^{2}$，正是 [[mechanics/work-energy]] 中以未拉伸位置为零点固定的弹性势能。于是 [[#eq-energy-c]] 化为 $E = \tfrac12 m\omega^{2} C^{2} = \tfrac12 k C^{2}$。
:::

周期随质量的平方根增大、随刚度的平方根减小。在 $k$ 固定时把质量加倍，$T$ 乘以 $\sqrt{2}$ 而不是 $2$。把振幅加倍对 $T$ 毫无影响，只要弹簧仍在线性范围内。这个前提条件正是此处所用胡克定律的内容。被拉过头而屈服的弹簧，或者橡皮筋，不满足 $F = -kx$，[[#eq-spring]] 对它不适用。

刚度 $k$ 是弹簧的属性，单位是牛顿每米。比值 $k/m$ 是 $\omega^{2}$，单位是 $\mathrm{s^{-2}}$。实测周期往往是求 $k$ 的实用途径：由 [[#eq-spring]]，$k = m(2\pi/T)^{2}$。

::: example 从静止释放 {#ex-spring}
一弹簧 $k = 40\,\mathrm{N/m}$。附上质量 $m = 0.250\,\mathrm{kg}$，把物块从未拉伸位置移到 $x = 0.080\,\mathrm{m}$，然后在无摩擦的水平线上从静止释放。求 $\omega$、$T$、能量和最大速率，并写出 $x(t)$。
::: solution
由 [[#prop-spring]] 得

$$
\omega = \sqrt{\frac{40}{0.250}} = \sqrt{160} = 12.649\,\mathrm{rad/s},
$$

记作 $12.65\,\mathrm{rad/s}$。周期为

$$
T = \frac{2\pi}{\omega} = \frac{2\pi}{\sqrt{160}} = 0.4967\,\mathrm{s},
$$

记作 $0.497\,\mathrm{s}$。在正位移处从静止释放意味着 $A = 0.080\,\mathrm{m}$、$B = 0$、$C = 0.080\,\mathrm{m}$，所以

$$
x(t) = 0.080\cos(\omega t),
$$

以米计，$\omega$ 即刚算出的值。能量可以在释放时刻用弹性势能计算，那里动能为零：

$$
E = \tfrac12 k C^{2} = \tfrac12 \times 40 \times (0.080)^{2} = 20 \times 0.00640 = 0.128\,\mathrm{J}.
$$

[[#thm-energy]] 给出同样的数：$\tfrac12 m\omega^{2} C^{2} = \tfrac12 \times 0.250 \times 160 \times 0.00640 = 0.128\,\mathrm{J}$。最大速率为

$$
v_{\max} = C\omega = 0.080 \times \sqrt{160} = 1.0119\,\mathrm{m/s},
$$

记作 $1.012\,\mathrm{m/s}$。它发生在 $t = T/4 = 0.124\,\mathrm{s}$，此时 $x = 0$。

作为对初始加速度的核对，胡克定律给出 $F(0) = -kx(0) = -40 \times 0.080 = -3.20\,\mathrm{N}$，所以 $a(0) = F/m = -3.20/0.250 = -12.8\,\mathrm{m/s^{2}}$。简谐方程给出 $a(0) = -\omega^{2} x(0) = -160 \times 0.080 = -12.8\,\mathrm{m/s^{2}}$。两条途径一致，本来就该一致：第二条就是第一条除以 $m$。
:::
:::

::: widget oscillator
m: 0.25
c: 0
k: 40
F: 0
x0: 0.08
v0: 0
caption: 这些就是例题中弹簧的质量、刚度和初始数据。让 c 保持 0 并播放运动。c = 0 时运动不衰减：每个峰值都回到释放时的高度。调大 c 峰值下降，那是下一讲的内容。改 x0 改变振幅而不改变周期。
:::

该图积分的是 $m x'' + c x' + k x = 0$。把阻尼系数 $c$ 取为零，就是 [[#prop-spring]] 中的弹簧。$x$ 对 $t$ 的曲线正是刚写出的余弦；若把相图读成速率对位置，它就是 [[#eq-energy]] 在 $E = 0.128\,\mathrm{J}$ 时蕴含的椭圆。

恒定的附加力不改变 $\omega$。竖直弹簧上的重力是实验室里遇到的情形：物块悬挂着，弹簧在平衡位置已经拉伸，振动从这个悬挂位置量起，而不是从未拉伸长度量起。

::: proposition 平移后的平衡位置 {#prop-shift}
设力为 $F = -kx + F_{0}$，其中 $k > 0$、$F_{0}$ 为常数，质点质量 $m$ 恒定。令 $x_{\mathrm{eq}} = F_{0}/k$、$z = x - x_{\mathrm{eq}}$。则 $z$ 做简谐运动，$\omega = \sqrt{k/m}$，与不受该常力的弹簧角频率相同。
:::

::: proof
牛顿第二定律写作 $m\,\deriv{^2 x}{t^2} = -kx + F_{0}$。代入 $x = z + x_{\mathrm{eq}}$：

$$
m\,\deriv{^2 z}{t^2} = -k(z + x_{\mathrm{eq}}) + F_{0} = -kz - kx_{\mathrm{eq}} + F_{0}.
$$

常数项抵消，因为 $x_{\mathrm{eq}}$ 正是由 $kx_{\mathrm{eq}} = F_{0}$ 定义的。除以 $m$ 得 $z'' + (k/m) z = 0$。
:::

对竖直弹簧，取向下为正方向、从未拉伸位置量起，于是重力就是正常数 $F_{0} = mg$。平衡伸长量为 $\delta = mg/k$。围绕该悬挂位置的振动具有周期 [[#eq-spring]]。把 $x$ 从未拉伸位置量起、然后忘记平移原点，是让解里冒出一个多余常数的常见做法。$z$ 的通解仍是纯正弦；而未拉伸坐标 $x$ 的通解是那个正弦加上 $\delta$。

同一个平移还解释了为什么竖直悬挂的弹簧与平放在无摩擦桌面上的弹簧，只要 $k$ 与 $m$ 相同，就会同步摆动。重力只是移动了振荡的中心，并没有改变势阱的弯曲程度。明确地写，把 $y$ 取为从未拉伸位置向上，弹簧加重力的势能为 $\tfrac12 ky^{2} + mgy$ 加一个常数。配方：

$$
\tfrac12 ky^{2} + mgy = \tfrac12 k\left(y + \frac{mg}{k}\right)^{2} - \frac{(mg)^{2}}{2k},
$$

显示一个刚度相同的势阱，中心在悬挂位置 $y = -mg/k$。[[mechanics/work-energy]] 已经保证总机械能守恒，[[#thm-energy]] 只是把它的值算出来。

::: example 既有位移又有初速度 {#ex-shove}
[[#ex-spring]] 中的弹簧与物块仍从 $x(0) = 0.080\,\mathrm{m}$ 出发，但这次带有正向初速度 $v(0) = 0.500\,\mathrm{m/s}$。求能量、振幅以及 [[#eq-phase]] 中的一个相位。
::: solution
角频率不变，因为 [[#prop-spring]] 不过问初始数据：$\omega = \sqrt{160} = 12.649\,\mathrm{rad/s}$。能量是 $t = 0$ 处两部分贡献之和：

$$
E = \tfrac12 mv(0)^{2} + \tfrac12 kx(0)^{2} = \tfrac12(0.250)(0.500)^{2} + \tfrac12(40)(0.080)^{2}.
$$

动能部分是 $0.03125\,\mathrm{J}$，势能部分是 [[#ex-spring]] 里的 $0.128\,\mathrm{J}$，所以 $E = 0.15925\,\mathrm{J}$，按三位有效数字为 $0.159\,\mathrm{J}$。于是 [[#eq-energy-c]] 不必再积分一次就直接定出振幅：

$$
C = \sqrt{\frac{2E}{m\omega^{2}}} = \sqrt{\frac{2E}{k}} = \sqrt{\frac{0.3185}{40}} = \sqrt{0.0079625} = 0.08923\,\mathrm{m}.
$$

由 [[#thm-solution]]，$A = x(0) = 0.080\,\mathrm{m}$、$B = v(0)/\omega = 0.500/\sqrt{160} = 0.03953\,\mathrm{m}$。两者重建 $C = \sqrt{A^{2} + B^{2}} = 0.08923\,\mathrm{m}$。两者皆正，所以

$$
\varphi = \arctan\left(\frac{B}{A}\right) = \arctan(0.4941) = 0.4589\,\mathrm{rad} = 26.3^{\circ},
$$

且 $x(t) = 0.08923\cos(\omega t - 0.4589)$。最大速率为 $C\omega = 1.129\,\mathrm{m/s}$，比 [[#ex-spring]] 中大，因为那一推注入了能量。周期仍是 $0.497\,\mathrm{s}$。
:::
:::

## 单摆

单摆是挂在轻杆或轻而不可伸长的细线上的质点 $m$，线长 $L$，在竖直平面内绕固定支点摆动。坐标是偏离竖直向下的角度 $\theta$，在选定的方向上为正，以弧度度量。摆锤受的力是重力和张力（或沿杆的力）。张力沿径向，它改变速度的方向而不做功，而切向方程中不含它。

从最低点起的弧长为 $s = L\theta$，所以切向加速度为 $L\,\deriv{^2\theta}{t^2}$。重力的切向分量为 $-mg\sin\theta$：$\theta$ 为正时摆锤偏向一侧，重力把它拉回 $\theta = 0$。沿切线的牛顿第二定律因此是

$$
m L\,\deriv{^2\theta}{t^2} = -mg\sin\theta,
$$

约去 $m$（只要细线保持张紧，质量就不出现在运动中）后得

$$
\deriv{^2\theta}{t^2} + \frac{g}{L}\sin\theta = 0.
$$ {#eq-pendulum-exact}

在刚才陈述的理想化之内这是精确的，但它不是 [[#eq-shm]]。回复加速度与 $\sin\theta$ 成正比，而不是与 $\theta$ 成正比。

::: proposition 单摆的小角振动 {#prop-pendulum}
假定 [[#eq-pendulum-exact]]，并假定 $\theta$（以弧度计）足够小，以至于用 $\theta$ 替换 $\sin\theta$ 满足所需的精度。则 $\theta$ 做简谐运动，且

$$
\omega = \sqrt{\frac{g}{L}}, \qquad T = 2\pi\sqrt{\frac{L}{g}}.
$$ {#eq-pendulum}
:::

::: proof
$\sin\theta$ 在 $\theta = 0$ 处的泰勒展开（$\theta$ 以弧度计）为 $\sin\theta = \theta - \theta^{3}/6 + \cdots$。假设略去了第一项之后的所有项，于是 [[#eq-pendulum-exact]] 塌缩为 $\theta'' + (g/L)\theta = 0$。把 [[#def-shm]] 与 [[#thm-solution]] 用于坐标 $\theta$，即得所述的 $\omega$ 与 $T$。
:::

这个假设是关于角度的，而且需要弧度：$\sin 10^{\circ} \approx 0.174$ 并不接近数 $10$。即便在弧度制下，三次项也随振幅增长。回复加速度中被略去的第一项的相对大小约为 $\theta^{2}/6$，在 $10^{\circ}$ 处约 $0.005$，在 $30^{\circ}$ 处约 $0.046$。周期是整条轨道的性质，所以它不会按同样的百分比移动。[[#eq-pendulum-exact]] 在振幅 $\theta_{m}$ 下的精确周期是一个椭圆积分：

$$
T = 4\sqrt{\frac{L}{g}}\int_{0}^{\pi/2}\frac{\dd\varphi}{\sqrt{1 - \sin^{2}(\theta_{m}/2)\,\sin^{2}\varphi}}.
$$

对中等振幅，它的展开以

$$
\frac{T}{T_{0}} = 1 + \tfrac14\sin^{2}\!\left(\frac{\theta_{m}}{2}\right) + \tfrac{9}{64}\sin^{4}\!\left(\frac{\theta_{m}}{2}\right) + \cdots,
$$

开头，其中 $T_{0} = 2\pi\sqrt{L/g}$ 即 [[#eq-pendulum]]。在 $\theta_{m} = 30^{\circ}$ 处，$\sin 15^{\circ} = 0.2588$，$\sin^{2} 15^{\circ} = 0.06699$。第一修正为 $\tfrac14 \times 0.06699 = 0.01675$，第二项为 $\tfrac{9}{64}\times(0.06699)^{2} = 0.00063$。两者相加得 $T/T_{0} = 1.0174$。周期比小角公式长 $1.74\%$。这个数字来自级数，不是猜测。在 $10^{\circ}$ 处，第一修正不到千分之二。

::: warning 小角度，以及弧度
[[#eq-pendulum]] 是小角周期，它不是关于任意摆幅的定理。振幅为 $30^{\circ}$ 时，[[#eq-pendulum-exact]] 的周期比 $T_{0}$ 长；刚才算出的椭圆展开把差值定为 $1.74\%$。不借助那个积分或它的级数而引用别的百分比，不算是计算。另外，$\sin\theta \approx \theta$ 是一条关于弧度的命题。以度数输入的角度，在与它的正弦比较之前、在把它当作坐标代进 [[#eq-shm]] 之前，都必须先换算。
:::

能量核对使用弧长速度。由 $v = L\,\deriv{\theta}{t}$，动能为 $\tfrac12 m L^{2}\dot\theta^{2}$。重力势能取最低点为零，为 $mgL(1 - \cos\theta)$。$\theta$ 很小时 $1 - \cos\theta \approx \theta^{2}/2$，所以

$$
E \approx \tfrac12 m L^{2}\dot\theta^{2} + \tfrac12 m g L\,\theta^{2} = \tfrac12 m \dot s^{2} + \tfrac12 m\omega^{2} s^{2},
$$

其中 $s = L\theta$、$\omega^{2} = g/L$。这就是弧坐标的 [[#eq-energy]]。质量在运动中约掉了，在能量中却没有：更重的摆锤在同一角度储存更多势能，同时也有更多惯性，比例恰好使 $\omega$ 保持不变。

::: example 一米长的单摆 {#ex-pendulum}
单摆长 $L = 1.00\,\mathrm{m}$。估计小角周期与角频率。若振幅为 $5.00^{\circ}$，估计摆锤的最大速率。
::: solution
[[#eq-pendulum]] 取 $g = 9.80\,\mathrm{m/s^{2}}$ 给出

$$
T = 2\pi\sqrt{\frac{1.00}{9.80}} = 2\pi\sqrt{0.10204} = 2.007\,\mathrm{s},
$$

且 $\omega = \sqrt{g/L} = \sqrt{9.80} = 3.130\,\mathrm{rad/s}$。五度是 $5\pi/180 = 0.08727\,\mathrm{rad}$。在该振幅下，上面级数的第一修正为 $\tfrac14\sin^{2}(2.5^{\circ}) \approx 0.0005$，小角周期绰绰有余。简谐近似下的最大角速度是 $\omega\theta_{m}$，摆锤最大速率为

$$
v_{\max} = L\omega\theta_{m} = 1.00 \times \sqrt{9.80} \times 0.08727 = 0.273\,\mathrm{m/s}.
$$

不用小角替换势能的精确能量途径给出 $v = \sqrt{2gL(1 - \cos\theta_{m})} = 0.273\,\mathrm{m/s}$，在这一振幅下两者三位数字一致。在 $30^{\circ}$ 处它们就会分开。
:::
:::

测得的周期可以反解 $g$ 或 $L$。由 [[#eq-pendulum]]，$g = 4\pi^{2} L/T^{2}$。给长摆计时在历史上是一种实用的 $g$ 测量，今天仍是不错的实验题，只要振幅确实很小，且摆长量到摆锤中心而不是绳结。摆锤的质量不掺和。

::: application 秒摆
周期为两秒、单程一秒的单摆称为**秒摆**。[[#eq-pendulum]] 给出它的长度 $L = g T^{2}/(4\pi^{2}) = g/\pi^{2}$。取 $g = 9.80\,\mathrm{m/s^{2}}$，该长度为 $0.993\,\mathrm{m}$。用这样的摆校准的钟，是把 [[#prop-pendulum]] 当作数等长时间间隔的机器在用。校准的可靠性不超过小角假设，也不超过 $L$ 与 $g$ 的恒定程度。
:::

## 物理摆

真实的摆是刚体，不是线上的质点。刚体绕固定的水平轴摆动。设 $I$ 为它对该轴的转动惯量，$m$ 为质量，$d$ 为轴到质心的距离。角度 $\theta$ 仍从悬挂平衡位置量起——那一位置中质心恰在支点正下方距离 $d$ 处——并以弧度计。

::: theorem 物理摆 {#thm-physical}
在小角假设 $\sin\theta \approx \theta$（$\theta$ 以弧度计）下，刚体的摆动满足

$$
T = 2\pi\sqrt{\frac{I}{mgd}}, \qquad \omega = \sqrt{\frac{mgd}{I}}.
$$ {#eq-physical}

等价单摆的长度为 $\ell = I/(md)$：挂在这根线长上的质点具有相同的小角周期。
:::

::: proof
重力 $mg$ 作用在质心。它对支点的力矩为 $-mgd\sin\theta$，负号是因为正的 $\theta$ 产生回复力矩。由 [[mechanics/rotation]]，绕固定轴的转动方程为 $I\,\deriv{^2\theta}{t^2} = -mgd\sin\theta$，于是

$$
\deriv{^2\theta}{t^2} + \frac{mgd}{I}\sin\theta = 0.
$$

小角假设把 $\sin\theta$ 换成 $\theta$，得到 [[#eq-shm]]，其中 $\omega^{2} = mgd/I$。周期 $2\pi/\omega$ 即 [[#eq-physical]]。与 [[#eq-pendulum]] 比较可知，长 $\ell = I/(md)$ 的单摆有相同的 $\omega$，因为 $g/\ell = mgd/I$。
:::

单摆是 $I = mL^{2}$、$d = L$ 的特例，此时 $\ell = L$。把质量摊开会以不同方式改变 $I$ 与 $d$，于是周期改变。已知对质心的转动惯量时，求 $I$ 的常用工具是 [[mechanics/rotation]] 中的平行轴定理。对均匀细棒，那个积分短得可以当场算完。

::: corollary 均匀杆绕一端摆动 {#cor-rod}
质量为 $M$、长为 $L$ 的均匀细棒在竖直平面内绕通过一端且垂直于棒的固定轴摆动。小角下有

$$
T = 2\pi\sqrt{\frac{2L}{3g}}.
$$ {#eq-rod}

等价长度为 $2L/3$。
:::

::: proof
把棒放在 $0 \le r \le L$ 上，支点在 $r = 0$。线密度为 $\lambda = M/L$，对支点的转动惯量为

$$
I = \int_{0}^{L} r^{2}\,\lambda\,\dd r = \lambda\frac{L^{3}}{3} = \frac{ML^{2}}{3}.
$$

均匀棒的质心在中点，所以 $d = L/2$。[[#eq-physical]] 给出

$$
T = 2\pi\sqrt{\frac{ML^{2}/3}{Mg\cdot L/2}} = 2\pi\sqrt{\frac{L^{2}}{3}\cdot\frac{2}{gL}} = 2\pi\sqrt{\frac{2L}{3g}}.
$$

质量约掉了。等价长度为 $I/(Md) = (L^{2}/3)/(L/2) = 2L/3$。
:::

因此长为 $L$ 的棒比长为 $L$ 的单摆摆得快，因子为 $\sqrt{2/3} \approx 0.816$；又比长为 $L/2$ 的单摆摆得慢。等价长度 $2L/3$ 恰在这两者之间。

::: example 等长的杆与单摆 {#ex-rod}
把长为 $L = 1.00\,\mathrm{m}$、绕一端支起的均匀杆与 [[#ex-pendulum]] 的单摆作比较。
::: solution
[[#eq-rod]] 给出

$$
T_{\mathrm{rod}} = 2\pi\sqrt{\frac{2\times 1.00}{3\times 9.80}} = 2\pi\sqrt{\frac{2}{29.4}} = 2\pi\sqrt{0.068027} = 1.639\,\mathrm{s}.
$$

等长单摆的周期是 $2.007\,\mathrm{s}$。比值为 $1.639/2.007 = 0.8166$，与 $\sqrt{2/3} = 0.8165$ 相符。等价长度为 $2L/3 = 0.667\,\mathrm{m}$。该长度的单摆周期为

$$
T = 2\pi\sqrt{\frac{0.6667}{9.80}} = 1.639\,\mathrm{s},
$$

这正是上面关于等价单摆那句话的检验。杆的质量从头到尾没有用到。悬挂平衡要求质心在支点下方；若把杆支在中点，则 $d = 0$，不存在一阶回复力矩。
:::
:::

## 扭摆

单摆借助重力。扭转的细线不借助。若刚体悬挂在细线上或安装在转轴上，且回复力矩与扭转角成正比，那么运动的谐性有一个从头到尾不提到 $g$ 的理由。

::: proposition 扭摆 {#prop-torsion}
设刚体对固定轴的转动惯量为 $I$，且该轴上唯一的力矩为 $\tau = -\kappa\theta$，其中扭转系数 $\kappa > 0$、$\theta$ 以弧度计。则

$$
\omega = \sqrt{\frac{\kappa}{I}}, \qquad T = 2\pi\sqrt{\frac{I}{\kappa}}.
$$ {#eq-torsion}

在这一线性律内，周期不依赖振幅，也不依赖 $g$。
:::

::: proof
转动方程为 $I\,\deriv{^2\theta}{t^2} = -\kappa\theta$，即 $\theta'' + (\kappa/I)\theta = 0$。这是取 $\omega^{2} = \kappa/I$ 的 [[#eq-shm]]，周期为 $2\pi/\omega$。力矩的假设里没有出现重力，所以它也不出现在 $\omega$ 里。
:::

定律 $\tau = -\kappa\theta$ 是胡克定律的角量版本，细线屈服时它失效。储存的能量为 $\tfrac12\kappa\theta^{2}$，动能为 $\tfrac12 I\dot\theta^{2}$，所以 [[#thm-energy]] 适用，只需把 $m$ 换成 $I$。扭摆在自由落体中照样振荡。单摆不行：没有视重，回复力矩就消失了。

::: example 悬于细线上的圆盘 {#ex-torsion}
一物体对轴的 $I = 2.00\times 10^{-3}\,\mathrm{kg\,m^{2}}$，悬挂在 $\kappa = 5.00\times 10^{-2}\,\mathrm{N\,m/rad}$ 的细线上。求周期。若在 $\theta = 0.200\,\mathrm{rad}$ 处从静止释放，求能量与最大角速度。
::: solution
[[#eq-torsion]] 给出 $\omega = \sqrt{\kappa/I} = \sqrt{0.0500/0.00200} = \sqrt{25.0} = 5.00\,\mathrm{rad/s}$，且

$$
T = \frac{2\pi}{5.00} = 1.257\,\mathrm{s},
$$

四舍五入为 $1.26\,\mathrm{s}$。从静止释放意味着角振幅为 $0.200\,\mathrm{rad}$。释放时能量全部是势能：

$$
E = \tfrac12\kappa C^{2} = \tfrac12\times 0.0500\times(0.200)^{2} = 0.00100\,\mathrm{J}.
$$

最大角速度为 $C\omega = 0.200\times 5.00 = 1.00\,\mathrm{rad/s}$。作为核对，在未扭转位置势能消失，$\tfrac12 I\omega_{\mathrm{ang}}^{2} = \tfrac12\times 2.00\times 10^{-3}\times 1.00 = 0.00100\,\mathrm{J}$。两种储存恰好相符。
:::
:::

四个公式列在同一张表里。每一行都是某个具名坐标满足 [[#eq-shm]] 的运动，且在所假设的线性律内周期与振幅无关。

| 系统 | 坐标 | $\omega^{2}$ | 周期 |
|---|---|---|---|
| 弹簧 | 位移 $x$ | $k/m$ | $2\pi\sqrt{m/k}$ |
| 单摆，小角 | 角 $\theta$ | $g/L$ | $2\pi\sqrt{L/g}$ |
| 物理摆，小角 | 角 $\theta$ | $mgd/I$ | $2\pi\sqrt{I/(mgd)}$ |
| 扭摆 | 角 $\theta$ | $\kappa/I$ | $2\pi\sqrt{I/\kappa}$ |

::: history 摆、摆线与胡克定律
1602 年 11 月，伽利略（Galileo）写信给 Guidobaldo del Monte，说摆在大摆幅与小摆幅下来回一次所用时间相同。这封信是该说法现存最早的陈述。对小摆幅它近乎正确，那正是 [[#prop-pendulum]]；对任意摆幅它并不精确，那正是上面的椭圆积分。伽利略没有小角方程，他有的只是一个细致的观察和一个过头的结论。

惠更斯（Huygens）在《摆钟论》（*Horologium oscillatorium*，1673）中把两件事分开。他证明一个被约束在摆线上的质点，其摆动时间与振幅无关，并且设计了摆钟的悬挂装置使摆锤沿摆线运动。他还得到了普通圆弧摆的小弧周期，即公式 [[#eq-pendulum]]，并由此得到秒摆的长度。摆线修正正是圆弧摆所缺的东西：在一切振幅下的等时性，而不只是极限 $\theta \to 0$ 中的。

胡克（Hooke）在 1678 年发表了弹簧的线性定律（*De potentia restitutiva*）：伸长与载荷成正比。更早他曾以字谜 *ut tensio, sic vis* 宣告过这一想法。那个正比关系正是 [[#prop-spring]] 的力的假设。正弦式的运动不是额外的实验断言，它是牛顿第二定律作用在胡克之力上的结果。
:::

## 后续内容

表中每个系统都是只有保守回复作用、没有阻力的理想化。阻尼器、按在摆上的手、摆锤周围的空气都会带走能量。方程多出一个速度项，运动不再是严格周期的，而三种形态——衰减的振荡、临界的一次返回、缓慢的爬回——是 [[oscillations/damping]] 的主题。再对同一系统施加周期驱动，稳态响应就尖锐地依赖于驱动频率离 $\omega$ 有多近。那是共振，放在阻尼之后讲，因为稳态是自由运动消失之后剩下的东西。

把许多这样的振子与近邻耦合起来，同样的局域方程就让扰动得以传播，这是波几讲的起点。[[#thm-energy]] 中的能量那时在介质中移动，而不是留在一个物块上。

::: summary
- 简谐运动就是方程 $x'' = -\omega^{2} x$。通解为 $x = A\cos(\omega t) + B\sin(\omega t) = C\cos(\omega t - \varphi)$，其中 $C = \sqrt{A^{2} + B^{2}}$。
- 速度是 $-C\omega\sin(\omega t - \varphi)$，加速度在每一时刻都是 $-\omega^{2} x$。最大速率为 $C\omega$，在 $x = 0$ 处。
- 量 $E = \tfrac12 mv^{2} + \tfrac12 m\omega^{2} x^{2}$ 守恒且等于 $\tfrac12 m\omega^{2} C^{2}$。它的时间导数为零，因为 $x'' + \omega^{2} x = 0$。
- 弹簧给出 $\omega = \sqrt{k/m}$、$T = 2\pi\sqrt{m/k}$。恒定的附加力——例如竖直弹簧上的重力——平移平衡位置而保持 $\omega$ 不变。
- 单摆满足 $\theta'' + (g/L)\sin\theta = 0$。只有小角替换 $\sin\theta \approx \theta$（弧度制）才给出 $T = 2\pi\sqrt{L/g}$。$30^{\circ}$ 时真实周期长 $1.74\%$。
- 物理摆有 $T = 2\pi\sqrt{I/(mgd)}$。均匀杆绕一端有 $I = ML^{2}/3$、$d = L/2$、$T = 2\pi\sqrt{2L/(3g)}$。
- 力矩为 $-\kappa\theta$ 的扭摆有 $T = 2\pi\sqrt{I/\kappa}$，与 $g$ 无关。一切线性情形中周期都与振幅无关。
:::

## 习题

::: exercise 更硬弹簧的周期 {#exr-spring-period level=1 check="2*pi*sqrt(0.4/100)"}
质量 $m = 0.400\,\mathrm{kg}$ 接在刚度 $k = 100\,\mathrm{N/m}$ 的弹簧上，沿无摩擦水平线运动。求振动周期。
::: solution
[[#eq-spring]] 不依赖振幅。代入给定的质量与刚度：

$$
T = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{0.400}{100}} = 2\pi\sqrt{0.00400} = 0.397\,\mathrm{s}.
$$

角频率为 $\omega = \sqrt{k/m} = \sqrt{250} = 15.8\,\mathrm{rad/s}$，$T = 2\pi/\omega$ 恢复同一周期。在该质量下把 $k$ 加倍会把 $T$ 除以 $\sqrt{2}$，而不是 $2$。
:::
:::

::: exercise 一个短摆 {#exr-short-pendulum level=1 check="2*pi*sqrt(0.25/9.80)"}
单摆长 $L = 0.250\,\mathrm{m}$。求小角振动周期。取 $g = 9.80\,\mathrm{m/s^{2}}$。
::: solution
[[#eq-pendulum]] 给出

$$
T = 2\pi\sqrt{\frac{L}{g}} = 2\pi\sqrt{\frac{0.250}{9.80}} = 2\pi\sqrt{0.02551} = 1.004\,\mathrm{s}.
$$

公式里没有摆锤质量。这个结果只是小角周期：大摆幅的摆动更长，[[#prop-pendulum]] 下面的警告记录了这一点。
:::
:::

::: exercise 由相位形式读最大速率 {#exr-vmax level=1 check="0.5"}
质点的坐标（以米计）为 $x(t) = 0.050\cos(10 t)$，$t$ 以秒计。求最大速率。
::: solution
这是 [[#eq-phase]] 的形式，$C = 0.050\,\mathrm{m}$、$\omega = 10\,\mathrm{rad/s}$、$\varphi = 0$。由 [[#thm-solution]]，最大速率为

$$
C\omega = 0.050 \times 10 = 0.50\,\mathrm{m/s},
$$

在每个 $x = 0$ 的瞬时取得。最大加速度为 $\omega^{2} C = 5.0\,\mathrm{m/s^{2}}$，在转折点处取得，那里速率为零。周期 $2\pi/10$ 对求速率并不需要。
:::
:::

::: exercise 一推之后的能量 {#exr-shove-energy level=2 check="0.5*0.25*0.5^2+0.5*40*0.08^2"}
[[#ex-spring]] 的弹簧 $k = 40\,\mathrm{N/m}$、$m = 0.250\,\mathrm{kg}$。$t = 0$ 时物块在 $x = 0.080\,\mathrm{m}$，速度 $v = 0.500\,\mathrm{m/s}$。求总能量，以焦耳计。
::: solution
用 [[#thm-energy]]，或 [[#prop-spring]] 的弹簧形式 $\tfrac12 mv^{2} + \tfrac12 kx^{2}$。初始时刻两部分为

$$
\tfrac12(0.250)(0.500)^{2} = 0.03125\,\mathrm{J}, \qquad \tfrac12(40)(0.080)^{2} = 0.128\,\mathrm{J}.
$$

两者相加 $E = 0.15925\,\mathrm{J}$。一旦按 [[#ex-shove]] 求出振幅 $C = 0.08923\,\mathrm{m}$，同一数值就是 $\tfrac12 k C^{2}$。周期不进入能量。
:::
:::

::: exercise 四分之三米长的杆 {#exr-rod-length level=2 check="2*pi*sqrt(2*0.9/(3*9.80))"}
均匀细棒长 $L = 0.900\,\mathrm{m}$，绕通过一端且垂直于棒的固定轴摆动。求小角振动周期。取 $g = 9.80\,\mathrm{m/s^{2}}$。
::: solution
[[#cor-rod]] 直接适用，不需要质量。

$$
T = 2\pi\sqrt{\frac{2L}{3g}} = 2\pi\sqrt{\frac{2\times 0.900}{3\times 9.80}} = 2\pi\sqrt{\frac{1.80}{29.4}} = 2\pi\sqrt{0.061224} = 1.555\,\mathrm{s}.
$$

等价单摆长度为 $2L/3 = 0.600\,\mathrm{m}$，而 $2\pi\sqrt{0.600/9.80}$ 返回同样的 $1.555\,\mathrm{s}$。长 $0.900\,\mathrm{m}$ 的单摆会更慢：$2\pi\sqrt{0.900/9.80} = 1.905\,\mathrm{s}$。
:::
:::

::: exercise 秒摆的长度 {#exr-seconds level=2 check="9.80/pi^2"}
求小角周期为 $T = 2.00\,\mathrm{s}$ 的单摆的长度，以米计。取 $g = 9.80\,\mathrm{m/s^{2}}$。
::: solution
由 [[#eq-pendulum]] 反解长度：

$$
T = 2\pi\sqrt{\frac{L}{g}} \implies L = g\left(\frac{T}{2\pi}\right)^{2} = \frac{g T^{2}}{4\pi^{2}}.
$$

$T = 2.00\,\mathrm{s}$ 时因子 $T^{2}/4$ 等于 $1$，所以 $L = g/\pi^{2} = 9.80/\pi^{2} = 0.993\,\mathrm{m}$。这就是上面讨论过的秒摆。这个长度只在小角下成立：大角度摆动的钟，并不由这个 $L$ 配合这个周期来描述。
:::
:::

::: exercise 相等的平均动能与势能 {#exr-averages level=3}
对 $x(t) = C\cos(\omega t - \varphi)$，其中 $C$、$\omega$、$\varphi$ 为常数，设 $K = \tfrac12 m v^{2}$、$U = \tfrac12 m\omega^{2} x^{2}$。证明：$K$ 在任何长度 $T = 2\pi/\omega$ 的区间上的平均值等于 $U$ 的平均值，且两个平均值都等于总能量 $E = \tfrac12 m\omega^{2} C^{2}$ 的一半。
::: hint
用 [[#eq-va]] 写出 $v$。$\sin^{2}$ 在其整数个周期上的平均值等于 $\cos^{2}$ 的平均值，而这两个平均值之和为 $1$。
:::
::: solution
[[#eq-va]] 给出 $v = -C\omega\sin(\omega t - \varphi)$。于是

$$
K = \tfrac12 m C^{2}\omega^{2}\sin^{2}(\omega t - \varphi), \qquad U = \tfrac12 m\omega^{2} C^{2}\cos^{2}(\omega t - \varphi).
$$

令 $\psi = \omega t - \varphi$。$t$ 走过长度 $T$ 的区间时，相位 $\psi$ 走过长度 $2\pi$ 的区间。对任何这样的区间，

$$
\frac{1}{2\pi}\int_{0}^{2\pi}\sin^{2}\psi\,\dd\psi = \frac{1}{2\pi}\int_{0}^{2\pi}\frac{1 - \cos 2\psi}{2}\,\dd\psi = \tfrac12,
$$

用 $\cos^{2}\psi = (1 + \cos 2\psi)/2$ 做同样计算也得 $\tfrac12$。因此

$$
\langle K\rangle = \tfrac12 m C^{2}\omega^{2}\cdot\tfrac12 = \tfrac14 m\omega^{2} C^{2}, \qquad \langle U\rangle = \tfrac14 m\omega^{2} C^{2}.
$$

由 [[#thm-energy]]，$E = \tfrac12 m\omega^{2} C^{2}$，所以每个平均值都是 $E/2$，且 $\langle K\rangle = \langle U\rangle$。相等说的是平均值。在转折点处 $K = 0$、$U = E$；在平衡位置二者互换。两个平均值相加恢复 $\langle K + U\rangle = E$，与 $E$ 守恒相容，但各自恰为一半才是新内容。
:::
:::

::: exercise 支在边缘的圆盘 {#exr-disc level=3 check="2*pi*sqrt(3*0.2/(2*9.80))"}
半径 $R = 0.200\,\mathrm{m}$ 的均匀圆盘在自身平面内绕通过其边缘一点且垂直于盘面的固定轴摆动。推导小角下的周期并求数值。取 $g = 9.80\,\mathrm{m/s^{2}}$。均匀圆盘对该类轴过中心的转动惯量为 $\tfrac12 MR^{2}$。
::: hint
用平行轴定理把转动惯量从中心移到边缘，然后应用 [[#thm-physical]]。支点到质心的距离 $d$ 为 $R$。
:::
::: solution
质心就是几何中心，所以 $d = R$。把轴从中心移到边缘一点，距离 $R$，给中心转动惯量加上 $M R^{2}$：

$$
I = \tfrac12 MR^{2} + MR^{2} = \tfrac32 MR^{2}.
$$

于是 [[#eq-physical]] 给出

$$
T = 2\pi\sqrt{\frac{I}{Mgd}} = 2\pi\sqrt{\frac{\tfrac32 MR^{2}}{MgR}} = 2\pi\sqrt{\frac{3R}{2g}}.
$$

质量约掉。等价长度为 $I/(Md) = 3R/2 = 0.300\,\mathrm{m}$。取 $R = 0.200\,\mathrm{m}$：

$$
T = 2\pi\sqrt{\frac{3\times 0.200}{2\times 9.80}} = 2\pi\sqrt{\frac{0.600}{19.6}} = 2\pi\sqrt{0.03061} = 1.099\,\mathrm{s}.
$$

小角假设仍然必需：[[#thm-physical]] 用 $\theta$ 替换了 $\sin\theta$。
:::
:::
