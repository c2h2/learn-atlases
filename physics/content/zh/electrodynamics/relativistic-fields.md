让磁体掠过静止的导线环，就会有电流流过：按法拉第定律，变化的磁场感生电场。让磁体停着不动而改让线环运动，流过的却是同一个电流，这时它由导线中运动电荷受到的磁力 $q\mathbf v\times\mathbf B$ 来解释。同一个现象，两种解释，区别只在于谁在动。爱因斯坦 1905 年的论文《论动体的电动力学》正是以这一不对称开场的，而解决之道在于：$\mathbf E$ 与 $\mathbf B$ 不是两个分离的东西。它们是同一个对象——**电磁场张量**——的分量，而观察者如何运动，就决定这个对象如何分拆为电的部分与磁的部分。

本章把这句话讲得精确。电荷与电流密度合并成四维矢量，标量势与矢量势亦然。麦克斯韦方程组随之取一个在每个惯性系中都显然同形的形式，场的变换律由四维矢量的变换律跟出，而 $\mathbf E$ 与 $\mathbf B$ 的两个组合对所有观察者都相同。有了变换律，匀速运动电荷的场——在 [[electrodynamics/radiation]] 中需要李纳–维谢尔那套机器——两行就从库仑定律得出。

洛伦兹变换与四维矢量沿用 [[relativity/four-vectors]] 的那一套，约定也相同：坐标 $x^\mu = (ct, x, y, z)$，度规 $\eta_{\mu\nu} = \mathrm{diag}(1, -1, -1, -1)$，于是 $x_\mu = (ct, -x, -y, -z)$，而沿 $x$、速度为 $v = \beta c$ 的加速（boost）为

$$
x'^\mu = \Lambda^\mu{}_\nu x^\nu, \qquad \Lambda = \begin{pmatrix}\gamma & -\gamma\beta & 0 & 0\\ -\gamma\beta & \gamma & 0 & 0\\ 0 & 0 & 1 & 0\\ 0 & 0 & 0 & 1\end{pmatrix}.
$$ {#eq-boost}

一上一下的重复指标求和。导数 $\partial_\mu = \partial/\partial x^\mu = (c^{-1}\partial_t, \nabla)$ 是协变的四维矢量，而 $\partial^\mu = (c^{-1}\partial_t, -\nabla)$。四维矢量的标量积，如 $\partial_\mu J^\mu$ 或 $\partial_\mu\partial^\mu = c^{-2}\partial_t^2 - \nabla^2$，是洛伦兹不变量。

## 四维电流与四维势 {#four-current}

电荷是不变量：电子的电荷在每个参考系中都相同，运动中原子的严格电中性与加速器中电荷的稳定性都证实了这一点。考虑在某系中静止的电荷密度 $\rho_0$。在它以速度 $\mathbf u$ 运动的参考系中，体积元被洛伦兹收缩 $1/\gamma_u$，所以密度为 $\rho = \gamma_u\rho_0$，电流密度为 $\mathbf J = \rho\mathbf u = \gamma_u\rho_0\mathbf u$。它们正是 $\rho_0$ 乘以四维速度 $U^\mu = \gamma_u(c, \mathbf u)$ 的分量，而 $U^\mu$ 是四维矢量，$\rho_0$ 是不变量。

::: definition 四维电流与四维势 {#def-four-current}
**四维电流**与**四维势**为

$$
J^\mu = (c\rho, \mathbf J), \qquad A^\mu = \left(\frac{V}{c}, \mathbf A\right).
$$ {#eq-four-current}

二者在 [[#eq-boost]] 下都作为四维矢量变换。
:::

在这一记号下，连续性方程是 $\partial_\mu J^\mu = \partial_t\rho + \nabla\cdot\mathbf J = 0$，一条洛伦兹标量的陈述：若在一个系中成立，就在一切系中成立。[[electrodynamics/maxwell-equations#eq-lorenz]] 的洛伦兹条件是 $\partial_\mu A^\mu = c^{-2}\partial_tV + \nabla\cdot\mathbf A = 0$，而 [[electrodynamics/maxwell-equations#eq-wave-pot]] 的两条波动方程 $\Box V = -\rho/\varepsilon_0$ 与 $\Box\mathbf A = -\mu_0\mathbf J$ 利用 $\mu_0\varepsilon_0 = 1/c^2$ 合并为

$$
\partial_\nu\partial^\nu A^\mu = \mu_0J^\mu .
$$ {#eq-wave-four}

左边是不变算符 $\partial_\nu\partial^\nu$ 作用在一个四维矢量上，右边是四维矢量：方程在每个参考系中有同一形式。因此 $A^\mu$ 是四维矢量并非额外假设，而是 [[#eq-wave-four]] 的推论——只要洛伦兹规范在每个参考系中都被施加（确实如此，因为 $\partial_\mu A^\mu$ 是标量）。

::: example 运动的带电直线携带电流 {#ex-line}
一条电荷线密度为 $\lambda_0$（在系 $S'$ 中静止）的长直带电线，在系 $S$ 中沿其长度方向以速率 $v$ 运动。求 $S$ 中的单位长度电荷与电流，以及其中的场。
::: solution
在 $S'$ 中，$J'^\mu$ 对单位横截面积分得 $(c\lambda_0, 0, 0, 0)$。变换到 $S$——其中 $S'$ 沿 $x$ 以 $+v$ 运动——要用 [[#eq-boost]] 的逆变换（把 $\beta$ 换成 $-\beta$）：$c\lambda = \gamma c\lambda_0$ 且 $I = \gamma v\lambda_0$。所以 $\lambda = \gamma\lambda_0$，因为直线被收缩而偏大，且 $I = \lambda v$。在 $S$ 中电场为 $\mathbf E = \frac{\gamma\lambda_0}{2\pi\varepsilon_0s}\hat{\mathbf s}$，磁场为 $\mathbf B = \frac{\mu_0\gamma\lambda_0v}{2\pi s}\hat{\boldsymbol\phi}$。注意 $\mathbf B = \frac{1}{c^2}\mathbf v\times\mathbf E$，其中 $\mathbf v = v\hat{\mathbf x}$：正如我们即将一般地看到的，一个在某系中纯电的场，在另一个系中会伴有一个 $\mathbf v\times\mathbf E/c^2$ 的磁场。
:::
:::

## 场张量 {#field-tensor}

场是势的导数：$\mathbf E = -\nabla V - \partial_t\mathbf A$，$\mathbf B = \nabla\times\mathbf A$。用四维矢量语言，二者都是 $\partial^\mu A^\nu$ 的反称组合。

::: definition 电磁场张量 {#def-field-tensor}
**场张量**为 $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$。它的分量是

$$
F^{\mu\nu} = \begin{pmatrix}
0 & -E_x/c & -E_y/c & -E_z/c\\
E_x/c & 0 & -B_z & B_y\\
E_y/c & B_z & 0 & -B_x\\
E_z/c & -B_y & B_x & 0
\end{pmatrix},
$$ {#eq-field-tensor}

其中行按 $\mu = 0, 1, 2, 3$、列按 $\nu$ 标记。它是反称的，$F^{\nu\mu} = -F^{\mu\nu}$。
:::

为看清各元素，算两个。由 $\partial^0 = c^{-1}\partial_t$、$\partial^1 = -\partial_x$，

$$
F^{01} = \partial^0A^1 - \partial^1A^0 = \frac1c\frac{\partial A_x}{\partial t} + \frac{\partial}{\partial x}\frac{V}{c} = -\frac{1}{c}\left(-\frac{\partial V}{\partial x} - \frac{\partial A_x}{\partial t}\right) = -\frac{E_x}{c},
$$

$$
F^{12} = \partial^1A^2 - \partial^2A^1 = -\frac{\partial A_y}{\partial x} + \frac{\partial A_x}{\partial y} = -(\nabla\times\mathbf A)_z = -B_z .
$$

其余由轮换标号得到。反称 $4\times4$ 阵的六个独立分量恰好是 $\mathbf E$ 与 $\mathbf B$ 的六个分量。规范变换 $A^\mu\to A^\mu - \partial^\mu\lambda$（即 $V\to V - \partial_t\lambda$、$\mathbf A\to\mathbf A + \nabla\lambda$）保持 $F^{\mu\nu}$ 不变，因为偏导数可交换。

::: theorem 协变的麦克斯韦方程组 {#thm-covariant}
麦克斯韦方程组等价于

$$
\partial_\mu F^{\mu\nu} = \mu_0J^\nu
$$ {#eq-covariant-inhom}

加上**比安基（Bianchi）恒等式**

$$
\partial^\lambda F^{\mu\nu} + \partial^\mu F^{\nu\lambda} + \partial^\nu F^{\lambda\mu} = 0 .
$$ {#eq-bianchi}

第一条包含高斯定律（$\nu = 0$）与安培–麦克斯韦定律（$\nu = 1, 2, 3$）；第二条包含 $\nabla\cdot\mathbf B = 0$ 与法拉第定律。四维速度为 $U^\mu$、电荷为 $q$ 的粒子所受的洛伦兹力为

$$
\deriv{p^\mu}{\tau} = qF^{\mu\nu}U_\nu .
$$ {#eq-covariant-force}
:::

::: proof
对 $\nu = 0$：$\partial_\mu F^{\mu0} = \partial_iF^{i0} = \sum_i\partial_i(E_i/c) = c^{-1}\nabla\cdot\mathbf E$，而 $\mu_0J^0 = \mu_0c\rho$，所以 $\nabla\cdot\mathbf E = \mu_0c^2\rho = \rho/\varepsilon_0$。对 $\nu = 1$：

$$
\partial_\mu F^{\mu1} = \frac1c\frac{\partial}{\partial t}\left(-\frac{E_x}{c}\right) + \frac{\partial B_z}{\partial y} - \frac{\partial B_y}{\partial z} = -\frac{1}{c^2}\frac{\partial E_x}{\partial t} + (\nabla\times\mathbf B)_x ,
$$

令其等于 $\mu_0J_x$ 就得到安培–麦克斯韦定律的 $x$ 分量；$\nu = 2, 3$ 换标号即同。对比安基恒等式，代入 $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$：六项两两相消，因为偏导数可交换，所以它对任何由势导出的场都成立。反过来，它的分量就是齐次方程。取 $(\lambda, \mu, \nu) = (1, 2, 3)$，并用 $\partial^i = -\partial_i$，

$$
\partial^1F^{23} + \partial^2F^{31} + \partial^3F^{12} = (-\partial_x)(-B_x) + (-\partial_y)(-B_y) + (-\partial_z)(-B_z) = \nabla\cdot\mathbf B = 0 .
$$

取 $(0, 1, 2)$，用 $F^{20} = E_y/c$ 与 $F^{01} = -E_x/c$，

$$
\partial^0F^{12} + \partial^1F^{20} + \partial^2F^{01} = -\frac1c\left(\frac{\partial B_z}{\partial t} + \frac{\partial E_y}{\partial x} - \frac{\partial E_x}{\partial y}\right) = -\frac1c\left(\frac{\partial B_z}{\partial t} + (\nabla\times\mathbf E)_z\right) = 0,
$$

即法拉第定律的 $z$ 分量；$(0, 2, 3)$ 与 $(0, 3, 1)$ 给出其余两个。指标的其他任何取法要么与上述之一重复，要么因反称性而消失。

至于力，$U_\nu = \gamma(c, -\mathbf u)$。空间分量 $\mu = 1$ 为

$$
F^{1\nu}U_\nu = F^{10}\gamma c + F^{12}(-\gamma u_y) + F^{13}(-\gamma u_z) = \gamma\bigl(E_x + u_yB_z - u_zB_y\bigr) = \gamma(\mathbf E + \mathbf u\times\mathbf B)_x .
$$

由 $\dd\tau = \dd t/\gamma$，$\dd\mathbf p/\dd t = q(\mathbf E + \mathbf u\times\mathbf B)$，即使用相对论动量的洛伦兹力。时间分量为 $F^{0\nu}U_\nu = \sum_i(-E_i/c)(-\gamma u_i) = \gamma\mathbf E\cdot\mathbf u/c$，所以 $\dd(\gamma mc^2)/\dd t = q\mathbf E\cdot\mathbf u$：正是做功的速率。
:::

[[#eq-covariant-inhom]] 与 [[#eq-bianchi]] 都是张量方程：只要它们在一个系中成立，就在一切系中成立——前提是 $F^{\mu\nu}$ 按张量变换。这正是电动力学的相对论不变性的内容。1865 年写下的麦克斯韦方程组对狭义相对论无需任何修改；需要改变的是力学。

::: remark 规范不变性要求电荷守恒
电流与场的相互作用以 $-\int J_\mu A^\mu\,\dd^4x$ 进入理论的作用量。在规范变换 $A^\mu\to A^\mu - \partial^\mu\lambda$ 之下，它改变 $\int J_\mu\partial^\mu\lambda\,\dd^4x = -\int\lambda\,\partial^\mu J_\mu\,\dd^4x$，其中用了分部积分。物理对每个 $\lambda$ 都不变，只有当 $\partial_\mu J^\mu = 0$。规范不变性与局域电荷守恒是同一事实的两面；把这条联系反过来，正是 [[particles]] 中的规范原理把一个守恒电荷变成一种传递力的场的做法。
:::

::: remark 能量–动量张量
[[electrodynamics/maxwell-equations]] 的各条守恒律也联合起来。按此处使用的符号约定，对称张量 $T^{\mu\nu} = \frac{1}{\mu_0}\left(-F^{\mu\alpha}F^\nu{}_\alpha + \frac14\eta^{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}\right)$ 有 $T^{00} = u$，即能量密度；$T^{0i} = S_i/c$，即坡印廷矢量；而 $T^{ij}$ 等于负的麦克斯韦应力张量。麦克斯韦方程组蕴含 $\partial_\mu T^{\mu\nu} = -F^{\nu\lambda}J_\lambda$，其 $\nu = 0$ 分量是坡印廷定理，空间分量是带洛伦兹力密度的动量平衡。能量流与动量密度是同一组分量 $T^{0i} = T^{i0}$，这就是场的动量密度为 $\mathbf S/c^2$ 的原因。
:::

::: example 双曲运动 {#ex-hyperbolic}
一个电子从静止开始在匀强场 $E = 1.00\times10^{6}\,\mathrm{V/m}$ 中出发。用 [[#eq-covariant-force]] 求它 $10.0\,\mathrm{ns}$ 后的速率与走过的距离，并与牛顿力学比较。
::: solution
[[#eq-covariant-force]] 的空间部分是 $\dd\mathbf p/\dd t = q\mathbf E$，其中 $\mathbf p = \gamma m\mathbf v$。对恒定场与从静止出发，$p = eEt$（取运动方向为正）。于是 $\gamma = \sqrt{1 + (p/mc)^2}$，$v = pc/\sqrt{p^2 + m^2c^2}$。由 $eEt = (1.602\times10^{-19})(1.00\times10^{6})(1.00\times10^{-8}) = 1.602\times10^{-21}\,\mathrm{kg\,m/s}$，$m_ec = 2.731\times10^{-22}\,\mathrm{kg\,m/s}$，$p/m_ec = 5.87$，故

$$
\gamma = \sqrt{1 + 5.87^2} = 5.95, \qquad \frac vc = \frac{5.87}{5.95} = 0.986 .
$$

积分 $v = c\,(at/c)/\sqrt{1 + (at/c)^2}$，其中 $a = eE/m_e$，得 $x = \frac{c^2}{a}\left(\sqrt{1 + (at/c)^2} - 1\right) = 2.53\,\mathrm{m}$。[[#eq-covariant-force]] 的时间分量说动能等于做的功，$(\gamma - 1)m_ec^2 = eEx$，事实确实如此：$(5.95 - 1)(0.511\,\mathrm{MeV}) = 2.53\,\mathrm{MeV} = e\times(1.00\,\mathrm{MV/m})\times(2.53\,\mathrm{m})$。牛顿力学会给出 $v = at = 5.9c$ 与 $x = \frac12at^2 = 8.8\,\mathrm{m}$。世界线 $x(t)$ 是时空中的一条双曲线，这就是"双曲运动"名称的由来；它的固有加速度是常数。
:::
:::

## 场的变换 {#transformation}

二阶张量每个指标带一个 $\Lambda$ 因子变换，$F'^{\mu\nu} = \Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta F^{\alpha\beta}$，写成矩阵形式即 $F' = \Lambda F\Lambda\T$。

::: theorem 场的变换 {#thm-transform}
在速度为 $\mathbf v$ 的加速之下，场平行与垂直于 $\mathbf v$ 的分量按

$$
\mathbf E'_\parallel = \mathbf E_\parallel, \qquad \mathbf B'_\parallel = \mathbf B_\parallel, \qquad \mathbf E'_\perp = \gamma\bigl(\mathbf E + \mathbf v\times\mathbf B\bigr)_\perp, \qquad \mathbf B'_\perp = \gamma\left(\mathbf B - \frac{\mathbf v\times\mathbf E}{c^2}\right)_\perp .
$$ {#eq-transform}

对沿 $x$ 的加速，这些式子写为

$$
\begin{aligned}
E'_x &= E_x, & E'_y &= \gamma(E_y - vB_z), & E'_z &= \gamma(E_z + vB_y),\\
B'_x &= B_x, & B'_y &= \gamma\left(B_y + \frac{v}{c^2}E_z\right), & B'_z &= \gamma\left(B_z - \frac{v}{c^2}E_y\right).
\end{aligned}
$$ {#eq-transform-x}
:::

::: proof
用 [[#eq-boost]]，其唯一非平凡元素是 $\Lambda^0{}_0 = \Lambda^1{}_1 = \gamma$ 与 $\Lambda^0{}_1 = \Lambda^1{}_0 = -\gamma\beta$。对 $F'^{01}$，

$$
F'^{01} = \Lambda^0{}_\alpha\Lambda^1{}_\beta F^{\alpha\beta} = \Lambda^0{}_0\Lambda^1{}_1F^{01} + \Lambda^0{}_1\Lambda^1{}_0F^{10} = \gamma^2F^{01} - \gamma^2\beta^2F^{01} = F^{01},
$$

用到 $F^{00} = F^{11} = 0$ 与 $F^{10} = -F^{01}$；故 $E'_x = E_x$。对 $F'^{02}$，第二个指标不受影响（$\Lambda^2{}_\beta = \delta^2_\beta$）：

$$
F'^{02} = \Lambda^0{}_0F^{02} + \Lambda^0{}_1F^{12} = \gamma\left(-\frac{E_y}{c}\right) - \gamma\beta(-B_z),
$$

而 $F'^{02} = -E'_y/c$ 给出 $E'_y = \gamma(E_y - vB_z)$。对 $F'^{12}$，

$$
F'^{12} = \Lambda^1{}_0F^{02} + \Lambda^1{}_1F^{12} = -\gamma\beta\left(-\frac{E_y}{c}\right) + \gamma(-B_z),
$$

而 $F'^{12} = -B'_z$ 给出 $B'_z = \gamma(B_z - \beta E_y/c) = \gamma(B_z - vE_y/c^2)$。分量 $F'^{03}$ 与 $F'^{13}$ 同样给出 $E'_z$ 与 $B'_y$，而 $F'^{23} = F^{23}$ 给出 $B'_x = B_x$。对 $\mathbf v = v\hat{\mathbf x}$，$\mathbf v\times\mathbf B = v(0, -B_z, B_y)$，$\mathbf v\times\mathbf E = v(0, -E_z, E_y)$，所以各分量与 [[#eq-transform]] 一致；后者不依赖坐标轴写出，因而对任意方向的加速都成立。
:::

当 $v\ll c$，$\mathbf E'\approx\mathbf E + \mathbf v\times\mathbf B$：运动电荷所在参考系中的电场，正是实验室称之为"每单位电荷的完整洛伦兹力"的东西。这就是爱因斯坦磁体–线环佯谬的解决。在线环的参考系中有一个电场 $\mathbf v\times\mathbf B$ 驱动电流；在磁体的参考系中只有 $\mathbf B$，而力 $q\mathbf v\times\mathbf B$ 作用在运动电荷上。两者给出同样的电动势。

::: warning 场不是四维矢量的空间部分
人们容易想把 $\mathbf E$ 当作某个四维矢量的三维部分来变换，收缩或膨胀某一个分量。它不是：$\mathbf E$ 与 $\mathbf B$ 相互混合，*平行*于加速方向的分量才是不变的，而垂直分量增大 $\gamma$ 倍，与长度收缩会给出的结论正相反。$\mathbf B$ 也不是"运动观察者看到的场"；两个观察者都看到两个场，由 [[#eq-transform]] 相联系。拿不准时，回到 $F'^{\mu\nu} = \Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta F^{\alpha\beta}$，或像 [[#ex-capacitor]] 那样直接用电荷与电流核对。
:::

::: example 运动的电容器 {#ex-capacitor}
一块大平行板电容器，在静止系 $S'$ 中面电荷密度为 $\pm\sigma_0$、场为 $E_0 = \sigma_0/\varepsilon_0$，以速率 $v$ 掠过实验室。直接由电荷与电流求实验室中的场：(a) 板面平行于速度时；(b) 板面垂直于速度时。并与 [[#eq-transform]] 比较。
::: solution
(a) 设板平行于 $xz$ 平面，场沿 $y$，板沿 $x$ 运动。在实验室中，板上一块沿 $x$ 收缩 $1/\gamma$ 而电荷不变（电荷是不变量），故 $\sigma = \gamma\sigma_0$，且 $E_y = \sigma/\varepsilon_0 = \gamma E_0$。运动的带电面还是两块面电流 $K = \sigma v$，在两板上方反平行，它们像一对电流面（[[electrodynamics/magnetostatics]]）那样在板间产生大小 $\mu_0K = \mu_0\gamma\sigma_0v = \gamma vE_0/c^2$、沿 $z$ 的场。[[#eq-transform-x]] 的逆变换取 $\mathbf B' = \mathbf 0$，给出 $E_y = \gamma E'_y$ 与 $B_z = \gamma vE'_y/c^2$：完全相同。

(b) 现在设板垂直于 $x$，场沿 $x$。板的面积垂直于运动方向，不被收缩，故 $\sigma = \sigma_0$、$E_x = E_0$；板沿自身法线运动，面电流在板间不产生场，$B = 0$。[[#eq-transform-x]] 依旧吻合：$E_x = E'_x$。变换律不过是电荷不变性加上长度收缩，用在产生这个场的源上而已。
:::
:::

::: example 作为相对论效应的磁 {#ex-purcell}
一根长直导线载电流 $I$，在实验室中呈电中性。电荷 $q$ 在距离 $s$ 处以速率 $v$ 沿常规电流方向平行于导线运动。求实验室中与 $q$ 的静止系中 $q$ 所受的力，并证明二者一致。
::: solution
在实验室中，$B = \mu_0I/(2\pi s)$，$\mathbf E = \mathbf 0$。力为 $qvB = \frac{\mu_0qvI}{2\pi s}$，指向导线（同向电流相吸）。

在 $q$ 的静止系 $S'$ 中，它沿导线以 $+v$ 运动，电荷静止，只有 $\mathbf E'$ 能推它。导线的四维电流在实验室中对单位横截面积分得 $(c\lambda, I) = (0, I)$。用 [[#eq-boost]] 变换，

$$
c\lambda' = \gamma\left(c\lambda - \beta I\right) = -\gamma\beta I, \qquad \lambda' = -\frac{\gamma vI}{c^2}.
$$

导线在 $S'$ 中带负电。在实验室中，固定离子与漂移电子的密度相互抵消；在 $S'$ 中，两群电荷以不同速度运动，它们的密度按不同因子变换，抵消在 $vu/c^2$ 的阶上失效，其中 $u$ 是漂移速率。它在 $q$ 处的场是径向的，$E' = \lambda'/(2\pi\varepsilon_0s)$，给出指向导线的力 $q\lambda'/(2\pi\varepsilon_0s) = -\frac{\gamma qvI}{2\pi\varepsilon_0c^2s} = -\gamma\frac{\mu_0qvI}{2\pi s}$。横向力按 $F_\perp = F'_\perp/\gamma$ 变换（由 [[#eq-covariant-force]]：$\dd p_\perp$ 是不变量，而 $\dd t = \gamma\,\dd t'$），所以实验室中的力是 $\frac{\mu_0qvI}{2\pi s}$，与前同。或者，[[#eq-transform]] 直接给出 $\mathbf E' = \gamma\mathbf v\times\mathbf B$，大小 $\gamma vB$。

当 $I = 10.0\,\mathrm{A}$、$v = 1.00\times10^{6}\,\mathrm{m/s}$，$\lambda' = 1.11\times10^{-10}\,\mathrm{C/m}$。正是这一点微小的电荷——每米约 $7\times10^{8}$ 个电子，出自运动着的约 $10^{23}$ 个——产生了全部的磁力：磁是静电力的一点小小的相对论修正，之所以看得见，只是因为中性物质中巨大的电力抵消得如此精确。
:::
:::

::: widget plot
f: (1 - x*s)/sqrt(1 - x^2); (s - x)/sqrt(1 - x^2); ((1 - x*s)^2 - (s - x)^2)/(1 - x^2)
x: 0, 0.95
y: -2, 3
sliders: s=0.5:0:0.95:0.01
labels: E′/E; cB′/E; (E′² − c²B′²)/E²
caption: 实验室场 $E_y = E$ 与 $cB_z = sE$（相互垂直，且 $cB < E$），在沿 $x$ 以 $\beta$（横轴）运动的参考系中由 [[#eq-transform-x]] 所见。磁场在 $\beta = s$ 处降过零：在那个参考系中场是纯电的。第三条曲线 $E'^2 - c^2B'^2$ 对每个 $\beta$ 都保持在 $1 - s^2$ 不变，尽管两个场都在变：它是不变量。移动 $s$，看 $cB'$ 的零点跟着它走；若 $cB > E$，任何加速都消不掉磁场，届时倒是可以让 $E'$ 消失。
:::

### 不变量 {#invariants}

从张量出发，把它的指标全部缩并就能构造标量。对场张量，独立的不变量有两个。

::: theorem 场的不变量 {#thm-invariants}
两个量

$$
\mathbf E\cdot\mathbf B \qquad\text{且}\qquad E^2 - c^2B^2
$$ {#eq-invariants}

在每个惯性系中取相同的值。张量形式下，$F_{\mu\nu}F^{\mu\nu} = -2(E^2/c^2 - B^2)$。
:::

::: proof
转动保持点积，所以只需检验沿 $x$ 的加速，用 [[#eq-transform-x]]。平行分量不变。对 $\mathbf E'\cdot\mathbf B'$ 的垂直部分，

$$
\begin{aligned}
E'_yB'_y + E'_zB'_z &= \gamma^2\Bigl[(E_y - vB_z)\Bigl(B_y + \tfrac{v}{c^2}E_z\Bigr) + (E_z + vB_y)\Bigl(B_z - \tfrac{v}{c^2}E_y\Bigr)\Bigr]\\
&= \gamma^2\Bigl[E_yB_y + E_zB_z - \tfrac{v^2}{c^2}(E_yB_y + E_zB_z)\Bigr] = E_yB_y + E_zB_z ,
\end{aligned}
$$

因为交叉项 $\pm\frac{v}{c^2}E_yE_z$ 与 $\mp vB_yB_z$ 相消，且 $\gamma^2(1 - v^2/c^2) = 1$。对第二个不变量，

$$
\begin{aligned}
E'^2_\perp - c^2B'^2_\perp &= \gamma^2\Bigl[(E_y - vB_z)^2 + (E_z + vB_y)^2 - c^2\Bigl(B_y + \tfrac{v}{c^2}E_z\Bigr)^2 - c^2\Bigl(B_z - \tfrac{v}{c^2}E_y\Bigr)^2\Bigr]\\
&= \gamma^2\Bigl[(E_y^2 + E_z^2)\Bigl(1 - \tfrac{v^2}{c^2}\Bigr) - c^2(B_y^2 + B_z^2)\Bigl(1 - \tfrac{v^2}{c^2}\Bigr)\Bigr] = E_\perp^2 - c^2B_\perp^2,
\end{aligned}
$$

其中交叉项 $-2vE_yB_z + 2vE_zB_y$ 同样与 $-2vB_yE_z + 2vB_zE_y$ 相消。至于张量形式，两个指标都降下只改变 $0i$ 元素的符号，所以 $F_{\mu\nu}F^{\mu\nu} = 2\sum_i(-E_i^2/c^2) + 2\sum_iB_i^2$。
:::

不变量对场分类。若 $\mathbf E\cdot\mathbf B\ne0$，没有任何参考系是纯电场或纯磁场的。若 $\mathbf E\cdot\mathbf B = 0$ 且 $E > cB$，则存在使 $\mathbf B' = \mathbf 0$ 的参考系；若 $E < cB$，则存在使 $\mathbf E' = \mathbf 0$ 的。平面波的两个不变量都为零，$\mathbf E\perp\mathbf B$ 且 $E = cB$，所以在每个观察者看来它仍是平面波，只是振幅与频率按多普勒因子改变。

::: example 退行观察者看到的平面波 {#ex-doppler}
平面波 $\mathbf E = E_0\cos(kx - \omega t)\hat{\mathbf y}$、$\mathbf B = (E_0/c)\cos(kx - \omega t)\hat{\mathbf z}$ 沿 $x$ 传播。求在沿 $x$ 以 $\beta$ 运动的参考系中的振幅、频率与强度。对 $E_0 = 1.00\times10^{3}\,\mathrm{V/m}$、$\beta = 0.600$ 求振幅。
::: solution
由 [[#eq-transform-x]]，$E'_y = \gamma(E_y - vB_z) = \gamma(1 - \beta)E_y$，且 $cB'_z = \gamma(cB_z - \beta E_y) = \gamma(1-\beta)E_y$。所以波仍是平面波，$E' = cB'$，振幅乘以

$$
\gamma(1-\beta) = \frac{1 - \beta}{\sqrt{(1-\beta)(1+\beta)}} = \sqrt{\frac{1-\beta}{1+\beta}} .
$$

相位 $kx - \omega t = -k_\mu x^\mu$，其中 $k^\mu = (\omega/c, k, 0, 0)$，是洛伦兹标量（它在数波峰，而所有观察者数得一样多），所以 $k^\mu$ 是四维矢量，且 $\omega' = \gamma(\omega - vk) = \gamma(1-\beta)\omega$：频率被同一个因子压低，这就是 [[relativity/velocity-energy]] 的相对论多普勒效应。强度正比于 $E'^2$，按 $(1-\beta)/(1+\beta)$ 下降。$\beta = 0.600$ 时，因子为 $\sqrt{0.4/1.6} = 0.500$，故 $E'_0 = 500\,\mathrm{V/m}$，频率减半，强度降到四分之一。用光子语言说：每个光子的能量减半，而退行的观察者遇到光子的速率也减半。
:::
:::

::: example E×B 漂移 {#ex-drift}
匀强场 $\mathbf E = E\hat{\mathbf y}$ 与 $\mathbf B = B\hat{\mathbf z}$（$E < cB$）充满一个区域。求电场消失的参考系，并描述在实验室中从静止释放的电荷的运动。对 $E = 1.00\times10^{4}\,\mathrm{V/m}$、$B = 1.00\times10^{-2}\,\mathrm{T}$ 求速率。
::: solution
试沿 $x$、垂直于两个场加速。由 [[#eq-transform-x]]，$E'_y = \gamma(E - vB)$，在 $v = E/B$ 处消失；因 $E < cB$，它小于 $c$。用矢量形式，这个速度是

$$
\mathbf v_d = \frac{\mathbf E\times\mathbf B}{B^2},
$$

因为 $\hat{\mathbf y}\times\hat{\mathbf z} = \hat{\mathbf x}$。在那个参考系中场是纯磁的，$B' = \gamma(B - vE/c^2) = B/\gamma$，电荷只是以回旋频率做圆周运动。从实验室看，从静止释放的电荷在漂移系中的速度是 $-\mathbf v_d$；它在那儿转圈，于是在实验室中沿一条摆线运动，其引导中心以 $\mathbf v_d$ 漂移，与电荷的正负无关。这里

$$
v_d = \frac{E}{B} = \frac{1.00\times10^{4}}{1.00\times10^{-2}} = 1.00\times10^{6}\,\mathrm{m/s},
$$

约 $0.003c$，所以 $\gamma\approx1$，非相对论图像是准确的。漂移与电荷和质量都无关，所以电子与离子一起漂移——这就是 $\mathbf E\times\mathbf B$ 漂移能在地球磁层与托卡马克中搬运整个等离子体的原因。
:::
:::

::: quiz
实验室中只有磁场 $\mathbf B$。关于另一个惯性系，哪些说法是对的？
- [x] 它可能看到一个电场，垂直于 $\mathbf v$ 与 $\mathbf B$ 两者。
- [ ] 如果运动得足够快，它可能看到一个纯电场。
- [x] 在每个参考系中都有 $\mathbf E'\cdot\mathbf B' = 0$。
- [ ] $\lvert\mathbf B'\rvert$ 在每个参考系中都相同。
::: solution
由 [[#eq-transform]]，$\mathbf E' = \gamma(\mathbf v\times\mathbf B)_\perp$，垂直于 $\mathbf v$ 与 $\mathbf B$。在实验室中不变量是 $\mathbf E\cdot\mathbf B = 0$ 与 $E^2 - c^2B^2 = -c^2B^2 < 0$，所以在每个参考系中 $\mathbf E'\cdot\mathbf B' = 0$ 且 $c^2B'^2 = E'^2 + c^2B^2\ge c^2B^2$：磁场可以变得更大，但永远消不掉，也永远不小于 $B$。
:::
:::

::: quiz
在某参考系中 $\mathbf E = E\hat{\mathbf x}$、$\mathbf B = B\hat{\mathbf x}$，二者平行且都不为零。哪些说法是对的？
- [x] 没有任何惯性系看到纯电场。
- [ ] 沿 $x$ 的加速会同时改变两个场。
- [x] 沿 $y$ 的加速会给出不再平行的两个场。
- [ ] 足够快的加速会使 $E^2 - c^2B^2$ 变号。
::: solution
$\mathbf E\cdot\mathbf B = EB\ne0$ 是不变量，所以两个场在任何参考系中都不能为零。沿 $x$ 的加速下，两场都是平行分量，由 [[#eq-transform]] 知保持不变。沿 $v\hat{\mathbf y}$ 的加速下，二者都是垂直分量，$\mathbf E' = \gamma(E\hat{\mathbf x} - vB\hat{\mathbf z})$，$\mathbf B' = \gamma(B\hat{\mathbf x} + (vE/c^2)\hat{\mathbf z})$：电场向一侧倾，磁场向另一侧倾，于是二者不再平行。$E^2 - c^2B^2$ 是不变量，不能变号。
:::
:::

## 匀速运动电荷的场 {#moving-charge}

在自身静止系中，点电荷只有库仑场。任何其他参考系中的场都由 [[#thm-transform]] 得出。

::: theorem 匀速运动电荷的场 {#thm-moving}
电荷 $q$ 以恒定速度 $\mathbf v = v\hat{\mathbf x}$ 运动。设 $\mathbf R$ 为由其*当前*位置指向场点的矢量，$\psi$ 为 $\mathbf R$ 与 $\mathbf v$ 的夹角。则

$$
\mathbf E = \frac{q}{4\pi\varepsilon_0}\,\frac{1 - \beta^2}{(1 - \beta^2\sin^2\psi)^{3/2}}\,\frac{\hat{\mathbf R}}{R^2}, \qquad \mathbf B = \frac{1}{c^2}\mathbf v\times\mathbf E .
$$ {#eq-moving}
:::

::: proof
设 $S'$ 为电荷的静止系，相对实验室 $S$ 沿 $x$ 以 $+v$ 运动，电荷在 $S'$ 的原点，两系原点于 $t = 0$ 重合。在 $S'$ 中，$\mathbf B' = \mathbf 0$，$\mathbf E' = \frac{q}{4\pi\varepsilon_0}\frac{\mathbf r'}{r'^3}$。[[#eq-transform-x]] 的逆变换（把 $v$ 换成 $-v$，并使带撇与不带撇互换）取 $\mathbf B' = \mathbf 0$ 给出

$$
E_x = E'_x, \qquad E_y = \gamma E'_y, \qquad E_z = \gamma E'_z, \qquad B_y = -\frac{\gamma v}{c^2}E'_z, \qquad B_z = \frac{\gamma v}{c^2}E'_y .
$$

场点在实验室时刻 $t$ 的实验室坐标为 $(x, y, z)$，其 $S'$ 坐标为 $x' = \gamma(x - vt)$、$y' = y$、$z' = z$。记 $\mathbf R = (x - vt, y, z)$，即由电荷当前位置引出的矢量。于是

$$
\mathbf E = \frac{q}{4\pi\varepsilon_0r'^3}\bigl(\gamma(x - vt),\ \gamma y,\ \gamma z\bigr) = \frac{q\gamma}{4\pi\varepsilon_0}\frac{\mathbf R}{r'^3},
$$

它从当前位置径向指出。分母是

$$
r'^2 = \gamma^2(x - vt)^2 + y^2 + z^2 = \gamma^2R^2\cos^2\psi + R^2\sin^2\psi = \gamma^2R^2\bigl(1 - \beta^2\sin^2\psi\bigr),
$$

其中用到 $1 = \gamma^2(1 - \beta^2)$ 写成 $\sin^2\psi = \gamma^2(1-\beta^2)\sin^2\psi$ 的形式。代回，$\mathbf E = \frac{q}{4\pi\varepsilon_0}\frac{\gamma\mathbf R}{\gamma^3R^3(1 - \beta^2\sin^2\psi)^{3/2}}$，由 $1/\gamma^2 = 1 - \beta^2$ 即得 [[#eq-moving]]。至于 $\mathbf B$，两个非零分量在 $(y,z)$ 位上为 $\frac{v}{c^2}$ 乘 $(-E_z, E_y)$，即 $\frac{1}{c^2}\mathbf v\times\mathbf E$。
:::

场背离电荷*现在*所在的位置，而不是它过去所在的位置，尽管没有任何信号比光更快：对匀速运动，推迟位置与速度共同决定当前位置，而 [[electrodynamics/radiation]] 的李纳–维谢尔势已经表明过同一点。场在电荷前方与后方比库仑场弱 $1 - \beta^2 = 1/\gamma^2$ 倍；在直角方向上强 $\gamma$ 倍。对快速电荷，场被压扁成垂直于运动方向的薄饼，角宽度量级 $1/\gamma$。高斯定律仍然成立：总通量是 $q/\varepsilon_0$，只是被重新分布了。

由势出发，同一结论来得更快。在 $S'$ 中 $A'^\mu = (V'/c, \mathbf 0)$，其中 $V' = q/(4\pi\varepsilon_0r')$。把这一四维矢量变换回实验室，$V = \gamma V'$，$\mathbf A = \gamma\mathbf vV'/c^2 = \mathbf vV/c^2$，其中 $r' = \gamma R\sqrt{1 - \beta^2\sin^2\psi}$，如上述证明中所得：

$$
V = \frac{q}{4\pi\varepsilon_0}\frac{1}{R\sqrt{1 - \beta^2\sin^2\psi}}, \qquad \mathbf A = \frac{\mathbf v}{c^2}V,
$$

这正是用当前位置改写过的、[[electrodynamics/radiation]] 中匀速运动电荷的李纳–维谢尔势。吃力的推迟时间代数与两行的洛伦兹加速结果一致，理当如此——推迟势本身就是洛伦兹协变的。

::: remark 拉莫尔公式是不变量
电荷在时间 $\dd t$ 内辐射的能量与这段时间本身按同样的方式变换（二者都是四维矢量的时间分量：$\dd E$ 属于辐射的四维动量，$\dd t$ 属于 $\dd x^\mu$，就瞬时静止系中对称发出的辐射而言），所以辐射的功率是洛伦兹标量。在瞬时静止系中，拉莫尔公式适用；把那里的 $a^2$ 写成 $-a_\mu a^\mu$，其中 $a^\mu = \dd^2x^\mu/\dd\tau^2$ 是四维加速度，就得到不变式 $P = -\frac{q^2}{6\pi\varepsilon_0c^3}a_\mu a^\mu$。把 $a^\mu$ 按实验室的速度与加速度展开，就重新得到李纳公式 [[electrodynamics/radiation#eq-lienard]]。
:::

::: widget plot
f: (1 - b^2)/(1 - b^2*sin(x)^2)^1.5; 1
x: 0, 3.1416
y: 0, 8
sliders: b=0.6:0:0.98:0.01
labels: E R²（运动电荷）; 库仑
caption: 匀速运动电荷的场强，$E R^2$ 以 $q/4\pi\varepsilon_0$ 为单位，横轴为从电荷当前位置引出的连线与其速度之间的夹角 $\psi$（弧度）。$\beta = 0$ 时曲线是平的库仑值 $1$。$\beta = 0.6$ 时，前方与后方的场是 $0.64$（$\psi = 0, \pi$），侧向是 $1.25 = \gamma$。把 $\beta$ 推到 $0.98$：侧向值为 $\gamma = 5.0$，峰宽只有零点几弧度，而沿运动方向线的场已落到 $0.04$。注意曲线下的面积以 $\sin\psi$ 加权——总通量——对每个 $\beta$ 都相同。
:::

::: example 大型强子对撞机质子的薄饼场 {#ex-lhc}
大型强子对撞机中的一枚质子能量为 $6.80\,\mathrm{TeV}$。求 $\gamma$、轨道旁垂直距离 $1.00\,\mathrm{mm}$ 处的横向峰值电场，以及该点感受到的场脉冲的持续时间。
::: solution
由 $m_pc^2 = 0.938\,\mathrm{GeV}$，$\gamma = 6800/0.938 = 7.25\times10^{3}$。在最近点 $\psi = 90^\circ$，[[#eq-moving]] 给出 $E = \gamma\frac{q}{4\pi\varepsilon_0b^2}$：

$$
E = (7.25\times10^{3})\frac{(8.988\times10^{9})(1.602\times10^{-19})}{(1.00\times10^{-3})^2} = (7.25\times10^{3})(1.44\times10^{-3}\,\mathrm{V/m}) = 10.4\,\mathrm{V/m}.
$$

场只在 $\lvert x - vt\rvert\lesssim b/\gamma$ 时才大，所以脉冲持续约 $b/(\gamma c) = 4.6\times10^{-16}\,\mathrm{s}$。横向场对时间的积分——它决定这脉冲给距离 $b$ 处电荷的冲量——是 $\int E_y\,\dd t = q/(2\pi\varepsilon_0bv)$，与 $\gamma$ 无关：薄饼恰是又强又短，增强与缩短成精确的反比。按傅里叶分析，这样短促而强烈的脉冲等价于一个光子流，这就是 LHC 上用于光子–光子碰撞的魏茨泽克–威廉斯（Weizsäcker–Williams）图像。
:::
:::

::: history 从洛伦兹到闵可夫斯基
奥利弗·赫维赛德 1888 年算出了匀速运动电荷的场，G. F. C. 西尔（G. F. C. Searle）1897 年进一步考察，发现了运动方向上的压扁。亨德里克·安通·洛伦兹（Hendrik Antoon Lorentz）在 1892 至 1904 年的工作中建立了电子在静止以太中运动的理论，并找到了使麦克斯韦方程组保持形式不变的变换——起初是 $v/c$ 的一阶近似，1904 年得到精确形式；约瑟夫·拉莫尔早在 1897–1900 年就已得到精确变换。昂利·彭加勒（Henri Poincaré）1905 年证明这些变换构成一个群，并以洛伦兹为其命名。阿尔伯特·爱因斯坦 1905 年的论文从两条公设导出它们，不要以太，并给出了 $\mathbf E$ 与 $\mathbf B$ 如 [[#eq-transform]] 形式的变换——开篇正是运动磁体的佯谬。赫尔曼·闵可夫斯基（Hermann Minkowski）在 1908 年引入四维形式体系，把场写成本章这个反称张量 $F^{\mu\nu}$。
:::

## 后续内容 {#leads}

协变方程 [[#eq-covariant-inhom]] 可由拉格朗日密度 $-\frac{1}{4\mu_0}F_{\mu\nu}F^{\mu\nu} - J_\mu A^\mu$ 得出，那是 [[analytical-mechanics]] 意义上的场论；它的能量–动量张量把 [[electrodynamics/maxwell-equations]] 的能量密度、坡印廷矢量与麦克斯韦应力张量收进一个对象。把这套场论量子化就得到量子电动力学；把单一的规范场 $A^\mu$ 换成若干相互作用的规范场，就得到 [[particles]] 中弱力与强力的规范理论。在广义相对论（[[gravitation]]）中，同样的协变方程成立，只需把 $\partial_\mu$ 换成弯曲时空中的协变导数。

::: summary
- 电荷是不变量；$J^\mu = (c\rho, \mathbf J)$ 与 $A^\mu = (V/c, \mathbf A)$ 是四维矢量，连续性方程是 $\partial_\mu J^\mu = 0$，在洛伦兹规范下 $\partial_\nu\partial^\nu A^\mu = \mu_0J^\mu$。
- $\mathbf E$ 与 $\mathbf B$ 是反称张量 $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$ 的六个分量，其中 $F^{0i} = -E_i/c$，$F^{12} = -B_z$。
- 麦克斯韦方程组是 $\partial_\mu F^{\mu\nu} = \mu_0J^\nu$ 加比安基恒等式；洛伦兹力是 $\dd p^\mu/\dd\tau = qF^{\mu\nu}U_\nu$。它们在每个惯性系中都成立。
- 在一次加速之下，平行分量不变，而 $\mathbf E'_\perp = \gamma(\mathbf E + \mathbf v\times\mathbf B)_\perp$、$\mathbf B'_\perp = \gamma(\mathbf B - \mathbf v\times\mathbf E/c^2)_\perp$。
- $\mathbf E\cdot\mathbf B$ 与 $E^2 - c^2B^2$ 是不变量；它们决定是否存在纯电场或纯磁场的参考系。$E < cB$ 的正交场可被漂移 $\mathbf E\times\mathbf B/B^2$ 消去。
- 匀速运动电荷的场从其当前位置径向指出，沿运动方向缩小 $1/\gamma^2$、横向增强 $\gamma$ 倍，且有 $\mathbf B = \mathbf v\times\mathbf E/c^2$。
- 磁是静电力的相对论伴侣：电流之间的磁力，是运动参考系中出现的微小电荷密度的电力。
:::

## 习题 {#exercises}

::: exercise 运动途中看到的磁场 {level=1 check="1.00"}
实验室中有匀强场 $\mathbf B = 1.00\,\mathrm{T}\,\hat{\mathbf z}$，无电场。求沿 $x$ 以 $1.00\times10^{6}\,\mathrm{m/s}$ 运动的参考系中的电场（以 $\mathrm{MV/m}$ 计）。
::: solution
由 [[#eq-transform-x]]，$E'_y = \gamma(0 - vB_z) = -\gamma vB_z$，且 $E'_x = E'_z = 0$。这里 $\gamma = 1.0000056$，故 $E'_y = -1.00\times10^{6}\,\mathrm{V/m}$：大小 $1.00\,\mathrm{MV/m}$、沿 $-\hat{\mathbf y}$ 的电场。在运动系中静止的电荷感受 $q\mathbf E'$，正是实验室的 $q\mathbf v\times\mathbf B$；由 $\mathbf v = v\hat{\mathbf x}$，$\mathbf v\times\mathbf B = -vB\hat{\mathbf y}$，理当如此。
:::
:::

::: exercise 漂移速度 {level=1 check="1.00e6"}
对正交场 $E = 1.00\times10^{4}\,\mathrm{V/m}$、$B = 1.00\times10^{-2}\,\mathrm{T}$，求 $\mathbf E\times\mathbf B$ 漂移速度（以 $\mathrm{m/s}$ 计）。
::: solution
由 [[#ex-drift]]，$v_d = E/B = 1.00\times10^{6}\,\mathrm{m/s}$。条件 $E < cB$ 成立，因为 $cB = 3.00\times10^{6}\,\mathrm{V/m}$，所以漂移参考系存在。
:::
:::

::: exercise 消去磁场 {level=1 check="0.5"}
实验室中 $\mathbf E = 6.00\times10^{8}\,\mathrm{V/m}\,\hat{\mathbf x}$、$\mathbf B = 1.00\,\mathrm{T}\,\hat{\mathbf y}$。证明存在一个参考系其中场是纯电的，并求其速度（以 $c$ 的分数计）。
::: solution
$\mathbf E\cdot\mathbf B = 0$ 且 $E^2 - c^2B^2 = (36.0 - 8.99)\times10^{16} > 0$，所以由 [[#thm-invariants]]，这样的参考系存在。沿 $\mathbf E\times\mathbf B\propto\hat{\mathbf z}$ 加速。对沿 $z$ 的加速，[[#eq-transform]] 给出 $\mathbf B'_\perp = \gamma(\mathbf B - \mathbf v\times\mathbf E/c^2)$，其中 $\mathbf v\times\mathbf E = vE\,\hat{\mathbf z}\times\hat{\mathbf x} = vE\hat{\mathbf y}$，故 $B'_y = \gamma(B - vE/c^2)$，在 $v = c^2B/E = (2.998\times10^{8})^2(1.00)/(6.00\times10^{8}) = 1.50\times10^{8}\,\mathrm{m/s}$ 处消失，即 $\beta = 0.500$（三位有效数字）。在那一参考系中 $E' = \gamma(E - vB) = E/\gamma = \sqrt{E^2 - c^2B^2} = 5.20\times10^{8}\,\mathrm{V/m}$，与不变量自洽。
:::
:::

::: exercise 达到 0.99c 所需的时间 {level=1 check="12.0"}
电子从静止开始在 $1.00\times10^{6}\,\mathrm{V/m}$ 的匀强场中出发。达到 $0.990c$ 需要多久（以 $\mathrm{ns}$ 计）？
::: solution
由 [[#ex-hyperbolic]]，$p = eEt$，而 $p = \gamma m_ev = m_ec\,\beta\gamma$。在 $\beta = 0.990$ 处，$\beta\gamma = 0.990/\sqrt{1 - 0.9801} = 7.02$。故 $t = m_ec\,\beta\gamma/(eE) = (2.731\times10^{-22})(7.02)/((1.602\times10^{-19})(1.00\times10^{6})) = 1.20\times10^{-8}\,\mathrm{s} = 12.0\,\mathrm{ns}$。按牛顿力学，它早在 $1.7\,\mathrm{ns}$ 就已越过 $c$。
:::
:::

::: exercise LHC 的薄饼场 {level=2 check="10.4"}
对 $6.80\,\mathrm{TeV}$ 的质子（$m_pc^2 = 0.938\,\mathrm{GeV}$），求轨道旁 $1.00\,\mathrm{mm}$ 处横向峰值场（以 $\mathrm{V/m}$ 计），以及正前方 $1.00\,\mathrm{mm}$ 处的场与库仑值之比。
::: solution
由 [[#ex-lhc]]，$E_\perp = \gamma e/(4\pi\varepsilon_0b^2) = 10.4\,\mathrm{V/m}$。正前方 $\psi = 0$，[[#eq-moving]] 给出库仑值乘以 $1 - \beta^2 = 1/\gamma^2 = 1/(7.25\times10^{3})^2 = 1.90\times10^{-8}$。
:::
:::

::: exercise 张量形式的不变量 {level=2}
用 $\eta_{\mu\nu}$ 降低 [[#eq-field-tensor]] 的指标求 $F_{\mu\nu}$，并显式计算 $F_{\mu\nu}F^{\mu\nu}$。然后计算 $F^{\mu\nu}F_{\nu\mu}$，并解释其符号。
::: solution
降一个指标就是乘 $\eta = \mathrm{diag}(1,-1,-1,-1)$，所以 $F_{\mu\nu} = \eta_{\mu\alpha}\eta_{\nu\beta}F^{\alpha\beta}$。含一个时间指标与一个空间指标的元素乘到一个 $-1$；含两个空间指标的元素乘 $(-1)^2 = 1$。于是 $F_{0i} = +E_i/c$，且 $F_{ij} = F^{ij}$。在求和 $F_{\mu\nu}F^{\mu\nu}$ 中，六个配对各出现两次（作为 $\mu\nu$ 与 $\nu\mu$）：

$$
F_{\mu\nu}F^{\mu\nu} = 2\sum_i F_{0i}F^{0i} + 2\sum_{i<j}F_{ij}F^{ij} = 2\sum_i\left(\frac{E_i}{c}\right)\left(-\frac{E_i}{c}\right) + 2\left(B_z^2 + B_y^2 + B_x^2\right) = 2\left(B^2 - \frac{E^2}{c^2}\right).
$$

由于 $F$ 反称，$F_{\nu\mu} = -F_{\mu\nu}$，故 $F^{\mu\nu}F_{\nu\mu} = -F^{\mu\nu}F_{\mu\nu} = 2(E^2/c^2 - B^2)$。两者都是不变量，因为每个指标都被缩并；符号只取决于指标写出的先后。
:::
:::

::: exercise 运动电流的电荷密度 {level=2 check="111"}
一根中性长直导线载 $10.0\,\mathrm{A}$。求沿导线以 $1.00\times10^{6}\,\mathrm{m/s}$ 运动的参考系中，其线电荷密度的大小（以 $\mathrm{pC/m}$ 计）。
::: solution
由 [[#ex-purcell]]，$\lvert\lambda'\rvert = \gamma vI/c^2 = (1.0000056)(1.00\times10^{6})(10.0)/(2.998\times10^{8})^2 = 1.11\times10^{-10}\,\mathrm{C/m} = 111\,\mathrm{pC/m}$。若参考系沿常规电流方向运动，它取负值。
:::
:::

::: exercise 退行的观察者 {level=2 check="500"}
振幅 $1.00\times10^{3}\,\mathrm{V/m}$ 的平面波，由一个沿传播方向以 $\beta = 0.600$ 远离波源的参考系观测。求该系中的振幅（以 $\mathrm{V/m}$ 计），以及观测强度与发射强度之比。
::: solution
由 [[#ex-doppler]]，$E'_0 = \sqrt{(1-\beta)/(1+\beta)}\,E_0 = \sqrt{0.400/1.600}\times1.00\times10^{3} = 500\,\mathrm{V/m}$。强度按 $E_0^2$ 缩放，所以降到原来的 $0.250$。用不变量校验：两个不变量前后都为零，对任何平面波皆然。
:::
:::

::: exercise 运动电容器的场 {level=2 check="0.445"}
电容器在自身静止系中，板面平行于其速度，板间场为 $1.00\times10^{5}\,\mathrm{V/m}$。它以 $\beta = 0.800$ 运动。求实验室中板间的电场与磁场，后者以 mT 计。
::: solution
由 [[#ex-capacitor]]，$E = \gamma E_0$，其中 $\gamma = 1/\sqrt{1 - 0.640} = 1.667$，故 $E = 1.67\times10^{5}\,\mathrm{V/m}$，且 $B = \gamma vE_0/c^2 = \beta E/c = (0.800)(1.667\times10^{5})/(2.998\times10^{8}) = 4.45\times10^{-4}\,\mathrm{T} = 0.445\,\mathrm{mT}$。校验不变量：$E^2 - c^2B^2 = E^2(1 - \beta^2) = E_0^2$，正是静止系中的值。
:::
:::

::: exercise 使两场平行的参考系 {level=3}
设 $\mathbf E$ 与 $\mathbf B$ 均匀且 $\mathbf E\times\mathbf B\ne\mathbf 0$。证明：沿 $\mathbf E\times\mathbf B$ 以速度 $\mathbf v$ 加速能使 $\mathbf E'$ 与 $\mathbf B'$ 平行，当且仅当

$$
\frac{\beta}{1 + \beta^2} = \frac{c\,\lvert\mathbf E\times\mathbf B\rvert}{E^2 + c^2B^2},
$$

并证明这个方程总有 $0 < \beta < 1$ 的解。
::: hint
由于 $\mathbf v\perp\mathbf E$ 且 $\mathbf v\perp\mathbf B$，两个场都完全垂直于 $\mathbf v$。用 BAC–CAB 法则展开 $\mathbf E'\times\mathbf B'$。
:::
::: solution
由于 $\mathbf v$ 沿 $\mathbf E\times\mathbf B$，它垂直于两个场，[[#eq-transform]] 给出 $\mathbf E' = \gamma(\mathbf E + \mathbf v\times\mathbf B)$ 与 $\mathbf B' = \gamma(\mathbf B - \mathbf v\times\mathbf E/c^2)$。展开：

$$
\frac{\mathbf E'\times\mathbf B'}{\gamma^2} = \mathbf E\times\mathbf B - \frac{\mathbf E\times(\mathbf v\times\mathbf E)}{c^2} + (\mathbf v\times\mathbf B)\times\mathbf B - \frac{(\mathbf v\times\mathbf B)\times(\mathbf v\times\mathbf E)}{c^2}.
$$

由 $\mathbf v\cdot\mathbf E = \mathbf v\cdot\mathbf B = 0$：$\mathbf E\times(\mathbf v\times\mathbf E) = \mathbf vE^2$；$(\mathbf v\times\mathbf B)\times\mathbf B = -\mathbf vB^2$；而 $(\mathbf v\times\mathbf B)\times(\mathbf v\times\mathbf E) = \mathbf v\,[(\mathbf v\times\mathbf B)\cdot\mathbf E] - \mathbf E\,[(\mathbf v\times\mathbf B)\cdot\mathbf v] = -\mathbf v\,[\mathbf v\cdot(\mathbf E\times\mathbf B)]$。记 $\mathbf v = v\hat{\mathbf u}$，$\mathbf E\times\mathbf B = P\hat{\mathbf u}$，其中 $P = \lvert\mathbf E\times\mathbf B\rvert$，

$$
\frac{\mathbf E'\times\mathbf B'}{\gamma^2} = \hat{\mathbf u}\left[P - v\left(\frac{E^2}{c^2} + B^2\right) + \frac{v^2}{c^2}P\right].
$$

此式为零当且仅当 $P(1 + v^2/c^2) = v(E^2/c^2 + B^2)$，即 $\beta/(1+\beta^2) = cP/(E^2 + c^2B^2)$。右端记作 $k$，它满足 $0 < k\le\frac12$，因为 $cP\le cEB\le\frac12(E^2 + c^2B^2)$。函数 $\beta/(1+\beta^2)$ 当 $\beta$ 从 $0$ 变到 $1$ 时从 $0$ 增到 $\frac12$，所以存在解 $\beta\in(0, 1]$；$\beta = 1$ 仅当 $k = \frac12$，而这要求 $\mathbf E\perp\mathbf B$ 且 $E = cB$，即平面波型的场，对它没有任何参考系可行。其余情形 $0<\beta<1$。显式地 $\beta = (1 - \sqrt{1 - 4k^2})/(2k)$。
:::
:::

::: exercise 侧向与迎头 {level=3 check="12.1"}
对以 $\beta = 0.900$ 运动的电荷，求垂直于运动方向、距离 $R$ 处的场强与正前方同一距离处场强之比，并证明以当前位置为心、半径 $R$ 的球面的总通量仍是 $q/\varepsilon_0$。
::: solution
由 [[#eq-moving]]，$\psi = 90^\circ$ 处因子为 $(1-\beta^2)/(1-\beta^2)^{3/2} = \gamma$，$\psi = 0$ 处为 $1 - \beta^2 = 1/\gamma^2$。比值为 $\gamma^3 = (1 - 0.810)^{-3/2} = (0.190)^{-3/2} = 12.1$。至于通量，$\mathbf E$ 从当前位置径向指出，所以对半径 $R$ 的球面

$$
\Phi = \frac{q}{4\pi\varepsilon_0}(1-\beta^2)\int_0^\pi\frac{2\pi\sin\psi\,\dd\psi}{(1 - \beta^2\sin^2\psi)^{3/2}}.
$$

令 $u = \cos\psi$，$1 - \beta^2\sin^2\psi = (1-\beta^2) + \beta^2u^2$，而 $\int_{-1}^{1}\frac{\dd u}{(a^2 + \beta^2u^2)^{3/2}} = \frac{2}{a^2\sqrt{a^2+\beta^2}}$，其中 $a^2 = 1 - \beta^2$，故 $a^2 + \beta^2 = 1$。积分为 $2\pi\cdot2/(1-\beta^2)$，于是 $\Phi = \frac{q}{4\pi\varepsilon_0}\cdot4\pi = q/\varepsilon_0$。高斯定律在每个参考系中都成立，理当如此——$\nabla\cdot\mathbf E = \rho/\varepsilon_0$ 是协变方程 [[#eq-covariant-inhom]] 的一个分量。
:::
:::
