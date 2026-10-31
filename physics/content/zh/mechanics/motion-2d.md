越过庭院的石块做的并不是 [[mechanics/motion-1d]] 里的一维运动。在选定的直线上，一个带符号的坐标就够了。在平面内，石块既有水平位置又有竖直位置，而两者的变化原因不同。若不计空气阻力，水平方向没有任何东西推或拽石块，所以水平速度保持抛出时给它的数值。竖直方向石块处于自由落体，加速度是与从静止释放的物体相同的常数。弯曲的轨迹不是第三种运动，它是这两段运动同时进行时描出的曲线。

石块落在何处，升多高，在空中停留多久？射程的单一表达式只有在这些问题成为分量方程之后才"挣得"，而且只有当落地高度等于抛出高度时成立。从悬崖抛出，或抛向斜坡，那个表达式就是错误的工具。带着题目真正给定的落地高度的分量方程才是正确的工具。

位置、速度与加速度是向量，逐分量求导。抛体运动是水平分量为零的恒定加速度运动。相对速度是一次减法。匀速圆周运动到圆心的距离固定，所以速率可以恒定而速度不恒定，且加速度指向圆心。这些都不涉及力叫什么名字，那是 [[mechanics/newton-laws]] 的事。

除题目另有说明外，全文取 $g = 9.80\,\mathrm{m/s^{2}}$，取 $y$ 向上为正，并且除某段评注明说"忽略本身就是重点"之处外，都不计空气阻力。出现在导数内部的角，例如乘积 $\omega t$，用弧度。以度数给出的抛射角在 $\sin$ 与 $\cos$ 内部保留度数；只有当它作为纯数用于 $\omega t$ 时才换算成弧度。

## 位置、速度与加速度

在平面内选定一个原点和两条固定的垂直坐标轴，单位向量为 $\mathbf{i}$ 与 $\mathbf{j}$。质点在时刻 $t$ 的**位置**是从原点指向质点的向量

$$
\mathbf{r}(t) = x(t)\,\mathbf{i} + y(t)\,\mathbf{j}.
$$

坐标 $x(t)$ 与 $y(t)$ 是关于时间的普通函数，本章后面的一切都由它们求导得到。原点是选出来的。导数不依赖原点放在哪里，坐标本身则依赖。

::: definition 位置、速度与加速度 {#def-pva}
**速度**与**加速度**是导数

$$
\mathbf{v} = \deriv{\mathbf{r}}{t} = \deriv{x}{t}\,\mathbf{i} + \deriv{y}{t}\,\mathbf{j}, \qquad \mathbf{a} = \deriv{\mathbf{v}}{t} = \deriv{v_x}{t}\,\mathbf{i} + \deriv{v_y}{t}\,\mathbf{j}.
$$ {#eq-velocity}

等价地，$\mathbf{v}$ 是平均速度在区间消失时的极限

$$
\mathbf{v}(t) = \lim_{\Delta t \to 0} \frac{\mathbf{r}(t+\Delta t) - \mathbf{r}(t)}{\Delta t},
$$

而 $\mathbf{a}$ 是对 $\mathbf{v}$ 施行同样的构造。**速率**是大小 $\abs{\mathbf{v}}$，是一个标量。速度才是向量。
:::

这个极限就是 [[mechanics/motion-1d]] 在直线上使用的定义，现在作用在 $\mathbf{r}$ 上。在固定坐标轴中求导逐分量进行，所以平面里的计算就是两个一维计算，最后再拼合。速率不是 $v_x + v_y$，$\mathbf{v}$ 的方向也不必是 $\mathbf{r}$ 的方向。

有两个推论被不断用到。速度沿轨迹的切线方向，因为在短时间间隔内 $\Delta\mathbf{r}$ 沿着轨迹。而 $\mathbf{a} = \mathbf{0}$ 意味着 $\mathbf{v}$ 的每个分量都是常数，于是质点以恒定速率沿直线运动。单凭速率恒定并不能推出 $\mathbf{a} = \mathbf{0}$：$\mathbf{v}$ 的方向仍可能在变。本章后面的圆周运动就是标准反例。

::: proposition 分运动 {#prop-components}
设 $\mathbf{a} = a_x\,\mathbf{i} + a_y\,\mathbf{j}$ 为常向量。则

$$
\mathbf{v}(t) = \mathbf{v}_0 + \mathbf{a}\, t, \qquad \mathbf{r}(t) = \mathbf{r}_0 + \mathbf{v}_0\, t + \tfrac{1}{2}\mathbf{a}\, t^{2},
$$ {#eq-const-a}

其中 $\mathbf{r}_0 = \mathbf{r}(0)$、$\mathbf{v}_0 = \mathbf{v}(0)$。每个坐标都是一个独立的、加速度恒定的一维运动。更一般地，即使加速度不恒定，只要 $a_x$ 只依赖 $t$、$x$ 与 $v_x$，坐标 $x$ 就可以单独求解；$y$ 同理。
:::

::: proof
把 $\mathbf{a} = \deriv{\mathbf{v}}{t}$ 写开。若 $\mathbf{a}$ 恒定，从 $0$ 到 $t$ 积分得 $\mathbf{v}(t) - \mathbf{v}_0 = \mathbf{a}\, t$。第二次积分用到 $v_x = \deriv{x}{t}$：

$$
x(t) - x(0) = \int_0^t \bigl(v_{x0} + a_x t'\bigr)\,\dd t' = v_{x0}\, t + \tfrac{1}{2} a_x t^{2},
$$

$y$ 方向同样计算。两个分量相加就是 [[#eq-const-a]]。$x$ 的积分中没有一处提到 $y$ 或 $v_y$，所以水平运动可以在竖直运动开始之前就先做完。只要 $x$ 的微分方程不含 $y$ 或 $v_y$（反之亦然），即使加速度不恒定，同样的分离也成立：此时每个方程都是一个封闭的一维问题，有自己的初始条件。
:::

这种分离是一个假设，不是自然定律。通常形式的空气阻力依赖速率 $\sqrt{v_x^{2} + v_y^{2}}$，于是 $x$ 方程里的阻力依赖 $v_y$，[[#eq-const-a]] 就不再描述这段运动。不计空气阻力的抛体是第一个应用，因为在那里分离确实成立。

::: example 读一个位置函数 {#ex-position}
一质点在平面内运动，位置（$t$ 以秒计时以米计）为

$$
\mathbf{r}(t) = \bigl(0.500\, t^{3}\bigr)\,\mathbf{i} + \bigl(2.00\, t\bigr)\,\mathbf{j}.
$$

求任意时刻的速度与加速度，以及 $t = 2.00\,\mathrm{s}$ 时的位置、速度、速率和加速度。
::: solution
按 [[#def-pva]] 逐分量求导。$0.500\, t^{3}$ 的导数是 $1.50\, t^{2}$，$2.00\, t$ 的导数是 $2.00$，所以

$$
\mathbf{v}(t) = \bigl(1.50\, t^{2}\bigr)\,\mathbf{i} + 2.00\,\mathbf{j}, \qquad \mathbf{a}(t) = \bigl(3.00\, t\bigr)\,\mathbf{i}.
$$

$y$ 方向加速度为零：竖直运动在整个过程中都是 $2.00\,\mathrm{m/s}$ 的匀速运动。水平加速度与 $t$ 成正比增长。两个分量互不干涉——这正是 [[#prop-components]] 中的分离，$\mathbf{a}$ 不恒定的情形。

$t = 2.00\,\mathrm{s}$ 时，

$$
\begin{aligned}
\mathbf{r} &= \bigl(0.500 \times 8.00\bigr)\,\mathbf{i} + \bigl(2.00 \times 2.00\bigr)\,\mathbf{j} = 4.00\,\mathbf{i} + 4.00\,\mathbf{j}\ \mathrm{m}, \\
\mathbf{v} &= \bigl(1.50 \times 4.00\bigr)\,\mathbf{i} + 2.00\,\mathbf{j} = 6.00\,\mathbf{i} + 2.00\,\mathbf{j}\ \mathrm{m/s}, \\
\mathbf{a} &= \bigl(3.00 \times 2.00\bigr)\,\mathbf{i} = 6.00\,\mathbf{i}\ \mathrm{m/s^{2}}.
\end{aligned}
$$

速率是速度的大小，不是分量之和：

$$
\abs{\mathbf{v}} = \sqrt{6.00^{2} + 2.00^{2}} = \sqrt{40.0} = 6.325\,\mathrm{m/s}.
$$

速度方向在 $x$ 轴上方 $\arctan(2.00/6.00) = 18.43^{\circ}$，而位置矢量在 $45^{\circ}$ 方向。两个向量不必平行。
:::
:::

::: intuition 两只时钟，一条轨迹
把两个坐标想成由同样的初始条件启动的两只时钟。$x$ 时钟不看 $y$ 时钟。每个时刻把两只都读出来，描出点 $(x, y)$。即使每只时钟单独看都只是普通的一维运动，轨迹照样可以弯曲、绕圈或折返。反过来，复杂的轨迹并不意味着分量方程复杂，也许只是两个简单运动被放在一起读而已。
:::

## 抛体运动

这里的**抛体**指以速率 $v$、沿水平方向上方 $\theta$ 角抛出，此后只受重力加速的质点。把抛出点放在原点，取 $y$ 向上为正，不计空气阻力。则 $a_x = 0$ 且 $a_y = -g$，两者都恒定，所以 [[#prop-components]] 适用，其中 $\mathbf{v}_0 = (v\cos\theta)\,\mathbf{i} + (v\sin\theta)\,\mathbf{j}$。

::: theorem 水平地面上的抛体 {#thm-projectile}
在这些条件下，分量为

$$
x(t) = (v\cos\theta)\, t, \qquad y(t) = (v\sin\theta)\, t - \tfrac{1}{2} g t^{2}.
$$ {#eq-xy}

只要抛体还在空中且 $\cos\theta \neq 0$，轨迹就是抛物线

$$
y = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$ {#eq-traj}

相对抛出点的最大高度为

$$
H = \frac{(v\sin\theta)^{2}}{2g},
$$ {#eq-height}

在时刻 $t_H = (v\sin\theta)/g$ 到达，前提 $\sin\theta > 0$。若此外抛体返回抛出时的高度——落地高度等于抛出高度——则**飞行时间**与**射程**为

$$
T = \frac{2 v\sin\theta}{g}, \qquad R = \frac{v^{2}\sin 2\theta}{g}.
$$ {#eq-range}
:::

::: proof
按 [[#prop-components]] 的方式，从初始速度积分 $a_x = 0$ 与 $a_y = -g$。水平速度从不改变，所以 $x = (v\cos\theta)\, t$。竖直速度为 $v_y = v\sin\theta - g t$，再从 $y(0) = 0$ 积分一次得 [[#eq-xy]] 的第二式。

最高点处竖直速度为零，所以 $t_H = (v\sin\theta)/g$。代入 $y(t)$：

$$
H = (v\sin\theta)\cdot\frac{v\sin\theta}{g} - \tfrac{1}{2} g\left(\frac{v\sin\theta}{g}\right)^{2} = \frac{v^{2}\sin^{2}\theta}{g} - \frac{v^{2}\sin^{2}\theta}{2g} = \frac{(v\sin\theta)^{2}}{2g}.
$$

这一步只用到了 $v_y = 0$，并不要求抛体落回 $y = 0$，所以 [[#eq-height]] 在悬崖上和在水平地面上都是相对抛出点的高度。

要从 [[#eq-xy]] 中消去 $t$，先从水平方程解出时间 $t = x/(v\cos\theta)$，这一步需要 $\cos\theta \neq 0$：竖直抛出是一条直线，不是函数 $y(x)$ 的图像。代入：

$$
y = (v\sin\theta)\cdot\frac{x}{v\cos\theta} - \tfrac{1}{2} g\frac{x^{2}}{v^{2}\cos^{2}\theta} = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$

这就是 [[#eq-traj]]。右端是 $x$ 的二次多项式，所以只要恒定加速度模型成立，轨迹就是抛物线。

现在施加水平地面条件 $y(T) = 0$，且 $T > 0$。由 [[#eq-xy]]，

$$
0 = T\left(v\sin\theta - \tfrac{1}{2} g T\right),
$$

所以 $T = 2 v\sin\theta / g$。因子 $T = 0$ 就是抛出时刻本身。射程是较晚这个根处的水平位置：

$$
R = x(T) = (v\cos\theta)\cdot\frac{2 v\sin\theta}{g} = \frac{v^{2}\,(2\sin\theta\cos\theta)}{g} = \frac{v^{2}\sin 2\theta}{g},
$$

最后一步是二倍角公式。角度之所以作为 $2\theta$ 而不是乘积 $\sin\theta\cos\theta$ 出现，唯一的原因就是这个公式。
:::

::: corollary 最大射程与互余角 {#cor-range}
在水平地面上，$v$ 与 $g$ 固定且 $0 < \theta < 90^{\circ}$ 时，射程 $R(\theta) = (v^{2}/g)\sin 2\theta$ 在 $\theta = 45^{\circ}$ 处最大，此时

$$
R_{\max} = \frac{v^{2}}{g}.
$$

角度 $\theta$ 与 $90^{\circ} - \theta$ 给出相同的射程。它们给出的最大高度与飞行时间并不相同。
:::

::: proof
$\theta$ 在 $0$ 与 $90^{\circ}$ 之间时，二倍角 $2\theta$ 在 $0$ 与 $180^{\circ}$ 之间，此处 $\sin 2\theta \le 1$，等号仅当 $2\theta = 90^{\circ}$、即 $\theta = 45^{\circ}$ 时成立。因此 $R \le v^{2}/g$，等号仅在 $45^{\circ}$。

第二句：把 $\theta$ 换成 $90^{\circ} - \theta$。则 $2(90^{\circ} - \theta) = 180^{\circ} - 2\theta$，而 $\sin(180^{\circ} - 2\theta) = \sin 2\theta$，所以 $R$ 不变。高度 [[#eq-height]] 依赖 $\sin^{2}\theta$，而 $\sin(90^{\circ} - \theta) = \cos\theta$，所以两个高度仅当 $\sin\theta = \cos\theta$、即恰在 $45^{\circ}$ 时相等。飞行时间之比等于正弦之比，同样只在 $45^{\circ}$ 相等。
:::

在水平地面上，上升与下落各耗时 $T/2$，因为 $v_y$ 以恒定速率从 $+v\sin\theta$ 变到 $-v\sin\theta$。又 $v_x$ 恒定，所以最高点在射程的正中间。这种对称属于起止等高的飞行；下面的悬崖例子就没有它。作为量纲校验，$v^{2}/g$ 是长度，$v/g$ 是时间，正是 [[#eq-range]] 与 [[#eq-height]] 所要求的。

::: widget projectile
v: 20
angle: 30
g: 9.8
caption: 改变抛射角，比较 30° 与 60°。水平地面上射程相同，而较陡的轨迹升得更高。注意射程在 45° 附近最大。
:::

::: example 水平地面上的三十度与六十度 {#ex-level}
一抛体从水平地面以 $20.0\,\mathrm{m/s}$ 抛出。取 $g = 9.80\,\mathrm{m/s^{2}}$，不计空气阻力。求 $\theta = 30^{\circ}$ 时的飞行时间、射程和最大高度，再对 $\theta = 60^{\circ}$ 重做一遍。
::: solution
落地高度等于抛出高度，所以 [[#thm-projectile]] 适用。$\theta = 30^{\circ}$ 时 $\sin 30^{\circ} = 1/2$、$\sin 60^{\circ} = \sqrt{3}/2$，射程公式里的二倍角是 $60^{\circ}$。

$$
\begin{aligned}
T &= \frac{2 \times 20.0 \times \sin 30^{\circ}}{9.80} = \frac{20.0}{9.80} = 2.041\,\mathrm{s}, \\
R &= \frac{20.0^{2} \times \sin 60^{\circ}}{9.80} = \frac{400 \times \sin 60^{\circ}}{9.80} = 35.35\,\mathrm{m}, \\
H &= \frac{(20.0 \times \sin 30^{\circ})^{2}}{2 \times 9.80} = \frac{10.0^{2}}{19.60} = 5.102\,\mathrm{m}.
\end{aligned}
$$

水平速度恒为 $20.0 \times \cos 30^{\circ} = 17.32\,\mathrm{m/s}$。最高点处竖直分量为零，所以速率是 $17.32\,\mathrm{m/s}$ 而不是零：消失的只有一个分量。最高点在 $x = R/2 = 17.67\,\mathrm{m}$，即射程的中点，时刻为 $T/2 = 1.020\,\mathrm{s}$。

$\theta = 60^{\circ}$ 时二倍角是 $120^{\circ}$，而 $\sin 120^{\circ} = \sin 60^{\circ}$。射程因此同样是 $35.35\,\mathrm{m}$，正如 [[#cor-range]] 所要求。竖直方向抛出速率为 $20.0 \times \sin 60^{\circ} = 17.32\,\mathrm{m/s}$，于是

$$
H = \frac{17.32^{2}}{19.60} = 15.31\,\mathrm{m}, \qquad T = \frac{2 \times 17.32}{9.80} = 3.535\,\mathrm{s}.
$$

高度未舍入的值是 $(10.0\sqrt{3})^{2}/19.60 = 300/19.60$，四位有效数字即 $15.31\,\mathrm{m}$。高度是 $30^{\circ}$ 值的三倍，因为 $H$ 依赖 $\sin^{2}\theta$，而 $\sin 60^{\circ}/\sin 30^{\circ} = \sqrt{3}$。飞行时间则只增大 $\sqrt{3}$ 倍，不是 $3$ 倍。最高点处速率为 $20.0\times\cos 60^{\circ} = 10.0\,\mathrm{m/s}$，而较平的抛射是 $17.32\,\mathrm{m/s}$：同样的射程走得更慢，所以花的时间更长。
:::
:::

widget 使用 $g = 9.8\,\mathrm{m/s^{2}}$，在该显示的精度下与 $9.80$ 是同一个数。对水平落地，从图上读出的射程应与 [[#eq-range]] 相符。对低于抛出点的落地则不会相符，因为这张图同那条公式一样，把抛体带回到抛出高度。

::: example 从悬崖抛出 {#ex-cliff}
一石块从悬崖边缘以 $15.0\,\mathrm{m/s}$、与水平方向成 $40^{\circ}$ 角向上抛出。下方地面比抛出点低 $20.0\,\mathrm{m}$。取 $g = 9.80\,\mathrm{m/s^{2}}$，不计空气阻力。求飞行时间以及落地点到崖边的水平距离。
::: solution
落地高度不等于抛出高度，所以 [[#eq-range]] 中的射程公式不可用。保留 [[#eq-xy]]，并令 $y = -20.0\,\mathrm{m}$ 而不是 $y = 0$。由 $\sin 40^{\circ} = 0.6428$、$\cos 40^{\circ} = 0.7660$，

$$
v_{x} = 15.0 \times 0.7660 = 11.49\,\mathrm{m/s}, \qquad v_{y0} = 15.0 \times 0.6428 = 9.642\,\mathrm{m/s}.
$$

竖直方程化为 $-20.0 = 9.642\, t - \tfrac{1}{2}(9.80)\, t^{2}$，整理成二次方程

$$
4.90\, t^{2} - 9.642\, t - 20.0 = 0.
$$

要取正根。解完求根公式，或用等价的闭合形式 $t = \bigl[v_{y0} + \sqrt{v_{y0}^{2} + 2 g h}\bigr]/g$（$h = 20.0\,\mathrm{m}$），

$$
\sqrt{9.642^{2} + 2 \times 9.80 \times 20.0} = \sqrt{92.97 + 392.0} = \sqrt{484.97} = 22.02,
$$

$$
t = \frac{9.642 + 22.02}{9.80} = \frac{31.66}{9.80} = 3.231\,\mathrm{s}.
$$

二次方程的负根对应数学抛物线上抛出之前的时刻，舍去。水平速度恒定，所以落地在

$$
x = 11.49 \times 3.231 = 37.13\,\mathrm{m}
$$

处（距崖边）。若误用 $R = v^{2}\sin 2\theta / g$（$2\theta = 80^{\circ}$），结果会是 $22.61\,\mathrm{m}$，比真实落点短了三分之一还多。在这里那条公式并不是一个粗糙的近似，它回答的是另一个问题：假如没有悬崖、地面就在抛出高度处，石块会落在哪里。

相对抛出点的最大高度仍然是 [[#eq-height]]，因为那个结论从未用到落地条件：$H = 9.642^{2}/19.60 = 4.743\,\mathrm{m}$，到达时刻为 $9.642/9.80 = 0.984\,\mathrm{s}$，水平位置 $11.31\,\mathrm{m}$。它离落点 $37.13\,\mathrm{m}$ 的中点差得很远。关于最高点的对称性属于水平地面。

落地瞬间，$v_y = 9.642 - 9.80 \times 3.231 = -22.02\,\mathrm{m/s}$，而 $v_x$ 仍是 $11.49\,\mathrm{m/s}$。落地速率为 $\sqrt{11.49^{2} + 22.02^{2}} = 24.84\,\mathrm{m/s}$，大于抛出速率，因为石块低了 $20.0\,\mathrm{m}$，竖直分量增大了。这里不需要任何能量论证；分量就够了。
:::
:::

::: warning 射程公式不适用的情形
表达式 $R = v^{2}\sin 2\theta / g$ 需要两个限制：不计空气阻力，且落地高度等于抛出高度。任何一个不满足，表达式就不成立。有空气阻力时 $a_x$ 不为零，两个分量通过速率耦合。落地更低时（如 [[#ex-cliff]]），飞行时间是某个二次方程的正根，而水平地面的射程可能错掉一个很大的比例。高度 [[#eq-height]] 的适用范围更宽：只要 $a_y = -g$ 且抛体确实上升过，它就是相对抛出点的最大高度。
:::

::: history 两种运动的合成
伽利略（Galileo）在《两门新科学对话》（*Two New Sciences*，1638）中论证：不计空气阻力时抛体沿抛物线运动，因为水平运动是匀速的，竖直运动则是与自由落体相同的匀加速运动。他把空气阻力当作一种单独效应，它把真实轨迹从那根曲线上拽开。这一论证是运动学的。$a_x = 0$、$a_y = -g$ 背后的力学定律要到半个世纪后才由牛顿（Newton）给出；[[#thm-projectile]] 至今沿用的，是伽利略对两种运动的分离。
:::

::: quiz
一抛体在水平地面上抛出，不计空气阻力。下列说法哪个正确？
- [ ] 速率恒定，因为加速度恒定。
- [ ] 射程在 $60^{\circ}$ 处最大，因为那次飞行比 $45^{\circ}$ 的久。
- [x] 水平速度恒定，且 $30^{\circ}$ 与 $60^{\circ}$ 的射程相等。
- [ ] 公式 $R = v^{2}\sin 2\theta / g$ 对远低于抛出点的落地也成立。
::: solution
恒定的加速度改变速度，所以速率不恒定：在 [[#ex-level]] 中它从 $20.0\,\mathrm{m/s}$ 降到最高点的 $17.32\,\mathrm{m/s}$。[[#cor-range]] 把最大射程放在 $45^{\circ}$，并使 $30^{\circ}$ 与 $60^{\circ}$ 的射程相等。射程公式要求在抛出高度处落地，这正是最后一个说法失败的原因，[[#ex-cliff]] 已经演示过。水平速度恒定，因为 $a_x = 0$。
:::
:::

::: application 从飞机上投放的包裹
一架飞机以 $60.0\,\mathrm{m/s}$ 水平飞行，从 $44.1\,\mathrm{m}$ 高度投放一个包裹。在地面参考系中，包裹继承了飞机的水平速度，竖直初速度为零：这是一个 $\theta = 0$ 的抛体。竖直方向 $4.90\, t^{2} = 44.1$，所以 $t = 3.00\,\mathrm{s}$。水平方向它前进 $60.0\times 3.00 = 180\,\mathrm{m}$。水平地面的射程公式不适用，因为包裹从不返回投放高度。同一次投放若从飞机上观察则是从静止开始下落；两种描述相差的正是两个参考系之间的相对速度。
:::

## 相对速度

选定参考系之前，位置没有任何意义。若同时使用两个参考系——地面与河水，或地面与运动的船——在两个参考系中测得的速度相差两系之间的相对速度。设 $\mathbf{r}_A$ 与 $\mathbf{r}_B$ 是同一个惯性系中的位置，并写 $\mathbf{r}_A = \mathbf{r}_B + \mathbf{r}_{A/B}$，其中 $\mathbf{r}_{A/B}$ 是 $A$ 相对 $B$ 的位置。

::: proposition 相对速度 {#prop-relative}
对 $\mathbf{r}_A = \mathbf{r}_B + \mathbf{r}_{A/B}$ 关于时间求导，得

$$
\mathbf{v}_A = \mathbf{v}_B + \mathbf{v}_{A/B}, \qquad \mathbf{v}_{A/B} = \mathbf{v}_A - \mathbf{v}_B.
$$ {#eq-relative}

$A$ 相对 $B$ 的速度是 $A$ 的速度减去 $B$ 的速度，两者在同一参考系中取。交换标签时减法反号：$\mathbf{v}_{B/A} = -\mathbf{v}_{A/B}$。
:::

::: proof
两个位置都是同一参考系中的向量，可以在该系中求导。和的导数是导数的和：

$$
\deriv{\mathbf{r}_A}{t} = \deriv{\mathbf{r}_B}{t} + \deriv{\mathbf{r}_{A/B}}{t}.
$$

前两个导数就是 $\mathbf{v}_A$ 与 $\mathbf{v}_B$。定义 $\mathbf{v}_{A/B} = \deriv{\mathbf{r}_{A/B}}{t}$。移项即得 [[#eq-relative]]。交换标签 $A$ 与 $B$ 使差变号，所以 $\mathbf{v}_{B/A} = -\mathbf{v}_{A/B}$。这一论证只用到了一个参考系中位移的经典相加，并不要求任何一个质点做匀速运动。
:::

这段论证是经典运动学：两个参考系共用一个时间，速度按向量相加。它没有说哪个参考系是惯性系，也不是相对论的速度合成。它的实用内容是一种标签的纪律。当水在流动时，"船的速度"是不完整的说法。相对水的速率与相对地面的速率是两个不同的数，而渡河时间用的是其中之一，不是两者的混合物。

::: example 渡河 {#ex-river}
一条河宽 $80.0\,\mathrm{m}$，以 $2.00\,\mathrm{m/s}$ 向下游流动。船相对水的速率由舵手控制。取 $x$ 轴垂直指向对岸，$y$ 轴指向下游。

(a) 船头正对对岸，相对水的速率为 $1.50\,\mathrm{m/s}$。求到达对岸的时间、向下游漂移的距离，以及相对地面的速率。

(b) 改为船相对水的速率为 $2.50\,\mathrm{m/s}$，舵手把船头朝向正对对岸方向的上游一侧，使船恰好落在出发点的正对面。求船头偏角和渡河时间。
::: solution
(a) 船相对水的速度是 $1.50\,\mathbf{i}\,\mathrm{m/s}$，水相对地面的速度是 $2.00\,\mathbf{j}\,\mathrm{m/s}$。由 [[#prop-relative]]，地面速度是两者之和

$$
\mathbf{v}_{\text{地面}} = 1.50\,\mathbf{i} + 2.00\,\mathbf{j}\ \mathrm{m/s}.
$$

只有 $x$ 分量把船送向对岸。渡河时间等于河宽除以该分量，

$$
t = \frac{80.0}{1.50} = 53.3\,\mathrm{s}.
$$

在这段时间里下游方向速度恒为 $2.00\,\mathrm{m/s}$，所以漂移距离为

$$
y = 2.00 \times \frac{80.0}{1.50} = 107\,\mathrm{m}.
$$

这个商舍入到三位有效数字之前是 $320/3 = 106.7\,\mathrm{m}$。地面速率是大小

$$
\sqrt{1.50^{2} + 2.00^{2}} = \sqrt{2.25 + 4.00} = \sqrt{6.25} = 2.50\,\mathrm{m/s}.
$$

船并不垂直穿过河流。它在地面上的航迹是一条与正对方向成 $\arctan(2.00/1.50)$ 角、偏向下方的直线，因为两个分量都恒定。

(b) 设 $\varphi$ 为船头偏离正对方向、指向上游一侧的角度。则相对水的速度为 $(2.50\cos\varphi)\,\mathbf{i} - (2.50\sin\varphi)\,\mathbf{j}$，地面速度的 $y$ 分量为 $-2.50\sin\varphi + 2.00$。落在出发点正对面意味着该分量为零：

$$
\sin\varphi = \frac{2.00}{2.50} = 0.800, \qquad \varphi = 53.1^{\circ}.
$$

于是 $\cos\varphi = 0.600$（因为 $0.600^{2} + 0.800^{2} = 1$），横向分量为 $2.50\times 0.600 = 1.50\,\mathrm{m/s}$。渡河时间为 $80.0/1.50 = 53.3\,\mathrm{s}$，没有漂移。它与 (a) 中时间的巧合纯属数字上的偶然：两个水中速率本来不同，是 $1.50\,\mathrm{m/s}$ 和 $2.50\,\mathrm{m/s}$。一般而言，偏向上游行船要用掉船速的一部分去抵消水流，渡河时间比同一水中速率下正对对岸的渡河更长。
:::
:::

同一次减法可以比较任何两个速度。当两者都恒定时，最近距离出现在相对位置与 $\mathbf{v}_A - \mathbf{v}_B$ 垂直的时刻。下面有一道习题用到这一条件。

## 匀速圆周运动

做**匀速圆周运动**的质点在半径为固定值 $R$ 的圆上以恒定速率 $v$ 运动。速度并不恒定。它不断转动以保持与圆相切，而转动的速度就是一种加速度，即使速率没有改变。把圆心取为原点，用恒定角速度 $\omega$ 把位置写成时间的函数：

$$
\mathbf{r}(t) = (R\cos\omega t)\,\mathbf{i} + (R\sin\omega t)\,\mathbf{j}.
$$

$t = 0$ 时质点在 $(R, 0)$。$t$ 增大时它逆时针运动。转一圈使 $\omega t$ 从 $0$ 变到 $2\pi$，所以周期为 $T = 2\pi/\omega$，普通频率为 $f = 1/T = \omega/(2\pi)$。角速度与线速率由 $v = \omega R$ 联系：一个周期内质点走完周长 $2\pi R$，所以 $v = 2\pi R/T = \omega R$。

::: proposition 向心加速度 {#prop-ucm}
对 $R$ 与 $\omega$ 恒定的运动 $\mathbf{r}(t) = (R\cos\omega t)\,\mathbf{i} + (R\sin\omega t)\,\mathbf{j}$，速度垂直于位置向量，且加速度为

$$
\mathbf{a} = -\omega^{2}\,\mathbf{r}.
$$ {#eq-centrip}

因此 $\mathbf{a}$ 由质点指向圆心，其大小为

$$
\abs{\mathbf{a}} = \omega^{2} R = \frac{v^{2}}{R},
$$

其中 $v = \omega R$ 是恒定速率。这是一条关于运动的陈述，不是关于力的陈述。产生 $\mathbf{a}$ 必须施加的力由 [[mechanics/newton-laws]] 指认。
:::

::: proof
对分量求导。$\cos\omega t$ 的导数是 $-\omega\sin\omega t$，$\sin\omega t$ 的导数是 $\omega\cos\omega t$，所以

$$
\mathbf{v} = \deriv{\mathbf{r}}{t} = (-R\omega\sin\omega t)\,\mathbf{i} + (R\omega\cos\omega t)\,\mathbf{j}.
$$

与位置向量作点积：

$$
\mathbf{r}\cdot\mathbf{v} = R\cos\omega t\cdot(-R\omega\sin\omega t) + R\sin\omega t\cdot(R\omega\cos\omega t) = 0,
$$

所以 $\mathbf{v}$ 垂直于 $\mathbf{r}$。其大小为 $R\omega\sqrt{\sin^{2}\omega t + \cos^{2}\omega t} = R\omega$，即恒定速率 $v$。

再求一次导：

$$
\mathbf{a} = \deriv{\mathbf{v}}{t} = (-R\omega^{2}\cos\omega t)\,\mathbf{i} + (-R\omega^{2}\sin\omega t)\,\mathbf{j} = -\omega^{2}\,\mathbf{r}.
$$

向量 $-\mathbf{r}$ 从质点指回原点，也就是圆心。大小为 $\omega^{2} R$。代入 $\omega = v/R$ 就把这个大小化成 $v^{2}/R$。两个表达式都会用到：当运动以每秒转数给出时用 $\omega^{2} R$，当数据是速率与半径时用 $v^{2}/R$。
:::

::: remark 若角速度不恒定
这里假设了 $\omega$ 恒定。若在同一圆上 $\omega = \omega(t)$，求导会留下向内的项 $-\omega^{2}\,\mathbf{r}$，并添上一个大小为 $R\abs{\alpha}$ 的切向项，其中 $\alpha = \deriv{\omega}{t}$。匀速圆周运动就是 $\alpha = 0$。切向部分在 [[mechanics/rotation]] 中处理。
:::

::: remark 求导中的弧度
从 $\cos\omega t$ 到 $-\omega\sin\omega t$ 这一步是弧度制下的链式法则。若给的频率以每秒转数计，先乘以 $2\pi$ 再把结果称作这些导数里的 $\omega$。把以转为单位的频率或以度为单位的角当作弧度制的 $\omega$ 代进去，得到的加速度会差 $2\pi$ 或 $\pi/180$ 的幂次倍。
:::

::: intuition 速度箭头在旋转
把 $\mathbf{v}$ 想成长度固定为 $v$、始终与圆相切的箭头。在短时间 $\Delta t$ 内半径转过 $\Delta\theta = \omega\,\Delta t$，速度箭头也转过同样的角度。该箭头的箭尖移动距离 $v\,\Delta\theta$，所以 $\abs{\Delta\mathbf{v}}/\Delta t$ 的大小为 $v\omega$。代入 $v = \omega R$ 得 $\omega^{2} R = v^{2}/R$。在 $(R, 0)$ 处，$\mathbf{v}$ 沿 $+\mathbf{j}$；一个小的逆时针转动使 $\mathbf{v}$ 获得沿 $-\mathbf{i}$ 的分量，指向圆心。微积分证明了 [[#eq-centrip]]；旋转的箭头则说明为什么速率恒定仍能有向内的加速度。
:::

::: example 每秒两转 {#ex-disc}
旋转圆盘上的一点沿半径 $0.800\,\mathrm{m}$ 的圆运动，以恒定角速度每秒转 $2.00$ 圈。求角速度、周期、线速率和加速度大小。
::: solution
频率为 $f = 2.00\,\mathrm{s^{-1}}$，所以周期为 $T = 1/f = 0.500\,\mathrm{s}$。以每秒弧度计的角速度为

$$
\omega = 2\pi f = 4\pi = 12.57\,\mathrm{rad/s}.
$$

由 $T = 2\pi/\omega$ 得同样的周期 $2\pi/(4\pi) = 0.500\,\mathrm{s}$，校验了从转到弧度的换算。线速率为

$$
v = \omega R = 4\pi \times 0.800 = 10.05\,\mathrm{m/s}.
$$

加速度大小为

$$
\abs{\mathbf{a}} = \omega^{2} R = (4\pi)^{2} \times 0.800 = 12.8\,\pi^{2} = 126.3\,\mathrm{m/s^{2}},
$$

方向由该点指向圆心。平方项 $\omega^{2} = (4\pi)^{2} = 157.9\,\mathrm{s^{-2}}$ 本身不是加速度：还要乘以半径。数值 $126.3\,\mathrm{m/s^{2}}$ 约为 $g$ 的十三倍。是哪个力产生它——张力、摩擦力还是法向支持力——是 [[mechanics/newton-laws]] 的问题。运动学问到 $\mathbf{a}$ 为止。
:::
:::

## 后续内容

[[mechanics/motion-1d]] 的恒加速度公式就是本章的分量方程。让分量各解各的，并且在落地高度不是抛出高度时拒绝使用射程公式——抛体分析的要点尽在于此。相对速度是同一个导数，作用在位置之差上。

本章没有解释为什么 $a_y = -g$，也没有说哪个力维持圆周运动。[[mechanics/newton-laws]] 把向内的加速度与合力 $m v^{2}/R$ 对应起来，并把重力 $mg$ 指认为在地球附近产生 $a_y = -g$ 的力。[[mechanics/gravitation]] 再把恒定的 $g$ 换成平方反比的加速度，[[#eq-traj]] 的抛物线就变成圆锥曲线。同样的圆周运动学就是 [[oscillations]] 中简谐运动的参考圆：匀速圆周运动的坐标正是 $R\cos\omega t$。

::: summary
- 位置、速度与加速度是由 $\mathbf{v} = \deriv{\mathbf{r}}{t}$ 与 $\mathbf{a} = \deriv{\mathbf{v}}{t}$ 联系的向量，在固定坐标轴中逐分量求取。
- 若 $a_x$ 不依赖 $y$ 方向的运动、$a_y$ 不依赖 $x$ 方向的运动，两个分量可以分别求解再拼合。恒定加速度是主要情形，它积分成 $\mathbf{r} = \mathbf{r}_0 + \mathbf{v}_0 t + \tfrac{1}{2}\mathbf{a}\, t^{2}$。
- 不计空气阻力的抛体有 $a_x = 0$、$a_y = -g$，轨迹是抛物线 [[#eq-traj]]。
- 相对抛出点的最大高度为 $H = (v\sin\theta)^{2}/(2g)$。飞行时间 $T = 2 v\sin\theta / g$ 与射程 $R = v^{2}\sin 2\theta / g$ 还需要一个额外前提：落地高度等于抛出高度。
- 水平地面上最大射程为 $v^{2}/g$，在 $45^{\circ}$ 处取得。互余角 $\theta$ 与 $90^{\circ} - \theta$ 共享射程而不共享高度。两个说法在计入空气阻力或落地高度不同时都不再成立。
- $A$ 相对 $B$ 的速度是 $\mathbf{v}_A - \mathbf{v}_B$。正对对岸横渡水流的船会向下游漂移；不漂移的渡河要偏向上游，使相对水的速度恰好抵消水流。
- 匀速圆周运动中 $\mathbf{a} = -\omega^{2}\,\mathbf{r}$：加速度大小为 $v^{2}/R = \omega^{2} R$、指向圆心，即使速率恒定。产生它的力不属于运动学。
:::

## 习题

::: exercise 由分量求速率 {#exr-speed level=1 check="10"}
某时刻一质点的速度为 $8.00\,\mathbf{i} - 6.00\,\mathbf{j}$，以米每秒计。求速率，以米每秒计。
::: solution
速率是速度的大小。两个分量互相垂直，所以

$$
\abs{\mathbf{v}} = \sqrt{8.00^{2} + (-6.00)^{2}} = \sqrt{64.0 + 36.0} = \sqrt{100} = 10.0.
$$

这个结果就是速度平面内的勾股定理。$y$ 分量上的负号影响方向（在 $x$ 轴正向下方），不影响速率。答案是 $10.0\,\mathrm{m/s}$。
:::
:::

::: exercise 水平地面的飞行时间 {#exr-flight level=1 check="1"}
一质点以 $9.80\,\mathrm{m/s}$、与水平方向成 $30^{\circ}$ 角从水平地面抛出，返回同一高度。取 $g = 9.80\,\mathrm{m/s^{2}}$，不计空气阻力。求飞行时间，以秒计。
::: solution
落地高度等于抛出高度，所以飞行时间由 [[#eq-range]] 给出，

$$
T = \frac{2 \times 9.80 \times \sin 30^{\circ}}{9.80} = 2 \times \tfrac{1}{2} = 1.00\,\mathrm{s}.
$$

抛出速率被选成与 $g$ 的数值相等，而 $\sin 30^{\circ} = 1/2$，于是因子相消。同样的相消给不出射程：$R = v^{2}\sin 60^{\circ}/g$ 仍须求值，而题目没有问。答案是 $1.00\,\mathrm{s}$。
:::
:::

::: exercise 圆周上的加速度 {#exr-circle level=1 check="50"}
一质点以 $10.0\,\mathrm{m/s}$ 的恒定速率沿半径 $2.00\,\mathrm{m}$ 的圆运动。求其加速度大小，以 $\mathrm{m/s^{2}}$ 计。
::: solution
由 [[#prop-ucm]]，匀速圆周运动的向内加速度大小为 $v^{2}/R$。速率恒定、半径恒定，所以

$$
\abs{\mathbf{a}} = \frac{v^{2}}{R} = \frac{10.0^{2}}{2.00} = \frac{100}{2.00} = 50.0\,\mathrm{m/s^{2}}.
$$

方向指向圆心。题目所问的正是大小。加速度不是零：速度的方向在变。答案是 $50.0\,\mathrm{m/s^{2}}$。
:::
:::

::: exercise 水平抛出 {#exr-horizontal level=2 check="20"}
一石块从悬崖边缘以 $10.0\,\mathrm{m/s}$ 水平抛出。地面比抛出点低 $19.6\,\mathrm{m}$。取 $g = 9.80\,\mathrm{m/s^{2}}$，不计空气阻力。石块落在距崖底多远处，以米计？
::: hint
在竖直运动中取 $y = -19.6\,\mathrm{m}$，竖直初速度为零。不要用水平地面的射程公式：抛射角为零，那条公式只会给出零。
:::
::: solution
取抛出点为原点，$y$ 向上，抛射沿正 $x$ 轴。则 $v_x = 10.0\,\mathrm{m/s}$、$v_{y0} = 0$，所以

$$
y(t) = -\tfrac{1}{2}(9.80)\, t^{2}.
$$

地面在 $y = -19.6\,\mathrm{m}$：

$$
19.6 = 4.90\, t^{2}, \qquad t^{2} = 4.00, \qquad t = 2.00\,\mathrm{s},
$$

取正根。水平速度恒定，水平距离为

$$
x = 10.0 \times 2.00 = 20.0\,\mathrm{m}.
$$

水平地面公式 $R = v^{2}\sin 2\theta / g$ 在这里不适用。落地不在抛出高度处；而取 $\theta = 0$ 时该公式只会给出 $0$，这句话本身说的就是水平抛出的抛体从不升回抛出高度。答案是 $20.0\,\mathrm{m}$。
:::
:::

::: exercise 直穿河流 {#exr-boat level=2 check="10"}
船相对水的速率为 $5.00\,\mathrm{m/s}$。水流速度为 $3.00\,\mathrm{m/s}$，河宽 $40.0\,\mathrm{m}$。调整船头使船在地面上的航迹垂直穿过河流。求渡河时间，以秒计。
::: hint
偏向上游一个角度 $\varphi$ 行船，使 $\sin\varphi = v_{\text{水流}}/v_{\text{船}}$。渡河速率是剩下的分量 $\sqrt{v_{\text{船}}^{2} - v_{\text{水流}}^{2}}$。
:::
::: solution
取横向为 $x$、下游方向为 $y$。要抵消水流，船相对水的速度必须有 $-3.00\,\mathrm{m/s}$ 的 $y$ 分量。水中速率为 $5.00\,\mathrm{m/s}$，

$$
\sin\varphi = \frac{3.00}{5.00} = 0.600, \qquad \cos\varphi = \sqrt{1 - 0.600^{2}} = 0.800,
$$

其中 $\varphi$ 是船头偏离正对方向、指向上游一侧的角度。地面速度沿横向的为

$$
5.00 \times 0.800 = 4.00\,\mathrm{m/s},
$$

也就是 $\sqrt{5.00^{2} - 3.00^{2}}$。河宽 $40.0\,\mathrm{m}$，所以

$$
t = \frac{40.0}{4.00} = 10.0\,\mathrm{s}.
$$

漂移按构造为零。渡河时间为 $10.0\,\mathrm{s}$。
:::
:::

::: exercise 最大射程的一半 {#exr-half level=2 check="15"}
水平地面、不计空气阻力，抛体以固定速率抛出。求使射程为最大射程一半的较小抛射角，以度计。
::: hint
由 [[#cor-range]] 写出 $R/R_{\max} = \sin 2\theta$，令比值等于 $1/2$。
:::
::: solution
由 [[#cor-range]]，$R_{\max} = v^{2}/g$ 且 $R = (v^{2}/g)\sin 2\theta$，所以

$$
\frac{R}{R_{\max}} = \sin 2\theta.
$$

最大射程的一半意味着 $\sin 2\theta = 1/2$。抛射角在 $0$ 与 $90^{\circ}$ 之间时，二倍角在 $0$ 与 $180^{\circ}$ 之间，正弦在此取 $1/2$ 的角为 $30^{\circ}$ 和 $150^{\circ}$。因此

$$
2\theta = 30^{\circ} \quad\text{或}\quad 2\theta = 150^{\circ}, \qquad \theta = 15^{\circ} \quad\text{或}\quad \theta = 75^{\circ}.
$$

两个角互余，所以 [[#cor-range]] 本就要求它们射程相同；这里的计算表明这个共同射程恰为最大值的一半。较小的角是 $15^{\circ}$。只要水平地面的前提成立、射程确实正比于 $\sin 2\theta$，结果就不依赖 $v$ 或 $g$。
:::
:::

::: exercise 轨迹是抛物线 {#exr-parabola level=3}
一抛体从原点以速率 $v$、与水平方向成 $\theta$ 角抛出，$\cos\theta \neq 0$。不计空气阻力，$a_y = -g$、$a_x = 0$。在分量方程之间消去时间，得到

$$
y = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$

再令落地高度等于抛出高度，重新导出 $R = v^{2}\sin 2\theta / g$。指出哪一步用到了二倍角公式，以及若落地低于抛出点，哪一步就不再合法。
::: hint
由 $x = (v\cos\theta)\, t$ 解出 $t$ 并代入 $y(t)$。令 $y = 0$ 后分解为乘积，其中一个因子就是抛出时刻。
:::
::: solution
分量方程即 [[#eq-xy]]，

$$
x = (v\cos\theta)\, t, \qquad y = (v\sin\theta)\, t - \tfrac{1}{2} g t^{2}.
$$

由第一式解出时间 $t = x/(v\cos\theta)$。这个除法就是需要 $\cos\theta \neq 0$ 的那一步。代入 $y$：

$$
y = (v\sin\theta)\cdot\frac{x}{v\cos\theta} - \tfrac{1}{2} g\left(\frac{x}{v\cos\theta}\right)^{2} = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$

右端是 $x$ 的二次多项式，所以图像是抛物线。到这里没有用到任何关于落地的假设：只要恒定加速度模型成立，这就是轨迹。

现在施加在抛出高度处落地 $y = 0$ 的条件，并寻找 $x \neq 0$：

$$
0 = x\left(\tan\theta - \frac{g x}{2 v^{2}\cos^{2}\theta}\right).
$$

根 $x = 0$ 是抛出。另一个根是

$$
x = \frac{2 v^{2}\cos^{2}\theta\cdot\tan\theta}{g} = \frac{2 v^{2}\cos^{2}\theta\cdot\sin\theta}{g\cos\theta} = \frac{2 v^{2}\sin\theta\cos\theta}{g} = \frac{v^{2}\sin 2\theta}{g}.
$$

二倍角公式 $\sin 2\theta = 2\sin\theta\cos\theta$ 就是最后一步。若落地低于抛出点高度 $h$，失效的那一步是代入 $y = 0$。正确的条件应是 $y = -h$，它给出关于 $t$（或关于 $x$）的二次方程，不会分解成水平地面的射程。在这种情形下用 $y = 0$ 不是近似，而是用错了边界条件。
:::
:::

::: exercise 最近距离 {#exr-closest level=3 check="15*sqrt(2)"}
$t = 0$ 时船 A 在原点，以恒定速度 $3.00\,\mathbf{i}\,\mathrm{m/s}$ 运动。船 B 在 $30.0\,\mathbf{j}$ 米处，以恒定速度 $-3.00\,\mathbf{j}\,\mathrm{m/s}$ 运动。坐标以米计。求两船之间最近距离的精确值，以米计。
::: hint
用相对位置 $\mathbf{r}_B - \mathbf{r}_A$ 计算。距离最小时相对位置垂直于相对速度，所以它们的点积为零。
:::
::: solution
时刻 $t$ 的位置（米）为 $\mathbf{r}_A = (3.00\, t)\,\mathbf{i}$、$\mathbf{r}_B = (30.0 - 3.00\, t)\,\mathbf{j}$。B 相对 A 的位置为

$$
\mathbf{r} = \mathbf{r}_B - \mathbf{r}_A = (-3.00\, t)\,\mathbf{i} + (30.0 - 3.00\, t)\,\mathbf{j},
$$

而由 [[#prop-relative]]，相对速度是常向量 $\mathbf{v} = -3.00\,\mathbf{i} - 3.00\,\mathbf{j}$，以米每秒计。只要 $\mathbf{r}$ 沿 $\mathbf{v}$ 方向有分量，距离就在减小；距离在 $\mathbf{r}\cdot\mathbf{v} = 0$ 时最小：

$$
(-3.00\, t)(-3.00) + (30.0 - 3.00\, t)(-3.00) = 9.00\, t - 90.0 + 9.00\, t = 18.0\, t - 90.0.
$$

令点积为零：$t = 90.0/18.0 = 5.00\,\mathrm{s}$。此时相对位置为

$$
\mathbf{r} = (-15.0)\,\mathbf{i} + (15.0)\,\mathbf{j}\ \mathrm{m},
$$

距离为

$$
\abs{\mathbf{r}} = \sqrt{(-15.0)^{2} + 15.0^{2}} = \sqrt{450} = 15\sqrt{2}\,\mathrm{m}.
$$

最近距离的精确值是 $15\sqrt{2}$ 米。
:::
:::
