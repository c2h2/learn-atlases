荡秋千的孩子很快就会发现，胡乱地推收效甚微，而按照秋千自身的节奏适时地轻推，却能使摆动越来越大。洗衣机在某一个特定的转速下剧烈抖动，转速更高时又重新平稳运转。一个持续的、音高恰到好处的音符能把酒杯震碎。这三者都是**受迫振动**的实例，支配它们的方程是

$$
m\,x'' + c\,x' + k\,x = F(t),
$$ {#eq-forced}

这就是[[ode/second-order-linear]]一章中的弹簧方程加上一个外力$F(t)$。现在方程是**非齐次**的，它的解既依赖于初始状态，也依赖于外力。

本章说明如何求解这类方程。其结构很简单：每个解都是一个特解加上齐次方程的一个解，而后者我们已经会求了。求特解有两种方法。**待定系数法**很快，但只适用于常系数方程和特殊的强迫项；我们将确切地证明它何时有效、为什么有效。**常数变易法**总是有效的，它导出一个公式，把响应表示为强迫项与某个核的积分——这就是格林（Green）函数的雏形。然后我们用这些工具来理解拍、共振以及有阻尼系统对周期外力的响应。

## 通解的结构

以下总设$L[y] = y'' + p(t)y' + q(t)y$，其中$p, q$在区间$I$上连续，并且$y_1, y_2$是$L[y] = 0$的一个基本解组。

::: theorem 解的结构 {#thm-structure}
设$g$在$I$上连续，$y_p$是$L[y] = g$的任意一个解。

1. $L[y] = g$在$I$上的每个解都具有$y = y_p + c_1y_1 + c_2y_2$的形式，其中$c_1, c_2$是某些常数；并且每个具有这种形式的函数都是解。
2. （强迫项的叠加。）若对$j = 1, \dots, n$有$L[y_{p,j}] = g_j$，则对任意常数$a_j$有$L\bigl[\sum_j a_jy_{p,j}\bigr] = \sum_j a_jg_j$。
:::

::: proof
1. 若$y$是$L[y] = g$的解，则由线性性（[[ode/second-order-linear#thm-superposition]]），$L[y - y_p] = g - g = 0$，所以$y - y_p$是齐次方程的解，由[[ode/second-order-linear#thm-general]]，它等于$c_1y_1 + c_2y_2$。反过来，$L[y_p + c_1y_1 + c_2y_2] = g + 0 = g$。
2. 这仍然是$L$的线性性：$L\bigl[\sum a_jy_{p,j}\bigr] = \sum a_jL[y_{p,j}] = \sum a_jg_j$。
:::

函数$y_h = c_1y_1 + c_2y_2$称为**余解**（或齐次解），$y_p$称为**特解**。第2部分意味着可以把复杂的强迫项拆成简单的几部分，分别处理。常数$c_1, c_2$总是**最后**才用初始条件来确定，并且要针对完整的解$y_p + y_h$来确定。

::: warning 用初始条件确定常数时要针对完整的解
一个常见的错误是只用$y_h$来拟合初始条件、确定$c_1, c_2$，然后再加上$y_p$。除非$y_p(t_0) = y_p'(t_0) = 0$，否则这样做会得到错误的答案。应当先写出$y = y_p + c_1y_1 + c_2y_2$，再施加条件$y(t_0) = y_0$和$y'(t_0) = y_1$。
:::

## 待定系数法

对于常系数方程，以及由多项式、指数函数、正弦和余弦构成的强迫项，特解与强迫项具有相同的大致形状。例如，$L[y] = y'' - 3y' - 4y$把$Ae^{2t}$映为$(4 - 6 - 4)Ae^{2t} = -6Ae^{2t}$，所以要求解$L[y] = 3e^{2t}$，只需取$A = -\tfrac12$。一般地，我们猜测一个带有未知系数的形式，再通过代入确定这些系数。唯一微妙之处在于：如果所猜测的形式本身就是齐次方程的解，会发生什么？下面的定理一劳永逸地解决了这个问题。

把方程写成$P(D)y = g$，其中$D = d/dt$，$P(r) = ar^2 + br + c$是特征多项式。

::: theorem 待定系数法 {#thm-undetermined}
设$P(r) = ar^2 + br + c$具有实系数且$a \neq 0$，$p_m$是$m$次多项式，$s \in \set{0,1,2}$是$\alpha$作为$P$的根的重数（若$P(\alpha) \neq 0$，则$s = 0$）。

1. 若$g(t) = p_m(t)\,e^{\alpha t}$，其中$\alpha$是实数，则$P(D)y = g$有特解
$$
y_p = t^s\,(A_mt^m + \dots + A_1t + A_0)\,e^{\alpha t}.
$$
2. 若$g(t) = e^{\lambda t}\bigl(p_m(t)\cos\mu t + \tilde p_m(t)\sin\mu t\bigr)$，其中两个实多项式的次数都至多为$m$，并且$\alpha = \lambda + i\mu$，则存在特解
$$
y_p = t^s e^{\lambda t}\bigl(Q_m(t)\cos\mu t + \tilde Q_m(t)\sin\mu t\bigr)
$$
其中$Q_m, \tilde Q_m$是次数至多为$m$的实多项式。
:::

::: proof
关键是一个**位移法则**。对任意可导函数$u$和任意（实的或复的）$\alpha$，由乘积法则得$D(e^{\alpha t}u) = e^{\alpha t}(D + \alpha)u$。应用两次，得$D^2(e^{\alpha t}u) = e^{\alpha t}(D + \alpha)^2u$，因此

$$
P(D)\bigl[e^{\alpha t}u\bigr] = e^{\alpha t}\,P(D + \alpha)\,u .
$$ {#eq-shift}

由泰勒（Taylor）公式展开$P(r + \alpha) = P(\alpha) + P'(\alpha)\,r + a\,r^2$。若$\alpha$是$s$重根，则前$s$个系数为零，并且$P(r + \alpha) = r^sQ(r)$，其中$Q$是满足$Q(0) \neq 0$的多项式。由[[#eq-shift]]，$y = e^{\alpha t}u$是$P(D)y = p_m e^{\alpha t}$的解，当且仅当

$$
D^s\,Q(D)\,u = p_m .
$$

**第1步：求一个$m$次多项式$w$，使得$Q(D)w = p_m$。**对多项式$w = \sum_{j\le m}w_jt^j$，有$Q(D)w = Q(0)w + (\text{含 } w \text{ 的导数的项})$，而求导会降低次数。所以在基$t^m, t^{m-1}, \dots, 1$下，次数$\le m$的多项式上的映射$w\mapsto Q(D)w$是三角的，其对角元都等于$Q(0)\neq 0$；它是可逆的，所以$w$存在。$w$的首项系数等于$p_m$的首项系数除以$Q(0)$，所以$\deg w = m$。

**第2步：消去$D^s$。**设$u$是$w$的$s$重原函数，所有积分常数都取为零。则$D^su = w$，并且$u = t^s\,q(t)$，其中$\deg q = m$。因此$y_p = t^sq(t)e^{\alpha t}$是一个特解，这就证明了第1部分（对于复数$\alpha$和复系数，这些步骤同样适用）。

对于第2部分，注意$g = \operatorname{Re}\bigl((p_m - i\tilde p_m)\,e^{\alpha t}\bigr)$。对复多项式$p_m - i\tilde p_m$和复数$\alpha = \lambda + i\mu$应用第1部分，得到一个复解$z = t^sq(t)e^{\alpha t}$。由于$P$的系数是实数，$P(D)[\operatorname{Re}z] = \operatorname{Re}\,P(D)[z] = g$；再把$q$写成$q = Q_m + i R_m$，把$e^{\alpha t}$写成$e^{\alpha t} = e^{\lambda t}(\cos\mu t + i\sin\mu t)$，可知$z$的实部具有所述的形式。
:::

实际操作中：写出试探形式，乘以$t^s$，代入，然后比较系数。下表汇总了$ay'' + by' + cy = g(t)$的各种情形。

| $g(t)$ | 试探解$y_p$（乘以$t^s$之前） | $s$ = …作为$P$的根的重数 |
|---|---|---|
| $p_m(t)$ | $A_mt^m + \dots + A_0$ | $0$ |
| $p_m(t)e^{\alpha t}$ | $(A_mt^m + \dots + A_0)e^{\alpha t}$ | $\alpha$ |
| $p_m(t)e^{\lambda t}\cos\mu t$或$\sin\mu t$ | $e^{\lambda t}\bigl((A_m t^m + \dots)\cos\mu t + (B_mt^m + \dots)\sin\mu t\bigr)$ | $\lambda + i\mu$ |

::: example 拆分强迫项 {#ex-split}
求$y'' - 3y' - 4y = 3e^{2t} + 2\sin t$的通解。
::: solution
特征多项式$P(r) = r^2 - 3r - 4 = (r-4)(r+1)$给出$y_h = c_1e^{4t} + c_2e^{-t}$。由[[#thm-structure]]，我们分别处理两个强迫项。

对于$3e^{2t}$：$2$不是根，所以$s = 0$，试探$Ae^{2t}$。于是$P(D)[Ae^{2t}] = P(2)Ae^{2t} = -6Ae^{2t}$，所以$A = -\tfrac12$。

对于$2\sin t$：$\pm i$不是根，所以试探$B\cos t + C\sin t$。代入，得

$$
(-B - 3C - 4B)\cos t + (-C + 3B - 4C)\sin t = (-5B - 3C)\cos t + (3B - 5C)\sin t = 2\sin t .
$$

所以$-5B - 3C = 0$，$3B - 5C = 2$，解得$B = \tfrac{3}{17}$，$C = -\tfrac{5}{17}$。合起来，

$$
y = c_1e^{4t} + c_2e^{-t} - \tfrac12e^{2t} + \tfrac{3}{17}\cos t - \tfrac{5}{17}\sin t .
$$

注意，对正弦强迫项的试探解必须同时包含余弦：求导会把两者混在一起。
:::
:::

::: example 强迫项是齐次方程的解的情形 {#ex-modification}
求$y'' - 2y' + y = e^{t}$的一个特解。
::: solution
$P(r) = (r - 1)^2$，所以$\alpha = 1$是$s = 2$重根。$e^t$和$te^t$都是齐次方程的解，试探$Ae^t$或$Ate^t$都会得到$0 = e^t$，这是不可能的。由[[#thm-undetermined]]，我们试探$y_p = At^2e^t$。位移法则使计算毫不费力：$P(D)[e^tu] = e^tP(D+1)u = e^tD^2u$，所以取$u = At^2$，需要$D^2(At^2) = 2A = 1$。因此

$$
y_p = \tfrac12\,t^2e^{t}.
$$
:::
:::

::: quiz
$y'' - y = te^{t}$的特解的正确试探形式是什么？
- [ ] $Ate^{t}$
- [ ] $(At + B)e^{t}$
- [x] $t(At + B)e^{t}$
- [ ] $t^2(At + B)e^{t}$
::: solution
强迫项是$p_1(t)e^{t}$，其中的多项式是一次的，而$\alpha = 1$是$P(r) = r^2 - 1$的**单**根，所以$s = 1$，试探形式为$t(At + B)e^t$。（算出来得$A = \tfrac14$，$B = -\tfrac14$。）形式$(At + B)e^t$不行，因为其中的$Be^t$部分会被$P(D)$化为零。
:::
:::

## 常数变易法

待定系数法无法处理$y'' + y = \sec t$，也无法处理任何变系数方程。一般的方法是把$y_h = c_1y_1 + c_2y_2$中的常数换成函数——我们“变易参数”——寻找如下形式的解：

$$
y = u_1(t)\,y_1(t) + u_2(t)\,y_2(t).
$$

两个未知函数给了我们额外施加一个条件的自由，我们选取这个条件，使$u_1, u_2$的二阶导数不出现在计算中。

::: theorem 常数变易法 {#thm-vop}
设$y_1, y_2$是$y'' + p(t)y' + q(t)y = 0$在$I$上的基本解组，其朗斯基行列式为$W = y_1y_2' - y_1'y_2$，并设$g$在$I$上连续。则

$$
y_p(t) = -y_1(t)\int\frac{y_2(t)\,g(t)}{W(t)}\,dt + y_2(t)\int\frac{y_1(t)\,g(t)}{W(t)}\,dt
$$ {#eq-vop}

是$y'' + p(t)y' + q(t)y = g(t)$在$I$上的一个特解。
:::

::: proof
由于$W$在$I$上处处不为零（[[ode/second-order-linear#thm-abel]]），函数$u_1' = -y_2g/W$和$u_2' = y_1g/W$连续，所以$u_1$、$u_2$（任取原函数）存在，并且$y_p = u_1y_1 + u_2y_2$就是[[#eq-vop]]。按照构造，$(u_1', u_2')$满足线性方程组

$$
\begin{aligned}
u_1'y_1 + u_2'y_2 &= 0, \\
u_1'y_1' + u_2'y_2' &= g,
\end{aligned}
$$

这可以通过代入来验证（也可以用克拉默（Cramer）法则推导出来，其系数行列式就是$W$）。现在对$y_p$求导。由第一个方程，

$$
y_p' = u_1y_1' + u_2y_2' + \underbrace{u_1'y_1 + u_2'y_2}_{=\,0} = u_1y_1' + u_2y_2',
$$

再求一次导，得$y_p'' = u_1y_1'' + u_2y_2'' + u_1'y_1' + u_2'y_2'$。因此

$$
L[y_p] = u_1\bigl(y_1'' + py_1' + qy_1\bigr) + u_2\bigl(y_2'' + py_2' + qy_2\bigr) + u_1'y_1' + u_2'y_2' = 0 + 0 + g,
$$

这里用到了第二个方程。
:::

::: warning 使用标准形式
公式[[#eq-vop]]适用于首项系数为$1$的方程。对于$t^2y'' - 2ty' + 2y = t^3$，公式中的强迫项是$g(t) = t^3/t^2 = t$，而不是$t^3$。忘记作除法是使用这一方法时最常见的错误。
:::

::: example 表中没有的强迫项 {#ex-sec}
在$\left(-\frac\pi2, \frac\pi2\right)$上求解$y'' + y = \sec t$。
::: solution
取$y_1 = \cos t$，$y_2 = \sin t$，$W = \cos^2t + \sin^2t = 1$。则

$$
u_1 = -\int\sin t\sec t\,dt = -\int\tan t\,dt = \ln(\cos t), \qquad u_2 = \int\cos t\sec t\,dt = t,
$$

其中在该区间上$\cos t > 0$。因此$y_p = \cos t\,\ln(\cos t) + t\sin t$，通解为

$$
y = c_1\cos t + c_2\sin t + \cos t\,\ln(\cos t) + t\sin t .
$$

区间很重要：$\sec t$在$\pm\frac\pi2$处不连续，特解在那里有对数奇点。
:::
:::

::: example 变系数方程 {#ex-vop-euler}
已知$y_1 = t$和$y_2 = t^2$是$t^2y'' - 2ty' + 2y = 0$的解，在$t > 0$上求解$t^2y'' - 2ty' + 2y = t^3$。
::: solution
化为标准形式，强迫项为$g = t$。朗斯基行列式为$W = t\cdot 2t - 1\cdot t^2 = t^2$。于是

$$
u_1 = -\int\frac{t^2\cdot t}{t^2}\,dt = -\frac{t^2}{2}, \qquad u_2 = \int\frac{t\cdot t}{t^2}\,dt = t,
$$

所以$y_p = -\frac{t^2}{2}\cdot t + t\cdot t^2 = \frac{t^3}{2}$。验证：$t^2(3t) - 2t\bigl(\frac32t^2\bigr) + 2\cdot\frac{t^3}{2} = 3t^3 - 3t^3 + t^3 = t^3$。通解为$y = c_1t + c_2t^2 + \frac{t^3}{2}$。
:::
:::

::: quiz
你想用$y_1 = t$，$y_2 = t^2$，对$t > 0$上的$t^2y'' - 2ty' + 2y = t^3\ln t$应用[[#eq-vop]]。代入公式的函数$g$是哪一个？
- [ ] $g(t) = t^3\ln t$
- [x] $g(t) = t\ln t$
- [ ] $g(t) = \ln t$
- [ ] $g(t) = t^3\ln t/W(t)$
::: solution
这个公式是对标准形式$y'' + py' + qy = g$推导出来的，所以要把方程除以$t^2$：$g(t) = t\ln t$。（朗斯基行列式$W = t^2$则单独出现在公式中。）
:::
:::

在[[#eq-vop]]中取定积分，可以得到答案的一种特别有启发性的形式。

::: corollary 把响应表示为强迫项的积分 {#cor-green}
在[[#thm-vop]]的假设下，对$t_0\in I$，$L[y] = g$满足$y(t_0) = y'(t_0) = 0$的解为

$$
y(t) = \int_{t_0}^{t} G(t,s)\,g(s)\,ds, \qquad G(t,s) = \frac{y_1(s)\,y_2(t) - y_1(t)\,y_2(s)}{W(s)} .
$$ {#eq-green}

对于常系数方程，$G(t,s) = h(t - s)$，其中$h$是齐次方程满足$h(0) = 0$，$h'(0) = 1$的解。
:::

::: proof
在[[#eq-vop]]中把原函数取为$\int_{t_0}^t$，就恰好得到[[#eq-green]]，所以它是一个解。显然$y(t_0) = 0$；而由[[#thm-vop]]的证明，$y' = u_1y_1' + u_2y_2'$，其中$u_1(t_0) = u_2(t_0) = 0$，所以$y'(t_0) = 0$。

对固定的$s$，$t \mapsto G(t,s)$是$y_1, y_2$的线性组合，因而是齐次方程的解，并且$G(s,s) = 0$，$\partial_tG(s,s) = \bigl(y_1(s)y_2'(s) - y_1'(s)y_2(s)\bigr)/W(s) = 1$。对于常系数方程，$t\mapsto h(t - s)$也是齐次方程的解（时间平移不变性），并且在$t = s$处有相同的值，所以由唯一性，$G(t,s) = h(t-s)$。
:::

::: intuition 把一次次冲击累加起来
公式[[#eq-green]]有一个物理解释。把外力切成一个个短促的冲击：在$[s, s + \Delta s]$期间，力提供冲量$g(s)\Delta s$，它使原本静止的系统以速度$g(s)\Delta s$开始运动。在时刻$s$受到单位速度冲击后的响应是$G(t,s)$，所以由叠加原理，总响应是和$\sum G(t,s)g(s)\Delta s$，它在极限下就变成了积分。核$G$称为这个问题的**格林函数**；对于常系数方程，$h$称为**脉冲响应**。这一观点将在[[ode/laplace-transform]]一章中随着狄拉克（Dirac）δ函数和卷积再次出现。
:::

## 无阻尼受迫振动：拍与共振

考虑一个由周期力驱动的无阻尼弹簧，它从静止开始运动：

$$
x'' + \omega_0^2\,x = F_0\cos\omega t, \qquad x(0) = x'(0) = 0,
$$

其中$\omega_0 = \sqrt{k/m}$是固有频率，$F_0$是单位质量所受的力。

**非共振情形，$\omega \neq \omega_0$。**由于$i\omega$不是特征根，试探$A\cos\omega t$可行：$(\omega_0^2 - \omega^2)A = F_0$。用$x = A\cos\omega t + c_1\cos\omega_0t + c_2\sin\omega_0t$拟合初始条件，得$c_2 = 0$，$c_1 = -A$，所以

$$
x(t) = \frac{F_0}{\omega_0^2 - \omega^2}\bigl(\cos\omega t - \cos\omega_0t\bigr) = \frac{2F_0}{\omega_0^2 - \omega^2}\,\sin\frac{(\omega_0 - \omega)t}{2}\,\sin\frac{(\omega_0 + \omega)t}{2},
$$ {#eq-beats}

这里用到了恒等式$\cos A - \cos B = 2\sin\frac{B - A}{2}\sin\frac{A + B}{2}$。当$\omega$接近$\omega_0$时，这是一个以平均频率$\frac{\omega_0 + \omega}{2}$进行的快速振动，被包在一条缓慢变化的包络线$\pm\frac{2F_0}{\lvert\omega_0^2 - \omega^2\rvert}\bigl\lvert\sin\frac{(\omega_0-\omega)t}{2}\bigr\rvert$之内。振幅周期性地增大又减小：这就是**拍**，任何对着标准音调过吉他弦的人都很熟悉这种现象。

::: example 拍 {#ex-beats}
求解$x'' + 100x = 19\cos 9t$，$x(0) = x'(0) = 0$，并描述其运动。
::: solution
这里$\omega_0 = 10$，$\omega = 9$，$\frac{F_0}{\omega_0^2 - \omega^2} = \frac{19}{19} = 1$，所以由[[#eq-beats]]，

$$
x(t) = \cos 9t - \cos 10t = 2\sin\frac t2\,\sin\frac{19t}{2}.
$$

物体在包络线$\pm2\lvert\sin(t/2)\rvert$之内以角频率$9.5$振动；包络线在$t = 0, 2\pi, 4\pi, \dots$处为零，在它们的正中间达到最大值$2$。当外力与运动大致同步时，能量流入弹簧；当外力逐渐与运动失去同步时，能量又流出来；拍的周期为$2\pi/(\omega_0 - \omega) = 2\pi$。
:::
:::

**共振情形，$\omega = \omega_0$。**现在$\pm i\omega_0$是单特征根，所以由[[#thm-undetermined]]，试探解需要额外的因子$t$：$x_p = t(A\cos\omega_0t + B\sin\omega_0t)$。代入得$A = 0$，$B = \frac{F_0}{2\omega_0}$，再结合初始条件，得

$$
x(t) = \frac{F_0}{2\omega_0}\,t\sin\omega_0t .
$$

振幅**线性地无界增长**。这是[[#eq-beats]]在$\omega\to\omega_0$时的极限：拍的周期变为无穷大，包络线永远不再回落。当然，没有一根真实的弹簧能经受住这种情况——要么它断裂，要么线性模型不再适用，要么（实际中总是如此）阻尼会起作用。

::: widget plot
f: if(abs(w - 3) < 0.001, x*sin(3*x)/6, (cos(w*x) - cos(3*x))/(9 - w^2))
x: 0, 60
y: -10, 10
sliders: w=2.8:2:4:0.02
labels: x(t)
caption: $x'' + 9x = \cos\omega t$从静止出发的响应（固有频率$\omega_0 = 3$；横轴为$t$）。把$\omega$滑向$3$：拍变得更慢、更高；而恰好在$\omega = 3$时，包络线张开成纯共振的直线$\pm t/6$。把$\omega$移到远离$3$处，响应就很小，只受到轻微的调制。
:::

## 有阻尼受迫振动：瞬态与稳态

有了阻尼，情况就完全不同了。现在齐次解会逐渐消失，所以从长远看，系统会忘记它的初始状态而跟随外力。

::: proposition 瞬态衰减 {#prop-transient}
若$m, c, k > 0$且$F$连续，则$mx'' + cx' + kx = F(t)$的任意两个解$x, \tilde x$满足：当$t\to\infty$时$x(t) - \tilde x(t) \to 0$，并且是指数式地快速趋于零。
:::

::: proof
两者之差是齐次方程$mx'' + cx' + kx = 0$的解。正如[[ode/second-order-linear]]一章所示，当$m, c, k > 0$时，$mr^2 + cr + k$的两个特征根都具有负实部，所以每个齐次解都是若干项$e^{rt}$、$te^{rt}$或$e^{\lambda t}\cos\mu t$、$e^{\lambda t}\sin\mu t$的组合，其中$\operatorname{Re}r < 0$，$\lambda < 0$，而这些项都指数式地趋于$0$。
:::

所以对于周期外力$F_0\cos\omega t$，每个解都趋近于一个特殊的解，称为**稳态**，而齐次部分称为**瞬态**。

::: theorem 稳态响应 {#thm-steady}
设$m, c, k > 0$。方程$mx'' + cx' + kx = F_0\cos\omega t$恰有一个周期解

$$
x_{\mathrm{ss}}(t) = A(\omega)\cos(\omega t - \delta), \qquad A(\omega) = \frac{F_0}{\sqrt{(k - m\omega^2)^2 + c^2\omega^2}}, \qquad \tan\delta = \frac{c\,\omega}{k - m\omega^2},
$$ {#eq-steady}

其相位滞后$\delta \in (0, \pi)$，并且当$t\to\infty$时每个解都收敛于它。
:::

::: proof
我们利用复指数。由于$F_0\cos\omega t = \operatorname{Re}(F_0e^{i\omega t})$，并且方程的系数是实数，只需求出$mz'' + cz' + kz = F_0e^{i\omega t}$的一个复解$z = Ze^{i\omega t}$，再取它的实部。代入，得

$$
\bigl(k - m\omega^2 + ic\omega\bigr)Z = F_0 .
$$

括号中的因子不为零，因为它的虚部$c\omega \ne 0$（当$\omega \neq 0$时；当$\omega = 0$时，它等于$k \neq 0$）。所以$Z = F_0/(k - m\omega^2 + ic\omega)$，其模为$\lvert Z\rvert = A(\omega)$，辐角为$-\delta$，其中$\delta$是$k - m\omega^2 + ic\omega$的辐角；由于虚部为正，$\delta$落在$(0,\pi)$中。于是$\operatorname{Re}(Ze^{i\omega t}) = A(\omega)\cos(\omega t - \delta)$是一个周期解。由[[#prop-transient]]，每个解都收敛于它。如果有两个周期解，它们的差就是齐次方程的一个趋于$0$的周期解，因而恒为零。
:::

::: remark 复化
[[#thm-steady]]的证明展示了一种值得养成习惯的技巧：要求对$\cos\omega t$的响应，就改用$e^{i\omega t}$来求解，最后再取实部。求导变成乘以$i\omega$，所以常系数线性常微分方程变成了代数方程$P(i\omega)Z = F_0$。电气工程师把$Z$写成**相量**，把$P(i\omega)$称为**阻抗**；同样的思想也是[[ode/laplace-transform]]和[[pde/fourier-transform]]两章中拉普拉斯（Laplace）变换和傅里叶（Fourier）变换的基础。
:::

函数$A(\omega)/F_0$称为系统的**振幅响应**（或增益）。在$\omega = 0$处，它等于$1/k$，即静位移；当$\omega\to\infty$时，它像$1/(m\omega^2)$那样衰减，因为物体跟不上快速振荡的外力。在两者之间，它可能有一个峰。

::: corollary 实际共振 {#cor-practical}
若$c^2 < 2mk$，则振幅$A(\omega)$在如下的**共振频率**处取得最大值：

$$
\omega_r = \sqrt{\frac{k}{m} - \frac{c^2}{2m^2}} \;<\; \omega_0, \qquad\text{此时}\qquad A(\omega_r) = \frac{F_0}{c\sqrt{\dfrac km - \dfrac{c^2}{4m^2}}} .
$$

若$c^2 \ge 2mk$，则$A(\omega)$对所有$\omega > 0$递减，没有共振峰。
:::

::: proof
$A$在$f(u) = (k - mu)^2 + c^2u$最小处最大，其中$u = \omega^2 \ge 0$。由于$f'(u) = -2m(k - mu) + c^2$在$u^* = \frac km - \frac{c^2}{2m^2}$处为零，并且$f'' = 2m^2 > 0$，所以$f$在$u < u^*$时递减，在$u > u^*$时递增。若$u^* > 0$，即$c^2 < 2mk$，则$f$在$u \ge 0$上的最小值在$u^*$处取到，这时$k - mu^* = \frac{c^2}{2m}$，并且

$$
f(u^*) = \frac{c^4}{4m^2} + c^2\left(\frac km - \frac{c^2}{2m^2}\right) = c^2\left(\frac km - \frac{c^2}{4m^2}\right),
$$

这就给出了所述的最大值。若$u^* \le 0$，则$f$在$u > 0$上递增，从而$A$递减。
:::

对于小阻尼，$\omega_r \approx \omega_0$，峰高约为$F_0/(c\,\omega_0)$：阻尼减半，峰值响应就加倍。相位滞后$\delta$在$\omega = \omega_0$处经过$\frac\pi2$：在共振时，位移比外力落后四分之一周期，所以外力与**速度**同相位，做功最大。

::: example 稳态解 {#ex-steady}
求$x'' + 2x' + 5x = 10\cos t$的稳态解和通解。
::: solution
齐次解为$e^{-t}(c_1\cos2t + c_2\sin2t)$（特征根为$-1\pm2i$），这就是瞬态。为求稳态，试探$A\cos t + B\sin t$：

$$
(-A + 2B + 5A)\cos t + (-B - 2A + 5B)\sin t = 10\cos t \quad\Longrightarrow\quad 4A + 2B = 10,\quad -2A + 4B = 0,
$$

所以$A = 2$，$B = 1$，$x_{\mathrm{ss}} = 2\cos t + \sin t = \sqrt5\cos(t - \delta)$，其中$\tan\delta = \frac12$。这与[[#eq-steady]]一致：$A(1) = 10/\sqrt{(5-1)^2 + 2^2} = 10/\sqrt{20} = \sqrt5$，$\tan\delta = \frac{2\cdot1}{5 - 1} = \frac12$。通解为

$$
x = e^{-t}(c_1\cos 2t + c_2\sin 2t) + 2\cos t + \sin t,
$$

无论初始条件如何，经过几个时间单位之后，就只能看到稳态了。
:::
:::

::: widget plot
f: 1/sqrt((4 - x^2)^2 + (c*x)^2)
x: 0, 4
y: 0, 5.5
sliders: c=0.5:0.1:4:0.05
labels: A(\omega)
vlines: 2
caption: $x'' + cx' + 4x = \cos\omega t$的振幅响应$A(\omega)$（横轴为$\omega$；虚线表示固有频率$\omega_0 = 2$）。减小$c$：峰像$1/c$那样增高，并向$\omega_0$移动。把$c$增大到超过$\sqrt{8}\approx 2.83$（即$c^2 = 2mk$），峰就完全消失了。
:::

::: widget oscillator
m: 1
c: 0.3
k: 4
F: 1
omega: 1.9
x0: 0
v0: 0
caption: 由$F_0\cos\omega t$驱动的有阻尼弹簧。观察瞬态逐渐消失，运动最终稳定为以驱动频率进行的稳态振动。让$\omega$穿过固有频率$2$，把振幅与共振曲线作比较；注意外力与位移之间的相位滞后如何从接近$0$跳到接近$\pi$。
:::

::: quiz
对于$x'' + 0.4x' + 4x = \cos\omega t$，哪个驱动频率给出最大的稳态振幅？
- [ ] $\omega = 0$
- [ ] 恰好是$\omega = 2$，即固有频率
- [x] 略小于$2$
- [ ] 略大于$2$
::: solution
由[[#cor-practical]]，$\omega_r = \sqrt{4 - 0.4^2/2} = \sqrt{3.92}\approx 1.98$，略低于固有频率$\omega_0 = 2$；阻尼总是使峰向低频方向移动。（这里$c^2 = 0.16 < 2mk = 8$，所以存在峰。）
:::
:::

::: application 现实世界中的共振
共振被应用于无线电接收机：调谐就是调节电路$Lq'' + Rq' + q/C = E(t)$的固有频率，使某一个广播频率比其他所有频率都放大得更多；小的电阻$R$给出尖锐的峰和良好的选择性。共振也是一种危害。1831年，曼彻斯特附近的布劳顿悬索桥在一队士兵齐步走过时坍塌，此后各国军队都命令部队过桥时要便步走。2000年6月，伦敦千禧桥开放时左右摇晃得非常厉害，两天后就被关闭：行人不自觉地使自己的步伐与桥的摇晃同步，从而不断向它输入能量。2002年加装了阻尼器之后，它重新开放——这恰恰是[[#cor-practical]]所建议的补救办法。
:::

::: warning 并非每次坍塌都是共振
1940年塔科马海峡大桥的坍塌常被当作共振的教科书式案例。但它并不是简单的受迫共振：风是稳定的，而不是周期性的。工程师们把这次事故归因于**气动弹性颤振**，这是一种自激振动：桥本身的运动改变了气动力，使之不断向桥输入能量——实际上相当于一个负的阻尼系数。这类模型是非线性的，属于[[ode/nonlinear-systems]]一章的内容。
:::

::: history
常数变易法起源于天体力学，那里的“参数”是行星的轨道根数，它们在其他行星的引力作用下缓慢变化。欧拉（Euler）在18世纪40年代后期研究木星和土星的相互摄动时使用了这一思想；拉格朗日（Lagrange）于1766年首次使用它，并在1778—1783年的一系列论文中把它发展成一般的方法，又在1808—1810年给出了它的最终形式。[[#cor-green]]中的脉冲响应公式常被归功于让-玛丽·杜阿梅尔（Jean-Marie Duhamel），他在19世纪30年代对热方程使用了类似的叠加原理；而用一个核来表示对点源的响应这一一般思想，可以追溯到乔治·格林（George Green）1828年的论文。
:::

## 后续内容

[[ode/laplace-transform]]一章中的拉普拉斯变换给出了求特解的第三条途径，它能从容地处理间断的和脉冲式的强迫项，并把[[#cor-green]]变成卷积定理。对于方程组，常数变易法变成[[ode/linear-systems]]一章中的公式$\mathbf{x}(t) = e^{At}\mathbf{x}_0 + \int_0^te^{A(t-s)}\mathbf{f}(s)\,ds$。不是纯余弦的周期外力可以用[[pde/fourier-series]]一章的方法分解为各次谐波，而由叠加原理，响应就是对每个谐波的响应之和——每个谐波都按照响应曲线被放大。

::: summary
- $L[y] = g$的通解为$y_p + c_1y_1 + c_2y_2$；强迫项可以拆开分别处理；要用完整的解来拟合初始条件（[[#thm-structure]]）。
- **待定系数法**：对于$p_m(t)e^{\alpha t}$（或带有$\cos\mu t$、$\sin\mu t$的情形），试探同样的形式再乘以$t^s$，其中$s$是$\alpha$（或$\lambda + i\mu$）作为特征根的重数（[[#thm-undetermined]]）。
- **常数变易法**适用于任何连续的强迫项和变系数方程：$y_p = -y_1\int y_2g/W + y_2\int y_1g/W$，其中$g$取自标准形式（[[#thm-vop]]）。
- 从静止出发的响应为$\int_{t_0}^tG(t,s)g(s)\,ds$；对于常系数方程，$G(t,s) = h(t-s)$，其中$h$是脉冲响应（[[#cor-green]]）。
- 在固有频率附近的无阻尼受迫振动产生拍；恰好在固有频率处则产生共振，振幅线性增长。
- 有阻尼时，瞬态衰减，每个解都趋近于稳态$A(\omega)\cos(\omega t - \delta)$；当$c^2 < 2mk$时，振幅在$\omega_r = \sqrt{k/m - c^2/(2m^2)}$处达到峰值（[[#thm-steady]]，[[#cor-practical]]）。
:::

## 习题

::: exercise 指数型强迫项 {level=1 check="2/3"}
求$y'' + 3y' + 2y = 4e^{t}$的形如$Ae^t$的特解。$A$是多少？
::: solution
$P(1) = 1 + 3 + 2 = 6 \ne 0$，所以$s = 0$，由$P(D)[Ae^t] = 6Ae^t = 4e^t$得$A = \frac23$。
:::
:::

::: exercise 初值问题 {level=1 check="2*pi"}
求解$y'' + y = 2t$，$y(0) = 0$，$y'(0) = 0$，并求$y(\pi)$的值。
::: solution
试探$y_p = At + B$：$At + B = 2t$，所以$y_p = 2t$。于是$y = 2t + c_1\cos t + c_2\sin t$，其中$y(0) = c_1 = 0$，$y'(0) = 2 + c_2 = 0$。所以$y = 2t - 2\sin t$，$y(\pi) = 2\pi$。
:::
:::

::: exercise 选择试探形式 {level=1}
写出$y'' - 4y' + 4y = te^{2t} + \cos t$的特解的形式（不必计算系数）。
::: solution
$P(r) = (r-2)^2$。对于$te^{2t}$：$\alpha = 2$的重数为$s = 2$，多项式的次数为$1$，所以对应的项为$t^2(At + B)e^{2t}$。对于$\cos t$：$\pm i$不是根，所以对应的项为$C\cos t + D\sin t$。合起来，

$$
y_p = t^2(At + B)e^{2t} + C\cos t + D\sin t .
$$

（实际计算可得$A = \frac16$，$B = 0$，$C = \frac{3}{25}$，$D = -\frac{4}{25}$。）
:::
:::

::: exercise 常数变易法 {level=2}
在$\left(-\frac\pi2,\frac\pi2\right)$上求$y'' + y = \tan t$的通解。
::: solution
取$y_1 = \cos t$，$y_2 = \sin t$，$W = 1$：

$$
u_1 = -\int\sin t\tan t\,dt = -\int\frac{1 - \cos^2t}{\cos t}\,dt = -\ln(\sec t + \tan t) + \sin t, \qquad u_2 = \int\cos t\tan t\,dt = -\cos t .
$$

于是$y_p = \cos t\bigl(\sin t - \ln(\sec t + \tan t)\bigr) - \sin t\cos t = -\cos t\,\ln(\sec t + \tan t)$，并且

$$
y = c_1\cos t + c_2\sin t - \cos t\,\ln(\sec t + \tan t).
$$
:::
:::

::: exercise 从静止开始的共振 {level=2 check="pi/8"}
求解$x'' + 16x = 8\cos 4t$，$x(0) = x'(0) = 0$，并求$x(\pi/8)$的值。
::: solution
在共振情形（$\omega = \omega_0 = 4$）下，$x = \frac{F_0}{2\omega_0}t\sin\omega_0t = \frac{8}{8}t\sin4t = t\sin 4t$。（直接计算：试探$t(A\cos4t + B\sin4t)$给出$A = 0$，$B = 1$，而初始条件迫使$c_1 = c_2 = 0$。）于是$x(\pi/8) = \frac\pi8\sin\frac\pi2 = \frac\pi8$。
:::
:::

::: exercise 共振频率 {level=2 check="sqrt(7/2)"}
对于$x'' + x' + 4x = \cos\omega t$，求使稳态振幅最大的驱动频率$\omega_r$，以及最大振幅。
::: solution
这里$m = 1$，$c = 1$，$k = 4$，并且$c^2 = 1 < 8 = 2mk$。由[[#cor-practical]]，$\omega_r = \sqrt{4 - \frac12} = \sqrt{7/2}\approx 1.871$，$A(\omega_r) = \dfrac{1}{1\cdot\sqrt{4 - \frac14}} = \dfrac{2}{\sqrt{15}}\approx 0.516$。
:::
:::

::: exercise 最响的拍 {level=2 check="2"}
求解$x'' + 25x = 9\cos 4t$，$x(0) = x'(0) = 0$。最大位移是多少？它第一次在何时达到？
::: solution
由[[#eq-beats]]，取$\omega_0 = 5$，$\omega = 4$，$F_0/(\omega_0^2 - \omega^2) = 9/9 = 1$：$x = \cos4t - \cos5t = 2\sin\frac t2\sin\frac{9t}{2}$。显然$\lvert x\rvert\le 2$，而$x = 2$要求$\cos 4t = 1$且$\cos5t = -1$，即$4t \in 2\pi\Z$且$5t \in \pi + 2\pi\Z$。满足这些条件的最小正数$t$是$t = \pi$（$4\pi$和$5\pi$）。所以最大位移为$2$，第一次在$t = \pi$时达到，正好在第一个拍的中间。
:::
:::

::: exercise 杜阿梅尔（Duhamel）公式 {level=3}
设$f$在$[0,\infty)$上连续，$\omega > 0$。通过在积分号下求导，直接证明

$$
y(t) = \frac1\omega\int_0^t\sin\bigl(\omega(t - s)\bigr)f(s)\,ds
$$

是$y'' + \omega^2y = f(t)$，$y(0) = y'(0) = 0$的解。这里的脉冲响应是哪个函数？
::: hint
莱布尼茨（Leibniz）法则：当$K$和$\partial_t K$连续时，$\frac{d}{dt}\int_0^tK(t,s)\,ds = K(t,t) + \int_0^t\partial_tK(t,s)\,ds$。
:::
::: solution
显然$y(0) = 0$。令$K(t,s) = \frac1\omega\sin(\omega(t-s))f(s)$，则$K(t,t) = 0$，所以

$$
y'(t) = \int_0^t\cos\bigl(\omega(t-s)\bigr)f(s)\,ds, \qquad y'(0) = 0.
$$

再求一次导，这时$K(t,t) = \cos(0)f(t) = f(t)$：

$$
y''(t) = f(t) - \omega\int_0^t\sin\bigl(\omega(t-s)\bigr)f(s)\,ds = f(t) - \omega^2y(t).
$$

所以$y'' + \omega^2y = f$。脉冲响应为$h(t) = \frac{\sin\omega t}{\omega}$，它是$h'' + \omega^2h = 0$满足$h(0) = 0$，$h'(0) = 1$的解，这与[[#cor-green]]一致。
:::
:::

::: exercise 有界输入，有界输出 {level=3}
设$m, c, k > 0$，$F$在$[0,\infty)$上连续且有界，比如$\lvert F\rvert \le B$。证明$mx'' + cx' + kx = F(t)$的每个解都在$[0,\infty)$上有界。
::: hint
利用[[#cor-green]]（取$t_0 = 0$），并证明脉冲响应满足$\lvert h(t)\rvert \le Ce^{-\alpha t}$，其中$C, \alpha > 0$是某些常数。
:::
::: solution
除以$m$，化为强迫项为$F/m$的标准形式。每个解都是$x = x_h + x_0$，其中$x_h$是齐次方程的解，而$x_0(t) = \int_0^t h(t - s)\frac{F(s)}{m}\,ds$是零初值的解（[[#cor-green]]）。齐次解（包括$x_h$和$h$）是$e^{r t}$、$te^{rt}$或$e^{\lambda t}\cos\mu t$、$e^{\lambda t}\sin\mu t$的组合，其中的实部都是负的。取$\alpha > 0$小于这些实部的绝对值；由于$te^{rt}e^{\alpha t}\to 0$等等，存在$C$，使得对$\tau\ge0$有$\lvert h(\tau)\rvert\le Ce^{-\alpha\tau}$，并且$x_h$有界。于是

$$
\lvert x_0(t)\rvert \le \frac{B}{m}\int_0^tCe^{-\alpha(t-s)}\,ds \le \frac{BC}{m\alpha},
$$

所以$x = x_h + x_0$有界。（工程师称之为BIBO稳定性。没有阻尼时它不成立：共振就是有界输入产生无界输出的例子。）
:::
:::

::: exercise 共振无法避免 {level=3}
证明：无论初始条件如何，$x'' + \omega_0^2x = \cos\omega_0t$的**每个**解都在$[0,\infty)$上无界。
::: solution
由[[#thm-structure]]和共振情形的计算，每个解都具有$x = c_1\cos\omega_0t + c_2\sin\omega_0t + \frac{t\sin\omega_0t}{2\omega_0}$的形式。齐次部分以$\lvert c_1\rvert + \lvert c_2\rvert$为界。在时刻$t_n = \frac{(4n+1)\pi}{2\omega_0}$，$\sin\omega_0t_n = 1$，所以

$$
x(t_n) \ge \frac{t_n}{2\omega_0} - \lvert c_1\rvert - \lvert c_2\rvert \longrightarrow\infty .
$$

因此对于$c_1, c_2$的每一种选取，$x$都是无界的：没有任何初始条件能抵消这个增长项。
:::
:::
