二维风洞中的翼型剖面是一种理想化：它从洞壁一直延伸到另一侧洞壁，因此空气除了从其上下流过之外无处可去。真实的机翼是有尽头的。在翼尖处，机翼下方的高压空气绕过翼尖溢入上方的低压区，气流卷起成为一对**尾涡**，在飞机后方延伸数千米。这些涡在整个机翼上诱导出向下的速度——**下洗**——它使当地气流和升力矢量向后倾斜。升力的向后分量是一种在二维中没有对应物的阻力：**诱导阻力**，即用有限翼展机翼产生升力所付出的代价。它通常占客机巡航阻力的四分之一到五分之二，在起飞和爬升时则占阻力的大部分；这就是滑翔机和远程飞机都有细长机翼的原因。

本章用普朗特的**升力线理论**对这一切进行定量分析。你需要用到[[aerodynamics/potential-flow]]中涡的概念和库塔-茹科夫斯基定理，以及[[aerodynamics/thin-airfoil-theory]]中的剖面升力线$c_l = a_0(\alpha - \alpha_{L=0})$；那里证明的格劳特积分会再次用到。记号：展长$b$，机翼面积$S$，展弦比$AR = b^2/S$，当地弦长$c(y)$，其中$y$是从对称面量起的展向坐标，机翼系数$C_L$、$C_{D,i}$，剖面系数$c_l$。

## 有限翼展机翼的涡系

理想流体中涡的三个事实（由亥姆霍兹（Helmholtz）提出）决定了涡系的结构。一根涡丝沿其全长强度（环量）相同；它不能在流体中终止，而必须自行闭合、延伸到无穷远或终止于边界上；并且它随流体一起运动。机翼带有附着环量$\Gamma(y)$，它在翼尖处必须降为零（翼尖两侧没有压强差）。凡是$\Gamma$沿展向变化之处，承载它的涡丝都不能就此终止：每一个变化$d\Gamma$都转向下游，成为强度为$-\left(d\Gamma/dy\right)dy$的**尾涡**。机翼在其后方留下一个**涡面**，在$\Gamma$下降最快的翼尖附近最强，它在几个展长的距离内卷起成为两个集中的翼尖涡。具有这种结构的最简单模型是**马蹄涡**：沿展向的一个强度为常数$\Gamma$的附着涡，在翼尖处转为两个强度为$\Gamma$的尾涡——并在远后方由留在跑道上的起动涡封闭。

任意形状的涡丝所诱导的速度，由一个与磁学中毕奥-萨伐尔（Biot–Savart）定律形式相同的公式给出。

::: proposition 毕奥-萨伐尔定律与半无限涡丝 {#prop-biot-savart}
强度为$\Gamma$的涡丝的每个微元$d\mathbf{l}$在点$P$处诱导的速度为
$$
d\mathbf{V} = \frac{\Gamma}{4\pi}\,\frac{d\mathbf{l}\times\mathbf{r}}{|\mathbf{r}|^3}
$$
其中$\mathbf{r}$是从微元指向$P$的矢量。对于直涡丝，垂直距离为$h$的点上的速度大小为
$$
V = \frac{\Gamma}{4\pi h}\left(\cos\beta_1 - \cos\beta_2\right),
$$ {#eq-straight-filament}
其中$\beta_1$、$\beta_2$是涡丝方向与从其两端到$P$的连线之间的夹角。无限长涡丝给出$\Gamma/(2\pi h)$，即二维点涡；对于与其端点平齐的点，**半无限**涡丝给出其一半，即$\Gamma/(4\pi h)$。
:::

::: proof
对于沿一条直线的直涡丝，把从$P$所作垂线的垂足取为原点，涡丝沿$s$方向，于是位于$s$处的微元到$P$的距离为$r = \sqrt{s^2 + h^2}$，且$|d\mathbf{l}\times\mathbf{r}| = h\,ds$；每个微元的贡献都指向同一方向（垂直于涡丝和$P$所在的平面）。于是$V = \frac{\Gamma}{4\pi}\int\frac{h\,ds}{(s^2 + h^2)^{3/2}}$。令$s = -h\cot\beta$，$ds = h\csc^2\beta\,d\beta$，$s^2 + h^2 = h^2\csc^2\beta$，被积式成为$\sin\beta\,d\beta/h$，所以$V = \frac{\Gamma}{4\pi h}\int_{\beta_1}^{\beta_2}\sin\beta\,d\beta = \frac{\Gamma}{4\pi h}(\cos\beta_1 - \cos\beta_2)$。无限长直线有$\beta_1 = 0$，$\beta_2 = \pi$，给出$\Gamma/(2\pi h)$，这与二维涡一致，并确定了毕奥-萨伐尔定律中的常数$1/4\pi$。从与$P$平齐处开始的半无限涡丝有$\beta_1 = \pi/2$，$\beta_2 = \pi$：$\Gamma/(4\pi h)$。假设：不可压缩、无黏流动；涡的诱导速度是其涡量的运动学结果，正如磁场是电流的结果一样。
:::

## 普朗特升力线理论

用沿展向的一条**升力线**（四分之一弦点的轨迹，薄翼理论把每个剖面的升力置于该处）来模拟机翼，它带有沿展向变化的附着环量$\Gamma(y)$，其后方是一个平直的尾涡面。假设每个剖面的行为都像二维翼型——但处在被下洗倾斜了的气流中。

::: definition 下洗、诱导迎角与有效迎角 {#def-downwash}
**下洗**$w(y)$是尾涡面在升力线上诱导的向下速度。**诱导迎角**为$\alpha_i = w/V_\infty$（小角度）。剖面的**有效迎角**是其弦线与**当地**相对气流之间的夹角，
$$
\alpha_\text{eff} = \alpha - \alpha_i ,
$$
其中$\alpha$是弦线与自由来流之间的几何迎角（包括任何扭转）。剖面的升力垂直于当地相对气流，向后倾斜了$\alpha_i$；它沿$V_\infty$方向的分量就是**诱导阻力**。
:::

::: theorem 普朗特升力线方程 {#thm-lifting-line}
对于定常、不可压缩流动中的大展弦比平直机翼，其剖面的升力线斜率为$a_0$、零升迎角为$\alpha_{L=0}(y)$，则环量分布在展向每一站位$y_0$上满足
$$
\alpha(y_0) = \frac{2\,\Gamma(y_0)}{a_0\,V_\infty\,c(y_0)} + \alpha_{L=0}(y_0) + \frac{1}{4\pi V_\infty}\int_{-b/2}^{b/2}\frac{\left(d\Gamma/dy\right)dy}{y_0 - y},
$$ {#eq-lifting-line}
且$\Gamma(\pm b/2) = 0$。最后一项是诱导迎角$\alpha_i(y_0)$。升力和诱导阻力为
$$
L = \rho_\infty V_\infty\int_{-b/2}^{b/2}\Gamma\,dy, \qquad D_i = \rho_\infty\int_{-b/2}^{b/2}w\,\Gamma\,dy = \rho_\infty V_\infty\int_{-b/2}^{b/2}\alpha_i\,\Gamma\,dy .
$$ {#eq-L-Di}
:::

::: proof
**下洗。**在$y$与$y + dy$之间，附着环量变化$(d\Gamma/dy)\,dy$，由亥姆霍兹定理，一根该强度的尾涡丝（其符号使总环量保持连续）从升力线延伸到下游无穷远。由[[#prop-biot-savart]]，半无限涡丝在升力线上的点$y_0$处——与其起点平齐且距其$|y_0 - y|$——诱导大小为$\left|(d\Gamma/dy)\,dy\right|/\left(4\pi|y_0 - y|\right)$的竖直速度。对右半翼上位于外侧、$\Gamma$在下降处（$d\Gamma/dy < 0$，$y > y_0$）的涡丝检验方向：翼尖涡的旋转方向使其外侧空气上升、内侧空气下降，即在$y_0$处向下。因此以下洗为正，
$$
w(y_0) = \frac{1}{4\pi}\int_{-b/2}^{b/2}\frac{\left(d\Gamma/dy\right)dy}{y_0 - y} ,
$$
积分取主值，而$\alpha_i = w/V_\infty$就是[[#eq-lifting-line]]的最后一项。

**剖面定律。**每个剖面感受到的当地自由来流$V_\infty$向下倾斜了$\alpha_i$，所以其单位展长升力为$L' = \tfrac12\rho_\infty V_\infty^2c\,a_0\left(\alpha - \alpha_i - \alpha_{L=0}\right)$。由库塔-茹科夫斯基定理，它又等于$\rho_\infty V_\infty\Gamma$。令两者相等，得$\alpha = 2\Gamma/(a_0V_\infty c) + \alpha_{L=0} + \alpha_i$，即[[#eq-lifting-line]]。

**力。**当地力$\rho_\infty V_\infty\Gamma\,dy$垂直于当地相对气流；它垂直于$V_\infty$的分量是升力（取$\cos\alpha_i \approx 1$），沿$V_\infty$的分量是$\rho_\infty V_\infty\Gamma\sin\alpha_i\,dy \approx \rho_\infty w\Gamma\,dy$。积分即得[[#eq-L-Di]]。假设：定常、不可压缩、无黏流动；大展弦比的平直无后掠机翼，使每个剖面感受到近乎二维的流动，且下洗沿展向缓慢变化；尾涡面是平的，在机翼上方不卷起；小角度；剖面升力线是线性的。
:::

该方程是关于$\Gamma(y)$的积分-微分方程：未知函数既单独出现，又出现在其导数的积分之中。有两条求解途径——选定一个$\Gamma$并求出相应的机翼（椭圆情形），或者选定机翼并用级数求解$\Gamma$（一般情形）。

## 椭圆升力分布

::: theorem 椭圆载荷机翼 {#thm-elliptic}
若环量沿展向呈椭圆分布，
$$
\Gamma(y) = \Gamma_0\sqrt{1 - \left(\frac{2y}{b}\right)^2},
$$
则下洗沿展向是**均匀的**，$w = \Gamma_0/(2b)$，且
$$
\alpha_i = \frac{C_L}{\pi AR}, \qquad C_{D,i} = \frac{C_L^2}{\pi AR}.
$$ {#eq-elliptic}
各处剖面相同的无扭转机翼具有椭圆载荷，当且仅当其弦长按椭圆变化；此时其升力线斜率为
$$
a = \frac{dC_L}{d\alpha} = \frac{a_0}{1 + a_0/(\pi AR)} .
$$ {#eq-slope-elliptic}
:::

::: proof
作代换$y = -\tfrac b2\cos\theta$，于是$\theta$沿展向从$0$变到$\pi$，且$\Gamma = \Gamma_0\sin\theta$。则$(d\Gamma/dy)\,dy = d\Gamma = \Gamma_0\cos\theta\,d\theta$，$y_0 - y = \tfrac b2(\cos\theta - \cos\theta_0)$，所以
$$
w(\theta_0) = \frac{1}{4\pi}\int_0^\pi\frac{\Gamma_0\cos\theta\,d\theta}{\tfrac b2\left(\cos\theta - \cos\theta_0\right)} = \frac{\Gamma_0}{2\pi b}\cdot\pi = \frac{\Gamma_0}{2b},
$$
其中用到格劳特积分$\int_0^\pi\cos\theta\,d\theta/(\cos\theta - \cos\theta_0) = \pi$（[[aerodynamics/thin-airfoil-theory]]）。升力为$L = \rho_\infty V_\infty\Gamma_0\tfrac b2\int_0^\pi\sin^2\theta\,d\theta = \tfrac\pi4\rho_\infty V_\infty b\Gamma_0$，所以$\Gamma_0 = 2V_\infty SC_L/(\pi b)$，$\alpha_i = \Gamma_0/(2bV_\infty) = SC_L/(\pi b^2) = C_L/(\pi AR)$。由于下洗均匀，[[#eq-L-Di]]给出$D_i = \alpha_iL$，所以$C_{D,i} = \alpha_iC_L = C_L^2/(\pi AR)$。

关于平面形状：在$\alpha_i$均匀、各处$\alpha$和$\alpha_{L=0}$相同时，[[#eq-lifting-line]]给出$\Gamma(y)/c(y) = \text{常数}$，所以$c(y)$必须是椭圆形的；反之，椭圆弦长使椭圆形$\Gamma$满足该方程。此时每个剖面都有相同的$c_l = a_0(\alpha - \alpha_i - \alpha_{L=0})$，等于$C_L$，代入$\alpha_i = C_L/(\pi AR)$得$C_L = a_0(\alpha - \alpha_{L=0})/\left(1 + a_0/(\pi AR)\right)$，即[[#eq-slope-elliptic]]。
:::

这一结果有一个醒目的物理解读。诱导阻力为$D_i = L^2/(\tfrac12\rho_\infty V_\infty^2\,\pi b^2)$：它依赖于**翼展载荷**$L/b$，而不依赖于机翼面积。在升力和速度不变时，展长加倍使诱导阻力减为四分之一。并且由于$q_\infty \propto V_\infty^2$，诱导阻力按$1/V_\infty^2$下降——它在低速时（起飞、爬升、待机）占主导，而按$V_\infty^2$增长的型阻在高速时占主导。

::: example 巡航中的客机 {#ex-airliner}
一架质量$60\,\mathrm{t}$的双发客机，$S = 125\,\mathrm{m^2}$，$b = 34\,\mathrm{m}$，在$10.7\,\mathrm{km}$高度以$230\,\mathrm{m/s}$巡航，该高度的国际标准大气密度为$0.380\,\mathrm{kg/m^3}$。把机翼视为椭圆载荷，求$C_L$、诱导迎角和诱导阻力。
::: solution
$AR = 34^2/125 = 9.25$，$q_\infty = \tfrac12(0.3796)(230)^2 = 10.04\,\mathrm{kPa}$。升力等于重力：$C_L = 60\,000 \times 9.81/(10\,040 \times 125) = 0.469$。于是
$$
\alpha_i = \frac{0.469}{\pi \times 9.25} = 0.0161\,\mathrm{rad} = 0.92^\circ, \qquad C_{D,i} = \frac{0.469^2}{\pi \times 9.25} = 0.00757,
$$
$D_i = C_{D,i}q_\infty S = 0.00757 \times 10\,040 \times 125 = 9.50\,\mathrm{kN}$。作为校核，$D_i = W^2/(q_\infty\pi b^2) = (588\,600)^2/(10\,040\,\pi \times 34^2) = 9.50\,\mathrm{kN}$。**合理性检验：**这一级别的飞机巡航时的总阻力约为$W/17 \approx 35\,\mathrm{kN}$，所以诱导阻力约占总阻力的四分之一，在预期范围内；$e \approx 0.85$（见下文）的真实机翼约为$11\,\mathrm{kN}$。
:::
:::

## 一般载荷：格劳特级数

对于任意机翼，把环量展开为在两个翼尖处都为零的傅里叶正弦级数，
$$
\Gamma(\theta) = 2bV_\infty\sum_{n=1}^{N}A_n\sin n\theta, \qquad y = -\tfrac b2\cos\theta .
$$ {#eq-gamma-series}

::: theorem 一般载荷的升力与诱导阻力 {#thm-general-loading}
利用[[#eq-gamma-series]]，诱导迎角、升力系数和诱导阻力系数为
$$
\alpha_i(\theta_0) = \sum_n nA_n\frac{\sin n\theta_0}{\sin\theta_0}, \qquad
C_L = \pi AR\,A_1, \qquad
C_{D,i} = \pi AR\sum_n nA_n^2 = \frac{C_L^2}{\pi AR}\left(1 + \delta\right),
$$ {#eq-general-cdi}
其中$\delta = \sum_{n\ge2}n\left(A_n/A_1\right)^2 \ge 0$。对于给定的展长和升力，当载荷为椭圆分布时诱导阻力最小，$\delta = 0$。**展向效率因子**为$e = 1/(1 + \delta)$。各系数满足**单翼方程**
$$
\mu(\theta_0)\left[\alpha(\theta_0) - \alpha_{L=0}(\theta_0)\right] = \sum_n A_n\sin n\theta_0\left(1 + \frac{n\,\mu(\theta_0)}{\sin\theta_0}\right), \qquad \mu = \frac{c\,a_0}{4b}.
$$ {#eq-monoplane}
:::

::: proof
$d\Gamma = 2bV_\infty\sum nA_n\cos n\theta\,d\theta$，与[[#thm-elliptic]]中一样，由格劳特积分
$$
\alpha_i(\theta_0) = \frac{1}{4\pi V_\infty}\int_0^\pi\frac{2bV_\infty\sum nA_n\cos n\theta\,d\theta}{\tfrac b2(\cos\theta - \cos\theta_0)} = \frac1\pi\sum nA_n\cdot\frac{\pi\sin n\theta_0}{\sin\theta_0}.
$$
升力：$L = \rho_\infty V_\infty\int\Gamma\,dy = \rho_\infty V_\infty\cdot2bV_\infty\cdot\tfrac b2\sum A_n\int_0^\pi\sin n\theta\sin\theta\,d\theta = \tfrac\pi2\rho_\infty V_\infty^2b^2A_1$，所以$C_L = \pi b^2A_1/S = \pi AR\,A_1$。诱导阻力：$D_i = \rho_\infty V_\infty\int\alpha_i\Gamma\,dy$；由于$dy = \tfrac b2\sin\theta\,d\theta$，$\sin\theta$与$\alpha_i$的分母相消，正交性$\int_0^\pi\sin n\theta\sin m\theta\,d\theta = \tfrac\pi2\delta_{nm}$留下$D_i = \rho_\infty V_\infty^2b^2\tfrac\pi2\sum nA_n^2$，即$C_{D,i} = \pi AR\sum nA_n^2$。提出因子$A_1^2 = (C_L/\pi AR)^2$即得$(1 + \delta)$形式；$\delta$的每一项都非负，所以在给定$C_L$和$AR$下，$\delta = 0$（只有$A_1$，即椭圆载荷）使$C_{D,i}$最小。最后，把[[#eq-gamma-series]]和$\alpha_i$代入[[#eq-lifting-line]]，并乘以$\mu = ca_0/(4b)$，即得[[#eq-monoplane]]。假设：[[#thm-lifting-line]]的假设。
:::

对于无侧滑的对称机翼，只出现奇数$n$。实践中在半翼展上的$N$个站位施加单翼方程，由一个$N \times N$线性方程组求出$N$个未知的奇数项系数——这是一种配置法，实际上就是沿展向的面元法。

::: algorithm 求解单翼方程 {#alg-monoplane}
1. 选取$N$（通常4–10即可）以及半翼展$0 < \theta \le \pi/2$上的站位$\theta_k = k\pi/(2N)$，$k = 1, \dots, N$。
2. 在每个站位上计算弦长$c(\theta_k)$、包括扭转在内的几何迎角$\alpha(\theta_k)$、$\alpha_{L=0}(\theta_k)$以及$\mu_k = c_ka_0/(4b)$。
3. 构造矩阵$M_{kj} = \sin n_j\theta_k\left(1 + n_j\mu_k/\sin\theta_k\right)$，其中$n_j = 1, 3, 5, \dots$，右端为$\mu_k(\alpha_k - \alpha_{L=0,k})$，求解$A_{n_j}$。
4. 计算$C_L = \pi AR\,A_1$、$\delta = \sum_{j\ge2}n_j(A_{n_j}/A_1)^2$、$C_{D,i} = C_L^2(1 + \delta)/(\pi AR)$，以及展向升力系数$c_l(y) = 2\Gamma/(V_\infty c)$。
5. 增大$N$重复计算，直到$C_L$和$\delta$不再变化。
:::

::: example 手算矩形机翼 {#ex-rectangular}
一个展弦比为$6$的无扭转矩形机翼，其剖面$a_0 = 2\pi$，$\alpha_{L=0} = 0$，迎角$\alpha = 5^\circ$。在$\theta = 45^\circ$和$90^\circ$处用两项（$A_1$、$A_3$）求解单翼方程，并与收敛解相比较。
::: solution
弦长为$c = b/AR$，所以处处$\mu = a_0/(4AR) = 2\pi/24 = 0.2618$，右端为$\mu\alpha = 0.2618 \times 0.08727 = 0.02285$。在$\theta = 45^\circ$（$\sin\theta = 0.7071$，$\sin3\theta = 0.7071$）和$90^\circ$（$\sin\theta = 1$，$\sin3\theta = -1$）处：
$$
\begin{aligned}
0.7071(1 + 0.3702)A_1 + 0.7071(1 + 1.1107)A_3 &= 0.02285 &&\Rightarrow\; 0.9689A_1 + 1.4925A_3 = 0.02285,\\
1.2618A_1 - 1.7854A_3 &= 0.02285 .
\end{aligned}
$$
解得$A_1 = 0.020727$，$A_3 = 0.001852$。于是$C_L = \pi(6)(0.020727) = 0.391$，$\delta = 3(0.001852/0.020727)^2 = 0.024$，$e = 0.977$，$C_{D,i} = 0.391^2(1.024)/(6\pi) = 0.0083$。用$N = 4$项，结果变为$C_L = 0.395$，$\delta = 0.046$；用$N = 8$项，$C_L = 0.3953$，$\delta = 0.048$，$e = 0.954$。**合理性检验：**两项时升力已收敛到1%以内，而阻力因子$\delta$需要更多项，因为它依赖于较小的高次谐波的**平方**；与椭圆相比，矩形机翼在翼尖附近承担了过多载荷，其诱导阻力比同展长的椭圆机翼约多5%——这是$AR = 6$时的经典结果。
:::
:::

同样的计算表明了梯形机翼为何受欢迎：对于$AR = 8$、$a_0 = 2\pi$，矩形机翼的$\delta = 0.068$，梢根比（翼尖弦长/翼根弦长）为$0.4$时$\delta = 0.013$，而尖翼尖给出$\delta = 0.157$。约$0.3$–$0.4$的直线梯形机翼在诱导阻力上与椭圆相差1–2%以内，而且容易制造得多。

## 有限翼展机翼的升力线斜率与极曲线

诱导迎角减小了有效迎角，因此有限翼展机翼要得到相同的升力，需要比其剖面更大的迎角：其升力曲线**更平缓**。对于一般的平面形状，升力线理论的结果可写为
$$
a = \frac{a_0}{1 + \dfrac{a_0}{\pi AR}\left(1 + \tau\right)},
$$ {#eq-slope-general}
其中$\tau$是一个小的平面形状因子（对平直机翼约为$0.05$–$0.25$），严格说来它与$\delta$**不**相同。在初步设计中，两者常被一个效率因子取代，$a \approx a_0/\left(1 + a_0/(\pi e AR)\right)$；对于$a_0 = 2\pi$、$AR = 8$、$e = 0.85$，这给出$a = 2\pi/(1 + 2/6.8) = 4.86$每弧度，而椭圆机翼为$5.03$，剖面为$2\pi = 6.28$。展弦比低于约$4$时，升力线理论失去精度；此时采用赫尔姆博尔德（Helmbold）型的经验公式，
$$
a = \frac{2\pi AR}{2 + \sqrt{AR^2\left(1 + \tan^2\Lambda_{c/2}\right) + 4}}\qquad(\text{不可压缩}),
$$ {#eq-helmbold}
对于无后掠机翼（$\Lambda_{c/2} = 0$），它就是赫尔姆博尔德1942年对升力线理论的修正，加上后掠项后，它是美国空军DATCOM升力线斜率公式的低速形式。它在$AR = 8$时给出$4.91$每弧度，$AR = 3$时给出$3.36$，并在$AR \to 0$时趋于细长翼的值$\pi AR/2$。

::: widget plot
f: 2*pi/(1 + 2/(e*x)); 2*pi*x/(2 + sqrt(x^2*(1 + tan(L*pi/180)^2) + 4)); pi*x/2
x: 0.5, 20
y: 0, 6.5
sliders: e=0.85:0.6:1:0.01, L=0:0:50:1
hlines: 6.283
labels: a_0/(1 + a_0/\pi e AR); \text{Helmbold--DATCOM，后掠角}\ L; \pi AR/2\ \text{（细长翼）}
caption: 剖面$a_0 = 2\pi$（水平线）时机翼升力线斜率（每弧度）随展弦比的变化。第一条曲线是效率为$e$的升力线理论；在$AR = 8$、$e = 0.85$时其读数为$4.86$。第二条是半弦线后掠角为$L$度的[[#eq-helmbold]]：增大$L$，可以看到后掠使升力曲线变平缓。对$AR \gtrsim 6$两者相差在百分之几以内；在低展弦比下，升力线理论预测偏高，而经验曲线趋近细长翼极限$\pi AR/2$。
:::

::: example 有限翼展机翼的迎角 {#ex-slope}
一个展弦比为$8$的机翼采用$a_0 = 2\pi$每弧度的对称剖面。在升力线斜率中取$e = 0.85$，多大的迎角给出$C_L = 0.5$？与相同升力系数下的剖面相比较。
::: solution
$a = 2\pi/\left(1 + 2\pi/(\pi \times 0.85 \times 8)\right) = 6.2832/1.2941 = 4.855$每弧度。于是$\alpha = 0.5/4.855 = 0.1030\,\mathrm{rad} = 5.90^\circ$。单独的剖面需要$0.5/(2\pi) = 0.0796\,\mathrm{rad} = 4.56^\circ$；两者之差$1.34^\circ$就是诱导迎角（比椭圆值$C_L/(\pi AR) = 0.0199\,\mathrm{rad} = 1.14^\circ$稍大，因为$e < 1$）。**合理性检验：**有限翼展机翼的斜率是剖面的$77$%，这对中等展弦比是典型的。
:::
:::

机翼的总阻力——若把型阻和干扰阻力也合并进去，则是整架飞机的总阻力——通常写成**抛物线型极曲线**
$$
C_D = C_{D,0} + \frac{C_L^2}{\pi e AR},
$$ {#eq-polar}
此时$e$即**奥斯瓦尔德效率因子**（Oswald efficiency factor），它既包含非椭圆的展向载荷，也包含随升力增长的那部分型阻；对整机而言，典型值为$0.7$–$0.85$。使$C_D/C_L$最小，即得最大升阻比：
$$
C_L^* = \sqrt{\pi e AR\,C_{D,0}}, \qquad \left(\frac LD\right)_\text{max} = \frac12\sqrt{\frac{\pi e AR}{C_{D,0}}},
$$ {#eq-ldmax}
此时诱导阻力与零升阻力相等。展弦比和气动洁净度（$C_{D,0}$）在根号下同等重要，这就是滑翔机既有很大的展弦比又有非常光滑的表面的原因。

::: example 轻型飞机的最佳滑翔 {#ex-ldmax}
一架轻型飞机的$C_{D,0} = 0.025$，$AR = 8$，$e = 0.80$。求最大$L/D$时的升力系数、$(L/D)_\text{max}$的值以及该点的阻力构成。
::: solution
$\pi eAR = \pi(0.8)(8) = 20.11$。于是$C_L^* = \sqrt{20.11 \times 0.025} = 0.709$，$(L/D)_\text{max} = \tfrac12\sqrt{20.11/0.025} = 14.2$。在$C_L^*$处诱导阻力系数为$0.709^2/20.11 = 0.025$，等于$C_{D,0}$，所以总阻力系数为$0.050$，$L/D = 0.709/0.050 = 14.2$。**合理性检验：**在螺旋桨风车状态或停转时，这类飞机的滑翔比通常为$9$–$14$，而约$0.7$的最佳滑翔升力系数对应于比失速速度高约30%的速度。
:::
:::

::: quiz
在重量和高度不变的情况下，一架飞机的飞行速度加倍。其诱导阻力变为原来的多少倍？
- [ ] 加倍
- [ ] 不变
- [ ] 减半
- [x] 减为四分之一
::: solution
$D_i = L^2/(q_\infty\pi eb^2)$，其中$L = W$固定，且$q_\infty \propto V_\infty^2$，所以$D_i \propto 1/V_\infty^2$：速度加倍使它减为四分之一。（在同样的变化下型阻增大到四倍，这就是总阻力存在最小值的原因。）
:::
:::

::: warning 展弦比、展长与效率因子
三个常见的失误。**不一致地使用几何面积计算$AR$：**$AR = b^2/S$使用的是**参考**面积，包括机翼位于机身内的部分；把它与净面积混用会得到错误的$C_{D,i}$。**混淆各种因子：**升力线理论的展向效率$e = 1/(1 + \delta)$、升力线斜率因子$\tau$，以及整机的奥斯瓦尔德因子（它包含随升力变化的型阻和机身效应）是三个不同的数；要说明你指的是哪一个。**把椭圆结果用于后掠或小展弦比机翼：**升力线理论假设大展弦比的平直机翼；对于$AR \lesssim 4$、大后掠或三角翼平面形状，应使用涡格法或[[#eq-helmbold]]之类的经验数据。还要记住，该理论是无黏和线性的：没有失速，没有型阻，也没有压缩性（见[[aerodynamics/compressible-airfoils]]）。
:::

## 后掠与翼尖装置

后掠翼的四分之一弦线与展向法线方向成$\Lambda$角，它的引入是为了推迟压缩性效应，其空气动力学在[[aerodynamics/compressible-airfoils]]和[[aerodynamics/supersonic-hypersonic]]中讨论。在低速下，后掠有三个主要后果：升力线斜率下降（对大展弦比大致按$\cos\Lambda$变化，也可见[[#eq-helmbold]]）；在后掠翼上展向载荷向外侧移动，因此除非机翼在翼尖处向下扭转（“负扭转”），否则翼尖往往先失速；以及展向流动使边界层向翼尖增厚。升力线理论不能恰当地处理后掠，因为附着涡不再垂直于来流；**涡格法**用马蹄涡网格覆盖机翼，并在每个马蹄涡的一个控制点上施加相切条件，是其标准的推广。

翼梢小翼和其他**翼尖装置**降低诱导阻力，不是靠“阻挡”翼尖涡，而是靠改变展向载荷和尾流的形状：实际上它们的作用就像适度增加展长，但翼根弯矩较小，且不突破机位宽度限制。在诱导阻力的节省、附加的型阻和重量以及结构代价之间的权衡，是一个设计问题，每种飞机的答案各不相同。

::: application 尾涡与飞机间隔
大型飞机的尾涡强而持久。对于椭圆载荷，翼展中点的环量为$\Gamma_0 = 4L/(\pi\rho_\infty V_\infty b)$；对于进近中的$300\,\mathrm{t}$飞机（$V_\infty = 75\,\mathrm{m/s}$，$b = 65\,\mathrm{m}$，海平面），它约为$630\,\mathrm{m^2/s}$，在距卷起的涡核$10\,\mathrm{m}$处，这一强度的涡诱导约$\Gamma_0/(2\pi \times 10) = 10\,\mathrm{m/s}$的旋流——足以使穿过它的轻型飞机发生滚转。这些涡在产生它们的飞机后方以每秒一两米的速度下沉，并在几分钟内衰减。空中交通管制在进近和离场时对重型与轻型飞机之间规定最小间隔，正是出于这个原因；这些间隔由管理机构根据测量结果而不是根据这一估算来规定。
:::

::: history
弗雷德里克·**兰彻斯特**（Frederick Lanchester）在《空气动力学》（*Aerodynamics*，1907年）中描述了有限翼展机翼的尾涡系和诱导阻力的来源。路德维希·**普朗特**（Ludwig Prandtl）和他在哥廷根的同事，特别是阿尔伯特·**贝茨**（Albert Betz）和马克斯·**门克**（Max Munk），在1918—1919年把这一思想发展为定量的升力线理论（《机翼理论》，*Tragflügeltheorie*），其中包括这样的结果：对给定的展长和升力，椭圆载荷给出最小的诱导阻力；哥廷根风洞证实了所预测的展弦比对升力线斜率和阻力的影响。赫尔曼·**格劳特**（Hermann Glauert）在《翼型与螺旋桨理论基础》（*The Elements of Aerofoil and Airscrew Theory*，1926年）中引入了本章所用的傅里叶级数解法。抛物线型极曲线中的效率因子以W·贝利·**奥斯瓦尔德**（W. Bailey Oswald）命名，他的NACA第408号报告（1932年）给出了飞机性能的一般公式和图表。
:::

## 小结

::: summary
- 有限翼展机翼的附着环量在翼尖处必须为零；每一个展向变化$d\Gamma$都作为尾涡脱落。尾涡面诱导下洗$w$和诱导迎角$\alpha_i = w/V_\infty$，使升力向后倾斜：这就是诱导阻力。
- 普朗特升力线方程：$\alpha = 2\Gamma/(a_0V_\infty c) + \alpha_{L=0} + \alpha_i$，其中$\alpha_i = \frac{1}{4\pi V_\infty}\int\frac{d\Gamma/dy}{y_0 - y}\,dy$。
- 椭圆载荷：下洗均匀，$\alpha_i = C_L/(\pi AR)$，$C_{D,i} = C_L^2/(\pi AR)$，$a = a_0/(1 + a_0/\pi AR)$；在给定展长和升力下诱导阻力最小。$D_i = L^2/(q_\infty\pi b^2)$：起作用的是翼展载荷，且$D_i \propto 1/V_\infty^2$。
- 用格劳特级数求一般载荷：$C_L = \pi AR\,A_1$，$C_{D,i} = C_L^2(1 + \delta)/(\pi AR)$，$e = 1/(1 + \delta)$；用配置法求解单翼方程。$0.3$–$0.4$的梢根比接近椭圆。
- 极曲线$C_D = C_{D,0} + C_L^2/(\pi eAR)$；$(L/D)_\text{max} = \tfrac12\sqrt{\pi eAR/C_{D,0}}$，此时诱导阻力等于零升阻力。
- 对$a_0 = 2\pi$、$AR = 8$、$e = 0.85$：$a \approx 4.86$每弧度。对低$AR$和后掠情形，使用经验方法或涡格法。
:::

## 习题

::: exercise 诱导阻力系数 {level=1 check="0.0127"}
展弦比为$10$、展向效率$e = 0.9$的机翼以$C_L = 0.6$飞行。求其诱导阻力系数。（输入$C_{D,i}$。）
::: solution
$C_{D,i} = C_L^2/(\pi eAR) = 0.36/(\pi \times 0.9 \times 10) = 0.0127$。
:::
:::

::: exercise 诱导迎角 {level=1 check="2.08"}
展弦比为$7$的椭圆载荷机翼在$C_L = 0.8$下工作。求诱导迎角。（以度为单位输入$\alpha_i$。）
::: solution
$\alpha_i = C_L/(\pi AR) = 0.8/(7\pi) = 0.03638\,\mathrm{rad} = 2.08^\circ$。
:::
:::

::: exercise 每度升力线斜率 {level=1 check="0.0800"}
展弦比为$6$的机翼采用$a_0 = 2\pi$每弧度的剖面；在升力线斜率公式中取$e = 0.9$。求机翼的升力线斜率。（以每度为单位输入。）
::: solution
$a = 2\pi/\left(1 + 2/(0.9 \times 6)\right) = 6.2832/1.3704 = 4.585$每弧度$= 0.0800$每度，而剖面为每度$0.1097$。
:::
:::

::: exercise 更大的展长 {level=2 check="0.892"}
把[[#ex-airliner]]中客机的机翼展长由$34\,\mathrm{m}$改为$36\,\mathrm{m}$，重量、速度、高度和展向效率均不变。其诱导阻力变为原来的多少倍？（输入新值与旧值之比。）
::: solution
$D_i = W^2/(q_\infty\pi eb^2) \propto 1/b^2$，所以比值为$(34/36)^2 = 0.892$：减少11%，这里约为$1.0\,\mathrm{kN}$。机翼面积并不出现。代价是更大的翼根弯矩和更重的机翼。
:::
:::

::: exercise 滑翔机的最佳滑翔 {level=2 check="38.8"}
一架滑翔机的$AR = 25$，$e = 0.92$，$C_{D,0} = 0.012$。求其最大升阻比。（输入$(L/D)_\text{max}$。）
::: solution
$(L/D)_\text{max} = \tfrac12\sqrt{\pi(0.92)(25)/0.012} = \tfrac12\sqrt{6021} = 38.8$，此时$C_L^* = \sqrt{\pi(0.92)(25)(0.012)} = 0.93$。真实的高性能滑翔机由于大面积层流而有更低的$C_{D,0}$，可达到40–60；对层流翼型而言，抛物线型极曲线也只是一种近似。
:::
:::

::: exercise 椭圆机翼的下洗 {level=2 check="3.71"}
对[[#ex-airliner]]中的客机，求翼展中点的环量$\Gamma_0$和机翼处的均匀下洗。（以m/s为单位输入$w$。）
::: solution
由$L = \tfrac\pi4\rho_\infty V_\infty b\Gamma_0$得$\Gamma_0 = 4 \times 588\,600/(\pi \times 0.3796 \times 230 \times 34) = 252\,\mathrm{m^2/s}$，$w = \Gamma_0/(2b) = 252/68 = 3.71\,\mathrm{m/s}$。用诱导迎角校核：$w = V_\infty\alpha_i = 230 \times 0.01614 = 3.71\,\mathrm{m/s}$。
:::
:::

::: exercise 推导最小诱导阻力 {level=3}
直接由[[#eq-general-cdi]]证明：在给定展长的机翼上产生给定升力的所有展向载荷中，椭圆载荷的诱导阻力最小。然后证明只有椭圆载荷的下洗$\alpha_i(\theta_0)$沿展向为常数，并从物理上解释为什么均匀下洗是最优的。
::: solution
给定升力就确定了$A_1 = C_L/(\pi AR)$；于是当所有$n \ge 2$的$A_n$都为零，即$\Gamma \propto \sin\theta$（椭圆）时，$C_{D,i} = \pi AR(A_1^2 + 2A_2^2 + 3A_3^2 + \dots)$最小。由[[#eq-general-cdi]]，$\alpha_i = \sum nA_n\sin n\theta_0/\sin\theta_0$；若所有高次$A_n$都为零，它是常数（$= A_1$），反之，常数$\alpha_i$要求$\sum nA_n\sin n\theta_0 = k\sin\theta_0$，由正交性这迫使$n \ge 2$时$A_n = 0$。从物理上看：诱导阻力是机翼每单位飞行距离向尾流输入动能的速率，而升力是它使空气获得向下动量的速率。对于给定的动量（升力），当每一团空气获得相同的向下速度时，动能$\tfrac12\sum m v^2$最小——这与把给定冲量均匀分配到一团质量上能使能量最小是同一个道理。均匀下洗就是这一条件，而椭圆载荷产生均匀下洗。
:::
:::

::: exercise 用配置法计算梯形机翼 {level=3 check="0.987"}
编写一个简短的程序求解单翼方程（[[#alg-monoplane]]），对象是展弦比为$8$的无扭转直线梯形机翼，剖面$a_0 = 2\pi$，$\alpha_{L=0} = 0$。求梢根比为$0.4$时的展向效率因子，并画出梢根比从$0$到$1$时$e$的变化曲线。评论曲线的形状，以及实践中限制梢根比选择的因素。（输入梢根比为$0.4$时的$e$，保留三位小数。）
::: solution
取弦长$c(y) = c_r\left[1 - (1 - \lambda)\,|2y/b|\right]$，$c_r = 2S/\left(b(1 + \lambda)\right)$，用$N = 12$个奇数项，解得：$\lambda = 1$时$\delta = 0.0676$（$e = 0.937$），$\lambda = 0.6$时$\delta = 0.0245$（$e = 0.976$），$\lambda = 0.4$时$\delta = 0.0132$（$e = 0.987$），$\lambda = 0.3$时$\delta = 0.0145$，$\lambda = 0.2$时$\delta = 0.026$，尖翼尖时$\delta \approx 0.16$（$e = 0.86$）。曲线在$\lambda \approx 0.35$–$0.4$附近有一个宽阔的最大值，此时直线梯形最接近椭圆：梯形过小使翼尖过载，过大则使翼尖欠载。实践中的选择还取决于翼尖失速（大的梯形度使剖面升力系数向外侧集中，因此在低雷诺数下小的翼尖弦长先失速）、翼根处的结构高度和燃油容积、制造工艺，对后掠翼还取决于后掠引起的载荷外移——这就是后掠运输机机翼采用比这一无后掠最优值更大的梯形度、并配合负扭转的原因。
:::
:::
