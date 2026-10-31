[[oscillations/simple-harmonic]] 中的振子会永远重复下去。弹簧上的真实物块不会。每次摆动都比前一次小一点，最终物块停在平衡位置。机构里有某种东西在做负功。如果这个东西是一个与速度成正比、方向与速度相反的力，方程就保持线性，而且可以被完全求解。解分成三种形态：衰减的振荡，不振荡的临界返回，以及不振荡的缓慢爬回。你处在哪一种，是两个速率的比较，一个由阻力定，一个由弹簧定。

理想的简谐运动是阻力系数为零的特例。这里证明的一切，在关掉阻力后都必须回到那个情形；能量恒等式也必须回到上一章那个守恒的 $E$。阻力存在时，$E$ 下降。问题是下降有多快，以及当我们要拿一个鸣响的衰减去和一次缓慢爬回比较时，"快"意味着什么。

## 线性阻力

取 [[oscillations/simple-harmonic]] 中的弹簧，加上力 $-bv$，其中 $b \ge 0$。符号是模型的一部分：力与速度相反，所以功率 $-bv\cdot v = -bv^{2}$ 永不为正。质量为常量 $m$ 的质点沿直线的牛顿第二定律写作

$$
m\deriv{^2 x}{t^2} = -kx - b\deriv{x}{t},
$$

前提是 $x$ 的正方向在每一项中都相同。整理即得标准形。

::: definition 阻尼谐振子 {#def-damping}
质量为 $m > 0$、阻尼系数为 $b \ge 0$、刚度为 $k > 0$ 的**阻尼谐振子**指的是方程

$$
m\deriv{^2 x}{t^2} + b\deriv{x}{t} + kx = 0.
$$ {#eq-damped}

**固有角频率**与**阻尼常数**为

$$
\omega_{0} = \sqrt{\frac{k}{m}}, \qquad \gamma = \frac{b}{2m}.
$$ {#eq-rates}

两者的量纲都是时间的倒数。把 [[#eq-damped]] 除以 $m$，方程化为等价形式

$$
\deriv{^2 x}{t^2} + 2\gamma\deriv{x}{t} + \omega_{0}^{2} x = 0.
$$ {#eq-standard}
:::

$\gamma$ 定义里的那个因子 $2$ 是记号上的方便，不是第二个物理常数。它让特性根写成 $-\gamma \pm \cdots$ 而不是 $-b/(2m) \pm \cdots$，并且稍后会让振幅按 $e^{-\gamma t}$ 衰减。有些作者把 $b$ 叫阻尼系数而把 $\gamma$ 留给 $b/(2m)$；这里采用的就是这一约定。后面交互图中阻尼滑条上的记号是 $c$，它代表的是这个 $b$，不是 $\gamma$。

系数 $b$ 不像 $m$ 与 $k$ 那样是物质的普适属性，它是阻力模型中的线性项。在极低速率下，黏性流体中的球确实感受到与速率成正比的阻力；这是一条十九世纪的定理，记在下面的历史注记里，并且限于低雷诺数。又大又快的摆锤更接近二次阻力，那时 [[#eq-damped]] 就是错误的方程。不过在线性模型之内，数学是完备的，下面三种形态是**这个方程**的形态，而不是分别由实验发现的三个物种。

::: remark 代回 $b = 0$ 得到什么
若 $b = 0$，则 $\gamma = 0$，[[#eq-standard]] 成为 $x'' + \omega_{0}^{2} x = 0$。那就是角频率 $\omega_{0} = \sqrt{k/m}$ 的简谐运动，[[oscillations/simple-harmonic]] 中弹簧的结果。下面每个公式在相信它之前，都必须对着这个极限核对一遍。
:::

## 三种形态

把试探函数 $x = e^{rt}$ 代入 [[#eq-standard]]。每一项都带出因子 $e^{rt}$，剩下的是一个二次式

$$
r^{2} + 2\gamma r + \omega_{0}^{2} = 0.
$$ {#eq-char}

判别式是 $4\gamma^{2} - 4\omega_{0}^{2}$，所以 $\gamma^{2} - \omega_{0}^{2}$ 的符号决定根是共轭复数、重根，还是相异实根。这一比较就是整个分类。

::: theorem 三种形态 {#thm-regimes}
设 $\omega_{0} > 0$、$\gamma \ge 0$。[[#eq-standard]] 的每个解都具有下列形式之一。

若 $\gamma < \omega_{0}$（**欠阻尼**），令 $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$，则

$$
x(t) = e^{-\gamma t}\bigl(P\cos(\omega_{1} t) + Q\sin(\omega_{1} t)\bigr) = A e^{-\gamma t}\cos(\omega_{1} t - \varphi),
$$ {#eq-under}

其中 $A = \sqrt{P^{2} + Q^{2}}$，且当 $A > 0$ 时 $\cos\varphi = P/A$、$\sin\varphi = Q/A$。运动在振荡，且振荡在衰减。

若 $\gamma = \omega_{0}$（**临界阻尼**），则

$$
x(t) = (A + Bt)\, e^{-\omega_{0} t}.
$$ {#eq-critical}

若 $\gamma > \omega_{0}$（**过阻尼**），两个根

$$
r_{\pm} = -\gamma \pm \sqrt{\gamma^{2} - \omega_{0}^{2}}
$$ {#eq-roots}

为负实数，且

$$
x(t) = C_{+} e^{r_{+} t} + C_{-} e^{r_{-} t}.
$$ {#eq-over}

在每种形态中，两个自由常数都由 $x(0)$ 与 $\deriv{x}{t}(0)$ 确定，且不存在别的解。
:::

::: proof
试探函数 $x = e^{rt}$ 给出 [[#eq-char]]，其根为 $r = -\gamma \pm \sqrt{\gamma^{2} - \omega_{0}^{2}}$。

欠阻尼，$\gamma < \omega_{0}$。根为 $-\gamma \pm i\omega_{1}$，其中 $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$。$e^{(-\gamma + i\omega_{1})t}$ 的实部与虚部是 $e^{-\gamma t}\cos(\omega_{1} t)$ 与 $e^{-\gamma t}\sin(\omega_{1} t)$。每一个都满足线性方程 [[#eq-standard]]，所以带系数 $P$、$Q$ 的组合也满足。余弦差角公式

$$
A\cos(\omega_{1} t - \varphi) = A\cos\varphi\,\cos(\omega_{1} t) + A\sin\varphi\,\sin(\omega_{1} t)
$$

说明相位形式是同一个族，其中 $P = A\cos\varphi$、$Q = A\sin\varphi$。

临界阻尼，$\gamma = \omega_{0}$。有重根 $r = -\omega_{0}$。函数 $e^{-\omega_{0} t}$ 是一个解。为找第二个解，设 $x = (A + Bt)e^{-\omega_{0} t}$ 并代入 $x'' + 2\omega_{0} x' + \omega_{0}^{2} x = 0$。记 $u = A + Bt$，

$$
x' = (B - \omega_{0} u)\, e^{-\omega_{0} t}, \qquad x'' = \bigl(\omega_{0}^{2} u - 2\omega_{0} B\bigr) e^{-\omega_{0} t}.
$$

组合 $x'' + 2\omega_{0} x' + \omega_{0}^{2} x$ 的方括号内为

$$
\omega_{0}^{2} u - 2\omega_{0} B + 2\omega_{0}(B - \omega_{0} u) + \omega_{0}^{2} u = 0.
$$

所以 [[#eq-critical]] 是解，且含有两个任意常数。

过阻尼，$\gamma > \omega_{0}$。根 [[#eq-roots]] 为实数。它们为负，因为 $\sqrt{\gamma^{2} - \omega_{0}^{2}} < \gamma$，所以 $r_{+}$ 与 $r_{-}$ 都在负半轴上，且 $r_{-} < r_{+} < 0$。每个指数 $e^{r_{\pm} t}$ 都满足 [[#eq-standard]]，[[#eq-over]] 也满足。

剩下的是匹配初始数据，并排除任何进一步的解。记 $v = \deriv{x}{t}$。

在欠阻尼形式中，$x(0) = P$、$v(0) = -\gamma P + \omega_{1} Q$，所以 $P = x(0)$、$Q = \bigl(v(0) + \gamma x(0)\bigr)/\omega_{1}$。在临界形式中，$x(0) = A$、$v(0) = B - \omega_{0} A$，所以 $A = x(0)$、$B = v(0) + \omega_{0} x(0)$。在过阻尼形式中，$C_{+} + C_{-} = x(0)$、$r_{+} C_{+} + r_{-} C_{-} = v(0)$。该方程组的行列式为 $r_{-} - r_{+} \ne 0$，所以存在唯一的有序对 $(C_{+}, C_{-})$。

于是每组初始数据都被其所属形态的族中恰一个函数取到。设 $y$ 是具有相同初始数据的另一个解，则差 $z = y - x$ 满足 [[#eq-standard]] 且 $z(0) = z'(0) = 0$。机械能

$$
E = \tfrac12 m \bigl(\deriv{z}{t}\bigr)^{2} + \tfrac12 k z^{2}
$$

于是满足 $\deriv{E}{t} = -b \bigl(\deriv{z}{t}\bigr)^{2} \le 0$——这由下面 [[#prop-balance]] 中的计算得出，而那步计算只用到微分方程。所以 $E$ 不增。但 $E(0) = 0$ 且 $E \ge 0$，故对 $t \ge 0$ 有 $E(t) = 0$，从而 $z = 0$。已经写出的族就是通解。
:::

欠阻尼公式不是过阻尼公式的装饰。若 $\gamma > \omega_{0}$，量 $\omega_{0}^{2} - \gamma^{2}$ 为负，而虚参数的余弦是化了装的双曲余弦：把它不改动地塞进 [[#eq-under]] 得到的是错误的代数对象，或一个还得再整理回 [[#eq-over]] 的复数表达式。[[#eq-under]] 只在 $\gamma < \omega_{0}$ 时使用，[[#eq-critical]] 只在边界上使用，[[#eq-over]] 只在 $\gamma > \omega_{0}$ 时使用。

临界情形是边界 $\gamma = \omega_{0}$，亦即 $b = 2m\omega_{0} = 2\sqrt{km}$。它是系数空间中的一条曲线，不是一个区域。任何被说成临界阻尼的实验系统，都是一个被调到那条曲线附近的系统。数学上的边界本身是锋利的。

初始值公式可以直接读出，值得记住：

$$
\begin{aligned}
P &= x(0), & Q &= \frac{v(0) + \gamma x(0)}{\omega_{1}}, \\
A &= x(0), & B &= v(0) + \omega_{0} x(0),
\end{aligned}
$$

分别对应欠阻尼与临界阻尼形态。从静止释放即 $v(0) = 0$，于是 $Q = \gamma x(0)/\omega_{1}$、$B = \omega_{0} x(0)$。所以除非 $\gamma = 0$，欠阻尼的释放并不是 $\omega_{1} t$ 的纯余弦。指数因子对速度也有贡献，需要一个正弦项在 $t = 0$ 处把这一贡献抵消掉。轻阻尼 $\gamma \ll \omega_{1}$ 时系数 $Q$ 很小，纯余弦是公平的起点，但并不精确。

::: example 中等阻尼 {#ex-moderate}
取 $m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$、$b = 1.00\,\mathrm{N\,s/m}$，即无阻尼例题中的弹簧装上一个阻尼器。判断运动类型，计算 $\gamma$、$\omega_{0}$、$\omega_{1}$ 以及下面定义的品质因数，并写出从 $x(0) = 0.080\,\mathrm{m}$ 静止释放的解。
::: solution
由 [[#eq-rates]] 得

$$
\omega_{0} = \sqrt{\frac{40}{0.250}} = \sqrt{160} = 12.649\,\mathrm{rad/s}, \qquad \gamma = \frac{1.00}{2\times 0.250} = 2.00\,\mathrm{s^{-1}}.
$$

因为 $\gamma < \omega_{0}$，运动是欠阻尼的，且

$$
\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}} = \sqrt{160 - 4} = \sqrt{156} = 12.490\,\mathrm{rad/s}.
$$

应当引用的值是 $\omega_{0} = 12.65\,\mathrm{rad/s}$、$\omega_{1} = 12.49\,\mathrm{rad/s}$。由 [[#def-q]]，品质因数为

$$
Q = \frac{\omega_{0} m}{b} = \frac{\sqrt{160}\times 0.250}{1.00} = 3.162,
$$

即 $3.16$。这算不上很轻：$Q$ 只有几个单位，不是大数，而 $\omega_{1}$ 已经明显低于 $\omega_{0}$。

从静止释放给出 $P = 0.080\,\mathrm{m}$、$Q = \gamma P/\omega_{1} = 2.00\times 0.080/12.490 = 0.01281\,\mathrm{m}$。用相位形式，$A = \sqrt{P^{2} + Q^{2}} = 0.08102\,\mathrm{m}$，且

$$
\varphi = \arctan\!\left(\frac{Q}{P}\right) = \arctan(0.1601) = 0.1588\,\mathrm{rad} = 9.10^{\circ}.
$$

所以

$$
x(t) = 0.08102\, e^{-2.00\, t}\cos(12.490\, t - 0.1588),
$$

以米计、$t$ 以秒计。相位不是零。若取 $\varphi = 0$、$A = 0.080\,\mathrm{m}$，会得到 $v(0) = -\gamma A \ne 0$——那是另一个实验，一开始带一个小的负速度。振荡的周期，即余弦的重复时间，为

$$
T = \frac{2\pi}{\omega_{1}} = 0.503\,\mathrm{s},
$$

比无阻尼周期 $0.497\,\mathrm{s}$ 略长。同号相邻转折点的位移之比为 $e^{-\gamma T} = e^{-1.006} = 0.366$。一个周期之后位移峰值大约只剩原来的三分之一；能量是二次的，下降为这个因子的平方。分数能量损失 $\approx 2\pi/Q$ 的近似在这里毫无用处：$2\pi/Q = 1.99$，不可能是任何分数。轻阻尼的记账要等到后面用更小的 $b$ 时才开始。
:::
:::

::: widget oscillator
m: 0.25
c: 1
k: 40
F: 0
x0: 0.08
v0: 0
caption: 滑条 c 是正文中的阻尼系数 b，不是 gamma。c = 1、m = 0.25、k = 40 时物块是欠阻尼的：曲线仍会穿过原点，峰值下降。把 c 调过大约 6.3，穿过就停止了。再继续调大，返回变得更慢，而不是更快。
:::

该滑条上的临界值是 $b = 2m\omega_{0} = 2\sqrt{10} = 6.32\,\mathrm{N\,s/m}$，在下一个例题中计算。图中的积分器与无阻尼一章相同，只是 $c$ 变了。

::: example 临界阻尼器 {#ex-critical}
对同样的质量与弹簧，$m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$，求使系统恰好落在临界边界上的阻尼系数。写出从 $x(0) = 0.080\,\mathrm{m}$ 静止释放的运动，并求 $t = 0.200\,\mathrm{s}$ 处的 $x$。
::: solution
临界阻尼即 $\gamma = \omega_{0}$，所以

$$
b_{c} = 2m\omega_{0} = 2\times 0.250\times\sqrt{160} = 2\sqrt{10} = 6.325\,\mathrm{N\,s/m},
$$

记作 $6.32\,\mathrm{N\,s/m}$。[[#eq-critical]] 在 $v(0) = 0$ 下给出 $A = 0.080\,\mathrm{m}$、$B = \omega_{0} A$，于是

$$
x(t) = 0.080\,(1 + \omega_{0} t)\,e^{-\omega_{0} t}, \qquad \omega_{0} = \sqrt{160}.
$$

在 $t = 0.200\,\mathrm{s}$ 处，$\omega_{0} t = 2.530$、$e^{-\omega_{0} t} = 0.07967$，所以

$$
x(0.200) = 0.080\times(1 + 2.530)\times 0.07967 = 0.0225\,\mathrm{m}.
$$

因子 $(1 + \omega_{0} t)$ 在增长，但只按线性增长，而指数获胜：$t \to \infty$ 时 $x(t) \to 0$。对这一次特定的释放，一切 $t \ge 0$ 都有 $1 + \omega_{0} t > 0$，所以 $x(t)$ 从不变号。物块朝原点返回而不越过它。这一结论同时用到这组初始数据和 $\gamma = \omega_{0}$，它并不是说每个临界阻尼运动都拒绝穿过原点。从正的 $x(0)$ 出发、朝原点足够狠的一推确实会穿过，[[#eq-critical]] 通过 $B$ 的符号说明了这一点。
:::
:::

比这更重的阻尼并不能催物块回家，它留下的是一个更慢的根。

::: proposition 过阻尼的慢根 {#prop-slow}
若 $\gamma > \omega_{0}$，衰减常数 $\lambda_{\pm} = -r_{\pm}$ 为正，且较慢的那个满足

$$
0 < \lambda_{+} = \gamma - \sqrt{\gamma^{2} - \omega_{0}^{2}} < \omega_{0}.
$$ {#eq-slow}

等价地，$\lambda_{+} = \omega_{0}^{2}\big/\bigl(\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}\bigr)$。
:::

::: proof
由根 [[#eq-roots]] 得 $\lambda_{\pm} = \gamma \mp \sqrt{\gamma^{2} - \omega_{0}^{2}}$。平方根为正且严格小于 $\gamma$，所以 $\lambda_{\pm}$ 皆正且 $\lambda_{+} < \lambda_{-}$。把较慢的一个分子分母同乘共轭式有理化：

$$
\lambda_{+} = \frac{\bigl(\gamma - \sqrt{\gamma^{2} - \omega_{0}^{2}}\bigr)\bigl(\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}\bigr)}{\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}} = \frac{\omega_{0}^{2}}{\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}}.
$$

分母大于 $\gamma$，而 $\gamma > \omega_{0}$，所以分母大于 $\omega_{0}$。因此 $\lambda_{+} < \omega_{0}^{2}/\omega_{0} = \omega_{0}$。分子 $\omega_{0}^{2}$ 为正，故 $\lambda_{+} > 0$。
:::

临界阻尼的拖尾带着因子 $t e^{-\omega_{0} t}$，至多差一个由初始数据确定的常数。把它与过阻尼拖尾 $e^{-\lambda_{+} t}$ 比较：两者之比是常数乘以 $t e^{-(\omega_{0} - \lambda_{+})t}$。因为 $\omega_{0} > \lambda_{+}$，指数是一个负常数，所以比值当 $t \to \infty$ 时趋于零。最终临界阻尼的拖尾比过阻尼的拖尾更小。恰好在这个意义上、也只在这个意义上，边界 $\gamma = \omega_{0}$ 比每个过阻尼选择都返回得快：在不振荡的运动当中，阻尼越重，晚期返回越慢，因为 $\lambda_{+}$ 随 $\gamma$ 增大而趋零。欠阻尼运动是另一种比较：它会振荡，而且从静止释放时会变号。如果设计要求是"不许振荡"，候选者是 $\gamma \ge \omega_{0}$，而边界赢得晚期这场赛跑。

::: example 过阻尼的释放 {#ex-over}
保留 $m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$，取 $b = 10.0\,\mathrm{N\,s/m}$。求两个根、从 $x(0) = 0.080\,\mathrm{m}$ 静止释放的运动，并把 $x(0.200\,\mathrm{s})$ 与 $x(0.500\,\mathrm{s})$ 同 [[#ex-critical]] 的临界释放作比较。
::: solution
这里 $\gamma = b/(2m) = 10.0/(0.500) = 20.0\,\mathrm{s^{-1}}$，大于 $\omega_{0} = 12.649\,\mathrm{rad/s}$。由 [[#eq-roots]] 得

$$
\sqrt{\gamma^{2} - \omega_{0}^{2}} = \sqrt{400 - 160} = \sqrt{240} = 15.492,
$$

所以 $r_{+} = -20.0 + 15.492 = -4.508\,\mathrm{s^{-1}}$、$r_{-} = -20.0 - 15.492 = -35.49\,\mathrm{s^{-1}}$。慢衰减常数是 $\lambda_{+} = 4.508\,\mathrm{s^{-1}}$，安全地位于 $\omega_{0}$ 之下，与 [[#prop-slow]] 的要求一致。快项 $e^{-35.5 t}$ 在几百分之一秒后就已经可以忽略。

从静止释放给出 $C_{+} + C_{-} = 0.080$、$r_{+} C_{+} + r_{-} C_{-} = 0$。解得

$$
C_{+} = 0.080\cdot\frac{-r_{-}}{r_{+} - r_{-}} = 0.080\cdot\frac{35.49}{30.98} = 0.0916\,\mathrm{m},
$$

且 $C_{-} = 0.080 - 0.0916 = -0.0116\,\mathrm{m}$。于是

$$
x(t) = 0.0916\, e^{-4.508 t} - 0.0116\, e^{-35.49 t},
$$

以米计。$t = 0.200\,\mathrm{s}$ 时快项极小，$x = 0.0372\,\mathrm{m}$。同一时刻临界释放（见 [[#ex-critical]]）已经降到 $0.0225\,\mathrm{m}$。$t = 0.500\,\mathrm{s}$ 时过阻尼坐标为 $0.00962\,\mathrm{m}$，而临界坐标为 $0.00105\,\mathrm{m}$。阻尼更重的那个反而离原点更远。两个运动都保持为正。[[#ex-moderate]] 的欠阻尼释放在 $t = 0.200\,\mathrm{s}$ 时早已变号。
:::
:::

::: quiz
一个阻尼振荡器满足 $\gamma > \omega_{0}$。下列说法哪项正确？
- [ ] 运动是 $A e^{-\gamma t}\cos(\omega_{1} t - \varphi)$，其中 $\omega_{1} = \sqrt{\gamma^{2} - \omega_{0}^{2}}$。
- [x] 两个特性根都是负实数，通解是两个衰减指数之和。
- [ ] 临界阻尼意味着 $\gamma = 0$，即完全没有阻力的情形。
- [ ] 机械能 $\tfrac12 m v^{2} + \tfrac12 k x^{2}$ 保持守恒，因为弹簧是保守的。
::: solution
[[#thm-regimes]] 把 $\gamma > \omega_{0}$ 归入过阻尼族 [[#eq-over]]，两个根皆为负实数。余弦公式是欠阻尼解，要求 $\gamma < \omega_{0}$；第一个选项里写的平方根是过阻尼的那个，被粘到了错误的公式上。临界阻尼是边界 $\gamma = \omega_{0}$，不是 $\gamma = 0$。只要物块在动，阻尼器就做负功，所以机械能下降。那笔能量账就是 [[#prop-balance]]。
:::
:::

## 能量与品质因数

弹簧仍在储存 $\tfrac12 kx^{2}$，物块仍带着 $\tfrac12 mv^{2}$。两者之和正是在 [[oscillations/simple-harmonic]] 中会守恒的机械能。阻尼器没有势能，它只带走能量。

::: proposition 能量平衡 {#prop-balance}
沿 [[#eq-damped]] 的任意解，机械能 $E = \tfrac12 m v^{2} + \tfrac12 k x^{2}$（$v = \deriv{x}{t}$）满足

$$
\deriv{E}{t} = -b v^{2}.
$$ {#eq-balance}

特别地 $E$ 不增。$E$ 对一切 $t$ 守恒当且仅当 $b = 0$，或物块在该区间内始终静止。
:::

::: proof
对 $E$ 求导，并用 [[#eq-damped]] 的形式 $m v' = -bv - kx$ 代入 $v' = \deriv{^2 x}{t^2}$：

$$
\deriv{E}{t} = m v v' + k x v = v(m v' + kx) = v(-bv) = -b v^{2}.
$$

右端 $\le 0$，因为 $b \ge 0$。若 $b = 0$，导数为零，$E$ 就是无阻尼理论中那个常数。若 $v$ 恒为零，则 $x$ 为常数，而 [[#eq-damped]] 迫使 $kx = 0$，于是 $x = 0$、$E = 0$，守恒。反过来，若 $E$ 在物块并非始终静止的区间上守恒，则 $-bv^{2} = 0$ 而 $v$ 不恒为零，故 $b = 0$。
:::

这就是阻尼振荡器不能按无阻尼的意义赋予一个固定振幅的原因。量 $\tfrac12 k C^{2}$ 属于一个封闭的能量预算，而这里的预算有一个与速率平方成正比的漏洞。这个漏洞只在转折点处关上——那里 $v = 0$，那一瞬时 $\deriv{E}{t} = 0$。在转折点之间，能量逐级向下走。

欠阻尼运动仍有一个周期，即正弦因子的周期 $T = 2\pi/\omega_{1}$。在这段区间上，漏洞的效果出奇地刚性：整个相空间向量恰好按同一个因子缩小，而能量作为二次量按平方缩小。

::: theorem 一个周期之后的能量 {#thm-cycle}
设 $\gamma < \omega_{0}$，并记 $T = 2\pi/\omega_{1}$，其中 $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$。对 [[#eq-standard]] 的每个解和每个 $t$，

$$
x(t + T) = e^{-\gamma T} x(t), \qquad v(t + T) = e^{-\gamma T} v(t),
$$

因而

$$
E(t + T) = e^{-2\gamma T} E(t).
$$ {#eq-cycle}

一个周期之后剩余的机械能比例恰为 $e^{-2\gamma T}$，损失的比例是 $1 - e^{-2\gamma T}$。
:::

::: proof
设 $x(t) = e^{-\gamma t} u(t)$。求导：

$$
v = e^{-\gamma t}(u' - \gamma u), \qquad x'' = e^{-\gamma t}\bigl(u'' - 2\gamma u' + \gamma^{2} u\bigr).
$$

代入 [[#eq-standard]]：

$$
x'' + 2\gamma v + \omega_{0}^{2} x = e^{-\gamma t}\bigl(u'' + (\omega_{0}^{2} - \gamma^{2})u\bigr).
$$

方程对一切 $t$ 成立当且仅当 $u'' + \omega_{1}^{2} u = 0$。该无阻尼方程的每个解 $u$ 都以 $2\pi/\omega_{1}$ 为周期（见 [[oscillations/simple-harmonic]]），所以 $u(t + T) = u(t)$、$u'(t + T) = u'(t)$。于是

$$
x(t + T) = e^{-\gamma(t + T)} u(t + T) = e^{-\gamma T} e^{-\gamma t} u(t) = e^{-\gamma T} x(t),
$$

同一个因子也乘在 $v$ 上，因为 $v$ 是 $e^{-\gamma t}$ 乘以 $u$ 与 $u'$ 的组合。动能与弹性势能关于 $(x, v)$ 是二次齐次的，所以各自乘以 $e^{-2\gamma T}$，它们的和 $E$ 也乘以 $e^{-2\gamma T}$。
:::

这个恒等式是精确的。它不是小阻尼近似，也不是说在每一瞬时都有 $E(t) = E(0)\, e^{-2\gamma t}$。在相隔一个周期的两次取样之间，动能与势能仍在相互转换，$E(t)$ 上下起伏，而它在格点 $t_{0} + nT$ 上的取样按几何级数下降。起伏是简谐交换，几何因子是阻尼器。

转折点也包括在内。因为 $v(t + T) = e^{-\gamma T} v(t)$ 而指数从不为零，$v(t) = 0$ 当且仅当 $v(t + T) = 0$。同类型的相邻转折点相隔一个周期，那里的位移之比为 $e^{-\gamma T}$。把这个比值取对数就得到**对数减缩**，

$$
\delta = \ln\left|\frac{x(t_{n})}{x(t_{n} + T)}\right| = \gamma T = \frac{2\pi\gamma}{\omega_{1}}.
$$ {#eq-logdec}

它对欠阻尼线性振子是精确的，理由与 [[#eq-cycle]] 精确的原因相同。

::: definition 品质因数 {#def-q}
对 $b > 0$，[[#eq-damped]] 的**品质因数**为

$$
Q = \frac{\omega_{0} m}{b} = \frac{\omega_{0}}{2\gamma}.
$$ {#eq-q}

$Q$ 大意味着阻尼轻：振幅衰减单位量对应许多弧度的振荡。
:::

还有两个近似把 [[#eq-cycle]] 变成轻阻尼时引用的那条经验法则。第一，若 $Q$ 大，则 $\gamma \ll \omega_{0}$，于是 $\omega_{1} = \omega_{0}\sqrt{1 - \gamma^{2}/\omega_{0}^{2}}$ 接近 $\omega_{0}$，$T$ 接近无阻尼周期 $2\pi/\omega_{0}$。第二，若 $2\gamma T$ 本身就小，则 $1 - e^{-2\gamma T} \approx 2\gamma T$。把两者串起来：

$$
1 - e^{-2\gamma T} \approx 2\gamma\cdot\frac{2\pi}{\omega_{0}} = \frac{4\pi\gamma}{\omega_{0}} = \frac{2\pi}{Q} = \frac{2\pi b}{m\omega_{0}}.
$$

当 $Q$ 大时，每个周期的能量损失比例约为 $2\pi b/(m\omega_{0})$，即 $2\pi/Q$。同一极限还给出 $\delta \approx \pi/Q$。当 $2\pi/Q$ 不小时，两个替换都失效。大于 $1$ 的值不可能是损失比例，它是这样一个信号：应当回到指数 $e^{-2\gamma T}$，而不是它的线性化。能量"按 $e^{-2\gamma t}$ 衰减"指的是 [[#eq-cycle]] 那种精确的格点意义。记号 $2\pi/Q$ 只是这一衰减的一阶描述，仅此而已。

::: example 更轻的阻尼 {#ex-light}
对弹簧 $m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$ 改用更小的系数 $b = 0.20\,\mathrm{N\,s/m}$。求 $\gamma$、$Q$、$\omega_{1}$ 以及一个周期后剩余的机械能比例。
::: solution
由 [[#eq-rates]] 与 [[#eq-q]] 得

$$
\gamma = \frac{0.20}{2\times 0.250} = 0.400\,\mathrm{s^{-1}}, \qquad Q = \frac{\sqrt{160}\times 0.250}{0.20} = 15.81,
$$

按三位数字 $Q = 15.8$。阻尼轻到振荡显而易见，又不够轻到所有近似都免费。移动后的频率为

$$
\omega_{1} = \sqrt{160 - 0.160} = \sqrt{159.84} = 12.643\,\mathrm{rad/s},
$$

只比 $\omega_{0} = 12.649\,\mathrm{rad/s}$ 低一点。周期为 $T = 2\pi/\omega_{1} = 0.49698\,\mathrm{s}$，而无阻尼的是 $0.49673\,\mathrm{s}$。[[#eq-cycle]] 不再需要任何进一步近似：

$$
2\gamma T = 2\times 0.400\times 0.49698 = 0.3976, \qquad e^{-2\gamma T} = e^{-0.3976} = 0.672.
$$

一个周期之后，机械能剩余 $67.2\%$，损失的比例是 $0.328$。对应峰值的振幅按 $e^{-\gamma T} = e^{-0.1988} = 0.820$ 下降，对数减缩为 $\delta = 0.199$。

大 $Q$ 损失公式给出 $2\pi/Q = 0.397$，与 $2\gamma T$ 吻合得很好，因为 $\omega_{1}$ 与 $\omega_{0}$ 几乎相等。但它与真实的损失比例 $0.328$ 不合。差距就是 $x = 0.40$ 处的线性化 $1 - e^{-x} \approx x$，那里指数级数的下一项 $x^{2}/2 = 0.079$ 仍然可见。在这个 $Q$ 下，应当引用 $e^{-2\gamma T}$ 而不是 $2\pi/Q$ 作为剩余比例。法则 $2\pi/Q$ 只有当这个数本身很小时才准确。

对与 [[#ex-moderate]] 相同的静止释放，即 $x(0) = 0.080\,\mathrm{m}$、$v(0) = 0$，[[#eq-under]] 中的相位为 $\varphi = \arctan(\gamma/\omega_{1}) = 1.81^{\circ}$，相位振幅为 $A = x(0)\,\omega_{0}/\omega_{1} = 0.08004\,\mathrm{m}$。在这个阻尼下，纯余弦乘以 $e^{-\gamma t}$ 已经是一幅忠实的图像。在 $b = 1.00\,\mathrm{N\,s/m}$ 时还不是。
:::
:::

::: warning 边界，以及错误的公式
临界阻尼是边界 $\gamma = \omega_{0}$，等价地 $b = 2m\omega_{0}$。除非说清楚在比较什么，否则它不是"最快返回"的同义词。让这句口号成立的那种比较，是不振荡运动之间晚期的拖尾：[[#prop-slow]] 表明每个过阻尼选择的衰减常数都比 $\omega_{0}$ 慢，而 [[#eq-critical]] 中的因子 $t$ 翻不倒那个指数差距。允许振铃的设计是另一个问题，欠阻尼拖尾不在那个比较之列。

另外，不要把 $\gamma > \omega_{0}$ 插进 [[#eq-under]]。平方根 $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$ 此时不是实数，余弦形式是错误的实解。过阻尼运动是 [[#eq-over]]。
:::

::: intuition 判别式在看什么
阻尼器想把运动停下，弹簧想把运动翻向。弹簧赢了，物块冲过头，你看到的是衰减的振铃，即 [[#eq-char]] 的复根。阻尼器赢了，物块攒不出能带它冲过原点的速度，两个根都是实数。边界是重根，两个实根刚刚碰面的地方。把 $b$ 加大越过这次碰面并不会添什么新的定性本领：它把一个重根劈成一个速朽的快项和一个拖延的慢项。这就是 [[#prop-slow]] 的全部内容。
:::

::: history 斯托克斯阻力，不是三种形态
斯托克斯（George Gabriel Stokes）在 1850 年宣读、1851 年发表的一篇论文中，计算了黏性流体对一个缓慢穿过它的球的阻力。该文为《论流体内摩擦对摆运动的影响》（*On the effect of the internal friction of fluids on the motion of pendulums*），刊于《剑桥哲学学会汇刊》。他求得的力是 $F = 6\pi\eta r v$，$\eta$ 为黏度、$r$ 为半径，方向与速度相反。足够小或足够慢的摆锤确实感到线性阻力，这正是 [[#eq-damped]] 作为该实验正确的线性化形式的理由。推导假定了雷诺数很低。速度较高时阻力不是线性的，方程不是 [[#eq-damped]]，解的显式目录也就不再适用。

三种形态本身比那篇论文更古老、更初等。它们是二次方程与实轴相交的三种方式施加在 [[#eq-char]] 上的结果。把欠阻尼、临界阻尼、过阻尼归功于某一篇实验论文，是把一个数学三分法与有时为线性项提供依据的流体力学混为一谈。斯托克斯为系数 $b$ 提供了一个诚实的出处，他没有给根分类。
:::

## 后续内容

这里解出的自由运动，是受驱振子在遗忘其初始数据期间做的事。在 [[#eq-damped]] 右端加上力 $F_{0}\cos(\omega t)$，通解就是一个受驱特解加上 [[#thm-regimes]] 的齐次解。若 $b > 0$，那个齐次部件无论振铃还是爬回都会衰减，剩下一个以驱动频率振荡的稳态。若 $b = 0$ 而驱动恰在 $\omega_{0}$，没有任何东西能压住齐次部件，振幅的增长没有稳态上限。这些结论在 [[oscillations/resonance]] 中证明，其中 $\gamma$、$\omega_{0}$ 与 $Q$ 完全沿用这里给出的定义。

同样的线性阻力在任何"小速度产生小反向力"的地方都会作为模型（而不是定律）出现：扭杆阻尼器、门上的液压闭门器、在线圈磁场中摆动的电磁阻尼。每一处的第一个问题都是 $\gamma$ 与 $\omega_{0}$ 的比较，第二个问题是 $Q$ 是否大到足以用分数损失法则，还是必须保留 [[#eq-cycle]] 中的指数。

::: summary
- 线性模型是 $m x'' + b x' + k x = 0$，其中 $\omega_{0} = \sqrt{k/m}$、$\gamma = b/(2m)$。图中的滑条 $c$ 就是这个 $b$。
- 欠阻尼，$\gamma < \omega_{0}$：$x = A e^{-\gamma t}\cos(\omega_{1} t - \varphi)$，$\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$。临界，$\gamma = \omega_{0}$：$x = (A + Bt)e^{-\omega_{0} t}$。过阻尼，$\gamma > \omega_{0}$：两个衰减实指数之和。
- 当 $\gamma > \omega_{0}$ 时不要用欠阻尼公式。除非 $\gamma = 0$，从静止释放不是纯余弦，因为衰减指数本身对速度有贡献。
- 机械能满足 $\deriv{E}{t} = -b v^{2}$。物块在动且 $b > 0$ 时它不守恒。
- 欠阻尼运动中 $E(t + T) = e^{-2\gamma T} E(t)$ 精确成立，$T = 2\pi/\omega_{1}$。能量的格点取样按 $e^{-2\gamma t}$ 衰减。逐点的 $E(t) = E(0)e^{-2\gamma t}$ 是一条多余的、不必要的主张。
- 品质因数是 $Q = \omega_{0} m/b = \omega_{0}/(2\gamma)$。$Q$ 大时每周期损失比例约为 $2\pi/Q = 2\pi b/(m\omega_{0})$。$Q = 3.16$ 时这个近似毫无意义；$Q = 15.8$ 时精确的剩余比例是 $e^{-2\gamma T} = 0.672$。
- 临界阻尼是边界 $\gamma = \omega_{0}$。在不振荡的返回当中它的晚期拖尾最快，因为每个过阻尼慢根都严格慢于 $\omega_{0}$。更重的阻尼更慢，不是更快。
:::

## 习题

::: exercise 阻尼常数 {#exr-gamma level=1 check="1/(2*0.25)"}
质量 $m = 0.250\,\mathrm{kg}$ 接在系数 $b = 1.00\,\mathrm{N\,s/m}$ 的阻尼器上。求 $\gamma = b/(2m)$，以 $\mathrm{s^{-1}}$ 计。
::: solution
[[#eq-rates]] 是定义，不是需要求解的方程：

$$
\gamma = \frac{b}{2m} = \frac{1.00}{2\times 0.250} = \frac{1.00}{0.500} = 2.00\,\mathrm{s^{-1}}.
$$

与刚度无关。运动会不会振铃，取决于把这个 $\gamma$ 与 $\omega_{0} = \sqrt{k/m}$ 比较，本题不问这个。
:::
:::

::: exercise 振铃频率 {#exr-omega1 level=1 check="sqrt(156)"}
上一题的质量与阻尼器接在 $k = 40\,\mathrm{N/m}$ 的弹簧上。求欠阻尼角频率 $\omega_{1}$。
::: solution
先算 $\omega_{0}^{2} = k/m = 40/0.250 = 160\,\mathrm{s^{-2}}$，$\gamma = 2.00\,\mathrm{s^{-1}}$（来自上一题或 [[#ex-moderate]]）。因为 $\gamma < \omega_{0}$，[[#thm-regimes]] 适用，

$$
\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}} = \sqrt{160 - 4} = \sqrt{156} = 12.49\,\mathrm{rad/s}.
$$

无阻尼值 $\sqrt{160} = 12.65\,\mathrm{rad/s}$ 是 $\omega_{0}$，不是 $\omega_{1}$。拿它当余弦的频率用，就是 $b = 0$ 的理论。
:::
:::

::: exercise 轻阻尼器的品质因数 {#exr-q-light level=1 check="sqrt(160)*0.25/0.2"}
对 $m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$、$b = 0.20\,\mathrm{N\,s/m}$，计算 $Q$。
::: solution
由 [[#eq-q]] 得

$$
Q = \frac{\omega_{0} m}{b} = \frac{\sqrt{160}\times 0.250}{0.20} = \frac{3.1623}{0.20} = 15.81,
$$

按三位有效数字为 $15.8$。等价地 $\gamma = 0.40\,\mathrm{s^{-1}}$、$Q = \omega_{0}/(2\gamma) = \sqrt{160}/0.80 = 15.81$。这就是 [[#ex-light]] 的阻尼器。分数损失法则 $2\pi/Q$ 在这个 $Q$ 值下只是第一近似。
:::
:::

::: exercise 临界系数 {#exr-bcrit level=2 check="2*sqrt(10)"}
求使 $m = 0.250\,\mathrm{kg}$、刚度 $k = 40\,\mathrm{N/m}$ 的系统恰好临界阻尼的 $b$ 值。
::: solution
临界阻尼是 $\gamma = \omega_{0}$，所以 $b_{c} = 2m\omega_{0}$。取 $\omega_{0} = \sqrt{160}$：

$$
b_{c} = 2\times 0.250\times\sqrt{160} = \tfrac12\sqrt{160} = \sqrt{40} = 2\sqrt{10} = 6.32\,\mathrm{N\,s/m}.
$$

任何比它小的正 $b$ 都是欠阻尼，任何比它大的 $b$ 都是过阻尼。边界是这一个数，不是一个区间。[[#ex-critical]] 使用同一个值并在该边界上写出运动。
:::
:::

::: exercise 一个周期后剩余的能量 {#exr-fraction level=2 check="exp(-2*0.4*2*pi/sqrt(160-0.16))"}
对 $m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$、$b = 0.20\,\mathrm{N\,s/m}$，运动是欠阻尼的。求经过一个周期 $T = 2\pi/\omega_{1}$ 后剩余的机械能比例。
::: solution
由 [[#ex-light]]，$\gamma = 0.400\,\mathrm{s^{-1}}$、$\omega_{1} = \sqrt{160 - 0.16} = \sqrt{159.84}$。[[#thm-cycle]] 把剩余比例直接给出为纯指数，无需进一步近似：

$$
e^{-2\gamma T} = \exp\!\left(-2\times 0.400\times\frac{2\pi}{\omega_{1}}\right) = \exp\!\left(-\frac{1.6\pi}{\sqrt{159.84}}\right) = 0.672.
$$

损失的比例是 $1 - 0.672 = 0.328$。数 $2\pi/Q = 0.397$ 是损失（而不是剩余比例）的一阶替身，且在这个 $Q$ 下明显大于 $0.328$。题目要的是精确的剩余比例。
:::
:::

::: exercise 慢衰减常数 {#exr-slow level=2 check="20-sqrt(240)"}
一个过阻尼振荡器 $m = 0.250\,\mathrm{kg}$、$k = 40\,\mathrm{N/m}$、$b = 10.0\,\mathrm{N\,s/m}$。求较慢的衰减常数 $\lambda_{+}$，即使慢项形如 $e^{-\lambda_{+} t}$ 的那个正数。
::: solution
[[#eq-rates]] 给出 $\gamma = 10.0/(2\times 0.250) = 20.0\,\mathrm{s^{-1}}$、$\omega_{0}^{2} = 160\,\mathrm{s^{-2}}$。由 [[#eq-slow]] 得

$$
\lambda_{+} = \gamma - \sqrt{\gamma^{2} - \omega_{0}^{2}} = 20 - \sqrt{400 - 160} = 20 - \sqrt{240} = 4.508\,\mathrm{s^{-1}}.
$$

快常数是 $20 + \sqrt{240} = 35.49\,\mathrm{s^{-1}}$。[[#prop-slow]] 保证 $\lambda_{+} < \omega_{0} = 12.65\,\mathrm{s^{-1}}$，而 $4.508 < 12.65$ 与此相符。在这里引用 $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$ 就是把欠阻尼公式用在了边界的错误一侧：根号内为负。
:::
:::

::: exercise 能量去了哪里 {#exr-power level=3}
从 [[#eq-damped]] 出发，证明对 $E = \tfrac12 mv^{2} + \tfrac12 kx^{2}$ 有 $\deriv{E}{t} = -bv^{2}$。由此推出：若 $b > 0$ 且物块不是永久静止，则 $E$ 不是运动常数。
::: hint
把运动方程乘以 $v = \deriv{x}{t}$，认出 $\tfrac12 mv^{2}$ 与 $\tfrac12 kx^{2}$ 的导数。
:::
::: solution
把 [[#eq-damped]] 写成 $m\deriv{v}{t} + bv + kx = 0$。乘以 $v$：

$$
m v\deriv{v}{t} + b v^{2} + kx v = 0.
$$

第一项是 $\deriv{}{t}\bigl(\tfrac12 m v^{2}\bigr)$，第三项是 $\deriv{}{t}\bigl(\tfrac12 k x^{2}\bigr)$，于是

$$
\deriv{E}{t} + b v^{2} = 0,
$$

即 [[#eq-balance]]。设 $b > 0$ 且 $E$ 守恒，则每一瞬时 $v^{2} = 0$，故 $v \equiv 0$，故 $x$ 为常数。运动方程随之要求 $kx = 0$，于是 $x = 0$。物块永久静止在平衡位置，且 $E = 0$。任何其他运动，只要 $b > 0$，$\deriv{E}{t}$ 就在一段时间集合上严格为负，$E$ 会改变。阻尼摧毁 [[oscillations/simple-harmonic]] 的守恒律，说的就是这个意思。弹簧力仍是保守的，阻尼器不是。
:::
:::

::: exercise 静止释放不越过原点 {#exr-nocross level=3}
考虑满足 $x(0) = x_{0} > 0$、$v(0) = 0$ 的 [[#eq-standard]]。

(a) 若 $\gamma = \omega_{0}$，导出 $x(t) = x_{0}(1 + \omega_{0} t)e^{-\omega_{0} t}$ 并证明对一切 $t \ge 0$ 有 $x(t) > 0$。

(b) 若 $\gamma > \omega_{0}$，证明对任何 $t > 0$，$x(t)$ 不为零。
::: hint
(a) 中由 [[#thm-regimes]] 里的初始数据读出 $A$ 与 $B$。(b) 中由 $v(0) = 0$ 解出比值 $C_{+}/C_{-}$，再与不超过 $1$ 的 $e^{(r_{-} - r_{+})t}$ 比较。
:::
::: solution
(a) [[#thm-regimes]] 在临界边界上给出 $x(t) = (A + Bt)e^{-\omega_{0} t}$，其中 $A = x(0) = x_{0}$、$B = v(0) + \omega_{0} x(0) = \omega_{0} x_{0}$。因此

$$
x(t) = x_{0}(1 + \omega_{0} t)\, e^{-\omega_{0} t}.
$$

对 $t \ge 0$，因子 $1 + \omega_{0} t$ 至少为 $1$，指数为正，所以 $x(t) \ge x_{0} e^{-\omega_{0} t} > 0$。

(b) 设 $x = C_{+} e^{r_{+} t} + C_{-} e^{r_{-} t}$，其中 $r_{-} < r_{+} < 0$。初始条件是 $C_{+} + C_{-} = x_{0}$ 与 $r_{+} C_{+} + r_{-} C_{-} = 0$。第二式给出 $C_{+}/C_{-} = -r_{-}/r_{+}$。两根皆负且 $\abs{r_{-}} > \abs{r_{+}}$，所以 $-r_{-}/r_{+} = \abs{r_{-}}/\abs{r_{+}} > 1$。特别地 $C_{+}$ 与 $C_{-}$ 异号。由 $C_{+} + C_{-} = x_{0} > 0$ 与 $\abs{C_{+}/C_{-}} > 1$ 可知 $C_{+} > 0$、$C_{-} < 0$。

设存在 $t_{1} > 0$ 使 $x(t_{1}) = 0$。则 $C_{+} = -C_{-} e^{(r_{-} - r_{+})t_{1}}$，于是

$$
-\frac{C_{+}}{C_{-}} = e^{(r_{-} - r_{+})t_{1}}.
$$

左端等于 $r_{-}/r_{+} > 1$。右端严格小于 $1$，因为 $r_{-} - r_{+} < 0$ 且 $t_{1} > 0$。大于 $1$ 的数不能等于小于 $1$ 的数。这样的 $t_{1}$ 不存在。结合 (a)：当 $\gamma \ge \omega_{0}$ 时，静止释放不越过原点。欠阻尼的释放会越过：这就是 $\omega_{1}$ 为实的含义，[[#ex-moderate]] 给出了一个具体的变号。
:::
:::
