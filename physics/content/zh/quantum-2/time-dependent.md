处于 $2p$ 态的激发氢原子并不会停在那里。平均大约 $1.6\,\mathrm{ns}$ 之后它就跃迁到 $1s$，放出一个波长 $121.6\,\mathrm{nm}$ 的光子，即莱曼-α 线。可 $2p$ 是氢哈密顿量的本征态，而本征态是定态：[[quantum-1/schrodinger-equation]] 表明它们的概率密度不随时间改变。一定有库仑哈密顿量之外的东西在驱动这一变化，在本例中就是电子与电磁场的耦合。同样的耦合，把真空换成激光，就能把原子往上推而不只是往下拉，而且其相干性好到可以任意把原子在两个能级之间来回翻转。

本章讲的是跃迁：一个制备在 $\hat H^{0}$ 某个本征态上的体系，由于微扰 $\hat H'(t)$ 作用一段时间，之后被测得处于另一个本征态的概率。我们先精确求解二能级体系，因为它展示了我们之后要用近似处理的一切特征：振荡、共振、失谐。然后建立一阶含时微扰论，对跃迁进入连续谱导出费米黄金定则，并用它计算原子对光的吸收与发射，最后从第一性原理算出 $2p\to1s$ 跃迁的爱因斯坦 $A$ 系数。

预备知识是 [[quantum-1/formalism]] 与 [[quantum-2/stationary-perturbation]]。上一章的矩阵元 $H'_{fi} = \langle f\vert\hat H'\vert i\rangle$ 又回来了，如今它们不是能移，而是跃迁的振幅。

## 按定态展开 {#coefficients}

设 $\hat H^{0}$ 有标准正交本征态 $\lvert n\rangle$，能量为 $E_n$，并设 $\hat H(t) = \hat H^{0} + \hat H'(t)$。任何态都可以按 $\lvert n\rangle$ 展开；把每个分量在没有微扰时本会获得的相位提出来比较方便。

::: definition 相互作用绘景中的振幅 {#def-amplitudes}
态 $\lvert\Psi(t)\rangle$ 的**振幅** $c_n(t)$ 定义为

$$
\lvert\Psi(t)\rangle = \sum_n c_n(t)\,e^{-iE_nt/\hbar}\lvert n\rangle.
$$ {#eq-expansion}

在 $c_n(0) = \delta_{ni}$ 条件下，从初态 $\lvert i\rangle$ 到末态 $\lvert f\ne i\rangle$ 的**跃迁概率**是 $t$ 时刻的 $P_{i\to f}(t) = \lvert c_f(t)\rvert^2$。跃迁的**玻尔频率**记为 $\omega_{fi} = (E_f - E_i)/\hbar$。
:::

若 $\hat H' = 0$，振幅是常数：全部时间依赖都在相位里。存在 $\hat H'$ 时，把 [[#eq-expansion]] 代入 $i\hbar\,\partial_t\lvert\Psi\rangle = (\hat H^{0} + \hat H')\lvert\Psi\rangle$。含 $\hat H^{0}$ 的项与相位的导数相消，再与 $\langle f\rvert$ 作内积，剩下一个精确的方程组：

$$
i\hbar\,\dot c_f(t) = \sum_n H'_{fn}(t)\,e^{i\omega_{fn}t}\,c_n(t).
$$ {#eq-exact}

这就是薛定谔方程，还没有做任何近似。它是无穷多个耦合的线性方程，微扰通过一个按每对能级的玻尔频率振荡的相位因子把各振幅耦合起来。

## 二能级体系与拉比振荡 {#rabi}

只保留两个态：基态 $\lvert g\rangle$ 与激发态 $\lvert e\rangle$，$\omega_0 = (E_e - E_g)/\hbar > 0$。许多真实体系都可以这样描述：磁场中的自旋 $\frac12$、被调谐到某条谱线附近而远离其他谱线的激光驱动的原子、超导量子比特。用振荡耦合来驱动它

$$
\hat H'(t) = \hbar\Omega\cos(\omega t)\bigl(\lvert e\rangle\langle g\rvert + \lvert g\rangle\langle e\rvert\bigr),
$$

其中 $\Omega$ 为实数，称为**拉比频率**；它正比于驱动强度。定义**失谐** $\Delta = \omega - \omega_0$。方程 [[#eq-exact]] 化为

$$
i\dot c_e = \Omega\cos(\omega t)\,e^{i\omega_0t}\,c_g, \qquad i\dot c_g = \Omega\cos(\omega t)\,e^{-i\omega_0t}\,c_e.
$$

写 $\cos\omega t = \frac12(e^{i\omega t} + e^{-i\omega t})$。于是 $\cos(\omega t)\,e^{i\omega_0t}$ 含一个慢变项 $\frac12e^{-i\Delta t}$ 和一个快变项 $\frac12e^{i(\omega + \omega_0)t}$。在共振附近，$\lvert\Delta\rvert \ll \omega_0$，快变项在振幅发生显著变化的时间内平均后几乎为零，把它丢掉就是**旋转波近似**。只要 $\Omega, \lvert\Delta\rvert \ll \omega_0$，它就是极好的近似，光学跃迁（$\omega_0 \sim 10^{15}\,\mathrm{s^{-1}}$）用激光驱动（$\Omega$ 可达 $\sim 10^{9}\,\mathrm{s^{-1}}$）正是如此。

::: theorem 拉比公式 {#thm-rabi}
在旋转波近似下，从 $\lvert g\rangle$ 出发的二能级体系在 $t$ 时刻被测得处于 $\lvert e\rangle$ 的概率为

$$
P_{g\to e}(t) = \frac{\Omega^2}{\Omega^2 + \Delta^2}\,\sin^2\!\left(\frac{\Omega' t}{2}\right), \qquad \Omega' = \sqrt{\Omega^2 + \Delta^2}.
$$ {#eq-rabi}
:::

::: proof
旋转波近似之后，

$$
i\dot c_e = \frac\Omega2e^{-i\Delta t}c_g, \qquad i\dot c_g = \frac\Omega2e^{i\Delta t}c_e.
$$

令 $c_e = e^{-i\Delta t/2}b_e$、$c_g = e^{i\Delta t/2}b_g$ 去掉显式的时间依赖。则 $i\dot c_e = e^{-i\Delta t/2}\bigl(i\dot b_e + \frac\Delta2b_e\bigr)$，$c_g$ 类似，于是

$$
i\deriv{}{t}\begin{pmatrix}b_g\\ b_e\end{pmatrix} = M\begin{pmatrix}b_g\\ b_e\end{pmatrix}, \qquad M = \frac12\begin{pmatrix}\Delta & \Omega\\ \Omega & -\Delta\end{pmatrix}.
$$

$M$ 是常数厄米矩阵，且 $M^2 = \frac14(\Omega^2 + \Delta^2)\mathbb 1 = (\Omega'/2)^2\mathbb 1$。于是指数函数的级数按偶次幂与奇次幂分开，与 $e^{-i\theta}$ 完全一样：

$$
e^{-iMt} = \cos\!\left(\frac{\Omega't}{2}\right)\mathbb 1 - i\,\frac{2M}{\Omega'}\,\sin\!\left(\frac{\Omega't}{2}\right).
$$

由 $b_g(0) = 1$，$b_e(0) = 0$，下面一个分量是 $b_e(t) = -i(\Omega/\Omega')\sin(\Omega't/2)$。因为 $\lvert c_e\rvert = \lvert b_e\rvert$，平方即得 [[#eq-rabi]]。
:::

共振时 $\Delta = 0$，体系在 $\lvert g\rangle$ 与 $\lvert e\rangle$ 之间以角频率 $\Omega$ 完全地往复振荡——这是布居数的振荡，即**拉比振荡**。接通 $t = \pi/\Omega$ 时间的驱动是一个 **$\pi$ 脉冲**，它把全部布居转移到 $\lvert e\rangle$；$\pi/2$ 脉冲产生等权重叠加态。失谐时振荡更快（频率为 $\Omega'$）且不完全：其最大值为 $\Omega^2/(\Omega^2 + \Delta^2)$，它是失谐的洛伦兹函数，半高全宽为 $2\Omega$。

::: widget plot
f: sin(sqrt(1+d^2)*x/2)^2/(1+d^2); (x/2)^2
x: 0, 20
y: 0, 1.2
sliders: d=0:-3:3:0.1
labels: 拉比公式; 共振时的一阶微扰论
caption: 激发态概率对 $\Omega t$ 作图，滑块上是失谐 $d = \Delta/\Omega$。$d = 0$ 时布居在 $\Omega t = \pi$ 完全翻到激发态，在 $2\pi$ 翻回来。增大 $\lvert d\rvert$：振荡变快，峰值降到 $1/(1+d^2)$。抛物线是一阶微扰论在共振时的预言 $(\Omega t/2)^2$：数值小的时候正确，一旦超过 $1$ 就荒谬了。微扰论是短时间或弱驱动的理论。
:::

::: application 量子比特与磁共振
静场 $B_0\hat{\mathbf z}$ 中的自旋-$\frac12$ 有 $\omega_0 = \gamma B_0$；在 $xy$ 平面内以 $\omega$ 旋转的小场 $B_1$ 驱动它，形式与上面完全一样，$\Omega = \gamma B_1$。这里甚至不需要旋转波近似：对真正旋转的场，[[#eq-rabi]] 是精确的（[[#exr-spin-rabi]]）。这就是核磁共振，即磁共振成像的基础，其中对质子施加每特斯拉 $42.6\,\mathrm{MHz}$ 的 $\pi$ 与 $\pi/2$ 脉冲。同样的脉冲，用微波加在超导电路上或用激光加在囚禁离子上，就是量子计算中的单量子比特门。参见 [[quantum-2/entanglement]]。
:::

## 一阶微扰论 {#first-order}

对一般的 $\hat H'(t)$ 和多个能级，[[#eq-exact]] 无法求解。不过若微扰很弱，振幅在一段时间内会保持接近初值，于是可以迭代。在 [[#eq-exact]] 右端取 $c_n = \delta_{ni}$ 起步，再积分。

::: theorem 一阶跃迁振幅 {#thm-first-order}
设体系在 $t = 0$ 处于 $\lvert i\rangle$。$\hat H'$ 一阶近似下，$t$ 时刻处于 $\lvert f\rangle$（$f \ne i$）的振幅为

$$
c_f(t) = -\frac{i}{\hbar}\int_0^t H'_{fi}(t')\,e^{i\omega_{fi}t'}\,\dd t'.
$$ {#eq-first-order}

近似对一切 $f \ne i$ 满足 $\lvert c_f\rvert^2 \ll 1$ 期间有效。
:::

::: proof
插入记账参数 $\hat H' \to \lambda\hat H'$，并展开 $c_n = c_n^{(0)} + \lambda c_n^{(1)} + \cdots$。$\lambda^0$ 阶时 [[#eq-exact]] 给出 $\dot c_n^{(0)} = 0$，所以对一切时间 $c_n^{(0)} = \delta_{ni}$。$\lambda^1$ 阶时 [[#eq-exact]] 右端是 $\hat H'$ 乘以零阶振幅：

$$
i\hbar\,\dot c_f^{(1)} = \sum_nH'_{fn}e^{i\omega_{fn}t}\delta_{ni} = H'_{fi}(t)e^{i\omega_{fi}t}.
$$

从 $c_f^{(1)}(0) = 0$ 的 $0$ 点积分即得 [[#eq-first-order]]。被略去的项是 $\lambda^2$ 阶；只要 $\lvert i\rangle$ 的消耗和其他态的占据都很小，它们就很小，这正是前面所述的条件。
:::

这个结果说：跃迁振幅是耦合对时间的积分，以相位 $e^{i\omega_{fi}t}$ 加权。比 $1/\omega_{fi}$ 变化慢的微扰与该相位相乘后平均几乎为零，不引起跃迁。这就是**绝热的**极限。作用突然——持续时间短于 $1/\omega_{fi}$——的微扰分辨不出相位，给出最大的振幅。

::: example 受脉冲冲击的谐振子 {#ex-kick}
质量 $m$、角频率 $\omega$ 的谐振子处于基态，受到从 $t = -\infty$ 到 $\infty$ 的力脉冲 $F(t) = F_0e^{-t^2/\tau^2}$，于是 $\hat H'(t) = -F(t)\,\hat x$。求它最终处于第一激发态的一阶概率，并考察短脉冲与长脉冲两个极限。
::: solution
一阶下从 $\lvert0\rangle$ 只能到达 $\lvert1\rangle$，因为 $\langle1\vert\hat x\vert0\rangle = \sqrt{\hbar/2m\omega}$，而 $n \ge 2$ 时 $\langle n\vert\hat x\vert0\rangle = 0$。取 $\omega_{10} = \omega$，时间积分现在跑遍整条实轴，

$$
c_1 = \frac{i}{\hbar}F_0\sqrt{\frac{\hbar}{2m\omega}}\int_{-\infty}^{\infty}e^{-t^2/\tau^2}e^{i\omega t}\,\dd t = \frac{i}{\hbar}F_0\sqrt{\frac{\hbar}{2m\omega}}\,\sqrt\pi\,\tau\,e^{-\omega^2\tau^2/4},
$$

用了高斯函数的傅里叶变换 $\int e^{-t^2/\tau^2 + i\omega t}\,\dd t = \sqrt\pi\,\tau\,e^{-\omega^2\tau^2/4}$。于是

$$
P_{0\to1} = \frac{\pi F_0^2\tau^2}{2m\hbar\omega}\,e^{-\omega^2\tau^2/2}.
$$

长脉冲 $\omega\tau \gg 1$ 时概率指数小：谐振子绝热地跟着缓变的力走，力撤去后回到基态。短脉冲 $\omega\tau \ll 1$ 时指数因子为 $1$，$P = (\pi F_0^2\tau^2)/(2m\hbar\omega) = p^2/(2m\hbar\omega)$，其中 $p = \int F\,\dd t = \sqrt\pi F_0\tau$ 是冲量。经典地，给静止谐振子一个冲量 $p$ 注入能量 $p^2/2m$，除以能量量子 $\hbar\omega$ 得到预期的量子数 $p^2/2m\hbar\omega$，正是同一个表达式。一阶结果在该值很小时有效。
:::
:::

### 突变与绝热变化 {#sudden}

[[#ex-kick]] 的两个极限具有普遍性。若 $\hat H$ 在时间 $T$ 内改变，而 $T$ 对所有相关的能级对都长于 $1/\omega_{fi}$，则**绝热定理**（玻恩（Born）与福克（Fock），1928）说：从 $\hat H$ 的第 $n$ 个本征态出发的体系，最终处于终态哈密顿量的第 $n$ 个本征态（不管它是什么），只要能级中途不相交。反过来，若 $\hat H$ 从 $\hat H_{\mathrm{old}}$ 跳到 $\hat H_{\mathrm{new}}$，时间短于每一个 $1/\omega_{fi}$，则态来不及改变。这就是**突变近似**：跳跃之后一刻的态等于跳跃之前一刻的态，测得体系处于 $\hat H_{\mathrm{new}}$ 的本征态 $\lvert\phi_k\rangle$ 的概率为 $\lvert\langle\phi_k\vert\psi_{\mathrm{old}}\rangle\rvert^2$。两个极限都不要求 $\hat H'$ 很小。

::: example 氚的 β 衰变 {#ex-tritium}
氚原子（$^3\mathrm H$，一个电子在 $1s$）发生 β 衰变：核放出一个快速电子，变成电荷 $2e$ 的 $^3\mathrm{He}$。出射电子在约 $10^{-18}\,\mathrm s$ 内飞走，短于原子时间 $\hbar/E_{\mathrm h} = 2.4\times10^{-17}\,\mathrm s$。求原子电子最终处于 $^3\mathrm{He}^+$ 的 $1s$ 态的概率。
::: solution
由突变近似，衰变后一刻电子仍处于氢的 $1s$ 态 $\psi_1 = (\pi a^3)^{-1/2}e^{-r/a}$。新的基态是 $Z = 2$ 的轨道 $\phi_1 = (8/\pi a^3)^{1/2}e^{-2r/a}$。二者重叠为

$$
\langle\phi_1\vert\psi_1\rangle = \frac{\sqrt8}{\pi a^3}\,4\pi\int_0^\infty r^2e^{-3r/a}\,\dd r = \frac{4\sqrt8}{a^3}\cdot\frac{2a^3}{27} = \frac{16\sqrt2}{27},
$$

概率为 $512/729 = 0.702$。其余 $30$ 个百分点去往 $\mathrm{He}^+$ 的激发态（约 $25$ 个百分点去 $2s$）以及电离。只有 $s$ 态会被到达，因为势的改变是球对称的。这些"shake-up"（原子实被扰动而残留激发）概率在用氚 β 谱精确测量中微子质量的实验中很重要。
:::
:::

### 突然接通的恒定微扰

最简单的含时形式是 $t = 0$ 接通的常量 $\hat V$。此时 [[#eq-first-order]] 是初等的：

$$
c_f(t) = -\frac{i}{\hbar}V_{fi}\int_0^te^{i\omega_{fi}t'}\,\dd t' = -\frac{V_{fi}}{\hbar\omega_{fi}}\left(e^{i\omega_{fi}t} - 1\right),
$$

又因为 $\lvert e^{i\theta} - 1\rvert^2 = 4\sin^2(\theta/2)$，

$$
P_{i\to f}(t) = \frac{\lvert V_{fi}\rvert^2}{\hbar^2}\,F_t(\omega_{fi}), \qquad F_t(\omega) = \frac{\sin^2(\omega t/2)}{(\omega/2)^2}.
$$ {#eq-constant}

对 $\omega_{fi} \ne 0$ 的末态，概率振荡，永不超出 $4\lvert V_{fi}\rvert^2/\hbar^2\omega_{fi}^2$。短时间内不守恒能量的跃迁是可能的，这是能量-时间不确定性关系的一种表现，但它们不会积累。$\omega_{fi} \to 0$ 时 $F_t \to t^2$，概率二次增长。函数 $F_t(\omega)$ 是 $\omega = 0$ 处的峰，高 $t^2$、宽约 $2\pi/t$，面积为

$$
\int_{-\infty}^{\infty}F_t(\omega)\,\dd\omega = 2\pi t.
$$ {#eq-area}

（代换 $u = \omega t/2$，并用 $\int_{-\infty}^{\infty}\sin^2u/u^2\,\dd u = \pi$。）高 $t^2$、宽 $1/t$：面积随 $t$ 线性增长；$t \to \infty$ 时函数成为 $2\pi t\,\delta(\omega)$。

::: widget plot
f: if(abs(x) < 1e-9, t/(2*pi), sin(x*t/2)^2/((x/2)^2*2*pi*t))
x: -10, 10
sliders: t=2:0.5:20:0.5
caption: 函数 $F_t(\omega)/2\pi t$ 对 $\omega$ 作图，滑块上是 $t$。面积恒为 $1$。增大 $t$：中央峰变高变窄，头两个零点之间的宽度约 $4\pi/t$，而旁瓣相对重要性缩小。$t$ 大时只有 $\omega_{fi}$ 落在零附近约 $2\pi/t$ 以内的末态才有贡献：即像 δ 函数那样能量守恒的那些末态。
:::

## 费米黄金定则 {#golden-rule}

单个末态很少是关心的对象。被紫外光电离的原子、β 衰变中放出电子的原子核、向任意方向放出光子的激发原子：每种情形里末态都构成连续谱，我们要的是到达其中任一末态的总概率。

::: theorem 费米黄金定则 {#thm-golden}
设常量微扰 $\hat V$ 在 $t = 0$ 接通，末态 $\lvert f\rangle$ 构成连续谱，在 $E_i$ 附近有**态密度** $\rho(E)$（单位能量的态数），且 $V_{fi}$ 在其上缓变。当时间短到 $\lvert i\rangle$ 尚未明显消耗、而长到 $\hbar$ 除以 $\rho$ 与 $V_{fi}$ 变化的能量尺度之外，总跃迁概率线性增长，$P(t) = \Gamma t$，速率为

$$
\Gamma_{i\to f} = \frac{2\pi}{\hbar}\,\lvert V_{fi}\rvert^2\,\rho(E_f)\Big\vert_{E_f = E_i}.
$$ {#eq-golden}

对谐波微扰 $\hat H'(t) = \hat V e^{-i\omega t} + \hat V^\dagger e^{i\omega t}$，同样成立，只需把 $\rho$ 取在 $E_f = E_i + \hbar\omega$（吸收，来自第一项）或 $E_f = E_i - \hbar\omega$（受激辐射，来自第二项，含 $V^\dagger_{fi}$）。
:::

::: proof
把 [[#eq-constant]] 对 $E_i$ 附近能量窗口内的末态求和，用态密度把求和换成积分：

$$
P(t) = \int\rho(E_f)\,\frac{\lvert V_{fi}\rvert^2}{\hbar^2}\,F_t\!\left(\frac{E_f - E_i}{\hbar}\right)\dd E_f = \int\rho\,\frac{\lvert V_{fi}\rvert^2}{\hbar}\,F_t(\omega_{fi})\,\dd\omega_{fi}.
$$

$t$ 足够大时 $F_t$ 的峰（宽 $\sim 2\pi/t$）比 $\rho\lvert V_{fi}\rvert^2$ 变化的尺度窄得多，缓变因子可以在 $\omega_{fi} = 0$ 处取到积分号外，由 [[#eq-area]] 得

$$
P(t) = \frac{\lvert V_{fi}\rvert^2}{\hbar}\rho(E_i)\cdot2\pi t,
$$

即 [[#eq-golden]] 乘以 $t$。谐波情形下，由 [[#eq-first-order]] 振幅为

$$
c_f = -\frac{i}{\hbar}\left[V_{fi}\frac{e^{i(\omega_{fi} - \omega)t} - 1}{i(\omega_{fi} - \omega)} + V^\dagger_{fi}\frac{e^{i(\omega_{fi} + \omega)t} - 1}{i(\omega_{fi} + \omega)}\right].
$$

$\omega > 0$ 且 $t \gg 1/\omega$ 时，一次只可能有一项接近共振；两项之间的交叉项不共振，不随 $t$ 增长。于是每项的行为都像恒定微扰情形，只需把 $\omega_{fi}$ 换成 $\omega_{fi} \mp \omega$，这把 $F_t$ 的峰移到 $E_f = E_i \pm \hbar\omega$。
:::

这个定则常写成带 δ 函数的形式 $\Gamma_{i\to f} = (2\pi/\hbar)\lvert V_{fi}\rvert^2\delta(E_f - E_i)$，再与问题自带的任何末态密度相乘积分。δ 函数表达能量守恒，而能量守恒只在长时间才显现。

::: warning 黄金定则何时失效
两个条件方向相反。时间必须长，$t \gg \hbar/\delta E$，其中 $\delta E$ 是 $\rho\lvert V\rvert^2$ 发生变化的能量范围，这样 $F_t$ 才起 δ 函数的作用。但一阶理论又要求 $\Gamma t \ll 1$。两者同时成立仅当 $\Gamma \ll \delta E/\hbar$：衰变速率必须远慢于末态能量的展宽。对*离散*的末态，$\delta E = 0$，根本没有黄金定则：体系做拉比振荡，如 [[#thm-rabi]]，为它报一个速率是错误的。
:::

$\Gamma t$ 接近 $1$ 之后发生什么？更细致的处理（维斯科普夫（Weisskopf）与维格纳（Wigner），1930）表明，处于 $\lvert i\rangle$ 的概率按 $e^{-\Gamma t}$ 衰减，速率正是黄金定则给出的那个，且放出的能量分布在宽度（全宽）为 $\hbar\Gamma$ 的**洛伦兹线型**上。这就是**自然线宽**。

::: quiz
微扰 $\hat V$ 把一个离散初态与连续谱耦合起来。若 $\lvert V_{fi}\rvert$ 处处加倍，衰变速率和黄金定则线性增长开始起作用的时间各自怎样变化？
- [ ] 速率加倍；起始时间不变。
- [x] 速率变为四倍；起始时间由连续谱的宽度决定，不变。
- [ ] 速率变为四倍，黄金定则更早开始适用。
- [ ] 速率不变，因为态密度没有变。
::: solution
速率正比于 $\lvert V_{fi}\rvert^2$。线性增长的开始需要 $t \gg \hbar/\delta E$，它取决于 $\rho\lvert V\rvert^2$ 随能量变化的快慢，而非其大小。速率更大使 $\Gamma t \ll 1$ 更早失效，所以一阶理论的适用窗口反而缩小。
:::
:::

## 原子与光 {#light}

线度 $a_0 \approx 0.05\,\mathrm{nm}$ 的原子处在波长 $\lambda \sim 500\,\mathrm{nm}$ 的光中，看到的电场在其范围内是均匀的。在这一**电偶极近似**下，光是场 $\boldsymbol{\mathcal E}(t) = \mathcal E_0\hat{\boldsymbol\epsilon}\cos\omega t$，相对核位于 $\mathbf r$、电荷为 $-e$ 的电子有

$$
\hat H'(t) = e\,\mathcal E_0\,\hat{\boldsymbol\epsilon}\cdot\hat{\mathbf r}\,\cos\omega t = -\hat{\mathbf d}\cdot\boldsymbol{\mathcal E}(t), \qquad \hat{\mathbf d} = -e\hat{\mathbf r}.
$$ {#eq-dipole}

磁力的贡献比电部分小一个电子速度与 $c$ 之比，量级为 $\alpha$，略去不计。于是每个跃迁速率都涉及矩阵元 $\mathbf r_{fi} = \langle f\vert\hat{\mathbf r}\vert i\rangle$。

::: proposition 电偶极选择定则 {#prop-selection}
对类氢态 $\lvert nlm\rangle$（自旋不变），除非

$$
\Delta l = l' - l = \pm1 \qquad\text{且}\qquad \Delta m = m' - m \in \{0, \pm1\},
$$

否则 $\langle n'l'm'\vert\hat{\mathbf r}\vert nlm\rangle = 0$。

$z$ 分量只连接 $\Delta m = 0$，$x\pm iy$ 只连接 $\Delta m = \pm1$。
:::

::: proof
**$m$ 的定则。** $\hat{\mathbf r}$ 的各分量与 $\hat L_z = \hat x\hat p_y - \hat y\hat p_x$ 有简单的对易关系：$[\hat L_z, \hat z] = 0$，$[\hat L_z, \hat x\pm i\hat y] = \pm\hbar(\hat x\pm i\hat y)$。在 $\langle n'l'm'\rvert$ 与 $\lvert nlm\rangle$ 之间取 $[\hat L_z, \hat z] = 0$ 的矩阵元得 $(m' - m)\hbar\,\langle\hat z\rangle_{fi} = 0$，所以 $\hat z$ 只连接 $m' = m$。同理 $(m' - m \mp 1)\hbar\,\langle\hat x\pm i\hat y\rangle_{fi} = 0$，所以 $\hat x\pm i\hat y$ 只连接 $m' = m\pm1$。$\hat{\mathbf r}$ 的每个分量都是 $\hat z$ 与 $\hat x\pm i\hat y$ 的组合，故 $\Delta m \in \{0, \pm1\}$。

**$l$ 的定则（部分）。** 宇称下 $\mathbf r \to -\mathbf r$，$\lvert nlm\rangle$ 乘以 $(-1)^l$，$\hat{\mathbf r}$ 为奇，所以矩阵元乘以 $(-1)^{l + l' + 1}$，除非 $l + l'$ 为奇它必须为零。这排除了 $\Delta l = 0, \pm2, \dots$。要排除 $\Delta l = \pm3, \pm5, \dots$ 还需要更多：$\hat{\mathbf r}$ 是矢量算符，由角动量相加的三角形条件，它最多改变一份角动量。初等的证明用到恒等式 $[\hat L^2, [\hat L^2, \hat{\mathbf r}]] = 2\hbar^2(\hat{\mathbf r}\hat L^2 + \hat L^2\hat{\mathbf r})$；取其矩阵元得 $\bigl[(l'(l'+1) - l(l+1))^2 - 2(l'(l'+1) + l(l+1))\bigr]\langle\hat{\mathbf r}\rangle_{fi} = 0$，其中方括号可分解为 $\bigl[(l' + l + 1)^2 - 1\bigr]\bigl[(l' - l)^2 - 1\bigr]$（这是 Griffiths & Schroeter 量子动力学一章的一道标准习题）。
:::

因为光子携带一份角动量，选择定则就是原子加光子的角动量守恒。违反定则的跃迁称为**禁戒**的。它们并非不可能，只是慢得多，要通过磁偶极或电四极耦合、或双光子发射来进行：氢的 $2s$ 态无法经偶极跃迁到达 $1s$，其寿命约为 $0.12\,\mathrm s$ 而非纳秒量级。

::: quiz
氢原子处于 $3d$、$m = 0$ 的态。它可以通过放出一个电偶极光子跃迁到下面哪些态？
- [ ] $1s$
- [ ] $2s$
- [x] $2p$、$m = 0$ 以及 $2p$、$m = \pm1$
- [ ] $3p$
::: solution
定则 $\Delta l = \pm1$ 排除了 $1s$ 与 $2s$（$\Delta l = -2$）。从 $m = 0$ 出发，$\Delta m = 0, \pm1$ 可达 $2p$ 的三个支能级。库仑近似下 $3p$ 与 $3d$ 能量相同，没有光子可放；计入精细结构后能量差又小得让 $\omega^3$ 因子使该速率可以忽略。所以 $3d$ 先跃迁到 $2p$，$2p$ 再跃迁到 $1s$：一条级联。
:::
:::

### 非相干光的吸收与受激辐射

热光和多数光源都不是单色的：它们包含一个频率分布，相位随机，用每单位角频率的能量密度 $u(\omega)$ 描述。对每个频率成分，[[#eq-dipole]] 都是谐波微扰，$\hat V = \frac12e\mathcal E_0\,\hat{\boldsymbol\epsilon}\cdot\hat{\mathbf r}$，共振附近一阶概率为 $\lvert V_{fi}\rvert^2F_t(\omega_{fi} - \omega)/\hbar^2$。相位随机时不同成分的概率相加。每个成分的时间平均能量密度为 $\frac12\varepsilon_0\mathcal E_0^2$（电加磁），于是把 $\mathcal E_0^2$ 换成 $(2/\varepsilon_0)\,u(\omega)\,\dd\omega$，再用 [[#eq-area]] 积分：

$$
P(t) = \frac{e^2\lvert\hat{\boldsymbol\epsilon}\cdot\mathbf r_{fi}\rvert^2}{4\hbar^2}\cdot\frac{2}{\varepsilon_0}\,u(\omega_{fi})\cdot2\pi t = \frac{\pi e^2}{\varepsilon_0\hbar^2}\lvert\hat{\boldsymbol\epsilon}\cdot\mathbf r_{fi}\rvert^2u(\omega_{fi})\,t.
$$

对各个向同性、非偏振的光，对 $\hat{\boldsymbol\epsilon}$ 的方向取平均：$\langle\lvert\hat{\boldsymbol\epsilon}\cdot\mathbf r_{fi}\rvert^2\rangle = \frac13\lvert\mathbf r_{fi}\rvert^2$，其中 $\lvert\mathbf r_{fi}\rvert^2 = \lvert x_{fi}\rvert^2 + \lvert y_{fi}\rvert^2 + \lvert z_{fi}\rvert^2$。速率为 $B\,u(\omega_{fi})$，其中

$$
B = \frac{\pi e^2}{3\varepsilon_0\hbar^2}\lvert\mathbf r_{fi}\rvert^2.
$$ {#eq-einstein-B}

同样的计算适用于从高能级出发的受激辐射，$\lvert\mathbf r_{fi}\rvert^2$ 相同，所以两个 $B$ 系数相等（对非简并能级而言）。

### 自发辐射

上面的计算没有任何东西能让原子在黑暗中衰变：$u = 0$ 时速率为零。自发辐射由量子化的电磁场引起，其真空涨落即使在没有光子时也起微扰的作用。令人惊奇的是，不用量子化场也能求出它的速率，用的是爱因斯坦的一个论证。

::: theorem 爱因斯坦的自发辐射关系 {#thm-einstein}
设 $A$ 是从高能级 $b$ 到低能级 $a$ 的自发辐射速率，两能级均非简并，玻尔频率为 $\omega_0$；$B$ 是吸收与受激辐射的系数 [[#eq-einstein-B]]。若处于黑体辐射热平衡中的原子具有玻尔兹曼布居数，则

$$
A = \frac{\hbar\omega_0^3}{\pi^2c^3}B = \frac{\omega_0^3e^2\lvert\mathbf r_{ba}\rvert^2}{3\pi\varepsilon_0\hbar c^3}.
$$ {#eq-einstein-A}
:::

::: proof
设 $N_a$ 与 $N_b$ 为两能级上的原子数。能量密度为 $u(\omega)$ 的辐射中，速率方程为

$$
\deriv{N_b}{t} = -N_bA - N_bB\,u(\omega_0) + N_aB\,u(\omega_0).
$$

平衡时右端为零，所以 $u(\omega_0) = A/\bigl(B(N_a/N_b - 1)\bigr)$。玻尔兹曼分布给出 $N_a/N_b = e^{\hbar\omega_0/k_BT}$，于是

$$
u(\omega_0) = \frac{A/B}{e^{\hbar\omega_0/k_BT} - 1}.
$$

由 [[quantum-1/origins]] 的普朗克公式（写成每单位角频率）为 $u(\omega) = (\hbar\omega^3/\pi^2c^3)/(e^{\hbar\omega/k_BT} - 1)$。两式在一切温度下一致当且仅当 $A/B = \hbar\omega_0^3/\pi^2c^3$。乘以 [[#eq-einstein-B]] 得第二个形式。
:::

$\omega^3$ 因子解释了自发辐射为何在紫外占主导、在射频可忽略，以及 X 射线激光器为何难以制成。

::: example 氢 $2p$ 态的寿命 {#ex-lyman}
计算氢 $2p\to1s$ 的自发辐射速率和 $2p$ 的寿命。使用 $\langle100\vert\hat z\vert210\rangle = (2^7\sqrt2/3^5)\,a_0$。
::: solution
末态 $\lvert100\rangle$ 的 $m = 0$，由 [[#prop-selection]]，从 $\lvert210\rangle$ 出发只有 $z$ 有贡献，

$$
\lvert\mathbf r_{fi}\rvert^2 = \left(\frac{2^7\sqrt2}{3^5}\right)^2a_0^2 = \frac{2^{15}}{3^{10}}a_0^2 = 0.5549\,a_0^2.
$$

从 $\lvert21,\pm1\rangle$ 出发只有 $x$ 与 $y$ 有贡献，$\lvert\mathbf r_{fi}\rvert^2$ 的结果相同，而且必须如此：寿命不可能依赖于原子的取向。光子能量 $\hbar\omega_0 = \frac34\times13.606\,\mathrm{eV} = 10.204\,\mathrm{eV}$，所以 $\omega_0 = 1.5503\times10^{16}\,\mathrm{s^{-1}}$，$\lambda = 2\pi c/\omega_0 = 121.5\,\mathrm{nm}$。代入 [[#eq-einstein-A]]：

$$
A = \frac{\omega_0^3e^2\lvert\mathbf r_{fi}\rvert^2}{3\pi\varepsilon_0\hbar c^3} = \frac{(1.5503\times10^{16})^3(1.6022\times10^{-19})^2(0.5549)(5.2918\times10^{-11})^2}{3\pi(8.8542\times10^{-12})(1.0546\times10^{-34})(2.9979\times10^{8})^3}\,\mathrm{s^{-1}}.
$$

算出来 $A = 6.27\times10^{8}\,\mathrm{s^{-1}}$。$2p$ 态只能衰变到 $1s$（这一近似下 $2s$ 能量相同），所以寿命 $\tau = 1/A = 1.60\,\mathrm{ns}$，与测量一致。用基本常量表示，结果为 $A = (2/3)^8\alpha^5mc^2/\hbar$；$\alpha^5 \approx 2\times10^{-11}$ 如此之小，正说明了原子寿命相对于原子周期 $\hbar/(mc^2\alpha^2) \approx 2.4\times10^{-17}\,\mathrm s$ 为何如此之长：寿命约为 $7\times10^{7}$ 个这样的原子时间单位。
:::
:::

::: example 莱曼-α 的自然宽度 {#ex-width}
求 $2p\to1s$ 谱线的自然线宽，用频率表示，并给出它占谱线频率的比例。
::: solution
激发态以速率 $\Gamma = A = 6.27\times10^{8}\,\mathrm{s^{-1}}$ 衰减，所以谱线是能量宽度为 $\hbar\Gamma$ 的洛伦兹线型，即角频率宽度为 $\Gamma$，而

$$
\delta\nu = \frac{\Gamma}{2\pi} = \frac{6.27\times10^{8}}{2\pi}\,\mathrm{Hz} = 99.8\,\mathrm{MHz}.
$$

谱线本身在 $\nu = c/\lambda = 2.467\times10^{15}\,\mathrm{Hz}$，所以 $\delta\nu/\nu = 4.0\times10^{-8}$。室温气体中多普勒展宽大约大一百倍，要看到自然宽度需要能抵消多普勒效应的激光技术。
:::
:::

::: example 巴耳末-α 的哪些成分是允许的？ {#ex-balmer}
氢的 H$\alpha$ 线来自 $n = 3 \to n = 2$。忽略自旋，列出 $3s, 3p, 3d$ 与 $2s, 2p$ 诸支能级之间的跃迁中哪些是电偶极允许的。
::: solution
定则 $\Delta l = \pm1$ 允许 $3s\to2p$（$\Delta l = +1$）、$3p\to2s$（$-1$）与 $3d\to2p$（$-1$）；禁止 $3s\to2s$（$\Delta l = 0$）、$3p\to2p$（$0$）与 $3d\to2s$（$-2$）。六对 $l$ 中有三对辐射。计入精细结构后每一对又按定则 $\Delta j = 0, \pm1$ 进一步分裂，合成 H$\alpha$ 精细结构的七条成分。注意 $3p$ 也会衰变到 $1s$，发出莱曼-β；[[#exr-3p]] 计算该速率。
:::
:::

::: history 从爱因斯坦到黄金定则
阿尔伯特·爱因斯坦（Albert Einstein）在 1916 与 1917 年引入 $A$、$B$ 系数，用吸收、自发辐射与受激辐射的速率导出了普朗克公式——那时连能计算它们的量子力学都还没有；他的论证所要求的受激辐射正是激光（1960）的原理。保罗·狄拉克（Paul Dirac）1926 年通过"常数变易法"建立了含时微扰论，并在 1927 年关于辐射发射与吸收的论文中量子化了电磁场，推导出跃迁进入连续谱的速率，自发辐射包含在内。维克托·维斯科普夫（Victor Weisskopf）与尤金·维格纳（Eugene Wigner）（1930）解释了指数衰减与洛伦兹线型。伊西多·拉比（Isidor Rabi）1937 年分析了旋转磁场中的自旋翻转，1938 年据此建立了分子束磁共振方法，并因此获得 1944 年诺贝尔奖。**黄金定则**之名来自恩里科·费米（Enrico Fermi）：他的芝加哥讲义《核物理》（*Nuclear Physics*，1950）因速率公式太过常用而称之为 "Golden Rule No. 2"。
:::

## 后续内容 {#leads}

[[quantum-2/scattering]] 把黄金定则用于粒子掠过靶：从入射平面波散射到立体角内出射平面波的跃迁速率就是散射截面，其结果即玻恩近似。在 [[particles/decay]] 中，同一定则配以相空间态密度，给出 β 衰变谱与粒子寿命。在 [[condensed-matter/semiconductors]] 中它给出带隙间的光学吸收。而拉比振荡正是 [[quantum-2/entanglement]] 中量子比特的基本逻辑门。

::: summary
- 把 $\lvert\Psi\rangle = \sum_nc_ne^{-iE_nt/\hbar}\lvert n\rangle$ 代入，薛定谔方程化为 $i\hbar\dot c_f = \sum_nH'_{fn}e^{i\omega_{fn}t}c_n$，这是精确的。
- 共振驱动的二能级体系做拉比振荡：$P = (\Omega^2/\Omega'^2)\sin^2(\Omega't/2)$，$\Omega' = \sqrt{\Omega^2 + \Delta^2}$。$\pi$ 脉冲反转布居。
- 一阶下 $c_f = -(i/\hbar)\int H'_{fi}e^{i\omega_{fi}t'}\,\dd t'$：即玻尔频率处的傅里叶分量。缓变微扰不引起跃迁；突变的会。
- 费米黄金定则：跃迁进入连续谱，速率 $\Gamma = (2\pi/\hbar)\lvert V_{fi}\rvert^2\rho(E_f)$，$E_f = E_i$ 或 $E_i\pm\hbar\omega$。它需要连续谱，且 $\Gamma \ll \delta E/\hbar$。
- 电偶极跃迁遵从 $\Delta l = \pm1$，$\Delta m = 0, \pm1$；违反者为禁戒（慢）。
- 爱因斯坦的平衡论证给出 $A = \omega^3e^2\lvert\mathbf r_{fi}\rvert^2/3\pi\varepsilon_0\hbar c^3$。氢 $2p\to1s$：$A = 6.27\times10^{8}\,\mathrm{s^{-1}}$，$\tau = 1.60\,\mathrm{ns}$。
- 衰变速率 $\Gamma$ 使谱线成为角频率全宽 $\Gamma$ 的洛伦兹线型：莱曼-α 约为 $100\,\mathrm{MHz}$。
:::

## 习题 {#exercises}

::: exercise 一个 π 脉冲 {level=1 check="100"}
二能级原子被恰好共振的驱动，拉比频率 $\Omega = 2\pi\times5.00\,\mathrm{MHz}$。要把原子确定地从 $\lvert g\rangle$ 翻到 $\lvert e\rangle$，驱动须保持接通多少纳秒？
::: solution
共振时 [[#eq-rabi]] 给出 $P = \sin^2(\Omega t/2)$，首次在 $\Omega t = \pi$ 达到 $1$：

$$
t = \frac{\pi}{\Omega} = \frac{\pi}{2\pi\times5.00\times10^{6}\,\mathrm{s^{-1}}} = 1.00\times10^{-7}\,\mathrm s = 100\,\mathrm{ns}.
$$

这里假定了激发态寿命远长于 $100\,\mathrm{ns}$。
:::
:::

::: exercise 失谐的驱动 {level=1 check="1/2"}
二能级体系被驱动，失谐 $\Delta$ 等于其拉比频率 $\Omega$。它能达到的最大激发态概率是多少？
::: solution
[[#eq-rabi]] 的最大值是 $\Omega^2/(\Omega^2 + \Delta^2) = \Omega^2/2\Omega^2 = \frac12$，在 $\Omega't = \pi$（$\Omega' = \sqrt2\,\Omega$）处达到。这正是共振曲线的半高之处，所以以失谐计的半高全宽为 $2\Omega$。
:::
:::

::: exercise 一个寿命 {level=1 check="1.595"}
已知氢 $2p\to1s$ 的 $A = 6.268\times10^{8}\,\mathrm{s^{-1}}$，求 $2p$ 的寿命（以纳秒计，四位有效数字），以及 $5.00\,\mathrm{ns}$ 后剩余布居的比例。
::: solution
$\tau = 1/A = 1/(6.268\times10^{8})\,\mathrm s = 1.595\times10^{-9}\,\mathrm s = 1.595\,\mathrm{ns}$。$5.00\,\mathrm{ns}$ 后剩余比例为 $e^{-t/\tau} = e^{-3.134} = 0.0435$。
:::
:::

::: exercise 最优脉冲长度 {level=2 check="sqrt(2)"}
在 [[#ex-kick]] 中固定 $F_0$ 与 $\omega$，改变 $\tau$。$\omega\tau$ 为多大时激发概率最大？
::: solution
$P \propto \tau^2e^{-\omega^2\tau^2/2}$。令 $s = \omega\tau$，最大化 $s^2e^{-s^2/2}$：导数为 $(2s - s^3)e^{-s^2/2}$，在 $s^2 = 2$ 处为零，故 $\omega\tau = \sqrt2$。固定 $F_0$ 时太短的脉冲提供的冲量不足；太长的脉冲是绝热的，什么也不激发。
:::
:::

::: exercise 突变近似 {level=2 check="32/(9*pi^2)"}
粒子处于 $0 < x < L$ 无限深方势阱的基态。右壁被突然移到 $x = 2L$，快至波函数来不及改变。随后测量能量，测得粒子处于新势阱基态的概率是多少？
::: hint
变化是瞬时的，故变化之后一刻的态等于之前一刻的态；把它按新的本征态展开。
:::
::: solution
旧基态为 $\psi = \sqrt{2/L}\,\sin(\pi x/L)$（在 $(0, L)$ 上），之外为零。新基态为 $\phi_1 = \sqrt{1/L}\,\sin(\pi x/2L)$（在 $(0, 2L)$ 上）。取 $u = \pi x/L$，重叠为

$$
\langle\phi_1\vert\psi\rangle = \frac{\sqrt2}{L}\int_0^L\sin\frac{\pi x}{L}\sin\frac{\pi x}{2L}\,\dd x = \frac{\sqrt2}{\pi}\int_0^\pi\sin u\,\sin\frac u2\,\dd u = \frac{\sqrt2}{\pi}\cdot\frac43.
$$

（该积分：$\sin u = 2\sin\frac u2\cos\frac u2$，故 $\int_0^\pi2\sin^2\frac u2\cos\frac u2\,\dd u = \frac43\bigl[\sin^3\frac u2\bigr]_0^\pi = \frac43$。）概率为 $(4\sqrt2/3\pi)^2 = 32/9\pi^2 = 0.360$。突变极限与绝热极限相反：绝热情形中粒子将确定地处于新基态。
:::
:::

::: exercise 选择定则的应用 {level=2}
下列氢的跃迁哪些是电偶极允许的：(a) $4f\to3d$；(b) $4f\to2p$；(c) $3d\to1s$；(d) $2p,m=1\to1s$，发出沿 $z$ 偏振的光；(e) $4p\to3p$？对每个禁戒的，指出它违反了哪条定则。
::: solution
(a) 允许：$\Delta l = -1$。(b) 禁戒：$\Delta l = -2$。(c) 禁戒：$\Delta l = -2$；$3d$ 改经 $2p$ 衰变。(d) 对该偏振禁戒：沿 $z$ 偏振的光经 $\hat z$ 耦合，要求 $\Delta m = 0$；而 $m = 1\to m = 0$ 的衰变发出的是偶极矩在 $xy$ 平面内旋转的光。(e) 禁戒：$\Delta l = 0$，宇称排除。主量子数根本不进入定则；$n$ 的改变任意都可。
:::
:::

::: exercise 莱曼-β {#exr-3p level=3 check="1.67"}
计算氢 $3p\to1s$ 的自发辐射速率（以 $10^{8}\,\mathrm{s^{-1}}$ 为单位）。使用 $R_{31}(r) = \frac{8}{27\sqrt6}\,a_0^{-3/2}\left(1 - \frac{r}{6a_0}\right)\frac{r}{a_0}e^{-r/3a_0}$ 与 $R_{10} = 2a_0^{-3/2}e^{-r/a_0}$。
::: hint
与 [[#ex-lyman]] 一样，$\lvert\mathbf r_{fi}\rvert^2 = \frac13\left(\int_0^\infty R_{10}R_{31}r^3\,\dd r\right)^2$。使用 $\int_0^\infty\rho^ke^{-b\rho}\,\dd\rho = k!/b^{k+1}$，取 $b = \frac43$。
:::
::: solution
取 $\rho = r/a_0$，乘积 $R_{10}R_{31}r^3$ 给出径向积分

$$
\frac{16a_0}{27\sqrt6}\int_0^\infty\left(\rho^4 - \frac{\rho^5}{6}\right)e^{-4\rho/3}\,\dd\rho = \frac{16a_0}{27\sqrt6}\left[\frac{4!}{(4/3)^5} - \frac{5!}{6\,(4/3)^6}\right].
$$

算方括号：$24/(4/3)^5 = 24\times243/1024 = 5.6953$，$20/(4/3)^6 = 20\times729/4096 = 3.5596$，故方括号为 $2.1357$，积分为 $\frac{16}{27\sqrt6}\times2.1357\,a_0 = 0.51669\,a_0$。于是 $\lvert\mathbf r_{fi}\rvert^2 = \frac13(0.51669)^2a_0^2 = 0.088989\,a_0^2$，恰为 $3^6/2^{13}\,a_0^2$。光子能量为 $\frac89\times13.606\,\mathrm{eV} = 12.094\,\mathrm{eV}$，故 $\omega_0 = 1.8374\times10^{16}\,\mathrm{s^{-1}}$。由 [[#ex-lyman]] 缩放：

$$
A = 6.268\times10^{8}\,\mathrm{s^{-1}}\times\frac{0.088989}{0.55493}\times\left(\frac{12.094}{10.204}\right)^3 = 6.268\times10^{8}\times0.16036\times1.6648\,\mathrm{s^{-1}} = 1.67\times10^{8}\,\mathrm{s^{-1}}.
$$

$3p$ 态还可以（较慢地，$2.2\times10^{7}\,\mathrm{s^{-1}}$）衰变到 $2s$，所以其寿命为 $1/(1.89\times10^{8}\,\mathrm{s^{-1}}) = 5.3\,\mathrm{ns}$，而 $88$ 个百分点的衰变发出莱曼-β。
:::
:::

::: exercise 计入简并的爱因斯坦关系 {level=3}
当下能级简并度为 $g_a$、上能级为 $g_b$，吸收系数为 $B_{ab}$、受激辐射系数为 $B_{ba}$ 时，重复 [[#thm-einstein]] 的证明。证明 $g_aB_{ab} = g_bB_{ba}$ 且 $A = (\hbar\omega_0^3/\pi^2c^3)B_{ba}$。
::: solution
速率方程为 $\dot N_b = -N_bA - N_bB_{ba}u + N_aB_{ab}u$，平衡时

$$
u(\omega_0) = \frac{A}{B_{ab}N_a/N_b - B_{ba}}.
$$

计入简并度的玻尔兹曼比为 $N_a/N_b = (g_a/g_b)e^{\hbar\omega_0/k_BT}$，于是

$$
u(\omega_0) = \frac{A/B_{ba}}{(g_aB_{ab}/g_bB_{ba})e^{\hbar\omega_0/k_BT} - 1}.
$$

要在一切温度下都等于普朗克公式 $(\hbar\omega_0^3/\pi^2c^3)/(e^{\hbar\omega_0/k_BT} - 1)$，指数项的系数必须为 $1$，即 $g_aB_{ab} = g_bB_{ba}$；分子必须相等，即 $A = (\hbar\omega_0^3/\pi^2c^3)B_{ba}$。高温下 $u \to \infty$，布居数必须趋于 $g_a : g_b$；仅这一极限就逼出第一个关系。由于 $A$ 是原子而非辐射的属性，无论原子是否处于平衡，这些关系都成立。
:::
:::

::: exercise 不做近似的拉比问题 {#exr-spin-rabi level=3}
自旋-$\frac12$ 粒子的 $\hat H = -\gamma\hat{\mathbf S}\cdot\mathbf B$ 处于场 $\mathbf B = B_0\hat{\mathbf z} + B_1(\cos\omega t\,\hat{\mathbf x} - \sin\omega t\,\hat{\mathbf y})$ 中。变换到与场一起旋转的参考系，证明：从自旋向上出发，$t$ 时刻自旋向下的概率精确地由 [[#eq-rabi]] 给出，其中 $\omega_0 = \gamma B_0$，$\Omega = \gamma B_1$，$\Delta = \omega - \omega_0$（差一个不影响 $P$ 的 $\Delta$ 符号约定）。
::: hint
写 $\hat H(t) = \hat R\,\hat H(0)\,\hat R^\dagger$，$\hat R = e^{i\omega t\hat S_z/\hbar}$，并令 $\lvert\Psi\rangle = \hat R\lvert\tilde\Psi\rangle$。
:::
::: solution
绕 $z$ 转 $\theta$ 角的算符是 $\hat R = e^{-i\theta\hat S_z/\hbar}$，且 $\hat R\hat S_x\hat R^\dagger = \cos\theta\,\hat S_x + \sin\theta\,\hat S_y$。取 $\theta = -\omega t$ 即得 $\cos\omega t\,\hat S_x - \sin\omega t\,\hat S_y$，所以 $\hat H(t) = \hat R\hat H(0)\hat R^\dagger$，其中 $\hat R = e^{i\omega t\hat S_z/\hbar}$，$\hat H(0) = -\gamma(B_0\hat S_z + B_1\hat S_x)$。令 $\lvert\Psi\rangle = \hat R\lvert\tilde\Psi\rangle$，则

$$
i\hbar\partial_t\lvert\Psi\rangle = i\hbar\dot{\hat R}\lvert\tilde\Psi\rangle + \hat R\,i\hbar\partial_t\lvert\tilde\Psi\rangle = \hat R\hat H(0)\lvert\tilde\Psi\rangle,
$$

而 $i\hbar\dot{\hat R} = -\omega\hat S_z\hat R$，故 $i\hbar\partial_t\lvert\tilde\Psi\rangle = \tilde H\lvert\tilde\Psi\rangle$，其中 $\tilde H = -(\gamma B_0 - \omega)\hat S_z - \gamma B_1\hat S_x$ 是*不含时的*。在基 $(\uparrow, \downarrow)$ 下，$\hat S = \frac\hbar2\boldsymbol\sigma$，

$$
\tilde H = \frac\hbar2\begin{pmatrix}-(\omega_0 - \omega) & -\Omega\\ -\Omega & \omega_0 - \omega\end{pmatrix} = -\frac\hbar2\begin{pmatrix}-\Delta & \Omega\\ \Omega & \Delta\end{pmatrix}.
$$

这与 [[#thm-rabi]] 证明中的 $M$ 结构相同，$(\tilde H/\hbar)^2 = \frac14(\Omega^2 + \Delta^2)\mathbb 1$，所以 $e^{-i\tilde Ht/\hbar} = \cos(\Omega't/2) - i(2\tilde H/\hbar\Omega')\sin(\Omega't/2)$，从向上出发向下的分量模为 $(\Omega/\Omega')\lvert\sin(\Omega't/2)\rvert$。算符 $\hat R$ 只给上下分量乘以相位，所以实验室系中的概率相同，精确地就是 [[#eq-rabi]]。能量较低的态是"向上"还是"向下"（本例中取决于 $\gamma > 0$）只改变哪个态被称为 $g$。
:::
:::
