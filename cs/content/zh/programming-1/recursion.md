棋盘上立着三根柱子；第一根柱子上摞着一个由 $n$ 个盘子组成的塔，盘子自上而下依次变小。你必须把整座塔搬到第三根柱子上，每次只能搬一个盘子，且绝不能把大盘子放在小盘子上面。三个盘子时，稍加尝试就能找到解法。八个盘子时，尝试已经毫无办法——然而有一个解法可以用一句话说完：**要搬 $n$ 个盘子，先把顶上 $n - 1$ 个搬到空柱上让开位置，再搬最大的盘子，然后把那 $n - 1$ 个盘子搬回来摞在它上面。** 这句话用搬 $n - 1$ 个盘子的方法来描述搬 $n$ 个盘子的方法，而搬 $0$ 个盘子什么都不用做。这就足以对每个 $n$ 解开这个谜题。

用自身来定义的函数称为**递归的**。递归之于程序设计，正如数学归纳法之于数学，它是为本身按更小实例定义的东西编写程序的自然方式：阶乘与斐波那契数、一个数的数字、嵌套的列表与文件夹、树、文法，以及 [[algorithms]] 中居于核心的分治算法。本章讲解如何编写递归函数、Python 如何用调用栈运行它们、如何用归纳法证明它们正确，以及什么时候迭代循环是更好的选择。

## 递归定义

许多数学函数是递归定义的。非负整数的**阶乘**定义为

$$
0! = 1, \qquad n! = n \cdot (n-1)! \quad\text{当 } n \ge 1,
$$ {#eq-factorial}

于是 $4! = 4 \cdot 3! = 4 \cdot 3 \cdot 2! = \dots = 4\cdot3\cdot2\cdot1\cdot1 = 24$。这个定义可以逐行直接翻译成 Python：

```python
def factorial(n):
    """Return n! for an integer n >= 0."""
    if n == 0:
        return 1                      # 基本情形
    return n * factorial(n - 1)       # 递归情形

print(factorial(4), factorial(20))
```

```console
$ python3 fact.py
24 2432902008176640000
```

::: definition 递归函数 {#def-recursive}
若函数体中包含对自身的调用（直接或间接通过其他函数），则称该函数是**递归的**。一个构造良好的递归函数具有

1. 一个或多个**基本情形**，即不递归就能直接返回结果的输入；以及
2. 一个或多个**递归情形**，在其中对**更小**的输入调用该函数——按某个不能永远递减的度量而言，即更接近基本情形。
:::

第二个条件正是递归能够停止的原因。对 `factorial` 而言，度量就是 $n$ 本身：每次递归调用的参数都是 $n - 1$，而 $n$ 不可能在未到达基本情形的情况下降到 $0$ 以下。这与循环变体的思想相同（[[programming-1/control-flow#thm-variant]]）。

编写递归函数一个有用的办法是**相信递归**。假设函数对所有更小的输入已经正确；你如何据此处理当前输入？以求 $n$ 的十进制数字之和为例：若 $n < 10$，答案就是 $n$；否则 $n$ 的数字就是 $n /\!/ 10$ 的数字后面接上最后一个数字 $n \mathbin{\%} 10$，所以答案是 `digit_sum(n // 10) + n % 10`。

```python
def digit_sum(n):
    """Sum of the decimal digits of an integer n >= 0."""
    if n < 10:
        return n
    return digit_sum(n // 10) + n % 10

print(digit_sum(4096), digit_sum(7), digit_sum(999999))
```

```console
$ python3 sumdigits.py
19 7 54
```

你不需要在脑中把递归一路追踪到底就能确认这是对的；只需检验基本情形，并检验在**假设**更小的调用正确的前提下递归情形正确。这正是归纳法证明的结构。

## 递归如何运行：调用栈

函数调用自身没有什么特殊的。[[programming-1/functions#def-call]] 中的规则原封不动地适用：每次调用都有自己的帧、自己的形参 `n`，而调用者要等到该调用返回。由于递归调用是在调用者完成之前发出的，帧便堆积起来：最近的调用在最上面，也最先结束。这一堆就是**调用栈**。

::: example 观察栈 {#ex-stack}
给 `factorial` 加上打印，显示每次调用的开始与结束，并按递归深度缩进，对 $n = 3$ 运行。
::: solution
```python
def factorial(n, depth=0):
    print("  " * depth + f"factorial({n}) called")
    if n == 0:
        result = 1
    else:
        result = n * factorial(n - 1, depth + 1)
    print("  " * depth + f"factorial({n}) returns {result}")
    return result

factorial(3)
```

```console
$ python3 trace.py
factorial(3) called
  factorial(2) called
    factorial(1) called
      factorial(0) called
      factorial(0) returns 1
    factorial(1) returns 1
  factorial(2) returns 2
factorial(3) returns 6
```

调用一路下降到基本情形——那一刻同时存在 `factorial` 的四个帧，每个都有自己的 `n`——而乘法发生在返回的路上：$1 \cdot 1 = 1$，然后 $2 \cdot 1 = 2$，再然后 $3 \cdot 2 = 6$。每个帧在被调函数运行期间都必须记住自己当时在哪里（正在计算 `n * ...` 的中途），而这正是栈上的帧所保存的内容。
:::
:::

每个帧都占用内存，因此递归深度是受限的。CPython 设有一个**递归上限**，默认为 $1000$ 个帧（`sys.getrecursionlimit()` 可查询该值），当程序递归得更深时引发 `RecursionError`：

```python
def countdown(n):
    if n == 0:
        return "lift-off"
    return countdown(n - 1)

print(countdown(500))
print(countdown(5000))
```

```console
$ python3 deep.py
lift-off
Traceback (most recent call last):
  File ".../deep.py", line 7, in <module>
    print(countdown(5000))
          ~~~~~~~~~^^^^^^
  File ".../deep.py", line 4, in countdown
    return countdown(n - 1)
  File ".../deep.py", line 4, in countdown
    return countdown(n - 1)
  File ".../deep.py", line 4, in countdown
    return countdown(n - 1)
  [Previous line repeated 996 more times]
RecursionError: maximum recursion depth exceeded
```

缺少基本情形或基本情形不可达的递归函数，你得到的也是同样的错误（只是要空转很久）：递归永不停止，唯一使它结束的只有那个上限。

::: warning Python 不优化尾调用
在 `countdown` 中，递归调用是函数所做的最后一件事——一次**尾调用**——所以原则上调用者的帧已不再需要。有些语言（Scheme，以及许多函数式语言的编译器）会复用这个帧，于是尾递归像循环一样以常数空间运行。CPython 刻意不这样做，以便 traceback 能显示每一个帧；深达 $10^5$ 的递归在 Python 里无论怎么写都会失败。在 Python 中，当递归深度增长缓慢时使用递归——比如分治的 $\log n$，或嵌套结构的深度——而当深度会与大型输入成正比时应使用循环。
:::

::: quiz
用 `n = 3` 调用这个函数会发生什么？

```python
def f(n):
    if n == 0:
        return 0
    return n + f(n - 2)
```
- [ ] 返回 `4`。
- [ ] 返回 `3`。
- [x] 引发 `RecursionError`。
- [ ] 返回 `0`。
::: solution
调用依次是 `f(3)`、`f(1)`、`f(-1)`、`f(-3)`，……：奇数实参跳过了基本情形 `n == 0`，而实参永远递减下去，所以递归只在上限触及时才停止。该函数只对偶数 `n >= 0` 满足 [[#def-recursive]]。更安全的基本情形是 `if n <= 0`，它也覆盖了奇数情形；此时 `f(3)` 返回 $3 + 1 + 0 = 4$。
:::
:::

## 证明递归函数正确

"检验基本情形，并假设更小的调用正确时检验递归情形"这一论证就是归纳法证明，值得完整写出一次。

::: proposition 阶乘的正确性 {#prop-factorial}
对每个整数 $n \ge 0$，`factorial(n)` 终止并返回 $n!$。
:::

::: proof
对 $n$ 作归纳。**基本情形：** `factorial(0)` 不递归，返回 $1 = 0!$。**归纳步骤：** 设 $n \ge 1$，并假设 `factorial(n - 1)` 终止且返回 $(n-1)!$。那么 `factorial(n)` 就作那一次调用，把它的结果乘以 $n$，由 [[#eq-factorial]] 返回 $n \cdot (n - 1)! = n!$；它能终止，因为它所作的调用能终止。由归纳法，结论对所有 $n \ge 0$ 成立。（参见[数学图谱：归纳法](/learn/maths/lesson.php?c=proofs&l=induction)。）
:::

对 `digit_sum` 这类在 $n /\!/ 10$ 而非 $n - 1$ 上递归的函数，同样的论证要用**强归纳法**：假设函数对所有比 $n$ 小的输入都正确，再推出它对 $n$ 正确。套路总是如此：找一个每次递归调用都会减小的度量（这里是数值 $n$）；证明基本情形；假设对度量更小的所有调用都正确，证明每个递归情形。

章初的谜题表明，递归表达算法是多么自然。

::: algorithm 汉诺塔 {#alg-hanoi}
**输入：** $n \ge 0$ 以及三根互不相同的柱子 `source`、`target`、`spare`，最小的 $n$ 个盘子叠在 `source` 上。**效果：** 把这 $n$ 个盘子搬到 `target`，全程不把大盘子放在小盘子上。

1. 若 $n = 0$，什么都不做。
2. 否则：把 $n - 1$ 个盘子从 `source` 搬到 `spare`（递归地进行，以 `target` 作空柱）；把盘子 $n$ 从 `source` 搬到 `target`；把 $n - 1$ 个盘子从 `spare` 搬到 `target`（递归地进行，以 `source` 作空柱）。
:::

::: example 三个盘子 {#ex-hanoi}
把 [[#alg-hanoi]] 实现为一个打印其走法的函数，对三个盘子运行。为什么这些走法是合法的？
::: solution
```python
def hanoi(n, source, target, spare):
    """Print the moves that transfer n discs from source to target."""
    if n == 0:
        return                                 # 无需移动
    hanoi(n - 1, source, spare, target)        # 把较小的 n-1 个盘子搬开让路
    print(f"move disc {n} from {source} to {target}")
    hanoi(n - 1, spare, target, source)        # 把它们搬回盘子 n 上面

hanoi(3, "A", "C", "B")
```

```console
$ python3 hanoi.py
move disc 1 from A to C
move disc 2 from A to B
move disc 1 from C to B
move disc 3 from A to C
move disc 1 from B to A
move disc 2 from B to C
move disc 1 from A to C
```

这些走法之所以合法，是因为在搬盘子 $1, \dots, n-1$ 的过程中，盘子 $n$ 及更大的盘子始终在它们下面的某根柱子上，所以绝不会有盘子被放到更小的盘子上面（这就是把归纳假设用于 $n - 1$ 个盘子：无论下面压着哪些更大的盘子，这些走法都合法）。
:::
:::

::: theorem 汉诺塔的代价 {#thm-hanoi}
[[#alg-hanoi]] 恰好走 $2^n - 1$ 步，且没有任何解法用的步数更少。
:::

::: proof
**计数。** 设 $M(n)$ 为步数。则 $M(0) = 0$ 且 $M(n) = 2M(n-1) + 1$。由归纳法 $M(n) = 2^n - 1$：$n = 0$ 时成立；若 $M(n-1) = 2^{n-1} - 1$，则 $M(n) = 2(2^{n-1} - 1) + 1 = 2^n - 1$。

**下界。** 设 $L(n)$ 为 $n$ 个盘子任一解法的最少步数；显然 $L(0) = 0$。考虑 $n \ge 1$ 个盘子的任一解法。最大的盘子至少要动一次。看它的**第一次**移动：那一刻它是自己所在柱子上的唯一盘子，且目标柱子是空的，所以其余 $n-1$ 个盘子全在第三根柱子上；把它们从初始位置搬到那里至少用了 $L(n-1)$ 步。在它**最后一次**移动的时刻，同样的推理表明其余 $n - 1$ 个盘子全在第三根柱子上，而最大的盘子随即落到最终柱子上并从此留在那里；把 $n - 1$ 个盘子搬到它上面至少还要 $L(n - 1)$ 步。于是 $L(n) \ge 2L(n-1) + 1$，由归纳法 $L(n) \ge 2^n - 1$。既然算法达到了 $2^n - 1$，它便是最优的。
:::

对 $n = 64$——传统上随这个谜题一起讲述的寺庙传说中的盘子数——最少需要 $2^{64} - 1 \approx 1.8 \times 10^{19}$ 步：按每秒一步计算，约需 $585$ 亿年。

## 递归何时昂贵

**斐波那契数列**定义为 $F_0 = 0$、$F_1 = 1$，且对 $n \ge 2$ 有 $F_n = F_{n-1} + F_{n-2}$。这个定义是递归的，而递归程序也是最显然的写法。为了看清它的代价，我们来数调用的次数。

```python
calls = 0

def fib(n):
    """Return the n-th Fibonacci number (fib(0) = 0, fib(1) = 1)."""
    global calls
    calls += 1                     # 为这个实验统计每一次调用
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

for n in [5, 10, 20, 25]:
    calls = 0
    value = fib(n)
    print(n, value, calls)
```

```console
$ python3 fib.py
5 5 15
10 55 177
20 6765 21891
25 75025 242785
```

（`global` 语句使 `fib` 中的赋值更新模块级的计数器；这里只是为实验才用它。）把 $n$ 增加 $5$，工作量就大约变为 $11$ 倍，而 `fib(40)` 将发出超过 3 亿次调用。原因可以从**递归树**中看出：每次调用对应树中的一个结点。

::: widget graph
nodes: F4@4,3; F3@2,2; F2b@6,2; F2a@1,1; F1b@3,1; F1c@5,1; F0b@7,1; F1a@0.5,0; F0a@1.5,0
edges: F4>F3; F4>F2b; F3>F2a; F3>F1b; F2a>F1a; F2a>F0a; F2b>F1c; F2b>F0b
algorithm: dfs
start: F4
caption: `fib(4)` 的递归树：每个结点是一次调用，它的子结点就是它发出的调用（$F_2$ 被计算了两次，即 `F2a` 与 `F2b`，$F_1$ 被计算了三次）。从 `F4` 开始逐步演示深度优先搜索：它访问结点的顺序正是 Python 发出调用的顺序，而从根到当前结点的路径就是那一刻的调用栈。共有 $9 = 2F_5 - 1$ 个结点。
:::

::: theorem 朴素斐波那契的调用次数 {#thm-fib-calls}
设 $C(n)$ 为 `fib(n)` 发出的调用次数（含最外层一次）。则 $C(n) = 2F_{n+1} - 1$。
:::

::: proof
$n = 0$ 与 $n = 1$ 时只有一次调用、没有递归，且 $2F_1 - 1 = 2F_2 - 1 = 1$。对 $n \ge 2$，调用 `fib(n)` 发出了 `fib(n - 1)` 与 `fib(n - 2)` 的调用再加上它自己，故 $C(n) = C(n-1) + C(n-2) + 1$。假设公式对 $n - 1$ 与 $n - 2$ 成立（强归纳法），

$$
C(n) = (2F_n - 1) + (2F_{n-1} - 1) + 1 = 2(F_n + F_{n-1}) - 1 = 2F_{n+1} - 1. \qquad
$$
:::

由于 $F_n$ 的增长速度如 $\varphi^n/\sqrt 5$，其中 $\varphi = (1 + \sqrt5)/2 \approx 1.618$，朴素程序的时间关于 $n$ 呈指数增长——不是因为递归慢，而是因为它一遍又一遍地重新计算同样的值。（$F_n$ 的封闭形式在[数学图谱：递推关系](/learn/maths/lesson.php?c=discrete&l=recurrences)中推导。）

::: widget plot
f: 2*((1 + sqrt(5))/2)^(x + 1)/sqrt(5) - 1; x + 1
x: 0, 22
y: 0, 60000
points: 5,15; 10,177; 15,1973; 20,21891
labels: \text{朴素 } \texttt{fib}(n) \text{ 的调用次数 } \approx 2\varphi^{n+1}/\sqrt5 - 1; \texttt{fib\_iter}(n) \text{ 的循环次数}
caption: 计算 $F_n$ 所花的工作量。图中标出的点是递归程序实测的调用次数 $2F_{n+1} - 1$；穿过它们的曲线是近似式 $2\varphi^{n+1}/\sqrt5 - 1$。迭代版本（那条几乎水平的线）只需要 $n$ 次循环迭代。$n$ 每增加 $1$，递归的工作量就约乘上 $\varphi \approx 1.618$。
:::

有两种标准的补救办法。**备忘录法**在第一次算出某个结果时就把它存下来，之后直接查表；标准库以 `functools.cache` 的形式提供该功能，把它写成 `def` 前一行上的 `@cache`，就会包装该函数，使相同参数的重复调用返回已存储的结果。有了备忘录法，`fib(n)` 每个 $F_k$ 只计算一次，因此工作量为 $O(n)$。另一种写法是**迭代**版本，自底向上逐步构造各个值：

```python
def fib_iter(n):
    a, b = 0, 1                    # 不变式：a, b == fib(i), fib(i + 1)
    for _ in range(n):
        a, b = b, a + b
    return a

from functools import cache

@cache                             # 记住每个已经算出的结果
def fib_memo(n):
    if n < 2:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

print(fib_iter(100))
print(fib_memo(100))
```

```console
$ python3 fibiter.py
354224848179261915075
354224848179261915075
```

两者都能瞬间算出 $F_{100}$；朴素版本则约需 $1.1 \times 10^{21}$ 次调用。（`fib_memo(1000)` 仍会失败，因为超出递归上限——上面那条警告仍然适用。）从最小的子问题开始自底向上建立子问题答案的表格，正是**动态规划**的思想，它是 [[algorithms]] 中的一门核心技术。

::: warning 指数级递归
一个在只小一点的输入上发出两次或更多次递归调用的递归函数——如 `f(n - 1)` 与 `f(n - 2)`——通常耗时指数级，因为同样的子问题被求解了许多遍。写这种函数之前，先问子问题是否重叠。若重叠，就用备忘录法或自底向上计算。若不重叠，比如汉诺塔（其指数代价由 [[#thm-hanoi]] 可知不可避免）或对互不相交的两半作分治，递归就没有问题。
:::

## 递归与迭代

任何循环都能写成递归，任何递归也都能写成循环（必要时配一个显式的栈），所以选择取决于清晰程度与代价。

当问题**自相似**时，递归是更好的选择：解的自然描述会提到更小实例的解，如汉诺塔；或者数据本身是递归的——文件夹里有文件和文件夹，算术表达式含有子表达式，树的子结点还是树。递归也是**分治法**的自然表达：分治法把问题划分为若干个规模占原问题固定比例的部分。下面就是来自 [[programming-1/control-flow#alg-power]] 的平方法求幂，依据恒等式 $x^{2k} = (x^k)^2$ 与 $x^{2k+1} = (x^k)^2 x$ 递归写出：

```python
def power(x, n):
    """x ** n for an integer n >= 0, by recursive squaring."""
    if n == 0:
        return 1
    half = power(x, n // 2)          # 一次递归调用，参数为 n // 2
    if n % 2 == 0:
        return half * half
    return half * half * x

print(power(3, 13), power(2, 100) == 2 ** 100)
```

打印 `1594323 True`。每次调用把 $n$ 减半，所以递归深度只有 $\lfloor\log_2 n\rfloor + 2$ 个帧（算上基本情形）：大约只有当 $n$ 接近 $2^{1000}$ 时才需要约 $1000$ 个帧。正确性证明就是对 $n$ 的直接强归纳，不需要发明不变式——这正是递归写法最主要的魅力所在。

当递归只会是一条深度与输入成正比的简单调用链时，循环是更好的选择，例如 `countdown` 或求和 $1 + \dots + n$：循环一样清晰，只用常数内存，也没有深度限制。

::: example 递归的回文判定 {#ex-palindrome}
若一个字符串正读与倒读相同，则称它为**回文**。编写一个递归的判定函数。（`s[0]` 表示第一个字符，`s[-1]` 表示最后一个字符，`s[1:-1]` 表示去掉这两个字符后的子串；这些写法在 [[programming-1/sequences]] 中讲解。）
::: solution
长度为 $0$ 或 $1$ 的字符串是回文。更长的字符串是回文，当且仅当它的首字符与末字符相同**且**中间部分是回文。

```python
def is_palindrome(s):
    """True if the string s reads the same forwards and backwards."""
    if len(s) <= 1:
        return True
    return s[0] == s[-1] and is_palindrome(s[1:-1])

for w in ["racecar", "level", "abca", "", "x", "noon"]:
    print(repr(w), is_palindrome(w))
```

```console
$ python3 pal.py
'racecar' True
'level' True
'abca' False
'' True
'x' True
'noon' True
```

度量是 `len(s)`，每次调用减少 $2$，故递归终止；基本情形有两个长度（$0$ 与 $1$），因为偶数长度不断减 $2$ 会到达 $0$，奇数长度则到达 $1$。由于 `and` 短路求值，一旦发现不匹配递归立即停止：对 `'abca'`，第一次比较成功，第二次（`'b'` 对 `'c'`）失败。内建函数 `repr` 按值在代码中的写法显示一个值，于是空串显示为可见的 `''`。
:::
:::

::: example 转换为二进制 {#ex-binary}
编写一个递归函数，把 $n \ge 0$ 的二进制表示作为字符串返回。
::: solution
$n \ge 2$ 的二进制数字，就是 $n /\!/ 2$ 的二进制数字后面接上最后一位 $n \mathbin{\%} 2$——与 `digit_sum` 一样的"除最后一位外的其余部分"分解，只是基数换成 $2$。

```python
def to_binary(n):
    """Binary digits of an integer n >= 0, as a string."""
    if n < 2:
        return str(n)
    return to_binary(n // 2) + str(n % 2)

print(to_binary(0), to_binary(5), to_binary(13), to_binary(1000))
print(bin(1000))
```

```console
$ python3 binary.py
0 101 1101 1111101000
0b1111101000
```

结果与内建函数 `bin` 一致，后者会加上前缀 `0b`。递归直接按正确的顺序产生各位数字，无需任何翻转：递归调用构造出前面的数字，而最后一位在返回的路上接上去。
:::
:::

::: quiz
对下列哪些任务，在 Python 中直接写一个简单的递归函数是糟糕的选择？
- [ ] 打印一个文件夹及其所有子文件夹中的每个文件。
- [x] 用 `total(n) = n + total(n - 1)` 累加 $1, 2, \dots, 10^6$。
- [ ] 计算 $x^n$：求 `power(x, n // 2)` 再平方。
- [x] 不用备忘录，用 `fib(n - 1) + fib(n - 2)` 计算 $F_{50}$。
::: solution
用一条调用链求和到 $10^6$ 需要一百万个帧，会撞上递归上限；应当用循环（或公式 $n(n+1)/2$）。对 $n = 50$ 的朴素斐波那契约需 $4 \times 10^{10}$ 次调用。文件夹树是深度很小的递归数据，递归平方法的深度是对数级，所以这两者都适合用递归。
:::
:::

::: history
递归定义比计算机更古老：戴德金（Dedekind）（1888）与皮亚诺（Peano）（1889）以递归方式定义了自然数的算术；1930 年代，哥德尔（Gödel）、埃尔布朗（Herbrand）、克莱尼（Kleene）与彼得（Péter）发展了递归函数论，它成为可计算性的等价定义之一。威廉·阿克曼（Ackermann）1928 年给出的函数表明，有些可计算函数增长太快，无法用简单的（原始）递归定义。在程序设计方面，约翰·麦卡锡（John McCarthy）的 LISP（见论文 "Recursive functions of symbolic expressions and their computation by machine"，1960）与 ALGOL 60 是最早允许过程调用自身的广为人知的语言；ALGOL 60 纳入递归在当时曾引发争议，因为它需要运行时的栈。汉诺塔谜题由法国数学家爱德华·卢卡斯（Édouard Lucas）于 1883 年发表，署名笔名 "N. Claus de Siam"。
:::

## 后续内容

递归贯穿整个计算机科学。在 [[data-structures]] 中，树及其算法天生就是递归的；在 [[algorithms]] 中，归并排序与快速排序等分治方法用形如 $M(n) = 2M(n-1) + 1$ 的递归式来分析，而动态规划把 `fib` 这样的指数级递归变成多项式时间的。[[compilers]] 中的语法分析器遵循文法的递归结构，[[theory-of-computation]] 则通过递归函数来定义可计算性本身。就近而言，[[programming-1/sequences]] 为递归提供了可供处理的列表与字符串。

::: summary
- **递归函数**调用自身；它需要基本情形和递归情形，递归情形作用在按某个不能永远递减的度量而言更小的输入上（[[#def-recursive]]）。
- 写递归时要**相信**它：假设更小的调用正确，再把它们的结果组合起来。用关于该度量的（强）归纳法证明其正确（[[#prop-factorial]]）。
- 每次调用在**调用栈**上有自己的帧；CPython 限制递归深度（默认 $1000$）且不优化尾调用，所以深的线性递归应改用循环。
- 汉诺塔恰好需要 $2^n - 1$ 步，这是最优的（[[#thm-hanoi]]）。
- 朴素递归斐波那契发出 $2F_{n+1} - 1$ 次调用（[[#thm-fib-calls]]）——指数级，因为子问题重叠。备忘录法或自底向上的迭代可使其变为线性。
- 对自相似的问题、递归的数据和分治（对数深度）优先用递归；对很长的简单调用链优先用循环。
:::

## 习题

::: exercise 追踪一次递归 {level=1 check="19"}
追踪 `digit_sum(4096)` 发出的调用，给出每次调用的返回值。（输入最终结果。）
::: solution
`digit_sum(4096)` 调用 `digit_sum(409)`，后者调用 `digit_sum(40)`，再调用 `digit_sum(4)`。基本情形返回 $4$；然后 `digit_sum(40)` 返回 $4 + 0 = 4$，`digit_sum(409)` 返回 $4 + 9 = 13$，`digit_sum(4096)` 返回 $13 + 6 = 19$。
:::
:::

::: exercise 六个盘子 {level=1 check="63"}
[[#alg-hanoi]] 对 $6$ 个盘子要走多少步？其中移动最小盘子的有多少步？（输入总步数。）
::: solution
由 [[#thm-hanoi]]，$2^6 - 1 = 63$ 步。盘子 $k$ 移动 $2^{n-k}$ 次（盘子 $n$ 移动一次，每小一级的盘子都比大一级的那个小盘多移动一倍），所以最小的盘子移动 $2^5 = 32$ 次——每隔一步动一次。验证：$32 + 16 + 8 + 4 + 2 + 1 = 63$。
:::
:::

::: exercise 找出缺陷 {level=1}
这个函数意在返回 $n \ge 0$ 时的 $1 + 2 + \dots + n$。它出了什么问题？你会如何修复？

```python
def total(n):
    return n + total(n - 1)
```
::: solution
没有基本情形，所以每次调用都会再发起一次调用——`total(3)` 调用 `total(2)`、`total(1)`、`total(0)`、`total(-1)`，……——直到 Python 引发 `RecursionError`。在递归情形之前加上 `if n == 0: return 0`（或 `if n <= 0`）。即便如此，`total(10**5)` 仍会超出递归上限；对这样的长调用链，循环或公式 $n(n+1)/2$ 更好。
:::
:::

::: exercise 数调用次数 {level=2 check="177"}
不运行程序，朴素的 `fib(10)` 一共发出多少次调用？（输入调用次数。）
::: solution
由 [[#thm-fib-calls]]，$C(10) = 2F_{11} - 1$。斐波那契数列为 $0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, \dots$，故 $F_{11} = 89$，$C(10) = 177$，与实验相符。
:::
:::

::: exercise 递归中的乘法 {level=2}
证明递归的 `power(x, n)` 对 $n \ge 1$ 恰好发出 $\lfloor \log_2 n\rfloor + 2$ 次调用，且至多执行 $2(\lfloor\log_2 n\rfloor + 1)$ 次乘法。
::: solution
每次 $n \ge 1$ 的调用在 $n /\!/ 2$ 上发出一次调用，而 $n = 0$ 的调用不再发出调用。从 $n \ge 1$ 出发，它有 $b = \lfloor\log_2 n\rfloor + 1$ 个二进制位；向下取整的减半每次调用去掉一位，$b$ 次调用后参数变成 $0$：于是有 $b$ 次 $n \ge 1$ 的调用，再加上一次基本情形的调用，共 $b + 1 = \lfloor\log_2 n\rfloor + 2$ 次调用。$b$ 次非基本情形的调用中，每次执行一次乘法 `half * half`，$n$ 为奇数时再多一次，故至多 $2b$ 次乘法。（$n = 13$ 时 $b = 4$：五次调用，$4 + 3 = 7$ 次乘法。）
:::
:::

::: exercise 上楼梯 {level=2 check="89"}
你要登一段 $n$ 级的台阶，每次上一级或两级。编写递归函数 `ways(n)` 统计登上顶部的不同走法数，并计算 `ways(10)`。（输入数值。）
::: solution
第一步要么上一级，剩下 $n - 1$ 级；要么上两级，剩下 $n - 2$ 级；两类走法互不相同，故对 $n \ge 2$ 有 `ways(n) = ways(n - 1) + ways(n - 2)`，且 `ways(0) = ways(1) = 1`（各一种走法：什么都不做，或上一级）。

```python
def ways(n):
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)

print(ways(10))   # 89
```

这正是斐波那契递归式平移一格：`ways(n)` $= F_{n+1}$，所以 `ways(10)` $= F_{11} = 89$。$n$ 较大时它的指数代价与朴素 `fib` 相同，应当加备忘录或改写为循环。
:::
:::

::: exercise 麦卡锡的 91 函数 {level=3 check="91"}
约翰·麦卡锡（John McCarthy）的 91 函数对整数 $n$ 定义为

$$
M(n) = \begin{cases} n - 10 & \text{当 } n > 100,\\ M(M(n + 11)) & \text{当 } n \le 100. \end{cases}
$$

证明对每个整数 $n \le 100$ 都有 $M(n) = 91$。（输入 $M(50)$。）
::: hint
先处理 $90 \le n \le 100$，从 $n = 100$ 开始往下推；然后对 $n < 90$ 使用"从 $101$ 向上"的强归纳法，即对 $101 - n$ 作归纳。
:::
::: solution
对 $n > 100$，$M(n) = n - 10$；特别地 $M(101) = 91$。

**情形 $90 \le n \le 100$。** 此时 $101 \le n + 11 \le 111$，故 $M(n + 11) = n + 1$，从而 $M(n) = M(n + 1)$。于是 $M(100) = M(101) = 91$，再由反向归纳法 $M(99) = M(100) = 91$，一路往下到 $M(90) = 91$。

**情形 $n < 90$。** 对 $k = 101 - n$（$n$ 越小 $k$ 越大）作强归纳，假设对所有满足 $n < m \le 100$ 的 $m$ 有 $M(m) = 91$。则 $n + 11 \le 100$ 且 $n + 11 > n$，由假设 $M(n+11) = 91$，于是 $M(n) = M(91) = 91$（因为 $91$ 属于第一种情形）。

所以对一切 $n \le 100$ 都有 $M(n) = 91$；特别地 $M(50) = 91$。Python 版本 `def M(n): return n - 10 if n > 100 else M(M(n + 11))` 对从 $-50$ 到 $100$ 的每个 $n$ 都返回 $91$。这种嵌套递归的终止性从其形式并不显然——外层调用的实参是一次内层调用的**结果**——这正是麦卡锡及其同事把它用作形式验证测试用例的原因。
:::
:::

::: exercise 回文性的证明 {level=3}
证明 [[#ex-palindrome]] 中的 `is_palindrome(s)` 返回 `True` 当且仅当 $s$ 是回文，即对一切 $0 \le i < n$ 有 $s_i = s_{n-1-i}$，其中 $n$ 为 $s$ 的长度。
::: solution
对 $n$ 作强归纳。若 $n \le 1$，该条件或是空泛的，或是只说 $s_0 = s_0$，故 $s$ 是回文，而函数返回 `True`。

设 $n \ge 2$，并假设结论对更短的字符串成立。函数返回 `True` 恰好当 $s_0 = s_{n-1}$ 且 `is_palindrome(t)` 返回 `True`，其中 $t = s_1 s_2 \cdots s_{n-2}$ 长度为 $n - 2$ 且 $t_j = s_{j+1}$。由假设，后者成立恰好当对一切 $0 \le j < n - 2$ 有 $t_j = t_{n-3-j}$，即 $s_{j+1} = s_{n-2-j}$，或令 $i = j + 1$：对 $1 \le i \le n-2$ 有 $s_i = s_{n-1-i}$。再加上 $s_0 = s_{n-1}$（即 $i = 0$ 的情形，由对称性它也给出 $i = n-1$），合起来正是对一切 $0 \le i < n$ 的条件。所以函数返回 `True` 当且仅当 $s$ 是回文。终止性由每次调用长度减少 $2$ 得到。
:::
:::
