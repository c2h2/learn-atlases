下面是三个小函数。第一个把 $a$ 到 $b$ 的整数加起来，第二个把它们的立方加起来，第三个把某个级数的项 $\frac{1}{1\cdot 3} + \frac{1}{5\cdot 7} + \frac{1}{9 \cdot 11} + \cdots$ 加起来——这个级数收敛得非常慢，极限是 $\pi/8$。

```text
def sum_ints(a, b):          def sum_cubes(a, b):            def pi_sum(a, b):
    total = 0                    total = 0                       total = 0
    while a <= b:                while a <= b:                   while a <= b:
        total += a                   total += a ** 3                 total += 1 / (a * (a + 2))
        a = a + 1                    a = a + 1                       a = a + 4
    return total                 return total                    return total
```

它们是同一个函数写三遍。只有两处不同：每个值所加的*项*，以及从一个值到下一个值的*步长*。在数学里，我们会用同一个记号写出这三者：$\sum_{n=a}^{b} f(n)$，其中项 $f$ 是一个参数。一门允许把函数作为实参传递的程序设计语言也能让我们做到同样的事：把模式写一遍，然后把项和步长作为函数提供进去。

这就是参数化抽象（[[program-design/abstraction-specifications]]）用在*行为*而非数据上，事实证明它是程序设计中最有生产力的想法之一。本章内容包括：函数作为值；三驾马车 `map`、`filter` 与 `reduce` 及它们遵守的定律；λ表达式与闭包；以及由函数构造函数的函数——复合、部分应用与装饰器。[[programming-1/functions]] 初步接触过这些思想；在这里，它们成为一件设计工具。

## 函数作为值

::: definition 第一类函数、高阶函数 {#def-hof}
若函数是与其他值同样的值——可以被绑定到名字、存放在数据结构中、作为实参传递、作为结果返回——这门语言就有**第一类函数**。**高阶函数**是这样一个函数：它以函数为实参，或以函数为结果。
:::

在 Python 中，`def` 创建一个函数对象并把它绑定到一个名字上，与一条赋值完全一样。这个名字可以重新绑定，这个对象也可以传来传去：

```python
def sum_series(term, a, next, b):
    """Requires: next(x) > x for all x.
    Effects:  returns term(a) + term(next(a)) + term(next(next(a))) + ...
              over all those values that are <= b."""
    total = 0
    while a <= b:
        total += term(a)
        a = next(a)
    return total

def inc(n):  return n + 1
def cube(n): return n ** 3

print(sum_series(cube, 1, inc, 10))
print(sum_series(lambda n: n, 1, inc, 100))
pi8 = sum_series(lambda k: 1 / (k * (k + 2)), 1, lambda k: k + 4, 10_000)
print(8 * pi8)
```

```console
$ python3 series.py
3025
5050
3.141392653591789
```

`sum_series` 给一般的想法起了名字：在 $n$ 的一个序列上求 $\sum f(n)$；原来的三个函数变成了单行的调用。前置条件 `next(x) > x` 保证终止：值是递增的，而这里它们是整数，所以终将超过 `b`。（$\pi$ 级数加了 $2500$ 项之后，小数第四位仍然是错的，这是交错型级数收敛缓慢的一个实例。）

### 返回函数的函数

高阶函数也可以*制造*函数。$f$ 的导数是一个函数，因此用一个返回函数的函数来计算它就是自然而然的事。对光滑的 $f$，中心差商 $\frac{f(x+h) - f(x-h)}{2h}$ 以与 $h^2$ 成正比的误差逼近 $f'(x)$，只要 $h$ 不至于小到舍入误差占上风。下文要用的牛顿法，其分析见 [Maths Atlas：求根](/learn/maths/lesson.php?c=numerical-analysis&l=root-finding)。

```python
def deriv(f, h=1e-6):
    """Effects: returns a function approximating the derivative of f."""
    return lambda x: (f(x + h) - f(x - h)) / (2 * h)

def newton(f, x, tol=1e-12, max_steps=50):
    """Newton's method from the starting point x.
    Effects: returns (r, steps) with abs(f(r)) < tol, or raises ArithmeticError."""
    df = deriv(f)
    for step in range(max_steps):
        fx = f(x)
        if abs(fx) < tol:
            return x, step
        x = x - fx / df(x)           # x 处的切线在这里穿过零
    raise ArithmeticError("Newton's method did not converge")

cube = lambda x: x ** 3
print(deriv(cube)(5))
print(newton(lambda x: x * x - 2, 1.0))
print(newton(lambda x: x ** 3 - 2 * x - 5, 2.0))
```

```console
$ python3 newton.py
75.0000000167006
(1.4142135623730951, 5)
(2.0945514815423265, 4)
```

`deriv(cube)` 是一个新函数，而 `deriv(cube)(5)` 应用它，得到 $3 \cdot 5^2 = 75$，误差不超过约 $2 \times 10^{-8}$。`newton` 内部使用 `deriv`，所以它只需要 $f$ 本身：它用五步找到 $\sqrt 2$，用四步找到 $x^3 - 2x - 5$ 的根——牛顿本人演示该方法用的正是这个三次方程。两个函数都不了解它们所得到的函数的任何情况；每一个都只实现一个数学思想，而且只实现一次。

::: widget plot
f: x^3 - 2*x - 5
x: 0.5, 3.5
y: -10, 25
tangent: 3
hlines: 0
points: 2.0945515, 0
caption: 对 $f(x) = x^3 - 2x - 5$ 使用牛顿法。拖动切点：切线与 $x$ 轴交于 $x - f(x)/f'(x)$，即下一个迭代点。从 $x = 3$ 出发，切线的落点在 $2.36$ 附近；把点拖到那里，下一条切线的落点在 $2.13$ 附近，迅速逼近根 $2.0946$（图中已标出）。把点移到 $x \approx 0.82$ 附近——那里 $f'(x) = 3x^2 - 2 = 0$——切线变得水平——这一步 `fx / df(x)` 几乎在除以零，方法可能被甩到很远的地方。
:::

::: example 跟踪一个被返回的函数 {#ex-deriv-trace}
跟踪 `d = deriv(cube); d(5)`。当 `d(5)` 运行、而 `deriv` 早已返回很久之后，λ表达式内部用到的名字 `f` 与 `h` 从哪里来？
::: solution
1. `deriv(cube)` 创建一个帧，其中 `f` 绑定到立方函数，`h = 1e-6`。它的函数体求值 `lambda` 表达式，从而创建一个函数对象。这个对象不仅记录它的代码 `(f(x + h) - f(x - h)) / (2 * h)`，还记录一个对它创建时所在帧的引用。
2. `deriv` 返回这个函数对象，`d` 给它命名。通常一个已返回的调用的帧会被丢弃；这个帧却存活下来，因为函数对象还引用着它。
3. `d(5)` 为这个 λ表达式创建一个 `x = 5` 的新帧。求值函数体时，`x` 在这个帧中找到，而 `f` 与 `h` 不在，于是 Python 到外层帧——`deriv` 那个存活的帧——中去寻找，找到立方函数与 `1e-6`。
4. 结果是 $(125.000075\ldots - 124.999925\ldots) / (2\times10^{-6}) \approx 75$。

一个函数连同它被创建时所在的环境就是一个**闭包**，这正是 [[programming-1/functions]] 中 LEGB 规则的 enclosing（外层）一层。
:::
:::

## Map、filter 与 reduce

三个高阶函数包揽了序列上的大多数循环。每个函数都用一次点名了模式的调用，取代一种常见的循环模式。

::: definition Map、filter 与折叠 {#def-map-filter-reduce}
对序列 $xs = [x_1, \dots, x_n]$：

- $\mathrm{map}(f, xs) = [f(x_1), \dots, f(x_n)]$ 把 $f$ 施加到每个元素上；
- $\mathrm{filter}(p, xs)$ 是使 $p(x_i)$ 为真的那些 $x_i$ 组成的子序列，保持原有顺序；
- **左折叠** $\mathrm{foldl}(\oplus, e, xs) = (\cdots((e \oplus x_1) \oplus x_2) \oplus \cdots) \oplus x_n$ 从 $e$ 出发，用一个二元函数 $\oplus$ 依次合并各元素；**右折叠** $\mathrm{foldr}(\oplus, e, xs) = x_1 \oplus (x_2 \oplus (\cdots \oplus (x_n \oplus e)\cdots))$ 从右向左加括号。对空序列，两者都是 $e$。
:::

Python 把 `map(f, xs)` 与 `filter(p, xs)` 作为内建函数提供——两者都返回惰性迭代器，所以要套上 `list(...)` 才能看到其中的元素（其原因见 [[program-design/iterators-generators]]）——并把左折叠提供为 `functools.reduce(op, xs, e)`。

```python
from functools import reduce
import operator

xs = [3, 1, 4, 1, 5, 9, 2, 6]
print(list(map(lambda x: x * x, xs)))
print(list(filter(lambda x: x % 2 == 0, xs)))
print(reduce(operator.add, xs, 0), reduce(operator.mul, xs, 1), reduce(max, xs))
print(reduce(lambda acc, d: 10 * acc + d, [2, 0, 2, 6], 0))
print(reduce(lambda acc, w: acc + len(w), ["map", "filter", "reduce"], 0))
words = ["kiwi", "Fig", "apple", "pear"]
print([w.upper() for w in words if len(w) == 4])
print(list(map(str.upper, filter(lambda w: len(w) == 4, words))))
```

```console
$ python3 mfr.py
[9, 1, 16, 1, 25, 81, 4, 36]
[4, 2, 6]
31 6480 9
2026
15
['KIWI', 'PEAR']
['KIWI', 'PEAR']
```

operator 模块为 Python 的运算符提供了具名函数（`operator.add` 就是 `lambda a, b: a + b`）。不带初值的 `reduce(max, xs)` 从第一个元素开始；对一个空列表它会抛出 `TypeError`，所以只要序列可能为空就该给出初值。用 `10 * acc + d` 做的这个折叠就是霍纳法则（Horner's rule），把一个数字列表变成一个数。

最后两行算的是同一个东西：列表推导式 `[f(x) for x in xs if p(x)]` 是 map 与 filter 的一种组合，只是语法更友好，而当函数是内联写出的时，在 Python 中通常更受欢迎。当函数本来就有名字时——如 `str.upper`——`map` 与 `filter` 读起来更好。

::: algorithm 左折叠 {#alg-foldl}
**输入：** 一个二元函数 $\oplus$、一个初值 $e$、一个序列 $x_1, \dots, x_n$。**输出：** $\mathrm{foldl}(\oplus, e, xs)$。

1. $acc \gets e$。
2. 对 $i = 1, \dots, n$：$acc \gets acc \oplus x_i$。
3. 返回 $acc$。
:::

循环不变式是"$acc = \mathrm{foldl}(\oplus, e, [x_1, \dots, x_i])$"，而这个折叠的代价是 $\oplus$ 的 $n$ 次应用。你写过的每一个累加循环——求和、计数、求最大值、拼字符串——都是用某个特定的 $\oplus$ 实例化这一算法的结果。

::: example 折叠顺序何时要紧 {#ex-fold-order}
计算 $\mathrm{foldl}(-, 0, [1, 2, 3])$ 与 $\mathrm{foldr}(-, 0, [1, 2, 3])$，并解释为什么它们不同，而 $+$ 的两个折叠却一致。
::: solution
$\mathrm{foldl}(-, 0, [1, 2, 3]) = ((0 - 1) - 2) - 3 = -6$，而 $\mathrm{foldr}(-, 0, [1, 2, 3]) = 1 - (2 - (3 - 0)) = 1 - (2 - 3) = 2$。用代码表示：

```python
from functools import reduce

def foldr(op, xs, e):
    acc = e
    for x in reversed(xs):           # 从右端开始合并
        acc = op(x, acc)
    return acc

print(reduce(lambda a, x: a - x, [1, 2, 3], 0), foldr(lambda x, a: x - a, [1, 2, 3], 0))
print(reduce(lambda a, x: a + x, [1, 2, 3], 0), foldr(lambda x, a: x + a, [1, 2, 3], 0))
```

```console
$ python3 folds.py
-6 2
6 6
```

减法不满足结合律，$(a - b) - c \neq a - (b - c)$，所以加括号的方式改变结果。加法满足结合律，且 $0$ 是它的单位元，此时——如下一定理证明的——加括号的方式就无所谓了。
:::
:::

::: theorem 幺半群上的两种折叠相等 {#thm-monoid-fold}
若 $\oplus$ 满足结合律，且 $e$ 是它的单位元（对一切 $x$ 有 $e \oplus x = x \oplus e = x$），则对每个有限序列 $xs$，$\mathrm{foldl}(\oplus, e, xs) = \mathrm{foldr}(\oplus, e, xs)$。
:::

::: proof
把两个折叠记为 $L(xs)$ 与 $R(xs)$。我们先对 $xs$ 的长度做归纳，证明对每个值 $a$，

$$
\mathrm{foldl}(\oplus, a, xs) = a \oplus L(xs). \qquad (*)
$$

对空序列，两边都是 $a$（因为 $a \oplus e = a$）。对 $xs = [x] + ys$，由定义有 $\mathrm{foldl}(\oplus, a, xs) = \mathrm{foldl}(\oplus, a \oplus x, ys)$，由归纳假设它等于 $(a \oplus x) \oplus L(ys)$。另一边，$L(xs) = \mathrm{foldl}(\oplus, e \oplus x, ys) = \mathrm{foldl}(\oplus, x, ys) = x \oplus L(ys)$，仍由归纳假设，于是 $a \oplus L(xs) = a \oplus (x \oplus L(ys))$，由结合律它等于 $(a \oplus x) \oplus L(ys)$。

现在再对长度做归纳证明 $L(xs) = R(xs)$。对空序列两者都是 $e$。对 $xs = [x] + ys$，$R(xs) = x \oplus R(ys) = x \oplus L(ys)$ 由归纳假设成立；而 $L(xs) = \mathrm{foldl}(\oplus, e \oplus x, ys) = \mathrm{foldl}(\oplus, x, ys) = x \oplus L(ys)$ 由 $(*)$ 成立。于是 $L(xs) = R(xs)$。
:::

一个带有结合运算和单位元的集合就是一个**幺半群**：数与 $+$、$0$，或与 $\times$、$1$；字符串与拼接、`""`；列表与 `+`、`[]`；布尔值与 `and`、`True`；函数与复合、恒等函数。这一定理的推远不止整洁：幺半群上的折叠可以按*任何*加括号的方式计算，例如把序列切成几段，在不同处理器上各折叠一段，再折叠这些结果。这一观察正是 MapReduce 风格系统中并行 "reduce" 步骤的基础（[[parallel-computing]]、[[distributed-systems]]）。

::: warning 浮点加法不满足结合律
作为折叠的浮点数 `sum` 依赖于求和顺序：`(0.1 + 0.2) + 0.3` 是 `0.6000000000000001`，而 `0.1 + (0.2 + 0.3)` 是 `0.6`。上面的定理只适用于真正满足结合律的运算，所以浮点数的并行求和可能在最低几位上不同于顺序求和，并且若加括号的方式变化，还会在不同次运行之间变化。原因见 [[computer-systems/floating-point]]，而 `math.fsum` 无论顺序如何都算出正确舍入的和。
:::

### map 与 filter 的定律

高阶函数遵守简单的代数定律，这些定律为变换程序提供了正当性。

::: theorem map 融合 {#thm-map-fusion}
对一切函数 $f$、$g$ 与有限序列 $xs$：$\mathrm{map}(f, \mathrm{map}(g, xs)) = \mathrm{map}(f \circ g, xs)$，其中 $(f\circ g)(x) = f(g(x))$。
:::

::: proof
对 $xs$ 的长度做归纳。若 $xs$ 为空，两边都是空。否则 $xs = [x] + ys$，由 map 的定义，

$$
\mathrm{map}(f, \mathrm{map}(g, [x] + ys)) = \mathrm{map}(f, [g(x)] + \mathrm{map}(g, ys)) = [f(g(x))] + \mathrm{map}(f, \mathrm{map}(g, ys)).
$$

由归纳假设，最后一项等于 $[(f\circ g)(x)] + \mathrm{map}(f \circ g, ys) = \mathrm{map}(f\circ g, [x] + ys)$。
:::

从左往右读，这条定律把对数据的两遍扫描变成一遍，省去了中间的列表；函数式语言的编译器会自动应用它。这个证明假定 $f$ 与 $g$ 是*纯*的——调用它们没有副作用——因为否则调用发生的顺序（先做完所有 $g$，还是交错进行）就可能要紧。[[program-design/functional-style]] 把这一假定当作一种程序设计风格的核心。

::: quiz
对纯的 `f` 与 `p`，哪个表达式总等于 `list(filter(p, map(f, xs)))`？
- [ ] `list(map(f, filter(p, xs)))`
- [x] `[y for y in (f(x) for x in xs) if p(y)]`
- [ ] `[f(x) for x in xs if p(x)]`
- [ ] `list(filter(lambda x: p(f(x)), xs))`
::: solution
原式先施加 `f`，再对*结果*测试 `p`。第二个选项做的是同一件事，只是写成了嵌套的推导式。第一个和第三个对原始元素测试 `p`，那是另一种计算（取 `f = lambda x: -x`、`p = lambda y: y > 0`、`xs = [1]`：原式给出 `[]`，它们给出 `[-1]`）。最后一个测试的条件是对的，`p(f(x))`，返回的却是原始元素 `x` 而不是 `f(x)`。
:::
:::

## λ表达式与闭包

`lambda` 表达式创建一个函数体为单个表达式的匿名函数：`lambda x, y: x * y + 1`。它与一个带 `return` 的 `def` 完全等价，只是没有名字，也不能包含语句。λ表达式适合只使用一次、作为实参的短函数；凡是需要名字、docstring 或不止一行的东西，都应当用一个 `def`。

每个函数——无论是 `def` 还是 `lambda` 造出来的——都记得它被创建时所在的环境。

::: definition 闭包 {#def-closure}
**闭包**是一个函数值，连同函数被创建之时生效的那个环境——它使用了、却不在其中定义的那些名字的绑定（它的**自由变量**）。此后调用这个函数时，它的自由变量在那个环境中查找，而不是在调用者的环境中查找。Python 对嵌套函数实现这一点：内层函数所引用的外层函数的局部变量，只要内层函数存在就继续存活。
:::

```python
def make_counter():
    count = 0
    def counter():
        nonlocal count            # 赋值给外层变量，而不是新建局部变量
        count += 1
        return count
    return counter

c1, c2 = make_counter(), make_counter()
print(c1(), c1(), c1(), c2())
print(c1.__closure__[0].cell_contents)
```

```console
$ python3 counter.py
1 2 3 1
3
```

`make_counter` 的每次调用都创建一个带有自己的 `count` 的新帧，所以 `c1` 与 `c2` 互不相干。`nonlocal` 声明是必需的，因为 `count += 1` 是一条赋值，否则它会使 `count` 成为 `counter` 的局部变量（并抛出 `UnboundLocalError`，如 [[programming-1/functions]] 中所示）。Python 把被捕获的变量存放在**单元**（cell）中，可通过函数的 `__closure__` 属性看到。

一个带有私有可变状态的闭包是一个只有一个方法的对象；一个对象是一组共享同一状态、捆绑在一起的闭包。这个计数器同样可以做成一个带有 `count` 属性和 `__call__` 方法的类。用哪一个取决于清晰性：单一行为用闭包更轻便；当有好几个运算、或者状态应当可以被查看时，类更清楚。

::: example 循环中的晚期绑定 {#ex-late-binding}
这个程序打印什么？要让它打印 `0 10 20`，可以怎么办？

```python
multipliers = []
for k in range(3):
    multipliers.append(lambda x: k * x)
print(*[m(10) for m in multipliers])
```
::: solution
它打印 `20 20 20`。每个 λ表达式的自由变量 `k` 引用的是外层作用域中那个*变量* `k`，而不是 λ表达式创建那一刻它的值。三个 λ表达式共享这一个变量，而到它们被调用时，循环已经结束，`k = 2`。

两种修法：

```python
by_default = [lambda x, k=k: k * x for k in range(3)]   # 默认值在创建时求值

def times(k):                                            # 每个闭包一个新作用域
    return lambda x: k * x
by_factory = [times(k) for k in range(3)]

print(*[m(10) for m in by_default], *[m(10) for m in by_factory])
```

```console
$ python3 late.py
0 10 20 0 10 20
```

第一种利用了一个事实：默认值在函数被定义时求值**一次**（那个对可变默认值来说是陷阱的行为，在这里成了一件工具）。第二种调用一个工厂函数，于是每个闭包捕获的是各自不同的一个帧中的 `k`。两种写法中工厂更清楚。
:::
:::

::: warning 闭包捕获的是变量，不是值
闭包在运行时看到的是每个被捕获变量的*当前*值。这既是 `make_counter` 能工作的原因，也是 [[#ex-late-binding]] 出人意料的原因。每当你在循环中创建函数，都要问一问：每个函数在被调用时会看到哪个变量。
:::

## 由函数构造函数

函数一旦成为值，*对函数*施加的运算就变得自然了。

**复合。** `compose(f, g)` 返回 $f \circ g$。对一个函数列表做折叠复合——复合满足结合律，恒等函数是它的单位元，所以 [[#thm-monoid-fold]] 适用——就得到一条流水线：

```python
from functools import reduce, partial

def compose(f, g):
    return lambda x: f(g(x))

def pipeline(*fs):
    """Effects: returns the function applying fs[0], then fs[1], ..., in order."""
    return reduce(lambda acc, f: compose(f, acc), fs, lambda x: x)

clean = pipeline(str.strip, str.lower, lambda s: s.replace(" ", "_"))
print(clean("  Higher Order Functions "))

def power(base, exp):
    return base ** exp
square, two_to = partial(power, exp=2), partial(power, 2)
print(square(7), two_to(10), sorted(["pear", "Fig", "apple"], key=str.lower))
```

```console
$ python3 compose.py
higher_order_functions
49 1024 ['apple', 'Fig', 'pear']
```

**部分应用。** `functools.partial(f, a)` 固定 `f` 的一部分实参，返回一个关于其余实参的函数：`partial(power, 2)` 是 $e \mapsto 2^e$，而 `partial(power, exp=2)` 是 $b \mapsto b^2$。一个接受若干实参、返回关于下一个实参的函数的函数，`lambda a: lambda b: f(a, b)`，称为**柯里化**的（curried，以逻辑学家哈斯克尔·柯里（Haskell Curry）命名）；在 Haskell 这样的语言里每个函数都是柯里化的，部分应用就是少传几个实参。

**键函数。** 许多库函数接受一个函数来说明*比较什么*：`sorted(xs, key=str.lower)`、`max(people, key=lambda p: p.age)`、`min(points, key=abs)`。`operator` 模块为常见情形提供了 `itemgetter(1)`（等价于 `lambda t: t[1]`）与 `attrgetter("age")`。

### 装饰器

**装饰器**是一个高阶函数，它接受一个函数并返回它的修改版本。`def` 上方的 Python 语法 `@d` 的意思是："定义这个函数，然后把它替换成对它施加 `d` 的结果。"

::: example 计数与缓存的装饰器 {#ex-memo}
写一个装饰器 `memo` 来缓存函数的结果，并用一个计数器比较 `fib(25)` 在有无它时 `fib` 函数体的执行次数。
::: solution
```python
import functools

def counted(f):
    """Decorator: count how many times f's body is entered."""
    @functools.wraps(f)              # 保留 f 的名字与 docstring
    def wrapper(*args):
        wrapper.calls += 1
        return f(*args)
    wrapper.calls = 0
    return wrapper

def memo(f):
    """Decorator: remember f's result for each argument tuple."""
    cache = {}
    @functools.wraps(f)
    def wrapper(*args):
        if args not in cache:
            cache[args] = f(*args)
        return cache[args]
    return wrapper

@counted
def slow_fib(n):
    return n if n < 2 else slow_fib(n - 1) + slow_fib(n - 2)

@memo
@counted
def fast_fib(n):
    return n if n < 2 else fast_fib(n - 1) + fast_fib(n - 2)

print(slow_fib(25), slow_fib.calls)
print(fast_fib(25), fast_fib.__wrapped__.calls, fast_fib.__name__)
```

```console
$ python3 memo.py
75025 242785
75025 26 fast_fib
```

不加备忘录时函数体执行 $242{,}785$ 次，即 [[programming-1/recursion]] 中对朴素 Fibonacci 求出的计数 $2F_{26} - 1$。加上它，函数体对每个不同的实参 $0, 1, \dots, 25$ 各执行一次：共 $26$ 次。装饰器自下而上地叠加——`fast_fib = memo(counted(fast_fib))`——而函数体内部的递归调用在全局作用域中查找名字 `fast_fib`，在那里找到的是加了备忘录的版本，这就是缓存对递归也有用、而不只是对重复的顶层调用有用的原因。`functools.wraps` 把名字与 docstring 复制到 wrapper 上，并在 `__wrapped__` 中记下原来的函数。标准库以 `functools.cache` 的形式提供了这个装饰器（还有带大小上限的 `functools.lru_cache`）。
:::
:::

装饰器让一个横切关注点——缓存、计数、计时、日志、检查前置条件、把函数登记到某张表里——可以写一遍，用一行附加到任何函数上，而无需编辑函数的体。它们之所以行得通，是因为函数是值，而 `@` 只不过是一条赋值。

::: history
高阶函数比计算机更古老。丘奇（Church）的 λ演算（自 1932 年发展起来，并用在他 1936 年关于不可判定性的论文中）是一个除了函数别无其他的理论，其中的数、对与布尔值本身都被编码为函数。约翰·麦卡锡（John McCarthy）的 LISP（《Recursive functions of symbolic expressions and their computation by machine, Part I》，*CACM*，1960）借用了丘奇的 `lambda` 记法，并包含 `maplist`，一个早期的 map。彼得·兰丁（Peter Landin）在《The mechanical evaluation of expressions》（1964）中创造了"闭包"一词，而杰拉德·苏斯曼（Gerald Sussman）与盖伊·斯蒂尔（Guy Steele）的 Scheme（1975）让词法作用域的闭包成为默认。约翰·巴克斯（John Backus）的图灵奖演讲《Can programming be liberated from the von Neumann style?》（1978）主张用组合函数来程序设计。Python 自 1.0 版（1994）起就有 `lambda`、`map`、`filter` 与 `reduce`；在 Python 3.0（2008）中 `reduce` 移到了 `functools`。杰弗里·迪恩（Jeffrey Dean）与桑杰·格马瓦特（Sanjay Ghemawat）的 MapReduce（2004）把这两个名字带进了大规模数据处理。
:::

## 后续内容

[[program-design/functional-style]] 迈出下一步：若函数没有副作用、数据永不改变，程序就能像代数一样通过替换来推理，而 map 融合这样的定律无条件成立。[[program-design/iterators-generators]] 解释 `map` 与 `filter` 为什么返回惰性迭代器，并构建一次处理一个元素、可处理无界流水的流水线。[[program-design/modules-patterns]] 的策略与观察者模式，在 Python 中多半就是作为值传递的函数。在 [[programming-languages]] 中，闭包与高阶函数通过 λ演算、以及解释器如何表示环境来研究；而在 [[parallel-computing]] 中，幺半群定律变成了并行归约。

::: summary
- 函数是**第一类**值；**高阶函数**接受或返回函数，正如参数对数据抽象，它是对行为的抽象（[[#def-hof]]）。
- 函数可以构造函数：`deriv(f)` 返回一个近似的导函数，而 `newton` 使用它，对 `f` 的情况一无所知也能工作。
- `map`、`filter` 与折叠捕获了常见的循环模式（[[#def-map-filter-reduce]]）；左折叠就是一个累加循环（[[#alg-foldl]]）。在 Python 中，带 λ表达式时推导式往往比 `map`/`filter` 更清楚。
- 对满足结合律且有单位元的运算（一个**幺半群**），左、右折叠相等，任何加括号方式都给出同一结果（[[#thm-monoid-fold]]）——这是并行归约的基础；浮点加法不满足结合律。
- map 融合 $\mathrm{map}(f, \mathrm{map}(g, xs)) = \mathrm{map}(f\circ g, xs)$ 对纯函数成立（[[#thm-map-fusion]]）。
- **闭包**捕获的是其定义环境的*变量*，而非它们的值；要给它们赋值就用 `nonlocal`，并当心在循环中创建的闭包（[[#def-closure]]）。
- 复合、`functools.partial`、键函数与**装饰器**由旧函数造出新函数；`@d` 只是把函数重新绑定成 `d(function)`。
:::

## 习题

::: exercise 用折叠做霍纳法则 {level=1 check="314"}
`reduce(lambda acc, d: 10 * acc + d, [3, 1, 4], 0)` 是什么？（输入该值。）
::: solution
由 [[#alg-foldl]]：$acc = 0$，然后 $10\cdot 0 + 3 = 3$，然后 $10\cdot 3 + 1 = 31$，然后 $10\cdot 31 + 4 = 314$。
:::
:::

::: exercise 从循环到 map 与 filter {level=1}
把每个循环改写为一个用推导式的表达式，再改写一次用 `map`/`filter`/`reduce`：

```python
out = []
for w in words:
    if w.isalpha():
        out.append(len(w))

best = None
for p in prices:
    if best is None or p < best:
        best = p
```
::: solution
第一个：`[len(w) for w in words if w.isalpha()]`，或 `list(map(len, filter(str.isalpha, words)))`。第二个计算最小值，空列表时给 `None`：`min(prices, default=None)`，或 `reduce(lambda best, p: p if best is None or p < best else best, prices, None)`。库函数 `min` 是最好的选择：它直接点名了意图。
:::
:::

::: exercise 又一次晚期绑定 {level=1 check="16"}
`fs = [lambda x: x + i for i in range(4)]; print(sum(f(1) for f in fs))` 打印什么？（输入数目。）
::: solution
四个 λ表达式都捕获推导式作用域中同一个变量 `i`，而推导式一旦结束它的值就是 $3$。每个 `f(1)` 都是 $1 + 3 = 4$，总和是 $16$。（若写成 `lambda x, i=i: x + i`，各值将是 $1, 2, 3, 4$，加起来是 $10$。）
:::
:::

::: exercise 用折叠实现 map 与 filter {level=2}
只用 `functools.reduce` 与列表运算，实现返回列表的 `my_map(f, xs)` 与 `my_filter(p, xs)`。你的版本对长度为 $n$ 的列表的运行时间是多少，为什么？
::: solution
```python
from functools import reduce

def my_map(f, xs):
    return reduce(lambda acc, x: acc + [f(x)], xs, [])

def my_filter(p, xs):
    return reduce(lambda acc, x: acc + [x] if p(x) else acc, xs, [])

print(my_map(lambda x: x * x, [1, 2, 3]), my_filter(lambda x: x > 1, [3, 1, 2]))
```

```console
$ python3 myfold.py
[1, 4, 9] [3, 2]
```

每一步 `acc + [f(x)]` 都新建一个列表，把整个累加器复制一遍，所以第 $i$ 步的代价是 $\Theta(i)$，总代价是 $\Theta(n^2)$。改为就地修改累加器（`acc.append(f(x)); return acc`，用一个辅助 `def` 写出）就得到 $\Theta(n)$——这是纯函数式风格与效率之间的张力的一个例子，持久数据结构在 [[program-design/functional-style]] 中处理这种张力。
:::
:::

::: exercise 立方和 {level=2 check="3025"}
用 `sum_series` 计算 $\sum_{k=1}^{10} k^3$，并对照公式 $\left(\frac{n(n+1)}{2}\right)^2$ 检验。（输入该值。）
::: solution
`sum_series(lambda k: k ** 3, 1, lambda k: k + 1, 10)` 给出 $3025$（`series.py` 的第一行），而 $\left(\frac{10\cdot 11}{2}\right)^2 = 55^2 = 3025$。
:::
:::

::: exercise 复合一列函数 {level=2}
本章的 `pipeline` 从恒等函数开始它的折叠。解释为什么恒等函数是合适的起始值，不带实参的 `pipeline()` 返回什么，`pipeline(f, g, h)` 按什么顺序施加这些函数。然后写出返回 $f_1 \circ f_2 \circ \cdots \circ f_k$ 的 `compose_all(*fs)`（即先施加 $f_k$）。
::: solution
恒等函数 $\mathrm{id}$ 满足 $f \circ \mathrm{id} = \mathrm{id} \circ f = f$，所以它是复合幺半群的单位元；从它开始折叠什么都不增添，而 `pipeline()` 返回恒等函数本身——正确的"什么都不做"的流水线。`pipeline(f, g, h)` 构造出 `compose(h, compose(g, compose(f, id)))`，它先施加 `f`，然后 `g`，然后 `h`。要得到数学上的顺序：

```python
from functools import reduce

def compose_all(*fs):
    return reduce(lambda acc, f: (lambda x, acc=acc, f=f: acc(f(x))), fs, lambda x: x)

inc, dbl = (lambda x: x + 1), (lambda x: 2 * x)
print(compose_all(inc, dbl)(5), compose_all(dbl, inc)(5), compose_all()(7))
```

```console
$ python3 composeall.py
11 12 7
```

`compose_all(inc, dbl)(5)` 是 $\mathrm{inc}(\mathrm{dbl}(5)) = 11$。默认实参 `acc=acc, f=f` 在这里并非绝对必要，因为外层 λ表达式的每次调用都创建一个新作用域，但它们让捕获变得明确。
:::
:::

::: exercise filter 融合 {level=3}
用归纳法证明：对纯谓词 $p$ 与 $q$ 以及每个有限序列 $xs$，$\mathrm{filter}(p, \mathrm{filter}(q, xs)) = \mathrm{filter}(r, xs)$，其中 $r(x) = q(x) \land p(x)$。若 $q$ 可能抛出异常而 $p$ 先被测试，证明会在哪里断裂？
::: solution
若 $xs$ 为空，两边都是空。设 $xs = [x] + ys$，并假定结论对 $ys$ 成立。*情形 $q(x)$ 为假：*内层 filter 丢掉 $x$，于是左边是 $\mathrm{filter}(p, \mathrm{filter}(q, ys))$；而 $r(x)$ 为假，于是右边是 $\mathrm{filter}(r, ys)$；由归纳假设二者相等。*情形 $q(x)$ 为真而 $p(x)$ 为假：*内层 filter 保留 $x$ 而外层丢掉它，得到 $\mathrm{filter}(p, \mathrm{filter}(q, ys))$；$r(x)$ 为假，得到 $\mathrm{filter}(r, ys)$；相等。*情形两者都为真：*左边是 $[x] + \mathrm{filter}(p, \mathrm{filter}(q, ys))$，右边是 $[x] + \mathrm{filter}(r, ys)$；由归纳假设相等。

这个证明把 $q(x) \land p(x)$ 当作数学上的合取。Python 的 `and` 先求值 $q$，与左边一致，所以求值顺序是吻合的。若改为先求值 $p$ 地计算 $r(x) = p(x) \land q(x)$，那么对一个 $q$ 抛出异常而 $p$ 为假的 $x$，右边会跳过 $q$ 而成功，左边却会调用 `q(x)` 并抛出异常。所陈述的等式只对全定义的纯谓词成立——或者对保持求值顺序的那个版本成立。
:::
:::

::: exercise 加备忘录的路径计数 {level=3 check="184756"}
从 $(0, 0)$ 到 $(m, n)$、每步只向右或向上走一步的单调格路径数目满足 $P(m, 0) = P(0, n) = 1$ 与 $P(m, n) = P(m-1, n) + P(m, n-1)$。用 [[#ex-memo]] 的 `memo` 装饰器递归地实现它，并计算 $P(10, 10)$。函数体执行多少次？不加备忘录会执行多少次？（输入 $P(10, 10)$。）
::: solution
```python
import functools

def memo(f):
    cache = {}
    @functools.wraps(f)
    def wrapper(*args):
        if args not in cache:
            cache[args] = f(*args)
        return cache[args]
    return wrapper

runs = 0

@memo
def paths(m, n):
    global runs
    runs += 1
    if m == 0 or n == 0:
        return 1
    return paths(m - 1, n) + paths(m, n - 1)

print(paths(10, 10), runs)
```

```console
$ python3 paths.py
184756 120
```

$P(10, 10) = \binom{20}{10} = 184{,}756$。函数体对每个能到达的不同实参对各执行一次：一切满足 $0 \le m, n \le 10$ 的 $(m, n)$，除去 $(0, 0)$——递归在边界处停止，它永远用不到。即 $121 - 1 = 120$。不加备忘录时，每个满足 $m, n > 0$ 的调用都再引出两个调用，而调用次数等于递归树的结点数目，$2\binom{20}{10} - 1 = 369{,}511$——因为每个叶对结果贡献 $1$，而一个有 $L$ 个叶的二叉树有 $2L - 1$ 个结点。
:::
:::
