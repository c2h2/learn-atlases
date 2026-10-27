在薄边界层和尾迹之外，低速流过设计良好的机翼的空气，其行为几乎与理想流体完全相同：不可压缩、无黏、无涡。这一观察把空气动力学从纳维-斯托克斯方程中一个难以处理的问题，变成了**拉普拉斯方程**的问题，而拉普拉斯方程是线性的——因此可以把简单流动叠加起来构造复杂流动。本章建立这套工具：速度势与流函数，四种基本流动（均匀流、源、偶极子、涡），以及它们叠加而成的半无限体、圆柱和旋转圆柱绕流。本章以**库塔-茹科夫斯基定理**$L' = \rho_\infty V_\infty \Gamma$结束，它表明单位展长上的升力等于密度乘速度乘**环量**——并留下一个悬而未决的问题：**是什么确定了$\Gamma$？**这个问题由[[aerodynamics/thin-airfoil-theory]]回答。

你需要用到[[fluid-mechanics/fluid-kinematics]]中的运动学（涡量、流线）、[[fluid-mechanics/navier-stokes]]中的伯努利方程与基本方程，以及[[aerodynamics/aerodynamic-forces]]中的力系数。全章流动都是$(x, y)$平面内的二维流动，极坐标为$(r, \theta)$，速度为$\mathbf{V} = (u, v)$或$(V_r, V_\theta)$，自由来流$V_\infty$沿$+x$方向。

## 理想流动及其为何是好的模型

这里作了三项理想化假设，每一项都需要理由。**不可压缩性**（$\nabla \cdot \mathbf{V} = 0$）在$M_\infty \approx 0.3$以下精确到百分之几；更高速度下的修正见[[aerodynamics/compressible-airfoils]]。**无黏**流动在飞行的高雷诺数$\mathrm{Re} \sim 10^6$–$10^8$下、在边界层之外是精确的，此时边界层厚度只有弦长的百分之零点几；在分离区它失效。**无旋性**则由一个经典结果从前两项推出：

::: definition 涡量与环量 {#def-circulation}
流动的**涡量**为$\boldsymbol{\omega} = \nabla \times \mathbf{V}$；在二维情形它只有一个分量$\omega_z = \partial v/\partial x - \partial u/\partial y$，等于流体微团当地角速度的两倍。处处$\boldsymbol{\omega} = \mathbf{0}$的流动称为**无旋**流动。沿闭合曲线$C$的**环量**为
$$
\Gamma = -\oint_C \mathbf{V}\cdot d\mathbf{s},
$$
其中$C$按逆时针方向绕行。负号是空气动力学的约定（安德森（Anderson）的约定）：它使$\Gamma$**对顺时针环量为正**，而当来流从左向右时，产生正升力的机翼周围的环量正是这个方向。由斯托克斯定理，$\Gamma = -\iint_A \omega_z\,dA$，积分遍及$C$所围的面积。
:::

开尔文（Kelvin）环量定理指出：在受保守体积力作用的无黏正压流体中，沿随流体运动的闭合曲线的环量不变。均匀的自由来流涡量为零；跟踪任一从远前方来的流体微团，其涡量始终为零，因此边界层和尾迹之外的流动是无旋的。涡量只在固壁处由黏性产生，并局限于边界层及其脱落的尾迹之中。

## 速度势与流函数

::: definition 速度势与流函数 {#def-phi-psi}
在二维、不可压缩、无旋的流动中：

- **速度势**$\phi(x, y)$是满足$\mathbf{V} = \nabla\phi$的函数，即$u = \partial\phi/\partial x$，$v = \partial\phi/\partial y$，或$V_r = \partial\phi/\partial r$，$V_\theta = \frac{1}{r}\partial\phi/\partial\theta$；
- **流函数**$\psi(x, y)$是满足$u = \partial\psi/\partial y$，$v = -\partial\psi/\partial x$的函数，或$V_r = \frac{1}{r}\partial\psi/\partial\theta$，$V_\theta = -\partial\psi/\partial r$。

曲线$\psi = \text{常数}$是**流线**；曲线$\phi = \text{常数}$是**等势线**。两条流线之间单位厚度的体积流量等于它们的$\psi$值之差。
:::

::: proposition 两个函数都满足拉普拉斯方程 {#prop-laplace}
势函数$\phi$存在当且仅当流动无旋，流函数$\psi$存在当且仅当二维流动不可压缩。当两者都成立时，
$$
\nabla^2\phi = \frac{\partial^2\phi}{\partial x^2} + \frac{\partial^2\phi}{\partial y^2} = 0, \qquad \nabla^2\psi = 0,
$$
并且在$\mathbf{V} \ne \mathbf{0}$处流线与等势线正交。
:::

::: proof
若$\mathbf{V} = \nabla\phi$，则$\omega_z = \partial^2\phi/\partial x\,\partial y - \partial^2\phi/\partial y\,\partial x = 0$；反之，在单连通区域中旋度为零使$\int \mathbf{V}\cdot d\mathbf{s}$与路径无关，由此定义$\phi$。同样，$u = \psi_y$，$v = -\psi_x$使$\partial u/\partial x + \partial v/\partial y = \psi_{yx} - \psi_{xy} = 0$；反之，散度为零使$u\,dy - v\,dx$成为全微分，由此定义$\psi$。现在代入：把$\mathbf{V} = \nabla\phi$代入连续方程得$\nabla\cdot\nabla\phi = \nabla^2\phi = 0$；把流函数表示的速度代入无旋条件得$\omega_z = -\psi_{xx} - \psi_{yy} = 0$。最后$\nabla\phi\cdot\nabla\psi = \phi_x\psi_x + \phi_y\psi_y = u(-v) + v(u) = 0$，所以两个梯度——即两族曲线的法线——互相垂直。沿流线$d\psi = \psi_x\,dx + \psi_y\,dy = -v\,dx + u\,dy = 0$，即$dy/dx = v/u$，等于速度的斜率：流线与$\mathbf{V}$相切。在两条流线之间，穿过连接它们的任意曲线的流量为$\int (u\,dy - v\,dx) = \int d\psi = \psi_2 - \psi_1$。假设：定常（或某一瞬时的）二维流动；要使$\phi$单值，区域必须是单连通的，或者绕每个孔洞的环量都为零——下面的涡有意违反了这一条件。
:::

拉普拉斯方程是**线性的**：若$\phi_1$和$\phi_2$是解，则$\phi_1 + \phi_2$也是解，速度相加。这就是势流空气动力学的全部策略。边界条件是：远处速度趋于$V_\infty$，以及**没有流动穿过物面**：$\mathbf{V}\cdot\mathbf{n} = 0$，即物面本身是一条流线。选取一些基本解，使其和有一条形状合适的闭合流线，就得到了绕该形状的流动。压强则**事后**由伯努利方程$C_p = 1 - V^2/V_\infty^2$求得，而它不是线性的——压强不能叠加，速度可以。

## 基本流动

::: proposition 四种基本流动 {#prop-elementary}
下列函数是拉普拉斯方程的解（极坐标以原点为中心，$\Lambda$、$\kappa$、$\Gamma$为常数）：

| 流动 | $\phi$ | $\psi$ | 速度 |
|---|---|---|---|
| 均匀流 | $V_\infty x = V_\infty r\cos\theta$ | $V_\infty y = V_\infty r\sin\theta$ | $u = V_\infty$, $v = 0$ |
| 源（$\Lambda < 0$时为汇） | $\dfrac{\Lambda}{2\pi}\ln r$ | $\dfrac{\Lambda}{2\pi}\theta$ | $V_r = \dfrac{\Lambda}{2\pi r}$, $V_\theta = 0$ |
| 偶极子 | $\dfrac{\kappa}{2\pi}\dfrac{\cos\theta}{r}$ | $-\dfrac{\kappa}{2\pi}\dfrac{\sin\theta}{r}$ | $V_r = -\dfrac{\kappa}{2\pi}\dfrac{\cos\theta}{r^2}$, $V_\theta = -\dfrac{\kappa}{2\pi}\dfrac{\sin\theta}{r^2}$ |
| 涡（$\Gamma > 0$时顺时针） | $-\dfrac{\Gamma}{2\pi}\theta$ | $\dfrac{\Gamma}{2\pi}\ln r$ | $V_r = 0$, $V_\theta = -\dfrac{\Gamma}{2\pi r}$ |

源在单位厚度上发出体积流量$\Lambda$；涡沿任何包围原点的曲线的环量为$\Gamma$，沿任何不包围原点的曲线的环量为零；偶极子是相距$\ell$的一个源和一个汇在$\ell \to 0$、$\kappa = \Lambda\ell$保持不变且源位于汇上游时的极限。
:::

::: proof
在极坐标中$\nabla^2 f = f_{rr} + f_r/r + f_{\theta\theta}/r^2$。对$\ln r$：$-1/r^2 + 1/r^2 + 0 = 0$。对$\theta$：三项都为零。对$\cos\theta/r$：$2\cos\theta/r^3 - \cos\theta/r^3 - \cos\theta/r^3 = 0$，$\sin\theta/r$同理；$r\cos\theta = x$和$r\sin\theta = y$是$x, y$的线性函数。速度由定义得出；每一对都是相容的，例如对涡，$V_\theta = \tfrac1r\phi_\theta = -\Gamma/(2\pi r)$，而$V_\theta = -\psi_r = -\Gamma/(2\pi r)$。

源强：穿过半径为$r$的圆的体积流量为$\int_0^{2\pi} V_r\,r\,d\theta = \Lambda$，与$r$无关——除了在原点处产生质量之外，质量处处守恒。涡的环量：沿一个圆，$\Gamma_C = -\oint V_\theta\,r\,d\theta = -\left(-\tfrac{\Gamma}{2\pi r}\right)(2\pi r) = \Gamma$；除原点外（在原点处它是一个δ函数）涡量处处为零，所以由斯托克斯定理，任何不包围原点的曲线上环量为零。偶极子：位于$(-\ell/2, 0)$的源和位于$(+\ell/2, 0)$的汇给出$\psi = \tfrac{\Lambda}{2\pi}(\theta_1 - \theta_2)$，其中$\theta_{1,2}$是从各自位置看去的角度；当$\ell$很小时，$\theta_1 - \theta_2 \approx -\ell\sin\theta/r$，从而$\psi \to -\kappa\sin\theta/(2\pi r)$。假设：除奇点外为二维、不可压缩、无旋的流动。
:::

涡值得再看一眼。除了中心之外它处处无旋，然而绕它的环量并不为零：势函数$\phi = -\Gamma\theta/2\pi$是**多值的**，每绕一圈就跳变$\Gamma$。升力正是通过这个漏洞进入势流的。

::: example 朗肯半无限体 {#ex-half-body}
在均匀来流$V_\infty = 10\,\mathrm{m/s}$中，原点处有一个强度为$\Lambda = 10\,\mathrm{m^2/s}$的源。求驻点位置、物体在远下游的半厚度，以及源正上方物面上的速度和$C_p$。
::: solution
合成的流函数为$\psi = V_\infty r\sin\theta + \Lambda\theta/2\pi$。在负$x$轴上（$\theta = \pi$），速度为$u = V_\infty - \Lambda/(2\pi |x|)$，它在下列位置为零：
$$
x_s = -\frac{\Lambda}{2\pi V_\infty} = -\frac{10}{2\pi(10)} = -0.159\,\mathrm{m}.
$$
驻点流线满足$\psi = \Lambda/2$（即它在$\theta = \pi$处的值）；它把来自源的流体与来流分开，就是物面。在远下游（$\theta$从上方趋于$0$），$V_\infty y \to \Lambda/2$，所以半厚度为$h = \Lambda/(2V_\infty) = 0.5\,\mathrm{m}$——由连续性，源的全部流量$\Lambda$以$V_\infty$在宽度$2h$内被带往下游。在源的正上方（$\theta = \pi/2$），物面满足$V_\infty r + \Lambda/4 = \Lambda/2$，即$r = \Lambda/(4V_\infty) = 0.25\,\mathrm{m}$。该处
$$
V_r = V_\infty\cos\theta + \frac{\Lambda}{2\pi r} = 0 + \frac{10}{2\pi(0.25)} = 6.37\,\mathrm{m/s}, \qquad V_\theta = -V_\infty\sin\theta = -10\,\mathrm{m/s},
$$
所以$V = 11.85\,\mathrm{m/s}$，$C_p = 1 - (1.185)^2 = -0.405$。**合理性检验：**速度与物面相切（物面在该处向外倾斜，而$V_r > 0$、$V_\theta < 0$是向右上方的流动），且在“肩部”流动快于自由来流，所以$C_p < 0$，与任何钝头的肩部一样。
:::
:::

## 无升力圆柱与达朗贝尔佯谬

在均匀流上叠加一个偶极子：
$$
\psi = V_\infty r\sin\theta\left(1 - \frac{R^2}{r^2}\right), \qquad R^2 = \frac{\kappa}{2\pi V_\infty}.
$$ {#eq-psi-cyl}
流线$\psi = 0$由$x$轴和圆$r = R$组成，所以这是绕半径为$R$的圆柱的流动。求导得
$$
V_r = V_\infty\cos\theta\left(1 - \frac{R^2}{r^2}\right), \qquad V_\theta = -V_\infty\sin\theta\left(1 + \frac{R^2}{r^2}\right),
$$
在表面上$V_r = 0$（满足所要求的相切条件），$V_\theta = -2V_\infty\sin\theta$。表面压强系数为
$$
C_p = 1 - 4\sin^2\theta .
$$ {#eq-cp-cyl}
它在驻点$\theta = 0, \pi$处等于$1$，在$\theta = 30^\circ, 150^\circ$处过零，在顶部和底部达到$-3$，那里的流速是自由来流速度的两倍。该分布前后对称、上下对称，因此压强合力在两个方向上的积分都为零：**没有升力，也没有阻力**。零升力从对称性看是合理的。零阻力就是达朗贝尔佯谬，其解释是黏性的：在真实圆柱上，边界层无法爬过后半部的逆压梯度而发生分离，后部压强保持很低（在亚临界雷诺数下测得的底部压强系数约为$-1$），这给出接近$1.2$的阻力系数。相反，对于流线体，边界层几乎一直附着到后缘，势流压强分布接近真实情况——这就是势流对机翼有用、而对钝体阻力无用的原因。

::: example 圆柱上的压强 {#ex-cylinder}
一根半径为$0.1\,\mathrm{m}$的长圆柱置于海平面的$20\,\mathrm{m/s}$来流中。按照势流理论，表面最大速度和最小表压是多少？表面上哪些位置的压强等于$p_\infty$？
::: solution
最大速度为$\theta = \pm 90^\circ$处的$|V_\theta| = 2V_\infty = 40\,\mathrm{m/s}$。由$q_\infty = \tfrac12(1.225)(20)^2 = 245\,\mathrm{Pa}$以及该处$C_p = -3$，最小表压为$-735\,\mathrm{Pa}$。$C_p = 0$要求$\sin^2\theta = \tfrac14$：从后驻点量起$\theta = 30^\circ, 150^\circ, 210^\circ, 330^\circ$（等价地，与水平直径任一端成$\pm 30^\circ$）。**合理性检验：**这些结果都不依赖于$R$——势流中除物体之外没有其他长度尺度——而速度加倍就是圆柱经典的“速度比2”。在亚临界$\mathrm{Re}$下（这里$\mathrm{Re} = 2.7\times10^5$），真实流动在距**前**驻点约$80^\circ$处分离，因此所预测的后半部不可靠。
:::
:::

## 有升力的圆柱

现在在中心再加一个强度为$\Gamma$的顺时针涡。涡的$V_r = 0$，所以圆$r = R$仍是一条流线，无穷远处的均匀流条件也不受影响。选取常数使表面上$\psi = 0$，
$$
\psi = V_\infty r\sin\theta\left(1 - \frac{R^2}{r^2}\right) + \frac{\Gamma}{2\pi}\ln\frac{r}{R}, \qquad
V_\theta\big|_{r=R} = -2V_\infty\sin\theta - \frac{\Gamma}{2\pi R}.
$$ {#eq-lifting-cyl}
**每一个$\Gamma$值都给出绕同一圆柱的一个有效流动**：一旦物体是平面上的一个孔洞，边值问题就没有唯一解。驻点即$V_\theta = 0$之处，位于
$$
\sin\theta_s = -\frac{\Gamma}{4\pi V_\infty R},
$$ {#eq-stag}
随着$\Gamma$增大，它们从$\theta = 0, \pi$对称地向下移动；当$\Gamma = 4\pi V_\infty R$时它们在底部汇合，超过这个值后驻点离开表面，位于圆柱下方的流场中，并有一圈流体永久地绕物体环流。

::: widget contour
f: if(x^2 + y^2 < 1, 0, y*(1 - 1/(x^2 + y^2)) + G/(2*pi)*ln(sqrt(x^2 + y^2)))
x: -3, 3
y: -2.2, 2.2
levels: 24
gradient: false
sliders: G=4:0:16:0.2
point: 2, 1
caption: [[#eq-lifting-cyl]]在$V_\infty = 1$、$R = 1$时的流线（$\psi$的等值线），滑块上$G = \Gamma$；单位圆是物体（其内部被遮去，$\psi = 0$等值线只是粗略地描出表面）。$G = 0$时图形对称（无升力）。随着$G$增大，驻点按[[#eq-stag]]沿表面下滑：$G = 2\pi \approx 6.3$时它们位于$\theta_s = -30^\circ$和$-150^\circ$，$G = 4\pi \approx 12.6$时它们在底部汇合。注意流线在圆柱上方如何密集（流动快、压强低），在其下方如何稀疏。
:::

::: theorem 有环量圆柱的升力 {#thm-cyl-lift}
流动[[#eq-lifting-cyl]]作用在圆柱单位展长上的升力（垂直于$V_\infty$）为
$$
L' = \rho_\infty V_\infty \Gamma
$$
且阻力为零，与半径无关。
:::

::: proof
在表面上，伯努利方程给出$p = p_\infty + \tfrac12\rho_\infty\left(V_\infty^2 - V_\theta^2\right)$，其中$V_\theta^2 = 4V_\infty^2\sin^2\theta + \dfrac{2V_\infty\Gamma\sin\theta}{\pi R} + \dfrac{\Gamma^2}{4\pi^2R^2}$。压强沿内法线$-(\cos\theta, \sin\theta)$作用在微元$R\,d\theta$上，所以
$$
D' = -\int_0^{2\pi} p\cos\theta\,R\,d\theta, \qquad L' = -\int_0^{2\pi} p\sin\theta\,R\,d\theta.
$$
常数项与$\cos\theta$、$\sin\theta$相乘后在整个周期上积分为零，$\sin^2\theta\cos\theta$、$\sin\theta\cos\theta$和$\sin^3\theta$也是如此。唯一留下的是$V_\theta^2$中的交叉项与$\sin\theta$的乘积：
$$
L' = -R\int_0^{2\pi}\left(-\tfrac12\rho_\infty\right)\frac{2V_\infty\Gamma\sin\theta}{\pi R}\sin\theta\,d\theta
= \frac{\rho_\infty V_\infty\Gamma}{\pi}\int_0^{2\pi}\sin^2\theta\,d\theta = \rho_\infty V_\infty\Gamma ,
$$
而$D'$的每一项都为零。假设：定常、不可压缩、无黏流动；全场使用同一个常数的伯努利方程，这是成立的，因为流动无旋。
:::

::: widget plot
f: 1 - (2*sin(x) + B)^2; 1 - 4*sin(x)^2
x: 0, 2pi
y: -9, 1.5
piticks: true
sliders: B=1:0:2:0.05
labels: C_p\ \text{有环量}; C_p\ \text{无环量}
caption: 圆柱表面压强系数随$\theta$的变化（从无升力流动的后驻点起按逆时针量取），滑块上$B = \Gamma/(2\pi V_\infty R)$。无环量时曲线对称，积分得到的合力为零。$B > 0$时，上半部（$0 < \theta < \pi$）变为强烈的负值，而下半部趋向$C_p = 1$：两者之间以$\sin\theta$加权的面积就是升力$c_l = 2\pi B$。曲线关于$\theta = \pi/2$仍然对称，这就是阻力仍为零的原因。
:::

以直径为基准的圆柱**升力系数**为$c_l = L'/(q_\infty\,2R) = \Gamma/(V_\infty R)$。从物理上看，环量使顶部的速度增加、底部的速度减小；伯努利方程把速度差转化为压强差。旋转圆柱通过其边界层带动产生环量——这就是**马格努斯效应**（Magnus effect），它使旋转的球飞行轨迹弯曲，并驱动弗莱特纳转筒船——但真实转筒只能达到无滑移“刚体”论证所给出的理想环量$2\pi R \cdot \omega R$的一部分，因此必须使用实测系数而不是理想系数。

::: example 旋转圆柱的驻点与升力 {#ex-spinning}
半径为$0.5\,\mathrm{m}$的圆柱位于海平面$10\,\mathrm{m/s}$的来流中，带有顺时针环量$\Gamma = 2\pi V_\infty R = 31.4\,\mathrm{m^2/s}$。求驻点位置、每米升力、$c_l$，以及顶部和底部的表面$C_p$。
::: solution
由[[#eq-stag]]，$\sin\theta_s = -31.4/(4\pi \times 10 \times 0.5) = -0.5$，所以$\theta_s = -30^\circ$和$-150^\circ$（$210^\circ$）：两个驻点都移到水平直径下方$30^\circ$处。升力为$L' = 1.225 \times 10 \times 31.4 = 385\,\mathrm{N/m}$，$c_l = \Gamma/(V_\infty R) = 2\pi = 6.28$。在表面上$\Gamma/(2\pi R) = 10\,\mathrm{m/s}$，所以顶部$V_\theta = -20 - 10 = -30\,\mathrm{m/s}$，$C_p = 1 - 9 = -8$；底部$V_\theta = +20 - 10 = 10\,\mathrm{m/s}$，$C_p = 0$。**合理性检验：**来流从左方来时，顺时针涡的升力向上，理应如此（顶部流动更快）。而$c_l = 6.3$远远超过任何翼型的$1.5$–$2$——但这是理想流动；真实的旋转圆柱会发生分离，需要端板和高转速比才能达到其一半。
:::
:::

::: quiz
在**有**环量的圆柱势流绕流中，随着$\Gamma$增大，阻力如何变化？
- [ ] 像诱导阻力那样与$\Gamma^2$成比例增大
- [ ] 与$\Gamma$成比例增大
- [x] 始终严格为零
- [ ] 变为负值（推力）
::: solution
对每一个$\Gamma$，压强分布关于竖直轴都保持对称，所以$D' = 0$：加上环量后达朗贝尔佯谬依然成立。诱导阻力是尾涡造成的三维效应（[[aerodynamics/finite-wings]]）；在二维无黏流动中它不存在。
:::
:::

## 库塔-茹科夫斯基定理

圆柱的结果并不特殊。定常、无黏、不可压缩流动中的任何二维物体，从远处看，都像是自由来流加上一个强度等于绕物体环量的涡，再加上一些比$1/r$衰减更快的项（封闭物体不可能是一个净源）。这已足以计算出力。

::: theorem 库塔-茹科夫斯基定理 {#thm-kj}
处于定常、无黏、不可压缩来流$V_\infty$中的任意形状的二维物体，若沿任一包围它的曲线的环量为$\Gamma$（顺时针为正），则它单位展长上所受的力为
$$
L' = \rho_\infty V_\infty\Gamma
$$
垂直于自由来流，而平行于来流的力为零。
:::

::: proof
对物面$S_b$与以物体为中心、半径为$r$的大圆$C$之间的流体应用动量方程，$C$上的外法向单位矢量为$\mathbf{n} = (\cos\theta, \sin\theta)$。在定常流动中，净动量流出等于作用在流体上的力之和。在$S_b$上没有流动穿过表面，该处作用在流体上的压强力等于作用在物体上的力$\mathbf{F}$的负值。因此
$$
\mathbf{F} = -\oint_C \left[(p - p_\infty)\,\mathbf{n} + \rho_\infty\mathbf{V}\,(\mathbf{V}\cdot\mathbf{n})\right]r\,d\theta ,
$$
其中可以减去$p_\infty$，因为常数压强沿闭合曲线不产生净力。这对任意$r$都精确成立，所以可以在$r \to \infty$时计算它。在那里速度为$\mathbf{V} = (V_\infty + u', v')$，扰动以涡为主：
$$
u' = \frac{\Gamma\sin\theta}{2\pi r}, \qquad v' = -\frac{\Gamma\cos\theta}{2\pi r}, \qquad \text{加上 } O(r^{-2}),
$$
这就是[[#prop-elementary]]中顺时针涡的直角坐标分量。伯努利方程给出$p - p_\infty = -\rho_\infty V_\infty u' + O(r^{-2})$，而$\mathbf{V}\cdot\mathbf{n} = V_\infty\cos\theta + (u'\cos\theta + v'\sin\theta) = V_\infty\cos\theta + O(r^{-2})$（涡的速度纯粹是切向的）。$r^{-2}$阶的项乘以$\propto r$的周长，在$r \to \infty$时趋于零。于是$y$分量为
$$
F_y = -\int_0^{2\pi}\left[-\rho_\infty V_\infty\frac{\Gamma\sin\theta}{2\pi r}\sin\theta + \rho_\infty\left(-\frac{\Gamma\cos\theta}{2\pi r}\right)V_\infty\cos\theta\right]r\,d\theta
= \frac{\rho_\infty V_\infty\Gamma}{2\pi}\int_0^{2\pi}\left(\sin^2\theta + \cos^2\theta\right)d\theta = \rho_\infty V_\infty\Gamma .
$$
升力的一半来自$C$上的压强，一半来自向下的动量通量。$x$分量为$F_x = -\int_0^{2\pi}\left[-\rho_\infty V_\infty u'\cos\theta + \rho_\infty(V_\infty + u')V_\infty\cos\theta\right]r\,d\theta$；$u'$项恰好相消，且$\int_0^{2\pi}\cos\theta\,d\theta = 0$，所以$F_x = 0$。假设：物体外的流动是定常、二维、无黏、不可压缩且无旋的；物体封闭（净源强为零）；扰动的远场展开对任何物体都成立，因为包围物体的圆外的势函数具有关于$1/r$的洛朗型展开。
:::

有两个推论值得立即指出。第一，**升力需要环量**：没有环量就没有升力，不论形状如何。第二，**单靠势流不能确定环量有多大**——有升力的圆柱已经表明存在一整族解。对于具有尖后缘的翼型，由自然来作出选择：环量自行调整，直到气流从后缘光滑地流出（**库塔条件**），这正是[[aerodynamics/thin-airfoil-theory]]的主题。

::: example 一个机翼剖面带有多少环量？ {#ex-kj-airfoil}
一个弦长$c = 2\,\mathrm{m}$的剖面在海平面以$V_\infty = 60\,\mathrm{m/s}$飞行，$c_l = 0.8$。求单位展长上的升力以及绕它的环量。
::: solution
$L' = q_\infty c\,c_l = \tfrac12(1.225)(60)^2(2)(0.8) = 3528\,\mathrm{N/m}$。由库塔-茹科夫斯基定理，
$$
\Gamma = \frac{L'}{\rho_\infty V_\infty} = \frac{3528}{1.225 \times 60} = 48.0\,\mathrm{m^2/s}.
$$
一般地，$\Gamma = \tfrac12 V_\infty c\,c_l$——这里为$\tfrac12(60)(2)(0.8) = 48$。**合理性检验：**如果这一环量是由上表面平均多出的速度$\Delta V$和下表面同等的速度亏损产生的，绕剖面的线积分将给出$\Gamma \approx 2c\,\Delta V$，所以$\Delta V \approx 12\,\mathrm{m/s}$，即飞行速度的百分之二十——对于中等升力下机翼上下表面的速度差，这是一个合理的量级。
:::
:::

::: example 驻点流动 {#ex-corner}
流函数$\psi = Axy$（$A = 2\,\mathrm{s^{-1}}$）描述钝体前驻点附近的流动（壁面为$y = 0$）。证明它是无旋的，求其速度势，并对密度为$1.225\,\mathrm{kg/m^3}$的空气求点$(x, y) = (1, 0.5)\,\mathrm{m}$处的速度和压强降$p_0 - p$。
::: solution
$u = \psi_y = Ax$，$v = -\psi_x = -Ay$。于是$\omega_z = v_x - u_y = 0 - 0 = 0$：无旋，连续方程$u_x + v_y = A - A = 0$也成立。积分$\phi_x = Ax$得$\phi = \tfrac12Ax^2 + g(y)$，再由$\phi_y = g'(y) = -Ay$得$\phi = \tfrac12 A(x^2 - y^2)$。在$(1, 0.5)$处：$u = 2$，$v = -1\,\mathrm{m/s}$，$V = \sqrt5 = 2.24\,\mathrm{m/s}$。以$p_0$表示原点处的驻点压强，伯努利方程给出$p_0 - p = \tfrac12\rho V^2 = \tfrac12(1.225)(5) = 3.06\,\mathrm{Pa}$。**合理性检验：**流线$xy = \text{常数}$是趋近壁面并沿壁面转向的双曲线，并且$\nabla^2\psi = 0$，$\nabla^2\phi = A - A = 0$，正如[[#prop-laplace]]所要求的。
:::
:::

::: warning 叠加速度和势函数，绝不叠加压强
由于伯努利方程对速度是二次的，叠加流动的压强**不是**其各部分压强之和。在旋转圆柱的例子中，单独的圆柱均匀绕流在顶部给出$C_p = -3$，单独的涡在同一点（以$V_\infty$为基准）给出$C_p = 1 - (10/10)^2 = 0$——但合成流动给出$C_p = -8$。务必先把$\phi$、$\psi$或速度分量相加，再求$V^2$，然后应用伯努利方程。一个相关的陷阱是$\Gamma$的符号。本课程取顺时针为正，使得来流从左向右时正升力对应正$\Gamma$；数学教材通常取逆时针为正，这会改变涡公式中的符号，但不改变物理。
:::

::: history
让·勒朗·**达朗贝尔**（Jean le Rond d'Alembert）在其《流体阻力新理论试论》（*Essai d'une nouvelle théorie de la résistance des fluides*，1752年）中证明理想流体对物体不产生阻力，这一结果与所有实验相矛盾，后来被称为达朗贝尔佯谬。威廉·**朗肯**（William Rankine）用均匀流中的源和汇构造了封闭物体（《论流线的数学理论》，“On the mathematical theory of stream-lines”，1871年）。海因里希·古斯塔夫·**马格努斯**（Heinrich Gustav Magnus）于1852年报告了旋转圆柱所受的侧向力，**瑞利**勋爵（Lord Rayleigh）1877年通过在圆柱绕流上叠加环量，解释了旋转网球的偏转。环量与升力之间的联系由英国的弗雷德里克·**兰彻斯特**（Frederick Lanchester）提出，并由两人各自独立地定量化：威廉·**库塔**（Wilhelm Kutta）在1902年的大学授课资格论文中（仅以简短摘要发表）计算了后缘处速度有限的圆弧面的升力；尼古拉·**茹科夫斯基**（Nikolai Joukowski，Zhukovsky）则于1906年陈述了一般定理$L' = \rho V\Gamma$，并进而用共形映射构造了茹科夫斯基翼型。
:::

## 小结

::: summary
- 在边界层和尾迹之外，低速流动是不可压缩、无黏且无旋的；此时$\mathbf{V} = \nabla\phi$，$u = \psi_y$，$v = -\psi_x$，且$\nabla^2\phi = \nabla^2\psi = 0$。
- 拉普拉斯方程是线性的：叠加均匀流、源、偶极子和涡（[[#prop-elementary]]），直到某条流线具有物体的形状；然后由$C_p = 1 - V^2/V_\infty^2$求压强。
- 均匀流 + 偶极子 = 圆柱，$C_p = 1 - 4\sin^2\theta$，升力为零，阻力也为零（达朗贝尔佯谬；真实的阻力来自分离）。
- 加上一个涡后，对任何$\Gamma$圆柱仍是一条流线：解不唯一。驻点位于$\sin\theta_s = -\Gamma/(4\pi V_\infty R)$，升力为$\rho_\infty V_\infty\Gamma$。
- **库塔-茹科夫斯基定理：**在定常势流中，任何二维物体都有$L' = \rho_\infty V_\infty\Gamma$且阻力为零。升力需要环量；还需要另一个物理条件（库塔条件）来确定环量的大小。
:::

## 习题

::: exercise 圆柱上的压强 {level=1 check="-1"}
求无升力圆柱表面上距前驻点$45^\circ$处的势流压强系数。（输入$C_p$。）
::: solution
由[[#eq-cp-cyl]]，$C_p = 1 - 4\sin^2 45^\circ = 1 - 4 \times \tfrac12 = -1$。该处的当地速度为$2V_\infty\sin45^\circ = \sqrt2\,V_\infty$。
:::
:::

::: exercise 半无限体的头部 {level=1 check="0.318"}
一个朗肯半无限体位于$5\,\mathrm{m/s}$的来流中，其远下游的总厚度为$2\,\mathrm{m}$。求源强以及驻点在源上游的距离。（以米为单位输入该距离。）
::: solution
在远下游，源的全部流量以$V_\infty$通过宽度$2h$：$\Lambda = V_\infty \times 2h = 5 \times 2 = 10\,\mathrm{m^2/s}$。驻点位于源上游$\Lambda/(2\pi V_\infty) = 10/(10\pi) = 0.318\,\mathrm{m}$处。
:::
:::

::: exercise 给定升力所需的环量 {level=1 check="32.7"}
一个机翼剖面在海平面$50\,\mathrm{m/s}$的来流中，每米展长产生$2000\,\mathrm{N}$的升力。它带有多大的环量？（以$\mathrm{m^2/s}$为单位输入$\Gamma$。）
::: solution
$\Gamma = L'/(\rho_\infty V_\infty) = 2000/(1.225 \times 50) = 32.7\,\mathrm{m^2/s}$。
:::
:::

::: exercise 偶极子强度 {level=2 check="3.77"}
置于$15\,\mathrm{m/s}$均匀流中的偶极子，强度为多大时会产生绕半径$0.2\,\mathrm{m}$圆柱的流动？（以$\mathrm{m^3/s}$为单位输入$\kappa$。）
::: solution
由[[#eq-psi-cyl]]，$R^2 = \kappa/(2\pi V_\infty)$，所以$\kappa = 2\pi V_\infty R^2 = 2\pi(15)(0.04) = 3.77\,\mathrm{m^3/s}$。
:::
:::

::: exercise 驻点在哪里？ {level=2 check="14.5"}
来流中的一个圆柱带有顺时针环量$\Gamma = \pi V_\infty R$。求其驻点的角位置。（以度为单位输入位于水平直径下方的角度。）
::: solution
由[[#eq-stag]]，$\sin\theta_s = -\pi V_\infty R/(4\pi V_\infty R) = -0.25$，所以$\theta_s = -14.5^\circ$和$-165.5^\circ$：两点都位于水平直径下方$14.5^\circ$处，一个靠近前部，一个靠近后部。
:::
:::

::: exercise 势函数及其流函数 {level=2 check="2*sqrt(2)"}
某平面流动的速度势为$\phi = x^2 - y^2$（国际单位制）。求其流函数以及点$(1, 1)$处的速度大小。（以m/s为单位输入速度。）
::: solution
$u = \phi_x = 2x$，$v = \phi_y = -2y$。由$\psi_y = u = 2x$：$\psi = 2xy + h(x)$，而$-\psi_x = -2y - h'(x) = v = -2y$给出$h' = 0$，所以$\psi = 2xy$（即[[#ex-corner]]中$A = 2$的驻点流动）。在$(1,1)$处，$V = \sqrt{4 + 4} = 2\sqrt2 = 2.83\,\mathrm{m/s}$。
:::
:::

::: exercise 螺旋涡 {level=2 check="63.4"}
一个强度$\Lambda = 4\,\mathrm{m^2/s}$的源和一个强度$\Gamma = 8\,\mathrm{m^2/s}$的顺时针涡同时位于原点。求$r = 0.5\,\mathrm{m}$处的速度大小以及流线与径向之间的夹角。（以度为单位输入该角度。）
::: solution
$V_r = \Lambda/(2\pi r) = 4/\pi = 1.273\,\mathrm{m/s}$，$V_\theta = -\Gamma/(2\pi r) = -8/\pi = -2.546\,\mathrm{m/s}$，所以$V = 2.85\,\mathrm{m/s}$，与径向的夹角为$\arctan(2.546/1.273) = \arctan 2 = 63.4^\circ$。比值$V_\theta/V_r = -\Gamma/\Lambda$在每一半径上都相同，所以流线是对数螺线——这是涡流室或浴缸排水口中流动的一个模型。
:::
:::

::: exercise 严格计算零阻力与升力积分 {level=3}
对有升力的圆柱[[#eq-lifting-cyl]]，用$\theta$和$B = \Gamma/(2\pi V_\infty R)$写出表面上的$C_p(\theta)$，并积分得到$c_l = 2\pi B$（以直径为基准）和$c_d = 0$。用$B = 1$的[[#ex-spinning]]检验你的$C_p$。
::: solution
在表面上$V_\theta/V_\infty = -(2\sin\theta + B)$，所以$C_p = 1 - (2\sin\theta + B)^2 = 1 - B^2 - 4B\sin\theta - 4\sin^2\theta$。取$B = 1$：$\theta = 90^\circ$处$C_p = 1 - 9 = -8$；$\theta = 270^\circ$处$C_p = 1 - 1 = 0$，与例题一致。把微元$R\,d\theta$上的压强分解，得到以直径$2R$为基准的剖面系数：
$$
c_l = -\frac{1}{2}\int_0^{2\pi} C_p\sin\theta\,d\theta, \qquad c_d = -\frac{1}{2}\int_0^{2\pi} C_p\cos\theta\,d\theta.
$$
对$c_l$只有$-4B\sin\theta$一项留下：$c_l = -\tfrac12(-4B)(\pi) = 2\pi B$。对$c_d$，每一项（$1 - B^2$、$\sin\theta$、$\sin^2\theta$）与$\cos\theta$相乘后积分都为零，所以$c_d = 0$。由于$2\pi B = \Gamma/(V_\infty R)$，$L' = q_\infty(2R)c_l = \rho_\infty V_\infty\Gamma$，与[[#thm-cyl-lift]]一致。
:::
:::

::: exercise 转筒帆：理想与现实 {level=3 check="33.1"}
转筒帆是一根直径$3\,\mathrm{m}$、高$18\,\mathrm{m}$的竖直圆柱，在船上旋转，视风速为$10\,\mathrm{m/s}$（海平面空气）。(a) 在驻点仍位于表面的条件下，势流所允许的最大升力系数（以直径为基准）是多少？(b) 对带端板的此类转筒的试验表明，在高转速比下升力系数约为$10$。以投影面积$D \times h$为基准、取$c_l = 10$，估算侧向力。(c) 讨论为什么真实值低于理想值，以及什么限制了有用的转速。（对(b)以kN为单位输入力。）
::: solution
(a) 当$\Gamma = 4\pi V_\infty R$时两个驻点在底部重合，这给出$c_l = \Gamma/(V_\infty R) = 4\pi = 12.6$。

(b) $F = q_\infty\,D\,h\,c_l = \tfrac12(1.225)(10)^2(3)(18)(10) = 33\,075\,\mathrm{N} = 33.1\,\mathrm{kN}$。

(c) 在真实流体中，环量是由被表面带动旋转的边界层诱导出来的，而在表面逆着来流运动的一侧流体会发生分离；净环量小于任何理想估计，而分离的尾迹又附加了势流认为为零的可观阻力。在有限高度上，气流还会绕过两端溢出（这是[[aerodynamics/finite-wings]]中讨论的三维损失），这就是端板有帮助的原因。提高转速只在一定范围内增加升力，此后增益趋于平缓，而驱动转筒的功率和阻力却持续增加；有用的工作点是在侧向力、转筒功率、阻力、结构载荷与风向之间的设计权衡，必须根据试验数据而不是势流来确定。
:::
:::
