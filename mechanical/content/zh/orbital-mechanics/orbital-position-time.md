[[orbital-mechanics/two-body-problem]]中的轨道方程告诉我们轨道的*形状*：半径$r$作为真近点角$\theta$的函数。它没有告诉我们航天器*何时*位于何处。而这几乎总是工程师要问的问题——卫星何时升到地面站上空，它在地球阴影中停留多久，下一次变轨时探测器在哪里，转移轨道在什么时刻到达远拱点。本章回答这个问题。对于椭圆，答案是**开普勒方程**$M = E - e\sin E$：它是时间与一个几何角——偏近点角——之间的简单关系，而偏近点角又通过一个半角公式与真近点角相联系。于是由位置求时间是直接计算；由时间求位置则需要求解一个超越方程，它没有封闭形式的解，是牛顿法的经典应用。抛物线和双曲线轨道有各自的形式——巴克（Barker）方程和双曲线开普勒方程——我们将从角动量守恒出发推导这三个方程。

## 由开普勒第二定律求时间 {#sec-second-law}

角动量守恒$h = r^2\dot\theta$已经包含了轨道的计时。分离变量，
$$
\mathrm{d}t = \frac{r^2}{h}\,\mathrm{d}\theta = \frac{h^3}{\mu^2}\,\frac{\mathrm{d}\theta}{(1 + e\cos\theta)^2},
$$ {#eq-dt}
这里用到了$r = (h^2/\mu)/(1+e\cos\theta)$。从近拱点（$\theta = 0$，时刻$t_p$）积分到$\theta$，得到**过近拱点后的时间**
$$
t - t_p = \frac{h^3}{\mu^2}\int_0^\theta \frac{\mathrm{d}\vartheta}{(1+e\cos\vartheta)^2}.
$$ {#eq-time-integral}
对于圆（$e = 0$），积分就是$\theta$，$t - t_p = (h^3/\mu^2)\,\theta = \theta/n$，其中$n = \sqrt{\mu/r^3}$：卫星以恒定角速度运动。对于椭圆，积分可以写成封闭形式，但用$\theta$表示的结果很笨拙。开普勒自己的方法——通过一个辅助角——更简洁，并给出一个容易求逆得多的方程。

::: definition 平均角速度与平近点角 {#def-mean-anomaly}
对于周期为$T$的椭圆轨道，**平均角速度**（mean motion）$n = 2\pi/T = \sqrt{\mu/a^3}$，即平均角速率。**平近点角**为
$$
M = n\,(t - t_p),
$$
即一个以速率$n$沿轨道匀速运动的假想天体自近拱点以来扫过的角度。$M$随时间线性增长；它不是任何物理矢量的方向。由开普勒第二定律，$M/2\pi$也是自近拱点以来扫过的面积占椭圆面积的比例。
:::

::: definition 偏近点角 {#def-eccentric-anomaly}
作与椭圆同心、半径为$a$的**辅助圆**。过航天器作垂直于长轴的直线，并延长使之与圆相交。**偏近点角**$E$是在椭圆*中心*处、近拱点方向与圆上该交点方向之间的夹角。在以焦点（中心天体）为原点、$x$轴指向近拱点的坐标系中，航天器位于
$$
x = a(\cos E - e), \qquad y = b\sin E, \qquad b = a\sqrt{1-e^2},
$$ {#eq-xy-E}
它到焦点的距离为
$$
r = a(1 - e\cos E).
$$ {#eq-r-E}
:::

半径公式由[[#eq-xy-E]]得出：$r^2 = a^2(\cos E - e)^2 + a^2(1-e^2)\sin^2E = a^2(1 - 2e\cos E + e^2\cos^2E) = a^2(1-e\cos E)^2$。三个近点角在近拱点（$0$）和远拱点（$\pi$）处相等；在两者之间的离去段上，$\theta > E > M$：真近点角超前，因为航天器在近拱点附近最快。

## 开普勒方程 {#sec-kepler-equation}

::: theorem 开普勒方程 {#thm-kepler}
在椭圆轨道上，偏近点角与过近拱点后的时间之间的关系为
$$
M = n\,(t - t_p) = E - e\sin E.
$$ {#eq-kepler}
:::

::: proof
把[[#eq-xy-E]]对时间求导：$\dot x = -a\sin E\,\dot E$，$\dot y = b\cos E\,\dot E$。比角动量是$\mathbf{r}\times\mathbf{v}$的$z$分量：
$$
h = x\dot y - y\dot x = ab\,\dot E\left[(\cos E - e)\cos E + \sin^2E\right] = ab\,\dot E\,(1 - e\cos E).
$$
由[[orbital-mechanics/two-body-problem]]，$h = \sqrt{\mu a(1-e^2)}$，又$ab = a^2\sqrt{1-e^2}$，所以
$$
(1 - e\cos E)\,\dot E = \frac{h}{ab} = \sqrt{\frac{\mu}{a^3}} = n.
$$
左边是$E - e\sin E$对时间的导数。从近拱点（$t = t_p$时$E = 0$）积分，得$E - e\sin E = n(t - t_p)$。所用假设是$0 \le e < 1$的二体问题的假设。
:::

它还有一种优美的几何解释，开普勒正是这样发现它的。把椭圆沿垂直于长轴的方向拉伸$a/b$倍，它就变成辅助圆，所有面积都乘以$a/b$。从近拱点到航天器扫过的面积变成面积为$\tfrac12a^2E$的圆扇形减去面积为$\tfrac12a\cdot ae\cdot\sin E$的三角形（焦点距中心$ae$），因此椭圆中扫过的面积为$\tfrac12ab\,(E - e\sin E)$。除以总面积$\pi ab$，得已经过的周期比例$(E - e\sin E)/2\pi = M/2\pi$。

要使用这个方程，需要用$\theta$表示$E$。

::: proposition 偏近点角与真近点角 {#prop-E-theta}
对$0 \le e < 1$，
$$
\cos\theta = \frac{\cos E - e}{1 - e\cos E}, \qquad \sin\theta = \frac{\sqrt{1-e^2}\,\sin E}{1 - e\cos E},
$$
以及等价且没有象限歧义的形式
$$
\tan\frac{\theta}{2} = \sqrt{\frac{1+e}{1-e}}\,\tan\frac{E}{2}.
$$ {#eq-half-angle}
:::

::: proof
由于$x = r\cos\theta$，$y = r\sin\theta$，把[[#eq-xy-E]]除以[[#eq-r-E]]：$\cos\theta = (\cos E - e)/(1 - e\cos E)$，$\sin\theta = \sqrt{1-e^2}\sin E/(1-e\cos E)$。于是
$$
1 + \cos\theta = \frac{(1-e)(1+\cos E)}{1-e\cos E}, \qquad 1 - \cos\theta = \frac{(1+e)(1-\cos E)}{1-e\cos E},
$$
第二式除以第一式，得$\tan^2(\theta/2) = \frac{1+e}{1-e}\tan^2(E/2)$。由于$\sin\theta$与$\sin E$同号，当$\theta, E \in (-\pi, \pi)$时$\theta/2$和$E/2$位于$(-\pi/2, \pi/2)$的同一象限，所以应取正平方根。
:::

编程时应采用半角形式：取$\theta$和$E$在$(-\pi, \pi]$内，$E = 2\arctan\!\big[\sqrt{(1-e)/(1+e)}\,\tan(\theta/2)\big]$永远不会落入错误的象限；而对余弦公式取$\arccos$只返回$0$到$\pi$之间的值，悄无声息地丢掉了离去段与返回段的区别。把这些结合起来，**由位置求时间**的问题是直接的：$\theta \to E \to M \to t$。

::: widget plot
f: 2*atan(sqrt((1 - e)/(1 + e))*tan(x/2)) - e*sqrt(1 - e^2)*sin(x)/(1 + e*cos(x)); x
x: -pi, pi
y: -pi, pi
sliders: e=0.5:0:0.95:0.01
labels: M(\theta); \text{圆轨道 } (e = 0)
piticks: true
caption: 平近点角$M$（与过近拱点后的时间成正比）随真近点角$\theta$的变化，按$M = E - e\sin E$计算，其中$E$由半角公式求出，$\sin E = \sqrt{1-e^2}\sin\theta/(1+e\cos\theta)$。对角线对应圆轨道。增大$e$：曲线在$\theta = 0$附近变平——航天器在极短时间内绕近拱点扫过很大的角度——而在$\theta = \pm\pi$附近变陡，那里它在缓慢爬行。在$e = 0.7$时，过近拱点四分之一周期后（$M = \pi/2$）卫星已到达$\theta \approx 2.70\ \mathrm{rad}$（$155^\circ$）。反过来读曲线——由给定的$M$求$\theta$——就是需要牛顿法的逆问题。
:::

::: example 到达给定真近点角的时间 {#ex-time-to-theta}
航天器位于[[orbital-mechanics/two-body-problem]]中的地球同步转移轨道上：$r_p = 6628\ \mathrm{km}$，$r_a = 42\,164\ \mathrm{km}$，因此$a = 24\,396\ \mathrm{km}$，$e = 0.7283$。它过近地点后多久到达$\theta = 120^\circ$？那时它有多高？
::: solution
周期和平均角速度：$T = 2\pi\sqrt{24\,396^3/398\,600} = 37\,922\ \mathrm{s}$，$n = 2\pi/T = 1.6569\times10^{-4}\ \mathrm{rad/s}$。

由[[#eq-half-angle]]求偏近点角：
$$
\tan\frac{E}{2} = \sqrt{\frac{1-0.7283}{1+0.7283}}\,\tan 60^\circ = 0.3965 \times 1.7321 = 0.6868, \qquad E = 1.2035\ \mathrm{rad}\ (68.96^\circ).
$$
由开普勒方程求平近点角：
$$
M = 1.2035 - 0.7283\sin(1.2035) = 1.2035 - 0.6797 = 0.5238\ \mathrm{rad}.
$$
时间：$t - t_p = M/n = 0.5238/1.6569\times10^{-4} = 3161\ \mathrm{s} = 52.7\ \mathrm{min}$。半径：$r = a(1 - e\cos E) = 24\,396\,(1 - 0.7283 \times 0.3596) = 18\,016\ \mathrm{km}$，高度$11\,638\ \mathrm{km}$。

**校核：**轨道方程给出相同的半径：$p = a(1-e^2) = 11\,455\ \mathrm{km}$，$r = 11\,455/(1 + 0.7283\cos 120^\circ) = 18\,016\ \mathrm{km}$。航天器在角度上已走完三分之一圈，但只用了周期的$3161/37\,922 = 8.3\,\%$——它飞速掠过近地点，而在其余时间里爬向远地点再从远地点落下。
:::
:::

## 求解开普勒方程 {#sec-solving}

逆问题——给定时刻航天器在哪里？——需要由$M$求$E$。方程$E - e\sin E = M$是超越方程；不存在用初等函数表示$E$的有限公式。但函数$f(E) = E - e\sin E - M$非常适合用牛顿法求解（[求根](/learn/maths/lesson.php?c=numerical-analysis&l=root-finding)）：对椭圆，其导数$f'(E) = 1 - e\cos E \ge 1 - e > 0$永不为零，所以$f$严格递增，根唯一，并且由于$\lvert e\sin E\rvert \le e$，根位于$[M - e, M + e]$内。

::: algorithm 求解开普勒方程的牛顿法 {#alg-kepler-newton}
给定$M$（化到$0 \le M < 2\pi$）和$0 \le e < 1$：

1. **初值。**若$M < \pi$，取$E_0 = M + e/2$，否则取$E_0 = M - e/2$。（$e$较小时取$E_0 = M$也可以。）
2. **迭代。**$E_{k+1} = E_k - \dfrac{E_k - e\sin E_k - M}{1 - e\cos E_k}$。
3. **终止**：当修正量小于容差（例如$10^{-10}\ \mathrm{rad}$）时停止。
4. **收尾。**$\theta = 2\arctan\!\big[\sqrt{(1+e)/(1-e)}\,\tan(E/2)\big]$，$r = a(1 - e\cos E)$。

迭代值一旦接近根，收敛就是二阶的——正确的位数每步大约翻一番——对典型轨道，三到五次迭代即可达到机器精度。第1步的初值把猜测值移向根，因为根满足$E - M = e\sin E$，其符号与$\sin M$相同。当$e$非常接近1而$M$接近0时，从不好的初值出发，牛顿法可能严重越过根；实用程序这时采用三次初始近似，或把根夹在一个区间内并退回到二分法。
:::

::: example 过近地点三小时后航天器在哪里？ {#ex-newton}
对[[#ex-time-to-theta]]中的转移轨道，求过近地点$3.000\ \mathrm{h}$后的$\theta$和高度。
::: solution
$M = nt = 1.6569\times10^{-4} \times 10\,800 = 1.7894\ \mathrm{rad}$。由于$M < \pi$，$E_0 = M + e/2 = 2.1536$。

| $k$ | $E_k$ | $f(E_k)/f'(E_k)$ |
|---|---|---|
| 0 | 2.153 587 | −0.174 136 |
| 1 | 2.327 723 | +0.005 896 |
| 2 | 2.321 827 | +0.000 006 16 |
| 3 | 2.321 821 | $6.7\times10^{-12}$ |

所以$E = 2.32182\ \mathrm{rad}$。于是$\tan(\theta/2) = \sqrt{1.7283/0.2717}\,\tan(1.16091) = 2.5221 \times 2.3184 = 5.847$，得$\theta = 2\arctan 5.847 = 160.45^\circ$，$r = 24\,396\,(1 - 0.7283\cos 2.32182) = 36\,521\ \mathrm{km}$，高度$30\,143\ \mathrm{km}$。

**校核：**回代：$2.32182 - 0.7283\sin 2.32182 = 2.32182 - 0.53239 = 1.78943 = M$。半个周期是$5.27\ \mathrm{h}$，所以在$3\ \mathrm{h}$时航天器应已越过$\theta = 90^\circ$但尚未到达远地点——它确实距远地点还差$20^\circ$，比远地点半径只低$5600\ \mathrm{km}$：GTO 的大部分时间都处在高处。
:::
:::

::: widget newton
f: x - 0.7283*sin(x) - 1.7894
x0: 2.1536
x: 0, 3.5
steps: 5
caption: 对[[#ex-newton]]（$e = 0.7283$，$M = 1.7894\ \mathrm{rad}$）的开普勒方程$f(E) = E - e\sin E - M$应用牛顿法，初值$E_0 = M + e/2$。每条切线都在根$E = 2.3218$附近与横轴相交，表格显示误差以二阶速度骤降。把初值拖到一个糟糕的值，例如$E_0 = 0.3$：由于$f'$在$E = 0$附近最小（那里为$1 - e$），第一条切线很平缓，迭代值跳到$5.9$，再跳到$-7.6$，远远超出图框，然后才跌跌撞撞地回到根。根唯一并不意味着任何初值都是好初值——这就是[[#alg-kepler-newton]]中初值规则的由来。
:::

对于小偏心率，$E$也可以写成$e$的幂级数。迭代$E = M + e\sin E$（对$e < 1$是压缩映射）得
$$
E = M + e\sin M + \frac{e^2}{2}\sin 2M + O(e^3),
$$
其一般系数是贝塞尔函数，$E = M + \sum_{k\ge1}\frac{2}{k}J_k(ke)\sin kM$。这一级数对近圆轨道的解析理论很有用，摄动理论也正是通过它把运动方程按$e$的幂展开；对数值计算而言，牛顿法更简单，而且总是更好。（相关的、按$e$的幂展开$E$的拉格朗日级数，在$e$超过拉普拉斯极限$e \approx 0.6627$后对某些$M$发散。）

::: example 闪电型轨道远半部分的停留时间 {#ex-molniya}
一颗通信卫星的周期为半个恒星日$T = 43\,082\ \mathrm{s}$，$e = 0.737$。它每圈有多大比例的时间处在通径的远地点一侧（$\lvert\theta\rvert > 90^\circ$）？
::: solution
在$\theta = 90^\circ$处：$\tan(E/2) = \sqrt{0.263/1.737}\tan 45^\circ = 0.3891$，$E = 0.7422\ \mathrm{rad}$，$M = 0.7422 - 0.737\sin 0.7422 = 0.2440\ \mathrm{rad}$。由对称性，卫星处在近地点一侧（$-90^\circ < \theta < 90^\circ$）的平近点角区间为$2 \times 0.2440 = 0.4881\ \mathrm{rad}$，占周期的$0.4881/2\pi = 7.8\,\%$——即$0.93\ \mathrm{h}$。其余$92.2\,\%$，即$11.04\ \mathrm{h}$，处在远地点一侧。

**校核：**对圆轨道，这一比例恰为$50\,\%$；高偏心率几乎把全部时间都转移到轨道上缓慢而遥远的部分。这就是这类轨道能让单颗卫星对高纬度地区提供长达许多小时覆盖的原因。
:::
:::

::: warning 度、弧度与错误的分支 {#warn-units}
开普勒方程把角度$E$与$e\sin E$混在一起；只有当$E$和$M$以**弧度**计时它才成立。用$E = 68.96^\circ$写出$M = E - e\sin E$，得到的是看似合理的谬误（$68.96 - 0.68$）。第二个经典错误是象限丢失：用$\arccos$由$\cos E = (e + \cos\theta)/(1 + e\cos\theta)$计算$E$，只返回$E \in [0, \pi]$，于是处于返回段（$\theta < 0$或$\theta > \pi$）的航天器被放到了离去段上，算出的过近拱点后时间可能错上整整一个周期。应使用半角公式[[#eq-half-angle]]或$\operatorname{atan2}$。最后，迭代前要把$M$化到一圈之内，即$M \bmod 2\pi$；之后各圈的过近拱点时间再加上整数个周期。
:::

## 抛物线轨道：巴克方程 {#sec-parabola}

对$e = 1$，轨道方程为$r = p/(1 + \cos\theta) = (p/2)\sec^2(\theta/2)$，其中$p = h^2/\mu$。

::: proposition 巴克方程 {#prop-barker}
在抛物线轨道上，过近拱点后的时间为
$$
\frac{\mu^2}{h^3}\,(t - t_p) = M_p = \frac12\tan\frac{\theta}{2} + \frac16\tan^3\frac{\theta}{2},
$$ {#eq-barker}
由三次方程的卡尔达诺（Cardano）公式得其反解
$$
\tan\frac{\theta}{2} = \left(3M_p + \sqrt{9M_p^2 + 1}\right)^{1/3} - \left(3M_p + \sqrt{9M_p^2 + 1}\right)^{-1/3}.
$$
:::

::: proof
由[[#eq-dt]]，取$e = 1$并利用$1 + \cos\vartheta = 2\cos^2(\vartheta/2)$，
$$
t - t_p = \frac{h^3}{\mu^2}\int_0^\theta \frac{\mathrm{d}\vartheta}{4\cos^4(\vartheta/2)} = \frac{h^3}{2\mu^2}\int_0^{\theta/2}\sec^4 u\,\mathrm{d}u,
$$
其中$u = \vartheta/2$。把$\sec^4u$写成$(1 + \tan^2u)\sec^2u$，并作代换$w = \tan u$，$\mathrm{d}w = \sec^2u\,\mathrm{d}u$，积分为$w + w^3/3$，所以$t - t_p = (h^3/\mu^2)\left[\tfrac12\tan(\theta/2) + \tfrac16\tan^3(\theta/2)\right]$。对于反解，$x = \tan(\theta/2)$满足$x^3 + 3x - 6M_p = 0$，这是只有一个实根的缺项三次方程；令$s = \left(3M_p + \sqrt{9M_p^2+1}\right)^{1/3}$，卡尔达诺公式给出$x = s - 1/s$，因为卡尔达诺公式中两个立方根的乘积为$-1$。
:::

抛物线轨道是一种边界情形——没有哪条真实轨迹的$e$恰好为1——但对于近日点附近的长周期彗星，它们是极好的近似；而巴克方程正是抛物线不同于椭圆和双曲线、无需迭代的原因。

::: example 抛物线飞越 {#ex-parabola}
航天器沿近拱点半径为$7000\ \mathrm{km}$的抛物线轨迹飞越地球。它从近拱点到$\theta = 90^\circ$需要多长时间？从$90^\circ$到$120^\circ$又需要多长时间？
::: solution
$h = \sqrt{2\mu r_p} = \sqrt{2 \times 398\,600 \times 7000} = 74\,704\ \mathrm{km^2/s}$，所以$h^3/\mu^2 = 2624\ \mathrm{s}$。

在$\theta = 90^\circ$处：$\tan 45^\circ = 1$，$M_p = \tfrac12 + \tfrac16 = 0.6667$，$t = 0.6667 \times 2624 = 1749\ \mathrm{s} = 29.2\ \mathrm{min}$；此处$r = p/(1+\cos 90^\circ) = 2r_p = 14\,000\ \mathrm{km}$。

在$\theta = 120^\circ$处：$\tan 60^\circ = 1.7321$，$M_p = 0.8660 + 0.8660 = 1.7321$，$t = 4544\ \mathrm{s} = 75.7\ \mathrm{min}$，$r = 2r_p/(1+\cos 120^\circ) = 28\,000\ \mathrm{km}$。接下来的$30^\circ$需要$2795\ \mathrm{s}$，比最初的$90^\circ$还长。

**校核：**对$\mathrm{d}t = (r^2/h)\,\mathrm{d}\theta$从$0$到$90^\circ$数值积分得$1749.17\ \mathrm{s}$，结果吻合。减速是因为抛物线上的速度$\sqrt{2\mu/r}$随$r$增大而减小。
:::
:::

## 双曲线轨道 {#sec-hyperbola}

对$e > 1$，偏近点角的作用由**双曲近点角**$F$承担，它用双曲函数代替圆函数来定义。取$a < 0$（[[orbital-mechanics/two-body-problem]]中的约定），位置为
$$
r = a(1 - e\cosh F), \qquad \tanh\frac{F}{2} = \sqrt{\frac{e-1}{e+1}}\,\tan\frac{\theta}{2}.
$$ {#eq-F-theta}

::: proposition 双曲线开普勒方程 {#prop-hyperbolic-kepler}
在双曲线轨道上
$$
M_h = e\sinh F - F = \frac{\mu^2}{h^3}\,(e^2 - 1)^{3/2}\,(t - t_p) = \sqrt{\frac{\mu}{(-a)^3}}\,(t - t_p).
$$ {#eq-kepler-h}
:::

::: proof
取原点在焦点、$x$轴指向近拱点的坐标系，把双曲线的这一支写成$x = \lvert a\rvert(e - \cosh F)$，$y = \lvert a\rvert\sqrt{e^2-1}\,\sinh F$。于是利用$\cosh^2F - \sinh^2F = 1$，$r^2 = x^2 + y^2 = a^2\left(e^2 - 2e\cosh F + \cosh^2F + (e^2-1)\sinh^2F\right) = a^2(e\cosh F - 1)^2$，所以$r = \lvert a\rvert(e\cosh F - 1) = a(1 - e\cosh F)$。与椭圆情形的证明一样，
$$
h = x\dot y - y\dot x = a^2\sqrt{e^2-1}\,\dot F\left[(e - \cosh F)\cosh F + \sinh^2F\right] = a^2\sqrt{e^2-1}\,(e\cosh F - 1)\,\dot F.
$$
代入$h = \sqrt{\mu\lvert a\rvert(e^2-1)}$，得$(e\cosh F - 1)\dot F = \sqrt{\mu/\lvert a\rvert^3}$，积分得$e\sinh F - F = \sqrt{\mu/\lvert a\rvert^3}\,(t - t_p)$。最后$h^3 = \mu^{3/2}\lvert a\rvert^{3/2}(e^2-1)^{3/2}$，所以$\sqrt{\mu/\lvert a\rvert^3} = \mu^2(e^2-1)^{3/2}/h^3$。半角关系[[#eq-F-theta]]的推导与[[#prop-E-theta]]完全相同，只需把$\cos E$换成$\cosh F$。
:::

牛顿法同样适用于$f(F) = e\sinh F - F - M_h$，其中$f'(F) = e\cosh F - 1 > 0$；当$M_h$为1的量级时，好的初值是$F_0 = M_h$；当$M_h$很大时取$F_0 = \ln(2M_h/e)$，因为此时$\sinh F \approx e^F/2$。

::: example 沿双曲线离开地球 {#ex-hyperbola}
[[orbital-mechanics/two-body-problem]]中的出发双曲线的近拱点半径为$6678\ \mathrm{km}$，$v_\infty = 3.0\ \mathrm{km/s}$。近拱点变轨之后多久，探测器距地心$100\,000\ \mathrm{km}$？
::: solution
$e = 1 + r_pv_\infty^2/\mu = 1.15078$，$h = \sqrt{\mu r_p(1+e)} = 75\,664\ \mathrm{km^2/s}$，$a = -\mu/v_\infty^2 = -44\,289\ \mathrm{km}$，$p = h^2/\mu = 14\,363\ \mathrm{km}$。

$r = 100\,000\ \mathrm{km}$处的真近点角：$\cos\theta = (p/r - 1)/e = (0.14363 - 1)/1.15078 = -0.7442$，$\theta = 138.09^\circ$（离去段，故为正）。渐近线位于$\theta_\infty = \arccos(-1/e) = 150.3^\circ$，所以探测器已经接近其渐近方向。

双曲近点角：$\tanh(F/2) = \sqrt{0.15078/2.15078}\,\tan 69.04^\circ = 0.26477 \times 2.6110 = 0.6913$，$F = 2\operatorname{artanh}(0.6913) = 1.7010$。

于是$M_h = 1.15078\sinh 1.7010 - 1.7010 = 1.15078 \times 2.6485 - 1.7010 = 1.3469$，且
$$
t - t_p = \frac{M_h}{\sqrt{\mu/\lvert a\rvert^3}} = \frac{1.3469}{\sqrt{398\,600/44\,289^3}} = \frac{1.3469}{6.7740\times10^{-5}} = 19\,884\ \mathrm{s} = 5.52\ \mathrm{h}.
$$
**校核：**$r = a(1 - e\cosh F) = -44\,289\,(1 - 1.15078 \times 2.8310) = 100\,000\ \mathrm{km}$。对于一个以$11.3\ \mathrm{km/s}$出发、正趋向$3\ \mathrm{km/s}$的探测器，平均径向速度$(100\,000 - 6678)/19\,884 = 4.7\ \mathrm{km/s}$是合理的。
:::
:::

::: remark 普适变量 {#rem-universal}
三种圆锥曲线用三个方程，在软件中很不方便，尤其在$e = 1$附近，椭圆形式和双曲线形式都会变得病态。**普适变量**表述用一个变量$\chi$代替$E$、$F$和$\tan(\theta/2)$，并用**斯通普夫函数**（Stumpff functions）$C(z) = (1 - \cos\sqrt z)/z$和$S(z) = (\sqrt z - \sin\sqrt z)/z^{3/2}$（用双曲函数解析延拓到$z \le 0$）写出时间方程，其中$z = \chi^2/a$对椭圆为正、对抛物线为零、对双曲线为负。这样，单一的牛顿迭代就能由位置和速度外推任何轨道。在[[orbital-mechanics/orbit-determination]]中求解兰伯特问题时使用的就是这种形式。
:::

::: quiz
两颗卫星在$e = 0.5$的同一条轨道上运行。卫星 A 在$t = 0$时过近拱点；卫星 B 在$t = 0$时过远拱点。在$t = T/4$时，哪种说法正确？
- [x] A 在真近点角上走过了超过$90^\circ$，B 少于$90^\circ$。
- [ ] 两者在真近点角上都恰好走过了$90^\circ$。
- [ ] A 走过了不到$90^\circ$，B 超过$90^\circ$。
- [ ] 它们位于轨道上的同一点。
::: solution
四分之一周期意味着$M$增加$\pi/2$。从近拱点出发，$M = \pi/2$给出$E = 2.02\ \mathrm{rad}$（由开普勒方程）和$\theta = 2.45\ \mathrm{rad} = 140^\circ$——远超$90^\circ$，因为卫星从轨道上快速运动的部分出发。B 从远拱点$M = \pi$出发，到达$M = 3\pi/2$；由对称性它位于$\theta = 360^\circ - 140^\circ = 220^\circ$，只走过了$40^\circ$。
:::
:::

::: history
开普勒在《新天文学》（*Astronomia Nova*，1609年）第60章中，由他的面积定律和辅助圆的几何推导出了以他命名的方程——即[[#thm-kepler]]之后那一段的论证。他无法求出它的反解，并在《哥白尼天文学概要》（*Epitome Astronomiae Copernicanae*，1618–1621年出版）中提出用逐次逼近来求解。牛顿在《原理》（1687年，第一卷第六部分）中讨论了“开普勒问题”，论证了一般情况下没有代数曲线能够解决它，并给出了近似方法。由$M$求$E$成为数值分析中研究最多的问题之一，从拉格朗日级数一直到现代的初始近似。抛物线情形以英国天文学家托马斯·巴克（Thomas Barker，1722–1809）命名，他著有《关于彗星发现的记述》（*An Account of the Discoveries concerning Comets*，1757年）；抛物线轨道当时是彗星的标准模型。
:::

## 后续内容 {#sec-next}

有了开普勒方程，就可以在轨道自身的平面内外推轨道：给定$a$、$e$和过近拱点时刻，任一时刻的位置随之可得。下一章[[orbital-mechanics/orbital-elements]]确定该平面和近拱点方向在空间中的指向，凑齐确定二体轨道的六个数。开普勒方程还会在轨道确定、调相和交会计时（[[orbital-mechanics/orbital-manoeuvres]]）以及双曲线飞越计时（[[orbital-mechanics/interplanetary-trajectories]]）中再次出现。

::: summary
- 沿轨道的时间由$h = r^2\dot\theta$得出；对圆轨道，角速率为常数$n = \sqrt{\mu/r^3}$。
- 在椭圆上，平近点角$M = n(t - t_p)$均匀增长，开普勒方程$M = E - e\sin E$把它与偏近点角$E$联系起来，且$r = a(1 - e\cos E)$，$\tan(\theta/2) = \sqrt{(1+e)/(1-e)}\tan(E/2)$。
- 由位置求时间是直接的（$\theta \to E \to M \to t$）；由时间求位置需要牛顿法，由于$f'(E) = 1 - e\cos E > 0$，它收敛很快。
- 以弧度计算，并用半角公式或 atan2 区分离去段和返回段。
- 抛物线：巴克方程$\mu^2t/h^3 = \tfrac12\tan(\theta/2) + \tfrac16\tan^3(\theta/2)$，可用卡尔达诺公式精确求逆。
- 双曲线：$e\sinh F - F = \sqrt{\mu/(-a)^3}\,(t - t_p)$，其中$\tanh(F/2) = \sqrt{(e-1)/(e+1)}\tan(\theta/2)$。
- 采用斯通普夫函数的普适变量用一个方程处理所有圆锥曲线。
:::

## 习题

::: exercise 二十分钟后的平近点角 {level=1 check="60.7"}
一颗卫星的$a = 8000\ \mathrm{km}$，$e = 0.1$。求其周期以及过近地点$20\ \mathrm{min}$后的平近点角。（以度为单位输入$M$，保留三位有效数字。）
::: solution
$n = \sqrt{398\,600/8000^3} = 8.823\times10^{-4}\ \mathrm{rad/s}$，$T = 2\pi/n = 7121\ \mathrm{s} = 118.7\ \mathrm{min}$。$M = nt = 8.823\times10^{-4} \times 1200 = 1.0588\ \mathrm{rad} = 60.7^\circ$。（在这段时间内真近点角走得更远，因为卫星是从近地点出发的。）
:::
:::

::: exercise 由真近点角求平近点角 {level=1 check="33.6"}
对$e = 0.3$的轨道，求$\theta = 60^\circ$处的偏近点角和平近点角。（以度为单位输入$M$，保留三位有效数字。）
::: solution
$\tan(E/2) = \sqrt{0.7/1.3}\,\tan 30^\circ = 0.7338 \times 0.5774 = 0.4237$，$E = 0.8015\ \mathrm{rad} = 45.92^\circ$。$M = 0.8015 - 0.3\sin 0.8015 = 0.8015 - 0.2155 = 0.5860\ \mathrm{rad} = 33.6^\circ$。与近拱点附近的预期一致，$\theta > E > M$。
:::
:::

::: exercise 近拱点附近所占的周期比例 {level=1 check="70.4"}
一颗卫星的$e = 0.5$，周期为$6.00\ \mathrm{h}$。它在通径的近拱点一侧（$-90^\circ < \theta < 90^\circ$）停留多长时间？（以分钟为单位输入时间，保留三位有效数字。）
::: solution
在$\theta = 90^\circ$处：$\tan(E/2) = \sqrt{0.5/1.5} = 0.5774$，$E = \pi/3 = 1.0472\ \mathrm{rad}$，$M = 1.0472 - 0.5\sin(\pi/3) = 1.0472 - 0.4330 = 0.6142\ \mathrm{rad}$。从$-90^\circ$到$90^\circ$的时间为$2M/n = (2 \times 0.6142/2\pi) \times 360\ \mathrm{min} = 0.1955 \times 360 = 70.4\ \mathrm{min}$——走过一半的角度，用时不到周期的五分之一。
:::
:::

::: exercise 手算牛顿法 {level=2 check="128.2"}
对$e = 0.6$和$M = 1.0000\ \mathrm{rad}$，从$E_0 = M + e/2$出发用牛顿法求解开普勒方程，并求真近点角。（以度为单位输入$\theta$，保留四位有效数字。）
::: solution
$E_0 = 1.3$。$f(1.3) = 1.3 - 0.6\sin 1.3 - 1 = -0.27809$，$f' = 1 - 0.6\cos 1.3 = 0.83950$，$E_1 = 1.3 + 0.27809/0.83950 = 1.63131$。$f(E_1) = 1.63131 - 0.59937 - 1 = 0.03194$，$f' = 1.03614$，$E_2 = 1.60004$。再迭代一步得$E_3 = 1.599749$，下一次修正量小于$10^{-7}$。所以$E = 1.59975\ \mathrm{rad}$。$\tan(\theta/2) = 2\tan(0.79987) = 2 \times 1.02938 = 2.0588$（因为$\sqrt{1.6/0.4} = 2$），$\theta = 2\arctan 2.0588 = 2.23726\ \mathrm{rad} = 128.2^\circ$。
:::
:::

::: exercise 双曲线上的时间 {level=2 check="45.7"}
一个沿双曲线飞越地球的航天器的$e = 1.5$，近拱点半径为$7000\ \mathrm{km}$。过近拱点后多久到达$\theta = 100^\circ$？（以分钟为单位输入时间，保留三位有效数字。）
::: solution
$h = \sqrt{\mu r_p(1+e)} = \sqrt{398\,600 \times 7000 \times 2.5} = 83\,519\ \mathrm{km^2/s}$。$\tanh(F/2) = \sqrt{0.5/2.5}\tan 50^\circ = 0.4472 \times 1.1918 = 0.5330$，$F = 1.1886$。$M_h = 1.5\sinh 1.1886 - 1.1886 = 1.5 \times 1.4889 - 1.1886 = 1.0447$。$t = M_h h^3/[\mu^2(e^2-1)^{3/2}] = 1.0447 \times 3666.8/1.3975 = 2741\ \mathrm{s} = 45.7\ \mathrm{min}$。（渐近线位于$\theta_\infty = \arccos(-1/1.5) = 131.8^\circ$。）
:::
:::

::: exercise 大偏心率轨道的覆盖 {level=2 check="6.41"}
[[orbital-mechanics/two-body-problem]]中设计的半恒星日轨道的$a = 26\,562\ \mathrm{km}$，近地点半径$6978\ \mathrm{km}$。卫星每圈有多长时间位于地面以上$30\,000\ \mathrm{km}$之上？（以小时为单位输入时间，保留三位有效数字。）
::: solution
$e = 1 - r_p/a = 0.7373$，$T = 43\,082\ \mathrm{s}$。当$a(1 - e\cos E) > 36\,378$时卫星位于$r = 36\,378\ \mathrm{km}$之上，即$\cos E < (1 - 36\,378/26\,562)/0.7373 = -0.5012$，所以$E_1 < E < 2\pi - E_1$，$E_1 = 2.0958\ \mathrm{rad}$。$M_1 = 2.0958 - 0.7373\sin 2.0958 = 1.4570$。位于其上的时间为$(2\pi - 2M_1)/n = (1 - M_1/\pi)\,T = 0.5360 \times 43\,082\ \mathrm{s} = 23\,091\ \mathrm{s} = 6.41\ \mathrm{h}$——超过半个周期都在$30\,000\ \mathrm{km}$以上，尽管这段弧按角度计远不到半圈。
:::
:::

::: exercise 级数解的前几项 {level=3 check="0.00445"}
从$E = M$出发，对$E = M + e\sin E$作两次不动点迭代，证明$E = M + e\sin M + \tfrac12e^2\sin 2M + O(e^3)$。对$e = 0.1$和$M = 1\ \mathrm{rad}$，把一项近似$E \approx M + e\sin M$与精确根比较。（以弧度为单位输入误差$E_\text{精确} - (M + e\sin M)$，保留三位有效数字。）
::: solution
第一次迭代：$E_1 = M + e\sin M$。第二次：$E_2 = M + e\sin(M + e\sin M) = M + e\left[\sin M + e\sin M\cos M + O(e^2)\right] = M + e\sin M + \tfrac12e^2\sin 2M + O(e^3)$。每次迭代多得一阶$e$，因为该映射的导数为$e\cos E$，其绝对值至多为$e$。

对$e = 0.1$，$M = 1$：牛顿法给出$E = 1.0885978$。一项近似值为$1 + 0.1\sin 1 = 1.0841471$，误差$0.00445\ \mathrm{rad}$。两项近似值$1.0841471 + 0.005\sin 2 = 1.0886936$的误差为$-9.6\times10^{-5}$，约小$e$倍，与$O(e^3)$余项的预测一致。
:::
:::

::: exercise 用积分推导开普勒方程 {level=3}
从[[#eq-time-integral]]出发，通过代换$\tan(\vartheta/2) = \sqrt{(1+e)/(1-e)}\tan(E'/2)$证明对$0 < e < 1$
$$
\int_0^\theta\frac{\mathrm{d}\vartheta}{(1 + e\cos\vartheta)^2} = \frac{E - e\sin E}{(1-e^2)^{3/2}},
$$
并由此重新得到开普勒方程。再说明为什么同样的代换对$e \ge 1$不适用。
::: solution
在此代换下，[[#prop-E-theta]]给出$1 + e\cos\vartheta = (1 - e^2)/(1 - e\cos E')$。对$\cos\vartheta = (\cos E' - e)/(1 - e\cos E')$求微分：$-\sin\vartheta\,\mathrm{d}\vartheta = -\frac{(1-e^2)\sin E'}{(1-e\cos E')^2}\,\mathrm{d}E'$，再利用$\sin\vartheta = \sqrt{1-e^2}\sin E'/(1 - e\cos E')$得$\mathrm{d}\vartheta = \frac{\sqrt{1-e^2}}{1 - e\cos E'}\,\mathrm{d}E'$。因此
$$
\frac{\mathrm{d}\vartheta}{(1+e\cos\vartheta)^2} = \frac{(1-e\cos E')^2}{(1-e^2)^2}\cdot\frac{\sqrt{1-e^2}}{1-e\cos E'}\,\mathrm{d}E' = \frac{1 - e\cos E'}{(1-e^2)^{3/2}}\,\mathrm{d}E',
$$
积分得$(E - e\sin E)/(1-e^2)^{3/2}$。乘以$h^3/\mu^2 = [\mu a(1-e^2)]^{3/2}/\mu^2 = (1-e^2)^{3/2}/n$，得$t - t_p = (E - e\sin E)/n$。对$e \ge 1$，因子$\sqrt{(1-e)/(1+e)}$为零或虚数：辅助圆不再存在。解析延拓$E = iF$把$\cos E$变成$\cosh F$，把$\sin E$变成$i\sinh F$，双曲线开普勒方程就是这样产生的。
:::
:::

::: exercise 设计：地影计时 {level=3}
一颗位于800 km高度圆轨道上的卫星，太阳位于其轨道平面内，当它运行到地球背后时进入地球的圆柱形阴影。(a) 证明轨道在阴影中的比例为$\arcsin(R_E/r)/\pi$，并求其值。(b) 把卫星移到$a$相同但$e = 0.1$、远地点位于阴影正中的轨道上。用开普勒方程估算新的阴影时间，并说明蓄电池需要加大还是可以减小。写明所有简化假设。
::: solution
假设：圆柱形阴影（平行阳光，无半影），半径$6378\ \mathrm{km}$的球形地球，太阳方向位于轨道平面内且在一圈内固定不变。

(a) 当卫星在夜侧且到日地连线的距离小于$R_E$时处于阴影中：$r\sin\phi < R_E$，其中$\phi$是从背日方向量起的角度。阴影弧为$2\pi$中的$2\arcsin(R_E/r)$，比例为$\arcsin(R_E/r)/\pi$。取$r = 7178\ \mathrm{km}$：$\arcsin(0.8886) = 1.0938\ \mathrm{rad}$，比例$0.3483$；$T = 6052\ \mathrm{s}$，所以在阴影中$35.1\ \mathrm{min}$。

(b) 远地点位于阴影中时，阴影边界在$r\sin\phi = R_E$处，其中$\phi = \pi - \theta$，$r = a(1-e^2)/(1+e\cos\theta)$。数值求解（二分法）得边界位于$\theta = \pm 2.125\ \mathrm{rad}$（约$\pm 121.8^\circ$），因此阴影弧为$\phi = \pm 1.017\ \mathrm{rad}$——比圆轨道情形的$\pm 1.094$窄，因为卫星更高。换算成时间：$E = 2.0376\ \mathrm{rad}$，$M = 2.0376 - 0.1\sin 2.0376 = 1.9483$，阴影持续$(2\pi - 2M)/n = (1 - M/\pi)T = 0.3798 \times 6052 = 2299\ \mathrm{s} = 38.3\ \mathrm{min}$。阴影弧在角度上更短，但卫星在远地点运动缓慢，时间效应占了上风：地影时间约长$3.2\ \mathrm{min}$，所以蓄电池必须多储存约$9\,\%$的能量。把近地点移入阴影则会缩短地影时间。（实际设计还要计入半影、太阳与轨道平面夹角的季节变化，以及蓄电池老化的裕度。）
:::
:::
