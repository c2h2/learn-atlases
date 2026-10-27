梁是一个方向上长的结构；**板**则是一个方向上薄的结构——一块承受垂直于其表面载荷的平板。水箱的底板、船舶甲板在加强筋之间的板、机翼在桁条之间的蒙皮、用螺栓固定在压力容器上的平盖板、硅压力传感器的膜片以及印制电路板，都是板。它们像梁一样靠弯曲承载，但同时在两个方向上弯曲，而且两个方向相互耦合：把一张纸沿一个方向弯曲，它在另一个方向上就变得难以弯曲。正是这种耦合——扭矩——使板比同跨度的一组平行梁更刚硬。

本章建立基尔霍夫（Kirchhoff）的经典薄板理论。它是欧拉-伯努利梁理论（[[mechanics-of-materials/beam-deflection]]）的二维对应：关于板如何变形的一个假设，把[[solid-mechanics/linear-elasticity]]中的三维弹性力学问题化为关于挠度$w(x, y)$的一个四阶偏微分方程。我们用双重傅里叶级数（纳维法）求解矩形板，用封闭形式求解圆板，然后用同一方程求出受压板何时屈曲——这是[[mechanics-of-materials/buckling]]中欧拉压杆问题的二维版本。

**符号规定。** 板的中面为$x$–$y$平面；$z$**向下**为正，挠度$w$和横向载荷$q$（单位面积上的力）也向下为正。板厚均匀为$t$，所以$-t/2 \le z \le t/2$。弯矩和剪力都是**单位边长上**的值（$\mathrm{N\,m/m}$和$\mathrm{N/m}$）。正弯矩使下表面（$z > 0$）受拉，如同梁中的正弯矩。

## 基尔霍夫假设与运动学

::: definition 基尔霍夫板 {#def-kirchhoff}
**基尔霍夫（薄）板**是这样一块平板：厚度$t$均匀且与跨度$a$相比很小（大致$t/a < 1/10$），材料为线弹性各向同性，横向挠度$w$与$t$相比很小，并且其变形满足：
1. 垂直于中面的直线保持为直线，垂直于变形后的中面且长度不变（无横向切应变，$\gamma_{xz} = \gamma_{yz} = 0$；$\varepsilon_z = 0$）；
2. 中面不伸长（无薄膜力）；
3. 正应力$\sigma_z$与面内应力相比可以忽略（每一层都处于平面应力状态）。
:::

第一个假设是"平截面保持为平面且垂直于轴线"在板中的版本。其推论是整个位移场都由$w$决定。$(x, y)$处的法线转过斜率$\partial w/\partial x$和$\partial w/\partial y$，所以深度$z$处的点在面内移动
$$
u = -z\frac{\partial w}{\partial x}, \qquad v = -z\frac{\partial w}{\partial y},
$$
而[[solid-mechanics/stress-strain-3d]]中的应变为
$$
\varepsilon_x = -z\frac{\partial^2 w}{\partial x^2}, \qquad \varepsilon_y = -z\frac{\partial^2 w}{\partial y^2}, \qquad \gamma_{xy} = -2z\frac{\partial^2 w}{\partial x\,\partial y}.
$$ {#eq-plate-strain}
三个量$\kappa_x = -\partial^2w/\partial x^2$、$\kappa_y = -\partial^2w/\partial y^2$和$\kappa_{xy} = -\partial^2w/\partial x\partial y$是中面的**曲率**和**扭率**。变形成马鞍形$w = cxy$的板在$x$和$y$方向都没有曲率，但有均匀的扭率：平行于$x$的直线保持为直线，但沿$y$移动时会转动。

## 弯矩与板的方程

::: proposition 弯矩-曲率关系 {#prop-moment-curvature}
在基尔霍夫板中，单位长度上的弯矩为
$$
M_x = -D\left(\frac{\partial^2w}{\partial x^2} + \nu\frac{\partial^2w}{\partial y^2}\right), \quad
M_y = -D\left(\frac{\partial^2w}{\partial y^2} + \nu\frac{\partial^2w}{\partial x^2}\right), \quad
M_{xy} = -D(1 - \nu)\frac{\partial^2w}{\partial x\,\partial y},
$$ {#eq-moments}
其中**弯曲刚度**为
$$
D = \frac{Et^3}{12(1 - \nu^2)} .
$$ {#eq-D}
应力沿厚度线性变化，在表面处最大：$\sigma_x = 12M_xz/t^3$，$\sigma_{x,\max} = 6M_x/t^2$，$\sigma_y$和$\tau_{xy}$类似。
:::

::: proof
每一层都处于平面应力状态，所以由胡克定律（[[solid-mechanics/linear-elasticity]]）和[[#eq-plate-strain]]
$$
\sigma_x = \frac{E}{1 - \nu^2}(\varepsilon_x + \nu\varepsilon_y) = -\frac{Ez}{1 - \nu^2}\left(w_{,xx} + \nu w_{,yy}\right), \qquad \tau_{xy} = G\gamma_{xy} = -\frac{Ez}{1 + \nu}w_{,xy},
$$
逗号表示求导。单位长度上的弯矩是应力沿厚度的一次矩，$M_x = \int_{-t/2}^{t/2}\sigma_xz\,dz$；由于$\int z^2\,dz = t^3/12$，得$M_x = -\frac{Et^3}{12(1 - \nu^2)}(w_{,xx} + \nu w_{,yy})$，$M_y$同理。对扭矩，利用$\frac{1}{1 + \nu} = \frac{1 - \nu}{1 - \nu^2}$，$M_{xy} = \int\tau_{xy}z\,dz = -\frac{Et^3}{12(1 + \nu)}w_{,xy} = -D(1 - \nu)w_{,xy}$。在$\sigma_x$和$M_x$的表达式之间消去$w$，得$\sigma_x = 12M_xz/t^3$。
:::

刚度$D$就是单位宽度的$EI$（$I = t^3/12$）再乘以$1/(1 - \nu^2)$——对金属约放大10 %。出现这个因子是因为板条不能自由地横向收缩（相邻的板条阻止它），所以它像在宽度方向处于平面应变状态那样弯曲。

::: theorem 板的方程 {#thm-plate}
弯曲刚度$D$均匀的基尔霍夫板在横向载荷$q(x, y)$作用下的挠度满足双调和方程
$$
\nabla^4w = \frac{\partial^4w}{\partial x^4} + 2\frac{\partial^4w}{\partial x^2\partial y^2} + \frac{\partial^4w}{\partial y^4} = \frac{q}{D}.
$$ {#eq-plate}
单位长度上的横向剪力为$Q_x = -D\,\partial(\nabla^2w)/\partial x$和$Q_y = -D\,\partial(\nabla^2w)/\partial y$。
:::

::: proof
取板的微元$dx\times dy$。其各边上作用着单位长度的弯矩$M_x$、$M_y$、$M_{xy}$和剪力$Q_x$、$Q_y$，上表面作用着载荷$q\,dx\,dy$。竖直方向平衡（剪力跨过微元有变化）：
$$
\frac{\partial Q_x}{\partial x} + \frac{\partial Q_y}{\partial y} + q = 0 .
$$
对平行于$y$的轴的力矩平衡（忽略$q$的高阶矩）：
$$
\frac{\partial M_x}{\partial x} + \frac{\partial M_{xy}}{\partial y} - Q_x = 0, \qquad\text{同理}\qquad \frac{\partial M_{xy}}{\partial x} + \frac{\partial M_y}{\partial y} - Q_y = 0 .
$$
把剪力代入第一个方程：
$$
\frac{\partial^2M_x}{\partial x^2} + 2\frac{\partial^2M_{xy}}{\partial x\,\partial y} + \frac{\partial^2M_y}{\partial y^2} + q = 0 .
$$
再代入[[#eq-moments]]：
$$
-D\bigl[w_{,xxxx} + \nu w_{,xxyy} + 2(1 - \nu)w_{,xxyy} + w_{,yyyy} + \nu w_{,xxyy}\bigr] + q = 0,
$$
含$\nu$的项相互抵消，剩下$D(w_{,xxxx} + 2w_{,xxyy} + w_{,yyyy}) = q$。剪力表达式由$Q_x = M_{x,x} + M_{xy,y} = -D(w_{,xxx} + \nu w_{,xyy} + (1 - \nu)w_{,xyy}) = -D(\nabla^2w)_{,x}$得到。该方程是$EIw'''' = q$在板中的对应；它在[[#def-kirchhoff]]的假设下成立，且在这些假设范围内是精确的。
:::

### 边界条件

四阶方程在每条边上需要两个条件。对边$x = $常数：

- **固支：** $w = 0$且$\partial w/\partial x = 0$。
- **简支：** $w = 0$且$M_x = 0$。由于沿该边$w = 0$，那里也有$w_{,yy} = 0$，所以第二个条件化为$\partial^2w/\partial x^2 = 0$。
- **自由：** 乍看有三个条件——$M_x = 0$、$Q_x = 0$和$M_{xy} = 0$——多了一个。基尔霍夫在1850年解决了这一问题：沿边分布的扭矩静力等效于单位长度上的竖向力$\partial M_{xy}/\partial y$（把每一小段$dy$上的力偶换成相距$dy$、大小为$M_{xy}$的两个反向竖向力；相邻的力相互抵消，只剩下它们的差）。正确的条件是$M_x = 0$和**等效（基尔霍夫）剪力**
$$
V_x = Q_x + \frac{\partial M_{xy}}{\partial y} = -D\left[\frac{\partial^3w}{\partial x^3} + (2 - \nu)\frac{\partial^3w}{\partial x\,\partial y^2}\right] = 0 .
$$
同样的替换在矩形板的角点处留下不平衡的集中力$2M_{xy}$。受均布载荷的简支矩形板必须由这些力把角点**压住**；若板只是搁在支座上，角点就会翘起。

## 矩形板：纳维解

对四边简支的矩形板$0 \le x \le a$、$0 \le y \le b$，双重正弦级数的每一项$\sin(m\pi x/a)\sin(n\pi y/b)$及其法向二阶导数在各边上都为零，所以自动满足两个简支条件。

::: theorem 纳维解 {#thm-navier}
把载荷展开为双重正弦级数，
$$
q(x, y) = \sum_{m=1}^\infty\sum_{n=1}^\infty q_{mn}\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}, \qquad q_{mn} = \frac{4}{ab}\int_0^a\!\!\int_0^b q\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}\,dy\,dx .
$$
简支板的挠度为
$$
w = \sum_{m,n}\frac{q_{mn}}{\pi^4D\left(\dfrac{m^2}{a^2} + \dfrac{n^2}{b^2}\right)^2}\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}.
$$
对均布载荷$q_0$，$m$和$n$均为奇数时$q_{mn} = 16q_0/(\pi^2mn)$，否则为零。
:::

::: proof
把一项$w_{mn}\sin(m\pi x/a)\sin(n\pi y/b)$代入[[#eq-plate]]。每次对$x$求导带出因子$m\pi/a$，每次对$y$求导带出$n\pi/b$，正弦函数求两次导数带出一个负号，所以
$$
\nabla^4 \to \pi^4\left[\left(\frac ma\right)^4 + 2\left(\frac ma\right)^2\left(\frac nb\right)^2 + \left(\frac nb\right)^4\right] = \pi^4\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right)^2.
$$
与载荷级数逐项比较系数即得$w_{mn}$。边界条件逐项成立，而解是唯一的（[[solid-mechanics/linear-elasticity]]），所以这就是解。对均布载荷，$\int_0^a\sin(m\pi x/a)\,dx = \frac{a}{m\pi}(1 - \cos m\pi)$，$m$为奇数时为$2a/(m\pi)$，$m$为偶数时为零；因此$q_{mn} = \frac{4q_0}{ab}\cdot\frac{2a}{m\pi}\cdot\frac{2b}{n\pi} = \frac{16q_0}{\pi^2mn}$。
:::

在均布载荷板的中心，$\sin(m\pi/2)\sin(n\pi/2) = \pm1$；挠度级数收敛很快（每项按$1/(mn(m^2 + n^2)^2)$衰减），弯矩级数收敛较慢（多一个因子$m^2$或$n^2$）。对**正方形**板（$a = b$），求和得
$$
w_{\max} = 0.00406\,\frac{q_0a^4}{D}, \qquad M_{x,\max} = M_{y,\max} = 0.0479\,q_0a^2 \quad (\nu = 0.3),
$$ {#eq-square}
这些数值见铁木辛柯（Timoshenko）与沃诺夫斯基-克里格（Woinowsky-Krieger）的表格。仅取第一项得$4/\pi^6 = 0.00416$，只偏高2.4 %。

::: example 正方形水箱壁板 {#ex-square}
一块$1.0\ \mathrm{m}\times1.0\ \mathrm{m}$、厚$10\ \mathrm{mm}$的正方形钢板四边简支，承受$10\ \mathrm{kPa}$的水压（约$1\ \mathrm{m}$水柱）。取$E = 200\ \mathrm{GPa}$，$\nu = 0.3$，求最大挠度和最大应力。
::: solution
$$
D = \frac{200\times10^{9}\times0.010^3}{12(1 - 0.09)} = 1.832\times10^{4}\ \mathrm{N\,m}.
$$
由[[#eq-square]]：
$$
w_{\max} = 0.00406\times\frac{10^{4}\times1.0^4}{1.832\times10^{4}} = 2.22\times10^{-3}\ \mathrm{m} = 2.22\ \mathrm{mm},
$$
$$
M_{\max} = 0.0479\times10^{4}\times1.0^2 = 479\ \mathrm{N\,m/m}, \qquad \sigma_{\max} = \frac{6M}{t^2} = \frac{6\times479}{0.010^2} = 28.7\ \mathrm{MPa}.
$$
合理性检查。(1) $w/t = 0.22$：足够小，线性理论适用；当$w/t$超过约0.5时，中面伸长，薄膜作用使板变刚，基尔霍夫理论会高估挠度。(2) 跨度$1\ \mathrm{m}$的简支**板条**（单位宽度的梁）挠度为$w = 5qa^4/(384D) = 7.11\ \mathrm{mm}$，弯矩为$M = qa^2/8 = 1250\ \mathrm{N\,m/m}$：双向板的挠度小69 %，弯矩小62 %，因为载荷由两个方向分担，扭矩也起了作用。(3) 角点需要压紧力$2M_{xy}$以防翘起。
:::
:::

### 长板与柱面弯曲

矩形板越长，其中心附近区域就越感觉不到短边：那里的挠度变得与长向坐标无关，板像跨越短向的板条一样弯曲——即**柱面弯曲**。只有$w = w(x)$时，板的方程变为$D\,d^4w/dx^4 = q$，即把$EI$换成$D$的梁方程。板条在宽度方向处于平面应变状态，所以尽管它在长度方向不弯曲，也沿长度方向承受弯矩$M_y = \nu M_x$。纳维系数很快趋近板条的值：

| $b/a$（长边/短边） | $1$ | $1.5$ | $2$ | $3$ | $5$ | $\infty$（板条） |
|---|---|---|---|---|---|---|
| $w_{\max}D/(q_0a^4)$ | $0.00406$ | $0.00772$ | $0.01013$ | $0.01223$ | $0.01297$ | $5/384 = 0.01302$ |
| $M_{x,\max}/(q_0a^2)$（短跨） | $0.0479$ | $0.0812$ | $0.1017$ | $0.1189$ | $0.1246$ | $1/8 = 0.125$ |
| $M_{y,\max}/(q_0a^2)$（长跨） | $0.0479$ | $0.0498$ | $0.0464$ | $0.0406$ | $0.0377$ | $\nu/8 = 0.0375$ |

（四边简支，均布载荷，$\nu = 0.3$，$a$为**短**边；数值由纳维级数求和至收敛得到。）到$b/a = 3$时，板与板条的差别已在6 %以内。这就是为什么紧密布置的加强筋之间的船体板和水箱板通常按跨越加强筋间距的板条设计。

::: example 加强筋之间的甲板 {#ex-deck}
钢甲板（$E = 200\ \mathrm{GPa}$，$\nu = 0.3$）厚$8\ \mathrm{mm}$，纵向加强筋间距$600\ \mathrm{mm}$，横向肋骨间距$1200\ \mathrm{mm}$，承受$20\ \mathrm{kPa}$的均布压强。把各边视为简支，求最大挠度和最大应力，并与板条近似比较。
::: solution
$D = 200\times10^{9}\times0.008^3/(12\times0.91) = 9377\ \mathrm{N\,m}$。$b/a = 2$，$a = 0.6\ \mathrm{m}$：
$$
w_{\max} = 0.01013\times\frac{2\times10^{4}\times0.6^4}{9377} = 2.80\times10^{-3}\ \mathrm{m} = 2.80\ \mathrm{mm},
$$
$$
M_{x,\max} = 0.1017\times2\times10^{4}\times0.6^2 = 732\ \mathrm{N\,m/m}, \qquad \sigma_{\max} = \frac{6\times732}{0.008^2} = 68.6\ \mathrm{MPa}.
$$
板条近似给出$w = 5qa^4/384D = 3.60\ \mathrm{mm}$和$\sigma = 6(qa^2/8)/t^2 = 84.4\ \mathrm{MPa}$：在这一长宽比下，应力偏于安全23 %，而且更简单。合理性检查：$w/t = 0.35$，接近小挠度理论的上限；压强更高时会产生薄膜拉力，真实的挠度和弯曲应力会低于这些线性值。实际上甲板在加强筋处往往更接近固支（相邻板格对称挠曲），这会降低跨中应力，但提高加强筋线处的应力；船级社规范规定了采用哪一种。
:::
:::

::: widget surface
f: sin(m*pi*x/3)*sin(pi*y)
x: 0, 3
y: 0, 1
sliders: m=1:1:6:1
color: height
resolution: 50
caption: $a/b = 3$的简支板的挠曲形状$\sin(m\pi x/a)\sin(\pi y/b)$——纳维级数中的一项，同时也是同一块板的一个屈曲模态（见下文）。拖动可旋转，把$m$从1逐步调到6。均布载荷主要激发$m = 1$；而在沿$x$的压缩下，这块板屈曲成$m = 3$个近似正方形的半波，因为短波在$y$方向耗费的弯曲能比长波少。
:::

## 圆板

对轴对称圆板，拉普拉斯算子为$\nabla^2 = \frac{1}{r}\frac{d}{dr}\left(r\frac{d}{dr}\right)$，板的方程成为可以直接积分的常微分方程：
$$
\frac{1}{r}\frac{d}{dr}\left\{r\frac{d}{dr}\left[\frac{1}{r}\frac{d}{dr}\left(r\frac{dw}{dr}\right)\right]\right\} = \frac{q}{D}.
$$ {#eq-circular}
径向弯矩和环向弯矩为$M_r = -D\left(w'' + \nu w'/r\right)$和$M_\theta = -D\left(w'/r + \nu w''\right)$。

::: proposition 均布载荷圆板 {#prop-circular}
半径为$a$、受均布压强$q$的实心圆板，其挠度和弯矩如下。

**固支边：**
$$
w = \frac{q(a^2 - r^2)^2}{64D}, \qquad w_{\max} = \frac{qa^4}{64D}, \qquad M_r(a) = -\frac{qa^2}{8}, \qquad M_r(0) = M_\theta(0) = \frac{(1 + \nu)qa^2}{16}.
$$
最大应力在边缘：$\sigma_{r,\max} = \dfrac{3qa^2}{4t^2}$（上表面受拉）。

**简支边：**
$$
w = \frac{q(a^2 - r^2)}{64D}\left(\frac{5 + \nu}{1 + \nu}a^2 - r^2\right), \qquad w_{\max} = \frac{(5 + \nu)qa^4}{64(1 + \nu)D}, \qquad M_{\max} = M_r(0) = \frac{(3 + \nu)qa^2}{16},
$$
最大应力在中心，$\sigma_{\max} = \dfrac{3(3 + \nu)qa^2}{8t^2}$。
:::

::: proof
对[[#eq-circular]]积分四次，在需要时先乘以$r$再积分：
$$
w = \frac{qr^4}{64D} + C_1r^2\ln r + C_2r^2 + C_3\ln r + C_4 .
$$
在实心板中，$r = 0$处的转角和弯矩必须有限，这排除了$C_1$和$C_3$。所以$w = qr^4/64D + C_2r^2 + C_4$。

固支：$w'(a) = qa^3/16D + 2C_2a = 0$给出$C_2 = -qa^2/32D$；$w(a) = 0$给出$C_4 = qa^4/64D$。因此$w = q(r^4 - 2a^2r^2 + a^4)/64D = q(a^2 - r^2)^2/64D$。于是$w' = -qr(a^2 - r^2)/16D$，$w'' = -q(a^2 - 3r^2)/16D$；在$r = a$处，$w' = 0$，$w'' = qa^2/8D$，所以$M_r = -qa^2/8$；在$r = 0$处，$w'' = w'/r = -qa^2/16D$，所以$M_r = M_\theta = (1 + \nu)qa^2/16$。对所有$\nu < 1$，边缘弯矩的绝对值都更大，由$\sigma = 6M/t^2$得$3qa^2/4t^2$。

简支：$w(a) = 0$且$M_r(a) = 0$。由$w' = qr^3/16D + 2C_2r$和$w'' = 3qr^2/16D + 2C_2$，$r = a$处的弯矩条件为$\frac{3qa^2}{16D} + 2C_2 + \nu\left(\frac{qa^2}{16D} + 2C_2\right) = 0$，所以$C_2 = -\frac{(3 + \nu)qa^2}{32(1 + \nu)D}$，再由$w(a) = 0$确定$C_4$；整理各项即得所述的$w$。在中心$w'' = w'/r = 2C_2$，所以$M_r = M_\theta = -D(1 + \nu)2C_2 = (3 + \nu)qa^2/16$。
:::

::: widget plot
f: (1 - x^2)^2; (1 - x^2)*((5 + nu)/(1 + nu) - x^2)
x: 0, 1
y: 0, 4.5
sliders: nu=0.3:0:0.5:0.01
labels: \text{固支}; \text{简支}
caption: 均布载荷圆板的挠度（以$qa^4/64D$为单位）随$r/a$的变化。固支板的中心挠度为1；简支板为$(5 + \nu)/(1 + \nu)$，$\nu = 0.3$时约为4.1。注意$r/a = 1$处的斜率：固支板为零，那里存在很大的边缘弯矩；简支板则很陡，其最大弯矩在中心。实际的螺栓连接盖板介于两条曲线之间。
:::

::: example 固支检查盖板 {#ex-cover}
半径$a = 150\ \mathrm{mm}$、厚$t = 12\ \mathrm{mm}$的圆形平钢盖板，周边实际上可视为固支，承受$0.5\ \mathrm{MPa}$的压强（$E = 200\ \mathrm{GPa}$，$\nu = 0.3$）。求中心挠度和最大应力，并与简支盖板比较。
::: solution
$$
D = \frac{200\times10^{9}\times0.012^3}{12\times0.91} = 3.165\times10^{4}\ \mathrm{N\,m}.
$$
固支：
$$
w_{\max} = \frac{qa^4}{64D} = \frac{0.5\times10^{6}\times0.15^4}{64\times3.165\times10^{4}} = 1.25\times10^{-4}\ \mathrm{m} = 0.125\ \mathrm{mm},
$$
$$
\sigma_{\max} = \frac{3qa^2}{4t^2} = \frac{3\times0.5\times150^2}{4\times12^2} = 58.6\ \mathrm{MPa}\ \text{（在边缘）}, \qquad \sigma(0) = \frac{6}{t^2}\cdot\frac{1.3\,qa^2}{16} = 38.1\ \mathrm{MPa}.
$$
简支：$w_{\max} = \tfrac{5.3}{1.3}\times0.125 = 0.509\ \mathrm{mm}$，$\sigma_{\max} = 3(3.3)qa^2/8t^2 = 96.7\ \mathrm{MPa}$，在中心。

合理性检查：$w/t = 0.01$，完全处于小挠度范围。两种理想化把实际的螺栓连接盖板夹在中间；设计者会用简支值计算中心应力，用固支值计算边缘应力，因为它们分别是各自位置上的最不利情况。压力容器上的平盖按适用的规范设计（例如ASME《锅炉及压力容器规范》第VIII卷），规范公式体现了这些结果并含有考虑连接细节的系数；这类零件的压力试验由经过培训的人员按规范进行。
:::
:::

::: warning 平板是低效的承压边界——而且理论有其局限
平板靠弯曲承受压强，其应力按$(a/t)^2$变化；而曲面壳靠薄膜拉力承受压强，应力按$a/t$变化（[[solid-mechanics/thick-cylinders-discs]]）。对[[#ex-cover]]中的盖板，相同半径和厚度的半球形封头只承受$pa/2t = 3.1\ \mathrm{MPa}$，比平板的$58.6\ \mathrm{MPa}$小将近二十倍。这就是容器封头做成碟形的原因。使用板的公式时有两种常见错误：(1) 在$w$与$t$相比并不小时使用——薄膜片很快就会产生线性理论所忽略的薄膜应力；(2) 用于厚板（$t/a > 0.1$）或集中载荷附近，那里横向剪切变形（明德林-赖斯纳（Mindlin–Reissner）理论）和三维效应很重要。每次都要检查$w/t$和$t/a$。
:::

## 受压板的屈曲

在自身平面内受单位长度压力$N_x$作用的薄板保持平直，直到载荷达到某个临界值，此时一个相邻的弯曲平衡状态成为可能。分析方法与欧拉压杆（[[mechanics-of-materials/buckling]]）相同：在微弯状态下，经由曲率作用的面内力附加了一个横向载荷$-N_x\,\partial^2w/\partial x^2$（以压为正），所以
$$
D\nabla^4w + N_x\frac{\partial^2w}{\partial x^2} = 0 .
$$ {#eq-buckling}

::: theorem 简支板的屈曲 {#thm-plate-buckling}
长度为$a$（沿载荷方向）、宽度为$b$、四边简支并沿$x$均匀受压的矩形板，在下列应力时屈曲：
$$
\sigma_{cr} = \frac{N_{x,cr}}{t} = k\,\frac{\pi^2E}{12(1 - \nu^2)}\left(\frac tb\right)^2, \qquad k = \min_{m = 1, 2, \dots}\left(\frac{mb}{a} + \frac{a}{mb}\right)^2,
$$
其中$m$为沿长度方向的半波数。当$a/b \ge 1$时，$k$永远不低于4，且只要$a/b$为整数就等于4；板屈曲成近似正方形的半波。
:::

::: proof
试取$w = W\sin(m\pi x/a)\sin(n\pi y/b)$，它满足简支条件。代入[[#eq-buckling]]：
$$
D\pi^4\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right)^2 - N_x\frac{m^2\pi^2}{a^2} = 0 \quad\Rightarrow\quad N_x = \frac{D\pi^2a^2}{m^2}\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right)^2 .
$$
$N_x$随$n$增大，所以最低载荷对应$n = 1$（沿宽度一个半波）。取$n = 1$整理，
$$
N_x = \frac{\pi^2D}{b^2}\left(\frac{mb}{a} + \frac{a}{mb}\right)^2,
$$
临界值是对整数$m$取的最小值。除以$t$并代入$D = Et^3/12(1 - \nu^2)$即得$\sigma_{cr}$。对固定的$m$，$k(\beta) = (m/\beta + \beta/m)^2$（$\beta = a/b$）在$\beta = m$处取最小值4（由不等式$u + 1/u \ge 2$）。$m$与$m + 1$的曲线在$m/\beta + \beta/m = (m + 1)/\beta + \beta/(m + 1)$处相交，即$\beta = \sqrt{m(m + 1)}$：$\sqrt2$、$\sqrt6$、$\sqrt{12}$、…
:::

::: widget plot
f: (1/x + x)^2; (2/x + x/2)^2; (3/x + x/3)^2; (4/x + x/4)^2
x: 0.3, 5
y: 0, 12
labels: m = 1; m = 2; m = 3; m = 4
hlines: 4
caption: 单向受压简支板的屈曲系数$k$随长宽比$a/b$的变化，每个半波数$m$对应一条曲线。板以最低的模态屈曲，所以真实的$k$是下包络线——一条在$a/b = 1, 2, 3, 4$处触及$k = 4$的花彩形曲线。$a/b \approx 1$以后，$k$保持在4到4.5之间：长板的屈曲应力取决于其**宽度**，而不是长度。短板（$a/b < 1$）强得多，趋近于宽柱的行为。
:::

这一结果是加筋壁板设计的基础：桁条或加强筋把蒙皮分成若干板格，其**宽度**$b$控制$\sigma_{cr}$。与压杆比较：一根宽$b$、长$a$、两侧边自由的板条会在$\pi^2E/12(1 - \nu^2)\cdot(t/a)^2$时屈曲（$k = 1$，并以长度代替宽度）——当$a > b$时低得多。支承住长边就改变了一切。其他边界条件给出其他的$k$值：加载边简支、长边固支时约为6.97，一条长边自由时（外伸翼缘）约为0.43。

与压杆不同，板在屈曲载荷下并不崩溃。屈曲后，靠近被支承边、不能发生挠曲的材料继续承受不断增大的应力，而中部则卸去载荷。冯·卡门（von Kármán）的**有效宽度**概念把应力不均匀的板替换为边缘处承受边缘应力的两条窄条；薄壁钢和铝构件以及飞机蒙皮壁板的设计规范有意利用了这种**屈曲后储备强度**。

::: example 飞机蒙皮壁板 {#ex-skin}
铝合金机翼蒙皮（$E = 70\ \mathrm{GPa}$，$\nu = 0.33$）厚$1.5\ \mathrm{mm}$，由间距$150\ \mathrm{mm}$的桁条和间距$450\ \mathrm{mm}$的翼肋支承。把板格视为简支，求其屈曲时的压应力，并与只在翼肋处支承的同样蒙皮的板条比较。
::: solution
$a/b = 450/150 = 3$，为整数，所以$k = 4$，沿板格有$m = 3$个半波：
$$
\sigma_{cr} = 4\times\frac{\pi^2\times70\,000}{12(1 - 0.33^2)}\left(\frac{1.5}{150}\right)^2 = 4\times6.461\times10^{4}\times10^{-4} = 25.8\ \mathrm{MPa}.
$$
只在翼肋处支承的板条相当于长$450\ \mathrm{mm}$的宽柱（$k = 1$，以$a$代替$b$）：$\sigma_{cr} = 6.461\times10^{4}\times(1.5/450)^2 = 0.72\ \mathrm{MPa}$——低36倍。正是桁条使薄蒙皮能够承受压缩。

合理性检查：$25.8\ \mathrm{MPa}$远低于该合金的屈服强度（数百MPa），所以这块蒙皮在不大的载荷下就会弹性屈曲。在许多设计中这是有意为之：蒙皮在使用中屈曲，由桁条及其旁边蒙皮的有效宽度承受压缩，并校核卸载后蒙皮能否弹性恢复。飞机壁板凭试验证据按适航规章进行审定；这一计算是设计的起点，而不是设计本身。
:::
:::

::: history
板的方程有一段不寻常的历史。1809年，法国科学院悬赏征求一种数学理论，用以解释恩斯特·克拉德尼（Ernst Chladni）通过在振动板上撒沙而显示出来的振动图形（发表于1787年）。索菲·热尔曼（Sophie Germain）于1816年获奖，她的理论经拉格朗日（Lagrange）修正后的最终方程是正确的，尽管她的推导有缺陷。纳维（Navier）于1820年给出了简支矩形板的双重级数解。古斯塔夫·基尔霍夫（Gustav Kirchhoff）1850年的论文为这一理论奠定了现代基础——[[#def-kirchhoff]]中的假设、由能量出发的推导，以及自由边边界条件的解决。布赖恩（G. H. Bryan）于1891年得到了受压简支板的屈曲载荷；西奥多·冯·卡门（Theodore von Kármán）、塞克勒（E. E. Sechler）和唐奈尔（L. H. Donnell）于1932年在薄壁金属飞机的推动下，提出了屈曲后板的有效宽度方法。
:::

::: quiz
一块宽为$b$的长简支板在$\sigma_{cr}$下受压屈曲。若其厚度加倍，屈曲应力变为
- [ ] $2\sigma_{cr}$
- [x] $4\sigma_{cr}$
- [ ] $8\sigma_{cr}$
::: solution
$\sigma_{cr} \propto (t/b)^2$，所以$t$加倍使其乘以4。（单位宽度上的屈曲**载荷**$N_{cr} = \sigma_{cr}t$提高到8倍，因为$D \propto t^3$。）
:::
:::

::: quiz
为什么受均布压强的简支矩形板的角点有翘起的趋势？
- [ ] 因为角点处的压强更大。
- [x] 因为沿边的扭矩静力等效于边缘剪力加上角点集中力，必须通过压住角点来平衡这些力。
- [ ] 因为泊松比使角点收缩。
::: solution
基尔霍夫边界条件把$M_{xy}$替换为沿边的等效剪力$\partial M_{xy}/\partial y$加上每个角点处的集中力$2M_{xy}$。对均布载荷板，支座必须沿载荷方向把角点向下拉住；没有这个压紧力，角点就会离开支座翘起。
:::
:::

::: summary
- 基尔霍夫板理论：薄板、小挠度、法线保持为直线并垂直于中面；一切都由挠度$w(x, y)$决定。
- 单位长度上的弯矩：$M_x = -D(w_{,xx} + \nu w_{,yy})$，$M_{xy} = -D(1 - \nu)w_{,xy}$，其中$D = Et^3/12(1 - \nu^2)$；表面应力为$6M/t^2$。
- 平衡给出$D\nabla^4w = q$。每条边两个条件：固支（$w = w_{,n} = 0$）、简支（$w = M_n = 0$）、自由（$M_n = 0$且基尔霍夫剪力$V_n = 0$）；矩形板有角点力$2M_{xy}$。
- 纳维解：简支矩形板用双重正弦级数；均布载荷正方形板$w_{\max} = 0.00406qa^4/D$，$M_{\max} = 0.0479qa^2$（$\nu = 0.3$）。
- 均布载荷圆板：固支时$w_{\max} = qa^4/64D$，边缘应力$3qa^2/4t^2$；简支时$w_{\max} = (5 + \nu)qa^4/64(1 + \nu)D$，中心应力$3(3 + \nu)qa^2/8t^2$。
- 平板承受压强的效率低（应力$\propto (a/t)^2$）——因此采用碟形封头。
- 压缩屈曲：$\sigma_{cr} = k\pi^2E(t/b)^2/12(1 - \nu^2)$，长简支板$k = 4$；板具有屈曲后强度。
:::

## 习题

::: exercise 玻璃板的弯曲刚度 {level=1 check="800"}
一块玻璃板厚$5\ \mathrm{mm}$，$E = 72\ \mathrm{GPa}$，$\nu = 0.25$。求其弯曲刚度。（以N m为单位输入$D$。）
::: solution
$D = Et^3/12(1 - \nu^2) = 72\times10^{9}\times(0.005)^3/(12\times0.9375) = 9000/11.25 = 800\ \mathrm{N\,m}$。
:::
:::

::: exercise 固支膜片 {level=1 check="0.3125"}
半径$0.2\ \mathrm{m}$、弯曲刚度$D = 800\ \mathrm{N\,m}$的固支圆板承受$10\ \mathrm{kPa}$的均布压强。求其中心挠度。（以mm为单位输入。）
::: solution
$w_{\max} = qa^4/64D = 10^{4}\times0.0016/(64\times800) = 3.125\times10^{-4}\ \mathrm{m} = 0.3125\ \mathrm{mm}$。取$t = 5\ \mathrm{mm}$（上题的玻璃板），$w/t = 0.06$：小挠度理论适用。
:::
:::

::: exercise 哪个屈曲模态？ {level=1 check="2"}
一块$a/b = 1.5$的简支板沿其长度$a$受压。屈曲时沿长度形成多少个半波$m$？（输入$m$。）
::: solution
$k(m = 1) = (1/1.5 + 1.5)^2 = 4.694$；$k(m = 2) = (2/1.5 + 1.5/2)^2 = (25/12)^2 = 4.340$；$k(m = 3) = (2 + 0.5)^2 = 6.25$。最小值在$m = 2$，与$m = 1$和$m = 2$在$a/b = \sqrt2 = 1.414$处的交点一致。
:::
:::

::: exercise 固支与简支的比较 {level=2 check="4.2"}
对$\nu = 0.25$的材料制成的均布载荷圆板，求简支时与固支时中心挠度之比。（输入比值。）
::: solution
$\dfrac{(5 + \nu)/(1 + \nu)}{1} = \dfrac{5.25}{1.25} = 4.2$。固支边使板的刚度提高到四倍以上。
:::
:::

::: exercise 固支板的边缘应力 {level=2 check="60"}
半径$100\ \mathrm{mm}$、厚$5\ \mathrm{mm}$的固支圆板承受$0.2\ \mathrm{MPa}$。求最大弯曲应力。（以MPa为单位输入。）
::: solution
在边缘，$\sigma = 3qa^2/4t^2 = 3\times0.2\times100^2/(4\times25) = 60\ \mathrm{MPa}$，在受载（上）表面受拉。
:::
:::

::: exercise 纳维级数的一项 {level=2 check="4/pi^6"}
只用纳维解的$m = n = 1$项，求均布载荷简支正方形板的中心挠度，写成$w = c\,q_0a^4/D$的形式。（输入精确系数$c$，例如用含pi的表达式。）
::: solution
$q_{11} = 16q_0/\pi^2$，$\pi^4D(1/a^2 + 1/a^2)^2 = 4\pi^4D/a^4$，所以$w_{11} = \frac{16q_0}{\pi^2}\cdot\frac{a^4}{4\pi^4D} = \frac{4}{\pi^6}\frac{q_0a^4}{D}$，即$c = 4/\pi^6 = 0.004161$，而收敛值为$0.004062$——偏高2.4 %，因为中心处其余各项正负交替而部分抵消。
:::
:::

::: exercise 由能量法推导固支板的解 {level=3}
对受均布压强的固支圆板，假设$w = W(1 - r^2/a^2)^2$，它满足两个固支条件。轴对称板的弯曲应变能为
$$
U = \pi D\int_0^a\left[(w'')^2 + \frac{(w')^2}{r^2} + \frac{2\nu w'w''}{r}\right]r\,dr .
$$
用最小势能原理（[[solid-mechanics/energy-methods]]）求$W$，并解释为什么结果是精确的。
::: solution
令$\xi = r/a$：$w' = -4W\xi(1 - \xi^2)/a$，$w'' = -4W(1 - 3\xi^2)/a^2$。于是$U = \frac{16\pi DW^2}{a^2}\int_0^1\left[(1 - 3\xi^2)^2 + (1 - \xi^2)^2 + 2\nu(1 - \xi^2)(1 - 3\xi^2)\right]\xi\,d\xi$。各积分（均从0到1）为$\int(1 - 3\xi^2)^2\xi\,d\xi = \tfrac12 - \tfrac32 + \tfrac32 = \tfrac12$，$\int(1 - \xi^2)^2\xi\,d\xi = \tfrac12 - \tfrac12 + \tfrac16 = \tfrac16$，以及$\int(1 - \xi^2)(1 - 3\xi^2)\xi\,d\xi = \int(\xi - 4\xi^3 + 3\xi^5)\,d\xi = \tfrac12 - 1 + \tfrac12 = 0$。所以$U = \frac{16\pi DW^2}{a^2}\cdot\frac23 = \frac{32\pi DW^2}{3a^2}$，与$\nu$无关。载荷做的功为$\int_0^aqw\,2\pi r\,dr = 2\pi qa^2W\int_0^1(1 - \xi^2)^2\xi\,d\xi = \pi qa^2W/3$。使$\Pi = U - \pi qa^2W/3$最小：$\frac{64\pi DW}{3a^2} = \frac{\pi qa^2}{3}$，所以$W = qa^4/64D$——这是精确结果，因为所设形状**就是**精确的挠曲形状（[[#prop-circular]]），而只要精确解属于试函数族，里茨法就给出精确解。
:::
:::

::: exercise 选择桁条间距 {level=3}
厚$2.0\ \mathrm{mm}$的铝合金蒙皮（$E = 70\ \mathrm{GPa}$，$\nu = 0.33$，$\sigma_Y = 300\ \mathrm{MPa}$）在压应力低于$60\ \mathrm{MPa}$时不得屈曲（这是结构设计者选定的设计条件）。翼肋间距为$500\ \mathrm{mm}$。(a) 若把板格视为简支且$k = 4$，最大桁条间距$b$是多少？(b) 宽$1.2\ \mathrm{m}$的蒙皮于是需要多少根桁条？(c) 讨论还有哪些因素限制这一选择：桁条自身的屈曲、铆钉间距、质量，以及允许蒙皮在限制载荷之前屈曲是否可以接受。
::: solution
(a) $60 = 4\times\frac{\pi^2\times70\,000}{12(1 - 0.1089)}\left(\frac{2.0}{b}\right)^2 = 2.584\times10^{5}\times\frac{4}{b^2}$，所以$b^2 = 1.034\times10^{6}/60 = 1.723\times10^{4}$，$b = 131\ \mathrm{mm}$。翼肋间距给出$a/b = 3.8$，所以$k$与4相差在百分之几以内。✓
(b) $1200/131 = 9.2$个板格，所以取10个板格、9根内部桁条（间距$120\ \mathrm{mm}$），另加两侧边缘的翼梁。
(c) 好的回答会指出：桁条自身必须能抵抗翼肋之间的压杆屈曲（欧拉公式，计入所连蒙皮的有效宽度）以及其翼缘的局部屈曲（外伸翼缘$k \approx 0.43$）；铆钉间距必须足够小，以防蒙皮发生铆钉间屈曲；桁条越多，质量和成本越高，所以最优方案要在蒙皮厚度与桁条数量之间权衡（蒙皮更厚、间距更大，总体上往往更轻）；而且由于屈曲后储备强度，许多飞机设计允许蒙皮在超过限制载荷的某一比例后屈曲，前提是卸载后屈曲波消失，并校核铆钉线处的疲劳。最终尺寸须凭试验证据按适航规章确定。
:::
:::
