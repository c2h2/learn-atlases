前两章的程序都是一路直行：一条语句执行完接着执行下一条，只有一两个凭信任使用的循环。真实程序必须做出判定——*若*乘客不满 16 岁则收取优惠票价，*只要*下载不断失败就重试，依次处理文件的*每一*行。做出这些判定的语句称为**控制流**，因为它们控制下一条执行哪个语句。

Python 中的控制流构造只有寥寥几种——`if`、`while`、`for`，以及修饰符 `break` 和 `continue`——学起来很容易。需要花更多时间学习的是对它们进行*推理*：确信一个循环计算的结果是正确的、正确处理了第一个和最后的情形，并且它确实会停止。本章两者都教。除了语法，它还介绍专业程序员用来使自己相信一个循环正确的两种工具（他们往往并不把这些推理写下来）：**循环不变式**，说明循环到目前为止已经取得了什么；以及**变体**，表明它必然结束。

## 做出判定：`if`、`elif` 与 `else`

`if` 语句只在条件为真时执行一块代码。

::: definition 条件语句 {#def-if}
**条件语句**具有如下形式

```text
if condition_1:
    block_1
elif condition_2:
    block_2
...
else:
    block_else
```

其中包含零个或多个 `elif`（"else if"，否则如果）子句，以及一个可选的 `else` 子句。Python 从上到下按顺序求值各个条件，直到某个条件为真值；然后执行相应的块，并跳过该语句的其余部分。若没有条件为真值，则执行 `block_else`（如果有的话）。若有 `else`，恰有一个块被执行；否则至多一个。**块**指在以 `:` 结尾的那一行之下、按相同量缩进的一条或多条语句。
:::

由于条件是按顺序测试的，后面的每个条件只有在前面所有条件都为假时才会被测试。好的代码利用这一点来保持条件简单。

::: example 成绩分级 {#ex-grade}
某大学把学位成绩分级：70 分及以上为一等，60–69 分为上二等，50–59 分为下二等，40–49 分为三等，40 分以下为不及格。编写一个返回等级的函数。
::: solution
```python
def grade(mark):
    if mark >= 70:
        return "first"
    elif mark >= 60:
        return "upper second"
    elif mark >= 50:
        return "lower second"
    elif mark >= 40:
        return "third"
    else:
        return "fail"

for m in [85, 70, 69, 55, 40, 12]:
    print(m, grade(m))
```

```console
$ python3 grade.py
85 first
70 first
69 upper second
55 lower second
40 third
12 fail
```

第二个条件是 `mark >= 60`，而不是 `60 <= mark < 70`：等到它被测试时，我们已经知道 `mark >= 70` 为假。这些测试用例是特意挑选的——$70$、$69$ 和 $40$ 这些边界正是 `>` 误代 `>=` 这类错误会暴露的地方。若条件按相反顺序书写、从 `mark >= 40` 开始，那么每个及格的成绩都会被归为三等：对 `elif` 来说，测试的顺序是语义的一部分。
:::
:::

Python 还有**条件表达式**，它在两个*值*（而不是两个块）之间选择：`"odd" if x % 2 == 1 else "even"` 求值为 `'odd'` 或 `'even'`。在较大的表达式内部做简短的选择时使用它；凡是有副作用或情形多于两种的，使用语句形式。

### 书写条件

条件用 `and`、`or` 与 `not` 组合比较式。命题逻辑中的两个等价式——**德摩根定律**——总是被用来化简条件：

$$
\texttt{not}\,(p \;\texttt{and}\; q) \equiv (\texttt{not}\,p)\;\texttt{or}\;(\texttt{not}\,q), \qquad
\texttt{not}\,(p \;\texttt{or}\; q) \equiv (\texttt{not}\,p)\;\texttt{and}\;(\texttt{not}\,q).
$$ {#eq-de-morgan}

于是"不在 0 与 9 之间"，即 `not (0 <= x and x <= 9)`，与 `x < 0 or x > 9` 相同。（其证明就是一张真值表：见[数学图谱：命题逻辑](/learn/maths/lesson.php?c=proofs&l=propositional-logic)。）

::: widget truthtable
formula: ~(p & q)
compare: ~p | ~q
caption: 德摩根第一定律的真值表：两个公式在全部四行上取值相同，所以它们逻辑等价，在条件中可以互相替换。把第二个公式改成 `~p & ~q`——这是手工对条件取反时一个非常常见的错误——看看它与第一个公式取值不同的那两行。
:::

::: example 闰年 {#ex-leap}
在格里高利历中，闰年的规则是：能被 4 整除的年份是闰年，但能被 100 整除的年份不是，而能被 400 整除的年份又是。把这写成一个布尔表达式。
::: solution
```python
def is_leap(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

for y in [1900, 2000, 2023, 2024]:
    print(y, is_leap(y))
```

```console
$ python3 leap.py
1900 False
2000 True
2023 False
2024 True
```

把这个表达式读作"能被 4 整除，并且不是世纪年或者是 400 的倍数"。括号必不可少：没有它们，`and` 会先结合，而 `year % 4 == 0 and year % 100 != 0 or year % 400 == 0` 仍然碰巧正确，但那只是因为 400 的每个倍数都是 4 的倍数——靠运气得到的正确性是应当避免的。$1900$ 能被 $100$ 整除但不能被 $400$ 整除，所以不是闰年；$2000$ 是。
:::
:::

## 用 `while` 重复执行

::: definition while 循环 {#def-while}
**while 循环**

```text
while condition:
    body
```

求值条件；若为真值，执行循环体，然后再次求值条件，如此反复直到条件为假值，此后从循环之后继续执行。循环体的每次执行称为一次**迭代**。若条件第一次就为假，循环体执行零次。
:::

while 循环的形状最容易看作一张**控制流图**：一张以代码片段为结点、以箭头指出哪个片段可以下一个执行的图。

::: widget graph
nodes: Before@0,1; Test@1,1; Body@1,0; After@2,1
edges: Before>Test; Test>Body; Body>Test; Test>After
caption: `while` 循环的控制流图。执行到达测试处；条件为真引向循环体并回到测试，条件为假则引出循环。每次迭代都经过测试，这正是把条件作为对循环进行推理的自然位置的原因：我们在测试之前紧前知道的一切，在每次迭代开始时都成立，在循环结束时也成立。
:::

当我们事先不知道需要多少次迭代——当我们*直到某事发生*才停止地重复——时，`while` 循环是合适的工具。[[programming-1/computation-and-programs]] 中的倍增程序就是一例；下面这个著名的循环也是。

::: example 科拉茨过程 {#ex-collatz}
从一个正整数 $n$ 出发，若它是偶数就反复将其减半，若它是奇数就把它替换为 $3n + 1$，直到它到达 $1$。对 $n = 6$ 追踪这个循环。
::: solution
```python
n = 6
steps = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps += 1
    print(n, end=" ")
print()
print("steps:", steps)
```

```console
$ python3 collatz.py
3 10 5 16 8 4 2 1 
steps: 8
```

（$6$ 是偶数，于是变成 $3$；$3$ 是奇数，于是变成 $10$；接着是 $5$、$16$、$8$、$4$、$2$、$1$。）关键字参数 `end=" "` 使 `print` 以空格而不是换行结尾，因此这些值出现在一行上。

这个循环对*每个*起始值都会停止吗？没人知道。**科拉茨猜想**由洛塔尔·科拉茨（Lothar Collatz）于 1937 年提出，断言它总会到达 $1$；计算机已对 $2^{68} \approx 2.95 \times 10^{20}$ 以下的每个起始值验证过（大卫·巴里纳（David Barina），2020），但迄今没有证明。从 $n = 27$ 出发，该过程需要 $111$ 步，中途最高升到 $9232$，然后才降到 $1$。这个小小的循环是一个警告：一个循环会终止是一个需要论证的命题，而对某些循环，这个论证超出了当今数学的能力。
:::
:::

## 关于循环的推理

一个循环正确，当且仅当两件事成立：它会停止，并且停止时的状态正是我们想要的状态。每一件事都需要各自的论证。

### 终止性：变体

::: theorem 用变体证明终止 {#thm-variant}
设对循环 `while C: body`，存在一个关于程序状态的取整数值表达式 $V$——一个**变体**——使得

1. 只要条件 $C$ 为真，就有 $V \ge 0$；且
2. 循环体的每次迭代都严格减小 $V$。

那么该循环至多执行 $V_0 + 1$ 次迭代后终止，其中 $V_0$ 是循环开始时 $V$ 的值（若 $C$ 在开始时为假，则立即终止）。
:::

::: proof
设 $V_k$ 为 $k$ 次迭代后 $V$ 的值。每次迭代把 $V$ 至少减小 $1$（它取整数值且严格递减），所以 $V_k \le V_0 - k$。若循环执行了 $V_0 + 2$ 次迭代，则第 $V_0 + 2$ 次迭代之前条件为真，由假设 1 有 $V_{V_0+1} \ge 0$；但 $V_{V_0+1} \le V_0 - (V_0+1) = -1$。这一矛盾说明循环至多执行 $V_0 + 1$ 次迭代。
:::

[[programming-1/computation-and-programs#thm-euclid]] 中欧几里得算法的变体是 $b$；对循环 `while i < n: ... i += 1`，变体是 $n - i$。对科拉茨循环，目前找不到任何变体——$n$ 本身既升也降。

### 正确性：不变式

::: definition 循环不变式 {#def-invariant}
对 `while C: body` 的**循环不变式**是一个关于程序状态的命题 $P$，满足

1. **(初始化)** $P$ 恰在循环开始之前为真；且
2. **(保持性)** 若一次迭代开始时 $P$ 与 $C$ 都成立，则 $P$ 在该迭代结束时成立。
:::

::: theorem 不变式原理 {#thm-invariant}
若 $P$ 是 `while C: body` 的循环不变式且循环终止，则当它终止时 $P$ 与"非 $C$"都为真。
:::

::: proof
对 $k$ 归纳证明：对所有不超过实际执行次数的 $k$，$P$ 在 $k$ 次迭代后成立。$k = 0$ 时这就是初始化。若 $P$ 在 $k$ 次迭代后成立，且进行了第 $k+1$ 次迭代，则该迭代开始时 $C$ 为真（这正是它被执行的原因），于是由保持性，$P$ 在 $k + 1$ 次迭代后成立。当循环在 $N$ 次迭代后终止时，$P$ 在第 $N$ 次迭代后成立，且循环之所以停止是因为 $C$ 为假。（归纳法见[数学图谱：归纳法](/learn/maths/lesson.php?c=proofs&l=induction)。）
:::

不变式原理把一个关于次数未知的迭代的问题，化为两个关于单次迭代的小问题。关键在于选取 $P$：它应当描述*迄今取得的进展*，使得"$P$ 且非 $C$"恰好说明任务已经完成。下面是可能的最简单的示例。

```python
n = 5
total = 0
i = 0
while i < n:
    i = i + 1
    total = total + i    # 不变式：total == 1 + 2 + ... + i
print(total, n * (n + 1) // 2)
```

```console
$ python3 sumloop.py
15 15
```

不变式是 $P$："$\texttt{total} = 1 + 2 + \dots + \texttt{i}$ 且 $\texttt{i} \le n$"。循环之前，$\texttt{i} = 0$，和为空，等于 $0$。若 $P$ 成立且 $\texttt{i} < n$，循环体把 `i` 加一并把新的 `i` 加进 `total`，所以 $P$ 再次成立（且仍有 $\texttt{i} \le n$）。变体 $n - \texttt{i}$ 说明终止性。循环停止时 $P$ 成立且 $\texttt{i} \ge n$，于是 $\texttt{i} = n$，而 `total` 是 $1 + \dots + n$，等于 $n(n+1)/2$。

下面这个循环，它的不变式就是全部思想所在。

::: algorithm 反复平方法求幂 {#alg-power}
**输入：**数 $x$ 与整数 $n \ge 0$。**输出：**$x^n$。

1. 令 $r \gets 1$，$b \gets x$，$e \gets n$。
2. 当 $e > 0$：
   1. 若 $e$ 为奇数，令 $r \gets r \cdot b$。
   2. 令 $b \gets b \cdot b$，$e \gets \lfloor e/2 \rfloor$。
3. 返回 $r$。
:::

```python
def power(x, n):
    """Return x ** n for an integer n >= 0, by repeated squaring."""
    result, base, e = 1, x, n
    while e > 0:
        # 不变式：result * base ** e == x ** n
        if e % 2 == 1:
            result = result * base
        base = base * base
        e = e // 2
    return result

print(power(3, 13), 3 ** 13)
print(power(2, 100) == 2 ** 100)
```

```console
$ python3 power.py
1594323 1594323
True
```

::: theorem 反复平方法既正确又快速 {#thm-power}
[[#alg-power]] 返回 $x^n$，并且对 $n \ge 1$ 恰好执行 $\lfloor \log_2 n \rfloor + 1$ 次迭代——即 $n$ 的二进制位数。
:::

::: proof
**不变式：**$r \cdot b^{e} = x^n$。初始时 $r = 1$，$b = x$，$e = n$，所以它成立。对于保持性，设 $r b^e = x^n$ 且 $e > 0$。若 $e$ 为偶数，$e = 2k$，则新的值为 $r' = r$，$b' = b^2$，$e' = k$，且 $r' b'^{e'} = r b^{2k} = r b^e = x^n$。若 $e$ 为奇数，$e = 2k + 1$，则 $r' = rb$，$b' = b^2$，$e' = k$，且 $r' b'^{e'} = r b \cdot b^{2k} = r b^{e} = x^n$。

**终止性：**条件成立时 $e$ 是非负整数，且对 $e > 0$ 有 $\lfloor e/2\rfloor < e$，所以 $e$ 是一个变体（[[#thm-variant]]）。

**结果：**由[[#thm-invariant]]，结束时 $r b^e = x^n$ 且 $e \le 0$；由于 $e$ 从不变为负数，故 $e = 0$，于是 $r = x^n$。

**计数：**向下取整的减半会删去 $e$ 的最后一个二进制位。从有 $\lfloor \log_2 n\rfloor + 1$ 个二进制位的 $n$ 出发，$e$ 恰好在那么多次迭代后到达 $0$。
:::

::: example 追踪反复平方法 {#ex-power-trace}
对 $x = 3$、$n = 13$ 追踪 [[#alg-power]]，并在每一步检验不变式。
::: solution
$13 = (1101)_2$，所以我们预期四次迭代。

| 迭代之后 | $r$ | $b$ | $e$ | $r \cdot b^{e}$ |
|---|---|---|---|---|
| 初始 | $1$ | $3$ | $13$ | $3^{13}$ |
| 1（$e = 13$ 为奇数） | $3$ | $9$ | $6$ | $3 \cdot 9^6 = 3^{13}$ |
| 2（$e = 6$ 为偶数） | $3$ | $81$ | $3$ | $3 \cdot 81^3 = 3^{13}$ |
| 3（$e = 3$ 为奇数） | $243$ | $6561$ | $1$ | $243 \cdot 6561 = 3^{13}$ |
| 4（$e = 1$ 为奇数） | $1594323$ | $43046721$ | $0$ | $1594323 = 3^{13}$ |

最终的 $r = 1594323 = 3^{13}$ 经过了 $4$ 次迭代和 $4 + 3 = 7$ 次乘法，而朴素方法需要 $12$ 次乘法。$e$ 为奇数的那些值对应 $13$ 的 $1$ 比特，而这些恰好就是把 $b$ 乘入 $r$ 的那些迭代：$3^{13} = 3^{8} \cdot 3^{4} \cdot 3^{1}$。
:::
:::

::: widget plot
f: x; floor(log2(x)) + 1
x: 1, 64
y: 0, 64
labels: \text{逐个连乘 } n \text{ 次}; \text{反复平方法}
caption: 计算 $x^n$ 所需的循环迭代次数：逐个连乘 $n$ 次（一条直线）与反复平方法（$\lfloor\log_2 n\rfloor + 1$，一条每过 $2$ 的幂就上升一级的阶梯）。$n = 64$ 时两个计数为 $64$ 和 $7$；$n = 10^{18}$ 时将是 $10^{18}$ 和 $60$。把每个乘积都模 $m$ 归约的同一算法，正是密码软件计算几百位数的 $x^n \bmod m$ 所采用的方法。
:::

::: quiz
对 `i = 0; s = 0; while i < len(xs): s = s + xs[i]; i = i + 1`，下面哪些是循环不变式？其中 `xs` 是一个数的列表。
- [ ] `s == sum(xs)`
- [x] `s == sum(xs[:i])`（前 `i` 个元素之和）
- [ ] `i < len(xs)`
- [x] `0 <= i <= len(xs)`
::: solution
循环之前，`s` 是 $0$，即前 $0$ 个元素之和；每次迭代加上元素 `i` 再把 `i` 增大，所以"`s` 是前 `i` 个元素之和"得以保持；结束时 `i == len(xs)`，它就说 `s == sum(xs)`。界 `0 <= i <= len(xs)` 也是不变式（开始时为真，且以 `i < len(xs)` 开始的一次迭代在结束时满足 `i <= len(xs)`）。`s == sum(xs)` 对非空列表开始时为假，而 `i < len(xs)` 是循环条件，结束时为假。
:::
:::

## 用 `for` 重复执行

我们常常确切知道要遍历什么：列表的每个条目、字符串的每个字符、$1$ 到 $100$ 的每个整数。Python 的 `for` 循环直接表达了这一点。

::: definition for 循环与 range {#def-for}
**for 循环** `for name in iterable: body` 把 `name` 依次绑定到可迭代对象的每个条目，并对每个条目执行一次循环体。**可迭代对象**是任何能产出一串条目的东西：列表、字符串、`range`、文件等等。内建函数 `range(start, stop, step)` 产出整数

$$
\texttt{start},\ \texttt{start} + \texttt{step},\ \texttt{start} + 2\,\texttt{step},\ \dots
$$

只要它们小于 `stop`（当 `step > 0`）或大于 `stop`（当 `step < 0`）就继续。`range(stop)` 表示 `range(0, stop, 1)`，`range(start, stop)` 表示 `range(start, stop, 1)`。
:::

`range` 的区间是**半开**的：包含 `start`，不包含 `stop`。因此 `range(5)` 是 $0, 1, 2, 3, 4$——五个数——而当 $b \ge a$ 时 `range(a, b)` 恰含 $b - a$ 个数。半开区间起初看着奇怪，但能避免许多差一错误：`range(0, n)` 有 $n$ 个元素，`range(a, b)` 和 `range(b, c)` 拼接起来恰好给出 `range(a, c)`，不重叠也无间隙，而空区间就是 `range(a, a)`。一些例子：`list(range(2, 20, 3))` 是 `[2, 5, 8, 11, 14, 17]`，`list(range(10, 0, -3))` 是 `[10, 7, 4, 1]`，`list(range(5, 5))` 是 `[]`。

对 `range` 的 `for` 循环自动终止，因为 range 是有限的，而且迭代次数在代码中一目了然。只要迭代次数事先已知，它就优于 `while` 循环。循环 `for i in range(1, n + 1): total += i` 与上面计算 $1 + \dots + n$ 的 `while` 循环干的是同一件事，但没有计数器需要更新，也没有任何东西容易忘记。

::: example 嵌套循环 {#ex-nested}
打印一张 $4 \times 4$ 的乘法表，并数一数内层循环体执行了多少次。
::: solution
```python
for i in range(1, 5):
    for j in range(1, 5):
        print(f"{i * j:3d}", end="")   # 宽度 3，不换行
    print()                            # 结束这一行
```

```console
$ python3 table.py
  1  2  3  4
  2  4  6  8
  3  6  9 12
  4  8 12 16
```

对 `i` 的每个值（共 $4$ 个），内层循环都要遍历 `j` 的全部 $4$ 个值，所以内层循环体执行 $4 \times 4 = 16$ 次，而外层的 `print()` 执行 $4$ 次。一般地，一个内含 $n$ 个条目之循环的 $m$ 条目循环，其内层循环体执行 $mn$ 次；若内层 range 依赖外层变量，如 `for j in range(i)`，则要把内层的次数加起来（[[#exr-triangle]]）。这样计数迭代是算法分析的开端。
:::
:::

### `break`、`continue` 与 `else`

两条语句改变循环内部的流程。`break` 立即离开最内层包围它的循环；`continue` 跳过当前迭代的剩余部分，进入下一次迭代。例如 `for k in range(1, 11): if k % 3 == 0: continue; print(k)`（分行书写）打印 $1$ 到 $10$ 中不是 $3$ 的倍数的数。

循环还可以带一个 `else` 子句，它在循环正常结束——即*不是*由 `break` 结束——时执行。这使得"搜索，若未找到则报告失败"很好写。

::: example 搜索因子 {#ex-divisor}
求 $n = 91$ 的最小的大于等于 $2$ 的因子 $d$，或者报告 $n$ 是素数。为什么只试满足 $d^2 \le n$ 的 $d$ 就够了？
::: solution
```python
n = 91
d = 2
while d * d <= n:
    if n % d == 0:
        print(n, "=", d, "*", n // d)
        break
    d += 1
else:
    print(n, "is prime")
```

```console
$ python3 divisor.py
91 = 7 * 13
```

当 `n = 97` 时程序打印 `97 is prime`：$2$ 到 $9$ 中没有 $d$ 整除 $97$，循环因 $10^2 > 97$ 而结束，于是 `else` 子句执行。找到因子时，`break` 跳过 `else`。

为什么到 $\sqrt n$ 就停？若 $n = de$ 且 $2 \le d \le e$，则 $d^2 \le de = n$。所以只要 $n$ 能分解为两个都不小于 $2$ 的因子，较小的那个就满足 $d^2 \le n$，循环会找到它。若不存在满足 $d^2 \le n$ 的 $d$ 整除 $n$（且 $n \ge 2$），则 $n$ 是素数。这把 $n$ 在一百万左右的试除工作从大约一百万次降到大约一千次。
:::
:::

::: warning 差一错误
循环中最常见的缺陷，是在边界上多做或少做了一次迭代：该写 `range(1, n + 1)` 却写了 `range(1, n)`，该用 `<=` 却用了 `<`，计数器在使用之前而不是之后加一。两个习惯能抓住其中大多数。第一，用最小的情形测试——$n = 0$、$n = 1$、空列表——此时差一的错误占答案的很大比例。第二，说出每次迭代开始和结束时什么是真的（不变式），并检查循环条件恰好在不变式说任务完成时停止。
:::

::: warning 无限循环
条件永不变为假的 `while` 循环会永远运行，程序看起来"卡死"了。常见的原因是忘记更新循环变量（`while i < n:` 里没有 `i += 1`）、更新了错误的变量，或者条件可能一步跨过目标值，例如 `x` 是一个从不恰好等于 $1.0$ 的浮点数时的 `while x != 1.0:`。若程序卡死，用 Ctrl-C 中断它：Python 抛出 `KeyboardInterrupt`，回溯会指出正在运行哪一行。一个变体（[[#thm-variant]]）能在你运行任何东西之前排除无限循环。
:::

::: quiz
`for k in range(3, 30, 4)` 的循环体执行多少次？
- [ ] 6
- [x] 7
- [ ] 8
- [ ] 27
::: solution
这些值是 $3, 7, 11, 15, 19, 23, 27$；下一个值 $31$ 不小于 $30$。这是 $7$ 个值。一般地，$s > 0$ 且 $b > a$ 时的 `range(a, b, s)` 有 $\lceil (b - a)/s \rceil$ 个元素：这里 $\lceil 27/4\rceil = 7$。
:::
:::

::: history
赫尔曼·戈尔茨坦（Herman Goldstine）与约翰·冯·诺依曼（John von Neumann）的流程图（1947）把程序描述为用箭头连接的方框，以跳转显式地表示控制流。FORTRAN（1957）这样的早期语言随之而行，用起了 `GO TO`，大型程序变成了纠缠不清的跳转之网。ALGOL 60 引入了带 `if … then … else` 和 `for` 循环的嵌套块；科拉多·伯姆（Corrado Böhm）与朱塞佩·雅科皮尼（Giuseppe Jacopini）在 1966 年证明，顺序、选择与迭代三种结构对实现任何流程图程序都已足够；艾兹格·迪杰斯特拉（Edsger Dijkstra）的信《GOTO 语句被认为有害》（"Go To Statement Considered Harmful"，*Communications of the ACM*，1968）发起了**结构化程序设计**运动，它的循环与条件构造为如今每一门现代语言所采用。罗伯特·弗洛伊德（Robert Floyd）（"Assigning meanings to programs"，1967）与查尔斯·霍尔（C. A. R. Hoare）（"An axiomatic basis for computer programming"，1969）提出了本章所使用的、基于不变式的循环推理方法。
:::

## 后续内容

有了条件与循环，原则上你可以写出任何程序；本课程余下的部分讲的是如何把它们写好。[[programming-1/functions]] 把像 `power` 这样的循环封装成带有清晰契约的可复用函数；[[programming-1/recursion]] 给出循环的一种替代，它往往更贴近数学；[[programming-1/sequences]] 把循环应用于列表与字符串。本章的不变式与变体将再次出现：在 [[algorithms]] 中，它们是证明算法正确的标准方法；在 [[programming-1/testing-debugging]] 中，它们则是断言。

::: summary
- `if`/`elif`/`else` 按顺序测试条件，只执行条件为真值的第一个块；顺序重要，且后面的条件可以假定前面的条件都失败了。
- 德摩根定律（[[#eq-de-morgan]]）把 `not (p and q)` 变成 `not p or not q`，把 `not (p or q)` 变成 `not p and not q`。
- `while` 循环在其条件成立时重复；当迭代次数无法事先知道时使用它。`for` 循环对可迭代对象的每个条目执行一次；`range(a, b)` 是半开的，有 $b - a$ 个元素。
- **变体**——一个在循环运行期间 $\ge 0$ 且每次迭代严格递减的整数量——证明终止性（[[#thm-variant]]）。
- **循环不变式**在循环之前为真，并被每次迭代保持；退出时，不变式与被否定的条件一起给出结果（[[#thm-invariant]]）。
- 反复平方法用 $\lfloor\log_2 n\rfloor + 1$ 次迭代而非 $n$ 次计算 $x^n$（[[#thm-power]]）。
- `break` 离开循环，`continue` 跳到下一次迭代，而循环的 `else` 只在没有发生过 `break` 时执行。测试边界以抓住差一错误。
:::

## 习题

::: exercise 计数一个 range {level=1 check="6"}
列出 `range(2, 20, 3)` 产出的值。一共有多少个？（输入个数。）
::: solution
$2, 5, 8, 11, 14, 17$；下一个值 $20$ 不小于 `stop` $= 20$，故被排除。共 $6$ 个值，与 $\lceil (20 - 2)/3\rceil = 6$ 相符。
:::
:::

::: exercise 测试的次序 {level=1}
[[#ex-grade]] 中分级逻辑的下面这个版本有什么问题？给出一个使它返回错误等级的成绩。

```python
if mark >= 40:
    result = "third"
elif mark >= 50:
    result = "lower second"
elif mark >= 60:
    result = "upper second"
elif mark >= 70:
    result = "first"
else:
    result = "fail"
```
::: solution
条件按顺序测试，第一个为真的取胜。每个不小于 $40$ 的成绩都满足第一个测试，所以另外三个分支永远无法到达：成绩 $85$ 被归为 `"third"`。测试必须从最严格的（`mark >= 70`）到最宽松的依次进行，或者每个条件都写出两个界（`50 <= mark < 60`）。
:::
:::

::: exercise 一个三角形循环 {#exr-triangle level=1 check="6"}
下面代码中 `print` 执行多少次？（输入数目。）

```python
for i in range(4):
    for j in range(i):
        print(i, j)
```
::: solution
对 $i = 0, 1, 2, 3$，内层循环分别执行 $0, 1, 2, 3$ 次，所以 `print` 执行 $0 + 1 + 2 + 3 = 6$ 次，打印 `1 0`、`2 0`、`2 1`、`3 0`、`3 1`、`3 2`。一般地，`for i in range(n): for j in range(i)` 的循环体执行 $0 + 1 + \dots + (n-1) = n(n-1)/2$ 次。
:::
:::

::: exercise 条件的取反 {level=2}
用德摩根定律化简 `not (x > 0 and x < 10)` 和 `not (name == "" or age < 18)`，使其中不再留有 `not`。用 $x = 0$、$x = 5$ 和 $x = 10$ 检验第一个。
::: solution
`not (x > 0 and x < 10)` 变成 `not (x > 0) or not (x < 10)`，即 `x <= 0 or x >= 10`。$x = 0$ 时两种形式都是 `True`；$x = 5$ 时都是 `False`；$x = 10$ 时都是 `True`。

`not (name == "" or age < 18)` 变成 `name != "" and age >= 18`。注意对一个比较取反不仅翻转它，还*改变严格性*：`<` 的否定是 `>=`，不是 `>`。
:::
:::

::: exercise 从 27 出发的科拉茨过程 {level=2 check="111"}
编写一个程序，统计科拉茨过程（[[#ex-collatz]]）从 $n = 27$ 到达 $1$ 所需的步数，并报告达到的最大值。（输入步数。）
::: solution
```python
n = 27
steps = 0
highest = n
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    steps += 1
    highest = max(highest, n)
print(steps, highest)
```

这打印 `111 9232`：$111$ 步，最大值 $9232$。条件表达式把更新保持在同一行。这个循环没有已知的变体，所以我们无法事先证明它对每个 $n$ 都会停止——只能观察到对所有迄今有人试过的 $n$ 它都停止了。
:::
:::

::: exercise 线性搜索求整数平方根 {level=2}
下面这个循环旨在对整数 $n \ge 0$ 计算 $\lfloor\sqrt{n}\rfloor$，即满足 $r^2 \le n$ 的最大整数 $r$。

```python
r = 0
while (r + 1) * (r + 1) <= n:
    r = r + 1
```

给出一个不变式和一个变体，并证明该循环正确。它执行多少次迭代？
::: solution
**不变式：**$r \ge 0$ 且 $r^2 \le n$。初始 $r = 0$ 且 $0 \le n$。若 $r^2 \le n$ 且条件 $(r+1)^2 \le n$ 成立，则 `r = r + 1` 之后的新 $r$ 满足 $r^2 \le n$。

**变体：**$n - r$。在条件成立期间，$r + 1 \le (r+1)^2 \le n$，所以 $n - r \ge 1 \ge 0$，且每次迭代把 $n - r$ 减小 $1$。所以循环终止。

**结果：**结束时不变式给出 $r^2 \le n$，而条件的否定给出 $(r+1)^2 > n$，所以 $r$ 是平方不超过 $n$ 的最大整数，即 $r = \lfloor\sqrt n\rfloor$。该循环恰好执行 $\lfloor \sqrt{n}\rfloor$ 次迭代——对 $n = 10^{12}$ 约为一百万次。下一题要好得多。
:::
:::

::: exercise 二分法求整数平方根 {level=3}
证明这个函数对每个整数 $n \ge 0$ 返回 $\lfloor\sqrt{n}\rfloor$，并证明它至多执行 $\lceil \log_2(n+1) \rceil$ 次迭代。

```python
def isqrt(n):
    """Largest integer r with r * r <= n, for an integer n >= 0."""
    lo, hi = 0, n + 1            # 不变式：lo * lo <= n < hi * hi
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if mid * mid <= n:
            lo = mid
        else:
            hi = mid
    return lo
```
::: hint
使用不变式 $lo^2 \le n < hi^2$ 与变体 $hi - lo$。关于界，证明长度 $hi - lo$ 每次迭代至多减半（向上取整）。
:::
::: solution
**不变式** $P$：$lo^2 \le n < hi^2$（$lo, hi$ 为整数）。初始 $0 \le n$ 且 $n < (n+1)^2$。在一次迭代中，$hi - lo > 1$ 给出 $lo < mid < hi$。若 $mid^2 \le n$，我们令 $lo \gets mid$，$P$ 仍成立；否则 $mid^2 > n$，我们令 $hi \gets mid$，$P$ 仍然成立。

**变体** $hi - lo$：循环运行期间它至少为 $2$，并且变成 $hi - mid$ 或 $mid - lo$，由于 $lo < mid < hi$，两者都严格更小。所以循环终止。

**结果：**结束时 $hi - lo \le 1$，而 $P$ 给出 $lo^2 \le n < hi^2$，它迫使 $lo < hi$，于是 $hi = lo + 1$。这样 $lo^2 \le n < (lo+1)^2$，恰好说明 $lo = \lfloor\sqrt n\rfloor$。

**界：**若长度 $L = hi - lo \ge 2$，则 $mid = lo + \lfloor L/2\rfloor$，新长度为 $\lfloor L/2 \rfloor$ 或 $\lceil L/2\rceil$，故至多 $\lceil L/2\rceil$。从 $L = n + 1$ 出发，$k$ 次迭代后长度至多为 $\lceil (n+1)/2^k\rceil$，一旦 $2^k \ge n + 1$ 它就等于 $1$，所以至多需要 $\lceil\log_2(n+1)\rceil$ 次迭代。对 $n = 10^{12}$，这是 $40$ 次迭代而不是一百万次。对所有小于 $10{,}000$ 的 $n$，该函数与标准库的 `math.isqrt` 一致，而 `isqrt(10**20 + 7)` 返回 `10000000000`。
:::
:::

::: exercise 二进制位与平方次数 {level=3 check="10"}
[[#alg-power]] 对 $n = 1000$ 执行多少次迭代？总共执行多少次乘法（$r \gets r b$ 和 $b \gets b^2$ 都要计数）？（输入迭代次数。）
::: solution
$1000 = (1111101000)_2$ 有 $10$ 个二进制位，所以由[[#thm-power]]，有 $\lfloor\log_2 1000\rfloor + 1 = 9 + 1 = 10$ 次迭代（Python：`(1000).bit_length()` 是 `10`）。每次迭代把 $b$ 平方一次（$10$ 次乘法），并且每个 $1$ 比特使 $r$ 乘上一次 $b$，而 $1000$ 有六个 $1$ 比特，共 $16$ 次乘法——相比朴素方法的 $999$ 次。（最初的乘法 $r \gets 1 \cdot b$ 和最后的平方是浪费的，可以避免，从而得到 $14$，但这不改变对数级的增长。）
:::
:::

::: exercise 素数计数 {level=3 check="25"}
在 `for` 循环内部使用 [[#ex-divisor]] 的因子搜索，编写一个程序统计小于 $100$ 的素数。（输入计数。）
::: solution
```python
count = 0
for n in range(2, 100):
    d = 2
    while d * d <= n:
        if n % d == 0:
            break
        d += 1
    else:
        count += 1      # 未找到因子：n 是素数
print(count)
```

这打印 `25`：小于 $100$ 的素数是 $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97$。`else` 属于 `while` 循环，所以它恰在没有发生 `break` 时执行。对 $n = 2$ 和 $n = 3$，`while` 条件一开始就为假，循环体从不执行，`else` 正确地把它们计为素数。
:::
:::
