刚体是一个有记忆的质点：它有一个位置，还有一个**方位**，而两者由“其内任意两点间距离永不改变”这一事实联系在一起。仅凭刚性这一个约束，速度问题就从矢量减法变成了更有结构的东西，而它也送来一份礼物：在任何瞬时，作平面运动的刚体的速度场都是**绕某一点的纯转动**，无论运动看起来多复杂。找到那个点往往只是画两条线的事，它把一页代数变成一句几何。

本讲的一切都是一条方程$\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A}$和一个关于它的事实推论：$\boldsymbol{\omega}$对刚体上每一对点都相同，所以它只需找一次，到处可用。远远最常见的错误，是用一对点算出$\omega$之后忘了它是哪一对点算出来的，或者用直线距离$A B$而不是$B$到过$A$的转轴之垂距去写$\omega r_{B / A}$。

::: warning $\omega$属于刚体，不属于某个点
角速度$\boldsymbol{\omega}$是**刚体**的属性：刚体内每条线都以同样的速率转动，所以由$A$、$B$算出的$\boldsymbol{\omega}$与由$C$、$D$算出的相同。速度和加速度没有这个性质，而整个学科的杠杆就支在这条性质上。这也意味着$\mathbf{v}_{B / A}$的方向永远垂直于$A B$——如果你算出的相对速度不垂直于两点连线，你就犯了错，而且不用算完就能看出来。
:::

## 平动与转动

::: definition 刚体的平面运动 {#def-plane-motion}
当刚体内所有点都在相互平行的平面内运动、且刚体不绕垂直于这些平面的轴转动时，刚体作**平面运动**。其运动或者是：

- **平动**，刚体内每条线始终保持与自身平行，于是$\boldsymbol{\omega} = 0$，所有点有相同的速度和加速度；或者
- **绕定轴转动**，距轴$\mathbf{r}$处的点
$$
\mathbf{v} = \boldsymbol{\omega} \times \mathbf{r}, \qquad
\mathbf{a} = \boldsymbol{\alpha} \times \mathbf{r} - \omega^{2} \mathbf{r}, \qquad
v = \omega r, \quad a_t = \alpha r, \quad a_n = \omega^{2} r ;
$$
或者
- **一般平面运动**，即绕任一基点的平动加转动。

**纯滚动（只滚不滑）**是这样一个特例：滚动体与固定表面接触的那一点速度为零，所以半径$R$、中心速度$v_C$的车轮满足$v_C = \omega R$。
:::

::: proof 相对速度方程 {#proof-rel-vel}
设$A$、$B$是刚体上两点，故$\left| \mathbf{r}_{B / A} \right|$为常数。在惯性系中，
$$
\mathbf{r}_B = \mathbf{r}_A + \mathbf{r}_{B / A} .
$$
因为$\mathbf{r}_{B / A}$长度不变，它的变化率就是直线$A B$绕其与自身夹角的转动，大小为$\omega r_{B / A}$，方向垂直于$A B$——恰好就是$\boldsymbol{\omega} \times \mathbf{r}_{B / A}$。求导，
$$
\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A} .
$$
再求导，记$\boldsymbol{\alpha} = \dot{\boldsymbol{\omega}}$，
$$
\mathbf{a}_B = \mathbf{a}_A + \boldsymbol{\alpha} \times \mathbf{r}_{B / A}
+ \boldsymbol{\omega} \times \left( \boldsymbol{\omega} \times \mathbf{r}_{B / A} \right) ,
$$
其中最后一项就是$- \omega^{2} \mathbf{r}_{B / A}$，方向从$B$指向$A$。

**注意该证明没有假设什么。**没有假设$A$的路径，没有假设轴是否固定，也没有假设$\omega$的大小。这些方程对**任何**平面运动瞬时成立，基点$A$可以是刚体上任意一点——包括物理上不在刚体内的那一点，也包括速度瞬心，此时速度场就是绕它的纯转动。
:::

::: theorem 速度瞬心 {#thm-ic}
若作平面运动的刚体$\omega \ne 0$，则存在唯一一点$I$，在该瞬时固定于刚体上且速度为零。它位于过$A$垂直于$\mathbf{v}_A$的直线上，也位于过$B$垂直于$\mathbf{v}_B$的直线上，任一点$P$的速度为
$$
v_P = \omega \, I P, \quad \text{垂直于 } I P, \qquad
\omega = \frac{v_A}{I A} = \frac{v_B}{I B} .
$$
若$\mathbf{v}_A$与$\mathbf{v}_B$平行，则$I$在无穷远，运动为瞬时平动。
:::

::: proof
距$A$为$\mathbf{r}$处的点，其速度为$\mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}$。令其为零，
$$
\mathbf{v}_A = - \boldsymbol{\omega} \times \mathbf{r},
$$
这要求$\mathbf{r}$垂直于$\mathbf{v}_A$——所以$I$位于过$A$垂直于$\mathbf{v}_A$的直线上——且大小为$r = v_A / \omega$。对$B$作同样论证得第二条直线，两条不平行的直线交于一点。$I$一旦确定，任一点$P$的速度就由$\mathbf{v}_P = \mathbf{v}_I + \boldsymbol{\omega} \times \mathbf{r}_{P / I} = \boldsymbol{\omega} \times \mathbf{r}_{P / I}$给出，这是大小为$\omega \cdot I P$的纯转动。

若$\mathbf{v}_A \parallel \mathbf{v}_B$，两条垂线平行而交于无穷远；此时$\omega = 0$，刚体作瞬时平动。这个极限情形不是奇谈：它出现在每个曲柄滑块机构和四杆机构的死点位置，而恰恰在那里，速度分析必须小心从事而不能靠尺子。
:::

::: example 纯滚动的轮 {#ex-wheel}
半径$400\ \mathrm{mm}$的轮纯滚动，轮心速度$8\ \mathrm{m / s}$。求轮缘上与轮心等高的点的速度，以及轮顶的速度。
::: solution
接触点$C$速度为零，所以它就是速度瞬心，
$$
\omega = \frac{v_{\text{centre}}}{R} = \frac{8}{0.4} = 20\ \mathrm{rad / s} .
$$
**与轮心等高的点**，记为$P$：
$$
IP = \sqrt{0.4^{2} + 0.4^{2}} = 0.5657\ \mathrm{m}, \qquad
v_P = 20 \times 0.5657 = 11.31\ \mathrm{m / s},
$$
方向垂直于$IP$，即向前上方$45^{\circ}$。
**轮顶**，记为$T$：
$$
v_T = \omega \times 2 R = 20 \times 0.8 = 16.0\ \mathrm{m / s} = 2 v_{\text{centre}} .
$$
**校核。**取轮心$G$为基点，$\mathbf{i}$向前，$\mathbf{j}$向上，向前滚动时$\boldsymbol{\omega} = - 20 \mathbf{k}$。轮心正前方的点$P$位于$\mathbf{r}_{P / G} = 0.4 \mathbf{i}$，所以
$$
\mathbf{v}_P = 8 \mathbf{i} + \left( - 20 \mathbf{k} \right) \times 0.4 \mathbf{i}
= 8 \mathbf{i} - 8 \mathbf{j}, \qquad
\left| \mathbf{v}_P \right| = 11.31\ \mathrm{m / s} \checkmark
$$
方向向前下方$45^{\circ}$，垂直于$IP$，与速度瞬心法的要求一致。$\checkmark$

**合理性检验。**滚动轮的轮顶以车速的两倍运动，接触点速度为零——这两个事实拍下行进中自行车的辐条照片即可验证，几乎每个人第一次听说时都会吃惊。它们解释了为什么滚动的轮子把泥从轮顶向前上方甩出而不是向后，为什么铁路车轮轮缘外侧是整列火车运动最快的部分、因而也相应磨损最快，以及为什么轮胎接地面上的胎面相对路面瞬时静止——而这正是静摩擦、从而牵引力得以存在的条件。打滑就是该条件失效，此时可用的摩擦从静摩擦值降到动摩擦值。
:::
:::

::: widget plot
f: 2*sin(x*pi/360)
x: 0, 360
y: 0, 2.1
labels: \text{点的速率 } / \ v_{\text{centre}}
caption: 滚动轮轮缘上一点相对地面的速率，随其角位置$x$（从接触点量起）的变化。速率为$2 v \sin(x / 2)$——在接触点为零，在四分之一转处为$v \sqrt{2}$，在轮顶为$2 v$。**摆线**形的速度分布，解释了为什么轮上一点承受旋转频率的应力循环，也解释了为什么静止不动的接触点恰恰是**变形**最大的点：速度为零和应变为零不是一回事，这个区别就是轮胎滚动阻力的全部。
:::

## 速度分析

::: algorithm 机构的速度 {#alg-velocity}
两种方法，你应当都会用。

**相对速度（矢量）法。**
1. 对同一构件上的一对点写$\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A}$，把$A$取在速度已知处。
2. 数未知数：平面内这是一个方程两个标量方程，所以能容纳两个未知数——通常是一个大小和一个方向。
3. 逐构件叠加方程直到所求之点，绝不要在求出某构件的$\omega$之前先把它引进来。

**速度瞬心法。**
1. 由两个已知速度的方向确定该构件的瞬心$I$。
2. 由速度完全已知的点计算$\omega = v / I P$。
3. 构件上其余各点的速度都取$\omega \times$到$I$的距离。

速度瞬心法更快，且能对结果提供校核；矢量法是唯一能推广到加速度、空间机构和计算机的方法。
:::

::: example 曲柄滑块机构 {#ex-slider-crank}
某曲柄滑块机构的曲柄长$100\ \mathrm{mm}$，连杆长$300\ \mathrm{mm}$。曲柄以$1200\ \mathrm{rpm}$转动，曲柄与内死点夹角$60^{\circ}$。求活塞速度和连杆角速度。
::: solution
$\omega = 2 \pi \times 1200 / 60 = 125.7\ \mathrm{rad / s}$，所以曲柄销的速度为
$$
v_A = \omega r = 125.7 \times 0.1 = 12.57\ \mathrm{m / s}
$$
方向垂直于曲柄。连杆的摆角由封闭环$r \sin \theta = l \sin \beta$求出：
$$
\sin \beta = \frac{0.1 \times 0.8660}{0.3} \quad\Longrightarrow\quad \beta = 16.78^{\circ} .
$$
**活塞速度。**活塞在气缸轴线上，令$\mathbf{v}_A$与$\mathbf{v}_B$沿连杆方向的分量相等，
$$
v_B \cos \beta = v_A \cos \left( 90^{\circ} - \theta - \beta \right)
\quad\Longrightarrow\quad
v_B = v_A \left( \sin \theta + \tan \beta \cos \theta \right),
$$
$$
v_B = 12.57 \left( 0.8660 + 0.3014 \times 0.5 \right) = 12.57 \times 1.0167 = 12.78\ \mathrm{m / s}.
$$
**连杆角速度。**垂直于连杆方向的速度分量，在$B$处相对$A$必须等于$\omega_{\text{rod}} l$：
$$
\omega_{\text{rod}} = \frac{v_A \cos \theta}{l \cos \beta}
= \frac{12.57 \times 0.5}{0.3 \times 0.9576} = 21.9\ \mathrm{rad / s} .
$$
**校核。**熟悉的近似公式$v_B = r \omega \left[ \sin \theta + r \sin 2 \theta / \left( 2 l \right) \right]$给出$12.70\ \mathrm{m / s}$，与精确值$12.78$相差$0.6$%；该近似用$\sin \beta$代替$\tan \beta$，对$r / l$精确到一阶。$\checkmark$

**合理性检验。**活塞比曲柄销运动得**更快**，此处快$1.7$%，因为连杆的摆角贡献了第二项。比值$l / r = 3$按现代标准算短——汽车发动机用$3.2$到$3.6$，船用柴油机可达$4.5$——用长连杆的理由恰恰在此：二阶项按$r / l$变化，所以连杆越长，活塞运动越接近纯简谐，从而减小任何平衡重都无法消除的二阶不平衡扰力。就是这个几何比值，决定了长行程低速船用柴油机在同一转速下比短行程汽车发动机振动更小，也决定了赛车发动机为什么用短连杆换取紧凑刚硬的结构。
:::
:::

::: example 绳上的线轴 {#ex-spool}
外半径$120\ \mathrm{mm}$、内半径$60\ \mathrm{mm}$的线轴在水平地面上纯滚动。缠在内芯上的绳被水平以$2\ \mathrm{m / s}$拉动。线轴往哪个方向运动？多快？
::: solution
绳从内芯**顶部**离开，所以内芯上绳所在点的速度为向前的$2\ \mathrm{m / s}$。与地面的接触点$C$是速度瞬心，于是
$$
\omega = \frac{v_{\text{cord}}}{R + r} = \frac{2}{0.12 + 0.06} = 11.11\ \mathrm{rad / s} ,
$$
$$
v_{\text{centre}} = \omega R = 11.11 \times 0.12 = 1.333\ \mathrm{m / s} \quad \text{向前} .
$$
**合理性检验。**线轴沿拉力**相同**的方向运动，只是更慢。一般规则是：线轴朝绳的作用线落在接触点的那一侧滚动：在顶部水平拉，它朝你滚来；若与水平成$\alpha$角拉，且
$$
\sin \alpha = \frac{r}{R} = 0.5 \quad\Longrightarrow\quad \alpha = 30^{\circ}
$$
则作用线恰好通过接触点，拉力对速度瞬心没有力矩，线轴根本不滚。
**合理性检验。**线轴沿拉力**相同**的方向运动，只是更慢。一般规则是：线轴朝绳的作用线落在接触点的那一侧滚动：在顶部水平拉，它朝你滚来；在恰好的角度拉，它根本不动。那个临界角就是绳的作用线通过接触点之处，即
$$
\cos \alpha = - \frac{r}{R} = - 0.5 \quad\Longrightarrow\quad \alpha = 120^{\circ}
$$
在中心处自拉力方向量起——也就是向后上方与水平成$60^{\circ}$拉。这是“物体被拉却不动”的经典演示，也是为什么桌上的悠悠球低角度拉往一个方向走、高角度拉往另一个方向走。
:::
:::

::: example 行星齿轮 {#ex-epicyclic}
简单行星齿轮中，太阳轮节圆半径$100\ \mathrm{mm}$，每个行星轮$50\ \mathrm{mm}$，内齿圈$200\ \mathrm{mm}$。内齿圈固定，转臂以$60\ \mathrm{rpm}$转动。求行星轮的自转和太阳轮的转速。
::: solution
转臂角速度$\omega_a = 2 \pi \times 60 / 60 = 6.283\ \mathrm{rad / s}$，所以距轴$150\ \mathrm{mm}$的行星轮中心$P$的速度为
$$
v_P = 6.283 \times 0.15 = 0.942\ \mathrm{m / s} .
$$
行星轮在**固定**的内齿圈上纯滚动，所以行星轮与齿圈的接触点就是速度瞬心，位于距轴$200\ \mathrm{mm}$、距$P$点$50\ \mathrm{mm}$处：
$$
\omega_{\text{planet}} = \frac{v_P}{0.05} = 18.85\ \mathrm{rad / s} = 180\ \mathrm{rpm} .
$$
太阳轮的节圆接触点距轴$100\ \mathrm{mm}$，即位于速度瞬心另一侧$100\ \mathrm{mm}$处，所以
$$
v_{\text{sun}} = 18.85 \times 0.100 = 1.885\ \mathrm{m / s}, \qquad
\omega_{\text{sun}} = \frac{1.885}{0.100} = 18.85\ \mathrm{rad / s} = 180\ \mathrm{rpm} .
$$
**校核。**列表（叠加）法给出$\omega_s - \omega_a = - \left( N_r / N_s \right) \left( \omega_r - \omega_a \right)$，代入$\omega_r = 0$，
$$
\omega_s = \omega_a \left( 1 + \frac{N_r}{N_s} \right) = 6.283 \times 3 = 18.85\ \mathrm{rad / s}. \checkmark
$$

**合理性检验。**单级恰好$3 : 1$的速比，输入输出在同一轴上且转向相同——这就是行星齿轮的全部魅力，也是自动变速箱、风力发电机齿轮箱和行星最终传动都由它构成的原因。速度瞬心法不用一条列表式的方程就得到答案，而且能推广到列表法变得笨拙的差动机构：画出速度的四杆机构，答案直接从图上量出。
:::
:::

::: example 齿轮齿条转向器 {#ex-rack}
某齿轮齿条转向器的小齿轮节圆半径$60\ \mathrm{mm}$，总传动比$16 : 1$。横拉杆连接点给出$120\ \mathrm{mm}$的有效转向臂，转向轮左右各转$30^{\circ}$。求方向盘从左极限到右极限的转角。
::: solution
满舵时齿条两端对称移动，所以齿条自中位的行程为
$$
x = 2 \times 0.12 \times \sin 30^{\circ} = 0.120\ \mathrm{m}.
$$
小齿轮因此须转过
$$
\theta_p = \frac{x}{r} = \frac{0.120}{0.060} = 2.00\ \mathrm{rad} = 114.6^{\circ},
$$
方向盘转过
$$
\theta_w = 16 \times 114.6 = 1834^{\circ} = 5.1 \ \text{圈（自中位）},
$$
$$
\text{左右极限之间} = 10.2 \ \text{圈}.
$$
**合理性检验。**左右极限之间十圈，对商用车是现实的数字，对轿车则偏高——轿车通常是$2.5$到$3$圈——要么靠更大的小齿轮半径，要么（远为常见的）靠**可变**传动比：小齿轮齿廓经修磨，传动比从中位的$15 : 1$降到满舵的$12 : 1$。这样泊车时响应快，高速公路上又不会像固定快比那样神经质，这与转向几何本身用阿克曼原理玩的把戏同理：内侧轮转角大于外侧轮，使两轮绕后轴线延长线上的一个共同速度瞬心滚动。忽略这个差别，满舵时每米行程要付出几厘米的侧向滑磨，这就是前桥几何磨损的车辆在环岛里把轮胎横向推着走、尖叫着过弯的原因。
:::
:::

## 加速度分析

::: example 连杆加速度 {#ex-accel}
对例6的曲柄滑块机构，若曲柄以恒定的$1200\ \mathrm{rpm}$转动，求同一位置处活塞的加速度和连杆的角加速度。
::: solution
**活塞。**由$\alpha_{\text{crank}} = 0$，
$$
\begin{aligned}
a_B &= r \omega^{2} \left[ \cos \theta + \frac{r \cos 2 \theta}{l} \right] 
= 0.1 \times 125.7^{2} \left[ 0.5 + \frac{0.1 \times \left( - 0.5 \right)}{0.3} \right] \\
&= 1579 \left[ 0.5 - 0.1667 \right] = 526\ \mathrm{m / s^{2}} = 53.7\ g ,
\end{aligned}
$$
与封闭环方程精确二阶导数给出的$527\ \mathrm{m / s^{2}}$相对照。

**连杆。**连杆的角加速度由相对加速度的横向分量求出：
$$
\alpha_{\text{rod}} = \frac{r \omega^{2} \sin \theta}{l \cos \beta}
= \frac{1579 \times 0.8660}{0.3 \times 0.9576} = 4756\ \mathrm{rad / s^{2}} .
$$
**校核。**在内死点$\theta = 0$，公式给出$a_B = r \omega^{2} \left( 1 + r / l \right) = 1579 \times 1.333 = 2105\ \mathrm{m / s^{2}}$，在外死点为$r \omega^{2} \left( 1 - r / l \right) = 1053$——正是使发动机内死点轴承载荷达到外死点两倍的经典不对称。$\checkmark$

**合理性检验。**区区$1200\ \mathrm{rpm}$的曲柄产生五十四个重力加速度，原因就是$\omega^{2}$：$125.7^{2}$是$15\,800$，乘$0.1\ \mathrm{m}$，还没算几何就得到$1580\ \mathrm{m / s^{2}}$。这就是往复机械要用平衡重配平的原因，是压缩机基础要按运转速度下的**扰力**$m r \omega^{2}$设计的原因，也是二阶项$r \cos 2 \theta / l$——它出现在两倍于转速的频率上，多少配平都消不掉——使V型双缸和直列四缸在同一转速下手感不同的原因。
:::
:::

::: warning 速度瞬心只给速度
速度瞬心是**速度为零**的点，不是加速度为零的点，不能在加速度分析中把它当作固定铰链来用。$B$的加速度是$\mathbf{a}_B = \mathbf{a}_A + \boldsymbol{\alpha} \times \mathbf{r}_{B / A} - \omega^{2} \mathbf{r}_{B / A}$，取$A = I$得$\mathbf{a}_B = \mathbf{a}_I + \boldsymbol{\alpha} \times \mathbf{r}_{B / I} - \omega^{2} \mathbf{r}_{B / I}$——而$\mathbf{a}_I$一般**不**为零。纯滚动的轮，接触点速度为零，却有指向轮心的加速度$\omega^{2} R$。稳妥的规则是：速度用$I$，加速度用一个真正的物质点——轮心、销钉、滑块——作基点。
:::

::: history
刚体运动学始于欧拉（Euler）1765年的《刚体运动理论》（*Theoria motus corporum rigidorum*）：它引入了旋转矩阵、主惯性轴，以及“有一个定点的刚体的任何位移都是绕某轴的转动”这一定理。**瞬时转动中心**出自罗伯特·麦考利勋爵（Robert， Lord Macaulay）——历史学家的叔父、一位写过哥特拱承重的能干工程师——1819年在爱丁堡皇家学会宣读的一篇论文，其后由潘索（Poinsot）1834年发展为系统方法，机构方面则由肯尼迪（Kennedy）1886年的三心定理完成。**极曲线**（centrode）构造——把刚体的平面运动表示为一条极曲线在另一条上滚动——归功于萨瓦里（Savary）和欧拉，它是渐开线齿轮的几何基础。**加速度影像**和图解加速度多边形出现在福普尔（Föppl）和肯尼迪1877年《机构力学》（*The Mechanics of Machinery*）的机械设计著作中，一直是标准做法，直到哈滕伯格（Hartenberg）与德纳维特（Denavit）1964年《连杆机构综合》（*Kinematic Synthesis of Linkages*）的解析矢量法将其取代；同一问题的矩阵法和复数法归功于弗罗伊登斯坦（Freudenstein）1954年的工作，是现代机构程序所用的方法。
:::

## 后续内容

机构加速度分析在[[mechanisms/acceleration-analysis]]中完成，速度法在[[mechanisms/velocity-analysis]]中用于连杆机构。把这些加速度与力联系起来是[[dynamics/rigid-body-kinetics]]，带科里奥利项和陀螺项的三维推广是[[dynamics/three-dimensional-dynamics]]，由极曲线概念导出的齿廓啮合几何在[[mechanisms/gears]]。

::: summary
- 刚体的平面运动是平动加转动，$\boldsymbol{\omega}$对其上每一对点都相同。
- $\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A}$：两个标量方程、两个未知数，且$\mathbf{v}_{B / A}$永远垂直于$A B$。
- 只要$\omega = 0$不成立，就存在由两条垂线确定的速度瞬心，速度场是绕它的纯转动。
- 纯滚动意味着接触点速度为零，所以$v_{\text{centre}} = \omega R$，轮顶以$2 v$运动。
- 速度瞬心只是速度概念；加速度方程需要一个物质基点。
- 往复加速度按$r \omega^{2}$增长，这就是配平和二阶扰力主导高速发动机设计的原因。
:::

::: quiz
一轮在水平路面上纯滚动。比较轮与路面接触点的加速度和轮顶点的加速度（都相对路面测量）：
- [ ] 两者都为零，因为轮在稳定滚动
- [ ] 两者大小相等，都指向轮心
- [x] 接触点速度为零却有指向轮心的加速度；轮顶点的大小与之相同
- [ ] 接触点速度为零，所以加速度为零
::: solution
接触点**速度**为零，却有指向轮心、大小$\omega^{2} R$的向心加速度，轮缘上每个其他点也是如此，大小全都相同。速度为零不意味着加速度为零——抛到最高点小球的性质相同。这是对速度瞬心不过是速度工具、别无其他的最好演示：如果轮真的绕接触点的固定销转动，那一点的加速度就该为零，而轮缘各点的加速度就该正比于到该点的距离而不是大小相等。其推论在实践中很重要：接地面上的橡胶静止不动，却同时承受几个重力加速度的加速度，这就是轮胎最大应力和最大发热发生在胎肩而不是接地处的原因。
:::
:::

## 习题

::: exercise 定轴转动 {level=1 check="3.77"}
直径$300\ \mathrm{mm}$的飞轮在$5\ \mathrm{s}$内从静止匀加速到$1200\ \mathrm{rpm}$。求轮缘上一点的切向加速度（以$\mathrm{m / s^{2}}$计）。
::: solution
$\alpha = 125.7 / 5 = 25.13\ \mathrm{rad / s^{2}}$，$a_t = \alpha r = 25.13 \times 0.15 = 3.77\ \mathrm{m / s^{2}}$。
**注。**应填入的答案是$3.77\ \mathrm{m / s^{2}}$。
:::
:::

::: exercise 纯滚动 {level=1 check="40"}
汽车以$20\ \mathrm{m / s}$行驶，车轮半径$0.35\ \mathrm{m}$。轮胎最高点的速度相对路面是多少？
::: solution
$2 v = 40\ \mathrm{m / s}$。
**注。**应填入的答案是$40\ \mathrm{m / s}$。
:::
:::

::: exercise 速度瞬心 {level=1 check="0.667"}
长$4\ \mathrm{m}$的梯子靠在墙上，梯脚以$0.5\ \mathrm{m / s}$滑离墙。当梯脚距墙$2.4\ \mathrm{m}$时，梯顶下滑多快？
::: solution
速度瞬心在墙与地面的交角处；以$\theta$为梯子与墙的夹角，
$$
\omega = \frac{0.5}{4 \cos \theta} = \frac{0.5}{2.4} = 0.2083\ \mathrm{rad / s}, \qquad
v_{\text{top}} = \omega \times 4 \sin \theta = 0.2083 \times 3.2 = 0.667\ \mathrm{m / s}.
$$
**注。**应填入的答案是$0.667\ \mathrm{m / s}$。
:::
:::

::: exercise 滚动接触 {level=1 check="0.05"}
半径$350\ \mathrm{mm}$的自行车轮以$5\ \mathrm{m / s}$行驶。气门嘴与轮毂等高且正在向后运动时，它相对地面的速度是多少？
::: solution
速度瞬心在接触点，$\omega = 5 / 0.35 = 14.29\ \mathrm{rad / s}$。气门嘴与轮毂等高且在其后方，到接触点的距离为$\sqrt{0.35^{2} + 0.35^{2}} = 0.495\ \mathrm{m}$，于是
$$
v = 14.29 \times 0.495 = 7.07\ \mathrm{m / s},
$$
方向垂直于接触点与该点的连线，即向后下方$45^{\circ}$。
**注。**应填入的答案是$7.07\ \mathrm{m / s}$。
:::
:::

::: exercise 相对加速度 {level=2}
半径$250\ \mathrm{mm}$的轮以恒定的$6\ \mathrm{m / s}$滚动。求轮缘上点在（a）接触点、（b）轮顶、（c）与轮心等高处的加速度。
::: solution
$\omega = 6 / 0.25 = 24\ \mathrm{rad / s}$，轮心加速度为零，所以对轮缘上任一点$\mathbf{a} = - \omega^{2} \mathbf{r}$，方向由该点指向轮心，大小为
$$
\omega^{2} r = 576 \times 0.25 = 144\ \mathrm{m / s^{2}} .
$$
轮缘上每一点都有**相同**的加速度大小，都指向轮心。
**合理性检验。**接触点速度为零却有$144\ \mathrm{m / s^{2}}$——十五个重力加速度——的加速度，这是对速度瞬心不是铰链的最清楚演示。这也是为什么卡在胎面里的石子不是轻轻落在接地点而是被甩出去，以及为什么滚动轮胎的最大应力发生在胎肩而不是接触点。
:::
:::

::: exercise 四杆机构 {level=2}
四杆机构中，机架$A D$水平长$240\ \mathrm{mm}$，曲柄$A B$长$80\ \mathrm{mm}$，连杆$B C$长$240\ \mathrm{mm}$，摇杆$C D$长$140\ \mathrm{mm}$。在曲柄铅直的瞬时，若曲柄以$\omega_1$转动，求摇杆的角速度。
::: solution
取$A$为原点，$D$在$\left( 0.24, 0 \right)$，于是$B = \left( 0, 0.08 \right)$。解
$$
\left| C - B \right| = 0.24, \qquad \left| C - D \right| = 0.14
$$
得$C = \left( 0.2324, 0.1398 \right)\ \mathrm{m}$。
**速度。**以$\boldsymbol{\omega}_1 = \omega_1 \mathbf{k}$，
$$
\mathbf{v}_B = \omega_1 \mathbf{k} \times 0.08 \mathbf{j} = - 0.08 \omega_1 \mathbf{i} .
$$
写$\mathbf{v}_C = \mathbf{v}_B + \omega_2 \mathbf{k} \times \mathbf{r}_{C / B} = \omega_3 \mathbf{k} \times \mathbf{r}_{C / D}$，其中
$$
\mathbf{r}_{C / B} = \left( 0.2324, 0.0598 \right), \qquad
\mathbf{r}_{C / D} = \left( - 0.0076, 0.1398 \right),
$$
两个分量给出
$$
- 0.08 \omega_1 - 0.0598 \omega_2 = - 0.1398 \omega_3, \qquad
0.2324 \omega_2 = - 0.0076 \omega_3 ,
$$
$$
\omega_2 = - 0.0184 \ \omega_1, \qquad
\boxed{\omega_3 = 0.564 \ \omega_1} .
$$
**合理性检验。**连杆的角速度只有曲柄的$1.8$%，所以此瞬时它几乎在作**平动**——它的速度瞬心远在机构之外、$C$的另一侧。这是真实而有用的性质：连杆上某点在这样瞬时附近会在短弧内画出几乎直线，这正是瓦特（Watt）和切比雪夫（Chebyshev）直线机构的原理，也是为什么用作夹持器的四杆机构在部分行程内几乎保持方位不变。
:::
:::

::: exercise 设计 {level=3}
一台曲柄摇杆（导杆）式牛头刨床的急回机构，曲柄半径$200\ \mathrm{mm}$，可在导槽中滑动的摆杆长$900\ \mathrm{mm}$，其转轴位于曲柄轴正下方$900\ \mathrm{mm}$处。求回程时间与工作行程时间之比、滑枕行程，以及曲柄以$60\ \mathrm{rpm}$转动时的平均切削速度。
::: solution
**摆杆摆动。**极限位置出现在曲柄与摆杆垂直时，所以半摆角为
$$
\sin \beta = \frac{200}{900} = 0.2222 \quad\Longrightarrow\quad \beta = 12.84^\circ ,
$$
摆杆总摆角为$2 \beta = 25.68^\circ$。
**时间比。**工作行程中曲柄扫过$180^\circ + 2 \beta = 205.7^\circ$，回程扫过$180^\circ - 2 \beta = 154.3^\circ$，于是
$$
\frac{t_{\text{return}}}{t_{\text{cut}}} = \frac{154.3}{205.7} = 0.750 .
$$
**滑枕行程。**摆杆端点画出半径$900\ \mathrm{mm}$的圆弧，
$$
s = 2 \times 900 \sin \beta = 2 \times 900 \times 0.2222 = 400\ \mathrm{mm}.
$$
**平均切削速度。**$60\ \mathrm{rpm}$时一个循环$1.00\ \mathrm{s}$，工作行程占$205.7 / 360 = 0.571\ \mathrm{s}$，所以
$$
\bar{v} = \frac{0.400}{0.571} = 0.70\ \mathrm{m / s},
$$
峰值约为平均值的$1.6$倍，即$1.1\ \mathrm{m / s}$。

**设计评注。**急回机构的全部意义在于：刀具在力大、表面质量要紧的地方慢切，在什么都不干的回程快跑：$0.75$的时间比省下四分之一的循环时间，对每分钟四十次的刨床来说相当于百分之二十五的产量。对驱动的影响是**电机**看到剧烈波动的载荷——切削时满扭矩，回程几乎为零——所以刨床在电机与曲柄之间装一个沉重的飞轮，其尺寸使工作行程内的转速降保持在$5$%以内。让工作台平稳运动的，是这个飞轮而不是电机的额定值；这也是为什么带限扭的变速驱动只在小机器上取代了皮带加飞轮的老结构——小机器上不再需要飞轮的惯量来防止电机堵转。
:::
:::

::: exercise 推导 {level=3}
证明刚体的平面运动可以表示为一条极曲线在另一条上只滚不滑，并推导把两条极曲线的曲率与极点距、角速度联系起来的欧拉-萨瓦里方程。
::: solution
**极曲线。**刚体运动时，速度瞬心$I$在**固定**系中描出一条轨迹，即*固定极曲线*；在**运动**刚体中也描出一条轨迹，即*动极曲线*。每一瞬时两条曲线都通过同一点，而刚体在$I$处的速度为零，所以两条曲线相互只滚不滑：两曲线上掠过的弧长相等，因为接触点沿任一切线方向没有相对速度。

**欧拉-萨瓦里方程。**取极点$I$为原点、公切线为$x$轴，设固定极曲线的曲率半径为$\rho$、动极曲线为$\rho'$，都从同侧量起。若刚体转过$\mathrm{d}\theta$，极点沿固定极曲线前进一步
$$
\mathrm{d} s = \rho \, \mathrm{d}\phi = - \rho' \left( \mathrm{d}\phi + \mathrm{d}\theta \right)
$$
其中$\mathrm{d}\phi$是公法线的转角。消去$\mathrm{d}\phi$，
$$
\left( \frac{1}{\rho} + \frac{1}{\rho'} \right) \mathrm{d} s = - \mathrm{d}\theta .
$$
把这用于刚体上沿法线距极点$r$的一点$P$，并要求其轨迹的曲率半径为$r_P$、其曲率中心位于拐点圆上，即得**欧拉-萨瓦里方程**
$$
\left( \frac{1}{r} - \frac{1}{\rho} \right) \left( \frac{1}{r} - \frac{1}{\rho'} \right)
= \frac{1}{r^{2}} \left( \frac{\omega_{\text{body}}}{\omega_{\text{pole}}} \right)^{2} \sin^{2} \psi ,
$$
其对凸轮或齿廓设计最有用的形式是
$$
\frac{1}{r_A} + \frac{1}{r_B} = \frac{1}{a} \left( \frac{\sin^{2} \phi_1 + \sin^{2} \phi_2}{\sin^{2} \phi} \right)
$$
把两条节曲线（节极曲线）的曲率半径与中心距$a$及压力角$\phi_1, \phi_2$联系起来。

**评注。**极曲线图像解释了为什么一对**非圆**齿轮能传递给定的变传动比：先选两条相互滚动的节曲线，齿形再按任何方便的齿廓切成共轭的。这也解释了渐开线齿轮为什么行得通——它的节曲线是圆，所以中心距可以变动而不改变传动比，正是这一条性质使齿轮传动对制造误差宽容。拐点圆和欧拉-萨瓦里方程告诉你的，是凸轮轮廓上**根切**从哪里开始，从而也是在不使从动件运动变平的前提下能切出的凸轮最小半径。
:::
:::
