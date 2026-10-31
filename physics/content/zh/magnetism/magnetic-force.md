电荷受到的静电力只取决于电荷在哪里，与它运动得多快无关。电流却能做一件静止电荷做不到的事：把指南针放在载流导线附近，导线一通电指针就会摆动，而电流就是运动中的电荷。解释这一现象的力就是**磁力**。磁力垂直于它所作用的电荷的速度，所以它只弯折轨迹而不改变速率。正是这一条几何事实产生了圆轨道、螺旋路线、导线受到的侧向力，以及线圈受到的力矩。

叉积与它的右手定则都沿用 [[mechanics/units-vectors]]。牛顿第二定律见 [[mechanics/newton-laws]]，电场见 [[electrostatics/electric-field]]。本章把磁场 $\mathbf{B}$（磁感应强度）当作已知的。电流如何产生 $\mathbf{B}$，见 [[magnetism/biot-savart]]。$\mathbf{B}$ 的单位是特斯拉：$1\,\mathrm{T} = 1\,\mathrm{N}/(\mathrm{A\cdot m})$。达到一特斯拉的磁场属于强实验室磁场。地球表面的磁场量级为 $10^{-4}\,\mathrm{T}$。

## 洛伦兹力

::: definition 洛伦兹力 {#def-lorentz}
电荷为 $q$ 的粒子以速度 $\mathbf{v}$ 在电场 $\mathbf{E}$ 和磁场 $\mathbf{B}$ 中运动，受到的力为

$$
\mathbf{F} = q\left(\mathbf{E} + \mathbf{v}\times\mathbf{B}\right).
$$ {#eq-lorentz}

仅有磁力部分的大小为

$$
F_{\mathrm{m}} = \abs{q}\, v B \sin\theta,
$$ {#eq-lorentz-mag}

其中 $\theta$ 是把两个向量尾尾相接放置时 $\mathbf{v}$ 与 $\mathbf{B}$ 之间的夹角。$\mathbf{v}\times\mathbf{B}$ 的方向由右手定则给出：右手四指沿 $\mathbf{v}$，朝 $\mathbf{B}$ 弯曲；拇指就指向 $\mathbf{v}\times\mathbf{B}$。正电荷受到的力沿那个方向。负电荷受到的力与之相反。
:::

有几个情形从[[#eq-lorentz-mag]]一眼就能看出。静止的电荷不受磁力。速度平行或反平行于 $\mathbf{B}$ 的电荷同样不受力，因为 $\sin\theta = 0$。中性粒子也不受力。把 $q$、$v$ 或 $B$ 加倍，或把斜交角换成直角，力的大小就按公式所说的方式缩放；但这些操作本身并不能替你决定方向。方向是独立的一步，忘记 $q$ 的符号时出错的正是要走的这一步。

电力部分与磁力部分地位不同。电力相对 $\mathbf{v}$ 可以指向任何方向。磁力则受到约束。

::: proposition 磁力不做功 {#prop-nowork}
设 $\mathbf{F}_{\mathrm{m}} = q\,\mathbf{v}\times\mathbf{B}$ 是作用在粒子上的磁力。则每一时刻都有 $\mathbf{F}_{\mathrm{m}}\cdot\mathbf{v} = 0$。若没有其他力做功，粒子的动能与速率都保持不变。只要力的规律是[[#eq-lorentz]]，这个结论对任何磁场都成立——均匀与否、恒定还是变化都一样。
:::

::: proof
标量三重积 $(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v}$ 为零，因为 $\mathbf{v}\times\mathbf{B}$ 垂直于 $\mathbf{v}$。于是磁力的瞬时功率为

$$
P_{\mathrm{m}} = \mathbf{F}_{\mathrm{m}}\cdot\mathbf{v} = q(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v} = 0.
$$

对质量恒定的粒子，动能 $K = \tfrac12 m v^2$ 的导数是 $\mathrm{d}K/\mathrm{d}t = m\mathbf{v}\cdot\mathbf{a}$。牛顿第二定律说 $m\mathbf{a}$ 就是合力，所以 $\mathrm{d}K/\mathrm{d}t = \mathbf{F}\cdot\mathbf{v}$。若唯一的力是磁力，则 $\mathrm{d}K/\mathrm{d}t = 0$。$K$ 恒定就意味着速率恒定。$\mathbf{v}$ 的方向并不受这一论证的约束，而且一般而言它会改变。
:::

电场，或任何沿 $\mathbf{v}$ 有分量的其他力，仍然能够改变速率。磁场可以在这一过程中改变方向。它做不到的，是单独从能量账本中取走一份。

::: warning 磁力、导线与功
[[#prop-nowork]] 说的是 $\mathbf{B}$ 对自由电荷不做功，因为 $\mathbf{F}_{\mathrm{m}}$ 垂直于 $\mathbf{v}$。磁场不能给粒子加速，也不能给它减速，只能改变它的方向。载流导线仍然可以沿导轨被推动，导线也可以获得动能。这与那条结论并不矛盾。导线中的电荷被约束在金属内部，作用在这些电荷上的磁力通过约束力交给了晶格，而晶格在运动。能量不是来自 $\mathbf{B}$ 对漂移电荷做的功，而是来自电池，或者来自导线运动时维持电流的某种机构。不要说 $\mathbf{B}$ 对漂移电荷做了功。
:::

一旦出现电动机或导轨，这个区别就重要了。导线受到的力是真实的，对导线做的机械功也是真实的。付这笔账的电磁学机制，要把感应包括进来才看得清，那是 [[magnetism/faraday]]。在那之前，保险的说法就是上面 warning 里的那一句：磁力只改变方向；它不给自由粒子输送能量。

一个 $v = 3.00 \times 10^{5}\,\mathrm{m/s}$ 的质子垂直穿过 $B = 0.200\,\mathrm{T}$ 的磁场，受到的

$$
F_{\mathrm{m}} = e v B = (1.602176634 \times 10^{-19})(3.00 \times 10^{5})(0.200) = 9.61 \times 10^{-15}\,\mathrm{N}.
$$

取 $m_{\mathrm{p}} = 1.6726219 \times 10^{-27}\,\mathrm{kg}$、$g = 9.80\,\mathrm{m/s^2}$，它的重力为 $m_{\mathrm{p}} g = 1.64 \times 10^{-26}\,\mathrm{N}$。磁力比重力大 $5.86 \times 10^{11}$ 倍。对这条轨道来说重力可以忽略，这就是下面的轨迹只用洛伦兹力计算的原因。速率只有光速的 $v/c = 1.00 \times 10^{-3}$，其中 $c = 2.99792458 \times 10^{8}\,\mathrm{m/s}$，所以牛顿第二定律的非相对论形式就是正确的力学。

## 圆轨道与螺旋轨道

均匀磁场把转向这件事做得最干净。这里没有特别的位置，只有一个特别的方向，即 $\mathbf{B}$ 的方向。

::: theorem 回旋运动 {#thm-cyclotron}
电荷为 $q$、质量为 $m$、速率为 $v$ 的粒子在均匀磁场 $\mathbf{B}$ 中运动，$\mathbf{v}$ 垂直于 $\mathbf{B}$ 且没有电场。轨道是半径为

$$
R = \frac{m v}{\abs{q}\, B},
$$ {#eq-radius}

的圆，粒子以恒定速率绕行。角频率与周期为

$$
\omega = \frac{\abs{q}\, B}{m}, \qquad T = \frac{2\pi m}{\abs{q}\, B}.
$$ {#eq-cyclotron}

这个角频率就是**回旋频率**。它不依赖 $v$，也不依赖 $R$。
:::

::: proof
由[[#prop-nowork]]速率恒定，所以加速度纯粹沿路径的法向。一个大小恒定、永远垂直于速度的力产生匀速圆周运动：磁力提供了 [[mechanics/newton-laws]] 所需要的向心力。用大小写出

$$
\frac{m v^2}{R} = \abs{q}\, v B,
$$

因为 $\sin\theta = 1$。约去一个不为零的因子 $v$，解出 $R$ 就得到 [[#eq-radius]]。角频率是速率除以半径，

$$
\omega = \frac{v}{R} = \frac{\abs{q}\, B}{m}.
$$

周期是周长除以速率，$T = 2\pi R/v = 2\pi/\omega$，这就是 [[#eq-cyclotron]]。速率约掉了。更快的粒子在同样的时间里走过更大的圆。
:::

旋转的转向由右手定则连同 $q$ 的符号决定。在所设圆上取一点，算出那一点的 $\mathbf{v}\times\mathbf{B}$，再检查 $q$ 乘那个向量是否指向圆心。检查一次，整条轨道的转向就定了。因为 $\omega$ 不依赖 $v$，回旋加速器可以用单一固定频率的电压加速粒子，同时让轨道不断长大。[[#eq-cyclotron]] 的这一用法始终停留在这条结论的非相对论假设之内。

若速度不垂直于 $\mathbf{B}$，就把它分解。平行于场的分量不受磁力。垂直于场的分量做[[#thm-cyclotron]]那样的圆周运动。

::: corollary 螺旋运动 {#cor-helix}
在无电场的均匀磁场 $\mathbf{B}$ 中，设 $v_{\parallel}$ 为速度平行于 $\mathbf{B}$ 的分量，$v_{\perp}$ 为垂直分量。则 $v_{\parallel}$ 恒定，垂直方向的运动是以回旋频率 [[#eq-cyclotron]] 进行的、半径为 $R = m v_{\perp}/(\abs{q}\, B)$ 的匀速圆周运动，轨迹是一条螺旋线。螺距，即一个周期内沿 $\mathbf{B}$ 前进的距离，为

$$
p = v_{\parallel} T = \frac{2\pi m v_{\parallel}}{\abs{q}\, B}.
$$ {#eq-pitch}
:::

::: proof
把速度写成 $\mathbf{v} = \mathbf{v}_{\parallel} + \mathbf{v}_{\perp}$。则 $\mathbf{v}_{\parallel}\times\mathbf{B} = \mathbf{0}$，所以洛伦兹力的平行分量为零，$m\,\mathrm{d}\mathbf{v}_{\parallel}/\mathrm{d}t = \mathbf{0}$。力的垂直分量是 $q\mathbf{v}_{\perp}\times\mathbf{B}$，正是[[#thm-cyclotron]]证明中把 $v$ 换成 $v_{\perp}$ 之后所用的那个力。平行方向是匀速运动，所以一个回旋周期内粒子沿场前进 $v_{\parallel} T$。这段距离就是螺距。
:::

速度恰好沿 $\mathbf{B}$ 相当于半径为零的螺旋线，也就是一条直线。一个很小的垂直分量会绕着那条线缠出紧贴的螺旋。磁瓶，以及带电粒子沿一条场线的约束，说的就是[[#cor-helix]]，只不过那里的场随位置缓慢变化。缓慢变化这件事超出了均匀场证明的范围。

::: example 均匀磁场中的质子 {#ex-proton}
一个质子以 $v = 3.00 \times 10^{5}\,\mathrm{m/s}$ 垂直于均匀磁场 $B = 0.200\,\mathrm{T}$ 运动。取 $m_{\mathrm{p}} = 1.6726219 \times 10^{-27}\,\mathrm{kg}$、$e = 1.602176634 \times 10^{-19}\,\mathrm{C}$。求轨道半径与回旋频率。
::: solution
由[[#eq-radius]]与[[#eq-cyclotron]]得

$$
\begin{aligned}
R &= \frac{m_{\mathrm{p}} v}{e B}
  = \frac{(1.6726219 \times 10^{-27})(3.00 \times 10^{5})}{(1.602176634 \times 10^{-19})(0.200)}
  = 1.56595 \times 10^{-2}\,\mathrm{m}, \\
\omega &= \frac{e B}{m_{\mathrm{p}}}
  = \frac{(1.602176634 \times 10^{-19})(0.200)}{1.6726219 \times 10^{-27}}
  = 1.91577 \times 10^{7}\,\mathrm{rad/s}.
\end{aligned}
$$

与数据位数相称，保留三位有效数字，$R = 1.57 \times 10^{-2}\,\mathrm{m}$，$\omega = 1.92 \times 10^{7}\,\mathrm{rad/s}$。周期为 $T = 2\pi/\omega = 3.27972 \times 10^{-7}\,\mathrm{s}$，保留三位有效数字即 $3.28 \times 10^{-7}\,\mathrm{s}$；普通频率为 $f = \omega/(2\pi) = 3.05 \times 10^{6}\,\mathrm{Hz}$。动能为 $\tfrac12 m_{\mathrm{p}} v^2 = 7.53 \times 10^{-17}\,\mathrm{J} = 470\,\mathrm{eV}$，其中 $1\,\mathrm{eV} = 1.602176634 \times 10^{-19}\,\mathrm{J}$。轨道直径只有一厘米半，而它每秒钟要走完约三百万圈。向心加速度为 $v^2/R = 5.75 \times 10^{12}\,\mathrm{m/s^2}$，比 $g$ 大的正是力比重力大的那个因子 $5.86 \times 10^{11}$。

半径正比于 $v$，反比于 $B$。场不变而速率加倍，则 $R$ 加倍而 $\omega$ 不变。速率不变而磁场加倍，则 $R$ 减半而 $\omega$ 加倍。
:::
:::

::: example 三十度入射的螺旋线 {#ex-helix}
还是这个质子，$v = 3.00 \times 10^{5}\,\mathrm{m/s}$、$B = 0.200\,\mathrm{T}$，现在速度与磁场成 $30^{\circ}$ 角。求螺旋线的半径与螺距。
::: solution
垂直与平行的速率分量为

$$
v_{\perp} = v\sin 30^{\circ} = 1.50 \times 10^{5}\,\mathrm{m/s}, \qquad v_{\parallel} = v\cos 30^{\circ} = 2.59808 \times 10^{5}\,\mathrm{m/s}.
$$

保留三位有效数字，$v_{\parallel} = 2.60 \times 10^{5}\,\mathrm{m/s}$。[[#cor-helix]] 给出的半径等于[[#ex-proton]]中半径的一半，因为 $v_{\perp}$ 是 $v$ 的一半，而[[#ex-proton]]的角度是直角：

$$
R = \frac{m_{\mathrm{p}} v_{\perp}}{e B} = 7.82976 \times 10^{-3}\,\mathrm{m} = 7.83 \times 10^{-3}\,\mathrm{m}.
$$

周期只依赖 $e$、$B$ 和 $m_{\mathrm{p}}$，所以仍是 $T = 3.27972 \times 10^{-7}\,\mathrm{s}$。螺距为

$$
p = v_{\parallel} T = (2.59808 \times 10^{5})(3.27972 \times 10^{-7}) = 8.5210 \times 10^{-2}\,\mathrm{m},
$$

保留三位有效数字即 $8.52 \times 10^{-2}\,\mathrm{m}$。质子以约 $7.8\,\mathrm{mm}$ 的半径绕圈的同时，每一圈沿场前进约 $8.5\,\mathrm{cm}$。回旋频率不受倾角影响。进入半径公式的只有 $v_{\perp}$，进入螺距公式的只有 $v_{\parallel}$。
:::
:::

::: widget parametric
fx: cos(t)
fy: sin(t)
t: 0, 2pi
caption: 这条曲线是一个速度与均匀磁场垂直的电荷的轨道：一个圆，以恒定速率绕行。速度箭头始终与路径相切，这正是力垂直于速度这一事实的几何内容。图中画的是这个圆；它不包含 $B$ 的数值。$B$ 与质量、电荷和速率一起决定的，是圆的半径以及点绕圆的快慢。一个平行于场的速度分量会把这个圆拉伸为[[#cor-helix]]中的螺旋线，而这张图并不显示那条螺旋线。
:::

::: intuition 更快意味着更宽，而不是更急
在圆轨道上，磁力是 $qvB$，所需的向心力是 $mv^2/R$。更快的粒子需要更强的向心力，正比于 $v^2$；而磁力只按 $v$ 增长。半径必须按 $v$ 成正比地变大，两者才能继续匹配。路径多出来的长度恰好把多出来的速率用掉，于是每圈的用时保持不变。粒子更重或磁场更弱都会拉长这个用时，拉长的比例都是 $m/(\abs{q} B)$。
:::

速度选择器把电力与磁力合起来使用。设 $\mathbf{E}$、$\mathbf{B}$ 与期望的速度两两垂直，使 $q\mathbf{E}$ 与 $q\mathbf{v}\times\mathbf{B}$ 方向相反。当 $qE = \abs{q}\, v B$ 时合力为零，于是

$$
v = \frac{E}{B},
$$ {#eq-selector}

这个速度与电荷无关，也与质量无关。速率恰为该值的粒子直行通过。比它慢的正粒子偏向电力所指的一侧；比它快的偏向磁力所指的一侧。区域下游的一条狭缝只留下未被偏转的那束粒子。

::: example 正交场 {#ex-selector}
某区域有大小 $6.00 \times 10^{4}\,\mathrm{V/m}$ 的匀强电场和 $0.200\,\mathrm{T}$ 的匀强磁场，两者互相垂直，且都垂直于粒子束。什么速率的粒子能不受偏转地穿过？把它与[[#ex-proton]]中的质子比较。
::: solution
由[[#eq-selector]]得 $v = E/B = (6.00 \times 10^{4})/0.200 = 3.00 \times 10^{5}\,\mathrm{m/s}$。这正是[[#ex-proton]]中质子的速率。在选择器里，电场力的大小为 $eE = 9.61 \times 10^{-15}\,\mathrm{N}$，恰等于此速率下的 $e v B$，而且两个力被布置成相互抵消。在选择器下游、同样有 $\mathbf{B}$ 而 $\mathbf{E} = \mathbf{0}$ 的区域里，这个质子会走到已经算过的那个半径 $1.57 \times 10^{-2}\,\mathrm{m}$ 的圆上。速率不同的质子早已被狭缝滤掉了，所以随后的磁轨道不是许多半径的混合。
:::
:::

::: quiz
一个质子垂直于均匀磁场运动，没有电场。把它的速率加倍而磁场保持不变，轨道
- [ ] 半径不变，频率加倍
- [ ] 半径加倍，频率加倍
- [x] 半径加倍，频率不变
- [ ] 半径减半，因为速率越大磁力越强
::: solution
[[#eq-radius]]正比于 $v$，所以半径加倍。[[#eq-cyclotron]]不含 $v$，所以 $\omega$ 不变。磁力确实按 $v$ 成正比地增大，但向心要求按 $v^2/R$ 增大，变大的半径在原来的角频率处恢复了平衡。速率本身并不被磁场改变，这是[[#prop-nowork]]的结论；题里的加倍是由别的机制完成的，发生在质子进入均匀区域之前。
:::
:::

## 载流导线所受的力

导线是一束被约束着沿金属行走的电荷流。每个电荷都感受[[#eq-lorentz]]。导线，作为施加约束的一方，感受的是这些力的总和。

::: theorem 直导线所受的力 {#thm-wire}
一根沿向量 $\mathbf{L}$ 载有电流 $I$ 的直导线——$\mathbf{L}$ 由尾部指向头部，即电流方向——在均匀磁场 $\mathbf{B}$ 中受到的力为

$$
\mathbf{F} = I\mathbf{L}\times\mathbf{B}.
$$ {#eq-wire}

大小为 $F = ILB\sin\theta$，其中 $\theta$ 是导线与磁场之间的夹角。方向是把右手定则用于 $I$ 与 $\mathbf{B}$：四指沿电流，弯向 $\mathbf{B}$，拇指即沿 $\mathbf{F}$。更一般地，对细导线、且场可能沿线变化时，

$$
\mathbf{F} = I\int \dd\mathbf{l}\times\mathbf{B},
$$ {#eq-wire-int}

其中 $\dd\mathbf{l}$ 沿电流方向。
:::

::: proof
考察导线的一小段 $\dd\mathbf{l}$。在时间 $\mathrm{d}t$ 内通过该段上某一点的电荷为 $\mathrm{d}q = I\,\mathrm{d}t$。这些载流子沿导线有漂移速度。若这一小段正是载流子在 $\mathrm{d}t$ 内走过的位移，即 $\mathbf{v}_{\mathrm{d}}\,\mathrm{d}t = \dd\mathbf{l}$，则作用在 $\mathrm{d}q$ 上的磁力为

$$
\mathrm{d}\mathbf{F} = \mathrm{d}q\, \mathbf{v}_{\mathrm{d}}\times\mathbf{B} = I\,\mathrm{d}t\, \mathbf{v}_{\mathrm{d}}\times\mathbf{B} = I\,\dd\mathbf{l}\times\mathbf{B}.
$$

这就是[[#eq-wire-int]]的被积表达式。等式 $\mathrm{d}q\, \mathbf{v}_{\mathrm{d}} = I\,\dd\mathbf{l}$ 正是宏观的力依赖电流和导线形状、而不单独依赖漂移速率或载流子密度的原因：同样的电流下，漂移更慢而载流子更多，给出同样的力。对均匀场中的直导线，$\mathbf{B}$ 可以提到积分号外，而 $\int\dd\mathbf{l} = \mathbf{L}$，这就是 [[#eq-wire]]。

这个 $\mathbf{F}$ 是导线作为力学对象受到的力。它由载流子通过那些把载流子留在金属内部的力传给晶格。[[#prop-nowork]]对每个载流子的漂移速度仍然适用。导线运动时仍然可以有机械功对它做，这正是本章那条 warning 所解释的。
:::

积分[[#eq-wire-int]]还说明，均匀磁场中的闭合回路受到的合力为零。对恒定的 $\mathbf{B}$，

$$
\mathbf{F} = I\left(\oint \dd\mathbf{l}\right)\times\mathbf{B} = \mathbf{0},
$$

因为任何闭合多边形各边的向量之和为零。均匀磁场可以扭动回路——下一节就来展示——但不能把回路整体推向一边。非均匀磁场则两样都能做。

::: example 垂直于磁场的导线 {#ex-wire}
一根长 $0.400\,\mathrm{m}$ 的直导线载有 $5.00\,\mathrm{A}$ 的电流，沿正 $x$ 方向。匀强磁场为 $0.200\,\mathrm{T}$，沿正 $y$ 方向。求导线受到的力。
::: solution
这里 $\mathbf{L}$ 与 $\mathbf{B}$ 垂直，所以 $\sin\theta = 1$，[[#eq-wire]]的大小为

$$
F = ILB = (5.00)(0.400)(0.200) = 0.400\,\mathrm{N}.
$$

方向是 $\hat{\mathbf{x}}\times\hat{\mathbf{y}} = \hat{\mathbf{z}}$，所以力为 $0.400\,\mathrm{N}$，沿正 $z$ 方向。若把磁场转动到与导线成 $30^{\circ}$ 角，大小变为 $ILB\sin 30^{\circ} = 0.200\,\mathrm{N}$，方向仍然垂直于包含导线与场的那个平面，由右手定则而不是由角度决定。
:::
:::

平行于 $\mathbf{B}$ 的导线不受力，正如沿 $\mathbf{B}$ 运动的电荷不受力。这正是磁隙中与均匀场平行铺设的引线的处境：电流很大而力为零，因为 $\sin\theta = 0$，不是因为场被关掉了。

## 线圈所受的力矩

合力为零不等于什么都不会发生。力偶——两个大小相等、方向相反、作用线不同的力——合力为零而力矩不为零。均匀磁场中的电流回路就是这样一个力偶。

::: definition 磁矩 {#def-moment}
一个平面回路面积为 $A$，载有电流 $I$，它的**磁矩**为

$$
\boldsymbol{\mu} = I\mathbf{A},
$$ {#eq-moment}

其中向量 $\mathbf{A}$ 的大小为 $A$，方向由右手定则给出：四指顺着电流弯曲，拇指就是 $\mathbf{A}$ 的方向。$N$ 匝紧密缠绕的线圈，$\boldsymbol{\mu} = N I \mathbf{A}$。SI 单位是 $\mathrm{A\cdot m^2}$，也就是 $\mathrm{J/T}$。
:::

单位的等价就是下面的力矩规律。力矩的单位是 $\mathrm{N\cdot m} = \mathrm{J}$，而 $\tau = \mu B$ 迫使 $\mu$ 取单位 $\mathrm{J/T}$。又因 $1\,\mathrm{T} = 1\,\mathrm{N}/(\mathrm{A\cdot m})$，每特斯拉一焦耳就是一安平方米。

::: theorem 矩形回路的力矩 {#thm-torque}
边长为 $a$ 和 $b$ 的矩形回路载有电流 $I$，放在均匀磁场 $\mathbf{B}$ 中。设 $\theta$ 是磁矩与 $\mathbf{B}$ 之间的夹角。回路受到的合力为零，绕中心的力矩为

$$
\boldsymbol{\tau} = \boldsymbol{\mu}\times\mathbf{B},
$$ {#eq-torque}

其中 $\mu = Iab$。大小为 $\tau = \mu B\sin\theta$。$N$ 匝时 $\mu = NIab$。当 $\boldsymbol{\mu}$ 平行或反平行于 $\mathbf{B}$ 时力矩为零；当 $\boldsymbol{\mu}$ 垂直于 $\mathbf{B}$ 时力矩最大。它的转向是把 $\boldsymbol{\mu}$ 转向 $\mathbf{B}$。
:::

::: proof
把 $\mathbf{B}$ 沿正 $x$ 轴放置，取过矩形中心、平行于长 $a$ 两边的轴为 $z$ 轴。角 $\theta$ 是回路法线与 $\mathbf{B}$ 之间的夹角。在这一布置下，长 $a$ 的两边对任何 $\theta$ 都保持与 $z$ 平行，而 $\mathbf{B}$ 始终垂直于这两边。因此每一边都受到大小为

$$
F = IaB,
$$

的力，这里用的是[[#eq-wire]]且 $\sin\theta_{\mathrm{wire}} = 1$。两边中的电流方向相反，所以两个力等大反向。这一对力的合力为零。

但两个力不共线。每个力到中心的垂直距离（力臂）都是 $(b/2)\sin\theta$。$\theta = 90^{\circ}$ 时力臂为 $b/2$，此时回路侧对着磁场，两个力恰好隔开宽度所允许的最大距离；$\theta = 0$ 时力臂为零，此时两个力落在回路平面内、沿中心到各边的连线上。两个贡献相加，力矩的大小为

$$
\tau = 2 \times (IaB) \times \left(\frac{b}{2}\sin\theta\right) = Iab\, B\sin\theta = \mu B\sin\theta.
$$

长 $b$ 的两边在均匀场中载着相反的电流，所以它们也受到等大反向的力。这两个力平行于 $z$ 轴：它们沿高度拉伸或压缩矩形，其作用线绕中心不产生力矩，对力偶毫无贡献。整个回路受到的合力为零。

方向由下述要求确定：力矩要减小 $\boldsymbol{\mu}$ 与 $\mathbf{B}$ 之间的夹角。这正是向量 $\boldsymbol{\mu}\times\mathbf{B}$：它的大小是 $\mu B\sin\theta$，而绕该向量的右手定则把 $\boldsymbol{\mu}$ 转向 $\mathbf{B}$。平行取向 $\theta = 0$ 是稳定平衡。反平行取向 $\theta = 180^{\circ}$ 因为 $\sin\theta = 0$ 也是平衡，但不稳定，因为一个小的倾倒会产生一个加大倾倒的力矩。
:::

同样的力矩 $\boldsymbol{\mu}\times\mathbf{B}$ 对非矩形的平面回路也成立。上面的证明之所以用矩形，是因为力和力臂都能点名。一般情形是把同一个力偶写成积分；结果仍是 $\boldsymbol{\mu}\times\mathbf{B}$，其中 $\boldsymbol{\mu} = I\mathbf{A}$，$N$ 匝线圈再乘以 $N$。指南针的磁针就是一种这样的永久磁矩。它指向当地的场方向，因为那里力矩为零而且是稳定的。

存在一个由取向决定的势能，它的斜率正是这个力矩。读它的时候，本章那条 warning 仍然有效。

::: corollary 磁矩的取向势能 {#cor-potential}
力矩[[#eq-torque]]可由势能

$$
U(\theta) = -\boldsymbol{\mu}\cdot\mathbf{B} = -\mu B\cos\theta,
$$ {#eq-upot}

再现，其含义是：沿 $\theta$ 增大方向的力矩分量为 $-\mathrm{d}U/\mathrm{d}\theta$。对保持电流恒定的回路，把它从 $\theta_1$ 准静态地转到 $\theta_2$ 所需的功为 $U(\theta_2) - U(\theta_1)$，这部分能量与维持电流恒定的机构交换。它不是 $\mathbf{B}$ 对漂移电荷做的功。
:::

::: proof
对[[#eq-upot]]求导：$\mathrm{d}U/\mathrm{d}\theta = \mu B\sin\theta$，所以 $-\mathrm{d}U/\mathrm{d}\theta = -\mu B\sin\theta$。以 $\mathbf{B}$ 的方向为 $\theta$ 的起点，[[#thm-torque]]中的取向力矩恰是那个分量：当 $\sin\theta > 0$ 时为负，意味着它减小 $\theta$。让回路准静态转动、动能不变的外部施力者，必须施加相反的力矩 $+\mu B\sin\theta$。它从 $\theta_1$ 到 $\theta_2$ 做的功为

$$
W_{\mathrm{ext}} = \int_{\theta_1}^{\theta_2} \mu B\sin\theta\,\mathrm{d}\theta = \mu B(\cos\theta_1 - \cos\theta_2) = U(\theta_2) - U(\theta_1).
$$

若回路在磁场中转动的同时电流保持固定，穿过回路的磁通量就会变化。对抗感应电场维持电流恒定，要么在电池处耗费能量，要么把能量交还给电池。这一交换正是 [[magnetism/faraday]] 的内容，也是 $W_{\mathrm{ext}}$ 的来源或去处。[[#prop-nowork]]毫发无损：每一时刻载流子受到的 $\mathbf{F}_{\mathrm{m}}$ 都垂直于载流子的速度，而势能[[#eq-upot]]只是对那个力偶的记账，并非声称 $\mathbf{B}$ 对这些载流子做了功。
:::

$U$ 的零点在 $\theta = 90^{\circ}$，即磁矩与磁场垂直之处。平行取向比这个零点低 $\mu B$。反平行取向高 $\mu B$。在电流恒定的情况下把磁矩从平行转到反平行，外部施力者与电池合计要付出 $2\mu B$ 的功。

::: example 单匝矩形回路的力矩 {#ex-torque}
单匝矩形回路两边长 $0.200\,\mathrm{m}$ 与 $0.100\,\mathrm{m}$，载有 $5.00\,\mathrm{A}$，放在 $0.300\,\mathrm{T}$ 的均匀磁场中。求磁矩、法线垂直于磁场时的力矩，以及 $\theta = 60^{\circ}$ 时的力矩。再求在电流恒定时把回路从平行位置准静态转到反平行位置所需的功。
::: solution
面积为 $A = 0.200 \times 0.100 = 0.0200\,\mathrm{m^2}$，所以 $\mu = IA = 5.00 \times 0.0200 = 0.100\,\mathrm{A\cdot m^2}$。在 $\theta = 90^{\circ}$，[[#eq-torque]]给出

$$
\tau = \mu B\sin 90^{\circ} = (0.100)(0.300)(1) = 0.0300\,\mathrm{N\cdot m}.
$$

在 $\theta = 60^{\circ}$，$\sin 60^{\circ} = \sqrt{3}/2$，所以保留三位有效数字 $\tau = 0.0300 \times \sqrt{3}/2 = 0.0260\,\mathrm{N\cdot m}$。力矩更小是因为力臂缩短了，而不是因为两个轴向边上的力变小了：那两个力仍各是 $IaB$。从 $\theta = 0$ 到 $\theta = 180^{\circ}$，[[#eq-upot]]的变化为

$$
\Delta U = -\mu B\cos 180^{\circ} - (-\mu B\cos 0^{\circ}) = \mu B + \mu B = 2(0.100)(0.300) = 0.0600\,\mathrm{J}.
$$

这就是半圈缓慢转动中外部施力者与电流源交换的功。它不是载流子动能的变化。
:::
:::

电动机让这样的力矩始终朝同一个方向转。换向器在每一半圈反转一次电流，磁矩就永远不会在平行位置安顿下来。转轴交付出去的能量都由电池供应，绕组的发热除外。由[[#prop-nowork]]，转轴上的能量并非来自 $\mathbf{B}$。

## 后续内容

本章的一切内容都把 $\mathbf{B}$ 当作已知的。长直导线、圆环和螺线管产生的磁场可以由电流算出来，用的正是毕奥–萨伐尔定律与安培定律，见 [[magnetism/biot-savart]]。一旦导体在磁场中运动，或穿过回路的磁场发生变化，导体中的电荷就会感受到感应场施加的电力，直流电路的回路定律也就多出一项。那是 [[magnetism/faraday]]，本章关于能量的句子要到那里才说得完整。运动电荷受到的力始终是[[#eq-lorentz]]。

::: history 从指南针到电荷所受的力
1820 年，奥斯特（Ørsted）观察到电流使指南针的指针偏转。这一观察是电与磁之间的第一条实验纽带，并表明成为偏转来源的可以是一股电流，而不必是永磁体。整个十九世纪余下的时间里，电流之间的力、以及后来运动电荷受到的力，经由安培（Ampère）、毕奥（Biot）与萨伐尔（Savart），以及十九世纪九十年代的电子论，被逐步打磨成型。洛伦兹（Lorentz）1909 年的《电子论》（*The Theory of Electrons*）把力律整理成本章使用的形式。力本身比这本书更早。右手定则是与叉积绑在一起的约定，不是一条第二物理定律：换用相反的约定会把 $\mathbf{B}$ 处处反号，而力保持不变。
:::

::: summary
- 洛伦兹力是 $\mathbf{F} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$。磁力大小为 $\abs{q} v B\sin\theta$，方向由右手定则连同 $q$ 的符号给出。
- 磁力对自由电荷不做功。在纯磁场中速率恒定。导线仍然可以获得动能，因为载流子受到约束，而能量由电池供应。
- 垂直于均匀磁场的运动是半径 $R = mv/(\abs{q} B)$ 的圆，角频率 $\omega = \abs{q} B/m$，与速率无关。
- 平行于场的速度分量保持恒定，把圆拉伸成螺距 $v_{\parallel} T$ 的螺旋线。
- 正交的匀强场只让单一速率 $v = E/B$ 不受偏转地通过。
- 直导线受到 $\mathbf{F} = I\mathbf{L}\times\mathbf{B}$。均匀磁场中的闭合回路合力为零。
- 平面回路的磁矩为 $\boldsymbol{\mu} = I\mathbf{A}$，$N$ 匝时为 $NI\mathbf{A}$。力矩是 $\boldsymbol{\mu}\times\mathbf{B}$，而 $U = -\boldsymbol{\mu}\cdot\mathbf{B}$ 把它再现。电流恒定时缓慢转动的能量与电流源交换。
:::

## 习题

::: exercise 垂直导线受到的力 {#exr-wire level=1 check="0.7"}
一根长 $0.250\,\mathrm{m}$ 的直导线载有 $8.00\,\mathrm{A}$，垂直于 $0.350\,\mathrm{T}$ 的匀强磁场。求导线受力的大小，以牛顿计。
::: solution
[[#eq-wire]]取 $\sin\theta = 1$，得 $F = ILB = (8.00)(0.250)(0.350) = 0.700\,\mathrm{N}$。方向垂直于导线和磁场两者，一旦定下这两个方向就由右手定则确定。大小不需要它们。
:::
:::

::: exercise 同一根导线斜着放 {#exr-angle level=1 check="0.35"}
上一题的导线被转动，直到电流与磁场之间的夹角为 $30^{\circ}$。电流和磁场大小不变。求力的大小，以牛顿计。
::: solution
[[#eq-wire]]中的因子 $\sin\theta$ 从 $1$ 变为 $\sin 30^{\circ} = 1/2$。力的大小是 $0.700\,\mathrm{N}$ 的一半，所以 $F = 0.350\,\mathrm{N}$。方向仍垂直于包含导线与 $\mathbf{B}$ 的平面。它既不沿场，也不沿导线。
:::
:::

::: exercise 直角处的力矩 {#exr-tau90 level=1 check="0.04"}
一匝平面回路面积为 $0.0500\,\mathrm{m^2}$，载有 $2.00\,\mathrm{A}$。$0.400\,\mathrm{T}$ 的匀强磁场垂直于磁矩。求力矩的大小，以牛顿米计。
::: solution
磁矩大小为 $\mu = IA = (2.00)(0.0500) = 0.100\,\mathrm{A\cdot m^2}$。在 $\theta = 90^{\circ}$，[[#eq-torque]]给出 $\tau = \mu B = (0.100)(0.400) = 0.0400\,\mathrm{N\cdot m}$。合力为零，因为场是均匀的。力矩不为零，因为 $\theta$ 不为零。
:::
:::

::: exercise 不受偏转的速率 {#exr-selector level=2 check="200000"}
正交匀强场为 $E = 4.00 \times 10^{3}\,\mathrm{V/m}$、$B = 2.00 \times 10^{-2}\,\mathrm{T}$，两者都垂直于粒子束。求不受偏转穿过的粒子的速率，以米每秒计。
::: solution
由[[#eq-selector]]得 $v = E/B = (4.00 \times 10^{3})/(2.00 \times 10^{-2}) = 2.00 \times 10^{5}\,\mathrm{m/s}$。电荷与质量都不参与。比这慢的带正电粒子偏向 $\mathbf{E}$ 的方向；比它快的偏向 $\mathbf{v}\times\mathbf{B}$ 的方向。定义选择器的那条狭缝，正是把这个事实变成单一输出速率的东西。
:::
:::

::: exercise 三十度处的线圈 {#exr-coil level=2 check="0.02"}
$50$ 匝线圈的矩形面积为 $0.100\,\mathrm{m}$ 乘 $0.0500\,\mathrm{m}$，载有 $0.800\,\mathrm{A}$。匀强磁场为 $0.200\,\mathrm{T}$，磁矩与磁场的夹角为 $30^{\circ}$。求力矩的大小，以牛顿米计。
::: solution
单匝面积 $0.100 \times 0.0500 = 5.00 \times 10^{-3}\,\mathrm{m^2}$。线圈的磁矩为

$$
\mu = NIA = (50)(0.800)(5.00 \times 10^{-3}) = 0.200\,\mathrm{A\cdot m^2}.
$$

[[#eq-torque]]在 $\theta = 30^{\circ}$ 给出 $\tau = \mu B\sin 30^{\circ} = (0.200)(0.200)(1/2) = 0.0200\,\mathrm{N\cdot m}$。同一线圈在 $\theta = 90^{\circ}$ 会受 $0.0400\,\mathrm{N\cdot m}$。导线上的力并没有减半；减半的是力臂。
:::
:::

::: exercise 轨道的缩放 {#exr-scale level=2 check="4.71"}
质子在垂直于均匀磁场的轨道上，半径 $1.57\,\mathrm{cm}$。速率变为三倍而磁场不变。求新的半径，以厘米计。
::: solution
[[#eq-radius]]在质量、电荷和场固定时正比于 $v$。$v$ 变为三倍，$R$ 也变为三倍，所以新半径为 $3 \times 1.57\,\mathrm{cm} = 4.71\,\mathrm{cm}$。回旋频率不变，因为[[#eq-cyclotron]]不含 $v$。周期相同而周长变为三倍，这与速率变为三倍自洽。题给的 $1.57\,\mathrm{cm}$ 就是拿来缩放的那个半径；本题不要求重新计算 $mv/(eB)$。
:::
:::

::: exercise 磁场中的动能 {#exr-nowork level=3}
电荷为 $q$、质量为 $m$ 的粒子在洛伦兹力作用下于磁场 $\mathbf{B}(\mathbf{r}, t)$ 中运动，场不必均匀，没有电场也没有其他力。证明动能守恒。然后解释：一根可以在导轨上自由滑动、载有电流的导体棒，如何在磁场中获得动能而不与这一证明矛盾。
::: hint
由 $K = \tfrac12 mv^2$ 计算 $\mathrm{d}K/\mathrm{d}t$ 并代入牛顿第二定律。对导体棒，把作用在载流子上的力与作用在晶格上的力分开，并说出能量的来源。
:::
::: solution
质量恒定的粒子的动能满足 $\mathrm{d}K/\mathrm{d}t = m\mathbf{v}\cdot\mathbf{a} = \mathbf{F}\cdot\mathbf{v}$。取 $\mathbf{F} = q\mathbf{v}\times\mathbf{B}$，三重积 $(\mathbf{v}\times\mathbf{B})\cdot\mathbf{v}$ 无论 $\mathbf{B}$ 是什么都为零，包括依赖位置与时间的场。于是 $\mathrm{d}K/\mathrm{d}t = 0$。均匀性从头到尾没有用到，圆轨道的解也没有用到。沿轨迹速率恒定。方向则未必。

滑动的导体棒不是自由粒子。载流子沿棒漂移，同时若棒在运动，它们还随棒一起运动。作用在载流子上的磁力仍然垂直于该载流子的总速度，所以对载流子不做功。这个力的一部分垂直于漂移方向，通过把载流子留在金属内的约束传给晶格。晶格，从而导体棒，可以从那个约束力获得动能。能量账由维持电流的电池轧平：棒运动时，穿过回路的磁通量变化，出现感应电场，电池对抗它做功。那个感应电场就是 [[magnetism/faraday]]。说 $\mathbf{B}$ 对漂移电荷做了功，会与本练习的前半段矛盾，对棒的描述也不对。
:::
:::

::: exercise 正交场中的漂移 {#exr-drift level=3 check="300000"}
匀强电场 $\mathbf{E}$ 沿正 $y$ 轴，匀强磁场 $\mathbf{B}$ 沿正 $z$ 轴。电荷 $q > 0$、质量 $m$ 的粒子在 $xy$ 平面内运动。证明：运动是速度为 $(E/B)$、沿正 $x$ 方向的一致漂移，叠加在角频率 $\omega = qB/m$ 的圆周运动之上。对 $E = 6.00 \times 10^{4}\,\mathrm{V/m}$、$B = 0.200\,\mathrm{T}$，求漂移速率，以米每秒计。
::: hint
写出 $m\mathbf{a} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$ 的两个分量。令 $v_x = u_x + E/B$，证明 $u_x$ 与 $v_y$ 满足角频率 $qB/m$ 的简谐方程。
:::
::: solution
取 $\mathbf{E} = E\hat{\mathbf{y}}$、$\mathbf{B} = B\hat{\mathbf{z}}$，

$$
\mathbf{v}\times\mathbf{B} = B v_y\, \hat{\mathbf{x}} - B v_x\, \hat{\mathbf{y}}.
$$

把洛伦兹力代入牛顿第二定律得

$$
m\frac{\mathrm{d}v_x}{\mathrm{d}t} = q B v_y, \qquad m\frac{\mathrm{d}v_y}{\mathrm{d}t} = q(E - B v_x).
$$

令 $v_x = u_x + E/B$，于是 $u_x$ 是水平速度中超出漂移的那部分。则 $\mathrm{d}v_x/\mathrm{d}t = \mathrm{d}u_x/\mathrm{d}t$，第二个方程化为 $m\,\mathrm{d}v_y/\mathrm{d}t = -q B u_x$。把第一个方程求导并代入：

$$
m\frac{\mathrm{d}^2 u_x}{\mathrm{d}t^2} = q B \frac{\mathrm{d}v_y}{\mathrm{d}t} = q B\left(-\frac{q B}{m} u_x\right) = -m\left(\frac{q B}{m}\right)^2 u_x.
$$

于是 $u_x$ 以 $\omega = qB/m$ 振荡；$v_y$ 也由 $m\,\mathrm{d}v_y/\mathrm{d}t = -q B u_x$ 以同一频率振荡。加上的常数 $E/B$ 是沿正 $x$ 方向的匀速运动。在以该速度漂移的参考系里，静止电荷受到的电力与磁力相互抵消，剩下的就是[[#thm-cyclotron]]的圆周运动。对题给的场，漂移速率为

$$
\frac{E}{B} = \frac{6.00 \times 10^{4}}{0.200} = 3.00 \times 10^{5}\,\mathrm{m/s}.
$$

圆周部分的半径取决于粒子是如何被发射的。漂移则不。
:::
:::
