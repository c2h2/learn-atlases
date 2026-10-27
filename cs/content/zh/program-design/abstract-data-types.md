设想一个处理分数的程序——比如电子表格需要的精确有理数算术，或者不许受舍入之害的概率。第一个版本把分数存成对 `(n, d)`，程序里每个需要分数的部分都直接摆弄这个对：这里是 `(a[0] * b[1] + b[0] * a[1], a[1] * b[1])`，那里是 `a[0] * b[1] == b[0] * a[1]`。它能工作。后来有人发现，长时间计算中的数字会无止境地增大，因为没有任何地方把 $2/4$ 化成 $1/2$，而打印 $\tfrac{-1}{-2}$ 看起来也很滑稽。要修好它，就得找出程序中每一处构造或检视数对的地方——而它们每一处从此都可能忘记修。

这个程序早在缺陷出现之前就错了：它让自身的每个部分都知道分数是*如何表示*的。本章讲另一种做法，**抽象数据类型**：使用者只通过一组运算及其规格说明来认识的类型，表示被藏在它们背后。我们用这种方式构造有理数类型与整数集类型，学习推理一个实现的两个工具——**表示不变式**与**抽象函数**——并看到一个类型如何能完全不提任何表示地刻画：给出运算之间的等式。

## 接口与表示

[[data-structures/stacks-queues]] 已经引入过这个想法：**抽象数据类型**是一组取值以及仅由行为刻画的运算，而**数据结构**是它的一种表示方式。这里我们把这个边界的两端说精确。

::: definition 抽象数据类型、接口、表示 {#def-adt}
**抽象数据类型**（ADT）由一组**抽象值**和一组运算构成，每个运算都有一份完全用抽象值写成的规格说明（[[program-design/abstraction-specifications#def-spec]]）。运算及其规格说明构成类型的**接口**。一个**实现**选择一种**表示**——已有类型的具体值，称为**表示值**——并把每个运算写成关于表示值的代码。类型的**客户**只使用接口。
:::

对有理数而言，抽象值是数学上的有理数集 $\mathbb{Q}$，接口可以是：

- `make_rat(n, d)`：要求整数 `n`、`d` 且 `d != 0`；返回有理数 $n/d$；
- `numer(r)`、`denom(r)`：返回满足 $q > 0$、$\gcd(p, q) = 1$ 且 $p/q = r$ 的整数 $p, q$（最简形式）；
- `add_rat(x, y)`、`mul_rat(x, y)`：返回 $x + y$ 与 $xy$；
- `equal_rat(x, y)`：返回 $x = y$ 是否成立；`str_rat(r)`：对最简形式返回 `"p/q"`。

注意这些规格说明谈的是有理数，而不是对。下面的实现是阿贝尔森（Abelson）与苏斯曼（Sussman）的《Structure and Interpretation of Computer Programs》中的经典实现：一个有理数是一个最简形式、分母为正的二元组。

```python
from math import gcd

def make_rat(n, d):
    """Requires: ints n, d with d != 0.  Effects: returns the rational n/d."""
    if d < 0:                      # 把符号留在分子上
        n, d = -n, -d
    g = gcd(n, d)                  # gcd(0, d) == d，所以 0/d 变为 0/1
    return (n // g, d // g)

def numer(r): return r[0]
def denom(r): return r[1]

# ---- 此行之下的客户只使用 make_rat、numer 与 denom ----
def add_rat(x, y):
    return make_rat(numer(x) * denom(y) + numer(y) * denom(x), denom(x) * denom(y))

def mul_rat(x, y):
    return make_rat(numer(x) * numer(y), denom(x) * denom(y))

def equal_rat(x, y):
    return numer(x) == numer(y) and denom(x) == denom(y)

def str_rat(r):
    return f"{numer(r)}/{denom(r)}"

half, third = make_rat(1, 2), make_rat(1, 3)
print(str_rat(add_rat(half, third)), str_rat(mul_rat(half, third)))
print(str_rat(add_rat(make_rat(1, 6), make_rat(1, 3))))
print(equal_rat(make_rat(2, 4), make_rat(-3, -6)), str_rat(make_rat(3, -9)))
```

```console
$ python3 rat.py
5/6 1/6
1/2
True -1/3
```

中间那行注释标记了一道**抽象屏障**。在它之上，有三个函数知道有理数是一个二元组；在它之下，没有任何函数知道这一点。`add_rat` 只用接口计算 $\frac{a}{b} + \frac{c}{d} = \frac{ad + cb}{bd}$，并把 $\frac{9}{18}$ 到 $\frac12$ 的约分留给 `make_rat`。

收获出现在表示改变之时。假设性能分析表明：大多数有理数被构造和合并很多次，却很少打印，于是每次 `make_rat` 都约分是浪费。我们可以先存下未约分的对，改在选择器里约分：

```python
from math import gcd

def make_rat(n, d):
    return (n, d)                  # 按给定的样子存；按需约分

def numer(r):
    n, d = r
    g = gcd(n, d)
    return (n // g) if d > 0 else (-n // g)

def denom(r):
    n, d = r
    return abs(d) // gcd(n, d)

print(numer(make_rat(6, -9)), denom(make_rat(6, -9)))
```

```console
$ python3 rat2.py
-2 3
```

`add_rat`、`mul_rat`、`equal_rat` 和 `str_rat`——以及使用它们的每个客户——都不加改动就能工作，因为它们从不窥探二元组内部。这个版本是否真的更快，是个经验问题（未约分的对里的数字会增大，使每次乘法更慢）；要点在于这个问题可以靠尝试来定夺，而不必碰任何一个客户。

### 运算的种类

利斯科夫（Liskov）与古特格（Guttag）按运算接受什么、返回什么给 ADT 的运算分类，用 $T$ 表示该抽象类型：

- **创建操作**从其他类型造出 $T$ 的值：`make_rat(n, d)`、`set()`、`int("42")`；
- **生成操作**从已有的 $T$ 值造出新的 $T$ 值：`add_rat`、`str.upper`、列表上的 `a + b`；
- **观察操作**接受 $T$ 的值，返回其他类型的值：`numer`、`len`、`x in s`；
- **变更操作**原地改变一个 $T$ 的值：`list.append`、`set.add`、`dict.pop`。

没有变更操作的类型是**不可变的**：值一旦创建便永不改变，看起来改变它的运算（如 `str.replace`）其实产生一个新值。上面写出的有理数是不可变的；Python 的 `int`、`str`、`tuple` 和 `frozenset` 不可变，而 `list`、`dict` 和 `set` 可变。接口需要足够多的创建操作和生成操作来构造客户需要的每个抽象值，也需要足够多的观察操作来区分任意两个不同的值；没有观察操作的类型毫无用处，因为人们永远无法从它的值得知任何东西。

## 表示不变式与抽象函数

我们怎么知道一个实现是正确的？它的运算用抽象值刻画，而它的代码在表示值上计算。1972 年霍尔（Hoare）引入的两个定义把这两个世界连接起来。

::: definition 表示不变式与抽象函数 {#def-ri-af}
对表示类型为 $R$、抽象值为 $A$ 的 ADT 的一个实现：

- **表示不变式** $RI$ 是 $R$ 上的一个谓词，恰好对该实现认为是良构的表示值为真；
- **抽象函数** $AF$ 把每个满足 $RI(r)$ 的表示值 $r$ 映到它所表示的抽象值 $AF(r) \in A$。

一个运算是**正确的**，如果每当它的表示值实参满足 $RI$，它的结果就满足 $RI$，并且其参数与结果的抽象值 $AF(\cdot)$ 之间的关系恰如该运算的规格说明所要求。
:::

对第一个有理数实现，

$$
RI(n, d) \equiv d > 0 \land \gcd(n, d) = 1, \qquad AF(n, d) = \frac{n}{d}.
$$

对第二个实现，不变式更弱——只有 $d \neq 0$——而 $AF$ 是同一个公式。在实现开头的注释里把两者写下来，是一个 ADT 能有的最有用的一条文档：不变式告诉维护者每个函数可以假设什么、必须保持什么，抽象函数则告诉维护者这些比特*意味着*什么。

抽象函数通常**不是单射的**：多个表示值可以表示同一个抽象值。在第二个实现中，$(1, 2)$、$(2, 4)$ 和 $(-3, -6)$ 都表示 $\tfrac12$。第一个实现的不变式对每个值只留下一个表示值，这就是它的 `equal_rat` 可以逐分量比较的原因。

::: widget mapping
domain: (1,2); (2,4); (-3,-6); (3,1); (6,2); (0,5); (0,1)
codomain: 1/2; 3; 0
map: (1,2)>1/2; (2,4)>1/2; (-3,-6)>1/2; (3,1)>3; (6,2)>3; (0,5)>0; (0,1)>0
editable: false
caption: 有理数未约分表示的抽象函数，从表示值（二元对）到抽象值。它是满射的——每个有理数都有表示值——但不是单射的：有三对表示 $\tfrac12$。约分表示的不变式 $d > 0 \land \gcd(n, d) = 1$ 只留下 $(1,2)$、$(3,1)$ 和 $(0,1)$；限制在这些上，$AF$ 成为双射，抽象值的相等就变成表示值的相等。
:::

::: warning 表示值的相等不是值的相等
若 $AF$ 在合法表示值上不单射，逐分量比较表示值会给出错误答案：在未约分表示下，`make_rat(1, 2) == make_rat(2, 4)` 为 `False`，尽管两者都是 $\tfrac12$。每个 ADT 都需要一个定义在抽象值上的相等运算——这里是 $n_1 d_2 = n_2 d_1$——并且，正如 [[program-design/classes-objects]] 所示，必须让 Python 的 `==` 使用它。
:::

::: example 没有规范形式的相等 {#ex-cross-equal}
为未约分表示写出 `equal_rat`，并证明它在表示值上确定的关系是一个等价关系，其等价类恰为具有相同抽象值的表示值全体构成的集合。
::: solution
两个表示值 $(a, b)$ 与 $(c, d)$（$b, d \neq 0$）表示同一个有理数，当且仅当 $a/b = c/d$，即 $ad = cb$——这个检验不需要除法也不需要 gcd：

```python
def equal_rat(x, y):
    (a, b), (c, d) = x, y
    return a * d == c * b

print(equal_rat((1, 2), (-3, -6)), equal_rat((1, 2), (2, 3)), equal_rat((0, 5), (0, -1)))
```

```console
$ python3 crosseq.py
True False True
```

定义 $x \sim y$ 当且仅当 `equal_rat(x, y)`。则 $x \sim y \iff AF(x) = AF(y)$，而任何"$f(x) = f(y)$"形式的关系都是等价关系：因为相等关系自反、对称、传递，它也是。它的等价类是 $AF$ 的**纤维** $AF^{-1}(q)$——有理数 $q$ 的全部表示值。于是抽象值与表示值的等价类一一对应，这正是理解非单射抽象函数的一般方式：实现工作在表示值上，但只在一个 $\sim$ 的精度内工作，而每个观察操作必须在等价的表示值上给出相等的结果。（打印所存二元对的 `str_rat` 通不过这一检验；这就是未约分版本在选择器里做约分的原因。）
:::
:::

::: widget relation
set: 1/2; 2/4; -1/-2; 1/3; 2/6; 3/1
pairs: 1/2,1/2; 2/4,2/4; -1/-2,-1/-2; 1/3,1/3; 2/6,2/6; 3/1,3/1; 1/2,2/4; 2/4,1/2; 1/2,-1/-2; -1/-2,1/2; 2/4,-1/-2; -1/-2,2/4; 1/3,2/6; 2/6,1/3
view: properties
editable: true
name: ~
caption: 在六个未约分表示值上"表示同一个有理数"的关系，写成 $n/d$。它自反、对称、传递，它的三个等价类就是三个抽象值 $\tfrac12$、$\tfrac13$ 和 $3$。点击矩阵中的一个元素去掉某个对，例如 $(2/4, -1/-2)$，观察传递性如何失效：一个手写而非等价关系的"相等"，不可能是任何抽象类型的相等。
:::

### 不变式为何可信

约分有理数的每个运算都*假设*其实参满足 $RI$——`equal_rat` 只对约分的表示值正确——并为结果*建立*它。这个假设凭什么会成立？因为客户不可能用别的方式得到表示值。

::: theorem 封装保持不变式 {#thm-ri-preserved}
假设 (1) 每个创建操作返回满足 $RI$ 的表示值；(2) 每个生成操作和变更操作，在给定满足 $RI$ 的实参时，使它返回或修改的所有表示值仍满足 $RI$；(3) 客户只通过接口的运算获得和改变表示值。那么客户曾经持有的每个表示值都满足 $RI$。
:::

::: proof
对迄今执行的该类型运算的数目 $k$ 做归纳。$k = 0$ 时客户不持有任何表示值。假设 $k$ 次运算后存在的每个表示值都满足 $RI$，考虑第 $k + 1$ 个运算。由 (3)，它是接口的一个运算（客户无法以其他方式构造或改变表示值）。若它是创建操作，新的表示值由 (1) 满足 $RI$。若它是生成操作或变更操作，它的实参是 $k$ 次运算后存在的表示值，故由归纳假设满足 $RI$，而由 (2) 它返回或修改的每个表示值都满足 $RI$。观察操作不改变任何表示值。该运算没有碰到的表示值不变。于是 $k + 1$ 次运算后每个表示值都满足 $RI$。
:::

这个证明指出了每个运算的作者必须检验什么：在创建操作中建立 $RI$，在生成操作和变更操作中保持它——一次一个函数的局部检验，正如循环不变式一次一个迭代地检验。假设 (3) 是从外部可能被打破的那一条，也正是封装存在的理由。

::: example 检验一个运算 {#ex-addrat-correct}
证明约分实现的 `add_rat` 在 [[#def-ri-af]] 的意义下是正确的。
::: solution
设 $x = (a, b)$ 与 $y = (c, d)$ 满足 $RI$，故 $b, d > 0$。`add_rat` 调用 `make_rat(a*d + c*b, b*d)`，而 $bd > 0$，所以 `make_rat` 的前置条件成立。

**结果的 $RI$。** `make_rat(n, e)` 在 $e > 0$ 时跳过符号翻转，返回 $(n/g, e/g)$，其中 $g = \gcd(n, e) > 0$。于是 $e/g > 0$，且 $\gcd(n/g, e/g) = 1$，因为把两个整数除以它们的最大公因数剩下互素的整数。（若 $n = 0$，则 $g = e$，结果是 $(0, 1)$，它也满足 $RI$。）

**结果的 $AF$。** $AF(n/g, e/g) = \dfrac{n/g}{e/g} = \dfrac{n}{e} = \dfrac{ad + cb}{bd} = \dfrac{a}{b} + \dfrac{c}{d} = AF(x) + AF(y)$，这正是 `add_rat` 的规格说明所要求的。

注意我们根本不必考虑违反 $RI$ 的表示值：[[#thm-ri-preserved]] 保证客户传不进这样的值。
:::
:::

在代码里，不变式也可以在运行时检查。一个检验 $RI$ 的函数 `rep_ok`，在测试期间于每个创建操作、生成操作和变更操作结束时调用，能在某个运算产生坏表示值的当场抓住它，而不是等到很久以后某个别的运算行为失常时才暴露。

```python
from math import gcd

def rep_ok(r):
    """The representation invariant of reduced rationals."""
    n, d = r
    return type(n) is int and type(d) is int and d > 0 and gcd(n, d) == 1

print(rep_ok((1, 2)), rep_ok((2, 4)), rep_ok((1, -2)), rep_ok((0, 1)), rep_ok((0, 3)))
```

```console
$ python3 repok.py
True False False True False
```

### 表示暴露

[[#thm-ri-preserved]] 的假设 (3) 只要客户拿到表示值的某个可变部分就失效。下面是一个整数集的实现，用无重复的 Python 列表表示——这个不变式让 `remove` 和 `size` 很简单。

```python
def intset_new():      return []            # 表示不变式：无重复；抽象函数：由元素构成的集合
def intset_insert(s, x):
    if x not in s:
        s.append(x)
def intset_remove(s, x):
    if x in s:
        s.remove(x)                         # 删除第一个出现：由不变式保证，足够了
def intset_size(s):    return len(s)        # 只因为不变式才正确
def intset_elements(s): return s            # 缺陷：把表示值本身交了出去

s = intset_new()
for x in [3, 1, 3, 2]:
    intset_insert(s, x)
print(intset_size(s))
view = intset_elements(s)
view.append(1)                              # 客户"只不过"添加了一个元素
print(intset_size(s))
intset_remove(s, 1)
print(intset_size(s), 1 in intset_elements(s))
```

```console
$ python3 exposure.py
3
4
3 True
```

`intset_elements` 返回的正是那个作为表示值的列表。客户无意间的一次 `append` 制造了一个重复，破坏了 $RI$；从那以后 `intset_size` 多算，`intset_remove` 删不干净。缺陷在 `intset_elements` 里，但它隔了一段时间才在另外两个函数中显现——这是**表示暴露**的典型症状。修法是返回客户无法用来改变表示值的东西：一个副本（`return list(s)`），或一个不可变的值（`return tuple(s)` 或 `frozenset(s)`）。Python 挡不住存心的客户把手伸进表示值内部，但实现者的职责是永远不要把表示值*交*出去，也永远不要保留客户传入的、之后还可能改变的可变对象。

::: quiz
用一个整数 `m`（自午夜起的分钟数）表示一天中的时刻，其表示不变式是 $0 \le m < 1440$。哪个运算关于这个不变式是**不**正确的？
- [ ] `make_time(h, mi)`，要求 $0 \le h < 24$、$0 \le mi < 60$，返回 `60 * h + mi`
- [x] `add_minutes(t, k)`，返回 `t + k`
- [ ] `add_minutes(t, k)`，返回 `(t + k) % 1440`
- [ ] `hour(t)`，返回 `t // 60`
::: solution
`t + k` 可能达到 $1440$ 或更大（`k` 为负时还可能为负），违反不变式；此后任何假设 $0 \le m < 1440$ 的运算——比如 `hour`，它可能返回 $24$——都可能行为失常。对结果取模 $1440$ 恢复了不变式（Python 的 `%` 即使左操作数为负也返回 $[0, 1440)$ 内的值）。`make_time` 建立不变式：$0 \le 60h + mi \le 60\cdot 23 + 59 = 1439$。`hour` 是观察操作，破坏不了它。
:::
:::

## 一个接口，多种表示

同一个 ADT 可以有不变式与代价迥异的实现。对一个具有 `insert`、`contains`、`remove` 与 `size` 运算的整数集，这里有三种，其中 $n$ 是不同元素的个数，$m$ 是列表的长度：

| 表示 | $RI$ | `insert` | `contains` | `remove` | `size` |
|---|---|---|---|---|---|
| 列表，无重复 | 没有元素重复 | $O(n)$（先检查） | $O(n)$ | $O(n)$，第一个出现 | $O(1)$ |
| 列表，允许重复 | 无 | $O(1)$（直接追加） | $O(m)$ | $O(m)$，*每个*出现 | $O(m)$，数不同元素 |
| 有序列表，无重复 | 严格递增 | $O(n)$（搬移） | $O(\log n)$（二分查找） | $O(n)$ | $O(1)$ |

三者的抽象函数相同："由列表的元素构成的集合"。不同在于每个运算可以假设什么、必须做什么。不变式越弱，变更操作为维持它所要做的工作就越少，而观察操作不得不在没有它的情况下做的工作就越多：允许重复时，`insert` 很轻松，但 `size` 必须数不同元素，`remove` 必须删掉每个副本。这张表就是 ADT 在实践中重要的原因：针对接口编写的程序可以在工作负载改变时换一行——或者换成 [[data-structures/hash-tables]] 的哈希表，一切运算的期望代价都是 $O(1)$——而不必在实现之外做任何改动。

::: example 一个依赖不变式的缺陷 {#ex-invariant-bug}
一位程序员为了加快 `insert`，把"无重复"实现改成"允许重复"，只把 `intset_insert` 改成了 `s.append(x)`。现在哪些别的运算错了，为什么？
::: solution
逐个列出每个运算对旧不变式的依赖。

- `intset_remove` 用了 `s.remove(x)`，它只删除第一个出现。允许重复后，两次 `insert(s, 5)` 之后，`remove(s, 5)` 会留下一个 `5`：抽象集合仍然含有 $5$，违反规格说明。它必须改成 `while x in s: s.remove(x)`，或者更好的 `s[:] = [y for y in s if y != x]`。
- `intset_size` 返回 `len(s)`，它把重复也计入。它必须改成 `len(set(s))` 或等价的"不同元素个数"。
- `contains`（`x in s`）仍然正确：成员关系不在乎重复。

教训是：不变式是实现的*各个运算之间*的契约。改变它意味着重新检验每个运算，而这只有在不变式被写下来时才是容易的。
:::
:::

## 用等式刻画类型

到这里的规格说明都用一个数学模型——有理数、集合——来描述运算。对某些类型，更自然的说法是描述运算*彼此之间*如何关联。利斯科夫（Liskov）与齐尔斯（Zilles）在 1974 年，以及古特格（Guttag）在 1975 年起的一系列论文中，提出了**代数规格说明**：运算的签名清单，加上它们满足的等式（公理）。

::: definition 栈的代数规格说明 {#def-stack-axioms}
不可变栈类型有运算 `empty()`、`push(s, x)`、`pop(s)`、`top(s)` 与 `is_empty(s)`，满足：对每个栈 $s$ 与条目 $x$，

$$
\begin{aligned}
\mathit{is\_empty}(\mathit{empty}()) &= \mathit{True}, & \mathit{is\_empty}(\mathit{push}(s, x)) &= \mathit{False},\\
\mathit{top}(\mathit{push}(s, x)) &= x, & \mathit{pop}(\mathit{push}(s, x)) &= s.
\end{aligned}
$$

`empty()` 的 `top` 与 `pop` 是错误：没有公理定义它们，所以它们在规格说明之外。
:::

客户能构造的每个栈都是 `empty()` 后面跟着若干次 push 和 pop，而由这些公理出发、从内到外地重写，就足以对它的任何观察求值。它们对数组、链接或内存只字未提——正是我们想要的信息隐藏。一个实现是正确的，若它满足全部四条等式。

::: example 用公理求值 {#ex-stack-rewrite}
用公理求 $\mathit{top}(\mathit{pop}(\mathit{push}(\mathit{push}(\mathit{empty}(), 1), 2)))$，然后用随机栈对照公理检验一个用嵌套二元组写成的实现。
::: solution
设 $s_1 = \mathit{push}(\mathit{empty}(), 1)$。由第四条公理，$\mathit{pop}(\mathit{push}(s_1, 2)) = s_1$，再由第三条，$\mathit{top}(s_1) = \mathit{top}(\mathit{push}(\mathit{empty}(), 1)) = 1$。所以值为 $1$。

一个不可变的实现用 `None` 表示空栈，用二元组 `(x, s)` 表示 $\mathit{push}(s, x)$：

```python
import random

def empty():        return None
def push(s, x):     return (x, s)       # 新栈；s 本身不变
def is_empty(s):    return s is None
def top(s):         return s[0]
def pop(s):         return s[1]

print(top(pop(push(push(empty(), 1), 2))))

rng = random.Random(1)
def random_stack(k):
    s = empty()
    for _ in range(k):
        s = push(s, rng.randint(0, 9))
    return s

ok = True
for trial in range(1000):
    s, x = random_stack(rng.randint(0, 6)), rng.randint(0, 9)
    ok = ok and top(push(s, x)) == x and pop(push(s, x)) == s
    ok = ok and is_empty(push(s, x)) is False
print(ok and is_empty(empty()))
```

```console
$ python3 stack.py
1
True
```

公理 $\mathit{pop}(\mathit{push}(s, x)) = s$ 以最强烈的意义成立：`pop(push(s, x))` *就是*对象 `s`，因为压栈共享旧栈而不是复制它。只有因为没有运算会改变一个栈，这种共享才是安全的——这是 [[program-design/functional-style]] 中持久数据的主线。对公理的随机测试不是证明，但这里的证明很短：每条公理都由五个函数的定义一步推出。
:::
:::

::: application 公理即测试
代数律是出色的自动化测试，因为它们不需要期望输出："解码一个编码应得回原物"、"排序一个已排序的列表不改变任何东西"、"`pop(push(s, x)) == s`"。在许多随机输入上对照这样的律测试一个程序，叫做**基于属性的测试**（property-based testing）；Haskell 库 QuickCheck（Claessen 与 Hughes，2000）使它流行起来，Python 的 Hypothesis 库把它带进 Python。每条律都在数百个生成的值上检验，而一次失败会被自动缩小成一个很小的反例。
:::

::: history
几个想法在 1970 年代初相遇。由达尔（Dahl）与尼加德（Nygaard）设计的 Simula 67，已经用它的 `class` 构造把数据和作用于它的过程捆绑在一起。1972 年，帕纳斯（Parnas）在《On the criteria to be used in decomposing systems into modules》（*CACM*）中主张每个模块应隐藏一个设计决策，例如一种数据表示；同年，霍尔（Hoare）的《Proof of correctness of data representations》（*Acta Informatica*）提出了本章使用的抽象函数与不变式。利斯科夫（Liskov）与齐尔斯（Zilles）的《Programming with abstract data types》（1974）命名了这一概念并提出了语言支持，利斯科夫的课题组把它做进了语言 CLU（1977 年发表）；古特格（Guttag）在同一时期发展了代数规格说明（《Abstract data types and the development of data structures》，*CACM*，1977）。利斯科夫因这项工作及其后续影响获得了 2008 年的图灵（Turing）奖。
:::

## 后续内容

把 ADT 写成对二元组和列表的松散函数是可行的，但没有任何东西阻止客户改调 `r[0]` 而不是 `numer(r)`，而且每个函数都必须显式地传入表示值。[[program-design/classes-objects]] 把 ADT 的表示与运算一起打包为类，用 `__init__` 作创建操作，用方法作运算，而 Python 的特殊方法让 `==`、`+` 和 `print` 使用抽象的含义。表示不变式在 [[data-structures]] 的每个数据结构里都会回来——二叉搜索树的有序性、堆的形状——而抽象函数是 [[software-engineering]] 中精化证明的基础。

::: summary
- **抽象数据类型**只通过它的接口被客户认识——运算配有完全用抽象值写成的规格说明；**表示**藏在**抽象屏障**之后，因此可以在不改变客户的情况下改变（[[#def-adt]]）。
- 运算分为**创建操作**、**生成操作**、**观察操作**与**变更操作**；没有变更操作的类型是**不可变的**。
- **表示不变式**说明哪些表示值是良构的；**抽象函数**说明每个表示值表示哪个抽象值。它常常不是单射的，所以表示值的相等不是值的相等（[[#def-ri-af]]）。
- 若创建操作建立不变式，生成操作和变更操作保持它，而客户碰不到表示值，则每个表示值都满足它（[[#thm-ri-preserved]]）；测试期间用 `rep_ok` 在运行时检查它。
- **表示暴露**——把表示值的可变部分交出去或保留下来——会从外部破坏不变式；返回副本或不可变的视图。
- 一个接口可以有多种表示，各有不同的不变式与代价；不变式越弱，观察操作要做的工作越多。
- **代数规格说明**用运算之间的等式刻画类型，例如 $\mathit{pop}(\mathit{push}(s, x)) = s$；这样的律是很好的基于属性的测试。
:::

## 习题

::: exercise 给运算分类 {level=1}
把每个运算分类为所指类型的创建操作、生成操作、观察操作或变更操作：(a) `str` 的 `str.upper`；(b) `list` 的 `len`；(c) `list` 的 `list.sort`；(d) `list` 的 `sorted`（它的实参可以是任何可迭代对象；结果是列表）；(e) `frozenset` 的 `frozenset.union`；(f) `int` 的 `int(s)`，其中 `s` 是字符串；(g) `dict` 的 `dict.get`。
::: solution
(a) 生成操作：由字符串得到新字符串。(b) 观察操作：返回 `int`。(c) 变更操作：原地排序列表（并返回 `None`）。(d) 给定非列表的可迭代对象时是创建操作，给定列表时是生成操作——分类取决于实参的类型；对 `list` 实参它是生成操作，因为原列表不变。(e) 生成操作：返回新的 frozenset。(f) 创建操作：由 `str` 造出 `int`。(g) 观察操作：返回存储的值（任意类型），不改变字典。
:::
:::

::: exercise 多对一的表示值 {level=1 check="6"}
在分数的未约分表示中，表示值是 $d \neq 0$ 的整数对 $(n, d)$。满足 $\abs{n} \le 6$ 且 $\abs{d} \le 6$、表示 $\tfrac12$ 的表示值有多少个？（输入数目。）
::: solution
需要 $n/d = 1/2$，即 $d = 2n$ 且 $n \neq 0$。由 $\abs{d} \le 6$ 得 $\abs{n} \le 3$，于是 $n \in \{-3, -2, -1, 1, 2, 3\}$：表示值为 $(1,2), (2,4), (3,6), (-1,-2), (-2,-4), (-3,-6)$。共六个表示值。其中恰有一个，$(1, 2)$，满足约分不变式。
:::
:::

::: exercise 用栈公理重写 {level=1 check="5"}
用 [[#def-stack-axioms]] 的公理求 $\mathit{top}(\mathit{pop}(\mathit{push}(\mathit{push}(\mathit{push}(\mathit{empty}(), 3), 5), 7)))$。（输入该值。）
::: solution
设 $s = \mathit{push}(\mathit{push}(\mathit{empty}(), 3), 5)$。由 $\mathit{pop}(\mathit{push}(s, x)) = s$，$\mathit{top}$ 的实参是 $s$；再由 $\mathit{top}(\mathit{push}(s', x)) = x$，取 $s' = \mathit{push}(\mathit{empty}(), 3)$、$x = 5$，得值为 $5$。
:::
:::

::: exercise 多项式 {level=2}
系数为整数的多项式 $c_0 + c_1 x + \dots + c_k x^k$ 用列表 `[c0, c1, ..., ck]` 表示。(a) 写出抽象函数。(b) 提出一个使每个多项式的表示唯一的表示不变式，并说明零多项式如何表示。(c) 写出 `degree(p)`（约定零多项式的次数为 $-1$）和 `add(p, q)`，并说明 `add` 必须在哪里下功夫才能保持不变式。
::: solution
(a) $AF([c_0, \dots, c_k]) = \sum_{i=0}^{k} c_i x^i$，且 $AF([\,]) = 0$。

(b) 不变式：列表为空，或最后一个元素非零。没有它，`[1, 2]` 和 `[1, 2, 0, 0]` 表示同一个多项式。零多项式是空列表。

(c)

```python
def degree(p):
    return len(p) - 1            # 依赖不变式：无末尾零

def add(p, q):
    n = max(len(p), len(q))
    r = [(p[i] if i < len(p) else 0) + (q[i] if i < len(q) else 0) for i in range(n)]
    while r and r[-1] == 0:      # 恢复不变式：x^2 + (-x^2) 不能留下 0
        r.pop()
    return r

print(add([1, 2, 3], [0, 0, -3]), degree(add([1, 2, 3], [0, 0, -3])), add([5], [-5]))
```

```console
$ python3 poly.py
[1, 2] 1 []
```

两个二次多项式之和在首项系数相消时次数会更低；没有删尾的循环，`add` 会返回 `[1, 2, 0]`，而依赖不变式的 `degree` 会报告 $2$。
:::
:::

::: exercise 找出暴露之处 {level=2}
这个有界计数器（`0` 到最大值之间的整数）的实现把表示值存成列表 `[value, maximum]`，不变式为 $0 \le value \le maximum$。

```python
def counter_new(maximum):  return [0, maximum]
def counter_inc(c):
    if c[0] < c[1]:
        c[0] += 1
def counter_state(c):      return c
```

说明客户如何在不直接访问 `c` 的情况下破坏不变式，并修复该实现。
::: solution
`counter_state` 返回表示值列表本身，所以 `st = counter_state(c); st[0] = 99` 只用一个接口运算就把值设到了最大值之上（或 `st[1] = -1` 把最大值设为负数）。修复法是返回不可变的数据：`return (c[0], c[1])`；更好的办法是提供分开的观察操作 `counter_value(c)` 与 `counter_max(c)`，返回整数。（整数不可变，所以返回它们不可能暴露任何东西。）
:::
:::

::: exercise 用有序列表实现集合 {level=2}
对上表的有序列表表示（不变式：严格递增），实现 `intset_new`、`intset_insert`、`intset_contains` 与 `intset_size`，`contains` 和寻找插入位置都用二分查找（Python 的 `bisect` 模块提供了 `bisect_left`）。解释为什么 `intset_size` 可以返回 `len(s)`。
::: solution
```python
from bisect import bisect_left

def intset_new():
    return []                        # 表示不变式：严格递增；抽象函数：由元素构成的集合

def intset_contains(s, x):
    i = bisect_left(s, x)            # 第一个满足 s[i] >= x 的位置
    return i < len(s) and s[i] == x

def intset_insert(s, x):
    i = bisect_left(s, x)
    if i == len(s) or s[i] != x:     # 不存在：在有序位置插入
        s.insert(i, x)

def intset_size(s):
    return len(s)

s = intset_new()
for x in [5, 1, 4, 1, 5, 9, 2, 6]:
    intset_insert(s, x)
print(s, intset_size(s), intset_contains(s, 4), intset_contains(s, 3))
```

```console
$ python3 sortedset.py
[1, 2, 4, 5, 6, 9] 6 True False
```

`bisect_left` 依赖列表有序，而这正是不变式保证的。严格递增的列表没有重复元素，所以它的长度就是不同元素的个数，即抽象集合的大小。插入保持列表严格递增，因为 `x` 被放在第一个 $\ge x$ 的元素之前，且仅当那个元素不是 $x$ 时才放。`contains` 花费 $O(\log n)$ 次比较，而 `insert` 是 $O(n)$，因为 `list.insert` 要搬移后面的元素。
:::
:::

::: exercise 证明乘法正确 {level=3}
证明约分实现的 `mul_rat` 在 [[#def-ri-af]] 的意义下正确：对满足 $RI$ 的表示值，结果满足 $RI$，且 $AF(\mathit{mul\_rat}(x, y)) = AF(x) \cdot AF(y)$。你的证明在哪里用到了*实参*的不变式？
::: solution
设 $x = (a, b)$、$y = (c, d)$ 且 $b, d > 0$。`mul_rat` 返回 `make_rat(a*c, b*d)`。因为 $b > 0$ 且 $d > 0$，$bd > 0$：`make_rat` 的前置条件（$bd \ne 0$）成立，且不发生符号翻转。如同 [[#ex-addrat-correct]]，`make_rat(n, e)` 在 $e > 0$ 时返回 $(n/g, e/g)$，其中 $g = \gcd(n, e)$，它的分母为正、两个分量互素，所以 $RI$ 成立；并且 $AF = \frac{n}{e} = \frac{ac}{bd} = \frac{a}{b}\cdot\frac{c}{d} = AF(x)\,AF(y)$。

实参的不变式只通过 $b, d > 0$ 被用到，它保证 $bd \ne 0$。实参的互素性并不需要，因为 `make_rat` 反正会约分。这一观察很有用：它表明在更弱的不变式 $d > 0$ 之下 `mul_rat` 仍然正确，若实现日后改为懒惰约分，这一点可能重要。
:::
:::

::: exercise 表示值唯一则相等容易 {level=3}
证明：在满足约分不变式 $RI(n, d) \equiv d > 0 \land \gcd(n, d) = 1$ 的表示值上，抽象函数是单射的：若 $n_1/d_1 = n_2/d_2$，则 $n_1 = n_2$ 且 $d_1 = d_2$。由此得出 `equal_rat` 是正确的。
::: hint
由 $n_1 d_2 = n_2 d_1$ 推出 $d_1$ 整除 $d_2$，利用"若 $p$ 整除 $qr$ 且 $\gcd(p, q) = 1$，则 $p$ 整除 $r$"这一事实。
:::
::: solution
设 $n_1/d_1 = n_2/d_2$，即 $n_1 d_2 = n_2 d_1$。于是 $d_1$ 整除 $n_1 d_2$，而 $\gcd(d_1, n_1) = 1$，所以 $d_1$ 整除 $d_2$（欧几里得引理的推广形式，证明见 [Maths Atlas：数论](/learn/maths/lesson.php?c=number-theory&l=divisibility)）。由对称性，$d_2$ 整除 $d_1$。两个互相整除的正整数相等，故 $d_1 = d_2$；从 $n_1 d_2 = n_2 d_1$ 中约去非零的 $d_1$，得 $n_1 = n_2$。

`equal_rat(x, y)` 返回两个分量是否相等。若相等，则 $AF(x) = AF(y)$ 是显然的；若 $AF(x) = AF(y)$，单射性给出分量相等。所以 `equal_rat` 恰在两个有理数相等时返回 `True`，正如规格说明所要求的——但只对满足 $RI$ 的表示值成立，而这由 [[#thm-ri-preserved]] 保证。
:::
:::
