一台 Web 服务器每处理一个请求就往访问日志里写一行；繁忙的一个月之后，日志有 50 GB。你想要的是以错误收尾的请求个数。[[programming-1/files-exceptions]] 中那个用 `f.readlines()` 读入整个文件、再对列表循环的程序，会试图把 50 GB 的字符串一口气装进内存，于是失败。而对打开的文件使用 `for line in f:` 循环就可以：无论文件多大，它每次只装一行。

这两个循环看起来一模一样——`for x in something`——而这正是要点。`for` 能作用于列表、字符串、range、字典、集合、文件、`map` 与 `filter` 对象，以及你自己写的类，因为它们全都实现了一个小型接口：**迭代协议**。它们之中，有的从内存产出元素，有的从磁盘产出，有的直到被索要时才计算。本章讲解这个协议；讲解**生成器**——它让编写迭代器像写一个循环一样简单；讲解**惰性**乃至**无限**序列——其元素只在被需要时才存在；讲解**流水线**——数据经过一连串转换，一次流过一条。贯穿始终的设计思想，是把序列的*生产*与*消费*分离开来。

## 迭代协议

::: definition 可迭代对象与迭代器 {#def-iterator}
**迭代器**是这样一种对象：它有一个方法 `__next__()`，每次调用返回序列的下一个元素，没有更多元素时抛出 `StopIteration` 异常；按惯例它还有一个方法 `__iter__()`，返回迭代器自身。**可迭代对象**是拥有方法 `__iter__()` 的对象，该方法返回一个在其元素上迭代的迭代器。内建函数 `iter(x)` 与 `next(it)` 分别调用 `x.__iter__()` 与 `it.__next__()`。
:::

这一区分很重要。列表是可迭代的，但它本身不是迭代器：每次调用 `iter(xs)` 都返回一个*新的*迭代器，停在开头位置，所以一个列表可以被多次迭代、被多个循环同时迭代。迭代器是序列中的一个游标：它记得自己走到了哪里，一旦耗尽便保持耗尽。

```python
xs = [10, 20]
it = iter(xs)                    # 一个 list_iterator，停在 10 之前
print(next(it), next(it))
try:
    next(it)
except StopIteration:
    print("StopIteration")
print(iter(xs) is iter(xs), iter(it) is it)
```

```console
$ python3 protocol.py
10 20
StopIteration
False True
```

`for` 语句正是用这个协议来定义的。

::: definition for 语句的含义 {#def-for}
语句 `for x in e: body` 的执行方式相当于

```text
it = iter(e)                     # 循环开始前执行一次
while True:
    try:
        x = next(it)
    except StopIteration:
        break                    # 序列已经结束
    body
```

（其中 `it` 是一个隐藏变量；若循环带有 `else` 子句，则当 `StopIteration` 而非循环体中的 `break` 结束循环时运行它。）
:::

其他一切消费序列的东西——`list(e)`、`sum(e)`、`max(e)`、`sorted(e)`、`"".join(e)`、没有 `__contains__` 的对象上的 `x in e`、元组拆包 `a, b = e`、推导式——用的都是同样这两个调用。你用 `for` 写的任何函数也是如此。对一个小型接口而言这是巨大的回报：任何实现了该协议的对象都处处可用。

### 手写一个迭代器

要让一个类可迭代，给它一个返回迭代器的 `__iter__` 方法。下面是一个倒计时，迭代器是一个单独的类，这样可迭代对象就可以被多次迭代。

```python
class Countdown:
    """An iterable over n, n-1, ..., 1."""
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return CountdownIterator(self.n)      # 每次一个全新的游标

class CountdownIterator:
    """Iterator state: the next value to return is self.current (if > 0)."""
    def __init__(self, n):
        self.current = n
    def __iter__(self):
        return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

c = Countdown(3)
print(list(c), list(c), sum(c))
it = iter(c)
print(next(it), list(it), list(it))
```

```console
$ python3 countdown.py
[3, 2, 1] [3, 2, 1] 6
3 [2, 1] []
```

可迭代对象 `c` 可以被反复遍历；迭代器 `it` 则会被用光——`next(it)` 取走了 `3` 之后，`list(it)` 取走了剩下的全部，第二个 `list(it)` 就什么也没找到。

::: warning 迭代器只能用一次
`map`、`filter`、`zip`、`enumerate`、`reversed`、文件对象与生成器都是迭代器，而不是可复用的集合。`squares = map(lambda x: x * x, [1, 2, 3])` 之后，第一个 `sum(squares)` 给出 `14`，随后的 `max(squares)` 会抛出 `ValueError: max() iterable argument is empty`，因为第一个消费者已把它耗尽。若需要两次使用这些元素，就做成列表（`squares = list(...)`），或者重新构造迭代器。一个要对实参循环两遍的函数，应当在规格说明中写明它要求的是可重复迭代的集合，而不仅仅是可迭代对象。
:::

::: quiz
`it = iter([1, 2, 3, 4, 5]); print(list(zip(it, it)))` 打印什么？
- [ ] `[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]`
- [x] `[(1, 2), (3, 4)]`
- [ ] `[(1, 2), (3, 4), (5, None)]`
- [ ] `[]`
::: solution
`zip` 的两个实参是*同一个*迭代器。为了构造每一对，`zip` 先对第一个实参调用 `next`，再对第二个调用，所以第一对取走 `1` 和 `2`，第二对取走 `3` 和 `4`。到第三对时，第一个 `next` 给出 `5`，第二个抛出 `StopIteration`，`zip` 就此结束；不完整的一对被丢弃。（这是把一个迭代器两两分组的著名惯用法。）
:::
:::

## 生成器

手写迭代器类很繁琐：产出元素的循环必须被翻个底朝天，其状态存进属性（`self.current`），其控制流被切成一次次 `__next__` 调用。**生成器**允许我们直截了当地写这个循环。

::: definition 生成器 {#def-generator}
函数体中含有 `yield` 表达式的函数是**生成器函数**。调用它并不运行函数体；它返回一个**生成器**，一种迭代器，它的 `__next__` 运行函数体直到下一个 `yield v`，就在那里把函数*挂起*——保留它的栈帧，连同全部局部变量与执行位置——并返回 `v`。下一次调用 `__next__` 就紧接在那个 `yield` 之后恢复函数体。函数体返回时，生成器抛出 `StopIteration`。
:::

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

print(list(countdown(3)), sum(countdown(100)))
```

```console
$ python3 gencount.py
[3, 2, 1] 5050
```

四行代码取代了上一节的两个类；局部变量 `n` 就*是*迭代器的状态。要得到一个可重复迭代的类，把它的 `__iter__` 写成生成器函数：`def __iter__(self): k = self.n`，随后接同一个循环。

::: example 生产者与消费者的交替 {#ex-interleave}
预测下面这个程序的输出，它会在生成器内部打印。

```python
def numbers():
    print("  start")
    yield 1
    print("  after 1")
    yield 2
    print("  end")

g = numbers()
print("created")
print(next(g))
for x in g:
    print("loop got", x)
print("done")
```
::: solution
```console
$ python3 interleave.py
created
  start
1
  after 1
loop got 2
  end
done
```

1. `numbers()` 创建生成器时不运行函数体的任何部分，所以 `created` 最先打印。
2. `next(g)` 从开头运行函数体，打印 `start`，直到 `yield 1`，生成器在那里挂起，`next` 返回 `1`。
3. `for` 循环调用 `iter(g)`，它就是 `g` 本身，然后调用 `next(g)`：函数体在 `yield 1` 之后恢复，打印 `after 1`，在 `yield 2` 处挂起；循环体打印 `loop got 2`。
4. 下一次 `next(g)` 在 `yield 2` 之后恢复，打印 `end`，并从函数体末尾落下，抛出 `StopIteration`，循环随之结束。

控制权在消费者（循环）与生产者（生成器）之间一来一回地传递，一次一个元素。谁也不跑到谁前面去：生成器只在消费者索要时才计算每个元素。
:::
:::

**生成器表达式**之于生成器，恰如列表推导之于列表：`(x * x for x in xs if x > 0)` 是一个按需产出平方数的生成器；写在调用里时，外层多余的一对括号可以省略，如 `sum(x * x for x in xs)`。内存上的差别是惊人的。在 64 位机器上用 CPython 3.14 实测（大小随版本而异），`sys.getsizeof([x * x for x in range(10**6)])` 是 $8{,}448{,}728$ 字节——那只是列表的指针数组，还不算这些整数——而生成器表达式 `(x * x for x in range(10**6))` 无论范围多大都只占 $208$ 字节。

### 用 `yield from` 委派

生成器可以用 `yield from it` 把自己移交给另一个可迭代对象，它依次产出 `it` 的每个元素。这使得递归生成器写起来非常自然，例如对 [[program-design/functional-style]] 中的二叉搜索树做中序遍历：

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Node:
    left: "Node | None"
    key: int
    right: "Node | None"

def inorder(t):
    """Yield the keys of the BST t in increasing order."""
    if t is not None:
        yield from inorder(t.left)
        yield t.key
        yield from inorder(t.right)

t = Node(Node(None, 1, None), 3, Node(Node(None, 4, None), 6, None))
print(list(inorder(t)))
print(next(k for k in inorder(t) if k > 3))
```

```console
$ python3 inorder.py
[1, 3, 4, 6]
4
```

第二行索要第一个大于 $3$ 的键并到此为止：遍历从未访问结点 $6$。若是返回全部键的列表的函数，就必须先访问每个结点。

## 惰性序列与无限序列

因为生成器只在被索要时才计算元素，所以没有任何东西要求它一定停下来。**无限迭代器**是完全正当的对象，只要它的消费者只取有限多个元素。标准模块 `itertools` 提供积木：`count(start)` 永远产出 `start, start + 1, …`；`islice(it, n)` 取前 $n$ 个元素（`islice(it, a, b)` 取位置 $a$ 到 $b - 1$ 的那些）；`takewhile(p, it)` 在第一个不满足 `p` 的元素处停止。

一个恰当的例子是素数序列。埃拉托斯特尼筛法在每个不超过固定上界 $N$ 的素数处划去它的倍数；**增量式**筛法则不需要上界。它为迄今发现的每个素数 $p$ 记住 $p$ 的下一个尚未划去的倍数，存放在一个从倍数到素数的字典里。

```python
from itertools import count, islice

def primes():
    """Yield 2, 3, 5, 7, ... for ever (an incremental sieve of Eratosthenes)."""
    composites = {}                    # 下一个要划去的倍数 -> 对应的素数
    for n in count(2):
        if n not in composites:
            yield n                    # 没有更小的素数整除 n
            composites[n * n] = n      # 更小的倍数已被更小的素数划去
        else:
            p = composites.pop(n)      # n 是合数：把 p 的标记往前挪
            m = n + p
            while m in composites:     # 每个键只属于一个素数
                m += p
            composites[m] = p

print(list(islice(primes(), 15)))
print(next(p for p in primes() if p > 1000))
```

```console
$ python3 primes.py
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
1009
```

生成器并不知道会有人想要多少个素数；由消费者决定。字典里每个已发现的素数对应一个条目，所以产出不超过 $n$ 的素数所需的内存与不超过 $n$ 的素数个数成正比，即大约 $n / \ln n$，而不是像用固定数组的筛法那样与 $n$ 成正比。（为什么新素数 $p$ 的标记可以从 $p^2$ 开始，以及为什么不会漏掉任何合数，见 [[#exr-sieve]]。）

::: widget sieve
mode: sieve
n: 120
caption: 在 $2, \dots, 120$ 上运行的经典有界埃拉托斯特尼筛法。每个素数划去自己的倍数，从它的平方开始。上面的增量生成器执行的是同样的划除，只不过是惰性的：它不一次划去 $p$ 的全部倍数，只记住*下一个*，等计数到达时再把标记往前挪。
:::

惰性背后的定理，说的是由惰性阶段组成的流水线究竟做了*多少工作*。

::: theorem 需求驱动的求值 {#thm-demand}
设一条流水线由源迭代器 $S$ 经过一连串阶段构造而成，每个阶段或是一个惰性的 `map`（对每个元素施加一个函数），或是一个惰性的 `filter`（放行满足谓词的元素），并设消费者从流水线末端取走 $k$ 个元素。假设第 $k$ 个输出元素源自位置 $N$ 上的源元素（从 $1$ 数起）。那么从 $S$ 恰好取走 $N$ 个元素；每个 map 阶段的函数恰好在到达该阶段的前 $N$ 个元素上各应用一次，每个谓词恰好在每个这样的元素上测试一次。
:::

::: proof
称这些阶段为 $T_1, \dots, T_r$，其中 $T_1$ 从 $S$ 读取。对 $T_j$ 调用一次 `next`，就对 $T_{j-1}$（若 $j = 1$ 则为 $S$）调用 `next`，直到取得一个可以返回的元素：map 阶段恰好需要一个输入元素，并把它的函数应用一次；filter 阶段一次取一个输入元素，各测试一次，直到有一个通过。任何阶段都只在回应某个请求时才请求元素，为回应当前请求绝不会多要，也不会为以后存着元素。因此每个源元素只有在它之前的每一个都已交给消费者或被某个 filter 拒绝之后才会被请求，而每个元素在它到达的每个阶段上恰好被处理一次。于是，交给消费者的 $k$ 个答案恰好需要源元素 $1, \dots, N$，其中 $N$ 是第 $k$ 个答案所源自的源元素的位置；在那个答案之后再无任何请求。
:::

::: example 计算工作量 {#ex-count-work}
惰性地从一个无限源中取出满足 $n \bmod 7 = 3$ 的数 $n \ge 1$ 的前五个平方数，统计谓词与平方函数各被调用多少次。再与在一百万以下的数上运行的及早版本作比较。
::: solution
```python
from itertools import count, islice

calls = {"p": 0, "f": 0}
def p(n):
    calls["p"] += 1
    return n % 7 == 3
def f(n):
    calls["f"] += 1
    return n * n

print(list(islice(map(f, filter(p, count(1))), 5)), calls)

calls = {"p": 0, "f": 0}
eager = [f(n) for n in [n for n in range(1, 10**6) if p(n)]][:5]
print(eager, calls)
```

```console
$ python3 lazywork.py
[9, 100, 289, 576, 961] {'p': 31, 'f': 5}
[9, 100, 289, 576, 961] {'p': 999999, 'f': 142857}
```

满足 $n \bmod 7 = 3$ 的第五个数是 $31$（序列是 $3, 10, 17, 24, 31$），所以正如 [[#thm-demand]] 所预言的，惰性流水线取走 $N = 31$ 个源元素，谓词测试 $31$ 次，平方 $5$ 次。及早版本不得不挑一个任意的上界，对以下每个数都做测试，并把全部 $142{,}857$ 个通过的数都平方，最后却只留下五个。惰性按元素计并不更快——挂起与恢复生成器有一点小开销——但它只做被要求做的工作。
:::
:::

## 流水线

生成器可以复合成**流水线**：每个阶段接受一个迭代器，对它做惰性变换，再返回一个迭代器，于是各阶段可以像 Unix shell 流水线的命令（`cat access.log | grep " 404 " | wc -l`）那样插接在一起。每个阶段都很小、可独立测试、可复用；整条流水线任何时刻都只在内存中存着少数几个元素，无论输入有多长。

::: example 分析日志文件 {#ex-log}
搭建一条流水线：读入访问日志，跳过格式不对的行，把每行解析成一条记录，报告失败请求的路径与发送字节的总数。使用内存文件（`io.StringIO`），使这个例子随处可运行。
::: solution
```python
import io

LOG = """\
2026-10-01 12:00:01 GET /index.html 200 5120
2026-10-01 12:00:02 GET /missing 404 312
2026-10-01 12:00:05 POST /login 200 845
2026-10-01 12:00:09 GET /index.html 200 5120
malformed line
2026-10-01 12:00:11 GET /img/logo.png 304 0
2026-10-01 12:00:12 GET /about 500 128
"""

def lines(f):
    for line in f:                   # 文件就是以它的行为元素的迭代器
        yield line.rstrip("\n")

def records(lines):
    for line in lines:
        parts = line.split()
        if len(parts) == 6:          # 跳过格式不对的行
            date, time, method, path, status, size = parts
            yield {"path": path, "status": int(status), "bytes": int(size)}

def failures(recs):
    return (r for r in recs if r["status"] >= 400)

print([r["path"] for r in failures(records(lines(io.StringIO(LOG))))])
print(sum(r["bytes"] for r in records(lines(io.StringIO(LOG)))))
```

```console
$ python3 logpipe.py
['/missing', '/about']
11525
```

同样的函数不加改动就能作用在 50 GB 文件上的 `open("access.log")`，因为文件对象就是以它的行为元素的迭代器，并且每个阶段都是惰性的：内存占用停留在几行上，与文件大小无关。注意这条流水线被搭建了两次——每个问题一次——因为第一个消费者会把它耗尽；若想避免把巨大的文件读两遍，可以写一个显式的循环，同时更新两个累加器，一趟算出两个答案。
:::
:::

`itertools` 模块提供了许多标准阶段，全都是惰性的：

- `chain(a, b, …)` 把若干可迭代对象首尾相接；`zip` 与 `enumerate` 把元素配对；`accumulate(xs)` 依次产出累计和（对 $1, 2, 3, 4$ 产出 $1, 3, 6, 10, \dots$）；
- `groupby(xs, key)` 按键*相邻*且相等的元素成组产出；
- `tee(it, n)` 把一个迭代器分成 $n$ 个相互独立的迭代器（缓存一份已经看到、另一份还没看到的那些元素）；
- `islice`、`takewhile`、`dropwhile`、`filterfalse`、`pairwise`、`product`、`permutations`、`combinations` 等等。

::: warning `groupby` 分的是相邻段，不是相同的键
`[(k, len(list(g))) for k, g in groupby("aabbbac")]` 是 `[('a', 2), ('b', 3), ('a', 1), ('c', 1)]`：两段相邻的 `a` 分成两组。`groupby` 是惰性的，只记得当前这一组，所以无从知道后面还有相等的元素。若要把所有相等的键分到一组，先按同一个键排序（`groupby(sorted(xs, key=k), key=k)`），或者像 [[programming-1/dictionaries-sets]] 那样累加进一个字典。
:::

一个阶段也可以保有界数量的状态，只要它不存下整个输入。

::: example 滑动平均 {#ex-movavg}
写一个流水线阶段，对一个流中每个由 $k$ 个相邻元素组成的窗口产出其均值，每个元素 $O(1)$ 时间、$O(k)$ 内存，并在 $2, 4, 6, 8, 10, 12$ 上取 $k = 3$ 跟踪它的执行。
::: solution
把最近的 $k$ 个元素连同它们的累计和存在一个 `maxlen=k` 的 `collections.deque` 里：追加新元素时，它自动丢弃最旧的那个：

```python
from collections import deque

def moving_average(xs, k):
    """Yield the mean of each window of k consecutive elements of xs."""
    window, total = deque(maxlen=k), 0
    for x in xs:
        if len(window) == k:
            total -= window[0]       # 即将滑出窗口的元素
        window.append(x)
        total += x
        if len(window) == k:
            yield total / k

print(list(moving_average([2, 4, 6, 8, 10, 12], 3)))
```

```console
$ python3 movavg.py
[4.0, 6.0, 8.0, 10.0]
```

跟踪其执行：经过 $2, 4, 6$ 之后窗口已满，总和为 $12$，产出 $4.0$；接着 $8$ 到来，减去 $2$、加上 $8$（总和 $18$，均值 $6.0$）；然后是 $10$（总和 $24$，均值 $8.0$）与 $12$（总和 $30$，均值 $10.0$）。每个元素花费 $O(1)$ 时间——一次减法、一次加法、一次追加——该阶段使用 $O(k)$ 内存，与流的长度无关：这正是大多数流处理算法的形态。若对每个输出重新计算 `sum(window)`，每个元素就要花 $O(k)$。
:::
:::

### 生成器与资源

挂起在函数体中间的生成器可能正占有着某种资源——一个打开的文件、一条网络连接。若消费者提前停下，函数体的剩余部分就永远不会运行。Python 通过生成器的 `close()` 方法处理这一点：它在挂起处的 `yield` 抛出一个 `GeneratorExit` 异常，于是生成器内部的 `finally` 子句与 `with` 块会执行各自的清理：

```python
def guarded():
    try:
        yield "a"
        yield "b"
    finally:
        print("cleanup")

g = guarded()
print(next(g))
g.close()                            # 现在就执行 finally 子句
print("after close")
```

```console
$ python3 closegen.py
a
cleanup
after close
```

当指向生成器的最后一个引用消失时，CPython 也会关闭它，但依赖这个时机是靠不住的（其他 Python 实现会更晚才回收垃圾）。若生成器打开了文件，要么让它被消费到结束，要么显式关闭——`contextlib.closing(gen)` 可在 `with` 语句中做到这一点。

::: history
CLAU——芭芭拉·利斯科夫（Barbara Liskov）的小组于 1970 年代中期在 MIT 设计——引入了**迭代器**：一种向 `for` 循环 `yield` 元素、并在元素之间挂起的过程，它是 Python 生成器的直接祖先；这一想法脱胎于 [[program-design/abstract-data-types]] 中的抽象数据类型——一种类型需要向它的客户提供元素，又不暴露其表示。生成器是其特例的协程（coroutine），可追溯到梅尔文·康威（Melvin Conway）1963 年的论文《Design of a separable transition-diagram compiler》。道格·麦克罗伊（Doug McIlroy）的 Unix 管道（1973）把流式流水线变成一种工作方式。Python 的迭代协议随 Python 2.2（2001，PEP 234）到来，生成器在同一版本（PEP 255，作者 Neil Schemenauer、Tim Peters 与 Magnus Lie Hetland），生成器表达式在 2.4（PEP 289），`yield from` 在 3.3（PEP 380）。《Design Patterns》（1994）把 Iterator 收录为它的设计模式之一。
:::

## 后续内容

[[program-design/types-interfaces]] 给可迭代对象与迭代器配上类型——`Iterable[int]`、`Iterator[str]`、`Generator[...]`——使检查器能分辨可重复迭代的集合与一次性使用的流。[[program-design/modules-patterns]] 把 Iterator 当作与其他模式并列的一种设计模式。生成器同时也是**协程**——可以被挂起和恢复的函数——在 Python 中，这一想法长成了 `async` 与 `await`，[[operating-systems]] 与 [[distributed-systems]] 用它们实现无线程的并发。对无界数据的流处理是 [[databases]] 与 [[distributed-systems]] 的中心主题，而惰性求值在 Haskell 中是默认策略，见 [[programming-languages]]。

::: summary
- **可迭代对象**有返回**迭代器**的 `__iter__`；迭代器有 `__next__`，不断返回元素直到抛出 `StopIteration`（[[#def-iterator]]）。`for`、`list`、`sum`、推导式与拆包全都使用这个协议（[[#def-for]]）。
- 迭代器是一次性的游标：`map`、`filter`、`zip`、文件与生成器过一遍就耗尽。
- **生成器函数**含有 `yield`；调用它返回一个惰性运行函数体的生成器，在每个 `yield` 处连同栈帧一起挂起（[[#def-generator]]）。`yield from` 把自己移交给另一个可迭代对象。
- 生成器可以是**无限的**（`count`、`primes()`）；由消费者决定计算多少（`islice`、`next`、`takewhile`）。
- 在惰性流水线中，每个源元素的取用与每个阶段的工作都只在被要求时才发生（[[#thm-demand]]）：内存与输入长度无关。
- 由小的生成器阶段组成的流水线，配上 `itertools` 与有界状态（一个 `deque` 窗口），能处理任意长度的流；`groupby` 只分相邻的段。
- 关闭占有资源的生成器（`close()`、`finally`、`contextlib.closing`）。
:::

## 习题

::: exercise 调用多少次？{level=1 check="6"}
设 `f` 是一个会统计自身调用次数的平方函数，`next(x for x in map(f, range(10)) if x > 20)` 会调用 `f` 多少次？（填入数字。）
::: solution
平方数是惰性产出的：$0, 1, 4, 9, 16, 25$。第一个大于 $20$ 的是 $25 = f(5)$，即第六次调用；此后 `next` 返回，不再计算任何东西。所以 `f` 被调用 $6$ 次。
:::
:::

::: exercise 迭代两次 {level=1}
预测输出：`g = (c.upper() for c in "abc")`，然后 `print("b".upper() in g, list(g))`。解释原因。
::: solution
它打印 `True ['C']`。成员测试 `"B" in g` 会消费生成器直到找到 `"B"`：它取走 `"A"`（不匹配）和 `"B"`（匹配）后停止。生成器此时停在 `"B"` 之后，所以 `list(g)` 只得到 `"C"`。若换成列表而不是生成器，结果将是 `True ['A', 'B', 'C']`。
:::
:::

::: exercise 偶数生成器 {level=1}
写一个生成器函数 `evens(limit)`，产出小于 `limit` 的偶数 $0, 2, 4, \dots$，再写一个无限版本 `all_evens()`。用 `islice` 借助后者取得前五个。
::: solution
```python
from itertools import islice, count

def evens(limit):
    n = 0
    while n < limit:
        yield n
        n += 2

def all_evens():
    for n in count():
        yield 2 * n

print(list(evens(9)), list(islice(all_evens(), 5)))
```

```console
$ python3 evens.py
[0, 2, 4, 6, 8] [0, 2, 4, 6, 8]
```

（`range(0, limit, 2)` 与 `count(0, 2)` 用内建迭代器做同样的事。）
:::
:::

::: exercise 分块 {level=2}
写一个生成器 `chunks(iterable, k)`，产出由 $k$ 个相邻元素组成的列表（最后一个列表可能较短），对任何可迭代对象都有效，包括无限对象与一次性迭代器。在 `range(7)` 上取 $k = 3$ 测试，并在 `primes()` 上测试（前三个四元块）。
::: solution
```python
from itertools import islice

def chunks(iterable, k):
    it = iter(iterable)             # 一个迭代器，供每个 islice 共用
    while True:
        chunk = list(islice(it, k))
        if not chunk:
            return
        yield chunk

print(list(chunks(range(7), 3)))
```

```console
$ python3 chunks.py
[[0, 1, 2], [3, 4, 5], [6]]
```

对章节中的 `primes` 生成器，`list(islice(chunks(primes(), 4), 3))` 给出 `[[2, 3, 5, 7], [11, 13, 17, 19], [23, 29, 31, 37]]`。调用 `iter(iterable)` 必不可少：若对列表直接用 `islice(iterable, k)`，每次都会从头开始并永远循环下去；而对单个共享的迭代器，每个 `islice` 都接在上一个停下的地方继续。（Python 3.12 把这个函数以 `itertools.batched` 之名加入标准库，产出元组。）
:::
:::

::: exercise 第一百个素数 {level=2 check="541"}
用 `primes()` 与 `islice` 找出第 $100$ 个素数。（填入该素数。）为产出它，生成器检查了多少个整数 $n$？
::: solution
`next(islice(primes(), 99, None))` 是 $541$：位置 $99$ 上的元素，从 $0$ 数起。生成器的循环对 $n = 2, 3, \dots, 541$ 运行，检查了 $540$ 个整数，然后挂起在 $541$ 的 `yield` 处。
:::
:::

::: exercise 斐波那契数的位数 {level=2 check="476"}
写一个生成器 `fib()`，产出 $F_0 = 0, F_1 = 1, F_2 = 1, \dots$，用 `enumerate` 与一个生成器表达式找出第一个至少有 $100$ 位十进制数字的斐波那契数的下标。（填入下标。）
::: solution
```python
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print(next(i for i, f in enumerate(fib()) if len(str(f)) >= 100))
```

```console
$ python3 fibdigits.py
476
```

答案是 $476$。一个粗略的估计与之吻合：$F_n \approx \varphi^n/\sqrt 5$，其中 $\varphi \approx 1.618$，于是 $F_n \ge 10^{99}$ 当 $n \log_{10}\varphi - \log_{10}\sqrt5 \ge 99$，即 $n \ge (99 + 0.349)/0.20899 \approx 475.4$。
:::
:::

::: exercise 增量筛法的正确性 {#exr-sieve level=3}
证明 `primes()` 恰好产出全体素数，且按递增顺序。使用不变式：在 $n$ 的迭代开始时，(i) `composites` 的键是迄今发现的素数 $p < n$ 的互不相同的倍数 $m \ge n$，每个素数恰拥有一个键 $m_p \ge \max(n, p^2)$；(ii) 区间 $[\,p^2, m_p)$ 内任何不小于 $n$ 的 $p$ 的倍数都是某个其他素数的键。
::: solution
**初始**（$n = 2$）时，$n$ 以下没有素数，字典为空，所以 (i) 与 (ii) 成立。

**当且仅当 $n$ 是素数时它被产出。** 若 $n$ 是合数，设 $p$ 是它的最小素因子；则 $p < n$ 且 $p^2 \le n$，而 $n$ 是 $p$ 的落在 $[p^2, \infty)$ 内的倍数且 $n \ge n$。若 $n < m_p$，由 (ii) $n$ 是一个键；若 $n = m_p$，它就是 $p$ 的键；$n > m_p$ 不可能，因为 $m_p \ge n$。所以合数 $n$ 必是键，不会被产出。若 $n$ 是素数，每个键都是某个素数 $p < n$ 的倍数且至少为 $p^2 > p$，所以它是 $p$ 的真倍数，不可能是素数 $n$；于是 $n$ 不是键，会被产出。

**保持性。** 若 $n$ 是素数，新条目 $n^2 \mapsto n$ 的键还不是一个已有的键：等于 $n^2$ 的键将是某个素数 $p < n$ 的倍数，但 $n^2$ 唯一的素因子是 $n$。这个新素数满足 $m_n = n^2 \ge \max(n+1, n^2)$，且在 (ii) 中没有需要覆盖的东西。若 $n$ 是合数，拥有键 $n$ 的那个素数 $p$ 把标记移到 $p$ 的大于 $n$ 的第一个还不是键的倍数 $m$；被跳过的倍数都是其他素数的键，这恰好就是新的 $m_p$ 之下的 (ii)；而 $n$ 本身落到了新的下界 $n + 1$ 之下。其他素数的键不变且大于 $n$（它们与 $n$ 不同，因为唯一等于 $n$ 的那个键已被删除），所以它们不小于 $n + 1$。由于产出的数恰是 $2, 3, 4, \dots$ 中依次出现的素数，它们按递增顺序被产出。
:::
:::

::: exercise 惰性归并 {level=3}
写一个生成器 `merge(a, b)`，把两个各自按非降序排列的可迭代对象归并成一个有序的流，任何时刻至多在每个输入上挂起一个元素。在两个无限输入——$3$ 的倍数与 $5$ 的倍数——上测试，取前十个元素。陈述使其正确的循环不变式。
::: solution
```python
from itertools import count, islice

def merge(a, b):
    """Requires: a and b sorted (non-decreasing). Yields their elements, sorted."""
    a, b = iter(a), iter(b)
    done = object()                       # 一个任何输入都不含的哨兵
    x, y = next(a, done), next(b, done)   # 每一边各挂起一个元素
    while x is not done and y is not done:
        if x <= y:
            yield x
            x = next(a, done)
        else:
            yield y
            y = next(b, done)
    while x is not done:                  # 一边已结束：把另一边排干
        yield x
        x = next(a, done)
    while y is not done:
        yield y
        y = next(b, done)

print(list(islice(merge(count(3, 3), count(5, 5)), 10)))
print(list(merge([1, 4, 9], [2, 3, 10, 11])))
```

```console
$ python3 merge.py
[3, 5, 6, 9, 10, 12, 15, 15, 18, 20]
[1, 2, 3, 4, 9, 10, 11]
```

第一个循环的**不变式**：迄今产出的每个元素都不大于两个挂起元素 $x$ 与 $y$；已产出的元素按非降序排列；两个挂起元素连同 `a` 与 `b` 中未读的部分恰好就是尚未产出的那些元素。产出 $x, y$ 中较小者使三条都保持：它不小于此前产出的一切（由第一条），而接替它的元素不小于它，因为它的输入是有序的。两个排干循环接着处理剩下的一个输入，它是有序的。`next(it, done)` 在耗尽时返回默认值 `done` 而不抛出 `StopIteration`，使循环保持简单；`15` 出现两次，因为它同时是两者之倍数。（标准库中的 `heapq.merge` 把这推广到任意多个输入。）
:::
:::
