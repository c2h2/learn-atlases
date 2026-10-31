在绳子一端甩一下，一个折结就朝另一只手跑去。折结到达时，甩出去的那只手早已停下，整根绳子也没有沿自身长度滑移。传过去的是一个形状。绳子的每一小段动了——主要朝横向——然后又回到原位。扰动的运动与物质的运动之间的这一区分，就是本章的全部内容。空气中的声音、弦上的波、长弹簧里的脉冲，是不同的介质运载同一类对象。

[[oscillations/simple-harmonic]] 中的振子只有一个自由度。一根绳子有许多个，由张力彼此牵连。扰动一段，相邻的一段迟一步跟随。这个迟延是一个传播时间，而单位距离的传播时间是波速的倒数。我们从移动形状的运动学出发，找出这类形状满足的偏微分方程，然后才专门化到张紧的均匀弦。牛顿第二定律——如同 [[mechanics/newton-laws]] 中那样——决定波速。能量记账——如同 [[mechanics/work-energy]] 中那样——决定波携带的功率。两列这样的波叠加以及它们形成的驻立图样，见 [[oscillations/superposition]]。

每一项提到弦的公式之下都有两项建模假设。弦是完全柔软的，因而只承受张力而不承受弯矩；斜率是小量，因而运动是横向的，张力也保持在平衡值附近。刚性杆违反第一条。两个极限都在公式不再适用之处再次点名。

## 平移的波形

设弦的平衡位置沿 $x$ 轴，$y(x,t)$ 是平衡位置在 $x$ 处那一段弦的横向位移。一个刚性形状以恒定速率 $v > 0$ 向右移动，就是单个组合 $x - vt$ 的函数。

::: definition 平移的波形 {#def-profile}
设 $f$ 是一个二阶可导的一元函数，$v$ 为正常数。波形

$$
y(x,t) = f(x - vt)
$$ {#eq-right}

是速率为 $v$ 的**右行波**。波形

$$
y(x,t) = g(x + vt)
$$ {#eq-left}

是速率为 $v$ 的**左行波**。两种情形下，**波形曲线**都是 $f$（或 $g$）的图像，**波速**是 $v$。
:::

对于以 $\mathrm{d}x/\mathrm{d}t = v$ 移动的观察者，参量 $x - vt$ 保持不变。那位观察者看到 $f$ 的一个固定值，从而看到一个固定的高度。一个波峰、一个零点、或波形曲线上任何带标记的特征，都以速率 $v$ 向 $x$ 增大的方向移动。对 [[#eq-left]]，保持 $x + vt$ 不变的观察者有 $\mathrm{d}x/\mathrm{d}t = -v$，所以特征向 $x$ 减小的方向移动。定义中没有一处说质点以速率 $v$ 运动。质点守在自己的 $x$ 上，只改变 $y$——除非波是纵波，这种情形我们稍后只回头为它命名。

::: theorem 平移的波形满足波动方程 {#thm-profile}
设 $v > 0$ 为常数，$f$ 二阶可导。则 $y = f(x - vt)$ 在每个导数存在的 $(x,t)$ 处满足

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}
$$ {#eq-wave}

$y = g(x + vt)$ 满足同一方程；并且由线性，一列右行波形与一列左行波形的和也满足。
:::

::: proof
令 $\xi = x - vt$，$y = f(\xi)$。链式法则给出

$$
\pdv{y}{x} = f'(\xi), \qquad \frac{\partial^2 y}{\partial x^2} = f''(\xi),
$$

以及

$$
\pdv{y}{t} = -v f'(\xi), \qquad \frac{\partial^2 y}{\partial t^2} = v^2 f''(\xi).
$$

消去 $f''(\xi)$ 便得到 [[#eq-wave]]。对左行波形令 $\eta = x + vt$。则 $\partial y/\partial t = v g'(\eta)$ 且 $\partial^2 y/\partial t^2 = v^2 g''(\eta)$，而 $\partial^2 y/\partial x^2 = g''(\eta)$，所以同一关系成立。若 $y_1$ 与 $y_2$ 各自满足 [[#eq-wave]]，则 $c_1 y_1 + c_2 y_2$ 也满足，因为方程中的每个求导都是线性的，而 $v$ 对两列波是同一个常数。因此一列右行波形与一列左行波形的和是一个解。
:::

方程不在乎 $f$ 的形状。光滑的鼓包、打磨到二阶可导的折结、正弦波，都是同等地位的解，只要它们以同一速率 $v$ 移动而不变形。这个共同的速率，正是波无色散的含义。若速率依赖于鼓包的宽度，一般的 $f$ 就保持不住形状，单个 $f(x - vt)$ 也就不是正确的描述。下面导出的理想弦是无色散的。刚性杆不是。

::: example 以每秒八米行进的鼓包 {#ex-pulse}
一根长弦携带横向位移

$$
y(x,t) = \frac{0.040}{1 + (x - 8.0\, t)^2},
$$

其中 $y$ 与 $x$ 以米计，$t$ 以秒计。指出方向与波速。求 $t = 2.50\,\mathrm{s}$ 时波峰的位置，以及波形曲线上的最大斜率。并判断小斜率假设对这个脉冲是否从容。
::: solution
位移只通过 $\xi = x - 8.0\, t$ 依赖 $x$ 与 $t$，所以 [[#def-profile]] 说脉冲以 $v = 8.0\,\mathrm{m/s}$ 向 $x$ 增大的方向传播。波峰是 $f(\xi) = 0.040/(1 + \xi^2)$ 的最大值，位于 $\xi = 0$。在 $t = 2.50\,\mathrm{s}$ 时波峰在 $x = 8.0\times 2.50 = 20.0\,\mathrm{m}$ 处。

固定 $t$ 时的斜率是 $f'(\xi)$。用商法则求导，

$$
f'(\xi) = 0.040\cdot\frac{-2\xi}{(1 + \xi^2)^2}.
$$

为求绝对值的最大，先在 $\xi > 0$ 上最大化 $h(\xi) = \xi/(1 + \xi^2)^2$，再乘以因子 $2$ 翻倍。$h'$ 的分子含有因子 $1 - 3\xi^2$，所以正的临界点是 $\xi = 1/\sqrt{3}$。在该处

$$
h\left(\frac{1}{\sqrt{3}}\right) = \frac{1/\sqrt{3}}{(1 + 1/3)^2} = \frac{1/\sqrt{3}}{16/9} = \frac{9}{16\sqrt{3}} = \frac{3\sqrt{3}}{16}.
$$

因此最大斜率的绝对值为

$$
\abs{f'}_{\max} = 0.040\cdot 2\cdot\frac{3\sqrt{3}}{16} = 0.040\cdot\frac{3\sqrt{3}}{8} = 0.0260.
$$

斜率 $0.026$ 弧度，约 $1.5^\circ$，远小于 $1$ 弧度。下一节的小斜率模型对这个脉冲是从容的：那里引入的几何近似的误差为 $(0.026)^2$ 量级，即万分之几。[[#thm-profile]] 已经保证该脉冲对这个 $v$ 满足 [[#eq-wave]]，无论承载它的是不是弦。弦将告诉我们，$8.0\,\mathrm{m/s}$ 必须等于 $\sqrt{\tau/\mu}$。
:::
:::

## 波动方程

[[#eq-wave]] 是线性的、二阶的、常系数的。它值得命名，也值得一般地求解，因为行进的波形不只是例子。在无限长线上，二阶可导的解全都是这类波形。

::: definition 波动方程 {#def-wave}
设 $v > 0$ 为常数。当二阶可导函数 $y(x,t)$ 在所讨论的 $(x,t)$ 平面区域内处处满足

$$
\frac{\partial^2 y}{\partial x^2} = \frac{1}{v^2}\frac{\partial^2 y}{\partial t^2}
$$

时，称它满足速率为 $v$ 的**一维波动方程**。**简谐波**是波形为正弦的特例，下面处理。
:::

方程与 $\partial^2 y/\partial t^2 = v^2\,\partial^2 y/\partial x^2$ 是同一句话，两种形式在文献中都有出现。我们把 [[#eq-wave]] 保留为标准形式，因为教学大纲里与行进波形的对照就是这样写的。波速 $v$ 是介质的属性，不是某个特定解的属性。骑在同一介质上的两个不同形状的波形共享它。

::: theorem 达朗贝尔通解 {#thm-dalembert}
设 $v > 0$，$y(x,t)$ 对一切实数 $x$ 以及对处于某个开区间内的 $t$ 二阶连续可导。则 $y$ 满足 [[#eq-wave]] 当且仅当存在二阶可导的一元函数 $f$ 与 $g$ 使得

$$
y(x,t) = f(x - vt) + g(x + vt).
$$ {#eq-general}
:::

::: proof
[[#thm-profile]] 已经表明这一形式的每个函数都满足波动方程。反过来是一次坐标变换。令 $\xi = x - vt$、$\eta = x + vt$。映射 $(x,t)\mapsto(\xi,\eta)$ 是线性的且可逆，$x = (\xi + \eta)/2$，$t = (\eta - \xi)/(2v)$。把 $y$ 写成 $\xi$ 与 $\eta$ 的函数。链式法则给出

$$
\pdv{y}{x} = \pdv{y}{\xi} + \pdv{y}{\eta},
$$

并且，由于 $C^2$ 函数的混合二阶偏导数相等，

$$
\frac{\partial^2 y}{\partial x^2} = \frac{\partial^2 y}{\partial\xi^2} + 2\frac{\partial^2 y}{\partial\xi\,\partial\eta} + \frac{\partial^2 y}{\partial\eta^2}.
$$

对时间，

$$
\pdv{y}{t} = -v\pdv{y}{\xi} + v\pdv{y}{\eta}.
$$

再求一次导，并使用 $\partial/\partial t = -v\,\partial/\partial\xi + v\,\partial/\partial\eta$，得到

$$
\frac{\partial^2 y}{\partial t^2} = v^2\left(\frac{\partial^2 y}{\partial\xi^2} - 2\frac{\partial^2 y}{\partial\xi\,\partial\eta} + \frac{\partial^2 y}{\partial\eta^2}\right).
$$

代入 [[#eq-wave]]。纯二阶导数相互抵消，剩下

$$
4\frac{\partial^2 y}{\partial\xi\,\partial\eta} = 0.
$$

于是 $\partial y/\partial\xi$ 与 $\eta$ 无关：它只是某个函数 $A(\xi)$。对 $\xi$ 积分得 $y = f(\xi) + g(\eta)$，其中 $f' = A$，而积分"常数"仍可依赖 $\eta$。还原原始变量即得 [[#eq-general]]。
:::

假设是要紧的。用到二阶连续可导，是为了混合偏导可交换、链式法则按经典意义成立。用到无限长线，是为了 $\xi$ 与 $\eta$ 自由取值。两端固定的有限长弦，是同一偏微分方程画在一条带上，配上挑选出离散形状的边界条件。那个问题是 [[oscillations/superposition]]。拨动的吉他弦并不与 [[#thm-dalembert]] 矛盾：两端的反射可以表示为更多左右行的部件，我们舍弃的只是无限长线的理想化。

给定初始位移与初始横向速度，$f$ 与 $g$ 就被确定了。

::: corollary 无限长线上的初值问题 {#cor-ivp}
设 $y$ 满足 [[#thm-dalembert]] 的假设，并设给定初始数据

$$
y(x,0) = \phi(x), \qquad \pdv{y}{t}(x,0) = \psi(x)
$$

其中 $\phi$ 二阶可导、$\psi$ 可导。则对每个 $x$ 与存在区间内每个其后的 $t$，

$$
y(x,t) = \frac{\phi(x - vt) + \phi(x + vt)}{2} + \frac{1}{2v}\int_{x - vt}^{x + vt}\psi(s)\,\dd s.
$$ {#eq-ivp}
:::

::: proof
由 [[#thm-dalembert]]，$y = f(x - vt) + g(x + vt)$。在 $t = 0$ 处，

$$
f(x) + g(x) = \phi(x).
$$

对 $t$ 求导，然后令 $t = 0$：

$$
-v f'(x) + v g'(x) = \psi(x),
$$

所以 $g'(x) - f'(x) = \psi(x)/v$。从 $0$ 到 $x$ 积分：

$$
g(x) - f(x) = \frac{1}{v}\int_0^x \psi(s)\,\dd s + g(0) - f(0).
$$

把这一恒等式与 $f + g = \phi$ 相加、相减。常数 $f(0)$ 与 $g(0)$ 可以安排得与 $\phi(0) = f(0) + g(0)$ 相容；它们在下面组合中抵消，于是得到

$$
\begin{aligned}
f(x) &= \frac{1}{2}\phi(x) - \frac{1}{2v}\int_0^x\psi(s)\,\dd s + C,\\
g(x) &= \frac{1}{2}\phi(x) + \frac{1}{2v}\int_0^x\psi(s)\,\dd s - C,
\end{aligned}
$$

其中 $C$ 为常数。现在计算 $f(x - vt) + g(x + vt)$。常数抵消，两个积分合并成从 $x - vt$ 到 $x + vt$ 的一个积分：

$$
y(x,t) = \frac{\phi(x - vt) + \phi(x + vt)}{2} + \frac{1}{2v}\int_{x - vt}^{x + vt}\psi(s)\,\dd s,
$$

即 [[#eq-ivp]]。
:::

若弦从静止释放，$\psi = 0$，公式塌缩为初始波形曲线在 $x - vt$ 与 $x + vt$ 两处取值的平均。初始的鼓包分裂成两个高度减半的副本，一边一个跑去。这正是下一个例题的内容。

::: example 从静止释放的三角形鼓包 {#ex-split}
一根无限长弦的波速为 $v = 4.00\,\mathrm{m/s}$。$t = 0$ 时横向速度为零，且当 $\abs{x}\le 2.00\,\mathrm{m}$ 时位移为 $\phi(x) = 0.030\,(1 - \abs{x}/2)$，其余地方 $\phi(x) = 0$，$\phi$ 以米计。求 $y(2.00, 0.50)$，并描述该时刻的形状。
::: solution
初始速度为零，所以 [[#eq-ivp]] 约化为

$$
y(x,t) = \frac{\phi(x - 4.00\, t) + \phi(x + 4.00\, t)}{2}.
$$

在 $x = 2.00\,\mathrm{m}$、$t = 0.50\,\mathrm{s}$ 处，取样点为 $x - vt = 0$ 与 $x + vt = 4.00\,\mathrm{m}$。前一个点落在 $\phi$ 的峰值处，所以 $\phi(0) = 0.030\,\mathrm{m}$。后一个点落在初始支集之外，所以 $\phi(4.00) = 0$。因此

$$
y(2.00, 0.50) = \frac{0.030 + 0}{2} = 0.0150\,\mathrm{m}.
$$

此刻右行的半个鼓包占据 $0 \le x \le 4.00\,\mathrm{m}$，因为原始支集 $\abs{x}\le 2$ 被平移了 $vt = 2.00\,\mathrm{m}$；左行的半个鼓包占据 $-4.00 \le x \le 0$。它们在 $x = 0$ 处相接，该处高度为零——意思是每份副本在另一份的外端都不贡献什么；在 $x = 0$ 处两个取样点都在 $\abs{\xi} = 2$，那里 $\phi = 0$，所以弦的中心恰好回到平衡位置。每个行进的副本高 $0.0150\,\mathrm{m}$，为原峰值的一半，这就是右行副本峰顶处的值为 $0.0150\,\mathrm{m}$ 而不是 $0.030\,\mathrm{m}$ 的原因。
:::
:::

$\phi$ 的尖角不可二阶求导，所以这个初始形状稍微处在 [[#cor-ivp]] 之外。尖角仍以速率 $v$ 行进，直线段满足波动方程。下面的计算凡是需要二阶导数时，波形都是正弦的。

::: quiz
一根长弦上的横向波具有形式 $y = f(x - vt)$，其中 $v > 0$。哪种描述是对的？
- [ ] 波形曲线向 $x$ 减小的方向移动，绳上每个质点以速率 $v$ 向 $x$ 减小的方向漂移。
- [x] 波形曲线以速率 $v$ 向 $x$ 增大的方向移动，而绳上每个质点作横向振动，并不随波形曲线一起移动。
- [ ] 波形曲线静止不动，$v$ 是绳上质点的最大速率。
- [ ] 因为 $x$ 与 $t$ 都出现，公式描述的是驻波。
::: solution
由 [[#def-profile]]，右行波的相位不变意味着 $x - vt$ 不变，所以 $f$ 上带标记的特征以速率 $v$ 向 $x$ 增大的方向移动。绳上的质点是固定的 $x$，它只改变 $y$。它的速率是 $\abs{\partial y/\partial t}$，对简谐波至多为 $\omega A$，而不是 $v$。驻波需要一列右行波形与一列左行波形，那是 [[oscillations/superposition]] 的主题。
:::
:::

## 简谐波

后面每一章都会回来的波形，是正弦的那些。它们是有限长弦的简正模，是携带确定频率的载体，也是功率能够被封闭地求平均的波。

::: definition 简谐行波 {#def-harmonic}
振幅为 $A > 0$、角波数为 $k > 0$、角频率为 $\omega > 0$、向 $x$ 增大方向传播的**简谐行波**是

$$
y(x,t) = A\cos(kx - \omega t).
$$ {#eq-harmonic}

**波长** $\lambda$ 是空间周期，**频率** $f$ 是周期 $T$ 的倒数，这些量与 $k$、$\omega$ 的关系为

$$
k = \frac{2\pi}{\lambda}, \qquad \omega = \frac{2\pi}{T} = 2\pi f.
$$ {#eq-kw}

**相速度**是波峰移动的速率。可以在余弦内部加上一个相位平移 $\varphi$ 而不改变 $A$、$k$ 或 $\omega$；它记录的是原点的选择。
:::

把 [[#eq-harmonic]] 与 [[#eq-right]] 比较。余弦通过 $k(x - (\omega/k) t)$ 依赖 $x$ 与 $t$，所以波形曲线是正弦的，而只要这个比值等于介质的 $v$，波速就是 $\omega/k$。使简谐波适配 [[#eq-wave]] 的条件，正是无色散介质的色散关系。

::: proposition 无色散介质的色散关系 {#prop-dispersion}
简谐波 [[#eq-harmonic]] 以速率 $v$ 满足 [[#eq-wave]]，当且仅当

$$
\omega = vk, \qquad v = \lambda f, \qquad k = \frac{2\pi}{\lambda}.
$$ {#eq-dispersion}

相速度是 $\omega/k$。它是波的属性；并且在这个无色散情形下，它等于 [[#eq-wave]] 中早已出现的那个速率。它不是介质质点的速度。
:::

::: proof
对 $y = A\cos(kx - \omega t)$，

$$
\frac{\partial^2 y}{\partial x^2} = -k^2 y, \qquad \frac{\partial^2 y}{\partial t^2} = -\omega^2 y,
$$

除了那些人们宁愿先求导再回代 $y$ 本身的时刻；把 $y$ 换成余弦，同一组恒等式照样成立。代入 [[#eq-wave]] 得对一切 $(x,t)$ 有 $-k^2 y = (1/v^2)(-\omega^2 y)$，于是 $\omega^2 = v^2 k^2$。按符号约定 $k > 0$、$\omega > 0$、$v > 0$，这就是 $\omega = vk$。关系 $k = 2\pi/\lambda$ 与 $\omega = 2\pi f$ 即 [[#eq-kw]]，两式相除得 $v = \omega/k = \lambda f$。

波峰是 $kx - \omega t$ 等于 $2\pi$ 的某个固定倍数的点。把这一约束对 $t$ 求导得 $k\,\mathrm{d}x/\mathrm{d}t - \omega = 0$，所以波峰以 $\mathrm{d}x/\mathrm{d}t = \omega/k$ 移动。介质的质点守在固定的 $x$ 处，其横向速度为 $\partial y/\partial t = \omega A\sin(kx - \omega t)$，最大绝对值为 $\omega A$。没有任何东西把 $\omega A$ 定为 $v$。
:::

质点速度与相速度回答的是不同的问题。相速度说波峰何时到达；质点速度说波峰经过时绳子横向移动得多快。在一切普通的弦波中 $\omega A$ 都远小于 $v$，因为 $\omega A/v = kA$，而 $kA$ 正是最大斜率。小斜率假设正是 $\omega A \ll v$。

::: example 从简谐波公式读数 {#ex-read}
一根长弦上的横向波为

$$
y(x,t) = 0.025\cos(4\pi x - 20\pi t),
$$

其中 $y$ 与 $x$ 以米计，$t$ 以秒计。求振幅、波长、频率、相速度与传播方向。再求绳上质点的最大横向速率。
::: solution
把公式与 [[#eq-harmonic]] 对照。振幅为 $A = 0.025\,\mathrm{m}$。波数为 $k = 4\pi\,\mathrm{rad/m}$，角频率为 $\omega = 20\pi\,\mathrm{rad/s}$。由 [[#eq-kw]] 得

$$
\lambda = \frac{2\pi}{k} = \frac{2\pi}{4\pi} = 0.500\,\mathrm{m}, \qquad f = \frac{\omega}{2\pi} = \frac{20\pi}{2\pi} = 10.0\,\mathrm{Hz}.
$$

相速度为

$$
v = \frac{\omega}{k} = \frac{20\pi}{4\pi} = 5.00\,\mathrm{m/s},
$$

并且由于相位是 $kx - \omega t$，波向 $x$ 增大的方向传播。作为核对，$\lambda f = 0.500\times 10.0 = 5.00\,\mathrm{m/s}$。

质点的横向速度为 $\partial y/\partial t = 0.025\cdot 20\pi\sin(4\pi x - 20\pi t)$。其最大绝对值为

$$
\omega A = 20\pi\times 0.025 = 0.500\pi = 1.57\,\mathrm{m/s}.
$$

这小于相速度 $5.00\,\mathrm{m/s}$。最大斜率为 $kA = 4\pi\times 0.025 = 0.314$，约 $18^\circ$，已接近下面计算功率所用小斜率模型的边缘。对 $A$、$\lambda$、$f$ 与 $v$ 的运动学读数并不需要那个模型。
:::
:::

## 弦上的波

波速 $v$ 到目前为止只是一个参数。对以张力 $\tau$ 张紧、线密度为 $\mu$ 的均匀弦，对一小段微元应用牛顿第二定律就定出 $v = \sqrt{\tau/\mu}$。论证是局域的，而小斜率假设正是使运动保持横向、张力保持恒定的那一步。

考察平衡位置从 $x$ 延伸到 $x + \dd x$ 的微元。它的质量是 $\mu\,\dd x$。设 $\theta(x,t)$ 是切线与 $x$ 轴的夹角，于是

$$
\tan\theta = \pdv{y}{x}.
$$

小斜率假设是处处 $\abs{\partial y/\partial x}\ll 1$，它迫使以弧度计的 $\abs{\theta}\ll 1$。于是 $\sin\theta \approx \tan\theta \approx \theta \approx \partial y/\partial x$ 且 $\cos\theta \approx 1$，相对误差为 $\theta^2$ 量级。

张力在微元两端沿弦的切线方向拉它，大小为 $\tau$。我们取 $\tau$ 为平衡张力。倾斜微元相对 $\dd x$ 的额外长度为 $\bigl(\sqrt{1 + (\partial y/\partial x)^2} - 1\bigr)\dd x \approx \tfrac12 (\partial y/\partial x)^2\,\dd x$，是斜率的二阶量。在我们保留的阶上，弦在平衡伸长之外并没有被拉伸，$\tau$ 沿微元不变。

在右端，外切线贡献水平方向 $\tau\cos\theta$ 与横向 $\tau\sin\theta$。在左端，内切线贡献相反的两者，取左端角度处的值。水平方向合力为 $\tau\cos\theta(x+\dd x) - \tau\cos\theta(x)$。由于 $\cos\theta$ 与 $1$ 只差一个二阶量，这个差可以忽略，微元在这一阶没有纵向加速度。运动保持横向。

横向合力为

$$
\tau\sin\theta(x+\dd x) - \tau\sin\theta(x) \approx \tau\pdv{}{x}\!\left(\pdv{y}{x}\right)\dd x = \tau\frac{\partial^2 y}{\partial x^2}\,\dd x.
$$

质量为 $\mu\,\dd x$ 的微元上的牛顿第二定律于是写作

$$
\mu\,\dd x\,\frac{\partial^2 y}{\partial t^2} = \tau\frac{\partial^2 y}{\partial x^2}\,\dd x.
$$

约去非零的 $\dd x$ 并整理：

$$
\frac{\partial^2 y}{\partial x^2} = \frac{\mu}{\tau}\frac{\partial^2 y}{\partial t^2}.
$$

这就是取 $1/v^2 = \mu/\tau$ 的 [[#eq-wave]]。

::: theorem 均匀弦上的波速 {#thm-string}
考虑线密度 $\mu > 0$、张力 $\tau > 0$ 的均匀柔软弦。设斜率满足 $\abs{\partial y/\partial x}\ll 1$，使张力可作为恒定的平衡张力处理、运动可作为横向运动处理。则小的横向扰动以速率

$$
v = \sqrt{\frac{\tau}{\mu}},
$$ {#eq-speed}

传播，且 $y$ 以该速率满足波动方程 [[#eq-wave]]。
:::

::: proof
上面几段就是论证。一句话：斜率小时，长 $\dd x$ 的微元所受横向合力为 $\tau(\partial^2 y/\partial x^2)\,\dd x$，质量为 $\mu\,\dd x$，牛顿第二定律令 $\mu\,\partial^2 y/\partial t^2$ 等于 $\tau\,\partial^2 y/\partial x^2$。与 [[#eq-wave]] 对照得 $v^2 = \tau/\mu$。正平方根是波速。方向由选择 $f(x - vt)$ 还是 $g(x + vt)$ 携带，而不是由 $v$ 的符号携带。
:::

越重的弦波速越小；越紧的弦波速越大。只要斜率保持小量，振幅就不出现，所以同样形状的高波与矮波结伴同行。若弦抵抗弯曲，或者二阶伸长改变了张力，这一点便告失效。

::: example 张力为十六牛顿的弦 {#ex-string}
一根均匀弦线密度 $\mu = 0.00400\,\mathrm{kg/m}$，保持张力 $\tau = 16.0\,\mathrm{N}$。一列振幅 $A = 5.00\,\mathrm{mm}$、频率 $f = 40.0\,\mathrm{Hz}$ 的简谐行波沿它传播。求波速、角频率、波长、波数、最大斜率，以及质点的最大横向速率。检验小斜率假设。
::: solution
由 [[#eq-speed]] 得

$$
v = \sqrt{\frac{\tau}{\mu}} = \sqrt{\frac{16.0}{0.00400}} = \sqrt{4000} = 63.24555\ldots\,\mathrm{m/s}.
$$

三位有效数字，$v = 63.2\,\mathrm{m/s}$。频率为 $40.0\,\mathrm{Hz}$，所以角频率用 $\pi$ 精确表示：

$$
\omega = 2\pi f = 80\pi = 251.327\ldots\,\mathrm{rad/s},
$$

三位有效数字即 $251\,\mathrm{rad/s}$。波长与波数为

$$
\lambda = \frac{v}{f} = \frac{\sqrt{4000}}{40.0} = 1.58114\ldots\,\mathrm{m}, \qquad k = \frac{\omega}{v} = \frac{80\pi}{\sqrt{4000}} = 3.97384\ldots\,\mathrm{rad/m}.
$$

三位有效数字下 $\lambda = 1.58\,\mathrm{m}$、$k = 3.97\,\mathrm{rad/m}$。若在 $k = 2\pi f/v$ 中使用取整后的波速 $63.2\,\mathrm{m/s}$，并且舍入过早、随后又舍一次，会得到 $3.98\,\mathrm{rad/m}$；精确商按一致三位有效数字的取值是 $3.97\,\mathrm{rad/m}$。

振幅为 $A = 5.00\times 10^{-3}\,\mathrm{m}$。最大斜率与最大质点速率为

$$
kA = 0.01987, \qquad \omega A = 1.2566\ldots\,\mathrm{m/s}.
$$

三位有效数字下质点速率达 $1.26\,\mathrm{m/s}$，约为波速 $63.2\,\mathrm{m/s}$ 的五十分之一。最大斜率为 $0.0199$，略小于 $1.2^\circ$。小斜率假设状态良好，$v = \sqrt{\tau/\mu}$ 是应当使用的波速。这列波携带的平均功率，等功率公式到手后在 [[#ex-energy]] 中计算。
:::
:::

下图在波数为 $2$、角频率为 $3$ 的一套单位制中画出一列右行简谐波。

::: widget wave
A: 1
B: 0
k: 2
w: 3
caption: B = 0 时只画出右行波。相速度是 w/k = 1.5（按图的单位）：波峰每个时间单位移动一个半长度单位。分别改变 k 与 w，注意那个速率；它不是曲线上某一点上下振动的速率。把 B 向 A 调高，波形曲线就不再行进。振幅相等时是驻波，下一讲处理，且不带净功率。
:::

## 能量与功率

行波把能量携过一处截面，尽管绳子本身并不流过那个截面。携带者是张力对截面下游一侧做功。

固定一点 $x$，考察该点左侧的弦对右侧的弦交付的功率。左段以大小为 $\tau$、沿切线朝左的力拉右段。小斜率假设下该力的横向分量为 $-\tau\sin\theta \approx -\tau\,\partial y/\partial x$：斜率为正意味着左段把右段往下拉。截面处介质的横向速度为 $\partial y/\partial t$。力乘以速度，过截面交付的功率于是为

$$
P = -\tau\pdv{y}{x}\pdv{y}{t}.
$$ {#eq-power-inst}

符号约定是：能量朝 $x$ 增大方向流动时 $P > 0$。

::: proposition 弦上行波的功率 {#prop-power}
设 [[#thm-string]] 的小斜率弦张力为 $\tau$、线密度为 $\mu$，并写 $v = \sqrt{\tau/\mu}$。

对右行波形 $y = f(x - vt)$，过任一截面的瞬时功率为

$$
P = \tau v\left(f'(x - vt)\right)^2 \ge 0.
$$

对左行波形 $y = g(x + vt)$，功率为 $-\tau v (g')^2 \le 0$。

对简谐波 $y = A\cos(kx - \omega t)$（$\omega = vk$），$P$ 在一个周期上的平均为

$$
\langle P\rangle = \tfrac12\mu v\omega^2 A^2.
$$ {#eq-power-avg}

等价地 $\langle P\rangle = \tfrac12\tau k\omega A^2$。这列波上单位长度的平均能量为 $\tfrac12\mu\omega^2 A^2$，而平均功率等于这个线密度乘以 $v$。
:::

::: proof
对 $y = f(x - vt)$ 有 $\partial y/\partial x = f'$ 且 $\partial y/\partial t = -v f'$。代入 [[#eq-power-inst]]：

$$
P = -\tau(f')(-v f') = \tau v (f')^2,
$$

非负。能量随波一起向右流动。对 $y = g(x + vt)$，导数为 $\partial y/\partial x = g'$ 与 $\partial y/\partial t = v g'$，所以 $P = -\tau v (g')^2 \le 0$。能量随波向左流动。

现在取 $y = A\cos(kx - \omega t)$，$\omega = vk$。则

$$
\pdv{y}{x} = -kA\sin(kx - \omega t), \qquad \pdv{y}{t} = \omega A\sin(kx - \omega t),
$$

[[#eq-power-inst]] 化为

$$
P = \tau k\omega A^2\sin^2(kx - \omega t).
$$

$\sin^2$ 在一个周期上的平均为 $\tfrac12$，所以 $\langle P\rangle = \tfrac12\tau k\omega A^2$。把 $\tau$ 换成 $\mu v^2$、$k$ 换成 $\omega/v$：

$$
\langle P\rangle = \tfrac12(\mu v^2)\left(\frac{\omega}{v}\right)\omega A^2 = \tfrac12\mu v\omega^2 A^2,
$$

即 [[#eq-power-avg]]。

剩下的是把它与弦上储存的能量对上账。微元的动能为 $\tfrac12(\mu\,\dd x)(\partial y/\partial t)^2$。势能是把微元克服张力拉伸所做的功。额外长度约为 $\tfrac12(\partial y/\partial x)^2\,\dd x$，所以储存的能量为 $\tfrac12\tau(\partial y/\partial x)^2\,\dd x$。在简谐波上，

$$
\mu\left(\pdv{y}{t}\right)^2 = \mu\omega^2 A^2\sin^2(kx - \omega t), \qquad \tau\left(\pdv{y}{x}\right)^2 = \tau k^2 A^2\sin^2(kx - \omega t).
$$

两者相等，因为 $\tau k^2 = \mu v^2 k^2 = \mu\omega^2$。动能密度与势能密度在每一瞬时都相等，而不只是平均相等。二者各自平均为 $\tfrac14\mu\omega^2 A^2$，因为 $\sin^2$ 的平均是 $\tfrac12$，而每个密度在能量的定义中已经带有一个因子 $\tfrac12$。于是单位长度的总平均能量为

$$
\langle u\rangle = \tfrac12\mu\omega^2 A^2.
$$

乘以波速就恢复了 $\langle P\rangle = \langle u\rangle v$。能量以波速行进。一个波长内的平均储存能为 $\langle u\rangle\lambda$，而在一周期内这份能量包向前移动一个波长，交付平均功率 $\langle u\rangle\lambda/T = \langle u\rangle v$。
:::

动能与势能密度相等用到了 $\omega = vk$ 与 $\tau = \mu v^2$。它是均匀弦上单列简谐波的属性，不是任意运动的属性。驻波在下面的警告里只用一段处理——它储存能量而不输送能量。

::: example 十六牛顿弦上的功率 {#ex-energy}
续 [[#ex-string]]：$\mu = 0.00400\,\mathrm{kg/m}$、$\tau = 16.0\,\mathrm{N}$、$A = 5.00\,\mathrm{mm}$、$f = 40.0\,\mathrm{Hz}$、$v = \sqrt{4000}\,\mathrm{m/s}$。求平均功率、单位长度的平均能量、一个波长内的平均能量，以及以平均功率输过截面 $1.00\,\mathrm{J}$ 所需的时间。
::: solution
使用 $\omega = 80\pi\,\mathrm{rad/s}$、$A = 5.00\times 10^{-3}\,\mathrm{m}$、$v = \sqrt{4000}$。由 [[#eq-power-avg]] 得

$$
\begin{aligned}
\langle P\rangle
&= \tfrac12\mu v\omega^2 A^2
= \tfrac12\times 0.00400\times\sqrt{4000}\times (80\pi)^2\times (5.00\times 10^{-3})^2\\
&= 0.19975\,\mathrm{W}.
\end{aligned}
$$

三位有效数字，$\langle P\rangle = 0.200\,\mathrm{W}$。同样的数可由 $\tfrac12\tau k\omega A^2$（取 $k = \omega/v$）得到，这是核对 $\tau = \mu v^2$ 保持一致的有用检验。瞬时功率在 $0$ 与 $2\langle P\rangle = 0.399\,\mathrm{W}$ 之间振荡，因为它携带 $\sin^2$，而 $\sin^2$ 的平均是峰值的一半。

单位长度的平均能量为

$$
\langle u\rangle = \tfrac12\mu\omega^2 A^2 = \frac{\langle P\rangle}{v} = 3.16\times 10^{-3}\,\mathrm{J/m}.
$$

一个波长为 $\lambda = v/f = 1.581\,\mathrm{m}$，所以一个波长内的平均能量为 $\langle u\rangle\lambda = 4.99\times 10^{-3}\,\mathrm{J}$。以平均速率交付 $1.00\,\mathrm{J}$ 所需的时间为

$$
t = \frac{1.00}{\langle P\rangle} = 5.01\,\mathrm{s},
$$

在 $40.0\,\mathrm{Hz}$ 下约二百个周期。波速为 $63.2\,\mathrm{m/s}$，所以在这些 $5.01\,\mathrm{s}$ 内通过截面的能量摊布在大约 $317\,\mathrm{m}$ 长的弦上，而 $317\times 3.16\times 10^{-3} \approx 1.00\,\mathrm{J}$。算术闭合。
:::
:::

不要在 [[#eq-power-avg]] 内部把 $\omega$ 换成 $f$。角频率是 $\omega = 2\pi f$，等价形式为 $\langle P\rangle = 2\pi^2\mu v f^2 A^2$。

::: warning 功率公式不适用的地方
平均功率 [[#eq-power-avg]] 属于均匀柔软弦上的单列简谐行波，处在 $v = \sqrt{\tau/\mu}$ 有意义的小斜率范围内。它不是"波的功率"的普适表达式。

驻波不输送净能量。振幅相等的右行简谐波与左行简谐波之和，

$$
y = A\cos(kx - \omega t) + A\cos(kx + \omega t) = 2A\cos(kx)\cos(\omega t),
$$

有

$$
\pdv{y}{x} = -2Ak\sin(kx)\cos(\omega t), \qquad \pdv{y}{t} = -2A\omega\cos(kx)\sin(\omega t).
$$

瞬时功率 [[#eq-power-inst]] 于是正比于 $\sin(2kx)\sin(2\omega t)$。$\sin(2\omega t)$ 在一个周期上的平均对每个 $x$ 都是零。能量在相邻的四分之一波长之间来回晃荡，任何截面上通过的平均能流为零。把 [[#eq-power-avg]] 用在驻波上，是凭空发明并不存在的输送。再把 $A$ 读成驻波振幅 $2A$ 而取因子 $\tfrac12\mu v\omega^2 A^2$，是第二个独立的错误。

不要对刚性杆使用 $v = \sqrt{\tau/\mu}$。杆或粗梁抵抗弯曲。在欧拉-伯努利（Euler–Bernoulli）模型中，弯曲项在横向力平衡中加入一项，正比于 $\partial^4 y/\partial x^4$，于是简谐波满足形如 $\omega^2 = (\tau/\mu)k^2 + (EI/\mu)k^4$ 的色散关系，其中 $EI$ 度量抗弯刚度。相速度 $\omega/k$ 依赖 $k$。窄脉冲——许多波数的一个波包——不保持形状，没有一个 $\sqrt{\tau/\mu}$ 能描述它。理想弦的波速是上述关系中弯曲项可忽略的极限，或因 $EI$ 很小，或因波长足够长使 $k^2 EI/\tau$ 很小。对受弯的金属杆引用 $\sqrt{\tau/\mu}$，忽略掉的是通常占主导的那一项。
:::

## 后续内容

[[oscillations/superposition]] 把这样两列波相加。等幅反向者驻立；频率近乎相等者成拍。长 $L$、两端固定的弦的简正模，是简谐波经反射折叠成的驻立形状，$\lambda_n = 2L/n$，而这些频率所用的波速仍是 [[#eq-speed]]。声波把 $\sqrt{\tau/\mu}$ 换成另一个表达式，见 [[oscillations/sound]]，但 $f(x - vt)$、简谐波与 $\lambda f$ 在这里原样保留。

[[oscillations/resonance]] 的受驱振子是一自由度版本。一只手在 $x = 0$ 处以 $y(0,t) = A\cos(\omega t)$ 被驱动，就发出一列 $k = \omega/v$ 的右行简谐波。在长弦上，振幅由手决定。当弦有限长且 $\omega$ 命中一个驻波模时，共振重新出现。

::: history 1747 年达朗贝尔的弦
1747 年，让·勒朗·达朗贝尔（Jean le Rond d'Alembert）导出了张紧振动弦的偏微分方程，并证明它的通解是一列任意的右行波形加上一列任意的左行波形。论文提交给了柏林科学院。这就是 [[#eq-wave]] 与 [[#eq-general]] 的起源。欧拉（Euler）愿意接受比达朗贝尔所允许的更粗糙的初始形状，而丹尼尔·伯努利（Daniel Bernoulli）更喜欢正弦模的和。那场争论在 [[oscillations/superposition]] 中接着讲。在理想弦上，以恒定速率行进的固定形状是每个解的一半。
:::

::: summary
- 波形曲线 $y = f(x - vt)$ 以速率 $v$ 向 $x$ 增大的方向行进而不改变形状。波形曲线 $y = g(x + vt)$ 向 $x$ 减小的方向行进。横波的介质质点并不以速率 $v$ 行进。
- 两种波形曲线都满足波动方程 $\partial^2 y/\partial x^2 = (1/v^2)\,\partial^2 y/\partial t^2$。在无限长线上，每个二阶连续可导的解都是两种波形曲线各一列之和。
- 初始位移 $\phi$ 与初始横向速度 $\psi$ 通过达朗贝尔公式 [[#eq-ivp]] 确定运动。从静止释放时，鼓包分裂成两个半高副本。
- 简谐波 $y = A\cos(kx - \omega t)$ 满足 $\omega = vk$、$v = \lambda f$ 与 $k = 2\pi/\lambda$。相速度是 $\omega/k$。最大质点速率是 $\omega A$，最大斜率是 $kA$。
- 在小斜率的均匀柔软弦上，对微元应用牛顿第二定律得 $v = \sqrt{\tau/\mu}$。这个公式不适用于刚性杆，杆的相速度依赖波长。
- 过截面的功率为 $P = -\tau(\partial y/\partial x)(\partial y/\partial t)$。对单列简谐行波，平均值为 $\tfrac12\mu v\omega^2 A^2$。动能密度与势能密度相等，能量以速率 $v$ 行进。
- 等幅反向的简谐分量构成的驻波平均功率为零。行波公式对它不适用。
:::

## 习题

::: exercise 由张力与密度求波速 {#exr-speed level=1 check="30"}
一根均匀弦线密度 $\mu = 0.0100\,\mathrm{kg/m}$，张力 $\tau = 9.00\,\mathrm{N}$。设处于 [[#thm-string]] 的小斜率范围。求波速，以 $\mathrm{m/s}$ 计。
::: solution
由 [[#eq-speed]] 得

$$
v = \sqrt{\frac{\tau}{\mu}} = \sqrt{\frac{9.00}{0.0100}} = \sqrt{900} = 30.0\,\mathrm{m/s}.
$$

波速为 $30.0\,\mathrm{m/s}$。不需要振幅。在这一范围内，改变振幅不改变 $v$。
:::
:::

::: exercise 由波速与频率求波长 {#exr-lambda level=1 check="4"}
一列行波的波速为 $v = 20.0\,\mathrm{m/s}$，频率为 $f = 5.00\,\mathrm{Hz}$。求波长，以米计。
::: solution
由 [[#eq-dispersion]] 得 $\lambda f = v$，于是

$$
\lambda = \frac{v}{f} = \frac{20.0}{5.00} = 4.00\,\mathrm{m}.
$$

波长为 $4.00\,\mathrm{m}$。相应的波数为 $2\pi/\lambda = \pi/2\,\mathrm{rad/m}$，题目并未要求。
:::
:::

::: exercise 由余弦的参量求相速度 {#exr-phase level=1 check="5"}
横向位移（以米计）为 $y = 0.020\cos(3.0\, x - 15 t)$，$x$ 以米计、$t$ 以秒计。求相速度，以 $\mathrm{m/s}$ 计，沿传播方向取正值。
::: solution
与 [[#eq-harmonic]] 对照，$k = 3.0\,\mathrm{rad/m}$、$\omega = 15\,\mathrm{rad/s}$。相位是 $kx - \omega t$，所以波向 $x$ 增大的方向传播，

$$
v = \frac{\omega}{k} = \frac{15}{3.0} = 5.0\,\mathrm{m/s}.
$$

振幅 $0.020\,\mathrm{m}$ 不进入相速度。最大质点速率是另一个量，$\omega A = 15\times 0.020 = 0.30\,\mathrm{m/s}$，远小于 $5.0\,\mathrm{m/s}$。所求的相速度为 $5.0\,\mathrm{m/s}$。
:::
:::

::: exercise 低频简谐波的平均功率 {#exr-power level=2 check="0.004"}
均匀弦上的简谐行波满足 $\mu = 0.0200\,\mathrm{kg/m}$、波速 $v = 10.0\,\mathrm{m/s}$、角频率 $\omega = 20.0\,\mathrm{rad/s}$、振幅 $A = 0.0100\,\mathrm{m}$。[[#prop-power]] 的小斜率假设成立。求平均功率，以瓦计。
::: solution
由 [[#eq-power-avg]] 得

$$
\begin{aligned}
\langle P\rangle
&= \tfrac12\mu v\omega^2 A^2
= \tfrac12\times 0.0200\times 10.0\times 20.0^2\times 0.0100^2\\
&= \tfrac12\times 0.200\times 400\times 1.00\times 10^{-4}
= 0.00400\,\mathrm{W}.
\end{aligned}
$$

平均功率为 $0.00400\,\mathrm{W}$。对斜率作核对：$k = \omega/v = 2.00\,\mathrm{rad/m}$，$kA = 0.0200$，对公式的假设而言足够小。数据隐含的张力为 $\tau = \mu v^2 = 2.00\,\mathrm{N}$，而 $\tfrac12\tau k\omega A^2$ 返回同样的 $0.00400\,\mathrm{W}$。
:::
:::

::: exercise 最大横向速率 {#exr-particle level=2 check="1"}
弦上一列简谐波的角频率为 $\omega = 50.0\,\mathrm{rad/s}$，振幅为 $A = 0.0200\,\mathrm{m}$。求绳上质点的最大横向速率，以 $\mathrm{m/s}$ 计。
::: hint
质点速率是 $\partial y/\partial t$，不是相速度。它的幅值是 $\omega A$。
:::
::: solution
对 $y = A\cos(kx - \omega t)$，横向速度为 $\partial y/\partial t = \omega A\sin(kx - \omega t)$。最大绝对值为

$$
\omega A = 50.0\times 0.0200 = 1.00\,\mathrm{m/s}.
$$

答案为 $1.00\,\mathrm{m/s}$。波数没有给出，所以从这些数据求不出相速度，而且题目问的也不是它。
:::
:::

::: exercise 给定传播时间所需的张力 {#exr-tension level=2 check="10"}
一根均匀弦线密度 $\mu = 0.00400\,\mathrm{kg/m}$。要求一列横向脉冲在 $0.0400\,\mathrm{s}$ 内沿它传播 $2.00\,\mathrm{m}$。设处于小斜率范围。求所需张力，以牛顿计。
::: solution
脉冲的波速必须是

$$
v = \frac{2.00}{0.0400} = 50.0\,\mathrm{m/s}.
$$

由 [[#eq-speed]] 解出 $\tau = \mu v^2$：

$$
\tau = 0.00400\times 50.0^2 = 0.00400\times 2500 = 10.0\,\mathrm{N}.
$$

张力为 $10.0\,\mathrm{N}$。只要斜率保持小量、弦保持均匀，脉冲的形状就不出现，因为每种波形曲线都共享这一波速。
:::
:::

::: exercise 从余弦式读功率 {#exr-readpower level=3 check="0.0576"}
线密度 $\mu = 0.00500\,\mathrm{kg/m}$ 的均匀弦携带行波

$$
y = 0.030\cos(2.5\, x - 40 t),
$$

其中 $y$ 与 $x$ 以米计、$t$ 以秒计、余弦的参量以弧度计。设弦是柔软的，且斜率小到 [[#thm-string]] 与 [[#prop-power]] 适用。求平均功率，以瓦计。
::: hint
从余弦读出 $k$ 与 $\omega$，推出 $v = \omega/k$，核对 $kA$ 不大，然后才使用 [[#eq-power-avg]]。
:::
::: solution
该形式与 [[#eq-harmonic]] 匹配，其中 $A = 0.030\,\mathrm{m}$、$k = 2.5\,\mathrm{rad/m}$、$\omega = 40\,\mathrm{rad/s}$，向 $x$ 增大的方向传播。相速度为

$$
v = \frac{\omega}{k} = \frac{40}{2.5} = 16\,\mathrm{m/s}.
$$

最大斜率为 $kA = 2.5\times 0.030 = 0.075$，约 $4^\circ$，足够小，理想弦的功率公式是合理的模型。与这一波速相容的张力为 $\tau = \mu v^2 = 0.00500\times 256 = 1.28\,\mathrm{N}$。平均功率为

$$
\begin{aligned}
\langle P\rangle
&= \tfrac12\mu v\omega^2 A^2
= \tfrac12\times 0.00500\times 16\times 1600\times 0.000900\\
&= \tfrac12\times 0.0800\times 1.44
= 0.0576\,\mathrm{W}.
\end{aligned}
$$

等价表达式 $\tfrac12\tau k\omega A^2 = \tfrac12\times 1.28\times 2.5\times 40\times 0.000900 = 0.0576\,\mathrm{W}$ 相符。平均功率为 $0.0576\,\mathrm{W}$。
:::
:::

::: exercise 能量流的方向 {#exr-flow level=3}
证明：在 [[#thm-string]] 的小斜率弦上，右行波形曲线 $y = f(x - vt)$ 向 $x$ 增大的方向输送非负功率，左行波形曲线输送非正功率。然后取驻波 $y = 2A\cos(kx)\cos(\omega t)$，其中 $\omega = vk$、$v = \sqrt{\tau/\mu}$，证明过每个截面的平均功率为零。并用一句话解释，为什么把振幅取作 $2A$ 套用 [[#eq-power-avg]] 是对这个驻波的错误描述。
::: hint
从 $P = -\tau(\partial y/\partial x)(\partial y/\partial t)$ 出发。对驻波，先对 $\sin(2\omega t)$ 在一个周期上求平均，再做别的。
:::
::: solution
在小斜率假设下，过截面交付给下游一侧的功率为 [[#eq-power-inst]]，$P = -\tau(\partial y/\partial x)(\partial y/\partial t)$。

若 $y = f(x - vt)$，则 $\partial y/\partial x = f'$ 且 $\partial y/\partial t = -v f'$，所以

$$
P = -\tau(f')(-v f') = \tau v (f')^2.
$$

张力、波速与平方都非负，所以 $P \ge 0$。能量朝 $x$ 增大的方向流动，那正是波形曲线传播的方向。若 $y = g(x + vt)$，则 $\partial y/\partial x = g'$ 且 $\partial y/\partial t = v g'$，所以 $P = -\tau v (g')^2 \le 0$。能量朝 $x$ 减小的方向流动。

对驻波，展开导数：

$$
\pdv{y}{x} = -2Ak\sin(kx)\cos(\omega t), \qquad \pdv{y}{t} = -2A\omega\cos(kx)\sin(\omega t).
$$

其乘积为 $4A^2 k\omega\sin(kx)\cos(kx)\sin(\omega t)\cos(\omega t)$，于是

$$
P = -\tau\cdot 4A^2 k\omega\cdot\tfrac12\sin(2kx)\cdot\tfrac12\sin(2\omega t) = -\tau A^2 k\omega\sin(2kx)\sin(2\omega t).
$$

在任何固定的 $x$ 处，因子 $\sin(2kx)$ 是常数。$\sin(2\omega t)$ 在周期 $T = 2\pi/\omega$ 上的平均为零。故在每个截面 $\langle P\rangle = 0$。同一结论也可把 [[#prop-power]] 分别用于两列行波再相加得到：振幅为 $A$ 的右行波平均携带 $+\tfrac12\mu v\omega^2 A^2$，振幅为 $A$ 的左行波携带相反的数值，二者相加而消失。平均中没有剩余的交叉项。

[[#eq-power-avg]] 若把振幅换成 $2A$，会报告 $2\mu v\omega^2 A^2$ 的正输送。那个公式是为单列简谐行波推导的。驻波不是单列行波，两个方向之间的交叉项抵消了净能流。在这里套用行波公式，是凭空发明 $P$ 的平均值中并不存在的沿弦能量流。
:::
:::
