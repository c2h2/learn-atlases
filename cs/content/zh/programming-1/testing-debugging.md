一个匆忙的程序员可能会这样写一个计算数列表中位数——中间值——的函数：

```python
def median(xs):
    """Return the median of a non-empty list of numbers."""
    n = len(xs)
    return xs[n // 2]
```

拿 `[1, 3, 8]` 试一试，它返回 `3`，是对的。再试 `[7]`：`7`，又是对的。到此为止很容易。然而对每个偶数长度的列表，这个函数都是错的（`[1, 2, 3, 4]` 的中位数是 $2.5$，不是 `3`）；对每个未排序的列表，它也是错的（`[8, 1, 3]` 的中位数是 `3`，不是 `1`）；而它对空列表的反应是一个毫无用处的 `IndexError`。那两次成功的尝试没有透露任何端倪。试验只是选得很糟。

每个程序员都会写出缺陷；优秀程序员的过人之处在于找到缺陷有多快、多可靠。本章讲的就是完成这种查找的两项活动。**测试**依据规格说明，在精心挑选的输入上系统而自动地检查程序，使错误尽早暴露、并保持修好。**调试**则是当测试（或用户）揭示出一次失败时所发生的事情：重现它、定位缺陷并修复它，所用的方法更接近实验科学而不是猜测。一路上我们会遇到断言、Python 的 `unittest` 框架、如何选择测试用例、针对参照实现的随机测试，以及用二分法进行调试。

## 规格说明、测试与断言

测试只有相对于规格说明（[[programming-1/functions#def-spec]]）才有意义：不说出正确答案是什么，就不能说 `median` 给出了错误的答案。因此，先写规格说明——写在文档字符串里，用文字和例子——是测试的第一步。

::: definition 测试用例与测试集 {#def-test}
**测试用例**由一个满足前置条件的输入，加上后置条件所要求的**预期结果**（一个值，或必须抛出的异常）组成。若程序在该输入上产生预期结果，则测试**通过**，否则**失败**。**测试集**是可以自动运行的一组测试用例；**回归测试**是在缺陷修复之后加进测试集的测试，使该缺陷无法悄悄复发。
:::

测试一般不能确立正确性。一个定义在 64 位整数上的函数有 $2^{64}$ 个可能的输入；没有任何测试集能试遍它们。正如艾兹格·迪杰斯特拉（Edsger Dijkstra）在《结构化程序设计札记》（"Notes on Structured Programming"，1970）中所说：测试能显示缺陷的存在，却永远不能显示缺陷的不存在。证明——像[[programming-1/control-flow]]中对循环、[[programming-1/recursion]]中对递归所做的证明——能显示缺陷的不存在，但它们针对的是一个理想化的程序，而且本身也是由会犯错的人写出的。实践中两者相辅相成：推理指导测试的设计与选择，测试则抓住推理漏掉的错误。

### 断言

最简单的检查是程序内部的**断言**。

::: definition 断言 {#def-assert}
语句 `assert condition, message` 求值条件；若为假值，则抛出带该消息的 `AssertionError`，否则什么都不做。断言陈述程序员相信在那一点必须成立的事实——前置条件、后置条件、循环不变式——从而一旦违反就能立即被发现，就在其成因近旁，而不是到后来产生一个错误的结果。
:::

```python
def mean(xs):
    assert len(xs) > 0, "mean of an empty list"
    return sum(xs) / len(xs)

print(mean([2, 4, 9]))
print(mean([]))
```

```console
$ python3 assertdemo.py
5.0
Traceback (most recent call last):
  File ".../assertdemo.py", line 6, in <module>
    print(mean([]))
          ~~~~^^^^
  File ".../assertdemo.py", line 2, in mean
    assert len(xs) > 0, "mean of an empty list"
           ^^^^^^^^^^^
AssertionError: mean of an empty list
```

断言是会自我校验的廉价文档。把循环不变式写成循环体开头的 `assert`，就把[[programming-1/control-flow#thm-invariant]]的证明思想变成了一个运行时检查，它会在不变式第一次被破坏的那次迭代触发。

::: warning 断言可能被关掉
用 `-O`（优化）选项运行 Python 会删除每一条 `assert` 语句。用 `python3 -O assertdemo.py` 运行时，上面的程序不再抛出 `AssertionError`；它会走到除法处，改为以 `ZeroDivisionError` 失败。所以断言只能检查*若程序正确就绝不该发生*的事情。绝不要拿它们去验证用户输入、文件内容或任何可能合理出错的东西——对那类事情，要像[[programming-1/files-exceptions]]中那样用 `if` 检查条件并 `raise ValueError(...)`。也绝不要把断言的条件放在有副作用的东西上，如 `assert xs.pop() > 0`，因为在 `-O` 之下副作用也随之消失了。
:::

## 单元测试

**单元测试**孤立地测试程序的一个小单元——通常是一个函数。Python 的标准库包含 `unittest` 框架：测试是 `unittest.TestCase` 派生类中名字以 `test` 开头的方法，它们用诸如 `assertEqual(actual, expected)`、`assertTrue(x)`、用于浮点数的 `assertAlmostEqual(a, b)`、用于预期异常的 `assertRaises(SomeError)` 之类的方法检查结果。（类将在[[program-design]]中讲解；这里的模式可以照原样套用。）许多项目改用第三方框架 pytest，其中测试是使用普通 `assert` 语句的普通函数；思想是相同的。

::: example 测试 median {#ex-median-tests}
为 `median` 编写测试，覆盖单个元素、奇数长度的已排序列表、奇数长度的未排序列表、偶数长度列表和空列表。先对那个匆忙的版本运行它们，然后修正函数。
::: solution
测试放在自己的文件 `test_stats.py` 里，并从 `stats.py` 导入函数：

```python
import unittest
from stats import median

class TestMedian(unittest.TestCase):
    def test_single(self):
        self.assertEqual(median([7]), 7)

    def test_odd_sorted(self):
        self.assertEqual(median([1, 3, 8]), 3)

    def test_odd_unsorted(self):
        self.assertEqual(median([8, 1, 3]), 3)

    def test_even(self):
        self.assertEqual(median([1, 2, 3, 4]), 2.5)

    def test_empty(self):
        with self.assertRaises(ValueError):
            median([])

if __name__ == "__main__":
    unittest.main()
```

对那个匆忙的 `median` 运行（用 `python3 -m unittest test_stats`；这里的输出有删节，只保留每个失败报告的最后几行）：

```console
$ python3 -m unittest test_stats
EF.F.
======================================================================
ERROR: test_empty (test_stats.TestMedian.test_empty)
----------------------------------------------------------------------
...
IndexError: list index out of range

======================================================================
FAIL: test_even (test_stats.TestMedian.test_even)
----------------------------------------------------------------------
...
AssertionError: 3 != 2.5

======================================================================
FAIL: test_odd_unsorted (test_stats.TestMedian.test_odd_unsorted)
----------------------------------------------------------------------
...
AssertionError: 1 != 3

----------------------------------------------------------------------
Ran 5 tests in 0.002s

FAILED (failures=2, errors=1)
```

第一行每个测试对应一个字符，按测试名字的字母序排列：`.` 通过，`F` 失败（某个断言为假），`E` 错误（意外的异常）。每份报告点出测试的名字，显示回溯和不匹配之处。五个测试中有三个揭示了三个不同的缺陷。修正后的函数对一份副本排序（不碰调用者的列表），处理两种奇偶情形，并抛出指定的异常：

```python
def median(xs):
    """Return the median of a non-empty list of numbers; xs is not changed.

    Raises ValueError if xs is empty.
    """
    if not xs:
        raise ValueError("median of an empty list")
    ys = sorted(xs)                      # 已排序的副本
    n = len(ys)
    mid = n // 2
    if n % 2 == 1:
        return ys[mid]
    return (ys[mid - 1] + ys[mid]) / 2
```

```console
$ python3 -m unittest test_stats
.....
----------------------------------------------------------------------
Ran 5 tests in 0.000s

OK
```

测试集与代码保存在一起。此后任何破坏这些情形之一的改动，都会在下次运行测试时被抓住。
:::
:::

小的例子也可以直接写在文档字符串里，写成 REPL 会话的形式。标准模块 `doctest` 会找到它们、运行它们并检查输出：

```python
def digit_sum(n):
    """Sum of the decimal digits of an integer n >= 0.

    >>> digit_sum(4096)
    19
    >>> digit_sum(0)
    0
    >>> digit_sum(10**20)
    1
    """
    if n < 10:
        return n
    return digit_sum(n // 10) + n % 10
```

`python3 -m doctest -v digits.py` 以 `3 tests in 2 items.`、`3 passed.` 和 `Test passed.` 结尾（两个 item 指模块和函数）。doctest 同时充当一种文档：它一旦过时就会有人察觉。

## 选择测试用例

测试的艺术，在于挑选少数很可能暴露出程序可能有的缺陷的输入。下面几条原则有帮助。

- **等价类。**把可能的输入划分为规格说明同等对待的若干类——对 `median` 而言：奇数长度、偶数长度；已排序、未排序；含重复元素——每类至少测试一个输入。
- **边界值。**错误聚集在类的边缘：允许的最小和最大输入，以及规格说明中每个阈值两侧的值。对[[programming-1/control-flow#ex-grade]]的学位分级，测试 $39$、$40$、$49$、$50$、$59$、$60$、$69$、$70$ 以及两个极端 $0$ 和 $100$。
- **特殊情形。**空集合、单个元素、所有元素相等、零、负数、非常大的数、空字符串、ASCII 之外的字符。
- **非法输入。**若规格说明规定了前置条件被违反时会发生什么（抛出异常），那也要测试。
- **已知答案。**与独立计算出的值比较：手工计算、用公式、用一个更慢但明显正确的程序。

只依据规格说明、不看代码而选择的测试是**黑盒**测试。**白盒**测试则是看着代码选择的，以确保代码的每一部分都被执行到。

::: definition 语句覆盖与分支覆盖 {#def-coverage}
若函数中的每条语句都至少被某个测试执行，则称测试集达到了该函数的**语句覆盖**；此外，若 `if` 或循环中的每个条件都被某个测试求值为真、也被某个测试求值为假——从而控制流图的每条边都被走过——则称达到**分支覆盖**。
:::

::: example 覆盖到了，却没有测到 {#ex-coverage}
下面的函数有一个缺陷。找一个执行了每条语句却仍通过的单一测试，再找一个会失败的测试。哪种覆盖本会迫使你找到它？

```python
def safe_reciprocal_ratio(a, b):
    """Return b / a, or 0 if b is 0. Requires a != 0."""
    r = 0
    if b != 0:
        r = a / b
    return 1 / r
```
::: solution
测试 `safe_reciprocal_ratio(1, 2)` 执行了全部四条语句：`r = 0`、条件测试、`r = a / b`（得到 $0.5$）以及 return，后者按规格说明给出 $2.0 = 2/1$。所以一个通过的测试就达到了 100% 的语句覆盖。但 `safe_reciprocal_ratio(1, 0)` 跳过了 `if` 的块，使 `r = 0` 保持不变，并抛出 `ZeroDivisionError` 而不是返回 $0$。分支覆盖要求条件 `b != 0` 在某个测试中为假，这正好迫使使用这个输入。（修法是直接计算规格说明规定的值：`return b / a if b != 0 else 0`。）
:::
:::

::: widget graph
nodes: Entry@0,1; Test@1,1; Body@2,2; Return@3,1
edges: Entry>Test; Test>Body; Body>Return; Test>Return
caption: `safe_reciprocal_ratio` 的控制流图。满足 `b != 0` 的测试走 Entry → Test → Body → Return，执行了每个结点（语句覆盖），却从不走 Test → Return 这条直连的边，而缺陷恰恰藏在那里。分支覆盖要求每条*边*都被走过。即便分支覆盖也不是保证：含 $k$ 个独立 `if` 语句的函数有多达 $2^k$ 条路径，而缺陷可能就潜伏在其中某一条上。
:::

覆盖率由工具度量（Python 可用第三方包 `coverage.py`），一份列出测试集从未执行过的行的报告，是缺失测试的良好指南。但覆盖率度量的是测试*运行了*什么，而不是*检查了*什么：一个只调用函数而忽略其结果的测试，覆盖了该函数却没有测试它。

::: quiz
对测试格里高利历闰年的函数 `is_leap(year)`，下面哪组输入是最佳选择？
- [ ] `2020, 2021, 2022, 2023, 2024`
- [x] `2023, 2024, 1900, 2000`
- [ ] `2000` 与 `2024`
- [ ] 1 到 3000 的每一年
::: solution
规格说明（[[programming-1/control-flow#ex-leap]]）有四个类：不能被 4 整除（`2023`）、能被 4 整除但不能被 100 整除（`2024`）、能被 100 整除但不能被 400 整除（`1900`）、能被 400 整除（`2000`）。每类取一年就检验了每条规则。连续五年——无论多少年——只检验前两个类，而且会漏掉经典的世纪年缺陷。穷举测试在这里是可行的，但证明不了多少东西，还需要一个独立的 oracle 来判定 3000 个答案，而且无法推广到输入空间大的函数。
:::
:::

### 针对参照实现的随机测试

当存在一种简单但缓慢的算出正确答案的方法时，它就可以充当快速、精巧版本的**神谕（oracle）**：生成许多随机输入，检查两者是否一致。这能找出你没有想到要测试的缺陷。

::: example 随机测试发现的缺陷 {#ex-random-test}
一个从[[programming-1/functions#ex-perfect]]粗心改写来的快速真因子和函数，对每个不超过 $\sqrt n$ 的因子 $d$ 都加上 `d + n // d`。在 1000 个随机输入上将它与一个缓慢的参照实现比较。
::: solution
```python
import random

def divisor_sum_fast(n):
    """Sum of the proper divisors of n >= 2 (buggy version)."""
    total = 1
    d = 2
    while d * d <= n:
        if n % d == 0:
            total += d + n // d          # 缺陷：当 d * d == n 时，d 被计了两次
        d += 1
    return total

def divisor_sum_slow(n):
    """Obviously correct, but slow, reference version."""
    return sum(d for d in range(1, n) if n % d == 0)

rng = random.Random(2026)                # 固定的种子：每次运行产生同样的"随机"测试
failures = []
for _ in range(1000):
    n = rng.randint(2, 10_000)
    if divisor_sum_fast(n) != divisor_sum_slow(n):
        failures.append(n)
print(len(failures), sorted(failures)[:5])
print(divisor_sum_fast(36), divisor_sum_slow(36))
```

```console
$ python3 randomtest.py
5 [121, 361, 1296, 3136, 9801]
61 55
```

每个失败的输入都是完全平方数（$11^2$、$19^2$、$36^2$、$56^2$、$99^2$），这直指缺陷：当 $d^2 = n$ 时，因子 $d$ 被加了两次（$36$ 的 $6$ 被计了两次，$61 = 55 + 6$）。随机数生成器用固定的**种子**创建，所以每次运行都生成同样的输入，任何失败都能重现。$2$ 到 $10{,}000$ 之间只有约 $1\%$ 的数是完全平方数，所以像 $6$、$28$、$220$ 这样手工挑选的测试很容易错过这个缺陷，而 $1000$ 次随机测试错过它的概率只有约 $(0.99)^{1000} \approx 4 \times 10^{-5}$。
:::
:::

::: widget plot
f: 1 - (1 - p)^x
x: 0, 3000
y: 0, 1
sliders: p=0.001:0.0001:0.01:0.0001
hlines: 0.95
labels: P(\text{在 } n \text{ 次随机测试中至少有一次发现它})
caption: 若一个缺陷被比例为 $p$ 的输入触发，且每次随机测试独立地选取输入，那么 $n$ 次测试发现它的概率是 $1 - (1-p)^n$。取 $p = 0.001$（默认值）时，约需 $3000$ 次测试才有 $95\%$ 的机会。把 $p$ 调小：由百万分之一的输入触发的缺陷几乎不可能被随机测试发现，这就是边界值和特殊情形仍须手工挑选的原因。
:::

同一思想放大之后就是**基于属性的测试**：不用 oracle，而是陈述每个正确输出都必须满足的性质（`sorted` 的输出是有序的，且是输入的一个重排；`decode(encode(s)) == s`），并在许多生成的输入上检验它。Python 的 Hypothesis 这类库把生成过程自动化，并且当测试失败时，把失败的输入收缩到很小。

## 调试

失败的测试告诉你有东西错了这一*事实*。调试则要弄清*错在哪里*。诱惑是盯着代码改来改去，直到症状消失；可靠的方法是把这次失败当作一个待解释的现象，用科学方法来对待。

1. **重现**失败，最好重现为一个自动化测试。一个你不能随心所欲重现的缺陷，就是你无法确知自己已经修复的缺陷。
2. **读懂证据。**回溯说明是什么异常、在哪一行、在怎样的调用链中。从下往上读。
3. **形成假设**，具体到可以检验："循环下标到达 `len(xs) - 1`，此时 `xs[i + 1]` 越界"。
4. **用实验检验假设**：打印涉及的变量值、在调试器中查看它们、或简化输入。若实验否定了假设，就形成新的假设。
5. **修复**成因而不是症状；然后重新运行整个测试集，并把失败的用例作为回归测试加进去。

::: example 一个差一错误 {#ex-gap}
下面的函数本应返回一个已排序列表相邻元素之间的最大差。调试它。

```python
def largest_gap(xs):
    """Largest difference between consecutive elements of a sorted list (len >= 2)."""
    best = 0
    for i in range(len(xs)):
        gap = xs[i + 1] - xs[i]
        if gap > best:
            best = gap
    return best

print(largest_gap([1, 4, 6, 13, 15]))
```
::: solution
**重现与阅读。**

```console
$ python3 gaps.py
Traceback (most recent call last):
  File ".../gaps.py", line 10, in <module>
    print(largest_gap([1, 4, 6, 13, 15]))
          ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^
  File ".../gaps.py", line 5, in largest_gap
    gap = xs[i + 1] - xs[i]
          ~~^^^^^^^
IndexError: list index out of range
```

行下的标记表明失败的操作是 `xs[i + 1]`，不是 `xs[i]`。**假设：**最后一次迭代中 `i + 1` 达到了 `len(xs)`。**实验：**在循环体开头加一条临时的 `print(f"i={i} len={len(xs)}")`，显示从 `i=0 len=5` 一直到 `i=4 len=5`，然后是回溯：最后一次迭代中 $i = 4$，而 $i + 1 = 5$ 越界。**修复：**相邻元素对只有 `len(xs) - 1` 对，所以循环应写成 `for i in range(len(xs) - 1):`。修正后的函数打印 `7`（从 $6$ 到 $13$ 的差），而 `largest_gap([5, 5])` 与 `largest_gap([-10, -3])` 分别给出 `0` 和 `7`，测试了只有两个元素的边界和负值。随后把临时的 `print` 删掉。
:::
:::

加 `print` 调用是最古老、也往往是最快的调试技术。要更近距离地观察，Python 内置了一个**调试器** `pdb`。调用内建函数 `breakpoint()` 会使程序在该行停下，并给出一个 `(Pdb)` 提示符，在那里你可以打印任何表达式（`p expr`）、单步执行到下一行（`n`）、步入一次调用（`s`）、继续运行到下一个断点（`c`）、显示调用栈（`w`）或退出（`q`）。下面是对带着缺陷的 `largest_gap`（`breakpoint()` 放在循环体开头）在列表 `[1, 4, 6]` 上的一次简短会话：

```console
$ python3 pdbdemo.py
> .../pdbdemo.py(4)largest_gap()
-> breakpoint()                        # stop here and open the debugger
(Pdb) p i, xs[i]
(0, 1)
(Pdb) c
> .../pdbdemo.py(4)largest_gap()
-> breakpoint()                        # stop here and open the debugger
(Pdb) p i, best
(1, 3)
(Pdb) c
> .../pdbdemo.py(4)largest_gap()
-> breakpoint()                        # stop here and open the debugger
(Pdb) p i, len(xs)
(2, 3)
(Pdb) q
Quitting pdb will kill the process. Quit anyway? [y/n] y
```

第三次停下时 $i = 2$ 而列表长度为 $3$，所以 `xs[i + 1]` 即将失败——不用编辑代码就确认了假设。（这次会话来自 Python 3.14，它的 `pdb` 在退出前要求确认。）图形化编辑器提供同样的功能，断点可以用鼠标点击设置。

### 用二分法定位缺陷

有时证据并不指向某一行：上个月还通过的测试今天失败了，而此后做了上百处改动；或者程序在一个一万行的输入文件上失败，你却看不出文件中哪一部分要紧。这时二分法——把[[programming-1/functions#alg-bisection]]的方法施于版本或输入而不是数——能用极少的实验找出罪魁祸首。

::: algorithm 对版本二分 {#alg-bisect-versions}
**输入：**一个程序的各个版本 $v_0, v_1, \dots, v_n$，已知 $v_0$ 通过某个测试而 $v_n$ 不通过它。**输出：**一个下标 $k$，使得 $v_{k-1}$ 通过而 $v_k$ 不通过。

1. 令 $lo \gets 0$，$hi \gets n$。
2. 当 $hi - lo > 1$：
   1. 令 $mid \gets \lfloor (lo + hi)/2\rfloor$，并在 $v_{mid}$ 上运行该测试。
   2. 若 $v_{mid}$ 通过，令 $lo \gets mid$；否则令 $hi \gets mid$。
3. 返回 $hi$。
:::

::: theorem 二分法能找到引入故障的变更 {#thm-bisect-versions}
[[#alg-bisect-versions]] 返回一个下标 $k$，使得 $v_{k-1}$ 通过而 $v_k$ 不通过，至多运行 $\lceil \log_2 n\rceil$ 次测试。
:::

::: proof
**不变式：**$v_{lo}$ 通过，$v_{hi}$ 不通过，且 $lo < hi$。初始时它成立。当 $hi - lo > 1$ 时，$lo < mid < hi$，而无论 $v_{mid}$ 上的测试结果是哪种，更新都使 $lo$ 处留着一个通过的版本、$hi$ 处留着一个不通过的版本，且 $lo < hi$。**终止性与计数：**长度 $hi - lo$ 由 $L$ 变为 $\lfloor L/2\rfloor$ 或 $\lceil L/2\rceil$，所以像[[programming-1/control-flow#thm-variant]]中那样，它是一个变体；$j$ 次测试后它至多为 $\lceil n/2^j\rceil$，一旦 $2^j \ge n$ 它就等于 $1$。**结果：**结束时 $hi = lo + 1$，$v_{lo} = v_{hi - 1}$ 通过而 $v_{hi}$ 不通过。
:::

注意这个定理*没有*假定什么：版本从通过变为不通过未必只发生一次。若翻转了好几次，二分仍然会找出*某对*相邻版本，其前者通过、后者不通过，这就是一处破坏测试的改动。版本控制系统把这自动化了：`git bisect` 在项目的历史上执行的正是这一搜索，而好版本与坏版本之间相隔一千次提交时，它至多需要十次测试运行。同样的对半缩小对输入也适用：删掉失败的输入文件的一半；若程序仍然失败，就留下这个更小的文件，否则试另一半。安德烈亚斯·塞勒（Andreas Zeller）的 **delta debugging**（差分调试）算法把它推广为自动找出一个极小的失败输入。

::: warning 乱改代码
缺陷难找时，人们总忍不住随手小改——这儿加个 `+ 1`，那儿把 `<` 换成 `<=`——直到测试通过为止。一个未经理解就使症状消失的改动，通常是在掩盖缺陷而不是消除缺陷，还常常为测试未覆盖的输入引入新的缺陷。如果你不能依据规格说明和代码解释这个修复*为什么*是正确的，你的调试就还没有完成。逐行向别人——或向一个无生命的物体（"橡皮鸭调试法"）——讲解代码，其有效程度令人惊讶，因为它迫使你说出每行代码*实际*在做什么，而不是你*本想*让它做什么。
:::

::: history
艾伦·图灵（Alan Turing）的短文 "Checking a large routine"（1949 年 6 月在剑桥的一次学术会议上宣读）已经提议程序员用关于程序状态的断言来注解程序并检查这些断言，预见了弗洛伊德（Floyd）与霍尔（Hoare）的不变式。用 "bug"（虫子）一词指缺陷比计算机更古老——托马斯·爱迪生（Thomas Edison）在 1870 年代就这么用过——但哈佛马克二号（Harvard Mark II）1947 年 9 月 9 日的日志，在"First actual case of bug being found"（第一次实际发现虫子致害）几个字旁贴着一只蛾子，使这个词成了计算机掌故的一部分。格伦福德·迈尔斯（Glenford Myers）的《软件测试的艺术》（The Art of Software Testing，1979）把测试用例设计系统化了。肯特·贝克（Kent Beck）为 Smalltalk 写的 SUnit 框架，以及他 1997 年与埃里希·伽玛（Erich Gamma）合写的 JUnit，使自动化单元测试框架得以普及，Python 的 `unittest`（自 Python 2.1（2001）起就在标准库中）正是它们的后继。科恩·克劳森（Koen Claessen）与约翰·休斯（John Hughes）用面向 Haskell 的 QuickCheck（2000）开创了基于属性的测试，安德烈亚斯·塞勒（Andreas Zeller）于 1999 年发表了 delta debugging。
:::

## 后续内容

测试与调试是你在后续每一门课中都要使用的技能。在[[program-design]]中，测试驱动更大程序的设计；在[[software-engineering]]中，测试作为大规模的学问来研究——集成测试与系统测试、持续集成、对没有任何个人能够完全理解的系统的测试策略。本课程遇到的正确性证明，将在[[programming-languages]]中生长为形式化验证，霍尔（Hoare）的断言逻辑在那里成为一种演算；而关于随机测试能发现什么的论证，将在[[algorithms]]中对随机算法的分析里重现。

::: summary
- 测试在选定的输入上依据**规格说明**检查程序（[[#def-test]]）；它们能揭示缺陷，却不能证明缺陷不存在。证明与测试相辅相成。
- `assert condition, message` 检查一个关于程序状态的信念（[[#def-assert]]）。断言在 `python3 -O` 之下会消失，所以绝不要拿它们来验证输入。
- 单元测试一次检查一个函数并自动运行（`unittest`、`doctest` 或 pytest）；把每个修复过的缺陷留作回归测试。
- 按等价类、边界值、特殊情形和非法输入来选择测试。语句覆盖弱于分支覆盖（[[#def-coverage]]），而两者都不能保证正确性。
- 针对缓慢但明显正确的 oracle 的随机测试，能发现谁也没想到的缺陷；给随机数生成器设定种子，使失败可以重现。被比例为 $p$ 的输入触发的缺陷，在 $n$ 次随机测试下仍逃过的概率是 $(1-p)^n$。
- 科学地调试：重现、读回溯、提出假设、做实验（用 `print` 或 `pdb`）、修复成因、重新运行全部测试。
- 对版本或输入二分，至多 $\lceil\log_2 n\rceil$ 次实验就能定位引入故障的改动（[[#thm-bisect-versions]]）。
:::

## 习题

::: exercise 边界值 {level=1 check="10"}
对[[programming-1/control-flow#ex-grade]]的 `grade(mark)`，成绩范围为 $0$ 到 $100$，列出边界值测试输入：两个极端，以及四个阈值 $40$、$50$、$60$、$70$ 两侧的值。（输入这些输入的个数。）
::: solution
两个极端 $0$ 和 $100$，以及 $39, 40$；$49, 50$；$59, 60$；$69, 70$：共十个输入，预期结果依次为 `fail`、`first`、`fail`、`third`、`third`、`lower second`、`lower second`、`upper second`、`upper second`、`first`。合在一起，它们能测出任何把 `>` 误写成 `>=`（或反过来）的阈值、任何差一的阈值，以及任何错误的测试次序。
:::
:::

::: exercise 这些断言做了什么？{level=1}
对每条语句，说出它是否抛出 `AssertionError`，以及程序用 `python3 -O` 运行时会有什么变化：`assert 1 + 1 == 2`、`assert []`、`assert [0]`、`assert len("abc") == 3, "length"`、`assert (False, "message")`。
::: solution
`assert 1 + 1 == 2` 通过。`assert []` 抛出 `AssertionError`，因为空列表是假值。`assert [0]` 通过：非空列表是真值，无论它装着什么。`assert len("abc") == 3, "length"` 通过。`assert (False, "message")` *通过*：圆括号组成了一个两元素的元组，而非空元组是真值——这是一个经典的错误，Python 会就此发出警告 `SyntaxWarning: assertion is always true, perhaps remove parentheses?`。本意的语句是 `assert False, "message"`。在 `-O` 之下它们一条都不会被执行，因此都不会抛出。
:::
:::

::: exercise 对提交历史二分 {level=1 check="10"}
某个测试在项目的一个版本上通过，而在 $1000$ 次提交之后的版本上失败。[[#alg-bisect-versions]] 至多需要多少次测试运行，才能找到破坏测试的那次提交？（输入次数。）
::: solution
由[[#thm-bisect-versions]]，至多 $\lceil \log_2 1000\rceil = 10$ 次，因为 $2^9 = 512 < 1000 \le 1024 = 2^{10}$。按顺序逐个提交测试则最多需要 $1000$ 次。
:::
:::

::: exercise 需要多少随机测试？{level=2 check="2995"}
一个缺陷被千分之一的输入触发（$p = 0.001$）。使发现该缺陷的概率至少为 $0.95$ 的独立随机测试次数 $n$ 的最小值是多少？（输入 $n$。）
::: solution
我们需要 $1 - (1 - p)^n \ge 0.95$，即 $(0.999)^n \le 0.05$，于是 $n \ge \dfrac{\ln 0.05}{\ln 0.999} = \dfrac{-2.99573}{-0.0010005} \approx 2994.2$。最小的整数是 $n = 2995$。一个有用的近似是 $n \approx 3/p$，因为 $\ln 0.05 \approx -3$ 且 $\ln(1 - p) \approx -p$。当 $n = 1000$ 时概率只有 $1 - 0.999^{1000} \approx 0.63$。
:::
:::

::: exercise 为 rotate 写单元测试 {level=2}
为[[programming-1/sequences]]习题中的 `rotate(xs, k)` 写一个 `unittest` 测试类，至少包含按本章原则选取的五个测试。说出每个测试覆盖的类或边界。
::: solution
```python
import unittest
from rotation import rotate

class TestRotate(unittest.TestCase):
    def test_typical(self):                       # 一个普通情形
        self.assertEqual(rotate([1, 2, 3, 4, 5], 2), [3, 4, 5, 1, 2])

    def test_zero_and_full(self):                 # 边界 k = 0 与 k = n
        self.assertEqual(rotate([1, 2, 3], 0), [1, 2, 3])
        self.assertEqual(rotate([1, 2, 3], 3), [1, 2, 3])

    def test_large_and_negative(self):            # k > n 与 k < 0
        self.assertEqual(rotate([1, 2, 3], 7), [2, 3, 1])
        self.assertEqual(rotate([1, 2, 3, 4, 5], -1), [5, 1, 2, 3, 4])

    def test_empty_and_single(self):              # 特殊情形
        self.assertEqual(rotate([], 4), [])
        self.assertEqual(rotate(["x"], 9), ["x"])

    def test_input_unchanged(self):               # 规格说明说返回"一个新列表"
        data = [1, 2, 3]
        rotate(data, 1)
        self.assertEqual(data, [1, 2, 3])

if __name__ == "__main__":
    unittest.main()
```

把 `rotate` 存进 `rotation.py` 后，`python3 -m unittest test_rotation` 会运行这五个测试并报告 `OK`。空列表测试是最可能抓住缺陷的那个：一个不先检查空列表就计算 `k % len(xs)` 的实现会抛出 `ZeroDivisionError`。
:::
:::

::: exercise 找出缺陷 {level=2}
这个函数本应返回列表中非负数的平均值（若一个也没有则返回 `None`）。设计能揭示缺陷的测试，然后修复它。

```python
def mean_non_negative(xs):
    total = 0
    for x in xs:
        if x >= 0:
            total += x
    if total == 0:
        return None
    return total / len(xs)
```
::: solution
两个缺陷。第一，除以的是 `len(xs)`，即*所有*元素的个数：`mean_non_negative([2, -5, 4])` 返回 $6/3 = 2.0$ 而不是 $3.0$。第二，`total == 0` 是"一个也没有"的错误检验：`mean_non_negative([0, 0])` 返回 `None` 而不是 `0.0`。一个含负元素的测试和一个非负元素全为零的测试会把它们揭示出来；而像 `[2, 4]` 这样的测试则会通过，把两者都掩盖住。修复要计数被选中的元素：

```python
def mean_non_negative(xs):
    """Mean of the elements of xs that are >= 0, or None if there are none."""
    chosen = [x for x in xs if x >= 0]
    if not chosen:
        return None
    return sum(chosen) / len(chosen)
```

现在 `[2, -5, 4]` 给出 `3.0`，`[0, 0]` 给出 `0.0`，而 `[-1]` 和 `[]` 给出 `None`。
:::
:::

::: exercise 语句覆盖不够 {level=3}
给出一个含两个 `if` 语句的函数和两个测试，它们合起来达到分支覆盖（每个条件都既有真也有假），却仍然错过一个只在两个条件同为真时才出现的缺陷。要覆盖一个含 $k$ 个独立 `if` 语句的函数的每条*路径*，需要多少个测试？
::: solution
```python
def price(base, member, sale):
    """Price after a 10% member discount and a 20% sale discount (both may apply)."""
    discount = 0
    if member:
        discount = 0.1
    if sale:
        discount = 0.2          # 缺陷：应为 discount += 0.2（或按乘法组合两个折扣）
    return base * (1 - discount)
```

测试 `price(100, True, False)`（预期 $90$）与 `price(100, False, True)`（预期 $80$）都通过，而且合起来每个条件各真一次、各假一次：完全的分支覆盖。但对促销期间的会员，函数返回 $80$ 而不是规格说明规定的价格（折扣若相加则为 $70$，若相乘则为 $72$——规格说明必须说清是哪一种，而写出这个测试会迫使做出这个决定）。缺陷在两个条件同为真的那条路径上，而两个测试都不走它。$k$ 个独立的 `if` 语句共有 $2^k$ 条路径，所以路径覆盖需要 $2^k$ 个测试——十个条件就是 $1024$ 个——这就是测试人员依赖等价类、依赖最可能要紧的交互，而不依赖穷举路径覆盖的原因。
:::
:::

::: exercise 针对 merge 的属性测试 {level=3}
为[[programming-1/sequences]]习题中的 `merge(xs, ys)` 写一个随机测试：对 500 对随机生成的已排序列表，检验刻画正确结果的两个性质——结果是有序的，且恰好包含 `xs` 和 `ys` 的全部元素。使用设定了种子的随机生成器。解释在这里检验 `merge(xs, ys) == sorted(xs + ys)` 为什么是一个等价的测试。
::: solution
```python
import random
from merging import merge

def is_sorted(zs):
    return all(zs[i] <= zs[i + 1] for i in range(len(zs) - 1))

rng = random.Random(1)
for trial in range(500):
    xs = sorted(rng.randint(-20, 20) for _ in range(rng.randint(0, 8)))
    ys = sorted(rng.randint(-20, 20) for _ in range(rng.randint(0, 8)))
    out = merge(xs, ys)
    assert is_sorted(out), (xs, ys, out)
    assert sorted(out) == sorted(xs + ys), (xs, ys, out)   # 相同的元素，相同的重数
print("all 500 trials passed")
```

用正确的 `merge`，这打印 `all 500 trials passed`；若是带缺陷的版本（例如忘记最后的 `extend` 调用），第一条失败的断言就会显示出事的列表，因为断言的消息是元组 `(xs, ys, out)`。长度取 $0$ 到 $8$、数值范围很小，使空列表和重复元素经常出现，而这正是归并缺陷藏身之地。与 `sorted(xs + ys)` 比较之所以等价，是因为一个既是有序的、又是给定多重集合的重排的数的列表是唯一的——任何多重集合的有序排列恰好只有一个——所以两条性质成立当且仅当 `out == sorted(xs + ys)`。
:::
:::
