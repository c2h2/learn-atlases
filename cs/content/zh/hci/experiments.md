十二名参与者试用新触控板和旧鼠标。鼠标的平均吞吐量为 4.38 bits/s，触控板为 4.13。把数据当作两组相互独立的数字来分析，差距远谈不上显著（$p = 0.21$），团队于是断定两种设备表现相同。而正确地分析——毕竟是*同样*的十二个人分别使用了两种设备，而且他们每个人都用鼠标更快——差距则极其显著（$p \approx 10^{-5}$）。同样的数据，相反的结论；唯一的区别，是分析是否尊重了实验的设计。放到网络规模上，错误的样子不同，但同样容易犯：一个每天都检查、一看起来显著就立刻停止的在线实验，会在约三分之一的概率上"发现"一个根本不存在的效应。

[[hci/usability-evaluation]] 讲的是发现问题；这一章讲的是如何回答**比较性**的问题——设计 A 比设计 B 更快、更准或更令人满意吗？——并且带着已知的犯错风险。我们设计**受控实验**：选择变量与假设，在被试内与被试间设计之间作出取舍，用平衡拉丁方对顺序作平衡。我们用**配对** $t$ 检验与 **Welch** $t$ 检验（以纯 Python 实现）来分析实验结果，并讨论效应量、置信区间与功效。最后我们把规模放大到**在线受控实验**（A/B 测试）及其陷阱：检测小效应所需的样本量、样本比例失配、窥视、新奇效应与伦理。背后的概率与统计在 Maths Atlas 中讲授——[假设检验](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing)与[置信区间](/learn/maths/lesson.php?c=statistics&l=confidence-intervals)——本章直接加以上述运用。

## 实验设计

::: definition 变量与假设 {#def-variables}
在受控实验中，实验者操纵一个或多个**自变量**（因子），每个因子有两个或更多**水平**（条件）——例如输入设备是一个因子，取鼠标与触控板两个水平——并测量一个或多个**因变量**——吞吐量、错误率、满意度。**控制变量**保持恒定（任务、显示器、指导语）。**混淆变量**与某个自变量系统性地共同变化，从而为结果提供另一种解释。**原假设** $H_0$ 说自变量对因变量没有影响；**备择假设** $H_1$ 说有影响。
:::

实验区别于观察性研究的本质特征，是实验者*指派*条件——而且指派的方式要能把混淆打断。HCI 中的经典混淆：新设计由热情的早期采纳者来测，旧设计交给其他人（参与者混淆）；新设计总是第二个被尝试，那时参与者已经熟悉了任务（顺序混淆）；新设计得到更多练习试次、更好的屏幕或更鼓励人的实验者。

实验在**内部效度**——有多大把握认为观察到的差别确实由自变量引起——与**外部效度**——有多大把握认为结果能推广到真实的用户、任务与场景——之间作权衡。控制极严的实验室指点任务内部效度高，但对真实办公工作几乎不置一词；现场部署则恰好相反。好的研究计划会两者并用。

### 被试内还是被试间

::: definition 被试内设计与被试间设计 {#def-designs}
**被试间**设计中，每名参与者恰好经历一个条件，条件在不同（随机指派的）参与者组之间比较。**被试内**设计（重复测量设计）中，每名参与者经历所有条件，条件在参与者内部比较。
:::

被试内设计需要的参与者更少，灵敏度高得多，因为每名参与者都是自己的对照：*人与人之间*的巨大差别（有些人就是什么都快）被抵消了。代价是**顺序效应**：练习（人对任务越来越熟）、疲劳（越来越差）与迁移（在一种设计上学到的策略带到下一种）。被试间设计完全避免顺序效应，而且在一种条件的暴露会污染另一种条件时必不可少——用两种方式教同一个概念，或让同一个人看到同一网站被认出来的两个版本——但需要的参与者多得多。灵敏度的增益有一个精确的形式。

::: proposition 配对差的方差 {#prop-paired-variance}
设某名参与者在两个条件下的得分为随机变量 $X$ 与 $Y$，方差为 $\sigma_X^2$、$\sigma_Y^2$，相关系数为 $\rho$。则

$$
\Var(X - Y) = \sigma_X^2 + \sigma_Y^2 - 2\rho\,\sigma_X\sigma_Y.
$$

每组 $n$ 名参与者时，估计的均值差在被试内设计中的方差为 $\Var(X-Y)/n$，在每组 $n$ 名不同参与者的被试间设计中为 $(\sigma_X^2 + \sigma_Y^2)/n$。当 $\sigma_X = \sigma_Y = \sigma$ 时，这两个方差之比为 $1 - \rho$。
:::

::: proof
由协方差的双线性，$\Var(X - Y) = \Var X + \Var Y - 2\Cov(X, Y)$，且 $\Cov(X, Y) = \rho\sigma_X\sigma_Y$。$n$ 个独立的配对差的均值的方差为 $\Var(X - Y)/n$。被试间设计中两个组均值相互独立，各自的方差为 $\sigma^2/n$（一般情形写作 $\sigma_X^2/n$ 与 $\sigma_Y^2/n$），故其差的方差为 $(\sigma_X^2 + \sigma_Y^2)/n$。方差相等时，比值即 $(2\sigma^2 - 2\rho\sigma^2)/(2\sigma^2) = 1 - \rho$。
:::

在指点与文本录入研究中，参与者对两种设备的得分相关常常达到 0.8 甚至更高，因此被试内设计可把比较量的方差缩小到五分之一或更少——相当于五倍以上的参与者。

### 顺序平衡

为了让顺序效应不至于冒充条件效应，条件的顺序要被**平衡**（counterbalance）：在不同参与者之间变化，使得每个条件在每个位置出现的次数相同。$k$ 个条件时，用尽全部 $k!$ 种顺序在三四个条件之外就不现实。**拉丁方**——一个 $k \times k$ 的排布，其中每个条件在每行（参与者组）与每列（位置）恰好出现一次——只需 $k$ 种顺序就能平衡位置。但简单的循环方阵（$ABCD$、$BCDA$、$CDAB$、$DABC$）里 $B$ 永远紧接在 $A$ 之后，若对 $A$ 的经验帮助或伤害了 $B$，效应就被混淆了。**平衡拉丁方**还平衡了"哪个条件紧接在哪个条件之后"。

::: algorithm 平衡拉丁方（Williams 设计） {#alg-balanced-latin}
对偶数个条件 $k$，标记为 $0, \dots, k-1$：

1. 构造第一行 $0, 1, k-1, 2, k-2, 3, k-3, \dots$——交替取下一个最小与下一个最大的未用标记，直到取满 $k$ 个。
2. 对 $r = 1, \dots, k - 1$，第 $r$ 行是第一行的每个元素加 $r$（模 $k$）。

把参与者均分到 $k$ 行。（$k$ 为奇数时，把这个方阵连同它的镜像一起使用，得到 $2k$ 行。）
:::

::: proposition Williams 方阵是平衡的 {#prop-williams}
$k$ 为偶数时，[[#alg-balanced-latin]] 的方阵是拉丁方，且每个由不同条件组成的有序对 $(a, b)$ 作为相邻元素"$a$ 后接 $b$"在各行中恰好出现一次。
:::

::: proof
第一行列出 $0$，随后是 $1, k-1, 2, k-2, \dots, k/2$，恰好是每个标记各一次。加 $r$（模 $k$）是双射，所以每行包含每个标记恰好一次。第 $j$ 列的元素是 $f_j + r$，$r = 0, \dots, k-1$，其中 $f_j$ 是第一行的元素；随着 $r$ 跑遍，它们恰好跑遍每个标记一次，所以每列包含每个标记恰好一次。

再看相邻性，考察第一行相邻元素之差 $\delta_j = f_{j+1} - f_j \bmod k$，$j = 0, \dots, k-2$。它们是 $1, -2, 3, -4, \dots, \pm(k-1)$，即模 $k$ 下的 $1, k-2, 3, k-4, \dots, k-1$——奇数 $1, 3, \dots, k-1$ 与偶数 $k-2, k-4, \dots, 2$ 各出现一次：每个非零剩余类恰好一次。给一行加 $r$ 不改变这些差。现在取 $a \ne b$，令 $\delta = b - a \bmod k \ne 0$。恰有一个位置 $j$ 使 $\delta_j = \delta$，且恰有一行 $r$ 使 $f_j + r \equiv a$；在那一行的位置 $j, j+1$ 上就是 $a, b$。在其他任何行或位置，该元素对都不是 $(a, b)$，因为差或第一个元素必有一个对不上。所以 $(a, b)$ 相邻恰好一次。
:::

::: example 四个界面条件 {#ex-latin}
为四个条件 $A$–$D$ 生成一个平衡拉丁方并检验它。
::: solution
```python
def balanced_latin_square(n):
    """Williams design for even n: row r is the first row plus r (mod n)."""
    first, lo, hi = [0], 1, n - 1
    while len(first) < n:            # 0, 1, n-1, 2, n-2, ...
        first.append(lo); lo += 1
        if len(first) < n:
            first.append(hi); hi -= 1
    return [[(x + r) % n for x in first] for r in range(n)]

def check(square):
    n = len(square)
    latin = all(sorted(row) == list(range(n)) for row in square) and \
            all(sorted(col) == list(range(n)) for col in zip(*square))
    pairs = [(row[j], row[j + 1]) for row in square for j in range(n - 1)]
    each_once = len(pairs) == len(set(pairs)) == n * (n - 1)
    return latin, each_once

sq = balanced_latin_square(4)
for row in sq:
    print(" ".join("ABCD"[x] for x in row))
print(check(sq))
print([check(balanced_latin_square(n)) for n in (2, 6, 8, 10)])
```

```console
$ python3 latin.py
A B D C
B C A D
C D B A
D A C B
(True, True)
[(True, True), (True, True), (True, True), (True, True)]
```

每个条件在每个位置恰好出现一次，且 $4 \times 3 = 12$ 个有序对（如 $A \to B$、$B \to A$）中的每一个都恰好相邻一次，正如 [[#prop-williams]] 所证。有 12 名参与者时，每行分三人。顺序平衡把顺序效应在各条件之间*摊平*，但并不消除它们；若学习效应很强，它还会抬高方差——正式测量之前的练习试次会有帮助。
:::
:::

## 分析结果：$t$ 检验

对以等距尺度测量的因变量（多次试次取平均后的时间、吞吐量、错误率）与两个条件的比较，惯用的分析是 $t$ 检验；检验的版本必须与设计相匹配。

::: definition 配对 $t$ 检验与 Welch $t$ 检验 {#def-t-tests}
**配对 $t$ 检验**（被试内）。设 $d_i = x_i - y_i$ 为第 $i$ 名参与者在两条件下的差，$i = 1, \dots, n$，其均值为 $\bar d$，样本标准差为 $s_d$。统计量

$$
t = \frac{\bar d}{s_d/\sqrt n}
$$ {#eq-paired-t}

在 $H_0$（均值差为 0）下、且当诸 $d_i$ 独立近似正态时，服从自由度为 $n - 1$ 的 Student $t$ 分布。

**Welch $t$ 检验**（被试间）。对样本量为 $n_1, n_2$、均值为 $\bar x_1, \bar x_2$、方差为 $s_1^2, s_2^2$ 的两个独立样本，令 $v_j = s_j^2/n_j$。统计量

$$
t = \frac{\bar x_1 - \bar x_2}{\sqrt{v_1 + v_2}}
$$ {#eq-welch-t}

在 $H_0$ 下近似服从 $t$ 分布，自由度为 $\nu = (v_1 + v_2)^2 / \bigl(v_1^2/(n_1 - 1) + v_2^2/(n_2 - 1)\bigr)$（Welch–Satterthwaite 近似）。Welch 检验不假设方差相等，通常优于经典的合并方差两样本 $t$ 检验。
:::

**$p$ 值**是在 $H_0$ 下得到至少与观测值一样极端的统计量的概率；双侧检验下 $p = \Prob(\lvert T\rvert \ge \lvert t\rvert)$。计算它需要 $t$ 分布的尾部，可用正则化不完全贝塔函数表示：对 $T \sim t_\nu$，$\Prob(\lvert T\rvert \ge t) = I_{\nu/(\nu + t^2)}(\nu/2, 1/2)$。Python 标准库没有 $t$ 分布，所以我们自己实现。

::: example 鼠标对阵触控板 {#ex-ttest}
十二名参与者分别使用鼠标与触控板各一次，顺序经过平衡；他们的吞吐量（bits/s；演示性数据）如下

| 参与者 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 鼠标 | 4.6 | 3.9 | 5.1 | 4.2 | 4.8 | 3.6 | 4.4 | 5.0 | 4.1 | 3.8 | 4.7 | 4.3 |
| 触控板 | 4.3 | 3.7 | 4.8 | 3.9 | 4.6 | 3.3 | 4.4 | 4.6 | 3.8 | 3.6 | 4.3 | 4.2 |

先正确地分析这些数据，再错误地当作两组独立数据分析一遍。
::: solution
```python
from math import lgamma, exp, log, sqrt
from statistics import mean, stdev

def betainc(a, b, x):
    """Regularised incomplete beta I_x(a, b), by Lentz's continued fraction."""
    if x <= 0 or x >= 1:
        return 0.0 if x <= 0 else 1.0
    if x > (a + 1) / (a + b + 2):                 # symmetry for fast convergence
        return 1.0 - betainc(b, a, 1 - x)
    front = exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * log(x) + b * log(1 - x)) / a
    f, c, d = 1.0, 1.0, 0.0
    for i in range(400):
        m = i // 2
        if i == 0:
            num = 1.0
        elif i % 2 == 0:
            num = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m))
        else:
            num = -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1))
        d = 1.0 / (1.0 + num * d or 1e-300)
        c = (1.0 + num / c) or 1e-300
        f *= c * d
        if abs(1.0 - c * d) < 1e-14:
            break
    return front * (f - 1.0)

def t_p(t, df):
    """Two-sided p-value for Student's t with df degrees of freedom."""
    return betainc(df / 2, 0.5, df / (df + t * t))

mouse    = [4.6, 3.9, 5.1, 4.2, 4.8, 3.6, 4.4, 5.0, 4.1, 3.8, 4.7, 4.3]
touchpad = [4.3, 3.7, 4.8, 3.9, 4.6, 3.3, 4.4, 4.6, 3.8, 3.6, 4.3, 4.2]
n = len(mouse)
diff = [m - t for m, t in zip(mouse, touchpad)]
d_bar, s_d = mean(diff), stdev(diff)
t1 = d_bar / (s_d / sqrt(n))
print(f"paired: mean diff {d_bar:.3f}, t({n-1}) = {t1:.3f}, p = {t_p(t1, n-1):.2g}, d_z = {d_bar/s_d:.2f}")
half = 2.200985 * s_d / sqrt(n)                  # t quantile 0.975 with 11 df
print(f"        95% CI {d_bar - half:.3f} to {d_bar + half:.3f}")
v1, v2 = stdev(mouse) ** 2 / n, stdev(touchpad) ** 2 / n
t2 = (mean(mouse) - mean(touchpad)) / sqrt(v1 + v2)
df = (v1 + v2) ** 2 / (v1 ** 2 / (n - 1) + v2 ** 2 / (n - 1))
print(f"Welch (wrong here): t({df:.1f}) = {t2:.3f}, p = {t_p(t2, df):.2g}")
print(f"check: t_p(2.262157, 9) = {t_p(2.262157, 9):.4f}")
```

```console
$ python3 ttest.py
paired: mean diff 0.250, t(11) = 7.416, p = 1.3e-05, d_z = 2.14
        95% CI 0.176 to 0.324
Welch (wrong here): t(22.0) = 1.302, p = 0.21
check: t_p(2.262157, 9) = 0.0500
```

最后一行用一个查表值校验实现：$t_{9,\,0.025} = 2.262$。除一人外（参与者 7 打平），每名参与者用鼠标都更快，快出的量介于 0 到 0.4 bits/s 之间，所以配对差虽然不大却高度一致：$t(11) = 7.42$，$p \approx 1.3 \times 10^{-5}$，鼠标平均优势的 95% 置信区间为 0.18 到 0.32 bits/s。Welch 检验无视了配对；它看到的只是两团相互重叠的数字，其散布主要被人与人的差别支配（两种设备得分的相关系数是 0.97），于是什么也没发现。由 [[#prop-paired-variance]]，配对分析的方差只有约 $1 - 0.97 = 0.03$ 倍。报告时应写明设计、所用的检验、$t$ 值及其自由度、$p$、效应量与置信区间——如果可以，还应公开数据。
:::
:::

::: widget distribution
dist: t
params: df=11
a: -2.201
b: 2.201
normal: true
caption: 自由度为 11 的 $t$ 分布，即 [[#ex-ttest]] 中配对统计量的零分布，中央 95%（$\pm 2.201$ 之间）已着色，并叠画了标准正态曲线。观测到的 $t = 7.42$ 远在图幅右缘之外。试着减小自由度：尾部变厚，临界值外移——这正是小样本需要更大的 $t$ 才能达到显著的原因。
:::

### 效应量、区间与功效

$p$ 值说的是：若不存在效应，眼前这些数据会有多令人意外；它不说效应有多大，也不说它要不要紧。应当报告以测量单位计量的**效应量**（0.25 bits/s、快 6%）并附上**置信区间**；跨研究比较时再报告标准化效应量：**科恩（Cohen）$d$**，被试间设计中均值差除以（合并）标准差，配对设计中则用 $d_z = \bar d/s_d$。雅各布·科恩把 0.2、0.5、0.8 标为"小""中""大"，只是针对行为科学提出的粗略惯例，并非普适标准。

::: proposition 两群体比较的样本量 {#prop-power}
要在显著性水平 $\alpha$ 下用双侧检验以功效 $1 - \beta$ 检测两个独立群体之间真实的标准化差 $d$，正态近似大约要求每组

$$
n = \frac{2\,(z_{1-\alpha/2} + z_{1-\beta})^2}{d^2}
$$ {#eq-power}

名参与者，其中 $z_q$ 是标准正态的 $q$ 分位数。标准化效应为 $d_z$ 的配对设计，大约总共需要 $n = (z_{1-\alpha/2} + z_{1-\beta})^2 / d_z^2$ 名参与者。
:::

::: proof
每组 $n$ 人、公共标准差为 $\sigma$ 时，均值差 $\hat\Delta$ 近似正态，均值为 $\Delta = d\sigma$，标准差为 $\sigma\sqrt{2/n}$。当 $\lvert\hat\Delta\rvert/(\sigma\sqrt{2/n}) > z_{1-\alpha/2}$ 时检验拒绝。忽略在错误方向上拒绝的微小概率，功效为 $\Prob\bigl(\hat\Delta > z_{1-\alpha/2}\sigma\sqrt{2/n}\bigr) = \Phi\bigl(d\sqrt{n/2} - z_{1-\alpha/2}\bigr)$。令其等于 $1 - \beta$ 得 $d\sqrt{n/2} - z_{1-\alpha/2} = z_{1-\beta}$，整理即得 [[#eq-power]]。配对设计中均值差的标准差为 $\sigma_d/\sqrt n$，以 $d_z = \Delta/\sigma_d$ 代入同样的论证得 $d_z\sqrt n = z_{1-\alpha/2} + z_{1-\beta}$。
:::

取 $\alpha = 0.05$、功效 0.8，则 $(1.960 + 0.842)^2 \approx 7.85$。"中等"效应 $d = 0.5$ 需要约 $2 \times 7.85/0.25 \approx 63$ 名参与者每组——共 126 人；而 $d_z = 0.5$ 的配对设计只需约 $7.85/0.25 \approx 32$ 人（用精确的 $t$ 分布再多一点）。许多 HCI 研究只用 12 到 24 名参与者；它们只能检测大效应，其中不显著的结果只是"*没有*效应"的微弱证据。

::: example 规划一项菜单研究 {#ex-plan}
一个团队预计新菜单每次选择能省约 0.3 秒。预实验显示，选择时间在人与人之间约以 1.0 秒的标准差波动，但每个人在两个菜单之间的*差*的标准差只有约 0.5 秒。要在 $\alpha = 0.05$ 下达到 80% 的功效，被试间与被试内设计各需要多少名参与者？
::: solution
被试间设计中，标准化效应为 $d = 0.3/1.0 = 0.3$，由 [[#eq-power]] 得 $n = 2 \times 7.849/0.09 \approx 174.4$：**每组 175 人**，共 350 人。被试内设计中，$d_z = 0.3/0.5 = 0.6$，于是 $n = 7.849/0.36 \approx 21.8$：约 **22 名参与者**（取 24：为 $t$ 分布留余量，也让 $4 \times 4$ 平衡拉丁方的每个组恰好是整组）。十五倍的差距正是 [[#prop-paired-variance]] 在起作用：由预实验的两个标准差可知，同一个人两个菜单用时之间的相关为 $\rho = 1 - 0.5^2/(2 \times 1.0^2) = 0.875$。这个规划严重依赖预实验的标准差，而小规模预实验的标准差本身就不可靠——这也是规划要从保守的又一理由。
:::
:::

::: warning "$p = 0.21$，所以两个设计表现相同"
不显著只意味着数据与"无效应"相容；它并不表明不存在效应——数据同样可能与一个大效应相容。看置信区间：若它从"差得多"一直铺到"好得多"，那只是研究太小。要宣称等效，先定义最小的有意义的差别，再证明置信区间整个落在其内（等效性检验）。同样，$p < 0.05$ 不是假设为真的概率；极小的 $p$ 配上可以忽略的效应量（在大样本中很常见）不是重要发现。而把多种测量、子群与分析选择逐个试一遍，直到某个给出 $p < 0.05$——**$p$ 曲线操纵（p-hacking）**——会让假阳性几乎必然发生；分析方案应当事先定下，条件允许时还应预先登记。
:::

### 两个均值之外

条件多于两个，或因素不止一个，就需要方差分析（ANOVA）及其重复测量形式，随后再作经过校正的两两比较；每多做一个 $\alpha = 0.05$ 的检验都增加假阳性风险，**邦费罗尼（Bonferroni）校正**（$m$ 个比较各在 $\alpha/m$ 下检验）是最简单的补救。严重偏离正态的数据——罕见错误的计数、长尾的任务时间——常在取对数的尺度上分析，或用非参数检验，如威尔科克森（Wilcoxon）符号秩检验（配对）或曼–惠特尼（Mann–Whitney）检验（独立）。**李克特（Likert）**条目的评分是序数的，其分析方法有争议；Maurits Kaptein、Clifford Nass 与 Panos Markopoulos（CHI 2010）主张采用与设计相适应的非参数方法。系统讨论见 Lazar、Feng 与 Hochheiser 的 *Research Methods in Human–Computer Interaction* 和 MacKenzie 的 *Human–Computer Interaction: An Empirical Research Perspective*。更深的问题是重复验证：Kasper Hornbæk 及其合作者（"Is once enough?"，CHI 2014）发现，他们考察的 HCI 研究中只有很小比例是对先前工作的重复，于是一众已发表的结果都建立在单个小型研究之上。

::: quiz
一项研究用 16 名参与者的被试内设计比较两个菜单设计，报告称"设计 B 更快（Welch's $t(29.8) = 1.6$，$p = 0.12$），所以没有差别"。审稿人应当要求什么？（多选。）
- [x] 配对分析，因为每名参与者都用了两个设计。
- [x] 均值差及其置信区间，而不是"没有差别"的断语。
- [x] 两个设计的呈现顺序如何平衡的信息。
- [ ] 更高的显著性水平，例如 0.10，好让结果变得显著。
::: solution
Welch 检验丢掉了配对及其灵敏度（[[#prop-paired-variance]]）；不显著的结果不是没有差别的证据，置信区间才能显示哪些效应仍然可信；而没有顺序平衡，顺序效应既可能掩盖也可能制造差别（[[#alg-balanced-latin]]）。看过数据之后再改 $\alpha$ 就是 $p$ 曲线操纵。
:::
:::

## 在线受控实验

网站与应用公司每年运行数以千计的实验，把线上流量在**对照组**与一个或多个**处理组**之间随机分配。Ron Kohavi、Diane Tang 与 Ya Xu 的 *Trustworthy Online Controlled Experiments*（2020）是标准的实务参考。

::: definition A/B 测试 {#def-ab-test}
**A/B 测试**（在线受控实验）把每个**单元**——通常是一个用户，以 cookie 或账户识别——随机指派到一个版本，并在实验期间保持一致地维持这一指派；在各版本之间比较事先指定的**总体评估准则**（overall evaluation criterion，OEC），例如转化率或人均会话数，同时监控绝不能变差的**护栏指标**（时延、错误率、退订率）。
:::

把大量用户随机分配，使 A/B 测试拥有很高的内部效度：OEC 上超出偶然的任何差别都归因于这项改动。但所追求的效应往往极小，样本量因此极其庞大。

::: example 换算一个转化测试的规模 {#ex-ab}
某收银页对 5.0% 的访客实现转化。若一次改版能把转化率提到 5.5%（相对提升 10%），就值得部署。要在 $\alpha = 0.05$ 下达到 80% 的功效，每个版本需要多少用户？另外：实验平台按 50/50 配置分流，实际却给了处理组 50,600 名用户、对照组 49,400 名。结果可信吗？还有，若反复检查、直到第一次出现 $p < 0.05$ 就停，一个 A/A 测试（真实无差别）有多大概率看起来"显著"？
::: solution
对比例，[[#eq-power]] 的对应形式使用二项方差：$n = \bigl(z_{1-\alpha/2}\sqrt{2\bar p(1-\bar p)} + z_{1-\beta}\sqrt{p_1(1-p_1) + p_2(1-p_2)}\bigr)^2/(p_2 - p_1)^2$。**样本比例失配**（sample ratio mismatch，SRM）用卡方拟合优度检验对照配置的分流比检查。窥视的问题我们用模拟来回答。

```python
from math import sqrt, erfc, ceil
import random

def norm_two_sided_p(z):
    return erfc(abs(z) / sqrt(2))

# Sample size per arm to detect 5.0% -> 5.5% with alpha = 0.05 (two-sided), power 0.8.
p1, p2 = 0.050, 0.055
za, zb = 1.959964, 0.841621
pbar = (p1 + p2) / 2
n = (za * sqrt(2 * pbar * (1 - pbar)) + zb * sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / (p2 - p1) ** 2
print(f"users per arm: {ceil(n)}")

# Sample ratio mismatch: a 50/50 split delivered 50,600 vs 49,400 users.
a, b = 50_600, 49_400
e = (a + b) / 2
chi2 = (a - e) ** 2 / e + (b - e) ** 2 / e
print(f"SRM chi-square = {chi2:.1f}, p = {erfc(sqrt(chi2 / 2)):.2g}")

# Peeking: an A/A test (no true difference) checked after every 200 users per arm.
rng = random.Random(1)
def aa_test(p=0.05, step=200, looks=50, peek=True):
    xa = xb = n = 0
    for _ in range(looks):
        xa += sum(rng.random() < p for _ in range(step))
        xb += sum(rng.random() < p for _ in range(step))
        n += step
        if peek or n == step * looks:
            pa, pb = xa / n, xb / n
            pp = (xa + xb) / (2 * n)
            z = (pa - pb) / sqrt(pp * (1 - pp) * 2 / n)
            if norm_two_sided_p(z) < 0.05:
                return True          # declared a "significant" difference
    return False
runs = 1000
print(f"false positives, one look at the end: {sum(aa_test(peek=False) for _ in range(runs)) / runs:.3f}")
print(f"false positives, stop at first p<0.05: {sum(aa_test(peek=True) for _ in range(runs)) / runs:.3f}")
```

```console
$ python3 ab.py
users per arm: 31234
SRM chi-square = 14.4, p = 0.00015
false positives, one look at the end: 0.053
false positives, stop at first p<0.05: 0.310
```

检测 5% 转化率上 0.5 个百分点的变化，大约需要**每个版本 31,000 名用户**——这种数字只有大型服务才拿得出，这正是小站点无法对微小改动做有意义的 A/B 测试的原因。50,600 对 49,400 的分流，在真实 50/50 指派之下几乎不可能出现（$\chi^2 = 14.4$，自由度 1，$p \approx 0.00015$）：有某种东西——丢掉一部分用户的重定向、爬虫过滤、某个版本中的崩溃——在非随机地移除用户，比较的双方便不再等价。Kohavi 及其合作者建议：出现 SRM 时，在查明原因之前不要相信任何结果。最后，检查 50 次并在第一个 $p < 0.05$ 处叫停，会让 A/A 测试有 31% 的概率被判"显著"而非 5%：反复检验给了偶然很多次机会。样本量应事先固定，或使用为持续监控设计的方法（序贯检验、始终有效的 $p$ 值）。
:::
:::

其他记录充分的陷阱：**新奇与惯性效应**（用户点击改动过的按钮是因为它新奇，或因为它陌生而抗拒它，于是短实验会误判长期效应）；单元之间的**干扰**（社交网络或双边市场中，对一个用户的处理会影响到其他用户，破坏统计所假设的独立性）；**指标选择**（优化点击可能损害满意度或长期留存，所以 OEC 必须反映长期价值）；以及**特怀曼定律**（Twyman's law）——任何看起来有意思或与众不同的数字通常是错的——Kohavi 及其合作者据此主张，令人惊讶的结果应先当 bug 排查，再开庆祝会。

A/B 测试是对人做的实验，研究伦理适用。2014 年，Adam Kramer、Jamie Guillory 与 Jeffrey Hancock 在 *PNAS* 发表了一项研究：Facebook 把约 689,000 名用户信息流中正面或负面帖子的比例作了调整，持续一周，并测量这些用户发帖的情绪色彩。效应量非常小，但这篇论文引发了广泛的批评，因为用户在平台服务条款之外并未给出知情同意，期刊也发表了编辑关切声明。这一事件促使许多组织为实验设立审查流程，把常规产品测试与可能损害用户福祉的操纵区分开来——这正是 [[hci/accessibility-ethics]] 的主题。

::: history
罗纳德·费希尔（Fisher）的 *The Design of Experiments*（1935）把随机化、重复与区组确立为实验科学的基础；戈塞特（Gosset）（"Student"）已于 1908 年发表了 $t$ 分布，韦尔奇（Welch）则于 1947 年提出了他的不等方差检验。埃文·威廉姆斯（Williams）于 1949 年构造了平衡拉丁方。实验心理学把这些方法带入人因领域，Card、English 与 Burr 1978 年对指点设备的比较是 HCI 中早期的受控实验。雅各布·科恩的 *Statistical Power Analysis for the Behavioral Sciences*（1969，第 2 版 1988）让功效与效应量成为标准做法。在线受控实验在 2000 年代于网络公司发展起来；Kohavi 及其合作者的 "Practical guide to controlled experiments on the web"（KDD 2007）与 *Trustworthy Online Controlled Experiments*（2020）总结了这一实践，而 2010 年代心理学的可重复性危机推动 HCI 走向预注册、效应量与开放数据。
:::

## 后续内容

实验检验 [[hci/human-factors]] 与 [[hci/interaction-techniques]] 的预测，以及 [[hci/usability-evaluation]] 的总结性论断。它们的伦理——同意、伤害与大规模操纵——在 [[hci/accessibility-ethics]] 中继续。本章每个检验背后的概率在 Maths Atlas 中展开（[假设检验](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing)），机器学习系统的评估及其引出的相关问题则在 [LLM 图谱](/learn/llm/)。

::: summary
- 实验**操纵自变量**、**测量因变量**，并以随机指派与控制打断**混淆**（[[#def-variables]]）。
- **被试内**设计把比较的方差缩小到 $1 - \rho$ 倍（[[#prop-paired-variance]]），代价是顺序效应；**被试间**设计避免顺序效应，但需要多得多的参与者（[[#def-designs]]）。
- 用**平衡拉丁方**作顺序平衡（[[#alg-balanced-latin]]）：每个条件在每个位置恰好出现一次，且恰好各跟在每个其他条件之后一次（[[#prop-williams]]）。
- 检验要与设计匹配：被试内用**配对 $t$ 检验**，被试间用 **Welch $t$ 检验**（[[#def-t-tests]]）；把配对数据当作独立数据分析，能让 $p \approx 10^{-5}$ 变成 $p = 0.21$（[[#ex-ttest]]）。
- 报告效应量并附上置信区间；按功效规划样本量（[[#prop-power]]）：$d = 0.5$ 约需每组 63 人，配对则约 32 人。
- 不显著不是无效应的证据；$p$ 曲线操纵与多重比较会抬高假阳性。
- **A/B 测试**（[[#def-ab-test]]）检测小效应需要大样本，需要检查**样本比例失配**，需要固定的观测时点而非**窥视**（[[#ex-ab]] 中 31% 的假阳性），需要留意新奇效应与干扰，还需要伦理审查。
:::

## 习题

::: exercise 辨认变量 {level=1}
一项研究请 20 名参与者在平板上用两种键盘布局录入文本，顺序经过平衡，测量每分钟词数与错误率，录入的短语相同，使用的平板也相同。说出自变量及其水平、因变量、两个控制变量以及设计类型。
::: solution
自变量：键盘布局，两个水平。因变量：录入速率（wpm）与错误率（[[hci/interaction-techniques#def-text-entry]]）。控制变量：短语、平板（屏幕尺寸、灵敏度）、姿势与指导语。设计：被试内（[[#def-designs]]），经过顺序平衡——一半参与者先用布局 A。
:::
:::

::: exercise 配对统计量 {level=1 check="4"}
九名参与者在两个条件下的差的均值为 2，标准差为 1.5。配对 $t$ 统计量是多少？（输入数值。）
::: solution
由 [[#eq-paired-t]]，$t = 2/(1.5/\sqrt 9) = 2/0.5 = 4$，自由度为 8。
:::
:::

::: exercise 方差缩减 {level=1 check="0.2"}
两个条件方差相等，参与者在这两个条件下的得分相关为 0.8。与每组人数相同的被试间设计相比，被试内设计把估计差的方差乘上的因子是多少？（输入该因子。）
::: solution
由 [[#prop-paired-variance]]，$1 - \rho = 0.2$。同样的精度下，被试内设计每组只需约五分之一的参与者。
:::
:::

::: exercise 中等效应所需人数 {level=2 check="63"}
在 [[#eq-power]] 中取 $z_{0.975} = 1.960$ 与 $z_{0.8} = 0.8416$，被试间设计中要以 80% 的功效检测 $d = 0.5$，每组需要多少名参与者？（输入最小整数。）
::: solution
$n = 2(1.960 + 0.8416)^2/0.5^2 = 2 \times 7.849/0.25 \approx 62.8$，故每组 63 人。（用精确的 $t$ 分布计算得 64 人。）
:::
:::

::: exercise 样本比例失配 {level=2}
一个本应按 50/50 分流用户的实验记录了对照组 10,120 人、处理组 9,880 人。计算卡方统计量及其 $p$ 值（自由度 1 时 $p = \operatorname{erfc}(\sqrt{\chi^2/2})$），并判断是否存在失配。若*比例*相同的失配出现在十倍的用户规模上，是更值得担心还是更不值得担心？
::: solution
每组期望 10,000 人；$\chi^2 = 2 \times 120^2/10{,}000 = 2.88$，$p = \operatorname{erfc}(\sqrt{1.44}) = \operatorname{erfc}(1.2) \approx 0.090$。这不构成失配的强证据（Kohavi 及其合作者建议把 SRM 报警阈值定在 $p < 0.001$ 一类的水准，因为这个检查对每个实验都在运行）。用户十倍而分流仍为 50.6/49.4 时，$\chi^2 = 28.8$，$p \approx 8 \times 10^{-8}$：明显失配。同样的比例偏差在更大的样本中显著得多，因为偶然的偏差按 $1/\sqrt n$ 收缩——对照 [[#ex-ab]]。
:::
:::

::: exercise 被试间分析 {level=2}
十名参与者使用设计 A，另外十名使用设计 B。任务时间（秒）为 A：41, 38, 52, 45, 47, 39, 44, 50, 43, 46，B：36, 40, 35, 42, 38, 33, 41, 39, 37, 44。用 [[#ex-ttest]] 的代码计算 Welch 的 $t$、它的自由度与双侧 $p$ 值，并按报告的写法陈述结果。
::: solution
```python
from statistics import mean, stdev
from math import sqrt
# paste betainc and t_p from the example above here
A = [41, 38, 52, 45, 47, 39, 44, 50, 43, 46]
B = [36, 40, 35, 42, 38, 33, 41, 39, 37, 44]
v1, v2 = stdev(A) ** 2 / len(A), stdev(B) ** 2 / len(B)
t = (mean(A) - mean(B)) / sqrt(v1 + v2)
df = (v1 + v2) ** 2 / (v1 ** 2 / (len(A) - 1) + v2 ** 2 / (len(B) - 1))
print(mean(A), mean(B), round(t, 3), round(df, 1), f"{t_p(t, df):.2g}")
```

```console
$ python3 welch.py
44.5 38.5 3.372 16.7 0.0037
```

报告可写作："使用设计 B 的参与者完成任务更快（均值 38.5 秒），快于使用设计 A 的参与者（44.5 秒），差为 6.0 秒；Welch's $t(16.7) = 3.37$，$p = 0.004$。"还应加上差的置信区间与效应量（$d \approx 6.0/\text{合并标准差}$；合并标准差约 4.0 秒，故 $d \approx 1.5$），并说明每组仅 10 人时差的估计相当粗糙。
:::
:::

::: exercise 条件数为奇数 {level=3}
证明 $k = 3$ 时不存在对紧邻前件平衡的 $3 \times 3$ 拉丁方（每个有序对恰好相邻一次），并验证 $k$ 为奇数时的 Williams 构造——[[#alg-balanced-latin]] 的方阵连同每行反转——在 $2k$ 行上平衡了相邻性。用程序对 $k = 3$ 与 $k = 5$ 检验你的论证。
::: solution
任何 $k \times k$ 拉丁方的每行有 $k - 1$ 对相邻元素，共 $k(k-1)$ 对——恰为不同条件有序对的数目——平衡即每个有序对恰好出现一次。$k = 3$ 时，下面的程序枚举全部 12 个三阶拉丁方，没有一个平衡；例如 $ABC, BCA, CAB$ 中 $A \to B$ 出现在第 1 行和第 3 行。像 Williams 那样每行都是第一行加常数的构造，对*每个*奇数 $k$ 都会失败：它们要求第一行相邻元素之差 $\delta_j$ 取遍全部 $k - 1$ 个非零剩余类，但这些差之和等于（末元素 $-$ 首元素），而 $k$ 为奇数时非零剩余类之和为 $k(k-1)/2 \equiv 0 \pmod k$，这将迫使行的首末元素相等。（某些更大的奇数阶存在平衡方阵，但没有简单的通用构造。）把每行反转，就把每条相邻 $a \to b$ 变成 $b \to a$，于是循环方阵加上它的反转所含每个有序对的次数，恰等于循环方阵以任一方向含它的次数；程序验证这个次数恰好是两倍。

```python
from itertools import permutations

def williams(k):
    first, lo, hi = [0], 1, k - 1
    while len(first) < k:
        first.append(lo); lo += 1
        if len(first) < k:
            first.append(hi); hi -= 1
    rows = [[(x + r) % k for x in first] for r in range(k)]
    return rows if k % 2 == 0 else rows + [row[::-1] for row in rows]

def pair_counts(rows):
    counts = {}
    for row in rows:
        for a, b in zip(row, row[1:]):
            counts[(a, b)] = counts.get((a, b), 0) + 1
    return sorted(set(counts.values())), len(counts)

# all 3x3 Latin squares: no balanced one exists
latin3 = [rows for rows in permutations(permutations(range(3)), 3)
          if all(len({r[j] for r in rows}) == 3 for j in range(3))]
print(len(latin3), any(pair_counts(r) == ([1], 6) for r in latin3))
print(pair_counts(williams(3)), pair_counts(williams(5)))
```

```console
$ python3 odd.py
12 False
([2], 6) ([2], 20)
```

三阶拉丁方共 12 个，没有一个平衡。加上反转的行之后，$k(k-1)$ 个有序对中的每一个在 $2k$ 行中都恰好相邻**两次**——恰如要求的平衡——$k = 3$ 与 $k = 5$ 皆然。因此 $k$ 为奇数时，参与者须按 $2k$ 的倍数分组指派。
:::
:::

::: exercise 带校正的窥视 {level=3}
修改 [[#ex-ab]] 的 A/A 模拟：50 次检查时，仅当某次检查有 $p < 0.05/50$ 才拒绝（对检查次数作邦费罗尼校正）。估计假阳性率，并以每版本 10,000 名用户估计检测 5.0% 对 6.0% 的功效，与最后单次检查、$p < 0.05$ 的情形比较。这个结果对"用邦费罗尼校正治疗窥视"说明了什么？
::: solution
```python
from math import sqrt, erfc
import random

rng = random.Random(7)
def run(pa, pb, threshold, step=200, looks=50, peek=True):
    xa = xb = n = 0
    for _ in range(looks):
        xa += sum(rng.random() < pa for _ in range(step))
        xb += sum(rng.random() < pb for _ in range(step))
        n += step
        if peek or n == step * looks:
            pp = (xa + xb) / (2 * n)
            z = (xa / n - xb / n) / sqrt(pp * (1 - pp) * 2 / n)
            if erfc(abs(z) / sqrt(2)) < threshold:
                return True
    return False

R = 500
for name, th, peek in [("single look, 0.05", 0.05, False), ("50 looks, 0.05/50", 0.05 / 50, True)]:
    fp = sum(run(0.05, 0.05, th, peek=peek) for _ in range(R)) / R
    power = sum(run(0.05, 0.06, th, peek=peek) for _ in range(R)) / R
    print(f"{name:18}: false positives {fp:.3f}, power {power:.3f}")
```

```console
$ python3 peek.py
single look, 0.05 : false positives 0.038, power 0.862
50 looks, 0.05/50 : false positives 0.004, power 0.526
```

邦费罗尼控制了假阳性率——甚至控制得*过头*了，约 0.4% 而非 5%，因为对不断累积的数据做的 50 次检验高度相关——并且损失了大量功效（53% 对 86%；500 次模拟下每个估计的标准误约 2 个百分点，单次检查的假阳性率之所以出来是 3.8% 而非正好 5%，也是这个缘故）。它是有效但浪费的补救。成组序贯设计（O'Brien–Fleming 边界）与始终有效推断能把错误概率在各次检查之间高效地分配，在允许提前停止的同时保住单次检验的大部分功效；实验平台用的正是这些方法。（换一个随机种子，模拟结果会略有出入。）
:::
:::
