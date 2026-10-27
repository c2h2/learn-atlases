前两章在轨道平面之内求解了二体问题：圆锥曲线的大小和形状，以及给定时刻航天器在曲线上的位置。真实的任务需要更多信息。气象卫星的轨道必须经过两极；通信卫星必须停留在赤道上空；空间站的轨道是倾斜的，以便从高纬度发射场也能到达；而地面上的每一个跟踪站都需要知道把天线指向天空的哪个方向。所有这些问题都涉及轨道在三维空间中的*指向*。本章建立描述轨道的参考坐标系，定义完全确定二体轨道的六个**经典轨道根数**，并推导每个轨道程序都在不断执行的两种转换：从测得的位置和速度（**状态矢量**）到轨道根数，以及反过来。在此过程中，我们还要处理一些棘手的特殊情形——圆轨道和赤道轨道，其中某些根数没有定义——以及星下点轨迹，即卫星在旋转地球上方描出的路径。

所用的数学是矢量代数和旋转矩阵（[线性映射](/learn/maths/lesson.php?c=linear-algebra&l=linear-maps)）；物理内容则完全包含在[[orbital-mechanics/two-body-problem]]之中。

## 参考坐标系 {#sec-frames}

轨道必须在**惯性**坐标系中描述，因为$\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3$只在惯性系中成立。对于地球轨道，标准的选择是以地球为中心、以赤道和恒星定向的坐标系。

::: definition 地心赤道坐标系 {#def-eci}
**地心赤道坐标系**（常称 **ECI**，地心惯性坐标系）的原点在地心，$XY$平面在地球赤道面内，$Z$轴沿地球自转轴指向北极。$X$轴指向**春分点**♈——三月春分时从地球指向太阳的方向，即赤道面与黄道面（地球公转轨道平面）的交线。$Y$轴构成右手系。单位矢量为$\mathbf{I}, \mathbf{J}, \mathbf{K}$。

该坐标系中的方向由**赤经**$\alpha$（在赤道面内从♈向东量取）和**赤纬**$\delta$（赤道以北的角度）给出：
$$
\hat{\mathbf{r}} = \cos\delta\cos\alpha\,\mathbf{I} + \cos\delta\sin\alpha\,\mathbf{J} + \sin\delta\,\mathbf{K}.
$$
:::

该坐标系不随地球转动。但地轴在空间中并非完全固定：太阳和月球对赤道隆起部分的力矩使它以约25 800年的周期**进动**（岁差），并伴有较小的周期性摆动，即**章动**。因此春分点沿黄道每年向西漂移约$50''$，一个“赤道与春分点”坐标系必须与某一日期相联系。现代约定采用标准历元 **J2000.0**（2000年1月1日地球时12:00）的平赤道和平春分点，今天由固定于遥远类星体的国际天球参考架实现。对本课程的精度而言，这些坐标系之间的区别（指向相差不到十分之一角秒）无关紧要；对精密轨道工作则关系重大，由软件库来处理。

我们需要的另一个坐标系固连于轨道本身。

::: definition 近焦点坐标系 {#def-perifocal}
轨道的**近焦点坐标系**（perifocal frame）原点在焦点（吸引体的中心），$x$轴$\hat{\mathbf{p}}$指向近拱点（沿$\mathbf{e}$），$z$轴$\hat{\mathbf{w}}$沿角动量$\mathbf{h}$，$\hat{\mathbf{q}} = \hat{\mathbf{w}}\times\hat{\mathbf{p}}$构成完整的坐标系，因此从$+\hat{\mathbf{w}}$看去航天器沿逆时针方向运动。在该坐标系中运动是平面的，由[[orbital-mechanics/two-body-problem]]，
$$
\mathbf{r} = \frac{h^2}{\mu}\,\frac{1}{1 + e\cos\theta}\begin{bmatrix}\cos\theta\\ \sin\theta\\ 0\end{bmatrix}, \qquad
\mathbf{v} = \frac{\mu}{h}\begin{bmatrix}-\sin\theta\\ e + \cos\theta\\ 0\end{bmatrix}.
$$ {#eq-perifocal}
:::

速度公式由$v_r = (\mu/h)e\sin\theta$和$v_\perp = (\mu/h)(1+e\cos\theta)$沿$\hat{\mathbf{p}}$和$\hat{\mathbf{q}}$分解得出：$v_p = v_r\cos\theta - v_\perp\sin\theta = -(\mu/h)\sin\theta$，$v_q = v_r\sin\theta + v_\perp\cos\theta = (\mu/h)(e + \cos\theta)$。

## 经典轨道根数 {#sec-elements}

二体轨道是一个六阶系统（三个二阶方程）的解，因此需要六个独立常数来确定它；初始位置和速度的任意六个独立函数都可以。经典的选择把它们分成大小和形状（两个）、轨道平面的指向（两个）、平面内的指向（一个）以及沿轨道的位置（一个）。

::: definition 经典轨道根数 {#def-elements}
以$\mathbf{K}$为赤道坐标系的北向轴，定义**节点矢量**$\mathbf{N} = \mathbf{K}\times\mathbf{h}$，它指向**升交点**——航天器向北穿越赤道的点。于是：

1. $h$，**比角动量**（或等价地，**半长轴**$a$）：轨道大小。
2. $e$，**偏心率**：形状。
3. $i$，**轨道倾角**：$\mathbf{K}$与$\mathbf{h}$之间的夹角，$0 \le i \le 180^\circ$。$i < 90^\circ$的轨道为**顺行**轨道（向东运动，与地球自转同向），$i > 90^\circ$为**逆行**轨道；$i = 90^\circ$为**极轨道**。
4. $\Omega$，**升交点赤经**（RAAN）：赤道面内从$\mathbf{I}$到$\mathbf{N}$的角，$0 \le \Omega < 360^\circ$。
5. $\omega$，**近拱点幅角**（argument of periapsis）：轨道平面内从$\mathbf{N}$到$\mathbf{e}$、沿运动方向量取的角，$0 \le \omega < 360^\circ$。
6. $\theta$，给定历元的**真近点角**（或平近点角$M$，或过近拱点时刻）：沿轨道的位置。

**节线**是轨道平面与赤道面的交线，**拱线**是通过近拱点和远拱点的直线。
:::

在二体问题中，六个根数中有五个是常数；只有$\theta$（或$M$）随时间变化。这是轨道根数相对于状态矢量的重大实用优点：它们变化缓慢或根本不变，因此能揭示轨道*是*什么样子；在摄动作用下（[[orbital-mechanics/perturbations]]），它们的缓慢漂移是描述摄动效应的自然方式——节点退行，拱线转动。相比之下，状态矢量每小时都完全改变。

从几何上看：$\Omega$和$i$确定轨道平面（绕$\mathbf{K}$转动$\Omega$使$\mathbf{I}$转到节线上，再绕节线把平面倾斜$i$），然后$\omega$在平面内转动拱线。和$u = \omega + \theta$即从升交点到航天器的角，称为**纬度幅角**（argument of latitude）。

## 由状态矢量求轨道根数 {#sec-rv-to-elements}

跟踪测量给出位置和速度；任务分析需要的是轨道根数。转换只用到矢量$\mathbf{h}$、$\mathbf{N}$和$\mathbf{e}$，并需仔细注意象限。

::: algorithm 由状态矢量求轨道根数 {#alg-rv2el}
给定赤道坐标系中的$\mathbf{r}$、$\mathbf{v}$和$\mu$：

1. $r = \lVert\mathbf{r}\rVert$，$v = \lVert\mathbf{v}\rVert$，径向速度$v_r = \mathbf{r}\cdot\mathbf{v}/r$。
2. $\mathbf{h} = \mathbf{r}\times\mathbf{v}$，$h = \lVert\mathbf{h}\rVert$。
3. 轨道倾角：$i = \arccos(h_Z/h)$——没有歧义，因为$0 \le i \le 180^\circ$。
4. 节点矢量$\mathbf{N} = \mathbf{K}\times\mathbf{h} = (-h_Y,\ h_X,\ 0)$，$N = \lVert\mathbf{N}\rVert$。
5. 升交点赤经：若$N_Y \ge 0$，$\Omega = \arccos(N_X/N)$，否则$\Omega = 360^\circ - \arccos(N_X/N)$。
6. 偏心率矢量：$\mathbf{e} = \dfrac{1}{\mu}\left[\left(v^2 - \dfrac{\mu}{r}\right)\mathbf{r} - r\,v_r\,\mathbf{v}\right]$，$e = \lVert\mathbf{e}\rVert$。
7. 近拱点幅角：若$e_Z \ge 0$（近拱点在北半球），$\omega = \arccos\dfrac{\mathbf{N}\cdot\mathbf{e}}{Ne}$，否则$\omega = 360^\circ - \arccos(\cdot)$。
8. 真近点角：若$v_r \ge 0$（正在远离近拱点），$\theta = \arccos\dfrac{\mathbf{e}\cdot\mathbf{r}}{er}$，否则$\theta = 360^\circ - \arccos(\cdot)$。
9. 半长轴：$a = h^2/[\mu(1-e^2)]$（双曲线为负）。

第6步的公式是把[[orbital-mechanics/two-body-problem]]中的偏心率矢量$\mathbf{e} = \mathbf{v}\times\mathbf{h}/\mu - \mathbf{r}/r$用$\mathbf{v}\times(\mathbf{r}\times\mathbf{v}) = v^2\mathbf{r} - (\mathbf{r}\cdot\mathbf{v})\mathbf{v}$展开的结果。第5、7、8步通过判断矢量位于某个参考平面的哪一侧，消除了$\arccos$的二重歧义。
:::

::: example 被跟踪卫星的轨道根数 {#ex-rv2el}
观测到一颗卫星位于
$$
\mathbf{r} = (-3109,\ 3705,\ 6102)\ \mathrm{km}, \qquad \mathbf{v} = (-6.028,\ -4.649,\ 0.396)\ \mathrm{km/s}.
$$
求其轨道根数。
::: solution
1. $r = 7786.4\ \mathrm{km}$，$v = 7.6228\ \mathrm{km/s}$，$v_r = \mathbf{r}\cdot\mathbf{v}/r = 0.5051\ \mathrm{km/s}$（正在远离近拱点）。
2. $\mathbf{h} = \mathbf{r}\times\mathbf{v} = (29\,835,\ -35\,552,\ 36\,787)\ \mathrm{km^2/s}$，$h = 59\,223\ \mathrm{km^2/s}$。
3. $i = \arccos(36\,787/59\,223) = 51.60^\circ$。
4. $\mathbf{N} = (35\,552,\ 29\,835,\ 0)$，$N = 46\,412$。
5. $N_Y > 0$，所以$\Omega = \arccos(35\,552/46\,412) = 40.00^\circ$。
6. $v^2 - \mu/r = 58.107 - 51.192 = 6.915\ \mathrm{km^2/s^2}$，$rv_r = 3933\ \mathrm{km^2/s}$，所以
$$
\mathbf{e} = \frac{6.915\,(-3109,\ 3705,\ 6102) - 3933\,(-6.028,\ -4.649,\ 0.396)}{398\,600} = (0.00554,\ 0.11014,\ 0.10195),
$$
$e = 0.1502$。
7. $e_Z > 0$，所以$\omega = \arccos\!\big[(35\,552 \times 0.00554 + 29\,835 \times 0.11014)/(46\,412 \times 0.1502)\big] = 60.02^\circ$。
8. $v_r > 0$，所以$\theta = \arccos\!\big[\mathbf{e}\cdot\mathbf{r}/(er)\big] = 29.98^\circ$。
9. $a = 59\,223^2/[398\,600\,(1 - 0.1502^2)] = 9002\ \mathrm{km}$。

**校核：**该轨道的$r_p = a(1-e) = 7650\ \mathrm{km}$，$r_a = 10\,354\ \mathrm{km}$，观测到的$r = 7786\ \mathrm{km}$位于两者之间，刚过近拱点——与$\theta = 30^\circ$和正的$v_r$一致。（这些矢量是由$a = 9000\ \mathrm{km}$、$e = 0.15$、$i = 51.6^\circ$、$\Omega = 40^\circ$、$\omega = 60^\circ$、$\theta = 30^\circ$生成并按所示精度舍入的；求得的根数中的微小差别来自舍入，这说明$a$对速度多么敏感：在这里$1\ \mathrm{m/s}$的速度变化使$a$改变约$3.1\ \mathrm{km}$。）
:::
:::

## 由轨道根数求状态矢量 {#sec-elements-to-rv}

::: proposition 近焦点坐标系到赤道坐标系的变换 {#prop-rotation}
矢量在赤道坐标系中的分量由其近焦点分量按$\mathbf{r}_\text{ECI} = \mathbf{Q}\,\mathbf{r}_\text{pf}$得到，其中
$$
\mathbf{Q} = \mathbf{R}_3(-\Omega)\,\mathbf{R}_1(-i)\,\mathbf{R}_3(-\omega) =
\begin{bmatrix}
\cos\Omega\cos\omega - \sin\Omega\sin\omega\cos i & -\cos\Omega\sin\omega - \sin\Omega\cos\omega\cos i & \sin\Omega\sin i\\
\sin\Omega\cos\omega + \cos\Omega\sin\omega\cos i & -\sin\Omega\sin\omega + \cos\Omega\cos\omega\cos i & -\cos\Omega\sin i\\
\sin\omega\sin i & \cos\omega\sin i & \cos i
\end{bmatrix},
$$ {#eq-Q}
$\mathbf{R}_1(\phi)$和$\mathbf{R}_3(\phi)$是绕第一轴和第三轴的坐标系旋转，
$$
\mathbf{R}_1(\phi) = \begin{bmatrix}1&0&0\\0&\cos\phi&\sin\phi\\0&-\sin\phi&\cos\phi\end{bmatrix}, \qquad
\mathbf{R}_3(\phi) = \begin{bmatrix}\cos\phi&\sin\phi&0\\-\sin\phi&\cos\phi&0\\0&0&1\end{bmatrix}.
$$
$\mathbf{Q}$的各列是在赤道坐标系中表示的单位矢量$\hat{\mathbf{p}}, \hat{\mathbf{q}}, \hat{\mathbf{w}}$。
:::

::: proof
$\mathbf{R}_3(\phi)$给出一个在原坐标系中已知的矢量在绕3轴转过$\phi$的坐标系中的分量（“被动”旋转）。从赤道坐标系出发，绕$\mathbf{K}$转动$\Omega$：新的第一轴沿节线。绕该节线转动$i$：新的第三轴沿$\mathbf{h}$。绕$\mathbf{h}$转动$\omega$：第一轴现在指向近拱点——这就是近焦点坐标系。所以近焦点分量为$\mathbf{r}_\text{pf} = \mathbf{R}_3(\omega)\mathbf{R}_1(i)\mathbf{R}_3(\Omega)\,\mathbf{r}_\text{ECI}$。每个旋转矩阵都是正交的，$\mathbf{R}^{-1} = \mathbf{R}^\mathsf{T} = \mathbf{R}(-\phi)$，因此求逆时顺序和符号都反过来：$\mathbf{r}_\text{ECI} = \mathbf{R}_3(-\Omega)\mathbf{R}_1(-i)\mathbf{R}_3(-\omega)\,\mathbf{r}_\text{pf}$。乘开即得[[#eq-Q]]。第三列是$\mathbf{Q}(0,0,1)^\mathsf{T}$，即近焦点$\hat{\mathbf{w}}$的赤道分量$(\sin\Omega\sin i, -\cos\Omega\sin i, \cos i)$；其$Z$分量$\cos i$印证了$i$作为$\mathbf{h}$与$\mathbf{K}$夹角的定义。
:::

由$\mathbf{Q}$的第三行可直接得到两个有用的推论。$\mathbf{r}$的$Z$分量为$r(\sin\omega\sin i\cos\theta + \cos\omega\sin i\sin\theta) = r\sin i\sin(\omega + \theta)$，所以航天器的**赤纬**（其地心纬度）为
$$
\sin\delta = \sin i\,\sin u, \qquad u = \omega + \theta.
$$ {#eq-declination}
由于$\lvert\sin u\rvert \le 1$，卫星的纬度永远不超过$i$（顺行轨道）或$180^\circ - i$（逆行轨道）：倾角$51.6^\circ$的轨道飞越伦敦（$51.5^\circ\,\mathrm{N}$）时只是勉强擦过，而对$51.6^\circ$以北的地方完全没有覆盖。

::: example 大偏心率轨道的状态矢量 {#ex-el2rv}
一颗卫星的$a = 26\,562\ \mathrm{km}$，$e = 0.737$，$i = 63.4^\circ$，$\Omega = 250^\circ$，$\omega = 270^\circ$，$\theta = 150^\circ$。求它在赤道坐标系中的位置、速度以及赤纬。
::: solution
$h = \sqrt{\mu a(1-e^2)} = \sqrt{398\,600 \times 26\,562 \times 0.45683} = 69\,547\ \mathrm{km^2/s}$，$p = h^2/\mu = 12\,134\ \mathrm{km}$。

近焦点分量，由[[#eq-perifocal]]：$r = 12\,134/(1 + 0.737\cos 150^\circ) = 33\,544\ \mathrm{km}$，所以
$$
\mathbf{r}_\text{pf} = (-29\,050,\ 16\,772,\ 0)\ \mathrm{km}, \qquad
\mathbf{v}_\text{pf} = \frac{398\,600}{69\,547}\,(-0.5,\ 0.737 - 0.8660,\ 0) = (-2.8657,\ -0.7395,\ 0)\ \mathrm{km/s}.
$$
用这些角度计算的旋转矩阵[[#eq-Q]]为
$$
\mathbf{Q} = \begin{bmatrix} -0.4208 & -0.3420 & -0.8402\\ 0.1531 & -0.9397 & 0.3058\\ -0.8942 & 0 & 0.4478\end{bmatrix},
$$
相乘得
$$
\mathbf{r} = (6487,\ -20\,210,\ 25\,975)\ \mathrm{km}, \qquad \mathbf{v} = (1.4587,\ 0.2560,\ 2.5624)\ \mathrm{km/s}.
$$
赤纬：$\sin\delta = \sin 63.4^\circ\sin(270^\circ + 150^\circ) = 0.8942 \times 0.8660 = 0.7744$，$\delta = 50.75^\circ$；直接计算$\arcsin(25\,975/33\,544)$结果一致。

**校核：**$\lVert\mathbf{r}\rVert = 33\,544\ \mathrm{km}$和$\lVert\mathbf{v}\rVert = 2.960\ \mathrm{km/s}$在旋转下不变，活力公式给出$\sqrt{398\,600(2/33\,544 - 1/26\,562)} = 2.960\ \mathrm{km/s}$。把$\mathbf{r}, \mathbf{v}$代回[[#alg-rv2el]]，精确地得回六个根数。$\omega = 270^\circ$时，近地点位于轨道的最南点（$u = 270^\circ$），远地点位于最北点（$u = 90^\circ$），这就是这种几何构型服务于北半球高纬度地区的原因。
:::
:::

::: warning 象限检查与无定义的根数 {#warn-quadrants}
$\arccos$只返回$0$到$180^\circ$之间的角。忘记[[#alg-rv2el]]第5、7、8步中的符号判断，会把降交点轨道放到地球的另一侧，把近拱点翻到错误的半球，或把离去段与返回段混淆——误差都可达$360^\circ - 2\times$（正确答案），而且看起来完全合理。第二个陷阱是**奇异轨道**：$e = 0$时没有近拱点，因此$\omega$和$\theta$无定义；$i = 0$或$180^\circ$时没有节点，因此$\Omega$和$\omega$无定义。在数值上，近圆或近赤道轨道算出的$\omega$、$\Omega$和$\theta$会在相邻两次观测之间剧烈跳动，尽管轨道本身几乎没有变化。应使用下面的替代角，并在软件中对这类轨道采用无奇异的根数组（春分点根数）。
:::

## 圆轨道与赤道轨道 {#sec-special}

当某个根数无定义时，把几个角组合起来，使剩下的角有明确定义：

- **倾斜圆轨道**（$e = 0$，$0 < i < 180^\circ$）：使用**纬度幅角**$u = \omega + \theta$，即从$\mathbf{N}$到$\mathbf{r}$的角：$\cos u = \mathbf{N}\cdot\mathbf{r}/(Nr)$，当$r_Z < 0$时$u > 180^\circ$。
- **赤道椭圆轨道**（$i = 0$）：使用**近拱点经度**$\varpi = \Omega + \omega$，即从$\mathbf{I}$到$\mathbf{e}$的角，当$e_Y < 0$时$\varpi > 180^\circ$（对顺行轨道）。
- **赤道圆轨道**：使用**真经度**$\ell = \Omega + \omega + \theta$，即从$\mathbf{I}$到$\mathbf{r}$的角，当$r_Y < 0$时$\ell > 180^\circ$。地球静止卫星就是这样编目的。

::: example 圆轨道：纬度幅角 {#ex-circular}
一个空间站的状态为$\mathbf{r} = (4432,\ -4796,\ -1817)\ \mathrm{km}$，$\mathbf{v} = (2.5650,\ 4.5095,\ -5.6474)\ \mathrm{km/s}$。证明轨道是圆的，并求$i$、$\Omega$和纬度幅角。
::: solution
$r = 6778.3\ \mathrm{km}$，$v = 7.6686\ \mathrm{km/s}$，在数据舍入精度内等于$\sqrt{\mu/r} = 7.6684\ \mathrm{km/s}$；[[#alg-rv2el]]给出$e = 6\times10^{-5}$，在数据舍入精度内为零。所以$\omega$和$\theta$单独来看没有意义。

$\mathbf{h} = \mathbf{r}\times\mathbf{v} = (35\,279,\ 20\,369,\ 32\,288)\ \mathrm{km^2/s}$，$h = 51\,981$，$i = \arccos(32\,288/51\,981) = 51.60^\circ$。$\mathbf{N} = (-20\,369,\ 35\,279,\ 0)$，$N_Y > 0$，$\Omega = \arccos(-20\,369/40\,737) = 120.0^\circ$。

$\cos u = \mathbf{N}\cdot\mathbf{r}/(Nr) = (-20\,369 \times 4432 - 35\,279 \times 4796)/(40\,737 \times 6778.3) = -0.9397$，$\arccos$给出$160.0^\circ$；但$r_Z < 0$（在赤道以南），所以$u = 360^\circ - 160.0^\circ = 200.0^\circ$。

**校核：**由[[#eq-declination]]，$\sin\delta = \sin 51.6^\circ\sin 200^\circ = -0.268$，直接计算$r_Z/r = -1817/6778 = -0.268$。空间站在$20^\circ$之前、约$5\ \mathrm{min}$前经过了降交点（$u = 180^\circ$）。
:::
:::

## 发射场与轨道倾角 {#sec-launch}

::: proposition 由发射纬度和方位角求轨道倾角 {#prop-azimuth}
航天器在地心纬度为$\phi$的点的正上方入轨，以**方位角**$A$（从北顺时针量取）水平运动，则其轨道倾角满足
$$
\cos i = \cos\phi\,\sin A.
$$ {#eq-azimuth}
特别地，对任何发射方位角都有$i \ge \lvert\phi\rvert$，正东发射（$A = 90^\circ$）时取最小值$i = \lvert\phi\rvert$。
:::

::: proof
在入轨点使用当地单位矢量：$\hat{\mathbf{u}}$向上（径向），$\hat{\mathbf{e}}$向东，$\hat{\mathbf{n}}$向北。水平速度方向为$\hat{\mathbf{v}} = \cos A\,\hat{\mathbf{n}} + \sin A\,\hat{\mathbf{e}}$，轨道法向为$\hat{\mathbf{h}} = \hat{\mathbf{u}}\times\hat{\mathbf{v}} = \cos A\,(\hat{\mathbf{u}}\times\hat{\mathbf{n}}) + \sin A\,(\hat{\mathbf{u}}\times\hat{\mathbf{e}}) = -\cos A\,\hat{\mathbf{e}} + \sin A\,\hat{\mathbf{n}}$（因为$(\hat{\mathbf{e}}, \hat{\mathbf{n}}, \hat{\mathbf{u}})$是右手系）。地轴$\mathbf{K}$的分量为东向$0$、北向$\cos\phi$、向上$\sin\phi$。因此$\cos i = \hat{\mathbf{h}}\cdot\mathbf{K} = \sin A\cos\phi$。由于$\lvert\sin A\rvert \le 1$，$\cos i \le \cos\phi$，即$i \ge \lvert\phi\rvert$。推导假设地球为球形、速度为惯性系速度；运载火箭沿弯曲路径飞行并修正地球自转的影响，但对于经过发射场上空的任何轨道，界限$i \ge \lvert\phi\rvert$都成立。
:::

因此，发射场的纬度就是它无需进行代价高昂的轨道面改变（[[orbital-mechanics/orbital-manoeuvres]]）所能到达的最低轨道倾角。向东发射还能获得地球自转速度$\omega_E R_E\cos\phi = 0.465\cos\phi\ \mathrm{km/s}$；向西（逆行）发射则必须把它补回来。

::: example 空间站的发射方位角 {#ex-azimuth}
肯尼迪航天中心位于北纬$28.5^\circ$。发射要以什么方位角飞行才能到达国际空间站$51.6^\circ$的轨道？
::: solution
$\sin A = \cos i/\cos\phi = \cos 51.6^\circ/\cos 28.5^\circ = 0.6211/0.8788 = 0.7068$，所以对于在升交段经过的情形$A = 44.98^\circ$（东北），对于降交段经过的情形$A = 135.0^\circ$（东南）。

**校核：**从佛罗里达向空间站的载人发射采用的正是东北方位角，上升段沿北美海岸飞行。令$i = 28.5^\circ$得$\sin A = 1$：正东方向，与命题所述一致。
:::
:::

## 星下点轨迹 {#sec-ground-track}

**星下点轨迹**是地球表面上卫星正下方的点所构成的曲线。它由两种运动产生：卫星沿轨道的运动和其下方地球的自转。对于一个$t = 0$时升交点位于经度$\lambda_0$的圆轨道，纬度由[[#eq-declination]]给出，其中$u = nt$，经度为
$$
\lambda = \lambda_0 + \operatorname{atan2}(\cos i\sin u,\ \cos u) - \omega_E\,t,
$$ {#eq-ground-track}
其中$\omega_E = 7.2921\times10^{-5}\ \mathrm{rad/s}$是地球的恒星自转角速度。第一项是从节点量起的卫星赤经（对由节点、卫星和卫星所在子午线的垂足构成的球面直角三角形应用球面三角学）；第二项把赤经换算为地固经度。

每转一圈，地球在下方转过$\omega_E T$，因此相继的赤道穿越点向**西**移动
$$
\Delta\lambda = \omega_E T = 360^\circ \times \frac{T}{86\,164\ \mathrm{s}}.
$$ {#eq-shift}
如果一个恒星日恰好容纳整数$k$圈，即$kT = 86\,164\ \mathrm{s}$，星下点轨迹每天重复——即**回归轨迹**，这对对地观测很有价值（在相同几何条件下重访同一景物），地球静止轨道（$k = 1$，$i = 0$）和闪电轨道（$k = 2$）也是如此。实际上地球扁率还会使节点移动（[[orbital-mechanics/perturbations]]），因此实用的回归轨道在设计时要计入交点周期和节点漂移。

::: widget parametric
fx: mod(atan2(cos(i)*sin(t), cos(t)) - k*t + pi, tau) - pi + 0*sqrt(3.1 - abs(mod(atan2(cos(i)*sin(t), cos(t)) - k*t + pi, tau) - pi))
fy: asin(sin(i)*sin(t))
t: 0, 6*pi
x: -pi, pi
y: -pi/2, pi/2
sliders: i=0.9006:0:3.1416:0.0001; k=0.0644:0.06:1:0.0001
trace: false
equal: true
caption: 圆轨道三圈的星下点轨迹，经度（$x$）和纬度（$y$）以弧度计，起始时升交点位于经度$0$，按[[#eq-declination]]和[[#eq-ground-track]]绘制。滑块$i$是以弧度计的轨道倾角（$0.9006 = 51.6^\circ$），$k = \omega_E/n = T/(86\,164\ \mathrm{s})$是以恒星日为单位的周期（$k = 0.0644$对应$400\ \mathrm{km}$轨道）。每一圈向西移动$2\pi k$（这里为$23^\circ$），轨迹永远不超出纬度$\pm i$。把$i$设为大于$\pi/2$可看到逆行轨迹；设$k = 0.0667$可看到[[#ex-ground-track]]中15圈回归的情形，其第三圈恰好在第一圈以西$48^\circ$；设$k = 1$（地球同步）可看到轨迹缩成围绕某一经度的“8”字形。$\pm\pi$处的小缺口是轨迹在地图边缘折返的地方。
:::

::: example 星下点轨迹的移动与回归轨道 {#ex-ground-track}
(a) 高度$400\ \mathrm{km}$圆轨道的星下点轨迹每圈移动多少度？沿赤道合多少千米？(b) 忽略扁率，什么高度能使星下点轨迹在每恒星日恰好15圈后重复？
::: solution
(a) $T = 5553\ \mathrm{s}$（由[[orbital-mechanics/two-body-problem]]），所以$\Delta\lambda = 360^\circ \times 5553/86\,164 = 23.20^\circ$，沿赤道为$0.4050\ \mathrm{rad} \times 6378\ \mathrm{km} = 2583\ \mathrm{km}$。

(b) $T = 86\,164/15 = 5744.3\ \mathrm{s}$，所以$a = \left[\mu (T/2\pi)^2\right]^{1/3} = 6932\ \mathrm{km}$，高度$554\ \mathrm{km}$。这时每圈恰好移动$24^\circ$，十五圈覆盖经度$360^\circ$后轨迹重复。

**校核：**要在一天之内从这一轨道看到整个赤道，传感器每圈的幅宽至少需要$2583\ \mathrm{km}$——大约是宽视场气象成像仪的幅宽；而幅宽只有几十千米的高分辨率成像仪需要许多天才能填满间隙。
:::
:::

::: quiz
由一颗卫星的状态矢量得到$\mathbf{h} = (0,\ -40\,000,\ -30\,000)\ \mathrm{km^2/s}$。下列哪些说法正确？
- [x] 轨道是逆行的。
- [x] 升交点位于春分点方向（$\Omega = 0$）。
- [ ] 轨道倾角为$36.9^\circ$。
- [ ] 卫星在赤道上空向东运动。
::: solution
$\cos i = h_Z/h = -30\,000/50\,000 = -0.6$，所以$i = 126.9^\circ$：逆行，在赤道处向西运动。$\mathbf{N} = \mathbf{K}\times\mathbf{h} = (-h_Y,\ h_X,\ 0) = (40\,000,\ 0,\ 0)$沿$\mathbf{I}$方向，所以$\Omega = 0$。$36.9^\circ$是忘记$h_Z$的符号时得到的值。
:::
:::

::: history
把参考坐标系与日期联系起来的需要由来已久：公元前2世纪，喜帕恰斯（Hipparchus）把他的恒星位置与更早的观测比较，发现了春分点沿黄道缓慢西移——即岁差，它使“那个”春分点每72年移动约$1^\circ$。20世纪的大部分时间里，天文学家使用由基本星表定义、与某一标准历元的春分点相联系的坐标系，例如历元 J2000.0 的 FK5 星表。1997年，国际天文学联合会采用了国际天球参考系，自1998年1月1日起生效，它由甚长基线干涉测量所测得的河外射电源位置实现；其坐标轴与 J2000.0 的赤道和春分点的对准精度在百分之几角秒以内，因此本章的地心赤道坐标系实际上就是现代标准。
:::

## 后续内容 {#sec-next}

有了轨道根数，外推轨道时只需推进平近点角，在需要位置时再转换回状态矢量。[[orbital-mechanics/orbit-determination]]反过来处理这一问题——由观测求轨道根数——而[[orbital-mechanics/orbital-manoeuvres]]则有意地改变它们。在地球扁率作用下$\Omega$和$\omega$的缓慢漂移，把本章中固定的根数变成缓慢变化的根数，这是[[orbital-mechanics/perturbations]]的主要内容。

::: summary
- 地球轨道在地心赤道坐标系（$X$指向春分点，$Z$指向北极）中描述，实践中与 J2000.0 历元相联系；近焦点坐标系（$x$指向近拱点，$z$沿$\mathbf{h}$）对轨道本身最为自然。
- 六个经典根数：$h$或$a$（大小），$e$（形状），$i$和$\Omega$（轨道平面），$\omega$（拱线），$\theta$或$M$（位置）；在二体问题中只有最后一个随时间变化。
- 由状态矢量求根数要用$\mathbf{h} = \mathbf{r}\times\mathbf{v}$、$\mathbf{N} = \mathbf{K}\times\mathbf{h}$和$\mathbf{e}$，并根据$N_Y$、$e_Z$和$v_r$进行象限判断。
- 由根数求状态矢量：把近焦点坐标系中的$\mathbf{r}, \mathbf{v}$用$\mathbf{Q} = \mathbf{R}_3(-\Omega)\mathbf{R}_1(-i)\mathbf{R}_3(-\omega)$旋转。
- $\sin\delta = \sin i\sin u$：纬度永远不超过轨道倾角（或其补角）；$\cos i = \cos\phi\sin A$：发射场无法直接到达低于其纬度的轨道倾角。
- 圆轨道和赤道轨道使用$u = \omega + \theta$、$\varpi = \Omega + \omega$或$\ell = \Omega + \omega + \theta$。
- 星下点轨迹每圈向西移动$360^\circ\,T/86\,164\ \mathrm{s}$，当一个恒星日容纳整数圈时重复。
:::

## 习题

::: exercise 由角动量求轨道倾角 {level=1 check="42.0"}
一颗卫星的$\mathbf{h} = (-20\,000,\ 30\,000,\ 40\,000)\ \mathrm{km^2/s}$。求其轨道倾角。（以度为单位输入$i$，保留三位有效数字。）
::: solution
$h = \sqrt{20\,000^2 + 30\,000^2 + 40\,000^2} = 53\,852\ \mathrm{km^2/s}$，$i = \arccos(40\,000/53\,852) = 42.0^\circ$。由于$h_Z > 0$，是顺行轨道。
:::
:::

::: exercise 升交点赤经 {level=1 check="233.1"}
某轨道的节点矢量为$\mathbf{N} = (-3,\ -4,\ 0)\times10^4\ \mathrm{km^2/s}$。求$\Omega$。（以度为单位输入，保留四位有效数字。）
::: solution
$\arccos(N_X/N) = \arccos(-0.6) = 126.87^\circ$，但$N_Y < 0$，所以$\Omega = 360^\circ - 126.87^\circ = 233.1^\circ$。如两个分量的符号所示，节点位于赤道面的第三象限。
:::
:::

::: exercise 星下点轨迹的移动 {level=1 check="25.1"}
一颗卫星的轨道周期为$100.0\ \mathrm{min}$。其星下点轨迹每圈移动多少度经度？（以度为单位输入向西的移动量，保留三位有效数字。）
::: solution
$\Delta\lambda = 360^\circ \times 6000/86\,164 = 25.1^\circ$，向西。
:::
:::

::: exercise 由状态矢量求近拱点幅角 {level=2 check="200.0"}
一颗卫星位于$\mathbf{r} = (-1141,\ -8674,\ 1518)\ \mathrm{km}$，$\mathbf{v} = (6.546,\ -0.315,\ -3.690)\ \mathrm{km/s}$。求$e$、$i$、$\Omega$、$\omega$和$\theta$。（以度为单位输入$\omega$，保留四位有效数字。）
::: solution
$r = 8879.4\ \mathrm{km}$，$v = 7.521\ \mathrm{km/s}$，$v_r = -1.164\ \mathrm{km/s}$（正在接近近拱点）。$\mathbf{h} = (32\,485,\ 5727,\ 57\,139)$，$h = 65\,977\ \mathrm{km^2/s}$，$i = \arccos(57\,139/65\,977) = 30.0^\circ$。$\mathbf{N} = (-5727,\ 32\,485,\ 0)$，$N_Y > 0$，$\Omega = \arccos(-5727/32\,986) = 100.0^\circ$。$\mathbf{e} = (0.1364,\ -0.2622,\ -0.0512)$，$e = 0.300$。$e_Z < 0$，所以$\omega = 360^\circ - \arccos(\mathbf{N}\cdot\mathbf{e}/Ne) = 360^\circ - 160.0^\circ = 200.0^\circ$。$v_r < 0$，所以$\theta = 360^\circ - 40.0^\circ = 320.0^\circ$，且$a = 12\,001\ \mathrm{km}$。两处象限修正都是必需的；没有它们，会得到$\omega = 160^\circ$和$\theta = 40^\circ$，即拱线另一侧的位置。
:::
:::

::: exercise 由轨道根数求纬度 {level=2 check="44.4"}
一颗太阳同步卫星的$i = 98.0^\circ$，$\omega = 90^\circ$，位于$\theta = 45^\circ$。它的地心纬度是多少？（以度为单位输入纬度，保留三位有效数字。）
::: solution
$u = \omega + \theta = 135^\circ$，$\sin\delta = \sin 98^\circ\sin 135^\circ = 0.9903 \times 0.7071 = 0.7002$，$\delta = 44.4^\circ\,\mathrm{N}$。卫星已越过其轨道的最北点（$u = 90^\circ$，纬度$82^\circ\,\mathrm{N}$，即$180^\circ - 98^\circ$），正向南运动。
:::
:::

::: exercise 十四圈回归 {level=2 check="881"}
忽略扁率，圆轨道在什么高度上每恒星日恰好运行14圈？（以 km 为单位输入高度，精确到千米。）
::: solution
$T = 86\,164/14 = 6154.6\ \mathrm{s}$，$a = \left[398\,600 \times (6154.6/2\pi)^2\right]^{1/3} = 7258.7\ \mathrm{km}$，高度$881\ \mathrm{km}$。（计入扁率后，由于节点和纬度幅角的漂移，答案会变化若干千米；参见[[orbital-mechanics/perturbations]]。）
:::
:::

::: exercise 逆行轨道的代价 {level=3 check="0.817"}
利用[[#prop-azimuth]]，证明从纬度$\phi$的发射场出发，轨道倾角为$i$和$180^\circ - i$的轨道所需的方位角互为镜像。然后，对于位于北纬$28.5^\circ$的发射场，比较正东发射（$i = 28.5^\circ$）获得的自转速度与正西发射（$i = 151.5^\circ$）损失的速度。向西发射必须多提供多少速度？赤道自转速度取$0.4651\ \mathrm{km/s}$。（以 km/s 为单位输入差值，保留三位有效数字。）
::: solution
$\cos(180^\circ - i) = -\cos i$，所以$\sin A' = -\sin A$，即$A' = -A$（或$180^\circ + A$）：方位角被反射到西侧。$28.5^\circ$处的地表速度为$0.4651\cos 28.5^\circ = 0.4087\ \mathrm{km/s}$。向东发射时，运载器沿其飞行路径的初速为$+0.4087\ \mathrm{km/s}$；向西发射时为$-0.4087$。向西发射必须多提供$2 \times 0.4087 = 0.817\ \mathrm{km/s}$——约为轨道速度的$10\,\%$——这就是只有在任务需要时才发射逆行轨道的原因。太阳同步轨道的$i$接近$98^\circ$，只是略呈逆行：它们几乎朝正南（或正北）发射，只损失地球自转速度的一个小分量。
:::
:::

::: exercise 轨道上的赤经 {level=3}
(a) 由矩阵$\mathbf{Q}$证明航天器的赤经$\alpha$满足$\tan(\alpha - \Omega) = \cos i\tan u$，这是[[#eq-ground-track]]的基础。(b) 证明对极轨道（$i = 90^\circ$），赤经除了在两极上空跳变$180^\circ$外保持不变，并解释其星下点轨迹。(c) 解释为什么$i = 30^\circ$、$e = 0$的地球同步轨道描出以赤道为中心的“8”字形，并求其纬度范围。
::: solution
(a) 在近焦点坐标系中$\mathbf{r} = r(\cos\theta, \sin\theta, 0)$；先绕$\hat{\mathbf{w}}$转过$\omega$，得到节点坐标系中的坐标$r(\cos u, \sin u, 0)$，其第一轴为节线。然后绕节线转过$-i$、绕$\mathbf{K}$转过$-\Omega$：在第一轴沿节线、第三轴沿$\mathbf{K}$的坐标系中，$\mathbf{r} = r(\cos u,\ \cos i\sin u,\ \sin i\sin u)$。这个矢量在赤道面内从节点量起的方位角为$\alpha - \Omega$，$\tan(\alpha - \Omega) = \cos i\sin u/\cos u = \cos i\tan u$（象限由符号确定，即$\operatorname{atan2}(\cos i\sin u, \cos u)$）。

(b) 由于$\cos i = 0$，$\tan(\alpha - \Omega) = 0$，所以当$-90^\circ < u < 90^\circ$时$\alpha = \Omega$，否则$\alpha = \Omega + 180^\circ$：轨道位于惯性空间中的一个子午面内。在旋转的地球上方，轨迹是一系列近似南北走向的线，每条向西错开$\omega_E T$，因此极轨卫星最终能看到整个地球。

(c) 当$T$等于恒星日时，平均角速度等于$\omega_E$。相对于节点的经度为$\operatorname{atan2}(\cos i\sin u, \cos u) - u$，它在$u = 0, 90^\circ, 180^\circ, 270^\circ$处为零，在其间振荡（$i = 30^\circ$时最大约$\pm 4.1^\circ$）——每天两次，形成两个瓣。纬度每天在$\pm 30^\circ$之间振荡一次。经度振荡两次、纬度振荡一次，便形成纬度范围为$\pm 30^\circ$的“8”字形。
:::
:::
