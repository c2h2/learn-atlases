70 MPa液压机的缸体、塑料注射装置的料筒、水射流切割机的高压管以及柴油机燃油喷射共轨的内孔，它们的壁都不薄：外半径可能是内半径的1.5倍甚至2倍。[[mechanics-of-materials/stress-transformation]]中的薄壁公式$\sigma_\theta = pr/t$假定环向应力沿壁厚均匀分布，而对这样的壁并非如此。靠近内孔的材料在同样的径向位移下被拉伸的圆周更小，因而承受的环向应力远大于外侧的材料——而且无论把壁加厚多少，都无法把这部分应力从内孔处转移走。

同样的数学还描述了过盈装配在轴上的齿轮轮毂（过盈量产生接触压强，靠摩擦传递转矩），以及涡轮或压气机的轮盘（其载荷不是压强，而是轮盘自身的离心惯性力）。本章用拉梅（Lamé）提出的一个思想统一求解这三类问题：在轴对称物体中唯一的位移是径向位移$u(r)$，[[solid-mechanics/stress-strain-3d]]和[[solid-mechanics/linear-elasticity]]中的方程就归结为一个常微分方程。

符号规定：拉应力为正；压强$p$以压向表面为正（因此内孔处的压强在该处给出$\sigma_r = -p$）。半径记为$a$（内）和$b$（外）；对过盈配合，配合面半径记为$c$。

## 轴对称平衡与运动学

采用柱坐标$(r, \theta, z)$。对承受与$\theta$无关载荷的回转体，对称性排除了切应力$\tau_{r\theta}$和$\tau_{\theta z}$以及任何环向位移；在远离端部的长圆筒中（或在薄圆盘中），$\tau_{rz}$也为零。于是应力$\sigma_r, \sigma_\theta, \sigma_z$就是主应力。

::: proposition 径向平衡 {#prop-radial-eq}
对单位体积径向体力为$f_r$的轴对称应力状态，
$$
\frac{d\sigma_r}{dr} + \frac{\sigma_r - \sigma_\theta}{r} + f_r = 0 .
$$ {#eq-radial}
对以恒定角速度$\omega$旋转的物体，达朗贝尔惯性力为$f_r = \rho\omega^2 r$。
:::

::: proof
取半径$r$与$r + dr$之间、张角为$d\theta$、轴向长度为单位长度的微元。内侧面上的径向力为$-\sigma_r\,r\,d\theta$，外侧面上为$+(\sigma_r + d\sigma_r)(r + dr)\,d\theta$。两个侧面面积为$dr$，承受环向力$\sigma_\theta\,dr$，各自与切线成$d\theta/2$的倾角；它们的径向合分量为$-2\sigma_\theta\,dr\sin(d\theta/2) \approx -\sigma_\theta\,dr\,d\theta$，指向内侧。体力贡献$f_r\,r\,dr\,d\theta$。求和并略去二阶小量：
$$
\sigma_r\,dr\,d\theta + r\,d\sigma_r\,d\theta - \sigma_\theta\,dr\,d\theta + f_r\,r\,dr\,d\theta = 0,
$$
除以$r\,dr\,d\theta$即得[[#eq-radial]]。对稳定旋转，每个质点都有指向轴线的向心加速度$\omega^2 r$；在随物体一起旋转的参考系中，这等效于向外的体力$\rho\omega^2 r$。
:::

运动学关系同样简短。半径$r$处的一圈材料向外移到$r + u$；其周长从$2\pi r$增大到$2\pi(r + u)$，而径向纤维$dr$伸长$du$：
$$
\varepsilon_r = \frac{du}{dr}, \qquad \varepsilon_\theta = \frac{u}{r}.
$$ {#eq-axi-strain}
消去$u$得到相容条件$\varepsilon_r = d(r\varepsilon_\theta)/dr$。注意$\varepsilon_\theta = u/r$的含义：同样的向外位移，使内孔处的小圆环伸长得比外侧的大圆环多得多。这正是厚壁效率低的全部原因。

## 拉梅解

::: theorem 拉梅公式 {#thm-lame}
在无体力的轴对称线弹性各向同性圆筒或圆盘中，无论是平面应力（$\sigma_z = 0$，薄圆盘）、平面应变（$\varepsilon_z = 0$）还是广义平面应变（$\varepsilon_z$为常数，闭端长圆筒），径向应力和环向应力都为
$$
\sigma_r = A - \frac{B}{r^2}, \qquad \sigma_\theta = A + \frac{B}{r^2},
$$ {#eq-lame}
常数$A$和$B$由边界条件确定。对$r = a$处的内压$p_i$和$r = b$处的外压$p_o$，
$$
A = \frac{p_i a^2 - p_o b^2}{b^2 - a^2}, \qquad B = \frac{(p_i - p_o)\,a^2b^2}{b^2 - a^2}.
$$ {#eq-lame-constants}
:::

::: proof
先看平面应力。令$\sigma_z = 0$，胡克定律给出
$$
\sigma_r = \frac{E}{1 - \nu^2}\left(\frac{du}{dr} + \nu\frac{u}{r}\right), \qquad \sigma_\theta = \frac{E}{1 - \nu^2}\left(\frac{u}{r} + \nu\frac{du}{dr}\right).
$$
于是$\sigma_r - \sigma_\theta = \dfrac{E(1 - \nu)}{1 - \nu^2}\left(\dfrac{du}{dr} - \dfrac{u}{r}\right)$，$\dfrac{d\sigma_r}{dr} = \dfrac{E}{1 - \nu^2}\left(u'' + \nu\dfrac{u'}{r} - \nu\dfrac{u}{r^2}\right)$。代入$f_r = 0$时的[[#eq-radial]]，含$\nu$的项相互抵消：
$$
\frac{d^2u}{dr^2} + \frac{1}{r}\frac{du}{dr} - \frac{u}{r^2} = \frac{d}{dr}\left[\frac{1}{r}\frac{d(ru)}{dr}\right] = 0 .
$$
积分两次得$u = C_1 r + C_2/r$。代回胡克定律，$u' + \nu u/r = C_1(1 + \nu) - C_2(1 - \nu)/r^2$，所以$\sigma_r = A - B/r^2$，$\sigma_\theta = A + B/r^2$，其中$A = EC_1/(1 - \nu)$，$B = EC_2/(1 + \nu)$。

对平面应变或$\varepsilon_z$为常数的情形，联系$\sigma_r, \sigma_\theta$与$\varepsilon_r, \varepsilon_\theta$的胡克定律形式相同，只是$E$和$\nu$换成其他常数（并多出一个来自$\varepsilon_z$的常数项），得到的微分方程也相同：应力总是具有[[#eq-lame]]的形式；改变的只是位移公式。

边界条件：$\sigma_r(a) = -p_i$，$\sigma_r(b) = -p_o$。两式相减得$B(1/a^2 - 1/b^2) = p_i - p_o$，由此得$B$；然后$A = -p_o + B/b^2$化简为[[#eq-lame-constants]]。
:::

在使用这些公式之前，有两个推论值得先读出来。第一，$\sigma_r + \sigma_\theta = 2A$在每个半径处都相同。第二，$\sigma_\theta - \sigma_r = 2B/r^2$——面内最大切应力的两倍——按$1/r^2$衰减：无论壁厚多大，切应力都集中在内孔处。

::: corollary 仅受内压的圆筒 {#cor-internal}
令$p_o = 0$，$k = b/a$，
$$
\sigma_r = \frac{p_i}{k^2 - 1}\left(1 - \frac{b^2}{r^2}\right) \le 0, \qquad \sigma_\theta = \frac{p_i}{k^2 - 1}\left(1 + \frac{b^2}{r^2}\right) > 0,
$$
最大环向应力在内孔处，$\sigma_{\theta,\max} = p_i\,\dfrac{k^2 + 1}{k^2 - 1}$。若两端封闭且端部载荷$p_i\pi a^2$由筒壁承担，则轴向应力均匀，$\sigma_z = \dfrac{p_i a^2}{b^2 - a^2} = \dfrac{p_i}{k^2 - 1} = A$。径向位移由胡克定律得到，$u = \dfrac{r}{E}\bigl[\sigma_\theta - \nu(\sigma_r + \sigma_z)\bigr]$。
:::

薄壁极限是一个有用的检验。令$b = a + t$且$t \ll a$：则$k^2 - 1 \approx 2t/a$，$k^2 + 1 \approx 2$，所以$\sigma_{\theta,\max} \approx p_i a/t$，即薄壁公式，且$\sigma_z \approx p_i a/2t$。

::: widget plot
f: if(x <= k, (1 + k^2/x^2)/(k^2 - 1), 0/0); if(x <= k, (1 - k^2/x^2)/(k^2 - 1), 0/0); if(x <= k, 1/(k^2 - 1), 0/0)
x: 1, 4
y: -1.2, 3
sliders: k=2:1.1:4:0.05
labels: \sigma_\theta/p_i; \sigma_r/p_i; \sigma_z/p_i\ \text{（闭端）}
hlines: 0
caption: 受内压圆筒壁厚方向的应力（除以$p_i$）随$r/a$的变化；滑块设定半径比$k = b/a$。从$k = 1.1$开始：环向应力几乎均匀，约为$10p_i$——这是薄壁情形。增大$k$：内孔处的环向应力下降，但永远不会低于$p_i$（$k \to \infty$时的极限），而靠近外侧的材料承担得越来越少。注意内孔处的$\sigma_\theta - \sigma_r$为$2k^2p_i/(k^2 - 1)$，它趋于$2p_i$而不是零。
:::

::: example 液压缸 {#ex-hydraulic}
一个闭端钢制液压缸的内半径$a = 50\ \mathrm{mm}$，外半径$b = 80\ \mathrm{mm}$，工作压强$40\ \mathrm{MPa}$（$E = 200\ \mathrm{GPa}$，$\nu = 0.3$）。求内孔处和外侧的应力、轴向应力以及内孔直径的增量，并与薄壁公式比较。
::: solution
$b^2 - a^2 = 6400 - 2500 = 3900\ \mathrm{mm^2}$，所以
$$
A = \frac{40\times2500}{3900} = 25.64\ \mathrm{MPa}, \qquad B = \frac{40\times2500\times6400}{3900} = 1.641\times10^{5}\ \mathrm{MPa\,mm^2}.
$$
在内孔处，$B/a^2 = 65.64\ \mathrm{MPa}$：
$$
\sigma_r = 25.64 - 65.64 = -40.0\ \mathrm{MPa}\ (= -p_i\ ✓), \qquad \sigma_\theta = 25.64 + 65.64 = 91.3\ \mathrm{MPa}.
$$
在外侧，$B/b^2 = 25.64\ \mathrm{MPa}$：$\sigma_r = 0$ ✓，$\sigma_\theta = 51.3\ \mathrm{MPa}$。闭端使各处$\sigma_z = A = 25.6\ \mathrm{MPa}$。

内孔位移：
$$
u(a) = \frac{a}{E}\bigl[\sigma_\theta - \nu(\sigma_r + \sigma_z)\bigr] = \frac{50}{200\,000}\bigl[91.28 - 0.3(-40 + 25.64)\bigr] = 0.0239\ \mathrm{mm},
$$
所以内孔直径增大$0.048\ \mathrm{mm}$——这个数值对活塞密封很重要。

用内半径的薄壁公式给出$p a/t = 40\times50/30 = 66.7\ \mathrm{MPa}$，用平均半径给出$86.7\ \mathrm{MPa}$；两者都低估了内孔处真实的环向应力$91.3\ \mathrm{MPa}$。合理性检查：在两个半径处都有$\sigma_r + \sigma_\theta = 51.3\ \mathrm{MPa} = 2A$；平均环向应力$\int_a^b\sigma_\theta\,dr/(b - a)$等于$p_i a/(b - a) = 66.7\ \mathrm{MPa}$，恰好是薄壁值——这是必然的，因为半个圆筒上的环向力无论怎样分布，都必须平衡$p_i \times 2a$。
:::
:::

## 屈服，以及为什么仅靠增加壁厚不够

在内孔处，三个主应力都已知：$\sigma_\theta = A + B/a^2$，$\sigma_r = -p_i$，以及（闭端时）$\sigma_z = A$，它恰好位于另外两者正中间。屈服从内孔处开始。

::: proposition 厚壁圆筒的初始屈服压强 {#prop-first-yield}
对受内压、$k = b/a$、屈服强度为$\sigma_Y$的圆筒，内孔处在下列压强时初始屈服：
$$
p_Y = \frac{\sigma_Y}{2}\left(1 - \frac{1}{k^2}\right) \quad\text{（特雷斯卡）}, \qquad p_Y = \frac{\sigma_Y}{\sqrt3}\left(1 - \frac{1}{k^2}\right) \quad\text{（米泽斯，闭端）}.
$$
当$k \to \infty$时，两者分别趋于有限极限$\sigma_Y/2$和$\sigma_Y/\sqrt3$。
:::

::: proof
在内孔处$\sigma_\theta - \sigma_r = 2B/a^2 = 2p_i b^2/(b^2 - a^2) = 2p_ik^2/(k^2 - 1)$。闭端时$\sigma_z = A$是中间主应力，所以特雷斯卡最大切应力为$(\sigma_\theta - \sigma_r)/2$；令$\sigma_\theta - \sigma_r = \sigma_Y$即得第一个结果。（开端时$\sigma_z = 0$同样位于$\sigma_r < 0$与$\sigma_\theta > 0$之间，所以特雷斯卡结果相同。）对米泽斯准则，主应力为$A - B/a^2$、$A$、$A + B/a^2$，所以$\sigma_{\mathrm{vM}} = \sqrt{\tfrac12[(B/a^2)^2 + (B/a^2)^2 + (2B/a^2)^2]} = \sqrt3\,B/a^2$；令其等于$\sigma_Y$即得第二个结果。
:::

这个极限是重要的实践教训：用$\sigma_Y = 350\ \mathrm{MPa}$的材料制成的圆筒，按特雷斯卡准则，无论做得多厚，都不可能在弹性范围内承受超过$175\ \mathrm{MPa}$的压强。把半径比从2加倍到4，初始屈服压强只从$0.375\sigma_Y$提高到$0.469\sigma_Y$。要更进一步，设计者会对内孔施加预压应力：在第一个圆筒外**热套**第二个圆筒（组合圆筒，见下文）；在张力下**缠绕钢丝或钢带**；或者采用**自紧**（autofrettage）——先把圆筒加压一次到超过初始屈服，使内层发生塑性变形；卸载后，处于弹性的外层把内层挤压成残余压应力，从而抵消一部分工作环向应力。自紧用[[solid-mechanics/plasticity]]中的弹塑性方法分析。

::: example 高压圆筒壁厚的选择 {#ex-wall}
一个用$\sigma_Y = 350\ \mathrm{MPa}$的钢制成的圆筒必须在$p_i = 100\ \mathrm{MPa}$下工作，按特雷斯卡准则对初始屈服的安全因数为$n = 1.5$。求最小比值$b/a$。在这个安全因数下，无论壁厚多大，最大允许工作压强是多少？
::: solution
计入安全因数的特雷斯卡准则：内孔处$\sigma_\theta - \sigma_r \le \sigma_Y/n = 233.3\ \mathrm{MPa}$。由$\sigma_\theta - \sigma_r = 2p_ik^2/(k^2 - 1)$：
$$
\frac{2(100)k^2}{k^2 - 1} \le 233.3 \;\Rightarrow\; \frac{k^2}{k^2 - 1} \le 1.1667 \;\Rightarrow\; k^2 \ge 7.00 \;\Rightarrow\; k \ge 2.65 .
$$
对$100\ \mathrm{mm}$的内孔，外径至少为$265\ \mathrm{mm}$——壁厚$82\ \mathrm{mm}$。

任意$k$下的最大工作压强由$k \to \infty$得出：$2p_i \le 233.3\ \mathrm{MPa}$，所以$p_i < 116.7\ \mathrm{MPa}$。在$120\ \mathrm{MPa}$下，用这种钢制成的任何单层圆筒都不能满足要求；需要更高强度的钢、组合圆筒或自紧圆筒。合理性检查：$k = 2.65$时内孔环向应力为$p_i(k^2 + 1)/(k^2 - 1) = 100\times8/6 = 133\ \mathrm{MPa}$——远低于$\sigma_Y$——然而圆筒已达到极限，因为径向压应力$-100\ \mathrm{MPa}$叠加到了切应力中。只校核$\sigma_\theta$的薄壁习惯在这里会严重偏于不安全。
:::
:::

::: warning 压强的符号、径向与直径过盈量，以及用哪个"薄壁"半径
有三种错误反复出现。(1) 压强是压缩性的法向应力：受压内孔处的边界条件是$\sigma_r = -p_i$，而不是$+p_i$；弄错会使$B$变号，并把最大应力放到外侧。(2) 图纸和配合标准（ISO 286）中的过盈量是按**直径**给出的，而拉梅公式用的是**径向**过盈量$\delta = \Delta_d/2$；两者混用会使接触压强加倍或减半。(3) 对厚壁而言，无论用哪个半径，薄壁公式$pr/t$都不偏于安全——$b/a = 1.6$时用内半径会把内孔环向应力低估27 %（[[#ex-hydraulic]]）。只要$t/a$超过约0.1，就应使用拉梅公式。
:::

## 过盈配合与组合圆筒

把内孔半径略小于轴的轮毂压装或热套到轴上，两个零件必须变形，直到共享同一个配合面半径。轮毂的内孔向外扩张，轴的表面向内收缩；实现这一点的接触压强$p$是一个相容问题：两个拉梅解由一个几何条件连接起来。

::: proposition 过盈配合压强 {#prop-shrink}
一根管$a \le r \le c$装入一根管$c \le r \le b$中，**径向过盈量**为$\delta$（内件的外半径比外件的内半径大$\delta$）。若两者材料相同且$\delta \ll c$，配合面压强为
$$
p = \frac{E\delta}{c}\,\frac{(b^2 - c^2)(c^2 - a^2)}{2c^2(b^2 - a^2)} .
$$
对实心轴上的轮毂（$a = 0$）：$p = \dfrac{E\delta}{2c}\left(1 - \dfrac{c^2}{b^2}\right)$。材料不同时，
$$
\delta = \frac{pc}{E_o}\left(\frac{b^2 + c^2}{b^2 - c^2} + \nu_o\right) + \frac{pc}{E_i}\left(\frac{c^2 + a^2}{c^2 - a^2} - \nu_i\right).
$$
:::

::: proof
采用平面应力（短轮毂；对长零件，差别只是一个小的$\nu$项）。外件受内压$p$，所以在$r = c$处：$\sigma_r = -p$，$\sigma_\theta = p(b^2 + c^2)/(b^2 - c^2)$，其内孔向外移动$u_o = (c/E_o)(\sigma_\theta - \nu_o\sigma_r) = (pc/E_o)\bigl[(b^2 + c^2)/(b^2 - c^2) + \nu_o\bigr]$。内件受外压$p$：由[[#eq-lame-constants]]，取$p_i = 0$、$p_o = p$，在$r = c$处：$\sigma_r = -p$，$\sigma_\theta = -p(c^2 + a^2)/(c^2 - a^2)$，所以其表面移动$u_i = (c/E_i)(\sigma_\theta - \nu_i\sigma_r) = -(pc/E_i)\bigl[(c^2 + a^2)/(c^2 - a^2) - \nu_i\bigr]$（向内）。相容条件：消除的间隙必须等于过盈量，$u_o - u_i = \delta$，这就是一般公式。$E$和$\nu$相同时$\nu$项相消，且
$$
\frac{b^2 + c^2}{b^2 - c^2} + \frac{c^2 + a^2}{c^2 - a^2} = \frac{2c^2(b^2 - a^2)}{(b^2 - c^2)(c^2 - a^2)},
$$
由此得到同材料的结果；令$a = 0$即得实心轴的情形。
:::

实心轴上轮毂中的压强只通过$c/b$依赖于轮毂：外径为内孔直径两倍的轮毂，给出的压强是无限大轮毂所给值$E\delta/2c$的四分之三。在实心轴中，处处$\sigma_r = \sigma_\theta = -p$（均匀的双向压缩：$B = 0$，因为$r = 0$处应力必须有限）。

::: example 热套联轴器轮毂 {#ex-shrink}
外径$200\ \mathrm{mm}$、长$80\ \mathrm{mm}$的钢轮毂热套到直径$100\ \mathrm{mm}$的实心钢轴上，直径过盈量为$0.050\ \mathrm{mm}$（$E = 200\ \mathrm{GPa}$，摩擦因数$\mu = 0.15$，线膨胀系数$\alpha = 12\times10^{-6}\ \mathrm{K^{-1}}$）。求配合面压强、轮毂内孔处的环向应力、该配合靠摩擦能传递的转矩，以及为使装配时有$0.03\ \mathrm{mm}$直径间隙所需的轮毂温升。
::: solution
径向过盈量$\delta = 0.025\ \mathrm{mm}$；$c = 50\ \mathrm{mm}$，$b = 100\ \mathrm{mm}$：
$$
p = \frac{200\,000\times0.025}{2\times50}\left(1 - \frac{50^2}{100^2}\right) = 50\times0.75 = 37.5\ \mathrm{MPa}.
$$
轮毂内孔处的环向应力：
$$
\sigma_\theta = p\,\frac{b^2 + c^2}{b^2 - c^2} = 37.5\times\frac{12\,500}{7500} = 62.5\ \mathrm{MPa},
$$
且$\sigma_r = -37.5\ \mathrm{MPa}$；轴处于均匀压缩状态，$\sigma_r = \sigma_\theta = -37.5\ \mathrm{MPa}$。

摩擦转矩：配合面上的法向力为$p \times 2\pi cL$，作用在半径$c$处：
$$
T = \mu\,p\,(2\pi cL)\,c = 0.15\times37.5\times2\pi\times50^2\times80 = 7.07\times10^{6}\ \mathrm{N\,mm} = 7.07\ \mathrm{kN\,m}.
$$
装配：轮毂内孔必须扩大过盈量加间隙，即在$100\ \mathrm{mm}$直径上扩大$0.080\ \mathrm{mm}$：
$$
\Delta T = \frac{0.080}{12\times10^{-6}\times100} = 67\ \mathrm{K}.
$$
合理性检查：应变$\delta/c = 5\times10^{-4}$很小，符合线弹性的要求；加热到约$90\ ^\circ\mathrm{C}$是车间的常规操作（用感应加热器或加热炉，并戴耐热手套，因为热轮毂若在装到一半时卡住，就无法再拔下来）。转矩估计对$\mu$很敏感，干燥钢面的$\mu$可相差一倍；配合标准和联轴器样本给出了设计值。
:::
:::

在**组合圆筒**中，两个零件都是管，热套压强在施加任何工作压强之前就使内管的内孔处于环向**压缩**状态。工作压强随后作用在整个组件上，如同作用在一个单层厚壁圆筒上，两种应力分布相叠加。内筒内孔处的残余压应力与外筒内孔处的残余拉应力使环向应力分布变得平坦，从而可以让两个内孔同时达到屈服——这是对材料的最佳利用。对两根同材料的管，最佳配合面半径为$c = \sqrt{ab}$，如[[#ex-compound]]所示。

## 旋转圆盘

以角速度$\omega$旋转的圆盘自己给自己加载：每一圈材料需要单位体积$\rho\omega^2 r$的向内力才能保持在圆周上，而这个力的来源只有圆环中的环向拉力和相邻材料施加的径向应力。由于载荷来自质量，应力与$\rho\omega^2 b^2 = \rho v_{\text{tip}}^2$——密度乘以轮缘速度的平方——成比例，而与圆盘的绝对尺寸无关。

::: theorem 等厚旋转圆盘中的应力 {#thm-disc}
对以$\omega$旋转、厚度均匀、密度为$\rho$、泊松比为$\nu$的薄圆盘（平面应力），
$$
\sigma_r = A - \frac{B}{r^2} - \frac{3 + \nu}{8}\rho\omega^2 r^2, \qquad
\sigma_\theta = A + \frac{B}{r^2} - \frac{1 + 3\nu}{8}\rho\omega^2 r^2 .
$$
(a) **实心圆盘**，半径为$b$，轮缘自由：$\sigma_r = \dfrac{3 + \nu}{8}\rho\omega^2(b^2 - r^2)$，$\sigma_\theta = \dfrac{3 + \nu}{8}\rho\omega^2 b^2 - \dfrac{1 + 3\nu}{8}\rho\omega^2 r^2$，最大值在中心，$\sigma_r = \sigma_\theta = \dfrac{3 + \nu}{8}\rho\omega^2 b^2$。

(b) **带中心孔的圆盘**，半径为$a$和$b$，两边都自由：
$$
\sigma_r = \frac{3 + \nu}{8}\rho\omega^2\left(a^2 + b^2 - \frac{a^2b^2}{r^2} - r^2\right), \qquad
\sigma_\theta = \frac{3 + \nu}{8}\rho\omega^2\left(a^2 + b^2 + \frac{a^2b^2}{r^2} - \frac{1 + 3\nu}{3 + \nu}r^2\right),
$$
最大应力是内孔处的环向应力，$\sigma_\theta(a) = \dfrac{3 + \nu}{4}\rho\omega^2\left(b^2 + \dfrac{1 - \nu}{3 + \nu}a^2\right)$。
:::

::: proof
在[[#eq-radial]]中计入体力$f_r = \rho\omega^2 r$，[[#thm-lame]]的推导可以照搬：
$$
\frac{E}{1 - \nu^2}\,\frac{d}{dr}\left[\frac{1}{r}\frac{d(ru)}{dr}\right] = -\rho\omega^2 r .
$$
试取特解$u_p = -Kr^3$：$\frac{1}{r}\frac{d}{dr}(-Kr^4) = -4Kr^2$，其导数为$-8Kr$，所以$K = (1 - \nu^2)\rho\omega^2/(8E)$。其应力：由$u_p' + \nu u_p/r = -(3 + \nu)Kr^2$得$\sigma_{r,p} = -\tfrac{3 + \nu}{8}\rho\omega^2r^2$，由$u_p/r + \nu u_p' = -(1 + 3\nu)Kr^2$得$\sigma_{\theta,p} = -\tfrac{1 + 3\nu}{8}\rho\omega^2r^2$。加上齐次的拉梅解即得通解形式。

(a) $r = 0$处应力有限要求$B = 0$；$\sigma_r(b) = 0$给出$A = \tfrac{3 + \nu}{8}\rho\omega^2b^2$。由于$\nu < 1$时$3 + \nu > 1 + 3\nu$，两个应力都向外递减，在中心处都等于$A$。

(b) $\sigma_r(a) = \sigma_r(b) = 0$：两个条件相减得$B(1/a^2 - 1/b^2) = \tfrac{3 + \nu}{8}\rho\omega^2(b^2 - a^2)$，所以$B = \tfrac{3 + \nu}{8}\rho\omega^2a^2b^2$，进而$A = \tfrac{3 + \nu}{8}\rho\omega^2(a^2 + b^2)$。代入即得公式；在$r = a$处环向应力为$\tfrac{3 + \nu}{8}\rho\omega^2\bigl[2b^2 + 2a^2 - \tfrac{1 + 3\nu}{3 + \nu}a^2\bigr]$，整理后即为所述最大值。
:::

最引人注目的结果是小孔的影响。当$a \to 0$时，内孔环向应力趋于$\tfrac{3 + \nu}{4}\rho\omega^2b^2$——是实心圆盘中心应力的**两倍**。一个针孔就使中心处的应力加倍，因为孔的自由表面迫使那里$\sigma_r = 0$，环向应力必须补足差额：应力集中系数为2，这是受拉平板中孔边系数3（[[solid-mechanics/linear-elasticity]]）在旋转圆盘中的对应。

::: widget plot
f: if(x >= al, (3 + nu)/8*(1 + al^2 - al^2/x^2 - x^2), 0/0); if(x >= al, (3 + nu)/8*(1 + al^2 + al^2/x^2) - (1 + 3*nu)/8*x^2, 0/0)
x: 0, 1
y: 0, 0.9
sliders: al=0.2:0:0.8:0.01; nu=0.3:0:0.5:0.01
labels: \sigma_r/\rho\omega^2b^2; \sigma_\theta/\rho\omega^2b^2
caption: 等厚旋转圆盘中的应力（除以$\rho\omega^2b^2 = \rho v_\text{tip}^2$）随$r/b$的变化；滑块$al$是孔径比$a/b$。$a/b = 0$（实心圆盘）时，两条曲线在中心都从$(3 + \nu)/8 = 0.41$开始。现在把$a/b$移到$0.01$：内孔处的环向应力跃升到将近$0.83$——翻了一倍——而离孔稍远处的应力几乎不变。这就是应力集中，也是涡轮盘都带有厚轮毂的原因。
:::

::: example 6000 rpm的钢圆盘 {#ex-disc}
外半径$300\ \mathrm{mm}$的钢圆盘（$\rho = 7850\ \mathrm{kg/m^3}$，$\nu = 0.3$）以$6000\ \mathrm{rpm}$运转。求(a)实心时和(b)带半径$50\ \mathrm{mm}$中心孔时的最大应力。情形(b)中最大径向应力出现在哪里？
::: solution
$\omega = 6000\times2\pi/60 = 628.3\ \mathrm{rad/s}$，轮缘速度$\omega b = 188.5\ \mathrm{m/s}$，
$$
\rho\omega^2b^2 = 7850\times188.5^2 = 2.789\times10^{8}\ \mathrm{Pa} = 278.9\ \mathrm{MPa}.
$$
(a) 实心圆盘：$\sigma_{\max} = \tfrac{3.3}{8}\times278.9 = 115.1\ \mathrm{MPa}$，在中心（$\sigma_r$和$\sigma_\theta$均如此）。在轮缘处，$\sigma_\theta = \tfrac{1 - \nu}{4}\rho\omega^2b^2 = 48.8\ \mathrm{MPa}$。

(b) $a/b = 1/6$时：
$$
\sigma_\theta(a) = \frac{3.3}{4}\times278.9\times\left(1 + \frac{0.7}{3.3}\times\frac{1}{36}\right) = 231.5\ \mathrm{MPa},
$$
是实心圆盘值的两倍。径向应力在$d\sigma_r/dr = 0$处取最大值，即$a^2b^2/r^3 = r$，$r = \sqrt{ab} = 122.5\ \mathrm{mm}$，该处
$$
\sigma_{r,\max} = \frac{3.3}{8}\rho\omega^2(b - a)^2 = 0.4125\times7850\times628.3^2\times0.25^2 = 79.9\ \mathrm{MPa}.
$$
合理性检查：应力只取决于$\rho v_\text{tip}^2$，所以半径减半、转速加倍的圆盘应力相同。数量级检查：$\rho v^2 = 279\ \mathrm{MPa}$——以这一轮缘速度旋转的薄圆环恰好承受$\rho v^2$，而圆盘的峰值应力是它的一个量级为一的分数。
:::
:::

### 变厚度圆盘

涡轮设计者可以把圆盘在轮毂处做得更厚，从而胜过等厚圆盘，因为那里的材料必须拉住其外侧的所有圆环。在极限情况下，可以选择厚度使处处$\sigma_r = \sigma_\theta = \sigma$——即**等强度圆盘**，其型线为
$$
h(r) = h_0\exp\left(-\frac{\rho\omega^2r^2}{2\sigma}\right)
$$ {#eq-uniform-strength}
（在习题中推导）。实际圆盘需要轮缘来承载叶片、轮毂来与轴配合，因此只是近似而不是严格遵循这一型线。它们的应力用数值方法计算——把圆盘分成若干等厚圆环，每个圆环有自己的拉梅常数，由$u$和径向力$\sigma_r h$的连续性连接起来，或者用有限元法（[[finite-element-method]]）——其破裂转速则通过旋转试验来验证。

::: application 飞轮、涡轮盘与旋转试验
由于应力与$\rho v_\text{tip}^2$成比例，转子单位质量所能储存的能量受其材料比强度$\sigma/\rho$的限制，而与尺寸无关；这就是为什么储能飞轮采用纤维缠绕的碳纤维轮缘（[[solid-mechanics/composites]]），以及为什么航空发动机轮盘用强度-密度比高的镍合金或钛合金锻造。轮盘设计要按适用的规范和适航规章校核，破裂裕度要在旋转试验坑——装甲防护、抽成真空的试验舱——中验证，因为轮盘碎片携带巨大的动能。转子破裂是航空发动机适航审定专门处理的危险之一。
:::

::: history
加布里埃尔·拉梅（Gabriel Lamé）的《固体弹性数学理论讲义》（*Leçons sur la théorie mathématique de l'élasticité des corps solides*，1852）是第一部专论弹性数学理论的著作，其中包含了以他的名字命名的、受内压和外压的空心圆筒的解。随着高速汽轮机的出现，旋转圆盘成为核心的设计问题；对圆盘应力（包括变厚度圆盘）的系统处理与奥雷尔·斯托多拉（Aurel Stodola）关于汽轮机的著作《汽轮机》（*Die Dampfturbinen*）联系在一起，该书于1903年首次出版，英译本名为《蒸汽与燃气轮机》（*Steam and Gas Turbines*）。
:::

::: quiz
一个实心圆盘和一个带极小中心孔的相同圆盘以相同转速旋转。与实心圆盘的中心应力相比，带孔圆盘中的最大应力约为
- [ ] 相同
- [ ] $1.5$倍
- [x] 两倍
- [ ] 三倍
::: solution
当$a \to 0$时，$\sigma_\theta(a) \to \tfrac{3 + \nu}{4}\rho\omega^2b^2$，是实心圆盘中心值$\tfrac{3 + \nu}{8}\rho\omega^2b^2$的两倍。孔的自由表面使$\sigma_r = 0$，于是原来由$\sigma_r$和$\sigma_\theta$分担的部分必须全部由环向应力提供。
:::
:::

::: quiz
受内压的厚壁圆筒壁厚加倍。它的初始屈服压强会怎样？
- [ ] 加倍。
- [x] 提高，但远不到两倍，且永远不会超过$\sigma_Y/2$（特雷斯卡）。
- [ ] 不变。
::: solution
$p_Y = \tfrac{\sigma_Y}{2}(1 - 1/k^2)$：从$k = 2$到$k = 3$，它从$0.375\sigma_Y$提高到$0.444\sigma_Y$，而$k \to \infty$时的极限为$0.5\sigma_Y$。
:::
:::

::: summary
- 轴对称问题归结为一个未知量——径向位移$u(r)$，其中$\varepsilon_r = du/dr$，$\varepsilon_\theta = u/r$，径向平衡方程为$d\sigma_r/dr + (\sigma_r - \sigma_\theta)/r + f_r = 0$。
- 拉梅解：$\sigma_r = A - B/r^2$，$\sigma_\theta = A + B/r^2$；常数由边界压强确定（受压表面处$\sigma_r = -p$）。
- 受内压时，环向应力和切应力在内孔处最大；闭端附加均匀的$\sigma_z = p_ia^2/(b^2 - a^2)$。
- 初始屈服（特雷斯卡）发生在$p_Y = \tfrac{\sigma_Y}{2}(1 - a^2/b^2)$，永远不超过$\sigma_Y/2$：超过一定程度后，增加壁厚无济于事；组合圆筒、缠绕和自紧可使内孔预压缩。
- 过盈配合：接触压强由两个径向位移的相容条件得出；对实心轴上的轮毂，$p = \tfrac{E\delta}{2c}(1 - c^2/b^2)$，其中$\delta$为**径向**过盈量。
- 旋转圆盘：应力与$\rho v_\text{tip}^2$成比例；实心圆盘的峰值在中心，为$\tfrac{3 + \nu}{8}\rho\omega^2b^2$，一个小中心孔会使其加倍。
:::

## 习题

::: exercise 内孔环向应力 {level=1 check="100"}
圆筒内半径$100\ \mathrm{mm}$，外半径$200\ \mathrm{mm}$，承受$60\ \mathrm{MPa}$的内压。求内孔处的环向应力。（以MPa为单位输入。）
::: solution
$k = 2$：$\sigma_{\theta,\max} = p_i(k^2 + 1)/(k^2 - 1) = 60\times5/3 = 100\ \mathrm{MPa}$。在外侧，$\sigma_\theta = 2p_i/(k^2 - 1) = 40\ \mathrm{MPa}$；闭端时$\sigma_z = 20\ \mathrm{MPa}$。
:::
:::

::: exercise 外压 {level=1 check="-80"}
一根$a = 50\ \mathrm{mm}$、$b = 100\ \mathrm{mm}$的管只受$30\ \mathrm{MPa}$的外压。求内孔处的环向应力。（以MPa为单位输入，带符号。）
::: solution
$p_i = 0$时：$A = -p_ob^2/(b^2 - a^2) = -30\times10\,000/7500 = -40\ \mathrm{MPa}$，$B = -p_oa^2b^2/(b^2 - a^2)$，所以$B/a^2 = -40\ \mathrm{MPa}$。在内孔处$\sigma_\theta = A + B/a^2 = -80\ \mathrm{MPa}$，即$-2p_ob^2/(b^2 - a^2)$。尽管载荷施加在外侧，应力最高的点仍是内孔而不是外侧。
:::
:::

::: exercise 实心圆盘 {level=1 check="132"}
一个等厚实心圆盘（$\rho = 8000\ \mathrm{kg/m^3}$，$\nu = 0.3$）的轮缘速度为$200\ \mathrm{m/s}$。求最大应力。（以MPa为单位输入。）
::: solution
$\rho v^2 = 8000\times200^2 = 3.2\times10^{8}\ \mathrm{Pa}$；$\sigma_{\max} = \tfrac{3.3}{8}\times320 = 132\ \mathrm{MPa}$，在中心。
:::
:::

::: exercise 过盈压强 {level=2 check="45"}
外半径$80\ \mathrm{mm}$的钢轮毂热套到半径$40\ \mathrm{mm}$的实心钢轴上，直径过盈量为$0.048\ \mathrm{mm}$（$E = 200\ \mathrm{GPa}$）。求接触压强。（以MPa为单位输入。）
::: solution
径向过盈量$\delta = 0.024\ \mathrm{mm}$。$p = \tfrac{E\delta}{2c}(1 - c^2/b^2) = \tfrac{200\,000\times0.024}{80}\times0.75 = 60\times0.75 = 45\ \mathrm{MPa}$。若误用直径过盈量，会得到$90\ \mathrm{MPa}$。
:::
:::

::: exercise 初始屈服压强 {level=2 check="112.5"}
$b/a = 2$的圆筒用$\sigma_Y = 300\ \mathrm{MPa}$的钢制成。按特雷斯卡准则求初始屈服时的内压。（以MPa为单位输入。）
::: solution
$p_Y = \tfrac{\sigma_Y}{2}(1 - 1/k^2) = 150\times0.75 = 112.5\ \mathrm{MPa}$。按米泽斯准则（闭端）则为$\tfrac{300}{\sqrt3}\times0.75 = 129.9\ \mathrm{MPa}$。
:::
:::

::: exercise 带孔圆盘的极限轮缘速度 {level=2 check="200"}
一个带小中心孔（$a \ll b$）的圆盘用$\rho = 8000\ \mathrm{kg/m^3}$、$\nu = 0.3$的钢制成，内孔处的环向应力不得超过$264\ \mathrm{MPa}$。忽略$a^2$项，求最大轮缘速度。（以m/s为单位输入。）
::: solution
$\sigma_\theta(a) \approx \tfrac{3 + \nu}{4}\rho v^2 = 0.825\times8000\,v^2 = 6600\,v^2 \le 2.64\times10^{8}$，所以$v^2 \le 40\,000$，$v \le 200\ \mathrm{m/s}$。同样材料的实心圆盘在相同峰值应力下可以以$\sqrt2$倍的速度、即$283\ \mathrm{m/s}$运转。
:::
:::

::: exercise 等强度圆盘 {level=3}
一个圆盘的厚度$h(r)$是变化的，但斜率足够小，使应力沿厚度均匀。(a) 取厚度为$h$的微元，证明径向平衡方程变为
$$
\frac{d}{dr}(h r\sigma_r) - h\sigma_\theta + \rho\omega^2r^2h = 0 .
$$
(b) 证明若$h = h_0\exp(-\rho\omega^2r^2/2\sigma)$，则$\sigma_r = \sigma_\theta = \sigma$（常数）是可能的。(c) 对一个钢圆盘（$\rho = 7850\ \mathrm{kg/m^3}$），工作应力$\sigma = 400\ \mathrm{MPa}$，半径$0.4\ \mathrm{m}$，转速$10\,000\ \mathrm{rpm}$，求轮缘厚度与中心厚度之比。
::: solution
(a) 重复[[#prop-radial-eq]]的证明，把各力乘以当地厚度：径向面承受$\sigma_r h r\,d\theta$，跨过$dr$变化$d(\sigma_rhr)\,d\theta$；侧面给出$-\sigma_\theta h\,dr\,d\theta$；惯性力为$\rho\omega^2r\,(hr\,dr\,d\theta)$。除以$dr\,d\theta$即得结果。
(b) 令$\sigma_r = \sigma_\theta = \sigma$：$\sigma(h + rh') - \sigma h + \rho\omega^2r^2h = 0$，所以$h'/h = -\rho\omega^2r/\sigma$，$\ln(h/h_0) = -\rho\omega^2r^2/2\sigma$。此时应变相等，$\varepsilon_r = \varepsilon_\theta = (1 - \nu)\sigma/E$，这是相容的，因为$u = \varepsilon_\theta r$给出$du/dr = \varepsilon_\theta$。
(c) $\omega = 1047.2\ \mathrm{rad/s}$，$\rho\omega^2r^2/2\sigma = 7850\times1047.2^2\times0.16/(8\times10^{8}) = 1.722$，所以$h_\text{rim}/h_0 = e^{-1.722} = 0.179$：中心厚度约为轮缘的5.6倍。实际圆盘还必须在轮缘处承受叶片载荷，它决定了那里的$\sigma_r$并改变型线。
:::
:::

::: exercise 最优组合圆筒 {#ex-compound level=3}
两根同材料的管热套在一起，形成内半径$a$、配合面半径$c$、外半径$b$的组合圆筒。要求在工作压强下两根管的内孔达到相同的特雷斯卡应力$\sigma_\theta - \sigma_r$。(a) 解释为什么最佳设计的条件是：把每根管看作承受其内外压差的独立圆筒，它所承担的工作压强在各管中产生相等的应力。(b) 证明按这一方法，最佳配合面半径为$c = \sqrt{ab}$，最大工作压强为$p = \sigma_Y(1 - a/b)$——而单层圆筒为$\tfrac{\sigma_Y}{2}(1 - a^2/b^2)$。(c) 对$b/a = 3$计算两者。
::: solution
(a) 由于问题是线性的，每根管中的最终应力是热套应力与工作压强应力之和；等价地说，在最终状态下每根管承受的是其内表面压强减去外表面压强。若某个内孔先达到屈服，另一根管就被浪费了，所以最佳设计是两者同时达到极限。

(b) 设最终状态下配合面压强为$p_c$。内管（$a$到$c$）受内压$p$、外压$p_c$；在其内孔处，$\sigma_\theta - \sigma_r = 2B_1/a^2 = 2(p - p_c)c^2/(c^2 - a^2)$。外管（$c$到$b$）受内压$p_c$：在其内孔处$\sigma_\theta - \sigma_r = 2p_cb^2/(b^2 - c^2)$。令两者都等于$\sigma_Y$：
$$
p_c = \frac{\sigma_Y}{2}\left(1 - \frac{c^2}{b^2}\right), \qquad p - p_c = \frac{\sigma_Y}{2}\left(1 - \frac{a^2}{c^2}\right),
$$
所以$p = \tfrac{\sigma_Y}{2}\left(2 - c^2/b^2 - a^2/c^2\right)$。对$c$求最大值：$d/dc(c^2/b^2 + a^2/c^2) = 0$给出$c^4 = a^2b^2$，$c = \sqrt{ab}$，此时$c^2/b^2 = a^2/c^2 = a/b$，所以$p_{\max} = \sigma_Y(1 - a/b)$。

(c) $b/a = 3$：组合圆筒$p = \sigma_Y(1 - 1/3) = 0.667\sigma_Y$；单层圆筒$\tfrac{\sigma_Y}{2}(1 - 1/9) = 0.444\sigma_Y$——在总壁厚相同的情况下提高了50 %。（所需过盈量由[[#prop-shrink]]用热套压强求得，热套压强等于$p_c$减去仅由$p$在整体壁圆筒中所产生的配合面处压强。）
:::
:::

::: exercise 设计过盈配合 {level=3}
一个齿轮的轮毂外径$120\ \mathrm{mm}$、长$60\ \mathrm{mm}$，要热套到直径$60\ \mathrm{mm}$的实心钢轴上，传递$2.0\ \mathrm{kN\,m}$的转矩，防滑安全因数为2（$\mu = 0.12$）。轮毂钢的$\sigma_Y = 400\ \mathrm{MPa}$。选择直径过盈量，校核轮毂应力，并评述设计者还必须考虑哪些问题。
::: solution
所需压强：$T_\text{slip} = 2\times2.0 = 4.0\ \mathrm{kN\,m} = \mu p\,2\pi c^2L$，$c = 30\ \mathrm{mm}$，$L = 60\ \mathrm{mm}$：$p = 4.0\times10^{6}/(0.12\times2\pi\times900\times60) = 98.2\ \mathrm{MPa}$。过盈量：由$p = \tfrac{E\delta}{2c}(1 - c^2/b^2)$，$c/b = 0.5$，得$\delta = 2cp/(0.75E) = 2\times30\times98.2/(0.75\times200\,000) = 0.0393\ \mathrm{mm}$，直径过盈量约为$0.079\ \mathrm{mm}$——应选择一个**最小**过盈量超过此值的ISO 286标准配合。在该压强下轮毂内孔处的应力：$\sigma_\theta = p(b^2 + c^2)/(b^2 - c^2) = 98.2\times5/3 = 164\ \mathrm{MPa}$，$\sigma_r = -98\ \mathrm{MPa}$；特雷斯卡$\sigma_\theta - \sigma_r = 262\ \mathrm{MPa}$，对屈服的安全因数为$1.53$——但还必须校核所选配合的**最大**过盈量（可能是最小值的$1.5$–$2$倍），它可能引起屈服。其他考虑：轮齿和键槽削弱轮毂；配合压强集中在轮毂两端，引起轴的微动疲劳；高速时轮毂的离心扩张会降低压强；热瞬态可能使配合松动；装配温度不得使钢回火。实际的过盈配合要按标准（例如DIN 7190）设计并经试验验证。
:::
:::
