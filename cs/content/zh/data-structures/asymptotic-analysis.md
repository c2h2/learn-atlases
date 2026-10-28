假设有两个程序回答同一个问题——“这个数表中是否包含相加得零的两个值？”——在一张含一千个数的表上，两者都转瞬给出答复。哪个更好？把它们放到一百万个数上运行，差别就显现出来：一个不到一秒就算完，另一个却几乎耗掉一个小时。两个程序本身没有任何改变，改变的只是输入的大小。把二者区分开来的是运行时间随输入增长而*增长*的方式。

本章建立计算机科学家讨论这种增长所使用的语言。我们先确定应当数什么——**代价模型**——并学会对循环与嵌套循环进行计数；然后借助记号 $O$、$\Omega$ 与 $\Theta$，抛掉依赖机器的细节，只保留增长的形状；最后区分最坏情况、最好情况与平均情况，并考察实测运行时间同这套数学的关系。本课程后面每一章都会用这套语言陈述每个操作的代价，所以值得认真学好它。

## 操作计数

一个程序以秒计的运行时间取决于处理器、编译器或解释器、存储系统，以及机器上还在运行的别的东西。这些细节每年都在变；我们要的是不随它们改变的陈述。因此我们不去测量秒，而是数**基本操作**的个数，并假定每个操作花费固定时间。

::: definition RAM 代价模型 {#def-ram}
在**随机存取机（RAM）模型**中，内存是一个由存储单元组成的数组，每个单元存放一个机器字（一个 $O(\log n)$ 位的整数、一个引用或一个浮点数），且下列每个操作各花费一个单位时间：对字进行的一次算术或逻辑运算、一次比较、按给定地址读或写一个存储单元、对变量赋值、一次跳转、以及一次函数调用或从函数返回。算法在一个输入上的**代价**是它执行的单位操作数。**输入规模** $n$ 是事先确定的对输入的一种度量——通常取个数（表元素、字符、顶点）。
:::

这个定义里有两点比表面上重要。第一，*按给定地址读任何单元的花费相同*：`a[0]` 与 `a[999999]` 一样便宜。这就是“随机存取”的含义，对真实内存来说也大致成立（关于高速缓存的注意事项见 [[data-structures/arrays-lists]]）。第二，字长有界，于是两个 64 位整数相加是一步，而两个一百万位的数相加不是。Python 把第二点藏了起来——它的整数可以无限增大——所以当 Python 程序对巨大的数做算术时，单位代价假设不再成立，我们必须改数位上的操作。

实践中我们几乎不去数*每一个*操作。我们挑一个被执行次数（在常数因子意义下）不少于任何其他操作的操作——一次比较、一次内层循环迭代、一次对表的探查——然后数它。总代价与这个计数至多差一个常数因子，而（正如我们将看到的）这正是我们所保留的全部精度。

::: example 统计双重循环中的比较次数 {#ex-pairs}
对一个长度为 $n$ 的表，下面这个函数把测试 `a[i] + a[j] == 0` 求值多少次？

```python
def count_pairs(a):
    """Number of pairs i < j with a[i] + a[j] == 0, and the number of comparisons made."""
    n = len(a)
    found = comparisons = 0
    for i in range(n):
        for j in range(i + 1, n):
            comparisons += 1
            if a[i] + a[j] == 0:
                found += 1
    return found, comparisons

for n in [10, 100, 1000]:
    a = list(range(-n // 2, n - n // 2))   # 0 附近的 n 个互异整数
    print(n, count_pairs(a))
```
::: solution
固定 $i$ 时，内层循环取 $j = i+1, \dots, n-1$，即运行 $n - 1 - i$ 次。对 $i = 0, \dots, n-1$ 求和，

$$
\sum_{i=0}^{n-1} (n-1-i) = (n-1) + (n-2) + \dots + 1 + 0 = \frac{n(n-1)}{2}.
$$

$n = 10, 100, 1000$ 时，上式分别为 $45$、$4950$ 和 $499\,500$，正是程序报告的结果：

```console
$ python3 pairs.py
10 (4, 45)
100 (49, 4950)
1000 (499, 499500)
```

内层循环里的每条其他语句运行同样多次，而它外面的语句运行 $O(n)$ 次，所以单位操作总数形如 $c_1 n^2 + c_2 n + c_3$，其中常数依赖于解释器——但它的*形状*由 $n(n-1)/2$ 次比较确定。
:::
:::

这个计数不依赖表中的值，只依赖表的长度。这并不常见；大多数算法在同样规模的不同输入上做的工作量不同，我们在 [[#sec-cases]] 再回到这一点。

### 循环中的模式

本课程中的多数程序都可以用寥寥几种循环形状覆盖。记 $T(n)$ 为最内层循环体的执行次数。

| 循环形状 | 循环体执行次数 | 增长 |
|---|---|---|
| `for i in range(n)` | $n$ | 线性 |
| `for i in range(n): for j in range(n)` | $n^2$ | 二次 |
| `for i in range(n): for j in range(i)` | $n(n-1)/2$ | 二次 |
| `i = 1; while i < n: i *= 2` | $\lceil \log_2 n\rceil$（$n \ge 1$ 时） | 对数 |
| `for i in range(1, n+1): j = i; while j <= n: j += i` | $\sum_{i=1}^n \lfloor n/i\rfloor$ | $n \log n$ |

倍增循环值得多说一句：$k$ 次迭代后 $i = 2^k$，循环在使 $2^k \ge n$ 的第一个 $k$ 处停止，即 $k = \lceil \log_2 n\rceil$。任何把循环控制变量乘以或除以常数因子的循环都只运行对数次。最后一行的分析见 [[#ex-harmonic]]。

## 增长率

一旦有了 $n(n-1)/2$ 或 $3n\log n + 20n$ 这样的计数，我们就想把它与其他计数比较。$n$ 小时，比较结果可以任意；$n$ 大时，增长最快的项支配其他一切。下图把常见的增长率画在一起。

::: widget plot
f: log2(x); x; x*log2(x); x^2; 2^x
labels: \log_2 n; n; n\log_2 n; n^2; 2^n
x: 1, 32
y: 0, 200
caption: $n$ 从 $1$ 到 $32$ 的常见增长率。$n = 32$ 时，$2^n$ 已经冲出画面（超过四十亿），而 $\log_2 n$ 才 $5$。把视野在脑中放大：$n = 10^6$ 时 $n\log_2 n \approx 2\times10^7$，而 $n^2 = 10^{12}$——工作量多出一百万倍。
:::

用一张表可以把这一点说得更明白。设一台机器每秒执行 $10^9$ 次简单操作（对 2026 年的单个处理器核心来说是正确的数量级），并设某算法恰好执行 $f(n)$ 次这样的操作。

| $f(n)$ | $n = 10^3$ | $n = 10^6$ | $n = 10^9$ |
|---|---|---|---|
| $\log_2 n$ | 10 ns | 20 ns | 30 ns |
| $n$ | 1 µs | 1 ms | 1 s |
| $n \log_2 n$ | 10 µs | 20 ms | 30 s |
| $n^2$ | 1 ms | 17 分钟 | 32 年 |
| $2^n$ | $3\times10^{284}$ 年 | — | — |

由此可得两点教训。其一，面对更坏的增长率，更快的机器帮助甚微：机器快 $1000$ 倍，同一时间内平方算法能处理的输入也只大 $\sqrt{1000} \approx 32$ 倍。其二，指数算法只要输入稍大便毫无希望，硬件再快也无济于事。

## O、Ω 与 Θ

现在把“增长不超过一样快”精确化。本节所有函数都把正整数映到非负实数（最终为正），运行时间就是如此。

::: definition 渐近记号 {#def-asymptotic}
设 $f, g\colon \N \to \R_{\ge 0}$。

- 若存在常数 $c > 0$ 与 $n_0$，使得对所有 $n \ge n_0$ 都有 $f(n) \le c\,g(n)$，则 $f(n) = O(g(n))$（“$f$ 是 $g$ 的**大 O**”）。
- 若存在常数 $c > 0$ 与 $n_0$，使得对所有 $n \ge n_0$ 都有 $f(n) \ge c\,g(n)$，则 $f(n) = \Omega(g(n))$（“$f$ 是 $g$ 的**大 Omega**”）。
- 若 $f(n) = O(g(n))$ 且 $f(n) = \Omega(g(n))$，则 $f(n) = \Theta(g(n))$（“$f$ 是 $g$ 的**大 Theta**”）；即存在 $c_1, c_2 > 0$ 与 $n_0$，使得 $c_1 g(n) \le f(n) \le c_2 g(n)$ 对所有 $n \ge n_0$ 成立。
- 若 $n \to \infty$ 时 $f(n)/g(n) \to 0$，则 $f(n) = o(g(n))$（“小 o”）。
:::

于是 $O$ 是渐近意义下的“$\le$”，$\Omega$ 是渐近意义下的“$\ge$”，$\Theta$ 是渐近意义下的“$=$”，$o$ 是渐近意义下的“$<$”——各自至差一个常数因子，且忽略有限多个较小的 $n$。常数 $c$ 吸收了一次操作依赖于机器的代价；$n_0$ 让我们得以忽略小输入上的启动效应。

$f(n) = O(g(n))$ 中的“$=$”是一个传统的记号滥用：它的意思是“$f$ 属于以 $g$ 的常数倍为上界的函数集 $O(g)$”，而且是单向的。我们写 $n = O(n^2)$，但从不写 $O(n^2) = n$。

::: example 依定义处理一个多项式 {#ex-poly}
证明 $f(n) = 3n^2 + 5n + 2$ 是 $\Theta(n^2)$。
::: solution
**上界。**$n \ge 1$ 时 $n \le n^2$ 且 $1 \le n^2$，于是

$$
3n^2 + 5n + 2 \le 3n^2 + 5n^2 + 2n^2 = 10n^2.
$$

故对所有 $n \ge 1$ 有 $f(n) \le 10n^2$：取 $c = 10$、$n_0 = 1$。

**下界。**各项非负，故对一切 $n \ge 0$ 有 $f(n) \ge 3n^2$：取 $c = 3$、$n_0 = 0$。

合起来，$n \ge 1$ 时 $3n^2 \le f(n) \le 10n^2$，所以 $f(n) = \Theta(n^2)$。这些常数并不唯一——$n \ge 6$ 之后 $c_2 = 4$ 也行，因为 $n \ge 6$ 时 $5n + 2 \le n^2$——而选哪一组无关紧要，要紧的只是它们存在。
:::
:::

每次都回到定义逐个验证太繁琐。下面的事实能完成大部分工作。

::: theorem 渐近记号的运算规则 {#thm-rules}
设 $f, g, h$ 为最终为正的函数。

1. （**常数**）对任意常数 $a > 0$，$a f(n) = \Theta(f(n))$。
2. （**和**）$f(n) + g(n) = \Theta(\max(f(n), g(n)))$。
3. （**传递性**）若 $f = O(g)$ 且 $g = O(h)$，则 $f = O(h)$；$\Omega$ 与 $\Theta$ 同理。
4. （**乘积**）若 $f_1 = O(g_1)$ 且 $f_2 = O(g_2)$，则 $f_1 f_2 = O(g_1 g_2)$。
5. （**极限**）若 $\lim_{n\to\infty} f(n)/g(n) = L$ 存在，则 $L = 0$ 蕴含 $f = o(g)$ 从而 $f = O(g)$；$0 < L < \infty$ 蕴含 $f = \Theta(g)$；而 $L = \infty$ 蕴含 $f = \Omega(g)$ 但 $f \ne O(g)$。
:::

::: proof
(1) 取 $c_1 = c_2 = a$。

(2) 记 $m(n) = \max(f(n), g(n))$。由于两个函数都非负，$m(n) \le f(n) + g(n) \le 2m(n)$。

(3) 若 $n \ge n_0$ 时 $f(n) \le c\,g(n)$，且 $n \ge n_0'$ 时 $g(n) \le c' h(n)$，则 $n \ge \max(n_0, n_0')$ 时 $f(n) \le cc'\,h(n)$。$\Omega$ 的情形把不等号全部反向即可，$\Theta$ 则合并两者。

(4) 把对大 $n$ 成立、两边非负的不等式 $f_1(n) \le c_1 g_1(n)$ 与 $f_2(n) \le c_2 g_2(n)$ 相乘。

(5) 若 $f/g \to L$ 且 $0 < L < \infty$，则大 $n$ 时比值介于 $L/2$ 与 $2L$ 之间（在极限定义中取 $\eps = L/2$），于是 $\tfrac{L}{2}g(n) \le f(n) \le 2L\,g(n)$。若 $L = 0$，比值最终小于任何 $c > 0$，故 $f = O(g)$。若 $L = \infty$，比值最终大于 $1$，故 $f = \Omega(g)$；而且对每个 $c$ 比值最终都超过 $c$，所以没有任何 $c$ 能使 $f \le c\,g$。
:::

由规则 2，一个和由最大项支配；由规则 1，常数因子消失。于是任何满足 $a_k > 0$ 的多项式 $a_k n^k + \dots + a_1 n + a_0$ 都是 $\Theta(n^k)$，从规则 5 也能看出这一点：它与 $n^k$ 之比趋于 $a_k$。

极限规则配上洛必达（L'Hôpital）法则或[微积分](/learn/maths/lesson.php?c=calculus-1&l=limits)中的已知极限，把常见函数排进一个严格的层级。对任意常数 $\eps > 0$、$k \ge 1$ 与 $b > 1$，

$$
1 \;\prec\; \log n \;\prec\; n^{\eps} \;\prec\; n \;\prec\; n \log n \;\prec\; n^k \;\prec\; b^n \;\prec\; n!,
$$ {#eq-hierarchy}

其中 $f \prec g$ 表示 $f = o(g)$。用语言叙述：$n$ 的任何幂次，无论多小，最终都胜过任何对数；任何指数都胜过任何多项式。

::: proposition 对数的底无关紧要 {#prop-logbase}
对常数 $a, b > 1$，$\log_a n = \Theta(\log_b n)$。
:::

::: proof
由换底公式，$\log_a n = \log_b n / \log_b a$，而 $1/\log_b a$ 是正常数。套用 [[#thm-rules]] 的规则 1。
:::

这就是我们写 $O(\log n)$ 而不注明底数的原因。指数函数则*不是*如此：$4^n = (2^n)^2$，且 $4^n / 2^n = 2^n \to \infty$，所以 $4^n$ 不是 $O(2^n)$。指数上的常数是要紧的。

::: warning O 是上界，不是描述
“归并排序是 $O(n^2)$”是一句真话——它的代价是 $\Theta(n\log n)$，当然不超过 $n^2$ 的常数倍——却毫无用处。当你想表达代价的增长*恰好*与 $g$ 同阶（不计常数）时，请说 $\Theta(g)$。许多教材和多数程序员在想说 $\Theta$ 时写 $O$；除非上下文表明界是紧的，否则把他们的陈述读成上界。还要记住 $\Theta$ 界隐藏了常数：代价为 $1000n$ 的算法是 $\Theta(n)$，但只在 $n > 1000$ 时才胜过代价为 $n^2$ 的算法。
:::

::: quiz
下列命题哪些为真？（多选。）
- [x] $2^{n+1} = O(2^n)$
- [ ] $2^{2n} = O(2^n)$
- [x] $\log(n^3) = \Theta(\log n)$
- [x] $n \log n = o(n^{1.5})$
::: solution
$2^{n+1} = 2\cdot 2^n$，是常数倍，所以是 $O(2^n)$。但 $2^{2n} = 4^n$，且 $4^n/2^n = 2^n \to \infty$，所以不是 $O(2^n)$。$\log(n^3) = 3\log n$，是 $\log n$ 的常数倍。最后 $n\log n / n^{1.5} = \log n / n^{0.5} \to 0$，因为 $n$ 的任何正幂都增长得比对数快（[[#eq-hierarchy]]）。
:::
:::

## 最坏、最好与平均情况 {#sec-cases}

大多数算法在同样规模的不同输入上做的工作量不同。在表中查找一个值时，一旦找到便立即停止，而它可能就在第一个位置，也可能在最后一个位置。因此对每个 $n$，我们定义

- **最坏情况代价** $T_{\max}(n)$：规模为 $n$ 的一切输入上的最大代价；
- **最好情况代价** $T_{\min}(n)$：最小值；
- **平均情况代价** $T_{\mathrm{avg}}(n)$：当规模为 $n$ 的输入按某个指明概率分布抽取时的期望代价。

本课程以最坏情况为默认：它是对一切输入都成立的保证，包括对手挑选的输入，并且不需要任何关于输入从何而来的假设。平均情况往往更有代表性，但它只与其分布假设一样可靠，而这个假设你必须永远写明。最好情况单独使用则很少有用。

不要把这三种情况与 $O$、$\Omega$、$\Theta$ 混为一谈：情况决定我们在描述*哪个函数*，记号描述*它的增长*。查找的最坏情况代价可以有 $\Theta$ 界，其最好情况代价也可以有。

::: example 线性查找 {#ex-linear}
线性查找依次扫描 `a[0], a[1], …`，直到找到 `x` 或到达表尾。数出最好、最坏、平均情况下的比较次数 `a[i] == x`，其中平均情况假定 `x` 在表中，且出现在 $n$ 个位置中每个位置的可能性相同。
::: solution
若 `x` 位于位置 $i$（从 $0$ 数起），查找做 $i + 1$ 次比较。最好情形是 $i = 0$：一次比较，$T_{\min}(n) = 1 = \Theta(1)$。最坏情形是 `x` 在最后一个位置或根本不在表中：$n$ 次比较，$T_{\max}(n) = n = \Theta(n)$。在均匀假设下每个位置的概率为 $1/n$，于是

$$
T_{\mathrm{avg}}(n) = \sum_{i=0}^{n-1} \frac1n (i+1) = \frac1n\cdot\frac{n(n+1)}{2} = \frac{n+1}{2} = \Theta(n).
$$

平均而言我们扫描大约半张表——仍是线性的。若改为 `x` 以概率 $1/2$ 不在表中（在表时位置仍均匀），期望次数将为 $\tfrac12 n + \tfrac12\cdot\tfrac{n+1}{2} = \tfrac{3n+1}{4}$：不同的分布给出不同的平均值，这正是假设必须写明的原因。
:::
:::

表有序时我们能做得好得多：与中间元素比较，每次舍弃剩余候选的一半。

::: algorithm 二分查找 {#alg-binary-search}
**输入：**按不减顺序排序的表 $a[0..n-1]$ 与一个值 $x$。**输出：**满足 $a[i] = x$ 的下标 $i$，若不存在则为 $-1$。

1. $lo \gets 0$，$hi \gets n - 1$。
2. 当 $lo \le hi$：
   1. $mid \gets \lfloor (lo + hi)/2 \rfloor$。
   2. 若 $a[mid] = x$，返回 $mid$。
   3. 若 $a[mid] < x$，置 $lo \gets mid + 1$；否则置 $hi \gets mid - 1$。
3. 返回 $-1$。
:::

这个循环维持着不变式（见 [[programming-1/control-flow]]）“若 $x$ 出现在 $a$ 中，则 $x$ 出现在 $a[lo..hi]$ 中”：初始时它说的是整张表，而每次更新只舍弃那些 $< x$（当 $a[mid] < x$ 时为 $mid$ 及其左侧的一切）或 $> x$（当 $a[mid] > x$ 时为 $mid$ 及其右侧的一切）的元素，这由有序性保证。当 $lo > hi$ 时区间为空，于是 $x$ 不在表中，返回 $-1$ 是正确的。剩下的就是代价。

::: theorem 二分查找只需对数时间 {#thm-binary-search}
对 $n \ge 1$ 个元素的有序表，二分查找的循环至多执行 $\lfloor \log_2 n\rfloor + 1$ 次迭代。其最坏情况代价为 $\Theta(\log n)$。
:::

::: proof
记 $s = hi - lo + 1$ 为一次迭代开始时候选元素的个数。元素 $a[mid]$ 把它们分成左边 $mid - lo = \lfloor (s-1)/2\rfloor$ 个、右边 $hi - mid = \lceil (s-1)/2 \rceil = \lfloor s/2\rfloor$ 个。若本次迭代没有返回，下一个区间就是这两部分之一，于是新的规模至多 $\lfloor s/2 \rfloor$。

从 $s_0 = n$ 出发，归纳可知第 $k+1$ 次迭代前的规模 $s_k \le \lfloor n/2^k \rfloor$（用到 $\lfloor \lfloor m/2\rfloor / 2\rfloor = \lfloor m/4 \rfloor$，依此类推）。只有 $s_k \ge 1$ 才有迭代，这要求 $n/2^k \ge 1$，即 $k \le \log_2 n$，又因 $k$ 是整数即 $k \le \lfloor\log_2 n\rfloor$。所以迭代至多出现在 $k = 0, 1, \dots, \lfloor \log_2 n\rfloor$：至多 $\lfloor \log_2 n\rfloor + 1$ 次。每次迭代花费 $O(1)$，故为 $O(\log n)$。

至于匹配的下界，去查找一个比所有元素都大的值。此时每次迭代都走右半部分，其规模恰为 $\lfloor s/2\rfloor$，于是 $s_k = \lfloor n/2^k\rfloor$ 精确成立，$\lfloor\log_2 n\rfloor + 1$ 次迭代全部发生。故最坏情况为 $\Theta(\log n)$。
:::

这个界跑一下程序、加个步数计数器就容易验证。$n \ge 1$ 时 $\lfloor\log_2 n\rfloor + 1$ 正是 $n$ 的二进制位数，Python 用 `n.bit_length()` 给出。

```python
def binary_search(a, x):
    """Index of x in the sorted list a, or -1; also the number of loop iterations."""
    lo, hi = 0, len(a) - 1
    steps = 0
    while lo <= hi:
        steps += 1
        mid = (lo + hi) // 2
        if a[mid] == x:
            return mid, steps
        elif a[mid] < x:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1, steps

for n in [10, 1000, 10**6]:
    a = list(range(0, 2 * n, 2))        # 偶数 0, 2, ..., 2n - 2
    print(n, binary_search(a, 2 * n), n.bit_length())   # 2n 比所有元素都大
```

```console
$ python3 bsearch.py
10 (-1, 4) 4
1000 (-1, 10) 10
1000000 (-1, 20) 20
```

一百万个元素只需二十次迭代，而线性查找最多要一百万次比较：这就是对数换来的好处。代价是表必须有序，而让数据在变化之中保持有序，正是搜索树（[[data-structures/binary-search-trees]]）所解决的问题。

::: example 调和和式的循环 {#ex-harmonic}
内层循环体执行多少次（作为 $n$ 的函数）？

```python
for i in range(1, n + 1):
    j = i
    while j <= n:       # 依次访问 i, 2i, 3i, ... 直到不超过 n
        j += i
```
::: solution
固定 $i$ 时，$j$ 依次取值 $i, 2i, \dots, \lfloor n/i \rfloor\, i$，循环体执行 $\lfloor n/i\rfloor$ 次。总数为

$$
T(n) = \sum_{i=1}^{n} \left\lfloor \frac{n}{i} \right\rfloor.
$$

由 $n/i - 1 < \lfloor n/i \rfloor \le n/i$，有 $nH_n - n < T(n) \le nH_n$，其中 $H_n = 1 + \tfrac12 + \dots + \tfrac1n$ 是第 $n$ 个**调和数**。把这个和与 $1/x$ 的积分比较可得 $\ln(n+1) \le H_n \le 1 + \ln n$。于是 $T(n) = \Theta(n \log n)$。$n = 10$ 时精确次数为 $10 + 5 + 3 + 2 + 2 + 1 + 1 + 1 + 1 + 1 = 27$。

这种循环形状——“对每个 $i$，做与 $n/i$ 成正比的工作”——正是埃拉托斯特尼筛法及许多数论算法达到 $n\log n$ 型界的方式。
:::
:::

::: quiz
某算法的最坏情况代价为 $\Theta(n^2)$，最好情况代价为 $\Theta(n)$。哪个陈述正确？
- [ ] 它在每个输入上的代价都是 $\Theta(n^2)$。
- [x] 它对每个规模为 $n$ 的输入的代价都是 $O(n^2)$ 且 $\Omega(n)$。
- [ ] 它的平均情况代价是 $\Theta(n^{1.5})$。
- [ ] 它在随机输入上的代价是 $\Theta(n)$。
::: solution
任何输入的代价都介于最好与最坏情况之间，所以不超过 $n^2$ 的常数倍，且不低于 $n$ 的常数倍。此外别无结论：平均情况依赖于输入分布，可以是中间的任何情形（例如对随机排列做插入排序，平均代价就是 $\Theta(n^2)$）。
:::
:::

## 测量运行时间

渐近分析预测运行时间的*形状*；它对常数一无所知。一个有用的习惯是用**倍增实验**检验预测：对 $n$、$2n$、$4n$、……运行程序，观察相邻时间的比值。$\Theta(n)$ 的程序时间应大约加倍，$\Theta(n^2)$ 的程序应大约变为四倍，$\Theta(n\log n)$ 的程序则比加倍稍多一点。

```python
import time

def quadratic(n):
    total = 0
    for i in range(n):
        for j in range(n):
            total += 1
    return total

prev = None
for n in [500, 1000, 2000, 4000]:
    start = time.perf_counter()
    quadratic(n)
    t = time.perf_counter() - start
    ratio = "" if prev is None else f"  ratio {t / prev:.1f}"
    print(f"n = {n:5d}  time {t:.3f} s{ratio}")
    prev = t
```

作者机器上的一次运行（CPython 3.14，2026 年）输出：

```console
$ python3 doubling.py
n =   500  time 0.008 s
n =  1000  time 0.036 s  ratio 4.5
n =  2000  time 0.145 s  ratio 4.0
n =  4000  time 0.614 s  ratio 4.2
```

这是观测，不是定理：你的时间会不同，比值还会因为计时器分辨率、缓存和其他程序而抖动。但比值稳定在 $4$ 附近，正是 $\Theta(n^2)$ 所预测的。若 $T(n) \approx c\,n^k$，则 $T(2n)/T(n) \approx 2^k$，于是指数可估计为 $k \approx \log_2(\text{比值})$。

::: warning 要测量，但要仔细测量
测量小输入，测到的多半是启动开销与噪声；每个测量重复若干次并取最小值或中位数（Python 的 `timeit` 模块就这样做）。要确保输入规模足够大，使首项占主导。还要记住硬件并不是 RAM 机：在大输入上，存储器高速缓存可能让渐近界更好的算法在实践中反而更慢，我们在 [[data-structures/arrays-lists]] 比较数组与链表时会看到这一点。
:::

## 空间

以上全部内容对内存同样适用。算法的**空间代价**是它同时占用的存储单元数的最大值，不含输入本身（即其**辅助空间**）。线性查找与二分查找使用 $O(1)$ 辅助空间——几个变量而已。一个复制其输入的函数使用 $\Theta(n)$。递归函数为调用栈上每个处于活动状态的调用保留空间，所以深度为 $d$ 的递归使用 $\Omega(d)$ 空间，即使每个调用只存几个变量——递归的二分查找使用 $\Theta(\log n)$ 空间，而上面的循环版本只用 $O(1)$。时间与空间常常相互交换：把预计算的答案存进表中，是花空间省时间，这一主题贯穿哈希表（[[data-structures/hash-tables]]）与动态规划（[[algorithms]]）。

::: history
符号 $O$ 由数论家 Paul Bachmann 在 *Die analytische Zahlentheorie*（1894）中引入，并经埃德蒙·兰道（Edmund Landau）1909 年关于素数分布的手册得到推广，该手册还引入了 $o$；数学家至今仍称它们为**兰道符号**。用渐近增长对算法分类，伴随着复杂性理论的创建而来：Juris Hartmanis 与 Richard Stearns 的“On the computational complexity of algorithms”（1965）把时间度量成输入长度的函数；高德纳（Knuth）则在《计算机程序设计艺术》（*The Art of Computer Programming*，第 1 卷，1968）中把算法分析变成一门独立的学科。高德纳的短文“Big Omicron and big Omega and big Theta”（*SIGACT News*，1976）确定了今天使用的 $\Omega$ 与 $\Theta$ 的含义。RAM 模型由 Stephen Cook 与 Robert Reckhow 在“Time bounded random access machines”（1973）中形式化。
:::

## 后续内容

本课程的每一章都用这套语言陈述其代价。[[data-structures/arrays-lists]] 增加另一类界——**摊还**代价：在一个操作序列上取平均，而不是在随机输入上取平均；[[data-structures/hash-tables]] 增加**期望**代价：在算法自身的随机选择上取平均。在 [[algorithms]] 中你会遇到描述递归算法的递归式，如 $T(n) = 2T(n/2) + n$，以及求解它们的**主定理**；还会遇到对某个问题的*一切*算法都成立的下界，例如比较排序的 $\Omega(n\log n)$ 界。求和与递归式的数学在 [Maths Atlas：递归式](/learn/maths/lesson.php?c=discrete&l=recurrences) 中展开。

::: summary
- 我们在 RAM 模型（[[#def-ram]]）中以单位操作计数来度量算法，通常通过数一种占主导的操作，把它写成输入规模 $n$ 的函数。
- $O$、$\Omega$、$\Theta$（[[#def-asymptotic]]）分别是渐近意义下的 $\le$、$\ge$、$=$，允许常数因子、只看大 $n$；$o$ 是严格的 $<$。
- 常数因子与低阶项消失：$k$ 次多项式是 $\Theta(n^k)$，对数的底无关紧要（[[#thm-rules]]、[[#prop-logbase]]）。
- 对数比任何幂次增长得慢，幂次比任何指数增长得慢（[[#eq-hierarchy]]）；更好的增长率胜过更快的机器。
- 最坏情况代价是对一切输入的保证；平均情况代价依赖于所声明的输入分布。
- 二分查找至多执行 $\lfloor\log_2 n\rfloor + 1$ 次迭代（[[#thm-binary-search]]）；对规模减半或倍增的循环运行 $\Theta(\log n)$ 次，调和型循环给出 $\Theta(n\log n)$。
- 倍增实验从经验上检验预测：对 $\Theta(n^k)$，时间比 $T(2n)/T(n)$ 趋于 $2^k$。
:::

## 习题

::: exercise 三重循环计数 {level=1 check="120"}
$n = 10$ 时最内层语句执行多少次？（填入数字。）

```python
for i in range(n):
    for j in range(i + 1, n):
        for k in range(j + 1, n):
            count += 1
```
::: solution
循环体对 $\{0, \dots, n-1\}$ 中每个满足 $i < j < k$ 的三元组执行一次，故次数为 $\binom{n}{3} = n(n-1)(n-2)/6$。$n = 10$ 时为 $10\cdot9\cdot8/6 = 120$。渐近地它是 $\Theta(n^3)$，首项常数 $1/6$。
:::
:::

::: exercise 增长率排序 {level=1}
按增长由慢到快排列：$n^2$、$2^{\log_2 n}$、$\sqrt n$、$n\log n$、$(\log n)^3$、$1.01^n$、$n^{100}$。其中哪两个（如果有的话）互为 $\Theta$ 关系？
::: solution
$2^{\log_2 n} = n$。排序为

$$
(\log n)^3 \prec \sqrt n \prec n = 2^{\log_2 n} \prec n\log n \prec n^2 \prec n^{100} \prec 1.01^n.
$$

$(\log n)^3 = o(\sqrt n)$，因为对数的任何次幂都被 $n$ 的任何正幂击败；$n^{100} = o(1.01^n)$，因为底 $> 1$ 的任何指数都击败任何多项式——尽管 $1.01^n$ 要到 $n$ 约 $1.2\times10^5$ 时才反超 $n^{100}$，这提醒我们“最终”可以是很远的将来。所列函数中没有两个互为 $\Theta$ 关系。
:::
:::

::: exercise 倍增循环 {level=1 check="7"}
`i = 1; while i < 100: i *= 2` 的循环体执行多少次？（填入数字。）
::: solution
$k$ 次迭代后 $i = 2^k$。循环在 $2^k < 100$ 时运行，即 $k = 0, \dots, 6$，到 $i = 128$ 时停止。共 $7 = \lceil\log_2 100\rceil$ 次。
:::
:::

::: exercise 依定义定常数 {level=2}
按 [[#def-asymptotic]] 从定义证明 $\tfrac12 n^2 - 3n = \Theta(n^2)$，并给出显式常数 $c_1, c_2, n_0$。
::: solution
上界：一切 $n \ge 0$ 有 $\tfrac12 n^2 - 3n \le \tfrac12 n^2$，故 $c_2 = \tfrac12$。

下界：要使 $\tfrac12 n^2 - 3n \ge c_1 n^2$。$n \ge 12$ 时 $3n \le \tfrac14 n^2$，于是 $\tfrac12 n^2 - 3n \ge \tfrac14 n^2$。取 $c_1 = \tfrac14$、$n_0 = 12$。（$n < 6$ 时函数为负，这正是需要 $n_0$ 的原因。）
:::
:::

::: exercise 键不存在时的平均查找 {level=2 check="13/4"}
对 $n = 4$ 个互异元素的表做线性查找：键以概率 $1/2$ 不存在，否则等概率位于每个位置。比较次数的期望是多少？（填入精确值。）
::: solution
不存在时查找做 $n = 4$ 次比较。若存在于位置 $i \in \{0,1,2,3\}$，则做 $i+1$ 次，平均 $(1+2+3+4)/4 = 5/2$。于是期望为 $\tfrac12\cdot 4 + \tfrac12\cdot\tfrac52 = 2 + \tfrac54 = \tfrac{13}{4}$，与 [[#ex-linear]] 中的通式 $\tfrac{3n+1}{4}$ 吻合。
:::
:::

::: exercise 属于 O 吗？ {level=2}
对每对函数判断 $f = O(g)$、$f = \Omega(g)$ 还是两者皆是，并给出理由：(a) $f = n\log n$，$g = n^{1.01}$；(b) $f = 2^n$，$g = 2^{n/2}$；(c) $f = \log(n!)$，$g = n\log n$。
::: solution
(a) $f/g = \log n / n^{0.01} \to 0$，故 $f = o(g)$：$f = O(g)$ 但不是 $\Omega(g)$。

(b) $f/g = 2^{n/2} \to\infty$，故 $f = \Omega(g)$ 而不是 $O(g)$。

(c) $\log(n!) = \sum_{i=1}^n \log i \le n\log n$，故 $f = O(g)$。下界方面，最大的 $\lceil n/2\rceil$ 项都不小于 $\log(n/2)$，故 $\log(n!) \ge \tfrac n2 \log\tfrac n2 = \tfrac n2(\log n - 1) \ge \tfrac14 n\log n$（$n \ge 4$）。于是 $f = \Theta(g)$：两者皆是。
:::
:::

::: exercise 估计指数 {level=3}
某程序 $n = 10^5$ 时耗时 $0.40$ s，$n = 4\times10^5$ 时耗时 $3.2$ s。设 $T(n) \approx c\,n^k$，估计 $k$ 并预测 $n = 1.6\times10^6$ 的耗时。这些测量与 $T(n) \approx c\,n\log n$ 一致吗？一般地，还要补充哪些测量才能区分 $n^{1.5}$ 与 $n\log n$？
::: solution
$n$ 变为四倍，时间乘以 $3.2/0.40 = 8 = 4^k$，故 $k = \log_4 8 = 1.5$。再变为四倍预计再乘 $8$：约 $25.6$ s。

若 $T = cn\log_2 n$，则 $n = 10^5 \to 4\times10^5$ 的比值应为 $4\cdot\log_2(4\times10^5)/\log_2(10^5) \approx 4 \cdot 18.6/16.6 \approx 4.5$，远小于 $8$；所以这些测量指向 $n^{1.5}$ 而非 $n\log n$。一般地，局部比值总能被某个幂函数拟合；要区分模型，应在很宽的 $n$ 范围内测量（连续倍增若干次），检查估计出的指数是保持常数（$n^{1.5}$）还是缓慢向 $1$ 漂移（$n\log n$，其局部指数为 $1 + 1/\ln n$）。
:::
:::

::: exercise 小 o 是严格更小 {level=3}
证明：若 $f = o(g)$，则 $f = O(g)$ 但 $f \neq \Omega(g)$（设大 $n$ 时 $g(n) > 0$）。再给出一对函数 $f, g$，满足 $f = O(g)$、$f \ne \Theta(g)$，然而 $f \neq o(g)$。
::: solution
若 $f/g \to 0$，则对 $\eps = 1$ 存在 $n_0$ 使 $n \ge n_0$ 时 $f(n) < g(n)$，故 $f = O(g)$，取 $c = 1$。反设还有 $c > 0$ 与 $n_1$ 使 $n \ge n_1$ 时 $f \ge c\,g$；则大 $n$ 时 $f/g \ge c$，与 $f/g \to 0$ 矛盾。故 $f \neq \Omega(g)$。

第二问取 $g(n) = n$，$f(n)$ 在 $n$ 为偶数时等于 $n$，$n$ 为奇数时等于 $1$。则 $f \le g$，故 $f = O(g)$。比值 $f/g$ 在偶数 $n$ 上为 $1$，不趋于 $0$：$f \neq o(g)$。它在奇数 $n$ 上为 $1/n$，故没有任何 $c > 0$ 能使一切大 $n$ 有 $f \ge c\,g$：$f \neq \Omega(g)$，从而 $f \neq \Theta(g)$。渐近记号不是全序——两个函数未必可比。
:::
:::

::: exercise 统计二分查找的探查次数 {level=2 check="17"}
对 $n = 100\,000$ 个元素的有序表，[[#alg-binary-search]] 的二分查找最多能执行多少次循环迭代？（填入数字。）
::: solution
由 [[#thm-binary-search]]，它是 $\lfloor\log_2 100\,000\rfloor + 1$。由 $2^{16} = 65\,536 \le 100\,000 < 131\,072 = 2^{17}$ 得 $\lfloor\log_2 100\,000\rfloor = 16$，最大值为 $17$。（Python 中 `(100000).bit_length()` 返回 `17`。）
:::
:::
