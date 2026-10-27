[[aerodynamics/potential-flow]]以一个定理和一个缺口结束。定理：定常势流中的任何二维物体都有升力$L' = \rho_\infty V_\infty\Gamma$。缺口：单靠势流，环量$\Gamma$可以取任何值。本章针对具有尖后缘的真实翼型填补这一缺口。**库塔条件**——气流从后缘光滑地流出——选定了一个环量，从而选定了一个升力。再把薄翼型模拟为沿其中弧线分布的一层涡，问题就化为一个积分方程，它可以求出封闭形式的解。所得结果是航空学中最有用的一些公式：每弧度$2\pi$的升力线斜率，位于四分之一弦点的气动中心，以及两个关于中弧线斜率的积分，它们给出任意薄翼型的零升迎角和俯仰力矩。这些结果还解释了后缘襟翼如何起作用。

你需要用到[[aerodynamics/potential-flow]]（涡、环量、库塔-茹科夫斯基定理）以及[[aerodynamics/aerodynamic-forces]]中的系数与气动中心。所需的数学是傅里叶级数和一个标准积分，后者在下文中给出证明。

## 翼型几何

::: definition 翼型术语 {#def-airfoil}
**前缘**和**后缘**是剖面最前和最后的点，连接它们的直线是**弦线**，其长度为$c$。**中弧线**是上下表面之间中点的轨迹，中点沿垂直于中弧线本身的方向量取；它与弦线的最大距离是**最大弯度**$h$，位于$x = p\,c$处。**厚度**是沿垂直于中弧线方向量取的两表面间距离，其最大值为$t$。**迎角**$\alpha$是弦线与自由来流之间的夹角。弯度、其位置和厚度通常以弦长的分数表示。
:::

最著名的系列翼型是NACA四位数字系列，它在1930年代以解析方式定义。在编号NACA $MPTT$中，$M$是以弦长百分数表示的最大弯度，$P$是以弦长十分之一为单位的最大弯度位置，$TT$是以百分数表示的厚度：NACA 2412的弯度为2%、位于40%弦长处，厚度为12%，而NACA 0012是12%厚的对称翼型。令$\xi = x/c$，$m = M/100$，$p = P/10$，中弧线由两段抛物线组成，
$$
\frac{z}{c} = \begin{cases} \dfrac{m}{p^2}\left(2p\xi - \xi^2\right), & 0 \le \xi \le p,\\[2mm] \dfrac{m}{(1-p)^2}\left(1 - 2p + 2p\xi - \xi^2\right), & p \le \xi \le 1,\end{cases}
$$ {#eq-naca-camber}
而相对厚度为$\tau$时的半厚度分布为
$$
\frac{y_t}{c} = 5\tau\left(0.2969\sqrt{\xi} - 0.1260\,\xi - 0.3516\,\xi^2 + 0.2843\,\xi^3 - 0.1015\,\xi^4\right),
$$ {#eq-naca-thickness}
沿垂直于中弧线的方向向两侧量取。这一厚度分布有一个圆头（$\sqrt\xi$项）和一个虽小但有限的后缘厚度；中弧线在$\xi = p$处斜率连续，但曲率有跳变。

::: widget plot
f: if(x < p, m/p^2*(2*p*x - x^2), m/(1-p)^2*(1 - 2*p + 2*p*x - x^2)); if(x < p, m/p^2*(2*p*x - x^2), m/(1-p)^2*(1 - 2*p + 2*p*x - x^2)) + 5*t*(0.2969*sqrt(x) - 0.126*x - 0.3516*x^2 + 0.2843*x^3 - 0.1015*x^4); if(x < p, m/p^2*(2*p*x - x^2), m/(1-p)^2*(1 - 2*p + 2*p*x - x^2)) - 5*t*(0.2969*sqrt(x) - 0.126*x - 0.3516*x^2 + 0.2843*x^3 - 0.1015*x^4)
x: 0, 1
y: -0.3, 0.3
equal: true
sliders: m=0.02:0:0.09:0.005, p=0.4:0.1:0.9:0.05, t=0.12:0.01:0.3:0.01
labels: \text{中弧线}; \text{上表面}; \text{下表面}
caption: 由[[#eq-naca-camber]]和[[#eq-naca-thickness]]得到的NACA四位数字翼型，厚度沿竖直方向叠加（对小弯度这是很好的近似）。从NACA 2412（$m = 0.02$，$p = 0.4$，$t = 0.12$）开始。令$m = 0$得到对称的NACA 0012；增大$m$并移动$p$，看看弯度能加到多大，下表面才会变凹。下面的薄翼理论表明，**升力和力矩只依赖于中弧线**；厚度影响压强分布、最大升力和阻力，在一阶近似下不影响升力线斜率。
:::

## 库塔条件

在势流中，尖后缘有一种特殊性质。对一般的$\Gamma$值，后驻点位于上表面的某处，来自下表面的气流必须急速绕过尖锐的后缘才能到达那里。绕过半径为零的拐角需要无穷大的速度（在尖点附近势函数的行为像$r^{1/2}$，所以速度像$r^{-1/2}$）。真实的、略有黏性的流体做不到这一点：边界层会在后缘处分离。实验表明了实际发生的情况。

::: definition 库塔条件 {#def-kutta}
对于定常流动中具有尖后缘的翼型，环量取这样的值，使**气流从后缘光滑地流出**，且该处速度有限。等价地：对于后缘角有限的情形，后缘是驻点；对于尖点形后缘，两个表面上的速度在该处有限且相等。对于强度为$\gamma(s)$（单位长度上的强度）的涡面模型，该条件为
$$
\gamma(\text{后缘}) = 0 .
$$
:::

最后一种形式成立，是因为穿过涡面的切向速度跳跃等于其当地强度，$u_\text{上} - u_\text{下} = \gamma$，而在后缘处两个表面的速度必须相同（都为零，或相等且有限）。流动如何“知道”要选择这个环量？当翼型从静止起动时，流动起初**确实**会急速绕过后缘，边界层在那里分离并卷起成为一个**起动涡**，向下游脱落。由开尔文定理，包围翼型和起动涡的一条大曲线上的总环量保持为零，因此翼型上留下一个与起动涡环量大小相等、方向相反的环量。涡的脱落一直持续到气流从后缘光滑流出——即库塔条件——然后停止。在对突然起动的翼型进行的水槽流动显示中，可以看到起动涡。

## 涡面模型与基本方程

用一个**涡面**代替翼型：沿一条曲线连续分布的涡，强度为$\gamma(s)$（单位长度上的环量，单位$\mathrm{m/s}$，顺时针为正）。一小段微元$ds$是强度为$\gamma\,ds$的点涡，因此它在距离$r$处对速度的贡献为$\gamma\,ds/(2\pi r)$，涡面的总环量为$\Gamma = \int\gamma\,ds$。对于薄翼型，作三项简化：

1. 忽略厚度；翼型就是其中弧线$z(x)$；
2. 弯度$h/c$和迎角$\alpha$都很小，因此斜率很小，且$\sin\alpha \approx \tan\alpha \approx \alpha$；
3. 因此可以把涡面放在**弦线**上而不是中弧线上，而相切条件仍用中弧线的斜率施加。

::: proposition 薄翼理论的基本方程 {#prop-fundamental}
在上述假设下，$x$和$\xi$从前缘沿弦线量取，涡面强度$\gamma(\xi)$必须满足
$$
\frac{1}{2\pi}\int_0^c \frac{\gamma(\xi)\,d\xi}{x - \xi} = V_\infty\left(\alpha - \frac{dz}{dx}\right), \qquad 0 < x < c,
$$ {#eq-fundamental}
（积分取柯西主值）以及库塔条件$\gamma(c) = 0$。
:::

::: proof
中弧线必须是一条流线：垂直于它的速度分量为零。在中弧线上的点$x$处，与弦线成$\alpha$角的自由来流$V_\infty$垂直于中弧线的分量，在小角度下为$V_\infty\sin\left(\alpha - \arctan\tfrac{dz}{dx}\right) \approx V_\infty\left(\alpha - \tfrac{dz}{dx}\right)$，方向向上穿过中弧线。弦线上的涡面诱导出竖直速度$w(x)$；斜率很小时，$w$的法向分量就是$w$本身。位于$\xi$处的顺时针微元$\gamma(\xi)\,d\xi$在$x > \xi$处诱导出**向下**的速度（顺时针旋转在其右侧把流体向下带），大小为$\gamma\,d\xi/(2\pi(x - \xi))$；同一表达式在$x < \xi$时给出向上的速度，因此以向上为正，
$$
w(x) = -\frac{1}{2\pi}\int_0^c\frac{\gamma(\xi)\,d\xi}{x - \xi} .
$$
相切条件为$V_\infty(\alpha - dz/dx) + w(x) = 0$，这就是[[#eq-fundamental]]。被积函数在$\xi = x$处奇异，但两侧的贡献在主值意义下相互抵消。假设：二维、定常、不可压缩、无黏流动；$\alpha$、弯度和厚度都很小；涡面置于弦线上；库塔条件以$\gamma(c) = 0$的形式施加。
:::

方程[[#eq-fundamental]]对$\gamma$是线性的，其右端分为迎角部分和弯度部分。标准技巧是**格劳特变换**（Glauert substitution）
$$
\xi = \frac{c}{2}\left(1 - \cos\theta_0\right), \qquad x = \frac{c}{2}\left(1 - \cos\theta\right),
$$ {#eq-glauert-sub}
它把前缘映射到$\theta = 0$，把后缘映射到$\theta = \pi$；所需要的唯一积分是：

::: lemma 格劳特积分 {#lem-glauert}
对整数$n \ge 0$和$0 < \theta < \pi$，在主值意义下
$$
\int_0^\pi \frac{\cos n\theta_0\,d\theta_0}{\cos\theta_0 - \cos\theta} = \frac{\pi\sin n\theta}{\sin\theta}
$$
从而
$$
\int_0^\pi \frac{\sin n\theta_0\,\sin\theta_0\,d\theta_0}{\cos\theta_0 - \cos\theta} = -\pi\cos n\theta \quad (n \ge 1).
$$
:::

::: proof
当$n = 0$时积分为零：作代换$t = \tan(\theta_0/2)$，它把积分化为一个有理函数的主值积分，其对数型原函数在两端取相同的值。记左端为$I_n(\theta)$。由于$\cos(n+1)\theta_0 + \cos(n-1)\theta_0 = 2\cos n\theta_0\cos\theta_0 = 2\cos n\theta_0(\cos\theta_0 - \cos\theta) + 2\cos n\theta_0\cos\theta$，
$$
I_{n+1} + I_{n-1} = 2\int_0^\pi\cos n\theta_0\,d\theta_0 + 2\cos\theta\,I_n = 2\pi\,\delta_{n0} + 2\cos\theta\,I_n .
$$
由$I_0 = 0$，取$n = 0$得$2I_1 = 2\pi$（因为$I_{-1} = I_1$），所以$I_1 = \pi = \pi\sin\theta/\sin\theta$。对$n \ge 1$，递推关系$I_{n+1} = 2\cos\theta\,I_n - I_{n-1}$恰好是$\pi\sin n\theta/\sin\theta$所满足的递推关系（由$\sin(n+1)\theta + \sin(n-1)\theta = 2\sin n\theta\cos\theta$），且两个序列在$n = 0, 1$时一致，所以对所有$n$都一致。第二种形式由$\sin n\theta_0\sin\theta_0 = \tfrac12\left[\cos(n-1)\theta_0 - \cos(n+1)\theta_0\right]$以及$\sin(n-1)\theta - \sin(n+1)\theta = -2\cos n\theta\sin\theta$得出。
:::

## 对称翼型

::: theorem 薄对称翼型 {#thm-symmetric}
对于处在迎角$\alpha$的薄对称翼型（或平板，$dz/dx = 0$），满足[[#eq-fundamental]]和库塔条件的涡面强度为
$$
\gamma(\theta) = 2\alpha V_\infty\,\frac{1 + \cos\theta}{\sin\theta},
$$ {#eq-gamma-flat}
该剖面有
$$
c_l = 2\pi\alpha, \qquad c_{m,LE} = -\frac{c_l}{4}, \qquad c_{m,c/4} = 0,
$$
因此压力中心和气动中心都位于四分之一弦点。
:::

::: proof
**验证。**利用[[#eq-glauert-sub]]，$x - \xi = \tfrac{c}{2}(\cos\theta_0 - \cos\theta)$，$d\xi = \tfrac{c}{2}\sin\theta_0\,d\theta_0$。把[[#eq-gamma-flat]]代入[[#eq-fundamental]]的左端：
$$
\frac{1}{2\pi}\int_0^\pi \frac{2\alpha V_\infty(1 + \cos\theta_0)}{\cos\theta_0 - \cos\theta}\,d\theta_0
= \frac{\alpha V_\infty}{\pi}\left(I_0 + I_1\right) = \frac{\alpha V_\infty}{\pi}(0 + \pi) = \alpha V_\infty ,
$$
这就是$dz/dx = 0$时的右端。在后缘处$\theta \to \pi$，$(1 + \cos\theta)/\sin\theta \to 0$，所以库塔条件成立。（施加库塔条件后解是唯一的：齐次方程只有一个解$1/\sin\theta$，它在后缘处为无穷大。）

**升力。**环量为
$$
\Gamma = \int_0^c\gamma\,d\xi = \frac{c}{2}\int_0^\pi 2\alpha V_\infty(1 + \cos\theta)\,d\theta = \pi\alpha c V_\infty ,
$$
所以$L' = \rho_\infty V_\infty\Gamma = \pi\alpha c\,\rho_\infty V_\infty^2$，$c_l = L'/(\tfrac12\rho_\infty V_\infty^2 c) = 2\pi\alpha$。

**力矩。**每个微元$\gamma\,d\xi$在前缘后方距离$\xi$处承受升力$\rho_\infty V_\infty\gamma\,d\xi$，产生低头力矩，所以
$$
M'_{LE} = -\rho_\infty V_\infty\int_0^c\xi\gamma\,d\xi = -\rho_\infty V_\infty\,\alpha V_\infty\frac{c^2}{2}\int_0^\pi(1 - \cos\theta)(1 + \cos\theta)\,d\theta = -\frac{\pi}{4}\alpha c^2\rho_\infty V_\infty^2 ,
$$
其中用到$\int_0^\pi\sin^2\theta\,d\theta = \pi/2$。于是$c_{m,LE} = -\pi\alpha/2 = -c_l/4$，由力矩转移，对每一个$\alpha$都有$c_{m,c/4} = c_{m,LE} + c_l/4 = 0$：四分之一弦点既是压力中心也是气动中心。
:::

载荷分布本身值得一看。穿过涡面的压强跳跃为$p_l - p_u = \rho_\infty V_\infty\gamma$（由速度跳跃$\gamma$和平均速度$\approx V_\infty$应用伯努利方程），所以$C_{p,l} - C_{p,u} = 2\gamma/V_\infty$。在弦向坐标中，利用$(1+\cos\theta)/\sin\theta = \sqrt{(1 + \cos\theta)/(1 - \cos\theta)} = \sqrt{(c - x)/x}$，
$$
\Delta C_p = C_{p,l} - C_{p,u} = 4\alpha\sqrt{\frac{c - x}{x}} .
$$ {#eq-dcp-flat}
载荷在前缘处为无穷大，在后缘处为零。前缘奇异性是可积的，它是真实圆头上吸力峰在薄翼理论中的对应：它产生一个指向前方的**前缘吸力**，恰好抵消法向力的阻力分量$N'\sin\alpha$，使阻力为零，正如库塔-茹科夫斯基定理所要求的。

::: example 5°迎角的平板 {#ex-flat-plate}
一块弦长$1.5\,\mathrm{m}$的薄平板以$\alpha = 5^\circ$置于海平面$40\,\mathrm{m/s}$的来流中。求$c_l$、环量、单位展长升力，以及弦长中点处的载荷$\Delta C_p$。
::: solution
$\alpha = 5\pi/180 = 0.08727\,\mathrm{rad}$，所以$c_l = 2\pi\alpha = 0.548$。环量为$\Gamma = \pi\alpha cV_\infty = \pi(0.08727)(1.5)(40) = 16.45\,\mathrm{m^2/s}$，$L' = \rho_\infty V_\infty\Gamma = 1.225(40)(16.45) = 806\,\mathrm{N/m}$；作为校核，$q_\infty c\,c_l = 980 \times 1.5 \times 0.548 = 806\,\mathrm{N/m}$。在弦长中点$\sqrt{(c-x)/x} = 1$，$\Delta C_p = 4\alpha = 0.349$。**合理性检验：**真实薄翼型在高雷诺数下实测的升力线斜率约为每度$0.10$–$0.11$，比$2\pi/57.3 = 0.110$低百分之几，所以$5^\circ$时$c_l \approx 0.5$是符合实际的；真实平板由于前缘尖锐，在约$8$–$10^\circ$时就会在头部分离。
:::
:::

## 有弯度的翼型

对于有弯度的剖面，把解展开为平板项加上一个在两端为零的傅里叶正弦级数：
$$
\gamma(\theta) = 2V_\infty\left[A_0\,\frac{1 + \cos\theta}{\sin\theta} + \sum_{n=1}^\infty A_n\sin n\theta\right].
$$ {#eq-gamma-camber}

::: theorem 薄弯度翼型 {#thm-cambered}
[[#eq-gamma-camber]]的系数为
$$
A_0 = \alpha - \frac{1}{\pi}\int_0^\pi\frac{dz}{dx}\,d\theta_0, \qquad A_n = \frac{2}{\pi}\int_0^\pi\frac{dz}{dx}\cos n\theta_0\,d\theta_0 \quad (n \ge 1),
$$ {#eq-An}
其中$dz/dx$在$x = \tfrac{c}{2}(1 - \cos\theta_0)$处取值。剖面系数为
$$
c_l = 2\pi\left(A_0 + \tfrac12 A_1\right) = 2\pi\left(\alpha - \alpha_{L=0}\right), \qquad
\alpha_{L=0} = -\frac{1}{\pi}\int_0^\pi\frac{dz}{dx}\left(\cos\theta_0 - 1\right)d\theta_0 ,
$$ {#eq-cl-camber}
$$
c_{m,c/4} = \frac{\pi}{4}\left(A_2 - A_1\right).
$$ {#eq-cm-camber}
不论弯度如何，升力线斜率都是每弧度$2\pi$，气动中心位于四分之一弦点，而$c_{m,ac}$只依赖于中弧线。
:::

::: proof
利用[[#eq-glauert-sub]]把[[#eq-gamma-camber]]代入[[#eq-fundamental]]。$A_0$项如[[#thm-symmetric]]中那样给出$V_\infty A_0$。由[[#lem-glauert]]的第二种形式，每个$A_n$项给出
$$
\frac{1}{2\pi}\int_0^\pi\frac{2V_\infty A_n\sin n\theta_0\sin\theta_0}{\cos\theta_0 - \cos\theta}\,d\theta_0 = -V_\infty A_n\cos n\theta .
$$
于是方程成为$A_0 - \sum A_n\cos n\theta = \alpha - dz/dx$，即
$$
\frac{dz}{dx} = \left(\alpha - A_0\right) + \sum_{n=1}^\infty A_n\cos n\theta .
$$
这是中弧线斜率在$0 \le \theta \le \pi$上的傅里叶余弦级数；标准的系数公式给出$\alpha - A_0 = \tfrac1\pi\int_0^\pi(dz/dx)\,d\theta_0$和$A_n = \tfrac2\pi\int_0^\pi(dz/dx)\cos n\theta_0\,d\theta_0$，即[[#eq-An]]。[[#eq-gamma-camber]]的每一项在$\theta = \pi$处都为零，所以库塔条件成立。

环量为$\Gamma = \tfrac{c}{2}\int_0^\pi\gamma\sin\theta\,d\theta = cV_\infty\left(\pi A_0 + \tfrac{\pi}{2}A_1\right)$，因为$\int_0^\pi\sin n\theta\sin\theta\,d\theta = \tfrac\pi2\delta_{n1}$。于是$c_l = 2\Gamma/(V_\infty c) = 2\pi(A_0 + A_1/2)$。代入[[#eq-An]]，$c_l = 2\pi\left[\alpha + \tfrac1\pi\int_0^\pi\tfrac{dz}{dx}(\cos\theta_0 - 1)\,d\theta_0\right]$，它在所述的$\alpha_{L=0}$处为零。

对于力矩，$M'_{LE} = -\rho_\infty V_\infty\int_0^c\xi\gamma\,d\xi$，其中$\xi = \tfrac{c}{2}(1 - \cos\theta)$。$A_0$项的贡献与[[#thm-symmetric]]中相同，对$c_{m,LE}$贡献$-\tfrac{\pi}{2}A_0$；$A_n$项涉及$\int_0^\pi(1 - \cos\theta)\sin n\theta\sin\theta\,d\theta$，它在$n = 1$时为$\tfrac\pi2$，$n = 2$时为$-\tfrac\pi4$（来自$-\int\cos\theta\sin2\theta\sin\theta\,d\theta$），$n \ge 3$时为$0$。合并得$c_{m,LE} = -\tfrac\pi2\left(A_0 + A_1 - \tfrac12A_2\right) = -\left[\tfrac{c_l}{4} + \tfrac\pi4(A_1 - A_2)\right]$。转移到四分之一弦点，$c_{m,c/4} = c_{m,LE} + c_l/4 = \tfrac\pi4(A_2 - A_1)$，其中不含$\alpha$：四分之一弦点就是气动中心。假设：[[#prop-fundamental]]的假设，以及中弧线斜率具有收敛的傅里叶级数。
:::

从物理上看，弯度使升力曲线整体向左平移：正弯度剖面（$A_1 > 0$）的零升迎角为负，在零迎角时就有升力，并带有低头的$c_{m,ac}$。**理想迎角**即$A_0 = 0$时的迎角，此时前缘奇异性消失，气流光滑地迎向头部；在这个迎角下剖面的吸力峰最低，实践中阻力也往往最低。

::: widget plot
f: 4*(a*pi/180)*sqrt((1 - x)/x) + 32*h*sqrt(x*(1 - x)); 4*(a*pi/180)*sqrt((1 - x)/x); 32*h*sqrt(x*(1 - x))
x: 0.005, 1
y: 0, 2.5
sliders: a=3:-4:10:0.5, h=0.04:0:0.08:0.005
labels: \Delta C_p\ \text{合计}; \text{迎角部分}; \text{弯度部分}
caption: 具有抛物线中弧线$z = 4h\,x(1 - x)$（弦长为$1$）的薄翼型上的弦向载荷$\Delta C_p = C_{p,l} - C_{p,u} = 2\gamma/V_\infty$，由[[#eq-gamma-camber]]取$A_0 = \alpha$、$A_1 = 4h$得到：它是$\alpha = a$度时的平板载荷$4\alpha\sqrt{(1-x)/x}$与椭圆形弯度载荷$32h\sqrt{x(1-x)}$之和。令$a = 0$，即这条对称中弧线的理想迎角：前缘峰值消失，载荷平滑地分布在弦长上，$c_l = 4\pi h$。增大$a$，奇异的头部载荷占据主导；令$a$为负，头部附近的载荷变为负值——吸力峰出现在**下**表面。
:::

::: example 用薄翼理论计算NACA 2412 {#ex-naca2412}
求NACA 2412的$\alpha_{L=0}$、$c_{m,c/4}$、理想迎角以及$\alpha = 4^\circ$时的升力系数，并与艾博特和冯·多恩霍夫给出的实测值$\alpha_{L=0} \approx -2.1^\circ$、$c_{m,c/4} \approx -0.05$相比较。
::: solution
对$m = 0.02$、$p = 0.4$的[[#eq-naca-camber]]求导，得：$\xi < 0.4$时$dz/dx = \tfrac{2m}{p^2}(p - \xi) = 0.25(0.4 - \xi)$，$\xi > 0.4$时$\tfrac{2m}{(1-p)^2}(p - \xi) = 0.1111(0.4 - \xi)$。由$\xi = \tfrac12(1 - \cos\theta_0)$，$\xi = 0.4$处的分段点位于$\theta_0 = \arccos 0.2 = 78.46^\circ = 1.3694\,\mathrm{rad}$。[[#eq-An]]和[[#eq-cl-camber]]中的积分可以分段求出封闭形式，也可以数值计算；无论哪种方法都得到
$$
\alpha_{L=0} = -0.03625\,\mathrm{rad} = -2.08^\circ, \qquad A_1 = 0.08150, \quad A_2 = 0.01386,
$$
所以$c_{m,c/4} = \tfrac\pi4(0.01386 - 0.08150) = -0.0531$。$A_0 = 0$时的理想迎角为$\alpha_i = \tfrac1\pi\int_0^\pi\tfrac{dz}{dx}\,d\theta_0 = 0.00449\,\mathrm{rad} = 0.26^\circ$，此时$c_l = \pi A_1 = 0.256$。在$\alpha = 4^\circ$时，
$$
c_l = 2\pi\left(0.06981 + 0.03625\right) = 0.666 .
$$
**合理性检验：**理论与实测的零升迎角和力矩相差在百分之几度以内，$c_m$相差约$0.003$——对于12%厚的剖面，这是非常好的符合。它的升力线斜率每度$0.110$比实测值高4–5%，原因是边界层向后缘增厚，实际上减小了那里的弯度；正是这一微小的黏性修正，使真实升力曲线的斜率约为每度$0.105$。
:::
:::

::: example 圆弧（抛物线）中弧线 {#ex-parabolic}
某薄剖面的中弧线为$z = 4h\,x(c - x)/c^2$，$h/c = 0.04$。求$\alpha_{L=0}$、$c_{m,c/4}$和理想升力系数。
::: solution
$dz/dx = 4(h/c)(1 - 2\xi) = 4(h/c)\cos\theta_0$，因为$1 - 2\xi = \cos\theta_0$。余弦级数只有一项：$A_1 = 4h/c$，其余$A_n = 0$，且$\int_0^\pi(dz/dx)\,d\theta_0 = 0$，所以$A_0 = \alpha$，理想迎角为零。于是
$$
\alpha_{L=0} = -\frac{1}{\pi}\int_0^\pi\frac{4h}{c}\cos\theta_0(\cos\theta_0 - 1)\,d\theta_0 = -\frac{4h}{\pi c}\cdot\frac{\pi}{2} = -\frac{2h}{c} = -0.08\,\mathrm{rad} = -4.58^\circ,
$$
$c_{m,c/4} = \tfrac\pi4(0 - 4h/c) = -\pi h/c = -0.126$，在理想迎角下$c_l = 2\pi(0 + 2h/c) = 4\pi h/c = 0.503$。**合理性检验：**上图中仅由弯度产生的载荷在$x$方向上呈椭圆分布并关于弦长中点对称，所以其压力中心位于弦长中点：$x_{cp}/c = \tfrac14 - c_{m,c/4}/c_l = 0.25 + 0.126/0.503 = 0.50$。正确。
:::
:::

::: quiz
按照薄翼理论，把一个剖面的弯度加倍（保持其形状），会对升力线斜率和$c_{m,ac}$产生什么影响？
- [ ] 两者都加倍
- [x] 斜率保持为每弧度$2\pi$，$c_{m,ac}$加倍
- [ ] 斜率加倍，$c_{m,ac}$不变
- [ ] 两者都不变，只有$\alpha_{L=0}$加倍
::: solution
对任何弯度，斜率都是$2\pi$；弯度只是通过$\alpha_{L=0}$平移升力曲线，并确定$c_{m,ac} = \tfrac\pi4(A_2 - A_1)$。$\alpha_{L=0}$和各$A_n$都与$dz/dx$成线性关系，所以弯度加倍使$\alpha_{L=0}$和$c_{m,ac}$都加倍。
:::
:::

## 襟翼：在飞行中改变弯度

铰接于$x_h$、向下偏转$\delta$的简单后缘襟翼改变了中弧线：对小$\delta$，铰链之后的斜率变为$dz/dx - \delta$。因此薄翼理论直接给出襟翼的效果。令$\theta_h$为铰链的格劳特角，$\cos\theta_h = 1 - 2x_h/c$。

::: proposition 简单襟翼的薄翼理论 {#prop-flap}
弦长为$c_f = c - x_h$、偏转$\delta$（向下为正，以弧度计）的简单襟翼使剖面系数改变
$$
\Delta c_l = 2\left(\pi - \theta_h + \sin\theta_h\right)\delta, \qquad
\Delta c_{m,c/4} = -\tfrac12\sin\theta_h\left(1 - \cos\theta_h\right)\delta .
$$
**襟翼效率**$\tau = -\dfrac{d\alpha_{L=0}}{d\delta} = \dfrac{\pi - \theta_h + \sin\theta_h}{\pi}$表示每一度襟翼偏角相当于几分之一度的迎角。
:::

::: proof
附加斜率在$\theta_0 < \theta_h$时为$0$，在$\theta_0 > \theta_h$时为$-\delta$。由[[#eq-An]]，$\Delta A_0 = -\tfrac1\pi\int_{\theta_h}^\pi(-\delta)\,d\theta_0 = \tfrac{\delta}{\pi}(\pi - \theta_h)$，$\Delta A_1 = \tfrac2\pi(-\delta)\int_{\theta_h}^\pi\cos\theta_0\,d\theta_0 = \tfrac{2\delta}{\pi}\sin\theta_h$，$\Delta A_2 = \tfrac2\pi(-\delta)\int_{\theta_h}^\pi\cos2\theta_0\,d\theta_0 = \tfrac{\delta}{\pi}\sin2\theta_h$。于是$\Delta c_l = 2\pi(\Delta A_0 + \tfrac12\Delta A_1) = 2\delta(\pi - \theta_h + \sin\theta_h)$，$\Delta c_{m,c/4} = \tfrac\pi4(\Delta A_2 - \Delta A_1) = \tfrac\delta4(2\sin\theta_h\cos\theta_h - 2\sin\theta_h) = -\tfrac\delta2\sin\theta_h(1 - \cos\theta_h)$。用$2\pi$除$\Delta c_l$，得到等效的迎角变化$-\Delta\alpha_{L=0} = \tau\delta$。假设：薄翼理论的假设，且襟翼偏角很小；铰链处没有缝隙，也没有分离。
:::

::: example 25%弦长的襟翼 {#ex-flap}
某剖面有一个25%弦长的简单襟翼。求$d c_l/d\delta$、效率$\tau$，以及$\delta = 10^\circ$时$c_l$和$c_{m,c/4}$的变化。
::: solution
$x_h/c = 0.75$，所以$\cos\theta_h = 1 - 1.5 = -0.5$，$\theta_h = 120^\circ = 2.094\,\mathrm{rad}$，$\sin\theta_h = 0.866$。于是$dc_l/d\delta = 2(3.1416 - 2.0944 + 0.8660) = 3.83$每弧度，$\tau = 1.913/\pi = 0.609$。对$\delta = 10^\circ = 0.1745\,\mathrm{rad}$：$\Delta c_l = 3.83 \times 0.1745 = 0.668$，$\Delta c_{m,c/4} = -\tfrac12(0.866)(1.5)(0.1745) = -0.113$。**合理性检验：**占弦长四分之一的襟翼，其作用约相当于整个机翼同样角度迎角的$0.6$——超过其弦长分数，因为偏转中弧线的后部改变了整个剖面的环量。当偏角超过约$10$–$15^\circ$时，气流在襟翼上分离，简单襟翼的实测效率低于薄翼理论值，这就是大偏角时采用开缝襟翼的原因（见[[aerodynamics/viscous-aerodynamics]]）。
:::
:::

::: warning 度、弧度与角度的大小
本章每个公式中的角度都以**弧度**计：把$\alpha = 5$代入$c_l = 2\pi\alpha$会得到荒谬的$c_l = 31$。应先换算（$5^\circ = 0.0873\,\mathrm{rad}$），或使用每度斜率$2\pi/57.3 = 0.110$。第二个陷阱是适用范围：该理论是线性和无黏的，因此对失速一无所知。它对任何剖面都预测$20^\circ$时$c_l = 2.2$，而真实剖面在没有增升装置时于$c_{l,\max} \approx 1.2$–$1.8$失速。在附着流范围内，用它求零升迎角、斜率、力矩和襟翼效率，而最大升力取自试验数据。
:::

::: application 在设计中使用薄翼理论的结果
设计者实际使用的是这两个弯度积分。对于目标巡航$c_l$，选择这样一条中弧线，使其理想升力系数$c_{l,i} = 2\pi\cdot\tfrac12A_1$（在$A_0 = 0$时）接近巡航值，从而头部光滑地迎向气流、吸力峰较低；然后由零升迎角确定机翼的安装角，由$c_{m,ac}$确定平尾必须承担的配平载荷（低头的$c_{m,ac}$在常规布局的平尾上需要向下的载荷，这会损失升力，从而增加诱导阻力）。S形中弧线（实际上$A_2 > A_1$，即后缘上翘）以牺牲升力为代价，为无尾飞机提供$c_{m,ac} \approx 0$。然后根据结构和最大升力选择厚度，再用面元法（[[aerodynamics/panel-methods]]）细化压强分布。
:::

::: history
库塔1902年计算圆弧面升力时施加了今天所称的库塔条件，茹科夫斯基1910年用共形映射得到的翼型，为一族有弯度、有厚度的剖面给出了精确的势流解。针对任意中弧线的一般**薄翼理论**，由普朗特的学生、后加入NACA的马克斯·**门克**（Max Munk）在《薄翼剖面的一般理论》（*General Theory of Thin Wing Sections*，NACA第142号报告，1922年）中给出，其形式是关于剖面坐标的两个积分，分别给出零升迎角和力矩。赫尔曼·**格劳特**（Hermann Glauert）在《翼型与螺旋桨理论基础》（*The Elements of Aerofoil and Airscrew Theory*，1926年）中，用本章所用的三角代换和傅里叶级数重新表述了这一理论，后来同样的代换又解出了普朗特的升力线方程。[[#eq-naca-camber]]和[[#eq-naca-thickness]]所描述的NACA四位数字翼型，由伊斯曼·雅各布斯（Eastman Jacobs）、肯尼思·沃德（Kenneth Ward）和罗伯特·平克顿（Robert Pinkerton）定义并在变密度风洞中试验（NACA第460号报告，1933年）。
:::

## 小结

::: summary
- 尖后缘通过**库塔条件**确定环量：气流从后缘光滑地流出，$\gamma(\text{后缘}) = 0$。从物理上看，起动涡不断脱落，直到该条件成立。
- 薄翼理论把剖面模拟为弦线上的涡面，并要求中弧线是一条流线：$\frac{1}{2\pi}\int\gamma\,d\xi/(x - \xi) = V_\infty(\alpha - dz/dx)$。
- 对称剖面：$c_l = 2\pi\alpha$，$c_{m,c/4} = 0$，压力中心和气动中心位于四分之一弦点；$\Delta C_p = 4\alpha\sqrt{(c - x)/x}$。
- 有弯度的剖面：$c_l = 2\pi(\alpha - \alpha_{L=0})$，其中$\alpha_{L=0} = -\frac1\pi\int_0^\pi\frac{dz}{dx}(\cos\theta_0 - 1)\,d\theta_0$，而$c_{m,c/4} = \frac\pi4(A_2 - A_1)$与$\alpha$无关。对NACA 2412：$-2.08^\circ$和$-0.053$。
- 简单襟翼就是弯度的改变：$dc_l/d\delta = 2(\pi - \theta_h + \sin\theta_h)$，对25%襟翼约为每弧度$3.8$。
- 角度用弧度；在这一阶近似下没有失速、没有阻力，也没有厚度效应。
:::

## 习题

::: exercise 平板升力 {level=1 check="0.768"}
一个薄对称翼型处于$7^\circ$迎角。按照薄翼理论，它的升力系数是多少？（输入$c_l$。）
::: solution
$c_l = 2\pi\alpha = 2\pi(7\pi/180) = 2\pi(0.12217) = 0.768$。
:::
:::

::: exercise 给定升力所需的迎角 {level=1 check="2.48"}
按照薄翼理论（$\alpha_{L=0} = -2.08^\circ$），NACA 2412剖面在什么迎角下给出$c_l = 0.5$？（以度为单位输入$\alpha$。）
::: solution
$\alpha - \alpha_{L=0} = c_l/2\pi = 0.0796\,\mathrm{rad} = 4.56^\circ$，所以$\alpha = 4.56 - 2.08 = 2.48^\circ$。
:::
:::

::: exercise 平板上的载荷 {level=1 check="0.279"}
一块薄平板处于$4^\circ$迎角。弦长中点处下表面与上表面的压强系数差是多少？（输入$\Delta C_p$。）
::: solution
由[[#eq-dcp-flat]]，$\Delta C_p = 4\alpha\sqrt{(c - x)/x} = 4(0.06981)(1) = 0.279$。
:::
:::

::: exercise NACA 4412 {level=2 check="-4.15"}
对NACA 4412（弯度4%，位于40%弦长处）重复[[#ex-naca2412]]中的零升迎角计算。（以度为单位输入$\alpha_{L=0}$。）
::: solution
对固定的$p$，中弧线[[#eq-naca-camber]]与$m$成正比，而$\alpha_{L=0}$和所有$A_n$都与它成线性关系，所以结果简单地加倍：$\alpha_{L=0} = 2 \times (-2.08^\circ) = -4.15^\circ$，$c_{m,c/4} = 2 \times (-0.0531) = -0.106$。（实测值约为$-4^\circ$和$-0.09$至$-0.10$。）
:::
:::

::: exercise 20%襟翼的襟翼效率 {level=2 check="0.550"}
求20%弦长简单襟翼的薄翼理论襟翼效率$\tau$。（输入$\tau$。）
::: solution
$\cos\theta_h = 1 - 2(0.8) = -0.6$，$\theta_h = 2.2143\,\mathrm{rad}$，$\sin\theta_h = 0.8$。$\tau = (\pi - 2.2143 + 0.8)/\pi = 1.7273/\pi = 0.550$，$dc_l/d\delta = 2\pi\tau = 3.45$每弧度。
:::
:::

::: exercise 襟翼产生的力矩 {level=2 check="-0.113"}
对于[[#ex-flap]]中的25%襟翼，在$\alpha = 2^\circ$的对称剖面上向下偏转$10^\circ$，求$c_l$和$c_{m,c/4}$。（输入$c_{m,c/4}$。）
::: solution
对称剖面贡献$c_l = 2\pi(0.03491) = 0.219$，对四分之一弦点没有力矩；襟翼增加$0.668$和$-0.113$。合计$c_l = 0.887$，$c_{m,c/4} = -0.113$。偏转襟翼的低头俯仰力矩，就是放下襟翼时平尾载荷发生变化的原因。
:::
:::

::: exercise 有弯度剖面的压力中心 {level=2 check="0.40"}
对[[#ex-parabolic]]中的抛物线中弧线（$h/c = 0.04$），在$\alpha = 3^\circ$时求$c_l$和压力中心。（输入$x_{cp}/c$，保留两位小数。）
::: solution
$c_l = 2\pi(\alpha + 2h/c) = 2\pi(0.05236 + 0.08) = 0.832$。由于对四分之一弦点$c_{m,ac} = -0.126$，$x_{cp}/c = 0.25 + 0.1257/0.832 = 0.25 + 0.151 = 0.40$。压力中心位于四分之一弦点（迎角载荷的作用点）与弦长中点（弯度载荷的作用点）之间，按它们各自承担的升力份额加权。
:::
:::

::: exercise 推导力矩系数 {level=3}
从$M'_{LE} = -\rho_\infty V_\infty\int_0^c\xi\gamma(\xi)\,d\xi$和[[#eq-gamma-camber]]出发，通过计算$n = 1, 2, \geq 3$时的三个积分$\int_0^\pi(1 - \cos\theta)\sin n\theta\sin\theta\,d\theta$，证明
$$
c_{m,LE} = -\frac{\pi}{2}\left(A_0 + A_1 - \frac{A_2}{2}\right)
$$
然后证明气动中心位于四分之一弦点。
::: solution
由$\xi = \tfrac c2(1 - \cos\theta)$，$d\xi = \tfrac c2\sin\theta\,d\theta$，$c_{m,LE} = M'_{LE}/(q_\infty c^2) = -\tfrac{2}{V_\infty c^2}\int_0^c\xi\gamma\,d\xi = -\tfrac{1}{2V_\infty}\int_0^\pi(1 - \cos\theta)\gamma\sin\theta\,d\theta$。$A_0$项：$2V_\infty A_0\int_0^\pi(1 - \cos\theta)(1 + \cos\theta)\,d\theta = 2V_\infty A_0\cdot\tfrac\pi2$。$A_n$项需要$J_n = \int_0^\pi(1 - \cos\theta)\sin n\theta\sin\theta\,d\theta = \tfrac\pi2\delta_{n1} - \int_0^\pi\cos\theta\sin\theta\sin n\theta\,d\theta$。由于$\cos\theta\sin\theta = \tfrac12\sin2\theta$，最后一个积分为$\tfrac\pi4\delta_{n2}$。所以$J_1 = \tfrac\pi2$，$J_2 = -\tfrac\pi4$，$n \ge 3$时$J_n = 0$。合并得$c_{m,LE} = -\tfrac{1}{2V_\infty}\cdot2V_\infty\left(\tfrac\pi2A_0 + \tfrac\pi2A_1 - \tfrac\pi4A_2\right)$，即所证。由$c_l = \pi(2A_0 + A_1)$，$c_{m,LE} = -\tfrac{c_l}{4} - \tfrac\pi4(A_1 - A_2)$，而$c_{m,x} = c_{m,LE} + (x/c)c_l$恰在$x/c = \tfrac14$时与$\alpha$无关（$\alpha$只通过$A_0$、即通过$c_l$出现）。
:::
:::

::: exercise 为无尾滑翔机设计中弧线 {level=3}
一架无尾（飞翼）滑翔机需要一个$c_{m,ac} = 0$（或略为正）的剖面，以便无需尾翼即可配平，同时在适中的迎角下巡航时给出$c_l \approx 0.6$。使用形如$z/c = k\left(\xi - a\xi^2 + b\xi^3\right)$（两端$z = 0$）的中弧线，或你偏好的任何其他族，说明你将如何用薄翼理论选择其形状、$A_1$和$A_2$必须满足什么条件，以及代价是什么。对于头部附近为正、尾部附近为负的简单三次中弧线$z/c = 0.05\left(\xi - 3\xi^2 + 2\xi^3\right)$，计算$c_{m,c/4}$。
::: solution
由[[#eq-cm-camber]]，零力矩要求$A_2 = A_1$。由于$A_1$是理想迎角下升力的主要贡献者，中弧线的斜率中必须有很大的$\cos2\theta_0$分量：前部为正弯度，后部上翘（“S形”）。对于三次曲线，$dz/dx = 0.05(1 - 6\xi + 6\xi^2)$。由$\xi = \tfrac12(1 - \cos\theta_0)$，$6\xi^2 - 6\xi = \tfrac32(\cos^2\theta_0 - 1) = \tfrac34\cos2\theta_0 - \tfrac34$，所以$dz/dx = 0.05\left(\tfrac14 + \tfrac34\cos2\theta_0\right)$。于是$A_1 = 0$，$A_2 = 0.0375$，$c_{m,c/4} = \tfrac\pi4(0.0375 - 0) = +0.029$——一个略微抬头的力矩，正合所需。代价是升力。由于$A_1 = 0$，$c_l = 2\pi A_0 = 2\pi(\alpha - \alpha_i)$，其中理想迎角$\alpha_i = \tfrac1\pi\int_0^\pi(dz/dx)\,d\theta_0 = 0.05/4 = 0.0125\,\mathrm{rad} = 0.72^\circ$；[[#eq-cl-camber]]给出相同的值，$\alpha_{L=0} = -\tfrac1\pi\int_0^\pi 0.05\left(\tfrac14 + \tfrac34\cos2\theta_0\right)(\cos\theta_0 - 1)\,d\theta_0 = +0.0125\,\mathrm{rad}$。因此这条S形中弧线的零升迎角为**正**，要得到$c_l = 0.6$需要$c_l/2\pi + 0.0125 = 0.108\,\mathrm{rad} = 6.2^\circ$，巡航时远离其理想迎角（带有前缘吸力峰）。设计是一种权衡：在把后部充分上翘以保持$A_2 \ge A_1$的同时，掺入普通弯度（正的$A_1$）；选择这种组合，使理想升力系数接近巡航值；并接受比常规弯度剖面更低的$c_{l,\max}$。实践中还要利用后掠和负扭转来配平飞翼，并用面元法或黏性程序细化剖面。
:::
:::
