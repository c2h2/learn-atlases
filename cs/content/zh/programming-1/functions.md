若一个数等于其所有小于自身的因子之和，则称该数为**完全数**：$6 = 1 + 2 + 3$ 与 $28 = 1 + 2 + 4 + 7 + 14$ 都是完全数。$10{,}000$ 以下有哪些数是完全数？用上一章的循环，你可以写出一段能回答这个问题的代码——一个遍历候选数的外层循环、一个遍历可能因子的内层循环、一个累加和、一次比较、一次打印——它确实能工作。但它难以阅读、难以测试，而当下一个问题（"哪几对数是**亲和数**？"）再次需要同样的因子和时，它也无法复用。

解决办法是给计算的各项部分起名字。"$n$ 的真因子之和"本身就是一个有意义的概念；把它写成一个名为 `divisor_sum` 的**函数**，检验它是对的，此后就可以像使用语言内建功能一样使用它。函数是程序中管理复杂性的主要工具：它们让你能思考一段代码做**什么**，而不必思考它是**如何**做到的。本章内容包括定义与调用函数、参数与返回值、决定函数能看到哪些名字的规则（**作用域**）、如何编写函数的契约，以及把函数作为值传递给其他函数。

## 定义与调用函数

::: definition 函数定义 {#def-function}
**函数定义**

```text
def name(parameter_1, ..., parameter_k):
    body
```

创建一个函数对象，并将其绑定到 `name`。**形参**是函数内部局部的名字。函数体中的**返回语句** `return expression` 会终止该函数的执行，并使该表达式的值成为本次调用的结果；执行到函数体末尾，或者使用不带表达式的 `return`，都返回 `None`。
:::

定义一个函数并不会运行它的函数体，只是把它记录下来。函数体在每次该函数被**调用**时执行，调用形如 `name(argument_1, ..., argument_k)`。调用中提供的值是**实际参数（实参）**；定义中的名字是**形式参数（形参）**。Python 关于调用的规则十分精确，值得明确写出，因为几乎所有关于函数的意外都可以由它解释。

::: definition 函数调用 {#def-call}
求值调用 `f(e_1, ..., e_k)` 的步骤：

1. 从左到右求值 `f` 与实参表达式 `e_1`、……、`e_k`；
2. 创建一个新的**帧（frame）**——为本次调用准备的一张全新的空局部名字表；
3. 在新帧中，把每个形参绑定到对应的实参值；
4. 执行 `f` 的函数体，在新帧中查找与赋值名字；
5. 当函数体执行 `return v`（或执行结束，此时 `v = None`）时，丢弃该帧，使 `v` 成为调用表达式的值，并让调用者从暂停处继续执行。
:::

```python
import math

def square(x):
    return x * x

def hypotenuse(a, b):
    """Length of the hypotenuse of a right triangle with legs a and b."""
    return math.sqrt(square(a) + square(b))

print(hypotenuse(3, 4))
print(hypotenuse(5, 12))
```

```console
$ python3 hyp.py
5.0
13.0
```

`import math` 这一行使命名为 `math` 的标准库模块可用，`math.sqrt` 是它的平方根函数。`hypotenuse` 第一行的字符串是**文档字符串（docstring）**：它记录函数做什么，Python 的 `help(hypotenuse)` 会把它显示出来。

::: example 逐帧追踪 {#ex-frames}
逐帧追踪 `hypotenuse(3, 4)` 的求值过程。
::: solution
1. 实参 `3` 与 `4` 先被求值。为 `hypotenuse` 创建一个帧，其中 `a = 3`、`b = 4`。
2. 函数体求值 `square(a) + square(b)`，先算左操作数。调用 `square(a)` 先求它的实参 `3`，并为 `square` 创建一个帧，其中 `x = 3`。该函数体返回 `9`，帧随即被丢弃。
3. 调用 `square(b)` 创建一个**新的** `square` 帧，这次 `x = 4`；它返回 `16` 后被丢弃。
4. 回到 `hypotenuse` 帧，`9 + 16` 是 `25`，`math.sqrt(25)` 是 `5.0`（一个浮点数）。`hypotenuse` 返回 `5.0`；它的帧被丢弃，`print` 显示该值。

在最深处，同时存在三个帧：程序的顶层帧（保存着 `math`、`square` 和 `hypotenuse`）、`hypotenuse` 的帧，以及一个 `square` 的帧。它们构成一个**调用栈**：每次调用压入一个帧，每次返回弹出一个帧。[[programming-1/recursion]] 将详细研究调用栈。
:::
:::

### 返回还是打印

打印结果的函数与返回结果的函数，在 REPL 中试验时看起来一样，实则大不相同。

::: example 打印还是返回？ {#ex-print-return}
这个程序打印什么？

```python
def double_print(x):
    print(2 * x)

def double_return(x):
    return 2 * x

a = double_print(5)
b = double_return(5)
print("a =", a)
print("b =", b)
print(double_return(double_return(5)))
```
::: solution
```console
$ python3 printret.py
10
a = None
b = 10
20
```

第一行 `10` 是在调用 `double_print(5)` 的**执行期间**打印出来的。该函数没有 `return`，所以它返回 `None`，而 `a` 引用的就是 `None`。`double_return(5)` 什么都不打印，但它的值 `10` 可供调用者使用：`b` 是 `10`，而且这个值可以直接传入另一次调用，得到 `20`。一个结果只是被打印而不是被返回的函数，只能被看到，却不能被**使用**。
:::
:::

::: warning `print` 不是 `return`
初学者常常编写打印答案而不是返回答案的函数，然后纳闷为什么 `total = add(2, 3)` 会让 `total` 等于 `None`。作为通则，一个计算某物的函数应当把它 `return` 回去，而把是否显示的决策留给它的调用者。打印应留在程序的最外层——顶层循环或 `main` 函数里——而计算放在返回值的函数里。这样的函数可以组合、复用，并能自动测试（[[programming-1/testing-debugging]]）。
:::

### 带默认值与关键字的参数

可以给形参指定**默认值**，在调用者没有提供该实参时使用；实参也可以**按关键字**传递，即指名对应的形参，此时它们的先后顺序无关紧要：

```python
def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet("Ada"))
print(greet("Alan", "Good morning"))
print(greet("Grace", punctuation="."))
print(greet(greeting="Hi", name="Edsger"))
```

```console
$ python3 defaults.py
Hello, Ada!
Good morning, Alan!
Hello, Grace.
Hi, Edsger!
```

位置实参从左到右与形参配对；关键字实参按名字配对；每个没有默认值的形参必须恰好接收一个值，否则调用会引发 `TypeError`。关键字实参使得带有许多选项的调用仍然可读：`round(x, ndigits=2)`、`print(a, b, sep=", ")`、`sorted(words, reverse=True)`。

::: warning 默认值只求值一次
默认值是在 `def` 语句执行时计算**一次**的——而不是在每次调用时。对数和字符串，这从来不成问题。但对一个可以被就地修改的值，比如列表，就有问题了：

```python
def add_item(item, basket=[]):     # 默认列表在定义时创建一次
    basket.append(item)
    return basket

print(add_item("apple"))
print(add_item("pear"))            # 意外：又是同一个列表
```

先打印 `['apple']`，再打印 `['apple', 'pear']`，因为两次调用共用同一个默认列表。标准的修复方法是用 `None` 作默认值，并在函数内部新建一个列表：`if basket is None: basket = []`。列表以及就地修改列表是 [[programming-1/sequences]] 的主题。
:::

## 作用域：函数能看到哪些名字

每次调用都有自己的帧，所以在函数内部赋值的名字不会与函数外部的名字相互干扰。决定一个名字指哪个绑定的规则称为**作用域**规则。

::: definition 局部作用域与全局作用域 {#def-scope}
在函数体的任何位置被赋值的名字（包括形参）对该函数是**局部的**：函数体中对它的每次使用，指的都是当前调用帧中的绑定。在函数中使用但未在其中赋值的名字，会沿着外层作用域查找：先在任何外层函数中，然后在模块的**全局**作用域（文件的顶层），最后在 Python 的**内建**名字（如 `print` 和 `len`）中。这一顺序常简记为 **LEGB**：local（局部）、enclosing（外层）、global（全局）、built-in（内建）。
:::

该规则在函数运行之前就由函数的**文本**决定：若某个名字在函数体的任何位置被赋值，那么它在整个函数体中都是局部的。

```python
x = "global"

def show():
    print("inside show:", x)       # 这里没有对 x 赋值，所以这个 x 是全局的那个

def shadow():
    x = "local"                    # 赋值使 x 成为 shadow 的局部变量
    print("inside shadow:", x)

show()
shadow()
print("outside:", x)
```

```console
$ python3 scope2.py
inside show: global
inside shadow: local
outside: global
```

::: example 一个未绑定的局部变量 {#ex-unbound}
解释这个程序产生的错误。

```python
count = 0

def increment():
    count = count + 1
    return count

print(increment())
```
::: solution
```console
$ python3 scope.py
Traceback (most recent call last):
  File ".../scope.py", line 7, in <module>
    print(increment())
          ~~~~~~~~~^^
  File ".../scope.py", line 4, in increment
    count = count + 1
            ^^^^^
UnboundLocalError: cannot access local variable 'count' where it is not associated with a value
```

由于 `count` 在 `increment` 的函数体中被赋值，它在整个 `increment` 函数体中都是局部的（[[#def-scope]]）。等号右侧的 `count + 1` 因此引用的是**局部**的 `count`，而它在本帧中尚未被赋予任何值——全局的 `count` 根本不会被查找。traceback 显示了两个帧，第 7 行的顶层调用和 `increment` 中出错的第 4 行：traceback 就是调用栈的打印结果。

Python 允许在函数开头写 `global count`，使赋值作用于全局名字，但更好的办法是把值传进来并返回新值：`def increment(count): return count + 1`，调用方式为 `count = increment(count)`。一个只通过参数和返回值通信的函数，理解和测试都要容易得多。
:::
:::

同样的道理可以解释为什么函数不能重新绑定调用者的变量。在 `x = 10` 之后，对 `def f(x): x = x + 1; return x` 的调用 `f(x)` 返回 `11`，但调用者的 `x` 仍然等于 `10`：形参 `x` 是另一个帧中的一个独立名字，绑定到同一个值，而赋值只重新绑定了局部名字。

::: quiz
下面这个程序打印什么？

```python
total = 5

def add(n):
    total = n + 1
    return total

result = add(10)
print(total, result)
```
- [ ] `11 11`
- [x] `5 11`
- [ ] `5 6`
- [ ] 会引发 `UnboundLocalError`。
::: solution
`total` 在 `add` 中被赋值，所以在 `add` 内部它是一个局部名字，与全局的 `total` 无关。调用把局部的 `total` 绑定到 `11` 并返回它，因此 `result` 是 `11`；全局的 `total` 仍是 `5`。不会引发 `UnboundLocalError`，因为局部的 `total` 在被读取**之前**已经赋值。
:::
:::

## 契约：规定函数做什么

要在不阅读函数体的情况下使用一个函数，你需要确切知道它承诺了什么。把这份承诺写下来，是良好程序设计的一大部分。

::: definition 规格说明 {#def-spec}
一个函数的**规格说明**（或**契约**）由以下两部分组成

- **前置条件**：调用函数时，实参（以及任何其他状态）必须满足的条件；以及
- **后置条件**：在前置条件成立时，函数对其返回值（以及任何效果）作出的保证。

若每个满足前置条件的调用都能终止并满足后置条件，则称该函数关于这份规格说明是**正确的**。若前置条件被违反，规格说明不作任何承诺。
:::

用平实的语言陈述契约，自然的位置是文档字符串："返回满足 $r^2 \le n$ 的最大整数 $r$。要求 $n \ge 0$。" 前置条件是调用者的责任，后置条件则是函数自己的责任。正是这种分工使构建大型程序成为可能：当结果出错时，契约告诉你是该查看调用者（它违反了前置条件）还是该查看函数（它违反了后置条件）。函数常常**检查**最重要的前置条件，若不满足就抛出异常，从而把一个无声的错误答案变成一个立即可见的错误。

契约还指导着问题应如何划分。**逐步求精**（stepwise refinement，或称自顶向下设计）从描述整个任务的函数开始，用尚不存在但契约清晰的辅助函数写出它的函数体，再以同样的方式编写每个辅助函数，直到每个函数都小到一眼就能确认正确。

::: example 用逐步求精求完全数 {#ex-perfect}
求 $10{,}000$ 以下的所有完全数。
::: solution
在最顶层，我们需要"打印 limit 以下的每个完全数"，这是一个用判定函数 `is_perfect(n)` 遍历候选数的循环；而该判定需要"$n$ 的真因子之和"。每一部分都有自己的函数和契约。

```python
def divisor_sum(n):
    """Sum of the divisors of n that are smaller than n, for n >= 1."""
    total = 1 if n > 1 else 0          # 1 整除每个大于 1 的 n
    d = 2
    while d * d <= n:
        if n % d == 0:
            total += d
            if d != n // d:            # 加上配对的因子，只加一次
                total += n // d
        d += 1
    return total

def is_perfect(n):
    """True if n equals the sum of its proper divisors."""
    return divisor_sum(n) == n

def perfect_numbers(limit):
    """Print every perfect number below limit."""
    for n in range(1, limit):
        if is_perfect(n):
            print(n, end=" ")
    print()

perfect_numbers(10_000)
print(divisor_sum(220), divisor_sum(284))
```

```console
$ python3 perfect.py
6 28 496 8128 
284 220
```

`divisor_sum` 用到了 [[programming-1/control-flow#ex-divisor]] 中的观察：因子成对出现，$d$ 与 $n/d$ 满足 $d \le \sqrt n$，所以它只尝试不超过 $\sqrt n$ 的 $d$，把每对因子都加上，并在 $n$ 为完全平方数时注意不把 $\sqrt n$ 加两次。由于这个巧妙之处被藏在一个小函数内部，它可以被单独检验：对 $3000$ 以下的每个 $n$，将它与虽慢但明显正确的 `sum(d for d in range(1, n) if n % d == 0)` 比较，结果毫无差异。`is_perfect` 与 `perfect_numbers` 则短得足以明显正确。最后一行表明 $220$ 与 $284$ 构成一对**亲和数对**：每个数都等于另一个数的真因子之和。
:::
:::

## 函数作为值

在 Python 中，函数就像其他值一样：它可以被绑定到另一个名字、存入列表、作为实参传递、作为结果返回。接受函数作为参数或返回函数的函数称为**高阶函数**。你其实已经用过这样一个函数：`sorted(words, key=len)` 把函数 `len` 传给 `sorted`，`sorted` 对每个元素调用它来决定顺序。`sorted(["pear", "Fig", "apple", "kiwi"], key=len)` 得到 `['Fig', 'pear', 'kiwi', 'apple']`，按长度排序（"pear" 与 "kiwi" 长度都是 4，保持原来的先后次序）。

一个只用一次的小函数可以用**λ表达式**内联写出：`lambda x: x * x - 2` 是一个以 `x` 为自变量、值为 `x * x - 2` 的函数。λ表达式的函数体必须是单个表达式；更长的东西就应该用 `def` 并给它一个名字。

把函数作为实参传递，能让一个算法适用于一整类问题。一个经典的数值例子是用**二分法**求根：若一个连续函数在某区间上变号，它在该区间内必有根，而反复对半缩小区间就能逼近这个根。（这背后的定理——介值定理——在[数学图谱：连续性](/learn/maths/lesson.php?c=calculus-1&l=continuity)中证明。）

::: algorithm 二分法 {#alg-bisection}
**输入：** 一个连续函数 $f$，满足 $f(lo)\,f(hi) \le 0$ 的数 $lo < hi$，容差 $\tau > 0$。**输出：** 一个与 $f$ 在 $[lo, hi]$ 内某个根的距离不超过 $\tau$ 的数。

1. 当 $hi - lo > 2\tau$ 时：
   1. 令 $mid \gets (lo + hi)/2$。
   2. 若 $f(lo)\,f(mid) \le 0$，令 $hi \gets mid$；否则令 $lo \gets mid$。
2. 返回 $(lo + hi)/2$。
:::

```python
def bisect(f, lo, hi, tol=1e-9):
    """Return x in [lo, hi] within tol of a root of f.

    Requires: f continuous on [lo, hi] and f(lo), f(hi) of opposite signs (or zero).
    """
    if f(lo) * f(hi) > 0:
        raise ValueError("f(lo) and f(hi) must have opposite signs")
    while hi - lo > 2 * tol:
        mid = (lo + hi) / 2
        if f(lo) * f(mid) <= 0:      # 根位于 [lo, mid] 内
            hi = mid
        else:                        # 否则根位于 [mid, hi] 内
            lo = mid
    return (lo + hi) / 2

def g(x):
    return x * x - 2

print(bisect(g, 0, 2))
print(bisect(lambda x: x ** 3 - x - 2, 1, 2))
```

```console
$ python3 bisect.py
1.4142135614529252
1.5213797064498067
```

`bisect` 对 $x^2 - 2$ 一无所知；它只调用交给它的那个函数。第一个调用在 $10^{-9}$ 的误差内求出 $\sqrt 2 \approx 1.41421356237$，第二个调用求出 $x^3 - x - 2$ 的实根。`raise` 语句检查前置条件，若不满足就带着清晰的错误信息终止，这在 [[programming-1/files-exceptions]] 中讨论过。

::: theorem 二分法的正确性 {#thm-bisection}
在其前置条件下，[[#alg-bisection]] 在 $k = \max\bigl(0, \lceil \log_2 \frac{hi_0 - lo_0}{2\tau} \rceil\bigr)$ 次迭代后终止，其中 $lo_0, hi_0$ 是初始端点，并且返回一个与 $f$ 的某个根的距离不超过 $\tau$ 的数。
:::

::: proof
**不变式：** $lo_0 \le lo < hi \le hi_0$，$f(lo)\,f(hi) \le 0$，且经过 $j$ 次迭代后 $hi - lo = (hi_0 - lo_0)/2^j$。初始时它成立。在某次迭代中，若 $f(lo) f(mid) \le 0$，我们保留 $lo$ 并令 $hi \gets mid$，新的端点对满足符号条件。否则 $f(lo) f(mid) > 0$，于是 $f(lo)$ 与 $f(mid)$ 非零且同号；由于 $f(lo) f(hi) \le 0$，$f(hi)$ 为零或与 $f(lo)$ 异号，从而与 $f(mid)$ 异号，故 $f(mid) f(hi) \le 0$，新的端点对 $(mid, hi)$ 满足条件。无论哪种情形，区间长度都减半。

**终止性：** 当 $(hi_0 - lo_0)/2^j > 2\tau$，即 $2^j < (hi_0 - lo_0)/(2\tau)$ 时循环继续；所以它在满足 $2^j \ge (hi_0 - lo_0)/(2\tau)$ 的最小 $j$ 处停止，即所述的 $k$。

**结果：** 结束时 $f(lo) f(hi) \le 0$ 且 $f$ 连续，由介值定理，$f$ 在 $[lo, hi]$ 内有根 $r$。返回的中点与 $[lo, hi]$ 中每一点的距离至多为 $(hi - lo)/2 \le \tau$，特别地，与 $r$ 也是如此。（这是关于精确实数运算的论证；使用浮点数时，计算出的中点会被舍入，这只在 $\tau$ 接近根附近浮点数的间距时才有影响。）
:::

::: widget plot
f: x^2 - 2
x: 0, 2
y: -2.5, 2.5
vlines: 1; 1.5; 1.25; 1.375; 1.4375
points: 1.41421356, 0
hlines: 0
caption: 对 $[0, 2]$ 上的 $f(x) = x^2 - 2$ 二分的前五个中点：$1$（此处 $f < 0$，故根在其右侧）、$1.5$（$f > 0$，根在其左侧）、$1.25$、$1.375$ 与 $1.4375$，逐步逼近 $\sqrt 2 \approx 1.4142$（图中标出的点）。五步之后，可知根位于 $[1.375, 1.4375]$ 内，区间长度 $2/2^5 = 0.0625$。无论函数是什么，每一步都多得一个二进制数字的精度——速度虽慢，却完全可靠。
:::

函数也可以**返回**函数。内层函数记得它被创建时所在外层调用的那些名字——这样的函数称为**闭包**：

```python
def compose(f, g):
    """Return the function x -> f(g(x))."""
    def h(x):
        return f(g(x))
    return h

inc = lambda x: x + 1
dbl = lambda x: 2 * x
print(compose(inc, dbl)(5), compose(dbl, inc)(5))
```

打印 `11 12`：$(\text{inc} \circ \text{dbl})(5) = 2\cdot5 + 1 = 11$，而 $(\text{dbl}\circ\text{inc})(5) = 2(5 + 1) = 12$。函数的复合，无论在程序中还是在数学中，都是不可交换的。

::: widget mapping
domain: -2; -1; 0; 1; 2
codomain: 0; 1; 4
map: -2>4; -1>1; 0>0; 1>1; 2>4
then: 0>even; 1>odd; 4>even
target: even; odd
caption: Python 函数计算的是数学函数：`square` 把每个整数送到它的平方，`parity` 把一个数送到 `"even"` 或 `"odd"`。图中画出这两个函数以及它们的复合 `parity(square(x))`。注意 `square` 不是单射（$-2$ 与 $2$ 都映到 $4$），所以没有任何函数能从 `square(x)` 恢复出 $x$。把一个箭头拖到新的像上可以改变对应关系，观察复合及其性质随之更新。（程序中的函数能做的事情比数学函数更多——打印、读文件、依赖全局状态——而一个函数若这些都不做、其结果只依赖于它的参数，就称为**纯函数**。）
:::

::: history
**子程序**的历史与存储程序计算机一样久远。剑桥的 EDSAC 于 1949 年运行了第一个程序，大卫·惠勒（David Wheeler）为它设计了"惠勒跳转"（Wheeler jump），一种调用子程序并返回调用者的方法；莫里斯·威尔克斯（Maurice Wilkes）、惠勒与斯坦利·吉尔（Stanley Gill）合著的《The Preparation of Programs for an Electronic Digital Computer》（1951）是第一本程序设计著作，描述了一个这样的子程序库。ALGOL 60 引入了带参数的过程与真正嵌套的局部作用域。尼克劳斯·维尔特（Niklaus Wirth）的论文 "Program development by stepwise refinement"（《Communications of the ACM》，1971）把分解为小的、有规格说明的部分变成了一种方法；戴维·帕纳斯（David Parnas）的 "On the criteria to be used in decomposing systems into modules"（1972）则论证了每个模块都应把一个设计决策隐藏在接口之后——这正是本章每一个契约背后的思想。λ表达式源自丘奇（Church）1930 年代的 λ演算，经由约翰·麦卡锡（John McCarthy）的 LISP（1958–1960）传入程序设计语言。
:::

## 后续内容

函数是本课程后续部分赖以构建的单元。[[programming-1/recursion]] 让函数调用自身，从而对本身按更小实例定义的问题给出优雅的解法；[[programming-1/testing-debugging]] 依据契约对函数进行测试；[[programming-1/files-exceptions]] 展示函数如何指出它的前置条件被违反。在 [[program-design]] 中，函数成长为模块与类；在 [[programming-languages]] 中，这里遇到的作用域规则与闭包将作为语言设计决策来研究。

::: summary
- 函数定义把一个名字绑定到一个函数；调用先求值实参，创建一个新**帧**，把形参绑定到实参值，运行函数体并返回一个值（没有 `return` 时返回 `None`）（[[#def-call]]）。
- 返回结果而不是打印结果；打印属于程序的最外层。
- 默认值只求值一次，即定义之时；关键字实参按名字与形参配对。
- 在函数内任何位置被赋值的名字在整个函数内都是**局部的**；其他名字依次在外层、全局与内建作用域中查找（LEGB）（[[#def-scope]]）。函数不能重新绑定调用者的变量。
- **规格说明**给出前置条件（调用者的责任）与后置条件（函数的承诺）（[[#def-spec]]）；逐步求精把一个任务分解为契约清晰的若干函数。
- 函数是值：可以被传递（`sorted(key=…)`、`bisect(f, …)`）、被返回（闭包），也可以用 `lambda` 内联写出。二分法约在 $\log_2((hi - lo)/2\tau)$ 步内把根定位到容差 $\tau$ 之内（[[#thm-bisection]]）。
:::

## 习题

::: exercise 嵌套调用 {level=1 check="31"}
这个程序打印什么？（输入这个数。）

```python
def f(x):
    return 3 * x - 1

def g(y):
    return f(y) + f(y + 1)

print(g(f(2)))
```
::: solution
先求值实参：`f(2)` 是 $3 \cdot 2 - 1 = 5$。然后 `g(5)` 求值 `f(5) + f(6)` $= 14 + 17 = 31$。程序打印 `31`。
:::
:::

::: exercise 形参是局部的 {level=1}
这个程序打印什么？用帧解释。

```python
x = 10

def f(x):
    x = x + 1
    return x

y = f(x)
print(x, y)
```
::: solution
打印 `10 11`。调用 `f(x)` 把实参求值为 $10$，并创建一个帧，其中**形参** `x` 绑定到 $10$。赋值 `x = x + 1` 把局部 `x` 重新绑定到 $11$，函数返回 $11$。全局 `x` 是另一个帧中的另一个名字，仍指向 $10$。
:::
:::

::: exercise 一个带契约的函数 {level=1}
编写函数 `fahrenheit(celsius)`，用文档字符串陈述其契约；再编写函数 `describe(celsius)`，它调用前者并返回形如 `'21.5 °C = 70.7 °F'` 的字符串。这两个函数中哪一个应该调用 `print`？
::: solution
```python
def fahrenheit(celsius):
    """Return the Fahrenheit equivalent of a temperature in degrees Celsius.

    Requires: celsius is a number (int or float).
    """
    return celsius * 9 / 5 + 32

def describe(celsius):
    """Return a one-line description such as '21.5 °C = 70.7 °F'."""
    return f"{celsius} °C = {fahrenheit(celsius)} °F"

print(describe(21.5))
```

这打印 `21.5 °C = 70.7 °F`。两个函数都不应该打印：它们都计算并返回函数值，由顶层唯一的一个 `print` 负责显示结果。这样 `fahrenheit` 可以在计算中复用，两者也都可以通过比较返回值来测试（$100\,°\text{C}$ 应给出 $212.0$，$-40$ 应给出 $-40.0$）。
:::
:::

::: exercise 亲和数 {level=2 check="284"}
利用 [[#ex-perfect]] 中的 `divisor_sum`，计算 `divisor_sum(220)`。然后编写函数 `is_amicable(a)`：若 `b = divisor_sum(a)` 与 `a` 不同且 `divisor_sum(b) == a`，返回 `True`。（输入 `divisor_sum(220)`。）
::: solution
$220 = 2^2 \cdot 5 \cdot 11$ 的真因子为 $1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110$，其和为 $284$。而 $284 = 2^2 \cdot 71$ 的真因子为 $1, 2, 4, 71, 142$，其和为 $220$。

```python
def is_amicable(a):
    """True if a is a member of an amicable pair (a != b, d(a) == b, d(b) == a)."""
    b = divisor_sum(a)
    return b != a and divisor_sum(b) == a
```

条件 `b != a` 排除了完全数，因为完全数满足 $d(a) = a$。对 $1 \le a < 10{,}000$ 遍历 `is_amicable` 会得到 $220, 284, 1184, 1210, 2620, 2924, 5020, 5564, 6232, 6368$——五对。
:::
:::

::: exercise 二分法需要多少步？ {level=2 check="20"}
二分法（[[#alg-bisection]]）从长度 $2$ 的区间出发，容差 $\tau = 10^{-6}$。它执行多少次迭代？（输入次数。）
::: solution
由 [[#thm-bisection]]，迭代次数是满足 $2^k \ge \dfrac{hi_0 - lo_0}{2\tau} = \dfrac{2}{2\times10^{-6}} = 10^6$ 的最小 $k$。由于 $2^{19} = 524{,}288 < 10^6 \le 1{,}048{,}576 = 2^{20}$，$k = 20$。精度每再提高 $10$ 倍，约需多花 $\log_2 10 \approx 3.3$ 次迭代。
:::
:::

::: exercise 共享的默认值 {level=2}
解释"默认值只求值一次"那条警告中程序输出的原因。然后预测下面程序的输出

```python
def counter(n, seen=[]):
    seen.append(n)
    return len(seen)

print(counter(1), counter(2), counter(3))
```
::: solution
`def` 语句对 `[]` 求值一次，并把那个列表存为 `seen` 的默认值。每个没有传入 `seen` 的调用都使用同一个列表，所以一次调用中追加的值在下一次调用里仍然存在。这里三次调用向同一个列表追加，程序打印 `1 2 3`。（若改用 `seen=None` 并写 `if seen is None: seen = []`，每次调用都会得到一个新列表，程序将打印 `1 1 1`。）
:::
:::

::: exercise 把一个函数应用 n 次 {level=3}
编写函数 `repeat(f, n)`，返回一个新函数，它把 `f` 对其参数应用 $n$ 次（$n = 0$ 时为恒等函数）。用它从 $1$ 出发计算 $2^{10}$。然后解释下面这种写法为什么是错的：

```python
def repeat_bad(f, n):
    for _ in range(n):
        f = compose(f, f)
    return f
```
::: solution
```python
def repeat(f, n):
    """Return the function that applies f n times (n >= 0)."""
    def h(x):
        for _ in range(n):
            x = f(x)
        return x
    return h

dbl = lambda x: 2 * x
print(repeat(dbl, 10)(1))    # 1024
```

`h` 是一个闭包：它记得创建它的那次 `repeat` 调用中的 `f` 和 `n`。（名字 `_` 是循环变量的取值不被使用时的惯用写法。）

`repeat_bad` 在每一步把应用次数**加倍**而不是加一：第一次迭代后 `f` 应用原函数 $2$ 次，第二次后 $4$ 次，$n$ 次迭代后 $2^n$ 次。所以 `repeat_bad(dbl, 3)(1)` 是 $2^{8} = 256$，而不是 $8$。（对 $n = 0$，两个版本都返回一个等价于恒等函数的函数——`repeat_bad` 返回 `f` 本身，这同样是错的。）
:::
:::

::: exercise 一个前置条件与一个证明 {level=3}
下面的函数意在返回数字 `d`（$0 \le d \le 9$）在整数 `n` 的十进制表示中出现的次数。给出一个使该函数正确的前置条件，在该前置条件下证明它正确，并给出一个满足 `n >= 0` 而使其出错的输入。

```python
def count_digit(n, d):
    count = 0
    while n > 0:
        if n % 10 == d:
            count += 1
        n = n // 10
    return count
```
::: solution
**反例：** `count_digit(0, 0)` 返回 $0$，但 $0$ 的十进制表示是 `0`，其中含有一个 $0$。负的 `n` 也是错的：循环一次都不执行，所以 `count_digit(-55, 5)` 给出 $0$。

**前置条件：** `n >= 1` 且 `0 <= d <= 9`。**后置条件：** 结果是 `d` 在 `n` 的十进制数字中出现的次数。

**证明。** 记 $n_0$ 为初始值。**不变式：** `count` 等于到目前为止已从右端去掉的 $n_0$ 的数字中 $d$ 出现的次数，而 `n` 是由剩余数字组成的数（若无剩余则为 $0$）。初始时什么都没去掉，且 $n = n_0$。在一次 $n > 0$ 的迭代中，`n % 10` 是最后剩下的数字；当它等于 $d$ 时 `count` 恰好加一，而 `n // 10` 把它去掉，故不变式保持。**变体：** $n$ 本身，一个非负整数，在 $n > 0$ 时严格递减。结束时 $n = 0$，所以 $n_0$ 的每个数字都已被去掉，`count` 就是出现总次数。由于 $n_0 \ge 1$ 没有前导零，"去掉的数字"恰是 $n_0$ 的十进制数字。（若要处理 $0$，单独讨论：`if n == 0: return 1 if d == 0 else 0`。）
:::
:::
