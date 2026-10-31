洛伦兹变换把时间与一个空间坐标混合起来。单看一个个数，$t$ 与 $x$ 在每个参考系中都不同，而且二者都不是某对事件的属性。不变的是它们的一个特定组合。这个组合就是间隔的平方。一旦握住它，能量与动量就不再是两条碰巧长得相像的独立守恒律，而成为同一个对象——四维动量——的两个组成部分，其长度的平方就是质量。

本讲保持 mostly-minus 符号：间隔的平方是 $(c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$。取正值意味着类时间隔。把符号翻面的书，会把一切形如"正号意味着类时"的句子统统翻面，并且会把四维速度的长度平方写成 $-c^2$ 而不是 $c^2$。只有经过这样的翻译，物理才相同。我们不会在一页之内中途换符号。

变换本身即 [[relativity/time-and-length]] 中推导的那一个。能量、动量以及不许质量依赖速率，均如 [[relativity/velocity-energy]]。课程总图是 [[relativity]]。下一讲把同样的代数画成一张图。

## 事件与间隔 {#events}

实验不是抽象地发生在"某个时刻"。它发生在一个地点与一个时刻合在一起处。两个质点的碰撞、一次闪光的发出、一只钟的指针经过近旁的一个标记：每一样都是一个事件。坐标是惯性系贴给事件的标签，不是事件的替身。

::: definition 事件与间隔 {#def-interval}
**事件**是时空的单个点：一个地点，一个时刻。在某个惯性系中它的坐标是四个数 $(ct,\, x,\, y,\, z)$。我们写作 $x^\mu$，$\mu = 0,1,2,3$ 且 $x^0 = ct$。

对两个事件，坐标差为 $\Delta x^\mu$。在 mostly-minus 约定下，它们之间的**间隔平方**是

$$
(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2.
$$ {#eq-interval}

当 $(\Delta s)^2 > 0$ 时称间隔为**类时**，$(\Delta s)^2 = 0$ 时为**类光**（或零），$(\Delta s)^2 < 0$ 时为**类空**。
:::

符号 $(\Delta s)^2$ 是整个表达式的名字，不是一个非正不可的数的平方。当间隔类空时，$(\Delta s)^2$ 是一个负实数，我们不去开它的平方根。当它类时、且我们已选定沿一只钟的历程哪个事件在前时，正平方根是固有时间的 $c$ 倍——固有时间在下一节定义。当它类光时，真空中的一束光可以同时经过这两个事件，而任何有质量的钟不可能同时出席二者。

这三个标签说的是事件对，不是参考系。这一说法是靠后面的不变性证明挣来的，不是靠名字。在那个证明之前，谨慎的说法应当是"在本参考系中类时"。有了证明之后，说法就只是"类时"。

读 [[#eq-interval]] 的一个有用方式，是拿时间间隔与距离作比较。记

$$
(\Delta r)^2 = (\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2.
$$

于是 $(\Delta s)^2 = (c\Delta t)^2 - (\Delta r)^2$。光走完这段间隔的时间是 $\Delta r/c$。若坐标时间 $\Delta t$ 比它长，一个速率不超过 $c$ 的信号就能从较早的事件出发并到达较晚的事件，间隔是类时的。若 $\Delta t$ 更短，连光也赶不到，间隔是类空的。若这两个时间相等，间隔是类光的。这一读法用的是某一个参考系的坐标。不变性定理说的是：结论不依赖坐标出自哪个惯性系。

::: example 两次闪光 {#ex-flashes}
一次闪光在某惯性系的原点发出。第二次闪光在 $x = 3.00\,\mathrm{m}$、$y = z = 0$、$t = 20.0\,\mathrm{ns}$ 处发出。给间隔分类，说出哪一次闪光较早，并求一个同时出席两次闪光的惯性钟的固有时间。
::: solution
数据按三位有效数字给出。取 $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$，

$$
c\times 20.0\times 10^{-9}\,\mathrm{s} = 5.99584916\,\mathrm{m},
$$

四舍五入为 $6.00\,\mathrm{m}$。以下取 $c\Delta t = 6.00\,\mathrm{m}$ 与 $\Delta x = 3.00\,\mathrm{m}$，使每个平方都与该精度一致。[[#eq-interval]] 给出

$$
(\Delta s)^2 = (6.00)^2 - (3.00)^2 = 36.0 - 9.00 = 27.0\,\mathrm{m}^2.
$$

该值为正，所以间隔是类时的。原点处的闪光在本参考系中是较早的事件，因为 $\Delta t > 0$。[[#prop-order]] 将说明每个惯性系都同意这一点，这是类时情形特有的：类空的一对事件未必保持其先后次序。

同时出席两次闪光的惯性钟所记录的固有时间为

$$
\Delta\tau = \frac{\sqrt{(\Delta s)^2}}{c} = \frac{\sqrt{27.0}}{c}.
$$

现在 $\sqrt{27.0} = 5.19615242\,\mathrm{m}$，于是

$$
\Delta\tau = \frac{5.19615242}{2.99792458\times 10^{8}} = 1.73325\times 10^{-8}\,\mathrm{s},
$$

三位有效数字即 $1.73\times 10^{-8}\,\mathrm{s}$。

同样的数也来自时间膨胀，只要因子 $\gamma$ 不要过早舍入。造访这两个事件的钟以

$$
\beta = \frac{\Delta x}{c\Delta t} = \frac{3.00}{6.00} = 0.500
$$

运动。于是 $\gamma = 1/\sqrt{1 - 0.500^2} = 1/\sqrt{0.750} = 1.154701$，而当 $\Delta t$ 由取整后的长度 $c\Delta t = 6.00\,\mathrm{m}$ 重算为 $\Delta t = 6.00/c$ 时，$\Delta t/\gamma = 20.0\times 10^{-9}/1.154701 = 1.732\times 10^{-8}\,\mathrm{s}$。两条路一致。坏掉的做法是把三位有效数字的值 $\gamma = 1.15$ 送回除法里：$20.0\,\mathrm{ns}/1.15$ 舍入为 $1.74\times 10^{-8}\,\mathrm{s}$，末位数字是伪影。要么保住间隔，要么把 $\gamma$ 保到比答案更多的位数。
:::
:::

::: example 一对类空事件 {#ex-spacelike}
两个事件有 $c\Delta t = 3.00\,\mathrm{m}$ 与 $\Delta x = 5.00\,\mathrm{m}$，且 $\Delta y = \Delta z = 0$。给间隔分类。求使两事件同时的那个参考系的速率，以及两事件在该系中的空间距离。然后沿间隔方向取 $\beta = 0.800$ 的 boost，求 $c\Delta t'$。
::: solution
间隔平方为

$$
(\Delta s)^2 = (3.00)^2 - (5.00)^2 = 9.00 - 25.0 = -16.0\,\mathrm{m}^2.
$$

它是类空的。这两个事件之间没有固有时间：没有任何钟、也没有任何有质量的质点能同时出席二者，因为那需要超过 $c$ 的速率。由间隔构造的正量是**固有距离**

$$
\ell = \sqrt{ -(\Delta s)^2 } = \sqrt{16.0} = 4.00\,\mathrm{m}.
$$

这就是在两事件同时的那个参考系中测得的距离。这样的参考系存在。沿 $x$ 以

$$
\beta = \frac{c\Delta t}{\Delta x} = \frac{3.00}{5.00} = 0.600
$$

boost，它小于 $1$，而对类空对本来就必须如此。时间变换 $c\Delta t' = \gamma(c\Delta t - \beta\,\Delta x)$ 于是给出

$$
c\Delta t - \beta\,\Delta x = 3.00 - 0.600\times 5.00 = 0,
$$

所以 $\Delta t' = 0$。在那个参考系中 $(\Delta s)^2 = -(\Delta x')^2$，故 $|\Delta x'| = 4.00\,\mathrm{m}$。

更快的 boost 会颠倒次序。取 $\beta = 0.800$，$\gamma = 1/\sqrt{1 - 0.640} = 1/0.600 = 5/3$。于是

$$
c\Delta t' = \frac{5}{3}\bigl(3.00 - 0.800\times 5.00\bigr) = \frac{5}{3}(3.00 - 4.00) = -\frac{5}{3}\,\mathrm{m} = -1.67\,\mathrm{m}.
$$

在原参考系中较晚的那个事件，在本参考系中较早。没有东西在物理上跑过它们之间。改变的是参考系采用哪一个"较早"的标签。[[#prop-order]] 是普遍陈述。
:::
:::

## boost 下的不变性 {#invariance}

标准配置下的 boost——带撇参考系以速度 $v = \beta c$ 沿不带撇参考系的正 $x$ 轴运动、两原点重合——是

$$
\begin{aligned}
ct' &= \gamma (ct - \beta x), \\
x' &= \gamma (x - \beta\, ct), \\
y' &= y, \\
z' &= z,
\end{aligned}
$$ {#eq-boost}

其中 $\gamma = 1/\sqrt{1 - \beta^2}$ 且 $|\beta| < 1$。两事件之间坐标的差服从同样的公式。原点选择带来的一个加性常数在相减时抵消。轴的旋转总可以把空间间隔与 $x$ 对齐之后再做 boost，所以只需对 [[#eq-boost]] 证明不变性，并指出旋转保持 $(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2$ 不变。

::: theorem 间隔的不变性 {#thm-invariant}
设两个惯性系由 [[#eq-boost]] 相联系。则

$$
(c\Delta t')^2 - (\Delta x')^2 - (\Delta y')^2 - (\Delta z')^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2.
$$

特别地，类时、类光、类空这三个标签不依赖惯性系。
:::

::: proof
因为 $y' = y$ 且 $z' = z$，这些项在两侧彼此匹配。剩下检查 $t$ 与 $x$ 两块。暂且省去 $\Delta$ 记号，最后再放回去：对差做完全相同的代数。代入 [[#eq-boost]]：

$$
\begin{aligned}
(ct')^2 - (x')^2
&= \gamma^2\bigl[(ct - \beta x)^2 - (x - \beta\, ct)^2\bigr] \\
&= \gamma^2\bigl[c^2 t^2 - 2\beta\, ct\, x + \beta^2 x^2 - x^2 + 2\beta\, x\, ct - \beta^2 c^2 t^2\bigr] \\
&= \gamma^2\bigl[(1 - \beta^2)c^2 t^2 - (1 - \beta^2)x^2\bigr] \\
&= \gamma^2(1 - \beta^2)\bigl[(ct)^2 - x^2\bigr].
\end{aligned}
$$

前置因子为 $1$，因为 $\gamma^2 = 1/(1 - \beta^2)$。于是 $(ct')^2 - (x')^2 = (ct)^2 - x^2$。加上保持不变的 $-y^2 - z^2$ 就得到间隔。$(\Delta s)^2$ 的符号在两个参考系中相同，零仍是零，所以三个标签是不变量。同一恒等式对任何有限的事件对都成立，因为进入的只有差。
:::

[[#eq-boost]] 的逆是把 $\beta$ 换成 $-\beta$ 的 boost。物理上，若 $S'$ 相对 $S$ 以 $+v$ 运动，则 $S$ 相对 $S'$ 以 $-v$ 运动。代数上，

$$
ct = \gamma(ct' + \beta x'), \qquad x = \gamma(x' + \beta\, ct'),
$$ {#eq-inverse}

把一个代入另一个会回到原来的坐标，依据还是 $\gamma^2(1 - \beta^2) = 1$。当一个衰变已知于静止系、而要在实验室中求四维动量时，就会用到这个逆变换。

::: proposition 类时事件的次序 {#prop-order}
设 $(\Delta s)^2 > 0$ 且 $\Delta t > 0$。则在与第一个参考系由速率小于 $c$ 的 boost 相联系的每个惯性系中 $\Delta t' > 0$。较早的事件保持较早。

若改为 $(\Delta s)^2 < 0$。则存在一个惯性系使两事件同时，也存在惯性系使二者中任一个在前。
:::

::: proof
速度为 $\mathbf{v}$ 的一般 boost 的时间部分是

$$
\Delta t' = \gamma\left(\Delta t - \frac{\mathbf{v}\cdot\Delta\mathbf{r}}{c^2}\right),
$$

其中 $\gamma > 0$。绝对值 $|\mathbf{v}\cdot\Delta\mathbf{r}|$ 至多为 $v\,|\Delta\mathbf{r}|$。

若间隔类时，$|\Delta\mathbf{r}| < c\,|\Delta t|$。于是

$$
\left|\frac{\mathbf{v}\cdot\Delta\mathbf{r}}{c^2}\right| \le \frac{v}{c}\,\frac{|\Delta\mathbf{r}|}{c} < \frac{v}{c}\,|\Delta t| < |\Delta t|,
$$

最后一步因为 $v < c$。从 $\Delta t$ 中减去的项严格小于 $|\Delta t|$，所以 $\Delta t'$ 与 $\Delta t$ 同号。

若间隔类光，$|\Delta\mathbf{r}| = c\,|\Delta t|$，而同一个界表明：只要 $v < c$，减去的量就严格小于 $|\Delta t|$。类光的次序同样被保持。仍然不存在使类光对同时的参考系，因为那需要 $v = c$。

若间隔类空，$|\Delta\mathbf{r}| > c\,|\Delta t|$。把 $\mathbf{v}$ 与 $\Delta\mathbf{r}$ 对齐并取

$$
v = \frac{c^2\,|\Delta t|}{|\Delta\mathbf{r}|}.
$$

这个速率小于 $c$。当 $\mathbf{v}$ 的指向恰使正的 $\Delta t$ 被抵消时，减法项 $\mathbf{v}\cdot\Delta\mathbf{r}/c^2$ 就精确等于 $\Delta t$，此时 $\Delta t' = 0$。沿同一方向任何更大的亚光速都会使减法项超过 $\Delta t$ 并翻转符号。[[#ex-spacelike]] 就是这个构造配上数字。
:::

::: quiz
两个事件在本讲的 mostly-minus 约定下有 $(\Delta s)^2 = -4.00\,\mathrm{m}^2$。哪一条说法是对的？
- [ ] 间隔类时，每个惯性系对哪个事件较早都有一致意见。
- [ ] 间隔类光，所以一束光可以连接这两个事件。
- [x] 间隔类空。有些惯性系会颠倒时间次序，而没有有质量的钟能同时出席这两个事件。
- [ ] $(\Delta s)^2$ 的符号依赖参考系，所以分类不可信。
::: solution
间隔平方为负即类空，依据 [[#def-interval]]。[[#thm-invariant]] 说符号在每个惯性系中相同，[[#prop-order]] 说类空对存在任一次序的参考系，其中包括两事件同时的那个参考系。类光对的 $(\Delta s)^2 = 0$。类时对有正的平方与被保持的次序。错误选项各自混淆了符号或不变性。
:::
:::

## 固有时间与四维速度 {#four-velocity}

两事件之间的间隔是这一对事件的属性。一只钟却有一整段历程，一条称为世界线的事件曲线。钟实际记录的时间是沿那条曲线的积分，不是一个参考系的坐标时间，而对一条弯曲的世界线，也不是仅仅两端点之间的间隔。

::: definition 固有时间 {#def-proper-time}
沿一条处处类时的世界线，**固有时间** $\tau$ 是沿该世界线前进的钟所记录的时间。在曲线上相邻的两个事件之间，

$$
(c\,\dd\tau)^2 = (c\,\dd t)^2 - \dd x^2 - \dd y^2 - \dd z^2,
$$ {#eq-dtau}

当 $\dd t > 0$ 时 $\dd\tau > 0$。若钟在该参考系中的速度为 $\mathbf{v}(t)$，它等价于 $\dd\tau = \dd t/\gamma$，其中 $\gamma = 1/\sqrt{1 - v^2/c^2}$ 由瞬时速率算出。
:::

::: proposition 固有时间与 gamma {#prop-dtau}
在一条类时世界线上，$\dd\tau = \dd t/\gamma$，$\gamma$ 取瞬时值。在一条惯性世界线的两个事件之间，固有时间为 $\Delta\tau = \sqrt{(\Delta s)^2}/c$，它等于 $\Delta t/\gamma$，$\gamma$ 取那段匀速运动的常量值。在一条不直的世界线上，$\int \dd\tau$ 仍是钟的读数，但它小于同样的两端点之间惯性行程的固有时间。这一比较在 [[relativity/spacetime]] 中证明。
:::

::: proof
把 $\dd x = v_x\,\dd t$ 及其同伴代入 [[#eq-dtau]]：

$$
(c\,\dd\tau)^2 = c^2\dd t^2 - v^2\dd t^2 = c^2\dd t^2\left(1 - \frac{v^2}{c^2}\right) = \frac{c^2\dd t^2}{\gamma^2}.
$$

对世界线朝向未来的一段，$\dd\tau$ 与 $\dd t$ 都为正，所以 $\dd\tau = \dd t/\gamma$。若运动是惯性的，$v$ 恒定，两端点之间的坐标差满足 $(c\Delta\tau)^2 = (c\Delta t)^2 - (\Delta r)^2 = (\Delta s)^2$，于是 $\Delta\tau = \Delta t/\gamma$。沿一条不直的路径的积分 $\int\dd t/\gamma$ 是另一个数。它依赖路径。两端点之间的间隔不依赖路径。二者只在惯性路径上相等，这就是 [[#ex-flashes]] 必须写"一个惯性钟"的原因。
:::

四维矢量是任何这样的四元组 $A^\mu$：在更换惯性系时，它按与 $\Delta x^\mu$ 相同的规则变换。特别地，在 [[#eq-boost]] 之下，

$$
A'^0 = \gamma(A^0 - \beta A^1), \qquad A'^1 = \gamma(A^1 - \beta A^0), \qquad A'^2 = A^2, \qquad A'^3 = A^3.
$$

由与 [[#thm-invariant]] 相同的代数，长度的平方

$$
A\cdot A = (A^0)^2 - (A^1)^2 - (A^2)^2 - (A^3)^2
$$ {#eq-dot}

在每个惯性系中是同一个数。两个四维矢量的内积

$$
A\cdot B = A^0 B^0 - A^1 B^1 - A^2 B^2 - A^3 B^3
$$

同样是不变量。一种看法是展开 $(A+B)\cdot(A+B) = A\cdot A + B\cdot B + 2\,A\cdot B$。每个长度平方都是不变量，所以交叉项是不变量。本讲中每当一个四维矢量与一个四维矢量作点乘，指的都是这个积。它不是欧几里得点积。空间部分的负号就是约定的全部。

::: definition 四维速度 {#def-four-velocity}
在一条以固有时间参数化的类时世界线上，**四维速度**是

$$
U^\mu = \frac{\dd x^\mu}{\dd\tau}.
$$ {#eq-U-def}

逐分量写，若通常速度为 $\mathbf{v}$，则

$$
U^\mu = (\gamma c,\, \gamma\mathbf{v}).
$$ {#eq-U-comp}
:::

对一束光不存在这样的四维速度。沿一条类光世界线 $\dd\tau = 0$，而 [[#eq-U-def]] 将除以零。光子有四维动量，在下面定义，但它没有静止系，也没有 $U^\mu$。

::: theorem 四维速度的模 {#thm-u-square}
任何类时世界线的四维速度都满足 $U\cdot U = c^2$。
:::

::: proof
由 [[#eq-dtau]] 与 [[#eq-U-def]]，

$$
U\cdot U = \frac{(c\,\dd t)^2 - \dd x^2 - \dd y^2 - \dd z^2}{(\dd\tau)^2} = \frac{(c\,\dd\tau)^2}{(\dd\tau)^2} = c^2.
$$

分量形式给出同样结果。由 [[#prop-dtau]]，$\dd t/\dd\tau = \gamma$ 且 $\dd\mathbf{r}/\dd\tau = \gamma\mathbf{v}$，即 [[#eq-U-comp]]。于是

$$
U\cdot U = \gamma^2 c^2 - \gamma^2 v^2 = \gamma^2 c^2\left(1 - \frac{v^2}{c^2}\right) = c^2,
$$

因为 $\gamma^2(1 - v^2/c^2) = 1$。即使 $\mathbf{v}$ 在变化，该恒等式也在每一时刻成立，因为进入的只有瞬时的微分。
:::

::: intuition 双曲线，而不是圆
在 $c = 1$ 的单位制中，与原点固有时间相距 $1$ 的事件落在 $(ct)^2 - x^2 = 1$ 上，在未来一侧即 $ct = \sqrt{1 + x^2}$。半径为 $1$ 的欧几里得圆会是 $ct = \sqrt{1 - x^2}$。两个公式只差一个符号，而两条曲线朝相反方向弯。boost 把一个事件沿双曲线滑动。它无法把事件移到另一条双曲线上，因为那会改变间隔，而 [[#thm-invariant]] 禁止这种改变。下面的图把两条曲线画在同一个窗口里，让对比看得见。与横轴相接的拱形是圆。停留在高度 $1$ 及其上的曲线是双曲线。
:::

::: widget plot
f: sqrt(1-x^2); sqrt(1+x^2)
x: -1, 1
caption: 纵轴读作 ct，横轴读作 x，单位取 c = 1，|x| ≤ 1。与 x 轴相接的拱形是欧几里得半圆 ct = sqrt(1 − x²)。坐落在 ct = 1 上及其上方的曲线是双曲线 ct = sqrt(1 + x²)，即与原点固有时间相距一个单位的事件集，因为 (ct)² − x² = 1。双曲线是圆的孪生：加 x² 闭合成圆，减 x² 打开成间隔。本图没有滑块；请比较两条曲线的弯曲方向。双曲线在 |x| = 1 之外继续延伸，超出本窗口。
:::

boost 可以用一个在 boost 合成时相加的数来参数化。沿 $x$ 的速率 $v = \beta c$ 的**快度（rapidity）** $\phi$ 由 $\beta = \tanh\phi$ 定义，即 $\phi = \mathrm{artanh}\,\beta$。于是 $\gamma = \cosh\phi$ 且 $\gamma\beta = \sinh\phi$，因为 $\cosh^2\phi - \sinh^2\phi = 1$ 与 $\gamma^2 - \gamma^2\beta^2 = 1$ 是同一个代数，而 sinh 与 cosh 之比是 $\beta$。沿 $x$ 的四维速度是

$$
U^\mu = (c\cosh\phi,\, c\sinh\phi,\, 0,\, 0),
$$

而 $U\cdot U = c^2(\cosh^2\phi - \sinh^2\phi) = c^2$ 正是 [[#thm-u-square]] 再现。对 $\beta = 0.600$，$(1+\beta)/(1-\beta) = 1.600/0.400 = 4$，所以 $\phi = \tfrac12\ln 4 = \ln 2 = 0.693147$。而 $\cosh(\ln 2) = (2 + 1/2)/2 = 5/4 = 1.25$，正是 $0.600c$ 的 $\gamma$。

共线的 boost 相加快度。加法公式

$$
\tanh(\phi_1 + \phi_2) = \frac{\tanh\phi_1 + \tanh\phi_2}{1 + \tanh\phi_1\,\tanh\phi_2}
$$

就是 [[relativity/velocity-energy]] 的爱因斯坦速度相加，因为 $\beta = \tanh\phi$。两次 $\beta = 0.600$ 的相继 boost 有 $\phi = 2\ln 2$，且

$$
\beta = \frac{0.600 + 0.600}{1 + 0.600\times 0.600} = \frac{1.200}{1.360} = \frac{15}{17} = 0.882353,
$$

这正是 $\tanh(2\ln 2) = (4 - 1/4)/(4 + 1/4) = 15/17$。在时空图上用量角器量出的角不是这个 $\phi$。画图的一讲把二者分开。

## 四维动量 {#four-momentum}

牛顿动量是 $m\mathbf{v}$，它在没有外力时守恒。在与 $c$ 可比的速率上，若 $m$ 是你在静止时测得的质量，那个表达式并非在每个惯性系中守恒。[[relativity/velocity-energy]] 给出的修补是：把 $\gamma$ 放在 $m\mathbf{v}$ 旁边，并把能量 $\gamma m c^2$ 当作 boost 会与动量混合的时间分量。四维动量就是把这一修补写成一个对象。

::: definition 四维动量 {#def-four-momentum}
不变质量 $m > 0$ 的质点具有**四维动量**

$$
p^\mu = m U^\mu = \left(\frac{E}{c},\, \mathbf{p}\right),
$$ {#eq-p-def}

其中 $E = \gamma m c^2$ 是能量，$\mathbf{p} = \gamma m\mathbf{v}$ 是动量。质量 $m$ 在每个惯性系中是同一个数。它不是 $\gamma m$。
:::

[[#eq-p-def]] 中的质量是静质量，也叫不变质量。较早的教材有时定义"相对论质量" $\gamma m$，好让动量看起来像质量乘速度。我们不这样。那个乘积已经有名字了：它就是 $p$。再给它起第二个名字，会让 $m$ 显得依赖参考系，于是 $E = mc^2$ 就在说的是哪个 $m$ 的问题上变得含混。本讲中 $m$ 是固定的，$E = \gamma m c^2$，$\mathbf{p} = \gamma m\mathbf{v}$。

::: theorem 质量壳 {#thm-mass-shell}
不变质量为 $m$ 的质点的四维动量满足

$$
p\cdot p = m^2 c^2,
$$

用能量与动量写即

$$
E^2 - p^2 c^2 = m^2 c^4.
$$ {#eq-shell}

无质量质点，特别是真空中的光子，有 $m = 0$ 与 $E = pc$，但它不由 $p^\mu = m U^\mu$ 描述。
:::

::: proof
对 $m > 0$，[[#def-four-momentum]] 与 [[#thm-u-square]] 给出 $p\cdot p = m^2\, U\cdot U = m^2 c^2$。写 $p^0 = E/c$，$p^2 = \mathbf{p}\cdot\mathbf{p}$（按空间欧几里得意义），

$$
\left(\frac{E}{c}\right)^2 - p^2 = m^2 c^2.
$$

乘以 $c^2$ 即得 [[#eq-shell]]。每一步用的都是不变量或定义，所以该关系在每个惯性系中成立。它是对 $(E, \mathbf{p})$ 的一条约束，不是两条独立的事实。

对 $m = 0$，四维速度无定义，经由 $U^\mu$ 的道路走不通。关系 $E = pc$ 是 [[#eq-shell]] 的 $m = 0$ 情形，被当作类光四维动量的描述。它与光子的 $E = hf$ 和 $p = h/\lambda$ 相符，因为 $f\lambda = c$，但使用质量壳并不需要波动关系。
:::

动能是能量中超出静能的部分，

$$
K = E - mc^2 = (\gamma - 1)mc^2,
$$

如 [[relativity/velocity-energy]]。它绝不是 $\gamma mc^2$，并且只在低速展开中才是 $\tfrac12 mv^2$。质量壳可以重排成一个实用的平方根：若已知 $E$ 与 $m$，则 $pc = \sqrt{E^2 - m^2 c^4}$，大小取正根。

::: example 以 $0.800c$ 运动的质点 {#ex-moving}
一个质点的静能为 $mc^2 = 300\,\mathrm{MeV}$、速率为 $0.800c$。求 $E$ 与 $pc$，并校验质量壳。
::: solution
$\beta = 0.800$ 处的洛伦兹因子为

$$
\gamma = \frac{1}{\sqrt{1 - 0.800^2}} = \frac{1}{\sqrt{0.360}} = \frac{1}{0.600} = \frac{5}{3}.
$$

能量与动量随由 [[#def-four-momentum]] 得到：

$$
E = \gamma mc^2 = \frac{5}{3}\times 300\,\mathrm{MeV} = 500\,\mathrm{MeV},
$$

$$
pc = \gamma mc^2\cdot\beta = \frac{5}{3}\times 300\times 0.800\,\mathrm{MeV} = 400\,\mathrm{MeV}.
$$

质量壳 [[#eq-shell]] 读作

$$
E^2 - (pc)^2 = 500^2 - 400^2 = 250000 - 160000 = 90000 = 300^2 = (mc^2)^2.
$$

对这些值是精确成立，不只是三位有效数字成立。以能量为单位，四维动量沿运动方向是 $(E, pc) = (500, 400)\,\mathrm{MeV}$。它的 mostly-minus 平方是 $(mc^2)^2$，不是 $E^2$，也不是 $(pc)^2$。
:::
:::

::: warning 符号，以及不许你重新定义的那个质量
本讲使用 $(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$。正的平方意味着类时。写 $(\Delta x)^2 - (c\Delta t)^2$ 的书会把正的平方叫作类空，并把 $p\cdot p = -m^2 c^2$ 挂在嘴边。比较公式之前先把符号翻译过来。不要把半截公式翻译了、其余的原样留着。

不变的是 $(\Delta s)^2$，或 $E^2 - p^2 c^2$。不是 $\Delta t$，也不是 $\Delta x$。那两样在 [[#eq-boost]] 下都会变。

不要引入相对论质量 $\gamma m$。因子 $\gamma$ 属于 $E = \gamma mc^2$，属于 $\mathbf{p} = \gamma m\mathbf{v}$。符号 $m$ 是质量壳上的不变质量。光子 $m = 0$ 而仍有能量。倘若质量的意思是 $E/c^2$，这句话就不可能被说出来。
:::

## 碰撞中的不变量 {#collisions}

在牛顿力学中，孤立系统守恒 $m\mathbf{v}$ 的矢量和；若碰撞是弹性的，还守恒 $\tfrac12 mv^2$ 之和。在相对论中，取代这两条的单一陈述——无论弹性与否——是四维动量守恒。弹性是额外的要求：静质量的集合在前后相同。非弹性碰撞可以改变静质量。它不可以改变总四维动量。

我们把这条守恒律当作动力学输入，意义同于 [[mechanics/momentum]] 把牛顿守恒当作孤立系统牛顿第三定律的推论。能够证明、而不是公设的，是这一定律在各参考系之间相容，以及总四维动量的长度平方是一个质量、可以在你挑选的任何参考系中算出。

::: theorem 守恒与参考系无关 {#thm-conserve}
设有限粒子集之间的某个过程在一个惯性系中守恒总四维动量：过程前 $p^\mu$ 之和等于过程后之和。则和在每个惯性系中都相等。
:::

::: proof
洛伦兹变换 $\Lambda$ 线性地作用在每个四维动量上，并且对每个粒子都以同样的方式作用。若在第一个参考系中 $\sum_i p_i^\mu = \sum_j q_j^\mu$，对两边施加 $\Lambda$：

$$
\sum_i (\Lambda p_i)^\mu = \Lambda\left(\sum_i p_i\right)^\mu = \Lambda\left(\sum_j q_j\right)^\mu = \sum_j (\Lambda q_j)^\mu.
$$

变换后的总量匹配。这一步并不需要内积的不变性，线性就够了。于是总量的长度平方在前后是同一个数，在每个参考系中也是同一个数，因为它对 $P^\mu = \sum p_i^\mu$ 而言就是 $P\cdot P$。
:::

把一个系统的**不变质量** $M$ 定义为

$$
(Mc^2)^2 = E_{\mathrm{tot}}^2 - p_{\mathrm{tot}}^2 c^2,
$$ {#eq-Minv}

取 $M \ge 0$。对单个质点，这个 $M$ 就是 [[#eq-shell]] 中的 $m$。对多个质点，它不是它们质量之和，除非它们彼此相对静止。

::: proposition 不变质量与质量之和 {#prop-mass-sum}
设两个质点的不变质量为 $m_1 > 0$ 与 $m_2 > 0$，四维动量朝向未来。这一对质点的不变质量 $M$ 满足 $M \ge m_1 + m_2$，等号成立当且仅当两质点彼此相对静止。
:::

::: proof
在质点 $1$ 的静止系中工作——因为 $m_1 > 0$，它存在。那里 $E_1 = m_1 c^2$ 且 $\mathbf{p}_1 = 0$。质点 $2$ 的能量 $E_2 \ge m_2 c^2$，等号恰在它也在同一个参考系中静止时成立。总量为 $E = E_1 + E_2$ 与 $\mathbf{p} = \mathbf{p}_2$。于是

$$
\begin{aligned}
(Mc^2)^2 &= (m_1 c^2 + E_2)^2 - p_2^2 c^2 \\
&= m_1^2 c^4 + 2 m_1 c^2 E_2 + E_2^2 - p_2^2 c^2 \\
&= m_1^2 c^4 + m_2^2 c^4 + 2 m_1 c^2 E_2,
\end{aligned}
$$

其中用到 $E_2^2 - p_2^2 c^2 = m_2^2 c^4$。因为 $E_2 \ge m_2 c^2$，

$$
(Mc^2)^2 \ge m_1^2 c^4 + m_2^2 c^4 + 2 m_1 m_2 c^4 = (m_1 + m_2)^2 c^4,
$$

故 $M \ge m_1 + m_2$。等号成立恰在 $E_2 = m_2 c^2$，即质点 $2$ 静止在质点 $1$ 身旁时。左边是不变量，所以这一不等式不是我们为计算所选参考系的伪影。
:::

衰变是把同一个恒等式倒过来跑。质量为 $M$ 的单个质点是不变质量为 $M$ 的系统。它不能衰变成静质量之和大于 $M$ 的碎片。若碎片是两个等质量 $m$ 的质点，则 $M \ge 2m$，而静止系中的动量由质量壳固定。

考虑静止的、质量为 $M$ 的母粒子衰变为两个等质量 $m$ 的质点，$M \ge 2m$。动量守恒迫使两个子粒子背靠背地以相等的动量大小出现：$\mathbf{p}$ 与 $-\mathbf{p}$。能量守恒迫使 $E_1 + E_2 = Mc^2$。等质量与等 $|p|$ 迫使 $E_1 = E_2$，因为质量壳使 $E$ 只依赖 $|p|$ 与 $m$。于是每个子粒子有

$$
E = \frac{1}{2} Mc^2.
$$

质量壳于是给出

$$
(pc)^2 = E^2 - m^2 c^4 = \frac{1}{4}(Mc^2)^2 - (mc^2)^2 = \frac{c^4}{4}(M^2 - 4m^2),
$$

所以

$$
|p| = \frac{c}{2}\sqrt{M^2 - 4m^2}, \qquad pc = \frac{1}{2}\sqrt{(Mc^2)^2 - 4(mc^2)^2}.
$$ {#eq-decay-p}

若 $M = 2m$，则 $p = 0$，两个子粒子静止地待在原地，各有 $E = mc^2$。若 $M < 2m$，根号下的表达式为负。没有实数动量能同时满足守恒与两个质量壳。衰变在运动学上被禁，无论相互作用想怎么样。

::: example 一次两体衰变 {#ex-decay}
一个静能为 $Mc^2 = 1000\,\mathrm{MeV}$ 的质点静止衰变为两个质点，各有静能 $mc^2 = 400\,\mathrm{MeV}$。求静止系中每个子粒子的能量与动量，并校验质量壳。
::: solution
母粒子静止，所以每个子粒子带走一半能量：

$$
E = \frac{1000}{2} = 500\,\mathrm{MeV}.
$$

[[#eq-decay-p]]——或直接由质量壳——给出

$$
pc = \sqrt{500^2 - 400^2} = \sqrt{250000 - 160000} = \sqrt{90000} = 300\,\mathrm{MeV}.
$$

两个动量方向相反。其共同大小为 $|p| = (c/2)\sqrt{M^2 - 4m^2}$。以能量单位计即

$$
\frac{1}{2}\sqrt{1000^2 - 4\times 400^2} = \frac{1}{2}\sqrt{1000000 - 640000} = \frac{1}{2}\sqrt{360000} = \frac{1}{2}\times 600 = 300\,\mathrm{MeV},
$$

同一个值。这段算术所要求的质量壳校验是

$$
500^2 - 300^2 = 250000 - 90000 = 160000 = 400^2.
$$

每个子粒子以 $v/c = pc/E = 300/500 = 0.600$ 运动，且 $\gamma = E/(mc^2) = 500/400 = 1.25$，正是 $1/\sqrt{1 - 0.600^2}$。这一对的取向不被守恒固定。静止系是各向同性的。任何轴都可以叫作 $x$。

阈值情形 $M = 2m$ 会给出 $pc = 0$。这里 $1000 > 800$，所以子粒子带着运动产生。一个静能为 $700\,\mathrm{MeV}$ 的母粒子不能衰变为这两个子粒子：$700 < 400 + 400$，为 [[#prop-mass-sum]] 所不许。
:::
:::

::: example 同一个衰变在实验室中 {#ex-lab}
取 [[#ex-decay]] 的衰变，子粒子在母粒子静止系 $S'$ 中沿 $x$ 轴发射。设 $S'$ 相对实验室系 $S$ 的正 $x$ 方向以 $\beta = 0.600$ 运动。求每个子粒子的实验室能量与动量，并校验总四维动量与母粒子相符、且每个子粒子都留在自己的质量壳上。
::: solution
逆变换 [[#eq-inverse]] 以与作用于 $(ct, x)$ 相同的方式作用于 $(E/c, p_x)$：

$$
E = \gamma(E' + \beta\, p'_x c), \qquad p_x c = \gamma(p'_x c + \beta E'),
$$

其中 $\gamma = 1.25$、$\beta = 0.600$。在 $S'$ 中向前飞的子粒子有 $E' = 500\,\mathrm{MeV}$、$p'c = +300\,\mathrm{MeV}$，于是

$$
\begin{aligned}
E_+ &= 1.25\bigl(500 + 0.600\times 300\bigr) = 1.25\times 680 = 850\,\mathrm{MeV}, \\
(pc)_+ &= 1.25\bigl(300 + 0.600\times 500\bigr) = 1.25\times 600 = 750\,\mathrm{MeV}.
\end{aligned}
$$

向后飞的子粒子有 $p'c = -300\,\mathrm{MeV}$，于是

$$
\begin{aligned}
E_- &= 1.25\bigl(500 - 0.600\times 300\bigr) = 1.25\times 320 = 400\,\mathrm{MeV}, \\
(pc)_- &= 1.25\bigl(-300 + 0.600\times 500\bigr) = 1.25\times 0 = 0.
\end{aligned}
$$

向后飞的子粒子在实验室中静止。这是这组数字的特点：它在 $S'$ 中的速率是 $0.600c$，恰等于母粒子的速率，于是向后的速度相加恰好抵消。"必有一个子粒子停下"不是一条普遍规则。

每个质量壳依然成立。对向前飞的子粒子，

$$
850^2 - 750^2 = (850 - 750)(850 + 750) = 100\times 1600 = 160000 = 400^2.
$$

对向后飞的子粒子，$400^2 - 0^2 = 160000 = 400^2$。实验室的总量为

$$
E_+ + E_- = 850 + 400 = 1250\,\mathrm{MeV}, \qquad (pc)_+ + (pc)_- = 750.
$$

母粒子本身以 $\beta = 0.600$ 运动、静能为 $1000\,\mathrm{MeV}$，它有

$$
E = 1.25\times 1000 = 1250\,\mathrm{MeV}, \qquad pc = 1.25\times 1000\times 0.600 = 750\,\mathrm{MeV}.
$$

总量匹配，这就是配上了数字的 [[#thm-conserve]]。两个子粒子这一对的不变质量为

$$
\sqrt{1250^2 - 750^2} = \sqrt{(1250 - 750)(1250 + 750)} = \sqrt{500\times 2000} = \sqrt{1000000} = 1000\,\mathrm{MeV},
$$

即母粒子的静能，不是 $400 + 400 = 800\,\mathrm{MeV}$。子粒子在静止系中的动能是 $M$ 的一部分，而不是静质量之和以外另加的东西。
:::
:::

::: example 碰撞的不变质量 {#ex-collision}
一个能量为 $1000\,\mathrm{MeV}$、动量为 $pc = 800\,\mathrm{MeV}$ 的质点，撞击一个静能为 $700\,\mathrm{MeV}$ 的静止质点。求入射质点的静能，以及两粒子系统的不变质量能量。
::: solution
入射粒子自己的质量壳在任何有关碰撞的信息用到之前就固定了它的静能：

$$
mc^2 = \sqrt{1000^2 - 800^2} = \sqrt{1000000 - 640000} = \sqrt{360000} = 600\,\mathrm{MeV}.
$$

靶贡献 $E = 700\,\mathrm{MeV}$ 而没有动量。总量为 $E_{\mathrm{tot}} = 1700\,\mathrm{MeV}$、$p_{\mathrm{tot}}c = 800\,\mathrm{MeV}$。[[#eq-Minv]] 给出

$$
Mc^2 = \sqrt{1700^2 - 800^2} = \sqrt{2890000 - 640000} = \sqrt{2250000} = 1500\,\mathrm{MeV}.
$$

静能之和为 $600 + 700 = 1300\,\mathrm{MeV}$，而 $1500 > 1300$，与 [[#prop-mass-sum]] 相符。差值 $200\,\mathrm{MeV}$ 是在质心系（动量中心系）中可用的动能——在那里总动量为零、总能量就是 $Mc^2$ 本身。某个特定的新粒子能否产生，是一个关于末态静质量能否装进这 $1500\,\mathrm{MeV}$ 之下的问题，而不是关于束流能量是否单枪匹马超过一个静能的问题。束流能量依赖参考系。这 $1500\,\mathrm{MeV}$ 不依赖。
:::
:::

::: history 闵可夫斯基的演讲
闵可夫斯基（Hermann Minkowski）1908 年 9 月 21 日在科隆作了题为《空间与时间》（*Raum und Zeit*）的演讲。他在其中把狭义相对论放进几何语言：事件作为点，一个统一的不变间隔取代分开的空间与分开的时间。电磁场张量属于他那部分工作的同一个圈子。它不在 1905 年 6 月的论文里。爱因斯坦的《论动体的电动力学》推导了变换与运动学；他没有发展四维矢量。四维速度与四维动量是能量与动量的后来的包装，使 [[#eq-shell]] 看起来像它本来的样子——一个长度的平方。
:::

## 后续内容 {#leads}

[[relativity/spacetime]] 把间隔画在图上。本讲的双曲线成为固有时间为常数的曲线，类光条件成为一对 $45^\circ$ 的直线，而 [[#prop-order]] 的次序陈述变成"什么能导致什么"的图画。双生子效应是两端点相同的两条世界线上 $\int\dd\tau$ 之间的不等式，此处只陈述未证明。

质量壳是粒子物理学的运动学半边。动力学问题——截面、以及相互作用实际允许哪些衰变——需要的比 $E^2 - p^2 c^2$ 更多。但它们不可能需要得更少：违反 [[#prop-mass-sum]] 的衰变不会发生。四维矢量形式的电动力学，包括闵可夫斯基引入的场张量，等前期课程中的电荷与场就位之后，在 [[electrodynamics]] 中展开。

::: summary
- 事件的坐标是 $(ct, x, y, z)$。间隔平方 $(\Delta s)^2 = (c\Delta t)^2 - (\Delta r)^2$ 取 mostly-minus 符号。正号意味着类时，零为类光，负号为类空。
- 间隔在洛伦兹变换下不变。类时与类光的次序在每个惯性系中都相同。类空的次序不然，并且存在使类空对同时的参考系。
- 沿一条类时世界线，固有时间满足 $(c\,\dd\tau)^2 = (c\,\dd t)^2 - \dd r^2$，于是 $\dd\tau = \dd t/\gamma$。在两个事件之间，$\sqrt{(\Delta s)^2}/c$ 只对同时出席二者的惯性钟才是固有时间。
- 四维速度 $U^\mu = \dd x^\mu/\dd\tau = (\gamma c, \gamma\mathbf{v})$ 满足 $U\cdot U = c^2$。它对光没有定义。
- 四维动量是 $p^\mu = m U^\mu = (E/c, \mathbf{p})$，$m$ 为不变质量，$E = \gamma mc^2$、$\mathbf{p} = \gamma m\mathbf{v}$。质量壳是 $E^2 - p^2 c^2 = m^2 c^4$。这些公式里没有相对论质量 $\gamma m$。
- 孤立过程的总四维动量只要在一个惯性系中守恒，就在每个惯性系中守恒。一个系统的不变质量不是各静质量之和，除非各粒子彼此相对静止；而且它不会小于那个和。
- 静能 $1000\,\mathrm{MeV}$ 的母粒子衰变为两个静能 $400\,\mathrm{MeV}$ 的质点时，在其静止系中每个子粒子有 $E = 500\,\mathrm{MeV}$、$pc = 300\,\mathrm{MeV}$，且 $500^2 - 300^2 = 400^2$。
:::

## 习题 {#exercises}

::: exercise 间隔平方 {level=1 check="36"}
两事件相距 $c\Delta t = 10.0\,\mathrm{m}$、$\Delta x = 8.00\,\mathrm{m}$，且 $\Delta y = \Delta z = 0$。求 $(\Delta s)^2$，以 $\mathrm{m}^2$ 计。
::: solution
用 [[#eq-interval]] 与 mostly-minus 符号，时间项在前：

$$
(\Delta s)^2 = (10.0)^2 - (8.00)^2 = 100 - 64.0 = 36.0\,\mathrm{m}^2.
$$

平方为正，所以间隔类时。一个同时出席两事件的惯性钟的固有时间将是 $\sqrt{36.0}/c = 6.00/c = 2.00\times 10^{-8}\,\mathrm{s}$（三位有效数字），因为 $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$ 而 $6/c = 2.0014\times 10^{-8}\,\mathrm{s}$。题目只要间隔平方。符号弄错、把 $(\Delta x)^2$ 放在前面，会得到 $-36.0\,\mathrm{m}^2$ 并把这一对分类成类空。那是另一种约定，不是本讲的约定。
:::
:::

::: exercise 由质量壳求动量 {level=1 check="1200"}
一个质点静能为 $500\,\mathrm{MeV}$、总能量为 $1300\,\mathrm{MeV}$。求 $pc$，以 MeV 计。
::: solution
质量壳 [[#eq-shell]] 在 $E$ 与 $m$ 已知时固定动量：

$$
pc = \sqrt{E^2 - (mc^2)^2} = \sqrt{1300^2 - 500^2} = \sqrt{1690000 - 250000} = \sqrt{1440000} = 1200\,\mathrm{MeV}.
$$

正根是大小。作为对因子的校验，$v/c = pc/E = 1200/1300 = 12/13$，且 $\gamma = E/(mc^2) = 1300/500 = 13/5 = 2.60$。于是

$$
1 - \left(\frac{12}{13}\right)^2 = 1 - \frac{144}{169} = \frac{25}{169}, \qquad \sqrt{1 - \beta^2} = \frac{5}{13},
$$

所以 $1/\sqrt{1 - \beta^2} = 13/5$，与 $\gamma$ 相符。这段算术是一个放大 $100\,\mathrm{MeV}$ 的 $5$-$12$-$13$ 三角形。在根号下以错误的次序相减会得到一个负数，而那通常意味着静能大于总能量——对自由质点这不可能发生。
:::
:::

::: exercise $0.600c$ 处的洛伦兹因子 {level=1 check="5/4"}
求以 $v = 0.600c$ 运动的质点的 $\gamma$。
::: solution
由定义，

$$
\gamma = \frac{1}{\sqrt{1 - \beta^2}} = \frac{1}{\sqrt{1 - 0.600^2}} = \frac{1}{\sqrt{1 - 0.360}} = \frac{1}{\sqrt{0.640}} = \frac{1}{0.800} = 1.25 = \frac{5}{4}.
$$

精确值是 $5/4$。四维速度的时间分量为 $\gamma c = (5/4)c$、空间分量为 $\gamma v = (5/4)(0.600)c = 0.750c$，且

$$
(\gamma c)^2 - (\gamma v)^2 = c^2\left[\left(\frac{5}{4}\right)^2 - \left(\frac{3}{4}\right)^2\right] = c^2\left(\frac{25}{16} - \frac{9}{16}\right) = c^2,
$$

这正是 [[#thm-u-square]]。在这一速率上，快度是 $\ln 2$，而不是正切为 $0.600$ 的那个角。
:::
:::

::: exercise 一个同时参考系 {level=2 check="3/5"}
两个事件有 $c\Delta t = 9.00\,\mathrm{m}$、$\Delta x = 15.0\,\mathrm{m}$，在 $y$ 与 $z$ 方向没有间隔。求使两事件同时的惯性系的 $v/c$。
::: solution
先分类。$(\Delta s)^2 = 9.00^2 - 15.0^2 = 81.0 - 225 = -144\,\mathrm{m}^2$，所以这一对是类空的，同时参考系存在。让 boost 与间隔对齐。由 [[#prop-order]] 的证明，使 $\Delta t$ 相消的速率为

$$
\beta = \frac{c\Delta t}{\Delta x} = \frac{9.00}{15.0} = 0.600 = \frac{3}{5}.
$$

校验：$c\Delta t' = \gamma(9.00 - 0.600\times 15.0) = \gamma(9.00 - 9.00) = 0$。该系中的固有距离为 $\sqrt{144} = 12.0\,\mathrm{m}$。一对类时事件——把 $9.00$ 与 $15.0$ 互换——会给出 $\beta = 15/9 > 1$，那不是参考系。公式 $\beta = c\Delta t/\Delta x$ 只有当 $|\Delta x| > |c\Delta t|$ 时才是一个速度。
:::
:::

::: exercise 另一次两体衰变 {level=2 check="400"}
一个静能为 $1000\,\mathrm{MeV}$ 的质点静止衰变为两个静能各为 $300\,\mathrm{MeV}$ 的质点。求每个子粒子的 $pc$，以 MeV 计。
::: solution
每个子粒子分得母粒子能量的一半，$E = 500\,\mathrm{MeV}$。质量相等，所以动量等值反向，质量壳给出

$$
pc = \sqrt{500^2 - 300^2} = \sqrt{250000 - 90000} = \sqrt{160000} = 400\,\mathrm{MeV}.
$$

衰变公式相符：

$$
pc = \frac{1}{2}\sqrt{1000^2 - 4\times 300^2} = \frac{1}{2}\sqrt{1000000 - 360000} = \frac{1}{2}\times 800 = 400\,\mathrm{MeV}.
$$

这不是 [[#ex-decay]] 中的那次衰变。那里子粒子的静能为 $400\,\mathrm{MeV}$、$pc = 300\,\mathrm{MeV}$。这里静能与动量在放大 $100\,\mathrm{MeV}$ 的 $3$-$4$-$5$ 三角形中互换了角色：$300^2 + 400^2 = 500^2$。母粒子静能 $1000\,\mathrm{MeV}$ 依然在阈值 $600\,\mathrm{MeV}$ 之上。每个子粒子的速率为 $v/c = 400/500 = 0.800$，且 $\gamma = 500/300 = 5/3$。
:::
:::

::: exercise 一对粒子的不变质量 {level=2 check="1600"}
一个能量为 $1500\,\mathrm{MeV}$、动量 $pc = 1200\,\mathrm{MeV}$ 的质点，与一个静能为 $500\,\mathrm{MeV}$ 的静止质点相碰。求系统的不变质量能量 $Mc^2$，以 MeV 计。
::: solution
在本参考系中总量为 $E_{\mathrm{tot}} = 1500 + 500 = 2000\,\mathrm{MeV}$、$p_{\mathrm{tot}}c = 1200\,\mathrm{MeV}$。[[#eq-Minv]] 给出

$$
Mc^2 = \sqrt{2000^2 - 1200^2} = \sqrt{4000000 - 1440000} = \sqrt{2560000} = 1600\,\mathrm{MeV}.
$$

入射粒子自身的静能为 $\sqrt{1500^2 - 1200^2} = \sqrt{2250000 - 1440000} = \sqrt{810000} = 900\,\mathrm{MeV}$。静能之和为 $900 + 500 = 1400\,\mathrm{MeV}$，小于 $1600\,\mathrm{MeV}$，正如 [[#prop-mass-sum]] 所要求。把 $1500\,\mathrm{MeV}$ 本身当作不变质量来用，是忘了动量；用 $900 + 500$，是忘了相对运动。两者都不是 $Mc^2$。
:::
:::

::: exercise 证明间隔的不变性 {level=3}
陈述标准 boost，并证明 $(c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$ 保持不变。解释为什么对坐标差——而不是对坐标本身——的结果才是对一对事件所需要的那条陈述。
::: hint
:::
展开 $(ct' - \beta\, \text{某量})$。交叉项相消，而 $\gamma^2(1 - \beta^2) = 1$ 消去剩下的因子。然后说明原点的平移本会对 $t$ 做什么、却不会对 $\Delta t$ 做什么。
::: solution
标准 boost 即 [[#eq-boost]]：$ct' = \gamma(ct - \beta x)$、$x' = \gamma(x - \beta\, ct)$、$y' = y$、$z' = z$，其中 $\gamma = 1/\sqrt{1 - \beta^2}$。$y$ 与 $z$ 对间隔的贡献在两侧匹配。对另一对，

$$
\begin{aligned}
(ct')^2 - (x')^2
&= \gamma^2\bigl[(ct - \beta x)^2 - (x - \beta\, ct)^2\bigr] \\
&= \gamma^2\bigl[c^2 t^2 - 2\beta\, ct\, x + \beta^2 x^2 - (x^2 - 2\beta\, x\, ct + \beta^2 c^2 t^2)\bigr] \\
&= \gamma^2\bigl[(1 - \beta^2)(c^2 t^2 - x^2)\bigr] \\
&= (ct)^2 - x^2,
\end{aligned}
$$

因为 $\gamma^2(1 - \beta^2) = 1$。于是完整的 mostly-minus 平方是不变量。把 $(ct, x, y, z)$ 换成 $(\Delta(ct), \Delta x, \Delta y, \Delta z)$ 不改动算术的哪怕一行，而差的变换律与 [[#eq-boost]] 相同——即使两个参考系的原点不重合：常数的平移在 $\Delta t$ 与 $\Delta x$ 中相消。单个事件的坐标不是不变量，也不是 [[#eq-interval]] 说的东西。类时、类光、类空的分类之所以是不变的，因为它是某个不变量的符号。
:::
:::

::: exercise 静质量之和为什么超不过母粒子 {level=3}
证明质量 $m_1 > 0$ 与 $m_2 > 0$ 的两个朝向未来的质点，其不变质量满足 $M \ge m_1 + m_2$，等号成立当且仅当二者彼此相对静止。进而判断：一个静能为 $700\,\mathrm{MeV}$ 的质点能否衰变为两个静能各为 $400\,\mathrm{MeV}$ 的质点。
::: hint
:::
坐在第一个质点的静止系里。在 $E_{\mathrm{tot}}^2 - p_{\mathrm{tot}}^2 c^2$ 内部使用 $E_2 \ge m_2 c^2$，并用质点 $2$ 的质量壳替换 $E_2^2 - p_2^2 c^2$。
::: solution
在质点 $1$ 的静止系中，$E_1 = m_1 c^2$ 且 $\mathbf{p}_1 = 0$。质点 $2$ 有 $E_2 \ge m_2 c^2$ 且 $E_2^2 - p_2^2 c^2 = m_2^2 c^4$。系统的总量为 $E = m_1 c^2 + E_2$、$\mathbf{p} = \mathbf{p}_2$，于是

$$
\begin{aligned}
(Mc^2)^2 &= (m_1 c^2 + E_2)^2 - p_2^2 c^2 \\
&= m_1^2 c^4 + 2 m_1 c^2 E_2 + (E_2^2 - p_2^2 c^2) \\
&= m_1^2 c^4 + m_2^2 c^4 + 2 m_1 c^2 E_2.
\end{aligned}
$$

不等式 $E_2 \ge m_2 c^2$ 替换掉最后一项：

$$
(Mc^2)^2 \ge m_1^2 c^4 + m_2^2 c^4 + 2 m_1 m_2 c^4 = (m_1 + m_2)^2 c^4.
$$

故 $M \ge m_1 + m_2$。等号要求 $E_2 = m_2 c^2$，于是质点 $2$ 静止在质点 $1$ 的静止系中：相对速度为零。左边由总四维动量构成，所以与参考系无关，不等式随之一同成立。

静能 $700\,\mathrm{MeV}$ 的母粒子在衰变前是一个不变质量能量为 $700\,\mathrm{MeV}$ 的系统，由 [[#thm-conserve]]，衰变后仍是这个不变质量。两个静能各 $400\,\mathrm{MeV}$ 的子粒子将需要 $M \ge 800\,\mathrm{MeV}$。因为 $700 < 800$，衰变不可能。这一缺口不是任何聪明的角分布能够补上的。没有任何实数动量能同时把两个子粒子放上各自的质量壳并守恒四维动量。倘若母粒子的静能是 $800\,\mathrm{MeV}$，子粒子也只能在母粒子系中静止地产生。
:::
:::
