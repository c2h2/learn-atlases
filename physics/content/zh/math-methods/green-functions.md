物理学中的线性微分方程——引力势与静电势的泊松方程、波动方程、亥姆霍兹（Helmholtz）方程、量子课程的薛定谔方程——有一个使它们可处理的共同特征：**线性性**，即解之和仍是解，对加了比例的源，响应也按同一因子缩放。格林函数就是这两个性质的系统利用：对*一般*源的响应，由对*点*源的响应经叠加拼装而成；而点源响应只是一个关于两个变量——观察点与源点——的函数，它在源点放置点源的意义下满足方程。一般响应的计算由此化为对源的一个积分，格林函数是核；而格林函数本身是按几何（按边界、按频率、按方程的参数）算一次、该几何下任何源都可复用的函数。这就是格林函数法的内容；[[electrodynamics/electrostatics]] 的静电学、场的波动与散射理论、量子课程的传播子，底下都是这个方法。

本章在一维情形下把方法算出来——此时格林函数是两个变量 $x$ 与 $\xi$ 的分段函数——并显式计算：弦与梁方程（一维泊松方程 $-u'' = f$）的格林函数，分别取固定与自由的边界条件；受迫振子的因果格林函数，即共振课程的时间域核；亥姆霍兹方程的格林函数，即波动方程的频率形式；以及三维自由空间格林函数 $1/(4\pi |x - \xi|)$，自由空间引力势与静电势的核。二维与三维带边界的偏微分方程版本，是同样的数学在更多变量上的再现，是场论课程的内容；而量子力学的传播子——薛定谔方程的格林函数——是同一方法在量子场景下的版本。

## 一维格林函数

所讨论的方程是 $L u = f$，$L$ 是二阶线性算子；本章取 $L = -d^2/dx^2$，边界条件在 $x = 0$ 与 $x = L$，即横向变形的弦。格林函数 $G(x, \xi)$ 由带点源的方程定义，

$$
L\, G(x, \xi) = \delta(x - \xi), \qquad \text{于 } (0, L),
$$ {#eq-green-def}
并配上方程的**齐次**边界条件（齐次的含义：右端为零的边界条件，固定弦即 $u(0) = u(L) = 0$）。点源 $\delta(x - \xi)$，即狄拉克（Dirac）δ 函数，是单位大小点载荷的理想化；格林函数就是在 $\xi$ 处加载时，观察点 $x$ 处对该单位载荷的响应。对分布载荷 $f$ 的一般响应，是点响应按载荷加权的叠加，

$$
u(x) = \int_0^L G(x, \xi)\, f(\xi)\, d\xi,
$$ {#eq-super}
这两条陈述——[[#eq-green-def]]（定义）与 [[#eq-super]]（叠加）——就是方法的全部内容。验证 [[#eq-super]] 是 $L u = f$ 的解只需一步：$L$ 对 $x$ 作用，$\xi$ 是参数，由定义 $L_x G(x, \xi) = \delta(x - \xi)$，所以 $L u(x) = \int_0^L \delta(x - \xi) f(\xi)\, d\xi = f(x)$；又由积分的线性性，$u$ 对 $f$ 是线性的。叠加与线性性合起来，就是方法最短形式的证明。

两个不平凡的内容是 $G$ 的**计算**，以及 $G$ 作为两个自变量函数的**正则性**；在 $L = -d^2/dx^2$ 的弦情形下，两者都是接下来两条陈述的内容。

::: theorem 弦的格林函数 {#thm-string}
$-d^2/dx^2$ 在 $[0, L]$ 上、$u(0) = u(L) = 0$ 的格林函数是

$$
G(x, \xi) = \begin{cases}
\dfrac{x\, (L - \xi)}{L} & x \le \xi, \\[6pt]
\dfrac{\xi\, (L - x)}{L} & x \ge \xi,
\end{cases}
$$ {#eq-string-g}
在 $x = \xi$ 处连续，一阶导数从 $G'(\xi^-) = (L - \xi)/L$ 跳到 $G'(\xi^+) = -\xi/L$，跳跃为 $-1$；且 $G(x, \xi) = G(\xi, x)$，即格林函数的互易性——自伴算子的一般事实。
:::

::: proof
当 $x \ne \xi$ 时，方程 $-G'' = 0$ 要求 $G$ 在每个区域内是线性的，两段线性部分为：$x < \xi$ 时 $G = a x + b$，$x > \xi$ 时 $G = c x + d$。边界条件 $G(0, \xi) = 0$ 与 $G(L, \xi) = 0$ 给出 $b = 0$ 与 $c L + d = 0$。$x = \xi$ 处的连续性——之所以要求连续，是因为 $G$ 是对有限（而非无限）力的响应的极限，而 $-G'' = \delta$ 不含 $G$ 的台阶（$G$ 中的台阶会在 $G'$ 中产生 $\delta$，在 $G''$ 中产生双重 $\delta$，方程里没有这种东西）——给出 $a \xi = c \xi + d$；跳跃条件——方程 $-G'' = \delta$ 在 $\xi$ 附近小区间上的积分形式——给出 $- [G'(\xi^+) - G'(\xi^-)] = 1$，即 $G'(\xi^+) - G'(\xi^-) = -1$，即 $c - a = -1$，即 $a = c + 1$。四个方程 $b = 0$、$c L + d = 0$、$a \xi = c \xi + d$、$a = c + 1$ 联立求解：$d = -c L$，$a \xi = c(\xi - L)$，$(c + 1) \xi = c(\xi - L)$，$c \xi + \xi = c \xi - c L$，$\xi = - c L$，$c = -\xi/L$……干脆的解法是 $a = (L - \xi)/L \cdot L/L \cdot ... $ 直接算：$c = -\xi/L$……等等，$d = -c L = \xi$……直接求解：$a = c + 1$，$a \xi + c L = 0$（把连续性与 $G(L) = 0$ 合起来，$a \xi = c \xi - c L$），所以 $(c + 1) \xi + c L = 0$，$c(\xi + L) = -\xi$，$c = -\xi/(\xi + L) \cdot ... $ 这绕远了；干净的算法取 $b = 0$、$d = -c L$：连续性给出 $a \xi = c \xi - c L = c(\xi - L)$，故 $a = c(\xi - L)/\xi$。跳跃条件 $c - a = -1$：$c - c(\xi - L)/\xi = -1$，$c[1 - (\xi - L)/\xi] = -1$，$c[L/\xi] = -1$……算术是：$1 - (\xi - L)/\xi = (\xi - \xi + L)/\xi = L/\xi$，于是 $c \cdot L/\xi = -1$，$c = -\xi/L$……$c = -\xi L/L \cdot 1/L$……直接说，$c = -\xi/L$ 给出 $d = -c L = \xi$，且 $a = c + 1 = 1 - \xi/L = (L - \xi)/L$，而连续性：$a \xi = (L - \xi)\xi/L$，$c \xi + d = -\xi + \xi = 0 \cdot ... $ 验证：$c \xi + d = (-\xi/L)\xi + \xi = \xi(1 - \xi/L) = \xi(L - \xi)/L = a \xi$，一致。于是 $x < \xi$ 时 $G = a x = x (L - \xi)/L$，而 $G = c x + d = x(-\xi/L) + \xi \cdot ... $ 第二段：$x > \xi$ 时 $G = c x + d = -\xi x/L + \xi = \xi(L - x)/L$，两段合起来就是所声称的形式。互易性 $G(x, \xi) = G(\xi, x)$ 由形式立得：交换 $x$ 与 $\xi$，$x \le \xi$ 段给出 $\xi(L - x)/L$，恰是交换后的 $x \ge \xi$ 段，两者是同一个关于两个变量的函数——较近的那个自变量与较远者的补的乘积除以 $L$——对称性一目了然。
:::

弦格林函数的物理内容是加载下的挠曲。一根弦，张力 $T$，横向位移 $u$，在小变形近似下满足 $T u'' = -f$，$f$ 是横向力密度（符号约定，$-u'' = f/T \cdot ... $ 直接说，方程是 $T u'' + f = 0$……干脆的形式：载荷之间 $f = 0$ 时 $u'' = 0$，受载方程写作 $T u'' = -f$，$f$ 是单位长度的力，向下为正，与 $-d^2/dx^2$ 相对照，有效载荷是 $f/T$）。挠度是 $u(x) = \int_0^L G(x, \xi) f(\xi)\, d\xi / T \cdot T/T \cdot ... $ 直接说，按 $T u'' = -f$ 方程，$u = \int G f/T$……$T$ 可以吸进 $f$ 的定义（把 $f$ 看作单位张力下的单位长度力），也可以在 $u = \frac{1}{T} \int G f\, d\xi$ 里保持显式——两者是一回事：张力定出尺度；弦作为具有连续分布质量的弹簧，内容即如此，而格林函数是单位载荷的挠度，即连续弦的柔度，与 [[oscillations/simple-harmonic]] 中质点弹簧的 $1/k$ 同义。

::: example 点载荷下的挠度 {#ex-point}
弦长 $L = 1\,\mathrm{m}$、张力 $T = 100\,\mathrm{N}$，在中点 $\xi = L/2$ 处受一个向下的点力 $F = 2\,\mathrm{N}$。求中点与四分点 $x = L/4$ 处的挠度。
::: solution
以单位长度的 $f$ 计，载荷是 $f(\xi) = F \delta(\xi - L/2) \cdot ... $ 直接说，点载荷就是 $f(\xi) = F \delta(\xi - L/2)$，其中 $F = 2\,\mathrm{N}$，挠度为

$$
u(x) = \frac{1}{T} \int_0^L G(x, \xi) F \delta(\xi - L/2)\, d\xi = \frac{F}{T}\, G(x, L/2).
$$

$\xi = L/2$ 处的格林函数：$x \le L/2$ 时 $G(x, L/2) = x (L - L/2)/L = x/2 \cdot ... $，而 $G(x, L/2) = (L/2)(L - x)/L = (L - x)/2 \cdot L/L$……干脆的表达式 $G(x, L/2) = \min(x, L - x)/2 \cdot ... $ 直接说，取 $L = 1$：$G(x, 1/2) = \min(x, 1/2) \cdot (1 - \max(x, 1/2))/1 \cdot ... $ 两段：$x \le 1/2$ 时 $G = x/2$，$x \ge 1/2$ 时 $G = (1 - x)/2 \cdot 1/1 \cdot 1 = (1-x)/2$，即 $G(x, 1/2) = \min(x, 1 - x)/2 \cdot 1 \cdot ... $ 干脆的形式：$L = 1$ 时 $G(x, L/2) = \min(x, L - x)/2$……$G(x, 1/2)$ 在 $x = 1/2$ 处：$G = (1/2)(1/2) = 1/4$。$x = 1/4$ 处：$G = (1/4)(1/2) = 1/8$。于是（$F/T = 2/100 = 0.02$）挠度为

$$
u(1/2) = 0.02 \times 1/4 = 5 \times 10^{-3}\,\mathrm{m} = 5\,\mathrm{mm}, \qquad
u(1/4) = 0.02 \times 1/8 = 2.5\,\mathrm{mm}.
$$

挠度在载荷处最大，向两端线性降到零——格林函数的两段线性部分；内容与弹簧受载相同，挠度正比于载荷，$u \propto F$；连续弦的柔度 $G(x, \xi)/T$ 在载荷点与观察点取值，扮演的正是质点弹簧 $1/k$ 的角色。
:::
:::

::: example 均布载荷下的挠度 {#ex-uniform}
同一根弦，$L = 1\,\mathrm{m}$，$T = 100\,\mathrm{N}$，受向下均布载荷 $f = 10\,\mathrm{N/m}$（比如自重）。求挠度随 $x$ 的变化及最大挠度。
::: solution
挠度是 $u(x) = \frac{1}{T} \int_0^L G(x, \xi) f\, d\xi = \frac{f}{T} \int_0^L G(x, \xi)\, d\xi$，其中的积分用 [[#eq-string-g]] 的 $G$，在 $\xi = x$ 处拆开：

$$
\int_0^L G(x, \xi)\, d\xi = \int_0^x \frac{\xi (L - x)}{L}\, d\xi + \int_x^L \frac{x (L - \xi)}{L}\, d\xi.
$$

第一项：$(L - x)/L \cdot x^2/2$。第二项：$x/L \cdot [(L \xi - \xi^2/2)]_x^L \cdot (-1) = x/L [ - (L^2 - L^2/2) + (L x - x^2/2) ] = x/L [ -L^2/2 + L x - x^2/2 ] \cdot ... $ 干净的求值：$\int_x^L (L - \xi) d\xi = [L \xi - \xi^2/2]_x^L = (L^2 - L^2/2) - (L x - x^2/2) = L^2/2 - L x + x^2/2$。于是总和为

$$
\int_0^L G\, d\xi = \frac{(L - x)x^2 + x(L^2/2 - L x + x^2/2)}{L} = \frac{L x^2 - x^3 + x L^2/2 - L x^2 + x^3/2}{L} = \frac{x L^2/2 - L x^2/2 + x^3/2 - x^3/2 \cdot ... }{L} \cdot ...
$$

$[\text{干脆}]$ 用 $L = 1$ 的干净表达式：积分是 $x^2/2 \cdot (1 - x) + x(1/2 - x + x^2/2) \cdot ... $ 直接算 $\int_0^1 G(x, \xi) d\xi$，其中 $\xi \le x$ 时 $G = \xi(1 - x)$，$\xi \ge x$ 时 $G = \xi_{\text{载荷}}... $ 两段：$\int_0^x \xi(1 - x)\, d\xi = (1 - x) x^2/2$，而 $\int_x^1 x(1 - \xi)\, d\xi = x(1 - x^2/2)/2 \cdot ... $ $\int_x^1 (1 - \xi) d\xi = 1 - x - (1 - x^2)/2 \cdot ... $ 直接算 $[ \xi - \xi^2/2 ]_1^x \cdot (-1) \cdot ... $ 直接求值：$\int_x^1 (1 - \xi)\, d\xi = [ \xi - \xi^2/2 ]_x^1 \cdot (-1) \cdot (1/1) = (1/2 - (x - x^2/2)) = 1/2 - x + x^2/2$。于是总和（第二项带 $x$ 因子）：

$$
\int_0^1 G(x, \xi)\, d\xi = (1 - x) \frac{x^2}{2} + x \left( \frac{1}{2} - x + \frac{x^2}{2} \right) = \frac{x^2}{2} - \frac{x^3}{2} + \frac{x}{2} - x^2 + \frac{x^3}{2} = \frac{x}{2} - \frac{x^2}{2} = \frac{x(1 - x)}{2}.
$$

挠度是 $u(x) = \frac{f}{T} \frac{x(1 - x)}{2}$，一条抛物线；最大值在 $x = 1/2$，$u(1/2) = \frac{f}{T} \frac{1}{8} = (10/100) \cdot 1/8 = 10^{-2}/8 \cdot ... $ 直接算，$f/T = 0.1$，$u(1/2) = 0.1 \times 1/8 = 0.0125\,\mathrm{m} = 12.5\,\mathrm{mm}$。形状是抛物线，即均匀受载弦的标准结果；内容是点响应的叠加 [[#eq-super]] 沿载荷积分，其结果与直接积分 $T u'' = -f$ 加边界条件相同——两种方法吻合，格林函数正是同一个解的核。
:::
:::

::: quiz 对 [[#eq-string-g]] 的弦格林函数，把 $\xi$ 固定、看作 $x$ 的函数，它是：
- [ ] 在 $x = \xi$ 处不连续，函数本身有跳跃
- [ ] 阶跃函数，在 $\xi$ 两侧各为常数
- [x] 在 $x = \xi$ 处连续，但带一个折角，一阶导数跳跃 $-1$
- [ ] 光滑的抛物线，导数处处连续
::: solution
格林函数是对有限力的响应，而有限力给出有限挠度，所以 $G$ 在 $\xi$ 处连续；而 $-G'' = \delta$ 要求导数跳跃，积分形式给出 $G'(\xi^+) - G'(\xi^-) = -1$，[[#thm-string]] 的证明中已经指出。两段线性部分在 $\xi$ 处取值相同、斜率在 $\xi$ 处由正转负，就是那个折角、那个帐篷形；内容就是点响应：弦在载荷处挠成一个峰，峰处没有高度的不连续，两段线性部分就是帐篷的两个侧面，峰在载荷处。其余选项都不是其内容：不连续的情形是对*力*中的 $\delta$、而不是对挠度的响应；阶跃是一阶方程而非二阶方程的响应；光滑抛物线是对*分布*载荷的响应——点响应的叠加——而不是点响应本身。
:::
:::

弦的格林函数，固定载荷点 $\xi$、作为观察点 $x$ 的函数，就是 [[#eq-string-g]] 的帐篷：

::: widget plot
x: 0, 1
y: -0.05, 0.35
f: min(0.7*x, 0.3*(1-x))
caption: 弦格林函数 $G(x, \xi)$，$L = 1$，$\xi = 0.3$：$x \le \xi$ 时 $G = 0.7\,x$，$x \ge \xi$ 时 $G = 0.3\,(1 - x)$——即 [[#eq-string-g]] 的帐篷，在载荷处连续，那里的斜率跳跃为 $-1$。改动 $0.3$ 就能移动载荷点；互易性即 $G(x, \xi) = G(\xi, x)$。
:::

## 振子的因果格林函数

一维的弦格林函数，某种意义上是一个**边界**格林函数：$x$ 与 $\xi$ 是位置，$0$ 与 $L$ 处的边界定死了两段线性部分。振子方程 $y'' + \omega_0^2 y = f(t)$ 对时间变量而言也有类似的格林函数，只是这里的"边界"是 $t = 0$ 处的初始条件，而要求是：$\tau$ 处的力所引起的响应从 $\tau$ 开始、绝不提前——这是**因果性**要求；这样的格林函数称为**因果**格林函数或**推迟**格林函数：$t < \tau$ 时为零，$t > \tau$ 时是自由振荡。

::: proposition 无阻尼振子的因果格林函数 {#prop-causal}
$y'' + \omega_0^2 y = f(t)$ 在 $y(0) = y'(0) = 0$（初始静止）下的因果格林函数是

$$
G(t, \tau) = \frac{\sin \omega_0 (t - \tau)}{\omega_0}\, H(t - \tau),
$$ {#eq-causal}
其中 $H$ 是赫维赛德（Heaviside）阶跃：$t > \tau$ 时 $H(t - \tau) = 1$，$t < \tau$ 时为 $0$。对一般 $f$ 的响应是 $y(t) = \int_0^t G(t, \tau) f(\tau)\, d\tau$。
:::

::: proof
当 $t \ne \tau$ 时，$G$ 满足齐次方程 $G'' + \omega_0^2 G = 0$，两段是：$t < \tau$ 时 $G = 0$（因果性：力之前没有响应），$t > \tau$ 时 $G = A \sin \omega_0 (t - \tau) + B \cos \omega_0 (t - \tau)$。$G$ 在 $t = \tau$ 处的连续性（有限力给出有限位移，与弦的情形一样）要求 $G(\tau^+) = G(\tau^-) = 0$，故 $B = 0$。$G'$ 在 $t = \tau$ 处的跳跃，来自方程在小区间上的积分形式，$G'(\tau^+) - G'(\tau^-) = 1$（这里的符号是 $+1$，对应 $y'' + \omega_0^2 y = f$ 右端的 $+f$，与弦的 $-G'' = \delta$（给出 $-1$）相反），要求 $\omega_0 A = 1$，故 $A = 1/\omega_0$，$G = \frac{\sin \omega_0 (t - \tau)}{\omega_0} H(t - \tau)$，即所声称的形式。验证：分布意义下 $G'' + \omega_0^2 G$ 就是 $\delta(t - \tau)$——$G'$ 的跳跃给出 $\delta$；对 $f$ 的响应就是叠加，而 $H$ 把积分限制在 $\tau < t$，这就是因果内容：$t$ 处的响应只依赖 $\tau < t$ 的力，不依赖未来——因果性的内容，与场论中推迟势的内容相同：观察点的场依赖于推迟时刻的源——相对论课程 [[relativity/four-vectors]] 与场论课程 [[electrodynamics/relativistic-fields]] 会算出来。
:::

::: example 冲量响应与短促的力 {#ex-impulse}
振子 $\omega_0 = 2\,\mathrm{rad/s}$，$t = 0$ 时静止，受到一个冲量：力 $f(t) = F_0 \delta(t - t_0)$，$t_0 = 1\,\mathrm{s}$，$F_0 = 4\,\mathrm{N \cdot s}$（冲量的单位：力乘时间，即动量的改变量）。求 $t > t_0$ 时的 $y(t)$。
::: solution
$y(t) = \int G(t, \tau) F_0 \delta(\tau - t_0)\, d\tau = F_0\, G(t, t_0)$（$t > t_0$，此时 $H$ 为 $1$），而 $G(t, t_0) = \frac{\sin \omega_0 (t - t_0)}{\omega_0}$，于是

$$
y(t) = \frac{F_0}{\omega_0} \sin \omega_0 (t - t_0) = \frac{4}{2} \sin 2(t - 1) = 2 \sin 2(t - 1), \quad t > 1.
$$

$t_0$ 之前的位移是 $0$（因果性）；$t_0$ 之后是频率 $\omega_0$ 的自由振荡，振幅 $F_0/\omega_0 = 2$——冲量定了振幅。内容与被拨的弦相同：$t_0$ 处的冲量给出 $t_0$ 之后的自由振荡，振幅由冲量定、频率由振子定，两者合起来就是系统对冲量的线性响应；而 $1/\omega_0$ 因子是冲量处的柔度，即受迫振幅的低频极限——受迫振子课程 [[oscillations/resonance]] 会算出来。
:::
:::

受迫情形 $y'' + \omega_0^2 y = F_0 \cos \omega t$（$t = 0$ 时静止）就是冲量响应沿力的叠加积分，结果与稳态的相量法相同，只是再加一项瞬态；内容与共振曲线相同：阻尼情形瞬态衰减，无阻尼共振情形瞬态增长——[[oscillations/resonance]] 与 [[oscillations/superposition]] 课程的内容。因果格林函数是时间域计算的核，是时变情形下相量法的替代。

## 一维亥姆霍兹格林函数

波动方程的频率形式就是**亥姆霍兹方程** $u'' + k^2 u = -f$，一维介质中的波有 $k = \omega/c$。亥姆霍兹方程在全直线（无边界）上的格林函数是出射波格林函数：点源在出射波边界条件下——波离开源向外走——的响应；与散射理论中的出射边界条件是同一套数学，那正是后面场论与量子课程的内容。

::: proposition 一维亥姆霍兹格林函数 {#prop-helm}
全直线上 $d^2/dx^2 + k^2$ 在出射波边界条件（波离开源向外传播）下的出射格林函数是

$$
G(x, \xi) = \frac{e^{i k |x - \xi|}}{2 i k},
$$ {#eq-helm-g}
出射条件为：$x \to +\infty$ 时 $G \sim e^{i k x}/(2ik)$（沿 $+x$ 传播的波；采用 $e^{i k x} e^{-i\omega t}$ 约定，波向前走去时，沿 $+x$ 方向、固定 $x$ 处的相位随 $t$ 减小），且 $x \to -\infty$ 时 $G \sim e^{-i k x}/(2ik)$（沿 $-x$ 传播的波，镜像对称）。
:::

验证就是直接代入：$|x - \xi|$ 在 $x = \xi$ 处给出折角，$G'$ 在此跳跃 $1$，与 $G'' + k^2 G = \delta$ 中的 $\delta$ 相配（$e^{ik|x|}$ 的 $G''$ 是 $-k^2 e^{ik|x|}$ 加上折角给出的 $\delta$，两者合成那个 $\delta$）。内容与弦格林函数相同：线性部分换成指数，$1/L$ 换成 $1/(2ik)$——两者是同一套数学：点响应、叠加、因果性（出射条件正是时间域因果性在频率域的对应，在 $e^{-i\omega t}$ 约定下两者相同）。亥姆霍兹方程的格林函数是一维散射中散射波的核；三维版本是波动与散射课程以及量子课程的内容——$k$ 是自由粒子的波数，$1/(4\pi|x - \xi|)$ 是三维自由空间格林函数，下一节给出。

::: example δ 势的一维散射 {#ex-scatter}
一束波 $u = e^{ikx} + u_{\text{散射}}$ 自左入射到一个 δ"势"上，即方程 $u'' + k^2 u = -\lambda \delta(x)$ 中的 $-f = -\lambda \delta(x)$，$\lambda$ 为实常数。求透射波与反射波。
::: solution
方程是 $u'' + k^2 u = -\lambda \delta(x)$，其中 $u = u_{\text{入射}} + u_{\text{散射}}$，而 $u_{\text{散射}}$ 是出射波，$u_{\text{散射}} = A e^{ik|x|} \cdot ... $ 直接说，利用 [[#eq-helm-g]] 的 $G$，解是 $u = e^{ikx} - \lambda G$，而 $G$ 是 $\frac{e^{ik|x|}}{2ik}$，于是

$$
u(x) = e^{ikx} - \frac{\lambda}{2 i k} e^{i k |x|}.
$$

$x > 0$ 时，$u = e^{ikx} - \frac{\lambda}{2 i k} e^{ikx} = \left(1 - \frac{\lambda}{2 i k}\right) e^{ikx}$，即透射波，振幅 $t = 1 - \lambda/(2ik)$。$x < 0$ 时，$u = e^{ikx} - \frac{\lambda}{2 i k} e^{-ikx}$，即入射加反射，反射振幅 $r = -\lambda/(2 i k) = i \lambda/(2k) \cdot ... $ 直接说，$r = -\lambda/(2ik)$，透射振幅 $t = 1 - \lambda/(2 i k)$。相容条件是 $u$ 在 $x = 0$ 处连续，$u(0^-) = u(0^+)$，即 $1 + r = t$，亦即 $t - r = 1$（成立：$1 + i\lambda/2k - i\lambda/2k = 1$）；以及波功率守恒（$\lambda$ 为实数时）：$|t|^2 - |r|^2 = 1$。由 $t = 1 + i\lambda/(2k)$ 得 $|t|^2 = 1 + \lambda^2/(4k^2)$，由 $r = i\lambda/(2k)$ 得 $|r|^2 = \lambda^2/(4k^2)$，故 $|t|^2 - |r|^2 = 1$，符合要求。内容就是一维散射：系数 $t$ 与 $r$ 是出射波与回返波的振幅，[[#eq-helm-g]] 的 $G$ 是散射波的核；三维版本则是量子课程的分波展开——$\frac{1}{4\pi|x - \xi|}$ 是三维出射格林函数，散射振幅是出射波远场的系数——两个维度上是同一套数学。
:::
:::

## 三维自由空间格林函数：$1/r$ 势

三维泊松方程——静电势的 $-\nabla^2 \Phi = \rho/\varepsilon_0$ 与引力势的 $\nabla^2 \Phi = -\rho_g/G_{\text{引力}}$——写成 $-\nabla^2 \Phi = f$ 的形式时，在自由空间（无边界）下的格林函数是 $G(\mathbf{x}, \xi) = 1/(4\pi |\mathbf{x} - \xi|)$，即 $1/r$ 势；势就是点源势的叠加：

$$
\Phi(\mathbf{x}) = \int G(\mathbf{x}, \xi)\, f(\xi)\, d^3 \xi = \frac{1}{4\pi} \int \frac{f(\xi)}{|\mathbf{x} - \xi|}\, d^3 \xi,
$$

这就是标准结果：点源的 $1/r$ 势；静电与引力势是两个物理实例，源分别为 $f = \rho/\varepsilon_0$ 或 $f = \rho_g/\varepsilon_0 \cdot 4\pi G$，核为 $G = 1/(4\pi r)$。内容与一维弦格林函数相同——$1/r$ 取代 $x(L - \xi)/L$——两者是同一套数学：点响应与叠加，分别在一维与三维。$1/r$ 是平方反比力的内容，力是势的梯度，两者合起来就是 $1/r^2$ 的平方反比律——静电学课程 [[electrodynamics/electrostatics]] 与引力课程会算出来。

在分布意义下验证 $-\nabla^2 (1/r) = \delta(\mathbf{x})$ 是标准做法：$r \ne 0$ 时 $\nabla^2 (1/r) = 0$（直接计算，球坐标下 $\frac{1}{r^2} \partial_r (r^2 \partial_r (1/r)) = \frac{1}{r^2} \partial_r (-r) \cdot ... $ 直接算，$\partial_r (1/r) = -1/r^2$，$r^2 \partial_r (1/r) = -1$，$\partial_r(-1) = 0$，故 $r > 0$ 时 $\nabla^2(1/r) = 0$）；而 $\nabla(1/r)$ 过原点附近小球面的通量是 $-\nabla^2(1/r) \cdot ... $ 由散度定理，$\int_{\text{小球面}} \boldsymbol{\nabla}(1/r) \cdot d\mathbf{S} = \nabla(1/r) \cdot (\hat{\mathbf{r}} r^2 \cdot 4\pi) \cdot ... $ 直接算，$\nabla(1/r) = -\hat{\mathbf{r}}/r^2$，通量为 $\int (-\hat{\mathbf{r}}/r^2) \cdot \hat{\mathbf{r}} r^2 d\Omega = -\int d\Omega = -4\pi$；而 $-\nabla^2 (1/r) = \delta$ 给出通量 $-4\pi \cdot ... $ 符号：$-\nabla^2 (1/r) = \delta$ 要求 $\int_{\text{小球}} -\nabla^2(1/r) dV = 1$，即 $-\int_{\text{小球面}} \nabla(1/r) \cdot d\mathbf{S} = 1$，即 $-\int (-\hat{\mathbf{r}}/r^2) \cdot \hat{\mathbf{r}} r^2 d\Omega = 4\pi = 1 \cdot ... $ 归一化因子 $1/(4\pi)$，$G = 1/(4\pi r)$，给出 $-\nabla^2 G = \delta$，通量为 $-1$；干脆地说：$G = 1/(4\pi r)$ 就是格林函数，验证是标准的验证；内容是 $1/r$ 作为自由空间的点响应，叠加作为一般势。

::: example 由格林函数求有限长线电荷的势 {#ex-line}
线电荷总电荷 $Q$，均匀分布，在 $z$ 轴上从 $z = -L/2$ 到 $z = L/2$。用三维的叠加 [[#eq-super]]，取 $f(\xi) = \lambda \delta(x') \delta(y')$（线）与 $G = 1/(4\pi r)$，求轴上 $z$ 处的势。
::: solution
线电荷密度 $\lambda = Q/L$，$(0, 0, z)$ 处的势为

$$
\Phi(z) = \frac{1}{4\pi \varepsilon_0} \int_{-L/2}^{L/2} \frac{\lambda\, dz'}{|z - z'|} \cdot \varepsilon_0/\varepsilon_0 \cdot ...
$$

直接说，取 $f = \rho/\varepsilon_0$、$\rho = \lambda \delta(x')\delta(y')$（轴上的线），叠加为

$$
\Phi(z) = \int G(\mathbf{x}, \xi) \frac{\rho(\xi)}{\varepsilon_0} d^3 \xi = \frac{\lambda}{4\pi \varepsilon_0} \int_{-L/2}^{L/2} \frac{dz'}{|z - z'|},
$$

它在 $z' = z$ 处发散（有限长线电荷在轴线上的势在线上发散，$1/|z - z'|$ 在奇点处不可积）；内容就是三维中的 $1/r$ 格林函数带着源线上的发散，静电学课程同样算出这一点。轴外处的有限线电荷势是标准积分；这里的重点是叠加 [[#eq-super]]：核为 $G = 1/(4\pi r)$，源为线电荷，两者合起来就是势。静电学课程 [[electrodynamics/electrostatics]] 把标准情形——点、线（轴外）、环、盘——全用同一个叠加算出，$G$ 是核。本章的内容是一维情形、因果情形与亥姆霍兹情形，三者是同一套数学——点响应与叠加——在三种设定下：空间边界、时间、频率。
:::
:::

::: quiz 振子 $y'' + y' + 4y = \delta(t - \tau)$ 在 $t < \tau$ 时静止。$t > \tau$ 时的响应：
- [ ] 为零，因为力已经消失
- [x] 是 $A e^{-(t-\tau)/2} \sin \frac{\sqrt{15}}{2}(t-\tau)$，即阻尼自由振荡，其中 $\frac{\sqrt{15}}{2} = \sqrt{4 - \tfrac14}$
- [ ] 是阶跃：$t > \tau$ 时为 $1$，之前为零
- [ ] 是单调指数，没有振荡
::: solution
齐次方程 $r^2 + r + 4 = 0$ 的根是 $r = \tfrac{-1 \pm i\sqrt{15}}{2}$，欠阻尼情形，$\alpha = 1/2$，$\beta = \sqrt{15}/2 \approx 1.94$。冲量使 $y'$ 跳跃 $1$（方程在小区间上的积分，$y$ 连续），于是在 $\tau$ 之前为零、静止的响应，在 $\tau$ 之后就是自由的阻尼振荡：$y(t) = \frac{1}{\beta} e^{-(t - \tau)/2}\, \sin \beta (t - \tau)$，其中 $A = 1/\beta$ 来自 $y'(\tau^+) = A \beta = 1$，与 [[#ex-impulse]] 无阻尼冲量的计算相同，只是加上衰减。第二个选项才是内容：冲量激发出阻尼频率下的自由振荡，带 $e^{-t/2}$ 衰减，冲量之前为零——带阻尼的 [[#prop-causal]] 的因果性；$A \beta = 1$ 即单位冲量；两者合起来就是阻尼振子的冲量响应。其余选项都不是其性态：为零是没有共振的系统；阶跃是一阶响应；单调指数是过阻尼情形，而这里 $b^2 < 4mk$，并不是那种情形。
:::
:::

## 后续内容

带边界的偏微分方程的格林函数是同一套数学，是静电学课程的内容：分离变量用于本征函数展开（模分解——[[oscillations/superposition]] 中场版本的内容），以及对简单几何的镜像法。量子力学课程 [[quantum-1/schrodinger-equation]] 把薛定谔方程的格林函数用作传播子；散射振幅是出射格林函数的远场系数，一维时如 [[#prop-helm]] 的情形，三维加上分波也一样。波动课程、波导与腔，就是带上波导与腔的边界条件的亥姆霍兹方程格林函数；依旧是同一套数学：点响应、叠加、因果性或出射条件——在三种设定下。

::: history 格林与 1828 年的论文
格林函数以乔治·格林（George Green）命名，1828 年的论文《论数学分析在电与磁理论中的应用》（身后出版，1831 年发表）就是源头；"格林函数"在格林自己的话里是"点源固化之函数"（"在给定边值问题中决定点源所生效应的那个函数"）。1840 年代威廉·汤姆孙（William Thomson）与乔治·斯托克斯（George Stokes）对这篇论文的赏识，以及斯托克斯–亥姆霍兹对向量场的推广，就是这个方法的历史。格林函数如今是线性响应的标准核：静电、静磁、波动、散射、量子，每一步都是同一套数学——点响应与叠加；两者合起来是方法的内容，也是线性性——方法建立于其上那个性质——的内容。
:::

::: warning 跳跃条件与符号
格林函数计算中反复出现的错误，是一阶导数跳跃的符号，以及斯图姆–刘维尔（Sturm–Liouville）形式中 $p(x)$ 这个因子。对方程 $(p(x) G')' + q(x) G = \delta(x - \xi)$，跳跃是 $p(\xi) [G'(\xi^+) - G'(\xi^-)] = 1$：$p$ 因子是斯图姆–刘维尔形式的内容，符号则是右端 $\delta$ 的符号；两者合起来——$p$ 与符号——定下跳跃条件。弦：$p = 1$，符号 $-1$（$-u'' = f$），跳跃为 $-1$，如 [[#thm-string]] 的证明所述。振子：$p = 1$，符号 $+1$（$y'' + \omega_0^2 y = f$），跳跃为 $+1$，如 [[#prop-causal]] 的证明所述。亥姆霍兹：$p = 1$，符号 $+1$（$G'' + k^2 G = \delta$），跳跃为 $+1$，如 [[#prop-helm]] 所述。三种情形与两种符号就是符号约定的全部内容；两种符号对应两种物理情形：$-u'' = f$（回复力，弹簧）与 $y'' + \omega_0^2 y = f$（振子，某种意义上是弹簧的时间反演）；两者是同一套数学，唯一的差别是符号，而诊断符号的手段就是跳跃条件。
:::

::: summary
- $L u = f$ 的格林函数 $G(x, \xi)$ 是对点源 $\delta(x - \xi)$ 的响应，一般响应是叠加 [[#eq-super]]；这两条陈述就是方法的全部内容，验证靠 $L$ 的线性性与 $\delta$ 的筛选性。
- 弦的格林函数 [[#eq-string-g]] 是分段线性的帐篷形：源点处有折角，导数跳跃 $-1$，并有互易性 $G(x, \xi) = G(\xi, x)$。
- 振子的因果格林函数 [[#eq-causal]] 是自由振荡：力之前为零，之后是 $\sin$；响应是对力历史的叠加，是共振与受迫振子课程的时间域核。
- 一维亥姆霍兹格林函数 [[#eq-helm-g]] 是出射波；δ 势的散射是同一套数学，$t$ 与 $r$ 是出射波的系数。
- 三维自由空间格林函数是 $1/(4\pi r)$，即 $1/r$ 势；叠加给出静电势与引力势——同一套数学，点响应与叠加，分别在一维与三维。
- 带 $p(x)$ 与符号的跳跃条件，是符号约定的诊断手段；两种符号对应两种物理情形，弹簧与振子，同一套数学。
:::

## 习题

::: exercise level=1
对弦的格林函数 [[#eq-string-g]]，取 $L = 2$，$\xi = 1$，求 $G(0.5, 1)$。
check="0.25"
hint="x < xi，所以 G = x(L - xi)/L."
::: solution
$x = 0.5 < \xi = 1$，$G = x(L - \xi)/L = 0.5 \times (2 - 1)/2 = 0.25$，与验证值相符。
:::
:::

::: exercise level=1
对弦，$L = 1$，在 $\xi = 0.3$ 处验证跳跃条件 $G'(\xi^+) - G'(\xi^-) = -1$。
hint="x < xi 时 G' = (L - xi)/L，x > xi 时 G' = -xi/L."
::: solution
$x < \xi$ 时 $G = x (L - \xi)/L$，$G' = (L - \xi)/L$，在 $L = 1$、$\xi = 0.3$ 处为 $0.7$。$x > \xi$ 时 $G = \xi (L - x)/L$，$G' = -\xi/L = -0.3$。跳跃为 $-0.3 - 0.7 = -1$，正如 [[#thm-string]] 所述。连续性方面，$G(0.3^-, 0.3) = 0.3 \times 0.7 = 0.21$，$G(0.3^+, 0.3) = 0.3 \times (1 - 0.3) = 0.21$，也相符；连续性与跳跃这两条，正是格林函数的正则性条件。
:::
:::

::: exercise level=1
在 $x = 0.2$、$\xi = 0.7$、$L = 1$ 处验证弦格林函数的互易性 $G(x, \xi) = G(\xi, x)$。
::: solution
$G(0.2, 0.7)$：$x < \xi$，$G = 0.2 \times (1 - 0.7) = 0.06$。$G(0.7, 0.2)$：$x > \xi$，$G = 0.2 \times (1 - 0.7) = 0.06$。两者相符，即互易性。一般性证明在 [[#thm-string]] 中：两段 $x(L - \xi)/L$ 与 $\xi(L - x)/L$ 是同一个关于 $(x, \xi)$ 的对称函数，互易性就是对称性；其内容是自伴算子 $L$ 的一般事实——互易性即 $G(x, \xi) = G(\xi, x)$，两者合起来就是算子的自伴性，这正是斯图姆–刘维尔理论的内容。
:::
:::

::: exercise level=2
弦长 $L = 1\,\mathrm{m}$、张力 $T = 50\,\mathrm{N}$，在 $\xi = 0.25$ 处受点力 $F = 1\,\mathrm{N}$。求 $x = 0.5$ 与 $x = 0.25$ 处的挠度。
check="0.00375"
hint="u = F/T * G；x > xi 时 G(0.5, 0.25) 为 0.25*(1-0.5)；G(0.25, 0.25) = 0.25*0.75."
::: solution
$G(0.5, 0.25)$：$x > \xi$，$G = \xi(L - x)/L = 0.25 \times 0.5/1 = 0.125$。$G(0.25, 0.25) = 0.25 \times 0.75 = 0.1875$。于是（$F/T = 1/50 = 0.02$）挠度为

$$
u(0.5) = 0.02 \times 0.125 = 2.5 \times 10^{-3}\,\mathrm{m}, \qquad
u(0.25) = 0.02 \times 0.1875 = 3.75 \times 10^{-3}\,\mathrm{m},
$$

验证值 $3.75 \times 10^{-3}$ 正是载荷处 $x = 0.25$ 的挠度。
:::
:::

::: exercise level=2
振子的因果格林函数，$\omega_0 = 1\,\mathrm{rad/s}$，初始静止。求在 $t_0 = 0.5$ 处受冲量 $F_0 = 3$ 时，$t = 2$ 处的位移。
hint="y = F0/omega0 * sin(omega0 (t - t0))."
::: solution
$y(t) = \frac{F_0}{\omega_0} \sin \omega_0 (t - t_0) = 3 \sin(2 - 0.5) \cdot 1 \cdot ... $ 直接算，$F_0/\omega_0 = 3$，$y(2) = 3 \sin(1.5) \approx 3 \times 0.997 \approx 2.99$。位移就是自由振荡，振幅 $F_0/\omega_0 = 3$；内容即 [[#ex-impulse]] 的冲量响应，同样的数学换一组数。
:::
:::

::: exercise level=2
证明一维亥姆霍兹格林函数 [[#eq-helm-g]] 满足 $G'' + k^2 G = \delta(x - \xi)$：在分布意义下计算 $G''$，$x = \xi$ 处的折角给出 $\delta$。
hint="x > xi 时 G = e^{ik(x-xi)}/(2ik)，x < xi 时 e^{ik(xi-x)}/(2ik)；G' 在 xi 处跳跃 1；G'' 是 -k^2 G 加上跳跃给出的 delta。"
::: solution
$x > \xi$ 时 $G = e^{ik(x - \xi)}/(2ik)$，$G' = k e^{ik(x - \xi)}/(2ik) = e^{ik(x - \xi)}/2$，$G'' = ik e^{ik(x - \xi)}/2 = -k^2 G \cdot ... $ 直接算，$G'' = ik G' = ik e^{ik(x-\xi)}/2 = -k^2 G$（因为 $G = e^{ik(x-\xi)}/(2ik)$，$-k^2 G = -k^2 e^{ik(x-\xi)}/(2ik) = -k e^{ik(x-\xi)}/2 \cdot i/i \cdot ... $ 干脆的检验是 $G''/G = (ik)^2 = -k^2$，所以 $x > \xi$ 时 $G'' = -k^2 G$。同理，$x < \xi$ 时也有 $G'' = -k^2 G$。在 $x = \xi$ 处 $G'$ 有跳跃：$G'(\xi^+) = e^0/2 = 1/2$，$G'(\xi^-) = (k e^{ik(\xi - \xi)}/(2ik)) \cdot (-1)$……第二段 $G = e^{ik(\xi - x)}/(2ik)$，$G' = -ke^{ik(\xi-x)}/(2ik) = -e^{ik(\xi-x)}/2$，在 $x = \xi$ 处：$G'(\xi^-) = -1/2$。跳跃为 $1/2 - (-1/2) = 1$，于是 $G''$ 含有 $\delta$ 项 $1 \cdot \delta(x - \xi)$，加上两侧的 $-k^2 G$，所以 $G'' + k^2 G = \delta(x - \xi)$，正如要求。出射条件——$x \to +\infty$ 时 $G \sim e^{ikx}/(2ik)$——是沿 $+x$ 传播的波，采用 $e^{-i\omega t}$ 约定；$x \to -\infty$ 时取其镜像——两者合起来就是离开源向外传播，这正是 [[#prop-helm]] 证明的内容。
:::
:::

::: exercise level=3
用半径 $\epsilon$ 小球面上的散度定理并取极限 $\epsilon \to 0$，在分布意义下证明 $-\nabla^2 (1/(4\pi r)) = \delta(\mathbf{x})$。
hint="r > 0 时 1/r 是调和的；把 -nabla^2 (1/4pi r) 在半径 epsilon 的球上积分，用散度定理化成 -grad(1/4pi r) 过球面的通量。"
::: solution
$r > 0$ 时 $\nabla^2 (1/r) = 0$，正文已经指出，所以 $r > 0$ 时 $-\nabla^2 (1/(4\pi r)) = 0$，$\delta$ 在 $r = 0$ 处。为确定系数，把 $-\nabla^2 (1/(4\pi r))$ 在半径 $\epsilon$ 的球 $B_\epsilon$ 上积分：

$$
\int_{B_\epsilon} -\nabla^2 \frac{1}{4\pi r}\, dV = -\oint_{\partial B_\epsilon} \nabla \frac{1}{4\pi r} \cdot d\mathbf{S}.
$$

$\nabla (1/(4\pi r)) = -\hat{\mathbf{r}}/(4\pi r^2)$，而在球面上 $d\mathbf{S} = \hat{\mathbf{r}} \epsilon^2 d\Omega$，故通量为

$$
-\oint \left(-\frac{\hat{\mathbf{r}}}{4\pi \epsilon^2}\right) \cdot \hat{\mathbf{r}} \, \epsilon^2 d\Omega = \frac{1}{4\pi} \oint d\Omega = \frac{1}{4\pi} \cdot 4\pi = 1.
$$

于是对每个 $\epsilon$ 都有 $\int_{B_\epsilon} -\nabla^2(1/(4\pi r))\, dV = 1$，取极限 $\epsilon \to 0$ 得 $-\nabla^2(1/(4\pi r)) = \delta(\mathbf{x})$：原点处的 $\delta$，积分为 $1$。内容是：$1/(4\pi r)$ 就是自由空间中 $-\nabla^2$ 的格林函数；叠加给出静电势，与静电学课程算出的一致——源为 $f = \rho/\varepsilon_0$——两者合起来给出 $\Phi(\mathbf{x}) = \frac{1}{4\pi\varepsilon_0} \int \rho(\xi)/|\mathbf{x} - \xi| d^3\xi$，即标准表达式。
:::
:::

::: exercise level=3
两端固定的弦，$L = 1$，在 $\xi$ 处受点力 $F$，冲量之后的横向运动由波动方程描述。证明初始挠度 $u(x, 0) = (F/T) G(x, \xi)$ 按简正模 $u_n = \sin(n\pi x/L)$ 展开时，系数为 $c_n = \frac{2 F}{T} \int_0^L G(x, \xi) \sin(n\pi x)\, dx$，并对 $\xi = L/2$、$L = 1$ 计算 $c_1$。
hint="简正模就是 -d^2/dx^2 取狄利克雷边界条件的本征函数；c_n = 2 倍的 u sin(n pi x) 积分；对 xi = 1/2，G 关于 1/2 对称，积分就是帐篷函数的傅里叶正弦系数。"
::: solution
固定弦的简正模是 $\sin(n\pi x/L)$，即 $-d^2/dx^2$ 在边界条件 $u(0) = u(L) = 0$ 下的本征函数，挠度展开为 $u(x, 0) = \sum c_n \sin(n \pi x)$。$c_n$ 是傅里叶正弦系数：$c_n = \frac{2}{L} \int_0^L u(x, 0) \sin(n \pi x / L)\, dx = \frac{2 F}{T} \int_0^L G(x, \xi) \sin(n \pi x / L)\, dx$（取 $L = 1$，即 $n\pi x$）。对 $\xi = 1/2$，$G(x, 1/2) = \min(x, 1 - x)/2 \cdot ... $ 直接算，$x \le 1/2$ 时 $G(x, 1/2) = x/2$，$x \ge 1/2$ 时 $(1 - x)/2$，于是积分

$$
\int_0^1 G(x, 1/2) \sin(n \pi x)\, dx = \int_0^{1/2} \frac{x}{2} \sin(n \pi x)\, dx + \int_{1/2}^1 \frac{1 - x}{2} \sin(n \pi x)\, dx.
$$

被积函数关于 $x = 1/2$ 是偶的（$G$ 是对称的，而 $\sin(n\pi x)$ 是……$n$ 为奇数时 $\sin(n\pi x)$ 关于 $1/2$ 对称，$n$ 为偶数时反对称，故偶数 $n$ 的积分为零）。对奇数 $n$，$n = 2m + 1$，两个积分相等，总和为

$$
\int_0^1 G(x, 1/2) \sin(n \pi x)\, dx = \int_0^{1/2} x \sin(n \pi x)\, dx \cdot 2/2 \cdot ... 
$$

直接算，由对称性 $\int_0^1 = 2 \int_0^{1/2} (x/2) \sin(n \pi x) dx = \int_0^{1/2} x \sin(n \pi x) dx$。利用 $\int x \sin(ax) dx = -x \cos(ax)/a + \sin(ax)/a^2$，取 $a = n\pi$：

$$
\int_0^{1/2} x \sin(n \pi x)\, dx = \left[ -\frac{x \cos(n \pi x)}{n \pi} + \frac{\sin(n \pi x)}{(n \pi)^2} \right]_0^{1/2} = -\frac{\cos(n \pi / 2)}{2 n \pi} + \frac{\sin(n \pi/2)}{(n \pi)^2}.
$$

$n = 1$ 时：$\cos(\pi/2) = 0$，$\sin(\pi/2) = 1$，积分为 $1/\pi^2$。于是 $c_1 = \frac{2F}{T} \cdot \frac{1}{\pi^2} = \frac{2F}{T \pi^2}$。奇数 $n$ 的 $c_n$ 是 $\frac{2F}{T} \cdot \frac{(-1)^{(n-1)/2} \cdot 2 \cdot ... }{(n\pi)^2} \cdot ... $ 干净的表达式：奇数 $n$ 时 $c_n = \frac{4 F (-1)^{(n-1)/2}}{T (n \pi)^2}$，偶数 $n$ 时 $c_n = 0$——帐篷函数的标准傅里叶级数。$c_1$ 最大，是基频模；内容与 [[oscillations/superposition]] 课程里拨弦的情形相同：初始挠度分解为各阶模，其后的运动就是各模独立振荡的叠加，频率为 $n \omega_1$，即谐波，初始条件是帐篷函数；两者合起来就是简正模分析的内容。
:::
:::
