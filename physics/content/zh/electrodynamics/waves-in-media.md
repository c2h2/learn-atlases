夜晚从亮着灯的房间里看窗玻璃，你会看到自己：大约 $4\%$ 的光在每个玻璃表面被反射。把一片玻璃倾转到接近 $56^\circ$，在入射面内偏振的那部分光的反射就消失了。几微米厚的铜箔能挡住几乎整个手机信号，而 $50\,\mathrm{Hz}$ 的市电场却能穿透实心铜将近一厘米。短波无线电信号从高层大气反射回来，而一根宽 $23\,\mathrm{mm}$ 的矩形金属管能传输 $10\,\mathrm{GHz}$ 的微波，低于 $6.6\,\mathrm{GHz}$ 的一切却不行。这些数字全部来自介质中的麦克斯韦方程组 [[electrodynamics/maxwell-equations#eq-maxwell-matter]]，再加上那一章的边界条件。

本章依次把它们算到底。线性电介质中的平面波以 $c/n$ 行进。在界面上，切向场必须匹配这一要求给出反射与折射定律，以及决定反射份额的菲涅耳公式。在导体中波数是复数，波在一个**趋肤深度**之内消亡。自由电子等离子体在其**等离子体频率**之上透明、在其之下反光。最后，导体壁把波约束进**波导**，波导的截止频率由它的尺寸决定。

真空平面波、它的偏振与能量见 [[magnetism/electromagnetic-waves]]；坡印廷矢量与边界条件见 [[electrodynamics/maxwell-equations]]。全章使用复指数：场写成 $\tilde{\mathbf E}e^{i(kz - \omega t)}$ 指的是它的实部；对场为二次型的物理量，由实部计算，或用规则 $\langle\mathrm{Re}(\tilde a e^{-i\omega t})\,\mathrm{Re}(\tilde b e^{-i\omega t})\rangle = \frac12\mathrm{Re}(\tilde a\tilde b^*)$ 求得。建立在这些结果之上的几何光学与波动光学是 [[optics]] 的主题。

## 线性介质中的平面波 {#plane-waves}

在无自由电荷、无自由电流的均匀线性各向同性介质中，$\mathbf D = \varepsilon\mathbf E$、$\mathbf B = \mu\mathbf H$，麦克斯韦方程组写作

$$
\nabla\cdot\mathbf E = 0, \qquad \nabla\cdot\mathbf B = 0, \qquad \nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t}, \qquad \nabla\times\mathbf B = \mu\varepsilon\frac{\partial\mathbf E}{\partial t}.
$$

这就是把真空方程组里的 $\mu_0\varepsilon_0$ 换成 $\mu\varepsilon$。对第三条取旋度并代入第四条，得 $\nabla^2\mathbf E = \mu\varepsilon\,\partial_t^2\mathbf E$，于是波以 $v = 1/\sqrt{\mu\varepsilon}$ 行进。

::: definition 折射率与波阻抗 {#def-index}
线性介质的**折射率**为

$$
n = \frac{c}{v} = \sqrt{\frac{\mu\varepsilon}{\mu_0\varepsilon_0}} = \sqrt{\mu_r\varepsilon_r},
$$ {#eq-index}

其**波阻抗**为 $Z = \sqrt{\mu/\varepsilon}$，即平面波中 $E/H$ 的比值。真空中 $Z_0 = \sqrt{\mu_0/\varepsilon_0} = 376.73\,\Omega$。对非磁介质，$\mu_r\approx1$，$n = \sqrt{\varepsilon_r}$，$Z = Z_0/n$。
:::

沿 $\hat{\mathbf k}$ 传播的单色平面波有

$$
\mathbf E = \mathbf E_0\cos(\mathbf k\cdot\mathbf r - \omega t), \qquad \mathbf B = \frac{1}{v}\hat{\mathbf k}\times\mathbf E, \qquad \omega = vk ,
$$ {#eq-plane}

其中 $\mathbf E_0\perp\hat{\mathbf k}$：波是横波，$\mathbf E$、$\mathbf B$、$\hat{\mathbf k}$ 构成右手系。强度为 $I = \frac12\varepsilon vE_0^2 = \frac{E_0^2}{2Z}$。

::: warning $\varepsilon_r$ 依赖频率
对水，静态的 $\varepsilon_r\approx80$ 会给出 $n\approx9$，然而水对可见光的折射率是 $1.33$。这里没有矛盾。[[#eq-index]] 中的介电常数必须在波的频率处取值。水分子的固有偶极子跟得上静态场，却来不及跟着以 $5\times10^{14}\,\mathrm{Hz}$ 振荡的场转动；只有电子作出响应，而在光频段 $\varepsilon_r(\omega)\approx1.77$。$\varepsilon$ 对频率的依赖就是**色散**，它把白光摊开成光谱。它的一个简单模型——自由电子等离子体——稍后在本章出现。
:::

## 垂直入射时的反射与透射 {#normal}

设平面 $z = 0$ 把介质 1（$z<0$，折射率 $n_1$）与介质 2（$z>0$，折射率 $n_2$）分开，两者都非磁，一列沿 $\hat{\mathbf x}$ 偏振的波从左侧入射。一般会有一个向左去的反射波和一个向右去的透射波：

$$
\begin{aligned}
\tilde{\mathbf E}_I &= \tilde E_Ie^{i(k_1z - \omega t)}\hat{\mathbf x}, &\quad \tilde{\mathbf B}_I &= \frac{1}{v_1}\tilde E_Ie^{i(k_1z - \omega t)}\hat{\mathbf y},\\
\tilde{\mathbf E}_R &= \tilde E_Re^{i(-k_1z - \omega t)}\hat{\mathbf x}, &\quad \tilde{\mathbf B}_R &= -\frac{1}{v_1}\tilde E_Re^{i(-k_1z - \omega t)}\hat{\mathbf y},\\
\tilde{\mathbf E}_T &= \tilde E_Te^{i(k_2z - \omega t)}\hat{\mathbf x}, &\quad \tilde{\mathbf B}_T &= \frac{1}{v_2}\tilde E_Te^{i(k_2z - \omega t)}\hat{\mathbf y}.
\end{aligned}
$$

反射的磁场带负号，因为在 [[#eq-plane]] 中这里 $\hat{\mathbf k} = -\hat{\mathbf z}$。三列波共享同一个频率 $\omega$：边界条件必须在每一时刻成立，频率不同的波做不到这一点。

::: theorem 垂直入射的菲涅耳系数 {#thm-normal}
对非磁介质，垂直入射时的振幅比为

$$
\frac{\tilde E_R}{\tilde E_I} = \frac{n_1 - n_2}{n_1 + n_2}, \qquad \frac{\tilde E_T}{\tilde E_I} = \frac{2n_1}{n_1 + n_2},
$$ {#eq-normal}

反射与透射的强度份额为

$$
R = \left(\frac{n_1 - n_2}{n_1 + n_2}\right)^2, \qquad T = \frac{4n_1n_2}{(n_1 + n_2)^2}, \qquad R + T = 1.
$$ {#eq-RT-normal}
:::

::: proof
没有自由面电荷或面电流。场是切向的，所以条件是 $z = 0$ 处 $\mathbf E^\parallel$ 与 $\mathbf H^\parallel = \mathbf B^\parallel/\mu_0$ 连续：

$$
\tilde E_I + \tilde E_R = \tilde E_T, \qquad \frac{1}{v_1}\bigl(\tilde E_I - \tilde E_R\bigr) = \frac{1}{v_2}\tilde E_T .
$$

第二条乘以 $c$，使 $c/v_j = n_j$：$n_1(\tilde E_I - \tilde E_R) = n_2\tilde E_T = n_2(\tilde E_I + \tilde E_R)$。于是 $(n_1 - n_2)\tilde E_I = (n_1 + n_2)\tilde E_R$，即第一个比值；由 $\tilde E_T = \tilde E_I + \tilde E_R$ 得第二个。介质 $j$ 中的强度是 $\frac12\varepsilon_jv_jE^2 = \frac12\varepsilon_0cn_jE^2$，因为 $\varepsilon_jv_j = \varepsilon_0n_j^2\cdot c/n_j$。所以 $R = (E_R/E_I)^2$，$T = (n_2/n_1)(E_T/E_I)^2 = 4n_1n_2/(n_1+n_2)^2$。最后，$(n_1-n_2)^2 + 4n_1n_2 = (n_1+n_2)^2$，故 $R + T = 1$：能量守恒，正是坡印廷定理的要求。
:::

空气到玻璃，$n_2 = 1.50$，$R = (0.50/2.50)^2 = 0.0400$，即开头一段说的那 $4\%$。空气到水，$R = 0.020$。当 $n_2 > n_1$ 时反射振幅为负：反射波反号，相当于相位改变 $\pi$，就像一根弦系到更重的弦上一样。公式 [[#eq-RT-normal]] 对 $n_1$ 与 $n_2$ 对称：从哪一侧看，反射率都一样。

::: example 增透膜 {#ex-coating}
一块折射率 $n_g = 1.52$ 的玻璃透镜镀一层折射率 $n_c$、厚度 $d$ 的薄膜。忽略多次反射，求使真空波长 $\lambda_0 = 550\,\mathrm{nm}$ 的光反射相消的 $n_c$ 与最小的 $d$。氟化镁，$n = 1.38$，能接近到什么程度？
::: solution
两次反射相互干涉：从空气到膜，振幅 $r_1 = (1 - n_c)/(1 + n_c)$；从膜到玻璃，$r_2 = (n_c - n_g)/(n_c + n_g)$。当 $1 < n_c < n_g$ 时二者都是负的，即都经历同样的反号。要相消，二者须大小相等，且第二次要多走半个波长（在膜内）：$2d = \lambda_0/(2n_c)$，即**四分之一波长条件** $d = \lambda_0/(4n_c)$。大小相等要求

$$
\frac{n_c - 1}{n_c + 1} = \frac{n_g - n_c}{n_g + n_c} \iff n_c^2 = n_g, \qquad n_c = \sqrt{1.52} = 1.233 .
$$

没有耐久的固体材料有这么低的折射率。氟化镁的 $n = 1.38$，取 $d = 550/(4\times1.38) = 99.6\,\mathrm{nm}$，给出 $r_1 = -0.1597$、$r_2 = -0.0483$；二者相位相反，反射振幅约 $0.111$，反射率约 $1.2\%$，而无镀膜玻璃是 $4.3\%$。（精确计入多次反射，四分之一波长条件下的反射率为 $[(n_g - n_c^2)/(n_g + n_c^2)]^2 = 1.26\%$。）相机镜头上有十几个面，正是这使反射率降到原来三分之一的削减，决定了照片是清晰还是发白。
:::
:::

## 斜入射 {#oblique}

现在让入射波向量 $\mathbf k_I$ 与法线 $\hat{\mathbf z}$ 成角 $\theta_I$。反射波与透射波的波向量 $\mathbf k_R$、$\mathbf k_T$ 待定，其中 $k_R = k_I = n_1\omega/c$，$k_T = n_2\omega/c$。

::: theorem 反射与折射定律 {#thm-snell}
三个波向量位于同一平面——**入射面**——内，该平面包含法线。反射角等于入射角，透射角服从**斯涅尔定律**：

$$
\theta_R = \theta_I, \qquad n_1\sin\theta_I = n_2\sin\theta_T .
$$ {#eq-snell}
:::

::: proof
无论振幅如何，$z = 0$ 处的边界条件都有形式 $(\ldots)e^{i(\mathbf k_I\cdot\mathbf r - \omega t)} + (\ldots)e^{i(\mathbf k_R\cdot\mathbf r - \omega t)} = (\ldots)e^{i(\mathbf k_T\cdot\mathbf r - \omega t)}$，且它们必须对平面上每一点 $(x, y, 0)$ 成立。$x$ 与 $y$ 的指数中波数不同的三个指数函数线性无关，所以等式要对一切 $x, y$ 成立，只能

$$
\mathbf k_I\cdot\mathbf r = \mathbf k_R\cdot\mathbf r = \mathbf k_T\cdot\mathbf r \quad\text{对所有 }z = 0\text{ 的 }\mathbf r,
$$

即三个波向量的切向分量相等。取坐标轴使 $\mathbf k_I$ 位于 $xz$ 平面内。于是 $(k_I)_y = 0$，故 $(k_R)_y = (k_T)_y = 0$：三者都在 $xz$ 平面内。$x$ 分量给出 $k_I\sin\theta_I = k_R\sin\theta_R = k_T\sin\theta_T$。由 $k_R = k_I$ 得 $\theta_R = \theta_I$；由 $k_T/k_I = n_2/n_1$ 得 $n_1\sin\theta_I = n_2\sin\theta_T$。
:::

这一运动学论证不需要知道任何振幅；任何波，只要对平坦表面服从线性边界条件，声波也不例外，就服从同样的定律。振幅则需要偏振信息。任何偏振都是两种偏振的叠加：**s-偏振**，$\mathbf E$ 垂直于入射面（德语 *senkrecht*，垂直），以及 **p-偏振**，$\mathbf E$ 在入射面内。

::: theorem 菲涅耳公式 {#thm-fresnel}
对非磁介质，振幅反射系数与透射系数为

$$
r_s = \frac{n_1\cos\theta_I - n_2\cos\theta_T}{n_1\cos\theta_I + n_2\cos\theta_T}, \qquad t_s = \frac{2n_1\cos\theta_I}{n_1\cos\theta_I + n_2\cos\theta_T},
$$ {#eq-fresnel-s}

$$
r_p = \frac{n_2\cos\theta_I - n_1\cos\theta_T}{n_2\cos\theta_I + n_1\cos\theta_T}, \qquad t_p = \frac{2n_1\cos\theta_I}{n_2\cos\theta_I + n_1\cos\theta_T},
$$ {#eq-fresnel-p}

其中对 p-偏振，符号对应于每列波的磁场都沿 $+\hat{\mathbf y}$ 的约定。反射率为 $R = r^2$，透射率为 $T = \frac{n_2\cos\theta_T}{n_1\cos\theta_I}t^2$，对每种偏振各有 $R + T = 1$。
:::

::: proof
从 s-情形开始。令三列波都有 $\mathbf E = E\hat{\mathbf y}$。由 $\hat{\mathbf k}_I = (\sin\theta_I, 0, \cos\theta_I)$、$\hat{\mathbf k}_R = (\sin\theta_I, 0, -\cos\theta_I)$、$\hat{\mathbf k}_T = (\sin\theta_T, 0, \cos\theta_T)$，磁场 $\mathbf B = \frac{n}{c}\hat{\mathbf k}\times\mathbf E$ 的 $x$ 分量为

$$
B_x = -\frac{n_1}{c}E_I\cos\theta_I, \qquad +\frac{n_1}{c}E_R\cos\theta_I, \qquad -\frac{n_2}{c}E_T\cos\theta_T,
$$

因为 $\hat{\mathbf k}\times\hat{\mathbf y} = (-k_z, 0, k_x)$。$\mathbf E$ 场完全是切向的，所以 $E_y$ 的连续给出 $E_I + E_R = E_T$，而 $H_x = B_x/\mu_0$ 的连续给出

$$
n_1\cos\theta_I\,(E_I - E_R) = n_2\cos\theta_T\,E_T .
$$

这正是把 $n_j$ 换成 $n_j\cos\theta_j$ 的垂直入射方程组，于是 [[#eq-normal]] 给出 [[#eq-fresnel-s]]。穿过界面单位面积的能量是坡印廷矢量的法向分量 $I\cos\theta$，所以 $R = (E_R/E_I)^2$，$T = \frac{n_2E_T^2\cos\theta_T}{n_1E_I^2\cos\theta_I}$。用恒等式 $(a-b)^2 + 4ab = (a+b)^2$，取 $a = n_1\cos\theta_I$、$b = n_2\cos\theta_T$，得 $R + T = 1$。

对 p-偏振，令每列波的磁场都是 $B\hat{\mathbf y}$，$E = (c/n)B$。电场在入射面内，按这一约定它们的切向（$x$）分量为 $E_I\cos\theta_I$、$-E_R\cos\theta_I$、$E_T\cos\theta_T$，反射的那个反号，因为其 $\hat{\mathbf k}$ 的 $z$ 分量已反号。$E_x$ 的连续与 $H_y = (n/\mu_0c)E$ 的连续给出

$$
\cos\theta_I\,(E_I - E_R) = \cos\theta_T\,E_T, \qquad n_1(E_I + E_R) = n_2E_T .
$$

由第一条消去 $E_T = (n_1/n_2)(E_I + E_R)$，得 $E_I(n_2\cos\theta_I - n_1\cos\theta_T) = E_R(n_2\cos\theta_I + n_1\cos\theta_T)$，即 $r_p$；再由 $t_p = (n_1/n_2)(1 + r_p)$ 得 [[#eq-fresnel-p]]。p-偏振的能量守恒留作习题。
:::

垂直入射时两式都化为 [[#eq-normal]]，只是那里 $r_p = -r_s$：这是 p-约定的推论，不是物理，因为垂直入射时两种偏振无从区分。不同教材对 p-约定的选法不同；比较符号之前先核对约定。

::: corollary 布儒斯特角 {#cor-brewster}
p-反射在由下式给出的角 $\theta_B$ 处消失，$r_p = 0$：

$$
\tan\theta_B = \frac{n_2}{n_1},
$$ {#eq-brewster}

且在该角处反射光线与透射光线垂直，$\theta_B + \theta_T = 90^\circ$。
:::

::: proof
由 [[#eq-fresnel-p]]，$r_p = 0$ 要求 $n_2\cos\theta_I = n_1\cos\theta_T$。斯涅尔定律给出 $n_1\sin\theta_I = n_2\sin\theta_T$。两式相乘：$n_1n_2\sin\theta_I\cos\theta_I = n_1n_2\sin\theta_T\cos\theta_T$，于是 $\sin2\theta_I = \sin2\theta_T$。两角不同（除非 $n_1 = n_2$），所以 $2\theta_I = \pi - 2\theta_T$，即 $\theta_I + \theta_T = \pi/2$。此时 $\sin\theta_T = \cos\theta_I$，斯涅尔定律化为 $n_1\sin\theta_I = n_2\cos\theta_I$，即 [[#eq-brewster]]。
:::

垂直性有物理含义。反射波是介质 2 中被透射 $\mathbf E$ 驱动而振荡的电子辐射出来的。在布儒斯特角，对 p-偏振，那个振荡恰好指向本应反射的光线方向，而振荡偶极子不沿自身轴向辐射（[[electrodynamics/radiation]]）。

::: widget plot
f: ((cos(x) - n*sqrt(1 - (sin(x)/n)^2))/(cos(x) + n*sqrt(1 - (sin(x)/n)^2)))^2; ((n*cos(x) - sqrt(1 - (sin(x)/n)^2))/(n*cos(x) + sqrt(1 - (sin(x)/n)^2)))^2
x: 0, 1.5708
y: 0, 1
sliders: n=1.5:1.05:4:0.01
labels: R_s; R_p
caption: 光从空气射入折射率为 $n$ 的介质时，反射率对入射角 $\theta_I$（以弧度计，从 $0$ 到 $\pi/2$）的曲线。两条曲线都从 $((n-1)/(n+1))^2$ 出发——$n = 1.5$ 时是 $0.04$——并在掠入射时都到达 $1$。中间一段，$R_p$ 在布儒斯特角处降到零，玻璃对应 $0.983\,\mathrm{rad} = 56.3^\circ$。把 $n$ 向 $4$ 增大——红外波段的锗一类半导体——看布儒斯特角移向 $76^\circ$，同时垂直入射反射率升到 $36\%$。水面与路面的眩光主要正因而是 s-偏振的，这就是偏振太阳镜只透过竖直（p）成分的原因。
:::

::: example 光以 45° 入射玻璃的反射 {#ex-45}
自然光从空气以 $45.0^\circ$ 入射玻璃（$n = 1.50$）。求 $R_s$、$R_p$、总反射率，以及反射光的偏振度。
::: solution
斯涅尔定律给出 $\sin\theta_T = \sin45^\circ/1.50 = 0.4714$，所以 $\cos\theta_T = 0.8819$；$\cos\theta_I = 0.7071$。于是

$$
r_s = \frac{0.7071 - 1.50(0.8819)}{0.7071 + 1.50(0.8819)} = \frac{-0.6157}{2.0299} = -0.3033, \qquad r_p = \frac{1.50(0.7071) - 0.8819}{1.50(0.7071) + 0.8819} = \frac{0.1788}{1.9426} = 0.0920 .
$$

所以 $R_s = 0.0920$，$R_p = 0.00847$。（这里 $R_s = r_p$ 是一个奇异的恒等式：恰在 $45^\circ$ 处，对任何 $n$ 都有 $r_p = r_s^2$。）自然光是两种偏振的等量混合，所以 $R = \frac12(R_s + R_p) = 0.0502$。反射光中 s 与 p 强度之比为 $0.0920 : 0.00847$，偏振度 $(R_s - R_p)/(R_s + R_p) = 0.83$。反射是一种有效的起偏方式。
:::
:::

### 全反射 {#tir}

若 $n_1 > n_2$，一旦 $\sin\theta_I > n_2/n_1$——即超过**临界角** $\theta_c = \arcsin(n_2/n_1)$（玻璃到空气是 $41.8^\circ$）——斯涅尔定律对 $\theta_T$ 就没有实数解。相位匹配的论证仍然成立，于是透射波有 $k_x = k_I\sin\theta_I > k_T$，从而 $k_z^2 = k_T^2 - k_x^2 < 0$。取 $k_z = i\kappa$，

$$
\tilde{\mathbf E}_T\propto e^{-\kappa z}e^{i(k_xx - \omega t)}, \qquad \kappa = \frac{\omega}{c}\sqrt{n_1^2\sin^2\theta_I - n_2^2},
$$

这是一个沿表面传播、随离开表面而衰减的**倏逝波**。在 [[#eq-fresnel-s]] 中，$n_2\cos\theta_T$ 成为虚数，于是 $r_s$ 是一个复数除以它的共轭，$\lvert r_s\rvert = 1$：能量全部被反射，倏逝波平均不带走任何能量。然而只要把第二块玻璃的表面移到几分之一个波长之内，倏逝波就会耦合进去：**受抑全反射**，量子隧穿的光学类比，指纹传感器与分束立方的基础。

::: quiz
光从水（$n = 1.33$）射入空气。哪些说法是对的？
- [x] 超过约 $48.8^\circ$ 后所有的光都被反射。
- [ ] 垂直入射时反射率比从空气射入水时大。
- [x] 存在布儒斯特角，在该角 p-偏振光完全透射。
- [ ] 折射光线向法线偏折。
::: solution
临界角是 $\arcsin(1/1.33) = 48.8^\circ$。垂直入射反射率 [[#eq-RT-normal]] 对 $n_1, n_2$ 对称，所以两个方向都是 $2.0\%$。布儒斯特角两个方向都存在：从水到空气是 $\arctan(1/1.33) = 36.9^\circ$，低于临界角。射向折射率较低的介质时，光线远离法线。
:::
:::

## 导体中的波 {#conductors}

在欧姆导体中，$\mathbf J_f = \sigma\mathbf E$。首先，内部的任何自由电荷几乎立刻衰减掉。把连续性方程与高斯定律结合，$\partial_t\rho_f = -\nabla\cdot\mathbf J_f = -\sigma\nabla\cdot\mathbf E = -(\sigma/\varepsilon)\rho_f$，于是

$$
\rho_f(t) = \rho_f(0)\,e^{-t/\tau}, \qquad \tau = \frac{\varepsilon}{\sigma}.
$$

对铜，$\tau = \varepsilon_0/\sigma = 1.5\times10^{-19}\,\mathrm{s}$；真实的弛豫更慢，受电子碰撞时间限制，但无论哪种情形，电荷最终都落到表面。内部 $\rho_f = 0$ 时，安培–麦克斯韦定律多出一项：

$$
\nabla\times\mathbf B = \mu\sigma\mathbf E + \mu\varepsilon\frac{\partial\mathbf E}{\partial t}.
$$

对 $\tilde{\mathbf E} = \tilde{\mathbf E}_0e^{i(\tilde kz - \omega t)}$，对法拉第定律取旋度给出 $\tilde k^2 = \mu\varepsilon\omega^2 + i\mu\sigma\omega$。波数是复数。

::: theorem 趋肤深度 {#thm-skin}
在 $\sigma\gg\omega\varepsilon$ 的导体（**良导体**）中，波数为

$$
\tilde k = \frac{1 + i}{\delta}, \qquad \delta = \sqrt{\frac{2}{\mu\sigma\omega}},
$$ {#eq-skin}

于是场随进入导体的距离按 $e^{-z/\delta}$ 衰减。**趋肤深度** $\delta$ 就是振幅下降 $1/e$ 所经过的距离。磁场比电场落后 $45^\circ$，且 $\lvert B\rvert/\lvert E\rvert = \sqrt{\mu\sigma/\omega}$，远大于 $1/c$。
:::

::: proof
由 $\sigma\gg\omega\varepsilon$，$\tilde k^2 = i\mu\sigma\omega(1 - i\omega\varepsilon/\sigma)\approx i\mu\sigma\omega$。由于 $\sqrt i = (1+i)/\sqrt2$，$\tilde k = (1+i)\sqrt{\mu\sigma\omega/2} = (1+i)/\delta$。于是 $e^{i\tilde kz} = e^{iz/\delta}e^{-z/\delta}$。平面波的法拉第定律给出 $\tilde{\mathbf B} = (\tilde k/\omega)\hat{\mathbf z}\times\tilde{\mathbf E}$，而 $\tilde k/\omega = \sqrt{\mu\sigma/\omega}\,e^{i\pi/4}$，其模为 $\sqrt{\mu\sigma/\omega}$、相位为 $45^\circ$。与真空比值 $1/c$ 相比，因子是 $\sqrt{\mu\sigma c^2/\omega}$，量级为 $\sqrt{\sigma/\omega\varepsilon_0}\gg1$。
:::

::: intuition 场为什么进不去
趋肤效应就是楞次定律在起作用。进入导体的变化磁场感应出电场，电场驱动涡流，涡流自己的磁场反抗这一变化。变化越快、导体越好，反抗的电流就越大，场能够存留的层就越薄。依赖关系 $\delta\propto1/\sqrt{\sigma\omega}$ 是扩散过程的依赖关系：良导体中麦克斯韦方程组化为 $\nabla^2\mathbf B = \mu\sigma\,\partial_t\mathbf B$，即扩散系数为 $1/\mu\sigma$ 的热方程，而 $\delta$ 正是场在 $1/\omega$ 时间内扩散的距离。
:::

::: example 铜的趋肤深度 {#ex-copper}
铜的 $\sigma = 5.96\times10^{7}\,\mathrm{S/m}$，$\mu\approx\mu_0$。在验证铜在两种频率下都是良导体之后，求它在 $60\,\mathrm{Hz}$ 与 $1.00\,\mathrm{GHz}$ 下的趋肤深度。
::: solution
比值 $\sigma/(\omega\varepsilon_0)$ 在 $60\,\mathrm{Hz}$ 下是 $5.96\times10^{7}/(2\pi\cdot60\cdot8.854\times10^{-12}) = 1.8\times10^{16}$，在 $1\,\mathrm{GHz}$ 下是 $1.1\times10^{9}$；两者都大得惊人。在 $60\,\mathrm{Hz}$ 下，

$$
\delta = \sqrt{\frac{2}{(4\pi\times10^{-7})(5.96\times10^{7})(2\pi\times60)}} = \sqrt{\frac{2}{2.824\times10^{4}}} = 8.42\times10^{-3}\,\mathrm{m} = 8.42\,\mathrm{mm}.
$$

在 $1.00\,\mathrm{GHz}$ 下，$\delta$ 按 $\omega^{-1/2}$ 变化，所以它缩小 $\sqrt{10^9/60} = 4083$ 倍：

$$
\delta = \frac{8.42\,\mathrm{mm}}{4083} = 2.06\times10^{-6}\,\mathrm{m} = 2.06\,\mu\mathrm{m}.
$$

市电频率下，比大约一厘米更粗的导体就是在浪费铜：电流挤在最外层，这就是大型母线做成空心或扁平、架空线内嵌钢芯的原因。微波频率下电流在几微米厚的层里流动，所以这样厚度的镀银或镀金和实心金属一样好，而且一面 $10\,\mu\mathrm{m}$ 的箔屏蔽层——还没把反射算进去——就按 $e^{-10/2.06}\approx1/130$ 衰减 $1\,\mathrm{GHz}$ 场的振幅。
:::
:::

趋肤深度还决定了良导体的损耗。厚导体中的电流表现得像在厚度为 $\delta$ 的一层内均匀分布，所以**表面电阻**为每方 $R_s = 1/(\sigma\delta)$，铜在 $1\,\mathrm{GHz}$ 下是 $8.1\,\mathrm{m\Omega}$。又因为 $\lvert\tilde k\rvert$ 巨大，有效折射率 $\tilde n = c\tilde k/\omega$ 巨大，[[#eq-normal]] 取 $n_2\to\tilde n$ 给出接近 $1$ 的反射率：$R\approx1 - 2\sqrt{2\omega\varepsilon_0/\sigma}$（哈根–鲁本斯（Hagen–Rubens）结果），铜在 $1\,\mathrm{GHz}$ 下是 $0.99991$。良导体之所以是好的镜子，正因为它们是良导体。

::: example 一面微波镜 {#ex-mirror}
一列 $1.00\,\mathrm{GHz}$ 的平面波垂直入射到一块厚铜板上。求入射功率中被吸收的份额，以及紧靠金属内侧处磁能与电场能量密度之比。
::: solution
铜的有效复折射率是 $\tilde n = \sqrt{1 + i\sigma/(\omega\varepsilon_0)}\approx\sqrt{i\sigma/\omega\varepsilon_0} = (1+i)\sqrt{\sigma/2\omega\varepsilon_0}$，其中 $\sigma/(\omega\varepsilon_0) = 1.07\times10^{9}$，所以 $\lvert\tilde n\rvert = 3.27\times10^{4}$。取 $\tilde n = (1+i)\eta$ 且 $\eta\gg1$，[[#eq-normal]] 给出

$$
1 - R = 1 - \left\lvert\frac{1 - \tilde n}{1 + \tilde n}\right\rvert^2 = \frac{4\eta}{(1+\eta)^2 + \eta^2}\approx\frac{2}{\eta} = 2\sqrt{\frac{2\omega\varepsilon_0}{\sigma}} = 8.64\times10^{-5}.
$$

吸收不到万分之一。内部由 [[#thm-skin]]，$\lvert B\rvert/\lvert E\rvert = \sqrt{\mu_0\sigma/\omega}$，所以能量密度之比为

$$
\frac{B^2/2\mu_0}{\varepsilon_0E^2/2} = \frac{\sigma}{\omega\varepsilon_0} = 1.07\times10^{9}.
$$

良导体内部的场几乎纯磁，而那个很小的电场正是驱动电流 $\sigma\mathbf E$、耗散掉吸收功率的东西。这就是波导的损耗要由壁上切向 $\mathbf H$ 与表面电阻 $R_s$ 来计算的原因。
:::
:::

::: quiz
频率从 $50\,\mathrm{Hz}$ 升到 $5\,\mathrm{kHz}$ 时，某种给定金属的趋肤深度变化多少倍？
- [ ] 增大十倍。
- [x] 减小十倍。
- [ ] 减小一百倍。
- [ ] 不变；$\delta$ 只依赖金属本身。
::: solution
由 [[#eq-skin]]，$\delta\propto\omega^{-1/2}$。频率增大一百倍使 $\delta$ 缩小 $\sqrt{100} = 10$ 倍。对铜，$50\,\mathrm{Hz}$ 下的 $9.2\,\mathrm{mm}$ 在 $5\,\mathrm{kHz}$ 下变成 $0.92\,\mathrm{mm}$。
:::
:::

## 等离子体与等离子体频率 {#plasma}

自由电子气——比如电离层，或高频下金属的导电电子——是与欧姆导体相反的极限：电子被场自由加速，没有碰撞。对处在 $\tilde{\mathbf E}e^{-i\omega t}$ 中的一个电子，$m_e\dot{\mathbf v} = -e\tilde{\mathbf E}e^{-i\omega t}$ 给出 $\mathbf v = \frac{e}{i\omega m_e}\tilde{\mathbf E}e^{-i\omega t}$，单位体积有 $n_e$ 个电子时，电流密度为 $\mathbf J = -n_ee\mathbf v = \frac{in_ee^2}{\omega m_e}\mathbf E$。这是一条具有虚数电导率 $\tilde\sigma = in_ee^2/(m_e\omega)$ 的欧姆定律：电流与场相位差 $90^\circ$，平均不吸收能量。代入 $\tilde k^2 = \mu_0\varepsilon_0\omega^2 + i\mu_0\tilde\sigma\omega$，

$$
\tilde k^2 = \frac{\omega^2}{c^2} - \mu_0\frac{n_ee^2}{m_e} = \frac{\omega^2 - \omega_p^2}{c^2}.
$$ {#eq-plasma-dispersion}

::: definition 等离子体频率 {#def-plasma}
单位体积含 $n_e$ 个自由电子的气体，其**等离子体频率**为

$$
\omega_p = \sqrt{\frac{n_ee^2}{\varepsilon_0m_e}}, \qquad f_p = \frac{\omega_p}{2\pi}\approx8.98\sqrt{n_e/\mathrm{m^{-3}}}\ \mathrm{Hz}.
$$ {#eq-plasma}
:::

$\omega_p$ 之上，$k$ 是实数，波以折射率 $n = \sqrt{1 - \omega_p^2/\omega^2} < 1$ 传播。$\omega_p$ 之下，$k$ 是虚数，波是倏逝的，衰减长度为 $c/\sqrt{\omega_p^2 - \omega^2}$，从外面入射的波被全反射。等价地说，等离子体的 $\varepsilon_r(\omega) = 1 - \omega_p^2/\omega^2$，在 $\omega_p$ 以下为负。

::: example 作为镜子的电离层 {#ex-ionosphere}
白天电离层 F 层的峰值电子密度约 $1.0\times10^{12}\,\mathrm{m^{-3}}$。求垂直入射时能被反射的最高频率。再以 $n_e = 8.49\times10^{28}\,\mathrm{m^{-3}}$ 估算铜的等离子体波长。
::: solution
由 [[#eq-plasma]]，

$$
f_p = \frac{1}{2\pi}\sqrt{\frac{(1.0\times10^{12})(1.602\times10^{-19})^2}{(8.854\times10^{-12})(9.109\times10^{-31})}} = \frac{5.64\times10^{7}}{2\pi}\,\mathrm{Hz} = 8.98\,\mathrm{MHz}.
$$

竖直向上发射的、低于约 $9\,\mathrm{MHz}$ 的信号被反射。斜入射时条件加在波向量的竖直分量上，频率直到 $f_p/\cos\theta$ 都能被反射，这就是 $3$–$30\,\mathrm{MHz}$ 波段的短波广播能传到地平线以外的原因；夜间电子密度下降，可用频率随之下降。调频广播（$100\,\mathrm{MHz}$）与卫星链路（GHz）穿透而过。

对铜，$\omega_p = \sqrt{(8.49\times10^{28})(1.602\times10^{-19})^2/((8.854\times10^{-12})(9.109\times10^{-31}))} = 1.64\times10^{16}\,\mathrm{s^{-1}}$，对应的真空波长是 $2\pi c/\omega_p = 115\,\mathrm{nm}$，在紫外。金属反射可见光——可见光位于 $\omega_p$ 之下——并在远紫外变得透明。这一效应由 R. W. 伍德（R. W. Wood）在 1933 年对碱金属观察到；对钠，自由电子理论的预言 $205\,\mathrm{nm}$ 与实测的靠近 $210\,\mathrm{nm}$ 的吸收边相当接近。铜的颜色则来自束缚 d 电子吸收蓝光，这是自由电子模型略去不谈的细节。
:::
:::

在透明区，**相速度** $\omega/k = c/\sqrt{1 - \omega_p^2/\omega^2}$ 超过 $c$，而**群速度** $\dd\omega/\dd k = c^2k/\omega = c\sqrt{1 - \omega_p^2/\omega^2}$ 小于 $c$；两者之积是 $c^2$。信号与能量以群速度行进。脉冲星天文学家利用群时延穿过星际等离子体时对频率的依赖，测量朝每颗脉冲星方向的电子柱密度。

### 束缚电子与色散 {#dispersion}

同样的论证加上恢复力，给出绝缘体中 $\varepsilon$ 对频率的依赖，正是本章开头那条警告中点明的效应。把每个束缚电子建模为固有频率 $\omega_0$、阻尼率 $\gamma$、被波驱动的阻尼谐振子（如 [[oscillations]]）：

$$
m_e\left(\ddot x + \gamma\dot x + \omega_0^2x\right) = -eE_0e^{-i\omega t} \quad\Longrightarrow\quad \tilde x = -\frac{e}{m_e}\frac{E_0e^{-i\omega t}}{\omega_0^2 - \omega^2 - i\gamma\omega}.
$$

偶极矩 $-e\tilde x$ 乘上这类电子的数密度 $N$ 就是电极化强度，于是对稀薄介质

$$
\tilde\varepsilon_r(\omega) = 1 + \frac{Ne^2}{\varepsilon_0m_e}\,\frac{1}{\omega_0^2 - \omega^2 - i\gamma\omega} .
$$ {#eq-lorentz-model}

真实材料有好几个共振，每一项以一个"振子强度"加权，[[#eq-lorentz-model]] 变成一个求和。取 $\omega_0 = 0$、$\gamma = 0$ 就回到等离子体，$\varepsilon_r = 1 - \omega_p^2/\omega^2$。远在共振之下，$\varepsilon_r - 1\approx\omega_p^2/(\omega_0^2 - \omega^2)$ 为实、为正、随 $\omega$ 增大：**正常色散**——三棱镜把蓝光比红光折得更厉害，就是这个缘故，因为玻璃的电子共振在紫外。在共振附近，$\tilde\varepsilon_r$ 的虚部、以及复折射率 $\tilde n = n + i\kappa = \sqrt{\tilde\varepsilon_r}$ 的虚部 $\kappa$ 随之变大：波 $e^{i(\tilde n\omega z/c - \omega t)}$ 衰减，强度的吸收系数为 $2\kappa\omega/c$，并且那里 $n$ 随频率下降（**反常色散**）。

::: widget plot
f: 1 + a*(1 - x^2)/((1 - x^2)^2 + (g*x)^2); a*g*x/((1 - x^2)^2 + (g*x)^2)
x: 0, 2
y: -2, 4
sliders: a=0.5:0.1:1:0.05; g=0.2:0.05:1:0.01
labels: Re ε_r; Im ε_r
caption: 单共振模型 [[#eq-lorentz-model]] 对 $\omega/\omega_0$ 的曲线，强度 $a = \omega_p^2/\omega_0^2$、阻尼 $g = \gamma/\omega_0$。共振之下，$\mathrm{Re}\,\varepsilon_r$ 随频率缓慢上升：正常色散，可见光处的玻璃正处在这一段。穿过共振它大幅下落，吸收 $\mathrm{Im}\,\varepsilon_r$ 出现峰值，宽度约为 $g$。减小 $g$：吸收线变窄变高，$\mathrm{Re}\,\varepsilon_r$ 在略高于 $\omega_0$ 处跌到零以下，这一段介质像等离子体一样反光。远在高频一侧，$\mathrm{Re}\,\varepsilon_r\to1$ 从小于 $1$ 的方向趋于 $1$，这就是 X 射线的折射率略小于 $1$ 的原因。
:::

## 波导 {#waveguides}

在导体壁之间，波不能是均匀平面波；它们在壁之间来回反弹，只有某些横向图案——**模**——能够容纳。把壁当作完全导体，所以其表面 $\mathbf E^\parallel = \mathbf 0$、$B^\perp = 0$，再取一根中空的矩形管，沿 $x$、$y$ 的内尺寸为 $a > b$，波沿 $z$ 行进。

::: proposition 矩形波导的 TE 模 {#prop-te}
场 $\propto e^{i(kz - \omega t)}$ 且 $E_z = 0$（**横电**，TE）在波导中存在，只要

$$
B_z = B_0\cos\frac{m\pi x}{a}\cos\frac{n\pi y}{b}, \qquad k^2 = \frac{\omega^2}{c^2} - \pi^2\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right),
$$

其中整数 $m, n\ge0$，不同时为零。$\mathrm{TE}_{mn}$ 模只在它的**截止频率**之上传播

$$
\omega_{mn} = c\pi\sqrt{\frac{m^2}{a^2} + \frac{n^2}{b^2}} .
$$ {#eq-cutoff}

最低的是 $\mathrm{TE}_{10}$，$f_{10} = c/(2a)$，且 $\mathbf E = E_0\sin(\pi x/a)e^{i(kz - \omega t)}\hat{\mathbf y}$。
:::

::: proof
我们完整验证 $\mathrm{TE}_{10}$ 模；一般情形就是把同样的分离变量法用在 $B_z$ 上。试 $\mathbf E = E_y(x)e^{i(kz - \omega t)}\hat{\mathbf y}$。它的散度为零，因为 $E_y$ 不依赖 $y$。真空波动方程 $\nabla^2\mathbf E = c^{-2}\partial_t^2\mathbf E$ 给出

$$
E_y'' + \left(\frac{\omega^2}{c^2} - k^2\right)E_y = 0 .
$$

壁 $x = 0$ 与 $x = a$ 平行于 $\mathbf E$，所以 $E_y$ 在那里是切向的、必须为零：$E_y = E_0\sin(m\pi x/a)$，且 $\omega^2/c^2 - k^2 = (m\pi/a)^2$。在壁 $y = 0, b$ 上，$\mathbf E$ 是法向的，这是允许的（面电荷把它终止）。由法拉第定律 $\tilde{\mathbf B} = \frac{1}{i\omega}\nabla\times\tilde{\mathbf E}$ 得到的磁场是

$$
B_x = -\frac{k}{\omega}E_0\sin\frac{m\pi x}{a}\,e^{i(kz-\omega t)}, \qquad B_z = \frac{m\pi}{i\omega a}E_0\cos\frac{m\pi x}{a}\,e^{i(kz-\omega t)},
$$

它在 $x = 0, a$ 处 $B_x = 0$，且没有 $B_y$，所以 $\mathbf B$ 的法向分量在四条壁上都为零。其 $z$ 分量具有所述的 $\cos(m\pi x/a)$ 形式，取 $n = 0$。若 $\omega < cm\pi/a$，$k$ 为虚数，场沿波导衰减。
:::

物理图像：$\mathrm{TE}_{10}$ 模是两列在两侧壁之间来回折行的平面波，与轴线成角 $\theta$，$\cos\theta = ck/\omega$。在截止处它们垂直于轴线直着反弹，沿轴向毫无进展。截止以下波导是不透明的；截止以上，波以群速度 $v_g = c\sqrt{1 - \omega_c^2/\omega^2}$ 沿波导行进。空心波导不能传输 **TEM** 模（$E_z = 0$ 且 $B_z = 0$）：那样的场在横截面内将是一个静态的调和场，四周的壁构成单个等势体，而由 [[electrodynamics/electrostatics#thm-unique]]，那个场为零。同轴电缆有两根分离的导体，确实在所有频率都能传输 TEM 模。

除 TE 模外还有**横磁**（TM）模，$B_z = 0$，$E_z\propto\sin(m\pi x/a)\sin(n\pi y/b)$，要求 $m$ 与 $n$ 都非零；最低的 $\mathrm{TM}_{11}$ 与 $\mathrm{TE}_{11}$ 截止相同，WR-90 为 $16.1\,\mathrm{GHz}$。

::: widget plot
f: sqrt(1 + x^2); x; x/sqrt(1 + x^2)
x: 0, 3
y: 0, 3.2
labels: 波导模的 ω/ω_c; 光锥线 ω = ck; v_g/c
caption: 波导模的色散关系 $\omega = \sqrt{\omega_c^2 + c^2k^2}$，与把 $\omega_p$ 换成 $\omega_c$ 的等离子体相同，单位取 $\omega_c = 1$、$c = 1$（横轴 $ck/\omega_c$）。$k = 0$ 时模停在截止频率上，群速度（斜率，即第三条曲线）为零。$k$ 增大时曲线从上方逼近光锥线，所以相速度 $\omega/k$ 始终在 $c$ 之上，而群速度缓慢爬向 $c$。从图上读出 $10\,\mathrm{GHz}$ 的 WR-90 波导：$\omega/\omega_c = 1.525$ 对应 $ck/\omega_c = 1.15$，那里 $v_g = 0.755c$。
:::

::: example WR-90 波导 {#ex-wr90}
标准 X 波段波导 WR-90 的内尺寸为 $a = 22.86\,\mathrm{mm}$、$b = 10.16\,\mathrm{mm}$。求 $\mathrm{TE}_{10}$、$\mathrm{TE}_{20}$、$\mathrm{TE}_{01}$ 的截止频率，并求 $10.0\,\mathrm{GHz}$ 下 $\mathrm{TE}_{10}$ 的波导波长与群速度。
::: solution
由 [[#eq-cutoff]]，$f_{mn} = \frac c2\sqrt{m^2/a^2 + n^2/b^2}$：

$$
f_{10} = \frac{2.998\times10^{8}}{2(0.02286)} = 6.557\,\mathrm{GHz}, \qquad f_{20} = 13.11\,\mathrm{GHz}, \qquad f_{01} = \frac{2.998\times10^{8}}{2(0.01016)} = 14.75\,\mathrm{GHz}.
$$

在 $6.56$ 到 $13.1\,\mathrm{GHz}$ 之间只有 $\mathrm{TE}_{10}$ 传播，这就是波导用于 $8.2$–$12.4\,\mathrm{GHz}$ 的原因：离 $f_{10}$ 足够远，使群速度与损耗合理，又稳妥地低于 $f_{20}$。比值 $a\approx2b$ 是为使这段单模范围最大而选的。在 $10.0\,\mathrm{GHz}$ 下自由空间波长为 $\lambda_0 = 29.98\,\mathrm{mm}$，且 $\sqrt{1 - (f_{10}/f)^2} = \sqrt{1 - 0.4300} = 0.7550$。波导波长为

$$
\lambda_g = \frac{2\pi}{k} = \frac{\lambda_0}{\sqrt{1 - (f_{10}/f)^2}} = \frac{29.98}{0.7550} = 39.7\,\mathrm{mm},
$$

比自由空间中更长，群速度为 $0.755c = 2.26\times10^{8}\,\mathrm{m/s}$。整个波段内群速度从 $8.2\,\mathrm{GHz}$ 的 $0.60c$ 变到 $12.4\,\mathrm{GHz}$ 的 $0.85c$。
:::
:::

::: history 从菲涅耳到电离层
奥古斯丁–让·菲涅耳（Augustin-Jean Fresnel）1823 年从以太的弹性固体模型导出了反射公式，那时距光是电磁波这一点被认识到还有很久；麦克斯韦理论从边界条件重得到了它们。艾蒂安–路易·马吕斯（Étienne-Louis Malus）1808 年发现了反射偏振，戴维·布儒斯特（David Brewster）1815 年找到了偏振角定律。趋肤效应在 1880 年代由霍拉斯·兰姆（Horace Lamb，1883，球状导体）、奥利弗·赫维赛德（Oliver Heaviside，1885–86）与瑞利勋爵（Lord Rayleigh，1886）算出。1897 年瑞利分析了空心导电管中的波并发现了截止，但实用波导要等到贝尔实验室的乔治·萨思沃斯（George Southworth）与麻省理工学院的威尔默·巴罗（Wilmer Barrow），两人在 1936 年各自独立地演示了它。阿瑟·肯内利（Arthur Kennelly）与奥利弗·赫维赛德在 1902 年各自独立地提出高层大气导电，以解释马可尼 1901 年的跨大西洋信号；爱德华·阿普尔顿（Edward Appleton）与迈尔斯·巴尼特（Miles Barnett）1924 年证明了对它的反射，格雷戈里·布莱特（Gregory Breit）与默尔·图韦（Merle Tuve）1925 年用脉冲测出了它的高度。阿普尔顿获 1947 年诺贝尔奖。莱维·通克斯（Lewi Tonks）与欧文·朗缪尔（Irving Langmuir）1929 年描述了等离子体振荡。
:::

## 后续内容 {#leads}

这里导出的反射与折射是几何光学、薄膜干涉与偏振的基础，见 [[optics]]。真实介质的介电常数是频率的函数；把束缚电子建模为被波驱动的阻尼振子（如 [[oscillations]]），会得到一个朝每条吸收线上升的折射率和一个吸收共振；同一个模型用到单个分子上，就给出 [[electrodynamics/radiation]] 中计算的光的散射。自由电子等离子体在 [[condensed-matter]] 的金属光学性质中重现，而由边界条件决定的波导分立模，是 [[quantum-1]] 中方势阱粒子的量子化状态在电磁学中的表亲。

::: summary
- 线性介质中波以 $v = 1/\sqrt{\mu\varepsilon} = c/n$ 行进，其中 $n = \sqrt{\varepsilon_r\mu_r}$ 须在波的频率处取值。
- 边界上 $\mathbf E$ 与 $\mathbf H$ 切向连续，在垂直入射时给出 $E_R/E_I = (n_1 - n_2)/(n_1 + n_2)$ 与 $R = ((n_1 - n_2)/(n_1 + n_2))^2$，玻璃为 $4\%$。
- 沿界面的相位匹配对任何偏振都给出反射定律与斯涅尔定律；菲涅耳公式分别给出 s 与 p 的振幅，且 $R + T = 1$。
- p-偏振光在布儒斯特角 $\tan\theta_B = n_2/n_1$ 不被反射；超过临界角后反射是全的，透射场是倏逝的。
- 良导体中 $\tilde k = (1+i)/\delta$，趋肤深度 $\delta = \sqrt{2/\mu\sigma\omega}$：铜在 $60\,\mathrm{Hz}$ 下 $8.4\,\mathrm{mm}$，在 $1\,\mathrm{GHz}$ 下 $2.1\,\mu\mathrm{m}$。
- 自由电子等离子体有 $\omega^2 = \omega_p^2 + c^2k^2$，$\omega_p^2 = n_ee^2/\varepsilon_0m_e$；在 $\omega_p$ 以下反射，电离层约为 $9\,\mathrm{MHz}$。
- 空心矩形波导在截止以上传输 TE 与 TM 模，最低的是 $\mathrm{TE}_{10}$，$f_c = c/2a$，WR-90 为 $6.56\,\mathrm{GHz}$；它不能传输 TEM 模。
:::

## 习题 {#exercises}

::: exercise 一块玻璃窗 {level=1 check="0.9216"}
光垂直入射到空气中一块玻璃板（$n = 1.50$）。忽略多次反射与吸收，入射强度有多大份额透过两个表面？
::: solution
每个表面反射 $R = (0.50/2.50)^2 = 0.0400$、透射 $0.9600$，由 [[#eq-RT-normal]] 的对称性，从两侧看都一样。透过两个面，$(0.9600)^2 = 0.9216$。把两个面之间的多次反射计入（非相干地）会略微提高到 $2n/(n^2+1) = 0.9231$。
:::
:::

::: exercise 水的布儒斯特角 {level=1 check="53.1"}
求光从平静的湖面（$n = 1.33$）反射时的布儒斯特角，以度计，并求相应的折射角。
::: solution
由 [[#eq-brewster]]，$\theta_B = \arctan1.33 = 53.1^\circ$。由 [[#cor-brewster]]，折射光线与法线成 $90^\circ - 53.1^\circ = 36.9^\circ$；用斯涅尔定律核对：$\sin53.1^\circ/1.33 = 0.600 = \sin36.9^\circ$。
:::
:::

::: exercise 钻石的火花 {level=1 check="24.4"}
求钻石（$n = 2.42$）内部的光碰到钻石–空气表面时的临界角，以度计，并与玻璃比较。
::: solution
$\theta_c = \arcsin(1/2.42) = 24.4^\circ$，而 $n = 1.50$ 的玻璃是 $41.8^\circ$。经过切割的钻石的刻面角度经过设计，使从顶部射入的大部分光在到达下面刻面时超过 $24.4^\circ$，被全反射回去；钻石的强色散随后把颜色分开，这就是石头的"火彩"。
:::
:::

::: exercise 铝的趋肤深度 {level=1 check="11.6"}
铝的 $\sigma = 3.77\times10^{7}\,\mathrm{S/m}$。求它在 $50.0\,\mathrm{Hz}$ 下的趋肤深度，以 mm 计。
::: solution
$\delta = \sqrt{2/(\mu_0\sigma\omega)} = \sqrt{2/((4\pi\times10^{-7})(3.77\times10^{7})(2\pi\times50.0))} = \sqrt{2/(1.488\times10^{4})} = 1.16\times10^{-2}\,\mathrm{m} = 11.6\,\mathrm{mm}$。半径超过约 $1\,\mathrm{cm}$ 的铝架空线，中心处多加的金属几乎没有用处，那里正是放钢芯承力件的地方。
:::
:::

::: exercise 与潜艇通话 {level=2 check="2.52"}
海水的 $\sigma = 4.0\,\mathrm{S/m}$、$\varepsilon_r = 81$。验证它在 $10.0\,\mathrm{kHz}$ 是良导体，并以米计求趋肤深度。若信号振幅至多允许衰减 $e^{5}\approx150$ 倍，潜艇可以在多深？
::: solution
比值 $\sigma/(\omega\varepsilon) = 4.0/(2\pi\times10^{4}\times81\times8.854\times10^{-12}) = 8.9\times10^{4}$，所以良导体公式适用。于是

$$
\delta = \sqrt{\frac{2}{(4\pi\times10^{-7})(4.0)(2\pi\times1.00\times10^{4})}} = 2.52\,\mathrm{m}.
$$

五个趋肤深度是 $12.6\,\mathrm{m}$。$3$–$30\,\mathrm{kHz}$、天线长达数公里的甚低频发射机可以到达贴近水面的潜艇；要达到更大深度需要几十赫兹的极低频，那时 $\delta$ 有几十米。
:::
:::

::: exercise 反射 15 MHz 的信号 {level=2 check="2.79"}
电离层要反射 $15.0\,\mathrm{MHz}$ 的垂直入射信号，需要多大的电子密度？以 $10^{12}\,\mathrm{m^{-3}}$ 为单位。
::: solution
反射要求 $\omega\le\omega_p$，所以 $n_e\ge\varepsilon_0m_e\omega^2/e^2 = (8.854\times10^{-12})(9.109\times10^{-31})(2\pi\times1.50\times10^{7})^2/(1.602\times10^{-19})^2 = 2.79\times10^{12}\,\mathrm{m^{-3}}$。这高于典型 F 层的峰值，所以 $15\,\mathrm{MHz}$ 的信号垂直入射时会穿透，只有斜入射才被反射。
:::
:::

::: exercise 脉冲星的色散 {level=2 check="0.972"}
在 $\omega\gg\omega_p$ 的稀薄等离子体中，证明频率为 $f$ 的一个脉冲穿过长度 $L$ 的路径后，比在真空中晚到 $\Delta t = \frac{e^2}{8\pi^2\varepsilon_0m_ec}\frac{\mathrm{DM}}{f^2}$，其中 $\mathrm{DM} = \int n_e\,\dd l$ 是电子的柱密度。对 $\mathrm{DM} = 50.0\,\mathrm{pc\,cm^{-3}}$（$1\,\mathrm{pc} = 3.086\times10^{16}\,\mathrm{m}$）的脉冲星，求 $400\,\mathrm{MHz}$ 与 $800\,\mathrm{MHz}$ 到达时间之差，以秒计。
::: solution
脉冲以群速度 $v_g = c\sqrt{1 - \omega_p^2/\omega^2}\approx c\bigl(1 - \omega_p^2/2\omega^2\bigr)$ 行进，所以 $1/v_g\approx(1/c)(1 + \omega_p^2/2\omega^2)$，额外的时延为

$$
\Delta t = \int\frac{\omega_p^2}{2c\omega^2}\,\dd l = \frac{e^2}{2c\varepsilon_0m_e\omega^2}\int n_e\,\dd l = \frac{e^2}{8\pi^2\varepsilon_0m_ec}\frac{\mathrm{DM}}{f^2}.
$$

SI 制下常数为 $e^2/(8\pi^2\varepsilon_0m_ec) = 1.345\times10^{-7}\,\mathrm{m^2/s}$。由 $\mathrm{DM} = 50.0\times3.086\times10^{22}\,\mathrm{m^{-2}} = 1.543\times10^{24}\,\mathrm{m^{-2}}$，

$$
\Delta t_{400} - \Delta t_{800} = (1.345\times10^{-7})(1.543\times10^{24})\left[\frac{1}{(4.00\times10^{8})^2} - \frac{1}{(8.00\times10^{8})^2}\right] = 0.972\,\mathrm{s}.
$$

射电天文学家测量这种在整个波段上的时延扫变并反解出 DM，再结合银河系电子密度的模型得到脉冲星的距离。
:::
:::

::: exercise 波导波长 {level=2 check="39.7"}
对 WR-90（$a = 22.86\,\mathrm{mm}$）的 $\mathrm{TE}_{10}$ 模，求 $10.0\,\mathrm{GHz}$ 下的波导波长，以 mm 计，再求波导波长等于自由空间波长两倍时的频率。
::: solution
由 [[#ex-wr90]]，$\lambda_g = 39.7\,\mathrm{mm}$。比值 $\lambda_g/\lambda_0 = [1 - (f_c/f)^2]^{-1/2}$ 在 $(f_c/f)^2 = 3/4$ 时等于 $2$，所以 $f = 2f_c/\sqrt3 = 2(6.557)/1.732 = 7.57\,\mathrm{GHz}$。
:::
:::

::: exercise 菲涅耳公式中的能量守恒 {level=3}
用 [[#eq-fresnel-p]] 与 [[#thm-fresnel]] 中的定义证明 p-偏振的 $R_p + T_p = 1$。然后证明在布儒斯特角处 $t_p = n_1/n_2$。
::: solution
记 $a = n_2\cos\theta_I$、$b = n_1\cos\theta_T$，于是 $r_p = (a - b)/(a + b)$，$t_p = 2n_1\cos\theta_I/(a + b)$。则

$$
T_p = \frac{n_2\cos\theta_T}{n_1\cos\theta_I}\,\frac{4n_1^2\cos^2\theta_I}{(a+b)^2} = \frac{4(n_2\cos\theta_I)(n_1\cos\theta_T)}{(a+b)^2} = \frac{4ab}{(a+b)^2},
$$

且 $R_p + T_p = \frac{(a-b)^2 + 4ab}{(a+b)^2} = 1$。布儒斯特角处 $a = b$，所以 $t_p = 2n_1\cos\theta_I/(2n_2\cos\theta_I) = n_1/n_2$。一致性检验：$T_p = \frac{n_2\cos\theta_T}{n_1\cos\theta_I}\frac{n_1^2}{n_2^2}$，而那里 $n_2\cos\theta_I = n_1\cos\theta_T$，故 $\cos\theta_T/\cos\theta_I = n_2/n_1$，$T_p = \frac{n_2}{n_1}\cdot\frac{n_2}{n_1}\cdot\frac{n_1^2}{n_2^2} = 1$，什么都没被反射时本来就该如此。
:::
:::

::: exercise 倏逝波 {level=3 check="285"}
真空波长 $633\,\mathrm{nm}$ 的光在玻璃（$n = 1.50$）内部以 $45.0^\circ$ 入射角在玻璃–空气表面上发生全反射。求空气中倏逝场按 $1/e$ 的衰减长度，以 nm 计，并由 [[#eq-fresnel-s]] 证明 $\lvert r_s\rvert = 1$。
::: hint
超过临界角后，写 $n_2\cos\theta_T = \sqrt{n_2^2 - n_1^2\sin^2\theta_I} = i\sqrt{n_1^2\sin^2\theta_I - n_2^2}$。
:::
::: solution
这里 $n_1\sin\theta_I = 1.50\times0.7071 = 1.0607 > 1$，所以入射角超过临界角。衰减常数为

$$
\kappa = \frac{2\pi}{\lambda_0}\sqrt{n_1^2\sin^2\theta_I - 1} = \frac{2\pi}{633\times10^{-9}}\sqrt{1.1250 - 1} = (9.926\times10^{6})(0.3536) = 3.51\times10^{6}\,\mathrm{m^{-1}},
$$

所以 $1/\kappa = 285\,\mathrm{nm}$，不到半个波长。对反射系数，$n_2\cos\theta_T = i\beta$，$\beta = 0.3536$ 为实数，于是

$$
r_s = \frac{n_1\cos\theta_I - i\beta}{n_1\cos\theta_I + i\beta}.
$$

分子是分母的复共轭，所以 $\lvert r_s\rvert = 1$：反射是全的，带有相移 $-2\arctan(\beta/n_1\cos\theta_I) = -2\arctan(0.3333) = -36.9^\circ$。进入空气的平均坡印廷矢量为零，因为那里 $\mathbf E$ 与 $\mathbf B_x$ 相位差 $90^\circ$。把第二块玻璃的表面移到几百纳米之内，它就会收集倏逝场的一部分而透射出光来。
:::
:::
